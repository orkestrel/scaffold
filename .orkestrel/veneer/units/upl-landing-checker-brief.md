# UTIL-PLACEMENT landing (`upl` on the session branch over the TOGGLES fold) — landing check

## Role and engine

`checker` on Sonnet, a native Claude subagent, read-only (Read, Grep, Glob). It writes nothing and runs nothing.

## Objective

Rule, claim by claim, whether the UTIL-PLACEMENT commit on the Veneer session branch carries the unit's owned files and its shared and unlisted patches with the conflict resolutions the audit accepted and the Orchestrator's merge rules, and nothing else.

## Context

**Subject.** The Veneer checkout `/home/user/veneer` at the commit `upl-landing.commits` names (read the live source, tests, and guide; never `tmp/`, `dist/`, or `node_modules/`; a gate run is in flight there).

**Evidence, all under `/home/user/scaffold/.orkestrel/veneer/units/`.** `upl-landing.diff` (`git diff <base> HEAD`, the base named in `upl-landing.commits`), `upl-landing.stat`, `upl-landing-message.txt`; the unit's return `upl-4.diff` (the owned files against the base `e4e6a40`), `upl-4-status.txt`, `upl-shared-4.patch`, `upl-unlisted-4.patch`; the resolution instruments `upl-resolve-2.py` (the diff3-block rules: the source-line token union, the link-list union, the sentence-level prose merge, the append rule), `table-merge3.py` (the file table keyed by its File cell; the obligation ledger as a row sequence), `land-seams.py`, `land-conflict-map.py`, and the probe records `upl-landing-probe-2.sh` and `upl-landing-probe-2.txt`; the reconciliation `upl-audit-4-verdict.md` and its rulings; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`.

**Law.** `AGENTS.md` § Writing; `.claude/rules/writing.md`. Skill: none.

**Standing conditions.** The unit's owned files are new files plus one edit of `app/browser/styles/_shell.scss`; their cherry-pick onto the tip is recorded in `upl-landing.commits`. The three-way apply of the shared and unlisted patches met the conflicts `upl-landing-probe-2.txt` maps, each resolved by `upl-resolve-2.py`'s rules: every `@source not inline("…")` line (the guide's Tailwind fences, `tests/setup.css`, and the consumer and preflight fixtures) as ours' tokens plus theirs' added tokens, none removed; the guide's § Tests link list as ours' items then theirs' items, the conjunction on the last; the guide's Tailwind paragraph sentence by sentence from the base with ours' `order-first` sentence first and theirs' width, offset, and longhand sentences after it, re-flowed at 100 columns; the guide's file table keyed by its File cell and the obligation ledger as a row sequence, each rebuilt from the base `e4e6a40` by `table-merge3.py` (the probe's `deleted by theirs: none` and `rows theirs removed: none` lines); every other block as the landed lines first and the placement lines after them (the Position, Sizing, and Visibility regions after Flex). `land-seams.py` and `sort-inventories.py` ran after the resolver; the formatter re-padded the tables. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and must be absent from the diff.

## Unknowns

None.

## Scope

Read-only over the evidence files and the Veneer source, tests, and guide. No edit, no command.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Claims

1. **Delta and scope.** The set of files `upl-landing.diff` touches equals the union of the owned files in `upl-4-status.txt` and the files `upl-shared-4.patch` and `upl-unlisted-4.patch` touch; every removed line in `upl-landing.diff` is one `upl-4.diff`, `upl-shared-4.patch`, or `upl-unlisted-4.patch` removes, or a re-padded table row whose cells are unchanged, or a re-flowed line of the Tailwind paragraph whose words are unchanged; neither vendored file appears.
2. **The owned files.** Each owned file's content at HEAD equals the base `e4e6a40` content with `upl-4.diff` applied (the hunks of `upl-landing.diff` for those files are the hunks of `upl-4.diff`).
3. **The placement and the registry.** `app/browser/Showcase.ts` constructs `PositionSection`, `SizingSection`, and `VisibilitySection` directly after `FlexSection`; `app/browser/index.ts` exports them directly after `FlexSection`; `tests/app/browser/Showcase.test.ts` lists and spreads them directly after Flex; in `tests/setup.ts` the `CaptureSubject` union carries every placement subject the patch adds after the landed members, the placement resting rows follow the last landed resting row, each opening with `Object.freeze({` after the preceding row's `}),` (cite the seam), the driven rows the patch adds follow the last landed driven row, and every row's selector and property equal the patch's.
4. **The source lines, the link list, and the paragraph.** Every `@source not inline("…")` line in `guides/veneer.md`, `tests/setup.css`, `tests/fixtures/tailwind/consumer.css`, and `tests/fixtures/tailwind/preflight.css` carries every token the tip carried and every token the patch adds, each once, in the order the rule states; the § Tests link list carries the tip's items then the patch's, every item ending in `,` and the last in `, and`; the Tailwind paragraph carries the tip's `order-first` sentence, then the patch's width-and-height, start-and-end, and longhand sentences in the patch's order around the shared `gap-3` sentence, no sentence dropped or duplicated, at 100 columns.
5. **The tables and every other shared hunk.** The guide's file table carries every row the tip carried plus the patch's rows at the positions the patch's context places them, the obligation ledger carries every tip row plus the patch's rows (the probe's inserted list) with no row removed, and the header and separator of each table appear once; the sorted inventories in `tests/conformance.test.ts` and `tests/setupServer.test.ts` carry the tip's names and the patch's names in sorted order; `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/app/browser/integration.test.ts`, `tests/service/tailwind/consumer.test.ts`, `tests/fixtures/tailwind/markup.html`, `src/styles/index.scss`, and `app/browser/constants.ts` carry the patch's hunks byte for byte apart from the formatter's re-padding, the Position constants following the closing `])` of the last flex specimen list.
6. **Prose law.** The landing message carries no term the substitution table in `.claude/rules/writing.md` bans unconditionally and no count of a growable set; list every hit with its ruling and name the pattern and paths you swept.

## Output

Return, as the final message, one verdict per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or `NOT-EVIDENCED`) with `file:line` evidence, findings outside the claims, and the single terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. No process diary; rule every population whole rather than sampling it; state no count of a growable set.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Where an evidence file is missing or a claim's site cannot be located, rule the claim `NOT-EVIDENCED` and name what is missing rather than stopping.

## Acceptance criteria

A verdict on every claim with evidence and the terminal line.

## Review evidence

The diff and status evidence named under Context.
