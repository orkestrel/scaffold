import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'
import { readFileSync } from 'node:fs'
// Usage: node compose.ts OUT_PNG SECTION_FILE — places one section's capture under the three faces side by side with labels.
const [out, section] = process.argv.slice(2)
const root = '/tmp/claude-0/-home-user/4338f304-4fe6-5169-89e8-36562d885cad/scratchpad/faces/shots/1a0bd4c/light-390'
const faces = [['bootstrap', 'Bootstrap'], ['tailwind-no-layer', 'Tailwind, no layer'], ['tailwind-layer', 'Tailwind + layer']]
const cells = faces.map(([dir, label]) => `<figure style="margin:0 8px"><figcaption style="font:600 18px sans-serif;margin:0 0 8px">${label}</figcaption><img style="border:1px solid #bbb" src="data:image/png;base64,${readFileSync(`${root}/${dir}/${section}`).toString('base64')}"></figure>`).join('')
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const page = await browser.newPage({ viewport: { width: 1140, height: 800 } })
await page.setContent(`<body style="margin:12px;background:#fff;display:flex;align-items:flex-start">${cells}</body>`)
await page.screenshot({ path: out, fullPage: true })
await browser.close()
