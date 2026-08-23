# Executed evidence — can a generated setup proof assert helper coverage?

Measured 2026-08-23 over every checkout available in this container: `scaffold`, `supervisor`,
`ollama`, `process`, `mcp`, and `terminal`. Instrument: `helpers.mjs`, committed beside this file.

The brief's candidate assertion for a generated `tests/setup.test.ts` was that every value
exported by the workspace's setup modules is referenced by at least one file under `tests/`. It
was put under a run rather than reasoned about. **It fails in every checkout measured, under both
the strong and the weak reading, and the largest block of failures sits in a file the target
cannot edit.**

## What the instrument does

It collects every `export function`, `export async function`, `export class`, `export const`, and
`export let` name from each `tests/**/setup*.ts` module that is not itself a test, then tests
whether that identifier appears anywhere else under `tests/`. The reference test is name-level, so
it over-approximates references: an unreferenced result is a real miss, while a referenced result
may be a coincidental name match. The true miss set is therefore at least what is reported.

Two readings were run. The strong reading excludes every setup module from the corpus, so a helper
used only by another setup module reads as unreferenced. The weak reading includes them, so only a
helper nothing else mentions at all reads as unreferenced. Both fail.

## The result under the weak reading

Every checkout carries unreferenced setup exports.

The vendored `tests/setupPolicy.ts` contributes the same block of unreferenced exports to every
package, byte for byte, because that file is vendored identically fleet-wide. It is the dominant
share of every package's misses, and in `process` it is the whole of them.

Package-owned misses, by module:

- **`scaffold`** — `tests/setup.ts` carries `TestSample`, `buildOverride`, `buildAudit`,
  `buildHooks`, `buildCompilerOptions`, `THROWING_KEYS_TRAP`, `THROWING_GET_TRAP`, and
  `THROWING_PROTOTYPE_TRAP`; `tests/setupServer.ts` carries `buildWorktree`,
  `buildMaterializerOptions`, `buildUpstreamOptions`, `HOST_DIRECTORY_PATHS`, `CORE_GENERATED`,
  `CORE_GENERATED_COUNT`, `matchesVacantRoot`, and `writeUpstreamReply`.
- **`supervisor`** — misses across `tests/setup.ts`, `tests/setupBrowser.ts`,
  `tests/setupBrowserServer.ts`, `tests/setupApplicationServer.ts`, `tests/setupGuides.ts`,
  `tests/setupService.ts`, `tests/app/setup.ts`, and
  `tests/app/browser/integration/setup.ts`.
- **`ollama`** — `tests/setupServer.ts` carries `isWireMessage`, `isWireTool`, and
  `INSATIABLE_TOOL_CHUNKS`; `tests/setupService.ts` carries `isOllamaReady` and `warmOllama`.
- **`mcp`** — misses across `tests/setup.ts`, `tests/setupBrowser.ts`, `tests/setupGlobal.ts`,
  `tests/setupServer.ts`, and the whole of `tests/setupConformance.ts`.
- **`terminal`** — `tests/setup.ts` carries `RecordingTerminal` and `createFormSchema`.
- **`process`** — no package-owned miss. Its only misses are the vendored `tests/setupPolicy.ts`.

## Why this is fatal to the candidate as an adoption gate

`repair` restores `tests/setupPolicy.ts`, so a target cannot close a finding against it by
editing the file. A generated proof asserting helper coverage would hand every adopting target a
gate it cannot pass and cannot fix, and `prepublishOnly` would then refuse to publish. That is
exactly the class of unsatisfiable gate the `entail.mjs` probe was built to rule out before the
distribution proof shipped.

Scoping the assertion to package-owned setup modules alone does not rescue it. Under that
narrowing `process` passes and `scaffold`, `supervisor`, `ollama`, `mcp`, and `terminal` all still
fail — including scaffold itself, which would ship a release whose own gate is red.

## What the exported-but-unreferenced helpers actually are

`AGENTS.md` § Design laws states "Export and test reusable logic. No hidden module helpers or
declarations." A setup module obeys the first clause by exporting its internal helpers, and the
population above is what that produces: builders, guards, and constants a suite composes rather
than asserts on directly. The law's second clause is not what any measured package practices, and
a generated proof would be the first thing to enforce it.

## Coverage

The population is the checkouts present in this container, not the fleet. `configs/` and `tests/`
ship in no tarball, so a registry sweep cannot widen it. The reference test does not resolve
imports, so a name referenced through a namespace import or a dynamic property reads as
unreferenced; that direction inflates misses rather than hiding them.
