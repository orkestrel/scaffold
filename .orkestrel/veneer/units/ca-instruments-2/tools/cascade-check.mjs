// Compares the carousel rules a cascade writes against the official inventory, rule by rule.
//
// Usage, from the root of a checkout: node cascade-check.mjs expanded|built [ROOT]
//
// - `expanded` compiles `src/styles/index.scss` with the installed `sass` compiler in expanded style,
//   at the load paths the build uses; that is the compile the ledger reads.
// - `built` reads the published artifact `dist/src/styles/index.css` the bundler writes.
//
// Every block whose selector names a carousel class (or the swipe class) is grouped by its selector
// and the condition it sits under, in the order each key is first written, and the inventory's
// `carousel` entries are grouped the same way. The run compares:
// - the key sequence (selector order and conditions): a missing key, an extra key, or a key out of
//   order reads red;
// - each key's declarations: a value that differs from the recorded value reads red unless the
//   `#### carousel` table in `guides/veneer.md` records that exact departure (Bootstrap value to
//   Veneer value), and, in `built` mode only, unless the difference is a minifier notation rewrite
//   the NOTATION lines name;
// - each key's declaration order, over the properties both sides declare, in `expanded` mode; in
//   `built` mode a moved order is a NOTATION line, because the minifier splits and merges rule
//   blocks and each property's resolved value is what the built run compares;
// - the icon URIs, compared after the whitespace normalization the ledger applies.
// A block outside the components layer reads red. The last line is `VERDICT green` or
// `VERDICT red`, and the exit code is 0 or 1 to match.
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'

const mode = process.argv[2]
if (mode !== 'expanded' && mode !== 'built') {
	console.error('usage: node cascade-check.mjs expanded|built [ROOT]')
	process.exit(2)
}
const root = resolve(process.argv[3] ?? process.cwd())
const require = createRequire(resolve(root, 'package.json'))
const { parse, AtRule } = require('postcss')
const { compile } = require('sass')

const CAROUSEL = /\.(?:carousel[\w-]*|pointer-event)(?![\w-])/u
const built = mode === 'built'
const lines = []
let red = false

function note(line) {
	lines.push(line)
}

function fail(line) {
	red = true
	lines.push(`RED ${line}`)
}

function collapse(value) {
	return value.replaceAll(/\s+/gu, ' ').trim()
}

// The minifier rewrites notation without changing the value; in built mode each rewrite is undone
// on both sides before comparing, and the line that reports the key names the rewrite.
function notate(property, value) {
	if (value === undefined) return undefined
	let text = collapse(value)
	text = text.replaceAll(/translateX\(([^,()]+)\)/gu, 'translate($1)')
	text = text.replaceAll(/(^|[\s(,/-])0\.(\d)/gu, '$1.$2')
	text = text.replaceAll(/\btransparent\b/gu, '#0000')
	if (property === 'background' && text === 'none') text = '0 0'
	if (property === 'flex') text = text.replace(/^(\S+) 1 auto$/u, '$1 auto')
	if (property === 'transition' || property.startsWith('transition-'))
		text = text.replaceAll(/ ease(?=$|,)/gu, '')
	return text
}

function notateSelector(selector) {
	return built ? selector.replaceAll(/(?<!:):(after|before|first-line|first-letter)\b/gu, '::$1') : selector
}

function notateCondition(condition) {
	if (condition === undefined) return undefined
	const text = collapse(condition)
	return built ? text.replaceAll(/:\s*/gu, ': ') : text
}

// Resolves the border shorthand family to one entry per side, so a merged or split writing of the
// same borders compares equal. Only built mode applies it, because the minifier is what merges them.
function resolveBorders(declarations) {
	const family = declarations.filter(([property]) => /^border(?:-(?:top|right|bottom|left))?$/u.test(property))
	if (family.length === 0) return declarations
	const sides = { top: undefined, right: undefined, bottom: undefined, left: undefined }
	for (const [property, value] of family) {
		const side = property.split('-')[1]
		if (side === undefined) for (const name of Object.keys(sides)) sides[name] = value
		else sides[side] = value
	}
	const first = declarations.findIndex(([property]) => property === family[0][0])
	const resolved = `top ${sides.top}; right ${sides.right}; bottom ${sides.bottom}; left ${sides.left}`
	const rest = declarations.filter((entry) => !family.includes(entry))
	rest.splice(first, 0, ['border(sides)', resolved])
	return rest
}

function keyOf(selector, condition) {
	return condition === undefined ? selector : `${selector} ${condition}`
}

function group(entries) {
	const keys = []
	const rules = new Map()
	for (const { selector, condition, declarations } of entries) {
		const key = keyOf(selector, condition)
		if (!rules.has(key)) {
			keys.push(key)
			rules.set(key, { selector, condition, declarations: [] })
		}
		rules.get(key).declarations.push(...declarations)
	}
	return { keys, rules }
}

// The inventory's carousel entries, each value collapsed the way the ledger reads it.
const inventory = JSON.parse(readFileSync(resolve(root, 'tests/fixtures/oracle/inventory.json'), 'utf8'))
const component = inventory.components?.carousel
if (component === undefined) {
	console.error('The inventory records no carousel component')
	process.exit(2)
}
const recorded = group(
	component.selectors.map((entry) => ({
		selector: collapse(entry.selector),
		condition: notateCondition(entry.condition),
		declarations: entry.declarations.map(({ property, value }) => [property, collapse(value)]),
	})),
)

// The departures the guide records under `#### carousel`.
const guide = readFileSync(resolve(root, 'guides/veneer.md'), 'utf8').split('\n')
const heading = guide.indexOf('#### `carousel`')
if (heading === -1) {
	console.error('The guide records no carousel departure table')
	process.exit(2)
}
const departures = new Map()
for (const row of guide.slice(heading + 1)) {
	if (row.trim() === '' && departures.size > 0) break
	if (!row.startsWith('|') || /^\|\s*-/u.test(row) || /^\|\s*Component\s*\|/u.test(row)) continue
	const cells = row
		.split('|')
		.slice(1, -1)
		.map((cell) => cell.trim().replaceAll('`', ''))
	const [, selector, property, condition, bootstrap, veneer, departure] = cells
	const absent = (cell) => (cell === '—' ? undefined : cell)
	departures.set(`${keyOf(selector, notateCondition(absent(condition)))} { ${property} }`, {
		bootstrap: absent(bootstrap),
		veneer: absent(veneer),
		departure,
	})
}

// The cascade under test.
const source = built ? resolve(root, 'dist/src/styles/index.css') : resolve(root, 'src/styles/index.scss')
const css = built
	? readFileSync(source, 'utf8')
	: compile(source, { loadPaths: [resolve(root, 'src/styles')], style: 'expanded' }).css
note(`mode ${mode}`)
note(`source ${source}`)
const blocks = []
parse(css).walkRules((rule) => {
	const conditions = []
	let layer
	let framed = false
	for (let node = rule.parent; node instanceof AtRule; node = node.parent) {
		if (node.name === 'layer') layer ??= node.params
		else if (node.name === 'keyframes') framed = true
		else conditions.unshift(`@${node.name} ${node.params}`.trim())
	}
	if (framed) return
	const declarations = []
	rule.each((child) => {
		if (child.type === 'decl') declarations.push([child.prop, collapse(child.value)])
	})
	for (const raw of rule.selectors) {
		const written = collapse(raw)
		if (!CAROUSEL.test(written)) continue
		const selector = notateSelector(written)
		if (selector !== written) note(`NOTATION selector ${written} reads as ${selector}`)
		if (layer !== 'components') fail(`LAYER ${selector} sits in ${layer ?? 'no layer'}`)
		const condition = conditions.length === 0 ? undefined : conditions.join(' and ')
		const normalized = notateCondition(condition)
		if (condition !== undefined && normalized !== collapse(condition))
			note(`NOTATION condition ${collapse(condition)} reads as ${normalized}`)
		blocks.push({ selector, condition: normalized, declarations })
	}
})
const written = group(blocks)


// Selector order and conditions.
const missing = recorded.keys.filter((key) => !written.rules.has(key))
const extra = written.keys.filter((key) => !recorded.rules.has(key))
for (const key of missing) fail(`MISSING ${key}`)
for (const key of extra) fail(`EXTRA-RULE ${key}`)
const shared = recorded.keys.filter((key) => written.rules.has(key))
const order = written.keys.filter((key) => recorded.rules.has(key))
if (shared.join('\n') !== order.join('\n'))
	fail(`ORDER written ${JSON.stringify(order)} against recorded ${JSON.stringify(shared)}`)
for (const key of order) note(`KEY ${key}`)

// Declarations, their order, and the icon URIs.
for (const key of shared) {
	let theirs = recorded.rules.get(key).declarations
	let ours = written.rules.get(key).declarations
	if (built) {
		const before = JSON.stringify(ours)
		theirs = resolveBorders(theirs)
		ours = resolveBorders(ours)
		if (JSON.stringify(ours) !== before && theirs.some(([property]) => property === 'border(sides)'))
			note(`NOTATION ${key} border shorthands resolved per side`)
	}
	const last = (list, property) => list.findLast(([name]) => name === property)?.[1]
	const properties = [...new Set([...theirs, ...ours].map(([property]) => property))]
	const expected = new Set()
	for (const property of properties) {
		const was = last(theirs, property)
		const is = last(ours, property)
		const label = `${key} { ${property} }`
		if (was === is) continue
		const row = departures.get(label)
		const compare = (a, b) => (built ? notate(property, a) === notate(property, b) : a === b)
		if (row !== undefined && compare(row.bootstrap, was) && compare(row.veneer, is)) {
			note(`DEPARTURE ${label} recorded=${was ?? '—'} written=${is ?? '—'} (${row.departure})`)
			expected.add(property)
		} else if (built && was !== undefined && is !== undefined && notate(property, was) === notate(property, is))
			note(`NOTATION ${label} recorded=${was} written=${is}`)
		else fail(`DIFF ${label} recorded=${was ?? '—'} written=${is ?? '—'}`)
	}
	const sequence = (list) =>
		[...new Set(list.map(([property]) => property).reverse())]
			.reverse()
			.filter((property) => theirs.some(([p]) => p === property) && ours.some(([p]) => p === property))
	// The expanded compile keeps the partial's declaration order, so the order is compared there. The
	// minifier splits and merges rule blocks, which moves distinct properties within a key without
	// changing what any of them resolves to; in built mode each property's last value is compared
	// above, the border shorthands are resolved per side, and a moved order is reported, not failed.
	if (sequence(theirs).join() !== sequence(ours).join()) {
		const line = `DECLARATION-ORDER ${key} written ${sequence(ours).join()} against recorded ${sequence(theirs).join()}`
		if (built) note(`NOTATION ${line}`)
		else fail(line)
	}
	if (key === '.carousel-control-prev-icon' || key === '.carousel-control-next-icon') {
		const was = last(theirs, 'background-image')
		const is = last(ours, 'background-image')
		if (was === undefined) continue
		if (was === is) note(`ICON ${key} equals the recorded URI`)
		else fail(`ICON ${key} written=${is ?? '—'} recorded=${was}`)
	}
}

// Every departure row the guide records must be one this cascade still writes.
for (const [label, row] of departures) {
	const key = label.slice(0, label.lastIndexOf(' { '))
	const property = label.slice(label.lastIndexOf(' { ') + 3, -2)
	const ours = written.rules.get(key)?.declarations
	const is = ours?.findLast(([name]) => name === property)?.[1]
	const matches = built ? notate(property, row.veneer) === notate(property, is) : row.veneer === is
	if (!matches) fail(`STALE-DEPARTURE ${label} guide=${row.veneer ?? '—'} written=${is ?? '—'}`)
}

note(`VERDICT ${red ? 'red' : 'green'}`)
console.log(lines.join('\n'))
process.exit(red ? 1 : 0)
