# Adopt Ollama's native guides entry

Ollama's authored guide proof uses the reusable native command and retains its package assertions.

## Baseline and custody

- The Ollama checkout started clean at `463efa2dbf5047813e5dee97a95975625e261d35`.
- The package write is `ollama/tests/guides.test.ts`.
- The assigned report is `scaffold/tmp/units/d7n-ollama-native-entry-report.md`.
- Manifests, locks, guides, source, service cases, vendored files, scripts, and generated files were not edited.
- The native command, supported repair, package gates, root gates, commit, push, and publication did not run in this writer.

## Reconciled scope

| Capability | Change | Closing evidence |
| --- | --- | --- |
| Native entry | Constructs `GuideCommand` with Ollama's root, inventory patterns, module map, fence languages, inventory reader, and Vitest runner. | The top-level runtime imports are `GuideCommand`, `readInventory`, and `createVitest`. |
| Fresh worker state | Registers assertions inside the anonymous `execute` callback and consumes its `files`, `report`, and `rows`. | Alias-backed source imports and Vitest registration occur inside the callback. |
| Generic parity | Reads the reusable report for input, section, method, declaration, drift, example, import, link, test, fence, and pitch findings. | Each package assertion filters findings by the active manifest row where the report is row-scoped. |
| Source discipline | Retains direct-to-barrel, barrel-to-direct, guide-to-barrel, barrel-to-guide, internal-name, and hidden-declaration assertions. | `findMissingSymbols`, `computeSymbolKey`, and the package's `INTERNAL` policy remain active. |
| Summary presence | Refuses a missing `Summary` on the documented surface or declared surface. | The accepted missing-summary assertion remains explicit. |
| Package identity | Parses fresh `package.json` inventory through contract primitives and binds the README pitch to `@orkestrel/ollama`. | The manifest name assertion precedes the generic pitch assertion. |
| Titled examples | Retains the package's required titled guide/source population. | `report.examples.titles` must carry no finding for `guides/ollama.md`. |
| Flagship provider fence | Retains the provider-name assertion and callable `generate` and `stream` assertions against the real barrel. | `createOllama` comes from the runtime `@src/server` import inside the worker callback. |
| Context framing | Retains configured-format identity and omitted-format absence. | The configured object is compared by identity, and the unconfigured provider must return `undefined`. |
| Live boundary | Keeps live-output claims outside the hermetic guide project. | The retained comment points those claims to `tests/service/`; no service case, selection, budget, or skip changed. |

## Exact changes

- Replaced the package-local inventory, parsing, and report assembly with `GuideCommand`.
- Added Ollama's package identity and its public and alias module mappings.
- Moved runtime alias imports and Vitest registration behind the worker callback.
- Replaced local generic comparisons with the installed guide report while keeping package-specific assertions in the authored file.
- Kept `ContextFormat` as a type-only import and preserved the flagship fence behavior.

## Scoped validation

`npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts` returned exit `0` and reported that the file uses the configured format.

`npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` returned exit `0` with no diagnostic.

`git diff --check -- tests/guides.test.ts` returned exit `0` with no output.

The writer did not run `npm run test:guides`, the package suite, or any root gate. Root owns native execution and the supported generated-config repair.

## Diffstat

```text
tests/guides.test.ts | 373 ++++++++++++++++++---------------------------------
1 file changed, 129 insertions(+), 244 deletions(-)
```

No shared-file patch is required.
