# J-ORACLE-RECORD round 3 audit, the objective lane (analyst on GPT-6 Astra)

Thread `01a0d739-e170-7e70-9e73-13f9f3b10681`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-oracle-record-audit-3.jsonl` (launch copy under `tmp/codex/`); 37 commands; 339 s; usage {"input_tokens":1161308,"cached_input_tokens":1052544,"cache_write_input_tokens":0,"output_tokens":9245,"reasoning_output_tokens":2360}. Retained verbatim from the exec's last message.

---

All claims are **CONFIRMED**. I read Veneer at `6880e63`, ran no tests, and changed no files. Executed results below come from the retained replay; witness analysis is a static trace through the committed source.

Veneer references below are at `6880e63`. Evidence filenames are under `scaffold/.orkestrel/veneer/engine/units/`.

| Claim | Ruling | Evidence; mutation and distinction |
|---|---|---|
| **1. Exact scroll** | **CONFIRMED** | Offsets pass through without rounding (`tests/setupServer.ts:4914`, `:5031`) and compare numerically (`:5447`). The witness writes `10` versus `10.25` on the zoomed scroller; the retained platform readings are `10` versus `10.333333015441895` (`:1542`). **Distinguished.** The comparator case also distinguishes `40` from `40.25` (`tests/setupServer.test.ts:1313`). Round-2 red readings: `j-oracle-record-report-3.md:57`; subject setup replay passes: `j-oracle-record-replay-3.log.txt:8`. |
| **2. Tags** | **CONFIRMED** | The reader records `localName`, retains it in the labelled state, and compares it (`tests/setupServer.ts:4890`, `:5025`, `:5388`). **Mutation:** replace the button with a div while retaining its ID, attributes, and text (`:1567`). **Distinguished** as `tag: button → div`. Red reading: `j-oracle-record-report-3.md:60`; green witness assertion: `tests/setupServer.test.ts:1273`, supported by the setup replay. |
| **3. Ordered content** | **CONFIRMED** | The reader preserves text/element order, normalizes text runs, translates child positions to labels, and compares sequences (`tests/setupServer.ts:4897`, `:5019`, `:5430`). It replaces own text. **Swapped siblings:** `[first, second] → [second, first]`, distinguished (`:1589`). **Text placement:** `[A, mark, B] → [mark, AB]`, distinguished (`:1611`). Their round-2 failures appear at `j-oracle-record-report-3.md:61`. The `tooltip.tag`, `tooltip.order`, and `tooltip.placement` plants each reach an assertion failure (`j-oracle-record-replay-3.log.txt:38`). Content normalization limits are addressed below. |
| **4. Exhaustiveness** | **CONFIRMED** | The switch returns from each handled branch and assigns its default-branch action to `never` (`tests/setupServer.ts:5100`, `:5126`). **Mutation:** add the unhandled `PluginDragAction` union member. The report records compilation succeeding before the check and failing afterward with TS2322 (`j-oracle-record-report-3.md:66`). **Distinguished by compilation**, not the oracle comparison. |
| **5. Requested wording** | **CONFIRMED** | The settle sentence names work a plugin schedules (`tests/setupServer.ts:5056`); `@param report` names `reportPluginPage` (`:4965`); the test title reads “the tag, content, parent, and scroll offsets of each” (`tests/setupServer.test.ts:1183`). No prose-voice finding. |
| **6. Recordings and census** | **CONFIRMED** | Each committed plugin fixture equals its retained Bootstrap census recording after JSON parsing. `button.json` is byte-identical to the base. The conformance case compares live Bootstrap against the fixture (`tests/conformance.test.ts:317`, `:321`), and the replay passes (`j-oracle-record-replay-3.log.txt:5`). Round-3 `departures.json` is byte-identical to round 2; `findings.json` differs only in timings. **Prevented-show mutation:** the body loses the backdrop entry (`tests/setupServer.ts:1101`). **Distinguished, and genuinely added by the seam:** ordinary Bootstrap and Veneer both retain that entry (`j-oracle-record-census-3/modal.bootstrap.json:412`, `modal.veneer.json:412`). Prevention returns before backdrop creation (`src/browser/Modal.ts:254`, `:285`), and the control subtracts ordinary Veneer’s departures (`tests/setupServer.ts:5506`, `:5513`). |
| **7. Proofs bind** | **CONFIRMED** | The plant requires exactly one matching span and one application, records ordinary and mutated Veneer, filters newly added departures by the declared facet/name/subject, then asserts an empty result (`j-oracle-record-mutation-3.test.ts:278`, `:287`, `:289`, `:295`). The classifier refuses broken suites before accepting assertion failures (`j-oracle-record-mutations-3.py:106`, `:120`). Replay outcomes match expectations (`j-oracle-record-replay-3.log.txt:26`), and source preservation is recorded at `:47` and `:102`. I independently matched the retained instrument/plant hashes and every recorded source digest against the committed subject. Per-row distinctions follow. |

For this table, `plant:N` means `j-oracle-record-mutation-3.test.ts:N`. The assertion outcomes are retained at `j-oracle-record-replay-3.log.txt:26` through `:46`.

| Mutation | Planted difference | Does the comparison distinguish it? | Evidence |
|---|---|---|---|
| `collapse.expanded` | Negates the expanded attribute value. | **Yes — KILLED:** `aria-expanded`. | `plant:36` |
| `alert.connected` | Suppresses alert removal and adjusts the connectivity guard. | **Yes — KILLED:** retained element. | `plant:46` |
| `tab.selected` | Writes selected=true regardless of selection. | **Yes — KILLED:** outgoing `aria-selected`. | `plant:56` |
| `scrollspy.active` | Skips inactive-token writes. | **Yes — KILLED:** stale `active` membership. | `plant:66` |
| `dropdown.expanded` | Writes true during closing. | **Yes — KILLED:** toggle’s `aria-expanded`. | `plant:76` |
| `carousel.current` | Retains outgoing `aria-current`, adjusting the write expectation accordingly. | **Yes — KILLED:** outgoing indicator attribute. | `plant:86` |
| `modal.hidden` | Suppresses removal of `aria-hidden`. | **Yes — KILLED:** retained attribute. | `plant:114` |
| `offcanvas.modal` | Suppresses setting `aria-modal`. | **Yes — KILLED:** missing attribute. | `plant:124` |
| `toast.showing` | Retains the transition token and adjusts the expected class state. | **Yes — KILLED:** retained `showing`. | `plant:134` |
| `tooltip.described` | References a nonexistent tip ID. | **Yes — KILLED:** reference normalizes to `?`. | `plant:144` |
| `popover.auto` | Replaces `bs-popover-auto` with `bs-popover-start`. | **Yes — KILLED:** class membership. | `plant:154` |
| `tooltip.text` | Appends ` (planted)` to the title. | **Yes — KILLED:** inner content. | `plant:164` |
| `tooltip.tag` | Builds the inner element as a span. | **Yes — KILLED:** tag, with its selector-based label preserved. | `plant:174` |
| `tooltip.order` | Places the inner element before the arrow. | **Yes — KILLED:** tip child-label order. | `plant:184` |
| `tooltip.placement` | Writes the title before the inner element instead of inside it. | **Yes — KILLED:** tip content sequence. | `plant:194` |
| `dropdown.parent` | Appends the menu to the body during show. | **Yes — KILLED:** parent label. | `plant:204` |
| `scrollspy.destination` | Adds a section’s height to the requested destination. | **Yes — KILLED:** settled scroll offset. This proves the section-sized difference; the separate witness proves fractional precision. | `plant:215` |
| `control.equivalent` | Replaces `String(expanded)` with interpolation. | **No difference — HELD**, as expected. | `plant:235` |
| `control.boom` | Throws during the trigger write. | **No completed comparison — REFUSED** for the page error. | `plant:245` |
| `control.unbound` | Names a source span that does not exist. | **No completed comparison — REFUSED** during compilation. | `plant:255` |
| `control.suite` | Applies the killing Collapse mutation beside a collection failure. | The Collapse difference is detectable, but the broken run is correctly **REFUSED**. | `plant:225`; `j-oracle-record-mutations-3.py:134` |

The content reading still identifies distinct DOM representations as equal:

- **Comments:** `<div id="p">A<!--x-->B</div>` and `<div id="p">AB</div>` both record `[{text:"AB"}]`. Comments neither produce entries nor interrupt the accumulated text run (`tests/setupServer.ts:4898`).
- **Split text nodes:** adjacent text nodes `"A"` and `"B"` equal one `"AB"` node (`:4901`).
- **Whitespace normalization:** `" "` and `"  "` equal each other, as E28 requires. A whitespace-only run is **not discarded**: it becomes `" "` and differs from an absent run (`:4909`, `:4910`).

These witnesses expose normalization, but no demonstrated plugin-parity defect in the recorded scenarios depends on comment data or adjacent Text-node boundaries. The current Tooltip and Popover scenarios use ordinary text content (`tests/setupServer.ts:949`, `:990`). This confirms the specified text/element content model, not lossless DOM serialization.

No additional behavior defect outside the claims was established.

VERDICT: PASS
