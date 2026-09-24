# Unit J-GUARDS — event guards by detail shape, and a resolver that reads each declared key once

## Role and engine

`opus` on Opus 5.5, a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash); the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/guards` (branch `unit/guards`, cut from Veneer `main` at GUARDS_BASE, the J-INTEGRATION landing, which the Orchestrator fills at dispatch; `npm ci` already run). The options half is objective work routed native because its proofs are browser tests an Astra sandbox cannot host (E23).

## Objective

Implement E23 (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E23, binding; where this brief and E23 differ, E23 wins and you stop to report).

## Context

**Read first, in order.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, and `documentation.md` in `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`; § E23; the two lane proposals it reconciles, `units/j-guards-design-planner-proposal.md` (the adopted shape, the consumer list, proofs P1 to P6 and O1 to O6) and `units/j-guards-design-analyst-proposal.md` (its proof table and the resolver comparison), both in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`. Their line numbers were read at `b1d314d`, before J-INTEGRATION landed; find each site by its symbol. Skill: none.

**Host.** Windows 11; Git Bash (`npm` and `npx` resolve to the `.cmd` shims); Chromium 153.0.8010.12. The `prove` MCP server is not reachable to a subagent. For P3's type receipts, write a scratch `tsc` probe under `tmp/j-guards/` with its own tsconfig that extends `configs/src/tsconfig.browser.json` and sets `"exclude": []`; without that, the root exclude drops the probe silently. Confirm the probe is compiled with `--listFilesOnly`, and record both the refused and the admitted run. On this host write each multi-step program to a file and run the file.

**Standing conditions.** E6: no alias, re-export, `@deprecated`, or shim of a removed name. The element guard is `isInstance(x, HTMLElement)`. No dependency. Tests use real engines and events, and no mock, spy, or fake clock.

**Test in widening rings.** First the one file pinning the open obligation. Then the files the edit reaches: `validators`, `helpers`, `index`, each engine whose import changed, and `Popover`. Then the whole browser suite once, and `test:setup:browser` once. `tests/setupBrowser.test.ts` enumerates the setup module's exports; if you add a setup export, that list is yours.

**The obligations (each an edit and a proof; red first where the behaviour is new).**

- **G1 The guards.** Add `isBareEvent`, `isRelatedEvent`, and `RelatedDetail`. Remove `isCollapseEvent`, `isAlertEvent`, `isToastEvent`, `isTooltipEvent`, `isPopoverEvent`, `isTabEvent`, `isModalEvent`, `isOffcanvasEvent`, `TabDetail`, `ModalDetail`, and `OffcanvasDetail`. Move each entity's related-target meaning into its event map's summary. Update every consumer (the planner's list, re-derived by grep on your base). Proofs: P1, P2, P4, P5 (the export list, plus a named search for the removed names across `src/`, `tests/`, `app/`, and `guides/`), and P3 (the two type receipts that must fail).
- **G2 `TooltipProfile.guard`.** Remove the member and the two profiles' values. The engine binds `isBareEvent`. Remove the Popover profile's guard cases and instrument references with it.
- **G3 `resolveOptions`.** Read each key the parser table declares exactly once by property access; no loop over the options object. Make the parser table total over `T` in the signature where the compiler accepts it, and record the outcome. Proofs O1 to O6 in `tests/src/browser/helpers.test.ts` and `tests/src/browser/Tooltip.test.ts`, with O1, O2, O3, and O5 red first against the current body.
- **G4 Guide.** Update the Surface rows and the event-map Summary cells to match `findDrift`, and the prose that names the removed guards. Change nothing else in the guide.
- **G5 The instrument.** A whole-file mutation instrument `tmp/j-guards/mutations.py`: recorded digests, one row per mutation, the case each row must redden, one control row whose mutation must survive (`HELD`), and the receipt `restored byte for byte`. It carries the mutations P1, P2, P4, and O1 to O5 name.

## Scope

**Owned.**
- `src/browser/validators.ts` and `src/browser/helpers.ts`.
- `src/browser/types.ts`: the guard, detail, and event-map declarations, `TooltipProfile`, and the `resolveOptions` types.
- The engines `Collapse.ts`, `Alert.ts`, `Toast.ts`, `Tab.ts`, `Modal.ts`, `Offcanvas.ts`, `Tooltip.ts`, and `Popover.ts`, plus `Dropdown.ts`, `Carousel.ts`, and `ScrollSpy.ts` for the `resolveOptions` call sites only.
- Their tests: `tests/src/browser/validators.test.ts`, `helpers.test.ts`, `index.test.ts`, `Popover.test.ts`, `Tooltip.test.ts`, and each engine test whose guard import changes.
- `guides/veneer.md`, as G4 bounds it.
- `tmp/j-guards/**`.

**Shared (report-only).** `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`.

**Off-limits.** `Backdrop.ts`, `HostSnapshot.ts`, `Placement.ts`, `sanitizers/**`, `Delegate.ts`, and every other engine file; `tests/setupPolicy.ts` and `tests/policy.test.ts`; `src/styles/**`, `tests/src/styles/**`, and `app/**`; `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**Tools and limits.** No install, commit, push, or discarding git command. No tree-wide `format`, `lint --fix`, or `build` beyond the three builds the conformance gate needs. Write the acceptance chain to `tmp/j-guards/acceptance.sh` and run the file. The chain runs `check:src:browser`, oxlint and oxfmt over `src/browser`, `tests/src/browser`, and `guides/veneer.md`, `check`, the whole `test:src:browser`, `test:setup:browser`, `test:guides`, `test:policy`, the three builds, `test:conformance`, and `test:setup`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Return, as your final message:
- the files touched;
- per obligation, the case that pins it, with its red and green readings verbatim;
- the P3 type receipts, with the `--listFilesOnly` confirmation;
- every `types.ts` change as its own diff block;
- the mutation table copied from the log;
- the acceptance output verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md` § Deviation protocol. Stop and report on:
- a typecheck refusal E23's shape cannot satisfy, such as `bindEventMap` inference choosing the hooks' type;
- a guide Summary cell `findDrift` refuses that you cannot fix inside G4;
- an off-limits file you would have to edit.

Decide, record, and carry on for:
- the order of cases and declarations;
- the wording of comments and summaries;
- whether the total parser table compiles, with the fallback E23 names.

## Acceptance criteria

1. `npm run check` is green, and the P3 receipts show both refusals.
2. The named search finds none of the removed names.
3. O1, O2, O3, and O5 read red before and green after; P1, P2, P4, and O4 and O6 are green.
4. The whole browser suite and `setup:browser` are green, then guides, policy, the builds, conformance, and setup.
5. The instrument's rows each redden their case, the control holds, and the sources restore byte for byte.
6. The status lists only owned files.

## Review evidence

The Orchestrator captures the diff and status as `j-guards.diff` and `j-guards-status.txt`. The audit runs `analyst` on Astra (objective), `checker` on Sonnet, and `reviewer` on Opus 5.5 (the public names). The Orchestrator re-runs the instrument.
