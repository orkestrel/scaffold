# J-ORACLE-RECORD round 2 audit, the objective lane (analyst on GPT-6 Astra)

Thread `01a0d70e-8173-7b83-888e-08a8d87fd443`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-oracle-record-audit-2.jsonl` (launch copy under `tmp/codex/`); 38 commands; 329 s; usage {"input_tokens":1126420,"cached_input_tokens":1001344,"cache_write_input_tokens":0,"output_tokens":8854,"reasoning_output_tokens":2703}. Retained verbatim from the exec's last message.

---

Claim **3 fails**: scroll offsets are rounded before recording, so distinct settled destinations can compare equal. The other assigned claims are confirmed.

I read Veneer from `c66e317`, ran no tests, and changed no files. Executed results below come from the retained replay; new witnesses are static source traces. Veneer references name committed files. Evidence filenames are under `scaffold/.orkestrel/veneer/engine/units/`.

| Claim | Ruling | Evidence; mutation and distinction |
|---|---|---|
| **1. Own-property labels** | **CONFIRMED** | `Object.fromEntries(entries)` preserves `__proto__` (`tests/setupServer.ts:4871`); comparator lookups use `Object.hasOwn` (`:5187`, `:5191`, `:5194`). The cases preserve serialized `__proto__` and distinguish missing `constructor` in either direction (`tests/setupServer.test.ts:1252`, `:1331`). Their round-1 failures are retained at `j-oracle-record-report-2.md:85`; green setup replay at `j-oracle-record-replay-2.log.txt:8`. **Witnesses:** changing `__proto__`’s classes is now distinguishable; removing `constructor` reports element absence instead of throwing. |
| **2. One evaluation per reading** | **CONFIRMED** | `reportPluginPage` reads state and motion synchronously (`tests/setupServer.ts:4720`, `:4758`). The direct reader and settle call that function (`:4800`, `:4906`). The stated exclusions appear at `:4890`. **Witness:** the round-1 change between separate evaluations no longer has that opening. Structural confirmation; the retained case at `tests/setupServer.test.ts:1520` is not an executed race mutation. |
| **3. Added facets** | **FAIL** | Own text and parent are recorded (`tests/setupServer.ts:4743`, `:4749`, `:4857`), and text, parent, and scroll differences are compared (`:5242`, `:5250`, `:5258`). The named mutation rows are killed by assertions, as detailed below. However, `Math.round` discards fractional scroll offsets (`:4753`). **Witness:** otherwise identical readings exposing `scrollTop` of `10` and `10.25` record `10` on each side; **not distinguished**. E28 adds settled scroll offsets without granting an integer-pixel tolerance (`decisions.md:397`). |
| **8. Cleanup** | **CONFIRMED** | Scratch acquisition precedes browser launch (`tests/setupServer.ts:4594`), so its failure cannot leak a browser. Launch failure reaches scratch cleanup; drive failure reaches browser close; rejected close still reaches the outer scratch cleanup (`:4595`, `:4600`, `:4605`). **Plant:** throw inside the drive after retaining the resources. The case checks directory removal and browser disconnection (`tests/setupServer.test.ts:1585`); the setup replay passes. These are resource assertions, not oracle comparisons. |
| **9. Seams and instrument** | **CONFIRMED** | The transform case changes `bs-popover-auto` to `bs-popover-planted` and checks the compiled output (`tests/setupServer.test.ts:1481`, `:1491`). Attribute-table freeze assertions appear at `:1165`, `:1167`. The classifier rejects another failed suite before considering the named assertion (`j-oracle-record-mutations-2.py:96`, `:110`); `control.suite` is refused in the replay (`j-oracle-record-replay-2.log.txt:43`). Mutation distinctions are below. |
| **10. Recordings and census** | **CONFIRMED** | Every committed plugin fixture equals its retained Bootstrap census recording after JSON parsing. The conformance case compares live Bootstrap with the saved fixture (`tests/conformance.test.ts:317`, `:321`), and its retained replay passes (`j-oracle-record-replay-2.log.txt:5`). Button’s base and subject blobs are identical: `ed3d873446e3ee9aabed1c4e309dbbccb7dfa587`. Expanding the report’s grouped table (`j-oracle-record-report-2.md:111`) matches the departure records, including `spy.scroll.top` **544 → 600** under each motion preference (`j-oracle-record-census-2/departures.json:2`, `:11`). **Mutation:** altered saved focus is distinguished by the fixture comparison (`tests/setupServer.test.ts:1396`). |

The scroll precision finding concerns recorded state, which E28 explicitly includes. The platform exposes `scrollTop` and `scrollLeft` as floating-point values; rounding is additional normalization introduced by this implementation. [CSSOM View specification](https://drafts.csswg.org/cssom-view/#extension-to-the-element-interface)

The retained plant’s SHA-256 matches the replay’s receipt at `j-oracle-record-replay-2.log.txt:25`. It requires exactly one matching source span and one application, then compares added departures filtered by facet, attribute name, and subject before asserting an empty result (`j-oracle-record-mutation-2.test.ts:248`, `:257`, `:259`, `:265`). This closes round 1’s missing-plant evidence gap.

| Mutation row | What it actually plants | Does the comparison distinguish it? | Plant evidence |
|---|---|---|---|
| `collapse.expanded` | Negates the expanded value written to triggers. | **Yes:** `aria-expanded`; KILLED. | `j-oracle-record-mutation-2.test.ts:36` |
| `alert.connected` | Suppresses host removal and changes the connectivity guard so close can continue. | **Yes:** alert element remains; KILLED. | `:46` |
| `tab.selected` | Writes `aria-selected="true"` regardless of selection. | **Yes:** outgoing selection attribute; KILLED. | `:56` |
| `scrollspy.active` | Skips every inactive-token write at the matched leaf. | **Yes:** stale `active` membership; KILLED. This is broader than the abandoned activation-only plant. | `:66` |
| `dropdown.expanded` | Writes `"true"` where closing writes `"false"`. | **Yes:** toggle attribute; KILLED. | `:76` |
| `carousel.current` | Suppresses removal of outgoing `aria-current` and adjusts the expected write accordingly. | **Yes:** outgoing indicator attribute; KILLED. | `:86` |
| `modal.hidden` | Suppresses removal of `aria-hidden` when opening. | **Yes:** retained attribute; KILLED. | `:114` |
| `offcanvas.modal` | Suppresses setting `aria-modal="true"`. | **Yes:** missing attribute; KILLED. | `:124` |
| `toast.showing` | Keeps the transition token and adjusts the expected class state. | **Yes:** retained `showing`; KILLED. | `:134` |
| `tooltip.described` | Appends `-elsewhere` to the referenced tip ID. | **Yes:** reference normalizes to `?` instead of the tip label; KILLED. | `:144` |
| `popover.auto` | Replaces `bs-popover-auto` with `bs-popover-start`. | **Yes:** class membership; KILLED. It does not prove Popover content. | `:154` |
| `tooltip.text` | Appends ` (planted)` to string content assigned to the slot. | **Yes:** `.tooltip-inner` own text; KILLED. | `:164` |
| `dropdown.parent` | Appends the menu to `document.body` during show. | **Yes:** menu parent label; KILLED. | `:174` |
| `scrollspy.destination` | Adds `section.offsetHeight` to the section’s bounding top. | **Yes:** the spy’s settled top offset; KILLED. This proves a section-sized difference, not fractional precision. | `:185` |
| `control.equivalent` | Replaces `String(expanded)` with template interpolation. | **No difference expected:** HELD. | `:205` |
| `control.boom` | Throws `Error('boom')` during the trigger write. | **No completed comparison:** page-error refusal; REFUSED. | `:215` |
| `control.unbound` | Searches for a source span containing `String(unbound)`, which is absent. | **No completed comparison:** transform/build refusal; REFUSED. | `:225` |
| `control.suite` | Applies the negated Collapse value beside a suite that fails collection. | The Collapse difference is distinguishable, but the run is correctly **REFUSED**. | `:195`; `j-oracle-record-mutations-2.py:124` |

The replay records those outcomes at `j-oracle-record-replay-2.log.txt:26` through `:43`. The round-1 failed-suite witness therefore closes.

Beyond E28’s named exclusions, these end-state gaps remain. They are outside the literal added-facet obligations, except for scroll precision ruled above:

- **Element identity by tag is discarded.** Smallest witness: replace an unfocused `<button id="x">Go</button>` with `<div id="x">Go</div>`, preserving the other recorded facets. Authored labels come from IDs, and the saved element omits `tag` (`tests/setupServer.ts:4822`, `:4860`). The comparison reports no departure although native keyboard activation and semantics changed. Tags of inserted elements matched by a spawned selector can likewise disappear from the recording.
- **Sibling order is not compared.** Smallest witness: swap otherwise unchanged authored siblings `<button id="a">A</button><button id="b">B</button>`. Parent labels remain equal, and the comparator compares label membership and values, not their order (`tests/setupServer.ts:5184`, `:5250`). This matters to menu navigation: Bootstrap selects the next menu item from DOM-order results (`node_modules/bootstrap/js/src/dropdown.js:327`).
- **Text placement around child elements is lost.** Smallest witness: `<div id="p">A<span id="s">X</span>B</div>` versus `<div id="p"><span id="s">X</span>AB</div>`. Each records parent text `AB`, child text `X`, and the same parent relationship. The rendered content changes from `AXB` to `XAB`, but the comparison cannot distinguish it (`tests/setupServer.ts:4743`, `:4746`). This leaves mixed HTML Tooltip/Popover content unproved; Bootstrap supports that content path (`node_modules/bootstrap/js/src/util/template-factory.js:133`).

On the referral: **a `never` check is not owed to establish correctness of the current subject**. Every gesture admitted by `PluginAction` is handled (`tests/setupServer.ts:354`, `:402`, `:4935`). No current well-typed action reaches an unhandled branch. An exhaustiveness check would usefully catch future union extensions, but the hypothetical added member is not a present behavior defect. The unchanged-state check would indeed be insufficient protection for a future omitted gesture marked `refused` (`:5055`).

VERDICT: FAIL 3
