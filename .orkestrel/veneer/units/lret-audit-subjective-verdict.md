Lane held: **subjective** (`reviewer` on Opus 5.5). I adjudicated nothing objective. Each objective question I found is a referral at the end of this verdict. Line numbers refer to the uncommitted worktree `/home/user/veneer-lret` and to `/home/user/scaffold/.orkestrel/veneer/units/lret.diff`.

## Numbered verdicts

**1. CONFIRMED.**
- `classifyDeparture` in `/home/user/veneer-lret/tests/setupServer.ts:2106-2120` takes `(recorded, emitted, resolution)` and has no `Source` input. It returns `dropped`, then `undefined` when there is no resolution, then `retuned` when the resolved values differ (line 2113), then a text-only member.
- `classifyValueGaps` (lines 3921-3952) moves each `undefined` result into `undecided`. The conformance case "decides every measured value difference…" (lret.diff:1857-1859) expects that list to be empty.
- The legend reads as one decision (`/home/user/veneer-lret/guides/veneer.md:7561-7567`). Resolution splits a row into `retuned` or `dropped` versus "resolves to the release value". The text then names the rest (`tokenized`, `aliased`, `fallback`, `restated`). Because `dropped` and `retuned` are disjoint, the legend needs no precedence rule.
- Proof mutations: `text-compare`, `ignore-resolution`, and `route-undecided` each turn "names each departure member from the resolved values first…" red (`lret-mutation-*.log.txt:3`). Its `alike`, `apart`, and `undefined` arms assert exact members, so each mutation changes an asserted value.
- One door is referred: see R1 on the repaint arm.

**2. UNRESOLVED.** I can name a pair that answers the claim's challenge, but ruling on resolver correctness belongs to the objective lane (R2).
- The pair: `reboot` `th` `text-align`, release `-webkit-match-parent` against Veneer `inherit` (`lret-drift-members.txt:263`; guide:9619).
- The resolver computes both values on an LTR host that has no `dir` (setupServer.ts:3696-3719). There `match-parent` computes to `left` and `inherit` to `start`, and CSS Text 3 renders both left-aligned. The writer's report (ledger-retune-report.md:255-257) says the same.
- What settles it: a rendered probe that compares the two headers' text positions on that host.

**3. CONFIRMED.**
- `Departure` adds `retuned` (setupServer.ts:154) and `isDeparture` follows (lines 824-833).
- A grep for the `declared` member across `guides`, `tests`, and `src` finds only unrelated evidence rungs, plus the refusal case at setupServer.test.ts:2094 and :3087.
- The conformance gate exits 0 (`lret-conformance.log.txt:13-17`), so the gate's unrecorded and stale lists are empty.
- The three verdict rows are asserted by "names a retuned value retuned and a routed release value tokenized…" (lret.diff:1883-1893).
- Proof mutation: `text-compare` would make the accordion row `retuned`, and `ignore-resolution` would make the btn and `--bs-primary` rows `tokenized`. The exact-string `toContain` assertions tell each mutation apart. These mutations were reasoned, not run against conformance.
- Whether the rows read true to a consumer: every reclassified row I checked renders differently, except `th`. See F2.

**4. UNRESOLVED.** The first two clauses hold:
- `scanCanonicalValues` (setupServer.ts:3978-4050) reads every site and each mode.
- The `radius` plant fails the canonical case with `AssertionError: expected [ …(2) ] to deeply equal []` (`lret-plant-radius.log.txt:108-109`).

The third clause is referred (R3):
- The retired case compared written text wherever both sides resolved empty (lret.diff:4053-4057).
- The new path returns "equal" for any two empty custom readings (setupServer.ts:3738-3739).
- `--vn-text-heading` `inherit` (guide:7175) is such a row.

**5. CONFIRMED.**
- `scanWitnesses` (setupServer.ts:4068-4080) counts a witness only from a row that is neither `retuned` nor `dropped`.
- The `witness` plant fails the scan with `AssertionError: expected [ '--vn-radius-pill' ] to deeply equal []` (`lret-plant-witness.log.txt:1068-1069`), and the gate is green on the tree.
- Proof mutation: `witness-retuned` turns "names each bootstrap token…" red (`lret-mutation-witness-retuned.log.txt:13`). Its expected `['--vn-gray-200', '--vn-gray-300']` separates a retuned row from a witness. The conformance control (every row forced to `retuned`, which must name the whole bootstrap population) also tells the mutation apart (lret.diff:1922-1929).

**6. UNRESOLVED.** The evidence cannot meet the claims file's kill standard ("the failing case's message names an assertion failure"):
- `lret-mutations.sh:22` passes vitest output through `grep -E "^ +(✓|×)|Tests "`, so no mutation log carries a failure message.
- No mutation is paired with any `describe('cascade ledger')` case. Only the radius and witness plants touch conformance.

Mutation per proof, and whether its assertions tell it apart from the passing case:

| Proof | Mutation | Tells it apart? |
| --- | --- | --- |
| Text-only case | `text-compare` | Yes (× in its log) |
| Retuned case | `ignore-resolution` | Yes (× in its log) |
| Undecided case | `route-undecided` | Yes (× in its log) |
| Resolve case and sRGB case | `colors-raw` | Yes (× in its log) |
| Canonical case | `canonical-self` | Yes (× in its log) |
| Witness case | `witness-retuned` | Yes (× in its log) |
| Probe-syntax case | Registering both probes with one initial value | Yes; `[true, false]` would flip; not run |
| Context-element case | Dropping the `[+~]` joint test | Yes; `sibling: true` would flip; not run |
| "decides every measured value difference" (conformance) | `route-undecided` | No on the tree: with no real undecided pair, `undecided` stays `[]` |

What settles it: re-run `lret-mutations.sh` without the grep filter, and pair a mutation with each conformance case.

Non-blocking notes on case names:
- The text-only case carries a `dropped` row.
- The retuned case carries an uncommented `restated` light-mode control.
- The context-element case also proves `matchesDarkScope` but does not name it.
- The witness fixture uses the near-miss name `var(--vn-gray-3000)` without a comment, and gives a `var(--vn-container-sm)` row the member `restated`, which the classifier would call `tokenized`.

**7. BROKEN.**
- **Input:** `ContextElement.sibling` (setupServer.ts:237) is a boolean named with a noun. `.claude/rules/names.md` § Value-level identifiers requires a boolean to be an adjective or past participle that reads as an assertion. The neighbouring booleans follow that rule (`literal`, `quoted`, `important`, `excluded`).
- **Smallest fix:** rename the field to an assertion. The closest is `nested`, with its sense inverted: "true where the element sits inside the one before it; false where a `+` or `~` combinator places it beside that one". This matches the remark at lines 3487-3490. Update `collectContextElements` (line 3528), `#substitute` (line 3815), and the context-element case (setupServer.test.ts, lret.diff:2626-2654).
- **What holds:**
  - The API split reads as one design. The synchronous `collectLedger` measures, the asynchronous `classifyValueGaps` classifies in Chromium, and this keeps a browser out of every additions-only case.
  - `ValueResolver` sits beside the `recordButtonOracle` launch.
  - Every new symbol is exported and pinned (lret.diff:2021-2099).
  - The retired `RETAINED_*` exports leave no consumer (a grep of the tree outside `node_modules`, `dist`, and `tmp` finds none).
- **`normalizeDeclaration` ruling:** retire it. See F1.

**8. CONFIRMED.**
- `LEDGER_TIMEOUT = 14_700` (setupServer.ts:495) equals 2 × 4850 + 5000. The highest contended total in `lret-instruments/probe/timing.txt` is 4841 ms (lines 4-7), measured at load 3.37-7.26.
- The resolver's hooks use that budget (lret.diff:1839 and :2386).
- The per-case `resolve` calls finish in 10-60 ms (mutation logs), inside the setup project's default budget (`vite.config.ts:297-307` sets no override).

**9. BROKEN.** Both failures are first-read failures:
- **a. The ordering in § Outside the ledger contradicts its own intro** (guide:10591-10612).
  - The intro lists three items: role coverage, undeclared names, and Elements behaviors. The next paragraph covers canonical values, which the list omits. Then "Role coverage is next." counts that paragraph as the first item.
  - Fix: make the intro list match the paragraph order. Name canonical values as the first thing the section records ("inside the gate, outside the rows"), or change "Role coverage is next." to open the list.
- **b. The rule for sites the release writes twice has no example of a second rule.**
  - The preamble's rule is at guide:7551-7553, and its only example is the `-webkit-sticky` vendor fallback.
  - The rows `reboot` `pre` and `kbd` `font-size` `1em` → `87.5%` `restated` (guide:9597 and :9601) contradict the legend's "a `restated` row writes the same value in another form" on first read: `1em` is 16px and `87.5%` is 14px.
  - Fix: add those rows to the example, for instance "as it is for the `pre` and `kbd` `font-size` rows, whose `1em` the release's second rule replaces with `0.875em`".
- **What holds:** the § Tests sentences (lret.diff:1707-1724), the caret paragraph (guide:4734-4736), and the `readBootstrapCascade` remark (setupServer.ts:1249-1254) are true of the code as written. F1 records the § Reference map comparison paragraph separately.

**10. CONFIRMED.**
- `lret-status.txt` lists seven files, all inside Owned.
- The four guide sentences outside the named sections are listed in the report's ancillary choices (report:236-239).
- Every named gate log ends in `exit=0`: check, lint-check, format-check, setup, build-src, build-src-styles, conformance, tokens, guides, and policy. The format check covered all seven owned files (`lret-format-check.log.txt:2`).

## Findings outside the claims

**F1. `normalizeDeclaration` is a second comparison engine with no consumer, and the guide sentence it proved now names the resolver without a proof bound to it.**
- **Where:**
  - `/home/user/veneer-lret/tests/setupStyles.ts:689-721` (the helper).
  - `/home/user/veneer-lret/tests/setupStyles.test.ts` around :638 (export row), :3257-3273, and :3606-3609 (its only cases).
  - `/home/user/veneer-lret/guides/veneer.md:7055-7058`.
- **What is wrong:**
  - The unit rewrote the § Reference map paragraph (lret.diff:45-53). It says `150ms`/`0.15s` and `15%`/`15.0%` compare equal, and `16%` does not, "through the same resolver".
  - The only executed assertions of those examples test `normalizeDeclaration`. No `describe('ValueResolver')` case resolves them.
  - The helper's only consumer was the retired reference-map case (report:258-259).
- **Why it matters:**
  - Ruling 3 says the comparison "keeps one home".
  - `AGENTS.md` § Design laws prefers one shared engine and allows no leftover shim.
  - Under the minimal-API law, a symbol goes only when its capability must not exist. That test is met here: a text-equivalence rule that disagrees with the resolver (it counts `0.75rem` and `12px` as different) must not coexist with a guide that says values compare as Chromium computes them.
  - `.claude/rules/documentation.md` requires the executed assertion that would break if the prose went false.
- **What right looks like:**
  - Retire `normalizeDeclaration`, its two cases, and its export-list row.
  - Add a `describe('ValueResolver')` case that resolves a custom property: `150ms` against `0.15s` and `15%` against `15.0%` must be equal, and `15%` against `16%` must differ.
  - The helper lay outside this unit's Owned symbols, so the Orchestrator names the carrier. The guide sentence's proof lies inside the unit's owned scope.

**F2. The `reboot` `th` `text-align` row reads to a consumer as a changed header alignment, and the guide says nothing about it.**
- **Where:** guide:9619, and the legend at guide:7561-7569.
- **What is wrong:** `retuned` here reports a difference between computed keywords (`left` against `start`). The two render alike in any document where a header shares its row's direction. No sentence tells the reader this, against the tenet "Let the rendered browser result decide UI correctness" (`/home/user/veneer-lret/ROADMAP.md:47-48`).
- **Options:**
  - **Option A (recommended):** add one legend sentence saying that `retuned` compares computed values. Name this row: the release's `-webkit-match-parent` computes to `left` and Veneer's `inherit` to `start`, which align a header alike unless the header's own direction differs from its row's. Cost: one sentence, and the resolver keeps its single rule.
  - **Option B:** have the resolver map logical `text-align` keywords to physical sides on its host. Cost: a property-specific rule inside a generic resolver, and it hides the real mixed-direction difference.

## Attacked and held

- **`retuned` against the guide's existing "a retuned token" prose** (for example guide:5539-5540 and :6449): the same verb with the same meaning (a value moved off its baseline) and a different actor. It is not a vocabulary collision.
- **The legend's `(empty)` sentence** (guide:7567-7569): no `(empty)` row on a regular property exists, and no `(empty)` row carries a text-only member (both from a grep of the guide). The sentence holds on the tree.
- **Reclassified `restated → retuned` rows:** `.mark` and `mark` `padding`, `hr` `opacity`, `code` and `samp` `font-size`, `kbd` `padding`, and `table` `caption-side` (bottom to top) each render differently. The old `declared` member hid real retunes such as `caption-side`.
- **The `button` `inherit` rows** (guide:9621-9623): replacing `inherit` with a fixed token stops inheritance, which renders differently under any parent but the body. `retuned` is true for them.
- **`ValueResolver.resolve`:** the name uses CSS's own "resolved value" term, not the `resolve*` options-helper prefix.
- **`as const` inside `PROBE_SYNTAXES`:** it fixes tuple arity under a declared record, which `.claude/rules/typescript.md` permits, with precedent in `setupStyles.ts`.
- **`ValueGap` as `Omit<DepartureRow, 'departure'>` plus `written`:** the shared fields keep one declaration.
- **The md breakpoint case** derives its alias from the ledger and then pins `--bs-breakpoint-md`. That is a derivation with its own control.
- **A second browser for the canonical scan:** conformance launches one more Chromium to compare the built cascade against itself. This costs one launch (about 650 ms idle, per timing.txt) and was accepted.

## Referrals

- **R1 (objective lane, claim 1).** The conformance `beforeAll` reads `repaint.departures` and never reads `repaint.undecided` (lret.diff:1826-1833). A repaint pair the resolver cannot decide is neither named nor routed. In the withheld arm it disappears, and the `[]` expectation still passes. The planted world shows that `invert(1)` against `none` is undecided (lret.diff:2608-2613). Does "named by the gate" hold at this door?
- **R2 (objective lane, claim 2).**
  - (a) Rule on the `th` `text-align` pair above.
  - (b) `#substitute` resolves only values that contain `var()` against their own stylesheet (setupServer.ts:3831). A CSS-wide keyword such as `inherit` therefore computes on the neutral host (`line-height: normal`), not in the release's body context. Decide whether this invents or hides a difference for any row.
- **R3 (objective lane, claim 4).** Plant `--vn-text-heading: initial` at `:root` in `src/styles/_tokens.scss`. The retired case would have reddened on its written-text comparison (lret.diff:4053-4057). `scanCanonicalValues` reads `''` on both sides and passes (setupServer.ts:3738-3739).
- **R4 (Orchestrator).**
  - Dispatch defect: the brief's Context cites "E32 the claims file names", but the claims file names no E32.
  - F1's `normalizeDeclaration` retirement needs a named carrier.

VERDICT: FAIL 2, 4, 6, 7, 9; outside the claims: F1, F2
