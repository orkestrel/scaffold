# Brief — U4 proof-template (scaffold)

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent. Sole writer in `/home/user/scaffold`. Perform the assignment directly and spawn nothing.

## Objective

The generated distribution proof (`tests/distribution.test.ts`, written into every target from the template in `src/core/templates.ts`) reads the installed package's declared value exports through the type system checked by the workspace's `tsc` process, and its fences transform through Vite's `transformWithOxc`, so the template writes no compiler import and the proof still fails when the package publishes a value it does not declare or declares one it does not publish.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md` and `.claude/rules/` (`typescript.md`, `architecture.md`, `tests.md`, `portability.md`, `documentation.md`, `writing.md`).
2. `/home/user/scaffold/.orkestrel/campaign/ts6-api/plan.md` § Decision 2 and § Re-baseline (U4's shape, fixed by M15); `m15-report.md` in full (the two-direction shape, the generator, the diagnostics per resolution); `m3m4-report.md` § Table and § Differences (the `--pretty false` line shape and the exit codes); `orchestrator-measurements.md` § Vite's re-exported parser and transformer; `inventory-distillate.md` § the generated proof.
3. The code: `/home/user/scaffold/src/core/templates.ts` from the proof's header near line 1040 through its end (the `ESM_DRIVER_SOURCE`, `RESOLUTIONS`, `compileConsumer`, the checker walk with `getSymbolAtLocation`, `getExportsOfModule`, `getAliasedSymbol`, `SymbolFlags.Value`, `driveRuntime`, `readDeclaredExports`, the absent-subpath control, any `transpileModule` use), `src/core/constants.ts` (`DISTRIBUTION_TEST_PATH`), `tests/distribution.test.ts` (scaffold's own generated copy), `tests/src/core/templates.test.ts` (the tests that lift and drive the generated proof; U5 owns that file, so read it to keep its expectations true and report what it will need), `guides/scaffold.md` § the distribution proof.

## What is fixed

- **The type-system proof, both directions.** For each installed entry and each resolution driver (`node16`, `nodenext`, `bundler`), the proof reads the runtime keys with `Object.keys(await import(specifier)).sort()`, writes a throwaway consumer module `import * as entry from '<specifier>'; const published = { <key>: true, ... } as const; const declared: Record<keyof typeof entry, true> = published; const surfaced: Record<keyof typeof published, true> = declared;` beside a scratch `tsconfig.json` fixing `module`, `moduleResolution`, `target`, `strict`, `noEmit`, `types: []`, `skipLibCheck`, and `files`, and runs the workspace's `tsc --noEmit --pretty false -p <scratch>` through `process.execPath` and the `typescript/bin/tsc` entry, resolved from the workspace being proved. A missing runtime key, an extra runtime key, and a type-only name each redden with the member named in a TS2741 (M15). The diagnostic lines (`path(line,col): error TSnnnn: message`, stdout, exit 2 on 6.0.3 and 1 on 7.0.2) are the verdict, never the exit code alone; a line with no location or naming the scratch config is a proof-instrument fault reported as such.
- **What survives unchanged:** the absent-subpath control, the runtime drivers, the exports-map walk, the `.d.cts`/`.d.mts` resolution helpers, the release mode.
- **Fences.** Every `transpileModule` call in the template becomes `transformWithOxc(code, name, { target: 'esnext' })` from `vite` (declared in every workspace; measured over enum, namespace, parameter property, and plain constructs). A fence run through `vm` in the generated proof, if any, becomes a scratch `.mjs` imported by `pathToFileURL`, so nothing is evaluated from a string.
- **The template writes no `typescript` import**, value or type. `typescriptCompilerFolder` is already gone.
- **Scaffold's own copy** `tests/distribution.test.ts` is regenerated from the template through the repository's own mechanism. The proof is claimed by presence (`guides/scaffold.md` § the distribution proof; `src/core/compilers.ts:1300`, `ownership: 'presence'`), so `repair` writes it only where it is missing: after `npm run build:src:core` and `npm run build:src:bin`, remove `tests/distribution.test.ts`, run `node dist/bin/main.js repair --offline` from the checkout root, and confirm the file returned with the new template's text. Report the exact command and its output. Never hand-edit the generated file.

## Scope

- Owned: the distribution proof block of `/home/user/scaffold/src/core/templates.ts` (from its header comment to the end of that template entry) and `/home/user/scaffold/tests/distribution.test.ts` (regenerated only). Read `tests/src/core/templates.test.ts` and report the expectations that change; do not edit it (U5 owns it).
- Off-limits: every other file and every other region of `templates.ts` (the config seeds landed in U3-fix and are off-limits here).
- Permitted commands: `npm run build:src:core`, `npm run build:src:bin`, the built CLI through `node dist/bin/main.js`, scoped `oxfmt --write` on owned files, `npm run test:src:core`, `npm run test:distribution` (in default mode; the release mode belongs to the verifier), `npm run lint:check`, `npm run check`. Never `npm run build`, `npm install`, a tree-wide `format` or `lint --fix`, a discard-class git command, or a commit.

## Host facts

Linux, bash, Node v22.22.2, npm 10 (npm 11 at `/opt/npm11/bin`); typescript 6.0.3, vite 8.2.2. U2 and U3 landed before you (`23fd02ff` on `main`, 2026-09-06); the tree is committed and clean apart from `tmp/` and the campaign ledger under `.orkestrel/`, which is off-limits. `tests/src/core/templates.test.ts` (`:12,338,373,416,540`) and `tests/guides.test.ts` (`:32,311,334`) still import `typescript` and are U5's; your change must not touch them. `tests/src/core/templates.test.ts` still lifts the generated proof with the compiler until U5 lands, so its rows may redden on your change: name each row and the expectation it needs, rather than fixing it.

## Standing condition: a partial edit from the first attempt

The first dispatch of this unit died on the session limit after editing `src/core/templates.ts` and nothing else. That partial edit is in the tree now (`git diff src/core/templates.ts`, also at `/home/user/scaffold/.orkestrel/campaign/ts6-api/u4-partial.diff.txt`): the `typescript` import is gone, the compiler is resolved through `createRequire` as `TSC`, the drivers carry string option spellings, a `DIAGNOSTIC_PATTERN` and a `selectDrivers` helper exist, and the checker walk is partly rewritten. It is yours: keep what conforms to this brief, rework what does not, and finish it. Read the whole proof block before writing, and treat the partial edit as unverified. `tests/distribution.test.ts` was not regenerated by that attempt.

## Unknowns

Whether the repaired proof's bytes equal `fillTemplate` over the current blueprint exactly (the `templates.test.ts` parity rows will say); report any difference with its cause.

## Acceptance criteria, cheapest first

1. `grep -n "from 'typescript'\|transpileModule\|createProgram\|getPreEmitDiagnostics" src/core/templates.ts tests/distribution.test.ts` prints nothing.
2. `npx oxfmt --config .oxfmtrc.json --check` over the owned files exits 0; `npm run lint:check` exits 0; `npm run check` exits 0.
3. Planted controls: with the workspace's own package under proof, a planted extra runtime key and a planted undeclared name each redden the proof with the member named in the diagnostic; quote both diagnostics verbatim and state how each plant was made and removed (a plant in a scratch copy, never in `src/`).
4. `npm run test:distribution` exits 0 in default mode.
5. `npm run test:src:core` exits 0, or its only red rows are in `tests/src/core/templates.test.ts` and each is named with the expectation U5 must carry.

## Output

Write `/home/user/scaffold/tmp/units/ts6-u4-proof-template-report.md`: the proof's shape as landed, the regeneration command, each criterion with exit code and last lines, the U5 hand-off rows, `git status --short` and `git diff --stat`, flagged claims. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when a criterion needs an off-limits file or region, when the proof cannot name a member for a direction, or when a gate fails outside the owned files. Ancillary choices are yours to make and record.
