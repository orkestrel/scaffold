# Browse status: the showcase session's browse lane

Informational, under the same handoff rule as `status.md` beside this file: the cloud session owns this work, is active on 2026-10-02, and has not handed it off. Start no unit here until the user says the handoff has happened. `../lanes.md` § Paths puts `browse` and the `@orkestrel/browser` roadmap in the showcase lane.

## Status

| Row | Value |
| --- | --- |
| Repository | `@orkestrel/browser`, branch `ccr-d15a48b1-yyyll6`; browser `main` fast-forwarded to `bff1abe` on 2026-10-02 at the owner's ruling, so the `Release 0.0.20` commit (`1b1b3aa`) is on `main`; the branch carries `BR1` (`360e27e`) and the plan update beyond it |
| Registry | 0.0.20 |
| Dependents to re-pin after a release | scaffold (`package.json` and its catalog row), ollama, and veneer, each at `^0.0.20` |
| In flight | `BR1`, committed as `360e27e` (brief `browse/br1-brief.md`, report `browse/br1-report.md`), in an adversarial review before it reaches `main`: the outline render fell from about 1,332 ms to about 10 ms per action on the showcase (25,043 accessibility nodes), a live click from 1,512 ms to 738 ms, and a replayed step from about 2 s to 13 to 85 ms |
| Next | release 0.0.21 after `BR1` lands; it needs the user's authenticator code |

## Readings

- The agent-facing recheck `B2` (2026-10-02, report `browse/b2-report.md`, brief `browse/b2-brief.md`) drove veneer's showcase at `fc4c4a2` through the `browse` tools only. Every family's door was reached, a 10-step dialog and panel journey replayed 10 of 10, and no page defect or engine departure was established. Items 6 and 7 were confirmed; item 8 did not reproduce.
- A 42-step replay took 83.17 s. Each click and press spent 1.5 to 2.6 s inside its action timer and each `wait` about 7 ms. The read-only lane `G3` (`browse/g3-replay-cost-distillate.md`) traced the cost to the receipt outline: `renderBrowserOutline` scans the whole node array for each text node's parent (`src/core/helpers.ts:175-177`), every `click`, `press`, and `look` renders it (about 62 KB on the showcase, cut to 4,000 characters), and a replayed step renders one that no reader consumes.

- After `BR1`, a replay runs at action speed: the saved `b2-disclosures` journey stopped at its step 10, where it pressed Enter twice on one accordion toggle with no wait between, and Bootstrap ignores a toggle during its 0.35 s transition. A journey whose step depends on a transition records a wait for it; item 12 lets that wait assert a disappearance. The remaining live cost is the accessibility tree fetch, about 0.5 to 0.6 s per action, which this lane leaves as it is.

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

1. `BR1`, in flight.
2. Release browser 0.0.21 with the `orkestrel-publish` skill (`/home/user/scaffold/.agents/skills/orkestrel-publish/`, scripts `wave.ts` and `window.ts`): the user supplies the authenticator code per window. Then re-pin scaffold, ollama, and veneer; a veneer re-pin edits `package.json`, a shared file, so log it in `../lanes.md` first, and run one release visit at a time.
3. Items 9, 10, 11, and 12, in that order, because each removes a wrong or missing reading an agent acts on; then 6 and 7; then 8 when a run reproduces it.
4. A browse recheck of the showcase on the released version.

## Resume after the handoff

- Read the branch's own `.orkestrel/plan.md` in the browser repository, which points here.
- When the handoff happens mid-unit, the cloud session pushes the browser branch with any lane state first and names it in § Status.
- Run npm 11.6.0 or later; the browser tests start Chromium.
- Treat the cloud host's `/home/user/.wave/` and the `tmp/` folders of its checkouts as lost when its container is reclaimed; `browse/` beside this file holds the durable copies of the briefs and reports.
