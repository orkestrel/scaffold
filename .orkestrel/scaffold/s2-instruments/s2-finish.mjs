import { readFileSync, writeFileSync } from 'node:fs'

const path = 'tests/src/core/templates.test.ts'
writeFileSync(path, readFileSync(path, 'utf8').replaceAll('findRefused(', 'findRefusals(').replace(
	'// declares no `command`, so a value carrying one is that record and merges\n\t\t// nothing, and the vendored `tests/config.test.ts` drives every registered row',
	'// declares neither `command` nor `mode`, so a value carrying both returns the\n\t\t// base unchanged. The vendored `tests/config.test.ts` drives every registered row',
))
const compilerTest = 'tests/src/core/compilers.test.ts'
writeFileSync(compilerTest, readFileSync(compilerTest, 'utf8').replace(
	'// position: `mergeOverride` refuses a value carrying `command`, which is what makes',
	'// position: `mergeOverride` refuses a value carrying `command` and `mode`, which makes',
).replace(
	'// the output boundary and the build options a showcase changes. `appShowcase` is\n\t// generated inline here while `appBrowser` comes from the template, so one spelling\n\t// drifting from the other is the failure this catches.',
	'// the output boundary and the build options a showcase changes. The sealed copy\n\t// restores the declaration this rule replaced and must fail the same assertion.',
))
