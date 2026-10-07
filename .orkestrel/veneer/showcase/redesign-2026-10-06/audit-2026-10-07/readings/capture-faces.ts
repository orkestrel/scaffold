import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'
import { mkdirSync, writeFileSync } from 'node:fs'
// Usage: node capture-faces.ts OUT_DIR WIDTH THEME PAGE_HTML... — screenshots every showcase section under each face, with the spinner grow animation paused at its 50% keyframe and the page header unstuck during the section captures.
const [out, widthText, theme, ...pages] = process.argv.slice(2)
const width = Number(widthText)
const FACES = ['Bootstrap', 'Tailwind, no layer', 'Tailwind + layer']
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const summary: Record<string, unknown> = {}
for (const file of pages) {
	const name = file.split('/').pop()!.replace('.html', '')
	const context = await browser.newContext({ viewport: { width, height: 844 }, deviceScaleFactor: 1 })
	const page = await context.newPage()
	const errors: string[] = []
	page.on('pageerror', (error) => errors.push(String(error)))
	await page.goto(`file://${file}`)
	await page.waitForLoadState('load')
	await page.waitForTimeout(500)
	await page.addStyleTag({
		content:
			'.spinner-grow { animation-play-state: paused !important; animation-delay: calc(var(--bs-spinner-animation-speed, 0.75s) * -0.5) !important; }',
	})
	if (theme === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).first().click()
	for (const face of FACES) {
		await page.getByRole('button', { name: face, exact: true }).first().click()
		await page.waitForTimeout(800)
		const dir = `${out}/${name}/${theme}-${width}/${face.replace(/[^a-z]+/gi, '-').toLowerCase()}`
		mkdirSync(dir, { recursive: true })
		await page.evaluate(() => window.scrollTo(0, 0))
		await page.screenshot({ path: `${dir}/000-top.png` })
		const ids = await page.evaluate(() =>
			[...document.querySelectorAll('main section[id]')].map((section) => section.id),
		)
		// Playwright's disabled animations cancel an infinite animation to its scale(0) first frame and skip one whose playback rate is 0.
		await page.evaluate(() => {
			for (const spinner of document.querySelectorAll('.spinner-grow'))
				for (const animation of spinner.getAnimations()) {
					const { delay, duration } = animation.effect!.getComputedTiming()
					animation.currentTime = Number(delay) + Number(duration) / 2
					animation.playbackRate = 0
				}
		})
		// The sticky header paints over a section taller than the viewport; static keeps its place in the flow.
		await page.evaluate(() =>
			document.querySelector<HTMLElement>('body > div > header')?.style.setProperty('position', 'static', 'important'),
		)
		for (const [index, id] of ids.entries()) {
			const locator = page.locator(`section[id="${id}"]`)
			await locator.scrollIntoViewIfNeeded()
			await locator.screenshot({ path: `${dir}/${String(index + 1).padStart(3, '0')}-${id}.png`, animations: 'disabled' })
		}
		await page.evaluate(() => document.querySelector<HTMLElement>('body > div > header')?.style.removeProperty('position'))
		summary[`${name}/${face}`] = { sections: ids.length }
	}
	summary[`${name}/errors`] = errors
	await context.close()
}
await browser.close()
writeFileSync(`${out}/summary-${theme}-${width}.json`, JSON.stringify(summary, null, 2) + '\n')
console.log(JSON.stringify(summary))
