# F8d IMPORTANCE-LONGHANDS, round 2 (the fix round) — audit claims

## Subject

The F8d fix round's uncommitted writes in `/home/user/veneer-f8d` (detached at `cdf7f55`), written
by `opus` from `/home/user/veneer-f8d/tmp/units/f8d-brief-2.md` (the successor carrying the six
findings of `f8d-audit-verdict.md`: one declaration for the rule shape, the prose counts and
position, the shared fixture, the normal-declaration control, the vacuous assertion, the settling
runs) over the round-1 writes ruled in `/home/user/scaffold/.orkestrel/veneer/units/f8d-audit-verdict.md`.
Rounds so far: round 1 (analyst FAIL 3, 4, 5, 6 with O1; reviewer FAIL 3, 4, 5, 6, 7; checker
FAIL 6), this fix round. **Review evidence.**
`/home/user/scaffold/.orkestrel/veneer/units/f8d-2.diff` (the whole diff against `cdf7f55`),
`f8d-2-status.txt`, the round-1 diff `f8d.diff` (for the delta), the reports `f8d-report.md` and
`f8d-report-2.md` (the mutation record: the `rule.properties` mutant undetected without the control
rule and red with it; the settling runs for the `expand` proof and the consumer proof's red and
green). The mutation readings are the writer's.

## What the round decides

Whether F8d lands on the session branch after the running chain, and whether the writer's
decisions stand: `SHARED_LONGHANDS` as a frozen record (a frozen `Map` stays mutable, so the record
is what `isFrozen` can hold) placed after `LEDGER_SHIPPED`, with the freeze assertion added to the
"reports a name…" case; the retitled control case ("keeps a name out whose importance covers only
some of its longhands or another longhand, or that declares its longhands normally"); the equality
sentence "the derived names that the rule stated with the exclusion line keeps on the line" and the
branch sentence "the shared names that rule lets leave the line" as the references to the owning
paragraph; the `expand` remark rewrapped.

## Already established — do not re-run

The round-1 rulings; `collectImportantNames` and `collectRuleLonghands` confirmed per longhand (round
1, claims 1 and 2); the analyst's `npm run check` exited 0 on round 1 and the writer reports 0 on
round 2; the sandbox for the objective lane is read-only with no browser and runs no Vitest project
(`npm run check`, `node -e`, and the Node readers are allowed); the Orchestrator's landing chain
settles the gates.

## Unknowns

- Whether the delta between `f8d.diff` and `f8d-2.diff` introduced a defect outside the carried
  findings: read the delta for claims 1 to 6 and the whole diff for claim 7.

## The threshold

`CONFIRMED` requires naming the attack that failed; a claim about a proof is ruled on the mutation
named and whether the assertions distinguish it. Rule every claim CONFIRMED, BROKEN, UNRESOLVED, or
NOT-EVIDENCED with `file:line`.

## Numbered falsifiable claims

1. **One declaration.** `LonghandRule` in `tests/setupServer.ts` is the only declaration of the
   expanded rule's shape, its members carry the ordering facts, `tests/setupService.ts` imports the
   type and returns `Promise<readonly LonghandRule[]>` from `expand`, `preflight.test.ts` imports it
   from `../../setupServer.js`, and no `StageRule` remains in the tree (`grep -rn StageRule` over
   `tests/`, `guides/`, `src/` returns nothing). Rule whether the import direction (`setupService`
   → `setupServer`) stays the only one.
2. **The fixture.** `SHARED_LONGHANDS` is a frozen record of frozen arrays after `LEDGER_SHIPPED`
   with TSDoc, inventoried in `tests/setupServer.test.ts`'s export-name row, frozen by assertion,
   and both `collectImportantNames` cases read `new Map(Object.entries(SHARED_LONGHANDS))`. Rule the
   writer's record-over-Map decision.
3. **The control rule distinguishes the mutant.** The "keeps a name out…" case carries `{ selector:
   '.table', properties: ['border-top-width'], important: [] }`, and the `rule.properties` mutant
   (in place of `rule.important` in `collectImportantNames`) reddens it (`expected [ 'table' ] to
   deeply equal []`) where the round-1 case stayed green; rule from the assertion.
4. **The vacuous assertion is gone** and the branch case's remaining assertions (`longhands.get('col-1')`
   and the `branch` membership) carry the claim the removed line restated.
5. **The prose.** In § Tailwind the rule is stated once in its owning paragraph and the equality and
   branch sentences refer to it; "two sheets", "both longhands", the ordinal plant, and the bare
   `col-1` token are gone; the consumer proof's two comments name the longhands; every changed
   sentence follows `writing.md` (a noun after each code token, no banned term, no count of a
   growable set, prose at or under 100 columns).
6. **The settling runs bind.** The `expand` proof's pinned order and importance held in the writer's
   run; the consumer proof reddened under the per-name plant on the partial-importance case and
   passed after the exact reverse edit (the writer's record). Name the settling commands.
7. **Law and scope.** Across the whole diff: no `any`, `as` (other than `as const`), `!`, or
   suppression; no nested function beyond a callback; readonly members; the status is the seven
   owned files and nothing else; `tmp/probe/` is absent. Run `npm run check` and report its exit
   code as evidence here (the objective lane).
