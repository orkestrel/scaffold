import { spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'

const ROOT = '/home/user/fleet/database'
const TSC = createRequire(join(ROOT, 'package.json')).resolve('typescript/bin/tsc')
const dir = join(ROOT, 'tmp', 'u10probe', 'scratch')
rmSync(dir, { recursive: true, force: true })
mkdirSync(dir, { recursive: true })

writeFileSync(
	join(dir, 'fence-01.ts'),
	"import { createDatabase, createMemoryDriver } from '@orkestrel/database'\nvoid createDatabase\nvoid createMemoryDriver\nexport {}\n",
)
writeFileSync(
	join(dir, 'fence-02.ts'),
	"import { generateKey } from '@orkestrel/database/server'\ngenerateKey()\nexport {}\n",
)
const config = {
	extends: join(ROOT, 'tsconfig.json'),
	compilerOptions: {
		noEmit: true,
		paths: {
			'@src/core': [join(ROOT, 'src/core/index.ts')],
			'@src/browser': [join(ROOT, 'src/browser/index.ts')],
			'@src/server': [join(ROOT, 'src/server/index.ts')],
			'@orkestrel/database': [join(ROOT, 'src/core/index.ts')],
			'@orkestrel/database/browser': [join(ROOT, 'src/browser/index.ts')],
			'@orkestrel/database/server': [join(ROOT, 'src/server/index.ts')],
		},
	},
	files: [join(dir, 'fence-01.ts'), join(dir, 'fence-02.ts')],
	include: [],
}
writeFileSync(join(dir, 'tsconfig.json'), JSON.stringify(config, undefined, '\t'))

const started = performance.now()
const result = spawnSync(
	process.execPath,
	[TSC, '--noEmit', '--pretty', 'false', '-p', join(dir, 'tsconfig.json')],
	{ cwd: ROOT, encoding: 'utf8', windowsHide: true },
)
const elapsed = performance.now() - started
console.log('status', result.status, 'ms', Math.round(elapsed))
console.log('--- stdout ---')
console.log(result.stdout)
console.log('--- stderr ---')
console.log(result.stderr)
