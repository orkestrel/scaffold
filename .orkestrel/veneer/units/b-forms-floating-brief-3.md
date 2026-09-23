# Unit B-FORMS-FLOATING, round 3 — the fix-audit findings

Successor to `/home/user/scaffold/.orkestrel/veneer/units/b-forms-floating-brief-2.md`. What
changed and why: the fix round's audit (`bff-fix-audit-verdict.md`: FAIL 3, 6, 7, 9; D38) found a
content-box assertion that cannot fail, an autofill case title naming the wrong reference, two
guide sentences with a bare code token, and an unfrozen local data table. This round closes those
with the wording and shape fixed here. The earlier briefs stay in place unedited and bind where this
one is silent.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bff` (detached at
`2c10329`, rounds 1 and 2 uncommitted in the tree). Perform the assignment directly and spawn
nothing. Use absolute paths under `/home/user/veneer-bff` for every command and file, and run every
npm and npx command from `/home/user/veneer-bff`. Do not commit, push, install, or run `git
checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`; undo a
plant by the exact reverse edit.

## Objective

Every obligation under § Obligations is applied once, nothing else changes, the named plant reddens
the named assertion, and the gates in § Acceptance criteria are green.

## Context

**Evidence.** `tests/src/styles/components/form-floating.test.ts`: the density case "scales the
height and every inset together with the density factor and keeps the content box open" (around
line 368; its `insets` matrix around line 379; its content-box filter around lines 414 to 426) and
the autofill case title around line 519; `tests/setupStyles.ts`: `FORM_FLOATING_CASES` (around line
3751; it carries no interface annotation; declare the new interface as an `export interface` with
readonly members directly before the new table, the form `ReferenceRow` uses); `tests/setupStyles.test.ts`: the export-name
literal row `'FORM_FLOATING_CASES'` (around line 200) and the freeze assertion inside the binding
case (around line 2235);
`guides/veneer.md` § Form floating classes: the density bullet "**The whole control scales with
density.**" (around lines 812 to 822) and the limits sentence "Each limit that bounds what the proof
can claim is recorded in …" (around lines 842 to 843). Line numbers are approximate; locate every
site by its text.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,typescript,names,architecture,writing,documentation}.md`;
D34, D35, and D38 in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`.
Skill: none. Guide: `guides/veneer.md` § Form floating classes (owned).

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`):
`readPixels`, `readToken`, `requireValue` are the readers the case already uses; add no helper.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, `node_modules` installed. Sibling units and a gate chain
share the container: a timeout is a timing reading you report. `prettier` must never run; `oxfmt`
is the formatter. The styles project loads `dist/src/styles/index.css`, so run `npm run build:src`
before every browser reading and after every plant and revert.

**Measurements.** Taken by the audit: under `box-sizing: border-box` (`_reset.scss`) the computed
`height` is never less than the vertical insets plus borders, so the present filter cannot match;
the empty control's `line-height` resolves 20px at a 16px root (the reviewer's reading); under the
height plant at factor 2 the floated control's used height is 74px and its content box 0px.

**Control identifiers.** none; name every test for what it proves.

**Standing conditions.** `npm run test:setup` is red only on the shipped-key Set literal
(`form-floating`, the Orchestrator's integration edit); `npm run test:conformance` is red only on
the presence reading `.input-group > .form-floating`, which waits on the GROUP landing.

## Unknowns

- none.

## Obligations

1. **The density matrix becomes a frozen table.** In `tests/setupStyles.ts`, directly after
   `FORM_FLOATING_CASES`, declare `interface FormFloatingDensityCase` with the readonly members
   `selector: string`, `property: string`, and `resting: number`, and export
   `FORM_FLOATING_DENSITY_CASES: readonly FormFloatingDensityCase[]` as `Object.freeze([...])` of
   `Object.freeze({ selector, property, resting })` rows, in this order: `label[for="floating-empty"]`
   / `padding-top` / 16; the same label / `padding-left` / 12; `#floating-empty` / `padding-top` /
   16; `#floating-empty` / `padding-bottom` / 16; `#floating-empty` / `padding-left` / 12;
   `#floating-filled` / `padding-top` / 26; `#floating-filled` / `padding-bottom` / 10;
   `#floating-carrier` / `padding-top` / 26; `#floating-carrier` / `padding-bottom` / 10;
   `#floating-carrier` / `padding-left` / 12. TSDoc on the table: "Each length the floating partial
   derives from the space scale, read on the control or the label that carries it, with its resting
   length at a 16px root: the resting insets, the floated top and bottom insets, and the select's
   start inset." In `tests/setupStyles.test.ts`, add `'FORM_FLOATING_DENSITY_CASES'` to the
   export-name literal directly after `'FORM_FLOATING_CASES'`, and in the binding case, directly
   after the line `expect(Object.isFrozen(FORM_FLOATING_CASES)).toBe(true)` (around line 2235), add
   `expect(Object.isFrozen(FORM_FLOATING_DENSITY_CASES)).toBe(true)` and a loop asserting every row
   of that table is frozen, in the form the file uses for `FORM_FLOATING_CASES`'s rows. In the density case, replace the local
   `insets` matrix and the `resting` literal: resolve each row's element with
   `requireValue(host.querySelector(row.selector), ...)` inside the case, read `resting` from the
   table (`expect(...).toEqual(FORM_FLOATING_DENSITY_CASES.map((row) => row.resting))` replaces the
   literal array), and keep every other expectation as it is.
2. **The content-box assertion becomes a line-box assertion.** Replace the filter's comment and body
   so that the case reads `const line = readPixels(empty, 'line-height')` before the factor is set
   and, inside the `try`, asserts that no control's height less its `padding-top`, `padding-bottom`,
   `border-top-width`, and `border-bottom-width` is below `line` (`.filter(... < line)` equal to
   `[]`). Comment: "Each control keeps at least one line of its text inside the declared height: the
   height less the vertical insets and borders holds the line box, resting and floated alike, and
   the select's own `line-height` reads `normal`, so the line is read on the text control." Retitle
   the case "scales the height and every inset together with the density factor and keeps a line of
   text inside the height".
3. **The autofill case title.** Retitle "holds each autofill rule to the release's declarations, one
   selector per rule" to "holds each autofill rule to the floated declarations of the focus and
   filled group, one selector per rule".
4. **The guide's two sentences.** In the density bullet, "so each multiplies `--vn-space-8` by its
   ratio to that token's `1rem`" becomes "so each multiplies the `--vn-space-8` token by its ratio to
   that token's `1rem`". The limits sentence "Each limit that bounds what the proof can claim is
   recorded in `tests/src/styles/components/form-floating.test.ts` beside the reading it bounds."
   becomes "Each limit that bounds what the proof can claim is recorded in the
   `tests/src/styles/components/form-floating.test.ts` file beside the reading it bounds."
5. **D38 in the density bullet.** Append to the density bullet, after "as do the stacking and the
   transform.", the sentence "The scale is specified for factors of 1 and above, the range the proof
   reads: below 1 the line height, which is relative to the text and does not shrink, outgrows the
   shrinking floated inset."
6. **The plant.** With the obligations applied and `npm run build:src` run, plant in
   `src/styles/components/_form-floating.scss` the literal height: replace
   `calc(var(--vn-space-8) * 3.5 + calc(var(--bs-border-width) * 2))` with
   `calc(3.5rem + calc(var(--bs-border-width) * 2))` at both `height` and `min-height`; build; run the
   scoped browser command; record the first failing expectation. Then, keeping the plant, remove
   the two `[114, 114, 114]` expectations (height and minimum height) as a throwaway edit, build if
   the partial changed (it did not), run again, and record that the line-box assertion is the one
   that reddens with its message; restore the two expectations and the partial by the exact reverse
   edits; build; record green. Record the partial's SHA-256 before the plant and after the revert.
7. Rewrap every edited paragraph at or under 100 columns and run
   `npx oxfmt --config .oxfmtrc.json --write` over the owned files.

## Scope

**Owned.** `tests/src/styles/components/form-floating.test.ts`, `tests/setupStyles.ts`,
`tests/setupStyles.test.ts`, `guides/veneer.md` (§ Form floating classes only),
`src/styles/components/_form-floating.scss` (the plant and its exact revert only; its committed
text does not change).

**Shared (report-only).** `ROADMAP.md`.

**Off-limits.** Every other file, and the vendored files (`tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/settings.json`).

**What asserts the state this change ends.** The scoped browser run, the setup inventory case
(`npm run test:setup`), and `npm run test:guides`; derived by running them.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src`; no `npm install`; no git command that discards a change.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

Validate with `npx oxfmt --config .oxfmtrc.json --check` over the owned files, `npm run check`,
`npm run build:src`, the scoped browser command
`npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-floating.test.ts`,
`npm run test:setup`, and `npm run test:guides`, all from `/home/user/veneer-bff`.

## Output

Write `/home/user/veneer-bff/tmp/units/b-forms-floating-report-3.md` and return the same text: each
obligation with the site it changed; the plant record (obligation 6) with the two failing messages,
the green reading, and the SHA-256 pair; the gate exits with counts; `git status --porcelain`; and
deviations per § Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. No process
diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on any file outside § Scope a gate names, on the plant failing to redden the line-box
assertion, and on any ruling the tree contradicts. Decide, record, and carry on from the placement
of the interface's TSDoc and the wrapping of the sentences this brief prescribes.

## Acceptance criteria

1. `npx oxfmt --config .oxfmtrc.json --check` over the owned files and `npm run check` exit 0.
2. `npm run build:src` and the scoped browser command exit 0 with every case passing.
3. `npm run test:setup` is red only on the shipped-key Set literal; `npm run test:guides` exits 0.
4. The plant record shows the line-box assertion reddening under the height plant.
5. `git status --porcelain` lists the round-1 and round-2 file set and nothing else.

**Observations, not criteria.** `npm run test:conformance` (red only on the presence reading); any
timeout under load.

## Review evidence

The report and the diff of every owned file against `2c10329`.
