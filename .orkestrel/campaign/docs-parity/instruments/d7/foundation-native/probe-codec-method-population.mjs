import { readFile } from 'node:fs/promises'
import { globSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const modulePath = fileURLToPath(import.meta.url)
const scaffold = resolve(dirname(modulePath), '..', '..')
const codec = resolve(scaffold, '..', 'codec')
const guideRoot = resolve(codec, 'node_modules', '@orkestrel', 'guide', 'dist', 'src', 'core', 'index.js')
const testRoot = resolve(codec, 'node_modules', '@orkestrel', 'test', 'dist', 'src', 'server', 'index.js')
const guide = await import(pathToFileURL(guideRoot).href)
const test = await import(pathToFileURL(testRoot).href)
const patterns = ['src/**/*.ts', 'tests/**/*.ts', 'guides/*.md', '*.md', 'package.json']
const files = test.readInventory(codec, Array.from(globSync(patterns, { cwd: codec })))
const specification = files['guides/codec.md']

function fail(message) {
	throw new Error(message)
}

if (specification === undefined) fail('Codec guide inventory is absent.')
const options = {
	entries: [{ concept: 'Codec', source: 'src/core', spec: 'guides/codec.md', tests: 'tests' }],
	files,
	language: 'ts',
	languages: ['ts'],
	modules: { '@orkestrel/codec': 'src/core' },
}
const baseline = new guide.Parity(options)
const baselineRow = baseline.rows()[0]
if (baselineRow === undefined) fail('Codec baseline row is absent.')
const baselineMissing = guide.findMissing([], baselineRow.source.methods('AbsentInterface').map((entry) => entry.name))
if (baselineMissing.length !== 0) fail('Codec baseline unexpectedly declares the control method.')

const variant = `${specification}\n\n## Methods\n\n#### \`AbsentInterface\`\n\n| Method |\n| --- |\n| \`absentMethod\` |\n`
const parsed = guide.createGuide(variant)
const group = parsed.methods().find((candidate) => candidate.interface === 'AbsentInterface')
if (group === undefined || !group.methods.some((entry) => entry.name === 'absentMethod')) fail('Guide parser did not retain the control method group.')
const variantFiles = { ...files, 'guides/codec.md': variant }
const parity = new guide.Parity({ ...options, files: variantFiles })
const row = parity.rows()[0]
if (row === undefined) fail('Codec variant row is absent.')
const documented = group.methods.map((entry) => entry.name)
const missing = guide.findMissing(documented, row.source.methods('AbsentInterface').map((entry) => entry.name))
if (!missing.includes('absentMethod')) fail('Baseline missing-method comparison did not report the control method.')
const report = parity.inspect()
if (!report.methods.some((finding) => finding.text.includes('absentMethod'))) fail('Parity methods report did not retain the control method.')
const categories = Object.fromEntries(Object.entries(report).filter(([, value]) => Array.isArray(value)))
process.stdout.write(`${JSON.stringify({ baseline: baseline.inspect().methods, categories, group, missing, methods: report.methods }, undefined, '\t')}\n`)
