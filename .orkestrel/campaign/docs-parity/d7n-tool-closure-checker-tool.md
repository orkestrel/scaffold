Lane held: checker tool

**Claim 1 — FAIL.** The closing brief's item 1 explicitly named an unfixed violation at `/home/user/fleet/tool/guides/tool.md:64` — "GUARD TABLE WITHOUT Shape under 'Validators' (Ruling 20: heads Shape with the narrowed type, under the guard sentence)" (`.orkestrel/campaign/docs-parity/d7n-tool-close-brief.md:28`). The landed guide still reads, unchanged:

```
### Validators
...
| Name         | Kind     | Signature                               | Summary |
| `isToolCall` | function | `(value: unknown) => value is ToolCall` | ...
```

(`/home/user/fleet/tool/guides/tool.md:62-68`). This is a dedicated guard table (every row a guard function), which Ruling 20 requires to head `Shape` with the narrowed type under Ruling 15's guard sentence. The diff (`d7n-tool-close.diff.txt`) touches only the `### Contracts` section of `guides/tool.md` and the two-line drop-in header/comment fix in `tests/guides.test.ts`; it never touches the `### Validators` section. The report (`d7n-tool-close-report.md`) never mentions "Validators" anywhere, so item 1 landed only partially and the gap is unreported, not deferred with reason. Everything else the diff touched matches the brief and `git status --short` (`d7n-tool-close.status.txt`) lists only the two owned files, so scope honesty on "nothing else changed" holds; the failure is on "every item … landed as the brief states it."

**Claim 2 — FAIL.** Citations otherwise check out: the report's grep citation on `…` (line 169, `new Tool({ … })`) matches `/home/user/fleet/tool/guides/tool.md:169`, and the quoted diff hunks match `d7n-tool-close.diff.txt` verbatim. But the report states a count in authored prose: "Two hunks landed:" (`d7n-tool-close-report.md:64`), naming the size of a growable set (diff hunks) rather than naming them or recasting the sentence, which `AGENTS.md` § Writing bans unconditionally ("NEVER state a count").

**Claim 3 — FAIL**, on the same Validators evidence as claim 1. Every `Shape` cell present in `guides/tool.md` § Contracts does follow the idiom correctly (verified row by row against `/home/user/fleet/tool/src/core/types.ts:1-215`: `ToolDefinition`, `ToolCall`, `ToolOptions` bare braces with no `plus`; `ToolSuccess`/`ToolFailure` as `Success<unknown> plus { id, name }` / `Failure<string> plus { id, name }`; `ToolInterface` as `ToolDefinition plus { summary? } plus execute`; `ToolManagerInterface` as `{ count } plus add, tool, tools, definitions, execute, remove, clear`; `ToolResult` as `ToolSuccess \| ToolFailure`), and the convention sentence at `guides/tool.md:41-44` matches Ruling 15's canonical text plus Ruling 21's extended-interface clause, with no `…` or spelled member type in any `Shape` cell. But the claim's guard-table clause fails: `guides/tool.md:62-68` carries no `Shape` column and no guard sentence at all.

**Claim 4 — PASS.** `/home/user/fleet/tool/tests/guides.test.ts` lines 1-3 equal `/home/user/fleet/abort/tests/guides.test.ts` lines 1-3 byte for byte (both read "The constants that follow are this package's own, as is the executed section that closes the file."). The region from `const root = ` (line 47) through the manifest loop's closing brace (line 258) is textually identical between the two files outside the constants block already excluded before line 47, including the `/Interface$/` regex with no flag, `new URL('../', import.meta.url)`, the pilot's comments, and the `findDrift` call inside the `it`. The `INTERNAL` block carries the pilot's amended sentence ("the assertion that follows it fails when a name here stops being stranded") in both files.

**Claim 5 — PASS.** Every fence in `guides/tool.md` sits under a complete lead-in sentence: `guides/tool.md:147-150` ("Declare both at once:"), `:188-191` ("hand out its definitions:"), `:224-226` ("then execute:"). No heading in `guides/tool.md` carries a retired term (`Entities`, etc. absent). `/home/user/fleet/tool/README.md`'s `## Install` (lines 13-17) and `## Example` (lines 19-53) fences sit directly under their headings, matching Ruling 24.

**Findings outside the claims:**
- The unaddressed Validators guard table is also a completeness gap against the brief's own acceptance-criteria intent (criterion 2's grep checks do not catch it because the pattern targets `interface` rows, not guard-table headers), so the criteria as written cannot surface this defect — a re-dispatched fix should convert `### Validators` to carry `Shape` heading `ToolCall` (the type the guard narrows to) under Ruling 20's guard sentence, then re-verify with a criterion naming the table by heading rather than by row-kind grep.
- Report-cited command outputs (`npm run test:guides`, `npm run test:policy`, `oxfmt`, `oxlint`, `npm run docs`) rest solely on the writer's own quoted transcript with no independent run behind them in this evidence packet; per the checker's standing instruction these stay UNRESOLVED rather than CONFIRMED, and are not counted toward or against any claim above since none of the five claims turns on them.

VERDICT: FAIL 1, 2, 3
