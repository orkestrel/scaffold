import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
// Usage: node capture-copier.ts OUT_DIR PAGE_HTML — clicks the copy button under each face at light-1280 and dark-390, screenshots the controls, reads the clipboard, and composes one PNG.
const [out, file] = process.argv.slice(2)
const FACES = [['bootstrap', 'Bootstrap'], ['tailwind-no-layer', 'Tailwind, no layer'], ['tailwind-layer', 'Tailwind + layer']] as const
const VARIANTS = [['light', 1280], ['dark', 390]] as const
mkdirSync(out, { recursive: true })
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const log: Record<string, unknown> = {}
const cells: string[] = []
for (const [theme, width] of VARIANTS) {
	const context = await browser.newContext({ viewport: { width, height: 844 }, deviceScaleFactor: 1 })
	await context.grantPermissions(['clipboard-read', 'clipboard-write'])
	const page = await context.newPage()
	const errors: string[] = []
	page.on('pageerror', (error) => errors.push(String(error)))
	await page.goto(`file://${file}`)
	await page.waitForLoadState('load')
	await page.waitForTimeout(500)
	if (theme === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).first().click()
	for (const [dir, face] of FACES) {
		await page.getByRole('button', { name: face, exact: true }).first().click()
		await page.waitForTimeout(600)
		const section = page.locator('section[id="tailwindcss"]')
		await section.scrollIntoViewIfNeeded()
		const button = section.getByRole('button', { name: 'Copy recipe' })
		await button.scrollIntoViewIfNeeded()
		await page.evaluate(() => navigator.clipboard.writeText('unset'))
		const before = await section.getByRole('status', { name: 'Copy status' }).textContent().catch(() => null)
		await button.click()
		await page.waitForTimeout(400)
		const status = await section.locator('output[aria-label="Copy status"]').textContent()
		const clipboard = await page.evaluate(() => navigator.clipboard.readText())
		const recipe = await section.locator('#tailwindcss-recipe').evaluate((pre) => pre.textContent?.trim() ?? '')
		const box = await button.boundingBox()
		const pre = await section.locator('#tailwindcss-recipe').boundingBox()
		const clip = { x: Math.max(0, (box?.x ?? 0) - 16), y: (box?.y ?? 0) - 56, width: Math.min(width, 720), height: Math.min(300, (pre?.y ?? 0) + 140 - ((box?.y ?? 0) - 56)) }
		const path = `${out}/${theme}-${width}-${dir}.png`
		await page.screenshot({ path, clip })
		log[`${theme}-${width}/${face}`] = { before, status, clipboardMatchesRecipe: clipboard === recipe, clipboardLength: clipboard.length, recipeLength: recipe.length }
		cells.push(`<figure style="margin:0 8px 16px"><figcaption style="font:600 16px sans-serif;margin:0 0 6px">${theme} ${width} · ${face} · status "${status}" · clipboard ${clipboard === recipe ? 'matches the recipe' : 'differs'}</figcaption><img style="border:1px solid #bbb;max-width:100%" src="data:image/png;base64,${readFileSync(path).toString('base64')}"></figure>`)
	}
	log[`${theme}-${width}/errors`] = errors
	await context.close()
}
const page = await browser.newPage({ viewport: { width: 1500, height: 800 } })
await page.setContent(`<body style="margin:12px;background:#fff;display:flex;flex-wrap:wrap;align-items:flex-start">${cells.join('')}</body>`)
await page.screenshot({ path: `${out}/composite.png`, fullPage: true })
await browser.close()
writeFileSync(`${out}/log.json`, JSON.stringify(log, null, 2) + '\n')
console.log(JSON.stringify(log))
