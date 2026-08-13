# Campaign registry — `@orkestrel/test`

## Goal

Create one published package, `@orkestrel/test`, holding the test helpers the Orkestrel fleet
repeats. Every package then imports one hardened helper set instead of maintaining its own copy.

## Exit criterion

The campaign ends when each capability below ends implemented, repaired, retained, or intentionally
excluded on evidence. Nothing else ends it.

| # | Capability                                                                                          |
| - | ---------------------------------------------------------------------------------------------------- |
| 1 | The repeated-helper inventory exists, covering all 41 published packages, with `file:line` evidence  |
| 2 | The package contract is decided by a two-lane adversarial pass and recorded                         |
| 3 | The workspace is created by the published `scaffold` binary, not by hand                            |
| 4 | Every aggregated helper is implemented, typed in `*/types.ts` first, and exported from its barrel   |
| 5 | Each helper either reuses a published `@orkestrel/*` primitive or records why no published fit exists |
| 6 | The guide documents every public export and parity holds                                            |
| 7 | The package's own tests prove every helper, including the instruments' negative controls            |
| 8 | The five gates are green, run by an independent verifier                                            |
| 9 | The work is committed and pushed to `claude/orkestrel-test-package-0m1m8u` in `orkestrel/test`       |

## Excluded from this campaign, on evidence

- **Editing the 41 consumer packages.** The designated branches name `orkestrel/scaffold` and
  `orkestrel/test` only. Adopting the package across the fleet is a separate campaign with a
  41-repository blast radius.
- **Publishing.** Publishing is the user's decision and the user's credential. This campaign
  prepares a publishable package and stops at the approval.
- **`tests/setupPolicy.ts`.** Byte-identical in all 41 packages, md5 `0d70956cc46f38114915a3dc0656bf8b`,
  and vendored by `@orkestrel/scaffold` through `HOST_PATHS` (`src/core/constants.ts:142`). Its
  duplication is already solved by a different mechanism, so it does not move.

## Repositories and branches

| Repository         | Path                  | Branch                                | Role                                   |
| ------------------ | --------------------- | ------------------------------------- | -------------------------------------- |
| `orkestrel/scaffold` | `/home/user/scaffold` | `claude/orkestrel-test-package-0m1m8u` | Orchestrator repo; campaign artifacts |
| `orkestrel/test`     | `/home/user/test`     | `claude/orkestrel-test-package-0m1m8u` | The deliverable; empty at campaign start |
| 41 published packages | `/home/user/packages/<name>` | as cloned, `--depth 1`        | Read-only evidence                     |

## Live registry state

Read from `https://registry.npmjs.org` on 2026-08-13, not from the catalog.

41 published `@orkestrel/*` packages. `@orkestrel/test` returns not-found, so the name is free.
`@orkestrel/supervisor` and `@orkestrel/brief` have repositories but no release, so they are
excluded from the fleet under this campaign's "published" bound.

The catalog table in `.claude/agents/orkestrel.md` is stale against that read on seven rows:
`database` 0.0.8→0.0.9, `mcp` 0.0.14→0.0.15, `middleware` 0.0.10→0.0.11, `scaffold` 0.0.27→0.0.30,
`server` 0.0.11→0.0.12, `toolbox` 0.0.4→0.0.5, `workflow` 0.0.11→0.0.12.

## Bench liveness

Recorded from a round-tripped model call, not from a version string or an auth-state check.

| Bench       | Model                  | Probe result            | Evidence                                |
| ----------- | ---------------------- | ----------------------- | --------------------------------------- |
| Cursor Grok | `cursor-grok-4.6-high` | `GROK_LIVE Cursor Grok 4.6` | `tmp/cursor/probe.log`              |
| Codex Sol   | `gpt-5.6-sol`          | `SOL_LIVE`              | thread `019ffa2c-f387-7210-b819-c22aec5c022e` |

Codex was dark at session start (`Not logged in`) and recovered in-session through
`codex login --device-auth`. Both lanes therefore run on their default engines and no substitution
is recorded.

`.claude/agents/grok.md` pinned `cursor-grok-4.5-high`. `agent models` on 2026-08-13 serves
`cursor-grok-4.6-high`, so the role file is updated to it.

## Measured baseline

| Fact                                                              | Value    |
| ----------------------------------------------------------------- | -------- |
| Published packages cloned                                         | 41       |
| Test files across the fleet                                       | 493      |
| Lines in `tests/**/*.test.ts`                                     | ~230,000 |
| Lines in `tests/setup*.ts`                                        | ~53,000  |
| Exported symbols in `tests/setup*.ts`, excluding `setupPolicy.ts` | 1,119    |

Name-level repetition across packages, policy symbols removed:

| Symbol                                     | Packages |
| ------------------------------------------ | -------- |
| `createRecorder` / `TestRecorderInterface` | 32       |
| `waitForDelay`                             | 17       |
| `recordEmitterEvents` / `EmitterRecorders` | 13       |
| `isTotal`                                  | 13       |
| `captureError`                             | 12       |
| `createErrorRecorder`                      | 11       |
| `createGate` / `TestGateInterface`         | 7        |

`createRecorder` is a measured near-duplicate rather than a clean duplicate: normalizing whitespace
and return-type annotations leaves 6 distinct bodies across the 32 declarations, 22 of them sharing
one. 30 implement `clear()` as `calls.length = 0` and 1 as `calls = []`, which is a real behavioural
difference — the first empties an already-captured `calls` reference and the second does not.

That table is a floor. It finds a helper two packages spell the same way and cannot find one they
spell differently and implement identically, which is what the fleet-wide lens lanes exist to find.

## Verified toolchain facts

- `scaffold new <name> --src <list> --deps <list>` requires **scope-qualified** dependency names.
  `--deps contract` is refused; `--deps @orkestrel/contract` is accepted.
  `DEPENDENCY_NAME_PATTERN` at `src/core/constants.ts:251` is the authority.
- `scaffold new` writes 120 files for a `core,browser,server` workspace and pins every declared
  range from the live registry.
- `package.json` is birth-owned. No scaffold verb adds a script a later proof needs, so any new
  cross-cutting proof needs its script added by hand and chained into `test`.
- `guides/README.md` is written by `new` and never by `repair`. Deleting it makes guide parity fail
  with nothing able to restore it.
