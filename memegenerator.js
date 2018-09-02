const fs = require('fs')
let apiKey = ''

try {
  apiKey = fs.readFileSync(__dirname + '/apiKey', 'utf8')
} catch(error) {
  console.log(error.stack)
}

let memegenerator = {}

memegenerator.test = function() {
  return 'hello world'
}

module.exports = memegenerator
