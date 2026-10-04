import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { compileString } from 'sass'
import { chromium } from 'playwright'

const OUT = '/home/user/veneer/tmp/probes/flip/sheets'
const read = (name: string) => readFileSync(resolve(OUT, name), 'utf8')
const lifted = read('bootstrap-lifted.css')
const full = compileString(readFileSync('/home/user/veneer/src/bootstrap/index.scss', 'utf8'), { loadPaths: ['/home/user/veneer/src/bootstrap'], style: 'expanded' }).css
const a = lifted.split('\n'), b = full.split('\n')
const lineDiff: unknown[] = []
for (let i = 0; i < Math.max(a.length, b.length); i++) if (a[i] !== b[i]) { lineDiff.push({ line: i + 1, lifted: a[i], fullCompile: b[i] }); if (lineDiff.length > 10) break }

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage()
await page.setContent('<!doctype html><html><body></body></html>')
const files = ['bootstrap-lifted.css', 'bootstrap-without-reboot.css', 'bootstrap-reboot-reset.css', 'bootstrap-lifted-minus-shared.css', 'bootstrap-reboot-reset-minus-shared.css', 'bootstrap-lifted-cssom.css', 'bootstrap-reboot-reset-cssom.css']
const texts = Object.fromEntries(files.map((f) => [f, read(f)]))
const out = await page.evaluate((texts) => {
	const flatten = (sheet: CSSStyleSheet) => {
		const rows: { ctx: string; sel: string; len: number; text: string }[] = []
		const walk = (list: CSSRuleList, ctx: string) => {
			for (const r of Array.from(list) as any[]) {
				if (r instanceof CSSStyleRule) rows.push({ ctx, sel: r.selectorText, len: r.style.length, text: r.style.cssText })
				else if (r instanceof CSSLayerBlockRule) walk(r.cssRules, ctx + ' > @layer ' + r.name)
				else if (r instanceof CSSMediaRule) walk(r.cssRules, ctx + ' > @media ' + r.conditionText)
				else if (r instanceof CSSSupportsRule) walk(r.cssRules, ctx + ' > @supports ' + r.conditionText)
				else if (r instanceof CSSGroupingRule) walk(r.cssRules, ctx + ' > ' + r.constructor.name)
			}
		}
		walk(sheet.cssRules, '')
		return rows
	}
	const parse = (t: string) => { const s = new CSSStyleSheet(); s.replaceSync(t); return s }
	const result: Record<string, unknown> = {}
	for (const [name, text] of Object.entries(texts as Record<string, string>)) {
		const s1 = parse(text)
		const ser1 = Array.from(s1.cssRules, (r) => r.cssText).join('\n')
		const s2 = parse(ser1)
		const ser2 = Array.from(s2.cssRules, (r) => r.cssText).join('\n')
		const r1 = flatten(s1), r2 = flatten(s2)
		const longhands1 = r1.reduce((n, r) => n + r.len, 0), longhands2 = r2.reduce((n, r) => n + r.len, 0)
		let ruleMismatch = 0
		for (let i = 0; i < Math.min(r1.length, r2.length); i++) if (r1[i].sel !== r2[i].sel || r1[i].text !== r2[i].text) ruleMismatch++
		result[name] = { styleRules: r1.length, longhands: longhands1, reparsedStyleRules: r2.length, reparsedLonghands: longhands2, ruleMismatch, serializationIdempotent: ser1 === ser2 }
	}
	// top-level map of the lifted sheet's first 10 rules
	const lifted = parse((texts as any)['bootstrap-lifted.css'])
	result.liftedTop = Array.from(lifted.cssRules).slice(0, 10).map((r: any, i) => ({ i, kind: r.constructor.name, name: r.name ?? null, children: r.cssRules ? r.cssRules.length : null, first: r.cssRules ? (r.cssRules[0] as any)?.selectorText ?? r.cssRules[0]?.constructor.name : r.selectorText, last: r.cssRules ? (r.cssRules[r.cssRules.length - 1] as any)?.selectorText ?? r.cssRules[r.cssRules.length - 1]?.constructor.name : r.selectorText }))
	const rr = parse((texts as any)['bootstrap-reboot-reset.css'])
	result.rebootResetTop = Array.from(rr.cssRules).slice(0, 5).map((r: any, i) => ({ i, kind: r.constructor.name, name: r.name ?? null, children: r.cssRules ? r.cssRules.length : null, first: r.cssRules ? (r.cssRules[0] as any)?.selectorText ?? r.cssRules[0]?.constructor.name : r.selectorText }))
	const wr = parse((texts as any)['bootstrap-without-reboot.css'])
	result.withoutTop = Array.from(wr.cssRules).slice(0, 5).map((r: any, i) => ({ i, kind: r.constructor.name, name: r.name ?? null, children: r.cssRules ? r.cssRules.length : null, first: r.cssRules ? (r.cssRules[0] as any)?.selectorText ?? r.cssRules[0]?.constructor.name : r.selectorText }))
	// the 7 in-layer exact shared-name rules
	const names = ['bg-black', 'bg-transparent', 'bg-white', 'border-black', 'border-white', 'text-black', 'text-white']
	result.inLayerDuplicates = flatten(lifted).filter((r) => names.some((n) => r.sel === '.' + n)).map((r) => ({ ctx: r.ctx, sel: r.sel, text: r.text }))
	return result
}, texts)
await browser.close()
const result = { lineDiffLiftedVsFullCompile: lineDiff, ...out }
writeFileSync(resolve(OUT, 'checks.json'), JSON.stringify(result, null, '\t') + '\n')
console.log(JSON.stringify(result, null, 1))
