import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
console.log(browser.version())
await browser.close()
