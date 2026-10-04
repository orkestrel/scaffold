// Probe M6: reboot counters inside the bootstrap layer, class rules of the reboot region, and Tailwind inlining Bootstrap.
import { readFileSync, writeFileSync } from 'node:fs'
import { chromium } from 'playwright'

const S = '/home/user/veneer/tmp/probes/flip/sheets/'
const ORDER = '@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;'
const lifted = readFileSync(S + 'bootstrap-lifted.css', 'utf8')
const rebootReset = readFileSync(S + 'bootstrap-reboot-reset.css', 'utf8')
const flipped = readFileSync(S + 'tailwind-flipped.css', 'utf8')
const counterNormal = `@layer bootstrap { h1, h2, h3, h4, h5, h6 { font-size: revert-layer; font-weight: revert-layer; line-height: revert-layer; margin-bottom: revert-layer } p { margin-bottom: revert-layer } a { color: revert-layer; text-decoration: revert-layer } body { color: revert-layer } }`
const counterImportant = counterNormal.replaceAll('revert-layer;', 'revert-layer !important;').replace('revert-layer }', 'revert-layer !important }')
const consumer = `h1 { font-size: 48px } p { margin-bottom: 7px }`
const body = `<h1 id="h">Heading</h1><h1 id="hc" class="h1">Class heading</h1><div id="dc" class="h1">Div heading</div><p id="p">Para</p><a id="a" href="#">Link</a><span id="s" class="small">small</span><small id="sm">bare small</small><h5 id="mt" class="modal-title">Title</h5>`
const reads = [
  ['#h', 'font-size'], ['#h', 'font-weight'], ['#h', 'margin-bottom'], ['#hc', 'font-size'], ['#dc', 'font-size'], ['#p', 'margin-bottom'],
  ['#a', 'color'], ['#a', 'text-decoration-line'], ['#s', 'font-size'], ['#sm', 'font-size'], ['#mt', 'font-size'], ['#mt', 'font-weight'], ['body', 'color'],
] as const
const cases: Record<string, string[]> = {
  'A lifted alone': [ORDER, lifted],
  'C flipped + reboot in reset': [flipped, rebootReset],
  'N1 flipped + lifted + normal counter after': [flipped, lifted, counterNormal],
  'N2 flipped + normal counter before + lifted': [flipped, counterNormal, lifted],
  'I1 flipped + important counter before + lifted': [flipped, counterImportant, lifted],
  'N1c N1 + consumer unlayered after': [flipped, lifted, counterNormal, consumer],
  'I1c I1 + consumer unlayered after': [flipped, counterImportant, lifted, consumer],
  'Cc C + consumer unlayered after': [flipped, rebootReset, consumer],
  'N0 lifted + normal counter after, no Tailwind': [ORDER, lifted, counterNormal],
}
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
const out: Record<string, Record<string, string>> = {}
for (const [name, sheets] of Object.entries(cases)) {
  await page.setContent(`<!doctype html><html data-bs-theme="light"><head>${sheets.map((s) => `<style>${s}</style>`).join('')}</head><body>${body}</body></html>`)
  out[name] = await page.evaluate((reads) => Object.fromEntries(reads.map(([sel, prop]) => [`${sel} ${prop}`, getComputedStyle(document.querySelector(sel)!).getPropertyValue(prop)])), reads as unknown as string[][])
}
await browser.close()
writeFileSync('/home/user/veneer/tmp/probes/flip/m6-counter/output.json', JSON.stringify(out, null, 2))
const keys = reads.map(([s, p]) => `${s} ${p}`)
console.log('| case | ' + keys.join(' | ') + ' |')
for (const [name, row] of Object.entries(out)) console.log(`| ${name} | ` + keys.map((k) => row[k]).join(' | ') + ' |')
