import { spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'

const ROOT = '/home/user/fleet/database'
const TSC = createRequire(join(ROOT, 'package.json')).resolve('typescript/bin/tsc')

function run(label, dir, config) {
	rmSync(dir, { recursive: true, force: true })
	mkdirSync(dir, { recursive: true })
	writeFileSync(join(dir, 'tsconfig.json'), JSON.stringify(config.project, undefined, '\t'))
	for (const [name, text] of Object.entries(config.files ?? {})) writeFileSync(join(dir, name), text)
	const started = performance.now()
	const result = spawnSync(
		process.execPath,
		[TSC, '--noEmit', '--pretty', 'false', '-p', join(dir, 'tsconfig.json')],
		{ cwd: ROOT, encoding: 'utf8', windowsHide: true },
	)
	console.log(`### ${label}: status=${result.status} ms=${Math.round(performance.now() - started)}`)
	console.log((result.stdout ?? '').trim() || '(no stdout)')
	if ((result.stderr ?? '').trim()) console.log('STDERR:', result.stderr.trim())
}

// A: fence overlay WITHOUT the base @src/* paths
const a = join(ROOT, 'tmp/u10probe/a')
run('fences without @src paths', a, {
	files: {
		'fence-01.ts': "import { createDatabase, createMemoryDriver } from '@orkestrel/database'\nimport { createJSONDriver } from '@orkestrel/database/server'\nvoid createDatabase\nvoid createMemoryDriver\nvoid createJSONDriver\nexport {}\n",
	},
	project: {
		extends: join(ROOT, 'tsconfig.json'),
		compilerOptions: {
			noEmit: true,
			paths: {
				'@orkestrel/database': [join(ROOT, 'src/core/index.ts')],
				'@orkestrel/database/browser': [join(ROOT, 'src/browser/index.ts')],
				'@orkestrel/database/server': [join(ROOT, 'src/server/index.ts')],
			},
		},
		files: [join(a, 'fence-01.ts')],
		include: [],
	},
})

// B: entry graph, no paths overlay
const b = join(ROOT, 'tmp/u10probe/b')
run('entries via extends, no paths override', b, {
	project: {
		extends: join(ROOT, 'tsconfig.json'),
		compilerOptions: { noEmit: true },
		files: [
			join(ROOT, 'src/core/index.ts'),
			join(ROOT, 'src/browser/index.ts'),
			join(ROOT, 'src/server/index.ts'),
		],
		include: [],
	},
})
