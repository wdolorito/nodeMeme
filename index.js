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
// meme.Generators_Search('', 'insanity',
//                         0, 12)
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.Generators_Select_ByMgUser('', 1,
//                         0, 12)
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.Generators_Select_ByNew('', 0, 12)
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.Generators_Select_ByPopular('', 0, 12, '')
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.Generators_Select_ByRecentlyCaptioned('')
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.Generators_Select_BySubscriber('', 1)
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.Generators_Select_ByTrending('')
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.Generators_Select_ByUpvoted('', 1, 0, 12)
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.Generators_Select_Related_ByDisplayName('', 'Insanity Wolf')
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.Group_Select_Moderators('', 2)
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.Instance_Create('', 'en', 45, 20, 'push a hipster down the stairs', 'now look who\'s tumbling')
//                     .then(function(result) {
//                       console.log(result)
//                     })
// meme.Instance_Delete('', 72628355)
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.Instance_Select('', 72628355)
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.Instances_Search('', 'insanity', 0, 12)
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.Instances_Select_By_SubscriberMgUserID('[sessionKey]', 'en', 1000000, 12)
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.Instances_Select_ByMgUser('', 1, 0, 12)
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.Instances_Select_ByNew('', 'en', 0, 'Insanity-Wolf')
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.Instances_Select_ByPopular('', 'en', 0, 'Insanity-Wolf', '')
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.Instances_Select_ByUpvoted('', 1, 0, 12)
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.MgImage_Select('', 42)
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.MgImages_Search('', 'insanity')
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.MgUser_Login('test8', 'test8')
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.MgUser_Login_Facebook('[facebook access token]')
//                         .then(function(result) {
//                           console.log(result)
//                         })
// meme.MgUser_SignUp('email@domain.com', 'test8', 'test8')
//                         .then(function(result) {
//                           console.log(result)
//                         })
meme.MgUser_Update_Image('[sessionKey]', 'https://cdn.meme.am/images/983.jpg')
                        .then(function(result) {
                          console.log(result)
                        })
