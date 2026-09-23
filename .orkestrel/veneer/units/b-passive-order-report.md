# B-PASSIVE-ORDER report

## Barrel diff (`src/styles/index.scss`, lines 52 to 73 only)

```diff
-@use 'components/icon-link';
-@use 'components/ratio';
-@use 'components/vr';
 @use 'components/form-label';
 @use 'components/form-control';
 @use 'components/form-select';
 @use 'components/form-check';
 @use 'components/form-range';
 @use 'components/form-floating';
 @use 'components/input-group';
 @use 'components/validation';
-@use 'components/pagination';
 @use 'components/button-group';
-@use 'components/progress' as progress-component;
-@use 'components/spinner';
-@use 'components/placeholder';
 @use 'components/card';
-@use 'components/list-group';
 @use 'components/breadcrumb';
+@use 'components/pagination';
 @use 'components/badge';
+@use 'components/progress' as progress-component;
+@use 'components/list-group';
 @use 'components/close';
+@use 'components/spinner';
+@use 'components/placeholder';
+@use 'components/icon-link';
+@use 'components/ratio';
+@use 'components/vr';
 @use 'utilities/gap';
```

Resulting order matches the acceptance criterion exactly: forms (lines 55 to 62 unchanged), then
`button-group`, `card`, `breadcrumb`, `pagination`, `badge`, `progress` (as `progress-component`),
`list-group`, `close`, `spinner`, `placeholder`, `icon-link`, `ratio`, `vr`, `utilities/gap`.

## Added conformance case

Added to `describe('Bootstrap source order', ...)` in `tests/conformance.test.ts`, immediately
following the existing forms-order case:

```ts
// The release names the passive partials `spinners` and `placeholders`, plural forms Veneer
// writes from the singular `spinner` and `placeholder` stems, so this case maps them the way
// the forms case maps its own renamed partials. The passive block and the helpers both load
// after every forms partial, in the release's own sequence.
it('loads the passive block and the helpers in the release order, after every forms partial', () => {
	const stems: Readonly<Record<string, string>> = Object.freeze({
		spinners: 'spinner',
		placeholders: 'placeholder',
	})
	const passiveNames = new Set([
		'button-group',
		'card',
		'breadcrumb',
		'pagination',
		'badge',
		'progress',
		'list-group',
		'close',
		'spinners',
		'placeholders',
	])
	const bootstrapSource = readFileSync(
		resolve(dirname(BOOTSTRAP_MANIFEST_PATH), 'scss/bootstrap.scss'),
		'utf8',
	)
	const passive = [...bootstrapSource.matchAll(/@import "([\w-]+)";/gu)]
		.flatMap(([, name]) => (name === undefined || !passiveNames.has(name) ? [] : [name]))
		.map((name) => stems[name] ?? name)
	expect(passive).toEqual([
		'button-group',
		'card',
		'breadcrumb',
		'pagination',
		'badge',
		'progress',
		'list-group',
		'close',
		'spinner',
		'placeholder',
	])
	const helperNames = new Set(['icon-link', 'ratio', 'vr'])
	const helpersSource = readFileSync(
		resolve(dirname(BOOTSTRAP_MANIFEST_PATH), 'scss/_helpers.scss'),
		'utf8',
	)
	const helpers = [...helpersSource.matchAll(/@import "helpers\/([\w-]+)";/gu)].flatMap(
		([, name]) => (name === undefined || !helperNames.has(name) ? [] : [name]),
	)
	expect(helpers).toEqual(['icon-link', 'ratio', 'vr'])
	const loaded = [
		...readFileSync(resolve(WORKSPACE_ROOT, 'src/styles/index.scss'), 'utf8').matchAll(
			/^@use 'components\/([\w-]+)'/gmu,
		),
	].flatMap(([, name]) => (name === undefined ? [] : [name]))
	const validationAt = loaded.indexOf('validation')
	const afterForms = loaded.slice(validationAt + 1)
	const expected = [...passive, ...helpers]
	expect(afterForms.filter((name) => expected.includes(name))).toEqual(expected)
})
```

No new module-level helper or exported symbol was added: `stems`, `passiveNames`, `helperNames`,
`passive`, and `helpers` are local to the test body, following the same shape as the existing
forms-order case's inline `release` array.

### Negative control

Ran the added case, filtered by name, against the pre-reorder barrel at `87ff1d0` (restored the
committed `src/styles/index.scss`, ran, then restored the reordered file):

```
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project conformance \
  -t "loads the passive block and the helpers in the release order"
```

Result: `1 failed | 21 skipped (22)`, exit 1. The diff shows the pre-reorder barrel's landing
sequence (`pagination`, `button-group`, `progress`, `spinner`, `placeholder`, `card`, `list-group`,
`breadcrumb`, `badge`, `close`) against the expected release-ordered sequence — confirming the case
is a real negative control before the reorder lands.

After restoring the reordered `src/styles/index.scss`, the same filtered run passes (see the
`test:conformance` run following, which includes it as one of 22 passing tests).

## Guide moves (report-only; `guides/veneer.md` is shared, not edited by this unit)

The guide's `### <Key> classes` sections for the passive block, and `### Helper classes`, must
follow this new neighbour order (forms sections stay where they are; `### Helper classes` moves to
after `### Vr classes` at the end, and the passive sections move to follow the forms sections in
the barrel's new order):

- `### Button group classes` — after the last forms section (`### Validation classes` or
  equivalent), before `### Card classes`.
- `### Card classes` — after `### Button group classes`, before `### Breadcrumb classes`.
- `### Breadcrumb classes` — after `### Card classes`, before `### Pagination classes`.
- `### Pagination classes` — after `### Breadcrumb classes`, before `### Badge classes`.
- `### Badge classes` — after `### Pagination classes`, before `### Progress classes`.
- `### Progress classes` — after `### Badge classes`, before `### List group classes`.
- `### List group classes` — after `### Progress classes`, before `### Close classes`.
- `### Close classes` — after `### List group classes`, before `### Spinner classes`.
- `### Spinner classes` — after `### Close classes`, before `### Placeholder classes`.
- `### Placeholder classes` — after `### Spinner classes`, before `### Icon link classes` (or
  wherever the icon-link/ratio/vr sections currently sit; those three keep their own relative order
  and move to follow `### Placeholder classes`).
- `### Helper classes` — moves to the end of this run, after `### Vr classes` (or the last of the
  icon-link/ratio/vr trio), since the barrel now loads the passive block and then the helpers, both
  after the forms partials.

The `#### <key>` tables under `### Departures` must reorder to:

alphabetical older block (unchanged) → `is-invalid`, `is-valid`, `was-validated` (forms validation
keys, unchanged position) → `button-group` → `card` → `breadcrumb` → `pagination` → `badge` →
`progress` → `list-group` → `close` → `spinner` → `placeholder` → `icon-link` → `ratio` → `vr` →
`form`, `form-check`, `form-control`, `form-floating`, `form-select`, `input-group`,
`invalid-feedback`, `invalid-tooltip`, `valid-feedback`, `valid-tooltip` (remaining forms-family
keys, unchanged relative order).

Note: the brief's evidence lists the existing table order as ending in `pagination`, `placeholder`,
`progress`, `form-range`, `card`, `list-group`, `badge`, `breadcrumb`, `btn-close`, then the
remaining `form*` keys. The move above collects `pagination`, `card`, `breadcrumb`, `badge`,
`progress`, `list-group`, `btn-close` (the `close` component's key), `placeholder` into the new
passive-block order (`button-group`, `card`, `breadcrumb`, `pagination`, `badge`, `progress`,
`list-group`, `close`/`btn-close`, `spinner`, `placeholder`) followed by `icon-link`, `ratio`, `vr`,
then the remaining `form*` tables keep their existing relative order and position after that block.
`form-range` (currently interleaved) moves to sit with its own forms-family group rather than
between `placeholder` and `progress`, since it is a forms key, not a passive-block key. No `###
Files` row order dependency was found (see Order-reader measurement).

## Order-reader measurement (Unknown 1)

Searched `tests/setupServer.ts`, `tests/guides.test.ts`, and `tests/setupServer.test.ts` for
`Departures`, `####`, and `classes`:

- `tests/setupServer.ts`: no match combining those terms with any sort/order/index/position
  concept; `readDepartures` and related helpers key departures by their `Departure` column value,
  not by table position.
- `tests/guides.test.ts`: only one unrelated match (`'keeps behavioral interfaces and implementing
  classes in parity'`), no heading-order dependency.
- `tests/setupServer.test.ts`: matches are all `readDepartures`/`describeDeparture` calls and one
  unrelated `.classes` DOM assertion; none read table or section order.

Conclusion: no proof reads the guide's section or table order by position. Every reader is keyed by
heading or column name, so the guide move (owned by a later unit) is order-insensitive to any test
in this unit's scope.

## Resolved-reading measurement (Unknown 2)

Ran the scoped styles project over every passive and helper proof after the reorder:

```
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot \
  tests/src/styles/components/pagination.test.ts tests/src/styles/components/button-group.test.ts \
  tests/src/styles/components/progress.test.ts tests/src/styles/components/spinner.test.ts \
  tests/src/styles/components/placeholder.test.ts tests/src/styles/components/card.test.ts \
  tests/src/styles/components/list-group.test.ts tests/src/styles/components/breadcrumb.test.ts \
  tests/src/styles/components/badge.test.ts tests/src/styles/components/close.test.ts \
  tests/src/styles/components/icon-link.test.ts tests/src/styles/components/ratio.test.ts \
  tests/src/styles/components/vr.test.ts
```

Result: `Test Files 13 passed (13)`, `Tests 210 passed (210)`, exit 0. No specificity tie broke
under the reorder; no deviation.

## Digest observation

Built cascade digest (`sha256sum dist/src/styles/*.css`), before and after the reorder:

- Before (at `87ff1d0`, first `npm run build:src:styles`): `badeb54ac6cbb073007223a0116ecb770f6ab0a0cf75aebcf479a76770890e8d`
- After (reordered barrel): `56ea5ee0f9218bc840983561685b3c9537acb913c17e161c23443dc535811942`

The bytes differ, as expected from a rule-order change; this is an observation, not a criterion.

## Scoped gate exits

Baseline (at `87ff1d0`, before edits):

- `npm run build:src:styles` → exit 0
- `npm run test:conformance` → exit 0
- `npm run test:guides` → exit 0

After the reorder and the added case:

- `npm run format:check` → exit 0
- `npm run lint:check` → exit 0
- `npm run check` → exit 0
- `npm run build:src:styles` → exit 0
- `npm run test:conformance` → exit 0 (`Test Files 1 passed (1)`, `Tests 22 passed (22)`, including
  the added case)
- negative control (added case only, against the pre-reorder barrel, restored after) → exit 1 (red,
  as required)
- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
  tests/src/styles/components/{pagination,button-group,progress,spinner,placeholder,card,list-group,breadcrumb,badge,close,icon-link,ratio,vr}.test.ts`
  → exit 0 (`Test Files 13 passed (13)`, `Tests 210 passed (210)`)
- `npm run test:guides` → exit 0 (`Test Files 1 passed (1)`, `Tests 18 passed (18)`, unchanged
  guide)

## What this unit could not close

- The guide move itself: `guides/veneer.md` is shared (owned by the sibling CLOSE-GUIDE/B-PASSIVE-PROSE
  unit); this unit returns the move list above for a later builder unit to apply.
- The `#### form-range` table's exact final neighbour position: the brief's evidence names it as
  currently interleaved between `placeholder` and `progress`, and this report recommends it settle
  with its own forms-family group after the passive-block-plus-helpers run rather than inside it,
  but the applying unit should confirm against the guide's actual current table sequence at
  integration time, since this unit did not edit the guide and could not verify the `form-range`
  row's exact current position directly (the brief's evidence summary was the only source
  available for this row).
