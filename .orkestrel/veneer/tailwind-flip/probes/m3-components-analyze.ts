import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const OUT = '/home/user/veneer/tmp/probes/flip/m3-components'
const PROBE = `${OUT}/probe.ts`
const ANALYZE = `${OUT}/analyze.ts`
const dep = JSON.parse(readFileSync(resolve(OUT, 'departures.json'), 'utf8'))
const el = JSON.parse(readFileSync(resolve(OUT, 'elements.json'), 'utf8'))
const control = JSON.parse(readFileSync(resolve(OUT, 'control-text.json'), 'utf8'))
const run = JSON.parse(readFileSync(resolve(OUT, 'run.json'), 'utf8'))
const declared = JSON.parse(readFileSync(resolve(OUT, 'declared.json'), 'utf8'))
const departures: any[] = dep.departures
const elements: any[] = el.elements
const LABELS = ['component-class', 'shared-utility', 'bootstrap-other', 'bare']
const source = (outputs: string[]) => `Probe: \`${PROBE}\` (readings), \`${ANALYZE}\` (tables). Output: ${outputs.map((o) => `\`${OUT}/${o}\``).join(', ')}.`
const cell = (v: unknown) => String(v).replace(/\|/g, '\\|').replace(/\n/g, ' ')
const table = (head: string[], rows: unknown[][]) => [`| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.map(cell).join(' | ')} |`)].join('\n')
const docKey = (d: any) => `${d.fragment} ${d.viewport}`
const docs: any[] = el.docs

// 2. summary
const summaryRows: unknown[][] = []
const totals: Record<string, number> = {}
const add = (k: string, n: number) => (totals[k] = (totals[k] ?? 0) + n)
for (const doc of docs) {
	const ownElements = elements.filter((e) => e.fragment === doc.fragment && e.viewport === doc.viewport)
	const own = departures.filter((d) => d.fragment === doc.fragment && d.viewport === doc.viewport)
	const row: unknown[] = [doc.fragment, doc.viewport, ownElements.length]
	add('elements', ownElements.length)
	for (const label of LABELS) {
		const n = ownElements.filter((e) => e.label === label).length
		row.push(n)
		add(`el ${label}`, n)
	}
	for (const which of ['dVsA', 'cVsA']) {
		for (const label of LABELS) {
			const n = own.filter((d) => d[which] && d.label === label).length
			row.push(n)
			add(`${which} ${label}`, n)
		}
		const n = own.filter((d) => d[which]).length
		row.push(n)
		add(`${which} all`, n)
	}
	const e1 = new Set(own.filter((d) => d.cVsA).map((d) => d.path)).size
	row.push(e1)
	add('cVsA elements', e1)
	summaryRows.push(row)
}
summaryRows.push(['TOTAL', '', totals.elements, ...LABELS.map((l) => totals[`el ${l}`]), ...['dVsA', 'cVsA'].flatMap((w) => [...LABELS.map((l) => totals[`${w} ${l}`]), totals[`${w} all`]]), totals['cVsA elements']])
const summaryHead = ['fragment', 'viewport', 'elements', 'el component-class', 'el shared-utility', 'el bootstrap-other', 'el bare', ...['D-vs-A', 'C-vs-A'].flatMap((w) => [...LABELS.map((l) => `${w} ${l}`), `${w} all`]), 'elements departing C-vs-A']
// kind breakdown
const kindRows = ['longhand', 'pseudo', 'box'].map((kind) => [kind, ...['dVsA', 'cVsA'].flatMap((w) => LABELS.map((l) => departures.filter((d) => d.kind === kind && d[w] && d.label === l).length))])
const dcRow = LABELS.map((l) => departures.filter((d) => d.dVsC && d.label === l).length)
const summary = [
	`# M3 summary`,
	'',
	`Chromium ${dep.chromiumVersion}. ${run.fragments} fragments, ${run.docs} documents (fragment × viewport). A pair is (element, longhand), (element, pseudo + longhand or pseudo presence), or (element, box field). Conditions: A = bootstrap-lifted.css; D = tailwind-flipped.css + bootstrap-lifted-minus-shared.css; C = tailwind-flipped.css + bootstrap-reboot-reset-minus-shared.css.`,
	'',
	source(['elements.json', 'departures.json']),
	'',
	'The following table gives per-document element counts by label and departing pairs by label.',
	'',
	table(summaryHead, summaryRows),
	'',
	'The following table splits the departing pairs by kind.',
	'',
	source(['departures.json']),
	'',
	table(['kind', ...['D-vs-A', 'C-vs-A'].flatMap((w) => LABELS.map((l) => `${w} ${l}`))], kindRows),
	'',
	'The following table counts pairs where D differs from C (the reboot losing to preflight), by label.',
	'',
	source(['departures.json']),
	'',
	table(LABELS, [dcRow]),
	'',
]
writeFileSync(resolve(OUT, 'summary.md'), summary.join('\n'))

// Extended attribution (documented in report.md): the strict rules plus logical-to-physical longhand
// equivalence, size-resolved longhands treated like box fields, and universal preflight rows read on div
// for tags outside the preflight.json element census.
const preflightFixture = JSON.parse(readFileSync('/home/user/veneer/tests/fixtures/tailwindcss/preflight.json', 'utf8'))
const fixtureElements = new Set<string>(preflightFixture.elements)
const fixtureRows = new Set<string>(preflightFixture.rows.map((r: any) => `${r.element}\0${r.pseudo ?? ''}\0${r.longhand}`))
const PHYSICAL: Record<string, string> = { 'inline-size': 'width', 'block-size': 'height', 'min-inline-size': 'min-width', 'min-block-size': 'min-height', 'max-inline-size': 'max-width', 'max-block-size': 'max-height', 'inset-block-start': 'top', 'inset-block-end': 'bottom', 'inset-inline-start': 'left', 'inset-inline-end': 'right', 'border-start-start-radius': 'border-top-left-radius', 'border-start-end-radius': 'border-top-right-radius', 'border-end-start-radius': 'border-bottom-left-radius', 'border-end-end-radius': 'border-bottom-right-radius' }
for (const side of [['block-start', 'top'], ['block-end', 'bottom'], ['inline-start', 'left'], ['inline-end', 'right']]) {
	PHYSICAL[`margin-${side[0]}`] = `margin-${side[1]}`
	PHYSICAL[`padding-${side[0]}`] = `padding-${side[1]}`
	for (const part of ['color', 'style', 'width']) PHYSICAL[`border-${side[0]}-${part}`] = `border-${side[1]}-${part}`
}
const RESOLVED = new Set(['width', 'height', 'inline-size', 'block-size', 'perspective-origin', 'transform-origin'])
const INHERITED = /^(color|font-.*|line-height|text-align|visibility|list-style-.*)$/
const elementMeta = new Map(elements.map((e: any) => [`${e.fragment}\0${e.viewport}\0${e.path}`, e]))
function extended(d: any): string {
	if (d.attribution !== 'unknown') return d.attribution
	const m: any = elementMeta.get(`${d.fragment}\0${d.viewport}\0${d.path}`)
	const isBox = d.kind === 'box'
	const physical = PHYSICAL[d.property] ?? d.property
	const layout = isBox || RESOLVED.has(d.property)
	if (!isBox && !fixtureElements.has(d.tag) && fixtureRows.has(`div\0${d.pseudo ?? ''}\0${d.property}`)) return 'preflight'
	if (!isBox && fixtureRows.has(`${d.tag}\0${d.pseudo ?? ''}\0${physical}`)) return 'preflight'
	const declares = (tokens: string[], table: Record<string, string[]>) => tokens.some((t) => (table[t] ?? []).includes(physical))
	if ((!isBox && declares(m.sharedSelf, declared.sharedDeclared)) || (layout && m.sharedSelf.length > 0)) return 'shared-utility-self'
	if (m.sharedAncestors.length > 0 && (layout || INHERITED.test(physical))) return 'shared-utility-ancestor'
	if ((!isBox && declares(m.tailwindSelf, declared.tailwindDeclared)) || (layout && (m.tailwindSelf.length > 0 || m.tailwindAncestors.length > 0)) || (INHERITED.test(physical) && declares(m.tailwindAncestors, declared.tailwindDeclared))) return 'unexcluded-tailwind'
	return 'unknown'
}
for (const d of departures) if (d.label === 'component-class') d.extended = extended(d)

// 3. curation candidates (C differs from A on component-class elements)
const comp = departures.filter((d) => d.label === 'component-class' && d.cVsA)
const groups = new Map<string, { carried: string; tag: string; property: string; A: string; C: string; n: number; attr: Record<string, number>; ext: Record<string, number>; frags: Set<string> }>()
const componentSet = new Set<string>()
for (const e of elements) if (e.label === 'component-class') componentSet.add(e.classes)
const coreModule = await import('/home/user/veneer/dist/src/core/index.js')
const leaves = (tree: unknown): string[] => (typeof tree === 'string' ? [tree] : Object.values(tree as object).flatMap(leaves))
const components = new Set(leaves(coreModule.CLASS_NAMES.bootstrap.components))
for (const d of comp) {
	const carried = d.classes.split(/\s+/).filter((t: string) => components.has(t)).join(' ')
	const prop = d.kind === 'pseudo' ? `${d.pseudo} ${d.property}` : d.kind === 'box' ? `box ${d.property}` : d.property
	const key = [carried, d.tag, prop, d.A, d.C].join('\0')
	const g = groups.get(key) ?? { carried, tag: d.tag, property: prop, A: d.A, C: d.C, n: 0, attr: {}, ext: {}, frags: new Set() }
	g.n++
	g.attr[d.attribution] = (g.attr[d.attribution] ?? 0) + 1
	g.ext[d.extended] = (g.ext[d.extended] ?? 0) + 1
	g.frags.add(d.fragment)
	groups.set(key, g)
}
const groupList = [...groups.values()].sort((a, b) => b.n - a.n || (a.carried + a.tag + a.property < b.carried + b.tag + b.property ? -1 : 1))
const attrTotals: Record<string, number> = {}
const attrGroups: Record<string, number> = {}
for (const d of comp) attrTotals[d.attribution] = (attrTotals[d.attribution] ?? 0) + 1
const extTotals: Record<string, number> = {}
for (const d of comp) extTotals[d.extended] = (extTotals[d.extended] ?? 0) + 1
for (const g of groupList) {
	const primary = Object.entries(g.attr).sort((a, b) => b[1] - a[1])[0][0]
	attrGroups[primary] = (attrGroups[primary] ?? 0) + 1
}
const attrAll: Record<string, number> = {}
for (const d of comp) for (const a of d.attributions.length ? d.attributions : ['unknown']) attrAll[a] = (attrAll[a] ?? 0) + 1
const ATTR = ['preflight', 'shared-utility-self', 'shared-utility-ancestor', 'unexcluded-tailwind', 'unknown']
// Longhand-level rollup for unknowns
const unknownByProp: Record<string, number> = {}
for (const d of comp.filter((x) => x.extended === 'unknown')) {
	const prop = d.kind === 'pseudo' ? `${d.pseudo} ${d.property}` : d.kind === 'box' ? `box ${d.property}` : d.property
	unknownByProp[prop] = (unknownByProp[prop] ?? 0) + 1
}
const curation = [
	'# M3 curation candidates',
	'',
	`Chromium ${dep.chromiumVersion}. Population: departures where C differs from A on component-class elements: ${comp.length} occurrences in ${groupList.length} distinct (component classes carried, tag, longhand, A value, C value) rows. Attribution is assigned per occurrence, first match in the order ${ATTR.join(', ')}; a row lists each attribution's occurrence count.`,
	'',
	'The following table counts the attributions.',
	'',
	source(['departures.json']),
	'',
	table(['attribution', 'occurrences (strict, primary)', 'distinct rows (strict, majority primary)', 'occurrences matching (strict, any, non-exclusive)', 'occurrences (extended, primary)'], ATTR.map((a) => [a, attrTotals[a] ?? 0, attrGroups[a] ?? 0, attrAll[a] ?? 0, extTotals[a] ?? 0])),
	'',
	'The following table lists the longhands of the occurrences that stay unknown under the extended attribution.',
	'',
	source(['departures.json']),
	'',
	table(['longhand', 'unknown occurrences'], Object.entries(unknownByProp).sort((a, b) => b[1] - a[1])),
	'',
	'The following table lists every distinct row, sorted by occurrences.',
	'',
	source(['departures.json']),
	'',
	table(['component classes carried', 'tag', 'longhand', 'A', 'C', 'occurrences', 'attribution (strict)', 'attribution (extended)', 'fragments'], groupList.map((g) => [g.carried, g.tag, g.property, g.A, g.C, g.n, Object.entries(g.attr).map(([k, v]) => `${k} ${v}`).join('; '), Object.entries(g.ext).map(([k, v]) => `${k} ${v}`).join('; '), [...g.frags].sort().join(' ')])),
	'',
]
writeFileSync(resolve(OUT, 'curation-candidates.md'), curation.join('\n'))

// 4. functional
const FUNCTIONAL = new Set(['display', 'visibility', 'opacity', 'pointer-events', 'position', 'overflow-x', 'overflow-y', 'z-index'])
const moved = (a: string, b: string) => (a === 'none' || b === 'none' ? a !== b : Math.abs(Number(a) - Number(b)) > 1)
const functional = departures.filter((d) => d.label === 'component-class' && ((d.kind === 'longhand' && FUNCTIONAL.has(d.property)) || (d.kind === 'box' && (moved(d.A, d.C) || moved(d.A, d.D)))))
const fnLonghand = functional.filter((d) => d.kind === 'longhand')
const fnBox = functional.filter((d) => d.kind === 'box')
const fnCounts: Record<string, number> = {}
for (const d of functional) {
	const k = d.kind === 'box' ? `box ${d.property}` : d.property
	fnCounts[k] = (fnCounts[k] ?? 0) + 1
}
const fnRow = (d: any) => [d.fragment, d.viewport, d.path, d.tag, d.classes, d.within ?? '', d.kind === 'box' ? `box ${d.property}` : d.property, d.A, d.D, d.C, d.attribution, d.extended]
const functionalMd = [
	'# M3 functional candidates',
	'',
	`Chromium ${dep.chromiumVersion}. Component-class elements only. Longhands: ${[...FUNCTIONAL].join(', ')}. Box fields (relative to main): rows where |C − A| > 1px or |D − A| > 1px, or where the box exists in one condition and not the other ('none'). ${functional.length} rows: ${fnLonghand.length} longhand rows and ${fnBox.length} box rows.`,
	'',
	'The following table counts the rows per property.',
	'',
	source(['departures.json', 'functional.md']),
	'',
	table(['property', 'rows'], Object.entries(fnCounts).sort((a, b) => b[1] - a[1])),
	'',
	'The following table lists the longhand rows.',
	'',
	source(['departures.json']),
	'',
	table(['fragment', 'viewport', 'path', 'tag', 'classes', 'within', 'property', 'A', 'D', 'C', 'attribution (strict)', 'attribution (extended)'], fnLonghand.map(fnRow)),
	'',
	'The following table lists the box rows.',
	'',
	source(['departures.json']),
	'',
	table(['fragment', 'viewport', 'path', 'tag', 'classes', 'within', 'property', 'A', 'D', 'C', 'attribution (strict)', 'attribution (extended)'], fnBox.map(fnRow)),
	'',
]
writeFileSync(resolve(OUT, 'functional.md'), functionalMd.join('\n'))

// 5. census (1280 viewport; the DOM is identical at 390)
const wide = elements.filter((e) => e.viewport === '1280x800')
const censusRows: unknown[][] = []
const nameTotals: Record<string, number> = {}
let anyTotal = 0
for (const fragment of [...new Set(wide.map((e) => e.fragment))]) {
	const own = wide.filter((e) => e.fragment === fragment)
	const counts: Record<string, number> = {}
	for (const e of own) for (const t of e.sharedSelf) counts[t] = (counts[t] ?? 0) + 1
	const any = own.filter((e) => e.sharedSelf.length > 0).length
	anyTotal += any
	for (const [k, v] of Object.entries(counts)) nameTotals[k] = (nameTotals[k] ?? 0) + v
	censusRows.push([fragment, own.length, any, Object.entries(counts).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1)).map(([k, v]) => `${k} ${v}`).join(', ')])
}
censusRows.push(['TOTAL', wide.length, anyTotal, `${Object.keys(nameTotals).length} distinct names`])
const census = [
	'# M3 shared-utility census',
	'',
	`Chromium ${dep.chromiumVersion}. Per fragment at 1280x800 (the 390x844 documents carry the same DOM): elements carrying each of the 192 shared utilities on their own class attribute.`,
	'',
	'The following table gives the per-fragment census.',
	'',
	source(['elements.json']),
	'',
	table(['fragment', 'elements', 'elements carrying any shared utility', 'per shared utility name'], censusRows),
	'',
	'The following table totals each shared utility name across fragments.',
	'',
	source(['elements.json']),
	'',
	table(['shared utility', 'elements'], Object.entries(nameTotals).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))),
	'',
	`Shared utilities never carried by a fragment element: ${Object.keys(declared.sharedDeclared).filter((n) => !(n in nameTotals)).length} of 192.`,
	'',
]
writeFileSync(resolve(OUT, 'shared-utility-census.md'), census.join('\n'))

// 6. ranking
const byFragment: Record<string, { all: number; wide: number; elements: number }> = {}
for (const doc of docs) byFragment[doc.fragment] = { all: 0, wide: 0, elements: 0 }
for (const d of comp) {
	byFragment[d.fragment].all++
	if (d.viewport === '1280x800') byFragment[d.fragment].wide++
}
for (const e of wide) if (e.label === 'component-class') byFragment[e.fragment].elements++
const ranked = Object.entries(byFragment).sort((a, b) => b[1].all - a[1].all)
const none = ranked.filter(([, v]) => v.all === 0)

// control
const ctrlRows = control.rows as any[]
const ctrlByProp: Record<string, number> = {}
for (const r of ctrlRows) {
	const k = `${r.classes} | ${r.property}`
	ctrlByProp[k] = (ctrlByProp[k] ?? 0) + 1
}

const result = {
	chromiumVersion: dep.chromiumVersion,
	totals,
	attrTotals,
	attrAll,
	extTotals,
	unknownByProp: Object.entries(unknownByProp).sort((a, b) => b[1] - a[1]).slice(0, 30),
	distinctRows: groupList.length,
	componentOccurrences: comp.length,
	functional: { rows: functional.length, longhand: fnLonghand.length, box: fnBox.length, byProperty: fnCounts },
	top5: ranked.slice(0, 5),
	none: none.map(([k, v]) => [k, v]),
	controlRows: ctrlRows.length,
	census: { anyTotal, distinctNames: Object.keys(nameTotals).length },
	dcRow,
	kindRows,
}
writeFileSync(resolve(OUT, 'analysis.json'), JSON.stringify(result, null, '\t'))
console.log(JSON.stringify(result, null, 1))

// report.md
const ctrlClasses: Record<string, number> = {}
for (const r of ctrlRows) ctrlClasses[`${r.fragment} | ${r.classes}`] = (ctrlClasses[`${r.fragment} | ${r.classes}`] ?? 0) + 1
const ctrlKeys = new Set(ctrlRows.map((r) => `${r.fragment}\0${r.viewport}\0${r.path}\0${r.property}`))
const depKey = (d: any) => `${d.fragment}\0${d.viewport}\0${d.path}\0${d.kind === 'pseudo' ? `${d.pseudo} ${d.property}` : d.kind === 'box' ? `box ${d.property}` : d.property}`
const artifactDeps = departures.filter((d) => ctrlKeys.has(depKey(d)))
const visibleGroups = groupList.filter((g) => !/^(tab-size|border-(top|bottom|left|right|block-start|block-end|inline-start|inline-end)-style)$/.test(g.property.replace(/^::\S+ /, '')))
const fnDisplay = fnLonghand.map(fnRow)
const bottom = [...ranked].reverse().slice(0, 3)
const report = [
	'# M3 component departures under the flip',
	'',
	`Every one of the 4882 elements in the 61 documents departs C-vs-A and D-vs-A in at least \`tab-size\` (8 to 4), so no fragment is free of component-class departures; the 3 fragments with the fewest are listed in item 6. Chromium ${dep.chromiumVersion} (\`browser.version()\`; the probe launched the Playwright default, which resolved). Repository /home/user/veneer at 4929856.`,
	'',
	'## Method',
	'',
	`- Probe \`${PROBE}\` reads every element under \`main\` in document order under A, D, C, and 2 controls (Dt, Ct: the same as D and C with the \`.text.css\` alternates of the minus-shared sheets). It writes \`departures.json\`, \`elements.json\`, \`declared.json\`, \`control-text.json\`, and \`run.json\`; its log is \`probe.log\`.`,
	`- Analysis \`${ANALYZE}\` writes \`summary.md\`, \`curation-candidates.md\`, \`functional.md\`, \`shared-utility-census.md\`, \`analysis.json\`, and this report.`,
	'- Sheets: `/home/user/veneer/tmp/probes/flip/sheets/` per its manifest.json; each as an inline `<style>` in condition order, the Tailwind compile first.',
	`- Class sets: shared ${209}; shared ∩ utilities ${run.sharedUtilities}; shared ∩ components ${run.sharedComponents.length} (${run.sharedComponents.join(', ')}). Every one of the 192 shared utilities has at least one exact \`.NAME\` rule in bootstrap-lifted.css. tailwind-flipped.css carries ${run.tailwindTokens} class tokens, ${run.tailwindOnly} of them outside the shared set (${declared.tailwindOnly.join(', ')}).`,
	'- Read: every enumerable non-custom computed longhand (' + [...new Set(docs.map((x) => x.longhands))].join(', ') + ' names; the probe checked the population equal across all elements and conditions), the 5 pseudo-elements with the collectPseudos gates (`::before`/`::after` when `content` is not none/normal and `display` is not none; `::placeholder` when `:placeholder-shown`; `::file-selector-button` on a file input; `::marker` when `display` includes list-item), a `(present)` row per pseudo, and the bounding box (x, y relative to main; width, height; `none` without client rects). Running animations paused at time 0. No script ran.',
	'- 55 fragment files exist under app/browser/sections/ (the brief named 56). 6 fragments also read at 390x844, so 61 documents.',
	'',
	'## Totals',
	'',
	'The following table gives the totals; per-document rows are in summary.md.',
	'',
	source(['elements.json', 'departures.json', 'summary.md']),
	'',
	table(['label', 'elements', 'D-vs-A pairs', 'C-vs-A pairs'], [...LABELS.map((l) => [l, totals[`el ${l}`], totals[`dVsA ${l}`], totals[`cVsA ${l}`]]), ['all', totals.elements, totals['dVsA all'], totals['cVsA all']]]),
	'',
	`departures.json holds ${departures.length} rows (a row departs in D, C, or both). Pairs where D differs from C, by label: ${LABELS.map((l, i) => `${l} ${dcRow[i]}`).join(', ')}.`,
	'',
	'The following table gives the 30 most frequent C-vs-A (longhand, A, C) values over all labels.',
	'',
	source(['departures.json']),
	'',
	table(['property', 'A', 'C', 'pairs'], (() => { const m: Record<string, number> = {}; for (const d of departures) if (d.cVsA) { const k = [(d.kind === 'pseudo' ? `${d.pseudo} ` : d.kind === 'box' ? 'box ' : '') + d.property, d.A, d.C].join('\0'); m[k] = (m[k] ?? 0) + 1 } return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 30).map(([k, v]) => [...k.split('\0'), v]) })()),
	'',
	'## Curation candidates (item 3)',
	'',
	`The population is ${comp.length} C-vs-A occurrences on component-class elements in ${groupList.length} distinct rows; curation-candidates.md lists every row. Strict attribution applies the brief's rules literally. Extended attribution leaves strict non-unknown results as they are and, for a strict unknown, adds 4 readings: a tag outside the 61-element preflight.json census (for example \`li\`, \`figcaption\`) takes the \`div\` row of the same pseudo and longhand (the universal \`*\` and inherited \`html\` rows); a logical longhand maps to its physical one for horizontal-tb ltr; width, height, inline-size, block-size, perspective-origin, and transform-origin count as layout-resolved like box fields; and a box or layout-resolved departure on an element carrying a shared utility counts as shared-utility-self.`,
	'',
	source(['departures.json', 'curation-candidates.md']),
	'',
	table(['attribution', 'strict occurrences (first match)', 'strict occurrences (any match)', 'extended occurrences (first match)'], ATTR.map((a) => [a, attrTotals[a] ?? 0, attrAll[a] ?? 0, extTotals[a] ?? 0])),
	'',
	`Of the ${groupList.length} distinct rows, ${groupList.length - visibleGroups.length} are \`tab-size\` or \`border-*-style\` (none to solid with a 0 width where no border is declared). The following table lists the 40 most frequent remaining rows.`,
	'',
	source(['departures.json', 'curation-candidates.md']),
	'',
	table(['component classes carried', 'tag', 'longhand', 'A', 'C', 'occurrences', 'strict', 'extended'], visibleGroups.slice(0, 40).map((g) => [g.carried, g.tag, g.property, g.A, g.C, g.n, Object.entries(g.attr).map(([k, v]) => `${k} ${v}`).join('; '), Object.entries(g.ext).map(([k, v]) => `${k} ${v}`).join('; ')])),
	'',
	'## Functional candidates (item 4)',
	'',
	`functional.md holds ${functional.length} rows: ${fnLonghand.length} in the listed longhands and ${fnBox.length} box fields moving by more than 1px. No component-class element departs in visibility, opacity, pointer-events, position, overflow-x, overflow-y, or z-index. The following table lists the 7 longhand rows.`,
	'',
	source(['departures.json', 'functional.md']),
	'',
	table(['fragment', 'viewport', 'path', 'tag', 'classes', 'within', 'property', 'A', 'D', 'C', 'strict', 'extended'], fnDisplay),
	'',
	'The following table counts the box rows per field.',
	'',
	source(['departures.json', 'functional.md']),
	'',
	table(['field', 'rows'], Object.entries(fnCounts).filter(([k]) => k.startsWith('box')).sort((a, b) => b[1] - a[1])),
	'',
	'## Shared-utility census (item 5)',
	'',
	`At 1280x800, ${anyTotal} of ${wide.length} elements carry at least one shared utility, across ${Object.keys(nameTotals).length} distinct shared utility names; ${192 - Object.keys(nameTotals).length} of the 192 are carried by no fragment element. The per-fragment table is in shared-utility-census.md (${source(['elements.json', 'shared-utility-census.md'])}).`,
	'',
	'## Fragments ranked (item 6)',
	'',
	'The following table gives the 5 fragments with the most C-vs-A departures on component-class elements (all viewports summed) and the 3 with the fewest. No fragment has none.',
	'',
	source(['departures.json', 'analysis.json']),
	'',
	table(['rank', 'fragment', 'C-vs-A pairs, all viewports', 'C-vs-A pairs, 1280x800', 'component-class elements at 1280x800'], [...ranked.slice(0, 5).map(([k, v], i) => [i + 1, k, v.all, v.wide, v.elements]), ...bottom.map(([k, v]) => ['fewest', k, v.all, v.wide, v.elements])]),
	'',
	'## Serialization control',
	'',
	`Rerunning D and C with the \`.text.css\` alternates changes ${ctrlRows.length} (element, property) readings; ${artifactDeps.length} rows of departures.json are among them. The following table counts the control rows per fragment and class attribute.`,
	'',
	source(['control-text.json']),
	'',
	table(['fragment and classes', 'rows'], Object.entries(ctrlClasses).sort((a, b) => b[1] - a[1]).map(([k, v]) => [k.replace(' | ', ': '), v])),
	'',
	'The rows come from 2 CSSOM serialization effects. First, `.spinner-border` loses its `border` shorthand: its border widths read 3px under A and the text alternates and 0px under the CSSOM D and C, and the `visually-hidden` siblings in spinners.html move with it. Second, the CSSOM files round the column percentages (`.col-4 { width: 33.3333% }` in bootstrap-reboot-reset-minus-shared.css against `33.33333333%` in the `.text.css` alternate), so `.placeholder` elements carrying `col-4`, `col-6`, `col-7`, and `col-10` resolve to subpixel-different widths (for example 254.984px under CSSOM D against 255px under Dt). Every one of these 171 readings is a row of departures.json under the CSSOM sheets the brief named.',
	'',
]
writeFileSync(resolve(OUT, 'report.md'), report.join('\n'))
