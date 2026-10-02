The showcase is operable through browse 0.0.20, chiefly through contents links and keyboard input. The requested dialog/panel journey replayed unchanged: **10 of 10 steps completed**. Browse cannot fully report control states, expose later element references, or distinguish visible text through `read`.

Run: Linux, 2026-10-02, commit `fc4c4a2`, served at `http://localhost:4790/browser.html`. No tracked files changed; no commits made.

`T[n]` refers to the numbered call in the [full transcript](/home/user/.wave/veneer-wt-sc/tmp/codex/b2/transcript.txt). The [transcript index](/home/user/.wave/veneer-wt-sc/tmp/codex/b2/index.txt) condenses the receipts.

| Check | Result and transcript excerpt |
|---|---|
| B1 arrival | Banner, buttons, status, and contents reported. T2: `# Veneer`, `Bootstrap 5.3.8 on Veneer CSS`, four named header buttons, `Bootstrap only, light color mode`. **Pressed states omitted.** |
| B2 Tailwind on | T3: `Clicked e3 button "Bootstrap with Tailwind"`; status: `Bootstrap with Tailwind, light color mode`. |
| B2 Tailwind off | T6: `Clicked e2 button "Bootstrap only"`; status: `Bootstrap only, light color mode`. |
| B3 dark | T8: `Clicked e5 button "Dark"`; status: `Bootstrap only, dark color mode`. |
| B3 light | T10: `Clicked e4 button "Light"`; status: `Bootstrap only, light color mode`. |
| B4 Layout → Containers | T14: `Clicked e6 link "Containers"`, URL `#containers`; replay capture shows **Containers**. |
| B4 Content → Typography | T16: `Clicked e10 link "Typography"`, URL `#typography`; capture shows **Typography**. |
| B4 Forms → Form controls | T18: `Clicked e14 link "Form controls"`, URL `#form-controls`; capture shows **Form controls**. |
| B4 Components → Accordion | T20: `Clicked e22 link "Accordion"`, URL `#accordion`; capture shows **Accordion**. |
| B4 Helpers → Clearfix | T22: `Clicked e45 link "Clearfix"`, URL `#clearfix`; capture shows **Clearfix**. |
| B4 Utilities → Background | T24: `Clicked e57 link "Background"`, URL `#background`; capture shows **Background**. |
| B4 Engine states | T26: `Clicked e75 link "Engine-set states"`; capture shows **Engine-set states**. |
| B4 Interactions | T28: `Clicked e76 link "Live components"`; capture shows **Live components**. |
| B4 Bootstrap with Tailwind | T30: `Clicked e77 link "Tailwind on Bootstrap markup"`; capture shows that heading. |
| B4 recorded replay | T35: `Replayed b2-contents: 9 of 9 steps.` All landing headings were read from browse’s replay captures; `look` continued returning the document’s opening text. |
| B4 smooth-scroll comparison | Recording with intervening `look` calls and replay without them both succeeded. T246–248 also succeeded with `wait("Accordion")` between clicks. No hit-test failure occurred, so recovery from that failure was not established. |
| B5 button toggle | Both Enter presses reached **Toggle selection**; T178 replay completed 15/15 steps, including both presses. Captures retained. **The tool view never exposed `aria-pressed`, so the announced state remains unverified.** |
| B5 alert | T242: `"This is an example notice." is on the page.` After dismissal, T244: `did not appear within 1 s.` |
| B5 collapse | T62: `"need a signature at the gate." did not appear within 1 s.` Reopening produced T64: `is on the page.` |
| B5 accordion | T68: `"Orders placed before 2 p.m." did not appear within 1 s.` Reopening produced T70: `is on the page.` |
| B5 tabs with arrow keys | ArrowRight produced T181: `"Tab selection keeps the panel and its accessible state together." is on the page.` After ArrowLeft, T184 reported absence. **Selected-state attributes omitted.** |
| B5 dropdown and item | Enter opened the nested menu: T197 `"Close menu" is on the page.` Tab/Enter selected its item; T200 reported absence. |
| B5 tooltip | Focus produced T83: `"Tooltip on top" is on the page.` Moving focus produced T85: `did not appear within 1 s.` |
| B5 popover | T217: `"Click this button again to close the example." is on the page.` Second activation produced T220: `did not appear within 1 s.` |
| B5 toast | T173: `"The notification stays until you dismiss it." is on the page.` Dismissal produced T176: `did not appear within 1 s.` Replay captures show both states. |
| B5 carousel next and indicator | Next produced T100: `"Valley route" is on the page.` First indicator produced T106: `"Upland route" is on the page.` Replay captures corroborate both. |
| B5 offcanvas and Escape | T53: `"Shipment filters" is on the page.` Escape closed it; B6 replay captures show the panel open and closed. |
| B5 modal and Escape | T47: `"Archive the harbor project?" is on the page.` Escape closed it; B6 captures confirm closure and restored trigger focus. |
| B5 static-dialog refusal | T75 and T77 both report `"Save your changes?" is on the page`, before and after Escape. Its button closed it; T80 reported absence. |
| B5 dialog’s nested menu | Menu entry and item exit succeeded as recorded above. After selecting the item, the first Escape did not close the dialog, T202. Following Tab activity, T211–212 closed it successfully. |
| B5 navbar toggler | T89 and T91: `Pressed Enter.` The disclosures replay’s `s27.png` shows links and search; `s28.png` shows them collapsed. `look` omitted both states. |
| B5 scrollspy | T234: `Replayed b2-scrollspy: 9 of 9 steps.` Captures show **Motion** active with the lower content, then **Feedback** active with the notice. |
| B5 `type` access | **Blocked by reference discovery.** T276 requested the Tracking number input, but returned header references and `[characters 0–4000 of 62448; the rest was cut…]`. No valid textbox reference was supplied; no reference was guessed. |
| B6 saved journey | T55: `Saved b2-dialog-panel with 10 steps.` T57: `Replayed b2-dialog-panel: 10 of 10 steps.` Saved and replayed without edits. |

Presence timeouts establish bounded absence observations; they are not native disappearance assertions.

No page defect or departure from Bootstrap behavior was established. The nested-menu Escape observation belongs to the **veneer engine session** if investigated further: T197–212 preserves it. Veneer’s modal listens for Escape on the modal element at [Modal.ts:54](/home/user/.wave/veneer-wt-sc/src/browser/Modal.ts:54), matching [Bootstrap modal.js:206](/home/user/.wave/veneer-wt-sc/node_modules/bootstrap/js/src/modal.js:206). Bootstrap’s item dismissal also hides the menu without restoring toggle focus through [dropdown.js:390](/home/user/.wave/veneer-wt-sc/node_modules/bootstrap/js/src/dropdown.js:390). This evidence does not establish a parity defect.

The existing browser roadmap findings have these outcomes:

| Item | Finding and evidence |
|---|---|
| **6 — viewport** | **Confirmed.** Tool discovery exposes no viewport control; every replay PNG measures **780 × 493**. The CLI reads no viewport at [main.ts:6](/home/user/browser/src/bin/main.ts:6), and server options omit it at [types.ts:368](/home/user/browser/src/server/types.ts:368). |
| **7 — exploratory screenshot** | **Confirmed.** The discovered tools contain no screenshot operation. PNGs were obtained through replay only, consistent with [BrowserReplay.ts:343](/home/user/browser/src/core/BrowserReplay.ts:343). |
| **8 — smooth-scroll hit test** | **Not reproduced; this run neither confirms nor disproves the underlying defect.** T35 completed 9/9 consecutive contents clicks without intervening observations. Clicks with `look` and with `wait` also succeeded. No `No node found at given location` excerpt exists in this transcript. |

The following are proposed **browser-owned** `ROADMAP.md` items; none were written to the roadmap:

- **9.** Let an agent discover actionable elements beyond a truncated outline. `look` ignores `what` at `/home/user/browser/src/core/BrowserToolset.ts:683`, has no continuation parameter at `/home/user/browser/src/core/constants.ts:517`, and cuts the outline at 4,000 characters. Its suggested `read` continuation supplies text without actionable references. Add outline pagination or scoped discovery, preserving references and reporting the focused element. Veneer B2, 2026-10-02: T37 requested the archive button but returned the opening outline; T276 could not obtain the Tracking number reference. Keyboard traversal reached controls that reference-based `click` and `type` could not discover.

- **10.** Report control states in the agent-facing outline. `/home/user/browser/src/core/helpers.ts:185` renders values, checked, and disabled states but omits pressed, expanded, selected, and current states. Include their explicit values, including false, so an agent can compare selected controls and siblings. Veneer B2: T2/T4 omitted every header pressed state; T169 omitted toggle state; T182 omitted tab selection. Status text and screenshots could corroborate behavior but could not verify those attributes.

- **11.** Distinguish rendered text from hidden document content in `read`. `/home/user/browser/src/core/compilers.ts:419` captures `outerHTML`; `/home/user/browser/src/core/BrowserReading.ts:64` converts that document to Markdown without resolved visibility. Add a rendered-text reading and clearly label any document-content alternative. Veneer B2: T270 returned the dismissed notification and hidden Notes content; T272–273 reported both absent. T257 returned **Shipment filters**, and T254 returned **Valley route**; T274–275 reported both absent. Header status requests also returned distilled body content rather than the requested sentence.

- **12.** Let `wait` assert disappearance and retain that assertion in journeys. `/home/user/browser/src/core/constants.ts:605` advertises appearance only; `/home/user/browser/src/core/BrowserToolset.ts:1017` implements that contract, and `/home/user/browser/src/core/recorders/BrowserRecorder.ts:124` omits timed-out actions. Add an explicit absence condition through the wait and recording contracts. Veneer B2: T176 observed notification disappearance through a timeout, but the saved feedback journey retained the dismissing Enter without that disappearance check. The same limitation affected collapse, accordion, tooltip, tab, and popover exits.

The scratch client’s 60-second timeout interrupted receipt delivery for the additional disclosures replay, T109. Its saved run nevertheless completed **42/42 steps in 83.17 seconds**. Calls T110–158 include rejected follow-up attempts while that replay remained active; they are not successful component evidence. This was a driver timeout limitation.

Artifacts remain under `tmp/`:

| Artifact | Path |
|---|---|
| Driver | [driver.ts](/home/user/.wave/veneer-wt-sc/tmp/codex/b2/driver.ts) |
| Tool discovery | [tools.json](/home/user/.wave/veneer-wt-sc/tmp/codex/b2/tools.json) |
| Transcript and index | [transcript.txt](/home/user/.wave/veneer-wt-sc/tmp/codex/b2/transcript.txt), [index.txt](/home/user/.wave/veneer-wt-sc/tmp/codex/b2/index.txt) |
| Run results and capture references | [runs.json](/home/user/.wave/veneer-wt-sc/tmp/codex/b2/runs.json) |
| Contents journey | [b2-contents/journey.json](/home/user/.wave/veneer-wt-sc/tmp/browsers/b2/b2-contents/journey.json) |
| Required dialog/panel journey | [b2-dialog-panel/journey.json](/home/user/.wave/veneer-wt-sc/tmp/browsers/b2/b2-dialog-panel/journey.json) |
| Additional journeys | [b2-disclosures](/home/user/.wave/veneer-wt-sc/tmp/browsers/b2/b2-disclosures/journey.json), [b2-feedback](/home/user/.wave/veneer-wt-sc/tmp/browsers/b2/b2-feedback/journey.json), [b2-scrollspy](/home/user/.wave/veneer-wt-sc/tmp/browsers/b2/b2-scrollspy/journey.json) |
| Cleanup evidence | [cleanup.json](/home/user/.wave/veneer-wt-sc/tmp/codex/b2/cleanup.json) |

Browse disconnected cleanly and removed its profile. Preview had already exited with code 143 when polled; port-based cleanup found no listener on 4790. Final `git status --porcelain` output is empty.