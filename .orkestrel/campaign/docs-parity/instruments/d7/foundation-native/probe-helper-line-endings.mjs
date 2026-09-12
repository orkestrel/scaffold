import assert from 'node:assert/strict'

const { extractClaimLiteral, extractProbeSection } = await import(
	new URL('../../../probe/tests/setupServer.ts', import.meta.url)
)
const claim = "const claim: Claim = {\n\tproject: 'core',\n}\n"
const section = '### Constants\n\nBody.\n## Next\n'
const lf = {
	claim: extractClaimLiteral(claim, 'const claim: Claim = {'),
	section: extractProbeSection(section, '### Constants'),
}
const crlf = {
	claim: extractClaimLiteral(claim.replaceAll('\n', '\r\n'), 'const claim: Claim = {'),
	section: extractProbeSection(section.replaceAll('\n', '\r\n'), '### Constants'),
}
console.log(JSON.stringify({ lf, crlf }, (_key, value) => value === undefined ? null : value, 2))
assert.deepEqual(crlf, lf)
