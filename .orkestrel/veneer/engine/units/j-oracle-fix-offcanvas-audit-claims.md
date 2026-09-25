# J-ORACLE-FIX-OFFCANVAS round 1 — audit claims (2026-09-25)

**Subject.** Veneer `eaf3908` on `unit/oracle-fix-offcanvas` over `63eabbd`. Read the files at `eaf3908` with `git -C C:/Users/mikes/WebstormProjects/veneer show eaf3908:<path>`, or in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas`, which holds `eaf3908` clean.

**Evidence.** Every path here is under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`.
- The brief `j-oracle-fix-offcanvas-brief.md` and the report `j-oracle-fix-offcanvas-report.md`.
- `j-oracle-fix-offcanvas.diff` and `j-oracle-fix-offcanvas-status.txt`.
- The unit's instruments: `-mutate-2.sh`, `-mutate-3.sh`, `-compare.py`, `-accept.sh`, `-measure-2-case.ts.txt`, and `-static.test.ts`.
- The unit's logs: `-accept.log.txt`, `-census-before.log.txt`, `-census-after.log.txt`, `-compare.log.txt`, `-measure-2.log.txt`, `-mutate-2.log.txt`, and `-mutate-3.log.txt`.
- The Orchestrator's replay: `j-oracle-fix-offcanvas-replay-1.log.txt` (the instrument is `../tools/replay-oracle-fix-offcanvas-1.sh`).
- The census row: `j-oracle-census-0925.md` § Rulings, the Offcanvas focus row.

**The law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `.claude/rules/tests.md` and `.claude/rules/browser.md`.
- `../decisions.md` § E24 with every amendment, § E28 with every amendment, § E32, § E34, and § E35.

## Claims

1. **The mechanism.**
   - `Offcanvas`'s backdrop listener passes its `mousedown` to `#press`.
   - When `dismiss.backdrop` is `false`, `#press` dispatches `prevent` and leaves the press's default action alone, as before.
   - When `dismiss.backdrop` is `true`, `#press` reads the host document's `activeElement`, calls `hide()`, and cancels the default action only when `activeElement` changed.
   - The change adds no timer, no animation-frame loop, no polling, and no listener.
2. **The red-first proof binds.** The case "leaves focus on the trigger after a trusted press on the backdrop hides the panel, at the hidden event and after the press, with motion and under reduced motion" does four things:
   - it presses the backdrop with a trusted `userEvent.click` beside the panel;
   - it reads focus at `hidden`, when the press returns, and after settling;
   - it reads red at `63eabbd` by an assertion in both settings;
   - it reads green at `eaf3908`.
3. **The guard binds.** The case "keeps the press focus change when the press moves no focus: …" pins four rows in which focus moves to `body`: a prevented hide, a trigger the platform cannot focus, a press during the slide-out, and a static backdrop. Each of the mutations `always`, `released`, `outside`, and `static` reddens its own row by an assertion.
4. **The mutation table holds.**
   - `never`, `always`, `released`, `outside`, `static`, and `click`, and the `63eabbd` base, each redden by an assertion and not by another error.
   - The source is restored after each run.
   - For each proof you confirm, name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
5. **The census.**
   - After the fix, the `offcanvas` and `modal` census reads no focus departure.
   - Every other row matches `63eabbd`'s reading, and both Bootstrap recordings are unchanged.
   - The remaining departures are the `inert` rows the census ruled intentional.
6. **The account of the motion case is true.** The engine alone read `body` with motion as well. The census missed that case because `Delegate`'s offcanvas route returns focus to the trigger at `hidden.vn.offcanvas`, which fires after the press's default action when the panel moves. Rule it against `Delegate.ts` (`#routeOffcanvas`) and the measurement log.
7. **The prose is true.**
   - The class TSDoc, the `#press` comment, and the guide's added sentences in § Offcanvas hold for the code.
   - So does the extended Bootstrap-difference bullet: Bootstrap lets the default action move focus to the body, and its data API returns focus at `hidden.bs.offcanvas`.
8. **Scope.**
   - The changed paths are `guides/veneer.md`, `src/browser/Offcanvas.ts`, and `tests/src/browser/Offcanvas.test.ts`.
   - The hide's identity, doors, and returning step (E24) are unchanged.
   - No compatibility path remains.
9. **The focus comparison sees every focus move the hide makes.**
   - Rule whether comparing the document's `activeElement` before and after `hide()` detects the isolation's focus return in each case: a panel and a trigger in the light tree, a trigger inside a shadow root, and a panel inside a shadow root.
   - Where it misses a move, give the smallest input, and say whether the case is reachable through the documented surface.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `eaf3908`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
