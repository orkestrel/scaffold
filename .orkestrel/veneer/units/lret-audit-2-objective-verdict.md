1. **BROKEN — resolver faithfulness.** `tests/setupServer.ts:3655` discards `:not()` and `:has()` before the matching check at `tests/setupServer.ts:4213`. Executing the source helpers in memory produced:
   - `:not(div)` → a `div` checked against `*`.
   - `.card:has(> span)` → a childless `div.card` checked against `.card`.

   A concrete failing construction is a stylesheet containing `:root { --sample: 3px } .card:has(> span) { --sample: 5px }`, with the pair `padding-left: 5px` versus `var(--sample)` at `.card:has(> span)`. The constructed element misses the declaration supplying `5px`. Matching consumer markup receives it. The builder execution establishes the missing relationship; the downstream Chromium reading is a source-derived prediction, not a browser run by this lane. Build a matching relationship or return undecided before substitution.

   The required additional attacks expose these boundaries:

   | Pair or input | Source finding |
   |---|---|
   | `margin-left: 1lh` versus `1rlh` | Font and root size vary, but independently specified local and root line heights do not. No retained assertion measures this pair (`tests/setupServer.ts:858`). Chromium replay remains required. |
   | `margin-left: 1vh` versus `7.2px` | The viewport setting supplies a distinguishing height. This attack does not establish a defect. |
   | `margin-left: 1vmin` versus `1vh` | Every supplied viewport is landscape. Arithmetic over the actual settings gives equal values throughout; a `600×800` viewport gives `6px` versus `8px`. |
   | `margin-left: 1cqw` versus `1vw` | No setting establishes a query container. The construction cannot distinguish viewport fallback from a consumer’s container-relative value. |
   | `line-height: 100%` versus `16px` | The font setting supplies a distinguishing font size. No new Chromium reading was available. |
   | `width: calc(50% + 1em)` versus `516px` | The font and block settings each supply a distinction. This attack does not establish a defect. |
   | `padding: 1em` versus `16px`, with `padding-left` as the longhand control | Each computes as its named property; the font setting supplies a distinction. `ValuePair` does not directly compare different property names (`tests/setupServer.ts:205`). |
   | Custom property `currentColor` versus `#000` | This reaches the registered color probe, whereas the retained context case tests regular `background-color`. Its Chromium result remains unmeasured by the supplied logs. |
   | Custom property `inherit` versus `red` at `:root`, with `:root { --sample: red }` in the resolver’s sheet | The synthetic root is a descendant `div`, so `inherit` reads the root’s declaration rather than the document root’s absent parent (`tests/setupServer.test.ts:4089`, `tests/setupServer.ts:4231`). |
   | Selector list `.alpha, .beta` | Direct construction produces an invalid `.alpha,` compound and is refused by the matching check. Choosing only the first `:is()` alternative has a different consequence, demonstrated in claim 2. |
   | `margin-left: max(0px, min(1em - 16px, 1rem - 16px))` versus `0px` | Arithmetic over every actual setting gives zero. Simultaneously setting the host and root font sizes to `20px` gives `4px`. The resolver never combines those settings. |

   Equality therefore needs a bounded model of supported dependencies; unsupported dependencies must remain undecided. Adding isolated settings does not establish the claimed general faithfulness.

   The repaired adjacent behavior holds: quoted strings and URLs survived direct helper execution, and sibling mode exclusion survived the supplied mutations. Relevant retained logs are `lret-instruments/r2/lret-mutation-colors-strings.log.txt:1221`, `lret-mutation-mode-siblings.log.txt:1221`, `lret-mutation-id-dropped.log.txt:1221`, and `lret-mutation-unmatched.log.txt:1221`. Record paths here resolve under `/home/user/scaffold/.orkestrel/veneer/units/`.

2. **BROKEN — canonical coverage.** Executing the actual site-selection prefix of `scanCanonicalValues`, stopping before its browser call, established missing comparisons:
   - With `:root { --vn-sample: red }`, light and dark scope declarations of `blue`, and reference cells of `blue`, the pending comparisons contain only `blue` against `blue`. The unscoped root declaration disappears because the light override replaces it and the later loop skips it (`tests/setupServer.ts:4410`, `tests/setupServer.ts:4429`).
   - With light `red`, dark `blue`, and `:is([data-bs-theme=light], [data-bs-theme=dark]) .btn { --vn-sample: red }`, the pending comparisons contain only the light comparison for that selector. `collectContextElements` chooses the light alternative, `inferScopeMode` returns `light`, and the dark comparison is omitted (`tests/setupServer.ts:3732`, `tests/setupServer.ts:4431`).

   Validate the unscoped root against its light cell independently of an explicit light override. Enumerate the modes a selector can match, or report an unsupported selector as undecided.

   The repaired empty-value and witness behavior does distinguish the supplied controls. `empty-alike` removes the textual distinction and fails at `lret-instruments/r2/lret-mutation-empty-alike.log.txt:1221`. `witness-row` substitutes the compensated row expression for the token alone and fails at `lret-mutation-witness-row.log.txt:1221`. The `radius`, `initial`, `scoped`, `witness`, and `pill` plants fail at their named canonical or witness assertions. The inset declaration uses px, while the other shadows retain rem (`src/styles/_tokens.scss:432`); the restored conformance run passes its witness assertion.

3. **CONFIRMED — repaint decisions.** `tests/conformance.test.ts:229` retains each repaint’s undecided list, and `tests/conformance.test.ts:271` compares the complete result against `[[], []]`. The `rungs-dropped` mutation produces nonempty lists and an `AssertionError` at `lret-instruments/r2/lret-mutation-rungs-dropped.log.txt:1147`. The assertion distinguishes that mutation from the passing case, including an undecided pair in either list.

4. **CONFIRMED — names and retirements.** The `nested-flip` mutation fails the structural assertion at `tests/setupServer.test.ts:4033`; its log records the differing nesting flags at `lret-instruments/r2/lret-mutation-nested-flip.log.txt:1221`. The first element’s `nested: true` value is explicitly documented as nesting inside the body.

   Searches across `tests`, `src`, `app`, `configs`, and `guides` found no remaining `normalizeDeclaration` or `matchesDarkScope` reference. The duration and percentage assertions are explicit at `tests/setupServer.test.ts:3890`; removing `<time>` distinguishes the duration reading and fails at `lret-mutation-syntax-time.log.txt:1222`.

   The additions reside in the centralized server setup module. Runtime exports are pinned at `tests/setupServer.test.ts:543`, frozen settings at `tests/setupServer.test.ts:652`, and their behavior by the cases itemized under claim 6. `ResolverSetting` is an exported readonly interface at `tests/setupServer.ts:237`. The names satisfy the supplied naming rules.

5. **CONFIRMED — ledger rows.** An independent comparison of the committed departure tables found exactly the claimed member changes: `.col-form-label`, `.display-1` through `.display-6`, and `legend`, each on `font-size`, from `tokenized` to `retuned`. A deliberately altered member was detected by that comparison. The changes match `lret-instruments/r2/lret-conformance-drift3.log.txt:66`; its stale counterparts appear at line 94.

   The gate compares complete described rows in each direction (`tests/conformance.test.ts:274`, `tests/conformance.test.ts:284`). Removing resolution-based classification distinguishes the resulting rows and fails those assertions at `lret-mutation-ignore-resolution-ledger.log.txt:1118` and `:1595`. The named button, accordion, and theme members are asserted at `tests/conformance.test.ts:301`; the restored conformance log exits 0 at `lret-conformance.log.txt:17`.

6. **UNRESOLVED — the mutation claims hold, but the blanket syntax-removal equivalence is not established.** Every paired case has the required `AssertionError`. The table identifies each proof, its mutation, and why the assertion distinguishes it. Log references abbreviate `lret-instruments/r2/lret-mutation-<name>.log.txt:<line>`.

   | Proof | Mutation or plant | Distinguishing assertion; log |
   |---|---|---|
   | `tests/setupServer.test.ts:3698` — text-only members | `text-compare`; `plant-undecided` | Different departure members; nonempty undecided list. `text-compare:1230`, `plant-undecided:801` |
   | `tests/setupServer.test.ts:3734` — retuned members | `ignore-resolution` | Expected retuned members become textual members. `ignore-resolution:1229` |
   | `tests/setupServer.test.ts:3775` — undecided pairs | `route-undecided` | Expected undecided entries disappear. `route-undecided:1230` |
   | `tests/setupServer.test.ts:3807` — stylesheet and typed resolution | `colors-raw` | Computed color strings differ from the expected normalized strings. `colors-raw:1222` |
   | `tests/setupServer.test.ts:3877` — duration and percentage notation | `syntax-time` | The duration resolution becomes undefined. `syntax-time:1222` |
   | `tests/setupServer.test.ts:3897` — probe syntaxes | `syntax-number-list`, `syntax-length-percentage-list`, `syntax-time`, `syntax-angle`, `syntax-color` | Each removal loses its expected computed pair, before the key-membership assertion. Corresponding logs: `:1220`, `:1220`, `:1251`, `:1221`, `:1221` |
   | `tests/setupServer.test.ts:3937` — varied contexts | `base-only`, `root`, `no-parent` | Expected distinguishing readings become equal. `base-only:1221`, `root:1216`, `no-parent:1223` |
   | `tests/setupServer.test.ts:3982` — unsupported contexts | `unvaried-ignored`; `no-parent` | Expected undefined results become resolutions. `unvaried-ignored:1220`, `no-parent:1253` |
   | `tests/setupServer.test.ts:4003` — ancestry mode | `mode-siblings` | Sibling cases incorrectly return dark. `mode-siblings:1221` |
   | `tests/setupServer.test.ts:4032` — element construction | `nested-flip` | Expected nesting flags differ. `nested-flip:1221` |
   | `tests/setupServer.test.ts:4097` — compound extraction | `pseudo-kept` | The returned compound retains excluded pseudos. `pseudo-kept:1222` |
   | `tests/setupServer.test.ts:4109` — matching elements | `id-dropped`; `unmatched` | The id reading disappears; unsupported compounds incorrectly resolve. `id-dropped:1221`, `unmatched:1221` |
   | `tests/setupServer.test.ts:4139` — planted ledger differences | `no-parent` | The expected inherited-value departure disappears. `no-parent:1282` |
   | `tests/setupServer.test.ts:4176` — strings and URLs | `colors-strings` | Quoted text changes. `colors-strings:1221` |
   | `tests/setupServer.test.ts:4197` — sRGB normalization | `colors-raw` | Raw sRGB text differs from the expected legacy form. `colors-raw:1277` |
   | `tests/setupServer.test.ts:4222` — canonical declarations | `canonical-self`; `scoped-once` | Expected mismatches disappear, wholly or in dark mode. `canonical-self:1229`, `scoped-once:1222` |
   | `tests/setupServer.test.ts:4249` — canonical modes | `scoped-once` | The expected dark mismatch disappears. `scoped-once:1243` |
   | `tests/setupServer.test.ts:4276` — empty canonical values | `empty-alike` | Expected written-text mismatches disappear. `empty-alike:1221` |
   | `tests/setupServer.test.ts:4300` — token-alone witnesses | `witness-row` | The incorrectly witnessed pill token disappears from the expected result. `witness-row:1221` |
   | `tests/conformance.test.ts:250` — dark component ownership | `theme-unmeasured` | Expected dark departures disappear. `theme-unmeasured:1118` |
   | `tests/conformance.test.ts:266` — measured decisions | `rungs-dropped` | The undecided list becomes nonempty. `rungs-dropped:1114` |
   | `tests/conformance.test.ts:270` — repaint decisions | `rungs-dropped` | The repaint lists become nonempty. `rungs-dropped:1147` |
   | `tests/conformance.test.ts:274` — recorded departures | `ignore-resolution-ledger` | Unrecorded rows appear. `ignore-resolution-ledger:1118` |
   | `tests/conformance.test.ts:284` — stale departures | `ignore-resolution-ledger` | Stale rows appear. `ignore-resolution-ledger:1595` |
   | `tests/conformance.test.ts:294` — representative members | `text-compare-ledger` | The expected tokenized accordion member is absent. `text-compare-ledger:1118` |
   | `tests/conformance.test.ts:306` — canonical detection | `plant-radius`, `plant-initial`, `plant-scoped` | Named token mismatches replace the expected empty list. Corresponding logs: `:71`, `:71`, `:59` |
   | `tests/conformance.test.ts:328` — witness detection | `plant-witness`, `plant-pill` | The pill token replaces the expected empty list. `plant-witness:273`, `plant-pill:282` |
   | `tests/conformance.test.ts:340` — unrecorded additions | `addition-unrecorded` | Removing the guide row produces an unrecorded addition. `addition-unrecorded:251` |
   | `tests/conformance.test.ts:344` — stale additions | `addition-stale` | The planted guide row becomes stale. `addition-stale:251` |
   | `tests/conformance.test.ts:348` — declaration category | `category-swapped` | The expected declaration-addition result changes. `category-swapped:1120` |
   | `tests/conformance.test.ts:359` — attribution | `unattributed-silent` | The expected orphan disappears. `unattributed-silent:1118` |
   | `tests/conformance.test.ts:366` — placement | `where-classes-ignored` | Additional rules become unplaced. `where-classes-ignored:1118` |
   | `tests/conformance.test.ts:379` — deferrals | `deferrals-inverted` | The expected empty result becomes nonempty. `deferrals-inverted:1118` |
   | `tests/conformance.test.ts:383` — element tags | `tags-layer` | The selected tag population changes. `tags-layer:1118` |

   Each mutation log records byte-identical restoration. Independent hashing of the files listed in `pre-mutation.sha256` matched the worktree. The style plants also record successful rebuilding after restoration.

   The clean-tree detector mutations are correctly reported as surviving: `canonical-self-ledger.log.txt:1118` and `witness-row-ledger.log.txt:1110` exit 0. Their paired plants establish detection; those surviving runs are not kills.

   The separate removal statement at `ledger-retune-report-3.md:75` needs qualification. Removed syntaxes were reachable: the real accordion padding row’s `1rem` reached the former leading `<length>` probe, and scalar numeric rows reached `<number>`. See the former order in `lret-instruments/r2/lret-2.diff:1035` and the accordion pair in `probe/gaps.txt:1`. The replacement preserves the recorded departure members, but that does not establish universal equivalence of computed serializations or classifications.

   In particular, no retained comparison establishes that the removed `<custom-ident>` probe is interchangeable with `font-family`. An old-versus-new Chromium comparison of case-sensitive identifiers against generic font-family keywords, such as `SERIF` versus `serif`, would settle that boundary. The surviving-syntax mutation logs do not answer it. This portion remains unresolved.

7. **CONFIRMED — timing under the recorded contention.** `probe/timing.txt:5` through `:8` record the contended resolver totals, with a maximum of `9907 ms`. Rounding upward to `9950 ms`, doubling, and adding `5000 ms` gives `24900 ms`, as declared at `tests/setupServer.ts:520`.

   The apparent counterexample is the roughly 40-second test duration in `lret-timing-contended-1.log.txt:8`. It includes cascade compilation and preparation before the instrument starts its resolver timer. The conformance implementation likewise performs that preparation outside the timed hook (`tests/conformance.test.ts:178`, `:218`). The added conformance cases read prepared results rather than launching additional timed resolver work. The supplied final setup and conformance runs show no timeout.

8. **BROKEN — guide truth.** The “each matching its compound” statement at `guides/veneer.md:7551` is contradicted by claim 1’s executed builder outputs. The every-declaration, every-applicable-mode statements at `guides/veneer.md:7040` and `:10618` are contradicted by claim 2’s omitted comparisons.

   There is also a directly evidenced overstatement at `guides/veneer.md:7593`: arithmetic does not invariably prevent a witness. The passing witness case supplies `calc(var(--vn-container-sm) * 1)` and expects that token to remain witnessed (`tests/setupServer.test.ts:4318`, `:4349`). The rule rejects arithmetic that compensates for a token whose own value differs; identity arithmetic remains valid. State that narrower rule.

   The repaired color-notation wording, empty-value distinction, `pre`/`kbd` explanation, and Outside-the-ledger paragraph order withstand inspection. They do not repair the remaining universal claims.

9. **CONFIRMED — scope and retained gates.** The retained status lists only owned files. Its diffs match `git diff 7952712 23b659b` and `git diff 73326c7 23b659b` byte-for-byte. The only `src/**` change is the inset-shadow declaration, and the worktree remains clean.

   The retained logs explicitly exit 0: `lret-check.log.txt:31`, `lret-lint-check.log.txt:7`, `lret-format-check.log.txt:7`, `lret-setup.log.txt:12`, `lret-build-src.log.txt:59`, `lret-build-src-styles.log.txt:16`, `lret-conformance.log.txt:17`, `lret-tokens.log.txt:36`, `lret-guides.log.txt:17`, and `lret-policy.log.txt:17`. The formatting command is scoped to the owned files, as the brief permits.

Findings outside the claims: none.

VERDICT: FAIL 1, 2, 6, 8; outside the claims: none