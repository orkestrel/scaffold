# Unit D5 — scaffold-seed: the vendored `scripts/docs.ts` seed that reports drift and carries a summary or an example across

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent, holding the subjective lane's unit (the seed's command shape and its output voice). Sole writer in `/home/user/scaffold`. Perform the assignment directly and spawn nothing.

## Objective

Every scaffold target with guides gains `npm run docs`: a vendored `scripts/docs.ts` seed that reads the guide index, names every disagreement `findDrift` and the tagline read report, and on `--to guide` or `--to source` rewrites the named side through the readers and replacers `@orkestrel/guide` ships, writing files and nothing else. The gate (`tests/guides.test.ts`) keeps reporting; only the seed writes.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md` and its rule map: `.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/architecture.md`, `.claude/rules/patterns.md`, `.claude/rules/tests.md`, `.claude/rules/workspace.md`, `.claude/rules/portability.md`, `.claude/rules/documentation.md`, `.claude/rules/writing.md`.
2. `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` (Ruling 6), `plan.md` (decision 6 and every § Re-baseline), `d4-scout-distillate.md` § 3 and § 4, `d2-fix-report.md` (the replacers' miss shape, `locateComment`, `WRAP_WIDTH`), `d4-scaffold-gate-report.md` (the drift list over scaffold), and `guides/guide.md` at the installed head start (`node_modules/@orkestrel/guide/dist/host/guides/guide.md` if present, else the guide checkout's `/home/user/fleet/guide/guides/guide.md`) § The renderers and the replacers and § The check catalog.
3. The code: `src/core/constants.ts` (`HOST_PATHS` at `:132`, `EXECUTABLE_PATHS` at `:230`, `MINIMUM_NODE_VERSION` at `:482`), `src/core/helpers.ts` (`selectHostPaths` at `:458`, `nameToGuide`), `src/core/compilers.ts` (`blueprintToWritableScripts` around `:280-350`, the `test:guides` emission at `:349`, `nameToHostArtifacts` at `:1551`), `tests/guides.test.ts:49-73` (the inventory and the `inspected` records the seed mirrors), `tests/src/core/compilers.test.ts` (the manifest-script cases, `:1752` region for host paths), `tests/src/core/helpers.test.ts:100-220` (the path-partition cases), `.oxlintrc.json:441` (the `scripts/**` scope), `scripts/*.sh` (the sibling seeds' header voice), and the installed `@orkestrel/guide` declaration at `node_modules/@orkestrel/guide/dist/src/core/index.d.ts`.

## What is fixed

- **The seed is `scripts/docs.ts`, a `HOST_PATHS` row.** It joins `HOST_PATHS` after `scripts/ollama.sh` and stays out of `EXECUTABLE_PATHS` (node runs it). `build:host` stages it and `host.json` carries its digest, so `repair` restores it in every target.
- **The manifest script.** `blueprintToWritableScripts` emits `docs: node --experimental-strip-types scripts/docs.ts` when `blueprint.guides`, beside `test:guides`; scaffold's own `package.json` gains the same `docs` script by hand. The flag holds the floor `MINIMUM_NODE_VERSION` (22.12.0) declares; on Node 22.18 and later type stripping is on by default and the flag is inert. The seed uses erasable syntax only (no enum, no namespace, no parameter property), imports `@orkestrel/guide` and `node:fs`, `node:path`, `node:process` and nothing else, and reaches no scaffold module.
- **What the seed reads.** From the workspace root (the working directory): the files `tests/guides.test.ts` inventories (`src/**/*.ts`, `tests/**/*.ts`, `guides/*.md`, `*.md`), the concept index of `guides/README.md` through `parseManifest`, one `createGuide` and one `createSource({ files, module: entry.source })` per row, `findDrift(guide, source)` per row, and the pitch pair — `createGuide(README.md).tagline()` against the tagline of the guide whose spec is `guides/<manifest short name>.md`.
- **What the seed prints, with no flag.** One line per drift: the spec, the key, and each side's text or `absent`; one line for the pitch pair when they differ; then a closing line naming how many rows it read and how many disagreements it found as measured values. Exit 1 when any disagreement stands, 0 when none. Plain text, one fact per line, no colour, no table.
- **`--to guide`.** For each Surface or Methods drift whose source side is present, `replaceCell(guideText, key, sourceSummary)`; write the guide file once per row when any cell changed. An example drift and the pitch are reported, never written: the guide fence wins on example content, and the README is authored by hand (Ruling 6). A `replaceCell` miss is reported with its key and leaves the file unchanged.
- **`--to source`.** For each Surface or Methods drift whose guide side is present, `locateComment(fileText, key)` then `replaceSummary(block, guideSummary)` and `spliceSpan`; for each example drift whose guide side is present, `locateComment` then `replaceExample(block, example)`; write each source file once when anything changed. A miss from the locator or a replacer is reported with its key and leaves the file unchanged. The seed does not format; its closing line names `npm run format` as the next step after a write.
- **Exit codes after a write.** 0 when every disagreement was written; 1 when any disagreement or miss remains reported.
- **A single-word flag.** `--to` with the value `guide` or `source` is the whole option surface; any other argument prints a one-line usage and exits 2.
- **Tests, real and deterministic.** In `tests/src/core/compilers.test.ts`: the `docs` script is emitted with guides and absent without. In `tests/src/core/helpers.test.ts`: `scripts/docs.ts` is a host path, not a canon path, not an executable path. The seed itself is proven by running it as a child process (`node --experimental-strip-types scripts/docs.ts`) over a scratch workspace built by `createScratch` from a fixture carrying a concept index, one guide with a Surface table and a titled fence, a source file with doc blocks, a README with a blockquote pitch, and `node_modules/@orkestrel/guide` linked to this checkout's installed copy (a fixture wiring, not a distribution proof): the report run names each planted drift and exits 1; `--to guide` rewrites the cell and leaves every other byte; `--to source` rewrites the doc block and the `@example` body; a second report run over the written tree exits 0 for the summaries; a miss (a key with no locatable block) is reported and leaves the file. Place the cases in the Vitest project that already covers root-level behavioural proofs, and record which.
- **The guide.** `guides/scaffold.md` states the seed beside its sibling scripts (find where `scripts/deps.sh` and `scripts/codex.sh` are described and add the seed there) and in § Ownership and drift's paragraph on the equality gate: what it reads, what each direction writes, what it never writes, the exit codes, and `npm run format` after a write. `guides/README.md` is unchanged unless a row must name the seed.
- **The inventory.** `npm run build` regenerates `host.json`.

## Standing conditions

- D4 landed the equality gate red-first: `npm run test:guides` is red on its two new cases until D6 converges, and `npm test` is red for that reason alone. Every other project is green.
- `node_modules/@orkestrel/guide` is the head start the Orchestrator installed with `npm install --no-save` from the guide checkout's landed tip; `findDrift`, `tagline`, `locateComment`, `replaceCell`, `replaceFence`, `replaceSummary`, `replaceExample`, `spliceSpan`, and `WRAP_WIDTH` are in its declaration. Never `npm install`.
- The tree is committed and clean apart from `tmp/` at dispatch except for D4's uncommitted files (`tests/guides.test.ts`, `.claude/rules/documentation.md`, `.claude/rules/tests.md`, `host.json`), which are off-limits here and land with D6.
- `.oxlintrc.json:441` puts `scripts/**` in the lint scope, so `npm run lint:check` reads the seed under every policy rule, the voice rules included; the root `tsconfig.json` does not include `scripts/`, so `npm run check` does not typecheck it — the child-process run is its proof.
- Linux, bash, Node v22.22.2 (`node scripts/x.ts` runs unflagged here; the flag is for the floor). The host's command classifier refuses `npx scaffold …`; this unit needs no scaffold command.

## Scope

- Owned: `scripts/docs.ts` (new), `src/core/constants.ts` (the `HOST_PATHS` row only), `src/core/compilers.ts` (the `docs` script emission only), `package.json` (the `docs` script only), `guides/scaffold.md`, `tests/src/core/compilers.test.ts`, `tests/src/core/helpers.test.ts`, the test file the seed's cases live in, `host.json` (by regeneration alone).
- Off-limits: everything else — D4's four files, `tests/guides.test.ts`, `tests/setup*.ts`, `configs/**`, `README.md`, `package-lock.json`, `src/core/templates.ts`.
- Permitted commands: scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, the seed's project, `npm run build`, `npm run build:inventory`, `node --experimental-strip-types scripts/docs.ts` over this checkout (an observation). Never `npm install`, a tree-wide `format` or lint `--fix`, a discard-class git command, or a commit.

## Unknowns

- Whether the generated `proof` workspace of `tests/distribution.test.ts` carries guides, so that it receives the `docs` script; the unit reads `createBlueprint('proof', …)` and reports.
- Which Vitest project hosts the seed's child-process cases; the unit reads `vite.config.ts` and records the choice.

## Acceptance criteria, cheapest first

1. `grep -n "scripts/docs.ts" src/core/constants.ts src/core/compilers.ts package.json host.json` prints the `HOST_PATHS` row, the emission, the manifest script, and the staged entry; `grep -n "^import" scripts/docs.ts` prints `@orkestrel/guide` and `node:` specifiers only.
2. `npm run format:check` exits 0; `npm run lint:check` exits 0 (the seed included); `npm run check` exits 0.
3. `npm run test:src:core` exits 0 with the compilers and helpers cases present; the seed's project exits 0 with every case named under **Tests** present.
4. `npm run build` exits 0; `sha256sum host.json` identical before and after a `npm run build:inventory` re-run.
5. Observation: `node --experimental-strip-types scripts/docs.ts` over this checkout prints the drift list D4 recorded (compare the keys) and exits 1; record the output.

## Output

Write `/home/user/scaffold/tmp/units/docs-d5-scaffold-seed-report.md`: the seed's command shape and output format with an example run over the fixture, each edit with `file:line`, the answers to the Unknowns, each criterion with exit code and last lines, the observation's output, `git status --short` and `git diff --stat`, flagged claims. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when the installed `@orkestrel/guide` lacks a named export, when the seed cannot run under `--experimental-strip-types` on this host, when a criterion needs an off-limits file, or when a gate fails outside the owned files. The output line format's wording, the usage line, the fixture's content, and the test file's placement are yours to decide and record.
