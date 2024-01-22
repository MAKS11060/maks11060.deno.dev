import {Hono} from 'hono'
import apiDev from './apiDev.ts'

const app = new Hono().basePath('/api')

app.route('/', apiDev)

/*
type User = {username: string; email: string}

const userById = (id: string) => ['user', id]
const userByEmail = (email: string) => ['userByEmail', email]
const userByUsername = (username: string) => ['userByUsername', username]

const insertUser = async (data: User) => {
  const op = kv.atomic()
  const user = {
    id: ulid(),
    username: data.username,
    email: data.email,
  }

  op.check({key: userByEmail(user.email), versionstamp: null})
  op.check({key: userByUsername(user.username), versionstamp: null})

  op.set(userById(user.id), user)
  op.set(userByEmail(user.email), user)
  op.set(userByUsername(user.username), user)

  const r = await op.commit()
}

app.post('/post', async (c) => {
  const fd = await c.req.formData()
  const username = fd.get('username') as string
  const email = fd.get('email') as string
  await insertUser({username, email})

  return c.redirect('/')
})

app.get('/kv', async (c) => {
  const res = await Array.fromAsync(kv.list({prefix: []}), (item) => [
    item.key.join(' '),
    item.value,
  ]).then(Object.fromEntries)

  return c.json({kv: res})
})
 */

// app.use(
//   '/ws',
//   useSocket((socket) => {
//     socket.onopen = (e) => {
//       const time = Date.now()
//       socket.send(
//         JSON.stringify({
//           type: 'ping',
//           time,
//         })
//       )
//     }
//     socket.onclose = (e) => console.log('[ws] close')
//     socket.onmessage = (e) => {
//       // console.log(e.data)
//       const data = JSON.parse(e.data)
//       if (data.type === 'ping') {
//         console.log(data.time - Date.now())
//         socket.send(
//           JSON.stringify({
//             type: 'time',
//             offset: data.time - Date.now(),
//           })
//         )
//       }
//     }
//   })
// )

export default app
