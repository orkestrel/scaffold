# U7b audit claims

Subject: unit U7b in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), written by
`sol` on Astra under `units/u7b-brief-2.md` (the effective brief, carrying
`units/u7b-brief.md`; retained under `.orkestrel/veneer/units/`), reports
`units/u7b-report.md` and `units/u7b-report-2.md`, over the tidy landing `91e5906`. Evidence
rendered by the Orchestrator: `units/u7b-diff.patch.txt` (`git diff 91e5906` plus `--no-index`
renderings of the untracked files) and `tmp/audit/u7b-status.txt`. Rule on the diff and the
live files, never on the reports' word alone. Scope: implementation only, by the user's ruling —
no wording, comment, doc-block, or guide-prose findings. Claims marked `[mechanical]` are the
checker's; every other lane rules on every claim. An extra finding is an implementation defect
with a site and a one-line failure scenario, numbered from 14.

1. `Button` (`src/browser/Button.ts`, flat at the environment root, one class plus imports):
   `constructor(host, options?)` refuses a host that is not an `HTMLElement` of the current
   realm and a host already owned by a live `Button`, each with an `AppError` carrying a distinct
   `code` and a `context` naming the host's tag (brief 2); ownership is held in a class-private
   static `WeakSet`; the constructor snapshots the host's `active` membership and its
   `aria-pressed` value (`string | null`) and binds the hooks through `bindEventMap` with an
   `AbortController`.
2. `pressed` reads `host.classList.contains('active')` live; `toggle()` toggles the class, writes
   `aria-pressed` from the result, dispatches `toggle.vn.button` through `emitEvent`, and
   returns the new state; the write order is class, then attribute, then event, proven through
   a `MutationObserver` on a native host and on an anchor host; `PLANT-ORDER` reddened the
   ordered-mutation case (`[['aria-pressed', null], ['class', null]]`) and was restored.
3. The event is a bubbling, non-cancelable `CustomEvent<ButtonDetail>` with `detail.pressed`,
   dispatched synchronously; hooks bound through `on.toggle` fire and are released on
   `destroy()`; `destroy()` aborts the controller, restores the class membership and the
   attribute exactly as found (a host that started `active`, one without the attribute, one the
   consumer edited after construction with unrelated classes and attributes preserved), releases
   the ownership, is idempotent, and leaves a later `toggle()` inert while the getter still
   reads the host; proven for a detached host, destruction during a pending toggle from a
   listener, reconstruction after destruction, and concurrent instances on separate hosts.
4. `Delegate` (`src/browser/Delegate.ts`, flat): `constructor(options?)` with `root` defaulting
   to `document` registers one `click` listener on the root through an `AbortController`; on a
   click whose target's `closest('[data-bs-toggle="button"]')` is an `HTMLElement` inside the
   root it calls `preventDefault()` and toggles the engine held for that host in a private
   `WeakMap`, constructing one on first sight; a host that is disabled (`disabled` property, the
   `.disabled` class, or `aria-disabled="true"`) is refused without a toggle; `destroy()` aborts
   the listener, destroys every engine it constructed, and clears the map; proven for a click on
   a child element, a second click reusing the engine, a host inserted after construction, the
   three disabled forms, a host removed from the root, a fragment root, and an SVG target;
   `PLANT-LEAK` reddened the release case and was restored.
5. Importing `./browser` registers no document or window listener (the recorder proof through
   `tests/setupListeners.ts` with its imported-listener control), and constructing a `Delegate`
   registers exactly one listener on its root.
6. The helpers: `emitEvent(host, type, detail)` dispatches a bubbling, non-cancelable
   `CustomEvent` synchronously and returns nothing the caller must read; `bindEventMap(host,
   hooks, signal)` binds each hook with the signal and validates the payload through
   `isButtonEvent` before invoking the typed callback; both exported and cased, including a
   malformed-event refusal.
7. The guards `isButtonHost` and `isButtonEvent` return `false` and never throw, including when
   a hostile prototype or payload access throws; cased.
8. `AppError` (`src/core/errors.ts`) extends `Error` with `readonly code: string`, an optional
   readonly `context`, `name` `'AppError'`, and the cause forwarded; `isAppError` narrows and
   refuses a native `Error`, an object carrying a `code`, and `undefined`; both exported from the
   core barrel and cased; `Button`'s proofs assert `isAppError` and the two codes; no
   `TypeError` is thrown by the package's own code (brief 2).
9. `[mechanical]` The types: `ButtonDetail`, `ButtonEventMap`, `ButtonHooks`, `ButtonOptions`,
   `ButtonInterface { host; pressed; toggle(); destroy() }`, `DelegateOptions { root? }`,
   `DelegateInterface { root; destroy() }` in `src/browser/types.ts`, every property readonly,
   every member one word; `BUTTON_TOGGLE = 'toggle.vn.button'`, `BUTTON_SELECTOR`,
   `BUTTON_ACTIVE = 'active'` in `constants.ts`; no `public`, `private`, or `protected` keyword
   and no parameter property; `#` fields only.
10. `[mechanical]` No new surface: `package.json` `exports` and `sideEffects` unchanged;
    `configs/**` untouched; `src/browser/index.ts` star-exports `types`, `constants`,
    `validators`, `helpers`, `ColorMode`, `Button`, `Delegate` and nothing else; no
    `auto` entry, no adapter, no Bootstrap method spelling (`getInstance`,
    `getOrCreateInstance`, `dispose`) anywhere under `src/`.
11. `[mechanical]` The export-set cases: `tests/src/browser/index.test.ts` asserts the barrel's
    set equal to the live set (`BUTTON_ACTIVE`, `BUTTON_SELECTOR`, `BUTTON_TOGGLE`, `Button`,
    `COLOR_MODE_ATTRIBUTE`, `COLOR_MODE_KEY`, `ColorMode`, `Delegate`, `bindEventMap`,
    `emitEvent`, `isButtonEvent`, `isButtonHost`, `isColorModeState`); `tests/src/core/index.test.ts`
    gains `AppError` and `isAppError`; no `it(` removed without its subject.
12. `[mechanical]` Scope and law: the status shows only the brief-2 owned set (the seven
    `src/browser` files, the five `tests/src/browser` files, `src/core/errors.ts`,
    `src/core/index.ts`, `tests/src/core/errors.test.ts`, `tests/src/core/index.test.ts`, and
    `src/core/types.ts` only if changed); `src/styles/**`, `app/**`, `tests/app/**`,
    `tests/setup*.ts`, `tests/conformance*.ts`, `tests/distribution.test.ts`, `guides/**`,
    `package.json`, `configs/**` absent from the diff; no `any`, no assertion outside
    `as const`, no non-null assertion, no suppression, no skip; every module-scope function
    added is exported and tested; no nested function outside the permitted callback forms; no
    case named for a control; no `PLANT` residue; no installed `@orkestrel/test` or
    `@orkestrel/contract` export duplicated by an added helper.
13. The gates the reports record exit 0 (`format:check`, `lint:check`, `check`,
    `build:src:core`, `build:src:browser`, `test:src:core`, `test:src:browser` 36 passed on
    Chromium and Edge, `test:setup:browser` 15 passed on both); the verifier lane re-runs the
    whole chain on the host and its reading rules this claim.
