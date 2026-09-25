# TOKEN-RETIRE audit — objective lane on Opus 5.5 (Astra dark)

Successor launch of `tret-audit-analyst-brief.md`, which stays in place unedited. What changed: the Astra bench went dark at
this round's launch. Its journal (`/home/user/scaffold/tmp/codex/tret-audit-analyst.jsonl`, an excerpt retained as
`tret-audit-analyst-dark.log.txt` beside this brief) ends on the Codex usage-limit error, which names a reset on
2026-09-30. Under `.agents/orchestration.md` § Engine assignment, Opus 5.5 therefore runs every lane, each a separate
clean-context subagent, blind to the other. The writer was also Opus 5.5, so no lane of this round runs on an engine that
did not write the work; the verdict file records that deviation.

## Role and engine

`reviewer` on Opus 5.5, holding the **objective** lane: correctness, constraints, and what the code, the tests, the
built cascade, and the logs actually permit. The subjective lane runs blind beside you on another Opus 5.5 subagent.

## Assignment

Read `/home/user/scaffold/.orkestrel/veneer/units/tret-audit-analyst-brief.md` and follow it for the claims, the law, the
evidence, the attacks it names, and the Output, with these overrides:
- You are a native subagent with Read, Grep, and Glob. Run nothing and write nothing; where that brief allows a
  read-only script, read the file or log instead, and say which you read.
- Perform the assignment directly and spawn nothing. Use absolute paths under `/home/user/veneer-tret` and
  `/home/user/scaffold/.orkestrel/veneer/units/`.
- Your final message is the Output that brief specifies, and nothing else.
