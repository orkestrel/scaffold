# B-FORMS-RENAME (D40a) — `reviewer` on Opus 5.5, subjective lane

Native subagent, clean context, read on the tree of `/home/user/veneer-bfr` on 2026-09-23. The verdict text is the lane's handback verbatim.

Lane: I held the subjective lane (`reviewer` on Opus 5.5). I ruled claims 2 and 5 UNRESOLVED. Each rests on a run that only the objective lane can take, and the writer's report is its only evidence.

## Numbered verdicts

1. **CONFIRMED.** The delta is the brief.
   - The diff at `/home/user/scaffold/.orkestrel/veneer/units/bfr.diff` has these hunks:
     - the two mixin headers with their comments (`_mixins.scss:46-62`);
     - the six include lines (`_form-control.scss:30,34`, `_form-select.scss:35,42`, `_input-group.scss:56,60`);
     - the `INPUT_GROUP_CASES` `reads` paragraph (`tests/setupStyles.ts:4210-4215`).
   - Status (`bfr-status.txt`) lists exactly the five owned files.
   - Attack that failed: I searched for `control-type|control-border|controlType|controlBorder` over `/home/user/veneer-bfr`, excluding `node_modules`. The only hits are `ROADMAP.md:280` and `ROADMAP.md:387`. Line 280 is the B-FORMS-MIXIN history row. Line 387 is the D40a carrier row, which closes at the fold. Both are shared files the Orchestrator owns.
   - A second search, `(?i)mixin` over `tests`, `guides`, and `app`, found no sentence that describes either mixin under another name. The claims file's unknown is closed: nothing outside the brief's grep names either old mixin.

2. **UNRESOLVED.** The byte-identical compile rests only on the writer's `cmp` exit 0 in `b-forms-rename-report.md`.
   - Source reading agrees with the claim. The diff changes only mixin and include identifiers and `//` comments, which Sass does not emit. The declarations at `_mixins.scss:50-53` and `60-61` are unchanged.
   - The threshold requires an independent compile. The objective lane's two `npx --no-install sass` compiles and their comparison settle this claim.

3. **BROKEN.** The names hold. The comments do not follow `writing.md`, and the prose undoes the separation D40a exists to make.
   - What holds:
     - `input-text` takes the file's `-text` typography form (`heading-text:15`, `mark-text:27`, `caption-text:70`, `code-text:80`, `script-text:87`).
     - `input-border` takes the file's `{subject}-{property}` form (`image-size`, `cell-space`, `code-surface`).
     - Both names sit apart from `control-text:33`.
     - Each comment names all three readers.
   - Failing state, `_mixins.scss:46-48` and `56-58`:
     - **Overclaim.** "every form input shares" is false. The `input` element takes `control-text` (`src/styles/elements/_input.scss:4-5`), not `input-text`. `.form-check-input` and `.form-range` are form inputs that include neither mixin: the only includes are the six listed under claim 1. D40a renamed the mixins so that `input-` stays apart from the reboot reset. The comment's "every form input" merges the two again in prose, and `writing.md` § Claims and time requires a claim the reader can check.
     - **Second term.** "Emits the type run" keeps the word `type`, the second term D40a removed from the name. D40a calls this "a typography run". This breaks one concept, one term.
     - **Counts.** "the same four declarations" and "the same two declarations" count a set anyone can add to. That breaks `AGENTS.md` § Writing "NEVER state a count".
     - **Bare tokens.** `` `.form-control`, `.form-select`, and `.input-group-text` read… `` puts class names in backticks with no following noun. That breaks `writing.md` § Code tokens. The CONTROL round-3 ruling (`ROADMAP.md:386`) also says a class name takes a noun.
   - Why it matters: the comments are the only prose that says what the renamed mixins are for. As written, they describe the concept D40a separated from these mixins.
   - Right looks like this, for a builder fix round that owns only those comment lines. Sass does not emit `//` comments, so the compile stays byte-identical. Every line stays within 100 columns.
     ```scss
     // Emits the typography run the release derives from its `$input-*` variables, so the
     // `.form-control`, `.form-select`, and `.input-group-text` rules read the same declarations here.
     @mixin input-text {
     ```
     ```scss
     // Emits the border run the release derives from its `$input-*` variables, so the
     // `.form-control`, `.form-select`, and `.input-group-text` rules read the same declarations here.
     @mixin input-border {
     ```
   - The writer applied the brief's text verbatim (`b-forms-rename-brief.md` § Edits, the `_mixins.scss` edit). The defect is in the dictated wording, not in how the writer carried it out.

4. **CONFIRMED.** One voice.
   - Attack that failed: I compared `tests/setupStyles.ts:4212-4215` with `4857-4860` word for word, ignoring line wrap. The empty-map sentence and the moved-token sentence are identical.
   - The input-group opening sentence keeps its own clause, "across every rule the selector heads: a sized select heads its size rule and the rule that restores its indicator room…".
   - Only `InputGroupCase:4195` and `FormControlCase:4829` key `reads` by property. The other `reads` remarks describe list-shaped tables (`FORM_RANGE_CASES:3606`, `FORM_FLOATING_CASES:4418`), so no third per-property remark needs this voice.
   - Adjacent reading that looks like a defect and is correct:
     - In `FORM_CONTROL_CASES`, "the value assertions" points to the `values` paragraph just before it.
     - `InputGroupCase` has no `values` field, so in `INPUT_GROUP_CASES` the phrase has no antecedent inside the remark.
     - The sentence is still true: the input-group literals are asserted by the ledger value case (`tests/conformance.test.ts:191`, which covers the `input-group` key) and by the browser proofs (`tests/src/styles/components/input-group.test.ts`).
     - The only cost is a less self-contained reading. I record it as an observation, not a finding.

5. **UNRESOLVED.** Law and scope.
   - What holds on reading: the diff's only TypeScript change is a TSDoc paragraph. It contains no `any`, no `as`, no `!`, no suppression, and no nested function. Status shows no off-limits file touched.
   - The `npm run check` exit code rests only on the writer's report. The objective lane's run settles it.

## Findings outside the claims

None.

## Attacked and held

- **The `input-border` name against the file's reset family.** `border-reset:40` is the element reset, and `input-border` names a component run. The two neither collide nor share a term.
- **Carrier coverage.** The D40a carrier requires "every test or guide sentence naming either mixin". A search of the `guides` directory and the test comments found no such sentence. The `tests/src/styles/fixtures/mixins.scss` fixture lists no form mixin, and that is true at `53628aa` as well. This rename does not own it.

## Referrals

- **To the objective lane, claim 2.** Compile `src/styles/index.scss` independently, once with the old mixin names restored in memory and once from the worktree, and compare the bytes.
- **To the objective lane, claim 5.** Report the `npm run check` exit code from your own run.
- **To the Orchestrator, dispatch record.** The claims file's "Already established" section cites `bfo-4-audit-verdict.md` claim 2 and `bfo-3-audit-verdict.md` claim 3. Neither file exists: `*bfo*` under `/home/user` matches only the `unit/bfo` and `unit/bfo5` git refs. A lane cannot check the scope of the established `reads` wording ruling, for example whether it covered the input-group antecedent in claim 4. Restore the retained paths or rewrite the citations before this round is accepted.

VERDICT: FAIL 2, 3, 5; outside the claims: none
