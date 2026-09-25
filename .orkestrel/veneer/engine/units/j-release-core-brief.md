# Unit J-RELEASE-CORE — `Lifetime` and the change-aware snapshot write, with `Button` as their first consumer

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree. This is judgment-bearing mechanism work. It runs natively because its proofs run in Chromium, which the Astra bench sandbox cannot start (Bench law 5, the E23 precedent).

## Objective

Veneer has one `Lifetime` mechanism and a change-aware `HostSnapshot.write`, both exactly as decision E35 rules. `Button` is their first consumer:
- a `destroy()` nested in a restoration reaction returns only after the button's host is restored;
- a button that wrote nothing restores nothing.

## Context

**Evidence.**
- Decision E35 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` is this unit's law. Read all of it. It names the invariant, the bound, the consumer's interface, the `Lifetime` contract, the membership through `signal`, the save moment, and the E25 narrowing.
- The design round's two proposals are background. Where either disagrees with E35, E35 wins:
  - `units/j-release-design-3-planner-proposal.md`, whose section 2 gives a draft `LifetimeInterface`;
  - `units/j-release-design-3-analyst-proposal.md`, whose section 2 gives the enrollment rules and the resumable-release obligations.
- The sweep maps are the terrain: `units/j-release-sweep-s5-map.md` (Button, row B1 and witness (e)) and `units/j-release-sweep-s6-map.md` (`HostSnapshot`, rows 1 to 7, 15, and 16).
- Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
- The code at Veneer `63eabbd`:
  - `src/browser/Button.ts`: the constructor saves the `pressed` token and `aria-pressed` before any write (around line 60). `destroy` opens with `if (this.#controller.signal.aborted) return` (around line 114).
  - `src/browser/HostSnapshot.ts`: `save`, `restore`, `clear`, and the shared records.
  - `src/browser/helpers.ts`: `recordHostWrite`, around line 950, compares the caller's value with the platform's reading around line 965.
  - `tests/src/browser/index.test.ts`: the sorted export list of the browser barrel, around line 102, which gains `Lifetime`.
  - `guides/veneer.md`: the Surface table rows around lines 62 to 72, `#### ButtonInterface` around line 358, `#### HostSnapshotInterface` around line 379, and `### Ownership and restoration` around line 921.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`: types first, "Centralize by kind", "No superfluous wrappers", "Minimal public API", "No compatibility shims", and "Greenfield".
- Every file under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/` that the change touches, at least `names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `browser.md`, and `documentation.md`.
- `decisions.md` § E13 with every amendment, § E24 with every amendment, § E25, and § E35.
- Skill: none. Guide: `guides/veneer.md`.

**Installed primitives.** Read these declarations first:
- `@orkestrel/test`, under `node_modules/@orkestrel/test/dist/src/`, for every wait and recorder in tests;
- `@orkestrel/contract`, under `node_modules/@orkestrel/contract/dist/src/core/index.d.ts`.

E35 records that no export fits the ledger. A helper, guard, or recorder whose job an installed export does is a defect.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core`, on `unit/release-core`, cut from Veneer `main` at `63eabbd`, with `node_modules` installed.
- A foreground call is capped at 10 minutes.
- Write each program to a file under `tmp/j-release-core/` or `tmp/probe/`, and run the file. Use no heredoc, no `python -c`, and no `node -e`.
- Run one test file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

**Measurements.** Take these before any source edit, and record each reading:
1. Run `npm run test:policy`, and record whether a new public name `Lifetime` and a static member `join` would clear the fleet's surface rule. If `join` collides, choose another single word and record why.
2. B1, the S5 map's witness (e): `b = new Button(host); host.setAttribute('aria-pressed', 'mixed'); b.destroy()` removes the attribute. Write it as a case, and record its red reading.
3. A nested drain: a custom-element host whose `attributeChangedCallback`, reacting to the button's first restoration write, calls `destroy()` again and reads the host. Record what it reads at `63eabbd`.

**Control identifiers.** The map row labels B1, D-SAVE, and the others stay in the records. Name each test for what it proves.

**Standing conditions.**
- `tests/src/styles/elements/button.test.ts` reads red on `main` on this host, as a standing row. It is not this unit's.
- Other units write in their own worktrees, and this unit touches none of their files:
  - J-SAMEWAY-ENGINES-B owns `Dropdown`, `Tooltip`, `Popover`, and `Placement`;
  - J-MOTION-PROOFS-B owns `Carousel.ts` and the Collapse, Toast, Tab, and Carousel tests;
  - J-ORACLE-FIX-OFFCANVAS owns `Offcanvas.ts`.
- Their landings merge `types.ts` and `guides/veneer.md` by hunk.
- `recordHostWrite` keeps its signature in this unit, because its callers are in files those units own (E35, unit 2a).

## Unknowns

- Whether `HostSnapshot.save` still has a caller after `Button` moves to `write`. Every other engine still calls it, so it stays, and J-RELEASE-RECORD and the family units remove the callers. Report the call sites you see.

## Scope

**Owned.**
- `src/browser/Lifetime.ts` (new).
- `src/browser/HostSnapshot.ts`: the `write` member and what it needs.
- `src/browser/helpers.ts`: the one predicate for "the write changes the target", extracted and shared by `recordHostWrite` and `HostSnapshot.write`. The body of `recordHostWrite` may call it. Its signature does not change.
- `src/browser/Button.ts`.
- `src/browser/types.ts`: `LifetimeInterface`, `HostSnapshotInterface`'s `write`, and the `Button` contract's summary and remarks. Put reusable types there first.
- `src/browser/index.ts`: the barrel row for `Lifetime`.
- `tests/src/browser/Lifetime.test.ts` (new), `HostSnapshot.test.ts`, `helpers.test.ts`, `Button.test.ts`, and `index.test.ts`.
- `guides/veneer.md`: the Surface rows for the new exports, `#### ButtonInterface`, `#### HostSnapshotInterface`, a `#### LifetimeInterface` section, and `### Ownership and restoration`'s save and drain paragraphs.
- `tmp/j-release-core/` and `tmp/probe/`.

**Shared (report-only).** None.

**Off-limits.**
- Every other file under `src/**` and `tests/**`, including every other engine.
- The vendored files, which the `scaffold repair` command restores: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.**
- `index.test.ts`'s export list.
- The guide's Surface table and its parity with the TSDoc, which `tests/guides.test.ts` asserts.
- Every `Button.test.ts` case that pins a restoration of state the button never wrote.

Find the rest by running `npm run test:guides`, `npm run test:setup:browser`, and the owned test files.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- each measurement's reading, and the answer to the unknown;
- the contract as landed: `LifetimeInterface` and `HostSnapshotInterface.write`, verbatim from `types.ts`;
- the files touched;
- the red-first proofs: each case's title, its red reading at `63eabbd` naming the assertion, and its green reading;
- a mutation table. For each load-bearing line, the mutation that removes it and the red reading, which names an assertion. Cover at least:
  - the drain running on a nested call;
  - an entry ending only while it is the same entry;
  - newest first;
  - `hold` after destruction began;
  - the drain continuing past a throwing release;
  - `write` creating no record for a write that changes nothing;
  - `write` joining a live record;
  - `Button`'s claim release before the drain;
- the acceptance output, verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when:
- E35's contract cannot be built as ruled;
- a change needs an off-limits file;
- the policy gate refuses a name and no single-word alternative clears it.

You decide and record:
- the static member's name, if `join` collides;
- the file layout of `Lifetime`'s private helpers, within the centralization rules;
- the case titles.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. `npm run test:policy`, `npm run test:guides`, and `npm run test:setup:browser` exit 0.
3. `Lifetime.test.ts`, `HostSnapshot.test.ts`, `helpers.test.ts`, `Button.test.ts`, and `index.test.ts` pass in scoped runs.
4. `Button.destroy` does not open with a whole-method latch. A nested `destroy()` inside a restoration reaction returns with the host restored. A button that wrote nothing restores nothing (B1).
5. The E25 narrowing holds for `write`:
   - a write that changes nothing joins a live holder's record and creates none;
   - a second holder's destruction writes nothing while the first lives;
   - the last holder writes the earliest value back.
6. Every mutation in the table reddens its proof by an assertion.

**Observations, not criteria.** `npm run test:src` and the whole suite, which the Orchestrator runs after you exit.

## Review evidence

The Orchestrator commits your work, replays the proofs and the mutations, and gives the audit lanes the diff, the status, your report, and its replay. The audit is `analyst` on Astra and `reviewer` on Opus 5.5.
