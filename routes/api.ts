import {Hono, bcrypt} from "../deps.ts"

const app = new Hono()
export {app as api}

const salt = await bcrypt.genSaltSync(10)

app.get('/b/test', async c => {
  console.log(salt)
  return c.json({
    salt,
    hash: await bcrypt.hashSync(c.req.query('p') || '', salt)
  })
})
