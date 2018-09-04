const meme = require(__dirname + '/memegenerator')
let thisIo = {}

const sock = function(socket) {
  let sock = socket
  console.log(Date(), 'client', socket.id, 'connected')

  socket.on('trending', function(sock) {
    let trending = meme.Generators_Select_ByTrending()
    trending.then(function(res) {
      if(res) socket.emit('treturn', res)
    }).catch(function(err) {
      console.log(err)
    })
  })

  socket.on('recent', function(sock) {
    console.log('in recent')
    let recent = meme.Instances_Select_ByPopular('en', 0, '')
    recent.then(function(res) {
      if(res) socket.emit('rreturn', res)
    }).catch(function(err) {
      console.log(err)
    })
  })

  socket.on('disconnect', function () {
    console.log(Date(), 'client', this.id, 'disconnected')
  })
}

module.exports = function(io) {
  thisIo = io

  let funcs = {}
  funcs.sock = sock

  return funcs
}
