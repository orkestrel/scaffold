// Successor to probe.mjs: the root-token reading moves to a border with no overriding ancestor (the probe read an
// element under an alias override), every reading is asserted, and the island-override and plain-ancestor cases join.
// Runs in Chromium 141 over the TOKEN-PROOFS worktree's built cascade; exits 1 on the first failed assertion.
import { chromium } from '/home/user/veneer-tkp/node_modules/playwright/index.mjs'
import { readFileSync } from 'node:fs'
const css = readFileSync('/home/user/veneer-tkp/dist/src/styles/index.css', 'utf8')
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage()
await page.setContent(`<!doctype html><html><head><style>${css}</style></head><body>
<div class="border" id="bare">x</div>
<div style="--vn-border-width: 4px"><div class="border" id="tokenBelow">x</div></div>
<div data-bs-theme="dark" style="--vn-border-width: 4px"><div class="border" id="tokenScope">x</div></div>
<div style="--bs-border-width: 4px"><div class="border" id="aliasBelow">x</div></div>
<div data-bs-theme="dark"><div data-bs-theme="light" id="nested">x</div></div>
<div data-bs-theme="dark" style="--bs-border-radius: 20px"><div data-bs-theme="light" id="nestedAncestor">x</div></div>
<div data-bs-theme="dark"><div data-bs-theme="light" id="nestedSelf" style="--bs-border-radius: 20px">x</div></div>
<div style="--vn-state-stripe: 17%"><div data-bs-theme="light" id="stripeBelow">x</div></div>
<div data-bs-theme="dark" id="stripeDefault">x</div>
</body></html>`)
const r = await page.evaluate(() => {
  const w = (id) => getComputedStyle(document.getElementById(id)).borderTopWidth
  const v = (id, p) => getComputedStyle(document.getElementById(id)).getPropertyValue(p).trim()
  const root = (p) => getComputedStyle(document.documentElement).getPropertyValue(p).trim()
  const out = { bareBefore: w('bare'), tokenBelow: w('tokenBelow'), tokenScope: w('tokenScope'), aliasBelow: w('aliasBelow'),
    rootRadius: root('--bs-border-radius'), nested: v('nested', '--bs-border-radius'),
    nestedAncestor: v('nestedAncestor', '--bs-border-radius'), nestedSelf: v('nestedSelf', '--bs-border-radius'),
    rootStripe: root('--vn-state-stripe'), stripeDefault: v('stripeDefault', '--vn-state-stripe'),
    stripeBelow: v('stripeBelow', '--vn-state-stripe') }
  document.documentElement.style.setProperty('--vn-border-width', '4px')
  out.bareAfterRoot = w('bare')
  out.tokenScopeAfterRoot = w('tokenScope')
  return out
})
await browser.close()
console.log(JSON.stringify(r))
const expect = { bareBefore: '1px', tokenBelow: '1px', tokenScope: '1px', aliasBelow: '4px', bareAfterRoot: '4px',
  tokenScopeAfterRoot: '4px', nestedAncestor: '20px', nestedSelf: '20px', stripeDefault: r.rootStripe, stripeBelow: '5%' }
let failed = 0
for (const [k, want] of Object.entries(expect)) { const ok = r[k] === want; if (!ok) failed++; console.log(`${ok ? 'ok  ' : 'FAIL'} ${k} = ${r[k]} (want ${want})`) }
console.log(`nested reads the root value: ${r.nested === r.rootRadius}`)
if (r.nested !== r.rootRadius) failed++
process.exit(failed ? 1 : 0)
