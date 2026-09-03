# Unit conform-form fix round 2 — two record findings from the second objective reading

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer of the unit's report. Perform the assignment directly and spawn nothing.

## Objective

Close round 2's F4 and F5 in `/home/user/scaffold/tmp/units/conform/conform-form-report.md`. No file under `/home/user/fleet/form` changes.

## Context

**Law.** `AGENTS.md` § Writing ("Delete a count you find. Do not correct it."); `/home/user/scaffold/.claude/rules/writing.md`.

**Evidence.** The round-2 objective verdict (PASS; F4, F5): the form-obj-1 sweep row at report line 124 states "the three call sites" where the pattern's output carries the export declarations at `tests/setup.ts:250`, `:255`, `:282`, `:309`, the internal calls at `tests/setup.ts:317` and `:319`, the imports and calls at `tests/setup.test.ts:28-29` and `:244-245`, and `tests/src/core/helpers.test.ts:53-54` and `:1413-1414`; report lines 273-274 cite `guides/form.md:1274` and `:823` where the tree carries those sentences at `:1275` and `:824` and the report's own § Successor rows at line 290 already names 1275 and 824.

**Host.** Read with the Read and Grep tools; change the report with the Edit tool only. Run no npm, npx, or git command.

## Scope

**Owned.** `/home/user/scaffold/tmp/units/conform/conform-form-report.md`.

**Off-limits.** Every other file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`. Never commit, stage, push, install, or run a git command.

## Rows

1. **F4.** At the form-obj-1 sweep row (line 124), replace "the export declarations and the three call sites, and nothing outside those files" with "the export declarations at `tests/setup.ts:250`, `:255`, `:282`, and `:309`, the internal calls at `tests/setup.ts:317` and `:319`, the imports and calls at `tests/setup.test.ts:28-29`, `:244-245` and `tests/src/core/helpers.test.ts:53-54`, `:1413-1414`, and nothing outside those files". Confirm each line with the Grep tool over `/home/user/fleet/form/tests` for `\b(createMatrixField|createMinimumCase|createMaximumCase|createMatrixCase)\b` first, and write the lines you read.
2. **F5.** At lines 273-274, change `guides/form.md:1274` to `:1275` and `:823` to `:824`, after reading `/home/user/fleet/form/guides/form.md:1275` and `:824` and confirming the quoted sentences sit there; leave `:91` as it stands.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Append two lines to the report's `## Fix round 1` section under a `Fix round 2` lead naming each row and what closed it. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when a quoted sentence is not at the line the row names or one line either side.

## Acceptance criteria

1. Line 124's row names the lines and carries no count.
2. Lines 273-274 name `:1275` and `:824`.
3. No file outside Owned changed.
