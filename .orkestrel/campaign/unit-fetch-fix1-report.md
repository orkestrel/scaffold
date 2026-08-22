# Unit fetch-fix1 report: the audit round's accepted findings, landed

Role `implementer` route `sol`, engine GPT-5.6 Sol under `routing-amendment-cost.md`.
Brief: `unit-fetch-fix1-brief.md`, carrying the accepted findings of
`audit-fetch-reconciliation.md`. Landed as commit `08bb37d`, 2026-08-22. Every
criterion green; one expected deviation (inventory regeneration after the vendored
guide changed).

This report was written by the Orchestrator from the unit's return after a re-check
found it missing — a retention gap in the Orchestrator's own record, not the unit's.

## Landed

The vendored path carries raw bytes as hexadecimal end to end: `HostFile` replaces
`Copy` and its found rows carry `hex`; `Upstream` hashes a vendored body before any
character decoding and text endpoints keep their decoding; `filesToHost` replaces
`copiesToHost`. `stageHost` derives each digest from the staged destination after the
copy. `Worktree` and `isWorktree` replace `Repository` and `isRepository`; the reader's
method replaces `vendor`; the event replaces `copy`. The guide carries the corrected
absence, baseline, retry, staging, raw-byte, verb, and guide-provenance rules, and
`tests/config.test.ts` states its quiescent-checkout assumption. `host.json`
regenerated at `entries=108`.

## Failing-first pairs

Each red then green, recorded with its exact command: the exact byte-order-mark digest
accepted; the stripped-digest body refused (the defect's own vector); the staged
destination digest under a source that changes mid-run; and one surface-parity row per
rename proving the old spelling is gone from the published API.

## Gate evidence

Scoped `oxfmt --check` and `oxlint --deny-warnings` exit 0; root `tsc --noEmit`
exit 0; `src:core` `326 passed`; `src:server` `402 passed | 5 skipped`; `src:bin`
`188 passed`; `config` `43 passed`; `guides` `14 passed`; `git diff --check` exit 0.

## Sweeps and the reading taken

The rename sweep (`\bCopy\b|\bcopiesToHost\b|\bRepository\b|\bisRepository\b|\.vendor\(`)
over `src`, `guides/scaffold.md`, `ROADMAP.md`, `tests/setupServer.ts`, `tests/src`,
and `tests/config.test.ts` returned no match, as did the event sweep. The old spellings
survive only as negative-control strings in `tests/guides.test.ts` and as immutable
evidence in campaign records.

The implementation sets `provenance.guides` to `floor` when any selected mirror reports
`failed`, including a mixed result; `live` only when every selected mirror resolved
live; and omits the field when no mirror was selected.
