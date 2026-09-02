# Audit brief — unit toolbox-fixup, checker lane

## Role and engine

`checker` on Claude Sonnet (mechanical conformance), a native subagent in a clean context.
Read-only: Read, Grep, Glob. You audit directly and spawn nothing; you never edit.

## Subject

The fix-up of `@orkestrel/toolbox` after its breaking unit at `e5b868a`. The brief the writer
executed is `/home/user/scaffold/tmp/units/breaking/toolbox-fixup-brief.md`; the writer's
returned report is `/home/user/scaffold/tmp/units/breaking/toolbox-fixup-report.md`; the actual
diff is `/home/user/scaffold/tmp/units/breaking/toolbox-fixup.diff` and the actual status is
`/home/user/scaffold/tmp/units/breaking/toolbox-fixup.status`; the tree is
`/home/user/fleet/toolbox` at the commit the dispatch names. Rule on the tree and the diff, never
on the report's self-assessment.

## Claims — rule each CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED, with evidence

1. Contract row 5 of `guides/toolbox.md` names an omitted task `behavior`, and no "task `run`"
   wording survives in the guide.
2. The See also row for `server.md` names `createStream`, and `openStream` occurs nowhere in
   `guides/toolbox.md`.
3. Contract row 15 reads "because it joins nothing forward"; the only causal `since` left in the
   guide are the two in contract row 23.
4. The `TerminalBridge` Surface row reads the ruled sentence from the brief, and the table stays
   aligned (the formatter check passes on the file).
5. The diff carries those four edits and the table realignment they force, nothing else; the
   status lists `guides/toolbox.md` alone.
6. Gates: rule UNRESOLVED unless the report quotes the exact command and exit code for every
   gate, in which case CONFIRMED on the quoted evidence; the Orchestrator's landing chain is the
   authoritative run.

## Output

Per-claim verdicts with `file:line` evidence; findings outside the claims, each with why it
matters and what right looks like; then exactly one terminal line: `PASS` or
`FAIL <claim numbers>`.
