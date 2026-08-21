# Unit A3: the guide's link contract

## Role and engine

Role `implementer`, engine **Opus 5**, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/test`. You perform the assignment directly and spawn nothing.

## Objective

Bring `guides/test.md` to parity with the shipped link fallback: document `createLink`, rewrite
the `link` contract rows, move the worked example onto ground every host can walk, and carry
the fallback rule in exactly one place.

## Context

Authority: `AGENTS.md` (§ Writing — never state a count; delete counts your edits touch, never
correct them), `.claude/rules/documentation.md` (a prose claim about behaviour carries an
executed assertion; parity is exact), `.claude/rules/writing.md`, `.claude/rules/tests.md`
(fence transcriptions live beside the fences in `tests/guides.test.ts` — change a fence, change
its transcription). Skill: none.

The shipped state (units A1 and A2, in the working tree): `createLink(path, source)` is
exported from `src/server/helpers.ts` — untyped `symlinkSync` first; only `EPERM` falls back;
the source resolves against the link's own directory; an existing non-directory rethrows the
original `EPERM` and leaves nothing at the target; a missing source yields a dangling junction,
which later resolves only if a DIRECTORY appears at the source; where the host creates a
junction the stored value is the resolved absolute path. `ScratchInterface.link`'s TSDoc now
speaks of "the destination path the link points at" and promises no exact stored text. The
proofs behind the guide's claims: the read-through, dangling, `EEXIST`, refusal, and
absolute-stored-text proofs in `tests/src/server/factories.test.ts` and the `createLink` unit
family in `tests/src/server/helpers.test.ts` (`87 passed | 8 skipped` on this host,
2026-08-21). The `guides` project is currently RED because `createLink` has no guide row — your
unit turns it green.

Obligations, fixed by the reconciled design round:

1. The `ScratchInterface` method table's `link` row (near `guides/test.md:340`): the fallback,
   the file-source refusal, and the destination-path vocabulary.
2. A new subsection under the scratch section — "Hosts that create no symbolic link" — carrying
   the WHOLE rule once: the `EPERM`-only trigger, resolution against the link's directory, the
   non-directory refusal, the dangling acceptance with the directory-only later-resolution
   disclosure, and the absolute stored value. No other section restates it; the `link` row and
   the `createLink` row point here.
3. `createLink`'s Surface row and documentation under the server helpers, per the guide's
   existing helper-row idiom.
4. The worked example (near `guides/test.md:921-976`): the link demonstration links a DIRECTORY
   and reads a file through it, valid on every host; the file-link case moves into the new
   subsection as prose. If the example is a transcribed flagship fence, update its
   transcription in `tests/guides.test.ts` beside it.
5. The threat-model passage (near `:611-629`) gains one clause: the source stays unchecked
   except on the fallback path, which stats it.
6. Any count your edits touch is deleted, not corrected.

## Scope

- Owned: `guides/test.md`; `tests/guides.test.ts` ONLY for fence-transcription rows your guide
  edits oblige.
- Off-limits: `src/**`, every other test file, `package.json`.
- Standing conditions: the working tree carries units A1/A2 plus the user's
  `package.json`/lockfile entries — leave all of them.
- No commits, installs, or git checkout/restore/stash/reset/clean.

## Execution

You perform the assignment directly and spawn nothing.

## Acceptance criteria, in this order

1. `git status --porcelain` adds exactly the owned files to the standing entries.
2. `npx.cmd oxfmt --config .oxfmtrc.json --check guides/test.md tests/guides.test.ts` exits 0
   (drop `tests/guides.test.ts` from the list if you did not touch it).
3. `npx.cmd oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exits 0 when
   touched.
4. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project guides`
   exits 0 — parity green including the `createLink` row.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server`
   still reports `87 passed | 8 skipped` (your unit changes no behaviour).
6. Report: the new subsection's full text; every row you touched; every count you deleted.

## Output

The diff; raw output and exit code per criterion; the criterion 6 report. No process diary.

## Deviation contract

Stop if parity red persists for a cause outside `guides/test.md` (that is a source-surface
finding). Section placement, heading wording, and example file names are yours: decide, record,
carry on.
