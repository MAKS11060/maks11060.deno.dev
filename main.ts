import './deps.ts'
import {Hono} from 'hono'
import api from './src/api/api.ts'
import web from './web.ts'

const app = new Hono()

app.route('/', api)
app.route('/', web)

if (Deno.env.has('KEY') && Deno.env.has('CERT')) {
  const key = Deno.readTextFileSync(Deno.env.get('KEY')!).replaceAll('EC ', '') // for compatibility
  const cert = Deno.readTextFileSync(Deno.env.get('CERT')!)
  Deno.serve({key, cert, port: 443}, (r, info) => app.fetch(r, {info}))
}

Deno.serve({port: 80}, (r, info) => app.fetch(r, {info}))
