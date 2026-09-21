# U7f — the Button portfolio verdict (round 1)

## Subject

Veneer's shipped Button as it renders, judged by capture against Elements' specimens, per the
`orkestrel-polish-surface` skill (`C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-polish-surface/SKILL.md`
and its `references/capture-harness.md`). One portfolio, judged by three lanes blind to each
other, each returning the skill's fixed verdict shape. Fixes are not authorized in this round:
findings become carriers for a later unit or recorded departures.

## The portfolio (read every artifact before ruling)

Veneer, from the U7c capture run over Veneer `92aad70` on managed Chromium (a single source, the
journey suite's capture family):

- `C:/Users/mikes/WebstormProjects/veneer/tmp/capture/states/<state>--<variant>.png`, states
  `home`, `home-dark`, `button-primary-rest`, `button-primary-pressed`, `button-primary-focus`,
  `button-primary-hover`, `button-primary-active`, each with a `-dark` twin (the state under the
  dark theme), variants `light-1280`, `light-390`, `dark-1280`, `dark-390`. Rest, pressed, and
  focus are page frames of the whole section; hover and active are element frames of the
  `Primary` specimen's border box (73×36).
- `C:/Users/mikes/WebstormProjects/veneer/tmp/capture/<variant>.txt`: the accessibility tree of
  the mounted page (roles, names, `pressed` and `disabled` states), the tab order, one JSON line
  per journey step (`action`, `trigger`, `result`), the ring and contrast readings, and the
  console output (empty).

Elements, from the Orchestrator's spawned harness over Elements' built showcase at `3b41900`
(`#/button`), managed Chromium:

- `C:/Users/mikes/WebstormProjects/scaffold/tmp/capture/elements/elements-button-primary-<state>--<variant>.png`,
  the same states and variants where the page reaches them, and `<variant>.txt` with the
  variants section's ARIA snapshot, the step log, and the console messages.
- The harness report `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7f-harness-report.md`:
  no frame is absent; the `.txt` per variant is the Variants section's ARIA snapshot, the
  `<variant>-steps.jsonl` the step log, the `<variant>-console.json` the console output (empty);
  the pressed frames photograph the `useButton` toggle section (the host reads `On — click to
  turn off`, `active = true`), the focus frames the Variants section after a 51-press Tab walk,
  the hover and active frames the primary specimen's border box.

Numbers the lanes may cite (Veneer's readings from the journey artifacts; Elements' from the
scout, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/elements-button-scout-report.md`):
primary fill light `oklch(48% 0.255 264)` and dark `oklch(70% 0.15 233)` in both packages; white
text on the primary fill in both; the focus ring as the primary fill at 45% in `oklab` in both,
reading 2.2797 (light) and 2.3587 (dark) against Veneer's canvas; hover and active mixes toward
the strong text colour at 12% and 22% (Veneer) against 88% and 78% retained fill (Elements),
which are complements; disabled dimming `opacity: 0.65` (Veneer, Bootstrap's value) against
`0.5` (Elements).

## Items (rule on every one, in this numbering, with the fixed shape)

1. Rest, light, 1280: every specimen of Veneer's table renders with its variant fill, text, and
   border; the primary specimen matches Elements' primary at rest in fill and text colour.
2. Rest, dark, 1280: the same under the dark theme; the primary fill is the dark calibration in
   both packages.
3. Rest at 390 (light and dark): the grid wraps without clipping or overlap, and every specimen
   stays whole.
4. Focus, light and dark: the `Primary` specimen carries a visible ring after a keyboard walk,
   the ring is the same treatment on every variant (Veneer's readings), and it matches
   Elements' ring treatment (fill at 45%).
5. Pressed, light and dark: the `Toggle` host reads pressed (the active fill, `aria-pressed`
   true in the tree) and returns to rest after the second activation; Elements' `#button-toggle`
   reads the same.
6. Hover and active, light and dark: the element frames show the hover and the active mixes,
   each darker than rest in light mode and lighter in dark mode, in the same direction as
   Elements'.
7. The two near-invisible outline variants: `Outline light` on the light canvas (1.05:1) and
   `Outline dark` on the dark canvas (1.15:1). Rule whether each is a defect of the calibration
   or a faithful rendering of Bootstrap's own pairing that Elements does not carry (Elements has
   no light or dark role); name which.
8. Contrast under the bar: every `btn-primary` host in dark mode reads 2.59:1 (white on the dark
   primary), the same calibration as Elements'. Rule whether the portfolio shows the text as
   legible at both viewports and whether this is a shared calibration property or a Veneer
   defect.
9. Disabled dimming: `Blocked` and `Disabled` at `opacity: 0.65` against Elements' `0.5`. Rule
   design fit: which reads as disabled more clearly, and whether the difference is a departure
   to record.
10. The accessibility tree: every specimen announces its name; `Selected` and `Pressed` announce
    `pressed`; `Blocked` and `Disabled` announce `disabled`; `Anchor` and `Disabled` (anchor
    hosts) announce as buttons through `role`; the tab order skips the disabled hosts. Compare
    with Elements' ARIA snapshot.
11. Copy and inventory: the region name `Buttons`, the section copy sentence, the specimen names
    as the table declares them, the `btn-*` classes in the DOM against the table (from the
    journey artifacts and the retained specimen table in `units/u7c-report.md`).
12. The shell: the `Dark mode` control renders as a plain button outside the cascade's `.btn`
    treatment. Rule whether that is a shell design choice to keep or a portfolio defect.

## Lanes

- **Subjective design fit** — `reviewer` on native Opus 5: items 1 to 9 and 12 as design fit
  against Elements (the calibration source) and Bootstrap's own pairing; the feel the surface
  presents. Reads every frame.
- **Objective state truth** — `analyst` on Astra (the frames attached as images to the exec,
  the `.txt` artifacts read from disk): items 1 to 10; whether each frame shows the state its
  name and the step log claim, whether the readings and the ARIA snapshots agree with the
  frames, whether any frame is a harness artefact rather than the surface.
- **Mechanical inventory** — `checker` on native Sonnet: items 10 and 11; copy, classes, names,
  ARIA attributes, the filename law, the frame count against the registry.

## Output (every lane)

One line per item in the numbering: `RENDERED-PROVEN(<capture>)`, `REGRESSED(<capture>, <what>)`,
or `NOT-EVIDENCED(<what the portfolio lacks>)`, each with one sentence of evidence naming the
frame or artifact; referrals to another lane with the evidence and no verdict; exactly one final
line, `CONVERGED` or `ANOTHER ROUND(<item list>)`. No process diary. Report no wording,
comment, or guide-prose finding: the user has ruled that audits cover implementation, and this
round judges the rendering.
