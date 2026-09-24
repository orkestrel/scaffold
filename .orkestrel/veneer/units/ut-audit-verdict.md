# Audit round 1 — UTIL-TEXT (`ut`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the UTIL-TEXT unit's round 1 (`opus` on Opus 5.5 in `/home/user/veneer-ut` from `2a3f223`),
claims file `ut-audit-claims.md`. Lanes that ran, blind to each other on that one file: the objective
lane, `analyst` on GPT-6 Astra (`ut-audit-objective-verdict.md`, thread
`01a0d156-0cc7-7b33-8029-713971f3c4d9`, journal `tmp/codex/ut-audit-analyst.jsonl`, an engine that did
not write the unit), the subjective lane, `reviewer` on Opus 5.5 (`ut-audit-subjective-verdict.md`), and
the checker on Sonnet (`ut-audit-checker-verdict.md`, claims 1, 7, and 9), the last two through workflow
`wf_178e9a1a-b6d`. The Orchestrator's apply check: `git apply --check ut-shared.patch` on a fresh
`git archive 2a3f223` extract, exit 0.

## Per-claim rulings

1. **CONFIRMED** by every lane.
2. **CONFIRMED** by both lanes on the selectors and priorities; the pair order is ruled under the
   outside finding.
3. **CONFIRMED** by both lanes for the link entries' place in `_color.scss`.
4. **CONFIRMED** by both lanes.
5. **BROKEN (objective lane).** The retained "pairs in the components layer" mutation nests a components
   layer inside the utilities layer (`utilities.components`), so its red run proves a different mutation
   from the one the report names. Carrier: T-a.
6. **CONFIRMED** by both lanes.
7. **CONFIRMED** by every lane.
8. **BROKEN (both lanes).** The `### Text utilities` opening says the text keys ship whole from
   `_text.scss`, where the colours, opacity steps, and pairs ship from the colour partial and the
   truncation helper from components; the `text` compatibility row says every `.text-*` selector ships in
   utilities, where `.text-truncate` ships in components; it says every text-colour class sets the text
   opacity, where the emphasis classes set the colour alone; the prefixed-decoration bullet says the
   standard property ships alone, where the build emits the prefixed alias, as § Icon links states; the
   rewritten `link` rows and the Tailwind paragraph leave a path and the importance token without their
   nouns. Carrier: T-b.
9. **BROKEN (both lanes).** The `TEXT_SPECIMENS` remark calls the `.col-2` column the narrowest the grid
   ships; the truncation proof's comment says a utilities rule outranks components whatever its
   priority; the remark spells "behaviour" where `app/` writes "behavior"; the report names items by
   position and cites a copy-service log for a green reading it no longer holds. The report is the
   round's record; the product sentences carry. Carrier: T-c.

## Findings outside the claims, ruled

- **pair-link-order (objective lane) and F1 (subjective lane): BROKEN, both lanes.** The release loads
  the `color-bg` helper before the `colored-links` helper, so on one element a `.link-*` class wins the
  colour over a `.text-bg-*` pair; the patch loads the link helper at the head of the utilities layer and
  the pairs at the head of `_color.scss`, after it, so the pair wins. The brief's "the `.text-bg-*` rules
  at its head" placement is the cause, and it is the Orchestrator's ruling. Carrier: T-d, which moves the
  pairs into their own helper partial ahead of the link helper.
- **F2 (subjective lane): BROKEN.** The `text-dark` specimen writes dark text on the dark-mode surface at
  about 1.15:1, against the remark's own rule. Carrier: T-e.
- **F3 (subjective lane): BROKEN.** `COLOR_COPY` promises a readable foreground on each role's fill, where
  the release's recorded info and warning foregrounds read about 3.6:1 and 4.2:1 on Veneer's fills.
  Carrier: T-f.
- **report-counts (objective lane): recorded.** No product carrier.

## Carrier

Round 2 on the same `opus` subagent carries T-a to T-f (`b-utilities-ut-brief-2.md`). Its audit runs the
objective lane on Astra and the checker; the subjective lane is not run for round 2, because T-b, T-c,
T-e, and T-f adopt that lane's wording, T-d follows the release's helper order both lanes name, and T-a
and T-d close on retained runs.

VERDICT: FAIL 5, 8, 9; outside the claims: pair-link-order, F1, F2, F3
