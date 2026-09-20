# U3 audit round 2 — verdict, 2026-09-20

Subject: the U3 tree after briefs 4 and 5 (`units/u3-report-2.md`, `units/u3-report-3.md`).
Claims: `u3-audit-claims-2.md`. Lanes, blind to each other, on that one file:

| Lane | Role | Engine | Record |
| --- | --- | --- | --- |
| objective | `analyst` | Astra, `codex exec` read-only, thread `01a0bf1d-d265-7242-bce8-84b7ce7ebec2` | `units/u3-audit-2-analyst.sh`, `units/u3-audit-2-analyst-report.md` |
| subjective | `reviewer` | native Opus 5 (the writer's engine, told so), workflow `wf_8f3d5696-109` | `units/u3-audit-2-reviewer-brief.md`, `units/u3-audit-2-reviewer-report.md` |
| mechanical | `checker` | native Sonnet, same workflow | `units/u3-audit-2-checker-brief.md`, `units/u3-audit-2-checker-report.md` |
| gates | `verifier` | native Sonnet, same workflow | `units/u3-gate-brief.md`, `units/u3-gate-report-2.md` |

## Reconciliation

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | PASS | confirmed |
| 2 | CONFIRMED | REFUTED | — | refuted: the factor rows' `Source` cells give neither the expression nor the value; carried (brief 6 item 3) |
| 3 | REFUTED | CONFIRMED, finding 19 | — | refuted on one arm: `--vn-shadow-inset` carries no elevation multiplier; carried (item 6) |
| 4 | REFUTED | CONFIRMED, finding 16 | — | refuted: `guides/veneer.md:160` teaches `rgb(var(--…-rgb) / 0.5)`, which cannot paint over a comma triplet; `_theme.scss:5` tallies "Both modes"; carried (items 1, 10) |
| 5 | REFUTED | CONFIRMED | — | refuted: the retained tables' TSDoc explains the colour-pairing and radius exclusions but not the text-valued ones (`--vn-font-mono`, `--vn-surface-gradient`) report 2 claimed; carried (item 13) |
| 6 | CONFIRMED | CONFIRMED | — | confirmed |
| 7 | CONFIRMED | CONFIRMED | PASS | confirmed |
| 8 | REFUTED (explanations under `@remarks`) | CONFIRMED | PASS | confirmed: the description paragraph is one sentence and the rationale belongs under `@remarks` by the TSDoc rule; the claim's "first paragraph" wording was the Orchestrator's error; every substitution the analyst executed in memory reddens the named case |
| 9 | REFUTED (executed: `:is(h1, p)` → true, `:is(.title,h1)+p` → false) | CONFIRMED | — | refuted: the complex-selector split ignores parentheses and the compound reader takes only the first `:is()` alternative; carried (item 7) |
| 10 | CONFIRMED | CONFIRMED | PASS | confirmed |
| 11 | CONFIRMED | CONFIRMED (finding 18) | — | confirmed as wording; the coupling sentence is carried (item 5) |
| 12 | REFUTED (`_theme.scss:22-26` literal colours in data URIs) | CONFIRMED (limit recorded) | PASS | refuted: the guide's own architecture puts every value in `_tokens.scss`'s value maps and only the scopes in `_theme.scss`, and the styles rule names `_tokens.scss` as the one file for a literal colour; carried (item 8) |
| 13 | REFUTED (module-scope data in proofs; hidden registry; "both modes", "two projects") | CONFIRMED | scope: UNRESOLVED (no shell) | refuted: `tests.md` puts data tables in setup files at any size, and `AGENTS.md` bars hidden module declarations; carried (items 9, 10). The scope half is settled from the verifier's status readings: the tracked and untracked lists equal the report's |
| 14 | CONFIRMED | CONFIRMED | — | confirmed |
| 15 | UNDECIDABLE | UNDECIDABLE | — | confirmed by the Orchestrator from `units/u3-gate-report-2.md`: every step exit 0 on Chromium, `test:distribution` 10 passed, the three Edge projects green, `scaffold audit` no drift |

The checker's unresolved half was a dispatch defect: the brief assigned a `git status` reading to a
role with no shell. From the next round the verifier's status readings are the checker's evidence.

## Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| registry groups `text.secondary`, `text.tertiary`, `surface.raised` around one property while the guide's member-shape rule says a group exists only where the cascade declares more than one | analyst 16 | item 11 |
| rival fixtures created by installed `render`/`mount` are removed after the assertions, not in `finally` | analyst 17 | item 12 |
| `interpolate-size` paragraph filed under § Deferred names | reviewer 17 | item 2 |
| integration proof's TSDoc claims a coupling nothing enforces | reviewer 18 | item 5 |
| "Each table's `Source` cell" overstates the convention | reviewer 20 | item 4 |

Verdict: fix round — claims 2, 3, 4, 5, 9, 12, 13, with the five carried findings; brief 6 on `opus`.
