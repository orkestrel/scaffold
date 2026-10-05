const { chromium } = require('/home/user/veneer/node_modules/playwright-core')
;(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' })
  try {
    const page = await browser.newPage()
    const out = await page.evaluate(() => {
      const read = (css) => {
        document.body.innerHTML = '<style>' + css + '</style><table><tbody><tr><td><span>Harbor</span></td></tr></tbody></table>'
        const q = (s) => getComputedStyle(document.querySelector(s))
        return { css, table: q('table').verticalAlign, tbody: q('tbody').verticalAlign, tr: q('tr').verticalAlign, td: q('td').verticalAlign, spanWrap: q('span').textWrapMode }
      }
      const parent = document.createElement('div'); parent.style.userSelect = 'none'; const child = document.createElement('span'); parent.append(child); document.body.append(parent)
      const us = getComputedStyle(child).userSelect
      const o = document.createElement('div'); o.style.overflowY = 'clip'; o.style.overflowX = 'auto'; document.body.append(o)
      const clip = { x: getComputedStyle(o).overflowX, y: getComputedStyle(o).overflowY }
      return { version: navigator.userAgent, rows: [read(''), read('table { white-space: nowrap; vertical-align: middle }'), read('table { vertical-align: top }'), read('.t > tbody { vertical-align: inherit } table { vertical-align: top }')], childUserSelectUnderNone: us, clipCoupling: clip, enumeratesUserSelect: Array.from(getComputedStyle(document.body)).includes('user-select') }
    })
    console.log(JSON.stringify(out, null, 1))
  } finally { await browser.close() }
})().catch((e) => { console.error(e); process.exit(1) })
