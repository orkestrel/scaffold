# Unit ts7-seven-fix — fix round for stage 2 of the TypeScript 7 move in scaffold

Successor of `tmp/units/ts7-seven-brief.md` (report: `.orkestrel/campaign/ts7/seven-report.md`, landed as `6c46f547` on the branch). What changed: the audit round (`tmp/units/ts7-audit-scaffold-{subjective,objective,checker}.md`, verifier `tmp/units/ts7-verify-scaffold-report.md`, GATES: GREEN) confirmed the code claims and refuted the prose claim, and named one mechanism no gate carries and one duplicated fixture. This unit carries every finding below, each with its source lane.

## Role and engine

`implementer` on Opus 5, a native Claude Code subagent, the sole writer in `/home/user/scaffold`. Perform the assignment directly and spawn nothing. Another writer is live in `/home/user/fleet/probe`, a disjoint checkout; never write there.

## Objective

Every finding below is closed in the file it names, the browser `dts` template's override is pinned by a test that can fail, the two inline `typescript` packuments call the shared builder, and the gates are green.

## Context

**Evidence.** The three lane reports and the verifier report named above; the diff under audit at `tmp/units/ts7-seven.diff.txt`. Read each finding's cited lines yourself before editing; the line numbers below were read at `c4bee5da`.

**Law.** `AGENTS.md` (§ Writing, § Non-negotiable rules, § Design laws), `.claude/rules/writing.md`, `.claude/rules/documentation.md`, `.claude/rules/tests.md`, `.claude/rules/typescript.md`; skill: none; guide: `guides/scaffold.md`.

**Host.** Node v22.22.2; `typescript` 7.0.2 and `@typescript/typescript6` 6.0.2 installed; the whole `npm test` ran green in the verifier's chain at `6c46f547` with no timing failure, so the whole suite is a legitimate gate here. `git status --short` is empty at `c4bee5da`; the `.orkestrel/` records are committed.

**Standing conditions.** `guides/scaffold.md` is vendored: `host.json` carries its digest, `npm run build` rebuilds `host.json` through `build:inventory`, and `tests/config.test.ts` compares the inventory text exactly, so run `npm run build` after the guide edit and before `npm test`. `PROPOSAL.md` is not reflowed by `format:check` (`.oxfmtrc.json` sets `printWidth` 100 and leaves Markdown prose wrapping as written), so a rewrap is by hand.

## Findings and the change each needs

Prose (subjective lane S1 to S4 and O1 to O4, objective lane claim 6 and F3, checker referral):

1. `guides/scaffold.md:1148-1149` — "rather than with it" has four candidate antecedents. Write "rather than with the installed `typescript` package".
2. `guides/scaffold.md:1150` — "clears the `typescriptCompilerFolder` invoke option" names no value. Write "sets the `typescriptCompilerFolder` invoke option to `''`", and add, after the sentence ending "the rollup then resolves no global type.", one sentence recording the tradeoff the objective lane derived (F3): "With that option cleared, the rollup resolves global types against the lib files of the compiler `@microsoft/api-extractor` bundles (5.9.3 at `@microsoft/api-extractor` 7.59.0), for every generated workspace whatever `typescript` major it installs, so a public declaration naming a lib type that compiler lacks fails the rollup until `@microsoft/api-extractor` bundles a later one."
3. `guides/scaffold.md:1154-1157` — `audit` reports the major the registry serves (`src/bin/helpers.ts:414-424`), not the shared major, and the sentence carries three ideas. Replace the sentence from "That workspace's `audit` reports" to "supports 7." with: "That workspace's `audit` reports one non-blocking `dependencies` question, the crossed-major reading every foreign row earns: the workspace declares major 6 while the registry serves a later major. Read that question as the record of the limit, not as an instruction to raise the range. The range goes when `vue-tsc` supports 7."
4. `guides/scaffold.md:1787-1789` — the test map still names "the emitted TypeScript bound", singular. Write "and the emitted TypeScript range with the browser workspace's fork of it."
5. `ROADMAP.md:41-43` — condition first: "When `vue-tsc` runs against 7, delete the range, its spread in `blueprintToDevDependencies`, and the guide paragraph naming it; that release is the trigger."
6. `ROADMAP.md:83` — "clear `typescriptCompilerFolder` in each published `src` environment's Vite configuration" names no value. Write "set `bundleTypes.invokeOptions.typescriptCompilerFolder` to `''` in each published `src` environment's Vite configuration (`undefined` fails `TS2375` under `exactOptionalPropertyTypes`, and api-extractor applies the option only when it names a folder)".
7. `ROADMAP.md:48` — "a new rule": write "an added rule".
8. `tests/src/core/constants.test.ts:193-194` — the comment calls the value "the ceiling" twice; the constant, its TSDoc, and the guide call it a range. Write: "so it receives `APP_BROWSER_TYPESCRIPT_RANGE` instead of the shared range. That range is a floor of the same form, so it answers to the same pattern."
9. `PROPOSAL.md:47`, `:354`, `:1032`, `:1160` — lines this campaign's amendment left at 116 to 141 columns. Rewrap each paragraph at word boundaries to at most 100 columns, changing no word. Leave every other long line in the file; they predate this campaign.
10. `PROPOSAL.md:1161-1164` — "at no dependency cost" reads more confidently than measured. Replace "which a Vitest sweep can import at no dependency cost because `typescript` is already a development dependency" with "which a Vitest sweep can import because `typescript` is already a development dependency; that entry is a preview surface (TypeScript 7.1 ships a different API) and spawns the platform's native compiler binary, so the swap is a measured cost rather than a free one". In the C12 row at `:353-354`, after "through its `unstable/ast` and `unstable/sync` entries" insert ", preview surfaces that 7.1 replaces,".

Tests (objective lane F1 and F2):

11. The browser `dts` template's override (`src/core/templates.ts:611`) is carried by no gate: the byte-identity population is `src: ['core','server']` plus bin, and the emitted-face assertions at `tests/src/core/compilers.test.ts:1407-1438` read only the rewrite comment. Add one `it` beside `explains the declaration rewrite in every emitted published face`, named for what it proves (for example `sets the rollup's compiler folder override in every emitted published face`): for the blueprint `{ src: ['core', 'browser', 'server'] }`, each of the emitted `configs/src/vite.core.config.ts`, `vite.browser.config.ts`, and `vite.server.config.ts` artifacts contains `typescriptCompilerFolder: ''`, and the control, the emitted `configs/src/vite.bin.config.ts` artifact, is present and does not contain `typescriptCompilerFolder`. Prove the test binds: delete the line `src/core/templates.ts:611` (`invokeOptions: { typescriptCompilerFolder: '' },`, the browser template's copy), run `npm run test:src:core`, record the red row, then re-insert that exact line by editing (no git command), and record the green. The plant touches a file this unit owns and nothing else.
12. `tests/src/bin/CLI.test.ts:137-150` and `:263-276` carry one hand-written two-version `typescript` packument twice, in place of `buildPackument` (`tests/setupServer.ts:1670-1684`, whose TSDoc records the shape verified against the registry). Give the shared builder the ability to publish more than one version — the shape is yours to choose under these constraints: one builder, its existing single-version call sites (64 in `CLI.test.ts`, 13 in `main.test.ts`, 24 in `tests/src/server/Upstream.test.ts`) stay unchanged, `dist-tags.latest` stays the shared range's version, every per-version record keeps `name` and `version`, the TSDoc states the added form, and `tests/setupServer.test.ts` gains one row over the multi-version form. Then both `/typescript` fixture rows call it, and the five-line comment stays once per site.

## Scope

**Owned.** `guides/scaffold.md`, `ROADMAP.md`, `PROPOSAL.md`, `tests/src/core/constants.test.ts`, `tests/src/core/compilers.test.ts`, `tests/src/bin/CLI.test.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, `src/core/templates.ts` (the plant in item 11 only, restored byte-identical), `host.json` (rebuilt by `npm run build`, never edited by hand). **Off-limits.** everything else, `.orkestrel/**`, `tmp/**` except your own report, every vendored file `host.json` lists other than `guides/scaffold.md`; no commit, no push, no publish, no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

## Steps

1. Items 1 to 10 by exact edit. Re-read each amended sentence against `.claude/rules/writing.md` § Substitutions before moving on.
2. Item 11 with its red-then-green record; item 12 with `tests/setupServer.test.ts` red on the added row before the builder change where that is possible (record it either way).
3. `npm run lint` and `npm run format` only to converge, then `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`, in that order, reading each exit code.
4. `git status --short` and `git diff --stat`.

## Output

A report at `/home/user/scaffold/tmp/units/ts7-seven-fix-report.md` with: one row per item above naming the file, the edit, and (for 11 and 12) the red-then-green commands with their counts; each gate's command and exit code; the `git status --short` output; the builder shape you chose for item 12 and why; deviations. Make your final message that report's text.

## Deviation contract

Stop and report on a gate red you cannot attribute to your own edit, on any need to edit a file outside the owned set, and on a finding whose prescribed text contradicts what the cited code does when you read it; an ancillary choice (where a sentence sits, the builder's parameter shape) is yours to decide and record.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test` exit 0, in that order, after the edits.
2. Item 11's test is red with the browser template's override line removed and green with it restored, both recorded with the command and the counts.
3. Neither `/typescript` fixture row in `tests/src/bin/CLI.test.ts` carries an inline `JSON.stringify` packument; both call the shared builder.
4. Every prose item reads as prescribed at the cited site; `guides/scaffold.md` and `ROADMAP.md` carry no `should`, `new` dating a value, `via`, `just`, `simply`, `ensure`, or temporal `once` in an edited sentence.
5. `git status --short` lists only owned files.
