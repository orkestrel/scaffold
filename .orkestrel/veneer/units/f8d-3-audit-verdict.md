# F8d IMPORTANCE-LONGHANDS round-3 audit — round verdict (reconciled by the Orchestrator, 2026-09-23)

Lanes that ran on `f8d-3-audit-claims.md`, blind to each other: `analyst` on GPT-6 Astra
(`f8d-3-audit-analyst-verdict.md`, session `01a0ccd7-0573-7b01-ad07-94462edce1a8`, journal swept
at acceptance; FAIL 5), `reviewer` on Opus 5.5 (`f8d-3-audit-reviewer-verdict.md`, FAIL 5 with a
referral), and `checker` on Sonnet (`f8d-3-audit-checker-verdict.md`, PASS). Every lane ran; none
empty. The writer was `builder` on Sonnet, so both Opus and Astra are auditors that did not write
the work.

## Rulings per claim

1. **CONFIRMED** (all three lanes): the delta is the brief's edits and nothing else; the status is
   the owned set; `tmp/probe/` is absent.
2. **CONFIRMED** (both lanes; the guard over `declared` reddens under plant A because
   `stage.read` keeps an explicit empty property list, and `declared` is pinned independently of
   the mutated line).
3. **CONFIRMED** (both lanes; the per-name mutant admits `col-1` and the partial-importance case's
   `not.toContain('col-1')` rejects it).
4. **CONFIRMED** (both lanes; the freeze assertions sit only at the end of the inventory case, the
   house placement).
5. **BROKEN** (analyst and reviewer, on one 101-column line: the header sentence in
   `tests/setupServer.ts` spans two lines, the round edited the second, and the first stayed at
   101 columns; the checker's CONFIRMED measured the changed lines only). Closed at integration by
   the Orchestrator: the reviewer's exact rewrap of the sentence applied in the worktree with no
   word changed (`f8d-rewrap.log.txt`: the before and after text, zero lines past 100 columns in
   the header, `oxfmt --check` exit 0), verified by `checker` on Sonnet
   (`f8d-rewrap-checker-brief.md` and its verdict). The reviewer's two round-2 sites (the
   `SHARED_LONGHANDS` remark and the `properties` member doc, each 101 columns) are outside the
   round's edits and outside any house gate (oxfmt does not reflow comments and base comments
   exceed the bar): dropped on the record, and the column bar leaves the claims files from this
   round on, per `bfo-fix-audit-verdict.md` claim 6.
6. **CONFIRMED** (the analyst's `npm run check` exited 0; the reviewer's and the checker's
   readings hold the law).

## Findings outside the claims and referrals

- The reviewer's referral on the settling runs: the landing chain's `test:service` settles the
  green; the writer's red readings under plants A and B stand as the mutation record (both lanes
  confirmed the assertions distinguish each plant by source).
- The reviewer's referral on the seam budget: ruled under claim 5.

Every finding has a carrier; nothing dropped without record. F8d is accepted for landing on the
session branch from `cdf7f55`.

VERDICT: PASS
