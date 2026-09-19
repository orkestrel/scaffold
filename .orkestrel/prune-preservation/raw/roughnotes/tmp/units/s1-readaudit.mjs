import { readFileSync } from 'node:fs'

const raw = readFileSync('tmp/units/s1-audit.json', 'utf8')
	.split('\n')
	.filter((line) => !line.startsWith('npm notice'))
	.join('\n')
const report = JSON.parse(raw)
console.log('--- findings: path | group | ownership | drift ---')
for (const finding of report.findings) {
	console.log([finding.path, finding.group, finding.ownership, finding.drift].join(' | '))
}
console.log('--- questions ---')
for (const question of report.questions) {
	console.log(JSON.stringify({ ...question, detail: undefined }))
}
