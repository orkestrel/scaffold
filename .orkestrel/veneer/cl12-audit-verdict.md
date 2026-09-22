# CL12 audit verdict — round 1

Subject: unit CL12, the guide, written by `opus` on native Opus 5 from the CL11 landing `eb1cd71`.
One file changed. Claims: `cl12-audit-claims.md`. Report: `units/cl12-report.md`.

**Verdict: fix round.** Forced by the subjective lane's finding 24 — a sentence added by this unit
that the cascade falsifies — with finding 25 folded in, and the objective lane's evidence-honesty
refutations closed in the same round.

## Lanes

| Lane | Role and engine | Outcome |
| --- | --- | --- |
| Objective | `analyst` on gpt-6-astra, journal `tmp/codex/cl12-audit-analyst.jsonl` | fix round, on claims 4, 10, 13, 19, 23 |
| Subjective | `reviewer` on native Opus 5 | fix round, on finding 24 with 25 folded in |
| Gates | `verifier` on the native cheap tier | taken after the fix round, with a freshness question the subjective lane referred |

**The lanes swapped because Opus 5 wrote the unit.** No checker ran: the diff is one file and both
judgment lanes verified every mechanical claim against the tree directly. That deviation is recorded
here rather than in a template sentence — a checker adds nothing to a single-file Markdown diff whose
every claim is a value in the built cascade.

## The forcing finding

**A sentence this unit added misstates the cascade it describes.** Verified first-party. The guide's
new container paragraph says one width caps its own family from its own boundary upward. The cascade
appends on each pass, so every rule names its own name **and every narrower one**:

```text
@media (width>=576px){.container,.container-sm{…--vn-container-sm}
@media (width>=768px){.container,.container-sm,.container-md{…--vn-container-md}
@media (width>=1400px){.container,…,.container-xxl{…--vn-container-xxl}
```

So the narrow container reads its own width only between the first two boundaries, and above the
widest it reads the widest width. A consumer sizing a layout from that sentence expects one number and
measures another.

It forces for a reason beyond the number: it is the only prose explaining how the five new tokens
apply, it was added under an objective whose whole point is that no sentence claims a reading the tree
does not produce, and nothing gates it. The subjective lane supplied the corrected sentence.

**Folded in — finding 25.** The added justification for keeping two deferral shapes says the deferred
names are "Veneer's own names rather than official ones". The table's first row is `scroll-padding`, a
standard CSS property. The operative fact is true and stronger: none of those names is in the pinned
inventory the presence scanner checks against, which is exactly why the other table's reader would
refuse them.

## The lanes contradicted each other, and the objective lane is right

They split on claim 10, the unit's argument that unifying the deferral grammars is impossible in both
directions.

The subjective lane confirmed both halves. The objective lane refuted it by distinguishing two things
the unit conflated: **changing a table's columns** and **relocating its rows**. Converting the unread
tokens table to the read table's column shape leaves `selectSectionBlocks(document, 'Styles')`
identical, because the reader never sees that section — so that direction breaks nothing. What does
fail is relocating those rows into the Styles table, which the scanner refuses as outside the official
inventory, and changing the Styles table's own columns, which removes the owner the reader requires.

**The objective lane is right**, and its reading is executable: it ran the conversion in memory and got
an identical projection. The subjective lane confirmed by describing relocation rather than shape.

**This changes nothing in the guide.** The shipped prose says the reader is why the Styles table
carries an owner and a reason where the other carries neither. That is true. Only the report's
impossibility claim is overstated, so it is a record correction rather than a guide fix.

## Refuted without forcing a guide change

- **Claim 4 — range rows can be checked.** The unit claimed a range row cannot be read by a
  completeness check. The objective lane expanded the guide's gray endpoints through the registry and
  obtained the intervening names. The literal rows the unit added are right and need no redesign; the
  claim about ranges is wrong. The subjective lane defended the claim as literally true of the check
  the unit proposed, which is a narrower statement than the report makes.
- **Claim 13 — the sweep is narrower than "instrument-derived".** Both lanes refuted this, and the
  subjective lane's version is sharper: the ledger instrument prints a row only when an obligation
  carries both a backticked class and a backticked token, and the pre-edit false row carried no token.
  **So that instrument cannot have produced the finding the report credits to it.** The correction
  itself is verified true, so nothing in the guide is wrong because of it. It is an evidence-honesty
  defect: an account a successor cannot re-run.
- **Claim 19 — the recommended gate is insufficient, and this one must not propagate.** The proposal
  checks backticked names anywhere inside the tokens section. Verified first-party: the mark tokens
  appear in their table rows **and** in prose beside them, so deleting a row leaves the span and the
  gate passes. A successor building it would ship a gate that cannot fail for the thing it exists to
  catch. The objective lane's correction is the right one — check the table's name cells and their
  required value, source, and alias columns. The subjective lane added that the cost line also omits
  the composite rows, naming four registered tokens the guide does not contain at all.
- **Claim 23 — scope honesty fails narrowly**, on the ledger attribution alone. Every edit the report
  describes is in the diff and nothing in the diff is undescribed.

## Carried, not forcing

1. **The tokens section uses two shorthand conventions it never declares** — range rows and composite
   rows that cover members they do not spell. That ambiguity is the condition the nine missing tokens
   grew in: nobody could distinguish "covered by shorthand" from "absent". Carried by the successor
   that lands the completeness gate, named there rather than left to be rediscovered.
2. **The mirror instrument compares base names, not full relative paths**, so a proof moved between
   directories would pass it while the claim it supports went false. The mirror does hold today, walked
   by hand. Carried by whichever unit next runs that sweep.
3. **The compatibility table's two granularities** stay with the cross-cutting reconciliation unit,
   untouched by this round.

## What the Orchestrator owns, and did

- **The instruments were unretained.** The subjective lane's referral R2 is correct: seven instruments
  and eight gate logs sat only under the subject's `tmp/`, which is swept at acceptance, so claim 13's
  own evidence base would have disappeared. Retained under `units/cl12-instruments/` before this
  verdict was written.
- **Both record corrections lived only in the report.** The terrain record still named seven tokens and
  the brief still claimed three guide readers. The terrain now carries a dated correction in the
  pattern it already uses. The reader-population correction rides in this verdict and in the fix
  round's brief.
- **A freshness question stands for the verifier.** The retained gate logs all timestamp inside two
  minutes, and two instruments whose findings produced the corrections carry later modification times.
  The subjective lane could not settle from a read-only position whether the gates ran against the
  final guide. The independent run settles it in one pass, and the conformance gate is the one that
  reads the table the corrected row sits in.

## Carriers

Findings 24 and 25 are carried by **CL12's fix round**, which routes to Astra because Opus 5 wrote
round 1. The report corrections for claims 4, 10, 13, and 19 are carried by that same round's report.
Carried items 1 and 2 go to the units named against them; item 3 stays with the cross-cutting unit.
