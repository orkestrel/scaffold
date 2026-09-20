# U1-conform audit round 2 — verdict, 2026-09-20

Subject: the U1-conform tree on Veneer `d8b0e65` after briefs 2 and 3 (`units/u1-conform-report-2.md`,
`units/u1-conform-report-3.md`), rendered as `units/u1-conform-diff-2.patch.txt` and
`units/u1-conform-status-2.txt`. Claims: `u1-conform-audit-claims-2.md`. Lanes, blind to each other:

| Lane | Role | Engine | Record |
| --- | --- | --- | --- |
| objective | `analyst` | Astra, `codex exec` read-only, thread `01a0c057-f91f-7d60-bef8-527a400ebf23`, exit 0 | `units/u1-conform-audit-2-analyst.sh`, `units/u1-conform-audit-2-analyst-report.md` |
| subjective | `reviewer` | native Opus 5 (the writer's engine, told so), workflow `wf_efa15722-520` | `units/u1-conform-audit-2-reviewer-brief.md`, `units/u1-conform-audit-2-reviewer-report.md` |
| mechanical | `checker` | native Sonnet, same workflow | `units/u1-conform-audit-2-checker-brief.md`, `units/u1-conform-audit-2-checker-report.md` |
| gates | `verifier` | native Sonnet, same workflow | `units/u1-conform-gate-brief-2.md`, `units/u1-conform-gate-report-2.md` |

## Reconciliation

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED (Sass compiled in memory; the built bundle parsed) | CONFIRMED | PASS | confirmed |
| 2 | UNDECIDABLE on the foreground readings and the passes | CONFIRMED (the four paint values are pinned by `tests/src/styles/theme.test.ts`) | PASS (load order) | confirmed; the passes by claim 8 |
| 3 | UNDECIDABLE on the gate | CONFIRMED (the sentence true against scaffold's compilers and Veneer's manifest; parity holds) | PASS | confirmed; the gate by claim 8 |
| 4 | CONFIRMED (executed with the installed parser) | CONFIRMED | PASS | confirmed |
| 5 | UNDECIDABLE on the browser passes and the plant | CONFIRMED | PASS | confirmed; the passes by claim 8 |
| 6 | CONFIRMED | CONFIRMED | PASS | confirmed |
| 7 | CONFIRMED (a control status compared unequal) | CONFIRMED (eight blob pairs, listed) | PASS | confirmed |
| 8 | UNDECIDABLE | UNDECIDABLE | — | confirmed by the Orchestrator from `units/u1-conform-gate-report-2.md`: format, lint, check, build, the whole `npm test` chain, `test:distribution` (11 passed, 3 skipped), Edge `test:src` 17, `test:app` 3, `test:src:styles` 40, `test:setup:browser` 19, all exit 0; audit exit 0 with the `setup` question and the three advisory lines; status identical before and after |
| 9 (analyst) | CONFIRMED: `parseSync` keeps parentheses by default, so ``require((`bootstrap`))``, `require(("bootstrap"))`, ``import((`bootstrap`))``, and ``(require)(`bootstrap`)`` extract nothing and the predicate accepts them; `{ preserveParens: false }` extracts `bootstrap` from each while the controls stay empty | — | — | confirmed; carried (brief 4) |
| 10 (analyst) | CONFIRMED: `import type { ESTree } from 'vite'` follows the value imports against `typescript.md` | — | — | confirmed; carried (brief 4) |

## Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| parentheses bypass the scanner | analyst 9 | brief 4 item 2 and 3 |
| the type import follows the value imports | analyst 10 | brief 4 item 1 |
| `collectLayer` throws text naming the document where a caller named its sheets; the one assertion on that text is in `tests/setupBrowser.test.ts` | reviewer 9 (bound; report 3 deviation 4 rested on a false premise about `tests/src/styles/**`) | brief 4 item 4 |
| `behaviour` at `app/browser/Showcase.ts:45` against the package's `behavior` | reviewer 10 | brief 4 item 5 |
| bare backticked tokens without a kind word across the package's authored prose | reviewer 11 (bound, package-wide register) | recorded; settled package-wide by a later unit or recorded as the exception, never sentence by sentence |
| the showcase paragraph carries three facts in one sentence | reviewer 12 (preference) | none |
| a constructor that mounts, and the `void` it costs the entry | reviewer 13 (design, predates the round) | U7, which owns the next pass over `app/browser/types.ts` |
| `tests/setupListeners.ts` in the `setup*` namespace | reviewer 14 (bound) | accepted with the audit question, as round 1 ruled |
| `cooked` `null` for an invalid escape; a shadowed `require` identifier | reviewer referral R2 | the analyst's adverse inputs covered the escape (decoded) and the identifier (nothing); `null` returns `undefined` by the helper's guard |

Verdict: fix round — analyst findings 9 and 10; brief 4 on `builder`, carrying reviewer 9 and 10.
