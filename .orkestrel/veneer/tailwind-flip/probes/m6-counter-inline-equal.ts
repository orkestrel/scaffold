// Probe M6c: does Tailwind's inlining of the lifted Bootstrap sheet keep every rule, declaration, priority, and layer context?
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { compile } from 'tailwindcss'
import { chromium } from 'playwright'
const S = '/home/user/veneer/tmp/probes/flip/sheets/'
const ORDER = '@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;'
const exclusion = readFileSync(S + 'tailwind-flipped.input.css', 'utf8').split('\n')[2]
const root = '/home/user/veneer/node_modules/tailwindcss/'
const compiler = await compile(`${ORDER}\n@import 'tailwindcss';\n@import 'bootstrap.css';\n${exclusion}`, {
  base: S,
  loadStylesheet: async (id, base) => {
    const path = id === 'tailwindcss' ? root + 'index.css' : id.startsWith('tailwindcss/') ? root + id.slice('tailwindcss/'.length) : id === 'bootstrap.css' ? S + 'bootstrap-lifted.css' : resolve(base, id)
    return { path, base: dirname(path), content: readFileSync(path, 'utf8') }
  },
})
const inlined = compiler.build([])
writeFileSync('/home/user/veneer/tmp/probes/flip/m6-counter/inlined-nocandidates.css', inlined)
const lifted = readFileSync(S + 'bootstrap-lifted.css', 'utf8')
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage()
await page.setContent('<!doctype html><html><body></body></html>')
const flatten = (text: string, dropTailwind: boolean) => page.evaluate(([text, dropTailwind]) => {
  const sheet = new CSSStyleSheet(); sheet.replaceSync(text as string)
  const rows: string[] = []
  const walk = (rules: CSSRuleList, ctx: string) => {
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSLayerBlockRule) { if (dropTailwind && ctx === '' && ['theme', 'base', 'utilities', 'components', 'properties'].includes(rule.name)) continue; walk(rule.cssRules, ctx + '@layer ' + rule.name + ' > ') }
      else if (rule instanceof CSSMediaRule) walk(rule.cssRules, ctx + '@media ' + rule.conditionText + ' > ')
      else if (rule instanceof CSSSupportsRule) walk(rule.cssRules, ctx + '@supports ' + rule.conditionText + ' > ')
      else if (rule instanceof CSSStyleRule) { for (const prop of Array.from(rule.style)) rows.push(`${ctx}${rule.selectorText} | ${prop} | ${rule.style.getPropertyValue(prop)} | ${rule.style.getPropertyPriority(prop)}`); for (const sub of Array.from(rule.cssRules ?? [])) if (sub instanceof CSSStyleRule) for (const prop of Array.from(sub.style)) rows.push(`${ctx}${rule.selectorText} >> ${sub.selectorText} | ${prop} | ${sub.style.getPropertyValue(prop)} | ${sub.style.getPropertyPriority(prop)}`) }
      else if (rule instanceof CSSKeyframesRule) rows.push(`${ctx}@keyframes ${rule.name} | ${rule.cssRules.length} frames`)
      else if (rule instanceof CSSLayerStatementRule) rows.push(`${ctx}@layer statement ${rule.nameList.join(',')}`)
      else rows.push(`${ctx}${rule.constructor.name} ${rule.cssText.slice(0, 60)}`)
    }
  }
  walk(sheet.cssRules, '')
  return rows
}, [text, dropTailwind] as const)
const a = await flatten(lifted, false)
const b = await flatten(inlined, true)
await browser.close()
const onlyA = a.filter((r) => !b.includes(r)); const onlyB = b.filter((r) => !a.includes(r))
console.log('lifted rows', a.length, 'inlined rows (Tailwind layers dropped)', b.length, 'sequence equal', JSON.stringify(a) === JSON.stringify(b))
console.log('only in lifted', onlyA.length, onlyA.slice(0, 8)); console.log('only in inlined', onlyB.length, onlyB.slice(0, 12))
console.log('inlined head', inlined.slice(0, 300).replace(/\n/g, '⏎'))
