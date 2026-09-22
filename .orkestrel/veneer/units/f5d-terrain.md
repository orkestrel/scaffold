# F5d PHYSICAL — terrain record (Orchestrator, 2026-09-22, Veneer at `d93bb85` with F5a live)

Taken with `grep` over the Veneer checkout while F5a was writing `tests/**`; `src/styles/**` and
`guides/veneer.md` are outside F5a's scope, so those readings hold at F5a's landing. The `tests/**`
readings name files whose import lines F5a moves; re-take them at launch with the same commands.

## The cascade's logical declarations

Pattern over `src/styles`:

```text
(margin|padding|border|inset|scroll-margin|scroll-padding)-(inline|block)(-(start|end))?|\b(inline|block|min-inline|min-block|max-inline|max-block)-size\b|text-align:\s*(start|end)\b|border-(start|end)-(start|end)-radius|float:\s*(inline-start|inline-end)|clear:\s*(inline-start|inline-end)
```

Matching lines per file (`grep -rEc`), 76 lines in all:

```text
src/styles/components/_table.scss:14
src/styles/components/_grid.scss:9
src/styles/components/_button.scss:8
src/styles/_mixins.scss:7
src/styles/elements/_button.scss:6
src/styles/components/_ratio.scss:6
src/styles/elements/_fieldset.scss:4
src/styles/components/_quote.scss:4
src/styles/elements/_blockquote.scss:2
src/styles/components/_vr.scss:2
src/styles/components/_list.scss:2
src/styles/components/_icon-link.scss:2
src/styles/components/_container.scss:2
src/styles/elements/_var.scss:1
src/styles/elements/_tr.scss:1
src/styles/elements/_table.scss:1
src/styles/elements/_sup.scss:1
src/styles/elements/_sub.scss:1
src/styles/elements/_html.scss:1
src/styles/elements/_hr.scss:1
src/styles/components/_image.scss:1
```

Distinct property names and their line counts (`grep -rEoh | sort | uniq -c`):

```text
12 inline-size
 7 padding-inline
 6 margin-block-end
 5 padding-block
 5 block-size
 3 padding-inline-start
 3 max-inline-size
 3 margin-block-start
 3 border-block-start
 3 border-block-end
 2 margin-inline
 2 inset-block-start
 2 border-start-start-radius
 2 border-start-end-radius
 2 border-inline
 2 border-end-start-radius
 2 border-end-end-radius
 2 border-block
 1 padding-block-start
 1 min-inline-size
 1 min-block-size
 1 margin-inline-start
 1 margin-inline-end
 1 inset-inline-start
 1 inset-block-end
 1 border-inline-start
```

`app/browser/styles/**` declares none.

## The proofs that read logical properties

Pattern over `tests/**/*.ts` (the cascade pattern plus the bare tokens `inline-start` and
`inline-end`), 143 matching lines:

```text
tests/setupCases.ts:30
tests/src/styles/components/ratio.test.ts:15
tests/src/styles/components/image.test.ts:13
tests/src/styles/components/button.test.ts:12
tests/src/styles/components/vr.test.ts:10
tests/src/styles/components/container.test.ts:7
tests/setupStyles.test.ts:7
tests/src/styles/mixins.test.ts:6
tests/src/styles/elements/fieldset.test.ts:5
tests/src/styles/components/quote.test.ts:5
tests/distribution.test.ts:5
tests/src/styles/elements/tr.test.ts:4
tests/src/styles/elements/img.test.ts:4
tests/src/styles/elements/button.test.ts:4
tests/src/styles/components/icon-link.test.ts:3
tests/src/styles/elements/pre.test.ts:2
tests/src/styles/elements/kbd.test.ts:2
tests/src/styles/components/list.test.ts:2
tests/setupBrowser.test.ts:2
tests/setup.ts:2
tests/src/styles/elements/dl.test.ts:1
tests/src/styles/elements/code.test.ts:1
tests/app/browser/integration.test.ts:1
```

`tests/setupCases.ts` is F5a's new home for the case tables that carried these readings in
`tests/setupStyles.ts`; `tests/distribution.test.ts` reads the packed cascade and is a registry-gated
project.

## The direction machinery

Exports in `tests/setupStyles.ts` at `d93bb85` (line numbers as of that commit; F5a's split moves
them): `PHYSICAL_LONGHANDS` (1241), `EDGE_SHORTHANDS` (1271), `RADIUS_SHORTHAND` (1281),
`SIDE_KEYWORD_PROPERTIES` (1284), `splitTopLevelValues` (1331), `matchesEdgeShorthand` (1373),
`matchesRadiusShorthand` (1392), `matchesSideKeyword` (1427), `normalizeValueToken` (1440),
`matchesDirectionSensitive` (1455), `filterAsymmetricDeclarations` (1475),
`scanPhysicalDeclaration` (1504). Consumers outside that module and its proof:
`tests/src/styles/index.test.ts` only (the case "declares no physical inline-axis property anywhere
in the shipped cascade").

## The guide

Lines matching the pattern or the words `logical propert`, `direction-neutral`, or `physical`: 4.
The direction sentence near § Deferred selectors (around line 308: "direction no logical property
replaces, and one byte stream serves either writing direction") and the § Departures image row
(around line 844: "`max-inline-size` and `block-size`, the logical properties the `img` tag already
reads"). F6 removes the byte-stream sentence with D5; F5d owns the rest.

## The proofs, re-taken over the returned F5a tree (2026-09-22, working tree over `d93bb85` with F5a's edits)

Same pattern over `tests/**/*.ts`, matching lines per file:

```text
tests/setupCases.ts:30
tests/src/styles/components/ratio.test.ts:15
tests/src/styles/components/image.test.ts:13
tests/src/styles/components/button.test.ts:12
tests/src/styles/components/vr.test.ts:10
tests/src/styles/components/container.test.ts:7
tests/setupStyles.test.ts:7
tests/src/styles/mixins.test.ts:6
tests/src/styles/elements/fieldset.test.ts:5
tests/src/styles/components/quote.test.ts:5
tests/distribution.test.ts:5
tests/src/styles/elements/tr.test.ts:4
tests/src/styles/elements/img.test.ts:4
tests/src/styles/elements/button.test.ts:4
tests/src/styles/components/icon-link.test.ts:3
tests/src/styles/elements/pre.test.ts:2
tests/src/styles/elements/kbd.test.ts:2
tests/src/styles/components/list.test.ts:2
tests/setupBrowser.test.ts:2
tests/setup.ts:2
tests/src/styles/elements/dl.test.ts:1
tests/src/styles/elements/code.test.ts:1
tests/app/browser/integration.test.ts:1
```

Total: 143 lines. The direction machinery stayed in `tests/setupStyles.ts` (F5a kept the direction tables and scanners; F5d removes them):

```text
79:export const PHYSICAL_LONGHANDS: readonly string[] = Object.freeze([
109:export const EDGE_SHORTHANDS: readonly string[] = Object.freeze([
119:export const RADIUS_SHORTHAND = 'border-radius'
122:export const SIDE_KEYWORD_PROPERTIES: readonly string[] = Object.freeze([
140:export function splitTopLevelValues(value: string): readonly string[] {
182:export function matchesEdgeShorthand(values: readonly string[]): boolean {
201:export function matchesRadiusShorthand(values: readonly string[]): boolean {
236:export function matchesSideKeyword(values: readonly string[]): boolean {
249:export function normalizeValueToken(token: string): string {
264:export function matchesDirectionSensitive(prop: string, value: string): boolean {
284:export function filterAsymmetricDeclarations(
313:export function scanPhysicalDeclaration(css: string): string | undefined {
```

Consumers outside that module and its proof: tests/src/styles/index.test.ts .
