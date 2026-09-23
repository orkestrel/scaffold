# UTIL-DISPLAY (`ud`) audit, round 1: subjective-lane verdict

I held the **subjective** lane on Opus 5.5. I read the sources only and ran nothing. Where a verdict rests on the source, the evidence says so. The dispatch named no report path and gave me no command.

## Per-claim verdicts

**1. Delta and scope: CONFIRMED.** This holds if "removes" means removes content.
- `ud-status.txt:1-12` lists only the owned partials, proofs, sections, and section proofs, each marked `??`.
- Every file the patch touches is in the brief's Shared row (`b-utilities-ud-brief.md:81-96`). The `integration.test.ts` hunk is deviation 4, which the Orchestrator accepted.
- The patch touches no vendored file, no sibling-unit file, and none of `_mixins.scss`, `_tokens.scss`, `src/browser/**`, `src/core/**`, `oracle/**`, `package.json`, `README.md`, or `ROADMAP.md`.
- The diff's other `-` lines lose no content:
  - `ud-shared.patch:298-299` is the `CaptureStem` doc comment.
  - `:410` widens an import.
  - `:504` replaces `toContain('utilities/gap')` with an `arrayContaining` assertion that includes that path.
  - `:644-646`, `:744`, and `:763` are guide rewraps whose words are all kept.
- If the claim means diff lines, those lines break it.

**2. The partials and the cascade: UNRESOLVED.** The source half holds; the cascade half rests on the writer.
- **Holds on the source.**
  - Each partial calls `utility` inside one `breakpoint-each` walk in the `utilities` layer: `_display.scss:3-16`, `_flex.scss:3-117`, `_vertical-align.scss:3-14`.
  - The values match the release map in `node_modules/bootstrap/scss/_utilities.scss:8-12`, `:67-73`, and `:253-348`, including `none` last.
  - The print pass follows the walk (`_display.scss:13-15`).
  - `_stacks.scss:1-17` is the release helper (`helpers/_stacks.scss:2-14`), written normal in `components`.
- **Rests on the writer.** These facts appear only in the report (`b-utilities-ud-report.md:85-93`, `:157`):
  - the built cascade carries every inventory site and nothing else;
  - the departures and additions gates read empty.
- The retained `ud-instruments/cascade.test.ts` has no negative control. Its output is not kept anywhere.
- **What settles it:** the Orchestrator's landing-tree `npm run build:src` and `npm run test:conformance`, plus a `cascade.test.ts` run that reports `extra` above zero on a planted `.d-probe` rule.

**3. The proofs: UNRESOLVED.** The reds are logged; the green control is not.
- Each named mutation's red run is in `ud-instruments/mutate.log.txt`:
  - the print mutations: `:1-6`
  - `display-breakpoint-omitted` and `display-walk-reversed`: `:15-18`
  - the dropped-importance mutations: `:19`, `:59`, `:76`
  - `flex-per-entry`: `:57`
  - `flex-shrink-before-flex`: `:88`
  - the stack mutations: `:80-87`
- The red counts in the report's matrix (`report:103-112`) match the log.
- The script (`mutate.py:60-79`) refuses a mutation that did not apply, so each red is bound to its edit.
- **Gap:** the claim includes "the unmutated control green". The log has no unmutated run, and `mutate.py` does not run the proofs after it restores the file (`:83`).
- The only green reading is the report's landing-copy table (`report:193`). That table ran in `tmp/probe/land`, a different copy from the `tmp/probe/tree` copy the mutations ran in. So the green control rests on the writer's report.
- **What settles it:** a logged run of the four proofs in `tmp/probe/tree` with no mutation applied.

**4. The sections and the specimens: BROKEN.**

Required changes:

- **(a) The section proofs never check for a `style` attribute.** The claim says the section proofs assert `[style]` is null. Neither does:
  - `DisplaySection.test.ts:16-72` and `FlexSection.test.ts:16-86` have no such assertion.
  - Every sibling section proof has it, for example `InputGroupSection.test.ts:27` and `CardSection.test.ts:15`.
  - **Mutation:** add `style="width: 40px"` to any specimen's markup in `DISPLAY_SPECIMENS` or `FLEX_SPECIMENS`.
  - **Does it redden?** No. `rendered.map(innerHTML)` is compared with the same `markup` (`DisplaySection.test.ts:32-34`, `FlexSection.test.ts:38-40`), and none of the selector checks reads `style`.
  - **Right:** add `expect(region.querySelector('[style]')).toBeNull()` to each render case.
  - The specimens carry no `style` attribute today (`ud-shared.patch:38-58`, `:78-164`), but nothing guards that.
- **(b) The "centers the horizontal stack" reading cannot fail on the centering.** See `FlexSection.test.ts:88`, `:110-114`, and `:126-128`.
  - **Mutation:** drop `align-items: center` from `.hstack` (`_stacks.scss:7`).
  - **Does it redden?** No. Under the default stretch, every child's box is as tall as the row, so every centre offset is still 0. The comment at `:126-127` concedes this for the rules.
  - **Right:** also assert that each text item's height is less than the stack's height. That is true when the items are centered and false when they stretch. Alternatively, rename the case to what it proves.
- **(c) The `FLEX_SPECIMENS` doc comment is false** (`ud-shared.patch:72`): "Each container labels its first item with the class it demonstrates."
  - In `Aligned items`, the first item is `Tall` (`:111`).
  - In `Aligned content`, the label is the bare key (`${key}`, `:127`).
  - In `Aligned self`, the first item is `Tall`, and the others carry bare keys (`:133-141`).
  - `Fill, grow, and shrink` uses the prose labels `Fill`, `Fixed`, and `Shrinks` (`:147`).
  - The stacks use `Tall` and `First item` (`:158`, `:163`).
  - **Right:** pick one of these.
    - Label every demonstrating item with its full class name, as `Flex direction`, `Justified content`, and `Flex order` do. This also makes `start` in `Aligned content` readable.
    - Or rewrite the remark to state the convention the specimens actually follow.
- **What holds:**
  - The specimen names and order match the claim (`DisplaySection.test.ts:26-31`, `FlexSection.test.ts:26-37`).
  - Each specimen shows a ramp or a responsive swap, never one class alone.
  - The hidden subjects have visible context (`ud-shared.patch:42`, `:52`).
  - The specimens compose only classes shipped at `e4e6a40` (`gap-*`, `display-6`, `col-*`, `row-cols-*`, `ratio`, `vr`, `card`).
  - These proofs do distinguish their mutations: the responsive-swap reading (`DisplaySection.test.ts:95-98`, dropping a `.d-md-*` class) and the order-sequence reading (`FlexSection.test.ts:116-125`, dropping the `order-*` classes).
- **Optional:** `FLEX_COPY` says "Resize the viewport to compare how each container fits its items" (`ud-shared.patch:65`). No flex specimen carries a responsive infix. Either add one, for example `.flex-column.flex-md-row`, or drop the clause.

**5. The registry: CONFIRMED.** This rests on the source and on TypeScript's inference rules; I did not run it.
- The subjects and rows are appended at the ends of their lists (`ud-shared.patch:277-290`, `:319-402`). The patch adds no driven row and no `CaptureState` member.
- The `Print display` row is `.d-print-none`, the screen half (`:331-336`).
- Each row's selector appears inside its own specimen's markup.
- **How the type resolves:** the new `CaptureStem` (`:307-311`) turns `'Fill, grow, and shrink'` into `'Fill grow and shrink'` and then into `fill-grow-and-shrink`.
- **Mutation:** restore the space-only type. Then the type yields `fill,-grow,-and-shrink`, so `tests/setup.test.ts` (`:421`) and the registry row (`:380`) fail TS2322 at `npm run check`. Vitest strips types, so this red appears at the check stage, not in `test:setup`.
- **Mutation:** make `buildStem` keep commas. Then `:422` reddens at run time.
- **Optional wording:**
  - The doc comment's passive "each comma is dropped" (`:300`) reads better as "the type drops each comma".
  - The local constant name `listed` repeats the name of the conformance literal; `stem` would be clearer.

**6. Tailwind: UNRESOLVED.**
- **Holds on the patch:**
  - The `markup.html` names sit before the button line (`ud-shared.patch:582-617`).
  - `tests/setup.css`, `consumer.css`, and `preflight.css` are untouched.
  - The installed compiler writes `order-first` as `-9999` (`node_modules/tailwindcss/dist/lib.mjs:12`). This matches the guide sentence.
- **Rests on the writer:** the measurement through the unexcluded instrument, and the red runs of both negative controls. Both appear only in the report (`report:120-138`), with no retained log.
- **What settles it:** the Orchestrator's `npm run build:src:styles && npm run test:service` in the landing tree, run with each control applied.

**7. The guide and the shared patch: BROKEN.**

The required change:

- **(a) The § Tailwind sentence writes part of the shared set down, against the section's own design** (`ud-shared.patch:647-651`).
  - The section says "Nothing writes the shared set down either… That proof derives it per run" (`guides/veneer.md:433-435`).
  - The added sentence lists this unit's names off the line. Each later wave-2 unit will append another list, so the paragraph turns into a prose copy of the derived set, and that copy goes stale whenever the set moves.
  - The sentence also writes the names as selectors (`.flex-row`, `.order-first`). The section writes a shared name bare everywhere else: `gap-3`, `col-1`, `px-8`, and "the gap steps `gap-0` to `gap-5`" (`guides/veneer.md:436`, `:443-446`).
  - It also sits between the `gap-3` reading and the planted-rule case, which splits the description of one proof.
  - **Right:** replace it with one sentence placed directly after the gap-steps sentence: "Every other shipped name off the line reads the same way; Tailwind's `order-first` rule declares the `order` longhand alone, and Veneer declares it with `!important`, so the `order-first` class resolves Veneer's `-1` rather than Tailwind's `-9999`."

Optional wording fixes:
- **(b)** `ud-shared.patch:673-674`: in "one `@media print` block after the walk that writes every value again", the clause can attach to "walk". Write "one `@media print` block, after the walk, that writes every value again under the `-print` infix."
- **(c)** `ud-shared.patch:766`: "the vertical alignment utilities" is not hyphenated, but `:634`, `:647`, and `:664` write "vertical-alignment". Use one spelling.

What holds:
- The sections sit between `### Gap utilities` and `### Deferred selectors`. They open "The … key ships whole" in the voice of `### Table classes`, and the stack helpers are documented beside the flex mechanism (R15).
- A sweep found every code token followed by a noun, or standing as its own noun where that is allowed: class selectors, properties, values, and `!important`.
- The § Showcase clause "the stacks sit in Flex beside the flex utilities" (`:745-746`) matches the form of its sibling clauses.
- The `### Files` rows, the compatibility rows, and the § Tests links are present and in the table's voice.
- In the conformance order case, removing a `@use` line reddens the `arrayContaining` assertion (`:505-513`). Loading a partial out of map order reddens the existing subsequence assertion (`tests/conformance.test.ts:472-479`).
- `git apply --check` rests on the writer's report (`report:207`); I did not run it.

**8. Law and report: BROKEN.**

- **(a) Ruling on `.claude/rules/tests.md`: yes, the case tables belong in `tests/setupStyles.ts`.**
  - The rule says "Data tables and case matrices belong in a setup file at any size" (`/home/user/scaffold/.claude/rules/tests.md:187`).
  - `FLEX_ENTRIES` (`flex.test.ts:11-109`) and its `RESTING` record (`:114-116`) form a case matrix.
  - `DISPLAY_VALUES` (`display.test.ts:9-21`) and `ALIGN_VALUES` (`vertical-align.test.ts:8`) are data tables. They are also restated inline in `DisplaySection.test.ts:35-47` and `:49`, and the flex keys again in `FlexSection.test.ts:41-70`. A duplicate is a defect under `tests.md:184-185`.
  - The `GAP_KEYS` ruling (`us-audit-verdict.md:25`) kept a one-use key list local. These tables are neither one-use nor key lists.
  - The family's own precedent put `GAP_STEP_CASES` in `tests/setupStyles.ts` (`setupStyles.ts:1833`; `b-utilities-us-report-3.md:20`).
  - The brief granted `tests/setupStyles.ts` for "any case table" (`b-utilities-ud-brief.md:85-86`). The report instead concedes the rule and defers the move (`report:224`), so this choice is not bounded.
  - **Right:** a successor patch to `tests/setupStyles.ts` exporting frozen, documented, qualified constants: `DISPLAY_VALUES`, `ALIGN_VALUES`, a flex case table, and a flex resting-value table. Name them for what they are, not the bare adjective `RESTING`, which `display.test.ts:25` also uses for a scalar. The style proofs and both section proofs import them instead of restating the lists.
- **What holds:**
  - The delta adds no `any`, no `!` assertion, no suppression, and no mock.
  - The `as const` assertions (`flex.test.ts:109`, `FlexSection.test.ts:104`) are const assertions, which `.claude/rules/typescript.md` permits.
  - Every function is a callback passed directly as an argument.
  - The SCSS reads the mixin and the release values, and `_display.scss` declares `$values` once and uses it for both passes (`:8`, `:14`).
  - A banned-term sweep found no violation. Pattern: `should|simply|easy|easier|just|currently|via|e.g.|i.e.|etc.|utiliz|leverag|robust|performant|please|allows you|in order to|and/or|since|now|new|latest|above|below|once`, case-insensitive. Paths: the owned files in the worktree, the added lines of `ud-shared.patch`, and the report. Every hit is a permitted sense: spatial `above` and `below`, `once` meaning one time, and `new` as a code keyword.
  - Deviations 1, 2, and 4 are bounded. The print row, the construction position, the spelling, and the Files-row positions are each recorded.

- **(b) The counts the report states.** Growable-set counts break `AGENTS.md` § Writing; a count reported with the run that produced it is a permitted measurement.
  - **Growable-set counts:**
    - "12 files", "All 12", and "only the 12 files" (`:30`)
    - "Two proof defects" (`:51`)
    - "(11 values)" (`:103`) and "(6 values)" (`:106`)
    - "The 14 subjects" (`:114`) and "the 14 scenarios" (`:236`)
    - "four rows", "ten rows", "one sentence", and "one clause" (`:163-166`)
    - "13 files" (`:203`)
  - **Measurements tied to a run:**
    - "1227 insertions" (`:30`)
    - "22 passed" and "18 passed" (`:41-42`, `:183-184`, `:195-196`)
    - "Test Files 4 failed (4)", "Tests 37 failed (37)", and "37 passed" (`:48-49`, `:181`, `:193`)
    - 343 sites, 0 missing, and the 0 readings (`:87-91`)
    - The per-key figures (`:93`): `d` 77 (66 + 11), `flex` 72, `justify-content` 36, `align-items` 30, `align-content` 36, `align-self` 36, `order` 48, `hstack` 1, `vstack` 1, and 108 `align` rows (6 sites and 102 repeats)
    - The red counts 7, 9, 1, 5, 1, 3, 14, 1, 8, 12, 2, 2, and 1 (`:103-112`, `:148`)
    - "2 failed | 16 passed" and "4 failed | 14 passed" (`:133-134`)
    - "109 passed, 1 skipped" (`:185`, `:199`)
    - "2 files, 6 passed", "3 files, 18 passed", "250 passed", "19 passed", "80 files, 803 passed", "30 files, 72 passed", "65 passed", and "4 files, 152 passed" (`:194-205`)

## Findings outside the claims

- **report-counts.** The report states the growable-set counts listed under claim 8(b), which breaks `AGENTS.md` § Writing ("NEVER state a count"). The claims file directs recording these as a finding. **Right:** retain the report as returned, and write no count in the successor report.

## Attacked and held

- **Guide accuracy.** The claim that a print class beats every responsive class of the key holds. The print block follows the whole display walk (`_display.scss:7-15`), and only the release's `display` entry sets `print: true`.
- **The `-9999` value.** "`order-first` resolves Veneer's `-1` rather than Tailwind's `-9999`" matches the installed compiler.
- **Stacks against the release.** The `.hstack` and `.vstack` declarations match the release byte for byte, and they are normal in `components`. The guide's "an unlayered rule of your own" override is true for normal declarations in a layer.
- **The vertical-align walk.** Walking the breakpoints for a non-responsive entry looks like extra machinery. It is the mixin contract R4 fixes (`_mixins.scss:352`, `:363`), not a defect.
- **The Files rows.** The rows do not follow barrel order. The table is not barrel-ordered elsewhere either (icon-link sits before breadcrumb), so the placement is a recorded choice, not drift.

## Referrals

- **To the objective lane.**
  - The new `CaptureStem` drops a comma. `buildStem` instead turns any run of characters that are not letters or digits into one hyphen (`tests/setup.ts:43-48`). They disagree for a comma with no space after it, such as `'A,B'`: the type yields `ab` and the run time yields `a-b`. The doc comment bounds the rule to the registry's names. Rule whether the type must model the run-time rule instead.
  - Rule on claims 2, 3, and 6 from executed evidence.
- **To the Orchestrator.**
  - R12 names each region for the release's documentation page, and the release has its own Vertical alignment page. The family record places the vertical-alignment key in the Display region and section. The record wins over the brief, so this is not the unit's defect. Confirm the placement or rule it.
  - The claims file itself states counts: "the twelve untracked owned files" and "rulings 1 to 15".

VERDICT: FAIL 2, 3, 4, 6, 7, 8; outside the claims: report-counts