import { readFileSync, writeFileSync } from 'node:fs'
import { chromium } from 'playwright'
const OUT = '/home/user/veneer/tmp/probes/flip/sheets'
const text = readFileSync(`${OUT}/bootstrap-lifted.css`, 'utf8')
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage()
const out = await page.evaluate((text) => {
	const flat = (s: CSSStyleSheet) => { const rows: any[] = []; const w = (l: CSSRuleList) => { for (const r of Array.from(l) as any[]) { if (r instanceof CSSStyleRule) rows.push({ sel: r.selectorText, len: r.style.length, text: r.style.cssText }); else if (r.cssRules) w(r.cssRules) } }; w(s.cssRules); return rows }
	const s1 = new CSSStyleSheet(); s1.replaceSync(text)
	const s2 = new CSSStyleSheet(); s2.replaceSync(Array.from(s1.cssRules, (r) => r.cssText).join('\n'))
	const a = flat(s1), b = flat(s2)
	const top = Array.from(s1.cssRules) as any[]
	return { mismatch: a.map((r, i) => ({ r, q: b[i] })).filter(({ r, q }) => r.sel !== q.sel || r.text !== q.text), top3: top[3].cssText, top6: top[6].cssText }
}, text)
await browser.close()
writeFileSync(`${OUT}/mismatch.json`, JSON.stringify(out, null, '\t') + '\n')
console.log(JSON.stringify(out, null, 1))
