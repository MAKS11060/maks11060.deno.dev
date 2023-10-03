import {Context, Hono, MiddlewareHandler} from "https://deno.land/x/hono@v3.7.3/mod.ts"
import {logger} from "https://deno.land/x/hono@v3.7.3/middleware.ts"

const app = new Hono({})

const ping = (cb: () => void, int: number = 1000) => {
  const i = setInterval(cb, int)
  return () => clearInterval(i)
}

const useWS = (handler: (socket: WebSocket, c: Context) => void): MiddlewareHandler => {
  return async (c, next) => {
    if (c.req.header('upgrade') !== 'websocket') {
      await next()
      return
    }

    const {socket, response} = Deno.upgradeWebSocket(c.req.raw)
    handler(socket, c)
    return response
  }
}

app.use('*', logger())
app.get('/', async (c) => c.text('123'))

app.get('/ws', useWS((socket, c) => {
  socket.onopen = e => console.log('[WS] open', c.req.header('user-agent'))
  socket.onclose = e => console.log('[WS] close', c.req.header('user-agent'))
  socket.onmessage = e => {
    socket.send(e.data)
  }
}))

Deno.serve(app.fetch)
