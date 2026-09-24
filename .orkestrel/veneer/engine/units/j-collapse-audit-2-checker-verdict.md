# J-COLLAPSE audit round 2 — the checker's verdict (returned 2026-09-24 by `checker` on Sonnet, native subagent, 43 tool uses, 198 s; retained verbatim from the subagent's return text)

**checker on Sonnet, native Claude subagent, mechanical conformance only.**

## Numbered verdicts

**Claim 4 (mechanical clauses only).**

`CONFIRMED`. Tables: `guides/veneer.md` diff hunk (`j-collapse-2.diff` lines ~146-156) adds the Key/Default/Feeds/Read-through attributes table and the Key/Default/Selects selectors table inside `#### Collapse`. `### Vocabulary` section (`veneer.md:477-486`) carries no Collapse row — only the lead-in prose and no Button/ColorMode-row grep hit for Collapse; the diff hunk at lines 63-67 shows the retained `Button`/`ColorMode` rows only. `plugin` row's three cells confirmed at `veneer.md:5683`: Proof `tests/src/browser/Collapse.test.ts`, Status `shipped`, Obligation carrying the `.bs.` event wording. Departures list confirmed present verbatim at `veneer.md:724-754`: all named departures (triggers read at each change, refusals before/after, transitioning-ancestor nesting, siblings acquired after the accepted event, token write order, completion on running finite animations, `parent` constructor override, and the `dispose` replacement) are present.

**Claim 5.**

`CONFIRMED`. `grep -n "#open\|#close" src/browser/Collapse.ts` → no hit. Each replacement name is declared exactly once: `#owned` at `Collapse.ts:73`, `#hideSiblings` at `:343`, `#siblings` at `:327`, `#transitioning` at `:284`, `#holds` at `:290`, `#prune` at `:371`.

**Claim 6.**

`CONFIRMED` on the mechanical clauses this checker can verify: `j-collapse-mutations-round-2.log.txt` ends with five `GREEN?` rows reading `0 failed of 31/32/10/3/3` (lines 53-57) and the receipt `restored byte for byte` (line 59), with identical before/after digests (lines 1 and 58). Sampled report-table rows against the log: "the token read is dropped at the write doors" (report: exact, 2 of 31) matches log line 32 exactly; "an owned sibling whose panel left the document is kept" (report: exact, 1 of 31) matches log line 18. Whether every row of the full 46-row table matches is `UNRESOLVED` beyond the sample — a full row-by-row diff was not run by this lane.

**Claim 9 (mechanical clauses only).**

`CONFIRMED`. The `Delegate` summary applied in the worktree ("Activates data-attribute hosts through a root's delegated click listener.") matches the guide's `Delegate` § Surface row text found in `j-collapse-delegate-interface.diff` context lines (unchanged row, confirming it already equals the applied class remark). Each returned patch's guide hunk equals its `types.ts` hunk verbatim in the two patches carrying both: `j-collapse-delegate-interface.diff` (Surface row and Methods row text identical to the `types.ts` doc-comment text) and `j-collapse-destroy-summary.diff` (Methods table cell identical to the `types.ts` `@description`-equivalent sentence). `j-collapse-returns.diff` carries no guide hunk, as the report states, and no `types.ts`-versus-guide table exists for `@returns`, consistent with the claim.

**Claim 10.**

`CONFIRMED` on the mechanical clauses. `j-collapse-2-status.txt` lists exactly the eight files the claim names, all `M`, no new file. Grep of the status file for every off-limits name (`types.ts`, `index.ts`, `HostSnapshot.ts`, `helpers.ts`, `Button.ts`, `constants.ts`, `setupBrowser.ts`, `ROADMAP.md`) returns no hit. Every case title named in the report under C1-C9 and the red-reading table is present verbatim in the worktree's test files (10/10 sampled titles found, one apiece across `Collapse.test.ts`, `Delegate.test.ts`, `parsers.test.ts`). `j-collapse-gates-2.log.txt` shows every named gate green: `check:src:browser exit=0`, `oxlint exit=0`, `oxfmt exit=0`, `test:src:browser` 198/198, `test:guides` 19/19, `test:policy` 109 passed/1 skipped, three builds exit=0, `test:conformance` 22/22, both greps exit=1 (pass), tree-wide `check exit=0`, patches `apply-check exit=0`. No `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`/`protected`/`private`, parameter property, default export, or nested function declaration was found in `Collapse.ts` (targeted grep, no hits beyond benign word "any" in comments). `Collapse.ts` holds one class (`export class Collapse` at line 64) plus imports. The over-long-line clause is `CONFIRMED`: the diff shows the `Delegate.ts` class remark line (132 columns) was added this round (`j-collapse-2.diff:1071`), while `Collapse.ts`'s `@throws` line (diff line 725-726) and `validators.ts`'s long line were already over 100 columns before this round's edit (the removed line 725 is equally long; the changed clause only lengthened an already-long line), and `Delegate.ts`'s own `@param`/`@throws` long lines do not appear in the diff at all, confirming they are pre-existing and untouched. The report records the refused `prove` calls ("I made no `prove` call: that MCP server isn't available") and the C9 deviation (§ Deviation state).

## Checklist of mechanical items

| item | status | evidence |
|---|---|---|
| status lists exactly the eight files, all `M` | met | `j-collapse-2-status.txt:1-8` |
| no off-limits file changed | met | grep of status file for the eight off-limits names: no hit |
| every named case title present in worktree test files | met | grep across `tests/src/browser`: 10/10 titles found |
| mutation-log `GREEN?` rows read 0/31,32,10,3,3 | met | `j-collapse-mutations-round-2.log.txt:53-57` |
| log ends with `restored byte for byte` | met | `j-collapse-mutations-round-2.log.txt:59` |
| `#open`/`#close`/`#moving`/`#taken` grep in `Collapse.ts` | met | no hit |
| `#siblings`,`#hideSiblings`,`#owned`,`#transitioning`,`#holds`,`#prune` declared once each | met | one declaration line each in `Collapse.ts` |
| added lines carry no forbidden syntax | met | targeted grep over `Collapse.ts`, no true hit |
| `Collapse.ts` holds one class plus imports | met | `Collapse.ts:64` |
| only one added over-100-column comment/prose line (`Delegate.ts` remark) | met | diff `:1071` (added); `Collapse.ts`/`validators.ts`/`Delegate.ts` long lines confirmed pre-existing via diff absence/context |
| Compatibility table Proof column one width per row | `UNRESOLVED` | not independently measured by this lane; gates log shows `oxfmt --check` exit=0 over `guides/veneer.md`, which is evidence the formatter accepted the padding, but a direct column-width count was not run |
| § Examples fence imports from `@orkestrel/veneer/browser` | met | `veneer.md:433` |
| no term `writing.md` § Substitutions bans unconditionally in added prose | met | case-insensitive sweep of the banned-term list over `guides/veneer.md`; every hit inspected is a permitted sense (e.g. "justified", "print-color-adjust") |
| report records refused `prove` calls and C9 deviation | met | report body, § "Acceptance criteria" and § "Deviation state" |
| each patch under `j-collapse-patches-2/` names only `types.ts`, `guides/veneer.md`, or `ROADMAP.md` | met | all four `.diff` files read directly |

## Referrals

- Whether the writer's C9 deviation (keeping the two guide-bearing hunks report-only rather than applying them) is the correct judgment call, versus a brief violation, is a design question for the subjective/objective lanes, not mechanical.
- Whether the unreachable-panel-re-insertion case in claim 7 is a defect the rule should cover is explicitly named in the claims file as a judgment call, outside this checker's scope (claim 7 was not assigned to this lane).
- A full row-by-row reconciliation of the report's mutation table against the mutation log (46 rows) was sampled, not exhaustive; the Orchestrator's own replay is the authoritative closure per the brief's own note.

VERDICT: PASS
