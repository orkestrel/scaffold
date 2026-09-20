# Unit U2-distill — the calibration readings as a foundation-value table

## Role and engine

`grok` on Cursor Grok 4.6, reached through the Cursor CLI in `--mode=ask`. You are the engine
reading this brief inside your own CLI: perform the assignment directly and spawn nothing. You are
read-only: edit nothing, run nothing, and return evidence, never raw dumps, decisions, or design.

## Question

From the calibration readings of Elements' showcase on managed Chromium and on Edge, what are the
resolved foundation values per specimen, state, and mode, where do the two browsers differ, how
does each motion behave frame by frame, and which readings are missing?

## Context

Read these, at absolute paths, and nothing else:

- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration/chromium/calibration.json`
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration/msedge/calibration.json`
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration.mjs` — the
  instrument, for the `SPECIMENS`, `STATES`, `PROPERTIES`, and `MOTIONS` constants and the sampling
  method; verify a reading's meaning against the code that took it.

Each JSON holds `browser`, `version`, `date`, `showcaseDigest`, `specimens` (keyed by specimen id,
then `light` and `dark`, then state, each `{ style, rect }`), `motions` (keyed by motion id, then
`ordinary` and `reduced`, each with `frames[]` sampled once per animation frame for 700 ms with
`elapsedMs` and the sampled properties, plus the settled frame and the `getAnimations()` count),
and `unknowns` (every reading the instrument could not take, with the context and reason).

## Evidence to return

1. **Foundation table.** Per specimen and mode, the `rest` values of `font-family` (first family
   only), `font-size`, `line-height`, `font-weight`, the four paddings, `border-top-width`,
   `border-top-left-radius`, `color`, `background-color`, `border-top-color`, `box-shadow`,
   `outline`, and the `rect` width and height, from Chromium; beside each value, `same` when Edge
   reads the identical string, else Edge's value.
2. **State deltas.** Per interactive specimen and mode, which of the properties change from `rest`
   to `hover`, to `focus-visible`, and to `active`, with the changed values (Chromium, and Edge
   where it differs). Name a state whose readings equal `rest` as `no change`.
3. **Transitions.** Per specimen, the `transition-property`, `transition-duration`, and
   `transition-timing-function` strings at rest, deduplicated across specimens that share them.
4. **Motion table.** Per motion and per `ordinary` and `reduced`: the first frame's values, the
   settled frame's values, the elapsed milliseconds at which each sampled property last changed,
   the `getAnimations()` count, and for the details motion the `::details-content` `block-size`
   and `opacity` course, for the dialog and drawer motions the `::backdrop` course; Chromium and
   Edge side by side. Name a motion whose frames never change as `no motion observed`.
5. **Unknowns.** Every entry of both `unknowns` arrays, grouped by specimen and reason, with the
   count per group and one verbatim message per group.
6. **Browser identity.** The `version` and `date` of each file and the `showcaseDigest`.

## Bound

Read only the three files. Stop when every specimen, state, and motion has its rows. Return the
smallest table set from which a token contract can be written; never propose a token.

## Output

Return only, in this order: `Question` (one line); `Evidence` (the six sections above, as Markdown
tables, values verbatim from the JSON); `Distillate` (the foundation table alone, one row per
specimen and mode, Chromium values with Edge differences marked); `Unknowns` (section 5 again in
one line per group); `Journal` (your session id); `Deviation` (anything that stopped you). No
process diary.
