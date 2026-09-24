# Portfolio verify verdict — the passive, forms, overlay, and utility families (2026-09-24)

The Orchestrator's ruling on the capture-portfolio verdict rounds that the B-PASSIVE, B-FORMS, B-MODAL, and
B-UTILITIES design verdicts name, and on the ring read that R7 of `units/pf-design-verdict.md` requires before
FOCUS-FRAME's dispatch. The portfolio is the one the batch-2 chain regenerated over `ec98064` (1268 frames, copied
to the session scratchpad `pv/frames`).

## Lanes

- One workflow per family over `units/pv-verify-workflow.js`, its slices from `units/pv-slices.py`
  (`units/pv-<family>-args.json`), each slice read blind by the fidelity, state, and variant lenses (`reviewer`
  on Opus 5.5, clean contexts), then a completeness critic (`reviewer` on Opus 5.5) that opened the frames each
  contradiction needed: passive `wf_622abc17-914`, forms `wf_1f2e781b-1e0`, overlays `wf_a70a7ba8-53a`,
  utilities `wf_0677e2fd-ada`. The ring lens alone over every focus frame: `wf_6de3605d-1ec`. Every return is
  retained as `units/pv-<family>-lenses.json`.
- Astra holds no lane in a capture-portfolio round: the subject is a rendered surface, and
  `.agents/orchestration.md` § Acceptance laws takes the capture as the evidence. The Orchestrator settled each
  cause the frames could not show by reading the built cascade (`dist/src/styles/index.css`) and the release
  stylesheet.

## Rulings

Each finding names one carrier. A finding the ledger records as a departure (`dropped`, `tokenized`, or a
documented Elements value) is a departure, not a defect, and is ruled so here.

| # | Finding | Ruling | Carrier |
| --- | --- | --- | --- |
| P1 | Every focus page frame loses the ring's left arm at the unguttered `x=0` edge, full-width controls lose both side arms, and small controls are hard to find in a 1280 × 800 page frame (ring read, every `*-focus` page frame). | Confirmed. The accepted V1 ruling of `b-collapse-verify-verdict.md` stands: each focus page frame becomes an element frame of its lifted specimen inside a padded wrapper, with the ring check bound to the placed region the way BCF's `nav-underline-focus` case reads it. | FOCUS-FRAME |
| P2 | In dark mode no focus indicator shows on the focused valid control, invalid control, skip link, and list-group action row, where the light twins show one. | Confirmed at frame resolution; cause unknown. Read each indicator's computed paint in dark against the release's, and fix the cascade where it departs. | FOCUS-FRAME |
| P3 | The checked `Column center` label loses its fill in the dark `vertical-group` frames only, and `Row copy` carries a stray hover face in `check-group-focus--dark-1280.png`. | Confirmed as capture-state defects (a driven scenario resetting the radio, a pointer left over a button). Probe each cause first. | FOCUS-FRAME |
| P4 | The `light` role's emphasis and border tiers are near-invisible in light mode and the `dark` role's in dark mode (`role-alerts`, `list-group-roles`, `text-emphasis`). | Confirmed from the built cascade: the derived mixes fail for roles whose base sits beside the surface or the text; the release special-cases both. | THEME (V13, `units/b-cross-ct-brief-2.md`) |
| P5 | The dark outline-secondary labels and borders, and `text-secondary` in dark, read about 2.3 to 1. | Confirmed; the dark secondary role. | THEME (V10) |
| P6 | Dark pressed and checked primary fills lighten; dark page-link and link hover dims. | Confirmed; the dark active tier and link hover direction. | THEME (V11, V12) |
| P7 | The dark primary is a light cyan carrying a white label at about 2.6 to 1 (buttons, `text-bg-primary`, the checked outline label at about 2.1 to 1); the dark `info` and `danger` text read about 3 to 1; the dark canvas is darker than the release's. | Recorded Elements palette departures whose contrast fails in dark. The palette is the user's APPEARANCE-RULING; the contrast failure is the reading it is ruled on. | E-ELEMENTS (APPEARANCE-RULING) |
| P8 | Body text, labels, button labels, and the floating label's base are 14 px beside 16 px control values; headings carry weight 600; paragraphs and headings carry no bottom margin; `fs-*` and `display-*` do not scale down at 390. | Recorded departures (the type scale, the heading weight, the `dropped` margin rows, the fixed heading scale). The 14 px label beside a 16 px value inside one control group is the reading the ruling weighs. | E-ELEMENTS (APPEARANCE-RULING) |
| P9 | `text-bg-info` and `text-bg-warning` keep the release's black label on Veneer's darker `info` and `warning` fills (about 3.6 and 4.2 to 1), while the buttons on the same fills carry white. | Confirmed defect: the label polarity must follow the fill Veneer ships, as the release's `color-contrast` rule does for its own. | UTIL-FRAMES |
| P10 | The range thumb's focus hairline is the dark body surface in dark mode; the release compiles `$body-bg` to white in both modes, and the ledger row calls the change `tokenized`. | Confirmed departure the ledger mislabels. Paint the hairline with the white palette entry and correct the row. | FORMS-FRAMES |
| P11 | At 1280 the carousel pictures are 800 px wide inside a 1280 px carousel, so the controls, caption, and indicators sit over the page surface; in light mode the resting previous chevron paints at hover strength, and the hover and focus frames match rest. | Confirmed: a specimen defect (the release's pictures carry `d-block w-100`) and a pointer residue in the resting frames. BCF's released pointer and padded lift cover the resting frames; recapture before ruling the residue again. | OVERLAY-FRAMES |
| P12 | The carousel proof's advancing case fails whenever any specimen is added (the incoming picture reads undefined after `scrollIntoView`; CLOSE-OUT's observation). | Confirmed proof defect. | OVERLAY-FRAMES |
| P13 | Dark frames of lifted specimens whose first row pulls up by a negative gutter show a white band at the top (`shadows`, `aligned-content`, `object-fit-values`, `line-heights`, the swatch ramps). | Capture artifact: the clip reaches above the document's first pixel. BCF's padded lift for resting frames removes it; the landing capture confirms. | BCF's landing capture, then OVERLAY-FRAMES or UTIL-FRAMES for any frame it leaves |
| P14 | Unframed developer-written passive states: the grow spinners (specimens exist), disabled buttons, every role's filled and outline hover and active face beyond primary, `btn-link` hover, focus, and active, the list-group role action and active states, and the `placeholder-lg` step in isolation. | Confirmed gaps against exit criterion 7. Engine-written transition states stay unframed under V7 of `b-collapse-verify-verdict.md`. | PASSIVE-FRAMES |
| P15 | Unframed developer-written form states: switch focus, pressed check and pressed thumb, the file button hover, the size steps of the file, textarea, color, and plaintext controls, an empty focused floating textarea, a disabled floating input and select, a focused button inside a group, a select and a floating label inside a group, validated select and check focus, a validated textarea and color control, inline-check feedback, and the `.was-validated :valid` branch. `:-moz-focusring` and autofill are outside Chromium's reach and are recorded, not framed. | Confirmed gaps. | FORMS-FRAMES |
| P16 | Unframed overlay states: the next carousel control's hover and focus, a roleless alert, and the popover header strip at a readable size. The modal and backdrop fade starts, the offcanvas and toast transition classes, the tooltip at rest, automatic placement, and the carousel's backward and crossfade transitions are engine-written or invisible states. | Confirmed gaps for the developer-written three; the rest dropped under V7. | OVERLAY-FRAMES |
| P17 | Unframed utility states: role-link hover and focus, `link-body-emphasis` hover, the link opacity, underline offset, underline color, and underline opacity specimens (which exist and have no scenario), the icon links at rest, hover, and focus, every `focus-ring-<role>` under focus, the default focus ring at rest, and `.visually-hidden-focusable` revealed by `:focus-within`. The `xxl` step, print media, and scrollbars are outside the journey's variants. | Confirmed gaps for the developer-written states; the variant limits recorded. | UTIL-FRAMES |
| P18 | § Showcase in the guide carries garbled fragments from mechanical merges (a repeated "Flex beside the flex utilities" clause, a repeated list clause, and a dangling Offcanvas run; CLOSE-OUT's observation). | Confirmed prose defect. | UTIL-FRAMES (it owns the § Showcase utility paragraph) |

## Units

| Unit | Role and engine | Owns | Depends on |
| --- | --- | --- | --- |
| FOCUS-FRAME (`ff`) | `opus` on Opus 5.5 | the focus placements in `tests/app/browser/integration.test.ts`, the registry rows they change, and the cascade fixes P2 finds | BCF's landing |
| FORMS-FRAMES (`fr`) | `opus` on Opus 5.5 | the forms specimens, registry rows, driven scenarios, and `_form-range.scss` | BCF's landing |
| PASSIVE-FRAMES (`fp`) | `opus` on Opus 5.5 | the passive specimens, registry rows, and driven scenarios | CLOSE-OUT's landing |
| OVERLAY-FRAMES (`fo`) | `opus` on Opus 5.5 | the overlay specimens, registry rows, driven scenarios, and the carousel proof | CLOSE-OUT's landing |
| UTIL-FRAMES (`fu`) | `opus` on Opus 5.5 | the utility specimens, registry rows, driven scenarios, `utilities/_color-bg.scss`, and § Showcase's utility paragraph | CLOSE-OUT's landing |

Each unit keeps its registry rows and driven cases in its own family's run of `tests/setup.ts` and
`tests/app/browser/integration.test.ts`, so the landings merge three-way. Each is audited by `analyst` on Astra and
the checker, and its frames are read at landing by the Orchestrator.
