# Unit m4-audit — falsification round over the m4-retention-prose change

## Subject

The uncommitted working tree of `/home/user/contract` on branch
`claude/method-memoization-contracts-yus26p`, tip fcdd4d0 plus the m4-retention-prose edit. The
chain: m1 (b3852d9) and its audit-fix (1cd4ac8), m2 (7e762ab) and its prose fix (fcdd4d0), each
closed by an audited round; m4 publishes the retention rule, the eager-bundle rationale, the
release-sentence rewrite, and the repository's first executed guide fence. This is m4's first
audit round and the campaign's last before the independent verifier.

## What the round decides

Whether m4 is committed and the campaign moves to final verification and acceptance. Prose
rounds are where false universals survive, because nothing tries them — a finding here is worth
more than a clean pass.

## Role and engine

The subjective and objective lanes, clean-context Opus 5 subagents through the `reviewer` role
file (Sol recorded dark; the remaining engine runs every lane), blind, on this one brief;
`checker` on Sonnet for the mechanical claim. Your own engine wrote what you audit — attack it
harder. `CONFIRMED` requires naming the attack you tried that failed; a claim you cannot decide
is `UNRESOLVED` with what would settle it.

## Already established — verified by the Orchestrator directly, do not re-run

- Pre-change tree at fcdd4d0, clean; guides project `Tests 59 passed (59)` pre-change and
  `Tests 61 passed (61)` post-change (writer-run; the Orchestrator's independent run happens at
  the final verifier).
- The m1 and m2 rounds' verdicts and closures: `.orkestrel/contract/m1-audit-verdict.md` and
  `m2-audit-verdict.md` in the scaffold checkout.
- The heap facts behind the prose: `#collect` releases only when every root exists (measured:
  guard-only retention 2324/5374/17544 B against full-bundle 2029/11687/48468 B per shape,
  post-m2 outputs in `.orkestrel/contract/contract-baseline-postM2.out`); compiled artifacts
  answer after release (pinned by existing tests).

## Review evidence

- The exact diff and `git status --porcelain`: in the writer's report,
  `/home/user/scaffold/tmp/units/m4-retention-prose-report.md`, including its flagged unproved
  claims and its recorded placement and wording decisions.
- The live tree at `/home/user/contract` is the subject.
- The unit's brief: `/home/user/scaffold/tmp/units/m4-retention-prose-brief.md` — note its
  standing condition claiming `tests/guides.test.ts` executes flagship fences was FALSE (the
  writer established the mechanism); rule on the writer's handling under claim 6.

## Numbered falsifiable claims

1. Every prose sentence added or changed is TRUE against the live source, not merely plausible:
   the release sentence in the guide's Surface row, the retention paragraph in the guide, the
   `ContractCompilerInterface` TSDoc paragraph, and the `createContract` TSDoc paragraph. Attack
   each sentence by finding the input, state, or source line that contradicts it — including
   the spread claim ("a spread of the result copies them") against a frozen plain object, and
   the refusal-attribution claim against `contain` in `compilers.ts`.
2. No false universal was replaced by an unfalsifiable one: each new sentence names behavior a
   test, a reader, or an instrument can check, or states its limit. The dropped `frozen` and the
   `WeakMap` counterfactual are the sentences to attack.
3. The executed fence transcribes faithfully: the test's transcription matches the fence
   line-for-line in the load-bearing expression, asserts the values the fence's comments claim,
   and the presence guard beside it binds the transcription to the guide text.
4. The fence and its transcription would catch what they claim: a change making the guard answer
   differently reddens the transcription; a change to the fence line reddens the presence guard.
   Attack the discrimination.
5. `src/core/types.ts` and `src/core/compilers.ts` carry TSDoc-only diffs — no member,
   signature, type, or executable line moved — and the diff touches only the four owned files.
6. The writer's handling of the false standing condition was sound: establishing the
   transcription mechanism inside its owned test file is what `.claude/rules/tests.md` and
   `.claude/rules/documentation.md` mandate, and no change outside the owned files was needed.
7. The prose follows the writing rules where it is new — no `should`, no counts, no bare URL,
   code tokens in backticks followed by a noun, `via`/`once`/`above` absent from ADDED text —
   and the writer's list of pre-existing hits it left alone is accurate and correctly out of
   scope.
8. Parity holds: every backticked API in the changed guide passages resolves to a real public
   export, and the added TSDoc contradicts no guide sentence and no test.

## Unknowns

- Whether any other guide passage states the old release wording and was missed. Search the
  guide for release wording beyond line 491's row and report what the search covered.

## Scope

Read-only: `Read`, `Grep`, `Glob` only. Where a claim needs a run the evidence does not supply,
return `UNRESOLVED` naming the run.

## Output

The verdict shape of `.agents/skills/orkestrel-falsify/SKILL.md`: numbered verdicts in the
brief's order, findings fitting no claim substantiated to the `BROKEN` standard, and exactly one
terminal line.
