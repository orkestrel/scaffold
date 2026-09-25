# Unit J-RELEASE-POPUPS — `Dropdown`, `Tooltip`, `Popover`, and `Placement` give back through one `Lifetime`

## Role and engine

`opus` on Opus 5.5, a native subagent that writes in its own worktree. Read everything this brief names before acting.

## Objective

`Dropdown`, `Tooltip`, `Popover`, and `Placement` hold what they take through a `Lifetime` (E35 unit 4). So:
- a `destroy()` called at any point, including inside consumer code one of their releases runs, returns only after every write is written back and every resource is given back;
- each class joins the lifetime its `signal` names before it runs any consumer code;
- every release acts on what its take recorded.

## Context

**Evidence.** Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
- `decisions.md` § E35 with its amendment:
  - § The invariant, § The bound, and § The consumer's interface;
  - § The mechanism: `Lifetime`, including membership through `signal` and the claim outside the ledger;
  - § The save moment;
  - § Row rulings;
  - unit 4.
- The sweep maps. Their line numbers are at the sweep's commit, so locate each site by its symbol.
  - `units/j-release-sweep-s1-map.md` (`Dropdown`, `Placement`): the station table and § Smallest violation inputs. E35 carries REPLACE, D-SAVE, P-SAVE, PROMOTION, CLOSE-REENTRY, and OPEN-ABORT as defects. HIDE is ruled not a defect: a completed hide ends in Bootstrap's state.
  - `units/j-release-sweep-s2-map.md` (`Tooltip`, `Popover`): the station table and § 3 The source. E35 carries rows 2 and 4 to 10 as defects. The content a completed hide leaves in the removed tip is ruled not a defect. Row 5(a), a consumer changing the tip's `id`, is inside the contract. The one held link record `{ id, added, described }` closes it with row 5(b).
- J-RELEASE-CORE's and J-RELEASE-RECORD's landed pattern, on Veneer `main` at `86491c2`:
  - `src/browser/Lifetime.ts`;
  - `src/browser/Button.ts`, the first class to adopt it;
  - `recordHostWrite(writes, target, next, snapshot)`, which writes through `HostSnapshotInterface.write`;
  - `tests/src/browser/Button.test.ts` and `tests/src/browser/Lifetime.test.ts`, whose membership and nested-destroy cases are the pattern.
- `HostSnapshotInterface.write(target, value, priority?)` is change-aware. It records only a write that changes its target, or joins the record a live holder or a pending restoration holds.
- The current `save` callers among these files, read at Veneer `a65d308` with `git grep -n "\.save(" -- src/browser`:
  - `Placement.ts` around lines 126, 132, 215, and 286;
  - `Tooltip.ts` around lines 864, 874, and 878.

  `Dropdown.ts`'s call-start saves went with J-RELEASE-RECORD.
- J-CONCERNS-B's cases are on `main` and must stay green:
  - `Popover.test.ts`: a prevented popover show writes nothing, and a prevented hide keeps the tip, each proved as a mutation history;
  - `Dropdown.test.ts`: "dispatches shown and hidden inside the call while a transition the cascade gives the menu still runs".

**The shape.**
- Each class owns a private `Lifetime`, and a class whose options take `signal` calls `Lifetime.join(signal, this, lifetime)` right after its claim, before any consumer code.
- Each take that can run consumer code is held before it runs, with the record its release needs:
  - `Placement`'s promotion, recording whether this placement opened it (PROMOTION, OPEN-ABORT, CLOSE-REENTRY);
  - `Dropdown`'s placement, held until its release returns and cleared only if it is still the same one (REPLACE);
  - `Tooltip`'s placement, tip, and link record `{ id, added, described }`, each cleared after its release returns and only if it is still the same one (S2 rows 2, 4 to 9);
  - each content element's origin, re-recorded when consumer code moved the element since its last record (S2 row 10).
- Every write a class makes goes through `snapshot.write` or `recordHostWrite`, so nothing records a write that changes nothing (D-SAVE, P-SAVE).
- `destroy` drains the lifetime, so a nested `destroy` completes every pending release before it returns.
- A release never takes a resource again.
- `Popover` stays `Tooltip` under the popover profile.
- J-PLACEMENT-141-FIX's deferred anchoring is a later unit. Do not implement it here.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, and `browser.md`.
- `decisions.md` § E17 with its amendments, § E18, § E24 with every amendment, § E25, § E32 with its amendments, and § E35 with its amendment.
- Skill: none. Guide: `guides/veneer.md`, only the sentences about these four classes that the change makes false.

**Installed primitives.**
- `@orkestrel/test` for every wait and recorder.
- `@orkestrel/contract` for guards.

A helper whose job an installed export does is a defect.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-popups`, on `unit/release-popups`, cut from Veneer `main` at `86491c2`, with `node_modules` installed.
- A foreground call is capped at 10 minutes.
- Write each program to a file under `tmp/j-release-popups/`, and run the file. Use no heredoc, no `python -c`, and no `node -e`.
- Run one file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

**Measurements.** Before any source edit, write each witness as a case from the maps' smallest inputs, and record its reading at `86491c2`:
- S1: REPLACE, D-SAVE, P-SAVE, PROMOTION, CLOSE-REENTRY, and OPEN-ABORT;
- S2: row 2, row 4, row 5(a) and (b), row 6, row 7, row 8, row 9(i) and (ii), and row 10;
- membership, per class that takes `signal`: destroyed through the lifetime's drain, and leaving the owner's ledger when destroyed directly. Follow `Button.test.ts`.

A witness that reads green at `86491c2` is not a witness. D-SAVE may read green there, because J-RELEASE-RECORD removed `Dropdown`'s call-start saves. Report each green reading as closed by the named landing, and do not count it as proof.

**Control identifiers.** The sweep labels (REPLACE, D-SAVE, P-SAVE, PROMOTION, CLOSE-REENTRY, OPEN-ABORT, and the S2 row numbers) stay in the records. Name each test for what it proves.

**Standing conditions.**
- Every gate reads green on `main` at `86491c2` on this host.
- J-RELEASE-PRIMITIVES (`Isolation`, `ScrollLock`, `Backdrop`, `Swipe`) and J-COLLAPSE-SIZE (`Collapse`) write in their own worktrees. This unit touches none of their files.

## Unknowns

- Whether a class here holds a take whose release the maps did not name. Report each holding you add beyond the maps' stations, with the input that reaches it.
- Whether any witness needs a change to `Lifetime.ts`, `HostSnapshot.ts`, or `helpers.ts`. Stop and report it. Those files are off-limits.

## Scope

**Owned.**
- `src/browser/Dropdown.ts`, `Tooltip.ts`, `Popover.ts`, and `Placement.ts`.
- `tests/src/browser/Dropdown.test.ts`, `Tooltip.test.ts`, `Popover.test.ts`, and `Placement.test.ts`.
- `src/browser/types.ts`: only the remarks the change makes false, including `TooltipInterface.destroy`'s summary if row 6 makes it false.
- `guides/veneer.md`: only the sentences about these classes that the change makes false, including the tooltip TSDoc's forgetting sentence S2 row 6 names.
- `tmp/j-release-popups/`.

**Shared (report-only).** `tests/setupBrowser.ts`. Return a patch.

**Off-limits.**
- Every other file, including:
  - `Lifetime.ts`, `HostSnapshot.ts`, and `helpers.ts`;
  - `Delegate.ts`, whose tests you run and do not edit;
  - the files J-RELEASE-PRIMITIVES and J-COLLAPSE-SIZE own.
- The vendored files, which the `scaffold repair` command restores: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.**
- Every case that pins a latched `destroy`.
- Every case that pins a field cleared before its release.
- Every case that pins a `save` before a write that changes nothing.

Find the rest by running the four classes' test files and `Delegate.test.ts` after the change.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- each witness's reading at `86491c2`, naming its assertion, and each green reading's closing landing;
- per class:
  - what it holds, and whether each release can run consumer code;
  - each `save` removed or kept, with the reason;
- the files touched;
- each case's red and green readings;
- a mutation table, each red reading naming an assertion:
  - each class's latch restored;
  - each field cleared before its release again;
  - `Placement`'s promotion released without its record;
  - `Tooltip`'s link released through a fresh `tip.id`;
  - each join moved after the class's first consumer code;
- the scoped runs, `Delegate.test.ts` included;
- the acceptance output, verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report in each of these cases:
- a witness needs an off-limits edit;
- a witness conflicts with E24's returning step or E18's moved-tip rule;
- `Delegate.test.ts` needs an edit to stay green.

You decide the private names, the case titles, and where each case sits. Place Dropdown and Popover cases away from J-CONCERNS-B's cases.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. `npm run test:guides` and `npm run test:setup:browser` exit 0.
3. The four classes' test files and `Delegate.test.ts` pass in scoped runs.
4. Every witness that reads red at `86491c2` reads red by an assertion there, and green after.
5. No class keeps a `destroy` latch that returns before its pending releases finish, and no field is cleared before its release returns.
6. Every mutation reddens its proof by an assertion.

**Observations, not criteria.** The whole suite, which the Orchestrator runs after you exit.

## Review evidence

The Orchestrator commits your work, replays it, and gives the audit lanes the diff, the status, your report, and its replay.
