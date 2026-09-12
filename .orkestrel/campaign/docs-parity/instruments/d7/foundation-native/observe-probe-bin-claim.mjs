import { mkdirSync, readFileSync, rmdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const PASSING =
	"import { expect, test } from 'vitest'\ntest('passes', () => expect(2 + 2).toBe(4))\n"
const CLEAN = "export const VALUE = 'ok'\n"
const BROKEN = "export const VALUE: number = 'bad'\n"
const REASON = 'the source assigns a string to a number'
const TIMEOUT = 300_000

function buildClaim(mode) {
	const path = mode === 'baseline' ? 'src/core/diagnostic.ts' : 'src/core/diagnostic/constants.ts'
	const specification = {
		path: `tmp/probe/bin/observe-${mode}-runtime.test.ts`,
		text: PASSING,
	}
	return {
		project: 'configs/src/tsconfig.core.json',
		case: { files: [{ path, text: CLEAN }], test: specification },
		control: {
			files: [{ path, text: BROKEN }],
			test: specification,
			stage: 'type',
			reason: REASON,
		},
	}
}

const mode = process.argv[2]
if (process.argv.length !== 3 || (mode !== 'baseline' && mode !== 'constants')) {
	throw new Error('mode must be baseline or constants')
}

const instrument = dirname(fileURLToPath(import.meta.url))
const probe = resolve(instrument, '../../../probe')
const entry = resolve(probe, 'dist/bin/main.js')
const directory = resolve(probe, 'tmp/probe/bin')
const mcpRoot = resolve(probe, 'node_modules/@orkestrel/mcp')
const mcpManifest = JSON.parse(readFileSync(resolve(mcpRoot, 'package.json'), 'utf8'))
if (mcpManifest.version !== '0.0.29') throw new Error('installed MCP version must be 0.0.29')

const mcpCore = pathToFileURL(resolve(mcpRoot, 'dist/src/core/index.js')).href
const mcpServer = pathToFileURL(resolve(mcpRoot, 'dist/src/server/index.js')).href
const probeCore = pathToFileURL(resolve(probe, 'dist/src/core/index.js')).href
const { MCP_FALLBACK_VERSION, createMCPClient, createMCPLegacyClientTransport } = await import(mcpCore)
const { createStdioClientTransport } = await import(mcpServer)
const { formatVerdict, isVerdict } = await import(probeCore)

const original = process.cwd()
mkdirSync(directory, { recursive: true })
process.chdir(probe)
let client
let verdict
let formatted
let failure
try {
	client = createMCPClient({
		transport: createMCPLegacyClientTransport(
			createStdioClientTransport({ command: process.execPath, args: [entry] }),
			{
				identity: { name: `probe-bin-observation-${mode}`, version: '1.0.0' },
				version: MCP_FALLBACK_VERSION,
				timeout: TIMEOUT,
			},
		),
		identity: { name: `probe-bin-observation-${mode}`, version: '1.0.0' },
		timeout: TIMEOUT,
	})
	await client.connect()
	const outcome = await client.call('prove', buildClaim(mode))
	if (outcome.resultType !== 'complete') throw new Error('probe result must be complete')
	if (!isVerdict(outcome.value)) throw new Error('probe result must be a Verdict')
	verdict = outcome.value
	formatted = formatVerdict(verdict)
} catch (error) {
	failure = error
}

try {
	if (client !== undefined) await client.disconnect()
} catch (error) {
	if (failure === undefined) failure = error
}
try {
	rmdirSync(directory)
} catch {}
process.chdir(original)

if (failure !== undefined) throw failure
process.stdout.write(`${JSON.stringify({ mode, verdict, formatted }, undefined, 2)}\n`)
