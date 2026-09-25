# J-MOTION-PROOFS-B round 3 — audit claims (2026-09-25)

**Subject.** Veneer `dfd9204` on `unit/motion-proofs-b` over `fd82ae9`. Read the files at `dfd9204` with `git -C C:/Users/mikes/WebstormProjects/veneer show dfd9204:<path>`, or in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b`, which holds `dfd9204` clean.

**Evidence.** Every path here is under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`.
- The brief `j-motion-proofs-b-brief-3.md` and the report `j-motion-proofs-b-report-3.md`.
- The previous rounds' verdict `j-motion-proofs-b-audit-verdict.md`, with its two lane verdicts.
- `j-motion-proofs-b-3.diff` and `-3-status.txt`.
- The instruments `-3-r3-mutations.json`, `-3-r3-factor-plant.py`, `-3-r3-factor.sh`, and `-3-r3-accept.sh`, with the round's `-mutate.py`, `-plant.sh`, and `-plant.py`.
- The logs `-3-r3-factor-base.log.txt`, `-3-r3-factor.log.txt`, `-3-r3-plant.log.txt`, and `-3-r3-tab-reduced-force.log.txt`.
- The Orchestrator's replay: `j-motion-proofs-b-replay-3.log.txt` (the instrument is `../tools/replay-motion-proofs-b-3.sh`).

**The law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `.claude/rules/tests.md` and `writing.md`.
- `../decisions.md` § E24, § E32 with both amendments, and § E34.

## Claims

1. **No owned proof pins a motion value or a motion kind.** The `toBeInstanceOf(CSSTransition)` assertion is gone. No case in `Toast.test.ts`, `Tab.test.ts`, `Carousel.test.ts`, or `Collapse.test.ts` asserts a motion's type, duration, easing, or property list.
2. **Tab proves reduced motion.**
   - The case "swaps the panes with no animation created on either pane under staged reduced motion, and dispatches shown" passes.
   - The mutation `r3-tab-reduced-force`, an engine that forces a pane transition under reduced motion, reddens it alone, by an assertion.
   - Name whether the case's assertions tell that mutation apart from the passing case.
3. **The factor cases set both factors.**
   - Each factor case loads `:root { --vn-factor-motion: 1 }` before its first reading, which is named `shipped`, and asserts the ratio of 4.
   - A planted shipped factor of 2 reddens the `fd82ae9` Toast and Tab factor cases by an assertion, and leaves the round-3 cases green.
4. **The Toast prose is true.**
   - The § Toast `shown` row holds with `animated` both `true` and `false`.
   - `Toast.ts`'s class remarks and § Toast's paragraph say that after its completed event a call reads only whether the toast is live. That matches `show` and `hide` after `emitEvent(… shown …)` and `emitEvent(… hidden …)`.
5. **The helper words are fixed** in `Toast.ts`, `Carousel.ts`, `Toast.test.ts`, and § Toast. The case title "resolves false for a show that a hide takes over during its fade in, …" names what the case proves.
6. **Scope.** The changed paths are `guides/veneer.md`, `src/browser/Carousel.ts`, `src/browser/Toast.ts`, `tests/src/browser/Tab.test.ts`, and `tests/src/browser/Toast.test.ts`, and each source change is to class remarks only. `Carousel.test.ts` is unchanged, correctly: its reading is already `shipped`, and it has no factor case.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `dfd9204`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
