const exec = require('child_process').exec;

exec(`
curl https://api.openai.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer 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" \\
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
`, (err, stdout, stderr) => {
    console.log(err)
    console.log(JSON.parse(stdout))
    console.log(stderr)
})
