# Unit m2-audit — falsification round over the m2-sentinels change

## Subject

The uncommitted working tree of `/home/user/contract` on branch
`claude/method-memoization-contracts-yus26p`, tip 1cd4ac8 plus the m2-sentinels edit. The chain:
the design round adopted hoisting the release peers to class scope with `#index` absence as
`undefined`; the m1 chain (b3852d9, 1cd4ac8) landed and closed its audit before this unit ran.
This is the m2 change's first audit round.

## What the round decides

Whether the m2-sentinels change is committed and the campaign proceeds to its documentation
unit. A finding is worth more than a clean pass; the version is spent after release.

## Role and engine

The subjective and objective lanes, each a fresh clean-context subagent on Opus 5 through the
`reviewer` role file (Sol recorded dark; the remaining engine runs every lane), blind, on this
one brief; `checker` on Sonnet beside them for the mechanical claims. Your own engine wrote what
you audit — attack it harder. Do not hedge toward an imagined consensus. `CONFIRMED` requires
naming the attack you tried that failed; a claim you cannot decide is `UNRESOLVED` with what
would settle it.

## Already established — verified by the Orchestrator directly, do not re-run

- Pre-change tree at contract commit 1cd4ac8, clean, scoped trio at `Tests 346 passed (346)`.
- Post-change scoped trio at `Tests 348 passed (348)`, exit 0 (writer-run; the Orchestrator's
  independent trio run happens at the final verifier and any discrepancy reopens this round).
- Post-change heap medians, Orchestrator-run on the rebuilt `dist` (instrument
  `contract-baseline.mjs`, monotonic retention, CONTROL_ARRAY passing at 8248 B against 8192 B
  expected): cold `new ContractCompiler` 1152 to 648 B/call on small, medium, and deep shapes;
  compiler-plus-`guard` 2324 to 1807, 5374 to 4849, and 17544 to 17037 B/call; `createContract`
  within round spread of its pre-change readings on every shape. Outputs beside the campaign
  records (`contract-baseline-postM2.out`).
- The m1 regression case (`builds no tracking ledger while a compiled family is assembled`)
  stayed green across the change.

## Review evidence

- The exact diff and `git status --porcelain`: in the writer's report,
  `/home/user/scaffold/tmp/units/m2-sentinels-report.md`, which also records the writer's own
  flagged unproved claims and a report-only guide finding.
- The live tree at `/home/user/contract` is the subject; read the actual source.
- The unit's brief: `/home/user/scaffold/tmp/units/m2-sentinels-brief.md`.

## Numbered falsifiable claims

1. No write path reaches a shared sentinel: every writer of `#stack`, `#nodes`, `#order`, and
   the family plan arrays runs behind `#prepare`, which refuses while `#source` is `undefined`,
   and `#release` clears `#source` in the same assignment run that installs the sentinels.
   Enumerate the writers from source rather than trusting the comment, and name each.
2. A write that DID reach a shared array sentinel fails loudly rather than leaking state: the
   static block freezes every array peer, ES modules are strict, and an indexed write on a
   frozen array throws. Name the mechanism that would let one fail silently, or confirm.
3. The `#index` absence design is sound: the coded refusal is narrowed ahead of EVERY
   `recall`/`retain` dispatch on the index (`#discover` and `#locate`), no other dispatch site
   on `#index` exists, and no reachable vector through the public surface meets either refusal
   (a released compiler holds every root; a failed one rethrows at `#enter`). Attack
   reachability: construct the state that reads the index after release.
4. Cross-compiler isolation holds under sharing: one compiler's release cannot move another's
   answers, and the added case would catch the contamination it names. Attack the case's
   discrimination: what sharing defect would it miss?
5. Terminal replay is unmoved: a settling refusal replays by identity from every getter,
   whichever getter settled it, pinned by the added case.
6. The diff touches only the field declarations, constructor, `#release`, `#discover`,
   `#locate`, the static blocks, and their comments in `src/core/ContractCompiler.ts`, plus
   added cases in `tests/src/core/ContractCompiler.test.ts`; no existing assertion changed; no
   `as`, no `!`, no suppression directive entered; `#emptyIndex` no longer exists anywhere.
7. The changed and added comments state only what the code cannot show, and the writer's
   decision to freeze in a dedicated static block beside the declarations rather than in the
   class-tail `pinMembers` block is consistent with the file's existing comment discipline.
8. The writer's report-only finding is correctly scoped: `guides/contract.md:491` now
   over-claims for the node index, the sentence sits under no fence so parity stays green, and
   the writer's replacement sentence is accurate against the changed source.

## Unknowns

- Whether any code outside `ContractCompiler` reads `#`-static members through the class —
  impossible for `#` privates by language rule; confirm no build artifact or test relies on the
  removed per-instance fields in any observable way, and report what the search covered.

## Scope

Read-only: `Read`, `Grep`, `Glob` only. Audit the live tree; edit nothing; spawn nothing. Where
a claim needs a run the supplied evidence does not carry, return `UNRESOLVED` naming the run.

## Output

The verdict shape of `.agents/skills/orkestrel-falsify/SKILL.md`: numbered verdicts in the
brief's order, findings fitting no claim substantiated to the `BROKEN` standard, and exactly one
terminal line.
