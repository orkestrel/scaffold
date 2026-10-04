import { chromium } from 'playwright'
import { readFileSync, writeFileSync } from 'node:fs'

const DIR = '/home/user/veneer/tmp/probes/flip/m1-cascade'
const LAYERS = ['reset', 'base', 'bootstrap', 'theme', 'elements', 'components', 'surfaces', 'composables', 'modifiers', 'utilities']
const STATEMENT = `@layer ${LAYERS.join(', ')};`
const STATEMENT_COMPAT = `@layer ${[...LAYERS, 'compat'].join(', ')};`
const BS = '.x { margin-top: 16px !important }'
const TW = '@layer utilities { .x { margin-top: 12px } }'
const RESET = '@layer reset { .x { margin-top: 4px } }'
const TWI = '@layer utilities { .x { margin-top: 12px !important } }'
const BS_COLOR = '.x { color: rgb(16, 16, 16) !important }'
const TW_COLOR = '@layer utilities { .x { color: rgb(12, 12, 12) } }'

const X = '<div class="x"></div>'
const XP = '<div style="margin-top: 7px; color: rgb(7, 7, 7)"><div class="x"></div></div>'
const CARD = '<div class="card"><div class="x"></div></div>'

// class category sets
const core = await import('/home/user/veneer/dist/src/core/index.js')
const leaves = (node: unknown, out: Set<string>): Set<string> => {
	if (typeof node === 'string') out.add(node)
	else if (node !== null && typeof node === 'object') for (const v of Object.values(node)) leaves(v, out)
	return out
}
const cats: Record<string, Set<string>> = {}
for (const [k, v] of Object.entries(core.CLASS_NAMES.bootstrap)) cats[k] = leaves(v, new Set())
const shared: string[] = JSON.parse(readFileSync('/home/user/veneer/tests/fixtures/tailwindcss/comparison.json', 'utf8')).shared
const sharedUtilities = shared.filter((n) => cats.utilities.has(n))
const sharedComponents = shared.filter((n) => cats.components.has(n))
const classSets = {
	categorySizes: Object.fromEntries(Object.entries(cats).map(([k, v]) => [k, v.size])),
	shared: shared.length,
	sharedUtilities: sharedUtilities.length,
	sharedComponents: sharedComponents.length,
	sharedComponentNames: sharedComponents.sort(),
}
if (sharedUtilities.length !== 192 || sharedComponents.length !== 17) {
	console.error('class set size mismatch', classSets)
	process.exit(1)
}

type Sheet = { label: string; css: string }
type Reading = { id: string; group: string; note: string; sheets: Sheet[]; body: string; target: string; property: string; expect?: string }
const S = (label: string, css: string): Sheet => ({ label, css })
const st = S('statement', STATEMENT)
const stc = S('statement+compat', STATEMENT_COMPAT)
const readings: Reading[] = []
const add = (r: Reading) => readings.push(r)
const mt = { body: X, target: '.x', property: 'margin-top' }

// baselines
add({ id: '0.ua', group: 'baseline', note: 'statement only', sheets: [st], ...mt, expect: '0px' })
add({ id: '0.bs', group: 'baseline', note: 'BS alone', sheets: [st, S('BS', BS)], ...mt, expect: '16px' })
add({ id: '0.tw', group: 'baseline', note: 'TW alone', sheets: [st, S('TW', TW)], ...mt, expect: '12px' })
add({ id: '0.reset', group: 'baseline', note: 'RESET alone', sheets: [st, S('RESET', RESET)], ...mt, expect: '4px' })

// a
add({ id: 'a.1', group: 'a', note: 'BS then TW', sheets: [st, S('BS', BS), S('TW', TW)], ...mt, expect: '16px' })
add({ id: 'a.2', group: 'a', note: 'TW then BS', sheets: [st, S('TW', TW), S('BS', BS)], ...mt, expect: '16px' })

// b
const RSI12 = '@layer reset { .x { margin-top: 12px !important } }'
const RSI4 = '@layer reset { .x { margin-top: 4px !important } }'
add({ id: 'b.1', group: 'b', note: 'BS then utilities!important', sheets: [st, S('BS', BS), S('TW!(utilities)', TWI)], ...mt, expect: '12px' })
add({ id: 'b.2', group: 'b', note: 'utilities!important then BS', sheets: [st, S('TW!(utilities)', TWI), S('BS', BS)], ...mt, expect: '12px' })
add({ id: 'b.3', group: 'b', note: 'BS then reset!important 12px', sheets: [st, S('BS', BS), S('reset!12', RSI12)], ...mt, expect: '12px' })
add({ id: 'b.4', group: 'b', note: 'reset!important 12px then BS', sheets: [st, S('reset!12', RSI12), S('BS', BS)], ...mt, expect: '12px' })
add({ id: 'b.5', group: 'b', note: 'BS, utilities!important 12px, reset!important 4px (earlier layer among layered importants)', sheets: [st, S('BS', BS), S('TW!(utilities)', TWI), S('reset!4', RSI4)], ...mt, expect: '4px' })
add({ id: 'b.6', group: 'b', note: 'reset!important 4px, utilities!important 12px, BS (source order reversed)', sheets: [st, S('reset!4', RSI4), S('TW!(utilities)', TWI), S('BS', BS)], ...mt, expect: '4px' })

// c
const ALL = [...LAYERS, 'compat']
const keywords: [string, string][] = [
	['revert-layer !important', 'rli'],
	['revert-layer', 'rln'],
	['revert !important', 'rvi'],
	['unset !important', 'usi'],
	['initial !important', 'ini'],
	['inherit !important', 'ihi'],
]
for (const [kw, tag] of keywords)
	for (const L of ALL)
		for (const pos of ['after', 'before'] as const) {
			const statement = L === 'compat' ? stc : st
			const lsheet = S(`${L}:${kw}`, `@layer ${L} { .x { margin-top: ${kw} } }`)
			const core = [S('BS', BS), S('TW', TW)]
			const sheets = pos === 'after' ? [statement, ...core, lsheet] : [statement, lsheet, ...core]
			add({ id: `c.${tag}.${L}.${pos}`, group: 'c', note: `margin-top: ${kw} in @layer ${L}, L sheet ${pos} BS+TW`, sheets, body: tag === 'ihi' ? XP : X, target: '.x', property: 'margin-top' })
		}
// c inherit on color (inherited property)
for (const L of ALL)
	for (const pos of ['after', 'before'] as const) {
		const statement = L === 'compat' ? stc : st
		const lsheet = S(`${L}:color inherit !important`, `@layer ${L} { .x { color: inherit !important } }`)
		const core = [S('BS-color', BS_COLOR), S('TW-color', TW_COLOR)]
		const sheets = pos === 'after' ? [statement, ...core, lsheet] : [statement, lsheet, ...core]
		add({ id: `c.ihc.${L}.${pos}`, group: 'c', note: `color: inherit !important in @layer ${L}, L sheet ${pos} BS-color+TW-color; parent color rgb(7, 7, 7)`, sheets, body: XP, target: '.x', property: 'color' })
	}
add({ id: 'c.ihc.base0', group: 'c', note: 'color baseline: BS-color + TW-color, parent rgb(7, 7, 7)', sheets: [st, S('BS-color', BS_COLOR), S('TW-color', TW_COLOR)], body: XP, target: '.x', property: 'color' })
add({ id: 'c.ihi.base0', group: 'c', note: 'margin baseline with parent margin-top 7px: BS + TW', sheets: [st, S('BS', BS), S('TW', TW)], body: XP, target: '.x', property: 'margin-top' })

// d
for (const L of ['reset', 'base', 'bootstrap', 'utilities', 'compat'])
	for (const [kw, tag] of [['revert-layer !important', 'rli'], ['revert-layer', 'rln']] as const) {
		const statement = L === 'compat' ? stc : st
		add({ id: `d.${tag}.${L}`, group: 'd', note: `RESET, BS, TW, then margin-top: ${kw} in @layer ${L}`, sheets: [statement, S('RESET', RESET), S('BS', BS), S('TW', TW), S(`${L}:${kw}`, `@layer ${L} { .x { margin-top: ${kw} } }`)], ...mt })
	}

// d supplementary: the same rollback without BS (d2) and without TW (d3)
for (const [grp, core] of [['d2', [S('RESET', RESET), S('TW', TW)]], ['d3', [S('RESET', RESET), S('BS', BS)]]] as const)
	for (const L of ['reset', 'base', 'bootstrap', 'utilities', 'compat'])
		for (const [kw, tag] of [['revert-layer !important', 'rli'], ['revert-layer', 'rln']] as const) {
			const statement = L === 'compat' ? stc : st
			add({ id: `${grp}.${tag}.${L}`, group: grp, note: `${core.map((c) => c.label).join(', ')}, then margin-top: ${kw} in @layer ${L}`, sheets: [statement, ...core, S(`${L}:${kw}`, `@layer ${L} { .x { margin-top: ${kw} } }`)], ...mt })
		}

// e
const SPEC = '.card .x { margin-top: 20px }'
const e = { body: CARD, target: '.x', property: 'margin-top' }
add({ id: 'e.1', group: 'e', note: 'unlayered .card .x 20px then TW', sheets: [st, S('SPEC', SPEC), S('TW', TW)], ...e, expect: '20px' })
add({ id: 'e.1r', group: 'e', note: 'TW then unlayered .card .x 20px', sheets: [st, S('TW', TW), S('SPEC', SPEC)], ...e, expect: '20px' })
add({ id: 'e.2', group: 'e', note: 'unlayered .card .x 20px then BS', sheets: [st, S('SPEC', SPEC), S('BS', BS)], ...e, expect: '16px' })
add({ id: 'e.2r', group: 'e', note: 'BS then unlayered .card .x 20px', sheets: [st, S('BS', BS), S('SPEC', SPEC)], ...e, expect: '16px' })
add({ id: 'e.3', group: 'e', note: 'unlayered .card .x 20px then utilities!important 12px', sheets: [st, S('SPEC', SPEC), S('TW!(utilities)', TWI)], ...e, expect: '12px' })
add({ id: 'e.3r', group: 'e', note: 'utilities!important 12px then unlayered .card .x 20px', sheets: [st, S('TW!(utilities)', TWI), S('SPEC', SPEC)], ...e, expect: '12px' })

// f
const PF = '@layer base { * { margin: 0 } }'
const h1 = { body: '<h1>Heading</h1>', target: 'h1', property: 'margin-bottom' }
add({ id: 'f.0', group: 'f', note: 'h1 UA margin-bottom (statement only)', sheets: [st], ...h1 })
add({ id: 'f.1', group: 'f', note: 'base * margin 0, reset h1 margin-bottom 8px', sheets: [st, S('preflight(base)', PF), S('reboot(reset)', '@layer reset { h1 { margin-bottom: 8px } }')], ...h1, expect: '0px' })
add({ id: 'f.1r', group: 'f', note: 'reset h1 8px, then base * margin 0 (source order reversed)', sheets: [st, S('reboot(reset)', '@layer reset { h1 { margin-bottom: 8px } }'), S('preflight(base)', PF)], ...h1, expect: '0px' })
add({ id: 'f.2', group: 'f', note: 'base * margin 0, bootstrap h1 margin-bottom 8px', sheets: [st, S('preflight(base)', PF), S('reboot(bootstrap)', '@layer bootstrap { h1 { margin-bottom: 8px } }')], ...h1, expect: '8px' })
add({ id: 'f.2r', group: 'f', note: 'bootstrap h1 8px, then base * margin 0 (source order reversed)', sheets: [st, S('reboot(bootstrap)', '@layer bootstrap { h1 { margin-bottom: 8px } }'), S('preflight(base)', PF)], ...h1, expect: '8px' })

// g
const g = { body: '<div hidden class="d-flex"></div>', target: 'div', property: 'display' }
const HL = '@layer base { [hidden] { display: none !important } }'
const HU = '[hidden] { display: none !important }'
const DF = '.d-flex { display: flex !important }'
add({ id: 'g.1', group: 'g', note: 'layered base [hidden] none!important, then unlayered .d-flex flex!important', sheets: [st, S('[hidden](base)!', HL), S('.d-flex!', DF)], ...g, expect: 'none' })
add({ id: 'g.1r', group: 'g', note: 'unlayered .d-flex flex!important, then layered base [hidden] none!important', sheets: [st, S('.d-flex!', DF), S('[hidden](base)!', HL)], ...g, expect: 'none' })
add({ id: 'g.2', group: 'g', note: 'unlayered [hidden] none!important first, unlayered .d-flex flex!important second', sheets: [st, S('[hidden]!', HU), S('.d-flex!', DF)], ...g, expect: 'flex' })
add({ id: 'g.2r', group: 'g', note: 'unlayered .d-flex flex!important first, unlayered [hidden] none!important second', sheets: [st, S('.d-flex!', DF), S('[hidden]!', HU)], ...g, expect: 'none' })

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const version = browser.version()
const page = await browser.newPage()
const esc = (s: string) => s.replace(/</g, '\\3c ')
const results = []
for (const r of readings) {
	const html = `<!doctype html><html><head>${r.sheets.map((s) => `<style>${esc(s.css)}</style>`).join('')}</head><body>${r.body}</body></html>`
	await page.setContent(html)
	const value = await page.evaluate(([sel, prop]) => {
		const el = document.querySelector(sel)!
		const cs = getComputedStyle(el)
		const map: Record<string, string> = {}
		for (let i = 0; i < cs.length; i++) map[cs[i]] = cs.getPropertyValue(cs[i])
		if (!(prop in map)) throw new Error('longhand missing ' + prop)
		return map[prop]
	}, [r.target, r.property] as const)
	results.push({ ...r, value, matchesExpect: r.expect === undefined ? null : r.expect === value })
}
await browser.close()
writeFileSync(`${DIR}/output.json`, JSON.stringify({ chromium: version, statement: STATEMENT, statementCompat: STATEMENT_COMPAT, classSets, readings: results }, null, '\t'))
console.log(version, results.length)
for (const r of results) console.log(r.id.padEnd(24), r.value.padEnd(16), r.expect ?? '', r.matchesExpect === false ? 'MISMATCH' : '')
