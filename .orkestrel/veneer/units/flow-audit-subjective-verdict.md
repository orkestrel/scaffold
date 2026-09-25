LANE: flow-audit-reviewer

Lane held: **subjective**, on Opus 5.5. The writer (`opus`) runs on the same engine as this lane, so I attacked this work harder. I ran nothing. Every reading of a proof comes from the retained logs or from reading the source.

## Verdicts

1. **CONFIRMED.** `/home/user/scaffold/.orkestrel/veneer/units/flow-status.txt:1-13` lists only owned and shared files. `type.test.ts` is owned because it is the test for the `.h1`–`.h6` classes, which live apart in `components/_type.scss`. `card.test.ts` is a test the change made false. The diff (`flow.diff`) touches none of `_dl.scss`, `_pre.scss`, `_hr.scss`, `_figure.scss`, `_blockquote.scss`, `src/browser/**`, or any vendored file.

2. **CONFIRMED.** The compiled cascade `/home/user/veneer-flow/dist/src/styles/index.css` writes these rules:
   - `h1,…,h6{margin-top:0;margin-bottom:var(--vn-space-4);…}` and `.h1,…,.h6{margin-top:0;margin-bottom:var(--vn-space-4);…}`
   - `p{margin-top:0;margin-bottom:var(--vn-space-8)}`
   - `ul{margin-top:0;margin-bottom:var(--vn-space-8);…}` and the same for `ol`
   - `address{margin-bottom:var(--vn-space-8);…}`

   Guide line ~6979 sets `--vn-space-4` = `calc(0.5rem * var(--vn-factor-density))` and `--vn-space-8` = `calc(1rem * …)`. The only `@include heading-text` sites are `elements/_heading.scss:10` and `components/_type.scss:10`. The only `@include list-space` sites are `elements/_ol.scss:5` and `elements/_ul.scss:5`.

3. **BROKEN**, on the title clause only.
   - **Titles.** The element titles read `'takes the release block margins through the space scale at the default and a doubled density'` (in `p`, `address`, `ol`, and `ul`). The heading and type titles are the same with `on every level` or `on the $twin class` added. On a first read, each title says the tag takes the release margins at a doubled density.
   - **What the cases assert.** At density 2, each case asserts `release * 2`, not the release value: `/home/user/veneer-flow/tests/src/styles/elements/p.test.ts` ~line 43, `address.test.ts` ~48, `ol.test.ts` ~45, `ul.test.ts` ~45, `heading.test.ts` ~137, and `components/type.test.ts` ~111.
   - **The contradiction.** Each case's own comment says doubling the factor "doubles the tag's margin and leaves the literal alone", so title and body disagree. The sibling idiom names the scaling instead: `validation.test.ts:624` reads 'rescales the tokenized … geometry'.
   - **Fix.** Retitle each case to state both halves, for example `'takes the release block margins at the default density and scales the block-end margin with the density factor'`. Add `on every level` for the heading case and `on the $twin class` for the type case.
   - **Every other clause holds.** The rest of claim 3 held on the retained logs, as follows.
   - **Red on the base.** `owned-red.log.txt:165-300` shows the 11 new cases red, with none of the 49 old cases failing: the 6 `.h*` class cases plus the heading, `address`, `ol`, `ul`, and `p` cases.
   - **Literal `rem` for the token.** `mutation-p-literal.log.txt` fails the `p` density case. `mutation-heading-literal.log.txt` fails the heading case and the 6 class cases, and no calibration case. `mutation-list-literal.log.txt` fails the `ol` and `ul` cases. The assertions tell each mutant apart through `release * 2`.
   - **Heading step** (`--vn-space-4` → `--vn-space-8`): `mutation-heading-step.log.txt` fails the default-density cases.
   - **Old address value** (`--vn-space-7`): `mutation-address-old.log.txt` fails the address case.
   - **Non-zero list top margin**: `mutation-list-top.log.txt` fails the `ol` and `ul` cases.
   - **Not run: `address` with a literal `rem`.** Mutation `_address.scss` `var(--vn-space-8)` → `1rem`: by reading, `address.test.ts` ~48 expects 32 and gets 16, so the assertion tells it apart. No log exists for this mutation (see the referrals).

4. **CONFIRMED.**
   - **Calibrations.** The heading and `.h*` `margin` value `0px` → `0px 0px 8px`, `TEXT_P_CASES` `0px` → `16px`, and `TEXT_ADDRESS_CASES` `14px` → `16px` were each made false. `TEXT_OL`/`TEXT_UL` split the false `margin: 0px` into longhands. Each new value equals Bootstrap's reading in `logs/probe.log.txt:2-17`.
   - **Pills.** Bootstrap's `.card-header-pills` writes only inline margins (`bootstrap.css:4471-4474`), and so does Veneer's (`src/styles/components/_card.scss:135-138`). So under both cascades, a bare `ul.card-header-pills` keeps the `ul` element's 16px.
   - **Mutation on the pills.** Give `.card-header-pills` the tabs' `margin-bottom: calc(-1 * var(--bs-card-cap-padding-y))`, or `0`. Either way, `card.test.ts` ~217 (`toBe(16)`) fails, while ~210 holds the tabs at -8. The assertion still separates the pills from the tabs.

5. **CONFIRMED.**
   - **Readings.** `orchestrator-components-probe.log.txt:2-46` and `:48-92` read `same` for every marked element, except `ol-inner` and `ul-inner` (16px against 0px). The `.h1`–`.h6` classes on a `div` read `same` in `logs/probe.log.txt:8-13`.
   - **Against the tenets.** The exception is the tenet-correct design. `ol ol, ul ul, ol ul, ul ol` style a tag by the tag around it, which `ROADMAP.md` § Tenets ("Give semantic tags useful defaults…") forbids. The escape is class-driven, which is what "Preserve direct control through classes" asks for.
   - **Adjacent: the consequence is not documented in the guide.** See F1.

6. **CONFIRMED.**
   - **Ledger rows.** In `flow.diff:5-121`, every reboot and per-class `margin-bottom` row reads `tokenized` (`var(--vn-space-4)` or `var(--vn-space-8)`). The matching `margin-top` rows and the `{ margin }` addition rows are gone (`flow.diff:122-161`).
   - **Excluded rows.** The nested-list rows stay (`guides/veneer.md:6656-6659`).
   - **Gate.** `conformance-2.log.txt:11` reads `26 passed`, and line 15 reads `exit 0`.

7. **CONFIRMED.** Across the added lines in `flow.diff`:
   - No `any`, no `as` (the diff only shows an existing `as const` as context), no `!`, and no suppression.
   - The only functions are anonymous callbacks passed as arguments, and there is no hidden helper.
   - `HEADING_MARGIN` and `FLOW_MARGIN` carry TSDoc (`flow.diff:240-259`) and sit in the inventory (`flow.diff:220,228`).
   - No added comment or TSDoc states a count.

## Findings outside the claims

**F1. The guide does not state the visible nested-list departure that this change created.**
- **Before.** Veneer's `ol` and `ul` wrote `margin: 0` (`flow.diff:181-183`). An inner list read 0 in both cascades, so the Excluded rows at `guides/veneer.md:6656-6659` had no rendered consequence.
- **After.** Take Bootstrap's documented "Unstyled" list, which nests a `ul` inside `ul.list-unstyled`, or the probe's `<ul><li>A<ul><li>B</li></ul></li></ul>`. The inner list reads 16px against Bootstrap's 0px (`orchestrator-components-probe.log.txt:44-46,90-92`).
- **What the guide says.** The rows still give only "Nested list treatment infers styling from tag composition." A search of `guides/veneer.md` for `nested list`, `inner list`, and `mb-0` returns nothing else.
- **Where the ruling lives.** The ruling that the inner list keeps 1rem and that `.mb-0` removes it exists only in a campaign file (`/home/user/scaffold/.orkestrel/veneer/e-identity-design-verdict.md` § Addendum 3).
- **Why it matters.** `ROADMAP.md:21` requires every incompatibility to be made explicit. `.agents/orchestration.md` puts product truth in the guide.
- **Fix.** Extend the Reason cell of the four rows. Suggested text: "Nested list treatment infers styling from tag composition, so an inner list keeps the list's `1rem` bottom margin where the release writes `0`; the `.mb-0` class removes it." Back the remedy with a proof that an inner `ul.mb-0` reads 0px.

## Attacked and held

- **Form of the declarations.** "Use the same form" as the blockquote row means matching the release's own form. The release writes block longhands on these tags and a shorthand on `blockquote` (`guides/veneer.md:9291`). So the longhands are right, and they are what lets each row read `tokenized`.
- **"Through the space scale".** The density case cannot tell `var(--vn-space-4)` apart from an inline `calc(0.5rem * var(--vn-factor-density))`. The conformance ledger's text comparison of the Veneer cell pins the token, so the pair together holds.
- **Card fixture.** The fixture uses a bare `ul.card-header-pills`, not the documented `nav nav-pills card-header-pills`, which reads 0px in both cascades (probe line 18).
  - The new `toBe(16)` couples a card test to the `list-space` value. A readback against a plain `ul` in the same scene would remove that coupling.
  - The comment's "the 1rem the `ul` element takes from the release's reboot" means Veneer's own `ul` rule adopting the release value. It is correct, but it can read as though Bootstrap's stylesheet were loaded.
  - Neither point falsifies claim 4.
- **Repeated inline setup.** The density set, try, and finally block repeats across six new cases, following the existing `validation.test.ts:578,646` pattern. `.claude/rules/tests.md` only says to prefer factories, so this is not a defect.
- **`FLOW_MARGIN` naming.** Addendum 2 uses "flow margins" for the headings too, while `FLOW_MARGIN` holds only the 1rem value. The TSDoc bounds it exactly, so this stays an observation.

## Referrals (to the objective lane)

- **R1.** No run backs the address literal-`rem` mutation that claim 3 cites (`mutation-*-literal`). Apply `_address.scss` `margin-bottom: var(--vn-space-8)` → `1rem` with `/home/user/scaffold/.orkestrel/veneer/units/flow-instruments/flow-mutate.sh` and read `address.test.ts` ~48.
- **R2.** `TEXT_ADDRESS_CASES` gains `'margin-top': '0px'` (`flow.diff:269`). That is an added expectation, not one the change made false. Rule whether claim 4's "every calibration expectation the diff changes" is meant to cover additions.

VERDICT: FAIL 3; outside the claims: F1
