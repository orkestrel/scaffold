// Extracts every rule whose selector names `.btn` or the `button` element, with its enclosing
// at-rules, from the baseline and the rebuilt cascade, and compares the two lists byte for byte.
// Usage: node tmp/probe/bff-button-compile.mjs BASELINE_CSS BUILT_CSS
import { readFileSync } from 'node:fs'
import postcss from 'postcss'

const pattern = /\.btn|(^|[\s,>+~(])button\b/

function extractButtonBlocks(path) {
	const root = postcss.parse(readFileSync(path, 'utf8'))
	const blocks = []
	root.walkRules((rule) => {
		if (!pattern.test(rule.selector)) return
		const chain = []
		for (let parent = rule.parent; parent && parent.type !== 'root'; parent = parent.parent) {
			if (parent.type === 'atrule') chain.unshift(`@${parent.name} ${parent.params}`)
		}
		blocks.push(`${chain.join(' > ')} :: ${rule.toString()}`)
	})
	return blocks
}

const [baselinePath, builtPath] = process.argv.slice(2)
const baseline = extractButtonBlocks(baselinePath)
const built = extractButtonBlocks(builtPath)
console.log(`baseline blocks: ${baseline.length}`)
console.log(`built blocks: ${built.length}`)
let differing = 0
const longest = Math.max(baseline.length, built.length)
for (let index = 0; index < longest; index++) {
	if (baseline[index] !== built[index]) {
		differing++
		console.log(`differs at ${index}:\n- ${baseline[index]}\n+ ${built[index]}`)
	}
}
console.log(`differing blocks: ${differing}`)
process.exit(differing === 0 && baseline.length > 0 ? 0 : 1)
