# Unit B-FORMS-CHECK, round 2 — the fix round over the B-FORMS-CHECK audit

Successor to `tmp/units/b-forms-check-brief-2.md` (itself the successor of `b-forms-check-brief.md`).
What changed and why: the audit round (`/home/user/scaffold/.orkestrel/veneer/units/bfc-audit-analyst-verdict.md`,
FAIL 2, 8, 10; `bfc-audit-reviewer-verdict.md`, FAIL 1, 2, 5, 10, F1 to F3, R1; `bfc-audit-checker-verdict.md`,
FAIL 8; reconciled in `bfc-audit-verdict.md`) found one proof gap, one partial-structure defect, three
guide defects, a vocabulary defect in a case table, a false clause in a compatibility row, an incomplete
ROADMAP patch, and an inaccurately described plant; the Orchestrator ruled D28 (a light island nested
inside a dark island keeps the dark knob) and carries it here. The earlier briefs stay in place
unedited; their Objective, Context, Scope, Execution, Output, and Deviation contract bind here except
where this brief states otherwise.

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-bfc`, a git worktree detached at `2c10329` with the round-1 writes uncommitted in
the tree (the state the audit ruled on). Perform the assignment directly and spawn nothing. Use
absolute paths under `/home/user/veneer-bfc` for every command and file, and run every npm and npx
command from `/home/user/veneer-bfc`; your shell may start elsewhere. Do not commit, push, install, or
run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`; undo
a transient plant by the exact reverse edit.

## Objective

Every finding under § Carried findings is closed in the owned files, each proof change goes red under
its named mutation and green after the exact reverse edit, the partial compiles byte-identical before
and after the `@each` change, and the gates in § Acceptance criteria are green.

## Context

**Evidence.** The verdicts cite by line at the round-1 tree. `src/styles/components/_form-check.scss`:
the focus rule around line 69 (`border-color: color-mix(in srgb, var(--vn-palette-blue) 50%, var(--vn-palette-white-base))`),
the two glyph rules `.form-check-input:checked[type='checkbox']` and `.form-check-input:checked[type='radio']`
around lines 82 to 88, the grouped disabled-label rule `.form-check-input[disabled] ~ .form-check-label, .form-check-input:disabled ~ .form-check-label`
around line 102, the dark knob rule around line 149. `tests/src/styles/components/form-check.test.ts`:
the case `dims a disabled box and its label, whether the attribute or a disabled fieldset disables it`
around line 342 (`#check-disabled` is an `<input disabled>`; the fieldset host asserts
`inherited.matches('[disabled]')` is false at line 353), the `it.each` destructure
`({ markup, drive, theme, selector, property, image })` around line 218. `tests/setupStyles.ts`:
`FORM_CHECK_ICON_CASES` from around line 3790 with its remarks around lines 3777 to 3781 (the `theme`
field). `tests/setupStyles.test.ts`: `entry.theme` around line 2219 and `({ theme }) => theme === 'dark'`
around line 2241 in the case `binds each check glyph…`. `guides/veneer.md`: the focus bullet around
line 757 ("**The focus border and ring bind the focus tokens.**"), "the resting fill in both modes"
around line 775, the print sentence around lines 783 to 784, the § Compatibility `form-check` variable
row at line 3031 ("each glyph read from the icon map"). The report `tmp/units/b-forms-check-report.md`:
the ROADMAP patch for the § Customization carrier row around lines 295 to 297, the plant table's
"swapped checked and indeterminate image" row around line 205. Locate every site by its symbol; the
line numbers are approximate. The release's dark knob rule is `bootstrap.css:2501`
(`[data-bs-theme=dark] .form-switch .form-check-input:not(:checked):not(:focus)`), the same
descendant shape the partial carries.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,tests,names,architecture,documentation,writing}.md`; no
skill; guide `guides/veneer.md`; the design `tmp/units/b-forms-design-verdict.md` and
`tmp/units/decisions-round-2.md` (D26, D28) bind.

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`,
`server/index.d.ts`; guide `/home/user/scaffold/guides/test.md` § Surface), `@orkestrel/contract`,
`@orkestrel/guide`: this round adds no helper; a helper, guard, wait, recorder, or deferred whose job
an installed export does is a defect, and the audit's checker runs the export-name probe over the diff.

**Host.** bash; `/home/user/veneer-bfc`; npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
Chromium at `/opt/pw-browsers` (`export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`); foreground
commands are capped at 10 minutes; sibling units run in other worktrees, so a journey timing failure
under load is the Orchestrator's reading; `prettier` must never run, `oxfmt` is the formatter; no
network is needed.

**Measurements.** Taken by the Orchestrator on 2026-09-23 in this worktree: `git status --short`
lists the round-1 writes (four `A`, thirteen `M`) and nothing else; the analyst's
`npx --no-install sass --no-source-map src/styles/components/_form-check.scss` compiled clean and its
in-memory `@each` substitution compiled byte-identical; `npm run check` exited 0 in the analyst lane;
`grep -n '@each' src/styles/components/*.scss` shows the tree's `@each` idiom in `_button.scss:128`,
`_form-range.scss:35`, and `_link.scss:4`.

**Control identifiers.** none; name every test for what it proves rather than for the control that
specified it.

**Standing conditions.** No sibling writes this worktree. The `probe` MCP server is registered in
`.mcp.json` but unapproved in this session, so the `prove` tool is unavailable: take the runtime-probe
fallback of `.claude/rules/tests.md` § Probes (mutation with exact revert) with its negative control,
and report each control's reading. `src/styles/_tokens.scss` and `_theme.scss` stay off-limits: the
theme scope still declares `--bs-form-switch-bg` under `[data-bs-theme='dark']` and D26's follow-up
unit removes it after this unit lands. `tests/setupServer.test.ts` (the shipped-key Set literal) and
`ROADMAP.md` are the Orchestrator's integration edits at landing: the successor report carries the
patches.

## Unknowns

- The nested-island reading under D28 (finding 8): whether a resting switch inside
  `[data-bs-theme='light']` nested inside `[data-bs-theme='dark']` reads the dark knob URI. Mount it
  once in the proof's browser project, read `background-image`, and report the URI it matched. The
  expected reading is the dark knob; a light-knob reading is a deviation report and changes no prose.

## Carried findings

1. **Claim 2 (analyst and reviewer): the `[disabled] ~ .form-check-label` half of the disabled-label
   rule has no distinguishing reading.** In the case `dims a disabled box and its label…`, add a host
   that matches `[disabled]` without matching `:disabled` (an element that is not a form control,
   such as `<span class="form-check-input" disabled></span>` followed by a `.form-check-label`, with
   an assertion that the host matches `[disabled]` and not `:disabled`), and read its label's
   `opacity` and `cursor`. Plant: split the grouped rule into an attribute-label rule declaring
   `opacity: 1` placed before the state-label rule (the analyst's counterexample); the case must
   redden on the new host's opacity; reverse exactly. Negative control: the existing `#check-disabled`
   and fieldset readings stay green under that plant, which is the gap this host closes.
2. **Claim 8 (analyst; checker): the checkbox and radio glyph rules repeat one per-variant
   structure.** Drive the two `--bs-form-check-bg-image` rules with one `@each` over a two-entry map
   `(checkbox: 'check', radio: 'radio')` (the `_form-range.scss` idiom), keeping the release's order
   checkbox then radio. Prove the compile byte-identical: run
   `npx --no-install sass --no-source-map src/styles/components/_form-check.scss` before and after
   the change to files under `tmp/probe/` and `cmp` them; record the command and the exit code.
3. **Claim 5(a) (reviewer): the focus bullet's lead is false.** The border binds `--vn-palette-blue`
   through `color-mix`, not a focus token. Replace the lead with "**The focus ring binds the focus
   tokens, and the focus border tints the blue palette entry.**" and add one sentence parallel to the
   fill bullet stating that a `--vn-color-primary-base` retune moves the ring and leaves the border on
   the release's tint. Keep the mix sentence and the ring sentence.
4. **Claim 5(b) (reviewer): "the resting fill in both modes".** Write "the resting fill in the light
   and dark modes".
5. **Claim 5(c) (reviewer): the print sentence.** Write "No proof prints, so the proof reads the
   `print-color-adjust` declaration as its resolved value alone."
6. **F1 (reviewer): `theme` → `mode` in `FORM_CHECK_ICON_CASES`.** Rename the field in every row and
   in the remarks (`mode` names the mode island the control is mounted in), and update the three
   consumers: the `it.each` destructure in `form-check.test.ts`, and `entry.theme` and
   `({ theme }) => theme === 'dark'` in `setupStyles.test.ts`. The attribute interpolation stays
   `data-bs-theme="${mode}"`. Search bound: a word-boundary grep for `theme` over the two test files
   and `tests/setupStyles.ts`, ruling each hit (the `data-bs-theme` attribute is data and stays).
7. **F2 (reviewer): the § Compatibility variable row.** Write "…declared on the input, each glyph
   read from the `$icons` map and the dark knob from the `$dark` map; …".
8. **D28 (reviewer R1): the nested light island.** Take the reading under § Unknowns, and add one
   sentence to the dark-rule paragraph of `### Form check classes` stating that the descendant rule
   also reaches a resting switch inside a light island nested in a dark one, as the release's own
   rule does, and that no light-scope reset is added. Add no proof case for it beyond the reading you
   report; record the reading in the report with its command.
9. **F3 (reviewer): the ROADMAP patch.** In the successor report, the § Customization carrier-row
   patch reads "…the range thumb, and the check fill and focus border read the palette entry".
10. **Analyst's plant note.** Re-run the "swapped checked and indeterminate image" plant as an
    exchange of both bindings (the `check` entry read where `indeterminate` is read and the reverse),
    record which cases redden, and describe the plant as an exchange in the report's plant table.

## Scope

**Owned.** `src/styles/components/_form-check.scss`, `tests/src/styles/components/form-check.test.ts`,
`tests/setupStyles.ts` (the `FORM_CHECK_ICON_CASES` table and its remarks), `tests/setupStyles.test.ts`
(the case `binds each check glyph…`), `guides/veneer.md` (`### Form check classes` and the `form-check`
variable row of § Compatibility), `tmp/units/b-forms-check-report-3.md` (the successor report), and
`tmp/probe/` for the compile comparison (removed before you finish).

**Shared (report-only).** `tests/setupServer.test.ts` (the shipped-key Set literal), `ROADMAP.md`
(the patch, restated in the successor report with finding 9 applied).

**Off-limits.** Every other file: `src/styles/_tokens.scss`, `_theme.scss`, `_mixins.scss`,
`_validation.scss`, `_button.scss`, `_button-group.scss`, `tests/fixtures/oracle/inventory.json`,
`tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/setup.ts`, `tests/setup.test.ts`,
`app/**`, `configs/**`, `package.json`, `ROADMAP.md`, the vendored files, and the earlier briefs and
report under `tmp/units/`.

**What asserts the state this change ends.** `tests/setupStyles.test.ts` (the `entry.theme` reads go
false under the rename; owned); `tests/src/styles/components/form-check.test.ts` (the destructure;
owned); `tests/setupStyles.test.ts`'s pinned-inventory comparison and `tests/conformance.test.ts`
stay true because the compile is byte-identical (observed, not asserted anew); derived by running
`npm run test:setup` and the scoped browser run after the edits, bounded by the F1 search bound.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src`; no `git mv`; `git add -N` only to render diff evidence; no
`npm install`; no git command that discards a working-tree change.

## Execution

**A native subagent, or a bench engine reading this brief inside its own CLI:** perform the
assignment directly and spawn nothing.

## Output

Write `tmp/units/b-forms-check-report-3.md` (the successor report: every carried finding with the
site it changed, the plant table with each mutation's reddening cases and its exact revert, the
compile comparison's command and exit code, the D28 reading with its command and matched URI, the
ROADMAP patch with finding 9 applied, the shipped key `form-check` for the Set literal, the gate table
with exit codes, and the claims you flag as unverified). Return as your final message: the report path,
the `git status --short` output, and the gate table. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on a finding whose fix would require an off-limits file, on a compile that is not
byte-identical after the `@each` change, or on a light-knob reading under D28. Decide, record, and
carry on from the placement of the added sentences, the map's variable name, and the attribute-only
host's markup.

## Acceptance criteria

1. `cmp` of the compiled partial before and after finding 2 exits 0 (`tmp/probe/` holds the two
   outputs during the comparison and is empty or absent when you finish).
2. `npx oxfmt --check` over the owned files and `npx oxlint` over the owned TypeScript files exit 0;
   `npm run check` exits 0.
3. `npm run build:src && npm run test:setup` exit 0.
4. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-check.test.ts`
   exits 0, and under the finding 1 plant the same command reports the new host's case red and
   green again after the exact reverse edit.
5. `npm run test:conformance` and `npm run test:guides` exit 0.
6. `tmp/units/b-forms-check-report-3.md` exists with every section § Output names.

**Observations, not criteria.** `npm run test:src:styles` (the whole styles project), `npm run
test:journey`, and any capture run: report each reading you take; the Orchestrator takes the
authoritative runs after you exit.

## Review evidence

A code change: the actual diff against `2c10329` (`git diff 2c10329 -- <owned files>`) and the actual
`git status --short`; the successor report; the compile comparison's outputs are transient and their
`cmp` exit code is the evidence.
