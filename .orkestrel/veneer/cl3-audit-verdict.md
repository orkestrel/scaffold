# CL3 audit verdict — the reset partial and the text Reboot tags

Subject: unit CL3 in Veneer over the base `9f5ffda`, written by `sol` on Astra under the
effective brief `units/cl3-brief-3.md` (a delta over `units/cl3-brief-2.md`; brief 1
superseded after the scope read, `units/cl3-scope-read-report.md`; `units/cl3-report.md` the
deviation stop brief 3 ruled). Report: `units/cl3-report-2.md`. Claims: `cl3-audit-claims.md`.
Evidence: `units/cl3-diff.patch.txt`, `units/cl3-status.txt`. The Orchestrator's rulings on the
three calibration limits the report names are in `plan.md` (the link colours to CL6; the muted
text and raised surface to the added unit CL3b).

## Round 1 (2026-09-21)

Lanes: analyst on Astra holding the SUBJECTIVE lane (`units/cl3-audit-analyst-report.md`, thread
`01a0c3b5-3583-7b80-807a-b2b71c1a6606`, exit 0; Astra wrote the unit, so the lanes are swapped);
reviewer on Opus 5 holding the OBJECTIVE lane (`units/lane-cl3-reviewer.md`, workflow
`wf_f704f705-60e`). **Checker: not run. Verifier: not run.** Both were dispatched in the same
workflow and both returned no verdict: a user message typed into the session while the workflow
ran was relayed into its subagents as a superseding instruction, and each lane answered that
message instead of its brief (`units/lane-cl3-checker.md`, `units/lane-cl3-verifier.md`, retained
as the record of the deviation). The reviewer's lane, launched in the same workflow, completed
its brief before the relay reached it. Round 2 runs all four lanes; the gate half of claim 9 and
the mechanical probes are ruled there.

| Claim | Analyst (subjective, Astra) | Reviewer (objective, Opus) |
| --- | --- | --- |
| 1 reset partial | CONFIRMED | CONFIRMED (built layer order read from `dist/`; cascade semantics of the important reset declaration confirmed) |
| 2 one bare tag per partial | CONFIRMED | CONFIRMED with a wording correction: `_abbr.scss` selects `abbr[title]` alone, Bootstrap's own Reboot selector; no bare `abbr` rule exists |
| 3 values through the ramps | CONFIRMED | REFUTED on one conjunct: `_var.scss` hard-codes the record's shorter mono stack, which the mono token cannot express; every value is right (record rows cited) |
| 4 code family tokens | CONFIRMED | CONFIRMED (registry equality holds by mechanism; readings equal record rows 2309 and 2310) |
| 5 anchor and body | CONFIRMED | CONFIRMED |
| 6 limits recorded | CONFIRMED | CONFIRMED (each proof asserts the implemented value, none the record's; the only literal is a font stack) |
| 7 `ContentSection` | CONFIRMED (its specimen's destination defect is analyst 10) | CONFIRMED (the removal-order proof cannot pass vacuously) |
| 8 guide rows | CONFIRMED | CONFIRMED |
| 9 scope, law, gates | UNDECIDABLE on the `scaffold audit` reading (verifier) | CONFIRMED on scope and law; gates report-only (verifier) |

Reconciliation. Every claim is CONFIRMED by both engines on its substance; the reviewer's
refutation of claim 3 is on the claims file's wording (the `ui-monospace` prefix does not
describe `_var.scss`), recorded against the claim, and its correction on claim 2 likewise. The
gate half of claim 9 waits for the verifier in round 2.

Findings:

- **Analyst 10 (forces the round).** `app/browser/constants.ts:250` renders a specimen
  `<a href="#main">Return to content</a>` while `Showcase.ts:30` creates `main` with no id, so
  the fragment resolves to nothing. Fix: give the shell's `main` the id and prove the fragment
  resolves to that region.
- **Analyst 11 (forces the round, rule compliance).** `_code.scss` and `_samp.scss` each declare
  the identical font family, size, padding, and text colour; `.claude/rules/styles.md` moves a
  pattern shared by two partials into `_mixins.scss`. Fix: one mixin for the shared code-family
  text treatment, each tag keeping its partial and its own surface and extras.
- **Analyst 12 (forces the round, rule compliance).** The mirrored proofs author their theme
  matrices and expected-value tables inline (`code.test.ts:12`, `samp.test.ts:12`, and the
  siblings); `.claude/rules/tests.md` puts data tables and case matrices in a setup file. Fix:
  the case tables in `tests/setupStyles.ts` (host-independent), exported and listed in its
  inventory, the proofs importing them; the grant is named in the fix brief.
- **Reviewer 10 (forces the round).** `tests/src/styles/tokens.test.ts:463-468` keeps a
  `console.log('CL3 code tokens', …)` the unit used to harvest the Edge readings; it proves
  nothing and carries a control identifier into the tree. Fix: delete it.
- **Reviewer 13 (carried into the round, cheap).** `reset.test.ts` plants no unlayered
  `!important` rule against `[hidden]`; add the plant and record the reading.
- **Reviewer 11 (carried to CL3b).** `_var.scss`'s literal mono stack needs a token the mono
  token cannot express (`--vn-font-mono-short` or equivalent); `_pre.scss`'s `line-height: 1.6`
  is the same shape at lower cost. CL3b owns the token files.
- **Reviewer 12 (carried to CL6).** `_a.scss` reads the `--vn-link-*` tokens while `_body.scss`
  and `_heading.scss` read the `--bs-*` aliases, so a consumer's `--bs-link-*` override does not
  reach Veneer's anchors; the binding is what brief 2 prescribed and CL6 owns the link map.
- **Claims wording (no code).** Claim 2's "each selects one bare tag" admits `abbr[title]`;
  claim 3's `ui-monospace` clause excludes `var`.

### Findings carried into the fix round (`units/cl3-brief-4.md`)

1. Analyst 10: the `main` id and the fragment proof.
2. Analyst 11: the shared code-family text mixin.
3. Analyst 12: the case tables in `tests/setupStyles.ts`.
4. Reviewer 10: the `console.log` removed.
5. Reviewer 13: the unlayered important plant in the reset proof.

### Terminal (round 1)

Verdict: fix round. `units/cl3-brief-4.md` on Astra (the writer); the Opus reviewer stays the
objective auditor; round 2 runs the analyst, the reviewer, the checker, and the verifier.

## Round 2 (2026-09-21, the fix round under `units/cl3-brief-4.md`)

Lanes, launched together and blind: analyst on Astra holding the SUBJECTIVE lane
(`units/cl3-audit-2-analyst-report.md`, thread `01a0c3cf-a250-7f60-99f0-8d71be7dc3e3`, exit 0);
reviewer on Opus 5 holding the OBJECTIVE lane (`units/lane-cl3-2-reviewer.md`, workflow
`wf_78ef993b-448`); checker on Sonnet (`units/lane-cl3-2-checker.md`); verifier on Sonnet
(`units/lane-cl3-2-verifier.md`) over `units/cl3-gate-brief.md`, the first verifier run for this
unit. Claims: `cl3-audit-claims-2.md`; evidence `units/cl3-diff-2.patch.txt` and
`units/cl3-status-2.txt` over the base `9f5ffda`; fix report `units/cl3-report-3.md`.

| Claim | Analyst (subjective, Astra) | Reviewer (objective, Opus) | Checker | Verifier |
| --- | --- | --- | --- | --- |
| 1 `main` id and fragment proof | CONFIRMED | CONFIRMED (the host is attached, so the document lookup is real; the specimen blob unchanged) | — | — |
| 2 one `code-text` mixin | CONFIRMED (read-only Sass compile: values unchanged, `pre` order only; the mixin alone emits nothing) | CONFIRMED (declaration equivalence against round 1's inline blocks) | — | — |
| 3 case tables in the setup module | CONFIRMED | CONFIRMED (inventory closed by `.sort()`; no matrix or table remains in the proofs; moved expectations unchanged) | — | — |
| 4 no `console` call | CONFIRMED | CONFIRMED | — | — |
| 5 unlayered important plant | CONFIRMED | CONFIRMED (the reading is forced by the declared layer order) | — | — |
| 6 scope, law, gates | UNDECIDABLE on the gate half | UNDECIDABLE on the gate half; scope, law, residue, and registry agreement CONFIRMED (blob hashes across rounds) | CONFIRMED on scope, the round-1 identity of the untracked set, the law sweep, the partials, the values, the section, and the guide; gate half UNRESOLVED | every step exit 0 on managed Chromium and Edge, `npm test` exit 0, status identical before and after, `scaffold audit` reports only the pre-existing `setupListeners` note and the three registry majors |

Reconciliation. Every carried finding is closed on every lane, and the verifier closes the gate
half both engines left open. Findings outside the claims:

- **Analyst 7 (forces round 3).** `_sub.scss` and `_sup.scss` repeat `position`, `font-size`,
  `line-height`, and `vertical-align`; the styles rule moves a pattern shared by two partials
  into `_mixins.scss`. Same class as round 1's analyst 11, ruled the same way.
- **Reviewer 7 (carried into round 3, cheap).** `_body.scss` re-declares `text-size-adjust`,
  which `_html.scss` already sets and which inherits; the built cascade carries it twice and no
  proof reads it. Fix: drop the body declaration.
- **Reviewer 8 (carried to CL3b).** `--vn-surface-code` is a literal in the emitter while every
  sibling surface reads the theme maps; CL3b adds a `surface-code` key to `$light` and `$dark`
  and the emitter reads it. CL3b owns the token files.
- **Reviewer 9 (carried to CL5).** The record reads `letter-spacing: -0.36px` on `h1` and the
  heading partial binds none; the type-scale owner rules the row in or out and pins the
  reading.
- **Reviewer 10 (carried to CL5).** The shell writes a document-global `main` id from a
  constructor that takes a host, so two live shells would duplicate it; the next owner of
  `Showcase.ts` (CL5 adds its sections) gives the id to the entry or resolves the region by
  reference.
- **Reviewer 11.** The verifier gap it names is closed by this round's verifier lane.

### Findings carried into round 3 (`units/cl3-brief-5.md`)

1. Analyst 7: the shared script-text block of `_sub.scss` and `_sup.scss` into one mixin.
2. Reviewer 7: the duplicate `text-size-adjust` dropped from `_body.scss`.

### Terminal (round 2)

Verdict: fix round. `units/cl3-brief-5.md` on Astra (the writer); the Opus reviewer stays the
objective auditor; round 3 runs all four lanes.

## Round 3 (2026-09-21, the fix round under `units/cl3-brief-5.md`)

Lanes, launched together and blind: analyst on Astra holding the SUBJECTIVE lane
(`units/cl3-audit-3-analyst-report.md`, thread `01a0c3f0-c0a9-78a2-8816-39374850bcb8`, exit 0);
reviewer on Opus 5 holding the OBJECTIVE lane (`units/lane-cl3-3-reviewer.md`, workflow
`wf_a5aba98c-1ba`); checker on Sonnet (`units/lane-cl3-3-checker.md`); verifier on Sonnet
(`units/lane-cl3-3-verifier.md`) over `units/cl3-gate-brief.md`. Claims:
`cl3-audit-claims-3.md`; evidence `units/cl3-diff-3.patch.txt` and `units/cl3-status-3.txt` over
the base `9f5ffda`; report `units/cl3-report-4.md`.

| Claim | Analyst (subjective, Astra) | Reviewer (objective, Opus) | Checker | Verifier |
| --- | --- | --- | --- | --- |
| 1 `script-text` mixin | CONFIRMED (in-memory compile: identical CSS before and after) | CONFIRMED (the built cascade declares each property once; the proofs' blobs unchanged) | — | — |
| 2 `text-size-adjust` deduplicated | CONFIRMED (each spelling once, under `html`, none under `body`) | CONFIRMED (the report's correction of the brief's line-count grep is honest: the built file is minified onto one line) | — | — |
| 3 the sweep | CONFIRMED (its own read-only sweep returns empty; run against round 2's partials it detects the three duplications) | CONFIRMED (the instrument's population is every partial, its pairing every distinct unordered pair, its threshold two declarations; an independent read of the remaining partials finds no pair above it) | — | — |
| 4 no reading moved, no proof touched | CONFIRMED (capture equality; a changed-value control fails the comparison) | CONFIRMED in substance, with a wording correction: `tests/**` files appear in the rendered patch because it renders the whole CL3 change, so the claim holds of the round-3 delta, where every test blob is identical | — | — |
| 5 scope, law, gates | UNDECIDABLE on the gate half, asking for a round-3 verifier receipt | CONFIRMED on scope and law (eight blobs differ, every one in brief 5's owned set); gate half UNDECIDABLE | CONFIRMED | every step exit 0 on managed Chromium and Edge, `npm test` and the journeys exit 0, status identical before and after, `scaffold audit` reports only the pre-existing `setupListeners` note and the three registry majors |

Reconciliation. Every implementation claim is CONFIRMED on every lane that could rule on it. The
analyst's terminal line names claim 5, and its own text states the reason is an
acceptance-evidence gap that "supplies no implementation repair" and that "a round-3 verifier
receipt would settle this claim"; the reviewer's finding 7 says the same. That receipt is
`units/lane-cl3-3-verifier.md`, produced by the verifier lane of this round, which the analyst
could not see because the lanes run blind. The condition both lanes set is met, so the round
accepts. The reviewer's correction to claim 4 is recorded against the claim.

Findings outside the claims:

- **Reviewer 6 (carried to CL3b).** The shipped corner radii have no proof: `code-surface`'s
  `border-radius: var(--vn-radius-small)` (included by `_code.scss` and `_kbd.scss`) and
  `_pre.scss`'s `border-radius: var(--vn-radius-base)` are read by no case table, so deleting
  either leaves the suite green while those surfaces render square. The gap predates round 3;
  the extraction consolidated it rather than introducing it. CL3b already owns `_pre.scss` and
  the token rows, and takes this with a grant for the three case tables in
  `tests/setupStyles.ts`, adding the radius row the button proof's reading models.
- **Reviewer's recorded sweep limit (no action).** The instrument's source-map filter cannot see
  a pair where one partial includes a mixin and another repeats its declarations literally; the
  only live candidate, `_var.scss`, shares one declaration with `code-text`'s output and stays
  below the threshold.
- **Analyst and reviewer 7.** The gate gap they name is closed by this round's verifier.

### Terminal (round 3)

Verdict: accept. Land with `units/cl3-land.sh`.
