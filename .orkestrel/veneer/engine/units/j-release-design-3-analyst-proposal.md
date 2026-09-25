# J-RELEASE-DESIGN round 3 — the objective lane's proposal (2026-09-25)

`analyst` on GPT-6 Astra, read-only `codex exec`, thread `01a0d75a-714d-7190-b2a6-92d81a3a916e`, journal `tmp/codex/j-release-design-3-analyst.jsonl` (swept at acceptance). The brief is `units/j-release-design-brief-3.md`. The lane's final message follows verbatim.

## 1. Rulings on questions 1–6

**Recommend B: a shared ledger, with construction-time enrollment and synchronously resumable releases.** Merely retaining callbacks until they return is insufficient: the release itself must expose its unfinished work to reentry.

This is a source-review proposal. I changed nothing and ran no behavioral tests.

Citation roots:

- `V/` = `C:/Users/mikes/WebstormProjects/veneer/`, read at `0325b565835484094194ceefd686d4c761e21626`.
- `B/` = `V/tmp/worktrees/engines-b/`, verified at `3bb9afb062033ef12b76d18e9689c8730a02ba4b`.
- Unqualified source filenames below mean `V/src/browser/`; `B/` source citations mean `B/src/browser/`.
- `D` = [decisions.md](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md).
- `G` = [guides/veneer.md](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md).

### Question 1 — Mechanism

Choose a **`HostLedger` class in `src/browser/HostLedger.ts`**, composed alongside `HostSnapshot`, with its contracts in `src/browser/types.ts` and exports through `src/browser/index.ts`.

Do not extend `HostSnapshot` into a general resource manager. Its shared target records, restoration ordering, presence handling, and takeover behavior already constitute a distinct mechanism (`HostSnapshot.ts:100`, `HostSnapshot.ts:131`, `HostSnapshot.ts:187`). The ledger owns the reachability and release of snapshots, child engines, primitives, timers, observations, links, moves, and call journals.

A does not establish construction-time reachability, prevent post-destruction acquisitions, or connect a call’s write records to its lifetime snapshot. Its field discipline would remain repeated engine code (`B/Dropdown.ts:267`; `Carousel.ts:200`; `Delegate.ts:986`; `helpers.ts:982`).

The ledger must enforce these rules:

- Publish each holding **before** its acquisition can run consumer code.
- Refuse acquisition after lifetime termination.
- Retain the exact holding during release; retire only that entry after its release returns.
- On reentry, revisit an active release’s unfinished work and drain the other holdings.
- Never treat “release has started” as “release has finished.”
- Separate one-time lifetime termination from repeated draining.
- Preserve required release order through enrollment and composition; do not assume arbitrary resources are interchangeable LIFO callbacks.
- Release registry claims before any restoration can run consumer code.
- Prevent suspended construction, changes, and observer refreshes from acquiring or writing after destruction.

A callback that simply calls itself again is not a resumable release. Atomic DOM writes may mark their write as issued before invoking the platform because their synchronous reactions observe that write already applied; `HostSnapshot` uses this distinction at `HostSnapshot.ts:318`. A composite release needs recorded progress. A native operation that dispatches *before* changing state needs its own cancellation or nested-completion behavior.

**Call records:** introduce a `HostChange` journal enrolled in the owner’s ledger before its first write. Its `write` operation captures a target once, records the call’s prior value, joins the lifetime snapshot, and performs that same target’s write. Its `restore` resumes a reverse-order return with the original call identity.

Do **not** merge the call’s prior value with the shared lifetime value. E24 and E25 deliberately require different baselines (`D:291`; `D:172`). Destruction invalidates the call journal and drains lifetime restoration; it must not blindly rewind an obsolete call over another live holder or replacement engine.

The bound is **recorded ownership within the supported contract**, not arbitrary rollback of application state. E18 relocation rules, E22 retained acquisitions, E25 shared holdings, explicit terminal commands, and completed-state behavior remain domain decisions.

**Installed primitives:** the installed `@orkestrel/test` is `0.0.23`, although `V/package.json:102` declares `^0.0.24`. Its `createTeardown` is relevant but unsuitable: `TeardownInterface.destroy(): Promise<void>` awaits handlers, and its implementation detaches the handler list before release (`node_modules/@orkestrel/test/dist/src/core/index.d.ts:718`; `index.js:907`). A nested call cannot drain that detached list. The installed `@orkestrel/contract` is `0.0.18`; its inspected exports include `attempt`, which is an exception-to-result boundary, not a release ledger (`node_modules/@orkestrel/contract/dist/src/core/index.d.ts:205`). Neither installed package supplies the required mechanism.

### Question 2 — Save moment

**Default: save immediately before the first changing write, using the same captured target and intended value as the write.** Do not save all possible targets at construction or call entry.

Keep `HostSnapshot.save` as an explicit **join** operation. Add a change-aware `write` operation rather than changing `save` to reject unchanged targets: `save` has no intended value to compare, and its existing contract explicitly joins records (`types.ts:355`).

Exceptions are actual shared claims:

- Tab joins every attribute its initial plan names, even when unchanged, as E25 explicitly requires (`D:176`; `Tab.ts:443`).
- Every live Swipe claiming the pointer token must participate in its shared lifetime, including a later Swipe finding it already present (`D:171`; `Swipe.ts:67`).
- Isolation joins the records of its inertness claims, including unchanged claims; otherwise a sibling’s destruction can restore through a live claim (`Isolation.ts:135`).
- ScrollLock holders join the document lock, and Modal holders join the body’s `open` record; these are shared acquisitions, not speculative snapshots (`ScrollLock.ts:72`; `Modal.ts:274`).

Shared joins do not authorize redundant restoration writes. A restoration can release its record without writing when the target already equals its saved value and priority.

| Map row | Ruling |
|---|---|
| S1 D-SAVE | Defect: saving precedes the refused promotion and records toggle writes never made (`B/Dropdown.ts:262`). |
| S1 P-SAVE | Defect: unchanged static, side, and property writes acquire unnecessary restoration ownership (`B/Placement.ts:126`, `B/Placement.ts:215`, `B/Placement.ts:286`). |
| S5 T10 | Defect: Toast saves tokens its selected path never changes (`Toast.ts:338`). |
| S5 A3 | Defect: Alert saves an absent `show` token before a no-op removal (`Alert.ts:135`). |
| S5 B1 | Defect: construction records state before Button writes anything (`Button.ts:60`). |
| S5 C1 | Defect: construction capture and private restoration bypass change-aware recording and E25 (`ColorMode.ts:51`, `ColorMode.ts:89`). |
| S5 A2 | **Not a defect under the existing Alert/E25 contract.** The completed-event listener runs before Alert relinquishes its record, so another engine joins it legitimately (`Alert.ts:146`; `D:175`; `G:945`). |
| S4 R3, Carousel | Defect: saving every directional token captures unused targets (`Carousel.ts:722`). |
| S4 R3, Tab initial plan | Not a defect: the express E25 join requirement applies. |
| S3 I4s | Keeping the claim is correct; an unnecessary equal-value write-back should be eliminated by the shared snapshot writer (`Isolation.ts:139`; `HostSnapshot.ts:319`). |

S4 R2’s intermediate Tab state follows per-target shared ownership. Destruction relinquishes this engine’s holdings; it does not force every shared target back while another Tab still holds it (`D:172`; `G:940`).

### Question 3 — Primitives and promotion

**Placement.** Record promotion ownership separately from current platform openness.

- A static Placement takes no promotion and must close none.
- A dynamic Placement must distinguish an already-open element from a promotion it starts.
- Publish the opening acquisition before `showPopover()`.
- Keep an owned promotion reachable during closing.
- Restore placement styles and attributes through the same lifetime ledger.

The current release tests only `:popover-open`, and promotion release sits inside the one-time abort block (`B/Placement.ts:242`). That establishes PROMOTION and explains the construction/closing gaps.

**CLOSE-REENTRY:** keep promotion release eligible for nested completion. The HTML algorithm suppresses another closing event for a nested hide, providing a plausible platform mechanism for this; it is not evidence that the supported Chromium builds have passed the witness. [HTML Standard, hide a popover](https://html.spec.whatwg.org/multipage/popover.html#hide-popover-algorithm)

**OPEN-ABORT:** cancel an opening transaction while its `beforetoggle` is pending; closing it only after `showPopover()` returns is insufficient. An opening event is cancelable, but listener ordering and cancellation reachability must be proven. Restoring an original `popover="manual"` attribute does not itself cancel the pending opening (`B/Placement.ts:132`, `B/Placement.ts:138`, `B/Placement.ts:267`). [HTML Standard, show popover](https://html.spec.whatwg.org/multipage/popover.html#show-popover)

This native acquisition is the unresolved implementation gate in section 5. An ownership boolean alone does not close it.

**Isolation.** Its ledger must retain the claim handoffs, snapshot, observer, and focus return. Record progress through handoffs so nested destruction skips an already-applied handoff and completes those remaining; restore the snapshot before returning focus, and do not replay focus on reentry (`Isolation.ts:125`, `Isolation.ts:150`). Preserve newest-claim precedence.

**ScrollLock.** Retain the releasing group’s snapshot in an instance-reachable holding even after the document’s active holder record is removed. Removing the active group must not erase the pending restoration (`ScrollLock.ts:130`). A new lock encountered during that restoration must first complete the departing restoration before measuring fresh compensation; otherwise it can measure partially compensated styles (`ScrollLock.ts:103`). Do not merely keep a zero-holder group and let a new lock join an incompletely unlocked document.

**Backdrop.** Enroll its owned element before insertion and release that recorded element through the ledger. Its existing single removal does not demonstrate an observable nested-drain defect; the removal has landed when a descendant’s disconnection reaction runs (`Backdrop.ts:98`). Adopt the mechanism without inventing restoration of consumer backdrop relocations: E24 excludes those inputs (`D:270`).

E22’s stopped-show scroll lock and isolation stay in the lifetime ledger. They are not automatically placed in a call-return journal (`D:142`). The ledger cannot decide which acquisitions a stopped call retains.

### Question 4 — Delegate

S6 rows 8 and 9 are defects. Replace the whole-method latch and delete-before-destroy paths with ledger draining (`Delegate.ts:454`, `Delegate.ts:1084`).

Row 10 requires **enrollment during construction**, not a cleanup after `new` returns. `#construct(new Tab(...))` receives the engine too late (`Delegate.ts:986`).

Add an optional owner ledger to the construction contract. A child registers its release with that owner after initializing the state destruction needs, but before claiming resources, binding consumer hooks, or making construction writes. Delegate passes its ledger only when it constructs an engine; engines found through registries remain externally owned. Carousel uses the same mechanism for Swipe.

Abort signals remain cancellation notifications. They cannot be the only reachability route: a listener may already be running or removed while its resource still has releases pending.

Do not use registry absence as evidence that release completed. `Registry.release` correctly removes only the matching claim (`Registry.ts:44`), but the claim intentionally disappears before restoration. Delegate retires ownership on completion of the recorded holding, not on `find` returning undefined. This replaces the assumption in S6 row 11 without delaying registry release (`Delegate.ts:1060`).

### Question 5 — Fresh reads

These repairs belong to **record acquisition by kind**, followed by the common release path; a ledger alone cannot manufacture missing facts.

- **Tooltip link:** retain `{ id, added, described }` as a holding before linking. Hide, refusal, rebuild, return, and destruction release that record. Never substitute a later `tip.id` (`B/Tooltip.ts:469`, `B/Tooltip.ts:848`). The release may read the current token list to preserve unrelated IDs; the identity and prior membership it removes come from the record.
- **Tooltip content:** retain `{ element, parent, sibling, slot }`. If the element left its recorded slot, relinquish that move without moving it back. A later acquisition records its new origin. Reusing the old parent after external relocation is incorrect (`B/Tooltip.ts:742`; `D:96`).
- **Retained tips:** a stopped hide that leaves an owned tip in its original container must keep its holding for destruction. A tip moved by other code is relinquished under E18. Re-adding `show` is not an element relocation (`B/Tooltip.ts:650`, `B/Tooltip.ts:831`).
- **Tab:** capture the dropdown target plan once before the blur/consumer-code interval, then use its exact targets for recording and writing. Move baseline capture to each actual write; do not capture every value early (`Tab.ts:216`, `Tab.ts:232`, `Tab.ts:496`).

### Question 6 — Adoption and non-defects

Adopt the mechanism through the ordered units in section 4. Every violating map row is assigned there or excluded below.

The withdrawn completed-hide requirement removes these alleged defects:

- S1 HIDE.
- S3 M10 and M11; O7 and O8.
- S4 C7/R4.
- S5’s retained `fade` after completed Toast hide.
- S2’s element content retained in a removed tip after completed hide.

These are completed state transitions, not stopped-call returns. Their destruction records still obey the mechanism. Modal’s documented completed hide explicitly removes padding and writes its hidden attributes (`G:2121`); E24’s prior-value rule governs a **returning step**, not that completed hide (`D:291`).

Further dispositions:

- **S3 M3/O2 connection mismatch, M8 sibling-order concern, M14/O6 relocated-backdrop variants:** excluded by E24’s backdrop ownership constraint (`D:270`). Their independent host-return and reachability findings remain assigned.
- **S3 M3/M13/O2/O11 clear-before-backdrop-release:** adopt ledger retention, but do not claim the supplied “letter only” witnesses demonstrate an observable failure.
- **S3 M5:** detached-overlay input is excluded; a connected shadow-root host is not excluded merely by being in a shadow tree. Record a supported host move and restore it on destruction while the host remains where the engine put it (`Modal.ts:295`). Completed hide can retain its documented placement. This is an explicit destruction-behavior change requiring a guide entry.
- **S3 F1:** defect; stopped-show host padding needs its recorded return. Preserve E22’s express limit for a stopped hide that already released compensation (`D:144`).
- **S5 A2 and Alert removal referral:** retain the documented lifecycle. Alert destruction never reinserts its host; close is a terminal removal command, and its current stopped-close contract supplies no insertion return (`G:1205`; `Alert.ts:32`).
- **ColorMode storage:** persistent output, not a borrowed holding; destruction does not undo it (`types.ts:16`).
- **S5 ScrollSpy S1:** repair. E30 excludes named-control clobbering, not every consumer accessor on a platform object (`D:244`; `ScrollSpy.ts:254`).
- **S6 rows 15–16:** no demonstrated value-return defect in the cited conforming pairings, but their untyped, local-only pairing is replaced by the shared journal. Do not describe different call and lifetime baselines as one value record.

## 2. Proposed mechanism contract

The following is the proposed surface in `src/browser/types.ts`. `HostLedger`, `HostHolding`, and `HostChange` are implementations in their matching class files; `HostSnapshot` keeps its existing contract and gains the `write` member shown.

```ts
/** Releases a holding from its recorded acquisition facts. */
export type HostReleaseFunction<TRecord> = (record: TRecord) => void

/** Retains a recorded acquisition until release completes or ownership ends. */
export interface HostHoldingInterface<TRecord> {
	/** Carries the acquisition facts used by every release invocation. */
	readonly record: TRecord

	/** Reports whether release or relinquishment remains pending. */
	readonly pending: boolean

	/**
	 * Completes the release synchronously, including unfinished nested work.
	 * Repeated calls after completion do nothing.
	 */
	release(): void

	/**
	 * Relinquishes ownership without invoking release.
	 * Requires a committed terminal result or a recorded ownership transfer.
	 */
	clear(): void
}

/** Owns synchronous releases for one lifetime. */
export interface HostLedgerInterface {
	/** Aborts when destruction starts and refuses subsequent acquisitions. */
	readonly signal: AbortSignal

	/**
	 * Enrolls a release before acquisition can run consumer code.
	 *
	 * @param record - The facts the release must use.
	 * @param release - Synchronous, resumable release of those facts.
	 * @returns The enrolled holding, or undefined after lifetime termination.
	 *
	 * @remarks
	 * Refusal invokes no release: the caller must perform no acquisition.
	 * A release must complete its unfinished work when called reentrantly.
	 * It must not await, restart completed effects, or read a new resource
	 * identity in place of the record.
	 */
	hold<TRecord>(
		record: TRecord,
		release: HostReleaseFunction<TRecord>,
	): HostHoldingInterface<TRecord> | undefined

	/**
	 * Ends acquisition and drains every pending holding synchronously.
	 *
	 * @remarks
	 * Every invocation drains, including an invocation nested in a release.
	 * An active entry remains reachable until its release returns.
	 * Independent pending releases are attempted even if a release throws.
	 * Failures propagate after that drain; failed restoration is not success.
	 */
	destroy(): void
}

/** Configures construction within an owning lifetime. */
export interface HostLifetimeOptions {
	/**
	 * Owns construction and subsequent release.
	 * Enrollment precedes any acquisition that can run consumer code.
	 */
	readonly owner?: HostLedgerInterface
}

/** Configures a change's recorded writes within an engine lifetime. */
export interface HostChangeOptions {
	/** Owns and invalidates the journal at destruction. */
	readonly owner: HostLedgerInterface

	/** Holds the shared lifetime records of targets the change writes. */
	readonly snapshot: HostSnapshotInterface

	/** Reports whether the original call still owns its returning step. */
	readonly owns: () => boolean
}

/** Records and returns one call's changing writes. */
export interface HostChangeInterface {
	/**
	 * Records and writes the same resolved target while the call owns it.
	 *
	 * @param target - The captured target to write.
	 * @param value - The intended value; undefined removes it.
	 * @param priority - The intended inline priority. Default: empty string.
	 *
	 * @remarks
	 * Equal values and priorities take no write and no new record.
	 * The first changing write captures the call baseline and joins the
	 * lifetime snapshot before invoking the platform.
	 */
	write(
		target: HostSnapshotTarget,
		value: string | undefined,
		priority?: string,
	): void

	/**
	 * Returns recorded writes in reverse first-write order.
	 * Reentry resumes unfinished work; destruction or supersession stops it.
	 */
	restore(): void

	/** Discards the call baseline after completion or supersession. */
	clear(): void

	/** Invalidates the call without replaying it over lifetime restoration. */
	destroy(): void
}
```

Add to `HostSnapshotInterface`:

```ts
/**
 * Saves and writes a target only when its value or priority changes.
 *
 * @param target - The captured target to write.
 * @param value - The intended value; undefined removes it.
 * @param priority - The intended inline priority. Default: empty string.
 *
 * @remarks
 * Resolves the target once and saves before the platform write.
 * Explicit shared claims continue to use save, including unchanged claims.
 */
write(
	target: HostSnapshotTarget,
	value: string | undefined,
	priority?: string,
): void
```

Additional implementation obligations are part of this contract:

- `clear()` cannot erase an active release’s unfinished effects.
- A returned holding identifies one enrollment, not a replaceable engine field.
- Closed-owner checks occur before effects and after consumer-code boundaries.
- A child directly destroyed retires its parent holding only after its releases finish.
- Call journals preserve E24’s call identity; lifetime snapshots preserve E25’s shared values.
- Release progress distinguishes an applied write from a native operation still pending before its effect.
- New public names receive the fleet collision check before implementation.
- The first implementation lands with Button as a real consumer; subsequent units migrate their consumers without compatibility shims.

This surface adds ownership and resumable draining, so it meets the wrapper test. Its public exposure follows `scaffold/AGENTS.md:71`; hiding a reusable ledger from the browser barrel would not.

## 3. Invariant, bound, and consumer interface

**Invariant:** Every supported acquisition is recorded and reachable before it can run consumer code, and every destruction drains its pending releases synchronously using those records.

**Bound:** Release touches only acquired writes or explicit shared claims, respects recorded ownership transfers and terminal commands, and preserves E18, E22, E25, and completed-state behavior.

**Consumer interface:** An engine’s `destroy()` completes the releases it still owns before returning, including on reentry, while shared targets remain with live holders and no interrupted engine operation subsequently writes or acquires.

## 4. Unit plan

Run these units in dependency order. Existing owners finish or explicitly hand off before an overlapping unit starts.

Each adoption unit owns its named source files and matching `tests/src/browser/<Name>.test.ts` files. Because the plan is sequential, ownership of the affected `types.ts` and `guides/veneer.md` sections transfers with each unit. Shared helper and barrel changes return to the mechanism unit’s owner for integration.

| Unit and order | Owned implementation files | Map rows and red-first witnesses |
|---|---|---|
| **J-RELEASE-CORE** | New `HostLedger.ts`, `HostHolding.ts`, `HostChange.ts`; `HostSnapshot.ts`, `helpers.ts`, `types.ts`, `index.ts`, `Button.ts`; matching tests and guide surface | S6 rows 1–7 and 15–16; S5 B1–B3; S3 I4s write suppression. Prove nested drain during a recorded write, identity-safe replacement, construction enrollment, refusal after destruction, call-return interruption by destruction, E25 takeover, and Button destroyed without having written. Preserve shared presence and throw-path behavior. |
| **J-RELEASE-PRIMITIVES** | `Isolation.ts`, `ScrollLock.ts`, `Backdrop.ts`, `Swipe.ts` | S3 B1–B4, I1s–I5s, ScrollLock S1–S3; S4 Swipe S1–S2. Run nested inert/style restoration with a later target still pending, focus reentry, overlapping claims, shared pointer holdings, and lock acquisition during last-holder restoration. Backdrop and Swipe latch replacement is adoption unless a witness establishes a behavioral failure. |
| **J-RELEASE-ENGINES-B** — after J-SAMEWAY-ENGINES-B round 5 lands or hands off | `Dropdown.ts`, `Tooltip.ts`, `Popover.ts`, `Placement.ts` | Every S1 and S2 station. Reds: REPLACE, D-SAVE, P-SAVE, PROMOTION, CLOSE-REENTRY, OPEN-ABORT; S2 rows 2, 4–10, including rebuild/refusal variants. Read inside the nested callback, then again after the outer call. Preserve HIDE, moved-tip restraint, content retention after hide, and shared tooltip/popover links. The native promotion gate must close before this unit is accepted. |
| **J-RELEASE-CHANGES** — after J-MOTION-PROOFS-B lands | `Collapse.ts`, `Tab.ts`, `Carousel.ts`, `Toast.ts` | S4 C1–C7, T1–T3, K1–K6 and referrals R1–R4; S5 T1–T11. Reds: child prune reentry, each composite destroy latch, Tab construction getter, Carousel destruction during Swipe construction, Tab dropdown mutation in blur, and unused-token snapshotting. Preserve Tab initial joins, shared-target intermediate states, completed hides, timers, and motion completion. |
| **J-RELEASE-STATE** | `Alert.ts`, `ScrollSpy.ts`, `ColorMode.ts` | S5 A1–A4, ScrollSpy S1–S4, C1–C2 and their referrals. Reds: Alert’s no-op capture, destroy/nested-refresh during `hash` access, ColorMode destroyed before writing, and overlapping changing ColorMode controllers. Preserve A2’s shared-record behavior, Alert’s terminal removal, and persistent storage. |
| **J-OVERLAYS** — after J-ORACLE-FIX-OFFCANVAS lands, and after primitives/core | `Modal.ts`, `Offcanvas.ts` | S3 M1–M16, O1–O12, F1 and F2 dispositions. Reds: M4/M14/O3/O6 prior-value returns; M7/M12/M15/O5/O10/O12 nested drain; F1 stopped-show padding; supported connected-host M5 relocation. Adopt retention at M3/M13/O2/O11 without overstating their witnesses. Preserve E22 retained locks and released-compensation limit; exclude backdrop tampering; preserve completed-hide constants. |
| **J-RELEASE-DELEGATE** — after its constructed engines adopt | `Delegate.ts` | S6 rows 8–14. Reds: nested destruction while a later owned engine remains, observer-triggered child release, and destruction inside Tab construction. Also prove direct child destruction followed by a delegated route during restoration does not discard unfinished ownership; external engines remain external. |

New mechanism tests belong in `tests/src/browser/HostLedger.test.ts`, `HostHolding.test.ts`, and `HostChange.test.ts`. Existing `HostSnapshot.test.ts`, `helpers.test.ts`, and `Registry.test.ts` retain their relevant coverage.

The M5 move record and Tooltip origin record should share the same recorded-move semantics. Link release has its recorded token-membership semantics. These are acquisition kinds composed with the ledger, not special destruction patches at individual stations.

Every repair unit must:

- Run its map witness red on its actual landing base.
- Assert the state **before the nested callback returns**, not merely after the outer method finishes.
- Re-run the same witness green and challenge the load-bearing mechanism.
- Use behavioral test names; retain map identifiers only in design and proof records.
- Preserve existing conforming rows as regression obligations rather than manufacture new defects.

## 5. What remains unsettled, disagreements, and probes

**Native opening cancellation remains the implementation gate.** Source establishes the defect and the required ownership distinction, but does not establish an implementation that cancels every pending opening before it can subsequently promote. The repair must run OPEN-ABORT with an initially present `popover="manual"`, consumer listeners registered before and after Placement’s listener, capture and target delivery, and destruction through the owner’s signal. Read openness and restored attributes immediately after nested destruction, after `showPopover()` unwinds, and at queued delivery. A solution that only closes after constructor return fails.

Run CLOSE-REENTRY on the supported Chromium hosts with original popover absence and original `manual`, and with restoration reactions. The current standard supports nested hiding, but that is source evidence, not a platform receipt.

**The generic ledger cannot certify arbitrary release callbacks.** Its callback contract requires synchronous resumability. Shipped adapters must prove that requirement; foreign implementations receive the documented obligation. Do not expand the ledger into machinery for arbitrary asynchronous destructors.

**CSS serialization needs a bounded probe.** `recordHostWrite` compares the supplied value with the platform’s serialized value (`helpers.ts:963`). Prove the new writer’s no-op behavior for the CSS values engines actually emit, including priority. Do not claim that arbitrary CSS input can be normalized correctly by raw string equality, and do not build another CSS parser.

**ScrollLock handoff needs a browser witness.** Acquire a new lock during a restoration reaction with a later compensation target still pending. Assert the new compensation and final restoration; merely checking holder membership cannot settle the double-compensation referral.

The following source discrepancies affect the rulings:

- **S3’s summary says every primitive latches on abort.** `ScrollLock.destroy` has no such latch; its holder deletion and detached pending snapshot cause the reachability problem (`ScrollLock.ts:126`).
- **S2 says Placement already tolerates reentry and treats opening abort reachability as sufficient.** Its snapshot drains, but promotion release remains inside the one-time block (`B/Placement.ts:241`). The broader claims are not established.
- **S5 marks its destruction rows I2 “holds.”** Whole-method guards prevent nested access to pending snapshot work in Toast, ScrollSpy, and Button (`Toast.ts:266`; `ScrollSpy.ts:239`; `Button.ts:114`). Adoption must test the composite restoration, not just observer-disconnect order.
- **S3 says registry release precedes any restoration.** Modal and Offcanvas abort first, which can synchronously release their primitives before the claim is removed (`Modal.ts:443`; `Offcanvas.ts:427`). Move claim release ahead of that consumer-code boundary.
- **S6 suggests making the call list reachable makes the records one.** Reachability can be unified; E24’s call baseline and E25’s lifetime baseline cannot.
- **S3/S4’s E24 conflict referrals do not block this proposal.** The earlier amendment accepted eventual completion of the outer restoration (`D:165`); the present brief asks for the stronger nested-return guarantee. Record that timing refinement explicitly.
- **S5’s A2 prescription conflicts with the existing documented lifecycle.** Clearing before `closed` would change what destruction inside that event restores. Retain the existing rule rather than silently move the terminal boundary.
- **The map’s main revision is no longer the inspected main revision.** The cited stations above were checked in the present files. Repair units must reproduce against their actual bases.
- **Installed Test differs from the declared dependency range.** Dependency synchronization is not authorized work in this read-only round; the repair unit must verify the installed export it actually runs.

No law contradiction prevents these rulings. The proposal remains unproved behaviorally until the assigned red-first witnesses, especially the native opening gate, run.