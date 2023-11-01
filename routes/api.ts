import {Hono, useSocket} from "../deps.ts"

const app = new Hono()
export {app as api}

app.use('/ws', useSocket(socket => {
  socket.onopen = e => {
    const time = Date.now()
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

// const salt = await bcrypt.genSaltSync(10)

// app.get('/b/test', async c => {
// console.log(salt)
// return c.json({
// salt,
// hash: await bcrypt.hashSync(c.req.query('p') || '', salt)
// })
// })
