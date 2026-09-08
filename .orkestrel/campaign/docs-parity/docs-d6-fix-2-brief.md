# Unit D6-fix-2 — converge-close, successor of D6-fix: the seed vendored uniformly again, then the two reds and the three findings

Supersedes `d6-fix-brief.md`, whose N1 stopped on a deviation (`d6-fix-report-deviation.md`): after the fleet total's filter, one `src:bin` case still failed because a guideless target created by `new` no longer carries the seed, so every online `repair` fetches it from upstream as a permanent difference (`src/bin/CLI.ts:641-660`, `tests/src/bin/CLI.test.ts:729`). The Orchestrator ruled the guides gate on the seed (D5-fix's K3) reverted: the seed is vendored into every workspace like the other hooks, and only the `docs` script selects with `guides`. N1's filter is reverted with it. N2 to N5 stand as D6-fix wrote them.

## Role and engine

`builder`, Sonnet, a native Claude Code subagent. Sole writer in `/home/user/scaffold`, with no other unit live. Perform the assignment directly and spawn nothing. Apply the items exactly as written; stop and report on any deviation.

## Read first

`/home/user/scaffold/AGENTS.md`; `.claude/rules/tests.md`; `.claude/rules/typescript.md` § TSDoc; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d6-fix-brief.md` (N2 to N5, unchanged here) and `d6-fix-report-deviation.md`; `src/core/compilers.ts:1560-1605` (`blueprintToHostArtifacts`); `tests/src/core/compilers.test.ts:1780-1802`; `tests/src/core/helpers.test.ts:310-320`; `tests/src/core/Compiler.test.ts:62-75`; `tests/setupServer.ts:18-24` and `:1515-1524`; `guides/scaffold.md:1036-1041` and `:1243-1249`; then D6-fix's § Read first for N2 to N5.

## Items

- **N0a. The seed is planned for every blueprint.** In `blueprintToHostArtifacts` (`src/core/compilers.ts` about `:1599-1602`), `selected` becomes `selectHostPaths(HOST_PATHS, blueprint.name)` with no filter. Replace the doc block's `@remarks` paragraph that begins "The documentation-parity seed is the one vendored path a fact selects" with this paragraph, verbatim: "The documentation-parity seed is vendored like every other hook. The `docs` script {@link blueprintToScripts} emits and the `guides` project the root configuration registers select with `guides`, so a workspace that indexes no guides carries the seed and no script that runs it; `npm run check` there still resolves the seed's import, because every workspace declares `@orkestrel/guide`." In the `@example`, `createBlueprint('router', { guides: true })` becomes `createBlueprint('router')`. The description paragraph, the signature, and the name stay.
- **N0b. The cases follow.** `tests/src/core/compilers.test.ts:1787` becomes `vendors the documentation seed for every blueprint and emits its script with guides`: both `planned` and `withheld` contain `'scripts/docs.ts'`, `blueprintToScripts(indexed).docs` is the strip-types command, `blueprintToScripts(bare)` has no `docs`, and `expect(withheld).toStrictEqual(planned)`; rewrite its comment to say the seed reaches every workspace and the script alone selects with guides. `tests/src/core/helpers.test.ts:312-320`: keep the case, rewrite its comment to say the seed is selected like every other hook (no guides gate anywhere). `tests/src/core/Compiler.test.ts:71` and `:74` read the measured values with the seed planned (`40` and `22` per `d5-scaffold-seed-report.md` § P1; measure and record).
- **N0c. The fleet total is the whole host set again.** `tests/setupServer.ts:1518-1523` returns to the single original line `export const FLEET_ARTIFACT_COUNT = buildFleetManifest().entries.length + CORE_GENERATED_COUNT` with no comment above it, and the `DOCS_SEED_PATH` import D6-fix added at `:22` is removed if nothing else in the file reads it.
- **N0d. The guide.** `guides/scaffold.md` about `:1038-1040`: the sentence beginning "The seed is planned with `guides`" becomes "The seed is vendored into every workspace like the session-start hooks; the `docs` script that runs it and the `guides` project are emitted with `guides`, so a workspace that indexes no guides carries the seed and no script." About `:1247-1248`: "and the seed is selected by the blueprint's `guides` fact rather than by the name" becomes "and the seed, like the hooks, reaches every workspace". Re-wrap the touched paragraphs by hand to the file's width (the formatter preserves Markdown wrapping). Then `npm run docs` must exit 0 (the compared paragraphs did not change; if it reports a drift, run `npm run docs -- --to guide` and `npm run format`, and record the cell that moved).
- **N0e. `src:bin` green.** `npm run test:src:bin` exits 0 on all its cases; the CLI upstream case at `tests/src/bin/CLI.test.ts:729` reads `host.json` alone again.
- **N2, N3, N4, N5** exactly as `d6-fix-brief.md` states them.

## Standing conditions

As `d6-fix-brief.md` states, plus: `tests/setupServer.ts` carries D6-fix's N1 edit at dispatch (to be reverted by N0c); `npm run test:src:bin` is red on exactly one case at dispatch (`d6-fix-report-deviation.md`).

## Scope

- Owned: D6-fix's owned set plus `src/core/compilers.ts` (N0a's doc block and the one filter line, and N3's paragraph), `tests/src/core/compilers.test.ts` (N0b's case only), `tests/src/core/helpers.test.ts` (N0b's comment only), `tests/src/core/Compiler.test.ts` (the two tallies only).
- Off-limits, permitted commands, output, and the deviation contract: as `d6-fix-brief.md`, with `npm run test:src:bin` and `npm run test:src:core` permitted and the report at `/home/user/scaffold/tmp/units/docs-d6-fix-2-report.md`.

## Acceptance criteria, cheapest first

1. `grep -n "blueprint.guides || path" src/core/compilers.ts` prints nothing; `grep -n "DOCS_SEED_PATH" tests/setupServer.ts` prints nothing; `grep -n "and never a peer range" src/core/compilers.ts guides/scaffold.md` prints the block and the cell.
2. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
3. `npm run test:src:bin` exits 0 (every case); `npm run test:src:core`, `npm run test:src:server`, `npm run test:policy`, `npm run test:guides` exit 0.
4. `npm run docs` exits 0; `npm run build` exits 0; the inventory digest identical across a second `npm run build:inventory`.
5. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` exits 0 on the confirming run (record both runs' last lines).
