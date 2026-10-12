import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { isDeepStrictEqual } from 'node:util'
import { isRecord } from '@orkestrel/contract'

class DriverValidation {
	#root = resolve(import.meta.dirname, '..', '..')

	execute(): void {
		const driver = join(this.#root, 'tmp', 'units', 'aggregate-final-cell-driver.ts')
		const suffix = process.argv[2] === '--revision-2' ? '-2' : ''
		if (process.argv[2] === '--negative') {
			writeFileSync(join(this.#root, 'tmp', 'units', 'aggregate-final-cell-driver-validation-negative.json'), `${JSON.stringify(this.#negative(), null, 2)}\n`, { flag: 'wx' })
			return
		}
		const cells = ['q4-think0', 'q4-think1', 'g2-think1', 'g4-think0', 'g4-think1', 'q2-think1']
		const measured = join(this.#root, '.orkestrel', 'agent', 'instruments', 'results', 'l14')
		const results = []
		for (const cell of cells) {
			const paths = ['resource', 'full', 'pilot'].flatMap((stage) => [join(measured, cell, stage), ...['jsonl', 'err', 'jsonl.pid', 'jsonl.status-before.txt', 'jsonl.status-after.txt'].map((suffix) => join(measured, 'logs', `${cell}-${stage}.${suffix}`))])
			paths.push(join(this.#root, 'tmp', 'units', `aggregate-final-cell-driver-${cell}-sequence.jsonl`))
			const before = paths.map((path) => ({ path, exists: existsSync(path), modified: existsSync(path) ? statSync(path).mtimeMs : undefined }))
			const started = Date.now()
			const result = spawnSync(process.execPath, [driver, cell], { cwd: this.#root, shell: false, encoding: 'utf8' })
			const after = paths.map((path) => ({ path, exists: existsSync(path), modified: existsSync(path) ? statSync(path).mtimeMs : undefined }))
			if (result.error !== undefined) throw result.error
			if (result.status !== 0 || !isDeepStrictEqual(before, after)) throw new Error(`dry validation failed for ${cell}: ${result.stderr}`)
			const plan: unknown = JSON.parse(result.stdout)
			if (!isRecord(plan) || plan.cell !== cell || plan.live !== false || !Array.isArray(plan.commands)) throw new Error(`dry plan differs for ${cell}`)
			const out = join(this.#root, 'tmp', 'units', `aggregate-final-cell-driver-plan-${cell}${suffix}.json`)
			writeFileSync(out, result.stdout, { flag: 'wx' })
			const receipt = { argv: [process.execPath, driver, cell], exit: result.status, signal: result.signal, wall: Date.now() - started, out, hash: createHash('sha256').update(result.stdout).digest('hex'), unchanged: isDeepStrictEqual(before, after) }
			results.push(receipt)
			process.stdout.write(`${JSON.stringify(receipt)}\n`)
		}
		const negative = this.#negative()
		writeFileSync(join(this.#root, 'tmp', 'units', `aggregate-final-cell-driver-validation${suffix}.json`), `${JSON.stringify({ driver: createHash('sha256').update(readFileSync(driver)).digest('hex'), results, negative, inference: 0 }, null, 2)}\n`, { flag: 'wx' })
	}

	#negative() {
		const driver = join(this.#root, 'tmp', 'units', 'aggregate-final-cell-driver.ts')
		const measured = join(this.#root, '.orkestrel', 'agent', 'instruments', 'results', 'l14')
		const before = readdirSync(join(this.#root, 'tmp', 'units')).filter((name) => name.startsWith('aggregate-final-cell-driver')).sort()
		const invalid = spawnSync(process.execPath, [driver, 'q9-think0'], { cwd: this.#root, shell: false, encoding: 'utf8' })
		const after = readdirSync(join(this.#root, 'tmp', 'units')).filter((name) => name.startsWith('aggregate-final-cell-driver')).sort()
		if (invalid.error !== undefined) throw invalid.error
		if (invalid.status !== 1 || invalid.stdout !== '' || !invalid.stderr.startsWith('Error: usage: aggregate-final-cell-driver.ts ') || !isDeepStrictEqual(before, after) || existsSync(join(measured, 'q9-think0')))
			throw new Error('invalid-cell control failed')
		const negative = { argv: [process.execPath, driver, 'q9-think0'], exit: invalid.status, signal: invalid.signal, stdout: invalid.stdout, stderr: invalid.stderr, unchanged: isDeepStrictEqual(before, after) }
		process.stdout.write(`${JSON.stringify(negative)}\n`)
		return negative
	}
}

new DriverValidation().execute()
