# B-FORMS-CONTROL, round 2 (the fix round) — audit claims

## Subject

The B-FORMS-CONTROL fix round's uncommitted writes in `/home/user/veneer-bfo` (detached at
`2c10329`), written by `opus` from `/home/user/veneer-bfo/tmp/units/b-forms-control-brief-2.md`
(the successor carrying the round-1 findings: the swatch priority, the per-property binding, the
date specimen, the readonly color control, the `validation.test.ts` patch, the prose, the plant
table, the landing records) plus the D40 decision sent mid-unit (`## D40` in
`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`: the `control-type` and
`control-border` mixins) over the round-1 writes ruled in
`/home/user/scaffold/.orkestrel/veneer/units/bfo-audit-verdict.md`. Rounds so far: round 1 (analyst
FAIL 3, 4, 5, 7, 8, 9 with SWATCH-PRIORITY outside the claims; reviewer FAIL 5, 7, 8, 9, 10 with F1
and R1 to R3; checker on its read-only limit), this fix round. **Review evidence.**
`/home/user/scaffold/.orkestrel/veneer/units/bfo-2.diff` (the whole diff against `2c10329`, the new
files rendered through `git add -N`), `bfo-2-status.txt`, the round-1 diff `bfo.diff` (for the
delta), the reports `b-forms-control-report.md` and `b-forms-control-report-2.md` (the plant table
with each red set and digest; the D40 compile comparison; the gate table; the journey deviation),
the frames under `/home/user/veneer-bfo/tmp/capture/states/` (the `form-control-*` files, the
primary evidence for every rendered claim, the source corroboration), and the instruments under
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bfo2/` (`plant.py`,
`run-plants.sh`, the plant logs, `d40-before.css` and `d40-after.css`, the journey logs). The
mutation readings and the compile comparison are the writer's.

## What the round decides

Whether B-FORMS-CONTROL lands on the session branch after the running chain with the Orchestrator's
integration edits (the Set literal key `form-control` in `tests/setupServer.test.ts`; the FLOATING
carrier sentence's text-control half in § Form floating classes; the ROADMAP rows and the restated
D31 carrier cell; the `_mixins.scss` merge against the MIXIN landing, whose declarations match and
whose comments differ), and whether the writer's recorded decisions stand: `border: '0px !important'`
recorded for the WebKit swatch row (Chromium's serialization) beside `'0 !important'` for the Gecko
row (the release's text); the `FormControlCase` interface with a `reads` map in the `InputGroupCase`
shape and the Node case filtering out a compiled property that reads no token before comparing;
the `Form control date` specimen after `Form control file` with the `form-control-date` element
frame over `padding-left`; the readonly color control in the proof markup; the range journey case
starting from the `Form control readonly` control (the deviation).

## Already established — do not re-run

The round-1 rulings on claims 1, 2, and 6 (the partial's selector set, the token bindings, the
ledger rows); `npm run test:setup` red only on the shipped-key Set literal and
`npm run test:conformance` red only on the presence reading `.form-floating > .form-control`
(standing, the Orchestrator's integration closes both); the sandbox for the objective lane is
read-only with no browser and runs no Vitest project (`npm run check`, `npx sass`, `node -e`, and
the Node readers are allowed); the Orchestrator's landing chain settles the gates and the
Orchestrator crops the focus frames at the landing.

## Unknowns

- Whether the delta between `bfo.diff` and `bfo-2.diff` introduced a defect outside the carried
  findings: read the delta for claims 1 to 9 and the whole diff for claim 10.
- Whether the range journey case still proves keyboard reachability of the range once it starts
  from a focused control rather than the document start: rule from the assertions and the
  `Check group` precedent in the same file.
- Whether the date frames show the release's date control: the reviewer opens them.

## The threshold

`CONFIRMED` requires naming the attack that failed; a claim about a proof is ruled on the mutation
named and whether the assertions distinguish it. Rule every claim CONFIRMED, BROKEN, UNRESOLVED, or
NOT-EVIDENCED with `file:line`.

## Numbered falsifiable claims

1. **The swatch priority.** The swatch `@each` in `src/styles/components/_form-control.scss` writes
   `border: 0 !important` as the release does; case L in
   `tests/src/styles/components/form-control.test.ts` reads each declared property as its value plus
   the priority from `getPropertyPriority` and compares the whole map with `toStrictEqual`; the
   WebKit swatch row records `border: '0px !important'` and the Gecko row `'0 !important'`; the
   Node case reads `declaration.important` for the compiled Gecko rule; the guide's non-utility
   `!important` sentence names the swatch rules beside the `[hidden]` rule and the calendar-picker
   indicator rule. Mutation: drop `!important`; rule from the assertions whether case L and the
   Node case distinguish it (the report's row: `"0px"` against `"0px !important"`, and `"0"` against
   `"0 !important"`).
2. **The per-property binding.** `FormControlCase` in `tests/setupStyles.ts` types `reads` as
   `Readonly<Record<string, readonly string[]>>`, the `InputGroupCase` shape, and keeps `selector`,
   `condition`, `evidence`, `subject`, `pseudo`, `state`, and `values`; every row's map and every
   name array is frozen; the union of each row's map equals that row's round-1 flat list (rule from
   the delta); the Node case builds a per-property reference map for each compiled
   `selector condition` key from `readCascadeBlocks`, drops a compiled property whose name array is
   empty, and compares the rest to `entry.reads` with `toEqual`. Mutation: the `padding` plant
   (`padding: 0; --audit-unused: …`) that the per-selector shape missed; rule from the assertions
   whether the comparison reddens, and rule whether dropping a compiled property that reads no
   token can hide a declaration the row names or a literal declaration the row does not name.
3. **The date specimen.** `FORM_CONTROL_SPECIMENS` in `app/browser/constants.ts` carries
   `Form control date` (`<input class="form-control" type="date" aria-label="Due date" value="2026-09-23">`)
   after `Form control file`; `FORM_CONTROL_COPY` names it; `CaptureSubject` in `tests/setup.ts`
   gains it; `CASCADE_KEYS` gains `form-control-date` (selector `.form-control[type="date"]`,
   property `padding-left`, an element frame); the section proof lists the specimen, its class, tag,
   and type; case L's comment names the `form-control-date` frame as the corroboration for the date
   parts and the `form-control-color` frame for the swatch; the guide bullet names those frames and
   no longer says the date parts have no frame; the frames `form-control-date--light-1280.png`,
   `--dark-1280.png`, `--light-390.png`, and `--dark-390.png` exist with their accessibility
   artifacts and show the release's date control (a full-width control of one line height with the
   rounded border, the filled fields at the inline start, the calendar-picker indicator at the
   inline end, the mode's surface and text colours). The reviewer opens the named date frames and
   `form-control-color--light-1280.png` and rules what they show against the release.
4. **The readonly color control.** `FORM_CONTROL_MARKUP` gains
   `<input class="form-control form-control-color" type="color" aria-label="Readonly color choice" value="#563d7c" readonly>`;
   case C reads that control's cursor and holds it off `pointer`. Mutation: drop `:not([readonly])`
   from the color cursor rule; rule from the assertions whether case C and the Node case distinguish
   it.
5. **The `validation.test.ts` patch.** The round-1 report's patch applied exactly to
   `tests/src/styles/components/validation.test.ts`; the writer's runs read 5 failed and 12 passed
   without it and 17 passed with it; `oxfmt --check` reports the file formatted. Rule the applied
   text against the round-1 report's patch and name the settling command.
6. **The prose.** The alias sentence ("because the partial does not write that alias and the
   standard part paints the same button"), the timing bullet (the `0.15s ease-in-out` value and the
   `var(--vn-motion-feedback) var(--vn-ease-standard)` value), the two links introduced by `see`
   with the proof as the subject, the ladder lead-in ("Each part, and the file control's `overflow`
   declaration, takes one rung of the evidence ladder:"), and the proof comment ("the release's
   `0.15s` fade") read as the report states; every changed sentence in the guide, the TSDoc, and the
   comments follows `writing.md` (a noun after each code token, no banned term, no count of a
   growable set, prose at or under 100 columns); the report's ROADMAP rows and the restated D31
   carrier cell name one carrier each and follow `writing.md`; the FLOATING carrier sentence's
   text-control half in the report follows `writing.md`.
7. **The plant table.** Every row of the report's table reddens the named browser case and the
   Node case and the restored digest equals the baseline `645d830ceea3…`; rule from the assertions
   whether each plant is distinguished (the swatch priority, the per-property binding, the readonly
   color cursor, the wrong focus width, the lost `::placeholder` color, the surviving reduced-motion
   transition, the literal size, the missing hover surface, the lost swatch radius), and rule
   whether the F reds under the reduced-motion plant are the plant's (each F case reads the ring
   after staging the preference) rather than timing's (round-1 claim 3 left this UNRESOLVED).
8. **D40.** `src/styles/_mixins.scss` gains `control-type` then `control-border` after
   `border-reset`, each carrying exactly the declarations D40 names in D40's order
   (`font-size: var(--vn-size-3); font-weight: var(--vn-weight-body); line-height: var(--vn-line-body); color: var(--bs-body-color)`
   and `border: var(--bs-border-width) solid var(--bs-border-color); border-radius: var(--bs-border-radius)`)
   with a comment in the file's form; `.form-control` includes each in place of the declarations it
   replaces and no other declaration changed; the compile before and after is byte-identical (the
   writer's `cmp`, the files `bfo2/d40-before.css` and `bfo2/d40-after.css`). The objective lane
   compiles the tree with `npx sass` and rules the `.form-control` block's declaration order against
   the release's; both lanes rule whether the mixin comments follow `writing.md` and `styles.md`.
9. **The range journey deviation.** The range focus case in `tests/app/browser/integration.test.ts`
   focuses the `Form control readonly` specimen's control and traverses from there, on the
   `Check group` case's `preceding.focus()` pattern, with a comment stating the reason (a date
   control keeps `document.activeElement` on itself while Tab steps through its fields, and the
   installed `driveTraversal` stops at the first element it reaches twice). Rule whether the case
   still proves what its title claims (the range reached through the keyboard and its ring), whether
   the comment follows `writing.md`, and whether the cause reading is consistent with the installed
   `driveTraversal` source under `node_modules/@orkestrel/test/`; the writer flags the trail's end
   (`SELECT:First choice`) as unexplained. Name the settling command.
10. **The law holds and scope is honest.** Across the whole diff: no `any`, `as` (other than
    `as const`), `!`, or suppression; no nested function beyond a callback passed or returned
    directly; frozen tables; readonly interface members; no helper whose job an installed
    `@orkestrel/test` export does; the status is the round-1 set plus `validation.test.ts` and
    `src/styles/_mixins.scss` and nothing else; `tmp/probe/` is absent; the off-limits files are
    untouched. Run `npm run check` and report its exit code as evidence here (the objective lane).
