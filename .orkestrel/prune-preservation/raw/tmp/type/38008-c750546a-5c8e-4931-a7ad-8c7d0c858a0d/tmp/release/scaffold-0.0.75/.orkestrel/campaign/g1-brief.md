# Unit G1 — inventory of the journey instruments a consumer hand-rolled

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached through the Cursor CLI in `--mode=ask`.
You are the bench engine reading this brief inside your own CLI: perform the reading directly and
spawn nothing. This unit is read-only. Edit nothing, create nothing, run no command that writes.

## Objective

Return a distilled inventory of every test instrument the Rough Notes workspace declares for its
browser journeys, with a ruling per instrument on whether it is application-specific or generic,
and which published `@orkestrel/test` export it overlaps, extends, or should have used.

## Context

The workspace is the checkout you were launched in: `C:\Users\mikes\WebstormProjects\roughnotes`.
It is the only real consumer of the `@orkestrel/test/browser` journey layer in a fleet of about 50
checkouts. What it hand-rolled is therefore the evidence of what the package still fails to
publish, and what it did wrong is evidence of what the skill fails to teach.

Read these files completely, in this order:

1. `tests/app/browser/setup.ts` (1002 lines) — the workspace's browser setup module.
2. `tests/app/browser/integration.test.ts` (1129 lines) — the journey suite.
3. `tests/app/browser/styles/theme.test.ts` (277 lines) — the resolved-style matrix.
4. `tests/setupBrowser.ts` (5 lines) and `vite.config.ts` lines 39–60 and 340–390 — the variant
   fan-out and the browser project.

The package `@orkestrel/test` publishes these from its `browser` entry (read from
`node_modules/@orkestrel/test/dist/src/browser/index.d.ts` if you need a signature):

```text
isOutsideViewport isReachable isRendered readHit computeNamePattern resolveRendered resolveAccessible
clickAccessible clickAccessibleWithin clickDisclosure typeAccessible fillAccessible traverseAccessible
readPerception readPage readFocus readValue readText readRole readName readStates describeTree
describeFocus waitForFrame build mount render typeInput commitInput clearStorage removeDatabase
parseColor parseCSSColor matchesColor blendColor measureLuminance measureContrast readLayers
readBackdrop readContrast readRing readCascade readClasses readRules findRule findKeyframes readRows
extractOrphans extractStyles readStyle readToken readRootToken readPixels measureContent stagePane
releasePane captureFrame readFrame expandCaptures createPointerEvent createDragEvent createPortfolio
createChannel createJournal
constants: ACCESSIBLE_ROLES CANVAS_COLOR CAPTURE_PANE CAPTURE_STAGINGS CONTENT_ROLES FIELD_ROLES
FOCUSABLE_SELECTOR HEADER_ROLES IMPLICIT_ROLES
```

and these from its core entry:

```text
waitForCondition waitForDelay waitForAbort waitForEvent retryUntil captureError requireValue
createRecorder createRecorders createSignal createTeardown executeScenario executeScenarios
STATECHART_ATTRIBUTES STATECHART_STATUSES
```

## Questions to answer, with `file:line` behind every row

1. **Instrument table.** One row per exported symbol in `tests/app/browser/setup.ts` and per
   module-scope function or constant in `integration.test.ts` and `theme.test.ts`. Columns: name;
   file:line; one-line job; `specific` (names Rough Notes copy, routes, components, or Bootstrap
   internals) or `generic` (would serve any browser workspace unchanged); the published export it
   overlaps, wraps, or re-implements, or `none`.
2. **Reach-past sites.** Every place a test reaches past the interface: `querySelector` by id or by
   class, `document.elementFromPoint`, a read of application state such as `app.dark.value` or a
   store, `element.focus()`, a constructed event, a fixed delay, a Bootstrap implementation class
   such as `show`, `showing`, `hiding`, `d-lg-none`. Quote the line.
3. **Refusal assertions.** Every `readRefusal` call site and the exact voice asserted. Flag any
   site that accepts more than one voice (`!== undefined`, a regex, a substring).
4. **Families declared.** Where the suite declares its families, which are declared, and the
   assertion that ties declaration to proof, quoted.
5. **Variant and capture axis.** How the run reads its variant, how many states the registry
   holds, where `place` is called relative to the assertion that proves the state, and whether any
   registered state is placed outside the journey that reaches it.
6. **Transport family.** Which storage implementations exist (`QuotaStorage`, `PermissionStorage`,
   others), what each is configured to fail, and which journey drives each. Is each an inert
   configurable implementation of the real `Storage` interface?
7. **Keyboard.** Every `userEvent.keyboard` and `traverseAccessible` call with its key string or
   target, and which routes or surfaces get a forward-Tab walk.
8. **Statechart.** Whether any `StateTransition`, `StateScenario`, `executeScenarios`, or
   `STATECHART_*` symbol is used, and if not, what the suite says about why.
9. **Text-convergence.** Every polling helper (`waitForText`, `waitForOrigin`, `readSettled`,
   `readMenuSettled`, others): its predicate, its budget, and whether the predicate can go from
   false to true after the action it observes.

## Output

Return only, in this order:

- `Question`: one line.
- `Evidence`: the answers to questions 1–9, tables where the question asks for one, every row
  carrying `file:line`.
- `Distillate`: at most fifteen lines — the generic instruments the package could publish, the
  reach-past sites the skill must forbid more clearly, and the one or two defects that would most
  change the skill's instructions.
- `Unknowns`: every question above you could not settle from the files named, and why.

No raw file dumps. No recommendations about design. No edits.
