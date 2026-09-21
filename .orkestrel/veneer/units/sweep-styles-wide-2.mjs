// A folder-agnostic shared-block measurement over every partial under src/styles/, taken by the
// Orchestrator to bound a successor unit rather than to close anything. Each partial is compiled
// alone so the declarations read are the ones that partial emits. A pair whose shared block is
// supplied by a mixin both partials include is already centralized, so each finding records which
// mixins each side includes and the measurement classifies it.
// Run from the Veneer checkout root: node <this file>
import { readdirSync, readFileSync } from 'node:fs'
import sassModule from 'file:///C:/Users/mikes/WebstormProjects/veneer/node_modules/sass/sass.node.js'
import postcssModule from 'file:///C:/Users/mikes/WebstormProjects/veneer/node_modules/postcss/lib/postcss.js'

const { compile } = sassModule
const { parse } = postcssModule
const directories = ['src/styles/elements', 'src/styles/components']
const partials = []
for (const directory of directories) {
	for (const name of readdirSync(directory).filter((entry) => entry.endsWith('.scss')).sort()) {
		const path = `${directory}/${name}`
		const source = readFileSync(path, 'utf8')
		const includes = new Set(
			[...source.matchAll(/@include\s+([a-z-]+)/g)].map((match) => match[1]),
		)
		const blocks = []
		parse(compile(path, { style: 'expanded' }).css).walkRules((rule) => {
			blocks.push({
				selector: rule.selector,
				declarations: new Set(
					rule.nodes
						.filter((node) => node.type === 'decl')
						.map((node) => `${node.prop}:${node.value}`),
				),
			})
		})
		partials.push({ path, includes, blocks })
	}
}

console.log(`population: ${String(partials.length)} partials over ${directories.join(' and ')}`)
let pairs = 0
const centralized = []
const open = []
for (let first = 0; first < partials.length; first += 1) {
	for (let second = first + 1; second < partials.length; second += 1) {
		pairs += 1
		const left = partials[first]
		const right = partials[second]
		const common = [...left.includes].filter((name) => right.includes.has(name))
		for (const a of left.blocks) {
			for (const b of right.blocks) {
				const shared = [...a.declarations].filter((entry) => b.declarations.has(entry))
				if (shared.length < 2) continue
				const row = `${left.path} { ${a.selector} } and ${right.path} { ${b.selector} } share ${shared.join(' ; ')}${common.length > 0 ? `  [both include: ${common.join(', ')}]` : ''}`
				if (common.length > 0) centralized.push(row)
				else open.push(row)
			}
		}
	}
}
console.log(`pairs compared: ${String(pairs)}`)
console.log(`\n== already routed through a mixin both sides include (${String(centralized.length)})`)
for (const row of centralized) console.log(row)
console.log(`\n== not routed through any shared mixin (${String(open.length)})`)
for (const row of open) console.log(row)
