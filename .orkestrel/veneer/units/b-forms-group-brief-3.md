# Unit B-FORMS-GROUP, round 2 — the fix round over the B-FORMS-GROUP audit

Successor to `tmp/units/b-forms-group-brief-2.md` (itself the successor of `b-forms-group-brief.md`).
What changed and why: the audit round (`/home/user/scaffold/.orkestrel/veneer/units/bfg-audit-analyst-verdict.md`,
FAIL 3, 4, 5, 6, 8, 10; `bfg-audit-reviewer-verdict.md`, FAIL 1, 6, 8, 10, F1, R1 to R4;
`bfg-audit-checker-verdict.md`; reconciled in `bfg-audit-verdict.md`) found a proof that binds
tokens per selector rather than per property, two per-variant blocks without an `@each`, two case
matrices declared inline, a false tooltip sentence, and a focus claim the paint order makes invisible;
the Orchestrator ruled D29 (the focus scenario drives the grouped button), D30 (one `@each` for the
size pair), D31 (the tooltip and rounding carriers), and D33 (the sized select's end padding idiom).
The earlier briefs stay in place unedited; their Objective, Context, Scope, Execution, Output, and
Deviation contract bind here except where this brief states otherwise.

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-bfg`, a git worktree detached at `2c10329` with the round-1 writes uncommitted in
the tree (the state the audit ruled on). Perform the assignment directly and spawn nothing. Use
absolute paths under `/home/user/veneer-bfg` for every command and file, and run every npm and npx
command from `/home/user/veneer-bfg`; your shell may start elsewhere. Do not commit, push, install, or
run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`; undo
a transient plant by the exact reverse edit.

## Objective

Every finding under § Carried findings is closed in the owned files, each proof change goes red under
its named mutation and green after the exact reverse edit, the partial compiles byte-identical before
and after the `@each` change (the D33 value change excepted, and proved separately), and the gates in
§ Acceptance criteria are green.

## Context

**Evidence.** The verdicts cite by line at the round-1 tree. `src/styles/components/_input-group.scss`:
the focus-lift comment around lines 19 to 20, the `-lg` and `-sm` blocks around lines 56 to 72, the
sized-select `padding-right: var(--vn-space-24)` inside them, the overlap-rule comment around line
101. `tests/setupStyles.ts`: `INPUT_GROUP_CASES` (the N2 table), `INPUT_GROUP_ROUNDING` and its TSDoc
around line 3856 ("The control and select partials land after this one"). `tests/setupStyles.test.ts`:
the N2 case around lines 2249 and 2272 (token presence per selector), the N3 export and freeze block.
`tests/src/styles/components/input-group.test.ts`: the sizes matrix in `input-group sizes` around line
382, the corner matrix `const rows = [ … ] as const` around lines 241 to 261. `tests/setup.ts`:
`INPUT_GROUP_KEYS` and its remarks around lines 928 to 942 (`input-group-plain-focus`, `Input group
plain`). `tests/app/browser/integration.test.ts`: the journey case `reaches the plain input group
control…` around lines 1155 to 1181. `guides/veneer.md`: the tooltip sentence around line 795, the
focus sentence around lines 840 to 841. The report `tmp/units/b-forms-group-report.md`: the
attribution narrative around line 203, the plant table's "reaches the feedback" row, the later-partial
"none" observation, the ROADMAP patch. Locate every site by its symbol; the line numbers are
approximate. The paint-order fact behind D29: the group's control has `position: relative` at rest
and `.input-group-text` no position, so the control paints over the static addon before focus; the
grouped `.btn` sits at `position: relative; z-index: 2`, so the lift to `5` is what puts the focused
control's ring over it. The analyst measured: `.btn-group > .btn:focus` (`_button-group.scss`,
around line 21) overrides `.input-group .btn:focus` on a button nested in a button group inside an
input group, as the release does (`bootstrap.css:3707`).

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,tests,names,architecture,documentation,writing}.md`; no
skill; guide `guides/veneer.md`; the design `tmp/units/b-forms-design-verdict.md` and
`tmp/units/decisions-round-2.md` (D29, D30, D31, D33; read the copy at
`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`, which carries them) bind.

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`,
`server/index.d.ts`; guide `/home/user/scaffold/guides/test.md` § Surface), `@orkestrel/contract`,
`@orkestrel/guide`: this round adds no helper; a helper, guard, wait, recorder, or deferred whose job
an installed export does is a defect, and the audit's checker runs the export-name probe over the diff.

**Host.** bash; `/home/user/veneer-bfg`; npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
Chromium at `/opt/pw-browsers` (`export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`); foreground
commands are capped at 10 minutes; sibling units run in other worktrees, so a journey timing failure
under load is the Orchestrator's reading; `prettier` must never run, `oxfmt` is the formatter; no
network is needed.

**Measurements.** Taken by the Orchestrator on 2026-09-23: `git status --short` lists the round-1
writes (four `A`, thirteen `M`) and nothing else; the analyst's `npx sass --no-source-map
src/styles/components/_input-group.scss` compiled clean and its in-memory checks ran against the
installed release; `npm run check` exited 0 in the analyst lane; `grep -n '@each'
src/styles/components/*.scss` shows the idiom in `_button.scss:128`, `_form-range.scss:35`, and
`_link.scss:4`; `tests/setup.ts:777-778` registers the resting `input-group-button` scenario over
`Input group button`; `app/browser/constants.ts:1332` declares that specimen.

**Control identifiers.** none; name every test for what it proves rather than for the control that
specified it.

**Standing conditions.** No sibling writes this worktree. The `probe` MCP server is registered in
`.mcp.json` but unapproved in this session, so the `prove` tool is unavailable: take the runtime-probe
fallback of `.claude/rules/tests.md` § Probes (mutation with exact revert) with its negative control,
and report each control's reading. `tests/src/styles/components/validation.test.ts` stays off-limits:
its patch (the focused `.is-valid` child reading `'5'`) is the Orchestrator's integration edit at
landing. `tests/setupServer.test.ts` (the shipped-key Set literal) and `ROADMAP.md` are the
Orchestrator's integration edits: the successor report carries the patches. `npm run test:conformance`
is green at the round-1 tree and must stay green.

## Unknowns

- Whether the new focus frame shows the ring over the grouped button legibly at the page frame's
  scale: write the frame for `light-1280` and read it; report what it shows. The frame is the evidence
  for D29; if the ring is not visible over the button in the frame, report that as a deviation with
  the frame path and change nothing further.

## Carried findings

1. **Claim 3 (analyst): N2 binds tokens per selector.** Restructure `INPUT_GROUP_CASES` so each row
   names, per property, the token references that property's declaration must carry, and change the
   N2 case to read each property's declaration against its own references. Plant: replace the addon's
   padding with `padding: 0; --audit-unused: var(--vn-space-3) var(--vn-space-6)` in the partial; the
   case must redden; reverse exactly. Negative control: the count assertion and the browser padding
   reading (A2) already redden under that plant; record their readings too.
2. **Claim 8 (analyst, reviewer; D30): the size pair takes one `@each`.** Drive the `-lg` and `-sm`
   blocks with one `@each` over a two-entry map (the `_form-range.scss` idiom), keeping the release's
   order (`-lg` then `-sm`) and every declaration. Prove the compile byte-identical before and after
   the `@each` change alone: `npx --no-install sass --no-source-map
   src/styles/components/_input-group.scss` to files under `tmp/probe/` and `cmp`; record the command
   and exit code. Apply finding 4 after that comparison.
3. **Claim 8 (reviewer): the inline matrices.** Move the sizes matrix and the corner matrix to frozen
   `INPUT_GROUP_SIZE_CASES` and `INPUT_GROUP_FLOATING_CASES` in `tests/setupStyles.ts` (each row and
   the table frozen), add their export-literal and freeze rows to the N3 block in
   `tests/setupStyles.test.ts`, and import them in the proof.
4. **D33: the sized select's end padding.** In the `@each` block, write the sized select's
   `padding-right` as `calc(var(--vn-space-6) * 4)` in place of `var(--vn-space-24)`; update the
   N2 row's references; confirm `npm run build:src && npm run test:conformance` stays green with the
   ledger row unchanged (`tokenized`); if the ledger asks for a changed row, apply what it prints.
5. **Claim 6 (analyst): the tooltip sentence.** Rewrite the guide sentence around line 795 and the
   partial's comment at the overlap rule so that feedback elements wrap onto their own line and a
   tooltip is positioned absolutely below the control (`position: absolute; top: 100%`), taking no
   part in the wrap.
6. **D29 (reviewer 6, R1): the focus scenario drives the grouped button.** In `tests/setup.ts`,
   `INPUT_GROUP_KEYS` carries `{ scenario: 'input-group-button-focus', subject: 'Input group button' }`
   and its remarks state that the lift puts the focused control's ring over the grouped button, which
   sits at `z-index: 2`, and that the addon is static and already sits under the control at rest. In
   `tests/app/browser/integration.test.ts`, the journey case reaches the `Input group button`
   specimen's control through the keyboard, photographs the page frame, and reads `z-index` `'5'`
   again after the shot; retitle the case for what it proves. Rewrite the guide's focus sentence
   (around lines 840 to 841) to the same claim. Remove the stale `input-group-plain-focus--*` files
   from `tmp/capture/states/` and write the new frames: `CAPTURE=1 npm run test:journey -- --project
   'journey:<variant>*'` for each of `light-1280`, `dark-1280`, `light-390`, `dark-390`.
7. **D31 (reviewer R3): the rounding fixture's TSDoc.** Restate the `INPUT_GROUP_ROUNDING` remarks
   in the present tense (the text control and select classes carry no radius of their own in this
   cascade, so the fixture supplies one), without narrating landing order.
8. **Report corrections** (analyst 5, the attacked-and-held note, reviewer claim 3 adjacent). In the
   successor report: the sibling exclusion selector attributes to `input-group` because
   `collectSelectorClasses` excludes classes inside functional arguments, and the ledger tables
   already follow that; the "reaches the feedback" plant row names the `:not(.invalid-tooltip)`
   plant it actually made; the later-partial observation names the `.btn-group > .btn:focus` override
   on a nested button as the release's own behaviour; the ROADMAP patch names B-FORMS-CLOSE as the
   carrier of the `Input group valid tooltip` and `Input group invalid tooltip` specimens (resting
   element frames over a wrapper that keeps the tooltip's overflow room beneath the group),
   B-FORMS-CONTROL as the carrier retiring `INPUT_GROUP_ROUNDING` and the guide's consumer-radius
   sentence, and adds a row for B-PASSIVE-CLOSE: `_button.scss`, `_pagination.scss`, and
   `_placeholder.scss` still repeat a size pair that D30 gives one `@each`.

## Scope

**Owned.** `src/styles/components/_input-group.scss`, `tests/src/styles/components/input-group.test.ts`,
`tests/setupStyles.ts` (the `INPUT_GROUP_*` tables and `INPUT_GROUP_ROUNDING`), `tests/setupStyles.test.ts`
(the N2 and N3 cases), `tests/setup.ts` (`INPUT_GROUP_KEYS` and its remarks), `tests/setup.test.ts`
(only if an inventory row names the scenario), `tests/app/browser/integration.test.ts` (the input
group focus journey case), `guides/veneer.md` (`### Input group classes` and the § Tokens ledger row
the D33 change prints, if any), `tmp/units/b-forms-group-report-3.md` (the successor report),
`tmp/capture/states/` (the input group frames), and `tmp/probe/` for the compile comparison (removed
before you finish).

**Shared (report-only).** `tests/setupServer.test.ts` (the shipped-key Set literal), `ROADMAP.md`
(the patch, restated in the successor report with finding 8 applied),
`tests/src/styles/components/validation.test.ts` (the `'5'` patch, unchanged from the report).

**Off-limits.** Every other file: `src/styles/_tokens.scss`, `_theme.scss`, `_mixins.scss`,
`_validation.scss`, `_button.scss`, `_button-group.scss`, `tests/fixtures/oracle/inventory.json`,
`tests/setupServer.ts`, `tests/setupServer.test.ts`, `app/**`, `configs/**`, `package.json`,
`ROADMAP.md`, the vendored files, and the earlier briefs and report under `tmp/units/`.

**What asserts the state this change ends.** `tests/setupStyles.test.ts` (N2 per-property reads and
the N3 rows; owned); `tests/src/styles/components/input-group.test.ts` (the imported matrices; owned);
`tests/setup.test.ts` and `tests/app/browser/integration.test.ts` (the scenario rename; owned at the
rows the rename touches); the capture portfolio (the renamed frame; owned under `tmp/capture/states/`);
derived by running `npm run test:setup`, the scoped browser run, and `npm run test:journey`, bounded by
a word-boundary grep for `input-group-plain-focus` and `space-24` over `tests/`, `src/`, and `guides/`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src`; no `git mv`; `git add -N` only to render diff evidence; no
`npm install`; no git command that discards a working-tree change.

## Execution

**A native subagent, or a bench engine reading this brief inside its own CLI:** perform the
assignment directly and spawn nothing.

## Output

Write `tmp/units/b-forms-group-report-3.md` (the successor report: every carried finding with the
site it changed, the plant table with each mutation's reddening cases and its exact revert, the
compile comparison's command and exit code, the D29 frame reading, the corrected narrative of finding
8, the ROADMAP patch, the shipped keys for the Set literal, the `validation.test.ts` patch, the gate
table with exit codes, and the claims you flag as unverified). Return as your final message: the
report path, the `git status --short` output, and the gate table. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on a finding whose fix would require an off-limits file, on a compile that is not
byte-identical after the `@each` change alone, or on a focus frame that does not show the ring over
the button. Decide, record, and carry on from the map's variable names, the per-property table's
shape, the placement of the restated sentences, and the journey case's title.

## Acceptance criteria

1. `cmp` of the compiled partial before and after finding 2 exits 0 (`tmp/probe/` holds the two
   outputs during the comparison and is empty or absent when you finish).
2. `npx oxfmt --check` over the owned files and `npx oxlint` over the owned TypeScript files exit 0;
   `npm run check` exits 0.
3. `npm run build:src && npm run test:conformance && npm run test:setup` exit 0.
4. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/input-group.test.ts`
   exits 0, and under the finding 1 plant `npm run test:setup` reports the N2 case red and green
   again after the exact reverse edit.
5. `npm run test:app` and `npm run test:guides` exit 0.
6. The four `CAPTURE=1` runs exit 0, `tmp/capture/states/` holds `input-group-button-focus--<variant>.png`
   for each variant and no `input-group-plain-focus--*` file.
7. `tmp/units/b-forms-group-report-3.md` exists with every section § Output names.

**Observations, not criteria.** `npm run test:src:styles` (the whole styles project) and `npm run
test:journey`: report each reading you take; the Orchestrator takes the authoritative runs after you
exit.

## Review evidence

A code change and a rendered surface: the actual diff against `2c10329` (`git diff 2c10329 -- <owned
files>`), the actual `git status --short`, the successor report, and the `light-1280` focus frame as
the primary evidence for D29 with the journey case as corroboration.
