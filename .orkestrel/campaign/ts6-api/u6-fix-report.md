# Unit report — U6-fix

## Edits, before and after

1. **`PROPOSAL.md`, tool table `typescript` row**
   - Before: "Nothing a reader can call: the fleet runs it as the `tsc` command, and no in-process compiler API is available on either major it targets"
   - After: "Nothing a reader may call: 6.0.3 ships the in-process API and 7 drops it, so the fleet reaches the compiler as the `tsc` command by ruling and the vendored lint configuration refuses the `typescript` specifier"

2. **`PROPOSAL.md`, C12**
   - Before: "No in-process compiler API is available on either TypeScript major the fleet targets, so the reader that resolves a doc comment structurally is the parser `vite` re-exports"
   - After: "The fleet reaches the compiler as the `tsc` command by ruling, because the in-process API 6.0.3 ships is gone on 7 and the vendored lint configuration refuses the `typescript` specifier, so the reader that resolves a doc comment structurally is the parser `vite` re-exports"

3. **`PROPOSAL.md`, dependency-delta paragraph**
   - Before: "resolves the barrel's `export *` edges and each exported declaration's leading block comment exactly, through `parseSync` from `vite`"
   - After: "resolves the barrel's `export *` edges and each exported declaration's leading block comment by the ranges `parseSync` from `vite` reports"

4. **`ROADMAP.md`, campaign row opening**
   - Before: "the fleet stays on TypeScript 6.0.3 and reaches the compiler as the `tsc` command alone, so the later move to 7 is one range change."
   - After: "the campaign's invariant is a fleet on TypeScript 6.0.3 that reaches the compiler as the `tsc` command alone, so the later move to 7 is one range change."

5. **`ROADMAP.md`, `succeeded` row**
   - Before: "is the indirect guard today"
   - After: "is the indirect guard"

6. **`ROADMAP.md`, fleet `@packageDocumentation` row**
   - Before: "**fleet**: no published entry module carries a `@packageDocumentation` comment, so no roll-up ships one. The pipeline no longer refuses it: `declarationRollup` hands API Extractor the entry declaration the compiler emitted rather than the synthetic comment-free entry the previous plugin built. Measured 2026-09-06 in scaffold: a fixture face emitted by `tsc` and rolled up by API Extractor under the plugin's own options carried the comment into the roll-up. Decide whether each published entry gets one, at each package's next release."
   - After: "**fleet**: scaffold's own entry module carries no `@packageDocumentation` comment, so its roll-up ships none, and no other package's entry has been read for one. The pipeline no longer refuses the comment: `declarationRollup` hands API Extractor the entry declaration the compiler emitted rather than the synthetic comment-free entry the previous plugin built, and a probe of the same chain (the compiler's emit, then API Extractor under the plugin's own override set) over a fixture face on 2026-09-06 carried the comment into the roll-up; the shipped plugin itself was not driven. Decide whether each published entry gets one, at each package's next release."

7. **`config` rationale comment, `src/core/templates.ts` and `vite.config.ts` (byte-identical)**
   - Before:
     ```
     // A config test validates every target wrapper, spawns the real linter twice under
     // 15-second child caps, and, where the workspace installs the extractor, drives a
     // declaration roll-up that spawns the compiler too, so this budget clears each under load.
     ```
   - After:
     ```
     // A config test validates every target wrapper, spawns the real linter twice under
     // 15-second child caps, and rolls one face up through the compiler and the extractor it
     // spawns, so this budget clears the capped pair with room for a contended host.
     ```
   - `testTimeout` stays `60_000`.

8. **`.oxlintrc.json`** — added an `overrides` entry after the last environment block, matching `files` list `["tests/**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}", "configs/**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}", "scripts/**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}", "*.{cjs,cts,js,mjs,mts,ts}"]` and one `no-restricted-imports` rule carrying the pattern `{ "regex": "^typescript(?:[/?#]|$)", "message": "the in-process compiler API is not a surface the fleet uses" }`. No other change to the file.

9. **The executable claim**
   - `src/core/constants.ts` TSDoc first sentence — before: "Lists the development dependencies that roll declarations up for published source or an executable."; after: "Lists the development dependencies that roll declarations up for published source."
   - `guides/scaffold.md` `DECLARATION_DEV_DEPENDENCIES` Surface row description — before: "The development dependencies that roll declarations up for published source or an executable."; after: "The development dependencies that roll declarations up for published source." (row's other cells and table padding kept).

10. **`ROADMAP.md`, new scaffold row** after the TSDoc-openers row: "**scaffold**: `DECLARATION_DEV_DEPENDENCIES` is planned for a `bin` blueprint (`src/core/compilers.ts`) while the seeded `bin` config rolls no declarations, so an executable-only workspace installs an extractor nothing runs. Rule whether the planner keeps that row for `bin`, at the next planner change; a change moves generated manifests and their pins."

11. **`src/core/constants.ts`, `@remarks` of `DECLARATION_DEV_DEPENDENCIES`**
    - Before: "The compiler emits one declaration per module as a command the toolchain already installs, and the extractor rolls that emit into the single file each published face ships."
    - After: "The toolchain runs the compiler it already installs as a command, emitting one declaration per module, and the extractor rolls that emit into the single file each published face ships."

12. Ran `npx oxfmt --config .oxfmtrc.json --write` over the owned files after editing. It rewrapped `PROPOSAL.md` prose lines; no other file changed under the formatter.

## Acceptance criteria

1. **PASS** — `git status --short` shows the same file set U6 already left dirty (`.oxlintrc.json`, `PROPOSAL.md`, `ROADMAP.md`, `guides/scaffold.md`, `host.json`, `package-lock.json`, `package.json`, `src/core/constants.ts`, `src/core/templates.ts`, `tests/src/bin/CLI.test.ts`, `tests/src/bin/main.test.ts`, `tests/src/core/compilers.test.ts`, `tests/src/core/fixtures/setup-false-manifest.txt`, `tests/src/core/fixtures/source-manifest.txt`, `vite.config.ts`); no path beyond U6's set plus `package-lock.json`/`host.json`. `git diff --stat` names the owned files among the changed set.

2. **PASS**
   - `grep -n "no in-process compiler API is available\|guard today\|or an executable\|comment exactly" PROPOSAL.md ROADMAP.md src/core/constants.ts guides/scaffold.md` → exit 1, no output.
   - `node -e "const c=require('./.oxlintrc.json');const b=c.overrides.filter(o=>JSON.stringify(o).includes('^typescript'));console.log(b.length, b.at(-1).files.join(' '))"` → `8 tests/**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue} configs/**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue} scripts/**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue} *.{cjs,cts,js,mjs,mts,ts}`.

3. **PASS**
   - `npx oxfmt --config .oxfmtrc.json --check PROPOSAL.md ROADMAP.md .oxlintrc.json src/core/constants.ts guides/scaffold.md src/core/templates.ts vite.config.ts` → "All matched files use the correct format." exit 0.
   - `npm run lint:check` → `oxlint --config .oxlintrc.json --deny-warnings .` exit 0.
   - `npm run check` → `tsc --noEmit` chain (root, `src:core`, `src:server`, `src:bin`) exit 0.

4. **PASS**
   - `npm run test:src:core` → Test Files 9 passed (9), Tests 385 passed (385), exit 0.
   - `npm run test:policy` → Test Files 1 passed (1), Tests 77 passed (77), exit 0.
   - `npm run test:guides` → Test Files 1 passed (1), Tests 17 passed (17), exit 0.

## Deviations

None. Every site was where the brief stated, with the "before" text matching exactly.
