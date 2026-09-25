# J-CONCERNS-A round 3 — audit claims (2026-09-25)

**Subject.** Veneer `unit/concerns-a` at `90e8b60` over `bcea965`:
- `0cb4433`, round 3;
- `90e8b60`, the Orchestrator's integration of the round's report-only guide and TSDoc patches.

Read the files at `90e8b60` with `git -C C:/Users/mikes/WebstormProjects/veneer show 90e8b60:<path>`. Never read the worktree.

**Evidence** (all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`):
- `j-concerns-a-3.diff` and `j-concerns-a-3-status.txt`;
- the brief `j-concerns-a-brief-3.md` and the report `j-concerns-a-report-3.md`;
- the round-1-and-2 verdict `j-concerns-a-audit-verdict.md`, and your objective verdict `j-concerns-a-audit-objective-verdict.md`;
- the instrument `j-concerns-a-mutate-3.cjs` and its runner `j-concerns-a-mutations-3.sh`;
- the Orchestrator's replay `j-concerns-a-mutations-orchestrator-3.log.txt`, with its `-raw` log;
- the law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, and `decisions.md` § E32 and § E34.

## Claims

1. **E34 in ScrollSpy.**
   - `#scrollTo` in `src/browser/ScrollSpy.ts` reads `matchesReducedMotion(this.#host)` once per click. It scrolls with `behavior: 'instant'` while that reads true, and smoothly otherwise, on both the host branch and the view branch.
   - No second preference read exists in `src/browser/`.
   - The case `scrolls the host to the section instantly under staged reduced motion, passing no intermediate position` reads red on `bcea965`'s `ScrollSpy.ts` and green at the tip.
2. **The focus case leaves no state.** The case `keeps focus on the link a keyboard activation of the smooth scroll pressed, running no fragment navigation` asserts the history length and the hash unchanged, and adds no history entry in a passing run. It still reads red under `scrollspy-focus-section` and `scrollspy-navigate`.
3. **The nested toggle.** The case `returns the state the host carries when a listener toggles again, delivering each event in the order its call dispatched it` reads red under `button-stale-return`, and green at the tip.
4. **The proofs bind.**
   - The control passes.
   - Every round-3 mutation fails its case by an assertion.
   - Every source is restored.
   - For each proof you confirm, name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
5. **The prose is true.** The § ScrollSpy smooth-scroll paragraph in `guides/veneer.md`, the `ScrollSpyOptions.smooth` TSDoc in `src/browser/types.ts`, and the `ScrollSpy` class remarks each state what `#scrollTo` does under reduced motion, and nothing else changed in those texts.
6. **Scope.** The changed paths are `src/browser/ScrollSpy.ts`, `tests/src/browser/ScrollSpy.test.ts`, and `tests/src/browser/Button.test.ts`, plus the integration's `guides/veneer.md` and `src/browser/types.ts`.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `90e8b60`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
