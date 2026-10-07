// Starts one stdio MCP server, sends initialize and tools/list, prints the server's name, version, and tool names; log: stdout; cap: 20 s per server; supersedes nothing.
import { spawn } from 'node:child_process'
const [command, ...rest] = process.argv.slice(2)
const cwd = process.env['MCP_CWD'] ?? process.cwd()
const child = spawn(command ?? 'node', rest, { cwd, env: { ...process.env }, stdio: ['pipe', 'pipe', 'pipe'] })
let buffer = ''
const results: string[] = []
const send = (message: object) => child.stdin.write(JSON.stringify(message) + '\n')
child.stdout.on('data', (chunk) => {
	buffer += String(chunk)
	let index = buffer.indexOf('\n')
	while (index >= 0) {
		const line = buffer.slice(0, index).trim()
		buffer = buffer.slice(index + 1)
		if (line.startsWith('{')) {
			const message = JSON.parse(line)
			if (message.id === 1) {
				results.push(`server ${message.result?.serverInfo?.name} ${message.result?.serverInfo?.version} protocol ${message.result?.protocolVersion}`)
				send({ jsonrpc: '2.0', method: 'notifications/initialized' })
				send({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} })
			} else if (message.id === 2) {
				const tools = (message.result?.tools ?? []).map((tool: { name: string }) => tool.name)
				results.push(`tools (${tools.length}): ${tools.join(', ')}`)
				console.log(results.join('\n'))
				child.kill('SIGTERM')
			}
		}
		index = buffer.indexOf('\n')
	}
})
child.stderr.on('data', (chunk) => process.stderr.write(chunk))
child.on('exit', (code, signal) => { if (results.length < 2) { console.log(`exit ${code} ${signal ?? ''} before the handshake completed; results: ${results.join(' | ')}`); process.exit(1) } process.exit(0) })
send({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'handshake', version: '0' } } })
setTimeout(() => { console.log('timeout; results: ' + results.join(' | ')); child.kill('SIGKILL'); process.exit(2) }, 120000)
