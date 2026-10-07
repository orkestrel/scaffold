import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'
// Usage: node probe-faces.ts OUT_DIR WIDTH PAGE_HTML... — reads scroll and header geometry per face, and screenshots the top.
const [out, widthText, ...pages] = process.argv.slice(2)
const width = Number(widthText)
const FACES = ['Bootstrap', 'Tailwind, no layer', 'Tailwind + layer']
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
for (const file of pages) {
	const name = file.split('/').pop()!.replace('.html', '')
	const page = await browser.newPage({ viewport: { width, height: 844 } })
	await page.goto(`file://${file}`)
	await page.waitForTimeout(800)
	for (const face of FACES) {
		const before = await page.evaluate(() => ({ scrollY: window.scrollY }))
		await page.getByRole('button', { name: face, exact: true }).first().click()
		await page.waitForTimeout(800)
		const after = await page.evaluate(() => window.scrollY)
		await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
		await page.waitForTimeout(300)
		const reading = await page.evaluate(() => {
			const header = document.querySelector('header')
			const box = header?.getBoundingClientRect()
			const style = header ? getComputedStyle(header) : undefined
			const html = getComputedStyle(document.documentElement)
			const body = getComputedStyle(document.body)
			return {
				scrollY: window.scrollY,
				scrollHeight: document.documentElement.scrollHeight,
				header: box && { top: box.top, height: box.height, width: box.width, position: style!.position, visibility: style!.visibility, display: style!.display, opacity: style!.opacity, background: style!.backgroundColor, zIndex: style!.zIndex },
				html: { overflow: html.overflow, height: html.height, fontSize: html.fontSize, fontFamily: html.fontFamily.slice(0, 60), background: html.backgroundColor },
				body: { overflow: body.overflow, height: body.height, margin: body.margin, fontFamily: body.fontFamily.slice(0, 60), fontSize: body.fontSize, lineHeight: body.lineHeight, color: body.color, background: body.backgroundColor },
				sheets: [...document.querySelectorAll('style[id], link[rel=stylesheet]')].map((n) => n.id || n.getAttribute('href')),
			}
		})
		console.log(name, face, 'scroll before', before.scrollY, 'after click', after, JSON.stringify(reading))
		await page.screenshot({ path: `${out}/${name}-${face.replace(/[^a-z]+/gi, '-').toLowerCase()}-${width}-top.png` })
	}
	await page.close()
}
await browser.close()
