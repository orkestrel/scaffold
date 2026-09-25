# J-MOTION-PROOFS-A — audit claims (2026-09-25)

**Subject.** Veneer `unit/motion-proofs-a` at `beb7cd8` over `main` `0865c67`:
- `88036ca`, round 1;
- `8e3e222`, the Orchestrator's guide integration;
- `beb7cd8`, round 2.

Read the files at `beb7cd8` with `git -C C:/Users/mikes/WebstormProjects/veneer show beb7cd8:<path>`. A lane that cannot run git reads the worktree copies under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-a/`, committed as `beb7cd8` with a clean status.

**Evidence** (all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`):
- `j-motion-proofs-a.diff` and `j-motion-proofs-a-status.txt`;
- the briefs `j-motion-proofs-a-brief.md` and `-brief-2.md`, the decision sent in flight `j-motion-proofs-a-decision-1.md`, and the reports `j-motion-proofs-a-report.md` and `-report-2.md`;
- the instrument `j-motion-proofs-a-mutate-2.py` with its rows `j-motion-proofs-a-mutations.json` and `-mutations-2.json`, and the plant script `j-motion-proofs-a-plant.sh`;
- the Orchestrator's replay `j-motion-proofs-a-replay-2.log.txt`;
- the law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, `.claude/rules/tests.md`, and `decisions.md` § E32 with its amendment;
- the styles session's motion ruling: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md`.

## Claims

1. **E32: no pinned motion value.**
   - No test in `Modal.test.ts`, `Offcanvas.test.ts`, `Backdrop.test.ts`, or `Alert.test.ts` pins a duration, an easing, or a transitioned property list the cascade owns.
   - Every duration a proof uses is read, through `readDuration` or `getAnimations`.
   - A rule a test loads to set up a condition, such as a lengthened duration, says so in a comment and copies no shipped rule.
2. **Modal settles on every motion it moves.**
   - `Modal`'s show and hide wait for the host's fade and the dialog's transition together (`#settle`).
   - The order case, `dispatches shown and hidden after every motion its change starts on the host and the dialog finishes, whichever of the host's fade and the dialog's transition lasts longer`, reads red on `0865c67`'s `Modal.ts` (the `modal-base` row) and green at the tip.
   - The `modal-show-dialog` and `modal-hide-host` rows each kill it.
3. **Each completion reads the settled motion.** At each completion event, the converted Modal, Offcanvas, Backdrop, and Alert proofs read no running animation on any element the engine moved. Each row that skips a wait kills a proof by an assertion (the replay).
4. **Offcanvas needed no change.** Its order case passes on `0865c67`'s `Offcanvas.ts` in both orders, and dropping either wait from its show or its hide fails that case.
5. **The conversion survives the motion ruling.**
   - The plant script sets the ruling's values: panels at `--vn-motion-panel` on `--vn-ease-panel`, a `scale(0.96)` dialog entry, and `.fade` on `--vn-ease-out`.
   - The converted files pass against it, and the unconverted files fail there (the report's plant run).
   - Say whether `j-motion-proofs-a-plant.sh` writes the ruling's values, and whether any converted proof would still fail against them.
6. **One duration reader.**
   - `readDuration` in `tests/setupBrowser.ts` is the only reading of a declared transition duration in `tests`, `src`, and `app`.
   - Its proof reads red under `reader-seconds`.
   - It appears in the module's export list.
7. **Scope.**
   - The changed paths are `src/browser/Modal.ts`, the four owned test files, `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` (for `readDuration` alone), and the guide integration.
   - Nothing else in the two shared setup files changes.
8. **The proofs bind.**
   - The control passes.
   - Every row kills by an assertion.
   - Every source is restored.
   - For each proof you confirm, name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `beb7cd8`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
