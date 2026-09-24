import postcss from 'postcss'
import { readFileSync } from 'node:fs'
const css = readFileSync('dist/src/styles/index.css', 'utf8')
const inv = JSON.parse(readFileSync('tests/fixtures/oracle/inventory.json', 'utf8'))
const keys = ['float', 'overflow', 'object-fit', 'clearfix', 'stretched-link']
const pattern = /^\.(float-|overflow-|object-fit-|clearfix|stretched-link)/
const norm = (c) => (c ?? '').replace(/\(min-width:\s*(\d+)px\)/, '(width>=$1px)').replace(/\s*>=\s*/g, '>=').replace(/\s+/g, ' ').trim()
const shipped = []
postcss.parse(css).walkRules((rule) => {
	for (const selector of rule.selectors) {
		if (!pattern.test(selector)) continue
		let cond = ''
		for (let p = rule.parent; p && p.type !== 'root'; p = p.parent) if (p.type === 'atrule' && p.name === 'media') cond = `@media ${p.params}`
		const decls = rule.nodes.filter((n) => n.type === 'decl')
		shipped.push({ key: `${selector.replace(':after', '::after')} ${norm(cond)}`, important: decls.map((d) => d.important), custom: decls.filter((d) => d.prop.startsWith('--')).length })
	}
})
const recorded = keys.flatMap((k) => inv.components[k].selectors.map((s) => `${s.selector} ${norm(s.condition)}`))
const shippedKeys = shipped.map((s) => s.key)
console.log('inventory selectors', recorded.length, 'cascade selectors', shipped.length)
console.log('missing', recorded.filter((k) => !shippedKeys.includes(k)))
console.log('extra', shippedKeys.filter((k) => !recorded.includes(k)))
const util = shipped.filter((s) => !/clearfix|stretched/.test(s.key))
console.log('utility rules', util.length, 'every declaration important', util.every((s) => s.important.every(Boolean)), 'custom properties', util.reduce((a, s) => a + s.custom, 0))
const helpers = shipped.filter((s) => /clearfix|stretched/.test(s.key))
console.log('helper rules', helpers.length, 'no declaration important', helpers.every((s) => s.important.every((i) => !i)))
