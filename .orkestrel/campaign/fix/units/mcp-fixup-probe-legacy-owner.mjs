const LEGACY_OWNER_PATTERN =
	/\b(?:export\s+class\s+(?:MCPLegacy|MCPSession)\b|export\s+function\s+(?:createMCPLegacy|createMCPSession)\b|export\s+interface\s+(?:MCPLegacyOptions|MCPSession(?:MiddlewareOptions|Options|Interface|State|Entry|Event))\b|import(?:\s+type)?\s*\{[^}]*\b(?:MCPLegacy|MCPSession)\b[^}]*\}\s*from\s*['"][^'"]+['"]|export\s+\*\s+from\s*['"]\.\/(?:MCPLegacy|MCPSession)\.js['"])/u

const cases = [
	['export interface MCPSessionMiddlewareOptions {', true],
	['export interface MCPSessionOptions {', true],
	['export interface MCPSessionInterface {', true],
	['export interface MCPSessionState {', true],
	['export interface MCPSessionEvent {', true],
	['export interface MCPSessionEntry {', true],
	['export class MCPSession implements MCPSessionInterface {', true],
	['export function createMCPSession<TState extends MCPSessionState>(', true],
]

for (const [line, expected] of cases) {
	const actual = LEGACY_OWNER_PATTERN.test(line)
	console.log(actual === expected ? 'PASS' : 'FAIL', JSON.stringify(line), '->', actual)
}
