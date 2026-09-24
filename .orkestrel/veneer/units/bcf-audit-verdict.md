# Audit round 1 — BCF (`bcf`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the BCF unit (`opus` on Opus 5.5 in `/home/user/veneer-bcf` from `dc92a09`), claims file
`bcf-audit-claims.md`. Lanes that ran, blind to each other: the objective lane, `analyst` on GPT-6 Astra
(`bcf-audit-objective-verdict.md`, thread `01a0d30c-15fd-79f2-9100-5c61314b2186`, journal
`tmp/codex/bcf-audit-analyst.jsonl`); the subjective lane, `reviewer` on Opus 5.5
(`bcf-audit-subjective-verdict.md`); and the checker on Sonnet (`bcf-audit-checker-verdict.md`, claims 1, 8,
and 9). The reviewer and the checker ran in workflow `wf_b8ee4c00-b9d`. The Orchestrator's apply check:
`bcf-shared.patch` on a fresh `dc92a09` extract, exit 0.

## Per-claim rulings

1. to 6. **CONFIRMED** by both adversarial lanes, each against the frames and the mutations: the V2 probe
   and its three red runs, the V3, V4, V5, and V6 proofs, and the V14 ruling.
7. **BROKEN (objective lane).** The added panel-corner case iterates the literal pair `Accordion base` and
   `Accordion last expanded`, so a specimen added to the table alone never enters it. The subjective lane
   confirmed the state and group-corner cases and did not read this one; the Orchestrator read the site
   (`AccordionSection.test.ts`, the case "hands the outer bottom corners to the panel of an expanded last
   item and squares its button") and the literal pair is there. Carrier: B-a.
8. **BROKEN (objective lane) on one guide sentence; the frames hold under every lane.** The patch rewrites
   the "first pixel" sentence that PAGE-FRAME's patch also rewrites, and BCF's version keeps the stale
   claim. The checker ruled the frames it opened and left the rest UNRESOLVED; the subjective lane and the
   objective lane opened the rest and confirmed them. Carrier: B-b.
9. **BROKEN** on the report by every lane that ruled it; accepted on the record.

## Findings outside the claims (subjective lane)

- **F4, implementation.** The menu-containment loop is copied into `NavSection.test.ts` and
  `NavbarSection.test.ts` from `DropdownSection.test.ts`, near-duplicates `.claude/rules/tests.md` names a
  defect; the helper's home, `tests/setupBrowser.ts`, was off-limits to this unit. Carrier: B-c.
- **F2, naming.** `Navbar with open menu` does not name what sets the specimen apart (`Navbar opened` also
  carries an open menu); every prose site says the menu hangs. Carrier: B-d.
- **F1 and F3, prose.** The `nav-tabs` 390 frames' menu covers the wrapped disabled tab, which the
  `NAV_SPECIMENS` TSDoc does not record; four guide sentences need a clearer subject, a token noun, or a
  split. Carrier: B-e.
- **F5, report.** Accepted on the record.

## Carrier

Round 2 on the same `opus` subagent (`b-collapse-bcf-brief-2.md`) carries B-a to B-e, after PAGE-FRAME
lands: the Orchestrator commits round 1 on `unit/bcf` and merges the session branch into it first, so B-b
takes PAGE-FRAME's rewrite of the sentence and B-c writes the helper into the `FrameManager` module's file
as PAGE-FRAME left it. Its audit runs the objective lane on Astra and the checker.

VERDICT: FAIL 7, 8, 9; outside the claims: F1, F2, F3, F4, F5
