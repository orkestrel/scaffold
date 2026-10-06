# Unit S46: the Oxlint configuration carries one override block per styles face, and the config proof expects them

Route: astra (implementation). You are the sole writer in your checkout `/home/user/.wave/scaffold-s46` (scaffold commit 7fc0cbec, own `node_modules`). No other process writes there.

## Objective

`AGENTS.md:28` grants `src/tailwindcss` one exception to the face boundary (it may `@use` `src/bootstrap`'s Sass partials) and says it "imports none of its TypeScript". `AGENTS.md` § Project model says boundaries are enforced with the toolchain (Oxlint import restrictions) and that no second parser for TypeScript is added. The generated `.oxlintrc.json` carries one `no-restricted-imports` override block per face (`src/core`, `src/browser`, `src/vue`, `src/server`, `app/*`) and none for the styles faces `src/bootstrap`, `src/tailwindcss`, and `src/styles`. This unit adds the three blocks to the generator and to scaffold's own configuration, makes the vendored config proof (`tests/config.test.ts`) expect and exercise them, and proves the planted imports are refused.

## Governing texts (read first)

- `/home/user/.wave/scaffold-s46/AGENTS.md` line 28 (the exception sentence) and § Project model (the toolchain and no-second-parser sentences).
- The generator: `/home/user/.wave/scaffold-s46/configs/helpers.ts` holds the override patterns and messages (search for `must not depend on Vue extension modules` and the face union near line 984); find the function that emits a face's block and how `dist/host/dotfiles/oxlintrc.json` and the workspace `.oxlintrc.json` are produced from it (the `build:host` or dotfiles step in `package.json`; read `src/core/constants.ts:208` for the managed-file name). Change the generator, never the generated file alone, and regenerate scaffold's own `.oxlintrc.json` through the repository's script so the two agree.
- The proof: `/home/user/.wave/scaffold-s46/tests/config.test.ts`, case `matches every isolated import pattern with refused and admitted fixtures` (near 2578-2714). It chooses fixture specifiers by substrings of each pattern's `message` and defaults to `['@src/browser', true]`; a styles-face message matches no branch, so the face patterns (which admit `@src/browser`) produce mismatches. Also read `inspectPolicyConfiguration` (near 1339-1360) and the owner list near 2717-2739.
- The prior art and evidence: the rejected veneer diff `/home/user/veneer/tmp/units/completion/a2/oxlint-ruling-2.patch` (the three blocks as unit A2 wrote them: the browser block's common patterns plus one pattern per other face with the regex `^(?:@src/<face>(?:[/?#]|$)|@orkestrel/[^/]+/<face>(?:[/?#]|$)|(?:\.\./)+(?:<face>|src/<face>)(?:[/?#]|$))` and the message `src/<this face> must not import another styles face's TypeScript`), and its report `/home/user/veneer/tmp/units/completion/a2/report-3.md` (the planted runs `a2-ruling2-oxlint-relative` and `a2-ruling2-oxlint-alias`, and the config refusal with the six mismatches).
- Rules: `/home/user/.wave/scaffold-s46/.claude/rules/typescript.md`, `architecture.md` (no nested functions), `names.md`, `tests.md`, `writing.md`.

## Scope

- **Owned.** `configs/helpers.ts` (the generator), the regenerated `.oxlintrc.json` and `dist/host/dotfiles/oxlintrc.json` if the repository tracks it, `tests/config.test.ts` (the message branch for the styles-face patterns and, if the owner list is extended, that list), and any guide or README line that enumerates the face blocks (search `guides/` for `no-restricted-imports` and for the existing block messages). The report folder `/home/user/veneer/tmp/units/completion/s46/`.
- **Off-limits.** Everything else.

## The change

1. The generator emits, for each of `src/bootstrap`, `src/tailwindcss`, and `src/styles`, one block in the shape of the `src/browser` block (the common patterns the browser block carries) plus one pattern per other styles face as A2 wrote them. Keep the message form the config proof can key on; choose a message substring that no other branch matches (for example `another styles face`).
2. `tests/config.test.ts` gains a message branch for that substring, modelled on the `sibling sheet` branch: refused fixtures `@src/<other>`, `@orkestrel/x/<other>`, `../<other>/index.js`, and `../src/<other>/index.js`; admitted fixtures `@src/browser`, `@src/<other>x`, and `../<other>.ext/index.js`, with `<other>` read from the pattern's regex or from a table keyed by the block's owner. Extend the owner list near 2717-2739 if it is meant to cover every block.
3. Regenerate scaffold's own `.oxlintrc.json` (and the dotfile copy if tracked) through the repository's script; `git diff` shows the three new blocks and nothing else in those files.
4. Planted proof: under a scratch tree or the config proof's own fixture mechanism, `src/tailwindcss/planted.ts` holding `import '../bootstrap/sheet.js'` and one holding `import '@src/bootstrap'` are refused by the new pattern; `src/bootstrap/planted.ts` importing `@src/styles` is refused; `src/tailwindcss/x.ts` importing `./sheet.js` or `@orkestrel/contract` is admitted.

## Acceptance (through the queue)

Every CPU-loading command runs as:

```text
flock /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/s46-<name> --kind command --cwd /home/user/.wave/scaffold-s46 -- <command>
```

with `/home/user/.wave/npm11/node_modules/.bin` first on `PATH`. Run: the generator script, `npm run test:config` (every case), `npm run lint:check` on the regenerated configuration, `npm run format:check`, `npm run check`, `npm run test:policy` if the policy sweep reads the configuration, then `git diff --check`. If the lock cannot be taken within 30 minutes, report the holder and stop.

## Sandbox

`danger-full-access`; your only writable roots are `/home/user/.wave/scaffold-s46`, `/home/user/veneer/tmp/units/completion/s46/`, and `/home/user/veneer/tmp/units/journey-cost/runs/`.

## Forbidden

Installs, commits, pushes, publishing, destructive commands, edits outside the owned files, a hand edit of a generated file without the generator change, a second writer, CPU-loading commands outside the queue.

## Deviation contract

Stop and report when: the generator cannot express a per-face block without a change outside the owned files (name the file); the config proof's structure refuses the branch for a reason the brief does not name; a gate fails outside the change.

## Return shape

Report file `/home/user/veneer/tmp/units/completion/s46/report.md` with: the generator change by function; the three blocks' face patterns quoted; the config proof branch; the planted refusals and admissions with their Oxlint output lines; every queued command with its run folder and exit; `git status --porcelain` and `git diff --stat` at the end; deviations; and the adoption note for veneer (which files veneer takes: the regenerated `.oxlintrc.json` blocks and the re-vendored `tests/config.test.ts`). Your final message is a short summary naming the report path.

## Appended ruling at relaunch (2026-10-05, after the first run's generator finding)

Your finding stands: the root `.oxlintrc.json` is a vendored dotfile (`HOST_PATHS`, `src/core/constants.ts:208`), staged byte for byte into `dist/host/dotfiles/` by `stageHost` and written into workspaces by `overwrite`; nothing generates it. The brief's "generator" premise is withdrawn; the source of truth is the root file itself.

- **Owned files now:** the root `.oxlintrc.json` (the three styles-face override blocks, in the shape of the `src/browser` block, with the face patterns and message the brief gives), `tests/config.test.ts` (the message branch and, if it is meant to cover every block, the owner list near 2730), and any guide line that enumerates the face blocks (search `guides/` for the existing block messages). The report folder stays.
- **No generator change, no build change.** Do not touch `configs/helpers.ts`, `src/server/helpers.ts`, or `package.json`. `build:host` stages the file as it stands; run it through the queue once to show the staged dotfile carries the new bytes (`cmp .oxlintrc.json dist/host/dotfiles/oxlintrc.json` after `npm run build:host`), and say whether `dist/` is tracked (it is not, so no diff there).
- **Proof and acceptance** as the brief states: the planted refusals and admissions under the config proof's fixture mechanism or a scratch tree, then `npm run test:config`, `npm run lint:check`, `npm run format:check`, `npm run check`, and `npm run test:policy` if the policy sweep reads the configuration, all through the queue; `git diff --check` directly.
- **Adoption note for veneer:** veneer's `.oxlintrc.json` is the same vendored path, so the next `overwrite` writes the new bytes; until then the Orchestrator may copy the three blocks into veneer by hand together with the re-vendored `tests/config.test.ts`, which `overwrite` also carries. Name both files in the report.

Report over `/home/user/veneer/tmp/units/completion/s46/report.md`, keeping the first as `report-deviation-1.md`.

## Second appended ruling (2026-10-05, after the Opus review: accept with five minor proof gaps)

The Orchestrator rebuilt your checkout through the queue (`runs/s46-orch-build`, which regenerated `host.json`) and re-ran the gates with the default `TMPDIR`: `test:config` 227 passed and 1 skipped, `lint:check`, `format:check`, `check`, `test:policy` 120 passed, all exit 0 (`runs/s46-orch-*`). Both earlier failures were the stale inventory and the scratch location under veneer's ignored `tmp/` (Oxlint reads the enclosing repository's ignore rules and found no files), not the blocks. The review accepts the candidate and names five proof gaps; close them in this pass, in the two owned files only. `host.json` is regenerated by the Orchestrator's `npm run build`, never by hand.

1. **The `(?:\.\./)+` quantifier is untested.** From `src/tailwindcss/x.ts` the real cross-face relative path is `../../src/bootstrap/index.js`; the fixture `../src/${face}/index.js` (near `tests/config.test.ts:2674` and the full-config repeat near `:2803`) tests a path no real import uses, and the mutation `(?:\.\./)+` → `\.\./` leaves both cases green. Add `[`../../src/${face}/index.js`, true]` to the isolated fixtures and the same specifier to the full-config refused list. Keep the existing fixture.
2. **The `?` and `#` boundary is untested.** Add `[`@src/${face}?raw`, true]` to the isolated fixtures (the sibling-sheet branch already carries `../browser?x` for this purpose).
3. **A face glob widened over `src/core` or `src/browser` is uncaught**, because the later override replaces the earlier rule config and every `src/core` fixture is also refused or admitted by the face blocks' common patterns. Add `@src/browser` and `./index.css` to the `src/core` owner's refused list in the full-config case (`src/core` refuses both at `.oxlintrc.json:169` and `:173`; a face block admits both), so a face glob mutated to `src/**` turns the case red.
4. **`export ... from` and `import type` are untested**, and the installed Oxlint (1.86.0, `node_modules/oxlint/configuration_schema.json:18923` lists `allowTypeImports` on a restricted pattern, unset here) documents neither. For each styles owner add two full-config fixtures expected refused: `export * from '@src/<other face>'` and `import type * as boundary from '@src/<other face>'`. Extend the fixture writer only as far as those two statement forms need; keep its existing output for every existing fixture. If the real binary admits either form, do not weaken the expectation: remove that fixture, and report the fact with the planted run's exact output, because an admitted `export * from` is a hole every block in the file shares and the Orchestrator rules on it. Also run one planted probe (your `planted.ts`, a new scratch folder) with a dynamic `import('@src/bootstrap')` from `src/tailwindcss/` and report whether Oxlint refuses it; add no fixture for it.
5. **Glob shape.** The three face blocks use `src/<face>/**` where the `src/browser` block they copy uses the extension-scoped glob `src/browser/**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}`. Use the extension-scoped glob for the three face blocks, so the blocks share the shape the brief named.

Close with the mutation probes the review named, each run through the queue against `npm run test:config -- -t 'matches every isolated import pattern|<the full-config case title>'` (one folder per probe, the mutation applied to a copy of the regex or glob in `.oxlintrc.json`, then restored byte for byte, with `cmp` after the restore): (a) `(?:\.\./)+` → `\.\./` in all six face patterns, expect red; (b) `(?:[/?#]|$)` → `(?:/|$)` in all six, expect red; (c) one face block's glob → `src/**`, expect red; (d) the restored file, expect green. Then run `npm run test:config`, `lint:check`, `format:check`, and `check` through the queue (`runs/s46-second-*`); the inventory case will report `host.json` stale for the two files you edited: that is expected, and the Orchestrator's rebuild closes it; report it as such, not as a failure outside the change. Write the report over `report.md`, keeping the current one as `report-2.md`, with a table of the four probes (folder, expected, actual exit, the failing assertion's text for the red runs) and the `export`/`import type`/dynamic-import findings with their outputs.
