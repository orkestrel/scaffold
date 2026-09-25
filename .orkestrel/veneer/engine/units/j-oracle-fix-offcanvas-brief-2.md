# Unit J-ORACLE-FIX-OFFCANVAS, round 2 — the press sees a focus move inside a shadow root, and the prose says what the code does

**What changed from `j-oracle-fix-offcanvas-brief.md`, and why.** Round 1 (`eaf3908`) failed its audit on claims 7 and 9 (`units/j-oracle-fix-offcanvas-audit-verdict.md`). The press compares the document's `activeElement`, which is retargeted to a shadow host. So it misses the isolation's focus return when the panel and its trigger share a shadow root. Three sentences are false as well. This round carries both findings and the subjective lane's three accepted wording items. It changes nothing else.

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree. It is native because the proofs run in Chromium, which the Astra bench sandbox cannot start.

## Objective

A dismissing backdrop press cancels its default action whenever its hide moved focus, including when the panel and its trigger sit in the same shadow root. Every sentence about the press states what the code does.

## Context

**Evidence.** Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
- The verdict `units/j-oracle-fix-offcanvas-audit-verdict.md`, and the two lane verdicts it names:
  - `units/j-oracle-fix-offcanvas-audit-objective-verdict.md`, claims 7 and 9, with the four-placement table;
  - `units/j-oracle-fix-offcanvas-audit-reviewer-verdict.md`, § Required changes, and § Design-fit defects outside the claims.
- The code at `eaf3908`:
  - `src/browser/Offcanvas.ts`, in `#press`: `const document = this.#host.ownerDocument`, then a comparison of `document.activeElement` before and after `void this.hide()`.
  - `src/browser/Isolation.ts`, in `destroy`: `this.#trigger?.focus()`.
- The HTML Standard's `activeElement` algorithm retargets a focused shadow descendant to its shadow host at the document. `this.#host.getRootNode()` returns the panel's `ShadowRoot` or `Document`, and each carries `activeElement`.
- The sentences to correct:
  - `guides/veneer.md` § Offcanvas, the Bootstrap-difference bullet: "A backdrop press that hides the panel therefore cancels its own `mousedown` default action, and focus stays on the trigger." It must name the condition, which is a hide that moved focus.
  - `src/browser/Offcanvas.ts`, the `#press` comment: "Bootstrap's panel returns focus after that default action, at its `hidden` event." Bootstrap's data API makes that return, not its panel. In the same comment, "a press that moved no focus keeps it" must name its noun: the default action.
  - `tests/src/browser/Offcanvas.test.ts`: the guard case's title uses "the press" in two senses. The subjective lane's wording is "keeps the press's default action, which moves focus to the body, when the hide moves no focus: …". A comment there reads "The window hears the press".

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `tests.md`, `typescript.md`, `browser.md`, `documentation.md`, and `writing.md`.
- `engine/decisions.md` § E24 and § E35.
- Skill: none. Guide: `guides/veneer.md` § Offcanvas.

**Installed primitives.** `@orkestrel/test` for every wait and recorder. A helper whose job an installed export does is a defect.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas`, on `unit/oracle-fix-offcanvas` at `eaf3908`. Round 1's instruments are under its `tmp/j-oracle-fix-offcanvas/`: `mutate-2.sh`, `mutate-3.sh`, `accept.sh`, and `compare.py`.
- A foreground call is capped at 10 minutes.
- Write each program to a file under `tmp/j-oracle-fix-offcanvas/` or `tmp/probe/`, and run the file. Use no heredoc, no `python -c`, and no `node -e`.
- Run one file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

**Measurements.** Before any source edit, add the same-shadow-root case and record its red reading. The panel and a button sit inside one open shadow root of a connected host, with the offcanvas cascade reaching the shadow root. The case runs `show(button)`, a trusted press on the backdrop, and a focus reading at `hidden` and after the press, from the shadow root's `activeElement`. It must fail by an assertion. If the cascade cannot reach the shadow root through the shipped stylesheet, record how the case loads it.

**Control identifiers.** None. Name each test for what it proves.

**Standing conditions.**
- `tests/src/styles/elements/button.test.ts` reads red on `main` on this host, as a standing row. It is not this unit's.
- `Isolation` stops its walk at a shadow boundary. Elements outside the shadow host get no `inert` claim when the panel sits in a shadow root. That is J-ISOLATION-SHADOW's, not this unit's. Your case must not depend on `Isolation` making the outside inert.

## Unknowns

- Whether a panel in a shadow root shows and hides correctly apart from the press. If the show or the hide itself fails there, stop and report the reading, rather than widening the fix.

## Scope

**Owned.**
- `src/browser/Offcanvas.ts`: `#press` and its comment, and the class TSDoc sentence on the press.
- `tests/src/browser/Offcanvas.test.ts`.
- `guides/veneer.md` § Offcanvas: the sentences on the press, the hide, and the focus return, and the Bootstrap-difference bullet.
- `tmp/j-oracle-fix-offcanvas/` and `tmp/probe/`.

**Shared (report-only).** None.

**Off-limits.**
- Every other file, including `Isolation.ts`, `Modal.ts`, and `tests/setupBrowser.ts`.
- The vendored files, which the `scaffold repair` command restores: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.** The round-1 cases and the four guard rows in `Offcanvas.test.ts`. Run the whole file, `Isolation.test.ts`, and `Modal.test.ts` after the change.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the measurement's red reading, and the answer to the unknown;
- the files touched;
- the fix, in two sentences;
- the red-first proof: the case title, its red reading at `eaf3908` naming the assertion, and its green reading;
- each corrected sentence, before and after;
- a mutation table:
  - the document's `activeElement` in place of the root's, which reddens the shadow case;
  - round 1's mutations re-run through `mutate-2.sh` and `mutate-3.sh`;
  - each reading names an assertion;
- the census for `offcanvas` and `modal` after the change, compared with round 1's through `compare.py`;
- the acceptance output, verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when the fix needs an off-limits file, or when a panel in a shadow root fails apart from the press. You decide and record the case's title, where it sits, and how it loads the cascade into the shadow root.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. The same-shadow-root case reads red at `eaf3908` by an assertion and green after. Every round-1 case and guard row still passes.
3. `Offcanvas.test.ts`, `Isolation.test.ts`, and `Modal.test.ts` pass in whole-file runs.
4. Each corrected sentence holds for the code, and none promises a cancellation the guard rows refute.
5. The census for `offcanvas` and `modal` matches round 1's reading.
6. Every mutation in the table reddens its proof by an assertion.

**Observations, not criteria.** `npm run test:app` and the whole suite, which the Orchestrator runs after you exit.

## Review evidence

The Orchestrator commits your work, replays the proofs, the mutations, and the census, and gives the audit lanes both rounds' diffs, the status, both reports, and its replay.
