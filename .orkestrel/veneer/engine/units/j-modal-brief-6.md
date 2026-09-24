# J-MODAL — round 6 brief, the landing round's third pass, prose and record only (successor to `j-modal-brief-5.md`, which stays in place unedited)

What changed and why: the objective lane over the landing diff confirmed every mechanism and the merge and found one overstated generalization in the normalization paragraph and one misdescribed history in the round-4 report; the reconciled verdict `j-modal-audit-4-verdict.md` carries both here. This pass edits one sentence and states one correction. You do not commit; the Orchestrator commits the merge after its replay.

## Role and engine

`opus` on Opus 5.5 (native subagent), the writer of rounds 1 to 5, resumed in the same worktree.

## Objective

A normalization paragraph that states Bootstrap's numeric comparison exactly, and a report whose first-run history matches the retained artifact.

## Context

- Tree: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal`, the merge of `2cc0887` open with every file staged. Edit the guide and `git add` it; no commit, no discarding git command, no install.
- The fact (`j-modal-audit-4-objective-verdict.md`, claim 2, exercised on the installed normalizer and the modal's `(boolean|string)` type check): `normalizeData` converts a string to a number only when `value === Number(value).toString()`; otherwise the value proceeds to `JSON.parse(decodeURIComponent(value))` with the fallback to the original string. So `01`, `00`, and `0x10` stay strings, pass the check, and, being truthy, read as a backdrop that hides on a press; `1e3` and `1.0` become numbers and fail; `0` and `1` become numbers and fail, as the paragraph says.
- The record (`j-modal-audit-4-objective-verdict.md`, claim 7): the retained first full run `j-modal-mutations-4-first-run.log.txt` shows "the route runs after a listener destroys the delegate" `MISSED` (line 80) and "the dismiss route reads no lifetime" already `EXACT` (line 98), where your round-4 report said both missed.

## Items

**A.** In the departure bullet under `#### Modal`, replace "a numeric string becomes a number" with the exact rule: a string becomes a number only when it equals that number's own string form (`value === Number(value).toString()`), so `0` and `1` do and fail the check, while `01`, `00`, and `0x10` stay strings, pass it, and read as a backdrop that hides on a press; keep every other listed example and the JSON fallback as written. Then `npx oxfmt --config .oxfmtrc.json --write guides/veneer.md`, `npx oxfmt --config .oxfmtrc.json --check guides/veneer.md`, `npm run test:guides`, and `npm run test:policy`, each exit 0. `git add guides/veneer.md`.

**B.** In your final message, state the first-run history as the artifact records it: which row was `MISSED` in the first full run, which row was already `EXACT`, and which row you retargeted for a masked proof; no file changes for this item.

## Scope

Owned: `guides/veneer.md` (that sentence). Off-limits: everything else.

## Execution

Perform the assignment directly and spawn nothing. Record that no `prove` call was made.

## Output

Your final message: the sentence before and after, the four command exits, the corrected first-run history, and `git status --short -- guides/veneer.md`.
