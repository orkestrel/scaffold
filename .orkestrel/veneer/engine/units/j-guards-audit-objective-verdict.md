# J-GUARDS audit — the objective lane (analyst on GPT-6 Astra)

Thread `01a0d5a7-237d-7340-ae53-a5665e338137`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-guards-audit.jsonl` (launch copy under `tmp/codex/`); 24 commands; 313 s; usage {"input_tokens":1260111,"cached_input_tokens":1146880,"cache_write_input_tokens":0,"output_tokens":8573,"reasoning_output_tokens":1562}. Retained verbatim from the exec's last message.

---

Audited `f609bb0` against `b1d314d`. Source references below identify `f609bb0`; `units/` references identify the retained audit evidence. The snapshot matches the commit byte for byte. No tests were run.

| Claim | Ruling | Evidence |
|---|---|---|
| 1. Bare-event guard | **FAIL** | `src/browser/validators.ts:162` accepts an event whose observed detail is null. A constructor argument of `{ detail: undefined }` produces that accepted shape: `tests/src/browser/validators.test.ts:145` explicitly expects **true**, contradicting the claim’s **false**. The implementation follows E23’s null-detail rule. P1-a, P1-b, and P1-c distinguish their mutations, but do not establish the claimed rejection. |
| 2. Related-event guard | **CONFIRMED** | `src/browser/validators.ts:189` checks the event class, non-null object detail, optional related target, and HTML-element requirement inside containment. Line 194 performs one membership check and, when present, one property read. P2-a through P2-e are distinguished as detailed below. |
| 3. Engine bindings and typing | **CONFIRMED** | Bare bindings: `src/browser/Collapse.ts:120`, `Alert.ts:85`, `Toast.ts:114`, and `Tooltip.ts:346`; Popover inherits that engine at `Popover.ts:42`. Related bindings: `Tab.ts:111`, `Modal.ts:174`, and `Offcanvas.ts:176`. Retained bindings: `Button.ts:59`, `Dropdown.ts:155`, `Carousel.ts:169`, and `ScrollSpy.ts:156`. `src/browser/helpers.ts:58` couples guard and hook types. `units/j-guards-report.md:29` records the P3 refusals, admitted control, and file-inclusion confirmation. Every P4 mutation is distinguished. |
| 4. Removed names | **CONFIRMED** | Commit-scoped search across `src`, `tests`, `app`, and `guides` found none of the named removals or profile-guard accesses. The barrel exports the replacement declarations through `src/browser/index.ts:1` and `:4`; the runtime inventory names the replacement guards at `tests/src/browser/index.test.ts:170` and `:176`. |
| 5. Resolver reads and precedence | **CONFIRMED** | `src/browser/helpers.ts:238` copies defaults; `:239` iterates parser keys; `:240` captures each supplied value; `:241` preserves defined values, including false and zero; `:245`–`:255` implements attribute parsing and entity-code errors. No options enumeration remains. O1, O2, O3, O4, O4-enumerable, and O5 are distinguished. The call-site trace below finds no consumed key dependent on the removed copy loop. |
| 6. Total parser table | **CONFIRMED** | `src/browser/types.ts:278` maps every `keyof T` with `-?`, requiring parsers for optional properties too. `src/browser/helpers.ts:235` requires that map. At the explicitly typed engine calls, deleting a parser leaves a required property missing. Comparison with `b1d314d` shows unchanged parser and attribute tables. No separate parser-omission mutation receipt is retained; this ruling follows the declaration and call-site inspection. |
| 7. Public shape | **CONFIRMED** | The added declarations are `src/browser/validators.ts:160`, `:189`, and `src/browser/types.ts:250`. Related-target meanings accompany the event maps at `types.ts:1057`, `:1285`, and `:1426`. The profile diff removes only `guard`; its remaining shape is at `types.ts:1732`. The profile equality assertions at `tests/src/browser/Popover.test.ts:63` and `:72` distinguish restoration of a runtime `guard` member. |
| 8. Guide agreement | **CONFIRMED** | Surface additions at `guides/veneer.md:52`, `:53`, and `:56` match their source summaries. Changed event-map summaries at `:176`, `:208`, and `:222` match `types.ts:1057`, `:1285`, and `:1426`. Updated consumer descriptions occur at `:2120`, `:2485`, `:2620`, and `:2894`. The retained guide-gate result is at `units/j-guards-report.md:25`. No guide mutation is retained. |
| 9. Shared-file edit boundary | **CONFIRMED** | The complete base-to-subject diff changes only the import, resolver type arguments, and binding in Modal (`src/browser/Modal.ts:36`, `:140`, `:174`) and Offcanvas (`src/browser/Offcanvas.ts:34`, `:144`, `:176`). |
| 10. Proofs bind | **CONFIRMED** | `units/j-guards-report.md:24` records the required red/green readings, including the non-enumerable case. Each instrument mutation is distinguished by its named case, as detailed below. `units/j-guards-mutations.log.txt:12` through `:33` records the kills and surviving control; `:34` records restoration. The recorded source digests match the commit. The instrument checks exact case status at `units/j-guards-mutations.py:349` and restoration at `:420`. |
| 11. Dead state and residue | **CONFIRMED** | `src/browser/types.ts:1` removes the obsolete `Guard` import. Validator imports at `validators.ts:1` retain only used detail types. `src/browser/Popover.ts:1`, `Tooltip.ts:134`, and `Popover.ts:51` leave no profile-guard import or value. The test diff removes obsolete guard imports and profile expectations; no abandoned fixture or helper remains. |

For claim 5, every resolver result is consumed through keys its parser table declares.

| Engine and call | Parser keys and result consumers |
|---|---|
| Collapse, `src/browser/Collapse.ts:110` | `parent`; consumed at `:117`. |
| Dropdown, `src/browser/Dropdown.ts:129` | `dismiss`; its `inside` and `outside` members are consumed at `:138`. |
| Dropdown placement, `src/browser/Dropdown.ts:141` | `offset`, `static`; consumed at `:149` and `:150`. `reference` comes directly from constructor options at `:151`. |
| Carousel, `src/browser/Carousel.ts:147` | `interval`, `keyboard`, `pause`, `ride`, `touch`, `wrap`; consumed at `:164`, `:165`, `:166`, `:167`, `:170`, `:177`, and subsequent interaction setup. |
| Toast, `src/browser/Toast.ts:100` | `animated`, `autohide`, `delay`; consumed at `:108`–`:110`. |
| ScrollSpy, `src/browser/ScrollSpy.ts:124` | `target`, `smooth`; consumed at `:155` and `:157`. |
| ScrollSpy intersection, `src/browser/ScrollSpy.ts:135` | `margin`, `threshold`; consumed at `:143` and `:144`. |
| Modal, `src/browser/Modal.ts:140` | `backdrop`, `escape`, `focus`; consumed at `:161`–`:166`. Constructor values are captured before building the projection passed to the resolver. |
| Offcanvas, `src/browser/Offcanvas.ts:144` | `backdrop`, `escape`, `scroll`; consumed at `:165`–`:171`. Constructor values are captured before building the projection. |
| Tooltip and inherited Popover engine, `src/browser/Tooltip.ts:250` | `animated`, `delay`, `trigger`, `title`, `html`, `container`, `descendants`; consumed at `:276`, `:297`–`:308`, and `:318`. |
| Tooltip/Popover tip, `src/browser/Tooltip.ts:280` | `template`, `class`; consumed at `:306` and `:307`. |
| Tooltip/Popover placement, `src/browser/Tooltip.ts:288` | `position`, `offset`, `fallbacks`; consumed at `:309`–`:311`. |
| Popover content, `src/browser/Tooltip.ts:330` | `content`; consumed at `:337`. The body-slot branch gates this resolution. Tooltip has no body slot; Popover supplies its profile at `src/browser/Popover.ts:51`. |

These parser tables and result consumers are unchanged from `b1d314d`. No engine reads an undeclared key from a resolved object, and none relied on the removed copy loop to carry a consumed key.

For claim 10, the following assertions distinguish each named mutation.

| Mutation | Distinguished? | Assertion evidence |
|---|---|---|
| P1-a: replace the CustomEvent check with Object | **Yes** | The plain `{ detail: null }` must fail at `tests/src/browser/validators.test.ts:156`; the mutation accepts it. |
| P1-b: replace null equality with `!== undefined` | **Yes** | Object and primitive payloads must fail at `tests/src/browser/validators.test.ts:147`, `:153`, and `:154`; the mutation accepts them. |
| P1-c: remove bare-guard containment | **Yes** | The throwing detail accessor must yield a successful attempt returning false at `tests/src/browser/validators.test.ts:177`; the mutation lets it throw. |
| P2-a: accept Element instead of HTMLElement | **Yes** | The SVG target must fail at `tests/src/browser/validators.test.ts:204`; the mutation accepts it. |
| P2-b: accept null related targets | **Yes** | The null target must fail at `tests/src/browser/validators.test.ts:202`; the mutation accepts it. |
| P2-c: remove the CustomEvent requirement | **Yes** | The plain detail-bearing object must fail at `tests/src/browser/validators.test.ts:209`; the mutation accepts it. |
| P2-d: read relatedTarget again | **Yes** | The element-returning getter must run once at `tests/src/browser/validators.test.ts:224`; the mutation runs it twice. |
| P2-e: remove related-guard containment | **Yes** | Throwing detail and related-target accessors must return false without escaping at `tests/src/browser/validators.test.ts:243` and `:249`. |
| P4-collapse: bind the related guard | **Yes** | Expected real null-detail hook calls at `tests/src/browser/Collapse.test.ts:567` disappear. |
| P4-alert: bind the related guard | **Yes** | The payload-bearing injected event reaches a hook, contradicting `tests/src/browser/Alert.test.ts:158`; real null-detail hooks also disappear at `:167`. |
| P4-toast: bind the related guard | **Yes** | Expected real null-detail hook calls at `tests/src/browser/Toast.test.ts:570` disappear. |
| P4-tab: bind the bare guard | **Yes** | Expected related-detail hook calls at `tests/src/browser/Tab.test.ts:581` disappear. |
| P4-modal: bind the bare guard | **Yes** | Expected trigger-bearing and undefined-target hook calls at `tests/src/browser/Modal.test.ts:368` disappear. |
| P4-offcanvas: bind the bare guard | **Yes** | Expected related-detail hook calls at `tests/src/browser/Offcanvas.test.ts:426` disappear. |
| P4-popover: bind the related guard in Tooltip | **Yes** | The injected object payload is admitted and the null payload rejected, contradicting `[[null]]` at `tests/src/browser/Popover.test.ts:388`. |
| O1: restore constructor-key copying | **Yes** | The undeclared throwing getter runs, contradicting the successful result and untouched recorder at `tests/src/browser/helpers.test.ts:612` and `:613`. |
| O2: spread constructor options | **Yes** | `extra` leaks into the result, contradicting exact equality at `tests/src/browser/helpers.test.ts:628`. |
| O3: read a declared key twice | **Yes** | The getter recorder contradicts the single-read assertion at `tests/src/browser/helpers.test.ts:650`. |
| O4: restrict reads to own properties | **Yes** | Attribute value `5` replaces inherited constructor value `0`, contradicting `tests/src/browser/helpers.test.ts:666`. |
| O4-enumerable: restrict reads to own enumerable properties | **Yes** | Attribute value `5` replaces non-enumerable constructor value `0`, contradicting `tests/src/browser/helpers.test.ts:682`. |
| O5: add content to Tooltip’s main parser table | **Yes** | Tooltip reads the content getter, contradicting the untouched recorder at `tests/src/browser/Tooltip.test.ts:394`. |
| CONTROL: reverse the related-target acceptance operands | **Survives as intended** | The valid element remains accepted and its getter remains single-read at `tests/src/browser/validators.test.ts:223` and `:224`. |

No additional behaviour defect was found in the audited change.

VERDICT: FAIL 1
