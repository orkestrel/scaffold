# Unit U3 — successor brief 7: the round-3 audit fixes

## What changed and why

This brief supersedes `u3-brief-6.md` for the remainder of the unit; briefs 4 to 6
stand except where this brief says otherwise, and `u3-report-4.md` is the baseline. The
third audit round (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-verdict-3.md`,
lane reports beside it under `units/u3-audit-3-*`) confirmed every item of brief 6 and refuted
three claims on the sites below; the subjective lane accepted with bounds this brief also carries.

## Role and engine

Unchanged: `opus` on native Opus 5. Perform the assignment directly and spawn nothing. Sole
writer in `C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing; no `scaffold
repair`; no tree-wide `format` or lint `--fix`; no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Law from `C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`,
`.claude/rules/tests.md`, `styles.md`, `names.md`, `typescript.md`, `writing.md`,
`documentation.md`.

## Scope

**Owned.** Everything briefs 4 to 6 own, plus `tests/setupConformance.ts` and
`tests/setupConformance.test.ts` for item 8's addition alone. **Off-limits.** Everything else, as
brief 4 lists it.

## Execution

Perform the assignment directly and spawn nothing. Run the narrowest project after each step.

1. **The scanner's remaining misreads (analyst claim 7; reviewer 19).** Executed by the lanes on
   the live readers: `:is(h1,:where(.title))+p` reads false and must read true (a nested list
   still names `h1`); `:is(h1:not(.x), p) + p` reads false and must read true; `[title=':is(h1)'] + p`
   reads true and must read false (text inside an attribute string names no tag); `[title="a\" b"] p`
   comes back as one compound and must split at the descendant separator (an escaped quote does
   not close the quotation). The compound reader's `[^()]*` pattern cannot see a nested list and
   scans attribute strings; the splitter's quotation state ends on an escaped quote. Read
   `:is()`/`:where()` arguments with depth tracking, skip attribute strings, honour escapes; add
   the four readings as cases beside the existing ones; rewrite the TSDoc to what the readers do.
2. **The normalizer's promise (analyst 17).** `normalizeComplexSelector`'s TSDoc says whitespace
   inside parentheses and brackets is left alone; the unconditional replacement collapses it, so
   `[title="a  b"] + p` becomes `[title="a b"] + p`, which changes the selector's meaning. Make the
   code keep quoted content byte-for-byte (and either preserve or, if collapsing outside quotes is
   what the readers need, say exactly that), with a case that distinguishes the two values.
3. **Tallies (analyst claim 10).** `tests/setupStyles.ts:333` "both selectors" and
   `tests/src/styles/fixtures/mixins.scss:24` "both surfaces": name the members or drop the tally.
   Sweep every file this unit owns once more for `both`, `two`, `three`, `four`, `several`, and
   `multiple` and rule each hit by the writing law.
4. **The one-caller mixin (analyst 16).** `.claude/rules/styles.md` keeps a one-partial pattern
   inline and creates no mixin for one caller; `theme-assets` has one include. Emit the dark
   assets inline in `_theme.scss`'s dark scope with an `@each` over the asset entries of
   `tokens.$dark` (the values stay in `_tokens.scss`; no literal colour enters `_theme.scss`);
   delete the mixin; the emitted bytes stay identical (take the snapshot before and after as
   report 4 did).
5. **The recipe and the guide (reviewer 16).** Add a Node case in `tests/setupStyles.test.ts`
   asserting that `CUSTOMIZATION_RECIPE` appears in `guides/veneer.md`, read with `readFileSync`
   the way the oracle cases read Bootstrap, so an edit to the fence alone reddens. The negative
   claim at the guide's customization prose ("otherwise keeps painting the old brand") runs
   nowhere: either read it in the integration proof (a specimen that omits the triplet override
   still paints the old triplet) or delete the sentence.
6. **One word (reviewer 17).** The member-shape rule says a group's own "color" takes the `base`
   member; `--vn-radius-base` and `--vn-stack-*-base` follow it and are not colours. Write "value".
7. **The factor table (reviewer 18).** `derived` is "an expression over other Veneer tokens", and
   the factors are literals derived from nothing. Drop the `Source` column from the factor table
   and move "the neutral multiplier of the *X* scale" into the table's introductory sentence;
   remove the legend clause that existed only to admit them, if nothing else needs it.
8. **The cascade reader (reviewer 21; report 4 D1).** Three oracle cases repeat
   `readFileSync(BOOTSTRAP_CASCADE_PATH, 'utf8')`. `tests/setupConformance.ts` is the workspace's
   Node-only setup module that already reads files: add an exported `readBootstrapCascade()` there
   (importing `BOOTSTRAP_CASCADE_PATH` from `./setupStyles.js`), give it a case in
   `tests/setupConformance.test.ts`, and have `tests/setupStyles.test.ts` import it. Touch nothing
   else in those two files.
9. **Gates.** `npm run format:check`, `lint:check`, `check`, `build`, then `test:src`,
   `test:src:styles`, `test:app`, `test:journey`, `test:policy`, `test:config`, `test:setup`,
   `test:setup:browser`, `test:conformance`, `test:guides`; then
   `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`, `PLAYWRIGHT_CHANNEL=msedge npm run test:src`,
   and `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`. Record each command's final lines.

## Output

Write `u3-report-5.md` and return its content: the diff summary per file; the scanner
readings before and after for every input item 1 names plus the six earlier ones; the normalizer
readings; the asset snapshot comparison; the decision on item 5's negative claim; each gate's
final lines on both engines; deviations in the usual shape. Do not restate earlier reports.

## Deviation contract

Stop and report on: a gate red after your own fix inside owned files; a need to edit an off-limits
file; a reading that item 1 requires and the readers cannot give without changing the pair rule's
meaning (report the input and the meaning). Decide, record, and carry on from: wording, case
order, the exact `@each` shape.

## Acceptance criteria

1. Every reading item 1 names, and the six earlier ones, match; the four new inputs are cases.
2. `normalizeComplexSelector` keeps quoted content and its TSDoc is true of it.
3. No `both`, `two`, `three`, `four`, `several`, or `multiple` tally over a growable set survives
   in an owned file.
4. No mixin in `src/styles/_mixins.scss` has exactly one include; the emitted `url()` declarations
   are byte-identical to before.
5. `tests/setupStyles.test.ts` reddens when the guide's fence differs from `CUSTOMIZATION_RECIPE`.
6. Every gate in item 9 exits 0 on managed Chromium and the three named ones on Edge.
7. `git status --porcelain` shows only owned files, the granted files, the integrated patch sites,
   and the reports.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the built
`dist/src/styles/index.css`.
