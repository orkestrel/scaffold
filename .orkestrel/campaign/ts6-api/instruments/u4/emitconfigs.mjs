// Emits the generated configs artifacts a browser blueprint receives, so the
// browser variant of the proof can be typechecked beside the module it imports.
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { createBlueprint, blueprintToConfigArtifacts } from '/home/user/scaffold/dist/src/core/index.js'

const out = process.argv[2]
const blueprint = createBlueprint('router', { src: ['core', 'browser'] })
for (const artifact of blueprintToConfigArtifacts(blueprint)) {
	if (typeof artifact.content !== 'string') continue
	const path = join(out, artifact.path)
	mkdirSync(dirname(path), { recursive: true })
	writeFileSync(path, artifact.content)
	process.stdout.write(`${artifact.path}\n`)
}
