# Unit J-ORACLE-FIX-OFFCANVAS, round 5 — the press keeps the focus its isolation returned

**What changed from `j-oracle-fix-offcanvas-brief-4.md`, and why.** Round 4 measured that `focusin` never reaches the document from inside one shadow root, and stopped. A design round then ruled the press rule (`units/j-oracle-fix-offcanvas-design-verdict.md`). The press no longer asks whether focus moved. It asks whether its hide released the isolation, and whether the isolation's return target holds focus afterwards.

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree. It is native because the proofs run in Chromium.

## Objective

`Offcanvas`'s backdrop press cancels its `mousedown` default action exactly when its hide released the isolation and the isolation's return target holds focus, read from the target's own root. That holds in every placement the four rounds found, and every guard row keeps the default action.

## Context

**Evidence.** Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
- The verdict `units/j-oracle-fix-offcanvas-design-verdict.md` is the rule and the surface, and this brief follows it.
- The two proposals it names:
  - the planner's § 2 readings and § 4 probe rows;
  - the objective lane's B′ and its `:focus` caution.
- The round-4 probe `units/j-oracle-fix-offcanvas-4-focusin.block.ts.txt`, with its script and log.
- The code at `43fa73d`: `src/browser/Offcanvas.ts` (`#press`, `hide`, and `show`'s isolation construction), `src/browser/Isolation.ts` (the trigger field and `destroy`), `src/browser/helpers.ts` (`readFocusedElement`), and `src/browser/types.ts` (`IsolationInterface`).

**The obligations.**
1. **Probe first.** Write `tmp/probe/holds-probe.sh` from the round-4 probe block. Around `void offcanvas.hide()`, record:
   - `trigger.getRootNode().activeElement === trigger`, before and after;
   - `trigger.matches(':focus')`, before and after;
   - whether `#isolation`'s value changed;
   - `document.hasFocus()`.

   Run it across:
   - the round-4 placements and guard rows;
   - the trigger inside the panel, already focused;
   - a hide listener that focuses the trigger and then prevents the hide;
   - a hide listener that moves focus elsewhere after the trigger is removed;
   - a fallback trigger that is a shadow host H with no focus of its own and the panel inside H's shadow;
   - the same with `delegatesFocus`.

   If the rule's reading disagrees with the expected end state in any row, stop and report.
2. **The surface.**
   - `IsolationInterface.trigger` in `types.ts`, and its getter in `Isolation.ts`.
   - `holdsFocus(element)` in `helpers.ts`, replacing `readFocusedElement`, with the export list and the guide's Surface rows updated.
3. **The press.** Read `#isolation` and its `trigger` before `void this.hide()`. Cancel the default action when `#isolation` no longer holds that isolation and `holdsFocus(trigger)` reads `true`.
4. **The proofs.**
   - **Red first at `43fa73d`:** the closed root the panel carries, and the panel in a shadow root with focus outside it.
   - **Keep green:** every earlier case and guard row.
   - **Add** the planner's new rows, each asserting its Bootstrap end state per the verdict:
     - the trigger inside the panel, already focused;
     - the listener that focuses the trigger and prevents the hide;
     - the listener that moves focus elsewhere after the trigger is removed;
     - fallback H.
   - `holdsFocus`'s cases:
     - the document;
     - an open root;
     - a closed root read through a held reference;
     - a host whose tree holds focus;
     - a disconnected element.
   - The getter's cases: the option, and the fallback.
5. **The prose.** § Offcanvas and its Bootstrap-difference bullet state the rule and the two limits the verdict names: reduced motion, and a fallback shadow host owned by J-ISOLATION-SHADOW. So do the class TSDoc, the `#press` comment, and the `IsolationInterface` guide section. No sentence names a shadow depth the press misses.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, in particular § Minimal public API.
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `names.md`, `typescript.md`, `browser.md`, `tests.md`, `documentation.md`, and `writing.md`.
- `engine/decisions.md` § E24 and § E35.
- Skill: none. Guide: `guides/veneer.md`.

**Installed primitives.** `@orkestrel/test` for every wait and recorder. Its `readFocus` reads `document.activeElement` only, and its name is taken.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas`, on `unit/oracle-fix-offcanvas` at `43fa73d`. The unit's instruments are under its `tmp/j-oracle-fix-offcanvas/` and `tmp/probe/`.
- A foreground call is capped at 10 minutes.
- Write each program to a file, and run the file. Use no heredoc, no `python -c`, and no `node -e`.
- Run one file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

**Measurements.** Obligation 1, before any source edit.

**Control identifiers.** None. Name each test for what it proves.

**Standing conditions.**
- The styles session's four button-reboot cases read red on Veneer `main` on this host. They are not this unit's.
- J-RELEASE-CORE changes `helpers.ts` and `index.test.ts` in its own worktree, and the landings merge by hunk.
- J-RELEASE-PRIMITIVES owns `Isolation.ts` after this unit lands.

## Unknowns

- Whether `:focus` differs from the root read in any row, and whether frame focus changes either reading. Obligation 1 records both, and the rule rests on the root read.

## Scope

**Owned.**
- `src/browser/Offcanvas.ts`: `#press`, its comment, and the class TSDoc.
- `src/browser/Isolation.ts`: the `trigger` getter only.
- `src/browser/types.ts`: `IsolationInterface.trigger`.
- `src/browser/helpers.ts`: `holdsFocus`, and the removal of `readFocusedElement`.
- `tests/src/browser/Offcanvas.test.ts`, `Isolation.test.ts`, `helpers.test.ts`, and `index.test.ts`.
- `guides/veneer.md`: the Surface rows, `#### IsolationInterface`, § Offcanvas, and its Bootstrap-difference bullet.
- `tmp/j-oracle-fix-offcanvas/` and `tmp/probe/`.

**Shared (report-only).** None.

**Off-limits.**
- Every other file, including `Modal.ts` and `Delegate.ts`.
- The vendored files, which the `scaffold repair` command restores: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.** The `readFocusedElement` suite, its export-list entry and Surface row, and every sentence about the press's reading.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- obligation 1's readings, per row, with both columns;
- `#press`, `holdsFocus`, and the getter, verbatim;
- the files touched;
- the red-first proofs, with their readings at `43fa73d` and green;
- each corrected sentence, before and after;
- a mutation table:
  - the document's `activeElement` in place of the trigger's root;
  - the release condition dropped;
  - always cancel;
  - never cancel;
  - `matches(':focus')` in place of the root read, reported whether or not it reddens;
  - each red reading names an assertion;
- the census compared with round 3's;
- the acceptance output, verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when obligation 1 contradicts the rule, or when the fix needs an off-limits file. You decide the case titles and each sentence's wording.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. `npm run test:policy`, `npm run test:guides`, and `npm run test:setup:browser` exit 0.
3. `Offcanvas.test.ts`, `Isolation.test.ts`, `Modal.test.ts`, `helpers.test.ts`, and `index.test.ts` pass in scoped runs.
4. Both round-3 inputs read red at `43fa73d` and green after, and every guard row holds.
5. `readFocusedElement` exists nowhere in the tree.
6. The census matches round 3's reading.
7. Every mutation reddens its proof by an assertion, except the `:focus` row, which is reported.

**Observations, not criteria.** `npm run test:app`.

## Review evidence

The Orchestrator commits your work, replays it, and gives the audit lanes rounds 3 to 5, with the diff, the status, the reports, and its replay.
