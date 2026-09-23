// Compiles the expanded cascade from two source roots with Sass, extracts every rule whose selector
// names `.btn` or the `button` element with its enclosing at-rules, and compares the lists.
// The shipped build minifies and merges adjacent identical media blocks, so this reading is the one
// that sees a block split the minifier hides.
// Usage: node tmp/probe/bff-button-expanded.mjs BASELINE_ROOT CURRENT_ROOT
import { resolve } from 'node:path'
import { compile } from 'sass'
import postcss from 'postcss'

const pattern = /\.btn|(^|[\s,>+~(])button\b/

function extractButtonBlocks(root) {
	const css = compile(resolve(root, 'src/styles/index.scss'), {
		loadPaths: [resolve(root, 'src/styles')],
		style: 'expanded',
	}).css
	const blocks = []
	postcss.parse(css).walkRules((rule) => {
		if (!pattern.test(rule.selector)) return
		const chain = []
		for (let parent = rule.parent; parent && parent.type !== 'root'; parent = parent.parent) {
			if (parent.type === 'atrule') chain.unshift(`@${parent.name} ${parent.params}`)
		}
		blocks.push(`${chain.join(' > ')} :: ${rule.toString()}`)
	})
	return blocks
}

const [baselineRoot, currentRoot] = process.argv.slice(2)
const baseline = extractButtonBlocks(baselineRoot)
const current = extractButtonBlocks(currentRoot)
console.log(`baseline blocks: ${baseline.length}`)
console.log(`current blocks: ${current.length}`)
let differing = 0
for (let index = 0; index < Math.max(baseline.length, current.length); index++) {
	if (baseline[index] !== current[index]) {
		differing++
		if (differing <= 2) console.log(`differs at ${index}:\n- ${baseline[index]}\n+ ${current[index]}`)
	}
}
console.log(`differing blocks: ${differing}`)
process.exit(differing === 0 && baseline.length > 0 ? 0 : 1)
