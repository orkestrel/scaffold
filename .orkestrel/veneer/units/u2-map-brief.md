# Unit U2-map — Elements calibration specimen map

## Role and engine

`grok` on Cursor Grok 4.6, reached through the Cursor CLI in `--mode=ask`. You are the engine
reading this brief inside your own CLI: perform the assignment directly and spawn nothing. You are
read-only: edit nothing, run no build, and return evidence with `file:line` pointers, never raw file
dumps, decisions, or design.

## Question

For each specimen listed under § Specimens, where in Elements' built showcase does it render, how
is it reached, and which source partial and factory produce each of its states and motions?

## Context

Read these, at absolute paths:

- `C:/Users/mikes/WebstormProjects/elements/app/browser/` — the showcase application (router,
  pages, components). The built artifact `C:/Users/mikes/WebstormProjects/elements/dist/showcase/index.html`
  was built from this source at commit `3b41900` on 2026-09-20 (sha256
  `cdb622ef4100e17999e41cb546ab1b1b0b589334130ef87bd6a6df1ac091e792`); do not read the built
  file, read the source that produced it.
- `C:/Users/mikes/WebstormProjects/elements/src/styles/` — the partials: `_tokens.scss`,
  `_theme.scss`, `_mixins.scss`, `elements/_button.scss`, `elements/_dialog.scss`,
  `elements/_details.scss`, `elements/_summary.scss`, `elements/_h1-h6.scss`, `elements/_body.scss`,
  `surfaces/_popover.scss`, `surfaces/_backdrop.scss`, `surfaces/_focus.scss`, `composables/_aside.scss`,
  `components/_aside.scss`, `modifiers/_variants.scss`, `modifiers/_sizes.scss`, `modifiers/_styles.scss`,
  `modifiers/_states.scss`, `modifiers/_local.scss`.
- `C:/Users/mikes/WebstormProjects/elements/src/browser/factories/` — `createDialog.ts`,
  `createDetails.ts`, `createPopover.ts`, `createTooltip.ts`, `createAside.ts`, `createButton.ts`,
  `createTheme.ts`; and `C:/Users/mikes/WebstormProjects/elements/src/browser/helpers.ts` for
  `runTransition` and `hasTransitionDuration`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/motion.md` — the retained
  motion reading; verify its source pointers rather than repeating them.

## Specimens

Body copy; each heading level `h1` through `h6`; a bare `<button>`; `button.primary`;
`button.subtle`; `button.small`; `button.large`; a disabled button; a bare `<dialog>` opened modally;
a non-modal `<dialog>`; a `<details>` disclosure; a `[popover]` panel; a `[popover='hint']` tooltip;
an `aside[popover]` drawer.

## Evidence to return, per specimen

1. The showcase route (the hash or path the router serves) and the page source file that renders
   the specimen, with `file:line`.
2. A way to reach the specimen in the rendered page that a Playwright script can use: the
   accessible role and name of the control that opens or reveals it, or a stable selector when the
   specimen is passive. Quote the exact rendered text.
3. The partial and the rule that give the specimen its rest appearance, and the rules for each
   state it has — hover, focus-visible, active, disabled, open, closed — with `file:line`.
4. For each motion (dialog open and close, details open and close, popover open and close, drawer
   open and close): the transition or animation declaration, the properties it moves, its duration
   and easing tokens, the `@starting-style` block if any, the discrete-property handling
   (`display`, `overlay`, `content-visibility`), the reduced-motion rule if any, and the factory
   code that starts and completes it, each with `file:line`.
5. How the showcase switches light and dark (`data-mode`) and the theme core (`data-theme`): the
   control's accessible name and the source that writes the attribute, with `file:line`.
6. Any specimen the showcase does not render, named as unknown.

## Bound

Read only the paths above and the files they import. Stop when every specimen has its rows or is
named unknown. Return no more than what the next unit needs to write a Playwright instrument that
opens each specimen and reads its resolved styles per state.

## Output

Return only, in this order: `Question` (one line); `Evidence` (the per-specimen rows, `file:line`
on every claim); `Distillate` (the smallest table a Playwright instrument author needs: route,
reach, states, motion properties and timing tokens); `Unknowns` (every specimen or row not reached);
`Journal` (your session id); `Deviation` (anything that stopped you). No process diary.
