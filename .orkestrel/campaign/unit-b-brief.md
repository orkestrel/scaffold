# Unit B: classify a caller's host-refused target name

## Role and engine

Role `implementer`, engine **Opus 5**, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/probe`. You perform the assignment directly and spawn nothing.

## Objective

Make probe report `claimant`/`refused` when the host refuses the name a caller supplied for its
test file, on every host, without probe owning any path-length or character policy. The failing
proof this repair binds to is `refuses a caller's unacceptable target path`
(`tests/src/server/stages/RuntimeStage.test.ts:547-567`), which today fails on this host with an
`instrument`-origin issue carrying `ENOENT`.

## Context

Authority, all inside the probe checkout: `AGENTS.md`; `.claude/rules/names.md`,
`.claude/rules/typescript.md`, `.claude/rules/architecture.md`, `.claude/rules/tests.md`,
`.claude/rules/writing.md`. Guide: `guides/probe.md` — the failure-pair rows and the
`resolveWorkspaceFile` prose are granted where named. Skill: none.

Host facts, measured 2026-08-21 (Windows 11, Node v24.18.1, NTFS): an overlong (300-char)
component, a name carrying `<` or `?`, a missing parent, and an ordinary missing file ALL report
`ENOENT` from `lstatSync` and `writeFileSync`; `ENAMETOOLONG` never fires here; a write refused
`ENOENT` under a parent that stats as a directory is the discriminating signature — an ordinary
absent file would have been created. On POSIX the same caller mistake surfaces as
`ENAMETOOLONG`, which `resolveWorkspaceFile` already classifies.

The design, fixed by the reconciled adversarial round:

1. `resolveWorkspaceFile` (`src/server/helpers.ts:57-119`) is UNCHANGED: the mutate walk's
   `ENOENT`/`ENOTDIR` break and the outer catch's `ENAMETOOLONG`/`ERR_INVALID_ARG_VALUE`
   classification both survive exactly.
2. A new exported predicate in `src/server/helpers.ts`:
   `isRefusedName(file: string, error: unknown): boolean` — true when the fault means the host
   refuses this name for creation: the error's code is `ENAMETOOLONG`; or
   `ERR_INVALID_ARG_VALUE`; or `ENOENT` while `statSync(dirname(file), { throwIfNoEntry: false })`
   reports a directory. Total, never throws, no platform branch. It is a filesystem-reading
   predicate, so it lives in `helpers.ts`, not `validators.ts` (the `isVacant` precedent in
   `.claude/rules/architecture.md` § Kind purity).
3. One call site: `RuntimeStage.#specification` (`src/server/stages/RuntimeStage.ts:387-435`).
   When the final create fails and `isRefusedName(file, outcome.error)` holds, throw a
   `ProbeError` with `origin: 'claimant'`, `code: 'refused'`, `context` carrying the stage and
   the caller's `path`, and the native error as `cause`. The existing `creating` branch (missing
   or refused parent → workspace origin) and the instrument-issue fallback for other write
   failures stay.
4. Test gate: add `REFUSED_RUNTIME_TARGETS` to `tests/setupServer.ts`, following that file's
   existing capability-probe idiom: in an owned probe directory, attempt to create a file whose
   final component is overlong beneath an existing directory; true only when the create FAILS
   while that parent still stats as a directory. (A host with long-path support creates it, and
   the proof is honestly inapplicable there.) Gate the RuntimeStage proof with it. The proof's
   assertions stay exactly as written — they are already portable.
5. Unit proofs of `isRefusedName` in `tests/src/server/helpers.test.ts`, with error values
   produced by REAL operations in a scratch tree, never by literal objects: a write to a
   300-char final segment under a real directory asserts true (this host produces `ENOENT`,
   POSIX produces `ENAMETOOLONG`; the assertion is on the classification, so it is ungated); a
   write under a missing directory asserts false; a NUL-byte path asserts true; a plain
   unrelated `Error` asserts false.
6. Guide: the claimant/`refused` failure-pair wording moves from the length limit to the host
   refusal — "a caller-supplied name the host refuses to inspect or create", with length and NUL
   as examples rather than policy. Touch only the sentences that state this.

## Unknowns

Exact current line numbers may have drifted (the file carries this wave's earlier invalidation
fix); locate each site by its code and report drift.

## Scope

- Owned: `src/server/helpers.ts`, `src/server/stages/RuntimeStage.ts`, `tests/setupServer.ts`,
  `tests/src/server/helpers.test.ts`, and in `guides/probe.md` only the failure-pair and
  `resolveWorkspaceFile` sentences named in point 6.
- Report-only: `tests/src/server/stages/RuntimeStage.test.ts` — its proof stays byte-identical
  apart from the gate you add around it; adding `it.runIf(REFUSED_RUNTIME_TARGETS)` to that one
  proof IS granted.
- Off-limits: `src/server/stages/TypeStage.ts` (a later unit owns it), every other file.
- Standing conditions, expected: the tree carries this wave's earlier modifications
  (`src/server/stages/RuntimeStage.ts`, `src/server/stages/TypeStage.ts`,
  `tests/src/bin/main.test.ts`, `tests/src/server/helpers.test.ts`,
  `tests/src/server/stages/LintStage.test.ts`) plus a tarball-installed `@orkestrel/test`
  (manifest and lockfile reference a `file:` tarball — leave them). The suite is largely green
  on this host after the tarball; any remaining failure you did not cause is reported, not
  chased.
- No commits, installs, or git checkout/restore/stash/reset/clean.

## Execution

You perform the assignment directly and spawn nothing.

## Acceptance criteria, in this order

1. `git status --porcelain` adds exactly the owned files (and the one granted gate line) to the
   standing entries.
2. Scoped `npx oxfmt --config .oxfmtrc.json --check` and
   `npx oxlint --config .oxlintrc.json --deny-warnings` on the owned files exit 0.
3. `npx tsc --noEmit --project tsconfig.json` exits 0.
4. Failing-first evidence: run
   `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:server tests/src/server/stages/RuntimeStage.test.ts -t "refuses a caller's unacceptable target path"`
   BEFORE your fix and record the exact failure; the same command after the fix passes.
5. The `isRefusedName` unit proofs pass:
   `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:server tests/src/server/helpers.test.ts`
   — report totals; every pre-existing proof in that file still passes.
6. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server` —
   report totals as an observation, naming any failure you did not cause.

## Output

Return: the diff; raw output and exit code per criterion, including the before/after pair for
criterion 4; any deviation decisions. No process diary.

## Deviation contract

Stop if the named proof still fails after the fix for a cause this brief does not describe, or
if closing a criterion appears to need a file outside your scope. Ancillary choices — the probe
constant's exact fixture name, comment wording, where in `helpers.ts` the predicate sits —
are yours: decide, record, carry on.

## Amendment 1, 2026-08-21, before launch

Measured after the tarball install (probe `test:src` = 9 failed | 168 passed | 3 skipped): the
failing proof's CURRENT shape is `promise resolved "{ stage: 'runtime', ... }" instead of
rejecting` — the inspection now completes and carries the failure as an issue in the result
instead of rejecting. That is the failing-first evidence criterion 4 records; the earlier
"instrument-origin issue carrying ENOENT" description dated from before the link fix. The fix's
required end state is unchanged: the inspection REJECTS with the claimant/`refused`
`ProbeError`. Also expected in the tree, NOT yours to touch or chase: four sibling RuntimeStage
proofs (`names the declared test path...`, `refuses a generated specification beneath a
symbolic link`, `raises progress...`, `preserves workspace classification when cleanup crosses
a symbolic link`) fail in their FIXTURES on raw `symlinkSync(..., 'dir')` `EPERM`; a later unit
converts them. Four `src:bin` signal proofs fail on Windows signal semantics; also a later
unit's subject.
