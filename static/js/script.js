let socket = {}
let lang = 'en'
let generatorID = ''
let imageID = ''
let text0 = ''
let text1 = ''

const setupSocket = function() {
  socket = io()

  socket.on('custom', function(json) {
    populateCustom(json)
  })

  socket.on('createCustom', function(json) {
    toggleCustom(json)
  })

  socket.on('treturn', function(json) {
    populateTrending(json)
  })

  socket.on('rreturn', function(json) {
    populateRecent(json)
  })
}

const returnCustom = function() {
  socket.emit('custom')
}

const populateCustom = function(json) {
  if(json.success) {
    let results = json.result
    let len = results.length
    let rando = Math.floor(Math.random() * Math.floor(len))
    let item = results[rando]
    $('.randoImg').attr('src', item.imageUrl)
    generatorID = item.generatorID
    imageID = item.imageID
  }
}

const toggleCustom = function(json) {
  let result = json.result
  let src = result.instanceImageUrl
  $('#customMeme').attr('src', src)
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
      html += '    <h5>' + results[count].displayName + '</h5>\n'
      html += '    </br>\n'
      html += '    <img class="responsive-img" src="' + results[count].imageUrl + '">\n'
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
      html += '    <img class="responsive-img" src="' + results[count].instanceImageUrl + '">\n'
      html += '  </div>\n'
      if(row === 2) {
        html += '</div>\n'
      }
    }
    $('#recent').html(html)
  }
}

$('.language').click(function() {
  lang = $(this).attr('str').trim()
  let langStr = $(this).html()
  $('#langTitle').html(langStr)
})

$('#create-meme').click(function() {
  text0 = $('#top-text').val().trim()
  text1 = $('#bot-text').val().trim()
  let toSend = {}
  toSend.languageCode = lang
  toSend.generatorID = generatorID
  toSend.imageID = imageID
  toSend.text0 = text0
  toSend.text1 = text1
  socket.emit('createCustom', toSend)
  $('#top-text').val('')
  $('#bot-text').val('')
  $('#custom-picker').toggle()
  $('#custom').toggle()
})

$('#new-meme').click(function() {
  returnCustom()
  $('#custom-picker').toggle()
  $('#custom').toggle()
})

$(document).ready(function () {
  $('#custom').toggle()
  setupSocket()
  returnCustom()
  returnTrending()
  returnRecent()
})
