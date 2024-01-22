export const kv = await Deno.openKv() // local from CWD
// export const kv = await Deno.openKv(':memory:')
// export const kv = await Deno.openKv('.tmp/store.sqlite')

export const dropKV = async (kv: Deno.Kv) => {
  for await (const item of kv.list({prefix: []})) {
    await kv.delete(item.key)
  }
}

export const printKV = async (kv: Deno.Kv, key: Deno.KvKey = []) => {
  for await (const item of kv.list({prefix: key})) {
    console.log(item.key, item.value)
  }
}
