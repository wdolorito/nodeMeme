let socket = {}

const setupSocket = function() {
  socket = io()

  socket.on('treturn', function(json) {
    populateTrending(json)
  })

  socket.on('rreturn', function(json) {
    // console.log(json)
  })
}

const returnTrending = function() {
  socket.emit('trending')
}

const populateTrending = function(json) {
  if(json.success) {
    let results = {}
    let html = ''
    results = json.result
    results.forEach(function(result) {
      html += '<div class="col s12 m4">\n'
      html += '  <img class="responsive-img" src="' + result.imageUrl + '">\n'
      html += '  </br>\n'
      html += '  <span class="card-title">' + result.displayName + '</span>\n'
      html += '</div>\n'
    })
    $('#trending').html(html)
  }
}

const returnRecent = function() {
  socket.emit('recent')
}

$(document).ready(function () {
  setupSocket()
  returnTrending()
  returnRecent()
})
