# Unit T4-R7 brief: the linked identifiers, the boolean return, and a fixture count (fix round, successor of `t4-r6-brief.md`)

## Role and engine

The Orchestrator on Opus 5.5 writes this unit. `checker` on Sonnet confirms it mechanically, an engine the Orchestrator does not share. The closing Astra round (`t4-audit-6-analyst-verdict.md`) confirmed every behavioural and scope claim, so this round carries only its prose findings, and its audit is the mechanical confirmation of those items.

## Objective

Close the closing round's findings: claim 1 (`{@link}` identifiers with no noun), BOOLEAN-RETURN, and FRAME-COUNT.

## Context

- Carried findings, from `t4-audit-6-analyst-verdict.md`: the `{@link clipsOverflow}` link in the `readClipEdge` returns clause, the `{@link readClipMargin}` link in the `readClipEdge` remarks, and the `{@link readClipEdge}` links in the `clipsOverflow` and `measureContent` remarks carry no noun; the `clipsOverflow` returns clause opens "Whether" where `.claude/rules/typescript.md` requires "True if …; false otherwise"; a test comment in `tests/src/browser/helpers.test.ts` counts "the two frames".
- Sweep: `git diff 936bc4a..HEAD -- src guides tests`, added lines, searched for `{@link` identifiers and for number words (`two`, `three`, `four`, `five`, `both`, `single`, `pair`). The search returned the four links and the one count, and nothing else.
- Instrument: `t4-r7-prose.py`, the round-6 paragraph rewriter with this round's replacements.

## Unknowns

None.

## Scope

- Owned: documentation comments in `src/browser/helpers.ts` and the one comment in `tests/src/browser/helpers.test.ts`, in `/home/user/test`.
- Off-limits: every executable line and every other file.

## Execution

The Orchestrator applies the instrument on `af1a25e`.

## Output

`t4-7.diff`, `git status --porcelain`, and `t4-r7-gates.log.txt`.

## Deviation contract

See `.agents/orchestration.md` § Deviation protocol.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:guides` exit 0.
2. The diff changes comment lines only.
3. Every `{@link}` identifier the T4 delta adds is followed by a noun, the `clipsOverflow` returns clause reads "True if …; false otherwise", and no comment the delta adds counts the fixture's frames.

## Review evidence

`t4-7.diff` and `t4-r7-gates.log.txt`.
