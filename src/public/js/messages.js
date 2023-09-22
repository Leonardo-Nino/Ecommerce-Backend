const socket = io()
let user
let chatButton = document.getElementById('chatButton')
let chatBox = document.getElementById('chatBox')
let chatStart = document.getElementById('startChat')
let messagesP = document.getElementById('messagesP')


function renderMessages() {
  socket.on('messages', (dataMessage) => {
    messagesP.innerHTML = ''

    dataMessage.forEach((message) => {
      messagesP.innerHTML += `<p>${message.user} : ${message.message}<p>`
    })
  })
}
if (chatStart) {
  chatStart.addEventListener('click', () => {
    Swal.fire({
      title: 'Identification',
      input: 'text',
      text: ' Add user name ',
      inputValidator: (value) => {
        return !value && 'User name is required'
      },
      allowOutsideClick: false,
    }).then((result) => {
      user = result.value
    })
  })
}

if (chatButton) {
  chatButton.addEventListener('click', () => {
    if (chatBox.value.trim().length > 0) {
      socket.emit('message', { user: user, message: chatBox.value })
      chatBox.value = ''
    }
  })
}
renderMessages()
