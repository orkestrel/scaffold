import { readFileSync, writeFileSync, copyFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'

const target = process.argv[2] === 'boundary'
	? 'configs/src/vite.styles.config.ts'
	: 'tests/setupStyles.ts'
const backup = `tmp/u-styles/${process.argv[2]}.before`
if (process.argv[3] === 'plant') {
	copyFileSync(target, backup)
	const original = readFileSync(target, 'utf8')
	const planted = process.argv[2] === 'boundary'
		? original.replace("outDir: 'dist/src/styles'", "outDir: 'dist/src/stylez'")
		: original.replace("import { collectTokenNodes, normalizeSelectorText } from './setup.js'", "import { collectTokenNodes, normalizeSelectorText } from './setup.js'\nimport '../dist/src/styles/index.css'")
	if (original === planted) throw new Error('Control did not change its target')
	writeFileSync(target, planted)
	console.log(`Planted ${process.argv[2]} in ${target}`)
} else {
	copyFileSync(backup, target)
	const before = readFileSync(backup)
	const restored = readFileSync(target)
	const equal = before.equals(restored)
	const digest = createHash('sha256').update(restored).digest('hex')
	console.log(`${target}: byte comparison = ${equal}; SHA-256 = ${digest}`)
	if (!equal) throw new Error('Restore differs from the pre-plant copy')
}
