import { createMCPServer } from '../../dist/src/core/index.js'
import { createTool, createToolManager } from '@orkestrel/tool'
const tools = createToolManager()
tools.add(createTool({ name: 'search', description: 'Search the docs', execute: (a) => `x${String(a.query)}` }))
tools.add(createTool({ name: 'add', execute: (a) => Number(a.x) + Number(a.y) }))
const server = createMCPServer({ identity: { name: 'docs', version: '1.0.0' }, tools })
server.emitter.on('request', (method, id) => void [method, id])
const listed = await server.handle('{"jsonrpc":"2.0","method":"tools/list","id":1,"params":{"_meta":{"io.modelcontextprotocol/protocolVersion":"2026-07-28","io.modelcontextprotocol/clientCapabilities":{}}}}')
console.log(listed)
