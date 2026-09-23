# J-TYPES audit round 5 — the objective lane's verdict (returned 2026-09-23 by analyst on GPT-6 Astra, gpt-6-astra at high effort, read-only codex exec)

Thread `01a0cf9d-f10a-7603-b96e-3a21aefaf5ff`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-types-audit-5.jsonl` (launch copy under `tmp/codex/`); 27 commands; 503 s; usage {"input_tokens":2586594,"cached_input_tokens":2421632,"cache_write_input_tokens":0,"output_tokens":13563,"reasoning_output_tokens":3626}. Retained verbatim from the exec's last message.

---

Objective lane (`analyst`).

1. **CONFIRMED — HostSnapshot rename.** I attacked the rename through declarations, references, guide rows, and method headings. The source and guide contain no standalone `SnapshotCategory`, `SnapshotTarget`, or `SnapshotInterface`. The replacements agree, and the guide’s `HostSnapshotInterface` table names `save` and `restore`. No compatibility alias survives.

2. **CONFIRMED — Events.** I attacked the wire type with the supplied wrong-namespace and wrong-entity controls. The Orchestrator’s `j-types-probe-5.log.txt` records `TS2322` for each; the valid table compiles. Source inspection confirms the exact mapped template, each event member’s matching `.vn.` documentation, the cancellation descriptions, and `prevent` on Modal and Offcanvas. `DropdownDetail` contains `click` without `relatedTarget`; Bootstrap dispatches those events on the toggle it also supplies as `relatedTarget`, so removing that duplicate follows the amendment. No old wire namespace, `hidePrevented`, `clickEvent`, or own-property mirroring sentence remains in `types.ts`.

3. **BROKEN — The uniform string-key assertion is false.** [DropdownClassMap.center](C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts:716) is an object, not a `readonly string` member. The no-emit TypeScript 6.0.3 probe against the actual source produced:

   ```text
   { classes: { center: { down: 'center-below' } } }
   TS2741: Property 'up' is missing in type '{ down: string; }'
   but required in type '{ readonly down: string; readonly up: string; }'.
   ```

   Supplying `up: 'dropup-center'` compiled; omitting `center` compiled. The independent invalid-token control, `shown: 7`, produced `TS2322`. The probe used an in-memory scratch source and wrote no files.

   **Bound:** this restriction is documented on `DropdownOptions.classes`, and the planner’s adopted inventory explicitly proposed the nested group. The attack establishes an atomic group override, not an undocumented runtime failure. Consumers cannot replace one center token without restating its sibling. The smallest correction is to make claim 3 describe string **leaves** and explicitly acknowledge the atomic `center` group. The remaining named maps, constructor-only groups, Backdrop replacement, Popover extensions, and Delegate `Pick` groups hold against the source and recorded typecheck.

4. **BROKEN — The vocabulary inventory is incomplete.** The source walk found names absent from both the maps and the report’s derived/excluded/platform accounting:

   - **Offcanvas resize selector:** [offcanvas.js:267](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/offcanvas.js:267) queries `[aria-modal][class*=show][class*=offcanvas-]`. `OffcanvasSelectorMap` contains only `trigger` and `dismiss`; the report accounts for `OPEN_SELECTOR`, but never this resize selector. Its responsive `offcanvas-` family is not the `host: 'offcanvas'` token. A shown responsive panel crossing its breakpoint reaches this Bootstrap query. Add a documented `responsive` selector member with that default and account for it in the mapping.
   - **ScrollLock scratch attributes:** [scrollbar.js:79](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/util/scrollbar.js:79) writes, reads, and removes `data-bs-overflow`, `data-bs-padding-right`, and `data-bs-margin-right` through `Manipulator`. A body or compensated element with an existing inline value reaches those writes. The report lists neither map members nor exclusions. Record these as excluded implementation scratch attributes replaced by `HostSnapshot`; adding public override keys for discarded scratch storage is unnecessary.

   **Bound:** I found no incorrect default among the declared vocabulary leaves. The failures concern omitted accounting and the unrepresented responsive selector. The requested selector values are correct verbatim:

   ```text
   Tab.trigger:
   [data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]

   ScrollSpy.link:
   .nav-link, .nav-item > .nav-link, .list-group-item
   ```

   The following source walk accounts for the constants and attribute names. `C` means `CLASS_NAME_`, `S` means `SELECTOR_`, and arrows identify the corresponding map key. Attribute suffixes following `data-bs-` retain that prefix. Declared defaults match the cited source constants.

   | Entity | Class constants and selectors | Data attributes and remaining classifications |
   |---|---|---|
   | Button | `C_ACTIVE → classes.pressed`; `S_DATA_TOGGLE → selectors.trigger` | `data-bs-toggle` is carried by `trigger`; `aria-pressed` is platform vocabulary. |
   | ColorMode | No Bootstrap plugin class or selector constants | `data-bs-theme → attributes.theme`; the report correctly identifies Veneer’s constant as its source. |
   | Collapse | `C_SHOW → shown`, `C_COLLAPSE → host`, `C_COLLAPSING → transition`, `C_COLLAPSED → collapsed`, `C_HORIZONTAL → horizontal`; `S_DATA_TOGGLE → trigger`; `S_ACTIVES` and the misleadingly named selector `CLASS_NAME_DEEPER_CHILDREN` are listed as derived | `data-bs-target → target`, `data-bs-parent → parent`; toggle routing is carried by `trigger`. Construction-time `toggle` and the JSON configuration layer are excluded by the amendment. `href` and `aria-expanded` are platform names. |
   | Dropdown | `C_SHOW → shown`, `C_DROPUP → up`, `C_DROPEND → end`, `C_DROPSTART → start`, `C_DROPUP_CENTER → center.up`, `C_DROPDOWN_CENTER → center.down`; helper-tested `disabled → disabled`; `S_DATA_TOGGLE → trigger`, `S_MENU → menu`, `S_NAVBAR → navbar`, `S_VISIBLE_ITEMS → entry`; `S_DATA_TOGGLE_SHOWN` is derived; `S_NAVBAR_NAV` is explicitly excluded | `data-bs-auto-close → dismiss`, `offset → offset`, `display → static`, `reference → reference`, `popper → popper`; `data-popper-placement → side`. `boundary` and `popperConfig` are excluded by the amendment. `aria-expanded` and native disabled state are platform vocabulary. |
   | Tab | `C_ACTIVE → active`, `C_FADE → fade`, `C_SHOW → shown`, `CLASS_DROPDOWN → dropdown`; helper-tested `disabled → disabled`; `S_DROPDOWN_TOGGLE → toggle`, `S_DROPDOWN_MENU → menu`, `S_TAB_PANEL → list`, `S_OUTER → wrapper`, `S_INNER → link`, `S_DATA_TOGGLE → trigger`; `NOT_SELECTOR_DROPDOWN_TOGGLE` is represented inside `link`; `S_INNER_ELEM` and `S_DATA_TOGGLE_ACTIVE` are listed as derived | `data-bs-target → target`; toggle values are carried by `trigger`. `href`, `role`, `tabindex`, `id`, and the ARIA attributes are platform vocabulary. |
   | ScrollSpy | `C_DROPDOWN_ITEM → entry`, `C_ACTIVE → active`; helper-tested `disabled → disabled`; `S_DATA_SPY → host`, `S_NAV_LIST_GROUP → list`, `S_LINK_ITEMS → link`, `S_DROPDOWN → dropdown`, `S_DROPDOWN_TOGGLE → toggle`; `S_NAV_LINKS`, `S_NAV_ITEMS`, and `S_LIST_ITEMS` are represented inside `link`; `S_TARGET_LINKS` is explicitly classified as platform | `data-bs-target → target`, `root-margin → margin`, `threshold → threshold`, `smooth-scroll → smooth`; spy routing is carried by `host`. Legacy `data-bs-offset` is excluded by the amendment. `[href].active` combines the platform link selector with the effective active token. |
   | Modal | `C_OPEN → open`, `C_FADE → fade`, `C_SHOW → shown`, `C_STATIC → static`; dismiss fallback supplies `host`, the disabled helper supplies `disabled`, and Backdrop supplies `backdrop`; `S_DIALOG → dialog`, `S_MODAL_BODY → body`, `S_DATA_TOGGLE → trigger`; dismiss helper supplies `selectors.dismiss`; `OPEN_SELECTOR` is listed as derived | `data-bs-target → target`, `backdrop → backdrop`, `keyboard → escape`, `focus → focus`; toggle and dismiss matching belong to their selectors. `aria-hidden`, `aria-modal`, and `role` are platform vocabulary. |
   | Offcanvas | `C_SHOW → shown`, `C_SHOWING → showing`, `C_HIDING → hiding`, `C_BACKDROP → backdrop`; dismiss fallback supplies `host`, and the disabled helper supplies `disabled`; `S_DATA_TOGGLE → trigger`; dismiss helper supplies `dismiss`; `OPEN_SELECTOR` is listed as derived; **the inline resize selector is missing** | `data-bs-target → target`, `backdrop → backdrop`, `keyboard → escape`, `scroll → scroll`; toggle and dismiss matching belong to their selectors. `aria-modal` and `role` are platform vocabulary. |
   | Tooltip | `C_FADE → fade`, `C_MODAL → modal`, `C_SHOW → shown`; generated `bs-tooltip-auto → auto`; `S_TOOLTIP_INNER → title`; `S_MODAL` is listed as derived | `data-bs-animation → animated`, `delay → delay`, `trigger → trigger`, `title → title`, `html → html`, `template → template`, `custom-class → class`, `container → container`, `placement → position`, `offset → offset`, `fallback-placements → fallbacks`, `selector → selector`; `data-popper-placement → side`. The amendment excludes `data-bs-original-title`, Popper configuration, and the former sanitizer options. Native `title`, `id`, and ARIA names are platform vocabulary. |
   | Popover | Inherits Tooltip’s class handling with `bs-popover-auto → auto`; `S_TITLE → title`, `S_CONTENT → content` | Inherits Tooltip’s attribute mappings and adds `data-bs-content → content`. The report’s R13 excludes template-only class tokens. The arrow selector belongs to the Popper modifier replaced by native placement. |
   | Alert | `C_FADE → fade`, `C_SHOW → shown`; dismiss helper supplies `host`, `disabled`, and `selectors.dismiss` | Dismiss helper reads `data-bs-target → target`; dismiss matching is carried by its selector. `href` and native disabled state are platform vocabulary. |
   | Toast | `C_FADE → fade`, `C_SHOW → shown`, `C_SHOWING → transition`; `C_HIDE` is explicitly excluded; dismiss helper supplies `host`, `disabled`, and `selectors.dismiss` | `data-bs-animation → animated`, `autohide → autohide`, `delay → delay`, `target → target`; dismiss matching is carried by its selector. |
   | Carousel | `C_CAROUSEL → host`, `C_ACTIVE → active`, `C_SLIDE → slide`, `C_END → end`, `C_START → start`, `C_NEXT → next`, `C_PREV → previous`; `S_ITEM → entry`, `S_ITEM_IMG → image`, `S_INDICATORS → indicators`; `S_ACTIVE`, `S_ACTIVE_ITEM`, `S_DATA_SLIDE`, and `S_DATA_RIDE` are listed as derived | `data-bs-target → target`, `slide → slide`, `slide-to → index`, `ride → ride`, `interval → interval`, `keyboard → keyboard`, `pause → pause`, `touch → touch`, `wrap → wrap`. Indicator lookup derives from `index`; per-item interval uses `interval`. `aria-current` and `href` are platform vocabulary. |
   | Backdrop | `C_FADE → fade`, `C_SHOW → shown`, `Default.className → host` | No component data-attribute reads. The default parent is the platform body element. |
   | ScrollLock | Modal’s `C_OPEN → open`; `S_FIXED_CONTENT → fixed`, `S_STICKY_CONTENT → sticky` | **The scratch attributes `data-bs-overflow`, `data-bs-padding-right`, and `data-bs-margin-right` are missing from the report’s accounting.** Their corresponding CSS properties are platform names. |
   | Placement | No separate Bootstrap plugin constants | `data-bs-popper → popper`; `data-popper-placement → side`, supported by Dropdown and Tooltip/Popper usage. Native `popover` and CSS positioning properties are platform vocabulary. |
   | Swipe | `C_POINTER_EVENT → pointer` | No data-attribute reads or writes. |

   The unit’s rulings resolve as follows:

   | Ruling | Decision and evidence |
   |---|---|
   | R1 | **CONFIRMED.** The disabled helper tests the class token; Dropdown, Tab, ScrollSpy, Offcanvas, and dismiss handling reach it. Button does not acquire this test merely because other entities use it. |
   | R2 | **CONFIRMED.** Toast dismissal and Carousel controls call target resolution, which reads `data-bs-target`. |
   | R3 | **CONFIRMED.** Popover’s `Default.content` requires the additional attribute mapping; extending Tooltip’s map preserves the inherited fields. |
   | R4 | **CONFIRMED.** Component-name classes supply dismiss fallback matching or Carousel’s class test; open selectors derive from those effective tokens. |
   | R5 | **CONFIRMED.** Tooltip’s `CLASS_NAME_MODAL` and Tab’s `CLASS_DROPDOWN` are class tokens, correctly placed in class maps. |
   | R6 | **CONFIRMED.** Carousel’s control and ride selectors derive from its declared attribute names. |
   | R7 | **CONFIRMED.** `[href]` is platform vocabulary. |
   | R8 | **CONFIRMED.** The only `SELECTOR_NAVBAR_NAV` use guards the iOS mouseover-listener workaround at `dropdown.js:145`; its exclusion agrees with the supplied Chromium-floor ruling. |
   | R9 | **CONFIRMED.** `entry` and `wrapper` preserve the source roles without the prohibited `item` key. |
   | R10 | **CONFIRMED as a grouping choice, with claim 3’s bound.** The adopted planner inventory names `center: { down, up }`; shallow `Partial` requires the complete supplied group. |
   | R11 | **CONFIRMED.** Toast uses `showing` during entry and exit; `transition` describes that shared fact. Offcanvas distinguishes `showing` and `hiding`. |
   | R12 | **CONFIRMED.** `data-bs-slide-to` carries the indicator/control index, matching `index`. |
   | R13 | **CONFIRMED within the native-placement design.** Template classes are not additional content slots. The title/content selectors identify the slots the shared engine fills; the removed Popper arrow modifier does not require an engine selector key. |

5. **CONFIRMED — Sanitizer port and mirror.** I attacked the contract by distinguishing omitted configuration, an explicit empty dictionary, absent global attributes, and explicit data-attribute permission. `j-types-4-probe-sanitizer-4.log.txt` shows the no-options call retaining only `title` on its sample, while the empty and elements-only dictionaries retain the other safe attributes. The earlier probes and probe 4 establish refusal of either `dataAttributes` value without `attributes`. Explicitly listed data attributes survive `false` under the [HTML Standard’s attribute-filtering steps](https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#sanitizer-api).

   The source declares the required synchronous `write(Element, string): void` port, failure propagation, argument non-retention, example, native configuration distinction, and constructor-only Tooltip option. The obsolete sanitizer types and guide rows are absent. The retained mirrors describe their supported subset and reference no global `Sanitizer`.

6. **CONFIRMED — Option changes and type refusals.** I attacked the replacement through the recorded obsolete-property controls. The Orchestrator’s probe reports `TS2561` for `sanitize`, and `TS2353` for `toggle` and `hidePrevented`; the named acceptance values produce no diagnostic. Source inspection confirms `animated` on Tooltip and Toast, `signal` on Button, and no `CollapseOptions.toggle` or `data-bs-config` sentence.

7. **CONFIRMED — Scope, parity, and recorded gates.** I attacked parity independently using TypeScript’s AST and the actual guide. Every source export has a unique Surface row; deleting the `SanitizerInterface` row in memory makes the comparison fail. The method tables match `HostSnapshotInterface.save/restore` and `SanitizerInterface.write`. AST inspection finds no non-readonly property or prohibited syntax.

   The captured diff and status name only `src/browser/types.ts` and `guides/veneer.md`; guide hunks stay within Surface rows and Methods tables. `j-types-gates-5.log.txt` records exit `0` for the specified build, typecheck, lint, formatting, guide, and policy commands. Those gates were not rerun.

8. **CONFIRMED — Round-4 corrections and bounds.** I attacked the corrected sentences against the differing outputs in probe 4 and the standard’s explicit-attribute exception. The `attributes` sentence distinguishes dictionary behavior from the no-options default; the `dataAttributes` sentence preserves explicitly listed names and states the prerequisite for either boolean value. The mirror descriptions carry B4’s supported-subset wording, and `SetHTMLOptions.sanitizer` no longer uses the ambiguous “safe baseline” description.

**Findings outside the claims:** none.

**Attacked and held:** Approved exclusions do not require replacement map members: Toast’s `hide` token, Tooltip’s original-title scratch attribute, the JSON configuration layer, legacy ScrollSpy offset conversion, and Popper configuration remain excluded by the amended design. Platform attribute names embedded in a composite selector do not make the selector itself an overridable platform attribute. Popover’s inherited keys remain compatible because its maps extend Tooltip’s maps. A complete Dropdown `center` override is valid; the single-leaf restriction is the documented adjacent behavior.

VERDICT: FAIL 3, 4; outside the claims: none
