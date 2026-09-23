// J-SEED claim 5: the five runs the subjective lane named. Each run writes a temporary edit to
// `src/browser/ColorMode.ts` in the seed worktree, runs the file's proof, records the summary and
// the failing lines, and restores the unit's exact content. The inherited source comes from
// `git show HEAD:src/browser/ColorMode.ts`.
const fs = require('node:fs')
const { execSync, spawnSync } = require('node:child_process')
const root = 'C:/Users/mikes/WebstormProjects/veneer-seed'
const file = `${root}/src/browser/ColorMode.ts`
const unit = fs.readFileSync(file, 'utf8')
const inherited = execSync('git show HEAD:src/browser/ColorMode.ts', { cwd: root, encoding: 'utf8' })
const applyGuard = '\tapply(mode: ColorModeState): void {\n\t\tif (this.#original === undefined) return\n'
const toggleGuard = '\t\tif (this.#original === undefined) return this.mode\n'
const destroyGuard = '\t\tif (original === undefined) return\n'
if (!unit.includes(applyGuard) || !unit.includes(toggleGuard) || !unit.includes(destroyGuard)) {
	console.error('unit content does not carry the expected guards')
	process.exit(2)
}
const mutations = [
	['M0 inherited source (hunks reversed)', inherited],
	['A apply guard removed', unit.replace(applyGuard, '\tapply(mode: ColorModeState): void {\n')],
	['B toggle guard removed', unit.replace(toggleGuard, '')],
	[
		'C storage written before the apply guard',
		unit.replace(
			applyGuard + '\t\tthis.#root.setAttribute(COLOR_MODE_ATTRIBUTE, mode)\n\t\tthis.#storage?.setItem(COLOR_MODE_KEY, mode)\n',
			'\tapply(mode: ColorModeState): void {\n\t\tthis.#storage?.setItem(COLOR_MODE_KEY, mode)\n\t\tif (this.#original === undefined) return\n\t\tthis.#root.setAttribute(COLOR_MODE_ATTRIBUTE, mode)\n',
		),
	],
	['D second-call guard in destroy removed', unit.replace(destroyGuard, '')],
]
const results = []
try {
	for (const [name, content] of mutations) {
		if (content === unit) {
			results.push({ name, error: 'mutation produced no change' })
			continue
		}
		fs.writeFileSync(file, content)
		const run = spawnSync('npm.cmd', ['run', 'test:src:browser', '--', 'tests/src/browser/ColorMode.test.ts'], {
			cwd: root,
			encoding: 'utf8',
			shell: true,
		})
		const output = `${run.stdout}\n${run.stderr}`
		const summary = (output.match(/Tests\s+[^\n]+/) ?? ['no summary'])[0].trim()
		const lines = [...new Set([...output.matchAll(/ColorMode\.test\.ts:(\d+):\d+/g)].map((match) => Number(match[1])))].sort((a, b) => a - b)
		results.push({ name, exit: run.status, summary, failingLines: lines })
	}
} finally {
	fs.writeFileSync(file, unit)
}
const restored = fs.readFileSync(file, 'utf8') === unit
console.log(JSON.stringify({ restored, results }, null, 1))
