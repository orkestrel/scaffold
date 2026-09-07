# Absorption brief — D7.guide terrain: the guide package under its own equality gate

## Role and engine

`grok`, the Cursor Grok bridge (the Claude-side driver launches the Cursor CLI, carries this brief across unaltered, journals the run under `tmp/grok/`, and returns the distillate untouched with the journal path and session id; the driver reads nothing at absorption depth and answers nothing from its own engine). Read-only: no edit, no command that writes, no install. Perform the assignment directly and spawn nothing.

## Question

What must change in the `@orkestrel/guide` checkout at `/home/user/fleet/guide` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `b7dc578`) for that package to pass the equality gate scaffold's D4 landed and to run the seed scaffold's D5 vendored, and what does the fleet's per-package `tests/guides.test.ts` look like today? Return a distillate with `file:line` pointers, no raw dumps, under the headings below.

## Read

- The contract the gate enforces: `/home/user/scaffold/.claude/rules/documentation.md` § Parity (the equality bullet and the voice bullet), `/home/user/scaffold/tests/guides.test.ts:160-215` (the equality case, the pin, the README case), `/home/user/scaffold/scripts/docs.ts:1-60` and `:380-455` (what the seed reads and prints), `/home/user/scaffold/.orkestrel/campaign/docs-parity/plan.md` § Re-baseline (after D6's audit round) and § Re-baseline (after D6-fix-2 returned), `/home/user/scaffold/.orkestrel/campaign/docs-parity/d6-audit-objective.md` § Findings outside the claims (A, B, D) and `d6-audit-subjective.md` § Findings (C).
- The guide checkout: `/home/user/fleet/guide/guides/guide.md` (every table's column headings, every `##` heading that holds a fence, the H1 blockquote), `/home/user/fleet/guide/README.md:1-20`, `/home/user/fleet/guide/package.json` (`version`, `scripts`, `devDependencies`, `exports`), `/home/user/fleet/guide/tests/guides.test.ts` (whole; how it substitutes `@src/core` for the package name, what it asserts), `/home/user/fleet/guide/tsconfig.json` (`paths`), `/home/user/fleet/guide/src/core/index.ts` (the export list), `/home/user/fleet/guide/src/core/helpers.ts` (`extractExamples` and `collectTitles` — how a class declaration's own `@example` is or is not collected; cite the lines), `/home/user/fleet/guide/src/core/types.ts` (`Drift`, `SourceExample`, `GuideFence`, `MethodGroup`).
- The fleet: for each checkout under `/home/user/fleet/*/` that has a `tests/guides.test.ts`, the file's import of the readers (`@orkestrel/guide` or `@src/core`), whether it already calls `findDrift`, and its guide's compared column headings (`Summary` or another word) — one row per package.

## Distillate headings

1. **The guide's own tables.** Every table in `guides/guide.md` whose compared column is not headed `Summary` (`Behavior`, `Shape`, `Signature`, `Builds`, `Returns`, or other), with the section and line, and whether its cells are noun phrases or verb-first sentences.
2. **The guide's own gate.** What `tests/guides.test.ts` asserts today, how it reaches the readers, and what adding the `findDrift` equality case, the pin, and the README-tagline case would need (the import path, the inventory, the manifest name for the own guide).
3. **The tagline and the pitch.** The H1 blockquote of `guides/guide.md` and of `README.md`, verbatim, and whether each is a noun phrase.
4. **The class-block limit.** With `file:line` in `src/core/helpers.ts`, whether `examples()` collects a class declaration's own `@example` block, and what a change to collect it would touch (types, helpers, guide rows, tests).
5. **Running the seed here.** What `npm run docs` needs in the guide checkout: the `docs` script (absent today), the self-reference through `exports` to `dist/` (P13 in `/home/user/scaffold/.orkestrel/campaign/docs-parity/orchestrator-measurements.md`), the root `tsconfig.json` own-specifier entries scaffold's generated root config now carries, and the build-before-docs order.
6. **The version and the release.** The current `version`, the last published version on the registry as `package.json`'s consumers pin it (read `/home/user/scaffold/package.json`'s `@orkestrel/guide` range), and what the bump to the next patch obliges in `guides/guide.md` or elsewhere.
7. **The fleet table.** One row per checkout with a `tests/guides.test.ts`: the readers' import, `findDrift` present or absent, the compared column heading, the guide's H1 blockquote present or absent.
8. **Unknowns and risks** you could not settle from reading, each with the command that would settle it.

## Output

The distillate as your final message, opening with `Journal: <path> Session: <id>` on its own line, then the eight headings. No process diary; no raw file dumps; every claim with a `file:line`.
