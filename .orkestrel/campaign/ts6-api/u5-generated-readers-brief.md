# Brief — U5 generated-readers (scaffold)

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent. Sole writer in `/home/user/scaffold`. Perform the assignment directly and spawn nothing.

## Objective

Scaffold's own tests that read generated TypeScript text (`tests/guides.test.ts`, `tests/src/core/templates.test.ts`) read it through the parser Vite re-exports (`parseSync`) and transform fences through `transformWithOxc`, with every CommonJS `vm` drive replaced by a scratch `.mjs` module imported by URL, so neither test names a compiler specifier and no text scan replaces a parser.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md` and `.claude/rules/` (`typescript.md`, `architecture.md`, `tests.md`, `quality.md` § Instruments, `writing.md`).
2. `/home/user/scaffold/.orkestrel/campaign/ts6-api/plan.md` § Decision 3 and § Decision 4 and § Re-baseline; `orchestrator-measurements.md` § Vite's re-exported parser and transformer (the AST fields measured: `exportKind`, the declaration's `id.name`, `params`, `returnType.typeAnnotation`, `start`/`end`, `comments` with ranges) and § M16; `instruments/vite-parser-probe.mjs` and its log.
3. The code: `/home/user/scaffold/tests/guides.test.ts` (lines 25 to 40 for the imports; 300 to 365 for `createSourceFile`, `transpileModule`, and the `runInNewContext` drives), `/home/user/scaffold/tests/src/core/templates.test.ts` (lines 1 to 20; 330 to 360 `driveClassifier`; 365 to 445 `extractDeclarations`, `readDeclaredNames`, `stageDistributionClassification` with `statement.getText(source)`; 525 to 560 `findParameters`), `tests/setupServer.ts` and `tests/setupServer.test.ts` (the Node-only shared test infrastructure, where an exported reader lives and is tested), `configs/helpers.ts` (how it already drives `parseSync` and `Visitor`), and the U4 report at `/home/user/scaffold/tmp/units/ts6-u4-proof-template-report.md` (the rows it handed to you).

## What is fixed

- **One exported reader in `tests/setupServer.ts`**, tested in `tests/setupServer.test.ts`, that takes source text and a name and returns the parsed program's top-level statements with the fields the lifts need: the statement type, the export kind, the declaration name, the parameters, the return-type node, and the statement's source slice by `start`/`end`. `parseSync(name, source)` from `vite` returns `{ program, module, comments, errors }`; refuse a source whose `errors` is non-empty. `extractDeclarations`, `readDeclaredNames`, `stageDistributionClassification`, and `findParameters` read from it; `canHaveModifiers`/`getModifiers` with `ExportKeyword` becomes the `ExportNamedDeclaration` wrapper and `exportKind`. No regular expression over declarations.
- **Fences.** `transpileModule` becomes `transformWithOxc(code, name, { target: 'esnext' })`.
- **Drives.** `runInNewContext(compiled, { exports })` and `driveClassifier`'s injected `dirname`, `existsSync`, `join`, `readFileSync`, `statSync` become a scratch `.mjs` written under the test's scratch directory (a unique name per drive, so the module cache keys differ) and loaded with `import(pathToFileURL(file).href)`; the lifted module carries the real imports the generated proof declares. The evaluated call list becomes a second generated `.mjs` that imports the classifier and exports its answers; nothing is evaluated from a string.
- **Controls.** The lift's control stays: a declaration name the generated proof does not carry fails the lift. Add one control an anchored pattern would miss and the parser reports (a formatter-wrapped multi-line declaration or an export whose name a pattern would mis-split); name the test for what it proves.

## Scope

- Owned: `/home/user/scaffold/tests/guides.test.ts`, `tests/src/core/templates.test.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`.
- Off-limits: every other file, including `src/**`, `tests/distribution.test.ts`, `tests/setupPolicy.ts`, `configs/**`.
- Permitted commands: scoped `oxfmt --write` on owned files, `npm run test:guides`, `npm run test:src:core`, `npm run test:setup`, `npm run lint:check`, `npm run check`. Never `npm run build`, `npm install`, a tree-wide `format` or `lint --fix`, a discard-class git command, or a commit.

## Host facts

Linux, bash, Node v22.22.2; vite 8.2.2 installed; npm 11 at `/opt/npm11/bin` (the host's npm 10 fails a materialized workspace's install with an `edgesOut` fault, so run `test:distribution`, if you run it at all, with `PATH=/opt/npm11/bin:$PATH`). U2, U3, and U4 landed before you (`089f9c46` on `main`, 2026-09-06); the tree is committed and clean apart from `tmp/` and the campaign ledger under `.orkestrel/`, which is off-limits. U4's hand-off (`/home/user/scaffold/.orkestrel/campaign/ts6-api/u4-proof-template-report.md` § U5 hand-off): no row of `tests/src/core/templates.test.ts` reddened; the emitted proof gained `Surface`, `writeProject`, `checkProject`, `checkSurface`, `selectDrivers`, `TSC`, `BUNDLER`, and `DIAGNOSTIC_PATTERN`, and lost `readDeclaredExports` and `compileConsumer`; every name in `CLASSIFIER_DECLARATIONS` (`tests/src/core/templates.test.ts:263`) still exists in the emitted proof, and the `buildStage` walk the lift reads is unchanged. Scaffold's own `tests/distribution.test.ts` is a bespoke presence-owned proof, off-limits here.

## Unknowns

Whether `parseSync` reports an arrow initializer's return type at `declarations[0].init.returnType` for the `findParameters` membership (the probe saw `UserConfig` there); confirm against the real generated config text and report.

## Acceptance criteria, cheapest first

1. `grep -n "from 'typescript'\|node:vm\|runInNewContext" tests/guides.test.ts tests/src/core/templates.test.ts tests/setupServer.ts` prints nothing.
2. `npx oxfmt --config .oxfmtrc.json --check` over the owned files exits 0; `npm run lint:check` exits 0; `npm run check` exits 0.
3. `npm run test:setup` exits 0 with the reader's tests, including the refusal on a source with parse errors and the pattern-missing control.
4. `npm run test:guides` and `npm run test:src:core` exit 0, and each classifier drive returns the answers the tests recorded before this change.

## Output

Write `/home/user/scaffold/tmp/units/ts6-u5-generated-readers-report.md`: the reader's signature and home, the drives' scratch shapes, each criterion with exit code and last lines, `git status --short` and `git diff --stat`, flagged claims. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when a lift needs a field the parser does not return, when a criterion needs an off-limits file, or when a gate fails outside the owned files. Ancillary choices are yours to make and record.
