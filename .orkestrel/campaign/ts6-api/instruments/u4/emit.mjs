// Emits the generated distribution proof for a core-only blueprint and for a
// core+browser blueprint, so the template's own text can be typechecked.
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { createBlueprint, blueprintToTestArtifacts } from '/home/user/scaffold/dist/src/core/index.js'

const out = process.argv[2]
mkdirSync(out, { recursive: true })
for (const [label, src] of [['core', ['core']], ['browser', ['core', 'browser']]]) {
	const blueprint = createBlueprint('router', { src })
	const artifacts = blueprintToTestArtifacts(blueprint)
	const proof = artifacts.find((artifact) => artifact.path === 'tests/distribution.test.ts')
	if (proof === undefined) throw new Error(`no distribution artifact for ${label}`)
	writeFileSync(join(out, `${label}.distribution.test.ts`), proof.content)
	process.stdout.write(`${label}: ${proof.content.split('\n').length} lines, ownership=${proof.ownership}\n`)
}
