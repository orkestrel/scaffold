// The folder-agnostic shared-block measurement, with the source-map discrimination CL4's own
// instrument used: a declaration counts only where the source map puts its origin in the partial
// being compiled, so a declaration a mixin supplies is not mistaken for one the partial authors.
// Population is every partial under both style folders. Run from the Veneer checkout root.
import assert from 'node:assert/strict'
import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sassModule from 'file:///C:/Users/mikes/WebstormProjects/veneer/node_modules/sass/sass.node.js'
import postcssModule from 'file:///C:/Users/mikes/WebstormProjects/veneer/node_modules/postcss/lib/postcss.js'
import sourceMapModule from 'file:///C:/Users/mikes/WebstormProjects/veneer/node_modules/source-map-js/source-map.js'

const { compileString } = sassModule
const { parse } = postcssModule
const { SourceMapConsumer } = sourceMapModule

const folders = ['src/styles/elements', 'src/styles/components']
const members = []
for (const folder of folders) {
	const names = readdirSync(folder)
		.filter((name) => name.startsWith('_') && name.endsWith('.scss'))
		.sort()
	for (const name of names) {
		const own = resolve(folder, name)
		const compiled = compileString(`@use "${name}";`, { loadPaths: [folder], sourceMap: true })
		const mapping = new SourceMapConsumer(compiled.sourceMap)
		const rules = []
		parse(compiled.css).walkRules((rule) => {
			const declarations = rule.nodes
				.filter((node) => node.type === 'decl')
				.map((node) => {
					const original = mapping.originalPositionFor({
						line: node.source.start.line,
						column: node.source.start.column - 1,
					})
					assert.ok(original.source, `Declaration has no source: ${node.toString()}`)
					return resolve(fileURLToPath(original.source)) === own
						? `${node.prop}: ${node.value}${node.important ? ' !important' : ''}`
						: undefined
				})
			rules.push({ selector: rule.selector.replace(/\s+/g, ' '), declarations })
		})
		members.push({ path: `${folder}/${name}`, rules })
	}
}

let pairs = 0
const hits = []
for (let a = 0; a < members.length; a += 1) {
	for (let b = a + 1; b < members.length; b += 1) {
		pairs += 1
		for (const left of members[a].rules) {
			for (const right of members[b].rules) {
				const shared = [
					...new Set(
						left.declarations.filter(
							(value) => value !== undefined && right.declarations.includes(value),
						),
					),
				]
				if (shared.length >= 2) {
					hits.push({
						pair: [members[a].path, members[b].path],
						selectors: [left.selector, right.selector],
						shared,
					})
				}
			}
		}
	}
}

console.log(`population: ${String(members.length)} partials over ${folders.join(' and ')}`)
console.log(`pairs compared: ${String(pairs)}`)
console.log(`hits: ${String(hits.length)}`)
for (const hit of hits) {
	console.log(`\n${hit.pair[0]} { ${hit.selectors[0]} }`)
	console.log(`${hit.pair[1]} { ${hit.selectors[1]} }`)
	console.log(`  shared: ${hit.shared.join(' ; ')}`)
}
