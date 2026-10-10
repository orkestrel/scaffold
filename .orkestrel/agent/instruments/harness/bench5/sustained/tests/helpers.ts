import { spawn } from 'node:child_process'
import assert from 'node:assert/strict'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { isRecord } from '@orkestrel/contract'
import { BUILD } from '../../constants.js'
import { readJSON } from '../../helpers.js'
import { hashFile } from '../../refit/helpers.js'
import { SUSTAINED_CONTROLS } from '../audit/constants.js'
import { isSustainedKeys } from '../audit/validators.js'

/** Runs the actual emitted command while the loopback fixture continues serving.
 * @param entry - Built bench5 entrypoint
 * @param args - Exact command arguments
 * @param refusal - Required error evidence for a negative control
 * @returns The actual child exit status
 */
export async function runCommand(
	entry: string,
	args: readonly string[],
	refusal?: RegExp,
): Promise<number> {
	const child = spawn(process.execPath, [join(BUILD, 'bench5', `${entry}.js`), ...args], {
		stdio: ['ignore', 'inherit', 'pipe'],
	})
	let errors = ''
	child.stderr.on('data', (chunk: Buffer) => {
		errors += chunk.toString('utf8')
	})
	child.stderr.pipe(process.stderr)
	const code = await new Promise<number>((resolve, reject) => {
		child.once('error', reject)
		child.once('exit', (status) => resolve(status ?? 1))
	})
	if (refusal !== undefined) assert.match(errors, refusal)
	return code
}

/** Writes deliberately inert synthetic-fixture labels; these have no model-quality meaning.
 * @param packetPath - The real emitted packet
 * @param keysPath - The fixture-only private joins
 * @param out - A new fixture adjudication file
 * @param miss - Whether to deliberately miss the prefrozen controls
 */
export function writeFixtureLabels(
	packetPath: string,
	keysPath: string,
	out: string,
	miss = false,
): void {
	const packet = readJSON(packetPath)
	const keys = readJSON(keysPath)
	if (!isRecord(packet) || !Array.isArray(packet.items) || !isSustainedKeys(keys))
		throw new Error('invalid fixture packet')
	const labels = packet.items.map((item: unknown) => {
		if (
			!isRecord(item) ||
			typeof item.id !== 'string' ||
			typeof item.product !== 'string' ||
			!isRecord(item.rubric) ||
			!Array.isArray(item.rubric.atoms) ||
			!Array.isArray(item.rubric.critical) ||
			!Array.isArray(item.rubric.obligations)
		)
			throw new Error('invalid fixture item')
		const control = keys.keys.find((key) => key.id === item.id)?.control
		const ambiguous = !miss && control?.verdict === 'ambiguous'
		const evidence = [`product|${item.product.slice(0, 80)}`]
		return {
			id: item.id,
			atoms: item.rubric.atoms.map((atom: unknown) => {
				if (!isRecord(atom) || typeof atom.id !== 'string') throw new Error('invalid atom')
				return { id: atom.id, verdict: ambiguous ? 'ambiguous' : 'fail', evidence }
			}),
			critical: item.rubric.critical.map((rule: unknown) => ({
				rule,
				violated:
					!miss &&
					control !== undefined &&
					control.verdict !== 'ambiguous' &&
					rule === SUSTAINED_CONTROLS[control.verdict],
				evidence,
			})),
			obligations: item.rubric.obligations.map((id: unknown) => ({
				id,
				disposition: 'missed',
				evidence,
			})),
			ambiguous: ambiguous ? evidence : [],
			leaks: [],
		}
	})
	writeFileSync(
		out,
		JSON.stringify({
			authority: 'root-adjudicated',
			packet: hashFile(packetPath).hash,
			keys: hashFile(keysPath).hash,
			labels,
		}),
		{ flag: 'wx' },
	)
}
