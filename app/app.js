const socket = new WebSocket('ws://localhost:3000')

function sendMesssage (e) {
  e.preventDefault()
  const input = document.querySelector('input')
  if(input.value) {
    socket.send(input.value)
    input.value = ''
  }
  input.focus()
}


document.querySelector('form').addEventListener('submit', sendMesssage)

socket.addEventListener('message', ({data}) => {
  const li = document.createElement('li')
  li.textContent = data
  document.querySelector('ul').appendChild(li)
})
