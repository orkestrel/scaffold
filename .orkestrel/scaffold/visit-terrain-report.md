# Unit V visit — `terrain` — report

The visit is complete. `npx scaffold audit` exits `0`, every `@orkestrel/*` range equals the
catalog's version with a caret, `node_modules/@orkestrel/test` is the 0.0.11 campaign build, and
the whole gate chain is green. One repair was needed: the overwrite installed a
`policy/no-nested-functions` rule that reddened terrain's own `app/` code in 28 places, taken to
`0`. Two claims stayed open, both recorded with their owner. Nothing was committed.

Baseline: `c9246ea` on `main`, status `D  package-lock.json` plus `?? package-lock.json` and
nothing else — the standing condition exactly as the brief named it. The lockfile pair is
untouched: the staged deletion still stands and the untracked file is the one `npm install` read
and rewrote.

## Deviation: the overwrite refused before it ran

The first `npx scaffold overwrite --dirty` refused, and the refusal was not the uncommitted-work
one the brief anticipated.

```text
TARGET: The manifest at . does not declare a planned dependency: @orkestrel/probe. The configs and
tests groups are blocked. Add this exact dependency line to dependencies or devDependencies in
package.json: "@orkestrel/probe": "^0.0.10", Add the dependency before selecting configs or tests,
or exclude those groups from --groups.
OVERWRITE_EXIT=1
```

The brief's range list names no `probe` row, and the refusal quotes `^0.0.10` while the catalog
serves `0.0.11`. I resolved it rather than stopping, because the declaration is a precondition of
step 2 itself and the refusal names its own remedy. I wrote `^0.0.11`, on this evidence:

- `npm view @orkestrel/probe version` → `0.0.11`; `dist-tags.latest` → `0.0.11`.
- The catalog row: `@orkestrel/probe | 0.0.11 | L4`.
- Scaffold's own `package.json` declares `"@orkestrel/probe": "^0.0.11"` in `devDependencies`,
  beside `"@orkestrel/test": "^0.0.11"`. The `^0.0.10` in the message is the distributed floor
  inside scaffold 0.0.59, not a live read.

The scaffold guide's Dependency floors section states a fleet row is compared exactly, so `^0.0.10`
would have left this target reporting a stale `probe` row and exiting `1` forever. `^0.0.11`
cleared the refusal on the re-run and the closing audit exits `0`, so the check is on declaration
rather than on the exact floor. Placement follows scaffold: `devDependencies`.

**Open question for the Orchestrator.** Scaffold 0.0.59 ships a `probe` floor a release behind what
it declares for itself. Nothing in this target is broken by it, and the fix belongs to scaffold's
data root, not here.

## Ranges before and after

Runtime `dependencies`:

| Package | Before | After | Catalog |
| --- | --- | --- | --- |
| `@orkestrel/contract` | `^0.0.12` | `^0.0.15` | `0.0.15` |
| `@orkestrel/csv` | `^0.0.3` | `^0.0.5` | `0.0.5` |
| `@orkestrel/database` | `^0.0.9` | `^0.0.12` | `0.0.12` |
| `@orkestrel/emitter` | `^0.0.6` | `^0.0.8` | `0.0.8` |
| `@orkestrel/indexeddb` | `^0.0.7` | `^0.0.9` | `0.0.9` |
| `@orkestrel/interpret` | `^0.0.9` | `^0.0.11` | `0.0.11` |
| `@orkestrel/program` | `^0.0.8` | `^0.0.11` | `0.0.11` |
| `@orkestrel/qualifier` | `^0.0.9` | `^0.0.12` | `0.0.12` |
| `@orkestrel/rater` | `^0.0.10` | `^0.0.12` | `0.0.12` |
| `@orkestrel/reason` | `^0.0.6` | `^0.0.8` | `0.0.8` |

Development `devDependencies`:

| Package | Before | After | Catalog |
| --- | --- | --- | --- |
| `@orkestrel/contract` | `^0.0.12` | `^0.0.15` | `0.0.15` |
| `@orkestrel/guide` | `^0.0.11` | `^0.0.15` | `0.0.15` |
| `@orkestrel/html` | `^0.0.3` | `^0.0.7` | `0.0.7` |
| `@orkestrel/probe` | absent | `^0.0.11` | `0.0.11` |
| `@orkestrel/scaffold` | `^0.0.38` | `^0.0.59` | `0.0.59` |
| `@orkestrel/test` | `^0.0.6` | `^0.0.11` | `0.0.11` |

Every `@orkestrel/*` range in the manifest equals the catalog's version with a caret. The overwrite's
own `declare` step wrote every row except `scaffold` (step 1) and `probe` (the refusal remedy), so
step 3 needed no manifest edit — only the install and the tarball re-stage.

The overwrite also raised the foreign toolchain floors on its own account: `@types/node` `^26.2.0`
→ `^26.4.1`, `@vitest/browser-playwright` `^4.1.10` → `^4.1.11`, `oxfmt` `^0.63.0` → `^0.66.0`,
`oxlint` `^1.78.0` → `^1.81.0`, `vite` `~8.2.1` → `^8.2.2`, `vitest` `^4.1.10` → `^4.1.11`, `vue`
`^3.5.41` → `^3.5.42`, `vue-tsc` `^3.3.9` → `^3.3.11`. It added the `test:probe` and `test:bench`
scripts to the scripts region. It left `typescript` on major 6.

## The read-only audit, in full

`npx scaffold audit` before any write, exit `1`. Findings:

```text
scripts: The manifest at . does not declare planned scripts: test:probe, test:bench.
dependencies: The manifest at . does not declare a planned dependency: @orkestrel/probe.
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupBrowser.ts.
dependencies: @types/node declares the floor ^26.2.0, while the registry serves 26.4.1 within major 26.
dependencies: @vitest/browser-playwright declares the floor ^4.1.10, while the registry serves 4.1.11 within major 4.
dependencies: oxfmt declares the floor ^0.63.0, while the registry serves 0.66.0 within major 0.
dependencies: oxlint declares the floor ^1.78.0, while the registry serves 1.81.0 within major 1.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vite declares the floor ~8.2.1, while the registry serves 8.2.2 within major 8.
dependencies: vitest declares the floor ^4.1.10, while the registry serves 4.1.11 within major 4.
dependencies: vue declares the floor ^3.5.41, while the registry serves 3.5.42 within major 3.
dependencies: vue-tsc declares the floor ^3.3.9, while the registry serves 3.3.11 within major 3.
```

Drift table: `12 of 41 planned paths drifted from the plan. Audit compared bytes at 25, existence at
5, and nothing at 11. The plan does not own 85 further paths beneath its groups.`

- `stale`: `vite.config.ts`, `configs/browsers.ts`, `configs/helpers.ts`, `.oxlintrc.json`,
  `.prettierignore`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
  `AGENTS.md`, `CLAUDE.md`, `.claude/settings.json`
- `missing`: `configs/policy.ts`
- `foreign`: 85 paths — `.mcp.json`, `.agents/orchestration.md`, every `.agents/skills/**` file,
  every `.claude/agents/*.md` except `orkestrel.md`, every `.claude/rules/*.md`, every
  `.claude/skills/*/SKILL.md`, every `.codex/agents/*.toml`, `.codex/config.toml`,
  `.cursor/mcp.json`, `.cursor/rules/orchestration.mdc`

Range findings: the 14 `differs from` lines matching the preceding range tables.

**The deletion check the brief required.** Before running the overwrite I confirmed every one of the
85 deletion candidates is tracked and clean. `git ls-files --error-unmatch` matched all 85, and
`git status --porcelain` over that path set returned nothing. No uncommitted file was in the
deletion plan, so the `--dirty` waiver destroyed no uncommitted work. `.mcp.json` is tracked and not
git-ignored, so it was deletable — the target avoids the permanent `foreign` finding a git-ignored
copy would have left.

## The overwrite

`npx scaffold overwrite --dirty`, exit `0`.

```text
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupBrowser.ts.
0 of 41 planned paths drifted from the plan. Audit compared bytes at 26, existence at 4, and nothing at 11.
vite.config.ts replaced (10 lines added).
configs/browsers.ts replaced (0-line delta).
configs/helpers.ts replaced (20 lines added).
.oxlintrc.json replaced (22 lines added).
.prettierignore replaced (6 lines added).
tests/setupPolicy.ts replaced (1595 lines added).
tests/policy.test.ts replaced (240 lines added).
tests/config.test.ts replaced (570 lines added).
AGENTS.md replaced (144 lines removed).
CLAUDE.md replaced (42 lines removed).
.claude/settings.json replaced (779 lines added).
25 written, 33 unchanged, 85 removed in ..
50 published, 15 guides fetched, 0 no longer listed.
```

Files written, from `git status --porcelain`: `vite.config.ts`, `configs/browsers.ts`,
`configs/helpers.ts`, `.oxlintrc.json`, `.prettierignore`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/config.test.ts`, `AGENTS.md`, `CLAUDE.md`, `.claude/settings.json`,
`.claude/agents/orkestrel.md`, `package.json`, and the guide mirrors `guides/contract.md`,
`guides/database.md`, `guides/html.md`, `guides/interpret.md`, `guides/program.md`,
`guides/qualifier.md`, `guides/rater.md`, `guides/reason.md`, `guides/scaffold.md`. New files:
`configs/policy.ts`, `guides/probe.md`, `guides/test.md`.

Files deleted: exactly the 85 `foreign` paths. I compared the sorted deletion set from
`git status --porcelain` against the sorted `foreign` set from the read-only audit; `comm` reported
nothing on either side, so the sets are identical. No path outside the audited plan was removed.

## The closing audit

`npx scaffold audit` after the overwrite, exit `0`. Every line:

```text
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupBrowser.ts. Add tests/setup.test.ts, tests/setupBrowser.test.ts, each covering the module of the same name. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
0 of 41 planned paths drifted from the plan. Audit compared bytes at 26, existence at 4, and nothing at 11.
```

Both remaining lines are non-blocking questions and both are terrain's own, not the visit's:

- The `setup` line asks for `tests/setup.test.ts` and `tests/setupBrowser.test.ts`. Scaffold refuses
  to write them because their subject is behaviour only this workspace can assert. Writing them is
  authoring new product-level test coverage, which is outside a visit's scope. **Owner: terrain.**
- The `typescript` major line is the "a newer major is never crossed for you" question the guide
  describes. Crossing TypeScript 6 → 7 is a toolchain migration. **Owner: terrain, on a decision.**

I re-ran this audit as the final action after every repair. It still exits `0`.

## Installed state

`npm ls @orkestrel/test @orkestrel/probe` exits `0`:

```text
terrain@ C:\Users\mikes\WebstormProjects\terrain
+-- @orkestrel/probe@0.0.11
`-- @orkestrel/test@0.0.11
```

The campaign build is staged and proved, not assumed. After the full install I re-staged with
`npm install --no-save .../orkestrel-test-0.0.11.tgz` and compared digests between the tarball's
`package/dist` and the installed tree:

```text
1062b1f68fbaf6bca304922a4a0824feacf1a12fc9f709ac95f38ffbeda4d35c  dist/src/browser/index.js
65a5da7840cd91f24c6f9b6a806ca92113a6bdcfe39f9dd28e66fa396f75999c  dist/src/core/index.js
e596175d863465f1725361c23855852413772292f3fb70f3d7bf804a0c623ca2  dist/src/server/index.js
```

All three match, and the core digest still matches at the end of the visit, so no later install
displaced it. The manifest keeps the registry range `^0.0.11`.

### The duplicate contract copies

The brief asked whether terrain's leading contract range makes `npm run check` read two copies as
distinct types. It does not. `npm ls @orkestrel/contract` shows the root at `0.0.15` and a nested
`@orkestrel/contract@0.0.13` under every published dependent — `csv`, `database` (and its `sqlite`),
`emitter`, `guide` (and its `markdown`), `html`, `indexeddb`, `interpret` (and its `template`),
`probe` (and its `lsp`, `mcp`, `queue`, `timeout`, `tool`), `program`, `qualifier`, `rater`,
`reason`, `scaffold` (and its `console`, `process`). With that graph installed, `npm run check`
exits `0` across all three projects. No restoration to `^0.0.13` was needed, so there is no
red-then-green to report for this claim — the predicted red never occurred.

## The gate chain

Each gate run bare, in order, on the final tree.

| Gate | Exit | Summary |
| --- | --- | --- |
| `npm run format:check` | `0` | `All matched files use the correct format.` — 216 files |
| `npm run lint:check` | `0` | no diagnostics |
| `npm run check` | `0` | `tsc` root, `tsc` app:core, `vue-tsc` app:browser all clean |
| `npm run build` | `0` | `✓ built in 2.40s`, 215 modules |
| `npm test` | `0` | app 71 files / 951 passed, 1 skipped; policy 111 passed; config 46 passed |

`npm run format` ran once as the mutating converge step before the chain, per the visit order.

The build reports a chunk-size advisory over the 1,368.67 kB bundle. It is a notice, not a failure —
`BUILD_EXIT=0` — and it predates this visit.

## The repair: `policy/no-nested-functions`

**The red.** The overwrite installed a new Oxlint policy plugin: `configs/policy.ts` is a new file,
and `.oxlintrc.json` gained the `jsPlugins` registration plus an override enabling
`policy/no-nested-functions` over `src/**` and `app/**`. The rule reddened terrain's own application
code, never a vendored file, so it is the brief's repair case rather than its stop case.

**Failing count before the fix.** Command: `npm run lint:check`.

```text
npm run lint:check 2>&1 | grep -c 'policy(no-nested-functions)'   → 28
npm run lint:check 2>&1 | grep -c ': error '                     → 28
LINTCHECK_EXIT=1
```

All 28 diagnostics were of this one class.

**Passing count after the fix.** Same command:

```text
npm run lint:check 2>&1 | grep -c 'policy(no-nested-functions)'   → 0
LINTCHECK_EXIT=0
```

**What the rule permits.** I read `configs/policy.ts` rather than inferring the rule from its
message. `reportNested` exempts a function with no function ancestor, method syntax
(`isPolicyMethod`), an anonymous function passed directly as a call argument (`isPolicyCallback`),
an anonymous function returned directly (`isPolicyResult`), and the plugin's own visitor table.
`hasPolicyFunctionAncestor` walks parents and stops at a class boundary, so a class field
initializer is outside a function body and is not reported. Those exemptions decided every repair.

**The repairs, by shape.**

*Class field initializers, where a stable reference is required.* `Schedule` registers three table
forwarders with `on` and hands the same references back to `off`; `ScheduleStore` does the same with
one forwarder across three events. Building them in the constructor nested them inside a function
body. Both moved to field initializers, which keeps one stable reference per instance. In
`ScheduleStore` the stored `#teardown` closure became a `#teardown()` method reading
`this.#schedule`, and the class doc comment was corrected to describe the new mechanism.
`ApplicationController` already used this form for `#recover`, `#online`, and `#visible`, so its two
new watcher sources `#busy` and `#rows` follow the file's own pattern; the array positions in
`watch([...])` are not direct callback positions, which is why they were reported and inline arrows
could not stay.

*Abort signals, where listeners only needed matching removal.* `useMedia` and `useDragDrop` held
named listeners solely so `onUnmounted` could pass the same references to `removeEventListener`.
Each now registers its listeners as direct anonymous callbacks with `{ signal }` from one
`AbortController` and aborts on unmount. This is the `AGENTS.md` "park idle work on events and abort
signals" form, it adds no symbol, and it removes the reason the handlers were named at all.

*Object method syntax, where functions sit in an object literal.* `BuildingTable.vue` built a
pending edit as `{ cancel: () => …, flush: () => … }`; a Property position is not a direct argument
position, so both were reported. Method shorthand is exempt under `isPolicyMethod` and closes over
`timer`, `key`, `building`, `field`, and `event` identically. The `perform` ternary in the same
function folded into one script-level `apply` function routing the two sequence fields to
`renumber` and every other field to `commit`, which is what the ternary already decided.

*A bound method reference, where a wrapper only forwarded.* `ApplicationController` adapted
`transport: (url) => general.resolve(url)`. `Transport.resolve(url: string):
Promise<Result<string, string>>` matches `TransportHandler` exactly, so
`general.resolve.bind(general)` performs the same method-to-function adaptation with no wrapper at
all, which `AGENTS.md` prefers over a 1:1 forwarder.

*Extraction to an exported centralized helper, where the logic is real.* Six closures became
exported module leaves, each placed in its module's designated centralized file and each given a
mirrored `describe`:

| New export | File | Replaced |
| --- | --- | --- |
| `readEpoch` | `app/core/helpers.ts` (new) | the `() => 0` clock default in `TTLCache`, `raters/factories.ts`, `raters/Rater.ts`, and `AuditStore` |
| `collectRates` | `app/core/raters/helpers.ts` | the recursive `walk` closure inside `flattenRates` |
| `coverFields` | `app/core/raters/helpers.ts` | the `cover` closure inside `auditCarrier` |
| `placeNoticeRule` | `app/core/raters/compilers.ts` | the `place` closure inside `spliceNoticeRules` |
| `gradeBuilding` | `app/core/buildings/helpers.ts` | the `grade` closure inside `compareBuildings` |
| `countNumeric` | `app/core/csv/helpers.ts` | the `numeric` closure inside `detectHeader` |
| `readNow`, `scheduleTask` | `app/browser/helpers.ts` | the `() => Date.now()` clock default and the inline `TimerHandler` default in `ToastStore` |

`app/core/helpers.ts` is a new root-level file mirroring the existing root `constants.ts` and
`validators.ts`, whose own header defines that root as the home for leaves "shared by two or more
modules". `readEpoch` is shared by `locations` and `raters`, so no cross-module import was created.
It is exported through `app/core/index.ts` beside `validators.js`. `readNow` and `scheduleTask` join
`writeValue` and `downloadFile` in `app/browser/helpers.ts`, which already holds that file's
stateless imperative host utilities; the file header was extended to name them, as that header
enumerates its own contents.

`GuideEligibility.vue` gained a script-level `collect` beside the existing `describe` and `checks`
functions, following that component's established local-helper pattern rather than exporting a
component-local traversal.

**Coverage for the new exports.** `AGENTS.md` requires exported reusable logic to be tested, and
`app/browser/helpers.ts` states its own rule that each exported leaf is mirrored by a `describe`.
New file `tests/app/core/helpers.test.ts` covers `readEpoch`. New describes landed in
`tests/app/core/raters/helpers.test.ts` (`collectRates`, `coverFields`),
`tests/app/core/raters/compilers.test.ts` (`placeNoticeRule`, exercising every anchor branch
including the missing-target fallback and the quantitative-slot skip),
`tests/app/core/buildings/helpers.test.ts` (`gradeBuilding`),
`tests/app/core/csv/helpers.test.ts` (`countNumeric`), and `tests/app/browser/helpers.test.ts`
(`readNow`, `scheduleTask`). `scheduleTask` is proved against real timers through the repository's
own `waitForDelay`, with no fake clock.

The app suite went from 70 files / 916 passed to 71 files / 951 passed, with the skipped test
unchanged at 1. The 916 passing before any test was added is itself the evidence that the repairs
preserved behaviour: every existing `Schedule`, `ScheduleStore`, `useMedia`, `useDragDrop`,
`BuildingTable`, `ApplicationController`, `ToastStore`, and `AuditStore` test passed against the
rewritten code before I wrote a single new assertion.

One further lint diagnostic surfaced from my own test code and was fixed in place:
`tests/app/core/raters/compilers.test.ts:122` reported `typescript(array-type)` for
`readonly (readonly string[])[]`, corrected to `ReadonlyArray<readonly string[]>`.

## Claims I could not close

**The `.claude/agents/orkestrel.md` body is stale, and closing it needs a commit.** The catalog step
refreshed the marker-bounded table — the diff is a single hunk at line 34, and the markers sit at
lines 35 and 90. The body outside those markers still differs from the floor copy scaffold 0.0.59
stages. Comparing terrain's file with
`node_modules/@orkestrel/scaffold/dist/host/claude/agents/orkestrel.md` outside the marker region
shows the frontmatter `description` and the whole charter differ: the floor describes an "ecosystem
reconciler" that reads the orchestration contract first and reconciles supplied evidence, while
terrain still carries the older "ecosystem specialist" text.

This is the exact case `wave.md` § Visit a repository names, and its remedy is to delete the file
and **commit the deletion** before the run, because presence ownership never replaces present bytes.
My dispatch forbids committing, so I could not apply it. It does not affect acceptance: the audit
compares existence at this path and exits `0` either way. **Owner: the Orchestrator**, as one
deletion, one commit, and one re-run of `scaffold overwrite`.

**Scaffold's distributed `probe` floor is a release behind its own declaration.** Recorded in full
under the deviation section. Nothing in terrain is broken by it. **Owner: scaffold's data root.**

**The two remaining audit lines.** Recorded with their owners under the closing audit: the `setup`
proofs and the TypeScript major crossing are both terrain's own decisions, and neither is work this
visit created.

## State on exit

`git rev-parse --short HEAD` → `c9246ea`, unchanged. Nothing committed, staged, stashed, restored,
or reset.

`git diff --stat` → `130 files changed, 5402 insertions(+), 8999 deletions(-)`.

Untracked additions: `app/core/helpers.ts`, `tests/app/core/helpers.test.ts` (mine);
`configs/policy.ts`, `guides/probe.md`, `guides/test.md` (the overwrite's); `package-lock.json`
(the user's standing condition, rewritten in place by `npm install` as the brief directed).

The lockfile pair is exactly as I found it: `D  package-lock.json` staged, `?? package-lock.json`
untracked. I never staged, restored, or rewrote that state.

## Acceptance

1. **`npx scaffold audit` exits `0` after the overwrite** — met. Both remaining lines are recorded
   with their owner.
2. **Every `@orkestrel/*` range equals the catalog's version with a caret, and
   `node_modules/@orkestrel/test` is the 0.0.11 campaign build** — met, with the added `probe` row
   at the catalog's `^0.0.11` and the tarball proved by digest.
3. **The gate chain is green, read bare** — met. `format:check`, `lint:check`, `check`, `build`, and
   `test` all exit `0`.
