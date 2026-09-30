# Unit J-COLLAPSE-SIZE — `Collapse` transitions its size through `calc-size()`, with the basis Bootstrap's own write implies

## Role and engine

`opus` on Opus 5.5, a native subagent that writes in its own worktree. Read everything this brief names before acting.

## Objective

`Collapse` writes a `calc-size()` value where it writes a measured pixel size today (E27 as amended at J-COLLAPSE-SIZE-PROBE):
- **Show:** `calc-size(min-content, size)` on the horizontal axis, and `calc-size(auto, size)` on the vertical axis.
- **Hide:** `calc-size(auto, size)` on both axes.

Every settled end state stays Bootstrap's.

## Context

**Evidence.** Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
- `decisions.md` § E27, and its amendment "E27 amended at J-COLLAPSE-SIZE-PROBE". It rules the bases and the three accepted differences, and it names this unit.
- The probe that measured it: `units/j-collapse-size-probe-2.test.ts` (SHA-256 `e7a8440b…`), with the reports `units/j-collapse-size-probe-report.md` and `-report-2.md` and the logs `units/j-collapse-size-probe-2-153-run-2.log.txt` and `-orchestrator.log.txt`. Its fixtures and phase readings are the pattern for this unit's cases.
- `src/browser/Collapse.ts` at `86491c2`:
  - `show` reads `host.scrollWidth` or `host.scrollHeight` around line 256, after the zero-size write. The comment above that read says it lays the panel out at zero, so the size written next transitions.
  - `hide` reads `host.getBoundingClientRect()[dimension]` around line 330.
  - Both write the size through `recordHostWrite` as a `property` target.
- Bootstrap's `node_modules/bootstrap/js/src/collapse.js`, `show` and `hide`.

**The shape.**
- Replace each measured size with its `calc-size()` value, written through the same `recordHostWrite` call.
- A value `Collapse` no longer measures still needs a layout at the zero size before the write, or the transition does not start. Keep one layout read there, and name what it is for.
- The hide writes `calc-size(auto, size)` where it wrote the rect size. Keep its layout read after that write, as today.
- No pixel fallback is added. Veneer's recorded hosts are Chromium 153 and 141 (`ROADMAP.md` § Standing conditions names the 141 build), both support `calc-size()`, and no guide names another browser.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `names.md`, `typescript.md`, `architecture.md`, `tests.md`, and `browser.md`.
- `decisions.md` § E24 with its amendments, § E27 with its amendments, § E28, § E32 with its amendments, and § E35.
- Skill: none. Guide: `guides/veneer.md` § Collapse, only the sentences that name the measured size.

**Installed primitives.** `@orkestrel/test` for every wait and recorder. `tests/setupBrowser.ts`'s `readDuration` and motion helpers, which J-MOTION-PROOFS-B's `Collapse.test.ts` cases already use.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/collapse-size`, on `unit/collapse-size`, cut from Veneer `main` at `86491c2`, with `node_modules` installed.
- A foreground call is capped at 10 minutes.
- Write each program to a file under `tmp/j-collapse-size/`, and run the file. Use no heredoc, no `python -c`, and no `node -e`.
- Run one file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

**Measurements.** Before any source edit, write these cases, and record each reading at `86491c2`:
- **The growth case:** content that grows during a show ends the transition at the grown size. It reads red at `86491c2`, because the measured size goes stale.
- **The bordered horizontal show and the bordered vertical show:** each runs to its border-box size at the transition's end. Each reads red at `86491c2`, stopping short by the two borders.
- **The horizontal show's extent on a narrow child in a wide container:** it runs to the child's width, not the container's. It reads green at `86491c2`, because the pixel path writes that width. It stays green after the change, and it goes red if the show basis becomes `auto`.
- **The hide's extent at the transition's start:** it is the panel's rect size. It reads green at `86491c2`, and it stays green after the change.

**Control identifiers.** The probe's row labels stay in the records. Name each test for what it proves.

**Standing conditions.**
- Every gate reads green on `main` at `86491c2` on this host.
- J-RELEASE-PRIMITIVES and J-RELEASE-POPUPS write in their own worktrees. This unit touches none of their files.
- The styles session runs the probe on Chromium 141. The Orchestrator gates this unit's acceptance on that reading, not you.

## Unknowns

- Whether a case elsewhere pins the measured pixel value. Find it by running `Collapse.test.ts`, `Delegate.test.ts`, and `npm run test:app`, and report each one you change.

## Scope

**Owned.**
- `src/browser/Collapse.ts`.
- `tests/src/browser/Collapse.test.ts`.
- `guides/veneer.md` § Collapse: only the sentences that name the measured size.
- `tmp/j-collapse-size/`.

**Shared (report-only).** `tests/setupBrowser.ts`. Return a patch.

**Off-limits.**
- Every other file, including every other engine and its tests.
- The vendored files, which the `scaffold repair` command restores: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.**
- Every `Collapse.test.ts` case that reads a pixel size as the inline value written during a transition.
- `Delegate.test.ts` or `app` cases that read the same.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the measurements' readings at `86491c2`, each naming its assertion;
- `Collapse`'s new show and hide writes, and its layout read, verbatim;
- the files touched, and each earlier case changed with the reason;
- a mutation table, each red reading naming an assertion:
  - the horizontal show basis set to `auto`;
  - the hide basis set to `min-content`;
  - the pixel measurement restored;
  - the layout read removed;
- the scoped runs;
- the acceptance output, verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report in each of these cases:
- a settled end state differs from Bootstrap's;
- a case outside `Collapse.test.ts` needs an edit.

You decide the case titles, where each case sits, and the fixtures' exact markup.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. `npm run test:guides`, `npm run test:setup:browser`, and `npm run test:app` exit 0.
3. `Collapse.test.ts` and `Delegate.test.ts` pass in scoped runs.
4. The growth and bordered-show cases read red at `86491c2` by an assertion and green after. The extent cases read green at both.
5. Every mutation reddens a case by an assertion.

**Observations, not criteria.** The whole suite, which the Orchestrator runs after you exit.

## Review evidence

The Orchestrator commits your work, replays it, and gives the audit lanes the diff, the status, your report, and its replay. It accepts the unit only after the styles session's Chromium 141 run of the probe reads the same rows.
