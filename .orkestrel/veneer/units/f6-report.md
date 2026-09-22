# Unit F6 FOUNDATION — report

`opus` on Opus 5.5, worktree `/home/user/veneer-f6` at `07fc3c3`. Obligations 1, 2, 3, 4, 6, 7, and
8 are done. **Obligation 5 is not done**: adopting a `@orkestrel/contract` export inside `src/**`
needs a `package.json` change this unit does not own, and the evidence is under § Deviations.

## Obligation 1 — colour-mode islands (audit claim 5)

`ColorMode.apply` writes `data-bs-theme` with the applied mode for either mode. The constructor
captures `getAttribute(COLOR_MODE_ATTRIBUTE)` into `#original` (`string | null | undefined`), and
`destroy` writes that reading back — `removeAttribute` for `null` — then sets `#original` to
`undefined`, which releases the root so a later `destroy` writes nothing. The `#written` boolean is
gone; the third reading of `#original` is what tells a released controller from a live one, so no
second flag records "applied".

**Red, before the engine change.** The three new `ColorMode.test.ts` cases and the new
`theme.test.ts` island case, run against the old engine:

- `npm run test:src:browser` → `Tests 3 failed | 65 passed (68)`, the three failures being
  "writes the applied mode on a root nested inside a dark island", "restores the attribute value the
  root carried before construction", and "removes the attribute from a root that carried none before
  construction", each on `expect(root.getAttribute('data-bs-theme')).toBe('light')` receiving `null`.
- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/theme.test.ts`
  → `Tests 1 failed | 4 passed (5)`, the failure being "returns a nested island to the light closure
  when the controller applies light inside a dark island" on the light body colour after
  `apply('light')`.

**Green, after the engine change.** `npm run test:src:browser` → `Tests 68 passed (68)`; the same
scoped styles command → `Tests 6 passed (6)` (the matrix case had landed by then).

Cases rewritten because they pinned the removal contract, all in the owned
`tests/src/browser/ColorMode.test.ts`: "reads the root on every access, and puts the construction
reading back on destruction"; "toggles, persists, and writes the light attribute"; "restores stored
light over a preexisting dark attribute, and puts the dark back"; "restores its captured reading
over a later external write, and writes nothing after that".

Files: `src/browser/ColorMode.ts`, `src/browser/types.ts` (the `destroy` summary),
`tests/src/browser/ColorMode.test.ts`, `tests/src/styles/theme.test.ts`, `guides/veneer.md`
(§ Surface paragraph, § Methods `destroy` row).

## Obligation 2 — the role-token matrix (audit claim 10)

`tests/src/styles/theme.test.ts` case "resolves every role tier and the body tokens per island over
nested modes" mounts a light root, a dark island inside it, a light island inside that, and a
sibling outside every island, then reads each token as a resolved `color` on all four sites. The
token list is built from `TOKEN_NAMES.color` — every role, every tier but `rgb` — plus
`TOKEN_NAMES.text.body.base` and `TOKEN_NAMES.surface.body.base`; no literal role list. The two
nested light sites and the outside sibling must agree with the root on every token, and the dark
site must differ on every mode-dependent one. `base` is mode-independent for every role but
`primary`, which is the one fill `$dark` retunes, so the expectation is computed per row rather than
asserted flat.

**Mutation check.** Removing `data-bs-theme="light"` from the nested island in the fixture reddens
the case: `expected { token: '--vn-text-body-base', agrees: false } to deeply equal { …, agrees:
true }`. The mutation was reverted by restoring the file copy taken before it.

## Obligation 3 — no right-to-left support (D5, reviewer F2)

Removed: the `veneer-logical-rtl` plugin from `configs/src/vite.styles.config.ts` (the `plugins`
array is now `[outputBoundary('dist/src/styles')]`); the `index.rtl.css?raw` import and the case
"declares the same partitions in the right-to-left cascade" from `tests/src/styles/tokens.test.ts`;
the `index.rtl.css` assertion from `tests/setupStyles.test.ts`, whose case is now "requires the built
cascade from npm run build:src:styles". The guide's icon-shift bullet under § Helper classes lost
its "one byte stream serves either writing direction" clause and now records that Veneer ships one
cascade and no twin.

`npm run build:src` then `ls -1 dist/src/styles`:

```text
index.css
index.js
```

**Only one of the two named `setupStyles.test.ts` cases existed.** The brief's standing conditions
name "requires the directional outputs…" and "ships an RTL cascade that needs no flipping…"; the
second is already gone at `07fc3c3` (F5d removed it with the direction machinery).

**`grep -rn 'rtl' configs src tests guides` does not print nothing.** What remains, with its owner:

| Hit | Reading |
| --- | --- |
| `tests/setupServer.ts` `BOOTSTRAP_RTL_CSS_DIGEST`, `tests/conformance.test.ts` (the `bootstrap.rtl.css` digest), `tests/setupServer.test.ts` (the same digest in the inventory fixture) | The installed **Bootstrap** artifact's digest, not Veneer's twin. ROADMAP § Routing gives the RTL digest pin to F5b. Off-limits here. |
| `tests/fixtures/oracle/inventory.json` (`rtl` fields) | F5b's, per the same ROADMAP row. Off-limits here (`tests/fixtures/**`). |
| `tests/src/styles/components/grid.test.ts` and `tests/src/styles/components/table.test.ts`, each `dir="rtl"` in the markup | F5d's physical-property proofs: a physical declaration must not move under a right-to-left document. These assert D11, not a right-to-left cascade, and D11 tells this unit to touch no declaration for it. |
| `tests/setupServer.ts:800` and `guides/scaffold.md:1314` | Substring matches inside the word `partly`. |

## Obligation 4 — the delegate refusal (D4, reviewer F1)

`src/browser/Delegate.ts` lost the branch refusing `disabled`, `.disabled`, and
`aria-disabled="true"` hosts. The three refusal cases in `tests/src/browser/Delegate.test.ts` are
replaced by "acquires and toggles a native disabled host on a dispatched click", "keeps toggling a
host through its engine after the disabled class arrives", and "acquires and toggles an
aria-disabled anchor, and leaves the attribute alone". The guide carried **no** sentence describing
the refusal (`grep -n "refus\|aria-disabled" guides/veneer.md` reaches only a § Deferred selectors
sentence, a § Departures-from-the-workspace-rows sentence, and the § Compatibility row for
Bootstrap's own recorded `button.disabled.click` step), so § Surface gained the positive statement
instead.

The § Compatibility row "A disabled anchor carries disabled, aria-disabled="true", tabindex="-1",
and role="button"; pointer activation is refused" was read and left: `recordButtonOracle` in
`tests/setupServer.ts` drives the **official** Bootstrap bundle, so that row records Bootstrap's
behaviour and Veneer's engine is not in it.

**The journey suite's disabled steps are not falsified.** `tests/app/browser/integration.test.ts`
case "refuses a native disabled host and an aria-disabled anchor with the unreachable voice" (around
line 259) and case "answers each refused reading in the voice the installed resolver raises for it"
(around line 660) both assert `reading.clicks` is empty and read the refusal from the installed
resolver, which declines to drive a disabled host at all. No click reaches the delegate, so removing
its branch changes nothing there — and the journey run confirms it (both cases pass; see
§ Observations for the two that do fail, which are Obligation 1's).

## Obligation 5 — Contract guard reuse (NOT DONE)

The semantics match for two guards; the blocker is the dependency class, and it is under
§ Deviations with the exact patch the adoption needs.

| Symbol | Nearest Contract export | Ruling |
| --- | --- | --- |
| `isColorModeState` | `literalOf` (`node_modules/@orkestrel/contract/dist/src/core/index.d.ts`, the `literalOf` declarations; `Guard<Literals[number]>`) | Semantics match: `literalOf('light', 'dark')` is the same total guard under SameValueZero. **Blocked**, not adopted. |
| `isButtonHost` | `isInstance` (same file, the `isInstance` declaration) | Semantics match and it is strictly better: `isInstance` routes through `holds`, so the throwing-`getPrototypeOf` proxy the validators proof pins is contained without the local try/catch. **Blocked**, not adopted. |
| `isButtonEvent` | none | **Stays.** The declarations after `parseEnum` were read (`awk 'NR>4644'` over that file to its end at line 6653, listing every `export declare` name): the set adds parsers, shapes, and combinators, and no guard over a DOM event class or a `CustomEvent` payload. A doc `@remarks` sentence naming that now sits on the guard. |
| `isAppError` | none | **Stays.** The same read adds no error-class guard; `isContractError` and `isError` are the nearest and neither names `AppError`. Its file `src/core/errors.ts` is off-limits, so the doc sentence is a patch under § Patches. |

`grep -rn 'isColorModeState\|isButtonHost' src app tests` therefore still prints: the declarations
and doc examples in `src/browser/validators.ts`, the call sites in `src/browser/ColorMode.ts`,
`src/browser/Delegate.ts`, and `src/browser/Button.ts`, and the proof in
`tests/src/browser/validators.test.ts`. Acceptance criterion 8 reads on that basis.

## Obligation 6 — the guide's contracts

- **Layer order (claim 21).** The sentence now reads: the `src/styles/_tokens.scss` partial declares
  `@layer theme, reset, base, elements, components, utilities`, and the entry reaches that statement
  through the barrel's first `@use` rule. It lives under `## Showcase`, not under `## Tests`; see
  § Deviations.
- **Important utilities (claim 8, D6).** § Styles now states that every Bootstrap utility ships with
  Bootstrap's own `!important` and Veneer adds none; that two rules outside the class utilities carry
  one — the `[hidden]` rule in the `reset` layer and the calendar-picker indicator rule in the
  `elements` layer — each named; the Tailwind conflict rule; and the consumer escape as a `css`
  fence. The escape is executed by the new `tokens.test.ts` case "holds an important utility against
  an unlayered override and yields to one in its own layer". **The escape is not the one the brief
  dictates**; the measurement is under § Deviations.
- **Stripe (claim 11).** The `--vn-state-stripe` Source cell now reads
  `` `bootstrap` — retained `$table-striped-bg-factor` for the baseline; the Elements identity phase rules the value ``.
  The clause claiming no specimen has measured a row tint is gone. The Button percentages sentence is
  untouched, and the whole § Button states table was re-padded to the new column width.
- **Engine shape (claim 24).** § Surface gained a paragraph recording that `emitEvent` cannot express
  a cancelable event, that `bindEventMap` and `Delegate` are Button-shaped, and that the first
  component carrying a cancelable pre-change event generalizes all three.

## Obligation 7 — the shell, the caption, and the description list

- **Shell class.** `app/browser/styles/_shell.scss` styles `.control` instead of `header button`, and
  `Showcase` sets `this.#button.className = 'control'`. **No constant was added**: the brief's
  condition is "if a constant already carries the shell's class names", and none does — `BUTTON_GRID`
  carries the Button *section's* grid class. The change is proved by the existing case "paints one
  affordance on the mode control in both modes", which resolves the control by accessible name and
  asserts a non-zero border width; deleting the `className` line reddens exactly that case
  (`Tests 1 failed | 25 skipped (26)`), and the line was restored.
- **The `main` id.** `this.#main.id = 'main'` is gone. The Showcase proof now asserts
  `main.hasAttribute('id')` is `false`, reaches the element through `host.querySelector('main')`,
  and reads the region through `readName(region)` against `SHOWCASE_COPY.region`. After destruction
  it asserts `host.querySelector('main')` is null and `main.isConnected` is false, where it read
  `document.getElementById('main')` before.
- **Caption opt-out.** `src/styles/components/_table.scss` declares `.caption-bottom { caption-side:
  bottom; }` beside `.caption-top`, and `tests/src/styles/components/table.test.ts` gains "returns a
  caption to the bottom placement through the opt-out class", which reads the shipped top placement
  first so the case cannot pass on a bottom rule it wrote itself. Recorded in the guide under
  § Table classes rather than § Helper classes; see § Deviations. The § Additions row is under
  § Patches.
- **Description list.** `TEXT_DL_CASES`' `muted` field is now `description`, named for the element
  its colour is read on, with a `@remarks` sentence saying that each colour field names its element.
  `tests/src/styles/elements/dl.test.ts` destructures `description` and reads it on the `dd`, whose
  local is now `value`.

## Obligation 8 — the mirror sentence by path

`tests/setupPolicy.ts` was read, not edited: `testToPolicyStem` derives each module test's
extensionless workspace-relative stem, `stemToPolicyCandidates` resolves a leading-underscore
partial from it, and `inspectPolicyMirrorPaths` walks `POLICY_TEST_GLOB` requiring a module for each
test. The sweep runs **proof → partial**, so the guide now says: every proof under
`tests/src/styles/` names a partial at the same relative path under `src/styles/`, resolved through
that partial's leading underscore, enforced by `npm run test:policy`. No package instrument was
added. This is the opposite direction to the brief's wording; see § Deviations.

## Commands and exit codes

Every command ran from `/home/user/veneer-f6` with npm 11.19.1 on `PATH`.

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run test:src:browser` (before the engine change) | 1 | `Tests 3 failed \| 65 passed (68)` |
| `npx vitest run --config configs/src/vite.styles.config.ts … theme.test.ts` (before) | 1 | `Tests 1 failed \| 4 passed (5)` |
| `npm run build:src` | 0 | `dist/src/styles/` holds `index.css` and `index.js` |
| `npm run format:check` | 0 | `All matched files use the correct format.` (209 files) |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | root, `src:core`, `src:browser`, `src:styles`, `app:browser` projects |
| `npm run test:src:browser` | 0 | `Tests 68 passed (68)` |
| `npm run test:setup` | 0 | `Tests 123 passed (123)` |
| `npm run test:src:styles` | 0 | `Tests 415 passed (415)`, 58 files |
| `npm run test:app` | 0 | `Tests 26 passed (26)`, 10 files |
| `npm run test:policy` | 0 | `Tests 109 passed \| 1 skipped (110)` |
| `npm run test:conformance` | 0 | `Tests 11 passed (11)` |
| `npm run test:guides` | 0 | `Tests 18 passed (18)` |
| `npm run test:config` | 0 | `Tests 173 passed \| 1 skipped (174)` |
| `npm run test:journey` (alone) | 1 | `Tests 8 failed \| 80 passed \| 4 skipped (92)`; § Observations |
| `npm test` (the chain's last step) | 1 | `test:journey` alone reports `Tests 15 failed \| 73 passed \| 4 skipped (92)`; § Observations |

**Gate chain after the final edit.** `npm run format:check` → `npm run lint:check` → `npm run check`
→ `npm run build` ran in that order, after the last edit, each exiting 0. `npm test` ran last, after
the same last edit: `test:src` (`76 passed`), `test:src:styles` (`415 passed`), and `test:app`
(`26 passed`) all green, then `test:journey` fails the chain, so `npm test` exits 1. Criterion 4
(`test:setup`), 5 (`test:src:styles`), 6 (`test:app`), and 7 (`test:conformance`, `test:guides`,
`test:policy`) were each run separately after the final edit as the preceding table records.

## Tree state

`git status --porcelain` — owned files only:

```text
 M app/browser/Showcase.ts
 M app/browser/styles/_shell.scss
 M configs/src/vite.styles.config.ts
 M guides/veneer.md
 M src/browser/ColorMode.ts
 M src/browser/Delegate.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M src/styles/components/_table.scss
 M tests/app/browser/Showcase.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/browser/ColorMode.test.ts
 M tests/src/browser/Delegate.test.ts
 M tests/src/styles/components/table.test.ts
 M tests/src/styles/elements/dl.test.ts
 M tests/src/styles/theme.test.ts
 M tests/src/styles/tokens.test.ts
```

`git diff --stat`:

```text
 app/browser/Showcase.ts                   |   2 +-
 app/browser/styles/_shell.scss            |  16 ++---
 configs/src/vite.styles.config.ts         |  15 +----
 guides/veneer.md                          | 102 ++++++++++++++++++++++--------
 src/browser/ColorMode.ts                  |  25 ++++++--
 src/browser/Delegate.ts                   |   7 --
 src/browser/types.ts                      |   2 +-
 src/browser/validators.ts                 |   4 ++
 src/styles/components/_table.scss         |   7 ++
 tests/app/browser/Showcase.test.ts        |  23 +++++--
 tests/setupStyles.test.ts                 |   3 +-
 tests/setupStyles.ts                      |  11 +++-
 tests/src/browser/ColorMode.test.ts       |  55 ++++++++++++++--
 tests/src/browser/Delegate.test.ts        |  40 ++++++------
 tests/src/styles/components/table.test.ts |  15 +++++
 tests/src/styles/elements/dl.test.ts      |  10 +--
 tests/src/styles/theme.test.ts            |  74 ++++++++++++++++++++++
 tests/src/styles/tokens.test.ts           |  28 ++++----
 18 files changed, 322 insertions(+), 117 deletions(-)
```

No probe files were left: the two scratch probes ran inside owned test files and were reverted from
copies taken before each mutation; nothing was written under `tmp/probe/`.

## Deviations

### 1. Obligation 5 requires a `package.json` change this unit does not own

**Expected.** Replace `isColorModeState` and `isButtonHost` with `@orkestrel/contract` exports.

**Found.** `@orkestrel/contract` is declared in `devDependencies` alone; `package.json` declares no
`dependencies` and no `peerDependencies` block at all. `vite.config.ts`'s `srcBrowser` marks every
specifier starting with `@orkestrel/` external, so the import would survive into the published
`dist/src/browser/index.js` as a bare specifier a consumer must resolve, and a consumer installing
`@orkestrel/veneer` installs no such package. `tests/distribution.test.ts` case "ships only relative
or Orkestrel module specifiers [requires the registry]" permits an `@orkestrel/` specifier, so no
gate in this tree reddens: the break reaches the consumer. `package.json` is off-limits here, and
AGENTS bars adding a dependency the user did not request.

**Done or not done.** Not done. No `src/**` file imports `@orkestrel/contract`.

**Hypothesis.** The guard-reuse ruling was made against the installed capability without the
runtime-independence consequence; audit claim 1 (runtime independence) holds today because the
package ships no runtime dependency.

The adoption, if the user rules for it, is this patch plus the two guard bodies:

```json
	"dependencies": {
		"@orkestrel/contract": "^0.0.17"
	},
```

placed before `"devDependencies"`, with `"@orkestrel/contract": "^0.0.17"` removed from
`devDependencies`, and then in `src/browser/validators.ts`:

```ts
import { instanceOf, literalOf } from '@orkestrel/contract'
import type { Guard } from '@orkestrel/contract'

export const isColorModeState: Guard<ColorModeState> = literalOf('light', 'dark')
export const isButtonHost: Guard<HTMLElement> = instanceOf(HTMLElement)
```

**Unverified claim of mine:** I did not run that replacement, so the `Guard<…>` annotations above
are proposed rather than typechecked, and `instanceOf(HTMLElement)` evaluated at module scope reads
a DOM global at import time, which `isInstance(value, HTMLElement)` inside the function body would
not. A successor unit must decide between those two forms with a real typecheck.

### 2. Obligation 1 falsifies two journey cases in an off-limits file

**Expected.** No consumer pins the old removal.

**Found.** `tests/app/browser/integration.test.ts` (off-limits) pins it twice. Exact lines at
`07fc3c3` plus this unit's edits:

- line 189, in case "switches the announced and painted mode through the control":
  `expect(document.documentElement.hasAttribute('data-bs-theme')).toBe(false)` after the control is
  clicked back to light.
- lines 695–697, in `describe('matrix')` case "reads the settled background at every declared mode
  and viewport": `expect(document.documentElement.getAttribute('data-bs-theme')).toBe(variant.name.startsWith('dark-') ? 'dark' : null)`.

`npm run test:journey` → `Tests 8 failed | 80 passed | 4 skipped (92)`: those two cases, once per
variant. Patches under § Patches.

**Done or not done.** Obligation 1 is done; these two readings need the off-limits patch applied.

### 3. The important-utility escape the brief dictates does not work

**Expected.** The brief's § Obligation 6 wording: "a consumer overrides one with its own
`!important` declared later in the cascade **or in a later layer**".

**Found, measured.** A scratch probe in `tokens.test.ts` against the built cascade in Chromium 141
read `row-gap` on `.row-gap-1` after each consumer sheet, loaded unlayered into `document.head`
after the shipped cascade through `scene.load`:

```text
base 4px | later layer (@layer consumer) 4px | unlayered, higher specificity 4px
same layer (@layer utilities) 112px | earlier layer (@layer base) 128px
```

An unlayered `!important` loses, and so does one in a layer declared after `utilities`, because the
cascade reverses layer order for important declarations and sorts unlayered declarations last. The
escapes that work are the utility's own layer, later in source, and any earlier layer.

**Resolution taken.** The guide states what the code does — override from inside the utility's own
layer — and the executed proof is the same sheet. D6 itself says only "a consumer overrides one with
its own `!important`", which this satisfies. The probe was removed and the file restored from the
copy taken before it.

### 4. The mirror sweep runs the other way

**Expected.** The brief's § Obligation 8 wording: "one proof at the same relative path under
`tests/src/styles/` for every partial under `src/styles/`".

**Found.** `inspectPolicyMirrorPaths` in `tests/setupPolicy.ts` globs `POLICY_TEST_GLOB` and requires
a module for each **test**; nothing walks the partials to require a proof. A partial with no proof
passes `npm run test:policy`. The guide therefore states the direction the instrument proves. The
converse is unproved by any instrument in this tree, and a successor unit that wants it needs a new
one.

### 5. Scope decisions taken and recorded

- **`src/browser/types.ts` `destroy` summary.** The brief scopes that file to "a changed guard's
  type". Obligation 1 changes `destroy`'s contract, and `tests/guides.test.ts` case "keeps every
  compared summary and example equal to its source" compares the § Methods cell against the
  interface's TSDoc, so leaving it would have been both false and red. The summary is now "Restores
  the attribute the root carried at construction." in both places. No type was changed.
- **§ Methods.** Same reason: the `ColorModeInterface` `destroy` row is the other half of that
  parity pair, and the brief's owned list names § Surface but not § Methods.
- **Sentence locations.** The layer-order sentence lives under `## Showcase` and the mirror sentence
  under `## Styles` → `### Files`, not under `## Tests` as the brief's owned list says. Both were
  located by content and edited where they live.
- **Caption record placement.** The opt-out is recorded under § Table classes, beside "the caption
  class", rather than under § Helper classes, whose subject is the icon link, the ratio box, and the
  vertical rule.
- **Caption class name.** `.caption-bottom`, in Bootstrap's `.caption-top` family.
- **Shell class name.** `control`, set on the element rather than named by a constant, per the
  brief's own condition; adding `SHOWCASE_CONTROL` to `app/browser/constants.ts` also falsifies the
  export inventory in the off-limits `tests/app/browser/index.test.ts`, which was measured
  (`npm run test:app` red on that case) before the constant was withdrawn.
- **Renamed field.** `description`, for the `dd` the colour is read on.
- **Island colour proof placement.** The `src:browser` project loads no stylesheet (its `setupFiles`
  are `tests/setup.ts` and `tests/setupBrowser.ts`), so the colour half of the island proof cannot
  read the cascade there. `ColorMode.test.ts` carries the attribute contract and
  `tests/src/styles/theme.test.ts` — which loads the built cascade and can import `@src/browser` —
  carries the case that drives the real controller and reads the resolved colours.

### 6. A stale comment in an off-limits file

`src/styles/_theme.scss` says `:root` "carries the light closure too, which is the state the
color-mode engine leaves behind when it removes the attribute". The engine no longer removes it.
Patch under § Patches.

## Patches (report-only files)

### `tests/app/browser/integration.test.ts`

```diff
@@ case "switches the announced and painted mode through the control"
-		expect(document.documentElement.hasAttribute('data-bs-theme')).toBe(false)
+		expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light')
```

```diff
@@ describe('matrix'), case "reads the settled background at every declared mode and viewport"
-			expect(document.documentElement.getAttribute('data-bs-theme')).toBe(
-				variant.name.startsWith('dark-') ? 'dark' : null,
-			)
+			expect(document.documentElement.getAttribute('data-bs-theme') === 'dark').toBe(
+				variant.name.startsWith('dark-'),
+			)
```

The matrix patch reads the mode rather than the raw attribute on purpose: `applyTheme` clicks only
when the document's dark-ness already differs, so a light variant leaves `light` where a click
happened and no attribute where the document arrived clean, and both are the light mode.

### `src/styles/_theme.scss`

```diff
 	// The light selector and the dark selector are plain attribute selectors with no `:root`
 	// qualifier, so any element opens an island and a nested island returns its own subtree to its
-	// own mode. `:root` carries the light closure too, which is the state the color-mode engine
-	// leaves behind when it removes the attribute.
+	// own mode. `:root` carries the light closure too, which is the state a document is in before
+	// the color-mode engine has applied a mode to it.
```

### `src/core/errors.ts` — the retained-guard sentence Obligation 5 asks for

```diff
  * @param value - The value to inspect.
  * @returns True if the value is an instance of the application's error class; false otherwise.
+ * @remarks
+ * The class this narrows is this package's own, so no guard `@orkestrel/contract` publishes serves:
+ * its nearest class guards are `isContractError` and `isError`, and neither reaches `AppError`.
  * @example
```

### `guides/veneer.md` § Additions — F5b's ledger

§ Additions does not exist at `07fc3c3`; F5b lands it. The row `.caption-bottom` needs, in whatever
column set that table takes:

- **Name:** `.caption-bottom`
- **Layer:** `components`, in the table partial beside `.caption-top`
- **Reason:** Veneer's `elements` treatment places a caption above its table, so the family needs the
  opt-out that returns one caption to Bootstrap's bottom placement. Bootstrap needs none, because
  bottom is its own default.
- **Proof:** `tests/src/styles/components/table.test.ts`, case "returns a caption to the bottom
  placement through the opt-out class".

**Unverified claim of mine:** I did not see F5b's landed table, so the column names above are the
content rather than the shape.

### `ROADMAP.md`

No patch. D4's "no departure row" is satisfied, D5's F6 half is done, and the F6 row's landing
record belongs to the Orchestrator.

## Observations, not criteria

- **`npm test`** exits 1 solely on `test:journey`. Every other suite in the chain is green.
- **`npm run test:journey` run alone** → `Tests 8 failed | 80 passed | 4 skipped (92)`: the two cases
  of § Deviations 2, once per variant (`light-1280`, `dark-1280`, `light-390`, `dark-390`), each an
  assertion on the theme attribute. No timeout. The journey's disabled-host cases pass, which is the
  measurement behind Obligation 4's claim that the refusal removal does not reach them.
- **`test:journey` inside the `npm test` chain** → `Tests 15 failed | 73 passed | 4 skipped (92)`.
  The extra seven are timing, not assertions, and the deciding reading belongs to the Orchestrator's
  own re-run rather than to this unit's: "toggles a native host and an anchor host through the
  keyboard" (line 243) and "paints a focus ring on every variant reached through the keyboard"
  (line 310) each report `Test timed out in 15000ms`, and "expands unique filenames and places every
  registered state from a journey" (line 740) then reports the one portfolio frame the timed-out
  focus case never placed (`button-primary-focus`). The same suite run alone, minutes earlier on the
  same tree, timed out nowhere. This unit's own exec was resident throughout both runs.
- **`test:setup` needs a built `dist/src/core`.** Its first run here failed on
  `ENOENT … dist/src/core/index.js` because only `build:src:styles` had run; after `npm run build:src`
  it is green. That is a standing precondition of that suite, not a change of this unit's.
- The case "renders the resting section and a driven pressed state in both modes"
  (`tests/app/browser/integration.test.ts`, around line 539) carries the same
  `? 'dark' : null` shape as the matrix case and passed in all four variants, because the attribute
  happened to be absent when it requested light. It is order-dependent and worth the same patch.
