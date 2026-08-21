# U2 — browser surface of `@orkestrel/test` 0.0.9

## Role and engine

You are the Opus 5 `implementer`, a native subagent writing in `/home/user/test`. Sole writer in
this checkout from a clean committed baseline. Perform this assignment directly; spawn nothing.

## Objective

Add the adopted browser helpers to `@orkestrel/test/browser`, exactly as specified.

## Authority

1. `/home/user/test/AGENTS.md`
2. `/home/user/test/.claude/rules/typescript.md`, `architecture.md`, `names.md`, `tests.md`,
   `browser.md`, `styles.md`
3. `/home/user/test/guides/test.md` — Voices and Contract sections govern your TSDoc voice. You do
   not edit the guide; a later unit owns it.

Skill: none. This brief is the spec; the reconciled plan behind it is
`/home/user/scaffold/.orkestrel/campaign/plan.md` (context only — the brief wins on conflict).

## Context

- `@orkestrel/test`, zero runtime dependencies, peer `vitest ^4.1.10`. Add nothing.
- The browser suite runs under Vitest browser mode with Playwright Chromium already provisioned;
  `npm run test:src:browser` is the scoped run.
- Scoped validation: `npm run check:src:browser`, `npm run test:src:browser`, `npm run lint:check`,
  `npm run format:check`. No tree-wide mutating command, no `npm run build`.
- Read in full before editing: `src/browser/types.ts`, `src/browser/constants.ts`,
  `src/browser/helpers.ts`, `src/browser/factories.ts`, `src/browser/index.ts`, and the existing
  `tests/src/browser/helpers.test.ts` and `tests/src/browser/factories.test.ts`.
- The existing `render(markup: string): HTMLDivElement` and
  `style(element, property): string` at `src/browser/helpers.ts` are widened by this unit.
- `parseColor` stays the pure text parser; the new `rgba` resolves live syntax through the browser.

## Owned files

- `src/browser/types.ts`
- `src/browser/helpers.ts`
- `src/browser/factories.ts`
- `src/browser/index.ts` — only if a new kind file needs a barrel row; `factories.ts` is already
  exported, so expect no change and record one if you make it.
- `tests/src/browser/helpers.test.ts`
- `tests/src/browser/factories.test.ts`

Off-limits: everything else, including `src/browser/constants.ts`, `package.json`, `guides/`, the
vendored test set, every `src/core` and `src/server` file.

## The work

The names below are fixed by `.claude/rules/tests.md` § Style primitives and § Browser tests — they
are the fleet contract. Do not rename them.

### `src/browser/types.ts`

`ElementOptions` — the options bag for `build`: `classes` (space-separated string), `text`,
`attributes` (readonly record). All optional, all readonly, all single-word keys.

### `src/browser/helpers.ts`

- `build(tag, options?)` — creates an **unmounted** element of the tag, applying classes, text, and
  attributes. Generic over `keyof HTMLElementTagNameMap` returning the exact element type.
- `mount(element)` — appends the element to `document.body` and returns it. Its contract, stated in
  TSDoc, is the invariant that the element is now live for `getComputedStyle` and layout; removal
  belongs to the consumer's teardown. If while implementing you conclude this cannot honestly claim
  more than `append`, deliver it anyway and put that judgment in `Flags` — the audit round attacks
  it with the wrapper test.
- widen `render` — add the overload `render<K extends keyof HTMLElementTagNameMap>(tag: K, classes: string): HTMLElementTagNameMap[K]`
  beside `render(markup: string): HTMLDivElement`. The class argument is **required** — a
  one-argument call must keep resolving to the markup form. The tag form is `mount(build(tag, { classes }))`
  in behavior: constructed, classed, appended, returned.
- widen `style` — trim the returned computed value. This is a deliberate behavior change: a custom
  property arrives with a leading space today. Check the existing browser tests and fences for
  reliance on the untrimmed form and repair any in your owned test files; if the guide asserts an
  untrimmed value, record it in `Flags` for the guide unit.
- `token(element, name)` — reads a custom property from the element's computed style; accepts the
  name with or without the leading dashes. Returns the trimmed value.
- `rootToken(name)` — `token` against `document.documentElement`. The contract fixes this name;
  keep it a documented delegate.
- `pixels(element, property)` — parses the leading numeric part of a resolved CSS length, `0` when
  unparsable.
- `rgba(value)` — resolves an arbitrary CSS color expression to a `Color` by staging a probe
  element, reading its computed color, and removing the probe in a `finally`. Reuses `parseColor`
  for the read; never reimplements it.
- `colorEqual(first, second)` — channel-wise equality over resolved colors within a small fixed
  tolerance; both arguments accept a CSS expression or a `Color`.
- `findRule(selector)` — walks `document.styleSheets` including nested grouping rules iteratively
  (no nested function declarations), skips a stylesheet whose `cssRules` getter throws, and returns
  the first `CSSStyleRule` whose selector includes the fragment, or `undefined`.
- `findKeyframes(name)` — the sibling walk returning a `CSSKeyframesRule | undefined`.
- `removeDatabase(name): Promise<void>` — deletes an IndexedDB database through
  `globalThis.indexedDB`, resolving on success, rejecting on error, and treating `blocked` as a
  rejection naming the block — a caller who holds a connection open has a defect the helper must
  not silently absorb.
- `typeInput(element, text)` — sets the value and dispatches one bubbling `input` event.
- `commitInput(element, text)` — `typeInput` then one bubbling `change` event.

### `src/browser/factories.ts`

- `createPointerEvent(name, options?)` and `createDragEvent(name, options?)` — centralized event
  factories the tests rule names. Real `PointerEvent`/`DragEvent` construction with sensible
  bubbling defaults and caller overrides; `DataTransfer` allocated when the environment provides
  it.

### Tests

Extend the two owned test files in the existing style. Cover per symbol: happy path, the boundary
the contract names, the failure path. Notably:

- `build` returns unmounted (not connected), correct tag type, classes, text, attributes.
- `render` both overloads; the tag form is connected; the markup form still returns the container.
- `style` trimmed; a custom property set with a leading space reads back trimmed.
- `token`/`rootToken` with and without dashes; missing token reads as empty string.
- `pixels` on lengths and on an unparsable value.
- `rgba` on a `var()` reference and a named color; probe element removed afterward (assert).
- `colorEqual` equal, unequal, and tolerance-boundary cases.
- `findRule`/`findKeyframes` present, missing, and with an injected stylesheet inside a grouping
  rule; the cross-origin throw path via a scripted stub only if a real sheet cannot be staged —
  prefer a real `<style>` element.
- `removeDatabase` deletes a real database; the blocked path with a held-open connection rejects.
- `typeInput`/`commitInput` event order, bubbling, and value.
- the factories construct events with the requested type and defaults.

## Deviation contract

Stop and report — expected, found, evidence, done/not-done, one hypothesis — when a specified
signature collides with an existing export, when the browser provider cannot run the suite, or when
a scoped gate fails outside your owned files. Ancillary choices are yours: decide, record, continue.

## Output

- `Delivered` — symbols with file:line.
- `Validation` — exact commands and exit codes.
- `Decisions`, `Deviations` (or none), `Flags` — anything the audit round must attack first.

## Acceptance criteria

1. `npm run check:src:browser` exit 0.
2. `npm run lint:check` exit 0; `npm run format:check` exit 0.
3. `npm run test:src:browser` exit 0 with the new tests collected and passing.
4. `git status` shows changes only in owned files.
5. No `as`/`!`/`any`/`@ts-` directives, no dependency, no stated count in prose, contract names
   unchanged.
