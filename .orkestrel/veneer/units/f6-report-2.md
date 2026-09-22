# Unit F6 FOUNDATION — report 2 (the fix round)

Brief: `tmp/units/f6-brief-2.md`. Worktree `/home/user/veneer-f6`, detached at `07fc3c3` plus the
F6 unit's writes and the Orchestrator's three integration patches, all kept. Executor: `opus` on
Opus (`claude-opus-5`), native subagent, no sub-dispatch. Nothing committed, installed, or pushed;
`package-lock.json` untouched. Date: 2026-09-22.

Every gate the brief names exits 0, including `npm test` end to end.

## Per item: what changed, with the file

### Obligation 5 — Contract guard adoption

- `package.json` — `@orkestrel/contract` moved from `devDependencies` into a `dependencies`
  block this change adds, at the same caret `^0.0.17`, placed before `devDependencies`.
- `src/browser/validators.ts` — `isColorModeState` reads
  `export const isColorModeState: Guard<ColorModeState> = literalOf('light', 'dark')`;
  `isButtonHost` returns `isInstance(value, HTMLElement)` and its `try`/`catch` is gone. Each
  doc block keeps its summary, `@param`, `@returns`, and `@example`, and each gains a `@remarks`
  naming the Contract export it routes through. `isButtonEvent` keeps its own body — see
  § Ancillary decisions.
- `src/core/errors.ts` — `isAppError` returns `isInstance(value, AppError)` and its
  `try`/`catch` is gone. The `@remarks` sentence claiming no Contract export serves is replaced by
  one naming `isInstance` and stating why the class is passed as an argument rather than bound
  through `instanceOf`.
- `guides/veneer.md` — the § Surface table's `isColorModeState` row reads `const` rather than
  `function`, because the declaration is a const. Required by the guide-parity proof: the
  compared symbol key carries the keyword.
- `tests/src/browser/validators.test.ts`, `tests/src/core/errors.test.ts` — unchanged. Every case
  that pins a behaviour still runs, including the throwing-`getPrototypeOf` proxy
  (`validators.test.ts`, case "accepts HTML elements and rejects foreign shapes and hostile
  prototypes") and the revoked proxy (`errors.test.ts`, case "refuses native errors, coded objects,
  absent values, and hostile prototypes"). No case pinning the factory was added.

### The `.disabled`-first delegate case

- `tests/src/browser/Delegate.test.ts` — one case added: "acquires and toggles a host already
  carrying the disabled class, and restores it". It builds the host with `classes: 'disabled'`
  before the delegate exists, so the class is present when the acquisition branch first runs. It
  asserts acquisition (`defaultPrevented`, `active`, `aria-pressed="true"`, and
  `new Button(host)` throwing `BUTTON_HOST_OWNED`), toggling back, and restoration
  (`aria-pressed` gone, `active` gone, `disabled` kept).

### The order-dependent theme-attribute readings

- `tests/setupBrowser.test.ts` — in the case "drives dark and light variants and leaves the
  requested mode applied on repetition", the `hasAttribute('data-bs-theme')` assertions after
  `applyTheme('light-390')` and `applyTheme('light-1280')` become
  `getAttribute('data-bs-theme') === 'dark'` is `false`. No `'light'` pin: `applyTheme` clicks only
  when the document's dark-ness differs from the requested one, so a document that carried no
  attribute at entry still carries none after a light request.
- `tests/app/browser/integration.test.ts` — in the case "renders the resting section and a driven
  pressed state in both modes", the section reading becomes
  `expect(getAttribute('data-bs-theme') === 'dark').toBe(mode === DARK)`, the same shape as the
  matrix patch.

### Reviewer findings F1 to F4

- F1 — `app/browser/constants.ts` declares `SHOWCASE_CONTROL = 'control'` beside `BUTTON_GRID` in
  the same doc form; `app/browser/Showcase.ts` sets `this.#button.className = SHOWCASE_CONTROL` and
  imports it; `tests/app/browser/index.test.ts` carries the export inventory row in sorted place.
- F2 — `tests/setupStyles.ts`: the `TEXT_DL_CASES` remark states the fact and drops the
  generalization. `tests/src/styles/elements/dl.test.ts`: the element local is named `dd`.
- F3 and analyst claim 6 — the sentence naming `src/styles/_tokens.scss` and its `@layer`
  declaration moved from § Showcase into § Styles, as its own paragraph ahead of the
  important-utility paragraph. § Showcase keeps the rest of that paragraph, which opens on the
  cascade's contents. § Tests gains one pointer: "Those proofs resolve declarations against the
  cascade's layer order; § Styles states that order and names the partial that declares it."
- Claim 11 — the § Styles important-utility paragraph recasts "Two rules outside the class
  utilities carry one as well, each matching …" as "Outside the class utilities, the `[hidden]`
  rule in the `reset` layer and the calendar-picker indicator rule in the `elements` layer carry
  one as well, each matching …". The § Surface engine paragraph replaces "All three" with the three
  names and "generalizes the three together" with "B-COLLAPSE is the unit that generalizes them,
  because Collapse is the first component carrying a cancelable pre-change event."
- F4 — the § Compatibility preamble names the actor: each Obligation cell states what Bootstrap's
  own recorded engine does, no cell states what Veneer's engine does, and the disabled-anchor
  accessibility row is named as the place the recorded engine and Veneer's delegate diverge. The
  obligation cell text is unchanged, because `scanOracleObligation` matches it by exact string
  equality — see § Referral answered.

### Analyst claim 3 and claim 8 guide prose

- Claim 3 — the § Helper classes departure bullet "The shift's direction is physical" loses its
  closing sentence "Bootstrap ships a second stylesheet that reverses it; Veneer ships one cascade
  and no such twin." `grep -in "rtl|twin|revers"` over `guides/veneer.md` returns only the
  cascade-reversal sentence about important declarations (line 153), the `.h1`–`.h6` "class twin"
  row (line 898), and Bootstrap's `isRTL` engine utility row (line 1088). None describes a
  reversing stylesheet Veneer ships.
- Claim 8 — the § Files mirror sentence reads: "Every module test under `tests/src/styles/`
  other than `integration.test.ts` names a source module at the same relative path under
  `src/styles/`, a leading-underscore partial resolved, which `npm run test:policy` enforces". It
  no longer claims every partial has a proof, and no longer says the proof names a partial.

## The guard form and the typecheck reading behind it

Each candidate form was measured rather than argued.

| Guard              | Form chosen                                             | Why that form                                                  |
| ------------------ | -------------------------------------------------------- | -------------------------------------------------------------- |
| `isColorModeState` | `const … : Guard<ColorModeState> = literalOf('light','dark')` | `validators.ts` is a data-kind file, and the call reads no host global |
| `isButtonHost`     | `function … { return isInstance(value, HTMLElement) }`   | keeps the DOM-class read lazy; the configured form breaks a Node import |
| `isAppError`       | `function … { return isInstance(value, AppError) }`      | `errors.ts` is not a data-kind file, so a module-scope binding is barred |

**`instanceOf(HTMLElement)` at module scope typechecks.** Measured by swapping
`export const isButtonHost: Guard<HTMLElement> = instanceOf(HTMLElement)` into the file and running
`npm run check` over every project that loads `src/browser/validators.ts`. The only diagnostic was
`src/browser/validators.ts(3,22): error TS6133: 'isInstance' is declared but its value is never
read`, the unused import, and no diagnostic about the declaration itself. The form was then
reverted from a copy.

**The reason to reject it is runtime, not the typecheck.** In Node, `typeof HTMLElement` is
`undefined`, and a module that evaluates `instanceOf(HTMLElement)` at module scope dies on import:

```text
$ node tmp/probe/module-scope-guard.mjs
literalOf at module scope = true false
isInstance lazy = true false
ReferenceError: HTMLElement is not defined
    at file:///home/user/veneer-f6/tmp/probe/module-scope-guard.mjs:5:34
EXIT=1
```

That matters here because Node really does import the built browser face. Before any edit:

```text
$ node tmp/probe/node-import.mjs     # await import('@orkestrel/veneer/browser')
typeof HTMLElement = undefined
keys = BUTTON_ACTIVE,…,isButtonEvent,isButtonHost,isColorModeState
EXIT=0
```

`tests/guides.test.ts` performs that import, and the distribution proof's `installed entry .`
Node cases import the core face. The same probe re-run after the build still exits 0, so the
`isInstance` form preserves the reading. `literalOf` is safe at module scope because it closes over
literals rather than a host global, which the same probe shows.

**Why `isAppError` is not a const.** `configs/policy.ts` `DATA_SOURCE_FILES` lists the files whose
module-scope value declarations `policy/no-misplaced-data` permits: `combinators.ts`,
`constants.ts`, `contracts.ts`, `relations.ts`, `routes.ts`, `schemas.ts`, `shapers.ts`,
`templates.ts`, `validators.ts`. `errors.ts` is not among them, so
`export const isAppError = instanceOf(AppError)` there is a lint failure. `errors.ts` is in
`FUNCTION_SOURCE_FILES`, so the function form is its permitted shape. `isInstance(value, AppError)`
is the same primitive configured with the same class; only the call site differs.

## Ancillary decisions taken and recorded

1. **`isButtonEvent` keeps `value instanceof CustomEvent`.** I first routed it through
   `isInstance(value, CustomEvent)` in the same pass, on the ground that a contained `instanceof`
   sitting in a file whose other guards route through the primitive is the same duplication
   the round found.
   `npm run check` refused it:
   `src/browser/validators.ts(60,33): error TS2339: Property 'detail' does not exist on type
   'object'.` `isInstance` returns `value is InstanceType<C & AnyConstructor<object>>`, which
   collapses to `object` for a generic constructor such as `CustomEvent`, dropping the payload this
   guard goes on to read. I reverted the body and recorded the measured reason in its `@remarks`.
   The guard is outside the brief's Scope and outside acceptance criterion 7's grep set, so this
   leaves nothing owed.
2. **Guide sentence wording** within each ruling, and the added case's title, were settled here as the
   deviation contract allows.
3. **The § Showcase paragraph that lost its opening sentence** keeps its remaining sentences under
   § Showcase; only the layer-order sentence moved, as F3 directs.

## The unknown the brief named — answered

**The distribution proof reads the manifest's `dependencies` for the packed closure, in the default
mode, not only under `--mode release`.** Measured by running the proof with the dependency put back
under `devDependencies` and then restored:

```text
# @orkestrel/contract under devDependencies
Tests  6 failed | 7 passed | 4 skipped (17)
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@orkestrel/contract' imported from
  /tmp/distribution-XgWmHX/consumer/node_modules/@orkestrel/veneer/dist/src/core/index.js

# @orkestrel/contract under dependencies
Tests  13 passed | 4 skipped (17)
```

That is the failing-first proof for the manifest half of obligation 5: the packed archive installed
into the throwaway consumer resolves a runtime dependency and not a development one. I did not run
`--mode release`; the brief bars installing, and the default mode already answers the question.

The specifier case is green either way: "ships only relative or Orkestrel module specifiers"
passed in both runs, so the bare `@orkestrel/contract` specifier surviving into
`dist/src/core/index.js` and `dist/src/browser/index.js` is permitted, as the brief states.

## The red-then-green pairs

**Claim 9, the gate the round reddened.** The Orchestrator's gate log recorded
`test:setup:browser exit=1`. Reproduced here by replanting the removed contract's assertion, then
restored:

```text
# with expect(hasAttribute('data-bs-theme')).toBe(false)
$ npm run test:setup:browser   → Tests 1 failed | 44 passed (45), exit 1
  AssertionError: expected true to be false
# with expect(getAttribute('data-bs-theme') === 'dark').toBe(false)
$ npm run test:setup:browser   → Tests 45 passed (45), exit 0
```

**The `.disabled`-first case binds to the defect it names.** The mutation that must make it fail is
a refusal inside the acquisition branch keyed on the class:
`if (host.classList.contains('disabled')) return` placed before `new Button(host)` in
`Delegate.#activate`. Planted in `src/browser/Delegate.ts`, run, then restored from a copy taken
first (`diff` reports the file identical afterwards):

```text
$ vitest run --project src:browser tests/src/browser/Delegate.test.ts
 ✓ Delegate > acquires and toggles a native disabled host on a dispatched click
 ✓ Delegate > keeps toggling a host through its engine after the disabled class arrives
 × Delegate > acquires and toggles a host already carrying the disabled class, and restores it
   → expected false to be true
 Tests  1 failed | 15 passed (16)
```

The added case is the only one that reddens. The pre-existing class case stays green, which is
the coverage gap the analyst named: it acquires an enabled host and adds the class afterwards, so
the acquisition branch never reads the class. The assertions distinguish the mutation from the
passing case: with the refusal, `active` and `aria-pressed` are never written and
`new Button(host)` does not throw `BUTTON_HOST_OWNED`.

**The guard adoption carries no red-first test,** and I flag that as a limit rather than claim one.
The defect the round found is structural — a hand-rolled primitive and a false rationale — and the
guards' observable behaviour is identical before and after. The behavioural evidence is that every
pinned case, including the hostile-prototype and revoked-proxy ones, stays green across the swap.
The red-first proof available for that obligation is the manifest counterfactual recorded
earlier.

## Commands run, with exit codes

| Command                       | Exit | Reading                                        |
| ----------------------------- | ---- | ---------------------------------------------- |
| `npm run check` (baseline)    | 0    | before any edit                                |
| `npm run format:check`        | 0    | "All matched files use the correct format", 209 files |
| `npm run lint:check`          | 0    | no output                                      |
| `npm run check`               | 0    | root, `src:core`, `src:browser`, `src:styles`, `app:browser` |
| `npm run test:src:core`       | 0    | Tests 8 passed (8)                             |
| `npm run test:src:browser`    | 0    | Tests 69 passed (69)                           |
| `npm run test:src:styles`     | 0    | Tests 415 passed (415)                         |
| `npm run test:app`            | 0    | Tests 26 passed (26)                           |
| `npm run test:journey`        | 0    | Tests 88 passed, 4 skipped (92)                |
| `npm run test:setup`          | 0    | Tests 123 passed (123)                         |
| `npm run test:setup:browser`  | 0    | Tests 45 passed (45)                           |
| `npm run test:config`         | 0    | Tests 173 passed, 1 skipped (174)              |
| `npm run test:policy`         | 0    | Tests 109 passed, 1 skipped (110)              |
| `npm run test:conformance`    | 0    | Tests 11 passed (11)                           |
| `npm run test:guides`         | 0    | Tests 18 passed (18)                           |
| `npm run build`               | 0    | `dist/src/{core,browser,styles}` and `dist/app/browser` |
| `npm run test:distribution`   | 0    | Tests 13 passed, 4 skipped (17)                |
| `npm test`                    | 0    | whole chain, every project green               |

`format:check`, `lint:check`, `check`, `test:policy`, and `test:guides` were re-run after the last
guide edit and all exit 0.

The host needs `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` exported for every browser project; the
brief named Chromium's location but not that variable.

## Acceptance criteria

1. `format:check`, `lint:check`, `check` — all exit 0. **Met.**
2. `test:src:core` and `test:src:browser` exit 0; the validators, errors, and Delegate proofs are
   green and the `.disabled`-first case is present and named in the verbose listing at
   `tests/src/browser/Delegate.test.ts:181`. **Met.**
3. `test:setup:browser` exits 0. **Met.**
4. `test:app` and `test:journey` exit 0. **Met.**
5. `build` exits 0, and `test:distribution` exits 0 with "ships only relative or Orkestrel module
   specifiers" green. **Met.**
6. `test:guides` and `test:policy` exit 0. **Met.**
7. `grep -rn 'isColorModeState\|isButtonHost\|isAppError' src` — each of the three is defined
   through a Contract export (`literalOf` at `validators.ts:19`, `isInstance` at
   `validators.ts:36` and `errors.ts:52`), and none carries a local `instanceof` or literal
   membership check. **Met.** The remaining `instanceof` sites in `src` are `Delegate.ts:58`
   (narrowing an event target), `Button.ts:41` (reading a tag name for a diagnostic), and
   `validators.ts:59` (`isButtonEvent`, per § Ancillary decisions) — none of them one of the three
   guards.
8. `git status --porcelain` lists the F6 files plus the owned files and nothing else. **Met.** The
   names this unit added to the list it inherited are `app/browser/constants.ts`,
   `package.json`, `tests/app/browser/index.test.ts`, and `tests/setupBrowser.test.ts`. `package-lock.json` and
   `ROADMAP.md` are absent, and `tmp/probe/` is deleted.
9. `test:setup:browser` exits 0, and
   `grep -n "Two rules\|All three\|the three together" guides/veneer.md` prints nothing
   (grep exit 1). **Met.**

## Referral answered: `scanOracleObligation` does not keyword-match

`tests/setupServer.ts` selects the binding by exact string equality on the obligation:

```ts
	const binding =
		matched.find((candidate) => candidate.obligation === row.obligation) ??
		matched.find((candidate) => candidate.obligation === undefined)
	if (binding === undefined) return `${label}: obligation has no oracle predicate`
```

The disabled-anchor obligation is carried verbatim in `ORACLE_BINDINGS` at `tests/setupServer.ts:159`.
Editing the Obligation cell would therefore have broken the match, and `tests/setupServer.ts` is
off-limits. Per F4's own instruction I changed the preamble only. `npm run test:conformance` exits
0 with the preamble change in place.

## `git status --porcelain`

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/styles/_shell.scss
 M configs/src/vite.styles.config.ts
 M guides/veneer.md
 M package.json
 M src/browser/ColorMode.ts
 M src/browser/Delegate.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M src/core/errors.ts
 M src/styles/_theme.scss
 M src/styles/components/_table.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/browser/ColorMode.test.ts
 M tests/src/browser/Delegate.test.ts
 M tests/src/styles/components/table.test.ts
 M tests/src/styles/elements/dl.test.ts
 M tests/src/styles/theme.test.ts
 M tests/src/styles/tokens.test.ts
```

## `git diff --stat`

```text
 app/browser/Showcase.ts                   |   4 +-
 app/browser/constants.ts                  |   3 +
 app/browser/styles/_shell.scss            |  16 ++---
 configs/src/vite.styles.config.ts         |  15 +---
 guides/veneer.md                          | 113 ++++++++++++++++++++++--------
 package.json                              |   4 +-
 src/browser/ColorMode.ts                  |  25 +++++--
 src/browser/Delegate.ts                   |   7 --
 src/browser/types.ts                      |   2 +-
 src/browser/validators.ts                 |  27 ++++---
 src/core/errors.ts                        |  13 ++--
 src/styles/_theme.scss                    |   4 +-
 src/styles/components/_table.scss         |   7 ++
 tests/app/browser/Showcase.test.ts        |  23 ++++--
 tests/app/browser/index.test.ts           |   1 +
 tests/app/browser/integration.test.ts     |  10 ++-
 tests/setupBrowser.test.ts                |   4 +-
 tests/setupStyles.test.ts                 |   3 +-
 tests/setupStyles.ts                      |  10 ++-
 tests/src/browser/ColorMode.test.ts       |  55 +++++++++++++--
 tests/src/browser/Delegate.test.ts        |  64 ++++++++++++-----
 tests/src/styles/components/table.test.ts |  15 ++++
 tests/src/styles/elements/dl.test.ts      |  10 +--
 tests/src/styles/theme.test.ts            |  74 +++++++++++++++++++
 tests/src/styles/tokens.test.ts           |  28 ++++----
 25 files changed, 395 insertions(+), 142 deletions(-)
```

The files this unit touched are `package.json`, `src/browser/validators.ts`, `src/core/errors.ts`,
`app/browser/constants.ts`, `app/browser/Showcase.ts`, `guides/veneer.md`,
`tests/src/browser/Delegate.test.ts`, `tests/setupBrowser.test.ts`,
`tests/app/browser/integration.test.ts`, `tests/app/browser/index.test.ts`, `tests/setupStyles.ts`,
and `tests/src/styles/elements/dl.test.ts`. Every other dirty file carries the first F6 run's writes
or an Orchestrator integration patch, unchanged here.

## Deviations

None. No stop condition fired: no Contract guard's semantics diverged from the guard it replaced
(every pinned case stayed green), the distribution proof accepted the specifier, and every gate
reached green inside the owned files.

## Claims of mine I flag as unverified

1. **`npm run test:distribution -- --mode release` is unrun.** The release mode is the publish gate
   and installs; the brief bars installing, and the default mode answered its question. Whether
   release mode adds a reading over the dependency move is unknown to me.
2. **The `npm install` the Orchestrator runs next is unmeasured here.** `package-lock.json` still
   records `@orkestrel/contract` as a root development dependency. Every gate reported here ran
   against that disagreement, because none of them reads the lockfile. I did not verify that the
   install produces a lockfile the gates still pass against.
3. **The lint judgment on `@param` and `@returns` over a const declaration rests on the run, not on
   a rule I read.** `npm run lint:check` exits 0 with those tags on
   `export const isColorModeState`, and I did not find a policy rule that reads them. If one exists
   and is off by default here, it would fire elsewhere.
4. **The `[hidden]` and calendar-picker rules named in the recast important-utility paragraph are
   the ones the original sentence named.** I recast the sentence; I did not re-derive the rule set
   from the built cascade.
5. **B-COLLAPSE as the generalizing unit is taken from `ROADMAP.md:375`**, which assigns
   `emitEvent`, `bindEventMap`, and `Delegate` to it. I did not check that the roadmap row is
   itself current.
