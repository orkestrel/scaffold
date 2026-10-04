import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { createServer } from 'node:http'
import { dirname, resolve, extname } from 'node:path'
import { createRequire } from 'node:module'
import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'

export const ROOT = '/home/user/veneer'
export const OUT = resolve(ROOT, 'tmp/probes/flip3')
export const ORDER = '@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;'
export const REQUIRE = createRequire(resolve(ROOT, 'package.json'))
export const SASS = REQUIRE('sass')
export const TAILWIND = REQUIRE('tailwindcss')
export const CORE = await import(resolve(ROOT, 'dist/src/core/index.js'))
for (const folder of ['out', 'sheets', 'sass/tailwindcss']) mkdirSync(resolve(OUT, folder), { recursive: true })

export function collectLeaves(tree: unknown): string[] {
	if (typeof tree === 'string') return [tree]
	if (tree && typeof tree === 'object') return Object.values(tree).flatMap(collectLeaves)
	return []
}
export const COMPONENTS = collectLeaves(CORE.CLASS_NAMES.bootstrap.components)
export const UTILITIES = collectLeaves(CORE.CLASS_NAMES.bootstrap.utilities)
export const COMPARISON = 'tests/fixtures/tailwindcss/comparison.json'
export const SHARED = JSON.parse(readFileSync(resolve(ROOT, COMPARISON), 'utf8')).shared.filter((name: string) => UTILITIES.includes(name)).sort()
export const EXCLUDED = [...new Set(collectLeaves(CORE.CLASS_NAMES.bootstrap))].filter((name) => !SHARED.includes(name)).sort()
export const CANDIDATES: string[] = JSON.parse(readFileSync(resolve(ROOT, 'app/browser/recipe.json'), 'utf8')).candidates
export const LIFTED = readFileSync(resolve(ROOT, 'dist/src/bootstrap/index.css'), 'utf8')
export const TAILWIND_SOURCE = readFileSync(resolve(ROOT, 'app/browser/constants.ts'), 'utf8').split('export const TAILWIND_CLASSES: readonly string[] = Object.freeze([')[1]?.split('])')[0]
if (!TAILWIND_SOURCE) throw new Error('TAILWIND_CLASSES literal absent')
export const ATTRIBUTION_NAMES = [...new Set([...SHARED, ...[...TAILWIND_SOURCE.matchAll(/'([^']+)'/g)].map((match) => match[1])])].sort()

export function digestText(value: string): string {
	return createHash('sha256').update(value).digest('hex')
}
export function writeJSON(name: string, value: unknown): void {
	writeFileSync(resolve(OUT, name), JSON.stringify(value, null, '\t') + '\n')
}
export function readSheet(name: string): string {
	return readFileSync(resolve(OUT, 'sheets', name), 'utf8')
}
export async function compileRecipe(candidates = CANDIDATES, veneer = true, sheet = 'tuned.css'): Promise<string> {
	const compiler = await TAILWIND.compile(`${ORDER}\n@import 'tailwindcss';${veneer ? "\n@import '@orkestrel/veneer/tailwindcss';" : ''}`, {
		base: resolve(ROOT, 'node_modules/tailwindcss'),
		loadStylesheet: async (id: string, base: string) => {
			const path = id === '@orkestrel/veneer/tailwindcss' ? resolve(OUT, 'sheets', sheet) : id === 'tailwindcss' ? resolve(ROOT, 'node_modules/tailwindcss/index.css') : resolve(base, id)
			return { path, base: dirname(path), content: readFileSync(path, 'utf8') }
		},
	})
	return compiler.build([...candidates])
}
export async function launchBrowser() {
	const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
	writeFileSync(resolve(OUT, 'chromium.txt'), browser.version())
	return browser
}
export function flattenSheet(input: { text: string; drop?: string[] }) {
	const sheet = new CSSStyleSheet()
	sheet.replaceSync(input.text)
	const pending = [...sheet.cssRules].map((rule) => ({ rule, context: '', selector: '' }))
	const rows: { context: string; selector: string; property: string; value: string; priority: string }[] = []
	const rules: { context: string; selector: string; declarations: string }[] = []
	while (pending.length) {
		const entry = pending.shift()
		if (!entry) continue
		const { rule, context } = entry
		if (rule instanceof CSSStyleRule) {
			const selector = rule.selectorText.includes('&') ? rule.selectorText.replaceAll('&', entry.selector) : rule.selectorText
			rules.push({ context, selector, declarations: rule.style.cssText })
			for (let i = 0; i < rule.style.length; i++) {
				const property = rule.style[i]
				rows.push({ context, selector, property, value: rule.style.getPropertyValue(property), priority: rule.style.getPropertyPriority(property) })
			}
			pending.unshift(...[...rule.cssRules].map((child) => ({ rule: child, context, selector })))
		} else if (rule instanceof CSSLayerBlockRule || rule instanceof CSSMediaRule || rule instanceof CSSSupportsRule) {
			if (rule instanceof CSSLayerBlockRule && input.drop?.includes(rule.name)) continue
			const label = rule instanceof CSSLayerBlockRule ? `@layer ${rule.name}` : rule instanceof CSSMediaRule ? `@media ${rule.conditionText}` : `@supports ${rule.conditionText}`
			pending.unshift(...[...rule.cssRules].map((child) => ({ rule: child, context: context ? `${context} > ${label}` : label, selector: entry.selector })))
		} else if ('style' in rule && rule.style instanceof CSSStyleDeclaration) {
			rules.push({ context, selector: entry.selector, declarations: rule.style.cssText })
			for (let i = 0; i < rule.style.length; i++) {
				const property = rule.style[i]
				rows.push({ context, selector: entry.selector, property, value: rule.style.getPropertyValue(property), priority: rule.style.getPropertyPriority(property) })
			}
		}
	}
	return { rows, rules }
}
export function compileTuned(curated: readonly string[], restored: Record<string, readonly string[]>, filename = 'tuned.css'): string {
	const tokens = `$shared: (${SHARED.map((name: string) => `'${name}'`).join(',')});\n$curation: (${curated.map((name) => `'${name}'`).join(',')}${curated.length === 1 ? ',' : ''});\n$defaults: (${Object.entries(restored).map(([selector, properties]) => `'${selector}': (${properties.join(',')},)`).join(',')});\n@use '../bootstrap/tokens' with ($withhold: $shared, $reset: true, $curated: $curation, $restored: $defaults);\n@source not inline("${EXCLUDED.join(' ')}");\n`
	writeFileSync(resolve(OUT, 'sass/tailwindcss/_tokens.scss'), tokens)
	writeFileSync(resolve(OUT, 'sass/tailwindcss/index.scss'), "@use 'tokens';\n@use '../bootstrap/reset';\n@use '../bootstrap/elements';\n@use '../bootstrap/components';\n@use '../bootstrap/utilities';\n")
	const css = SASS.compile(resolve(OUT, 'sass/tailwindcss/index.scss')).css
	writeFileSync(resolve(OUT, 'sheets', filename), css)
	return css
}
export async function startServer() {
	const server = createServer((request, response) => {
		const pathname = new URL(request.url ?? '/', 'http://127.0.0.1').pathname
		const file = resolve(ROOT, 'dist/app/browser', pathname === '/' ? 'index.html' : pathname.slice(1))
		try {
			const content = readFileSync(file)
			const types: Record<string, string> = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' }
			response.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' })
			response.end(content)
		} catch {
			response.writeHead(404)
			response.end('Not found')
		}
	})
	await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
	const address = server.address()
	if (!address || typeof address === 'string') throw new Error('No loopback address')
	return { server, url: `http://127.0.0.1:${address.port}` }
}
