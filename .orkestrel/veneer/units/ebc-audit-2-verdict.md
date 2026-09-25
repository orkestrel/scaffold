# E-ID-BUTTON-CASCADE fix-round audit — verdict (2026-09-25)

The Orchestrator's reconciliation of the fix-round audit on `ebc-audit-2-claims.md`. Three lanes ran blind to each
other: the objective lane, `analyst` on GPT-6 Astra (`ebc-audit-2-objective-verdict.md`; journal
`tmp/codex/ebc-audit-2-analyst.jsonl`, thread `01a0d676-cfb1-7f93-ab09-0495743d483a`); the subjective lane, `reviewer`
on Opus 5.5 (`ebc-audit-2-subjective-verdict.md`); and `checker` on Sonnet on claims 5, 6, and 7
(`ebc-audit-2-checker-verdict.md`). Round 3 was written by `opus` on Opus 5.5 and round 4 by `builder` on Sonnet; the
objective lane ran on an engine that wrote neither.

## Claims

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Kills | CONFIRMED | CONFIRMED | — | CONFIRMED for the table as named; the `important` and `spacing` kills of the `.btn` case were read on its round-2 form (subjective referral R1), so round 5 re-runs every mutation on the shipped tree |
| 2 Reduced motion | BROKEN | CONFIRMED | — | BROKEN on coverage: the probe reads a sample of the longhands the reverted shorthands cover (it omits `padding-right`, `padding-bottom`, the border longhands, `transition-delay`, and `transition-timing-function`); an instrument gap, not a rendered defect |
| 3 `.btn` in every state | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 4 Tailwind anchor | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 5 Term | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 6 Titles, comments, names | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 7 Scope and law | BROKEN | BROKEN | UNRESOLVED | BROKEN on the title clause (subjective): the accordion and carousel enumeration titles still say "no other rule" while each admits the `:where()` reset |

- Claim 7, the objective lane's `as` clause: the diff adds `as const`, which `.claude/rules/typescript.md` permits. The
  claims file said "no `as`" where the law says no prohibited assertion. That is a claims-file fault, dropped on the
  record; the checker's `as const` referral closes on the same rule.
- Claim 7, the checker's scope clause: it lacked the round-1 and round-2 diffs, which `ebc-audit-verdict.md` ruled on
  (claim 11 there, confirmed by both lanes). Round 3's status equals round 4's, so no path left that ruling's grant.

## Findings outside the claims

- **F1 (subjective), accepted.** The tag proof's holder comment says a button the surface misses reads "the release's
  reboot"; the `class` mutation reads the browser's own type (`Arial`, `13.3333px`) there, because the reboot rule no
  longer writes the release's inherited type. The lane's wording is taken verbatim.
- **R2 (subjective), accepted.** Round 4 retained only the kill tail of its `state-spacing` run.

## Carrier

E-ID-BUTTON-CASCADE round 5 (`ebc-brief-5.md`), `builder` on Sonnet: the two retitles and the F1 comment verbatim; the
revert probe widened to every longhand the reverted shorthands cover, with a control on a previously unread longhand;
every mutation re-run on the shipped tree with whole logs. A fix-round audit with both lanes follows.

## Ruling

FAIL. The code stands; the round carries two titles, one comment, and instrument coverage.
