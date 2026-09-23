# J-BINDER audit round 1 — the Orchestrator's reconciled verdict (2026-09-23)

Subject: the J-BINDER unit's uncommitted change in the worktree `veneer-binder` (`unit/binder` from `1868007`), claims file `j-binder-audit-claims.md`. Lanes that ran, blind, on that one file: the objective lane, `analyst` on GPT-6 Astra (thread `01a0cf79-b624-7613-b49f-c319f2962d8e`, 51 commands, 310 s; `j-binder-audit-objective-verdict.md`, terminal line `FAIL 3, 10`); the subjective lane, `reviewer` on Opus 5.5 (`j-binder-audit-subjective-verdict.md`, terminal line `FAIL 3, 10; outside the claims: F1, F2`); the checker on Sonnet (`j-binder-audit-checker-verdict.md`, `FAIL 10`). No lane the round named is not run. The Orchestrator's own settling runs, taken after every lane returned so no lane read a mutated tree: `j-binder-seed-red.log.txt` (the rewritten Delegate proof against the seed implementation at `1868007` in a throwaway checkout: `4 failed | 12 passed (16)`, the same four cases and messages the unit reported) and `j-binder-mutations-orchestrator.log.txt` (the "observer removed" source mutation: `3 failed | 13 passed (16)`, the three release cases; the proof's awaited microtasks removed: `3 failed | 13 passed (16)`, the same three).

## Per-claim rulings

1. **CONFIRMED.** All three lanes from the source and the assertions.
2. **CONFIRMED.** The objective lane constructed the consumer-edit interleaving (an added token survives restore; recorded state is restored as the contract says); the subjective lane found no overwrite, lost priority, or surviving record.
3. **BROKEN**, on one guarantee, with the measurements settled. The objective lane's `UNRESOLVED` items are closed by the Orchestrator's runs above (the awaits are necessary and sufficient; the observer mutation reddens the three release cases). The subjective lane's finding stands: the observer's delivery is a microtask, so a host removed and reinserted after an awaited microtask in the same task is already released and restored; the guarantee is "removed and reinserted in the same synchronous run, before the observer delivers", and the guide sentence, the case title, and R5's wording overstate it. The code stays; the sentences change and a boundary case (remove, await one microtask, reinsert, assert released and restored) joins the proof. The objective lane also settled that the delegate's `preventDefault` on every routed click is Bootstrap's own behaviour (`button.js:57-63`), so it is not a departure.
4. **CONFIRMED.** All three lanes.
5. **CONFIRMED.** Both lanes; the Orchestrator's 101 of 101 run.
6. **CONFIRMED.** Both lanes, line by line against `getSelector` and `parseSelector`; the objective lane names the departure that `generateId` checks no document uniqueness, which the claim states.
7. **CONFIRMED.** Both lanes: attribute-over-config is R11's and Bootstrap's `_mergeConfigObj` order; `resolveOptions` in `helpers.ts` is the right kind and name (`resolve*` picks the effective value; a `parse*` never throws). The J-ENGINE-SHAPE amendment removes the `data-bs-config` layer, so the objective lane's referrals on config error context and the Tooltip exemption are moot; the "weak proofs" referral (an array config value; a constructor `false` or `0` surviving) is carried.
8. **CONFIRMED.** All three lanes.
9. **CONFIRMED.** All three lanes, with E10's deviation named in the claim.
10. **BROKEN** on one clause, the rest settled. The red-first reading is now the Orchestrator's (`j-binder-seed-red.log.txt`), which closes the checker's and both lanes' `UNRESOLVED`. The subjective lane's finding stands: the report's mutation table has no row for the cases it lists (two in `Snapshot.test.ts`, two in `Registry.test.ts`, three in `helpers.test.ts`, the frozen-table assertion in `Button.test.ts`), so "every new assertion names a mutation it distinguishes" is false for those; round 2 names and runs one mutation per unlisted case.

## Findings outside the claims

- **F1 (subjective lane): the parameter seam is not built.** The helpers and classes import the name constants directly, and the report's table says "(no parameter yet)". Ruling: the J-ENGINE-SHAPE amendment supersedes the in-flight instruction with the per-entity groups and default tables (R19), and round 2 threads the resolved tables through `readTargets`, `resolveOptions`, `Button`, and `Delegate` as the amendment's carrier list states. Not a defect of the unit against its brief; a carried obligation.
- **F2 (subjective lane): capabilities with no consumer.** `settleAnimations`, `reflow`, `readTarget`, `readTargets`, `generateId`, `resolveOptions`, and the attribute constants have no consumer in `src` or `app`, against the minimal-API law and exit criterion 2. Ruling: the verdict's units table put the mechanisms in W1a so every component builds on one proven engine, and that stands, but the push that lands them carries their first consumer: J-BINDER round 2 lands on `main` unpushed, J-COLLAPSE is dispatched from that commit, and the two are pushed together after J-COLLAPSE's chain reads green. `generateId` has no consumer before Tooltip, so round 2 removes it and J-TOOLTIP adds it with its first `id` write (R15 stands).

## Referrals ruled

- **Dead engines in `#owned`** (subjective lane, to the objective lane, which ran blind to it): real. A consumer destroying a delegate-acquired engine directly leaves it in `#owned`, so the next click acquires a second engine and the set grows. Round 2 drops, at each activation and each delivery, every owned engine the class's registry no longer holds, and proves it.
- **Click marking key:** the mark is per click and host; with a second route on one host (a trigger that is also a dismiss control), the second route would not run. Round 2 keys the mark on the click, the host, and the route, and proves a host under two routes is driven once per route.
- **Class order** (`static find` before the getters): a round-2 bound under `architecture.md` § Class order.
- **`static find` documentation:** documented in the class's § Surface row summary and in `## Engine` › `### Ownership and restoration`, which names it for every class; the § Methods tables stay per interface. A round-2 bound.
- **J-COLLAPSE brief drift:** the draft is re-derived before dispatch, under the amendment (no `parsers.ts` unless a coercion needs it, `.vn.` names, no `toggle` option, the vocabulary groups, the prior-art pointers).

## Bounds carried into round 2

The guide's `## Engine` intro (wire names are `.vn.` and the vocabulary is replaceable once round 2 lands it; the `dispose` departure named where the member is), the § Surface intro's stale color-mode sentence, the `emitEvent` example's `.bs.` name, the `Delegate` remarks naming `find`, and the same-task sentence of claim 3.

## Carrier

Every `BROKEN` claim, F1, F2, and every referral and bound above is carried by J-BINDER round 2 (`units/j-binder-brief-2.md`, `opus`, the same worktree after J-TYPES round 5 lands and the worktree's base is fast-forwarded by cherry-picking the unit's commit onto the new `main`), together with the amendment's carrier list for the unit (`HostSnapshot`, `isHost` deleted, the default tables and threading, the delegate groups, `emitEvent` without mirroring and with completed events non-cancelable, `resolveOptions` without the config layer, the validators, the `.vn.` retyping of `BUTTON_EVENTS`). Its audit round 2 runs `analyst`, `reviewer`, and `checker` on a new claims file. No finding is dropped.

VERDICT: FAIL 3, 10; outside the claims: F1, F2
