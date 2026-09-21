# CL5b audit verdict — the cross-folder duplication and the standing sweep

Subject: unit CL5b in Veneer over the base `ea82419` (the CL5 landing), written by `sol` on Astra
under `units/cl5b-brief.md` with `units/cl5b-brief-2.md` above it. Report: `units/cl5b-report.md`.
Scope read: `units/cl5b-scope-read-report.md`. Claims: `cl5b-audit-claims.md`. Evidence:
`units/cl5b-diff.patch.txt`, `units/cl5b-status.txt`, and the Orchestrator's own probe
`units/cl5b-probe.sh` with `units/cl5b-plant.mjs` and `units/cl5b-probe.log.txt`.

The unit's scope was measured before it was briefed, which is why it closed a known set rather
than searching one: `units/sweep-styles-authored.log.txt` and `units/sweep-styles-source-2.log.txt`
agree that the whole open space was two pairs.

## Round 1 (2026-09-21)

Lanes, launched together and blind: analyst on Astra holding the SUBJECTIVE lane
(`units/cl5b-audit-analyst-report.md`, thread `01a0c504-ea75-72f2-b06c-52443f2d692c`, exit 0;
Astra wrote the unit, so the lanes swap back and the writer's engine never holds the objective
lane); reviewer on Opus 5 holding the OBJECTIVE lane (`units/lane-cl5b-reviewer.md`, workflow
`wf_8934ad13-303`); checker on Sonnet (`units/lane-cl5b-checker.md`); verifier on Sonnet
(`units/lane-cl5b-verifier.md`) over `units/cl5b-gate-brief.md`.

| Claim | Reviewer (objective, Opus) | Analyst (subjective, Astra) | Checker | Verifier and probe |
| --- | --- | --- | --- | --- |
| 1 the two blocks are mixins | CONFIRMED (each consumer keeps its selector, layer, and distinct declarations; every top-level construct in the mixins file is a use, a mixin, or a function) | CONFIRMED (both names sit in the file's established vocabulary) | CONFIRMED | — |
| 2 the cascade is unchanged | CONFIRMED on the cascade by construction and by reading the built stylesheet; the digest reading report-only | CONFIRMED (the comparison returned identical, and its changed-byte control returned different) | — | `test:src:styles` exit 0 on both engines |
| 3 the sweep ships as a covered function | CONFIRMED (traced every existing export intact; only two import lines widened; the Node-only placement holds against the project configuration) | CONFIRMED (the signature and result shape follow the module's own vocabulary) | CONFIRMED | — |
| 4 the population is wider and honest | CONFIRMED on the numbers, with a correction to the claim's framing | CONFIRMED (widening cannot remove a comparison; ran the sweep live and got nothing shared) | CONFIRMED | — |
| 5 the cases and the tree-is-clean case | CONFIRMED (traced each case against the implementation and found each falsifiable) | CONFIRMED (the cases make the authored-text contract visible) | — | — |
| 6 the tree-is-clean case fails on a plant | UNDECIDABLE, report-only; no residue found | UNDECIDABLE, report-only; no residue found | — | the Orchestrator's probe reddens exactly that case and restores green |
| 7 the fixture has one home | CONFIRMED | CONFIRMED | CONFIRMED | — |
| 8 no dependency was added | CONFIRMED (the undeclared library appears only as a lockfile entry; no authored file imports it) | CONFIRMED | CONFIRMED | — |
| 9 scope, law, gates | CONFIRMED on scope and law; gate sentence report-only | UNDECIDABLE as a complete gate claim | CONFIRMED | every step exit 0, both Edge runs green, status identical before and after |

Reconciliation. Every claim's substance is confirmed by every lane that could rule on it, and the
two open halves are closed here: the verifier ran the whole chain over this tree with the status
identical before and after, and the Orchestrator took the plant reading directly after every lane
exited, so no gate chain met a planted tree. The plant reddened exactly the tree-is-clean case
and nothing else, and both planted partials returned to their recorded hashes.

**The Orchestrator's own defect, the fifth of this campaign.** Claim 4 framed the population as
wider than the brief required. It was not: brief 1's third Unknown offered both populations and
told the unit to settle it, so this is a settled Unknown rather than an overrun. The objective
lane caught it against the brief the Orchestrator wrote. The rule this adds to the four already
recorded: read a unit's own brief before writing a claim about whether the unit exceeded it.

**Findings that force a fix round, all in one function.** Every lane accepted, and the round goes
back anyway, because this unit ships a gate that will judge every remaining styles unit and four
findings narrow it. A gate that silently misses a class of duplication is worse than one that
fires, and none of these findings had another carrier.

- **Objective 10.** A declaration whose property name is interpolated never enters a block, so
  the role-each mixin's whole body is recorded as empty and dropped. A future unit duplicating an
  interpolated-property block across two partials would see nothing reported.
- **Objective 12.** Whitespace inside an interpolation is appended raw while whitespace outside
  one is folded, so two spellings of the same interpolation compare unequal, and nothing in this
  repository's gate chain normalizes SCSS spacing.
- **Objective 13.** The parenthesis counter has no floor, so one unmatched closing parenthesis
  would silently disable block detection for the rest of that file. No valid-SCSS trigger was
  found, which makes this cheap insurance rather than a repair.
- **Objective 15.** The reported paths carry platform-native separators, so a diagnostic and the
  reported file list differ by host.

**Findings recorded as correct, not carried.**

- **Objective 11.** The two-declaration threshold hides a single-declaration repeat that exists in
  the tree now: the per-level size loops in the heading and type partials are byte-identical and
  contribute one declaration each. Brief 1 retained those loops deliberately and both
  pre-dispatch instruments used the same threshold, so it stays.
- **Objective 14.** Same-file duplication is outside the sweep by construction and a case pins
  that as expected, which is faithful to a rule naming a pattern that appears in two partials.

### Terminal (round 1)

Verdict: fix round. `units/cl5b-brief-3.md` on Astra, the writer, carrying the four findings that
narrow the gate. Round 2 runs all four lanes with the same assignment.

## Round 2 (2026-09-21) — the fix round under `units/cl5b-brief-3.md`

Subject: the whole CL5b change after the fix round, over the same base `ea82419`. Claims:
`cl5b-audit-claims-2.md`, carrying no guide-row claim. Evidence: `units/cl5b-diff-2.patch.txt`,
`units/cl5b-status-2.txt`, round 1's `units/cl5b-diff.patch.txt` for a diff-to-diff reading.
Report: `units/cl5b-report-2.md`.

Lanes, launched together and blind: analyst on Astra holding the SUBJECTIVE lane
(`units/cl5b-audit-2-analyst-report.md`, thread `01a0c519-0ef1-7bc2-9fe3-279ff430a10a`, exit 0);
reviewer on Opus 5 holding the OBJECTIVE lane (`units/lane-cl5b-2-reviewer.md`, workflow
`wf_ad77eb91-98a`); checker on Sonnet (`units/lane-cl5b-2-checker.md`); verifier on Sonnet
(`units/lane-cl5b-2-verifier.md`) over `units/cl5b-gate-2-brief.md`.

| Claim | Reviewer (objective, Opus) | Analyst (subjective, Astra) | Checker | Verifier |
| --- | --- | --- | --- | --- |
| 1 interpolated property names enter their block | CONFIRMED (traced the widened pattern against the live tree; the previously invisible bodies now yield their declarations, and the case failed before the change) | REFUTED, forces a round (a property name wrapped in a quoted nested interpolation still escapes, demonstrated by executing the reading loop) | — | — |
| 2 proved against the tree, no residue | CONFIRMED (read the retained red and green logs and swept the tree for either round's plant markers independently) | UNDECIDABLE, execution report-only; no residue found | — | — |
| 3 interpolation whitespace folds, quoted whitespace survives | CONFIRMED (the carve-out is airtight by tokenization rather than by a later guard, so a string holding a brace or an interpolation is inert) | CONFIRMED | — | — |
| 4 the parenthesis counter cannot go negative | CONFIRMED (clamping can only admit blocks, never suppress them) | CONFIRMED | — | — |
| 5 forward slashes on every host | CONFIRMED (normalized at discovery and carried into every block record, so the list and the diagnostics share one spelling) | CONFIRMED | — | — |
| 6 three findings red before, green after | CONFIRMED (traced each against round 1's pattern and raw-append branch; each must fail there) | UNDECIDABLE, execution report-only | — | — |
| 7 nothing round 1 settled moved | CONFIRMED (checked every newly visible declaration for a cross-file collision; the remaining blobs are byte-identical between the rounds) | CONFIRMED | — | — |
| 8 scope, law, gates | CONFIRMED on scope, law, and the unit's own readings | UNDECIDABLE as a complete gate claim | CONFIRMED on scope and law; gate half outside the slice | every step exit 0, both status readings identical |

Reconciliation.

**The lanes split on claim 1, and both are right about different inputs.** The objective lane
confirmed it against flat interpolation, which is what the tree contains and what round 1's
finding was about. The subjective lane refuted it against a property name wrapped in a quoted
nested interpolation, and demonstrated the escape by executing the reading loop rather than by
reading the pattern. Both readings hold; the pattern's interpolation group stops at the first
closing brace, which is correct for the flat form and wrong for the nested one.

**Ruled: accept, and carry the escape as a bound.** Round 2 was worth sending because its blind
spot covered a construct the tree uses pervasively, in the role-each mixin and the aliased loop.
The remaining escapes cover constructs the tree does not contain: a search for a quoted nested
interpolation under `src/styles/` returns nothing. The argument for closing them now was that
CL8's gutter utilities might need nested interpolation, and checking that argument weakened it,
because gutter classes interpolate a selector rather than a property name. Sending a third round
for constructs nothing uses would apply round 2's rule where its evidence no longer supports it.
The objective lane recommends the same disposition for its own findings.

**The Orchestrator's own defect, the sixth.** Brief 3's acceptance criterion 2 reads that two
spellings of one interpolation differing only in internal whitespace compare equal. The objective
lane's finding 9 shows that is met for the pinned run-length pair and not in general, because
nothing trims at the interpolation's boundaries while everything outside one is trimmed. The
criterion was written wider than the fix it asked for. The rule already recorded in
`handoff.md` § Standing rulings covers it: a criterion asserting something in general is a claim,
and it gets the same treatment as one.

### The single bound carried out of CL5b

To the next unit that touches the sweep, as one item rather than four:

1. A property name inside a quoted nested interpolation escapes the reader, because the
   interpolation group ends at the first closing brace instead of respecting the quoted-token
   boundary the tokenizer already recognizes (subjective 1).
2. Whitespace at an interpolation's boundary separates two spellings, because nothing trims after
   the opening brace or before the closing one (objective 9).
3. Normalizing separators rewrites a path whose filename legitimately holds a backslash, which
   cannot occur on this host and fails loudly rather than silently elsewhere (objective 10).
4. The interpolation counter has no ceiling guard matching the parenthesis floor, so an unclosed
   interpolation would suppress a whole file's blocks; unreachable in compiling source, and it is
   round-1 code the fix round did not touch (objective 11).

Every one is a false negative in a construct the tree does not contain. None makes the gate report
duplication that does not exist.

### Terminal (round 2)

Verdict: accept. CL5b lands at the round-2 tree.
