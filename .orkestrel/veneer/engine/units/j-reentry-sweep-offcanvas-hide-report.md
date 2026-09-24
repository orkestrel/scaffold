# J-REENTRY-SWEEP — the `offcanvas-hide` lens (opus on Opus 5.5, native; retained from the workflow run wf_baf11ab0-359, 2026-09-24)

**J-REENTRY-SWEEP: lens `offcanvas-hide` (OH-n rows), `opus` on Opus 5.5**

Four rows are incoherent and each has a failing case. The seed trace reproduces (OH-1, OH-2, and OH-76 in the map), and so does its variant with the takeover at the lock release (OH-81). A second defect exists that no audit named: nothing checks the change after the hide's closing `backdrop?.destroy()` (OH-92, OH-93). All other rows on the path are coherent or J-SAMEWAY data.

Setup for every row:
- **Starting state:** a completed `show(trigger)` with the default options (backdrop on, `scroll: false`, so the scroll lock and the isolation are both held).
- **Host:** a custom element observing `class`, `aria-modal`, and `role`.
- **Beside the host:** a trigger button; a sibling observing `inert`; a `.fixed-top` element observing `style`, which the scroll lock pads.
- **Inside the backdrop:** an element with connect and disconnect callbacks.
- **Stale-write recorder:** a MutationObserver on `document.documentElement` with old values, started when the reaction runs.

The map ran both without the cascade and under the shipped cascade (tokens, fade, offcanvas). Every token, attribute, event, and write reading was identical in both passes, checked by `diff`; only `visibility` differs.

## Seed rows (the round-3 hide trace)

- **Trace:** the host takes the hide over at `backdrop?.element.remove()` (Offcanvas `hide`, around line 347). A backdrop child's `disconnectedCallback` adds `show`. `#reshow` then runs `#revert(… backdrop.show())` (around line 428). `Backdrop.show` re-inserts the element (Backdrop around line 75), and the child's `connectedCallback` calls `offcanvas.hide()`.
- **OH-1 (no cascade): incoherent.**
  - Nested hide resolves `true`; outer hide resolves `false`.
  - In flight: host `offcanvas offcanvas-start hiding`, while the backdrop reads `offcanvas-backdrop fade show`.
  - Settled: host `offcanvas offcanvas-start` with no `aria-modal` or `role`; no backdrop connected; `inert` false on all three siblings; body `overflow` and padding cleared.
  - Events: `hide`, `hide`, `hidden`.
  - Stale write: after the nested hide started, the backdrop's `class` went from `offcanvas-backdrop fade` to `offcanvas-backdrop fade show`.
- **OH-2 (cascade): incoherent.** The readings match OH-1, with the same stale write. The nested hide finished and removed the backdrop within 60 ms, so the backdrop fades in visibly only for that window.
- **Stale write:** `Backdrop.show` `element.classList.add(shown)` (Backdrop around line 79).
- **Cause (ii), a sub-component write that cannot see its owner's change:**
  - The nested hide's `backdrop.hide()` returns early because the backdrop has no `show` token yet (Backdrop around line 87), so it never moves the backdrop's `#change`.
  - The interrupted `Backdrop.show` then passes its `#holds(change)` check (around line 76) and adds the token.
  - The owner's `#revert` identity check happened before the call, so it cannot stop this write.
  - The nested hide's own removal step later removes the element, so the settled page is right. The write still lands after the nested change started.

## Map

These codes stand in the tables to keep rows short:
- **HID:** the hidden end state. Host `offcanvas offcanvas-start`, no `aria-modal` or `role`, no backdrop, `inert` false ×3, `overflow` and padding empty.
- **SHN:** the shown end state. Host `… show`, `aria-modal="true"`, `role="dialog"`, backdrop `offcanvas-backdrop fade show` connected, `inert` true ×3, `overflow: hidden`.
- **E22:** the returned state. Host `… show`, `aria-modal="true"`, `role="dialog"`, backdrop `fade show` connected, `inert` false ×3, scroll lock held.
- **"refused":** the nested call resolved `false` because `#changing` was set, or because the host already had the state.

**Points on `hide`** (Offcanvas.ts, approximate lines)

| ID | Point · reaction | Nested call | Settled reading | Class |
|---|---|---|---|---|
| OH-3 | `emitEvent(hide)` ~309 · `hide` listener | destroy | Restored, not live; events `hide`; no writes after | coherent |
| OH-4 | same | token toward the end | Hide refused at its second `#refused` check. Host has no `show` but keeps `aria-modal`, `role`, backdrop `fade show`, `inert` true ×3, lock held | J-SAMEWAY |
| OH-5 | same | `hide` | Nested `true`, outer `false`; HID; events `hide`, `hide`, `hidden` | coherent |
| OH-6 | same | `show` | Refused; outer `true`; HID; events `hide`, `hidden` | coherent |
| OH-7 | `isolation.destroy()` ~320 (release loop, Isolation ~125) · sibling `inert` reaction | destroy | Restored. One write after the destroy, `fixed inert '' → null`: the isolation's own release loop finishing. The re-entrant destroy returns early, so this write is the only thing that releases the remaining claims | coherent (restoration tail; flagged for ruling) |
| OH-8 | same | toward | `#holds(true)` fails, no returning step: host has no `show`, keeps `aria-modal`, `role`, backdrop `fade show`, lock held; `inert` false | J-SAMEWAY |
| OH-9, OH-10 | same | `hide`, `show` | Refused; outer `true`; HID | coherent |
| OH-11 to OH-14 | Isolation `trigger.focus()` ~127 · trigger `focus` listener | destroy, toward, `hide`, `show` | Same as OH-7 to OH-10, with no tail write on destroy | coherent / J-SAMEWAY / coherent / coherent |
| OH-15 to OH-18 | same focus move · host `focusout` | same four | Same as OH-11 to OH-14 | same |
| OH-19 to OH-22 | `classList.add(hiding)` ~321 · host `class` reaction | same four | Same, except the toward row (OH-20) also leaves the `hiding` token | coherent / J-SAMEWAY / coherent / coherent |
| OH-23 to OH-26 | `classList.remove(shown)` ~327 · host `class` reaction | destroy, token against, `hide`, `show` | Restored / E22 / refused → HID / refused → HID | coherent ×4 |
| OH-27 to OH-30 | `await Promise.all(...)` ~330 · MutationObserver on the backdrop's `class` | same four | Same as OH-23 to OH-26 | coherent ×4 |
| OH-31 to OH-34 | `remove(hiding, showing)` ~333 · host `class` reaction | same four | Same | coherent ×4 |
| OH-35 to OH-38 | `removeAttribute('aria-modal')` ~336 · host reaction | same four | Same | coherent ×4 |
| OH-39 to OH-42 | `removeAttribute('role')` ~340 · host reaction | same four | Same | coherent ×4 |
| OH-43 to OH-46 | `backdrop.element.remove()` ~347 · backdrop child `disconnectedCallback` | same four | Same; on the takeover the backdrop is inserted again | coherent ×4 |
| OH-47 | `lock.destroy()` ~352 (ScrollLock restore ~123) · padded element `style` reaction | destroy | Restored. One write after the destroy, `body style '' → null`: the lock snapshot's empty-attribute removal finishing | coherent (restoration tail; flagged) |
| OH-48 | same | against | E22, but `overflow` is `''`: the lock stays released, the stated limit in E22 amendment (3) | coherent |
| OH-49, OH-50 | same | `hide`, `show` | Refused; HID | coherent |
| OH-92 | `backdrop?.destroy()` ~357, reached when a consumer has put the removed backdrop back (done here at the lock reaction) · backdrop child `disconnectedCallback` | destroy | Restored and not live, but events are `hide`, `hidden`: **`hidden` is dispatched after destruction**; outer `false` | **incoherent** |
| OH-93 | same | against | Outer resolves **`true`**; host `… show` with **no `aria-modal` and no `role`**; no backdrop; lock and isolation released; events `hide`, **`hidden`**. The returning step never ran | **incoherent** |
| OH-94, OH-95 | same | `hide`, `show` | Refused; HID | coherent |
| OH-51 | `emitEvent(hidden)` ~359 · `hidden` listener | destroy | Restored; events `hide`, `hidden`; outer `false` | coherent |
| OH-52 | same | `hide` | Refused | coherent |
| OH-53 | same | `show` | Nested `true`, outer `true`; SHN; events `hide`, `hidden`, `show`, `shown` | coherent |

**Points inside `#reshow`** (~415 to ~428). "Origin" is where the host took the hide over. The nested calls are destroy, token toward the hide's end, `hide`, `show`, and "reopen" (drop `show`, then call `show()`).

| IDs | Point (origin) | destroy | toward | `hide` | `show` | reopen |
|---|---|---|---|---|---|---|
| OH-54 to OH-58 | `remove(hiding)` revert (origin: `shown` removal) | coherent | J-SAMEWAY: the step continues, and the backdrop gets `show` over a host without it | coherent: nested `true`, HID, events `hide`, `hide`, `hidden`, no backdrop write | refused → E22 | coherent: nested `true`, SHN, events `hide`, `show`, `shown` |
| OH-59 to OH-63 | same (origin: the wait) | coherent | J-SAMEWAY | coherent | refused | coherent |
| OH-64 to OH-68 | `setAttribute('aria-modal')` revert (origin: `role` removal) | coherent | J-SAMEWAY: the step still writes `role` and the backdrop's `show` | coherent | refused | coherent |
| OH-69 to OH-73 | `setAttribute('role')` revert (origin: `role` removal) | coherent | J-SAMEWAY | coherent | refused | coherent |
| OH-74 to OH-78 | `backdrop.show()` insertion (origin: removal) · child `connectedCallback` | coherent | J-SAMEWAY | **OH-76, incoherent**: the seed; stale `Backdrop.show` add of `show` (~79), cause (ii) | refused | coherent: the nested show moves the backdrop's identity, and the interrupted show stops |
| OH-79 to OH-83 | same insertion (origin: lock release) | coherent | J-SAMEWAY (lock released) | **OH-81, incoherent**: same stale write and cause; settled HID | refused (E22, lock released) | coherent (the nested show takes the lock again) |
| OH-84 to OH-87 | the backdrop's `show` token write, observer at the next microtask (origin: `shown` removal) | coherent | J-SAMEWAY | coherent | — | coherent |
| OH-88 to OH-91 | same (origin: removal) | coherent | J-SAMEWAY | coherent | — | coherent |

The OH-92 and OH-93 defect:
- **Stale action:** the `#changing = false` write and the `emitEvent(hidden)` dispatch (~358 to ~359), plus `return !aborted`. Nothing checks the change between `backdrop?.destroy()` (~357) and these lines.
- **Cause (iii), a call assumed inert:** the code comment "The element already left the page, so its destruction writes nothing" does not hold once a consumer re-inserts the removed backdrop. `Backdrop.destroy()` then removes it, and consumer code runs inside that removal.
- **Reachability:** this needs a consumer to move the engine's own backdrop. Weigh that when you rule on it.

## Probe file and run

- **File:** `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/sweep-offcanvas-hide/tests/src/browser/probe-offcanvas-hide.test.ts`. It is untracked and is the only change in the worktree.
- **Command:** `npm run test:src:browser -- tests/src/browser/probe-offcanvas-hide.test.ts`
- **Result:** `Tests  5 failed | 3 passed (8)`, duration 118.06 s.
- **Failing cases, each reading its stale write in an assertion:**
  - `seed OH-1`
  - `seed OH-2`
  - `OH-81`
  - `OH-92` (events include `hidden.vn.offcanvas`)
  - `OH-93` (outer `true`, no `aria-modal` or `role`, `hidden` dispatched)
- **Passing cases:**
  - Two map-collector cases, which assert that every row was reached. All rows were reached in both passes, and the plain map was identical across two runs.
  - `control`: a nested hide in the returning step's `hiding` removal. It reads no stale token under the same filter, and events are `hide`, `hide`, `hidden`. The instrument therefore separates the interrupted-show case from a clean nested hide.
- **Timing:** no case failed on timing, so none was re-run.

## Stations not reached

- **Customized built-in body** reacting to the lock's body restoration, and a **sticky element's `margin-right`** restoration. Both are writes in the same `HostSnapshot.restore` loop as the padded `.fixed-top` element (OH-47 to OH-50), so neither was driven on its own.
- **`transitionrun` and `transitionend` listeners** during the wait. They run in the same await as OH-27 to OH-30, which the MutationObserver drives.
- **The isolation's MutationObserver during the hide.** The hide destroys the isolation first, which disconnects the observer, so it cannot run.
- **`#save` (~317), `#listening.abort()` (~354), and the resumed tail of `Backdrop.hide`.** None of them runs consumer code: they only read, or abort a controller that no consumer code listens on.
- **Hides started by Escape, a backdrop press, or a resize.** These are entry routes into the same path; `#resize` only records a resize while a change is in flight.

## Deviation state

None. No source edit was needed, and I wrote only the owned probe file.
