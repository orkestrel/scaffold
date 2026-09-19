import { readFileSync } from 'node:fs'
const raw = readFileSync(process.argv[2], 'utf8')
const start = raw.indexOf('{"findings"')
const data = JSON.parse(raw.slice(start))
for (const f of data.findings) {
	if (process.argv[3] && f.group !== process.argv[3]) continue
	console.log([f.path, f.group, f.ownership, f.drift].join(' | '))
}
console.log('--- keys:', Object.keys(data).join(','))
