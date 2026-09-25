# J-RELEASE-CORE round 1 — the subjective lane's verdict (reviewer on Opus 5.5, 2026-09-25; brief units/j-release-core-audit-reviewer-brief.md)

**Lane:** subjective (design fit), held by `reviewer` on Opus 5.5. Subject: Veneer `d702bb8`, read in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core`. Evidence: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-core.diff`, the unit's report, and `j-release-core-replay-1.log.txt`. Line numbers are approximate and point to the named symbol.

Claims 2 and 9 hold. Claims 3 and 8 fail. The `join` design has no ownership rule: a child destroyed directly stays held by its owner, and nothing tells an engine author how to avoid that. Separately, several sentences say every class joins a lifetime, but only `Button` does.

## Per-claim verdicts

| Claim | Verdict | Evidence |
| --- | --- | --- |
| 2. `Lifetime.join` | CONFIRMED | **Behaviour.** `src/browser/Lifetime.ts:57-72`. With a lifetime's signal it calls `owner.hold(resource, (held) => held.destroy())`. With a foreign signal it destroys the class at once, or adds a listener bounded by `lifetime.signal`. With `undefined` it returns.<br>**Proofs, each mutation named:**<br>• Moving the destroy into an abort listener makes it run at the abort instead of in the drain. `tests/src/browser/Lifetime.test.ts:192` asserts `[aborted, newest, joined, oldest]`, so it tells the two apart (replay row `join-ledger`, failed=1, assertion=1).<br>• Dropping `signal: lifetime.signal` leaves the listener on the foreign signal. `Lifetime.test.ts:230` expects a count of 0 and reads 1 (row `join-unlisten`).<br>• Making the `undefined` branch call `destroy`: `Lifetime.test.ts:240` expects 0 and would read 1.<br>• `Lifetime.test.ts:184` cannot tell the hold path from a listener path, because both destroy at once on an aborted signal. The test at `:192` covers that branch.<br>**Design fit of the third parameter.** It belongs on `join`. It sets a real boundary (the listener ends with the class), and E35 wants one shared mechanism rather than each class listening on its own. Two weaknesses: it is read only in the foreign branch, and its type (`LifetimeInterface`) is wider than its use (`.signal`). Design-fit defect 1 gives it a use in both branches. |
| 3. A class destroyed directly stays held by its owner | FAIL | **The fact holds and is documented only in `join`'s remarks** (`Lifetime.ts:47-48`). `LifetimeInterface` (`types.ts:337`), the guide paragraph (`guides/veneer.md:1009-1022`), and E35 say nothing about it.<br>**Growth is real once the adoption units land:**<br>• `Modal.ts:266` and `:328` build a `ScrollLock` and an `Isolation` on every show, passing the owner's `signal`.<br>• `Modal.ts:365` and `:416` end them with a direct `destroy()` on every hide.<br>• `Dropdown.ts:307-314` builds a `Placement` with the owner's signal on every show.<br>• After J-OVERLAYS and J-RELEASE-POPUPS adopt `join`, each show-and-hide cycle leaves dead holdings in the owner's ledger. They keep the destroyed children and their elements alive until the owner is destroyed, with no upper limit.<br>**The rule an adopter would need:** end a joined child through `owner.release(child)`, never through `child.destroy()`.<br>**Where it belongs:** E35 as an amendment, `LifetimeInterface.release`'s remarks, and the guide. A better fix closes it inside `join` so no adopter needs the rule (defect 1).<br>**Carrier:** the report hands this to J-RELEASE-DELEGATE, but `Modal`, `Offcanvas`, and `Dropdown` adopt before that unit runs.<br>**Proofs:** no test pins this behaviour, so no mutation can redden one. |
| 8. The contract and prose are true | FAIL | **These hold:**<br>• `HostSnapshotInterface.write` (`types.ts:467`) and its guide row (`veneer.md:397`).<br>• The `ButtonInterface.destroy` summary (`veneer.md:368`): claim, then hooks at the abort, then the drain.<br>• The Button paragraph (`veneer.md:341-344`), the save paragraph (`:949-955`, correctly scoped to "A button" and "Every other engine"), and the Surface rows (`test:guides` exit 0 in the replay).<br>**False:** three sentences say every class constructed with a lifetime's `signal` joins it. At `d702bb8` only `Button` calls `Lifetime.join` (the only `src` files that mention `Lifetime` are `Button.ts`, `Lifetime.ts`, `types.ts`, and `index.ts`). A `Collapse`, `Modal`, or any other engine given `lifetime.signal` is destroyed when the abort fires, not in the drain. The sentences are at `veneer.md:1017-1019`, `types.ts:338`, and `Lifetime.ts:10-13` (defect 2).<br>**Voice:** `veneer.md:1015` states the resumable-release obligation as a fact (defect 3).<br>**Proofs:** parity proves the Surface rows equal the TSDoc summaries. It does not prove what a sentence says about behaviour. |
| 9. Scope and shape | CONFIRMED | **Placement.** `Lifetime` is one class, flat at `src/browser/Lifetime.ts`, with no module-scope declaration. It uses `release.bind(undefined, record)` (`:80`) rather than an assigned arrow. The other arrows (`:64`, `:67`) are callbacks passed directly as arguments, which the rules allow. It has no `as`.<br>**`LifetimeHolding` earns its place.** A private field cannot take a module-scope type in an implementation file. The package already publishes `HostSnapshotRecord` and `HostSnapshotHolding` (`types.ts:531`, `:545`; `veneer.md:70-71`) the same way, so this follows that convention.<br>**`matchesHostValue` has the right name and home.** The `matches*` prefix is the predicate prefix in `names.md`. It sits in `helpers.ts` with `readHostValue` and `writeHostValue`, is exported, and is tested (`helpers.test.ts`, the `matchesHostValue` describe block). Dropping its priority clause reddens row `priority` (failed=5, assertion=5), and the assertion `matchesHostValue(height, '12px', 'important')` distinguishes it.<br>**`save` stays** because other engines still call it (E35). |

## Design-fit defects

1. **`Lifetime.ts:57-72`, `join`.**
   - **Wrong:** the class's own lifetime ends the membership only for a foreign signal. With an owner's signal, a child destroyed directly stays held (claim 3). The `@example` at `:51-54` passes the same object as `resource` and `lifetime`, which does not show what an engine author writes.
   - **Why it matters:** every adopter that builds and ends children per show (`Modal`, `Offcanvas`, `Dropdown`, `Tooltip`) grows its ledger without limit. A rule each adopter has to remember will be forgotten in one of them.
   - **What right looks like:** in the owner branch, bound the membership by the class's own lifetime too. For example, add `lifetime.signal.addEventListener('abort', () => owner.release(resource), { once: true })` after `owner.hold(...)`. Then `child.destroy()` ends the owner's holding, the third parameter has a use in both branches, and no adopter needs a rule. Add a case: build a child with the owner's signal, destroy it directly, call `owner.release(child)`, and assert it returns `false`.
   - **Fallback:** if the objective lane refuses that ordering, land the rule instead. Put "end a joined child through the owner's `release`, never through its own `destroy`" in E35, in `LifetimeInterface.release`'s remarks, and in the guide's Lifetime paragraph, before J-RELEASE-PRIMITIVES dispatches.
   - **Example:** replace it with a lifetime used as a child, `const child = new Lifetime(); Lifetime.join(owner.signal, child, child)`, and say in a comment that a class passes `this` and its own lifetime.

2. **The sentences that say every class joins.**
   - **Wrong:** these sentences state a general rule that only `Button` meets:
     - `veneer.md:1017-1019`: "A class constructed with a lifetime's `signal` joins that lifetime…"
     - `types.ts:338`: "a class constructed with it joins the lifetime as a holding"
     - `Lifetime.ts:10-13`: "A class whose options take a `signal` joins through the static `join` method"
   - **Why it matters:** a developer who passes `lifetime.signal` to `new Collapse(...)` expects a newest-first holding and a nested drain. The class is destroyed at the abort instead. `writing.md` § Claims and time requires the present tense only for what exists.
   - **What right looks like:** describe the mechanism and name its user. For example: "The static `join` method makes a class constructed with a lifetime's `signal` one of that lifetime's holdings; a button joins this way." In `types.ts:338`, write "a class that joins through `Lifetime.join`…".

3. **`veneer.md:1010` and `:1015`.**
   - **Wrong:** two author obligations are written as facts about the class: "The `hold` method enrolls a record before the take can run other code" and "Each release is resumable".
   - **Why it matters:** `Lifetime` runs whatever release it is given. The guide is where an engine author learns the mechanism. `writing.md` § Voice and actor requires `must` for a requirement.
   - **What right looks like:** "Hold a take before it can run other code. A release must be resumable: run again, it finishes its unfinished work and repeats nothing it completed, as a snapshot's `restore` does." Add defect 1's rule here if the fallback is taken.

4. **`veneer.md:950-954`.**
   - **Wrong:** one sentence carries four ideas (construction writes nothing; destroyed before a toggle writes nothing back; a no-change write records nothing; the exception that joins).
   - **Why it matters:** it breaks `AGENTS.md` § Writing, "One idea per sentence."
   - **What right looks like:** split it into three sentences at the colon, before ", and a toggle write", and before ", in which case".

5. **Test titles.**
   - **`HostSnapshot.test.ts:1521`**, "resolves the target name once…": in an HTML document, a `write` that resolved the name twice would give the same result, because `setAttribute` folds case too. The assertions prove the spellings share one record, not that the name resolves once. Rename it to "shares one record across spellings of an attribute name, so only the last holder writes it back", or add an XML-document host where the two readings differ.
   - **`HostSnapshot.test.ts:1460`**: change "a live holder record" to "a live holder's record".
   - **`Button.test.ts:768`** ("once that destruction began") and the comment at **`Lifetime.ts:99`** ("skipped once it has ended") use `once` to mean after. Replace it with `after`, per the `writing.md` § Substitutions `once` row.
   - Every other new title names what its assertions prove.

## Observations (no change required)

- **"record" means two things in one guide section.** E35's `hold(record, release)` brings "record" into § Ownership and restoration, where it already means the shared snapshot record (E25). The `hold(snapshot, …)` example then holds a snapshot that itself holds records. Renaming it is an E35 amendment and outside this unit.
- **Identical summaries.** `LifetimeInterface` and `Lifetime` share one Surface summary (`veneer.md:62`, `:64`). The class could name what it adds, the static `join` method.

## Referrals (to the objective lane)

- **Defect 1's fix.** Rule whether `owner.release(resource)` inside the child's own abort dispatch stays correct:
  - when the owner is draining and runs that child's release;
  - when the child is destroyed directly inside its construction's `try` block (`Button.ts`, the constructor's `catch`).
- **Untested remark.** The documented behaviour at `Lifetime.ts:47-48` ("stays held until its owner releases it … finds nothing left to give back") has no executed assertion.
- **Replay row `button-snapshot-held`.** It reads `failed=34 assertion=16 other=0` (`j-release-core-replay-1.log.txt:16`), so 18 of the failures are neither assertions nor other errors. Rule what they are.

VERDICT: FAIL 3 8
