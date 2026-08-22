# Unit read-sites: close the consolidation's optional-read sites

## Role and engine

Role `implementer` route `sol`, engine **GPT-5.6 Sol**, sandbox `workspace-write`,
rooted at `C:/Users/mikes/WebstormProjects/scaffold`. You perform the assignment
directly inside your sandbox and spawn nothing beyond the scoped test commands named
here. Read before editing: `AGENTS.md`, `.claude/rules/typescript.md`, `tests.md`.

## Objective

Close the seven typecheck errors the test-helper consolidation left at its
`scratch.read` call sites, using the ruled composition, and converge the
consolidation's unformatted hunks in the owned files, so the tree's root typecheck and
the owned files' format check both exit 0.

## The ruling that fixes the sites

`ScratchInterface.read` answers `string | undefined` deliberately — absence is
`undefined` — and `requireValue(...)` from `@orkestrel/test` is the supported
composition where a test wants a throw on absence. The dissolved wrapper's fused
non-optional `read` was ruled not adopted. Every fix below is that composition (or a
`requireValue` at the value's origin), never a non-null assertion, never an `as`, and
never a change to `ScratchInterface`.

## The sites, from the root typecheck of 2026-08-22

- `tests/src/bin/CLI.test.ts:419` — `workspace.read('fresh/package.json')` into
  `JSON.parse`.
- `tests/src/bin/CLI.test.ts:1184` — `workspace.read('target/package.json')` into
  `JSON.parse`.
- `tests/src/bin/CLI.test.ts:2938` — `current` possibly undefined at
  `current.split('\n')`; wrap at the value's origin read.
- `tests/src/bin/CLI.test.ts:3432` and `:3433` — `agent` possibly undefined; one wrap
  at the origin read covers both.
- `tests/src/bin/main.test.ts:170` — `manifest` (`string | undefined`) passed as
  `workspace.write` content; wrap at the origin read.
- `tests/src/server/validators.test.ts:98` —
  `computeDigest(workspace.read('AGENTS.md'))`.

Line numbers are from the measured run; re-read at your start and fix every error the
root typecheck actually reports in these files, which may have drifted a few lines.
Add the `requireValue` import from `@orkestrel/test` where a file lacks it.

## The formatter convergence

`tests/setupServer.ts` and `tests/src/bin/CLI.test.ts` carry unformatted consolidation
hunks (measured: an `@orkestrel/test/server` import, `SCRATCH_PREFIX` quoting, stray
blank lines, and `import {SCRATCH_PREFIX, type TestUpstreamReply}` spacing). Run the
mutating `npx.cmd oxfmt --config .oxfmtrc.json --write` scoped to EXACTLY the owned
files — never tree-wide — then confirm with `--check`.

## Scope

- Owned: `tests/src/bin/CLI.test.ts`, `tests/src/bin/main.test.ts`,
  `tests/src/server/validators.test.ts`, `tests/setupServer.ts` (formatting
  convergence only, no semantic edit).
- Standing: every `git status --porcelain` entry at your start — the tree carries an
  uncommitted campaign (units U1 through U3 of the fetch design) plus the
  consolidation; none of it is yours beyond the named fixes.
- Off-limits: `src/**`, every other test file, `host.json`, `guides/**`.
- No commits, no installs, no mutating git commands.
- Host facts: Windows 11; the `npm` PowerShell shim is blocked — `npm.cmd` and
  `npx.cmd` from the repository root; your sandbox denies network.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries; report before
   and after.
2. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0 with no output — the whole
   tree, no longer scoped.
3. `npx.cmd oxfmt --config .oxfmtrc.json --check` over the owned files exits 0;
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` over them exits 0.
4. The affected projects each exit 0 under
   `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project
   <name>`: `src:bin` and `src:server`; totals reported.

## Output

The complete diff, per-criterion exit codes and totals, the exact wrap chosen at each
site, and any deviation (expected, found, exact evidence, done or not done, at most
one short hypothesis). No process diary.

## Deviation contract

Stop on: a site whose fix needs more than the ruled composition; a semantic change
provoked by the formatter in `tests/setupServer.ts`; an off-limits file needing an
edit; a criterion unreachable. Import placement and wrap positioning within the ruling
are yours: decide, record, carry on.
