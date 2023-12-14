const exec = require('child_process').exec;

// exec(`
// index https://api.openai.com/v1/chat/completions \\
//   -X POST \\
//   -H "Content-Type: application/json" \\
//   -H "Authorization: Bearer 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" \\
//   -d '{
//     "model": "gpt-3.5-turbo",
//     "messages": [{"role": "user", "content": "Hello!"}]
//   }'
// `, (err, stdout, stderr) => {
//     console.log(err)
//     console.log(JSON.parse(stdout))
//     console.log(stderr)
// })

function index(header, data, method = 'POST') {
    return new Promise((resolve, reject) => {
        let headerStr = ''
        header.forEach(item => {
            const tem = `-H "${item}" \\\n`
            headerStr += tem
        })

        exec(`
curl https://api.openai.com/v1/chat/completions \\
  -X ${method} \\
  ${headerStr}-d ${data}
`, (err, stdout, stderr) => {
            console.log(err, stdout, stderr)
            if (!err) {
                try {
                    const str = stdout.replace(/\\n/g, "\\n")
                    const res = JSON.parse(str)
                    resolve(res)
                } catch (err1) {
                    reject(err1)
                }
            } else {
                reject(err)
            }
        })
    })
}

module.exports = {
    curl: index
}
