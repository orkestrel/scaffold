# J-SAMEWAY-ENGINES-A rounds 2 and 3 — audit verdict (2026-09-25)

**Subject.** Veneer `dc2a1a7` on `unit/engines-a` over the merge `2760f7e`. The claims are `units/j-sameway-engines-a-audit-claims-3.md`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra, thread `01a0d6b4-ffff-7582-ade7-cad012a3266e` (`units/j-sameway-engines-a-audit-3-objective-verdict.md`): `VERDICT: FAIL 1, 7`.
- **Subjective:** not run. Round 3 added the four leaves and `HostChange` to the public surface, and round 4 changes `HostChange` again. The `reviewer` lane on Opus 5.5 therefore audits the final shape once, in round 4's audit, where the shape is settled.
- **Checker:** not run. The analyst brief assigned the mechanical claims 3, 5, and 8 to the objective lane, and it ruled each on `file:line` evidence.

**Rulings.**
- **Claim 1: FAIL, upheld.** The Orchestrator read `dc2a1a7:src/browser/Collapse.ts`. Show's final `host.style.removeProperty(dimension)`, hide's `host.style.removeProperty(dimension)`, and hide's completing `host.classList.add(this.#classes.host)` each have no `recordHostChange` call before them. A target whose earlier writes changed nothing therefore reaches the rewind unrecorded. The lane's witnesses follow from that source, and round 4 puts each under a red-first case.
- **Claim 7: FAIL, upheld.** § Collapse promises that the return restores the inline size and the `host` token, and claim 1's witnesses contradict it.
- **Claims 2, 3, 4, 5, 6, and 8: CONFIRMED,** on the lane's evidence. For claim 6, the lane confirms the logged distinctions and says they do not cover the Collapse gaps. Round 4's instrument adds a row per fix.
- **Finding outside the claims: upheld.** A property's return drops its priority: `HostChange` holds no priority, and the rewind writes the value back unprioritized. `HostSnapshotRecord.priority` already names the concept, so round 4 adds `HostChange.priority` with that term and meaning.

**Carried.** F1 and F2 go to `units/j-sameway-engines-a-brief-4.md`, which is their one carrier.

VERDICT: FAIL 1, 7 — round 4 (`units/j-sameway-engines-a-brief-4.md`)
