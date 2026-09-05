// Times the Oxlint language server's `initialize` round trip exactly as LintStage spawns it:
// [process.execPath, <oxlint bin>, '--lsp'], JSON-RPC over stdio with Content-Length framing.
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
const workspace = process.argv[2] ?? process.cwd()
const require = createRequire(resolve(workspace, 'package.json'))
const manifest = require('oxlint/package.json')
const binary = resolve(require.resolve('oxlint/package.json'), '..', manifest.bin.oxlint)
const rounds = Number(process.argv[3] ?? '3')
for (let round = 0; round < rounds; round += 1) {
  const started = performance.now()
  const child = spawn(process.execPath, [binary, '--lsp'], { cwd: workspace, stdio: ['pipe', 'pipe', 'pipe'] })
  const message = JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { processId: process.pid, rootUri: `file://${workspace}`, capabilities: {}, workspaceFolders: [{ uri: `file://${workspace}`, name: 'ws' }] } })
  child.stdin.write(`Content-Length: ${Buffer.byteLength(message)}\r\n\r\n${message}`)
  let buffered = ''
  const answered = await new Promise((done) => {
    const timer = setTimeout(() => done({ timeout: true }), 10_000)
    child.stdout.on('data', (chunk) => { buffered += chunk.toString(); if (buffered.includes('"result"')) { clearTimeout(timer); done({ timeout: false }) } })
    child.on('exit', (code, signal) => { clearTimeout(timer); done({ exited: code, signal }) })
  })
  const elapsed = Math.round(performance.now() - started)
  console.log(`round ${round + 1}: ${JSON.stringify(answered)} after ${elapsed} ms (${binary})`)
  child.kill()
}
