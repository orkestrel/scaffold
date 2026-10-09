# Final check: records, full view, and compaction under 2B thinking and the 4B model

This check asks whether the per-topic records keep or widen their lead when the agent thinks before it answers or is the 4B model. It runs three arms under two conditions over the reworded copies of the Larkspur shift, one cold run at a time through `tools/series.ts` and `tools/run-one.ts` (in `results/v7/tools/`), with every wire recorded.

## Arms

| Arm | Harness | Think-off window and budget |
| --- | --- | --- |
| Records | `tmp/bench3/bench.mjs --mode ledger --profile refined --records on` | `--ctx 3072`, prompt budget 0.7 of the window |
| Full view (control) | `tmp/bench/bench.mjs --mode none` | `--ctx 6144` |
| Compaction | `tmp/bench/bench.mjs --mode compaction --summary tuned --window 1600 --keep 6 --sections 3` | `--ctx 3072` |

`results/v7/tools/plan.ts` writes every run's arguments; `plan-stage1.json` holds the stage 1 plan.

## Conditions

- `f4`: the 4B agent `qwen3.5:4b-q4_K_M` with thinking off, at the think-off windows. Compaction's summarizer is the same 4B model (`--summary-model`).
- `t2`: the 2B agent `qwen3.5:2b-q4_K_M` with thinking on. Every arm's window grows by the harness's thinking cap of 1,024 tokens (`THINK_PREDICT`): records 4,096 with budget share 0.525, so its prompt budget stays 2,150 tokens; full view 7,168; compaction 4,096. Compaction's summarizer is the 2B model with thinking off.

## Tuning evidence

`probes/think-probe.ts` replayed 10 recorded agent calls (5 from `v9/a5-records-v1`, 5 from `v9/a1-control-v1`) on the 2B with thinking on, `num_predict` 4,096 and `num_ctx` 8,192, on 2026-10-09 (`v9/probes/think-2b-on.jsonl`). Every call stopped on its own; thinking plus reply took 69 to 666 tokens, so the 1,024 cap cuts none of them. Generation ran at 12.9 to 14.6 tokens per second.

The 10-call probe understated the tail. In `t2-records-v1`, the first think-on run, 2 of its 22 agent calls spent the whole 1,024-token cap thinking and returned no content, which left g01 and g10 with no reply (`t2-records-v1.log:16`), and another call stopped at 1,010 tokens. The decision to widen the cap was taken mid-run on the first 9 requests (1 cut of 19 calls, a 90th percentile of 1,010). A cap that binds on about one call in ten measures the cap, not thinking, so the series moves to `t2w`: `--think-predict 2048` (a flag added to both harnesses with the default 1,024 unchanged), with each window grown by 2,048 (records 5,120 at budget share 0.42, so its prompt budget stays 2,150 tokens; full view 8,192; compaction 5,120). The `t2` runs of copy 1 (records, full view, and compaction, all at the 1,024 cap) stay as the pilot that shows the cap's effect on all three arms.

The flag was installed between runs on 2026-10-09 at 13:08 UTC, after `f4-control-v2` and before `t2w-records-v1`, with no run active. The main harness changed sha256 `bc96df33…` to `ee053b85…`, and the records harness `59609d38…` to `8b67f3df…`; the earlier files are kept as `bench.mjs.pre-think-predict`. With the flag absent, request bodies are byte-identical, so every `f4` and `t2` run reads the same as under the earlier files.

Raising the cap did not change the two records cuts. In `t2w-records-v1`, g01 and g10 again had no reply: their tool-free answer pass (prompts of 1,287 and 1,268 tokens, after first passes that ended without final text) thought to the 2,048 cap with no content. The same two calls also ran to the 1,024 cap in `t2-records-v1`, with byte-identical prompts. Every other call in the run completed at 507 tokens or fewer (the 90th percentile). The pilot full view had no cut, with a 90th percentile of 433 tokens; the pilot compaction had one cut and two requests with no reply. So under thinking, the records' answer pass (the digest, the cue, and no tools) can send the 2B into thinking without end. That is a property of the method under this condition, not of the cap, and the series keeps the design fixed. An answer pass with thinking off is the refinement to measure next; `ideas.md` carries it.

The window growth gives every arm the same generation room and keeps each prompt budget. One effect is not symmetric: the records arm sizes a `recall` result from what the latest call left in the window, so under `t2` its recall room grows by the cap less the thinking spent. The full view and compaction read nothing from the leftover window.

## Plan

Stage 1 runs copies 1 to 4 of both conditions, interleaved by copy. After stage 1, each condition's pairs (records against the full view, records against compaction) take the band rule of `v9`: a pair clears when mean(d) − 2·sd(d)/√n > 0. A condition whose pairs both clear stops at 4 copies; any other condition runs copies 5 to 8. Scoring is the strict scorer at run time, then a blind double audit of every row, passes and failures alike, on the Haiku `checker` role, checked by the Astra `analyst` lane. The `v9` audit read failures alone; `f4-control-v1` g08 passes the scorer with "$3,860" available, where $5,000 less $1,240 is $3,760, so a pass can be false and every row is read.

The 152-message scenario stays out of this check: it has no ledger section, no reworded copies, and no audited scoring fields. Within each run the conversation grows across the 10 requests, so the per-request results read the lead against conversation length.

## Thinking read, 2026-10-09

On the user's instruction of 2026-10-09, compaction left the series and the 2B thinking-on condition came first (`plan-thinking.json`).

- **Answer pass.** The records' tool-free answer pass runs with thinking off.
  - `t2a-records` v1 to v4 ran under `--think --think-predict 2048 --answer-think off`, on records harness sha `4d07e56a…`.
  - Since sha `5342e209…`, the harness does this under `--think` with the flag removed.
  - The four runs replied on 40 of 40 goals and cut 0 of 78 agent calls.
- **Full view.** It ran as `t2w-control` v1 to v4. Every row was audited blind on both sides (`audit/verdicts-b1.json` to `-b3.json`).

| Copy | Records, answer pass thinking off | Full view |
| --- | --- | --- |
| 1 | 7 | 3–4 |
| 2 | 8 | 5–6 |
| 3 | 6 | 4–6 |
| 4 | 7 | 4–5 |
| Mean | 7.00 | 4.00–5.25 |

- **Band.** The pair d at the low end is 4, 3, 2, 3; at the high end it is 3, 2, 0, 2. The lower bound of mean(d) − 2·sd(d)/√n is 2.18 at the low end and 0.49 at the high end, so the pair clears at both.
- **Against the think-off 2B.** The 2B with thinking off (`v9`, 8 copies) read 6.50–6.75 for records and 4.38–5.13 for the full view (`records-series-verdict.md`, Correction). With the answer pass fixed, thinking raises the records by about half a pass per copy and leaves the full view where it was.
