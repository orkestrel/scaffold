// Prints every rule whose selector matches the pattern argument, with its enclosing at-rules.
import { readFileSync } from 'node:fs'
import postcss from 'postcss'
const [path, source] = process.argv.slice(2)
const pattern = new RegExp(source)
postcss.parse(readFileSync(path, 'utf8')).walkRules((rule) => {
	if (!pattern.test(rule.selector)) return
	const chain = []
	for (let parent = rule.parent; parent && parent.type !== 'root'; parent = parent.parent) {
		if (parent.type === 'atrule') chain.unshift(`@${parent.name} ${parent.params}`)
	}
	console.log(`${chain.join(' > ')} :: ${rule.toString()}`)
})
