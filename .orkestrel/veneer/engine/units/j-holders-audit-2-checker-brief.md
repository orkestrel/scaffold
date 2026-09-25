# J-HOLDERS round-2 audit — the checker

## Role and engine

`checker` on Sonnet, a native read-only Claude subagent (Read, Grep, and Glob). Perform the assignment directly and spawn nothing.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, then the subjective lane's round-1 verdict `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-holders-audit-subjective-verdict.md` (findings 3, 5, 8, 9, and 11 carry the exact prescribed text), then the writer's report `units/j-holders-report-2.md` beside it.

## Subject

The snapshot of Veneer `ada50f4` at `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/snapshot-holders2-ada50f4/`, with the diff `j-holders-2.diff` beside it. Read no other checkout.

## Focus

Rule mechanically on P3 only.

- For each of findings 3, 5, 8, and 9, quote the prescribed text and the text at `ada50f4`, and say whether they match word for word. The one allowed difference is line wrapping.
- For finding 3, confirm that each changed `types.ts` summary equals its § Surface row in `guides/veneer.md`, word for word.
- For finding 11, confirm that the two named paragraphs have no line over 100 columns, and that their words are unchanged from `806717d`, which the diff shows.
- Report every other hunk in `guides/veneer.md` that changes words rather than padding. Findings 3's re-padding of the § Surface table is expected; list the rows whose words changed.

Rule on no behaviour.

## Output

- A table of findings 3, 5, 8, 9, and 11: prescribed, found, and match (yes or no).
- The other word changes in the guide.
- One terminal line: `CHECK: PASS` or `CHECK: FAIL <items>`.
