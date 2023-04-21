export function setStorage(key: string, value: any) {
  if (typeof value === "string") {
    localStorage.setItem(key, value)
  } else {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export function getStorage(key: string, type: 'string' | 'object') {
  const value = localStorage.getItem(key)
  if (type === "string") {
    return value
  } else {
    return value ? JSON.parse(value) : null
  }
}


const a = {
  "id":"chatcmpl-77bZwILGzSRvSLQqlKD1bIk9jdeFR",
  "object":"chat.completion",
  "created":1682047104,
  "model":"gpt-3.5-turbo-0301",
  "usage":{"prompt_tokens":18,"completion_tokens":243,"total_tokens":261},
  "choices":[
    {
      "message":{
        "role":"assistant",
        "content":"，你的任务是帮助学生提高英语水平。\n\n作为一名英语老师，我首先会了解学生的英语水平和学习目标，然后根据他们的情况制定相应的教学计划。\n\n在教学过程中，我会采用多种教学方法，如听说读写结合学生多进行英语口语练习，提高英语自信心，让他们在英语学习中享受乐趣。"
      },
      "finish_reason":"stop",
      "index":0
    }
  ]
}
