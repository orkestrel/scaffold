# Unit D5-fix — seed-rule: the vendored-imports rule states what it protects, its gate reads that, the root tsconfig maps the own specifiers, and the seed selects with guides

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent, holding the objective lane's unit on the recorded substitution (the Sol bench is dark this round). Sole writer in `/home/user/scaffold`, with no other unit live. Perform the assignment directly and spawn nothing.

## Objective

D5's landing stands (`scripts/docs.ts` a `HOST_PATHS` row importing `@orkestrel/guide`), and the tree is green under every project it reddened: the vendored-imports rule states the invariant it protects, its gate reads that invariant as an allowlist, the generated root `tsconfig.json` maps each workspace's own published specifiers to its source, the seed is planned only where guides are, and the artifact tallies read their measured values.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md` and `.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/architecture.md`, `.claude/rules/tests.md`, `.claude/rules/workspace.md`, `.claude/rules/documentation.md`, `.claude/rules/writing.md`.
2. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d5-fork-design-verdict.md` (the ruling and what it refuses), `orchestrator-measurements.md` § P13 and § M6 and M7, `d5-scaffold-seed-report.md` § The deviation and § Shared-file patches (P1).
3. The code: `.claude/rules/workspace.md:70-79`; `tests/src/server/helpers.test.ts:173-201`; `src/core/constants.ts` (`HOST_PATHS` `:132-155`, `BASE_DEV_DEPENDENCIES` `:493-505`); `src/core/helpers.ts:452-461` (`selectHostPaths`); `src/core/compilers.ts:1548-1563` (`nameToHostArtifacts`), `:340-360` (`blueprintToScripts`, the `guides` branch), `:896-915` (`blueprintToConfigArtifacts`, the root tsconfig is a content-owned template), `blueprintToRootTsconfig` (`:615-640` region, the `{{paths}}` fill) and where the manifest's `exports` map is built; `src/core/Compiler.ts:297` (the caller of `nameToHostArtifacts`); `src/core/templates.ts:20-60` (the root tsconfig template), `:80-95` (the Vite config builds `alias` from every `paths` entry); `tests/config.test.ts:82-105` (the vendored alias case: it requires each present `@src/*` entry and refuses no extra entry); `tests/src/core/Compiler.test.ts:62-75` (the tallies); `tests/src/core/helpers.test.ts:170-195`; `tests/src/core/compilers.test.ts` (the config and script cases); `guides/scaffold.md:16-20`, `:600-612`, `:1025-1044` (D5's prose), and its paragraphs on the generated `tsconfig.json`.

## What is fixed

- **K1. The rule.** Replace the bullet at `.claude/rules/workspace.md:77-79` with this text, verbatim:

  > - When a file is vendored byte-identical, import only what resolves in every workspace: a `node:` module, or a package `BASE_DEV_DEPENDENCIES` declares for every workspace. Refuse any other `@orkestrel/*` import; `tests/src/server/helpers.test.ts` reads every vendored JavaScript and TypeScript module against that set. A base package resolves in its own checkout through its `exports` map to its built `dist/` entry, so a vendored module that imports it runs there after `npm run build`; the generated root `tsconfig.json` maps the workspace's own published specifiers to its source, so `npm run check` there needs no build.

  No other line of the file moves. D4's uncommitted edit at `:132` stays.
- **K2. The gate.** Rewrite the case at `tests/src/server/helpers.test.ts:174-201` so it keeps its population (every `HOST_PATHS` member with a JavaScript or TypeScript module extension, directories walked) and collects, per module, every `@orkestrel/<package>` specifier in an `import`, `export … from`, `import()`, or `require()` position whose `<package>` (the scope and the first path segment, without a subpath) is not a key of `BASE_DEV_DEPENDENCIES`; assert the collection equal to `[]`. Keep inline controls: the extractor reads the two existing sample strings; a sample module text importing `@orkestrel/console` is collected and one importing `@orkestrel/guide` and one importing `@orkestrel/test/server` are not. Name the case for what it proves. The failing-first proof exists: `instruments/d5/m7-test-src-server-before.log.txt` records `:200` red on exactly `scripts/docs.ts`; after K2 the same command is green with the seed present.
- **K3. The seed selects with guides.** A workspace whose blueprint has no guides is planned neither `scripts/docs.ts` nor the `docs` script; the same fact selects both. The shape is yours: `selectHostPaths` and `nameToHostArtifacts` take what they need from the blueprint (`src/core/Compiler.ts:297` is the caller), with `src/core/types.ts` first if a record is needed, single-word members, and the guide's `## Surface` and `## Methods` rows and doc blocks updated for any changed signature. Cover it in `tests/src/core/helpers.test.ts` and `tests/src/core/compilers.test.ts` (with guides: the seed and the script; without: neither). A guides-less generated workspace then carries no seed, so `repair` there restores nothing at that path.
- **K4. The own specifiers in the root tsconfig.** `blueprintToRootTsconfig` adds to `paths`, beside the `@src/*` entries, the workspace's own published specifiers mapped to their source: `@orkestrel/<short name>` to `./src/core/index.ts` when `src` selects core, and `@orkestrel/<short name>/<environment>` to `./src/<environment>/index.ts` for each other selected `src` environment — exactly the subpaths the manifest's `exports` map publishes (read that builder and mirror its set; the `app` axis publishes nothing and maps nothing). Cover it in `tests/src/core/compilers.test.ts`. Then bring scaffold's own `tsconfig.json` to the regenerated form by hand (the two entries for `@orkestrel/scaffold` and `@orkestrel/scaffold/server`), and prove it with the built CLI: `node dist/bin/main.js audit --groups configs` reports `tsconfig.json` aligned. The Vite config derives `alias` from every `paths` entry (`src/core/templates.ts:86`), so `@orkestrel/scaffold` resolves to source under Vitest in this checkout; record what `npm run test:guides` does with that (the by-design red on the two D4 cases must stay the only red) and what `tests/config.test.ts`'s alias case does (it must stay green).
- **K5. The guide.** `guides/scaffold.md`: in the paragraphs D5 added under § Ownership and drift, state that the seed is planned with guides and that in the package publishing the readers `npm run build` precedes `npm run docs` because the import resolves through the package's own `exports` map; where the guide documents the generated root `tsconfig.json`, state the own-specifier entries and why (`npm run check` in that package needs no build); where it documents the vendored set's import limit (if it does), align it with K1. `guides/README.md` unchanged unless a row must change.
- **K6. The tallies.** `tests/src/core/Compiler.test.ts:71,74` read their measured values after K3 (the fixture's `guides` flag decides whether the seed is in the tally); record the measurement.
- **K7. The inventory.** `npm run build` regenerates `host.json` (the `workspace.md` digest moves; the `scripts/docs.ts` entry stays).

## Standing conditions

- D4 and D5 are accepted-pending-audit and uncommitted on this tree: D4's five files and D5's landing (`d5-scaffold-seed.status.txt`). `npm run test:guides` is red on exactly the two D4 cases by design; `npm run test:src:server` is red on exactly the vendored-imports case (M7); `npm run test:src:core` is red on exactly `Compiler.test.ts:71` (P1). Every other project is green at dispatch.
- `node_modules/@orkestrel/guide` is a head start installed with `--no-save`. Never `npm install`.
- `npm run check` runs `tsc --noEmit --project tsconfig.json` over everything outside `node_modules`, `dist`, and `tmp`, then the `configs/src/tsconfig.*.json` projects; `scripts/docs.ts` is inside the root program.
- Linux, bash, Node v22.22.2. The host's command classifier refuses `npx scaffold …`; run the built CLI as `node dist/bin/main.js …` after `npm run build`.

## Scope

- Owned: `.claude/rules/workspace.md` (K1's bullet only), `tests/src/server/helpers.test.ts` (the vendored-imports case only), `src/core/helpers.ts`, `src/core/compilers.ts`, `src/core/Compiler.ts`, `src/core/types.ts`, `src/core/templates.ts` (only if the root tsconfig template text must change; the `{{paths}}` fill lives in `compilers.ts`), `tsconfig.json`, `guides/scaffold.md`, `tests/src/core/helpers.test.ts`, `tests/src/core/compilers.test.ts`, `tests/src/core/Compiler.test.ts`, `host.json` (by regeneration alone).
- Off-limits: `scripts/docs.ts`, `src/core/constants.ts`, `package.json`, `package-lock.json`, `tests/guides.test.ts`, `tests/config.test.ts`, `tests/setup*.ts`, `configs/**`, `.claude/rules/*` other than K1's bullet, `README.md`, `.agents/**`.
- Permitted commands: scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run test:src:server`, `npm run test:config`, `npm run test:policy`, `npm run test:guides` (an observation), `npm run build`, `npm run build:inventory`, `node dist/bin/main.js audit …` (read-only), `npm run docs` (an observation). Never `npm install`, a tree-wide `format` or lint `--fix`, a discard-class git command, or a commit.

## Unknowns

- Whether `tests/config.test.ts` or any `tests/src/core/*.test.ts` case pins the exact `paths` key set of a generated root tsconfig; the unit greps for `paths` across `tests/` and records the answer before K4.
- Whether the Vite alias for `@orkestrel/scaffold` changes how `tests/guides.test.ts` executes the guide fences that import `@orkestrel/scaffold`; the unit reads `tests/guides.test.ts:205-240` and records the observation under K4.

## Acceptance criteria, cheapest first

1. `grep -n "cannot depend on itself" .claude/rules/workspace.md` prints nothing; `grep -n "BASE_DEV_DEPENDENCIES" tests/src/server/helpers.test.ts` prints the gate's use; `grep -n "@orkestrel/scaffold" tsconfig.json` prints the two entries.
2. `npm run format:check` exits 0; `npm run lint:check` exits 0; `npm run check` exits 0.
3. `npm run test:src:server` exits 0 with the seed present.
4. `npm run test:src:core` exits 0, the K3 and K4 cases listed and the tallies at their measured values.
5. `npm run test:config` exits 0; `npm run test:policy` exits 0.
6. `npm run build` exits 0; `sha256sum host.json` identical before and after a second `npm run build:inventory`; `node dist/bin/main.js audit --groups configs` exits 0.
7. Observations: `npm run test:guides` red on exactly the two D4 cases; `npm run docs` exits 1 with the same key set D5 recorded.

## Output

Write `/home/user/scaffold/tmp/units/docs-d5-fix-report.md`: each K with `file:line`; the K3 shape and the K4 entries; the answers to the Unknowns; the tallies measured; each criterion with exit code and last lines; the observations; `git status --short` and `git diff --stat`; flagged claims. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when a criterion needs an off-limits file, when a pinned exact `paths` set in an off-limits test refuses K4, when the Vite alias breaks a case outside the two by-design reds, or when a gate fails outside the owned files. The K3 signature, the case names, and the guide wording are yours to decide and record.
