# J-TOAST-SWIPE design round — a toast swipe-to-dismiss following Elements and Mailbox

## Role and engine

This one brief goes to two blind lanes. The subjective lane is `planner` on Opus 5.5, a native read-only subagent. The objective lane is `analyst` on GPT-6 Astra, read-only, through `codex exec`. Each lane performs the assignment directly and spawns nothing. Neither lane sees the other's answer.

## Objective

Propose one design for a swipe-to-dismiss on Veneer's toast engine: the input, the writes, the commit, the dismissal, cancellation, the engine and cascade split, and the unit or units that land it. It must follow the mechanism Elements and Mailbox already use, as the user ruled (E31).

## Context

**Read first.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md`, `architecture.md`, `patterns.md`, `browser.md`, and `tests.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`:
  - § E11 (scope), § E13, § E22, § E24 and E25 with their amendments, § E26, § E29, and § E31 (this ruling);
  - § E30, for the contract limits.

**The terrain.** It is a Grok distillate, not a decision. `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-toast-swipe-terrain.md` holds `file:line` evidence from both repositories. Its findings:
- **Elements and Mailbox** both compose a `createPointer` helper:
  - the primary button, pointer capture, and `userSelect: none` during the drag;
  - a second pointer ignored, and a drag on an interactive descendant rejected;
  - a 6 px lock, then the drag follows horizontal `clientX` in both directions, capped visually at 80 px, with opacity easing to 0.4;
  - no velocity.
- **Elements** writes custom properties its toast cascade reads, commits inside `move`, and flies the toast off by `±innerWidth` under a transition.
- **Mailbox** writes inline `translate` and `opacity`, commits on `pointerup` or `pointercancel`, then clears those styles and calls the ordinary `hide()`.
- **Veneer's `Swipe`** (`veneer/src/browser/Swipe.ts`) reports only a completed touch or pen direction, for the carousel.
- **Gaps in both:** neither listens for `lostpointercapture`. No Elements test drives the gesture, and no Mailbox test covers `pointercancel`, a vertical lock, or a mouse `pointerType`.

**The subject.** Veneer at `origin/main` `0865c67`: `src/browser/Toast.ts`, `src/browser/Swipe.ts`, `src/browser/types.ts` (the Toast and Swipe contracts), `src/styles/components/_toast.scss` (the styles session's), and `guides/veneer.md` § Toast. `Toast.ts` is being changed by J-SAMEWAY-ENGINES-A (E24's agreement and prior-value return). Design against its contract, not its line numbers.

**Constraints the design must meet.**
- "Preserve direct control through classes": an inline style beats every consumer class, and Veneer's toast cascade states that no rule reads an inline style.
- E26 splits the work: the engine writes the gesture's state, and any cascade rule that reads that state is the styles session's.
- A public option, event, or member is one word (`names.md`), and it is added with its first consumer.
- E24: a swipe-dismissal's hide is an ordinary hide, with its doors, agreement, and prior-value return.
- Reduced motion, and a keyboard or assistive path to the same dismissal. Bootstrap's toast already has a dismiss button.

## Unknowns

- Whether Veneer's `Swipe` should grow a per-move report, or whether a new mechanism should serve the toast. Say which, and why, from both sources.
- Whether mouse drags count, as in both references, or only touch and pen. Weigh text selection on a desktop toast.

## Scope

Read-only. Propose; do not implement.

## Execution

Perform the assignment directly and spawn nothing.

## Output

A proposal with these parts:
1. The mechanism, stated as rules.
2. The public contract changes, exactly: types, option, and events.
3. The engine's writes, with exact class and custom-property names, and the styles session's cascade contract.
4. Commit and dismissal.
5. Cancellation and edge cases: `pointercancel`, lost capture, a second pointer, destruction mid-drag, a hide already in flight, and a paused autohide timer.
6. The tests: trusted drags through `Input.dispatchTouchEvent` and mouse input, with red-first cases.
7. The units, with routing and order.
8. Rejected alternatives.
9. Risks.

End with one line: `PROPOSAL: <one sentence>`.
