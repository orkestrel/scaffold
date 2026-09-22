<!-- reviewer on native Opus 5, native subagent, clean context, read-only. The SUBJECTIVE DESIGN FIT
lane of the CL13 portfolio verdict, one of three blind lanes on one portfolio. Brief:
cl13-verdict-brief.md. Terminal line: CONVERGED. Transcribed by the Orchestrator from the agent's
returned result, because a native read-only lane holds no write tool and produces no report file.

RETAINED LATE, at the campaign's own review, after the Orchestrator found it had retained only one of
this round's three lanes against .agents/orchestration.md's requirement that retention covers every
lane of an audit round. This lane's finding 7 is the campaign's most consequential carried finding and
existed only inside the verdict's summary of it until this file was written. -->

# CL13 portfolio verdict — subjective design fit lane

Held the subjective design-fit lane: whether the rendered surface reads as one coherent, deliberate
thing, and whether each difference from Bootstrap reads as a decision or as drift. Every cited frame
was opened on both sides and read as pixels. Where a claim needed a measurement the lane could not
take by eye, it says so and refers it.

**Headline ruling.** Across the container, row, table, and link keys, Veneer renders as one deliberate
surface. Every visual difference found from Bootstrap resolves to a row in the guide's departures
table. Nothing in the rendered cascade reads as drift. The defects found are in the portfolio's naming
and coverage, not in what ships.

## Candidate rulings

**1. The container cap matches Bootstrap exactly — CONFIRMED in this lane.** At 1280 both frames carry
the same left inset before the caption and both stop short of the viewport; at 390 both run full width
with that same inset. Bootstrap's page frame puts the text at the inset a 1140 cap plus a 12px gutter
produces. The pixel equality itself is the objective lane's.

**2. The row stacks at the same breakpoint — CONFIRMED, narrower than stated.** At 1280 both put the
two column labels on one line with the split at the same place; at 390 both put them on separate lines
with the same indent. "Same breakpoint" overstates the evidence: the portfolio samples 390 and 1280 and
never samples the `md` boundary. What is confirmed is the same behaviour at both sampled widths, which
is a different and weaker claim.

**3. Shorter for the font-size departure "and nothing else, and it is uniform" — REFUTED in part.** The
recorded clause holds; the uniform and nothing-else clauses fail. Container and row match the
single-cause story at the 0.875 ratio. The table does not: 163 × 0.875 is 142.6, not 149. A second
recorded cause is visible in the frames — Bootstrap's caption is body-sized, Veneer's is visibly smaller
than its own header — which is the guide's `.875em` caption row with different padding. Two recorded
departures compound in the table frame. **Cost of leaving the wording as the candidate has it:** a
maintainer who believes one uniform cause will accept a future frame whose height moved for the caption
reason and file it under font size.

**4. 32 frames carry 14 distinct images; structural, not a defect — CONFIRMED, wrong defect named.**
The duplication is structural exactly as stated, and a lane counting files would overstate the evidence.
The candidate then stops one step short: the defect is not the duplication but what the duplicated files
are called. See finding 7.

**5. The link frames are width-invariant on both sides — CONFIRMED.** An inline anchor does not reflow
between those widths. Not a Veneer defect, and not a Bootstrap one.

**6. A lane cannot judge the role palette from this portfolio — CONFIRMED for Veneer, REFUTED for the
portfolio.** The conclusion is right and the cause is wrong, and the correction decides where the repair
goes. **Bootstrap's side can show the palette**: its page frame renders all nine roles legibly and its
snapshot names each. Veneer's cannot — its element frame shows one anchor, it registers no page frame
for the key, and its only whole-page frame is 1280×8204, which puts the link row at a scale no reviewer
can read. **The gap is one-sided, so the repair belongs to Veneer's capture registry alone.**

## Findings

**7. The `--dark` token names the rendered theme on one side and the shooting project on the other.**
A Veneer frame named for the dark project renders light; the mode lives in the state token before the
separator. Veneer's grammar is internally consistent, and that consistency is what makes it misread:
the mode token and the project token are one hyphen apart and only one of them names what rendered. The
obvious comparison method — sort both directories, match like to like — pairs a light frame against a
dark one. **Scope is family-wide, not CL13's**: the Button family's frames sit in the same directory
under the same grammar. **Cost:** a reviewer pairing by filename reports a dark-mode failure that does
not exist, and every later family's verdict round pays the same misreading.

**8. The two sides share no filename token for the same specimen.** Bootstrap's stems match the
registry's specimen names verbatim; Veneer's invert them and prepend the selector's element. **Cost:**
the two directories cannot be sorted into aligned rows, so every pairing is assembled by hand — which is
the exact condition finding 7 exploits.

**9. The caption position is a decision; its consequence is unrecorded.** Every Veneer table frame sets
the caption above, every Bootstrap frame below, proven at both widths and both themes, and holding
across every table on Veneer's whole page. The cause is named in the guide, so this reads as a decision
rather than drift, and it is the most prominent difference in the portfolio — caught by an element
frame, not by the key's declared assertion. **That is the portfolio earning its cost.** What the record
does not name is the consequence: Veneer's base table already captions at top, so the shipped
top-caption class has nothing left to change, and no class restores Bootstrap's bottom caption.
**Cost:** a consumer porting Bootstrap table markup gets every caption relocated with no named opt-out.
The class redundancy itself is **NOT-EVIDENCED** — the portfolio registers no specimen for it, and the
partial was read as corroboration only.

**10. The accessibility artifacts are not comparable across the sides.** Bootstrap's are per-specimen
ARIA snapshots naming the table and its caption; Veneer registers no per-key accessibility artifact, and
its whole-page dumps use a different indented format that emits no caption node and shows the tables
bare. **What is comparable came back clean**: the link names match exactly and in order. What is not is
whether Veneer's captioned table carries an accessible name — the formats disagree and the portfolio
cannot separate a cascade difference from a dump-format one. **Cost:** the accessibility question closes
for the link key and stays open for the table key. **Referral to the objective lane.**

**11. "Both sides mirror the same markup and differ only in stylesheet" is not shown by the portfolio.**
Bootstrap's page frames show a blank viewport carrying the specimen alone; Veneer's are lifts out of a
full showcase. The hosts are not the same document, so inherited context is not proven identical. No
symptom appeared — cap geometry, gutters, and the column split matched across every pair opened. **Cost:
nil today.** It bounds what a future unexplained difference may be attributed to. **Referral to the
objective lane.**

**12. What this portfolio cannot show**, stated rather than passed: Veneer's link roles other than
primary; the container's caps between the two sampled widths; the `md` boundary itself; the table
variants beyond base; and any non-rest state for these keys — the last a deliberate registry exclusion
rather than a gap.

## Carriers

Findings 7, 8, and 9 are the ones worth carrying, and 7 is urgent because it corrupts the reading method
rather than the subject and ships with every family's frames. Findings 10 and 11 are referrals rather
than carriers until the objective lane rules.

No fix is proposed and none is authorized in this round.

**CONVERGED**
