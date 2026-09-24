# Unit J-TOOLTIP round 7 — two contract sentences on hide takeover; the last edit before the landing

Successor to `j-tooltip-brief-6.md`. What changed and why: the landing audit (`j-tooltip-audit-6-verdict.md`) confirmed the merge, the `readClosest` routing, the rebuild and teardown doors, the instrument, the chains, and the scope, and failed one claim on two sentences: the `show` remark says a listener can "start a hide" and the show then resolves false and stops writing, but a hide from `inserted` before the token write is refused (the tip lacks the `shown` token) and the show completes — the passing case at `Tooltip.test.ts` around lines 673 to 679 expects exactly that; and the guide's "a hide started before that write resolves `false`" excludes the settled-tip rebuild, whose old tip carries the token during the `show` dispatch, so a hide can take that rebuild over. This round corrects the two sentences to the implemented state and nothing else.

## Role and engine

`opus` on Opus 5.5, the unit's writer (agent ac01697e5b3344cdc), the sole writer in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip` (branch `unit/tooltip`, the merge with `main` `2d95b37` staged and open). Perform the assignment directly and spawn nothing. Do not commit.

## Obligations

- **N1** `TooltipInterface.show` `@remarks` (`src/browser/types.ts`, around line 1665): replace the "start a hide" clause so the sentence reads that a listener, a content function, the sanitizer, or a custom element's reaction that runs during the call can destroy the tooltip or move the tip, and a hide can take the call over while the tip is shown (a settled tip's rebuild included), each of which resolves the call false with nothing written or dispatched after it and the tip left where that code put it; a hide asked before a fresh tip's `shown` token write is refused and the show completes.
- **N2** The guide's door text (`guides/veneer.md` `#### Tooltip`, around line 2760): "a hide started after the show's `shown` token write takes the show over; before that write the tip is hidden, and the hide resolves `false`" becomes: a hide takes a show over while the tip is shown — after a fresh tip's `shown` token write, or during a settled tip's rebuild from its `show` dispatch on — and a hide asked before a fresh tip's token write is refused and resolves `false`; a hide a `shown` listener starts is a separate change after the release and undoes nothing the completed show announced. The class TSDoc's copy of the sentence says the same.
- **N3** `npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts src/browser/Tooltip.ts guides/veneer.md` and `npm run test:guides` exit 0; `git add` the three files so no path is unstaged; report the two sentences verbatim and the two exits.

## Scope

**Owned.** The two sentences (and the class TSDoc copy) only. **Off-limits.** Everything else.

## Execution, output, deviation contract

A native subagent: perform the assignment directly and spawn nothing; the report as your final message; `.agents/orchestration.md` § Deviation protocol, settle the exact wording yourself within N1 and N2.
