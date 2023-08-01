const ping = (int: number = 30_000, cb: () => void) => {
  const i = setInterval(cb, int)
  return () => clearInterval(i)
}

Deno.serve((req: Request, info) => {
  const uri = new URL(req.url)

  if (req.headers.has('upgrade') && req.headers.get('upgrade') === 'websocket') {
    const {socket, response} = Deno.upgradeWebSocket(req)

    let pingCounter = 0
    const pingCancel = ping(15_000, () => {
      socket.send(JSON.stringify({
        type: 'ping',
        ts: Date.now(),
        n: pingCounter++,
      }))
    })

    socket.onopen = ev => {
      console.log(`[ws] open: ${uri.toString()} ${req.headers.get('user-agent')}`)
      socket.send(JSON.stringify({
        type: 'connect',
        data: {
          ts: Date.now(),
          ip: info.remoteAddr.hostname,
          agent: req.headers.get('user-agent'),
        },
      }))
    }
    socket.onerror = ev => {
      console.log(`[ws] error`, ev)
    }
    socket.onclose = ev => {
      pingCancel()
      console.log(`[ws] close: ${uri.toString()} ${req.headers.get('user-agent')}`)
    }
    socket.onmessage = ev => {
      console.log(`[ws] message: ${uri.toString()} ${req.headers.get('user-agent')}`)
      console.log(ev.data)
    }

    return response
  }

  return Response.json({
    error: 'Not found!',
  })
})
