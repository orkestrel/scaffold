// Round 2: supersedes ac-instruments/built-selectors.mjs unchanged; run with the validation copy
// (tmp/probe/base) as the working directory after `npm run build:src`.
// Lists every built rule whose selector names an accordion class, with its enclosing at-rule
// conditions and its declared properties, read from the stage's built cascade.
import { readFileSync } from 'node:fs'
import postcss from 'postcss'
const root = postcss.parse(readFileSync('dist/src/styles/index.css', 'utf8'))
root.walkRules((rule) => {
	if (!/\.accordion/.test(rule.selector)) return
	const conditions = []
	for (let parent = rule.parent; parent && parent.type !== 'root'; parent = parent.parent)
		if (parent.type === 'atrule') conditions.unshift(`@${parent.name} ${parent.params}`)
	const props = []
	rule.walkDecls((decl) => props.push(decl.prop))
	console.log(`${rule.selector} | ${conditions.join(' ')} | ${props.join(', ')}`)
})
