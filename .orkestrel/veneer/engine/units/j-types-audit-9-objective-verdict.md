# J-TYPES audit round 9 — the objective lane's verdict (analyst on GPT-6 Astra)

Thread `01a0cfd3-5b88-77a1-b7b3-6701bce50238`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-types-audit-9.jsonl` (launch copy under `tmp/codex/`); 19 commands; 374 s; usage {"input_tokens":1564619,"cached_input_tokens":1441792,"cache_write_input_tokens":0,"output_tokens":9874,"reasoning_output_tokens":1865}. Retained verbatim from the exec's last message.

---

1. **CONFIRMED — objective lane.** Attacked the Tab compositions by removing the shared entry and incorrectly extending the toggle exclusion to triggers. The comparisons rejected those controls. Substituting the defaults produces:
   - Outer: `:is(.nav-item, .list-group-item)`.
   - Inner: `:is(.nav-link, [role="tab"], .list-group-item):not(.dropdown-toggle), [data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]`.

   These match Bootstrap’s sets (`src/browser/types.ts:875`, `:879`, `:881`, `:883`; `tab.js:46`, `:47`, `:49`). A `.list-group-item` matches the outer selector itself, so `closest` returns that item, matching `tab.js:264`. The inner reads remain equivalent at `tab.js:180` and `:259`.

   Swept every selector map against its entity’s selector and class defaults, resolving inheritance; inspected attribute and type selectors separately. No cross-key token overlap remains. Controls detected the former Carousel dependency and nested class dependency while rejecting the `dropdown`/`dropdown-toggle` prefix false positive. The attacks failed.

2. **BROKEN.** The statement “The engine’s lifetime listener hides the same set of panels” is broader than Bootstrap’s source (`j-types-report-9.md:34`).

   Counterexample: explicitly show an attached `<div class="offcanvas" style="position: static">` with backdrop disabled and scrolling enabled, then resize after showing completes. Bootstrap sets `_isShown`, `aria-modal`, and `show`; it adds no `offcanvas-` class (`offcanvas.js:104`, `:111`, `:120`). Its resize query therefore excludes this shown, non-fixed panel because `[class*=offcanvas-]` fails (`offcanvas.js:267`). The lifetime-listener contract requires hiding that same state (`src/browser/types.ts:1274`, `:1282`).

   The remaining citations resolve and support their statements: construction initializes `_isShown` to false, unshown `hide()` returns, instance lookup creates when necessary, and load adoption calls `show()` (`offcanvas.js:69`, `:129`, `:260`; `base-component.js:65`). The requested remark is present and the disclaimer is absent.

   Smallest fix: qualify set equivalence to Bootstrap’s document-query matches and position guard; describe the lifetime listener’s broader coverage. Retain the lifetime-listener contract.

3. **CONFIRMED.** Attacked the replacements for stale wording, wrong attribute paths, and guide mismatch. The Button descriptions, physical-side description, update descriptions, and event-map parameter sentences match the required text (`src/browser/types.ts:72`, `:74`, `:127`, `:138`, `:376`, `:813`, `:1516`, `:1665`). Corresponding guide cells agree (`guides/veneer.md:35`, `:60`, `:292`, `:338`, `:351`). The obsolete phrases are absent from `types.ts`. The attacks failed.

4. **CONFIRMED.** Attacked capture integrity, unrelated guide changes, forbidden syntax, and surviving replacement members. The live diff equals `j-types-9.diff`; tip and status match the supplied evidence. Normalizing table padding leaves the intended description changes and removed ScrollLock class-map row. Syntax inspection finds no prohibited constructs; interface properties are readonly, and replaced declarations have no compatibility path. Controls detect a writable property and an `any` type.

   The Orchestrator’s final-tree log records the successful gates and refusal greps (`j-types-gates-9.log.txt:16`, `:19`, `:22`, `:29`, `:42`, `:55`, `:57`, `:59`, `:61`). Probe diagnostics correspond to the refusal lines, with none on acceptance lines (`:78`; `j-types-probe-6.ts:12`, `:18`). The attacks failed.

**Findings fitting no claim:** none.

**Attacked and held:** A Tab trigger that also matches the dropdown-toggle selector remains admitted through the independent trigger alternative; Bootstrap does the same. ScrollSpy’s repeated `.nav-link` within one default creates no cross-key ownership conflict. Bootstrap’s newly constructed, unshown offcanvas instance still hides nothing; that correction holds.

**Referrals:** Carry claim 2’s comparison correction to E42’s departure paragraph and J-OFFCANVAS’s compatibility accounting.

**Bounds:** Claim 2 falsifies the report’s universal set-equivalence sentence, not the lifetime-listener design. This is a source review with executed selector-expansion and syntax comparisons, supplemented by supplied gate evidence. No build or browser test was rerun, and no file was written.

VERDICT: FAIL 2; outside the claims: none
