# Audit brief — unit followon-tool

## Role and lane

`checker` on Claude Sonnet, a native subagent in a clean context, read-only. The `orkestrel-falsify` verdict shape binds.

## Subject and evidence

The unit's uncommitted changes in `/home/user/fleet/tool` on top of 1f36348: the diff at `/home/user/work/evidence/followon-tool.diff` (`git diff HEAD`), the status at `/home/user/work/evidence/followon-tool.status` (`git status --short`), the writer's report at `/home/user/scaffold/tmp/units/followon/tool-report.md`, and the seven rows at `/home/user/scaffold/tmp/units/followon/tool-brief.md` § Rows. The canon is `/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/`.

## What the round decides

Whether the unit lands on the Orchestrator's deciding gate run or goes back for a fix.

## Claims

1. Every row under § Rows is present in the diff as an exact replacement of the old text the row quotes with the new text the row prescribes, allowing only rewrapping of comment and paragraph lines; cite the diff hunk per row.
2. The diff touches only `src/core/types.ts`, `src/core/tools/ToolManager.ts`, `guides/tool.md`, `tests/guides.test.ts`, and `guides/README.md`, and the status lists only those five files.
3. After the change, the never-a-throw claim carries the same qualification at every home: `src/core/types.ts` (the `ToolResult` remark and the `ToolManagerInterface` remark), `src/core/tools/ToolManager.ts` (the class doc block), and `guides/tool.md` (the opening paragraph, the execution paragraph, and the batch paragraph) each state that a result rather than a throw holds for a call whose members are plain values and that an `id` or `name` accessor throwing when read makes the call reject; a Grep for `never a throw|never fails as a whole|never voids the batch|Every call resolves` over `src` and `guides/tool.md` returns no unqualified sentence.
4. No sentence the unit wrote contains `below`, `above`, `currently`, `should`, or a count of a growable set, and no ordinal names a list item; name the pattern and the paths behind the sweep.
5. `guides/README.md` § Dependency reference names every mirror file in `guides/` other than `tool.md` and `README.md` (`contract.md`, `guide.md`, `scaffold.md`, `probe.md`, `test.md`), each with the dependency it mirrors, and `package.json` declares each of those dependencies.
6. No line in the diff exceeds 100 columns.

## Output

The `orkestrel-falsify` verdict shape: numbered per-claim verdicts with `file:line` evidence, findings outside the claims (each with the exact prescription that closes it), and exactly one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids or none>`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing. Read-only; edit nothing. Read files only with the Read, Grep, and Glob tools and run no shell command.
