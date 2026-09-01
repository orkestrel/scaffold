// Probe: can an object shape reach the compiled plans with a declared key whose
// child shape is absent (properties[key] === undefined)? If it can, the auditor's
// `positions` (from entries) and `vocabulary` (from declaredKeys) disagree.
/* eslint-disable */
const lib = await import(process.argv[2])
const { compileAuditor, compileGuard, createContract, objectShape, stringShape } = lib
const attempts = [
	['raw literal with undefined child', () => compileAuditor({ type: 'object', properties: { a: undefined, b: { type: 'string' } } })],
	['objectShape builder with undefined child', () => objectShape({ a: undefined, b: stringShape() })],
	['raw literal, key present via prototype', () => compileAuditor({ type: 'object', properties: Object.create({ a: { type: 'string' } }) })],
]
for (const [name, run] of attempts) {
	try {
		const out = run()
		const kind = typeof out
		let extra = ''
		if (kind === 'function') { try { extra = ' audit({a:1,b:"x"})=' + JSON.stringify(out({ a: 1, b: 'x' })) } catch (e) { extra = ' audit threw ' + (e && e.message) } }
		console.log(`REACHED ${name}: ${kind}${extra}`)
	} catch (error) {
		console.log(`REFUSED ${name}: ${error && error.code ? error.code + ' ' : ''}${error && error.message}`)
	}
}
