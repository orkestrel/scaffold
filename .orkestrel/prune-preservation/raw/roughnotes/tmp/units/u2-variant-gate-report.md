thread_id: 01a0aabe-088b-7fe0-8dbe-20cb595a4c8f
agent_messages: 11

=== FINAL AGENT MESSAGE ===
# Done / not done

Acceptance readings are against the brief's numbered criteria.

1. **Done** — Scoped `oxfmt --check` reports `All matched files use the correct format.`
2. **Done** — Scoped `oxlint --deny-warnings` exits 0.
3. **Done** — `npm run check` exits 0, including the core and browser isolation checks.
4. **Done** — `npm test` runs the integration file exactly once for each declared variant and prints each `VITE_VARIANT`; the runner derives names from `VARIANTS` through TypeScript's parser.
5. **Done** — V1, V2, and V3 are repaired in owned files. Existing assertions, accessible names, selectors, and skip conditions remain intact.
6. **Done** — `shop-listing` and `shop-detail` have separate registry entries and separate PNGs for every variant under `tmp/capture/states/`.
7. **Done** — V4 remains red. Executed evidence contradicts the supplied node-replacement diagnosis; the deviation follows.
8. **Done** — The direct `tests/app/browser/setup.test.ts` run reports `2 passed`.

# Per-failure diagnosis

The baseline instrument is `node tmp/units/u2-baseline.mjs`. It runs the following command with each variant in the environment; the final gate uses the same integration command. Logs are `tmp/units/u2-baseline-<variant>.log.txt` and `tmp/units/u2-gate.log.txt`.

```sh
VITE_VARIANT=<variant> npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/integration.test.ts
```

**V1 — Missing Vue render flush; fixed.** The dark desktop baseline reports `2 failed | 15 passed | 1 skipped`, including the unchanged theme-name assertion. The instrumented dark-narrow run, `node tmp/units/u2-diagnose.mjs`, records:

```text
U2 theme immediate dark-390 No interactive element has the accessible name "Use light theme"
U2 theme flushed dark-390 undefined
```

The only intervening operation is `await nextTick()`. The retained instrument is `tmp/units/u2-diagnostic-integration.ts`. This establishes a test scheduling defect for this accessible-name lookup. `paintVariant` in `tests/app/browser/integration.test.ts` awaits the flush, and every caller awaits it. The home journey passes in every final variant, with its accessible-name assertion unchanged.

**V2 — The journey accesses closed compact navigation; fixed.** The light-narrow baseline reports `4 failed | 13 passed | 1 skipped`. The home and external-login journeys fail with `Interactive target "Shop" is not visible and focus-reachable`. Opening the menu makes the same named Shop link reachable. `openSite` and `closeSite` in `tests/app/browser/setup.ts` drive the rendered controls and wait for the menu transition. The integration journeys open the compact menu before traversing or resolving Shop, then close it. Those journeys pass in every final variant; no selector was broadened.

**V3 — Traversal races the offcanvas closing transition; fixed.** The baseline reports `Interactive target "Skip to content" is not reachable through forward Tab traversal`, with Shop, Contact, Get started, and footer links in its trail. The instrumented run records:

```text
U2 menu before traversal offcanvas offcanvas-end bg-body text-body show hiding
U2 menu hidden main
```

The active element before traversal is the Products menu link. The installed `traverseAccessible` calls `userEvent.tab()` and stops on repeated focus; the installed Playwright provider implements that call with `page.keyboard.press('Tab')`. It walks real browser focus while the closing menu remains visible and its hidden event subsequently focuses main. This is not evidence that an open panel's keyboard trap fails. `followSite` in `tests/app/browser/setup.ts` now waits for the closed menu and main focus. The unchanged skip-link traversal and focus assertion pass in every final variant.

**V4 — The pointer action misses the application document; not fixed.** Expected from the brief: blur validation replaces the targeted input. Found in `node tmp/units/u2-payment.mjs`, with the event-recording instrument retained as `tmp/units/u2-payment-hit-instrument.ts`:

```text
U2 field before payment-customer payment-summary true
parent pointerdown: [Vitest Browser UI header] at 302.5299987792969,9.819999694824219
parent pointerup: [Vitest Browser UI header] at 302.5299987792969,9.819999694824219
parent click: [Vitest Browser UI header] at 302,9
U2 field after payment-customer BODY  true true
```

The application receives only the summary's blur/focusout events during that action, with no pointer or click event. The final booleans prove that the input remains connected and is still the identical node. The targeted run reports `1 failed | 17 skipped`; `tmp/units/u2-payment.log.txt` contains the event targets, and `tmp/units/u2-payment.png` shows the runner surface. The final ordinary gate reproduces the focus failure in both narrow variants. The committing validation calls exist in application source, but this measurement does not establish them as this failure's cause. Hypothesis: the scaled tester frame causes incorrect pointer coordinates. No application or dependency fix was made; the pointer and focus proof stays red.

**V5 — Missing placements follow failed journeys; partly closed.** The baseline completeness diffs omit `home` and, on narrow runs, `product-detail`; those placements return after V1–V3 are repaired. The final ordinary gate's narrow completeness diffs omit only `payment-refused`, because V4 aborts before that placement. Desktop completeness passes. The registry also replaces the ambiguous `shop` state with `shop-listing` and `shop-detail` in `integration.test.ts`. Completeness assertions remain exact; no missing state is fabricated or excused.

# The gate

The shipped script chain is:

```text
test:
  npm run test:app && npm run test:policy && npm run test:config

test:app:
  vitest run --config vite.config.ts --no-cache --reporter=dot --project app:core --project app:browser --exclude tests/app/browser/integration.test.ts && npm run test:variants

test:variants:
  node -e "<the runner stored in package.json>"
```

That runner parses the integration file's `VARIANTS` declaration, rejects absent, empty, or duplicate declarations, prints `VITE_VARIANT=<name>`, and sequentially spawns `process.execPath` with these exact arguments and that environment value:

```text
node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/integration.test.ts
```

It inherits output, continues after failed variants, and retains exit code 1 if any run fails. The initial application pass excludes integration to prevent a duplicate default-variant run; it reports `85 passed`.

The measured results are:

| Variant | Ordinary `npm test` | With `VITE_CAPTURE=true` |
| --- | --- | --- |
| `light-1280` | 17 passed, 0 failed, 1 skipped | 18 passed, 0 failed |
| `dark-1280` | 17 passed, 0 failed, 1 skipped | 18 passed, 0 failed |
| `light-390` | 15 passed, 2 failed, 1 skipped | 14 passed, 4 failed |
| `dark-390` | 15 passed, 2 failed, 1 skipped | 15 passed, 3 failed |

The ordinary skip is the existing capture-only file check. The capture command is `VITE_CAPTURE=true npm run test:variants`, executed by `node tmp/units/u2-capture.mjs`; its output is `tmp/units/u2-capture.log.txt`.

# Observations

`node tmp/units/u2-gate.mjs` measures the complete `npm test` invocation with `performance.now()`: **102.655 seconds, exit 1**. Sequential variants are practical on this host at that measured duration. The failing application stage prevents policy and config from running, so this does not measure a fully green chain's duration.

Browser runs report `WARNING: 313 repetitive deprecation warnings omitted.` The standing Sass condition remains unchanged.

Capture mode exposes an additional light-narrow failure: Playwright times out clicking `Search markets`, reporting that the sticky masthead's theme control intercepts pointer events. Its payment-summary click also times out against the masthead. Consequently, light-narrow capture completeness lacks `marketplace-miss` and `payment-refused`; dark-narrow capture completeness lacks `payment-refused`. These readings are retained without changing pointer behavior or assertions.

The `prove` tool refused execution with `MCP tool call requires approval, but approval policy is never`. No receipt was issued; the evidence reported here comes from executed Chromium tests and event recorders.

# What you did not close

V4 and its resulting V5 failures remain red. The Orchestrator must reconcile the supplied application diagnosis with the observed parent-UI click before assigning the repair. The capture-only light-narrow pointer interception also remains open; its log identifies the obstructing application header, but does not isolate the underlying application-versus-runner cause.

No application, dependency, guide, policy, or campaign file was edited by this unit. No commit, push, or install was performed. HEAD is `b20d049`; the checkout already contained campaign-artifact changes, and further campaign-artifact changes appeared during execution. Those files were left untouched.