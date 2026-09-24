# J-SCROLLSPY audit round 1 — the objective lane's verdict (GPT-6 Astra through codex exec, read-only)

Thread `01a0d1c0-cd4b-72d3-9cba-e233737f8e64`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-scrollspy-audit.jsonl` (launch copy under `tmp/codex/`); 29 commands; 470 s; usage {"input_tokens":3160526,"cached_input_tokens":2957952,"cache_write_input_tokens":0,"output_tokens":13017,"reasoning_output_tokens":5202}. Retained verbatim from the exec's last message.

---

Objective lane. Verdicts below distinguish source findings from executed evidence supplied by the Orchestrator.

1. **BROKEN — the interface-conformance clause.** After an activation, remove the selected section and call `refresh()`. Refresh replaces the maps and observer but retains `#link`; with no sections remaining, nothing subsequently clears it. The getter still returns the link while its token remains. This contradicts “undefined when no section is in view” in `src/browser/types.ts:1083`. Evidence: `src/browser/ScrollSpy.ts:191`, `:196`, `:209`, `:219`. The returned destruction-summary patch does not address this sentence.

   The construction and lifetime mechanisms otherwise withstand the attacks examined: overridden invalid attributes are skipped per key; omitted intersection keys still read attributes; validation precedes claiming; abort disconnects observation; release precedes snapshot restoration. Evidence: `ScrollSpy.ts:94`, `:126`, `:137`, `:149`, `:159`, `:223`; `helpers.ts:220`; `HostSnapshot.ts:124`.

   The supplied proof bindings distinguish their mutations:

   | Proof location | Mutation and distinguishing assertion |
   | --- | --- |
   | `ScrollSpy.test.ts:581` | Omit intersection validation or vocabulary validation: the expected `SCROLL_SPY_OPTION_INVALID` context differs or construction succeeds. Log `:27`, `:28`, `:32`. |
   | `ScrollSpy.test.ts:631` | Omit host validation or claiming: invalid-host errors and registry/second-owner assertions fail. Log `:34`, `:35`. |
   | `ScrollSpy.test.ts:427` | Omit target, smooth, margin, or threshold attribute parsing: target identity, prevented clicks, or activation sequence differs. Log `:23`–`:26`. |
   | `ScrollSpy.test.ts:659` | Ignore either abort path: registry and restored-token assertions fail. Log `:36`, `:37`. |
   | `ScrollSpy.test.ts:693` | Omit restoration: saved target/link tokens differ. The compound observer/lifetime mutation additionally distinguishes post-destroy activity, but does not independently prove each removed safeguard. Log `:38`, `:39`. |
   | `ScrollSpy.test.ts:741` | Bind hooks with a CustomEvent-only guard: the malformed payload increments the recorder. Log `:45`. |

   Smallest correction: carry the getter-summary correction with the shared-file patch, explicitly describing the last selected link while it retains its token, and pin the refresh/removal boundary. If the existing visibility promise is intended instead, refresh must invalidate the stale selection.

2. **CONFIRMED.** I attacked refresh with disabled links becoming enabled, non-anchor `[href]` elements, malformed fragments, hidden sections, changed overflow, and refresh during an old delivery. The maps are rebuilt from current markup; decoding failure refuses the link; section lookup stays inside the host; overflow is read for each new observer; an old delivery fails observer identity after refresh. Evidence: `ScrollSpy.ts:196`, `:237`, `:336`.

   The refresh proof distinguishes observing disabled or hidden sections and retaining the original map through its barrier, empty-active assertions, and later activation (`ScrollSpy.test.ts:273`; mutation log `:12`–`:15`). The vocabulary proof distinguishes ignoring each replacement group through selected-link identity, replacement tokens, parent selection, and untouched decoys (`ScrollSpy.test.ts:485`; log `:29`–`:31`). These whole-file rows name the affected cases; they bind those mutations, not every refresh interleaving.

3. **BROKEN — token takeover escapes delivery doors.**

   **After dispatch:** use the delivery shape already exercised by `ScrollSpy.test.ts:886`: scroll to `105`, admitting “Two” and “Three” in one delivery. In the activation listener for “Two”, remove its `active` token without destroying or refreshing the spy. `#activate` returns `#holds(observer, [])`, which accepts that state. The loop reads “Three”, activates it, and dispatches again. The claim requires stopping when the selected link loses its token. Evidence: `ScrollSpy.ts:271`, `:282`, `:298`, `:302`, `:303`, `:336`. Event listeners execute within dispatch, so the removal precedes this door. [DOM event dispatch](https://dom.spec.whatwg.org/#concept-event-dispatch)

   **After removal:** let a customized anchor’s one-shot class reaction restore its token when its section leaves. The leaving write passes `[]`, so the door accepts the restored token. A later entering entry in that delivery gathers the anchor among active links and removes the consumer’s restored token again. Evidence: `ScrollSpy.ts:274`, `:276`, `:294`, `:296`, `:355`. Custom-element reactions run before the annotated operation returns. [Custom-element reaction ordering](https://html.spec.whatwg.org/multipage/custom-elements.html#cereactions)

   Door trace:

   | Door | Destruction or refresh | Token takeover |
   | --- | --- | --- |
   | Leaving-link removal, `:276` | Stops | Re-added token is unchecked |
   | Target and active-link clearing, `:296` | Stops | Re-added cleared tokens are unchecked |
   | Selected-link addition, `:298` | Stops | Selected-link removal stops |
   | Each parent addition, `:300` | Stops | Selected-link removal stops; the parent’s own token is unchecked |
   | Activation dispatch, `:303` | Stops | Selected-link removal is unchecked |

   Smallest correction: retain the selected-link requirement after dispatch and make removal doors reject reversal of their removal. Add real-reaction and same-delivery proofs. Preserve ordinary consecutive activations when no takeover occurs.

   The existing proof bindings are narrower:

   | Proof location | Mutation and distinguishing assertion |
   | --- | --- |
   | `ScrollSpy.test.ts:61` | First-entry selection, reversed upward selection, unconditional forgetting, cancelable activation, or wrong related target changes the final link/event sequence. Log `:2`–`:4`, `:43`, `:44`. |
   | `ScrollSpy.test.ts:127` | Delete leaving handling: the token remains and the empty-selection assertion fails. Log `:5`. |
   | `ScrollSpy.test.ts:155` | Skip parents/toggle or remove the target boundary: expected active-link sets differ, including the outside-parent check. Log `:8`–`:10`. |
   | `ScrollSpy.test.ts:222` | Delete the zero-scroll return: “Two” replaces “One” and the event list grows. Log `:6`. |
   | `ScrollSpy.test.ts:771` | Return true after writes: the external root listener records an activation after destruction. This recorder remains installed when engine hooks abort. Log `:40`. |
   | `ScrollSpy.test.ts:830` | Remove selected-token checks: the parent write and activation become observable after the reaction removes the token. Log `:41`. |
   | `ScrollSpy.test.ts:886` | Remove the post-dispatch door: the next entry clears the target token restored by destruction. Its final target-class assertion distinguishes the mutation even if a later write door stops that entry. Log `:42`. |

   **The cascade proof lacks its claimed red binding.** `ScrollSpy.test.ts:248` asserts selected and unselected computed backgrounds, but no mutation row names that case as failing. The reported initial red run collected no tests (`j-scrollspy-report.md:30`). Replacing the default active token with one the shipped cascade does not select would challenge its paint assertion; that collected failure must be recorded.

4. **CONFIRMED.** I attacked descendant clicks, sections outside the host, positioned hosts, viewport roots, and `smooth: false`. The listener uses the closest `[href]`, requires membership in the refreshed map, prevents only mapped clicks, and uses the claimed root-relative or document-relative coordinates. Its signal removes the listener at destruction. Evidence: `ScrollSpy.ts:153`, `:362`.

   The host proof distinguishes omitted smooth handling, instant scrolling, reading only the clicked element, document-wide section lookup, and Bootstrap’s offset subtraction through prevented-click readings, intermediate scroll positions, and final position (`ScrollSpy.test.ts:331`; log `:16`–`:20`). The document proof distinguishes using the host as root and subtracting the host offset (`ScrollSpy.test.ts:386`; log `:21`, `:22`). The guide records these departures at `guides/veneer.md:941` and `:950`.

5. **CONFIRMED.** I attacked nested construction scans, an existing consumer owner, late insertion, removal, directly destroyed owners, invalid vocabulary on an empty root, and refusal after an earlier successful acquisition. Registry lookup prevents a second scan from acquiring an existing owner. The observer releases only acquired engines; the catch destroys earlier acquisitions before listener installation. Evidence: `Delegate.ts:123`, `:146`, `:156`, `:165`, `:258`, `:271`.

   E12 remains a per-delegate button/collapse decision before marking or preventing. Marks remain keyed by route and driven host. A delegate destroyed during a routed event stops before marking another collapse panel, leaving that panel available to a live outer delegate. ScrollSpy construction introduces no click-route mark or conflict. Evidence: `Delegate.ts:176`, `:189`, `:215`, `:234`; retained diff `j-scrollspy.diff:647`.

   | Proof location | Mutation and distinguishing assertion |
   | --- | --- |
   | `Delegate.test.ts:1015` | Remove scanning/acquisition or discard every ScrollSpy: registry, removal restoration, and survivor assertions fail. Log `:46`, `:48`, `:49`. |
   | `Delegate.test.ts:1047` | Construct over the consumer owner: construction throws instead of preserving that owner. Log `:47`. |
   | `Delegate.test.ts:1062` | Ignore replaced selector/classes: default-host exclusion, target identity, or replacement-token assertions fail. Log `:50`, `:51`. |
   | `Delegate.test.ts:1093` | Remove vocabulary validation: the empty-root construction no longer returns the expected error. Log `:52`. |
   | `Delegate.test.ts:1114` | Remove catch cleanup: the earlier valid host remains owned. Log `:53`. |

6. **BROKEN — the assertion that every named parser proof has a mutation row.** The valid-margin case at `parsers.test.ts:48` appears in no failing row. The margin mutations remove blank rejection or platform validation and name only the invalid-margin case (`j-scrollspy-mutations.log.txt:57`, `:58`). The import failure reported at `j-scrollspy-report.md:30` collected no tests and cannot bind the valid-margin assertions.

   Smallest correction: mutate the successful return at `parsers.ts:57` to `undefined`, retain the import graph, and record the valid-margin case failing before restoration.

   The implementation withstands the examined attacks: plain events, SVG related targets, throwing accessors, blank/invalid margins, malformed JSON, blank threshold members, nonnumeric suffixes, empty arrays, nonfinite ratios, and out-of-range ratios. Evidence: `validators.ts:166`; `parsers.ts:53`, `:85`. Installed `boundsOf` expressly uses inclusive bounds (`node_modules/@orkestrel/contract/dist/src/core/index.d.ts:258`; implementation `index.js:6742`). Tables and nested defaults are frozen (`constants.ts:73`–`:108`).

   Other bindings hold: table unfreezing fails the freeze assertion (`ScrollSpy.test.ts:24`; log `:33`); broadening the event guard or removing containment fails the shape/accessor cases (`validators.test.ts:172`, `:201`; log `:54`–`:56`); removing JSON parsing fails the positive threshold case (`parsers.test.ts:70`; log `:59`); permissive numeric parsing, empty-list acceptance, or unbounded ratios fail rejection assertions (`parsers.test.ts:80`; log `:60`–`:62`); removing the barrel export fails the explicit export set (`index.test.ts:15`; log `:63`).

7. **BROKEN — the returned patch leaves a false interface sentence.** The patch correctly repairs the destruction summary, but leaves the getter promise identified in claim 1 at `types.ts:1083`. Its actual contract is stated more accurately in `guides/veneer.md:829`. Extend the returned shared-file correction accordingly.

   The source remarks also promise token checking after the link’s write without stating the dispatch exception (`ScrollSpy.ts:38`); claim 3 identifies the implementation mismatch. Carry that correction with the door fix.

   Attacks on the documented Bootstrap departures otherwise held: direct `findOne` does pass the decoded fragment as a selector (`bootstrap/js/src/scrollspy.js:213`; `dom/selector-engine.js:40`); the parent walk, missing-toggle behavior, offset calculations, observer replacement, and listener lifetime differ as documented. Surface summaries match the new declarations, and the example uses the public browser entry (`guides/veneer.md:131`, `:460`).

   **UNRESOLVED clause:** parity with the returned patch applied has no supplied run. The report explicitly says the gates did not include it (`j-scrollspy-report.md:7`). Applying the corrected shared-file patch and running guide parity settles that clause.

8. **BROKEN — a newly added element check bypasses `isInstance`.** `tests/src/browser/ScrollSpy.test.ts:357` uses `event.target instanceof Element`; it is an added line at `j-scrollspy.diff:1862`. Replace it with `isInstance(event.target, Element)`. This is distinct from untouched legacy checks awaiting the separate migration. The `as const` tuple at `ScrollSpy.test.ts:605` is permitted by `.claude/rules/typescript.md` and is not a prohibited assertion.

   The status contains the declared owned files and no off-limits file (`j-scrollspy-status.txt:1`). The supplied gate exits are green; they were not rerun. The mutation instrument checks replacement cardinality, records named failing cases, restores source bytes in `finally`, and compares source digests (`j-scrollspy-mutations.py:229`, `:247`, `:254`, `:216`). Its retained log contains the stated final green readings and `receipt: restored byte for byte` (`j-scrollspy-mutations.log.txt:64`, `:70`).

   **UNRESOLVED clauses:** the Orchestrator’s mutation replay is pending, as the brief requires. The claimed first-pass strengthening chronology is supported only by the writer’s report (`j-scrollspy-report.md:59`); the retained final instrument and log establish the final assertions and mutations, not that history. The independent replay and retained earlier mutation results would settle these clauses.

**Findings fitting no claim:** none.

**Attacked and held:** Destruction and refresh from a synchronous write reaction invalidate the current delivery; a fresh observer cannot synchronously re-enter activation merely because `refresh()` calls `observe()`. IntersectionObserver delivery is scheduled through its task source. [IntersectionObserver delivery algorithm](https://w3c.github.io/IntersectionObserver/#notify-intersection-observers) Ordinary scrolling may activate successive entries without constituting takeover. Consumer edits outside saved tokens survive destruction. E13’s permitted empty class/style attributes are not a new ScrollSpy finding.

**Referrals:** The Orchestrator should reproduce the claim-3 interleavings on Chromium 153.0.8010.12, add their distinguishing controls, and perform the pending mutation replay. The shared-file integration owner carries the getter/destruction contract corrections and patched parity run. The mechanical lane owns the added element-check correction.

**Bounds:** This is a source and supplied-proof audit, not an independently executed behavioral audit. No browser test, build, mutation, gate rerun, file write, or sub-agent was used. No `prove` call was made; there is no refused-call result or probe receipt to quote. Whole-file mutation rows bind the named failing cases and inspected assertions; a file-level import failure does not.

VERDICT: FAIL 1, 3, 6, 7, 8; outside the claims: none
