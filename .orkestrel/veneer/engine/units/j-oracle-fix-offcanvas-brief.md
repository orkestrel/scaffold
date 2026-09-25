# Unit J-ORACLE-FIX-OFFCANVAS — a dismissing backdrop press leaves focus where Bootstrap's does

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree. This is objective work, but it runs natively because its proofs run in Chromium, which the Astra bench sandbox cannot start (`.agents/orchestration.md` § Bench laws, rule 5).

## Objective

After a press on the backdrop that dismisses a shown `Offcanvas`, focus ends on the element the show took focus from, as it does after Bootstrap 5.3.8's dismissal. This holds under reduced motion and with motion. Every other step's reading stays unchanged, the static backdrop press included.

## Context

**Evidence.**
- The census row, from `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-census-0925.md` § Rulings:
  > Offcanvas | after a backdrop press under reduced motion, focus reads `body` where Bootstrap's reads the trigger | **Defect.** Both engines close on the backdrop's `mousedown`. Bootstrap completes the hide after its transition timer, so the press's own focus change comes first and focus then returns to the trigger. Veneer's reduced-motion hide completes inside the `mousedown` listener, returns focus, and then the press's default action moves focus to `body`.
- The census step is `point.backdrop` in the offcanvas scenario of `PLUGIN_SCENARIOS` (`tests/setupServer.ts`). J-ORACLE-RECORD's census table (`units/j-oracle-record-report-3.md` § Census) reads `offcanvas | document | focus | — | trigger | body | point.backdrop, under reduced motion only`.
- The code at Veneer `1290162`, read with `git show 1290162:<path>`:
  - `src/browser/Offcanvas.ts`, in `show`: the backdrop's listener is `created.element.addEventListener('mousedown', () => this.#press(), …)`. `#press` calls `void this.hide()` when `dismiss.backdrop` is `true`, and `#prevent()` otherwise.
  - `src/browser/Offcanvas.ts`, in `hide`: before the method's first `await`, the step `this.#apply(change, expected, () => isolation?.destroy())` releases the isolation.
  - `src/browser/Isolation.ts`, in `destroy`: the last statement is `this.#trigger?.focus()`. The trigger is the `trigger` option, or else the HTML element that held focus when the isolation was constructed.
- Bootstrap 5.3.8's order: its backdrop listens for `mousedown` and calls the offcanvas's `hide`. The data API returns focus to the trigger on `hidden.bs.offcanvas`, which fires after `executeAfterTransition`'s timer, so it always fires after the press's default action.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, in particular the non-negotiables and "No polling architecture".
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `tests.md`, `typescript.md`, `names.md`, `browser.md`, and `patterns.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E24 with every amendment, § E25, § E28 with every amendment, § E32 with its amendment, and § E34.
- Skill: none. Guide: `guides/veneer.md` § Offcanvas and § Modal.

**Installed primitives.**
- `@orkestrel/test`: read its guide's `## Surface` in `C:/Users/mikes/WebstormProjects/scaffold/guides/`, or its declaration under `node_modules/@orkestrel/test`. This covers every wait, recorder, and deferred.
- `@orkestrel/contract`: its declaration under `node_modules/@orkestrel/contract`.

A helper, guard, wait, recorder, or deferred whose job an installed export does is a defect.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas`, cut from Veneer `main` at `63eabbd`, which holds J-ORACLE-RECORD's plugin oracle in `tests/setupServer.ts`. `node_modules` is installed.
- A foreground call is capped at 10 minutes.
- Write each program to a file under `tmp/j-oracle-fix-offcanvas/` or `tmp/probe/`, and run the file. Use no heredoc, no `python -`, and no `node -e`.
- Run browser tests one file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.
- The census instrument is `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-record-census-3.test.ts`. Copy it to `tmp/probe/census.test.ts` and run it with `ORACLE_PLUGINS=offcanvas,modal` through `npx vitest run --config vite.config.ts --no-cache --project probe tmp/probe/census.test.ts`. It writes both recordings and `departures.json` under `tmp/j-oracle/census/`. Its first full run took minutes, so launch it with a 9-minute limit and read the log.

**Measurements.** Take these before any edit, and record each reading:
1. The census for `offcanvas` and `modal` at `63eabbd`. Expect the offcanvas focus departure at `point.backdrop` under reduced motion, and no focus departure for Modal.
2. In a browser test, with motion and under `stageMedia({ motion: false })`, record where focus sits after a trusted press on the backdrop of a shown panel that a focused trigger opened: `userEvent.click` from `vitest/browser`, as the existing Offcanvas press cases use it. Read focus when the press returns, and again at `hidden`. The code reading says focus returns inside the listener in both cases. The census saw the departure only under reduced motion. Explain the difference from the readings.

**Control identifiers.** None. Name each test for what it proves.

**Standing conditions.**
- `tests/src/styles/elements/button.test.ts` reads red on `main` on this host, as a standing row (`units/host-chromium-153-reading.md`). It is not this unit's.
- Other units own other files in their own worktrees, and this unit touches none of them:
  - J-SAMEWAY-ENGINES-B owns `Dropdown`, `Tooltip`, `Popover`, and `Placement`, with their tests.
  - J-MOTION-PROOFS-B owns `Collapse.test.ts`, `Toast.test.ts`, `Tab.test.ts`, `Carousel.test.ts`, and `Toast.ts`.

## Unknowns

- Why the census saw no departure with motion. Measurement 2 answers it. If focus ends on `body` with motion too, the fix covers both, and the report says the census missed the motion case and why.
- Whether Modal's backdrop path has the same order. Modal dismisses on a `click` that follows a `mousedown` on its host, and the host is focusable. If measurement 1 or a browser reading shows a Modal focus departure, stop and report it with the reading. Do not fix it: `Modal.ts` is not granted.

## Scope

**Owned.**
- `src/browser/Offcanvas.ts`: the backdrop press path, the hide's focus return, and the comments beside them.
- `tests/src/browser/Offcanvas.test.ts`.
- `guides/veneer.md` § Offcanvas: only the sentences that state the order of a backdrop press, the hide, and the focus return.
- `src/browser/types.ts`: only the `OffcanvasInterface` remarks that state the same order.
- `tmp/j-oracle-fix-offcanvas/` and `tmp/probe/`.

**Shared (report-only).** None.

**Off-limits.**
- Every other file. That includes `src/browser/Isolation.ts`, `src/browser/Modal.ts`, `src/browser/Backdrop.ts`, `tests/setupServer.ts`, `tests/setupBrowser.ts`, and `tests/conformance.test.ts`.
- The vendored files, which the `scaffold repair` command restores: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.
- If the fix needs an off-limits file, stop and report.

**What asserts the state this change ends.**
- Any case in `tests/src/browser/Offcanvas.test.ts` that reads focus after a backdrop press.
- Any sentence in `guides/veneer.md` § Offcanvas that says when focus returns.

Find the rest by running `Offcanvas.test.ts`, `Isolation.test.ts`, and `Modal.test.ts` after the change. A case outside the owned files that goes red is a stop.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the measurements' readings, with the answer to each unknown;
- the files touched;
- the fix as a short description of the mechanism, and why it needs no timer and no polling;
- the red-first proof: each new or changed case's title, its red reading at `63eabbd` with the assertion that failed, and its green reading;
- the census for `offcanvas` and `modal` after the fix, with the departures that remain;
- a mutation table: for each new proof, the mutation that makes it fail and the red reading, which names an assertion;
- the acceptance output, verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report on any of these:
- the fix needs an off-limits file;
- the fix changes which event dismisses the panel;
- the fix changes the static backdrop's reading;
- the census shows a departure at `63eabbd` that measurement 1 did not predict.

You decide and record:
- the mechanism, within the constraints under § Acceptance criteria;
- the case titles;
- where the new cases sit in the file.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. A shown panel's backdrop still dismisses it on the press's `mousedown`, as Bootstrap's does. A static backdrop's press still dispatches `prevent`, and focus after it reads as Bootstrap's does.
3. After a trusted press that dismisses the panel, focus reads the trigger at `hidden` and after the press ends, both under `stageMedia({ motion: false })` and with motion. The proof reads red at `63eabbd` by an assertion.
4. The fix uses no timer, no animation-frame loop, and no polling. It parks on an event or changes the press's own default action.
5. `tests/src/browser/Offcanvas.test.ts`, `Isolation.test.ts`, and `Modal.test.ts` pass in scoped runs.
6. The census for `offcanvas` and `modal` reads no focus departure. Apart from the focus row, every row it reads matches `63eabbd`'s reading of those plugins.
7. Every mutation in the table reddens its proof by an assertion.

**Observations, not criteria.** `npm run test:app` and the whole suite, which the Orchestrator runs after you exit.

## Review evidence

The Orchestrator commits your work, replays the red-first proofs, the mutations, and the census, and gives the audit lanes the diff, the status, your report, and its replay.
