# Report — `d7n-test-prep`

Wall clock: 2026-09-07T14:59:45Z → 2026-09-07T15:04:53Z.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

Summary line:
```
0 of 46 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 12.
tsconfig.json replaced (3 lines added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (404 lines added).
9 written, 38 unchanged, 0 removed in ..
```

`git status --short` after:
```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```
Matches the P21 list exactly.

## Item 2 — drop-in adaptation (`tests/guides.test.ts`)

The check error at `tests/guides.test.ts(274,25)` and `(275,25)` (`MethodEntry[]` not assignable to `readonly string[]`) named the site. This file carries no `findDrift`/`findUnexampled` call and no `source.examples()` call, so bullets naming those (item 2's examples-case and examples-loop bullets) name no site here; only the methods-loop bullet applies. The `findMissing(routed, discovered)` family at lines 379–382 (already string arrays) stays unchanged, per item 2's last bullet.

Hunk:
```diff
			it('documents every public method on implementing interfaces', () => {
				for (const group of guide.methods()) {
-					const documented = [...group.methods]
-					const actual = [...source.methods(group.interface)]
+					const documented = group.methods.map((method) => method.name)
+					const actual = source.methods(group.interface).map((method) => method.name)
					expect(findMissing(documented, actual)).toEqual([])
					expect(findMissing(actual, documented)).toEqual([])
				}
			})
```

## Item 3 — voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 named the same 9 diagnostics as P20's standing-condition reading (6 `no-malformed-summary`, 3 `no-banned-term`), in the same files (`src/server/helpers.ts`, `tests/setupServer.ts`, `tests/src/browser/helpers.test.ts`, `tests/setup.ts`). None named an off-limits file.

`src/server/helpers.ts:156` — `no-banned-term` (`just`):
```diff
- * @remarks On Windows, a directory that a just-exited process still holds as its current
+ * @remarks On Windows, a directory that a recently exited process still holds as its current
```

`src/server/helpers.ts:387` — `no-banned-term` (`just`):
```diff
- * directory for a short interval after the process that held it exits, and a just-stopped child's
+ * directory for a short interval after the process that held it exits, and a recently stopped child's
```

`tests/setupServer.ts:14,17,20,23,26` — `no-malformed-summary` (noun-phrase `Whether …` opener):
```diff
-/** Whether this host links a file, as {@link supportsFileLinks} reads it. */
+/** Reports whether this host links a file, as {@link supportsFileLinks} reads it. */
-/** Whether this host links a directory, as {@link supportsDirectoryLinks} reads it. */
+/** Reports whether this host links a directory, as {@link supportsDirectoryLinks} reads it. */
-/** Whether this host stores POSIX permission bits, as {@link supportsMode} reads it. */
+/** Reports whether this host stores POSIX permission bits, as {@link supportsMode} reads it. */
-/** Whether this host distinguishes filenames by case, as {@link supportsCase} reads it. */
+/** Reports whether this host distinguishes filenames by case, as {@link supportsCase} reads it. */
 /**
- * Whether this host accepts a filename carrying a raw byte no UTF-8 decoder resolves, as
+ * Reports whether this host accepts a filename carrying a raw byte no UTF-8 decoder resolves, as
  * {@link supportsBytes} reads it.
  */
```

`tests/src/browser/helpers.test.ts:1935` — `no-banned-term` (`just`):
```diff
-		// plus 900, so it converges on 1800 and never reaches it by restaging at the height just
+		// plus 900, so it converges on 1800 and never reaches it by restaging at the height last
```

`tests/setup.ts:59` — `no-malformed-summary` (noun-phrase `The …` opener):
```diff
-/**
- * The `guides/test.md` fences carried outside `tests/guides.test.ts`, keyed by the `###` heading
- * that owns the fence and valued by the test file that runs it.
+/**
+ * Names the `guides/test.md` fences carried outside `tests/guides.test.ts`, keyed by the `###`
+ * heading that owns the fence and valued by the test file that runs it.
```

`npm run test:policy` after the `oxlint` fixes named a `prose` rule hit at `guides/test.md` lines 730, 739, 2027, 2817 — the same four the standing conditions listed. Each carried the banned term `just`; each is fixed by that row alone, nothing else on the line:

```diff
-seeded after the directory exists, so a refused key removes the directory that was just made and
+seeded after the directory exists, so a refused key removes the directory that was recently made and
```
```diff
-directory it just made and rethrows when a key escapes or the host refuses a write.
+directory it recently made and rethrows when a key escapes or the host refuses a write.
```
```diff
-directory a just-exited child held as its working directory: `removeTree` retries that removal ten
+directory a recently exited child held as its working directory: `removeTree` retries that removal ten
```
```diff
-  fixed 900-row block converges on 1800 without ever reaching it by restaging at the height just
+  fixed 900-row block converges on 1800 without ever reaching it by restaging at the height last
```

## Item 4 — the bump

```diff
-	"version": "0.0.13",
+	"version": "0.0.14",
```
`package-lock.json` untouched.

## Acceptance criteria

1. `git status --short`:
```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M guides/test.md
 M package.json
 M src/server/helpers.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/setupServer.ts
 M tests/src/browser/helpers.test.ts
 M tsconfig.json
?? scripts/docs.ts
```
This is the P21 repair list plus `tests/guides.test.ts` (item 2) plus the files item 3 edited (`src/server/helpers.ts`, `tests/setupServer.ts`, `tests/src/browser/helpers.test.ts`, `tests/setup.ts`, `guides/test.md`), plus `package.json` (already in the repair list, now also carries the version bump). Nothing else.

2. `npm run format:check` — last lines: `All matched files use the correct format. Finished in 3682ms on 60 files using 4 threads.` Exit 0. No `npm run format` needed; the edits already matched formatter output.
   `npx oxlint --config .oxlintrc.json --deny-warnings .` — no output, exit 0.
   `npm run check` — ran `tsc --noEmit --project tsconfig.json` then `check:src:core`, `check:src:browser`, `check:src:server`, each with no diagnostics. Exit 0.

3. `npm run test:guides` — `Test Files 1 passed (1)`, `Tests 40 passed (40)`. Exit 0.
   `npm run test:policy` — `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`. Exit 0.
   `npm run test:config` — `Test Files 1 passed (1)`, `Tests 172 passed | 1 skipped (173)`. Exit 0.

4. `npm run docs` — exit 1 (expected), full worklist verbatim:
```
guides/test.md interface WaitOptions: guide absent source "Configures a bounded asynchronous wait."
guides/test.md interface RetryOptions: guide absent source "Configures a bounded retry."
guides/test.md type EventSubscriber: guide absent source "Subscribes a listener to one event source."
guides/test.md interface RecorderInterface: guide absent source "Records every call made to its handler."
guides/test.md interface EventSourceInterface: guide absent source "Subscribes handlers to a typed event source."
guides/test.md type RecorderMap: guide absent source "Maps event names to recorders for their delivered argument tuples."
guides/test.md interface Success: guide absent source "Represents one operation that produced a value."
guides/test.md interface Failure: guide absent source "Represents one operation that raised a failure instead of producing a value."
guides/test.md type Result: guide absent source "Represents the outcome of one operation: the value it produced, or the failure it raised."
guides/test.md interface SignalInterface: guide absent source "Holds a real abort signal and controller instrumented with its live abort-listener tally."
guides/test.md type SignalRegistration: guide absent source "Represents one abort listener an instrumented signal installed, as its tally holds it."
guides/test.md interface ResourceFactoryInterface: guide absent source "Represents a numbered resource factory with records of every creation and destruction."
guides/test.md interface TeardownInterface: guide absent source "Represents the cleanup a test adds as it goes and runs once, newest first, when it is done."
guides/test.md type TeardownHandler: guide absent source "Represents the work one teardown entry performs when the list is destroyed."
guides/test.md type JSONValue: guide absent source "Covers any value JSON can represent, so a round trip through JSON preserves the type."
guides/test.md type JSONSafe: guide absent source "Represents the JSON-safe projection of a type: every member JSON preserves, mapped to itself, and every member it does not, mapped to `never`."
guides/test.md type HeadersSource: guide absent source "Covers any value the host `Headers` constructor accepts."
guides/test.md interface StateTransition: guide absent source "Represents one row of a statechart table: the entity's state before an event, the event, and the state that event must leave it in."
guides/test.md interface StateScenario: guide absent source "Drives one `StateTransition` through the three phases that prove it."
guides/test.md const STATECHART_ATTRIBUTES: guide "The `data-statechart-*` attribute name carrying each fact a harness publishes." source "Names the attributes a statechart harness publishes, keyed by the fact each one carries."
guides/test.md const STATECHART_STATUSES: guide "Every value the `status` attribute carries, in the order a run passes through them." source "Lists every value a statechart harness reports through its `status` attribute."
guides/test.md function isRecorderMapComplete: guide "Whether a value carries a structurally valid recorder for every listed event." source "Checks whether a value contains a recorder for every listed event."
guides/test.md function waitForCondition: guide "Reads until a condition holds within a monotonic budget." source "Waits until a condition holds within an elapsed-time budget."
guides/test.md function retryUntil: guide "Produces until a value satisfies a predicate or a bound." source "Repeats a producer until one produced value satisfies a predicate."
guides/test.md function waitForEvent: guide "Parks until the first event delivery, timeout, or abort." source "Waits for the first delivery from an event subscription."
guides/test.md function checkBounds: guide "Refuses a resolved bound that is not finite and non-negative." source "Checks the resolved bounds one bounded wait runs under."
guides/test.md function buildRetryExhausted: guide "The exhaustion error `retryUntil` raises, built unthrown." source "Builds the error `retryUntil` raises when its elapsed-time budget runs out."
guides/test.md function dropRegistration: guide "Drops one instrumented abort registration and aborts its cleanup." source "Drops the registration an instrumented signal installed for one listener."
guides/test.md function decodeJSONLines: guide "Decodes non-empty JSON Lines in physical-line order." source "Decodes newline-delimited JSON values."
guides/test.md function waitForDelay: guide "Waits for a real host timer; defaults to `0`." source "Waits for a host timer to elapse."
guides/test.md function waitForAbort: guide "Parks on a signal's abort; an aborted signal resolves at once." source "Waits until an abort signal is aborted."
guides/test.md function captureError: guide "Runs a synchronous thunk and returns whatever it threw." source "Captures the value thrown by a thunk."
guides/test.md function requireValue: guide "Narrows away `null` and `undefined` by throwing." source "Requires a value to be present."
guides/test.md function collect: guide "Drains an async iterable into an array, in iteration order." source "Collects every value from an async iterable."
guides/test.md function collectStream: guide "Drains a readable stream into an array, in read order." source "Collects every value from a readable stream."
guides/test.md function roundTripJSON: guide "Copies a JSON value; throws on a non-finite number." source "Copies a JSON value through serialization and parsing."
guides/test.md function invokeUnchecked: guide "Calls an unknown method under a return type the caller claims." source "Invokes an unknown method through an explicit unchecked result contract."
guides/test.md function readProperty: guide "Reads a property off an unknown value under the same claim." source "Reads a property from an unknown object or function."
guides/test.md function flattenHeaders: guide "Normalizes any header initializer into a frozen plain record." source "Normalizes headers into a frozen plain record."
guides/test.md function resolveRoot: guide "The URL one directory above the calling module's own file." source "Resolves the parent directory of a calling module, which is the workspace root when called from the conventional `tests/setup.ts` location."
guides/test.md function executeScenario: guide "Drives one row through arrange, act, and assert." source "Drives one statechart scenario through its arrange, act, and assert phases."
guides/test.md function executeScenarios: guide "Drives a table row by row, each row against its own context." source "Drives a statechart table row by row, each row against a context of its own."
guides/test.md function createHostileValues: guide "Fresh hostile values for proving that a guard is total." source "Creates values that make common object readers throw or violate their assumptions."
guides/test.md function createRecorder: guide "A recorder whose `handler` appends each call, in order." source "Creates a recorder for callback arguments."
guides/test.md function createRecorders: guide "One recorder per named event, each subscribed to the source." source "Creates event recorders and subscribes them to the source."
guides/test.md function createSignal: guide "A real controller whose signal reports its live abort listeners." source "Creates a real abort controller whose signal reports its live abort listeners."
guides/test.md function createResourceFactory: guide "Numbered resources with every creation and destruction recorded." source "Creates a monotonically numbered resource factory with creation and destruction records."
guides/test.md function createTeardown: guide "A cleanup list that runs newest-first when it is destroyed." source "Creates a teardown list that runs registered handlers newest-first."
guides/test.md type Color: guide absent source "Represents one rendered color as straight sRGB channels and its alpha."
guides/test.md interface ElementOptions: guide absent source "Configures one built element."
guides/test.md interface FrameOptions: guide absent source "Configures one captured frame."
guides/test.md interface FrameReading: guide absent source "Represents one written frame, read back from the file a capture produced."
guides/test.md interface CaptureVariant: guide absent source "Represents one theme-and-viewport pair a capture run renders."
guides/test.md interface PortfolioOptions: guide absent source "Configures a capture portfolio."
guides/test.md interface PortfolioInterface: guide absent source "Holds the registry of capture states one run places, and the files it wrote placing them."
guides/test.md interface JournalStep: guide absent source "Represents one scripted step a journal recorded, and what the surface did about it."
guides/test.md interface JournalInterface: guide absent source "Records one scenario: every step it took and everything the page said while it ran."
guides/test.md const ACCESSIBLE_ROLES: guide "The interactive roles a bare accessible name is searched across." source "Names the interactive ARIA roles a bare accessible name is searched across."
guides/test.md const CANVAS_COLOR: guide "Opaque white: the page a browser paints an unstyled document onto." source "Names the color a browser paints an unstyled document with."
guides/test.md const CAPTURE_PANE: guide "The attribute marking the runner's tester pane, and the rule sizing it; that rule carries the viewport the release hands back." source "Names the attribute marking the runner's tester pane, and the rule that sizes it, while a frame is staged."
guides/test.md const CAPTURE_STAGINGS: guide "The restagings one capture takes before it refuses a document whose height never settles." source "Bounds the restagings one capture takes before it refuses a document whose height never settles."
guides/test.md const CONTENT_ROLES: guide "The roles `readName` names from the text a reader can see inside them." source "Names the roles whose accessible name is the text a reader can see inside them."
guides/test.md const FIELD_ROLES: guide "The role each `input` type carries; a type it omits exposes none." source "Names the role each `input` type carries."
guides/test.md const FOCUSABLE_SELECTOR: guide "What sequential keyboard navigation can reach, before the removals `describeFocus` applies." source "Names what sequential keyboard navigation can reach, before disabled and unrendered elements go."
guides/test.md const HEADER_ROLES: guide "The role a `th` carries for the `col` or `row` axis its `scope` names." source "Names the role a `th` carries for the header axis its `scope` names."
guides/test.md const IMPLICIT_ROLES: guide "The role each listed tag carries when it declares none. Membership is the contract: a tag it omits is written into no description." source "Names the role each listed tag carries in the accessibility tree when it declares none of its own."
guides/test.md function resolveAccessible: guide "One visible, focus-reachable control, scrolled into view once before reachability is measured." source "Resolves one visible, focus-reachable interactive element by its exact accessible name. A wholly-off-viewport target is scrolled into view before reachability is measured."
guides/test.md function resolveRendered: guide "The same resolver without the viewport requirement; the acting verbs use it." source "Resolves one rendered, focus-reachable interactive element without requiring it to intersect the viewport yet."
guides/test.md function computeNamePattern: guide "The pattern the hidden pass matches a name with, tolerating a decorative glyph at either edge." source "Computes the pattern that matches one accessible name a decorative glyph may sit beside."
guides/test.md function isOutsideViewport: guide "Whether a measured rectangle lies wholly outside the viewport." source "Determines whether a rectangle lies wholly outside the browser viewport."
guides/test.md function isRendered: guide "Whether the accessibility tree presents the element at all; no geometry is read, so a zero-size announced control passes." source "Determines whether the accessibility tree presents one element at all."
guides/test.md function isReachable: guide "Whether a person can click the element where it sits; the one reachability filter every acting verb applies." source "Determines whether a person can click one element where it sits."
guides/test.md function clickAccessible: guide "Trusted activation of one resolved control." source "Clicks one visible, focus-reachable control by its accessible name through the browser provider."
guides/test.md function clickAccessibleWithin: guide "Trusted activation inside one named region, matching the control's name loosely." source "Clicks one human-reachable control by role and accessible-name text inside a named region."
guides/test.md function clickDisclosure: guide "Trusted activation of a native `<summary>`, which carries no role locators accept." source "Opens or closes one native details disclosure by its rendered summary."
guides/test.md function typeAccessible: guide "Focus, select all, delete, then real keystrokes, with the provider's key syntax escaped." source "Replaces a named field's value through focus, select-all, deletion, and real keystrokes."
guides/test.md function fillAccessible: guide "Replaces a value in one operation, for text too long to type." source "Replaces a named field's value in one operation, for text too long to type key by key."
guides/test.md function traverseAccessible: guide "Forward Tab alone, until focus lands on the re-resolved target." source "Reaches a named control only through natural forward Tab traversal from the current focus."
guides/test.md function readPerception: guide "The normalized `innerText` of exactly one visible named region, dialog, table, panel, or alert." source "Reads the normalized visible text of one named region, dialog, table, tab panel, or alert."
guides/test.md function readPage: guide "The normalized `innerText` of the whole page." source "Reads the normalized visible text of the whole page."
guides/test.md function readFocus: guide "The focused HTML element's rendered text (`''` included); `undefined` for a non-HTML focus; the whole page's text when nothing holds focus." source "Reads the rendered text of the element that holds focus."
guides/test.md function readValue: guide "The value a resolved input, textarea, or select renders." source "Reads the value a resolved control renders."
guides/test.md function readText: guide "The element's rendered text with every `aria-hidden` descendant dropped and its whitespace runs collapsed." source "Reads one element's rendered text the way a name computation reads it."
guides/test.md function readRole: guide "The declared role, the implicit one, or `undefined` when the element carries none." source "Reads the role one element carries in the accessibility tree."
guides/test.md function readName: guide "The accessible name, computed in the order a browser computes it; an empty string when nothing names the element." source "Reads the accessible name one element is announced under."
guides/test.md function readStates: guide "Every state the element declares, in one fixed order." source "Reads the states one element is announced in."
guides/test.md function describeTree: guide "One indented line per roled element, naming its role, its name, and its states; indentation follows the roles rather than the markup." source "Describes the accessible tree one rendered element presents."
guides/test.md function describeFocus: guide "One numbered line per reachable control, a positive `tabindex` first in ascending order and everything else in document order." source "Describes the order sequential keyboard navigation visits one element's controls in."
guides/test.md function waitForFrame: guide "One `requestAnimationFrame`, to settle pending paint work." source "Waits for one animation frame to settle pending browser paint work."
guides/test.md function build: guide "One unmounted element of exactly that tag, carrying its classes, text, and attributes." source "Builds one unmounted element of a known tag, wearing the classes, text, and attributes asked for."
guides/test.md function mount: guide "Appends an element to the document and hands the same element back." source "Puts one element into the document and hands it straight back."
guides/test.md function render: guide "Trusted fixture markup in an attached container, or one attached element of that tag." source "Renders one fixture into the document from trusted markup."
guides/test.md function typeInput: guide "Sets a field's value and dispatches one bubbling `input` event, a plain `Event` rather than an `InputEvent`." source "Sets one field's value and announces it the way typing into the field does."
guides/test.md function commitInput: guide "Sets a field's value, then dispatches `input` and `change`, in that order." source "Sets one field's value and commits it, the way typing and then leaving the field does."
guides/test.md function clearStorage: guide "Empties local and session storage together, for an `afterEach` hook that runs after a failed test too." source "Clears both browser storage surfaces."
guides/test.md function removeDatabase: guide "Deletes one IndexedDB database; rejects on an error and on a block." source "Deletes one IndexedDB database and reports what the request actually did."
guides/test.md function parseColor: guide "One computed `rgb()`, `rgba()`, or `color(srgb …)` value as straight channels; `undefined` for anything else." source "Parses one computed CSS color value into straight sRGB channels."
guides/test.md function parseCSSColor: guide "Any CSS color expression resolved to channels by the real cascade; `undefined` when the CSSOM refuses it." source "Resolves any CSS color expression to straight sRGB channels, by asking the browser."
guides/test.md function matchesColor: guide "Whether two colors render the same, within half a channel step." source "Determines whether two colors render the same, within the rounding a browser does."
guides/test.md function blendColor: guide "One color composited over another, always opaque." source "Composites one color over another."
guides/test.md function measureLuminance: guide "One opaque color's WCAG relative luminance, from `0` to `1`." source "Measures one opaque color's WCAG relative luminance."
guides/test.md function measureContrast: guide "The WCAG 2.x ratio between two opaque colors, from `1` to `21`." source "Measures the WCAG 2.x contrast ratio between two opaque colors."
guides/test.md function readLayers: guide "Every painted layer between the element and its first opaque ancestor, that ancestor last; an unpainted stack is empty." source "Collects the painted layers standing between one element and the surface it sits on."
guides/test.md function readBackdrop: guide "The opaque color behind an element, every translucent layer composited onto the required floor." source "Resolves the opaque color standing behind one element."
guides/test.md function readContrast: guide "The WCAG 2.x ratio for one element's text; an omitted floor refuses an unpainted stack and a supplied one composites onto it." source "Measures the WCAG 2.x contrast ratio between an element's computed text and background colors."
guides/test.md function readRing: guide "The ratio the painted focus chrome reaches against its backdrop; `undefined` off `:focus-visible` or with no painted chrome." source "Measures the contrast the focus chrome painted on one control reaches against its own backdrop."
guides/test.md function measureContent: guide "The row the document's own content ends on, rounded up; the same reading under a pane taller than the document as under a shorter one." source "Measures the row the document's own content ends on, in document coordinates."
guides/test.md function stagePane: guide "Sets the viewport and renders the runner's tester pane at that size, unscaled." source "Sets the tester's viewport and renders the runner's pane at the size that viewport claims."
guides/test.md function releasePane: guide "Hands the staged pane back to the runner's own layout, at the viewport the tester had before staging." source "Hands the tester pane back to the runner's own layout, at the viewport it had before staging."
guides/test.md function captureFrame: guide "Stages, shoots the whole document at that width, reads the file back, and returns the verified absolute path; releases the pane either way." source "Shoots one frame at one viewport size and proves the file on disk holds this run's bytes."
guides/test.md function readFrame: guide "One written frame's size in device pixels and the single color its bottom row paints; refuses a path holding no frame." source "Reads one written frame back and reports its size and the color its bottom row paints."
guides/test.md function readCascade: guide "Every class token the stylesheets loaded into this document define." source "Collects every class token the stylesheets loaded into this document actually define."
guides/test.md function readClasses: guide "Every class token the markup under one root carries, the root's own included." source "Collects every class token the markup under one root carries."
guides/test.md function readRules: guide "Every rule the loaded stylesheets hold, level by level, nested grouping rules included; a `@keyframes` rule is collected and its children are not." source "Collects every rule the stylesheets loaded into this document hold, nested grouping rules included."
guides/test.md function findRule: guide "The first style rule whose selector text carries a fragment." source "Finds the first style rule in the cascade whose selector carries a fragment."
guides/test.md function findKeyframes: guide "The animation the cascade declares under an exact name." source "Finds the animation the cascade declares under one name."
guides/test.md function readRows: guide "One line per matched element, built from its text nodes rather than from `textContent`." source "Reads the normalized visible text of every element a selector matches, in document order."
guides/test.md function extractOrphans: guide "The markup of every element carrying the `child` class with no `parent` class above it." source "Collects every element carrying a component class rendered outside the container it belongs to."
guides/test.md function extractStyles: guide "The markup of every element carrying an inline `style` and of every `<style>` element, the root itself included." source "Collects the markup of every element carrying a non-empty `style` attribute and of every `<style>` element, in document order, `root` included in both populations when it is an `Element`."
guides/test.md function readStyle: guide "One resolved CSS property, trimmed, read from the real browser." source "Reads one resolved CSS property from a real browser element."
guides/test.md function readToken: guide "One custom property off an element's resolved style, its dashes optional." source "Reads one custom property from an element's resolved style."
guides/test.md function readRootToken: guide "The same reading taken against the document element." source "Reads one custom property from the document element."
guides/test.md function readPixels: guide "One resolved length as a number of pixels; `0` when it carries none." source "Reads one resolved CSS length as a number of pixels."
guides/test.md function expandCaptures: guide "The registry times the variants, as `<state>--<variant>.png` names." source "Expands a capture registry across every variant into the filenames a complete portfolio holds."
guides/test.md function createPointerEvent: guide "One real pointer event carrying a browser's own defaults." source "Creates one real pointer event, ready to dispatch."
guides/test.md function createDragEvent: guide "One real drag event carrying a live data transfer." source "Creates one real drag event carrying a live data transfer, ready to dispatch."
guides/test.md function createPortfolio: guide "The capture registry one run places its screenshots through." source "Creates the capture portfolio one run places its screenshots through."
guides/test.md function createChannel: guide "One console channel that records every call it receives and forwards it unchanged." source "Creates one console channel that records every call it receives and hands that call on unchanged."
guides/test.md function createJournal: guide "The record of one scenario's steps and the page's own output." source "Creates the journal one scenario records its steps and the page's own output into."
guides/test.md interface ScratchInterface: guide absent source "Holds a temporary directory a test owns, writes into, reads back, and removes when it is done."
guides/test.md interface ScratchIdentity: guide absent source "Represents the fields that together identify one allocated directory on its host."
guides/test.md interface ScratchOptions: guide absent source "Configures a scratch directory allocation."
guides/test.md interface LoopbackInterface: guide absent source "Holds a server a test owns, listening on an ephemeral loopback port until the test releases it."
guides/test.md interface CookieJarInterface: guide absent source "Holds a name-keyed cookie store a test drives one origin with, filled from real responses."
guides/test.md interface InventoryOptions: guide absent source "Configures a source inventory read."
guides/test.md interface UpgradeOptions: guide absent source "Configures a client upgrade request."
guides/test.md type UpgradeResult: guide absent source "Represents what one server did with a client upgrade request."
guides/test.md const REMOVE_TREE_MAX_ATTEMPTS: guide "The attempts `removeTree` makes before rethrowing a retryable removal error." source "Caps the attempts `removeTree` makes before rethrowing a retryable removal error."
guides/test.md const REMOVE_TREE_RETRY_DELAY_MS: guide "The synchronous delay, in milliseconds, `removeTree` waits between attempts." source "Names the synchronous delay, in milliseconds, `removeTree` waits between attempts."
guides/test.md const REMOVE_TREE_RETRYABLE_CODES: guide "The removal error codes `removeTree` retries; every other code rethrows immediately." source "Names the error codes `removeTree` retries; every other code rethrows immediately."
guides/test.md function readInventory: guide "Named files and walked directories, keyed by root-relative path in sorted order." source "Reads files from selected targets below a root directory."
guides/test.md function resolveContained: guide "The absolute target below `root`, or `undefined` when it escapes." source "Resolves a target that stays below a root directory."
guides/test.md function requireContained: guide "The same resolution, refusing an escape with the message every scratch member spells." source "Resolves a target that stays below a root directory, refusing an escape."
guides/test.md function isExcluded: guide "Whether an exclusion names the key or one of its ancestors." source "Reports whether a root-relative key matches an exclusion."
guides/test.md function readIdentity: guide "The device, index node, and creation time read off one host status." source "Reads the identity of one allocated directory off a host status."
guides/test.md function matchesIdentity: guide "Whether two identities name the same allocation." source "Reports whether two directory identities name the same allocation."
guides/test.md function readErrorCode: guide "The string `code` an unknown thrown value carries, or `undefined` when it carries none." source "Reads the `code` an unknown thrown value carries."
guides/test.md function createLink: guide "Create a symbolic link, or a directory junction where the host refuses one." source "Creates a symbolic link with a directory-junction fallback for hosts that refuse symbolic links."
guides/test.md function removeTree: guide "Remove a directory tree, retrying a briefly-held handle before rethrowing." source "Removes a directory tree, retrying past a transient Windows handle-release race."
guides/test.md function isRunning: guide "Whether a process id names a live process at the moment of the call." source "Reports whether a process id names a live process."
guides/test.md function waitForSocketClose: guide "Wait for a socket's `close`, waiting past a peer reset." source "Waits for a socket to close, accepting a peer reset as a forced close."
guides/test.md function destroyScratch: guide "Destroy a scratch directory, retrying until the host releases it." source "Destroys a scratch directory, retrying until the host releases it."
guides/test.md function requestUpgrade: guide "Drives one client upgrade request within a budget and reports what the server did." source "Drives a real client upgrade request against a loopback port and reports what the server did."
guides/test.md function supportsDirectoryLinks: guide "Whether this host links a directory and reads through the link." source "Checks whether this host links a directory, by creating one link and reading through it."
guides/test.md function supportsFileLinks: guide "Whether this host links a file and reads the file through the link." source "Checks whether this host links a file, by creating one link and reading the file through it."
guides/test.md function supportsMode: guide "Whether POSIX permission bits round-trip through this host's `chmod` and `stat` calls." source "Checks whether POSIX permission bits round-trip through this host's `chmod` and `stat`."
guides/test.md function supportsCase: guide "Whether names differing only by case are distinct files on this host." source "Checks whether this host treats two names differing only by case as distinct files."
guides/test.md function supportsBytes: guide "Whether a filename carrying a raw non-UTF-8 byte is written and read back." source "Checks whether this host accepts a filename carrying a raw byte no UTF-8 decoder resolves."
guides/test.md function createScratch: guide "Allocates a directory below `parent` the caller owns and destroys." source "Allocates an owned temporary directory with contained file operations."
guides/test.md function createLoopback: guide "Binds a caller-supplied server to `127.0.0.1` on a host-picked port." source "Starts a server on an ephemeral IPv4 loopback port."
guides/test.md function createCookieJar: guide "Records a real response's cookies and replays them as one header." source "Creates a cookie jar that records a real response's cookies and replays them as one header."
guides/test.md RecorderInterface.clear: guide absent source "Discards the recorded calls and keeps the recorder usable."
guides/test.md EventSourceInterface.on: guide absent source "Subscribes a handler to an event."
guides/test.md ResourceFactoryInterface.create: guide absent source "Creates a numbered resource."
guides/test.md ResourceFactoryInterface.destroy: guide absent source "Destroys a numbered resource."
guides/test.md TeardownInterface.add: guide absent source "Registers a handler to run when the list is destroyed."
guides/test.md TeardownInterface.destroy: guide absent source "Runs every registered handler in reverse registration order, awaiting each in turn, and empties the list."
guides/test.md StateScenario.arrange: guide absent source "Puts the entity into the transition's `from` state."
guides/test.md StateScenario.act: guide absent source "Applies the transition's event to the arranged entity."
guides/test.md StateScenario.assert: guide absent source "Checks that the entity reached the transition's `to` state."
guides/test.md LoopbackInterface.destroy: guide absent source "Drops every live connection on a server that carries `closeAllConnections`, stops listening, and releases the port."
guides/test.md CookieJarInterface.read: guide absent source "Reads one stored cookie value."
guides/test.md CookieJarInterface.capture: guide absent source "Applies every `Set-Cookie` field a response carries."
guides/test.md PortfolioInterface.place: guide absent source "Places one registered state: applies the variant, stages the pane, and writes the verified screenshot."
guides/test.md JournalInterface.start: guide absent source "Starts a fresh recording, dropping whatever the previous scenario left."
guides/test.md JournalInterface.stop: guide absent source "Stops recording and hands every intercepted console channel back by identity."
guides/test.md JournalInterface.record: guide absent source "Records one step, when the journal is started."
guides/test.md ScratchInterface.write: guide absent source "Writes a file, creating each parent directory that does not exist."
guides/test.md ScratchInterface.read: guide absent source "Reads a file."
guides/test.md ScratchInterface.has: guide absent source "Reports whether a path exists without following its final symbolic link."
guides/test.md ScratchInterface.names: guide absent source "Lists the names directly inside a directory in sorted order."
guides/test.md ScratchInterface.ensure: guide absent source "Creates a directory and every missing parent."
guides/test.md ScratchInterface.link: guide absent source "Creates a symbolic link at a contained path, creating its missing parent directories."
guides/test.md ScratchInterface.remove: guide absent source "Removes a file, an empty directory, or a directory and its descendants."
guides/test.md ScratchInterface.destroy: guide absent source "Removes the allocated directory and everything in it when its identity still matches."
guides/test.md pitch: readme absent tagline "The test helpers the fleet kept rewriting, published once. They read as families of what a test records, what it waits for, and what it owns, with a pair outside all of them and a browser journey layer beside them. What a test records. A call recorder, a map of recorders subscribed to an emitter's events, a signal's live abort-listener tally, a numbered resource ledger, a captured throw, a drained async source, a JSON copy, a required value, a decoded JSON Lines stream, and a cookie jar filled from real responses. Each turns what the code under test did into a value you can assert on. What a test waits for. A real delay, and — each bounded by a budget, an interval, and an abort signal — a named condition, a produced value, a first event delivery, a socket's close, and a directory the host has finally let go. One wait takes no bound at all, because it needs none: `waitForAbort` parks on a signal's own abort. Nothing here replaces the host clock: every bound is a real elapsed interval read with `performance.now()`. What a test owns and must give back. A temporary directory, a cleanup list, and a loopback server, each carrying `destroy()`. Each one takes something from the host. `resolveRoot` and `readInventory` are the pair outside all of them: together they read the real tree a test checks itself against. Neither records anything, neither waits for anything, and neither owns anything to give back. `createHostileValues` sits outside them too, on the input side: it is what a test feeds its guards, a corpus whose every member throws on a naive read or violates a naive structural assumption. The host-capability probes are outside them on the environment side, answering what this filesystem does rather than what its platform is called. `invokeUnchecked` and `readProperty` are outside them at the type boundary, where a value nothing declares meets a claim its caller owns, and `flattenHeaders` is outside them on the comparison side, turning any header initializer into one frozen record. The journey layer drives a real interface by role and accessible name through the installed Vitest provider, measures what a reader can see of the result, records the scenario and the page's own output as it goes, and generates the capture portfolio from the same journeys. Around it sit the fixture the journey runs against and the readings a styling claim rests on: an element built and mounted, a field driven the way its component listens for, the tokens, colors, and rules the cascade resolved, and a database given back at the end of the test that filled it. A helper ships here when it is a reusable test mechanism with a real consumer that no native or declared primitive already covers; Limits states that rule and what it refused. This package holds one implementation of each and ships as a `devDependency`. Nothing here runs in production code. Source: `src/core`, `src/browser`, and `src/server`. It has zero runtime dependencies, and no exported type here names an `@orkestrel/*` type. A dependency on `@orkestrel/emitter` would install a second copy of it beside the one a consumer already pins, and the compiler reads two copies as two distinct types. A foreign type in a signature fails the other way, rejecting the consumer's own local value inside the consumer's own repository. The zero-runtime-dependencies contract holds both."
rows read: 1, disagreements found: 186
```
Exit 1 — expected; this is the converge unit's worklist.

## Deviations

None. `repair` wrote exactly the P21 list. Every voice diagnostic and every `test:policy` prose hit named a file inside scope. Every gate other than `docs` read green.


---

## Orchestrator annotation (test audit, 2026-09-07)

The audit read counts in this report's prose against the writing ban; every citation held against the tree. The report stands as the unit's evidence with this note.
