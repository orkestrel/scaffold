## Ruling

Land direction E in `@orkestrel/scaffold@0.0.65`: raise the Node floor to `>=22.18.0`, emit a fixed npm floor of `>=11.6.0`, and make generated workspaces enforce that npm floor with a birth-owned `.npmrc` containing `engine-strict=true`. Keep `Blueprint.engines` as the Node range string; npm compatibility belongs to scaffold’s fixed toolchain policy, not caller configuration. Include the S4 capability guard because this host must produce a green release gate. Defer S3 to its own test-runner design unit.

## Per-direction verdict

- **A — reject as framed.** `engines.npm: ">=11.6.0"` alone exits `0` with `EBADENGINE` under an older npm, after which npm still reaches the Arborist crash. A nested `Blueprint.engines` shape would break callers without adding needed control. A fixed npm constant plus enforcement is sufficient.

- **B — valid but excessive.** `>=26.0.0` closes S1 and S2 because Node 26 bundles npm `11.12.1`. It excludes Node 22 and Node 24 even though Node `22.18.0` can load the vendored TypeScript plugin. The package does not need that compatibility loss.

- **C — reject.** `>=22.18.0` repairs plugin loading but leaves every default npm bundled with Node 22 and Node 24 below the measured clean boundary. A workaround does not close an install contract.

- **D — reject its lockfile and pinning variants.** Exact dependency versions still crash. A universal lockfile cannot represent the blueprint axes, caller dependencies, live range floors, and platform-dependent resolution. Producing a lockfile after generation already requires an npm that crosses the failing boundary. An `.npmrc` becomes sound only when paired with an npm floor.

- **E — accept.** Combine Node `>=22.18.0`, fixed npm `>=11.6.0`, and `engine-strict=true`. The older npm then refuses with `EBADENGINE` before dependency resolution instead of crashing. npm `11.6.0` admits the manifest and resolves the measured graph. Make `.npmrc` birth-owned so `repair` does not impose strict dependency-engine checks on workspaces whose older manifests lack the npm floor.

- **F — retain as a narrower successor, not the release fix.** npm `10.9.7` implements `devEngines.packageManager`, checks it before Arborist, and reports `EBADDEVENGINES`. The installed checker rejects npm `10.9.7` and `11.5.0`, and admits `11.6.0`. This mechanism avoids applying `engine-strict` to dependencies. Do not make `0.0.65` depend on it until the npm `10.9.3` bundled with Node `22.18.0` is driven end to end.

- **S3 — defer.** Replacing the `&&` chains needs a cross-platform runner design and later adoption in scaffold, toolbox, and ollama. The retained per-project release readings already close this release’s discovery gap.

- **S4 — include.** Add a named runtime capability probe for IPv4-mapped IPv6 loopback. Run the redirected-version case where the probe succeeds; skip it with that mechanism where the host returns `EAFNOSUPPORT`. Do not replace the address with `127.0.0.1`, which can start the installed Ollama daemon.

## Contract

No `*/types.ts` shape changes. The authoritative declaration remains:

```ts
interface Blueprint {
	readonly engines: string
}
```

The generated manifest contract becomes:

```ts
engines: {
	node: blueprint.engines,
	npm: DEFAULT_NPM_ENGINE,
}
```

The generated workspace also receives this birth-owned file:

```ini
engine-strict=true
```

Set these constants:

```ts
export const MINIMUM_NODE_VERSION = '22.18.0'
export const MINIMUM_NPM_VERSION = '11.6.0'
export const DEFAULT_ENGINES = `>=${MINIMUM_NODE_VERSION}`
export const DEFAULT_NPM_ENGINE = `>=${MINIMUM_NPM_VERSION}`
```

`ENGINES_PATTERN` already admits `>=22.18.0`, `>=26.0.0`, and the syntax `>=11.6.0`. `matchesEngines` must remain Node-specific: the executed check returned `true` for the Node candidates and `false` for `>=11.6.0` because it compares against `MINIMUM_NODE_VERSION`. After the floor change it must reject `>=22.12.0`.

The change moves these consumers:

- `createBlueprint` returns the raised Node default.
- `blueprintToQuestions` rejects explicit Node floors below `22.18.0`.
- `blueprintToManifest` emits the Node and npm ranges.
- `blueprintToConfigArtifacts` emits the birth-owned `.npmrc`.
- Scaffold’s `package.json` and root lockfile carry the same floors and enforcement.
- Manifest snapshots, helper cases, factory cases, guide transcription, `README.md`, and `guides/scaffold.md` move to the declared values.
- TypeScript callers keep the same object shape. A caller that explicitly supplies a lower Node floor receives a blocking question.

## Units

- **Floor and manifest unit** — Own `src/core/constants.ts`, `src/core/compilers.ts`, `src/core/templates.ts`, `package.json`, `package-lock.json`, `tests/src/core/helpers.test.ts`, `tests/src/core/factories.test.ts`, `tests/src/core/compilers.test.ts`, and the generated-manifest fixtures. Accept when the Node boundary rejects `>=22.12.0`, admits `>=22.18.0`, every generated manifest emits npm `>=11.6.0`, and every generated workspace plans the birth-owned strict configuration.

- **Install-boundary proof unit** — Own `tests/distribution.test.ts` and any generated distribution-proof text that must launch the admitted npm. Accept when a lockfile-free generated workspace under npm `10.9.7` and `11.5.0` exits with `EBADENGINE` before any `edgesOut` stack, while npm `11.6.0` installs it at exit `0`. Keep the exact-pinning crash as the negative control.

- **Mapped-loopback capability unit** — Own `tests/setupServer.ts`, `tests/setupServer.test.ts`, and `tests/src/server/helpers.test.ts`. Accept when an IPv6-less host skips the redirected-version case for the named `EAFNOSUPPORT` mechanism, an IPv6-capable host reaches `/api/version` and refuses the `302`, and no case starts a real Ollama daemon.

- **Documentation and roadmap unit** — Own `README.md`, `guides/scaffold.md`, `tests/guides.test.ts`, and `ROADMAP.md`. Accept when the executable requirement, blueprint default, generated manifest, enforcement behavior, and guide transcription agree; replace the stale npm-11 roadmap question with the `11.6.0` boundary and give S3 its successor carrier.

## Unknowns

- **U1 — resolved.** `engines.npm` warns and exits `0` by default. With `engine-strict=true`, npm exits `1` with `EBADENGINE`. This rejects A as framed and makes enforcement mandatory.

- **U2 — resolved.** Exact pins do not avoid the Arborist crash. Pinning is not a fix.

- **U3 — resolved.** Raising the Node floor is breaking for a caller on Node `22.12.0` through `22.17.x`. The executed semver check showed `^0.0.64` admits `0.0.64` and refuses `0.0.65`. Fleet consumers therefore receive the change only after a deliberate re-pin. The `0.0.65` version is the fleet convention’s valid breaking boundary.

- **`devEngines` coverage — unresolved at the exact Node floor.** The retained npm `10.9.7` source and checker establish the mechanism there. Drive npm `10.9.3` before replacing direction E with direction F.

## Risk

Direction E breaks workspaces that rely on Node `22.12.0` through `22.17.x`. A workspace using Node 22 or Node 24 with its bundled npm must upgrade npm to `11.6.0` or later before installation. `engine-strict=true` can also reject a manually added dependency whose declared engine range excludes the host, even when the developer expected npm to warn.

A direct TypeScript caller notices no property-shape change. A caller that re-pins to `0.0.65` while retaining an explicit lower `Blueprint.engines` value receives a blocking question. A registry consumer using a range wider than the fleet’s caret convention can receive the breaking floor without a deliberate re-pin.

The mapped-loopback redirect case remains unexecuted on an IPv6-less host, but the skip names the missing capability and a capable host still drives the assertion.

The checkout is at `1b510e9`, while the brief names `c439685`. The intervening diff contains campaign evidence and release records; the decision-bearing source files are unchanged.