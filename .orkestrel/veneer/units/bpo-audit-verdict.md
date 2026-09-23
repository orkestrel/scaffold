# Audit verdict — B-PASSIVE-ORDER (`bpo`), round 1 (2026-09-23)

Subject: `bpo.diff` against `87ff1d0` in `/home/user/veneer-bpo`; claims `bpo-audit-claims.md`. Lanes: `analyst` on GPT-6 Astra (thread `01a0ce4b-7dfe-7cf1-87b3-028c79ffe74b`, journal `tmp/codex/bpo-audit-analyst.jsonl`, verdict `bpo-audit-analyst-verdict.md`) and `checker` on Sonnet (`bpo-audit-checker-verdict.md`), blind. The writer was `builder` on Sonnet; the objective lane ran on an engine that did not write it. No `reviewer` lane: the unit is a builder unit whose criteria are mechanical (the plan's R11 rule: checker, plus analyst where semantics span files).

| Claim | Analyst | Checker | Reconciled |
| --- | --- | --- | --- |
| 1 Delta and scope | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The order | CONFIRMED | CONFIRMED | CONFIRMED |
| 3 The case and its control | CONFIRMED | — | CONFIRMED |
| 4 No resolved reading moved | BROKEN: `.ratio > *` and `.card` tie at `(0,1,0)` with opposing `position` values; the reorder puts `_ratio.scss` after `_card.scss`, so a card inside a ratio box now reads `absolute` (Bootstrap's own resolution, since the release loads helpers last); no proof mounts that composition; the report records no baseline case count | — | BROKEN. The resolution matches the release order, which is the unit's objective, so the barrel stands; the fix round adds the composition proof (a card inside a ratio box reads `position: absolute`, with the pre-reorder barrel as the negative control reading `relative`) and records the baseline count |
| 5 The guide move list | BROKEN: omits `### Button toolbar classes`, names sections and tables the guide does not carry | BROKEN: names `button-group`, `close`, `spinner`, `ratio`, `vr` tables that do not exist; `close` conflated with `btn-close` | BROKEN. The fix round's report corrects the move list against the headings at `87ff1d0` (the checker's heading list and the analyst's placements) |
| 6 Law and report | BROKEN: the added comment leaves the `spinners` and `spinner` tokens without nouns | CONFIRMED (the checker read the comment as term-clean; the noun rule is the analyst's finding) | BROKEN. The fix round names each token's noun |

Findings outside the claims: none from either lane.

VERDICT: FAIL 4, 5, 6; outside the claims: none
