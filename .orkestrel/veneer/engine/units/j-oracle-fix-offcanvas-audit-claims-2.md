# J-ORACLE-FIX-OFFCANVAS round 2 — audit claims (2026-09-25)

**Subject.** Veneer `dcff520` on `unit/oracle-fix-offcanvas` over `eaf3908`. Read the files at `dcff520` with `git -C C:/Users/mikes/WebstormProjects/veneer show dcff520:<path>`, or in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas`, which holds `dcff520` clean.

**Evidence.** Every path here is under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`.
- The brief `j-oracle-fix-offcanvas-brief-2.md` and the report `j-oracle-fix-offcanvas-report-2.md`.
- Round 1's verdict `j-oracle-fix-offcanvas-audit-verdict.md`, and its lane verdicts `-audit-objective-verdict.md` and `-audit-reviewer-verdict.md`.
- `j-oracle-fix-offcanvas-2.diff` and `-2-status.txt`.
- The instruments `-2-mutate-4.sh`, `-2-mutate-5.sh`, `-2-accept-2.sh`, `-2-compare-2.py`, and `-2-probe-2-case.ts.txt`.
- The unit's logs `-2-red-first-2.log.txt`, `-2-mutate-4.log.txt`, `-2-mutate-5.log.txt`, `-2-accept-2.log.txt`, `-2-compare-2.log.txt`, and `-2-probe-2.log.txt`.
- The Orchestrator's replay: `j-oracle-fix-offcanvas-replay-2.log.txt` (the instrument is `../tools/replay-oracle-fix-offcanvas-2.sh`).

**The law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `.claude/rules/tests.md`, `browser.md`, and `writing.md`.
- `../decisions.md` § E24 and § E35.

## Claims

1. **Round 1's claim 9 is closed.**
   - `#press` reads the active element from `this.#host.getRootNode()` when that root is a `ShadowRoot`, and from `ownerDocument` otherwise.
   - It detects the isolation's focus return in all four placements of round 1's table: a light-tree panel and trigger; a light-tree panel with a trigger in a separate shadow host; a shadow-tree panel with a light-tree trigger; and a panel and trigger in the same shadow root.
2. **The shadow case binds.**
   - The case "leaves focus on a trigger in the panel's shadow root …" reads red at `eaf3908` by an assertion and green at `dcff520`.
   - The `document` mutation, which reads the document's `activeElement`, reddens it by an assertion.
   - Its cascade loading, the document's `:root` tokens plus the same cascade adopted into the shadow root, is the shipped cascade and not a test-local copy.
3. **Round 1's proofs still bind.** Round 1's mutations, run through `mutate-4.sh` and `mutate-5.sh` on the final file, each redden their row or case by an assertion. So do both bases.
4. **Round 1's claim 7 is closed.**
   - The corrected sentences hold for the code in `guides/veneer.md` § Offcanvas and its Bootstrap-difference bullet, in the `#press` comment, and in the class TSDoc.
   - None of them promises a cancellation the guard rows refute.
   - The subjective lane's three accepted items are in: the guard case's title, the ambiguous `it`, and "The window hears the press".
5. **The census is unchanged.** The `offcanvas` and `modal` census reads 66 departures, every one an `inert` row, with none on focus. Every step matches round 1's reading.
6. **Scope.** The changed paths are `guides/veneer.md`, `src/browser/Offcanvas.ts`, and `tests/src/browser/Offcanvas.test.ts`. No compatibility path remains.
7. **The residual case is stated or bounded.** The unit notes one placement the root reading misses: a move between two elements of a shadow tree nested below the panel's own root. Rule whether the shipped prose over-promises for it, and whether the case is reachable through the documented surface.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `dcff520`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
