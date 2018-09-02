const fs = require('fs')
let apiKey = ''

try {
  apiKey = fs.readFileSync('apiKey', 'utf8')
} catch(error) {
  console.log(error.stack)
}
