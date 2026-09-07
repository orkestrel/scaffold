import io
BODY = """import { createMCPServer } from '@orkestrel/mcp'
import { createTool, createToolManager } from '@orkestrel/tool'

const tools = createToolManager()
tools.add(
\tcreateTool({
\t\tname: 'search',
\t\tdescription: 'Search the docs',
\t\texecute: (a) => find(String(a.query)),
\t}),
)
tools.add(createTool({ name: 'add', execute: (a) => Number(a.x) + Number(a.y) }))

const server = createMCPServer({ identity: { name: 'docs', version: '1.0.0' }, tools })
server.emitter.on('request', (method, id) => log(method, id))

// A transport reads a framed message string and writes the reply:
for await (const message of transport) {
\tconst reply = await server.handle(message)
\tif (reply !== undefined) await transport.send(reply) // a notification has no reply
}

// `handle` also answers one message string on its own:
const listed = await server.handle(
\t'{"jsonrpc":"2.0","method":"tools/list","id":1,"params":{"_meta":{"io.modelcontextprotocol/protocolVersion":"2026-07-28","io.modelcontextprotocol/clientCapabilities":{}}}}',
)
// listed → '{"jsonrpc":"2.0","id":1,"result":{"tools":[{"name":"search","inputSchema":{"type":"object"},"description":"Search the docs"},{"name":"add","inputSchema":{"type":"object"}}],"resultType":"complete","ttlMs":60000,"cacheScope":"private","_meta":{"io.modelcontextprotocol/serverInfo":{"name":"docs","version":"1.0.0"}}}}'
"""

p='guides/mcp.md'
s=io.open(p,encoding='utf8').read()
old = """```ts
import { createMCPServer } from '@orkestrel/mcp'
import { createTool, createToolManager } from '@orkestrel/tool'

const tools = createToolManager()
tools.add(
\tcreateTool({
\t\tname: 'search',
\t\tdescription: 'Search the docs',
\t\texecute: (a) => find(String(a.query)),
\t}),
)

const server = createMCPServer({ identity: { name: 'docs', version: '1.0.0' }, tools })

// A transport reads a framed message string and writes the reply:
for await (const message of transport) {
\tconst reply = await server.handle(message)
\tif (reply !== undefined) await transport.send(reply) // a notification has no reply
}
```"""
new = "```ts\n" + BODY + "```"
assert s.count(old)==1, s.count(old)
io.open(p,'w',encoding='utf8').write(s.replace(old,new,1))

p2='src/core/factories.ts'
s2=io.open(p2,encoding='utf8').read()
oldt=" * @example\n * ```ts\n * import { createMCPServer } from '@orkestrel/mcp'\n"
newt=" * @example Expose a tool registry over MCP\n * ```ts\n * import { createMCPServer } from '@orkestrel/mcp'\n"
assert s2.count(oldt)==1, s2.count(oldt)
io.open(p2,'w',encoding='utf8').write(s2.replace(oldt,newt,1))
print('ok')
