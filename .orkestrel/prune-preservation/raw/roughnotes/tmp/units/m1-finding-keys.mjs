import { readFileSync, writeFileSync } from 'node:fs'
const raw = readFileSync('tmp/units/m1-audit-configs.json', 'utf8')
const data = JSON.parse(raw.slice(raw.indexOf('{"findings"')))
const f = data.findings.find((x) => x.path === 'vite.config.ts')
console.log(Object.keys(f).join(','))
for (const [k, v] of Object.entries(f)) {
	if (typeof v === 'string' && /^[0-9a-f]+$/.test(v) && v.length > 64) {
		writeFileSync('tmp/units/m1-planned-' + k + '.ts', Buffer.from(v, 'hex').toString('utf8'))
		console.log('wrote', k, v.length / 2, 'bytes')
	} else {
		console.log(k, '=', JSON.stringify(v).slice(0, 120))
	}
}
