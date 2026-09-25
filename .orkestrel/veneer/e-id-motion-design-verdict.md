# E-ID-MOTION design verdict (2026-09-25)

The Orchestrator's reconciliation of the E-ID-MOTION design round on one brief (`units/e-id-motion-design-brief.md`),
over the terrain `units/e-id-motion-terrain-result.md` (Cursor Grok 4.7, session
`46c0d370-1c15-4b6b-84b4-dc37cf71ea17`). The subjective lane was `planner` on Opus 5.5
(`units/e-id-motion-design-planner-proposal.md`); the objective lane was `analyst` on GPT-6 Astra
(`units/e-id-motion-design-analyst-proposal.md`; journal `tmp/codex/e-id-motion-design-analyst.jsonl`, thread
`01a0d6a1-4c7f-7721-8d58-84d96feb4eb4`). They ran blind to each other.

## The ruling

Veneer's panels and floating surfaces move on Elements' motion contract; Bootstrap's classes, markup, and state-class
sequence stay the contract, and the engine keeps its reflow, class writes, and settlement on the element's actual
animations. Every value below reads a `--vn-*` token scaled by `--vn-factor-motion`, goes through the `transition`
mixin (so reduced motion resolves it to none), and lands as a departure or addition row.

| Surface | Ruling | Lanes |
| --- | --- | --- |
| Collapse panel (`.collapsing`, vertical and horizontal) | `height` (and `width`) over `--vn-motion-panel` on `--vn-ease-panel`; no opacity, because `.collapsing` does not tell opening from closing; no root `interpolate-size` (E27 keeps the size mechanism in the engine, J-COLLAPSE-SIZE) | both |
| Accordion chevron | Elements' marker timing: `transform` over `--vn-motion-feedback` on `--vn-ease-standard`; Bootstrap's `rotate(-180deg)` stays, because Veneer keeps its glyph; the button's own transition stays Bootstrap's | objective; Elements' marker transitions over the `150ms` alias with the default `ease` (`/home/user/elements/src/styles/elements/_summary.scss`, the `rotate` transition) |
| Modal dialog | `scale(0.96)` to `none` in place of `translate(0, -50px)` (a `declared` departure), over `--vn-motion-panel` on `--vn-ease-panel`; `.modal-static`'s `scale(1.02)` stays on the same timing | both |
| Modal host fade and both backdrops | `opacity` over `--vn-motion-panel` on `--vn-ease-out`; the backdrops through the one `overlay-backdrop` mixin the modal and offcanvas share (D46); opacity `0` to `0.5`, no blur | both |
| Offcanvas panel | `transform` over `--vn-motion-panel` on `--vn-ease-panel` and `opacity` over `--vn-motion-panel` on `--vn-ease-out`; Bootstrap's `±100%` travel stays; opacity `0` on the hidden and `.hiding` states and `1` on `.showing` and `.show:not(.hiding)`; a responsive panel inside its in-flow range keeps full opacity | both |
| Carousel slide | `transform` over the added `--vn-motion-slide` token (`calc(600ms * var(--vn-factor-motion))`) on `--vn-ease-panel`; Bootstrap's `±100%` travel stays; the fade variant's opacity over `--vn-motion-slide` on `--vn-ease-out` (Veneer's own, because Elements has no fade variant), and the outgoing slide's `0s` opacity change delayed by `--vn-motion-slide` | both; the token name is the subjective lane's, because `--vn-motion-feedback` and `--vn-motion-panel` name a kind of motion, not a component |
| Carousel controls and indicators | `opacity` over `--vn-motion-feedback` on `--vn-ease-out`; Bootstrap's opacity endpoints and fixed indicator size stay | both |
| `.fade` (alert, toast, tooltip, popover, tab pane, modal) | `opacity` over `--vn-motion-feedback` on `--vn-ease-out` in place of `linear` | both |
| Tooltip and popover entry | Elements' scale-in on each component's `.fade` compound: `scale(0.98)` to `none`, `transform` over `--vn-motion-feedback` on `--vn-ease-standard` (Elements' popover transition names no timing function, so `ease`) | both on the geometry; the easing is the objective lane's |
| Toast entry | The same scale-in, after the carrying unit reads the Toast engine's class sequence; if the transparent state class marks both directions, the unit states the geometry per direction from that sequence, or keeps the toast opacity-only and records why | subjective, with the objective lane's risk carried as a condition |
| Dropdown | Kept immediate. An entry motion would run after the engine's synchronous `shown`, against J-CASCADE's rule that a completed event follows the shipped motion; the departure from Elements' menu scale-in is recorded, and the engine session is asked whether `Dropdown` can settle on an entry animation, after which a styles unit adds the entry | objective, with the subjective lane's `@starting-style` entry recorded as the follow-up |
| Reduced motion | `.placeholder-glow` and `.placeholder-wave` take `animation: none`; the border and grow spinners take `animation: none`, and the grow spinner renders at opacity `1` with no scale, keeping its accessible text; the progress stripes keep their `animation: none` | objective; `.claude/rules/styles.md` requires `@include reduced-motion { animation: none }` for every animation, which settles the subjective lane's tension |

No token is renamed or retired. `--vn-motion-panel`, `--vn-ease-panel`, and `--vn-ease-out` gain their first readers,
and `--vn-motion-slide` is added. Scales and travel stay component declarations.

## Proof

Each unit drives the real change (an engine call or the class write the engine makes) and reads the rendered motion:
`getAnimations()` on the moving element gives the property, the duration equal to the resolved token, and the easing;
seeking `currentTime` to `0` and to the midpoint reads the computed transform, opacity, or size; a motion factor of `0`
and of `2` scales the duration; the reduced-motion preference leaves no animation. The helper `sampleTransition`
lands in `tests/setupStyles.ts` with its first consumer (E-ID-MOTION-FADE). A plant that restores Bootstrap's literal
reddens each proof. The Chromium 141 reading is this host's; the engine session's chain reads Chromium 153 at its
landing.

## Units

`opus` on Opus 5.5 for every unit, native, because every style proof launches Chromium, which a bench sandbox's child
cannot (`.agents/orchestration.md` § Bench laws, rule 5); each audited by `analyst` on Astra and `reviewer` on Opus 5.5.
Each unit owns its partials, their style tests, and the guide's departure, addition, token, and prose rows for its
component; `tests/setupStyles.ts` and `src/styles/_mixins.scss` are shared, report-only for every unit but the one
named.

1. **E-ID-MOTION-FADE** — `_fade.scss` and every style pin that reads the fade's `linear`; owns `sampleTransition` in
   `tests/setupStyles.ts`.
2. **E-ID-MOTION-REDUCED** — `_placeholder.scss`, `_spinner.scss`, and their tests; runs beside FADE.
3. **E-ID-MOTION-COLLAPSE** — `_collapse.scss`, `_accordion.scss`, and their tests; after FADE.
4. **E-ID-MOTION-MODAL** — `_modal.scss` and the `overlay-backdrop` mixin in `_mixins.scss`; after FADE.
5. **E-ID-MOTION-CAROUSEL** — `_carousel.scss`, `--vn-motion-slide` in `_tokens.scss`, and the token proofs; after FADE.
6. **E-ID-MOTION-FLOAT** — `_tooltip.scss`, `_popover.scss`, `_toast.scss`, and their tests; after FADE.
7. **E-ID-MOTION-OFFCANVAS** — `_offcanvas.scss` and its test; after MODAL, whose backdrop mixin it reads.
8. **E-ID-MOTION-FACTOR** — every transition that keeps a Bootstrap literal (the floating label, the progress bar,
   nav, pagination, the navbar toggler, the accordion button) scales by `--vn-factor-motion`, keeping the release's
   value at a factor of `1`, each recorded as a departure; § Factors states the reach. Added by the X-TENETS-STYLES
   verdict (F-MOTION-SCOPE); after FADE.

Units 3 to 6 run in parallel worktrees on disjoint partials and land serially; each landing merges the guide by table
row.

## Pending shared changes for the engine session

The engine session owns `tests/src/browser/**`. Its proofs pin today's literals (terrain § 5, "Browser pins"), so
before the first motion unit lands, the engine session is asked to make each of them read the resolved token and the
settled animation rather than a literal: `Collapse.test.ts`, `Modal.test.ts`, `Offcanvas.test.ts`, `Backdrop.test.ts`,
`Carousel.test.ts`, `Alert.test.ts`, `Tab.test.ts`, `Tooltip.test.ts`, `Popover.test.ts`, and `Toast.test.ts`, and the
Modal proof awaiting both the host's opacity and the dialog's transform. Two findings go with the request: the Toast
proof permits an animation still running at `shown` (the objective lane's reading of `tests/src/browser/Toast.test.ts`
around the `shown` case), and the dropdown entry needs the engine to settle on an entry animation.

## Risks

- A modal or toast completion that fires before its longer motion settles; each unit reads the event against the
  settled animation.
- A transformed tooltip or popover measured mid-scale by `Placement`; FLOAT reads the arrow position during the entry.
- The carousel's 600ms stiff tail; its capture is ruled through the polish skill.
- A responsive offcanvas leaking opacity into its in-flow state; OFFCANVAS reads each breakpoint's boundary.

## Exit

Every surface in the ruling table moves as ruled on the shipped cascade, read in the browser, with its departure or
addition row; every engine proof reads the resolved motion; exit criterion 8's motion rulings are recorded.
