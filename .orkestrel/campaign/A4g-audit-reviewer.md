<!-- A4g — reviewer (Opus 5, native), subjective lane over A4g-u4j-only.patch.txt and the tree. Retained from the completion notification, 2026-09-15 (517 s, 21 tool uses). -->

Subjective lane (`reviewer`, Opus 5, native). My own engine wrote this chain, so I attacked the writer's rulings first and read the shipped tree rather than the report's account of it.

## Numbered verdicts

**1. Coalescing respects publication order — CONFIRMED.** The mechanism is one field with one invariant, and the invariant holds. `#pendingManager` (`src/browser/ModelContext.ts:120-124`) means "a synchronisation is queued for this manager with nothing queued behind it"; only `publish` can queue behind a synchronisation (`#changed` returns early for a second event on the followed manager at `:252`, and for any other manager at `:245`), so clearing the mark in `publish` (`:168`) is exactly what maintains it. I walked the grid and found no cell that drops or double-applies. The one imprecision is in the safe direction and is stated where it happens: `#sync` clears a mark a later change left (`:266`), costing one redundant synchronisation and never one too few. The pins are in the tree and the Orchestrator's own full suite is green (`1476 passed | 2 skipped`); V1a–V1c were reproduced BROKEN pre-fix by the Orchestrator's own probe (`P14-a4f-probe.md`).

**2. Prune-last is one rule — CONFIRMED; my ruling on the pin follows.** Both callers now reconcile then prune (`ModelContext.ts:274-276`, `:285-287`), and one comment carries one order (`:364-374`). The carrier-4 pin's expectation is internally coherent with the code. **My ruling: no pin this round.** The failure path needs a registry that refuses `registerTool`, and `ModelContextFixtureInterface` (`tests/fixtures/modelContext.ts:61-84`) exposes suspension and nothing that rejects, so pinning it is a fixture change outside this unit's scope. The comment suffices for the decision but not as written — see F9. Whether prune-in-`finally` is the better settlement is a referral (R7).

**3. The unprojectable-replacement release is right and stated — CONFIRMED.** The release follows from the shape: `collectWebMCPProjections` omits the tool (`src/browser/helpers.ts:252-261`), so its name is absent from `kept` and the prune releases it. Stated in the class remarks (`ModelContext.ts:48-51`), the `publish` TSDoc (`src/browser/types.ts:499-502`), and the guide's skip paragraph (`guides/mcp.md:4096-4098`), in one vocabulary. The pin asserts the registration is gone, `adopt()` reports nothing, and the manager-side diagnostic agrees. This closes my A4f Required change A. The diagnostic sentence overstates the helper by one step — F10.

**4. The prose is exact — CONFIRMED.** The equal-descriptor remark names its manager (`ModelContext.ts:65`), closing 5B. The helpers-table introduction is one sentence (`guides/mcp.md:3278-3281`), closing F6. The follow paragraph, the class remark, and the `publish` TSDoc carry the publication-order rule in one wording ("cover"). The reconcile paragraph carries the prune order (`guides/mcp.md:4112-4114`). F5's ragged wraps are gone; the one remaining short line (`types.ts:504`) is forced by an unbreakable `{@link}` token.

**5. `#pendingManager` and `#prune`'s comment — CONFIRMED.** `.claude/rules/names.md:25-32` fixes one word for public properties, methods, option keys, and events, and a `#` field appears in none of those rows, while § General vocabulary fixes the participle `pending` as the boolean shape. F7 closed. `#prune`'s comment leads with the operation its identifier names (`:364`). F8 closed.

**6. Nothing else moved — CONFIRMED for the delta.** Four files; no new export or helper; the pins reuse `traceRegistrations`, `suspend`, and `holding`.

**7. The mutation controls are reproduced — UNRESOLVED.** Outside my lane; the record is the Orchestrator's own (`P14-a4f-probe.md`), not the writer's.

**8. The chain is whole — UNRESOLVED.** The chain walk is the mechanical lane's. My own lane's carriers all closed in the tree: 5A, 5B, F5, F6, F7, F8, R4, R5. R6 is not closed — see R9.

**9. Ship it as mcp 0.0.31 — CONFIRMED from my lane.** Nothing I found this round blocks the release. The face now carries one law in one wording. The findings below are precision rather than falsehood; carry them to the successor round; none touches a gate.

## outside:

**F9. `#prune`'s failure-path clause does not name its noun, and its likely reading claims a benefit the order does not provide.** `ModelContext.ts:368-369`: "a batch that fails partway leaves the earlier registrations advertised instead of withdrawing tools nothing replaced" — "the earlier registrations" has two referents; the registrations this batch made are in `kept` and protected on either side of the reconcile. The true referent is the names the batch dropped. Right: "and a batch that fails partway leaves the names it dropped advertised until the next batch, because the prune never runs — the names the batch carries are protected by `kept` on either side of the reconcile."

**F10. The guide and the `publish` TSDoc claim `describeWebMCPTool` names the uncarriable tool; it reports the same `undefined` it reports for a name the manager never held.** `guides/mcp.md:4099-4101` and `types.ts:503-506`. The helper's own doc block says `undefined` covers both answers (`helpers.ts:165-167`). Right, in both places: "and `describeWebMCPTool` answers `undefined` for a name `definitions()` still lists, which is that mismatch read from the manager's own side."

**F11. The `publish` TSDoc says "aborts" where the guide and the class remarks say "releases", for one operation.** `types.ts:514` and `:516` against `guides/mcp.md:4111-4112` and `ModelContext.ts:67-68`. Right: write "releases" in `types.ts:514` and `:516`; keep "abort" for `destroy`'s own remark where the `AbortController` is the subject.

**F12. `destroy` clears every other piece of retained state and leaves `#pendingManager` set.** `ModelContext.ts:185-193`. Inert rather than a defect; rule it either way in the successor round.

**Referrals.**

- **R7. Objective lane:** the carrier-4 ruling weighs prune-first against prune-last and does not consider pruning in a `finally` after the reconcile loop, which appears to give the ordering benefit and still run the prune when a reconcile throws, because `kept` protects every name the batch carries whether or not its reconcile ran.
- **R8. Objective lane / `checker`:** `describeWebMCPTool` takes a manager and a name and returns `WebMCPDescriptor | undefined`, while `.claude/rules/names.md` § Standalone helpers fixes `describe*` as "takes a finding and returns the human-readable message that names it". The prefix predates this chain; route a rename through a design round rather than a fix round.
- **R9. Orchestrator (R6, still open):** no `A4b`–`A4e` reviewer verdict exists and no `<unit>-audit-verdict.md` exists for any round in the chain; the record owes the substitution and its reason before this chain is accepted.

VERDICT: PASS

<!-- Orchestrator: R9 is closed by `U4-chain-audit-verdict.md` (the round-level record with each round's lanes and reason). R7 is adopted as the U4k ruling (prune in `finally`, protected by `kept`, pinned by the failure path). R8 is carried forward to a design round after the chain lands (a public export rename). F9–F12 go to U4k. -->
