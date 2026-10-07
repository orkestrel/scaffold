# Readings E1 to E13 (verdict § Questions for the user › Readings) and the harness changes of U5.2 and U5.3

`readings.ts` (usage `node readings.ts OUT_DIR WIDTH THEME PAGE_HTML`) takes the thirteen readings under the Bootstrap face and the Tailwind + layer face, one fresh page per reading per face, and writes one entry per reading per face to `OUT_DIR/log.json` with a screenshot each. `capture-faces.ts` carries U5.3: the spinner grow animation is seeked to its 50% keyframe at playback rate 0 (Playwright 1.63's `animations: 'disabled'` cancels an infinite animation to its first frame unless its rate is 0), and the shell header is made static during the section loop. Both scripts run through the host queue only.

## First run: the page at `eac281e` (before the fix units), light-1280

Run `runs/readings-harness-eac281e-2`, exit 0 in 165.0 s, 26 entries, no failure, no page error (`eac281e-light-1280/log.json`; the PNGs stay in the session scratchpad). The first run, `readings-harness-eac281e`, exited 1 on E13 (`getByRole` skips the hidden Expand details button) and exposed two silent harness defects (the E7 settle check counted the section's six static tooltip previews; `getComputedStyle` with `::-webkit-slider-thumb` returns the input's own style, so the thumb's ring is read through the DevTools protocol).

| Reading | Bootstrap | Tailwind + layer | Verdict |
| --- | --- | --- | --- |
| E1 tables | hovered row `--bs-table-bg-state` rgba(0,0,0,0.075) as an inset shadow; the scroll region focuses with outline `auto 1px` | same | alike |
| E2 form controls on focus | 4 px ring rgba(13,110,253,0.25), border rgb(134,183,254); invalid ring rgba(220,53,69,0.25) | 4 px ring rgba(21,93,252,0.25), border rgb(138,174,254); invalid ring rgba(231,0,11,0.25); range thumb ring the same shape | geometry alike, mapped colors |
| E3 alerts | the alert leaves in 242 ms after the close click | 238 ms | alike |
| E4 carousel caption | the shipped `h4.h5` reads 20px 500; a bare `h5` swapped in reads 20px 500 8px | `h4.h5` the same; a bare `h5` reads 16px 400 0px | R6 caption (AS4) |
| E5 carousel sliding | next control and `data-bs-slide-to="2"` settle the same slide and indicator | same | alike |
| E6 toast | `toast fade show`, 350x85, 16 px from the corner | same box, 12 px from the corner (`p-3` step) | alike, scale step |
| E7 tooltips | Hint to the right covers Hint below at 1280; Escape does not settle it; a click elsewhere does; Hint below then opens `bottom` | same, panel 96.9 px wide against 107.3 | alike |
| E8 focus ring | 4 px ring at 0.25 alpha in each theme color | the same ring in each mapped color | alike, mapped colors |
| E9 icon link | `svg.bi` translates 4 px on hover and on focus | same | alike |
| E10 stretched link | `elementFromPoint` returns the link at all 16 corners | same; the media thumbnail spans 71 px against 60 (D16) | alike; D16 holds |
| E11 skip link | after Tab: static, underlined, rgb(13,110,253), 195x19 | rgb(21,93,252), 169x17 | alike, mapped |
| E12 scrollspy | Feedback active at load | Overlays after the switch; no active link after switching back; the only observer entry is `overlays` | D19 (a) and (b) reproduced; U5.1 (AS2) |
| E13 live-components | Expand details opens after reselecting Details; the Example menu opens `top-start` inside the dialog, covering its sentence; Show hint opens `top` | the menu opens `bottom-start`; the rest the same | alike except the menu's placement, which follows the dialog's geometry |

The E13 menu placement differs by face because the dialog's body is shorter under the layer (the bare paragraph's lost margin, U4.8) and the menu fits below the trigger; after U4.8 lands the reading is retaken. Coverage of this run is light-1280; the verdict asks for 390 on E1, E6, E8, E10, E11, and E12 and for light-390 and dark-1280 on E2, which the second run on the fixed page takes.
