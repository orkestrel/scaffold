# Unit followon-tool — report

## Rows

| Row | Status | Note |
| --- | --- | --- |
| tool-F1a | applied | `src/core/types.ts:134-136` remark now qualifies the never-a-throw claim to a call whose members are plain values and names the `id`/`name` accessor rejection case. |
| tool-F1b | applied | `src/core/tools/ToolManager.ts:17-19` class doc now states that an `id`/`name` accessor throw makes the call and its batch reject, and that isolation covers only calls whose members are plain values. |
| tool-F1c | applied | `guides/tool.md:29-31` opening paragraph now qualifies the `ToolResult` claim to a call whose members are plain values. |
| tool-F1d | applied | `guides/tool.md:248-251` batch paragraph now separates handler failure isolation from the accessor-throw rejection case. |
| tool-F2a | applied | `tests/guides.test.ts:2` header comment no longer states a count; reads "The constants that follow are this package's own". |
| tool-F2b | applied | `tests/guides.test.ts:36` comment no longer uses a spatial pointer; reads "the assertion that follows fails when a name". |
| tool-R2 | applied | `guides/README.md` § Dependency reference gained the `probe.md` and `test.md` paragraphs after the `scaffold.md` paragraph, verbatim as specified. |

## Gates

| Command | Exit code | Notes |
| --- | --- | --- |
| `npm run format:check` | 0 | "All matched files use the correct format." No `npm run format` needed. |
| `npm run lint:check` | 0 | No output, no warnings. |
| `npm run check` | 0 | `tsc --noEmit` for the root project and `configs/src/tsconfig.core.json`, no errors. |
| `npm run test:guides` (equivalent to `npx vitest run tests/guides.test.ts`) | 0 | 27 tests passed, 1 test file. |
| `npm test` (observation) | 0 | All five sub-suites (`test:src`, `test:policy`, `test:config`, `test:setup`, `test:guides`) passed: 54 + 111 + 46 + 2 + 27 tests, all green. |

## Deviations

None. Every old text under § Rows was found verbatim and replaced as specified. `git status --short` in `/home/user/fleet/tool` lists exactly the five owned files: `guides/README.md`, `guides/tool.md`, `src/core/tools/ToolManager.ts`, `src/core/types.ts`, `tests/guides.test.ts`.

## Evidence

- `/home/user/work/evidence/followon-tool.diff` — `git diff HEAD`.
- `/home/user/work/evidence/followon-tool.status` — `git status --short`.
