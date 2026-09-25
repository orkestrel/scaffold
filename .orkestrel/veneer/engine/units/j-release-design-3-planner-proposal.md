# J-RELEASE-DESIGN round 3 — the subjective lane's proposal (planner on Opus 5.5, 2026-09-25; brief units/j-release-design-brief-3.md)

**Lane:** subjective lane (`planner`, Opus 5.5). I held shape, naming, ergonomics, and design fit. The brief's Output section sets the shape of this proposal. The lane's Alternatives, Tensions, and Risks are folded into sections 1 and 5.

**Short roots used in citations:**
- **E** is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b/src/browser/`, Veneer `3bb9afb`.
- **M** is `C:/Users/mikes/WebstormProjects/veneer/src/browser/`, on `main`.
- **D** is `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`.
- **R** is `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`.

---

## 1. Rulings

### Q1. The mechanism: candidate B, housed in a `Lifetime` class that replaces each owner's `AbortController`

**The shape.** Every engine and primitive swaps `readonly #controller = new AbortController()` for `readonly #lifetime = new Lifetime()`. A `Lifetime` has three parts:
- a signal, which aborts once;
- a ledger of holdings, each a resource the owner took, paired with its release;
- a `destroy()` that aborts on the first call, then drains the ledger on every call, newest holding first.

**How holdings behave.**
- A holding stays in the ledger while its release runs. It leaves only after the release returns, and only if the ledger still holds that same entry.
- A `destroy()` nested inside a release runs every pending release again, including the one still running. It returns only when the ledger is empty.
- `hold` on a lifetime whose destruction has begun releases the resource at once.

This generalizes `HostSnapshot`'s `#owned` (M/HostSnapshot.ts:94, :136, :318) from host writes to resources.

**Why B wins over A.**
- A is the `destroy` shape of `Dropdown`, `Tooltip`, and `Placement` (E/Dropdown.ts:323-337, E/Tooltip.ts:541-559, E/Placement.ts:241-262). It is correct only while every station clears its field after the release returns.
- The siblings that already carry A still break I2: E/Dropdown.ts:267-269 (REPLACE), E/Tooltip.ts:835-839 (S2 row 4), and E/Tooltip.ts:642-644 (S2 row 9).
- Under B, `destroy()` reaches a holding through the ledger, never through the field. The order in which a field is cleared stops mattering, and I2 no longer depends on discipline at each station.
- The law requires one shared implementation of a pattern that repeats across every engine: "Centralize any pattern repeated twice" (R/architecture.md:298).
- B passes the wrapper test. It adds a real invariant, a reentrant drain with identity-checked removal (R/architecture.md:157; AGENTS.md:70).

**Why B does not extend `HostSnapshot`.**
- `HostSnapshot` records host state in static per-element maps shared across owners, and the last holder writes the record back (M/HostSnapshot.ts:78, :196-204).
- A holding belongs to one owner and is released newest first.
- `HostSnapshotCategory` is a closed union of kinds of host state (M/types.ts:330). Adding resources to it breaks "One concept, one term" (AGENTS.md:60).
- The vocabulary therefore stays split: a snapshot *saves* and *restores* targets, and a lifetime *holds* and *releases* resources.

**Home and type.**
- `src/browser/Lifetime.ts`, one flat class at the environment root.
- `LifetimeInterface` in `src/browser/types.ts` (section 2).
- A row in the barrel and the guide. The class is named in public signatures, so it is always barrelled (R/architecture.md:276).
- Its first real consumers are the primitives' own holdings, so it passes the "Minimal public API" creation gate.

**Membership through the signal.** Every Veneer class whose options take `signal` calls `Lifetime.join(signal, this)` after its claim and before its first write:
- When a `Lifetime` owns that signal, the class becomes a holding of that lifetime, with `destroy` as its release.
- When the signal is foreign, it keeps today's behavior: the signal's abort destroys the class.

The option types do not change. An owner passes `this.#lifetime.signal`. This closes construction-time takes with no option churn:
- `Placement` inside `Dropdown.show` and `Tooltip.show`;
- `Isolation` inside Modal and Offcanvas;
- `Swipe` inside the `Carousel` constructor;
- every engine `Delegate` and `Collapse` construct.

The `signal` contract grows by one sentence: a class constructed with a lifetime's signal is released by every destruction of that lifetime, a nested one included.

**Engine `destroy` after adoption.** The one-time step stays latched, and the drain runs on every call:
```ts
destroy(): void {
	if (!this.#lifetime.signal.aborted) Modal.#registry.release(this.#host, this)
	this.#lifetime.destroy()
}
```
The claim release stays outside the ledger. The guide requires it to run before any restoration (`guides/veneer.md:928-929`), and a drain that releases newest first would reach it last. Each engine holds its `HostSnapshot` at construction, `this.#lifetime.hold(this.#snapshot, (snapshot) => snapshot.restore())`, so the snapshot drains last.

**Returning-step list.** A call's `HostWrite` list stays a local of the call. The list does not need to be reachable from `destroy()`:
- E22 rules that a destroyed engine returns nothing, and its snapshot restores (D:142).
- Under Q2, the `recordHostWrite` function takes the snapshot and saves every target it records, in the same call.

The pairing S6 row 16 found only by hand becomes one fact.

**The constraint that stops over-reach:**
- A lifetime holds only a resource its owner's own take returned, keyed by identity.
- Each release acts on the resource the lifetime holds. A fresh read of the page may only skip a release that is already done.
- A lifetime never takes a resource again.
- It holds no timer, listener, or host write that a signal or a snapshot already owns.

**Installed primitives.** None fits.
- I searched `@orkestrel/contract` (`dist/src/core/index.d.ts`) and `@orkestrel/test` (`dist/src/{core,browser,server}`) for dispose, ledger, stack, defer, release, cleanup, and teardown.
- The hits are prose about traversal stacks and test scratch teardown. Neither package exports a ledger, a disposable stack, or a release helper.
- The platform's `DisposableStack` is refused. By the ECMAScript specification's reading, its `dispose()` returns at once once the stack is disposed, which is the same latch that causes this defect. This is a reading of the specification, not a run (section 5, item 4).

**The Unknown.** The mechanism expresses the takeover rules without a special case per engine:
- E24's doors stay reads of the call's identity, with `#lifetime.signal.aborted` in place of the controller's signal.
- E22's lock that a stopped show keeps is a holding the returning step does not release. The hide releases it, and a destruction drains it.
- E18's "never removes a tip other code moved" becomes the owner's choice not to call `release` on a takeover. The tip stays held, and a destruction removes it while it is still in its container.
- One place the mechanism cannot reach is the platform's own popover close, when it is already under way (section 5, item 1).

### Q2. The save moment

**The rule.** A lifetime snapshot saves a target at the engine's first write that changes it. Every save call passes the value it is about to write.

**The exceptions:**
- **A write that changes nothing joins a record a live snapshot already holds, and never creates a record.** This narrows E25's Tab clause (D:176), "whether it writes it or finds it already written", to "finds it written by an engine that still holds it". It is also the rule the `ScrollLock` group (M/ScrollLock.ts:72-76) and `Isolation`'s claim stack already follow by hand.
- **The presence record is read at the first save of a token or property.** It therefore follows the same moment.

**Reconciliation with E25.** E25 exists so that a destroyed sibling's restoration cannot strip a live tab's roles. That protection needs a live record to join. Where markup alone carries the value, no engine will write it back, so a join protects nothing. It would only pin the value against the consumer's later edits, which is D-SAVE's harm.

**Rows that are defects:**
- S1 D-SAVE (E/Dropdown.ts:601-606) and P-SAVE (E/Placement.ts:126, :132, :215).
- S5 T10 (M/Toast.ts:338-343), A3 (M/Alert.ts:135), and B1 (M/Button.ts:60-61).
- S5 C1, both witnesses (M/ColorMode.ts:51, :89-95). ColorMode moves onto `HostSnapshot`.
- S3 I4s (M/Isolation.ts:139, saved before a toggle that changes nothing).
- The Carousel half of S4 R3.
- The same rule converts every other `#save` that saves at the start of a call, even where no map listed it: Modal (M/Modal.ts:580-591), Offcanvas, Collapse, and Tab's `#save`.

**The agreement write of E24.** When the host writes the call's end first, the call's write changes nothing and records nothing. Today the snapshot already reads the host after the listener, so the end state does not change.

### Q3. The primitives

Each primitive gets its own `Lifetime`, and each `destroy` becomes a drain.

**`Placement`:**
- It holds the promotion only when its own `showPopover()` call opened an element it found closed. It holds the promotion when that call returns.
- The release reads `:popover-open` only to skip a close that already happened, and then calls `hidePopover()`.
- It holds its observer after `observe`, and its snapshot at the start of construction.
- **PROMOTION** closes by construction. A static placement never holds a promotion, and neither does a placement over an element another caller opened (E/Placement.ts:125-128, :248).
- **OPEN-ABORT** closes by the rule that `hold` on an ended lifetime releases at once. A promotion whose `showPopover()` returns after an abort is hidden inside `hold`. The second destroy's skip on the aborted controller goes away (E/Placement.ts:242, :266-269).
- **CLOSE-REENTRY:** the nested drain runs the promotion's running release again and then the snapshot restoration. Whether a nested `hidePopover()` closes the element before it returns is a platform question (section 5, item 1).

**`Isolation`:**
- It holds the focus return first, keyed by the trigger, so it releases last.
- It holds its snapshot second, and each claim as it takes it.
- A reaction inside a hand-off write that destroys the owner now drains the rest of the claims, the restoration, and the focus (I3s, M/Isolation.ts:125-133).
- The remark "A second call does nothing" (M/types.ts:488) is replaced by the drain sentence.

**`ScrollLock`:**
- Its release leaves the document's group. When the group empties, the lock holds the group snapshot's restoration in its own lifetime, so a nested destroy restores it again before it returns.
- This closes S3's S3 row, where the group is deleted before the restoration and cannot be reached again (M/ScrollLock.ts:135-136).
- The same remark (M/types.ts:591) is replaced.

**`Backdrop`:** the owner holds it. Its `destroy` keeps its single, idempotent removal (M/Backdrop.ts:98-102). The letter-only rows M3, M13, O2, and O11 close by construction.

**`Swipe`:** it gains the same `signal` option the other primitives carry and calls `Lifetime.join` before its token write (M/Swipe.ts:67-68). This closes K3.

### Q4. `Delegate`

The mechanism carries every row.
- **Row 8, the latch at M/Delegate.ts:455:** the delegate's owned engines are holdings, and `destroy` drains them.
- **Row 9, the delete before the destroy at M/Delegate.ts:1087-1088:** becomes `this.#lifetime.release(engine)`.
- **Row 10, `#construct` at M/Delegate.ts:986-1001:** each route passes the delegate's `#lifetime.signal` into the engine it constructs. The engine joins the ledger before its first write. `hold` on an ended lifetime replaces the check at :998-999.
- **Row 11 (holds today), `#discard` at :1063-1080:** releases through the ledger each engine the registry no longer returns, rather than dropping it. A release that is running is never dropped.
- The comment at :458-459 about releasing in reverse order stays true, because the ledger releases newest first.

### Q5. The fresh reads

**S2 rows 2, 5, 8, and 9: follow from the mechanism.** The link is a holding, and the held resource is the record itself:
```ts
this.#lifetime.hold({ id, added, described }, (link) => this.#unlink(link))
```
The release receives the recorded `{ id, added, described }`. This retires the `tip.id` read (E/Tooltip.ts:848) and the clearing of `#linked` before the write (E/Tooltip.ts:859). Row 5(a)'s scope question becomes moot.

**S2 row 10, `#occupy`'s stale origin: a direct fix** (E/Tooltip.ts:742-748). It concerns a record, not a holding. The rule: an element other code moved out of its recorded slot has ended that record, and the next take records its origin afresh.

**S4 T2, I1: follows from Q2.** The `recordHostWrite` function saves at the write, so the dropdown targets that `#selection` writes after the blur (M/Tab.ts:232, :252, :266) are saved when they are written. A destruction then restores them.

### Q6. The units

Section 4 gives the units. How each row that is not a defect is ruled:
- **HIDE** (ruled in the brief); **S4 C7 and R4**; the Toast `fade` left after a completed hide; the tooltip content left in a removed tip; **S3 M10, M11, O7, and O8**: a completed hide ends in Bootstrap's state, per the brief's ruling.
- **S3 M3 and O2 (I1)**, and the backdrop-relocation half of **M14 and O6**: a consumer that moves the backdrop is outside the contract (D:270-274).
- **S3 M5:** a detached host is outside the contract (D:272). A host in a shadow tree is Bootstrap's append. Not a defect (section 5, tensions).
- **S4 R2:** E25's behavior as ruled (D:172). Not a defect.
- **S5 ColorMode storage:** storage is not host state.
- **S5 Alert un-returned removal:** no row names a `violates` ruling here. I left it to the Orchestrator.
- **S6 row 15:** no observable effect.
- **The S3 referral on a lock taken during restoration:** it concerns a take, not I1 or I2. It becomes an observation in J-RELEASE-LIFETIME.
- **The E24 and I2 referrals** (S2, S3 F2, S4 R1): I2 governs. The clause at D:165, "Ruled conforming, no change: a restoration already running inside …", is superseded and needs a decision amendment.
- **The E22 and I1 referral** (M4, O3): already ruled by D:291-297.

---

## 2. The contract (`src/browser/types.ts`)

```ts
/** Holds what an owner took, each resource with the release that gives it back, and gives every holding back when the owner is destroyed. */
export interface LifetimeInterface {
	/** Carries the signal that aborts when destruction begins; a class constructed with this signal joins the lifetime as a holding before its first write. */
	readonly signal: AbortSignal
	/**
	 * Holds a resource the owner took until its release returns, or releases it at once when destruction has begun.
	 *
	 * @param resource - The object the take returned, which keys the holding.
	 * @param release - Gives the resource back; it receives the held resource, so it acts on what the take recorded and never on a fresh read of the page.
	 * @returns The resource, so a take holds what it returns in one expression.
	 * @remarks
	 * A resource the lifetime already holds keeps its first release. A holding taken after destruction began is released inside this call and stays held while that release runs.
	 * @example
	 * ```ts
	 * const observer = lifetime.hold(new ResizeObserver(listener), (held) => held.disconnect())
	 * ```
	 */
	hold<TResource extends object>(resource: TResource, release: (resource: TResource) => void): TResource
	/**
	 * Gives one held resource back now, and ends the holding after its release returns.
	 *
	 * @param resource - The resource to give back.
	 * @returns True if the lifetime held the resource; false otherwise.
	 * @remarks
	 * The holding stays in the lifetime while its release runs, so a destruction nested in that release runs it again, and the holding ends only while the lifetime still holds that same entry.
	 * @example
	 * ```ts
	 * lifetime.release(placement)
	 * ```
	 */
	release(resource: object): boolean
	/**
	 * Aborts the signal on the first call, then gives back every holding still pending, newest first.
	 *
	 * @remarks
	 * Every call drains, a call nested in one of the releases included: it runs each pending release again, the running one included, so it returns only after every holding is given back, and the call it interrupted, resuming, finds nothing left. Each release finishes what it has pending when it runs again and writes nothing it already wrote. A release that throws ends its holding; the drain gives back every other holding and then rethrows the first error.
	 * @example
	 * ```ts
	 * lifetime.destroy()
	 * ```
	 */
	destroy(): void
}
```

**Static method.** `Lifetime.join(signal: AbortSignal | undefined, resource: Pick<LifetimeInterface, 'destroy'>): void`, documented in the guide the way `find` is:
- It holds `resource` in the lifetime that owns `signal`.
- Otherwise, the signal's abort destroys the resource, or destroys it at once when the signal has already aborted.
- It is named `join` rather than `bind` so it does not shadow `Function.prototype.bind`.

**Changed members:**
- `HostSnapshotInterface.save(target: HostSnapshotTarget, value: string | undefined): void`. It joins the target's record before a write of `value`. It reads the element only when the write changes the target and no snapshot holds it. A write that changes nothing joins a live record and records nothing otherwise.
- `recordHostWrite(writes, target, next, snapshot: HostSnapshotInterface)`. It also saves `target` into `snapshot` under the same rule.
- One predicate for "the write changes the target" in `helpers.ts`, shared by both. It keeps the priority clause from M/helpers.ts:965.
- No unconditional `save` remains (E6).

---

## 3. The invariant, the bound, and the consumer's interface

- **Invariant:** Every resource an owner takes is held by its lifetime from the moment the take returns until its release returns. Every release acts on the resource it was given, and every call to `destroy`, a nested one included, gives back every pending holding before it returns.
- **Bound:** A lifetime holds only what its owner's own take returned, and a snapshot records only a write that changes its target, or joins a record that another live engine holds. Nothing the owner found, and nothing other code took back, is ever released.
- **Consumer's interface:** An engine's `destroy()`, called at any point, including inside consumer code that one of its releases runs, returns only after every write the engine made has been written back and every resource it took has been given back.

---

## 4. The unit plan

**Routing reason.** Every writing unit is `opus` on Opus 5.5, native, because its proofs are browser tests that an Astra bench sandbox cannot host (Bench law 5; the E23 precedent at D:153). J-RELEASE-SAVE and J-RELEASE-DELEGATE would otherwise route to `sol`. Record that deviation in the ledger.

**Audits.** Each audit runs `analyst` on GPT-6 Astra (objective lane) and `reviewer` on Opus 5.5 (subjective lane). It adds `checker` through the Grok ladder for row coverage.

**Every unit's acceptance:**
- each witness it carries reads red on its base and green after the change;
- no `destroy` in its files opens with `if (…aborted) return`;
- no field is cleared before the lifetime release it names;
- every `snapshot.save` call passes a value;
- guide parity is green;
- E6 holds: no dead path remains.

**Before any unit.** Record a decision entry that:
- adopts this mechanism;
- supersedes the "ruled conforming" clause at D:165;
- narrows E25's Tab clause at D:176.

Tell J-SAMEWAY-ENGINES-B that round 5 does not hand-fix REPLACE or the S2 rows. J-RELEASE-POPUPS carries them, and one carrier per finding avoids a conflict.

**The units, in order:**

1. **J-RELEASE-SAVE** (`opus`, Opus 5.5)
   - **Runs after:** J-SAMEWAY-ENGINES-B round 5, J-MOTION-PROOFS-B, and J-ORACLE-FIX-OFFCANVAS land.
   - **Owns:**
     - `HostSnapshot.ts`; `HostSnapshotInterface` in `types.ts`; `helpers.ts` (`recordHostWrite` and the predicate);
     - every `save` call site in `src/browser/*.ts`; ColorMode on `HostSnapshot`;
     - `HostSnapshot.test.ts`, `helpers.test.ts`, and every test the changed save moment makes false (derive them by running the suite);
     - guide § Ownership and restoration's save paragraph, the `#### Tab` restoration sentences, and the Button summary sentence.
   - **Witnesses:**
     - D-SAVE and P-SAVE;
     - T10(b), both cases; A3(c); B1(e); C1(f), both;
     - I4s; S4 R3 (the Carousel item token);
     - S4 T2 I1 (the `blur` dropdown);
     - an E25 narrowing case: a tab over markup that already carries its roles keeps a consumer's edit through its destruction.
   - **Structural claim:** every `recordHostWrite` target is also saved, which is S6 row 16.

2. **J-RELEASE-LIFETIME** (`opus`, Opus 5.5)
   - **Runs after:** SAVE. It lands before J-TOAST-SWIPE, which grows `Swipe` (E33); tell that unit.
   - **Starts with:** the platform readings in section 5, items 1 and 2. It stops if a reading contradicts Q3.
   - **Owns:**
     - `Lifetime.ts`; `LifetimeInterface` in `types.ts`; the barrel row;
     - `Placement.ts`, `Isolation.ts`, `ScrollLock.ts`, `Backdrop.ts`, and `Swipe.ts`, with their tests;
     - the options and remarks of the Isolation, ScrollLock, Placement, and Swipe contracts;
     - guide § Ownership and restoration's drain paragraph, plus the Surface and Methods rows.
   - **Witnesses:**
     - PROMOTION, CLOSE-REENTRY, and OPEN-ABORT;
     - I3s; S3's S3 row;
     - `Lifetime` cases: a nested destroy drains; `hold` after the end releases at once; a holding leaves only after its release returns, and only while it is the same entry; newest first; a throwing release;
     - the stale-measurement referral, taken as an observation.
   - Owners that still pass a plain controller signal fall back to an abort listener, so the unit lands without touching any engine.

3. **J-OVERLAYS** (`opus`, Opus 5.5; the queued unit, widened)
   - **Runs after:** LIFETIME.
   - **Owns:** `Modal.ts`, `Offcanvas.ts`, their tests, and `#### Modal` and `#### Offcanvas` in the guide.
   - **Witnesses:**
     - the E24 prior-value return: M4, O3, the host half of M14, the host half of O6, and F1;
     - the drain: M7, M12, M15, O5, O10, and O12;
     - letter-only structural claims: M3, M13, O2, and O11.

4. **J-RELEASE-POPUPS** (`opus`, Opus 5.5)
   - **Runs after:** LIFETIME, in parallel with units 3, 5, and 6 in worktrees. Its guide patch is report-only.
   - **Owns:** `Dropdown.ts`, `Tooltip.ts`, `Popover.ts`, their tests, and their guide paragraphs, including the Tooltip remark at E/Tooltip.ts:113-116.
   - **Witnesses:**
     - REPLACE;
     - S2 rows 2, 4, 5(a), 5(b), 6, 7, 8, 9(i), and 9(ii);
     - row 10, the direct fix.

5. **J-RELEASE-SWITCHES** (`opus`, Opus 5.5)
   - **Runs after:** LIFETIME and J-TOAST-SWIPE, which owns `Carousel.test.ts` after J-MOTION-PROOFS-B (D:360).
   - **Owns:** `Collapse.ts`, `Tab.ts`, `Carousel.ts`, and their tests and guide paragraphs.
   - **Witnesses:**
     - C4, C5, and T2 I2;
     - T3, a direct fix: read the lifetime before `#writeInitial` (M/Tab.ts:143-153);
     - K3 and K4.

6. **J-RELEASE-SIGNALS** (`opus`, Opus 5.5)
   - **Runs after:** LIFETIME and J-TOAST-SWIPE, which owns `Toast.test.ts`.
   - **Owns:** `Toast.ts`, `Alert.ts`, `ScrollSpy.ts`, `Button.ts`, `ColorMode.ts`, and their tests and guide paragraphs.
   - **Witnesses:**
     - A2, a direct fix: `clear` before the `closed` dispatch, with the claim still released after it, so `find` inside `closed` keeps Bootstrap's reading;
     - ScrollSpy S1, both inputs: hold the observer, and release the one the field holds before assigning;
     - the drain in each engine's `destroy`.

7. **J-RELEASE-DELEGATE** (`opus`, Opus 5.5)
   - **Runs after:** units 3 to 6. The witnesses for rows 8 and 9 need the engines' drains (S6: "fixing the delegate alone does not close the violation").
   - **Owns:** `Delegate.ts`, `Delegate.test.ts`, and guide § Delegation's destruction sentences.
   - **Witnesses:** rows 8, 9, and 10, and row 11 read through the ledger.

**Exit criterion:** every map row with a `violates` ruling is closed by these units, or ruled in Q6 as not a defect.

---

## 5. What I could not settle

**Probes a unit must run:**
1. **Nested `hidePopover()` inside a closing `beforetoggle`.** Does it close the element before it returns, on Chromium 153? This decides whether CLOSE-REENTRY closes fully, or whether the guide states a platform bound. Probe: a case with `popover="manual"` that calls `hidePopover()` inside its own closing `beforetoggle` and reads `:popover-open` at once.
2. **`showPopover()` on an element that is already open.** Does it throw or do nothing? This fixes how the promotion-ownership rule reads "found closed". Probe: one line on Chromium 153.
3. **The names `Lifetime` and `join`.** The fleet's surface rule must clear them. Probe: `npm run test:policy` in the SAVE worktree. The runner-up name is `Ledger`.
4. **`DisposableStack` refusal.** A nested `dispose()` is expected to return while the outer call still has holdings pending. Probe: a browser case that records the order.
5. **A release that runs again and loops.** A release that writes again when it runs again could recurse through a reaction. The contract forbids it, and the `Lifetime` unit's case must show that a release which writes nothing twice terminates.

**Where the brief or a map disagrees with the code:**
- S3 § The source says every primitive in the slice latches on `aborted`. The code disagrees: `ScrollLock.destroy` aborts on every call and latches through the holder set (M/ScrollLock.ts:126-131).
- The S3 row ruling still stands on the code: the group is deleted before the restoration (M/ScrollLock.ts:135-136).
- No other citation failed to resolve where I checked it.

**Judgment calls, for the other lane to challenge:**
- **Membership through the signal.** `Lifetime.join` versus an explicit `lifetime` option on each class. The explicit option adds no hidden lookup, but it changes every constructor option and makes a consumer build a `Lifetime` in place of an `AbortSignal`.
- **`hold` after the end** releases at once, rather than throwing as `DisposableStack.use` does.
- **The drain continues past a throw** and rethrows the first error. `HostSnapshot` stops at a throw and withdraws.
- **The E25 narrowing** to records a live snapshot holds.
- **A2's split order:** clear before `closed`, release the claim after it.
- **Rows ruled not defects on the HIDE ruling or on parity:** M5, M10, M11, O7, and O8.
- **A primitive's `destroy`** becoming little more than `#lifetime.destroy()`. This sits close to the rule against a public method that only forwards (R/architecture.md:162).

**Risks:**
- J-RELEASE-SAVE touches every engine file. It must wait for the units in flight to land, and the suite run decides which tests it owns.
- The new end states on restoration will turn tests red where they pin the old save moment. That is expected, and each of those tests must read red first.
