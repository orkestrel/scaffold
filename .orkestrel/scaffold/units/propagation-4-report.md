# Propagation-4 report

Stopped under the brief’s deviation contract: the required retirement sweep finds obsolete showcase paths in off-limits files. Implementation and core verification are complete within the edited scope; acceptance remains incomplete. The core suite passes 460 tests. The server suite reports 476 passed, 2 failed, and 7 skipped before inventory regeneration.

## Files changed

The closing hash comparison against the starting checkout identifies these changes:

- `src/core/compilers.ts` — application-mode scripts and factory selection, journey seeds and provided context, and the global setup proof and Node project registration.
- `src/core/templates.ts` — mode-aware showcase and journey factories and wrappers, arrival journeys, provided-context augmentation, global setup proof, and Sass folder partial barrels.
- `configs/helpers.ts` — application-mode resolution, SHA-256 page digest, and idempotent final-page stamping with malformed-input refusals.
- `.prettierignore` — replaces the obsolete showcase path with `showcase/`.
- `tests/src/core/compilers.test.ts` — mode, script, ownership, seed, global setup, and template expectations and controls.
- `tests/src/core/templates.test.ts` — mode-aware signatures, emitted typecheck control, global proof enumeration, and formatting coverage including a maximum-length Vue journey/showcase selection.
- `tests/src/core/constants.test.ts` — includes `STYLES_DEV_DEPENDENCIES` and the `sass` seed expectation.
- `tests/config.test.ts` — changes the showcase output expectation and adds application-mode and stamp helper cases beside the existing helper cases.

No file outside this owned set changed from the recorded baseline. Existing campaign edits are preserved. `host.json`, `package.json`, and the identity configurations retain their starting bytes. No commit, installation, or subagent occurred.

`demo/` does not exist, so no deletion ran. `tmp/probes/` is empty. `tmp/scratch-modes/` does not exist. Supporting scripts, readings, and this report remain under `tmp/units/propagation-4-*`.

## Added exports

The configuration leaf adds these exports:

- `resolveApplication` — selects a declared application; omission, `production`, and `test` select `browser`; an undeclared mode throws.
- `computeStamp` — hashes page bytes with the canonical build stamp line removed.
- `stampPage` — inserts or refreshes one final-page stamp and refuses repeated or malformed stamps and an absent standalone head-closing line.

The generated browser setup adds the `vitest` module’s `ProvidedContext` augmentation for `variant`, `variants`, and `capture`. The exported template object gains `tests.journey`, `tests.browser`, and `tests.globalproof`. Existing emitted `appShowcase` and `appJourney` exports receive the requested mode parameters.

## Regenerated configuration

None. The passing core suite includes the identity proof comparing this checkout’s configuration files against compiler output. No materialized configuration required different bytes, so there is no regenerated configuration diff to quote. `host.json` was not regenerated because execution stopped before `npm run build`.

## Scratch listing and results

Listing: none. The ownership stop occurred before scratch generation or installation.

Showcase builds: not run. Page existence, final digest equality, and sibling-page preservation remain unproved by a live build.

Journey runs: not run. The generated browser and Vue journeys have compiler assertions and formatting coverage, but no browser execution reading. The capture branch was not executed.

Configuration evidence: the core tests pass for mode scripts, wrappers, factory selection, journey seeds, and source-only extension controls. The emitted configuration typechecks. The installed reference `vite-plugin-singlefile/dist/esm/index.js` declares `enforce: "post"` at line 67 and `generateBundle` at line 68; the emitted stamp plugin follows it and also declares `enforce: 'post'`. A final-page runtime stamp remains unverified.

## Commands and results

The formatting population was:

```text
src/core/compilers.ts src/core/templates.ts configs/helpers.ts tests/src/core/compilers.test.ts tests/src/core/templates.test.ts tests/src/core/constants.test.ts tests/config.test.ts
```

The required gate readings on Windows were:

| Command | Exit | Test count |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --write <formatting population>` | 0 | none; 7 files |
| `npx tsc --noEmit --project tsconfig.json` | 0 | none |
| `npm run check:src:core` | 0 | none |
| `npm run check:src:server` | 0 | none |
| `npx oxlint --config .oxlintrc.json src tests/src configs` | 0 | none |
| `npm run test:src:core` | 0 | 460 passed |
| `npm run test:src:server` | 1 | 476 passed, 2 failed, 7 skipped |
| `npm run build` | not run | none |
| `npm run test:src:bin` | not run | none |
| `npm run test:config` | not run | none |
| `npm run test:guides` | not run | none |
| `npx oxfmt --config .oxfmtrc.json --check <formatting population>` | 0 | none; 7 files |
| `git diff --check` | 0 | none |

The ordered launcher used `npm exec --` for the `npx` commands. Its exact arguments, exits, and durations are recorded in `propagation-4-gates.json`; its unfiltered output is in `propagation-4-gates.log` and `propagation-4-gates.err`.

Additional readings were:

| Command or instrument | Exit | Test count |
| --- | --- | --- |
| `node tmp/units/propagation-4-state.ts` | 0 | none; starting hashes, status, stat, and diff recorded |
| `node tmp/units/propagation-4-align.ts` | 0 | none; owned expectations aligned |
| `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/compilers.test.ts tests/src/core/templates.test.ts tests/src/core/constants.test.ts`, initial run | 1 | 194 passed, 4 failed |
| Same touched-file command after alignment | 0 | 198 passed |
| Preliminary root TypeScript, scoped lint, and owned formatting commands | 0 on each run | none |
| `node tmp/units/propagation-4-finish.ts` | 0 | none; no unowned changes |
| `git status --porcelain`, `git diff`, and `git diff --stat`, starting and closing readings | 0 | none |
| Retirement `git grep` command quoted below | 0 | none; matches remain |

The initial touched-file failures concerned the global proof enumeration, emitted formatting, showcase signature expectation, and the typecheck mutation’s expected diagnostic. The subsequent touched-file run and full core run pass.

Long commands ran through `node .agents/skills/orkestrel-dispatch/scripts/launch.ts`: touched-file runs under a 180-second cap and ordered gates under a 900-second cap. No cap fired. The ordered run ended after the server failure in 41092 ms. The launcher and its command have exited.

The mode-selection claim passed type, lint, and runtime stages. Its control changed the Vue extension from the application axis to the source axis and failed the runtime assertion requiring `test:journey:vue`. Its closing line was:

```text
receipt probe:54dbc4c64b3f77c15c2f7853da7722eb:runtime:typescript@6.0.3:oxlint@1.86.0:vitest@4.1.11:tsconfig.json@3ff9b49b1844f028f70056f15aabfc0d
```

This receipt covers journey script selection, not browser execution or page stamping. The equivalent application and source-only controls are retained in `tests/src/core/compilers.test.ts`.

Guide failure lines: none observed; the guide command was not run.

## Deviations

The retirement criterion requires an unowned change:

- **Expected:** no obsolete showcase path remains in emitted files or scaffold’s tree, verified by a bare Git search.
- **Found:** the search matches an off-limits dependency guide and off-limits campaign records.
- **Evidence:** the following command and output.
- **Done:** removed the obsolete paths from owned implementation and expectation files; stopped after identifying the ownership conflict.
- **Not done:** changed no off-limits file; did not run build, configuration, CLI, guide, or scratch stages after the stop.
- **Hypothesis:** the retirement criterion intended to exclude fetched guide mirrors and historical campaign records, but the brief states no such exception.

The command was:

```text
git grep -n -E 'dist/showcase|demo/showcase\.html|scripts\.show\b|"show"[[:space:]]*:'
```

Its bare output was:

```text
.orkestrel/veneer/units/foundation-audit-claims.md:23:- The checkout differs from the scaffold checkout's vendored copies in five files: `configs/helpers.ts` (+139/−7: the `vue` environment admitted to `isWorkspaceBoundaryModule`, `environmentPathError`, `environmentSourceError`, and `environmentBoundary`; new `isVueBuildExternal`, `isCoreBuildExternal`, `showcaseBuildOutput`, `showcaseHtmlEntry`, `showcaseHtmlPresent`, `journeyTestInclude`), `tests/config.test.ts` (+47/−1), `tsconfig.json` (paths), `.oxlintrc.json` (+40, an `app/vue/**` import-restriction block), `.prettierignore` (`showcase/` for `demo/showcase.html`). `ROADMAP.md` § Configs states that `scaffold repair` can restore four of them.
.orkestrel/veneer/units/foundation-audit-claims.md:52:21. **The showcase outputs are gated.** `showcase/browser.html` and `showcase/vue.html` are committed build outputs; state which gate fails when they are stale relative to `app/browser` and `app/vue`, whether `format:check` and `lint:check` skip them, and what a reviewer sees in every diff that rebuilds them (the `build-id` stamp). Compare with the scaffold convention `demo/showcase.html` produced by a `show` script after `format`.
.orkestrel/veneer/units/foundation-audit-reviewer-verdict.md:137:    - `build:showcase` writes straight into tracked files. Scaffold's convention builds into `dist/showcase` and copies with `show` after format (`.claude/rules/workspace.md:246,259`).
guides/supervisor.md:2910:single-file `dist/showcase/index.html`, and `npm run show` formats, builds, and copies that artifact to
guides/supervisor.md:2911:`demo/showcase.html`.
```

The server run also recorded the expected inventory mismatch before build:

- **Expected:** the server proofs read host bytes matching `host.json`.
- **Found:** the edited vendored files have digests different from the starting inventory.
- **Evidence:** `tests/src/server/helpers.test.ts:1643` reports `ScaffoldError: The vendored host cannot read the declared file at configs/helpers.ts`; `tests/src/server/helpers.test.ts:2539` reports differing inventory digests for `configs/helpers.ts`, `.prettierignore`, and `tests/config.test.ts`.
- **Done:** recorded the failing command and counts without weakening either proof.
- **Not done:** inventory regeneration and the matching server rerun; the ownership stop preceded them.
- **Hypothesis:** running the prescribed build will align the inventory with the edited vendored bytes.

Other deviations: the setup-browser augmentation was absent in the starting generator and is added with the journey seed. Scaffold has no browser application or showcase scripts to retire from `package.json`. The configuration helper cases are written but remain unexecuted. No live showcase, journey, or capture result is claimed.
