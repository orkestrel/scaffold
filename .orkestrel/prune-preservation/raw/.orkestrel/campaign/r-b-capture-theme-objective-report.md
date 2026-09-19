# Capture-theme objective design audit

Native r_b_objective on Sol returned through the harness. Effective brief tmp/audit/r-b-capture-theme-objective-brief.md; shared design tmp/audit/r-b-capture-theme-design.md. No runtime tests ran in this design lane.

1. CONFIRMED. Traced portfolio creation/placements/matrix/transport. Every current captured journey explicitly awaits applyTheme before placement. Navigation does so at integration.test.ts:492 before menu opening/placement. Matrix explicitly applies its variant without portfolio placement; transport theme changes do not capture. JourneyVariant supplies required data; CaptureVariant adds only optional apply.
2. CONFIRMED. buildVariants at setupBrowser.ts:1087 adds async work to the synchronous optional hook. Portfolio index.js:2600 discards the returned promise. Even an already-matching theme re-resolves the covered masthead control at setupBrowser.ts:1061. Remove adapter/unused imports and replace setupBrowser.test.ts:138 callback test with direct awaited dark/light acts, preserving document/control-state assertions. This removes redundant invalid composition without weakening reachability.
3. UNRESOLVED. Real PromiseRejectionEvent recorder is allowed, but screenshot/microtask completion does not prove event delivery. Attach before journey, assert no events before teardown, remove identical handler in finally, and do not preventDefault/catch/filter. Existing CAPTURE=1 light-390 with original adapter must fail at recorder assertion. If delivery is late, measure a real browser task boundary and repeat. Only then remove adapter and run same proof green.
4. CONFIRMED. No upstream callback expansion/product change/resolver weakening needed. Async theme preparation already belongs to journeys. Direct data lets capture observe prepared modal state.

CAPTURE DESIGN OBJECTIVE: UNRESOLVED
