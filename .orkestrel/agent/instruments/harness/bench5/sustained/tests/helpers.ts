import type { SustainedFixture } from './types.js'
import { HARNESS } from '../../constants.js'
import { readFrozen } from '../../matrix/helpers.js'
import {
	isRefitAttempt,
	isRefitCorpus,
	isRefitGeneration,
	isRefitItem,
} from '../../refit/validators.js'
import { computeDigest, readRows } from '../../helpers.js'
import { readSustainedPreparation } from '../parsers.js'
import { readWorkload } from '../../build/helpers.js'
import { inspectOracle, readOracle, readRuntime } from '../../endurance/helpers.js'
import { spawn } from 'node:child_process'
import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { isRecord } from '@orkestrel/contract'
import { BUILD } from '../../constants.js'
import { readJSON } from '../../helpers.js'
import { hashFile } from '../../refit/helpers.js'
import { SUSTAINED_CONTROLS } from '../audit/constants.js'
import { isSustainedKeys } from '../audit/validators.js'
import { readClassification } from '../helpers.js'
import { isSustainedClassification } from '../validators.js'
import { isMatrixRequest } from '../../matrix/validators.js'

/** Proves successful filing admission against authentic and altered retained evidence.
 * @param directory - Parent for distinct retained negative controls
 * @param path - Authentic completed filing classification
 */
export function verifyClassificationFixture(directory: string, path: string): void {
	const reference = hashFile(path)
	const classification = readJSON(path)
	assert.ok(isSustainedClassification(classification))
	assert.deepEqual(
		readClassification(reference, classification.runtime, classification.frozen),
		classification,
	)
	const run = classification.files.find((file) => file.path.endsWith('run.json'))
	assert.ok(run)
	const metadata = readJSON(run.path)
	assert.ok(isRecord(metadata) && typeof metadata.tokens === 'number')
	const requestPath = join(dirname(run.path), 'requests.jsonl')
	const requests = readRows(requestPath)
	assert.ok(requests.every(isMatrixRequest))
	const first = requests[0]
	assert.ok(first && isRecord(first.request) && first.response !== undefined)
	mkdirSync(directory, { recursive: true })
	for (const fault of ['length', 'model', 'counts']) {
		const output = mkdtempSync(join(directory, fault + '-'))
		const response = first.response
			.split(/\r\n|\n/)
			.filter((line) => line.trim() !== '')
			.map((line) => {
				const value: unknown = JSON.parse(line)
				assert.ok(isRecord(value))
				return JSON.stringify(
					fault === 'length' && value.done === true ? { ...value, done_reason: 'length' } : value,
				)
			})
			.join('\n')
		const altered = {
			...first,
			request: fault === 'model' ? { ...first.request, model: 'foreign-model' } : first.request,
			response,
			reason: fault === 'length' ? 'length' : first.reason,
			failures: [],
		}
		const retained = join(output, 'requests.jsonl')
		writeFileSync(
			retained,
			[altered, ...requests.slice(1)].map((request) => JSON.stringify(request)).join('\n') + '\n',
		)
		const info = join(output, 'run.json')
		writeFileSync(
			info,
			JSON.stringify({ ...metadata, tokens: metadata.tokens + (fault === 'counts' ? 1 : 0) }),
		)
		const manifest = join(output, 'classification.json')
		writeFileSync(
			manifest,
			JSON.stringify({
				...classification,
				files: classification.files.map((file) =>
					file.path === run.path
						? hashFile(info)
						: file.path === requestPath
							? hashFile(retained)
							: file,
				),
			}),
		)
		assert.throws(
			() => readClassification(hashFile(manifest), classification.runtime, classification.frozen),
			/classification raw usage or completion is invalid/,
			fault,
		)
	}
}

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
	const code = await new Promise<number>((resolveCode, reject) => {
		child.once('error', reject)
		child.once('exit', (status) => resolveCode(status ?? 1))
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

/** Produces fresh protocol prerequisites shared by continuous-run and fault proofs.
 * @param directory - Owned create-only fixture root
 * @param url - Real sustained protocol peer
 * @param matrixUrl - Real matrix protocol peer
 * @returns Exact prerequisite paths and the retained classification identity
 */
export async function prepareRuntimeFixture(
	directory: string,
	url: string,
	matrixUrl: string,
): Promise<SustainedFixture> {
	const workload = resolve('tmp/units/aggregate-runtime-workload-audit-2')
	const runtime = join(workload, 'runtime/development.json')
	const frozenPath = join(directory, 'freeze/manifest.json')
	const resourcePath = join(directory, 'resource/manifest.json')
	const classificationPath = join(directory, 'filing/classification.json')
	for (const name of ['development', 'evaluation'])
		assert.deepEqual(
			inspectOracle(
				readRuntime(join(workload, 'runtime', `${name}.json`)),
				readOracle(join(workload, 'private', `${name}.json`)),
			),
			[],
		)
	writeFileSync(join(directory, 'seed.jsonl'), '')
	assert.equal(
		await runCommand('matrix', [
			'freeze',
			'--key',
			'q4',
			'--think',
			'false',
			'--seed',
			join(directory, 'seed.jsonl'),
			'--settings',
			join(HARNESS, 'bench5/settings.json'),
			'--out',
			join(directory, 'freeze'),
			'--live',
			'--url',
			matrixUrl,
		]),
		0,
	)
	assert.equal(
		await runCommand('matrix', [
			'resource',
			'--frozen',
			frozenPath,
			'--out',
			join(directory, 'resource'),
			'--live',
			'--url',
			matrixUrl,
		]),
		0,
	)
	assert.equal(
		await runCommand('sustained', [
			'filing',
			'--frozen',
			frozenPath,
			'--resource',
			resourcePath,
			'--runtime',
			runtime,
			'--out',
			join(directory, 'filing'),
			'--live',
			'--url',
			url,
		]),
		0,
	)
	const classified = hashFile(join(directory, 'filing/cache/judge.jsonl'))
	assert.equal(readSustainedPreparation(classificationPath)[0]?.phase, 'filing')
	assert.equal(
		readWorkload(hashFile(runtime)).manifest.hash,
		hashFile(join(workload, 'manifest.json')).hash,
	)
	const common = [
		'--frozen',
		frozenPath,
		'--runtime',
		runtime,
		'--classification',
		classificationPath,
		'--model',
		'qwen3.5:4b-q4_K_M',
	]
	const corpusPath = join(directory, 'corpus')
	assert.equal(
		await runCommand('refit', [
			'freeze',
			...common,
			'--cache',
			join(directory, 'filing/cache'),
			'--out',
			corpusPath,
		]),
		0,
	)
	const generated = join(directory, 'generated')
	assert.equal(
		await runCommand('refit', [
			'generate',
			...common,
			'--corpus',
			corpusPath,
			'--cache',
			join(directory, 'generation-cache'),
			'--out',
			generated,
			'--live',
			'--url',
			url,
		]),
		0,
	)
	assert.equal(hashFile(classified.path).hash, classified.hash)
	const corpus = readJSON(join(corpusPath, 'corpus.json'))
	const generation = readJSON(join(generated, 'manifest.json'))
	const attempts = readRows(join(generated, 'attempts.jsonl'))
	const packet = readRows(join(generated, 'packet.jsonl'))
	assert.ok(
		isRefitCorpus(corpus) &&
			isRefitGeneration(generation) &&
			attempts.every(isRefitAttempt) &&
			packet.every(isRefitItem),
	)
	const labels = join(directory, 'fixture-refit-labels.json')
	writeFileSync(
		labels,
		JSON.stringify({
			authority: 'root-adjudicated',
			corpus: generation.corpus,
			attempts: generation.attempts,
			packet: generation.packet,
			manifest: hashFile(join(generated, 'manifest.json')).hash,
			labels: packet.map((item) => ({
				id: item.id,
				item: computeDigest(item),
				verdict: 'supported',
				propositions: [
					{
						text: attempts.find((attempt) => attempt.id === item.id)?.prose ?? '',
						verdict: 'supported',
						evidence: [item.sources[0]?.text ?? ''],
					},
				],
			})),
		}),
	)
	assert.equal(
		await runCommand('refit', [
			'fit',
			...common,
			'--corpus',
			corpusPath,
			'--attempts',
			generated,
			'--labels',
			labels,
			'--out',
			join(directory, 'fitted'),
		]),
		0,
	)
	const fit = join(directory, 'fitted/fit.json')
	const frozen = readFrozen(hashFile(frozenPath))
	const matrixFit = join(directory, 'matrix-fixture-fit.json')
	writeFileSync(
		matrixFit,
		JSON.stringify({
			agree: 0.8,
			change: 0.56,
			separated: true,
			matrix: {
				summarizer: frozen.summarizer,
				judge: frozen.judge,
				files: frozen.files,
				settings: frozen.settings.hash,
				seed: frozen.seed.hash,
			},
		}),
	)
	assert.equal(
		await runCommand('matrix', [
			'pilot',
			'--frozen',
			frozenPath,
			'--resource',
			resourcePath,
			'--fit',
			matrixFit,
			'--out',
			join(directory, 'pilot'),
			'--live',
			'--url',
			matrixUrl,
		]),
		0,
	)
	return {
		workload,
		runtime,
		frozen: frozenPath,
		resource: resourcePath,
		classification: classificationPath,
		classified,
		fit,
	}
}
