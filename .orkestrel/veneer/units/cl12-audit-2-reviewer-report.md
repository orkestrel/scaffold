<!-- reviewer on native Opus 5, native subagent, clean context, read-only. Held the OBJECTIVE lane of
CL12 audit round 2; the lanes swap back because Astra wrote the fix round. Brief:
cl12-audit-2-reviewer-brief.md. Terminal line: Verdict: accept.

RETAINED LATE, at the campaign's own review. A native read-only lane produces no report file, so this
is the Orchestrator's transcription of the lane's substance from its returned message, labelled as
such rather than presented as a byte copy. -->

# CL12 audit round 2 — objective lane report

Every cascade value below was read out of the built stylesheet by the lane itself; no ruling rests on
the unit's report.

## Rulings

All twelve claims CONFIRMED. The ones whose evidence matters:

- **The container paragraph is true in every clause.** The five cap rules read from the cascade's own
  bytes, and the declared widths match the three boundary-to-token pairs the sentence names. "A capped
  container takes the width of the widest boundary the viewport has crossed" is **exactly** true rather
  than approximately: because the selector list accumulates, any container whose own boundary is crossed
  is named in every rule from that boundary upward, and the widest matching rule is declared last at
  equal specificity, so it wins. Checked against the non-obvious case — a mid-width container at a wider
  viewport takes the wider token.
- **The fluid clause was measured, and the proof asserts it.** First-party cascade parse: the fluid
  container occurs in exactly two rules, neither declaring a maximum, and no cap rule selects it. The
  existing container proof carries that key with an undefined boundary, so its case asserts the computed
  maximum is none and the width equals the viewport, immediately before, at, and after every named
  boundary. **Mutation:** add the fluid container to the accumulator and the proof reads a cap against an
  assertion of none. The accumulation clause is gated the same way — replacing the accumulator with a
  per-name selector makes the narrow container read its own width at the widest viewport against an
  assertion of the widest.
- **The deferred-name justification holds.** The presence scanner requires every deferral name to be a
  member of the pinned inventory's projected vocabulary, and a sweep of that fixture returns neither
  deferred name. The cross-reference is also right: the deferral reader scans only the styles section for
  its exact subsection heading, and the tokens table is a subsection of a different section, so no reader
  parses it.
- **Neither correction changed what any reader parses.** The lane re-derived the reader population rather
  than accepting the report's, and the parity gate asserts only over fences, surface, methods, drift,
  examples, imports, and links — neither edited paragraph carries any of those. Independently,
  differencing the two patch renderings shows the two prose paragraphs as the only change, with no table
  hunk differing by a byte.
- **The gate correction is actionable where round 1's was not.** Verified first-party: the mark tokens
  appear both as table rows and in the prose immediately following, inside the same section, so round 1's
  check passes after a row is deleted — it could not fail for its target. The replacement names the read
  side and names the falsifier, and that control discriminates: it fails round 1's design and passes the
  replacement.
- **The freshness ordering is unambiguous on evidence independent of the report.** Modification-time
  order over the checkout places the guide's last write before every gate log, with the direction fixed
  by the exit-code record sorting last and the gate logs sorting in their recorded start order. That
  record carries each gate's start time and a zero exit. **The digest-constancy sentence has no retained
  receipt** — the logs carry a bare start header rather than the header the runner would write — so it is
  ruled UNPROVEN, and it carries no weight because the ordering settles freshness without it.
- **The shell-versus-native exit handling is correct.** The first log shows the shell converting an npm
  notice into an error record while the run proceeded normally, which is the documented host behaviour.
  Refusing that as the native exit was right, and the re-run through a different shell is retained.

## Findings

**13. The post-chain cascade re-read is unevidenced, and its timing is contradicted.** The report says
the rebuilt cascade was re-read after the gate chain; the retained readings log sorts between the build
and test gates in modification order, and no artifact shows a post-chain re-read. **Why it matters:**
round 1 was pulled up for exactly this class — an account a successor cannot re-run — and this report
carries that correction. Does not force a round: the underlying fact holds, because the current cascade
the test gate rebuilt last matches the table.

**14. The reader census omits a seventh guide parser.** The policy sweep constructs the guide and reads
its sections and surface, so it is a parser rather than only a prose sweep. Neither the brief's corrected
six-file population nor the report names it. Inert here — no heading and no surface row changed, and the
policy gate is green — but the next brief touching this guide names it.

**15. The replacement paragraph drops the plain container class from its account.** Every cap rule also
names it and it is the family's primary class, but the paragraph never names it; the superseded sentence
did. Nothing stated is false and the generalization yields the correct width, so this is a coverage
regression rather than a defect.

**16. The recommended gate still leaves its authority side unnamed.** A gate reading only the guide's own
name cells cannot detect a token that was never given a row. The obligation it must close is a comparison
against the registered token set — which the report itself implies when it names four registered tokens
absent from the guide entirely. Successor scope.

## Referral

**The executed gate runner is not retained, and one live artifact was not copied.** The retained
instruments hold the comparator and the logs but not the exit-code record the report cites, and not the
script that produced the logs. The retained runner writes a header none of the logs carries, so it is not
the runner that ran. Retention is the Orchestrator's, and the exit-code record is the only artifact
carrying the whole-suite gate's native exit.

**Verdict: accept**
