# Audit brief — unit voice-timeout, subjective lane

## Role and engine

`reviewer` on Claude Opus 5 holding the SUBJECTIVE lane (voice, wording, meaning kept, guide
voice), a native subagent in a clean context. The writer was Claude Opus 5; the Sol bench is
dark, so this lane runs on the writer's engine, told so. Read-only: Read, Grep, Glob. You audit
directly and spawn nothing; you never edit.

## Subject

The TSDoc voice unit of `@orkestrel/timeout` in `/home/user/fleet/timeout`. The brief the writer executed is
`/home/user/scaffold/tmp/units/voice/voice-timeout-brief.md` and the shared brief it succeeds is
`/home/user/scaffold/.orkestrel/campaign/fix/tsdoc-wave-brief.md`; the actual diff is
`/home/user/scaffold/tmp/units/voice/voice-timeout.diff` and the actual status `/home/user/scaffold/tmp/units/voice/voice-timeout.status`; the
writer's report is `/home/user/scaffold/tmp/units/voice/voice-timeout-report.md`. Rule on the diff and the tree, never on
the report's self-assessment. The rule is `.claude/rules/typescript.md` § Comments and API
documentation in the same checkout.

## Claims — rule each CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED, with evidence

1. Every rewritten first sentence keeps the meaning of the sentence it replaced: the same
   action, the same subject, the same qualifiers; nothing added, nothing dropped. Sample every
   hunk in the diff, not a subset, and quote any hunk that changes meaning.
2. Every rewritten first sentence opens with a third-person `-s` verb that fits the symbol
   (`Creates` for a factory, `Returns` or `Checks whether` for a query, `Holds` or
   `Represents` or `Names` for a property, type, or constant) and never repeats the symbol's
   name; quote any sentence whose verb misdescribes the symbol.
3. Every rewritten boolean `@returns` reads `True if …; false otherwise` with the original
   condition kept.
4. No first sentence that already satisfied the rule was rewritten, and the diff touches no
   `@example`, `@param`, `@remarks`, `@throws`, or later sentence.

## Output

Per-claim verdicts with `file:line` evidence; findings outside the claims, each with why it
matters and what right looks like; then exactly one terminal line: `PASS` or
`FAIL <claim numbers>`.
