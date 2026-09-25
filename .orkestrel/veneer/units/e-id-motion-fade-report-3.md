# Unit E-ID-MOTION-FADE round 3 — report

## Item 1 — `guides/veneer.md` § Fade classes, duration sentence

Before:

> The duration resolves to the release's `0.15s` value, so the `--vn-factor-motion` factor
> rescales it, and at a factor of `0` the browser runs no transition.

After:

> The duration resolves to the release's `0.15s` value at a factor of `1` and rescales with the
> `--vn-factor-motion` factor, and at a factor of `0` the browser runs no transition.

## Item 2 — `guides/veneer.md` § Fade classes, proof paragraph

Before (one paragraph):

> The `tests/src/styles/components/fade.test.ts` proof reads each state in the browser: the
> written selectors and declarations, the hidden and the shown opacity with the box and the
> pointer target a hidden element keeps, the transition at rest, under the staged preference, and
> under a doubled motion factor, the running transition the browser starts as the `show` class
> leaves and returns, with its duration, its `ease-out` easing, and its midpoint frame, the doubled
> duration it runs at a doubled factor and the transition it does not start at a zero factor or
> under the staged preference, the collapsing rule's transition on an element carrying the fade and
> collapsing classes, the fade on the alert, toast, tooltip, popover, tab pane, and modal, and every
> state inside a dark island.

After (two sentences, as the brief gives them):

> The `tests/src/styles/components/fade.test.ts` proof reads each state in the browser: the written
> selectors and declarations, the hidden and the shown opacity with the box and the pointer target
> a hidden element keeps, the transition at rest, under the staged preference, and under a doubled
> motion factor, the collapsing rule's transition on an element carrying the fade and collapsing
> classes, the fade on the alert, toast, tooltip, popover, tab pane, and modal, and every state
> inside a dark island.
>
> It also reads the running transition the browser starts as the `show` class leaves and returns:
> its duration, its `ease-out` easing, and its midpoint frame; the doubled duration at a doubled
> factor; and no transition at a zero factor or under the staged preference.

## Item 3 — `tests/setupBrowser.test.ts` retitle

Before: `reads no transition on the same change once the transition is removed`
After: `reads no transition on the same change after the transition is removed`

## Item 4 — new case `refuses a named transition that carries no effect`

Added to the `sampleTransition` suite in `tests/setupBrowser.test.ts`, loading the same `cascade`
fixture and making the same `moved`-class change that starts the opacity transition, then setting
the found transition's `effect` to `null` and asserting `sampleTransition(element, 'opacity')`
throws `The opacity transition carries no effect`.

The literal `transition.effect = null` assignment does not reach that assertion: Chromium's native
`effect` setter on a `CSSTransition` treats a nulled effect as ending the transition and removes it
from `element.getAnimations()` on the same tick, so `sampleTransition`'s own `find` no longer sees
it and the call returns `undefined` instead of throwing. Measured directly (temporary debug
logging, reverted): after `transition.effect = null`, `element.getAnimations()` no longer contains
that transition. The case instead shadows the accessor with an own property —
`Object.defineProperty(transition, 'effect', { value: null })` — which reports `effect` as `null`
on read without invoking the native setter's removal, so the transition stays in
`getAnimations()` and `sampleTransition` reaches the `requireValue` guard and throws as asserted.
This is a mechanism decision inside the new case's body, which the brief's deviation contract
reserves to this unit.

## Plant reading (Item 4)

Replaced, in `tests/setupBrowser.ts`:

```ts
const timing = requireValue(
	transition.effect,
	`The ${property} transition carries no effect`,
).getTiming()
```

with:

```ts
const timing = transition.effect?.getTiming()
```

Ran `npx vitest run --config vite.config.ts --no-cache --project setup:browser -t "refuses a named transition"`
(`tmp/units/mfade-3-plant.log.txt`). The new case failed:

```
AssertionError: expected [Function] to throw error including 'The opacity transition carries no eff…' but got 'Cannot read properties of undefined (…'
Received: "Cannot read properties of undefined (reading 'duration')"
```

A `TypeError` reading `duration` off `undefined`, matching the brief's expected shape (`AssertionError` or a `TypeError` naming a different message). Restored `tests/setupBrowser.ts` byte-identically afterward (`diff tmp/units/setupBrowser.ts.pre-plant-3 tests/setupBrowser.ts` reports no difference).

## Gate table

| Gate | Log | Result |
| --- | --- | --- |
| `npx vitest run --config vite.config.ts --no-cache --project setup:browser -t sampleTransition` | `tmp/units/mfade-3-vitest-sampleTransition.log.txt` | 3 passed, exit=0 |
| `npm run check` | `tmp/units/mfade-3-check.log.txt` | exit=0 |
| `npm run lint:check` | `tmp/units/mfade-3-lint.log.txt` | exit=0 |
| `npm run test:guides` | `tmp/units/mfade-3-guides.log.txt` | 20 passed, exit=0 |
| `npm run test:policy` | `tmp/units/mfade-3-policy.log.txt` | 109 passed, 1 skipped, exit=0 |
| `oxfmt --check` on owned files | inline | "All matched files use the correct format." |

## Evidence and status

- `tmp/units/mfade-3.diff` (`git diff 2376710`)
- `tmp/units/mfade-3-status.txt`
