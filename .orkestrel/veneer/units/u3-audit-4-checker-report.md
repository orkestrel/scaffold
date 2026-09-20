Confirmed dispatch defect: the checker brief at `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-audit-4-checker-brief.md` names claim numbers and descriptions (1 = "the guide sweep for the `rgb(var(` form"; 9 = "no module-scope `const`"; 7 = "module homes and case presence"; 8 = "the export set of the three pointers"; 10 = "name sweeps"; 12 = "every owned file against the placement rows"; 14's scope-honesty half) that belong to a different file, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-claims-3.md` (round 3), not to the claims file the brief actually points at, `../u3-audit-claims-4.md` (round 4).

Verified against the actual `u3-audit-claims-4.md`:
- Claim 1 there is "The scanner" (`matchesLooseTagPair` cases), not a guide sweep for `rgb(var(`.
- Claim 9 there is "Law over the diff" (`any`, non-null assertion, etc.), not the module-scope-`const` claim.
- Claim 7 there is "The factor table" columns, not "module homes and case presence."
- Claim 8 there is "The cascade reader" (`readBootstrapCascade`), not "the export set of the three pointers."
- Claim 10 there is "Scope honesty," not a name sweep.
- The file has 11 claims total (`../u3-audit-claims-4.md:69` ends at claim 11); there is no claim 12 or claim 14 in it.

The mismatched claim numbers and their descriptions belong to `../u3-audit-claims-3.md` (round 3): claim 1 there is "The alpha form" (`rgb(var(` / `rgba(var(` check), claim 9 is "No data at proof module scope," claim 7 is "The selector scanner," claim 12 is "Rival cleanup," claim 14 is "Law over the diff," matching the brief's descriptions almost exactly.

This is a dispatch defect: the brief points the checker at round 4's claims file but describes round 3's claim content, so the assignment cannot be performed as written. Per the deviation and read-only-role rules, I cannot silently substitute the round-3 file (a different subject tree state, per the claims files' own "Subject" headers: round 3 is the tree "after brief 6," round 4 is the tree "after brief 7") or guess which round's claims the Orchestrator intended checked against the round-4 status/diff evidence supplied (`tmp/audit/u3-status-4.txt`, `u3-diff-4.patch.txt`).

**Verdict: dispatch defect — brief unusable as written.**

Return the brief to the Orchestrator: `u3-audit-4-checker-brief.md`'s Objective section names claim numbers/descriptions from `u3-audit-claims-3.md` while pointing the checker at `u3-audit-claims-4.md`, whose 11 claims (`../u3-audit-claims-4.md:18-69`) do not contain those descriptions and has no claim 12 or claim 14. Re-dispatch with either the claims-4.md numbers that actually match the round-4 subject (1, 3, 4, 8, 9, and the scope-honesty portion of 10, per the actual round-4 file), or with the correct claims file if round 3 was intended.
