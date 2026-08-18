# Campaign record: fleet propagation, 2026-08-18

The campaign propagated the vendored host — the policy oxlint plugin, the suppression and bridge
sweeps, the developer-writing rules, and the config budget — from `@orkestrel/scaffold` onto all 44
fleet targets, fixed every scaffold defect the propagation surfaced, and repaired every target-owned
canon violation the vendored rules exposed. The exit criterion: every target on the final host,
every gate green, everything committed and pushed. Met — wave 4 recorded 44 of 44 PASS and both
commit passes recorded 44 of 44 LANDED.

## Scaffold defects the propagation surfaced, all fixed here

| Defect | Fix commit | Records |
| --- | --- | --- |
| Vendored `tests/config.test.ts` imported `@orkestrel/test/server`, unresolvable in the target that publishes `@orkestrel/test` | 83f47be | `vendored-import-unit.md`, `vendored-import.report.md`, `vendored-import-audit.md`, `vendored-import-audit.verdict.md` |
| Five audit findings against that fix (name collision, guard coverage, matcher spelling, unproven containment, budget equal to child caps) | da01121 | `vendored-import-fix.md`, `vendored-import-fix.report.md` |
| Config project timed out under a contended suite (5-second default) | 83f47be, raised again in da01121 | wave-1 evidence in the transcript; `wave3.results.txt` shows zero timeouts after |
| `overwrite` refused the one target with a root setup proof | 6b62298 | `setup-project-brief.md`, both `setup-project-*.ruling.md`, `setup-project-reconciliation.md`, `setup-project-unit.md`, `setup-project-unit-2.md`, `setup-project-unit.report.md`, `setup-impl-audit.md`, `setup-impl-audit.verdict.md` |

## Target-owned repairs, cross-engine audited

| Target | Repair | Records |
| --- | --- | --- |
| browser | Four `protected` members widened per two-lane ruling; fake timers → real 20 ms timeouts | `browser-api-brief.md`, `browser-api-objective.ruling.md`, `browser-api-ruling.md`, `browser-api-unit.md`, `browser-api-unit.report.md`, `faketimer-browser.report.md` |
| console | Fake timers → real 10 ms interval; 17 scheduler assertions → sink observables; stale TSDoc fixed | `faketimer-unit.md`, `faketimer-console.report.md` |
| agent | Fake timers → real 25 ms deadlines; recorded-signal instrument | `faketimer-agent.report.md` |
| ollama | Scheduler assertions → refusing-transport instrument; setup project adopted | `faketimer-ollama.report.md` |
| all four | One audit round, 13 claims, 12 confirmed, 1 broken (a report's too-narrow delta claim, corrected in the browser commit message) | `unit-audit-round.md`, `unit-audit-round.verdict.md` |

## Instruments and results

`wave3.instrument.sh` / `wave3.results.txt` (43 of 44 PASS; the 44th was the setup refusal),
`wave4.instrument.sh` / `wave4.results.txt` (44 of 44 PASS), `commit-pass.instrument.sh` /
`commit-pass-1.results.txt` / `commit-pass-2.results.txt` (44 of 44 LANDED each),
`dep-audit.instrument.sh` / `dep-audit.results.txt` (0 drifted `@orkestrel` ranges fleet-wide).

## Routing ledger notes

Opus 5 went dark mid-campaign (five consecutive 529 errors, from 15:56 UTC). Per the substitution
table and the user's direction, GPT-5.6 Sol carried both design lanes of the setup-project pass as
separate blind dispatches, the implementation, and the four-repo audit; the setup implementation's
cross-engine review ran on the Claude cheap tier (Sonnet). Every bench unit's journal lived under
`tmp/codex/` and was swept at acceptance; thread ids are recorded in the task registry and the
reports here.

## Deliberately not closed here

- Publish rounds: deferred by the user until they are at the keyboard for the npm approvals. The
  registry serves no guide for `@orkestrel/test@0.0.6` (pre-existing 404, fleet-wide); the next
  `test` publish self-heals it.
- Ollama's `OllamaProvider` constructs its request `Timeout` internally; the missing injection seam
  is a recorded follow-up capability row (see `faketimer-ollama.report.md` and
  `unit-audit-round.verdict.md` claim T5).
