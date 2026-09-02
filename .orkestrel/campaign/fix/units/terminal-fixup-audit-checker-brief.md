# Audit brief — unit terminal-fixup, checker lane

## Role and engine

`checker` on Claude Sonnet (mechanical conformance), a native subagent in a clean context. Read-only: Read, Grep, Glob. You audit
directly and spawn nothing; you never edit.

## Subject

The fix-up of `@orkestrel/terminal` after its breaking unit at `01c6754`. The brief the writer executed is
`/home/user/scaffold/tmp/units/breaking/terminal-fixup-brief.md`; the writer's returned report is
`/home/user/scaffold/tmp/units/breaking/terminal-fixup-report.md`; the actual diff is
`/home/user/scaffold/tmp/units/breaking/terminal-fixup.diff` and the actual status is
`/home/user/scaffold/tmp/units/breaking/terminal-fixup.status`; the tree is `/home/user/fleet/terminal` at
the commit the report names. Rule on the tree and the diff, never on the report's self-assessment.

## Claims — rule each CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED, with evidence

1. Every finding the fix-up brief numbers ends closed in the ruled form at the file and line the
   report names, or stopped with a deviation report; nothing landed as a variant of the ruling.
2. Every red-then-green proof the brief requires is recorded with its command, its failing
   assertion and count, and the same command green, and the failing assertion is the one the
   finding names.
3. No wording the brief's sweep names survives in `src`, `tests`, the package guide, or
   `README.md`, and every hit the report classifies as permitted is permitted.
4. The status lists only the brief's owned files; nothing under `.claude/`, `configs/`,
   `tests/setupPolicy.ts`, `tests/policy.test.ts`, `package.json`, `package-lock.json`, or a
   vendored guide mirror.
5. The report's observations and deviations hide no acceptance-criterion failure.
6. Gates: rule UNRESOLVED unless the report quotes the exact command and exit code for every
   gate, in which case CONFIRMED on the quoted evidence; the Orchestrator's landing chain is the
   authoritative run.

## Output

Per-claim verdicts with `file:line` evidence; findings outside the claims, each with why it
matters and what right looks like; then exactly one terminal line: `PASS` or
`FAIL <claim numbers>`.
