import { readFileSync, writeFileSync } from 'node:fs'
const M3 = '/home/user/veneer/tmp/probes/flip/m3-components'
const dep = JSON.parse(readFileSync(`${M3}/departures.json`, 'utf8')).departures
const el = JSON.parse(readFileSync(`${M3}/elements.json`, 'utf8')).elements
const ctl = JSON.parse(readFileSync(`${M3}/control-text.json`, 'utf8')).rows
const core = await import('/home/user/veneer/dist/src/core/index.js')
const leaves = (t: unknown): string[] => (typeof t === 'string' ? [t] : Object.values(t as object).flatMap(leaves))
const components = new Set(leaves(core.CLASS_NAMES.bootstrap.components))
const utilities = new Set(leaves(core.CLASS_NAMES.bootstrap.utilities))
const shared: string[] = JSON.parse(readFileSync('/home/user/veneer/tests/fixtures/tailwindcss/comparison.json', 'utf8')).shared
const su = shared.filter((n) => utilities.has(n))
const pf = JSON.parse(readFileSync('/home/user/veneer/tests/fixtures/tailwindcss/preflight.json', 'utf8'))
const pfEls = new Set(pf.elements)
const pfRows = new Set(pf.rows.map((r: any) => `${r.element}\0${r.pseudo ?? ''}\0${r.longhand}`))
const comp = dep.filter((d: any) => d.label === 'component-class' && d.cVsA)
const prop = (d: any) => (d.kind === 'pseudo' ? `${d.pseudo} ${d.property}` : d.kind === 'box' ? `box ${d.property}` : d.property)
const groups = new Map<string, number>()
for (const d of comp) { const k = [d.classes.split(/\s+/).filter((t: string) => components.has(t)).join(' '), d.tag, prop(d), d.A, d.C].join(' | '); groups.set(k, (groups.get(k) ?? 0) + 1) }
const out: Record<string, unknown> = {}
out.distinctRows = groups.size
out.tabOrBorderStyleRows = [...groups.keys()].filter((k) => { const p = k.split(' | ')[2]; return /(^|\s)tab-size$/.test(p) || /border-[a-z-]+-style$/.test(p) }).length
const pick = (re: RegExp) => [...groups].filter(([k]) => re.test(k)).sort((a, b) => b[1] - a[1]).slice(0, 4)
out.cardBodyGap = pick(/^card-body \| div \| (column|row)-gap \| 16px \| 12px$/)
out.modalTitle = pick(/^modal-title \| h4 \| font-weight/)
out.offcanvasTitle = pick(/^offcanvas-title \| h4 \|/)
out.listGroupItem = pick(/^list-group-item \| li \| list-style-type/)
out.offcanvasHeader = pick(/^offcanvas-header \| div \| height/)
out.ratio = pick(/^ratio ratio-4x3 \| div \|/)
out.cardFooter = pick(/^card-footer \| figcaption \| height/)
// Functional rows as analyze.ts states them: listed longhands + box fields moving >1px or none-vs-present
const FN = new Set(['display', 'visibility', 'opacity', 'pointer-events', 'position', 'overflow-x', 'overflow-y', 'z-index'])
const big = (a: string, b: string) => ((a === 'none') !== (b === 'none') ? true : a === 'none' ? false : Math.abs(Number(a) - Number(b)) > 1)
const compAll = dep.filter((d: any) => d.label === 'component-class')
out.functional = compAll.filter((d: any) => (d.kind === 'longhand' && FN.has(d.property)) || (d.kind === 'box' && (big(d.A, d.C) || big(d.A, d.D)))).length
// Census
const wide = el.filter((e: any) => e.viewport === '1280x800')
const carried = new Set(wide.flatMap((e: any) => e.sharedSelf))
out.sharedNone = su.filter((n) => !carried.has(n)).length
const all = new Set(el.flatMap((e: any) => e.sharedSelf))
out.sharedNoneAnyViewport = su.filter((n) => !all.has(n)).length
// Extended additions: replicate rule 1 (div fallback) count on strict unknowns
const unk = comp.filter((d: any) => d.attribution === 'unknown')
out.strictUnknown = unk.length
out.rule1DivFallback = unk.filter((d: any) => d.kind !== 'box' && !pfEls.has(d.tag) && pfRows.has(`div\0${d.pseudo ?? ''}\0${d.property}`)).length
out.rule1Tags = Object.entries(unk.filter((d: any) => d.kind !== 'box' && !pfEls.has(d.tag) && pfRows.has(`div\0${d.pseudo ?? ''}\0${d.property}`)).reduce((m: any, d: any) => ((m[d.tag] = (m[d.tag] ?? 0) + 1), m), {})).sort((a: any, b: any) => b[1] - a[1])
// Spinner A widths
out.spinnerA = ctl.filter((r: any) => /spinner-border/.test(r.classes) && r.property === 'border-top-width').map((r: any) => `${r.classes}: A ${r.A}, D ${r.D}, Dt ${r.Dt}`)
// col-4 text
for (const f of ['bootstrap-lifted.css', 'bootstrap-lifted-minus-shared.css', 'bootstrap-lifted-minus-shared.text.css']) {
	const t = readFileSync(`/home/user/veneer/tmp/probes/flip/sheets/${f}`, 'utf8')
	const m = t.match(/\.col-4 \{[^}]*\}/)
	out['col4 ' + f] = m ? m[0].replace(/\s+/g, ' ') : null
}
writeFileSync('/home/user/veneer/tmp/probes/flip/verify/m3-check-b.json', JSON.stringify(out, null, '\t') + '\n')
console.log(JSON.stringify(out, null, 1))
