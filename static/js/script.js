let socket = {}

const setupSocket = function() {
  socket = io()

  socket.on('treturn', function(json) {
    populateTrending(json)
  })

  socket.on('rreturn', function(json) {
    populateRecent(json)
  })
}

const returnTrending = function() {
  socket.emit('trending')
}

const populateTrending = function(json) {
  if(json.success) {
    let results = json.result
    let len = results.length
    let html = ''
    for(let count = 0; count < len; count++) {
      let row = count % 3
      if(row === 0) {
        html += '<div class="row">\n'
      }
      html += '  <div class="col s12 m4">\n'
      html += '    <span>' + results[count].displayName + '</span>\n'
      html += '    </br>\n'
      html += '    <img class="timage" src="' + results[count].imageUrl + '">\n'
      html += '    </br>\n'
      html += '  </div>\n'
      if(row === 2) {
        html += '</div>\n'
      }
    }
    $('#trending').html(html)
  }
}

const returnRecent = function() {
  socket.emit('recent')
}

const populateRecent = function(json) {
  if(json.success) {
    let results = json.result
    let len = results.length
    let html = ''
    for(let count = 0; count < len; count++) {
      let row = count % 3
      if(row === 0) {
        html += '<div class="row">\n'
      }
      html += '  <div class="col s12 m4">\n'
      html += '    <span>' + results[count].displayName + '</span>\n'
      html += '    </br>\n'
      html += '    <img class="timage" src="' + results[count].instanceImageUrl + '">\n'
      html += '    </br>\n'
      html += '  </div>\n'
      if(row === 2) {
        html += '</div>\n'
      }
    }
    $('#recent').html(html)
  }
}

$(document).ready(function () {
  setupSocket()
  returnTrending()
  returnRecent()
})
