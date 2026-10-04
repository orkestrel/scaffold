import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { ROOT, OUT, writeJSON } from './lib.ts'
const path = resolve(ROOT, 'src/tailwindcss/_tokens.scss')
const original = readFileSync(path, 'utf8')
const status = spawnSync('git', ['status', '--porcelain'], { cwd: ROOT, encoding: 'utf8' })
if (status.stdout !== '') throw new Error(`STOP: tracked tree dirty before P9: ${status.stdout}`)
const rows = []
try {
	writeFileSync(path, original.replace('\n@source', "\n@use '../bootstrap/tokens' with ($layered: true);\n@source"))
	for (const command of ['lint:check', 'format:check', 'test:policy', 'build:src:tailwindcss']) {
		const start = performance.now()
		const result = spawnSync(process.execPath, ['/home/user/.wave/npm11/node_modules/npm/bin/npm-cli.js', 'run', command], { cwd: ROOT, env: { ...process.env, PATH: `/home/user/.wave/npm11/node_modules/.bin:${process.env.PATH ?? ''}`, NO_COLOR: '1' }, encoding: 'utf8', timeout: 600000, maxBuffer: 32 * 1024 * 1024 })
		const text = result.stdout + result.stderr
		writeFileSync(resolve(OUT, `p9-${command.replaceAll(':', '-')}.log`), text)
		const lines = text.split(/\r\n|\n/)
		const index = lines.findIndex((line) => /error|Error|FAIL|✖|\[warn\]|failed|Format issues/i.test(line))
		rows.push({ command: `npm run ${command}`, expected: 'reaction observed; failure permitted', exit: result.status, signal: result.signal, error: result.error?.message, firstErrorLines: index < 0 ? [] : lines.slice(index, index + 12).filter((line) => !/Duration|[0-9]ms|[0-9]\.[0-9]+s|Start at/.test(line)) })
		writeFileSync(resolve(OUT, `p9-${command.replaceAll(':', '-')}.duration.txt`), String(performance.now() - start))
		console.log(`${command}: ${result.status}`)
	}
} finally {
	const result = spawnSync('git', ['checkout', '--', 'src/tailwindcss/_tokens.scss'], { cwd: ROOT, encoding: 'utf8' })
	if (result.status !== 0) throw new Error(`Restore failed: ${result.stderr}`)
}
const final = spawnSync('git', ['status', '--porcelain'], { cwd: ROOT, encoding: 'utf8' })
writeJSON('out/p9.json', { rows, restored: readFileSync(path, 'utf8') === original, status: final.stdout, statusExit: final.status })
if (final.stdout !== '') throw new Error(`STOP: tracked tree dirty after P9: ${final.stdout}`)
console.log('P9 complete')
