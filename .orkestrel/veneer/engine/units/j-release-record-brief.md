# Unit J-RELEASE-RECORD — every recorded write goes through the snapshot's `write`, and no engine saves a target it never changes

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree. It is judgment-bearing adoption work, and it runs natively because its proofs run in Chromium (Bench law 5).

## Objective

`recordHostWrite` records the call's prior value and writes through the snapshot's `write`, and every caller moves in the same change: `Carousel`, `Collapse`, `Tab`, `Toast`, and `Dropdown`. Each caller's call-start `#save` of a recorded target goes with it, so no engine saves a target it does not change. Tab's planned-attribute joins follow E25 as E35 narrowed it.

## Context

**Evidence.** Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
- `decisions.md` § E35 with its amendment, in particular § The save moment, § The row rulings, and unit 2a.
- J-RELEASE-CORE's landed contract, on Veneer `main` at `b8c6a08`:
  - `HostSnapshotInterface.write(target, value, priority?)` and its remarks;
  - `matchesHostValue` in `helpers.ts`;
  - `recordHostWrite` and `rewindHostWrites`, whose signatures are unchanged so far.
- The sweep witnesses this unit carries:
  - **S5 T10** (`units/j-release-sweep-s5-map.md`, witness (b)). `Toast`'s `#save` records `show`, `showing`, and `fade` at every call. So `new Toast(host, { animated: false, autohide: false })`, then `show()`, then a consumer adding `fade`, then `destroy()`, removes the consumer's `fade`. A host shown by markup has its `show` token written back the same way. J-MOTION-PROOFS-B's audit restated this from source.
  - **Carousel's half of S4 R3** (`units/j-release-sweep-s4-map.md`, § R3). The carousel saves all five item tokens on both items. After a forward slide, a consumer adds `carousel-item-end` to an item, and `destroy` removes it.
  - **S4 T2 I1.** `Tab`'s `#selection` reads `#dropdown` again after the blur the engine dispatches. So it writes targets the snapshot never recorded (the map's input: a blur listener that wraps B's parent in `.dropdown`).
  - **S6 row 16** (`units/j-release-sweep-s6-map.md`). Each call site pairs `recordHostWrite` with a `#save` by hand, and no type ties the two records. After this unit, the one write step keeps both.
  - **Tab's planned-attribute joins** (S4 R3's Tab half, under E35's narrowed E25). A write that changes nothing joins only a record a live holder holds, or one a restoration still owes.

**The shape.**
- `recordHostWrite(writes, target, next, snapshot)` records the call's prior value on the first changing write, as today, and writes through `snapshot.write`, so the lifetime record and the call record come from one step.
- E35 keeps them as two records: the call's baseline for E24's returning step, and the lifetime's for destruction.
- Name the parameter by `names.md`. Change the signature once, and update every caller in the same change, with no transitional overload (AGENTS.md § No compatibility shims).

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `browser.md`, and `documentation.md`.
- `decisions.md` § E24 with every amendment, § E25, § E32 with its amendments, and § E35 with its amendment.
- Skill: none. Guide: `guides/veneer.md` § Collapse, § Tab, § Carousel, § Toast, § Dropdown, and § Ownership and restoration.

**Installed primitives.** `@orkestrel/test` for every wait and recorder.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-record`, on `unit/release-record`, cut from Veneer `main` at `b8c6a08`, with `node_modules` installed.
- A foreground call is capped at 10 minutes.
- Write each program to a file under `tmp/j-release-record/`, and run the file. Use no heredoc, no `python -c`, and no `node -e`.
- Run one file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

**Measurements.** Before any source edit, write each witness as a case, and record its red reading at `b8c6a08`:
- T10's two inputs;
- R3's carousel input;
- T2 I1's blur input;
- a Tab over markup that already carries its roles, keeping a consumer's later edit through its destruction (the E25 narrowing).

**Control identifiers.** The map labels stay in the records. Name each test for what it proves.

**Standing conditions.**
- The styles session's four button-reboot cases read red on `main` on this host. They are not this unit's.
- J-CONCERNS-B, in its own worktree and not yet landed, adds one case to `Dropdown.test.ts` and two to `Popover.test.ts`. Its landing and this unit's merge by hunk. Add your `Dropdown.test.ts` cases away from its case, "dispatches shown and hidden inside the call while a transition the cascade gives the menu still runs".

## Unknowns

- Whether a caller's other `#save` targets, those it does not record through `recordHostWrite`, also change nothing in some path. Report each, and convert it only where a witness reads red.

## Scope

**Owned.**
- `src/browser/helpers.ts`: `recordHostWrite` and `rewindHostWrites` only.
- `src/browser/Carousel.ts`, `Collapse.ts`, `Tab.ts`, `Toast.ts`, and `Dropdown.ts`.
- Their tests, and `tests/src/browser/helpers.test.ts`.
- `src/browser/types.ts`: only the remarks the change makes false.
- `guides/veneer.md`: the sections named in § Law.
- `tmp/j-release-record/`.

**Shared (report-only).** `tests/setupBrowser.ts`, if a door table names a save step. Return a patch.

**Off-limits.**
- Every other file, including `Lifetime.ts`, `HostSnapshot.ts`, `Placement.ts`, `Tooltip.ts`, and the overlays.
- The vendored files, which the `scaffold repair` command restores: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.** Every case that pins a restoration of a target an engine never changed, and every call site of `recordHostWrite`. Find the rest by running the five engines' test files after the change.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the witnesses' red readings;
- `recordHostWrite`'s signature and body, verbatim;
- per engine, each `#save` removed or kept, with the reason;
- the files touched;
- each case's red and green readings;
- a mutation table:
  - the snapshot write dropped from `recordHostWrite`;
  - a call-start save restored in each engine;
  - Tab's re-read after the blur restored;
  - each red reading names an assertion;
- the acceptance output, verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when a caller cannot move without an off-limits file, or when a witness conflicts with E24's returning step. You decide the parameter's name, the case titles, and where each case sits.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. `npm run test:guides` and `npm run test:setup:browser` exit 0.
3. The five engines' test files and `helpers.test.ts` pass in scoped runs, and so does `npm run test:app`.
4. Every witness reads red at `b8c6a08` by an assertion, and green after.
5. No engine saves at call start a target that its call records through `recordHostWrite`.
6. Every mutation reddens its proof by an assertion.

**Observations, not criteria.** The whole suite, which the Orchestrator runs after you exit.

## Review evidence

The Orchestrator commits your work, replays it, and gives the audit lanes the diff, the status, your report, and its replay.
