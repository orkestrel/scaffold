// The fix round's guide edits: exact-string replacements, each asserted to have applied once.
import { readFileSync, writeFileSync } from 'node:fs'

const root = new URL('../../', import.meta.url)

/** Replaces one exact occurrence and reports the site, refusing a pattern that is absent or repeated. */
function replaceOnce(text, from, to, label) {
	const first = text.indexOf(from)
	if (first < 0) throw new Error(`absent: ${label}`)
	if (text.indexOf(from, first + from.length) >= 0) throw new Error(`repeated: ${label}`)
	console.log(`applied: ${label}`)
	return text.slice(0, first) + to + text.slice(first + from.length)
}

/** Replaces every occurrence of an exact string and reports how many sites moved. */
function replaceEvery(text, from, to, label) {
	const parts = text.split(from)
	if (parts.length < 2) throw new Error(`absent: ${label}`)
	console.log(`applied: ${label} at ${parts.length - 1} sites`)
	return parts.join(to)
}

const guidePath = new URL('guides/lsp.md', root)
let guide = readFileSync(guidePath, 'utf8')

// Item 1 — each colon-ended lead-in ends with a period, so the convention sentence introduces the table.
for (const lead of [
	'The server surface provides these exports:',
	'The client surface provides these entities and configuration contracts:',
	'The framing, timing, and error surface provides these exports:',
	'The JSON-RPC and initialization surface provides these payload types:',
	'The document and diagnostic surface provides these payload types:',
	'The validation surface provides these guards:',
	'The constant surface provides these protocol names, advertisements, and limits:',
]) guide = replaceOnce(guide, `${lead}\n`, `${lead.slice(0, -1)}.\n`, `lead-in ${lead}`)

// Item 2 — the two Surface subsection names take the guide's own vocabulary.
guide = replaceOnce(guide, '\n### Stdio transport\n', '\n### Stdio client transport\n', 'heading Stdio transport')
guide = replaceOnce(guide, '\n### Client\n', '\n### Client and transport contracts\n', 'heading Client')

// Item 4 — a complete sentence introduces each fence that had none.
guide = replaceOnce(
	guide,
	"and `error` receives a listener throw that the emitter would otherwise swallow.\n\n```ts",
	"and `error` receives a listener throw that the emitter would otherwise swallow.\n\nSpawn a language server as a child process and drive it through the stdio transport:\n\n```ts",
	'fence lead-in, stdio client transport',
)
guide = replaceOnce(
	guide,
	'`readLSPHeader()` reads and the body starts at `boundary + 4`.\n\n```ts',
	"`readLSPHeader()` reads and the body starts at `boundary + 4`.\n\nFlatten a retained state, scan that buffer for the header boundary, and take the state's last bytes:\n\n```ts",
	'fence lead-in, retained state',
)
guide = replaceOnce(
	guide,
	'so a caller that has already decoded frames keeps them through a refusal.\n\n```ts',
	'so a caller that has already decoded frames keeps them through a refusal.\n\nEncode one message, then read its declared length and its body back at the boundary offsets:\n\n```ts',
	'fence lead-in, own framing',
)

// Item 5 — the titled fence reads the diagnostics its lead-in promises.
guide = replaceOnce(
	guide,
	'\t{ signal },\n)\nawait client.close(uri)',
	'\t{ signal },\n)\nfor (const diagnostic of diagnostics) console.log(diagnostic.message)\nawait client.close(uri)',
	'titled fence reads diagnostics',
)

// Item 8 — every function row holds its signature, every guard row the type it narrows to.
const shapes = [
	['createStdioClientTransport', '(options: StdioClientTransportOptions) => StdioClientTransportInterface'],
	['createLSPClient', '(options: LSPClientOptions) => LSPClientInterface'],
	['encodeLSPMessage', '(message: JSONRPCMessage) => Uint8Array'],
	[
		'parseLSPMessages',
		'(chunk: Uint8Array, state?: LSPDecodeState) => readonly [messages: readonly JSONRPCMessage[], state: LSPDecodeState \\| undefined]',
	],
	['joinLSPSegments', '(state: LSPDecodeState) => Uint8Array'],
	['takeLSPTail', '(state: LSPDecodeState, count: number) => Uint8Array'],
	['scanLSPBoundary', '(bytes: Uint8Array) => number \\| undefined'],
	['readLSPHeader', '(header: Uint8Array, messages?: readonly JSONRPCMessage[]) => number'],
	['readLSPBody', '(body: Uint8Array, messages?: readonly JSONRPCMessage[]) => JSONRPCMessage'],
	['waitForDeadline', '(timeout: number) => Promise<void>'],
	['isLSPError', 'LSPError'],
]
const lines = guide.split('\n')
for (const [name, shape] of shapes) {
	const index = lines.findIndex((line) => line.startsWith(`| \`${name}\``) && / \| function +\| +\| /.test(line))
	if (index < 0) throw new Error(`absent row: ${name}`)
	const cells = lines[index].split('|')
	if (cells[3].trim() !== '') throw new Error(`occupied Shape cell: ${name}`)
	cells[3] = ` \`${shape}\` `
	lines[index] = cells.join('|')
	console.log(`applied: Shape cell ${name}`)
}
guide = lines.join('\n')

// Item 8 — the convention sentence each table carrying a function row now needs.
const functionSentence =
	" A function row's `Shape` cell holds its signature, and a guard row's the type it narrows to."
const conventionLead = "A `Shape` cell holds an interface's data members as bare names in braces,"
for (const heading of ['### Stdio client transport', '### Client and transport contracts', '### Framing, timing, and errors']) {
	const rows = guide.split('\n')
	const head = rows.indexOf(heading)
	if (head < 0) throw new Error(`absent heading: ${heading}`)
	const site = rows.findIndex((line, index) => index > head && line.startsWith(conventionLead))
	if (site < 0) throw new Error(`absent convention sentence under: ${heading}`)
	if (rows[site].includes('A function row')) throw new Error(`already carried: ${heading}`)
	rows[site] = rows[site] + functionSentence
	guide = rows.join('\n')
	console.log(`applied: convention sentence under ${heading}`)
}
writeFileSync(guidePath, guide)

// Item 5's other side — the same read in the titled `@example` block.
const factoriesPath = new URL('src/core/factories.ts', root)
let factories = readFileSync(factoriesPath, 'utf8')
factories = replaceOnce(
	factories,
	' * \t{ signal },\n * )\n * await client.close(uri)',
	' * \t{ signal },\n * )\n * for (const diagnostic of diagnostics) console.log(diagnostic.message)\n * await client.close(uri)',
	'titled block reads diagnostics',
)
writeFileSync(factoriesPath, factories)

// Item 3 — the fixture description names the unit the code returns.
const protocolPath = new URL('tests/src/server/fixtures/protocol.mjs', root)
let protocol = readFileSync(protocolPath, 'utf8')
protocol = replaceOnce(
	protocol,
	' * Encodes a JSON-RPC message as one Content-Length base-protocol payload.\n',
	' * Encodes a JSON-RPC message with its Content-Length header as one base-protocol buffer.\n',
	'protocol.mjs description',
)
writeFileSync(protocolPath, protocol)

// Item 6 — `destroy` regains the drain fact.
const typesPath = new URL('src/core/types.ts', root)
let types = readFileSync(typesPath, 'utf8')
types = replaceOnce(
	types,
	'\t * @remarks A close failure that settles before the deadline is emitted before the emitter is\n\t * destroyed. At the deadline, the client emits a coded `timeout` error and absorbs the later\n\t * close outcome.\n',
	'\t * @remarks Pending operations reject with an `LSPError` coded `closed` before the `shutdown`\n\t * request is written. A close failure that settles before the deadline is emitted before the\n\t * emitter is destroyed. At the deadline, the client emits a coded `timeout` error and absorbs the\n\t * later close outcome.\n',
	'destroy @remarks',
)
writeFileSync(typesPath, types)

// Item 7 — every comment line in the server setup rewraps at the configured print width.
const setupPath = new URL('tests/setupServer.ts', root)
let setup = readFileSync(setupPath, 'utf8')
setup = replaceOnce(
	setup,
	' * Names the value this process carries in `LSP_FIXTURE_AMBIENT` so a child can report what it inherited.\n',
	' * Names the value this process carries in `LSP_FIXTURE_AMBIENT` so a child can report what it\n * inherited.\n',
	'setupServer FIXTURE_AMBIENT description',
)
setup = replaceOnce(
	setup,
	" * @remarks A host adds variables to a child's environment on its own account: Windows copies `PATH`,\n * `TEMP`, `USERPROFILE`, and the rest of its required set into every child whatever environment the\n * spawn configured, so `PATH` reports the same value there whether a spawn replaced the environment\n * or inherited it. No host injects this variable, so a child that reports it inherited the parent's\n * environment and a child that reports `null` received the configured environment alone.",
	" * @remarks A host adds variables to a child's environment on its own account: Windows copies\n * `PATH`, `TEMP`, `USERPROFILE`, and the rest of its required set into every child whatever\n * environment the spawn configured, so `PATH` reports the same value there whether a spawn replaced\n * the environment or inherited it. No host injects this variable, so a child that reports it\n * inherited the parent's environment and a child that reports `null` received the configured\n * environment alone.",
	'setupServer FIXTURE_AMBIENT remarks',
)
setup = replaceOnce(
	setup,
	'/** Names the workspace the Oxlint receipt lints, pinned to one rule so its diagnostics stay fixed. */\n',
	'/**\n * Names the workspace the Oxlint receipt lints, pinned to one rule so its diagnostics stay fixed.\n */\n',
	'setupServer OXLINT_FILES description',
)
setup = replaceOnce(
	setup,
	' * @remarks A caller that needs the value cannot proceed without it, so an absent or off-shape member\n * fails here rather than reaching an assertion as a stand-in number.\n',
	' * @remarks A caller that needs the value cannot proceed without it, so an absent or off-shape\n * member fails here rather than reaching an assertion as a stand-in number.\n',
	'setupServer readPeerNumber remarks',
)
writeFileSync(setupPath, setup)
