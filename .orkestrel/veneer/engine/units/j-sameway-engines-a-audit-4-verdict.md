# J-SAMEWAY-ENGINES-A round 4 — audit verdict (2026-09-25)

**Subject.** Veneer `3f62d64` on `unit/engines-a` over `dc2a1a7`. The claims are `units/j-sameway-engines-a-audit-claims-4.md`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra, thread `01a0d6d9-c010-7e71-9e1c-711b1756976c` (`units/j-sameway-engines-a-audit-4-objective-verdict.md`): `VERDICT: PASS`.
- **Subjective:** `reviewer` on Opus 5.5, auditing the settled shape of rounds 2 to 4 (`units/j-sameway-engines-a-audit-4-reviewer-verdict.md`): `VERDICT: FAIL 8 10`.
- **Checker job:** Grok, session `dfe6113e-08df-456c-95fe-213e2983d31d`, on claims 4 and 7 (`units/j-sameway-engines-a-audit-4-checker-verdict.md`): `VERDICT: PASS`.

The objective lane holds the engine that did not write the round.

**Rulings.**
- **Claims 1 to 7: CONFIRMED.** The objective lane walked every Collapse exit again, and traced the round-3 witnesses and the priority witness through `3f62d64`. The replay confirms both: the four cases read red on `dc2a1a7`, and 63 mutation rows are killed with none missed.
- **Claim 8: FAIL, upheld on two defects.**
  - **Defect A.** `HostChange.prior` names the value `HostSnapshotRecord` calls `value`, beside a `priority` field with no `prior` qualifier. Rename the field to `value`.
  - **Defect B.** "Change" names two things: the call, which is the engines' `change` parameter and the guide's term, and the record. Rename the type `HostWrite`, and the leaves `recordHostWrite` and `rewindHostWrites`, taking a `writes` parameter. The engines already name the array `written`. The rename lands now, before J-SAMEWAY-ENGINES-B adopts the leaves.
  - The lane's rulings on the optional `priority` parameter and the leaf names' form are confirmed. They stand.
- **Claim 10: FAIL, upheld.** **Defect C:** the `recordHostChange` summary omits its core condition, that a target is recorded only at the call's first write that changes it. State the condition in the summary and the § Surface row. The optional `writeHostValue` wording ("any string adds the token") is adopted too.
- **The prose verb, outside the claims: upheld.** The returning step "restores" in the class remarks and the guide, while `HostSnapshot`'s restoration is a different mechanism. The step writes each target back, and "restore" stays `HostSnapshot`'s term. E24's wording is amended to match.
- **The referral: upheld as a test-sufficiency defect.** No case pins `readHostPriority`'s category branch, because the case reads an attribute and a token whose names are not CSS properties. Add the lane's witness: an element with inline `width: 10px !important` and a `width` attribute, whose attribute reads priority `''`. Add a mutation row that drops the branch.
- **The claim-9 wrapper rulings: CONFIRMED.**

**Carried.** Defects A, B, and C, the prose verb, and the referral go to `units/j-sameway-engines-a-brief-5.md`, their one carrier. J-SAMEWAY-ENGINES-B's round-3 brief is updated before its dispatch to name the renamed leaves.

VERDICT: FAIL 8, 10 — round 5 (`units/j-sameway-engines-a-brief-5.md`)
