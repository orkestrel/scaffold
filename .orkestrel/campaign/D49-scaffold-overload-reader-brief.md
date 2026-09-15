# Unit D4-9 — `@orkestrel/scaffold`: the surface declaration reader accepts an exported function overload

## Role and engine

`builder` on Sonnet, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/scaffold` checkout while this unit runs. The tree is clean at
`bf7d33a2` apart from untracked and modified files under `.orkestrel/campaign/` (the campaign
records — never touch them) and the ignored `tmp/`.

## Objective

The `surface` policy rule's declaration reader, `readPolicyDeclarations` in
`tests/setupPolicy.ts` (near `:1684-1778`), accepts an `ExportNamedDeclaration` whose declaration
is a `FunctionDeclaration`, `ClassDeclaration`, `TSInterfaceDeclaration`, `TSTypeAliasDeclaration`,
`TSEnumDeclaration`, or `TSModuleDeclaration`, and refuses every other form with
`export declaration is unsupported at <path>:<line>: <type>`. An exported function OVERLOAD
signature — `export function name(...): T` with no body — parses as `TSDeclareFunction`, so a
target whose source carries an overload fails its policy sweep. The mcp checkout's visit against
scaffold 0.0.68 reads
`surface population incomplete: export declaration is unsupported at src/core/helpers.ts:837: TSDeclareFunction`
(`buildModernResult`'s overload). This file is vendored into every target as `tests/setupPolicy.ts`,
so the fix ships with the next scaffold release.

## Carriers

1. In `readPolicyDeclarations`, accept `declaration.type === 'TSDeclareFunction'` beside
   `FunctionDeclaration` in the accepted list (the same `id` reading; the same `{ name, path,
   line }` push). An overload signature and its implementation then yield the same name more than
   once from one file; read `collectPolicyDeclarations` (near `:1789`) and the collision reading
   that consumes it, and confirm a repeated name from ONE file under ONE owner is not reported as
   a collision (a name collides only across owners). If the consumer would report it, dedupe by
   name within one file at the reader's return, keeping the first line, and say so.
2. Pin it in `tests/setupPolicy.test.ts`, beside the existing reader cases near `:90-125`
   (`refuses unsupported setup exports and malformed source` and its siblings): a case named
   `reads an exported function overload as one name` whose source carries two overload
   signatures and the implementation of one function, asserting the reader returns the name
   (once, or once per signature — whichever carrier 1 settles) with no throw; and a control that
   the `TSExportAssignment`/default refusals still throw. Red first (the pin throws against the
   current reader); record the command and the reading.
3. The vendored copy is this file: `dist/host` stages it and `host.json` records its digest, so
   the build regenerates both — you do not edit `host.json` or `dist/`. Report that
   `npm run build` regenerates the inventory entry's digest for `tests/setupPolicy.ts` (read
   `git diff --stat host.json` after the build).

## Context, law, host, and bench

`AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/typescript.md`, and
`.claude/rules/writing.md` govern; `guides/scaffold.md` and `.claude/rules/workspace.md` § Policy
instruments describe the rule. Windows host: Git Bash for the Bash tool; no heredocs, no
`node -e`. Scoped runs: `npm run test:setup -- tests/setupPolicy.test.ts`, then
`npm run test:policy`. Run only scoped Vitest projects and the non-mutating checks; `npm run
build` is allowed once for carrier 3's reading (it writes `dist/` and regenerates `host.json`;
leave `host.json`'s regenerated content in place). Never tree-wide `format` or `lint --fix`. Do
not commit, stash, checkout, restore, reset, clean, or run `npm install`.

## Scope

**Owned.** `tests/setupPolicy.ts` (the reader), `tests/setupPolicy.test.ts` (the pin). `host.json`
changes only through the build (carrier 3). **Off-limits.** Everything else, including
`.orkestrel/**`, `package.json`, `package-lock.json`, `guides/**`, `src/**`, `configs/**`.

## Deviation contract

Stop and report if the collision consumer reports a same-owner repeated name and the dedupe in
carrier 1 does not settle it, or if `test:policy` is red for a reason outside the reader.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:setup -- tests/setupPolicy.test.ts` exits 0 with the new pin red first
   (recorded) and green after; `npm run test:policy` exits 0.
3. `npm run build` exits 0; `git diff --stat` shows `host.json` moved only in the
   `tests/setupPolicy.ts` entry's digest and the manifest digest (report the two hunks).
4. `git status --short --untracked-files=no` names `tests/setupPolicy.ts`,
   `tests/setupPolicy.test.ts`, and `host.json`, and nothing else.

## Output

The reader's before and after; the pin with its red and green readings; the collision-consumer
reading for a repeated same-owner name; the `host.json` hunks; the acceptance readings; deviation
state.
