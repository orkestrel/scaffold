# Unit J-ORACLE-FIX-OFFCANVAS, round 3 — the press compares the deepest focused element

**What changed from `j-oracle-fix-offcanvas-brief-2.md`, and why.** Round 2 (`dcff520`) ruled FAIL 4,7 (`units/j-oracle-fix-offcanvas-audit-2-verdict.md`). Consider a panel that carries its own shadow root. A focus move between two elements inside that root is invisible to the panel's root, because the panel's root retargets it to the panel. This is the seam's second round. Each round fixed the scope it was shown, so this round removes the scope: the press compares the deepest focused element. The reader is exported and proved in `helpers.ts`, because J-ISOLATION-SHADOW needs the same read.

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree. It is native because the proofs run in Chromium.

## Objective

A dismissing backdrop press cancels its default action whenever its hide moved focus, at any shadow depth. The prose states that without a limit.

## Context

**Evidence.** Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
- The verdict `units/j-oracle-fix-offcanvas-audit-2-verdict.md`, and the objective lane's verdict `units/j-oracle-fix-offcanvas-audit-2-objective-verdict.md`, with the residual input under its table.
- The code at `dcff520`: `src/browser/Offcanvas.ts`, in `#press`, reads `scope.activeElement` from the panel's root, which is a `ShadowRoot` or the document.

**The obligations.**
1. **The reader.** Export a pure function from `src/browser/helpers.ts` that returns the deepest focused element under a `Document` or `ShadowRoot`. It reads the root's `activeElement`, then that element's `shadowRoot.activeElement`, and so on down, returning the last element it reaches, or `null` when nothing under the root has focus.
   - Name it by `.claude/rules/names.md`'s module-helper form, `{verb}{Noun}`, for example `readFocusedElement`.
   - Put its contract, if it needs one, in `src/browser/types.ts`.
   - Prove it in `tests/src/browser/helpers.test.ts`: the document, one shadow level, two shadow levels, a closed shadow root that exposes no `shadowRoot`, and nothing focused.
2. **The press.** `#press` compares the reader's result from the panel's root, before and after `void this.hide()`.
3. **The red-first case.** Write the case from the objective lane's residual input:
   - a light-tree panel carrying an open shadow root that contains `returnTarget` and `inside`;
   - `show(returnTarget)`, then focus `inside`, then a trusted press on the backdrop;
   - read the deepest focused element at `hidden` and after the press.

   It reads red at `dcff520` by an assertion.
4. **The prose.** `guides/veneer.md` § Offcanvas and its Bootstrap-difference bullet, the class TSDoc, and the `#press` comment all state that the press reads the deepest focused element, so a move at any shadow depth counts. Remove any wording that names the panel's root as the scope.
5. **The barrel.** The new export joins `tests/src/browser/index.test.ts`'s export list, and it gets a Surface row in the guide whose summary equals its TSDoc.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `names.md`, `typescript.md`, `architecture.md`, `tests.md`, `browser.md`, `documentation.md`, and `writing.md`.
- `engine/decisions.md` § E24 and § E35.
- Skill: none. Guide: `guides/veneer.md`.

**Installed primitives.** `@orkestrel/test` for every wait and recorder. Search `@orkestrel/test`'s browser entry for a deep focus reader before you write one, and use it if one exists.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas`, on `unit/oracle-fix-offcanvas` at `dcff520`. The unit's instruments are under its `tmp/j-oracle-fix-offcanvas/`: `mutate-4.sh`, `mutate-5.sh`, `accept-2.sh`, and `compare-2.py`.
- A foreground call is capped at 10 minutes.
- Write each program to a file under `tmp/j-oracle-fix-offcanvas/` or `tmp/probe/`, and run the file. Use no heredoc, no `python -c`, and no `node -e`.
- Run one file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

**Measurements.** The residual case's red reading at `dcff520`, before any source edit.

**Control identifiers.** None. Name each test for what it proves.

**Standing conditions.**
- The styles session's four button-reboot cases read red on `main` on this host (`units/host-chromium-153-reading.md`, fourth reading). This worktree's base is older, so its own standing row may differ. Neither is this unit's.
- J-RELEASE-CORE, in its own worktree, also changes `helpers.ts` and `index.test.ts`. The landings merge by hunk.

## Unknowns

None.

## Scope

**Owned.**
- `src/browser/helpers.ts`: the new reader only.
- `src/browser/types.ts`: the reader's contract, if it needs one.
- `src/browser/Offcanvas.ts`: `#press`, its comment, and the class TSDoc.
- `tests/src/browser/helpers.test.ts`, `Offcanvas.test.ts`, and `index.test.ts`.
- `guides/veneer.md`: § Offcanvas and the Surface row for the reader.
- `tmp/j-oracle-fix-offcanvas/` and `tmp/probe/`.

**Shared (report-only).** None.

**Off-limits.**
- Every other file, including `Isolation.ts` and `Modal.ts`.
- The vendored files, which the `scaffold repair` command restores: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.**
- `index.test.ts`'s export list.
- The guide's Surface table and its parity check.
- Round 2's shadow case, which must still pass.

Run `npm run test:guides`, `npm run test:setup:browser`, and the owned files after the change.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the measurement's red reading;
- the reader's contract and implementation, verbatim;
- the files touched;
- the red-first proof: the case title, its red reading at `dcff520` naming the assertion, and its green reading;
- each corrected sentence, before and after;
- a mutation table, each red reading naming an assertion:
  - the reader stopping at one level;
  - the press reading the panel's root, which is round 2's behaviour;
  - round 1's and round 2's mutations re-run through successor scripts;
- the census for `offcanvas` and `modal`, compared with round 2's;
- the acceptance output, verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when the fix needs an off-limits file. You decide the reader's name within the naming rule, the case titles, and each sentence's wording.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. `npm run test:policy`, `npm run test:guides`, and `npm run test:setup:browser` exit 0.
3. `helpers.test.ts`, `Offcanvas.test.ts`, `Isolation.test.ts`, `Modal.test.ts`, and `index.test.ts` pass in scoped runs.
4. The residual case reads red at `dcff520` by an assertion and green after. Every earlier case still passes.
5. No sentence names a shadow depth the press misses.
6. The census matches round 2's reading.
7. Every mutation in the table reddens its proof by an assertion.

**Observations, not criteria.** `npm run test:app` and the whole suite, which the Orchestrator runs after you exit.

## Review evidence

The Orchestrator commits your work, replays the proofs, the mutations, and the census, and gives the audit lane the diff, the status, the report, and its replay.
