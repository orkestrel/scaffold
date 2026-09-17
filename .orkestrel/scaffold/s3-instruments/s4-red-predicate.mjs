// Replays the predicate regressions through the generated root configuration.
// Coverage: non-string names and named structural promises at the merge boundary.
// The control restores the original predicate, outside the ordinary named-plugin shape.
// Forced termination bypasses `finally`; a killed run can leave the tree mutated.
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync } from 'node:fs'
import { runCase } from './s4-run-case.mjs'

const TEMPLATE = 'src/core/templates.ts'
const CONFIG = 'vite.config.ts'
const GUARDED = `!('then' in plugin && typeof plugin.then === 'function') &&
		'name' in plugin &&
		typeof plugin.name === 'string'`
const ORIGINAL = `!(plugin instanceof Promise) &&
		'name' in plugin`
const CASES = [
	'preserves non-string plugin names without selecting them',
	'preserves named structural promises without selecting them',
]
const template = readFileSync(TEMPLATE, 'utf8')
const config = readFileSync(CONFIG, 'utf8')
assert.ok(template.includes(GUARDED) && config.includes(GUARDED), 'The repaired predicate is absent')
try {
	writeFileSync(TEMPLATE, template.replace(GUARDED, ORIGINAL))
	writeFileSync(CONFIG, config.replace(GUARDED, ORIGINAL))
	for (const title of CASES) runCase('original predicate', title, 'failed', 422)
} finally {
	try {
		writeFileSync(TEMPLATE, template)
	} finally {
		writeFileSync(CONFIG, config)
	}
}
for (const title of CASES) runCase('repaired predicate', title, 'passed', 422)
