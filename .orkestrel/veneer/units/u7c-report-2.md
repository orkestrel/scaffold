<!-- Retained from veneer/tmp/units/u7c-report-2.md. Native lane: opus on Opus 5 (Agent dispatch, clean context), over Veneer 0cbb563 with the brief-1 result in the tree, 2026-09-21; brief u7c-brief-2.md. The fix round: findings 1 to 8 closed at their sites; every gate exit 0 on Chromium and Edge; deviations D1 (collectPainted over the rendered surface, the environment boundary refusing a static app import in tests/setupBrowser.ts) and D2 (three moved names renamed) settled in scope. -->

# Unit U7c — fix round report 2

Every finding is closed at its site and every gate in the brief's Execution item 2 exits 0 on
managed Chromium and on the `msedge` channel. Two findings moved further than the brief's wording
described, for a reason the tree forced; both are recorded under § Deviations. This report does not
repeat report 1.

## Findings as landed

### 1 — the ownership partition is read before destruction

`tests/app/browser/sections/ButtonSection.test.ts`. The case
`leaves a delegated host unowned and keeps an engine on every other host` is replaced by
`owns every plain host and leaves every delegated host to the delegation`.

- Both populations are derived at run time: `BUTTON_SPECIMENS.map((specimen) => resolveButton(host,
  specimen.name))`, partitioned by `element.matches(BUTTON_SELECTOR)`. No name is written by hand.
- The rendered partition is set beside the table's own declaration:
  `delegated.map(readName)` equals the specimen rows whose `attributes['data-bs-toggle']` is
  present. The rendered `matches` reading and the declared attribute are two mechanisms that can
  disagree.
- While the section is live, every plain host is probed with `new Button(element)` and the outcome
  recorded as `<name>: <code>`; the sweep asserts `<name>: BUTTON_HOST_OWNED` for each. Every
  delegated host is probed the same way, accepts its engine, and that engine is destroyed at once
  inside a `finally`. `Button`'s constructor captures the class and the `aria-pressed` attribute and
  `destroy()` restores both, so the probe leaves the markup where it started.
- The single-host refusal reading stays, so the code and the sentence
  `Button host already has a live owner` are still read off one error.
- The release proof after destruction stays in
  `releases every engine it owns on destruction, and leaves the authored markup alone`, now over
  every plain host derived the same way, and its closing assertion names each reclaimed host rather
  than counting the list.

**Red recorded (no plant in a tracked file).** A throwaway browser probe at
`tests/app/browser/sections/OwnershipProbe.test.ts` rendered the same specimen markup with no engine
bound at all — the defect the finding names, drawn from outside the committed population — and ran
both shapes over it:

```text
$ npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser \
    tests/app/browser/sections/OwnershipProbe.test.ts
 ✓ ownership control > passes the deleted reclaim-after-destruction shape over a section that owns nothing 4ms
 × ownership control > reddens under the partition assertion that replaced it 5ms
   → expected [ 'Primary: accepted', …(22) ] to strictly equal [ 'Primary: BUTTON_HOST_OWNED', …(22) ]
 Test Files  1 failed (1)
      Tests  1 failed | 1 passed (2)
```

The deleted shape passes over a section that owns nothing; the replacement reddens and names every
plain host. The probe file was deleted after the reading; `git status` at return carries no trace of
it.

### 2 — the self-comparison is deleted and the fixture's exclusion set is asserted

`tests/app/browser/integration.test.ts`. The line
`expect(skipped).toStrictEqual(EXCLUDED.filter((name) => expected.includes(name)))` is gone. Each
oracle case now opens with `expect(ORACLE_EXCLUDED).toStrictEqual([])`, and each closes with
`expect(comparison.compared).toStrictEqual(ORACLE_ACTIONS.map(…))`, so a recording that gains an
exclusion reddens where the regenerating unit rules on it rather than being passed over.

**The old line cannot red, which is the finding.** Recorded rather than demonstrated by a plant: a
throwaway Node probe at `tmp/probe/exclusion.test.ts` evaluated the deleted expression pair over the
empty set, a member of `expected`, a mixed set, a member outside `expected`, and the whole of
`expected`. Both sides agreed on every one:

```text
$ npm run test:probe
 ✓ the deleted self-comparison > agrees with itself for every exclusion set, so it cannot report one 2ms
 ✓ the deleted self-comparison > reddens under the assertion that replaced it as soon as the recording excludes a step 1ms
 Test Files  1 passed (1)
      Tests  2 passed (2)
```

`expected.filter((name) => excluded.includes(name))` and
`excluded.filter((name) => expected.includes(name))` are the same intersection written twice, so no
input separates them. The probe was deleted after the reading.

### 3 — the dark focus ring sweeps every painted specimen

`tests/app/browser/integration.test.ts`. `paints a focus ring in dark mode too` becomes
`paints one focus ring on every variant in dark mode as well` and mirrors the light sweep: tab
traversal over the whole painted population, `unfocused` empty, the traversed elements equal to the
population, `rings.size` equal to the population, the `Primary` ratio a number greater than 1, and
`[...new Set(rings.values())]` equal to `[primary]` — which is where the dark value is pinned once.
The `button-primary-focus-dark` frame is still placed at `Primary` while focus is held.

Both sweeps also gained `expect(traversed).toStrictEqual([...painted])`: tab traversal in document
order reaches exactly the painted buttons, which the key-set assertion it replaces could not say.

### 4 — the case matrices and the oracle driver moved to the setup files

Nothing declared at module scope in `tests/app/browser/integration.test.ts` is a function or a case
matrix any more. Moved and exported:

| Was, in the journey            | Now                                         | Proved in                   |
| ------------------------------ | ------------------------------------------- | --------------------------- |
| `BUTTON_STATES`                | `tests/setup.ts` `BUTTON_STATES`            | `tests/setup.test.ts`       |
| `STATES`                       | `tests/setup.ts` `PORTFOLIO_STATES`         | `tests/setup.test.ts`       |
| `CONTRAST_BAR`                 | `tests/setup.ts` `CONTRAST_BAR`             | `tests/setup.test.ts`       |
| `DISABLED_OPACITY`             | `tests/setup.ts` `DISABLED_OPACITY`         | `tests/setup.test.ts`       |
| `UNDER_BAR`                    | `tests/setup.ts` `UNDER_BAR`                | `tests/setup.test.ts`       |
| `PAINTED`                      | `tests/setupBrowser.ts` `collectPainted`    | `tests/setupBrowser.test.ts` |
| `ORACLE_ACTIONS`               | `tests/setupBrowser.ts` `ORACLE_ACTIONS`    | `tests/setupBrowser.test.ts` |
| `EXCLUDED`                     | `tests/setupBrowser.ts` `ORACLE_EXCLUDED`   | `tests/setupBrowser.test.ts` |
| `driveOracle(prefix)`          | `tests/setupBrowser.ts` `driveOracle(root, prefix)` | `tests/setupBrowser.test.ts` |
| `compareOracle`, data half     | `tests/setupBrowser.ts` `buildOracleComparison` + the `OracleComparison` interface | `tests/setupBrowser.test.ts` |
| `compareOracle`, `expect` half | the two oracle cases in the journey         | —                           |

`STATES` moved because acceptance criterion 2 bars an unexported case matrix and `STATES` is the
portfolio's own table; it is renamed `PORTFOLIO_STATES` for the consumer that reads it.
`EXCLUDED` moved because `buildOracleComparison` needs it, and is renamed `ORACLE_EXCLUDED` to pair
with `ORACLE_ACTIONS` once it is a workspace name. No `setup*.ts` gained an `expect` call.

`driveOracle` now takes the root it drives instead of closing over the journey's `mounted` binding.
`buildOracleComparison` returns `expected`, `carried`, `skipped`, `compared`, `driven`, and
`recorded`; each list names its steps, and the two projection lists are what the caller asserts
equal. The `PLANT-PROJECT` control from report 1 still reddens through it, because the projection
comparison is unchanged in substance.

Export-set assertions updated in the same step:

- `tests/setup.test.ts` now asserts `BUTTON_STATES`, `CONTRAST_BAR`, `DISABLED_OPACITY`,
  `PORTFOLIO_STATES`, `TOKEN_PREFIX`, `UNDER_BAR`, `collectTokenNodes`, `normalizeSelectorText`,
  `readingToProjection`.
- `tests/setupBrowser.test.ts` now asserts `BUTTON_CLASS`, `ORACLE_ACTIONS`, `ORACLE_EXCLUDED`,
  `PROBE_CASCADE`, `SpecimenManager`, `applyTheme`, `buildOracleComparison`, `collectLayer`,
  `collectNestedRules`, `collectPainted`, `collectScopeProperties`, `driveOracle`, `mountShowcase`,
  `readCascadeSheet`, `recordListeners`, `recordState`, `resolveButton`, `specimens`.

New proofs, each asserting a property a second mechanism can disagree with rather than re-deriving
the source:

- `tests/setup.test.ts`: `BUTTON_STATES` members match the `button-primary-<state>` form, carry no
  hand-written dark twin, and repeat none; `PORTFOLIO_STATES` repeats none, gives every light state
  a dark twin, and its light half equals `home` plus `BUTTON_STATES`; `CONTRAST_BAR` is the ratio
  body text is read at and `DISABLED_OPACITY` parses between 0 and 1; `UNDER_BAR` repeats no key,
  is already in the order a sorted reading arrives in, names only the light and dark modes, and
  every key carries three fields.
- `tests/setupBrowser.test.ts`: `collectPainted` keeps exactly the rendered buttons the specimen
  table declares without a disabled attribute, drops exactly the ones that carry one, returns
  nothing for a root holding no button, and its result announces no disabled state; `ORACLE_ACTIONS`
  equals the recording's ordinary step names in the recording's order, repeats no action, and every
  name it drives resolves to the host kind it names (`Toggle: button`, `Pressed: button`,
  `Disabled: a`); `ORACLE_EXCLUDED` equals the recording's own `excluded` reading; `driveOracle`
  produces every step key and the readings the drive must leave; `buildOracleComparison` agrees
  step for step with the recording, reports an absent step as a disagreement rather than passing
  over it, and selects the recording's reduced half under the reduced marker.

### 5 — the journey teardown is failure-independent

`tests/app/browser/integration.test.ts`, the `afterEach` hook. Each release runs whatever the step
before it did, the mount cleanup runs whatever the releases did, the theme attribute is always
removed, and the collected refusals are raised together as an `AggregateError` at the end. A
rejected `releasePointer` or `releaseMedia` can no longer leave the mounted showcase, the delegate,
or the staged media behind for the next case.

### 6 — the entity subfolder holds class files only

`app/browser/sections/index.ts` is deleted. `app/browser/index.ts` exports
`./sections/ButtonSection.js` directly, so `app/browser/sections/` holds `ButtonSection.ts` alone.
The app barrel's runtime export set is unchanged, and `tests/app/browser/index.test.ts` named no
deleted file, so it is untouched. No file anywhere names `sections/index`.

### 7 — the resolver is named for the population it searches

`tests/setupBrowser.ts`. `resolveSpecimen(root, name)` becomes `resolveButton(root, name)` and the
hardcoded selector is lifted to the exported `BUTTON_CLASS` constant beside it, which the body reads
as `.${BUTTON_CLASS}`. The refusal sentences follow the name:
`No button in the root announces the accessible name "<name>"` and
`The "<name>" button is not an HTML element`. Every call site is updated —
`tests/app/browser/integration.test.ts`, `tests/app/browser/sections/ButtonSection.test.ts`,
`tests/setupBrowser.test.ts` — and the two remaining `'.btn'` literals in owned test files
(`tests/app/browser/Showcase.test.ts`, `tests/app/browser/sections/ButtonSection.test.ts`) read the
constant instead, so the constant's claim about the population holds across the workspace.

A new setup proof pins what the name now promises:
`bounds the search by the button class rather than by the elements a root holds`. The showcase's
mode control is a reachable `button` element that announces its own name and carries no button
class, so a resolver searching every element would return it; `resolveButton(mounted.host, 'Dark
mode')` refuses it, and `resolveButton(mounted.host, 'Primary')` returns a host carrying
`BUTTON_CLASS`.

### 8 — the bundle reader is named for what it carries

`tests/distribution.test.ts`.

- `readBrowserExports` → `readBundleSubject`, and its `published` field → `subject`. Its comment now
  states that the meaning of the list is the drive's: the `exports` drive leaves the entry's key set
  there and the `engine` drive leaves its readings.
- `isNames` → `isStringList`, which is what it admits. Both call sites follow, and the bundle
  reader's refusal reads `The bundled drive left no string list`.
- The export case still calls the same reader with the `exports` drive and passes the reading into
  `checkSurface` as `published: subject`, with a comment stating why that reading is a published
  name set at that site. `Surface.published` keeps its name, because there it is one.

Both cases through the renamed reader ran green from the packed archive:

```text
✓ installed entry ./browser > drives the published button engine and its delegation in a real browser [requires the registry] 233ms
✓ installed entry ./browser > publishes what it declares to a real browser, and no more [requires a browser] 598ms
✓ installed package consumer > loads standalone styles with the declared cascade order [requires the registry] 333ms
```

## Deviations

Both are recorded under `.agents/orchestration.md` § Deviation protocol as choices settled inside
the owned scope, not as stops. Neither changed a finding's intent.

**D1 — `PAINTED` became a helper over the rendered surface rather than a table in a setup file.**

- Expected: `PAINTED` moves to `tests/setupBrowser.ts` as an exported table filtered from
  `BUTTON_SPECIMENS`, per finding 4.
- Found: that placement is unreachable. `tests/setupBrowser.ts` is a setup file for the
  `src:browser` and `src:styles` projects as well as the application's, and those projects register
  `environmentBoundary('src/browser')`, whose `transform` hook refuses any `app/**` module in the
  graph. A static `@app/browser` import there failed every `src:browser` suite:

  ```text
  $ npm run test:src:browser
  [vite] Internal server error: Published modules cannot depend on private application modules
    Plugin: orkestrel-environment-boundary
    File: C:/Users/mikes/WebstormProjects/veneer/app/browser/index.ts
   Test Files  6 failed | 2 passed (8)
  ```

  The existing `mountShowcase` reaches the app through a dynamic import inside the function body,
  which those projects never evaluate; a module-scope table cannot do that. `tests/setup.ts` is
  worse: it is host-independent and loads in the Node projects.
- Done: `collectPainted(root)` returns every rendered button in `root` announcing no disabled
  state, in document order. The journey's focus sweeps and contrast sweep read the population off
  the mounted section. The setup proof sets that reading beside the specimen table's own attribute
  declaration, which is the drift check the table placement would have given up anyway, and the
  journey gained `expect(traversed).toStrictEqual([...painted])`, which the table could not support.
- Hypothesis: the boundary plugin is deliberate and the table has no legal home in a shared setup
  module, so the rendered reading is the only placement that satisfies both the finding and the
  workspace's own environment law.

**D2 — three moved names were renamed as they became workspace names.** `STATES` →
`PORTFOLIO_STATES`, `EXCLUDED` → `ORACLE_EXCLUDED`, `PAINTED` → `collectPainted`. A journey-local
name that reads clearly beside its use reads as nothing once it is an export a workspace imports.
`CONTRAST_BAR`, `UNDER_BAR`, `DISABLED_OPACITY`, `BUTTON_STATES`, and `ORACLE_ACTIONS` kept their
names: each is self-describing or sits beside the constant that completes it. This sits inside the
deviation contract's "names within the prefix table" clause.

## Scope rulings

Recorded so the audit can check them rather than rediscover them.

- **Acceptance criterion 2 is read against the journey file, where the finding sits.** No owned test
  file declares a module-scope function. The module-scope constants left in
  `tests/app/browser/integration.test.ts` are `VARIANT`, `VARIANTS`, `CAPTURE` (the project's own
  injections), `FAMILIES`, `LIGHT`, `DARK` (derived from those injections), `PROVEN`, `PLACED`,
  `ARTIFACT` (accumulators one run fills), `PORTFOLIO`, `JOURNAL` (instruments bound to the run),
  and the `mounted` binding. None is a case matrix, and an injection cannot be read from a setup
  module every project loads.
- **`TOGGLED` and `RESTING` stay in `tests/setup.test.ts`.** The reduction they exercise is the
  subject of that proof, so moving them into `tests/setup.ts` would have the module supply the data
  it is being judged on. The file's own comment already records that reasoning.
- **`tests/distribution.test.ts`'s other module-scope helpers are outside this round.** No lane
  found them, brief 2 names only the reader, its field, and the guard, and relocating a proof of
  that size is a different unit.

## Gates

Run in the brief's order, each to completion. Managed Chromium unless the row names Edge.

| Command                                     | Exit | Final lines                                                       |
| ------------------------------------------- | ---- | ----------------------------------------------------------------- |
| `npm run format:check`                      | 0    | `All matched files use the correct format.` / 96 files            |
| `npm run lint:check`                        | 0    | no output                                                          |
| `npm run check`                             | 0    | no diagnostics from `tsc` or `vue-tsc`                             |
| `npm run build`                             | 0    | `✓ built in 373ms` (app browser, last target)                      |
| `npm run test:setup`                        | 0    | `Test Files  3 passed (3)` / `Tests  120 passed (120)`             |
| `npm run test:setup:browser`                | 0    | `Test Files  1 passed (1)` / `Tests  27 passed (27)`               |
| `npm run test:app:browser`                  | 0    | `Test Files  3 passed (3)` / `Tests  10 passed (10)`               |
| `npm run test:journey`                      | 0    | `Test Files  4 passed (4)` / `Tests  80 passed \| 4 skipped (84)`  |
| `CAPTURE=1 npm run test:journey`            | 0    | `Test Files  4 passed (4)` / `Tests  84 passed (84)`               |
| `npm run test:distribution`                 | 0    | `Test Files  1 passed (1)` / `Tests  12 passed \| 4 skipped (16)`  |
| `npm run test:guides`                       | 0    | `Test Files  1 passed (1)` / `Tests  18 passed (18)`               |
| `npm test`                                  | 0    | every project green (per-project rows following)                   |
| `PLAYWRIGHT_CHANNEL=msedge npm run test:journey`      | 0 | `Test Files  4 passed (4)` / `Tests  80 passed \| 4 skipped (84)` |
| `PLAYWRIGHT_CHANNEL=msedge npm run test:app:browser`  | 0 | `Test Files  3 passed (3)` / `Tests  10 passed (10)`             |
| `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`| 0 | `Test Files  1 passed (1)` / `Tests  27 passed (27)`             |

`npm test` per project: `src` 51 passed; `src:styles` 104 passed; `app` 10 passed; `journey` 80
passed and 4 skipped; `policy` 109 passed and 1 skipped; `config` 173 passed and 1 skipped; `setup`
120 passed; `setup:browser` 27 passed; `conformance` 8 passed; `guides` 18 passed.

The skips are unchanged from report 1 and are `runIf` misses, not refusals: the journey's
`it.runIf(CAPTURE)` membership proof, one per variant project, which the `CAPTURE=1` row runs; and
the distribution root entry's browser drives with the `./browser` entry's Node drives.

The `CAPTURE=1` run wrote 48 frames under `tmp/capture/states`, which is the registered state list
across the registered variants, unchanged from report 1.

## Tree at return

```text
$ git diff --stat
 app/browser/Showcase.ts               |  19 +-
 app/browser/constants.ts              | 225 +++++++++++++++++++
 app/browser/index.ts                  |   1 +
 app/browser/main.ts                   |   6 +
 app/browser/styles/_shell.scss        |  10 +
 app/browser/types.ts                  |  26 +++
 tests/app/browser/Showcase.test.ts    |  39 +++-
 tests/app/browser/index.test.ts       |  13 +-
 tests/app/browser/integration.test.ts | 401 +++++++++++++++++++++++++++++++++-
 tests/distribution.test.ts            | 115 ++++++++--
 tests/setup.test.ts                   | 146 ++++++++++++-
 tests/setup.ts                        | 166 ++++++++++++++
 tests/setupBrowser.test.ts            | 241 +++++++++++++++++++-
 tests/setupBrowser.ts                 | 315 +++++++++++++++++++++++++-
 14 files changed, 1670 insertions(+), 53 deletions(-)

$ git status --porcelain --untracked-files=all
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M app/browser/main.ts
 M app/browser/styles/_shell.scss
 M app/browser/types.ts
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 M tests/distribution.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
?? app/browser/sections/ButtonSection.ts
?? tests/app/browser/sections/ButtonSection.test.ts
```

`app/browser/sections/index.ts` is gone from the untracked set because finding 6 deleted it before
it was ever committed. `src/**`, `guides/**`, `package.json`, `configs/**`, the vendored files, and
every off-limits test file are untouched. `tmp/` is ignored, so the two reports and the swept probes
appear in neither listing.

## Acceptance criteria

1. **Met.** Findings 1 to 8 are closed at the sites named earlier, each with the case or assertion
   that pins it.
2. **Met** for every owned test file, under the reading in § Scope rulings: no owned test file
   declares a module-scope function, and every case matrix the journey held is an export with a
   proof.
3. **Met.** `app/browser/sections/` holds `ButtonSection.ts` alone and `app/browser/index.ts`
   exports it.
4. **Met.** Every gate in Execution item 2 exits 0 on managed Chromium and on Edge.
5. **Met.** `git status --porcelain --untracked-files=all` lists the owned set alone.

## Bounds for U7e

Report 1's guide bounds stand unchanged. This round adds none: no mechanism a guide sentence
describes moved, and every change is inside the test layer or the app barrel's export path, whose
published surface is unchanged.
