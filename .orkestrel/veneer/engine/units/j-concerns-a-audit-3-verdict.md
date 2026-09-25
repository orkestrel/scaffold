# J-CONCERNS-A round 3 — audit verdict (2026-09-25)

**Subject.** Veneer `90e8b60` on `unit/concerns-a` over `bcea965`. The claims are `units/j-concerns-a-audit-claims-3.md`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra, thread `01a0d6e1-1f35-7471-adb9-c8dbff3fbe8c` (`units/j-concerns-a-audit-3-objective-verdict.md`): `VERDICT: PASS`. It also closes its round-1 findings on claims 3 and 7.
- **Subjective:** not run. The round changes no public shape. The `ScrollSpyOptions.smooth` TSDoc sentence describes a behaviour, and its type is unchanged.
- **Checker:** not run. The objective lane ruled the mechanical claims 5 and 6, as its brief assigned.

**Rulings.** Claims 1 to 6 are CONFIRMED on the lane's evidence and on the Orchestrator's replay (`units/j-concerns-a-mutations-orchestrator-3.log.txt`):
- the reduced-motion case reads red on `bcea965`'s source;
- the control is green;
- all eleven mutations are killed by an assertion, and every source is restored.

The lane notes that no dedicated case covers the reduced-motion branch for the viewport. Both branches read the one `behavior` constant (`ScrollSpy.ts`, `#scrollTo`), so the host case binds the shared read. This is recorded as an observation, not a gap.

**The unit closes.** ScrollSpy's cancellation, focus, and motion cells, and Button's focus and motion cells, each carry a case read red under a named mutation. It lands through `tools/w2-land-run.sh concerns-a`, which runs the kickoff gate list.

VERDICT: PASS
