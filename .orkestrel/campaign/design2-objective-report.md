# Design

The ruling adopts the reusable mechanisms into `@orkestrel/test` 0.0.8, consolidates near-duplicates, and excludes package policy or capabilities already owned by another package. No dependency is added.

## Evidence

1. `@orkestrel/test` is 0.0.7, has no runtime dependency section, exposes core and server through ESM/CJS, and exposes browser through ESM only. (`test/package.json:2-3`, `test/package.json:17-47`, `test/package.json:81-97`)
2. Core publishes `waitForDelay(ms = 0)` and has no condition, event, or retry wait. (`test/src/core/helpers.ts:3-11`, `test/src/core/index.ts:1-3`)
3. A bounded condition wait must use `performance.now()` and fail with the condition description. (`scaffold/.claude/rules/tests.md:38`, `scaffold/.claude/rules/tests.md:199-210`)
4. The accepted plan proposes `waitForCondition`, asynchronous-condition support, core placement, and defaults of 1,000 ms and 10 ms. (`test/.orkestrel/test/wait-for-condition-plan.md:29-53`, `test/.orkestrel/test/wait-for-condition-plan.md:55-68`)
5. The roadmap schedules a named, synchronous-or-asynchronous condition wait measured with `performance.now()`. (`scaffold/ROADMAP.md:31-35`)
6. Supervisor’s `waitForEvent` bridges a typed emitter occurrence to a tuple, while `waitForRecorder` silently returns after its attempt limit even if no call arrived. (`supervisor/tests/setup.ts:48-69`)
7. Supervisor provides generic JSON Lines parsing, PID liveness, and socket-close waiting. (`supervisor/tests/setupServer.ts:402-409`, `supervisor/tests/setupServer.ts:419-432`, `supervisor/tests/setupServer.ts:612-615`)
8. Supervisor’s process harness strips `APP_*`, captures output, polls stderr and HTTP readiness with `Date.now()`, waits for close, and performs SIGTERM/SIGKILL shutdown. (`supervisor/tests/setupApplicationServer.ts:170-220`, `supervisor/tests/setupApplicationServer.ts:352-425`)
9. Supervisor’s `retryUntil` reruns an asynchronous producer for an attempt limit and throws when no produced value satisfies its predicate. (`supervisor/tests/setupService.ts:205-219`)
10. The existing browser layer resolves and acts by browser-provider role and accessible name; it also already owns `render`, `contrast`, `readFocus`, and `createPortfolio`. (`test/src/browser/helpers.ts:25-157`, `test/src/browser/helpers.ts:256-293`, `test/src/browser/helpers.ts:416-521`, `test/src/browser/factories.ts:5-67`)
11. Supervisor’s accessibility inspection uses implicit-role maps, DOM visibility, manual role/name/state resolution, and tree/focus/surface descriptions. (`supervisor/tests/setupBrowser.ts:293-408`, `supervisor/tests/setupBrowser.ts:410-558`, `supervisor/tests/setupBrowser.ts:560-655`)
12. Supervisor’s visual layer parses and composites tints, falls back to a white canvas, and measures text and focus-ring contrast. (`supervisor/tests/setupBrowser.ts:795-799`, `supervisor/tests/setupBrowser.ts:833-965`, `supervisor/tests/setupBrowser.ts:967-1064`)
13. Supervisor’s capture layer resizes and unscales the Vitest tester pane, verifies its dimensions, captures an element, compares the returned bytes with disk, and always releases the pane. (`supervisor/tests/setupBrowser.ts:168-291`)
14. Supervisor’s DOM layer uses caption, `aria-label`, field ID, `data-row`, and exact text queries; its actions add Vue settlement and journal recording. (`supervisor/tests/setupBrowser.ts:1131-1351`)
15. Supervisor’s journal intercepts console channels, forwards calls, records uncaught errors and rejections, records steps only while armed, and restores the original console on release. (`supervisor/tests/setupBrowser.ts:657-781`)
16. `mountComponent`, `createContextApp`, and `waitForBrowserState` import Vue types or runtime functions. (`supervisor/tests/setupBrowser.ts:39`, `supervisor/tests/setupBrowser.ts:68`, `supervisor/tests/setupBrowser.ts:94-133`, `supervisor/tests/setupBrowser.ts:790-793`, `supervisor/tests/setupBrowser.ts:1066-1094`)
17. `ScratchInterface.destroy()` is synchronous and routes through `removeTree`, whose retry covers selected synchronous filesystem errors for about one second. (`test/src/server/types.ts:65-80`, `test/src/server/helpers.ts:58-94`, `test/src/server/factories.ts:21`, `test/src/server/factories.ts:62-64`)
18. `@orkestrel/process` already publishes `ProcessExit`, a close-settled `ProcessInterface.exit`, environment merging, `stopChild`, and `waitForExit`. (`supervisor/node_modules/@orkestrel/process/dist/src/core/index.d.ts:346-352`, `supervisor/node_modules/@orkestrel/process/dist/src/core/index.d.ts:354-433`, `supervisor/node_modules/@orkestrel/process/dist/src/server/index.d.ts:323-358`, `supervisor/node_modules/@orkestrel/process/dist/src/server/index.d.ts:746-769`, `supervisor/node_modules/@orkestrel/process/dist/src/server/index.d.ts:910-922`)
19. The guide still rejects condition polling, attempt retry, and ordinary browser helpers by consumer count, which conflicts with the user ruling and scheduled roadmap work. (`test/guides/test.md:650-703`)
20. Public types belong in the nearest `types.ts`; helpers, constants, factories, and classes remain separated by kind; the sole environment barrel exposes intentional exports. (`scaffold/.claude/rules/typescript.md:24-28`, `scaffold/.claude/rules/architecture.md:186-203`, `scaffold/.claude/rules/architecture.md:235-261`)
21. Browser types have DOM libraries, server types have Node types, and core has host-independent ES/WebWorker libraries. (`test/configs/src/tsconfig.browser.json:3-13`, `test/configs/src/tsconfig.server.json:3-13`, `test/configs/src/tsconfig.core.json:3-13`)
22. Every public export must be documented and guide parity must remain exact. (`scaffold/.claude/rules/documentation.md:29-38`)

## Wait and retry

| Ruling | Export or replacement | Exact signature | Placement and kind | Tests and guide |
|---|---|---|---|---|
| Adopt | `waitForCondition` | `(condition: ConditionHandler, description: string, options?: WaitOptions) => Promise<void>` | `ConditionHandler` and `WaitOptions` in `src/core/types.ts`; implementation in `src/core/helpers.ts`; core barrel | Test immediate success, delayed synchronous success, asynchronous success, predicate rejection, timeout, exact message, timeout/interval validation, and elapsed time with `performance.now()`. Add “Wait for a condition” under Core Helpers and Patterns. |
| Adopt | `waitForEvent` | `<TArgs extends readonly unknown[]>(subscribe: EventSubscriber<TArgs>, description: string, options?: WaitOptions) => Promise<TArgs>` | `EventSubscriber` in `src/core/types.ts`; implementation in `src/core/helpers.ts` | Test synchronous and asynchronous delivery, tuple identity, timeout, cleanup after delivery, cleanup after timeout, and subscription failure. Add “Wait for one event” under Core Helpers. |
| Adopt | `retryUntil` | `<T>(produce: () => T \| Promise<T>, satisfied: (value: T) => boolean \| Promise<boolean>, description: string, attempts?: number) => Promise<T>` | handler types in `src/core/types.ts`; implementation in `src/core/helpers.ts` | Test first success, later success, exact attempt limit, returned satisfying value, producer rejection, predicate rejection, invalid attempt values, and exact failure voice. Add “Retry an operation” under Core Helpers and distinguish attempts from elapsed time. |
| Collapse | `waitForRecorder` | Call `waitForCondition(() => recorder.count > 0, 'recorder to observe a call', { timeout: 200, interval: 5 })`. | No export | Add a recorder example using `waitForCondition`. `waitForRecorder` does not survive as an export because it is one condition call and its silent failure violates the wait contract. |
| Collapse | `waitForApplicationStderr` | Package-local call to `waitForCondition`, followed by the local stderr read. | Supervisor call site after re-pin | No `@orkestrel/test` export. `waitForApplicationStderr` does not survive as an export because its process state, output accessor, and failure voice belong to supervisor. |
| Collapse | `waitForApplicationResponse` | Package-local asynchronous condition that retains the successful `Response`. | Supervisor call site after re-pin | No `@orkestrel/test` export. `waitForApplicationResponse` does not survive as an export because its origin, child-exit check, fetch policy, and diagnostic output belong to supervisor. |
| Exclude | `waitForApplicationProcess` | — | — | `waitForApplicationProcess` is excluded because `@orkestrel/process` already publishes a close-settled process exit contract. |
| Defer to scratch family | `destroyApplicationScratch` | Becomes `destroyScratch`. | Server | See Scratch destroy retry. |

`WaitOptions` is:

```ts
export interface WaitOptions {
	readonly timeout?: number
	readonly interval?: number
}
```

`ConditionHandler` accepts `boolean | Promise<boolean>`. `waitForCondition` evaluates immediately, propagates a thrown or rejected predicate unchanged, measures the budget with `performance.now()`, and throws:

```text
Condition was not met within <timeout>ms: <description>
```

The defaults are `timeout: 1_000` and `interval: 10`. Timeout and interval must be finite and non-negative. A zero timeout permits the immediate evaluation and rejects if it is false.

Attempt-bounded and time-bounded retries remain separate. `retryUntil` reruns a producer and returns its value. `waitForCondition` rereads a condition within elapsed time and returns no value.

## Process

| Ruling | Export | Exact signature | Placement and kind | Tests and guide |
|---|---|---|---|---|
| Adopt | `hasProcess` | `(pid: number) => boolean` | `src/server/helpers.ts`; server barrel | Test invalid, missing, current, live-child, exited-child, and Linux zombie cases. Host-specific zombie proof needs a Linux run. Add “Inspect process liveness” under Server Helpers. |
| Adopt and rename | `decodeJSONLines` | `(output: string) => readonly unknown[]` | `src/core/helpers.ts`; core barrel | Test LF, CRLF, trailing newline, empty lines, empty input, ordering, primitives, and malformed JSON rejection. Add “Decode JSON Lines” under Core Helpers. |
| Adopt | `waitForSocketClose` | `(socket: Socket, options?: WaitOptions) => Promise<void>` | `src/server/helpers.ts`, importing the core option type | Use real loopback sockets. Test already closed, ordinary close, `ECONNRESET`, non-reset error rejection, timeout, and listener cleanup. Add “Wait for socket close” under Server Helpers. |
| Exclude | `stopApplicationProcess` | — | — | `stopApplicationProcess` is excluded because `@orkestrel/process` publishes `stopChild` and `ProcessInterface.stop`. |
| Exclude | `spawnApplicationCommand` | — | — | `spawnApplicationCommand` is excluded because its `APP_*` filtering is application policy and its generic spawn/environment work is already published by `@orkestrel/process`. |
| Exclude | `ApplicationProcessInterface` | — | — | `ApplicationProcessInterface` is excluded because its generic process contract overlaps `@orkestrel/process.ProcessInterface`. |
| Exclude | `ApplicationProcessExitInterface` | — | — | `ApplicationProcessExitInterface` is excluded because it duplicates `@orkestrel/process.ProcessExit`. |
| Exclude | `ProviderFixtureResultInterface` | — | — | `ProviderFixtureResultInterface` is excluded because it supports supervisor’s provider-fixture protocol rather than a package-neutral test mechanism. |

`parseProviderFrames` becomes `decodeJSONLines`; the provider prefix is removed. Empty physical lines are ignored. A non-empty malformed line rejects with the native `SyntaxError`.

## Accessibility resolution

All declarations land in the browser environment. Constants go to `src/browser/constants.ts`; helper implementations go to `src/browser/helpers.ts`. No second query engine is introduced: the existing Vitest role locator remains authoritative for finding and acting, while the adopted helpers inspect a DOM node already held by the caller.

| Ruling | Export | Exact signature |
|---|---|---|
| Adopt and generalize | `IMPLICIT_ROLES` | `Readonly<Record<string, string>>` |
| Adopt | `IMPLICIT_HEADERS` | `Readonly<Record<string, string>>` |
| Adopt and generalize | `IMPLICIT_FIELDS` | `Readonly<Record<string, string>>` |
| Adopt and generalize | `CONTENT_ROLES` | `readonly string[]` |
| Adopt | `FOCUSABLE` | `string` |
| Adopt | `isRendered` | `(element: Element) => boolean` |
| Adopt | `collapseText` | `(element: Element) => string` |
| Adopt | `resolveRole` | `(element: Element) => string \| undefined` |
| Adopt | `resolveName` | `(element: Element) => string` |
| Adopt | `resolveStates` | `(element: Element) => readonly string[]` |
| Adopt | `describeTree` | `(element: Element) => string` |
| Adopt | `describeFocus` | `(element: Element) => string` |
| Adopt and generalize | `describeSurface` | `(element: HTMLElement) => string` |

`ACCESSIBLE_ROLES` remains the role search set used by `resolveAccessible`; `CONTENT_ROLES` remains the set of roles whose names may come from content. They are different concepts. `describeSurface` counts controls through the generalized `extractControls`, not through supervisor’s `data-row` exclusion.

Tests must cover explicit and implicit roles, input types, scoped headers, unnamed sections, labels and `aria-labelledby`, hidden descendants, disabled/expanded/selected/live states, native details state, positive `tabindex`, ordinary document order, hidden controls, and stable description text. Representative results must be compared with `page.getByRole` in real Chromium.

The guide gains “Accessibility inspection” under Browser Helpers, following the existing journey APIs. It must state that `resolveAccessible` locates through the browser provider, while `resolveRole`, `resolveName`, and `resolveStates` inspect an existing node.

## Visual measurement

`Tint` lands first in `src/browser/types.ts`. `CANVAS` lands in `src/browser/constants.ts`. The helpers land in `src/browser/helpers.ts`.

| Ruling | Export | Exact signature |
|---|---|---|
| Adopt, corrected for parser law | `parseTint` | `(value: string) => Tint \| undefined` |
| Adopt | `blendTint` | `(front: Tint, back: Tint) => Tint` |
| Adopt | `readBackdrop` | `(element: Element, canvas?: Tint) => Tint` |
| Adopt | `measureLuminance` | `(tint: Tint) => number` |
| Adopt | `measureContrast` | `(front: Tint, back: Tint) => number` |
| Consolidate | `contrast` | `(element: Element, canvas?: Tint) => number` |
| Adopt | `readRing` | `(control: HTMLElement, worn?: HTMLElement, canvas?: Tint) => Promise<number \| undefined>` |
| Collapse | supervisor’s visual `readFocus` | `readRing(element)` |
| Collapse | `readContrast` | `contrast(element, CANVAS)` when white fallback is intended |

`parseTint` returns `undefined` for unsupported or invalid syntax; it does not invent transparent black. `readBackdrop` throws when no painted layer exists and no canvas was supplied. Passing `CANVAS` requests supervisor’s white fallback. Omitting it preserves the existing strict `contrast()` contract.

The existing text-reading `readFocus(): string | undefined` remains unchanged. Supervisor’s focus-contrast helper does not survive under that name because `readFocus` already names the focused element’s text. `readContrast` does not survive because `contrast` is the package’s existing export for that concept.

Tests cover legacy `rgb`/`rgba`, `color(srgb)`, invalid syntax, alpha composition, black/white luminance, ratio symmetry, translucent foreground and background, strict unpainted refusal, explicit canvas fallback, detached elements, focus-visible absence, CSS outline, box shadow, and separate control/worn elements.

The guide gains “Measure color and focus contrast,” updates `contrast` with its optional canvas, and documents `readRing`. The Voices table gains parser, backdrop, and ring failures.

`Reading` is excluded because its `bar` and `label` fields encode supervisor audit policy rather than visual measurement. `STATUS_PALETTE` is excluded because its status names are supervisor domain states.

## Pane and capture

`FrameOptions` lands in `src/browser/types.ts`. `CAPTURE_PANE` lands in `src/browser/constants.ts`. Capture helpers land in `src/browser/helpers.ts`; `createPortfolio` remains in `src/browser/factories.ts`.

```ts
export interface FrameOptions {
	readonly path: string
	readonly width: number
	readonly height: number
	readonly element?: HTMLElement
}
```

| Ruling | Export | Exact signature |
|---|---|---|
| Adopt | `stagePane` | `(width: number, height: number) => Promise<void>` |
| Adopt | `releasePane` | `() => void` |
| Adopt and generalize | `captureFrame` | `(options: FrameOptions) => Promise<string>` |
| Consolidate | `createPortfolio` | Existing `(options: PortfolioOptions) => PortfolioInterface`; `place` delegates its enabled write to `captureFrame`. |

`captureFrame` returns the verified written path. An omitted `element` captures the page. It stages before capture, compares the provider’s base64 bytes with the file read back from disk, and releases in `finally`.

Tests run in the real browser provider. They cover pane discovery failure, viewport dimensions, two-frame paint settlement, path mismatch, byte mismatch, full-page capture, element capture, release after success, release after failure, and `createPortfolio.place` delegation. Byte and tester-pane behavior need a browser run.

The guide’s capture section documents `FrameOptions`, the lifecycle helpers, byte verification, and the portfolio delegation.

## DOM querying and interaction

| Ruling | Export or replacement | Exact signature | Placement |
|---|---|---|---|
| Adopt and rename | `resolveText` | `(root: ParentNode, selector: string, text: string) => HTMLElement` | `src/browser/helpers.ts` |
| Consolidate | `render` | `(markup?: string) => HTMLDivElement` and `(markup: string, tag: string) => HTMLElement` | `src/browser/helpers.ts` |
| Adopt and generalize | `extractControls` | `(root: Element) => readonly HTMLElement[]` | `src/browser/helpers.ts` |
| Adopt, framework-neutral | `extractOrphans` | `(root: ParentNode, child: string, parent: string) => readonly string[]` | `src/browser/helpers.ts` |
| Adopt | `clearBrowserStorage` | `() => void` | `src/browser/helpers.ts` |
| Adopt, framework-neutral | `recordArrival` | `(options: ArrivalOptions) => Promise<void>` | `ArrivalOptions` in browser `types.ts`; helper in browser `helpers.ts` |
| Adopt, framework-neutral | `driveArrival` | `(arrive: () => void \| Promise<void>, options: ArrivalOptions) => Promise<void>` | Browser types/helpers |

`ArrivalOptions` is:

```ts
export interface ArrivalOptions {
	readonly action: string
	readonly condition: ConditionHandler
	readonly element: HTMLElement
	readonly journal: JournalInterface
	readonly trigger: string
	readonly wait?: WaitOptions
}
```

`recordArrival` calls `waitForCondition`, waits for one animation frame, and records `describeSurface(element)`. `driveArrival` awaits `arrive` and delegates to `recordArrival`. Neither imports Vue or calls `nextTick`.

Consolidation rulings are final:

- `buildElement` does not survive as an export because `render('', tag)` is the general attached-element constructor.
- `findControl` does not survive as an export because `resolveAccessible('button', caption)` is the package’s role/name resolver.
- `findLabelled` does not survive as an export because `resolveAccessible(name)` resolves the accessible name without exposing `aria-label` as test policy.
- `findField` does not survive as an export because `resolveAccessible` resolves fields by role and accessible name rather than implementation ID.
- `pressControl` does not survive as an export because `clickAccessible` already performs trusted activation.
- `pressLabelled` does not survive as an export because `clickAccessible` already acts by accessible name.
- `fillField` does not survive as an export because `fillAccessible` already fills by accessible name.
- `findRow` is excluded because `data-row` is supervisor’s application addressing contract.
- `pressRow` is excluded because it depends on supervisor’s `data-row` addressing contract.
- Bootstrap-specific orphan detection is excluded; only the parameterized class-ancestry mechanism `extractOrphans` is adopted.

Tests cover exact and ambiguous text, whitespace collapse, arbitrary container tags, generalized accessible-control extraction, class ancestry without Bootstrap names, clearing each storage surface, asynchronous drive functions, condition timeout, frame settlement, and journal recording.

The guide gains “Inspect and settle a rendered surface.” Existing acting-verb prose remains authoritative: public actions continue to resolve their own accessible targets rather than accepting elements.

## Journal and step recorder

The journal is distinct from `createRecorder`: `createRecorder` records one callback’s argument tuples, while `Journal` owns a browser observation lifecycle. The existing recorder contract is unchanged. [10][15]

Types land in `src/browser/types.ts` before the class:

```ts
export interface JournalStep {
	readonly action: string
	readonly result: string
	readonly trigger: string
}

export interface JournalInterface {
	readonly output: readonly string[]
	readonly steps: readonly JournalStep[]
	watch(): void
	release(): void
	record(action: string, trigger: string, result: string): void
}
```

`Journal` lands in `src/browser/Journal.ts`, implements `JournalInterface`, and is re-exported from the browser barrel. Its exact public surface is the interface above. `steps` and `output` return snapshots.

`Step` becomes `JournalStep`. `Channels` collapses into the class’s private console snapshot and does not become a second public entity. `JOURNAL` is excluded because a process-wide mutable singleton and its `afterEach` lifecycle are supervisor test policy.

Tests cover inactive recording, fresh watch state, step ordering, output formatting, forwarding to original console functions, uncaught error, rejected promise, repeated watch, repeated release, restoration by identity, and returned snapshot isolation.

The guide gains “Record a browser journal,” a `JournalInterface` method table, failure/output formatting, and a `try/finally` release example.

## HTTP fixtures

Adopt `ApplicationCookieJar` as `CookieJar`.

```ts
export interface CookieJarInterface {
	readonly header: string | undefined
	get(name: string): string | undefined
	capture(response: Response): readonly string[]
}
```

`CookieJarInterface` lands in `src/server/types.ts`. `CookieJar` lands in `src/server/CookieJar.ts`, implements the interface, and is exported through `@orkestrel/test/server`.

Tests use real `Response` objects and cover an empty jar, several cookies, replacement, empty values, attributes, `Max-Age=0` deletion with casing and spacing variants, malformed fields, returned wire fields, and request-header ordering.

The guide gains “Replay response cookies” under Server, plus `CookieJarInterface` Surface and Methods tables. It must state that the jar is name-based and intended for controlled test fixtures; it does not implement domain/path selection or persistence.

`ApplicationCookieJar` does not survive under its original name because the `Application` prefix is supervisor residue.

## Vue-coupled helpers

| Helper | Ruling |
|---|---|
| `waitForBrowserState` | Collapse into `waitForCondition` with a browser-appropriate description and options. |
| `mountComponent` | Exclude. |
| `createContextApp` | Exclude. |

`waitForBrowserState` does not survive as an export because its framework-free form is exactly `waitForCondition`.

`mountComponent` is excluded because implementing its component contract requires Vue, and adding Vue is forbidden.

`createContextApp` is excluded because creating a Vue application requires Vue, and adding Vue is forbidden.

## Scratch destroy retry

Adopt:

```ts
export function destroyScratch(
	scratch: ScratchInterface,
	options?: WaitOptions,
): Promise<void>
```

It lands in `src/server/helpers.ts`. It defaults to a 10,000 ms timeout and a 25 ms interval. It retries `scratch.destroy()` until success, measures elapsed time with `performance.now()`, and throws:

```text
Scratch directory was not destroyed within <timeout>ms
```

The final host error is attached as `cause`. It does not use `waitForCondition`, because converting the thrown removal error into a boolean would discard the diagnostic boundary.

`ScratchInterface.destroy()` remains synchronous. Changing it to a promise would be a breaking contract change and would turn un-awaited failures into rejected promises. [17]

Tests cover immediate success, transient throws followed by success, timeout with final cause, validation, no retry after success, and real destruction. The Windows held-directory case depends on Wave A’s `createScratch().link` outcome and needs a Windows run.

The guide adds `destroyScratch` beside `createScratch`, explains when the asynchronous retry is needed, and keeps ordinary `scratch.destroy()` as the default cleanup.

`destroyApplicationScratch` does not survive under its original name because `Application` is supervisor residue; its adopted form is `destroyScratch`.

## Inventory remainder

Supervisor’s policy setup remains outside the package surface. Its helpers encode the scaffold policy canon, and publishing the TypeScript-backed inspectors would also require TypeScript as a runtime dependency. `setupPolicy` helpers are excluded because they encode scaffold policy or require a forbidden runtime dependency.

Supervisor’s guide setup remains local because its specifiers, paths, and manifest describe supervisor. `setupGuides` helpers are excluded because they encode supervisor’s package and guide layout.

Supervisor’s service setup remains local apart from `retryUntil`. Its provider names, model selection, Ollama endpoint, prompt, and readiness policy describe supervisor’s service campaign. The remaining `setupService` helpers are excluded because they encode supervisor service policy.

Supervisor’s browser-server setup remains local because its tokens, environment overlay, app entrypoints, and provided integration seam describe supervisor. `setupBrowserServer` helpers are excluded because they encode supervisor application policy.

# Alternatives

| Family | Alternative | Ruling |
|---|---|---|
| Wait | Keep positional `(condition, timeout, interval)` and an optional label. | Rejected. A required description enforces the failure law, and `WaitOptions` keeps option members single-word. |
| Wait | Return `false` on timeout. | Rejected. A silent false moves the useful failure away from the wait. |
| Wait | Permit only synchronous predicates. | Rejected. It would force fetch, stat, and query callers back to local loops. |
| Retry | Merge `retryUntil` into `waitForCondition`. | Rejected. Producer attempts and elapsed predicate polling return different results and have different limits. |
| Events | Import `@orkestrel/emitter` types. | Rejected. The package does not declare that dependency. The subscription callback shape remains structurally compatible. |
| Process | Publish generic process wrappers in `@orkestrel/test`. | Rejected. `@orkestrel/process` owns process creation, exit, environment, and stopping. |
| Accessibility | Replace `resolveAccessible` with the manual DOM resolver. | Rejected. The browser provider remains the authoritative query engine; manual helpers are inspection only. |
| Accessibility | Exclude the inspection layer because its supervisor maps are partial. | Rejected. The user ruled reusable logic in; the maps must be generalized and checked against Chromium. |
| Visual | Make white fallback unconditional. | Rejected. It would weaken the existing strict `contrast()` contract. |
| Visual | Keep `readContrast` beside `contrast`. | Rejected. They name one concept. |
| Visual | Rename the existing textual `readFocus`. | Rejected. That would break an established API. Focus contrast becomes `readRing`. |
| Capture | Keep `captureFrame` independent from `createPortfolio`. | Rejected. Portfolio writes must use the same pane and byte-verification engine. |
| DOM | Publish selector/ID action helpers beside accessible actions. | Rejected. Public acting verbs remain accessibility-driven. |
| Journal | Extend `RecorderInterface` with console and step state. | Rejected. It would mix callback recording with browser lifecycle ownership. |
| Journal | Publish the `JOURNAL` singleton. | Rejected. A mutable singleton imports supervisor hook policy into every consumer. |
| Cookies | Place `CookieJar` in core. | Rejected. Browser fetch cannot observe `Set-Cookie`; the useful contract is server-side. |
| Vue | Add Vue as a peer or dev dependency. | Rejected. The user forbids a dependency addition. |
| Scratch | Make `ScratchInterface.destroy()` asynchronous. | Rejected. It is a breaking behavioral change and creates silent rejected-promise risk. |
| Scratch | Use `waitForCondition` around caught errors. | Rejected. It would replace the final filesystem error with a boolean timeout. |

# Units

The browser units must run serially because the architecture centralizes their helpers and types into shared files. [20]

| Unit | Role and engine | Ownership | Dependencies | Acceptance criteria |
|---|---|---|---|---|
| Core contracts and waits | Implementer — GPT-5.6 Sol | `src/core/types.ts`, `src/core/helpers.ts`, `tests/src/core/helpers.test.ts` | None | Lands types first; implements `waitForCondition`, `waitForEvent`, `retryUntil`, and `decodeJSONLines`; scoped core check and tests pass; no Vitest runtime import. |
| Server process/socket/cookie | Implementer — GPT-5.6 Sol | `src/server/types.ts`, `src/server/helpers.ts`, `src/server/CookieJar.ts`, server barrel, matching server tests | Core unit | Implements `hasProcess`, `waitForSocketClose`, and `CookieJar`; does not duplicate `@orkestrel/process`; server ESM/CJS builds pass. |
| Scratch retry | Implementer — GPT-5.6 Sol | `src/server/helpers.ts`, scratch tests | Core unit; Wave-A Windows scratch outcome | Implements `destroyScratch` without changing `ScratchInterface.destroy`; final cause is preserved; Windows proof runs when Wave A makes the fixture available. |
| Browser accessibility and DOM | Implementer — GPT-5.6 Sol | Browser types/constants/helpers and browser helper tests for accessibility, querying, storage, and arrivals | Core unit | Generalizes the maps; preserves provider-based acting verbs; replaces local selector actions with the existing accessibility layer; Chromium comparisons pass. |
| Browser visual layer | Implementer — GPT-5.6 Sol | Browser types/constants/helpers and visual tests, after the preceding browser unit | Browser accessibility and DOM | Refactors `contrast` through tint primitives; preserves strict default behavior; adds `readRing`; no `readFocus` collision. |
| Browser capture | Implementer — GPT-5.6 Sol | Browser types/constants/helpers/factories and capture tests, after visual work | Browser visual layer | Adds pane lifecycle and byte verification; `createPortfolio.place` delegates to `captureFrame`; release runs on every path. |
| Browser journal | Implementer — GPT-5.6 Sol | Browser types, `Journal.ts`, barrel, journal and arrival tests, after capture work | Browser capture | Implements interface first; restores console and listeners by identity; exports no singleton. |
| Guide and parity | Documentation implementer — GPT-5.6 Sol | `guides/test.md`, `tests/guides.test.ts`, guide inventory/parity data | All implementation units | Documents every export and method, updates examples and Voices, removes superseded count exclusions, and passes guide parity. |
| Release integration | Reviewer — GPT-5.6 Sol | `package.json`, lockfile, distribution artifacts, final verification only | All preceding units | Sets 0.0.8, runs format check, lint check, type checks, builds, source tests, policy/config/guide tests, and verifies core/server CJS plus browser ESM package resolution. |

# Tensions

| Family | Tension and resolution |
|---|---|
| Wait | The generic architecture law rejects polling, while the test-specific rule explicitly requires bounded condition polling. The specific test rule and the user’s scheduled ruling control this test helper. [3][5][19] |
| Retry | The guide excludes `retryUntil` only by consumer count. The user explicitly removed consumer count as a gate, so that guide row must change. [19] |
| Process | Supervisor’s close wait has useful semantics, but `@orkestrel/process.ProcessInterface.exit` already settles on stdio close. Adoption into test would violate ecosystem ownership. [8][18] |
| Accessibility | Supervisor’s comments describe maps scoped to its interface, while a public package needs package-neutral coverage. Generalization and real Chromium parity are acceptance requirements, not optional hardening. [11] |
| Accessibility | Manual accessible-name computation cannot become the acting engine without competing with the installed browser provider. Inspection and interaction therefore remain separate operations in one documented layer. [10][11] |
| Visual | Supervisor assumes a white canvas, while `contrast()` deliberately rejects a completely unpainted chain. The optional `canvas` parameter preserves the strict default and admits the supervisor behavior explicitly. [10][12] |
| Visual | `readFocus` already means focused text, while supervisor uses it for focus contrast. `readRing` owns visual focus measurement. [10][12] |
| Capture | `createPortfolio` records provider paths but does not verify bytes or unscale the tester pane. Delegation to `captureFrame` consolidates the write path. [10][13] |
| DOM | Supervisor’s `data-row`, ID, and `aria-label` actions conflict with the package guide’s accessibility-driven acting contract. Those actions collapse or remain supervisor-local. [10][14] |
| Journal | A shared singleton is convenient for supervisor’s global setup, but a library singleton would leak state across suites. The constructible `Journal` is adopted without `JOURNAL`. [15] |
| Cookies | The adopted jar is intentionally narrower than an RFC cookie store. Its guide must state the name-only controlled-fixture boundary. |
| Vue | The reusable settlement need can be met by `waitForCondition`; component mounting cannot be made framework-free without ceasing to be component mounting. [16] |
| Scratch | Supervisor’s asynchronous 10-second retry exceeds `removeTree`’s synchronous retry and addresses a later host-release window. A separate helper preserves the synchronous interface. [8][17] |
| Documentation | The guide’s Limits section contradicts the authoritative adoption ruling for condition waits, retries, and browser helpers. The parity unit must rewrite those decisions, not append contradictory prose. [19][22] |

# Risks

| Family | Risk | Control |
|---|---|---|
| Wait | An asynchronous predicate can itself exceed the timeout. | Check elapsed time after each awaited evaluation; document that in-flight work is not cancelled. |
| Wait | Zero intervals can create aggressive timer churn. | Continue yielding through `waitForDelay(0)`; never recurse through microtasks. |
| Events | A subscriber that offers no cleanup can leave its listener installed after timeout. | Make `EventSubscriber` return an optional synchronous cleanup and document that timeout cleanup depends on it. |
| Retry | Retrying a producer with side effects can repeat committed work. | Document that callers must use idempotent operations or predicates that recognize prior completion. |
| Process | PID reuse can make arbitrary-PID liveness stale immediately after return. | Document `hasProcess` as an instantaneous observation, not ownership. |
| Process | Linux zombie detection depends on `/proc` format and availability. | Keep the guarded fallback and require a Linux run. |
| Socket | Treating every error as a forced close would conceal protocol failures. | Accept only `ECONNRESET`; reject other errors and bound the wait. |
| Accessibility | A hand-maintained implicit-role/name subset can drift from Chromium and ARIA. | Compare representative cases with the browser provider and document inspection limits. |
| Accessibility | `checkVisibility()` support or behavior may vary by browser. | Keep browser-project coverage on each supported provider before widening support claims. |
| Visual | CSS color syntax can expand beyond `rgb`, `rgba`, and `color(srgb)`. | Return `undefined` for unsupported syntax and fail at the reading boundary. |
| Visual | Browser-native focus rings may not expose measurable computed colors. | Preserve `undefined` for native rings and document that absence. |
| Capture | Tester-pane selectors are coupled to Vitest browser-runner markup. | Fail with a named pane error and pin the behavior with the installed Vitest version’s real runner. |
| Capture | Byte readback relies on the browser command channel. | Run capture tests in `@vitest/browser-playwright`; do not claim verification from unit-only tests. |
| DOM | General text and class selectors can be misused for acting tests. | Keep them documented as inspection helpers; acting APIs continue to accept accessible names. |
| Journal | A failed test can leave console interception active. | Require `try/finally` or teardown registration in the guide; keep `release()` idempotent. |
| Journal | `unhandledrejection` behavior can vary with browser timing. | Use the real browser event and wait for one frame before assertion. |
| Cookies | Name-only storage mishandles same-name cookies with different paths or domains. | State the controlled-fixture limit and do not advertise general browser-cookie fidelity. |
| Vue | Consumers may expect `recordArrival` to settle their framework scheduler. | Define settlement only as condition success plus a browser frame; framework-specific ticks remain consumer-owned. |
| Scratch | A 10-second retry can mask a permanently held directory until timeout. | Preserve the last host error as cause and keep the timeout configurable. |
| Scratch | Wave A may change Windows link or removal behavior. | Land `destroyScratch` after Wave A and rerun the held-directory proof on Windows. |
| Release | The enlarged surface can drift across types, barrels, guide, ESM, and CJS outputs. | Make distribution resolution and guide parity mandatory release acceptance criteria.