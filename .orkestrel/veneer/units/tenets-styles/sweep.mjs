// Orchestrator instrument: tenet sweep over a compiled Veneer cascade. Usage: node sweep.mjs <index.css> <srcDir>
// Walks the CSS with the postcss copy the checkout already installs, and reports per tenet the rules that break it.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'
const [css, src] = process.argv.slice(2)
const require = createRequire(join(src, '..', 'package.json'))
const postcss = require('postcss')
const root = postcss.parse(readFileSync(css, 'utf8'))
function layerOf(node) { let n = node.parent; const names = []; while (n) { if (n.type === 'atrule' && n.name === 'layer') names.unshift(n.params); n = n.parent } return names.join('.') || '(unlayered)' }
function conds(node) { let n = node.parent; const c = []; while (n) { if (n.type === 'atrule' && n.name !== 'layer') c.unshift(`@${n.name} ${n.params}`); n = n.parent } return c.join(' ') }
function splitTop(str, sep) { const parts = []; let depth = 0, cur = ''; for (const ch of str) { if (ch === '(') depth++; if (ch === ')') depth--; if (depth === 0 && ch === sep) { parts.push(cur.trim()); cur = '' } else cur += ch } parts.push(cur.trim()); return parts.filter(Boolean) }
function splitCompounds(complex) { const parts = []; let depth = 0, cur = ''; for (const ch of complex) { if (ch === '(') depth++; if (ch === ')') depth--; if (depth === 0 && /[\s>+~]/.test(ch)) { if (cur.trim()) parts.push(cur.trim()); cur = '' } else cur += ch } if (cur.trim()) parts.push(cur.trim()); return parts }
const out = { has: [], notClass: [], tagContext: [], tagOnlyOutsideElements: [], important: {}, declared: new Set(), read: new Set() }
root.walkRules((rule) => {
	if (rule.parent?.type === 'atrule' && /keyframes/.test(rule.parent.name)) return
	const layer = layerOf(rule)
	const sel = rule.selector
	if (/:has\(/.test(sel)) out.has.push(`${layer} | ${sel}`)
	if (/:not\(\[class/.test(sel)) out.notClass.push(`${layer} | ${sel}`)
	for (const complex of splitTop(sel, ',')) {
		const compounds = splitCompounds(complex)
		const isTagOnly = (c) => /^[a-z][\w-]*/i.test(c) && !/[.#\[]/.test(c.replace(/\([^)]*\)/g, ''))
		const anyClass = /[.#\[]/.test(complex)
		if (compounds.length > 1 && compounds.filter(isTagOnly).length >= 2 && !anyClass) out.tagContext.push(`${layer} | ${conds(rule)} | ${complex}`)
		if (layer !== 'elements' && layer !== 'reset' && !anyClass && compounds.some(isTagOnly) && !/^:root|^html|^\*|::/.test(complex)) out.tagOnlyOutsideElements.push(`${layer} | ${conds(rule)} | ${complex}`)
	}
	rule.walkDecls((d) => {
		if (d.important) out.important[layer] = (out.important[layer] ?? 0) + 1
		if (d.prop.startsWith('--vn-')) out.declared.add(d.prop)
		for (const m of d.value.matchAll(/var\((--vn-[\w-]+)/g)) out.read.add(m[1])
	})
})
root.walkAtRules('property', (a) => out.declared.add(a.params.trim()))
function walk(dir, files = []) { for (const f of readdirSync(dir)) { const p = join(dir, f); statSync(p).isDirectory() ? walk(p, files) : files.push(p) } return files }
const tsReads = new Set()
for (const f of walk(src)) if (/\.(ts|vue|scss)$/.test(f)) for (const m of readFileSync(f, 'utf8').matchAll(/(--vn-[\w-]+)/g)) tsReads.add(m[1])
const unread = [...out.declared].filter((p) => !out.read.has(p)).sort()
console.log('== :has()'); console.log(out.has.join('\n') || 'none')
console.log('== :not([class...])'); console.log(out.notClass.join('\n') || 'none')
console.log('== tag-context pairs (two or more tag-only compounds, no class anywhere)'); console.log(out.tagContext.join('\n') || 'none')
console.log('== tag-only selectors outside the elements and reboot layers'); console.log([...new Set(out.tagOnlyOutsideElements)].join('\n') || 'none')
console.log('== !important per layer'); console.log(JSON.stringify(out.important))
console.log('== declared --vn-* with no var() reader in the cascade'); console.log(unread.map((p) => `${p}${tsReads.has(p) ? '' : ' (and no source mention outside its declaration?)'}`).join('\n') || 'none')
