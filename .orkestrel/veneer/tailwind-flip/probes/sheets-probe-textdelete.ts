import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { chromium } from 'playwright'
const OUT = '/home/user/veneer/tmp/probes/flip/sheets'
const m = JSON.parse(readFileSync(`${OUT}/measurements.json`, 'utf8'))
const core = await import('/home/user/veneer/dist/src/core/index.js')
const comparison = JSON.parse(readFileSync('/home/user/veneer/tests/fixtures/tailwindcss/comparison.json', 'utf8'))
const utilities = new Set<string>()
const pending: unknown[] = [core.CLASS_NAMES.bootstrap.utilities]
while (pending.length) { const v = pending.pop(); if (typeof v === 'string') utilities.add(v); else for (const c of Object.values(v as object)) pending.push(c) }
const shared: string[] = comparison.shared.filter((n: string) => utilities.has(n))
if (shared.length !== 192) throw new Error('size')
const heads = new Set(shared.map((n) => '.' + n + ' {'))
function textDelete(text: string) {
	const lines = text.split('\n')
	const kept: string[] = []
	let removed = 0
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]
		const indent = line.length - line.trimStart().length
		if (heads.has(line.trim())) {
			let j = i + 1
			while (j < lines.length && !(lines[j].length - lines[j].trimStart().length === indent && lines[j].trim() === '}')) j++
			removed++
			i = j
			continue
		}
		kept.push(line)
	}
	return { text: kept.join('\n'), removed }
}
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage()
const result: Record<string, unknown> = {}
for (const [source, target] of [['bootstrap-lifted.css', 'bootstrap-lifted-minus-shared.text.css'], ['bootstrap-reboot-reset.css', 'bootstrap-reboot-reset-minus-shared.text.css']]) {
	const original = readFileSync(`${OUT}/${source}`, 'utf8')
	const { text, removed } = textDelete(original)
	writeFileSync(`${OUT}/${target}`, text)
	const check = await page.evaluate(([original, text, names]) => {
		const targets = new Set((names as string[]).map((n) => '.' + n))
		const flat = (t: string) => { const s = new CSSStyleSheet(); s.replaceSync(t); const rows: string[] = []; const w = (l: CSSRuleList, ctx: string) => { for (const r of Array.from(l) as any[]) { if (r instanceof CSSStyleRule) rows.push(ctx + '|' + r.selectorText + '|' + r.style.cssText); else if (r instanceof CSSLayerBlockRule) w(r.cssRules, ctx + '>@layer ' + r.name); else if (r instanceof CSSMediaRule) w(r.cssRules, ctx + '>@media ' + r.conditionText); else if (r.cssRules) w(r.cssRules, ctx + '>' + r.constructor.name); else rows.push(ctx + '|' + r.cssText) } }; w(s.cssRules, ''); return rows }
		const a = flat(original as string).filter((row) => !targets.has(row.split('|')[1]))
		const b = flat(text as string)
		let same = a.length === b.length
		let firstDiff = -1
		for (let i = 0; i < Math.max(a.length, b.length); i++) if (a[i] !== b[i]) { same = false; firstDiff = i; break }
		return { expectedRows: a.length, actualRows: b.length, same, firstDiff, a: a[firstDiff], b: b[firstDiff] }
	}, [original, text, shared] as const)
	const sha = createHash('sha256').update(text).digest('hex')
	result[target] = { source, removed, bytes: Buffer.byteLength(text), sha256: sha, sourceStatements: (text.match(/@source/g) ?? []).length, important: (text.match(/!important/g) ?? []).length, matchesCssomDeletionOverOriginalParse: check }
}
await browser.close()
const manifest = JSON.parse(readFileSync(`${OUT}/manifest.json`, 'utf8'))
for (const [k, v] of Object.entries(result) as any) manifest[k] = { path: `${OUT}/${k}`, bytes: v.bytes, sha256: v.sha256, construction: `ALTERNATE to the CSSOM-serialized variant: ${v.source} as text, deleting each line whose trimmed text is '.NAME {' (NAME in the 192 shared utilities) through the next '}' line at the same indentation; no CSSOM serialization`, counts: { deletedRules: v.removed, source: v.sourceStatements, important: v.important, lines: readFileSync(`${OUT}/${k}`, 'utf8').split('\n').length, equalsOriginalParseMinusDeleted: v.matchesCssomDeletionOverOriginalParse.same } }
writeFileSync(`${OUT}/manifest.json`, JSON.stringify(manifest, null, '\t') + '\n')
writeFileSync(`${OUT}/textdelete.json`, JSON.stringify(result, null, '\t') + '\n')
console.log(JSON.stringify(result, null, 1))
