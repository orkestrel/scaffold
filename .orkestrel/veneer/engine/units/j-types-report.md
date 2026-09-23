# Unit J-TYPES — report

Executor: `opus` on Opus 5.5 (native Claude subagent), sole writer in `C:/Users/mikes/WebstormProjects/veneer-types` (branch `unit/types`, base `376d84a`). Brief: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-brief.md`. Spec: `j-engine-design-verdict.md` R2 to R14.

Result: every contract the brief names is declared in `src/browser/types.ts`, with a § Surface row and, for each behavioural interface, a § Methods table in `guides/veneer.md`. All five acceptance criteria pass, including `npm run test:guides`, which passes (19 of 19). No deviation stopped the unit.

## Contracts declared

Shared:

- `EventHooks<TMap>` (type): optional per-key listeners `(event: TMap[K]) => void`.
- `EventWire<TMap>` (type): per-key wire name typed `` `${K}.${string}` ``.
- `RegistryOptions` (interface): `code`, the error code a second claim throws.
- `RegistryInterface<TEngine>` (interface): `claim(host, engine)`, `find(host)`, `release(host, engine): boolean`.
- `SnapshotCategory` (type): `'attribute' | 'token' | 'property'`.
- `SnapshotTarget` (interface): `category`, `element`, `name`.
- `SnapshotInterface` (interface): `save(target)`, `restore()`.
- `IsolationOptions` (interface): `trigger`, the element focus returns to.
- `IsolationInterface` (interface): `host`, `destroy()`.
- `BackdropOptions` (interface): `class`, `parent`, `animated`.
- `BackdropInterface` (interface): `element`, `show()` and `hide()` returning `Promise<boolean>`, and `destroy()`.
- `ScrollLockOptions` (interface): `document`.
- `ScrollLockInterface` (interface): `document`, `destroy()`.
- `PlacementPosition` (type): Bootstrap's placement strings.
- `PlacementSide` (type): `'top' | 'right' | 'bottom' | 'left'`.
- `PlacementOptions` (interface): `position`, `offset`, `fallbacks`, `static`.
- `PlacementInput` (interface): `reference`, `element`, `hint`.
- `PlacementInterface` (interface): `reference`, `element`, `side`, `update()`, `destroy()`.
- `SwipeDirection` (type): `'left' | 'right'`.
- `SwipeOptions` (interface): `handler` (required) and `threshold`.
- `SwipeInterface` (interface): `host`, `destroy()`.
- `SanitizeAllowlist` (type): `Readonly<Record<string, ReadonlyArray<string | RegExp>>>`.
- `SanitizeOptions` (interface): `enabled`, `allow`, `filter`.
- `SetHTMLOptions` (interface): `sanitizer`.
- `SanitizeTargetInterface` (interface): `setHTML(html, options?)`.
- `TipContent` (type): `string | Element | ((trigger) => string | Element | undefined)`.

Per component. Each gets an `{Entity}EventMap`, an `{Entity}Hooks` type equal to `EventHooks<{Entity}EventMap>`, `{Entity}Options` carrying `on` and `signal`, and `{Entity}Interface`:

- **Collapse:** no detail type. Events: `show`, `shown`, `hide`, `hidden`. Options: `parent`, `toggle`. Interface: `host`, `shown`, `show`, `hide`, `toggle`, `destroy`.
- **Dropdown:** `DropdownDetail` carries `relatedTarget` and `clickEvent`. Events: `show`, `shown`, `hide`, `hidden`. Options: `dismiss { inside, outside }`, `placement`, `reference`. Interface: `host`, `menu`, `shown`, `show`, `hide`, `toggle`, `update`, `destroy`.
- **Tab:** `TabDetail` carries `relatedTarget`. Events: `show`, `shown`, `hide`, `hidden`. Options: none beyond `on` and `signal`. Interface: `host`, `pane`, `active`, `show`, `destroy`.
- **ScrollSpy:** `ScrollSpyDetail` carries `relatedTarget`. Event: `activate`. Options: `target`, `smooth`, `intersection { margin, threshold }`. Interface: `host`, `target`, `active`, `refresh`, `destroy`.
- **Modal:** `ModalDetail` carries `relatedTarget`. Events: `show`, `shown`, `hide`, `hidden`, `hidePrevented`. Options: `backdrop`, `dismiss` (typed `DismissOptions { backdrop, escape }`), `focus`. Interface: `host`, `shown`, `show(trigger?)`, `hide`, `toggle(trigger?)`, `update`, `destroy`.
- **Offcanvas:** `OffcanvasDetail` carries `relatedTarget`. Events: the same five as Modal. Options: `backdrop`, `dismiss` (`DismissOptions`), `scroll`. Interface: `host`, `shown`, `show(trigger?)`, `hide`, `toggle(trigger?)`, `destroy`.
- **Tooltip:** no detail type. Events: `show`, `shown`, `hide`, `hidden`, `inserted`. Options: `animation`, `delay { show, hide }`, `trigger { hover, focus, click }`, `title`, `html`, `tip { template, class }`, `container`, `placement`, `sanitize`, `selector`. Interface: `host`, `shown`, `enabled`, `show`, `hide`, `toggle`, `enable`, `disable`, `fill`, `update`, `destroy`.
- **Popover:** no detail type. Events: the same five as Tooltip. Options: `PopoverOptions extends TooltipOptions` and adds `content`, with `on` typed `PopoverHooks`. Interface: the same members as `TooltipInterface`, declared in its own body.
- **Alert:** no detail type. Events: `close`, `closed`. Options: none beyond `on` and `signal`. Interface: `host`, `close`, `destroy`.
- **Toast:** no detail type. Events: `show`, `shown`, `hide`, `hidden`. Options: `animation`, `autohide`, `delay`. Interface: `host`, `shown`, `show`, `hide`, `destroy`.
- **Carousel:** `CarouselDetail` carries `relatedTarget`, `direction` (typed `SwipeDirection`), `from`, and `to`. `CarouselRide` is `'load' | 'interaction'`. Events: `slide`, `slid`. Options: `interval`, `keyboard`, `pause`, `ride`, `touch`, `wrap`. Interface: `host`, `index`, `next`, `previous`, `slide(index)`, `start`, `pause`, `destroy`.

The seed's declarations are unchanged except `ColorModeInterface.toggle`'s TSDoc, which the Orchestrator's mid-campaign decision directed (see the first ruling).

## Rulings taken

1. **`ColorModeInterface.toggle` summary.** The text is now "Flips the mode and returns the applied mode, or returns the root's mode without writing after destruction." The matching Summary cell in the guide's `ColorModeInterface` table carries the same text. Bound: the Orchestrator's decision for J-SEED, following the `ButtonInterface.toggle` form. Nothing else in `ColorModeInterface` changed.
2. **`EventHooks<TMap>`.** Each listener returns `void`. Bound: R2, where a handler's return value refuses nothing.
3. **`EventWire<TMap>`.** Each value is typed `` `${K & string}.${string}` ``, so a wire table whose name does not open with its own key fails to compile. Bound: R3, where keys mirror Bootstrap's verbs. The probe proves the refusal.
4. **One event type per entity.** Every key of an entity with a detail type carries `CustomEvent<{Entity}Detail>`. On the Modal and Offcanvas `hide`, `hidden`, and `hidePrevented` events, `relatedTarget` is `undefined`. With one event type per entity, each entity needs only one guard. Bound: the brief's "each `CustomEvent<{Entity}Detail>` or `CustomEvent<undefined>`", and the planner's binder shape that the verdict adopts.
5. **Detail fields that can be absent.** Each is a present key typed `T | undefined`, and none uses `null`. This covers `relatedTarget` for Tab, Modal, and Offcanvas, and `clickEvent` for Dropdown. Bound: `AGENTS.md`, where absence is `undefined`, and `names.md`, where a declared wire body keeps Bootstrap's field names.
6. **`RegistryInterface.release(host, engine)`.** It releases only when that engine holds the claim, so a stale second `destroy()` cannot free a later owner's claim. The error code comes from `RegistryOptions.code`. Bound: R4.
7. **`SnapshotTarget`.** It is one interface with a `category` discriminant over `SnapshotCategory`, and the first save of a target wins. Bound: R4, the planner's snapshot shape, and `names.md`, where a named discriminant never uses `kind` or `type`.
8. **`IsolationOptions.trigger`.** It names where focus returns. Its default is the element focused at construction. Bound: R8 focus return. Modal's and Offcanvas's `show(trigger?)` is the consumer.
9. **No `signal` option on the mechanisms.** Isolation, Backdrop, ScrollLock, Placement, and Swipe take no `signal`, because the owning component ends each one through `destroy()`. Bound: `architecture.md` § System constraints, minimal interfaces.
10. **Backdrop.** `class` defaults to `modal-backdrop`, `parent` to the body, and `animated` to `false`, which is Bootstrap's `isAnimated` default. `show` and `hide` return `Promise<boolean>`. Bound: R8.
11. **ScrollLock.** Construction locks, `destroy()` releases, and the `document` option scopes the lock to one document. Bound: R8.
12. **`PlacementPosition`.** It holds `auto`, the four sides, and their `-start` and `-end` variants, which is the set Bootstrap's Tooltip and Dropdown pass to Popper. Popper's `auto-start` and `auto-end` are left out because Bootstrap passes neither. Bound: the brief's "Bootstrap's placement string union".
13. **`PlacementSide`.** It is added as the type of `PlacementInterface.side`, the resolved physical side that `data-popper-placement` carries. Bound: R9.
14. **`PlacementOptions`.** It is `{ position, offset: readonly [number, number], fallbacks, static }`, shared by Dropdown, Tooltip, and Popover as their `placement` group and by the mechanism. Bootstrap's function and string `offset` forms reach TypeScript as the tuple, and the parser converts the string form. Bound: R11 `placement: { position, offset, fallbacks, static }`, and R9 for Placement writing `data-bs-popper="static"`.
15. **`PlacementInput`.** It is `{ reference, element, hint }` and carries the promotion mode the component fixes (`hint` for Tooltip, `manual` for Dropdown and Popover). This keeps the mode out of the consumer's `placement` group, where a consumer could otherwise break Dropdown's dismissal rules. Bound: R9, and the `{Entity}Input` form in `names.md` for creation input.
16. **`SwipeDirection`.** One type serves `SwipeOptions.handler` and `CarouselDetail.direction`, because both name the direction content moves: Bootstrap's `carousel.js` maps a left swipe to `direction: 'left'`. Bound: `AGENTS.md`, one concept, one term. `SwipeOptions.handler` is required and `threshold` defaults to `40`.
17. **`SanitizeAllowlist`.** Its values admit `RegExp` beside strings, so the default allowlist can state Bootstrap's `aria-*` pattern. R10 expands each match against the attribute names the input carries. Bound: R10.
18. **`SanitizeOptions`.** It is `{ enabled, allow, filter }`, and `filter` is an inline `(html: string) => string` function type. Bound: R10 and R11.
19. **`SetHTMLOptions` and `SanitizeTargetInterface`.** These declare the structural `setHTML(html, options?)` contract that R10 writes through. Measurement: `grep -n "CloseWatcher\|interface Sanitizer\|setHTML(" node_modules/typescript/lib/lib.dom.d.ts` against TypeScript `6.0.3` matched `interface Sanitizer` (line 34572) and no `setHTML(`. `setHTMLUnsafe(html: string)` is declared at line 13893. `CloseWatcher` is absent, and no contract is declared for it because R7 defers it. Bound: the brief's § Measurements and R10.
20. **`TipContent`.** Its function form receives the trigger, and it admits no `null`: an `undefined` or empty slot value removes the slot, and the parser maps a JSON `null` to `undefined`. Bound: `AGENTS.md`, where absence is `undefined`, and R10.
21. **Options that Bootstrap accepts as a selector or an element.** `parent`, `container`, `reference`, and `target` are typed `HTMLElement` only. The parsers resolve `data-bs-*` selectors, and Dropdown's `'toggle'` and `'parent'` strings, into elements. `tip.class` is a string only, so Bootstrap's function form of `customClass` is excluded. Bound: R11 and the minimal-API law.
22. **Group types.** `DismissOptions` is named because Modal and Offcanvas share it. Dropdown's `dismiss`, Tooltip's `delay`, `trigger`, and `tip`, and ScrollSpy's `intersection` stay inline, each with one use. Bound: `patterns.md` § Options, and the `architecture.md` rule to centralize a repeated pattern.
23. **`PopoverOptions`.** It extends `TooltipOptions` and states Popover's different defaults in `@remarks`. Redeclaring `trigger` and `tip` failed with `TS2430` under `exactOptionalPropertyTypes`. Bound: R12.
24. **`PopoverInterface`.** It declares its own members rather than `extends TooltipInterface {}`. The parity reader reads only a declaration's own body: the `extends` form produced "documents no source PopoverInterface.show" and the matching finding for every other method. The two contracts stay mutually assignable, as the probe shows. Bound: R12 and `documentation.md` § Parity.
25. **`CarouselRide` and `pause`.** `CarouselRide` is named because the parser validates it. `pause` is a boolean because Bootstrap's `'hover' | false` is a binary switch. Bound: R11, the Union/enum-like form in `names.md`, and the boolean behaviour law in `AGENTS.md`.
26. **Which verbs return `Promise<boolean>`.** "State-changing verbs" is read as the verbs that dispatch a pre-change event or run a transition: `show`, `hide`, `toggle`, `close`, `next`, `previous`, `slide`, and Backdrop's `show` and `hide`. `enable`, `disable`, `fill`, `update`, `refresh`, `start`, and `pause` return `void`. Bound: R6 and R12.
27. **State getters.** The getters are Dropdown `menu`; Tab `pane` (`HTMLElement | undefined`) and `active`; ScrollSpy `target` and `active` (`HTMLElement | undefined`); Carousel `index` (`number | undefined`); Tooltip and Popover `shown` and `enabled`; and `shown` on Collapse, Modal, Offcanvas, and Toast. Alert has no getter beyond `host`. Bound: R12 and the planner's Components table.
28. **Tooltip `container` default.** The default is the nearest `aria-modal="true"` ancestor, else the body. Bound: R17, which adopts the planner's proof matrix, including the Popover row "the container is inside the isolated host".
29. **No TypeScript option for `boundary` or `popperConfig`.** Bound: R9.
30. **An `@example` on every interface method.** This completes the TSDoc and is the example evidence `report.examples.methods` accepts. Bound: the `typescript.md` rule that TSDoc is complete, `@example` included where applicable.
31. **`ButtonHooks` stays the seed's interface.** It is structurally equal to `EventHooks<ButtonEventMap>` in both directions, as the probe shows. J-BINDER migrates it. Bound: the brief's "seed declarations unchanged in meaning".

## Acceptance criteria

Every command ran from `C:/Users/mikes/WebstormProjects/veneer-types`.

The following output is from criterion 1, `npm run check:src:browser`:

```text
npm notice run tsc --noEmit -p configs/src/tsconfig.browser.json
check exit=0
```

The following output is from criterion 2, `npx oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts` and then `npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md`:

```text
npm notice run oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts
lint exit=0
All matched files use the correct format.
Finished in 4493ms on 2 files using 16 threads.
fmt exit=0
```

Criterion 3 is the contract list in the preceding section. The type-level probe `scratchpad/probe.ts`, compiled with `npx tsc --ignoreConfig --noEmit --strict --exactOptionalPropertyTypes --lib ESNext,DOM ...`, fails on exactly its two lines marked BAD and compiles every other line:

```text
probe.ts(29,2): error TS2322: Type '"shown.bs.collapse"' is not assignable to type '`show.${string}`'.
probe.ts(35,42): error TS2353: Object literal may only specify known properties, and 'opened' does not exist in type 'EventHooks<CollapseEventMap>'.
```

The mutations each probe line distinguishes:

- The wire-key template: typing values `string` makes line 29 compile.
- The hook key set: an index signature makes line 35 compile.
- The `ButtonHooks` and `EventHooks<ButtonEventMap>` equality in both directions, and `PopoverInterface` assignable to `TooltipInterface`, all compile.

The following output is from criterion 4, `npm run test:policy`:

```text
Test Files  1 passed (1)
     Tests  109 passed | 1 skipped (110)
```

The prose sweep covered the added lines of `git diff -U0 src/browser/types.ts guides/veneer.md` with the pattern `should|simply|easy|just|currently|now|new|latest|once|since|above|below|via|utilize|leverage|please|etc|e\.g|i\.e|robust|performant|ensure|guarantee|dummy|whitelist|blacklist|master`, case-insensitive and whole-word. It returned `once` five times, each in "at once", a permitted sense, and `new` once, inside the code sample `new Sanitizer()`.

The following output is from criterion 5, `npm run test:guides`, run on the final tree:

```text
···················
 Test Files  1 passed (1)
      Tests  19 passed (19)
```

The following output is from the shared-file check, `npm run test:src:browser -- tests/src/browser/index.test.ts`:

```text
 Test Files  1 passed (1)
      Tests  2 passed (2)
```

## Unknown 1 measurement

The answer: `report.methods` and `report.sections` admit a behavioural interface that no class implements. `report.examples.methods` refuses each method that has no example, whether the evidence would come from a `ts` fence mentioning the name or from an `@example` on the interface member. The unit closes that finding with member `@example` blocks, so `npm run test:guides` passes on the final tree.

The probe removed the member `@example` blocks from `CollapseInterface` alone and ran `npm run test:guides`. It then restored the file from a copy; the SHA-256 digest was `28a70f29…95bcc8` before and after:

```text
 FAIL   guides  tests/guides.test.ts > Veneer > documents an example for every method
+     "text": "guides/veneer.md has no example for CollapseInterface.show.",
+     "text": "guides/veneer.md has no example for CollapseInterface.hide.",
      Tests  1 failed | 18 passed (19)
```

`toggle` and `destroy` pass without member examples because the existing ColorMode fences mention both names.

The first full run, with `PopoverInterface extends TooltipInterface {}`, failed two tests:

- `keeps behavioral interfaces and implementing classes in parity`: "guides/veneer.md documents no source PopoverInterface.show." and the same finding for `hide`, `toggle`, `enable`, `disable`, `fill`, `update`, and `destroy`.
- `documents an example for every method`: "guides/veneer.md has no example for PopoverInterface.show." and the same finding for `hide`, `enable`, `disable`, `fill`, and `update`.

Ruling 24 closes both. After it, `Tests 19 passed (19)`.

## Worktree state

The following output is from `git status --short`:

```text
 M guides/veneer.md
 M src/browser/types.ts
```

The following output is from `git diff --stat`:

```text
 guides/veneer.md     |  308 ++++++++++--
 src/browser/types.ts | 1335 +++++++++++++++++++++++++++++++++++++++++++++++++-
 2 files changed, 1606 insertions(+), 37 deletions(-)
```

The guide's 37 deleted lines are whitespace only, apart from the authorized `ColorModeInterface` `toggle` cell. The widened Summary column forced oxfmt to re-pad every existing § Surface row and the `ColorModeInterface` table. A content-level diff with whitespace collapsed shows only the two separator rows and the `toggle` cell changing. The formatted text was produced by running `oxfmt --write` on a scratch copy and reading the diff before copying it into the worktree, never by running `--write` on the guide in place. The hunks are `10,40c10,118` (§ Surface), `77,81c155,159` (the `ColorModeInterface` table), and `94a173,330` (the new § Methods tables).

## Shared-file patches

None. `tests/src/browser/index.test.ts` stays unmoved, and its run passes.

## Deviation state

No stop. One ancillary choice was settled inside the owned scope: the re-padding of the existing § Surface rows described under Worktree state. It is formatter whitespace in the table that the owned rows sit in.

## Diff

The following is the complete output of `git diff`:

```diff
diff --git a/guides/veneer.md b/guides/veneer.md
index cff0aa9..b633e53 100644
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -7,37 +7,115 @@
 The core entry publishes the token registry and the types that read it. The browser entry
 publishes the color-mode controller. The token values those names carry are in § Tokens.
 
-| Name                   | Kind      | Summary                                                                                                                              |
-| ---------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
-| `TOKEN_NAMES`          | const     | Names every canonical custom property the shipped cascade declares, grouped by the surface each one paints or the scale it controls. |
-| `TokenLeaf`            | type      | Reduces a group of custom-property names to the union of the names at its leaves.                                                    |
-| `TokenMap`             | type      | Describes the grouped tree of custom-property names the token registry carries.                                                      |
-| `TokenName`            | type      | Names one canonical custom property the shipped cascade declares.                                                                    |
-| `ColorModeState`       | type      | Names the color modes Bootstrap's color-mode attribute accepts.                                                                      |
-| `ColorModeOptions`     | interface | Configures the root and optional persistence of a color-mode controller.                                                             |
-| `ColorModeInterface`   | interface | Controls the color-mode attribute on one root element.                                                                               |
-| `ColorMode`            | class     | Applies and optionally restores a root's color mode without registering listeners.                                                   |
-| `isColorModeState`     | const     | Checks whether a value names a supported color mode.                                                                                 |
-| `COLOR_MODE_ATTRIBUTE` | const     | Names the Bootstrap color-mode attribute.                                                                                            |
-| `COLOR_MODE_KEY`       | const     | Names the storage key for the chosen color mode.                                                                                     |
-| `AppError`             | class     | Describes a programmer error with a machine-readable code and optional context.                                                      |
-| `isAppError`           | function  | Checks whether a value belongs to the application's error class.                                                                     |
-| `BUTTON_ACTIVE`        | const     | Names the class that carries a button's pressed state.                                                                               |
-| `BUTTON_SELECTOR`      | const     | Selects hosts activated by delegated button clicks.                                                                                  |
-| `BUTTON_TOGGLE`        | const     | Names the bubbling event dispatched after a button toggles.                                                                          |
-| `Button`               | class     | Toggles a host's pressed state and restores its original state on destruction.                                                       |
-| `ButtonDetail`         | interface | Describes the pressed state after a button toggles.                                                                                  |
-| `ButtonEventMap`       | interface | Maps a button's completed toggle to its DOM event.                                                                                   |
-| `ButtonHooks`          | interface | Configures the initial DOM event subscriptions for a button.                                                                         |
-| `ButtonInterface`      | interface | Controls the pressed class and accessibility attribute on a host.                                                                    |
-| `ButtonOptions`        | interface | Configures a button's initial event hooks.                                                                                           |
-| `Delegate`             | class     | Activates data-attribute button hosts through a root's delegated click listener.                                                     |
-| `DelegateInterface`    | interface | Owns delegated activation and the button engines it constructs.                                                                      |
-| `DelegateOptions`      | interface | Configures the root for delegated button activation.                                                                                 |
-| `bindEventMap`         | function  | Binds button hooks to their DOM wire events until the signal aborts.                                                                 |
-| `emitEvent`            | function  | Dispatches a bubbling, non-cancelable DOM event carrying the supplied detail.                                                        |
-| `isButtonEvent`        | function  | Checks whether a DOM event carries a boolean pressed state.                                                                          |
-| `isButtonHost`         | function  | Checks whether a value is an HTML host in the current browser realm.                                                                 |
+| Name                      | Kind      | Summary                                                                                                                              |
+| ------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
+| `TOKEN_NAMES`             | const     | Names every canonical custom property the shipped cascade declares, grouped by the surface each one paints or the scale it controls. |
+| `TokenLeaf`               | type      | Reduces a group of custom-property names to the union of the names at its leaves.                                                    |
+| `TokenMap`                | type      | Describes the grouped tree of custom-property names the token registry carries.                                                      |
+| `TokenName`               | type      | Names one canonical custom property the shipped cascade declares.                                                                    |
+| `ColorModeState`          | type      | Names the color modes Bootstrap's color-mode attribute accepts.                                                                      |
+| `ColorModeOptions`        | interface | Configures the root and optional persistence of a color-mode controller.                                                             |
+| `ColorModeInterface`      | interface | Controls the color-mode attribute on one root element.                                                                               |
+| `ColorMode`               | class     | Applies and optionally restores a root's color mode without registering listeners.                                                   |
+| `isColorModeState`        | const     | Checks whether a value names a supported color mode.                                                                                 |
+| `COLOR_MODE_ATTRIBUTE`    | const     | Names the Bootstrap color-mode attribute.                                                                                            |
+| `COLOR_MODE_KEY`          | const     | Names the storage key for the chosen color mode.                                                                                     |
+| `AppError`                | class     | Describes a programmer error with a machine-readable code and optional context.                                                      |
+| `isAppError`              | function  | Checks whether a value belongs to the application's error class.                                                                     |
+| `BUTTON_ACTIVE`           | const     | Names the class that carries a button's pressed state.                                                                               |
+| `BUTTON_SELECTOR`         | const     | Selects hosts activated by delegated button clicks.                                                                                  |
+| `BUTTON_TOGGLE`           | const     | Names the bubbling event dispatched after a button toggles.                                                                          |
+| `Button`                  | class     | Toggles a host's pressed state and restores its original state on destruction.                                                       |
+| `ButtonDetail`            | interface | Describes the pressed state after a button toggles.                                                                                  |
+| `ButtonEventMap`          | interface | Maps a button's completed toggle to its DOM event.                                                                                   |
+| `ButtonHooks`             | interface | Configures the initial DOM event subscriptions for a button.                                                                         |
+| `ButtonInterface`         | interface | Controls the pressed class and accessibility attribute on a host.                                                                    |
+| `ButtonOptions`           | interface | Configures a button's initial event hooks.                                                                                           |
+| `Delegate`                | class     | Activates data-attribute button hosts through a root's delegated click listener.                                                     |
+| `DelegateInterface`       | interface | Owns delegated activation and the button engines it constructs.                                                                      |
+| `DelegateOptions`         | interface | Configures the root for delegated button activation.                                                                                 |
+| `bindEventMap`            | function  | Binds button hooks to their DOM wire events until the signal aborts.                                                                 |
+| `emitEvent`               | function  | Dispatches a bubbling, non-cancelable DOM event carrying the supplied detail.                                                        |
+| `isButtonEvent`           | function  | Checks whether a DOM event carries a boolean pressed state.                                                                          |
+| `isButtonHost`            | function  | Checks whether a value is an HTML host in the current browser realm.                                                                 |
+| `EventHooks`              | type      | Maps each event of an entity's event map to an optional listener bound until the entity is destroyed.                                |
+| `EventWire`               | type      | Maps each event of an entity's event map to the wire name its bubbling DOM event carries.                                            |
+| `RegistryOptions`         | interface | Configures the ownership record one engine class keeps for its hosts.                                                                |
+| `RegistryInterface`       | interface | Records which engine owns each host, one record per engine class.                                                                    |
+| `SnapshotCategory`        | type      | Names the kinds of host state a snapshot records: an attribute, a class token, or an inline property.                                |
+| `SnapshotTarget`          | interface | Describes one piece of host state a snapshot records before an engine first writes it.                                               |
+| `SnapshotInterface`       | interface | Records host state before an engine writes it and writes that state back on restore.                                                 |
+| `IsolationOptions`        | interface | Configures where focus returns when an isolation ends.                                                                               |
+| `IsolationInterface`      | interface | Makes every element outside a host inert while the isolation lives.                                                                  |
+| `BackdropOptions`         | interface | Configures the backdrop element a modal or an offcanvas panel places behind itself.                                                  |
+| `BackdropInterface`       | interface | Shows and hides the cascade's own backdrop element.                                                                                  |
+| `ScrollLockOptions`       | interface | Configures the document a scroll lock holds.                                                                                         |
+| `ScrollLockInterface`     | interface | Holds one reference to a document-wide scroll lock that compensates for the scrollbar's width.                                       |
+| `PlacementPosition`       | type      | Names Bootstrap's placement strings, the positions a menu or a tip takes against its reference.                                      |
+| `PlacementSide`           | type      | Names the physical side a positioned element resolves to, as its `data-popper-placement` attribute carries it.                       |
+| `PlacementOptions`        | interface | Configures where a menu or a tip sits against its reference.                                                                         |
+| `PlacementInput`          | interface | Names the elements a placement anchors and the popover mode it promotes the positioned element with.                                 |
+| `PlacementInterface`      | interface | Anchors a menu or a tip to its reference through CSS anchor positioning in the top layer.                                            |
+| `SwipeDirection`          | type      | Names the horizontal direction a swipe or a slide moves the content.                                                                 |
+| `SwipeOptions`            | interface | Configures the gesture a swipe reports and where it reports it.                                                                      |
+| `SwipeInterface`          | interface | Reports horizontal touch and pen swipes on a host through pointer events.                                                            |
+| `SanitizeAllowlist`       | type      | Maps each element name to the attributes sanitized tip markup keeps on it, mirroring Bootstrap's `allowList` option.                 |
+| `SanitizeOptions`         | interface | Configures how tip markup is sanitized before it is written.                                                                         |
+| `SetHTMLOptions`          | interface | Mirrors the WHATWG dictionary the platform's `setHTML` method reads its sanitizer from.                                              |
+| `SanitizeTargetInterface` | interface | Describes a node whose `setHTML` method parses markup through a sanitizer, which the installed DOM declarations omit.                |
+| `TipContent`              | type      | Describes the content of a tip slot: text, an element moved in, or a function of the trigger returning either.                       |
+| `CollapseEventMap`        | interface | Maps a collapse's wire events to the verbs Bootstrap names them by.                                                                  |
+| `CollapseHooks`           | type      | Configures the initial DOM event subscriptions for a collapse.                                                                       |
+| `CollapseOptions`         | interface | Configures a collapse's accordion parent, initial toggle, hooks, and lifetime.                                                       |
+| `CollapseInterface`       | interface | Shows and hides a `.collapse` panel through its height or width transition.                                                          |
+| `DropdownDetail`          | interface | Transliterates the fields Bootstrap hydrates onto a dropdown event.                                                                  |
+| `DropdownEventMap`        | interface | Maps a dropdown's wire events to the verbs Bootstrap names them by.                                                                  |
+| `DropdownHooks`           | type      | Configures the initial DOM event subscriptions for a dropdown.                                                                       |
+| `DropdownOptions`         | interface | Configures a dropdown's dismissal, placement, reference, hooks, and lifetime.                                                        |
+| `DropdownInterface`       | interface | Opens and closes a `.dropdown-menu` from its toggle, anchored in the top layer.                                                      |
+| `TabDetail`               | interface | Transliterates the field Bootstrap hydrates onto a tab event.                                                                        |
+| `TabEventMap`             | interface | Maps a tab's wire events to the verbs Bootstrap names them by.                                                                       |
+| `TabHooks`                | type      | Configures the initial DOM event subscriptions for a tab.                                                                            |
+| `TabOptions`              | interface | Configures a tab's hooks and lifetime.                                                                                               |
+| `TabInterface`            | interface | Activates a tab trigger and its pane, and moves focus between sibling triggers with the arrow keys.                                  |
+| `ScrollSpyDetail`         | interface | Transliterates the field Bootstrap hydrates onto a scrollspy event.                                                                  |
+| `ScrollSpyEventMap`       | interface | Maps a scrollspy's wire event to the verb Bootstrap names it by.                                                                     |
+| `ScrollSpyHooks`          | type      | Configures the initial DOM event subscriptions for a scrollspy.                                                                      |
+| `ScrollSpyOptions`        | interface | Configures a scrollspy's navigation, scrolling, observation, hooks, and lifetime.                                                    |
+| `ScrollSpyInterface`      | interface | Activates the navigation link whose section is in view as a container scrolls.                                                       |
+| `DismissOptions`          | interface | Selects which close requests hide a modal or an offcanvas panel.                                                                     |
+| `ModalDetail`             | interface | Transliterates the field Bootstrap hydrates onto a modal event.                                                                      |
+| `ModalEventMap`           | interface | Maps a modal's wire events to the verbs Bootstrap names them by.                                                                     |
+| `ModalHooks`              | type      | Configures the initial DOM event subscriptions for a modal.                                                                          |
+| `ModalOptions`            | interface | Configures a modal's backdrop, dismissal, focus, hooks, and lifetime.                                                                |
+| `ModalInterface`          | interface | Shows and hides a `.modal` over a backdrop, with scroll lock and focus isolation.                                                    |
+| `OffcanvasDetail`         | interface | Transliterates the field Bootstrap hydrates onto an offcanvas event.                                                                 |
+| `OffcanvasEventMap`       | interface | Maps an offcanvas panel's wire events to the verbs Bootstrap names them by.                                                          |
+| `OffcanvasHooks`          | type      | Configures the initial DOM event subscriptions for an offcanvas panel.                                                               |
+| `OffcanvasOptions`        | interface | Configures an offcanvas panel's backdrop, dismissal, scrolling, hooks, and lifetime.                                                 |
+| `OffcanvasInterface`      | interface | Slides an `.offcanvas` panel in and out, with an optional backdrop, scroll lock, and focus isolation.                                |
+| `TooltipEventMap`         | interface | Maps a tooltip's wire events to the verbs Bootstrap names them by.                                                                   |
+| `TooltipHooks`            | type      | Configures the initial DOM event subscriptions for a tooltip.                                                                        |
+| `TooltipOptions`          | interface | Configures a tooltip's content, triggers, timing, tip, placement, sanitizing, hooks, and lifetime.                                   |
+| `TooltipInterface`        | interface | Shows a tip anchored to its trigger in the top layer on hover, focus, click, or call.                                                |
+| `PopoverEventMap`         | interface | Maps a popover's wire events to the verbs Bootstrap names them by.                                                                   |
+| `PopoverHooks`            | type      | Configures the initial DOM event subscriptions for a popover.                                                                        |
+| `PopoverOptions`          | interface | Configures a popover: the tooltip options, a body slot, and the popover defaults.                                                    |
+| `PopoverInterface`        | interface | Shows a header-and-body tip anchored to its trigger: the tooltip contract under the `.bs.popover` event names.                       |
+| `AlertEventMap`           | interface | Maps an alert's wire events to the verbs Bootstrap names them by.                                                                    |
+| `AlertHooks`              | type      | Configures the initial DOM event subscriptions for an alert.                                                                         |
+| `AlertOptions`            | interface | Configures an alert's hooks and lifetime.                                                                                            |
+| `AlertInterface`          | interface | Closes an `.alert` by fading it out and removing it from the document.                                                               |
+| `ToastEventMap`           | interface | Maps a toast's wire events to the verbs Bootstrap names them by.                                                                     |
+| `ToastHooks`              | type      | Configures the initial DOM event subscriptions for a toast.                                                                          |
+| `ToastOptions`            | interface | Configures a toast's fade, automatic hiding, hooks, and lifetime.                                                                    |
+| `ToastInterface`          | interface | Shows a `.toast` in its container's flow and hides it after a delay.                                                                 |
+| `CarouselDetail`          | interface | Transliterates the fields Bootstrap hydrates onto a carousel event.                                                                  |
+| `CarouselEventMap`        | interface | Maps a carousel's wire events to the verbs Bootstrap names them by.                                                                  |
+| `CarouselHooks`           | type      | Configures the initial DOM event subscriptions for a carousel.                                                                       |
+| `CarouselRide`            | type      | Names when a carousel starts cycling on its own: at construction, or after the first interaction.                                    |
+| `CarouselOptions`         | interface | Configures a carousel's cycling, keyboard and touch input, wrapping, hooks, and lifetime.                                            |
+| `CarouselInterface`       | interface | Moves a `.carousel` between its items by call, key, swipe, indicator, or interval.                                                   |
 
 The controller reads its mode from the root on every access. A `dark` attribute selects dark mode;
 every other value selects light mode. Applying a mode writes the attribute for that mode, light
@@ -74,11 +152,11 @@ The interface exposes the following lifecycle operations.
 
 #### `ColorModeInterface`
 
-| Method    | Summary                                                     |
-| --------- | ----------------------------------------------------------- |
-| `apply`   | Writes the mode to the root and to storage when configured. |
-| `toggle`  | Flips the mode and returns the applied mode.                |
-| `destroy` | Restores the attribute the root carried at construction.    |
+| Method    | Summary                                                                                                    |
+| --------- | ---------------------------------------------------------------------------------------------------------- |
+| `apply`   | Writes the mode to the root and to storage when configured.                                                |
+| `toggle`  | Flips the mode and returns the applied mode, or returns the root's mode without writing after destruction. |
+| `destroy` | Restores the attribute the root carried at construction.                                                   |
 
 #### `ButtonInterface`
 
@@ -93,6 +171,164 @@ The interface exposes the following lifecycle operations.
 | --------- | ------------------------------------------------------------------- |
 | `destroy` | Releases the click listener and destroys every owned button engine. |
 
+#### `RegistryInterface`
+
+| Method    | Summary                                                        |
+| --------- | -------------------------------------------------------------- |
+| `claim`   | Records the engine as the host's owner.                        |
+| `find`    | Returns the host's owner, or undefined when the host has none. |
+| `release` | Removes the host's claim when the supplied engine holds it.    |
+
+#### `SnapshotInterface`
+
+| Method    | Summary                                                        |
+| --------- | -------------------------------------------------------------- |
+| `save`    | Records the target's value the first time the target is saved. |
+| `restore` | Writes every recorded value back and forgets the records.      |
+
+#### `IsolationInterface`
+
+| Method    | Summary                                                                          |
+| --------- | -------------------------------------------------------------------------------- |
+| `destroy` | Restores every inert value the isolation wrote and returns focus to the trigger. |
+
+#### `BackdropInterface`
+
+| Method    | Summary                                                                           |
+| --------- | --------------------------------------------------------------------------------- |
+| `show`    | Appends the backdrop element and adds the `show` class.                           |
+| `hide`    | Removes the `show` class and removes the backdrop element after its fade settles. |
+| `destroy` | Removes the backdrop element at once and releases its listeners.                  |
+
+#### `ScrollLockInterface`
+
+| Method    | Summary                                                                                       |
+| --------- | --------------------------------------------------------------------------------------------- |
+| `destroy` | Releases this reference and restores the document's scroll state when no other lock holds it. |
+
+#### `PlacementInterface`
+
+| Method    | Summary                                                                                         |
+| --------- | ----------------------------------------------------------------------------------------------- |
+| `update`  | Measures the side the element resolved to and rewrites its `data-popper-placement` attribute.   |
+| `destroy` | Removes the popover promotion and restores every declaration and attribute the placement wrote. |
+
+#### `SwipeInterface`
+
+| Method    | Summary                                                      |
+| --------- | ------------------------------------------------------------ |
+| `destroy` | Removes the pointer listeners and the `pointer-event` class. |
+
+#### `SanitizeTargetInterface`
+
+| Method    | Summary                                                                                                      |
+| --------- | ------------------------------------------------------------------------------------------------------------ |
+| `setHTML` | Replaces the node's children with the markup the sanitizer keeps, mirroring the platform's `setHTML` method. |
+
+#### `CollapseInterface`
+
+| Method    | Summary                                                                                   |
+| --------- | ----------------------------------------------------------------------------------------- |
+| `show`    | Shows the panel and hides its open accordion siblings.                                    |
+| `hide`    | Hides the panel.                                                                          |
+| `toggle`  | Hides the panel when it is shown and shows it otherwise.                                  |
+| `destroy` | Releases hooks, abandons a transition in flight, and restores the panel and its triggers. |
+
+#### `DropdownInterface`
+
+| Method    | Summary                                                                               |
+| --------- | ------------------------------------------------------------------------------------- |
+| `show`    | Opens the menu.                                                                       |
+| `hide`    | Closes the menu.                                                                      |
+| `toggle`  | Closes the menu when it is open and opens it otherwise.                               |
+| `update`  | Measures the side the open menu resolved to and rewrites its placement attribute.     |
+| `destroy` | Releases hooks, closes the menu without events, and restores the toggle and the menu. |
+
+#### `TabInterface`
+
+| Method    | Summary                                                                              |
+| --------- | ------------------------------------------------------------------------------------ |
+| `show`    | Activates the trigger and its pane and deactivates the active sibling.               |
+| `destroy` | Releases hooks and the key listener and restores the trigger's roles and attributes. |
+
+#### `ScrollSpyInterface`
+
+| Method    | Summary                                                                                |
+| --------- | -------------------------------------------------------------------------------------- |
+| `refresh` | Re-reads the navigation's links and observes their sections again.                     |
+| `destroy` | Releases hooks, disconnects the observer, and removes the classes the scrollspy added. |
+
+#### `ModalInterface`
+
+| Method    | Summary                                                                                                      |
+| --------- | ------------------------------------------------------------------------------------------------------------ |
+| `show`    | Shows the modal, locks document scrolling, and isolates focus inside it.                                     |
+| `hide`    | Hides the modal and releases its scroll lock and focus isolation.                                            |
+| `toggle`  | Hides the modal when it is shown and shows it otherwise.                                                     |
+| `update`  | Recomputes the scrollbar compensation after the modal's content changes height.                              |
+| `destroy` | Releases hooks, abandons a transition in flight, and restores the modal, the backdrop, scrolling, and focus. |
+
+#### `OffcanvasInterface`
+
+| Method    | Summary                                                                                                      |
+| --------- | ------------------------------------------------------------------------------------------------------------ |
+| `show`    | Shows the panel, and isolates focus inside it when it has a backdrop or locks scrolling.                     |
+| `hide`    | Hides the panel and releases its backdrop, scroll lock, and focus isolation.                                 |
+| `toggle`  | Hides the panel when it is shown and shows it otherwise.                                                     |
+| `destroy` | Releases hooks, abandons a transition in flight, and restores the panel, the backdrop, scrolling, and focus. |
+
+#### `TooltipInterface`
+
+| Method    | Summary                                                                                           |
+| --------- | ------------------------------------------------------------------------------------------------- |
+| `show`    | Builds, inserts, and shows the tip.                                                               |
+| `hide`    | Hides the tip and removes it from its container.                                                  |
+| `toggle`  | Hides the tip when it is shown and shows it otherwise.                                            |
+| `enable`  | Lets triggers and calls show the tip again.                                                       |
+| `disable` | Keeps triggers and calls from showing the tip until it is enabled again.                          |
+| `fill`    | Replaces the content of the tip's slots, keyed by each slot's selector, and rebuilds a shown tip. |
+| `update`  | Measures the side the shown tip resolved to and rewrites its placement attribute.                 |
+| `destroy` | Releases hooks and pending delays, removes the tip, and restores the trigger's attributes.        |
+
+#### `PopoverInterface`
+
+| Method    | Summary                                                                                           |
+| --------- | ------------------------------------------------------------------------------------------------- |
+| `show`    | Builds, inserts, and shows the tip, removing the header or body slot whose content is empty.      |
+| `hide`    | Hides the tip and removes it from its container.                                                  |
+| `toggle`  | Hides the tip when it is shown and shows it otherwise.                                            |
+| `enable`  | Lets triggers and calls show the tip again.                                                       |
+| `disable` | Keeps triggers and calls from showing the tip until it is enabled again.                          |
+| `fill`    | Replaces the content of the tip's slots, keyed by each slot's selector, and rebuilds a shown tip. |
+| `update`  | Measures the side the shown tip resolved to and rewrites its placement attribute.                 |
+| `destroy` | Releases hooks and pending delays, removes the tip, and restores the trigger's attributes.        |
+
+#### `AlertInterface`
+
+| Method    | Summary                                                                           |
+| --------- | --------------------------------------------------------------------------------- |
+| `close`   | Fades the alert out, removes it from the document, and dispatches `closed` on it. |
+| `destroy` | Releases hooks and restores the alert without removing it.                        |
+
+#### `ToastInterface`
+
+| Method    | Summary                                                           |
+| --------- | ----------------------------------------------------------------- |
+| `show`    | Shows the toast and starts the delay after which it hides itself. |
+| `hide`    | Hides the toast.                                                  |
+| `destroy` | Releases hooks, clears the pending delay, and restores the toast. |
+
+#### `CarouselInterface`
+
+| Method     | Summary                                                                          |
+| ---------- | -------------------------------------------------------------------------------- |
+| `next`     | Slides to the following item.                                                    |
+| `previous` | Slides to the preceding item.                                                    |
+| `slide`    | Slides to the item at a position, waiting for a slide in flight to finish first. |
+| `start`    | Starts or restarts cycling through the items at the configured interval.         |
+| `pause`    | Pauses cycling until it is started again.                                        |
+| `destroy`  | Releases hooks, stops cycling and swipes, and restores the carousel's classes.   |
+
 ## Examples
 
 Construct a controller on the document root, select a mode, toggle it, and release its attribute.
diff --git a/src/browser/types.ts b/src/browser/types.ts
index 3629d8b..53892d5 100644
--- a/src/browser/types.ts
+++ b/src/browser/types.ts
@@ -17,7 +17,7 @@ export interface ColorModeInterface {
 	readonly mode: ColorModeState
 	/** Writes the mode to the root and to storage when configured. */
 	apply(mode: ColorModeState): void
-	/** Flips the mode and returns the applied mode. */
+	/** Flips the mode and returns the applied mode, or returns the root's mode without writing after destruction. */
 	toggle(): ColorModeState
 	/** Restores the attribute the root carried at construction. */
 	destroy(): void
@@ -68,3 +68,1336 @@ export interface DelegateInterface {
 	/** Releases the click listener and destroys every owned button engine. */
 	destroy(): void
 }
+
+/**
+ * Maps each event of an entity's event map to an optional listener bound until the entity is destroyed.
+ *
+ * @typeParam TMap - The entity's event map, keyed by the verb each wire event mirrors.
+ * @example
+ * ```ts
+ * const hooks: EventHooks<CollapseEventMap> = { shown: (event) => console.log(event.type) }
+ * ```
+ */
+export type EventHooks<TMap> = { readonly [TKey in keyof TMap]?: (event: TMap[TKey]) => void }
+
+/**
+ * Maps each event of an entity's event map to the wire name its bubbling DOM event carries.
+ *
+ * @typeParam TMap - The entity's event map, keyed by the verb each wire event mirrors.
+ * @remarks
+ * Each wire name opens with its key and a dot, so a table naming `shown.bs.collapse` for the `show`
+ * key fails to compile.
+ * @example
+ * ```ts
+ * const wire: EventWire<CollapseEventMap> = {
+ * 	show: 'show.bs.collapse',
+ * 	shown: 'shown.bs.collapse',
+ * 	hide: 'hide.bs.collapse',
+ * 	hidden: 'hidden.bs.collapse',
+ * }
+ * ```
+ */
+export type EventWire<TMap> = { readonly [TKey in keyof TMap]: `${TKey & string}.${string}` }
+
+/** Configures the ownership record one engine class keeps for its hosts. */
+export interface RegistryOptions {
+	/** Names the error code a second claim on an owned host throws, such as `COLLAPSE_HOST_OWNED`. */
+	readonly code: string
+}
+
+/**
+ * Records which engine owns each host, one record per engine class.
+ *
+ * @typeParam TEngine - The engine the record holds, keyed weakly by its host.
+ */
+export interface RegistryInterface<TEngine extends object> {
+	/**
+	 * Records the engine as the host's owner.
+	 *
+	 * @param host - The element the engine owns.
+	 * @param engine - The engine claiming the host.
+	 * @throws Thrown when the host already has an owner, as an `AppError` carrying the configured code.
+	 * @example
+	 * ```ts
+	 * registry.claim(host, engine)
+	 * ```
+	 */
+	claim(host: HTMLElement, engine: TEngine): void
+	/**
+	 * Returns the host's owner, or undefined when the host has none.
+	 *
+	 * @param host - The element to look up.
+	 * @returns The owning engine, or undefined when no engine claims the host.
+	 * @example
+	 * ```ts
+	 * const owner = registry.find(host)
+	 * ```
+	 */
+	find(host: HTMLElement): TEngine | undefined
+	/**
+	 * Removes the host's claim when the supplied engine holds it.
+	 *
+	 * @param host - The element to release.
+	 * @param engine - The engine giving the host up.
+	 * @returns True if the engine held the host and the claim was removed; false otherwise.
+	 * @example
+	 * ```ts
+	 * registry.release(host, engine)
+	 * ```
+	 */
+	release(host: HTMLElement, engine: TEngine): boolean
+}
+
+/** Names the kinds of host state a snapshot records: an attribute, a class token, or an inline property. */
+export type SnapshotCategory = 'attribute' | 'token' | 'property'
+
+/** Describes one piece of host state a snapshot records before an engine first writes it. */
+export interface SnapshotTarget {
+	/** Selects whether the name is an attribute, a class token, or an inline style property. */
+	readonly category: SnapshotCategory
+	/** Carries the element whose state is recorded. */
+	readonly element: HTMLElement
+	/** Names the attribute, the class token, or the inline style property. */
+	readonly name: string
+}
+
+/** Records host state before an engine writes it and writes that state back on restore. */
+export interface SnapshotInterface {
+	/**
+	 * Records the target's value the first time the target is saved.
+	 *
+	 * @param target - The attribute, class token, or inline property about to be written.
+	 * @remarks
+	 * A later save of the same target keeps the first recording.
+	 * @example
+	 * ```ts
+	 * snapshot.save({ category: 'attribute', element: host, name: 'aria-expanded' })
+	 * ```
+	 */
+	save(target: SnapshotTarget): void
+	/**
+	 * Writes every recorded value back and forgets the records.
+	 *
+	 * @remarks
+	 * An attribute or a property recorded as absent is removed, and a class token recorded as absent
+	 * is taken off the list. State the snapshot never recorded keeps every consumer edit.
+	 * @example
+	 * ```ts
+	 * snapshot.restore()
+	 * ```
+	 */
+	restore(): void
+}
+
+/** Configures where focus returns when an isolation ends. */
+export interface IsolationOptions {
+	/** Receives focus when the isolation ends, if connected and visible. Default: the element focused at construction. */
+	readonly trigger?: HTMLElement
+}
+
+/** Makes every element outside a host inert while the isolation lives. */
+export interface IsolationInterface {
+	/** Carries the element that keeps focus. */
+	readonly host: HTMLElement
+	/**
+	 * Restores every inert value the isolation wrote and returns focus to the trigger.
+	 *
+	 * @remarks
+	 * Focus moves only when the trigger is connected and visible. A second call does nothing.
+	 * @example
+	 * ```ts
+	 * isolation.destroy()
+	 * ```
+	 */
+	destroy(): void
+}
+
+/** Configures the backdrop element a modal or an offcanvas panel places behind itself. */
+export interface BackdropOptions {
+	/** Names the class the backdrop element carries. Default: `modal-backdrop`. */
+	readonly class?: string
+	/** Receives the backdrop element. Default: the document body. */
+	readonly parent?: HTMLElement
+	/** If `true`, fades the backdrop in and out through the `fade` class; if `false`, adds and removes it at once. Default: `false`. */
+	readonly animated?: boolean
+}
+
+/** Shows and hides the cascade's own backdrop element. */
+export interface BackdropInterface {
+	/** Carries the backdrop element, appended to the parent while shown. */
+	readonly element: HTMLElement
+	/**
+	 * Appends the backdrop element and adds the `show` class.
+	 *
+	 * @returns Resolves true after the fade settles; false when the backdrop was shown or is destroyed.
+	 * @example
+	 * ```ts
+	 * const appeared = await backdrop.show()
+	 * ```
+	 */
+	show(): Promise<boolean>
+	/**
+	 * Removes the `show` class and removes the backdrop element after its fade settles.
+	 *
+	 * @returns Resolves true after the element is removed; false when the backdrop was hidden or is destroyed.
+	 * @example
+	 * ```ts
+	 * const removed = await backdrop.hide()
+	 * ```
+	 */
+	hide(): Promise<boolean>
+	/**
+	 * Removes the backdrop element at once and releases its listeners.
+	 *
+	 * @example
+	 * ```ts
+	 * backdrop.destroy()
+	 * ```
+	 */
+	destroy(): void
+}
+
+/** Configures the document a scroll lock holds. */
+export interface ScrollLockOptions {
+	/** Carries the document whose scrolling is locked. Default: the global `document`. */
+	readonly document?: Document
+}
+
+/** Holds one reference to a document-wide scroll lock that compensates for the scrollbar's width. */
+export interface ScrollLockInterface {
+	/** Carries the document whose scrolling is locked. */
+	readonly document: Document
+	/**
+	 * Releases this reference and restores the document's scroll state when no other lock holds it.
+	 *
+	 * @remarks
+	 * The last release restores `overflow`, the padding and margin compensation on the body and the
+	 * fixed and sticky elements, and the `modal-open` class. A second call does nothing.
+	 * @example
+	 * ```ts
+	 * lock.destroy()
+	 * ```
+	 */
+	destroy(): void
+}
+
+/** Names Bootstrap's placement strings, the positions a menu or a tip takes against its reference. */
+export type PlacementPosition =
+	| 'auto'
+	| 'top'
+	| 'top-start'
+	| 'top-end'
+	| 'right'
+	| 'right-start'
+	| 'right-end'
+	| 'bottom'
+	| 'bottom-start'
+	| 'bottom-end'
+	| 'left'
+	| 'left-start'
+	| 'left-end'
+
+/** Names the physical side a positioned element resolves to, as its `data-popper-placement` attribute carries it. */
+export type PlacementSide = 'top' | 'right' | 'bottom' | 'left'
+
+/** Configures where a menu or a tip sits against its reference. */
+export interface PlacementOptions {
+	/** Names the preferred placement, mirroring Bootstrap's `placement` option. Default: `bottom`. */
+	readonly position?: PlacementPosition
+	/** Shifts the element along and away from the reference in pixels, mirroring Bootstrap's `offset` option. Default: `[0, 0]`. */
+	readonly offset?: readonly [number, number]
+	/** Lists the placements tried in order when the preferred one overflows, mirroring Bootstrap's `fallbackPlacements` option. Default: the opposite side. */
+	readonly fallbacks?: readonly PlacementPosition[]
+	/** If `true`, leaves the element in flow with `data-bs-popper="static"`, mirroring Bootstrap's `display: 'static'`; if `false`, anchors and promotes it. Default: `false`. */
+	readonly static?: boolean
+}
+
+/** Names the elements a placement anchors and the popover mode it promotes the positioned element with. */
+export interface PlacementInput {
+	/** Carries the element the positioned element is anchored to. */
+	readonly reference: HTMLElement
+	/** Carries the menu or tip that is positioned. */
+	readonly element: HTMLElement
+	/** If `true`, promotes the element with `popover="hint"`; if `false`, with `popover="manual"`. Default: `false`. */
+	readonly hint?: boolean
+}
+
+/** Anchors a menu or a tip to its reference through CSS anchor positioning in the top layer. */
+export interface PlacementInterface {
+	/** Carries the element the positioned element is anchored to. */
+	readonly reference: HTMLElement
+	/** Carries the menu or tip that is positioned. */
+	readonly element: HTMLElement
+	/** Reads the side the element resolved to, or undefined when the element stays in flow. */
+	readonly side: PlacementSide | undefined
+	/**
+	 * Measures the side the element resolved to and rewrites its `data-popper-placement` attribute.
+	 *
+	 * @example
+	 * ```ts
+	 * placement.update()
+	 * ```
+	 */
+	update(): void
+	/**
+	 * Removes the popover promotion and restores every declaration and attribute the placement wrote.
+	 *
+	 * @example
+	 * ```ts
+	 * placement.destroy()
+	 * ```
+	 */
+	destroy(): void
+}
+
+/** Names the horizontal direction a swipe or a slide moves the content. */
+export type SwipeDirection = 'left' | 'right'
+
+/** Configures the gesture a swipe reports and where it reports it. */
+export interface SwipeOptions {
+	/** Receives the direction of each completed swipe. */
+	readonly handler: (direction: SwipeDirection) => void
+	/** Sets the horizontal distance in pixels a pointer travels before the movement counts as a swipe. Default: `40`. */
+	readonly threshold?: number
+}
+
+/** Reports horizontal touch and pen swipes on a host through pointer events. */
+export interface SwipeInterface {
+	/** Carries the element that receives the pointer events. */
+	readonly host: HTMLElement
+	/**
+	 * Removes the pointer listeners and the `pointer-event` class.
+	 *
+	 * @example
+	 * ```ts
+	 * swipe.destroy()
+	 * ```
+	 */
+	destroy(): void
+}
+
+/**
+ * Maps each element name to the attributes sanitized tip markup keeps on it, mirroring Bootstrap's `allowList` option.
+ *
+ * @remarks
+ * The `*` key lists the attributes every element keeps. A regular expression admits every attribute
+ * name it matches, as Bootstrap's pattern for `aria-*` names does.
+ */
+export type SanitizeAllowlist = Readonly<Record<string, ReadonlyArray<string | RegExp>>>
+
+/** Configures how tip markup is sanitized before it is written. */
+export interface SanitizeOptions {
+	/** If `true`, writes markup through the platform sanitizer; if `false`, writes it unsanitized, mirroring Bootstrap's `sanitize: false`. Default: `true`. */
+	readonly enabled?: boolean
+	/** Lists the elements and attributes sanitized markup keeps. Default: Bootstrap's default allowlist. */
+	readonly allow?: SanitizeAllowlist
+	/** Replaces the platform sanitizer with a trusted function whose result is written unsanitized, mirroring Bootstrap's `sanitizeFn` option. */
+	readonly filter?: (html: string) => string
+}
+
+/**
+ * Mirrors the WHATWG dictionary the platform's `setHTML` method reads its sanitizer from.
+ *
+ * @remarks
+ * The HTML standard gives the dictionary this name, and TypeScript's DOM library does not declare it.
+ */
+export interface SetHTMLOptions {
+	/** Carries the sanitizer the markup is parsed through. Default: the platform's safe default sanitizer. */
+	readonly sanitizer?: Sanitizer
+}
+
+/**
+ * Describes a node whose `setHTML` method parses markup through a sanitizer, which the installed DOM declarations omit.
+ *
+ * @remarks
+ * TypeScript's DOM library declares `Sanitizer` and `setHTMLUnsafe` and leaves `setHTML` out, so a
+ * guard narrows an element to this contract before the tip content is written.
+ */
+export interface SanitizeTargetInterface {
+	/**
+	 * Replaces the node's children with the markup the sanitizer keeps, mirroring the platform's `setHTML` method.
+	 *
+	 * @param html - The markup to parse.
+	 * @param options - The sanitizer to parse it through.
+	 * @example
+	 * ```ts
+	 * target.setHTML('<b>Saved</b>', { sanitizer: new Sanitizer() })
+	 * ```
+	 */
+	setHTML(html: string, options?: SetHTMLOptions): void
+}
+
+/** Describes the content of a tip slot: text, an element moved in, or a function of the trigger returning either. */
+export type TipContent = string | Element | ((trigger: HTMLElement) => string | Element | undefined)
+
+/** Maps a collapse's wire events to the verbs Bootstrap names them by. */
+export interface CollapseEventMap {
+	/** Mirrors the `show.bs.collapse` event, whose prevention refuses the show. */
+	readonly show: CustomEvent<undefined>
+	/** Mirrors the `shown.bs.collapse` event, dispatched after the panel's transition settles. */
+	readonly shown: CustomEvent<undefined>
+	/** Mirrors the `hide.bs.collapse` event, whose prevention refuses the hide. */
+	readonly hide: CustomEvent<undefined>
+	/** Mirrors the `hidden.bs.collapse` event, dispatched after the panel's transition settles. */
+	readonly hidden: CustomEvent<undefined>
+}
+
+/** Configures the initial DOM event subscriptions for a collapse. */
+export type CollapseHooks = EventHooks<CollapseEventMap>
+
+/** Configures a collapse's accordion parent, initial toggle, hooks, and lifetime. */
+export interface CollapseOptions {
+	/** Carries the accordion whose other open panels hide when this panel shows, mirroring Bootstrap's `parent` option. */
+	readonly parent?: HTMLElement
+	/** If `true`, toggles the panel at construction; if `false`, leaves it as found. Default: `true`. */
+	readonly toggle?: boolean
+	/** Subscribes until the collapse is destroyed. */
+	readonly on?: CollapseHooks
+	/** Destroys the collapse when it aborts. */
+	readonly signal?: AbortSignal
+}
+
+/** Shows and hides a `.collapse` panel through its height or width transition. */
+export interface CollapseInterface {
+	/** Carries the panel. */
+	readonly host: HTMLElement
+	/** Reads whether the panel carries the `show` class. */
+	readonly shown: boolean
+	/**
+	 * Shows the panel and hides its open accordion siblings.
+	 *
+	 * @returns Resolves true after the `shown` event; false when the panel was shown, a transition was in flight, a listener prevented `show`, or the collapse is destroyed.
+	 * @example
+	 * ```ts
+	 * const opened = await collapse.show()
+	 * ```
+	 */
+	show(): Promise<boolean>
+	/**
+	 * Hides the panel.
+	 *
+	 * @returns Resolves true after the `hidden` event; false when the panel was hidden, a transition was in flight, a listener prevented `hide`, or the collapse is destroyed.
+	 * @example
+	 * ```ts
+	 * const closed = await collapse.hide()
+	 * ```
+	 */
+	hide(): Promise<boolean>
+	/**
+	 * Hides the panel when it is shown and shows it otherwise.
+	 *
+	 * @returns Resolves as the `show` or `hide` call it makes resolves.
+	 * @example
+	 * ```ts
+	 * const changed = await collapse.toggle()
+	 * ```
+	 */
+	toggle(): Promise<boolean>
+	/**
+	 * Releases hooks, abandons a transition in flight, and restores the panel and its triggers.
+	 *
+	 * @example
+	 * ```ts
+	 * collapse.destroy()
+	 * ```
+	 */
+	destroy(): void
+}
+
+/** Transliterates the fields Bootstrap hydrates onto a dropdown event. */
+export interface DropdownDetail {
+	/** Carries the dropdown's toggle, as Bootstrap's `relatedTarget` field does. */
+	readonly relatedTarget: HTMLElement
+	/** Carries the click that hid the menu, as Bootstrap's `clickEvent` field does, or undefined for every other cause. */
+	readonly clickEvent: MouseEvent | undefined
+}
+
+/** Maps a dropdown's wire events to the verbs Bootstrap names them by. */
+export interface DropdownEventMap {
+	/** Mirrors the `show.bs.dropdown` event, whose prevention refuses the show. */
+	readonly show: CustomEvent<DropdownDetail>
+	/** Mirrors the `shown.bs.dropdown` event, dispatched after the menu opens. */
+	readonly shown: CustomEvent<DropdownDetail>
+	/** Mirrors the `hide.bs.dropdown` event, whose prevention refuses the hide. */
+	readonly hide: CustomEvent<DropdownDetail>
+	/** Mirrors the `hidden.bs.dropdown` event, dispatched after the menu closes. */
+	readonly hidden: CustomEvent<DropdownDetail>
+}
+
+/** Configures the initial DOM event subscriptions for a dropdown. */
+export type DropdownHooks = EventHooks<DropdownEventMap>
+
+/** Configures a dropdown's dismissal, placement, reference, hooks, and lifetime. */
+export interface DropdownOptions {
+	/** Selects which clicks close the open menu, mirroring Bootstrap's `autoClose` option. */
+	readonly dismiss?: {
+		/** If `true`, a click inside the menu closes it; if `false`, it does not. Default: `true`. */
+		readonly inside?: boolean
+		/** If `true`, a click outside the menu closes it; if `false`, it does not. Default: `true`. */
+		readonly outside?: boolean
+	}
+	/** Positions the menu against its reference. Default: the side the direction classes and `--bs-position` select, at offset `[0, 2]`. */
+	readonly placement?: PlacementOptions
+	/** Carries the element the menu is anchored to, mirroring Bootstrap's `reference` option. Default: the toggle. */
+	readonly reference?: HTMLElement
+	/** Subscribes until the dropdown is destroyed. */
+	readonly on?: DropdownHooks
+	/** Destroys the dropdown when it aborts. */
+	readonly signal?: AbortSignal
+}
+
+/** Opens and closes a `.dropdown-menu` from its toggle, anchored in the top layer. */
+export interface DropdownInterface {
+	/** Carries the toggle. */
+	readonly host: HTMLElement
+	/** Carries the menu the toggle opens. */
+	readonly menu: HTMLElement
+	/** Reads whether the menu carries the `show` class. */
+	readonly shown: boolean
+	/**
+	 * Opens the menu.
+	 *
+	 * @returns Resolves true after the `shown` event; false when the menu was open, the toggle is disabled, a listener prevented `show`, or the dropdown is destroyed.
+	 * @example
+	 * ```ts
+	 * const opened = await dropdown.show()
+	 * ```
+	 */
+	show(): Promise<boolean>
+	/**
+	 * Closes the menu.
+	 *
+	 * @returns Resolves true after the `hidden` event; false when the menu was closed, the toggle is disabled, a listener prevented `hide`, or the dropdown is destroyed.
+	 * @example
+	 * ```ts
+	 * const closed = await dropdown.hide()
+	 * ```
+	 */
+	hide(): Promise<boolean>
+	/**
+	 * Closes the menu when it is open and opens it otherwise.
+	 *
+	 * @returns Resolves as the `show` or `hide` call it makes resolves.
+	 * @example
+	 * ```ts
+	 * const changed = await dropdown.toggle()
+	 * ```
+	 */
+	toggle(): Promise<boolean>
+	/**
+	 * Measures the side the open menu resolved to and rewrites its placement attribute.
+	 *
+	 * @example
+	 * ```ts
+	 * dropdown.update()
+	 * ```
+	 */
+	update(): void
+	/**
+	 * Releases hooks, closes the menu without events, and restores the toggle and the menu.
+	 *
+	 * @example
+	 * ```ts
+	 * dropdown.destroy()
+	 * ```
+	 */
+	destroy(): void
+}
+
+/** Transliterates the field Bootstrap hydrates onto a tab event. */
+export interface TabDetail {
+	/** Carries the other tab of the swap, as Bootstrap's `relatedTarget` field does, or undefined when no tab was active. */
+	readonly relatedTarget: HTMLElement | undefined
+}
+
+/** Maps a tab's wire events to the verbs Bootstrap names them by. */
+export interface TabEventMap {
+	/** Mirrors the `show.bs.tab` event on the incoming tab, whose prevention refuses the swap. */
+	readonly show: CustomEvent<TabDetail>
+	/** Mirrors the `shown.bs.tab` event on the incoming tab, dispatched after its pane shows. */
+	readonly shown: CustomEvent<TabDetail>
+	/** Mirrors the `hide.bs.tab` event on the outgoing tab, whose prevention refuses the swap. */
+	readonly hide: CustomEvent<TabDetail>
+	/** Mirrors the `hidden.bs.tab` event on the outgoing tab, dispatched after its pane hides. */
+	readonly hidden: CustomEvent<TabDetail>
+}
+
+/** Configures the initial DOM event subscriptions for a tab. */
+export type TabHooks = EventHooks<TabEventMap>
+
+/** Configures a tab's hooks and lifetime. */
+export interface TabOptions {
+	/** Subscribes until the tab is destroyed. */
+	readonly on?: TabHooks
+	/** Destroys the tab when it aborts. */
+	readonly signal?: AbortSignal
+}
+
+/** Activates a tab trigger and its pane, and moves focus between sibling triggers with the arrow keys. */
+export interface TabInterface {
+	/** Carries the trigger. */
+	readonly host: HTMLElement
+	/** Carries the pane the trigger shows, or undefined when the trigger names none. */
+	readonly pane: HTMLElement | undefined
+	/** Reads whether the trigger carries the `active` class. */
+	readonly active: boolean
+	/**
+	 * Activates the trigger and its pane and deactivates the active sibling.
+	 *
+	 * @returns Resolves true after the `shown` event; false when the trigger was active, a listener prevented `show` or the sibling's `hide`, or the tab is destroyed.
+	 * @example
+	 * ```ts
+	 * const activated = await tab.show()
+	 * ```
+	 */
+	show(): Promise<boolean>
+	/**
+	 * Releases hooks and the key listener and restores the trigger's roles and attributes.
+	 *
+	 * @example
+	 * ```ts
+	 * tab.destroy()
+	 * ```
+	 */
+	destroy(): void
+}
+
+/** Transliterates the field Bootstrap hydrates onto a scrollspy event. */
+export interface ScrollSpyDetail {
+	/** Carries the link that became active, as Bootstrap's `relatedTarget` field does. */
+	readonly relatedTarget: HTMLElement
+}
+
+/** Maps a scrollspy's wire event to the verb Bootstrap names it by. */
+export interface ScrollSpyEventMap {
+	/** Mirrors the `activate.bs.scrollspy` event, dispatched after a link becomes active; its prevention refuses nothing. */
+	readonly activate: CustomEvent<ScrollSpyDetail>
+}
+
+/** Configures the initial DOM event subscriptions for a scrollspy. */
+export type ScrollSpyHooks = EventHooks<ScrollSpyEventMap>
+
+/** Configures a scrollspy's navigation, scrolling, observation, hooks, and lifetime. */
+export interface ScrollSpyOptions {
+	/** Carries the navigation whose links follow the scroll, mirroring Bootstrap's `target` option. Default: the document body. */
+	readonly target?: HTMLElement
+	/** If `true`, a link click scrolls smoothly to its section, mirroring Bootstrap's `smoothScroll` option; if `false`, it jumps. Default: `false`. */
+	readonly smooth?: boolean
+	/** Configures the observer that decides which section is in view. */
+	readonly intersection?: {
+		/** Sets the observer's root margin, mirroring Bootstrap's `rootMargin` option. Default: `0px 0px -25%`. */
+		readonly margin?: string
+		/** Lists the visible ratios that report a section, mirroring Bootstrap's `threshold` option. Default: `[0.1, 0.5, 1]`. */
+		readonly threshold?: readonly number[]
+	}
+	/** Subscribes until the scrollspy is destroyed. */
+	readonly on?: ScrollSpyHooks
+	/** Destroys the scrollspy when it aborts. */
+	readonly signal?: AbortSignal
+}
+
+/** Activates the navigation link whose section is in view as a container scrolls. */
+export interface ScrollSpyInterface {
+	/** Carries the scrolling element. */
+	readonly host: HTMLElement
+	/** Carries the navigation whose links follow the scroll. */
+	readonly target: HTMLElement
+	/** Reads the active link, or undefined when no section is in view. */
+	readonly active: HTMLElement | undefined
+	/**
+	 * Re-reads the navigation's links and observes their sections again.
+	 *
+	 * @example
+	 * ```ts
+	 * spy.refresh()
+	 * ```
+	 */
+	refresh(): void
+	/**
+	 * Releases hooks, disconnects the observer, and removes the classes the scrollspy added.
+	 *
+	 * @example
+	 * ```ts
+	 * spy.destroy()
+	 * ```
+	 */
+	destroy(): void
+}
+
+/** Selects which close requests hide a modal or an offcanvas panel. */
+export interface DismissOptions {
+	/** If `true`, a click on the backdrop hides; if `false`, it dispatches `hidePrevented`, mirroring Bootstrap's `backdrop: 'static'`. Default: `true`. */
+	readonly backdrop?: boolean
+	/** If `true`, Escape hides; if `false`, it dispatches `hidePrevented`, mirroring Bootstrap's `keyboard: false`. Default: `true`. */
+	readonly escape?: boolean
+}
+
+/** Transliterates the field Bootstrap hydrates onto a modal event. */
+export interface ModalDetail {
+	/** Carries the trigger passed to `show`, as Bootstrap's `relatedTarget` field does, or undefined on every other event. */
+	readonly relatedTarget: HTMLElement | undefined
+}
+
+/** Maps a modal's wire events to the verbs Bootstrap names them by. */
+export interface ModalEventMap {
+	/** Mirrors the `show.bs.modal` event, whose prevention refuses the show. */
+	readonly show: CustomEvent<ModalDetail>
+	/** Mirrors the `shown.bs.modal` event, dispatched after the dialog's transition settles. */
+	readonly shown: CustomEvent<ModalDetail>
+	/** Mirrors the `hide.bs.modal` event, whose prevention refuses the hide. */
+	readonly hide: CustomEvent<ModalDetail>
+	/** Mirrors the `hidden.bs.modal` event, dispatched after the dialog's transition settles. */
+	readonly hidden: CustomEvent<ModalDetail>
+	/** Mirrors the `hidePrevented.bs.modal` event, dispatched when a static backdrop or a disabled Escape refuses a hide. */
+	readonly hidePrevented: CustomEvent<ModalDetail>
+}
+
+/** Configures the initial DOM event subscriptions for a modal. */
+export type ModalHooks = EventHooks<ModalEventMap>
+
+/** Configures a modal's backdrop, dismissal, focus, hooks, and lifetime. */
+export interface ModalOptions {
+	/** If `true`, shows the cascade's backdrop element behind the modal; if `false`, shows none. Default: `true`. */
+	readonly backdrop?: boolean
+	/** Selects which close requests hide the modal. */
+	readonly dismiss?: DismissOptions
+	/** If `true`, isolates focus inside the shown modal and returns it on hide; if `false`, leaves focus alone. Default: `true`. */
+	readonly focus?: boolean
+	/** Subscribes until the modal is destroyed. */
+	readonly on?: ModalHooks
+	/** Destroys the modal when it aborts. */
+	readonly signal?: AbortSignal
+}
+
+/** Shows and hides a `.modal` over a backdrop, with scroll lock and focus isolation. */
+export interface ModalInterface {
+	/** Carries the modal. */
+	readonly host: HTMLElement
+	/** Reads whether the modal carries the `show` class. */
+	readonly shown: boolean
+	/**
+	 * Shows the modal, locks document scrolling, and isolates focus inside it.
+	 *
+	 * @param trigger - The element that asked for the modal, carried as the events' `relatedTarget`.
+	 * @returns Resolves true after the `shown` event; false when the modal was shown, a transition was in flight, a listener prevented `show`, or the modal is destroyed.
+	 * @example
+	 * ```ts
+	 * const opened = await modal.show(button)
+	 * ```
+	 */
+	show(trigger?: HTMLElement): Promise<boolean>
+	/**
+	 * Hides the modal and releases its scroll lock and focus isolation.
+	 *
+	 * @returns Resolves true after the `hidden` event; false when the modal was hidden, a transition was in flight, a listener prevented `hide`, or the modal is destroyed.
+	 * @example
+	 * ```ts
+	 * const closed = await modal.hide()
+	 * ```
+	 */
+	hide(): Promise<boolean>
+	/**
+	 * Hides the modal when it is shown and shows it otherwise.
+	 *
+	 * @param trigger - The element that asked for the modal, passed to `show`.
+	 * @returns Resolves as the `show` or `hide` call it makes resolves.
+	 * @example
+	 * ```ts
+	 * const changed = await modal.toggle(button)
+	 * ```
+	 */
+	toggle(trigger?: HTMLElement): Promise<boolean>
+	/**
+	 * Recomputes the scrollbar compensation after the modal's content changes height.
+	 *
+	 * @example
+	 * ```ts
+	 * modal.update()
+	 * ```
+	 */
+	update(): void
+	/**
+	 * Releases hooks, abandons a transition in flight, and restores the modal, the backdrop, scrolling, and focus.
+	 *
+	 * @example
+	 * ```ts
+	 * modal.destroy()
+	 * ```
+	 */
+	destroy(): void
+}
+
+/** Transliterates the field Bootstrap hydrates onto an offcanvas event. */
+export interface OffcanvasDetail {
+	/** Carries the trigger passed to `show`, as Bootstrap's `relatedTarget` field does, or undefined on every other event. */
+	readonly relatedTarget: HTMLElement | undefined
+}
+
+/** Maps an offcanvas panel's wire events to the verbs Bootstrap names them by. */
+export interface OffcanvasEventMap {
+	/** Mirrors the `show.bs.offcanvas` event, whose prevention refuses the show. */
+	readonly show: CustomEvent<OffcanvasDetail>
+	/** Mirrors the `shown.bs.offcanvas` event, dispatched after the panel's transition settles. */
+	readonly shown: CustomEvent<OffcanvasDetail>
+	/** Mirrors the `hide.bs.offcanvas` event, whose prevention refuses the hide. */
+	readonly hide: CustomEvent<OffcanvasDetail>
+	/** Mirrors the `hidden.bs.offcanvas` event, dispatched after the panel's transition settles. */
+	readonly hidden: CustomEvent<OffcanvasDetail>
+	/** Mirrors the `hidePrevented.bs.offcanvas` event, dispatched when a static backdrop or a disabled Escape refuses a hide. */
+	readonly hidePrevented: CustomEvent<OffcanvasDetail>
+}
+
+/** Configures the initial DOM event subscriptions for an offcanvas panel. */
+export type OffcanvasHooks = EventHooks<OffcanvasEventMap>
+
+/** Configures an offcanvas panel's backdrop, dismissal, scrolling, hooks, and lifetime. */
+export interface OffcanvasOptions {
+	/** If `true`, shows the cascade's backdrop element behind the panel; if `false`, shows none. Default: `true`. */
+	readonly backdrop?: boolean
+	/** Selects which close requests hide the panel. */
+	readonly dismiss?: DismissOptions
+	/** If `true`, leaves document scrolling available while the panel is shown; if `false`, locks it. Default: `false`. */
+	readonly scroll?: boolean
+	/** Subscribes until the panel is destroyed. */
+	readonly on?: OffcanvasHooks
+	/** Destroys the panel when it aborts. */
+	readonly signal?: AbortSignal
+}
+
+/** Slides an `.offcanvas` panel in and out, with an optional backdrop, scroll lock, and focus isolation. */
+export interface OffcanvasInterface {
+	/** Carries the panel. */
+	readonly host: HTMLElement
+	/** Reads whether the panel carries the `show` class. */
+	readonly shown: boolean
+	/**
+	 * Shows the panel, and isolates focus inside it when it has a backdrop or locks scrolling.
+	 *
+	 * @param trigger - The element that asked for the panel, carried as the events' `relatedTarget`.
+	 * @returns Resolves true after the `shown` event; false when the panel was shown, a transition was in flight, a listener prevented `show`, or the panel is destroyed.
+	 * @example
+	 * ```ts
+	 * const opened = await offcanvas.show(button)
+	 * ```
+	 */
+	show(trigger?: HTMLElement): Promise<boolean>
+	/**
+	 * Hides the panel and releases its backdrop, scroll lock, and focus isolation.
+	 *
+	 * @returns Resolves true after the `hidden` event; false when the panel was hidden, a transition was in flight, a listener prevented `hide`, or the panel is destroyed.
+	 * @example
+	 * ```ts
+	 * const closed = await offcanvas.hide()
+	 * ```
+	 */
+	hide(): Promise<boolean>
+	/**
+	 * Hides the panel when it is shown and shows it otherwise.
+	 *
+	 * @param trigger - The element that asked for the panel, passed to `show`.
+	 * @returns Resolves as the `show` or `hide` call it makes resolves.
+	 * @example
+	 * ```ts
+	 * const changed = await offcanvas.toggle(button)
+	 * ```
+	 */
+	toggle(trigger?: HTMLElement): Promise<boolean>
+	/**
+	 * Releases hooks, abandons a transition in flight, and restores the panel, the backdrop, scrolling, and focus.
+	 *
+	 * @example
+	 * ```ts
+	 * offcanvas.destroy()
+	 * ```
+	 */
+	destroy(): void
+}
+
+/** Maps a tooltip's wire events to the verbs Bootstrap names them by. */
+export interface TooltipEventMap {
+	/** Mirrors the `show.bs.tooltip` event, whose prevention refuses the show. */
+	readonly show: CustomEvent<undefined>
+	/** Mirrors the `shown.bs.tooltip` event, dispatched after the tip's transition settles. */
+	readonly shown: CustomEvent<undefined>
+	/** Mirrors the `hide.bs.tooltip` event, whose prevention refuses the hide. */
+	readonly hide: CustomEvent<undefined>
+	/** Mirrors the `hidden.bs.tooltip` event, dispatched after the tip is removed. */
+	readonly hidden: CustomEvent<undefined>
+	/** Mirrors the `inserted.bs.tooltip` event, dispatched after the tip enters its container. */
+	readonly inserted: CustomEvent<undefined>
+}
+
+/** Configures the initial DOM event subscriptions for a tooltip. */
+export type TooltipHooks = EventHooks<TooltipEventMap>
+
+/** Configures a tooltip's content, triggers, timing, tip, placement, sanitizing, hooks, and lifetime. */
+export interface TooltipOptions {
+	/** If `true`, fades the tip in and out; if `false`, shows and hides it at once. Default: `true`. */
+	readonly animation?: boolean
+	/** Delays showing and hiding the tip in milliseconds, mirroring Bootstrap's `delay` option. */
+	readonly delay?: {
+		/** Sets the wait before the tip shows. Default: `0`. */
+		readonly show?: number
+		/** Sets the wait before the tip hides. Default: `0`. */
+		readonly hide?: number
+	}
+	/** Selects the interactions that show and hide the tip, mirroring Bootstrap's `trigger` option; all three `false` is Bootstrap's `manual`. */
+	readonly trigger?: {
+		/** If `true`, pointer hover shows the tip; if `false`, it does not. Default: `true`. */
+		readonly hover?: boolean
+		/** If `true`, focus shows the tip; if `false`, it does not. Default: `true`. */
+		readonly focus?: boolean
+		/** If `true`, a click toggles the tip; if `false`, it does not. Default: `false`. */
+		readonly click?: boolean
+	}
+	/** Fills the tip's text slot, mirroring Bootstrap's `title` option. Default: the trigger's `title` attribute. */
+	readonly title?: TipContent
+	/** If `true`, writes string content as markup; if `false`, writes it as text. Default: `false`. */
+	readonly html?: boolean
+	/** Configures the tip element. */
+	readonly tip?: {
+		/** Sets the markup the tip is built from, mirroring Bootstrap's `template` option. Default: Bootstrap's tooltip template. */
+		readonly template?: string
+		/** Adds class tokens to the tip, mirroring Bootstrap's `customClass` option. */
+		readonly class?: string
+	}
+	/** Receives the tip element, mirroring Bootstrap's `container` option. Default: the nearest ancestor carrying `aria-modal="true"`, else the document body. */
+	readonly container?: HTMLElement
+	/** Positions the tip against its trigger. Default: `top` at offset `[0, 6]`, falling back through `top`, `right`, `bottom`, and `left`. */
+	readonly placement?: PlacementOptions
+	/** Configures how markup content is sanitized, read from the constructor alone as in Bootstrap. */
+	readonly sanitize?: SanitizeOptions
+	/** Delegates the tooltip to descendants of the host matching this selector, mirroring Bootstrap's `selector` option. */
+	readonly selector?: string
+	/** Subscribes until the tooltip is destroyed. */
+	readonly on?: TooltipHooks
+	/** Destroys the tooltip when it aborts. */
+	readonly signal?: AbortSignal
+}
+
+/** Shows a tip anchored to its trigger in the top layer on hover, focus, click, or call. */
+export interface TooltipInterface {
+	/** Carries the trigger. */
+	readonly host: HTMLElement
+	/** Reads whether the tip is in its container and carries the `show` class. */
+	readonly shown: boolean
+	/** Reads whether triggers and calls can show the tip. */
+	readonly enabled: boolean
+	/**
+	 * Builds, inserts, and shows the tip.
+	 *
+	 * @returns Resolves true after the `shown` event; false when the tip was shown, the tooltip is disabled or has no content, a listener prevented `show`, or the tooltip is destroyed.
+	 * @example
+	 * ```ts
+	 * const opened = await tooltip.show()
+	 * ```
+	 */
+	show(): Promise<boolean>
+	/**
+	 * Hides the tip and removes it from its container.
+	 *
+	 * @returns Resolves true after the `hidden` event; false when the tip was hidden, a listener prevented `hide`, or the tooltip is destroyed.
+	 * @example
+	 * ```ts
+	 * const closed = await tooltip.hide()
+	 * ```
+	 */
+	hide(): Promise<boolean>
+	/**
+	 * Hides the tip when it is shown and shows it otherwise.
+	 *
+	 * @returns Resolves as the `show` or `hide` call it makes resolves, or false when the tooltip is disabled.
+	 * @example
+	 * ```ts
+	 * const changed = await tooltip.toggle()
+	 * ```
+	 */
+	toggle(): Promise<boolean>
+	/**
+	 * Lets triggers and calls show the tip again.
+	 *
+	 * @example
+	 * ```ts
+	 * tooltip.enable()
+	 * ```
+	 */
+	enable(): void
+	/**
+	 * Keeps triggers and calls from showing the tip until it is enabled again.
+	 *
+	 * @example
+	 * ```ts
+	 * tooltip.disable()
+	 * ```
+	 */
+	disable(): void
+	/**
+	 * Replaces the content of the tip's slots, keyed by each slot's selector, and rebuilds a shown tip.
+	 *
+	 * @param content - The content per slot selector; an undefined or empty value removes its slot.
+	 * @example
+	 * ```ts
+	 * tooltip.fill({ '.tooltip-inner': 'Saved' })
+	 * ```
+	 */
+	fill(content: Readonly<Record<string, TipContent | undefined>>): void
+	/**
+	 * Measures the side the shown tip resolved to and rewrites its placement attribute.
+	 *
+	 * @example
+	 * ```ts
+	 * tooltip.update()
+	 * ```
+	 */
+	update(): void
+	/**
+	 * Releases hooks and pending delays, removes the tip, and restores the trigger's attributes.
+	 *
+	 * @example
+	 * ```ts
+	 * tooltip.destroy()
+	 * ```
+	 */
+	destroy(): void
+}
+
+/** Maps a popover's wire events to the verbs Bootstrap names them by. */
+export interface PopoverEventMap {
+	/** Mirrors the `show.bs.popover` event, whose prevention refuses the show. */
+	readonly show: CustomEvent<undefined>
+	/** Mirrors the `shown.bs.popover` event, dispatched after the tip's transition settles. */
+	readonly shown: CustomEvent<undefined>
+	/** Mirrors the `hide.bs.popover` event, whose prevention refuses the hide. */
+	readonly hide: CustomEvent<undefined>
+	/** Mirrors the `hidden.bs.popover` event, dispatched after the tip is removed. */
+	readonly hidden: CustomEvent<undefined>
+	/** Mirrors the `inserted.bs.popover` event, dispatched after the tip enters its container. */
+	readonly inserted: CustomEvent<undefined>
+}
+
+/** Configures the initial DOM event subscriptions for a popover. */
+export type PopoverHooks = EventHooks<PopoverEventMap>
+
+/**
+ * Configures a popover: the tooltip options, a body slot, and the popover defaults.
+ *
+ * @remarks
+ * Three tooltip defaults differ for a popover, as in Bootstrap. A click toggles the tip, and hover
+ * and focus do not. The tip is built from Bootstrap's popover template, with a `.popover-header`
+ * slot for the title and a `.popover-body` slot for the content. The tip sits `right` of its trigger
+ * at offset `[0, 8]`.
+ */
+export interface PopoverOptions extends TooltipOptions {
+	/** Fills the tip's body slot, mirroring Bootstrap's `content` option. Default: the trigger's `data-bs-content` attribute. */
+	readonly content?: TipContent
+	/** Subscribes until the popover is destroyed. */
+	readonly on?: PopoverHooks
+}
+
+/** Shows a header-and-body tip anchored to its trigger: the tooltip contract under the `.bs.popover` event names. */
+export interface PopoverInterface {
+	/** Carries the trigger. */
+	readonly host: HTMLElement
+	/** Reads whether the tip is in its container and carries the `show` class. */
+	readonly shown: boolean
+	/** Reads whether triggers and calls can show the tip. */
+	readonly enabled: boolean
+	/**
+	 * Builds, inserts, and shows the tip, removing the header or body slot whose content is empty.
+	 *
+	 * @returns Resolves true after the `shown` event; false when the tip was shown, the popover is disabled or has no content, a listener prevented `show`, or the popover is destroyed.
+	 * @example
+	 * ```ts
+	 * const opened = await popover.show()
+	 * ```
+	 */
+	show(): Promise<boolean>
+	/**
+	 * Hides the tip and removes it from its container.
+	 *
+	 * @returns Resolves true after the `hidden` event; false when the tip was hidden, a listener prevented `hide`, or the popover is destroyed.
+	 * @example
+	 * ```ts
+	 * const closed = await popover.hide()
+	 * ```
+	 */
+	hide(): Promise<boolean>
+	/**
+	 * Hides the tip when it is shown and shows it otherwise.
+	 *
+	 * @returns Resolves as the `show` or `hide` call it makes resolves, or false when the popover is disabled.
+	 * @example
+	 * ```ts
+	 * const changed = await popover.toggle()
+	 * ```
+	 */
+	toggle(): Promise<boolean>
+	/**
+	 * Lets triggers and calls show the tip again.
+	 *
+	 * @example
+	 * ```ts
+	 * popover.enable()
+	 * ```
+	 */
+	enable(): void
+	/**
+	 * Keeps triggers and calls from showing the tip until it is enabled again.
+	 *
+	 * @example
+	 * ```ts
+	 * popover.disable()
+	 * ```
+	 */
+	disable(): void
+	/**
+	 * Replaces the content of the tip's slots, keyed by each slot's selector, and rebuilds a shown tip.
+	 *
+	 * @param content - The content per slot selector; an undefined or empty value removes its slot.
+	 * @example
+	 * ```ts
+	 * popover.fill({ '.popover-header': 'Draft', '.popover-body': 'Saved at noon' })
+	 * ```
+	 */
+	fill(content: Readonly<Record<string, TipContent | undefined>>): void
+	/**
+	 * Measures the side the shown tip resolved to and rewrites its placement attribute.
+	 *
+	 * @example
+	 * ```ts
+	 * popover.update()
+	 * ```
+	 */
+	update(): void
+	/**
+	 * Releases hooks and pending delays, removes the tip, and restores the trigger's attributes.
+	 *
+	 * @example
+	 * ```ts
+	 * popover.destroy()
+	 * ```
+	 */
+	destroy(): void
+}
+
+/** Maps an alert's wire events to the verbs Bootstrap names them by. */
+export interface AlertEventMap {
+	/** Mirrors the `close.bs.alert` event, whose prevention refuses the close. */
+	readonly close: CustomEvent<undefined>
+	/** Mirrors the `closed.bs.alert` event, dispatched on the removed host after it leaves the document. */
+	readonly closed: CustomEvent<undefined>
+}
+
+/** Configures the initial DOM event subscriptions for an alert. */
+export type AlertHooks = EventHooks<AlertEventMap>
+
+/** Configures an alert's hooks and lifetime. */
+export interface AlertOptions {
+	/** Subscribes until the alert is destroyed. */
+	readonly on?: AlertHooks
+	/** Destroys the alert when it aborts. */
+	readonly signal?: AbortSignal
+}
+
+/** Closes an `.alert` by fading it out and removing it from the document. */
+export interface AlertInterface {
+	/** Carries the alert. */
+	readonly host: HTMLElement
+	/**
+	 * Fades the alert out, removes it from the document, and dispatches `closed` on it.
+	 *
+	 * @returns Resolves true after the `closed` event; false when a transition was in flight, a listener prevented `close`, or the alert is destroyed.
+	 * @example
+	 * ```ts
+	 * const removed = await alert.close()
+	 * ```
+	 */
+	close(): Promise<boolean>
+	/**
+	 * Releases hooks and restores the alert without removing it.
+	 *
+	 * @example
+	 * ```ts
+	 * alert.destroy()
+	 * ```
+	 */
+	destroy(): void
+}
+
+/** Maps a toast's wire events to the verbs Bootstrap names them by. */
+export interface ToastEventMap {
+	/** Mirrors the `show.bs.toast` event, whose prevention refuses the show. */
+	readonly show: CustomEvent<undefined>
+	/** Mirrors the `shown.bs.toast` event, dispatched after the toast's transition settles. */
+	readonly shown: CustomEvent<undefined>
+	/** Mirrors the `hide.bs.toast` event, whose prevention refuses the hide. */
+	readonly hide: CustomEvent<undefined>
+	/** Mirrors the `hidden.bs.toast` event, dispatched after the toast's transition settles. */
+	readonly hidden: CustomEvent<undefined>
+}
+
+/** Configures the initial DOM event subscriptions for a toast. */
+export type ToastHooks = EventHooks<ToastEventMap>
+
+/** Configures a toast's fade, automatic hiding, hooks, and lifetime. */
+export interface ToastOptions {
+	/** If `true`, fades the toast in and out; if `false`, shows and hides it at once. Default: `true`. */
+	readonly animation?: boolean
+	/** If `true`, hides the toast after the delay unless hover or focus holds it; if `false`, keeps it until hidden. Default: `true`. */
+	readonly autohide?: boolean
+	/** Sets the milliseconds a shown toast waits before it hides itself. Default: `5000`. */
+	readonly delay?: number
+	/** Subscribes until the toast is destroyed. */
+	readonly on?: ToastHooks
+	/** Destroys the toast when it aborts. */
+	readonly signal?: AbortSignal
+}
+
+/** Shows a `.toast` in its container's flow and hides it after a delay. */
+export interface ToastInterface {
+	/** Carries the toast. */
+	readonly host: HTMLElement
+	/** Reads whether the toast carries the `show` class. */
+	readonly shown: boolean
+	/**
+	 * Shows the toast and starts the delay after which it hides itself.
+	 *
+	 * @returns Resolves true after the `shown` event; false when a transition was in flight, a listener prevented `show`, or the toast is destroyed.
+	 * @example
+	 * ```ts
+	 * const opened = await toast.show()
+	 * ```
+	 */
+	show(): Promise<boolean>
+	/**
+	 * Hides the toast.
+	 *
+	 * @returns Resolves true after the `hidden` event; false when the toast was hidden, a transition was in flight, a listener prevented `hide`, or the toast is destroyed.
+	 * @example
+	 * ```ts
+	 * const closed = await toast.hide()
+	 * ```
+	 */
+	hide(): Promise<boolean>
+	/**
+	 * Releases hooks, clears the pending delay, and restores the toast.
+	 *
+	 * @example
+	 * ```ts
+	 * toast.destroy()
+	 * ```
+	 */
+	destroy(): void
+}
+
+/** Transliterates the fields Bootstrap hydrates onto a carousel event. */
+export interface CarouselDetail {
+	/** Carries the item becoming active, as Bootstrap's `relatedTarget` field does. */
+	readonly relatedTarget: HTMLElement
+	/** Names the direction the items move, as Bootstrap's `direction` field does. */
+	readonly direction: SwipeDirection
+	/** Sets the position of the item that was active, as Bootstrap's `from` field does. */
+	readonly from: number
+	/** Sets the position of the item becoming active, as Bootstrap's `to` field does. */
+	readonly to: number
+}
+
+/** Maps a carousel's wire events to the verbs Bootstrap names them by. */
+export interface CarouselEventMap {
+	/** Mirrors the `slide.bs.carousel` event, whose prevention refuses the slide. */
+	readonly slide: CustomEvent<CarouselDetail>
+	/** Mirrors the `slid.bs.carousel` event, dispatched after the active item's transition settles. */
+	readonly slid: CustomEvent<CarouselDetail>
+}
+
+/** Configures the initial DOM event subscriptions for a carousel. */
+export type CarouselHooks = EventHooks<CarouselEventMap>
+
+/** Names when a carousel starts cycling on its own: at construction, or after the first interaction. */
+export type CarouselRide = 'load' | 'interaction'
+
+/** Configures a carousel's cycling, keyboard and touch input, wrapping, hooks, and lifetime. */
+export interface CarouselOptions {
+	/** Sets the milliseconds each item shows while cycling. Default: `5000`. */
+	readonly interval?: number
+	/** If `true`, the left and right arrow keys move the items; if `false`, they do not. Default: `true`. */
+	readonly keyboard?: boolean
+	/** If `true`, pointer hover pauses cycling, mirroring Bootstrap's `pause: 'hover'`; if `false`, it does not. Default: `true`. */
+	readonly pause?: boolean
+	/** Starts cycling at construction for `load` and after the first interaction for `interaction`, mirroring Bootstrap's `ride` option. Default: no automatic cycling. */
+	readonly ride?: CarouselRide
+	/** If `true`, a touch or pen swipe moves the items; if `false`, it does not. Default: `true`. */
+	readonly touch?: boolean
+	/** If `true`, moving past either end continues at the other; if `false`, it stops. Default: `true`. */
+	readonly wrap?: boolean
+	/** Subscribes until the carousel is destroyed. */
+	readonly on?: CarouselHooks
+	/** Destroys the carousel when it aborts. */
+	readonly signal?: AbortSignal
+}
+
+/** Moves a `.carousel` between its items by call, key, swipe, indicator, or interval. */
+export interface CarouselInterface {
+	/** Carries the carousel. */
+	readonly host: HTMLElement
+	/** Reads the position of the active item, or undefined when no item is active. */
+	readonly index: number | undefined
+	/**
+	 * Slides to the following item.
+	 *
+	 * @returns Resolves true after the `slid` event; false when a slide was in flight, the last item is active without wrapping, a listener prevented `slide`, or the carousel is destroyed.
+	 * @example
+	 * ```ts
+	 * const moved = await carousel.next()
+	 * ```
+	 */
+	next(): Promise<boolean>
+	/**
+	 * Slides to the preceding item.
+	 *
+	 * @returns Resolves true after the `slid` event; false when a slide was in flight, the first item is active without wrapping, a listener prevented `slide`, or the carousel is destroyed.
+	 * @example
+	 * ```ts
+	 * const moved = await carousel.previous()
+	 * ```
+	 */
+	previous(): Promise<boolean>
+	/**
+	 * Slides to the item at a position, waiting for a slide in flight to finish first.
+	 *
+	 * @param index - The position of the item to activate.
+	 * @returns Resolves true after the `slid` event; false when the position is out of range or already active, a listener prevented `slide`, or the carousel is destroyed.
+	 * @example
+	 * ```ts
+	 * const moved = await carousel.slide(2)
+	 * ```
+	 */
+	slide(index: number): Promise<boolean>
+	/**
+	 * Starts or restarts cycling through the items at the configured interval.
+	 *
+	 * @example
+	 * ```ts
+	 * carousel.start()
+	 * ```
+	 */
+	start(): void
+	/**
+	 * Pauses cycling until it is started again.
+	 *
+	 * @example
+	 * ```ts
+	 * carousel.pause()
+	 * ```
+	 */
+	pause(): void
+	/**
+	 * Releases hooks, stops cycling and swipes, and restores the carousel's classes.
+	 *
+	 * @example
+	 * ```ts
+	 * carousel.destroy()
+	 * ```
+	 */
+	destroy(): void
+}
```
