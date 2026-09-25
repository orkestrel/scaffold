// Reads, in Chromium over the TOKEN-PROOFS worktree's built cascade, the three reach facts the round-7 sweep ruled:
// the stripe declared in each mode scope, a dropped alias inherited through an intermediate override, and the border
// width retuned below the root through the token and through the alias.
import { chromium } from '/home/user/veneer-tkp/node_modules/playwright/index.mjs'
import { readFileSync } from 'node:fs'
const css = readFileSync('/home/user/veneer-tkp/dist/src/styles/index.css', 'utf8')
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage()
await page.setContent(`<!doctype html><html><head><style>${css}</style></head><body>
<div id="plain" style="--vn-border-width: 4px"><div class="border" id="b1">x</div></div>
<div id="alias" style="--bs-border-width: 4px"><div class="border" id="b2">x</div></div>
<div data-bs-theme="dark" style="--bs-border-radius: 20px"><div data-bs-theme="light" id="island">x</div></div>
<div id="stripeRoot"><div data-bs-theme="light" id="stripeIsland">x</div></div>
</body></html>`)
const read = await page.evaluate(() => {
  const cs = (id, p) => getComputedStyle(document.getElementById(id)).getPropertyValue(p).trim()
  const out = {}
  out.tokenBelowRoot = getComputedStyle(document.getElementById('b1')).borderTopWidth
  out.aliasBelowRoot = getComputedStyle(document.getElementById('b2')).borderTopWidth
  out.islandRadius = cs('island', '--bs-border-radius')
  out.rootRadius = getComputedStyle(document.documentElement).getPropertyValue('--bs-border-radius').trim()
  document.documentElement.style.setProperty('--vn-state-stripe', '17%')
  out.rootStripe = getComputedStyle(document.documentElement).getPropertyValue('--vn-state-stripe').trim()
  out.islandStripe = cs('stripeIsland', '--vn-state-stripe')
  document.documentElement.style.setProperty('--vn-border-width', '4px')
  out.tokenOnRoot = getComputedStyle(document.getElementById('b1').parentElement.nextElementSibling.firstElementChild).borderTopWidth
  return out
})
console.log(JSON.stringify(read, null, 1))
await browser.close()
