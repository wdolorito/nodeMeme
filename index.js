const express = require('express')
const app = express()
const server = require('http').createServer(app)
const router = require('./routes')
const fs = require('fs')
const meme = require('./memegenerator')
let port = 3000
app.use(express.static(__dirname + '/static'))

try {
  port = fs.readFileSync(__dirname + '/port', 'utf8')
  console.log('input port: ' + port)
} catch(error) {
  console.log(error.stack)
}

app.use('/', router)

server.listen(port, function() {
  console.log('Live at Port ' + port)
})

// meme.Comment_Create('', 'Instance', 72628355, '', 'first post best post')
// meme.Comment_Delete('', -1)
// meme.Comments_Select('', 'Instance', 72628355, '')
