**ACCORDION (`ac`) audit round 1: subjective lane verdict**

I held the subjective lane, as `reviewer` on Opus 5.5. I read the evidence and ran nothing.

Dispatch note: the brief has me rule claims 2, 3, 5 and 6, which are objective-heavy. Where a sub-part needs an executed reading that is not retained, I refer it to the objective lane rather than adjudicate it.

## Per-claim verdicts

**1. Delta and scope — CONFIRMED.**
- `ac-status.txt:1-4` lists exactly the four owned files as untracked.
- The `diff --git` headers in `ac-shared.patch` name exactly the 14 claimed files.
- The patch touches no vendored file, no `theme.test.ts`, no `src/browser/**` or `src/core/**`, no `tests/fixtures/**`, and no manifest or README.
- The removals are:
  - the two `$assets` rows (`ac-shared.patch:283-284`);
  - the `$icons` comment (`:251,257-259`);
  - the retained-variables pair (`:182-186,192-194`);
  - the conformance comment (`:435-436`);
  - the icon-map comment in `setupStyles.test.ts` (`:541-545`).
- No site row is removed; the "site rows it rewraps" clause bounds an empty set. The numstat in the report (`b-collapse-ac-report.md:79-84`) reconciles with the patch hunks. For example, the guide's +106 −8 is the Files row, the section, the retained pair, the table, Additions, Compatibility and Tests.

**2. The partial and the cascade — CONFIRMED.**
- I compared `ac.diff:45-208` rule by rule against `node_modules/bootstrap/scss/_accordion.scss:5-153`.
  - Every selector and declaration is the release's, in the release's order.
  - The values are tokenized only at `--bs-accordion-btn-padding-y`, `--bs-accordion-body-padding-y` (`--vn-space-8`), `font-size` (`--vn-size-3`) and the focus-ring `color-mix`.
- `ac.diff:88,114` route both transitions through the mixin, and `:127` adds `forced-ring`.
- The dark rule reads `tokens.$dark`, declared on `::after` exactly as the release's `color-mode(dark)` block does (`:205-208`).
- The barrel line is at `ac-shared.patch:296`, and `$assets` is emptied of the accordion rows.
- The "matches the inventory" property holds on executed, retained evidence:
  - C1 is green (`accordion-final.log.txt:76`), and dropping one rule reddens C1 alone (`header-margin-dropped`, `mutations-3.log.txt:6`). An added rule also reddens C1, because C1 compares with set equality.
  - The ledger gate is green (`conformance-final.log.txt`, 22 passed). Removing any recorded departure row would redden `departures.unrecorded` (`tests/conformance.test.ts:213-215`).
- Referral to objective: `built-selectors.mjs` has no retained output log. The report's reading at `b-collapse-ac-report.md:136-143` rests on the report alone, but the property it states is carried by the gates above.

**3. The cascade proof — UNRESOLVED.**
- Every mutation the report names is logged red with the cases the matrix names, and I confirm each one:
  - `mutations-1.log.txt:1-10`, `-2:1-10`, `-3:1-9`, `-4:1-3`.
  - `not-collapsed-inverted` reddens C1, C5, C6, C10 and C13. C6's expanded/collapsed matrix separates it from the pass case.
  - `one-icon-for-both` reddens C7 alone.
  - `forced-ring-omitted` reddens C11 alone.
  - `retune-left-at-theme-scope` and `asset-rows-kept` both redden C12; its `readToken(plain, …)` check tells them apart.
- Two things keep the claim open:
  - The failing-first reading `29 failed | 1 passed (30)` with an empty partial has no retained log. `accordion-green` and `accordion-final` are the green runs only, so this reading rests on the report alone.
  - That reading is the only red evidence for C4's `--bs-accordion-btn-padding-x` and `-padding-y` rows. No logged mutation reddens them: `padding-y-literal` reddens C15 only (`mutations-3.log.txt:5`).
- Settle it by retaining the empty-partial run's log, or by running `.accordion-button { padding: 1rem 1.25rem }` (the slot reads dropped) and logging those C4 rows red. Referral to objective.

**4. The section and the specimens — CONFIRMED.**
- Every property the claim lists holds:
  - The specimens and their state classes are at `ac-shared.patch:54-65`.
  - The section is a `SpecimenSection` subclass in the exact `TableSection.ts` and `NavSection.ts` shape (`ac.diff:1-26`).
  - No trigger attributes and no `style` attribute appear (`ac.diff:282-287`).
- The state-agreement proof (`ac.diff:305-339`) pins a five-field tuple per item. Mutations `aria-expanded-disagrees`, `collapsed-dropped-over-hidden-panel` and `show-added-under-collapsed` each change one field and redden only that case (`mutations-section.log.txt:2-4`). `flush-class-dropped` reddens the contract and corner cases (`:1`).
- The section is constructed after `NavSection` (`ac-shared.patch:17`), exported (`:74`), and enumerated (`:314,322,334-336`). `app.log.txt` shows 80 passed over the `app:browser` project.
- Against the release's documentation page, the omitted `data-bs-*` triggers and the expanded middle flush item are justified by R1 and D41. The flush items rest collapsed against the boundary rules on purpose.
- The `h3` header level is a finding (S1).

**5. The capture rows — CONFIRMED.**
- `ac-shared.patch:467-495`:
  - `.accordion-button:not(.collapsed)` resolves on the first button of `Accordion items`, whose `:not(.collapsed)` rule writes its `background-color`.
  - `.accordion-flush > .accordion-item` resolves inside `Accordion flush`, whose flush rule writes `border-left-width`.
  - The scenario stems match the subjects, and no `CaptureState` member is added.
- In the journey case (`:357-407`), dropping `z-index: 3` from the focus rule fails `expect(lifted).toBe('3')`, and dropping the shadow fails `expect(ring).not.toBe('none')`.
- The portfolio list gains `ACCORDION_SPECIMENS` (`:415`).

**6. The tables, the ledger, and the deferrals — CONFIRMED.**
- The additions are at `ac-shared.patch:680-681,701-876`.
- The `AccordionLengthCase` interface belongs in the setup module:
  - `.claude/rules/tests.md:185` says to export every fixture type from setup files.
  - `tests/setupStyles.ts` already carries `FormRangeCase` (`:3598`), `InputGroupCase` (`:4289`) and `FormControlCase` (`:5051`).
- The binding case (`ac-shared.patch:568-671`):
  - A selector added to `ACCORDION_SELECTORS` that the release does not record reddens `toEqual([...new Set(recorded)])`.
  - A slot the release adds that no table covers reddens the closure check at `:636-647`.
- The ledger rows (`:206-213,222`) equal the comparison's output: the departure and addition drift cases are green (`conformance-final.log.txt`). Deleting the `font-size` row would redden `departures.unrecorded`.
- The patch adds no deferral row, and `accordion` joins `listed` (`:427`), the order case (`:447,455`) and the server set (`:507`).

**7. The guide content — BROKEN.**
- The token-noun rule fails in sentences this unit authored (`.claude/rules/writing.md` § Code tokens: "follow it with a noun"):
  - `ac-shared.patch:131`: "lifts to `z-index: 2`, and a focused one lifts to `z-index: 3`".
  - `:148`: "resolves to `0s` under that preference".
  - `:155-156`: "the release's `1rem`, so the block padding rescales with `--vn-factor-density`." This bullet uses the compliant form one line earlier: "the `--vn-space-8` token" (`:154`).
  - `:160`: "mixes `--vn-palette-blue`, which carries".
  - `:187,195-196`: the rewritten retained pair opens on bare custom-property names.
- The compliant form already exists in the base guide: "the `--vn-factor-density` factor" (`guides/veneer.md:830,1358`).
- Smallest fix: "a `z-index` value of `2`" and "of `3`"; "a `0s` duration"; "the release's `1rem` length"; "the `--vn-factor-density` factor"; "the `--vn-palette-blue` token"; and "The `--bs-navbar-toggler-icon-bg` variable" plus "The `--bs-form-select-bg-img`, … variables" in the retained pair.
- Every other sub-claim holds:
  - Placement: `:91` sits between Card and Breadcrumb, `:206` between the `card` and `breadcrumb` tables, `:222` after `nav`, `:230-231` after `nav`, `:83` after `_collapse.scss`, and `:239` after collapse.
  - The compatibility rows read true against the partial.
  - The retained pair no longer names the accordion pair at theme scope (`:187-198`).
  - Paragraph order puts the key point first; each paragraph opens on its subject.
  - I attacked R17 (no sentence states script behaviour) and it held; see below.

**8. Law and report — BROKEN.**
- The token-noun rule also fails in the partial comment and the constants doc block, beyond the guide sites in claim 7:
  - `ac.diff:40` has the bare "the release's `1.25rem`, because".
  - `ac-shared.patch:41-42` has "its panel carries `show`" and "carries `collapsed` over a panel without `show`".
  - `ac-shared.patch:45-46` has "through `aria-expanded`" and "through `aria-controls`". The guide's own version of that sentence (`:164-165`) uses "the `aria-expanded` attribute".
  - Also in `tests/setupStyles.ts`: `ac-shared.patch:694`, where the selectors are bare, and `:829`, with "`source` is".
- "Bounds each choice it names" fails for the `h3` choice. The stated reason, "a showcase region carries no heading of its own" (`b-collapse-ac-report.md:50`), argues for `h2`, the level directly under the page's `h1` (`app/browser/Showcase.ts:79`). S1 carries the fix.
- The remaining sub-parts hold:
  - There is no `any`, no `as` beyond `as const` (`ac.diff:825,872`), no `!` and no suppression.
  - No helper duplicates an `@orkestrel/test` export; the new exports are data tables.
  - No literal color appears.
  - D1, D2 and D3 carry expected, found, evidence and done. D2 records that it carried on despite the brief's stop clause, and it asks for a ruling.
  - § What the unit could not close names every item the claim lists (`:254-270`).
  - The report's gate result lines match the retained logs, except the two unretained readings in claims 2 and 3.
- The `1.25rem` and `color-mix` choices held (see below).
- Counts the report states, listed for the record:
  - "one timing failure" (`b-collapse-ac-report.md:44`) is a count of a growable set, which breaches the brief's Output clause (`b-collapse-ac-brief.md:123`).
  - "177 lines", "494 lines", "20 lines" and "177 lines" (`:68,71,72,74`) and the diffstat and numstat figures (`:76-84`) are measurements with their commands named.
  - "C1 to C16" and "criteria 2 to 5" are identity numbering.
  - Every other number is a quoted result line (`:45-47,97,100,112-125,130-133,149,153,155`) or a duration (`10100 ms`).

## Findings outside the claims

**S1 — The specimen and proof headers skip a heading level.**
- Where: `ac-shared.patch:58,63` (`ACCORDION_SPECIMENS`) and `:739` (`ACCORDION_MARKUP`) write `<h3 class="accordion-header">`.
- What is wrong: the page's only heading is the `h1` (`Showcase.ts:79`). A region carries only an `aria-label` (`SpecimenSection.ts:31-35`). The Accordion region's outline therefore jumps from `h1` to `h3`.
- Why it matters: the release's accordion markup uses `<h2 class="accordion-header">`, and the sibling specimens follow the release's heading markup (Card's `h5`, Dropdown's `h6`). The recorded reason names the condition that makes `h2` correct.
- What right looks like: `<h2 class="accordion-header">` in both constants.
  - The partial and every proof read `.accordion-header`, not the tag, so nothing else moves.
  - The heading margin is already zero from the elements layer (`b-collapse-ac-report.md:259-261`).
- Carrier: the ACCORDION fix unit.

**S2 — "Accordion items" breaks the family's name for the plain variant.**
- Where: `ac-shared.patch:57,467,478,495,359`, `ac.diff:247,310,350`, and `integration.test.ts`. This name came from the brief itself (`b-collapse-ac-brief.md:146`), and the unit followed it.
- What is wrong: a key with a flush variant already pairs `'List group base'` with `'List group flush'`. The plain variant is `<Region> base` throughout: `Card base`, `Nav base`, `Form select base`, `Progress base`. "Items" names the content, not the variant axis, and both specimens hold items. This conflicts with the "One concept, one term" law in `AGENTS.md`.
- What right looks like: rename to `Accordion base`, with scenarios `accordion-base` and `accordion-base-focus`, across `CaptureSubject`, `CASCADE_KEYS`, `DRIVEN_KEYS`, the journey case, both section-test name lists, and the `ACCORDION_SPECIMENS` doc block.
- Carrier: the Orchestrator's successor brief to ACCORDION.

## Referrals to the objective lane

- The output of `built-selectors.mjs` is not retained (claim 2).
- The empty-partial failing-first log is not retained, and C4's button padding rows have no logged red (claim 3).

## Attacked and held

- **R17 and `parent` (`ac-shared.patch:104-106`).** The clause attributes sibling-closing to the Collapse plugin, not to Veneer. That matches NAV's accepted "behaviors that move those classes from a click" (`guides/veneer.md:1498-1500`) and DROPDOWN's R7 sentence. The Collapse row does record `parent` (`guides/veneer.md:4397`).
- **The `1.25rem` literal under ruling 5.** `--vn-size-5` is `1.25rem` (`_tokens.scss:267`), but every `var(--vn-size-N)` in `src/styles/components/` is a font size or a font slot. Binding padding or an icon width to it would cross axes. The guide's reason is scoped to space tokens and is true (the space scale ends at `-8`, `-12`, `-24`; `_tokens.scss:285-294`).
- **The `color-mix` ring.** It is byte-identical to `_pagination.scss:30-31`. `--vn-focus-width` is `0.1875rem` (`_tokens.scss:330`), so it cannot carry the release's `0.25rem`.
- **Flush specificity sentence (`ac-shared.patch:115-118`).** Each flush and boundary pair ties at (0,2,0), (0,3,0), (0,4,0) and (0,5,0), and the flush rule follows. The sentence is true.
- **The `$icons` comment rewrite (`:252-262`).** The caret and knob do have `$icons` entries beside their `$dark` entries (`_tokens.scss:103-106,134-144`), so the new sentence corrects a stale one. "Paints in the light mode" reads loosely for single-value glyphs but is not false.
- **Adjacent, not the unit's to fix.**
  - "The component unit that owns it closes that" (`:190`) is campaign vocabulary carried forward from base; NAVBAR retires that paragraph.
  - The unit spells `neighbor` (`ac.diff:377`, copied from `NavSection.test.ts`) and `neighbour` elsewhere; base already mixes both.

VERDICT: FAIL 3, 7, 8; outside the claims: S1, S2
