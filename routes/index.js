const { curly } = require('node-libcurl')
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/chat', async (ctx, next) => {
  const res = await curly.post('https://api.openai.com/v1/chat/completions', {
    postFields: JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": '你好'}],
      "temperature": 0.7
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
