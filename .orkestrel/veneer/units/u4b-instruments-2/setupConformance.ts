// Conformance setup: the identity of the official Bootstrap artifact this package tracks and the
// helpers the conformance proof measures the workspace with. Node-only. The `conformance` project
// loads it from `tests/conformance.test.ts`, and the `setup` project loads it from
// `tests/setupConformance.test.ts` and from `tests/setupStyles.test.ts`, which reads the installed
// cascade through `readBootstrapCascade`. A helper added here runs under every one of them.

import type { ESTree } from 'vite'
import type { Locator } from 'playwright'
import { isRecord, parseJSON } from '@orkestrel/contract'
import {
	createGuide,
	extractCellText,
	findColumnIndex,
	selectSectionBlocks,
} from '@orkestrel/guide'
import { createMarkdown } from '@orkestrel/markdown'
import { createScratch, resolveContained } from '@orkestrel/test/server'
import { createHash } from 'node:crypto'
import { createRequire } from 'node:module'
import { existsSync, readFileSync, realpathSync } from 'node:fs'
import { dirname, extname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { chromium } from 'playwright'
import { resolveBrowser, resolvePinnedBrowser } from '../configs/browsers.js'
import { BOOTSTRAP_CASCADE_PATH } from './setupStyles.js'
import { compile } from 'sass'
import { parseSync, Visitor } from 'vite'

/** Describes one compatibility obligation read from the guide's ledger. */
export interface CompatibilityRow {
	readonly component: string
	readonly category: string
	readonly obligation: string
	readonly proof: string | undefined
	readonly status: 'accepted' | 'shipped'
}

/** Describes the observable state after an oracle action. */
export interface OracleReading {
	readonly events: readonly string[]
	readonly classes: readonly string[]
	readonly attributes: Readonly<Record<string, string>>
	readonly mutations: readonly string[]
	readonly clicks: readonly boolean[]
	readonly focus: string | undefined
	readonly accessibility: string
	readonly refusal: string | undefined
	readonly identity: Readonly<Record<string, string>>
}

/** Describes a named action and the state on each side of it. */
export interface OracleStep {
	readonly name: string
	readonly before: OracleReading
	readonly after: OracleReading
}

/** Describes the official release recording and any explicitly excluded actions. */
export interface OracleFixture {
	readonly version: string
	readonly component: string
	readonly steps: readonly OracleStep[]
	readonly excluded: ReadonlyArray<{ readonly step: string; readonly reason: string }>
}

/** Describes the official CSS vocabulary assigned to a component key. */
export interface OracleVocabulary {
	readonly selectors: readonly string[]
	readonly properties: readonly string[]
}

/** Describes the pinned inventory projection the presence proof reads. */
export interface OracleInventory {
	readonly version: string
	readonly digests: Readonly<Record<string, string>>
	readonly components: Readonly<Record<string, OracleVocabulary>>
}

/** Names the Bootstrap release this package tracks, pinned exactly in `package.json`. */
export const BOOTSTRAP_VERSION = '5.3.8'

/** Sets the recorder budget from its 2550 ms contended run: twice that duration plus 5000 ms. */
export const ORACLE_TIMEOUT = 10_100

/** Pins the installed Bootstrap LTR stylesheet's SHA-256 digest. */
export const BOOTSTRAP_CSS_DIGEST =
	'4a50207b956a4ab943640ee993118b554a34e96a23261cfe58b9aa1807a7849b'

/** Pins the installed Bootstrap RTL stylesheet's SHA-256 digest. */
export const BOOTSTRAP_RTL_CSS_DIGEST =
	'39911412c957c60512a4b23a0ea1903ed5f3a0f9f7bb7446c55a99bb2e5f7463'

/** Pins the installed Bootstrap JavaScript bundle's SHA-256 digest. */
export const BOOTSTRAP_BUNDLE_DIGEST =
	'69566344cf5722be51acbc90fdb26c24eb01cc1c153f738b16b2fa87ccd3b510'

/** Lists the package names and scope prefixes excluded from runtime imports. */
export const FORBIDDEN_RUNTIME = Object.freeze([
	'vue',
	'@vue/',
	'bootstrap',
	'@popperjs/',
	'tailwindcss',
	'@tailwindcss/',
])

/** Names the workspace root as a host path. */
export const WORKSPACE_ROOT = fileURLToPath(new URL('../', import.meta.url))

/** Locates the installed Bootstrap manifest through this workspace's own dependency tree. */
export const BOOTSTRAP_MANIFEST_PATH = resolve(
	dirname(createRequire(import.meta.url).resolve('bootstrap/package.json')),
	'package.json',
)

/**
 * Reads one string member of a JSON manifest.
 *
 * @param path - The manifest path.
 * @param member - The top-level member to read.
 * @returns The member's string value, or `undefined` when absent or not a string.
 *
 * @example
 * ```ts
 * readManifestMember(BOOTSTRAP_MANIFEST_PATH, 'version') // '5.3.8'
 * ```
 */
export function readManifestMember(path: string, member: string): string | undefined {
	const parsed = parseJSON(readFileSync(path, 'utf8'))
	if (!isRecord(parsed)) return undefined
	const value = parsed[member]
	return typeof value === 'string' ? value : undefined
}

/**
 * Scans a manifest for a forbidden runtime dependency.
 * @param manifestText - The JSON manifest text.
 * @param names - Exact package names or scope prefixes ending in a slash.
 * @returns The forbidden package name, or `undefined` when none is declared.
 */
export function scanForbiddenDependency(
	manifestText: string,
	names: readonly string[],
): string | undefined {
	const manifest = parseJSON(manifestText)
	if (!isRecord(manifest)) throw new Error('The dependency manifest must be a JSON object')
	for (const section of ['dependencies', 'peerDependencies', 'optionalDependencies']) {
		const dependencies = manifest[section]
		if (dependencies === undefined) continue
		if (!isRecord(dependencies)) throw new Error(`Manifest ${section} must be an object`)
		for (const dependency of Object.keys(dependencies)) {
			if (
				names.some((name) =>
					name.endsWith('/') ? dependency.startsWith(name) : dependency === name,
				)
			)
				return dependency
		}
	}
	return undefined
}

/**
 * Extracts the string a call argument carries as a literal.
 * @param node - An argument node, such as an `import(...)` source or a `require(...)` argument.
 * @returns The string for a string literal or for a template literal with no substitution, and
 * `undefined` for every other node, a substituted template literal and an identifier included.
 */
export function extractStringArgument(node: ESTree.Argument): string | undefined {
	if (node.type === 'Literal' && typeof node.value === 'string') return node.value
	if (node.type === 'TemplateLiteral' && node.expressions.length === 0) {
		const cooked = node.quasis[0]?.value.cooked
		if (cooked !== undefined && cooked !== null) return cooked
	}
	return undefined
}

/**
 * Extracts literal import and re-export specifiers through Vite's parser.
 * Parses with the `preserveParens` option disabled, so a parenthesized argument or callee reaches
 * the visitor as the expression it wraps.
 * @param text - A JavaScript, TypeScript, or declaration module.
 * @returns The module specifiers in source order, including type imports, and the literal
 * argument of a dynamic import and of a `require(...)` call, each read through
 * {@link extractStringArgument}.
 */
export function extractSpecifiers(text: string): readonly string[] {
	const parsed = parseSync('module.ts', text, { preserveParens: false })
	if (parsed.errors.length > 0)
		throw new Error(parsed.errors.map((error) => error.message).join('\n'))
	const specifiers: string[] = []
	new Visitor({
		ImportDeclaration(node) {
			specifiers.push(node.source.value)
		},
		ExportNamedDeclaration(node) {
			if (node.source !== null) specifiers.push(node.source.value)
		},
		ExportAllDeclaration(node) {
			specifiers.push(node.source.value)
		},
		ImportExpression(node) {
			const specifier = extractStringArgument(node.source)
			if (specifier !== undefined) specifiers.push(specifier)
		},
		TSImportType(node) {
			specifiers.push(node.source.value)
		},
		TSExternalModuleReference(node) {
			specifiers.push(node.expression.value)
		},
		CallExpression(node) {
			if (node.callee.type !== 'Identifier' || node.callee.name !== 'require') return
			const argument = node.arguments[0]
			if (argument === undefined) return
			const specifier = extractStringArgument(argument)
			if (specifier !== undefined) specifiers.push(specifier)
		},
	}).visit(parsed.program)
	return specifiers
}

/**
 * Scans a source module for a forbidden import specifier.
 * @param source - The source text to inspect.
 * @param names - Exact package names or scope prefixes ending in a slash.
 * @returns The forbidden specifier, or `undefined` when none occurs.
 */
export function scanForbiddenSource(source: string, names: readonly string[]): string | undefined {
	return extractSpecifiers(source).find((specifier) =>
		names.some((name) =>
			name.endsWith('/')
				? specifier.startsWith(name)
				: specifier === name || specifier.startsWith(`${name}/`),
		),
	)
}

/**
 * Scans a module for a relative import whose resolved path escapes the supplied root.
 * @param path - The importing module's path.
 * @param source - The module text.
 * @param root - The permitted root directory.
 * @returns The escaping specifier, or `undefined` when every relative import stays inside.
 */
export function scanEscapingImport(path: string, source: string, root: string): string | undefined {
	return extractSpecifiers(source).find((specifier) => {
		if (!specifier.startsWith('.')) return false
		const target = resolve(dirname(path), specifier)
		const resolved = existsSync(target) ? realpathSync(target) : target
		return resolveContained(resolve(root), resolved) === undefined
	})
}

/**
 * Collects the transitive file closure of a source entry's relative imports.
 * @param entry - The entry file to resolve.
 * @returns Absolute filenames including the entry and Sass compiler dependencies.
 * @throws When a relative import cannot resolve.
 */
export function collectImportClosure(entry: string): ReadonlySet<string> {
	const files = new Set<string>()
	const pending = [realpathSync(entry)]
	while (pending.length > 0) {
		const path = pending.pop()
		if (path === undefined || files.has(path)) continue
		files.add(path)
		if (extname(path) === '.scss') {
			for (const url of compile(path).loadedUrls) files.add(realpathSync(fileURLToPath(url)))
			continue
		}
		for (const specifier of extractSpecifiers(readFileSync(path, 'utf8'))) {
			if (!specifier.startsWith('.')) continue
			const location = resolve(dirname(path), specifier)
			const target = [
				location,
				location.replace(/\.js$/u, '.ts'),
				location.replace(/\.mjs$/u, '.mts'),
				location.replace(/\.cjs$/u, '.cts'),
			].find((candidate) => existsSync(candidate))
			if (target === undefined)
				throw new Error(`Unresolved relative import ${specifier} from ${path}`)
			pending.push(realpathSync(target))
		}
	}
	return files
}

/**
 * Reads the installed Bootstrap stylesheet the compatibility oracle measures.
 *
 * @returns The stylesheet's text, read from `BOOTSTRAP_CASCADE_PATH`.
 *
 * @remarks
 * `tests/setupStyles.ts` holds that path and not this text, because the browser projects load it
 * and it takes no `node:fs` import. This module is Node-only, so the read lives here and every
 * Node proof needing the text calls this instead of repeating the read at case scope.
 */
export function readBootstrapCascade(): string {
	return readFileSync(BOOTSTRAP_CASCADE_PATH, 'utf8')
}

/**
 * Computes the SHA-256 digest of one tracked artifact's exact bytes.
 * @param path - The artifact to read.
 * @returns The lowercase hexadecimal digest.
 * @throws When the path names no readable file, so a missing artifact fails the proof rather than
 * reading as an absence.
 */
export function computeArtifactDigest(path: string): string {
	return createHash('sha256').update(readFileSync(path)).digest('hex')
}

/**
 * Reads the compatibility ledger through the guide's section and table projections.
 * @param path - The Markdown document to read; defaults to the package guide.
 * @returns The declared obligations in document order.
 * @throws When the section, a column, a required cell, or a status is invalid.
 */
export function readCompatibility(
	path: string = resolve(WORKSPACE_ROOT, 'guides/veneer.md'),
): readonly CompatibilityRow[] {
	const source = readFileSync(path, 'utf8')
	if (!createGuide(source).sections().includes('Compatibility'))
		throw new Error('Compatibility row <header>: missing section')
	const rows: CompatibilityRow[] = []
	const tables = selectSectionBlocks(createMarkdown(source).document, 'Compatibility').filter(
		(block) => block.element === 'table',
	)
	if (tables.length === 0) throw new Error('Compatibility row <header>: missing table')
	for (const table of tables) {
		const columns = ['Component', 'Kind', 'Obligation', 'Proof', 'Status'].map((header) => {
			const index = findColumnIndex(table, header)
			if (index === undefined)
				throw new Error(`Compatibility row <header>: missing ${header} column`)
			return index
		})
		for (const row of table.rows) {
			const [component, category, obligation, proof, status] = columns.map((index) =>
				extractCellText(row[index] ?? []).trim(),
			)
			const label = `${component}: ${obligation}`
			if (!component || !category || !obligation || !proof)
				throw new Error(`Compatibility row ${label}: missing required cell`)
			if (status !== 'accepted' && status !== 'shipped')
				throw new Error(`Compatibility row ${label}: invalid status ${status}`)
			rows.push({
				component,
				category,
				obligation,
				proof: proof === '—' ? undefined : proof,
				status,
			})
		}
	}
	return rows
}

/**
 * Reads the built Veneer cascade whose component vocabulary must match the inventory.
 * @param path - The built CSS artifact; defaults to the published stylesheet.
 * @returns The artifact's exact text.
 * @throws When the styles build has not produced the artifact.
 */
export function readBuiltCascade(
	path: string = resolve(WORKSPACE_ROOT, 'dist/src/styles/index.css'),
): string {
	return readFileSync(path, 'utf8')
}

/**
 * Reads the official control's classes, attributes, focus, and accessible snapshot.
 * @param target - The control resolved by role and accessible name.
 * @returns The control's state before event and mutation observations are attached.
 */
export async function readOracleControl(target: Locator): Promise<OracleReading> {
	const state = await target.evaluate((element) => ({
		classes: [...element.classList],
		attributes: Object.fromEntries(
			[...element.attributes].map((attribute) => [attribute.name, attribute.value]),
		),
	}))
	const accessibility = await target.ariaSnapshot()
	const focused = target.page().locator(':focus')
	const focus =
		(await focused.count()) === 0
			? undefined
			: (await focused.ariaSnapshot()).match(/^\s*- \w+ "([^"]*)"/u)?.[1]
	const identity = await target.evaluate((element) => {
		const view = element.ownerDocument.defaultView
		if (view === null) throw new Error('Button has no document window')
		const bundle: unknown = Reflect.get(view, 'bootstrap')
		if (typeof bundle !== 'object' || bundle === null)
			throw new Error('Bootstrap bundle did not load')
		const button: unknown = Reflect.get(bundle, 'Button')
		if (typeof button !== 'function') throw new Error('Bootstrap Button did not load')
		const values: Record<string, string> = {}
		for (const key of ['NAME', 'DATA_KEY', 'EVENT_KEY', 'VERSION', 'Default', 'DefaultType']) {
			const value: unknown = Reflect.get(button, key)
			values[key] = typeof value === 'string' ? value : JSON.stringify(value)
		}
		return values
	})
	return {
		events: [],
		classes: state.classes,
		attributes: state.attributes,
		mutations: [],
		clicks: [],
		focus,
		accessibility,
		refusal: undefined,
		identity,
	}
}

/**
 * Reads and validates the CSS inventory copied from the accepted research artifact.
 * @param path - The JSON inventory; defaults to the oracle's data fixture.
 * @returns Its release, digests, and component vocabulary.
 * @throws When the inventory omits a required field or carries a malformed component.
 */
export function readOracleInventory(
	path: string = resolve(WORKSPACE_ROOT, 'tests/fixtures/oracle/inventory.json'),
): OracleInventory {
	const inventory = parseJSON(readFileSync(path, 'utf8'))
	if (
		!isRecord(inventory) ||
		typeof inventory.version !== 'string' ||
		!isRecord(inventory.digests) ||
		!isRecord(inventory.components)
	)
		throw new Error('Invalid oracle inventory header')
	const digests: Record<string, string> = {}
	for (const [name, digest] of Object.entries(inventory.digests)) {
		if (typeof digest !== 'string') throw new Error(`Invalid oracle inventory digest ${name}`)
		digests[name] = digest
	}
	const components: Record<string, OracleVocabulary> = {}
	for (const [name, component] of Object.entries(inventory.components)) {
		if (
			!isRecord(component) ||
			!Array.isArray(component.selectors) ||
			!isRecord(component.properties)
		)
			throw new Error(`Invalid oracle inventory component ${name}`)
		const selectors = component.selectors.map((entry: unknown) => {
			if (!isRecord(entry) || typeof entry.selector !== 'string')
				throw new Error(`Invalid oracle inventory selector ${name}`)
			return entry.selector
		})
		components[name] = { selectors, properties: Object.keys(component.properties) }
	}
	return { version: inventory.version, digests, components }
}

/**
 * Scans one guide obligation for disagreement with its named live oracle step.
 * @param row - The guide row to check.
 * @param fixture - The official recording to compare.
 * @returns A row-specific failure, or undefined when the obligation agrees or has no drive.
 */
export function scanOracleObligation(
	row: CompatibilityRow,
	fixture: OracleFixture,
): string | undefined {
	if (row.proof === undefined) return undefined
	const label = `Compatibility row ${row.component} | ${row.category} | ${row.obligation} | ${row.proof}`
	const step = fixture.steps.find((candidate) => candidate.name === row.proof)
	if (row.component !== fixture.component || step === undefined)
		return `${label}: missing recording step`
	const before = step.before
	const after = step.after
	let agrees = false
	if (
		row.obligation ===
		'Button identifies itself as button, bs.button, and .bs.button; defaults and type defaults are inherited empty.'
	) {
		agrees =
			after.identity.NAME === 'button' &&
			after.identity.DATA_KEY === 'bs.button' &&
			after.identity.EVENT_KEY === '.bs.button' &&
			after.identity.Default === '{}' &&
			after.identity.DefaultType === '{}'
	} else if (
		row.obligation ===
		'The data-bs-toggle="button" click prevents its default action and creates or reuses the instance to toggle active and aria-pressed.'
	) {
		agrees =
			after.clicks.length > 0 &&
			after.clicks.every(Boolean) &&
			before.classes.includes('active') !== after.classes.includes('active') &&
			after.attributes['aria-pressed'] === String(after.classes.includes('active'))
	} else if (
		row.obligation ===
		'toggle() flips active and aria-pressed on every activation, without a no-op guard.'
	) {
		agrees =
			before.classes.includes('active') !== after.classes.includes('active') &&
			after.attributes['aria-pressed'] === String(after.classes.includes('active')) &&
			after.mutations.includes('class') &&
			after.mutations.includes('aria-pressed')
	} else if (
		row.obligation ===
		'A toggle announces the button role and its pressed state, rather than a checkbox role.'
	) {
		agrees =
			after.accessibility.startsWith('- button ') &&
			after.accessibility.includes('[pressed]') === (after.attributes['aria-pressed'] === 'true')
	} else if (
		row.obligation ===
		'A disabled anchor carries disabled, aria-disabled="true", tabindex="-1", and role="button"; pointer activation is refused.'
	) {
		agrees =
			after.classes.includes('disabled') &&
			after.attributes['aria-disabled'] === 'true' &&
			after.attributes.tabindex === '-1' &&
			after.attributes.role === 'button' &&
			after.refusal === 'element is not enabled' &&
			after.clicks.length === 0 &&
			after.mutations.length === 0
	} else if (
		row.obligation === 'Space activates the focused toggle button.' ||
		row.obligation === 'Enter activates the focused toggle button.'
	) {
		agrees =
			before.focus === 'Toggle' &&
			after.focus === 'Toggle' &&
			after.clicks.includes(true) &&
			before.classes.includes('active') !== after.classes.includes('active') &&
			after.attributes['aria-pressed'] === String(after.classes.includes('active'))
	} else if (row.category === 'event') {
		const events = row.obligation.match(/[\w-]+\.bs\.button/gu) ?? []
		agrees = events.length > 0 && events.every((event) => after.events.includes(event))
	} else return `${label}: obligation has no oracle predicate`
	return agrees ? undefined : `${label}: recording contradicts obligation`
}

/**
 * Records Button under the installed official CSS and bundle using trusted browser input.
 * @returns The ordered recording, without writing or accepting a baseline.
 * @throws When browser launch, page loading, or an unexpected input failure is refused.
 * @remarks The scratch page contains only Bootstrap assets and official Button markup.
 * The official Button source registers click.bs.button.data-api and emits no custom events.
 */
export async function recordButtonOracle(): Promise<OracleFixture> {
	const options = resolveBrowser(resolvePinnedBrowser(), process.platform, process.env)
	if (options.connectOptions !== undefined)
		throw new Error('The oracle requires a local browser executable, not a remote connection')
	const browser = await chromium.launch({ ...options.launchOptions, headless: true })
	const scratch = createScratch()
	try {
		scratch.write('bootstrap.css', readBootstrapCascade())
		scratch.write(
			'bootstrap.bundle.js',
			readFileSync(
				resolve(dirname(BOOTSTRAP_MANIFEST_PATH), 'dist/js/bootstrap.bundle.js'),
				'utf8',
			),
		)
		const path = scratch.write(
			'button.html',
			'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Button oracle</title><link rel="stylesheet" href="bootstrap.css"></head><body><button type="button" class="btn btn-primary" data-bs-toggle="button">Toggle</button><button type="button" class="btn btn-primary active" data-bs-toggle="button" aria-pressed="true">Pressed</button><a class="btn btn-primary disabled" role="button" aria-disabled="true" tabindex="-1" href="#" data-bs-toggle="button">Disabled</a><script src="bootstrap.bundle.js"></script></body></html>',
		)
		const page = await browser.newPage()
		const steps: OracleStep[] = []
		for (const reduced of [false, true]) {
			await page.emulateMedia({ reducedMotion: reduced ? 'reduce' : 'no-preference' })
			await page.goto(pathToFileURL(path).href)
			for (const action of [
				'initial',
				'click.toggle',
				'click.release',
				'keyboard.space',
				'keyboard.enter',
				'hover',
				'pointer.hold',
				'pointer.release',
				'pressed.initial',
				'pressed.click',
				'disabled.click',
			]) {
				const name = action.startsWith('pressed.')
					? 'Pressed'
					: action.startsWith('disabled.')
						? 'Disabled'
						: 'Toggle'
				const target = page.getByRole('button', { name, exact: true })
				const before = await readOracleControl(target)
				const observation = await target.evaluateHandle((element) => {
					const events: string[] = []
					const mutations: string[] = []
					const clicks: boolean[] = []
					const controller = new AbortController()
					for (const event of [
						'click.bs.button.data-api',
						'toggle.bs.button',
						'toggled.bs.button',
					]) {
						element.addEventListener(
							event,
							(received) => {
								events.push(received.type)
							},
							{ signal: controller.signal },
						)
					}
					element.ownerDocument.addEventListener(
						'click',
						(event) => {
							if (event.target === element) clicks.push(event.defaultPrevented)
						},
						{ signal: controller.signal },
					)
					const observer = new MutationObserver((records) => {
						for (const record of records) {
							if (record.attributeName !== null) mutations.push(record.attributeName)
						}
					})
					observer.observe(element, { attributes: true })
					return { events, mutations, clicks, observer, controller }
				})
				let refusal: string | undefined
				try {
					if (action === 'disabled.click') {
						try {
							await target.click({ timeout: 500 })
						} catch (error) {
							if (!(error instanceof Error) || !error.message.includes('element is not enabled'))
								throw error
							refusal = 'element is not enabled'
						}
					} else if (action.startsWith('click.') || action === 'pressed.click') await target.click()
					else if (action === 'keyboard.space' || action === 'keyboard.enter') {
						await target.press(action === 'keyboard.space' ? 'Space' : 'Enter')
					} else if (action === 'hover' || action === 'pointer.hold') {
						await target.hover()
						if (action === 'pointer.hold') await page.mouse.down()
					} else if (action === 'pointer.release') await page.mouse.up()
					const after = await readOracleControl(target)
					const captured = await observation.evaluate((value) => ({
						events: value.events,
						mutations: value.mutations,
						clicks: value.clicks,
					}))
					steps.push({
						name: `button.${reduced ? 'reduced.' : ''}${action}`,
						before,
						after: { ...after, ...captured, refusal },
					})
				} finally {
					await observation.evaluate((value) => {
						value.observer.disconnect()
						value.controller.abort()
					})
					await observation.dispose()
				}
			}
		}
		return { version: BOOTSTRAP_VERSION, component: 'btn', steps, excluded: [] }
	} finally {
		await browser.close()
		scratch.destroy()
	}
}
