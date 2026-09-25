# J-MOTION-PROOFS-B rounds 1 and 2 — audit claims (2026-09-25)

**Subject.** Veneer `fd82ae9` on `unit/motion-proofs-b` over `1290162`. The commits are:
- `0de17f1`, round 1;
- `f03690f`, round 1's report-only patches;
- `6c98bf4`, round 2;
- `fd82ae9`, round 2's report-only patches.

Read the files at `fd82ae9` with `git -C C:/Users/mikes/WebstormProjects/veneer show fd82ae9:<path>`, or in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b`, which holds `fd82ae9` clean.

**Evidence.** Every path here is under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`.
- The briefs `j-motion-proofs-b-brief.md` and `-brief-2.md`, and the reports `j-motion-proofs-b-report.md` and `-report-2.md`.
- The diffs `j-motion-proofs-b.diff` (`1290162..0de17f1`) and `-2.diff` (`f03690f..6c98bf4`), and the status files `j-motion-proofs-b-status.txt` and `-2-status.txt`.
- The integration logs `-integration-1.log.txt` and `-integration-2.log.txt`, and the patches `-veneer.md.patch`, `-types.ts.patch`, `-EngineSection.test.ts.patch`, `-r2-types.ts.patch`, and `-r2-EngineSection.test.ts.patch`.
- The instruments: `-mutate.py`, `-mutations.json`, `-r2-mutations.json`, `-plant.sh`, `-plant.py`, `-plant-probe.test.ts.txt`, and `-carousel-order-probe.test.ts.txt`.
- The unit's logs: `-mutations-all.log.txt`, `-mutations-yield.log.txt`, `-plant-final.log.txt`, `-plant-control-base.log.txt`, `-r2-mutations.log.txt`, and `-r2-plant-final.log.txt`.
- The Orchestrator's replay: `j-motion-proofs-b-replay-2.log.txt` (the instrument is `../tools/replay-motion-proofs-b-2.sh`).

**The law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `.claude/rules/tests.md` and `.claude/rules/browser.md`.
- `../decisions.md` § E24 with every amendment, § E32 with its amendment, § E34, and § E35.

## Claims

1. **No owned proof pins a motion value.**
   - No case in `Collapse.test.ts`, `Toast.test.ts`, `Tab.test.ts`, or `Carousel.test.ts` asserts a duration, an easing, or a transitioned property list.
   - Every declared duration a case reads comes through `readDuration`.
   - The Tab case "reads the shipped nav and fade declarations …" no longer pins the nav link's `transitionDuration`, which is the styles session's finding.
2. **Each completion proof reads the rendered motion.** At each completion event, the completion case of each engine reads:
   - that some motion was read on the elements the engine moves;
   - that no read motion is unfinished;
   - that no animation is running.

   The reading comes from a `MutationObserver` that records the moved elements' animations after each class write.
3. **The Toast fix.**
   - `show` waits for the fade in that removing the `transition` token starts, then reads a door before `shown`.
   - Three cases read red at `1290162` by assertions and green at `fd82ae9`.
   - A `show` or `hide` made during the fade in supersedes the show, which resolves `false`.
   - Rule whether the show's rewind after that failed door can write over the superseding call's writes.
4. **The Carousel fix.**
   - The slide settles on both items together under the engine's signal.
   - Both outgoing-longer cases, one per variant, read red at `f03690f` by assertions and green at `fd82ae9`.
   - The incoming-longer cases catch a settle on the outgoing item alone.
   - The fade variant's delayed opacity drop is covered by the same settle.
5. **The mutations bind.**
   - Every row in the replay kills its named proof by an `AssertionError`.
   - Where a row also fails a collateral case by `AbortError` or another error, name each such case, and say whether the named proof's own failure is an assertion. These rows are `toast-show-skip`, `toast-hide-skip`, `collapse-hide-skip`, `toast-show-yield`, `toast-hide-yield`, and `collapse-hide-yield`.
   - For each proof you confirm, name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
6. **The plant.**
   - The four files pass against the planted motion values.
   - The plant probe fails on the unplanted cascade, which proves the plant took effect.
   - The control, the `1290162` proofs and `Toast.ts` against the plant, fails.
   - The plant never reaches an owned file.
7. **The unit's rulings hold under E32.**
   - Tab controls' and carousel indicators' transitions are cascade feedback that no engine settles on, as E32's amendment rules for Button.
   - The kept control readings, `readDuration` of 0 on a toast without `fade` and on a plain pane, read no value the cascade owns.
   - The Collapse cases now load `cascade`, the tokens partial plus the key, which is the shipped cascade and not a test-local copy.
8. **Reduced motion (E34).** Under `stageMedia({ motion: false })`, each of the four engines creates no animation, and Carousel reads both items in both variants.
9. **The prose is true.** The following hold for the code at `fd82ae9`:
   - § Toast and § Carousel in `guides/veneer.md`;
   - the `ToastInterface` `@returns` remarks;
   - the `CarouselEventMap.slid` summary;
   - the two class TSDocs;
   - the showcase changes in `tests/app/browser/sections/EngineSection.test.ts`.
10. **Scope.** The changed paths are:
    - the four owned tests;
    - `Toast.ts` and `Carousel.ts`;
    - `guides/veneer.md`, `src/browser/types.ts`, and `EngineSection.test.ts`, through the integrations.

    No compatibility path remains.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `fd82ae9`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
