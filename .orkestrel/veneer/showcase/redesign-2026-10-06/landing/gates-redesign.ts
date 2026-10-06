import { spawnSync } from 'node:child_process'
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
// Usage: node gates-redesign.ts [suffix] — the S-R1 landing gates on /home/user/veneer at its HEAD, each through the host queue in a fresh folder.
const V = '/home/user/veneer'
const sha = spawnSync('git', ['-C', V, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).stdout.trim() + (process.argv[2] ?? '')
const RUNS = `${V}/tmp/units/journey-cost/runs`
mkdirSync(`${V}/tmp/units/fleet-pins`, { recursive: true })
const LOG = `${V}/tmp/units/fleet-pins/landing-${sha}-gates.txt`
const PATH = `/home/user/.wave/npm11/node_modules/.bin:${process.env.PATH ?? ''}`
const queued = (name: string, kind: string, command: string[]) => [
	'flock', '-w', '7200', '/home/user/.wave/journey.lock', 'node', `${V}/tmp/units/journey-cost/run.ts`,
	'--folder', `${RUNS}/landing-${sha}-${name}`, '--kind', kind, '--cwd', V, '--', 'env', `PATH=${PATH}`, ...command,
]
const VITEST = [`${V}/node_modules/.bin/vitest`, 'run', '--config', `${V}/vite.config.ts`, '--no-cache', '--reporter=dot']
const gates = [
	{ name: 'format', argv: queued('format', 'command', ['npm', 'run', 'format:check']) },
	{ name: 'lint', argv: queued('lint', 'command', ['npm', 'run', 'lint:check']) },
	{ name: 'check', argv: queued('check', 'command', ['npm', 'run', 'check']) },
	{ name: 'test-app', argv: queued('test-app', 'command', [...VITEST, '--project', 'app:core', '--project', 'app:browser']) },
	{ name: 'test-setup-browser', argv: queued('test-setup-browser', 'command', [...VITEST, '--project', 'setup:browser']) },
	{ name: 'test-policy-config-setup', argv: queued('test-policy-config-setup', 'command', [...VITEST, '--project', 'policy', '--project', 'config', '--project', 'setup']) },
	{ name: 'test-integration', argv: queued('test-integration', 'command', [...VITEST, '--project', 'integration']) },
	{ name: 'test-guides', argv: queued('test-guides', 'command', ['node', '--experimental-strip-types', `${V}/tests/guides.test.ts`]) },
	{ name: 'journey', argv: queued('journey', 'journey', ['CAPTURE=0', `${V}/node_modules/.bin/vitest`, 'run', '--config', `${V}/configs/app/vite.journey.config.ts`, '--no-cache', '--reporter=dot', '--reporter=json', `--outputFile=${RUNS}/landing-${sha}-journey/report.json`]) },
	{ name: 'build', argv: queued('build', 'command', ['npm', 'run', 'build']) },
]
writeFileSync(LOG, `# Landing gates on /home/user/veneer at ${sha} (${new Date().toISOString()})\n`)
const summary: Record<string, unknown>[] = []
for (const gate of gates) {
	const started = Date.now()
	const result = spawnSync(gate.argv[0], gate.argv.slice(1), { cwd: V, env: { ...process.env, PATH }, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
	const seconds = ((Date.now() - started) / 1000).toFixed(1)
	const folder = `${RUNS}/landing-${sha}-${gate.name}`
	let output = `${result.stdout ?? ''}${result.stderr ?? ''}`
	for (const f of ['stdout.log', 'stderr.log']) if (existsSync(`${folder}/${f}`)) output += readFileSync(`${folder}/${f}`, 'utf8')
	const tests = output.match(/^\s*Tests\s+.*$/m)?.[0].trim()
	const line = `${gate.name}: exit ${result.status} in ${seconds} s (folder landing-${sha}-${gate.name})${tests ? ` — ${tests}` : ''}`
	appendFileSync(LOG, `\n## ${line}\n${result.status === 0 ? '' : output.trim().split('\n').slice(-14).join('\n') + '\n'}`)
	console.log(line)
	summary.push({ gate: gate.name, exit: result.status, seconds: Number(seconds), tests })
}
writeFileSync(`${V}/tmp/units/fleet-pins/landing-${sha}-gates.json`, JSON.stringify(summary, null, 2) + '\n')
console.log(summary.every((s) => s.exit === 0) ? 'ALL LANDING GATES EXIT 0' : 'SOME LANDING GATE FAILED')
