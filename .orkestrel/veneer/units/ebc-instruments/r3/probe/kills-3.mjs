// Reads a Vitest JSON report and prints each failing case with the first line of its first failure
// message, marked KILL when that line names an assertion failure and NOT-ASSERTION otherwise.
// Usage: node tmp/units/ebc-probe/kills-3.mjs <report.json> [...]
import { readFileSync } from 'node:fs'

for (const path of process.argv.slice(2)) {
	const report = JSON.parse(readFileSync(path, 'utf8'))
	for (const file of report.testResults) {
		const relative = file.name.replace('/home/user/veneer-ebc/', '')
		for (const result of file.assertionResults) {
			if (result.status !== 'failed') continue
			const first = (result.failureMessages[0] ?? '').split('\n')[0]
			const verdict = /^AssertionError\b/.test(first) ? 'KILL' : 'NOT-ASSERTION'
			console.log(`${verdict} | ${relative} > ${result.fullName} | ${first}`)
		}
	}
}
