# Form native guides entry report

## Outcome

Done. `tests/guides.test.ts` now runs through the accepted `GuideCommand` server entry. It uses fresh command-owned inventory, joined rows, and the shared parity report. The package-owned executable Form and README fence cases remain in the callback.

The package declares `@orkestrel/guide` at `^0.0.17`; the accepted installed declaration read for this unit is `0.0.18`.

## Scope

Owned and changed:

- `C:/Users/mikes/WebstormProjects/form/tests/guides.test.ts`

Preserved root-owned changes:

- `C:/Users/mikes/WebstormProjects/form/package.json`
- `C:/Users/mikes/WebstormProjects/form/tests/config.test.ts`
- `C:/Users/mikes/WebstormProjects/form/tests/setupPolicy.ts`

Off limits and unchanged by this unit include the lockfile, source, guides, guide index, generated configuration, manifests, and `scripts/docs.ts`.

No setup module was needed. No shared-file patch is requested.

## Obligation map

| Predecessor obligation | Native entry obligation |
| --- | --- |
| Root files and directory inventory assembled locally | `GuideCommand` expands `src/**/*.ts`, `tests/**/*.ts`, `guides/*.md`, `*.md`, and `package.json`, then supplies fresh `files` |
| Manifest parsing and guide/source joins assembled locally | Fresh `rows` supplies each indexed `entry`, `guide`, and `source`; `report.input` and the owned guide row pin validate the index population |
| Root README fence imports checked with public Guide primitives | Retained with `createGuide`, `createSourceManager`, `extractFenceImports`, and `findMissing` over fresh `files`; the shared report does not inspect this separate root README population |
| Listed fence languages | `report.fences` filtered by guide spec |
| Documented surface population | Retained as the package-owned `guide.surface()` population assertion |
| Direct declarations, barrel reachability, public documentation bijection | Retained with `findMissingSymbols` over each fresh row |
| `INTERNAL` anti-staleness and hidden declarations | Retained with the fresh row source and `computeSymbolKey` |
| Method-group population | `report.sections` filtered by guide spec |
| Interface methods, class methods, and behavioral declaration coverage | `report.methods` and `report.declarations` filtered by guide spec |
| Compared source summaries and titled examples | `report.drift` filtered by guide spec |
| Worked-fence population and function examples | `report.examples.fences` and `report.examples.functions` filtered by guide spec |
| Method examples | `report.examples.methods` filtered by guide spec |
| Guide fence imports | `report.imports` filtered by guide spec |
| Relative links and documented test links | `report.links` and `report.tests` filtered by guide spec |
| README pitch equals the Form guide tagline | `report.pitch`, guarded by parsing fresh `package.json` inventory and asserting `manifest.name === PACKAGE_NAME` |
| Form guide and README executable value claims | Retained inside the async registration callback and executed by the native guides project |

## Baseline and verification

The accepted pre-change command was:

```text
npm run test:guides
```

It exited `1` before Vitest started because Node could not resolve `@src/core` from the old static runtime import. The runner produced no test result tally.

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

The initial `npm exec -- ...` forms did not reach either checker because this npm version parsed the tool flags as npm configuration. The direct installed binary commands above are the scoped evidence.

## Diff and status

Owned diffstat:

```text
tests/guides.test.ts | native entry migration and callback indentation
```

Current Form status:

```text
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/setupPolicy.ts
```

Only `tests/guides.test.ts` was changed by this unit. The other paths match the root-owned dirty state present before the edit.

## Historical evidence

The retained campaign audit verdict, fix or closing brief, check or verify brief, and closure verdict named by the dispatch were not present in the Form checkout or among the matching Scaffold temporary files. This report does not infer their contents. The current owner brief and accepted repair receipts governed this unit.
