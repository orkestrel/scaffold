// Runs each plant: writes it, rebuilds the styles when a partial changed, runs the owned proofs,
// logs the run to tmp/units/mcol-plant-<name>.log.txt, restores the file from its backup, and
// records both digests so the restore is shown byte-identical.
import { createHash } from 'node:crypto'
import { copyFileSync, readFileSync, writeFileSync, appendFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const plants = [
	{
		name: 'collapse-literal',
		file: 'src/styles/components/_collapse.scss',
		from: '@include transition(height var(--vn-motion-panel) var(--vn-ease-panel));',
		to: '@include transition(height 0.35s ease);',
	},
	{
		name: 'chevron-literal',
		file: 'src/styles/components/_accordion.scss',
		from: '--bs-accordion-btn-icon-transition: transform var(--vn-motion-feedback) var(--vn-ease-standard);',
		to: '--bs-accordion-btn-icon-transition: transform 0.2s ease-in-out;',
	},
	{
		name: 'collapse-opacity',
		file: 'src/styles/components/_collapse.scss',
		from: '@include transition(height var(--vn-motion-panel) var(--vn-ease-panel));',
		to: '@include transition((height var(--vn-motion-panel) var(--vn-ease-panel), opacity var(--vn-motion-panel) var(--vn-ease-panel)));',
	},
	{
		name: 'fade-order',
		file: 'tests/src/styles/components/fade.test.ts',
		// The planted sheet follows the three elements, so the readings keep their order, and it
		// writes the fade rule again later in the components layer than the collapsing rule.
		from: `<div class="fade">Tide table</div>',`,
		to: `<div class="fade">Tide table</div><style>@layer components { .fade { transition: opacity var(--vn-motion-feedback) var(--vn-ease-out) } }</style>',`,
	},
]
const proofs = [
	'tests/src/styles/components/collapse.test.ts',
	'tests/src/styles/components/accordion.test.ts',
	'tests/src/styles/components/fade.test.ts',
]
const digest = (path) => createHash('sha256').update(readFileSync(path)).digest('hex')
const only = process.argv[2]
for (const plant of plants.filter(({ name }) => only === undefined || name === only)) {
	const log = `tmp/units/mcol-plant-${plant.name}.log.txt`
	const backup = `tmp/units/mcol-plant-${plant.name}.backup`
	const before = digest(plant.file)
	copyFileSync(plant.file, backup)
	const text = readFileSync(plant.file, 'utf8')
	if (text.split(plant.from).length !== 2) throw new Error(`${plant.name}: no single match`)
	writeFileSync(plant.file, text.replace(plant.from, plant.to))
	writeFileSync(log, `# plant ${plant.name} in ${plant.file}\n# - ${plant.from}\n# + ${plant.to}\n# sha256 before ${before}\n`)
	const styles = plant.file.endsWith('.scss')
	if (styles) {
		const build = spawnSync('npm', ['run', 'build:src:styles'], { encoding: 'utf8' })
		appendFileSync(log, `$ npm run build:src:styles\nexit=${build.status}\n`)
		if (build.status !== 0) {
			copyFileSync(backup, plant.file)
			throw new Error(`${plant.name}: the planted build failed; the file is restored`)
		}
	}
	const args = ['vitest', 'run', '--config', 'configs/src/vite.styles.config.ts', ...proofs]
	appendFileSync(log, `$ npx ${args.join(' ')}\n`)
	const run = spawnSync('npx', args, { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } })
	appendFileSync(log, `${run.stdout}${run.stderr}exit=${run.status}\n${readFileSync('/proc/loadavg', 'utf8')}`)
	copyFileSync(backup, plant.file)
	const after = digest(plant.file)
	appendFileSync(log, `# restored; sha256 after ${after}; identical=${before === after}\n`)
	if (styles) {
		const build = spawnSync('npm', ['run', 'build:src:styles'], { encoding: 'utf8' })
		appendFileSync(log, `$ npm run build:src:styles (restored)\nexit=${build.status}\n`)
	}
	console.log(plant.name, `exit=${run.status}`, `identical=${before === after}`)
}
