import {Hono} from 'hono'
import {kv, dropKV} from '../database/kv.ts'

const app = new Hono()

app.get('/kv', async (c) => {
  const res = await Array.fromAsync(kv.list({prefix: []}), (item) => [
    item.key.join(' '),
    item.value,
  ]).then(Object.fromEntries)

  return c.json({
    _: '/api/kv',
    _drop: '/api/kv/drop',
    kv: res,
  })
})

app.get('/kv/drop', async (c) => {
  await dropKV(kv)
  return c.redirect('/api/kv?drop=true')
})

export default app
