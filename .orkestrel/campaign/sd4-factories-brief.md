# Unit SD4 — zero-parameter project factories

Role: implementer. Engine: Claude Opus 5 (native). You perform this unit directly and spawn
nothing.

## Objective

In `/home/user/scaffold`, land ruling 4 of `.orkestrel/campaign/d2d-reconciliation.md` (read it
first; the site map is `.orkestrel/campaign/g-scaffold-seams.md` § 4). Baseline: commit 1b39fa0.

## Binding design

- Every emitted project factory in `CONFIG_TEMPLATES.factories` (`src/core/templates.ts` —
  `srcCore` at ~103 through `integration` at ~466, plus `appBrowser`) declares `(): UserConfig`.
  The `mergeConfig(base, options ?? {})` bodies drop the parameter and merge nothing at the row
  level.
- The four wrappers that pass options (`CONFIG_TEMPLATES.vites` at ~606, ~647, ~672, ~697,
  emitting `configs/src/vite.*.config.ts`) compose instead:
  `defineConfig(mergeConfig(srcCore(), { ... }))`, importing `mergeConfig` beside `defineConfig`.
- Scaffold's own materialized copies move with the templates: `vite.config.ts` (the eight
  factories it declares and its `projects` row — the rows stay bare identifiers) and
  `configs/src/vite.core.config.ts`, `vite.server.config.ts`, `vite.bin.config.ts`.
- `src/core/compilers.ts` needs no structural change (the projects join stays); touch it only if
  a factory emission site literally carries the parameter text.
- New pin in `tests/src/core/templates.test.ts`: no emitted factory declaration carries a
  parameter list, with a planted-parameter negative control (the check must redden on a planted
  `(options?: UserConfig)` in a scratch copy of the template text — prove the instrument can
  fail, in the test itself or in your report's recorded run).
- Fixtures under `tests/src/core/fixtures/` carrying generated config text move with the
  templates (check `setup-false-manifest.txt` and siblings).
- THE DIGEST HALF: `guides/scaffold.md` is NOT owned here (no guide sentence names the factory
  parameter — verify with a grep and report; if one does, stop per the deviation contract).
  `host.json` digests only host-inventory files — templates.ts is dist/src, not vendored;
  vite.config.ts and configs/ ARE this repo's own materialized copies but are NOT in the host
  inventory (verify with a grep of host.json for 'vite'; if any owned file IS inventoried,
  regenerate host.json with `npm run build:inventory` in the same change and name it).

## Verification (cheap-first)

1. Scoped oxfmt/oxlint on owned files.
2. `npm run check` — the WHOLE tree typecheck (this change moves scaffold's own vite.config.ts;
   the scoped core config does not read it).
3. `npm run test:src:core` (the templates suite with the new pin; record the planted-control
   red).
4. `npm run test:config` — the config suite proves the materialized root configuration still
   resolves its factories bare and calls them clean.

## Context and environment

Read `/home/user/scaffold/AGENTS.md`, `.claude/rules/typescript.md`, `.claude/rules/tests.md`.
Run from `/home/user/scaffold`; `node_modules` installed; Vitest runs on the host (you are a
native agent — the suites run for you).

## Scope

- Owned: `src/core/templates.ts` (the factories and vites template blocks), `vite.config.ts`,
  `configs/src/vite.core.config.ts`, `configs/src/vite.server.config.ts`,
  `configs/src/vite.bin.config.ts`, `tests/src/core/templates.test.ts`,
  `tests/src/core/fixtures/**` (only rows carrying generated config text), `src/core/compilers.ts`
  (only if a parameter text lives there), `host.json` (only per the digest rule).
- Off-limits: `tests/config.test.ts` (vendored), everything else. No commits, installs,
  tree-wide mutating commands.

## Deviation contract

Stop and report if: a guide sentence names the factory parameter; the config suite's name-keyed
factory lookup breaks (it must not — the rows stay bare identifiers); Vitest rejects a
zero-parameter row at runtime (evidence: the config suite run). Ancillary wording is yours.

## Output

Final message = report: what changed (file:line per region), the planted-control red, gate
tails, `git diff --stat`, `git status --porcelain`, deviations or none.
