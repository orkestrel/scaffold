import { readFileSync, writeFileSync, globSync } from 'node:fs'
import assert from 'node:assert/strict'
import postcss from 'postcss'

const before = postcss.parse(readFileSync('tmp/codex/u4-before.css', 'utf8'))
const after = postcss.parse(readFileSync('tmp/codex/u4-after.css', 'utf8'))
function palette(root) {
	const declarations = []
	root.walkDecls(declaration => {
		if (/^(color|background(?:-color)?|border(?:-\w+)?-color|--(?:bs|rn)-.*)$/.test(declaration.prop) && !declaration.prop.includes('shadow')) {
			declarations.push([declaration.parent.selector, declaration.prop, declaration.value])
		}
	})
	return declarations
}
const baseline = palette(before)
assert(baseline.length > 0)
assert.deepEqual(palette(after), baseline)
const control = after.clone()
control.walkDecls('--bs-primary', declaration => { declaration.value = '#0d6efd' })
assert.notDeepEqual(palette(control), baseline)
const scopes = []
before.walkRules(rule => {
	if (rule.selector === ':root,\n[data-bs-theme=light]' || rule.selector === '[data-bs-theme=dark]') {
		scopes.push({ selector: rule.selector, colors: rule.nodes.filter(node => node.type === 'decl' && /(?:color|bg|rgb|emphasis|subtle)/.test(node.prop)).map(node => [node.prop, node.value]) })
	}
})
writeFileSync('tmp/codex/u4-palette.json', JSON.stringify(scopes, null, 2))
console.log(`Palette identical across ${baseline.length} emitted foreground/background/border/token declarations; stock-blue negative control rejected.`)
const built = postcss.parse(globSync('dist/app/browser/assets/*.css').map(path => readFileSync(path, 'utf8')).join('\n'))
const expected = []
before.walkRules(rule => {
	if (rule.selector !== ':root,\n[data-bs-theme=light]' && rule.selector !== '[data-bs-theme=dark]' && rule.selector !== ':root') return
	rule.walkDecls(declaration => {
		if (/^--(?:bs|rn)-/.test(declaration.prop) && /^#[\da-f]+$/i.test(declaration.value)) {
			expected.push([rule.selector.includes('dark') ? 'dark' : 'light', declaration.prop, declaration.value.replace(/^#([\da-f])([\da-f])([\da-f])$/i, '#$1$1$2$2$3$3').toLowerCase()])
		}
	})
})
for (const [mode, property, value] of expected) {
	const matches = []
	built.walkRules(rule => {
		if (mode === 'dark' ? rule.selector !== '[data-bs-theme=dark]' : !rule.selector.includes(':root')) return
		rule.walkDecls(property, declaration => matches.push(declaration.value.replace(/^#([\da-f])([\da-f])([\da-f])$/i, '#$1$1$2$2$3$3').toLowerCase()))
	})
	assert(matches.includes(value), `${mode} ${property}: expected ${value}, found ${matches}`)
}
let figures = false
built.walkRules('.figures-tabular', rule => rule.walkDecls('font-variant-numeric', declaration => { figures = declaration.value === 'tabular-nums' && declaration.important }))
assert(figures, 'The built asset must contain the generated figures utility')
console.log(`Built CSS preserves ${expected.length} baseline literal color tokens across their scopes and emits .figures-tabular { font-variant-numeric: tabular-nums !important }.`)
