# Unit W56-AUDIT — objective audit of the guide-fence carrier commits

## Role and engine

GPT-5.6 Sol, inside the journaled codex CLI, read-only. Perform the audit directly and spawn
nothing. Your sandbox denies loopback listeners and grandchild processes, so you cannot run the
browser suites — audit from the source, the diffs, and the recorded evidence, and say so where a
claim would need a run you cannot take. The Orchestrator has already taken the authoritative host
runs: `npm run test:guides` 38 passed, `npm test` full chain green, gates green.

## Objective

Attempt to refute the following numbered claims about commits `789d7db` and `2f04580` in
`/home/user/orkestrel/test`. Per-claim verdicts with evidence, one terminal line.

## Context

- The diffs: `git -C /home/user/orkestrel/test show 789d7db` and `git show 2f04580`.
- Law: the vendored `.claude/rules/tests.md` and `.claude/rules/writing.md` in this repository.
- The subject files after both commits: `tests/guides.test.ts`, `tests/setup.ts`,
  `tests/src/browser/helpers.test.ts`, `tests/src/browser/factories.test.ts`, `guides/test.md`.

## Claims

1. The totality guard (`carries every fence-bearing guide heading in exactly one place`,
   `tests/guides.test.ts`) discovers its population from the guide itself and fails by name for:
   a fence-bearing `###` heading carried nowhere, a `ROUTED_FENCES` entry naming a heading the
   guide carries no fence under, a heading carried in both places, and a routed carrier file that
   lost its exact marker line. Attack the discovery walk: name a concrete mutation of
   `guides/test.md` or of `ROUTED_FENCES` that the claim says the guard catches but the code
   passes — consider a fence under a deeper heading (`####`), a fence under a `##` section with
   no `###` heading, two fences under one heading, a marker string that matches inside an
   unrelated comment, and a fence opened by an indented or four-backtick line.
2. Every `ROUTED_FENCES` row (`tests/setup.ts:69-79`) names a heading that carries a fence in
   `guides/test.md` and a carrier file that contains the exact
   `guides/test.md → Patterns → "<heading>"` marker built by `buildMarker` for it.
3. The carriers added by `789d7db` in `tests/src/browser/helpers.test.ts` and
   `tests/src/browser/factories.test.ts` execute their fence's documented behavior and assert the
   values the fence's own comments claim — not mere presence or name parity. Judge from the case
   bodies against the corresponding fences in `guides/test.md`.
4. The inventory-fence correction in `2f04580` changed the guide fence and its transcription
   together: the corrected fence in `guides/test.md` agrees with what the repository exports
   (compare against `src/core/validators.ts` and the `src/browser` entry points it names), and
   the executing case in `tests/guides.test.ts` asserts the corrected values, not the stale ones.
5. The prose edits in `2f04580` to `guides/test.md` (including the `below` → `later` change)
   conform to the vendored `.claude/rules/writing.md`: no banned substitution-table term entered
   the changed lines, and no count of a growable set was added.
6. No test-runner symbol (`describe`, `it`, `expect`) entered `tests/setup.ts` in either commit,
   and the node-executed fence cases added to `tests/guides.test.ts` derive their expectations
   from the fence text or a second route, never by importing the value under proof and asserting
   it equals itself in a way a stale fence would still pass.

## Scope

Read-only. No edits, no git state changes, no writes outside `tmp/codex/`.

## Output

Per-claim: `CONFIRMED` with evidence, or `BROKEN` with the exact file and line and the smallest
correct fix. Then exactly one terminal line: `AUDIT: PASS` or `AUDIT: FAIL`.
