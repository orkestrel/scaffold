# Unit V-lloyds — `lloyds` visit — report

The visit is done, with two gates red and reported. `npx scaffold audit` exits `0`, every
`@orkestrel/*` range equals the catalog's version with a caret, `npm ls @orkestrel/test` reads
`0.0.12`, and `format:check`, `lint:check`, and `build` are green. `npm run check` exits `2` with
396 type errors and `npm test` exits `1` on the vendored `policy` project's single assertion. Both
reds are lloyds' own pre-existing state, newly measured by the floor `tsconfig.json` and the floor
`tests/policy.test.ts` the overwrite installed. Neither is repairable inside this unit's scope: the
repairs change product type contracts, product rating data, and product module structure.

Baseline `315ba62` on `main`, unchanged. Nothing committed, staged, stashed, restored, or reset.
The lockfile pair is exactly as found: `D  package-lock.json` staged, `?? package-lock.json`
untracked and rewritten in place by `npm install`.

## Acceptance

1. **`npx scaffold audit` exits `0` after the overwrite** — met. Both remaining lines recorded with
   their owner.
2. **Every `@orkestrel/*` range equals the catalog with a caret; `npm ls @orkestrel/test` reads
   `0.0.12`** — met.
3. **The gate chain is green, read bare, or every red is reported with its excerpt and owner** —
   met on the second branch. `check` and `test` are red; each red is recorded with its excerpt and
   owner.

## Deviation: the overwrite refused twice before it ran

`npx scaffold overwrite` (no flag) exited `1`:

```text
TARGET: The configs group is blocked because the manifest at . does not reach Vitest projects the
planned configuration registers: app:core, config, policy. No chain from test or prepublishOnly
invokes them. test:app:core is already declared, so the gate is missing rather than the script:
invoke it by name from the test or prepublishOnly chain. test:config, test:policy are not declared,
so the script is missing as well as the gate: declare each of them and invoke each of them by name
from the test or prepublishOnly chain. Exclude configs from --groups to write another group. The
manifest at . does not declare planned dependencies: @orkestrel/guide, @orkestrel/html. The configs
and tests groups are blocked. Add these exact dependency lines to dependencies or devDependencies
in package.json: "@orkestrel/guide": "^0.0.15", "@orkestrel/html": "^0.0.7", Add the dependency
before selecting configs or tests, or exclude those groups from --groups.
OVERWRITE_EXIT=1
```

The probe evidence anticipated the dependency half (`probe-drift-report.md` § Lloyds §5: "Missing
planned deps could still block `configs`+`tests`") and predicted no project refusal, because
`#projectQuestion` sees only `--project app:browser` in the manifest. The project half fired anyway:
the floor `vite.config.ts` registers `app:core`, `config`, `policy`, and `probe`, and lloyds'
`test:app:core` reached its project through `--config configs/app/vite.core.config.ts` with no
`--project` token, so no chain named `app:core`, `config`, or `policy`.

I resolved both rather than stopping, on terrain's precedent: each refusal is a precondition of step
2 itself and names its own remedy verbatim. Both remedies land in `package.json`, an owned file.

- **Dependencies.** Wrote the exact lines the refusal quoted. `npm view @orkestrel/guide version` →
  `0.0.15` and `npm view @orkestrel/html version` → `0.0.7`, matching the catalog. Placement follows
  terrain: `devDependencies`.
- **Scripts.** Took the planned values for `test:app:core` and `test:app:browser`, declared
  `test:policy`, `test:config`, `test:probe`, and `test:bench` at the planned values the audit
  quoted, and extended the `test` chain to
  `npm run test:app && npm run test:policy && npm run test:config`. The resulting script set is
  byte-identical in shape to terrain's.

**Which value I took for `test:app:browser`.** The brief let me keep the author string or take the
planned value. **I took the planned value**: one `vitest run --config vite.config.ts --no-cache
--reporter=dot --project app:browser`. The floor's `app:browser` include covers every path the three
serial invocations named, and the suite proves it — 24 files / 247 tests pass under the single run,
against 24 files at baseline. `test:app:core` took the planned value on the same terms.

The second run, `npx scaffold overwrite`, then refused for uncommitted work:

```text
TARGET: The target at . carries 3 uncommitted changes. Commit them, or pass --dirty to waive the
refusal.
OVERWRITE_EXIT=1
```

The three are the user's `D  package-lock.json` and `?? package-lock.json`, plus my own
`M package.json` precondition edit. Before waiving I proved no deletion candidate was uncommitted:
`git ls-files --error-unmatch` matched all seven `.claude/agents/*.md` paths, `git status --porcelain
-- .claude/agents/` returned nothing, and `git check-ignore` exited `1` on them. `--dirty` therefore
destroyed no uncommitted work.

## The read-only audit, in full

`npx scaffold audit` before any write, exit `1`.

```text
scripts: The manifest at . does not declare planned scripts: test:policy, test:config, test:probe, test:bench. [...] The manifest at . declares planned scripts with differing values: test:app:core, test:app:browser. [...]
projects: the manifest at . does not reach Vitest projects the planned configuration registers: app:core, config, policy. [...]
dependencies: The manifest at . does not declare planned dependencies: @orkestrel/guide, @orkestrel/html. [...]
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupBrowser.ts. [...]
dependencies: @types/node declares the floor ^26.1.1, while the registry serves 26.4.1 within major 26.
dependencies: @vitest/browser-playwright declares the floor ^4.1.10, while the registry serves 4.1.11 within major 4.
dependencies: oxfmt declares the floor ^0.59.0, while the registry serves 0.66.0 within major 0.
dependencies: oxlint declares the floor ^1.74.0, while the registry serves 1.81.0 within major 1.
dependencies: playwright declares the floor ^1.61.1, while the registry serves 1.62.1 within major 1.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vite declares the floor ^8.1.5, while the registry serves 8.2.2 within major 8.
dependencies: vitest declares the floor ^4.1.10, while the registry serves 4.1.11 within major 4.
dependencies: vue declares the floor ^3.5.40, while the registry serves 3.5.42 within major 3.
dependencies: vue-tsc declares the floor ^3.3.7, while the registry serves 3.3.11 within major 3.
```

Drift table: `23 of 41 planned paths drifted from the plan. Audit compared bytes at 14, existence at
16, and nothing at 11. The plan does not own 7 further paths beneath its groups.`

- `stale`: `tsconfig.json`, `vite.config.ts`, `configs/app/tsconfig.core.json`,
  `configs/app/vite.browser.config.ts`, `configs/app/tsconfig.browser.json`,
  `configs/app/vite.showcase.config.ts`, `.oxlintrc.json`, `.prettierignore`, `AGENTS.md`,
  `CLAUDE.md`
- `missing`: `configs/browsers.ts`, `configs/helpers.ts`, `configs/policy.ts`,
  `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `LICENSE`,
  `.claude/settings.json`, `scripts/deps.sh`, `scripts/cursor.sh`, `scripts/codex.sh`,
  `scripts/ollama.sh`, `.claude/agents/orkestrel.md`
- `foreign`: `.claude/agents/builder.md`, `checker.md`, `planner.md`, `researcher.md`,
  `reviewer.md`, `scout.md`, `verifier.md` — exactly the set the probe predicted

Range findings: the 11 runtime `differs from` lines in the range table that follows.

## The overwrite

`npx scaffold overwrite --dirty`, exit `0`.

```text
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupBrowser.ts. [...]
0 of 41 planned paths drifted from the plan. Audit compared bytes at 26, existence at 4, and nothing at 11.
tsconfig.json replaced (4 lines added).
vite.config.ts replaced (81 lines removed).
configs/app/tsconfig.core.json replaced (10 lines added).
configs/app/vite.browser.config.ts replaced (0-line delta).
configs/app/tsconfig.browser.json replaced (17 lines added).
configs/app/vite.showcase.config.ts replaced (0-line delta).
.oxlintrc.json replaced (330 lines added).
.prettierignore replaced (9 lines added).
AGENTS.md replaced (907 lines removed).
CLAUDE.md replaced (373 lines removed).
41 written, 18 unchanged, 7 removed in ..
50 published, 16 guides fetched, 0 no longer listed.
```

Files written, from `git status --porcelain` taken immediately after: `tsconfig.json`,
`vite.config.ts`, `configs/app/tsconfig.core.json`, `configs/app/tsconfig.browser.json`,
`configs/app/vite.browser.config.ts`, `configs/app/vite.showcase.config.ts`, `.oxlintrc.json`,
`.prettierignore`, `AGENTS.md`, `CLAUDE.md`, `package.json`, and the guide mirrors
`guides/contract.md`, `guides/csv.md`, `guides/database.md`, `guides/emitter.md`, `guides/guide.md`,
`guides/indexeddb.md`, `guides/interpret.md`, `guides/program.md`, `guides/qualifier.md`,
`guides/rater.md`, `guides/reason.md`, `guides/relation.md`, `guides/scaffold.md`. New files:
`.claude/agents/orkestrel.md`, `.claude/settings.json`, `LICENSE`, `configs/browsers.ts`,
`configs/helpers.ts`, `configs/policy.ts`, `guides/html.md`, `guides/probe.md`, `guides/test.md`,
`scripts/` (`deps.sh`, `cursor.sh`, `codex.sh`, `ollama.sh`), `tests/config.test.ts`,
`tests/policy.test.ts`, `tests/setupPolicy.ts`.

**The deletion proof.** I sorted the deletion set from `git status --porcelain` and the `foreign`
set from the read-only audit and compared them with `comm`. Both `comm -23` and `comm -13` returned
nothing, so the sets are identical: the overwrite removed exactly the seven foreign agent files and
nothing outside the audited plan.

## The closing audit

`npx scaffold audit` after the overwrite, exit `0`. Every line, with its owner:

```text
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupBrowser.ts. Add tests/setup.test.ts, tests/setupBrowser.test.ts, each covering the module of the same name. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
0 of 41 planned paths drifted from the plan. Audit compared bytes at 26, existence at 4, and nothing at 11.
```

- The `setup` line asks for `tests/setup.test.ts` and `tests/setupBrowser.test.ts`. Scaffold refuses
  to write them because their subject is behaviour only this workspace can assert, so writing them
  is new product-level coverage. **Owner: lloyds.**
- The `typescript` major line is the "a newer major is never crossed for you" question.
  **Owner: lloyds, on a decision.**

I re-ran this audit as the final action after every repair and after the last `format`. It still
exits `0`, and the vendored bytes still match the digests I took right after the overwrite —
`tests/policy.test.ts`, `tests/config.test.ts`, `tests/setupPolicy.ts`, `configs/policy.ts`,
`configs/helpers.ts`, `configs/browsers.ts`, `vite.config.ts`, `tsconfig.json`, `.oxlintrc.json` all
verify with `sha256sum -c`.

## Ranges before and after

Runtime `dependencies`:

| Package | Before | After | Catalog | Registry |
| --- | --- | --- | --- | --- |
| `@orkestrel/contract` | `^0.0.6` | `^0.0.15` | `0.0.15` | `0.0.15` |
| `@orkestrel/csv` | `^0.0.1` | `^0.0.5` | `0.0.5` | `0.0.5` |
| `@orkestrel/database` | `^0.0.5` | `^0.0.12` | `0.0.12` | `0.0.12` |
| `@orkestrel/emitter` | `^0.0.3` | `^0.0.8` | `0.0.8` | `0.0.8` |
| `@orkestrel/indexeddb` | `^0.0.4` | `^0.0.9` | `0.0.9` | `0.0.9` |
| `@orkestrel/interpret` | `^0.0.5` | `^0.0.11` | `0.0.11` | `0.0.11` |
| `@orkestrel/program` | `^0.0.3` | `^0.0.11` | `0.0.11` | `0.0.11` |
| `@orkestrel/qualifier` | `^0.0.4` | `^0.0.12` | `0.0.12` | `0.0.12` |
| `@orkestrel/rater` | `^0.0.5` | `^0.0.12` | `0.0.12` | `0.0.12` |
| `@orkestrel/reason` | `^0.0.3` | `^0.0.8` | `0.0.8` | `0.0.8` |
| `@orkestrel/relation` | `^0.0.3` | `^0.0.10` | `0.0.10` | `0.0.10` |

Development `devDependencies`:

| Package | Before | After | Catalog | Registry |
| --- | --- | --- | --- | --- |
| `@orkestrel/guide` | absent | `^0.0.15` | `0.0.15` | `0.0.15` |
| `@orkestrel/html` | absent | `^0.0.7` | `0.0.7` | `0.0.7` |
| `@orkestrel/probe` | `^0.0.11` | `^0.0.11` | `0.0.11` | `0.0.11` |
| `@orkestrel/scaffold` | `^0.0.60` | `^0.0.60` | `0.0.59` | `0.0.60` |
| `@orkestrel/test` | `^0.0.12` | `^0.0.12` | `0.0.12` | `0.0.12` |

Every `@orkestrel/*` range equals a caret over what the registry serves. The overwrite's own
`declare` step wrote every runtime row; `guide` and `html` came from the refusal remedy.

**One catalog row is stale, and the manifest is ahead of it.** The catalog table in
`.claude/agents/orkestrel.md` lists `@orkestrel/scaffold 0.0.59`; `npm view @orkestrel/scaffold
version` returns `0.0.60`, and the target declares `^0.0.60`. I took the registry's answer, which
the launch brief confirmed. **Owner: the Orchestrator**, as one `scaffold catalog` regeneration.

The overwrite also raised the foreign toolchain floors: `@types/node` `^26.1.1` → `^26.4.1`,
`@vitest/browser-playwright` `^4.1.10` → `^4.1.11`, `oxfmt` `^0.59.0` → `^0.66.0`, `oxlint`
`^1.74.0` → `^1.81.0`, `playwright` `^1.61.1` → `^1.62.1`, `vite` `^8.1.5` → `^8.2.2`, `vitest`
`^4.1.10` → `^4.1.11`, `vue` `^3.5.40` → `^3.5.42`, `vue-tsc` `^3.3.7` → `^3.3.11`. It left
`typescript` on major 6.

## The installed readings

`npm ls @orkestrel/test @orkestrel/contract` exits `0`. The relevant rows:

```text
lloyds@0.0.0 C:\Users\mikes\WebstormProjects\lloyds
+-- @orkestrel/contract@0.0.15
`-- @orkestrel/test@0.0.12
```

Every published dependent carries a nested `@orkestrel/contract@0.0.13` beside the root `0.0.15`,
the same graph terrain reported. `@orkestrel/scaffold@0.0.60` dedupes onto the root `0.0.15`.

## The gate chain

Each gate run bare, in order, on the final tree, after one mutating `npm run lint` and one
`npm run format` as the converge step.

| Gate | Exit | Summary |
| --- | --- | --- |
| `npm run format:check` | `0` | `All matched files use the correct format.` — 214 files |
| `npm run lint:check` | `0` | no diagnostics |
| `npm run check` | `2` | 396 `tsc` errors — reported in full later |
| `npm run build` | `0` | `✓ built in 2.07s`, 202 modules |
| `npm test` | `1` | app:core 23 files / 481 passed; app:browser 24 files / 247 passed; policy 1 failed / 110 passed |

`npm run test:config` run alone exits `0` at 46 passed. The `test` chain stops at the failed
`policy` project, so `config` does not run inside `npm test`.

lloyds declared neither `format:check` nor `lint:check`, so the brief's step 5 had no script to
read. I added both, mirroring terrain verbatim:
`"format:check": "oxfmt --config .oxfmtrc.json --check ."` and
`"lint:check": "oxlint --config .oxlintrc.json --deny-warnings ."`. I left the existing mutating
`lint` unchanged, so it still runs without `--deny-warnings` — a difference from terrain worth a
ruling.

The build reports a chunk-size advisory over the 1,385.76 kB bundle. It is a notice, `BUILD_EXIT=0`,
and it predates this visit.

## Repair 1: `policy/no-nested-functions`, and the rest of the floor lint set

**The red.** The overwrite installed `configs/policy.ts` and an `.oxlintrc.json` 330 lines larger
than lloyds' own. lloyds is a pre-scaffold consumer, so the floor brought far more than the one new
rule. Command: `npm run lint:check`.

```text
LINTCHECK_EXIT=1
grep -c ': error '                              -> 120
typescript(consistent-type-imports)             -> 62
policy(no-nested-functions)                     -> 28
typescript(array-type)                          -> 24
typescript(consistent-type-assertions)          -> 3
vitest(no-alias-methods)                        -> 2
import(no-unassigned-import)                    -> 1
```

No vendored file appears in that set, so the brief's stop case did not fire.

**The converge step.** `npm run lint`, the repository's own mutating `oxlint --fix` script, took 120
to 32 and moved no vendored byte: `sha256sum -c` verified all nine vendored digests after the run.
It closed every `consistent-type-imports`, `array-type`, and `no-alias-methods` diagnostic
mechanically.

**Passing count after the fix.** Same command:

```text
LINTCHECK_EXIT=0
grep -c 'policy(no-nested-functions)'           -> 0
grep -c ': error '                              -> 0
```

**What the rule permits.** I read `configs/policy.ts` rather than inferring from the message.
`reportNested` exempts a function with no function ancestor, method syntax, an anonymous function
passed directly as a call argument, and an anonymous function returned directly.
`hasPolicyFunctionAncestor` stops at a class boundary, so a class field initializer is outside a
function body. Those exemptions decided every repair.

**The 28 nested-function repairs, by shape.**

*Class field initializers, where a stable reference is required.* `Schedule` registered three table
forwarders with `on` and handed the same references back to `off`; building them in the constructor
nested them in a function body. All three moved to field initializers, one stable reference per
instance. `ScheduleStore` did the same with one forwarder across three events: the closure became
the `#reload` field and the stored `#teardown` closure became a `#teardown()` method reading
`this.#schedule`. The class doc comment was corrected to describe the new mechanism.

*Abort signals, where listeners only needed matching removal.* `useMedia` and `useDragDrop` held
named listeners solely so `onUnmounted` could pass the same references to `removeEventListener`.
Each now registers its listeners as direct anonymous callbacks with an `AbortController` signal and
aborts on unmount. Both files were byte-identical to terrain's pre-repair versions, so both took
terrain's repaired file verbatim.

*Object method syntax, where functions sit in an object literal.* `BuildingTable.vue` built a
pending edit with arrow properties; a property position is not a direct argument position. Method
shorthand is exempt and closes over `timer`, `key`, `building`, `field`, and `event` identically.
The `perform` ternary folded into a script-level `apply` routing the two sequence fields to
`renumber` and every other field to `commit`, which is what the ternary already decided.

*A bound method reference, where a wrapper only forwarded.* `ApplicationController` adapted its
transport with an arrow forwarding to `resolve`. The method's signature matches the transport
handler exactly, so a bound method reference performs the same adaptation with no wrapper.

*Extraction to exported centralized leaves, where the logic is real.*

| New export | File | Replaced |
| --- | --- | --- |
| `readEpoch` | `app/core/helpers.ts` (new) | the stopped-clock default in `TTLCache`, `raters/factories.ts`, `raters/Rater.ts`, and `AuditStore` |
| `collectRates` | `app/core/raters/helpers.ts` | the recursive `walk` closure inside `flattenRates` |
| `lineToShell` | `app/core/raters/helpers.ts` | the `shellLine` closure inside `recordToWorksheet` |
| `matchesProgramRow` | `app/core/raters/helpers.ts` | the `unscoped` closure inside `recordToWorksheet` |
| `coverFields` | `app/core/raters/helpers.ts` | the `cover` closure inside `auditCarrier` |
| `placeNoticeRule` | `app/core/raters/compilers.ts` | the `place` closure inside `spliceNoticeRules` |
| `gradeBuilding` | `app/core/buildings/helpers.ts` | the `grade` closure inside `compareBuildings` |
| `countNumeric` | `app/core/csv/helpers.ts` | the `numeric` closure inside `detectHeader` |
| `readNow`, `scheduleTask` | `app/browser/helpers.ts` | the host-clock default and the inline timer default in `ToastStore` |

`app/core/helpers.ts` is a new root-level file mirroring the existing root `constants.ts` and
`validators.ts`, whose header defines that root as the home for leaves shared by two or more
modules. `readEpoch` is shared by `locations` and `raters`, so no cross-module import was created.
It is exported through `app/core/index.ts` beside `validators.js`. `readNow` and `scheduleTask` join
`writeValue` and `downloadFile` in `app/browser/helpers.ts`; that file's header enumerates its own
contents, so it was extended to name them.

`GuideEligibility.vue` gained a script-level `collect` beside the existing `describe` and `checks`
functions, following that component's own local-helper pattern rather than exporting a
component-local traversal.

**Four repairs beyond the brief's named rule.** The brief named `policy/no-nested-functions`. Four
diagnostics survived the converge step and belonged to other floor rules. Each repair below is
behaviour-preserving; each is recorded here for a ruling.

- `app/browser/main.ts:2` reported `import(no-unassigned-import)`. The floor allows an unassigned
  import only for a style file, so the bare `bootstrap` import had to become assigned. I did **not**
  narrow it to named Bootstrap components the way terrain does, because that changes which data APIs
  register. A namespace import plus a `void` read imports the identical module with the identical
  side effects. I proved the namespace form alone still failed `eslint(no-unused-vars)` before
  adding the `void` read.
- `tests/app/core/setup.ts:92` asserted an effect literal to `DisplayEffect`. The function's return
  type is already `DisplayRow`, so the literal is contextually typed; I dropped the assertion and
  the then-unused `DisplayEffect` type import.
- `tests/app/core/raters/integration.test.ts:4889` asserted an empty array to `string[]`. I
  annotated the `coverageIds` arrow's return type instead, so the empty array needs no assertion.
- `tests/app/core/raters/helpers.test.ts:484` asserted `undefined` to `never` to build a line result
  with no worksheet, a shape `LineResult` does not permit. `Object.assign` over `makeLineResult`
  narrows the property to `never` through the type system rather than past it, and lands the same
  runtime value.

**Coverage for the new exports.** `AGENTS.md` requires exported reusable logic to be tested, and
`app/browser/helpers.ts` states its own rule that each exported leaf is mirrored by a `describe`.
New file `tests/app/core/helpers.test.ts` covers `readEpoch`. New describes landed in
`tests/app/core/raters/helpers.test.ts` for `collectRates`, `lineToShell`, `matchesProgramRow`, and
`coverFields`; in `tests/app/core/raters/compilers.test.ts` for `placeNoticeRule`, exercising every
anchor branch including the missing-target fallback and the quantitative-slot skip; in
`tests/app/core/buildings/helpers.test.ts` for `gradeBuilding`; in
`tests/app/core/csv/helpers.test.ts` for `countNumeric`; and in `tests/app/browser/helpers.test.ts`
for `readNow` and `scheduleTask`. `scheduleTask` is proved against real timers through the
repository's own `waitForDelay`, with no fake clock.

The app suites went from 22 files / 446 passed and 24 files / 240 passed to 23 files / 481 passed
and 24 files / 247 passed. The 446 and 240 passing before any test was added is the evidence that
the repairs preserved behaviour: every existing `Schedule`, `ScheduleStore`, `useMedia`,
`useDragDrop`, `BuildingTable`, `ApplicationController`, `ToastStore`, and `AuditStore` test passed
against the rewritten code before I wrote a single new assertion.

## Repair 2: the build break the re-pin caused

**The red.** Command: `npm run build`.

```text
BUILD_EXIT=1
[MISSING_EXPORT] "generateUUID" is not exported by "node_modules/@orkestrel/database/dist/src/core/index.js".
   [ app/core/buildings/factories.ts:3:10 ]
```

`@orkestrel/database` `0.0.12` removed `generateUUID`. Its guide states the package now uses the
global `crypto.randomUUID()` method by default, and terrain's `Schedule` already calls it directly.

**The fix.** `app/core/buildings/factories.ts` was the only consumer, with one import, one call
site, and one doc-comment mention. All three moved to `crypto.randomUUID()`. Both produce a v4 UUID
string, so the behaviour is unchanged.

**Passing count after the fix.** `BUILD_EXIT=0`, 202 modules transformed, built in 2.06s.

## Repair 3: the `config` project's `prepack` assertion

**The red.** Command: `npm run test:config`.

```text
TESTCONFIG_EXIT=1
FAIL  |config| tests/config.test.ts > root configuration > rebuilds publishing workspaces before packing
AssertionError: expected undefined to be 'npm run build'
 tests/config.test.ts:585:19
    585|   expect(prepack).toBe(publishes ? 'npm run build' : undefined)
Test Files  1 failed (1)
     Tests  1 failed | 45 passed (46)
```

lloyds declares no `private` field, so the vendored proof classifies it as a publishing workspace
and requires `prepack`. Scaffold's own blueprint does not, because its `scripts` question never
named `prepack` or `test:distribution`, so the two classifiers disagree here.

**The fix.** Added the `prepack` script at the exact value the assertion names, placed before
`prepublishOnly`. I did **not** add a `private` field: that is a publishing decision, and publishing
is off-limits.

**Passing count after the fix.** `TESTCONFIG_EXIT=0`, 46 passed.

## Red 1, reported: `npm run check` exits `2` with 396 errors

**Owner: lloyds, as a migration unit.** Not repairable inside this unit's scope.

The floor `tsconfig.json` the overwrite wrote adds six strictness flags the baseline did not carry:

```diff
+		"verbatimModuleSyntax": true,
+		"noUncheckedIndexedAccess": true,
+		"noUncheckedSideEffectImports": true,
+		"exactOptionalPropertyTypes": true,
+		"noUnusedLocals": true,
+		"noUnusedParameters": true,
```

Errors by code:

| Code | Count | Cause |
| --- | --- | --- |
| `TS2375` | 283 | `exactOptionalPropertyTypes` |
| `TS2379` | 103 | `exactOptionalPropertyTypes` |
| `TS2532` | 4 | `noUncheckedIndexedAccess` |
| `TS2305` | 2 | the `@orkestrel/database` re-pin |
| `TS2769` | 1 | mixed |
| `TS2741` | 1 | the `@orkestrel/database` re-pin |
| `TS2412` | 1 | `exactOptionalPropertyTypes` |
| `TS2322` | 1 | `noUncheckedIndexedAccess` |

Errors by file:

| File | Errors |
| --- | --- |
| `tests/app/core/raters/integration.test.ts` | 282 |
| `app/core/raters/carriers/as550/constants.ts` | 24 |
| `app/core/raters/carriers/as207/constants.ts` | 18 |
| `app/core/raters/carriers/as040/constants.ts` | 18 |
| `app/core/raters/carriers/as300/constants.ts` | 14 |
| `tests/app/core/raters/helpers.test.ts` | 12 |
| `app/core/raters/carriers/oldrepublic/constants.ts` | 8 |
| `tests/app/core/buildings/helpers.test.ts` | 5 |
| `app/core/locations/Locator.ts` | 4 |
| `tests/setup.ts` | 3 |
| `app/core/buildings/Schedule.ts` | 3 |
| `app/core/raters/compilers.ts` | 1 |
| `app/core/raters/Rater.ts` | 1 |
| `app/core/raters/errors.ts` | 1 |
| `tests/app/core/raters/compilers.test.ts` | 1 |
| `tests/app/core/buildings/factories.test.ts` | 1 |

A representative excerpt of the dominant class:

```text
app/core/buildings/Schedule.ts(52,49): error TS2379: Argument of type '{ on: EmitterHooks<ScheduleEventMap> | undefined; error: EmitterErrorHandler | undefined; }' is not assignable to parameter of type 'EmitterOptions<ScheduleEventMap>' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
```

Every error outside the two dominant flags, in full:

```text
app/core/buildings/Schedule.ts(103,21): error TS2769: No overload matches this call.
app/core/raters/errors.ts(25,3): error TS2412: Type 'Readonly<Record<string, unknown>> | undefined' is not assignable to type 'Readonly<Record<string, unknown>>' with 'exactOptionalPropertyTypes: true'.
tests/app/core/raters/compilers.test.ts(261,6): error TS2322: Type 'LineDefinition | undefined' is not assignable to type 'LineDefinition'.
tests/app/core/raters/helpers.test.ts(696,22): error TS2532: Object is possibly 'undefined'.
tests/app/core/raters/helpers.test.ts(724,22): error TS2532: Object is possibly 'undefined'.
tests/app/core/raters/helpers.test.ts(741,22): error TS2532: Object is possibly 'undefined'.
tests/app/core/raters/helpers.test.ts(830,22): error TS2532: Object is possibly 'undefined'.
tests/setup.ts(6,15): error TS2305: Module '"@orkestrel/database"' has no exported member 'AggregateFunction'.
tests/setup.ts(6,34): error TS2305: Module '"@orkestrel/database"' has no exported member 'Criteria'.
tests/setup.ts(194,8): error TS2741: Property 'insert' is missing in type '{ open(schema: readonly TableSchema[]): Promise<void>; ... }' but required in type 'RecordingDriverInterface'.
```

**Why I did not repair it.** Closing the `exactOptionalPropertyTypes` class means adding `undefined`
to optional properties across the `app/core` type files and reshaping the five carriers' rating
data, which is a product type-contract change and a product data change. The deviation contract
names that as the stop case. Closing the `@orkestrel/database` class means migrating the recording
driver in `tests/setup.ts` to the `0.0.12` interface, including the added `insert` method.
`tsconfig.json` is content-owned by scaffold and off-limits after the overwrite, so turning the
flags off is not an option either. None of the 396 errors sits on a line I wrote: the four in
`tests/app/core/raters/helpers.test.ts` at 696, 724, 741, and 830 predate my additions, and my own
construction at 486 typechecks.

## Red 2, reported: `npm test` exits `1` on the `policy` project

**Owner: lloyds, as a conformance unit.** Not repairable inside this unit's scope.

```text
FAIL  |policy| tests/policy.test.ts > repository policy > enforces placement and mirrors over the real workspace
AssertionError: expected [ { rule: 'data', ...(3) }, ...(13) ] to deeply equal []
 tests/policy.test.ts:515:49
    515|   expect(inspectPolicyWorkspace(process.cwd())).toEqual([])
Test Files  1 failed (1)
     Tests  1 failed | 110 passed (111)
```

The 14 violations, each proved against `git show HEAD:<path>` to predate this visit:

| Rule | Path | Line | Subject |
| --- | --- | --- | --- |
| `data` | `app/browser/main.ts` | 12 | the module-scope `root` binding, baseline line 7 |
| `constant` | `app/core/raters/carriers/as040/constants.ts` | 431 | bare collection literal in the carrier definition |
| `constant` | `app/core/raters/carriers/as207/constants.ts` | 382 | bare collection literal |
| `constant` | `app/core/raters/carriers/as300/constants.ts` | 385 | bare collection literal |
| `constant` | `app/core/raters/carriers/as550/constants.ts` | 539 | bare collection literal |
| `constant` | `app/core/raters/carriers/oldrepublic/constants.ts` | 390 | bare collection literal |
| `type` | `app/core/raters/compilers.ts` | 32 | `CompileCarrierDeps`, baseline line 48 |
| `type` | `app/core/raters/compilers.ts` | 39 | `DistributedNotices`, baseline line 55 |
| `export` | `app/core/raters/helpers.ts` | 502 | unexported `emptyWorksheet`, baseline line 453 |
| `mirror` | `tests/app/core/raters/carriers/as040/AS040.test.ts` | none | no `AS040.ts` module |
| `mirror` | `tests/app/core/raters/carriers/as207/AS207.test.ts` | none | no `AS207.ts` module |
| `mirror` | `tests/app/core/raters/carriers/as300/AS300.test.ts` | none | no `AS300.ts` module |
| `mirror` | `tests/app/core/raters/carriers/as550/AS550.test.ts` | none | no `AS550.ts` module |
| `mirror` | `tests/app/core/raters/carriers/oldrepublic/OldRepublic.test.ts` | none | no `OldRepublic.ts` module |

**Why I did not repair it.** Three are cheap and behaviour-preserving: export `emptyWorksheet`, and
move the two `compilers.ts` interfaces into `types.ts`. Eleven are not. The five `constant`
violations reshape product rating data, and the five `mirror` violations need either a rename of the
carrier test files or a split of each carrier's definition out of `constants.ts` into its own
module. Closing three of 14 leaves the suite red, adds churn, and fragments the successor unit's
baseline, so I left the set whole. The violation set is identical before and after every repair I
made, and each of my added exports is centralized, exported, and mirrored by a `describe`, so none
of the 14 is mine.

## State on exit

`git rev-parse --short HEAD` returns `315ba62`, unchanged.

`git diff --stat` reports `86 files changed, 6340 insertions(+), 5851 deletions(-)`.

`git status --porcelain` carries 103 rows. The lockfile pair is exactly as I found it:
`D  package-lock.json` staged and `?? package-lock.json` untracked. I never staged, restored, or
rewrote that state, and I ran no `git checkout`, `restore`, `stash`, `reset`, or `clean`.

Untracked additions: `app/core/helpers.ts` and `tests/app/core/helpers.test.ts`, both mine;
`.claude/agents/orkestrel.md`, `.claude/settings.json`, `LICENSE`, `configs/browsers.ts`,
`configs/helpers.ts`, `configs/policy.ts`, `guides/html.md`, `guides/probe.md`, `guides/test.md`,
`scripts/`, `tests/config.test.ts`, `tests/policy.test.ts`, and `tests/setupPolicy.ts`, all the
overwrite's; and `package-lock.json`, the user's standing condition.

## Claims not closed

- **`npm run check` is red at 396 errors.** Owner: lloyds. A migration unit over
  `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, and the `@orkestrel/database` `0.0.12`
  interface.
- **`npm test` is red on the `policy` project at 14 violations.** Owner: lloyds. A conformance unit
  over the carrier constants and the carrier test mirrors.
- **The catalog's `@orkestrel/scaffold` row reads `0.0.59` while the registry serves `0.0.60`.**
  Owner: the Orchestrator, as one `scaffold catalog` regeneration.
- **The `.claude/agents/orkestrel.md` file arrived new, so no stale-body migration was needed.**
  lloyds held no copy at that path, and presence ownership wrote the floor copy with its table
  filled. This is the case terrain could not close, and it does not arise here.
- **The `setup` and `typescript` audit lines.** Owners recorded under the closing audit; neither is
  work this visit created.
- **`npm run lint` still runs without `--deny-warnings`, unlike terrain's.** I added `lint:check`
  with the flag and left the mutating `lint` as lloyds wrote it. Owner: the Orchestrator, as one
  ruling on whether the fleet's mutating `lint` is standardized.
