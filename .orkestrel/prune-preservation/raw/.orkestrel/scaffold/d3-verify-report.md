# Unit D3 — gate evidence

Lane: `verifier` — Sonnet, native subagent, 2026-09-17. Transcribed by the Orchestrator from the
lane's returned message. Run on the final tree, after units D1, D2, and D3 and after the
Orchestrator's integration of D2's returned patch into `tests/setupServer.test.ts`.

This run exists because round two's objective lane found that the retained gate evidence predated
that integration. A stale green is worse than no green.

## The chain

| Gate | Command | Exit | Decisive line |
| ---- | ------- | ---- | ------------- |
| Format | `npm run format:check` | 0 | `All matched files use the correct format.` |
| Lint | `npm run lint:check` | 0 | oxlint clean under `--deny-warnings` |
| Typecheck | `npm run check` | 0 | four `tsc --noEmit` projects, no diagnostics |
| Build | `npm run build` | 0 | `build-host: staged 175 file(s) into dist/host`; `build-inventory: staged 175 file(s) into host.json` |
| Distribution | `npm run test:distribution` | 0 | `Test Files 1 passed (1)`, `Tests 6 passed \| 1 skipped (7)` |
| Test | `npm test` | 0 | per-project counts following |

## Per-project counts

| Project | Files | Tests |
| ------- | ----- | ----- |
| `src:core` | 9 passed | 422 passed |
| `src:server` | 5 passed | 466 passed, 7 skipped (473) |
| `src:bin` | 3 passed | 257 passed |
| `policy` | 1 passed | 102 passed |
| `config` | 1 passed | 173 passed, 1 skipped (174) |
| `setup` | 3 passed | 119 passed, 3 skipped (122) |
| `guides` | 1 passed | 23 passed |

The `config` and `setup` totals were named in the dispatch before the run and each matches its named
reading exactly. The `setup` total carries the case the Orchestrator integrated from D2's returned
patch, which is what round two found missing from the earlier evidence.

## Digests

`tests/config.test.ts` and `dist/host/tests/config.test.ts` both digest
`9c7fb4dab82b46c5fb436116929c8214fd54a94511272d2c574714b65218152f`, and `host.json` carries that same
digest for that entry. The vendored copy is the source.

## The `deprecat` search

Patterns searched over every log this run produced — `tmp/verify/format.log.txt`, `lint.log.txt`,
`check.log.txt`, `build.log.txt`, `distribution.log.txt`, and `test.log.txt`.

One file carries a hit: `distribution.log.txt` lines 7-8, Node's own
`[DEP0190] DeprecationWarning: Passing args to a child process with shell option true`. That is the
runtime warning for the `shell: true` form this host requires, which `tests/distribution.test.ts`
already records as the way through Windows batch-argument hardening. It is not project-authored
deprecation. No other log carries the string.

## Anomalies

None. No flake, no cache warning, no unexpected output, and no gate needed a re-run.

VERDICT: GREEN
