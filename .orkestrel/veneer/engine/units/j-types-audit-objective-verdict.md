# J-TYPES audit round 1 — the objective lane's verdict (returned 2026-09-23 by analyst on GPT-6 Astra, gpt-6-astra at high effort, read-only codex exec)

Thread `01a0cf2d-e570-7c52-9033-423830e4ac72`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-types-audit.jsonl` (launch copy under `tmp/codex/`); 33 commands; 498 s; usage {"input_tokens":2643384,"cached_input_tokens":2496640,"cache_write_input_tokens":0,"output_tokens":13701,"reasoning_output_tokens":3951}. Retained verbatim from the exec's last message.

---

1. **CONFIRMED** — Attacked the added event maps by comparing dispatched events with listener-only constants. The key sets match: Collapse, Dropdown, Tab, and Toast have `show`, `shown`, `hide`, `hidden`; Modal and Offcanvas add `hidePrevented`; Tooltip and inherited Popover add `inserted`; Alert has `close`, `closed`; Carousel has `slide`, `slid`; ScrollSpy has `activate`. No internal listener event leaked into the maps. Evidence: Bootstrap `collapse.js:129`, `dropdown.js:133`, `tab.js:90`, `modal.js:265`, `offcanvas.js:170`, `tooltip.js:193`, `alert.js:38`, `toast.js:76`, `carousel.js:316`, `scrollspy.js:233`. Popover’s inherited dispatch uses its own name through `base-component.js:81`.

2. **CONFIRMED** — Attacked payloads using programmatic Dropdown hides, Tab activation without an active sibling, and Modal/Offcanvas hide events without a trigger payload. `DropdownDetail.clickEvent`, `TabDetail.relatedTarget`, `ModalDetail.relatedTarget`, and `OffcanvasDetail.relatedTarget` admit `undefined`; the remaining fields match the hydrated objects. Payload-free entities use `CustomEvent<undefined>`. Evidence: contract `src/browser/types.ts:508`, `:608`, `:666`, `:736`, `:831`, `:1294`; Bootstrap `dropdown.js:164`, `:384`, `tab.js:93`, `modal.js:128`, `offcanvas.js:133`, `carousel.js:316`.

3. **CONFIRMED** — Walked every plugin `Default` key looking for an unreachable option. The complete mapping follows; paths are relative to that plugin’s options.

   | Plugin and Bootstrap source | Default keys → contract paths or exclusions |
   |---|---|
   | Collapse, `collapse.js:45` | `parent → parent`; `toggle → toggle` |
   | Dropdown, `dropdown.js:71` | `autoClose → dismiss.inside/outside`; `boundary → excluded by R9`; `display → placement.static`; `offset → placement.offset`; `popperConfig → excluded by R9`; `reference → reference` |
   | Tab, Alert | No plugin defaults; inherited `Config.Default` is empty (`util/config.js:17`) |
   | ScrollSpy, `scrollspy.js:41` | `offset → excluded from TypeScript; attribute conversion under R11`; `rootMargin → intersection.margin`; `smoothScroll → smooth`; `target → target`; `threshold → intersection.threshold` |
   | Modal, `modal.js:50` | `backdrop → backdrop` and `dismiss.backdrop`; `focus → focus`; `keyboard → dismiss.escape` |
   | Offcanvas, `offcanvas.js:49` | `backdrop → backdrop` and `dismiss.backdrop`; `keyboard → dismiss.escape`; `scroll → scroll` |
   | Tooltip, `tooltip.js:58` | `allowList → sanitize.allow`; `animation → animation`; `boundary → excluded by R9`; `container → container`; `customClass → tip.class`; `delay → delay.show/hide`; `fallbackPlacements → placement.fallbacks`; `html → html`; `offset → placement.offset`; `placement → placement.position`; `popperConfig → excluded by R9`; `sanitize → sanitize.enabled`; `sanitizeFn → sanitize.filter`; `selector → selector`; `template → tip.template`; `title → title`; `trigger → trigger.hover/focus/click` |
   | Popover, `popover.js:20` | Every inherited Tooltip key retains that path; `content → content`; overridden `offset`, `placement`, `template`, and `trigger` retain their inherited paths |
   | Toast, `toast.js:41` | `animation → animation`; `autohide → autohide`; `delay → delay` |
   | Carousel, `carousel.js:70` | `interval → interval`; `keyboard → keyboard`; `pause → pause`; `ride → ride`; `touch → touch`; `wrap → wrap` |

   Every added component options interface supplies its hooks and abort signal, including Popover through inheritance (`types.ts:1090`).

4. **CONFIRMED** — Attacked the defaults at the differing Tooltip, Popover, and Dropdown offsets and triggers, ScrollSpy’s root margin, and Carousel’s cycling defaults. The component defaults match the Bootstrap objects cited in claim 3. Effective body and title fallbacks are supported by `scrollspy.js:115` and `tooltip.js:356`; Backdrop and swipe values match `util/backdrop.js:23` and `util/swipe.js:26`. The inherited Tooltip container departure is the expressly authorized exception. Shared mechanism construction defaults are distinct from the component defaults that override them.

5. **CONFIRMED** — Compared interface members against the adopted Components table and R12, attempting to find an extra behavioral method or an omitted rename. The members match. `nextWhenVisible`, static lookup, and `toggleEnabled` correctly stay outside the instance contracts; the added state getters match the adopted table. Evidence: `j-engine-design-planner-proposal.md:178`, design R12, and contract interfaces beginning at `types.ts:461`.

6. **BROKEN** — A shown Tooltip or Popover makes `fill()` a transition-producing operation, yet its contract returns `void` (`types.ts:1043`, `:1162`). Bootstrap’s corresponding `setContent()` disposes the shown tip and calls `show()` (`tooltip.js:326`), which dispatches the cancelable show event and queues completion (`:193`, `:239`). This contradicts the claim’s transition/pre-change criterion and R6, despite ruling 26 listing `fill` among the exceptions.

   Exact state and input: a shown, enabled tip with nonempty content; call `fill()` with replacement content. The caller cannot obtain its completion or refusal result. An in-memory TypeScript check assigning either call to `Promise<boolean>` produced `TS2322`; changing the return declarations to `Promise<boolean>` made the same check pass. Smallest correction: include Tooltip and Popover `fill()` in the promise contract and define the hidden-tip update result. Non-transitioning configuration operations need not change.

7. **BROKEN** — The refusal contracts disagree with Bootstrap in reachable states.

   - For an enabled, connected Tooltip or Popover whose previous show completed, another `show()` rebuilds the tip; Bootstrap has no already-shown guard (`tooltip.js:184–239`). The contracts instead require refusal (`types.ts:989`, `:1108`). R6’s in-flight refusal does not cover this settled state.
   - Bootstrap refuses showing a detached trigger (`tooltip.js:195–198`); those same contract refusal lists omit that condition.
   - A Carousel with a single active item and `wrap: true` refuses `next()` and `previous()` because the next element equals the active element (`carousel.js:309`). The contract lists the end-of-list refusal only without wrapping (`types.ts:1348`, `:1358`).

   Smallest correction: align these refusal conditions with those branches, while retaining R6’s explicit in-flight and destruction rules. Toast’s missing already-shown refusal is correct: `toast.js:75–99` dispatches show, clears the timeout, applies showing classes, dispatches shown, and schedules hiding again without checking `isShown()`.

8. **CONFIRMED** — Inspected the added declarations with the installed TypeScript parser for mutable properties and collections, assertions, forbidden types/modifiers, and imports. No structural violation appeared. An in-memory control replacing `readonly code: string` with `code: any` reported both the missing readonly modifier and `AnyKeyword`. The file contains no import or suppression directive. Coverage: the added declaration region, with the complete file inspected for imports.

9. **CONFIRMED** — Attacked the mechanism contracts with stale registry release, repeated snapshot saves, absent-state restoration, nested scroll-lock references, and static placement. The required distinctions are expressible: release identifies the owning engine; snapshot categories and first-save semantics are declared; isolation conditions focus return; scroll-lock destruction releases a reference; placement separates construction mode from positioning options. Evidence: `types.ts:103`, `:113`, `:155`, `:165`, `:193`, `:216`, `:261`, `:304`, `:316`, `:326`, `:357`. This confirms contract sufficiency, not implementations that do not yet exist.

10. **CONFIRMED** — The proof must distinguish a wire widened to `string`, hooks widened with an index signature, and listeners changed to return `boolean`. Executed in-memory checks with the installed TypeScript compiler under strict and exact-optional settings distinguished those mutations: the actual wrong wire produced `TS2322`, the unknown hook produced `TS2353`, and the respective widening controls admitted them. The boolean-return mutation broke the void-return assertion and Button compatibility. Valid Button assignments in each direction and Popover-to-Tooltip assignments compiled. The supplied browser typecheck result remains accepted without rerunning it. Scope: type semantics only; no browser test ran.

11. **CONFIRMED** — Completeness and parity attacks held. The declaration inspection found no missing export/member documentation, method parameter tag, value-return tag, or method example fence. The installed guide reader reported no summary drift or method-table mismatch. An in-memory changed `RegistryInterface.claim` summary produced summary drift; removing Collapse’s `show` table entry produced a membership mismatch. These assertions distinguish those mutations from the passing case.

   Prose bound, not a finding under the brief: boolean descriptions use the prescribed “If `true`…” form, so the claim’s literal universal “opens with an `-s` verb” wording overstates the voice rule.

12. **CONFIRMED** — Attacked scope by comparing the supplied diff with the actual worktree diff and comparing the seed bytes with `376d84a`. The diffs matched; an in-memory changed declaration made that comparison fail. Removing only the authorized ColorMode summary change and appended boundary newline made the seed byte-identical. The supplied status names only the authorized files. Guide changes occupy the Surface rows, Methods tables, and authorized toggle summary. The established whitespace-insensitive guide result was not rerun.

13. **CONFIRMED** — Inspected added member names for compounds and compared behavioral renames with R12. The component compounds are mirrored Bootstrap names; `SnapshotTarget.category` names its discriminant. Shared helper/data types follow the applicable mapped-type and plain-data forms. The structural `setHTML` method mirrors the external platform method under the same external-name rule (`types.ts:418`). No unsupported component rename appeared.

14. **CONFIRMED** — Attacked necessity by checking whether the installed DOM declarations already expose the required safe write. They declare `Sanitizer` at `lib.dom.d.ts:34572` and `setHTMLUnsafe` at `:13893`, but no `setHTML` member. `SetHTMLOptions` and `SanitizeTargetInterface` contain only the sanitizer option and safe-write signature needed for R10 (`types.ts:404`, `:416`). This establishes the structural need; naming judgment belongs to the other lane.

15. **CONFIRMED** — The distinguishing mutation removes Collapse’s method examples while leaving the interface and method table intact. Reproduced that mutation in memory through the installed guide reader: the actual contract had no missing examples; the mutation reported `show` and `hide`. `toggle` and `destroy` remained covered by the seed fences.

   `tests/guides.test.ts:140` asserts an empty method-example finding list. The installed reader checks interface methods without requiring an implementing class (`@orkestrel/guide/dist/src/core/index.js:3305`, `:3677`) and combines source example membership with fence mentions (`:3746`). `findUnexampled` performs that presence check (`:869`). This distinguishes the supplied mutation; it does not execute the example or verify that a fence invokes the correct receiver.

Findings outside the claims: none.

**Attacked and held**

- Repeated Toast show is supported upstream; an already-shown refusal would change Bootstrap behavior.
- Popover’s absent local event constants are correct because inherited dispatch derives the Popover suffix.
- Optional event fields preserve absence without introducing `null`.
- Contract-only interfaces can satisfy guide parity. Example coverage is presence-based; it proves no component runtime behavior.
- Snapshot restoration preserves unrecorded consumer state; the stated contract restores recorded targets.
- Boolean documentation openings are retained as the brief’s prose bound.

VERDICT: FAIL 6, 7; outside the claims: none
