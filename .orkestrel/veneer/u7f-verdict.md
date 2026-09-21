# U7f — the Button portfolio verdict

Subject: Veneer's shipped Button as it renders, judged by capture against Elements' specimens
per the `orkestrel-polish-surface` skill. Brief: `units/u7f-verdict-brief.md` (twelve items).
Portfolio: Veneer's 48 frames and four per-variant artifacts from the U7c capture run over
`92aad70` (preflighted by the Orchestrator: non-blank frames, non-empty accessibility trees,
step logs, empty console logs); Elements' twenty frames and artifacts from the spawned harness
`units/u7f-harness.mjs` over the built showcase at `3b41900` (`units/u7f-harness-report.md`;
preflighted the same way). The Elements side exists because the Grok scout
(`units/elements-button-scout-report.md`) found no capture harness there.

## Round 1, 2026-09-21

Three lanes, blind to each other, on one portfolio; no fix authorized in the round.

| Lane | Role | Engine | Record | Terminal line |
| --- | --- | --- | --- | --- |
| subjective design fit | `reviewer` | native Opus 5, Workflow `wf_ee0dcf62-153` | `units/lane-u7f-reviewer.md` | `ANOTHER ROUND(4, 5, 9, 12)` |
| objective state truth | `analyst` | Astra, `codex exec` read-only with twenty frames attached, thread `01a0c2b2-74c4-7f13-a7b4-fd9d425b9d4e`, exit 0 | `units/u7f-verdict-analyst.sh`, `units/lane-u7f-analyst.md` | `ANOTHER ROUND(2,4,5,6,8,9)` |
| mechanical inventory | `checker` | native Sonnet, the same Workflow | `units/lane-u7f-checker.md` | `CONVERGED` (item 11 proven; item 10 not evidenced on the Elements side) |

### Reconciliation

| Item | Ruling | Carrier |
| --- | --- | --- |
| 1 rest light | RENDERED-PROVEN by both judging lanes; the primary fill and ink match Elements' | — |
| 2 rest dark | Veneer's half proven; Elements' `rest--dark-1280` frame is a mid-transition capture (RGB(0,132,236) against the settled RGB(0,172,236) both packages paint) | harness brief 2, gap 2 |
| 3 rest at 390 | RENDERED-PROVEN by both | — |
| 4 focus | Veneer's half proven (the halo on `Primary`, one ring value on every specimen); Elements' focus frames show no visible ring after a walk the step log confirms reached the specimen | harness brief 2, gap 1 (a padded element frame while focus is held, with the `box-shadow` reading) |
| 5 pressed | The reviewer's claim that Veneer's pressed frame equals its rest frame is REFUTED on the bytes (`5bbb72ab…` against `b1963d0f…`) and on the journey's order (the frame is placed after `pressed=true` and before the restoring click); the analyst reads Veneer's active fill in the frame. Not evidenced on both sides: the accessibility snapshot at the pressed moment (Veneer's tree is taken at arrival; Elements' snapshot covers the Variants section), and Elements' pressed host keeps its base fill while announcing `On` | Veneer fix (the tree at the pressed moment appended to the artifact); harness brief 3 (the toggle host's state and computed fill at the pressed moment) |
| 6 hover and active | The directions are proven on both sides; the settled mixes are not: Veneer's hover element frame paints RGB(8,64,230) against the journal's settled RGB(7,58,208), so the element capture shoots inside the 0.15s transition although the journey waited for animations and read the settled colour before placing (a Test-side `captureFrame` behaviour, recorded in `units/u7c-report.md` § Findings carried out of scope); Elements' active frames differ from the logged endpoints the same way | Veneer fix (hover and active frames shot under staged reduced motion so the frame shows the settled mix, the pointer-paint readings kept under motion); harness brief 3 (the same settle before the hover and active shots) |
| 7 the outline pair | RENDERED-PROVEN by both: faithful Bootstrap pairing, each role a ghost on its own canvas and legible on the other; Elements carries neither role; the only fault is the showcase printing both roles on one canvas at a time | recorded for the user's design question (calibration), no fix |
| 8 dark contrast | The white labels are legible at both viewports (both lanes); the blanket "2.59:1 for every dark primary host" was the brief's wording, refuted by the artifacts (`Selected` and `Pressed` read about 2.16:1 in dark; a disabled host's opacity is outside the composition); a shared calibration property with Elements, not a Veneer defect | recorded for the user's design question, no fix |
| 9 disabled dimming | Not evidenced on the Elements side: no Elements frame carries a disabled specimen | harness brief 2, gap 3 (the States section frame and snapshot) |
| 10 the tree | Veneer's half proven by the checker and the analyst (names, `pressed`, `disabled`, anchor roles, the tab order skipping disabled hosts); Elements' snapshot has no comparable pressed or disabled host | harness brief 2, gap 3 |
| 11 copy and inventory | RENDERED-PROVEN by the checker (region name, copy sentence, the specimen names in table order, `undeclared: []`, the filename law, 48 and 20 frames against the registries) | — |
| 12 the shell control | REGRESSED (reviewer): the `Dark mode` control's affordance inverts with the theme (bare text in light, a rounded panel in dark); keeping it outside `.btn` is right, the execution is the defect | Veneer fix (one minimal affordance identical in both themes) |

Referrals ruled: the reviewer's reading that the variant suffix does not carry the theme is
half right and recorded, not a defect — `home--dark-1280` is the dark frame (`34fd816e…`, the
arrival applies the variant's theme), while every `button-*` state applies its own theme
explicitly, so the `dark-*` variant's button frames duplicate the `light-*` variant's and the
per-variant journals repeat from the step log onward; the registry names the theme in the
state for those frames. Reviewer carriers recorded for the user's design question: in dark the
dimmed `Blocked`/`Disabled` cyan and the active `Selected`/`Pressed` cyan sit close; the dark
hover step is barely perceptible in both packages.

### Terminal (round 1)

`ANOTHER ROUND(2, 4, 5, 6, 9, 10, 12)`. Carriers: `units/u7f-harness-brief-2.md` (gaps 1 to 3,
dispatched to `builder`), `units/u7f-harness-brief-3.md` (the settle before the hover and active
shots, the toggle host's state at the pressed moment), `units/u7f-fix-brief.md` (`opus`, Veneer:
the shell affordance, the hover and active frames under staged reduced motion, the tree at the
pressed moment), then a recapture of both sides and round 2 on the new portfolio.
