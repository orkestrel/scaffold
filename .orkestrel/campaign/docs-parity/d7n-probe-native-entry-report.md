# Probe native guide entry handoff

## Outcome

Probe's guide parity entry now runs through `GuideCommand` with native-loadable runtime imports at module scope. Alias imports, package runtime imports, local setup imports, Node runtime imports, and Vitest registration load inside the command callback. The callback consumes the command's fresh `files`, `report`, `root`, and `rows` values.

The accepted generic Guide report owns fence, surface, summary, export, method, declaration, drift, example, import, link, test, manifest identity, and README pitch parity. Probe-specific checks remain in the package section.

## Touched responsibilities

- `C:/Users/mikes/WebstormProjects/probe/tests/guides.test.ts`: adopts the native `GuideCommand` entry and preserves Probe's package-specific parity and flagship proof cases.
- `C:/Users/mikes/WebstormProjects/probe/tests/setupServer.ts`: exports explicit-input helpers for the indented claim literal, Guide-backed export comments, interface data properties, and Probe guide sections.
- `C:/Users/mikes/WebstormProjects/probe/tests/setupServer.test.ts`: covers each added setup helper, including absent-input behavior and the callback indentation used by the claim literal.
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-probe-native-entry-report.md`: records this handoff.

## Preserved case mapping

| Required behavior | Resulting owner |
| --- | --- |
| Probe module map, fence languages, example language, and manifest scope | `GuideCommand` options in `tests/guides.test.ts` |
| Missing `Summary` guards | Per-row generic parity case over Guide and source surfaces |
| Package identity and README pitch | Parsed `package.json` identity guard plus `report.pitch` |
| Runtime barrel surface | Probe package section over dynamically loaded core and server barrels |
| Class and interface member equality | Guide declaration and method readers plus the covered Probe interface-property projection |
| Exported example coverage | Existing package example cases retained inside the callback |
| Claim guard documentation | Guide's comment locator and unwrapper through `extractExportComment` |
| Registry and README metadata | Existing package case retained with the fresh manifest and inventory |
| CLAIM payload and cross-document equality | Payload retained verbatim; `extractClaimLiteral` removes callback indentation before comparison |
| DIGEST and documented constants or failures | Literal retained; Probe section checks use an explicit-input setup helper |
| Real receipt workload, deadline, and assertions | Existing flagship receipt case retained without skips or weakened assertions |
| Heavy workload fixture ruling | `tests/src/server/Probe.test.ts` remains untouched; `createHeavyDraft` remains in place |

## Reuse mapping

- Generic parity algorithms now come from `GuideCommand` and its report.
- Declaration bodies and member methods come from Guide's published readers.
- Export documentation extraction delegates to Guide's published comment locator and unwrapper.
- The remaining interface-property projection is Probe-specific because Guide's member reader covers methods, while the package case also compares readonly data properties.
- The remaining Markdown section helper is limited to Probe's constants and failure prose assertions.

## Scoped inspection

The owned files received scoped formatting with:

```text
npx.cmd --no-install oxfmt --config .oxfmtrc.json --write tests/guides.test.ts tests/setupServer.ts tests/setupServer.test.ts
```

Static inspection found no nested named function or assigned-function declaration in `tests/guides.test.ts`. The only top-level alias import is type-only and erases at runtime. The CLAIM and DIGEST literals remain present. The off-limits heavy fixture file is unchanged.

Diffstat from the canonical Probe checkout:

```text
tests/guides.test.ts      | 897 +++++++++++++++++++---------------------------
tests/setupServer.test.ts |  71 ++++
tests/setupServer.ts      |  64 ++++
3 files changed, 501 insertions(+), 531 deletions(-)
```

Root-owned native execution, proof, and release gates were not run in this writer unit. No shared-file patch is required.

## Narrow unknown

The stored literal receipt may differ under the accepted published toolchain. Only root's real native proof can establish the supported replacement. This unit did not invent or change that token.
