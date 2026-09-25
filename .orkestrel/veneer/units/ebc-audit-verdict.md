# E-ID-BUTTON-CASCADE audit — verdict (2026-09-25)

The Orchestrator's reconciliation of the E-ID-BUTTON-CASCADE audit on `ebc-audit-claims.md`. Three lanes ran blind to
each other: the objective lane, `analyst` on GPT-6 Astra (`ebc-audit-objective-verdict.md`; journal
`tmp/codex/ebc-audit-analyst.jsonl`, thread `01a0d649-5715-7392-9445-903540491528`); the subjective lane, `reviewer` on
Opus 5.5 (`ebc-audit-subjective-verdict.md`); and `checker` on Sonnet on claims 3, 8, 10, and 11
(`ebc-audit-checker-verdict.md`). The subject was written by `opus` on Opus 5.5 (round 1) and `builder` on Sonnet
(round 2); the objective lane ran on an engine that wrote neither.

## Claims

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Tag rule | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 2 Reset mixin | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 3 Includes | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 4 Revert readings | UNRESOLVED | BROKEN | — | BROKEN: `revert.mjs` takes the rest readings before it turns reduced motion on |
| 5 Tag proofs | UNRESOLVED | UNRESOLVED | — | NOT-EVIDENCED: `mutate.sh` filters every failure message, so no kill names an assertion |
| 6 `.btn` forms | UNRESOLVED | BROKEN | — | BROKEN: the case reads no hover, press, or keyboard focus, so a surface state leak onto `.btn` stays green |
| 7 Class form | UNRESOLVED | UNRESOLVED | — | NOT-EVIDENCED, as claim 5 |
| 8 Enumerations | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 9 Tailwind pairing | UNRESOLVED | BROKEN | — | BROKEN: the case compares the utility button with the plain one and never anchors the plain one to the surface |
| 10 Term and guide | CONFIRMED | BROKEN | CONFIRMED | BROKEN: "bare" survives in the guide's button-state prose and table, a token comment, and two constant names |
| 11 Scope and law | CONFIRMED | BROKEN | CONFIRMED | BROKEN on the title clause only: the tag proof's title says a utility button wears the surface while it asserts the utility's padding |

- Claim 10: the objective lane and the checker swept for the patterns the claims file named, and `bare button` does not
  match "Bare \`button\`". The subjective lane read the sense, which is what the design verdict retires. Its sites
  resolve: `guides/veneer.md` around lines 7111 to 7124 and 7189, `src/styles/_tokens.scss` around line 239, and
  `BUTTON_BARE_VALUES` and `BUTTON_BARE_CASES` in `tests/setupStyles.ts`.
- Claim 9: the objective lane's reading holds for the `class` mutation, which strips the surface from the utility
  button alone. The subjective lane's failing input removes the surface from both, and the case stays green, so the
  case does not prove the claim's "keeps the surface".

## Findings outside the claims

- **F1 (subjective), accepted.** The comment above the first `button` rule in `_button.scss` says every button keeps
  the release's reboot at the release's values; the surface replaces the reboot's type and corner.
- **F2 (subjective), accepted.** `BUTTON_REBOOT_LONGHANDS` lists the longhands every button keeps from the release,
  which the `button-reboot` mixin never writes, beside `BUTTON_REBOOT_SELECTORS`, which lists where the mixin is
  included. One prefix names opposite things (`AGENTS.md` § One concept, one term).
- **Referral (subjective), carried.** The comment in `tests/app/browser/sections/BadgeSection.test.ts` beside the
  `btn-primary` expectation must be true of the shipped `.btn`.

## Carrier

E-ID-BUTTON-CASCADE round 3 (`ebc-brief-3.md`), `opus` on Opus 5.5, carries claims 4, 5, 6, 7, 9, 10, and 11, F1, F2,
and the referral. The rename of `BUTTON_BARE_VALUES` and `BUTTON_BARE_CASES` moves here from the E-ID-BUTTON-CLASSES
brief, because the design verdict retires the term and this unit owns the retirement.

## Ruling

FAIL. Round 3 runs, then a fix-round audit with both lanes and the checker.
