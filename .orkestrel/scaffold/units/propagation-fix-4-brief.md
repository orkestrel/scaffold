# Unit propagation-fix-4 — make the emitted sheet project collect its proofs, then run the adopter whole

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration.

## Objective

The packed adopter in `tests/distribution.test.ts` (report: `tmp/units/propagation-fix-3-report.md` § Packed adopter) generates the complete selection, installs it, and passes `lint:check`, `check`, and `build`; `test:src` then fails at `test:src:styles`: the generated `src:styles` Chromium project reports `No test files found` with `include: tests/src/styles/**/*.test.ts` while the generated workspace holds `tests/src/styles/index.test.ts` and `tests/src/styles/themes/index.test.ts`. Find why the emitted project collects nothing, repair the emission so a generated sheet project collects its proofs, add the vendored case that would have caught it, and run the adopter to completion with every downstream reading.

## Context

- **Evidence.** `tmp/units/propagation-fix-3-resume.log` (the bare adopter output); the emitted `sheetProject` and `src:<face>` project templates in `src/core/templates.ts` and their composition in `src/core/compilers.ts` (`blueprintToRootVite`; grep `sheetProject`); the generated wrapper template `configs/src/vite.<face>.config.ts`; veneer's working factory at `C:/Users/mikes/WebstormProjects/veneer/vite.config.ts:184-206` (`sheetProject` composing `isolate: false`, the three setup files, `browser`, `fileParallelism`, and `publicDir: false`, with the project `include` supplied by the caller) and its wrapper `configs/src/vite.styles.config.ts` (read how the wrapper passes `include` and whether it sets `root` or `dir`); Vitest's rule that a project's `include` resolves against its `root` (or `test.dir`), so a sheet wrapper that sets `root` to the face directory for the CSS build would make `tests/src/styles/**` match nothing. Reproduce first: generate `node dist/bin/main.js new sheets --target <os.tmpdir()>/scaffold-fix-4 --src core,browser --app core,browser --styles --themes --extend styles:print --offline`, install it (`npm install --ignore-scripts --prefer-offline --no-audit --no-fund`), run `npm run test:src:styles` there, read the collected-file reading bare, then compare the generated `vite.config.ts` and `configs/src/vite.styles.config.ts` with veneer's.
- **The proof that would have caught it.** `tests/config.test.ts`'s selected-face cases load each sheet wrapper and inspect its configuration; add the assertion that the resolved project's `include` globs match at least one existing file under the workspace when the face's proof directory exists (resolve the globs against the project's effective root the way Vitest does, or run Vitest's own glob resolution if it is importable), with a control that a wrong root collects nothing. This checkout has no sheet face, so the case runs live in adopters and against a scratch copy here.
- **Tree state and gates.** As the earlier briefs: uncommitted campaign changes everywhere, never touched; this checkout is a generated target (regenerate the identity set if a template this checkout materializes changes; `sheetProject` is not materialized here); `npm run build` before `test:src:bin`, `test:config`, `test:policy`, `test:guides`, and `test:distribution`; `host.json` differs by regeneration alone.
- **Law.** `AGENTS.md`, `.claude/rules/tests.md` (controls), `.claude/rules/workspace.md` § Test project matrix as the tree holds it.

## Unknowns

- The cause; the reproduction settles it before any edit.

## Scope

- **Owned.** `src/core/{compilers,templates}.ts`, `tests/src/core/{compilers,templates}.test.ts`, `tests/config.test.ts` (the selected-face block alone), `tests/setupPolicy.ts` and `tests/setupPolicy.test.ts` only if the new assertion needs a shared helper, `guides/scaffold.md` and `tests/guides.test.ts` only if a sentence about the sheet project or its wrapper changes, the identity set (regenerated only), `host.json` (regenerated only).
- **Off-limits.** Everything else, `tests/distribution.test.ts` included (its adopter is the oracle; it is not edited to pass).
- **Tools and limits.** Read, patch, and the shell. Run: `git status --porcelain`, `git diff`, `node`, `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:core`, `npx oxlint --config .oxlintrc.json src tests configs`, `npx oxfmt --config .oxfmtrc.json --write <owned files>` and `--check`, `npm run test:src:core`, `npm run build`, `npm run test:src:bin`, `npm run test:setup`, `npm run test:config`, `npm run test:policy`, `npm run test:guides`, `npm run lint:check`, `npm run test:distribution` (bare, to natural completion), and the scratch generation, install, and scripts under `os.tmpdir()` that you delete. Never run `npm test`, `npm run lint`, or `npm run format` tree-wide; never install in the checkout; never commit.

## Execution

1. Reproduce in the scratch; read the generated root config and the sheet wrapper against veneer's; name the cause with the line.
2. Repair the emission; rerun `npm run test:src:styles` and `npm run test:src:print` in the scratch after regenerating it from the rebuilt CLI (`npm run build` first), and read the collected files bare.
3. Add the config-proof assertion and its control; run it against a scratch copy carrying a sheet face.
4. Run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:core`, `npx oxlint --config .oxlintrc.json src tests configs`, `npm run test:src:core`, `npm run build`, `npm run test:src:bin`, `npm run test:setup`, `npm run test:config`, `npm run test:policy`, `npm run test:guides`, `npm run lint:check`, `npm run test:distribution` (the adopter must complete: quote its step table, both page stamps against `computeStamp`, the CSS consumer result, the repair byte comparison, the stale audit finding, and the wall time; a failure in a generated script is quoted bare and is a stop), then `npx oxfmt --config .oxfmtrc.json --check <owned files>`.
5. The `desk` scratch reading `propagation-fix-3-brief.md` step 15 prescribes (the generated `guides/README.md` lists the Vue faces and the showcase pages; the manifest carries the showcase and journey scripts; the root `vite.config.ts` declares no function inside a factory body outside the admitted positions), quoted, then delete every scratch directory.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-fix-4-report.md` with: the cause with its line; the files changed; the repair and its pinning case; the adopter's readings; the `desk` scratch readings; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when the cause lies outside the owned set, when a generated script fails for another reason (quote it bare), when a gate reddens for a reason outside your files, or when a change needs a file outside the owned set.

## Acceptance criteria

1. The generated sheet projects collect their proofs; the config proof's new assertion reddens under its control.
2. `tsc`, scoped check, scoped lint, scoped format, and `lint:check` exit 0; `test:src:core`, `build`, `test:src:bin`, `test:setup`, `test:config`, `test:policy`, `test:guides`, and `test:distribution` exit 0 with the adopter complete.
3. The `desk` scratch readings match.
4. No file outside the owned set differs from its state at your start; `host.json` and the identity set differ by regeneration alone; no scratch directory remains.

## Review evidence

The diff of the owned files and the report.
