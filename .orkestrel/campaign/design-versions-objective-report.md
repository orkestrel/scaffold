# Ruled design

## Derivation mechanism

**Recommendation: use candidate (a), an ESM JSON import attribute in `src/core/constants.ts`.**

Import `../../package.json` with `{ type: 'json' }`. Derive the scaffold self-pin from `manifest.version`. Derive installed tool rows from `manifest.dependencies` and `manifest.devDependencies`. Keep `blueprintToDevDependencies(blueprint)` unchanged.

The measured toolchain supports this design:

- The scoped core TypeScript configuration accepted the JSON import with `lib: ["ESNext", "WebWorker"]` and `types: []`.
- The configured Vitest probe project resolved and executed the import.
- Vite 8.2.2 inlined the JSON into the ES and CommonJS bundles. No runtime JSON import remained.
- `vite-plugin-dts` and API Extractor emitted a declaration containing only the typed export. No JSON reference escaped into the declaration bundle.
- The built ES and CommonJS entries returned the imported version.
- The environment-boundary plugin permits workspace-root data. The import introduces no Node, DOM, browser, or server capability.
- The import adds about 5 kB of unminified manifest data to the core bundle under the measured Vite transform. The package already publishes `package.json`, so this exposes no private package metadata.

**Lose candidate (b), compiler-supplied manifest or version input.** It makes the dependency explicit, but it lets a caller supply a manifest that is not scaffold’s manifest. It also breaks `blueprintToDevDependencies`, `blueprintToManifest`, `Compiler.compile`, `Compiler.audit`, their examples, and every source and test caller. Core callers would need host-owned information merely to project a blueprint.

**Lose candidate (c), build-time define replacement.** Vite can replace the token in a production build, but scoped `tsc`, source-mode Vitest, direct source consumers, and API Extractor do not receive that replacement automatically. Making it work requires repeated declarations and define configuration across build and test projects. Those copies become competing authorities.

For registry-resolved `@orkestrel/*` ranges, keep the network outside core. Before `new` materializes a plan, apply the resolved ranges to its manifest artifact through a pure range-replacement compiler and recompute the plan hash. Do not create the workspace and rewrite its manifest in a later transaction.

## Instrument disposition

Retire the source-level self-pin equality test. The constant and the expected value would read the same manifest.

Retire the table-to-manifest equality sweep for installed rows. After derivation, it also compares one manifest reading with another.

Keep the TypeScript compatibility bound. Move it to the compiler projection: the emitted TypeScript range must name major 6 and must reject major 7. This is a compatibility rule, not a mirror rule.

Replace the retired mirrors with these instruments:

- The packed-artifact distribution test compares the built core self-pin with the installed package’s exported `package.json`. Its negative control changes the installed manifest copy without rebuilding and must report a mismatch.
- A compiler test proves the emitted manifest receives the imported toolchain ranges. Its negative control supplies an expected range from another major and must disagree.
- A range-policy test proves every foreign scaffold manifest row uses canonical `^MAJOR` syntax. Its negative control uses `~8.2.2` and must fail.
- The existing TypeScript bound uses a major-7 candidate as its negative control.
- The production core build remains the instrument for Vite inlining and API Extractor output. Scoped `tsc` cannot prove bundling, Vitest cannot prove declaration roll-up, and API Extractor cannot prove runtime loading.

The self-pin’s existing `ORKESTREL_RANGE_PATTERN` assertion remains useful only as a range-shape check. It does not prove artifact-to-manifest coherence.

## Foreign-range form

**Recommendation: store and emit canonical `^MAJOR` ranges. Copy canonical manifest rows verbatim.**

Change Vite from `~8.2.2` to `^8`. Normalize the other foreign rows in scaffold’s manifest to the same form, such as TypeScript `^6`, Vitest `^4`, and Oxfmt `^0`.

`^0` is important. Under npm semver, `^0.64.0` stops before `0.65.0`, while `^0` admits releases below `1.0.0`. A blanket caret over the full version tuple does not implement major-only floating for major zero.

Generated foreign rows derive verbatim from the canonical scaffold manifest when that row exists. Do not normalize again during emission. A second normalizer would hide a malformed authority and duplicate the manifest policy.

For checks, compare only the extracted major:

- `^6`, `^6.0.3`, `~6.4.0`, and `6.5.1` agree on major 6 when their syntax is otherwise admitted.
- A major-7 TypeScript range fails.
- Minor, patch, and operator differences do not create drift.
- This comparison does not use `matchesRange`; that helper answers semver admission, which is a different question.

**Lose verbatim copying from the manifest’s present range forms.** It would preserve Vite’s tilde and full-version caret ranges.

**Lose normalization to `^MAJOR.MINOR.PATCH`.** It violates major-only floating for foreign major-zero packages.

**Lose full-range equality checks.** They reject differences the policy expressly permits.

## Registry routing for `@orkestrel/*`

No `verify` verb exists in the CLI. `#lookup` and `#pin` are private methods. No source caller invokes `matchesRange`.

The verbs behave as follows today and require these changes:

| Verb | Present behavior | Required behavior | Registry unavailable |
|---|---|---|---|
| `new` | Resolves only packages named by `--deps`; generated toolchain rows come from constants | Resolve every planned `@orkestrel/*` row across dependencies, development dependencies, and peers before materialization; compile the resolved ranges into the plan | Return `FETCH`, exit 1, and write nothing |
| `audit` | Performs no registry read; checks planned package membership only; ignores every range difference | Look up every declared `@orkestrel/*` row and report a release verdict; drift means the declared string differs from `^${dist-tags.latest}` | Report failed release verdicts, exit 1, and write nothing |
| `repair` | Performs no registry read and never edits `package.json` | Resolve before any write, repair planned files, and call `declare` with the complete resolved set | Return `FETCH`, exit 1, and write nothing |
| `catalog` | Reads organization metadata and guides; never declares ranges | Reuse the catalog packuments to derive release verdicts for the target’s declared set, then declare the complete resolved set with the catalog write | Return `FETCH`, exit 1, and write nothing |
| `overwrite` | Looks up declared rows and rewrites each found row; a per-package failure can leave a stale row without setting `note` | Require a complete release set before calling `declare`; never apply a partial pin set | Preserve the completed offline repair and deletion work, write no ranges, set `note`, and exit 1 |

Exact comparison is required for `@orkestrel/*`. A declared `^0.1.0` is stale when the registry reports `0.1.2`, even though npm semver admits that release.

Extend the CLI JSON results with `releases` for `audit`, `repair`, and `catalog`. `overwrite` already carries it. This makes a failed lookup, an exact mismatch, and a completed rewrite observable without parsing prose.

## Non-installed literals

**Recommendation: separate supported-major seeds from registry authority.**

The brief’s premise is inaccurate for `@orkestrel/contract` and `@orkestrel/html` in the measured tree:

- `@orkestrel/contract` is installed under `dependencies`.
- `@orkestrel/html` is installed under `devDependencies`.

Derive those rows from the manifest. Derive `@orkestrel/emitter` the same way.

Treat the Vue family and `vite-plugin-singlefile` as supported-major declarations:

- `@vitejs/plugin-vue`: `^6`
- `vue`: `^3`
- `vue-tsc`: `^3`
- `vite-plugin-singlefile`: `^2`

Npm selects the minor and patch within those majors. Scaffold stores no competing patch authority.

Treat uninstalled fleet rows such as `@orkestrel/middleware`, `@orkestrel/router`, and `@orkestrel/server` as registry-resolution candidates. Their table values are release-time offline seeds for the pure library. Every CLI verb replaces or measures them against the registry before returning a clean verdict.

**Lose adding generation-only packages to `devDependencies`.** That installs tools scaffold does not execute and misstates their dependency role.

**Lose frozen foreign minor and patch literals.** They create an authority the major-only policy rejects.

**Lose frozen `@orkestrel/*` literals as verb authority.** A `0.0.x` caret is an exact release pin and cannot stay fresh without the registry.

## Blast radius

The public `blueprintToDevDependencies` signature remains unchanged. Its consumers require value updates, not call-shape updates.

Apply these file-level changes:

| File | Change |
|---|---|
| `package.json` | Convert foreign ranges to `^MAJOR`; retain exact fleet pins |
| `package-lock.json` | Regenerate root dependency specifiers after the manifest changes |
| `src/core/constants.ts` | Import `package.json`; derive self and installed rows; convert generation-only foreign rows to supported-major ranges |
| `src/core/helpers.ts` | Add the tested range-to-major projection used by CLI foreign checks |
| `src/core/compilers.ts` | Add the pure manifest-range replacement and plan re-hash path used by `new`; keep `blueprintToDevDependencies` unchanged |
| `src/server/Materializer.ts` | Route `declare` through the shared range replacement instead of keeping a separate text rewrite |
| `src/bin/types.ts` | Add release evidence to audit, repair, and catalog CLI result shapes |
| `src/bin/helpers.ts` | Derive CLI drift from exact fleet release verdicts |
| `src/bin/CLI.ts` | Make audit and repair registry-aware; route catalog through its packument evidence; require complete pin sets; define the offline outcomes |
| `tests/src/core/constants.test.ts` | Remove the tautological mirror cases and move the surviving compatibility proof; delete the file if no independent case remains |
| `tests/src/core/helpers.test.ts` | Cover major extraction and manifest range replacement |
| `tests/src/core/compilers.test.ts` | Update tool ranges, manifest fixture expectations, and the manifest digest; prove resolved plan emission |
| `tests/src/core/templates.test.ts` | Update the showcase supported-major expectation |
| `tests/src/core/fixtures/setup-false-manifest.txt` | Regenerate the emitted manifest fixture |
| `tests/src/server/Materializer.test.ts` | Prove dependencies, development dependencies, and peers rewrite through the shared mechanism |
| `tests/src/bin/helpers.test.ts` | Prove exact fleet release drift and failed lookup drift |
| `tests/src/bin/CLI.test.ts` | Cover registry routing and offline behavior for every verb |
| `tests/distribution.test.ts` | Add built-core versus installed-manifest coherence |
| `guides/scaffold.md` | Document range authority, release evidence, verb writes, and offline behavior |
| `tests/guides.test.ts` | Add parity for any exported range helper and execute its guide example |

The generated manifest fixture and digest move because the self-pin, Vite range, and foreign tool ranges change.

The guide is a `HOST_PATHS` member. Updating `guides/scaffold.md` changes the published `dist/host` surface after `build:host`. No version assertion belongs in the vendored `tests/config.test.ts`; that file remains unchanged.

## Test list and negative controls

| Instrument | Positive claim | Negative control |
|---|---|---|
| Core scoped `tsc` | The JSON import resolves without host globals | A missing JSON module fails resolution |
| Core Vite build | Package metadata is inlined into ES and CommonJS output | An output search for an import attribute or external JSON load must fail |
| Vitest core/probe transform | Source-mode execution reads the JSON value | A false manifest version fails the assertion |
| API Extractor roll-up | Public declarations contain typed exports and no JSON dependency | A declaration containing the JSON module specifier fails |
| Distribution test | Packed core self-pin equals packed `package.json` | Mutate the installed manifest copy without rebuilding |
| Compiler projection | Foreign rows emit `^MAJOR`; self emits `^<package version>` | Use a tilde row or another major |
| TypeScript bound | Generated TypeScript stays on major 6 | Substitute major 7 |
| Range helper | Accepted foreign forms project to their major | Give an invalid range and a different-major range |
| Materializer declaration | Fleet rows rewrite in dependencies, development dependencies, and peers while other bytes stay fixed | Supply an undeclared fleet name and verify no write |
| `new` CLI | Every planned fleet row uses the fixture registry’s `dist-tags.latest` | Omit one required packument and verify exit 1 with an empty target |
| `audit` CLI | A stale exact fleet pin produces drift and release evidence | Serve the declared release and verify clean |
| `repair` CLI | A stale fleet pin is rewritten with planned file repair | Refuse one lookup and verify no file or manifest write |
| `catalog` CLI | Catalog metadata and declared fleet pins use the same packument evidence | Fail a declared package row and verify no catalog or manifest write |
| `overwrite` CLI | A complete release set rewrites every fleet section | Fail one package lookup and verify offline work persists, no range changes, `note` is present, and exit is 1 |
| Foreign target check | A same-major foreign range is accepted regardless of minor, patch, or operator | Change TypeScript to major 7 and verify refusal |