# J-TYPES audit round 8 — the objective lane's verdict (analyst on GPT-6 Astra)

Thread `01a0cfc8-3933-7f80-9461-859f5ea8a60c`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-types-audit-8.jsonl` (launch copy under `tmp/codex/`); 36 commands; 306 s; usage {"input_tokens":1359895,"cached_input_tokens":1253760,"cache_write_input_tokens":0,"output_tokens":7979,"reasoning_output_tokens":2086}. Retained verbatim from the exec's last message.

---

1. **CONFIRMED — objective lane.** Attacked E31 with distinct scrolling-host and navigation-target elements, and with inactive navigation links. `ScrollSpySelectorMap.parent` correctly names the target’s `[href]` links and limits the getter to the active link (`src/browser/types.ts:975`, `:1014`). Bootstrap reads candidates from `this._config.target`, then filters them (`scrollspy.js:205`, `:209`, `:216`). The parent default matches Bootstrap’s constant and preceding-sibling activation (`scrollspy.js:37`, `:247`). The attack failed.

2. **BROKEN.** The universal no-shared-token assertion has a counterexample: `TabSelectorMap.wrapper` defaults to `.nav-item, .list-group-item`, while `link` defaults to `.nav-link, .list-group-item, [role="tab"]` (`src/browser/types.ts:879`, `:881`). Each retains the other’s `.list-group-item` branch. Overriding either key leaves that literal in the other.

   Swept every selector default for Button, ScrollLock, Collapse, Dropdown, Tab, ScrollSpy, Modal, Offcanvas, Tooltip, Popover, Alert, Toast, and Carousel against its entity’s class and selector keys, resolving inheritance. The class-token pattern was `\.([a-zA-Z_-][a-zA-Z0-9_-]*)`, including occurrences within compounds, selector lists, `:not()`, and descendant combinators; the remaining attribute and type-selector defaults were inspected directly. Tab’s shared branch was the only hit. Controls detected the former `.carousel-item img` dependency and a token inside nested selectors, while rejecting the `dropdown`/`dropdown-toggle` prefix false positive.

   E32 and E33 themselves hold: the Carousel composition matches `.carousel-item img`; the Tab composition distributes the exclusion over the link alternatives and retains the independent trigger alternative (`carousel.js:60`, `:220`; `tab.js:47`, `:49`, `:180`, `:259`). Smallest contract repair under the no-duplication rule: give the shared branch one owning key and compose the outer and inner sets separately. Preserve `.nav-item` as an outer-only alternative.

3. **CONFIRMED.** Attacked E35 with an element-local attribute list and no global list, then with explicitly listed `data-x`. The supplied probe removes unlisted data attributes in the former case and retains the listed name in the latter, matching the revised default (`j-types-8-probe-sanitizer.test.ts:24`, `:25`; `j-types-8-probe-sanitizer.log.txt:2`; `src/browser/types.ts:527`). The global-list and no-list readings also agree. E34’s description matches the guide cell (`src/browser/types.ts:1572`; `guides/veneer.md:136`). The attacks failed.

4. **BROKEN.** The per-instance mechanism is expressible through the declared contracts: the instance has its host, lifecycle signal, `hide()`, and `destroy()`; it needs no registry enumeration (`src/browser/types.ts:1265`, `:1271`, `:1280`, `:1298`, `:1318`). This agrees with the non-enumerating registry and design R4 (`src/browser/types.ts:169`; `j-engine-design-verdict.md:14`). The rewritten accounting row agrees, and remaining registry-walk references describe the superseded mechanism (`j-types-report-8.md:34`, `:36`).

   The departure sentence is inaccurate (`j-types-report-8.md:38`). A shown panel whose computed position remains `fixed` receives no resize-triggered `hide()` call: Bootstrap applies both its selector and the position condition (`offcanvas.js:267`, `:268`). Further, for matching non-fixed markup inserted after window load without an existing instance, `getOrCreateInstance()` constructs an instance whose `_isShown` is `false`; `hide()` immediately returns (`base-component.js:65`; `offcanvas.js:69`, `:128`). Creation does not establish that markup-only panels are hidden.

   Smallest fix: describe the exact query and position guard, distinguish instance creation from successful hiding, and distinguish resize from Bootstrap’s separate load-time `.show()` adoption (`offcanvas.js:260`). Retain Veneer’s per-instance mechanism.

5. **CONFIRMED.** Attacked the changes for stale attribute paths, literal state-token promises, lost backdrop pass-through, and guide drift. The paths resolve to the declared vocabulary (`src/browser/types.ts:376`, `:397`, `:420`, `:757`, `:1581`); the token sentences use the backticked keys, including Button restoration and Backdrop animation (`:80`, `:287`). Backdrop’s leaves retain the mappings (`:273`, `:275`, `:277`). The EventWire, PopoverClassMap, and ScrollLock sentences carry the requested wording (`:136`, `:1551`, `:328`). Changed guide cells agree, corroborated by the supplied parity run (`j-types-gates-8.log.txt:38`, `:42`). The attacks failed.

6. **CONFIRMED.** Attacked the evidence for capture drift, unrelated guide edits, and surviving replacement declarations. The live diff equals `j-types-8.diff`, the tip is `b9adebf`, and status matches the supplied status file. Comparing guide changes after removing table padding leaves the changed descriptions, method cells, and removed ScrollLockClassMap row. Added declarations contain none of the prohibited constructs; replaced members have no compatibility alias or fallback. The supplied final-tree log records successful gates and exactly the expected refusal diagnostics, with none on acceptance lines (`j-types-gates-8.log.txt:16`, `:19`, `:22`, `:29`, `:38`, `:51`, `:72`). The attacks failed.

**Findings fitting no claim:** none.

**Attacked and held:** The attacks for claims 1, 3, 5, and 6 are recorded in their verdicts. Adjacent correct behavior includes ScrollSpy filtering its target’s candidate links, explicitly listed data attributes surviving, and the `trigger` alternative admitting a Tab trigger even when it also matches `toggle`.

**Referrals:** Carry the shared Tab branch to the selector-contract ruling. Carry the corrected Bootstrap comparison to J-OFFCANVAS’s Compatibility row.

**Bounds:** Tab’s overlap does not falsify default selector equivalence: Bootstrap deliberately includes `.list-group-item` in its outer and inner sets (`tab.js:46`, `:47`). Claim 4 does not invalidate the per-instance listener design. This verdict is a source review supplemented by the supplied Chromium and compiler readings; no build or browser test was rerun, and no file was written.

VERDICT: FAIL 2, 4; outside the claims: none
