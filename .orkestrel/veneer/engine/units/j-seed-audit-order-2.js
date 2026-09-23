// J-SEED claim 6, the analyst's exact ordering control: move the case whose title starts
// "restores a stored dark mode" directly before "toggles, persists, and writes the light
// attribute"; run with the afterEach clearing removed (the negative control, expected red at the
// first toggle assertion) and with it intact (expected green). Restores the file's exact content.
const fs = require('node:fs')
const { spawnSync } = require('node:child_process')
const root = 'C:/Users/mikes/WebstormProjects/veneer-seed'
const file = `${root}/tests/src/browser/ColorMode.test.ts`
const unit = fs.readFileSync(file, 'utf8')
const clearing = 'sessionStorage.clear()'
const blocks = unit.split(/(?=\n\tit\()/)
const restoresIndex = blocks.findIndex((block) => block.startsWith("\n\tit('restores a stored dark mode"))
const togglesIndex = blocks.findIndex((block) => block.startsWith("\n\tit('toggles, persists, and writes the light attribute'"))
if (restoresIndex < 0 || togglesIndex < 0) {
	console.error(`blocks not found: restores=${restoresIndex} toggles=${togglesIndex}; titles: ${blocks.map((block) => block.slice(0, 60).replace(/\n/g, ' ')).join(' | ')}`)
	process.exit(2)
}
const [restores] = blocks.splice(restoresIndex, 1)
const insertAt = blocks.findIndex((block) => block.startsWith("\n\tit('toggles, persists, and writes the light attribute'"))
blocks.splice(insertAt, 0, restores)
const reordered = blocks.join('')
function run(name) {
	const proc = spawnSync('npm.cmd', ['run', 'test:src:browser', '--', 'tests/src/browser/ColorMode.test.ts'], { cwd: root, encoding: 'utf8', shell: true })
	const output = `${proc.stdout}\n${proc.stderr}`
	const summary = (output.match(/Tests\s+[^\n]+/) ?? ['no summary'])[0].trim()
	const failing = [...output.matchAll(/×\s+ColorMode\s+>\s+([^\n]+?)\s+\d+ms/g)].map((match) => match[1])
	const lines = [...new Set([...output.matchAll(/ColorMode\.test\.ts:(\d+):\d+/g)].map((match) => Number(match[1])))].sort((a, b) => a - b)
	return { name, exit: proc.status, summary, failingCases: failing, failingLines: lines }
}
const results = []
try {
	fs.writeFileSync(file, reordered.replace(clearing, '/* clearing removed by the order control */'))
	results.push(run('negative control: reordered, clearing removed'))
	fs.writeFileSync(file, reordered)
	results.push(run('reordered, clearing intact'))
} finally {
	fs.writeFileSync(file, unit)
}
console.log(JSON.stringify({ restored: fs.readFileSync(file, 'utf8') === unit, movedTitle: restores.slice(0, 90).trim(), results }, null, 1))
