// Reads computed outline and border widths whose style paints no line on this host's Chromium.
import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage()
console.log('version', browser.version())
await page.setContent(`<button id="b" style="outline-style:none;outline-width:3px;border-top-style:none;border-top-width:4px;border-left-style:hidden;border-left-width:2px;border-right-style:solid;border-right-width:5px">x</button><a id="a" href="#">y</a>`)
const read = await page.evaluate(() => {
  const pick = (el) => { const s = getComputedStyle(el); return Object.fromEntries(['outline-style','outline-width','border-top-style','border-top-width','border-left-style','border-left-width','border-right-style','border-right-width'].map((p) => [p, s.getPropertyValue(p)])) }
  return { button: pick(document.getElementById('b')), anchor: pick(document.getElementById('a')) }
})
console.log(JSON.stringify(read, null, 1))
const planted = read.button['outline-width'] === '0px' && read.button['border-top-width'] === '0px' && read.button['border-left-width'] === '0px' && read.button['border-right-width'] === '5px'
console.log('assert: none/hidden widths compute 0px, solid keeps 5px:', planted)
await browser.close()
process.exit(planted ? 0 : 1)
