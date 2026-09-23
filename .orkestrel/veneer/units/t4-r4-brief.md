# Unit T4-R4 brief: the guide's clip-edge prose (fix round, successor of `t4-r3-brief.md`)

## Role and engine

The Orchestrator on Opus 5.5 writes this unit. `analyst` on GPT-6 Astra audits it, because the
Orchestrator shares Opus 5.5 with the round-3 writer.

## Objective

The guide's clip-edge sentences state what the `readClipEdge` helper returns for every overflow
value, and the round-3 report carries no banned term and no count.

## Context

- Carried findings, from `t4-audit-3-analyst-verdict.md` (Astra, round 3):
  - Claim 4 BROKEN: the § Capture sentence and the pattern's closing sentence say the edge is read
    from the box the `overflow-clip-margin` value selects. For a `hidden`, `auto`, or `scroll`
    overflow the helper returns the padding edge whatever that value selects. The `readClipEdge`
    TSDoc states this correctly and is the reference.
  - Claim 5 BROKEN: `t4-r3-report.md` carries the temporal `now` in its opening paragraph and the
    count "all four owned files" in its restart paragraph.
- Law: `AGENTS.md` § Writing, `.claude/rules/writing.md`, `.claude/rules/documentation.md`.
- Instrument: `t4-r4-guide.py` applies both guide edits and refuses an anchor that does not match
  exactly once.

## Unknowns

None.

## Scope

- Owned: `guides/test.md` in `/home/user/test` (the two sentences named in the Context section),
  and the retained `t4-r3-report.md` (the two tokens named in the Context section).
- Off-limits: every other file, including `src/**` and `tests/**`.

## Execution

The Orchestrator applies the instrument after the round-3 gate chain `t4-full-gates.sh` and the
mutation run `t4-r3-instruments/mutate.py` exit, so no edit lands under a running gate.

## Output

The diff, `git status --porcelain`, and the scoped gate log `t4-r4-gates.log.txt`.

## Deviation contract

See `.agents/orchestration.md` § Deviation protocol. The Orchestrator settles line wrapping and the
sentence split itself.

## Acceptance criteria

1. `npx oxfmt --check guides/test.md` exits 0.
2. Both edited passages state the padding edge for a `hidden`, `auto`, or `scroll` overflow, and the
   selected box plus the `readClipMargin` length for the `clip` keyword and for a paint containment
   over a `visible` overflow, matching the `readClipEdge` source.
3. Every code token in the edited sentences is followed by a noun, and no sentence carries a banned
   term or a count.
4. `npm run test:guides` exits 0.
5. `t4-r3-report.md` carries neither flagged token, and its measurements are unchanged.

## Review evidence

The diff of `guides/test.md`, the `git status --porcelain` output, `t4-r4-gates.log.txt`, the
`readClipEdge` source, and the report's diff.
