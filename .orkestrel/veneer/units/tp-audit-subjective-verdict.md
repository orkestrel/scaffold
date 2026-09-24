**Lane: subjective, on Opus 5.5.** The unit under audit was also written on Opus 5.5.

## Per-claim verdicts

**1. Scope and delta — UNRESOLVED**
- **What holds:**
  - `tp-status.txt:1-8` lists exactly the eight owned paths in `b-modal-tp-brief.md:124-127`, and `tp.diff` carries only those files.
  - `tp-shared.patch` touches only files the brief lists as Shared (`b-modal-tp-brief.md:129-143`) plus the granted `tests/src/styles/fixtures/mixins.scss` (`tp-shared.patch:1105-1117`).
  - The patch adds nothing to `src/browser/**`, `src/core/**`, `tests/fixtures/**`, `package.json`, `README.md`, or a vendored file.
  - The stacking paragraph is untouched: the hunk at `tp-shared.patch:305-309` changes the table row only. The barrel, mixin, and showcase hunks carry no TOAST, MODAL, or OFFCANVAS rows (`:483-484`, `:449-474`, `:23-24`).
- **Unsettled:** only the writer's report (`b-modal-tp-report.md:68`) says the patch applies to a fresh extract. To settle it, run `git apply --check tp-shared.patch` on a fresh `git archive 2a3f223` extract.

**2. The partials against the oracle — CONFIRMED**
- **Attack:** I compared the partials line by line with `node_modules/bootstrap/scss/_tooltip.scss:1-119`, `_popover.scss:1-196`, and `mixins/_reset-text.scss:1-17`. They match:
  - Each selector, declaration, and declaration order.
  - Each automatic placement written with `@extend` of its explicit class (`_tooltip.scss:107-109`, `_popover.scss:127-129`).
  - The rung bindings (`_tooltip.scss:44`, `_popover.scss:44`).
  - No `!important`.
- **Colours:** the only colour keyword is `transparent`, which the landed partials already use (`_nav.scss:73`, `_navbar.scss:108`).
- **Gate:** the `declared` rows for `text-align` appear in both guide tables (`tp-shared.patch:327,342`). The ledger gate over the expanded compile ran green (`tp-gates.log.txt:9-11`).

**3. The proofs distinguish their mutations — UNRESOLVED**
- **Executed mutations — each has a log entry and its assertions distinguish it:**

  | Mutation | Case that catches it | Log |
  | --- | --- | --- |
  | Literal `1080` / `1070` | The `1234` wrapper assertion (`tooltip.test.ts:69`, `popover.test.ts:73`) | `tp-mutations.log.txt:3-16` |
  | `reset-text` call dropped | The `readStyle(tip) !== readStyle(declared)` filter | `:17-30` |
  | One mixin declaration dropped | The `reset !== declared` filter | `:31-44` |
  | `.tooltip.show` rule dropped | The `0.9` opacity assertion | `:45-52` |
  | Top/bottom and end/start arrow entries changed | Per-placement edge and colour readings | `:53-73` |
  | Wrong `@extend` side | Explicit-versus-automatic equality with a distinctness control | `:74-87` |
  | Header strip dropped | `::before` content, width, and colour | `:88-95` |
  | `:empty` rule dropped | `display` is `none` versus `block` | `:96-103` |
  | Literal fill | The island retune assertions | `:104-119` |

- **Wording drift:** the R19 matrix says "the top and bottom entries swapped" and "the end and start entries swapped" (`b-modal-tp-report.md:122,125`). The executed runs changed one entry each (`tp-mutations.log.txt:55-56,67-68`).
- **Unexecuted mutations:** the T-box and P-box mutations are named but not executed (`b-modal-tp-report.md:121,125`).
  - Reading their assertions, a literal inset or text size would fail the density and type retunes (`tooltip.test.ts:138-146`, `popover.test.ts:128-140`).
  - With no log entry, note 1 (rule 3) makes both cases unevidenced. To settle them, run both mutations and retain their log entries.

**4. The `reset-text` mixin — CONFIRMED**
- **Name:** `reset-text` fits the verb-noun form in `.claude/rules/styles.md` § Naming. It matches the landed D46 `cover-block` mixin and the release's own mixin name.
  - The older `border-reset` and `box-reset` mixins (`_mixins.scss:43,65`) reverse the word order. They are the outliers, and this unit is not the one to fix them.
- **Shape:** no parameter and no `@content`, the same as the release. It reads the weight and line-height tokens the way the `input-text` mixin does (`_mixins.scss:51-56`), and it is appended after `utility-variable` (`tp-shared.patch:453-474`).
- **Dropped `left` fallback:** this follows the landed sticky precedent exactly: the `declared` row (`guides/veneer.md:4371,4527`) and the "is absent" bullet voice (`:2863-2867`).
- **Proof:** removing one declaration makes the case fail. The layered staged value then stands on the reset element, the `reset !== declared` filter becomes non-empty, and the `staged === declared` control rules out a false pass. The `text-decoration` and `line-break` runs are logged (`tp-mutations.log.txt:31-44`).

**5. The sections and their specimens — BROKEN**
- **(a) The empty-header decline does not hold under M2.**
  - M2 (`b-modal-design-verdict.md:24`) declines a frame only for a class the engine writes during a transition.
  - The decline's own reason says the plugin never writes an empty header: `template-factory.js:123-125` removes it. So an empty header comes only from markup a developer writes, and M2's first branch applies: "renders in a registered specimen".
  - The family precedent renders `:empty` states: `Badge collapsed` (`constants.ts:1452-1457`) and the caret-only dropdown toggles (`constants.ts:1815-1817`).
  - **Fix:** add an `Untitled popover` specimen (bottom placement, empty header, `id="untitled-popover"`). Add its `CaptureSubject` member and a `CASCADE_KEYS` row keyed to the region, per the landed `display: none` precedent (`tp-shared.patch:659-661`). Loosen the section proofs' `TIP_PLACEMENTS.length` population to include it.
  - **Remove the decline text** from `tp-shared.patch:108-110` (constants TSDoc), `:654-656` (`setup.ts`), and `:290-292` (guide).
- **(b) The `h2` headers depart from the release, and the cited precedent points the other way.**
  - The release template writes `<h3 class="popover-header">` (`popover.js:27`).
  - The accordion precedent is "the release's own `h2`" (`constants.ts:2137-2138`, `AccordionSection.test.ts:68`). The card and carousel specimens keep the release's `h5` (`constants.ts:1327,2101`).
  - **Fix:** write `h3` in `POPOVER_SPECIMENS` (`tp-shared.patch:116-131`) and in the expectation at `PopoverSection.test.ts:60`. Rewrite the TSDoc (`:100-101`) and the guide sentence (`:286-287`) to say each header is the release template's `h3` element.
- **(c) The arrow stand-in sentence is incomplete.** It names only `translate-middle-x` or `translate-middle-y` on the arrow (`tp-shared.patch:48-50,97-98`). The shipped arrow also carries `position-absolute` and `start-50` or `top-50` (`:65`, `:116`). Fix it in the same way as claim 7 (b).
- **What holds:**
  - The names follow M14 modifier-first order. `Right` and `Left` are the release's `placement` option and `data-popper-placement` words.
  - `role="tooltip"` and a unique `id` on every tip. No `aria-describedby`, `data-popper-placement`, or `[style]`. `show` on tooltips only; neither `fade` nor `show` on popovers.
  - Frame containment at 390 and 1280 is asserted and green (`tp-gates.log.txt:6-8`).
  - The section populations derive from `TIP_PLACEMENTS`, per note 1.

**6. Registries and orders — CONFIRMED**
- `CaptureSubject` gains the eight subjects (`tp-shared.patch:633-640`).
- `CASCADE_KEYS` gains one `background-color` row per specimen, on the inner box or the header, never on an arrow (`:666-713`). No `DRIVEN_KEYS` row.
- The following all agree with M14 and M19: `listed` and the order case (`:595,603,611-612,620-621`), the dash-proof set (`:725,733`), `Showcase.ts` after `AccordionSection` (`:23-24`), the `index.ts` rows (`:146-147`), the `Showcase.test.ts` and `index.test.ts` lists (`:512-513,534-555`), and the barrel after `components/close` (`:483-484`).
- The tip tables are frozen and exported, and are bound to the inventory by derivation (`:776-861`).
- The unchanged hanging set rests on the executed containment assertions. The journey run stays the Orchestrator's observation.

**7. The guide — BROKEN**
- **(a) False sentence about the arrow.** "its triangle paints the tip's fill on the side toward the host" (`tp-shared.patch:189`) is false. For `.bs-tooltip-top`, the arrow hangs below the tip (`_tooltip.scss:94`), and the painted `border-top-color` (`:104`) faces the tip, so the triangle points at the host.
  - **Fix:** "its triangle paints the tip's fill on its border facing the tip, so it points at the host". Retitle the ambiguous cases the same way: `tooltip.test.ts:153` ("…toward it") and `popover.test.ts:179`.
- **(b) The stand-in sentences omit the arrow's `position-absolute` and `start-50`/`top-50`** (`tp-shared.patch:197-200,265-268`).
  - **Fix:** "…and the `position-absolute` utility with the `start-50` and `translate-middle-x` utilities, or the `top-50` and `translate-middle-y` utilities, on its arrow".
- **(c) The `fade` class is missing on the Tooltip side.** § Tooltip classes sends the reader to § Compatibility for the `show` move (`:196-198`), but the Tooltip `plugin` row (`:388`) names neither the `show` class nor the `fade` class that `tooltip.js:217,320` sets. The Popover row names both for the same inherited code (`:389`).
  - **Fix:** add "sets the `fade` and `show` classes" to the Tooltip row, and one sentence in § Tooltip classes saying no tooltip rule reads the `fade` class.
- **(d) Positional naming.** "the first … the second" names list items by position (`:252-253`).
  - **Fix:** "the `::before` triangle … the `::after` triangle".
- **(e) "on each side of its host".** This phrase (`:219,283`) describes a host the region never renders.
  - **Fix:** "at each explicit placement".
- **(f) The empty-header decline sentence** (`:290-292`) is carried by claim 5 (a).
- **(g) The 390 width limit has no executed assertion.** The sentence (`:287-288`) matches the report's measurement (`b-modal-tp-report.md:214`), but that probe was deleted, and `.claude/rules/documentation.md` requires an executed assertion for a prose claim about behaviour.
  - **Fix:** in `PopoverSection.test.ts`, assert that the popover width is less than `276` at 390 and equal to `276` at 1280.
- **(h) Two reasons for one decision.** The arrow literals get "no space step resolves to either" for the tooltip (`:191-192`) and "an arrow is geometry" for the popover (`:257-259`), yet the popover sentence says its literals are "kept beside the tooltip's".
  - **Fix:** give the tooltip the geometry reason too.
- **What holds:**
  - The `#### tooltip` and `#### popover` rows equal the measured rows (`b-modal-tp-report.md:75-91`).
  - The plugin obligations match `tooltip.js` and `popover.js`, and both plugin rows end "Owner: J-ENGINE.".
  - The Alias cell, the hint-surface sentence, and the sanitizer sentence hold. The sanitizer sentence matches `template-factory.js:19-26`.
  - Nothing is claimed for `--bs-popover-box-shadow` beyond its absence.

**8. Law and report — BROKEN**
- **What holds:** no `any`, no `as` beyond const assertions, no `!`, no suppression, no mock, and no nested function beyond callbacks passed directly. No helper was added.
- **Bare code token.** The `_mixins.scss` comment ends a clause on a bare token, "resolves `start`," (`tp-shared.patch:458`), which note 1 (rule 1) forbids.
  - **Fix:** "resolves the `start` keyword".
- **Positional naming in comments:** "the first … the second" in `_popover.scss:82-84` and `popover.test.ts:177-178`.
  - **Fix:** name the `::before` and `::after` triangles.
- **Unbacked gate result.** The report gives `test:guides` a result of `Tests 19 passed (19)` (`b-modal-tp-report.md:197`). The retained log has no Tests line for that gate (`tp-gates.log.txt:12-13`).
- **Counts the report states, listed for the record:**
  - "over 359 files" (`:206`)
  - "adds two names to a set" and "twice reported" (`:387`)
  - "one more popover specimen" (`:385`)
  - "The two sections" (`:222`)
  - "16 files changed, 777 insertions(+), 10 deletions(-)" (`:65`, tool output)
  - "the inventory's `media` count is `0`" (`:113`)
  - The diffstat line totals (`:44`)
  - The run summaries (`:72`, `:158-162`, `:168-182`, `:194-204`, `:387`)

## Findings outside the claims

None.

## Referrals

- **To the Orchestrator — who owns the popover fade asymmetry.** The rewritten outside-ledger sentence (`tp-shared.patch:367-369`) routes Elements' popover asymmetry to J-ENGINE. The fade itself is the shared `.fade` rule, and M5 (`b-modal-design-verdict.md:27`) assigns that rule to CROSS-FADE. Should the sentence name CROSS-FADE, J-ENGINE, or both?
- **To the objective lane — a possible duplicate helper.** The section proofs import the `visitBreakpoint` function from `tests/setupBrowser.js`, as `mixins.test.ts` already does. The brief lists `visitBreakpoint` as an installed `@orkestrel/test` export. Does the local helper duplicate it? This pattern existed before this unit.

## Attacked and held

- **Two partials, two `$sides` maps.** Each map carries its own recorded border measures, so D46 treats them as a coincidence, not a shared pattern.
- **`--bs-tooltip-margin: #{''}`.** This matches the `nav-list` precedent (`_mixins.scss:110-112`).
- **`Right tooltip` versus `Start offcanvas`.** A tip is named by the release's `placement` option words, and offcanvas has no such option. The constants TSDoc gives a weaker reason ("the classes are physical"); the release word is the stronger one.
- **The stacking paragraph against the filled Alias cell.** This mismatch is a given ruling; MODAL rewrites the paragraph.
- **"The body face".** The `--vn-font-sans` token aliases both the `--bs-font-sans-serif` and `--bs-body-font-family` properties (`guides/veneer.md:3216`), so the phrase is accurate.

VERDICT: FAIL 1, 3, 5, 7, 8; outside the claims: none
