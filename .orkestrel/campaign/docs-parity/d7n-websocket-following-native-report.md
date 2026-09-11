# WebSocket native guides entry report

## Outcome

Done. `tests/guides.test.ts` now runs through the accepted `GuideCommand` server entry. It consumes fresh command-owned inventory, joined rows, and the shared parity report. The server module mapping is unchanged. The package-owned live Duplex and frame-codec fence cases remain in the registration callback.

The package declares `@orkestrel/guide` at `^0.0.17`; the accepted installed declaration read for this unit is `0.0.18`.

## Scope

Owned and changed:

- `C:/Users/mikes/WebstormProjects/websocket/tests/guides.test.ts`

Preserved root-owned changes:

- `C:/Users/mikes/WebstormProjects/websocket/package.json`
- `C:/Users/mikes/WebstormProjects/websocket/tests/config.test.ts`
- `C:/Users/mikes/WebstormProjects/websocket/tests/setupPolicy.ts`

The lockfile, source, guides, guide index, generated configuration, manifests, and `scripts/docs.ts` were not changed by this unit. No setup module was needed. No shared-file patch is requested.

## Obligation map

| Predecessor obligation | Native entry obligation |
| --- | --- |
| Root and directory inventory assembled locally | `GuideCommand` expands `src/**/*.ts`, `tests/**/*.ts`, `guides/*.md`, `*.md`, and `package.json`, then supplies fresh `files` |
| Manifest parsing and guide/source joins assembled locally | Fresh `rows` supplies each indexed `entry`, `guide`, and `source`; `report.input` and the WebSocket guide row pin validate the index population |
| Server self-import environments | The existing exact `MODULES` mapping is passed directly to `GuideCommand` |
| Listed fence languages | `report.fences` filtered by guide spec |
| Documented surface population | Retained as the package-owned `guide.surface()` population assertion |
| Direct declarations, server barrel, and documented public surface | Retained with `findMissingSymbols` over each fresh row |
| `INTERNAL` anti-staleness and hidden declarations | Retained with each fresh row source and `computeSymbolKey` |
| Method-group population | `report.sections` filtered by guide spec |
| Interface methods and implementation-class methods | `report.methods` filtered by guide spec; `report.declarations` remains unasserted because the predecessor did not carry its source-driven declaration obligation |
| Compared source summaries and titled examples | `report.drift` filtered by guide spec |
| Titled guide/source example population | `report.examples.titles` filtered by the WebSocket guide |
| Function examples | `report.examples.functions` filtered by guide spec |
| Method examples | `report.examples.methods` filtered by guide spec |
| Guide fence imports | `report.imports` filtered by guide spec |
| Relative links and documented test links | `report.links` and `report.tests` filtered by guide spec |
| README pitch equals the WebSocket guide tagline | `report.pitch`, guarded by parsing fresh `package.json` inventory and asserting `manifest.name === PACKAGE_NAME` |
| Executable WebSocket handshake, message, close, masking, and accept-token claims | Retained inside the async registration callback and executed by the native guides project over real source and the existing Duplex pair |

## Baseline and verification

The accepted pre-change command was:

```text
npm run test:guides
```

It exited `1` before Vitest started because Node could not resolve the static `@src/server` runtime import. The runner produced no test result tally.

The same command after the change exited `0`:

```text
Test Files  passed
Tests       passed
```

Scoped checks:

```text
.\node_modules\.bin\oxfmt.cmd --config .oxfmtrc.json --check tests/guides.test.ts
exit 0 — All matched files use the correct format.

.\node_modules\.bin\oxlint.cmd --config .oxlintrc.json --deny-warnings tests/guides.test.ts
exit 0

git diff --check -- tests/guides.test.ts
exit 0
```

## Diff and status

The owned diff replaces local command and parity composition with `GuideCommand`, moves runtime alias, Vitest, and setup imports into its async registration callback, and keeps the executable cases under that callback.

Current WebSocket status:

```text
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/setupPolicy.ts
```

This unit changed `tests/guides.test.ts`. The other paths match the root-owned dirty state present before the edit.

## Historical and guide evidence

The retained campaign audit verdict, fix or closing brief, check or verify brief, and closure verdict named by the dispatch were not present in the WebSocket checkout or among the matching Scaffold temporary files. This report does not infer their contents.

The vendored `guides/guide.md` carries no `GuideCommand` or native command section. The installed `@orkestrel/guide` `0.0.18` README and server declaration define the accepted command contract used here. No vendored guide was edited. A short hypothesis is that the mirror still reflects the declared `0.0.17` guide while the accepted staged package supplies `0.0.18`; root owns any later mirror refresh and dependency-range decision.
