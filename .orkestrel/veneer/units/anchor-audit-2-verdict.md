# E-ID-ANCHOR audit round 2 — verdict

The Orchestrator's reconciliation of the audit round over E-ID-ANCHOR round 2, on one claims file
(`anchor-audit-2-claims.md`): the objective lane, `analyst` on GPT-6 Astra (`anchor-audit-2-objective-verdict.md`,
thread `01a0d7c9-cbe3-7282-823a-17bbf3c996a2`); and the subjective lane, `reviewer` on Opus 5.5
(`anchor-audit-2-subjective-verdict.md`). The lanes ran blind to each other. The writer was `opus` on Opus 5.5, so the
objective lane ran on an engine that did not write the work.

**Verdict: FAIL 2, 3; outside the claims: F-BUILDS.** No emitted change, the proofs on the record, the one population,
and the scope hold (claims 1, 4, 5, 6 confirmed by both lanes). Round 3 is the unit's third round, so the Orchestrator
rules exact Items and `builder` on Sonnet applies them (`e-id-anchor-brief-3.md`).

| Claim | Objective (Astra) | Subjective (Opus 5.5) | Ruling |
| --- | --- | --- | --- |
| 1 No emitted change | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The prose claims what was measured | BROKEN | BROKEN | BROKEN |
| 3 Each comment names what its assertion reads | CONFIRMED | UNRESOLVED | UNRESOLVED: two catches have no plant log |
| 4 The proofs on the record | CONFIRMED | CONFIRMED | CONFIRMED |
| 5 One population, no sentinel | CONFIRMED | CONFIRMED | CONFIRMED |
| 6 Scope and gates | CONFIRMED | CONFIRMED | CONFIRMED |

- **Claim 2, subjective, the Orchestrator's error.** The `V.focus` row, which the round-2 brief's table left out, reads
  the candidate `hitIsOverlayDuringClip` `false` against the `always` control's `true` on Chromium 141 and on Chromium
  153 (`native141/j-native-probe-3-141.log.txt`, around line 126; `engine/units/j-native-probe-3-153.log.txt`, around
  line 133; the Orchestrator re-read both). That scenario opens the menu through the engine with no pointer press, and
  `V.clip.dropdown` opens it after a click on the toggle. So "Chromium 141 paints it, because the engine does not anchor
  the menu there" is false for a menu opened without a press, at four sites: the guide's Dropdown classes paragraph,
  the dropdown Reason cells, the mixin comment, and the dropdown include comment. D47a carried the same clause; D47b
  corrects it.
- **Claim 2, objective, the Orchestrator's error.** The claims file said the Reason cells and include comments state
  the initial value while closed; they do not, and neither brief asked them to. That sentence of the claim was wrong,
  not the prose.
- **Claim 3.** The anatomy comments name what their assertions read (both lanes). The important and closed-state catches
  follow from the assertions and the cascade, and no plant log records them; round 3 plants both.
- **F-BUILDS (subjective), accepted.** The tooltip and popover include comments and all three components' Reason cells
  say "both builds" or "neither build" without naming the builds.

## Carriers

`e-id-anchor-brief-3.md` carries claim 2's prose (Items 1 to 4), F-BUILDS (Items 2 to 4), and claim 3 (the plants in its
Execution). D47b in `decisions-round-2.md` corrects D47a's clause.
