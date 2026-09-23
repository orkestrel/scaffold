# Unit B-FORMS-LABEL-CASCADE (`bfl`), round 2 — the unsized label's type step, the prose the audit faulted, and the shared selector split

Successor to `b-forms-label-cascade-brief.md` (unedited). What changed and why: the round-1 audit (`bfl-audit-verdict.md`) rules that the unsized `.col-form-label` reads `--vn-size-3` rather than `inherit` (re-baselining ruling D on the unit's own measurement: Veneer's body is 14 px and the control 16 px, so `inherit` leaves the default horizontal label one step smaller than its control and equal to the small one), breaks claim 8 on prose (bare code tokens, a count, a synonym, position names), finds the `matchSelectorKey` summary misstated, and refers the label proof's selector split to the shared helper. Every item is exact text or a bounded code change.

## Role and engine

`opus` on Opus 5.5 (native Claude subagent), sole writer in `/home/user/veneer-bfl` (the worktree over `a56ca7e` holding round 1 uncommitted, which this round builds on and never discards; `dist/` is built). Perform the assignment directly and spawn nothing. Use absolute paths under `/home/user/veneer-bfl`, run every npm and npx command from there, and run `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"` first in every shell. Do not commit, push, install, run `corepack use`, or run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

The unsized horizontal label reads the control's type step with its ledger row, proofs, table row, and guide sentences following; the listed prose sites carry the exact text below; the label proof splits selectors through the shared helper; and the gates in § Acceptance criteria are green.

## Context

**Evidence.** Locate each site by its quoted text (lines are approximate, at the round-1 tree):

```text
src/styles/components/_form-label.scss:30       font-size: inherit;   (inside .col-form-label)
src/styles/components/_form-label.scss:21-25    the comment "The horizontal label reads the tokens the control's own inset and type read … On a `legend` it also clears the element's own trailing margin and type size."
tests/setupStyles.ts:4909-4998                   FORM_LABEL_CASES (the .col-form-label row's per-property reads) and FORM_LABEL_MARKUP
tests/setupStyles.ts:4928                        "so `component` names the table"
tests/setupStyles.test.ts:2749                   "the stacked trio"
tests/src/styles/components/form-label.test.ts:73    "the last reading"
tests/src/styles/components/form-label.test.ts:99-105  the level case: the ternary at line 103 comparing a sized label against its control and the unsized label against its row; the ratio check
tests/src/styles/components/form-label.test.ts:144   the legend case reading the group's size
tests/src/styles/components/form-label.test.ts:155-159  rule.selectorText.split(',') in the components-layer case; tests/src/styles/components/form-check.test.ts:46 uses splitTopLevelList for the same job (read where it imports it from)
tests/setupServer.ts:395                          "`tests/conformance.test.ts` maps"
tests/setupServer.ts:1502                         the matchSelectorKey summary "Selects the key a selector's classes belong to by the key's own prefix."
tests/setupServer.ts:1504                         "as {@link collectSelectorClasses} reads them"
tests/setupServer.ts:1507                         the @returns line's bare selector and key tokens
tests/setupServer.ts:2019 and :2023               "through {@link matchSelectorKey}"
tests/setupServer.test.ts:2208                    "the last reading"
tests/conformance.test.ts:321-322                 "two partials" and "`FORM_PARTIALS` maps each"
guides/veneer.md:990-991                          "through `aria-describedby`" and "announces the hint"
guides/veneer.md:992 and :996                     "a `legend` that labels" and "On a `legend` it also clears"
guides/veneer.md:994-996                          the limit sentence on the unsized label's size
guides/veneer.md:1003                             the headline "The horizontal label reads the control's inset and type tokens"
guides/veneer.md:1011-1012                        the closing paragraph's "`inherit` size" clause
guides/veneer.md (#### col table under ### Departures, around line 2556)   the col rows; the new row for .col-form-label font-size lands here in the shape the conformance drift reports
```

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,typescript,names,writing,documentation}.md`. Skill: none. Guide: `guides/veneer.md` (owned as round 1).

**Installed primitives.** As round 1. **Host.** As round 1. **Measurements.** Read each site before editing; take the departure row's exact text from the `npm run test:conformance` drift output after the binding lands (the equality names the unrecorded row). **Control identifiers.** The audit's claim numbers and the finding names `unsized-label-type` and `match-summary` are labels; name nothing after them. **Standing conditions.** The worktree is dirty with round 1 by design; `tmp/units/` holds round 1's probe (leave it).

## Unknowns

none.

## Scope

**Owned.** As round 1 (`src/styles/components/_form-label.scss`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/conformance.test.ts`, `tests/src/styles/components/form-label.test.ts`, `guides/veneer.md`), plus `tmp/units/bfl-report-2.md`. **Shared (report-only) and off-limits.** As round 1; the moved forms sections stay byte-identical apart from the sites this brief names inside `### Form label classes`.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/bfl-report-2.md`: the diff against round 1 (`git diff --stat` and the status), each criterion with its command and result line, the failing run of the level case before the binding changed and the green run after, the departure row landed, and the exact prose landed. Return the same content as your final message.

## Deviation contract

Stop and report on a quoted site not found or a criterion needing a file outside Owned. Decide, record, and carry on for rewrapping at 100 columns, for the exact wording of the guide's limit sentence and closing clause within the meaning criterion 3 fixes, and for the `@returns` nouns.

## Acceptance criteria

1. `.col-form-label` writes `font-size: var(--vn-size-3)` in place of `inherit`; the `-lg` and `-sm` rules and the stacked `.form-label` are unchanged; the partial's comment keeps its first sentence true and reads "On a `legend` element it also clears" at its `legend` site.
2. `FORM_LABEL_CASES` binds `font-size` to `--vn-size-3` in the `.col-form-label` row's `reads`; the label Node binding case is green; the level case compares every label's font size against its control's (the ternary reduced to the control) and fails before the binding (record the command and the failing count) and passes after; the legend case reads the control's step; the components-layer case splits `rule.selectorText` through `splitTopLevelList` imported from where the check proof imports it, with no `split(',')` left in the file.
3. `guides/veneer.md` under `### Form label classes`: the limit sentence around line 994 is replaced by one stating that the unsized horizontal label reads `--vn-size-3`, the control's type step, so its text sits level with the control's at each size, and that the stacked `.form-label` keeps inheriting the surrounding type; the closing clause around line 1011 no longer names an `inherit` size; the headline around line 1003 stays; the `#### col` table carries the departure row for `.col-form-label` `font-size` in the exact text the conformance drift reports, in the table's shape; nothing else in the moved sections changes.
4. Prose, verbatim apart from wrapping: `tests/setupServer.ts` around line 1502 "Selects the longest key that one of a selector's classes equals or opens with."; around line 1504 "as the {@link collectSelectorClasses} helper reads them"; around line 1507 the `@returns` line gives the selector and key tokens their nouns; around lines 2019 and 2023 "through the {@link matchSelectorKey} helper"; around line 395 "The `tests/conformance.test.ts` file maps"; `tests/conformance.test.ts` around lines 321-322 with the count removed and "the `FORM_PARTIALS` record maps each"; `tests/setupStyles.ts` around line 4928 "so the `component` field names the table"; `tests/setupStyles.test.ts` around line 2749 "the stacked label, control, and help text"; `tests/setupServer.test.ts` around line 2208 "the reading with `form` as the only shipped key withholds"; `tests/src/styles/components/form-label.test.ts` around line 73 "so the reading after every retune holds the label under all of them at once"; `guides/veneer.md` around lines 990-991 "through the `aria-describedby` attribute, so a screen reader announces the help text after the control's name"; around lines 992 and 996 "a `legend` element".
5. `npx oxfmt --check` over the owned files, `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
6. `npm run build:src`, `npm run test:setup`, `npm run test:conformance`, `npm run test:guides`, and the scoped styles run over `form-label.test.ts` and `form-floating.test.ts` exit 0.
7. The report states "§ Tests is unchanged except for the required style-proof link" where it describes § Tests, and states no count.

**Observations, not criteria.** The whole `npm run test:src:styles` run.

## Review evidence

The diff against round 1 and against `a56ca7e`, the status, this report, and round 1's records.
