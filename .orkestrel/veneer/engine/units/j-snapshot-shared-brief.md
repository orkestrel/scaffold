# Unit J-SNAPSHOT-SHARED — one record per saved target across snapshots, written back by its last holder

## Role and engine

`opus` on Opus 5.5, a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash), the sole writer in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/snapshot-shared` (branch `unit/snapshot-shared`, cut from Veneer `main` at `3acad4c`, the J-GUARDS landing; `npm ci` already run). The work is objective and routed native because its proofs run in a browser, which the Astra bench sandbox cannot launch (E25).

## Objective

Implement E25: every snapshot that saves one attribute, class token, or inline property of one element shares one record of it, and only the record's last holder writes the earliest saved value back, so the `#### Tab` and `#### Carousel` bounds close as defects.

## Context

**Read first, in order.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, and `documentation.md` in `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`; in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`: `decisions.md` § E13 and its amendments, and § E25 (binding; where this brief and E25 differ, E25 wins and you stop to report); then `units/j-snapshot-shared-design-planner-proposal.md` (the reproducers, the proof list 1 to 9, the `Tab` joins) and `units/j-snapshot-shared-design-analyst-proposal.md` (the `clear()` member, the presence reading, the E13 timing amendment, its proof table). Their line numbers were read at `e0dee7e`; find each site by its symbol. Skill: none.

**What E25 requires, restated as obligations.**
- **S1 The shared record.** The first save made while no snapshot holds a target and no restoration has it pending reads the element; every later save joins; a restoration that is not the last holder writes nothing for that target and leaves the record; the last holder's restoration writes the earliest saved value. Takeover joins the pending record; a nested `restore` on the same snapshot writes back only what it owns; a throwing write withdraws the failing restoration's own entries and holdings only. Remove save-order machinery only where a mutation shows it unreachable.
- **S2 Presence as tested.** The partial-cleanup behaviour `HostSnapshot.test.ts` pins stays; correct any sentence that says only the last holder judges a removal.
- **S3 `clear()`.** `HostSnapshotInterface.clear(): void` relinquishes the snapshot's holdings and pending ownership without writing; a final clear forgets the record; a repeated clear does nothing. `Alert`'s successful close calls it where it ends its lifetime without restoring.
- **S4 `Tab` joins.** A tab joins the record of every initial attribute its list's plan names, whether it writes it or finds it already written.
- **S5 The composition the rule changes.** A tooltip destroyed while a popover on the same trigger lives: run it as a case, read what `aria-describedby`, `title`, and `aria-label` hold, and close any reference to a removed tip in this change.

**Proofs (red first on your base, with the command and the failing count, then green).** The planner proposal's proofs 1 to 9 (HostSnapshot shared-record orders per category, the rewritten bound case, the save joining a non-last holder's restoration, the nested re-entry with a shared target, the Delegate tab reproducer clicking the active control first, the two-tab destruction, the carousel replacement with the item reaction, the carousel plus consumer swipe), the analyst proposal's `clear()` and Alert rows, and S5's case. Name every existing expectation your run finds changed; any change outside `HostSnapshot.test.ts`'s reading around its bound case and its stamp-titled case is a stop.

**Host.** Windows 11; Git Bash (`npm` and `npx` resolve to the `.cmd` shims); Chromium 153.0.8010.12. Write each multi-step program to a file and run the file; no heredoc, no `node -e`.

**Measurements.** Take first: the red reading of the Tab and Carousel reproducers on your base.

**Standing conditions.** J-SAMEWAY writes `Modal.ts`, `Offcanvas.ts`, `Backdrop.ts`, their tests, and the `Modal*`, `Offcanvas*`, and `Backdrop*` slices of `types.ts` in another worktree beside you. `HostSnapshot.test.ts` prints an uncaught `DOMTokenList` error on purpose in one passing case.

## Unknowns

- Whether folding `#pending` into the shared record or keeping it with last-holder publishing is safer against the interleaving cases: decide by the cases and record why.
- What S5's composition reads today: run it first.

## Scope

**Owned.** `src/browser/HostSnapshot.ts`; `src/browser/types.ts` for `HostSnapshotInterface` and `HostSnapshotTarget` only; `src/browser/Alert.ts` (the successful close and its TSDoc); `src/browser/Tab.ts` (the initial saves and the class TSDoc sentence); `src/browser/Tooltip.ts` for S5 only; `tests/src/browser/HostSnapshot.test.ts`, `Tab.test.ts`, `Alert.test.ts`, `Tooltip.test.ts` and `Popover.test.ts` (S5's case only), and the new cases only in `Delegate.test.ts`, `Carousel.test.ts`, and `Swipe.test.ts`; `guides/veneer.md` for § Ownership and restoration, the `HostSnapshotInterface` Surface and Methods rows, and the restoration sentences of `#### Tab`, `#### Carousel`, `#### Alert`, and `#### Tooltip`; `tmp/j-snapshot-shared/**`.

**Shared (report-only).** `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`: return an exact patch for any shared table.

**Off-limits.** `Modal.ts`, `Offcanvas.ts`, `Backdrop.ts` and their tests (J-SAMEWAY); `Isolation.ts`, `ScrollLock.ts`, `Delegate.ts`, `Swipe.ts`, `Carousel.ts`, `Popover.ts`, every other engine; `helpers.ts`, `validators.ts`, `constants.ts`, `sanitizers/**`; `tests/setupPolicy.ts`, `tests/policy.test.ts`; `src/styles/**`, `tests/src/styles/**`, `app/**`; `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `configs/**`. A fix that needs one of them is a stop.

**What asserts the state this change ends.** `HostSnapshot.test.ts`'s bound case and stamp-titled case; `tests/src/browser/index.test.ts` if an export changes (none expected: `clear` is a member); `tests/guides.test.ts` for the `save`, `restore`, and `clear` Summary cells; the whole browser suite, run once.

**Tools and limits.** No install, commit, push, or discarding git command; no tree-wide `format`, `lint --fix`, or `build` beyond the acceptance chain's builds. Write the acceptance chain to `tmp/j-snapshot-shared/acceptance.sh` and run the file.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Your final message: the files touched; the measurements; per obligation S1 to S5, the cases that pin it with their red and green readings verbatim; each `types.ts` change as its own diff block; the folded-or-layered decision and why; the changed expectations you rewrote; the mutation table copied from the log; the acceptance output verbatim; `git status --short`; the deviation state.

## Deviation contract

Follow `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md` § Deviation protocol. Stop and report on: a case that shows takeover, re-entry, or failure withdrawal cannot hold under the shared record; an off-limits file a fix needs; a changed expectation outside the owned tests. Decide, record, and carry on for: folded or layered records; the order of cases; comment and summary wording.

## Acceptance criteria

1. `npm run check:src:browser`, oxlint, and oxfmt over the owned files, and `npm run check`, exit 0.
2. The Tab and Carousel reproducers end in the markup's values after the last destruction, and the live carousel keeps its `pointer` token.
3. Every proof read red on the base (command and count) and reads green; the existing takeover, re-entry, withdrawal, and presence cases stay green.
4. The mutation instrument `tmp/j-snapshot-shared/mutations.py` (whole-file runs, recorded digests, one row per mechanism: the shared read, the join, the non-last holder's silence, the last holder's write, `clear`, the Tab joins, S5) reddens each row's named case; one control row survives (`HELD`); `restored byte for byte`.
5. `test:guides` and `test:policy` exit 0; the guide uses one term, `record`, and neither bound sentence remains.
6. The status lists only owned files.

**Observations, not criteria.** The whole `test:src:browser` run and `test:setup:browser`, each once, with their `Tests` lines.

## Review evidence

The Orchestrator captures the diff and status, runs the scoped gates and the instrument, and audits with `analyst` on Astra (objective), `reviewer` on Opus 5.5 (subjective: the new member and the guide's restoration prose), and `checker` on Sonnet.
