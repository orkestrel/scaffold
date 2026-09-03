# Unit markdown-sanitizer fix round 3 — the report's record

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer of `/home/user/scaffold/tmp/units/followon/markdown-sanitizer-report.md`. Perform the assignment directly and spawn nothing. Change no file under `/home/user/fleet/markdown`.

## Objective

Close the round-3 checker's refutation of claim 9 (`units/followon/markdown-sanitizer-r3-checker-luna.md`): the report records the literal old and new text of every prose sentence the unit and its fix rounds changed in `guides/markdown.md`, and its authored prose states no count. Claim 5 is ruled by the Orchestrator in the verdict file and is not this round's subject.

## Context

**Law.** `/home/user/scaffold/AGENTS.md` § Writing (never state a count; `both` is a count where it tallies a growable set; write a number only as a value the reader needs) and `/home/user/scaffold/.claude/rules/writing.md`.

**Sites the checker named.** Counts at `markdown-sanitizer-report.md:214`, `:236`, and `:250`; paraphrased prose changes at `:125-134` and `:240-252` where the literal old and new text is required.

**Where the literal text is.** `git -C /home/user/fleet/markdown diff -- guides/markdown.md` shows every changed sentence of the sanitizer paragraphs as `-` and `+` lines against the landed tip; the report's own earlier sections describe which round changed which sentence.

**Host.** Read with Read, Grep, Glob; change with Edit; Bash only for `git -C /home/user/fleet/markdown diff -- guides/markdown.md`, `git -C /home/user/fleet/markdown diff -- tests/guides.test.ts`, and `git -C /home/user/fleet/markdown status --short`, one plain command per call, no other command.

## Scope

**Owned.** `/home/user/scaffold/tmp/units/followon/markdown-sanitizer-report.md`.

**Off-limits.** Everything else, every file under `/home/user/fleet/markdown` included.

## Rows

1. Under the sections that describe prose changes (`## Fix round 1` § The prose changed, `## Fix round 2` § The sentences changed), replace each paraphrase with the literal old sentence and the literal new sentence, quoted from the diff, one pair per changed sentence.
2. Sweep the report's authored prose for a number word (`one`, `two`, `three`, `both`, and the rest) or a numeral that answers "how many" about cases, readings, sentences, files, or paragraphs, and rewrite each by naming the members; leave a runner tally, an exit code, or the audit line quoted inside a code fence, and leave a claim identifier such as `claims 5 and 9`.
3. Append a `## Fix round 3` section naming the lines rewritten and the sweep's pattern and result.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended section, returned as the final message. No process diary.

## Acceptance criteria

1. Every prose change in the report carries its literal old and new text.
2. The report's authored prose states no count.
3. `git -C /home/user/fleet/markdown status --short` lists only `guides/markdown.md` and `tests/guides.test.ts`, unchanged by this round.
