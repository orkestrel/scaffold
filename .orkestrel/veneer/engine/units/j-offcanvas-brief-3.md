# Unit J-OFFCANVAS round 3 — the spared backdrop's non-inert claim, two contract sentences; the round that lands

Successor to `j-offcanvas-brief-2.md`. What changed and why: round 2's audit (`j-offcanvas-audit-2-verdict.md`) confirmed the backdrop's removal step, the delegate routes, the gates, and the scope, and found one mechanism defect in the interactive backdrop (the objective lane's claim 2): with two live panels, the first panel's isolation observes the second's backdrop being appended and claims it inert, and the second panel's isolation then spares it, preserving the inert value the first wrote, so the second backdrop cannot receive the press. Two sentences ride along. This round adopts the objective lane's repair boundary, closes on the instrument probe and the Orchestrator's replay, and lands.

## Role and engine

`opus` on Opus 5.5, the unit's writer (agent a502a18f5baae1a22), a native Claude subagent, the sole writer in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/offcanvas` (branch `unit/offcanvas`, base `afae42c`, rounds 1 and 2 uncommitted). Perform the assignment directly and spawn nothing.

## Objective

An isolation claims each element its `spare` option lists as not inert, with the same precedence and restoration as the host's ancestor chain, so a spared backdrop stays interactive whatever another live isolation wrote on it; the guide's press departure states what the isolation claims; the `BackdropOptions.animated` sentence states the hide split; the scoped gates are green.

## Context

**The verdicts are the authority.** `j-offcanvas-audit-2-verdict.md`; `j-offcanvas-audit-2-objective-verdict.md` claim 2 (the sibling-panel sequence: A's show completes and its isolation observes the parent's children; B's show appends B's backdrop before B awaits; A's observer claims it inert — neither A's chain nor A's spare set; B constructs its isolation after the settle, its `spare` set skips B's backdrop and so preserves the `inert` A wrote; B's host is non-inert but its backdrop is inert and the trusted press cannot reach it) and its repair boundary ("give the active panel's backdrop a non-inert claim that participates in isolation precedence and restoration; preserve `spare`'s published 'leave as they are' behaviour for ordinary callers only if that is kept; merely removing `inert` loses the shared claim invariant"), claim 3 (the press departure overstates: a non-HTML sibling is not claimed inert), F1 (`BackdropOptions.animated`'s false branch still says "adds and removes it at once"); `j-offcanvas-audit-2-subjective-verdict.md` where it exists when you start (the Orchestrator adds its findings to this brief before dispatch or names them in the resume message).

**The mechanism.** `Isolation.ts`: `#claims` (the static per-element claim stack with the snapshot and the `inert` value each isolation claims, newest wins, restoration on release, around line 34), `#claim(element, inert)` (around line 120), `#release(element)` (around line 133), the construction walk (around lines 85 to 108: the chain claimed not inert, each HTML sibling beside the chain claimed inert, a spared element skipped), the observer callback (around line 46: an HTML element inserted beside the chain claimed inert at delivery, a spared element skipped), `#spare` (the copied set, around line 84). `Offcanvas.show` constructs the isolation with `spare: [this.#backdrop.element]` after the settle (around line 264), and the backdrop is appended before the settle (around line 250).

**Law.** As round 2. Skill: none. Standing decisions: E19 (this repair is its precedence half).

**Host and scoped tests.** As round 2. The `prove` MCP server is not reachable to a native subagent; record that you made no call.

## Obligations

- **O6 The spared claim.** `spare` changes meaning from "left as it is" to "claimed as not inert, like the chain": at construction the isolation claims each spared element with `#claim(element, false)` (its claim on the stack, newest wins, the snapshot recording the element's `inert` for restoration), and at each observer delivery an inserted spared element is claimed not inert the same way; release restores each spared element's claim as it restores the chain's. A spared element that is not connected at construction is claimed when the observer delivers its insertion. Red first: a case with two sibling panels — A shown (its isolation live), B's `show()` appends B's backdrop and constructs B's isolation — asserting B's backdrop reads `inert` false after B's `shown` event and that a trusted press on B's backdrop hides B; record the red reading against round 2's source (the assertion `inert` false fails), then green; `Isolation.test.ts` gains the claim-precedence case (an isolation constructed over an element another live isolation claimed inert leaves it interactive while it lives and restores the other's claim when it ends). The `IsolationOptions.spare` sentence, the `Isolation` class remarks, the `#### Modal` Isolation bullet, and the `#### Offcanvas` press departure say "claims as not inert" rather than "leaves as it is". Instrument rows: "the spared element is skipped, not claimed" (round 2's construction path restored: the two-panel case reddens), "the observer skips a spared insertion".
- **O7 The sentences.** The press departure (`#### Offcanvas`) and the adjacent focus departure state what the isolation claims: every HTML element beside the host's ancestor chain and its descendants, the backdrop excepted; a non-HTML sibling (an SVG) is outside the claim; the proven behaviour (an inert HTML element painted above the backdrop, an SVG beneath it) stays. `BackdropOptions.animated`'s false branch reads that the tokens change without an animation wait and the element leaves only on `destroy` (both lanes' F1). The `#### Offcanvas` door paragraph's "no reaction runs inside its writes and no door follows them" is scoped to the backdrop's append and token writes, because the removal step has a door (the subjective lane's F2). The `Isolation` constructor summary and its `@param options` name `spare` (B4); `OffcanvasClassMap.host` and the guide's table use one verb for the dismissal from inside (B5); the wrap is repaired in the lines you touch (B2). In `Offcanvas.test.ts`, the `beside` constant loses its unread `y` and its comment describes the spared backdrop the press lands on (F3).
- **O8 The listener's lifetime (the subjective lane's OR2).** Each show constructs a new backdrop and binds its `mousedown` listener under the panel's signal, so every detached backdrop and its closure stay registered until the panel is destroyed. Bind the listener under a signal that ends with the backdrop: a per-backdrop `AbortController` the panel aborts where it destroys the backdrop (the hide's removal step and `destroy`), combined with the panel's signal through `AbortSignal.any`, or the equivalent one-word field. Prove it with a case that shows and hides the panel several times and asserts, through a recorder on the listener, that a press on a detached earlier backdrop dispatched through `dispatchEvent` reaches no listener, and that the live backdrop's press still hides; an instrument row restoring the panel-signal binding reddens it.
- **O9 The inside-press binding (the subjective lane's OR3).** In the trusted-press case, the inside-panel press and the container dispatch each get their own assertion, and an instrument row that binds the listener on the host (so only the inside press would count) reddens the inside-press assertion alone.
- **The instrument.** `tmp/j-offcanvas/mutations-3.py`: round 2's rows plus O6's two rows, O8's row, and O9's row; every row records its first failure line; the log ends with the digest receipt.
- **The report.** As round 2.

## Scope

**Owned.** `src/browser/Isolation.ts`, `src/browser/Offcanvas.ts` (only where O6 needs it), the `IsolationOptions`, `IsolationInterface`, and `BackdropOptions` declarations in `src/browser/types.ts`, in `guides/veneer.md` the `#### Offcanvas` departures and the `#### Modal` Isolation and Backdrop bullets and the `IsolationOptions` § Surface row, `tests/src/browser/Isolation.test.ts`, `tests/src/browser/Offcanvas.test.ts`, `tmp/j-offcanvas/**`. **Off-limits.** `Modal.ts`, `Backdrop.ts`, `Delegate.ts`, every other engine, and every file not owned.

**Tools and limits.** As round 2; chain in `tmp/j-offcanvas/acceptance-3.sh`, with `Modal.test.ts` in the scoped list (the modal's isolation shares the claim stack).

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report as your final message.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: the two-panel fixture, the row names, the sentences' words within O7. Stop and report when the claim change reddens a Modal case, or when the two-panel case cannot be made red against round 2's source.

## Acceptance criteria

1. `npm run check:src:browser`, `npm run check`, oxlint, and oxfmt exit 0.
2. `Isolation.test.ts` and `Offcanvas.test.ts` green with the O6 cases present and the two-panel red reading recorded; `Modal.test.ts` green.
3. The instrument log: every row `EXACT` or `JOINED` with its first failure line, `GREEN?` rows at 0 failed, the digest receipt.
4. `npm run test:src:browser`, `npm run test:guides`, and `npm run test:policy` exit 0 once at the end.
5. The status lists the owned files only.
