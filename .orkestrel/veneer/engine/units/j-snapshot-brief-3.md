# Unit J-SNAPSHOT round 3 — the take-back cleanup, two contract sentences, and the fixture names; the round that lands

Successor to `j-snapshot-brief-2.md`. What changed and why: round 2's audit (`j-snapshot-audit-2-verdict.md`) confirmed the fold, the proof repair, and the judging rule under every attack but one: a re-entrant `save` inside the interrupted restoration's own class write takes the presence holding back and leaves `class=""` present and empty (the objective lane's claim 1). Two contract sentences and three fixture names ride along. This round adopts the objective lane's prescription, so it closes with its instrument probe and the Orchestrator's replay instead of a fresh audit round, and then lands.

## Role and engine

`opus` on Opus 5.5, the unit's writer (agent ae8fdf37c94c55f5e), a native Claude subagent, the sole writer in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/snapshot` (branch `unit/snapshot`, rounds 1 and 2 uncommitted). Perform the assignment directly and spawn nothing.

## Objective

An interrupted restoration still removes the empty `class` or `style` attribute its own writes left when a re-entrant save took its presence holding back; the shared-record sentence carries the record's lifetime; the Tab sentence claims nothing about other engines; the fixture names name what each case builds; the scoped gates are green.

## Context

**The verdicts are the authority.** `j-snapshot-audit-2-verdict.md`; `j-snapshot-audit-2-objective-verdict.md` claim 1 (the exact sequence: no `class` attribute; A saves `active`, the element gains it; B saves `collapsed`, gains it, B restores leaving `active`; a one-shot class reaction on the element calls `A.save({ category: 'token', element, name: 'active' })` then `element.classList.toggle('active', false)`; `A.restore()` — the removal of `active` serializes `class=""`, the reaction runs inside that write, `#join` moves A's holding from `#leaving` to `#joined`, the cleanup loop and the `finally` visit `#leaving` only, the attribute stays) and its smallest corrective scope ("evaluate empty-attribute cleanup after the interrupted restoration's writes while retaining the presence holding and target recording acquired by the re-entrant save; do not remove the take-back mechanism or consume that successor recording"); `j-snapshot-audit-2-subjective-verdict.md` 4a, 4b, F1, R2, and the Bounds.

**The sites.** `HostSnapshot.ts`: `#join` (the take-back branch, around line 200), `restore` (the class cleanup loop around line 157, the style loop around line 168, the `finally` around line 186), `#leave` (around line 228). `types.ts` `HostSnapshotInterface.restore` remarks (the shared-record sentence, around line 346). `guides/veneer.md` § Ownership and restoration (around line 822), `#### Tab` (around line 1231).

**Law.** As round 2. Skill: none.

**Host and scoped tests.** As round 2. The `prove` MCP server is not reachable to a native subagent; record that you made no call.

## Obligations

- **S1'' The take-back cleanup.** The restoration judges the removal of every record it held when its writes began, including one a re-entrant save took back: capture the records this call moved into `#leaving` at its start; after the token writes, for each captured `class` record, remove the attribute when the record reads absent and the list is empty, whether the record is still leaving (then `#leave` departs it as now) or was taken back (then read the record's `present` without departing, the holding staying with the snapshot for its next restore); the same for `style` after the property writes. Red first: the objective lane's sequence as a case (a custom element whose class reaction saves `active` on snapshot A and toggles it off once) asserting `hasAttribute('class')` false after `A.restore()` returns and that A's next `restore()` after the reaction's save writes nothing wrong; record the red reading against round 2's source, then green. The existing take-back case and the R1 case stay green. An instrument row "the taken-back record is not judged" (the round-2 cleanup restored) reddens the new case.
- **S2'' The Dropdown path.** Confirm `Dropdown.test.ts` carries a case where `destroy()` runs inside a reaction to `Placement`'s restoration during the dropdown's own destruction (the path the `#### Dropdown` sentence describes); name it in the report. Where none exists, add the variant beside the `HostSnapshot.test.ts` reproduction driving `dropdown.destroy()` instead of `hide()`, with the same recorder assertions.
- **S3'' The sentences.** `types.ts` remarks and § Ownership: the shared-record sentence gains its lifetime — read at the first of those saves while no snapshot holds the record, and forgotten after the last snapshot holding it restores, so a later save reads the element again. `#### Tab`: the clause "and no two engines share the recording of one target" becomes "and no two tabs share the recording of one target", or the sentence ends before it. Fold the wording bounds where you touch the sentence: the class remarks read "whose record reads the attribute absent"; the `#join` comment is repaired; the `written` comment says the mark is set before the write runs.
- **F1 The fixture names.** `vn-probe-snapshot-class-presence-stamp`, `vn-probe-snapshot-style-presence-stamp`, and `vn-probe-snapshot-classed` are renamed for what each case builds (the subjective lane's proposals are acceptable).
- **The instrument.** `tmp/j-snapshot/mutations-3.py`: round 2's rows plus the S1'' row; every row records its first failure line; the log ends with the digest receipt.
- **The report.** As round 2, with the S2'' finding named.

## Scope

**Owned.** As round 2 (`src/browser/HostSnapshot.ts`, the `HostSnapshotInterface` remarks in `types.ts`, the guide paragraphs § Ownership and restoration and `#### Tab`, `tests/src/browser/HostSnapshot.test.ts`, `tests/src/browser/Modal.test.ts`, `tmp/j-snapshot/**`). **Off-limits.** Every other file.

**Tools and limits.** As round 2; chain in `tmp/j-snapshot/acceptance-3.sh`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report as your final message.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: the fixture names, the exact wording within S3'', where the S1'' case sits. Stop and report when the S1'' case cannot be made red against round 2's source or when its repair reddens a consumer suite.

## Acceptance criteria

1. `npm run check:src:browser`, `npm run check`, oxlint, and oxfmt exit 0.
2. `HostSnapshot.test.ts` green with the S1'' case present and its red reading recorded; the S1'' instrument row reddens it.
3. `npm run test:src:browser`, `npm run test:guides`, and `npm run test:policy` exit 0 once at the end.
4. The status lists the owned files only.
