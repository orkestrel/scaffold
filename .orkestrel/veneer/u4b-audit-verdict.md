# U4b audit — verdict, 2026-09-20

Subject: the U4b tree on Veneer `ef1a563` (`units/u4b-report.md`, `sol` on Astra, instruments
under `units/u4b-instruments/`), rendered as `units/u4b-diff.patch.txt` and `units/u4b-status.txt`.
Claims: `u4b-audit-claims.md`. Astra wrote the unit, so the lanes were swapped; blind to each
other:

| Lane | Role | Engine | Record |
| --- | --- | --- | --- |
| objective (by swap) | `reviewer` | native Opus 5, workflow `wf_9df9c385-3e9` | `units/u4b-audit-reviewer-brief.md`, `units/u4b-audit-reviewer-report.md` |
| subjective (by swap) | `analyst` | Astra, `codex exec` read-only, thread `01a0c0b9-914a-7540-b2ef-e38e044e8c9e`, exit 0, told its engine wrote the work | `units/u4b-audit-analyst.sh`, `units/u4b-audit-analyst-report.md` |
| mechanical | `checker` | native Sonnet, same workflow | `units/u4b-audit-checker-brief.md`, `units/u4b-audit-checker-report.md` |
| gates | `verifier` | native Sonnet, same workflow | `units/u4b-gate-brief.md`, `units/u4b-gate-report.md` |

## Reconciliation

| Claim | Objective (Opus) | Subjective (Astra) | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | PASS | confirmed |
| 2 | CONFIRMED | CONFIRMED (`SHIPPED_KEYS []` read in memory) | — | confirmed |
| 3 | CONFIRMED | CONFIRMED | PASS | confirmed |
| 4 | CONFIRMED (every row's predicate holds against its step) | REFUTED: the keyboard predicate never binds the row's proof step to the action, so the Space row passes against the Enter step or the click-release step; the accessibility predicate accepts a reading with `aria-pressed` deleted | — | refuted: the cross-check is weaker than the claim; carried (brief 2 items 1 and 2) |
| 5 | REFUTED on provenance: the Space and Enter rows trace to no row of `obligations.md` § Button or the ledger's `U7 Button` rows; placement, columns, statuses, proofs, links all hold | CONFIRMED | PASS | refuted on the two rows; carried (brief 2 item 3: the rows come out, the recorded keyboard steps stay) |
| 6 | CONFIRMED on the law; the question answered: `@orkestrel/guide` exposes no way to obtain the parsed document, so the undeclared import is a defect either way | REFUTED: the undeclared import | FAIL on the declaration | the user ruled that an `@orkestrel/*` package may be declared (devDependency by default), so `@orkestrel/markdown` is declared by the Orchestrator's tracked install before brief 2 dispatches (`units/veneer-manifest-markdown.sh`) |
| 7 | CONFIRMED (inventory equality corroborated) | CONFIRMED | PASS | confirmed |
| 8 | UNDECIDABLE | UNDECIDABLE | — | confirmed by the Orchestrator from `units/u4b-gate-report.md`: format, lint, check, build; `test:conformance` 8 green on Chromium and on Edge; `test:setup` 88; `test:guides` 18; `test:policy` 109; the whole `npm test` chain exit 0; `test:distribution` 11 passed 3 skipped; audit exit 0 with the `setup` question and the three advisory lines; status identical before and after, so an ordinary run wrote no fixture |

## Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| the cross-check binds no row to its action; `aria-pressed` may be absent | Astra 4 | brief 2 items 1, 2 |
| two keyboard rows without a ledger source | Opus 5 | brief 2 item 3 |
| `@orkestrel/markdown` undeclared | Opus 9, Astra 6 | the Orchestrator's manifest step, approved by the user |
| the recorder reads the cascade from a cwd-relative path while the digest proof pins the manifest-rooted one | Opus 10 | brief 2 item 4 |
| `excluded` is inert | Opus 11 | brief 2 item 5 |
| `click.bs.button.data-api` can never fire on the element, so `events` is always empty and the event predicate has no positive control | Opus 12 | brief 2 item 6 |
| a partially shipped component escapes the presence check (a stated limit) | Opus 13 (bound) | U7's brief |
| the disabled refusal matches Playwright's log wording and is the harness's precondition, not the cascade | Opus 14 (bound) | recorded; U7's journeys prove `pointer-events: none` through the rendered surface |
| the PLANT-ROW control ran on a superseded line that returns early for a `—` proof | Opus 15 (bound) | recorded |
| a `PLAYWRIGHT_WS_ENDPOINT` host cannot pass `npm test` | Opus 16 (bound) | recorded; a comment for a later unit |
| README prose names two reference sections, not three | Opus 17 (bound, prose) | U7's guide item |
| `readOracleControl` requires the official `window.bootstrap.Button`, so U7 must separate observable-state comparison from identity | Astra 9 (bound) | U7's design round |
| obligation sentences act as machine identifiers | Astra 10 (bound) | closed by brief 2 item 1 (a data table binds rows) |

Verdict: fix round — claims 4, 5, 6 (resolved by the install), and Opus findings 10, 11, 12;
brief 2 on `sol`.
