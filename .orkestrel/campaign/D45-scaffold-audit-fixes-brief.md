# Unit D4-5 — `@orkestrel/scaffold`: the objective findings of audit AD4

## Role and engine

`sol` route: GPT-6 Astra, a `workspace-write` `codex exec` rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. Perform the assignment directly and spawn nothing. You
are the sole writer in this checkout while this unit runs.

## What AD4 found

The analyst (`AD4-audit-analyst.md`, staged beside this brief) executed two defects; the reviewer
(`AD4-audit-reviewer.md`) added design findings the Orchestrator adopts below. Read both, then the
D4 reports (`D43-scaffold-surface-rule-report.md`, `D41e-scaffold-inventory-baseline-report.md`).

## Carriers (close every one; each names its ruling)

1. **The `surface` rule accounts for every export or refuses (analyst 3).** `readPolicyDeclarations`
   in `tests/setupPolicy.ts` returns `[]` for `export namespace waitForCondition { … }` and omits
   the second declarator of `export const other = 0, waitForCondition = 1`, and the sweep near
   `:1666` trusts that reading. Ruling: cover every export form the installed reflector can parse
   (namespace, every declarator of a multi-declarator `const`/`let`, `enum`, `class`,
   `interface`, `type`, `function`, default-less re-export lists, `export * from` where it can be
   resolved), and where the reflector reports a form the reading cannot account for, refuse loudly
   as the barrel path already does — never pass over an export. Pin each form red first in
   `tests/setupPolicy.test.ts` with planted setup modules, including the analyst's two inputs and
   a star barrel over a namespace.
2. **A release build never establishes a baseline silently (analyst 4, reviewer 4).** An absent
   inventory makes `readSurfaceBaseline` return `undefined` and the stage records the current
   collisions as the baseline; `package.json`'s `build` rebuilds the inventory before any presence
   check, so deleting `host.json` and building resets the baseline. Ruling: `HostStageOptions`
   gains `establish?: boolean` (a binary switch, `AGENTS.md` § Design laws); with `establish`
   absent or `false` an absent inventory REFUSES the stage (`ScaffoldError('TARGET', …)` naming the
   inventory path and the option); with `establish: true` (the bootstrap of a fresh checkout, and
   the tests that build fixtures from nothing) an absent inventory establishes the baseline as
   today. The build script passes nothing, so a release build refuses. Pin red first: `refuses a
   stage with no inventory unless establishment is asked for`, `establishes the baseline when
   establishment is asked for`. Keep the shrink rule (a removed collision stages) and the growth
   refusal.
3. **The library face writes to no stream (F5).** `stageHost` writes the baseline message to
   `process.stderr` when `options.report` is absent. Default `report` to a no-op, and make
   `package.json`'s `build:host` script pass a sink (`report: (message) => console.error(message)`
   inside the existing `node -e` string — edit that one script line only) so the build log keeps
   the D4-1e evidence and a consumer calling `stageHost` gets silence. State the default in the
   TSDoc and the guide's option row.
4. **`readSurfaceBaseline(root, name = HOST_INVENTORY_PATH)` (F7, F8).** Match `readHostManifest`'s
   shape; `stageHost` passes `source` and `options?.inventory` directly. Delete `INVENTORY_NAME`
   (`src/server/constants.ts`) in favour of the existing `HOST_INVENTORY_PATH`
   (`src/core/constants.ts`), at every site; strike its Surface row and the option's default
   cell in `guides/scaffold.md`; update the TSDoc examples and the distribution expectation line
   for `readSurfaceBaseline` if its printed example changes (`tests/distribution.test.ts`).
5. **`readSurfaceCollisions` names its prerequisite and refuses uniformly (F9).** It loads
   `@orkestrel/guide` through `createRequire` and `@orkestrel/guide` is a development dependency of
   this package. State the prerequisite in `@remarks`; catch the resolution failure and refuse it as
   `ScaffoldError('TARGET', …)` naming the missing module, with a `@throws` row; pin it red first
   with a resolver the test controls (or record why it cannot be pinned hermetically and what
   control you ran instead).
6. **The vendored policy set keeps its own scratch (F3, F4).** `tests/setupPolicy.ts` imports
   `createScratch` from `@orkestrel/test/server` for `createPolicySurfaceFixture` while
   `createPolicyScratch` in the same file does that job (`.claude/rules/tests.md` § Shared test
   infrastructure names this file). Build the fixture on `createPolicyScratch`, drop the
   `@orkestrel/test/server` import and the `ScratchInterface` type import, return
   `PolicyScratchInterface`. Rename `POLICY_SURFACE_BARREL` → `POLICY_SURFACE_BARREL_PATTERN`
   (every sibling regex constant carries the suffix).

## Context

The tree after the D4 chain, U16 (a `capture*` rename in `tests/setupServer.ts` — leave it), and
the Orchestrator's `@orkestrel/guide` re-pin to `^0.0.19` (installed; `package.json` and the lockfile
moved — leave those lines). Read `tests/setupPolicy.ts` (the `surface` rule: `readPolicySurface`,
`readPolicyDeclarations`, `inspectPolicySurface`, `createPolicySurfaceFixture`,
`writePolicySurfaceHost`), `src/server/helpers.ts` (`stageHost`, `readSurfaceBaseline`,
`readSurfaceCollisions`, `readHostManifest`), `src/server/types.ts` (`HostStageOptions`),
`src/server/constants.ts`, `src/core/constants.ts` (`HOST_INVENTORY_PATH`), and `package.json`
scripts `build:host`/`build:inventory`.

**Installed primitives.** `@orkestrel/guide` 0.0.19 (`createGuide`, `createSource().surface()` —
read what forms its reflection reports), `@orkestrel/test` (`captureError`, `createScratch` — not
for the vendored set), `@orkestrel/contract` (`whereOf`, `attempt`), Vite `parseSync` (the barrel
reader; the TypeScript compiler API is forbidden by lint).

**Law and bench.** As D4-1e: PowerShell exec shell (`npm.cmd`), `prove` unreachable, network
denied, nine documented sandbox-only `Ollama setup` failures in `test:src:server`; do not run
`npm.cmd run build` (the Orchestrator regenerates `dist/` and `host.json` after you exit). Vitest
may refuse to write `.vite-temp` under the sandbox; if it does, report the exact error and run
the affected project's controls through a non-writing Node loader as the auditors did, naming the
substitution.

**Standing conditions.** `.orkestrel/` is the Orchestrator's; `guides/supervisor.md` is an
untracked mirror; `dist/` is from the last build.

## Scope

**Owned.** `src/server/helpers.ts`, `src/server/types.ts`, `src/server/constants.ts`,
`src/server/index.ts`, `tests/setupPolicy.ts`, `tests/setupPolicy.test.ts`, `tests/policy.test.ts`
(only if a pin belongs there), `tests/setupServer.ts` (fixtures), `tests/src/server/helpers.test.ts`,
`tests/src/server/validators.test.ts`, `tests/distribution.test.ts` (the printed-example line only),
`guides/scaffold.md` (Surface rows, option rows, TSDoc-mirrored summaries), `package.json` (the
`build:host` script string only). **Off-limits.** `src/bin/**`, `src/core/**`, `.claude/**`,
`.agents/**`, `.orkestrel/**`, `host.json`, `dist/**`, `package-lock.json`, everything else.

## Acceptance criteria

1. `npm.cmd run lint:check`, `check`, `format:check` exit 0.
2. `npm.cmd run test:policy` exit 0 with carrier 1's pins red first; `npm.cmd run test:setup` exit 0.
3. `npm.cmd run test:src:server` exit 0 beyond the documented sandbox failures, with carrier 2's
   and carrier 5's pins red first.
4. `npm.cmd run test:guides` exit 0.
5. Only owned files changed beyond the inherited state.

## Output

D4-1e's Output shape (touched files; diff stat; status; baseline; red-then-green per pin;
acceptance readings; rulings recorded; deviation state).
