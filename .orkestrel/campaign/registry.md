# Campaign registry — fleet test-helper consolidation

Date opened: 2026-08-21.
Goal: extract every general-purpose test helper repeated across the Orkestrel fleet and the
mikesaintsg repositories into `@orkestrel/test`, consolidate near-duplicates into one general form,
adopt the result in every consumer, and prove it through a tarball install before publication.

## Authority

Read from `orkestrel/scaffold` only: `AGENTS.md`, `.agents/orchestration.md`, `.claude/rules/*.md`,
`.agents/skills/*`. The governing skill is `orkestrel-align-packages`; each package implementation
unit runs `orkestrel-harden-package`. The audit rounds run `orkestrel-falsify`.

## Branch

`claude/test-helpers-consolidation-35cprs` in every repository. Ten repositories already carry it;
the forty-six cloned this session sit on `main` and branch when first written.

## Bench liveness — probed 2026-08-21, round-tripped

| Bench       | Model                  | Result           | Evidence                                   |
| ----------- | ---------------------- | ---------------- | ------------------------------------------ |
| Cursor Grok | `cursor-grok-4.6-high` | live             | returned `BENCH_LIVE_GROK`                 |
| Codex Sol   | `gpt-5.6-sol`          | live             | returned `BENCH_LIVE_SOL`, thread `01a0254c` |

Both benches were dark at session start. Codex recovered through `codex login --device-auth` in the
same turn. No lane substitution is in force.

## Population

Fifty-six repositories on disk: forty-nine `@orkestrel/*` packages and the mikesaintsg repositories
`workbench`, `elements`, `scsr`, `mailbox`, `lloyds`, `taverna`, `terrain`, `tsea`.

Setup modules excluding the vendored `tests/setupPolicy.ts`: 43,200 lines carrying 1,930 exported
symbols. `tests/setupPolicy.ts` is vendored from `scaffold` `dist/host` and is excluded from
extraction by the vendored-file import law in `.claude/rules/tests.md`.

Volume by kind: `setup.ts` 55 files / 21,518 lines; `setupServer.ts` 27 / 11,485;
`setupBrowser.ts` 15 / 6,853; `setupStyles.ts` 3 / 958; the specialty modules 2,386.

## Destination

`@orkestrel/test`, local version 0.0.8, registry version 0.0.8. Entries `.` (core),
`./server`, `./browser`. Current surface: 3,308 source lines.

## Dependents

Forty-eight repositories already declare `@orkestrel/test` as a devDependency, on ranges from
`^0.0.3` to `^0.0.8`. Seven declare none: `elements`, `lloyds`, `mailbox`, `scsr`, `taverna`,
`tsea`, and `test` itself.

## Exclusions

- `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts` — vendored set, helpers stay inside it.
- Every other file vendored by `scaffold repair`.
- Package-specific helpers that encode a package's own domain types.

## Recorded findings outside this scope

`tests/setupPolicy.ts` carries four distinct hashes across the fleet: forty-one repositories on one,
seven on a second, and one each on two others. That is vendored drift owned by the `scaffold`
release cycle, not by this campaign.

## Live version state — swept from the registry 2026-08-21

Forty-eight packages read. Every declared version matches what the registry serves except
`@orkestrel/process`, whose working tree carries 0.0.5 against a published 0.0.4.

## Second helper population — recorded, outside this scope

Module-scope declarations sitting inside `.test.ts` files rather than in a setup module:
`elements` 264, `supervisor` 150, `taverna` 137, `mcp` 128, `mailbox` 60, `terrain` 55, `scsr` 55,
`probe` 41, `database` 26, `toolbox` 24, `workflow` 23, `scaffold` 18, `workbench` 16, `lloyds` 16.

`.claude/rules/tests.md` requires test files to import shared infrastructure rather than declare
local fixture factories, so each of those is a placement defect. The user scoped this campaign to
the setup modules, so this population is recorded here for the next campaign rather than opened now.

## Release model — settled from evidence, not from memory

`@orkestrel/test` is declared as a devDependency in all forty-eight dependents and as a runtime
`dependencies` entry in none. It declares no runtime dependencies of its own and peers only on
`vitest ^4.1.10`. Its `files` list ships `dist/src` and `README.md`.

A `@orkestrel/test` release therefore propagates as a re-pin, never as a topological cascade:
`.agents/orchestration.md` § What a bump obliges puts a development bump outside the publish order,
so each consumer re-pins the range, installs, proves its own gates green, and commits to `main`
without bumping or publishing itself. A consumer bumps only where its own published surface moved.

## Instrument correction

The first export index matched only `export [async] (function|const|interface|type|class)`. Two
Grok lanes reported symbols outside it — `mcp:readSSEStream` at `mcp/tests/setup.ts:1098` and
`mailbox:userEvent` at `mailbox/tests/setupStyles.ts:23`. Both are real: the first is
`export async function*`, which the pattern's required space after `function` excludes, and the
second is `export { userEvent }`, a re-export the pattern does not model at all.

Corrected population: 1,937 exported symbols, not 1,930. The blind spot was three generators, two
re-export statements, and two export-stars. The lane reports are the more complete instrument, and
the completeness control now joins on unique `(repo, name)` pairs rather than raw declaration
counts — the raw count double-counts overloads and names repeated across files, which read as a
lane shortfall when C2 was in fact complete.

## Lane verification

| Lane | Expected pairs | Reported | Missing | Verdict           |
| ---- | -------------- | -------- | ------- | ----------------- |
| A3   | 197            | 198      | 0       | complete          |
| B1   | 235            | 235      | 0       | complete          |
| C1   | 193            | 193      | 0       | complete          |
| C2   | 114            | 114      | 0       | complete          |
| D1   | 186            | 187      | 0       | complete          |

## Count correction — caught by the objective lane

The design brief stated 239 destination-matched sites carrying a behavioral difference against 57
pure duplicates. Both figures were computed from seven of the nine lanes and were not recomputed
after A1 and A2 landed. The objective lane read the folded table and reported the mismatch.

Corrected against `rows.tsv`, on unique `(repo, name)` pairs: 296 sites duplicate a symbol
`@orkestrel/test` already exports, of which **233 carry a noted behavioral difference** and **63 are
pure duplicates**. The design rulings cover every destination-matched family, so no family was
omitted by the wrong number, but the brief carried a false fact and the report to the user repeated
it.
