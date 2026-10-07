// Usage: node tmp/units/twd/substitute.ts. Exit 0 on the pinned substitution counts.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import assert from 'node:assert/strict'

let swatches = 0
let measures = 0
const replacements = new Map<string, string>()
for (const entry of readdirSync('src/bootstrap', { recursive: true, withFileTypes: true })) {
	if (!entry.isFile() || !entry.name.endsWith('.scss') || entry.name === '_mixins.scss') continue
	const path = join(entry.parentPath, entry.name)
	const original = readFileSync(path, 'utf8')
	let source = original.replace(/#\{(?:mixins\.)?swatch\("([^"\n]*)"(?:,\s*(?:"[^"\n]*"|[\w-]+))?\)\}/g, (_match, literal: string) => {
		swatches++
		return literal
	})
	source = source.replace(/(?:mixins\.)?swatch\('([^'\n]*)'(?:,\s*'[^'\n]*')?\)/g, (_match, literal: string) => {
		swatches++
		return `'${literal}'`
	})
	source = source.replace(/(?:mixins\.)?measure\(\s*'[^']*',\s*('[^']*'|[^()]*?)\s*\)/g, (_match, literal: string) => {
		measures++
		return literal.trim()
	})
	assert(!/\b(?:swatch|measure)\(/.test(source), path)
	if (source !== original) replacements.set(path, source)
}
assert.equal(swatches, 571)
assert.equal(measures, 141)
for (const [path, source] of replacements) writeFileSync(path, source)
const path = 'src/bootstrap/_mixins.scss'
const source = readFileSync(path, 'utf8')
assert(source.includes('\n@function -integer('))
writeFileSync(path, source.slice(0, source.indexOf('\n@function -integer(')).replace("@use 'sass:math';\n", ''))
console.log({ swatches, measures })
