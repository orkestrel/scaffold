# J-HOLDERS round 2 — audit claims (2026-09-25)

**Subject.** Veneer commits on `unit/holders` over the merge `806717d`, which carries round 1's `ef320ca` over Veneer `main` `8bc940d`:
- `88f15c7`, the round;
- `ada50f4`, the Orchestrator's integration of the unit's report-only `Tab.test.ts` patch.

A read-only snapshot of `src`, `tests`, and `guides` at `ada50f4` sits in `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/snapshot-holders2-ada50f4/`. Beside it are the round's diff `j-holders-2.diff`, its status `j-holders-2-status.txt`, the writer's report `j-holders-report-2.md`, and the Orchestrator's logs `j-holders-red-2-orchestrator.log.txt` and `j-holders-mutations-2-orchestrator.log.txt`. A shell reads `git -C C:/Users/mikes/WebstormProjects/veneer show ada50f4:<path>`. Never read the worktree.

**What this round answers.**
- The round-1 verdict `units/j-holders-audit-verdict.md`.
- The brief `units/j-holders-brief-2.md` (P1, P2, and P3).
- `decisions.md` § E25's amendment of 2026-09-25, which reverses "Presence stays as tested": presence follows the record rule.

## Claims

1. **P1: only the last holder removes an emptied attribute.** A `HostSnapshot` restoration removes an emptied `class` or `style` attribute only when it leaves that presence record as its last holder. A snapshot that a save rejoined during its restoration removes one only when no other snapshot holds the record. No holder that is not the last writes presence on any path.
2. **P1 leaves final markup unchanged.**
   - Every engine's final markup after every holder's teardown is what `806717d` left, because the last holder still removes the emptied attribute.
   - The only intermediate readings that change are the three cases the report names: the nested restoration's intermediate reading and the button-and-collapse trigger case in `HostSnapshot.test.ts`, and the `Tab.test.ts` case the integration patch changes.
   - Every other engine case passes. That is the Orchestrator's whole-suite gate.
3. **P2: Isolation restores after every hand-off.** Destruction's restoration comes after every hand-off, so a synchronous reaction to a hand-off cannot undo a restored value. The case fails under a mutation that restores inside each release.
4. **The proofs bind.**
   - The round's P1 cases read red on `806717d`'s `HostSnapshot.ts`, each through an assertion.
   - Every killed mutation row fails through an assertion, `BOOM` is refused, and the control holds.
   - A passed case reads held only with no suite-level error.
   - For each proof claim you confirm, name the mutation that makes the proof fail, and say whether its assertions distinguish that mutation from the passing case.
5. **Scope and greenfield.**
   - The round changes the seven paths the report names, and the integration patch changes `Tab.test.ts` alone.
   - The `types.ts` edit to `HostSnapshotInterface.restore`'s remarks states the rule P1 changes, which the report records as outside round 1's grant.
   - No helper, field, or compatibility path is left without a use.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `ada50f4`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
