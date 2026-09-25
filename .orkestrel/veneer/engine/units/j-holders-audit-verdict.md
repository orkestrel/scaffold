# J-HOLDERS round 1 — reconciled verdict (2026-09-25)

**Subject.** Veneer `ef320ca` on `unit/holders`, over `4cd56a8`. The claims are in `units/j-holders-audit-claims.md`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra (thread `01a0d659-3827-7d01-8e99-72a96f87cfc8`, `units/j-holders-audit-objective-verdict.md`). It confirmed claims 3 to 7 and failed 1 and 2.
- **Subjective:** `reviewer` on Opus 5.5 (`units/j-holders-audit-subjective-verdict.md`). It found H1 to H4 fit, the placement and names included, and asked for five prose changes (findings 3, 5, 8, 9, and 11).

The lanes ran blind to each other.

**The Orchestrator's readings.**
- The scoped gates at `ef320ca`: `tools/w2-gates-scoped-holders-1.log`, with 969 passed.
- The red reading: `units/j-holders-red-orchestrator.log.txt`. The H1 case fails on `4cd56a8`'s sources through an assertion; H5's cases pin behaviour the base already had.
- The mutation replay: `units/j-holders-mutations-orchestrator.log.txt`. Every kill is an assertion, `BOOM` is refused, and the control holds.
- The landing gates with the fast-forward held, on the merge with `8bc940d`: `tools/w2-land-2c-holders.log.txt`, every gate green.

## Reconciliation

- **Claim 1, the empty `class` attribute: a defect, carried to round 2.** Start with a body that has no `class` attribute, show two modals, remove `modal-open`, then hide the first. The subject removes the empty `class` attribute while the second modal still holds the record. The Orchestrator read the cause at `ef320ca`: `HostSnapshot`'s `#leave` returns `!record.present` whether or not other holders remain. So a restoration that is not the last holder removes an emptied `class` or `style` attribute another snapshot still holds, against E25's rule that such a restoration writes nothing for a held target. The defect entered with J-SNAPSHOT-SHARED, and routing Modal through the record exposes it.
- **Claim 1, body replacement: ruled intended.** A body replaced between two shows gets its own record, and the first modal's hide restores the old body. The writer's report stated this difference, and the claim's wording omitted it. The new behaviour gives the new body the token Bootstrap's show writes, where the base wrote nothing to it.
- **Claim 2, the reordered destruction: ruled intended, and pinned.** Destruction now hands every element to the newest claim left, then restores. The lane's witness needs a synchronous custom-element reaction to `inert` that rewrites another element. Under the subject, the restoration comes last, so the page ends restored, which is E13's principle for a restoration and a reaction. The claim's "the same final state" was the Orchestrator's overclaim. Round 2 pins the order with a case.
- **Outside the claims, ScrollLock and body replacement: ruled outside the contract.** A lock taken after the document's body is replaced, while an earlier lock holds, joins the group and does not lock the new body. This predates the unit. Replacing `document.body` while an overlay holds its lock is outside the engine contract, beside E24's amendment of 2026-09-25. J-ROWS carries the guide sentence.
- **The reviewer's referrals.** The objective lane read `recordCalls` as a recorder that calls through to the original method (`tests/setupBrowser.ts`). That is the recorder `AGENTS.md` allows, not a spy that replaces behaviour. The unguarded `#open.restore()` in the hide restores an empty snapshot where no show reached the open step, and the lane's traces through claim 1 found no write the base did not make there.

## Ruling

Round 2 (`units/j-holders-brief-2.md`) fixes the presence removal with a red-first case, pins Isolation's order, and applies the reviewer's five prescriptions verbatim.

VERDICT: FAIL 1 (the presence defect; claim 1's body replacement and claim 2 are ruled intended)
