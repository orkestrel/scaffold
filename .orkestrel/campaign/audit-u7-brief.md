# Audit U7: the terminal-contract fix round

## Role and engine

Role `analyst`, engine **GPT-5.6 Sol**, sandbox `read-only`, rooted at
`C:/Users/mikes/WebstormProjects/process`. You perform this audit directly and spawn
nothing. Cross-engine rule: the fixes under audit were written by Claude Opus 5; you are the
engine that did not write them.

## Subject

The uncommitted working tree of `@orkestrel/process` at version 0.0.6. The prior round's
verdict (FAIL — the totality gap, the Windows guard hazard, the encoded-hazard test row, the
guide overclaims, the unconsumed `waitForClose`, and the restored unreachable comment
rationale) was reconciled into a fix unit. This round asks one question per claim: did the
fix land as ruled, and does the evidence hold it up.

The complete diff from HEAD is at `tmp/audit-u7.diff`. `git status --porcelain` and read-only
`git diff` are yours to run; never any mutating git command.

## Claims, each falsifiable

1. **Guard restored.** `stopChild` in `src/server/helpers.ts` returns true for an
   already-exited boundary before any platform action, so on Windows an exited boundary
   never reaches `killTree` and a stale pid can no longer address an unrelated live
   process. The POSIX sequence is otherwise unchanged.
2. **Hazard row reversed.** The Windows `stopChild` row that supplied an exited boundary
   carrying an unrelated live process's pid now asserts that process SURVIVES, and the
   suite carries no row anywhere that passes only when a stale pid is addressed.
3. **Terminal totality.** The bounded drain arms after every native exit, not only after
   requested termination, so a natural root exit whose descendant retains the pipes
   reaches the terminal moment within the `drain` bound: `evidence` freezes, `lines` ends
   with queued lines delivered, `settled` becomes true, and `exit` settles with
   `drained: false`. The orphan-late control now proves settlement rather than proving its
   absence.
4. **`waitForClose` consumed.** `Process` routes its bounded close wait through
   `waitForClose`, the hand-rolled timer race against `#exit.promise` is gone, and the
   helper has a real production consumer. No second duplicate wait remains.
5. **Comments narrowed.** The ordering comments in `src/server/Process.ts` and the test
   commentary state only that the latch precedes terminal-value resolution and delivery.
   The re-entrancy rationale measured unreachable (host `close` arriving on a later tick)
   appears nowhere.
6. **Guide truth.** `guides/process.md` claims no more than the code and measurements
   establish: natural exit reaches the terminal moment through the bounded drain and the
   `drained` discriminant says how; the loss window covers an unframed trailing partial
   written before the cutoff; the drain-start condition includes the failed-`stopChild`
   path and what `code`/`signal` can be there; the late-close attribution is bounded to
   the measured fixtures; the diagnostics-completeness limit applies only after an
   undrained cutoff; the Windows descendant-reachability sentence matches the measured
   `taskkill` behaviour.
7. **Contract coherence.** `src/core/types.ts`, the constants' TSDoc, and the exported
   surface agree with the preceding claims — no remark promises totality stronger or
   weaker than the implementation delivers.

## Method

Rule each claim on source and tests you open yourself, plus any read-only probe you can run
under the sandbox. A child-spawning suite cannot run in your sandbox; where a claim rests on
one, rule on the test's logic and name the run as host-owned. Report per-claim:
CONFIRMED, BROKEN, or UNRESOLVED, with `file:line` evidence. Findings outside the claims go
in their own section.

## Output

Write the final answer as the last message. End with exactly one line:
`VERDICT: PASS|FAIL — <n> broken, <n> unresolved, <n> not-evidenced, <n> findings outside the claims`.
No process diary.
