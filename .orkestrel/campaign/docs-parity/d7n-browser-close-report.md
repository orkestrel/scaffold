# Report — `d7n-browser-close`

## Item 1 — the `Shape` idiom

Every table carrying an `interface` or `type` row already headed `Shape` under its convention
sentence except one: `#### Extended constants` at `guides/browser.md:462`, whose constants had no
`Shape` cell. All rows the brief listed for the interfaces without `plus` (`CDPClientOptions`,
`CDPTarget`, `CDPSendOptions`, `BrowserViewport`, and the rest through `WebSocketCDPTransportOptions`
and `BrowserAXNode` through `BrowserWebSocketFrame`) checked clean against `src/core/types.ts`: none
of those declarations carries a call-signature member, so no row needed a `plus`. Every row the
brief listed under "Extended interfaces" already read parent-before-`plus` (`BrowserClickOptions`,
`BrowserDragOptions`, `BrowserPointerOptions`, `BrowserLocatorClickOptions`,
`BrowserLocatorDragOptions`, `BrowserLocatorTypeOptions`, `BrowserWaitOptions`,
`BrowserUploadOptions`, `BrowserHARCookie`, `BrowserSnapshotInterface`, `BrowserPageInterface`).

Hunk (added the `Shape` column and its sentence to the constants table):

```diff
 #### Extended constants
 
-| API                            | Kind  | Summary                                                                                                                                            |
-| ------------------------------ | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
-| `BROWSER_HAR_CREATOR`          | const | Names the tool identity embedded in HAR 1.2 documents.                                                                                             |
-| `BROWSER_KEY_MODIFIERS`        | const | Maps a canonical modifier name to its CDP Input modifier bit value.                                                                                |
-| `BROWSER_MOUSE_BUTTON_MASKS`   | const | Maps each public mouse button to its CDP Input pressed-button bit value.                                                                           |
-| `BROWSER_SCREENSHOT_ATTRIBUTE` | const | Names the attribute that tags temporary screenshot styles and masks.                                                                               |
-| `BROWSER_STABLE_FRAME_COUNT`   | const | Sets the number of animation frames whose element bounds must agree before trusted input.                                                          |
-| `BROWSER_TEST_ID_ATTRIBUTE`    | const | Names the attribute the semantic test-id selector uses.                                                                                            |
-| `BROWSER_VISIBILITY_SOURCE`    | const | Holds the in-page visibility predicate source, over a `style` computed style and a `rect` bounding box already in scope at the interpolation site. |
+A `Shape` cell holds the constant's declared type.
+
+| API                            | Kind  | Shape                                          | Summary                                                                                                                                            |
+| ------------------------------ | ----- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
+| `BROWSER_HAR_CREATOR`          | const | `{ name, version }`                            | Names the tool identity embedded in HAR 1.2 documents.                                                                                             |
+| `BROWSER_KEY_MODIFIERS`        | const | `Readonly<Record<string, number>>`             | Maps a canonical modifier name to its CDP Input modifier bit value.                                                                                |
+| `BROWSER_MOUSE_BUTTON_MASKS`   | const | `Readonly<Record<BrowserMouseButton, number>>` | Maps each public mouse button to its CDP Input pressed-button bit value.                                                                           |
+| `BROWSER_SCREENSHOT_ATTRIBUTE` | const | `string`                                       | Names the attribute that tags temporary screenshot styles and masks.                                                                               |
+| `BROWSER_STABLE_FRAME_COUNT`   | const | `number`                                       | Sets the number of animation frames whose element bounds must agree before trusted input.                                                          |
+| `BROWSER_TEST_ID_ATTRIBUTE`    | const | `string`                                       | Names the attribute the semantic test-id selector uses.                                                                                            |
+| `BROWSER_VISIBILITY_SOURCE`    | const | `string`                                       | Holds the in-page visibility predicate source, over a `style` computed style and a `rect` bounding box already in scope at the interpolation site. |
```

`BROWSER_HAR_CREATOR`'s declared type (an unannotated `Object.freeze({ name, version })` literal)
takes the bare-member-name form Ruling 19 gives an object-literal alias, matching the convention
this file already uses for a type alias over an object literal. `BROWSER_KEY_MODIFIERS` and
`BROWSER_MOUSE_BUTTON_MASKS` take their explicit `src/core/constants.ts` annotations verbatim.

## Item 2 — member references

`npm run docs` reported `rows read: 1, disagreements found: 0` before and after every other edit;
the brief's site list was `(none)` and no `{@link}` cell disagreed. No change.

## Item 3 — the drop-in's canon

The region from `const root = ` through the manifest loop's closing brace in `tests/guides.test.ts`
matched the brief's own stated "no difference" reading. Line 2 equals the pilot's byte for byte.
The `INTERNAL` doc comment carries the pilot's sentence verbatim. The remaining differences against
`abort/tests/guides.test.ts` are the package-specific bindings the canon permits (`GUIDE_SPEC`,
`MODULES`, `INTERNAL`'s contents, the header's own line 3 per Ruling 21, and the standalone
`flagship fences` describe block after the manifest loop). No edit.

## Item 4 — fence lead-ins

Both heading-adjacent fences gained a one-sentence lead-in naming what the demonstration builds.

```diff
 ### Automate a page end-to-end
 
+This demonstration launches a headless browser, fills and submits a search form, waits for the
+results, and reads the resulting content.
+
 ```ts
 import { createBrowser } from '@orkestrel/browser/server'
```

```diff
 ### Record and replay interactions with codegen
 
+This demonstration records a click and a fill on a page, then compiles the recorded actions into
+a replayable script.
+
 ```ts
 const page = await browser.create({ url: 'https://example.com' })
```

## Item 5 — the granted comment patch

```diff
--- a/src/server/helpers.ts
+++ b/src/server/helpers.ts
@@
-	// Caller-supplied args come FIRST so a script path (for example `node <script>`,
+	// Caller-supplied args come first so a script path (for example `node <script>`,
 	// used to spawn a Node stand-in executable cross-platform in tests) lands
-	// as an early positional argv entry ahead of the CDP flags below —
+	// as an early positional argv entry ahead of the CDP flags that follow —
 	// Chromium itself accepts flags in any order, so production is unaffected.
```

No other byte of that file changed.

## Item 6 — propagation

- `npx oxfmt --write guides/browser.md tests/guides.test.ts`: `Finished in 1073ms on 2 files using 4 threads.`
- `npm run docs`: `rows read: 1, disagreements found: 0`
- `npm run docs -- --to guide`: `rows read: 1, disagreements found: 0, written: 0, reported: 0`
- `npm run docs -- --to source`: `rows read: 1, disagreements found: 0, written: 0, reported: 0`

## Acceptance criteria

1. `git status --short`:
```text
 M guides/browser.md
 M src/server/helpers.ts
```
Both are owned files; `tests/guides.test.ts` needed no edit.

2. `grep -n '| interface *| \`{[^\`]*:' guides/browser.md` and `grep -n '…' guides/browser.md` both
   printed nothing (grep exit 1, no match).

3. The item 3 region diff against the pilot prints nothing beyond the sanctioned package-specific
   bindings and the appended `flagship fences` case; line 2 equals the pilot's.

4. `npx oxfmt --check guides/browser.md tests/guides.test.ts`: `All matched files use the correct
   format. Finished in 976ms on 2 files using 4 threads.` (exit 0)
   `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts`: no output (exit 0).

5. `npm run docs`: `rows read: 1, disagreements found: 0`. Both write directions at `written: 0`
   (see item 6).

6. `npm run test:guides`:
```text
 Test Files  1 passed (1)
      Tests  201 passed (201)
   Duration  1.33s (transform 533ms, setup 613ms, import 247ms, tests 331ms, environment 0ms)
```
   `npm run test:policy`:
```text
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  1.29s (transform 757ms, setup 695ms, import 176ms, tests 269ms, environment 0ms)
```

Wall clock for the unit's own commands: under a minute total across all reads, edits, and gate runs.

## Deviation contract

No stop condition triggered. Ancillary decision recorded: `BROWSER_HAR_CREATOR`'s `Shape` cell uses
the bare-member-name object-literal form (Ruling 19's convention for an alias over an object
literal) rather than the TypeScript-inferred literal-typed form (`Readonly<{ name: "…"; version:
"…" }>`), because the inferred form is a compiler artifact of an unannotated `Object.freeze` call
and every other object-shaped row in this guide already uses bare member names.
