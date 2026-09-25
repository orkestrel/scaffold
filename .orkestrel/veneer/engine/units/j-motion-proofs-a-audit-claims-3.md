# J-MOTION-PROOFS-A round 3 — audit claims (2026-09-25)

**Subject.** Veneer `unit/motion-proofs-a` at `180d513` over `beb7cd8`:
- `5b98071`, round 3;
- `180d513`, the Orchestrator's guide integration.

Read the files at `180d513` with `git -C C:/Users/mikes/WebstormProjects/veneer show 180d513:<path>`.

**Evidence** (all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`):
- `j-motion-proofs-a-3.diff` and `j-motion-proofs-a-3-status.txt`;
- the brief `j-motion-proofs-a-brief-3.md` and the report `j-motion-proofs-a-report-3.md`;
- the rounds-1-and-2 verdicts `j-motion-proofs-a-audit-verdict.md` and `-audit-objective-verdict.md`;
- the instrument `j-motion-proofs-a-mutate-3.py` with its rows `j-motion-proofs-a-mutations-3.json`, and the plant `j-motion-proofs-a-plant.sh` with `j-motion-proofs-a-plant.py`;
- the Orchestrator's replay `j-motion-proofs-a-replay-3.log.txt`, which runs every row and the plant;
- the law: `decisions.md` § E32 with its amendment, `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, and `.claude/rules/tests.md`.

## Claims

1. **The live dialog.**
   - `Modal` keeps no dialog reference. `#findDialog` reads the element the `dialog` selector matches inside the host each time it runs, and `#settle`, the bounce, and the show's body-scroll step each call it.
   - The case `settles each change and the bounce on a dialog inserted after construction` reads red on `beb7cd8`'s `Modal.ts` (the `modal-stale-dialog` row) and green at the tip.
2. **The backdrop at hide.** The Modal hide proof and the order proof read the backdrop's hide motion finished at `hidden`, and the `modal-backdrop-hide-skip` row kills them.
3. **Alert at `closed`.** The Alert fade and factor proofs read, at `closed`, every motion the close started, and read none running. The host is removed by then, so they read the motion objects they kept.
4. **The Backdrop regression check.** The replacing-class case loads a consumer transition named as such in a comment, and the `backdrop-literal-fade-show` and `backdrop-literal-fade-hide` rows kill it.
5. **The plant.**
   - The plant runs the motion ruling's values against the round-3 tip: `plant.py` writes them, and a probe confirms they took effect.
   - The four owned files pass under it, and the plant leaves no change in `src/styles`.
6. **The proofs bind.**
   - The control passes.
   - Every row in `mutations-3.json` kills by an assertion.
   - Every source is restored.
   - For each proof you confirm, name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
7. **The prose is true.** The guide's Modal construction sentence, as `180d513` integrates it, and `Modal`'s class remarks state when the dialog is read.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `180d513`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
