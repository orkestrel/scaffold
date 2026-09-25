# Unit REBOOT-153 — the form reading reads an outline or border width that paints no line at zero

The engine session's fourth standing reading (`/home/user/scaffold/.orkestrel/veneer/engine/units/host-chromium-153-reading.md`
§ Fourth standing reading) reads the four button-reboot cases red on Chromium 153: the release's map carries
`outline-width: 0px` in the pressed state, and Veneer's does not. The release's map carries no `outline-style` entry, so
both release forms read the same outline style, and the button form's is `none` (the release writes `outline: 0` on a
pressed button). Chromium 153 reads an `outline-width` whose style is `none` at its declared length, where Chromium 141
reads it at `0px`, so the two builds disagree on a width that paints nothing. This unit makes `readFormDifferences` read
each outline and border width as it paints, D45's reading. The Items are exact.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-r153` (branch `unit/r153`, cut from Veneer `LANDING_HEAD`, the MODAL and FACTOR landing tree,
`node_modules` hardlinked from `/home/user/veneer`). The browser projects launch Chromium, which a bench sandbox denies,
so the unit runs on the native writing lane. Start every shell command with `cd /home/user/veneer-r153 &&` and give
every file tool an absolute path under it. Read `/home/user/scaffold/AGENTS.md` and the rules
`/home/user/scaffold/.claude/rules/{tests,names,typescript,architecture,documentation,writing}.md`. No skill applies.

## Objective

`readFormDifferences` compares each form's reading after every outline and border width whose line style paints no line
reads `0px`, so the four button-reboot cases read the same map on Chromium 141 and Chromium 153.

## Context

**Evidence.** Measured at `LANDING_HEAD`. Re-take each reading before editing, and stop if it differs.
- `tests/setupBrowser.ts` exports `readFormDifferences` (around line 1958). Inside it, `readings.set` stores
  `Object.fromEntries(Array.from(getComputedStyle(element)).filter(…).map((longhand) => [longhand, readStyle(element, longhand)]))`
  for each form and state.
- `tests/setupBrowser.test.ts` lists `'readFormDifferences'` in its export-list case (around line 964) and holds
  `describe('readFormDifferences')` (around line 1872).
- `guides/veneer.md` (around line 10766) holds the paragraph that says the function "reads both forms at rest, hovered,
  pressed, under keyboard focus, and disabled, once under this package's cascade and once under the release's
  stylesheet".
- `normalize*` in `.claude/rules/names.md` § Standalone helpers returns the canonical form of a value of the same type.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` (Chromium 141). This host reads every width whose style is `none`
at `0px`, so no rendered case reads the defect red here; the pure case in Item 3 is the failing proof, and the engine
session reads the four cases on Chromium 153 after the landing. Other worktrees run suites at the same time. Write
every log, backup, and script under this worktree's `tmp/units/`, never in the scratchpad.

**Shared file, told in advance.** The engine session also changes `tests/setupBrowser.ts` and
`tests/setupBrowser.test.ts`; the landings merge by hunk (D50). Change only what this brief names in them.

**Control identifiers.** None.

## Unknowns

None.

## Scope

**Owned.** In `tests/setupBrowser.ts`: the constant `LINE_STYLES`, the function `normalizeLineWidths`, and the
`readings.set` call in `readFormDifferences`. In `tests/setupBrowser.test.ts`: the export-list case's rows for both new
exports and a `describe('normalizeLineWidths')` block. In `guides/veneer.md`: the paragraph the Evidence names.
`tmp/units/`.

**Off-limits.** Every other line and path, including `src/**`, `tests/src/**`, the vendored files
(`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`), `vite.config.ts`, `package.json`, and
`ROADMAP.md`. No git command that writes, no install, and no `npm run format`. Format only with
`./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src:styles` is allowed.

## Items

1. In `tests/setupBrowser.ts`, beside `readFormDifferences`, add:

   ```ts
   /**
    * Names the line style longhand that decides whether each outline and border width longhand paints.
    *
    * @remarks
    * `normalizeLineWidths` reads a width whose style paints no line as `0px`.
    */
   export const LINE_STYLES: Readonly<Record<string, string>> = Object.freeze({
   	'outline-width': 'outline-style',
   	'border-top-width': 'border-top-style',
   	'border-right-width': 'border-right-style',
   	'border-bottom-width': 'border-bottom-style',
   	'border-left-width': 'border-left-style',
   })

   /**
    * Returns a computed style reading with every outline and border width whose line style paints no line read as
    * `0px`.
    *
    * @remarks
    * A line style of `none` or `hidden` paints no line whatever its width. Chromium 141 computes such a width at `0px`
    * and Chromium 153 at its declared length, so a reading compared across builds reads the width as it paints. Every
    * other entry, and a width whose style longhand the reading lacks, is returned unchanged.
    *
    * @param reading - The longhands and their computed values
    * @returns The reading with each unpainted width at `0px`
    */
   export function normalizeLineWidths(
   	reading: Readonly<Record<string, string>>,
   ): Readonly<Record<string, string>> {
   	return Object.fromEntries(
   		Object.entries(reading).map(([longhand, value]) => {
   			const style = LINE_STYLES[longhand]
   			return style !== undefined && (reading[style] === 'none' || reading[style] === 'hidden')
   				? [longhand, '0px']
   				: [longhand, value]
   		}),
   	)
   }
   ```

   Match the file's indentation and doc-block voice. If `noUncheckedIndexedAccess` or lint requires another narrowing,
   narrow without an assertion and report the change.
2. In `readFormDifferences`, pass the object `readings.set` stores through `normalizeLineWidths`, and change nothing
   else in the function.
3. In `tests/setupBrowser.test.ts`, add both exports to the export-list case, and add
   `describe('normalizeLineWidths')` with one case titled
   `reads an outline or border width whose style paints no line at 0px, and leaves every other entry unchanged`,
   asserting with `toEqual` that the reading
   `{ 'outline-style': 'none', 'outline-width': '3px', 'border-top-style': 'solid', 'border-top-width': '1px', 'border-right-style': 'none', 'border-right-width': '0px', 'border-left-style': 'hidden', 'border-left-width': '2px', 'border-bottom-width': '4px', color: 'rgb(255, 0, 0)' }`
   normalizes to the same object with `'outline-width': '0px'` and `'border-left-width': '0px'`, and that
   `{ 'outline-style': 'auto', 'outline-width': '1px' }` normalizes to itself.
4. In `guides/veneer.md`, after the sentence ending "once under this package's cascade and once under the release's
   stylesheet, and the button form must resolve apart from its counterpart on the same longhands, at the same button
   values, under both.", insert: "It reads an outline or border width whose line style paints no line at `0px`,
   because Chromium 141 computes such a width at `0px` and Chromium 153 at its declared length." Re-wrap the paragraph
   at 100 columns without changing another word.

## Execution

Perform the assignment directly and spawn nothing. Back up each owned file under `tmp/units/` before editing.

1. Re-take the Evidence readings.
2. Write Item 3's `normalizeLineWidths` case first against a `normalizeLineWidths` that returns its input unchanged,
   run `npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts -t normalizeLineWidths`,
   and record the failing count and the `AssertionError` in `tmp/units/r153-red.log.txt`.
3. Apply Items 1, 2, and 4, and run the same command green into `tmp/units/r153-green.log.txt`.
4. Run each gate in Acceptance, logged to `tmp/units/r153-<gate>.log.txt` with the command echoed first and
   `echo "exit=$?"` appended.

## Output

Write `tmp/units/r153-report.md` and return the same text: the Evidence re-readings, the red and green readings with
commands and counts, the gate table, `tmp/units/r153.diff` (`git diff LANDING_HEAD`), and
`tmp/units/r153-status.txt`.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when an Evidence reading
differs, when a change needs a line outside Owned, or when a gate reads red. Settle only the narrowing Item 1 names
yourself.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` leaves the owned files unchanged.
2. `npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts` passes.
3. After `npm run build:src:styles`, `npx vitest run --config configs/src/vite.styles.config.ts --no-cache
   tests/src/styles/components/carousel.test.ts tests/src/styles/components/dropdown.test.ts
   tests/src/styles/components/list-group.test.ts tests/src/styles/components/nav.test.ts
   tests/src/styles/elements/button.test.ts` passes.
4. `npm run test:guides` and `npm run test:policy` exit 0.

## Review evidence

The diff and status, the red and green logs, and the gate logs. `checker` on Sonnet reads the Items against the diff;
`analyst` on GPT-6 Astra rules the Orchestrator-written code and sentence.
