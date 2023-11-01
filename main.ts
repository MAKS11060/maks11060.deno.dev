import {Hono, logger} from "./deps.ts"
import {api} from "./routes/api.ts"

const app = new Hono()

app.use('*', logger())

app.route('/', api)

Deno.serve({port: 80}, (r, info) => app.fetch(r, {info}))

if (Deno.env.has('KEY') && Deno.env.has('CERT')) {
  const key = Deno.readTextFileSync(Deno.env.get('KEY')!)
  const cert = Deno.readTextFileSync(Deno.env.get('CERT')!)
  Deno.serve({cert, key, port: 443}, (r, info) => app.fetch(r, {info}))
}
