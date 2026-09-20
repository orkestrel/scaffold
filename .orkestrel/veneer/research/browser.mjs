import { createRequire } from 'node:module'

const packagePath = 'C:/Users/mikes/WebstormProjects/scaffold/package.json'
const browserPath = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const require = createRequire(packagePath)
const { chromium, errors } = require('playwright')
const report = {
	measurements: {},
	assertions: [],
}

function assertFact(name, actual, expected, passed) {
	report.assertions.push({ name, actual, expected, passed })
	if (!passed) {
		throw new Error(`${name} failed`)
	}
}

function emitReport() {
	process.stdout.write(`${JSON.stringify(report, undefined, 2)}\n`)
}

async function waitForRender(page) {
	await page.evaluate(
		() =>
			new Promise((resolve) => {
				requestAnimationFrame(() => {
					requestAnimationFrame(resolve)
				})
			}),
	)
}

async function measureSample(page) {
	return page.evaluate(() => {
		const sample = document.querySelector('#sample')
		const style = document.querySelector('#fixture')
		if (!(sample instanceof HTMLElement) || !(style instanceof HTMLStyleElement) || style.sheet === null) {
			throw new Error('Sample stylesheet fixture is unavailable')
		}
		const computed = getComputedStyle(sample)
		const rectangle = sample.getBoundingClientRect()
		return {
			property: computed.getPropertyValue('--sample-space').trim(),
			padding: computed.padding,
			rectangle: {
				x: rectangle.x,
				y: rectangle.y,
				width: rectangle.width,
				height: rectangle.height,
			},
			rules: Array.from(style.sheet.cssRules, (rule) => rule.cssText),
		}
	})
}

async function measureAction(page) {
	return page.evaluate(() => {
		const action = document.querySelector('#activate')
		if (!(action instanceof HTMLButtonElement)) {
			throw new Error('Action fixture is unavailable')
		}
		const computed = getComputedStyle(action)
		const rectangle = action.getBoundingClientRect()
		const hit = document.elementFromPoint(
			rectangle.x + rectangle.width / 2,
			rectangle.y + rectangle.height / 2,
		)
		return {
			display: computed.display,
			visibility: computed.visibility,
			opacity: computed.opacity,
			rectangle: {
				x: rectangle.x,
				y: rectangle.y,
				width: rectangle.width,
				height: rectangle.height,
			},
			hit: hit === null ? undefined : { id: hit.id, tag: hit.tagName },
		}
	})
}

async function readStatus(page) {
	return page.getByRole('status').textContent()
}

async function run() {
	let browser
	try {
		browser = await chromium.launch({
			headless: true,
			executablePath: browserPath,
			timeout: 10_000,
		})
		const context = await browser.newContext()
		const page = await context.newPage()
		page.setDefaultTimeout(1_500)
		await page.setContent(
			`<!doctype html>
<html>
  <head>
    <style id="fixture">
      :root { --sample-space: 1rem; }
      html { font-size: 16px; }
      .sample { box-sizing: border-box; padding: var(--sample-space); border: 1px solid black; }
      #cover { background: transparent; display: none; inset: 0; position: fixed; }
      #cover[data-open="true"] { display: block; }
    </style>
  </head>
  <body>
    <section id="sample" class="sample">Sample content</section>
    <button type="button" id="spacing">Apply spacing</button>
    <button type="button" id="invalid">Apply invalid spacing</button>
    <button type="button" id="activate">Activate sample</button>
    <span role="status">Ready</span>
    <button type="button" id="cover-action">Cover action</button>
    <div id="cover" aria-hidden="true"></div>
    <script>
      const sample = document.querySelector('#sample')
      const status = document.querySelector('[role="status"]')
      const cover = document.querySelector('#cover')
      document.querySelector('#spacing').addEventListener('click', () => sample.style.setProperty('--sample-space', '2rem'))
      document.querySelector('#invalid').addEventListener('click', () => sample.style.setProperty('--sample-space', 'not-a-length'))
      document.querySelector('#activate').addEventListener('click', () => { status.textContent = 'Activated' })
      document.querySelector('#cover-action').addEventListener('click', () => { cover.dataset.open = 'true' })
      document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { delete cover.dataset.open } })
    </script>
  </body>
</html>`,
			{ timeout: 10_000, waitUntil: 'load' },
		)
		await waitForRender(page)

		const spacing = {}
		spacing.initial = await measureSample(page)
		await page.getByRole('button', { name: 'Apply spacing' }).click()
		await waitForRender(page)
		spacing.valid = await measureSample(page)
		assertFact('valid padding begins at 16px', spacing.initial.padding, '16px', spacing.initial.padding === '16px')
		assertFact('valid padding changes to 32px', spacing.valid.padding, '32px', spacing.valid.padding === '32px')
		assertFact(
			'stylesheet rule text stays unchanged after valid click',
			spacing.valid.rules,
			spacing.initial.rules,
			JSON.stringify(spacing.valid.rules) === JSON.stringify(spacing.initial.rules),
		)
		await page.getByRole('button', { name: 'Apply invalid spacing' }).click()
		await waitForRender(page)
		spacing.invalid = await measureSample(page)
		assertFact(
			'invalid custom property remains nonempty',
			spacing.invalid.property,
			'a nonempty string',
			spacing.invalid.property.length > 0,
		)
		assertFact(
			'invalid consumer resolves to padding initial value',
			spacing.invalid.padding,
			'0px',
			spacing.invalid.padding === '0px',
		)
		assertFact(
			'invalid consumer no longer matches valid spacing',
			spacing.invalid.padding,
			spacing.valid.padding,
			spacing.invalid.padding !== spacing.valid.padding,
		)
		report.measurements.spacing = spacing

		const activation = { before: await measureAction(page), status: {} }
		activation.status.before = await readStatus(page)
		await page.getByRole('button', { name: 'Cover action' }).click()
		await waitForRender(page)
		activation.covered = await measureAction(page)
		try {
			await page.getByRole('button', { name: 'Activate sample' }).click({ timeout: 500 })
			activation.refused = false
		} catch (error) {
			if (!(error instanceof errors.TimeoutError)) {
				throw error
			}
			activation.refused = true
		}
		activation.status.covered = await readStatus(page)
		assertFact('covered role click refuses with timeout', activation.refused, true, activation.refused === true)
		assertFact('covered action leaves status ready', activation.status.covered, 'Ready', activation.status.covered === 'Ready')
		assertFact('cover intercepts the action hit target', activation.covered.hit?.id, 'cover', activation.covered.hit?.id === 'cover')
		await page.keyboard.press('Escape')
		await waitForRender(page)
		activation.uncovered = await measureAction(page)
		await page.getByRole('button', { name: 'Activate sample' }).click()
		activation.status.after = await readStatus(page)
		assertFact('uncovered role click activates the sample', activation.status.after, 'Activated', activation.status.after === 'Activated')
		report.measurements.activation = activation
	} finally {
		if (browser !== undefined) {
			await browser.close()
		}
	}
}

run()
	.then(() => {
		emitReport()
	})
	.catch((error) => {
		report.failure = error instanceof Error ? error.message : String(error)
		emitReport()
		process.exitCode = 1
	})
