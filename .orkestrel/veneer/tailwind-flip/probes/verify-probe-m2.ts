import { readFileSync, writeFileSync } from 'node:fs'
const M2 = '/home/user/veneer/tmp/probes/flip/m2-bare'
const rows = JSON.parse(readFileSync(`${M2}/rows.json`, 'utf8')).rows
const r = JSON.parse(readFileSync(`${M2}/readings.json`, 'utf8'))
const tally = (xs: any[], key: (x: any) => string) => { const m: Record<string, number> = {}; for (const x of xs) m[key(x)] = (m[key(x)] ?? 0) + 1; return m }
const out: Record<string, unknown> = {}
out.chromium = r.chromium
out.enumerationSize = r.enumerationSize
out.exposure = tally(Object.values(r.exposureUnderA), (v: any) => v.join(','))
out.exposureDiff = r.exposureDiff
out.rows = rows.length
for (const k of ['B', 'C', 'D']) out['moved' + k] = rows.filter((x: any) => x[k] !== x.A).length
for (const k of ['B', 'C', 'D']) out['movedElements' + k] = new Set(rows.filter((x: any) => x[k] !== x.A).map((x: any) => x.element)).size
out.BneD = rows.filter((x: any) => x.B !== x.D).length
out.CneDamongBoth = rows.filter((x: any) => x.C !== x.A && x.D !== x.A && x.C !== x.D).length
const cOnly = rows.filter((x: any) => x.C !== x.A && x.D === x.A)
out.cOnly = cOnly.length
out.cOnlyElements = new Set(cOnly.map((x: any) => x.element)).size
out.dOnly = rows.filter((x: any) => x.D !== x.A && x.C === x.A).length
out.cOnlyByLonghand = Object.entries(tally(cOnly, (x) => x.longhand)).sort((a, b) => b[1] - a[1])
out.cOnlyPseudo = cOnly.filter((x: any) => x.pseudo).length
const pick = (el: string, lh: string) => rows.filter((x: any) => x.element === el && !x.pseudo && x.longhand === lh).map((x: any) => `${x.A}/${x.B}/${x.C}/${x.D}`)[0] ?? 'no row'
out.samples = Object.fromEntries([['h1', 'font-size'], ['h3', 'font-size'], ['h5', 'font-size'], ['h6', 'font-weight'], ['h1', 'line-height'], ['h2', 'line-height'], ['h1', 'margin-bottom'], ['p', 'margin-bottom'], ['dd', 'margin-bottom'], ['legend', 'margin-bottom'], ['hr', 'margin-top'], ['hr', 'border-top-style'], ['code', 'font-family'], ['code', 'font-size'], ['code', 'line-height'], ['small', 'font-size'], ['small', 'line-height'], ['kbd', 'padding-left'], ['kbd', 'padding-top'], ['mark', 'padding-top'], ['ul', 'padding-left'], ['caption', 'padding-top'], ['caption', 'height'], ['fieldset', 'border-top-style'], ['iframe', 'border-top-style'], ['img', 'display'], ['svg', 'display'], ['button', 'background-color'], ['button', 'padding-left'], ['button', 'border-top-width'], ['html', 'font-family'], ['html', 'line-height'], ['table', 'border-top-color'], ['body', 'font-family']].map(([e, l]) => [`${e} ${l}`, pick(e, l)]))
out.agreement = { equal: r.agreement.equal, differ: r.agreement.differ, missing: r.agreement.missing, missingLonghands: tally(r.agreement.missingRows, (x) => x.longhand), differingSample: r.agreement.differing.map((x: any) => `${x.element}${x.pseudo ?? ''} ${x.longhand}: record ${x.alone}/${x.preflight} vs ${x.A}/${x.B}`) }
out.recordNotEnumerated = r.recordNotEnumerated
out.enumeratedNotRecord = r.enumeratedNotRecord.length
const W = r.witnesses
const w = (k: string, p: string) => ['A', 'B', 'C', 'D'].map((c) => W[c][k]?.[p]).join(' / ')
out.witness = {
	hidden: w('div[hidden]', 'display'), hiddenDflex: w('div[hidden].d-flex', 'display'),
	aColor: w('a[href]', 'color'), aDeco: w('a[href]', 'text-decoration-line'),
	picker: ['A', 'B', 'C', 'D'].map((c) => JSON.stringify(W[c]['input[list]::-webkit-calendar-picker-indicator'])).join(' / '),
	inputBg: w('input[type=text]', 'background-color'), inputBorder: w('input[type=text]', 'border-top-width') + ' | ' + w('input[type=text]', 'border-top-style') + ' | ' + w('input[type=text]', 'border-top-color'),
	ulList: w('ul', 'list-style-type'), bodyFont: w('body', 'font-family'), h6size: w('h6', 'font-size'), supTop: w('sup', 'top'), subTop: w('sub', 'top'), dtWeight: w('dt', 'font-weight'), buttonRadius: w('button', 'border-top-left-radius'), htmlLine: w('html', 'line-height'),
}
writeFileSync('/home/user/veneer/tmp/probes/flip/verify/m2-check.json', JSON.stringify(out, null, '\t') + '\n')
console.log(JSON.stringify(out, null, 1))
