# CL5c audit verdict — one specimen section, and the mark twin

Subject: unit CL5c in Veneer over the base `4f817db` (the CL5b landing), written by `opus` on
native Opus 5 under `units/cl5c-brief.md` with `units/cl5c-brief-2.md` and `units/cl5c-brief-3.md`
above it. Reports: `units/cl5c-report.md`, the run that stopped on the mark ruling, and
`units/cl5c-report-2.md`, the run that closed it. Scope read:
`units/cl5c-scope-read-report.md`. Claims: `cl5c-audit-claims.md`. Evidence:
`units/cl5c-diff.patch.txt`, `units/cl5c-status.txt`. The mark ruling rests on
`units/cl5-twin-measurement.md`.

**The unit ran in two parts, and the stop was correct.** The first run implemented the mark
ruling as brief 2 restated it, measured two blockers, reverted the style files, and reported the
patches. One blocker was the standing sweep CL5b had just landed, catching the shared treatment
written into both partials — the gate working as designed, on the first unit to write a
duplicated block after it shipped. The other was the token registry's root partition. Both files
were outside the brief. **That scope was the Orchestrator's defect:** brief 2's correction was
drafted against the styles rule's prose and checked against neither the sweep the Orchestrator
had itself commissioned nor the partition the token proof asserts. `units/cl5c-brief-3.md`
granted exactly those two files and the unit closed it with no deviation.

## Round 1 (2026-09-21)

Lanes, launched together and blind: analyst on Astra holding the OBJECTIVE lane
(`units/cl5c-audit-analyst-report.md`, thread `01a0c55a-2c22-71a0-b250-a1cc1785ede0`, exit 0;
Opus wrote the unit, so the writer's engine holds the subjective lane); reviewer on Opus 5 holding
the SUBJECTIVE lane (`units/lane-cl5c-reviewer.md`, workflow `wf_f160b7d0-8d0`); checker on
Sonnet (`units/lane-cl5c-checker.md`); verifier on Sonnet (`units/lane-cl5c-verifier.md`) over
`units/cl5c-gate-brief.md`.

| Claim | Analyst (objective, Astra) | Reviewer (subjective, Opus) | Checker | Verifier |
| --- | --- | --- | --- | --- |
| 1 one implementation carries the sections | CONFIRMED (each subclass narrows the supplied data meaningfully; the button section byte-identical to the base commit) | CONFIRMED (the button section keeps its engines, private mount pair, grid class, and engine release) | — | — |
| 2 existing cases pass unedited | UNDECIDABLE, run report-only; the proofs and the shell byte-unchanged | CONFIRMED (the only app proof touched is the barrel's, and its diff is the added name) | — | `test:app:browser` exit 0 |
| 3 the base is itself proved | CONFIRMED (independent copy and markup, then label, paragraph, names, markup, and child order) | CONFIRMED (constructed with rows no shipped constant carries) | — | — |
| 4 the twin reads one mixin | CONFIRMED (in-memory compilation and the shipped cascade independently produced matching declarations) | CONFIRMED (each block holds the include and nothing else; the styles rule requires exactly this sharing form) | CONFIRMED | — |
| 5 the tokens are registered and mode-independent | CONFIRMED within the claimed modes (executed the registry traversal, parsed the built cascade for partition equality, and corroborated that the engine's system colours do not branch on colour scheme; bounded as not establishing invariance across engines or user settings) | CONFIRMED (the root scope matches every other system-colour token's home) | CONFIRMED | — |
| 6 the tag's paint did not move | UNDECIDABLE, rendered reading report-only; the declarations support it | CONFIRMED (the tag's table and proof untouched) | CONFIRMED | — |
| 7 the comparison is falsifiable and reads a span | CONFIRMED on the mechanism (no alternative rule supplies the span's background or inline padding; inherited body colour differs from the pinned black) | CONFIRMED (the class rule is the only author rule matching the span) | — | — |
| 8 the sweep stays green | CONFIRMED (executed the sweep directly) | CONFIRMED statically (a block holding one include records no declaration, so neither can enter the shared set) | CONFIRMED | `test:setup` exit 0 |
| 9 the caption is reported, the residue read | CONFIRMED, with the attribution corrected (see the finding) | CONFIRMED, with the same correction | — | — |
| 10 the disjointness invariant | CONFIRMED (an in-memory reading found no overlap and a control produced one) | CONFIRMED (the widening is a type argument, not an assertion) | — | — |
| 11 the colour control has its own case | CONFIRMED | CONFIRMED (declaring the alias rather than the Veneer token is the correct control, because the alias is substituted at the root inside the theme mixin) | — | — |
| 12 scope, law, gates | UNDECIDABLE as a complete gate claim; scope and law hold | CONFIRMED for scope and law; gate half outside the lane | CONFIRMED | every step exit 0, status identical before and after |

Reconciliation. Every claim's substance is confirmed by every lane that could rule on it, and the
verifier closes the gate half. Both engines independently reached the mark ruling's foundation:
the objective lane compiled the mixin in memory and parsed the shipped cascade separately, and
the subjective lane traced the sharing form against the styles rule.

**The Orchestrator's own defect, the seventh.** Claim 9 said the figure residue reading means a
later change giving that class a flex display reddens the reading that records the residue. Both
lanes corrected it: the residue lines fail only if the element rule drops the direction or the
gap, and the pre-existing display assertion is what reddens on a display change. The residue pin
is real value; the guard was the Orchestrator's attribution.

**Findings sent back, neither forced by a lane** (`units/cl5c-brief-4.md`):

- **Subjective 14.** The two mark tokens are public retune points no case reads as tokens. Both
  proofs pin the literals the system colours resolve to, which resolve identically whether the
  mixin reads the tokens or carries the bare keywords, so inlining them would remove the retune
  point with every case green. **This is the defect class this unit armed an assertion against
  elsewhere in the same change**, which is why it goes back rather than becoming a bound.
- **Subjective 16.** The base's row type carried one section's name, so the base read as
  rendering that section's specimens and a fourth section would inherit the confusion.

**Findings carried, not sent back:**

- **Subjective 13 (to the family's acceptance, and to the user).** After this unit no rule under
  `src/styles/` reads the older highlight token pair, because the mark class was their only
  consumer through the Bootstrap aliases. A consumer retuning that pair now sees nothing move.
  Whether it stays as a Bootstrap-compatibility alias with no Veneer consumer or is removed is a
  decision for the unit owning the alias surface and the guide's token table, and it is a
  question for the user rather than a unit's to settle.
- **Subjective 15.** The figure residue attribution, corrected against the claim rather than the
  code.

### Terminal (round 1)

Verdict: fix round. `units/cl5c-brief-4.md` on Opus, the writer, carrying the unguarded retune
seam and the rename. Round 2 runs all four lanes with the same assignment.

## Round 2 (2026-09-21) — the fix round under `units/cl5c-brief-4.md`

Subject: the whole CL5c change after the fix round, over the same base `4f817db`. Claims:
`cl5c-audit-claims-2.md`. Evidence: `units/cl5c-diff-2.patch.txt`, `units/cl5c-status-2.txt`,
round 1's `units/cl5c-diff.patch.txt` for a diff-to-diff reading, and the Orchestrator's own probe
`units/cl5c-probe.sh` with `units/cl5c-plant.mjs` and `units/cl5c-probe.log.txt`. Report:
`units/cl5c-report-3.md`.

Lanes, launched together and blind: analyst on Astra holding the OBJECTIVE lane
(`units/cl5c-audit-2-analyst-report.md`, thread `01a0c56a-e1ee-7ff3-9a2c-b50f26511159`, exit 0);
reviewer on Opus 5 holding the SUBJECTIVE lane (`units/lane-cl5c-2-reviewer.md`, workflow
`wf_e27f9c09-47d`); checker on Sonnet (`units/lane-cl5c-2-checker.md`); verifier on Sonnet
(`units/lane-cl5c-2-verifier.md`) over `units/cl5c-gate-2-brief.md`.

| Claim | Analyst (objective, Astra) | Reviewer (subjective, Opus) | Checker | Verifier and probe |
| --- | --- | --- | --- | --- |
| 1 the tokens are read as retune points | CONFIRMED (neither retune value equals what either keyword resolves to, corroborated against the engine's own implementation; the built cascade retains the token references) | CONFIRMED (the two retune values also differ from each other, so a mixin reading the sibling token for either property reddens too; reading both sides is the right shape because two independent rules share one mixin) | — | — |
| 2 that case fails on the named edit | UNDECIDABLE, report-only; the plant's removal confirmed by hash | CONFIRMED, report-only on the run; no other assertion reads those properties against a non-default value | — | the Orchestrator's probe reddens exactly that case while the tag's own proof stays green, and restores to the hash both lanes cite |
| 3 the setup proof carries the table | CONFIRMED (evaluated the live declarations, found no overlap and frozen rows, and rejected controls substituting the recorded defaults) | CONFIRMED (the disjointness assertion is beyond what the brief named and matches the invariant the same file already carries) | — | — |
| 4 the row type is renamed | CONFIRMED (a checkout-wide search including hidden and ignored text found no occurrence of the old name; the new name is declared once) | CONFIRMED (the new name parses the way the button section's row type does, and the guide named neither) | — | — |
| 5 nothing round 1 settled moved | CONFIRMED (reconstructed the round-2 patch over the base in memory and matched every implementation path against the live checkout) | CONFIRMED with a qualification: the section base is not byte-identical, because its annotation followed the rename, and claim 5's own list names it among the unmoved while claim 6 names it among the changed | — | — |
| 6 scope, law, gates | UNDECIDABLE as a complete gate claim; scope and law confirmed | CONFIRMED on the parts evidence reaches; gate half report-only | CONFIRMED in full on this lane's evidence | every step exit 0, both status readings identical |

Reconciliation. Every claim's substance is confirmed by every lane that could rule on it.

**The probe settles the claim no lane could execute, and settles it more completely than the
claim asked.** Inlining the system colour keywords into the shared mixin reddened exactly one
case in the type proof and nothing else, and **the mark tag's own proof stayed green under the
same edit**. That second reading is the finding's whole premise: the literal-pinning cases cannot
see the tokens disappear, which is why the new case was owed. The mixin restored to the hash both
lanes cite.

**The Orchestrator's own defects, the eighth and ninth.**

- Brief 4's criteria 2 and 4 cannot both hold: criterion 2 required the rename to follow into the
  specimen table annotations, which live in a file criterion 4 forbade the status to gain. The
  unit closed the substantive one, changed nothing else in that file, and recorded the conflict,
  which is the correct handling. The rule: read a brief's criteria against each other before
  dispatch, not only against the tree.
- The round-2 reviewer brief's evidence list named briefs 1 to 3 and reports 1 and 2, but not the
  effective brief and report of the round under audit. The lane found them through the claims
  file and said so. This is the derived-brief hazard the campaign already recorded for the lane
  focus, recurring in the evidence list. **The rule now covers both: when deriving a lane brief,
  rewrite the lane focus and the evidence list, and name the round's own effective brief and
  report in the latter.**

**Claim 5's qualification is accepted as the reviewer states it.** The section base did change,
because its annotation followed the rename; round 1 did not settle that name but sent it back, so
nothing round 1 settled moved. Claim 6's file list is the accurate one.

**One finding carried, not sent back.** The shared copy type is declared and no constant is
annotated with it, so the contract is stated at one consumer and at no producer: a copy constant
losing a member reports at the section's construction rather than at the table that drifted.
Brief 4 scoped the rename to the specimen annotations and named nothing about the copy constants,
so this is outside what the unit was given. It goes to the unit that next owns that file.

**One finding raised and struck by the lane that raised it**, recorded so a successor does not
re-raise it: the retune case reads the tag before the class in one loop, so a tag failure ends
the case before the class is read. That hiding is what the unit split apart for the heading colour
case, but there the hidden reading was a different subject under a case named for size, while
here both readings are one subject at two sites and the case name states both.

### Terminal (round 2)

Verdict: accept. CL5c lands at the round-2 tree.
