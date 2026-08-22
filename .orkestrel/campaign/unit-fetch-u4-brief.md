# Unit fetch-U4: the verbs

## Role and engine

Role `implementer`, engine **Claude Opus 5**, in the main checkout at
`C:/Users/mikes/WebstormProjects/scaffold`. Native because the per-verb semantics,
exit codes, and warning prose are judgment- and voice-bearing and the acceptance
evidence runs loopback fixtures. You perform the assignment directly and spawn nothing
beyond the suites you run. Read before editing: `AGENTS.md`,
`.claude/rules/typescript.md`, `names.md`, `patterns.md`, `application.md`,
`tests.md`, and the CLI sections of `guides/scaffold.md`. Ruling record:
`.orkestrel/campaign/design-fetch-reconciliation.md`; its per-verb table and exit
rules are restated here and a conflict stops the unit.

## Objective

Wire the online-first strategy into the verbs: each operation resolves one baseline
per surface (live first, the distributed floor on transport-class failure), reports it
in a `provenance` record, honours `--offline` as the deliberate floor, and exits by
the rule that a floor the network forced is drift while a floor the operator asked for
is not.

## Context and standing facts

- The tree is uncommitted campaign work, all green: U1 (digest chain, committed
  `host.json`), U2 (`Copy`, `vendor`, `repository` group), U3 (`Host`,
  `copiesToHost`, `MaterializerOptions.host: string | Host`), the read-sites fix.
  **The root `tsc --noEmit` exits 0 and is your unscoped criterion.** Treat every
  `git status --porcelain` entry at your start as standing.
- `@orkestrel/test` 0.0.10 is installed from a local tarball.
- Host facts: Windows 11; the `npm` PowerShell shim is blocked — `npm.cmd` and
  `npx.cmd` from the repository root. If a vendored file you own changes, run
  `npm.cmd run build:inventory` and include the regenerated `host.json`.
- The loopback fixture (`tests/setupServer.ts`) serves registry, guide, inventory,
  and raw blob routes with a request recorder (U2's work).

## The contract, fixed by the design (do not redesign)

- `Baseline = 'live' | 'floor'` and
  `Provenance { versions?, guides?, host? }` in `src/core/types.ts` (or the bin types
  file where result shapes actually live — locate and follow the repository's
  centralization rules). A surface the operation did not read is absent; a `--from`
  run omits `host`.
- Each verb's machine-readable result gains `readonly provenance: Provenance`.
- `--offline` on `new`, `audit`, `repair`, and `overwrite`: take the floor
  deliberately, no exit-code raise from baseline alone. `catalog --offline` is a
  usage error (the CLI's existing usage-error exit code — read it from the source and
  report it).
- `environmentToUpstream(environment): UpstreamOptions | undefined` in
  `src/bin/helpers.ts`: `ORKESTREL_SCAFFOLD_REGISTRY` to `registry.base`,
  `ORKESTREL_SCAFFOLD_REPOSITORY` to `repository.base`; `src/bin/main.ts` consumes it.
- The host baseline: the verb reads the installed floor (the resolved host root and
  its manifest), attempts `vendor` over the floor manifest's destinations with the
  bytes best placed to minimize fetches (the target's own bytes where the verb has a
  target, the floor's bytes for `new`), assembles `copiesToHost(copies, manifest)`,
  and takes `host: fill ?? floorRoot` into the materializer. The all-or-nothing rule
  is `copiesToHost`'s; the verb only reports which side ruled.
- The version baseline: a `found` lookup is `live`. A transport-class failure takes
  the exact floor — the declared range the target already carries, or the generated
  floor for `new` — with `provenance.versions: 'floor'`. **Authoritative absence
  never falls back**: a registry `404` stays `missing` and a readable packument with
  no admitted version stays `failed`, each keeping the existing `FETCH` refusal for
  `new`, `repair`, and `catalog`. A row with no concrete floor keeps the refusal too.
- The guide baseline (`catalog` and `overwrite` only): `#assertFetched` keeps its
  refusal over `entries`; over `mirrors` it softens — a failed row is skipped, the
  target's existing mirror is kept, the skip is named in the report, and
  `provenance.guides` reads `floor`.

## The per-verb table (the design's, binding)

| Verb | Live | Floor forced | `--offline` |
| --- | --- | --- | --- |
| `new` | Registry pins, host from the repository | Floor ranges written, host from the installed floor, warning names both surfaces, exit 0 | Same bytes, no warning, exit 0 |
| `audit` | Registry releases, host from the repository | Compares against the installed floor, `provenance.host: 'floor'`, exit 1 | Floor comparison, exit answers drift alone |
| `repair` | Registry pins, host from the repository | Repairs from the installed floor, floor ranges written, exit 1; the report names the baseline so a rollback of live-written bytes is explicit | Same bytes, exit answers drift alone |
| `catalog` | Organization list, packuments, guide mirrors | Membership has no floor: `FETCH`, nothing written, exit 1 | Usage error |
| `overwrite` | Everything `repair` and `catalog` read | The offline half stands; the network half's `note` names the step, exit 1 | The offline half plus the floor host; the catalog half refused as for `catalog` |

## A named unknown, with its stop condition

The version fallback needs to discriminate a transport-class `failed` from a
no-admitted-version `failed` on a `Release` row. Verify what U2's landed `Upstream`
actually reports for each cause. If the rows cannot be discriminated by their existing
fields and notes, STOP and report — that is a design finding for the Orchestrator,
never an in-unit contract change to `Release`.

## Scope

- Owned: `src/bin/CLI.ts`, `src/bin/types.ts`, `src/bin/helpers.ts`,
  `src/bin/constants.ts`, `src/bin/main.ts`, `src/core/types.ts` (only if
  `Provenance` belongs there by the centralization rules), `tests/src/bin/CLI.test.ts`,
  `tests/src/bin/helpers.test.ts`, `tests/src/bin/main.test.ts`,
  `tests/setupServer.ts` (granted hunks for fixture additions the dark-endpoint rows
  need), `guides/scaffold.md` (table rows only; narrative is U5's), `host.json`
  through regeneration only.
- Off-limits: `src/server/**` beyond reading, and every file not named.
- No commits, no installs, no mutating git commands, no tree-wide format or lint fix.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries plus owned
   files; report before and after.
2. Scoped `oxfmt --check` and `oxlint --deny-warnings` over the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0 — unscoped.
4. Failing-first, recorded with exact commands and counts: one dark-endpoint row per
   surface red before the fallback lands — the dark-repository `repair` writing from
   the installed floor with exit 1, the dark-registry `new` writing floor ranges with
   exit 0 and the warning, the dark-registry `catalog` refusing with nothing written.
5. Rows also pinned, per the table: `--offline` runs write bytes identical to the
   forced-floor runs with the exit answering drift alone; `catalog --offline` the
   usage error; the registry `404` keeping the `FETCH` refusal under a live network
   (authoritative absence); a partial-guide `catalog` writing the table, keeping the
   target's mirror, naming the skip, exit 1; `provenance` asserted on every verb's
   machine-readable output; the environment variables mapping through
   `environmentToUpstream`.
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot` for
   `src:bin`, `src:server`, and `config` each exit 0; totals reported.

## Output

The complete U4 diff, per-criterion exit codes and totals including every
failing-first pair, the usage-error exit code you read from source, the
`Release`-discrimination verification result, and any deviation (expected, found,
exact evidence, done or not done, at most one short hypothesis). No process diary.

## Deviation contract

Stop on: the named unknown's stop condition; the fixed contract conflicting with what
U1 through U3 landed; an off-limits file needing an edit; a criterion unreachable.
Warning and report prose within the writing rules, fixture mechanics, and the exact
shape of the floor-range substitution are yours: decide, record, carry on.
