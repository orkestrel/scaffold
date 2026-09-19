import { rmSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { Compiler, createBlueprint } from '../../dist/src/core/index.js'
import { Materializer } from '../../dist/src/server/index.js'

const target = join(tmpdir(), 'd1-appshape')
rmSync(target, { recursive: true, force: true })
const blueprint = createBlueprint('proof', { app: ['core', 'server'] })
const compiler = new Compiler()
const outcome = compiler.compile(blueprint)
if (outcome.plan === undefined) {
	console.log('BLOCKED', JSON.stringify(outcome.questions ?? outcome, undefined, 2))
	process.exit(1)
}
compiler.destroy()
const materializer = new Materializer({ host: join(process.cwd(), 'dist/host') })
const result = materializer.materialize(outcome.plan, target)
materializer.destroy()
console.log('written', result.written.length)
console.log('configs/src exists:', existsSync(join(target, 'configs/src')))
console.log('configs/app exists:', existsSync(join(target, 'configs/app')))
console.log('tests/config.test.ts:', existsSync(join(target, 'tests/config.test.ts')))
const manifest = JSON.parse(await import('node:fs').then((m) => m.readFileSync(join(target, 'package.json'), 'utf8')))
console.log('scripts:', JSON.stringify(manifest.scripts, undefined, 2))
