# Unit brief — U10 database-readers (database): the guide fence check and the entry surfaces off the compiler API

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent, holding the objective lane's unit (Sol's by the routing ledger, run on Opus with the substitution recorded while the Codex bench is dark). Sole writer in `/home/user/fleet/database`. Perform the assignment directly and spawn nothing.

## Objective

`tests/setupServer.ts` and `tests/setupServer.test.ts` name no `typescript` specifier: guide fences are typechecked by the workspace's own `tsc` run as a process over a scratch project, and the entry surfaces are read by the parser `vite` re-exports over the barrel graph after that same `tsc` has proven the graph clean, so `tests/guides.test.ts` keeps its bijection and its fence proof with no change to what they assert.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md` and its rule map: `.claude/rules/tests.md`, `.claude/rules/typescript.md`, `.claude/rules/names.md`, `.claude/rules/architecture.md`, `.claude/rules/patterns.md` § Declared ecosystem capabilities, `.claude/rules/portability.md`, `.claude/rules/quality.md` § Instruments, `.claude/rules/writing.md`.
2. `/home/user/scaffold/.orkestrel/campaign/ts6-api/u10u11-absorb-distillate.md` § A in full (every function, step, consumer, pin, and fixture), and § C.
3. The code: `tests/setupServer.ts:1-370`, `tests/setupServer.test.ts` in full, `tests/guides.test.ts:60-120,137-290,291-349,600-680`, `tsconfig.json`, `guides/database.md:433-439,2430`.
4. The installed primitives to reuse rather than rewrite: `node_modules/@orkestrel/probe/dist/src/server/index.d.ts` — `scanDiagnostics` (reads `tsc --pretty false` output into diagnostics with zero-based UTF-16 points) and its `Diagnostic` record, `parseProjectConfig`; `/home/user/fleet/probe/guides/probe.md` § the type stage (how it writes a scratch project that `extends` a mirrored project and reads diagnostics rather than the exit code, which the supported majors disagree on). Scaffold's precedent for a parser reader: `/home/user/scaffold/tests/setupServer.ts` `readStatements` and its tests. The M7 reading: `parseSync` spans are UTF-16 code units.

## What is fixed

- **`checkGuideFences(config, document, fences)`** keeps its signature and its messages. It writes the fences as today under the package's `tmp/` scratch, writes a scratch `tsconfig.json` beside them that `extends` the caller's config, sets `compilerOptions.noEmit: true` and the `paths` overlay for `@orkestrel/database`, `/browser`, and `/server` onto the package's `src/{core,browser,server}/index.ts` (relative to the scratch file; set `baseUrl` there if `paths` needs it), and names the fence files in `files` with `include: []`; runs `node <process.execPath> node_modules/typescript/bin/tsc --noEmit --pretty false -p <scratch>/tsconfig.json` once with `spawnSync` (the workspace's own compiler, resolved as scaffold's `configs/helpers.ts` resolves `typescript/bin/tsc`); reads the printed diagnostics with `scanDiagnostics` from `@orkestrel/probe/server`, never the exit code; maps each diagnostic onto its fence by the file name and formats `Fence N (guide line L)[file:line:col]: message` with the same 1-based arithmetic as today (`formatGuideFenceDiagnostic` keeps its name over the new record shape); throws the joined messages under the same heading; destroys the scratch in `finally`. Its per-fence semantics hold because each fence carries `export {}` and is its own module.
- **`deriveEntrySurfaces(config, entries)`** keeps its signature and its return shape. Step one proves the graph: a scratch `tsconfig.json` under the package's `tmp/` that `extends` the caller's config with `noEmit: true`, `files` naming the entries, `include: []`; the same `tsc` process; diagnostics read with `scanDiagnostics` and filtered to files under the caller's `src/` as today (file-less diagnostics kept), then `checkCompilerDiagnostics` fails closed under the same phase names (`Entry options failed`, `Entry syntax failed`, `TypeScript semantics failed`), so a colliding `export *`, a missing re-export, and a type fault still throw the strings the pins assert. Step two reads the surface: for each entry, `parseSync` the file, then walk its statements — `ExportAllDeclaration` resolves its specifier relative to the file (`.js` to `.ts`; a directory to its `index.ts`) and recurses; `ExportNamedDeclaration` with a `declaration` classifies it (`TSTypeAliasDeclaration` `type`, `TSInterfaceDeclaration` `interface`, `ClassDeclaration` `class`, `FunctionDeclaration` `function`, `VariableDeclaration` with `kind` `const` `const`; `let`, `enum`, `namespace`, and any other form refuse with today's `unsupported declaration` message); `ExportNamedDeclaration` with specifiers and a `source` resolves the specifier and reads the named export from that module recursively (following its own re-exports), a local `export { a }` reads `a`'s declaration in the same file; an `exportKind` of `type` on the statement or the specifier refuses as type-only with today's message; `ExportDefaultDeclaration` refuses with today's `default` message; a name declared with several supported keywords yields one symbol per keyword; the result is sorted by name then keyword and keyed by the caller's entry string as today. Duplicate names reached through two `export *` paths from one declaration are one symbol; from two declarations they never reach step two, because step one throws.
- The compiler-symbol helpers (`isTypeOnlyExport`, `resolveEntrySymbol`, `classifyEntryDeclaration`, `shapeEntrySymbols`) become parser-shaped helpers with the same responsibilities and `{verb}{Noun}` names, each exported from `tests/setupServer.ts` and pinned in `tests/setupServer.test.ts` with cases that keep today's fixtures and controls (`export { build }` against `export type { Shape }` and `export { type Label }`; the merged `Engine`; the `let`/`default`/type-only refusals; the missing entry; the `src` fault; the outside-`src` diagnostic ignored; the sorted surface). `formatCompilerDiagnostics` and `checkCompilerDiagnostics` keep their names over probe's `Diagnostic` record. `tempTypeScriptProject` is unchanged.
- No reader of `tsc` output is written here: `scanDiagnostics` is the declared primitive. Inspect its installed declaration first; if its record does not carry the file, the point, and the message a fence diagnostic needs, stop and report the gap rather than parsing the output locally.
- `tests/guides.test.ts` changes only where a helper's name changed; its assertions, fixtures, and planted controls stay.

## Scope

- Owned: `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/guides.test.ts` (import names only).
- Off-limits: everything else — `src/**`, `guides/**`, the vendored pair, `tests/distribution.test.ts`, `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`.
- Permitted commands: scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run test:setup`, `npm run test:guides`, `npm run lint:check`, `npm run check`. Never `npm install`, `npm run build`, a tree-wide `format` or lint `--fix`, a discard-class git command, or a commit.

## Host facts

Linux, bash, Node v22.22.2; the checkout carries scaffold's and probe's head starts under `node_modules` (installed with `--no-save`; a bare `npm install` restores the registry copies, so never run it); the phase A visit landed before this unit and the tree is committed apart from `tmp/`. `tsc --noEmit -p` over a scratch project costs a cold program build per call (about 4 s over probe's core project on this host); `deriveEntrySurfaces` runs once at `guides.test.ts` load, so budget the `guides` project's timeout from a run and state it.

## Unknowns

- Whether `paths` in a scratch config that `extends` the package config resolves relative to the scratch file without `baseUrl` under 6.0.3; the unit settles it with the first fence run and records it.
- Whether the `guides` project's timeout clears the two `tsc` processes at load on a contended host; the unit reports its own reading, and the deciding contended reading is the Orchestrator's after the unit exits.

## Acceptance criteria, cheapest first

1. `grep -rn "from 'typescript'\|from \"typescript\"\|require('typescript')" tests src configs` prints nothing.
2. `npx oxfmt --config .oxfmtrc.json --check` over the owned files exits 0; `npm run lint:check` exits 0; `npm run check` exits 0.
3. `npm run test:setup` exits 0 with every pin named under What is fixed present; `npm run test:guides` exits 0 (the bijection and the fence proof over the real guides, plus the planted refusals).
4. A planted fence fault (the existing `BROKEN_FENCE`) reports `Fence 2 (guide line 8)` and not `Fence 1`; a planted colliding `export *` throws `TypeScript semantics failed`; both are cases in `tests/setupServer.test.ts`, not a one-off run.

## Output

Write `/home/user/fleet/database/tmp/units/ts6-u10-database-readers-report.md`: each function's change in one line with its `file:line`, the `scanDiagnostics` declaration reading, the scratch config shapes written, the `guides` project's load-time reading, each criterion with exit code and last lines, `git status --short` and `git diff --stat`, flagged claims, and a finding for the next change naming the parser-reader pattern now duplicated between scaffold's and database's test setups. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when `scanDiagnostics` is absent from the installed probe or its record lacks what a fence diagnostic needs, when the scratch `paths` overlay does not resolve the package aliases, when a pinned string under What is fixed cannot be preserved without changing what the case proves, or when a gate fails outside the owned files. Helper naming and the internal walk's shape are yours to decide and record.
