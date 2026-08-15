# U2 fix round 4 (micro) — successor to u2-brief-5.md; documentation only

The closing round confirmed all substance on both lanes. Three documentation repairs remain, all
in owned files, all fully specified. No code changes.

1. `app/browser/types.ts` — `snapshot`'s line names its three doors: "The last complete
   authorized roster, or `undefined` before one arrives, after a session start, or after clear."
   And `start()`'s own TSDoc states that adopting a session discards the retained snapshot and
   departure memory (the contrast `retry()` already draws, read from the other side).
2. `app/browser/factories.ts` — both composition-root enumerations learn the roster:
   `createOperator`'s "an operator holding a same-origin client, an empty stack, and an empty
   feed" gains the empty roster; the "every view reads one stack, one feed, and one subscription"
   sentence becomes true again (one stack, one feed, one roster, and their subscriptions shared
   per view). Keep the sharing point; do not rewrite the paragraphs.
3. `app/browser/types.ts` — `RosterExpiryHandler` gains the stated obligation (Orchestrator
   ruling under the Reachability law): the handler must not throw; a thrown error escapes the
   owned consumption loop and rejects the joined destroy.

Gates: `format:check`, `lint:check`, `check` in your sandbox. Output: the three diffs, `git
status --porcelain`, nothing else.
