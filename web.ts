import {Hono} from 'hono'
import {serveStatic} from 'hono/deno'
import {esbuildTranspiler} from 'npm:@hono/esbuild-transpiler'
import * as esbuild from 'https://deno.land/x/esbuild@v0.19.5/wasm.js'

export const app = new Hono()

await esbuild.initialize({
  wasmURL: 'https://deno.land/x/esbuild@v0.19.5/esbuild.wasm',
  worker: false,
})

app.get(
  '*',
  async (c, next) => {
    await next()
    if (c.res.headers.get('content-type') === 'video/mp2t') {
      c.header('content-type', 'text/javascript')
    }
  },
  esbuildTranspiler({
    esbuild,
    transformOptions: {
      sourcemap: 'inline',
    },
  }),
  serveStatic({root: './web'})
)

export default app
