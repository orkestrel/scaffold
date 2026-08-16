# SUBJECTIVE lane verdict — instruction-set audit (Opus 5, planner role, clean context)

Returned verbatim from the blind subjective lane; reconciliation is the Orchestrator's,
in `ledger.md` Step 6.

1. The audit half of the adversarial pass never ran as written: every nontrivial unit got
   one lane, and `checker` was dispatched zero times. Evidence: orchestration step 5
   mandate vs per-unit verdicts ("Opus wrote, Sol audited, no fix round",
   a7-audit-verdict.md:19, a8-audit-verdict.md:17; A9 two Sol rounds; A6 Sol-only on the
   build, Opus on the fix; A10 Opus-only); grep of the record for `checker` returns
   nothing. Fix (recommended option): make the second lane triggered (FAIL, rendered
   surface, mixed claims), give `checker` a mechanical-criteria trigger, record when not
   dispatched. Class: orchestration-contract refinement.
2. The verdict shape has four homes and is optional in every charter that could bind it;
   the campaign used AUDIT:/REVIEW:/REVERIFY:/GATES: and CONFIRMED/REFUTED instead of the
   falsify skill's VERDICT: line and CONFIRMED/BROKEN/UNRESOLVED/NOT-EVIDENCED; the skill
   is never named in the record. Fix: default the falsify shape unconditionally in
   analyst.md, reviewer.md, analyst.toml, reviewer.toml; delete the rival shape in
   reviewer.md:69-77. Class: skill + charter refinement.
3. The Codex side has three Opus bridges restating one transport contract and no file
   that owns it; they drifted on journalling (opus.toml journals, planner.toml and
   reviewer.toml do not — so a Codex-primary planner dispatch cannot prove Opus was
   reached). Fix: create .codex/agents/claude.toml as the transport contract; slim the
   three bridges to route + binding reference. Class: role create + root-reference trim.
4. codex.md's sandbox warning enumerates only remote endpoints, licensing the localhost
   inference the A10 brief drew (a10-brief.md:85 vs a10-report.md:7-9). Fix: two
   sentences naming loopback unreachability, EPERM binds, no IPv6. Class: charter
   refinement.
5. When the Orchestrator writes part of a unit there is no lane for it: A10's network
   half was written by the Orchestrator and audited by the Orchestrator's own engine
   (a10-report.md:12-27, a10-review-brief.md:10 "writers were Sol and the Orchestrator").
   Fix: name the native implementer/builder in the network-work sentence; add the
   acceptance law that Orchestrator-written parts are briefed, owned, and audited by the
   engine it does not share. Class: orchestration-contract refinement.
6. Retention for a non-bench unit has no owner: Dispatch anatomy defers to Bench laws
   rule 4, which disclaims generality; A1-A5 (native units) have no brief or report in
   the record; A11 has no brief and its film script is not in the record. Fix: move the
   retention rule to Dispatch anatomy, uniform for every unit; Bench laws keep journals
   only. Class: orchestration-contract refinement.
7. Three process rules the campaign declared binding (ps --ppid tree walk + mtime check;
   login at-the-keyboard signal; spinner-then-Username = expired) were written into
   a-plan.md and never reached canon; the pruned plan was their only home. Fix: land the
   three rules in their owning sections plus one meta-law — a mid-campaign binding rule
   lands in the owning file in the same commit that states it. Class: rule additions +
   contract refinement.
8. planner/reviewer lane-swap grants leave return shapes addressing Sol as a live third
   party (planner.md:27 "Tensions: subjective choices that Sol should challenge";
   reviewer.md referrals "for Sol, with no verdict from you") — in the substitution case
   findings park with a dark bench. Fix: lane-conditional wording (other lane when
   running, Orchestrator when holding both). Class: charter refinement.
9. The Grok model id is pinned in two files with two values (grok.md 4.6-high, grok.toml
   4.5-high) and the record shows the older one ran (a0-absorb-brief.md). Fix: grok.md
   owns the pin; grok.toml references it. Class: charter refinement.
10. The Sol bridge drivers' return contract spans two turns the dispatch mechanism does
    not provide ("once the Orchestrator reports the exec complete" is unreachable in one
    dispatch); the record shows the Orchestrator assembling every verdict itself, and the
    driver launching anyway once (10-minute cap kill). Fix: cut the second half; driver
    returns brief path, resolved command, journal path, and nothing else. Class: charter
    refinement.
11. instruction-audit.md arms the objective lane with five instruments and the subjective
    lane with one clause, and fixes no return shape for its own round (the brief invented
    INSTRAUDIT). Fix: add subjective lenses; fix the terminal line in the reference.
    Class: skill refinement.
12. Brief-check eleven is written for renames/deletions, so it did not fire for A6's
    state narrowing (ContentPane.test.ts in neither list; criterion unreachable). Fix:
    widen the trigger to states/fixture shapes made unreachable; add the unscoped-file
    clause to the off-limits check. Class: orchestration-contract refinement.

Vindicated (kept): two-lane design with named reconciliation rulings; probe-before-brief
(a8-probe striking a planned unit); conditional rulings inside a brief (A6); cross-engine
fix rounds with mutation probes.

INSTRAUDIT SUBJECTIVE: 12 findings
