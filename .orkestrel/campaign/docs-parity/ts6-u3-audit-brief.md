# Audit brief — U3 declaration-rollup (round 1)

## Lanes

Three lanes over this one brief, blind to each other, each a fresh context: the subjective lane (`reviewer`, Opus 5: design fit, API feel, vocabulary, the vendored leaf's shape), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench: correctness, constraints, what the code and the rules permit, false greens), and `checker` (Sonnet: mechanical conformance, scope honesty, the acceptance criteria as stated). Each lane reads only this brief and the evidence it names, runs no command, edits nothing, and returns per-claim verdicts. Perform the assignment directly and spawn nothing.

## Subject

Unit U3 replaced `vite-plugin-dts` in scaffold's own faces with a vendored Vite plugin, `declarationRollup`, in `configs/helpers.ts`, which emits declarations with the workspace's `tsc` as a spawned process and rolls them into one file per face through `@microsoft/api-extractor`'s own bundled engine, reached through a deferred import. The unit's brief: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u3-declaration-rollup-brief.md`; its report: `u3-declaration-rollup-report.md`; the recipe it implements: `plan.md` § Decision 5 and § Re-baseline, `orchestrator-measurements.md` § U1, `dts-absorb-distillate.md`, `instruments/u1/api-extractor-invoke.cjs`. Governing files: `/home/user/scaffold/AGENTS.md`, `.claude/rules/workspace.md` § Configuration authority, `.claude/rules/portability.md` § Processes, `.claude/rules/tests.md`, `.claude/rules/names.md`, `.claude/rules/typescript.md`.

## Review evidence

The actual diff and status: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u3-declaration-rollup.diff.txt` and `u3-declaration-rollup.status.txt` (captured by the Orchestrator after the unit exited). Read the diff in full; read the changed files at their new state where the diff is not enough. U1's rollups, the expected material output, sit at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/u1/scaffold-core/rollup.d.ts` and `.../scaffold-server/rollup.d.ts`. `host.json` is stale until the verifier's `build`; do not count it.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. `vite-plugin-dts` appears in no file under `configs/`, and `configs/helpers.ts` loads `@microsoft/api-extractor` only inside the hook, never at module scope, so the leaf still typechecks and lints in an app-only workspace that declares no api-extractor. The unit chose a literal `createRequire(import.meta.url)('@microsoft/api-extractor')` over the brief's `await import()` on a measurement (a literal `import()` reddens `tsc` where the package is absent; a variable specifier reddens `import/no-dynamic-require`); rule whether that measurement holds on this toolchain and whether the chosen form is the conforming one under `.claude/rules/typescript.md` and `.claude/rules/workspace.md` § Configuration authority.
2. The emit is a spawned process: `process.execPath` with the workspace's `typescript/bin/tsc` JavaScript entry, no shell string, no `.sh`, and no in-process compiler API (no `createProgram`, no `import ... from 'typescript'` value or type) anywhere in the owned files.
3. The api-extractor invocation carries exactly the override U1 fixed: the face's own resolved `lib` and `types` (core adds `node`), `target` and `module` ESNext, `moduleResolution` bundler, `skipLibCheck`, `strict`, `files: [entry]`, no `paths`, no `rootDir`, no `typescriptCompilerFolder`, `bundledPackages: []`, `dtsRollup.untrimmedFilePath`, every report and message off; and the scratch emit folder is removed after the rollup.
4. The plugin's options are single words (`project`, `types`, `rewrite`), its types are declared in the environment's `types.ts` before use with readonly properties, and the rewrite applies to the final rollup alone and replaces both the literal `@src/core` specifier and a relative `../core/index.js` form with the package name on a server face.
5. The hook choice (`closeBundle` or `writeBundle`) is the one the unit measured, and the report states the measurement; the scratch folder under `dist` cannot collide with Vite's own output.
6. Each face's rollup equals U1's copy in material content (whitespace, comments, and blank lines dropped), and no other `.d.ts` remains under the face's `dist` folder; the report quotes the diff commands and their empty output.
7. The proof in `tests/config.test.ts` drives the plugin over a real build (a fixture workspace or scaffold's own face), asserts one rollup file, the rewritten specifier on a server face, and no leftover `.d.ts`, and would redden if the rewrite were skipped or a second `.d.ts` remained.
8. No `any`, no assertion, no suppression, no nested function beyond the permitted shapes, no superfluous wrapper, and every exported helper the unit added has a test.
9. The report's claims match the diff: every file named as changed is in the status, nothing outside the owned set changed, and the unit's flagged claims hold or are refuted on the code.
10. The two flagged carries hold or are refuted: `configObjectFullPath` naming a token path that need not exist, and the `it.skipIf` branch whose only proof is the resolution assertion; and the `Reflect.get` reads over the loaded module are the right guard for a module namespace under either loader.
11. Names follow `.claude/rules/names.md` (`declarationRollup` as the factory, `{verb}{Noun}` helpers, no `kind`/`type` discriminant introduced), and the TSDoc states what the plugin does in the present tense with no count in a sentence.

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
