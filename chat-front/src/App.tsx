import './css/app.styl'
import {Button, message as aMessage} from "antd";
import Input from "antd/es/input/Input";
import {useCallback, useEffect, useRef, useState} from "react";
import {getStorage, setStorage} from "./common/js/util";
import axios from "axios";
import {marked} from "marked";

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

function App() {
  const [msg, setMsg] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>(getStorage('chatMessages', 'object') || [])
  const [btnLoading, setBtnLoading] = useState(false)

  const messageScroll = useRef<any>()

  const changeMsg = useCallback((e: any) => {
    setMsg(e.target.value)
  }, [])

  const scrollToBottom = () => {
    setTimeout(() => {
      messageScroll.current.scrollTop = messageScroll.current.scrollHeight
    }, 100)
  }

  function sendMsg() {
    if (!msg) {
      aMessage.error('请输入问题内容')
      return
    }
    const message: ChatMessage = {
      role: messages.length ? 'user' : 'system',
      content: msg
    }
    const msgs = [
      ...messages,
      message
    ]
    setMessages(msgs)
    setMsg('')
    scrollToBottom()
    setBtnLoading(true)
    const msgArr = [msgs[0]]
    if (msgs.length > 2) {
      msgArr.push(...msgs.slice(msgs.length - 3))
    }
    axios.post('/chat/api/chat', {
      messages: msgs
    })
      .then(res => {
        const list = [
          ...msgs,
          ...res.data.choices.map((item: { message: ChatMessage; }) => item.message)
        ]
        setMessages(list)
        setStorage('chatMessages', list)
        setBtnLoading(false)
        scrollToBottom()
      })
      .catch(() => {
        aMessage.error('网络错误，请稍后再试')
        setBtnLoading(false)
      })
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  function clear() {
    setStorage('chatMessages', [])
    setMessages([])
  }

  return (
    <div className="App">
      <h4>x-chat <Button size="small" type="text" danger onClick={clear}>清空</Button></h4>
      <div className="message" ref={messageScroll}>
        {
          messages.map((item, index) => <div
            className={`msg-item ${item.role === 'assistant' ? 'left' : 'right'}`}
            key={index}
          >
            <div className="info" dangerouslySetInnerHTML={{__html: marked.parse(item.content)}}></div>
          </div>)
        }
      </div>
      <div className="send">
        <Input value={msg} disabled={btnLoading} onChange={changeMsg} onPressEnter={sendMsg} />
        <Button
          style={{ marginLeft: '10px' }}
          type="primary"
          onClick={sendMsg}
          loading={btnLoading}
        >发送</Button>
      </div>
    </div>
  )
}

export default App
