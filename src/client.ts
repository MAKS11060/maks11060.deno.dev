#!/usr/bin/env -S deno run --allow-all

// const socket = new WebSocket('wss://maks11060.deno.dev')
const socket = new WebSocket('ws://localhost:8000/ws')

socket.onopen = ev => console.log(`socket open`)
socket.onerror = ev => console.error(`socket err`, ev)
socket.onclose = ev => console.log(`socket close`, ev)

socket.onmessage = ev => {
  console.log(`socket message`, ev.data)
}
