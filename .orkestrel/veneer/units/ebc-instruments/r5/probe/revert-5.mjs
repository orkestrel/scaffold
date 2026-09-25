// Successor to revert-3.mjs (round 5). What changed: the properties list widens to every longhand
// the button-reboot mixin's shorthand properties cover, not only the ones round 3 sampled.
// Probe: reads each class's button form under the retuned holder, at rest, under pointer focus,
// under keyboard focus, and disabled, once on a page carrying the built Veneer cascade and once on
// a page carrying Bootstrap 5.3.8's own stylesheet, for the properties the button reboot writes as
// `revert`, and prints each property whose two readings differ.
// Usage: node tmp/units/ebc-probe/revert-5.mjs [veneer css path]
import { readFileSync } from 'node:fs'
import { chromium } from 'playwright'

const veneer = readFileSync(process.argv[2] ?? 'dist/src/styles/index.css', 'utf8')
const release = readFileSync('node_modules/bootstrap/dist/css/bootstrap.css', 'utf8')
const holder =
	'--vn-weight-body: 700; --vn-button-shadow: 0 2px 6px rebeccapurple; font: 600 19px/29px serif'
const forms = [
	['close', '<button type="button" class="btn-close" aria-label="Close"></button>'],
	[
		'toggler',
		'<nav class="navbar"><button class="navbar-toggler" type="button">T<span class="navbar-toggler-icon"></span></button></nav>',
	],
	[
		'accordion',
		'<div class="accordion"><div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" type="button">Harbor</button></h2></div></div>',
	],
	[
		'dropdown',
		'<div class="dropdown-menu show" style="position: static"><button class="dropdown-item" type="button">Entry</button></div>',
	],
	['nav', '<nav class="nav"><button class="nav-link" type="button">Link</button></nav>'],
	[
		'list',
		'<div class="list-group"><button class="list-group-item list-group-item-action" type="button">Row one</button><button class="list-group-item list-group-item-action" type="button">Row two</button><button class="list-group-item list-group-item-action" type="button">Row three</button></div>',
	],
	[
		'page',
		'<ul class="pagination"><li class="page-item"><button class="page-link" type="button">1</button></li><li class="page-item"><button class="page-link" type="button">2</button></li><li class="page-item"><button class="page-link" type="button">3</button></li></ul>',
	],
	[
		'control',
		'<div class="carousel" style="height: 80px"><button class="carousel-control-prev" type="button">P</button></div>',
	],
	[
		'indicator',
		'<div class="carousel" style="height: 80px"><div class="carousel-indicators"><button type="button" data-bs-target="#c" aria-label="Slide">S</button></div></div>',
	],
]
const properties = [
	'padding-top',
	'padding-right',
	'padding-bottom',
	'padding-left',
	'font-family',
	'font-size',
	'font-weight',
	'line-height',
	'color',
	'background-color',
	'border-top-width',
	'border-right-width',
	'border-bottom-width',
	'border-left-width',
	'border-top-style',
	'border-right-style',
	'border-bottom-style',
	'border-left-style',
	'border-top-color',
	'border-right-color',
	'border-bottom-color',
	'border-left-color',
	'border-top-left-radius',
	'border-top-right-radius',
	'border-bottom-right-radius',
	'border-bottom-left-radius',
	'outline-width',
	'outline-style',
	'outline-color',
	'outline-offset',
	'box-shadow',
	'opacity',
	'pointer-events',
	'cursor',
	'transition-property',
	'transition-duration',
	'transition-timing-function',
	'transition-delay',
]
const browser = await chromium.launch({
	executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
})

async function readSide(css) {
	const out = {}
	for (const [name, markup] of forms) {
		const page = await browser.newPage()
		// Every reading, the rest reading included, is taken with motion reduced, so no reading lands
		// partway through a transition.
		await page.emulateMedia({ reducedMotion: 'reduce' })
		await page.setContent(
			`<style>${css}</style><div style="${holder}; padding: 20px">${markup}</div>`,
		)
		const pick = (state) =>
			page.evaluate(
				([names, state]) => {
					const buttons = [...document.querySelectorAll('button')]
					const target = buttons.length === 3 ? buttons[1] : buttons[0]
					const style = getComputedStyle(target)
					return {
						...Object.fromEntries(
							names.map((property) => [`${state} ${property}`, style.getPropertyValue(property)]),
						),
						[`${state} focus`]: `${document.activeElement === target} ${target.matches(':focus-visible')}`,
					}
				},
				[properties, state],
			)
		const reading = { ...(await pick('rest')) }
		reading['rest reduced'] = String(
			await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches),
		)
		const target = (await page.$$('button')).length === 3 ? 'button >> nth=1' : 'button >> nth=0'
		await page.click(target, { force: true })
		await page.mouse.move(0, 0)
		Object.assign(reading, await pick('pointer'))
		await page.evaluate(() => {
			const buttons = [...document.querySelectorAll('button')]
			const target = buttons.length === 3 ? buttons[1] : buttons[0]
			target.blur()
			target.focus()
		})
		await page.keyboard.press('ArrowRight')
		Object.assign(reading, await pick('keyboard'))
		await page.evaluate(() => {
			for (const button of document.querySelectorAll('button')) button.disabled = true
		})
		Object.assign(reading, await pick('disabled'))
		out[name] = reading
		await page.close()
	}
	return out
}

const v = await readSide(veneer)
const b = await readSide(release)
for (const [name] of forms) {
	const lines = Object.keys(v[name])
		.filter((key) => v[name][key] !== b[name][key])
		.map((key) => `  ${key}: veneer ${v[name][key]} | release ${b[name][key]}`)
	console.log(`${name}\n${lines.join('\n')}`)
}
// The readings of the properties the reset writes as `revert`, on both pages, for the record.
const shown = [
	'rest reduced',
	'pointer focus',
	'keyboard focus',
	'rest font-weight',
	'keyboard outline-style',
	'pointer outline-style',
	'rest transition-property',
	'rest transition-duration',
	'disabled pointer-events',
	'rest color',
]
for (const [name] of forms)
	console.log(
		`${name} | ${shown.map((key) => `${key}: ${v[name][key]} / ${b[name][key]}`).join(' | ')}`,
	)
await browser.close()
