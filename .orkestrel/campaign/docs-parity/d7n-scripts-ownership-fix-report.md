# Scaffold scripts ownership fix report

## Outcome

The bounded unit is implemented against baseline
`369797dcbdfb3b3f2671cc87544ebd256deb76c8` and the accepted dirty entry work.
`HOST_PATHS` now owns `scripts` as a directory. The ordinary host-root hydration and
foreign-file transaction discover its members. No historical-path list or special
retirement branch remains.

## Owned changes

- `src/core/constants.ts` declares `scripts` in `HOST_PATHS`, groups the exact root as
  orchestration, and removes `RETIRED_HOST_PATHS`.
- `src/server/Materializer.ts` removes the historical-path import and derivation branch.
  The existing expanded-root audit and removal transaction remain the only mechanism.
- `src/server/types.ts` aligns the public audit and removal prose with expanded host roots
  and selected canon paths.
- `tests/setupServer.ts` declares `scripts` as a host root and builds a fleet manifest from
  its actual canonical members and executable declarations.
- `tests/src/core/helpers.test.ts` and `tests/src/core/compilers.test.ts` prove exact-root
  grouping, host selection, and a directory artifact in the compiled plan.
- `tests/src/server/Materializer.test.ts` proves raw and staged hydration, canonical script
  bytes, unplanned member discovery, selected-group exclusion, tracked removal, and
  `scripts/service.sh` survival.
- `tests/src/server/helpers.test.ts` aligns its vendored-directory fixture with the root
  contract.
- `tests/src/bin/CLI.test.ts` proves real-Git overwrite removes tracked unplanned
  `scripts/custom.ts` and `scripts/docs.ts` while the existing untracked control survives.
- `tests/distribution.test.ts` keeps the expanded published inventory exact after
  `scripts/docs.ts` leaves the directory.
- `guides/scaffold.md` names scaffold as the owner of `scripts`, states the tracked clean
  deletion conditions, and states that planned `scripts/service.sh` survives.

The unit did not edit `package.json`, `package-lock.json`, `tests/guides.test.ts`,
`host.json`, campaign records, toolchain configuration, or target-vendored files.
The dirty checkout already carried owner changes in those paths, and they remain present.

## Permanent red and green proof

Instrument: `tmp/pass/scripts-ownership/run.sh`

Command:

```text
C:/Users/mikes/scoop/apps/git/current/bin/bash.exe tmp/pass/scripts-ownership/run.sh red
```

Before the source correction, the command exited `1`. Vitest reported
`Tests 1 failed | 51 skipped (52)`. The exact diagnostic was:

```text
AssertionError: expected [] to deeply equal [ { path: 'scripts', …(3) } ]
```

Evidence:

- `tmp/pass/scripts-ownership/red.log.txt`
- `tmp/pass/scripts-ownership/red.exit.txt`

The same instrument with `green` exited `0`. Vitest reported
`Tests 1 passed | 51 skipped (52)`.

Evidence:

- `tmp/pass/scripts-ownership/green.log.txt`
- `tmp/pass/scripts-ownership/green.exit.txt`

## Scoped validation

`tmp/pass/scripts-ownership/scoped.sh` exited `0` after the final format pass.
Its retained log is `tmp/pass/scripts-ownership/scoped.log.txt`.

```text
Materializer.test.ts: Tests 53 passed (53)
selected core helpers and compilers: Tests 13 passed | 212 skipped (225)
selected server helpers: Tests 5 passed | 183 skipped (188)
CLI real-Git overwrite regression: Tests 1 passed | 134 skipped (135)
distribution inventory regression: Tests 1 passed | 4 skipped (5)
```

`tmp/pass/scripts-ownership/validate.sh` exited `0`. It ran the `src:core`,
`src:server`, and `src:bin` TypeScript projects; a temporary TypeScript project covering
the affected tests; scoped Oxlint; scoped Oxfmt check; and scoped `git diff --check`.
The retained log is `tmp/pass/scripts-ownership/validate.log.txt`.

The stale-reference check returned no matches for `RETIRED_HOST_PATHS`,
`retired host path`, or `retirement` in the owned source, tests, and guide.

## Instrument deviations

The registered Probe accepted the directory-root candidate and runtime control request,
but returned no receipt:

```text
Mcp error: -32000: Legacy protocol 2025-11-25 cannot represent a stream result
```

The permanent real-host regression is the settling proof and includes a selected-group
negative control.

The initial expanded scoped script used the project label `bin`; Vitest refused startup
because the registered label is `src:bin`. The instrument was corrected without a product
change, then the retained run exited `0`.

The first scoped format check named `tests/src/bin/CLI.test.ts` and
`tests/src/core/helpers.test.ts`. Scoped Oxfmt rewrote those owned files. The complete
validation and scoped tests then exited `0`.

## Diff and handoff

The current combined dirty diff in the bounded product paths is:

```text
guides/scaffold.md                    |  80 ++---
src/core/constants.ts                 |  21 +-
src/server/Materializer.ts            |  28 +-
src/server/types.ts                   |   7 +-
tests/distribution.test.ts            |   1 -
tests/setupServer.ts                  |  37 ++-
tests/src/bin/CLI.test.ts             |  11 +-
tests/src/core/compilers.test.ts      | 575 +++++++++++++++++++++++-----------
tests/src/core/helpers.test.ts        |  50 +--
tests/src/server/Materializer.test.ts |  81 +++++
tests/src/server/helpers.test.ts      |   5 +-
```

This stat includes the accepted dirty entry changes that preceded this unit.

`host.json` needs root regeneration because the staged host membership changed from
individual script declarations to the `scripts` root and no longer includes
`scripts/docs.ts`. Root owns that regeneration, the build, ordered product gates, the
actual built CLI/Git acceptance, and independent review.

Shared-file patches: none.
