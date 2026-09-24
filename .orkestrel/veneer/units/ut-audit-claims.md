# Audit claims — UTIL-TEXT (`ut`), round 1

Subject: `ut.diff` and `ut-status.txt` (the worktree `/home/user/veneer-ut` against `2a3f223`, captured
by the Orchestrator read-only at retention: the moved files' deletions as `git diff 2a3f223`, each
untracked owned file as `git diff --no-index /dev/null <path>`), the shared-file patch `ut-shared.patch`
(one unified diff against `2a3f223`), the unit's report `b-utilities-ut-report.md`, and its retained
instruments and logs under `ut-instruments/` (`ut-mutate.py`, `ut-mutate-2.py`, and
`ut-mutations.log.txt`, `ut-copy-gates.sh` and the `ut-copy-*.log.txt` logs, `ut-cascade-count.mjs`
and its log, the shared-name probe and its log, the `ut-final-service-*.log.txt` readings, and the guide
writers), against the effective brief `b-utilities-ut-brief.md`, the family record
`b-utilities-family.md`, the design verdict
`/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`, the wave-3 terrain
`b-utilities-w3-terrain-report.md`, the first terrain `b-utilities-terrain-report.md`, and the
mid-campaign notes `w2-w3-note-1.md` to `w2-w3-note-5.md`. The unit was written by `opus` on Opus 5.5.
Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence, and before
confirming a claim about a proof names the mutation that would make the proof fail and whether its
assertions distinguish that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the brief's
rulings (the base `2a3f223`, R5 on the link key's layer, R8 on the recorded pair foregrounds, the
family's barrel and section orders); notes 3 and 5 route the Tailwind preflight profiles case to
UTIL-PAINT's revised profiles patch, so the unit returns no `profiles.test.ts` patch; the
Orchestrator's apply check settles the `git apply --check` clause; `ROADMAP.md` is the Orchestrator's
fold; the scratchpad writes and the undone index change the report records are recorded, not ruled.

1. **Scope and delta.** `ut-status.txt` lists only the brief's Owned paths, the two moved files
   appearing as a deletion at the `components/` path and an untracked file at the `utilities/` path;
   `ut.diff` carries those files and no other; `ut-shared.patch` touches only files the brief lists as
   Shared and applies with `git apply --check` to a fresh extract of `2a3f223`; its `BADGE_COPY`
   sentence and the guide's Badge paragraph are edits this landing would otherwise make false; neither
   adds a line to a vendored file, `tests/fixtures/oracle/**`, `src/browser/**`, `src/core/**`,
   `src/styles/_mixins.scss`, `src/styles/_tokens.scss`, `_button.scss`, `package.json`, `README.md`, or
   a sibling unit's file.
2. **The cascade against the oracle.** The built cascade carries exactly the selectors the inventory
   records under the `text`, `text-truncate`, and `link` keys: the alignment entries at every infix, the
   static entries, the colour, opacity, emphasis, and pair entries, and the link helper and entries,
   in the utilities layer with `!important` on every property declaration and on no custom property,
   except the `.text-truncate` helper, which sits in the components layer with normal declarations; the
   opacity entries sit at the empty infix alone; the link helper sits at the head of the utilities layer
   in `_link.scss` and the link utility entries follow the text colours in `_color.scss`, in the
   release's map order; the ledger's `tokenized` rows are exactly the departures the gate measures and
   no `### Additions` row is owed.
3. **The link placement.** Writing the link utility entries in `_link.scss` at the head of the
   utilities layer inverts the release's resolution of `.text-decoration-underline.link-underline-danger`
   (the retained mutation reddens the case that reads it), so their place in `_color.scss` is the
   release's map order rather than a departure; moving `_link.scss` into the utilities layer lets
   `.link-primary.text-danger` resolve the danger colour, and leaving it in `components` reddens that
   case and the conformance order case.
4. **The literal colours.** The pairs' `#fff` and `#000` foregrounds and the `.text-black-50` and
   `.text-white-50` colours read the `--vn-palette-*` tokens, resolve to the release's bytes, and are
   recorded as `tokenized` rows, because `.claude/rules/styles.md` refuses a literal colour outside
   `_tokens.scss`; each pair's foreground is the release's recorded value per role (R8), which one
   `foreground($role)` function shared with `_button.scss` cannot reproduce, so `_button.scss` is
   untouched.
5. **The proofs distinguish their mutations.** Each mutation the report names has a retained entry in
   `ut-mutations.log.txt` recording its site, command, exits, summary, and failing cases, and the named
   case's assertions distinguish it from the passing case: priority dropped in the mixin, the breakpoint
   loop run per value, the role colour written as a literal triplet, the opacity entry ahead of the
   colour entry, the tier written as the light-mode mix, the pair foreground and background swapped and
   the opacity fallback dropped, the pairs in the components layer, `white-space` dropped from the
   truncation helper, `_link.scss` left in components, the underline entry in `_link.scss`, the
   partials outside every layer, and the section specimen mutations. The report's cases with no
   recorded mutation (the `.link-opacity-*` values, `.text-truncate.text-wrap`, the value order inside
   one entry) are named as such. A lane names, per mutation, whether the assertion distinguishes it.
6. **Tailwind shared names.** The shared-name table is true against the installed compiler: the
   `text-center`, `text-end`, `text-start`, `text-black`, and `text-white` names stay off the exclusion
   line because Veneer writes `!important` on every longhand Tailwind declares for them; the
   `text-wrap` and `text-nowrap` names go on the line because Tailwind declares the `text-wrap-style`
   longhand Veneer does not cover; the line, its copies, and `markup.html` carry exactly that change;
   each negative control reads red; the `text-black` and `text-white` names move the preflight profiles
   case's variable list for the reason the report gives (`ut-final-service-*.log.txt`).
7. **Sections, specimens, and registries.** The Text and Color regions extend `SpecimenSection` over
   their constants with the brief's specimen names; no specimen writes an inline style or an unshipped
   class; the section proofs' populations derive from the specimens or a setup table (note 1); the
   sections construct after `VisibilitySection` and before `NavbarSection` with matching `index.ts`,
   `Showcase.test.ts`, and `index.test.ts` rows; the `CASCADE_KEYS` rows read a property the rule sets on
   a box a computed style can read; the `listed` literal, the order case's entry paths, and the
   dash-proof component set agree with the barrel; the `TEXT_*` tables sit in `tests/setupStyles.ts`,
   are frozen and exported, and are bound to the inventory's `text` key by derivation.
8. **The guide.** `guides/veneer.md` gains `### Text utilities` (with the note-4 sentence pointing to
   § Font utilities) and `### Color utilities`, the § Files rows with the `components/_link.scss` row
   replaced, the § Compatibility rows, the `#### text` table, the § Tests links, and the Tailwind
   paragraph on the text names; every sentence the patch adds is true of what ships, names the rule that
   applies each value (note 1), and follows every code token with a noun.
9. **Law and report.** The owned files and the patch add no `any`, no `as` beyond a const assertion, no
   `!`, no suppression, no mock, spy, or fake, and no nested function beyond a callback passed
   directly; no new helper duplicates an installed `@orkestrel/test` or `@orkestrel/contract` export;
   added comments, TSDoc, guide text, and the report follow the writing rule; the report records each
   gate's command with its result line; a lane lists every count the report states as a finding outside
   the claims for the record.
