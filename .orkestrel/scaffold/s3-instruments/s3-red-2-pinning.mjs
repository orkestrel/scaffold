// Re-produces the red for unit S3 item 7. The whole-output pinning case's blueprint
// control cannot reach its merge pin, because every selection emits the merge
// identically, so that pin's red comes from a mutation of the emitted text instead.
// Renames the selection's consumed-index set inside the root vite template, runs the
// pinning case, restores the file, and re-runs it green.
// Forced termination bypasses `finally`; a killed run can leave the tree mutated.
import { readFileSync, writeFileSync } from 'node:fs'
import { runCase } from './s4-run-case.mjs'

const TEMPLATE = 'src/core/templates.ts'
const CASE = 'emits every browser workspace configuration for a showcase selection and for none'

const template = readFileSync(TEMPLATE, 'utf8')
if (!template.includes('const taken = new Set<number>()')) {
	throw new Error('The emitted selection is not in the template; nothing to mutate')
}
try {
	writeFileSync(TEMPLATE, template.replaceAll('taken', 'consumed'))
	runCase('mutated', CASE, 'failed', 422)
} finally {
	writeFileSync(TEMPLATE, template)
}
runCase('restored', CASE, 'passed', 422)
