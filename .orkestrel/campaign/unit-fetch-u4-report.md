# Unit fetch-U4 report: the verbs, landed

Briefs: `unit-fetch-u4-brief.md` plus `unit-fetch-u4-brief-amendment1.md`. First
dispatch (Claude Opus 5) stopped under its deviation contract with executed evidence
that the host baseline could never go live; that stop's rulings became
`unit-fetch-u4a-brief.md`. Second dispatch (GPT-5.6 Sol, routed under
`routing-amendment-cost.md`) landed the unit on the unblocked contract. Returned
2026-08-22.

## Landed

`src/bin/CLI.ts` carries live-first host resolution, the exact version-floor fallback,
deliberate offline floors, guide soft-failure handling, and `overwrite`'s partial
completion; `src/bin/types.ts` declares `Baseline`, `Provenance`, the offline options,
and result provenance; `src/bin/helpers.ts`, `constants.ts`, and `main.ts` carry the
environment mapping and the command-line handling. The suite covers the amended matrix
on loopback fixtures; the guide's owned table rows follow; `host.json` regenerated
after the vendored guide moved.

The version rule uses the landed `Lookup` discriminant directly — `failed` selects the
exact floor, `missing` and `unmatched` stay authoritative refusals — and never
inspects note text, which was the drift the split union existed to prevent. The
usage-error exit code read from source is `2`.

## Failing-first evidence

Focused command:
`npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:bin -t "CLI upstream baselines"`.
Red: exit 1, `2 failed | 1 passed | 178 skipped` — the live-host assertion, the
dark-repository `repair`, and the dark-registry `new` each exposing the missing
implementation. Green: exit 0, `6 passed | 182 skipped`.

## The deviation, recorded

The dark-registry `catalog` row was expected to run red and was already green during
the failing-first run: the landed implementation already refused with `FETCH` and left
the target unchanged. The row stays pinned as regression coverage and is not claimed
as new work. No contract change was needed.

## Gate evidence

Scoped `oxfmt --check` and `oxlint --deny-warnings` exit 0; root
`tsc --noEmit --project tsconfig.json` exit 0; `src:bin` `188 passed`; `src:server`
`399 passed | 5 skipped`; `config` `43 passed` with the inventory reporting
`entries=108`; `git diff --check` exit 0.

## Pinned behaviour

Offline byte parity against the forced-floor runs, drift-only offline exits,
`catalog --offline` rejected as a usage error, the authoritative `404` refusal, the
partial-guide `catalog` preserving the target's mirror, `provenance` on every verb's
machine-readable result, the environment mapping, and the aligned live-host row.
