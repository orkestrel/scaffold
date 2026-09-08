import { strict as assert } from 'node:assert'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Compiler, createBlueprint } from '@orkestrel/scaffold'
import { Materializer } from '@orkestrel/scaffold/server'

const root = dirname(fileURLToPath(import.meta.url))
const compiler = new Compiler()
const materializer = new Materializer()
try {
	const compiled = compiler.compile(createBlueprint('widget', { src: ['core'] }), ['configs'])
	assert.ok(compiled.plan)
	const { hash: _hash, ...plan } = compiled.plan
	const withoutSeed = { ...plan, artifacts: plan.artifacts.filter((artifact) => artifact.path !== 'scripts/docs.ts') }
	const audit = materializer.audit(withoutSeed, resolve(root, 'retirement-target'))
	const retired = audit.findings.find((finding) => finding.path === 'scripts/docs.ts')
	assert.equal(retired, undefined)
	console.log('An unplanned retired seed is absent from the existing audit population.')
} finally {
	materializer.destroy()
	compiler.destroy()
}
