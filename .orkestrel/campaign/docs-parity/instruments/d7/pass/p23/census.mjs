// P23 census: what the equality gate compares in one checkout, row by row, so a row that passes with
// both sides absent, a guide row the source lacks, or an interface with methods and no Methods table
// cannot hide behind `disagreements found: 0`. Run from the checkout root: node census.mjs <root>
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { pathToFileURL } from 'node:url'
const root = process.argv[2]
const guideModule = await import(pathToFileURL(join(root, 'node_modules/@orkestrel/guide/dist/src/core/index.js')).href)
const { createGuide, createSource, parseManifest, findDrift, computeSymbolKey } = guideModule
const files = {}
function walk(dir) {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry)
		if (statSync(full).isDirectory()) { if (entry !== 'node_modules') walk(full); continue }
		if (full.endsWith('.ts') || full.endsWith('.md')) files[relative(root, full).replaceAll('\\', '/')] = readFileSync(full, 'utf8')
	}
}
for (const dir of ['src', 'guides', 'tests']) { try { walk(join(root, dir)) } catch {} }
for (const name of ['README.md', 'AGENTS.md']) { try { files[name] = readFileSync(join(root, name), 'utf8') } catch {} }
const manifest = parseManifest(files['guides/README.md'], 'guides')
const out = { root, manifestRows: manifest.length, guides: [] }
for (const entry of manifest) {
	const guide = createGuide(files[entry.spec])
	const source = createSource({ files, module: entry.source })
	const declared = new Map(source.surface().map((s) => [computeSymbolKey(s), s]))
	const documented = new Set(guide.surface().map((s) => computeSymbolKey(s)))
	const rows = { equal: [], differ: [], guideAbsent: [], sourceAbsent: [], bothAbsent: [], unmatched: [] }
	for (const symbol of guide.surface()) {
		const key = computeSymbolKey(symbol)
		const match = declared.get(key)
		if (match === undefined) { rows.unmatched.push(key); continue }
		const g = symbol.summary, s = match.summary
		if (g === undefined && s === undefined) rows.bothAbsent.push(key)
		else if (g === undefined) rows.guideAbsent.push(key)
		else if (s === undefined) rows.sourceAbsent.push(key)
		else if (g === s) rows.equal.push(key)
		else rows.differ.push(key)
	}
	const undocumented = [...declared.keys()].filter((k) => !documented.has(k))
	const methods = { equal: [], differ: [], guideAbsent: [], sourceAbsent: [], bothAbsent: [], unmatched: [] }
	const groups = guide.methods()
	const grouped = new Set(groups.map((g) => g.interface))
	for (const group of groups) {
		const members = new Map(source.methods(group.interface).map((m) => [m.name, m]))
		for (const m of group.methods) {
			const key = `${group.interface}.${m.name}`
			const member = members.get(m.name)
			if (member === undefined) { methods.unmatched.push(key); continue }
			const g = m.summary, s = member.summary
			if (g === undefined && s === undefined) methods.bothAbsent.push(key)
			else if (g === undefined) methods.guideAbsent.push(key)
			else if (s === undefined) methods.sourceAbsent.push(key)
			else if (g === s) methods.equal.push(key)
			else methods.differ.push(key)
		}
	}
	// every source interface or class with call-signature members, and whether a Methods table groups it
	const withMethods = []
	for (const symbol of source.surface()) {
		if (symbol.keyword !== 'interface' && symbol.keyword !== 'class') continue
		const own = source.methods(symbol.name)
		if (own.length === 0) continue
		withMethods.push({ name: symbol.name, keyword: symbol.keyword, methods: own.length, grouped: grouped.has(symbol.name), undescribed: own.filter((m) => m.summary === undefined).map((m) => m.name) })
	}
	const titledFences = [...new Set(guide.fences().map((f) => f.title).filter((t) => t !== undefined))]
	const titledExamples = source.examples().filter((e) => e.title !== undefined).map((e) => `${e.name}:${e.title}`)
	const pairs = titledFences.filter((t) => source.examples().some((e) => e.title === t))
	const drift = findDrift(guide, source)
	out.guides.push({ spec: entry.spec, source: entry.source, surface: { counts: Object.fromEntries(Object.entries(rows).map(([k, v]) => [k, v.length])), guideAbsent: rows.guideAbsent, sourceAbsent: rows.sourceAbsent, bothAbsent: rows.bothAbsent, unmatched: rows.unmatched, differ: rows.differ, undocumentedInSource: undocumented }, methods: { groups: groups.length, counts: Object.fromEntries(Object.entries(methods).map(([k, v]) => [k, v.length])), guideAbsent: methods.guideAbsent, sourceAbsent: methods.sourceAbsent, bothAbsent: methods.bothAbsent, unmatched: methods.unmatched, differ: methods.differ }, owners: withMethods, examples: { titledFences, titledExamples, pairs }, findDrift: drift.length, findDriftKeys: drift.map((d) => d.key) })
}
console.log(JSON.stringify(out, null, 1))
