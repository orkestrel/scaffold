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
