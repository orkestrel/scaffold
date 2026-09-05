# Audit brief — ts7-probe-fix-4 (round 4 over the bridge loader in probe: the checker's mechanical pass)

## Role and lane

`checker` on Sonnet, a native Claude Code subagent, read-only, running no command. Read `/home/user/fleet/probe/AGENTS.md` § Writing, `/home/user/fleet/probe/.claude/rules/writing.md`, and `.claude/rules/documentation.md` there first. Round 3's reviewer lanes prescribed the edits this round transcribed, so this round runs the checker and the Orchestrator's deciding runs; that deviation is recorded in the verdict file.

## Subject and review evidence

The uncommitted tree of `/home/user/fleet/probe` over `b331d93` after the round-4 builder. The diff: `/home/user/scaffold/tmp/units/ts7-probe-fix-4.diff.txt` (`git diff b331d93`). The status: `/home/user/scaffold/tmp/units/ts7-probe-fix-4.status.txt`. The round-4 brief: `/home/user/scaffold/tmp/units/ts7-probe-fix-4-brief.md`; its report: `/home/user/fleet/probe/tmp/units/ts7-probe-fix-4-report.md`. Round 3's lane reports: `/home/user/scaffold/tmp/units/ts7-audit-probe-fix-2-{subjective,objective,checker}.md`. Resolve every pointer by reading the cited file at the cited line inside `/home/user/fleet/probe`; a report is a claim, never evidence.

## Claims

1. Each of the eight edits the round-4 brief prescribes reads at its site as written there.
2. One account of `Toolchain` holds everywhere it is stated: `src/core/types.ts` (summary, `@remarks`, the three member docs), `src/core/validators.ts`'s `isToolchain` TSDoc, and `guides/probe.md` at the `Toolchain` row, the `isToolchain` row, the prerequisite bullet on resolved files, the bridge bullet, and the receipt grammar bullet; no sentence in those files says "resolved tool version", "resolved versions", or names the workspace's `package.json` as the source of a tool's version. Sweep `src/core/*.ts` and `guides/probe.md` for `resolved` and rule each hit by its sense.
3. Every prose hunk in the diff obeys `.claude/rules/writing.md` § Substitutions (sweep case-insensitively and across inflections; rule each hit by its sense; a hit inside a code fence or backticks is data) and states no count of a growable set; every rewrapped guide bullet has no line over 100 columns.
4. `tests/setupServer.test.ts` carries the two rows the brief names, the first ungated with the default-shape assertions and the second gated with `it.runIf(DIRECTORY_LINKS)` with the `equipped` assertions, each with its own scratch and `finally`.
5. No file outside the units' owned sets changed: the status lists the thirteen files of the earlier units plus `src/core/validators.ts` and nothing else.

## Output

Per-claim verdicts with evidence, then findings outside the claims, then exactly one terminal line: `VERDICT: PASS|FAIL <failed claim ids>; outside the claims: <ids or none>`. No process diary. Perform the assignment directly and spawn nothing.
