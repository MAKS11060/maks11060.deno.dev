import {Hono, hMiddleware, useSocket} from "./deps.ts"
import {api} from "./routes/api.ts"

const app = new Hono()

app.use('*', hMiddleware.logger())
app.use('*', hMiddleware.serveStatic({root: 'public'}))

app.use('/ws', useSocket(socket => {
  socket.onopen = e => {
    const time = Date.now()
    // sockets.set(socket, {time})
    socket.send(JSON.stringify({
      type: 'ping',
      time,
    }))
  }
  socket.onclose = e => console.log('[ws] close')
  socket.onmessage = e => {
    // console.log(e.data)
    const data = JSON.parse(e.data)
    if (data.type === 'ping') {
      console.log(data.time - Date.now())
      socket.send(JSON.stringify({
        type: 'time',
        offset: data.time - Date.now()
      }))
    }
  }

}))


app.route('/', api)

Deno.serve({port: 80}, (r, info) => app.fetch(r, {info}))

if (Deno.env.has('KEY') && Deno.env.has('CERT')) {
  const key = Deno.readTextFileSync(Deno.env.get('KEY')!)
  const cert = Deno.readTextFileSync(Deno.env.get('CERT')!)
  Deno.serve({cert, key, port: 443}, (r, info) => app.fetch(r, {info}))
}
