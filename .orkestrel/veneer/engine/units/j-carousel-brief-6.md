# J-CAROUSEL — round 6 brief, the landing round's third pass, prose only (successor to `j-carousel-brief-5.md`, which stays in place unedited)

What changed and why: the round-5 objective lane confirmed the E12 repair and found one false phrase in the § Delegation sentence; the reconciled verdict `j-carousel-audit-5-verdict.md` carries it here. This pass edits one sentence and nothing else. You do not commit; the Orchestrator commits the merge after its replay.

## Role and engine

`opus` on Opus 5.5 (native subagent), the writer of rounds 1 to 5, resumed in the same worktree.

## Objective

A § Delegation sentence that states Veneer's disabled reading and its one departure from Bootstrap's.

## Context

- Tree: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel`, the merge of `e75608b` open with every file staged. Edit the guide and `git add` it; no commit, no discarding git command, no install.
- The sentence (guide lines near 706 to 711): "The alert, tab, and dropdown routes read a trigger or a control as disabled through the `isDisabled` function: it carries its entity's `disabled` token, it matches the platform's `:disabled` state, or it carries a `disabled` attribute whose value is not `false`, as Bootstrap's `isDisabled` function reads it. The button, collapse, and carousel routes read no disabled state, as Bootstrap's data API for those components reads none."
- The fact (`j-carousel-audit-5-objective-verdict.md`, claim 2): Bootstrap's `isDisabled` reads the element's own reflected `disabled` property, so a button inside a `<fieldset disabled>` reads enabled there, while Veneer's `:disabled` match reads it disabled (`helpers.test.ts` pins that case; E16 chose it).

## Item

**A.** Replace "as Bootstrap's `isDisabled` function reads it" with a clause that keeps the reading and names the departure: the token and the attribute reads are Bootstrap's `isDisabled` reading, and the `:disabled` match adds a control an ancestor `fieldset` disables, which Bootstrap's read of the element's own `disabled` property does not. Keep the second sentence. Then `npx oxfmt --config .oxfmtrc.json --write guides/veneer.md`, `npx oxfmt --config .oxfmtrc.json --check guides/veneer.md`, `npm run test:guides`, and `npm run test:policy`, each exit 0. `git add guides/veneer.md`.

## Scope

Owned: `guides/veneer.md` (that sentence). Off-limits: everything else.

## Execution

Perform the assignment directly and spawn nothing. Record that no `prove` call was made.

## Output

Your final message: the sentence before and after, the four command exits, and `git status --short -- guides/veneer.md`.
