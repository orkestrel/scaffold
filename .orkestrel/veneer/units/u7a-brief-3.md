# Unit U7a — successor brief 3: the retained close-filter property is the U3 exception

## What changed and why

This brief supersedes `u7a-brief-2.md`; that brief stands (with `u7a-brief.md`
it carries) except for the close-family deferral it inherited, and `u7a-report-2.md`
(the stop) is the baseline. The unit stopped because the brief assigned the whole
`--bs-btn-close-*` family to later units as deferrals, while `src/styles/_mixins.scss:138`
already declares `--bs-btn-close-filter` inside `theme-tokens` — a U3 retention the guide records
at `guides/veneer.md:390` ("retained until the owning component supplies its canonical token")
and the ledger assigns to U3 Tokens — and the presence scanner refuses a deferred name the
cascade carries. The brief's omission was the Orchestrator's error.

Ruling: `--bs-btn-close-filter` is not deferred and not bound by this unit. It stays declared
where U3 put it, unchanged; it satisfies the `variable` row as a declared official property; the
deferral table lists every other `--bs-btn-close-*` property and the `.btn-close` selectors with
their later owner; U7a's binding rows in § Tokens do not cover it (the U3 retention row already
records it). Nothing in `theme-tokens` changes; the `_mixins.scss` grant stays the `focus-ring`
mixin alone.

## Role, engine, law, context, host, controls, unknowns, scope, output, deviation contract

As in `u7a-brief-2.md`, verbatim. `HEAD` is `2bc922d`; the tracked tree is clean. Your
instruments from the previous run (`tmp/u7a/deferral.config.ts`, `tmp/u7a/deferral.test.ts`)
remain and may be reused.

## Execution

As in brief 2, with item 5 read under the ruling: the deferral table names every `btn` official
selector and property the partials do not ship, except `--bs-btn-close-filter`, which is present
and retained by U3 and appears in no deferral row. The presence scan passes with the rows
`shipped`, `listed` at `['btn']`, and that property declared.

## Acceptance criteria and review evidence

As in brief 2. Write the report to `u7a-report-3.md`.
