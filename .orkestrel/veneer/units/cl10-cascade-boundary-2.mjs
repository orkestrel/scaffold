import { readFileSync } from 'node:fs'
import { parse } from 'postcss'

const before = /^\.(?:(?:row|col|offset|g|gx|gy|table|icon-link|ratio|vr)(?:-|[^\w-]|$)|caption-top(?:[^\w-]|$))/u
const source = readFileSync('tests/setupStyles.ts', 'utf8')
const expression = source.match(/!\/(.+)\/u\.test\(/u)?.[1]
if (expression === undefined) throw new Error('No collector admission expression')
const after = new RegExp(expression, 'u')
const differences = []
let admitted = 0
parse(readFileSync('dist/src/styles/index.css', 'utf8')).walkRules((rule) => {
	for (const selector of rule.selectors) {
		if (before.test(selector)) admitted += 1
		if (before.test(selector) !== after.test(selector)) differences.push(selector)
	}
})
console.log(JSON.stringify({ admitted, differences }))
if (differences.length > 0) process.exitCode = 1
