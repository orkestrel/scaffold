// Re-produces the red for unit S3 item 2. Mutates the selection back to the shape that
// re-runs `findIndex` over every override entry without excluding one already taken,
// runs the hazard case that names the defect, restores the file, and re-runs it green.
// The mutation lands in `src/core/templates.ts`, which is the emitted text the checkout's
// own `vite.config.ts` is regenerated from, so the test's import reads the mutation.
// Forced termination bypasses `finally`; a killed run can leave the tree mutated.
import { readFileSync, writeFileSync } from 'node:fs'
import { runCase } from './s4-run-case.mjs'

const TEMPLATE = 'src/core/templates.ts'
const CONFIG = 'vite.config.ts'
const CASE = 'installs one override entry at one base position'
const GUARDED = `			(candidate, position) =>
				!taken.has(position) && isNamedPlugin(candidate) && candidate.name === plugin.name,`
const UNGUARDED = `			(candidate, position) =>
				position >= 0 && isNamedPlugin(candidate) && candidate.name === plugin.name,`

const template = readFileSync(TEMPLATE, 'utf8')
const config = readFileSync(CONFIG, 'utf8')
if (!template.includes(GUARDED) || !config.includes(GUARDED)) {
	throw new Error('The guarded selection is not in the tree; nothing to mutate')
}
try {
	writeFileSync(TEMPLATE, template.replace(GUARDED, UNGUARDED))
	writeFileSync(CONFIG, config.replace(GUARDED, UNGUARDED))
	runCase('mutated', CASE, 'failed', 422)
} finally {
	writeFileSync(TEMPLATE, template)
	writeFileSync(CONFIG, config)
}
runCase('restored', CASE, 'passed', 422)
