# J-REENTRY-SWEEP — the `modal-hide` lens (opus on Opus 5.5, native; retained from the workflow run wf_baf11ab0-359, 2026-09-24)

No source change needed. Both round-3 hide-side traces reproduce: every seed case reads a stale `show` token write on the backdrop after the nested hide started. The other incoherent rows on this path are three writes that land after a nested `destroy`. Each of those writes is a restoration completing, and the page settles in the restored state. Every other point reads coherent or is J-SAMEWAY data.

- **Probe file:** `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/sweep-modal-hide/tests/src/browser/probe-modal-hide.test.ts` (untracked, the only change in the worktree).
- **Command:** `npm run test:src:browser -- tests/src/browser/probe-modal-hide.test.ts`, run from the worktree.
- **Last run:** `Tests  11 failed | 76 passed (87)`. The failures are 7 seed-class rows, 3 destroy-restoration rows, and the planted negative control. The same set failed on runs 1, 3, and 4, and no case failed on timing alone.

**How to read the rows.** Line numbers are approximate, in `src/browser/Modal.ts` at `e0dee7e` unless another file is named. The failing assertion is `judge(...)` returning `[]`.
- "hidden state": `show` absent, `display: none`, `aria-hidden="true"`, no `aria-modal`, no `role`, no backdrop connected, `modal-open` absent, body overflow restored, siblings not inert.
- "shown state": `show` present, `display: block`, no `aria-hidden`, `aria-modal="true"`, `role="dialog"`, one backdrop carrying `show`, `modal-open` present, body `overflow: hidden`, siblings inert.
- "destroyed": `Modal.find` returns undefined, the snapshot is restored, no backdrop remains, `modal-open` is absent.
- "stale" means a write recorded after the nested change started. "later" means a write recorded after the nested `destroy`.

## Seed rows

The host takes over inside `#reshow`'s backdrop re-insertion (`Backdrop.show` append, `Backdrop.ts` ~75, called from `#reshow` ~445). A child inside the backdrop reacts to that insertion with `connectedCallback`, which calls `modal.hide()`.

| ID | Takeover door | Fade | Settled | Stale write | Class |
|---|---|---|---|---|---|
| MH-S1 | removal (~352) | no | nested hide `true`, outer `false`; hidden state; events `hide, hide, hidden` | `backdrop.class: modal-backdrop -> modal-backdrop show` | incoherent (ii) |
| MH-S2 | removal (~352) | yes | same | `modal-backdrop fade -> modal-backdrop fade show` | incoherent (ii) |
| MH-S3 | `lock.destroy` (~367) | no | same | same as S1 | incoherent (ii) |
| MH-S4 | padding-right (~363) | no | same | same as S1 | incoherent (ii) |
| MH-S5 | `#releaseOpen` (~357), customized body | no | same | same as S1 | incoherent (ii) |

- **Stale write:** `element.classList.add(shown)` in `Backdrop.show`, `Backdrop.ts` ~79.
- **Cause (ii):** the nested `Modal.hide` calls `backdrop.hide()`. It finds no `show` token and returns at `Backdrop.ts` ~87, before it moves the backdrop's `#change`. The interrupted `Backdrop.show` then passes its own `#holds(change)` check, because it cannot see that its owner's change moved.
- **Settled state is right:** the nested hide later removes the element. Only the "no stale write" clause fails.
- **Visibility (inferred from source, not measured):** with fade, the backdrop carries `show` for the length of the nested hide's host fade before it fades out again. Without fade, the removal follows at the next microtask.

## Before the change starts

The point is the `hide.vn.modal` listener (~314).

| ID | Nested | Settled | Class |
|---|---|---|---|
| MH-1 | `destroy` | outer `false`; destroyed | coherent |
| MH-2 | `hide` | the nested hide starts inside the outer call's pre-change event (`#changing` is still false). Outer `false` at the refusal re-read, nested `true`; hidden state; events `hide, hide, hidden` | coherent |
| MH-3 | token toward end (drop `show`) | outer refused (`false`). The host keeps `display: block`, `aria-modal="true"`, `role="dialog"`, the backdrop's `show`, sibling `inert`, the lock, and `modal-open`, with no `show` token | J-SAMEWAY data |
| MH-4 | drop `show`, then `show()` | outer `false`, nested `true`; shown state; events `hide, show, shown` | coherent |

## While the hide is in flight

From ~318 to the first failed `#holds`, `#changing` is true, so every nested `show` or `hide` is refused.

| ID | Point | Reaction | Nested | Settled | Class |
|---|---|---|---|---|---|
| MH-5 | `isolation.destroy()` (~324), a sibling's `inert` release (`Isolation.ts` ~125) | `attributeChangedCallback` | `destroy` | destroyed. Later writes: `button.inert: "" -> null`, `fixed.inert: "" -> null` | incoherent (ii), benign by value |
| MH-6 | same | same | `show` | refused (`false`); outer `true`; hidden state | coherent |
| MH-7 | same | same | `hide` | refused; outer `true`; hidden state | coherent |
| MH-8 | same | same | toward end | outer stops at `#holds(true)` and returns `false` with no returning step. The host has no `show` but keeps its shown `display` and ARIA, the backdrop keeps `show`, the lock and `modal-open` are held, the isolation is released | J-SAMEWAY data |
| MH-9 | `trigger.focus()` in `Isolation.destroy` (`Isolation.ts` ~127) | `focus` listener | `destroy` | destroyed; no later writes | coherent |
| MH-10 | same | same | `show` | refused; outer `true`; hidden state | coherent |
| MH-11 | same | same | toward end | same as MH-8 | J-SAMEWAY data |
| MH-12 | `show` token removal (~325) | host `attributeChangedCallback` on `class` | `destroy` | destroyed | coherent |
| MH-13 | same | same | token against | E22 step ran: outer `false`; shown host and backdrop; events `hide` only | coherent |
| MH-14 | same | same | `show` | refused; outer `true`; hidden state | coherent |
| MH-15 | host fade wait (~329) | timer | `destroy` | destroyed | coherent |
| MH-16 | same | timer | token against | E22 shown state | coherent |
| MH-17 | same | timer | `show` | refused; outer `true`; hidden state | coherent |
| MH-18 | `display: none` (~332) | host `style` reaction | `destroy` | destroyed | coherent |
| MH-19 | same | same | token against | E22 shown state | coherent |
| MH-20 | same | same | `hide` | refused; outer `true`; hidden state | coherent |
| MH-21 | `aria-hidden` (~335) | host reaction | `destroy` | destroyed | coherent |
| MH-22 | same | same | token against | E22 shown state | coherent |
| MH-23 | `aria-modal` removal (~338) | host reaction | `destroy` | destroyed | coherent |
| MH-24 | same | same | token against | E22 shown state | coherent |
| MH-25 | `role` removal (~342) | host reaction | `destroy` | destroyed | coherent |
| MH-26 | same | same | token against | E22 shown state | coherent |
| MH-27 | backdrop fade wait (~349, `Backdrop.ts` ~91) | timer | `destroy` | destroyed | coherent |
| MH-28 | same | timer | token against | E22 shown state; the backdrop reads `modal-backdrop fade show` | coherent |
| MH-29 | the await on `backdrop.hide()` (~349), no fade | `MutationObserver` on the backdrop's `class` | `destroy` | destroyed | coherent |
| MH-30 | same | same | token against | E22 shown state | coherent |
| MH-31 | `backdrop.element.remove()` (~352) | child `disconnectedCallback` | `destroy` | destroyed | coherent |
| MH-32 | same | same | token against | E22 shown state; the backdrop is re-inserted with `show` | coherent |
| MH-33 | `#releaseOpen` (~357), `HostSnapshot.restore` (Modal.ts ~531) | customized-body `class` reaction | `destroy` | destroyed. Later write: `body.class: "" -> null` (empty-attribute cleanup, `HostSnapshot.ts` ~164) | incoherent (ii), benign by value |
| MH-34 | same | same | token against | E22 host and backdrop; `modal-open` stays released; lock held | coherent, with a flag (see note 3) |
| MH-35 | padding-left removal (~360) | host `style` reaction | `destroy` | destroyed | coherent |
| MH-36 | same | same | token against | E22 host and backdrop; `modal-open` released | coherent, flagged |
| MH-37 | padding-right removal (~363) | host `style` reaction | `destroy` | destroyed | coherent |
| MH-38 | same | same | token against | same as MH-36 | coherent, flagged |
| MH-39 | `lock.destroy()` (~367), `ScrollLock.ts` ~123 restore | reaction of a padded `.fixed-top` element | `destroy` | destroyed. Later write: `body.style: "" -> null` (empty-attribute cleanup, `HostSnapshot.ts` ~176) | incoherent (ii), benign by value |
| MH-40 | same | same | token against | E22 host and backdrop; lock and `modal-open` released (E22 amendment 3 limit) | coherent |
| MH-41 | `hidden.vn.modal` (~372) | listener | `destroy` | outer `false`; destroyed | coherent |
| MH-42 | same | listener | `show` | outer `true`, nested `true`; shown state; events `hide, hidden, show, shown` | coherent |

## The `#reshow` step

The host first takes over at the removal door (~352). Each row below was run with and without fade, and both variants read the same.

| ID | Point | Nested | Settled | Class |
|---|---|---|---|---|
| MH-43 | `display: block` revert (~439), host `style` reaction | `destroy` | destroyed | coherent |
| MH-44 | same | `hide` | nested `true`; hidden state; no stale write | coherent |
| MH-45 | same | drop `show`, then `show()` | nested `true`; shown state; no stale write | coherent |
| MH-46 | same | toward end | the step keeps writing the shown state onto a host with no `show`: shown `display` and ARIA, backdrop shown, `modal-open` and lock held, no isolation | J-SAMEWAY data |
| MH-47 | `aria-hidden` revert (~440) | `destroy` | destroyed | coherent |
| MH-48 | same | `hide` | hidden state | coherent |
| MH-49 | same | drop `show`, then `show()` | shown state | coherent |
| MH-50 | `aria-modal` revert (~441) | `destroy` | destroyed | coherent |
| MH-51 | same | `hide` | hidden state | coherent |
| MH-52 | same | drop `show`, then `show()` | shown state | coherent |
| MH-53 | `role` revert (~442) | `destroy` | destroyed | coherent |
| MH-54 | same | `hide` | hidden state | coherent |
| MH-55 | same | drop `show`, then `show()` | shown state | coherent |
| MH-56 | backdrop re-insertion (~445, `Backdrop.ts` ~75), child `connectedCallback` | `destroy` | destroyed | coherent |
| MH-57 | same | `hide` | the seed defect, same reading as MH-S1 and MH-S2 | incoherent (ii) |
| MH-58 | same | drop `show`, then `show()` | shown state; no stale write | coherent |
| MH-59 | same | toward end | same as MH-46 | J-SAMEWAY data |
| MH-60 | the backdrop's fade after the outer call resolved (`Backdrop.ts` ~80), timer | `destroy` | destroyed | coherent |
| MH-61 | same | `hide` | hidden state | coherent |
| MH-62 | backdrop `show` added in place after a takeover at the `backdrop.hide()` await (no insertion), `MutationObserver` | `destroy` | destroyed | coherent |
| MH-63 | same | `hide` | hidden state | coherent |
| MH-64 | same | drop `show`, then `show()` | shown state | coherent |

**Negative control.** The `CONTROL` row writes `aria-modal="true"` after its nested hide starts. The stale-write reading reports `host.aria-modal: null -> true` and the case fails, which shows the detector reads host writes as well as the backdrop's.

## Notes for the Orchestrator

1. **Refused rows:** the `stale` field of rows where the nested call was refused (MH-6, 7, 10, 14, 17, 20) lists the outer hide's own continuing writes. It is not evidence, and the judge ignores it for those rows.
2. **MH-5, MH-33, MH-39:** each later write comes from a sub-component whose restoration was already running when the reaction destroyed the modal. Those are the Isolation release loop (`Isolation.ts` ~125) and `HostSnapshot.restore` under `#releaseOpen` and `ScrollLock.destroy`. Each write sets the value a plain `destroy` would restore, so the restoration stands. Only the invariant's "nothing writes after it" clause fails. Whether that clause is meant to cover them is your call.
3. **MH-34, 36, 38:** E22 amendment 3 names the scroll lock and the scrollbar compensation as released acquisitions. It does not name the `open` token, which also stays released here.

## Stations not reached

- **`update()` from a reaction during the hide:** not probed. This host's scrollbar width is 0, so `#adjust` writes nothing here.
- **The host's `blur`/`focusout` inside `Isolation.destroy`'s focus move:** same instant as MH-9 to MH-11; not separately probed.
- **The ScrollLock's sticky `margin-right` restore:** same station as MH-39; not separately probed.
- **Points with no consumer code:**
  - `#save()` (~321) only reads.
  - `backdrop?.destroy()` (~370) acts on an element that is already disconnected.
  - `#reshow`'s `backdrop.show()` when the takeover came before `backdrop.hide()` writes nothing, because the backdrop still carries `show`. That row read unreached on run 2.
- **Nested calls on a second modal instance:** outside this lens.

## Deviations

None. Every seed row ran, and no point needed a source edit. The runs took about 32 s each on the shared CPU.
