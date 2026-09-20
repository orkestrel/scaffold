# Unit U6 — successor brief 2: the fence routing and the gate chain

## What changed and why

This brief supersedes `tmp/codex/u6-brief.md` for the remainder of the unit; every section of
that brief stands except where this one says otherwise. The unit stopped because the guide
parity proof requires the three new Patterns headings in `ROUTED_FENCES` at `tests/setup.ts:71`,
and the original brief listed `tests/setup*.ts` as off-limits. That line was too broad: the
vendored set the `scaffold repair` command restores in this package is
`tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`
(`node_modules/@orkestrel/scaffold/dist/host/tests/` holds exactly those), so `tests/setup.ts` is
package-owned. This brief grants it for the registry entries alone.

The Orchestrator accepts, subject to audit, the unit's mechanism for an omitted media axis: the
`Emulation.setEmulatedMedia` command replaces the whole emulation state, so leaving an axis alone
means re-sending its effective reading. Keep it.

## Role and engine

Unchanged: `sol` on `gpt-6-astra` inside `codex exec --sandbox workspace-write` rooted at
`C:/Users/mikes/WebstormProjects/test`. Perform the assignment directly and spawn nothing. You
are the sole writer in this checkout.

## Objective

Finish U6: route the three fences, clear the lint diagnostic, run the full gate chain on managed
Chromium green, and prove the post-plant tree green on the whole browser project.

## Context

**The tree.** `HEAD` is `f49bc7f`; the working tree carries the U6 edits from the first run
(`git status --porcelain` lists `guides/test.md`, `src/browser/constants.ts`,
`src/browser/helpers.ts`, `src/browser/types.ts`, `tests/src/browser/helpers.test.ts`). Build on
that tree; do not undo it. The first run's report is `tmp/codex/u6-report.md`, its logs sit
beside it, and every plant is already removed.

**The registry.** `tests/setup.ts:71` declares `ROUTED_FENCES` as a frozen record mapping a
Patterns heading to the test file that transcribes its fence. Add these entries, in the record's
existing style, each mapped to `'tests/src/browser/helpers.test.ts'`:
`'Hold a control and read the pressed paint'`, `"Read a pseudo-element's paint"`,
`'Emulate reduced motion and print'`. The headings must match `guides/test.md` byte for byte.

**Test names.** The first run left the control identifiers in four case names
(`tests/src/browser/helpers.test.ts:945`, `:980`, `:3171`, `:3341`, each ending in a
parenthesized `PLANT-…` tag). A test is named for what it proves, never for the control that
specified it: remove each parenthesized tag and keep the descriptive name.

**The lint diagnostic.** The first run recorded `vitest(expect-expect)` at
`tests/src/browser/helpers.test.ts:1082` and `:3392` and added assertions to the sentinel cases
without re-running lint. Re-run it.

**Host.** Unchanged from the original brief: `npm.cmd run <name>`, `npx.cmd <bin>`, no network,
no `git` write, managed Chromium runs the browser project in this sandbox.

## Scope

**Owned.** Everything the original brief owns, plus `tests/setup.ts` for the `ROUTED_FENCES`
entries only. **Off-limits.** Every vendored path (`tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`), `configs/**`, `src/core/**`, `src/server/**`, `package.json`.

## Execution

1. Add the three `ROUTED_FENCES` entries.
2. `npx.cmd oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser tests/setup.ts`;
   fix any diagnostic inside owned files.
3. `npx.cmd oxfmt --config .oxfmtrc.json --write tests/setup.ts` and any file you edit.
4. Gates, in this order, recording each command's final lines: `npm.cmd run format:check`,
   `npm.cmd run lint:check`, `npm.cmd run check`, `npm.cmd run build`, `npm.cmd run test:src`
   (the whole `src:browser` project runs here, which is the post-plant green reading),
   `npm.cmd run test:policy`, `npm.cmd run test:config`, `npm.cmd run test:setup`,
   `npm.cmd run test:guides`. There is no `test:app` script.
5. Confirm `grep -c "hoverAccessible\|holdAccessible\|releasePointer\|stageMedia\|releaseMedia\|sendProtocol" dist/src/browser/index.d.ts`
   reads a positive count after the build.

## Output

Write `tmp/codex/u6-report-2.md` and return its content: the `ROUTED_FENCES` diff; the lint
re-run's final lines; each gate command's exit code and final lines; the `grep` reading; and every
deviation with expected, found, exact evidence, done or not done, and at most one hypothesis. Do
not restate the first report.

## Deviation contract

Stop and report on: a gate that stays red after your own fix inside owned files; a need to edit an
off-limits file. Decide, record, and carry on from: the wording of any assertion you add to a
sentinel case.

## Acceptance criteria

1. `format:check`, `lint:check`, `check`, `build` exit 0.
2. `test:src`, `test:policy`, `test:config`, `test:setup`, `test:guides` exit 0 on managed Chromium.
3. `git status --porcelain` lists only the owned files.

**Observations, not criteria.** Edge: the Orchestrator's run after you return.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the built `dist/`.
