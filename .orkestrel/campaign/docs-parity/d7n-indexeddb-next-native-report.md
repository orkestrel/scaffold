# Unit d7n-indexeddb-next-native report

## Outcome

IndexedDB now registers its guide parity and package-owned transcription guards through the installed `GuideCommand`. The native entry passes and retains the package's browser guide policy.

## Owned paths

| Path | Result |
| --- | --- |
| `C:/Users/mikes/WebstormProjects/indexeddb/tests/guides.test.ts` | Replaced the local generic parity engine with direct `GuideCommand` composition and added the required package identity pin. |
| `C:/Users/mikes/WebstormProjects/indexeddb/tests/setup.ts` | Unchanged; no reusable helper move was needed. |

Diffstat measurement: `tests/guides.test.ts | 219 lines changed, 57 insertions(+), 162 deletions(-)`.

## Obligation mapping

| Existing obligation | Native owner |
| --- | --- |
| Inventory, manifest parsing, manifest input validation, and package-row population | `GuideCommand` context `files`, `rows`, and `report.input` |
| Allowed fence languages | `report.fences` |
| Paired example-title population | `report.examples.titles` |
| README pitch and guide tagline parity | Package identity assertion followed by `report.pitch` |
| Required populated guide sections | `report.sections` |
| Interface method population, interface membership, and implementing-class prototype membership | `report.methods` and `report.declarations` |
| Summary and titled-example drift | `report.drift` |
| Executable fence, function-example, and method-example coverage | `report.examples.fences`, `report.examples.functions`, and `report.examples.methods` |
| Fence self-import resolution | `report.imports` |
| Relative links and test links | `report.links` and `report.tests` |
| Non-empty documented surface, direct-to-barrel membership, `INTERNAL` exceptions and anti-staleness, barrel-to-guide membership, and hidden declarations | Preserved through each public `row.guide` and `row.source` object because the accepted aggregate surface report does not encode the package's `INTERNAL` exception policy. |
| IndexedDB executable transcription presence guards | Preserved unchanged inside the command callback using fresh `files`. |

## Defect evidence

| Phase | Exact command | Exit | Measurement |
| --- | --- | --- | --- |
| Red baseline supplied by root | `node --experimental-strip-types tests/guides.test.ts` | `1` | `Vitest failed to find the current suite`; Vitest emitted no test tally because direct registration ran outside its worker. |
| Native result | `node --experimental-strip-types tests/guides.test.ts` | `0` | `Test Files 1 passed (1)`; `Tests 31 passed (31)`. |

## Scoped validation

| Command | Exit | Result |
| --- | --- | --- |
| `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` | `0` | No diagnostics. |
| `npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts` | `1` | Formatting-only difference in the owned file. Root owns the scoped formatting write before authoritative gates. |
| `git -C C:/Users/mikes/WebstormProjects/indexeddb diff --check -- tests/guides.test.ts` | `0` | No whitespace errors. |

## Limits and historical evidence

- No source, guide, README, manifest, lock, configuration, generated file, script, or package dependency was changed.
- No install, build, full-suite gate, commit, push, authentication, or publication command ran.
- `ROADMAP.md` and `d7n-indexeddb-audit-verdict.md` were not present. The closure verdict and available close, converge-fix, close-check, and verify briefs were read without executing their historical commands.
- No missing public `GuideCommand` API seam was found.

The unit is frozen for independent actual-diff review, root formatting, generated-host repair, and root release gates.
