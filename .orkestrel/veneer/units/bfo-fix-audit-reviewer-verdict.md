# B-FORMS-CONTROL, round 2 (the fix round) — `reviewer` on Opus 5.5, subjective lane

Native subagent, clean context, read on the tree of `/home/user/veneer-bfo` on 2026-09-23. The verdict text is the lane's handback verbatim.

# B-FORMS-CONTROL round 2 (fix round): reviewer verdict, subjective lane

**Lane:** `reviewer` on Opus 5.5, holding the subjective lane. The claims file is `/home/user/scaffold/.orkestrel/veneer/units/bfo-fix-audit-claims.md`. The subject is `/home/user/veneer-bfo`, and the evidence is `bfo-2.diff`, `bfo-2-status.txt`, the reports, D40 and D39a, the frames, and the writer's logs under `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bfo2/`.

## Per-claim verdicts

1. **CONFIRMED.** The swatch priority is written, asserted, and documented.
   - `src/styles/components/_form-control.scss:184` writes `border: 0 !important`, which matches `node_modules/bootstrap/dist/css/bootstrap.css:2294` and `:2298`.
   - `tests/setupStyles.ts:4315` records `'0px !important'` for the WebKit row, and `:4300` records `'0 !important'` for the Gecko row. The interface's TSDoc states the ` !important` suffix convention.
   - `guides/veneer.md:154-155` names the color swatch rules beside the `[hidden]` rule and the calendar-picker indicator rule.
   - Mutation named: drop `!important`. Case L (`tests/src/styles/components/form-control.test.ts:104-112`) builds `value !priority` and compares with `toStrictEqual`, so it reads `0px` against `0px !important`. The Node case (`tests/setupStyles.test.ts:1848`) reads `0` against `0 !important`. Both distinguish the mutation.
   - Corroboration: `plants/swatch-priority-browser.log.txt` and `-node.log.txt` each read 1 failed, and the restored runs read 32 passed and 85 passed.
   - The line-length breach on `guides/veneer.md:155` is carried under claim 6.

2. **CONFIRMED.** The per-property binding has the right shape and catches the plant.
   - `FormControlCase` (`tests/setupStyles.ts:3770-3789`) types `reads` as `Readonly<Record<string, readonly string[]>>`. That is the shape `InputGroupCase` has on the session branch (`/home/user/veneer/tests/setupStyles.ts:4195`), and the interface keeps the other named fields.
   - Every map and every name array is `Object.freeze`d, and the Node case asserts both (`setupStyles.test.ts`, the frozen loop at the end of the binding case).
   - Mutation named: the `padding: 0; --audit-unused: …` plant. The written side drops `padding`, because it reads no `var()`, and adds `--audit-unused` with two names. So `toEqual` against `entry.reads` (`setupStyles.test.ts:1832`) reddens. `plants/per-property-binding-node.log.txt` reads 1 failed.
   - Can dropping a no-token property hide a declaration the row names? No. A named property written as a literal goes missing and reddens; see the literal-size plant, `plants/literal-size-node.log.txt`, 1 failed.
   - Can it hide a literal declaration the row does not name? Yes, by construction. That declaration is outside the Node case's population, and the browser case reads only the keys of `values` (`form-control.test.ts`, around lines 63-69). This matches the GROUP design. Whether another gate catches it is referral R1. The TSDoc that overstates this is carried under claim 6.
   - The union of each map against the round-1 flat list was sampled and agrees; the objective lane owns the full comparison.

3. **CONFIRMED.** The date specimen is complete, and its frames show the release's date control.
   - Source:
     - `app/browser/constants.ts:1071-1074` places `Form control date` after `Form control file` with the stated markup.
     - `FORM_CONTROL_COPY` names "the file, date, and color controls".
     - `CaptureSubject` gains the subject (`tests/setup.ts:106`).
     - `CASCADE_KEYS` gains `form-control-date` with selector `.form-control[type="date"]` and property `padding-left` (`tests/setup.ts:799-802`).
     - The section proof lists the specimen, its class, `INPUT`, and `date`.
     - The case L comment names both frames (`form-control.test.ts:83-86`).
     - The guide bullet names both frames (`guides/veneer.md:786-787`).
   - Frames opened:
     - `form-control-date--light-1280.png`: a full-width control about 38px tall with a rounded 1px light-grey border. The white surface shows dark `09/23/2026` at the inline start and the calendar indicator at the inline end.
     - `--dark-1280.png`: the same geometry on the dark body surface, with light text, a light indicator, and a subtle border.
     - `--light-390.png` and `--dark-390.png`: the same control at 390px width, each mode's colors, with the indicator at the inline end.
     - `form-control-color--light-1280.png`: a 48px-wide control with the rounded border and a rounded black default swatch inset by the padding. This agrees with `border: 0 !important; border-radius: var(--bs-border-radius)` at `bootstrap.css:2297-2300`.
   - `form-control-date--light-1280-accessibility.txt` exists and names `input "Due date"`.

4. **CONFIRMED.** The readonly color control closes R2.
   - `tests/setupStyles.ts:3764` adds the control.
   - Case C (`form-control.test.ts:382`, with the name at `:392` and `:408`) holds its cursor off `pointer`.
   - Mutation named: drop `:not([readonly])`. The readonly color control then resolves `pointer`, and `not.toBe('pointer')` reddens (`plants/readonly-color-cursor-browser.log.txt`, 1 failed). The Node case's `requireValue` on the missing key reddens too (`-node.log.txt`, 1 failed). Both distinguish the mutation.

5. **CONFIRMED** on the applied text. The patch in `bfo-2.diff` for `tests/src/styles/components/validation.test.ts` (both mark-inset hunks, the `stageMedia` insertion with its comment, and the scope-case line) is byte-identical to the patch in `b-forms-control-report.md`.
   - The comment voice is sound.
   - The unchanged `81px against the published 14px body type` comment (`validation.test.ts:87-89`) stays true, because the marked swatch carries no `.form-control` class.
   - The 5-failed and 17-passed readings and the `oxfmt` reading are the writer's. The landing chain settles them with `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/validation.test.ts`.

6. **BROKEN.** The report-stated sentences read as claimed: the alias sentence, the timing bullet (`:759`), both `see` links with the proof as subject (`:777`, `:790`), the ladder lead-in (`:778`), and "the release's `0.15s` fade" (`form-control.test.ts:195`). The following do not hold.
   - `guides/veneer.md:155` is about 140 columns.
     - Wrong: the swatch rewrite of the `!important` paragraph did not rewrap it.
     - Why it matters: the claim requires changed prose to stay at or under 100 columns.
     - Right: rewrap lines 152-156 at 100 columns with the text unchanged.
   - `guides/veneer.md:736` is 101 columns.
     - Wrong: the fix round's alias sentence line ends "…inline-end margin and".
     - Right: rewrap lines 733-738 at 100 columns.
   - The FORM_CONTROL_CASES TSDoc at `tests/setupStyles.ts:3817-3819` overstates what `reads` proves.
     - Wrong: "A property the row leaves out is the claim that its declaration writes no `var()`, so an empty row holds its rule to the release's own values". An empty `reads` holds a rule only to "no `var()`", as the Node case's own comment says (`setupStyles.test.ts:1819-1821`). It says nothing about the values, and a different literal passes it (claim 2).
     - Why it matters: `documentation.md` treats prose stated more strongly than the code earns as a defect. It also departs from the GROUP wording it copies.
     - Right: use the GROUP phrasing, "so an empty row separates a rule holding Bootstrap's own values from one this package routed onto tokens", or "so an empty row holds its rule to no `var()` at all".
   - The D39 ROADMAP row (`b-forms-control-report-2.md:215`) is stale against D39a (`decisions-round-2.md:421-428`).
     - Wrong: it names "L2 LEDGER-PRIORITY on `opus`" and "carries the priority as part of the compared value". D39a moves the carrier to `builder` and the mechanism to a conformance case over the release's compiled CSS, and "the ledger rows keep comparing values". The `opus` token also has no noun after it.
     - Why it matters: the Orchestrator applies this row verbatim at integration.
     - Right: `| The `readCascadeBlocks` function stores a declaration's value without its priority, so no gate compares a declaration's `!important` priority with the release's (D39, D39a) | L2 LEDGER-PRIORITY on the `builder` role adds the conformance case that holds every selector and property pair the release's compiled CSS and the built cascade both declare to the same priority, after CONTROL lands |`.
   - `tests/setup.ts:963` has a code token with no noun after it: "`form-control-text` already names…". Right: "the `form-control-text` scenario already names…".

7. **CONFIRMED** on distinction and red sets.
   - Every plant is distinguished by the assertions named in the table:
     - swatch priority: case L plus Node;
     - per-property binding: R for `.form-control` and T, plus Node;
     - readonly cursor: C plus Node;
     - focus width: F in light and dark (gauge lengths) plus Node (`box-shadow` names);
     - `::placeholder` color: M plus Node;
     - reduced-motion twin: G, R under the twin, and F in both modes, plus Node (missing `@media` key);
     - literal size: T (density ×2 padding) plus Node;
     - hover surface: H plus Node;
     - swatch radius: L plus Node.
   - Each named failure appears in `bfo2/plants/<plant>-{browser,node}.log.txt`, and every restored log reads 32 passed and 85 passed.
   - The F reds under the reduced-motion plant are the plant's, not timing's. Each F case stages the preference first (`form-control.test.ts:195-197`). At baseline the staged preference sets `transition-property: none`, so no timing condition can produce a mid-fade ring. Under the plant the transition survives, and the ring is read within the 0.15s fade. Slow timing could only let the fade finish and turn F green, never red.
   - The restored-digest leg is referred to the objective lane (R4).

8. **CONFIRMED.**
   - The mixins sit after `border-reset` (`src/styles/_mixins.scss:46-60`) with the D40 declarations in D40's order.
   - `.form-control` includes each mixin in place (`_form-control.scss:30`, `:34`), and the block's order matches the release's `.form-control` order.
   - The comment form is the file's `// Emits …` form.
   - The worktree's wording ("the run" with no antecedent, and "a form text control" for a mixin `.input-group-text` also takes) is weaker than the session-branch copy (`/home/user/veneer/src/styles/_mixins.scss:46-47`, `:55-56`), which defines "the type run" and "the border run". The landing keeps one copy, so rule the merge under MIXIN-READERS rather than this text.

9. **BROKEN**, on the comment only. The case still proves its title: it follows the `Check group` precedent (`integration.test.ts:875-883`), Tab from the preceding control reaches the range, and it asserts `:focus-visible`.
   - The cause is consistent with the installed source: `driveTraversal` breaks on `visited.has(focused)` (`node_modules/@orkestrel/test/dist/src/browser/index.js:886`).
   - This settles the writer's flagged unknown. The logged trail does not end at `SELECT:First choice`. That select's `innerText` carries a newline, and the trail continues on the next log line (`bfo2/journey-1-light-1280.log.txt:13-14`). It ends `… INPUT: > INPUT: > INPUT: > TEXTAREA: > INPUT: > INPUT:`, which is the text, small, large, textarea, file, and date controls. The walk stops at the date control, as the source predicts.
   - The defect is at `tests/app/browser/integration.test.ts:907-909`.
     - Wrong: in "The date control ahead of it", the word "it" can attach to "the last text-control specimen" or to the range. Read as the start point, the sentence does not say why a control before the start matters.
     - Why it matters: `writing.md` requires naming the noun wherever a pronoun has another candidate referent.
     - Right: "The traversal starts from the `Form control readonly` specimen's control rather than from the document's own start. A walk from the start crosses the `Form control date` specimen, whose control keeps focus on itself while Tab steps through its date fields, and the installed `driveTraversal` walk stops at the first element it reaches twice."

10. **CONFIRMED** on the reading.
    - Searching the added lines of `bfo-2.diff` for `as <Type>`, postfix `!`, `any`, `@ts-`, and `eslint-disable` finds only prose and `as const` (`form-control.test.ts`, the `drive` literal).
    - There are no nested function declarations, the tables are frozen, and the interface members are readonly.
    - `bfo-2-status.txt` equals the round-1 set plus `validation.test.ts` and `_mixins.scss`, and a Glob for `tmp/probe/**` in the worktree returns no files.
    - The `npm run check` exit code belongs to the objective lane.

## Findings outside the claims

- **MIXIN-READERS.** The session-branch comments at `/home/user/veneer/src/styles/_mixins.scss:46-47` and `:55-56` name `.form-select` and `.input-group-text` as the readers.
  - Wrong: after CONTROL lands, `.form-control` also includes both mixins. The kept comment would then leave out one of its three consumers, and "so `.form-select` and `.input-group-text` read the same four declarations here" reads as the full list.
  - Why it matters: the claims file makes this merge an Orchestrator integration edit, and a reader of the mixin file would not know `.form-control` reads it.
  - Right: keep the MIXIN copy and change each list to "so `.form-control`, `.form-select`, and `.input-group-text` read the same four declarations here", or "the same two declarations here" for the border mixin.

## Referrals

- **R1 (to the objective lane).** Can a literal declaration added to a shipped `.form-control*` rule, on a property the row neither reads nor values, pass every gate? The Node case drops it (`setupStyles.test.ts:1832`), and the browser case reads only the keys of `values`. Rule whether the ledger or conformance comparison against the release reports an unrecorded declaration.
- **R2 (to the Orchestrator).** D40 names `control-type` beside the existing `control-text` mixin (`_mixins.scss:33`). The file's form for a typography run is `-text` (`heading-text`, `mark-text`, `caption-text`, `code-text`, `script-text`), so `type` and `text` become two terms for one concept. The session branch already carries the name, so any rename is a D40 amendment, not a CONTROL fix.
- **R3 (to the Orchestrator).** The FLOATING carrier's text-control half (`b-forms-control-report-2.md:197-198`) says "so every floating frame shows the floated label over the styled control". The floating select frames' paint belongs to the `.form-select` half. Bound it to "every floating text-control frame". This worktree cannot show the FLOATING frames.
- **R4 (to the objective lane).** Check claim 7's restored-digest leg (`645d830ceea3…` in every row) against `bfo2/plant.py` and its logs.

VERDICT: FAIL 6, 9; outside the claims: MIXIN-READERS
