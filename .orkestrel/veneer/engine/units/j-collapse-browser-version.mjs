import { chromium } from 'playwright'
const browser = await chromium.launch()
console.log(`chromium ${browser.version()} from ${chromium.executablePath()}`)
await browser.close()
