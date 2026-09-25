# J-RELEASE-SWEEP slice S5 — the lens map (2026-09-25)

`reviewer` on Opus 5.5, holding the objective lens, in Workflow run `wf_29efd986-1c7`. The brief is `units/j-release-sweep-brief.md`. The lens's final message follows verbatim.

**Source review of slice S5, objective lens, reviewer on Opus 5.5.** I read the code and executed nothing, so every ruling below is a derivation, not a run.

- **Root:** `C:/Users/mikes/WebstormProjects/veneer` (`main`).
- **Files read in full:** `src/browser/Toast.ts`, `Alert.ts`, `ScrollSpy.ts`, `Button.ts`, `ColorMode.ts`.
- **Helpers read where they decide a release:** `HostSnapshot.ts`, `Registry.ts`, and in `helpers.ts` the functions `recordHostWrite`, `rewindHostWrites`, `readHostValue`, `writeHostValue`, `settleAnimations`, and `matchesDisabled`.
- **Result:** six violations and one ruling question. Five violate the bound "records nothing for a write that changed nothing", ScrollSpy's refresh violates I2, and the Alert close is the ruling question in Station table note (a).

## 1. Station table

Line numbers are approximate. Locate each station by its symbol.

| # | File:symbol (~line) | Holding | Taken | Given back | I1 | I2 |
|---|---|---|---|---|---|---|
| T1 | Toast.ts `show`, fade door (~196-200) | `fade` token record in the `written` local | `recordHostWrite` at 197, then the write at 198 | `#rewind` 331-333 → helpers.ts:982-989 | holds | holds |
| T2 | Toast.ts `show`, transition write (~203-213) | `showing` token record | 203-207 | `#rewind` | holds | holds |
| T3 | Toast.ts `show`, after the settle (~214-217) | `fade` and `showing` records | 197, 203 | `#rewind` | holds | holds |
| T4 | Toast.ts `show`, transition removal (~218-220) | same | same | `#rewind` | holds | holds |
| T5 | Toast.ts `hide`, transition write (~243-250) | `showing` record | 243-247 | `#rewind` | holds | holds |
| T6 | Toast.ts `hide`, after the settle (~251-254) | same | same | `#rewind` | holds | holds |
| T7 | Toast.ts `hide`, final removal (~256-260) | same | same | `#rewind` | holds | holds |
| T8 | Toast.ts `#holds`, a stop that is not a takeover (~309) | tokens the call wrote | as T1-T7 | none: `#change = {}` makes `#rewind` write nothing; the snapshot keeps them until destruction | n/a (documented, 288-293) | holds |
| T9 | Toast.ts `#arm` / `#disarm`, timer replacement (~346-361) | `#timer` | 351 | 359-360 | n/a | holds: `#arm` reads `aborted` at 348 |
| T10 | Toast.ts `destroy` (~265-273) | controller, timer, registry claim, `#snapshot` | `#save` 338-343, called at 192 and 239 | 267-272 | **violates** (bound) | holds |
| T11 | Toast.ts constructor catch (~149-152) | claim, listeners | 130, 135-148 | `destroy` | holds | holds |
| A1 | Alert.ts `close`, stopped (~129, 132, 139, 142, 145) | snapshot `show` record | 135 | no returning step; the snapshot keeps the record until destruction | n/a | holds |
| A2 | Alert.ts `close`, completed (~146-151) | snapshot `show` record, claim, controller | 135, 86 | `clear` 150, `#release` 151, both after the `closed` dispatch at 146 | **violates** (joined record; ruling question) | holds |
| A3 | Alert.ts `destroy` (~158-164) | snapshot, claim, controller | 135 | 162-163 | **violates** (bound) | holds |
| A4 | Alert.ts constructor catch (~99-102) | claim, listeners | 86, 90-97 | `destroy` | holds | holds |
| S1 | ScrollSpy.ts `refresh`, observer supersession (~210-236) | `#observer` | 226-235 | 212, disconnected before any consumer-reachable read | n/a | **violates** |
| S2 | ScrollSpy.ts `#deliver` / `#activate`, stopped delivery (~273, 285, 305-312) | `active` records | `#apply` 366-369 | none by design; the snapshot keeps them until destruction | n/a | holds |
| S3 | ScrollSpy.ts `destroy` (~238-248) | observer, claim, snapshot, click listener | 226-235, 156, 366-369, 164-166 | 240-247 | holds: saves only on change (366-369) | holds: disconnect at 241 comes before the clear at 242 |
| S4 | ScrollSpy.ts constructor catch (~177-180) | claim, listeners, observer | 156-175 | `destroy` | holds | holds |
| B1 | Button.ts `destroy` (~113-120) | snapshot, claim, controller | construction 60-61 | 115-119 | **violates** (bound) | holds |
| B2 | Button.ts `toggle` interrupted by `destroy` (~105-109) | none of its own | — | reads `aborted` after each write (106, 108) | n/a | holds |
| B3 | Button.ts constructor catch (~71-74) | claim, snapshot | 56, 60-61 | `destroy` | holds | holds |
| C1 | ColorMode.ts `destroy` (~89-95) | `#original` | construction 51 | 93-94 | **violates** (bound and E25) | holds in effect; see note (f) |
| C2 | ColorMode.ts constructor catch (~56-61) | root attribute | 57 | `destroy` 59 | holds | holds |

### Violations: smallest input and reachability

**(a) A2 — Alert.ts ~146-150. Reachable through a documented event and a shipped engine.**
- **Fault:** the snapshot still holds the `show` record, whose value is present, while `closed.vn.alert` listeners run. An engine that saves `show` there joins that pre-close record (HostSnapshot.ts:108-124) instead of reading the host. The alert then clears, and the joiner's destruction writes back the value from before the close.
- **Smallest input:** a connected `<div class="alert show">`, `new Alert(host)`, and a `closed.vn.alert` listener running `t = new Toast(host, { animated: false, autohide: false }); void t.show()`. After `close()` resolves `true`, call `t.destroy()`.
- **Result:** the closed alert keeps `show`. The Toast found the host without `show` and wrote it, and its destruction does not return that write.
- **Why this is a ruling question:** the guide, around lines 944-948, sanctions the joiner's write-back ("the last remaining holder of each record it shared writes that record back"). The case therefore conforms to E25 and breaks the consumer interface.
- **Candidate fix:** clear before the dispatch at 146. That changes the class remark's "Destruction restores the `shown` token" for a `destroy` called inside `closed`.

**(b) T10 — Toast.ts ~338-343. Reachable through shipped code.**
- **Fault:** `#save` records `show`, `showing`, and `fade` at every call, whether or not the call writes them.
- **Smallest input:** `t = new Toast(host, { animated: false, autohide: false }); await t.show(); host.classList.add('fade'); t.destroy()`.
- **Result:** the consumer's `fade` token is removed, although the engine never wrote `fade`.
- **Second case, the same fault:** a host shown by markup, whose `show` token the call finds and never writes, has that token written back.

**(c) A3 — Alert.ts ~135. Reachable through shipped code.**
- **Fault:** the save runs before the removal at 139 even when the removal changes nothing.
- **Smallest input:** `host.className = 'alert fade'`, then `a = new Alert(host); p = a.close(); host.classList.add('show'); await p` (resolves `false`), then `a.destroy()`.
- **Result:** the consumer's `show` token is removed.

**(d) S1 — ScrollSpy.ts ~212-235.**
- **Fault:** `refresh` reads `aborted` only at entry (211). Consumer code can run between the disconnect at 212 and the assignment at 234, through the `link.hash` getter at 254.
- **Smallest input, destroy:** `Object.defineProperty(link, 'hash', { get() { spy.destroy(); return '#s1' } })`, then `spy.refresh()`. A new IntersectionObserver is assigned and observing (234-235) after `destroy()` returned, so a holding outlives `destroy()`.
- **Smallest input, nested refresh:** the getter calls `spy.refresh()` once instead. The inner observer is overwritten at 234 without a disconnect, so it is unreachable from `destroy()`.
- **Effect:** deliveries write nothing (`#holds` at 349-350), so this is a leaked observation, not a page write.
- **Reachability:** consumer code in an own accessor on a platform member, not a foreign implementation of a Veneer contract. The Orchestrator must rule whether E30's out-of-contract class covers it.

**(e) B1 — Button.ts ~60-61. Reachable through shipped code.**
- **Fault:** the button saves at construction, before any write.
- **Smallest input:** `b = new Button(host); host.setAttribute('aria-pressed', 'mixed'); b.destroy()`.
- **Result:** the attribute is removed, although the button wrote nothing. The class summary ("restores its original state") documents this, so the summary conflicts with the bound.

**(f) C1 — ColorMode.ts ~51 and ~89-95. Reachable through shipped code.** ColorMode keeps a private record outside the shared snapshot, and no registry claims the root.
- **Construction-time capture:** `c = new ColorMode(); root.setAttribute('data-bs-theme', 'dark'); c.destroy()` removes the consumer's attribute.
- **E25 breach:** `a = new ColorMode(); a.apply('dark'); b = new ColorMode(); a.destroy(); b.destroy()` leaves the root with `data-bs-theme="dark"`, although it began without the attribute. After every controller is destroyed, a write remains.
- **I2 letter:** `#original` is cleared at 92, before the write at 93-94. A nested `destroy` or `apply` from a reaction writes nothing, and the single write completes before any reaction runs, so no wrong end state is reachable.

### Referrals to the Orchestrator

- **Alert.ts ~145, un-returned host removal.** Nothing records the host's parent. When a disconnection reaction re-adds `show`, the close resolves `false` with the host out of the document. No station returns the removal, and destruction does not re-insert the host. Rule whether E22's returning step reaches Alert.
- **ColorMode.ts ~79, storage write.** `destroy()` never returns the storage write. Rule whether persisting to storage counts as a "write the engine made".
- **Toast, `fade` after a completed hide.** A completed hide leaves the `fade` token its show wrote. This matches Bootstrap and conflicts with "A completed hide returns every write its show made".

## 2. Consumer code each station runs, and the fields still set while it runs

- **Toast `show`:**
  - It runs `show.vn.toast` listeners (180), class reactions inside the writes at 198, 209-212, and 218, the settle window (215), and `shown.vn.toast` listeners (221).
  - `#change`, the snapshot records, and the controller stay live throughout, and `#timer` is cleared at 189.
  - After `shown`, `#arm` (222) re-reads `aborted` (348).
- **Toast `hide`:** it runs the same kinds of code at 229, 248, 252, 256-259, and 261.
- **Toast rewind:** reactions run inside each write at helpers.ts:986. `owns` is read before each write (984).
- **Toast destroy:** restoration reactions run at 272. By then the claim is released (271), the controller is aborted (267), and the timer is cleared (268).
- **Toast listeners:** mouse and focus events run `#disarm` and `#leave`, which call `#arm`. They are bound to the controller signal.
- **Alert `close`:**
  - It runs `close.vn.alert` listeners (129), reactions inside the removal of `show` (139), the settle window (141), a disconnection reaction (145), and `closed.vn.alert` listeners (146).
  - **The snapshot holding, the claim, and the controller are all still set during `closed`.** This is station A2.
- **Alert destroy:** restoration reactions run at 163, after the release at 162.
- **ScrollSpy delivery:** it runs class reactions at 368 and `activate.vn.scrollspy` listeners (311). `#observer` and the snapshot records stay set.
- **ScrollSpy refresh:** it runs own accessors on links at 254. **`#observer` holds the disconnected old observer until 234.** This is station S1.
- **ScrollSpy destroy:** restoration reactions run at 247, after `#observer` is cleared (242) and the claim is released (246).
- **Button toggle:** it runs reactions at 105 and 107 and `toggle.vn.button` listeners (109). **Button destroy:** restoration reactions run at 119.
- **ColorMode:**
  - Storage `getItem` runs at 52. A reaction runs at 74, and storage `setItem` at 79, inside `apply`.
  - The reaction inside `destroy` runs at 93-94, after `#original` is cleared at 92.

## 3. The source

In this slice each engine chooses its own save moment: at construction (Button, ColorMode), at call start for every token it might touch (Toast, Alert), or at the first changing write (ScrollSpy, 366-369). It also chooses its own order of lifetime-ending release against its own dispatches (Alert: `closed` at 146, then `clear` at 150). One change at the source would close both: a single recording step that saves a target into the shared `HostSnapshot` record only at the engine's first write that changes it (`recordHostWrite`'s no-op rule applied to the snapshot, the shape of ScrollSpy's `#apply`), which ColorMode joins in place of `#original`. The same step would end a lifetime's holdings before its final dispatch.

## 4. Claims the review could not break

1. The Toast returning step writes each recorded value. No consumer code runs between a record and its write (197-198, 203-212, 243-248). `rewindHostWrites` reads ownership before each write (helpers.ts:984).
2. The Toast timer is never armed after destruction, including through a `destroy` inside `shown.vn.toast` or `hide()` inside it. `#arm` reads `aborted` and the tokens at 348-350.
3. `destroy` releases the Toast's settle wait: the signal resolves the race, and the `finally` at helpers.ts:118-120 aborts the local controller.
4. ScrollSpy `destroy` disconnects before it clears (241-242). It records `active` only on a changing write (366-369), and the stale-observer guard `#observer === observer` holds (350).
5. A Button toggle or a ColorMode `apply` interrupted by `destroy` writes nothing more (Button 106, 108; ColorMode 78). A nested `destroy` in ColorMode's release write finds the release complete.
6. A `destroy` inside `closed.vn.alert` restores `show` on the detached host, as the class remark states (36-37).
7. Every engine in the slice releases its registry claim before it restores the host (Toast 271, Alert 162, ScrollSpy 246, Button 118). Every constructor failure path releases the claim, the listeners, and the observer before the error propagates.
