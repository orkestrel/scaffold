import { spawnSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createRequire } from 'node:module'

const ROOT = '/home/user/fleet/database'
const TSC = createRequire(join(ROOT, 'package.json')).resolve('typescript/bin/tsc')

const base = mkdtempSync(join(tmpdir(), 'database-typescript-'))
mkdirSync(join(base, 'src'), { recursive: true })
writeFileSync(join(base, 'src/index.ts'), "export * from './shapes.js'\nexport class Engine {}\nexport function build(): number { return 1 }\nexport const LIMIT = 5\n")
writeFileSync(join(base, 'src/shapes.ts'), 'export interface Shape { readonly id: string }\nexport type Label = string\n')
writeFileSync(join(base, 'tsconfig.json'), JSON.stringify({ compilerOptions: { strict: true, target: 'ESNext', module: 'ESNext', moduleResolution: 'bundler', noEmit: true }, include: ['src/**/*.ts'] }))

const scratch = join(base, 'tmp', 'scratch')
mkdirSync(scratch, { recursive: true })
writeFileSync(join(scratch, 'tsconfig.json'), JSON.stringify({ extends: join(base, 'tsconfig.json'), compilerOptions: { noEmit: true }, files: [join(base, 'src/index.ts')], include: [] }))

for (const round of [1, 2, 3]) {
	const t = performance.now()
	const r = spawnSync(process.execPath, [TSC, '--noEmit', '--pretty', 'false', '-p', join(scratch, 'tsconfig.json')], { cwd: base, encoding: 'utf8' })
	console.log(`tiny project run ${round}: status=${r.status} ms=${Math.round(performance.now() - t)} out=${JSON.stringify((r.stdout ?? '').trim())}`)
}
const t2 = performance.now()
const r2 = spawnSync(process.execPath, [TSC, '--showConfig', '-p', join(base, 'tsconfig.json')], { cwd: base, encoding: 'utf8' })
console.log('showConfig ms', Math.round(performance.now() - t2), 'status', r2.status)
console.log(r2.stdout)
rmSync(base, { recursive: true, force: true })
