# Unit d7n-tool-next-native report

## Outcome

Tool now registers its guide parity and executable registry examples through the installed `GuideCommand`. The native entry passes while retaining the package's schema-bearing tool fixture, envelope guard, registry lifecycle, result isolation, batch behavior, and documented-line guards.

## Owned paths

| Path | Result |
| --- | --- |
| `C:/Users/mikes/WebstormProjects/tool/tests/guides.test.ts` | Replaced the local generic parity engine with direct `GuideCommand` composition and added the required package identity pin. |
| `C:/Users/mikes/WebstormProjects/tool/tests/setup.ts` | Unchanged; no reusable helper move was needed. |

Diffstat measurement: `tests/guides.test.ts | 226 lines changed, 60 insertions(+), 166 deletions(-)`.

## Obligation mapping

| Existing obligation | Native owner |
| --- | --- |
| Inventory, manifest parsing, manifest input validation, and Tool package-row population | `GuideCommand` context `files`, `rows`, and `report.input` |
| Allowed fence languages | `report.fences` |
| Paired example-title population | `report.examples.titles` |
| README pitch and guide tagline parity | Package identity assertion followed by `report.pitch` |
| Required populated guide sections and method groups | `report.sections` |
| Interface method population, interface membership, and implementing-class prototype membership | `report.methods` |
| Source-driven implementing declaration coverage | `report.declarations` |
| Summary and titled-example drift | `report.drift` |
| Executable-fence population | `report.examples.fences` |
| Function-example and method-example coverage | `report.examples.functions` and `report.examples.methods` |
| Fence self-import resolution | `report.imports` |
| Relative links and test links | `report.links` and `report.tests` |
| Non-empty documented surface, direct-to-barrel membership, `INTERNAL` exceptions and anti-staleness, barrel-to-guide membership, and hidden declarations | Preserved through each public `row.guide` and `row.source` object because the aggregate surface report does not encode Tool's `INTERNAL` exception policy. |
| Tool schema and runtime boundary examples | Preserved inside the command callback through the schema-bearing `createTool` fixture, `isToolCall` envelope check, manager execution, correlated success and missing-tool failure results, ordered batch result, and transcription guards. |

## Defect evidence

| Phase | Exact command | Exit | Measurement |
| --- | --- | --- | --- |
| Red baseline supplied by root | `node --experimental-strip-types tests/guides.test.ts` | `1` | `ERR_MODULE_NOT_FOUND` for `@src/core`; Vitest emitted no test tally because resolution failed before registration. |
| Native result | `node --experimental-strip-types tests/guides.test.ts` | `0` | `Test Files 1 passed (1)`; `Tests 25 passed (25)`. |

## Scoped validation

| Command | Exit | Result |
| --- | --- | --- |
| `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` | `0` | No diagnostics. |
| `npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts` | `1` | Formatting-only difference in the owned file. Root owns the scoped formatting write before authoritative gates. |
| `git -C C:/Users/mikes/WebstormProjects/tool diff --check -- tests/guides.test.ts` | `0` | No whitespace errors. |

## Limits and historical evidence

- No runtime source, guide, README, manifest, lock, configuration, generated file, script, or package dependency was changed.
- No install, build, full-suite gate, commit, push, authentication, or publication command ran.
- `ROADMAP.md`, `d7n-tool-closure-verdict.md`, `d7n-tool-audit-verdict.md`, `d7n-tool-converge-fix-brief.md`, `d7n-tool-close-brief.md`, `d7n-tool-close-check-brief.md`, and `d7n-tool-verify-brief.md` were not present at the dispatch-named locations. No historical command was inferred or run.
- No missing public `GuideCommand` API seam was found.

The unit is frozen for independent actual-diff review, root formatting, and root release gates.
