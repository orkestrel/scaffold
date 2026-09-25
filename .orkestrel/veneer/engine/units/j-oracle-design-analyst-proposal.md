# J-ORACLE design round — the objective lane's proposal (analyst on GPT-6 Astra)

Thread `01a0d5fd-44e8-7a72-a132-c219657615d0`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-oracle-design-analyst.jsonl` (launch copy under `tmp/codex/`); 18 commands; 403 s; usage {"input_tokens":916627,"cached_input_tokens":826368,"cache_write_input_tokens":0,"output_tokens":11590,"reasoning_output_tokens":1980}. Retained verbatim from the exec's last message.

---

1. **Record settled DOM outcomes, with explicit departures.**

   **Read:** E26 requires an independent recording for every plugin; E9 reserves Veneer’s API shape, and E11 reserves its `.vn.` namespace. See [decisions.md:41](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md:41), [decisions.md:49](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md:49), and [decisions.md:183](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md:183). This implements the independence requirement in [ROADMAP.md:51](C:/Users/mikes/WebstormProjects/veneer/ROADMAP.md:51).

   **Inferred proposal:** Give each scenario stable element identities and record its initial, prepared, and post-action states. Capture:

   - Element presence and connectivity, including removed alerts and generated tips/backdrops.
   - Sorted class tokens; complete `aria-*` and `data-*` maps; `role`, `tabindex`, and relevant title attributes.
   - The focused element’s scenario identity.
   - Computed `display` and `visibility` for connected elements. Record ancestor visibility and connection separately: a descendant’s computed display alone does not establish that it is visible.
   - Tip slot presence and text, so an empty or wrongly populated tip cannot satisfy a visibility-only comparison.

   Do not record API members, option names, return values, event names, event ordering, mutation ordering, or elapsed durations as parity expectations. Runtime-specific adapters may use these to prepare and settle actions.

   The following is the proposed action inventory. End states are **inferred recording targets**, not claimed browser measurements. Each evidence cell identifies **read** source.

   | Plugin | Actions and shared end states | Read evidence |
   |---|---|---|
   | Collapse | Trusted clicks through `data-bs-target` and `href`; keyboard activation of a button trigger; open, close, and switch accordion siblings. Open: target has `collapse show`, no `collapsing`; triggers lose `collapsed` and read `aria-expanded="true"`. Close reverses those states and hides the target. Include horizontal panels and a selector naming panels that begin in the same state. | [collapse.js:140](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/collapse.js:140), [collapse.js:250](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/collapse.js:250) |
   | Dropdown | Toggle click; ArrowDown/ArrowUp navigation; Escape; item and outside clicks; Tab leaving the menu. Open: toggle/menu have `show`, toggle has expanded ARIA, menu is visible. Navigation focuses enabled items; Escape closes and focuses the toggle. Exercise valid `auto-close` modes and form-input exceptions; retained-open cases preserve the open state. | [dropdown.js:151](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/dropdown.js:151), [dropdown.js:205](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/dropdown.js:205), [Delegate.ts:773](C:/Users/mikes/WebstormProjects/veneer/src/browser/Delegate.ts:773) |
   | Tab | Click tab/pill/list controls; arrow keys, Home, End; repeat activation; skip disabled controls. Incoming control gains `active`, selected ARIA, and loses `tabindex="-1"`; outgoing control reverses them. Incoming pane becomes active/shown and visible; outgoing pane loses those tokens. Keyboard activation focuses the selected control. Include a tab inside a dropdown and its wrapper state. | [tab.js:109](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/tab.js:109), [tab.js:174](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/tab.js:174), [Tab.ts:373](C:/Users/mikes/WebstormProjects/veneer/src/browser/Tab.ts:373) |
   | ScrollSpy | Let declarative initialization settle; scroll a fixed scroll container down and back using trusted wheel/key input; click a direct smooth-scroll link; insert a section and call `refresh`, because refresh has no data route. The corresponding link and required nav/dropdown ancestors gain `active`; previous selections lose it. Observe settled sections away from intersection boundaries. | [scrollspy.js:92](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/scrollspy.js:92), [scrollspy.js:230](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/scrollspy.js:230), [Delegate.ts:176](C:/Users/mikes/WebstormProjects/veneer/src/browser/Delegate.ts:176) |
   | Alert | Click a descendant dismiss button and an external targeted dismiss control; keyboard-activate a button; include a disabled dismiss control. Accepted close removes `show` and ultimately disconnects the alert. Refused dismissal preserves it. Record the browser’s resulting focus rather than inventing a focus-return requirement. | [alert.js:44](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/alert.js:44), [Delegate.ts:651](C:/Users/mikes/WebstormProjects/veneer/src/browser/Delegate.ts:651) |
   | Carousel | Click next/previous/index controls; press LTR arrow keys after acquiring the instance; exercise wrap and non-wrap boundaries. Exactly the selected item and indicator remain active; only its indicator has `aria-current="true"`; transition tokens disappear and item visibility follows selection. A separate real-timer case observes an automatic advance without comparing its duration. | [carousel.js:277](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/carousel.js:277), [carousel.js:347](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/carousel.js:347), [Delegate.ts:827](C:/Users/mikes/WebstormProjects/veneer/src/browser/Delegate.ts:827) |
   | Modal | Open through its trigger; dismiss through its button, Escape, and a real backdrop press; try static-backdrop and disabled-Escape cases. Open: visible `show` host, dialog role, modal ARIA, no hidden ARIA, backdrop present, body `modal-open`, focus inside. Accepted close reverses those states and returns focus through the data route. Refusal leaves it open after the bounce settles. | [modal.js:178](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/modal.js:178), [modal.js:247](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/modal.js:247), [modal.js:339](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/modal.js:339) |
   | Offcanvas | Toggle open/closed; dismiss button, Escape, backdrop press; refusal settings; resize a normally opened responsive panel across its breakpoint. Open: `show`, dialog role and modal ARIA, visible panel/backdrop, appropriate focus. Close: no transition/shown tokens, no dialog/modal ARIA, backdrop absent, and data-route focus return. Responsive visibility is recorded separately from open-state tokens. | [offcanvas.js:111](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/offcanvas.js:111), [offcanvas.js:142](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/offcanvas.js:142), [guides/veneer.md:2571](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:2571) |
   | Toast | Call `show` because there is no show data route; click its dismiss control; call `hide`; observe autohide and hover/focus retention with real input and timers. Shown toast has `show`, appropriate `fade`, no settled `showing`, and is visible. Hidden toast remains connected but is hidden and lacks `show/showing`. | [toast.js:75](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/toast.js:75), [toast.js:102](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/toast.js:102), [Delegate.ts:912](C:/Users/mikes/WebstormProjects/veneer/src/browser/Delegate.ts:912) |
   | Tooltip | Construct explicitly; hover/leave; focus/blur; combine hover and focus; manual `show`/`hide`; disabled and empty-content cases. Open: connected visible tip with tooltip role, `tooltip`, `bs-tooltip-auto`, `show`, optional `fade`, populated content, and a valid `aria-describedby` link. Closing removes the tip and its description reference. | [tooltip.js:184](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/tooltip.js:184), [tooltip.js:303](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/tooltip.js:303), [Tooltip.ts:746](C:/Users/mikes/WebstormProjects/veneer/src/browser/Tooltip.ts:746) |
   | Popover | Construct explicitly; trusted click to open and close; keyboard activation of its button; manual methods; outside click and Escape while click-open; title-only/content-only cases. Compare the visible `popover`/`bs-popover-auto` tip, description relationship, header/body presence and content, then removal. Outside click and Escape leave the ordinary click-triggered popover shown. | [guides/veneer.md:2929](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:2929), [guides/veneer.md:2939](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:2939) |

   **Inferred proposal—explicit exclusions:** Store raw upstream observations before applying comparison rules. Each exception names its scenario, element, field/token, rationale, and governing guide paragraph or E-ruling. Reject unknown, stale, blanket, or whole-plugin exclusions.

   | Recorded difference | Comparison treatment and read authority |
   |---|---|
   | Construction, API, lifecycle, and timing differences | Compare common action outcomes. Separately identify excluded construction-default toggling, destruction/restoration, reentrant takeover, event payloads, and intermediate transition states. E9/E11 and [guides/veneer.md:778](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:778) govern; existing Veneer proofs retain these obligations. |
   | Collapse’s late trigger discovery, mixed-state multi-target reading, and transitioning-sibling rules | List these scenarios as departures; do not use their outcomes as shared expectations. Ordinary selector routing and settled accordion behavior remain compared. [guides/veneer.md:1087](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:1087). |
   | Tab controls with non-tab roles or no list | Exclude those specific behavioral comparisons, including the extra Bootstrap `show` token on a non-tab-role control. Keep standard tab/pane comparisons intact. [guides/veneer.md:1353](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:1353). |
   | ScrollSpy malformed fragments, offset coercion, traversal outside its target, and differing smooth-scroll geometry | Name these excluded scenarios explicitly. Use valid IDs and common geometry for shared activation cases. [guides/veneer.md:1507](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:1507). |
   | Dropdown/Tooltip/Popover native placement | Exclude native `popover`/anchor machinery and Popper-only diagnostic attributes by exact field. Preserve comparison of `data-bs-popper="static"` in static/navbar dropdown cases. Record `data-popper-placement` raw, then compare its side in deliberately unclipped cases; explicitly exclude Popper’s alignment suffix and clipping-dependent positioning. Never erase the entire attribute. [guides/veneer.md:1580](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:1580), [guides/veneer.md:1718](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:1718), [Placement.ts:211](C:/Users/mikes/WebstormProjects/veneer/src/browser/Placement.ts:211). |
   | Carousel RTL keys, reduced-motion cycling, ride restart rules, nested items, and malformed indicators | Give each a scenario-level departure entry. Keep ordinary LTR navigation, indicator state, and non-reduced automatic advance comparable. Do not assume desktop and touch hosts produce the same `pointer-event` token; bind that case to an explicit touch-capability profile. [guides/veneer.md:1932](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:1932). |
   | Modal/Offcanvas isolation and focus | Exclude `inert`, stacked-overlay behavior, direct-method focus return, non-isolating Offcanvas blur differences, and above-backdrop interaction differences in named scenarios. Keep ordinary trigger-driven focus entry/return and backdrop presence comparable. Offcanvas load adoption is explicitly excluded under E19. [guides/veneer.md:2209](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:2209), [guides/veneer.md:2566](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:2566), [decisions.md:104](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md:104). |
   | Toast’s deprecated `hide` token | Exclude exactly that token at the affected states; still compare `show`, `showing`, `fade`, connectivity, and visibility. [guides/veneer.md:2360](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:2360). |
   | Tooltip/Popover title storage and generated IDs | Exclude exactly `data-bs-original-title`. Normalize generated ID spelling through verified element-reference relationships; fail missing, duplicate, or dangling description IDs. Existing description preservation, sanitizer differences, container selection, and element-content semantics receive named scenario departures. [guides/veneer.md:2871](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:2871), [guides/veneer.md:2884](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:2884), [guides/veneer.md:2943](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:2943). |
   | Tooltip native dismissal | Exclude Bootstrap equality for Escape, outside-click, competing-hint closure, and prevented re-promotion. Preserve these as Veneer-specific proofs under E17. Do not apply this exclusion to Popover’s ordinary manual-popover persistence. [decisions.md:81](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md:81), [guides/veneer.md:2939](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:2939). |

   No general visibility exclusion is justified. A new `display` or `visibility` mismatch must fail unless an exact, applicable departure is already recorded.

2. **Extend the conformance instrument and bind rows to executed comparisons.**

   **Read:** Button already loads installed official assets and returns a recording without accepting it: [setupServer.ts:3327](C:/Users/mikes/WebstormProjects/veneer/tests/setupServer.ts:3327). Its fixture refresh lives in [conformance.test.ts:263](C:/Users/mikes/WebstormProjects/veneer/tests/conformance.test.ts:263). The existing reading includes Button-specific events, mutation records, and accessibility serialization: [setupServer.ts:165](C:/Users/mikes/WebstormProjects/veneer/tests/setupServer.ts:165). It should not become the plugin schema unchanged.

   **Inferred proposal:**

   - Put Node orchestration, schemas, scenario tables, fixture loading, and comparison helpers in the prescribed setup modules, with the recorder entry in `tests/setupServer.ts`. Keep conformance assertions in `tests/conformance.test.ts`.
   - Reuse Button’s version/component/browser/ordered-step envelope and scratch-browser lifecycle. Introduce a typed multi-element state projection rather than filling Button-only fields with empty placeholders.
   - Drive identical scenario markup in isolated browser documents. The official document loads installed Bootstrap **5.3.8** CSS and `bootstrap.bundle.js`. The Veneer document loads freshly compiled current browser source and its shipped cascade, then constructs `Delegate` or the explicitly required engine. Use existing Vite tooling; never trust an old `dist` artifact.
   - Generate the official recording without importing Veneer’s constants, parsers, selectors, expected tables, or engine code. Runtime adapters translate semantic operations; they do not generate expected values.
   - Use trusted Playwright input for click/key routes. Arm runtime-specific completion observers before acting, then drain relevant finite animations and placement/observer work. These are synchronization mechanisms, not compared behavior. Do not wait for the expected snapshot itself and thereby turn an incorrect result into a generic timeout.
   - Give refusals and timer cases their own bounded completion rules. Use real timers, no fake clock, and distinguish a harness timeout from a state mismatch.
   - Store recordings at `tests/fixtures/oracle/<plugin>.json`, including Bootstrap version, asset digests, scenario/schema identity, viewport/input/media profile, and browser provenance. Keep approved projection exceptions separately governed; refreshing observations must not invent exceptions.
   - Require ordinary runs to compare **live Bootstrap against its saved recording**, then **live Veneer against the approved projection of that recording**. `ORACLE_REFRESH=1` may replace official observations only. It must still run the Veneer comparison and cannot copy Veneer output into expectations.
   - Fail on absent/duplicate scenarios, missing elements, malformed attributes, unexpected tokens, visibility/focus differences, broken ARIA relationships, invalid exclusions, wrong release/assets, action failure, and incomplete comparison coverage.

   **Read:** A plugin file proof currently succeeds solely because the file exists, even with an empty unrelated recording: [setupServer.ts:3233](C:/Users/mikes/WebstormProjects/veneer/tests/setupServer.ts:3233), [setupServer.test.ts:1027](C:/Users/mikes/WebstormProjects/veneer/tests/setupServer.test.ts:1027). Both tenet audits identify this gap: [j-tenets-compat-report.md:19](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-tenets-compat-report.md:19), [j-tenets-objective-report.md:39](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-tenets-objective-report.md:39).

   **Inferred proposal:** Use proof IDs such as `plugin.collapse`, registered as named comparisons in `tests/conformance.test.ts`. Bind each ID to its exact plugin obligation, fixture, required scenarios, and permitted exceptions. Plugin rows currently share the component value `engine`; checking that value alone cannot distinguish them.

   Extend `scanOracleObligation` to require that binding and the current run’s completed comparison result. Reject a bare path, an unknown ID, another plugin’s ID, absent results, or incomplete scenarios. Audit row-to-binding and binding-to-executed-case membership in both directions. Preserve Button’s existing obligation predicates.

3. **Require failing controls before accepting oracle evidence.**

   **Read:** Instruments must fail before their success is evidence, and their controls must challenge their coverage boundary: [quality.md:59](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md:59). No tests or controls were run in this design assignment.

   **Inferred proposal:** Exercise the actual conformance command against temporary source mutations, with refresh disabled and official fixtures unchanged. These mutations must reach a named comparison failure, not a compile, import, collection, or browser-launch failure.

   | Comparison | Mutation it must distinguish |
   |---|---|
   | Collapse | Write the wrong expanded ARIA value after an otherwise completed open. |
   | Dropdown | Leave the toggle’s expanded ARIA true after closing. |
   | Tab | Leave the outgoing control selected. |
   | ScrollSpy | Retain the old link’s `active` token after selecting another section. |
   | Alert | Complete closure without disconnecting the alert. |
   | Carousel | Leave `aria-current` on the outgoing indicator. |
   | Modal | Leave `aria-hidden="true"` after opening. |
   | Offcanvas | Omit `aria-modal="true"` while open. |
   | Toast | Retain `showing` after an otherwise completed show. |
   | Tooltip | Write a description ID that names no tip. |
   | Popover | Omit nonempty body content while still showing the tip. |

   Challenge the instrument’s boundary as well: add an unexpected `aria-*`/`data-*` attribute outside its anticipated vocabulary, introduce an unregistered plugin proof, remove a required scenario, and substitute an existing unrelated test path. Each must fail. Otherwise an allowlist or file lookup could silently omit the very population being claimed.

   For exclusions, prove that the sanctioned Toast `hide` difference passes while an adjacent `show`/`showing` defect fails. Likewise, generated-ID normalization must tolerate spelling differences but reject dangling references.

   Before any oracle-completion claim or Proof-cell replacement, retain the exact command, base and mutation diff, browser build, collected case, failing assertion/count, exit code, and restored-source green result. Obtain readings on the gate hosts named by E21. A real baseline mismatch requires a repair or an explicit ruling; fixture refresh is not a repair.

4. **Use ordered work packages with separate ownership.**

   **Read:** The engine owns its source/tests and designated guide cells; shared infrastructure changes require exact pending hunks before landing: [ROADMAP.md:377](C:/Users/mikes/WebstormProjects/veneer/ROADMAP.md:377), [ROADMAP.md:409](C:/Users/mikes/WebstormProjects/veneer/ROADMAP.md:409). J-CASCADE and J-SAMEWAY-ENGINES already carry the overlapping engine work: [engine/plan.md:25](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/plan.md:25).

   **Inferred proposal:** Treat these as ordered work packages within J-ORACLE. Start implementation after the in-flight units land and re-read the resulting contracts. Engine executors own campaign records and patch artifacts, not the styles session’s live files. The styles session applies the shared implementation; package acceptance waits for that application.

   | Order / package | Owned files | Acceptance |
   |---|---|---|
   | J-ORACLE-CONTRACT | `engine/units/j-oracle-contract.md` | Fix the scenario inventory, typed projection, source-backed exceptions, required mutation readings, and proof-binding contract. Account explicitly for every plugin. |
   | J-ORACLE-HARNESS | `engine/units/j-oracle-harness.patch` and its report | Prepare the exact shared changes for recording, browser execution, comparison, resolver, fixtures, and infrastructure proofs. After styles applies them, demonstrate upstream independence, refresh discipline, missing-population failures, and ordinary conformance discovery. |
   | J-ORACLE-CONTROLS | `engine/units/j-oracle-controls.md` and its retained control artifacts | Run the named temporary mutations after competing owners release their files; retain red/green evidence for every comparison and the resolver/projection controls. Any required product repair receives an explicit file assignment rather than entering the harness patch silently. |
   | J-ORACLE-ROWS | The engine-owned Status, Proof, and Obligation cells in `guides/veneer.md`; `engine/units/j-oracle-rows.md` | Run after J-ROWS. Replace file-only proofs with comparison IDs, preserve departure references, and require complete executed bindings plus accepted control evidence. Existing `shipped` labels alone do not establish J-ORACLE closure. |

   The Orchestrator records each exact shared patch under `engine/plan.md` **Pending shared changes** before application. These packages do not edit J-CASCADE’s mirrored engine tests or J-SAMEWAY-ENGINES’ implementation files during their ownership.

   Shared changes for the styles session to apply or approve are:

   - `tests/setupServer.ts`: recorder, fixture validation, comparator, and proof resolver.
   - `tests/setupServer.test.ts`: infrastructure and resolver controls, replacing existence-only acceptance.
   - `tests/conformance.test.ts`: named live comparisons and controlled refresh.
   - `tests/fixtures/oracle/**`: scenario assets, official recordings, and governed exception data.
   - `tests/setup.ts` / `tests/setupBrowser.ts` and their proofs, only where shared types or browser helpers belong.
   - The guide’s **Compatibility machinery** section.
   - Any demonstrated runner-budget/configuration change; no new dependency or public runtime API is needed.

   **Read:** `test:conformance` already participates in the ordinary test chain: [package.json:60](C:/Users/mikes/WebstormProjects/veneer/package.json:60). Retain that route and prove collection rather than creating an uninvoked oracle project.

PROPOSAL: Record Bootstrap 5.3.8’s settled plugin outcomes independently, compare Veneer through narrowly documented departures, and accept each plugin proof only after its bound live comparison and recorded negative controls pass through the styles-approved conformance machinery.
