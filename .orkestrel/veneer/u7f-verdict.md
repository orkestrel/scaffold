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

## Round 2, 2026-09-21

The regenerated portfolio: Veneer's 48 frames and artifacts from the Orchestrator's capture run
over the U7f-fix landing `060ce02` (`units/u7f-recapture.sh`, the capture run last so the
artifacts carry their frame paths), beside Elements' 28 frames and artifacts from the harness at
round 3 (`units/u7f-harness-3.mjs`). Brief: `units/u7f-verdict-brief-2.md`, the round-1 items
under their numbers.

| Lane | Role | Engine | Record | Terminal line |
| --- | --- | --- | --- | --- |
| subjective design fit | `reviewer` | native Opus 5, Workflow `wf_3ac564b2-16b` | `units/lane-u7f-2-reviewer.md` | `CONVERGED` |
| objective state truth | `analyst` | Astra, `codex exec` read-only with twenty-five frames attached, thread `01a0c2fd-f15c-7db1-9f22-7098bd0b147b`, exit 0 | `units/u7f-verdict-2-analyst.sh`, `units/lane-u7f-2-analyst.md` | `ANOTHER ROUND(4)` |
| mechanical inventory | `checker` | native Sonnet, the same Workflow | `units/lane-u7f-2-checker.md` | `ANOTHER ROUND(10)` |

### Reconciliation

| Item | Ruling |
| --- | --- |
| 1, 2, 3, 7, 8 | RENDERED-PROVEN by both judging lanes, no regression; Elements' dark rest frame now settled at the shared dark calibration |
| 4 focus | Veneer's ring proven (page frame plus one ring value on every specimen); the reviewer rules the two treatments the same design at different weights, the analyst reads Elements' padded ring frame as shot mid-transition (alpha `0.333519` at `2.22346px` against the declared 45% and `0.1875rem`), so the Elements ring value is NOT-EVIDENCED until the harness settles the `box-shadow` before the shot; carried to `units/u7f-harness-brief-4.md` and a narrow round 3 |
| 5 pressed | RENDERED-PROVEN by both: Veneer paints Bootstrap's active fill on the toggled host and announces it pressed; Elements' host announces pressed and keeps its base fill (a recorded departure, Elements' to carry); the reviewer's pixel referral on the `Toggle` step at page scale is answered by the analyst's decode |
| 6 hover and active | RENDERED-PROVEN by both: the two packages land on the same settled mixes to every recorded digit |
| 9 disabled | RENDERED-PROVEN by both: Elements' `0.5` dims harder and washes its own label; Veneer keeps Bootstrap's `0.65`, a recorded departure |
| 10 the tree | RENDERED-PROVEN by the analyst (Veneer's trees; Elements' `# States` snapshots supply comparable pressed and disabled announcements); the checker's NOT-EVIDENCED is the Elements `# Toggle` snapshot taken at rest, a harness record gap carried to `units/u7f-harness-brief-4.md`; a narrow round 3 reads the repaired artifact |
| 11 copy and inventory | RENDERED-PROVEN by the checker (the region name, the names in table order, `undeclared: []`, the filename law, 48 and 28 frames against the registries) |
| 12 the shell control | RENDERED-PROVEN by the reviewer (the same unfilled bordered control in both themes and at both viewports) and by the analyst's referral |

Recorded for the user as design questions, not defects: Veneer's latched `.active` fill equals
its momentary `:active` mix (Bootstrap's pairing), so a held and a latched button read alike; the
repaired control sits near the `Outline secondary` treatment; in dark the dimmed and the active
cyan sit close. Portfolio limits recorded, not required: no element-scale frame of a toggled host
on either side; no padded ring frame on the Veneer side (its ring is compared through declared
values and the readings). The brief's premise "the ring at 45% in both" was the Orchestrator's
wording; Elements' declared ring is read from its step log once settled.

### Terminal (round 2)

`ANOTHER ROUND(4, 10)`, both on the Elements harness record: `units/u7f-harness-brief-4.md`
(`builder`), then a narrow round 3 on items 4 and 10 against the repaired artifacts.
