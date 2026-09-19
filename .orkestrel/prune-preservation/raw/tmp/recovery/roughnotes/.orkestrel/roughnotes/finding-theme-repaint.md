# UNCONFIRMED — the masthead may not repaint on a live theme toggle

**Status: not established. Do not act on this as a product defect until it is reproduced in an
independent engine.** The only instrument used so far is the in-app browser pane, and that
instrument has since been shown to be unreliable for exactly this measurement.

## What was observed

Against the running dev server at `http://localhost:5179/` in the in-app browser pane, from a clean
reload with the light flag persisted:

| Reading            | `data-bs-theme` | `--bs-nav-link-color`       | computed `color`          |
| ------------------ | --------------- | --------------------------- | ------------------------- |
| fresh load         | `light`         | `rgba(0, 0, 0, 0.65)`       | `rgba(0, 0, 0, 0.65)`     |
| after one toggle   | `dark`          | `rgba(255, 255, 255, 0.65)` | `rgba(0, 0, 0, 0.65)`     |
| after two toggles  | `light`         | `rgba(0, 0, 0, 0.65)`       | `rgba(0, 0, 0, 0.65)`     |

The custom property tracked the mode; the `color` consuming it did not. Against the navy masthead
that stale value measures **1.35:1**. In an earlier sequence the theme control's own icon read
`rgb(74, 90, 110)` — **2.2:1** — where a reload in dark gave `rgb(232, 238, 245)`.

## Why it is not established

A discriminating experiment broke the instrument's credibility. A **brand-new** `.navbar > .navbar-nav
> .nav-link` element, created and attached after a stylesheet injection, held the injected *light*
value across two full toggles and never tracked the mode either:

```
fresh element   light -> rgba(10, 37, 64, 0.7)
                dark  -> rgba(10, 37, 64, 0.7)
                light -> rgba(10, 37, 64, 0.7)
```

Nothing in that page recomputed style on the attribute change. A page where *no* element responds to
a `data-bs-theme` flip is not evidence about this application; it is evidence that the pane stopped
recomputing style. An injected rule also failed to reach existing elements at all, including at
load, which is not ordinary CSS behaviour.

An earlier sequence in a different page state did show the utility-bar link, the footer link, and the
`.btn-primary` fill repainting correctly on the same toggle while the navbar links did not. That
reading is what first suggested a navbar-specific defect. It is not safe to rely on it now, because
the same instrument has demonstrated it can freeze recomputation wholesale.

## Ruled out, so the next attempt does not retry them

- **`backdrop-filter` on `.masthead` is not the cause.** Disabling it with
  `.masthead{backdrop-filter:none !important}` changed nothing across two toggles.
- **Declaring `--bs-navbar-color` per mode did not change the reading.**
- **Declaring `color` directly per mode did not change the reading.** Both of those tests, however,
  ran on the same discredited instrument, so they establish nothing either.

## What would settle it

Drive the toggle in real Chromium through Playwright, which the project already uses for its browser
tests, and read the computed `color` of a masthead `.nav-link` before and after. That instrument is
independent of the pane and is the one the capture harness already trusts.

The existing capture harness cannot answer this: it paints each variant with `app.theme(...)` on a
freshly mounted surface, which is the reload path, so it never exercises a live toggle. Whatever the
outcome, a proof that drives the toggle is worth adding — this is the one transition no declared
family covers.
