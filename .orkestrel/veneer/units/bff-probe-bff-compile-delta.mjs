// Lists every rule, with its enclosing at-rules, present in one compiled cascade and absent from the
// other, so the whole-file delta between the baseline and the rebuilt cascade can be read.
// Usage: node tmp/probe/bff-compile-delta.mjs BASELINE_CSS BUILT_CSS
import { readFileSync } from 'node:fs'
import postcss from 'postcss'

function listRules(path) {
	const rules = []
	postcss.parse(readFileSync(path, 'utf8')).walkRules((rule) => {
		const chain = []
		for (let parent = rule.parent; parent && parent.type !== 'root'; parent = parent.parent) {
			if (parent.type === 'atrule') chain.unshift(`@${parent.name} ${parent.params}`)
		}
		rules.push(`${chain.join(' > ')} :: ${rule.toString()}`)
	})
	return rules
}
const [baselinePath, builtPath] = process.argv.slice(2)
const baseline = listRules(baselinePath)
const built = listRules(builtPath)
for (const rule of baseline.filter((entry) => !built.includes(entry))) console.log(`- ${rule}`)
for (const rule of built.filter((entry) => !baseline.includes(entry))) console.log(`+ ${rule}`)
