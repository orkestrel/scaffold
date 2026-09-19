import { chromium } from 'playwright'
import { resolveBrowser, resolvePinnedBrowser } from './configs/browsers.ts'
const provider = resolveBrowser(resolvePinnedBrowser(), process.platform, process.env)
const browser = await chromium.launch(provider.launchOptions)
try {
  const page = await browser.newPage()
  const result = await page.evaluate(async () => {
    const simple = document.createElement('button')
    document.body.append(simple)
    simple.animate([{ opacity: 0.2 }, { opacity: 1 }], { duration: 20 })
    await Promise.all(simple.getAnimations().map((animation) => animation.finished))
    const simpleRunning = simple.getAnimations().some((animation) => animation.playState === 'running')
    const chained = document.createElement('button')
    document.body.append(chained)
    const first = chained.animate([{ opacity: 0.2 }, { opacity: 1 }], { duration: 20 })
    first.finished.then(() => chained.animate([{ opacity: 0.2 }, { opacity: 1 }], { duration: 100 }))
    await Promise.all(chained.getAnimations().map((animation) => animation.finished))
    const chainedRunning = chained.getAnimations().some((animation) => animation.playState === 'running')
    await Promise.all(chained.getAnimations().map((animation) => animation.finished))
    const finalRunning = chained.getAnimations().some((animation) => animation.playState === 'running')
    return { simpleRunning, chainedRunning, finalRunning }
  })
  console.log(JSON.stringify(result))
} finally {
  await browser.close()
}
