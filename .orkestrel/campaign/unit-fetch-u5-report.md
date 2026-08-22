# Unit fetch-U5 report: the guide narrative and the release note, landed

Role `implementer` route `sol`, engine GPT-5.6 Sol under `routing-amendment-cost.md`.
Brief: `unit-fetch-u5-brief.md`. Returned 2026-08-22; every criterion green; no
deviation.

## Landed

`guides/scaffold.md` gains the Baselines section, the implemented verb matrix, the
endpoint behaviour, `--offline`, and `provenance`; and documents `host.json`, the
digest chain, the request behaviour, release-fixed membership, the integrity limits,
raw-host lag, the guide fallback, and the `#fill` temporary-root limit U3 recorded. The
command-reference fence is regenerated from `renderUsage()`, and
`tests/guides.test.ts` gains an executed assertion holding the fence equal to that
function's output — a parity gate rather than a substring check.

`ROADMAP.md` carries the release note in the plan-of-record section, which is where
this repository keeps one; the campaign folder is explicitly not the plan of record.

The vocabulary pass moved the guide-host wording to repository-host in
`guides/scaffold.md`, `src/bin/types.ts`, `src/server/constants.ts`, and
`src/server/validators.ts` together. Every site is TSDoc or prose, not runtime output,
so no output expectation moved.

`host.json` regenerated: the guide digest and the membership digest, `108` staged
entries.

## Acceptance evidence

- Status clean at start; only the owned files changed at the end.
- Scoped `oxfmt --check` and `oxlint --deny-warnings` exit 0.
- The writing sweep covered `137` added lines with the substitution table applied
  case-insensitively including inflections, plus a count-candidate pattern over
  number words and digits. No banned sense and no growable-set count survived; the
  hits were code identifiers, exit and status and hash and index values, fixed
  operation cardinalities, and the non-temporal `more than once`. The firing control
  `This should simply pass with three rows.` matched `should`, `simply`, and `three`,
  so the sweep can fail.
- Root `tsc --noEmit` exit 0.
- The guide reference proof ran red before the guide edit (`1 failed | 10 passed`) and
  green after (`test:guides` `11 passed`); the inventory staleness proof ran red before
  regeneration (`1 failed | 42 passed`) and green after (`test:config` `43 passed`).
- `git diff --check` exit 0.
