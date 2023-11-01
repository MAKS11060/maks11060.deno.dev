import {Hono, bcrypt} from "../deps.ts"

const app = new Hono()
export {app as api}

const salt = await bcrypt.genSalt(10)

app.get('/b/test', async c => {
  c.json({
    salt,
    hash: await bcrypt.hash(c.req.query('p') || '', salt)
  })
})
