# cr landing check (`checker` on Sonnet) — verdict

Brief: `units/cr-landing-checker-brief.md`. Instrument: `units/cr-probe-cr-integration.py`. Diff: `units/cr-integration.diff`.

**Claim 1 — CONFIRMED.** `cr-integration.diff` (lines 1-74) contains only two hunks: one in `tests/setup.test.ts` (one case title; one comment) and one in `tests/setup.ts` (the doc-block paragraph edits). `cr-status.txt:1-3` and `cr-2-status.txt:1-3` both list exactly the three owned files.

**Claim 2 — CONFIRMED.** `/home/user/veneer-cr/tests/setup.test.ts:98` carries the claimed title exactly; lines 100-103 carry the claimed comment exactly.

**Claim 3 — CONFIRMED.** `/home/user/veneer-cr/tests/setup.ts:328` reads `sits in the {@link DRIVEN_KEYS} table.`; lines 366-367 carry "the rows of the {@link DRIVEN_KEYS} table, where a journey drives or reads the state its scenario names before it shoots the frame."; lines 1080-1085 carry "These rows sit apart from the {@link CASCADE_KEYS} table because" and "once for each state its family drives or reads."; no other word changed in those paragraphs.

**Claim 4 — FAIL.** `/home/user/veneer-cr/tests/setup.test.ts:98`, the edited case title, exceeds 100 columns (the `^.{101,}$` sweep returns line 98 beside the pre-existing lines 21, 22, 48, 143, 178). The other edited lines do not. The code-token-noun and no-banned-term sub-claims hold.

**Referrals:** none.

VERDICT: FAIL 4; outside the claims: none

## Orchestrator's ruling on claim 4

The title is one string literal, which the formatter does not wrap, and `npx oxfmt --check` passed over the file; the formatter is the house gate, and the 100-column bar is not (the standing ruling since the CONTROL rounds: a rewrap rides a round editing the paragraph). The claim's "no edited line exceeds 100 columns" was over-strict for a string literal, as the file's other long titles show; dropped on record. The edit stands and the unit lands.
