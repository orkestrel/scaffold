import { readFileSync, writeFileSync } from 'node:fs'
import { chromium } from 'playwright'

const ROOT = '/home/user/veneer'
const S = `${ROOT}/tmp/probes/flip/sheets`
const OUT = `${ROOT}/tmp/probes/flip/verify`
const read = (n: string) => readFileSync(`${S}/${n}`, 'utf8')

// Independent flatten: every string leaf, recursively, per category.
const core = await import(`${ROOT}/dist/src/core/index.js`)
const cats: Record<string, Set<string>> = {}
const walk = (v: unknown, into: Set<string>, path: string[], odd: string[]) => {
	if (typeof v === 'string') { into.add(v); return }
	if (Array.isArray(v)) odd.push(path.join('.') + ':array')
	if (v && typeof v === 'object') for (const [k, c] of Object.entries(v)) walk(c, into, [...path, k], odd)
	else odd.push(path.join('.') + ':' + typeof v)
}
const odd: string[] = []
for (const [k, v] of Object.entries(core.CLASS_NAMES.bootstrap)) { cats[k] = new Set(); walk(v, cats[k], [k], odd) }
const all = new Set(Object.values(cats).flatMap((s) => [...s]))
const comparison = JSON.parse(readFileSync(`${ROOT}/tests/fixtures/tailwindcss/comparison.json`, 'utf8'))
const shared: string[] = comparison.shared
const su = shared.filter((n) => cats.utilities.has(n)).sort()
const sc = shared.filter((n) => cats.components.has(n)).sort()
const inMultiple = [...all].filter((n) => Object.values(cats).filter((s) => s.has(n)).length > 1)
if (su.length !== 192 || sc.length !== 17) throw new Error('sizes')
const input = read('tailwind-flipped.input.css').split('\n')
const excluded = input[2].match(/^@source not inline\("(.*)"\);$/)![1].split(' ')
const expectedExcluded = [...all].filter((n) => !su.includes(n))
const exclusion = {
	lines: input.length,
	line1: input[0], line2: input[1],
	count: excluded.length,
	distinct: new Set(excluded).size,
	equalsAllMinusSharedUtilities: excluded.length === expectedExcluded.length && expectedExcluded.every((n) => excluded.includes(n)),
	containsSharedUtility: excluded.filter((n) => su.includes(n)),
	containsAllSharedComponents: sc.every((n) => excluded.includes(n)),
}

const exe = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
let browser
let defaultLaunch = 'ok'
try { browser = await chromium.launch() } catch (e) { defaultLaunch = String((e as Error).message).split('\n')[0]; browser = await chromium.launch({ executablePath: exe }) }
const version = browser.version()
const page = await browser.newPage()
await page.setContent('<!doctype html><html><body><div id="probe"></div></body></html>')

const result = await page.evaluate(({ texts, su, excluded }) => {
	const parse = (t: string) => { const s = new CSSStyleSheet(); s.replaceSync(t); return s }
	type Row = { ctx: string; top: number; sel: string; text: string; rule: CSSStyleRule }
	const flat = (s: CSSStyleSheet) => {
		const rows: Row[] = []
		const other: string[] = []
		const w = (list: CSSRuleList, ctx: string, top: number) => {
			Array.from(list).forEach((r: any, i) => {
				const t = top < 0 ? i : top
				if (r instanceof CSSStyleRule) {
					rows.push({ ctx, top: t, sel: r.selectorText, text: r.style.cssText, rule: r })
					if (r.cssRules && r.cssRules.length) w(r.cssRules, ctx + ' > ' + r.selectorText, t)
				} else if (r.cssRules) {
					const label = r instanceof CSSLayerBlockRule ? '@layer ' + r.name : r instanceof CSSMediaRule ? '@media ' + r.conditionText : r instanceof CSSSupportsRule ? '@supports ' + r.conditionText : r.constructor.name + (r.name ? ' ' + r.name : '')
					if (r instanceof CSSKeyframesRule) { other.push(ctx + '|' + r.cssText); return }
					w(r.cssRules, ctx + ' > ' + label, t)
				} else other.push(ctx + '|' + r.constructor.name + '|' + (r instanceof CSSLayerStatementRule ? r.cssText : ''))
			})
		}
		w(s.cssRules, '', -1)
		return { rows, other }
	}
	const exact = new Set(su.map((n: string) => '.' + CSS.escape(n)))
	const tokenRe = (n: string) => new RegExp('\\.' + CSS.escape(n).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![-_a-zA-Z0-9\\\\])')
	const res: Record<string, unknown> = {}
	// C: deletion
	const lifted = flat(parse(texts['bootstrap-lifted.css']))
	const exactRows = lifted.rows.filter((r) => exact.has(r.sel))
	const ctxTally: Record<string, number> = {}
	for (const r of exactRows) ctxTally[r.ctx || 'top'] = (ctxTally[r.ctx || 'top'] ?? 0) + 1
	const loose: Record<string, string[]> = {}
	for (const n of su) {
		const re = tokenRe(n)
		const hits = lifted.rows.filter((r) => !exact.has(r.sel) && re.test(r.sel)).map((r) => `${r.ctx || 'top'} | ${r.sel}`)
		if (hits.length) loose[n] = hits
	}
	const key = (r: Row) => `${r.ctx}|${r.sel}|${r.text}`
	const multiset = (rows: Row[]) => { const m = new Map<string, number>(); for (const r of rows) m.set(key(r), (m.get(key(r)) ?? 0) + 1); return m }
	const diff = (a: Map<string, number>, b: Map<string, number>) => {
		const onlyA: string[] = [], onlyB: string[] = []
		for (const [k, v] of a) { const d = v - (b.get(k) ?? 0); for (let i = 0; i < d; i++) onlyA.push(k) }
		for (const [k, v] of b) { const d = v - (a.get(k) ?? 0); for (let i = 0; i < d; i++) onlyB.push(k) }
		return { onlyA, onlyB }
	}
	const deletion: Record<string, unknown> = {}
	for (const [src, out] of [['bootstrap-lifted.css', 'bootstrap-lifted-minus-shared.css'], ['bootstrap-lifted.css', 'bootstrap-lifted-minus-shared.text.css'], ['bootstrap-reboot-reset.css', 'bootstrap-reboot-reset-minus-shared.css'], ['bootstrap-reboot-reset.css', 'bootstrap-reboot-reset-minus-shared.text.css']]) {
		const a = flat(parse(texts[src]))
		const b = flat(parse(texts[out]))
		const expected = a.rows.filter((r) => !exact.has(r.sel))
		const d = diff(multiset(expected), multiset(b.rows))
		deletion[out] = {
			sourceStyleRules: a.rows.length,
			sourceExactMatches: a.rows.length - expected.length,
			outStyleRules: b.rows.length,
			exactRemaining: b.rows.filter((r) => exact.has(r.sel)).length,
			expectedMinusOut: d.onlyA,
			outMinusExpected: d.onlyB,
			otherRulesEqual: JSON.stringify(a.other) === JSON.stringify(b.other),
			otherCounts: [a.other.length, b.other.length],
		}
	}
	res.deletion = { exactCount: exactRows.length, ctxTally, looseSurvivorNames: Object.keys(loose).length, looseSurvivorRules: Object.values(loose).reduce((n, v) => n + v.length, 0), loose, deletion }
	// D: reboot split, declaration multiset
	const decls = (rows: Row[]) => {
		const out: string[] = []
		for (const r of rows) {
			const media = r.ctx.split(' > ').filter((p) => p.startsWith('@media')).join(' > ')
			for (let i = 0; i < r.rule.style.length; i++) { const p = r.rule.style[i]; out.push(`${media}|${r.sel}|${p}|${r.rule.style.getPropertyValue(p)}|${r.rule.style.getPropertyPriority(p)}`) }
		}
		return out.sort()
	}
	const rr = flat(parse(texts['bootstrap-reboot-reset.css']))
	const wo = flat(parse(texts['bootstrap-without-reboot.css']))
	const liftedRegion = lifted.rows.filter((r) => r.top >= 2 && r.top <= 6)
	const liftedRest = lifted.rows.filter((r) => r.top < 2 || r.top > 6)
	const rrRegion = rr.rows.filter((r) => r.top === 1)
	const rrRest = rr.rows.filter((r) => r.top !== 1)
	const cmp = (a: string[], b: string[]) => { const ma = new Map<string, number>(); for (const x of a) ma.set(x, (ma.get(x) ?? 0) + 1); for (const x of b) ma.set(x, (ma.get(x) ?? 0) - 1); return [...ma].filter(([, v]) => v !== 0) }
	const stripLayer = (rows: Row[]) => rows.map((r) => ({ ...r, ctx: '' }))
	res.reboot = {
		liftedRegionRules: liftedRegion.length, rrRegionRules: rrRegion.length,
		liftedRegionDecls: decls(liftedRegion).length, rrRegionDecls: decls(rrRegion).length,
		regionDeclDiff: cmp(decls(liftedRegion), decls(rrRegion)),
		liftedRestVsWithout: cmp(decls(liftedRest), decls(wo.rows)).length,
		rrRestVsWithout: cmp(decls(rrRest), decls(wo.rows)).length,
		liftedRestCtxVsWithout: diff(multiset(liftedRest), multiset(wo.rows)).onlyA.length + diff(multiset(liftedRest), multiset(wo.rows)).onlyB.length,
		rrRestCtxVsWithout: diff(multiset(rrRest), multiset(wo.rows)).onlyA.length + diff(multiset(rrRest), multiset(wo.rows)).onlyB.length,
		liftedRegionSelectorsInOrder: liftedRegion.map((r) => r.sel).join('\n') === rrRegion.map((r) => r.sel).join('\n'),
		liftedRegionOrderDiff: liftedRegion.map((r, i) => [i, r.sel, rrRegion[i]?.sel]).filter(([, a, b]) => a !== b).slice(0, 6),
		liftedTop3: (parse(texts['bootstrap-lifted.css']).cssRules[3] as CSSStyleRule).cssText,
		liftedTop6: (parse(texts['bootstrap-lifted.css']).cssRules[6] as CSSStyleRule).cssText,
		rrRegionImportant: decls(rrRegion).filter((d) => d.endsWith('|important')),
	}
	// B: flipped class tokens vs exclusion
	const tw = flat(parse(texts['tailwind-flipped.css']))
	const tokens = new Set<string>()
	for (const r of tw.rows) for (const m of r.sel.matchAll(/\.((?:\\.|[A-Za-z0-9_-])+)/g)) tokens.add(m[1].replace(/\\(.)/g, '$1'))
	res.tailwind = { tokens: tokens.size, excludedPresent: excluded.filter((n: string) => tokens.has(n)), sharedUtilitiesPresent: su.filter((n: string) => tokens.has(n)).length, outsideShared: [...tokens].filter((t) => !su.includes(t)).sort() }
	// E: shorthand check of the enumeration
	const el = document.getElementById('probe')!
	const names = Array.from(getComputedStyle(el)).filter((n) => !n.startsWith('--'))
	const shorthands: string[] = []
	for (const n of names) { const d = document.createElement('div'); d.style.setProperty(n, 'inherit'); if (d.style.length > 1) shorthands.push(n + ':' + d.style.length) }
	res.enumeration = { size: names.length, shorthands, hasRowRuleColor: names.includes('row-rule-color') }
	return res
}, { texts: Object.fromEntries(['bootstrap-lifted.css', 'bootstrap-reboot-reset.css', 'bootstrap-without-reboot.css', 'bootstrap-lifted-minus-shared.css', 'bootstrap-lifted-minus-shared.text.css', 'bootstrap-reboot-reset-minus-shared.css', 'bootstrap-reboot-reset-minus-shared.text.css', 'tailwind-flipped.css'].map((n) => [n, read(n)])), su, excluded })
await browser.close()
const out = { chromium: version, defaultLaunch, categories: Object.fromEntries(Object.entries(cats).map(([k, v]) => [k, v.size])), all: all.size, oddNodes: odd, inMultipleCategories: inMultiple, shared: shared.length, sharedUtilities: su.length, sharedComponents: sc, exclusion, ...result }
writeFileSync(`${OUT}/sheets-check.json`, JSON.stringify(out, null, '\t') + '\n')
console.log(JSON.stringify(out, (k, v) => (k === 'loose' ? Object.keys(v).length : v), 1).slice(0, 6000))
