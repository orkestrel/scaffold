# Unit J-RELEASE-PRIMITIVES — `Isolation`, `ScrollLock`, `Backdrop`, and `Swipe` give back through one `Lifetime`

## Role and engine

`opus` on Opus 5.5, a native subagent that writes in its own worktree. Read everything this brief names before acting.

## Objective

`Isolation`, `ScrollLock`, `Backdrop`, and `Swipe` each hold what they take through a `Lifetime` (E35 unit 3). So:
- a `destroy()` called at any point, including inside consumer code one of their releases runs, returns only after every write is written back and every resource is given back;
- a class whose options take `signal` joins the lifetime that signal names before it runs any consumer code.

## Context

**Evidence.** Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
- `decisions.md` § E35 with its amendment, in particular:
  - § The invariant;
  - § The mechanism: `Lifetime`, including membership through `signal` and the claim outside the ledger;
  - § The save moment;
  - § Row rulings;
  - unit 3.
- § E24 as E35 amends it: a nested destroy completes a restoration running inside `Isolation.destroy` or `ScrollLock.destroy` before it returns.
- The sweep map `units/j-release-sweep-s3-map.md` holds this unit's stations:
  - § Backdrop.ts, B1 to B4;
  - § Isolation.ts, I1s to I5s;
  - § ScrollLock.ts, S1 to S3 and the referral under S3;
  - § 4, the claims the map could not break.
- `units/j-release-sweep-s4-map.md` rows S1 and S2 cover `Swipe`.
- J-RELEASE-CORE's landed pattern, on Veneer `main`:
  - `src/browser/Lifetime.ts`: `hold`, `release`, `destroy`, `signal`, and the static `join(signal, resource, lifetime)`;
  - `src/browser/Button.ts`, the first class to adopt it: it joins right after its claim, holds its snapshot, and its `destroy` releases the claim and then drains;
  - `tests/src/browser/Button.test.ts` and `tests/src/browser/Lifetime.test.ts`, whose membership and nested-destroy cases are the pattern your witnesses follow.
- `HostSnapshotInterface.write(target, value, priority?)` is change-aware. It creates or joins a record at a write that changes the target. At a write that changes nothing, it joins only a record a live holder holds or a restoration still owes.
- The current callers, read at Veneer `a65d308` with `git grep -n "\.save(" -- src/browser`:
  - `src/browser/Isolation.ts` around line 139 (`inert`);
  - `src/browser/ScrollLock.ts` around lines 87, 106, and 116 (`overflow`, `padding-right`, `margin-right`);
  - `src/browser/Swipe.ts` around line 67 (the `pointer` token).
- The construction sites, from `git grep -n "new Isolation\|new ScrollLock\|new Backdrop\|new Swipe" -- src/browser`:
  - `Modal.ts`: `ScrollLock`, `Backdrop`, and `Isolation`;
  - `Offcanvas.ts`: `ScrollLock`, `Backdrop`, and `Isolation`;
  - `Carousel.ts`: `Swipe`.

  Those owners are not yet lifetimes (J-OVERLAYS and J-RELEASE-SWITCHES convert them). So each passes a foreign `signal`, whose abort destroys the class as it does today.
- `Backdrop`'s options take no `signal` (`src/browser/Backdrop.ts`, the constructor).

**The shape.**
- Each class owns a private `Lifetime`.
- A class whose options take `signal` calls `Lifetime.join(signal, this, lifetime)` before it runs any consumer code. That code is its first write, a getter, or a hook.
- Each resource is held before the take that can run consumer code: the snapshot, an observer, a listener set, an `Isolation` claim, the `ScrollLock` holder record, the backdrop's insertion, and the `Swipe` pointer token.
- `destroy` replaces the `if (this.#controller.signal.aborted) return` latch with the lifetime's drain. So a nested `destroy` runs every pending release again, the running one included. Each release is resumable: run again, it finishes its unfinished work and repeats no completed effect.
- Write through `snapshot.write` wherever a `save` preceded a write the class makes. Keep `save` only where a class must join a record it does not write. Report each kept `save` and why.
- A release never takes a resource again.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, and `browser.md`.
- `decisions.md` § E24 with every amendment, § E25, and § E35 with its amendment.
- Skill: none. Guide: `guides/veneer.md`, only the sentences about these four classes that the change makes false.

**Installed primitives.**
- `@orkestrel/test` for every wait and recorder. Read its guide's `## Surface` in `C:/Users/mikes/WebstormProjects/scaffold/guides/` or its declaration under `node_modules/@orkestrel/test`.
- `@orkestrel/contract` for guards.

A helper whose job an installed export does is a defect.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-primitives`, on `unit/release-primitives`, cut from Veneer `main` at `BASE_TIP`, with `node_modules` installed.
- A foreground call is capped at 10 minutes.
- Write each program to a file under `tmp/j-release-primitives/`, and run the file. Use no heredoc, no `python -c`, and no `node -e`.
- Run one file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

**Measurements.** Before any source edit, write each witness as a case, and record its red reading at `BASE_TIP`:
- **I3s:** a reaction to an `inert` write that `Isolation.destroy` makes calls that isolation's `destroy()` again. The nested call returns only after every claim is written back.
- **I4s:** an `<aside inert>` beside the host, under a `MutationObserver`. Constructing and destroying an isolation records no `inert` mutation on it.
- **ScrollLock S3:** a style reaction during the last holder's restoration calls that holder's `destroy()` again. The nested call returns only after `overflow`, `padding-right`, and `margin-right` are written back.
- **Membership, per class that takes `signal`:**
  - a class built with a `Lifetime`'s signal is destroyed through that lifetime's drain;
  - a class destroyed directly leaves the owner's ledger;
  - a class built with an aborted signal takes nothing.

  Follow `Button.test.ts`'s cases for these.

A witness that reads green at `BASE_TIP` is not a witness. Report it, and do not count it as proof.

**Control identifiers.** The sweep labels (I3s, I4s, S3) stay in the records. Name each test for what it proves.

**Standing conditions.**
- Every gate reads green on `main` at `BASE_TIP` on this host.
- J-RELEASE-RECORD is under audit in its own worktree. It owns `Carousel.ts`, `Collapse.ts`, `Tab.ts`, `Toast.ts`, `Dropdown.ts`, and their tests. This unit touches none of them.

## Unknowns

- **The ScrollLock referral** (`units/j-release-sweep-s3-map.md`, under S3): a lock taken in a reaction during a restoration reads a `padding-right` the old lock has not yet written back, and writes double compensation. Write the witness first:
  - If it reads red and the fix stays inside `ScrollLock.ts`, fix it and report it.
  - If the fix needs a design choice, stop and report the witness and the choice.
  - If it reads green, report that.
- Whether `Backdrop` or `Swipe` holds anything whose release can run consumer code. Report each resource you hold and whether its release can.

## Scope

**Owned.**
- `src/browser/Isolation.ts`, `ScrollLock.ts`, `Backdrop.ts`, and `Swipe.ts`.
- `tests/src/browser/Isolation.test.ts`, `ScrollLock.test.ts`, `Backdrop.test.ts`, and `Swipe.test.ts`.
- `src/browser/types.ts`: only the remarks the change makes false.
- `guides/veneer.md`: only the sentences about these four classes that the change makes false.
- `tmp/j-release-primitives/`.

**Shared (report-only).** `tests/setupBrowser.ts`. Return a patch.

**Off-limits.**
- Every other file, including:
  - `Lifetime.ts` and `HostSnapshot.ts`;
  - the owners `Modal.ts`, `Offcanvas.ts`, and `Carousel.ts`, and their tests, which you run and do not edit;
  - J-RELEASE-RECORD's files.
- The vendored files, which the `scaffold repair` command restores: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.**
- Every case that pins a latched `destroy`, or a `save` before a write that changes nothing.
- The owners' cases that read a primitive's release order.

Find the rest by running the four primitives' test files, then `Modal.test.ts`, `Offcanvas.test.ts`, `Carousel.test.ts`, and `Delegate.test.ts`, after the change.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the witnesses' red readings at `BASE_TIP`, each naming its assertion;
- per class:
  - what it holds, and whether each release can run consumer code;
  - each `save` removed or kept, with the reason;
- the files touched;
- each case's red and green readings;
- a mutation table:
  - each class's latch restored;
  - `snapshot.write` in `Isolation`'s claim replaced by `save` followed by a direct write;
  - each join moved after the class's first consumer code;
  - each red reading names an assertion;
- the owners' scoped runs;
- the acceptance output, verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report in each of these cases:
- an owner's test needs an off-limits edit to stay green;
- a witness conflicts with E24's returning step;
- the ScrollLock referral needs a design choice.

You decide the private names, the case titles, and where each case sits.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. `npm run test:guides` and `npm run test:setup:browser` exit 0.
3. The four primitives' test files pass in scoped runs, and so do `Modal.test.ts`, `Offcanvas.test.ts`, `Carousel.test.ts`, and `Delegate.test.ts`.
4. Every witness reads red at `BASE_TIP` by an assertion, and green after.
5. No class keeps a `destroy` latch that returns before its pending releases finish.
6. Every mutation reddens its proof by an assertion.

**Observations, not criteria.** The whole suite, which the Orchestrator runs after you exit.

## Review evidence

The Orchestrator commits your work, replays it, and gives the audit lanes the diff, the status, your report, and its replay.
