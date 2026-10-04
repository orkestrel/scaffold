import { readFileSync, writeFileSync } from 'node:fs'
const DIR = '/home/user/veneer/tmp/probes/flip/m1-cascade'
const PROBE = `${DIR}/probe.ts`
const OUT = `${DIR}/output.json`
const data = JSON.parse(readFileSync(OUT, 'utf8'))
const cell = (s: string) => s.replace(/\|/g, '\\|')
const prov = `Probe: \`${PROBE}\`. Output: \`${OUT}\`.`
const table = (group: string) => {
	const rows = data.readings.filter((r: any) => r.group === group)
	return [
		prov,
		'',
		'| Reading | Element.property | Sheets in order | Value | Expected |',
		'| --- | --- | --- | --- | --- |',
		...rows.map((r: any) => `| ${r.id} | \`${r.target}\` ${r.property} | ${r.sheets.map((s: any) => `\`${cell(s.css)}\``).join(' → ')} | **${r.value}** | ${r.expect ?? ''}${r.matchesExpect === false ? ' (MISMATCH)' : ''} |`),
	].join('\n')
}
// group c as a matrix
const LAYERS = ['reset', 'base', 'bootstrap', 'theme', 'elements', 'components', 'surfaces', 'composables', 'modifiers', 'utilities', 'compat']
const kws: [string, string][] = [['rli', 'revert-layer !important'], ['rln', 'revert-layer'], ['rvi', 'revert !important'], ['usi', 'unset !important'], ['ini', 'initial !important'], ['ihi', 'inherit !important (margin-top, parent 7px)'], ['ihc', 'inherit !important (color, parent rgb(7, 7, 7))']]
const byId = new Map(data.readings.map((r: any) => [r.id, r]))
const matrix = [
	prov,
	'',
	'Sheet order "after": statement, BS, TW, L sheet. Sheet order "before": statement, L sheet, BS, TW. For L = compat the statement is the compat statement. The color rows replace BS and TW with `.x { color: rgb(16, 16, 16) !important }` and `@layer utilities { .x { color: rgb(12, 12, 12) } }`.',
	'',
	`| Declaration in @layer L | ${LAYERS.map((l) => `${l} after | ${l} before`).join(' | ')} |`,
	`| --- | ${LAYERS.map(() => '--- | ---').join(' | ')} |`,
	...kws.map(([tag, label]) => `| \`${label}\` | ${LAYERS.map((l) => `${(byId.get(`c.${tag}.${l}.after`) as any).value} | ${(byId.get(`c.${tag}.${l}.before`) as any).value}`).join(' | ')} |`),
	'',
	'Controls without an L sheet:',
	'',
	'| Reading | Body | Sheets in order | Value |',
	'| --- | --- | --- | --- |',
	...['c.ihi.base0', 'c.ihc.base0'].map((id) => { const r: any = byId.get(id); return `| ${id} | \`${cell(r.body)}\` | ${r.sheets.map((s: any) => `\`${cell(s.css)}\``).join(' → ')} | **${r.value}** |` }),
].join('\n')
const rollback = (grp: string) => {
	const rows = data.readings.filter((r: any) => r.group === grp)
	const src = (v: string) => ({ '4px': 'reset (RESET)', '12px': 'utilities (TW)', '16px': 'unlayered BS', '0px': 'user agent' } as Record<string, string>)[v] ?? '?'
	return [prov, '', '| Reading | Sheets in order | Value | Source of value |', '| --- | --- | --- | --- |', ...rows.map((r: any) => `| ${r.id} | ${r.sheets.map((s: any) => `\`${cell(s.css)}\``).join(' → ')} | **${r.value}** | ${src(r.value)} |`)].join('\n')
}
const cs = data.classSets
const md = `# M1 cascade mechanics

Chromium \`${data.chromium}\` (from \`browser.version()\`, launched with \`executablePath\` \`/opt/pw-browsers/chromium-1194/chrome-linux/chrome\` because the bundled Playwright expects \`chromium_headless_shell-1243\`, which is absent). ${data.readings.length} readings, each a fresh \`page.setContent\` with one inline \`<style>\` per sheet in the stated order; values are read from \`getComputedStyle\` by iterating its indexed longhand names.

Order statement: \`${data.statement}\`. Compat statement: \`${data.statementCompat}\`.

Definitions: BS is \`.x { margin-top: 16px !important }\`; TW is \`@layer utilities { .x { margin-top: 12px } }\`; RESET is \`@layer reset { .x { margin-top: 4px } }\`.

## Class sets

${prov}

The class sets have these sizes: shared ${cs.shared}, shared utilities ${cs.sharedUtilities}, shared components ${cs.sharedComponents}; category sizes ${Object.entries(cs.categorySizes).map(([k, v]) => `${k} ${v}`).join(', ')}. Shared components: ${cs.sharedComponentNames.map((n: string) => `\`${n}\``).join(', ')}.

## Findings

- Unlayered \`!important\` beats layered normal in both source orders: a.1 and a.2 read 16px.
- Layered \`!important\` beats unlayered \`!important\` in both source orders and from either layer: b.1 to b.4 read 12px.
- Among layered importants the earlier layer wins regardless of source order: b.5 and b.6 (reset 4px !important against utilities 12px !important) read 4px.
- \`revert-layer !important\` in any of the 10 statement layers reads 0px (user agent) beside BS and TW, in both sheet positions; in \`compat\` (last layer) it reads 12px, the utilities value.
- \`revert-layer !important\` never rolls back to the unlayered BS value: d3.rli.compat (RESET, BS, compat rollback) reads 4px, skipping BS 16px; each reading rolls back to the nearest earlier layer that declares the property (d.rli: reset 0px, base 4px, bootstrap 4px, utilities 4px, compat 12px).
- \`revert-layer\` without \`!important\` reads 16px in every layer beside BS (c.rln, d.rln, d3.rln): a normal declaration loses to the unlayered \`!important\`.
- Without BS, normal \`revert-layer\` rolls back as well: d2.rln.utilities reads 4px (the later same-layer rule beats TW and rolls back to reset) and d2.rln.compat reads 12px; d2.rln in reset, base, and bootstrap reads 12px because utilities TW outranks those layers.
- \`revert !important\`, \`unset !important\`, and \`initial !important\` read 0px in every layer, including \`compat\`, in both positions.
- \`inherit !important\` reads the parent's value in every layer in both positions: margin-top 7px (explicit inheritance applies to a non-inherited property) and color rgb(7, 7, 7); the controls without the L sheet read 16px and rgb(16, 16, 16).
- Unlayered \`.card .x\` 20px beats layered normal TW (20px), loses to unlayered BS \`!important\` (16px), and loses to layered utilities \`!important\` (12px), in both source orders.
- Preflight \`@layer base { * { margin: 0 } }\` overrides an \`h1\` rule in layer reset (0px) and loses to the same rule in layer bootstrap (8px), in both source orders; the bare \`h1\` UA margin-bottom reads 21.44px.
- \`@layer base { [hidden] { display: none !important } }\` beats unlayered \`.d-flex { display: flex !important }\` in both orders (none); with both unlayered, the later rule wins: [hidden] first reads flex, [hidden] second reads none.

## Baselines

${table('baseline')}

## a. Unlayered important against layered normal

${table('a')}

## b. Layered important against unlayered important

${table('b')}

## c. Rollback and wide keywords per layer beside BS and TW

${matrix}

## d. Rollback targets with RESET, BS, and TW

${rollback('d')}

### d2. Supplementary: RESET and TW without BS

${rollback('d2')}

### d3. Supplementary: RESET and BS without TW

${rollback('d3')}

## e. Specificity against layers

${table('e')}

## f. Preflight against reboot by layer

${table('f')}

## g. Layered important against unlayered important on hidden

${table('g')}
`
writeFileSync(`${DIR}/report.md`, md)
