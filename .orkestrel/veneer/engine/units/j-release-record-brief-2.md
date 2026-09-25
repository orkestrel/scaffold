# Unit J-RELEASE-RECORD round 2 — Bootstrap's read order in Tab, and proofs that bind

## Role and engine

`opus` on Opus 5.5, the native subagent that wrote round 1, continuing in its worktree. Read everything this brief names before acting.

## Objective

Close the round-1 audit's three obligations (`units/j-release-record-audit-verdict.md` § Round 2 obligations):
1. Tab reads its selection in Bootstrap's order.
2. The priority half of `recordHostWrite`'s contract has a proof.
3. Each door after a split write has a case that fails without it.

**What changed from round 1, and why.** Both audit lanes ruled claim 5 FAIL.
- Round 1's take-time selection read answered S4 T2 I1, where the call-start save and the write read the dropdown set at different times.
- Round 1 also removed that cause: the snapshot now records each write as it happens.
- So the take-time read is a Bootstrap departure with no defect behind it.
- Round 1's brief anticipated it in its mutation row "Tab's re-read after the blur restored", and that framing was the Orchestrator's error, not yours.

The lanes also found two proof gaps: obligation 2 and obligation 3.

## Context

**Evidence.** Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
- The verdict `units/j-release-record-audit-verdict.md` wins over every other artifact where they disagree.
- The subjective lane's D1 prescription and its referrals OR1, OR2, and OR3: `units/j-release-record-audit-subjective-verdict.md`.
- The objective lane's proof table: `units/j-release-record-audit-objective-verdict.md`.
- Round 1's brief `units/j-release-record-brief.md` and your report `units/j-release-record-report.md`.
- Bootstrap's order: `node_modules/bootstrap/js/src/tab.js`, `_deactivate` (around line 130: `blur()`, then `_toggleDropDown` in `complete`), `_activate`, and `_toggleDropDown` (around line 229).
- At `a1041bd`, `src/browser/Tab.ts` reads `deselection` and `selection` around lines 219-225, before `outgoing.blur()` around line 242. The case that pins the take-time read is around `tests/src/browser/Tab.test.ts:829`. The destroy witness is around line 805.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, and `browser.md`.
- `decisions.md` § E22, § E24 with every amendment, § E25, and § E35 with its amendment.
- Skill: none. Guide: `guides/veneer.md` § Tab, only the sentences this change makes false.

**Installed primitives.** `@orkestrel/test` for every wait and recorder.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-record`, on `unit/release-record` at `a1041bd`. It is clean, and `node_modules` and `dist/` are built.
- A foreground call is capped at 10 minutes.
- Write each program to a file under `tmp/j-release-record/`, named with an `r2-` prefix, and run the file. Use no heredoc, no `python -c`, and no `node -e`.
- Run one file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

**Measurements.** Before any source edit:
- write obligation 1's replacement case and read it red at `a1041bd` by an assertion;
- add the after-show assertion to the destroy witness, and read it green at `a1041bd`;
- write obligation 2's restore assertion, and read it green at `a1041bd`. Then read it red with `snapshot.write` replaced by `writeHostValue` in `recordHostWrite`.

**Control identifiers.** The labels D1, OR1, OR2, OR3, and S4 T2 I1 stay in the records. Name each test for what it proves.

**Standing conditions.**
- Every gate reads green on this worktree at `a1041bd`, `test:conformance` included (the Orchestrator's replay).
- Veneer `main` moved after `b8c6a08`. The Orchestrator merges it at the landing, so do not merge it yourself.

## Unknowns

- Whether each door in obligation 3 can be reached by an input. Report each door with the input that reaches it, or the reason no input can.

## Scope

**Owned.**
- `src/browser/Tab.ts`, `Collapse.ts`, `Toast.ts`, and `Carousel.ts`. Change the three door-owning engines only if a door proves unreachable or wrong.
- `tests/src/browser/Tab.test.ts`, `Collapse.test.ts`, `Toast.test.ts`, `Carousel.test.ts`, and `helpers.test.ts`.
- `guides/veneer.md` § Tab: the take-time sentences only.
- `tmp/j-release-record/`.

**Shared (report-only).** `tests/setupBrowser.ts`. Return a patch if a case matrix belongs there under `tests.md`.

**Off-limits.**
- Every other file, including `helpers.ts`, `HostSnapshot.ts`, `Lifetime.ts`, and `Dropdown.ts`.
- The vendored files, which the `scaffold repair` command restores: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.**
- The case that pins the take-time read.
- The Tab class TSDoc's sentence on reading the write set once, before the first write.

Find the rest by running `Tab.test.ts` after the change.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the measurements' readings, each naming its assertion;
- Tab's new read sites, verbatim;
- per door in obligation 3: the case that binds it, or why no input reaches it;
- a mutation table, each red reading naming an assertion:
  - `recordHostWrite` through `writeHostValue`, which reddens the Tab destroy witness and obligation 2's case;
  - Tab's take-time read restored;
  - each door removed;
- the files touched;
- the acceptance output, verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report in each of these cases:
- Bootstrap's order makes a witness fail that the snapshot should hold;
- a door needs an off-limits edit.

You decide the case titles, where each case sits, and whether a case covers several doors of one engine. You also decide whether to take the reviewer's optional `marks` default in `Carousel`.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. `npm run test:guides` and `npm run test:setup:browser` exit 0.
3. `Tab.test.ts`, `Collapse.test.ts`, `Toast.test.ts`, `Carousel.test.ts`, `Dropdown.test.ts`, and `helpers.test.ts` pass in scoped runs.
4. Tab reads `#selection` after the blur, as Bootstrap does, and the replacement case reads red at `a1041bd` and green after.
5. The Tab destroy witness and obligation 2's case each read red under `recordHostWrite` through `writeHostValue`.
6. Each reachable door's removal reddens a case by an assertion.

**Observations, not criteria.** The whole suite, which the Orchestrator runs after you exit.

## Review evidence

The Orchestrator commits your work, replays it, and gives the objective lane the door cases, the diff, and its replay.
