// Applies each mutation in mutations.json to one owned source file, runs the named test files one at
// a time, records the failing titles and their first assertion line, and restores the file after
// every run. Run from the worktree root: node tmp/j-release-core/mutate.mjs [id...]
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const mutations = JSON.parse(readFileSync('tmp/j-release-core/mutations.json', 'utf8'))
const wanted = process.argv.slice(2)
const log = 'tmp/j-release-core/mutations.log.txt'
writeFileSync(log, '')

for (const mutation of mutations) {
	if (wanted.length > 0 && !wanted.includes(mutation.id)) continue
	const original = readFileSync(mutation.file, 'utf8')
	const count = original.split(mutation.find).length - 1
	if (count !== 1) {
		appendFileSync(log, `## ${mutation.id}: find matched ${count} times; skipped\n\n`)
		continue
	}
	writeFileSync(mutation.file, original.replace(mutation.find, mutation.replace))
	try {
		appendFileSync(log, `## ${mutation.id} — ${mutation.line}\n`)
		for (const test of mutation.tests) {
			const run = spawnSync(
				'npx',
				['vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--project', 'src:browser', test],
				{ encoding: 'utf8', shell: true },
			)
			const output = `${run.stdout}\n${run.stderr}`.replace(/\u001b\[[0-9;]*m/g, '')
			const lines = output.split('\n')
			const failures = lines.filter((line) => /^\s+×/.test(line)).map((line) => line.trim())
			const assertions = []
			lines.forEach((line, index) => {
				if (/^\s*FAIL /.test(line)) {
					const next = lines.slice(index + 1).find((candidate) => candidate.trim() !== '')
					assertions.push(`${line.trim()}\n    ${next?.trim()}`)
				}
			})
			const tally = lines.find((line) => /^\s+Tests /.test(line))?.trim()
			appendFileSync(
				log,
				`- ${test}: exit ${run.status}; ${tally}\n${failures.map((line) => `  ${line}`).join('\n')}\n${assertions.map((line) => `  ${line}`).join('\n')}\n`,
			)
		}
		appendFileSync(log, '\n')
	} finally {
		writeFileSync(mutation.file, original)
	}
}
