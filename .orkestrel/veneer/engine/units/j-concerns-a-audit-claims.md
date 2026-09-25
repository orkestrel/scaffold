# J-CONCERNS-A — audit claims (2026-09-25)

**Subject.** Veneer `unit/concerns-a` at `bcea965`:
- round 1, `e92fb7e` over `0865c67`;
- the Orchestrator's merge of `main` `094a71e`, as `bd5c882`;
- round 2, `bcea965`.

The unit's net change over `main` is `units/j-concerns-a-2.diff` (`git diff 094a71e bcea965`), with its status in `units/j-concerns-a-2-status.txt`. Read the files at `bcea965` with `git -C C:/Users/mikes/WebstormProjects/veneer show bcea965:<path>`. Never read the worktree.

**Evidence** (all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`):
- the briefs `j-concerns-a-brief.md` and `j-concerns-a-brief-2.md`;
- the reports `j-concerns-a-report.md` and `j-concerns-a-report-2.md`;
- the instrument `j-concerns-a-mutate.cjs` and its runner `j-concerns-a-mutations.sh`;
- the Orchestrator's replays: `j-concerns-a-mutations-orchestrator.log.txt` at `e92fb7e`, and `j-concerns-a-mutations-orchestrator-2.log.txt` at `bcea965`, each with its `-raw` log;
- the law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, `.claude/rules/tests.md`, and `decisions.md` § E9, § E11, and § E32 with its amendment.

Bootstrap 5.3.8's sources are in `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/`.

## Claims

1. **Cancellation (ScrollSpy).** ScrollSpy dispatches its activate event non-cancelable (`emitEvent(..., false)` in `src/browser/ScrollSpy.ts`). The case `activates every entering link of a delivery when a listener prevents each activate event, reading none as prevented` proves that a listener's `preventDefault` changes no activation. This matches Bootstrap: `scrollspy.js` triggers `activate.bs.scrollspy` and never reads `defaultPrevented`.
2. **Focus (ScrollSpy).** Two cases:
   - `leaves focus on the element that held it when a scroll activates another link` proves that activation moves no focus;
   - `keeps focus on the link a keyboard activation of the smooth scroll pressed, where the fragment navigation it prevents moves it` proves that a keyboard-pressed smooth click keeps focus on the link and changes no location hash. Its control is a link the scrollspy leaves alone, whose native fragment navigation moves focus.

   Bootstrap's `scrollspy.js` moves no focus.
3. **Motion (ScrollSpy).**
   - The host smooth-scroll case and the viewport smooth-scroll case each assert an intermediate scroll position, so an instant scroll fails each.
   - The case `scrolls the host smoothly under staged reduced motion, reading no motion preference` pins Bootstrap's behaviour: a smooth request whatever the preference.
   - The unit measured that Chromium 153 does not honour the preference for a smooth `scrollTo` (`j-concerns-a-report.md` § Unknowns).
4. **Focus (Button).** The case `leaves focus where it is at each toggle, on its host or on another control` proves that a toggle moves no focus. Bootstrap's `button.js` writes the class and `aria-pressed` and nothing else.
5. **Motion (Button).** The case `completes a toggle and dispatches its event while the shipped cascade still transitions the host` proves that the toggle completes and dispatches while the shipped cascade's transition runs. It pins no duration, easing, property, or colour the cascade owns, as E32 and its amendment require.
6. **The proofs bind.**
   - Each named mutation in the instrument fails its case by an assertion, and the unmutated control passes: `scrollspy-cancel`, `scrollspy-focus-link`, `scrollspy-focus-section`, `scrollspy-navigate`, `scrollspy-instant-host`, `scrollspy-instant-view`, `scrollspy-reduced`, `button-focus`, `button-blur`, and `button-motion`.
   - Every source is restored after each mutation.
   - For each proof you confirm, name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
   - Name any plausible defect in the engine that none of these cases would catch.
7. **Scope and the test rules.**
   - Only `tests/src/browser/ScrollSpy.test.ts` and `tests/src/browser/Button.test.ts` change, and no `src/**` file changes.
   - The added cases follow `.claude/rules/tests.md`: real implementations, no mocks or spies, no local helper, no inline case matrix, and cleanup through `onTestFinished` or `afterEach`.
   - The keyboard-focus case restores the location hash and the window's scroll, so it leaves no state for a later case.
   - Each title names what the case proves.
8. **The rulings cite Bootstrap correctly.** Each Bootstrap line the report cites says what the report says it says: `scrollspy.js` near line 233 and near lines 128 to 149, `dom/event-handler.js` near line 282, and `button.js` near lines 36 to 39 and 57 to 64.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `bcea965`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
