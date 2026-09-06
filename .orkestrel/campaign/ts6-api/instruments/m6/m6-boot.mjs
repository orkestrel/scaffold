// M6: boot and warm-prove wall clock of the built server entry, driven as a hand-written
// newline-delimited JSON-RPC line client the way a harness drives it. Boot is spawn to the first
// answered `tools/call`; warm is the next `tools/call` on the same child. Run: node m6-boot.mjs [rounds]
import { spawn } from 'node:child_process'
import { rmSync } from 'node:fs'
import { createInterface } from 'node:readline'
const ROOT = '/home/user/fleet/probe'
const ENTRY = `${ROOT}/dist/bin/main.js`
const test = {
  path: 'tmp/probe/greeting.test.ts',
  text: "import { expect, test } from 'vitest'\nimport { GREETING } from '../../src/core/greeting.js'\ntest('greets', () => expect(GREETING).toBe('hi'))\n",
}
const claim = {
  project: 'configs/src/tsconfig.core.json',
  case: { files: [{ path: 'src/core/greeting.ts', text: "export const GREETING = 'hi'\n" }], test },
  control: { files: [{ path: 'src/core/greeting.ts', text: "export const GREETING: number = 'hi'\n" }], test, stage: 'type', reason: 'a string literal assigned to a number must not compile' },
}
const rounds = Number.parseInt(process.argv[2] ?? '3', 10)
function lastLine(message) {
  const text = message?.result?.content?.[0]?.text ?? ''
  const lines = text.split(/\r\n|\n/u).filter((line) => line.length > 0)
  return lines.at(-1) ?? `(no text; error=${JSON.stringify(message?.error ?? null)})`
}
for (let round = 1; round <= rounds; round += 1) {
  rmSync(`${ROOT}/tmp/probe`, { force: true, recursive: true })
  const t0 = performance.now()
  const child = spawn(process.execPath, [ENTRY], { cwd: ROOT, stdio: ['pipe', 'pipe', 'pipe'] })
  const errors = []
  child.stderr.on('data', (chunk) => errors.push(chunk))
  const output = createInterface({ input: child.stdout })
  const pending = new Map()
  output.on('line', (line) => {
    let message
    try { message = JSON.parse(line) } catch { return }
    const settle = pending.get(message.id)
    if (settle) { pending.delete(message.id); settle(message) }
  })
  const ask = (id, method, params) => new Promise((resolve) => {
    pending.set(id, resolve)
    child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id, method, params })}\n`)
  })
  const init = await ask(1, 'initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'm6', version: '0.0.0' } })
  const tInit = performance.now() - t0
  child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' })}\n`)
  const first = await ask(2, 'tools/call', { name: 'prove', arguments: claim })
  const tBoot = performance.now() - t0
  const w0 = performance.now()
  const second = await ask(3, 'tools/call', { name: 'prove', arguments: claim })
  const tWarm = performance.now() - w0
  console.log(`round ${round}: initialize answered at ${tInit.toFixed(0)} ms (serverInfo=${JSON.stringify(init?.result?.serverInfo ?? null)}); boot to first answered tools/call ${tBoot.toFixed(0)} ms [${lastLine(first)}]; warm prove ${tWarm.toFixed(0)} ms [${lastLine(second)}]`)
  child.stdin.end()
  const exit = new Promise((resolve) => child.once('exit', (code, signal) => resolve(`${code}/${signal}`)))
  const timer = setTimeout(() => child.kill('SIGTERM'), 10_000)
  const status = await exit
  clearTimeout(timer)
  console.log(`round ${round}: child exit ${status}; stderr=${Buffer.concat(errors).toString('utf8').trim().slice(0, 300) || '(empty)'}`)
}
