// Probe: can a rendered proof judge "no elements-layer rule styles a tag by its position" without a
// selector grammar? For every styled tag, compare the set of elements-layer rules the browser's own
// selector engine matches on it alone, nested inside each other tag, and after each other tag as a
// sibling. A differing set outside the mandated pairs is a positional rule. Also plant one
// contextual rule (`p:not(h1 + p)`) the retired grammar accepted, and confirm the reading catches it.
import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'
import { readFileSync } from 'node:fs'
const css = readFileSync(process.argv[2], 'utf8')
const plant = process.argv[3] === 'plant' ? '@layer elements { p:not(h1 + p) { margin: 0 } }' : ''
const tags = ['a','abbr','address','b','blockquote','button','code','details','summary','dl','dt','dd','fieldset','legend','figure','figcaption','h1','h2','h3','h4','h5','h6','hr','iframe','img','input','kbd','label','mark','ol','ul','li','optgroup','option','output','p','pre','progress','samp','select','small','strong','sub','sup','svg','table','caption','thead','tbody','tfoot','tr','td','th','colgroup','textarea','var']
const mandated = [['details','summary'],['dl','dt'],['dl','dd'],['fieldset','legend'],['figure','figcaption'],['ol','li'],['optgroup','option'],['select','option'],['table','caption'],['table','colgroup'],['table','tbody'],['table','tfoot'],['table','thead'],['tr','td'],['tr','th'],['ul','li']]
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', headless: true })
const page = await browser.newPage()
await page.setContent(`<!doctype html><html><head><style>${css}${plant}</style></head><body></body></html>`)
const started = Date.now()
const result = await page.evaluate(({ tags, mandated }) => {
  const rules = []
  const walk = (list) => { for (const rule of list) { if (rule instanceof CSSLayerBlockRule) { if (rule.name === 'elements') collect(rule.cssRules); else walk(rule.cssRules) } else if (rule.cssRules) walk(rule.cssRules) } }
  const collect = (list) => { for (const rule of list) { if (rule instanceof CSSStyleRule) rules.push(rule.selectorText); else if (rule.cssRules) collect(rule.cssRules) } }
  walk(document.styleSheets[0].cssRules)
  const unusable = []
  const usable = rules.filter((s) => { try { document.body.matches(s); return true } catch { unusable.push(s); return false } })
  const matching = (el) => usable.filter((s) => el.matches(s)).join('\n')
  const make = (tag) => document.createElement(tag)
  const host = document.createElement('div'); document.body.append(host)
  const alone = {}
  for (const inner of tags) { host.replaceChildren(); const el = make(inner); host.append(el); alone[inner] = matching(el) }
  const findings = []
  for (const outer of tags) for (const inner of tags) {
    if (outer === inner) continue
    host.replaceChildren(); const o = make(outer); const i = make(inner); o.append(i); host.append(o)
    const nested = matching(i)
    if (nested !== alone[inner] && !mandated.some(([m, h]) => m === outer && h === inner)) findings.push(`${outer} > ${inner}`)
    host.replaceChildren(); const s = make(outer); const j = make(inner); host.append(s, j)
    const sibling = matching(j)
    if (sibling !== alone[inner]) findings.push(`${outer} + ${inner}`)
  }
  return { rules: rules.length, usable: usable.length, unusable, findings }
}, { tags, mandated })
await browser.close()
console.log(JSON.stringify({ plant: plant !== '', elapsedMs: Date.now() - started, ...result }, null, 1))
