// Instrument: parses the installed Bootstrap 5.3.8 stylesheets (LTR and RTL) with postcss and
// writes an inventory of every selector, custom property, keyframe, and media condition, grouped
// by component through its class-root prefix, plus the RTL differences per component.
// Run from the scaffold checkout: node .orkestrel/veneer/research/inventory.mjs
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import postcss from 'file:///C:/Users/mikes/WebstormProjects/veneer/node_modules/postcss/lib/postcss.mjs'

const VENEER_ROOT = 'C:/Users/mikes/WebstormProjects/veneer'
const BOOTSTRAP_PACKAGE = `${VENEER_ROOT}/node_modules/bootstrap/package.json`
const LTR_PATH = `${VENEER_ROOT}/node_modules/bootstrap/dist/css/bootstrap.css`
const RTL_PATH = `${VENEER_ROOT}/node_modules/bootstrap/dist/css/bootstrap.rtl.css`
const OUTPUT_PATH = fileURLToPath(new URL('./inventory.json', import.meta.url))

const ROOTS = Object.freeze([
	'btn-group', 'btn-toolbar', 'btn-close', 'btn',
	'dropdown', 'dropup', 'dropend', 'dropstart', 'modal', 'offcanvas', 'navbar', 'nav', 'tab',
	'card', 'accordion', 'alert', 'badge',
	'breadcrumb', 'carousel', 'collapsing', 'collapse', 'list-group', 'pagination', 'page',
	'placeholder', 'progress', 'spinner', 'toast', 'tooltip', 'popover', 'fade',
	'form-control', 'form-select', 'form-check', 'form-range', 'form-floating', 'input-group',
	'was-validated', 'valid-feedback', 'invalid-feedback', 'valid-tooltip', 'invalid-tooltip',
	'is-valid', 'is-invalid', 'form',
	'close', 'table', 'caption', 'figure', 'img', 'ratio', 'visually-hidden', 'stretched-link',
	'text-truncate', 'vr', 'container', 'row', 'col', 'g', 'gx', 'gy', 'gap', 'column-gap',
	'row-gap', 'd', 'flex', 'justify-content',
	'align-items', 'align-self', 'align-content', 'align', 'order', 'offset', 'mt', 'mb', 'ms',
	'me', 'mx', 'my', 'pt', 'pb', 'ps',
	'pe', 'px', 'py', 'm', 'p', 'w', 'h', 'mw', 'mh', 'vw', 'vh', 'min', 'text', 'fs', 'fw', 'fst',
	'hstack',
	'vstack',
	'visible',
	'invisible',
	'lh', 'font',
	'bg', 'border', 'rounded', 'shadow', 'position', 'top', 'bottom', 'start', 'end',
	'translate-middle', 'overflow', 'float', 'object-fit', 'opacity', 'z', 'user-select', 'link',
	'icon-link', 'focus-ring', 'sticky', 'fixed', 'clearfix', 'lead', 'display', 'blockquote',
	'initialism', 'mark', 'small', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'list-unstyled',
	'list-inline',
])

const ROOT_ALIASES = Object.freeze({
	page: 'pagination',
	fade: 'transition',
	dropup: 'dropdown',
	dropend: 'dropdown',
	dropstart: 'dropdown',
	tab: 'nav',
	caption: 'table',
})

const REBOOT_ELEMENTS = Object.freeze([
	'html', 'body', 'hr', 'p', 'abbr', 'address', 'ol', 'ul', 'dl', 'dt', 'dd', 'blockquote', 'b',
	'strong', 'a', 'pre', 'code', 'kbd', 'samp', 'figure', 'img', 'svg', 'table', 'caption', 'th',
	'td', 'label', 'button', 'input', 'select', 'optgroup', 'textarea', 'fieldset', 'legend',
	'progress', 'summary', 'template', 'audio', 'video', 'iframe', 'small', 'sub', 'sup', 'dfn',
	'mark', 'cite', '*',
])

const THEME_SELECTORS = Object.freeze([
	':root',
	'[data-bs-theme=dark]', '[data-bs-theme="dark"]',
	'[data-bs-theme=light]', '[data-bs-theme="light"]',
])

function sha256(text) {
	return createHash('sha256').update(text).digest('hex')
}

function readBootstrapVersion() {
	const raw = JSON.parse(readFileSync(BOOTSTRAP_PACKAGE, 'utf8'))
	return raw.version
}

function splitSelectorList(selector) {
	const parts = []
	let depth = 0
	let current = ''
	for (const char of selector) {
		if (char === '(' || char === '[') depth += 1
		if (char === ')' || char === ']') depth -= 1
		if (char === ',' && depth === 0) {
			parts.push(current.trim())
			current = ''
			continue
		}
		current += char
	}
	if (current.trim().length > 0) parts.push(current.trim())
	return parts
}

function parseSimpleSelector(selector) {
	const classes = Array.from(selector.matchAll(/\.([a-zA-Z0-9_-]+)/g)).map((match) => match[1])
	const elements = Array.from(selector.matchAll(/(^|[\s>+~(])([a-zA-Z][a-zA-Z0-9]*)/g))
		.map((match) => match[2])
		.filter((name) => !['not', 'is', 'where', 'has'].includes(name))
	const attributes = Array.from(selector.matchAll(/\[([^\]]+)\]/g)).map((match) => match[1])
	const pseudoClasses = Array.from(selector.matchAll(/:([a-zA-Z-]+)(\([^)]*\))?/g))
		.filter((match) => !match[0].startsWith('::'))
		.map((match) => match[1])
	const pseudoElements = Array.from(selector.matchAll(/::([a-zA-Z-]+)/g)).map((match) => match[1])
	return { classes, elements, attributes, pseudoClasses, pseudoElements }
}

function findEnclosingCondition(node) {
	const conditions = []
	let current = node.parent
	while (current && current.type !== 'root') {
		if (current.type === 'atrule' && ['media', 'supports', 'container', 'layer'].includes(current.name)) {
			conditions.push(`@${current.name} ${current.params}`.trim())
		}
		current = current.parent
	}
	return conditions.length > 0 ? conditions.reverse().join(' ') : undefined
}

function isThemeSelector(selector) {
	const normalized = selector.trim()
	return THEME_SELECTORS.some((theme) => normalized === theme || normalized.startsWith(`${theme} `) || normalized.startsWith(`${theme}[`) || normalized.startsWith(`${theme}:`))
}

function isDarkThemeSelector(selector) {
	const normalized = selector.trim()
	return normalized.includes('[data-bs-theme=dark]') || normalized.includes('[data-bs-theme="dark"]')
}

function isRebootSelector(parsed, selector) {
	if (isThemeSelector(selector)) return false
	return parsed.classes.length === 0
}

function rootsForSelector(parsed) {
	const matched = new Set()
	for (const className of parsed.classes) {
		for (const root of ROOTS) {
			if (className === root || className.startsWith(`${root}-`)) matched.add(root in ROOT_ALIASES ? ROOT_ALIASES[root] : root)
		}
	}
	return Array.from(matched)
}

function rootForKeyframeName(name) {
	if (name.includes('spinner')) return 'spinner'
	if (name.includes('progress')) return 'progress'
	if (name.includes('placeholder')) return 'placeholder'
	for (const root of ROOTS) {
		if (name.includes(root)) return root
	}
	return undefined
}

function emptyComponentBucket() {
	return {
		selectors: [],
		declarations: [],
		properties: {},
		keyframes: [],
		media: [],
		rtl: [],
	}
}

function ensureComponent(components, root) {
	if (!(root in components)) components[root] = emptyComponentBucket()
	return components[root]
}

function walkStylesheet(cssText, filePath) {
	const parsedRoot = postcss.parse(cssText, { from: filePath })
	const components = {}
	const rootVariables = {}
	const darkVariables = {}
	const references = {}
	const keyframes = []
	const media = new Set()
	const unassigned = []

	parsedRoot.walkAtRules('media', (atRule) => {
		media.add(`@media ${atRule.params}`.trim())
	})
	parsedRoot.walkAtRules('supports', (atRule) => {
		media.add(`@supports ${atRule.params}`.trim())
	})
	parsedRoot.walkAtRules('container', (atRule) => {
		media.add(`@container ${atRule.params}`.trim())
	})
	parsedRoot.walkAtRules('keyframes', (atRule) => {
		const steps = []
		atRule.walkRules((stepRule) => {
			steps.push({
				step: stepRule.selector,
				declarations: stepRule.nodes
					.filter((node) => node.type === 'decl')
					.map((decl) => ({ property: decl.prop, value: decl.value })),
			})
		})
		const entry = { name: atRule.params, steps }
		keyframes.push(entry)
		const root = rootForKeyframeName(atRule.params)
		if (root) ensureComponent(components, root).keyframes.push(entry)
	})

	parsedRoot.walkRules((rule) => {
		if (rule.parent && rule.parent.type === 'atrule' && rule.parent.name === 'keyframes') return
		const selectors = splitSelectorList(rule.selector)
		const declarations = rule.nodes
			.filter((node) => node.type === 'decl')
			.map((decl) => ({ property: decl.prop, value: decl.value }))
		const condition = findEnclosingCondition(rule)

		for (const decl of rule.nodes) {
			if (decl.type !== 'decl') continue
			for (const match of decl.value.matchAll(/var\((--bs-[a-zA-Z0-9-]+)/g)) {
				const propertyName = match[1]
				if (!(propertyName in references)) references[propertyName] = []
				references[propertyName].push(decl.prop)
			}
		}

		for (const selector of selectors) {
			const parsed = parseSimpleSelector(selector)
			const matchedRoots = rootsForSelector(parsed)
			const isTheme = isThemeSelector(selector)
			const isReboot = isRebootSelector(parsed, selector)
			const entry = { selector, declarations, condition, classes: parsed.classes, elements: parsed.elements, attributes: parsed.attributes, pseudoClasses: parsed.pseudoClasses, pseudoElements: parsed.pseudoElements }

			if (isTheme) {
				const target = isDarkThemeSelector(selector) ? darkVariables : rootVariables
				for (const decl of rule.nodes) {
					if (decl.type !== 'decl' || !decl.prop.startsWith('--bs-')) continue
					target[decl.prop] = decl.value
				}
				ensureComponent(components, 'theme').selectors.push(entry)
				continue
			}
			if (isReboot) {
				ensureComponent(components, 'reboot').selectors.push(entry)
				continue
			}
			if (matchedRoots.length === 0) {
				unassigned.push(entry)
				continue
			}
			for (const root of matchedRoots) {
				const bucket = ensureComponent(components, root)
				bucket.selectors.push(entry)
				for (const decl of declarations) bucket.declarations.push({ selector, ...decl })
				for (const decl of rule.nodes) {
					if (decl.type !== 'decl' || !decl.prop.startsWith('--bs-')) continue
					if (!(decl.prop in bucket.properties)) bucket.properties[decl.prop] = []
					bucket.properties[decl.prop].push({ selector, value: decl.value })
				}
			}
		}
	})

	return { components, rootVariables, darkVariables, references, keyframes, media: Array.from(media), unassigned }
}

function collectDeclarationsBySelector(bucket) {
	const bySelector = new Map()
	for (const decl of bucket.declarations) {
		if (!bySelector.has(decl.selector)) bySelector.set(decl.selector, new Map())
		bySelector.get(decl.selector).set(decl.property, decl.value)
	}
	return bySelector
}

function diffComponentRtl(ltrBucket, rtlBucket) {
	const differences = []
	const ltrBySelector = collectDeclarationsBySelector(ltrBucket)
	const rtlBySelector = collectDeclarationsBySelector(rtlBucket)
	for (const [selector, ltrProperties] of ltrBySelector) {
		const rtlProperties = rtlBySelector.get(selector)
		if (!rtlProperties) continue
		for (const [property, ltrValue] of ltrProperties) {
			const rtlValue = rtlProperties.get(property)
			if (rtlValue !== undefined && rtlValue !== ltrValue) {
				differences.push({ selector, property, ltr: ltrValue, rtl: rtlValue })
			}
		}
	}
	return differences
}

function buildCounts(components, unassigned) {
	const counts = {}
	for (const [root, bucket] of Object.entries(components)) {
		counts[root] = {
			selectors: bucket.selectors.length,
			declarations: bucket.declarations.length,
			properties: Object.keys(bucket.properties).length,
			keyframes: bucket.keyframes.length,
			media: bucket.media.length,
		}
	}
	counts.unassigned = unassigned.length
	return counts
}

function run() {
	let ltrText
	let rtlText
	try {
		ltrText = readFileSync(LTR_PATH, 'utf8')
		rtlText = readFileSync(RTL_PATH, 'utf8')
	} catch (error) {
		console.error(`Failed to read stylesheet: ${error instanceof Error ? error.message : String(error)}`)
		process.exitCode = 1
		return
	}

	let ltrWalk
	let rtlWalk
	try {
		ltrWalk = walkStylesheet(ltrText, LTR_PATH)
		rtlWalk = walkStylesheet(rtlText, RTL_PATH)
	} catch (error) {
		console.error(`postcss failed to parse a stylesheet: ${error instanceof Error ? error.message : String(error)}`)
		process.exitCode = 1
		return
	}

	const componentRoots = new Set([...Object.keys(ltrWalk.components), ...Object.keys(rtlWalk.components)])
	for (const root of componentRoots) {
		const ltrBucket = ensureComponent(ltrWalk.components, root)
		const rtlBucket = ensureComponent(rtlWalk.components, root)
		ltrBucket.rtl = diffComponentRtl(ltrBucket, rtlBucket)
	}

	const mergedMedia = Array.from(new Set([...ltrWalk.media, ...rtlWalk.media]))
	const counts = buildCounts(ltrWalk.components, ltrWalk.unassigned)

	const output = {
		version: readBootstrapVersion(),
		digests: {
			'bootstrap.css': sha256(ltrText),
			'bootstrap.rtl.css': sha256(rtlText),
		},
		components: ltrWalk.components,
		root: ltrWalk.rootVariables,
		dark: ltrWalk.darkVariables,
		references: ltrWalk.references,
		keyframes: ltrWalk.keyframes,
		media: mergedMedia,
		unassigned: ltrWalk.unassigned,
		counts,
	}

	writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 1))

	for (const [root, count] of Object.entries(counts)) {
		if (root === 'unassigned') continue
		console.log(`${root}: ${count.selectors} selectors`)
	}
	console.log(`unassigned: ${counts.unassigned}`)
}

run()
