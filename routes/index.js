const router = require('koa-router')()
const fs = require('fs')
const { curl } = require('../util')

router.get('/*', async (ctx, next) => {
  ctx.set('Content-Type', 'text/html;charset=utf-8')
  ctx.body = fs.readFileSync('public/chat/index.html')
})

router.post('/api/chat', async (ctx, next) => {
  const { messages } = ctx.request.body
  const res = await curl([
    'Content-Type: application/json',
    'Authorization: Bearer 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',
  ], JSON.stringify({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.7
  }))
  ctx.body = res
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
