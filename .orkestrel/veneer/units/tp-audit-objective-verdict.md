1. **CONFIRMED — Scope and delta.** The owned files match `tp.diff` byte for byte, and the live status matches `tp-status.txt:1`. The tracked tree is unchanged from `2a3f223`; `git diff --exit-code 2a3f223 --` and `git apply --check tp-shared.patch` exit 0. Exact hunk reconstruction also succeeds. The attempted scope attack found no forbidden path or sibling-unit edit. The fixture grant stands. The barrel and showcase insertions preserve the existing entries and their relative order (`tp-shared.patch:19`, `tp-shared.patch:479`).

2. **CONFIRMED — Partials against the oracle.** An in-memory Sass compilation and PostCSS comparison found no missing or additional selectors and no declaration differences beyond the recorded ledger departures (`src/styles/components/_tooltip.scss:43`, `src/styles/components/_popover.scss:43`, `tp-shared.patch:317`). A changed arrow border colour was detected by the comparison control.

   The automatic placements extend their matching explicit classes (`_tooltip.scss:107`, `_popover.scss:127`). An in-memory minifier comparison, after normalizing equivalent selector and number spellings, found precisely the reported transparent-colour and border-shorthand rewrites. The shorthand preserves the recorded border widths, styles, and colours. The omitted alignment fallback precedes the supported logical alignment in the release, so its removal changes no computed alignment on the supported engines (`node_modules/bootstrap/scss/mixins/_reset-text.scss:7`). The conformance receipt is `tp-instruments/tp-gates.log.txt:9`.

3. **UNRESOLVED — Proof mutation evidence.** The executed mutations have the required retained entries, and their assertions distinguish the edited case. The following rulings use `tp-instruments/tp-mutations.log.txt`; references in the log column are its line numbers.

   | Mutation | Assertion distinguishes it | Evidence |
   | --- | --- | --- |
   | Tooltip literal stacking value | Yes: the wrapper must produce `1234`. | `tooltip.test.ts:61`; log `3` |
   | Popover literal stacking value | Yes: the wrapper must produce `1234`. | `popover.test.ts:62`; log `10` |
   | Tooltip reset include removed | Yes: inherited staged values disagree with the declared reset. | `tooltip.test.ts:92`; log `17` |
   | Popover reset include removed | Yes: the same independent comparison applies. | `popover.test.ts:78`; log `24` |
   | Mixin decoration declaration removed | Yes: the fixture exposes the underlying decoration. | `tp-shared.patch:1144`; log `31` |
   | Mixin line-breaking declaration removed | Yes: the staged value differs from the expected reset. | `tp-shared.patch:1144`; log `38` |
   | Tooltip shown-state rule removed | Yes: selector membership and shown opacity fail. | `tooltip.test.ts:36`, `tooltip.test.ts:74`; log `45` |
   | Tooltip placement remapped | Yes: the independently pinned edge and painted border disagree. | `tooltip.test.ts:153`; log `53` |
   | Popover placement remapped | Yes: edge geometry and triangle readings disagree. | `popover.test.ts:179`; log `65` |
   | Tooltip automatic placement extends another side | Yes: distinct explicit readings are compared with their automatic counterparts. | `tooltip.test.ts:194`; log `74` |
   | Popover automatic placement extends another side | Yes: the same comparison includes the header-strip content. | `popover.test.ts:216`; log `81` |
   | Header strip renamed away | Yes: generated content, geometry, and paint assertions fail. | `popover.test.ts:253`; log `88` |
   | Empty-header rule removed | Yes: the empty header must compute hidden while the populated header remains displayed. | `popover.test.ts:164`; log `96` |
   | Literal tooltip fill | Yes: alias retuning must change the inner box and arrow. | `tooltip.test.ts:224`; log `104` |
   | Literal popover header fill | Yes: alias retuning must change the header. | `popover.test.ts:289`; log `112` |

   The placement logs change an entry’s side and edge; they do not exchange complete entries. The geometric assertions nevertheless distinguish an actual exchange.

   The T-box assertions distinguish literal padding and font size through density and type-token retunes (`tooltip.test.ts:137`). The P-box assertions do likewise for header/body padding and the box/header font sizes (`popover.test.ts:147`). Their named mutations were not executed, as `b-modal-tp-report.md:121` and `:125` acknowledge. Under `w2-w3-note-1.md:13`, those mutation proofs remain unevidenced. Retain executions of those exact edits to settle this claim.

   The failing-first receipt is `tp-instruments/tp-failing-first.log.txt:1`. It establishes missing-component failures, not discrimination against equivalent default literals. Its mixin import failure is not a collected mixin assertion.

4. **CONFIRMED — Reset mixin.** The appended block matches the release’s reset declarations with the recorded alignment, weight, and rhythm departures (`tp-shared.patch:460`; `node_modules/bootstrap/scss/mixins/_reset-text.scss:1`). Each partial includes it. The fixture stages competing declarations directly on the element, including decoration, and compares every reading with an independently declared reset (`tp-shared.patch:1144`).

   The attack was declaration removal: each staged reading must differ from its expected reset, so deleting a reset declaration exposes a distinguishable value. The retained decoration and line-breaking mutations fail that assertion (`tp-instruments/tp-mutations.log.txt:31`, `:38`); the restored suite passes (`tp-instruments/tp-gates.log.txt:3`). Sharing this reset technique through a parameterless mixin accords with D46 (`decisions-round-2.md:540`).

5. **BROKEN — Empty-header specimen decline.** The stated reason is false: the release can retain an empty header. A permitted input is an empty element as the title, nonempty body content, and the default non-HTML mode. The title element is truthy, passes through the content mapping, and reaches the template factory’s element branch; that branch assigns its empty text without removing the header (`node_modules/bootstrap/js/src/tooltip.js:356`, `popover.js:62`, `util/template-factory.js:123`, `:156`). The removal branch only handles falsy content.

   Independently, a developer can write an empty header directly. Its body-only resting appearance differs from every registered titled specimen. The decline at `tp-shared.patch:108` therefore does not satisfy M2 and the family’s developer-written-state criterion (`b-modal-design-verdict.md:24`, `:56`).

   Add an **Untitled popover** specimen containing an empty header and populated body, with a resting capture row reading the body. Preserve the explicit-side specimens and derive their placement assertions separately.

   The existing specimens’ markup and containment assertions withstand review (`TooltipSection.test.ts:17`, `:87`; `PopoverSection.test.ts:17`, `:94`). Their browser receipt is `tp-instruments/tp-gates.log.txt:6`. The invisible tooltip and equivalent automatic-placement declines remain valid.

6. **BROKEN — Universal table-binding claim.** The selector, placement, and reset tables have inventory-derived checks. The arrow-property table does not. In the patched setup proof, its only uses are import, export-name membership, and freezing (`tp-shared.patch:745`, `:765`, `:854`).

   Replacing its contents with a frozen width-only list preserves all those setup assertions. No inventory-derived assertion detects the lost offsets or border readings. Add an independent coverage assertion deriving the required arrow readings from the recorded declarations, or narrow the claim to the tables actually bound.

   The registry and ordering attack otherwise holds: resting rows select inner boxes or headers, no driven row is added, and the construction, export, conformance, and barrel insertions agree (`tp-shared.patch:662`, `:508`, `:607`, `:479`). The setup receipt is `tp-instruments/tp-gates.log.txt:17`.

7. **BROKEN — Guide’s plugin and empty-header statements.** The guide says the template removes an empty header and that the plugin never writes such markup (`tp-shared.patch:290`). The input and release-source path under claim 5 falsify that sentence and the plugin row’s unqualified empty-content removal statement (`tp-shared.patch:389`).

   The same plugin row unconditionally says the plugin sets the fade class. With animation disabled and the default template, the release skips that addition (`node_modules/bootstrap/js/src/tooltip.js:311`, `:319`, `:365`). State the falsy-content removal condition and conditional animation behaviour, and update the specimen-decline prose.

   The ledger rows match the report and the compiled departures. The file rows, section placement, alias cell, sanitizer ownership, and shadow-property qualification hold. The guide’s narrow-viewport description agrees with the report’s stated width measurement (`b-modal-tp-report.md:214`); that exact measurement has no retained probe output.

8. **BROKEN — Writing and report requirements.** The added mixin comment leaves the alignment keyword without its required noun (`tp-shared.patch:458`). The report uses temporal “new” and “now” (`b-modal-tp-report.md:11`, `:381`, `:386`). Its guide copy identifies arrow triangles by position (`:309`). Replace these with the applicable noun, present-tense wording, and the border/fill triangle names.

   Several gate commands are abbreviated with an ellipsis or an unspecified file population (`b-modal-tp-report.md:199`). The retained gate log supplies complete commands for the setup, formatting, and lint runs, but the report does not meet its exact-command requirement. Reproduce those commands and retain the missing earlier-run receipts.

   The syntax attack found no added prohibited TypeScript assertion, non-null assertion, or unrestricted type. No added helper duplicates the installed test primitives; the implementation imports the existing readers and builders.

   **Outside finding `report-counts` — BROKEN.** The report counts growable sets, including “two sections” at `b-modal-tp-report.md:222` and “two names” at `:387`. Remove those prose tallies. The requested count record follows; run-result quantities are listed as evidence rather than treated as additional behavioural defects.

   | Report location | Counts stated |
   | --- | --- |
   | `:44` | Owned-file additions: `120`, `165`, `246`, `337`, `20`, `20`, `144`, `151`. |
   | `:49` | Shared-file diffstat values: `4`, `99`, `2`, `202`, `22`, `2`, `6`, `6`, `4`, `6`, `67`, `2`, `97`, `228`, `6`, `34`. |
   | `:65` | `16` changed files; `777` insertions; `10` deletions. |
   | `:72`, `:109`, `:113` | `22` passing tests; `145` passing tests; media count `0`. |
   | `:158`, `:162` | Failing-first: `3` failed files, `19` failed tests, `1` passed test, total `20`. Restored: `3` passed files, `31` passed tests. |
   | `:168`–`:182` | Mutation summaries: failed/passed/total values `1/8/9`, `1/10/11`, `2/7/9`, `5/4/9`, `3/8/11`, and `2/9/11`, repeated for the named edits. |
   | `:194`–`:204` | Gate populations: `31`, `8`, `22` including the baseline, `19`, `109` passed plus `1` skipped of `110`, `145`, `101`, `5`, and `46`. |
   | `:206` | Formatting population `359` files. |
   | `:222`, `:385`, `:387` | “two sections”; “one more popover specimen”; “twice”; `1` failed, `257` passed, `12` skipped of `270`; `270` passed; `101` passed; “two names”. |
   | `:7`, `:17`, `:18`, `:113`, `:175`, `:212`, `:281`, `:365`, `:375` | Collective tallies expressed with “both”: keys, modes, sections, widths, frames, and proof files. |
   | `:15`, `:16`, `:309`, `:355` | Structural quantities: a side map, a triangle pair, and a containing box. These describe the mechanism rather than its test population. |

   CSS values, viewport dimensions, measured lengths, versions, exit codes, durations, and claim identifiers are not growable-set tallies.

VERDICT: FAIL 3, 5, 6, 7, 8; outside the claims: report-counts