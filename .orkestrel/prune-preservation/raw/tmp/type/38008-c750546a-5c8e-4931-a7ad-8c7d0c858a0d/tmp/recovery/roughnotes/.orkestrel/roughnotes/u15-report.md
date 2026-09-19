# Unit 15 report — retain the workspace-configuration proof

Done. The `conformance` slot is taken: `tests/conformance.test.ts` is new, `vite.config.ts` gains
the factory and its registration, and `package.json` gains the script and the chain entry.
`tests/config.test.ts` is unedited and now requires both halves of the slot.

## 1. Criteria

| # | Criterion | State | Evidence |
| - | --------- | ----- | -------- |
| 1 | `oxfmt --check` on owned files | done | `npx oxfmt --config .oxfmtrc.json --check tests/conformance.test.ts vite.config.ts package.json` → `All matched files use the correct format.` |
| 2 | `oxlint --deny-warnings` on owned files | done | `npx oxlint --config .oxlintrc.json --deny-warnings tests/conformance.test.ts vite.config.ts` → no diagnostic, `LINT=0` |
| 3 | `npm run check` passes, no `any`, `as`, `!`, or suppression | done | `CHECK=0`; `tsc --noEmit -p tsconfig.json`, `check:app:core`, `check:app:browser` all silent. The file uses `unknown` returns and property-descriptor reads instead of assertions |
| 4 | `npm run test:conformance` runs the new project and passes | done | `Test Files 1 passed (1)`, `Tests 5 passed (5)`, `EXIT=0`, 828ms |
| 5 | Every unit 13 assertion retained with its controls, each instrument shown red | done | § 2 and § 3 |
| 6 | `tests/config.test.ts` unedited, its project passes, now requiring the conformance project | done | `git status --porcelain` → `M package.json`, `M vite.config.ts`, `?? tests/conformance.test.ts`. `npm run test:config` → `Tests 46 passed (46)`. Requirement proved red both ways in § 3 |
| 7 | `npm test` exits 0 and runs the conformance project | done | `TEST_EXIT=0`, 19:25:43 → 19:27:02. Chain tail: `test:conformance` → `Tests 5 passed (5)`. App `186 passed (186)`, journey `76 passed \| 4 skipped (80)`, policy `111 passed (111)`, config `46 passed (46)` |
| 8 | `npm run test:journey` green for all four projects | done | `Test Files 4 passed (4)`, `Tests 76 passed \| 4 skipped (80)`, `JOURNEY_EXIT=0`, 39.20s |
| 9 | `npm run build` succeeds | done | `BUILD_EXIT=0`, 19:25:36 → 19:25:40 |

## 2. What is retained

`tests/conformance.test.ts` states its subject as the tooling this workspace departs from: Vite's
`mergeConfig`, which concatenates plugin arrays, and Vitest's project invocation, which hands every
registered factory its invocation record in the position an override would arrive in. Every control
is that untracked behaviour read directly, so each instrument's control sits beside the assertion it
must contradict.

| Instrument (`it` name) | Retained assertions | Its control |
| ---------------------- | ------------------- | ----------- |
| `merges an override into the browser configuration` | `build.emptyOutDir` is `false` under the override, `optimizeDeps.include` carries both `bootstrap-icons` and `vue`, the output directory is unchanged | The configuration no override reached — `appBrowser()` — read the same way. A factory that ignored its override returns exactly this, and both readings must throw against it |
| `builds the showcase on the browser configuration instead of restating it` | Same key set, same plugin names and order, same `root`, `publicDir`, `build.assetsInlineLimit`, `build.emptyOutDir`, and `optimizeDeps.include` as `appBrowser()`; the output directory ends `dist/showcase` against the browser's `dist/app/browser` | A showcase declared on its own rather than composed: an object carrying the output boundary slot and the output directory and nothing else. Each comparison must throw against it |
| `merges an override into the showcase configuration` | `build.emptyOutDir` is `false` under the override and the output directory still ends `dist/showcase` | `appShowcase()` with no override, which is what a showcase that dropped its override on the way to `appBrowser` returns |
| `carries the Vue plugin exactly once in every configuration these factories return` | `vite:vue` counts 1 in `appBrowser()`, `appShowcase()`, `appBrowser(override)` and `appShowcase(override)` where the override carries the Vue plugin; `orkestrel-output-boundary` counts 1 in `appShowcase()` | **Unit 13's bare-merge control.** `mergeConfig(appBrowser(), { plugins: [vue()] })` counts `vite:vue` twice, and the one-count reading must throw against it |
| `refuses the invocation record a registered factory receives in the override position` | `command`, `mode`, `isSsrBuild` and `isPreview` are absent from `appBrowser(INVOCATION)`, `appShowcase(INVOCATION)` and `mergeOverride(appBrowser(), INVOCATION)`; the merged result keeps the browser's plugin names and output directory | **Unit 13's invocation control.** `mergeConfig(appBrowser(), INVOCATION)` lands `command: 'serve'` and `mode: 'sentinel-mode'`, and the refusal reading must throw against it |

Unit 13's probe carried its two controls in one test. Here each sits inside the instrument it
certifies, so a control that stopped discriminating reddens that instrument rather than a separate
one.

## 3. The controls' reds

Two instruments ran, one over the subject and one over the controls, plus a third over the slot.
Every file each mutation touched was restored in the same run, and each script re-ran the suite
afterwards to prove the restore. Retained at `tmp/units/u15-controls-3.py`, `-4.py`, `-5.py` with
their logs; `-1.py` and `-2.py` are the superseded copies, each naming what changed.

### Subject mutations — command `npm run test:conformance`

Green baseline and green restore both report `Tests 5 passed (5)`, `exit=0`.

| Mutation | Count | Instruments reddened |
| -------- | ----- | -------------------- |
| M1 `appBrowser` ignores its override | `4 failed \| 1 passed (5)`, `exit=1` | browser override, showcase composition, showcase override, invocation refusal |
| M2 `appShowcase` restates the browser root | `1 failed \| 4 passed (5)`, `exit=1` | showcase composition |
| M3 `appShowcase` drops its override | `1 failed \| 4 passed (5)`, `exit=1` | showcase override |
| M4 `mergeOverride` skips plugin selection | `2 failed \| 3 passed (5)`, `exit=1` | Vue plugin count, showcase composition |
| M5 `mergeOverride` drops the invocation guard | `1 failed \| 4 passed (5)`, `exit=1` | invocation refusal |

Each instrument reddens under at least one mutation, and M2, M3 and M5 redden exactly one.

### Control mutation — command `npm run test:conformance`

C1 inverts every inline control, turning each control's own reading into an ordinary assertion.
A control whose subject silently passed would leave its instrument green.

- Control sites inverted: 8.
- `C1 every inline control inverted: exit=1 | 5 failed (5)` — every instrument red, so every control
  genuinely fails.
- Restore: `exit=0 | 5 passed (5)`.

### Slot mutations — command `npm run test:config`

Green baseline and green restore both report `Tests 46 passed (46)`, `exit=0`.

| Mutation | Count | Vendored test reddened |
| -------- | ----- | ---------------------- |
| R1 registration removed, proof file kept | `2 failed \| 44 passed (46)`, `exit=1` | `registers every workspace project with its fixed include and setup files`; `registers proof scripts in the correct gate` |
| R2 `test:conformance` script removed, project kept | `1 failed \| 45 passed (46)`, `exit=1` | `registers proof scripts in the correct gate` |

That is criterion 6's positive half: the vendored proof now requires the registration **and** the
gate, neither of which it required before this unit.

## 4. Rulings on the unknowns

**Chain position: last, after `test:config`.** The chain now reads app, journey, policy, config,
conformance. That is the order of the cross-cutting proofs table in `.claude/rules/tests.md`, which
runs policy, config, guides, conformance, distribution, integration, so the workspace proofs keep
one order and a later slot lands where the table puts it. The chain is not cheap-first — the browser
projects lead it — so there is no cost order to honour instead.

**What the vendored proof asserts about a `conformance` project.** Beyond the include
`tests/conformance.test.ts` and the setup `./tests/setup.ts`, `tests/config.test.ts` requires:

- the script `test:conformance` to be exactly
  `vitest run --config vite.config.ts --no-cache --reporter=dot --project conformance`, and to be
  `undefined` when no such project is registered;
- the `test` script to contain `npm run test:conformance` — conformance is hermetic, so the gate is
  `test` rather than `prepublishOnly`;
- the two laws every project meets: each row in `projects` is a function, and a factory returns no
  `command`, `mode`, `isSsrBuild`, `isPreview` or `sentinel` field.

It reads the project set by label, so it fixes no timeout, colour, environment, or position. The
factory therefore matches `policy` and `config` exactly, with the unused label colour `green`.

## 5. Observations

- Durations: `npm run test:conformance` 828ms; `npm run test:config` 1.70s; `npm run test:journey`
  39.20s; `npm run build` 19:25:36 → 19:25:40; `npm test` 19:25:43 → 19:27:02. The journey run
  reports the Bootstrap Sass deprecation warnings as the standing condition describes.
- The conformance project imports `../vite.config.js` and touches no filesystem, so it is the
  cheapest proof in the chain.
- `INVOCATION` typechecks in the override position because Vite's `UserConfig` declares `mode`, so
  the record shares a property with it and the weak-type check does not fire. A record with no
  shared property would be rejected at the call site instead of at the guard.
- The showcase composition control is a literal configuration rather than an altered copy of a
  returned one, so it sits outside the population the instrument covers: the population is the
  configurations `appShowcase` composes on `appBrowser`, and the control is one declared
  independently of that composition.

## 6. What I did not close

**`tmp/probe/override.test.ts` still carries the promoted proof.** The retained file supersedes it,
and `.claude/rules/tests.md` § Probes says to promote or delete, so that probe is now a duplicate
that runs from the `probe` workbench while reading as a test. It belongs to unit 13 and sits in
neither my owned nor my off-limits list, so I left it rather than writing an unowned path. Removing
`tmp/probe/override.test.ts` closes it; `tmp/probe/manifest.test.ts` is a different unit's probe and
stays.

**Not attempted, per the deviation contract:** no showcase wrapper, no showcase script, no
dependency, and no edit to any vendored file.
