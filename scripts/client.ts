#!/usr/bin/env -S deno run --allow-all

const socket = new WebSocket('wss://maks11060.deno.dev/ws')
// const socket = new WebSocket('ws://localhost:8000/ws')

socket.onopen = ev => {
  console.log(`[WS] open`, new Date().toLocaleString())
}
socket.onclose = ev => console.log(`[WS] close`, new Date().toLocaleString())
socket.onerror = ev => console.error(`socket err`, ev)
socket.onmessage = ev => {
  console.log(`socket message`, ev.data)
}
