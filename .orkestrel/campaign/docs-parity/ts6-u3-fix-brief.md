# Brief — U3-fix (scaffold), successor of `u3-declaration-rollup-brief.md`

## Role and engine

`builder`, Sonnet, a native Claude Code subagent. Sole writer in `/home/user/scaffold`; another writer may work in `/home/user/fleet/probe`, which is off-limits. Perform the assignment directly and spawn nothing. Every edit is prescribed; where one cannot be applied as written, stop and report (expected, found, evidence, done or not done, at most one hypothesis).

## Objective

Close the round-1 findings in `/home/user/scaffold/.orkestrel/campaign/ts6-api/u3-audit-verdict.md`: the seeded configuration templates emit what scaffold's own configs now say, so the byte-identity parity test is green again; the roll-up proof drives a real Vite build; the scratch emit leaves the published output; the prose names its members; and the small findings close.

## Read first

`/home/user/scaffold/AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/writing.md`, `.claude/rules/workspace.md` § Configuration authority; then `configs/helpers.ts` (the `declarationRollup` region, near lines 440 to 726), `configs/src/vite.core.config.ts` and `vite.server.config.ts` (the target the seeds mirror), `src/core/templates.ts` lines 540 to 645 (the `vites.src` seeds), `src/core/compilers.ts` lines 920 to 945 and its import block, `src/core/helpers.ts` `nameToRewrite` (near line 410), `tests/src/core/compilers.test.ts` lines 1150 to 1215 and 1400 to 1425, `tests/src/core/helpers.test.ts` lines 270 to 360 and its import block, `tests/config.test.ts` lines 50 to 60, 1680 to 1730, and 1805 to 1900, and `guides/scaffold.md` where it names `nameToRewrite`.

## Host facts

Linux, bash, Node v22.22.2, npm 10. The tree carries U3's uncommitted edits and a regenerated `host.json`; do not touch `host.json`, `package.json`, `src/core/constants.ts`, or the fixtures under `tests/src/core/fixtures/`. `npm run build` and any tree-wide `format` or lint `--fix` are barred; scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>` is permitted. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; never commit.

## Edits

1. **The seeds mirror the real configs.** In `src/core/templates.ts`, `vites.src.core` becomes byte-identical to `configs/src/vite.core.config.ts` and `vites.src.server` byte-identical to `configs/src/vite.server.config.ts` (the parity test compares the generated text with the checked-in file as one relation; copy the checked-in text, keeping the template's own escaping of backticks and backslashes). `vites.src.browser` takes the same shape as the server seed with `configs/src/tsconfig.browser.json` as `project` and `rewrite: rewriteCoreSpecifier`, importing `declarationRollup` and `rewriteCoreSpecifier` from `'../helpers.js'` and `srcBrowser` and `resolveWorkspacePath` from `'../../vite.config.ts'`; its comment states in one or two sentences that the roll-up reaches `src/core` through a source path the tarball does not carry, so the rewrite externalizes core through the package's own root export on the final roll-up alone. No seed names `vite-plugin-dts`, `dts(`, `beforeWriteFile`, or a `{{replacement}}` span.
2. **The renderer.** In `src/core/compilers.ts`, the browser and server branches assign the seed directly (no `fillTemplate`, no `replacement`), and the `nameToRewrite` import goes.
3. **`nameToRewrite` goes.** Delete it from `src/core/helpers.ts` with its TSDoc; delete its `describe` block and its import from `tests/src/core/helpers.test.ts`; delete its row and any passage naming it from `guides/scaffold.md` (the parity test `test:guides` refuses a documented symbol that does not exist and an exported one that is not documented). If `serializeTypeScriptString` or `matchesPrintWidth` lose their last reader, keep them (each is a documented export with its own tests) unless lint refuses an unused import, in which case drop only the import.
4. **The compilers test expectations.** In `tests/src/core/compilers.test.ts` near lines 1404 to 1420, the face expectations read the `declarationRollup(` call and `rewrite: rewriteCoreSpecifier` and the new comment sentence rather than `vite-plugin-dts rolls this face…` and `beforeWriteFile`; keep the case's intent (both published faces reach core through the rewrite) and name it for what it proves.
5. **The scratch emit leaves the output.** In `configs/helpers.ts` `closeBundle`, the scratch is `mkdtempSync(join(tmpdir(), 'orkestrel-declarations-'))` (import `mkdtempSync` from `node:fs` and `tmpdir` from `node:os`), the emitted entry is computed under it, and it is removed in the `finally`; nothing under the face's `dist` but the rollup is written or removed. Update the TSDoc sentence that describes the scratch location.
6. **One `createRequire`.** Bind `const load = createRequire(import.meta.url)` once at the top of `closeBundle` and use it for the `typescript/bin/tsc` resolution and the extractor load. Directly above the extractor load, add a comment: a literal `import()` of the extractor reddens `tsc` in a workspace that does not install it and a variable specifier reddens `import/no-dynamic-require`, so the literal `createRequire` call is the form that clears every gate in an app-only workspace.
7. **Named members.** `@returns True if the value carries both callable entry points; false otherwise.` → `@returns True if the value carries the \`Extractor.invoke\` and \`ExtractorConfig.prepare\` entry points; false otherwise.`; and `refuses a module that carries both entry points` → `refuses a module that carries \`Extractor.invoke\` and \`ExtractorConfig.prepare\``.
8. **The skip control.** In `tests/config.test.ts`, keep the resolved path when `require.resolve` succeeds and assert `existsSync(<resolved path>)` rather than a fixed `node_modules/@microsoft/api-extractor` directory; the unresolved branch keeps its throw assertion.
9. **The real-build proof.** Rewrite `rolls one face into a single declaration and rewrites its core specifier` so the build path runs Vite's real `build()` (the shape of `drives each plugin through its real Vite hooks`: `root`, `configFile: false`, `logLevel: 'silent'`, `publicDir: false`, `build.write: true` into the fixture's output, `build.lib.entry` the fixture's server entry, `formats: ['es']`, an `external` matching `node:` and `@orkestrel/`), with `declarationRollup({ project: <the fixture project>, rewrite: rewriteCoreSpecifier })` in `plugins`, and once more without `rewrite` as the control. Keep every assertion: one `index.d.ts` under the output, no scratch or `declarations` folder anywhere under it, the rewritten specifier present and `@src/core` absent with `rewrite`, `@src/core` present and the package name absent without it. The `serve` control may keep driving `configResolved` with `command: 'serve'` and `closeBundle` directly. Keep the `skipIf` guard.
10. **The guard's true branch.** Add a case in `tests/config.test.ts` asserting `isExtractorModule` accepts a hand-built object whose `Extractor.invoke` and `ExtractorConfig.prepare` are functions, beside the existing false cases.
11. **The rule's waiver.** In `.claude/rules/workspace.md` § Configuration authority, extend the sentence that lets `configs/policy.ts` keep its own types, data, and functions in that one file so it names `configs/helpers.ts` too (the vendored leaves may declare no `configs/types.ts`); re-wrap at 100 columns.

## Scope

- Owned: `configs/helpers.ts`, `tests/config.test.ts`, `src/core/templates.ts` (the `vites.src` seeds only), `src/core/compilers.ts` (the vite config rendering and its import block only), `src/core/helpers.ts` (`nameToRewrite` only), `tests/src/core/compilers.test.ts`, `tests/src/core/helpers.test.ts`, `guides/scaffold.md` (the `nameToRewrite` row and passage only), `.claude/rules/workspace.md` (the one sentence).
- Off-limits: every other file and region, `host.json`, `package.json`, `src/core/constants.ts`, and the fixtures included.

## Acceptance criteria, cheapest first

1. `grep -n -E "vite-plugin-dts|dts\(|beforeWriteFile|\{\{replacement\}\}|nameToRewrite" src/core/templates.ts src/core/compilers.ts src/core/helpers.ts configs/helpers.ts` prints nothing; `grep -n 'both' configs/helpers.ts` prints no line inside the `isExtractorModule` TSDoc.
2. `npx oxfmt --config .oxfmtrc.json --check <every owned file>` exits 0; `npx oxlint --config .oxlintrc.json --deny-warnings <every owned .ts file>` exits 0; `npm run check` exits 0.
3. `npm run test:src:core` exits 0, with the byte-identity parity case green.
4. `npm run test:guides` exits 0.
5. `npm run build:src:core` and `npm run build:src:server` exit 0, `cmp` of each rollup against `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/u1/scaffold-{core,server}/rollup.d.ts` exits 0, and `find dist/src/core dist/src/server -name '*.d.ts'` lists the two rollups alone.
6. `npm run test:config` exits 0 apart from the host-inventory case, which the verifier's `build` closes; record it if red.

## Output

Write `/home/user/scaffold/tmp/units/ts6-u3-fix-report.md`: per edit the exact diff hunk (the seeds may be summarized as "mirrors the checked-in file"); each criterion's command with its exit code and last lines; `git status --short` and `git diff --stat`; what you could not close and which of your own claims you flag. Return the same content as your final message. No process diary.
