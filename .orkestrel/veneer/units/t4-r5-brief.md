# Unit T4-R5 brief: the T4 prose's token nouns and the `clipsOverflow` summary (fix round, successor of `t4-r4-brief.md`)

## Role and engine

The Orchestrator on Opus 5.5 writes this unit. `analyst` on GPT-6 Astra audits it, because the
Orchestrator shares Opus 5.5 with the round-3 writer and wrote round 4.

## Objective

Every code token in a list the T4 delta added carries its own noun, and the `clipsOverflow` summary
no longer places every clip at the padding box.

## Context

- Carried findings, from `t4-audit-4-analyst-verdict.md` (Astra, round 4):
  - Claim 1 BROKEN: the `clipsOverflow` Surface summary and its TSDoc summary say the element clips
    "at its own padding box"; a `clip` overflow with a clip margin clips past it.
  - Claim 2 BROKEN: "A `hidden`, `auto`, or `scroll` overflow" gives the first tokens no noun
    (`.claude/rules/writing.md` § Code tokens, references, and links).
- The same shared-noun pattern sits in the T4 delta's TSDoc: the `readClipEdge` remarks (the
  overflow list and the visual-box keyword list), the `readClipMargin` remarks, and the
  `clipsOverflow` returns clause. Measured with
  `git diff 936bc4a..HEAD -- src guides tests | grep '^+'` and a search for a backticked token
  followed by a comma and another backticked token, on one line or across a line end.
- Instrument: `t4-r5-prose.py` applies every edit and refuses an anchor that does not match
  exactly once.

## Unknowns

None.

## Scope

- Owned: `guides/test.md` and `src/browser/helpers.ts` in `/home/user/test`, documentation text
  only.
- Off-limits: every executable line, and every other file.

## Execution

The Orchestrator applies the instrument on the committed round-4 tip `11054f2`.

## Output

The diff, `git status --porcelain`, and the gate log `t4-r5-gates.log.txt`.

## Deviation contract

See `.agents/orchestration.md` § Deviation protocol. The Orchestrator settles line wrapping itself.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:guides` exits 0, so the `clipsOverflow` Surface summary equals its TSDoc summary.
3. No list of code tokens the T4 delta adds leaves a token without its own noun.
4. The `clipsOverflow` summary states no clip box.
5. The diff changes documentation text only.

## Review evidence

`t4-5.diff`, the `git status --porcelain` output, and `t4-r5-gates.log.txt`.
