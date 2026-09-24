**Lane held: subjective** (Opus 5.5). The unit under audit was also written on Opus 5.5.

**Dispatch note.** The brief says to read base files with `git -C … show`, but this lane has no shell. `ufl-status.txt` shows every non-owned file unmodified, so I read base files directly from `/home/user/veneer-ufl`.

## Per-claim verdicts

**1. Scope and delta — UNRESOLVED**
- The scope clauses held:
  - `ufl-status.txt:1-17` lists exactly the brief's Owned set. The one modified path is `LinkSection.test.ts`.
  - `ufl.diff` carries those 17 paths and no others.
  - Every file in `ufl-shared.patch` is on the brief's Shared list (`b-utilities-ufl-brief.md:96-110`).
  - `ufl-routeb.patch` touches only `_mixins.scss`, `_card.scss`, `fixtures/mixins.scss`, `mixins.test.ts`, and the owned `_stretched-link.scss`. Its blob `e56d021` matches `ufl.diff:167`.
  - Neither patch touches a vendored file, `src/browser/**`, `src/core/**`, `package.json`, or `README.md`.
- Not settled: whether both patches apply cleanly (`git apply --check`) on a fresh extract of `2a3f223`. The only evidence is the report (`b-utilities-ufl-report.md:121-122`).
  - I checked hunk contexts by hand at `index.scss:74-89`, `Showcase.ts:16-33`, `conformance.test.ts:504-510`, `_card.scss:140-146`, and `_mixins.scss:22-25`. All match.
  - To settle it, run `git apply --check` on the shared patch, then on `ufl-routeb.patch`, over a fresh `git archive 2a3f223` extract. Referred to the objective lane.

**2. The cascade against the oracle — CONFIRMED**
- All three utility partials write their entries only through `utility` (`ufl.diff:198-209, 223-236, 252-256`). No partial writes `!important` by hand, and none declares a custom property.
- Both helpers are normal rules in `@layer components` (`ufl.diff:156-165, 172-186`).
- Barrel placement matches the release:
  - Helper order: clearfix before icon-link; stretched-link after stacks and before vr (`ufl-shared.patch:491-497`).
  - Map order: float, object-fit, overflow (`ufl-shared.patch:500-502`).
  - The order case maps `overflow-x` and `overflow-y` in map position (`ufl-shared.patch:655-656`).
- `ufl-gate-conformance2.log.txt:10-11` shows 22 passed with the ledger rows applied. That gate refuses unrecorded departures and additions, and priority mismatches (`tests/conformance.test.ts:246-259, 292`).

**3. The proofs distinguish their mutations — CONFIRMED**
- Every named log exists under `ufl-instruments/` with site, command, exits, summary, and failing cases. The failing-case line numbers match the diff (for example float escape `127:2` = `ufl.diff:943`; object-fit priority `138:2` = `ufl.diff:1098`).
- Per mutation, whether the assertions distinguish it:

| Mutation | Case that catches it | Distinguishes? |
| --- | --- | --- |
| clear-omitted | host height `60` vs `0` (`ufl.diff:658-659`) | yes |
| infix-omitted | boundary value vs resting value, sm to xxl; xs correctly stays green | yes |
| inset-omitted | four corners `'a'` vs `p`/`div` (`ufl.diff:744-747`) | yes |
| axis-swapped | every `OVERFLOW_AXIS_CASES` row pairs different values (`ufl-shared.patch:1071`) | yes |
| fill-for-cover | cover's paint signature differs from fill's (`ufl-shared.patch:955-964`), plus the computed value | yes |
| priority-dropped | `['auto','scroll']` on `.probe.overflow-x-auto` (`ufl.diff:1262`) | yes |
| layer-moved | the escape case only | yes, and correctly bounded: an important declaration in `components` still beats an unlayered normal rule |
| line-written, important-dropped | the consumer and profiles cases in `tests/service/tailwind/` | yes |

**4. D46 and the `cover-block` mixin — CONFIRMED**
- The mixin writes `position: absolute` and zero on all four physical edges (`ufl-routeb.patch:11-17`).
- `.card-img-overlay` (`ufl-routeb.patch:35`) and `.stretched-link::after` (`:96`) include it, in the release's declaration order. They resolve the release's declarations (`node_modules/bootstrap/dist/css/bootstrap.css:4476-4484, 7169-7177`).
- The fixture case (`ufl-routeb.patch:59-74`) reads `position`, plus the box's left, top, width, and height against its containing block. Named mutation: drop `right: 0`. The empty absolute box then shrinks to width 0, and `toEqual([...,200,...])` fails. Dropping any other edge fails the same way (height 0, or the box sits at the far edge). The assertions distinguish every single-declaration mutation.
- With Route B applied:
  - `ufl-routeb-setup.log.txt:47-48` shows the duplication gate green. The single failure is the `setupServer` timeout.
  - `ufl-routeb-styles.log.txt:214-215` shows 41 passed.
- D46 holds under `.claude/rules/styles.md:45-48`:
  - Covering the containing block is one decision. Its zeros are not release measures, so a copy that drifted would stop covering the box. That is the rule's "divergence is a defect" test.
  - The tree already shares this kind of technique through mixins with literal values: `box-reset`, `border-reset`, and `image-size` (`src/styles/_mixins.scss:25-28, 43-47, 65-69`).
  - The gate itself names `_mixins.scss` as the repair (`tests/setupServer.ts:715-717`).
  - No other partial writes the whole covering block. Carousel and `.fixed-bottom` write partial edge runs and correctly stay inline.
- Mixin name and shape: `cover-block` is the verb-noun form `styles.md:61` prescribes, and it fits the two-word family (`nav-list`, `pad-gutters`). The one-line comment naming its callers follows the precedent of `input-text` and `nav-list`.

**5. Tailwind shared names — CONFIRMED**
- `ufl-shared.patch` touches none of `tests/setup.css`, `consumer.css`, or `preflight.css`. It appends the shared names to `markup.html` (`:682-696`).
- `float-start` sets the same `float` longhand in both libraries, unlike the `start-*` offsets. It correctly leaves the line (guide patch `:230-236`).
- `ufl-gate-service.log.txt:10-11` shows 18 passed.
- Both negative controls read red:
  - `ufl-mutation-line-written.log.txt:11-16` (the written copy's equality case and the derivation case).
  - `ufl-mutation-important-dropped.log.txt:25-28` (the derivation case and the partial-coverage case).

**6. Sections, specimens, and registries — CONFIRMED**
- Each section is a one-line `SpecimenSection` subclass. Its TSDoc matches `PositionSection.ts` word for word in shape (`ufl.diff:87-95, 114-122, 141-149`).
- Each proof asserts no `[style]` element in its region (`ufl.diff:287, 410, 531`).
- The case populations come from `FLOAT_VALUES`, `OVERFLOW_VALUES`, `OBJECT_FIT_VALUES`, or the rendered DOM.
- Construction order, barrel, `Showcase.test.ts`, `index.test.ts`, and portfolio rows agree (`ufl-shared.patch:26-28, 198-200, 531-543, 555-577, 606-608`).
- The capture rows each read a property a rule sets on a box a computed style can reach (`ufl-shared.patch:733-780`):
  - The two generated-box keys read a neighbour's property. This follows the visually-hidden `:has()` precedent (`tests/setup.ts:486-491`), and the new remark says so.
  - The order case's helper and entry paths agree with the barrel (`tests/conformance.test.ts:537-566`).
- Specimen names follow the landed pattern (`Position values`, `Edge offsets`). Region names match the release's documentation pages.

**7. The guide — CONFIRMED**
- Every added sentence I checked is true of what ships:
  - Float: physical left under `dir="rtl"`, proved at `ufl.diff:879-886`.
  - Infix order at 768px, proved at `ufl.diff:912-916`.
  - Overflow: `visible` beside another value computes to `auto`, proved at `ufl-shared.patch:1078-1087`.
  - The object-fit behaviour of each value, and the photographed fixture sizes (`ufl-shared.patch:913-926`).
  - Stretched link: stacking level `1`, and a `.z-2` sibling stays reachable (`ufl.diff:775-784`).
  - The showcase frame sentence against the overflow specimens' `viewport` markup.
- The departure bullet repeats the landed prefixed-alias wording (`guides/veneer.md:2709-2711, 2753-2755`).
- Every added code token is followed by a noun.
- Nothing claims that a class moves when a token is retuned.
- The `#### object-fit` table is proved by `ufl-gate-conformance2.log.txt`.

**8. Law and report — BROKEN**
- Input: added TSDoc at `ufl-shared.patch:946-947`: "The last region sits where every value paints both pictures".
  - This names a list item by its position, which `AGENTS.md` § Writing forbids.
  - "both pictures" counts a set that can grow (`OBJECT_FIT_FIXTURE.pictures`).
  - Added comment at `ufl-shared.patch:1089`, "across the two pictures", is a count.
  - Smallest fix: name the region by where it lies ("the region centred low in the box, at x 52 and y 54"). Replace "both pictures" and "the two pictures" with "the wide and the narrow picture".
- The report breaks the code-token-noun rule, for example "carries `.clearfix`" and "is an `.alert`" (`b-utilities-ufl-report.md:112`).
- Otherwise held:
  - No `any`, no non-null `!`, and no suppression. The only `as` is `as const` (`ufl.diff:731`; `ufl-shared.patch:1065`).
  - No mock or fake; no nested function beyond direct callbacks.
  - The tables sit in `setupStyles.ts`, are frozen, and are bound by derivation from the inventory and the fitting rules (`ufl-shared.patch:1032-1168`).
- Counts the report states, for the record:
  - "five owned partials" (`:9-10`): no run behind it.
  - Diffstat "35 insertions and 1 deletion" and the per-file line counts (`:36-38`): run named, output not retained.
  - "62 inventory selectors and 62 cascade selectors", "All 60 utility rules" (`:48-49`): `ufl-count.mjs` output not retained.
  - "6 failed", "3 failed", "9 failed", "10 failed", "5 failed", "4 failed", "2 failed" (`:55-61, 85-86`): logged.
  - "It has 30 rows" (`:98`): no run behind it.
  - "22 passed", "18 passed", "43 passed", "17 passed", "41 passed" (`:42-43, 107, 149-153, 162`): logged.
  - "266 passed" (`:154`): log overwritten.
  - "5 of 7 declarations" (`:162`): logged in `ufl-gate-setup2.log.txt:84-113`.
  - "4 `dropped` departure rows and 1 declaration addition" (`:162`): no log.
  - "the eight scenarios" (`:172`): no run behind it.

## Findings outside the claims

**F1 — The Object fit copy credits the value change to the wrong element.**
- Where: `OBJECT_FIT_COPY.paragraph` says "then a tall picture whose box changes its value at the md boundary" (`ufl-shared.patch:151`).
- What is wrong: the `object-fit-contain object-fit-md-cover` classes sit on the `img`. The `.ratio.ratio-21x9` box changes nothing (`ufl-shared.patch:183`). "its" can also be read as referring to the box.
- Why it matters: showcase copy is what a reader acts on, and the sentence names the wrong actor.
- What right looks like: "…then a tall picture that switches from contain to cover at the md boundary." The section proof reads the paragraph by reference, so no test changes.

## Attacked and held

- **Alert close level and the stretched link level.** The release derives the alert's dismiss-close level as `$stretched-link-z-index + 1`. Veneer writes `2` at `src/styles/components/_alert.scss:53` and `1` in the helper, both release literals. The relationship holds, and D46 does not require the two to be tied together.
- **Other edge runs stay inline.** Carousel controls and indicators and `.fixed-bottom` write partial edge runs (`_carousel.scss:91-94, 151-155`; `_position.scss:15-19`). They are neither the covering technique nor gate hits.
- **`inset: 0` instead of the mixin.** Correctly refused, because it would add departure rows (report `:162`).

## Referrals

- **To the objective lane:**
  - **Route B has no failing-first run.** `ufl-mutation-inset-omitted.log.txt` mutated the inline block that Route B deletes. Run: delete `right: 0;` from `@mixin cover-block` with `ufl-routeb.patch` applied. The mixins cover case (width 0), the stretched-link corner cases, and the card overlay case must go red.
  - **Hand-listed float classes.** `FloatSection.test.ts` lists `.float-start, .float-end, .float-md-end` (`ufl.diff:309`) and `.float-start, .float-end` (`ufl.diff:349`) instead of deriving them. A specimen that gains another float class would escape the clearfix-host and containment checks.
  - **Claim 1's apply check**, as stated under claim 1.
- **To the Orchestrator:**
  - **D46 has no home in the styles rule.** Its general sentence (a block of release measures "stays inline") is not in `.claude/rules/styles.md`. It also conflicts with the `findDuplication` floor, which refuses any overlap of at least 5 declarations over half the smaller block, measure or not (`tests/setupServer.ts:707-717`). If D46 binds beyond this unit, land it in `styles.md` § Prohibitions and reconcile the gate's doc block.
  - **Region order needs a ruling.** The showcase constructs Float, Overflow, Object fit (`ufl-shared.patch:26-28`). That departs from the release's docs order, from the unit's own barrel order (`:500-502`), and from the landed within-unit order (Display, Flex; Position, Sizing, Visibility). R12's "in barrel order" does not settle it.

## Non-blocking observations

- The `cover-block` comment opens "Places a box". Sibling mixin comments open "Emits …".
- In `cover-block`, "block" can be misread as the logical block axis.
- The unit's vocabulary counts `none` among the float "sides" (`FLOAT_VALUES`, `Float sides`, "the `float-*` sides").
- The stretched-link proof sentence separates the icon-link proof sentence from its reduced-motion follow-up (`ufl-shared.patch:274-278`).
- Reflowed guide lines leave "The" alone on a line (`:433`, `:448`).
- The `cleared-floats` capture row leads its selector with `.clearfix` but reads `float` from `.float-start`. The registry convention says a selector leads with the class whose rule the key reads (`tests/setup.test.ts:145`). The regex permits it, and the new remark explains it.

VERDICT: FAIL 1, 8; outside the claims: F1
