// Drives TypeScript 7.0.2's language server over stdio from the scaffold checkout: initialize, an
// overlay didOpen for a file that is not on disk, and both diagnostic paths (push and pull).
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const workspace = '/home/user/scaffold'
const bin = `${workspace}/node_modules/typescript/bin/tsc`
const args = process.argv.slice(2).length ? process.argv.slice(2) : ['--lsp', '--stdio']
const child = spawn(process.execPath, [bin, ...args], { cwd: workspace, stdio: ['pipe', 'pipe', 'pipe'] })
child.stderr.on('data', (d) => process.stdout.write(`[stderr] ${d}`))
let id = 0
const send = (method, params, isRequest = true) => {
  const message = JSON.stringify(isRequest ? { jsonrpc: '2.0', id: ++id, method, params } : { jsonrpc: '2.0', method, params })
  child.stdin.write(`Content-Length: ${Buffer.byteLength(message)}\r\n\r\n${message}`)
  return id
}
let buffer = Buffer.alloc(0)
const started = performance.now()
const stamp = () => `${Math.round(performance.now() - started)}ms`
child.stdout.on('data', (chunk) => {
  buffer = Buffer.concat([buffer, chunk])
  for (;;) {
    const head = buffer.indexOf('\r\n\r\n')
    if (head < 0) return
    const length = Number(/Content-Length: (\d+)/.exec(buffer.subarray(0, head).toString())?.[1])
    if (buffer.length < head + 4 + length) return
    const body = buffer.subarray(head + 4, head + 4 + length).toString()
    buffer = buffer.subarray(head + 4 + length)
    const message = JSON.parse(body)
    if (message.id !== undefined && message.method !== undefined) {
      const reply = JSON.stringify({ jsonrpc: '2.0', id: message.id, result: message.method === 'workspace/configuration' ? (message.params?.items ?? []).map(() => null) : null })
      child.stdin.write(`Content-Length: ${Buffer.byteLength(reply)}\r\n\r\n${reply}`)
      console.log(`${stamp()} -> answered server request ${message.method} (${message.id})`)
    }
    const text = JSON.stringify(message)
    console.log(`${stamp()} <- ${text.length > 1500 ? text.slice(0, 1500) + '…' : text}`)
  }
})
child.on('exit', (code, signal) => console.log(`${stamp()} server exited code=${code} signal=${signal}`))
const uri = `file://${workspace}/src/core/zz-overlay-probe.ts`
send('initialize', {
  processId: process.pid, rootUri: `file://${workspace}`, workspaceFolders: [{ uri: `file://${workspace}`, name: 'scaffold' }],
  capabilities: { textDocument: { publishDiagnostics: { relatedInformation: true }, diagnostic: { dynamicRegistration: false, relatedDocumentSupport: false } }, workspace: { diagnostics: {} } },
})
setTimeout(() => { send('initialized', {}, false); console.log(`${stamp()} -> initialized`) }, 1500)
setTimeout(() => { send('textDocument/didOpen', { textDocument: { uri, languageId: 'typescript', version: 1, text: "import { isRecord } from '@orkestrel/contract'\nexport const VALUE: number = 'text'\nexport const CHECK = isRecord(VALUE)\n" } }, false); console.log(`${stamp()} -> didOpen ${uri}`) }, 2500)
setTimeout(() => { send("textDocument/diagnostic", { textDocument: { uri } }); console.log(`${stamp()} -> textDocument/diagnostic (1)`) }, 4000)
setTimeout(() => { send("textDocument/diagnostic", { textDocument: { uri } }); console.log(`${stamp()} -> textDocument/diagnostic (2)`) }, 16000)
setTimeout(() => { send("textDocument/hover", { textDocument: { uri }, position: { line: 1, character: 14 } }); console.log(`${stamp()} -> hover`) }, 17000)
setTimeout(() => { send("textDocument/didOpen", { textDocument: { uri: `file://${workspace}/src/core/index.ts`, languageId: "typescript", version: 1, text: require("node:fs").readFileSync(`${workspace}/src/core/index.ts`, "utf8") } }, false); console.log(`${stamp()} -> didOpen on-disk index.ts`) }, 18000)
setTimeout(() => { send("textDocument/diagnostic", { textDocument: { uri: `file://${workspace}/src/core/index.ts` } }); console.log(`${stamp()} -> diagnostic on-disk`) }, 19000)
setTimeout(() => { send('shutdown', null); setTimeout(() => { send('exit', null, false); setTimeout(() => process.exit(0), 500) }, 500) }, 30000)
