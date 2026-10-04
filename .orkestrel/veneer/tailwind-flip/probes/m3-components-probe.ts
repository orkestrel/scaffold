import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { chromium } from 'playwright'

const ROOT = '/home/user/veneer'
const OUT = resolve(ROOT, 'tmp/probes/flip/m3-components')
const SHEETS = resolve(ROOT, 'tmp/probes/flip/sheets')
const SECTIONS = resolve(ROOT, 'app/browser/sections')
const NARROW = new Set(['navbar.html', 'offcanvas.html', 'collapse.html', 'modal.html', 'containers.html', 'tables.html'])
const PSEUDOS = ['::before', '::after', '::marker', '::placeholder', '::file-selector-button']
const BOX = ['x', 'y', 'width', 'height']

const manifest = JSON.parse(readFileSync(resolve(SHEETS, 'manifest.json'), 'utf8'))
const sheet = (name: string) => readFileSync(manifest[name].path, 'utf8')
const CONDITIONS: Record<string, string[]> = {
	A: [sheet('bootstrap-lifted.css')],
	D: [sheet('tailwind-flipped.css'), sheet('bootstrap-lifted-minus-shared.css')],
	C: [sheet('tailwind-flipped.css'), sheet('bootstrap-reboot-reset-minus-shared.css')],
	// Controls: the text-deletion alternates, which keep `.spinner-border`'s border shorthand.
	Dt: [sheet('tailwind-flipped.css'), sheet('bootstrap-lifted-minus-shared.text.css')],
	Ct: [sheet('tailwind-flipped.css'), sheet('bootstrap-reboot-reset-minus-shared.text.css')],
}

const core = await import(resolve(ROOT, 'dist/src/core/index.js'))
const registry = core.CLASS_NAMES.bootstrap
function leaves(tree: unknown): string[] {
	const found: string[] = []
	const pending: unknown[] = [tree]
	while (pending.length > 0) {
		const value = pending.pop()
		if (typeof value === 'string') found.push(value)
		else if (value && typeof value === 'object') for (const child of Object.values(value)) pending.push(child)
		else throw new Error('bad registry node')
	}
	return found
}
const categories: Record<string, Set<string>> = {}
for (const key of Object.keys(registry)) categories[key] = new Set(leaves(registry[key]))
const comparison = JSON.parse(readFileSync(resolve(ROOT, 'tests/fixtures/tailwindcss/comparison.json'), 'utf8'))
const shared: string[] = comparison.shared
const sharedSet = new Set(shared)
const sharedUtilities = new Set(shared.filter((name) => categories.utilities.has(name)))
const sharedComponents = shared.filter((name) => categories.components.has(name)).sort()
console.log('shared', shared.length, 'sharedUtilities', sharedUtilities.size, 'sharedComponents', sharedComponents.length)
if (sharedUtilities.size !== 192 || sharedComponents.length !== 17) throw new Error('shared set sizes differ')
const otherRegistry = new Set([...categories.utilities, ...categories.modifiers, ...categories.composables])

const preflight = JSON.parse(readFileSync(resolve(ROOT, 'tests/fixtures/tailwindcss/preflight.json'), 'utf8'))
const preflightRows = new Set<string>(preflight.rows.map((row: { element: string; pseudo?: string; longhand: string }) => `${row.element}\0${row.pseudo ?? ''}\0${row.longhand}`))

let browser
try {
	browser = await chromium.launch()
} catch {
	const dir = readdirSync('/opt/pw-browsers').find((d) => /^chromium-\d+$/.test(d))
	browser = await chromium.launch({ executablePath: `/opt/pw-browsers/${dir}/chrome-linux/chrome` })
}
const chromiumVersion = browser.version()
console.log('chromium', chromiumVersion)
const page = await browser.newPage()

// Declared non-custom longhands per class: shared utilities' exact rules in bootstrap-lifted.css, and
// every class token in tailwind-flipped.css selectors.
await page.setContent('<!doctype html><html><body></body></html>')
const declared = await page.evaluate(
	([lifted, tailwind, names]) => {
		function walk(rules, visit) {
			for (const rule of Array.from(rules)) {
				if (rule instanceof CSSStyleRule) visit(rule)
				if (rule.cssRules) walk(rule.cssRules, visit)
			}
		}
		const bootstrap = new CSSStyleSheet()
		bootstrap.replaceSync(lifted)
		const wanted = new Map(names.map((name) => ['.' + CSS.escape(name), name]))
		const sharedDeclared = {}
		walk(bootstrap.cssRules, (rule) => {
			const name = wanted.get(rule.selectorText)
			if (name === undefined) return
			const set = new Set(sharedDeclared[name] ?? [])
			for (const property of Array.from(rule.style)) if (!property.startsWith('--')) set.add(property)
			sharedDeclared[name] = [...set]
		})
		const tw = new CSSStyleSheet()
		tw.replaceSync(tailwind)
		const tailwindDeclared = {}
		walk(tw.cssRules, (rule) => {
			for (const match of rule.selectorText.matchAll(/\.((?:\\.|[A-Za-z0-9_-])+)/g)) {
				const token = match[1].replace(/\\(.)/g, '$1')
				const set = new Set(tailwindDeclared[token] ?? [])
				for (const property of Array.from(rule.style)) if (!property.startsWith('--')) set.add(property)
				tailwindDeclared[token] = [...set]
			}
		})
		return { sharedDeclared, tailwindDeclared }
	},
	[CONDITIONS.A[0], CONDITIONS.D[0], [...sharedUtilities]] as const,
)
const sharedDeclared: Record<string, string[]> = declared.sharedDeclared
const tailwindDeclared: Record<string, string[]> = declared.tailwindDeclared
const tailwindOnly = new Set(Object.keys(tailwindDeclared).filter((token) => !sharedSet.has(token)))
writeFileSync(resolve(OUT, 'declared.json'), JSON.stringify({ sharedDeclared, tailwindDeclared, tailwindOnly: [...tailwindOnly].sort() }, null, '\t'))
console.log('shared utilities with a bootstrap rule', Object.keys(sharedDeclared).length, 'tailwind tokens', Object.keys(tailwindDeclared).length, 'tailwind-only', tailwindOnly.size)

function buildDocument(condition: string, fragment: string): string {
	const styles = CONDITIONS[condition].map((text) => `<style>${text}</style>`).join('')
	return `<!doctype html><html lang="en" data-bs-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">${styles}</head><body><main class="container-fluid">${fragment}</main></body></html>`
}

// Runs in the page: reads every element under main in document order.
function readMain(pseudos: string[]) {
	window.scrollTo(0, 0)
	const running = document.getAnimations().filter((animation) => animation.playState === 'running')
	for (const animation of running) {
		animation.pause()
		animation.currentTime = 0
	}
	const main = document.querySelector('main')
	const origin = main.getBoundingClientRect()
	const elements = [...main.querySelectorAll('*')]
	let names = null
	const rows = []
	for (const element of elements) {
		const segments = []
		let node = element
		while (node !== main) {
			const parent = node.parentElement
			const index = [...parent.children].filter((child) => child.localName === node.localName).indexOf(node) + 1
			segments.unshift(`${node.localName}:nth-of-type(${index})`)
			node = parent
		}
		const style = getComputedStyle(element)
		const list = Array.from(style).filter((name) => !name.startsWith('--'))
		if (names === null) names = list
		else if (list.length !== names.length || list.some((name, i) => name !== names[i])) throw new Error('longhand population differs')
		const values = list.map((name) => style.getPropertyValue(name))
		const box = element.getClientRects().length === 0 ? null : element.getBoundingClientRect()
		const pseudo = {}
		for (const name of pseudos) {
			let present = false
			if (name === '::before' || name === '::after') {
				const ps = getComputedStyle(element, name)
				present = ps.content !== 'none' && ps.content !== 'normal' && ps.display !== 'none'
			} else if (name === '::placeholder') present = element.matches(':placeholder-shown')
			else if (name === '::file-selector-button') present = element instanceof HTMLInputElement && element.type === 'file'
			else if (name === '::marker') present = style.display.includes('list-item')
			if (box === null) present = false
			if (!present) continue
			const ps = getComputedStyle(element, name)
			const pl = Array.from(ps).filter((n) => !n.startsWith('--'))
			pseudo[name] = Object.fromEntries(pl.map((n) => [n, ps.getPropertyValue(n)]))
		}
		rows.push({
			path: 'main>' + segments.join('>'),
			tag: element.localName,
			classes: element.getAttribute('class') ?? '',
			box: box === null ? null : [box.x - origin.x, box.y - origin.y, box.width, box.height],
			values,
			pseudo,
		})
	}
	for (const animation of running) animation.play()
	return { names, rows }
}

function classify(tokens: string[]): string {
	if (tokens.some((t) => categories.components.has(t))) return 'component-class'
	if (tokens.some((t) => sharedUtilities.has(t))) return 'shared-utility'
	if (tokens.some((t) => otherRegistry.has(t))) return 'bootstrap-other'
	return 'bare'
}

const fragments = readdirSync(SECTIONS).filter((f) => f.endsWith('.html')).sort()
console.log('fragments', fragments.length)
const INHERITED = /^(color|font-.*|line-height|text-align|visibility|list-style-.*)$/
const departures: Record<string, unknown>[] = []
const elementsOut: Record<string, unknown>[] = []
const controlDiff: Record<string, unknown>[] = []
const docSummary: Record<string, unknown>[] = []
const started = Date.now()

for (const fragment of fragments) {
	const text = readFileSync(resolve(SECTIONS, fragment), 'utf8')
	const viewports = NARROW.has(fragment) ? [[1280, 800], [390, 844]] : [[1280, 800]]
	for (const [width, height] of viewports) {
		await page.setViewportSize({ width, height })
		const readings: Record<string, ReturnType<typeof readMain>> = {}
		for (const condition of Object.keys(CONDITIONS)) {
			await page.setContent(buildDocument(condition, text), { waitUntil: 'load' })
			readings[condition] = await page.evaluate(readMain, PSEUDOS)
		}
		const A = readings.A
		for (const c of Object.keys(readings)) {
			if (readings[c].rows.length !== A.rows.length) throw new Error(`${fragment} element count differs under ${c}`)
			if (readings[c].names.join() !== A.names.join()) throw new Error(`${fragment} longhand names differ under ${c}`)
		}
		const viewport = `${width}x${height}`
		const meta = A.rows.map((row, index) => {
			const tokens = row.classes.split(/\s+/).filter(Boolean)
			const ancestors = A.rows.filter((other, j) => j < index && row.path.startsWith(other.path + '>'))
			ancestors.sort((a, b) => b.path.length - a.path.length)
			const owner = ancestors.find((other) => other.classes.split(/\s+/).some((t) => categories.components.has(t)))
			const ancestorTokens = ancestors.flatMap((other) => other.classes.split(/\s+/).filter(Boolean))
			return {
				tokens,
				label: classify(tokens),
				within: owner ? owner.classes.split(/\s+/).filter(Boolean).join(' ') : null,
				components: tokens.filter((t) => categories.components.has(t)),
				sharedSelf: tokens.filter((t) => sharedUtilities.has(t)),
				sharedAncestors: [...new Set(ancestorTokens.filter((t) => sharedUtilities.has(t)))],
				tailwindSelf: tokens.filter((t) => tailwindOnly.has(t)),
				tailwindAncestors: [...new Set(ancestorTokens.filter((t) => tailwindOnly.has(t)))],
			}
		})
		for (const [index, row] of A.rows.entries()) {
			const m = meta[index]
			elementsOut.push({ fragment, viewport, index, path: row.path, tag: row.tag, classes: row.classes, label: m.label, within: m.within, sharedSelf: m.sharedSelf, sharedAncestors: m.sharedAncestors, tailwindSelf: m.tailwindSelf, tailwindAncestors: m.tailwindAncestors })
		}
		// Collects every compared value per element: longhands, pseudo longhands, and box fields.
		function entries(reading: ReturnType<typeof readMain>, index: number): Map<string, string> {
			const row = reading.rows[index]
			const map = new Map<string, string>()
			reading.names.forEach((name, i) => map.set(name, row.values[i]))
			for (const pseudo of PSEUDOS) {
				const values = row.pseudo[pseudo]
				map.set(`${pseudo} (present)`, values ? 'yes' : 'no')
				if (values) for (const [name, value] of Object.entries(values)) map.set(`${pseudo} ${name}`, value as string)
			}
			BOX.forEach((field, i) => map.set(`box ${field}`, row.box === null ? 'none' : String(row.box[i])))
			return map
		}
		let count = 0
		for (let index = 0; index < A.rows.length; index++) {
			const row = A.rows[index]
			const m = meta[index]
			const [a, d, c, dt, ct] = ['A', 'D', 'C', 'Dt', 'Ct'].map((k) => entries(readings[k], index))
			const keys = new Set([...a.keys(), ...d.keys(), ...c.keys(), ...dt.keys(), ...ct.keys()])
			for (const key of keys) {
				const va = a.get(key) ?? 'absent'
				const vd = d.get(key) ?? 'absent'
				const vc = c.get(key) ?? 'absent'
				const vdt = dt.get(key) ?? 'absent'
				const vct = ct.get(key) ?? 'absent'
				if ((vd !== va) !== (vdt !== va) || (vc !== va) !== (vct !== va) || vd !== vdt || vc !== vct)
					controlDiff.push({ fragment, viewport, path: row.path, classes: row.classes, property: key, A: va, D: vd, Dt: vdt, C: vc, Ct: vct })
				if (vd === va && vc === va) continue
				count++
				const [head, ...rest] = key.split(' ')
				const pseudo = head.startsWith('::') ? head : head === 'box' ? undefined : undefined
				const longhand = head.startsWith('::') || head === 'box' ? rest.join(' ') : key
				const isBox = head === 'box'
				departures.push({
					fragment,
					viewport,
					path: row.path,
					tag: row.tag,
					classes: row.classes,
					label: m.label,
					within: m.within,
					kind: isBox ? 'box' : pseudo ? 'pseudo' : 'longhand',
					pseudo: pseudo ?? null,
					property: longhand,
					A: va,
					D: vd,
					C: vc,
					dVsA: vd !== va,
					cVsA: vc !== va,
					dVsC: vd !== vc,
				})
			}
		}
		docSummary.push({ fragment, viewport, elements: A.rows.length, departingPairs: count, longhands: A.names.length })
		console.log(fragment, viewport, A.rows.length, count, `${Math.round((Date.now() - started) / 1000)}s`)
	}
}
await browser.close()

// Attribution for component-class departures.
function attribute(dep: Record<string, any>, m: Record<string, any>): { primary: string; all: string[] } {
	const all: string[] = []
	const longhand = dep.property as string
	const isBox = dep.kind === 'box'
	if (dep.kind === 'pseudo' && longhand === '(present)') {
		// Presence of a pseudo-element: no longhand to attribute beyond the D/C split.
	}
	if ((!isBox && preflightRows.has(`${dep.tag}\0${dep.pseudo ?? ''}\0${longhand}`)) || dep.D !== dep.C) all.push('preflight')
	if (!isBox && m.sharedSelf.some((t: string) => (sharedDeclared[t] ?? []).includes(longhand))) all.push('shared-utility-self')
	if (m.sharedAncestors.length > 0 && (isBox || INHERITED.test(longhand))) all.push('shared-utility-ancestor')
	if (
		(!isBox && m.tailwindSelf.some((t: string) => (tailwindDeclared[t] ?? []).includes(longhand))) ||
		(isBox && (m.tailwindSelf.length > 0 || m.tailwindAncestors.length > 0)) ||
		(!isBox && INHERITED.test(longhand) && m.tailwindAncestors.some((t: string) => (tailwindDeclared[t] ?? []).includes(longhand)))
	)
		all.push('unexcluded-tailwind')
	return { primary: all[0] ?? 'unknown', all }
}
const metaByKey = new Map(elementsOut.map((e: any) => [`${e.fragment}\0${e.viewport}\0${e.path}`, e]))
for (const dep of departures as any[]) {
	const m = metaByKey.get(`${dep.fragment}\0${dep.viewport}\0${dep.path}`)
	dep.sharedSelf = m.sharedSelf
	dep.sharedAncestors = m.sharedAncestors
	if (dep.label === 'component-class') {
		const { primary, all } = attribute(dep, m)
		dep.attribution = primary
		dep.attributions = all
	}
}

writeFileSync(resolve(OUT, 'departures.json'), JSON.stringify({ chromiumVersion, conditions: { A: ['bootstrap-lifted.css'], D: ['tailwind-flipped.css', 'bootstrap-lifted-minus-shared.css'], C: ['tailwind-flipped.css', 'bootstrap-reboot-reset-minus-shared.css'] }, count: departures.length, departures }))
writeFileSync(resolve(OUT, 'elements.json'), JSON.stringify({ chromiumVersion, docs: docSummary, elements: elementsOut }))
writeFileSync(resolve(OUT, 'control-text.json'), JSON.stringify({ chromiumVersion, note: 'rows where the CSSOM-serialized minus-shared sheets (D, C) and the .text.css alternates (Dt, Ct) disagree', count: controlDiff.length, rows: controlDiff }, null, '\t'))
writeFileSync(resolve(OUT, 'run.json'), JSON.stringify({ chromiumVersion, fragments: fragments.length, docs: docSummary.length, elapsedSeconds: (Date.now() - started) / 1000, sharedUtilities: sharedUtilities.size, sharedComponents, sharedUtilitiesWithRule: Object.keys(sharedDeclared).length, tailwindTokens: Object.keys(tailwindDeclared).length, tailwindOnly: tailwindOnly.size }, null, '\t'))
console.log('departures', departures.length, 'control rows', controlDiff.length)
