# Audit brief — ts7-seven-fix-3 (round 4 over stage 2 in scaffold: the checker's mechanical pass)

## Role and lane

`checker` on Sonnet, a native Claude Code subagent, read-only, running no command. Read `/home/user/scaffold/AGENTS.md` § Writing and `/home/user/scaffold/.claude/rules/writing.md` first. Round 3's reviewer lanes passed every claim and prescribed the edits this round transcribed, so this round runs the checker and the verifier only; that deviation is recorded in the verdict file.

## Subject and review evidence

The uncommitted working tree in `/home/user/scaffold` over `666a942c`, carrying the round-2 fix unit, the round-3 builder, and the round-4 builder. The diff: `/home/user/scaffold/tmp/units/ts7-seven-fix-3.diff.txt` (`git diff 6c46f547` excluding `.orkestrel/`). The status: `/home/user/scaffold/tmp/units/ts7-seven-fix-3.status.txt`. The round-4 brief: `/home/user/scaffold/tmp/units/ts7-seven-fix-3-brief.md`; its report: `/home/user/scaffold/tmp/units/ts7-seven-fix-3-report.md`. Round 3's lane reports: `/home/user/scaffold/tmp/units/ts7-audit-scaffold-fix-2-{subjective,objective,checker}.md`. Resolve every pointer by reading the cited file at the cited line; a report is a claim, never evidence.

## Claims

1. Each of the seven edits the round-4 brief prescribes reads at its site as written there.
2. The § Dependency floors paragraph of `guides/scaffold.md` carries "cleared" nowhere, every line is at most 100 columns, no line but the last ends short of the bound while the next word fits, and no word changed beyond edit 1's replacement.
3. Every prose hunk in the diff (`guides/scaffold.md`, `ROADMAP.md`, `PROPOSAL.md`, the TSDoc in `tests/setupServer.ts`, the comments in `tests/src/core/compilers.test.ts` and `tests/src/core/constants.test.ts`) obeys `.claude/rules/writing.md` § Substitutions (sweep case-insensitively and across inflections; rule each hit by its sense; a hit inside a code fence or backticks is data), carries no `above` or `below` as a pointer, and states no count of a growable set.
4. `buildPackument` refuses `[]`, `''`, and `['']` with the message the guard throws, and the test row named `refuses to publish no version, or an unnamed one` asserts all three.
5. `host.json` moves only the `guides/scaffold.md` digest and the root digest.
6. No file outside the three units' owned sets changed; `src/core/templates.ts` is absent from the diff and the status.

## Output

Per-claim verdicts with evidence, then findings outside the claims, then exactly one terminal line: `VERDICT: PASS|FAIL <failed claim ids>; outside the claims: <ids or none>`. No process diary. Perform the assignment directly and spawn nothing.
