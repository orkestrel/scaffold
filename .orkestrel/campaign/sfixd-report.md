# SFIX-D report

## Files changed

- `src/core/constants.ts` raises `SOURCE_BROWSER_DEV_DEPENDENCIES['@vitest/browser-playwright']` from `^4.1.10` to `^4.1.11`.
- `tests/src/core/constants.test.ts` compares every generated dependency set with each matching `package.json` development dependency, states the keys outside that comparison, and refuses a TypeScript range that admits `7.0.2`.
- `tests/distribution.test.ts` fixes the expanded vendored-host inventory and compares it with the staged `dist/host` files.
- `guides/scaffold.md` adds each root `tests/setup*.test.ts` proof to the reader-owned file list.
- `tmp/codex/sfixd-report.md` records this report.

The generated core-only manifest fixture, its digest, `tests/src/core/compilers.test.ts`, and `tests/src/bin/CLI.test.ts` did not move. Their selections do not reach `SOURCE_BROWSER_DEV_DEPENDENCIES`, and no owned expectation carried `^4.1.10`. The built browser-manifest probe printed `^4.1.11`. The focused compiler run exited 0 with 1 test file passed and 71 tests passed.

## Generated dependency survey

The full survey against `package.json` `devDependencies` is:

```text
BASE_DEV_DEPENDENCIES
  @orkestrel/guide ^0.0.12 — match
  @orkestrel/scaffold ^0.0.44 — outside devDependencies
  @orkestrel/test ^0.0.7 — match
  @types/node ^26.2.0 — match
  oxfmt ^0.64.0 — match
  oxlint ^1.79.0 — match
  typescript ^6.0.3 — match
  vite ~8.2.1 — match
  vitest ^4.1.11 — match
DECLARATION_DEV_DEPENDENCIES
  @microsoft/api-extractor ^7.58.12 — match
  vite-plugin-dts ^5.0.3 — match
SOURCE_BROWSER_DEV_DEPENDENCIES
  @vitest/browser-playwright ^4.1.11 — match
  playwright ^1.62.1 — match
APP_DEV_DEPENDENCIES
  @orkestrel/contract ^0.0.12 — outside devDependencies
APP_BROWSER_DEV_DEPENDENCIES
  @vitest/browser-playwright ^4.1.11 — match
  playwright ^1.62.1 — match
  @orkestrel/html ^0.0.4 — match
  @vitejs/plugin-vue ^6.0.8 — outside devDependencies
  vue ^3.5.40 — outside devDependencies
  vue-tsc ^3.3.7 — outside devDependencies
APP_SERVER_DEV_DEPENDENCIES
  @orkestrel/emitter ^0.0.7 — outside devDependencies
  @orkestrel/middleware ^0.0.13 — outside devDependencies
  @orkestrel/router ^0.0.10 — outside devDependencies
  @orkestrel/server ^0.0.13 — outside devDependencies
SHOWCASE_DEV_DEPENDENCIES
  vite-plugin-singlefile ^2.3.3 — outside devDependencies
```

The scaffold self-pin is checked against the manifest version by its dedicated assertion. The generated application packages marked outside `devDependencies` are declared in this package's runtime `dependencies` or are generated-only development packages.

## Plant-and-remove proofs

### Generated dependency divergence

Plant: replace `SOURCE_BROWSER_DEV_DEPENDENCIES['@vitest/browser-playwright']` value `^4.1.11` with `^4.1.10` by using `apply_patch`.

Command:

```sh
npx vitest run tests/src/core/constants.test.ts --config vite.config.ts --project src:core
```

Red reading: exit 1; 1 test file failed; 1 test failed and 4 passed. The widened assertion reported the source-browser and app-browser copies against manifest `^4.1.11`.

Remove: reverse the exact patch and restore `^4.1.11`.

Green reading: exit 0; 1 test file passed; 5 tests passed.

### TypeScript ceiling

Plant: replace `BASE_DEV_DEPENDENCIES.typescript` value `^6.0.3` with `^7.0.0` by using `apply_patch`.

Command:

```sh
npx vitest run tests/src/core/constants.test.ts --config vite.config.ts --project src:core -t "keeps generated TypeScript below 7"
```

Red reading: exit 1; 1 test file failed; 1 test failed and 4 skipped. `matchesRange('^7.0.0', '7.0.2')` returned `true` against the required `false`.

Remove: reverse the exact patch and restore `^6.0.3`.

Green reading: exit 0; 1 test file passed; 1 test passed and 4 skipped.

### Staged host inventory

The brief's permitted build command was:

```sh
npm run build
```

Build reading: exit 0; `build-host` staged 108 files into `dist/host`.

Plant: add `dist/host/agents/skills/enterprise-bootstrap/references/sfixd-stray.md` with the exact content `stray\n` by using `apply_patch`.

Command:

```sh
npx vitest run tests/distribution.test.ts --config vite.config.ts --project distribution -t "stages exactly the declared vendored host inventory"
```

Red reading: exit 1; 1 test file failed; 1 test failed and 3 skipped. The diff named `agents/skills/enterprise-bootstrap/references/sfixd-stray.md` as the extra staged file.

Remove: delete that exact file by using an `apply_patch` `Delete File` patch. The file was placed in an existing directory, so no directory removal was needed.

Green reading: exit 0; 1 test file passed; 1 test passed and 3 skipped.

## Blocked `.agents` changes

The normal patch attempt was rejected with this exact text:

```text
patch rejected: writing outside of the project; rejected by user approval settings
```

The exact replacement text for `.agents/orchestration.md` is:

```md
   **When a bench sandbox denies a loopback listener, `listen` fails `EPERM` on every address.** A
   subject needing a real local server is unmeasurable inside the bench. Name the limit in the brief
   before dispatch. Have the unit report the reading as an observation naming the exact command.
   Take the proof on the host.
   **When a brief assigns a bench unit a path outside the obvious source tree, name the write limit
   in the brief.** If the sandbox rejects the patch, the unit stops and reports the rejection. Never
   find another write mechanism.
```

The exact replacement line for `.agents/skills/enterprise-bootstrap/SKILL.md` is:

```md
3. **Bootstrap's own extension points.** Component `--bs-{component}-*` variables and the utilities API, when a real gap remains after the component-class and utility tiers.
```

The exact replacement line for `.agents/skills/enterprise-bootstrap/references/components.md` is:

```md
`role="alertdialog"` for a destructive confirm, `role="dialog"` otherwise; `aria-labelledby` points at the heading. The element's own `close` event is where the host clears the state that opened it, so Esc and the buttons all close by one path. The scrim is the UA's `::backdrop`, which no Bootstrap class touches — restyling it requires the custom-CSS tier.
```

## Acceptance criteria

### Generated dependency comparison

Command:

```sh
node --disable-warning=ExperimentalWarning --experimental-strip-types -e "Promise.all([import('./src/core/constants.ts'),import('./package.json',{with:{type:'json'}})]).then(([m,p])=>{const d=p.default.devDependencies;for(const [s,x] of Object.entries({BASE_DEV_DEPENDENCIES:m.BASE_DEV_DEPENDENCIES,DECLARATION_DEV_DEPENDENCIES:m.DECLARATION_DEV_DEPENDENCIES,SOURCE_BROWSER_DEV_DEPENDENCIES:m.SOURCE_BROWSER_DEV_DEPENDENCIES,APP_DEV_DEPENDENCIES:m.APP_DEV_DEPENDENCIES,APP_BROWSER_DEV_DEPENDENCIES:m.APP_BROWSER_DEV_DEPENDENCIES,APP_SERVER_DEV_DEPENDENCIES:m.APP_SERVER_DEV_DEPENDENCIES,SHOWCASE_DEV_DEPENDENCIES:m.SHOWCASE_DEV_DEPENDENCIES}))for(const [n,r] of Object.entries(x))if(d[n]!==undefined&&d[n]!==r)console.log(s+': '+n+' '+r+' != '+d[n])})"
```

Reading: exit 0; divergence count 0. Exact output:

```text
```

### Widened comparison control

Reading: the generated dependency divergence proof above exits 1 with 1 failed test under the plant and exits 0 with 5 passed tests after removal.

### TypeScript ceiling control

Reading: the TypeScript ceiling proof above exits 1 with 1 failed test under the plant and exits 0 with 1 passed test after removal.

### Staged inventory control

Reading: the staged host inventory proof above exits 1 with 1 failed test under the plant and exits 0 with 1 passed test after removal.

### Lint

Command: `npm run lint:check`.

Reading: exit 0. Oxlint emitted no warning or error tally.

### Typecheck

Command: `npm run check`.

Reading: exit 0. The root, `src:core`, `src:server`, and `src:bin` TypeScript checks completed; TypeScript emitted no diagnostic tally.

### Core tests

Command: `npx vitest run --config vite.config.ts --project src:core`.

Reading: exit 1; 1 test file failed and 7 passed; 6 tests failed and 310 passed. Every failure is a denied child-process reading in `tests/src/core/templates.test.ts`, recorded under Observations. The exact criterion could not close in this sandbox.

### Guide tests

Command: `npx vitest run --config vite.config.ts --project guides`.

Reading: exit 0; 1 test file passed; 10 tests passed.

## Observations

- The `.agents` patch attempt was denied with `patch rejected: writing outside of the project; rejected by user approval settings`. The assigned orchestration and enterprise-bootstrap prose remains unchanged on disk.
- `configuration templates > is an oxfmt fixed point across the emitted content corpus` could not spawn `/opt/node22/bin/node`; `execFileSync` reported `spawnSync /opt/node22/bin/node EPERM` at `tests/src/core/templates.test.ts:401`.
- `emitted workspaces under their own gates > emits browser configurations their own typecheck accepts` received `Error: spawnSync /opt/node22/bin/node EPERM` from `checkTypes` at `tests/src/core/templates.test.ts:717`.
- `emitted browser resolver > publishes every name the emitted root configuration is built on` could not spawn `/opt/node22/bin/node`; `driveResolver` reported `EPERM` at `tests/src/core/templates.test.ts:246`.
- `emitted browser resolver > ranks an operator override above every browser it could discover` reached the same denied `driveResolver` spawn at `tests/src/core/templates.test.ts:246`.
- `emitted browser resolver > reads a pinned-revision miss as a fallthrough rather than as absence` reached the same denied `driveResolver` spawn at `tests/src/core/templates.test.ts:246`.
- `emitted browser resolver > keeps Playwright launch defaults when the pinned revision is installed` reached the same denied `driveResolver` spawn at `tests/src/core/templates.test.ts:246`.

## Unclosed work

- B4 and B7 remain blocked because the sandbox refused every assigned `.agents/` write. The exact replacements are recorded above.
- The exact `src:core` acceptance command remains red only where Vitest tries to spawn a process beneath the child this sandbox permits. The command collected every intended core test, and all unaffected readings passed, but host execution is required to close the denied template proofs.