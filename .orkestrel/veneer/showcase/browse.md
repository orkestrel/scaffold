# Browse status: the showcase session's browse lane

Informational, under the same handoff rule as `status.md` beside this file: the cloud session owns this work, is active on 2026-10-03, and has not handed it off. Start no unit here until the user says the handoff has happened. `../lanes.md` § Paths puts `browse` and the `@orkestrel/browser` roadmap in the showcase lane.

## Status

| Row | Value |
| --- | --- |
| Repository | `@orkestrel/browser`: branch `ccr-d15a48b1-yyyll6` at `655906b` (item 9) over `f11f821`; browser `main` at `f11f821` over `6f5544e` (`Release 0.0.21`, the 0.0.21 `gitHead`); every published release's `gitHead` sits on `main` |
| Registry | 0.0.21, published 2026-10-03 with the user's code, `BR1` included |
| Dependents to re-pin | none until 0.0.22: ollama (`f9cb40a`), veneer `main` (`43ca8a0`, `package.json:135`), and scaffold 0.0.88 (published 2026-10-03 from `a8dcfb8`; `package.json:109`, written into workspaces by `src/core/constants.ts:666`) carry `^0.0.21` |
| In flight | item 9 committed as `655906b` on the branch: all ten gates the design lists (`format:check`, `lint:check`, `check`, `test:src:core` 1196, `test:src:browser` 238, `test:src:server` 249, `test:src:bin` 5, `test:guides` 248, `test:policy` 119, `test:setup:browser` 21) plus `test:setup` 175 and `test:service` 102 exit 0 on the cloud host; its adversarial review has not run. Item 10 is designed, not started |
| Design of record | `browse/items-9-10-design.md`: the rulings for items 9 and 10, the Chromium 141 probe findings behind them, and the tests that fail without each feature |
| Next | review item 9 (fix in a separate commit), implement item 10 per the design, then items 11 and 12, then release 0.0.22 |

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

## Remaining units, in order

1. **Review item 9** (`655906b`): one adversarial reviewer over `git diff f11f821..655906b` in both placements, against `browse/items-9-10-design.md`; the commit message and the item 9 deviations (the tool-copy bound raised to 6050 characters, the deduplication in `extractOutlineRows`, two test phrases changed, the limit refusal naming its tool, and the corrected citations in items 10 to 12) are the writer's. Fix what it confirms in one commit, then read the gates bare.
2. **Item 10**, per the design's item 10 part: `pressed=`, `expanded=`, and `selected=` on the outline row in both placements and in the guide's row format, then review and gates, one commit.
3. **Items 11 and 12**, in that order, each designed, implemented, reviewed, and gated, one commit each.
4. Fast-forward browser `main` to the branch, release 0.0.22 with the user's code (`orkestrel-publish`: `wave.ts --visit`, then `window.ts --publish` from the primary clone, never a linked worktree, so the manifest carries `gitHead`), confirm on the registry, re-pin ollama on its branch and `main`, log the veneer re-pin in `../lanes.md` before editing `package.json`, and ask the engine session there to carry `^0.0.22` in its next scaffold release.
5. Items 6 and 7 in the release after that; item 8 waits for a run that reproduces it.
6. A browse recheck of the showcase on the released version.

## Resume after the handoff

- Read the branch's own `.orkestrel/plan.md` in the browser repository, which points here.
- When the handoff happens mid-unit, the cloud session pushes the browser branch with any lane state first and names it in § Status.
- Read every gate bare with npm 11.6.0 or later on `PATH`; npm 10 refuses the scripts with `EBADDEVENGINES`. `test:service` needs `npm run build` first.
- Run npm 11.6.0 or later; the browser tests start Chromium.
- Treat the cloud host's `/home/user/.wave/` and the `tmp/` folders of its checkouts as lost when its container is reclaimed; `browse/` beside this file holds the durable copies of the briefs and reports.
