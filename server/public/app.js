const socket = io('ws://localhost:3500')

const activity = document.querySelector('.activity')
const messageInput = document.querySelector('input')

function sendMesssage (e) {
  e.preventDefault()

  if(messageInput.value) {
    socket.emit('message', messageInput.value)
    messageInput.value = ''
  }
  messageInput.focus()
}

document.querySelector('form').addEventListener('submit', sendMesssage)

socket.on('message', (data) => {
  activity.textContent = ''
  const li = document.createElement('li')
  li.textContent = data
  document.querySelector('ul').appendChild(li)
})

messageInput.addEventListener('keypress', () => {
  socket.emit('activity', socket.id.substring(0, 5))
})

let activityTimer
socket.on('activity', (name) => {
  activity.textContent = `${name} is typing...`
  
  // Clear after 3 seconds
  clearTimeout(activityTimer)
  activityTimer = setTimeout(() => {
    activity.textContent = ""
  }, 3000)
})
