# Unit D6-fix — converge-close: the two reds D6 surfaced and the three findings it could not reach

## Role and engine

`builder`, Sonnet, a native Claude Code subagent. Sole writer in `/home/user/scaffold`, with no other unit live. Perform the assignment directly and spawn nothing. Apply the items exactly as written; stop and report on any deviation.

## Read first

`/home/user/scaffold/AGENTS.md`; `.claude/rules/tests.md`; `.claude/rules/typescript.md` § TSDoc; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d6-scaffold-converge-report.md` (§ The findings that need the Orchestrator, § Shared-file patches, § Flagged claims 4); `tests/setupServer.ts:1500-1520`; `tests/distribution.test.ts:495-575`; `src/core/compilers.ts:1640-1690` (`replaceManifestRanges`); `src/server/Upstream.ts` and `src/core/errors.ts` (the `Upstream` and `ScaffoldError` class doc blocks and their `@example` bodies); `guides/scaffold.md` § Library (the `Upstream` and `ScaffoldError` fences); `src/core/Compiler.ts` and `src/server/Materializer.ts` (the shape D6 gave a class block whose `@example` adopted its fence, to mirror).

## Items

- **N1. The fleet total counts the paths a guideless workspace receives.** In `tests/setupServer.ts:1518`, exclude `DOCS_SEED_PATH` from the entries counted (import it from `@src/core` beside the existing imports) and add the comment the D6 report's F1 patch carries, so `FLEET_ARTIFACT_COUNT` matches the plan `blueprintToHostArtifacts` builds for a blueprint without guides. Red-first is on record: `instruments/d6/src-bin-before.log.txt` (8 cases in `tests/src/bin/CLI.test.ts`, each `expected 35, got 34`). After N1, `npm run test:src:bin` is green.
- **N2. The distribution proof's claim lists follow the built declarations.** Run `PATH=/opt/npm11/bin:$PATH npm run test:distribution` once to read the printed lists (about 77 seconds; npm 11 first on the path, per `orchestrator-measurements.md` § M8), then bring the `glossed`, `elided`, `undriven`, and `driven` expectations at `tests/distribution.test.ts:495-575` to what the build prints, in the built declarations' own source order: D6's example rewrites removed `catalogToLayers(entries)[0]`, `createBlueprint('Router').name`, and `stageHost(...).length` from the glossed set and added the rows the D6 report's F2 names; `driven` gains `blueprint.version // '0.0.1'` and `blueprint.engines // '>=22.12.0'` and loses `scaffolding.plan?.hash?.length // 16` and `createBlueprint('router', { src: ['core'] }).version // '0.0.1'`. Keep every control row the lists end with. Record the run's printed lists in the report, then run the same command again and record it green.
- **N3. `replaceManifestRanges` names its peer exclusion in the compared paragraph.** In `src/core/compilers.ts` (about `:1648`), the description paragraph becomes `Replaces the runtime and development dependency ranges in package manifest text, and never a peer range.` (one paragraph; `@remarks` unchanged). Then `npm run docs -- --to guide`, `npm run format`, and `npm run docs` at exit 0, so the guide cell carries the same sentence.
- **N4. Two class blocks adopt their fences.** The `@example` body of the `Upstream` class block (`src/server/Upstream.ts`) becomes byte-equal to the guide's § Library `Upstream` fence, and the `@example` body of the `ScaffoldError` class block (`src/core/errors.ts`) byte-equal to the guide's § Library `ScaffoldError` fence, the way D6 did for `Compiler` and `Materializer`; the readers do not compare a class block, so prove each by hand in the report with the two texts quoted, and keep the blocks untitled.
- **N5. The inventory and the gates.** `npm run build`; `sha256sum host.json` identical across a second `npm run build:inventory`; `npm run docs` at exit 0; `npm run test:guides` at exit 0.

## Standing conditions

D4, D5 with its fix rounds, and D6 are on this tree uncommitted, accepted or under audit; nothing else is live. `npm run test:src:bin` is red on exactly the 8 fixture-total cases at dispatch; `npm run test:distribution` under npm 11 is red on exactly the claim-list case at dispatch (the D6 report's prediction, to be read from the run). `node_modules/@orkestrel/guide` is a `--no-save` head start; never `npm install`.

## Scope

- Owned: `tests/setupServer.ts` (N1 only), `tests/distribution.test.ts` (the claim lists only), `src/core/compilers.ts` (N3's paragraph only), `src/server/Upstream.ts` and `src/core/errors.ts` (the class `@example` bodies only), `guides/scaffold.md` (by the seed's `--to guide` and the formatter alone), `host.json` (by regeneration alone).
- Off-limits: everything else.
- Permitted commands: scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run format`, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:bin`, `npm run test:src:core`, `npm run test:src:server`, `npm run test:guides`, `npm run test:policy`, `npm run docs` and `npm run docs -- --to guide`, `npm run build`, `npm run build:inventory`, `PATH=/opt/npm11/bin:$PATH npm run test:distribution` (twice: the reading run and the confirming run). Never `npm install`, lint `--fix`, a discard-class git command, or a commit.

## Acceptance criteria, cheapest first

1. `grep -n "DOCS_SEED_PATH" tests/setupServer.ts` prints the import and the filter; `grep -n "and never a peer range" src/core/compilers.ts guides/scaffold.md` prints the block and the cell.
2. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
3. `npm run test:src:bin` exits 0; `npm run test:src:core`, `npm run test:src:server`, `npm run test:policy` exit 0; `npm run test:guides` exits 0.
4. `npm run docs` exits 0; `npm run build` exits 0; the inventory digest identical across a second `npm run build:inventory`.
5. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` exits 0 on the confirming run (record both runs' last lines).

## Output

Write `/home/user/scaffold/tmp/units/docs-d6-fix-report.md`: each N with `file:line`, the two quoted class examples beside their fences, the distribution run's printed lists and the confirming run, each criterion with exit code and last lines, `git status --short` and `git diff --stat`, flagged claims, no count of a growable set. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when the distribution run prints a list the report's prediction does not explain, when N3's propagation changes any other cell, when a class fence cannot be found under § Library, or when a gate fails outside the owned files. The comment wording under N1 and the report's quoting form are yours to decide and record.
