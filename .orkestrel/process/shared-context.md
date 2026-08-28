# Shared context for every unit in this campaign

## What the owner asked for

Move the functions in `src/server/execution/` into `src/server/helpers.ts`, confirm they are
properly named, and move their tests into `tests/src/server/helpers.test.ts`.

## Rulings already taken. Do not re-open them.

1. **Names stay.** `execute`, `executeSync`, and `detach` keep their names. Two blind design lanes
   ruled independently that `execute` is the fixed lifecycle verb for "run primary work to
   completion" (`.claude/rules/names.md` § Fixed lifecycle vocabulary), that `executeSync` is the
   sanctioned variant-split form (§ Split instead of compounding), and that `detach` is anchored by
   its own `DetachOptions` type. No rename.
2. **All three move.** `src/server/execution/` is deleted entirely.
3. **`Retention` is removed.** The owner ruled this after being shown that `Retention` is published
   API with guide surface and an executed example, and after being shown that removing it forces a
   version bump and a publish. The ruling is the owner's and is not open to re-argument.

## Authority

Read `/home/user/scaffold/AGENTS.md`, then the applicable files under
`/home/user/scaffold/.claude/rules/`: `names.md`, `architecture.md`, `typescript.md`, `tests.md`,
`documentation.md`, `writing.md`. They outrank existing code. The governing guide is
`guides/process.md`.

`tests/setupPolicy.ts` and `tests/policy.test.ts` are scaffold-vendored. This repository's
`AGENTS.md` forbids editing them here. They are off-limits to every unit.

## Host conditions

- Repository `/home/user/process`, branch `claude/consolidate-execution-functions-v1y62y`. POSIX,
  bash, network available. Node 22.
- `package-lock.json` is expected to be dirty. The Orchestrator resynced a lockfile that was
  committed out of step with `package.json`; that repair is a separate unit and is not yours.
- Dependencies are installed and the tree is green. The Orchestrator recorded this baseline before
  any unit ran, with `npm test`:
  - `test:src` — 9 files, 172 passed, 8 skipped (180)
  - `test:policy` — 1 file, 111 passed
  - `test:config` — 1 file, 46 passed
  - `test:setup` — 2 files, 10 passed
  - `test:guides` — 1 file, 107 passed, 1 skipped (108)
- The 8 skips are `it.skipIf(process.platform !== 'win32')` rows. They are Windows-only and stay
  skipped on this host. None of them sits in a file this campaign moves.

## Mechanism you must not break

`tests/setupPolicy.ts:818-823` derives a source stem from each test path, and
`inspectPolicyMirrorPaths` at `:851-871` raises a `mirror` violation when no source module matches
that stem. So a test file under `tests/src/server/execution/` with no matching source module fails
`npm run test:policy`. The source deletion and the test move must land together.

## Facts measured first-hand by the Orchestrator

- The build at `HEAD` reproduces the published `@orkestrel/process@0.0.8` tarball byte-for-byte for
  `dist/src/{core,server}/index.{js,cjs,d.ts}`, and a second build reproduces it again. The build is
  deterministic.
- `buildExecuteResult` (`src/server/helpers.ts:784`) already applies the UTF-8-safe `trimHead` to
  the concatenated buffer of each stream. The per-chunk slicing inside `Retention.retain` is
  therefore a memory bound, not the final trim.
- `trimHead` retreats its cut to a code-point boundary. `Retention.retain` slices raw bytes with
  `subarray(0, room)`. They are not interchangeable, and substituting one for the other changes
  behaviour.

## Execution contract

Perform your assignment directly. Spawn nothing. Write only the files your brief names as owned.
Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Do not commit,
push, or install. Validate read-only and scoped to your own files; the authoritative tree-wide gates
belong to an independent `verifier` after integration.

Stop and report if reality diverges from your brief: state what you expected, what you found, the
exact evidence, what you did and did not do, and at most one short hypothesis. Do not improvise a
different plan. An ancillary choice your brief leaves open — where a paragraph sits, which order two
independent edits land in — is yours to make, record, and carry on from.
