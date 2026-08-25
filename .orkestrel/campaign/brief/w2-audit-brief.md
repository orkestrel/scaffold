# Unit W2-AUDIT — objective audit of the INTERPRETATION_MEMBERS commit

## Role and engine

GPT-5.6 Sol, inside the journaled codex CLI, read-only. Perform the audit directly and spawn
nothing. Your sandbox reaches this package's core suites in-process; report any run your sandbox
refuses rather than substituting a derivation.

## Objective

Attempt to refute the following numbered claims about commit `29d642c` in
`/home/user/orkestrel/brief`. Per-claim verdicts with evidence, one terminal line.

## Context

- The diff: `git -C /home/user/orkestrel/brief show 29d642c`.
- The writer's report: `tmp/units/w2-report.md` — a claim under audit, not evidence. Its quoted
  `prove` receipt line is evidence about the claim it names, never a gate result.
- The ruling implemented: `.orkestrel/campaign/plan.md` ruling 2 in `/home/user/scaffold`
  (read-only), with the ROADMAP row at `/home/user/scaffold/ROADMAP.md:76-78`.
- Law: the vendored `.claude/rules/typescript.md`, `architecture.md`, `tests.md`,
  `documentation.md`, `writing.md`.

## Claims

1. The completeness pin is total: with the installed `@orkestrel/interpret` declaration, any
   member added to `Interpretation` upstream reds the pin, any member removed from the constant
   reds it, and any foreign name reds the `satisfies` clause. Judge from the types as installed;
   name any drift class that survives all of it.
2. The runtime case's engine reading is a second mechanism that can disagree: the case fails
   when the constant falls short of what the live engine returns, and its `Object.hasOwn` half
   fails when the captured view drops a member. Name any state where both halves pass while the
   capture list is wrong.
3. The literal is gone from `BriefCompiler.ts`, both interpret doors take the constant, and no
   other member list in the file was accidentally rewired (the `gate` method's own list stays).
4. The constant's declaration obeys the constants law (UPPER_SNAKE_CASE, frozen, kind-pure file)
   and its TSDoc and guide row carry no count of a growable set and no banned vocabulary in the
   banned sense.
5. The guide fence line `INTERPRETATION_MEMBERS.includes('subject') // true — the optional
   members are captured too` is true as written under the landed constant, and the guides
   transcription mechanism executes or presence-guards it as the repository's pattern requires.

## Scope

Read-only. No edits, no git state changes, no writes outside the bench journal directory.

## Output

Per-claim: `CONFIRMED` with evidence, or `BROKEN` with the exact line and the smallest correct
fix. Then exactly one terminal line: `AUDIT: PASS` or `AUDIT: FAIL`.
