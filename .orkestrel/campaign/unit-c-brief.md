# Unit C: normalize the compiler's config-read seam

## Role and engine

Role `implementer`, engine **Opus 5**, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/probe`. You perform the assignment directly and spawn nothing.

## Objective

Stop a malformed caller-named TypeScript project from escaping probe as a raw `Debug Failure` on
a Windows host, by handing the compiler forward-slash paths at the config-read seam, and pin it
with a proof that runs on every host.

## Context

Authority: `AGENTS.md`; `.claude/rules/typescript.md`, `.claude/rules/architecture.md`,
`.claude/rules/tests.md`, `.claude/rules/writing.md`. Guide: `guides/probe.md`, granted only for
the one malformed-project sentence named in the design. Skill: none.

Measured facts (TypeScript 6.0.3, this host, 2026-08-21): `typescript.readConfigFile` with a
NATIVE backslash path and malformed JSON throws
`Debug Failure. Expected C:/... === C:\...` — the compiler normalizes the diagnostic's
`fileName` and asserts equality against the caller's string; the identical call with a
forward-slash path returns the clean diagnostic `1005 ':' expected`; a well-formed file with a
native path is unaffected (no diagnostic is constructed). `getParsedCommandLineOfConfigFile`
and `parseJsonConfigFileContent` show the same split.

The design, fixed by the reconciled adversarial round:

1. In `TypeStage.#service` (`src/server/stages/TypeStage.ts`, near lines 252-305): derive one
   `normalizePath(path)` spelling and hand it to `typescript.readConfigFile` and to
   `typescript.parseJsonConfigFileContent` (both the `basePath` derived with `dirname` and the
   `configFileName` argument). Caches, service identity, and caller context stay keyed by the
   native `path` — do not re-key any map.
2. `#translate` is UNCHANGED (`normalizePath` is idempotent, so its replacement still lands).
   `createLanguageService`'s host and `getCurrentDirectory` are UNCHANGED — record both as
   observations, not edits.
3. New proof in `tests/src/server/stages/TypeStage.test.ts`, beside the project-resolution
   failures: a scratch workspace with a valid root project, a source file, its real
   `node_modules` directory link, and a MALFORMED caller-named project file; assert
   `stage.resolve(project)` rejects with a `ProbeError` shaped
   `{ origin: 'workspace', code: 'malformed' }` whose context carries the stage and the caller's
   project, and whose message contains the workspace-relative project spelling and contains
   neither `Debug Failure` nor a backslash. No platform gate: a malformed project gets the same
   package-level refusal on every host.
4. Guide: one sentence in the failure contract stating that malformed project JSON is translated
   into the workspace/`malformed` refusal with the caller's project in context.

## Unknowns

Line numbers may have drifted (the file carries this wave's `#translate` work); locate sites by
code, report drift.

## Scope

- Owned: `src/server/stages/TypeStage.ts`, `tests/src/server/stages/TypeStage.test.ts`, and in
  `guides/probe.md` only the sentence named in point 4.
- Off-limits: everything else, including `src/server/helpers.ts` and
  `src/server/stages/RuntimeStage.ts` (unit B owns those).
- Standing conditions, expected: unit B's changes plus this wave's earlier modifications are in
  the tree; `@orkestrel/test` is tarball-installed (`file:` reference in the manifest — leave).
  Report, do not chase, any failure you did not cause.
- No commits, installs, or git checkout/restore/stash/reset/clean.

## Execution

You perform the assignment directly and spawn nothing.

## Acceptance criteria, in this order

1. `git status --porcelain` adds exactly the owned files to the standing entries.
2. Scoped `npx oxfmt --config .oxfmtrc.json --check` and
   `npx oxlint --config .oxlintrc.json --deny-warnings` on the owned files exit 0.
3. `npx tsc --noEmit --project tsconfig.json` exits 0.
4. Failing-first evidence: run the new proof BEFORE the source change (write the test first) and
   record the raw failure — on this host it must show the raw `Debug Failure` or the escaping
   behaviour; then the same command after the change passes.
5. `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:server tests/src/server/stages/TypeStage.test.ts`
   — every pre-existing proof still passes; report totals.
6. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server` —
   totals as an observation, naming any failure you did not cause.

## Output

Return: the diff; raw output and exit code per criterion including the failing-first pair; the
observations from point 2 of the design; any deviation decisions. No process diary.

## Deviation contract

Stop if the new proof cannot produce the pre-fix failure on this host (that would mean the
diagnosis does not reach this seam), or if a criterion needs a file outside scope. Ancillary
choices — fixture naming, where the proof sits in the file — are yours: decide, record, carry
on.
