# Unit T4-R6 brief: the whole T4 prose surface in one pass (fix round, successor of `t4-r5-brief.md`)

## Role and engine

The Orchestrator on Opus 5.5 writes this unit. `analyst` on GPT-6 Astra audits it, because the Orchestrator shares Opus 5.5 with the round-3 writer and wrote rounds 4 and 5.

## Objective

Every sentence the T4 delta adds to documentation matches the source, and every code token in it carries its own noun. This closes the prose surface in one pass instead of one finding per round.

## Context

- Carried findings, from `t4-audit-5-analyst-verdict.md` (Astra, round 5): claim 2, the token lists in the `clipsOverflow` remarks; claim 3, the `readClipEdge` remarks' "not at its border box plus the margin", which the border-box branch contradicts; the finding outside the claims, the `clipsOverflow` remarks' "padding edge".
- Break the repeating frame (`.agents/orchestration.md` § Context and decomposition): the Orchestrator swept every backticked token the T4 delta adds with the word that follows it (the sweep script in this round's record, over `git diff 936bc4a..0c2c626 -- src guides tests` with comment prefixes stripped and lines joined). The sweep found, beyond the round-5 findings: the bare `undefined`, `0`, and `true` value tokens in the `readClipEdge`, `readClipMargin`, and `clipsOverflow` returns clauses; the `hidden` token without a noun in the `measureContent` remarks and the `CLIP_EDGE_CASES` TSDoc; the style token in the `CLIP_EDGE_CASES` TSDoc followed by a comma. Every token the sweep lists as followed by a template-literal fragment is test code, not prose.
- The Orchestrator also qualified every "paint containment" statement to "a paint containment over a `visible` overflow", matching the `readClipEdge` and `readClipMargin` source, which read a paint-contained element with a `hidden`, `auto`, or `scroll` overflow at its padding box.
- Instrument: `t4-r6-prose.py` rewrites each named documentation paragraph, refuses an anchor that does not match exactly once, and rewraps without breaking a code span or a `{@link}` tag.

## Unknowns

None.

## Scope

- Owned: documentation comments in `src/browser/helpers.ts` (`readClipEdge`, `readClipMargin`, `clipsOverflow`, `measureContent`) and `tests/setupBrowser.ts` (`CLIP_EDGE_CASES`) in `/home/user/test`.
- Off-limits: every executable line and every other file.

## Execution

The Orchestrator applies the instrument on `7911f63`.

## Output

`t4-6.diff`, `git status --porcelain`, and `t4-r6-gates.log.txt`.

## Deviation contract

See `.agents/orchestration.md` § Deviation protocol. The Orchestrator settles line wrapping itself.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:guides` exit 0.
2. The diff changes comment lines only.
3. Every documentation sentence the T4 delta adds (`git diff 936bc4a..HEAD -- src guides tests`) matches the source it describes, and every code token in it is followed by its own noun.

## Review evidence

`t4-6.diff`, `t4-r6-gates.log.txt`, and the full T4 delta at the round-6 commit.
