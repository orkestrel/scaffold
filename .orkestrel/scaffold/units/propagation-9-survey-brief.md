# Unit propagation-9-survey — run every veneer gate to completion on the adopted tree and report every failure

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell, working in `C:/Users/mikes/WebstormProjects/veneer`. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. Edit nothing except what step 1 names. Never commit; never publish; never install.

## Objective

Veneer's tree carries the `0.0.82` adoption (`tmp/units/propagation-9-report.md` under the scaffold checkout: 21 files restored by one `repair`, the authored migrations, the deleted `tests/src/vue/index.test.ts`). Two defects in the restored vendored `tests/config.test.ts` are known and are being repaired in scaffold in parallel. Run `catalog --offline --json`, then every gate of the chain, each to natural completion whatever the earlier ones report, and report every failure bare, so the scaffold repair closes the complete list and the next adoption run is the last.

## Context

- **The known two.** `tests/config.test.ts:232-235` (the themes barrel and tokens literal) and `:566-578` (the `conformance` and `integration` setup lists). Report them as they fail, and everything else beside them.
- **The chain.** `node node_modules/@orkestrel/scaffold/dist/bin/main.js catalog --offline --json` (writes the guide mirrors; quote its JSON), then `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm run build:showcase`, `npm run build:showcase:vue`, `npm test`, `npm run test:distribution -- --mode release`. Run each through the dispatch launcher with a cap (`node C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-dispatch/scripts/launch.ts --journal <log> --errors <err> --cap <seconds> -- node <npm-cli.js> run <script>`), never through the PowerShell npm shim, and never stop the chain on a failure: record the exit, the test counts, and the complete failure diagnostics of each (the full `FAIL` blocks, lint hits with file and line, typecheck diagnostics, Sass or Vite errors), with no filtering pipeline. `npm test` and the distribution run may take ten minutes or more each; cap them at 1800 s.
- **Step 1, the one authored file.** `tests/src/vue/index.test.ts` was deleted when its Node cases moved to `conformance`, and `repair` seeds no birth-owned file after birth, so the `src:vue` Chromium project collects nothing and `test:src:vue` fails with "No test files found". Author the Chromium entry proof veneer owes: generate `node node_modules/@orkestrel/scaffold/dist/bin/main.js new probe --target <os.tmpdir()>/veneer-survey --src core,browser --app core,browser --extend browser:vue --offline`, read its seeded `tests/src/vue/index.test.ts`, write the same shape into veneer's `tests/src/vue/index.test.ts` adjusted to what veneer's `src/vue/index.ts` exports today (read it), and delete the scratch. This is the only edit besides what `catalog` writes.
- **Reading.** `npm run lint:check` runs under the repaired restrictions for the first time in veneer: a boundary hit there is a finding, quoted with file and line; do not fix it.

## Unknowns

- How many gates fail; every one is reported.

## Scope

- **Owned.** `tests/src/vue/index.test.ts` (authored once), the guide mirrors `catalog` writes, veneer's `tmp/units/` for journals.
- **Off-limits.** Every other file in veneer; the scaffold checkout.
- **Tools and limits.** Read, the shell, and the one authored file. Never run a mutating `npm run lint` or `npm run format`; never install; never commit.

## Execution

1. Author `tests/src/vue/index.test.ts` as Context states.
2. `catalog --offline --json`; quote it.
3. The chain, each gate to completion, each journaled.
4. `git status --porcelain` and `git diff --stat` at the end.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-9-survey-report.md` with: the authored proof; the catalog reading; one section per gate with its exit code, counts, and complete failure diagnostics (or "green"); the closing status; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report only when a gate cannot start at all (a missing script, a refused launcher); otherwise run every gate and report.

## Acceptance criteria

1. Every gate ran to completion and its reading is quoted bare.
2. Nothing outside the owned set changed.

## Review evidence

The report and the journals under veneer's `tmp/units/`.
