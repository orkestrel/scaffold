# Elements motion

Use Elements' authored motion as calibration material. Native HTML supplies open state, top-layer
placement, and disclosure behavior; Elements supplies the durations, easing, transforms, fades,
and reduced-motion rules. Adapt those treatments into Veneer's explicit component classes.

## Read the mechanism that the component consumes

Resolve source paths in this table against `elements/src` in the neighboring checkout.

| Owner                | Source                                                                                                                                                                                                                                                                                              | Mechanism and adoption constraint                                                                                                                                                                                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Motion tokens        | [`styles/_tokens.scss`](../../../../elements/src/styles/_tokens.scss), [`styles/_mixins.scss`](../../../../elements/src/styles/_mixins.scss)                                                                                                                                                        | Read the feedback duration `150ms`, panel duration `250ms`, easing `cubic-bezier(0.32, 0.72, 0, 1)`, and in-flow slide distance `0.5rem`. The transition mixin disables transitions under reduced motion. Adopt values through Veneer's canonical tokens after calibration.                     |
| Dialog               | [`styles/elements/_dialog.scss`](../../../../elements/src/styles/elements/_dialog.scss), [`browser/factories/createDialog.ts`](../../../../elements/src/browser/factories/createDialog.ts)                                                                                                          | Read scale `0.96`, opacity, `@starting-style`, discrete `display`/`overlay`, native show/close, and completion coordination. Check inline and modal exit positioning independently; source comments disagree about the inline close jump.                                                       |
| Popover and tooltip  | [`styles/surfaces/_popover.scss`](../../../../elements/src/styles/surfaces/_popover.scss), [`browser/factories/createPopover.ts`](../../../../elements/src/browser/factories/createPopover.ts), [`browser/factories/createTooltip.ts`](../../../../elements/src/browser/factories/createTooltip.ts) | Read scale `0.98`, opacity, anchor positioning, starting styles, and conditional transition waits. These surfaces use the `150ms` popover duration; do not assign the panel duration indiscriminately.                                                                                          |
| Drawer and backdrop  | [`styles/elements/_aside.scss`](../../../../elements/src/styles/elements/_aside.scss), [`styles/surfaces/_backdrop.scss`](../../../../elements/src/styles/surfaces/_backdrop.scss), [`browser/factories/createAside.ts`](../../../../elements/src/browser/factories/createAside.ts)                 | Read edge translation and the backdrop fade on the bare pseudo-element. Retain paint during exit. The drawer deliberately starts native hide without a pre-hide transition wait.                                                                                                                |
| Disclosure           | [`styles/elements/_details.scss`](../../../../elements/src/styles/elements/_details.scss), [`styles/elements/_html.scss`](../../../../elements/src/styles/elements/_html.scss), [`browser/factories/createDetails.ts`](../../../../elements/src/browser/factories/createDetails.ts)                 | Read `::details-content`, `block-size: 0` to `auto`, `interpolate-size`, opacity, and discrete content visibility. The factory coordinates state; CSS interpolates height. The pseudo-element's bare transition lacks the reduced-motion mixin. Repair that behavior in Veneer.                 |
| Button               | [`styles/elements/_button.scss`](../../../../elements/src/styles/elements/_button.scss), [`styles/_mixins.scss`](../../../../elements/src/styles/_mixins.scss)                                                                                                                                      | Read color, border, shadow, opacity, and the explicit `.reveal` treatment. Prove hover, focus, press, leave, and reduced motion through trusted input.                                                                                                                                          |
| Carousel and loops   | [`styles/composables/_carousel.scss`](../../../../elements/src/styles/composables/_carousel.scss), [`browser/factories/createCarousel.ts`](../../../../elements/src/browser/factories/createCarousel.ts)                                                                                            | Read class-driven slide orchestration and cleanup; its duration is `0.6s`. Inspect Spinner, Skeleton, and Dot separately when their units start; a finite-animation wait cannot prove a repeating animation.                                                                                    |
| Lifecycle completion | [`browser/helpers.ts`](../../../../elements/src/browser/helpers.ts), [`browser/constants.ts`](../../../../elements/src/browser/constants.ts)                                                                                                                                                        | Inspect `runTransition` and `hasTransitionDuration`. The helper accepts the next host transition end and has a `400ms` fallback. Prove the intended final property, cancellation, zero duration, reduced motion, reversal, and destruction; do not copy that fallback as a completion contract. |

Read [Elements' motion-token guide](../../../../elements/guides/tokens.md) for intended treatments.
Treat its claims as hypotheses where the implementation or browser disagrees. Keep Vue and
`@vue/reactivity` out of Veneer's shipped engine; authored CSS motion does not require them.

## Browser observation

Treat this receipt as an observation of the bundled showcase, not acceptance of current Elements
source or Veneer. Grok identified the runnable artifact; root verified its existence and observed
it with Scaffold's installed Playwright and Edge `153.0.4234.32` at `1100 × 800` CSS pixels.
Elements had no `node_modules` directory at the reading, so no current-source build ran.

| Artifact             | Identity                                                                             |
| -------------------- | ------------------------------------------------------------------------------------ |
| File                 | [`elements/demo/showcase.html`](../../../../elements/demo/showcase.html)             |
| Embedded build stamp | `2026-05-29T17:02:49.237Z`                                                           |
| SHA-256              | `7732383da0569a470996167ded9159d012c232210519b8f5b2ea8743bfca9807`                   |
| Host run             | `node observe-motion.mjs`, exit `0`, elapsed `7.851s`; temporary research instrument |

To repeat the observation, open `#/details` and `#/dialog-element` on that artifact. Click the
summary named “What is the framework's modifier cascade?” and the buttons “Open modal” and “OK”.
Record resolved properties once per animation frame across entry and exit. Emulate each media
preference before the action and confirm it with `matchMedia`. Repeat the disclosure with its
stylesheets disabled as a control for authored motion.

| Subject                         | Observed entry and exit                                                                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Disclosure, ordinary motion     | Pseudo-element block size moved between `0px` and `85.7812px`; opacity included intermediate values between `0` and `1`; declared duration was `0.25s`. |
| Disclosure, reduced motion      | The media query matched, but the same duration and intermediate opacity remained. Do not inherit this behavior.                                         |
| Dialog, ordinary motion         | Opacity included intermediate values on entry and exit; running transitions were observed. Panel transition entries declared `0.25s`.                   |
| Dialog, reduced motion          | Duration resolved to `0s`; no intermediate opacity or running animation was sampled.                                                                    |
| Disclosure, stylesheet disabled | Duration resolved to `0s`; no intermediate opacity or running animation was sampled. The native disclosure remained operable.                           |

Do not use `getAnimations()` alone as the disclosure proof. In the reduced-motion run it reported
no animation on the observed subtree while `::details-content` opacity still interpolated.
Observe the promised pseudo-element property and visible effect directly. These readings do not
establish visual fidelity, cancellation safety, timing tolerances, current-source behavior, or a
Chrome support claim.

## Apply the platform evidence

- Use [`@starting-style`, discrete transitions, and `overlay`](https://developer.chrome.com/blog/entry-exit-animations)
  to investigate entry and retained top-layer exit paint. Verify selectors in the selected browsers;
  do not copy Elements' browser-workaround comments as established defects.
- Use [`::details-content`](https://developer.chrome.com/blog/styling-details) with
  [intrinsic-size interpolation](https://developer.chrome.com/docs/css-ui/animate-to-height-auto)
  where the actual host supports it. Bootstrap `.collapse` hosts still require their own compatible path.
- Record each component's motion properties, duration, easing, distance, reduced-motion result,
  completion event, and interruption policy in its contract. Compare Elements and Veneer under
  the same content, viewport, state, theme, and media preference.
- Capture motion frames separately from settled-state captures. Prove entry, exit, interrupted
  input, cancellation, focus, hit targets, and resource release in the consuming component.
  Keep native hosts and Bootstrap-compatible hosts in that component's proof scope.
