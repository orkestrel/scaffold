# Records series verdict, 2026-10-09

The comparison asks which context design lets the 2B Qwen (`qwen3.5:2b-q4_K_M`, thinking off, temperature 0) answer the Larkspur support shift best: the full view (control), the event-sourced briefing with the refined profile, or that briefing with per-topic records. Each design ran the same 8 reworded copies of the 10 requests, one run per copy from a cold daemon with its wire recorded (agent checkout, `tmp/bench/results/v9/`).

## Runs

| Design | Runs | Harness |
| --- | --- | --- |
| Full view | `a1-control-v1`–`v8` | `tmp/bench/bench.mjs --mode none --ctx 6144` |
| Refined briefing | `a4-refined-v1`–`v8` | `tmp/bench3/bench.mjs` sha256 `3d75138e…`, `--profile refined`, `--ctx 3072` |
| Records | `a5-records-v1`–`v8` | `tmp/bench3/bench.mjs` sha256 `59609d38…` (`--records off` byte-identical to `3d75138e…` on every recorded wire), `--records on` |

## Scoring

The strict scorer (`tmp/bench/rescore.mjs` over `tmp/bench/scenario.json`, permissive edits reverted per `frozen-harness-audit-verdict.md`) scores every row. Every failed row of every series was judged blind by two Claude Haiku 5.5 auditors with a tiebreak (batches 1 to 3, `tmp/bench/results/v9/audit/verdicts*.json`), and GPT-6 Astra checked each batch blind (`score-audit-verdict.md`; batches 2 and 3, session `01a12025-2e72-7552-9c5b-ee74c2930137`, 129.1 s, `VERDICT: PASS`). A row passes when the scorer passes it or the audit rules its failure a misread; an ambiguous failure counts as a fail at the low end and a pass at the high end (`tmp/bench/results/v9/tools/adjudicated.ts --override 64952363=ambiguous`).

## Result

| Design | Passes per copy, low to high | Mean |
| --- | --- | --- |
| Full view | 5, 6, 5, 8, 5, 5, 7–8, 7 | 6.00–6.13 |
| Refined briefing | 7, 8, 6, 8, 7, 5, 6, 7–8 | 6.75–6.88 |
| Records | 9, 8, 8, 8, 9, 8, 7, 7–8 | 8.00–8.13 |

| Pair | Mean d | Lower bound (mean − 2·sd/√8) | Fix bar |
| --- | --- | --- | --- |
| Records against refined | 1.25 | 0.43 | clears |
| Records against the full view | 2.00 | 0.69 to 0.75 | clears |
| Refined against the full view | 0.75 | −0.23 to −0.07 | does not clear |

Adjudicated passes per request over the 8 copies, records / refined / full view: refund amount 8/8/8, card 8/8/8, Grace escalation 8/7/1, Halvorsen ticket 8/8/8, approval note 6/8/1, Kenji shipping 2/1/1, depot release 6/4/3, credit check 2/1/8, gift note 8/8/7, Sigrid callback 8/1/3.

## Ruling

Keep the per-topic records: they are the only layer that clears the fix bar, against the refined briefing and against the full view, in a 3,072-token window where the full view needs 6,144. The refined briefing alone ties the full view within the noise.

## Open, in order

1. The credit check: records pass it on 2 of 8 copies against the full view's 8 of 8. A cold probe traced the refined loss to the pinned account story burying the question (`FINDINGS-A1.md`), and the judge reads that story as not needed (`probes/relevance.jsonl`). Next arm: a relevance filter on record and pinned lines, one judge question per line per request.
2. Recall results carry handles (`r8`), and a reply cited one instead of writing the note (`a5-records-v2` g05). Recall output drops its handles in the successor unit.
3. The successor harness unit: the defects in `frozen-harness-audit-verdict.md` and `records-candidate-audit-verdict.md`, and the two design limits of account scope (a desk-wide correction stated in one account's message; the capitalization-based person prefix).
4. Kenji's delivery date stays a model limit: 0 of 27 probe replies and 0 of 9 rewrites drop it.
