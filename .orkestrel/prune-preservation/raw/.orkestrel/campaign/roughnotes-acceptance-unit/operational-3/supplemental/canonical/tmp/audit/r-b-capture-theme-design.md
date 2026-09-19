Read this operational translation from its document directory. Commands name retained inputs but keep the historical working-root requirements of the [raw execution record](../../../../../supplemental/canonical/tmp/audit/r-b-capture-theme-design.md). Do not execute acceptance mutations from this retained folder. Historical image and portfolio tokens identify retained inventory carriers; image measurements and inspection statements describe the original PNGs.

# Capture callback design question

## Subject

Review the R-B-10 navigation capture boundary in C:/Users/mikes/WebstormProjects/scaffold/tmp/recovery/roughnotes. Source frozen; baseline86a9ef6 plus effective R-B successors through10. Writer report tmp/units/r-b-report-10.md and its actual-10.diff/status-10.txt show the exact state. Source/frames are evidence, not acceptance. Decide a bounded repair design before source changes.

Observed: CAPTURE=1 light-390 journey writes navigation but emits trusted unhandledrejection: Interactive target "Use dark theme" is not visible and focus-reachable; exit remains0. buildVariants in tests/setupBrowser.ts:1087 maps JourneyVariant into CaptureVariant with apply:()=>applyTheme(name). applyTheme is async and re-resolves header control even if mode already matches. Installed0.0.18 CaptureVariant.apply?:()=>void; createPortfolio.place invokes selected.apply?.() without awaiting before captureFrame. Actual declaration/implementation are under node_modules/@orkestrel/test/dist/src/browser/index.d.ts:297 and index.js:2596. Every real journey already explicitly awaits applyTheme before actions; verify reachability, do not assume the report proves that.

Proposal: remove the unnecessary buildVariants adapter and its async capture callback. Use provided readonly JourneyVariant data directly for the portfolio (CaptureVariant.apply is optional). Keep explicit awaited applyTheme user actions before opening states. Update its real setup test to exercise direct applyTheme; do not weaken theme behavior. Add a real PromiseRejectionEvent recorder around the content/navigation journey with assertion before teardown and finally cleanup. Run capture command red with original adapter to bind the new guard, then green with direct variant data. No upstream library or product change. Capture should observe the already-driven UI without an extra covered-header action.

## What the round decides

Decide whether this proposal closes the actual asynchronous/covered-control defect while preserving legitimate theme, variant, navigation and capture behavior. State a concrete smaller or necessary alternative if broken.

## Already established

Parent read the actual callback type/invocation and source. Published optional apply is synchronous; TypeScript's void function assignability allowed the async callback but does not make portfolio await it. Parent verified content/refusal/menu normal/reduced source controls red/green before10. Do not reopen those controls. Writer's10 source delta affects only theme.test and integration registry/placement.

## Review evidence

Read exact setupBrowser.ts, setupBrowser.test.ts, integration.test.ts, wrapper, relevant guide paragraphs, installed declarations/implementation and report10. No source changes, installs, broad suites, commits, publication or raw model journals. Nonmutating commands allowed. Source remains frozen throughout design.

## Numbered falsifiable claims

1. Direct provided JourneyVariant data is sufficient for every current portfolio consumer; no capture depends on an unperformed mode act.
2. Removing buildVariants removes an invalid/redundant adapter rather than hiding a required capability; direct awaited theme tests preserve the useful behavior.
3. Real unhandled-rejection recording during navigation capture will fail on the observed async hook, cannot pass merely because Vitest exits0, and can be installed/cleaned without mocks or suppressing events.
4. Repair stays in Roughnotes proof composition and needs no upstream callback API expansion, product policy change or weakened reachability.

## Unknowns

Whether another capture path depends on reapplying theme mid-state; whether the event recorder needs a browser task boundary to expose the actual rejection before assertion. Report exact evidence needed, not guesses. Opus unavailable; independent native Sol objective/subjective lanes substitute.

## Threshold

Try to break the proposal. CONFIRMED requires a named failed attack; BROKEN needs exact input/caller/effect; UNRESOLVED names missing evidence. Do not infer counterpart findings or manufacture defects.
