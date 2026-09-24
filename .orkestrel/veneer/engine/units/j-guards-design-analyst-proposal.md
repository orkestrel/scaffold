# J-GUARDS design round — the objective lane's proposal (analyst on GPT-6 Astra)

Thread `01a0d565-ad3f-7923-ba12-73917daacc7a`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-guards-design-analyst.jsonl` (launch copy under `tmp/codex/`); 17 commands; 314 s; usage {"input_tokens":1001959,"cached_input_tokens":909952,"cache_write_input_tokens":0,"output_tokens":8951,"reasoning_output_tokens":1784}. Retained verbatim from the exec's last message.

---

1. **Fold identical payload contracts into shared guards.**

   **[read]** The guards validate `CustomEvent` and its detail; they do not validate the event’s wire name. `bindEventMap` supplies that boundary by subscribing to `wire[key]` and checking the delivered event before invoking its hook (`src/browser/helpers.ts:58`, `src/browser/helpers.ts:69`, `src/browser/validators.ts:164`, `src/browser/validators.ts:213`). Paths below are relative to `C:/Users/mikes/WebstormProjects/veneer`; scaffold references use `../scaffold`.

   **[inferred — recommendation]** Use this surface:

   | Guard | Narrowed type | Consumers |
   |---|---|---|
   | `isEmptyEvent` | `CustomEvent<null>` | Collapse, Alert, Toast, Tooltip, Popover |
   | `isRelatedEvent` | `CustomEvent<RelatedDetail>` | Tab, Modal, Offcanvas |
   | `isButtonEvent` | `ButtonEventMap['toggle']` | Button |
   | `isScrollSpyEvent` | `ScrollSpyEventMap['activate']` | ScrollSpy |
   | `isDropdownEvent` | `DropdownEventMap['show']` | Dropdown |
   | `isCarouselEvent` | `CarouselEventMap['slide']` | Carousel |

   **[read]** Collapse, Alert, Toast, Tooltip, and Popover declare null-detail events and repeat the same guard body (`src/browser/types.ts:770`, `src/browser/types.ts:2034`, `src/browser/types.ts:2108`, `src/browser/types.ts:1571`, `src/browser/types.ts:1869`; `src/browser/validators.ts:164`, `src/browser/validators.ts:189`, `src/browser/validators.ts:366`, `src/browser/validators.ts:420`, `src/browser/validators.ts:445`). Tab, Modal, and Offcanvas declare the same readonly `relatedTarget: HTMLElement | undefined` shape (`src/browser/types.ts:1053`, `src/browser/types.ts:1287`, `src/browser/types.ts:1434`).

   **[inferred — recommendation]** Define `RelatedDetail` in `types.ts`, replace those duplicate detail declarations and their event-map references, and remove their old names without aliases. Keep entity-specific event maps and hooks. Document the meaning of the related target on each entity’s event-map entries. `isEmptyEvent` means precisely null detail; `isRelatedEvent` accepts a non-null object whose related target is absent, undefined, or an `HTMLElement`. These are `is{Condition}` names and total guards, following `../scaffold/.claude/rules/names.md:177` and `../scaffold/.claude/rules/names.md:187`.

   **[read]** ScrollSpy requires an actual related element; Dropdown validates an optional `MouseEvent`; Button validates a boolean pressed state; Carousel additionally validates direction and non-negative integer positions. They are distinct contracts, not candidates for the optional-related-target guard (`src/browser/validators.ts:242`, `src/browser/validators.ts:275`, `src/browser/validators.ts:133`, `src/browser/validators.ts:303`).

   **[inferred — recommendation]** A consumer reads:

   ```ts
   bindEventMap(host, MODAL_EVENTS, isRelatedEvent, options?.on, signal)
   bindEventMap(host, COLLAPSE_EVENTS, isEmptyEvent, options?.on, signal)
   ```

   The wire table names the entity; the guard names the payload requirement. Preserve `bindEventMap`’s signature and `TooltipProfile.guard: Guard<TooltipEventMap['show']>`. The proposed shared types match those event-map members structurally; prove inference at the call sites before accepting implementation. Do not introduce a generic predicate that lets callers request an unchecked event subtype (`src/browser/helpers.ts:58`, `src/browser/types.ts:224`, `src/browser/types.ts:245`, `src/browser/types.ts:1751`).

   **[read]** The related-target bodies are not operationally identical: Tab captures the property once, while Modal and Offcanvas can read it again in the element check (`src/browser/validators.ts:218`, `src/browser/validators.ts:343`, `src/browser/validators.ts:397`). **[inferred — recommendation]** Adopt the single-read form and explicitly test that choice.

   **[inferred — consumer and surface changes]** Replace imports and guard arguments in Collapse, Alert, Toast, Tab, Modal, and Offcanvas; replace the Tooltip and Popover profile values. Their current sites are `src/browser/Collapse.ts:120`, `src/browser/Alert.ts:85`, `src/browser/Toast.ts:114`, `src/browser/Tab.ts:111`, `src/browser/Modal.ts:177`, `src/browser/Offcanvas.ts:179`, `src/browser/Tooltip.ts:137`, and `src/browser/Popover.ts:55`. Update validator tests, the barrel inventory, and profile expectations (`tests/src/browser/validators.test.ts:147`, `tests/src/browser/index.test.ts:169`, `tests/src/browser/Popover.test.ts:65`). Use the shared guard in the helper’s null-event binding proof (`tests/src/browser/helpers.test.ts:128`).

   **[read]** The barrel already star-exports types and validators (`src/browser/index.ts:1`, `src/browser/index.ts:4`). **[inferred — recommendation]** Its source needs no new export statement. Replace the removed guard and detail Surface rows with `isEmptyEvent`, `isRelatedEvent`, and `RelatedDetail`; update the Modal, Offcanvas, and Popover prose references (`guides/veneer.md:152`, `guides/veneer.md:174`, `guides/veneer.md:189`, `guides/veneer.md:208`, `guides/veneer.md:222`, `guides/veneer.md:224`, `guides/veneer.md:238`, `guides/veneer.md:255`, `guides/veneer.md:274`, `guides/veneer.md:287`, `guides/veneer.md:301`, `guides/veneer.md:2128`, `guides/veneer.md:2493`, `guides/veneer.md:2902`). Keeping rename-only wrappers would violate `../scaffold/.claude/rules/architecture.md:157`.

2. **Read only options named by the parser table, once per key.**

   **[read]** `resolveOptions` first reads `options?.[key]` for every parser key, then enumerates options and reads their values again. It does not constrain `TKey` to cover every key of `T` (`src/browser/helpers.ts:228`, `src/browser/helpers.ts:237`, `src/browser/helpers.ts:251`). The documented precedence is constructor value over attribute over default, with undefined falling through (`src/browser/helpers.ts:217`, `guides/veneer.md:793`).

   **[inferred — recommendation]** Keep the defaults copy. For each parser key, capture `options?.[key]`; assign a defined value immediately, otherwise resolve its attribute using the existing parser and error handling. Remove the options-enumeration loop. Preserve ordinary property access: a named inherited or non-enumerable property is a supplied option. Do not add an own-property restriction.

   **[inferred — comparison]** The following cases distinguish the alternatives. “Own enumerable” here means applying that restriction consistently to attribute suppression and copying, not merely patching the final loop. Assume default `delay = 300`, attribute `delay = 5`, and a parser table naming `delay`. These outcomes follow from the current reads and the proposed restrictions (`src/browser/helpers.ts:236`, `src/browser/helpers.ts:238`, `src/browser/helpers.ts:251`).

   | Input | Unchanged | Own enumerable options only | Parser-key reads |
   |---|---|---|---|
   | Inherited enumerable `delay = 0` | Returns `0` | Returns `5` | Returns `0` |
   | Own non-enumerable `delay = 0` | Returns `300`: suppresses attribute but never copies override | Returns `5` | Returns `0` |
   | Own enumerable, unrelated throwing `content` getter | Throws | Throws | Never reads it |
   | Inherited enumerable, unrelated throwing getter | Throws | Never reads it | Never reads it |
   | Own enumerable `delay` getter | Reads during suppression and copying | Depends on implementation; ownership alone does not fix repeated reads | Reads once |
   | Defined override for a default key absent from the parser table | Copies override | Copies own enumerable override | Retains default |

   **[inferred — recommendation]** Document the last row as an intentional public-helper behavior change. `resolveOptions` resolves the keys its parser table names; constructor-only settings remain their consumer’s responsibility. An undefined named value still falls through, false and zero remain explicit overrides, and a throwing named getter still propagates its error (`src/browser/helpers.ts:234`, `src/browser/helpers.ts:238`, `src/browser/helpers.ts:243`).

   **[read]** The engines passing caller-owned objects or groups directly are Collapse (`parent`), Dropdown (`dismiss`, placement), Carousel, ScrollSpy (top-level settings, intersection), Toast, and Tooltip/Popover (settings, tip, placement, and Popover content) (`src/browser/Collapse.ts:110`, `src/browser/Dropdown.ts:129`, `src/browser/Dropdown.ts:141`, `src/browser/Carousel.ts:147`, `src/browser/ScrollSpy.ts:124`, `src/browser/ScrollSpy.ts:138`, `src/browser/Toast.ts:100`, `src/browser/Tooltip.ts:251`, `src/browser/Tooltip.ts:282`, `src/browser/Tooltip.ts:290`, `src/browser/Tooltip.ts:335`).

   **[inferred]** Those engines change observable behavior for unrelated getters, repeated getter reads, and non-enumerable named options. Tooltip construction stops reading a supplied Popover `content` getter; Popover still reads content through its declared content resolution. Explicit reads elsewhere in an engine remain explicit reads (`src/browser/Tooltip.ts:232`, `src/browser/Tooltip.ts:325`, `src/browser/Tooltip.ts:335`).

   **[read]** Modal and Offcanvas pass fresh projections containing only their parser keys, after capturing caller values (`src/browser/Modal.ts:136`, `src/browser/Modal.ts:157`, `src/browser/Offcanvas.ts:140`, `src/browser/Offcanvas.ts:161`). **[inferred]** Their constructor behavior should therefore remain unchanged by the resolver ruling, despite their use of the helper.

3. **Require proofs that distinguish the ruling from plausible wrong implementations.**

   **[inferred — proposed proofs, not executed]** Use real DOM events, real engines, and accessor recorders. Pair each case with the named mutation:

   | Case and required observation | Mutation it distinguishes | Existing evidence to extend |
   |---|---|---|
   | Empty guard accepts null detail and rejects `{}`, strings, numbers, and ordinary `Event` | Replace null-detail check with class check alone | `tests/src/browser/validators.test.ts:148` |
   | Related guard accepts absent/undefined/HTML related targets; rejects null detail and null/string/SVG targets | Require a target; accept any `Element`; remove object check | `tests/src/browser/validators.test.ts:223`, `tests/src/browser/validators.test.ts:443` |
   | Throwing prototype, detail, and related-target accessors return false | Remove exception containment | `tests/src/browser/validators.test.ts:254`, `tests/src/browser/validators.test.ts:469` |
   | Related-target accessor records one read | Restore Modal’s repeated property read | `src/browser/validators.ts:343` |
   | ScrollSpy rejects an absent related target; unique guards retain their payload checks | Route unique contracts through a weaker shared guard | `tests/src/browser/validators.test.ts:280`, `tests/src/browser/validators.test.ts:334`, `tests/src/browser/validators.test.ts:384` |
   | Valid payload under another entity’s wire name invokes no hook; invalid payload under the correct name invokes no hook; abort releases hooks | Remove wire isolation, guard invocation, or signal binding | `src/browser/helpers.ts:69`, `tests/src/browser/helpers.test.ts:113` |
   | Each migrated entity accepts its valid event and rejects the other shared payload shape | Wire an engine/profile to the wrong shared guard | Consumer sites in proposal 1; `tests/src/browser/Popover.test.ts:359` |
   | Every migrated map retains its exact hook event type; related target remains `HTMLElement \| undefined`; ScrollSpy’s remains required | Widen predicates to `Event`/unknown detail or weaken ScrollSpy | `src/browser/types.ts:224`, `src/browser/types.ts:1175`, `src/browser/helpers.ts:58` |
   | Unrelated own and inherited getters are untouched; unrelated values are absent from the result unless supplied by defaults | Restore enumeration or spread options | `src/browser/helpers.ts:251` |
   | Inherited and non-enumerable named values override attributes; named accessor is read once | Add own/enumerable restriction or retain suppression-and-copy reads | `src/browser/helpers.ts:238`, `src/browser/helpers.ts:252` |
   | Undefined falls through; false/zero override; overridden invalid attribute is never parsed; unoverridden invalid attribute retains error code/context | Use truthiness, parse before checking override, or change error path | `tests/src/browser/helpers.test.ts:455`, `tests/src/browser/helpers.test.ts:506`, `tests/src/browser/helpers.test.ts:520`, `tests/src/browser/helpers.test.ts:561` |
   | Tooltip never evaluates a supplied content getter; Popover evaluates its declared content getter once and uses its value | Read content indiscriminately or omit Popover content resolution | `src/browser/Tooltip.ts:325`, `src/browser/Tooltip.ts:335` |

   **[read]** The existing “reads no content option” test supplies a plain content value and checks that no tip appears; it does not detect a getter read (`tests/src/browser/Popover.test.ts:267`). **[inferred — recommendation]** Add an enumerable throwing getter case and a Popover positive control.

   **[inferred — acceptance requirement]** Run the type cases with the registered `prove` instrument during implementation, with controls that fail at the declared type stage. Run behavioral controls at runtime. This proposal supplies no compilation or test-pass claim; the brief requires this round to edit nothing (`../scaffold/.orkestrel/veneer/engine/units/j-guards-design-brief.md:3`).

4. **Land J-GUARDS after J-INTEGRATION, with atomic consumer migration.**

   **[read]** J-INTEGRATION owns Modal, Offcanvas, Backdrop, and their tests until landing; the brief makes that ordering an explicit constraint (`../scaffold/.orkestrel/veneer/engine/units/j-guards-design-brief.md:29`).

   **[inferred — proposed ownership]** Grant J-GUARDS:

   - `src/browser/types.ts`, `validators.ts`, and `helpers.ts`.
   - `src/browser/Alert.ts`, `Collapse.ts`, `Tab.ts`, `Modal.ts`, `Offcanvas.ts`, `Toast.ts`, `Tooltip.ts`, and `Popover.ts` for the consumer changes identified in proposal 1.
   - `tests/src/browser/validators.test.ts`, `helpers.test.ts`, and `index.test.ts`.
   - The corresponding engine tests, plus `Dropdown.test.ts`, `Carousel.test.ts`, and `ScrollSpy.test.ts`, for the affected resolver boundaries identified in proposal 2.
   - `guides/veneer.md` for surface parity and the revised behavioral contract.

   **[inferred — sequencing]** Start implementation from J-INTEGRATION’s landed revision and reread its affected constructors and tests. Keep Backdrop outside this unit. Do not stage aliases to bridge overlapping branches. The current shared-guard call sites are precisely in the contested Modal and Offcanvas files (`src/browser/Modal.ts:177`, `src/browser/Offcanvas.ts:179`).

   **[inferred — acceptance criteria]** Accept only when the shared guards replace every removed guard, duplicate related-detail names are gone, entity hook types remain precise, and the resolver implements the full read policy—including inheritance, enumerability, single reads, and default-only keys. Require the distinguishing cases to fail under their mutations and pass after restoration. Preserve the unique guard contracts and existing option precedence/error cases. Verify new-name ownership, barrel inventory, guide parity, and absence of compatibility exports; these obligations follow `../scaffold/.claude/rules/names.md:128`, `../scaffold/.claude/rules/architecture.md:160`, and `../scaffold/.claude/rules/architecture.md:265`.

   **[inferred — verification order]** Run the scoped browser proofs and type checks first, then the repository’s acceptance chain: `format:check`, `lint:check`, `check`, `build`, and `test`. Record actual results and mutation receipts before acceptance; this design round claims none.

PROPOSAL: Consolidate identical event payload contracts into shared guards without aliases, and make `resolveOptions` read each parser-named option once through ordinary property access, landing the atomic migration after J-INTEGRATION.
