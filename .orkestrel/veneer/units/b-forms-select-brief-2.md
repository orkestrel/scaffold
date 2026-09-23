# Unit B-FORMS-SELECT, round 2 — the fix round over the B-FORMS-SELECT audit

Successor to `tmp/units/b-forms-select-brief.md`. What changed and why: the audit round
(`/home/user/scaffold/.orkestrel/veneer/units/bfs-audit-analyst-verdict.md`, FAIL 3, 6, 7, 10;
`bfs-audit-reviewer-verdict.md`, FAIL 3, 6, 7, 10, F1 to F4, R1 to R5; `bfs-audit-checker-verdict.md`;
reconciled in `bfs-audit-verdict.md`) found a recorded declaration no case reads, bare code tokens in
the guide section, an incomplete D26 carrier list, an overclaiming partial comment, a density claim
false for a validated select, case titles that hide what they prove (the recorded-declaration case and the keyboard-focus case), and an inverted term pair;
the Orchestrator carries D30 (one `@each` for the size pair) and D36 (generic query arguments stand).
The original brief stays in place unedited; its Objective, Context, Scope, Execution, Output, and
Deviation contract bind here except where this brief states otherwise.

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-bfs`, a git worktree detached at `2c10329` with the round-1 writes uncommitted in
the tree (the state the audit ruled on). Perform the assignment directly and spawn nothing. Use
absolute paths under `/home/user/veneer-bfs` for every command and file, and run every npm and npx
command from `/home/user/veneer-bfs`; your shell may start elsewhere. Do not commit, push, install, or
run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`; undo
a transient plant by the exact reverse edit.

## Objective

Every finding under § Carried findings is closed in the owned files, each proof change goes red under
its named mutation and green after the exact reverse edit, the partial compiles byte-identical before
and after the `@each` change, and the gates in § Acceptance criteria are green.

## Context

**Evidence.** The verdicts cite by line at the round-1 tree. `src/styles/components/_form-select.scss`:
the density comment around lines 9 to 10, the `color: var(--bs-body-color)` declaration at line 19,
the focus comment around lines 36 to 38 ("so one retune of the focus tokens moves every ring this
package paints"), the `.form-select-sm` and `.form-select-lg` blocks at lines 65 to 79.
`tests/src/styles/components/form-select.test.ts`: the case `resolves each recorded declaration…`
at line 39 (also proving the `size="1"` exclusion, the bare select's native appearance, and the
CSSOM discarding the Gecko rule), the dark-caret case at line 137 with the `bright`/`dim` rows at
145 to 146 and the comment at 156, the case `rings the select under keyboard focus…` at line 263
(also proving the focus-width retune, the bare select's user-agent ring, and the disabled traversal
refusal at 327). `tests/setupStyles.ts`: `FORM_SELECT_CASES` from around line 3752 with its TSDoc
("Pins each declaration the select ships at the release's own value") around 3733.
`tests/setupStyles.test.ts`: the binding around 2194 to 2233. `guides/veneer.md`: `### Form select
classes` at 723 to 786 (bare tokens at 733, 740, 746 to 748, 751 to 752, 755, 756, 762, 770 to 771;
the density sentence at 748; the theme-scope sentence at 736 to 738; the evidence sentence at 775);
the § Bootstrap variables paragraph at 1505 to 1511. The report `tmp/units/b-forms-select-report.md`
and its ROADMAP patch (the scratchpad `bfs/ROADMAP.patch`). Locate every site by its symbol; the line
numbers are approximate. The validated select's geometry: `_validation.scss:71-80` holds
`padding-right: 4.125rem` and a caret at `right 0.75rem center` (literal), so under
`--vn-factor-density: 2` a `.form-select.is-valid` keeps 66px end padding and a 12px caret inset
while an unvalidated select scales to 72px and 24px.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,tests,names,architecture,documentation,writing}.md`; no
skill; guide `guides/veneer.md`; the design `tmp/units/b-forms-design-verdict.md` and the rulings
D26, D30, D35, D36 in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`.

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`,
`server/index.d.ts`), `@orkestrel/contract`, `@orkestrel/guide`: this round adds no helper.

**Host.** bash; `/home/user/veneer-bfs`; npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
Chromium at `/opt/pw-browsers` (`export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`); foreground
commands are capped at 10 minutes; sibling units run in other worktrees; `prettier` must never run,
`oxfmt` is the formatter; no network is needed.

**Measurements.** Taken by the Orchestrator on 2026-09-23: `git status --short` lists the round-1
writes (four `A`, thirteen `M`); the analyst's compile matched the release; `npm run check` exited 0
in the analyst lane; `grep -c '@each' src/styles/components/_form-select.scss` returns 0.

**Control identifiers.** none; name every test for what it proves rather than for the control that
specified it.

**Standing conditions.** No sibling writes this worktree. The `probe` MCP server is unavailable: take
the runtime-probe fallback (mutation with exact revert) with its negative control, and report each
control's reading. `src/styles/_tokens.scss`, `_theme.scss`, and `_validation.scss` stay off-limits
(D26's follow-up removes the `$assets` entry; R2 on the validated select's geometry is
B-FORMS-CLOSE's). `tests/setupServer.test.ts` (the Set literal) and `ROADMAP.md` are the
Orchestrator's integration edits: the successor report carries the patches. `npm run test:setup`
and `npm run test:conformance` stay red only on the Set literal and the sibling-absent presence
reading (O1, O2).

## Unknowns

none.

## Carried findings

1. **Claim 3 (both lanes): the select's text colour has no reading.** Add a `FORM_SELECT_CASES` row
   for `.form-select` `color` (`var(--bs-body-color)`) and one for `background-color`
   (`var(--bs-body-bg)`), and a case that sets `color` on a wrapper and asserts the select's resolved
   colour still matches `--bs-body-color` in the light and dark islands (`readToken` and
   `matchesColor`). Plant: delete the `color` declaration; the case must redden; reverse exactly.
   Bound the `FORM_SELECT_CASES` TSDoc and the guide's evidence sentence (around 775) to the rows the
   table carries, naming the cases that read `background-image` and `outline`.
2. **D30: the size pair takes one `@each`.** Drive `.form-select-sm` and `.form-select-lg` with one
   `@each` over a two-entry map (the `_form-range.scss` idiom), keeping the release's order and every
   declaration; prove the compile byte-identical (`npx --no-install sass --no-source-map
   src/styles/components/_form-select.scss` before and after, to files under `tmp/probe/`, `cmp`);
   record the command and exit code.
3. **Claim 6 (both lanes): bare code tokens.** In `### Form select classes`, give every code token
   its noun (the `_form-select.scss` partial, the `--bs-form-select-bg-img` property, the
   `--vn-space-2` token, the `.btn` class, the `-webkit-appearance` alias, and so on), and reword the
   sentence at 733 so the partial is not the bare subject of "reads". Sweep the section once more
   against `writing.md` § Code tokens after editing.
4. **Claim 7 (both lanes): the D26 carrier list.** In the successor report's ROADMAP patch, the
   "Theme-scope select caret and switch knob" carrier row names B-FORMS-ASSETS (per D26) and lists
   every site the `$assets` removal makes false: `tokens.test.ts` › `re-declares every theme-dependent
   name…`, `theme.test.ts` › `carries the dark-only component assets…`, the § Form select classes
   sentence "each outranks the value the dark theme scope also declares" (around 736 to 738), the
   § Bootstrap variables paragraph (around 1505 to 1511), the case title at `form-select.test.ts:137`,
   and its comment at 156. Change no code for it.
5. **F1 (reviewer): the focus comment.** Replace "so one retune of the focus tokens moves every ring
   this package paints" with "so a retune of the focus tokens moves this ring together with the
   button's".
6. **F2 (reviewer): the density claim.** Bound the guide sentence (around 748) and the partial's
   comment (around 9 to 10) to a select with no validation state, and state that the validation
   state keeps the release's literal icon geometry (as `### Validation classes` states); add no
   proof for the validated case. In the ROADMAP patch, add a carrier row for B-FORMS-CLOSE: the
   validated select's `padding-right` and caret inset in `_validation.scss` read literals while the
   select's own read `--vn-space-*`, so a validated select stops following density.
7. **F3 (reviewer): the case titles.** Split `resolves each recorded declaration…` and `rings the
   select under keyboard focus…` so that each case proves one thing and is named for it: "keeps the
   caret on a single-row select the sized rule excludes"; "leaves a select without the class to the
   user agent's appearance and ring"; "refuses keyboard traversal to the disabled select"; "finds no
   Gecko focus-ring rule in the Chromium cascade"; and the focus-width retune as its own case. Keep
   every assertion; move, do not delete.
8. **F4 (reviewer): the term pair.** Rename the `bright` and `dim` rows to `light` and `dark`.
9. **R3 and R5 (reviewer): carrier rows.** In the ROADMAP patch, add one row for B-PASSIVE-CLOSE
   naming the `MOTION` literal repeated across the range, select, pagination, progress, icon-link,
   and spinner proofs (one setup constant), and one row for B-PASSIVE-CLOSE naming the guide-wide
   token-noun sweep beyond the sections the forms units own.

## Scope

**Owned.** `src/styles/components/_form-select.scss`, `tests/src/styles/components/form-select.test.ts`,
`tests/setupStyles.ts` (the `FORM_SELECT_*` tables and their TSDoc), `tests/setupStyles.test.ts`
(the `form select case tables` describe), `guides/veneer.md` (`### Form select classes` only),
`tmp/units/b-forms-select-report-2.md` (the successor report), and `tmp/probe/` for the compile
comparison (removed before you finish).

**Shared (report-only).** `tests/setupServer.test.ts` (the Set literal), `ROADMAP.md` (the patch,
restated in the successor report with findings 4, 6, and 9 applied).

**Off-limits.** Every other file: `src/styles/_tokens.scss`, `_theme.scss`, `_mixins.scss`,
`_validation.scss`, `tests/fixtures/oracle/inventory.json`, `tests/setupServer.ts`,
`tests/setupServer.test.ts`, `tests/setup.ts`, `tests/setup.test.ts`, `app/**`, `configs/**`,
`package.json`, `ROADMAP.md`, the vendored files, and the earlier brief and report under `tmp/units/`.

**What asserts the state this change ends.** `tests/setupStyles.test.ts` (the pinned-inventory
binding over the new rows; owned); `tests/src/styles/components/form-select.test.ts` (the split
cases; owned); `tests/conformance.test.ts` stays true because the compile is byte-identical
(observed); derived by running `npm run test:setup` and the scoped browser run, bounded by a
word-boundary grep for `bright`, `dim`, and `every ring` over `tests/` and `src/`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src`; no `git mv`; `git add -N` only to render diff evidence; no
`npm install`; no git command that discards a working-tree change.

## Execution

**A native subagent, or a bench engine reading this brief inside its own CLI:** perform the
assignment directly and spawn nothing.

## Output

Write `tmp/units/b-forms-select-report-2.md` (the successor report: every carried finding with the
site it changed, the plant table with each mutation's reddening cases and its exact revert, the
compile comparison's command and exit code, the ROADMAP patch with findings 4, 6, and 9 applied,
the shipped key `form-select` for the Set literal, the gate table with exit codes, and the claims you
flag as unverified). Return as your final message: the report path, the `git status --short` output,
and the gate table. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on a finding whose fix would require an off-limits file, or on a compile that is not
byte-identical after the `@each` change. Decide, record, and carry on from the map's variable names,
the split cases' order, and the nouns chosen for the tokens.

## Acceptance criteria

1. `cmp` of the compiled partial before and after finding 2 exits 0 (`tmp/probe/` empty or absent
   when you finish).
2. `npx oxfmt --check` over the owned files and `npx oxlint` over the owned TypeScript files exit 0;
   `npm run check` exits 0.
3. `npm run build:src` exits 0 and `npm run test:setup` reports exactly one failure (the Set literal).
4. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-select.test.ts`
   exits 0, and under the finding 1 plant the same command reports the colour case red and green
   again after the exact reverse edit.
5. `npm run test:conformance` reports exactly one failure (the sibling-absent presence reading) and
   `npm run test:guides` exits 0.
6. `tmp/units/b-forms-select-report-2.md` exists with every section § Output names.

**Observations, not criteria.** `npm run test:src:styles`, `npm run test:journey`, and any capture
run: report each reading you take; the Orchestrator takes the authoritative runs after you exit.

## Review evidence

A code change: the actual diff against `2c10329` (`git diff 2c10329 -- <owned files>`) and the actual
`git status --short`; the successor report.
