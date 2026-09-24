# J-SANITIZER design round — the objective lane's proposal (analyst on GPT-6 Astra)

Thread `01a0d4f2-0482-7c33-8490-cd31a360b8ef`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-sanitizer-design-analyst.jsonl` (launch copy under `tmp/codex/`); 27 commands; 451 s; usage {"input_tokens":1427669,"cached_input_tokens":1268480,"cache_write_input_tokens":0,"output_tokens":12710,"reasoning_output_tokens":3234}. Retained verbatim from the exec's last message.

---

1. **Recommend a DOM sanitizer behind capability-based default selection, retaining the native adapter.**

   **Read:** The failure reaches text-only tooltips because `Tooltip.#build` always sanitizes the template; `html: false` affects the subsequent content write only. The constructor currently selects `NativeSanitizer` unconditionally, and that adapter throws when `setHTML` is absent. Evidence: [Tooltip.ts:265](C:/Users/mikes/WebstormProjects/veneer/src/browser/Tooltip.ts:265), [Tooltip.ts:485](C:/Users/mikes/WebstormProjects/veneer/src/browser/Tooltip.ts:485), [helpers.ts:516](C:/Users/mikes/WebstormProjects/veneer/src/browser/helpers.ts:516), [helpers.ts:590](C:/Users/mikes/WebstormProjects/veneer/src/browser/helpers.ts:590), [NativeSanitizer.ts:37](C:/Users/mikes/WebstormProjects/veneer/src/browser/sanitizers/NativeSanitizer.ts:37).

   **Inferred — options and costs:**

   | Option | Cost and ruling |
   |---|---|
   | Require a newer Chromium or skip affected tooltip tests | Excludes an expressly required gate host. Reject. |
   | Require consumers to inject a sanitizer | Leaves the default tooltip broken. Reject. |
   | Bypass template sanitization for text-only tooltips | Leaves markup content broken and permits unsafe template markup. Reject. |
   | Import Bootstrap, DOMPurify, or `@orkestrel/html` | Adds a runtime dependency or adopts incompatible semantics. Reject. |
   | Use the DOM implementation everywhere | Simplifies selection, but discards the platform operation on capable hosts. Viable, not recommended. |
   | Make `NativeSanitizer` silently fall back | Changes its explicit native-only failure contract and obscures which implementation a consumer requested. Reject. |
   | Select `NativeSanitizer` or `DOMSanitizer` through a factory | Requires a maintained DOM safety floor and backend proofs. Recommend. |

   **Read:** The existing interface already supplies the required boundary: synchronous `write(element, html)`, replacement of children, propagated failures, and no retention of either argument. The design law permits a shared engine with a native operation replacing its work. Bootstrap already parses through `DOMParser`, then walks elements and attributes. The installed `@orkestrel/html` sanitizer instead unwraps unlisted safe elements and refuses `data:` URLs. Evidence: [types.ts:632](C:/Users/mikes/WebstormProjects/veneer/src/browser/types.ts:632), [AGENTS.md:71](C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md:71), [sanitizer.js:93](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/util/sanitizer.js:93), [installed HTML declarations:770](C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/html/dist/src/core/index.d.ts:770).

   **Inferred — amendment:** Amend R10’s unconditional native default and its backend-specific options name. Introduce capability selection because the required host lacks the operation. Keep `buildSanitizer`, `SANITIZE_ALLOWLIST`, `sanitize: false`, and `sanitizeFn` struck; keep the constructor-only port and R15’s recorded departure. The factory below selects an adapter; it does not reconstruct the abandoned platform-`Sanitizer` builder. Evidence for the existing rulings: [design verdict:91](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md:91), [design verdict:96](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md:96), [design verdict:100](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md:100).

2. **Specify the implementation as follows.**

   **Inferred — types and placement:** Retain `SanitizerInterface`, `SanitizerConfig`, `SanitizerElementNamespaceWithAttributes`, `SetHTMLOptions`, and `SanitizeTargetInterface`. Replace `NativeSanitizerOptions` with `SanitizerOptions { readonly config?: SanitizerConfig }`, updating every consumer without an alias. Use this options contract for the adapters and factory. Put it in `src/browser/types.ts`; put `DOMSanitizer` in `src/browser/sanitizers/DOMSanitizer.ts`; put `createSanitizer(options?: SanitizerOptions): SanitizerInterface` in `src/browser/factories.ts`. Export them through the browser barrel.

   **Read:** The actual guard target is named `SanitizeTargetInterface`, rather than the brief’s shortened `SanitizeTarget`. The existing options contain only `config`; the configuration mirror supports only `elements`, global `attributes`, `dataAttributes`, and element-local `attributes`. These placements and names follow the prescribed factory and extension-category rules. Evidence: [types.ts:650](C:/Users/mikes/WebstormProjects/veneer/src/browser/types.ts:650), [types.ts:665](C:/Users/mikes/WebstormProjects/veneer/src/browser/types.ts:665), [types.ts:679](C:/Users/mikes/WebstormProjects/veneer/src/browser/types.ts:679), [types.ts:709](C:/Users/mikes/WebstormProjects/veneer/src/browser/types.ts:709), [architecture.md:214](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/architecture.md:214), [names.md:174](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md:174).

   **Inferred — parsing and commit:** Give `DOMSanitizer` the defining traversal as private methods. Create an inert HTML document through `DOMParser`; create a detached parsing context matching the destination’s namespace and local name, preserving parsing-relevant context. Parse the supplied markup with that context’s platform `innerHTML` fragment parser. Do not simply parse a whole document and take `body`: table, select, template, and foreign-content contexts need their actual fragment semantics. Walk a stable collection of child nodes, including retained templates’ `content`. Sanitize before adoption, assemble the surviving nodes into a fragment, and commit with `replaceChildren`. Never serialize sanitized output and parse it again. Reject script destinations before mutation rather than inserting executable text into them. Propagate parsing and policy-enforcement failures; do not install a permissive Trusted Types policy.

   **Inferred — configuration semantics:**

   | Configuration | Required behavior |
   |---|---|
   | `config` omitted | Use the existing `SANITIZER_ALLOWLIST`. |
   | `config: {}` | Apply the safety floor without substituting Bootstrap’s allowlist. |
   | `elements` omitted | Impose no configured element allowlist; still apply the safety floor. |
   | `elements: []` | Remove element subtrees; retain surrounding text. |
   | Listed element | Match its namespace and local name; the existing entries designate HTML elements. Remove unlisted elements with their entire subtree. |
   | Global `attributes` supplied | Permit its names plus that element’s local names. An empty list is restrictive. |
   | Global `attributes` omitted | A supplied local list restricts that element; without either list, retain attributes subject to the safety floor. |
   | `dataAttributes: true` | Permit unlisted, unnamespaced `data-*` attributes alongside a global attributes list. |
   | `dataAttributes: false` or omitted | Follow the declared distinction between explicit names and general permission. Explicitly listed data names survive when valid. |
   | `dataAttributes` supplied without global `attributes` | Throw `TypeError` before committing, matching the declared refusal. |

   **Read:** These distinctions are contractual, particularly the local-list effect on data attributes. The existing omitted-versus-empty test requires different output, and the custom configuration test requires replacement of the Bootstrap allowlist. Evidence: [types.ts:668](C:/Users/mikes/WebstormProjects/veneer/src/browser/types.ts:668), [types.ts:680](C:/Users/mikes/WebstormProjects/veneer/src/browser/types.ts:680), [NativeSanitizer.test.ts:131](C:/Users/mikes/WebstormProjects/veneer/tests/src/browser/sanitizers/NativeSanitizer.test.ts:131), [NativeSanitizer.test.ts:149](C:/Users/mikes/WebstormProjects/veneer/tests/src/browser/sanitizers/NativeSanitizer.test.ts:149), [NativeSanitizer.test.ts:176](C:/Users/mikes/WebstormProjects/veneer/tests/src/browser/sanitizers/NativeSanitizer.test.ts:176).

   **Inferred — mandatory safety floor:** Declare frozen, namespace-aware security tables in `src/browser/constants.ts`, separate from `SANITIZER_ALLOWLIST`:

   - `SANITIZER_UNSAFE_ELEMENTS`: HTML `base`, `embed`, `frame`, `iframe`, `object`, and `script`; SVG `script` and `use`. Remove their subtrees even when explicitly allowed.
   - `SANITIZER_EVENT_ATTRIBUTES`: the standard and Chromium event-handler attribute names. Remove them even when explicitly allowed; do not equate every arbitrary `on…` attribute with a registered handler.
   - `SANITIZER_URL_ATTRIBUTES`: navigating element/attribute pairs, including anchor links, form actions, submit-control actions, SVG links, and MathML links.
   - `SANITIZER_ANIMATION_ATTRIBUTES`: SVG animation attributes capable of retargeting links.

   Use the platform `URL` parser on DOM-decoded attribute values to identify `javascript:` schemes, including embedded tab/newline and leading-control variants. Remove the attribute, preserving its element. Preserve relative, HTTPS, and permitted `data:` URLs. Prevent SVG animation from assigning `href` or `xlink:href`; do not attempt to parse animation value languages. Keep ordinary image `srcset` as an image-source attribute rather than inventing a candidate-list parser. Remove comments and processing instructions under this configuration subset.

   **Read — external mechanism:** The HTML standard separates the unavoidable unsafe-element/event-handler floor from navigating URL and SVG-animation checks, and uses URL parsing for `javascript:` detection. [HTML sanitization algorithms and constants](https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#html-sanitization).

   **Inferred — selection:** `createSanitizer` reads `isSanitizeTarget(document.createElement('div'))` when called. Select `NativeSanitizer` when true and `DOMSanitizer` otherwise. Read the capability in the document used by template construction; do not inspect the user agent, require the `Sanitizer` global, cache a module-load result, or catch a native write failure and retry through the fallback. The native adapter retains its own per-target guard.

   **Read:** `buildTip` constructs its wrapper in the current document, and the native operation already checks the actual destination and propagates its failure. Evidence: [helpers.ts:517](C:/Users/mikes/WebstormProjects/veneer/src/browser/helpers.ts:517), [NativeSanitizer.ts:37](C:/Users/mikes/WebstormProjects/veneer/src/browser/sanitizers/NativeSanitizer.ts:37). **Inferred:** The native operation replaces the JavaScript traversal with a platform operation; no measured performance ratio is claimed.

3. **Keep behavioral requirements unconditional; condition only native-operation applicability.**

   **Inferred — proof plan:** Put reusable fixtures and independent expected outputs in `tests/setupBrowser.ts`. Run the DOM implementation’s complete corpus on Chromium 141 and Chromium 153. Run the same corpus directly against `NativeSanitizer` where `setHTML` exists. Keep tooltip and popover behavior tests unconditional.

   | Proof | Mutation it must distinguish |
   |---|---|
   | Default text tooltip with a sanitized custom template | Restore the unconditional native default; bypass template sanitization. |
   | Default HTML tooltip and popover title/body | Bypass sanitizer writes or sanitize only one content slot. |
   | Bootstrap elements, global attributes, complete declared ARIA names, and per-element attributes | Replace the allowlist with `{}`; omit an ARIA name; globalize anchor/image attributes. |
   | Omitted configuration, `{}`, empty element list, empty global list, and empty local list | Treat absence as an empty list, or replace `{}` with the default allowlist. |
   | Data-attribute matrix, including explicitly listed names and invalid configuration | Ignore `dataAttributes`; make false an absolute veto; accept the invalid combination. |
   | Explicitly permitted unsafe elements and handlers | Let consumer configuration override the safety floor. |
   | Encoded/control-obfuscated script URLs, safe relative URLs, HTTPS, and data-image URLs | Use a raw prefix check; remove the entire anchor; reject all `data:` URLs. |
   | SVG/MathML links and SVG link-target animation under `{}` | Compare names without namespaces; omit animation-mediated URL protection. |
   | Nested templates, malformed markup, table/select contexts, and script destinations | Walk only ordinary descendants; always parse as `div`; commit executable text. |
   | Synchronous replacement, empty input, repeated writes, and failure before commit | Append instead of replace; defer the write; clear the destination before validation succeeds. |
   | Explicit consumer sanitizer and propagated failure | Override the injected implementation or swallow its error. |

   **Read:** The existing native tests already establish the principal allowlist, ARIA, configuration, and per-element cases. The supplied-sanitizer tooltip case establishes template/content routing and text handling. Preserve their assertions when sharing fixtures. Evidence: [NativeSanitizer.test.ts:111](C:/Users/mikes/WebstormProjects/veneer/tests/src/browser/sanitizers/NativeSanitizer.test.ts:111), [NativeSanitizer.test.ts:140](C:/Users/mikes/WebstormProjects/veneer/tests/src/browser/sanitizers/NativeSanitizer.test.ts:140), [NativeSanitizer.test.ts:159](C:/Users/mikes/WebstormProjects/veneer/tests/src/browser/sanitizers/NativeSanitizer.test.ts:159), [Tooltip.test.ts:389](C:/Users/mikes/WebstormProjects/veneer/tests/src/browser/Tooltip.test.ts:389).

   **Inferred — backend-selection proof:** In `tests/src/browser/factories.test.ts`, register **“selects the native sanitizer exactly when a fresh template target exposes setHTML.”** Independently inspect the fresh element’s member, without calling `isSanitizeTarget` as the oracle. Assert that the factory result is an instance of the corresponding concrete adapter, then perform a real sanitized write. Forcing native selection fails on Chromium 141; forcing DOM selection fails on Chromium 153. Correct sanitized output alone would not distinguish the latter mutation.

   **Inferred — conditional form:** Register native-success and native-configuration-refusal cases with `it.skipIf(!capability)(...)`, accompanied by a cited comment identifying the missing callable `Element.setHTML` operation. Split the existing combined native failure case: missing-member refusal runs everywhere; platform configuration refusal requires the native operation. Keep capability-independent allowlist assertions outside the conditional group. Do not wrap test registration in platform-name branches or return early from a passing test.

   **Read:** The rules require a runtime capability reading, independent oracles, and a cited applicability reason for conditional skips; current-scope behavior cannot be completed through skipped tests. Evidence: [tests.md:35](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md:35), [portability.md:24](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/portability.md:24), [AGENTS.md:90](C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md:90). **Inferred:** Running fallback and component behavior everywhere satisfies that requirement while preserving meaningful native-specific proofs.

4. **Rewrite the other reds as host-varying proofs; neither establishes another sanitizer implementation defect.**

   **Read — validator case:** **“accepts an object whose setHTML member is a function and refuses every other value.”** It unconditionally expects a fresh `div` to pass. The guard actually checks for a callable member and correctly returns false when absent. Evidence: [validators.test.ts:642](C:/Users/mikes/WebstormProjects/veneer/tests/src/browser/validators.test.ts:642), [validators.ts:429](C:/Users/mikes/WebstormProjects/veneer/src/browser/validators.ts:429).

   **Inferred — ruling:** This shares the missing-capability trigger, but the defect is the assertion. Compare the real element against an independent callable-member reading. Retain structural positive/negative inputs and hostile-accessor cases unconditionally. Correct the guard’s example comment claiming “true on Chromium” at [validators.ts:425](C:/Users/mikes/WebstormProjects/veneer/src/browser/validators.ts:425).

   **Read — Placement case:** **“flips to the opposite side when the preferred side overflows, and tries the listed fallbacks instead when given.”** The recorded failure is at its no-fallback assertion: the test requires viewport clamping and overlap, while Chromium 141 reports overflow. The source writes `position-try-fallbacks: none` for an empty list. Evidence: [Placement.test.ts:196](C:/Users/mikes/WebstormProjects/veneer/tests/src/browser/Placement.test.ts:196), [Placement.test.ts:218](C:/Users/mikes/WebstormProjects/veneer/tests/src/browser/Placement.test.ts:218), [Placement.ts:141](C:/Users/mikes/WebstormProjects/veneer/src/browser/Placement.ts:141), [recorded failure:186](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/main-attr-src-browser.log.txt:186).

   **Inferred — ruling:** This is a host-varying platform-layout assertion, independent of sanitization. Retain the actual flip and explicit-fallback expectations. For the empty-list segment, compare against an independently constructed native CSS-anchor fixture with equivalent geometry and no fallbacks. Assert the `none` declaration and the relationship to that fixture. Mutation: ignore the empty list and restore the default flip fallback. Do not accept arbitrary geometry or add a JavaScript positioning algorithm.

5. **Land bounded units with an explicit Popover hand-off.**

   **Inferred — J-SANITIZER ownership:** Own the sanitizer contracts in `src/browser/types.ts`; `sanitizers/DOMSanitizer.ts`; the options-name update in `sanitizers/NativeSanitizer.ts`; `factories.ts`; sanitizer tables and necessary pure leaves in `constants.ts` and `helpers.ts`; the validator documentation correction; browser barrel exports; mirrored sanitizer/factory/helper/validator tests; shared sanitizer fixtures; and sanitizer guide/parity rows.

   **Inferred — Popover hand-off:** The Popover owner changes the constructor assignment to:

   ```ts
   this.#sanitizer = options?.sanitizer ?? createSanitizer()
   ```

   It also replaces the native-adapter import with the factory import and owns the tooltip/popover integration proofs. Preserve the shared engine and its guarded sanitizer-call boundaries. **Read:** The current assignment is at [Tooltip.ts:265](C:/Users/mikes/WebstormProjects/veneer/src/browser/Tooltip.ts:265); the shared Popover seam is R12 at [design verdict:93](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md:93); the in-flight ownership constraint is in [design brief:34](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sanitizer-design-brief.md:34).

   **Inferred — J-PLACEMENT-PROOF ownership:** Own the no-fallback segment of `tests/src/browser/Placement.test.ts` and its native fixture in `tests/setupBrowser.ts`. Coordinate that shared file with J-SANITIZER. No `Placement.ts` change follows from this failure.

   **Inferred — acceptance:** Require the configuration and security corpus, backend-selection proof, and unconditional tooltip/popover behavior to pass on Chromium 141 and Chromium 153. On Chromium 153, additionally require native-versus-DOM differential results for the supported configuration subset, backed by independent expected outputs. Resolve any discrepancy explicitly before acceptance; do not broaden acceptance by weakening fixtures. Record red-before/green-after commands and mutation receipts. Update the guide’s default-selection description and R15 sanitizer obligation, and finish the repository gate chain on each claimed host. No dependency, shim, unsafe writer, global sanitizer construction, or skipped component requirement enters the result.

   **Read:** The guide currently promises the unconditional native default, and the required gate order is prescribed centrally. Evidence: [veneer.md:2624](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:2624), [AGENTS.md:104](C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md:104). The proposal’s new behavior and proofs are **inferred requirements**, not claimed passing measurements.

PROPOSAL: Add a configuration-faithful DOMSanitizer selected through createSanitizer when setHTML is absent, retain the explicit native adapter and unconditional component proofs, and repair the validator and Placement host assumptions in bounded units.
