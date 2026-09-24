# LABEL-CONTRAST design brief — how a fill picks its label and its state direction in each mode

## Role and engine

Two blind lanes on this one brief: the subjective lane, `planner` on Opus 5.5, and the objective lane, `analyst`
on GPT-6 Astra. Each performs the design directly and spawns nothing. Each is read-only.

## The question

Veneer retunes its role fills per mode but fixes the label each fill carries, and it mixes every variant's hover
and active tiers with one mode-wide mixer. The release does neither. Propose the mechanism that gives each fill,
in each mode, a label chosen by contrast against that fill and a hover and active direction that follows the
label, the way the release does, and that the button variants, the `text-bg-*` pairs, and any other site with the
same shape can share.

## Evidence (measured; read each site yourself)

- **The release.** `node_modules/bootstrap/scss/mixins/_buttons.scss` (`button-variant`) and
  `node_modules/bootstrap/scss/_buttons.scss` pick each variant's label with `color-contrast($background)` at
  compile time, and shade the hover and active fills when the label is light and tint them when it is dark.
  `node_modules/bootstrap/scss/helpers/_color-bg.scss` picks each `text-bg-*` label the same way. The release
  declares no button variable under a dark selector, so its dark buttons keep the light-mode fills and labels.
  THEME's probe lists the release's `--bs-btn-active-bg` per variant: primary, secondary, success, danger, and
  light darken; info, warning, and dark lighten (`units/b-cross-ct-report.md` § Deviations).
- **Veneer's buttons.** `src/styles/components/_button.scss`, in the `@each $role in tokens.$roles` loop, writes a
  white label for every role but `light`, and mixes hover and active with `var(--vn-state-mixer)` at
  `--vn-state-hover` and `--vn-state-active`. `src/styles/elements/_button.scss` uses the same mixer for the bare
  `button` and the bare `.btn` veil over a transparent ground.
- **Veneer's text-bg pairs.** `src/styles/utilities/_color-bg.scss` writes a black label for `info`, `warning`, and
  `light` and white for the rest, the release's choice against the release's own fills.
- **Veneer's tokens.** `src/styles/_tokens.scss` holds the role values per mode in the `$light` and `$dark` maps as
  literals (the dark `primary` is `oklch(0.7 0.15 233)`), and the `state-mixer` entry is near-black in light and
  white in dark. THEME (landing) moves the dark secondary to `var(--vn-gray-600)` and the `light` and `dark` tiers
  to gray steps.
- **The defects this must close** (`/home/user/scaffold/.orkestrel/veneer/b-portfolio-verify-verdict.md`):
  - V11 / P6: the dark pressed and checked primary lightens, where the release darkens it.
  - P7: the dark primary carries a white label at about 2.6 to 1 (buttons, `text-bg-primary`, and the checked
    outline label at about 2.1 to 1).
  - P9: `text-bg-info` and `text-bg-warning` carry black labels on Veneer's darker fills (about 3.6 and 4.2 to 1),
    while the buttons on the same fills carry white.
  - THEME's measurement: a black dark mixer would fix the filled variants and make the bare-button and ghost
    hover a near-invisible veil (contrast 1.028 hover, 1.050 active against rest), so the variant mixer and the
    bare-button veil must be two things.

## Constraints

- The palette values themselves are the user's APPEARANCE-RULING and stay as they are; this design decides only
  how a label and a state direction are chosen for a given fill.
- `src/core/**` belongs to the engine session (D43). A design that needs a new public token name there must say so
  and name the request; prefer one that does not.
- Every declaration the release writes keeps its ledger status; a change of value is a departure or a correction
  the ledger records.
- The mechanism is computed where it can be computed: the fills are literals per mode at compile time.
- One implementation, reused by every site; no second contrast rule.

## Output

The proposal in the shape your role file names: the mechanism (where the label is chosen, how the direction
follows it, where the bare-button veil keeps its own mixer); the sites it touches, by file and symbol; the tokens
or functions it adds, with names; the resolved label and direction per role and per mode, computed and shown; the
proofs that would redden on each defect above; the ledger rows it changes; the units that carry it, their owned
files, and their order against the frames units in flight (FOCUS-FRAME, FORMS-FRAMES, PASSIVE-FRAMES,
OVERLAY-FRAMES, UTIL-FRAMES); and the risks. State each value you rely on with the command that read it.
