# SC-PROBE-2: close the SC-PROBE gates with the catalog's guide mirrors granted

Successor to `tmp/sc-probe-brief.md`. That unit stopped correctly on a deviation: `npx scaffold
catalog` rewrote `guides/process.md` and created `guides/probe.md` beside the catalog table. The
Orchestrator rules those writes in scope: a vendored dependency guide is a fetched mirror
(`.claude/rules/documentation.md`), `guides/probe.md` is probe 0.0.1's published guide, and the
`guides/process.md` rewrite is that mirror refreshing to process 0.0.4. The regeneration is
authoritative, as the original brief's Unknowns section ruled. This unit finishes the acceptance
criteria the deviation interrupted. No further design decisions remain.

## Role and engine

`builder`, Claude Sonnet, native in `/home/user/scaffold`, the sole writer in this checkout.

## Objective

Close the original SC-PROBE acceptance criteria on the tree as it stands, keeping every edit the
first unit landed and both catalog-written guide files.

## Context

- The tree carries the first unit's edits uncommitted. `git status --short` at dispatch:
  modified `.claude/agents/orkestrel.md`, `.mcp.json`, `guides/process.md`, `package-lock.json`,
  `package.json`, `src/core/constants.ts`, `tests/src/core/compilers.test.ts`,
  `tests/src/core/fixtures/setup-false-manifest.txt`; untracked `guides/probe.md`.
- The first unit's report is at `tmp/sc-probe-report.md`; its item 5 already ran
  `test:src:core` green (`Test Files 8 passed (8)` / `Tests 316 passed (316)`).
- Read before acting: `tmp/sc-probe-brief.md`, `tmp/sc-probe-report.md`.

## The items

1. Run `npm run lint:check`; then `npm run check`; then `npm run format:check`. If `format:check`
   fails, run `npm run format` once and re-run the checks in the same order until all exit 0.
   Record which files `format` moved, if any.
2. Paste `grep -n "probe" src/core/constants.ts .mcp.json package.json .claude/agents/orkestrel.md`
   showing every registration in place.
3. Run `npm run test:src:core`; paste the count lines.
4. Run `npm run test:guides`; paste the count lines. If a failure names `guides/probe.md` or
   `guides/process.md`, stop and report it — do not edit a guide mirror's prose by hand.
5. Run `npm run test:policy`; paste the count lines. Same stop rule.
6. Append a `## SC-PROBE-2 closure` section to `tmp/sc-probe-report.md` with the gate results, the
   grep output, and the final `git diff --stat` and `git status --short`.

## Scope

- Owned: everything the first unit owned, plus `guides/process.md` and `guides/probe.md` (accept
  their catalog-written content; `format` may rewrite them only if the formatter itself does), plus
  `tmp/sc-probe-report.md`.
- Off-limits: everything else. Do not bump the version. No commit, no push, no
  `git checkout`/`restore`/`stash`/`reset`/`clean`, no secrets.

## Execution

You perform this assignment directly and spawn no agent.

## Deviation contract

A red gate that names a file outside the owned list, or that requires editing a guide mirror's
prose, stops the unit with the standard report. A formatter rewrite of an owned file is yours to
accept and record.

## Output

The appended `## SC-PROBE-2 closure` section, and your reply ends with its content. No process
diary.

## Acceptance criteria (in order)

1. `npm run lint:check` exits 0.
2. `npm run check` exits 0.
3. `npm run format:check` exits 0.
4. The grep evidence shows the probe registration in `src/core/constants.ts`, `.mcp.json`,
   `package.json`, and `.claude/agents/orkestrel.md`.
5. `npm run test:src:core` exits 0.
6. `npm run test:guides` exits 0.
7. `npm run test:policy` exits 0.
