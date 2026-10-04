import { readFileSync, writeFileSync } from 'node:fs'
const M3 = '/home/user/veneer/tmp/probes/flip/m3-components'
const dep = JSON.parse(readFileSync(`${M3}/departures.json`, 'utf8')).departures
const el = JSON.parse(readFileSync(`${M3}/elements.json`, 'utf8'))
const ctl = JSON.parse(readFileSync(`${M3}/control-text.json`, 'utf8'))
const pf = JSON.parse(readFileSync('/home/user/veneer/tests/fixtures/tailwindcss/preflight.json', 'utf8'))
const pfRow = new Map<string, any>(pf.rows.map((r: any) => [`${r.element}\0${r.pseudo ?? ''}\0${r.longhand}`, r]))
const pfEls = new Set(pf.elements)
const tally = (xs: any[], key: (x: any) => string) => { const m: Record<string, number> = {}; for (const x of xs) m[key(x)] = (m[key(x)] ?? 0) + 1; return m }
const top = (m: Record<string, number>, n: number) => Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, n)
const out: Record<string, unknown> = {}
out.docs = el.docs.length
out.docsByViewport = tally(el.docs, (d) => d.viewport)
out.elements = el.elements.length
out.longhands = [...new Set(el.docs.map((d: any) => d.longhands))]
out.labels = tally(el.elements, (e) => e.label)
out.rows = dep.length
out.dVsA = tally(dep.filter((d: any) => d.dVsA), (d) => d.label)
out.cVsA = tally(dep.filter((d: any) => d.cVsA), (d) => d.label)
out.dVsC = tally(dep.filter((d: any) => d.dVsC), (d) => d.label)
const key = (d: any) => `${d.fragment}\0${d.viewport}\0${d.path}`
out.tabSizeElementsD = new Set(dep.filter((d: any) => d.kind === 'longhand' && d.property === 'tab-size' && d.A === '8' && d.D === '4').map(key)).size
out.tabSizeElementsC = new Set(dep.filter((d: any) => d.kind === 'longhand' && d.property === 'tab-size' && d.A === '8' && d.C === '4').map(key)).size
out.borderStyleElementsByLonghand = tally(dep.filter((d: any) => d.kind === 'longhand' && /^border-(top|right|bottom|left)-style$/.test(d.property) && d.A === 'none' && d.C === 'solid'), (d) => d.property)
const vis = tally(dep.filter((d: any) => d.cVsA), (d) => `${d.kind === 'pseudo' ? d.pseudo + ' ' : d.kind === 'box' ? 'box ' : ''}${d.property} | ${d.A} -> ${d.C}`)
out.topValues = top(vis, 40)
const comp = dep.filter((d: any) => d.label === 'component-class' && d.cVsA)
out.compCvsA = comp.length
out.strict = tally(comp, (d) => d.attribution)
out.extended = tally(comp, (d) => d.extended ?? 'n/a')
// Preflight grounding: why each strict 'preflight' occurrence got the label.
const strictPf = comp.filter((d: any) => d.attribution === 'preflight')
const grounding = tally(strictPf, (d) => {
	const row = d.kind !== 'box' ? pfRow.get(`${d.tag}\0${d.pseudo ?? ''}\0${d.property}`) : undefined
	const dc = d.D !== d.C
	if (row && dc) return 'row+DneC'
	if (row) return d.C === row.preflight ? 'row-only,C=row.preflight' : 'row-only,C!=row.preflight'
	return 'DneC-only'
})
out.strictPreflightGrounding = grounding
out.strictPreflightDneCOnlyBox = strictPf.filter((d: any) => d.kind === 'box' && d.D !== d.C).length
// Extended additions over strict and their rule.
const added = comp.filter((d: any) => d.attribution === 'unknown' && d.extended === 'preflight')
out.extendedPreflightAdded = added.length
out.extendedPreflightAddedByDivFallback = added.filter((d: any) => !pfEls.has(d.tag) && pfRow.has(`div\0${d.pseudo ?? ''}\0${d.property}`)).length
out.extendedPreflightAddedTags = top(tally(added.filter((d: any) => !pfEls.has(d.tag)), (d) => d.tag), 10)
// Shorthand names in the enumeration
out.shorthandRows = tally(dep.filter((d: any) => d.kind !== 'box' && ['background-position', 'contain-intrinsic-size', 'font-variant', 'mask-position', 'text-decoration', '-webkit-mask-box-image'].includes(d.property)), (d) => `${d.label} ${d.property}`)
// Fragments
const byFrag = tally(comp, (d) => d.fragment)
out.topFragments = top(byFrag, 5)
out.fewestFragments = Object.entries(byFrag).sort((a, b) => a[1] - b[1]).slice(0, 3)
out.offcanvasByVp = tally(comp.filter((d: any) => ['offcanvas.html', 'modal.html', 'navbar.html'].includes(d.fragment)), (d) => d.fragment + ' ' + d.viewport)
// Functional
const FN = new Set(['display', 'visibility', 'opacity', 'pointer-events', 'position', 'overflow-x', 'overflow-y', 'z-index'])
const compAll = dep.filter((d: any) => d.label === 'component-class')
out.functionalLonghand = tally(compAll.filter((d: any) => d.kind === 'longhand' && FN.has(d.property)), (d) => d.property)
out.displayRows = compAll.filter((d: any) => d.kind === 'longhand' && d.property === 'display').map((d: any) => [d.fragment, d.tag, d.classes, d.A, d.D, d.C])
const big = (a: string, b: string) => a === 'none' || b === 'none' ? a !== b : Math.abs(Number(a) - Number(b)) > 1
out.boxOver1 = tally(compAll.filter((d: any) => d.kind === 'box' && (big(d.A, d.C) || big(d.A, d.D))), (d) => d.property)
// Control
out.controlRows = ctl.count
const depKeys = new Set(dep.map((d: any) => `${key(d)}\0${d.kind === 'pseudo' ? d.pseudo + ' ' : d.kind === 'box' ? 'box ' : ''}${d.property}`))
out.controlInDepartures = ctl.rows.filter((r: any) => depKeys.has(`${r.fragment}\0${r.viewport}\0${r.path}\0${r.property}`)).length
out.controlByFragment = tally(ctl.rows, (r) => r.fragment)
out.controlSamples = ctl.rows.filter((r: any) => /col-4|spinner-border/.test(r.classes)).slice(0, 4)
// Census at 1280x800
const wide = el.elements.filter((e: any) => e.viewport === '1280x800')
out.censusWide = { elements: wide.length, withShared: wide.filter((e: any) => e.sharedSelf.length).length, distinct: new Set(wide.flatMap((e: any) => e.sharedSelf)).size }
// Top visible component rows
const groups = tally(comp, (d) => `${d.classes.split(/\s+/).filter(Boolean).join(' ')} | ${d.tag} | ${d.kind === 'pseudo' ? d.pseudo + ' ' : d.kind === 'box' ? 'box ' : ''}${d.property} | ${d.A} -> ${d.C}`)
out.topCompRows = top(Object.fromEntries(Object.entries(groups).filter(([k]) => !/tab-size|border-(top|right|bottom|left|block-start|block-end|inline-start|inline-end)-style/.test(k))), 15)
writeFileSync('/home/user/veneer/tmp/probes/flip/verify/m3-check.json', JSON.stringify(out, null, '\t') + '\n')
console.log(JSON.stringify(out, null, 1))
