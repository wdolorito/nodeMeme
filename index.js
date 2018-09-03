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
//                     .then(function(result) {
//                       console.log(result)
//                     })
// meme.Comment_Delete('', -1).then(function(result) {
//   console.log(result)
// })
// meme.Comments_Select('', 'Instance', 72628355, '').then(function(result) {
//   console.log(result)
// })
// meme.ContentFlag_Create('', 'https://memegenerator.net/John-Doe',
//                         'personal information exposed', 'email@domain.com')
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.Generator_Create('', 'https://cdn.meme.am/images/983.jpg', 'Insanity Wolf')
//                      .then(function(result) {
//                        console.log(result)
//                      })
// meme.Generator_Select_ByUrlNameOrGeneratorID('', 45, 'Insanity-Wolf')
//                                             .then(function(result) {
//                                               console.log(result)
//                                             })
