import { strict as assert } from 'node:assert'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { isRecord } from '@orkestrel/contract'

const root = 'C:/Users/mikes/WebstormProjects/scaffold'
const staged = spawnSync('git', ['diff', '--cached', '--name-only', '-z'], { cwd: root, encoding: 'utf8' })
assert.equal(staged.status, 0)
const paths = staged.stdout.split('\0').filter(path => path !== '')
const exact = ['RESULTS.md', '.orkestrel/agent/plan.md', '.orkestrel/agent/progress.md', '.orkestrel/agent/ledger.md']
assert(paths.length > 0)
assert(paths.every(path => path.startsWith('.orkestrel/agent/instruments/results/l14/') || exact.includes(path)))
const listed = spawnSync('git', ['ls-files', '--stage', '-z', '--', '.orkestrel/agent/instruments/results/l14'], { cwd: root, encoding: 'utf8' })
assert.equal(listed.status, 0)
let count = 0
for (const row of listed.stdout.split('\0').filter(value => value !== '')) {
	const split = row.indexOf('\t')
	assert(split > 0)
	const [mode, expected, stage] = row.slice(0, split).split(' ')
	assert.equal(mode, '100644')
	assert.equal(stage, '0')
	const path = row.slice(split + 1)
	assert(statSync(path).size < 100 * 1024 * 1024)
	const bytes = readFileSync(path)
	const actual = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex')
	assert.equal(actual, expected, `Index transformed bytes: ${path}`)
	count += 1
}
const custody = '.orkestrel/agent/instruments/results/l14/custody'
let restored = 0
for (const name of readdirSync(custody).filter(name => name.startsWith('restoration') && name.endsWith('.json'))) {
	const value: unknown = JSON.parse(readFileSync(`${custody}/${name}`, 'utf8'))
	assert(isRecord(value) && Array.isArray(value.entries))
	for (const entry of value.entries) {
		assert(isRecord(entry) && typeof entry.original === 'string' && typeof entry.retained === 'string' && typeof entry.hash === 'string')
		for (const path of [entry.original, entry.retained])
			assert.equal(createHash('sha256').update(readFileSync(path)).digest('hex'), entry.hash)
		restored += 1
	}
}
writeFileSync('tmp/units/aggregate-final-g2-pilot-checkpoint-message.txt', 'docs: retain Gemma aggregate pilot execution evidence\n\nPreserve the fixed pilot outcome, raw requests, costs, exposure and terminal custody with exact dependency restoration. Record the corrected prelaunch path error separately from actual measurement. Source, build, calibration and qualification rules stay frozen. Blind task-quality analysis and the continuous comparison remain separate work.\n\nAgent: Codex\n', { flag: 'wx' })
console.log(JSON.stringify({ staged: paths.length, rawArtifacts: count, restorationEntries: restored, unchanged: true }))
