# Units T1 and T2 — audit claims

## Subject

The chain in the `@orkestrel/test` checkout (`C:/Users/mikes/WebstormProjects/test`): baseline
`abedca2` → unit T1 (brief `tmp/units/t1-brief.md`, report `tmp/units/t1-report.md`, checkpoint
`8f74726`) → unit T2 (brief `tmp/units/t2-brief.md`, report `tmp/units/t2-report.md`, tree at the
current tip). Writer of both: `opus` on Opus 5, native. Design authority:
`tmp/units/design-verdict.md`, rulings D1–D16.

T1 claims to close: the wait family (`waitForText` in core; `waitForState`, `waitForAnimations` in
browser), `pressKeys`, `readRefusal`, `createStorage` with `WebStorageInterface` and `buildDenial`,
`readCensus`, `buildContrast`, `buildEscapes`, `buildCensus`, the `JourneyVariant`/`CaptureVariant`
split, the shadow-tree boundary on `isRendered` and `isReachable`, Contract rules 9, 10, and 13,
and the guide's Surface, Voices, Limits, and Patterns parity. T2 claims to close: `createHarness`,
`StatechartStatus`, the observable `pending`/`idle`/`running` statuses, and the executed worked
table.

## What the round decides

Whether `@orkestrel/test` 0.0.17 is published from this tree. Every browser workspace in the fleet
re-pins to it, the scaffold's skill teaches its verbs, and the vendored guide mirror carries its
prose to every target. A false voice, a wait that hangs, or a control that cannot fail ships to
every consumer at once.

## Already established — verified by the Orchestrator directly, not taken from the writer

- Gates over the T1 tree at `8f74726`, taken bare after `npm run build`: lint, format, check,
  build, core 115, browser 294, server 143 (9 skipped), policy 101 (1 skipped), config 173 (1
  skipped), setup 24, guides 48 (1 skipped), each exit 0 (`.orkestrel/campaign/t1-gates-summary.txt`).
- `dist/src/browser/index.js` line 2 reads `import { captureError, checkBounds, waitForAbort,
  waitForCondition } from "../core/index.js"` and carries no inlined `waitForCondition` body (the
  timeout voice's text is absent from the file).
- The browser build externalizes `@src/core` and every `@orkestrel/*` specifier
  (`vite.config.ts:137-141`), and the declaration roll-up rewrites core specifiers to the package
  name (`configs/helpers.ts:618`); five fleet packages already import core from their browser
  environment under the same generated configuration.
- `src/browser/factories.ts:9` and `src/browser/helpers.ts:14` import guards from
  `@orkestrel/contract`, which is the package's one runtime dependency; before T1 the browser entry
  imported neither core nor contract.
- T1's three deviations — `WebStorageInterface` (the `surface` policy rule refuses the bare
  `StorageInterface`, owned by `@orkestrel/database`), the `build*` controls in `helpers.ts` (the
  vendored policy plugin refuses a `factories.ts` function without the `create` prefix), and
  `buildDenial` extracted — each cite the rule that forced them.
- T1's mutation probes (`.orkestrel/campaign/t1-instruments/mutate.py`, `mutate2.py`) and T2's
  (`t2-instruments/mutate.py`) reddened the cases their reports list; the Orchestrator did not
  re-run them.
- Gates over the T2 tree, taken bare after `npm run build`, are recorded in
  `.orkestrel/campaign/t2-gates-summary.txt`, and the built `dist/src/browser/index.js` imports
  `STATECHART_ATTRIBUTES` and `STATECHART_STATUSES` from `../core/index.js`.

## Review evidence

- T1: `tmp/audit/t1-diff.patch` (`git diff abedca2 8f74726`, eleven files, 2,143 insertions),
  `tmp/units/t1-report.md`, `tmp/units/t1-brief.md`.
- T2: `tmp/audit/t2-diff.patch` (`git diff 8f74726` at the tip), `tmp/units/t2-report.md`,
  `tmp/units/t2-brief.md`.
- The tree at `C:/Users/mikes/WebstormProjects/test`, including `guides/test.md` and the built
  `dist/src/browser/index.js` and `index.d.ts`.

## Numbered claims — attempt to refute each

### T1

1. **`waitForText` is a bounded text wait and not a renamed `waitForCondition`.** It reuses
   `waitForCondition`'s bound validation, timeout voice, and abort-reason identity; propagates a
   reader throw unchanged (never retries a throwing reader); returns the reading that satisfied the
   poll (not `text`); `exact` demands equality; `absent` demands the departing sentence be gone in
   the same reading that carries `text`; empty `text` and empty `absent` are refused before any
   reading. Attack: a reader whose first reading carries both sentences; a reader that throws on
   the second call; `absent` equal to `text`.
2. **`pressKeys` refuses a send that would land on the document.** `document.activeElement` null
   or `document.body` refuses with `Key sequence "<keys>" was sent with nothing focused`; a focused
   control receives the sequence through the provider's `userEvent.keyboard`; the caller's key
   syntax is passed through unescaped. Attack: focus inside a shadow root (`activeElement` is the
   host); focus on `document.documentElement`; a disabled focused control.
3. **`waitForState` resolves the control afresh on every reading and augments only its own
   timeout.** Each poll resolves through `resolveRendered`, so a replaced node is still the subject;
   a resolver voice thrown mid-poll propagates unchanged rather than being retried; `absent: true`
   inverts; the timeout message carries the last states read. Attack: the augmentation keys on the
   literal prefix `Condition "<description>" did not hold` of `waitForCondition`'s message (the
   writer's own least-certain claim) — name what a control whose accessible name contains that
   prefix, or a resolver voice that starts with it, does; and whether a control that is absent on
   the first reading and present later is waited for or refused immediately.
4. **`waitForAnimations` settles on the animations a person sees end.** It reads
   `getAnimations({ subtree: true })`, excludes an infinite-iteration animation and any animation
   whose `playState` is not `running` (so a paused animation resolves immediately — the writer's
   ruling, not the design's), parks on `finished` rather than polling, re-reads after each
   completion or cancellation so a replacement animation is caught, refuses a disconnected subject
   with `Animation subject is not connected`, and times out through the wait family naming the
   subject and the still-running animations. Attack: an animation cancelled and replaced inside
   the same frame; an animation that finishes and is restarted before the re-read; the abort path,
   which the writer reports as threaded but unproven — name what an aborted wait does with its
   parked `finished` promises; a `delay`ed animation whose `playState` is `running` only after
   the delay.
5. **`readRefusal` translates and rethrows correctly.** It returns the message of the `Error`
   `resolveRendered` throws (absent, gated, ambiguous voices verbatim), `undefined` where the
   target resolves, and rethrows any non-`Error` by identity. Attack: the only non-`Error` path
   proven is a fixture whose `tabIndex` getter throws a string — decide whether that plants a
   hostile input or replaces project-owned behaviour; and whether the role-scoped overload
   forwards the role to `resolveRendered` exactly.
6. **`createStorage` is a real `Storage` with the declared refusals.** Seeded values copied;
   `length`, `key`, `getItem` are reads and `clear`, `removeItem`, `setItem` are writes; a withheld
   operation throws a `DOMException` named `SecurityError` reading `Access is denied for <detail>`
   through `buildDenial`; `quota` counts accepted `setItem` calls, exhaustion throws a
   `QuotaExceededError` reading `No room is left for <key>`, `removeItem` and a withheld write
   consume nothing, `permit()` lifts both permission refusals and never replenishes quota, a
   non-integer or negative quota is refused with `Storage quota must be a non-negative integer`;
   nothing is patched and no `storage` event fires. Attack: `setItem` on an existing key (does it
   consume quota?); `key(index)` out of range; `quota: 0`; `Number.MAX_SAFE_INTEGER + 1`; the
   store handed to a real application (`localStorage`-shaped consumers reading `storage.length`
   in a loop).
7. **`readCensus` reports the population it walked.** The root itself counts when it is an
   element; `tokens` and `undeclared` are sorted; an empty walk is refused with `Class census
   walked no element`; it reuses `readClasses` and `readCascade`; an SVG element's class list is
   read. Attack: a root that is a `DocumentFragment`; a `<template>` content subtree; a class
   token declared only inside an `@media` rule the viewport does not match; a stylesheet the
   browser refuses to read (cross-origin) — does the census report the token undeclared, or the
   read failed?
8. **The control builders certify their readers.** `buildContrast(bar)` returns a detached stack
   whose composited readings straddle `bar` (`refused` under, `accepted` at or over) while a flat
   reading disagrees for at least one, searching the grey axis, and refuses a bar under `1` or
   over the tinted surface's maximum with `Contrast control cannot straddle the bar <bar>`;
   `buildEscapes(permitted)` returns a detached root whose inline and embedded escapes
   `extractStyles` reports and whose `<style id="<permitted>">` an exempting caller leaves out;
   `buildCensus()` returns a detached root carrying one undeclared class on an HTML element and
   one on an SVG element. Attack: a consumer cascade that declares `census-authored-token` or
   `census-authored-mark` (the writer's own least-certain claim 5); the refusal message naming
   the bar rather than the grey axis when a non-grey pair would straddle; whether the detached
   `buildEscapes` root's embedded sheet joins the cascade once appended (it must, for the reading
   to be meaningful) and leaves it on removal.
9. **The variant split changes no existing behaviour.** `CaptureVariant extends JourneyVariant`
   with `apply?` alone; every pre-existing `createPortfolio` and `expandCaptures` case passes
   unchanged; `JourneyVariant` and `TextWaitOptions` resolve from the root entry; the rolled-up
   `dist/src/browser/index.d.ts` imports `JourneyVariant` and `WaitOptions` from `@orkestrel/test`
   — a self-import a consumer's TypeScript resolves through the package's `exports` map. Attack:
   the self-import under `moduleResolution: bundler` versus `node16` in a consumer; a consumer
   that installs the package but maps `@orkestrel/test` to source (a scaffold-generated workspace's
   own tsconfig paths map the workspace's own specifiers, not this one).
10. **The shadow-tree sentences are true.** `isRendered` and `isReachable` answer for an element's
    own facts in an open and a closed root alike, and their ancestor-attribute reads (`aria-hidden`,
    `[inert]`) stop at the shadow boundary because `closest` stays in the element's own tree; a host
    the flat tree does not lay out still takes the element off the page. Attack: a slotted element
    (light-tree child rendered inside a shadow slot) — which tree do `closest` and the layout answer
    for; a host with `inert` and a focusable shadow child.
11. **Contract rules 9, 10, and 13 are true as rewritten.** Rule 9 states exactly one runtime
    dependency and no foreign type in a public signature; rules 10 and 13 carry no
    "zero-dependency" phrasing; rule 13 states that the browser entry imports core through the
    package's own root export and `@orkestrel/contract`'s guards, that the build externalizes
    both, and keeps the no-framework, no-`node:*`, no-`import.meta.env` clauses. Attack: any public
    signature in `src/browser/types.ts` or `src/core/types.ts` that names an `@orkestrel/contract`
    type; any sentence in the guide still claiming the browser entry imports nothing but
    `vitest/browser`.
12. **Guide parity is complete and executed.** Every new export has a Surface row whose summary
    equals its doc-block description; every new voice has a Voices row with its thrower; the
    Limits table rules each shipped candidate (keyboard verb, text wait, announced-state wait,
    animation wait, refusal reader, storage fixture, census, control builders) and each refused
    one (stalled-read store, `isPainted`, an ARIA-disclosure settle keyed to a framework's
    classes) with its evidence; every new Patterns fence the package's runtime can run is
    transcribed and its claimed values asserted in `tests/guides.test.ts`; a browser fence says
    its values are pinned in the browser suite. Attack: a fence comment claiming a value the code
    does not return; a Limits "Ships" row whose reason restates demand rather than the mechanism.
13. **The controls are drawn from outside their populations and each recorded red is the
    mechanism's.** Read `mutate.py` and `mutate2.py` against the cases they reddened: name any
    case whose red came from breaking the fixture rather than the mechanism, and any case that
    would stay green with the mechanism deleted (the writer names `createStorage > reads back its
    seed and accepts every operation by default` as unmutated).
14. **Coherence.** Names follow `{verb}{Noun}` and the single-word entity rule (`permit`,
    `execute`); `buildDenial` is justified by the centralization law and has a consumer beyond
    `createStorage`'s own body or is documented as the package's own reuse; placement follows the
    kind rules; no nested function declarations, no `any`, no `as`, no non-null assertion, no
    suppression; TSDoc voice matches the package; `WebStorageInterface`'s `Web` prefix reads as the
    platform API's name rather than a retreat. Would you publish this surface?

### T2

Unit T2's report (`tmp/units/t2-report.md`) records one deviation — the worked table's native
`<details>` gained a `Dismiss` button so the event union (`'toggle' | 'dismiss'`) carries a row
whose event leaves the state unchanged — and six least-certain claims of its own. Start there.

15. **`createHarness` mounts the contract and nothing else.** It refuses an empty table with
    `Statechart harness mounted no transition` and mounts nothing; the root carries `status`,
    `passed`, `failed`, and `total`, each row carries `scenario` (the transition's `name`) and
    `result`, and the state element carries `state` — every attribute name taken from
    `STATECHART_ATTRIBUTES` and no `data-statechart-*` literal anywhere in `src/browser`; the
    built `dist/src/browser/index.js` imports the map from `../core/index.js` and inlines no such
    literal. Attack: grep the source and the bundle for the literal; a table whose rows repeat a
    `name` (the writer's least-certain claim 3 — `failures` then cannot be mapped back to rows).
16. **The statuses are observable as D4 defines them.** `pending` is written before the rows mount
    and replaced by `idle` only after the row count is written (proven by a `MutationObserver`
    trail read through `takeRecords()`); `running` is written when `execute` starts; `passed` or
    `failed` is written when it ends; a second `execute` resets the tally; `destroy` removes the
    root and is idempotent. Attack: the writer's least-certain claim 1 — a throwing `options.state`
    reader rejects `execute()` and leaves the root at `running`, so a gate polling for a terminal
    status reads a hang; decide whether that is a defect against a gate contract that promises a
    terminal reading, and whether a `finally` writing `failed` is the correct shape; the
    mutation-trail assertion that pins `added p p ol` as one record (least-certain claim 6) — is
    it a proof of the ordering or a proof of one browser's record batching?
17. **Row semantics match the design.** Each row is driven through `executeScenario` against a
    context from `build`; a failing row is recorded and the walk continues; a throwing builder
    counts as that row failing, named the way `executeScenarios` names it; `failures` names the
    failing rows in run order and hands out a snapshot; the state element takes its reading after
    each row, failing rows included. Attack: `total`, `passed`, and `failed` read the attributes
    through `Number`, so a removed attribute reads `0` where `status` refuses with `Statechart
    harness carries no status` (least-certain claim 4); a `build` that returns a rejected promise
    versus one that throws synchronously.
18. **The object and the markup cannot disagree.** Every getter reads the root's attributes, so a
    gate reading the markup and a test reading the object see one tally. Attack: a consumer that
    mutates the attributes between reads; the announcer's `role="status"` sentence written after
    the status attribute (the report says the contract is written before it is narrated — confirm
    the order is stable across `execute`).
19. **The worked table is real, executed, and transcribed.** The fence in `guides/test.md`
    § Patterns → Drive a statechart table is the table `tests/src/browser/factories.test.ts` drives:
    a native `<details>` plus a `Dismiss` button, states `'closed' | 'open'`, events
    `'toggle' | 'dismiss'`, four rows including `closed stays closed through the button`, each row
    building and removing its own fixture, the summary driven by `clickDisclosure` and the button
    by `clickAccessible`, the state read through `readStates`; the mismatched-row fence and the
    `createHarness` fence follow the same entity; `tests/guides.test.ts` transcribes the
    attribute-and-status fence and the guide says the browser suite pins the rest. Attack: a value
    a fence comment claims that the test does not assert; the `Dismiss` button as a departure from
    D5 — is the entity still "a native `<details>` driven with `clickDisclosure`"?
20. **The guide is true and complete for the harness.** Contract rule 19 states why the harness is
    test-side (a page cannot import a development dependency that imports `vitest/browser`); the
    Limits table rules the harness (ships), a separate gate reader (refused: the object carries the
    tally), and a generated or published harness page (refused: product); Surface, Methods, and
    Voices rows exist for every new export and voice; the `STATECHART_STATUSES` and
    `STATECHART_ATTRIBUTES` doc blocks and the guide state D4's definitions identically. Attack:
    a status definition in one place that the other contradicts; the `pause` control's 40 ms floor
    (least-certain claim 5) as a timing assertion under load.
21. **Coherence of the release.** T1 and T2 together are what 0.0.17 publishes. Names follow the
    lifecycle vocabulary (`execute`, `destroy`); no nested function declarations, no `any`, `as`,
    non-null assertion, or suppression; TSDoc in the package voice; the browser entry's imports of
    core and `@orkestrel/contract` are the whole of its new dependency reach. Would you publish
    this surface to every browser workspace in the fleet?

## Unknowns

- Whether a consumer's TypeScript resolves the roll-up's self-import of `@orkestrel/test` from
  `@orkestrel/test/browser` under every `moduleResolution` the fleet uses. The Orchestrator runs
  `npm run test:distribution` (which installs the packed tarball into a generated consumer and
  typechecks it) after the round and supplies the reading; a lane that needs it earlier names it
  `UNRESOLVED`.
- The audit lanes hold no write tool (the native lane holds no shell). Name a vector you could not
  run as `UNRESOLVED` with the exact fixture and command; the Orchestrator runs it in the browser
  project and returns the output before ruling.

## The threshold

A finding is worth more than a clean pass: this version is consumed by every browser workspace
and taught by the skill, so a wrong voice or a hanging wait is found by a consumer after the
number is spent. CONFIRMED requires naming the attack you tried that failed. A claim you cannot
decide is UNRESOLVED, not CONFIRMED — say what would settle it. Do not hedge toward an imagined
consensus. Assume this chain has one more: the writer's own least-certain claims (T1 report § Claims
of my own I flag as least certain) are where to start, and the rulings the writer took on its own —
the `playState` filter, the grey-axis search, the string-matched timeout prefix, the hostile-getter
fixture — are the freshest surface in the package.
