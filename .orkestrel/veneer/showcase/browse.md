# Browse status: the showcase session's browse lane

The cloud session handed this lane to the engine session on 2026-10-03 (`status.md`). `../lanes.md` § Paths puts `browse` and the `@orkestrel/browser` roadmap in the showcase lane.

## Status

| Row | Value |
| --- | --- |
| Repository | `@orkestrel/browser`: branch `ccr-d15a48b1-yyyll6` at `73c608f` (pushed 2026-10-03) over `f11f821`, carrying `655906b` (item 9), `ce66ba3` (host-independent browser brand), `327a67e` (Windows portability), `0a80b99` (item 9 review fixes), and `73c608f` (item 10); browser `main` at `f11f821` over `6f5544e` (`Release 0.0.21`, the 0.0.21 `gitHead`); every published release's `gitHead` sits on `main` |
| Registry | 0.0.21, published 2026-10-03 with the user's code, `BR1` included |
| Dependents to re-pin | none until 0.0.22: ollama (`f9cb40a`), veneer `main` (`43ca8a0`, `package.json:135`), and scaffold 0.0.88 (published 2026-10-03 from `a8dcfb8`; `package.json:109`, written into workspaces by `src/core/constants.ts:666`) carry `^0.0.21` |
| Owner | the engine session since 2026-10-03, the only session, working the branch in the worktree `browser-wt-browse`; the cloud session's item 10 work never reached the remote |
| Landed | item 9 reviewed (13 findings confirmed, F1 to F12 repaired in `0a80b99`, F13 ruled); item 10 in `73c608f`, on the selection rule amended at `browse/items-9-10-design.md:25` and `:216`; on this Windows host (Edge 154.0.4258.53) every gate exits 0 after `73c608f`: `format:check`, `lint:check`, `check`, `test:src:core` 1,201, `test:src:browser` 289 (1 skipped), `test:src:server` 249 (9 skipped), `test:src:bin` 4 (1 skipped), `test:guides` 248, `test:policy` 119 (1 skipped), `test:setup` 176 (4 skipped), `test:setup:browser` 21, `build`, `test:service` 105 |
| In flight | item 11's re-design for the floor's text-bearing elements (§ Item 11 probe readings and stop), its second run stopped with partial edits in the worktree; the item 10 and `327a67e` reviews returned FAIL (§ Review findings to fix), repaired in one unit after item 11's commit |
| Design of record | `browse/items-9-10-design.md` for items 9 and 10; the critiqued designs for items 11 and 12 in the worktree's `tmp/browse-item-11-design.md` and `tmp/browse-item-12-design.md` |
| Next | item 11, then the review fixes, then item 12 on the rulings in § Item 12 rulings, then release 0.0.22 |

## Readings

- The agent-facing recheck `B2` (2026-10-02, report `browse/b2-report.md`, brief `browse/b2-brief.md`) drove veneer's showcase at `fc4c4a2` through the `browse` tools only. Every family's door was reached, a 10-step dialog and panel journey replayed 10 of 10, and no page defect or engine departure was established. Items 6 and 7 were confirmed; item 8 did not reproduce.
- A 42-step replay took 83.17 s. Each click and press spent 1.5 to 2.6 s inside its action timer and each `wait` about 7 ms. The read-only lane `G3` (`browse/g3-replay-cost-distillate.md`) traced the cost to the receipt outline: `renderBrowserOutline` scanned the whole node array for each text node's parent (`src/core/helpers.ts:175-177` at `360e27e^`, the 0.0.20 tree), every `click`, `press`, and `look` renders it (about 62 KB on the showcase, cut to 4,000 characters), and a replayed step renders one that no reader consumes.
- `BR1` indexes the outline's parents once (`src/core/helpers.ts`), which took the outline render from about 950 to 1,360 ms to about 10 ms per action (`browse/br1-report.md`). Its first commit also skipped the receipt capture for a replayed step; an adversarial review refuted that (the capture is also the step's dialog window and its pace, so a recorded click and dialog replayed to a refusal and a journey recorded at the live pace ran back to back), and `97fd5f7` restored it. On the showcase the 42-step replay completes 42 of 42 in 29.99 s against 65.49 s, each step 542 ms on average; a live `look`, `click`, and `press` take about 600 ms against about 1,500 ms. The remaining cost is the accessibility tree fetch, which this lane leaves as it is.

## Open roadmap items

Browser `ROADMAP.md` on the branch holds items 6 to 12, each with its citations and the run behind it:

- 6: a viewport for the `browse` server's pages.
- 7: a screenshot in an exploratory session.
- 8: a settled scroll before a click's hit test (observed in the first browse run, not reproduced in `B2`).
- 9: `look` reaching the elements past its cut view and the 150-row cap.
- 10: pressed, expanded, and selected states in the outline.
- 11: `read` returning the rendered text only.
- 12: `wait` asserting disappearance, kept in a journey.

## Review findings to fix

Two Opus reviews on 2026-10-03, read-only over the committed diffs; the fix unit repairs each item with a test that fails before it, in one commit after item 11.

- **Item 10 (`73c608f`), FAIL 1 and 3.**
  - The parity fixture holds no unannotated native select and no invalid `aria-pressed` token, so deleting the native-option fallback (`src/browser/helpers.ts:735-736`) or the invalid-token mapping survives the DOM-to-CDP comparison. Add both to `SERVICE_TOGGLE_HTML` (`tests/setupService.ts:291-292`) with their CDP rows (`tests/service/document.test.ts:261-282`), plus `aria-expanded` set to `mixed` and to an invalid token, whose Edge 154 reading is unmeasured; follow what CDP reports.
  - `renderBrowserOutlineRow`'s remarks (`src/core/helpers.ts:155-158`) give the row order without `pressed=`, `expanded=`, and `selected=`; state the order the guide gives.
  - `ROADMAP.md:7` cites `BrowserDOMElementManager.ts:161-164`; the absence wait sits at `:163-166`.
  - The guide's lone-tab sentence (`guides/browser.md:2891`) has no committed CDP assertion; add a service case for a `tab` outside a `tablist`.
  - Ruled referrals: name the `summary` disclosure triangle (`expanded=` in CDP, no DOM row) and the lone `treeitem` (CDP `generic`, DOM `treeitem`) as declared differences in the row format; write the added guide sentence with negative contractions, per `.claude/rules/writing.md` § Voice.
- **Windows portability (`327a67e`), FAIL 1, 3, and 4.**
  - The lock release (`src/server/stores/FileBrowserStore.ts:397-403`) throws `BROWSER_JOURNEY_ACCESS` from `finally` when another writer's lock directory appears after its own `rmdir` reports `ENOENT`, which replaces a committed write's result on every host. On `ENOENT`, return when the path is absent or a directory, and throw only when a non-directory occupies it; add the interleaving test.
  - Gate the rename classification on `EISDIR` or `EPERM`, as its comment states.
  - Skips: split the file-link skip in `FileBrowserRunStore.test.ts:256-259` so the paging and fault cases run on every host; gate the `chmod` skip on the measured mode (`suite.ts:487`, `:512-517`); make the link probe's test fail when the probe returns a reason without trying `symlink` (`setupServer.test.ts:180-188`); give the timer skip (`setup.test.ts:139-142`) a measured capability or remove it, per `.claude/rules/tests.md`.
  - OS claims: `tests/setupServer.ts:857` ("on both hosts"), `tests/setupService.ts:359`, and `FileBrowserStore.test.ts:42` claim more than a run measured; the guide's limit 26 (`guides/browser.md:3143`) is stale, because `test:service` launched Edge 154 on this host.
  - Outside the claims: replace `linkBrowserFixture` with `@orkestrel/test`'s `createLink` and `supportsFileLinks`; give the WebMCP proof an oracle independent of `BrowserRegistry` and use `BROWSER_REGISTRY_ABSENT_CODE`; correct the `mute` TSDoc (`tests/setupServer.ts:749-750`) and delete the probe-result comment at `:856-857`.

## Item 12 rulings

The item 12 design referred these to the Orchestrator and the subjective lane; each is ruled here (2026-10-03).

- Ruling 5's wake on `transitionend` and `animationend` covers every wait in both engines, gated on P1 as the design states.
- Rename `BrowserElementWaitOptions` to `BrowserWaitOptions`, with no shim, and update every consumer in the same commit. The capability survives under the wider name, so the symbol-removal law does not apply.
- One receipt serves "never there" and "left": `"TEXT" is not on the page.`; the miss reads `"TEXT" is still on the page after N s.`
- The listing word is `, absent`, the argument's own name.
- Vocabulary bound: shorten the copy first. When the trimmed copy still exceeds 6050 characters, raise the bound to the smallest multiple of 50 that holds the measured length, record both lengths, and set the guide's figure to the new bound.

## Remaining units, in order

1. **Items 11 and 12**, in that order, each implemented on its design, reviewed, and gated, one commit each.
2. Fast-forward browser `main` to the branch, release 0.0.22 with the user's code (`orkestrel-publish`: `wave.ts --visit`, then `window.ts --publish` from the primary clone, never a linked worktree, so the manifest carries `gitHead`), confirm on the registry, re-pin ollama on its branch and `main`, log the veneer re-pin in `../lanes.md` before editing `package.json`, and ask the engine session there to carry `^0.0.22` in its next scaffold release.
3. Items 6 and 7 in the release after that; item 8 waits for a run that reproduces it.
4. A browse recheck of the showcase on the released version.

## Resume after the handoff

- Read the branch's own `.orkestrel/plan.md` in the browser repository, which points here.
- When the handoff happens mid-unit, the cloud session pushes the browser branch with any lane state first and names it in § Status.
- Read every gate bare with npm 11.6.0 or later on `PATH`; npm 10 refuses the scripts with `EBADDEVENGINES`. `test:service` needs `npm run build` first.
- Run npm 11.6.0 or later; the browser tests start Chromium.
- Treat the cloud host's `/home/user/.wave/` and the `tmp/` folders of its checkouts as lost when its container is reclaimed; `browse/` beside this file holds the durable copies of the briefs and reports.

## Item 11 probe readings and stop (2026-10-03)

The U1/U2 run stopped under its product-defect deviation contract before capture implementation. The corrected design requires option text in the Markdown/innerText oracle, but the documented HTML and Markdown safety floors discard select and option subtrees. On the minimal select fixture, innerText includes "Option label kept" while both markdown() and markdown({ distill: false }) return only "Visible prose control". A paragraph control retains the option phrase. The isolated required DOM oracle fails: 1 failed, 198 skipped, exit 1. Changing the safety floor, rewriting select to prose in the capture, or exempting this phrase from the oracle needs a design ruling. No item 11 commit was made; the worktree remains at 73c608f with empty porcelain status after unfinished edits were removed.

- System Edge/Chromium: 154.0.4258.53. Playwright Chromium: 153.0.8010.12.
- P1 agrees in the main and isolated worlds: closed details body, content-visibility:hidden, offscreen auto, until-found, canvas/video/audio/iframe fallback, and textarea contents are absent from body.innerText; the summary, open-details body, visible twin, and option label are present. Option display is block; audio without controls is none; the other tested elements are block, inline, or inline-block. Ruling 5 retains auto despite this divergence.
- P2 agrees in both worlds: inert import emits 0 requests and constructor count stays 1→1 (main), 3→3 (isolated). Detached clone controls emit 2 media requests each and increment count 1→2 and 3→4. The P2 stop condition did not fire.
- P3 agrees in both worlds: only "Slotted shown" reaches innerText. Hidden-slot content, unassigned element/text, and shadow-root-owned text do not. Shown and hidden slotted elements compute inline; the unassigned element computes an empty display string.
- B0, five page.read() runs against veneer's existing showcase/browser.html, milliseconds: 386.6187, 316.6214, 330.8159, 311.8977, 322.6014. Median 322.6014; range 311.8977–386.6187; spread 74.7210. B1 was not run because implementation stopped.
- The wait rows' "visible" wording remains an open observation for item 12; no roadmap wording was changed.

Evidence remains in browser-wt-browse/tmp/codex/browse-11-report.md, read-rendered-readings.json, read-rendered-B0.json, browse-11-probe.test.ts, and browse-11-stopped.patch. The probe was removed from tmp/probes; promotion and feature-removal mutations were not completed.

**Withdrawn the same day, and its run stopped.** The installed floor removes far more than `select` and `option`: `UNSAFE_ELEMENTS` (`@orkestrel/html`) also lists `form`, `dialog`, `button`, `input`, `textarea`, `svg`, and `math`, whose rendered text a person sees, beside `script`, `style`, `template`, `iframe`, `object`, `embed`, `applet`, `frame`, `frameset`, `noscript`, `meta`, `link`, and `base`, which carry no rendered prose. `read` returns that Markdown (`src/core/BrowserToolset.ts:766`), so before item 11 it already omitted every form's content, every `<dialog>`, and every button label. Item 11 is re-designed to carry the rendered text of the first group through the browser's own inert capture, leaving the floor in `@orkestrel/html` unchanged. The withdrawn ruling follows for the record.

**Ruling (the Orchestrator, 2026-10-03, withdrawn).** Item 11 governs the capture, never the projection. The HTML and Markdown safety floors (`@orkestrel/html` `UNSAFE_ELEMENTS`, `guides/markdown.md:544`) stay as they are, and the capture keeps `select` and `option` markup as it renders. The two-way oracle `markdown.includes(X) === innerText.includes(X)` covers text outside the elements the installed `UNSAFE_ELEMENTS` list names. For text inside them, the tests assert that the captured HTML keeps the rendered element and its text, and that the Markdown omits it under the documented floor, with that list read from the installed package so a change to the floor reddens the test.
