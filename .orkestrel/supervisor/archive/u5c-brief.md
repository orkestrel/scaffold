# U5c — the stated-fact lines become toasts

## The user's ruling (binding, overrules the recorded rail-top stacking)

"The notifications on the top left over the live stack move the live stack around, which doesn't
look good and won't look good when there are more. They would be better as toasts." The restore
notice and the fault line must stop reflowing the rail: they become overlay toasts. RunList's
own stale-updates state line (with Retry) is list state, not a notification — it stays where it
is and is off-limits.

## Role and engine

`implementer`, engine **Opus 5** (placement, dismissal semantics, and copy coexistence are
design-bearing). Sole serial writer in `/workspace/supervisor` from clean committed baseline **ef5a8c6**
(the Escape-proof micro round's commit). Perform directly, spawn nothing, no
commits/pushes/installs.

## What moves

`ApplicationView.vue`'s two rail-top paragraphs — `fallback` (RestoreNotice rendering) and
`fault` (`That did not go through: …`) — leave the offcanvas body and render in a toast surface
overlaying the content. Copy is unchanged (the reviewer confirmed its voice); when both facts
hold, the visible order stays notice above fault (statement, then the reason beneath it).

## Design constraints, all standing rulings

1. **No reflow.** The toast surface is position-fixed (established Bootstrap/Halfmoon utilities
   and toast vocabulary only — `toast`, `toast-container`, position/spacing utilities); nothing
   in the rail or content moves when a toast appears, disappears, or stacks. Placement is yours
   within that (the user called the rail-top placement bad; bottom or top edge of the viewport
   away from the drawer's close control and the signature both work) — record the call.
2. **Vue-owned visibility.** No Bootstrap JS, same as the offcanvas precedent. Class-driven
   show state from the reactive facts.
3. **No timers.** No auto-dismiss. A toast leaves when its fact clears (the notice per its
   existing contract, the fault on the next success) or when the reader dismisses it with a
   real close control (`btn-close`, accessible name per the drawer's precedent).
4. **Dismissal must not drift.** If you add local dismissed-state, derive it from the fact's own
   identity/value so a NEW fault or notice renders even after an older one was dismissed, and
   the state resets when the fact clears. No second store that can contradict the operator.
5. **No live region.** The standing ruling holds: no `role="alert"`, no `aria-live` on the toast
   surface; the one announcing voice stays RunList's status line. Toasts here are visible
   statements, not announcements — a deliberate, recorded departure from conventional toast
   markup.
6. **Layering.** The toasts must remain visible and their dismiss reachable at both widths,
   including while the drawer is out below `lg`. Settle z-order against the offcanvas and
   backdrop with established classes; record it.
7. **Keyboard reach.** The dismiss control is focus-reachable; Escape keeps its existing
   contract (drawer/selection) and does NOT gain a toast-dismiss meaning this round.

## Tests (same file conventions as the surface they replace)

Move the existing notice/fault proofs in `tests/app/browser/ApplicationView.test.ts` onto the
toast surface: renders once when set, absent when clear, clears on next success, no live region,
notice-above-fault order when both hold, both widths, all driven with real `userEvent` where
interaction is asserted (the standing trusted-input law — no `dispatchEvent`, no bare
`.click()`). Add the no-reflow fact: the rail's first heading keeps its position when a toast
appears (a bounding-rect comparison is acceptable perception evidence), and the rail body no
longer contains the two paragraphs. Add dismissal: pressing the toast's close control removes
that toast; a subsequently raised fact renders a fresh toast.

## Scope

**Owned:** `app/browser/ApplicationView.vue`, `tests/app/browser/ApplicationView.test.ts`.
**Off-limits:** everything else — all components including `RunList.vue`, all controllers,
`types.ts`, `tests/setupBrowser.ts`, integration files, configs, guides.

Forbidden: the standing list; no invented classes (Bootstrap/Halfmoon toast vocabulary is
established); no new dependencies; no aria-live.

## Acceptance criteria

1. The rail body contains no notice/fault paragraphs; both render as toasts in a fixed-position
   container; appearing/disappearing toasts move nothing in the rail or content — proved.
2. All moved proofs pass with their facts intact (once, clear-on-success, no live region,
   order, both widths); the dismissal proofs pass; the whole file green:
   `npm run test:app:browser -- tests/app/browser/ApplicationView.test.ts`.
3. The `app:browser` project green; static gates (`format:check`, `lint:check`, `check`) green.
4. Recorded calls for placement, layering, and dismissal-state design.

## Deviation contract

Stop and report if the no-reflow criterion cannot hold without touching an off-limits file.
Ancillary placement/idiom calls are yours, recorded. Insert failing proofs before fixes where
the defect class can run red (the no-reflow assertion should fail against the current rail-top
rendering before the move — record the command and counts).

## Output

Touched files + diffstat; the full diff; per-criterion proofs with commands and tails; recorded
calls; `git status --porcelain`; deviations or none. No diary.
