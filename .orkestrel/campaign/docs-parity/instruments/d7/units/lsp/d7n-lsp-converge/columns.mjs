// Inserts the `Shape` column into every `## Surface` table of guides/lsp.md and renames
// each table's final compared header to `Summary`. Rows split on a pipe not preceded by a
// backslash; every non-`Summary` cell is carried across unchanged.
import { readFileSync, writeFileSync } from 'node:fs'

const SHAPES = new Map(
	Object.entries({
		StdioClientTransportInterface: '`LSPTransportInterface plus { pid }`',
		StdioClientTransportOptions: '`{ on?, error?, server, grace? }`',
		LSPClientInterface: '`{ emitter, capabilities, encoding } plus start, open, close, destroy`',
		LSPClientOptions: '`{ on?, error?, transport, workspace, timeout?, signal? }`',
		LSPOpenOptions: '`{ signal }`',
		LSPClientEventMap: '`{ notification, exit, error }`',
		LSPClientLifecycle:
			"`{ phase: 'idle' } \\| { phase: 'starting', promise, generation } \\| { phase: 'ready', generation } \\| { phase: 'closed' } \\| { phase: 'destroying', promise, generation? } \\| { phase: 'destroyed' }`",
		LSPClientCapabilities: '`{ general?, textDocument? }`',
		LSPTransportInterface: '`{ emitter } plus start, send, close`',
		LSPTransportEventMap: '`{ chunk, exit, error }`',
		LSPPending: '`{ resolve, reject, signal, abort }`',
		LSPDecodeState:
			'`{ bytes, previous?, size } \\| { bytes, previous?, size, boundary, length }`',
		LSPErrorCode:
			"`'spawn' \\| 'framing' \\| 'protocol' \\| 'duplicate' \\| 'server' \\| 'timeout' \\| 'aborted' \\| 'closed'`",
		LSPErrorContext: '`{ code?, messages?, value? }`',
		LSPErrorOptions: '`{ code, context?, cause? }`',
		JSONRPCId: '`string \\| number`',
		JSONRPCRequest: '`{ jsonrpc, id, method, params? }`',
		JSONRPCNotification: '`{ jsonrpc, method, id?, params? }`',
		JSONRPCError: '`{ code, message, data? }`',
		JSONRPCResultResponse: '`{ jsonrpc, id, result, error? }`',
		JSONRPCErrorResponse: '`{ jsonrpc, id, error, result? }`',
		JSONRPCResponse: '`JSONRPCResultResponse \\| JSONRPCErrorResponse`',
		JSONRPCMessage: '`JSONRPCRequest \\| JSONRPCNotification \\| JSONRPCResponse`',
		LSPIdentity: '`{ name, version? }`',
		LSPInitializeParams: '`{ processId, clientInfo?, rootUri, capabilities }`',
		LSPInitializeResult: '`{ capabilities, serverInfo? }`',
		LSPServerCapabilities: '`{ positionEncoding?, textDocumentSync?, diagnosticProvider? }`',
		LSPExit: '`{ code, signal }`',
		LSPDocumentURI: '`string`',
		LSPPosition: '`{ line, character }`',
		LSPRange: '`{ start, end }`',
		LSPLocation: '`{ uri, range }`',
		LSPTextDocumentIdentifier: '`{ uri }`',
		LSPTextDocumentItem: '`{ uri, languageId, version, text }`',
		LSPDiagnosticSeverity: '`1 \\| 2 \\| 3 \\| 4`',
		LSPDiagnosticTag: '`1 \\| 2`',
		LSPCodeDescription: '`{ href }`',
		LSPDiagnosticRelated: '`{ location, message }`',
		LSPDiagnostic:
			'`{ range, severity?, code?, codeDescription?, source?, message, tags?, relatedInformation?, data? }`',
		LSPPublishDiagnosticsParams: '`{ uri, version?, diagnostics }`',
		LSPDocumentDiagnosticParams: '`{ textDocument, identifier?, previousResultId? }`',
		LSPDocumentDiagnosticReport:
			"`{ kind: 'full', resultId?, items } \\| { kind: 'unchanged', resultId }`",
		LSPPositionEncoding: '`string`',
		LSPTextDocumentSyncKind: '`0 \\| 1 \\| 2`',
		LSPTextDocumentSyncOptions: '`{ openClose?, change? }`',
		LSPTextDocumentSync: '`LSPTextDocumentSyncKind \\| LSPTextDocumentSyncOptions`',
		LSPDiagnosticOptions: '`{ identifier?, interFileDependencies, workspaceDiagnostics }`',
		isJSONRPCError: '`JSONRPCError`',
		isJSONRPCRequest: '`JSONRPCRequest`',
		isJSONRPCNotification: '`JSONRPCNotification`',
		isJSONRPCResponse: '`JSONRPCResponse`',
		isLSPPosition: '`LSPPosition`',
		isLSPRange: '`LSPRange`',
		isLSPLocation: '`LSPLocation`',
		isLSPCodeDescription: '`LSPCodeDescription`',
		isLSPDiagnosticRelated: '`LSPDiagnosticRelated`',
		isLSPDiagnostic: '`LSPDiagnostic`',
		isLSPPublishDiagnosticsParams: '`LSPPublishDiagnosticsParams`',
		isLSPDocumentDiagnosticReport: '`LSPDocumentDiagnosticReport`',
		isLSPIdentity: '`LSPIdentity`',
		isLSPDiagnosticSeverity: '`LSPDiagnosticSeverity`',
		isLSPDiagnosticTag: '`LSPDiagnosticTag`',
		isLSPTextDocumentSyncKind: '`LSPTextDocumentSyncKind`',
		isLSPTextDocumentSyncOptions: '`LSPTextDocumentSyncOptions`',
		isLSPDiagnosticOptions: '`LSPDiagnosticOptions`',
		isLSPServerCapabilities: '`LSPServerCapabilities`',
		isLSPInitializeResult: '`LSPInitializeResult`',
		LSP_METHODS: '`Readonly<Record<string, string>>`',
		LSP_ENCODINGS: '`readonly string[]`',
		LSP_ERROR_CODES: '`readonly LSPErrorCode[]`',
		LSP_DIAGNOSTIC_SEVERITIES: '`readonly LSPDiagnosticSeverity[]`',
		LSP_DIAGNOSTIC_TAGS: '`readonly LSPDiagnosticTag[]`',
		LSP_SYNC_KINDS: '`readonly LSPTextDocumentSyncKind[]`',
		LSP_CAPABILITIES: '`LSPClientCapabilities`',
		LSP_TIMEOUT: '`number`',
		JSONRPC_PARSE_ERROR: '`number`',
		JSONRPC_INVALID_REQUEST: '`number`',
		JSONRPC_METHOD_NOT_FOUND: '`number`',
		JSONRPC_INVALID_PARAMS: '`number`',
		JSONRPC_INTERNAL_ERROR: '`number`',
		LSP_REQUEST_CANCELLED: '`number`',
		LSP_CONTENT_MODIFIED: '`number`',
		LSP_SERVER_CANCELLED: '`number`',
		LSP_REQUEST_FAILED: '`number`',
		LSP_CONTENT_LIMIT: '`number`',
		LSP_HEADER_LIMIT: '`number`',
	}),
)

/**
 * Splits one Markdown table row into its cells.
 *
 * @param line - The row, leading and trailing pipe included.
 * @returns The trimmed cells between the outer pipes.
 */
function splitRow(line) {
	const inner = line.trim().replace(/^\|/, '').replace(/\|$/, '')
	return inner.split(/(?<!\\)\|/).map((cell) => cell.trim())
}

/**
 * Joins cells back into one Markdown table row.
 *
 * @param cells - The cells to join.
 * @returns The row, leading and trailing pipe included.
 */
function joinRow(cells) {
	return `| ${cells.join(' | ')} |`
}

const path = process.argv[2]
const lines = readFileSync(path, 'utf8').split('\n')
const out = []
let unmapped = 0
let rows = 0
for (let index = 0; index < lines.length; index += 1) {
	const line = lines[index]
	const next = lines[index + 1] ?? ''
	const header = line.startsWith('| ') && /^\|[\s-|]+\|$/.test(next.trim())
	if (header) {
		const cells = splitRow(line)
		const last = cells.length - 1
		if (cells[last] === 'Behavior') {
			out.push(joinRow([...cells.slice(0, last), 'Summary']))
			out.push(next)
			index += 1
			continue
		}
		if (cells[last] === 'Purpose') {
			out.push(joinRow([...cells.slice(0, last), 'Shape', 'Summary']))
			out.push(joinRow(['---', '---', '---', '---']))
			index += 1
			let cursor = index + 1
			while (cursor < lines.length && lines[cursor].startsWith('| ')) {
				const row = splitRow(lines[cursor])
				const name = row[0].replaceAll('`', '')
				const shape = SHAPES.get(name) ?? ''
				if (!SHAPES.has(name) && !/^(?:class|function)$/.test(row[1])) unmapped += 1
				out.push(joinRow([row[0], row[1], shape, row[2]]))
				rows += 1
				cursor += 1
			}
			index = cursor - 1
			continue
		}
	}
	out.push(line)
}
writeFileSync(path, out.join('\n'))
process.stdout.write(`rows rewritten: ${rows}, unmapped non-class rows: ${unmapped}\n`)
