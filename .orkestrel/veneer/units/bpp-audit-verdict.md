# Audit verdict — B-PASSIVE-PROSE (`bpp`), round 1 (2026-09-23)

Subject: `bpp.diff` against `87ff1d0` in `/home/user/veneer-bpp`; claims `bpp-audit-claims.md`. Lanes: the objective lane on `reviewer` on Opus 5.5 (`bpp-audit-objective-verdict.md`), substituted for `analyst` on Astra because the Codex bench reported its usage limit on this lane (thread `01a0ce4f-7555-7033-83cc-7991995c4bba`, journal `tmp/codex/bpp-audit-analyst.jsonl`; recorded in ROADMAP § Standing conditions), and `checker` on Sonnet (`bpp-audit-checker-verdict.md`), blind. The writer was `builder` on Sonnet; the objective lane ran on an engine that did not write it.

| Claim | Objective (Opus) | Checker | Reconciled |
| --- | --- | --- | --- |
| 1 Delta and scope | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The nouns | BROKEN on the residue clause: the caveat bounds nothing; the residue is F1 | — | BROKEN: the fix round enumerates and rewrites every bare tag (F1, with a multiline-aware sweep) |
| 3 The named sites | BROKEN: `setupStyles.ts:3615` `engine` field bare; `undefined` sense unsettled | CONFIRMED (read the four named lines) | BROKEN: the fix round names the `engine` field; D42 settles `undefined` as its own noun |
| 4 The split | CONFIRMED (mutation distinguished; behaviour-neutral at these sites) | — | CONFIRMED |
| 5 The § Tests measurement | CONFIRMED (counts wrong: F6) | CONFIRMED | CONFIRMED |
| 6 Law and report | CONFIRMED | CONFIRMED | CONFIRMED |

Findings outside the claims (the objective lane): F1 residue tags (carried by the fix round); F2 the capital after a semicolon at `setupServer.ts:1593-1594` (fix round); F3 `function` beside `helper` for the same symbols (fix round: `helper` per D42); F4 the ledger rules a sample, not every tag, and carries drafting residue (fix round: a full ledger); F5 the report misnames the fed cases (fix round's report); F6 counts in the report (fix round's report: no counts); F7 criterion 6 narrowed to the row's scope without a grant (ruled: the brief's criterion 6 over-reached the row; the successor brief bounds it to the row's named scope, and the element and infrastructure proofs' links are a B-PASSIVE-PROSE-2 observation the Orchestrator records in the roadmap as a carrier row for X-EXIT's documentation check).

VERDICT: FAIL 2, 3; outside the claims: F1 residue-tags, F2 semicolon-capital, F3 helper-function-alternation, F4 ledger-incomplete, F5 fed-cases-misnamed, F6 report-counts, F7 criterion-6-narrowing
