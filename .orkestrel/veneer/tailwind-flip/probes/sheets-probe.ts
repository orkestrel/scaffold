import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compileString } from 'sass'
import { compile as compileTailwindCSS } from 'tailwindcss'
import { chromium } from 'playwright'

const ROOT = '/home/user/veneer'
const OUT = resolve(ROOT, 'tmp/probes/flip/sheets')
const LAYER_STATEMENT =
	'@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;'
const TAILWIND_ROOT = dirname(fileURLToPath(import.meta.resolve('tailwindcss/package.json')))

const core = await import(resolve(ROOT, 'dist/src/core/index.js'))
const bootstrap = core.CLASS_NAMES.bootstrap

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
const byUnit = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0)
const categories: Record<string, Set<string>> = {}
for (const key of Object.keys(bootstrap)) categories[key] = new Set(leaves(bootstrap[key]))
const allNames = new Set(Object.values(categories).flatMap((set) => [...set]))
const comparison = JSON.parse(readFileSync(resolve(ROOT, 'tests/fixtures/tailwindcss/comparison.json'), 'utf8'))
const shared: string[] = comparison.shared
const sharedUtilities = shared.filter((name) => categories.utilities.has(name)).sort(byUnit)
const sharedComponents = shared.filter((name) => categories.components.has(name)).sort(byUnit)
const categoryCounts = Object.fromEntries(Object.entries(categories).map(([key, set]) => [key, set.size]))
console.log('categories', categoryCounts, 'all unique', allNames.size, 'shared', shared.length)
console.log('sharedUtilities', sharedUtilities.length, 'sharedComponents', sharedComponents.length, sharedComponents)
if (sharedUtilities.length !== 192 || sharedComponents.length !== 17) throw new Error('shared set sizes differ')
const sharedOther = shared.filter((name) => !categories.utilities.has(name) && !categories.components.has(name))

const sha = (text: string) => createHash('sha256').update(text).digest('hex')
const manifest: Record<string, unknown> = {}
function emit(name: string, text: string, construction: string, counts: Record<string, unknown>) {
	writeFileSync(resolve(OUT, name), text)
	manifest[name] = {
		path: resolve(OUT, name),
		bytes: Buffer.byteLength(text),
		sha256: sha(text),
		construction,
		counts: { ...counts, lines: text.split('\n').length, source: (text.match(/@source/g) ?? []).length, important: (text.match(/!important/g) ?? []).length },
	}
}

// 1
const liftedPath = resolve(ROOT, 'dist/src/bootstrap/index.css')
const lifted = readFileSync(liftedPath, 'utf8')
// Control: full index.scss compile through the same API, to compare with the dist file.
const fullCompile = compileString(readFileSync(resolve(ROOT, 'src/bootstrap/index.scss'), 'utf8'), { loadPaths: [resolve(ROOT, 'src/bootstrap')], style: 'expanded' }).css
// 2
const withoutEntry = "@forward 'tokens' show $layered;\n@use 'elements';\n@use 'components';\n@use 'utilities';"
const without = compileString(withoutEntry, { loadPaths: [resolve(ROOT, 'src/bootstrap')], style: 'expanded' }).css
// 3
const rebootEntry = "@use 'mixins' with ($layered: false);\n@use 'reset';"
const reboot = compileString(rebootEntry, { loadPaths: [resolve(ROOT, 'src/bootstrap')], style: 'expanded' }).css
const rebootCharset = reboot.startsWith('@charset')
const rebootInReset = '@layer reset {\n' + reboot + '\n}'
// 4
const withoutLines = without.split('\n')
const orderIndex = withoutLines.findIndex((line) => line.trim() === LAYER_STATEMENT)
if (orderIndex < 0) throw new Error('order statement missing')
const rebootReset = [...withoutLines.slice(0, orderIndex + 1), rebootInReset, ...withoutLines.slice(orderIndex + 1)].join('\n')

// Tailwind
function readTailwindStylesheet(id: string, base: string) {
	const path = id === 'tailwindcss' || id.startsWith('tailwindcss/')
		? fileURLToPath(import.meta.resolve(id === 'tailwindcss' ? 'tailwindcss/index.css' : id))
		: resolve(base || TAILWIND_ROOT, id)
	return { path, base: dirname(path), content: readFileSync(path, 'utf8') }
}
async function compileRecipe(input: string, candidates: readonly string[]) {
	const compiler = await compileTailwindCSS(input, { base: TAILWIND_ROOT, loadStylesheet: async (id: string, base: string) => readTailwindStylesheet(id, base) })
	return compiler.build([...candidates])
}
const testsRecipe = JSON.parse(readFileSync(resolve(ROOT, 'tests/fixtures/tailwindcss/recipe.json'), 'utf8'))
const appRecipe = JSON.parse(readFileSync(resolve(ROOT, 'app/browser/recipe.json'), 'utf8'))
const reproducedUnexcluded = await compileRecipe(`${LAYER_STATEMENT}\n@import 'tailwindcss';`, testsRecipe.candidates)
const sharedUtilitySet = new Set(sharedUtilities)
const excluded = [...allNames].filter((name) => !sharedUtilitySet.has(name)).sort(byUnit)
console.log('excluded', excluded.length)
const flippedInput = `${LAYER_STATEMENT}\n@import 'tailwindcss';\n@source not inline("${excluded.join(' ')}");`
const flipped = await compileRecipe(flippedInput, appRecipe.candidates)
const extra = ['bg-primary', 'text-primary', 'bg-sky-500']
const themeCandidates = [...new Set([...appRecipe.candidates, ...extra])]
const themeInput = flippedInput + '\n@theme { --color-primary: #0d6efd; }'
const flippedTheme = await compileRecipe(themeInput, themeCandidates)
// Control: same flipped input without the exclusion line, to separate candidate absence from exclusion.
const flippedNoExclusion = await compileRecipe(`${LAYER_STATEMENT}\n@import 'tailwindcss';`, appRecipe.candidates)
const flippedThemeNoExclusion = await compileRecipe(`${LAYER_STATEMENT}\n@import 'tailwindcss';\n@theme { --color-primary: #0d6efd; }`, themeCandidates)

// Selector reader
function readBlocks(css: string) {
	const text = css.replace(/\/\*[\s\S]*?\*\//g, (match) => ' '.repeat(match.length))
	const blocks: { prelude: string; ancestors: string[]; start: number; end: number }[] = []
	const stack: { prelude: string; start: number; index: number }[] = []
	let last = 0
	let quote: string | undefined
	for (let i = 0; i < text.length; i++) {
		const c = text[i]
		if (quote) { if (c === '\\') { i++; continue } if (c === quote) quote = undefined; continue }
		if (c === '"' || c === "'") { quote = c; continue }
		if (c === '\\') { i++; continue }
		if (c === '{') {
			const prelude = text.slice(last, i).trim()
			blocks.push({ prelude, ancestors: stack.map((s) => s.prelude), start: i, end: -1 })
			stack.push({ prelude, start: i, index: blocks.length - 1 })
			last = i + 1
		} else if (c === '}') {
			const top = stack.pop()
			if (top) blocks[top.index].end = i
			last = i + 1
		} else if (c === ';') last = i + 1
	}
	return blocks.map((block) => ({ ...block, text: css.slice(block.start, block.end + 1) }))
}
const IDENT = /\.(-?(?:[_a-zA-Z\u0080-\uFFFF]|\\[0-9a-fA-F]{1,6}[ \t\n]?|\\[^\n0-9a-fA-F])(?:[-_a-zA-Z0-9\u0080-\uFFFF]|\\[0-9a-fA-F]{1,6}[ \t\n]?|\\[^\n0-9a-fA-F])*)/g
function decode(token: string) {
	return token.replace(/\\([0-9a-fA-F]{1,6})[ \t\n]?|\\(.)/g, (_m, hex, ch) => (hex ? String.fromCodePoint(parseInt(hex, 16)) : ch))
}
function classTokens(prelude: string) {
	const stripped = prelude.replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, '""')
	return [...stripped.matchAll(IDENT)].map((m) => decode(m[1]))
}
function census(css: string) {
	const blocks = readBlocks(css).filter((b) => !b.prelude.startsWith('@'))
	const classes = new Set<string>()
	let rulesWithClass = 0
	for (const b of blocks) { const t = classTokens(b.prelude); if (t.length) rulesWithClass++; for (const n of t) classes.add(n) }
	return { styleRules: blocks.length, styleRulesWithClass: rulesWithClass, distinctClasses: classes, blocks }
}
const M5_NAMES = ['mt-3', 'border-1', 'rounded', 'shadow', 'px-8', 'md:flex', 'mt-[1rem]', 'collapse', 'container', 'table', 'col-1', 'caption-top', 'btn', 'bg-primary', 'text-primary', 'bg-sky-500']
const RULE_NAMES = ['collapse', 'mt-3', 'border-1', 'rounded', 'shadow', 'w-25', 'h-100', 'top-50', 'z-1', 'order-1', 'text-start', 'float-start']
const tw: Record<string, ReturnType<typeof census>> = {
	'tailwind-flipped.css': census(flipped),
	'tailwind-flipped-theme.css': census(flippedTheme),
	'control:flipped-no-exclusion': census(flippedNoExclusion),
	'control:flipped-theme-no-exclusion': census(flippedThemeNoExclusion),
}
const m5: Record<string, unknown> = {}
for (const [file, c] of Object.entries(tw)) {
	m5[file] = {
		emitted: M5_NAMES.filter((n) => c.distinctClasses.has(n)),
		absent: M5_NAMES.filter((n) => !c.distinctClasses.has(n)),
		styleRules: c.styleRules,
		styleRulesWithClass: c.styleRulesWithClass,
		distinctClassTokens: c.distinctClasses.size,
	}
}
const ruleTexts: Record<string, unknown> = {}
for (const name of RULE_NAMES) {
	const selector = '.' + name.replace(/[^-_a-zA-Z0-9]/g, (ch) => '\\' + ch)
	ruleTexts[name] = tw['tailwind-flipped.css'].blocks
		.filter((b) => classTokens(b.prelude).includes(name))
		.map((b) => ({ prelude: b.prelude, exact: b.prelude === selector, ancestors: b.ancestors, text: b.text }))
}
const candidateMembership = Object.fromEntries([...new Set([...M5_NAMES, ...RULE_NAMES])].map((n) => [n, { appCandidate: appRecipe.candidates.includes(n), themeCandidate: themeCandidates.includes(n), excluded: excluded.includes(n), sharedUtility: sharedUtilitySet.has(n), sharedComponent: sharedComponents.includes(n), bootstrapCategory: Object.entries(categories).filter(([, s]) => s.has(n)).map(([k]) => k) }]))

// Chromium deletion and CSSOM counts
let browser
try { browser = await chromium.launch() } catch (error) {
	const dir = readdirSync('/opt/pw-browsers').find((d) => /^chromium-\d+$/.test(d))
	browser = await chromium.launch({ executablePath: `/opt/pw-browsers/${dir}/chrome-linux/chrome` })
}
const chromiumVersion = browser.version()
const page = await browser.newPage()
await page.setContent('<!doctype html><html><body></body></html>')
async function cssom(text: string, names: string[]) {
	return page.evaluate(([text, names]) => {
		const sheet = new CSSStyleSheet()
		sheet.replaceSync(text as string)
		const targets = new Set((names as string[]).map((n) => '.' + CSS.escape(n)))
		const top = Array.from(sheet.cssRules)
		const topKinds = top.map((r) => r.constructor.name)
		const firstRule = top[0] ? { kind: top[0].constructor.name, text: top[0].cssText } : null
		const layerStatements = top.map((r, i) => [i, r]).filter(([, r]: any) => r.constructor.name === 'CSSLayerStatementRule').map(([i, r]: any) => ({ index: i, text: r.cssText }))
		const deleted: Record<string, { count: number; contexts: string[] }> = {}
		const kinds: Record<string, number> = {}
		let styleRules = 0
		const walk = (list: CSSRuleList, owner: any, context: string[]) => {
			for (let i = list.length - 1; i >= 0; i--) {
				const rule: any = list[i]
				kinds[rule.constructor.name] = (kinds[rule.constructor.name] ?? 0) + 1
				if (rule instanceof CSSStyleRule) {
					styleRules++
					if (targets.has(rule.selectorText)) {
						const name = rule.selectorText
						deleted[name] ??= { count: 0, contexts: [] }
						deleted[name].count++
						deleted[name].contexts.push(context.join(' > ') || 'top')
						owner.deleteRule(i)
						continue
					}
					if (rule.cssRules && rule.cssRules.length) walk(rule.cssRules, rule, [...context, rule.selectorText])
				} else if (rule instanceof CSSLayerBlockRule) walk(rule.cssRules, rule, [...context, '@layer ' + rule.name])
				else if (rule instanceof CSSMediaRule) walk(rule.cssRules, rule, [...context, '@media ' + rule.conditionText])
				else if (rule instanceof CSSSupportsRule) walk(rule.cssRules, rule, [...context, '@supports ' + rule.conditionText])
				else if (rule instanceof CSSGroupingRule) walk(rule.cssRules, rule, [...context, rule.constructor.name])
			}
		}
		if (names.length) walk(sheet.cssRules, sheet, [])
		else walk(sheet.cssRules, { deleteRule() { throw new Error('no') } }, [])
		const serialized = Array.from(sheet.cssRules, (r) => r.cssText).join('\n')
		return { topCount: top.length, topKinds, firstRule, layerStatements, deleted, kinds, styleRules, serialized, topAfter: sheet.cssRules.length }
	}, [text, names] as const)
}
function regionReport(text: string) {
	return page.evaluate((text) => {
		const sheet = new CSSStyleSheet()
		sheet.replaceSync(text)
		const top = Array.from(sheet.cssRules)
		const out: any[] = []
		top.forEach((r: any, index) => {
			const inner = r.cssRules ? Array.from(r.cssRules) as any[] : [r]
			const first: any = inner[0]
			if (first && first.selectorText === '*, ::before, ::after' || first?.selectorText === '*, *::before, *::after') {
				const style = (rs: any[]): any[] => rs.flatMap((x: any) => x instanceof CSSStyleRule ? [x.selectorText] : x.cssRules ? style(Array.from(x.cssRules)) : [])
				const sel = style(inner)
				out.push({ topIndex: index, kind: r.constructor.name, layer: r.name ?? null, childRules: inner.length, styleRules: sel.length, firstSelector: sel[0], lastSelector: sel.at(-1) })
			}
		})
		return out
	}, text)
}

const sources: Record<string, string> = {
	'bootstrap-lifted.css': lifted,
	'bootstrap-without-reboot.css': without,
	'reboot-in-reset.css': rebootInReset,
	'bootstrap-reboot-reset.css': rebootReset,
}
const readings: Record<string, any> = {}
for (const [name, text] of Object.entries(sources)) readings[name] = await cssom(text, [])
const rebootPlain = await cssom(reboot, [])
const regions: Record<string, unknown> = {}
for (const [name, text] of Object.entries(sources)) regions[name] = await regionReport(text)
regions['reboot-compile(unwrapped)'] = await regionReport(reboot)

const deletion: Record<string, unknown> = {}
const minus: Record<string, string> = {}
for (const [source, target] of [['bootstrap-lifted.css', 'bootstrap-lifted-minus-shared.css'], ['bootstrap-reboot-reset.css', 'bootstrap-reboot-reset-minus-shared.css']]) {
	const r = await cssom(sources[source], sharedUtilities)
	minus[target] = r.serialized
	const counts = sharedUtilities.map((n) => [n, r.deleted['.' + n]?.count ?? 0] as const)
	// selectorText uses CSS.escape form; map back by escaping
	const total = Object.values(r.deleted).reduce((sum, d) => sum + d.count, 0)
	const contexts = Object.values(r.deleted).flatMap((d) => d.contexts)
	const contextTally: Record<string, number> = {}
	for (const c of contexts) contextTally[c] = (contextTally[c] ?? 0) + 1
	deletion[target] = {
		source,
		deletedRules: total,
		zeroDeletions: counts.filter(([, c]) => c === 0).map(([n]) => n),
		multipleDeletions: counts.filter(([, c]) => c > 1).map(([n, c]) => ({ name: n, count: c })),
		anyInsideMedia: contexts.some((c) => c.includes('@media')),
		anyInsideLayer: contexts.some((c) => c.includes('@layer')),
		contextTally,
		topRulesBefore: r.topCount,
		topRulesAfter: r.topAfter,
		styleRulesBefore: r.styleRules,
	}
	// Control: the same CSSOM serialization with zero deletions, to separate serialization loss from deletion.
	const control = await cssom(sources[source], [])
	minus['control:' + source.replace('.css', '-cssom.css')] = control.serialized
}
// The escape map: CSS.escape(n) may differ from n for names like 'w-25'? record whether any name needed escaping.
const escapedDiffer = await page.evaluate((names) => names.filter((n) => CSS.escape(n) !== n), sharedUtilities)
await browser.close()

// Emit files
emit('bootstrap-lifted.css', lifted, `verbatim copy of ${liftedPath}`, { topRules: readings['bootstrap-lifted.css'].topCount, styleRules: readings['bootstrap-lifted.css'].styleRules })
emit('bootstrap-without-reboot.css', without, `sass.compileString(${JSON.stringify(withoutEntry)}, { loadPaths: ['${resolve(ROOT, 'src/bootstrap')}'], style: 'expanded' }).css`, { topRules: readings['bootstrap-without-reboot.css'].topCount, styleRules: readings['bootstrap-without-reboot.css'].styleRules })
emit('reboot-in-reset.css', rebootInReset, `'@layer reset {\\n' + sass.compileString(${JSON.stringify(rebootEntry)}, same options).css + '\\n}'`, { topRules: readings['reboot-in-reset.css'].topCount, styleRules: readings['reboot-in-reset.css'].styleRules, rebootTopRulesUnwrapped: rebootPlain.topCount, rebootImportant: (reboot.match(/!important/g) ?? []).length, rebootCharset })
emit('bootstrap-reboot-reset.css', rebootReset, `bootstrap-without-reboot.css split on '\\n' with reboot-in-reset.css inserted after line ${orderIndex + 1} (the order statement), rejoined with '\\n'`, { topRules: readings['bootstrap-reboot-reset.css'].topCount, styleRules: readings['bootstrap-reboot-reset.css'].styleRules })
for (const target of ['bootstrap-lifted-minus-shared.css', 'bootstrap-reboot-reset-minus-shared.css']) {
	const d: any = deletion[target]
	emit(target, minus[target], `Chromium ${chromiumVersion}: new CSSStyleSheet().replaceSync(${d.source}); recursive walk deleting every CSSStyleRule whose selectorText === '.' + CSS.escape(NAME) for the 192 shared utilities; top-level cssText joined by '\\n'`, { deletedRules: d.deletedRules, topRules: d.topRulesAfter, zeroDeletions: d.zeroDeletions.length, multipleDeletions: d.multipleDeletions.length })
}
for (const source of ['bootstrap-lifted.css', 'bootstrap-reboot-reset.css']) {
	const key = 'control:' + source.replace('.css', '-cssom.css')
	emit(key.slice(8), minus[key], `CONTROL: Chromium ${chromiumVersion} replaceSync(${source}) then top-level cssText joined by '\\n', zero deletions (isolates CSSOM serialization loss)`, {})
}
emit('tailwind-unexcluded.css', testsRecipe.unexcluded, 'tests/fixtures/tailwindcss/recipe.json field unexcluded, verbatim', { classTokens: census(testsRecipe.unexcluded).distinctClasses.size, styleRules: census(testsRecipe.unexcluded).styleRules })
emit('tailwind-flipped.css', flipped, `tailwindcss compile(input, { base: TAILWIND_ROOT, loadStylesheet: disk }).build(app/browser/recipe.json candidates, ${appRecipe.candidates.length}); input = order statement + "@import 'tailwindcss';" + @source not inline of ${excluded.length} names (input sha256 ${sha(flippedInput)})`, { excludedNames: excluded.length, candidates: appRecipe.candidates.length, styleRules: tw['tailwind-flipped.css'].styleRules, styleRulesWithClass: tw['tailwind-flipped.css'].styleRulesWithClass, distinctClassTokens: tw['tailwind-flipped.css'].distinctClasses.size })
emit('tailwind-flipped-theme.css', flippedTheme, `same as tailwind-flipped.css with "\\n@theme { --color-primary: #0d6efd; }" appended to the input; candidates = app candidates ∪ {bg-primary, text-primary, bg-sky-500} (${themeCandidates.length}) (input sha256 ${sha(themeInput)})`, { candidates: themeCandidates.length, styleRules: tw['tailwind-flipped-theme.css'].styleRules, styleRulesWithClass: tw['tailwind-flipped-theme.css'].styleRulesWithClass, distinctClassTokens: tw['tailwind-flipped-theme.css'].distinctClasses.size })
writeFileSync(resolve(OUT, 'tailwind-flipped.input.css'), flippedInput)

const sourceCheck = Object.fromEntries(Object.entries(manifest).map(([k, v]: any) => [k, v.counts.source]))
const textOrder = Object.fromEntries(Object.entries(sources).map(([k, t]) => {
	const lines = t.split('\n')
	return [k, { line1: lines[0], line2: lines[1], orderStatementLines: lines.map((l, i) => [i + 1, l.trim()]).filter(([, l]) => l === LAYER_STATEMENT).map(([i]) => i), cssomFirstRule: readings[k].firstRule, cssomLayerStatements: readings[k].layerStatements }]
}))
for (const k of ['bootstrap-lifted-minus-shared.css', 'bootstrap-reboot-reset-minus-shared.css']) {
	const lines = minus[k].split('\n')
	textOrder[k] = { line1: lines[0], orderStatementOccurrences: minus[k].split(LAYER_STATEMENT).length - 1 }
}
const result = {
	chromiumVersion,
	tailwindVersion: JSON.parse(readFileSync(resolve(TAILWIND_ROOT, 'package.json'), 'utf8')).version,
	sassVersion: (await import('sass')).info,
	categories: categoryCounts,
	allUniqueNames: allNames.size,
	shared: shared.length,
	sharedUtilities: sharedUtilities.length,
	sharedComponents,
	sharedOther,
	excludedCount: excluded.length,
	escapedDiffer,
	liftedEqualsFullCompile: fullCompile === lifted,
	liftedVsFullCompile: { liftedSha: sha(lifted), fullSha: sha(fullCompile), liftedBytes: lifted.length, fullBytes: fullCompile.length },
	reproducedUnexcludedMatches: reproducedUnexcluded === testsRecipe.unexcluded,
	cssomTopRules: Object.fromEntries(Object.entries(readings).map(([k, r]) => [k, { top: r.topCount, styleRules: r.styleRules, kinds: r.kinds, topKinds: Object.entries(r.topKinds.reduce((a: any, k: string) => ((a[k] = (a[k] ?? 0) + 1), a), {})) }])),
	rebootCompileTopRules: rebootPlain.topCount,
	rebootCompileStyleRules: rebootPlain.styleRules,
	rebootImportant: (reboot.match(/!important/g) ?? []).length,
	rebootCharset,
	regions,
	textOrder,
	sourceCheck,
	sourceStatementInCompiled: { flipped: flipped.includes('@source'), flippedTheme: flippedTheme.includes('@source') },
	deletion,
	m5,
	ruleTexts,
	candidateMembership,
	controlsDiff: {
		flippedVsNoExclusionClassesRemoved: [...tw['control:flipped-no-exclusion'].distinctClasses].filter((n) => !tw['tailwind-flipped.css'].distinctClasses.has(n)).sort(byUnit),
		flippedThemeVsNoExclusionClassesRemoved: [...tw['control:flipped-theme-no-exclusion'].distinctClasses].filter((n) => !tw['tailwind-flipped-theme.css'].distinctClasses.has(n)).sort(byUnit),
		flippedExtraClasses: [...tw['tailwind-flipped.css'].distinctClasses].filter((n) => !tw['control:flipped-no-exclusion'].distinctClasses.has(n)),
	},
	flippedDistinctClasses: [...tw['tailwind-flipped.css'].distinctClasses].sort(byUnit),
	flippedThemeDistinctClasses: [...tw['tailwind-flipped-theme.css'].distinctClasses].sort(byUnit),
	themeVarPrimary: { flipped: flipped.includes('--color-primary'), flippedTheme: flippedTheme.includes('--color-primary') },
}
writeFileSync(resolve(OUT, 'manifest.json'), JSON.stringify(manifest, null, '\t') + '\n')
writeFileSync(resolve(OUT, 'measurements.json'), JSON.stringify(result, null, '\t') + '\n')
console.log(JSON.stringify({ ...result, flippedDistinctClasses: result.flippedDistinctClasses.length, flippedThemeDistinctClasses: result.flippedThemeDistinctClasses.length, ruleTexts: undefined, candidateMembership: undefined }, null, 1))
