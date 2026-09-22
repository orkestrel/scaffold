# Probe: `event.target` after dispatch on the host's Chromium (2026-09-22)

Instrument: `units/event-target-probe.mjs`, run with Veneer's installed Playwright 1.63.0 against
`/opt/pw-browsers/chromium-1194/chrome-linux/chrome` (HeadlessChrome/141.0.0.0). Control: the same
read inside the listener during dispatch.

```text
attachedDuring true   attachedAfter true    attachedAfterIsNull false
detachedDuring true   detachedAfter false   detachedAfterIsNull true
```

Reading: after `dispatchEvent` returns, a recorded event's `target` is `null` when the host was
detached from the document, and remains the host when the host was attached. `tests/src/browser/Button.test.ts`
(case "dispatches the completed state once as a bubbling non-cancelable event") and
`tests/src/browser/helpers.test.ts` (case "dispatches the supplied type and detail synchronously
through the parent") dispatch on detached hosts and read `target` after dispatch, so they fail on
this Chromium and passed on the previous session's Chromium 151. Carrier: the engine realignment
unit reads the target inside the listener or attaches the host.
