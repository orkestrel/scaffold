// Prospective driver only. Journal: tmp/units/aggregate-final-calibration-root.jsonl; cap: 10800 seconds (the fixed nested caps total 10080 seconds, plus launcher slack).
// Runs the supplied freeze and generation commands exactly once. Labels and fitting remain a separate root-adjudicated stage.
import { strict as assert } from 'node:assert'
import { spawnSync } from 'node:child_process'
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { isRecord } from '@orkestrel/contract'

const path = 'tmp/units/aggregate-final-calibration-command-plan-2.json'
const bytes = readFileSync(path)
const plan: unknown = JSON.parse(bytes.toString('utf8'))
assert(isRecord(plan))
assert(Array.isArray(plan.commands))
assert.equal(plan.commands.length, 20)
const commands = plan.commands.slice(0, 16)
for (const [index, command] of commands.entries()) {
	assert(isRecord(command))
	assert.equal(command.sequence, index + 1)
	assert.equal(typeof command.id, 'string')
	assert(Array.isArray(command.argv))
	assert(command.argv.every((value: unknown) => typeof value === 'string'))
	assert.equal(command.argv[0], 'node')
	assert(command.argv.includes('--status'))
	assert(command.argv.includes('--'))
}
const record = 'tmp/units/aggregate-final-calibration-sequence.jsonl'
writeFileSync(record, `${JSON.stringify({ event: 'start', plan: path, sha256: createHash('sha256').update(bytes).digest('hex'), started: new Date().toISOString(), commands: commands.length })}\n`, { flag: 'wx' })
for (const command of commands) {
	assert(isRecord(command))
	assert(Array.isArray(command.argv))
	assert(command.argv.every((value: unknown) => typeof value === 'string'))
	const started = Date.now()
	appendFileSync(record, `${JSON.stringify({ event: 'command', id: command.id, started, argv: command.argv })}\n`)
	process.stdout.write(`START ${String(command.id)}\n`)
	const result = spawnSync(process.execPath, command.argv.slice(1), { stdio: 'inherit', shell: false })
	const outcome = { event: 'result', id: command.id, pid: result.pid, exit: result.status, signal: result.signal, duration: Date.now() - started }
	appendFileSync(record, `${JSON.stringify(outcome)}\n`)
	process.stdout.write(`${JSON.stringify(outcome)}\n`)
	if (result.error !== undefined) throw result.error
	if (result.status !== 0) process.exit(result.status ?? 1)
}
appendFileSync(record, `${JSON.stringify({ event: 'complete', finished: new Date().toISOString(), next: 'independent labels, root adjudication, then the fixed fit commands' })}\n`)
