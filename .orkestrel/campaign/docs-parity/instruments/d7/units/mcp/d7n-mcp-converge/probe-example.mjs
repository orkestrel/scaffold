import { createMCPServer } from '../../dist/src/core/index.js'
import { createTool, createToolManager } from '@orkestrel/tool'

const tools = createToolManager()
tools.add(
	createTool({
		name: 'search',
		description: 'Search the docs',
		execute: (a) => `found ${String(a.query)}`,
	}),
)

const server = createMCPServer({ identity: { name: 'docs', version: '1.0.0' }, tools })
server.emitter.on('request', (method, id) => console.log('request', method, id))

const listed = await server.handle(
	'{"jsonrpc":"2.0","method":"tools/list","id":1,"params":{"_meta":{"io.modelcontextprotocol/protocolVersion":"2026-07-28","io.modelcontextprotocol/clientCapabilities":{}}}}',
)
console.log('LISTED:', listed)
