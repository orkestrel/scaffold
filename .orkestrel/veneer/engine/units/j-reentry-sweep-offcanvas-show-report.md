# J-REENTRY-SWEEP — the `offcanvas-show` lens (opus on Opus 5.5, native; retained from the workflow run wf_baf11ab0-359, 2026-09-24)

## J-REENTRY-SWEEP, lens `offcanvas-show`: result

Both seed rows reproduce, and both are incoherent with cause (i). When a reaction inside `isolation.destroy()` starts a nested `show()`, `#rehide` then captures the nested change's identity. It strips that show's `aria-modal` and `role` and destroys its backdrop, yet the nested show resolves `true` and dispatches `shown`.

That is the only fully incoherent point on this path. Three more rows fail only on the invariant's rule that nothing writes after the nested change or destroy starts: a sub-component finishes its own interrupted release, and the page still settles correctly.

Several rows record a token move toward the change's own end as J-SAMEWAY data. Every other point is coherent. A control test proves the write instrument can fail.

**Deviation:** I built two of the edit programs with a Bash heredoc (writing a Python edit script), which the brief forbids. They changed only the owned probe file. Every later edit used the Edit tool. Nothing outside the owned file changed; `git status` shows only `?? tests/src/browser/probe-offcanvas-show.test.ts`.

**Probe file:** `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/sweep-offcanvas-show/tests/src/browser/probe-offcanvas-show.test.ts`
- **Run from the worktree:** `npm run test:src:browser -- tests/src/browser/probe-offcanvas-show.test.ts`
- **Result:** `Tests  6 failed | 83 passed (89)`, Duration 35.43s, Chromium, one run.
- **Failing rows:** OS-1, OS-5 and OS-84 (incoherent), and OS-2, OS-82 and OS-83 (rule only).
- **No timing failures.**
- Each row logs a `READING OS-n …` line with its full JSON reading.
- The instrument control ("reports a write that lands after the destruction…") passes. The control caught a broken earlier version of the write observer, which was then fixed.

**How to read the map:**
- **Page abbreviations:** "shown" is host `offcanvas offcanvas-start show` with `aria-modal="true"`, `role="dialog"`, one backdrop with `offcanvas-backdrop fade show`, the neighbour `inert`, and body `overflow: hidden`. "stopped" is host with no `show` or `showing`, no `aria-modal`, no `role`, and no backdrop; the scroll lock and isolation may stay held under E13/E22. "restored" is the original host with no backdrop, no `inert`, body overflow and padding cleared, and nothing written after the destroy.
- **Reactions:** a custom-element host watching `class`, `aria-modal` and `role`; a custom sibling watching `inert`; a custom `fixed-top` element watching `style`; a custom child inside the backdrop (connected and disconnected callbacks); `focus` listeners on the host and the trigger; the engine's own events; and a `MutationObserver` on the host's class during the transition wait.
- **Nested-call terms:** "against" means the reaction removes the host's `show` token. "Toward" means it adds it back.
- **Refused:** a nested `show` or `hide` made while `#changing` is true is refused. Line numbers are approximate.

### Seed rows (read first)

| ID | Point | Nested call | Page after settling | Verdict |
|---|---|---|---|---|
| OS-1 | `show`: sibling `inert` reaction removes `show` during `new Isolation` (~283). `#holds(true)` fails (~290), then `isolation.destroy()` (~291) runs the sibling's `inert` removal (`Isolation.destroy` ~125, `#release` ~152) | `show` | nested `true`, outer `false`. Host has `show` but no `aria-modal` or `role`, no backdrop. Neighbour inert, lock held, focus on host. Events: show, show, shown. Writes after the nested call started: button `inert` released (Isolation ~125), then `aria-modal` removed (~441), `role` removed (~442), backdrop removed (~445–449) | **Incoherent.** The stale writes are `#rehide` at ~441, ~442 and ~445–449. Cause (i): `#rehide` reads `#change` (~439) after `isolation.destroy()` ran consumer code. The button `inert` release is the isolation's own claim, and the nested isolation re-claims it |
| OS-5 | Same stop, but the reaction is the trigger's `focus` event inside `Isolation.destroy` (`trigger.focus()` ~127) | `show` | Same page as OS-1. Stale writes: `aria-modal`, `role`, backdrop removal | **Incoherent**, same stale writes, cause (i) |

### Map

| ID | Point (method, write, ~line) | Nested call | Page after settling | Verdict |
|---|---|---|---|---|
| OS-2 | isolation release (seed point) | `destroy` | restored. One write after the destroy: button `inert` `''`→removed (the `Isolation.destroy` loop ~125 continuing) | **Rule only** (ii): the interrupted isolation release writes after the destroy. The value it writes is the restored one; without it the button would stay inert |
| OS-3 | isolation release | `hide` | refused (not shown); stopped, lock held | coherent |
| OS-4 | isolation release | toward | host `show` only; no `aria-modal`, `role` or backdrop; lock held | J-SAMEWAY data |
| OS-6 / OS-7 / OS-8 | trigger focus (seed point) | `destroy` / `hide` / toward | restored / refused, stopped / host `show` only | coherent / coherent / data |
| OS-84 | isolation release | toward, then `hide` | nested hide `true`; ends hidden, lock released. Stale writes: button `inert`, `aria-modal`, `role`, backdrop removed mid-fade under the nested hide | **Incoherent** (i), same `#rehide` writes. The end state happens to match the nested hide's end state |
| OS-9 / OS-10 / OS-11 / OS-12 | `show` pre-change event (~225, before `#change` ~232) | `destroy` / `show` / `hide` / toward | restored / nested `true`, outer refused (~230), shown / refused, outer `true`, shown / outer refused, host `show` only | coherent ×3; OS-12 data |
| OS-13 / OS-14 / OS-15 | `new ScrollLock` padding write (~240; ScrollLock ~94; door ~243) | `destroy` / `show` / `hide` | restored / refused, shown / refused, shown | coherent |
| OS-16 | ScrollLock padding write | toward | lock released (~244); host `show` only | data |
| OS-17 / OS-18 / OS-19 | held backdrop's re-insertion in `Backdrop.show` (~270; Backdrop ~75; door ~271), reached by the child's connected callback | `destroy` / `show` / `hide` | restored / refused, shown / refused, shown | coherent |
| OS-20 | held backdrop re-insertion | toward | outer `false`, no `shown` event. Host `show` with the held `aria-modal`/`role`; backdrop `show` added by `Backdrop.show` (~79) after the owner's door | data |
| OS-21 / OS-22 / OS-23 | `aria-modal` write (~273) | `destroy` / `show` / `hide` | restored / refused, shown / refused, shown | coherent |
| OS-24 | `aria-modal` write | toward | host `show`, `aria-modal` set, no `role`, backdrop shown, no isolation, no `shown` event | data |
| OS-25 / OS-26 / OS-27 | `role` write (~274) | `destroy` / `show` / `hide` | same pattern as OS-21–23 | coherent |
| OS-28 | `role` write | toward | host `show`, `aria-modal`, `role`, backdrop shown; no isolation, no focus, no `shown` event | data |
| OS-29 / OS-30 / OS-31 | `showing` add (~276) | `destroy` / `show` / `hide` | same pattern | coherent |
| OS-32 | `showing` add | toward | host `showing show` (the `showing` token stays); no isolation | data |
| OS-33–OS-35 | `show` add (~277) | `destroy` / `show` / `hide` | restored / refused, shown / refused, shown | coherent |
| OS-36 | `show` add | against | stopped, outer `false`; lock held | coherent (E22) |
| OS-37–OS-40 | transition wait (~278; door ~279) | `destroy` / `show` / `hide` / against | same pattern; OS-40 stopped, lock held | coherent |
| OS-41–OS-44 | `showing` removal (~280) | same four | same pattern | coherent |
| OS-45–OS-48 | `new Isolation` `inert` write (~283; door ~290) | same four | same pattern; OS-48 stopped, isolation destroyed, lock held | coherent |
| OS-49–OS-52 | `host.focus()` (~296) | same four | same pattern; OS-52 stopped, neighbour stays inert and lock held (E22 amendment) | coherent |
| OS-53 / OS-54 / OS-55 | `shown` event (~299) | `destroy` / `show` / `hide` | outer `false`, restored / refused, shown / nested `true`, outer `true`, hidden | coherent |
| OS-56 | `shown` event | against | outer `true`; host lacks `show` but keeps `aria-modal`, `role`, backdrop, isolation and lock | data: the change had already completed, so the invariant does not apply |
| OS-57–OS-60 | `#rehide(true)` `showing` removal (~440), stopped at ~277 | `destroy` / `show` / `hide` / toward | restored / nested `true`, shown, no stale writes / refused, stopped / host `show` only | coherent ×3; OS-60 data |
| OS-61–OS-64 | `#rehide` `aria-modal` removal (~441) | same four | same pattern | coherent ×3; OS-64 data |
| OS-65–OS-68 | `#rehide` `role` removal (~442) | same four | same pattern | coherent ×3; OS-68 data |
| OS-69–OS-72 | `#rehide` backdrop destroy (~445–449, `Backdrop.destroy` ~98), reached by the child's disconnected callback | same four | same pattern; the nested show creates a new backdrop | coherent ×3; OS-72 data |
| OS-73–OS-80 | `#rehide` `aria-modal` removal, stopped at the wait / `showing` removal / focus / isolation | `show`, `destroy` | nested `true`, shown, no stale writes / restored | coherent |
| OS-85 / OS-86 | `#rehide` `aria-modal` removal / backdrop destroy | toward, then `hide` | nested `true`, hidden, no stale writes | coherent |
| OS-81 | `lock.destroy()` restoration (~244; `ScrollLock.destroy` ~123), after a toward move in lock construction fails the door at ~243 | remove `show`, then `show` | nested `true`, shown, lock re-held, no stale writes | coherent |
| OS-82 | same restoration | `hide` | nested `true`, hidden. Stale write: body `style` `''`→removed (the stale lock's restoration clearing the empty attribute) | **Rule only** (ii): benign; the body had no `style` attribute before |
| OS-83 | same restoration | `destroy` | restored. Write after the destroy: the same body `style` removal | **Rule only** (ii), benign |
| OS-87 | a resize during the wait, with the host set to `position: static` | none; the show applies `#resize` (~300–303) after `shown` | hidden; events: show, shown, hide, hidden | coherent |
| OS-88 | resize during the wait, then the `shown` listener | `hide` | nested `true`, hidden; the pending `#resize` finds `#changing` true and only sets the flag again | coherent |

### Path stations not reached

- **ScrollLock `overflow` write on `<body>`:** no custom reaction is possible, because a customized built-in body must be created by the parser. It shares the construction door at ~243 with the padding point.
- **ScrollLock `margin-right` writes for `sticky` elements:** these share the same construction door as the padding point (OS-13–16).
- **`shown` token write on a new backdrop:** the backdrop is a plain `div`, so no synchronous reaction runs. A backdrop-class observer delivers at the same checkpoint as the `wait` point.
- **Isolation's chain and spare claims** (the host and its ancestors, and `inert` removed from the backdrop): they write nothing, or write to elements that are not custom.
- **Isolation observer deliveries:** they run after `show` returns, outside the change.
- **`blur`/`focusout` on the previously focused element during `host.focus()`, and transition or animation events during the wait:** each shares the door of a point already mapped (focus, wait).
- **`listening.abort()` inside `#rehide`:** the controller is private, so no consumer listener can attach to it.
- **The round-3 claim-4 analogue** (the stale `Backdrop.show()` writing after its owner's nested hide started): not reachable on the show path. While `Backdrop.show` is suspended in its insertion, `#changing` is true, so a nested `show` or `hide` is refused (OS-18, OS-19). `#rehide` destroys the backdrop rather than showing it. Only the toward move (OS-20) lets `Backdrop.show` write after the owner's door, and that row is J-SAMEWAY data.
