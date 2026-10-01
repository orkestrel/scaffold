Veneer adopted the packed scaffold `0.0.82` release on 2026-10-01. Every prescribed gate exited 0. The final offline audit reports no stale selected artifact and no blocking question. `ROADMAP.md` § Scaffold propagation closes its items with the release and adoption date. No commit or publication occurred.

**Phase and installation.** Phase: `pack`. Checkout: `C:/Users/mikes/WebstormProjects/veneer`. Removed the verified installed `node_modules/@orkestrel/scaffold` directory through `rmSync` in a TypeScript file under `tmp/units/`, then ran:

```text
npm install --save-dev C:/Users/mikes/WebstormProjects/scaffold/tmp/orkestrel-scaffold-0.0.82.tgz --ignore-scripts
added 1 package, and audited 178 packages in 3s
found 0 vulnerabilities
```

Installation exited 0. The manifest range is `^0.0.82`; the lockfile retains npm's tarball resolution and integrity. Registry replacement remains for the registry phase.

The installed binary contains the guard repair. The reading at `node_modules/@orkestrel/scaffold/dist/bin/main.js:2133` is:

```js
const faces = /* @__PURE__ */ new Set([...blueprintToSheets(blueprint).map((name) => `src:${name}`), ...blueprintToFaces(blueprint).flatMap(({ name, axes }) => axes.map((axis) => `${axis}:${name}`))]);
const wrappers = /* @__PURE__ */ new Map();
for (const artifact of blueprintToConfigArtifacts(blueprint)) {
	const match = /^configs\/(src|app)\/vite\.([^.]+)\.config\.ts$/u.exec(artifact.path);
	if (match === null) continue;
	const project = `${match[1]}:${match[2]}`;
	if (faces.has(project)) wrappers.set(artifact.path, project);
}
```

The reachability walk calls `scriptToInvocations(script, wrappers)` at line 2153. One repair succeeded with Veneer's authored wrapper commands retained.

**Audit readings.** Commands used `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline --json`. These JSON readings omit aligned findings, hexadecimal payloads, and release lookup rows. Complete outputs remain in the named logs under veneer's `tmp/units/`.

Before adoption, `propagation-9-pack-audit-before.log`, exit 1:

```json
{
  "findings": [
    {
      "path": "tests/setupPolicy.ts",
      "group": "tests",
      "ownership": "content",
      "drift": "stale"
    },
    {
      "path": "tests/config.test.ts",
      "group": "tests",
      "ownership": "content",
      "drift": "stale"
    }
  ],
  "questions": [
    {
      "field": "guides",
      "message": "The mirror at guides/scaffold.md differs from the hosted guide. Run catalog to refresh it.",
      "blocking": false
    },
    {
      "field": "scripts",
      "message": "The manifest at . declares planned scripts with differing values: test:src:vue, test:src:styles, test:src:bootstrap, test:src:tailwindcss, test:app:vue. Keep each declared value unchanged or replace them with the planned values: \"test:src:vue\" declares \"npm run build:src:browser && npm run build:src:vue && vitest run --config configs/src/vite.vue.config.ts --no-cache --reporter=dot\"; planned \"vitest run --config vite.config.ts --no-cache --reporter=dot --project src:vue\". \"test:src:styles\" declares \"npm run build:src:styles && vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot\"; planned \"npm run build:src:styles && vitest run --config vite.config.ts --no-cache --reporter=dot --project src:styles\". \"test:src:bootstrap\" declares \"npm run build:src:bootstrap && vitest run --config configs/src/vite.bootstrap.config.ts --no-cache --reporter=dot\"; planned \"npm run build:src:bootstrap && vitest run --config vite.config.ts --no-cache --reporter=dot --project src:bootstrap\". \"test:src:tailwindcss\" declares \"npm run build:src:tailwindcss && vitest run --config configs/src/vite.tailwindcss.config.ts --no-cache --reporter=dot\"; planned \"npm run build:src:tailwindcss && vitest run --config vite.config.ts --no-cache --reporter=dot --project src:tailwindcss\". \"test:app:vue\" declares \"vitest run --config configs/app/vite.vue.config.ts --no-cache --reporter=dot\"; planned \"vitest run --config vite.config.ts --no-cache --reporter=dot --project app:vue\".",
      "blocking": false
    }
  ],
  "provenance": {
    "versions": "floor",
    "host": "floor"
  }
}
```

After repair, catalog refresh, and restoration of the required manifest range, `propagation-9-pack-audit-final.log`, exit 0:

```json
{
  "findings": [],
  "questions": [
    {
      "field": "guides",
      "message": "The mirror at guides/guide.md differs from the hosted guide. Run catalog to refresh it.",
      "blocking": false
    },
    {
      "field": "scripts",
      "message": "The manifest at . declares planned scripts with differing values: test:src:vue, test:src:styles, test:src:bootstrap, test:src:tailwindcss, test:app:vue. Keep each declared value unchanged or replace them with the planned values: \"test:src:vue\" declares \"npm run build:src:browser && npm run build:src:vue && vitest run --config configs/src/vite.vue.config.ts --no-cache --reporter=dot\"; planned \"vitest run --config vite.config.ts --no-cache --reporter=dot --project src:vue\". \"test:src:styles\" declares \"npm run build:src:styles && vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot\"; planned \"npm run build:src:styles && vitest run --config vite.config.ts --no-cache --reporter=dot --project src:styles\". \"test:src:bootstrap\" declares \"npm run build:src:bootstrap && vitest run --config configs/src/vite.bootstrap.config.ts --no-cache --reporter=dot\"; planned \"npm run build:src:bootstrap && vitest run --config vite.config.ts --no-cache --reporter=dot --project src:bootstrap\". \"test:src:tailwindcss\" declares \"npm run build:src:tailwindcss && vitest run --config configs/src/vite.tailwindcss.config.ts --no-cache --reporter=dot\"; planned \"npm run build:src:tailwindcss && vitest run --config vite.config.ts --no-cache --reporter=dot --project src:tailwindcss\". \"test:app:vue\" declares \"vitest run --config configs/app/vite.vue.config.ts --no-cache --reporter=dot\"; planned \"vitest run --config vite.config.ts --no-cache --reporter=dot --project app:vue\".",
      "blocking": false
    }
  ],
  "provenance": {
    "versions": "floor",
    "host": "floor"
  }
}
```

The intermediate post-catalog audit also exited 0. Every named vendored artifact is `aligned`; the questions are advisory. The scaffold guide question is closed.

**Repair and behaviour reading.** `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline --json` exited 0. Its write and removal fields are:

```json
{
  "target": ".",
  "written": ["tests/setupPolicy.ts", "tests/config.test.ts"],
  "removed": [],
  "provenance": {"versions": "floor", "host": "floor"}
}
```

Its nested audit reports no non-aligned finding and the same guide/script questions as the pre-adoption reading. Other planned paths were skipped, including the existing Chromium entry proof. The complete JSON, including the skipped paths, remains in `tmp/units/propagation-9-pack-repair.log`.

The per-file reading covers this repair and the generated changes inherited from the earlier unit runs. Required behaviour missing from the release: none observed.

| File | Behaviour carried by the release |
| --- | --- |
| `tsconfig.json` | Aliases for sheet faces and Vue on both axes, including the published Vue specifier. |
| `vite.config.ts` | Shared sheet composition, selected face projects, browser dependency optimization, Node conformance setup, browser setup proofs, sheet integration, and mode-aware showcase/journey factories. |
| `configs/src/vite.core.config.ts` | Core external resolution through `resolveExternal`. |
| `configs/app/vite.showcase.config.ts` | Thin `appShowcase(mode)` wrapper; root pages and final-page stamping reside in the generated factory. |
| `configs/helpers.ts` | Vue boundary classification, `resolveExternal`, browser declaration rewriting, application selection, and digest/stamp helpers. |
| `.oxlintrc.json` | Anchored root override, lookaround-free restrictions, Vue boundaries, and the executable boundary. |
| `.prettierignore` | Excludes `showcase/`; already aligned and unchanged. |
| `tests/config.test.ts` | Source-marker face enumeration, wrapper collection, packaging/setup/mode assertions, real lint controls, declaration rewrite controls, stamp controls, and authored sheet prelude/setup composition support. Restored by this repair. |
| `tests/setupPolicy.ts` | Root setup mirror checks, sheet entry validation, source-derived face helpers, and authored-sheet/setup mutation fixtures. Restored by this repair. |
| `tests/policy.test.ts` | Runs the root setup mirror controls. |
| `configs/policy.ts` | Admits callbacks through the sanctioned literal argument/return positions; retains refusal controls. |
| `configs/src/vite.bootstrap.config.ts` | Named sheet composition, preserved layer ordering, scoped output cleanup, and invocation mode. |
| `configs/src/vite.tailwindcss.config.ts` | Named sheet composition, preserved layer ordering, scoped output cleanup, and invocation mode. |
| `configs/src/vite.styles.config.ts` | Builds from `sheet.ts` and composes the stylesheet proof project. |
| `configs/src/vite.themes.config.ts` | Separate themes output and sheet composition; styles build remains before themes. |
| `configs/src/vite.vue.config.ts` | Generated Vue composition, sibling externals, framework refusals, and core/browser declaration rewriting. |
| `configs/app/vite.vue.config.ts` | Thin generated `appVue()` wrapper with Chromium composition. |
| `configs/app/tsconfig.browser.json` | Framework-independent browser scope. |
| `configs/app/tsconfig.vue.json` | Includes the Vue proof sources. |
| `.agents/skills/orkestrel-journey/SKILL.md` | Uses “screen” for a rendered screen. |
| `.claude/skills/orkestrel-journey/SKILL.md` | Matching journey bridge description. |
| `package.json` | Retains the previously repaired guide command and showcase script; authored wrapper commands remain admitted. |

The existing authored migrations were preserved: `src/styles/index.ts` star-exports `sheet.ts`; `sheet.ts` imports `./index.scss`; the journey wrapper calls `appJourney(variant, VARIANTS, mode)`; the Node Vue artifact assertions reside in `tests/conformance.test.ts`. `tests/src/vue/index.test.ts` remains present and proves the empty entry in Chromium. Repair skipped it; no seed or manual recreation was needed.

Deleted divergences: stale bytes in `tests/setupPolicy.ts` and `tests/config.test.ts` were replaced only through repair. No content-owned file was edited by hand. No foreign wrapper required deletion, no file deletion occurred, and `overwrite` was not run. The audit confirms all eight roadmap-named vendored artifacts match the release's selected output.

**Catalog reading.** `node node_modules/@orkestrel/scaffold/dist/bin/main.js catalog --json` exited 0. The following JSON omits the membership catalogue and full guide bodies; the complete result is `tmp/units/propagation-9-pack-catalog.log`:

```json
{
  "target": ".",
  "written": [
    "guides/contract.md",
    "guides/guide.md",
    "guides/html.md",
    "guides/probe.md",
    "guides/scaffold.md",
    "guides/test.md",
    ".claude/agents/orkestrel.md",
    "package.json"
  ],
  "skipped": [],
  "removed": [],
  "mirrors": [
    {
      "name": "@orkestrel/contract",
      "path": "guides/contract.md",
      "lookup": "found"
    },
    {
      "name": "@orkestrel/guide",
      "path": "guides/guide.md",
      "lookup": "found"
    },
    {
      "name": "@orkestrel/html",
      "path": "guides/html.md",
      "lookup": "found"
    },
    {
      "name": "@orkestrel/probe",
      "path": "guides/probe.md",
      "lookup": "found"
    },
    {
      "name": "@orkestrel/scaffold",
      "path": "guides/scaffold.md",
      "lookup": "found"
    },
    {
      "name": "@orkestrel/test",
      "path": "guides/test.md",
      "lookup": "found"
    }
  ],
  "provenance": {
    "versions": "live",
    "guides": "live"
  }
}
```

Each mirror came from the live guide lookup for its named package: `contract`, `guide`, `html`, `probe`, `scaffold`, and `test`. The run reports live versions and live guides, with no floor fallback. Catalog also refreshed `.claude/agents/orkestrel.md`. The live guide mirror differs from the installed hosted guide, which explains the remaining non-blocking `guides/guide.md` advisory.

**Gate readings.** All commands were read without filtering. No convergence with mutating lint or format was needed. Test counts are measurements from this execution.

| Command | Exit | Tests |
| --- | --- | --- |
| `npm run format:check` | 0 | none |
| `npm run lint:check` | 0 | none; no boundary hits |
| `npm run check` | 0 | none |
| `npm run build` | 0 | none |
| `npm run build:showcase` | 0 | none |
| `npm run build:showcase:vue` | 0 | none |
| `npm test` | 0 | 425 passed, 2 skipped, 3 todo |
| `npm run test:distribution -- --mode release` | 0 | 10 passed, 5 skipped |
| `npm run format:check`, after roadmap edit | 0 | none |
| `npm run test:policy`, after roadmap edit | 0 | 118 passed, 1 skipped |
| `git diff --check` | 0 | none |

The full-chain project measurements are:

| Project or invocation | Passed | Skipped | Todo |
| --- | --- | --- | --- |
| Source core and browser | 2 | 0 | 0 |
| Bootstrap | 6 | 0 | 1 |
| Tailwind compatibility | 1 | 0 | 0 |
| Styles and themes | 15 | 0 | 1 |
| Source Vue | 1 | 0 | 0 |
| Application core and browser | 2 | 0 | 0 |
| Application Vue | 1 | 0 | 0 |
| Browser journeys | 2 | 0 | 0 |
| Vue journeys | 2 | 0 | 0 |
| Policy | 118 | 1 | 0 |
| Config | 198 | 1 | 0 |
| Node setup | 15 | 0 | 0 |
| Browser setup | 7 | 0 | 0 |
| Conformance | 8 | 0 | 1 |
| Integration | 35 | 0 | 0 |
| Guides | 12 | 0 | 0 |

The policy skip is the upstream substitution-table comparison whose rule file is absent locally. The config skip is the unavailable-extractor control because the extractor is installed. The todos remain product-roadmap work. Distribution's skips are runtime-condition cases excluded by the export mappings; release mode completed its registry and browser requirements.

The recorded launcher durations were 8888 ms for checking, 12274 ms for build, 51047 ms for the full test chain, and 13074 ms for distribution. Their complete stdout/stderr logs are `tmp/units/propagation-9-pack-{check,build,test,distribution}.{log,err}`. No cap fired. Gate failures: none.

**Showcase stamps.** Each rebuilt page contains exactly one stamp line, equal to the SHA-256 of the page with that line removed. Appending a byte to the unstamped page rejects the equality control.

| Page | Verified stamp |
| --- | --- |
| `showcase/browser.html` | `7a536b96ba990eb17ca8bce010a4ed5ebae5ef136f488afb362a7e589c382e1f` |
| `showcase/vue.html` | `b67b3e01d1a645c9343ea71676e1598d285b0ffe9f58dfaef3c7eb1dbeef9cee` |

Both builds reproduced the tracked pages without a Git diff. The readings remain in `tmp/units/propagation-9-pack-stamps.json`.

**Deviations and limits.** Catalog selected published scaffold `0.0.81` and rewrote the manifest range to `^0.0.81`. The required pack-phase range `^0.0.82` was restored without reinstalling or changing npm's lockfile. The repeated offline audit then exited 0. This is consistent with the packed version not yet being published.

Catalog's live `guides/guide.md` differs from the installed release's hosted guide. The advisory is retained rather than hand-editing a mirror. Its `blocking` value is false, and it is not a stale selected artifact.

The format/lint/check commands began before the last chunks of the full inherited config diff had been read. The diff reading completed before the full test chain. This ordering deviation changed no file or gate result.

The API Extractor compiler-version warning appeared during builds, and distribution emitted Node's existing `DEP0190` shell-option warning. Both commands exited 0. A progress message initially stated 426 passing tests; summing the recorded project readings gives 425, as reported here. Read-only path searches for a guessed scaffold driver location failed; no execution depended on them.

No required behaviour was found missing, no gate reddened, and no unowned repair was needed. The registry phase and publication are not performed. `guides/veneer.md` is unchanged. No subagent was spawned.

**Working-tree evidence.** Starting status matched the brief's allowed continuation set. The initial diff measured 26 tracked files, 1867 insertions, and 1040 deletions. Final status and the complete diff are recorded in `tmp/units/propagation-9-pack-final-status.txt`, `propagation-9-pack-final-stat.txt`, and `propagation-9-pack-final-diff.txt`; the starting counterparts are `propagation-9-pack-start-status.txt`, `propagation-9-pack-start-stat.txt`, and `propagation-9-pack-start.patch`.

The final diff measures 30 tracked files, 2449 insertions, and 1166 deletions. Untracked additions are `src/styles/sheet.ts` and the catalog-generated `guides/contract.md`, `guides/html.md`, `guides/probe.md`, and `guides/test.md`. The report is the only write made in the scaffold checkout. Acceptance remains with the Orchestrator.

