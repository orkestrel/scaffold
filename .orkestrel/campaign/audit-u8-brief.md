# Audit U8: the fix-round re-check

## Role and engine

Role `analyst`, engine **GPT-5.6 Sol**, sandbox `read-only`, rooted at
`C:/Users/mikes/WebstormProjects/process`. You perform this audit directly and spawn
nothing. The fixes under audit were written by Claude Opus 5; you are the engine that did
not write them. This round is scoped: it re-checks only the accepted findings from your
prior verdict (retained as `audit-u7-verdict.md` in the orchestrating repository) plus one
regression question. The diff of exactly what the fix unit changed is at
`tmp/audit-u8.diff`; the whole campaign delta from HEAD is at `tmp/audit-u7.diff` from the
prior round. Read-only `git diff` and `git status` are yours; never any mutating git
command. A child-spawning suite cannot run in your sandbox; where a claim rests on one,
rule on the row's logic and name the run as host-owned.

## Claims, each falsifiable

1. **One bounded wait per close.** `Process` holds one idempotent close-wait promise
   backed by `waitForClose`, shared between the native-exit arming and `#kill`; the raw
   `#cutoff`/`#cut` timer pair is gone; `#settle` no longer clears a timer of its own;
   `waitForClose` itself is unchanged in `src/server/helpers.ts`. A `stop()` entering
   `#kill` late in an already-armed drain window awaits the original bound, not a fresh
   one.
2. **The withdrawn pin was withdrawn rightly.** The fix unit measured the predicted
   latency defect and refuted it: with the `orphan` fixture, `drain: 1_000`, an 800 ms
   park, and a late `stop()`, the unfixed tree elapsed 203.29 ms against 188.75 ms fixed,
   because the redundant `waitForClose` armed in `#kill` resolves on the host `close`
   that `#settle`'s read-end destruction fires. Rule on that mechanism against source: is
   the release-by-settle chain real on every terminal route, so that no constructible
   timing separates the duplicated waits behaviourally? If a timing exists that the
   measurement missed, the finding is BROKEN and names it. Also confirm no residue of the
   removed pin remains in the tree.
3. **The comments are narrowed.** The test preamble near
   `tests/src/server/Process.test.ts:1247` and the row comment near `:1287` state only
   the observable latch ordering; no comment in the suite or source presents host-close
   arrival timing as load-bearing.
4. **The guide paragraph is corrected.** The paragraph near `guides/process.md:292` names
   the native exit and an initiated termination as the arming conditions and no longer
   says the bound cannot fire without a requested termination; it still says nothing here
   ends a running child. It agrees with the corrected text near `:318`.
5. **The contract docs are corrected.** The `lines` remark in `src/core/types.ts` states
   the loss window against the terminal moment (including the undrained-cutoff loss of an
   unframed trailing partial), and the `PROCESS_DRAIN` doc in `src/core/constants.ts`
   names both arming conditions, with the measured basis retained.
6. **No regression.** Nothing the fix unit changed reintroduces a defect your prior
   verdict confirmed fixed (the restored guard, the reversed hazard row, the native-exit
   arming, the single production consumer of `waitForClose`) or contradicts any other
   passage of the guide or the contract docs.

## Output

Per-claim verdicts — CONFIRMED, BROKEN, or UNRESOLVED — with `file:line` evidence, then
any findings outside the claims in their own section. Write the final answer as the last
message. End with exactly one line:
`VERDICT: PASS|FAIL — <n> broken, <n> unresolved, <n> not-evidenced, <n> findings outside the claims`.
No process diary.
