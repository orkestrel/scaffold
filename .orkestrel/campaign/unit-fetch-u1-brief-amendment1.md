# Unit fetch-U1, amendment 1: the granted fixture file and the standing tree

This amendment supplements `unit-fetch-u1-brief.md` after its deviation stop
(`unit-fetch-u1-deviation.md`). The original stands except where this file changes it.
Written 2026-08-22, before the resumed dispatch.

## What changed since the original

- The brief's scope error is corrected: `tests/setupServer.ts` is GRANTED, for exactly
  the `buildManifestEntry` fixture builder (and any sibling fixture builder in that
  file that constructs a `ManifestEntry`), which must carry the `digest` field the type
  now requires. Nothing else in that file is yours; the test-helper consolidation
  edits in it are standing.
- The tree is no longer clean: a fleet-wide test-helper consolidation landed edits
  across `tests/setupServer.ts`, `tests/src/bin/CLI.test.ts`,
  `tests/src/bin/main.test.ts`, `tests/src/server/Materializer.test.ts`,
  `tests/src/server/WriteTransaction.test.ts`, `tests/src/server/validators.test.ts`,
  and parts of `tests/src/server/helpers.test.ts`, beside your own partial work from
  the stopped run. Treat every `git status --porcelain` entry at your start as
  standing, and treat your stopped run's partial edits as yours to complete.
- `@orkestrel/test` 0.0.10 is installed from a local tarball before your start:
  `ScratchInterface.write` and `link` return the absolute contained path. The
  consolidation's call sites that consumed those returns typecheck against it.
- KNOWN STANDING REDS, not yours: the consolidation's unfinished `read` call sites
  carry `string | undefined` typecheck errors, measured 2026-08-22 after the 0.0.10
  install: `tests/src/bin/CLI.test.ts` :419, :1184, :2938, :3432-33;
  `tests/src/bin/main.test.ts` :170; `tests/src/server/validators.test.ts` :98.
  Re-read at your start; do not fix them and do not let them gate you.

## Amended acceptance criteria

Criterion 3 of the original (`tsc --noEmit --project tsconfig.json` exits 0) is
REPLACED: run `npm.cmd run check:src:core` and `npm.cmd run check:src:server`, each
exiting 0, and run the tree-wide `npx.cmd tsc --noEmit --project tsconfig.json` as an
OBSERVATION, reporting its errors and confirming every one lies in the standing-red
files named above — a new error in any other file is yours. Criterion 5's scoped suite
runs stand, and where a standing consolidation edit in a shared suite file breaks a
case your work does not touch, report it as standing rather than repairing it.

## Everything else

The original brief's objective, fixed contract shapes, owned files (plus the grant),
failing-first requirements (already recorded green in your stopped run — carry the
recorded evidence forward rather than re-proving what did not change), output shape,
and deviation contract stand unchanged.
