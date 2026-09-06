# Unit brief — U7-fix-b: the resident-service prose sweep and the receipt fixtures (probe)

Supersedes nothing. This is the second of two serial fix units for U7; it runs after `u7-fix-a`
has exited and carries the prose findings the U7 audit round substantiated: `u7-audit-subjective.md`
claim 7 and F6, F8, F9; `u7-audit-checker.md` claim 7; `u7-audit-objective.md` claim 7's note on
the `Issue` row and its stale-digest finding; reconciled in `u7-audit-verdict.md`.

## Role and engine

`builder`, Sonnet. Perform the assignment directly and spawn nothing. You are the sole writer in
`/home/user/fleet/probe` for the life of this unit.

## Objective

Make every sentence the package publishes about its type stage true of the mechanism that shipped:
the compiler is a process the stage spawns over a mirror, not a resident engine, and one project is
documented with one digest.

## Context

- Read first: `/home/user/fleet/probe/AGENTS.md` § Writing, `.claude/rules/writing.md`,
  `.claude/rules/documentation.md` § Parity, `.claude/rules/typescript.md` § Comments and API
  documentation. Then read `src/server/stages/TypeStage.ts` in full (its class TSDoc states the
  mechanism your sentences must match) and `guides/probe.md` in full.
- The working tree is dirty with U7's and `u7-fix-a`'s uncommitted work and stays so; commit
  nothing. The Orchestrator captures the diff after you exit.
- `u7-fix-a` landed these facts your sentences must agree with: the digest is read by
  `tsc --showConfig` over the mirrored copy of the project with the mirror as the current
  directory; a symbolic link is not carried into the mirror; a diagnostic against a `.json` file
  the workspace holds, or against no file, is the workspace's; the helper `loadWorkspaceModule` is
  now `loadWorkspaceVitest`; and `collectWorkspaceFiles` is the one workspace walk. Do not restate
  them in sentences `u7-fix-a` owns (listed under Off-limits); reach them by reference where a
  sentence you own needs them.
- The lint stage still holds a resident Oxlint language server and the runtime stage a resident
  Vitest runner. "Resident" stays true of those and false of the type stage.
- The type stage lowers each compiler coordinate by one: `scanDiagnostics` subtracts one from the
  one-based line and the one-based UTF-16 column the compiler prints, and the lint stage copies the
  language server's zero-based coordinates unchanged.
- The declared projects the warm builds over this repository are the ones `TypeStage.#projects`
  yields: the root `tsconfig.json` and every `configs/src/tsconfig.<name>.json` and
  `configs/app/tsconfig.<name>.json` present. Name them from the tree, never as a count.
- Host: Linux, Node 22.22.2. Scoped test command: `npx vitest run --config vite.config.ts
  --no-cache --reporter=dot --project <project> <file>`. Run no whole-suite gate.

## Scope

Owned: `guides/probe.md` except the sentences listed under Off-limits; `src/server/Probe.ts`
(TSDoc only); `src/server/types.ts` (the `OverlayInterface` and `StageInterface` TSDoc only);
`src/core/constants.ts`, `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`,
`tests/src/core/validators.test.ts`, `tests/src/server/ProbeServer.test.ts` (the digest value
only, edit 6).

Off-limits: every file `u7-fix-a` owned other than the shared ones named here
(`src/server/stages/*`, `src/server/helpers.ts`, `src/server/parsers.ts`, `tests/src/server/**`
other than `ProbeServer.test.ts`), and inside `guides/probe.md` the helper-table rows, the
`Diagnostic` Surface row, the digest paragraph beginning "The project digest is the digest of the
`compilerOptions` member", the paragraph beginning "**A read is contained lexically only", and the
paragraph beginning "**A diagnostic about a project belongs to the workspace.**". Also off-limits:
`package.json`, `package-lock.json`, every vendored file (`.claude/**`, `configs/**`,
`tests/setup*.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/guides.test.ts`), and
`tmp/` beyond `tmp/units/`.

No `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, no commit, no install, no
tree-wide `format` or `lint --fix`.

## Edits

1. **The resident sentences.** Rewrite each of these so it states the shipped mechanism, keeping the
   sentence's place and its neighbours' meaning:
   - `guides/probe.md` tagline (about lines 4 and 5): "It holds resident TypeScript, Oxlint, and
     Vitest engines" → the type stage runs the workspace's own compiler over a mirror of the tree,
     and the lint and runtime stages hold resident Oxlint and Vitest engines.
   - `src/server/Probe.ts` class TSDoc first sentence (about line 44): "Answers claims through
     resident TypeScript, Oxlint, and Vitest stages." → name the type, lint, and runtime stages
     without "resident".
   - `src/server/types.ts` `OverlayInterface` remarks (about lines 136 to 138): the sentence naming
     "a language service, a document protocol, and a module resolver" → the lint stage's document
     protocol and the runtime stage's module resolver read one candidate set through their own
     adapters, and the type stage holds no overlay because it writes each draft into its mirror.
   - `src/server/types.ts` `StageInterface` first sentence and remarks (about lines 197 to 205):
     "Inspects one case with a resident workspace tool" and "reuses the resulting tool across calls"
     → a stage inspects one case with the workspace's own tool, warming builds the resident tool
     or the mirror it reuses across calls, and the concurrency sentence names "the same resident
     tool or mirror" rather than "the same resident tool".
   - `guides/probe.md` `StageInterface` Surface row (about line 140): "The resident-stage contract"
     → "The stage contract".
   - `guides/probe.md` `guardStage` helper row (about line 219): "Guards one resident-stage
     operation" → "Guards one stage operation".
   - `guides/probe.md` (about lines 837 to 839): "The type stage lowers nothing either, because the
     compiler answers in that basis too" → the type stage lowers the compiler's one-based line and
     one-based UTF-16 column by one each, and the runtime stage lowers a Vitest frame's line by one.
   - `guides/probe.md` (about lines 1079 to 1082): the tests list entry naming `TypeStage.test.ts`
     under "the resident stages against their real tools" → "the stages against their real tools".
   - `guides/probe.md` (about line 333): the example "a project the caller named and the compiler
     cannot parse" listed as a caller's own mistake contradicts the later paragraph that rules such
     a project the workspace's; replace the example with one the later paragraph does not refuse,
     such as a `Claim.project` path that escapes the workspace.
2. **The `Issue` Surface row** (about line 41): add that the type and runtime stages report a
   zero-width range at the reported point, and the lint stage the span the language server
   published.
3. **§ Prerequisites** (about lines 433 to 471): add a row stating that every project the warm
   builds — the root `tsconfig.json` and each `configs/src/tsconfig.<name>.json` and
   `configs/app/tsconfig.<name>.json` — must resolve, because every inspection awaits that warm;
   a project the compiler refuses raises `origin: 'workspace'`, `code: 'malformed'` naming the
   project, for every claim whichever project it names. The behaviour is pinned by the
   `TypeStage.test.ts` case `refuses every inspection while a declared project is malformed`; name
   that case in the row's last sentence the way the neighbouring rows cite their tests, or leave the
   citation out if no neighbouring row cites one.
4. **§ Cost** (about lines 1042 to 1043): replace "the four declared projects" and "the same four"
   with the projects' names read from the tree, or with "the declared projects"; the measurements
   beside them stay.
5. **A sweep for what edit 1 did not list.** Search `guides/probe.md`, `src/server/Probe.ts`,
   `src/server/types.ts`, and `src/core/types.ts` for `resident`, `language service`,
   `synchronous`, `program`, and `overlay`, and rule every hit: a sentence about the lint or
   runtime stage stays; a sentence about the type stage that describes the in-process service is
   rewritten to the mirror mechanism; a permitted hit is recorded as permitted in the report with
   its line. Report the pattern and the paths behind the sweep.
6. **One digest per project.** Replace every `3b674fdf121c85efb9ed1bab25ceeec8` with
   `d61f11b52460b1c6707cfac2c6078d59` in `src/core/constants.ts`, `src/core/helpers.ts`,
   `tests/src/core/helpers.test.ts`, `tests/src/core/validators.test.ts`, and
   `tests/src/server/ProbeServer.test.ts`, inside receipt strings included, so the documented
   `configs/src/tsconfig.core.json` digest agrees with `src/core/types.ts` and the guide. Change
   nothing else in those files.

## Unknowns

- Whether `tests/guides.test.ts` executes any fence your sentences sit in: run
  `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides` after the
  edits and report its summary line; a red row names the sentence to repair.

## Output

Write `tmp/units/ts6-u7-fix-b-report.md` with: the file list touched; per edit the sentence before
and after, with its line; the sweep's pattern, paths, and every hit's ruling; the unknown answered;
every criterion below with PASS or FAIL and its evidence; and any deviation.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when
a sentence you must rewrite sits inside a paragraph `u7-fix-a` owns, when a guide fence reddens, or
when a rewrite would need a file you do not own. Where a rewritten sentence sits, and which words
carry it, is yours to decide and record.

## Acceptance criteria (cheap first)

1. `npx oxfmt --config .oxfmtrc.json --check <each owned file>` exits 0.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <each owned source or test file>` exits 0.
3. `grep -rn "resident TypeScript\|resident-stage\|3b674fdf121c85efb9ed1bab25ceeec8" src tests guides`
   prints nothing.
4. `grep -n "the four declared\|the same four" guides/probe.md` prints nothing.
5. `npx tsc --noEmit --project tsconfig.json` exits 0.
6. The scoped runs of `tests/src/core/helpers.test.ts`, `tests/src/core/validators.test.ts`
   (`--project src:core`), and `tests/src/server/ProbeServer.test.ts` (`--project src:server`)
   exit 0, and the `guides` project run exits 0.

## Review evidence

The Orchestrator captures `git diff` and `git status --short` after you exit; write nothing under
`.orkestrel/`.
