# J-COLLAPSE terrain record (measured 2026-09-23 on Veneer main at the J-BINDER landing)

Every reading below is the output of the named command on `C:/Users/mikes/WebstormProjects/veneer` at the commit the first reading names. Where the brief and this record disagree, this record wins and the unit stops rather than resolving it.

## `git log --oneline -1`

```text
1395361 Merge branch 'main' into unit/binder
```

## `grep -n "Collapse" src/browser/types.ts`

```text
108:	readonly collapse?: Pick<CollapseOptions, 'classes' | 'attributes' | 'selectors'>
140: * const hooks: EventHooks<CollapseEventMap> = { shown: (event) => console.log(event.type) }
156: * const wire: EventWire<CollapseEventMap, 'collapse'> = {
613:export interface CollapseEventMap {
625:export type CollapseHooks = EventHooks<CollapseEventMap>
628:export interface CollapseClassMap {
642:export interface CollapseAttributeMap {
650:export interface CollapseSelectorMap {
656:export interface CollapseOptions {
660:	readonly classes?: Partial<CollapseClassMap>
662:	readonly attributes?: Partial<CollapseAttributeMap>
664:	readonly selectors?: Partial<CollapseSelectorMap>
666:	readonly on?: CollapseHooks
672:export interface CollapseInterface {
```

## The export list in `tests/src/browser/index.test.ts`

```text
1:import { describe, expect, it } from 'vitest'
2:import { recordListeners } from '../../setupBrowser.js'
4:describe('src browser entry', () => {
5:	it('exports the browser surface without registering document or window listeners', async () => {
8:			names = Object.keys(await import('@src/browser')).sort()
12:			'BUTTON_CLASSES',
13:			'BUTTON_EVENTS',
14:			'BUTTON_SELECTORS',
15:			'Button',
16:			'COLOR_MODE_ATTRIBUTES',
17:			'COLOR_MODE_KEY',
18:			'ColorMode',
19:			'Delegate',
20:			'HostSnapshot',
21:			'Registry',
22:			'TARGET_ATTRIBUTE',
23:			'bindEventMap',
24:			'emitEvent',
25:			'isAttributeName',
26:			'isButtonEvent',
27:			'isClassToken',
28:			'isColorModeState',
29:			'isSelector',
30:			'readTarget',
31:			'readTargets',
32:			'reflow',
33:			'resolveOptions',
34:			'resolveVocabulary',
35:			'settleAnimations',
39:	it('records a document listener installed by an imported module', async () => {
42:			const control = await import('./fixtures/entryListener.js')
```

## `grep -n "collapse\|COLLAPSE" src/browser/Delegate.ts src/browser/constants.ts src/browser/helpers.ts src/browser/parsers.ts`

```text
src/browser/helpers.ts:18: * if (!emitEvent(host, 'show.vn.collapse', undefined, true)) return false
src/browser/helpers.ts:194: * @param code - The error code a value that fails coercion throws, such as `COLLAPSE_OPTION_INVALID`.
grep: src/browser/parsers.ts: No such file or directory
exit=2
ls: cannot access 'src/browser/parsers.ts': No such file or directory
```

## `grep -n "| plugin " guides/veneer.md`

```text
5229:| engine           | plugin         | Collapse: a `[data-bs-toggle="collapse"]` trigger names its panel by `data-bs-target` or `href` attribute; `parent: null` and `toggle: true` defaults; `toggle`, `show`, and `hide` methods; cancelable `show.bs.collapse` and `hide.bs.collapse` events, then `shown.bs.collapse` and `hidden.bs.collapse` events; trigger `aria-expanded` and `collapsed` states track the panel; `collapsing` class and inline size until transition end. Owner: J-ENGINE.    | —                     | accepted |
5230:| engine           | plugin         | Dropdown: the `[data-bs-toggle="dropdown"]` data API; the `autoClose`, `boundary`, `display`, `offset`, `popperConfig`, and `reference` options; the `toggle`, `show`, `hide`, `dispose`, and `update` methods; the paired `.bs.dropdown` events, the `show` and `hide` events cancelable; the `aria-expanded` attribute; arrow and `Escape` key focus; placement from the `--bs-position` property and the wrappers, centering included. Owner: J-ENGINE.       | —                     | accepted |
5231:| engine           | plugin         | Tab: `[data-bs-toggle="tab\|pill\|list"]` shows the pane its trigger names with `show()`; fires `hide.bs.tab`, `hidden.bs.tab`, `show.bs.tab`, and `shown.bs.tab` with `relatedTarget`, `show` and `hide` cancelable; arrow keys, `Home`, and `End` move focus; writes `role`, `aria-selected`, `tabindex`, and `active`; `show` on the pane; in a dropdown, `active` on the toggle, `show` on the menu, and `aria-expanded` on the item. Owner: J-ENGINE.       | —                     | accepted |
5232:| engine           | plugin         | ScrollSpy: `[data-bs-spy="scroll"]` observes the sections its `target` links name through `IntersectionObserver` (`rootMargin`, `threshold`, `offset`, `smoothScroll`); `refresh()`, `dispose()`; fires `activate.bs.scrollspy` with `relatedTarget` and no cancelable event; moves the `active` class. Owner: J-ENGINE.                                                                                                                                         | —                     | accepted |
5233:| engine           | plugin         | Alert: a `[data-bs-dismiss="alert"]` trigger closes the alert it names, or the `.alert` ancestor it sits in; no defaults; the `close` method; the cancelable `close.bs.alert` event, then the `closed.bs.alert` event after removal; the `close` method removes the `show` class and waits on the transition only when the alert carries the `fade` class, then removes the element and disposes the instance; no key, focus, or ARIA handling. Owner: J-ENGINE. | —                     | accepted |
5234:| engine           | plugin         | Carousel: `[data-bs-slide]` and `[data-bs-slide-to]` triggers and `[data-bs-ride="carousel"]` on load; `interval: 5000`, `keyboard: true`, `pause: 'hover'`, `ride: false`, `touch: true`, and `wrap: true` defaults; `next`, `prev`, `pause`, `cycle`, and `to` methods; cancelable `slide.bs.carousel`, then `slid.bs.carousel`; arrow keys; `aria-current` on the active indicator; the `Swipe` utility adds the `pointer-event` class. Owner: J-ENGINE.      | —                     | accepted |
```

## `sed -n 1,31p src/styles/components/_collapse.scss`

```scss
@use '../mixins' as *;

@layer components {
	// These rules ship the release's collapse and collapsing classes as recorded. Each state is a
	// class set in markup: `.show` keeps a panel in flow, and `.collapsing` is the box an engine sizes
	// inline while the panel opens or closes. No rule here paints a color, so no color mode retunes
	// one.
	//
	// The timing is the release's own `0.35s ease` value rather than the motion tokens `.btn` reads,
	// because no published motion token resolves to `0.35s`, and a token that did not would change
	// how long a panel takes to open. The `transition` mixin emits the reduced-motion twin the
	// release records beside each transition.
	.collapse:not(.show) {
		display: none;
	}

	.collapsing {
		height: 0;
		overflow: hidden;
		@include transition(height 0.35s ease);
	}

	// Both classes sit on one element, so a horizontal panel closes on its width and releases the
	// height the preceding rule zeroes. A horizontal element nested inside a closing panel is not
	// reached.
	.collapsing.collapse-horizontal {
		width: 0;
		height: auto;
		@include transition(width 0.35s ease);
	}
}
```

## The search bound: `grep -rn "collapse" src tests/src/browser guides/veneer.md` (file and line only)

```text
      1 tests/src/browser/helpers.test.ts:99
      1 tests/src/browser/helpers.test.ts:95
      1 tests/src/browser/helpers.test.ts:113
      1 tests/src/browser/helpers.test.ts:110
      1 tests/src/browser/helpers.test.ts:109
      1 tests/src/browser/helpers.test.ts:108
      1 tests/src/browser/helpers.test.ts:102
      1 tests/src/browser/helpers.test.ts:101
      1 tests/src/browser/helpers.test.ts:100
      1 tests/src/browser/helpers.test.ts:1
      1 tests/src/browser/HostSnapshot.test.ts:37
      1 tests/src/browser/HostSnapshot.test.ts:30
      1 src/styles/index.scss:60
      1 src/styles/elements/_table.scss:6
      1 src/styles/components/_pagination.scss:105
      1 src/styles/components/_pagination.scss:104
      1 src/styles/components/_collapse.scss:4
      1 src/styles/components/_collapse.scss:26
      1 src/styles/components/_collapse.scss:13
      1 src/styles/components/_accordion.scss:68
      1 src/styles/components/_accordion.scss:61
      1 src/styles/components/_accordion.scss:59
      1 src/styles/components/_accordion.scss:166
      1 src/styles/components/_accordion.scss:164
      1 src/styles/components/_accordion.scss:148
      1 src/styles/components/_accordion.scss:137
      1 src/styles/components/_accordion.scss:132
      1 src/styles/components/_accordion.scss:130
      1 src/browser/types.ts:712
      1 src/browser/types.ts:703
      1 src/browser/types.ts:693
      1 src/browser/types.ts:690
      1 src/browser/types.ts:683
      1 src/browser/types.ts:680
      1 src/browser/types.ts:672
      1 src/browser/types.ts:671
      1 src/browser/types.ts:667
      1 src/browser/types.ts:666
      1 src/browser/types.ts:665
      1 src/browser/types.ts:664
      1 src/browser/types.ts:663
      1 src/browser/types.ts:662
      1 src/browser/types.ts:661
      1 src/browser/types.ts:660
      1 src/browser/types.ts:659
      1 src/browser/types.ts:656
      1 src/browser/types.ts:655
      1 src/browser/types.ts:651
      1 src/browser/types.ts:650
      1 src/browser/types.ts:649
      1 src/browser/types.ts:642
      1 src/browser/types.ts:641
      1 src/browser/types.ts:638
      1 src/browser/types.ts:637
      1 src/browser/types.ts:635
      1 src/browser/types.ts:629
      1 src/browser/types.ts:628
      1 src/browser/types.ts:627
      1 src/browser/types.ts:625
      1 src/browser/types.ts:624
```

## The binder mechanisms as landed: `grep -n "^export " src/browser/helpers.ts src/browser/HostSnapshot.ts src/browser/Registry.ts src/browser/validators.ts src/browser/constants.ts`

```text
src/browser/helpers.ts:21:export function emitEvent<T>(
src/browser/helpers.ts:47:export function bindEventMap<TKey extends string, TEvent extends Event, TEntity extends string>(
src/browser/helpers.ts:85:export async function settleAnimations(element: Element, signal: AbortSignal): Promise<void> {
src/browser/helpers.ts:124:export function reflow(element: Element): void {
src/browser/helpers.ts:147:export function readTargets(
src/browser/helpers.ts:182:export function readTarget(
src/browser/helpers.ts:211:export function resolveOptions<T extends object, TKey extends keyof T & string>(
src/browser/helpers.ts:258:export function resolveVocabulary<T extends Readonly<Record<keyof T, string>>>(
src/browser/HostSnapshot.ts:33:export class HostSnapshot implements HostSnapshotInterface {
src/browser/Registry.ts:20:export class Registry<TEngine extends object> implements RegistryInterface<TEngine> {
src/browser/validators.ts:19:export const isColorModeState: Guard<ColorModeState> = literalOf('light', 'dark')
src/browser/validators.ts:35:export function isClassToken(value: unknown): value is string {
src/browser/validators.ts:53:export function isAttributeName(value: unknown): value is string {
src/browser/validators.ts:78:export function isSelector(value: unknown): value is string {
src/browser/validators.ts:105:export function isButtonEvent(value: unknown): value is ButtonEventMap['toggle'] {
src/browser/constants.ts:10:export const COLOR_MODE_ATTRIBUTES: ColorModeAttributeMap = Object.freeze({
src/browser/constants.ts:15:export const COLOR_MODE_KEY = 'color-mode'
src/browser/constants.ts:18:export const BUTTON_EVENTS: EventWire<ButtonEventMap, 'button'> = Object.freeze({
src/browser/constants.ts:23:export const BUTTON_CLASSES: ButtonClassMap = Object.freeze({
src/browser/constants.ts:28:export const BUTTON_SELECTORS: ButtonSelectorMap = Object.freeze({
src/browser/constants.ts:33:export const TARGET_ATTRIBUTE = 'data-bs-target'
```

## The element guard `Button` uses at this commit: `grep -n "instanceOf\|isInstance" src/browser/*.ts`

```text
src/browser/Button.ts:3:import { instanceOf } from '@orkestrel/contract'
src/browser/Button.ts:41:		if (!instanceOf(HTMLElement)(host)) {
src/browser/Delegate.ts:7:import { instanceOf } from '@orkestrel/contract'
src/browser/Delegate.ts:95:		if (!instanceOf(HTMLElement)(host) || !this.#root.contains(host)) return
src/browser/helpers.ts:4:import { instanceOf } from '@orkestrel/contract'
src/browser/helpers.ts:164:	return Array.from(trigger.ownerDocument.querySelectorAll(escaped)).filter(instanceOf(HTMLElement))
src/browser/validators.ts:97: * route through `isInstance` either: that helper narrows a generic constructor to `object`, which
```

## The ownership and restoration rule paragraph: `grep -n "Two doors let other code run" guides/veneer.md`

```text
558:Two doors let other code run inside an engine's write sequence: a custom element's reaction runs
```
