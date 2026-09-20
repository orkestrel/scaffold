# U3 audit round 9 — verdict, 2026-09-20

Subject: the U3 tree after brief 12 (`units/u3-report-10.md`), with the rendered diff
`units/u3-diff-9.patch.txt` and status `units/u3-status-9.txt`. Claims: `u3-audit-claims-9.md`.
Lanes, blind to each other:

| Lane | Role | Engine | Record |
| --- | --- | --- | --- |
| objective | `analyst` | Astra, `codex exec` read-only, thread `01a0c009-13ba-7a00-87c8-c15379389291`, exit 0 | `units/u3-audit-9-analyst.sh`, `units/u3-audit-9-analyst-report.md` |
| subjective | `reviewer` | native Opus 5 (the writer's engine, told so), workflow `wf_f019d333-b20` | `units/u3-audit-9-reviewer-brief.md`, `units/u3-audit-9-reviewer-report.md` |
| mechanical | `checker` | native Sonnet, same workflow | `units/u3-audit-9-checker-brief.md`, `units/u3-audit-9-checker-report.md` |
| gates | `verifier` | native Sonnet, same workflow | `units/u3-gate-brief.md`, `units/u3-gate-report-9.md` |

## Reconciliation

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | REFUTED on "each is a case" only: every named input returns its required result; `:is(.title > h1)+p` and `:is(h1:has(p)) + p` are cased nowhere | REFUTED on the same clause, the same two vectors; the behaviour and the elements-layer clause confirmed | — | behaviour confirmed; the case clause refuted for the two vectors; carried (brief 13) |
| 2 | REFUTED on "each is a case" only: every retained reading replays; `h1\2b p` false, `h1\2b  p` true, `:not(h1) + p + span` true, `details summary\<FF>` true are recorded at report 10 line 150 as covered and have no assertion | CONFIRMED (the readings the claim lists are cased) | PASS (export list) | behaviour confirmed; the case clause refuted for the four retained readings the analyst names, against brief 12 acceptance criterion 2; carried (brief 13) |
| 3 | CONFIRMED (AST caller list equals the TSDoc list plus `readIdentifier`) | CONFIRMED | PASS (the two name lists identical) | confirmed |
| 4 | CONFIRMED (sweep hits in permitted senses) | CONFIRMED | PASS | confirmed |
| 5 | CONFIRMED; digest measured `8dc6e2f5…` | CONFIRMED by blob hashes (`index.test.ts` `36e5ceb..f5be7b6` in both patches), digest referred | PASS except one FAIL | confirmed; the checker's FAIL reads my checker brief's misstatement ("appears nowhere in the rendered diff"): the diff is over `b661142`, which predates U3, and the file is U3's; the claim says unchanged by brief 12, which both lanes confirm |
| 6 | CONFIRMED (byte-equal to round 8) | CONFIRMED | PASS, no unowned path | confirmed |
| 7 | UNDECIDABLE (the round-9 verifier report was not yet retained when the lane read) | UNDECIDABLE (no shell) | — | confirmed by the Orchestrator from `units/u3-gate-report-9.md`: every gate exit 0 on Chromium (`npm test` 18 passed, `test:distribution` 10 passed 3 skipped), the three Edge projects green (styles 40, src 17, setup:browser 18), `0 of 48 planned paths drifted`; the audit's exit 1 is the pending `^0.0.76` re-pin and the three dependency lines are advisory |

The analyst's adversarial table (namespace, `:has()`, `of`, comment, functional-list spellings
through `\48`, attribute strings carrying every refused form, escaped identifiers, CSS whitespace,
NBSP, quoted commas and parentheses, mandated and unmandated pairs) returned the required result on
every input, and its planted wrong assertion failed, so the instrument binds. The raw-CRLF escape
boundary it re-reads is the one round 6 excluded and stays excluded.

## Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| `:is(.title > h1)+p` and `:is(h1:has(p)) + p` refuse correctly and are not cases | analyst 1, reviewer 1 and extra 1 | brief 13 |
| `h1\2b p`, `h1\2b  p`, `:not(h1) + p + span`, `details summary\<FF>` read correctly and are not cases | analyst 2 | brief 13 |
| `tags` is a plural holding one or none; `scanUnreadForm` returns a bare string for a closed set | reviewer extras 2, 3 (bounds) | recorded here; a type change is a later brief's call, outside U3's fixed scope |
| inventory order after `PHYSICAL_LONGHANDS` | reviewer extra 4 (neither) | none: no behaviour, no rule |
| the checker brief's claim-5 wording | Orchestrator | corrected in the round-10 checker brief |

## Ruling

The guard's behaviour is confirmed by every lane on every input, including twenty-two attacks no
claim listed. What remains is coverage: six readings the report records as verified have no
assertion, against brief 12 acceptance criterion 2. That is a fully specified, taste-free edit to
one file with no behaviour change, so it routes to `builder` on native Sonnet as brief 13, with a
planted-red proof that the added assertions bind. Round 10 audits it with the analyst on Astra and
the reviewer on Opus, neither the writer's engine.

Verdict: fix round — claims 1 and 2 (the case clause only); brief 13 on `builder`.
