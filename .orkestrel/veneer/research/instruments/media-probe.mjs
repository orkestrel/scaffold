// Orchestrator instrument for the U6 design round: whether matchMedia('print') follows
// Emulation.setEmulatedMedia, and which bare pseudo-element selectors CSS.supports accepts, on
// managed Chromium and Edge.
import { chromium } from 'file:///C:/Users/mikes/WebstormProjects/scaffold/node_modules/playwright/index.mjs'

const PSEUDOS = ['::before', '::after', '::backdrop', '::details-content', '::marker', '::placeholder', '::selection', '::journey-absent', ':hover']

for (const launch of [{ label: 'chromium', options: {} }, { label: 'msedge', options: { channel: 'msedge' } }]) {
	const browser = await chromium.launch(launch.options)
	const page = await browser.newPage()
	await page.setContent('<!doctype html><html><head><style>.m{padding-top:1px}@media print{.m{padding-top:3px}}@media (prefers-reduced-motion: reduce){.m{padding-top:2px}}</style></head><body><div class="m"></div></body></html>')
	const session = await page.context().newCDPSession(page)
	const read = () => page.evaluate(() => ({
		print: matchMedia('print').matches,
		screen: matchMedia('screen').matches,
		reduce: matchMedia('(prefers-reduced-motion: reduce)').matches,
		padding: getComputedStyle(document.querySelector('.m')).paddingTop,
	}))
	const base = await read()
	await session.send('Emulation.setEmulatedMedia', { media: 'print', features: [] })
	const print = await read()
	await session.send('Emulation.setEmulatedMedia', { media: '', features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
	const reduce = await read()
	await session.send('Emulation.setEmulatedMedia', { media: '', features: [] })
	const restored = await read()
	const supports = await page.evaluate((list) => Object.fromEntries(list.map((p) => [p, { bare: CSS.supports(`selector(${p})`), star: CSS.supports(`selector(*${p})`) }])), PSEUDOS)
	console.log(`## ${launch.label} ${browser.version()}`)
	console.log('base', JSON.stringify(base))
	console.log('print', JSON.stringify(print))
	console.log('reduce', JSON.stringify(reduce))
	console.log('restored', JSON.stringify(restored))
	for (const [p, r] of Object.entries(supports)) console.log(`supports ${p}: bare=${r.bare} star=${r.star}`)
	await browser.close()
}
