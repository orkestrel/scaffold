# Unit ALERT (`al`) report

Executor: `opus` on Opus 5.5, native Claude subagent, worktree `/home/user/veneer-al` at `c3ac297`.
Deviation state: no stop. Every acceptance criterion closed on the validation copy or in the
worktree as the brief assigns. Ancillary choices and terrain disagreements are listed at the end.

## Touched files

Owned (added, untracked in the worktree):

- `src/styles/components/_alert.scss` — every recorded `alert` selector in the components layer,
  the dismissible combinator included, the role loop over `tokens.$aliased`.
- `tests/src/styles/components/alert.test.ts` — the browser proof of the box, slots, factors,
  heading, link, each role in light and in a dark island, and the close placement.
- `app/browser/sections/AlertSection.ts` — the `SpecimenSection` subclass for the Alert region.
- `tests/app/browser/sections/AlertSection.test.ts` — the section proof.

Shared (report-only; `/home/user/scaffold/.orkestrel/veneer/units/al-shared.patch`, unified diff against `c3ac297`):

- `src/styles/index.scss` — `@use 'components/alert'` between `badge` and `progress`.
- `tests/setupStyles.ts` — `ALERT_SELECTORS`, `ALERT_ROLES`, `ALERT_SPACE_CASES`,
  `ALERT_DISMISSIBLE_GEOMETRY`; `.alert-dismissible .btn-close` moved from `CLOSE_DEFERRED` to
  `CLOSE_SELECTORS`.
- `tests/setupStyles.test.ts` — the export list, and the case binding the alert tables to the
  inventory; the close partition case is unchanged in shape.
- `tests/setup.ts` — `CaptureSubject` gains `Dismissible alert`, `Linked alert`, `Role alerts`;
  resting `CASCADE_KEYS` rows appended; no driven row.
- `tests/conformance.test.ts` — `'alert'` in `listed`; `'alert'` between `'badge'` and
  `'progress'` in the order case's name set and expected list (no stem-map entry: the release
  names the partial `alert`).
- `tests/setupServer.test.ts` — `'alert'` in the dash-proof component set.
- `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`,
  `tests/app/browser/integration.test.ts` — the region label, the specimen order, the barrel keys,
  and the declared-subject tables.
- `app/browser/constants.ts` — `ALERT_COPY`, `ALERT_SPECIMENS`.
- `app/browser/Showcase.ts`, `app/browser/index.ts` — the section constructed and exported after
  `InputGroupSection`.
- `guides/veneer.md` — the § Files row, `### Alert classes`, the rewritten `### Close classes`
  sentence, the deleted `Overlays` row, the `#### alert` table, the combinator row under
  `#### btn-close`, the compatibility rows, the plugin row and its sentence, the § Tests links.

`tests/src/styles/components/close.test.ts` needs no patch: it reads `CLOSE_SELECTORS` and
`CLOSE_DEFERRED`, so the moved entry reaches it through the tables.

Diffstat: owned `_alert.scss` 68, `alert.test.ts` 238, `AlertSection.ts` 20,
`AlertSection.test.ts` 92 lines, all added. Shared patch: 13 files, 277 insertions, 12 deletions
(`git apply --stat` on the fresh copy).

Review evidence: `tmp/units/al.diff`, `tmp/units/al-status.txt`, `/home/user/scaffold/.orkestrel/veneer/units/al-shared.patch`.
Instruments and logs: `/home/user/scaffold/.orkestrel/veneer/units/al-instruments/` (`gates.sh`, `run.sh`, `tailwind-names.mjs`,
`mutations/*.scss`, `logs/*.log.txt`). The scripts name `tmp/probe/` paths, which were deleted
before this report as the brief requires; re-running them needs the copy rebuilt first.

## Ledger rows the gate measured

`npm run test:conformance` on the copy with the partial built and no guide rows printed these rows,
and the patch records them verbatim:

```text
alert | .alert | --bs-alert-padding-x | — | 1rem | var(--vn-space-8) | tokenized
alert | .alert | --bs-alert-padding-y | — | 1rem | var(--vn-space-8) | tokenized
alert | .alert | --bs-alert-margin-bottom | — | 1rem | var(--vn-space-8) | tokenized
alert | .alert-dismissible | padding-right | — | 3rem | var(--vn-space-24) | tokenized
btn-close | .alert-dismissible .btn-close | padding | — | 1.25rem 1rem | calc(var(--vn-space-8) * 1.25) var(--vn-space-8) | tokenized
```

The ledger files the combinator under `btn-close` (M6); no claim collision was thrown. No
addition row: `additions.unrecorded` is empty.

## Built cascade against the inventory

`npm run build:src` exit 0 on the copy. The rules in `dist/src/styles/index.css` naming an alert
class are exactly the inventory's selectors: `.alert`, `.alert-heading`, `.alert-link`,
`.alert-dismissible`, `.alert-dismissible .btn-close`, and `.alert-primary`, `-secondary`,
`-success`, `-info`, `-warning`, `-danger`, `-light`, `-dark`. Each carries the recorded
declarations, with the tokenized values the preceding rows name; no other rule names an alert class
(`.alert-tertiary` is absent).

## Resting rows and subjects

| Scenario | Subject | Selector | Property |
| --- | --- | --- | --- |
| `role-alerts` | `Role alerts` | `.alert-primary` | `background-color` |
| `linked-alert` | `Linked alert` | `.alert:has(.alert-link)` | `color` |
| `dismissible-alert` | `Dismissible alert` | `.alert-dismissible` | `padding-right` |

The roles share one specimen because `tests/setup.test.ts` refuses a scenario carrying `light` or
`dark`, which per-role specimens would name.

## R19 proof matrix

The pinned inventory records no `condition` field and no `media` entry for `alert`, so the matrix
has selector rows only. Case names are from `tests/src/styles/components/alert.test.ts` unless
noted. Each named mutation was run through the alert proof on the copy (`run.sh`), and the red
cases are the ones listed.

| Selector | Case | Distinguishing mutation (measured red) | Specimen | Scenario |
| --- | --- | --- | --- | --- |
| `.alert` | `pads, spaces, and rounds the box from its own slots and paints no fill or edge at rest`; `reads $property from its own token`; `moves the padding through a consumer scope retuning its slots and shadows an ancestor retune`; `rescales the box with the density and radius factors` | literal `padding: 1rem 1rem` (consumer-scope and factor cases); slot written `1rem` (token and factor cases); `position: relative` dropped (box case and placement case) | `Role alerts`, `Linked alert`, `Dismissible alert` | `role-alerts` |
| `.alert-heading` | `paints the heading in the alert text color where a bare heading reads the heading slot` | rule dropped (that case and the containment case) | `Linked alert` | `linked-alert` |
| `.alert-link` | `weights the link and paints it from its own slot, inheriting the alert text at rest`; each role case's link reading | rule dropped (that case, the containment case, and every role case) | `Linked alert` | `linked-alert` |
| `.alert-dismissible` | `reserves the end padding and pins the close control to the top-right corner above the content`; `rescales the box with the density and radius factors` | `padding-right: 3rem` literal (factor case) | `Dismissible alert` | `dismissible-alert` |
| `.alert-dismissible .btn-close` | `reserves the end padding and pins the close control to the top-right corner above the content`; `leaves a close control inside a plain alert in flow`; `close.test.ts` `carries a rule for every shipped close name and none for a deferred combinator` | `right: 0` written `left: 0` (placement case); rule written `.alert .btn-close` (plain-alert case and containment case) | `Dismissible alert` | `dismissible-alert` |
| `.alert-{role}` for each role | `paints the %s alert from its own role aliases` in light and in dark; `emits no variant for the role Bootstrap 5.3.8 does not name` | `.alert-info` reading `--bs-primary-*` (info, both modes); `.alert-warning` written as literals (warning, both modes); loop over `tokens.$roles` (the tertiary case, and conformance `records every emitted name the official inventory lacks` with `alert \| .alert-tertiary \| — \| selector`) | `Role alerts` | `role-alerts` |

Each role case first holds every other role apart from this one on each alias it reads, in the
island's mode, so the cross-role mutation cannot pass through a pair of roles resolving alike.

## Failing-first and mutation record

All runs on the validation copy under `tmp/probe/base` (and `tmp/probe/fresh` for the final
chain), with `PATH` carrying npm 11.

- Baseline in the worktree at `c3ac297`: `npm run test:conformance` exit 0, 22 passed;
  `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/close.test.ts`
  exit 0, 17 passed.
- Styles proof, with the case tables, the moved close entry, and the proof in place and no
  partial:
  `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/alert.test.ts tests/src/styles/components/close.test.ts`
  → exit 1, `Tests 28 failed | 17 passed (45)`. The close failure is
  `carries a rule for every shipped close name and none for a deferred combinator`. The one alert
  case green before the partial is the tertiary case, whose red is the loop mutation. After the
  partial and the barrel line: exit 0, `Tests 45 passed (45)`.
- Section proof before `AlertSection` existed:
  `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/AlertSection.test.ts`
  → exit 1 at collection (`does not provide an export named 'AlertSection'`, no tests ran). After:
  exit 0, `Tests 2 passed (2)`. This red is an import failure, not an assertion count.
- Conformance with the partial built and no guide edits: `npm run test:conformance` → exit 1,
  `Tests 5 failed | 17 passed (22)` (the presence cases on the stale deferral, the
  departure ledger, and the shipped-deferral case). After the guide edits: exit 0, 22 passed.
- Mutations (`run.sh <name>`, each restoring the partial and rebuilding after): `role-alias` 2
  failed; `role-literal` 2; `link-dropped` 18; `heading-dropped` 2; `close-left` 1;
  `close-plain-alert` 2; `literal-padding` 2; `slot-literal` 2; `position-dropped` 2;
  `dismissible-literal` 1; `loop-roles` 1 in the alert proof and 2 in conformance (the additions
  case and the planted-literal control case, whose own `additions.unrecorded` assertion carries the
  tertiary row). Every run was out of 28 alert cases.

## Gates

Worktree:

- `npm run format:check` → exit 0, `All matched files use the correct format.`
- `npm run lint:check` → exit 0.
- `npm run test:policy` → exit 0, `Tests 109 passed | 1 skipped (110)`; the skip is the vendored
  `denylist currency` case and is present at `c3ac297`.

Fresh validation copy (`git archive c3ac297`, `cp -al node_modules`, the owned files, then
`git apply` of `al-shared.patch`; `git apply --check` exit 0), run by `gates.sh`:

- `npm run check` → exit 0.
- `npm run build:src` → exit 0.
- styles proof (alert and close) → exit 0, `Tests 45 passed (45)`.
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/AlertSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts`
  → exit 0, `Tests 7 passed (7)`. The sibling section proofs run in the `app:browser` project
  (`vite.config.ts`; no `configs/` file names `sections/`).
- `npm run test:conformance` → exit 0, `Tests 22 passed (22)`.
- `npm run test:guides` → exit 0, `Tests 19 passed (19)`.
- `npm run test:policy` → exit 0, `Tests 109 passed | 1 skipped (110)`.
- `npm run test:setup` → exit 0, `Tests 251 passed (251)`.
- Scoped `oxfmt --check` and `oxlint --deny-warnings` over every owned and shared file → exit 0.

Observations, not criteria, taken on the first copy: the whole styles project
(`npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot`) exit 0,
`Tests 788 passed (788)`; `npm run test:app` exit 0, `Tests 67 passed (67)`. One conformance run on
that copy timed out the Button oracle case at 10100 ms; the same command re-run alone went green
(22 passed, 33.87 s). Rule that reading yourself. The journey, `CAPTURE=1`, and
`test:service` were not run.

## Shared-name reading

The built cascade ships `alert`, `alert-heading`, `alert-link`, `alert-dismissible`, and
`alert-primary` through `alert-dark`. None appears on the `@source not inline(...)` line in
`tests/setup.css`. A probe compiling `@import 'tailwindcss/utilities' source(none);` through the
installed `@tailwindcss/node` 4.3.3 generated no rule for any of those names, and it generated
rules for the controls `table` and `container` (`tailwind-names.mjs`). No shared name appears, so
M17 keeps `test:service` an observation and no Tailwind fixture changes.

## Guide text

`### Alert classes`, between `### Badge classes` and `### Progress classes`:

```markdown
The alert key ships whole: the alert box, its heading and its link, the dismissible alert and the
close control it places, and the contextual roles.

The `.alert` rule declares every slot it reads on itself, so a consumer retunes an alert through a
rule of their own that selects the alert, and the same property set on an ancestor is shadowed. The
inset and the bottom spacing read Veneer's density scale. The edge reads `--bs-border-width` and the
radius reads `--bs-border-radius`, which this cascade declares over `--vn-radius-base`, so
`--vn-factor-radius` reaches the alert's corners. The fill and the edge color are transparent and
the text and link slots inherit, so a plain alert paints the text of whatever carries it and no fill
of its own.

A heading carrying the `.alert-heading` class takes the alert's own text color rather than the
heading color the elements layer gives every other heading. A link carrying the `.alert-link` class
takes the fixed `700` weight Bootstrap writes and paints from `--bs-alert-link-color`, which a
contextual role sets to its text tier; no published Veneer weight resolves to `700`, so that weight
stays literal.

The `.alert-dismissible` class reserves room at the alert's end, and the close control inside it is
placed in that room: against the top and end edges of the alert's padding box, at `z-index: 2`,
with a block inset of `1.25` times the inline one. The placement selects the control through the
dismissible class, so a close control inside a plain alert stays in flow. § Close classes gives the
control's own treatment.

The contextual roles walk the tokens module's aliased role list, which is the release's own set.
Veneer carries a `tertiary` role of its own and the release does not, so no `.alert-tertiary` rule is
emitted and an alert carrying that class paints as a plain one. Each role class retunes the alert's
text, fill, edge, and link slots from the role's `--bs-{role}-text-emphasis`,
`--bs-{role}-bg-subtle`, and `--bs-{role}-border-subtle` aliases and declares no property of its
own. The theme scopes retune those aliases, so an alert inside a dark island paints its role's dark
tiers.

The alert classes are set in markup. The release's Alert plugin, which removes a dismissed alert
after its `fade` transition, is behavior the engine owns, and § Compatibility records it. No
showcase specimen carries the `fade` class or the `show` class, and every alert rule paints the same
without them.

These are the key's recorded departures.

- **The spacing reads Veneer's density scale.** The release writes `1rem` for the alert's inset and
  bottom spacing and `3rem` for the dismissible end padding; Veneer writes the `--vn-space-8` token
  and the `--vn-space-24` token, which already resolve to those lengths. The close control's inset
  inside a dismissible alert, `1.25rem` and `1rem` in the release, is written over the same
  `--vn-space-8` token, so `--vn-factor-density` moves the room and the control together. The
  ledger files that inset under the `btn-close` table, because the release records the combinator
  under the close key as well.

The showcase's Alert region carries every role in one ramp, an alert with a heading and a link, and a
dismissible alert whose close control announces the dismissal it performs.

The `tests/src/styles/components/alert.test.ts` proof reads each resolved treatment in the browser:
the box and its slots, a consumer retune and an ancestor retune, the density and radius factors, the
heading and the link beside a bare heading and a bare link, each role against its own aliases in
light and inside a dark island, and the close control's placement beside a control inside a plain
alert.
```

`### Close classes`, the replaced second sentence (M6's wording):

```markdown
Each overlay partial writes the combinator that fits the control into its header or its
dismissible box; a combinator whose partial has not landed stays listed under § Deferred selectors.
```

§ Files row, after the `_badge.scss` row:

```markdown
| `src/styles/components/_alert.scss` | The alert box, its heading and link, the dismissible room and the close control it places, and the contextual roles in the components layer. |
```

§ Deferred selectors: the `.alert-dismissible .btn-close` `Overlays` row is deleted; the toast,
modal, and offcanvas `Overlays` rows stay.

§ Compatibility rows, after the `pagination | variable` row:

```markdown
| alert | selector | Every official `.alert` selector ships in the components layer, the dismissible close placement and the contextual roles included; resolved box, content, placement, and role paint are proved in `tests/src/styles/components/alert.test.ts`. | — | shipped |
| alert | variable | Every official `--bs-alert-*` custom property is declared on `.alert`, and each contextual role retunes it from that role's aliases; each one is read beside the property it drives in `tests/src/styles/components/alert.test.ts`. | — | shipped |
```

The R8 plugin row after the last `engine` row, and the sentence after the table:

```markdown
| engine | plugin | Alert: a `[data-bs-dismiss="alert"]` trigger closes the alert it names, or the `.alert` ancestor it sits in; no defaults; the `close` method; the cancelable `close.bs.alert` event, then the `closed.bs.alert` event after removal; `close` removes the `show` class and waits on the transition only when the alert carries `fade`, then removes the element and disposes the instance; no key, focus, or ARIA handling. Owner: J-ENGINE. | — | accepted |

A `plugin` row records behavior the engine owns and no shipped Veneer module performs, while the
classes that plugin sets ship in the cascade and render in markup.
```

The departure tables are the ledger rows the gate measured (preceding section), under a
`#### alert` heading between `#### badge` and `#### progress`, and appended to `#### btn-close`,
whose columns the formatter realigns. § Tests gains
`[alert specimens](../tests/app/browser/sections/AlertSection.test.ts)` before the badge link and
`[the alert classes](../tests/src/styles/components/alert.test.ts)` after the badge classes link.
§ Showcase names no region list at `c3ac297`, so it takes no change; the Alert classes section
names the region's specimens.

## Choices and disagreements

Ancillary choices this unit settled (deviation contract):

- Specimens: `Role alerts` (named in the pattern of `Role links`), `Linked alert` (a success alert
  with an `.alert-heading` and an `.alert-link`), and `Dismissible alert` (a warning alert with a
  `button.btn-close` named `Close`, M15). Each alert carries the release's `role="alert"`, so the
  ramp puts a live region per role on the page; rule that on the subjective lane. No specimen carries
  `fade`, `show`, or `data-bs-dismiss` (M12, R17).
- The copy is one imperative sentence: "Compare each role fill, the heading and the link an alert
  paints in its own text, and the close control a dismissible alert places in its corner."
- The combinator's inset is written `calc(var(--vn-space-8) * 1.25) var(--vn-space-8)`, after the
  `_form-floating.scss` precedent (`calc(var(--vn-space-8) * 1.625)`), because no space token
  resolves to `1.25rem`; the `700` link weight and `z-index: 2` stay literal (no token resolves).
- The `Linked alert` capture row declares `.alert:has(.alert-link)` so its region is the whole
  alert rather than the link text.
- Added rows sit at the end of their tables: the compatibility rows after `pagination | variable`,
  the plugin row after the last `engine` row, the registry rows at the end of `CASCADE_KEYS`.

Disagreements with the brief or the terrain, the tree winning:

- The brief names `node_modules/@orkestrel/test/dist/src/core/index.d.cts` and
  `dist/src/browser/index.d.cts`; the installed declarations are `index.d.ts` in each directory.
- M14 places the section after the disclosure regions and before the first utility region. Neither
  exists at `c3ac297`, so the patch constructs `AlertSection` after `InputGroupSection`, and the
  `Showcase.test.ts` region list and specimen order end with `Alert`. Integration after the
  disclosure or utilities landings moves the line and those lists.
- R8's closing sentence ("A `plugin` row records behavior …") is not in the guide at `c3ac297`, and
  this patch adds it with the Alert row. The retained COLLAPSE patch adds the same sentence; keep
  one copy at integration.
- The `btn-close | selector` compatibility row ("… the header combinators are listed under
  § Styles.") is left unchanged; after this patch the combinators still listed there are the header
  ones, so the sentence reads true.
- `tests/setup.test.ts` is not made false: the setup project is green with the registry rows
  appended.

Search bound: `grep -rn "'pagination'" tests app src --include=*.ts` at `c3ac297` returns
`tests/conformance.test.ts` (the `listed` literal and the order case), `tests/setupServer.test.ts`
(the component set), `tests/setupStyles.ts`, `tests/setupBrowser.test.ts`, and
`tests/src/styles/components/pagination.test.ts`; the setup-browser, setup-styles, and pagination
hits hold pagination's own tables and cases, so the alert patch touches the conformance and
setup-server files.

## Shared patch

The exact content of `/home/user/scaffold/.orkestrel/veneer/units/al-shared.patch` (SHA-256
`c28d76b25dd03df84d364eef765e3ab958bdf0331e71c9bb49cd83727b8cc6f3`):

```diff
--- a/src/styles/index.scss
+++ b/src/styles/index.scss
@@ -62,6 +62,7 @@
 @use 'components/breadcrumb';
 @use 'components/pagination';
 @use 'components/badge';
+@use 'components/alert';
 @use 'components/progress' as progress-component;
 @use 'components/list-group';
 @use 'components/close';
--- a/tests/setupStyles.ts
+++ b/tests/setupStyles.ts
@@ -4078,6 +4078,61 @@
 	Object.freeze({ name: '24px host', host: 24, size: 18, insetX: 11.7, insetY: 6.3 }),
 ])
 
+/**
+ * Lists every official `.alert` selector outside the contextual role family the components layer
+ * ships.
+ *
+ * @remarks
+ * The dismissible combinator is recorded under the alert key and under the close key alike, so it
+ * sits in this table and in the {@link CLOSE_SELECTORS} constant, and each table is compared against
+ * its own key's record.
+ */
+export const ALERT_SELECTORS = Object.freeze([
+	'.alert',
+	'.alert-heading',
+	'.alert-link',
+	'.alert-dismissible',
+	'.alert-dismissible .btn-close',
+])
+
+/** Lists the contextual alert roles, independently of the partial's own loop. */
+export const ALERT_ROLES = Object.freeze([
+	'primary',
+	'secondary',
+	'success',
+	'info',
+	'warning',
+	'danger',
+	'light',
+	'dark',
+])
+
+/**
+ * Pins each alert slot the cascade routes onto a space token, beside that token and its length at
+ * the density factor's initial value.
+ */
+export const ALERT_SPACE_CASES = Object.freeze([
+	Object.freeze({ property: '--bs-alert-padding-x', token: TOKEN_NAMES.space[8], pixels: 16 }),
+	Object.freeze({ property: '--bs-alert-padding-y', token: TOKEN_NAMES.space[8], pixels: 16 }),
+	Object.freeze({ property: '--bs-alert-margin-bottom', token: TOKEN_NAMES.space[8], pixels: 16 }),
+])
+
+/**
+ * Pins the dismissible alert's geometry against the recorded declarations, in CSS pixels at the
+ * density factor's initial value.
+ *
+ * @remarks
+ * `end` is the alert's own end padding, which reserves the room the control sits in. `block` and
+ * `inline` are the control's inset inside that room, and `lift` is the stacking level that puts the
+ * control over the alert's content.
+ */
+export const ALERT_DISMISSIBLE_GEOMETRY = Object.freeze({
+	end: 48,
+	block: 20,
+	inline: 16,
+	lift: '2',
+})
+
 /** Lists every official `.btn-close` selector the components layer ships. */
 export const CLOSE_SELECTORS = Object.freeze([
 	'.btn-close',
@@ -4086,11 +4141,11 @@
 	'.btn-close:disabled',
 	'.btn-close.disabled',
 	'.btn-close-white',
+	'.alert-dismissible .btn-close',
 ])
 
 /** Lists the official `.btn-close` combinators the overlay components still owe. */
 export const CLOSE_DEFERRED = Object.freeze([
-	'.alert-dismissible .btn-close',
 	'.toast-header .btn-close',
 	'.modal-header .btn-close',
 	'.offcanvas-header .btn-close',
--- a/tests/setupStyles.test.ts
+++ b/tests/setupStyles.test.ts
@@ -30,6 +30,10 @@
 } from './setupServer.js'
 import * as setup from './setupStyles.js'
 import {
+	ALERT_DISMISSIBLE_GEOMETRY,
+	ALERT_ROLES,
+	ALERT_SELECTORS,
+	ALERT_SPACE_CASES,
 	BADGE_GEOMETRY_CASES,
 	BADGE_SELECTORS,
 	BOOTSTRAP_DARK_VARIABLES,
@@ -192,6 +196,10 @@
 	it('exports the cascade and guide readers, the selector grammar the normalizer stands on, the frozen case tables, and the retained value lists', () => {
 		expect(Object.keys(setup).sort()).toEqual(
 			[
+				'ALERT_DISMISSIBLE_GEOMETRY',
+				'ALERT_ROLES',
+				'ALERT_SELECTORS',
+				'ALERT_SPACE_CASES',
 				'BADGE_GEOMETRY_CASES',
 				'BADGE_SELECTORS',
 				'BOOTSTRAP_DARK_VARIABLES',
@@ -2324,6 +2332,60 @@
 			),
 		)
 	})
+	it('binds the alert tables to the official inventory and the recorded dismissible geometry', () => {
+		const recorded = oracle.components.alert.selectors
+		const names = new Set(recorded.map(({ selector }) => selector))
+		// The recorded vocabulary partitions into the pinned base selectors and one variant per role,
+		// so a pin naming an invented selector and a recorded rule neither table reaches each redden
+		// this comparison.
+		const variants = ALERT_ROLES.map((role) => `.alert-${role}`)
+		expect(new Set([...ALERT_SELECTORS, ...variants])).toEqual(names)
+		expect(ALERT_SELECTORS.filter((selector) => variants.includes(selector))).toEqual([])
+		const rules = new Map(
+			recorded.map(({ selector, declarations }): readonly [string, ReadonlyMap<string, string>] => [
+				selector,
+				new Map(
+					declarations.map(({ property, value }): readonly [string, string] => [property, value]),
+				),
+			]),
+		)
+		// Each variant reads its own role's aliases, which is the pairing the alert proof retunes.
+		for (const role of ALERT_ROLES)
+			expect(rules.get(`.alert-${role}`)).toEqual(
+				new Map([
+					['--bs-alert-color', `var(--bs-${role}-text-emphasis)`],
+					['--bs-alert-bg', `var(--bs-${role}-bg-subtle)`],
+					['--bs-alert-border-color', `var(--bs-${role}-border-subtle)`],
+					['--bs-alert-link-color', `var(--bs-${role}-text-emphasis)`],
+				]),
+			)
+		const base = rules.get('.alert')
+		for (const { property, token, pixels } of ALERT_SPACE_CASES) {
+			expect(token).toBe(`--vn-space-${String(pixels / 2)}`)
+			expect(base?.get(property)).toBe(`${String(pixels / 16)}rem`)
+		}
+		const { end, block, inline, lift } = ALERT_DISMISSIBLE_GEOMETRY
+		expect(rules.get('.alert-dismissible')?.get('padding-right')).toBe(`${String(end / 16)}rem`)
+		const control = requireValue(
+			rules.get('.alert-dismissible .btn-close'),
+			'The inventory records no dismissible close rule',
+		)
+		expect(control.get('padding')).toBe(`${String(block / 16)}rem ${String(inline / 16)}rem`)
+		expect(control.get('z-index')).toBe(lift)
+		expect([control.get('position'), control.get('top'), control.get('right')]).toEqual([
+			'absolute',
+			'0',
+			'0',
+		])
+		for (const table of [
+			ALERT_SELECTORS,
+			ALERT_ROLES,
+			ALERT_SPACE_CASES,
+			ALERT_DISMISSIBLE_GEOMETRY,
+		])
+			expect(Object.isFrozen(table)).toBe(true)
+		expect(ALERT_SPACE_CASES.every((entry) => Object.isFrozen(entry))).toBe(true)
+	})
 	it('derives the badge geometry and the breadcrumb inset from the recorded declarations', () => {
 		const badge = requireValue(
 			oracle.components.badge.selectors.find(({ selector }) => selector === '.badge'),
--- a/tests/setup.ts
+++ b/tests/setup.ts
@@ -105,6 +105,7 @@
 	| 'Invalid feedback'
 	| 'Invalid select'
 	| 'Disabled page'
+	| 'Dismissible alert'
 	| 'Form check box'
 	| 'Form check checked'
 	| 'Form check disabled'
@@ -116,6 +117,7 @@
 	| 'Form check switch disabled'
 	| 'Form check switch reverse'
 	| 'Large pagination'
+	| 'Linked alert'
 	| 'Check group'
 	| 'Horizontal group'
 	| 'Large group'
@@ -181,6 +183,7 @@
 	| 'Form select multiple'
 	| 'Form select sized'
 	| 'Form select small'
+	| 'Role alerts'
 	| 'Role links'
 	| 'Showcase'
 	| 'Small pagination'
@@ -1063,6 +1066,24 @@
 		selector: 'legend.col-form-label',
 		property: 'margin-bottom',
 	}),
+	Object.freeze({
+		scenario: 'role-alerts',
+		subject: 'Role alerts',
+		selector: '.alert-primary',
+		property: 'background-color',
+	}),
+	Object.freeze({
+		scenario: 'linked-alert',
+		subject: 'Linked alert',
+		selector: '.alert:has(.alert-link)',
+		property: 'color',
+	}),
+	Object.freeze({
+		scenario: 'dismissible-alert',
+		subject: 'Dismissible alert',
+		selector: '.alert-dismissible',
+		property: 'padding-right',
+	}),
 ])
 
 /**
--- a/tests/conformance.test.ts
+++ b/tests/conformance.test.ts
@@ -96,6 +96,7 @@
 		const rows = readCompatibility()
 		const shipped = collectShippedComponents(rows)
 		const listed: readonly string[] = [
+			'alert',
 			'badge',
 			'blockquote',
 			'breadcrumb',
@@ -365,6 +366,7 @@
 			'breadcrumb',
 			'pagination',
 			'badge',
+			'alert',
 			'progress',
 			'list-group',
 			'close',
@@ -384,6 +386,7 @@
 			'breadcrumb',
 			'pagination',
 			'badge',
+			'alert',
 			'progress',
 			'list-group',
 			'close',
--- a/tests/setupServer.test.ts
+++ b/tests/setupServer.test.ts
@@ -1336,6 +1336,7 @@
 		)
 		expect(new Set(rows.map((row) => row.component))).toEqual(
 			new Set([
+				'alert',
 				'badge',
 				'blockquote',
 				'breadcrumb',
--- a/tests/app/browser/Showcase.test.ts
+++ b/tests/app/browser/Showcase.test.ts
@@ -1,4 +1,5 @@
 import {
+	ALERT_SPECIMENS,
 	BUTTON_COPY,
 	BUTTON_GROUP_SPECIMENS,
 	BADGE_SPECIMENS,
@@ -111,6 +112,7 @@
 				'Breadcrumb',
 				'Close',
 				'Input group',
+				'Alert',
 			])
 			expect(
 				[...host.querySelectorAll('[data-specimen]')].map((element) =>
@@ -142,6 +144,7 @@
 					...BREADCRUMB_SPECIMENS,
 					...CLOSE_SPECIMENS,
 					...INPUT_GROUP_SPECIMENS,
+					...ALERT_SPECIMENS,
 				].map((specimen) => specimen.name),
 			)
 			expect(readPerception('Showcase')).toBe('Explore the color mode with the Dark mode control.')
--- a/tests/app/browser/index.test.ts
+++ b/tests/app/browser/index.test.ts
@@ -7,6 +7,9 @@
 	// what proves they are types.
 	it('exports the showcase surface, the specimen table, and the sections family', () => {
 		expect(Object.keys(entry).sort()).toStrictEqual([
+			'ALERT_COPY',
+			'ALERT_SPECIMENS',
+			'AlertSection',
 			'BADGE_COPY',
 			'BADGE_SPECIMENS',
 			'BREADCRUMB_COPY',
--- a/tests/app/browser/integration.test.ts
+++ b/tests/app/browser/integration.test.ts
@@ -39,6 +39,7 @@
 import { afterAll, afterEach, beforeEach, describe, expect, inject, it } from 'vitest'
 import { commands, page } from 'vitest/browser'
 import {
+	ALERT_SPECIMENS,
 	BUTTON_GROUP_SPECIMENS,
 	BADGE_SPECIMENS,
 	BREADCRUMB_SPECIMENS,
@@ -1673,6 +1674,7 @@
 	it('names a specimen the showcase declares, or its own region, as every scenario subject', () => {
 		const declared = new Set([
 			...[
+				ALERT_SPECIMENS,
 				BADGE_SPECIMENS,
 				BREADCRUMB_SPECIMENS,
 				BUTTON_SPECIMENS,
--- a/app/browser/constants.ts
+++ b/app/browser/constants.ts
@@ -1425,6 +1425,42 @@
 	}),
 )
 
+/** Holds the Alert section's visible copy and accessible name. */
+export const ALERT_COPY = Object.freeze({
+	region: 'Alert',
+	paragraph:
+		'Compare each role fill, the heading and the link an alert paints in its own text, and the close control a dismissible alert places in its corner.',
+})
+
+/**
+ * Lists the alert specimens in their rendering order: the role ramp, the linked alert, and the
+ * dismissible alert.
+ *
+ * @remarks
+ * The roles share one specimen because a capture scenario's stem may carry no mode token, and a
+ * per-role specimen would name one `light` and one `dark`. The role list is the release's own, so
+ * Veneer's `tertiary` role, which emits no variant, renders no alert. No specimen carries `fade` or
+ * `show`: those classes are the engine's, and the alert rules paint the same without them.
+ */
+export const ALERT_SPECIMENS: readonly MarkupSpecimen[] = Object.freeze([
+	Object.freeze({
+		name: 'Role alerts',
+		markup: ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']
+			.map((role) => `<div class="alert alert-${role}" role="alert">The ${role} notice.</div>`)
+			.join(''),
+	}),
+	Object.freeze({
+		name: 'Linked alert',
+		markup:
+			'<div class="alert alert-success" role="alert"><h4 class="alert-heading">Oak order delivered</h4>The order reached the Northworks yard. Read the <a class="alert-link" href="#main">delivery manifest</a> for the signed receipt.</div>',
+	}),
+	Object.freeze({
+		name: 'Dismissible alert',
+		markup:
+			'<div class="alert alert-warning alert-dismissible" role="alert">The ash order is held at the border. <button type="button" class="btn-close" aria-label="Close"></button></div>',
+	}),
+])
+
 /** Holds the Breadcrumb section's visible copy and accessible name. */
 export const BREADCRUMB_COPY = Object.freeze({
 	region: 'Breadcrumb',
--- a/app/browser/Showcase.ts
+++ b/app/browser/Showcase.ts
@@ -2,6 +2,7 @@
 import type { SectionInterface, ShowcaseInterface } from './types.js'
 import { ColorMode } from '@src/browser'
 import { SHOWCASE_CONTROL, SHOWCASE_COPY } from './constants.js'
+import { AlertSection } from './sections/AlertSection.js'
 import { ButtonGroupSection } from './sections/ButtonGroupSection.js'
 import { BadgeSection } from './sections/BadgeSection.js'
 import { BreadcrumbSection } from './sections/BreadcrumbSection.js'
@@ -114,6 +115,7 @@
 			new BreadcrumbSection(this.#main),
 			new CloseSection(this.#main),
 			new InputGroupSection(this.#main),
+			new AlertSection(this.#main),
 		]
 	}
 
--- a/app/browser/index.ts
+++ b/app/browser/index.ts
@@ -27,3 +27,4 @@
 export * from './sections/BreadcrumbSection.js'
 export * from './sections/CloseSection.js'
 export * from './sections/InputGroupSection.js'
+export * from './sections/AlertSection.js'
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -202,6 +202,7 @@
 | `src/styles/components/_icon-link.scss`     | The icon link, its icon combinator, and its hover and focus shifts in the components layer.                                                                                                                                                        |
 | `src/styles/components/_breadcrumb.scss`    | The breadcrumb trail, its item inset, its divider, and the current page in the components layer.                                                                                                                                                   |
 | `src/styles/components/_badge.scss`         | The badge box, its empty collapse, and its offset inside a button in the components layer.                                                                                                                                                         |
+| `src/styles/components/_alert.scss`         | The alert box, its heading and link, the dismissible room and the close control it places, and the contextual roles in the components layer.                                                                                                       |
 | `src/styles/components/_close.scss`         | The close control, its states, and its opt-in inversion in the components layer.                                                                                                                                                                   |
 | `src/styles/components/_progress.scss`      | The progress track, its stacked form, and the bar families in the components layer.                                                                                                                                                                |
 | `src/styles/components/_spinner.scss`       | The border and grow spinners, their small twins, and their keyframes in the components layer.                                                                                                                                                      |
@@ -1482,6 +1483,63 @@
 
 The `tests/src/styles/components/badge.test.ts` proof reads each resolved treatment in the browser.
 
+### Alert classes
+
+The alert key ships whole: the alert box, its heading and its link, the dismissible alert and the
+close control it places, and the contextual roles.
+
+The `.alert` rule declares every slot it reads on itself, so a consumer retunes an alert through a
+rule of their own that selects the alert, and the same property set on an ancestor is shadowed. The
+inset and the bottom spacing read Veneer's density scale. The edge reads `--bs-border-width` and the
+radius reads `--bs-border-radius`, which this cascade declares over `--vn-radius-base`, so
+`--vn-factor-radius` reaches the alert's corners. The fill and the edge color are transparent and
+the text and link slots inherit, so a plain alert paints the text of whatever carries it and no fill
+of its own.
+
+A heading carrying the `.alert-heading` class takes the alert's own text color rather than the
+heading color the elements layer gives every other heading. A link carrying the `.alert-link` class
+takes the fixed `700` weight Bootstrap writes and paints from `--bs-alert-link-color`, which a
+contextual role sets to its text tier; no published Veneer weight resolves to `700`, so that weight
+stays literal.
+
+The `.alert-dismissible` class reserves room at the alert's end, and the close control inside it is
+placed in that room: against the top and end edges of the alert's padding box, at `z-index: 2`,
+with a block inset of `1.25` times the inline one. The placement selects the control through the
+dismissible class, so a close control inside a plain alert stays in flow. § Close classes gives the
+control's own treatment.
+
+The contextual roles walk the tokens module's aliased role list, which is the release's own set.
+Veneer carries a `tertiary` role of its own and the release does not, so no `.alert-tertiary` rule is
+emitted and an alert carrying that class paints as a plain one. Each role class retunes the alert's
+text, fill, edge, and link slots from the role's `--bs-{role}-text-emphasis`,
+`--bs-{role}-bg-subtle`, and `--bs-{role}-border-subtle` aliases and declares no property of its
+own. The theme scopes retune those aliases, so an alert inside a dark island paints its role's dark
+tiers.
+
+The alert classes are set in markup. The release's Alert plugin, which removes a dismissed alert
+after its `fade` transition, is behavior the engine owns, and § Compatibility records it. No
+showcase specimen carries the `fade` class or the `show` class, and every alert rule paints the same
+without them.
+
+These are the key's recorded departures.
+
+- **The spacing reads Veneer's density scale.** The release writes `1rem` for the alert's inset and
+  bottom spacing and `3rem` for the dismissible end padding; Veneer writes the `--vn-space-8` token
+  and the `--vn-space-24` token, which already resolve to those lengths. The close control's inset
+  inside a dismissible alert, `1.25rem` and `1rem` in the release, is written over the same
+  `--vn-space-8` token, so `--vn-factor-density` moves the room and the control together. The
+  ledger files that inset under the `btn-close` table, because the release records the combinator
+  under the close key as well.
+
+The showcase's Alert region carries every role in one ramp, an alert with a heading and a link, and a
+dismissible alert whose close control announces the dismissal it performs.
+
+The `tests/src/styles/components/alert.test.ts` proof reads each resolved treatment in the browser:
+the box and its slots, a consumer retune and an ancestor retune, the density and radius factors, the
+heading and the link beside a bare heading and a bare link, each role against its own aliases in
+light and inside a dark island, and the close control's placement beside a control inside a plain
+alert.
+
 ### Progress classes
 
 The progress key ships whole: the track, the stacked track, the bar, the striped bar, and the
@@ -1565,8 +1623,8 @@
 ### Close classes
 
 The close key ships the control, its hover, focus, and `disabled` states, and the opt-in inversion.
-The combinators the alert, toast, modal, and offcanvas headers write belong to the overlay
-components and stay listed under § Deferred selectors.
+Each overlay partial writes the combinator that fits the control into its header or its
+dismissible box; a combinator whose partial has not landed stays listed under § Deferred selectors.
 
 The control is a content-box square one `em` on each side with a `0.25em` inset, so the whole target
 measures one and a half `em` and that `em` box scales with the text around it. The radius and the
@@ -1744,7 +1802,6 @@
 | `.btn-group-lg > .btn + .dropdown-toggle-split`                                  | Disclosure | The owning component supplies this relationship.                                                                                                                                                                |
 | `.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3)`       | Disclosure | The owning component supplies this relationship.                                                                                                                                                                |
 | `.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4)`             | Disclosure | The owning component supplies this relationship.                                                                                                                                                                |
-| `.alert-dismissible .btn-close`                                                  | Overlays   | The owning component supplies this relationship.                                                                                                                                                                |
 | `.toast-header .btn-close`                                                       | Overlays   | The owning component supplies this relationship.                                                                                                                                                                |
 | `.modal-header .btn-close`                                                       | Overlays   | The owning component supplies this relationship.                                                                                                                                                                |
 | `.offcanvas-header .btn-close`                                                   | Overlays   | The owning component supplies this relationship.                                                                                                                                                                |
@@ -3540,6 +3597,15 @@
 | --------- | -------- | ------------------ | --------- | --------------- | ------------------------------ | --------- |
 | `badge`   | `.badge` | `--bs-badge-color` | —         | `#fff`          | `var(--vn-palette-white-base)` | tokenized |
 
+#### `alert`
+
+| Component | Selector             | Property                   | Condition | Bootstrap 5.3.8 | Veneer               | Departure |
+| --------- | -------------------- | -------------------------- | --------- | --------------- | -------------------- | --------- |
+| `alert`   | `.alert`             | `--bs-alert-padding-x`     | —         | `1rem`          | `var(--vn-space-8)`  | tokenized |
+| `alert`   | `.alert`             | `--bs-alert-padding-y`     | —         | `1rem`          | `var(--vn-space-8)`  | tokenized |
+| `alert`   | `.alert`             | `--bs-alert-margin-bottom` | —         | `1rem`          | `var(--vn-space-8)`  | tokenized |
+| `alert`   | `.alert-dismissible` | `padding-right`            | —         | `3rem`          | `var(--vn-space-24)` | tokenized |
+
 #### `progress`
 
 | Component  | Selector                | Property                  | Condition | Bootstrap 5.3.8                                                                                                                                                                       | Veneer                                                                                                                                                                                                                          | Departure |
@@ -3562,14 +3628,15 @@
 
 #### `btn-close`
 
-| Component   | Selector              | Property               | Condition | Bootstrap 5.3.8 | Veneer                         | Departure |
-| ----------- | --------------------- | ---------------------- | --------- | --------------- | ------------------------------ | --------- |
-| `btn-close` | `.btn-close`          | `--bs-btn-close-color` | —         | `#000`          | `var(--vn-palette-black-base)` | tokenized |
-| `btn-close` | `.btn-close`          | `border-radius`        | —         | `0.375rem`      | `var(--vn-radius-base)`        | tokenized |
-| `btn-close` | `.btn-close:disabled` | `-webkit-user-select`  | —         | `none`          | —                              | dropped   |
-| `btn-close` | `.btn-close:disabled` | `-moz-user-select`     | —         | `none`          | —                              | dropped   |
-| `btn-close` | `.btn-close.disabled` | `-webkit-user-select`  | —         | `none`          | —                              | dropped   |
-| `btn-close` | `.btn-close.disabled` | `-moz-user-select`     | —         | `none`          | —                              | dropped   |
+| Component   | Selector                        | Property               | Condition | Bootstrap 5.3.8 | Veneer                                             | Departure |
+| ----------- | ------------------------------- | ---------------------- | --------- | --------------- | -------------------------------------------------- | --------- |
+| `btn-close` | `.btn-close`                    | `--bs-btn-close-color` | —         | `#000`          | `var(--vn-palette-black-base)`                     | tokenized |
+| `btn-close` | `.btn-close`                    | `border-radius`        | —         | `0.375rem`      | `var(--vn-radius-base)`                            | tokenized |
+| `btn-close` | `.btn-close:disabled`           | `-webkit-user-select`  | —         | `none`          | —                                                  | dropped   |
+| `btn-close` | `.btn-close:disabled`           | `-moz-user-select`     | —         | `none`          | —                                                  | dropped   |
+| `btn-close` | `.btn-close.disabled`           | `-webkit-user-select`  | —         | `none`          | —                                                  | dropped   |
+| `btn-close` | `.btn-close.disabled`           | `-moz-user-select`     | —         | `none`          | —                                                  | dropped   |
+| `btn-close` | `.alert-dismissible .btn-close` | `padding`              | —         | `1.25rem 1rem`  | `calc(var(--vn-space-8) * 1.25) var(--vn-space-8)` | tokenized |
 
 #### `placeholder`
 
@@ -3958,6 +4025,8 @@
 | is-invalid       | variable       | The `--bs-form-select-bg-icon` property carries the invalid mark on a single-value select; its value and the icon map behind it are proved in `tests/src/styles/components/validation.test.ts`.                                                                                                                                                                                                                                                                  | —                     | shipped  |
 | pagination       | selector       | Every official `.pagination`, `.page-link`, and `.page-item` selector ships in the components layer; resolved geometry, states, and stacking are proved in `tests/src/styles/components/pagination.test.ts`.                                                                                                                                                                                                                                                     | —                     | shipped  |
 | pagination       | variable       | Every official `--bs-pagination-*` property is declared, and each size class redeclares its padding, font, and radius; overrides are proved in `tests/src/styles/components/pagination.test.ts`.                                                                                                                                                                                                                                                                 | —                     | shipped  |
+| alert            | selector       | Every official `.alert` selector ships in the components layer, the dismissible close placement and the contextual roles included; resolved box, content, placement, and role paint are proved in `tests/src/styles/components/alert.test.ts`.                                                                                                                                                                                                                   | —                     | shipped  |
+| alert            | variable       | Every official `--bs-alert-*` custom property is declared on `.alert`, and each contextual role retunes it from that role's aliases; each one is read beside the property it drives in `tests/src/styles/components/alert.test.ts`.                                                                                                                                                                                                                              | —                     | shipped  |
 | engine           | identity       | Cross-cutting engine: `VERSION` `'5.3.8'`; `DATA_KEY` `bs.${NAME}`; `EVENT_KEY` `.${DATA_KEY}`; `eventName(name)` returns `${name}${EVENT_KEY}`                                                                                                                                                                                                                                                                                                                  | —                     | accepted |
 | engine           | option         | Cross-cutting engine: `Default`/`DefaultType` inherited empty from `Config` unless a component overrides                                                                                                                                                                                                                                                                                                                                                         | —                     | accepted |
 | engine           | attribute      | Cross-cutting engine: `data-bs-config` JSON merges with `data-bs-*` attributes read by `Manipulator`; config object wins last                                                                                                                                                                                                                                                                                                                                    | —                     | accepted |
@@ -3979,6 +4048,10 @@
 | engine           | option         | util/config.js: Base `Config` class; `Default: {}`, `DefaultType: {}`; `NAME` getter throws; extended by `BaseComponent`, `Backdrop`, `FocusTrap`, `Swipe`, `TemplateFactory`                                                                                                                                                                                                                                                                                    | —                     | accepted |
 | engine           | method         | util/index.js: `getUID`, `getElement`, `isElement`, `isVisible`, `isDisabled`, `isRTL`, `toType`, `noop`, `parseSelector`, `reflow`, `execute`, `findShadowRoot`, `getNextActiveElement` exported as shared utilities                                                                                                                                                                                                                                            | —                     | accepted |
 | engine           | initialization | util/index.js: `getjQuery` skipped when `document.body` carries `data-bs-no-jquery`; `defineJQueryPlugin` registers `$.fn[NAME]` after `onDOMContentLoaded`                                                                                                                                                                                                                                                                                                      | —                     | accepted |
+| engine           | plugin         | Alert: a `[data-bs-dismiss="alert"]` trigger closes the alert it names, or the `.alert` ancestor it sits in; no defaults; the `close` method; the cancelable `close.bs.alert` event, then the `closed.bs.alert` event after removal; `close` removes the `show` class and waits on the transition only when the alert carries `fade`, then removes the element and disposes the instance; no key, focus, or ARIA handling. Owner: J-ENGINE.                      | —                     | accepted |
+
+A `plugin` row records behavior the engine owns and no shipped Veneer module performs, while the
+classes that plugin sets ship in the cascade and render in markup.
 
 An accepted row records scope; a named Proof step obliges the official recording to agree with the
 row. A shipped selector or variable row requires its official vocabulary less the deferrals under
@@ -4049,6 +4122,7 @@
 [specimen rendering and engine ownership](../tests/app/browser/sections/ButtonSection.test.ts),
 [typography class specimens](../tests/app/browser/sections/TypeSection.test.ts),
 [media class specimens](../tests/app/browser/sections/MediaSection.test.ts),
+[alert specimens](../tests/app/browser/sections/AlertSection.test.ts),
 [badge specimens](../tests/app/browser/sections/BadgeSection.test.ts),
 [breadcrumb specimens](../tests/app/browser/sections/BreadcrumbSection.test.ts),
 [button group specimens](../tests/app/browser/sections/ButtonGroupSection.test.ts),
@@ -4154,6 +4228,7 @@
 [the table classes](../tests/src/styles/components/table.test.ts),
 [the breadcrumb classes](../tests/src/styles/components/breadcrumb.test.ts),
 [the badge classes](../tests/src/styles/components/badge.test.ts),
+[the alert classes](../tests/src/styles/components/alert.test.ts),
 [the close classes](../tests/src/styles/components/close.test.ts),
 [the icon link classes](../tests/src/styles/components/icon-link.test.ts),
 [the ratio classes](../tests/src/styles/components/ratio.test.ts),
```
