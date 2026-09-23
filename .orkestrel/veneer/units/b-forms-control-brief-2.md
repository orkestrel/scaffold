# Unit B-FORMS-CONTROL, round 2 — the fix round over the CONTROL audit

Successor to `/home/user/veneer-bfo/tmp/units/b-forms-control-brief.md`. What changed and why: the
audit round (`/home/user/scaffold/.orkestrel/veneer/units/bfo-audit-verdict.md`: analyst FAIL 3, 4,
5, 7, 8, 9 with SWATCH-PRIORITY outside the claims; reviewer FAIL 5, 7, 8, 9, 10 with F1 and R1 to
R3; checker on its read-only limit) found the swatch priority dropped, the case table bound per
selector where the family binds per property, the date parts uncorroborated, the readonly color
control unmounted, the `validation.test.ts` patch unrun, and prose defects. The Orchestrator ruled
D39 (priority is part of the ledger's value; carrier L2 LEDGER-PRIORITY) and re-carried D31's
retirement to B-FORMS-CLOSE. This round closes the carried findings. The original brief stays in
place unedited; its Objective, Context, Scope, Execution, Output, and Deviation contract bind here
except where this brief states otherwise.

## Role and engine

`opus` on Opus 5.5 (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-bfo` (detached at `2c10329`, the round-1 writes uncommitted in the tree, the
state the audit ruled on). Perform the assignment directly and spawn nothing. Use absolute paths
under `/home/user/veneer-bfo` for every command and file, and run every npm and npx command from
`/home/user/veneer-bfo`. Do not commit, push, install, or run `git checkout`, `git restore`, `git
stash`, `git reset`, `git clean`, or `git checkout-index`; undo a plant by the exact reverse edit.

## Objective

Every finding under § Carried findings is closed in the owned files, each proof change goes red
under its named plant and green after the exact reverse edit, and the gates in § Acceptance
criteria are green.

## Context

**Evidence.** The verdicts cite by line at the round-1 tree (approximate; locate every site by its
text): `src/styles/components/_form-control.scss` around line 187 (the swatch `@each` writes
`border: 0`); `tests/setupStyles.ts` around line 3746 (`FORM_CONTROL_MARKUP`), 3798 onward
(`FORM_CONTROL_CASES`: rows of `selector`, `condition`, `evidence`, `subject`, `pseudo`, `state`,
`values`), around 4008 (the hover row's empty `values`), around 4241 (the swatch `border: '0'`
value); `tests/setupStyles.test.ts` around lines 1496 to 1508 and 1801 to 1823 (the Node binding
case joins a rule's declarations into one string and searches it for each token);
`tests/src/styles/components/form-control.test.ts` around lines 86 to 119 (case L, the CSSOM
declaration reading), 182 (the comment "the release's quarter-second fade"), 369 to 396 (case C);
`guides/veneer.md` § Form control classes around lines 735 to 736 (the alias sentence "because the
build drops that alias"), 759 and 761 (the timing values `0.15s ease-in-out` and `0.15s ease`), 775
and 788 (the links without `see`; the first makes "classes" the subject of "reads"), 777 (the
ladder list's lead-in "Each part takes one rung"), and lines 152 to 155 (the non-utility
`!important` sentence: "Outside the class utilities, the `[hidden]` rule in the `reset` layer and
the calendar-picker indicator rule in the `elements` layer carry one as well"); the report's
`validation.test.ts` patch in `/home/user/veneer-bfo/tmp/units/b-forms-control-report.md`
§ Shared-file patches; the release `node_modules/bootstrap/dist/css/bootstrap.css` lines 2294 and
2298 (`border: 0 !important` on both swatch parts).

**The per-property shape to copy** (landed by GROUP on the session branch,
`/home/user/veneer/tests/setupStyles.ts` around line 4179, read-only from this worktree):

```ts
export interface InputGroupCase {
	/** Holds the selector as the official vocabulary records it. */
	readonly selector: string
	/**
	 * Maps each property whose declaration carries a `var()` to the custom properties that
	 * declaration reads, in written order.
	 */
	readonly reads: Readonly<Record<string, readonly string[]>>
}
```

with rows such as `reads: Object.freeze({ padding: Object.freeze(['--vn-space-3', '--vn-space-6']),
'font-size': Object.freeze(['--vn-size-3']), … })`, and the Node case
(`/home/user/veneer/tests/setupStyles.test.ts` around line 2422) comparing, per selector, the
compiled rule's per-property reference map (`Object.fromEntries([...properties].filter(([, names])
=> names.length > 0))`) to `entry.reads` with `toEqual`, plus a freeze case asserting every
`reads` map and every name array frozen.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,tests,typescript,names,architecture,browser,application,documentation,writing}.md`;
`/home/user/veneer-bfo/tmp/units/b-passive-family.md` (the token beside the property it drives; the
ladder); D30, D33, D34, D39 in `/home/user/veneer-bfo/tmp/units/decisions-round-2.md` (copy the
current file from `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` first, because
the worktree copy predates D38 and D39). Skill: none. Guide: `guides/veneer.md` § Form control
classes and the two sentences named under the findings (owned).

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`):
`readStyle`, `readPixels`, `readToken`, `requireValue`, `stageMedia`; a helper whose job an
installed export does is a defect. Read a declaration's priority through the CSSOM
(`CSSStyleDeclaration.getPropertyPriority`) as case L reads its values.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, `node_modules` installed. Sibling units and a gate chain
share the container: a timeout is a timing reading you report. `prettier` must never run; `oxfmt`
is the formatter. The styles project loads `dist/src/styles/index.css`, so run `npm run build:src`
before every browser reading and after every plant and revert.

**Measurements.** The audit's: `npx --no-install sass --no-source-map src/styles/components/_form-control.scss`
compiles the partial alone; the ledger readers return no unrecorded or stale row on the round-1 tree;
`npm run test:setup` is red only on the shipped-key Set literal; `npm run test:conformance` is red
only on the presence reading `.form-floating > .form-control` (FLOATING's, landed on the session
branch after this worktree was cut); `npm run check` exits 0.

**Control identifiers.** none; name every test for what it proves.

**Standing conditions.** The two standing reds named under Measurements stay red in this worktree.
`tests/src/styles/components/validation.test.ts` is granted to this round for the report's exact
patch and the run that verifies it.

## Unknowns

- The date specimen's markup and its frame's appearance: mount `<input type="date">` with a label
  as the other specimens do, and report what the four frames show.
- Whether the swatch priority reading is available in Chromium's CSSOM for the `::-webkit-color-swatch`
  rule: read `getPropertyPriority('border')` on the matching `CSSStyleRule` in case L and report
  the value; if the CSSOM withholds it, read the compiled text in the Node case instead and record
  the limit.

## Carried findings

1. **SWATCH-PRIORITY (both lanes).** In the swatch `@each`, write `border: 0 !important;` as the
   release does. In case L, assert the priority `important` on the `border` declaration of each
   swatch rule (or per the second Unknown). In `FORM_CONTROL_CASES`, record the swatch value as the
   release's text. In `guides/veneer.md` lines 152 to 155, name the swatch rule beside the
   `[hidden]` and calendar-picker rules as one that carries Bootstrap's own `!important`. Plant:
   drop `!important`; the priority assertion must redden; reverse exactly.
2. **Claim 5 (both lanes): per-property binding.** Give `FORM_CONTROL_CASES` per-property references
   in the `InputGroupCase` shape shown under Context (a `reads` map per row beside the row's other
   fields; keep `condition`, `evidence`, `subject`, `pseudo`, `state`, and `values`), and make the
   Node binding case read each property's declaration against its own references with the same
   `toEqual` comparison, plus the freeze assertions over every `reads` map and name array. Plant:
   `padding: 0; --audit-unused: var(--vn-space-3) var(--vn-space-6)` on `.form-control`; the Node
   case must redden at its per-property comparison (the round-1 shape stayed green); reverse
   exactly.
3. **Claim 4 (analyst): the date specimen.** Add a `Form control date` specimen (`<input
   type="date" class="form-control">` with its label) to `FORM_CONTROL_SPECIMENS` and
   `FORM_CONTROL_COPY`, the `form-control-date` scenario to `CASCADE_KEYS` (an element frame over
   the lifted specimen) and its name to `CaptureSubject`, the section proof, the portfolio's
   declared list in `tests/app/browser/integration.test.ts`, and run the four `CAPTURE=1` variants
   so the frames exist; case L's date-part reading corroborates by that frame (name it in the
   proof comment).
4. **R2 (reviewer): the readonly color control.** Add a readonly color control to
   `FORM_CONTROL_MARKUP` (subject `Readonly color choice`) so case C distinguishes removing
   `:not([readonly])` from the color cursor rule; plant: remove `:not([readonly])` from that rule;
   C must redden; reverse exactly.
5. **Claim 8 (both lanes): the `validation.test.ts` patch.** Apply the report's patch exactly, then
   run `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
   tests/src/styles/components/validation.test.ts` and record the result; where a later assertion
   fails, stop and report (expected, found, evidence) rather than editing further.
6. **Claim 9 (both lanes): the prose.** The alias sentence reads "because the partial does not write
   that alias and the standard part paints the same button"; "`0.15s ease-in-out`" and "`0.15s
   ease`" become "the `0.15s ease-in-out` value" and "the `0.15s ease` value"; the two links take
   the form "see [the form control classes](…)" as a clause of a sentence whose subject is not the
   link; the ladder lead-in reads "Each part, and the file control's `overflow` declaration, takes
   one rung"; the proof comment reads "the release's `0.15s` fade". In the successor report's
   ROADMAP rows, follow each code token with its noun and name B-FORMS-CLOSE as D31's carrier
   (retiring `INPUT_GROUP_ROUNDING` and the consumer-radius sentence).
7. **Claim 3 (analyst): the plant table.** Re-run the round-1 plant table over the new shape and
   record each red set with its assertion, the Node case included, and the SHA-256 of the partial
   before and after.
8. **Records for the landing (report-only).** In the successor report, state the FLOATING carrier
   sentence CONTROL's landing patch writes (the text-control half of the bare-controls sentence in
   § Form floating classes: the control's border, radius, and paint belong to the `.form-control`
   rule, which ships, so every floating frame shows the floated label over the styled control) and
   the ROADMAP rows: `FORM_RANGE_CASES`'s per-selector shape → B-FORMS-CLOSE; the ledger's dropped
   priority (D39) → L2 LEDGER-PRIORITY.

## Scope

**Owned.** `src/styles/components/_form-control.scss`; `tests/src/styles/components/form-control.test.ts`;
`tests/setupStyles.ts` and `tests/setupStyles.test.ts` (the form-control tables and cases);
`app/browser/constants.ts`, `app/browser/sections/FormControlSection.ts`,
`tests/app/browser/sections/FormControlSection.test.ts`, `tests/app/browser/integration.test.ts`
(the date specimen), `tests/setup.ts` and `tests/setup.test.ts` (the `form-control-date` scenario);
`tests/src/styles/components/validation.test.ts` (the report's patch alone); `guides/veneer.md`
(§ Form control classes and the non-utility `!important` sentence).

**Shared (report-only).** `ROADMAP.md`; `tests/setupServer.test.ts` (the Set literal is the
Orchestrator's edit).

**Off-limits.** `src/styles/_tokens.scss`, `_mixins.scss`, `src/styles/components/_validation.scss`,
every other partial, `tests/setupServer.ts`, `tests/conformance.test.ts`, `configs/**`,
`package.json`, `package-lock.json`, the vendored files, and every other file.

**What asserts the state this change ends.** The form-control proof, the Node binding case, the
section proof, the setup inventories (`npm run test:setup`), the portfolio guard, and the ledger
cases; derived by running them.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src` and `npm run build:src:styles`; no `npm install`; no git
command that discards a change.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

Validate with `npx oxfmt --config .oxfmtrc.json --write` over the owned files, then
`npx oxlint --config .oxlintrc.json --deny-warnings` over the owned TypeScript files,
`npm run check`, `npm run build:src`, the scoped browser run over `form-control.test.ts` and
`validation.test.ts`, `npm run test:setup`, `npm run test:app`, `npm run test:conformance`,
`npm run test:guides`, and `CAPTURE=1 npm run test:journey -- --project 'journey:<variant>*'` for
`light-1280`, `dark-1280`, `light-390`, and `dark-390`, all from `/home/user/veneer-bfo`.

## Output

Write `/home/user/veneer-bfo/tmp/units/b-forms-control-report-2.md` and return the same text: each
carried finding with what closed it; the Unknowns' answers; the plant table (plant, command, red
set, green after revert, SHA-256 before and after); the frames the date specimen produced; the
gate exits with counts; the landing records of finding 8; `git status --porcelain`; `git diff
2c10329 --stat`; and deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on any file outside § Scope a gate names, on a plant failing to redden, on a
`validation.test.ts` assertion failing after the patch, and on any ruling the tree contradicts.
Decide, record, and carry on from the date specimen's copy, the readonly color control's subject
name, and the wording inside the sentences this brief prescribes.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, the scoped `oxlint`, and `npm run check` exit 0.
2. `npm run build:src` and the scoped browser run over `form-control.test.ts` and
   `validation.test.ts` exit 0 with every case passing.
3. `npm run test:app` and `npm run test:guides` exit 0; `npm run test:setup` is red only on the Set
   literal; `npm run test:conformance` is red only on the standing presence reading.
4. The four `CAPTURE=1` runs exit 0 and the `form-control-date` frames exist for every variant.
5. The plant table shows each named plant reddening its named assertion.
6. `git status --porcelain` lists the round-1 set plus `validation.test.ts`, and nothing else.

**Observations, not criteria.** `npm run test:src:styles`; any timeout under load.

## Review evidence

The report and the diff of every owned file against `2c10329`, untracked files as additions.
