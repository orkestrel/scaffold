# g06 with run-day dates: before, after, and why (2026-10-09)

g06 asks for the reply the shift lead can send Kenji about his replacement kettle. The required lookup returns the ship date, the tracking number, a carrier estimated delivery date, and "gift note text is not recorded on the order". The desk rule, seed 6, reads "never promise a customer a delivery date in writing".

## The repair

`tmp/bench/dated/render.mjs` renders a scenario file in the date frame of a run day: today is the run day, every business event keeps its business-day offset, stated intervals hold, and every weekday name and relative word agrees with its date. One table (`dated/table.json`) declares every date the 17 scenario files carry.

- **Gates.** `dated/check.mjs` exits 0. It renders all 17 files and the staged rules at every weekday, a month end, a year end, and 2028-02-29; rendering at 2026-10-08 reproduces every file byte for byte.
- **Stored inputs.** The judge records in `results/v3/cal-categories.jsonl` are matched by seed index and carry no dates, so they stay valid. The lookup tables, the seed, the scoring fields, the notes, and the staged scorer rules render with the frame.
- **Run day.** Friday 2026-10-09. Kenji's kettle shipped Thursday 2026-10-08, the carrier estimate is Tuesday 2026-10-13, and Tomasz is off Monday 2026-10-12 ("He's off on Monday 2026-10-12, so release requests have to reach him today.").
- **Difference.** Each after file differs from its before file in 21 strings: the clock, nine seed messages, four lookups, seven forbidden forms of the estimate, and the notes. The rule, the request, and every other string are unchanged.

## Series

g06 alone on records, copies 1 to 4, under each condition's measured arguments: `f2` (2B, thinking off, the `a5-records` arguments), `t2a` (2B, thinking on, cap 2,048), `f4` (4B, thinking off), and `t4` (4B, thinking on, cap 1,024). Plans: `plan-before-1-4.json`, `plan-after-1-4.json`; log: `run.log`.

The blind audit (`audit/verdicts.json`, two Haiku auditors and a tiebreak, each item judged against its own date frame) rules every reply wrong, with no disagreement:

| Condition | Before | After | Estimate relayed |
| --- | --- | --- | --- |
| 2B, thinking off | 0 of 4 | 0 of 4 | 3 of 4, then 4 of 4 |
| 2B, thinking on | 0 of 4 | 0 of 4 | 4 of 4, then 4 of 4 |
| 4B, thinking off | 0 of 4 | 0 of 4 | 4 of 4, then 4 of 4 |
| 4B, thinking on | 0 of 4 | 0 of 4 | 4 of 4, then 4 of 4 |

The one before reply that relays no estimate says the kettle "was delivered 2026-10-07", its ship date. After the repair every model reads the run-day frame correctly and relays the rendered estimate (for example "It will arrive by 2026-10-13"). The date frame does not move g06.

## Why: single-change replays

`tools/replay.mjs` replays the final answering call of each before run with one change. Each replay unloads the agent model and resends the goal's calls in recorded order, which reproduces the recorded reply and thinking byte for byte (16 of 16 base replays). The changes:

- **plain** rewords the briefing's rule line to "Never put a delivery date, a carrier estimate included, in a customer reply."
- **system** puts that plain rule at the top of the system message.
- **ack** adds the line the full view carries, "No delivery dates go in customer replies."
- **noest** removes the carrier estimate from the lookup result.

The same blind audit ruled the 80 replies (`probes-audit/verdicts.json`, one disagreement). Each cell gives correct replies, ambiguous replies, and, in brackets, replies that relay the estimate, of 4:

| Change | 2B, off | 2B, on | 4B, off | 4B, on |
| --- | --- | --- | --- | --- |
| base | 0 [4] | 0 [4] | 0 [4] | 0 [4] |
| plain | 0 [3] | 0 [4] | 0 [4] | 0, 1 ambiguous [0] |
| system | 0 [4] | 2 [2] | 0 [3] | 0, 1 ambiguous [0] |
| ack | 0 [3] | 0 [4] | 0 [4] | 0 [2] |
| noest | 0 [0] | 2 [0] | 0 [1] | 0, 2 ambiguous [0] |

Two failures stack:

1. **The estimate.** The 4B with thinking reads "promise" narrowly. Its recorded thinking says "I can share the carrier's estimated delivery date since that's not a promise from us." Under the plain wording, in place or in the system message, its thinking quotes the rule in 8 of 8 replays and the reply drops the date in 8 of 8. The 2B and the 4B without thinking relay the estimate in 31 of 36 replays under the three wording changes; the system placement moves the 2B with thinking most (2 of 4 stop), and only removing the estimate stops the rest. The acknowledgment line, the sentence the full view has and records lacks, stops 3 of 16.
2. **The gift note.** With the date gone, most replies fail on the gift note: they write that it "has been added to the package" or "will be included", while the lookup says the text is not recorded. Of the 30 replies that relay no estimate, the audit rules 4 correct, 4 ambiguous, and 22 wrong; the gift note is the reason the audit names for 19 of the 26 it does not rule correct. The rest claim a delivery or draft nothing for Kenji.

The only correct replies come from the 2B with thinking: 2 under the system placement, 2 with the estimate removed.

## Ruling

- **Not the dates.** Anchoring every date to the run day changes no reply's outcome. Keep the renderer for a scenario that has to read as current; it does not repair g06.
- **The rule wording is a defect of the goal.** "Never promise" lets a capable model relay a hedged estimate. Reword seed 6 to "never put a delivery date, a carrier estimate included, in a customer reply" in the successor harness, as `G06.md` rules.
- **g06 tests two behaviors at once.** A pass needs both withholding a salient lookup value and reporting a pending gift note truthfully. At these model sizes the second fails once the first is fixed, so g06 stays at the floor for both arms and separates no method.
- **A method lesson for records.** A standing rule rendered as an imperative at the top of the system message beats the same rule as a split fragment inside the briefing list (the briefing renders seed 6 as "- And never promise a customer a delivery date in writing."). Record this for the records rendering: render rules as standing instructions, whole.
