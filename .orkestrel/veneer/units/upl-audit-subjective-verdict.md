# UTIL-PLACEMENT (`upl`) audit, round 1: reviewer verdict

I held the subjective lane, as `reviewer` on Opus 5.5, with a clean context and read-only access. The audit found real defects: claims 4, 7, and 8 are BROKEN and claim 3 is UNRESOLVED. The claims file is `/home/user/scaffold/.orkestrel/veneer/units/upl-audit-claims.md`. Unless a line names another file, the citations below point into `/home/user/scaffold/.orkestrel/veneer/units/` or `/home/user/veneer-upl/`.

## Per-claim verdicts

**1. Delta and scope: CONFIRMED.**
- `upl-status.txt` lines 1 to 17 hold the modified `_shell.scss` file and the untracked partials, sections, and proofs, and nothing else.
- The file headers in `upl.diff` name the same paths and no others.
- Every file header in `upl-shared.patch` (lines 1, 14, 172, 199, 208, 323, 418, 491, 530, 566, 634, 642, 650, 658, 692) is a file the brief's Shared row names (`b-utilities-upl-brief.md:82-97`).
- `upl-consumer.patch` touches only `tests/service/tailwind/consumer.test.ts`.
- No hunk touches a vendored file, another UTIL unit's file, `_mixins.scss`, `_tokens.scss`, `src/browser/**`, `src/core/**`, the oracle, `package.json`, `README.md`, or `ROADMAP.md`.
- The removed lines are all of these, and nothing else:
  - the § Files realignment (`upl-shared.patch:698-781`);
  - the exclusion-line copies (640, 648, 656, 878, 887);
  - the § Tailwind paragraph rewrap (896-899);
  - the moved "and" in the § Tests link lists (1149, 1159);
  - the consumer union reading (`upl-consumer.patch:7-51`).

**2. The partials and the cascade: CONFIRMED.**
- I read the source directly:
  - `src/styles/utilities/_position.scss` writes every entry through `utility` in one `breakpoint-each` walk.
  - `_sizing.scss` writes its entries in map order: w, mw, vw, min-vw, h, mh, vh, min-vh.
  - `_visibility.scss` passes `''` as the class.
  - `_visually-hidden.scss` writes by hand in `@layer utilities`, with the `&:not(caption)` and `*` branches.
  - `src/styles/components/_position.scss` writes normal declarations in `@layer components` and reads `var(--vn-stack-fixed)` and `var(--vn-stack-sticky)`.
- The ledger tables at `upl-shared.patch:1036-1090` match the report's rows.
- The built-cascade half is corroborated by `upl-instruments/logs/fresh-conformance.log.txt:11` (`22 passed`). That run covers the presence, ledger, additions, and priority gates.
- The `census.mjs` output itself was not kept. The claim stands on the gate log, not on the census.

**3. The proofs: UNRESOLVED.**
- Most rows hold. Each mutation log in `upl-instruments/logs/` matches the red count in the report, and its failing line numbers match the shipped files. For example, `order-swapped.log.txt:359` cites `sizing.test.ts:111`, and `fixed-top-edge.log.txt:360` cites `components/position.test.ts:21`. The unmutated control is green (`fresh-styles.log.txt:354`, `42 passed`).
- Mutations I checked, and whether the assertions tell them apart:
  - `3: 0`: yes. Level 0 comes later in the document than level 3, so the hit test reads `z-0` first (`position.test.ts` stacking case).
  - `visible: inherit`: yes (`visible-hidden.log.txt:364`).
  - Helper moved to components: yes, through `.visually-hidden.w-100` (`helper-in-components.log.txt`).
- Two precedence rows in the report have no retained log, so they rest on the writer's report alone:
  - the visibility "map order reversed" mutation (`b-utilities-upl-report.md:136`);
  - the normal-helper `position: fixed !important` mutation (`:141`).
- To settle it, run both mutations through `mutate.py` against the shipped files and keep the logs.
- `viewport-length.log.txt` is a leftover from an earlier revision: it cites `sizing.test.ts:64` and `:108`, where the shipped cases sit at `:60` and `:111`. The report does not cite it.

**4. The sections and the specimens: BROKEN.**

What holds:
- The sections are `SpecimenSection` subclasses fed by `<KEY>_COPY` and `<KEY>_SPECIMENS` (`upl.diff:20-28`, `48-56`, `76-84`).
- The specimen names match criterion 5.
- No specimen markup carries `style`, and the section proofs assert `[style]` null (`upl.diff:337`, `577`, `755`).
- Specimen fit against the release pages is good. `Position values`, `Edge offsets`, and `Centered translation` map to the release Position page's sections. `Stacking levels` maps to the Z-index page. `Fixed bars` and `Sticky bars` map to the Position helpers page. `Skip link` reproduces the Visually hidden page's example.

Failure: the `Maximum sizes` specimen puts a `.vw-100` box outside the frame.
- Where: `upl-shared.patch:128`, `'<p><span class="placeholder vw-100 mw-100" aria-hidden="true"></span></p><div class="viewport">…'`.
- What is wrong: family ruling 8 says "`.vw-100`, `.fixed-*`, and `.sticky-*` render inside a shell `.viewport` frame" (`b-utilities-family.md:67-69`). The guide paragraph repeats that rule (`upl-shared.patch:1125-1126`). The report's matrix and § Deviations do not record the departure (`b-utilities-upl-report.md:109`, `:272-348`).
- Why it matters: the shipped showcase contradicts both the family ruling and the guide sentence that describes it. The `.mw-100` cap is the only thing keeping that box off the page's width, and nobody ruled on that choice.
- What right looks like: move the width-cap line inside the specimen's existing `.viewport` element, beside the height cap. For example, `<div class="viewport"><p><span class="placeholder vw-100 mw-100" aria-hidden="true"></span></p><div class="h-50">…</div></div>`. Then update the `SIZING_SPECIMENS` remark and the § Showcase sentence to match. The frame is full-width, so `.mw-100` still caps at the line.

Second part, UNRESOLVED: the frame mutation logs come from a superseded revision of the section proof.
- `frame-contain-dropped.log.txt:16,28`, `frame-overflow-auto.log.txt:15,28`, and `frame-height-unbounded.log.txt:15,47,57` cite `PositionSection.test.ts:87`, `:143`, `:156` (`reading.bars`), `:160` (`reading.dialog`), and `:187`.
- The shipped file has its cases at `:73` and `:183` (`/home/user/veneer-upl/tests/app/browser/sections/PositionSection.test.ts`). It has no `bars` or `dialog` reading, and its first frame assertion is `reading.scrolled` (`upl.diff:417`).
- Mutations named, judged from the shipped assertions:
  - `contain` dropped: `origin` would read nonzero.
  - `overflow: auto`: `scrolled` would read `[50, 0]`.
  - Height unbounded: the `inset` entry for the dialog would read false.
- Those derivations say each mutation distinguishes, but no retained run binds them to the shipped proof.

**5. The registry: CONFIRMED.**
- The patch adds a `CaptureSubject` member for each specimen (`upl-shared.patch:214-226`) and one resting row per specimen (`234-311`).
- It adds the driven row `skip-link-focus` (`319`) and no `CaptureState` member.
- Each selector resolves inside its own specimen. I checked `.position-relative:has(> .visually-hidden)` against `upl-shared.patch:162`, `…visually-hidden-focusable` against `:167`, and `.bottom-0.end-0` against the `Edge offsets` markup.
- The journey case focuses the link directly (`upl-shared.patch:600`).
- Mutation: dropping both focus pseudo-classes leaves `revealed` at 1. Then `expect(revealed).toBeGreaterThan(1)` (`:615`) goes red, so the assertion distinguishes it.
- The convention these rows introduce is undocumented; see F1.

**6. Tailwind: CONFIRMED.**
- The exclusion line, both fixtures, and both recipe fences carry `container end-0 end-50 end-100 start-0 start-50 start-100 table` (`upl-shared.patch:641`, `649`, `657`, `879`, `888`).
- `markup.html` gains one element per shared name (`664-691`).
- The consumer case reads each element on its own name's longhands (`upl-consumer.patch:16-23`).
- Negative controls:
  - `w-25` put onto the line: `line-gains-w-25.log.txt:11`, `4 failed`.
  - The mixin's `!important` dropped: `importance-dropped-service.log.txt:11`, `3 failed`, including the importance branch at `:81`.
  - The `start-*` names taken off the line: `start-off-line.log.txt:11`, `4 failed`.
- Each control changes one name's status on the line or its importance, which the equality and profile cases read. So the assertions distinguish each one.
- The per-name longhand table itself is the writer's own reading. It holds because the profiles proof enforces the emitted set (`fresh-service.log.txt:24`, `18 passed`).

**7. The guide and the shared patch: BROKEN.**

Failure 1: several code tokens carry no noun.
- The rule: ruling 11 requires "every code token with its noun" (`b-utilities-family.md:80`), and the claim restates it. `.claude/rules/writing.md` § Code tokens says "follow it with a noun".
- These selector tokens appear bare as a subject or object:
  - `upl-shared.patch:929`: "`.position-absolute.position-relative` resolves `absolute`"
  - `:930`: "`.translate-middle.translate-middle-x` resolves…"
  - `:934-935`: "`.top-50` places a box…, and `.start-50` half its width"
  - `:937`: "leaves `.start-0` on the left edge"
  - `:943`: "`.sticky-md-top` sticks from a 768px viewport"
  - `:975`: "`.w-50` resolves half…"
  - `:978`: "`.vw-100` is as wide as the viewport"
  - `:985`: "`.w-25.vw-100` resolves the viewport's width"
  - `:1016`: "`.visually-hidden.w-100` resolves…"
  - `:1017`: "`.visually-hidden.position-relative` stays absolute"
- What right looks like: "the `.top-50` class places a box…", and "an element carrying the `.position-absolute` and `.position-relative` classes resolves the `absolute` value".
- The landed `### Gap utilities` section has the same form. That is the precedent the unit followed; it is not a license. See the referrals.

Failure 2: the § Showcase frame paragraph (`upl-shared.patch:1125-1134`) has three problems.
- It opens on region order ("The Position, Sizing, and Visibility regions follow the component regions."), not on the frame, which is its key point. The § Showcase opening paragraph already owns region order, and this enumeration is one each later utility unit would have to edit. Drop the sentence, or write "Each utility region follows the component regions", and lead with the frame.
- "A fixed, sticky, or viewport-sized specimen renders inside the shell's `viewport` frame" is false while `Maximum sizes` stands (claim 4). It also leaves out the specimens that sit in the frame for its bounded height (`Edge offsets`, `Centered translation`, `Stacking levels`, `Height steps`). State the set that actually ships.
- The guide names the shell's other hook "the `control` class" (`guides/veneer.md:4189`), while this paragraph writes "the shell's `viewport` frame" and "`scroller` box". Write "the shell's `viewport` class" so the reader knows it is a class name.

Failure 3: the § Tailwind "because" clause (`upl-shared.patch:908-910`) leaves out its cause. The container's width matters only because a width-declaring branch name, `w-*`, would add `width` to a reading shared across elements. As written, the reader can't connect the `.container` element to the reading's scope. Say that a longhand another name declares can move for a reason outside the equality.

Smaller wording fixes:
- `:1106` says "each resolved scheme" of the position values. Write "each resolved value".
- `:976-977` says "sizes a box by its content over a size of the element's own". Write "sets aside a width or height the element declares, so the box takes its content's size".
- `:998-999` says "one inside an invisible ancestor included". Write "including a box inside an invisible ancestor".

Not evidenced in my lane: the three-way application of `upl-shared-index.patch`. No log was supplied. The `git apply --check` exits are evidenced (`fresh-2.log.txt:1-4`).

**8. Law and report: BROKEN.**

Failure 1: data tables and case matrices sit in test files. `.claude/rules/tests.md:185-187` says "Export every reusable … constant … from setup files" and "Data tables and case matrices belong in a setup file at any size". The proofs declare these locally:
- `tests/src/styles/utilities/sizing.test.ts:9` `SIZE_STEPS` and `:18` `CONTAINER`;
- `tests/src/styles/utilities/position.test.ts:8` `POSITION_VALUES`, `:11` `EDGE_STEPS`, `:20` `CONTAINER`, and `:23` `BOX`;
- `tests/src/styles/utilities/visually-hidden.test.ts:14` `CONTAINER` and `:18-19` `HIDDEN_PROPERTIES` and `HIDDEN`;
- `tests/src/styles/components/position.test.ts:11-12` `SCROLLER` and `SCROLLED`.

Related duplication:
- `CONTAINER` is declared in three files with different values, which `tests.md:184` calls a near-duplicate defect.
- The infix list `['sm', 'md', 'lg', 'xl', 'xxl']` is typed by hand at `sizing.test.ts:90`, `position.test.ts:174`, and `visibility.test.ts:44`. `tests/setupStyles.ts:1551` already exports `GRID_BREAKPOINT_CASES`, and the sibling proof `components/position.test.ts` imports it.
- The focused `Start` button fixture is repeated at `VisibilitySection.test.ts:71` and `visually-hidden.test.ts:65`, which `tests.md:183` says to extract.

The brief grants `tests/setupStyles.ts` for case tables (`b-utilities-upl-brief.md:86-87`), and the report says it wrote no patch there (`b-utilities-upl-report.md:352`).

What right looks like: a `setupStyles.ts` patch that exports the step, edge, position-value, and hidden-reading tables and one container fixture per shape, and derives the infix names from `GRID_BREAKPOINT_CASES`. Add a `setupBrowser.ts` builder for the focused start control. The proofs then import all of these.

Failure 2: the consumer patch adds a nested function assignment.
- Where: `upl-consumer.patch:16`, `const properties = (name: string): readonly string[] => longhands.get(name) ?? []` inside the test body, around `consumer.test.ts:192` after the patch.
- What is wrong: the No nested functions law in `AGENTS.md` excepts only a callback passed directly and a function returned directly. This is neither.
- What right looks like: inline `longhands.get(name) ?? []` at its uses (patch lines 22, 33, 42), or export a named reader from the setup module.

Failure 3: comments state counts.
- `src/styles/utilities/_position.scss:4` says "which the four edge entries share". Write "which the edge entries share".
- `src/styles/utilities/_sizing.scss:12` says "the one-step maps". Write "the single-value maps", or name the values.
- The rest holds: I found no `any`, no `as` beyond generic type arguments, no `!`, no suppression, and no mock, and the SCSS repeats no block the release does not repeat.

Counts the report states, listed for the record. Test-run readings with their commands (`42 failed (42)`, `18 passed (18)`, and the rest) are measurements and are excluded. Each line cites `b-utilities-upl-report.md`:
- `:7-8` "two criterion readings", "one named mutation"
- `:36` "shows 17 entries"
- `:44` "15 files, 693 insertions, 95 deletions"
- `:75-76` "19 keys missing", "27 unrecorded rows"
- `:79` "6 × `width: 1140px became 1280px`"
- `:86` "63 selectors … and 63 emitted"
- `:88` "the 49 utility and visually-hidden selectors"
- `:89` "The 14 `.fixed-*` and `.sticky-*` helper selectors"
- `:100` "out of 42 (or 13)"
- `:223` "24 `sticky` rows, and 27 departure rows in all"
- `:250` "the five owned proofs"
- `:251` "the three section proofs"
- `:267-268` "4 files", "the four variants"
- `:269` "63 of 63"
- `:333` "13 `declared` rows"

## Findings outside the claims

**F1: the capture registry's remark does not state the hidden-subject host convention.**
- Where: `tests/setup.ts:378-381` (the `CASCADE_KEYS` remarks, at `e4e6a40`) names a host region only for a key that resolves `display: none`.
- What is wrong: the patch rows at `upl-shared.patch:300-311` add a different form, `.position-relative:has(> …)`, for a key that clips to one pixel. They read `position`, a property no class of the subject declares. No remark sentence records this.
- Why it matters: the remark is the one home of the registry's framing law. The next unit that registers a hidden subject has to reverse-engineer these rows.
- What right looks like: one remark sentence. A key that clips its element to one pixel names its positioned host through `:has(> …)` and reads the host's `position`. The hidden box itself is read in the helper's cascade proof.

**F2: the Orchestrator's ruling on § Deviations item 1 is right on intent and wrong on the patch as written.**
- The per-name reading fixes a real proof defect. But the accepted `upl-consumer.patch` carries the nested function described under claim 8 (`upl-consumer.patch:16`).
- Re-issue the ruling against a corrected patch.

## Attacked and held

- **Ruling item 2 is correct.** `.visually-hidden:not(caption)` has specificity (0,1,1) and beats `.position-relative` at (0,1,0) in either layer. `.visually-hidden.w-100` is the element that distinguishes the placement (`visually-hidden.test.ts` case "sits ahead of every utility").
- **Ruling item 3 is correct.** `:focus-within` matches the focused element itself.
- **Rulings items 4 to 7, 9, and 10 hold.** The frame case's `height.extent > height.room` assertion is the control that stops "the frame refuses a scroll" from being vacuous.
- **The inline `style` on the dialog stand-in is acceptable.** It is a fixture of the frame case, not a specimen (`upl.diff:352-359`). M3 governs specimens.
- **The `Visually hidden` specimen showing one class is acceptable.** R12's "never one class alone" is nominally at odds with it, but the brief fixed the specimen names (criterion 5), so the unit is not at fault.
- **The Position region grouping is acceptable.** It folds in the Z-index page and the Position helpers page, and the brief and the family table fixed the regions.
- **The skip link's `href="#main"` is acceptable.** It follows the link-specimen precedent, although the guide says the shell's `main` element carries no id (`guides/veneer.md:4190`).

## Referrals

- **To the objective lane:** re-run the frame mutations against the shipped `PositionSection.test.ts` (claim 4), and the visibility map-order and normal-helper `!important` mutations (claim 3). Evidence the `upl-shared-index.patch` three-way application (claim 7).
- **To the Orchestrator:**
  - The `.scroller` shell class duplicates `h-100 overflow-auto` once UTIL-FLOW lands. Name a unit to retire it.
  - The ruling-8 name `.viewport` shares the word "viewport" with the viewport that `.vw-100` and `.vh-100` measure, so a box sized to the viewport overflows a `.viewport` element. That makes the guide's frame sentence hard to read on first pass. Consider renaming the class before the overlay family depends on it.
  - The landed `### Gap utilities` section uses the same bare-token form as failure 1 under claim 7, for example "`.gap-*` sets both axes" (`guides/veneer.md:1739`). It needs its own carrier.

VERDICT: FAIL 3, 4, 7, 8; outside the claims: F1, F2