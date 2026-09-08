import assert from 'node:assert/strict'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { Capture } from './Capture.mjs'
import { digestBytes } from './helpers.mjs'
import { run } from './functions.mjs'

async function createTemporary() {
	return mkdtemp(join(tmpdir(), 'layer-capture-'))
}

test('copies file bytes and records their digest', async () => {
	const directory = await createTemporary()
	try {
		const source = join(directory, 'source.bin')
		const saved = join(directory, 'saved.bin')
		const bytes = Buffer.from([0, 255, 16, 128])
		await writeFile(source, bytes)
		const capture = new Capture({ git: process.execPath, npm: process.execPath, output: join(directory, 'output') })
		await capture.begin({ population: [] })
		const row = await capture.file('fixture', source, saved)
		assert.deepEqual(await readFile(saved), bytes)
		assert.equal(row.digest, digestBytes(bytes))
		assert.equal(row.type, 'record')
		assert.equal(row.source, source)
		assert.deepEqual(
			JSON.parse(await readFile(join(directory, 'output', 'rows.jsonl'), 'utf8').then((rows) => rows.trim())),
			row
		)
	} finally { await rm(directory, { force: true, recursive: true }) }
})

test('retains a missing file failure without contents', async () => {
	const directory = await createTemporary()
	try {
		const capture = new Capture({ git: process.execPath, npm: process.execPath, output: join(directory, 'output') })
		await capture.begin({ population: [] })
		const row = await capture.file('fixture', join(directory, 'absent.json'), join(directory, 'saved.json'))
		assert.equal('error' in row, true)
		assert.equal('digest' in row, false)
	} finally { await rm(directory, { force: true, recursive: true }) }
})

test('refuses an occupied output without changing its sentinel', async () => {
	const directory = await createTemporary()
	try {
		const root = join(directory, 'host')
		const output = join(root, 'scaffold', 'tmp', 'pass', 'occupied')
		await mkdir(join(root, 'scaffold', 'tmp', 'pass'), { recursive: true })
		await writeFile(output, 'sentinel')
		await assert.rejects(run(root, output, process.execPath, process.execPath), /occupied/)
		assert.equal(await readFile(output, 'utf8'), 'sentinel')
	} finally { await rm(directory, { force: true, recursive: true }) }
})

test('retains unicode malformed output and a nonzero settlement', async () => {
	const directory = await createTemporary()
	try {
		const output = join(directory, 'output')
		const capture = new Capture({ git: process.execPath, npm: process.execPath, output })
		await capture.begin({ population: [] })
		const stdout = '{ malformed: ☃ }'
		const stderr = 'érror'
		const child = fileURLToPath(new URL('./child.mjs', import.meta.url))
		const row = await capture.command('fixture', 'child', process.execPath, [child, stdout, stderr, '7'], directory)
		assert.equal(row.code, 7)
		assert.equal(row.failed, true)
		assert.equal(await readFile(row.stdout.path, 'utf8'), stdout)
		assert.equal(await readFile(row.stderr.path, 'utf8'), stderr)
		assert.equal(typeof row.expired, 'boolean')
		assert.equal(typeof row.aborted, 'boolean')
		assert.equal(typeof row.truncated, 'boolean')
		assert.equal(row.type, 'record')
		assert.equal(row.label, 'child')
		assert.equal(row.source, undefined)
		assert.deepEqual(
			JSON.parse(await readFile(join(output, 'rows.jsonl'), 'utf8').then((rows) => rows.trim())),
			row
		)
		const metadata = JSON.parse(await readFile(join(output, 'run.json'), 'utf8'))
		assert.equal(metadata.origin, 'cached')
		assert.equal(metadata.encoding, 'utf8')
		assert.match(metadata.note, /decoded strings/)
	} finally { await rm(directory, { force: true, recursive: true }) }
})
