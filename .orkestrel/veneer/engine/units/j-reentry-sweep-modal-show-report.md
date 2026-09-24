# J-REENTRY-SWEEP — the `modal-show` lens (opus on Opus 5.5, native; retained from the workflow run wf_baf11ab0-359, 2026-09-24)

The seed trace reproduces on `Modal.show`. When `isolation.destroy()` runs consumer code on the stopped-show path (`Modal.ts` around line 300), the reaction can start a nested `show()`. `#rehide` then captures that nested change's identity and writes over it. The reaction reaches that interval through three doors, and each ends incoherent. `lock.destroy()` and `isolation.destroy()` on the stopped path also keep releasing and restoring after a reaction inside them destroys the modal, though what they write is the restoration.

**Probe file:** `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/sweep-modal-show/tests/src/browser/probe-modal-show.test.ts` (untracked; the only file written)
**Command (run from the worktree):** `npm run test:src:browser -- tests/src/browser/probe-modal-show.test.ts`
**Tests line:** `Tests  7 failed | 63 passed (70)`. Two consecutive runs gave the same line, and the tests took about 3 s. No row failed on timing.

**How the probe works:**
- Each row asserts the invariant for its nested call; a failing row is incoherent.
- A nested show must leave: `show` token, `display: block`, no `aria-hidden`, `aria-modal="true"`, `role="dialog"`, one shown backdrop, `modal-open`, `overflow: hidden`, a padded body, and `shown.vn.modal` last.
- A nested hide must leave: hidden state, no backdrop, `modal-open` and overflow released, `inert` cleared, and `hidden.vn.modal` last.
- A stopped show (E22) must leave the hidden `display` and ARIA state with the backdrop removed.
- A nested destroy must leave the host attributes as they were before the show, no backdrop, the body restored, and no DOM mutation after the `destroy()` call.
- Stale-write detector: from just before the nested call, an observer counts writes to the host's `class`, `aria-hidden`, `aria-modal`, and `role`, and backdrop removals. A nested change writes each of those at most once.
  - It fires on the seed rows and stays silent on the `#rehide` nested-show rows (MS-50 to MS-60).
  - Starting it just before the nested call keeps writes the nested change makes over values already present from being counted.

## Seed rows (first, as the brief requires)

In every seed row a sibling's `inert` reaction (`new Isolation`, around line 293) removes the host's `show` token. `#holds(true)` then fails and `isolation.destroy()` runs (around line 300) before `#rehide` reads `#change` (around line 456).

| ID | Reaction inside `isolation.destroy()` | Nested | Page after settling | Class |
|---|---|---|---|---|
| MS-1 | sibling `inert` release (`attributeChangedCallback`) | `show` | outer `false`, nested `true`; host `modal show`, `display: block`, `aria-modal=true`, `role=dialog`; **no backdrop**; sibling inert, `modal-open`, overflow hidden; events: show, show, shown | **incoherent**: the stale `#rehide` destroys the backdrop (around lines 462–464). Its host writes (around lines 457–460) land and the nested show overwrites them. Cause (i). |
| MS-2 | same, `backdrop: false` | `show` | the nested show completes inside the reaction and dispatches `shown`. Then: host `modal show` **with `display: none`, `aria-hidden=true`, no `aria-modal`, no `role`**; `modal-open` and lock held | **incoherent**: `#rehide` writes `display`, `aria-hidden`, `aria-modal`, and `role` (around lines 457–460) over a completed show. Cause (i). |
| MS-3 | trigger `focus` listener (trigger passed to `show`, not focused) | `show` | same as MS-1: no backdrop | **incoherent**, as MS-1. Cause (i). |
| MS-68 | host `inert` restored when the host's chain claim is released (the host carried `inert` before the show) | `show` | same as MS-1: no backdrop | **incoherent**, as MS-1. Cause (i). |
| MS-4 | sibling release | token toward, then `hide` | nested `true`; host hidden, no backdrop, body released, events: show, hide, hidden | **incoherent by the invariant's letter; the end state is coherent**: after the nested hide started, the stale `#rehide` writes `aria-hidden` again (around line 458) and destroys the backdrop (around lines 462–464). Cause (i). |
| MS-5 | sibling release | `destroy` | host restored, no backdrop, body restored, inert cleared; **mutations after `destroy`: `fixed@inert=null`, `button@inert=null`** | **incoherent by the letter; the end state equals the restoration**: the `Isolation.destroy` release loop (`Isolation.ts` around line 231, `#release` around lines 256–262) keeps restoring the remaining claims after the modal is destroyed. Cause (ii). |
| MS-6 | sibling release | token toward | host `modal show` with `display: none` and `aria-hidden=true`; `modal-open` and lock held | J-SAMEWAY data: `#rehide` writes the hidden state over a host that took `show` back. |
| MS-70 | trigger focused before the show | — | the `trigger.focus()` inside `isolation.destroy()` dispatches no event, so this door is unreachable when the trigger holds focus; the E22 stop holds | coherent |

## Remaining map

On every row in this table the outer call resolves `false` unless noted, and "E22 state" means the stopped-show state.

| ID | Point (approximate line) | Reaction | Nested | Result | Class |
|---|---|---|---|---|---|
| MS-7 | `show.vn.modal` dispatch (239) | event listener | `show` | the nested show completes; the outer call is refused on its re-check (242); events: show, show, shown | coherent |
| MS-8 | same | same | `destroy` | restored, no late writes | coherent |
| MS-9 | same | same | toward | refused at 242; host carries `show` with nothing else written | J-SAMEWAY data |
| MS-10, 11, 12 | `new ScrollLock` fixed padding write (250; `ScrollLock.ts` around line 358) | fixed element `style` reaction | `destroy` / `show` / toward | restored / nested show refused while the change is in flight (406) and the outer call completes / `lock.destroy()` then `false`, host `show` without display | coherent / coherent / data |
| MS-63, 64 | `new ScrollLock` sticky margin write (around line 368) | sticky element `style` | `destroy` / toward | restored / like MS-12 | coherent / data |
| MS-13, 14 | `new ScrollLock` body overflow and padding writes (customized built-in body) | body `style` | toward / `destroy` | lock released, host `show` without display / restored | data / coherent |
| MS-65, 66 | `lock.destroy()` on the stopped path (258), during its restoration | body overflow restore / fixed padding restore | token against, then `show` | the nested show completes with a fresh lock (body padded); `HostSnapshot` hands the lock values still to restore to the nested lock's snapshot | coherent |
| MS-67 | same | body overflow restore | `destroy` | host restored; **mutations after `destroy`: `body@style`, `fixed@style`, `body@style`** | **incoherent by the letter; the end state equals the restoration**: the rest of `HostSnapshot.restore` (called from `ScrollLock.destroy` around line 387) keeps writing after the owner is destroyed. Cause (ii). |
| MS-15, 16, 17 | `#holdOpen` (263) | body `class` | `destroy` / `hide` / toward | restored / refused (host not shown), outer call completes / `false`, `modal-open` and lock held | coherent / coherent / data |
| MS-18, 19 | `#adjust` padding-left (265, around line 504) | host `style` | `destroy` / toward | restored / host `show` without display, lock held | coherent / data |
| MS-20, 21, 22 | `await backdrop.show()` (272), observer callback at the await | `MutationObserver` | `destroy` / `show` / toward | restored / refused / **shown backdrop left** behind a host with `show` and no display | coherent / coherent / data |
| MS-23, 24 | same, fading | same | `destroy` / toward, then `hide` | restored / `hide` refused (change in flight), outer `false`, `modal-backdrop fade show` left | coherent / data |
| MS-25, 26 | `body.append(host)` (276) | host `connectedCallback` | `destroy` / toward | restored / shown backdrop left | coherent / data |
| MS-27, 28 | `display: block` write (278) | host `style` | `destroy` / toward | restored / `display: block` with `aria-hidden=true`, no ARIA, backdrop shown | coherent / data |
| MS-29, 30 | `aria-hidden` removal (279) | host attribute | `destroy` / `show` | restored / refused, outer completes | coherent |
| MS-31, 32 | `aria-modal` write (280) | host attribute | `destroy` / toward | restored / no `role` | coherent / data |
| MS-33, 34 | `role` write (281) | host attribute | `destroy` / toward | restored / everything shown except isolation, focus, and `shown` | coherent / data |
| MS-35, 36, 37 | `shown` token add (286) | host `class` | `destroy` / `hide` / token against | restored / refused / E22 state (lock and `modal-open` held) | coherent |
| MS-38, 39, 40 | fade `settleAnimations` await (288) | observer at the await | `destroy` / against / `hide` | restored / E22 state / refused | coherent |
| MS-41, 42, 43 | `new Isolation` sibling `inert` claim (293) | sibling `inert` | `destroy` / `hide` / against | restored / refused / E22 state | coherent |
| MS-44, 45, 46, 47 | `host.focus()` (305) | host `focus` / `focusin` | `destroy` / against / `hide` / `show` | restored / E22 state with isolation held / refused / refused | coherent |
| MS-69 | `host.focus()`, trigger focused before the show | trigger `blur` | against | E22 state | coherent |
| MS-48, 49 | `shown.vn.modal` (308) | event listener | `hide` / `destroy` | nested hide completes (events: show, shown, hide, hidden) / restored | coherent |
| MS-50, 51, 52, 53 | `#rehide` `display: none` revert (around line 457) | host `style` | `show` / `destroy` / toward, then `hide` / toward | nested state, no stale writes / restored / nested state / **host `show` with `display: none`** | coherent ×3 / data |
| MS-54, 55 | `#rehide` `aria-hidden` revert (around line 458) | host attribute | `show` / toward, then `hide` | nested state | coherent |
| MS-56, 57 | `#rehide` `aria-modal` revert (around line 459) | host attribute | `show` / `destroy` | nested state / restored | coherent |
| MS-58, 59 | `#rehide` `role` revert (around line 460) | host attribute | `show` / toward, then `hide` | nested state | coherent |
| MS-60, 61, 62 | `#rehide` backdrop destroy (around lines 462–464) | `disconnectedCallback` of an element placed in the backdrop at its await | `show` / `destroy` / toward, then `hide` | fresh backdrop, shown / restored / hidden | coherent |

## Stations on the path not reached

- **The reaction when `Backdrop.show` inserts the backdrop (`Backdrop.ts` around lines 74–76).**
  - A fresh backdrop holds no element when it is inserted, and no consumer code runs between `new Backdrop` (around line 267) and its `append`.
  - A reused backdrop on this path is still inserted and carries `show`, so `Backdrop.show` returns at its first guard (around line 68).
  - So the claim-4 backdrop trace cannot occur on the show path.
- **The `#adjust` padding-right branch (around line 503).** This host's Chromium hides scrollbars, so the measured width is 0.
- **The `scrollTop` writes and `reflow` (282–285).** They run no synchronous consumer code. The scroll event fires at the next frame, inside the fade await (the MS-38 class) or after completion.
- **The isolation's `MutationObserver` delivery.** Nothing is awaited after `new Isolation`, so it delivers after `show` has completed.
- **The isolation's `spare` claims.** `Modal` passes no `spare`.
- **Nested `show` or `hide` while `#changing` is true.** `#refused` (around line 406) refuses them. This is read on MS-11, 16, 21, 24, 30, 36, 40, 42, 46, and 47, and no row found a way past it.

## Deviation state

None: no source edit was needed and the whole probe file runs.

The seed interval is the only place on this path where the engine reads its identity after consumer code ran (cause i), and the interval has three doors. MS-5 and MS-67 (cause ii) are teardown loops finishing after their owner was destroyed; they write the recorded values back, so treat them separately from the stale-change writes.
