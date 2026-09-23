# J-BINDER round 2 — the unit's report (returned 2026-09-23 by `opus` on Opus 5.5, native subagent, 145 tool uses, 1491 s; captured from the subagent's final message)

I finished all of B1 to B8, including B7a. Every acceptance command exits 0: the Chromium 153.0.8010.12 browser run reads 119 passed, and the other outputs are pasted in order below. There was no stop. Where I departed from the brief's literal wording, I kept the change inside my owned files and recorded why under Rulings. That covers `instanceOf` in place of `isInstance`, the deleted `LINK_ATTRIBUTE` constant, and one resolver instead of three.

Renaming and deleting symbols breaks three off-limits app files and makes a roadmap row stale. The exact patches are at the end, and `npm run check` stays red on the app files until you apply them.

# J-BINDER round 2 report (`opus` on Opus 5.5, worktree `C:/Users/mikes/WebstormProjects/veneer-binder`, branch `unit/binder`, base `cea3359`, nothing committed)

## Edits and the findings they close

- **B1 (E10).**
  - `src/browser/Snapshot.ts` is now `src/browser/HostSnapshot.ts`, with class `HostSnapshot implements HostSnapshotInterface`. Its test moved to `tests/src/browser/HostSnapshot.test.ts`.
  - Updated to match: the barrel, `Button.ts`, the guide row, and the § Ownership and restoration sentence.
  - `isHost` is deleted from `validators.ts`, along with its proof and guide row. All three call sites (`Button`, `Delegate`, `readTargets`) use `@orkestrel/contract`'s `instanceOf(HTMLElement)`; see the deviation under Rulings.
- **B2 (R19, F1).**
  - `constants.ts` gains the frozen tables `BUTTON_CLASSES` (`pressed: 'active'`), `BUTTON_SELECTORS` (`trigger: '[data-bs-toggle="button"]'`) and `COLOR_MODE_ATTRIBUTES` (`theme: 'data-bs-theme'`).
  - Deleted: `BUTTON_ACTIVE`, `BUTTON_SELECTOR`, `BUTTON_PRESSED`, `COLOR_MODE_ATTRIBUTE`, `CONFIG_ATTRIBUTE` and `LINK_ATTRIBUTE`.
  - `validators.ts` gains the total guards `isClassToken`, `isAttributeName` and `isSelector`. `helpers.ts` gains `resolveVocabulary`.
  - `Button` resolves `classes` and `selectors` at construction; `ColorMode` resolves `attributes`. A refused value throws `BUTTON_OPTION_INVALID` or `COLOR_MODE_OPTION_INVALID` with `{ key }`.
  - `readTargets` and `readTarget` now take `(trigger, attributes: { readonly target: string })`.
  - `resolveOptions` now takes `(element, code, defaults, parsers, options, prefix = OPTION_PREFIX)`. It has no `data-bs-config` layer and no config proofs.
  - `Button` also honours `ButtonOptions.signal`: an abort destroys the button, and a signal that is already aborted destroys it at construction.
- **B3 (R5, referrals).**
  - `Delegate` resolves `DelegateOptions.button` once at construction, before installing its listener. It routes by the resolved `selectors.trigger` and constructs each `Button` with the resolved groups.
  - The per-click mark is keyed on the click, the route and the host.
  - At each click and each observer delivery, `#release(delivered)` drops every owned engine for which `Button.find(engine.host) !== engine`. It disconnects the observer when that leaves no engine owned.
- **B4 (R2, E11).** `emitEvent` no longer mirrors detail fields; it only dispatches, and the mirroring proof is gone. `BUTTON_EVENTS` is typed `EventWire<ButtonEventMap, 'button'>`. `bindEventMap` takes the entity parameter. `toggle.vn.button` stays non-cancelable.
- **B5 (claim 3).**
  - The case is retitled "keeps the engine and the state of a host removed and reinserted in the same synchronous run, before the observer delivers", and the guide sentence matches.
  - A boundary case is added: "releases and restores a host reinserted after the observer delivered its removal".
- **B6 (claim 10).** Every round-1 gap case now has a mutation row. The `resolveOptions` proofs add a refused array-literal attribute and a surviving constructor `false` and `0`.
- **B7 (F2).** `generateId` and its proof are deleted.
- **B7a.** `Button` writes and tests `this.#classes.pressed` only. The vocabulary proof replaces the token and asserts that the replacement is written and the default is never touched.
- **B8 (bounds).** In `guides/veneer.md`:
  - The § Surface table is re-sorted by topic: deleted rows gone, new rows added, changed summaries updated.
  - The § Surface intro and the button-destruction paragraph use token language.
  - `## Engine` intro: `.vn.` wire names, vocabulary groups, and the `destroy`/`dispose` and `find`/`getInstance` departures. The `resolveOptions` paragraph drops the config layer and describes the prefix.
  - `### Vocabulary` is new: R19's rules plus the Button and ColorMode default table.
  - `### Events`: no mirroring; pre-change events are cancelable and completed ones are not.
  - `### Delegation`: the groups, once per click and route, the same-synchronous-run sentence, the destroyed-engine rule, and the target-attribute sentence.
  - `### Ownership and restoration`: every engine class has a static `find`.
  - The `emitEvent` example now uses `show.vn.collapse`, and the `Delegate` remarks name `Button.find`.
  - The "shaped around Button" paragraph was already absent after the merge.

## Rulings

- **`instanceOf(HTMLElement)` instead of `isInstance` (a departure from E10's wording, within owned scope).**
  - `isInstance` is declared `value is InstanceType<C & AnyConstructor<object>>`, which resolves to `object`. It narrows `Element | null` only to `Element`.
  - The compiler refused both sites: `src/browser/Delegate.ts(87,34): error TS2345: Argument of type 'Element' is not assignable to parameter of type 'HTMLElement'` and `src/browser/helpers.ts(164,2): error TS2322: Type 'Element[]' is not assignable to type 'readonly HTMLElement[]'`.
  - The same package's `instanceOf` is built on `isInstance` and returns `Guard<InstanceType<C>>`, so it narrows correctly.
  - I call it inside the function body, never at module load: this module is imported in a host that publishes no DOM (the round-1 reason). I use it at all three sites so there is one idiom. No local wrapper exists.
- **`aria-pressed` and `href` stay inline strings.** `BUTTON_PRESSED` and `LINK_ATTRIBUTE` are deleted.
  - Bound: R19 says a platform name is never a vocabulary member, and `architecture.md` § Kind purity keeps `constants.ts` for data.
  - `constants.ts` holds the replaceable default tables and shared data. A platform name used in one file stays a literal there, as `click`, `class` and `abort` already do.
  - `TARGET_ATTRIBUTE` and `OPTION_PREFIX` stay, as the brief's list of attribute constants J-COLLAPSE consumes.
- **One `resolveVocabulary(defaults, overrides, guard, code)` instead of `resolveClasses`, `resolveAttributes` and `resolveSelectors`.**
  - Bound: `architecture.md` § Wrapper test and § System constraints ("centralize any pattern repeated twice").
  - One leaf serves every group of every entity. Three named helpers would be three copies of one loop, or two rename-only wrappers.
  - It reads only the keys the default table declares, skips absent keys, and returns a frozen copy.
- **`static find` stays after the constructor and before the getters.** Bound: `architecture.md` § Class order does not mention statics. The brief places static members after the constructor and before the instance members, which is where `find` already sits. A static is not a member of `ButtonInterface`, so the "getters, then methods" order does not reach it.
- **The `MutationObserver.prototype.disconnect` recorder is inline in the Delegate pruning case.**
  - Bound: `tests.md` says to extract a recorder, but `tests/setupBrowser.ts` is report-only.
  - It follows the `recordListeners` shape and restores the prototype in `onTestFinished`.
  - The guide states that the delegate observes its root only while it owns an engine, so the recorder is the only thing that shows a stale entry: nothing else reads that entry.
  - It could move to `tests/setupBrowser.ts` as a shared helper. That is your call.
- **Mark key shape.** `static #driven: WeakMap<Event, WeakMap<route, WeakSet<HTMLElement>>>`, where the route is the engine class (`Button`). No second route exists this round, so no stub proof; the nested-roots case pins the per-click half.
- **The prefix cannot honour a replaced attribute name (observation, not changed).** `resolveOptions` builds each name as prefix plus key, as the brief specifies. `CollapseAttributeMap.parent` names "the panel attribute that feeds the `parent` option", so a replaced `attributes.parent` would not be read. My hypothesis: J-COLLAPSE passes the entity's resolved attribute table as the key-to-name map instead of a prefix.
- **Validation order.** `ColorMode` resolves `attributes` before it reads or writes the root. `Button` and `Delegate` resolve before they claim or listen, so a refused group leaves no claim and no listener.

## Answers to the Unknowns

1. **`CSS.supports('selector(…)')` on Chromium 153.0.8010.12** (probe read from `HeadlessChrome/153.0.8010.12`):

   | Selector | Result |
   | --- | --- |
   | `[data-bs-toggle="button"]` | `true` |
   | `:not(.disabled):not(:disabled)` | `true` |
   | `.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)` | `true` |
   | `.nav, .list-group` | `false` |
   | `.nav-link, .nav-item > .nav-link, .list-group-item` | `false` |

   The support query reads one complex selector, so it refuses lists. `isSelector` therefore parses with `document.createDocumentFragment().querySelector(value)` inside a `try`. The proof "accepts a selector list the selector support query refuses" pins this, and the mutation that swaps in `CSS.supports` reddens it.

   Also measured: `document.createAttribute` in Chromium 153 accepts `1data`, `-data`, `data:bs`, `Data-X`, `"q"`, `data.bs` and `é`. The platform uses the relaxed attribute-name rule, not the XML Name production. The proof asserts that `isAttributeName` agrees with `setAttribute`.
2. **Where the resolved tables live (derive-state law).** A table is stored only if something reads it after construction:
   - `Button` keeps `#classes`, because `pressed` and `toggle` read it.
   - `Button` resolves `selectors` as a constructor local only: it refuses invalid values, and no member reads selectors. A stored copy would be state nothing reads.
   - `Delegate` keeps `#button`, used for routing and construction on each click.
   - `ColorMode` keeps `#attributes`, read by `mode`, `apply` and `destroy`.

## Red-first record (`npm run test:src:browser`, Chromium 153.0.8010.12)

- **Before (stage A):** the new exports existed (`HostSnapshot`, the three tables, the three guards, `resolveVocabulary`) but the round-1 behaviour was unchanged. `Test Files 5 failed | 3 passed (8)`, `Tests 13 failed | 106 passed (119)`. The failing cases:
  - Button: "writes, tests, and restores only the pressed token its classes group names"; "refuses a group value that is not a class token or a selector before claiming the host"; "destroys the button when its signal aborts, and at construction when it arrived aborted".
  - ColorMode: "reads, writes, and restores only the attribute its attributes group names"; "refuses an attributes group value that is not an attribute name before writing".
  - Delegate: "drops an engine a consumer destroyed at the next activation and stops observing its root" (since broadened to "…at the next delivery or click…"); "routes by a replaced trigger selector alone and constructs each engine with its group"; "refuses a button group value that is not a class token or a selector at construction".
  - helpers: "carries the detail in the detail member alone, defining no own property on the event"; "reads the target attribute the table names and not the default one"; "merges the defaults, the declared attributes, and the constructor object in that order"; "reads each declared key under the prefix it is given and not under the default prefix".
  - index: "exports the browser surface without registering document or window listeners".
- **After:** `Test Files 8 passed (8)`, `Tests 119 passed (119)`.
- Some cases were already green at stage A: the three guards, the `resolveVocabulary` cases, the frozen-table cases, the false-and-0 case, the array-literal case, and the B5 boundary case. Each is bound by a mutation in the next section.

## Mutation table

The instrument is `binder2-mutate.mjs` in the session scratchpad. It applies one mutation, runs `npm run test:src:browser -- <proof> --testTimeout=3000`, and restores the source byte for byte; `sha256sum -c` confirmed the restore after both runs. Delegate rows are from the second run, taken on the final `#release(delivered)` code.

| Mutation | Reddened (tally) |
| --- | --- |
| HostSnapshot: empty attribute read as absent (`\|\|`) | "restores an empty attribute distinctly from an absent one" (1/7) |
| HostSnapshot: token restore rewrites the whole class list | "…keeps every token the snapshot never recorded"; "removes the class attribute it found absent…" (2/7) |
| Registry: claim records the registry instead of the engine | all four cases, including "records the claiming engine and finds it by host" (4/4) |
| Registry: one record shared by every registry | "keeps one record per registry…" (1/4) |
| emitEvent: always cancelable | "dispatches a bubbling non-cancelable event whose prevention changes nothing" (1/25) |
| emitEvent: detail mirrored as own properties | "carries the detail in the detail member alone…" (1/25) |
| bindEventMap: listeners ignore the signal | "binds the hooks of a non-Button map…"; "binds nothing for absent hooks or an aborted signal" (2/25) |
| settleAnimations: an idle element waits for a 20 ms timer | "resolves in a microtask when the element has no running animation"; "leaves infinite and paused animations out" (2/25) |
| `BUTTON_EVENTS` not frozen | "dispatches the completed state once as a bubbling non-cancelable event" (1/37) |
| `BUTTON_CLASSES` not frozen | "publishes frozen default tables…" (1/37) |
| `COLOR_MODE_ATTRIBUTES` not frozen | "toggles, persists, and writes the light attribute" (1/16) |
| isClassToken: whitespace admitted | isClassToken case (1/8) |
| isAttributeName: every string admitted | both isAttributeName cases (2/8) |
| isSelector: `CSS.supports('selector(…)')` instead of a parse | both isSelector cases (2/8) |
| readTargets: default attribute read instead of the table's | "reads the target attribute the table names…" (1/25) |
| resolveOptions: `data-bs-config` layer restored | merge-order case (1/25) |
| resolveOptions: constructor applied before attributes | merge-order case; "keeps a constructor false and 0…" (2/25) |
| resolveOptions: falsy constructor values dropped | "keeps a constructor false and 0…" (1/25) |
| resolveOptions: prefix parameter ignored | "reads each declared key under the prefix it is given…" (1/25) |
| resolveOptions: array literal unwrapped before coercion | "throws the entity code… an array literal included" (1/25) |
| resolveVocabulary: defaults returned uncopied and unfrozen | "returns a frozen copy of the defaults…" (1/25) |
| resolveVocabulary: undeclared keys admitted | "replaces each supplied key, keeps each absent key, and ignores an undeclared key" (1/25) |
| resolveVocabulary: guard skipped | "throws the entity code naming the key…" (1/25) |
| Button: classes group ignored | vocabulary case; refusal case (2/37) |
| Button: classes group kept by reference | vocabulary case; refusal case (2/37) |
| Button: selectors group not validated | refusal case (1/37) |
| Button: host claimed before groups are validated | refusal case (1/37) |
| Button: signal ignored / already-aborted signal ignored | signal case (1/37 each) |
| ColorMode: attributes group ignored | both ColorMode vocabulary cases (2/16) |
| ColorMode: attribute names not validated | refusal case (1/16) |
| Delegate: no drop of destroyed engines at a click / at a delivery | "drops an engine a consumer destroyed at the next delivery or click…" (1/20 each) |
| Delegate: routes by the default selector / engines built without the group | routing case (1/20 each) |
| Delegate: button selectors group not resolved | routing case; refusal case (2/20) |
| Delegate: observer never observes | removed-hosts, moved-out, the B5 boundary case, released-reacquired, and destroyed-engine cases (5/20) |
| Delegate: releases every owned engine at delivery, contained or not | removed-hosts; "…same synchronous run, before the observer delivers" (2/20) |
| Delegate: no per-click mark | nested-roots case (1/20) |
| Delegate: never drives a found engine | 9/20, including the reuse, consumer-engine, nested, and disabled cases |

## Acceptance commands (verbatim, in the brief's order)

```text
$ npm run check:src:browser
npm notice run @orkestrel/veneer@0.0.1 check:src:browser
npm notice run tsc --noEmit -p configs/src/tsconfig.browser.json
exit 0

$ npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
exit 0

$ npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
Checking formatting...

All matched files use the correct format.
Finished in 5095ms on 20 files using 16 threads.
exit 0

$ npm run test:src:browser
npm notice run @orkestrel/veneer@0.0.1 test:src:browser
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-binder

·······················································································································

 Test Files  8 passed (8)
      Tests  119 passed (119)
   Start at  16:34:56
   Duration  1.99s (transform 0ms, setup 320ms, import 79ms, tests 196ms, environment 0ms)

exit 0

$ npm run test:policy
npm notice run @orkestrel/veneer@0.0.1 test:policy
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-binder

····································································································-·········

 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
   Start at  16:34:59
   Duration  2.22s (transform 108ms, setup 64ms, import 249ms, tests 1.76s, environment 0ms)

exit 0

$ npm run test:guides
npm notice run @orkestrel/veneer@0.0.1 test:guides
npm notice run node --experimental-strip-types tests/guides.test.ts

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-binder

···················

 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  16:35:02
   Duration  1.07s (transform 201ms, setup 72ms, import 789ms, tests 48ms, environment 0ms)

exit 0

$ npm run build:src:browser
npm notice run @orkestrel/veneer@0.0.1 build:src:browser
npm notice run vite build --config configs/src/vite.browser.config.ts
vite v8.3.0 building client environment for production...
transforming...
✓ 11 modules transformed.
rendering chunks...
computing gzip size...
dist/src/browser/index.js  27.18 kB │ gzip: 8.27 kB │ map: 43.35 kB

✓ built in 81ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
exit 0

$ git diff --check
exit 0
```

- **Criterion 3:** `tests/src/browser/index.test.ts` asserts exactly these exports: `BUTTON_CLASSES`, `BUTTON_EVENTS`, `BUTTON_SELECTORS`, `Button`, `COLOR_MODE_ATTRIBUTES`, `COLOR_MODE_KEY`, `ColorMode`, `Delegate`, `HostSnapshot`, `OPTION_PREFIX`, `Registry`, `TARGET_ATTRIBUTE`, `bindEventMap`, `emitEvent`, `isAttributeName`, `isButtonEvent`, `isClassToken`, `isColorModeState`, `isSelector`, `readTarget`, `readTargets`, `reflow`, `resolveOptions`, `resolveVocabulary`, `settleAnimations`.
- **Criterion 4:** no fleet collision. I checked every new name against `node_modules/@orkestrel/scaffold/dist/host/guides/*.md` and none matched; `test:policy`'s `surface` rule also passes.

## `git status --short` and `git diff --stat`

```text
 M guides/veneer.md
 M src/browser/Button.ts
 M src/browser/ColorMode.ts
 M src/browser/Delegate.ts
 D src/browser/Snapshot.ts
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/index.ts
 M src/browser/validators.ts
 M tests/src/browser/Button.test.ts
 M tests/src/browser/ColorMode.test.ts
 M tests/src/browser/Delegate.test.ts
 D tests/src/browser/Snapshot.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
?? src/browser/HostSnapshot.ts
?? tests/src/browser/HostSnapshot.test.ts
```

```text
 guides/veneer.md                     | 187 +++++++++++++++-----------
 src/browser/Button.ts                |  53 +++++---
 src/browser/ColorMode.ts             |  41 ++++--
 src/browser/Delegate.ts              |  88 ++++++++----
 src/browser/Snapshot.ts              |  80 -----------
 src/browser/constants.ts             |  45 ++++---
 src/browser/helpers.ts               | 145 ++++++++++----------
 src/browser/index.ts                 |   2 +-
 src/browser/validators.ts            |  68 ++++++++--
 tests/src/browser/Button.test.ts     |  70 +++++++++-
 tests/src/browser/ColorMode.test.ts  |  37 ++++-
 tests/src/browser/Delegate.test.ts   | 109 ++++++++++++++-
 tests/src/browser/Snapshot.test.ts   |  90 -------------
 tests/src/browser/helpers.test.ts    | 253 ++++++++++++++++++++++++-----------
 tests/src/browser/index.test.ts      |  17 ++-
 tests/src/browser/validators.test.ts |  91 ++++++++++---
 16 files changed, 857 insertions(+), 519 deletions(-)
```

The two untracked files are the renames: `src/browser/HostSnapshot.ts` (80 lines) and `tests/src/browser/HostSnapshot.test.ts` (90 lines).

## Shared and off-limits file patches (report-only)

**The app consumers of the deleted `BUTTON_SELECTOR`.** These files are off-limits, and the deletion is what makes them false. Until this patch lands, `npx tsc --noEmit -p tsconfig.json` reports the three missing-import errors. It also reports `tests/app/browser/Showcase.test.ts(231,11) TS2358`, which I expect to clear with the imports, but I have not confirmed that. The patched copies pass `oxfmt --check`. I did not typecheck them, because I cannot write those files in place.

```diff
--- a/app/browser/sections/ButtonSection.ts
+++ b/app/browser/sections/ButtonSection.ts
@@ -1,6 +1,6 @@
 import type { ButtonInterface } from '@src/browser'
 import type { ButtonSpecimen, SectionInterface } from '../types.js'
-import { Button, BUTTON_SELECTOR } from '@src/browser'
+import { Button, BUTTON_SELECTORS } from '@src/browser'
 import { BUTTON_COPY, BUTTON_GRID, BUTTON_SPECIMENS } from '../constants.js'
 
 /**
@@ -71,7 +71,7 @@
 			label.textContent = specimen.name
 			element.append(label)
 		} else element.textContent = specimen.name
-		if (!element.matches(BUTTON_SELECTOR)) this.#engines.push(new Button(element))
+		if (!element.matches(BUTTON_SELECTORS.trigger)) this.#engines.push(new Button(element))
 		return element
 	}
 }
--- a/tests/app/browser/Showcase.test.ts
+++ b/tests/app/browser/Showcase.test.ts
@@ -36,7 +36,7 @@
 	TABLE_SPECIMENS,
 	VALIDATION_SPECIMENS,
 } from '@app/browser'
-import { Button, BUTTON_SELECTOR } from '@src/browser'
+import { Button, BUTTON_SELECTORS } from '@src/browser'
 import { requireValue } from '@orkestrel/test'
 import {
 	build,
@@ -180,7 +180,7 @@
 			// The published selector names the delegated population, so the hosts the sections own are
 			// whatever it leaves: a hand-written attribute test here would be a second declaration of
 			// the ownership rule and would pass while the published one moved.
-			const owned = specimens.filter((element) => !element.matches(BUTTON_SELECTOR))
+			const owned = specimens.filter((element) => !element.matches(BUTTON_SELECTORS.trigger))
 			expect(owned).not.toStrictEqual([])
 			// The shell paints the mode control's affordance through the class the showcase sets on
 			// that button, and what keeps every specimen out of the header is where this tree puts
--- a/tests/app/browser/sections/ButtonSection.test.ts
+++ b/tests/app/browser/sections/ButtonSection.test.ts
@@ -1,6 +1,6 @@
 import { BUTTON_SPECIMENS, ButtonSection } from '@app/browser'
 import { isAppError } from '@src/core'
-import { Button, BUTTON_SELECTOR } from '@src/browser'
+import { Button, BUTTON_SELECTORS } from '@src/browser'
 import { requireValue } from '@orkestrel/test'
 import {
 	build,
@@ -84,8 +84,8 @@
 		const section = new ButtonSection(host)
 		try {
 			const rendered = BUTTON_SPECIMENS.map((specimen) => readButton(host, specimen.name))
-			const delegated = rendered.filter((element) => element.matches(BUTTON_SELECTOR))
-			const plain = rendered.filter((element) => !element.matches(BUTTON_SELECTOR))
+			const delegated = rendered.filter((element) => element.matches(BUTTON_SELECTORS.trigger))
+			const plain = rendered.filter((element) => !element.matches(BUTTON_SELECTORS.trigger))
 			// The rendered partition is set beside the table's own declaration, so the selector and the
 			// specimen that carries it have to agree before either side of the sweep means anything.
 			expect(delegated.map((element) => readName(element))).toStrictEqual(
@@ -142,7 +142,7 @@
 		const section = new ButtonSection(host)
 		const selected = readButton(host, 'Selected')
 		const plain = BUTTON_SPECIMENS.map((specimen) => readButton(host, specimen.name)).filter(
-			(element) => !element.matches(BUTTON_SELECTOR),
+			(element) => !element.matches(BUTTON_SELECTORS.trigger),
 		)
 		try {
 			expect(readStates(selected)).toContain('pressed=true')
```

The retained `j-binder-patch-buttonsection.diff` (the owner message at line 133) is still needed, unchanged; this patch does not repeat it.

**`ROADMAP.md`.** Round 1 and this round make false the Button-shaped sentence and two deferral rows. The table rows are trimmed here; take the exact bytes from `binder2-roadmap.diff` in the scratchpad. The formatter drift at roadmap line 290 predates this patch.

```diff
@@ -146,9 +146,7 @@
   placement proved on captures, reduced-motion gating in script, `IntersectionObserver` for
   Scrollspy, and completion read from the actual transition. Refuse `@vue/reactivity`, the factory
   idiom, the fixed transition fallback, position-based bare-tag rules, the Tailwind `!important`
-  workaround, and post-`destroy` mutation. Land each mechanism with its first consumer: `emitEvent`,
-  `bindEventMap`, and `Delegate` stay Button-shaped and the guide records that until the first
-  cancelable-event component moves them.
+  workaround, and post-`destroy` mutation. Land each mechanism with its first consumer.
@@ -473,9 +471,7 @@
-| `emitEvent`, `bindEventMap`, and `Delegate` are Button-shaped (audit claim 24) | J-ENGINE's first cancelable-event unit moves all three (D41; F6 FOUNDATION recorded the shape, `04114c5`) |
-| Audit claim 4: delegated release on host removal happens only on the next click that reaches the root | J-ENGINE rules release-on-removal (D41; F4 HOST-OBSERVATIONS recorded the present semantics, `af673cb`) |
```

`src/browser/types.ts`, `tests/setupBrowser.ts` and `tests/setup.ts` need no patch.

## Deviation state

Complete, with no stop. The departures, all inside owned scope and recorded under Rulings:
- `instanceOf` in place of E10's `isInstance`, backed by the compiler error.
- `LINK_ATTRIBUTE` deleted and `aria-pressed` kept inline under the platform-name rule.
- One `resolveVocabulary` in place of three helpers.

Two items are open for you:
- The prefix-versus-attribute-table observation, before J-COLLAPSE.
- Whether to move the `MutationObserver` recorder into `tests/setupBrowser.ts`.

The scratchpad instruments are `binder2-mutate.mjs`, `binder2-mutations*.json`, `binder2-mutation-results*.json`, `binder2-red.log.txt` and `binder2-accept.log.txt`, in `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/` (retained beside this report as `j-binder2-*`).
