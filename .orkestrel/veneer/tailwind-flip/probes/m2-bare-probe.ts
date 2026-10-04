import { chromium } from 'playwright'
import { readFileSync, writeFileSync } from 'node:fs'

const ROOT = '/home/user/veneer'
const OUT = `${ROOT}/tmp/probes/flip/m2-bare`
const SHEETS = `${ROOT}/tmp/probes/flip/sheets`
const manifest = JSON.parse(readFileSync(`${SHEETS}/manifest.json`, 'utf8'))
const sheet = (name: string) => readFileSync(manifest[name].path, 'utf8')

// Class category sets.
const core = await import(`${ROOT}/dist/src/core/index.js`)
const categories: Record<string, Set<string>> = {}
const leaves = (value: unknown, into: Set<string>) => {
	if (typeof value === 'string') into.add(value)
	else if (value && typeof value === 'object') for (const child of Object.values(value)) leaves(child, into)
}
for (const [category, tree] of Object.entries(core.CLASS_NAMES.bootstrap)) {
	categories[category] = new Set()
	leaves(tree, categories[category])
}
const comparison = JSON.parse(readFileSync(`${ROOT}/tests/fixtures/tailwindcss/comparison.json`, 'utf8'))
const shared: string[] = comparison.shared
const sharedUtilities = shared.filter((n) => categories.utilities.has(n)).sort()
const sharedComponents = shared.filter((n) => categories.components.has(n)).sort()
console.log('shared', shared.length, 'utilities', sharedUtilities.length, 'components', sharedComponents.length)
if (sharedUtilities.length !== 192 || sharedComponents.length !== 17) throw new Error('Shared set sizes differ')

const preflight = JSON.parse(readFileSync(`${ROOT}/tests/fixtures/tailwindcss/preflight.json`, 'utf8'))
const elements: string[] = preflight.elements
const pseudos: string[] = preflight.pseudos

const conditions: Record<string, string[]> = {
	A: ['bootstrap-lifted.css'],
	B: ['tailwind-unexcluded.css', 'bootstrap-lifted.css'],
	C: ['tailwind-flipped.css', 'bootstrap-reboot-reset.css'],
	D: ['tailwind-flipped.css', 'bootstrap-lifted.css'],
}
const html = (names: string[]) =>
	`<!doctype html><html><head><meta charset="utf-8">${names
		.map((n) => `<style data-sheet="${n}">${sheet(n).replace(/<\/style/giu, '<\\/style')}</style>`)
		.join('')}</head><body></body></html>`

let browser
try {
	browser = await chromium.launch()
} catch {
	browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
}
const version = browser.version()
console.log('chromium', version)

// Exposure decided once under A (the record decided it under the lifted sheet alone); reused for every condition.
const context = await browser.newContext({ viewport: { width: 1280, height: 720 } })
const readAll = async (names: string[], exposure?: Record<string, string[]>) => {
	const page = await context.newPage()
	await page.setContent(html(names))
	const result = await page.evaluate(
		({ elements, pseudos, exposure }) => {
			const read = (element: Element, pseudo?: string) => {
				const style = getComputedStyle(element, pseudo)
				const out: Record<string, string> = {}
				for (const name of Array.from(style)) if (!name.startsWith('--')) out[name] = style.getPropertyValue(name)
				return out
			}
			const isExposed = (element: Element, pseudo: string) => {
				if (!/^::[\w-]+$/u.test(pseudo)) return false
				const host = read(element).color
				const before = read(element, pseudo).color
				const color = before === 'rgb(1, 2, 3)' ? 'rgb(4, 5, 6)' : 'rgb(1, 2, 3)'
				const style = new CSSStyleSheet()
				element.setAttribute('data-preflight-exposure', '')
				style.replaceSync(`[data-preflight-exposure]${pseudo} { color: ${color} !important }`)
				document.adoptedStyleSheets = [...document.adoptedStyleSheets, style]
				try {
					return read(element, pseudo).color === color && before !== color && read(element).color === host
				} finally {
					document.adoptedStyleSheets = document.adoptedStyleSheets.filter((s) => s !== style)
					element.removeAttribute('data-preflight-exposure')
				}
			}
			const readings: Record<string, Record<string, string>> = {}
			const exposed: Record<string, string[]> = {}
			for (const name of elements) {
				const element =
					name === 'svg'
						? document.createElementNS('http://www.w3.org/2000/svg', name)
						: document.createElement(name)
				document.body.append(element)
				exposed[name] = exposure ? exposure[name] : pseudos.filter((p) => isExposed(element, p))
				readings[`${name}\0`] = read(element)
				for (const p of exposed[name]) readings[`${name}\0${p}`] = read(element, p)
				element.remove()
			}
			return { readings, exposed, enumeration: Array.from(getComputedStyle(document.body)).filter((n) => !n.startsWith('--')) }
		},
		{ elements, pseudos, exposure },
	)
	// Exposure under this condition, independently, for the record.
	const own = exposure
		? await page.evaluate(
				({ elements, pseudos }) => {
					const color = (e: Element, p?: string) => getComputedStyle(e, p).color
					const out: Record<string, string[]> = {}
					for (const name of elements) {
						const element =
							name === 'svg' ? document.createElementNS('http://www.w3.org/2000/svg', name) : document.createElement(name)
						document.body.append(element)
						out[name] = pseudos.filter((pseudo) => {
							const host = color(element)
							const before = color(element, pseudo)
							const c = before === 'rgb(1, 2, 3)' ? 'rgb(4, 5, 6)' : 'rgb(1, 2, 3)'
							const s = new CSSStyleSheet()
							element.setAttribute('data-preflight-exposure', '')
							s.replaceSync(`[data-preflight-exposure]${pseudo} { color: ${c} !important }`)
							document.adoptedStyleSheets = [...document.adoptedStyleSheets, s]
							const ok = color(element, pseudo) === c && before !== c && color(element) === host
							document.adoptedStyleSheets = document.adoptedStyleSheets.filter((x) => x !== s)
							element.removeAttribute('data-preflight-exposure')
							return ok
						})
						element.remove()
					}
					return out
				},
				{ elements, pseudos },
			)
		: result.exposed
	const check = await page.evaluate(() => Array.from(document.styleSheets).map((s) => s.cssRules.length))
	await page.close()
	return { ...result, own, ruleCounts: check }
}

const A = await readAll(conditions.A)
const exposure = A.exposed
const readings: Record<string, typeof A> = { A }
for (const key of ['B', 'C', 'D']) readings[key] = await readAll(conditions[key], exposure)

// Witnesses: items 5 and 6.
const witness = async (names: string[]) => {
	const page = await context.newPage()
	await page.setContent(html(names).replace('<html>', '<html data-bs-theme="light">'))
	const out = await page.evaluate(() => {
		const read = (element: Element, props: string[], pseudo?: string) => {
			const s = getComputedStyle(element, pseudo)
			return Object.fromEntries(props.map((p) => [p, s.getPropertyValue(p)]))
		}
		const mount = (markup: string) => {
			const holder = document.createElement('div')
			holder.innerHTML = markup
			const element = holder.firstElementChild as Element
			document.body.append(holder)
			return { element, holder }
		}
		const box = (k: string) => [`${k}-top`, `${k}-right`, `${k}-bottom`, `${k}-left`]
		const border = ['top', 'right', 'bottom', 'left'].flatMap((s) => [`border-${s}-width`, `border-${s}-style`, `border-${s}-color`])
		const radius = ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius']
		const font = ['font-family', 'font-size', 'font-weight', 'font-style', 'line-height']
		const specs: Array<[string, string, string[], string?]> = [
			['div[hidden]', '<div hidden></div>', ['display']],
			['div[hidden].d-flex', '<div hidden class="d-flex"></div>', ['display']],
		]
		for (const h of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
			specs.push([h, `<${h}>Heading</${h}>`, ['font-size', 'font-weight', 'margin-top', 'margin-bottom', 'line-height']])
		specs.push(
			['p', '<p>Text</p>', ['margin-bottom']],
			['a[href]', '<a href="#">Link</a>', ['color', 'text-decoration-line', 'text-decoration-color']],
			['img', '<img alt="">', ['display', 'vertical-align']],
			['svg', '<svg></svg>', ['display', 'vertical-align']],
			['ul', '<ul><li>Item</li></ul>', ['padding-left', 'margin-bottom', 'list-style-type']],
			['button', '<button>Go</button>', ['background-color', ...box('padding').map((x) => x), ...border.filter((b) => b.endsWith('width')), ...radius, 'font-size']],
			['input[type=text]', '<input type="text">', ['background-color', ...border, ...font]],
			['small', '<small>s</small>', ['font-size']],
			['table', '<table><caption>c</caption></table>', ['border-collapse', 'caption-side']],
			['hr', '<hr>', ['color', 'opacity', ...box('margin')]],
			['label', '<label>l</label>', ['display']],
			['legend', '<legend>l</legend>', ['font-size']],
			['pre', '<pre>x</pre>', [...box('margin'), 'font-size']],
			['code', '<code>x</code>', ['font-size', 'color']],
			['kbd', '<kbd>x</kbd>', ['background-color']],
			['mark', '<mark>x</mark>', [...box('padding'), 'background-color']],
			['sup', '<sup>1</sup>', ['position', 'vertical-align', 'top', 'bottom']],
			['sub', '<sub>1</sub>', ['position', 'vertical-align', 'top', 'bottom']],
			['figure', '<figure></figure>', box('margin')],
			['dl', '<dl><dt>t</dt><dd>d</dd></dl>', box('margin')],
		)
		const out: Record<string, Record<string, string>> = {}
		for (const [label, markup, props] of specs) {
			const { element, holder } = mount(markup)
			out[label] = read(element, props)
			if (label === 'dl') {
				out.dt = read(element.querySelector('dt') as Element, [...box('margin'), 'font-weight'])
				out.dd = read(element.querySelector('dd') as Element, box('margin'))
			}
			holder.remove()
		}
		{
			const { element, holder } = mount('<blockquote>q</blockquote>')
			out.blockquote = read(element, box('margin'))
			holder.remove()
		}
		out.body = read(document.body, ['font-family', 'font-size', 'line-height', 'color', 'background-color', ...box('margin')])
		out.html = read(document.documentElement, ['font-family', 'font-size', 'line-height', 'color', 'background-color'])
		{
			const holder = document.createElement('div')
			holder.innerHTML = '<input list="l"><datalist id="l"><option value="a"></option></datalist>'
			document.body.append(holder)
			const input = holder.querySelector('input') as Element
			const p = '::-webkit-calendar-picker-indicator'
			const before = getComputedStyle(input, p).color
			const s = new CSSStyleSheet()
			input.setAttribute('data-x', '')
			s.replaceSync(`[data-x]${p} { color: rgb(1, 2, 3) !important }`)
			document.adoptedStyleSheets = [...document.adoptedStyleSheets, s]
			const exposedColor = getComputedStyle(input, p).color
			document.adoptedStyleSheets = document.adoptedStyleSheets.filter((x) => x !== s)
			input.removeAttribute('data-x')
			out['input[list]::-webkit-calendar-picker-indicator'] = {
				display: getComputedStyle(input, p).display,
				exposed: String(exposedColor === 'rgb(1, 2, 3)' && before !== 'rgb(1, 2, 3)' && getComputedStyle(input).color !== 'rgb(1, 2, 3)'),
				hostDisplay: getComputedStyle(input).display,
			}
			holder.remove()
		}
		return out
	})
	await page.close()
	return out
}
const witnesses: Record<string, unknown> = {}
for (const key of ['A', 'B', 'C', 'D']) witnesses[key] = await witness(conditions[key])
await browser.close()

// Rows: any (subject, longhand) where B, C or D differ from A.
type Row = { element: string; pseudo?: string; longhand: string; A: string; B: string; C: string; D: string }
const rows: Row[] = []
for (const subject of Object.keys(A.readings).sort()) {
	const [element, pseudo] = subject.split('\0')
	const a = A.readings[subject]
	for (const longhand of Object.keys(a).sort()) {
		const values = Object.fromEntries(['A', 'B', 'C', 'D'].map((k) => [k, readings[k].readings[subject]?.[longhand]]))
		if (values.B !== values.A || values.C !== values.A || values.D !== values.A)
			rows.push({ element, ...(pseudo ? { pseudo } : {}), longhand, ...(values as { A: string; B: string; C: string; D: string }) })
	}
}

// Record agreement: alone vs A, preflight vs B.
const agreement = { equal: 0, differ: 0, missing: 0, differing: [] as unknown[], missingRows: [] as unknown[] }
for (const row of preflight.rows) {
	const subject = `${row.element}\0${row.pseudo ?? ''}`
	const a = A.readings[subject]?.[row.longhand]
	const b = readings.B.readings[subject]?.[row.longhand]
	if (a === undefined || b === undefined) {
		agreement.missing++
		agreement.missingRows.push({ ...row, A: a ?? null, B: b ?? null })
	} else if (a === row.alone && b === row.preflight) agreement.equal++
	else {
		agreement.differ++
		agreement.differing.push({ ...row, A: a, B: b })
	}
}
const enumeration = new Set(A.enumeration)
const recordLonghands = new Set<string>(preflight.rows.map((r: { longhand: string }) => r.longhand))
const exposureDiff: Record<string, Record<string, string[]>> = {}
for (const key of ['B', 'C', 'D'])
	for (const name of elements) {
		const a = exposure[name].join(','), own = readings[key].own[name].join(',')
		if (a !== own) (exposureDiff[key] ??= {})[name] = readings[key].own[name]
	}

writeFileSync(`${OUT}/rows.json`, JSON.stringify({ chromium: version, viewport: '1280x720', conditions, rows }, null, '\t'))
writeFileSync(
	`${OUT}/readings.json`,
	JSON.stringify(
		{
			chromium: version,
			sharedUtilities: sharedUtilities.length,
			sharedComponents: sharedComponents.length,
			sharedComponentNames: sharedComponents,
			enumerationSize: A.enumeration.length,
			enumeration: A.enumeration,
			exposureUnderA: exposure,
			exposureDiff,
			ruleCounts: Object.fromEntries(['A', 'B', 'C', 'D'].map((k) => [k, readings[k].ruleCounts])),
			agreement,
			recordNotEnumerated: [...recordLonghands].filter((l) => !enumeration.has(l)).sort(),
			enumeratedNotRecord: [...enumeration].filter((l) => !recordLonghands.has(l)).sort(),
			witnesses,
		},
		null,
		'\t',
	),
)
console.log('rows', rows.length, 'agreement', agreement.equal, agreement.differ, agreement.missing)
