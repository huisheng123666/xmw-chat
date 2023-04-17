const { curly } = require('node-libcurl')
const router = require('koa-router')()
const fs = require('fs')

router.get('/*', async (ctx, next) => {
  ctx.set('Content-Type', 'text/html;charset=utf-8')
  ctx.body = fs.readFileSync('public/chat/index.html')
})

router.post('/api/chat', async (ctx, next) => {
  const { messages } = ctx.request.body
  const res = await curly.post('https://api.openai.com/v1/chat/completions', {
    postFields: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7
    }),
    httpHeader: [
      'Content-Type: application/json',
      'Authorization: Bearer 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',
    ]
  })
  ctx.body = res.data
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
