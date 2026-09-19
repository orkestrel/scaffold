import { readFileSync } from 'node:fs'
const before = JSON.parse(readFileSync('tmp/units/m1-oxlintrc-capture.json', 'utf8'))
const after = JSON.parse(readFileSync('.oxlintrc.json', 'utf8'))
function describe(config, label) {
	console.log('===', label, '===')
	const top = Object.keys(config.rules ?? {}).filter((r) => r.startsWith('policy/'))
	console.log('top-level policy rules:', top.join(' ') || '(none)')
	for (const [i, o] of (config.overrides ?? []).entries()) {
		const rules = Object.keys(o.rules ?? {}).filter((r) => r.startsWith('policy/'))
		if (rules.length === 0) continue
		console.log(`override[${i}] files=${JSON.stringify(o.files)}`)
		console.log('   policy rules:', rules.join(' '))
	}
}
describe(before, 'before (0.0.63-era)')
describe(after, 'after (0.0.72)')
