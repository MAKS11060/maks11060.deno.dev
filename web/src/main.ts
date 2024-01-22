const posts = document.querySelector('#posts')

// posts.

/* const ws = new WebSocket(
  `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.hostname}/ws`
)
ws.onopen = (e) => console.log('[ws] open')
ws.onclose = (e) => console.log('[ws] close')
ws.onmessage = (e) => {
  const data = JSON.parse(e.data)
  console.log(data)
  if (data.type === 'ping')
    ws.send(JSON.stringify({type: 'ping', time: Date.now()}))
  if (data.type === 'time')
    document.querySelector('#time').textContent = data.offset
}
 */