# U4b audit round 2 — verdict, 2026-09-20

Subject: the U4b tree on Veneer `ef1a563` after briefs 2 and 3 (`units/u4b-report-2.md`,
`units/u4b-report-3.md`, `sol` on Astra, instruments beside them), plus the Orchestrator's
`@orkestrel/markdown` declaration, rendered as `units/u4b-diff-2.patch.txt` and
`units/u4b-status-2.txt`. Claims: `u4b-audit-claims-2.md`. Lanes swapped, blind to each other:

| Lane | Role | Engine | Record |
| --- | --- | --- | --- |
| objective (by swap) | `reviewer` | native Opus 5, workflow `wf_25acd99b-3df` | `units/u4b-audit-2-reviewer-brief.md`, `units/u4b-audit-2-reviewer-report.md` |
| subjective (by swap) | `analyst` | Astra, `codex exec` read-only, thread `01a0c0d7-ef69-7bd0-81d1-3f1ccb9642a4`, exit 0 | `units/u4b-audit-2-analyst.sh`, `units/u4b-audit-2-analyst-report.md` |
| mechanical | `checker` | native Sonnet, same workflow | `units/u4b-audit-2-checker-brief.md`, `units/u4b-audit-2-checker-report.md` |
| gates | `verifier` | native Sonnet, same workflow | `units/u4b-gate-brief-2.md`, `units/u4b-gate-report-2.md` |

## Reconciliation

| Claim | Objective (Opus) | Subjective (Astra) | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 to 5 | CONFIRMED, each executed in memory over the live fixture and rows, the reds bound to their instruments | CONFIRMED, with adverse attributes (`''`, `'mixed'`, `'TRUE'`) refused | PASS | confirmed |
| 6 | UNDECIDABLE beyond the retained logs (the refresh invocation is inferred; the fixture blob changed; the write is guarded) | CONFIRMED from the retained logs | — | confirmed by the Orchestrator from the retained runs (`units/u4b-instruments-3/`) and the verifier's ordinary comparisons on both engines |
| 7 | CONFIRMED (blob hashes; the manifest's one line; the lockfile's existing resolution) | CONFIRMED | PASS | confirmed |
| 8 | UNDECIDABLE | UNDECIDABLE | — | confirmed by the Orchestrator from `units/u4b-gate-report-2.md`: format, lint, check, build; `test:conformance` 8 green on Chromium and on Edge; `test:setup` 96; `test:guides` 18; `test:policy` 109; the whole `npm test` chain; `test:distribution` 11 passed 3 skipped; audit exit 0 with the `setup` question and the three advisory lines; status identical before and after |

## Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| the `event` binding entry with `obligation: undefined` is a wildcard selected in array order, so a later specific `event` entry is shadowed | Opus 9 (bound) | U7d (owns the table): exact-obligation entries selected before the wildcard, stated at the table |
| the event predicate derives its expectation from the obligation sentence by regex | Opus 10 (bound) | U7d: an explicit event-name member on `OracleBinding` |
| `readBootstrapCascade` in `tests/setupStyles.ts` resolves cwd-relative while the recorder and the digest proof resolve from the manifest | Opus 11 (bound) | U7d (granted that one read) |
| `scanOracleFixture` throws a raw `TypeError` on a non-serializable fixture instead of returning its documented finding | Opus 12 (bound) | U7d |

## Ruling

U4b's exit conditions hold: the accepted-list control red then green, the missing-fixture and
differing-fixture controls red then green, the cross-check red on a planted contradicting row,
official JavaScript executing nowhere outside the recorder's page, guide parity green; the
cross-check binds each row to its recorded action, the comparison runs over the fixture's JSON
form with exclusions honoured, and the recorder records the native `click`. Accept, and land by
pathspec from `units/u4b-status-2.txt`.

Verdict: accept.
