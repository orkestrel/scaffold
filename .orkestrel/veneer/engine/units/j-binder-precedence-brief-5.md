# Unit J-BINDER-PRECEDENCE — successor brief 5: the round-3 audit's two sentence findings

This brief supersedes `j-binder-precedence-brief-3.md` and `j-binder-precedence-brief-4.md` for the unit's fifth round on the same uncommitted worktree. What changed and why: the round-3 audit (`units/j-binder-precedence-audit-3-verdict.md`, reconciling the objective lane's `FAIL 1, 6` with F1, the subjective lane's `FAIL 6`, and the checker's `FAIL none`) confirmed every landed sentence, case, and guard against interleavings A and B, the inherited stamp, and the proxy attack, and found two sentences the code contradicts on one path: a restoration whose write throws withdraws every target it has not written back, a target whose earliest recording it held included, so no restoration writes that target back and "the tokens and properties themselves are always restored" is false on that path (reachable only through the public `HostSnapshot` with a token `classList.toggle` rejects, because the engines validate tokens with `isClassToken`); and `readTag`'s `@returns` lists cases that miss the cross-realm element (an element from another realm fails this realm's `instanceof Element` and reads `undefined`). Every ruling is an edit here, with the lane's exact wording.

## Role and engine

`sol` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox workspace-write -C C:/Users/mikes/WebstormProjects/veneer-precedence` from this file. The executor that opens this brief is the Astra engine inside its CLI: the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-precedence` (branch `unit/precedence`, rounds 1 to 4 uncommitted). Perform the assignment directly and spawn nothing; write only under that worktree and the system temporary directory; return the report as your final message.

## Objective

Make the two sentences true of the code, pin the throwing-write interleaving and the cross-realm case as executed cases, and keep the scoped gates green.

## Context

**Evidence.** `units/j-binder-precedence-audit-3-verdict.md` (the rulings), `units/j-binder-precedence-audit-3-objective-verdict.md` (claim 1's failing interleaving with its exact setup and trace; F1's wording and case). Locate each site by its symbol.

**Law, host, standing conditions, scope, tools, and limits.** As in `j-binder-precedence-brief.md`.

## The edits

- **S1 (claim 1): the throwing write.** At the class remark, `HostSnapshotInterface.restore`'s remark, and the guide's § Ownership and restoration, "the tokens and properties themselves are always restored" becomes "the tokens and properties themselves are restored unless a write throws", and the four precedence sites add: "A restoration whose write throws withdraws every target it has not written back, a target whose earliest recording it held included, so no restoration writes that target back." Pin the objective lane's trace as an executed case in `HostSnapshot.test.ts` (two consumer snapshots on a custom element observing `class`: `Z` saves an invalid token `''` and the property `height` absent and writes `height: 10px`; `X` saves `show` and `height` recording `10px` and writes `show` and `height: 20px`; `X.restore()`'s token write starts `Z.restore()` inside the reaction, whose token write throws; the case asserts the exception is reported inside the reaction, that `height` ends at `20px`, and that no `height` entry remains pending for a later save), red first under the mutation that ignores the stamp (`X` then keeps its entry and writes `10px`).
- **S2 (F1): `readTag`'s `@returns`.** The sentence becomes "The value's string tag name, or undefined when the value fails this realm's `instanceof Element` check, its tag name is not a string, or reading it throws." Add a case asserting `undefined` for an element created in a same-origin iframe's document (the iframe appended to the scene, its `contentDocument.createElement('div')`), red first against a mutation that reads `tagName` from any object carrying one.

## Unknowns

1. Whether the throwing reaction's exception is observable to the case as a reported error (Vitest surfaces an uncaught error inside a custom-element reaction as a test failure) and how the case contains it (S1): rule and report; a `window` `error` listener that records and prevents the default is the expected shape.

## Output

Your final message is the report: per edit S1 and S2, what changed; the exact new sentences; each new case's red and green readings and its mutation; the Unknown's answer; the output of the scoped validation commands verbatim; `git status --short` and `git diff --stat`; the deviation state.

## Acceptance criteria

1. `npm.cmd run check:src:browser` exits 0. 2. The scoped oxlint and oxfmt checks exit 0. 3. `npm.cmd run test:src:browser` exits 0 with the two new cases recorded red first. 4. `npm.cmd run test:guides` and `npm.cmd run test:policy` exit 0. 5. `grep` for "always restored" in `src/browser/HostSnapshot.ts`, `src/browser/types.ts`, and `guides/veneer.md` returns no hit, and for "unless a write throws" returns the three sites.

## Review evidence

The actual diff and `git status --short`, captured by the Orchestrator as `j-binder-precedence-5.diff` and `j-binder-precedence-5-status.txt`, and the report.
