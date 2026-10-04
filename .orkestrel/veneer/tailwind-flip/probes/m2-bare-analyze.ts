import { readFileSync, writeFileSync } from 'node:fs'

const OUT = '/home/user/veneer/tmp/probes/flip/m2-bare'
const PROBE = `${OUT}/probe.ts`
const ANALYZE = `${OUT}/analyze.ts`
const ROWS = `${OUT}/rows.json`
const READINGS = `${OUT}/readings.json`
const ANALYSIS = `${OUT}/analysis.json`
const rowsFile = JSON.parse(readFileSync(ROWS, 'utf8'))
const r = JSON.parse(readFileSync(READINGS, 'utf8'))
const record = JSON.parse(readFileSync('/home/user/veneer/tests/fixtures/tailwindcss/preflight.json', 'utf8'))
type Row = { element: string; pseudo?: string; longhand: string; A: string; B: string; C: string; D: string }
const rows: Row[] = rowsFile.rows
const elements: string[] = record.elements
const subjects = ['', '::after', '::backdrop', '::before']
const esc = (s: string) => String(s).replace(/\|/gu, '\\|')
const L: string[] = []
const src = (out: string) => L.push('', `Probe: \`${PROBE}\` then \`${ANALYZE}\`. Output: \`${out}\`.`, '')

const moved = (k: 'B' | 'C' | 'D') => rows.filter((x) => x[k] !== x.A)
const counts: Record<string, unknown> = {}
const cOnly = rows.filter((x) => x.C !== x.A && x.D === x.A)
const dOnly = rows.filter((x) => x.D !== x.A && x.C === x.A)
const both = rows.filter((x) => x.D !== x.A && x.C !== x.A)
const bothDiffer = both.filter((x) => x.C !== x.D)
const bNotD = rows.filter((x) => x.B !== x.D)
const recordKeys = new Set(record.rows.map((x: { element: string; pseudo?: string; longhand: string }) => `${x.element}\0${x.pseudo ?? ''}\0${x.longhand}`))
const bNotRecord = moved('B').filter((x) => !recordKeys.has(`${x.element}\0${x.pseudo ?? ''}\0${x.longhand}`))

L.push('# M2 bare: the reboot in reset on bare elements', '')
L.push(`Chromium ${r.chromium}, viewport 1280x720 (the iframe size \`createPreflightFrame\` in tests/setupStyles.ts sets), sheets as inline <style> elements in condition order through \`page.setContent\`. Every non-custom enumerable computed longhand (${r.enumerationSize} names) read per subject. Subjects: each of the 61 preflight.json elements, mounted bare and alone in body (svg in the SVG namespace), plus each pseudo-element of the 20 that \`isExposed\` passes under condition A; the same subject set is reused under B, C, and D. Exposure recomputed independently under B, C, and D differs from A for ${Object.keys(r.exposureDiff).length} conditions.`)
L.push('', `Shared set sizes from CLASS_NAMES.bootstrap and comparison.json: shared utilities ${r.sharedUtilities}, shared components ${r.sharedComponents} (${r.sharedComponentNames.join(', ')}).`)
L.push('', 'The following list gives each condition\'s sheets in <style> order and the CSSOM top-level rule count per sheet.', '')
for (const [k, v] of Object.entries(rowsFile.conditions as Record<string, string[]>)) L.push(`- ${k}: ${v.join(' then ')}; top-level rules ${r.ruleCounts[k].join(', ')}.`)
L.push('', `Exposed pseudo-elements under A: every one of the 61 elements exposes exactly ::after, ::backdrop, and ::before (${elements.every((e) => r.exposureUnderA[e].join() === '::after,::backdrop,::before')}); the other 17 preflight pseudos are not exposed on any bare element. Subjects read: ${elements.length * 4}.`)

// 1
L.push('', '## 1. Rows differing from A', '')
L.push(`rows.json holds ${rows.length} (subject, longhand) rows where B, C, or D differs from A, with all four values.`)
src(ROWS)

// 2
L.push('## 2. Moved longhands per condition against A', '')
L.push('The following table gives the totals.', '')
L.push('| Condition | Moved rows | Elements with a move |', '| --- | --- | --- |')
for (const k of ['B', 'C', 'D'] as const) {
	const m = moved(k)
	counts[k] = m.length
	L.push(`| ${k} | ${m.length} | ${new Set(m.map((x) => x.element)).size} |`)
}
L.push('', `Cross-checks: rows where B differs from D: ${bNotD.length}. Rows moved under both C and D: ${both.length}; of those, C differs from D in ${bothDiffer.length}. Rows moved under C only: ${cOnly.length}. Rows moved under D only: ${dOnly.length}.`)
src(ROWS)
const perElement: Record<string, Record<string, Record<string, number>>> = {}
for (const k of ['B', 'C', 'D'] as const) {
	perElement[k] = {}
	L.push(`### Condition ${k} per element`, '', `The following table gives condition ${k}'s moved longhand count per element and subject.`, '')
	L.push('| Element | host | ::after | ::backdrop | ::before | total |', '| --- | --- | --- | --- | --- | --- |')
	for (const e of elements) {
		const c = subjects.map((s) => moved(k).filter((x) => x.element === e && (x.pseudo ?? '') === s).length)
		perElement[k][e] = Object.fromEntries(subjects.map((s, i) => [s || 'host', c[i]]))
		L.push(`| ${e} | ${c.join(' | ')} | ${c.reduce((a, b) => a + b, 0)} |`)
	}
	src(ROWS)
}

// 3
L.push('## 3. C-only and D-only sets', '')
L.push(`C-only (C differs from A, D equals A): ${cOnly.length} rows over ${new Set(cOnly.map((x) => x.element)).size} elements. D-only (D differs from A, C equals A): ${dOnly.length} rows. Rows that move under both C and D: ${both.length}, with C equal to D in ${both.length - bothDiffer.length}.`)
L.push('', 'The following table lists every C-only row with its values under A (equal to D) and C, and B for reference.', '')
L.push('| Element | Pseudo | Longhand | A (= D) | C | B |', '| --- | --- | --- | --- | --- | --- |')
for (const x of cOnly) L.push(`| ${x.element} | ${x.pseudo ?? ''} | ${x.longhand} | ${esc(x.A)} | ${esc(x.C)} | ${esc(x.B)} |`)
src(ROWS)
L.push('The following table counts C-only rows per longhand.', '')
const byLonghand = (set: Row[]) => Object.entries(set.reduce<Record<string, number>>((a, x) => ((a[x.longhand] = (a[x.longhand] ?? 0) + 1), a), {})).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))
L.push('| Longhand | C-only rows |', '| --- | --- |')
for (const [l, n] of byLonghand(cOnly)) L.push(`| ${l} | ${n} |`)
src(ROWS)
L.push(`D-only set: ${dOnly.length} rows, so no per-element table. The preflight declarations the reboot never made are, on this reading, the ${both.length} rows that move identically under C and D; the following table gives them per element with counts and the 5 most frequent longhands.`, '')
L.push('| Element | Rows (C and D) | Top longhands (count) |', '| --- | --- | --- |')
for (const e of elements) {
	const set = both.filter((x) => x.element === e)
	L.push(`| ${e} | ${set.length} | ${byLonghand(set).slice(0, 5).map(([l, n]) => `${l} (${n})`).join(', ')} |`)
}
src(ROWS)

// 4
const ag = r.agreement
L.push('## 4. Agreement with preflight.json', '')
L.push(`Record rows: ${record.rows.length}. Rows whose (element, pseudo, longhand) alone equals A and preflight equals B: ${ag.equal}. Rows that differ: ${ag.differ}. Rows whose longhand this Chromium does not enumerate: ${ag.missing} (all \`row-rule-color\`, on button, input, select, and textarea hosts and their ::after, ::backdrop, ::before). Rows that move under B and have no record row: ${bNotRecord.length}.`)
L.push('', `Longhands in the record and not in this enumeration: ${r.recordNotEnumerated.join(', ')}. Longhands in this enumeration and in no record row: ${r.enumeratedNotRecord.length} of ${r.enumerationSize} (full list in readings.json \`enumeratedNotRecord\`).`)
L.push('', `The following table lists the differing rows (${Math.min(20, ag.differ)} of ${ag.differ}).`, '')
L.push('| Element | Pseudo | Longhand | Record alone | A | Record preflight | B |', '| --- | --- | --- | --- | --- | --- | --- |')
for (const x of ag.differing.slice(0, 20)) L.push(`| ${x.element} | ${x.pseudo ?? ''} | ${x.longhand} | ${esc(x.alone)} | ${esc(x.A)} | ${esc(x.preflight)} | ${esc(x.B)} |`)
src(READINGS)
L.push('The following table lists the B-moved rows that have no record row.', '')
L.push('| Element | Pseudo | Longhand | A | B |', '| --- | --- | --- | --- | --- |')
for (const x of bNotRecord) L.push(`| ${x.element} | ${x.pseudo ?? ''} | ${x.longhand} | ${esc(x.A)} | ${esc(x.B)} |`)
src(ROWS)

// 5 and 6
const W = r.witnesses
const keys5 = ['div[hidden]', 'div[hidden].d-flex', 'input[list]::-webkit-calendar-picker-indicator']
L.push('## 5. The two important reboot declarations', '')
L.push('Witnesses mounted from markup in a wrapper div appended to body, html carrying data-bs-theme="light". The picker row reports the pseudo display, whether a planted pseudo-only color reaches it (exposed), and the host display.', '')
L.push('| Witness | Longhand | A | B | C | D |', '| --- | --- | --- | --- | --- | --- |')
for (const k of keys5) for (const l of Object.keys(W.A[k])) L.push(`| ${esc(k)} | ${l} | ${['A', 'B', 'C', 'D'].map((c) => esc(W[c][k][l])).join(' | ')} |`)
L.push('', 'Rule placement read from the sheet text: in bootstrap-lifted.css the two important reboot rules sit outside every @layer block, \`[list]:not([type=date]):not([type=datetime-local]):not([type=month]):not([type=week]):not([type=time])::-webkit-calendar-picker-indicator { display: none !important }\` at lines 464 to 466 and \`[hidden] { display: none !important }\` at lines 567 to 569, and \`.d-flex { display: flex !important }\` is unlayered at lines 7338 to 7340. In reboot-in-reset.css they sit inside @layer reset (lines 328 and 447). tailwind-flipped.css carries \`[hidden]:where(:not([hidden="until-found"])) { display: none !important }\` and \`::-webkit-calendar-picker-indicator { line-height: 1 }\` in its base layer (lines 165 and 153). Chromium ${r.chromium} does not expose ::-webkit-calendar-picker-indicator to getComputedStyle on this input (exposed false under every condition): the pseudo reading returns the host display, so the picker display row does not witness the reboot rule.')
src(READINGS)
L.push('## 6. Typography witnesses', '')
L.push('Same mounting as item 5. Body and html are the page\'s own elements. Shorthands are read as longhands. B is included for reference.', '')
L.push('| Witness | Longhand | A | C | D | B | C differs from A | C differs from D |', '| --- | --- | --- | --- | --- | --- | --- | --- |')
const witnessRows: unknown[] = []
for (const k of Object.keys(W.A)) {
	if (keys5.includes(k)) continue
	for (const l of Object.keys(W.A[k])) {
		const v = ['A', 'C', 'D', 'B'].map((c) => W[c][k][l])
		witnessRows.push({ witness: k, longhand: l, A: v[0], C: v[1], D: v[2], B: v[3] })
		L.push(`| ${esc(k)} | ${l} | ${v.map(esc).join(' | ')} | ${v[1] !== v[0] ? 'yes' : ''} | ${v[1] !== v[2] ? 'yes' : ''} |`)
	}
}
src(READINGS)

writeFileSync(ANALYSIS, JSON.stringify({ counts, perElement, cOnly, dOnly, bothCount: both.length, bothDiffer, bNotD, bNotRecord, witnessRows }, null, '\t'))
writeFileSync(`${OUT}/report.md`, L.join('\n') + '\n')
console.log('written', L.length)
