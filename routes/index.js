const router = require('koa-router')()
const fs = require('fs')
const { curl } = require('../util')
const OpenAI = require("openai")

router.get('/chat/*', async (ctx, next) => {
  ctx.set('Content-Type', 'text/html;charset=utf-8')
  ctx.body = fs.readFileSync('public/chat/index.html')
})

const openai = new OpenAI({
  apiKey: ''
});

router.post('/chat/api/chat', async (ctx, next) => {
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Say this is a test" }],
    stream: true,
  });
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
  ctx.body = {
    code: 0
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
