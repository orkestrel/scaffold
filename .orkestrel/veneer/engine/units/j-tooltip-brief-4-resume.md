# Unit J-TOOLTIP round 4, resumed — finish the E18 round from the tree the stopped writer left

Successor to `j-tooltip-brief-4.md`, which stays the brief of record for this round. What changed and why: the round-4 writer (agent a48b1f17b0f574e7a) was stopped by the user mid-way through the proof cases and cannot be resumed, so a fresh writer takes the worktree as it stands and finishes the round to the report. Nothing in the obligations changed; this note tells you where the tree is.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash), the sole writer in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip` (branch `unit/tooltip`, base `e8251cf`; rounds 1 to 3 and the partial round 4 are uncommitted). Perform the assignment directly and spawn nothing.

## Read first, in this order

1. `j-tooltip-brief-4.md` whole: the obligations T1 to T9, the scope, the scoped-tests rule, the acceptance criteria.
2. `j-tooltip-doors-verdict.md` (E18, the ruling) and, for the door table and the proof shape, `j-tooltip-doors-subjective-verdict.md` parts 3 to 6 and `j-tooltip-doors-objective-verdict.md` parts 4 and 6.
3. `j-tooltip-audit-3-verdict.md` (the carries: claims 6 and 7, the bounds on 2 and 4, O1) and `j-tooltip-report-3.md` (round 3's shape and instrument, `j-tooltip-mutations-3.py` beside it).
4. The tree itself, per the next section.

## Where the tree stands (measured 2026-09-24 11:25, `git diff --stat e8251cf`: 17 files, 4318 insertions)

- **T1 done in source:** `src/browser/Tooltip.ts` carries `#apply(change, shown, write)` (17 call sites), `#holds(change, shown)` (around line 462), `#discard(): boolean` (around line 624); `#holding` and `#holds(change, tip)` are gone. Read the class whole against the door table before you trust it: confirm every platform write, dispatch, element move, and sanitizer call inside `show`, `#conceal`, `#build`, and `#occupy` sits inside an `#apply` callback or is a construction followed by `#holds`, that the build resolves every content value before its first write (T2), that `show` publishes then appends, links, dispatches `inserted` as steps (T3), that `#conceal` stops on a false `#discard` and reads the full door before release and dispatch (T4), and that `fill` refuses while a change is in flight before releasing (T5). Repair what is missing.
- **T6 partly done:** `types.ts` carries the `shown`/`hidden` release sentence (around lines 1508 and 1512) and the `hide` beforetoggle sentence (around line 1661). Check `TooltipInterface.show` and `hide` `@remarks`, `TooltipEventMap.inserted`, and `TooltipEventMap.hide` (the O1 exception) against `j-tooltip-doors-verdict.md` § The ruling → Interface, verbatim. The guide: `tmp/j-tooltip/round4_guide.py` and `round4_guide_swaps.txt` are the stopped writer's guide edit scripts — check whether the `#### Tooltip` door paragraph in `guides/veneer.md` already reads the subjective lane's part 5 with the added release sentence, and whether the event table's `hide` row carries O1; apply what is missing.
- **T7 mostly done:** `tests/src/browser/Tooltip.test.ts` carries, from around line 1625: the final-release destruction case (P1), the teardown relocation (P2), the promotion relocation (P3), the trigger `aria-describedby` reaction (P4), the two `inserted`-listener cases (P5 and the token-marking variant), content-before-writes (P6), destroy leaves a moved tip (P7), the fill-during-build refusal, the throwing content function and sanitizer, the `hidden`-listener re-entry, and the upgraded custom tip's token write. `tmp/j-tooltip/round4-red.log.txt` and `round4-tipcase-red.log.txt` hold red readings the stopped writer took; read them and record which cases have a red reading and which still need one (a red reading needs the round-3 source: `git stash` is barred, so copy the current `Tooltip.ts` aside, check out nothing, and instead reconstruct the round-3 file from `tmp/j-tooltip/` copies if the stopped writer kept one — search `tmp/j-tooltip/` for a `Tooltip` copy; if none exists, take the red reading by applying the instrument's mutation for that case, which is the same evidence). The claim-7 vocabulary fixture: `tmp/j-tooltip/round4_fixture.py` exists (10:46); check the case "writes, tests, reads, and matches only the replacing values when every group is replaced" (around line 1533) for the `x-modal`-only ancestor, the default-`modal` decoy, and the "conflicting values" wording.
- **T8 in progress:** `tmp/j-tooltip/round4_rows.py` (11:05) holds rows the stopped writer drafted; `mutations-4.py` does not exist yet. Build `tmp/j-tooltip/mutations-4.py` from `j-tooltip-mutations-3.py`'s shape plus those rows, per T8's list (every live round-3 row, the P1 to P7 rows, the two central-predicate rows, the completion-release row, the claim-2 timing control, the claim-4 `#failed.add` row, the corrected claim-6 `href` row in `NativeSanitizer.test.ts`, the claim-7 fixture). Run it once whole at the end; every row records its first failure line; the log ends with the digest receipt.
- **T9 not started.**

## Obligations

T1 to T9 of `j-tooltip-brief-4.md`, unchanged. Work from the state above: verify each done item against the brief before moving on, finish the open ones, run the scoped checks per file while you work, the whole browser suite once, and `acceptance-4.sh` once; then the T9 report as your final message, including which red readings are the stopped writer's (name the log) and which are yours.

## Scope, tools, execution, output, deviation contract, acceptance criteria

As `j-tooltip-brief-4.md`. One addition to the deviation contract: where the stopped writer's partial edit contradicts the ruling, the ruling wins and you say so in the report.
