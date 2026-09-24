# Unit TOAST (`to`) report

Role and engine: `opus` on Opus 5.5, native Claude subagent, worktree `/home/user/veneer-to` at `2a3f223`. Deviation state: none. No stop condition fired; every acceptance criterion reads green on the validation copy. The ancillary choices this unit settled are listed under § Decisions.

## Touched files

Owned (untracked in the worktree; `git status --porcelain` lists the owned files and nothing else):

- `src/styles/components/_toast.scss` (+90): the toast partial in the components layer. It writes every recorded `toast` rule, the `.toast-header .btn-close` combinator included, and binds `--bs-toast-zindex` to `var(--vn-stack-toast)` on `.toast` and `.toast-container`.
- `tests/src/styles/components/toast.test.ts` (+337): the browser proof of every toast rule.
- `app/browser/sections/ToastSection.ts` (+20): the `ToastSection` class over `TOAST_COPY` and `TOAST_SPECIMENS`.
- `tests/app/browser/sections/ToastSection.test.ts` (+180): the section proof.

Shared (report-only; exact patch `.orkestrel/veneer/units/to-shared.patch`, checked with `git apply --check` on a fresh `git archive 2a3f223` extract, exit 0):

| File | Diffstat | Change |
| --- | --- | --- |
| `src/styles/index.scss` | +1 -0 | `@use 'components/toast';` after `components/close` |
| `tests/setupStyles.ts` | +48 -1 | `.toast-header .btn-close` moved from `CLOSE_DEFERRED` to `CLOSE_SELECTORS`; `TOAST_SELECTORS`, `TOAST_SLOT_CASES`, `TOAST_CLOSE_GEOMETRY` after `CLOSE_INVERSION` |
| `tests/setupStyles.test.ts` | +52 -0 | the toast tables imported and listed in the export keys; `describe('toast case tables')` binds them to the inventory and checks the freeze; the partition case is unchanged |
| `tests/setup.ts` | +26 -0 | `CaptureSubject` members, resting `CASCADE_KEYS` rows, and the `showing` decline paragraph |
| `tests/app/browser/integration.test.ts` | +2 -0 | `TOAST_SPECIMENS` import and declared-subject entry |
| `tests/app/browser/Showcase.test.ts` | +3 -0 | `Toast` label after `Accordion`; `TOAST_SPECIMENS` after `ACCORDION_SPECIMENS` |
| `tests/app/browser/index.test.ts` | +3 -0 | `TOAST_COPY`, `TOAST_SPECIMENS`, `ToastSection` |
| `tests/conformance.test.ts` | +7 -3 | `'toast'` in `listed`; the order case gains `toasts: 'toast'`, `'toasts'` in `passiveNames`, `'toast'` after `'close'`, and its comment names the `toasts` stem |
| `tests/setupServer.test.ts` | +1 -0 | `'toast'` in the dash-proof component set |
| `app/browser/constants.ts` | +40 -0 | `TOAST_COPY` and `TOAST_SPECIMENS` after `ACCORDION_SPECIMENS` |
| `app/browser/Showcase.ts` | +2 -0 | import and `new ToastSection(this.#main)` after `AccordionSection` |
| `app/browser/index.ts` | +1 -0 | re-export after `AccordionSection` |
| `guides/veneer.md` | +99 -8 | § Files row, `### Toast classes`, `#### toast` table, § Deferred selectors row deleted, stacking Alias cell, the compatibility rows, § Showcase, and § Tests |

Off-limits files: untouched. `ROADMAP.md`: untouched. MODAL, OFFCANVAS, and TIP entries in `CLOSE_DEFERRED`, the stacking table, the barrel, and the showcase stay as the base has them.

## Ledger rows the gate measured

`npm run test:conformance` on the copy printed these rows before the `#### toast` table existed. The guide records them verbatim:

```text
toast | .toast | --bs-toast-zindex | — | 1090 | var(--vn-stack-toast) | tokenized
toast | .toast | --bs-toast-padding-x | — | 0.75rem | var(--vn-space-6) | tokenized
toast | .toast | --bs-toast-padding-y | — | 0.5rem | var(--vn-space-4) | tokenized
toast | .toast | --bs-toast-spacing | — | 1.5rem | var(--vn-gutter-x) | tokenized
toast | .toast | --bs-toast-font-size | — | 0.875rem | var(--vn-size-2) | tokenized
toast | .toast-container | --bs-toast-zindex | — | 1090 | var(--vn-stack-toast) | tokenized
toast | .toast-container | width | — | -webkit-max-content | max-content | declared
toast | .toast-container | width | — | -moz-max-content | max-content | declared
```

- `#### btn-close`: no row. The gate measured no difference on `.toast-header .btn-close`, because the partial writes the recorded margins verbatim. The brief expected a combinator row "exactly as the gate measures them", and the gate measures none.
- `### Additions`: no row. The gate measured no addition.
- The built cascade (`npm run build:src` on the copy) carries exactly these rules naming a toast class, each with its recorded declarations: `.toast`, `.toast.showing`, `.toast:not(.show)`, `.toast-container`, `.toast-container>:not(:last-child)`, `.toast-header`, `.toast-header .btn-close`, and `.toast-body`. That set equals the inventory's `toast` selectors. No recorded toast selector carries a `condition`.

## Resting rows and subjects

`CaptureSubject` gains `'Shown toast'`, `'Stacked toasts'`, and `'Centered toast'` after `'Accordion flush'`. `CASCADE_KEYS` gains these rows after `accordion-flush`:

| Scenario | Subject | Selector | Property |
| --- | --- | --- | --- |
| `shown-toast` | `Shown toast` | `.toast.show` | `background-color` |
| `stacked-toasts` | `Stacked toasts` | `.toast-container > .toast:not(:last-child)` | `margin-bottom` |
| `centered-toast` | `Centered toast` | `.toast-container.translate-middle` | `z-index` |

No `DRIVEN_KEYS` row: no toast state needs a drive. The `showing` class is declined by a paragraph in the `CASCADE_KEYS` TSDoc and in § Showcase. The reason is that a showing toast paints nothing, so its frame would be an empty box (M2, D17).

## R19 proof matrix

Each case is in `tests/src/styles/components/toast.test.ts` unless marked. Every recorded selector's condition is `—`.

| Selector | Case | Distinguishing mutation (executed red) | Specimen | Scenario |
| --- | --- | --- | --- | --- |
| `.toast` (stack slot) | `toast container` › reads the stacking level from the toast rung through its slot, on the container and on the toast | `--bs-toast-zindex` dropped from `.toast` | every specimen | `centered-toast` reads the container's level |
| `.toast` (box, slots) | `toast box` › sizes, edges, and rounds…; reads `$property` from its own token; rescales the insets with the density factor and holds the stacking gap on the gutter; moves the insets through a consumer scope… | gap written `var(--vn-space-12)` (density and slot cases red); partial removed (all red) | `Shown toast` | `shown-toast` |
| `.toast` (paint) | `toast paint` › in light / in dark › paints the toast and its header from the body aliases | `--bs-toast-bg: rgba(255, 255, 255, 0.85)` | `Shown toast` | `shown-toast` (`background-color`, differs by mode) |
| `.toast.showing` | `toast states` › drops a showing toast to no opacity while it stays displayed | rule dropped | none: engine-written, declared-and-resolved reading with no frame (M2) | none; declined |
| `.toast:not(.show)` | `toast states` › hides a toast without the show class and displays one carrying it | rule dropped | none: every specimen carries `show`, and `ToastSection.test.ts` asserts each toast displays | none |
| `.toast-container` | `toast container` › reads the stacking level…; fits its toasts, lets the pointer through… | container slot written as the literal `1090` | `Stacked toasts`, `Centered toast` | `centered-toast` |
| `.toast-container > :not(:last-child)` | `toast container` › …spaces each toast but the last by the stacking gap | qualifier dropped (`.toast-container > *`) | `Stacked toasts` | `stacked-toasts` |
| `.toast-header` | `toast header and body` › lays the header out in a row and rounds its top corners by the toast radius less the border width | header corners written with the full radius | every specimen | `shown-toast` |
| `.toast-header .btn-close` | `toast header and body` › fits the header close control into the header and leaves a close control elsewhere in the toast with no margin; `close.test.ts` › carries a rule for every shipped close name and none for a deferred combinator | combinator written as `.toast .btn-close` | every specimen | `shown-toast` |
| `.toast-body` | `toast header and body` › insets the body by the horizontal inset on every side and breaks a long word | body padding written as `padding-y padding-x` | every specimen | `shown-toast` |
| all selectors | `toast box` › writes the recorded toast selectors and no other rule on their classes | a missing rule or an extra rule on a toast class (red under the `:not(.show)`, `showing`, qualifier, and combinator mutations) | — | — |

The section proof `tests/app/browser/sections/ToastSection.test.ts` covers the region contract, the absence of any `[style]`, `show` on every toast, the `role="alert"`, `aria-live="assertive"`, and `aria-atomic="true"` attributes, the close control's `aria-label` and its accessible name, each container inside a `.viewport` whose parent is the specimen, the placement classes, the in-flow toast's `position: static`, and each framed toast inside its frame (the pair at the top end and the single toast centered) at the 390 and 1280 variants through `visitBreakpoint`.

## Failing-first and mutation record

Every run below took place on the validation copy `tmp/probe/base` (`git archive 2a3f223`, `cp -al node_modules`, owned files copied over it, shared patch applied). The instruments are retained as `.orkestrel/veneer/units/to-instruments/to-mutate-styles.py`, `.orkestrel/veneer/units/to-instruments/to-mutate-section.py`, `.orkestrel/veneer/units/to-instruments/to-gates.sh`, `.orkestrel/veneer/units/to-instruments/to-sync.sh`, and `.orkestrel/veneer/units/to-instruments/to-patch.sh`. Each mutation rebuilt the styles with `npm run build:src:styles` and restored the file afterwards.

Baseline in the worktree, before any edit:

- `npm run test:conformance`: exit 0, `Tests 22 passed (22)`.
- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/close.test.ts`: exit 0, `Tests 17 passed (17)`.

Style proof command: `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/components/toast.test.ts`.

| Mutation | Result | Failing cases |
| --- | --- | --- |
| `@use 'components/toast'` removed from the barrel (failing-first) | `Tests 17 failed (17)` | every case |
| container `--bs-toast-zindex: 1090` | `1 failed \| 16 passed` | reads the stacking level… |
| `--bs-toast-zindex` dropped from `.toast` | `1 failed \| 16 passed` | reads the stacking level… |
| `.toast:not(.show)` rule dropped | `3 failed \| 14 passed` | hides a toast without the show class…; drops a showing toast…; writes the recorded toast selectors… |
| `.toast.showing` rule dropped | `2 failed \| 15 passed` | drops a showing toast…; writes the recorded toast selectors… |
| `:not(:last-child)` qualifier dropped | `2 failed \| 15 passed` | …spaces each toast but the last…; writes the recorded toast selectors… |
| header corners at the full radius | `1 failed \| 16 passed` | lays the header out… |
| combinator written `.toast .btn-close` | `2 failed \| 15 passed` | fits the header close control…; writes the recorded toast selectors… |
| literal `--bs-toast-bg` colour | `2 failed \| 15 passed` | paints the toast… in light; in dark |
| body padding `padding-y padding-x` | `3 failed \| 14 passed` | insets the body…; rescales the insets…; moves the insets… |
| gap `var(--vn-space-12)` | `2 failed \| 15 passed` | reads `--bs-toast-spacing` from its own token; rescales the insets… |
| none (shipped partial) | `Tests 17 passed (17)` | — |

Close combinator, with the partial landed and the guide row deleted but `.toast-header .btn-close` still in `CLOSE_DEFERRED`:

- `tests/src/styles/components/close.test.ts` (styles config, verbose): `Tests 1 failed | 16 passed (17)`. The red case is "carries a rule for every shipped close name and none for a deferred combinator", and it expected `[ '.toast-header .btn-close' ]` to equal `[]`. After the move: `Tests 17 passed (17)`. `close.test.ts` needs no edit.
- `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupStyles.test.ts`: `Tests 1 failed | 121 passed (122)`. The red case is "binds the breadcrumb, badge, and close selector tables to the official inventory". After the move: `Tests 122 passed (122)`, with the partition case unchanged in shape.

Section proof command: `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/sections/ToastSection.test.ts`. Unpatched, the file cannot import `ToastSection` or `TOAST_*`.

| Mutation to `TOAST_SPECIMENS` | Result | Failing cases |
| --- | --- | --- |
| `Stacked toasts` container outside `.viewport` | `3 failed \| 2 passed` | renders each container inside the shell frame…; holds every framed toast… at 390 and at 1280 |
| `role="status" aria-live="polite"` on one toast | `1 failed \| 4 passed` | renders a shown toast, a stacked pair, and a centered toast… |
| one toast without `show` | `1 failed \| 4 passed` | the same contract case |
| a `style` attribute on one toast body | `1 failed \| 4 passed` | the same contract case |
| the header close control's `aria-label` removed | `1 failed \| 4 passed` | the same contract case |
| centered container `translate-middle-y` | `3 failed \| 2 passed` | renders each container inside the shell frame…; holds every framed toast… at 390 and at 1280 |

## Gates on the validation copy

| Command | Exit | Result line |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check` over the owned and shared files | 0 | all matched files formatted |
| `npx oxlint --config .oxlintrc.json --deny-warnings` over the owned and shared TypeScript and SCSS files | 0 | no findings |
| `npm run check` | 0 | — |
| `npm run build:src` | 0 | `✓ built` for core, browser, and styles |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/toast.test.ts tests/src/styles/components/close.test.ts` | 0 | `Tests 34 passed (34)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/ToastSection.test.ts` | 0 | `Tests 5 passed (5)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | 0 | `Tests 5 passed (5)` |
| `npm run test:setup` | 0 | `Tests 267 passed (267)` (see observations) |
| `npm run test:conformance` | 0 | `Tests 22 passed (22)` |
| `npm run test:guides` | 0 | `Tests 19 passed (19)` |
| `npm run test:policy` | 0 | `Tests 109 passed \| 1 skipped (110)` |

In the worktree: `npm run format:check` exit 0 ("All matched files use the correct format.") and `npm run lint:check` exit 0. `tmp/probe/` is deleted. The logs are retained as `.orkestrel/veneer/units/to-instruments/to-gate-*.log.txt`.

Observations, not criteria:

- One `npm run test:setup` run timed out an unrelated case at 10100 ms: `tests/setupServer.test.ts` › records and reads official control state and rejects contradicted or absent obligation steps. That run gave `1 failed | 266 passed`. The load average was 12 with the sibling units live. The earlier and later runs on the same tree read `267 passed (267)`. The deciding re-run is the Orchestrator's.
- Journey subset on the copy: `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot -t "resting cascade key|names a specimen the showcase declares"` exited 0 with `Tests 8 passed | 168 skipped (176)` across `Test Files 4 passed (4)`. The resting-key case read the toast rows in every variant. The log is `.orkestrel/veneer/units/to-instruments/to-journey-observation.log.txt`. The whole journey, `CAPTURE=1`, `test:service`, and the whole styles project were not run.

## Shared-name reading

- The exclusion line in `tests/setup.css` names no toast class.
- I compiled Tailwind's utilities through the installed `@tailwindcss/postcss` plugin, with `@source inline("toast toast-container toast-header toast-body show showing fade flex-grow-1")` and `source(none)`, from a probe in the copy. The compiler emitted `flex-grow-1` alone. `flex-grow-1` is a shipped flex utility that the existing Tailwind rules already cover, so no toast class is a shared name. `test:service` stays an observation (M17). The probe is deleted.

## Coloured-toast reading

`grep -o "\.<class>[{,:]"` over the built cascade `dist/src/styles/index.css` at `2a3f223` finds no rule for `text-bg-primary`, `bg-primary`, `border-0`, `me-auto`, `me-2`, `m-auto`, or `p-3`. It finds rules for `d-flex`, `align-items-center`, `btn-close-white`, `flex-grow-1`, `position-absolute`, `top-0`, `end-0`, `top-50`, `start-50`, and `translate-middle`. The release's coloured toasts need `text-bg-*` and `border-0`, so no coloured specimen renders, and § Toast classes says so. The header title uses `flex-grow-1` where the release's markup writes the unshipped `me-auto`. That substitution is recorded in the `TOAST_SPECIMENS` TSDoc and in the guide.

## Decisions (ancillary, inside the deviation contract)

- `--bs-toast-spacing` reads `var(--vn-gutter-x)` rather than `var(--vn-space-12)`. The release derives `$toast-spacing` from `$container-padding-x`, which Veneer publishes as `--vn-gutter-x` on the container rows, so the gap answers to no density factor. The density case pins this choice.
- The insets read `--vn-space-6` and `--vn-space-4`, and the text size reads `--vn-size-2`, following the pagination, card, and dropdown precedents. `--bs-toast-color` is written as `#{''}`, the card precedent, so the gate measures no row for it.
- The specimens are `Shown toast` (in flow), `Stacked toasts` (container `top-0 end-0` inside `.viewport`), and `Centered toast` (container `top-50 start-50 translate-middle` inside `.viewport`). The copy reads: "Compare a shown toast with the close control fitted into its header, the gap between toasts stacked in a container, and a container placed at the center of its frame."
- The accessible pair is `role="alert" aria-live="assertive" aria-atomic="true"`, the release's first documented pair. No `data-bs-dismiss` attribute is written, following the alert specimen.
- Row positions: the compatibility `toast` selector and variable rows sit after the `navbar` variable row. The Toast `plugin` row sits after the Carousel row, and its text is kept within the Obligation column's width so the formatter does not re-pad the table. `#### toast` sits between `#### btn-close` and `#### carousel` in barrel order. `### Toast classes` sits between `### Close classes` and `### Carousel classes`. The § Files row sits after `_close.scss`.
- The stacking paragraph under the table is left as the base has it (MODAL rewrites it). It still says that each rung answers no `--bs-*` alias, while the toast row's Alias cell names `--bs-toast-zindex`. That sentence is MODAL's to rewrite.

## Disagreements recorded (the tree wins)

- The first terrain § B records the Toast keys as "`focusin` / `focusout` only pause autohide". `node_modules/bootstrap/js/src/toast.js` `_setListeners` also binds `mouseover` and `mouseout` to `_onInteraction`. The plugin row therefore says that a pointer or focus inside the toast holds the timer.
- The brief expected a `.toast-header .btn-close` row under `#### btn-close`. The gate measures none, as recorded in § Ledger rows.

## Guide text

The `### Toast classes` section, the § Files row, the `#### toast` table, the compatibility rows, the Alias cell, the § Showcase sentences, and the § Tests link are in the patch that follows, in the `guides/veneer.md` hunks. The compatibility rows are:

- `| toast | selector | Every official `.toast` selector ships in the components layer, the shown and showing states, the container and its stacking gap, the header, its close combinator, and the body included; resolved geometry, states, stacking, and paint are proved in `tests/src/styles/components/toast.test.ts`. | — | shipped |`
- `| toast | variable | Every official `--bs-toast-*` custom property is declared on the `.toast` class, and the stacking slot is declared again on the `.toast-container` class; each one is read beside the property it drives in `tests/src/styles/components/toast.test.ts`. | — | shipped |`
- `| engine | plugin | Toast: a `[data-bs-dismiss="toast"]` trigger hides the toast it names or sits in; `animation: true`, `autohide: true`, and `delay: 5000` defaults; `show`, `hide`, `dispose`, and `isShown` methods; cancelable `show.bs.toast` and `hide.bs.toast`, then `shown.bs.toast` and `hidden.bs.toast`; the `showing` class for each fade and the `fade` class when animated; autohide after `delay`, held while a pointer or focus is inside. Owner: J-ENGINE. | — | accepted |`

## Review evidence

- `.orkestrel/veneer/units/to.diff`: `git diff 2a3f223`, empty for tracked files, plus each new file through `git diff --no-index /dev/null`.
- `.orkestrel/veneer/units/to-status.txt`: `git status --porcelain` at hand-back.
- `.orkestrel/veneer/units/to-shared.patch`: the exact shared patch, also reproduced here.

## Exact shared patch (`.orkestrel/veneer/units/to-shared.patch`)

```diff
--- a/src/styles/index.scss
+++ b/src/styles/index.scss
@@ -71,6 +71,7 @@
 @use 'components/progress' as progress-component;
 @use 'components/list-group';
 @use 'components/close';
+@use 'components/toast';
 @use 'components/carousel';
 @use 'components/spinner';
 @use 'components/placeholder';
--- a/tests/setupStyles.ts
+++ b/tests/setupStyles.ts
@@ -4572,11 +4572,11 @@
 	'.btn-close.disabled',
 	'.btn-close-white',
 	'.alert-dismissible .btn-close',
+	'.toast-header .btn-close',
 ])
 
 /** Lists the official `.btn-close` combinators the overlay components still owe. */
 export const CLOSE_DEFERRED = Object.freeze([
-	'.toast-header .btn-close',
 	'.modal-header .btn-close',
 	'.offcanvas-header .btn-close',
 ])
@@ -4607,6 +4607,53 @@
 export const CLOSE_INVERSION = 'invert(1) grayscale(100%) brightness(200%)'
 
 /**
+ * Lists every official `.toast` selector the components layer ships.
+ *
+ * @remarks
+ * The header combinator is recorded under the toast key and under the close key alike, so it sits in
+ * this table and in the {@link CLOSE_SELECTORS} constant, and each table is compared against its own
+ * key's record.
+ */
+export const TOAST_SELECTORS = Object.freeze([
+	'.toast',
+	'.toast.showing',
+	'.toast:not(.show)',
+	'.toast-container',
+	'.toast-container > :not(:last-child)',
+	'.toast-header',
+	'.toast-header .btn-close',
+	'.toast-body',
+])
+
+/**
+ * Pins each toast slot the cascade routes onto a Veneer token, beside that token and its length at
+ * the factors' initial values.
+ *
+ * @remarks
+ * The stacking gap reads the container gutter the release derives it from, so it answers to no
+ * density factor, while the insets read the density scale.
+ */
+export const TOAST_SLOT_CASES = Object.freeze([
+	Object.freeze({ property: '--bs-toast-padding-x', token: TOKEN_NAMES.space[6], pixels: 12 }),
+	Object.freeze({ property: '--bs-toast-padding-y', token: TOKEN_NAMES.space[4], pixels: 8 }),
+	Object.freeze({ property: '--bs-toast-spacing', token: TOKEN_NAMES.gutter.x, pixels: 24 }),
+	Object.freeze({ property: '--bs-toast-font-size', token: TOKEN_NAMES.size[2], pixels: 14 }),
+])
+
+/**
+ * Pins the header close control's margins against the recorded declarations, in CSS pixels at the
+ * density factor's initial value.
+ *
+ * @remarks
+ * The `left` field parts the control from the header content before it, and the `right` field pulls
+ * it into the header's end padding. Each is physical, as the release writes it.
+ */
+export const TOAST_CLOSE_GEOMETRY = Object.freeze({
+	left: 12,
+	right: -6,
+})
+
+/**
  * Lists every official `.carousel` selector the components layer ships, once each.
  *
  * @remarks
--- a/tests/setupStyles.test.ts
+++ b/tests/setupStyles.test.ts
@@ -188,6 +188,9 @@
 	TABLE_ROLE_CASES,
 	TABLE_SELECTORS,
 	THEME_DARK_ADDITIONS,
+	TOAST_CLOSE_GEOMETRY,
+	TOAST_SELECTORS,
+	TOAST_SLOT_CASES,
 	TEXT_A_CASES,
 	TEXT_ABBR_CASES,
 	TEXT_ADDRESS_CASES,
@@ -433,6 +436,9 @@
 				'TEXT_UL_CASES',
 				'TEXT_VAR_CASES',
 				'THEME_DARK_ADDITIONS',
+				'TOAST_CLOSE_GEOMETRY',
+				'TOAST_SELECTORS',
+				'TOAST_SLOT_CASES',
 				'TRANSLATION_BOX',
 				'TYPE_DISPLAY_CASES',
 				'TYPE_DISPLAY_TOKEN_CASES',
@@ -2870,6 +2876,52 @@
 	})
 })
 
+describe('toast case tables', () => {
+	it('binds the toast tables to the official inventory and the recorded header close margins', () => {
+		const recorded = oracle.components.toast.selectors
+		expect(new Set(TOAST_SELECTORS).size).toBe(TOAST_SELECTORS.length)
+		expect(new Set(TOAST_SELECTORS)).toEqual(new Set(recorded.map(({ selector }) => selector)))
+		const rules = new Map(
+			recorded.map(({ selector, declarations }): readonly [string, ReadonlyMap<string, string>] => [
+				selector,
+				new Map(
+					declarations.map(({ property, value }): readonly [string, string] => [property, value]),
+				),
+			]),
+		)
+		const base = requireValue(rules.get('.toast'), 'The inventory records no `.toast` rule')
+		// Each slot's pinned length is the recorded `rem` value at the root size. The token each slot
+		// reads is the partial's choice rather than the release's, so it is pinned by name; the
+		// toast proof reads the slot and the token as one length.
+		for (const { property, pixels } of TOAST_SLOT_CASES)
+			expect(base.get(property)).toBe(`${String(pixels / 16)}rem`)
+		expect(TOAST_SLOT_CASES.map(({ token }) => token)).toEqual([
+			TOKEN_NAMES.space[6],
+			TOKEN_NAMES.space[4],
+			TOKEN_NAMES.gutter.x,
+			TOKEN_NAMES.size[2],
+		])
+		const control = requireValue(
+			rules.get('.toast-header .btn-close'),
+			'The inventory records no header close rule',
+		)
+		expect(control).toEqual(
+			new Map([
+				['margin-right', 'calc(-0.5 * var(--bs-toast-padding-x))'],
+				['margin-left', 'var(--bs-toast-padding-x)'],
+			]),
+		)
+		const inset = requireValue(
+			TOAST_SLOT_CASES.find(({ property }) => property === '--bs-toast-padding-x'),
+			'No horizontal inset case',
+		).pixels
+		expect(TOAST_CLOSE_GEOMETRY).toEqual({ left: inset, right: inset * -0.5 })
+		for (const table of [TOAST_SELECTORS, TOAST_SLOT_CASES, TOAST_CLOSE_GEOMETRY])
+			expect(Object.isFrozen(table)).toBe(true)
+		expect(TOAST_SLOT_CASES.every((entry) => Object.isFrozen(entry))).toBe(true)
+	})
+})
+
 describe('carousel case tables', () => {
 	it('binds the carousel selector table to the official inventory, each name once', () => {
 		expect(new Set(CAROUSEL_SELECTORS).size).toBe(CAROUSEL_SELECTORS.length)
--- a/tests/setup.ts
+++ b/tests/setup.ts
@@ -233,6 +233,9 @@
 	| 'Advancing carousel'
 	| 'Accordion base'
 	| 'Accordion flush'
+	| 'Shown toast'
+	| 'Stacked toasts'
+	| 'Centered toast'
 	| 'Display values'
 	| 'Responsive display'
 	| 'Print display'
@@ -473,6 +476,11 @@
  * frames already carry. The Carousel region renders none of these, and the
  * `tests/src/styles/components/carousel.test.ts` file reads each of them on its own elements.
  *
+ * A toast carrying the showing class is declined because its frame paints nothing: the engine
+ * writes the class for the length of a fade, and the class drops the toast to no opacity, so a shot
+ * of it carries an empty box and no subject. The Toast region renders none, and the
+ * `tests/src/styles/components/toast.test.ts` file reads the class on its own elements.
+ *
  * A key whose recorded rule resolves `display: none` at rest names the surrounding region rather
  * than the element the key ships: that element's own box clips to no pixel, so a frame declared on
  * it reads back nothing. Its declared region is the element that hosts it, and the collapse itself
@@ -1385,6 +1393,24 @@
 		property: 'border-left-width',
 	}),
 	Object.freeze({
+		scenario: 'shown-toast',
+		subject: 'Shown toast',
+		selector: '.toast.show',
+		property: 'background-color',
+	}),
+	Object.freeze({
+		scenario: 'stacked-toasts',
+		subject: 'Stacked toasts',
+		selector: '.toast-container > .toast:not(:last-child)',
+		property: 'margin-bottom',
+	}),
+	Object.freeze({
+		scenario: 'centered-toast',
+		subject: 'Centered toast',
+		selector: '.toast-container.translate-middle',
+		property: 'z-index',
+	}),
+	Object.freeze({
 		scenario: 'display-values',
 		subject: 'Display values',
 		selector: '.d-inline-grid',
--- a/tests/app/browser/integration.test.ts
+++ b/tests/app/browser/integration.test.ts
@@ -74,6 +74,7 @@
 	SIZING_SPECIMENS,
 	SPINNER_SPECIMENS,
 	TABLE_SPECIMENS,
+	TOAST_SPECIMENS,
 	TYPE_SPECIMENS,
 	VALIDATION_SPECIMENS,
 	VISIBILITY_SPECIMENS,
@@ -2126,6 +2127,7 @@
 				PROGRESS_SPECIMENS,
 				SPINNER_SPECIMENS,
 				TABLE_SPECIMENS,
+				TOAST_SPECIMENS,
 				TYPE_SPECIMENS,
 				VALIDATION_SPECIMENS,
 				POSITION_SPECIMENS,
--- a/tests/app/browser/Showcase.test.ts
+++ b/tests/app/browser/Showcase.test.ts
@@ -37,6 +37,7 @@
 	Showcase,
 	TYPE_SPECIMENS,
 	TABLE_SPECIMENS,
+	TOAST_SPECIMENS,
 	VALIDATION_SPECIMENS,
 	VISIBILITY_SPECIMENS,
 } from '@app/browser'
@@ -129,6 +130,7 @@
 				'Alert',
 				'Carousel',
 				'Accordion',
+				'Toast',
 				'Display',
 				'Flex',
 				'Position',
@@ -172,6 +174,7 @@
 					...ALERT_SPECIMENS,
 					...CAROUSEL_SPECIMENS,
 					...ACCORDION_SPECIMENS,
+					...TOAST_SPECIMENS,
 					...DISPLAY_SPECIMENS,
 					...FLEX_SPECIMENS,
 					...POSITION_SPECIMENS,
--- a/tests/app/browser/index.test.ts
+++ b/tests/app/browser/index.test.ts
@@ -116,9 +116,12 @@
 			'SpinnerSection',
 			'TABLE_COPY',
 			'TABLE_SPECIMENS',
+			'TOAST_COPY',
+			'TOAST_SPECIMENS',
 			'TYPE_COPY',
 			'TYPE_SPECIMENS',
 			'TableSection',
+			'ToastSection',
 			'TypeSection',
 			'VALIDATION_COPY',
 			'VALIDATION_SPECIMENS',
--- a/tests/conformance.test.ts
+++ b/tests/conformance.test.ts
@@ -178,6 +178,7 @@
 			'start',
 			'sticky',
 			'table',
+			'toast',
 			'top',
 			'translate-middle',
 			'valid-feedback',
@@ -388,9 +389,9 @@
 		].flatMap(([, name]) => (name === undefined ? [] : [name]))
 		expect(loaded.filter((name) => release.includes(name))).toEqual(release)
 	})
-	// The release names the passive partials with the `spinners` token and the `placeholders`
-	// token, plural forms Veneer writes from the singular `spinner` stem and the `placeholder`
-	// stem, and it writes the collapse classes in its `transitions` partial, which Veneer writes as
+	// The release names the passive partials with the `toasts` token, the `spinners` token, and
+	// the `placeholders` token, plural forms Veneer writes from the singular `toast` stem, the
+	// `spinner` stem, and the `placeholder` stem, and it writes the collapse classes in its `transitions` partial, which Veneer writes as
 	// the `collapse` stem, so this case maps them the way the forms case maps its own renamed
 	// partials. The passive block and the helpers both load after every forms partial, in the release's own
 	// sequence, the nav and navbar partials join the block at the release's position between the
@@ -409,6 +410,7 @@
 	it('loads the passive block and the helpers in the release order, after every forms partial, each important helper ahead of the utilities', () => {
 		const stems: Readonly<Record<string, string>> = Object.freeze({
 			transitions: 'collapse',
+			toasts: 'toast',
 			spinners: 'spinner',
 			placeholders: 'placeholder',
 		})
@@ -427,6 +429,7 @@
 			'progress',
 			'list-group',
 			'close',
+			'toasts',
 			'carousel',
 			'spinners',
 			'placeholders',
@@ -453,6 +456,7 @@
 			'progress',
 			'list-group',
 			'close',
+			'toast',
 			'carousel',
 			'spinner',
 			'placeholder',
--- a/tests/setupServer.test.ts
+++ b/tests/setupServer.test.ts
@@ -1464,6 +1464,7 @@
 				'start',
 				'sticky',
 				'table',
+				'toast',
 				'top',
 				'translate-middle',
 				'valid-feedback',
--- a/app/browser/constants.ts
+++ b/app/browser/constants.ts
@@ -2156,6 +2156,46 @@
 	}),
 ])
 
+/** Holds the Toast section's visible copy and accessible name. */
+export const TOAST_COPY = Object.freeze({
+	region: 'Toast',
+	paragraph:
+		'Compare a shown toast with the close control fitted into its header, the gap between toasts stacked in a container, and a container placed at the center of its frame.',
+})
+
+/**
+ * Lists the toast specimens the section renders, in render order.
+ *
+ * @remarks
+ * Every toast carries the `show` class, because the release hides a toast without it. No specimen
+ * carries the `showing` class: the engine writes it for the length of a fade, and a showing toast
+ * paints nothing, so the `tests/src/styles/components/toast.test.ts` file reads it on its own
+ * elements. No specimen carries the `fade` class either, which is the engine's to set. The toast
+ * container is absolutely positioned, so each container specimen renders inside the shell's
+ * `viewport` frame and is placed with the position utilities the cascade ships. Each toast
+ * announces itself through the `role`, `aria-live`, and `aria-atomic` attributes the release's
+ * markup gives it, and each close control is named through its `aria-label` attribute. The header
+ * title carries the `flex-grow-1` class to push the time and the close control to the header's end,
+ * because the margin utility the release's markup writes there does not ship.
+ */
+export const TOAST_SPECIMENS: readonly MarkupSpecimen[] = Object.freeze([
+	Object.freeze({
+		name: 'Shown toast',
+		markup:
+			'<div class="toast show" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><strong class="flex-grow-1">Harbor office</strong><small>11 minutes ago</small><button type="button" class="btn-close" aria-label="Close"></button></div><div class="toast-body">The north pier reopens to cargo at noon.</div></div>',
+	}),
+	Object.freeze({
+		name: 'Stacked toasts',
+		markup:
+			'<div class="viewport"><div class="toast-container top-0 end-0"><div class="toast show" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><strong class="flex-grow-1">Customs desk</strong><small>1 minute ago</small><button type="button" class="btn-close" aria-label="Close"></button></div><div class="toast-body">Two containers cleared inspection.</div></div><div class="toast show" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><strong class="flex-grow-1">Customs desk</strong><small>2 minutes ago</small><button type="button" class="btn-close" aria-label="Close"></button></div><div class="toast-body">The ash consignment is held for its papers.</div></div></div></div>',
+	}),
+	Object.freeze({
+		name: 'Centered toast',
+		markup:
+			'<div class="viewport"><div class="toast-container top-50 start-50 translate-middle"><div class="toast show" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><strong class="flex-grow-1">Pilot station</strong><small>5 minutes ago</small><button type="button" class="btn-close" aria-label="Close"></button></div><div class="toast-body">The evening tide turns at 18:40.</div></div></div></div>',
+	}),
+])
+
 /** Holds the Display section's visible copy and accessible name. */
 export const DISPLAY_COPY = Object.freeze({
 	region: 'Display',
--- a/app/browser/Showcase.ts
+++ b/app/browser/Showcase.ts
@@ -36,6 +36,7 @@
 import { SizingSection } from './sections/SizingSection.js'
 import { SpinnerSection } from './sections/SpinnerSection.js'
 import { TableSection } from './sections/TableSection.js'
+import { ToastSection } from './sections/ToastSection.js'
 import { TypeSection } from './sections/TypeSection.js'
 import { ValidationSection } from './sections/ValidationSection.js'
 import { VisibilitySection } from './sections/VisibilitySection.js'
@@ -132,6 +133,7 @@
 			new AlertSection(this.#main),
 			new CarouselSection(this.#main),
 			new AccordionSection(this.#main),
+			new ToastSection(this.#main),
 			new DisplaySection(this.#main),
 			new FlexSection(this.#main),
 			new PositionSection(this.#main),
--- a/app/browser/index.ts
+++ b/app/browser/index.ts
@@ -33,6 +33,7 @@
 export * from './sections/AlertSection.js'
 export * from './sections/CarouselSection.js'
 export * from './sections/AccordionSection.js'
+export * from './sections/ToastSection.js'
 export * from './sections/DisplaySection.js'
 export * from './sections/FlexSection.js'
 export * from './sections/PositionSection.js'
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -680,6 +680,7 @@
 | `src/styles/components/_badge.scss`          | The badge box, its empty collapse, and its offset inside a button in the components layer.                                                                                                                                                         |
 | `src/styles/components/_alert.scss`          | The alert box, its heading and link, the dismissible room and the close control it places, and the contextual roles in the components layer.                                                                                                       |
 | `src/styles/components/_close.scss`          | The close control, its states, and its opt-in inversion in the components layer.                                                                                                                                                                   |
+| `src/styles/components/_toast.scss`          | The toast, its shown and showing states, the container and its stacking gap, the header and the close control it fits, and the body in the components layer.                                                                                       |
 | `src/styles/components/_carousel.scss`       | The carousel track, its slides and their advancing and fading states, the controls and their marks, the indicators, the caption, and the dark retune in the components layer.                                                                      |
 | `src/styles/components/_progress.scss`       | The progress track, its stacked form, and the bar families in the components layer.                                                                                                                                                                |
 | `src/styles/components/_spinner.scss`        | The border and grow spinners, their small twins, and their keyframes in the components layer.                                                                                                                                                      |
@@ -2524,6 +2525,74 @@
 
 The `tests/src/styles/components/close.test.ts` proof reads each resolved treatment in the browser.
 
+### Toast classes
+
+The toast key ships whole: the toast and its shown and showing states, the container and the gap
+between the toasts it stacks, the header and the close control it fits, and the body.
+
+Each state is a class set in markup. A toast displays only while it carries the `show` class, so a
+toast without it is hidden by the release's own rule. The engine writes the `showing` class for the
+length of a fade, in and out alike, and a toast carrying it drops to no opacity while it stays
+displayed. The engine also sets the `fade` class, which no Veneer rule reads. § Compatibility
+records the Toast plugin that moves a toast between the classes as an engine obligation.
+
+The `.toast` rule declares every slot it reads on itself, so a consumer retunes a toast through a
+rule of their own that selects the toast, and the same property set on an ancestor is shadowed. The
+width is a `350px` cap the toast gives up inside a narrower host. The insets read Veneer's density
+scale: the header's block inset reads `--vn-space-4`, and every horizontal inset reads
+`--vn-space-6`, the body's block inset included. The text size reads `--vn-size-2`. The fill and the
+header fill read `--bs-body-bg-rgb` at `0.85` opacity, the edges read
+`--bs-border-color-translucent`, the header text reads `--bs-secondary-color`, and the shadow reads
+`--bs-box-shadow`, so a toast inside a dark island paints the dark surface on its own. The text slot
+is the release's own empty value, so a toast paints the text color of whatever carries it until a
+consumer sets `--bs-toast-color`.
+
+The `.toast-container` class positions the container absolutely, sizes it to its widest toast, and
+lets the pointer through its own box while each toast takes the pointer back. Each toast in a
+container but the last is spaced from the next by `--bs-toast-spacing`, which reads the
+`--vn-gutter-x` token the release derives it from, so the gap answers to no density factor. The
+stacking level reads the `--vn-stack-toast` rung through `--bs-toast-zindex`, which the `.toast`
+class and the `.toast-container` class each declare, so a retune of that rung moves every toast and
+every container.
+
+The header lays its content out in a row, and its top corners take the toast's radius less the
+toast's border width, so the header's fill ends at the toast's inner edge. The close control inside
+the header takes a left margin of one horizontal inset and a right margin that pulls it half an inset
+back into the header's end padding. The margins are physical, as the release writes them. The
+combinator selects the control through the header class, so a close control elsewhere in a toast
+keeps its own margins. § Close classes gives the control's own treatment. The body is inset by one
+horizontal inset on every side and breaks a word too long for its line.
+
+These are the key's recorded departures.
+
+- **The stacking slot binds the toast rung.** The release writes `1090` for `--bs-toast-zindex` on
+  the `.toast` class and the `.toast-container` class; Veneer writes `var(--vn-stack-toast)`, which
+  resolves to the same level.
+- **The insets, the gap, and the text size read Veneer tokens.** The recorded `0.75rem` and
+  `0.5rem` insets become the `--vn-space-6` and `--vn-space-4` tokens, the recorded `1.5rem` gap
+  becomes the `--vn-gutter-x` token, and the recorded `0.875rem` text size becomes the `--vn-size-2`
+  token, each resolving to the same length.
+- **The container width drops its prefixed values.** The release writes `-webkit-max-content` and
+  `-moz-max-content` before `max-content`; Veneer writes the standard value alone.
+
+The Toast region renders a shown toast with a header and a body, a pair of toasts stacked in a
+container, and one container centered in its frame. The container is absolutely positioned, so each
+container specimen renders inside the shell's `viewport` frame, placed with the shipped `top-0` and
+`end-0` classes or the `top-50`, `start-50`, and `translate-middle` classes. Every toast carries the
+`show` class and announces itself through the `role`, `aria-live`, and `aria-atomic` attributes the
+release's markup gives it, and each close control is named through its `aria-label` attribute. The
+header title carries the `flex-grow-1` class where the release's markup writes the `me-auto` margin
+utility, which does not ship. No specimen carries the `showing` class: a showing toast paints
+nothing, so its frame would carry an empty box, and the capture registry declines it. The release's
+colored toasts carry the `text-bg-*` classes, which do not ship, so the region renders none.
+
+The `tests/src/styles/components/toast.test.ts` proof reads each resolved treatment in the browser:
+the written selectors, the box and its slots, a consumer retune and an ancestor retune, the density
+and radius factors, the hidden, shown, and showing states, the stacking level against a retuned rung
+on the container and on a toast outside one, the container's width, pointer, and gap, the header's
+row and inner corners, the header close control beside a control in the body, the body's inset and
+wrap, and the paint in light and inside a dark island.
+
 ### Carousel classes
 
 The carousel key ships whole: the track and its slides, the incoming and outgoing slide states, the
@@ -2954,7 +3023,6 @@
 | `.form-control:hover:not(:disabled):not([readonly])::-webkit-file-upload-button` | Excluded | The component rule on the same selector ships the standard `::file-selector-button` part in its place, so the prefixed alias is redundant; omitting its authored rule preserves that absence.                   |
 | `.form-control-sm::-webkit-file-upload-button`                                   | Excluded | The component rule on the same selector ships the standard `::file-selector-button` part in its place, so the prefixed alias is redundant; omitting its authored rule preserves that absence.                   |
 | `.form-control-lg::-webkit-file-upload-button`                                   | Excluded | The component rule on the same selector ships the standard `::file-selector-button` part in its place, so the prefixed alias is redundant; omitting its authored rule preserves that absence.                   |
-| `.toast-header .btn-close`                                                       | Overlays | The owning component supplies this relationship.                                                                                                                                                                |
 | `.modal-header .btn-close`                                                       | Overlays | The owning component supplies this relationship.                                                                                                                                                                |
 | `.offcanvas-header .btn-close`                                                   | Overlays | The owning component supplies this relationship.                                                                                                                                                                |
 
@@ -3304,7 +3372,7 @@
 | `--vn-stack-dropdown`, `-sticky`, `-fixed`               | `1000`, `1020`, `1030`                                                           | `bootstrap` — retained from `$zindex-dropdown`, `$zindex-sticky`, and `$zindex-fixed`                                                               | none                                                        |
 | `--vn-stack-drawer-backdrop`, `-drawer-base`             | `1040`, `1045`                                                                   | `bootstrap` — retained from `$zindex-offcanvas-backdrop` and `$zindex-offcanvas`                                                                    | none                                                        |
 | `--vn-stack-dialog-backdrop`, `-dialog-base`             | `1050`, `1055`                                                                   | `bootstrap` — retained from `$zindex-modal-backdrop` and `$zindex-modal`                                                                            | none                                                        |
-| `--vn-stack-popover`, `-hint`, `-toast`                  | `1070`, `1080`, `1090`                                                           | `bootstrap` — retained from `$zindex-popover`, `$zindex-tooltip`, and `$zindex-toast`                                                               | none                                                        |
+| `--vn-stack-popover`, `-hint`, `-toast`                  | `1070`, `1080`, `1090`                                                           | `bootstrap` — retained from `$zindex-popover`, `$zindex-tooltip`, and `$zindex-toast`                                                               | `--bs-toast-zindex`                                         |
 
 Veneer keeps Bootstrap's breakpoint names verbatim because a consumer predicts `--bs-breakpoint-md`
 from `--vn-breakpoint-md`. The `src/styles/_mixins.scss` partial holds the one Sass source those
@@ -5039,6 +5107,19 @@
 | `btn-close` | `.btn-close.disabled`           | `-moz-user-select`     | —         | `none`          | —                                                  | dropped   |
 | `btn-close` | `.alert-dismissible .btn-close` | `padding`              | —         | `1.25rem 1rem`  | `calc(var(--vn-space-8) * 1.25) var(--vn-space-8)` | tokenized |
 
+#### `toast`
+
+| Component | Selector           | Property               | Condition | Bootstrap 5.3.8       | Veneer                  | Departure |
+| --------- | ------------------ | ---------------------- | --------- | --------------------- | ----------------------- | --------- |
+| `toast`   | `.toast`           | `--bs-toast-zindex`    | —         | `1090`                | `var(--vn-stack-toast)` | tokenized |
+| `toast`   | `.toast`           | `--bs-toast-padding-x` | —         | `0.75rem`             | `var(--vn-space-6)`     | tokenized |
+| `toast`   | `.toast`           | `--bs-toast-padding-y` | —         | `0.5rem`              | `var(--vn-space-4)`     | tokenized |
+| `toast`   | `.toast`           | `--bs-toast-spacing`   | —         | `1.5rem`              | `var(--vn-gutter-x)`    | tokenized |
+| `toast`   | `.toast`           | `--bs-toast-font-size` | —         | `0.875rem`            | `var(--vn-size-2)`      | tokenized |
+| `toast`   | `.toast-container` | `--bs-toast-zindex`    | —         | `1090`                | `var(--vn-stack-toast)` | tokenized |
+| `toast`   | `.toast-container` | `width`                | —         | `-webkit-max-content` | `max-content`           | declared  |
+| `toast`   | `.toast-container` | `width`                | —         | `-moz-max-content`    | `max-content`           | declared  |
+
 #### `carousel`
 
 | Component  | Selector                       | Property                            | Condition | Bootstrap 5.3.8      | Veneer                                                      | Departure |
@@ -5492,6 +5573,8 @@
 | invisible        | selector       | The official `.invisible` selector ships in the utilities layer; the hidden paint and the kept box are proved in `tests/src/styles/utilities/visibility.test.ts`.                                                                                                                                                                                                                                                                                                | —                     | shipped  |
 | navbar           | selector       | Every official `.navbar` selector ships in the components layer, the brand, nav list, text, collapsible content, toggler and its icon, scrolling list, expand ramp, expanded offcanvas panel, and dark retunes included, and the container combinators the key records ship from the container partial; resolved behavior is proved in `tests/src/styles/components/navbar.test.ts`.                                                                             | —                     | shipped  |
 | navbar           | variable       | Every official `--bs-navbar-*` custom property is declared on the `.navbar` class, the color and toggler slots are retuned by the `.navbar-dark` class and the bar's own dark attribute, and the `.navbar-nav` class retunes the `--bs-nav-link-*` slots it records; each one is read beside the property it drives in `tests/src/styles/components/navbar.test.ts`.                                                                                             | —                     | shipped  |
+| toast            | selector       | Every official `.toast` selector ships in the components layer, the shown and showing states, the container and its stacking gap, the header, its close combinator, and the body included; resolved geometry, states, stacking, and paint are proved in `tests/src/styles/components/toast.test.ts`.                                                                                                                                                             | —                     | shipped  |
+| toast            | variable       | Every official `--bs-toast-*` custom property is declared on the `.toast` class, and the stacking slot is declared again on the `.toast-container` class; each one is read beside the property it drives in `tests/src/styles/components/toast.test.ts`.                                                                                                                                                                                                         | —                     | shipped  |
 | engine           | identity       | Cross-cutting engine: `VERSION` `'5.3.8'`; `DATA_KEY` `bs.${NAME}`; `EVENT_KEY` `.${DATA_KEY}`; `eventName(name)` returns `${name}${EVENT_KEY}`                                                                                                                                                                                                                                                                                                                  | —                     | accepted |
 | engine           | option         | Cross-cutting engine: `Default`/`DefaultType` inherited empty from `Config` unless a component overrides                                                                                                                                                                                                                                                                                                                                                         | —                     | accepted |
 | engine           | attribute      | Cross-cutting engine: `data-bs-config` JSON merges with `data-bs-*` attributes read by `Manipulator`; config object wins last                                                                                                                                                                                                                                                                                                                                    | —                     | accepted |
@@ -5519,6 +5602,7 @@
 | engine           | plugin         | ScrollSpy: `[data-bs-spy="scroll"]` observes the sections its `target` links name through `IntersectionObserver` (`rootMargin`, `threshold`, `offset`, `smoothScroll`); `refresh()`, `dispose()`; fires `activate.bs.scrollspy` with `relatedTarget` and no cancelable event; moves the `active` class. Owner: J-ENGINE.                                                                                                                                         | —                     | accepted |
 | engine           | plugin         | Alert: a `[data-bs-dismiss="alert"]` trigger closes the alert it names, or the `.alert` ancestor it sits in; no defaults; the `close` method; the cancelable `close.bs.alert` event, then the `closed.bs.alert` event after removal; the `close` method removes the `show` class and waits on the transition only when the alert carries the `fade` class, then removes the element and disposes the instance; no key, focus, or ARIA handling. Owner: J-ENGINE. | —                     | accepted |
 | engine           | plugin         | Carousel: `[data-bs-slide]` and `[data-bs-slide-to]` triggers and `[data-bs-ride="carousel"]` on load; `interval: 5000`, `keyboard: true`, `pause: 'hover'`, `ride: false`, `touch: true`, and `wrap: true` defaults; `next`, `prev`, `pause`, `cycle`, and `to` methods; cancelable `slide.bs.carousel`, then `slid.bs.carousel`; arrow keys; `aria-current` on the active indicator; the `Swipe` utility adds the `pointer-event` class. Owner: J-ENGINE.      | —                     | accepted |
+| engine           | plugin         | Toast: a `[data-bs-dismiss="toast"]` trigger hides the toast it names or sits in; `animation: true`, `autohide: true`, and `delay: 5000` defaults; `show`, `hide`, `dispose`, and `isShown` methods; cancelable `show.bs.toast` and `hide.bs.toast`, then `shown.bs.toast` and `hidden.bs.toast`; the `showing` class for each fade and the `fade` class when animated; autohide after `delay`, held while a pointer or focus is inside. Owner: J-ENGINE.        | —                     | accepted |
 
 A `plugin` row records a behavior J-ENGINE owns, while the classes that behavior sets ship in the
 cascade and render in markup.
@@ -5567,12 +5651,13 @@
 clip keeps what such an element overflows inside the frame without making the frame scroll. So a
 fixed bar holds to the frame's edge, and a backdrop sized to the viewport raises no scrollbar on the
 frame or on the page. The frame's bounded height holds a default dialog at the 390 viewport and
-gives a percentage height or offset a definite height to resolve against. Every Position specimen
-and the Sizing region's `Height steps`, `Maximum sizes`, and `Viewport sizes` specimens render
-inside an element carrying the shell's `viewport` class. The sticky bars scroll inside an element
-carrying the shell's `scroller` class within the frame, because the frame clips rather than
-scrolls; see [position specimens](../tests/app/browser/sections/PositionSection.test.ts), which
-proves the frame at the 390 and 1280 viewports.
+gives a percentage height or offset a definite height to resolve against. Every Position specimen,
+the Sizing region's `Height steps`, `Maximum sizes`, and `Viewport sizes` specimens, and the Toast
+region's `Stacked toasts` and `Centered toast` specimens render inside an element carrying the
+shell's `viewport` class. The sticky bars scroll inside an element carrying the shell's `scroller`
+class within the frame, because the frame clips rather than scrolls; see
+[position specimens](../tests/app/browser/sections/PositionSection.test.ts), which proves the frame
+at the 390 and 1280 viewports.
 
 The specimen and region names are what the capture registry addresses a frame by: every registered
 scenario names the specimen or the region that is its subject, and § Tests gives the filename law
@@ -5601,6 +5686,11 @@
 [carousel specimens](../tests/app/browser/sections/CarouselSection.test.ts) and
 [cascade carousel classes](../tests/src/styles/components/carousel.test.ts).
 
+The Toast region renders no toast carrying the `showing` class, and the capture registry declines
+its frame for the reason § Toast classes states; see
+[toast specimens](../tests/app/browser/sections/ToastSection.test.ts) and
+[cascade toast classes](../tests/src/styles/components/toast.test.ts).
+
 ## Tests
 
 The core proof reads the registry's export set, its freeze, and its path law; see
@@ -5643,6 +5733,7 @@
 [specimen table rendering](../tests/app/browser/sections/SpecimenSection.test.ts),
 [spinner specimens](../tests/app/browser/sections/SpinnerSection.test.ts),
 [table specimens](../tests/app/browser/sections/TableSection.test.ts),
+[toast specimens](../tests/app/browser/sections/ToastSection.test.ts),
 [validation specimens](../tests/app/browser/sections/ValidationSection.test.ts),
 [visibility specimens](../tests/app/browser/sections/VisibilitySection.test.ts), and
 [showcase journeys](../tests/app/browser/integration.test.ts).
```
