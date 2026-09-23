// J-SEED claim 6: order and rerun controls. Runs the file's proof shuffled under two seeds and once
// more unshuffled (the rerun), then the negative control: the `afterEach` storage clearing removed,
// shuffled under the first seed, which must fail if the instrument can see a leak. Restores the
// test file's exact content.
const fs = require('node:fs')
const { spawnSync } = require('node:child_process')
const root = 'C:/Users/mikes/WebstormProjects/veneer-seed'
const file = `${root}/tests/src/browser/ColorMode.test.ts`
const unit = fs.readFileSync(file, 'utf8')
const clearing = 'sessionStorage.clear()'
if (!unit.includes(clearing)) {
	console.error('test file carries no sessionStorage.clear() call')
	process.exit(2)
}
function run(name, extra) {
	const proc = spawnSync('npm.cmd', ['run', 'test:src:browser', '--', 'tests/src/browser/ColorMode.test.ts', ...extra], {
		cwd: root,
		encoding: 'utf8',
		shell: true,
	})
	const output = `${proc.stdout}\n${proc.stderr}`
	const summary = (output.match(/Tests\s+[^\n]+/) ?? ['no summary'])[0].trim()
	const lines = [...new Set([...output.matchAll(/ColorMode\.test\.ts:(\d+):\d+/g)].map((match) => Number(match[1])))].sort((a, b) => a - b)
	return { name, exit: proc.status, summary, failingLines: lines }
}
const results = []
try {
	results.push(run('shuffle seed 11', ['--sequence.shuffle', '--sequence.seed=11']))
	results.push(run('shuffle seed 97', ['--sequence.shuffle', '--sequence.seed=97']))
	results.push(run('rerun unshuffled', []))
	fs.writeFileSync(file, unit.replace(clearing, '/* clearing removed by the order control */'))
	results.push(run('negative control: clearing removed, shuffle seed 11', ['--sequence.shuffle', '--sequence.seed=11']))
	results.push(run('negative control: clearing removed, unshuffled', []))
} finally {
	fs.writeFileSync(file, unit)
}
console.log(JSON.stringify({ restored: fs.readFileSync(file, 'utf8') === unit, results }, null, 1))
