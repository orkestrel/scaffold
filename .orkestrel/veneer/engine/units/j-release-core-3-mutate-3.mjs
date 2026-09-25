// Round 3's successor to mutate-2.mjs. It changes only the table, log, and report paths: it reads
// mutations-3.json, which carries every round-2 row, a successor for each round-2 row whose find
// named the removed abort listener, and round 3's rows. The mechanism is mutate-2.mjs's: it applies
// each row, runs the row's test files one at a time through the Vitest JSON reporter, and logs
// every failing case with the error class its first failure message names. A row either edits
// owned files by exact find-and-replace, each find matching once, or replaces owned files with
// their bytes at a named commit. Every file is restored after the row. Run from the worktree root:
// node tmp/j-release-core/mutate-3.mjs [id...]
import { readFileSync, writeFileSync, appendFileSync, rmSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const mutations = JSON.parse(readFileSync('tmp/j-release-core/mutations-3.json', 'utf8'))
const wanted = process.argv.slice(2)
const log = 'tmp/j-release-core/mutations-3.log.txt'
const report = 'tmp/j-release-core/mutations-3.out.json'
writeFileSync(log, '')

for (const mutation of mutations) {
	if (wanted.length > 0 && !wanted.includes(mutation.id)) continue
	const files = [...new Set([...(mutation.edits ?? []).map((edit) => edit.file), ...(mutation.base?.files ?? [])])]
	const originals = new Map(files.map((file) => [file, readFileSync(file, 'utf8')]))
	const skipped = (mutation.edits ?? []).filter(
		(edit) => originals.get(edit.file).split(edit.find).length - 1 !== 1,
	)
	if (skipped.length > 0) {
		appendFileSync(log, `## ${mutation.id}: a find did not match exactly once; skipped\n\n`)
		continue
	}
	try {
		for (const file of mutation.base?.files ?? []) {
			const shown = spawnSync('git', ['show', `${mutation.base.commit}:${file}`], { encoding: 'utf8' })
			writeFileSync(file, shown.stdout)
		}
		for (const edit of mutation.edits ?? []) {
			writeFileSync(edit.file, readFileSync(edit.file, 'utf8').replace(edit.find, edit.replace))
		}
		appendFileSync(log, `## ${mutation.id} — ${mutation.line}\n`)
		for (const test of mutation.tests) {
			rmSync(report, { force: true })
			const run = spawnSync(
				'npx',
				[
					'vitest',
					'run',
					'--config',
					'vite.config.ts',
					'--no-cache',
					'--project',
					'src:browser',
					'--reporter=json',
					`--outputFile=${report}`,
					test,
				],
				{ encoding: 'utf8', shell: true },
			)
			let parsed
			try {
				parsed = JSON.parse(readFileSync(report, 'utf8'))
			} catch {
				appendFileSync(log, `- ${test}: exit ${run.status}; no JSON report (collection error)\n${`${run.stdout}\n${run.stderr}`.slice(-2000)}\n`)
				continue
			}
			const cases = parsed.testResults.flatMap((result) => result.assertionResults)
			const failed = cases.filter((result) => result.status === 'failed')
			const classes = new Map()
			const lines = failed.map((result) => {
				const message = (result.failureMessages[0] ?? '').replace(/\u001b\[[0-9;]*m/g, '')
				const first = message.split('\n')[0]
				const match = /^([A-Za-z]*Error)\b/.exec(first)
				const name = match === null ? 'Unclassified' : match[1]
				classes.set(name, (classes.get(name) ?? 0) + 1)
				return `  × ${result.title}\n    ${name}: ${first.slice(0, 300)}`
			})
			const tally = [...classes].map(([name, count]) => `${name}=${count}`).join(' ')
			appendFileSync(
				log,
				`- ${test}: exit ${run.status}; failed=${failed.length} of ${cases.length}; files failed=${parsed.numFailedTestSuites}; ${tally}\n${lines.join('\n')}\n`,
			)
		}
		appendFileSync(log, '\n')
	} finally {
		for (const [file, text] of originals) writeFileSync(file, text)
	}
}
