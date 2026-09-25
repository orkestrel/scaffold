# E-ID-MOTION design round — brief

One brief for both lanes of the design round, run blind to each other: the subjective lane on `planner` (Opus 5.5)
and the objective lane on `analyst` (GPT-6 Astra). Each lane performs the assignment directly, spawns nothing, edits
nothing, and returns a proposal. The Orchestrator reconciles.

## Law

Read, in order: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,names,documentation,quality}.md`;
Veneer's `ROADMAP.md` § Tenets, § Rulings, and § Exit criterion, read at `/home/user/veneer-probe/ROADMAP.md`. No skill
applies.

## The ruling this round serves

The user ruled (recorded as the engine session's E26, `/home/user/scaffold/.orkestrel/veneer/engine/decisions.md`,
2026-09-24) that the motion values of the collapse, modal, offcanvas, and carousel transitions are cascade the styles
session owns and carries. `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` § D48 opens E-ID-MOTION.
The tenet: "Make Elements the visual and interaction reference. Preserve the look and feel that the user values in
Elements, including its interaction animations. … Bootstrap compatibility must not replace this visual identity with an
unexamined stock Bootstrap appearance." Exit criterion 8: "the appearance and motion rulings land as recorded
departures". The roadmap's rulings say "Take Elements' spacing scale, container widths, and motion tokens from rendered
specimens when the identity phase opens" and keep Bootstrap's markup and class contract as a drop-in.

## Terrain

The terrain is `/home/user/scaffold/.orkestrel/veneer/units/e-id-motion-terrain-result.md` (Cursor Grok 4.7, session
`46c0d370-1c15-4b6b-84b4-dc37cf71ea17`); it wins over any restatement here, and a lane that finds it wrong says so
with the file and line. Its findings, in short: Veneer's collapse, modal, offcanvas, and carousel transitions copy
Bootstrap 5.3.8's literals; `--vn-motion-panel` (`250ms` times the motion factor), `--vn-ease-panel`
(`cubic-bezier(0.32, 0.72, 0, 1)`), and `--vn-ease-out` are declared and read by no rule; Elements runs the same
interactions on a `250ms` stiff-decelerate curve with opacity on `ease-out`, a `scale(0.96)` dialog entry, a
`scale(0.98)` popover entry at `150ms`, and `@starting-style` with `allow-discrete`. Veneer's engine settles every
change on the element's actual animations (`settleAnimations` over `getAnimations()`, `src/browser/helpers.ts`), and
the engine session's browser proofs pin today's durations (terrain § 5, "Browser pins"). Sources: Veneer at
`/home/user/veneer-probe` (`main` at `0865c67`, `src/styles/**`, `tests/src/styles/**`, `guides/veneer.md`), Bootstrap
5.3.8 at `/home/user/veneer-probe/node_modules/bootstrap/`, Elements at `/home/user/elements`.

Standing conditions:

- The engine session owns `src/browser/**`, `tests/src/browser/**`, and the guide's `## Engine` sections; a change there
  goes to it as a named pending shared change (`/home/user/veneer-probe/ROADMAP.md` § Protocol › § The engine session).
- The engine session's J-COLLAPSE-SIZE will move `Collapse` from the measured pixel height to `calc-size()` after
  both hosts read green (D47 in `decisions-round-2.md`); the cascade's `.collapsing` rule is this session's.
- Bootstrap's class names, markup, and the `.show`, `.showing`, `.hiding`, `.collapsing`, and `.fade` state classes stay
  the contract; the engine writes those classes.
- The Tailwind profiles (`guides/veneer.md` § Styles › § Tailwind) and the reduced-motion twin the `transition` mixin
  writes stay binding.

## Question

Propose the motion Veneer ships for each of these, and the units that land it:

1. The collapse panel (`.collapsing`, vertical and horizontal) and the accordion's panel and chevron.
2. The modal dialog's entry and exit, and the modal backdrop.
3. The offcanvas panel's entry and exit, and its backdrop.
4. The carousel slide, its fade variant, its controls, and its indicators.
5. The `.fade` family (alert, toast, tooltip, popover, tab pane) and the dropdown menu, which ships no entry motion.
6. Reduced motion for every animation the cascade ships (the terrain names the placeholder glow and wave as having no
   reduced-motion twin, and the spinner as slowing rather than stopping).

For each, rule: Bootstrap's value kept, Elements' taken, or a value of Veneer's own; the geometry (translate, scale,
opacity) as well as the duration and easing; which `--vn-*` token each reads, and whether any token is added,
renamed, or retired; the departure rows `guides/veneer.md` records; the style proofs that change and the rendered
proof that shows the motion (the browser decides, not a declaration read); and each engine proof the change reaches,
named as a pending shared change for the engine session. Say where Elements' mechanism (`@starting-style`,
`allow-discrete`, `interpolate-size`) cannot apply to Bootstrap's class-driven markup, and what Veneer does instead.

## Output

A proposal under 1500 words: the rulings per item with citations; the token changes; the units (name, role and
engine, owned files, acceptance criteria, order), sized so each unit closes one component's motion; the pending shared
changes for the engine session; the risks. State no count.
