# J-SNAPSHOT-SHARED design round — the subjective lane's proposal (planner on Opus 5.5, native; retained from its notification, 2026-09-24)

**Lane held:** subjective (shape, naming, ergonomics, design fit). `planner` on Opus 5.5; sources read in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/integration` at `e0dee7e`; nothing edited or run, so every result marked "inferred" still needs a run.

## Design

### 1. The bounds are defects, not limits

Both bounds can be reached through the public surface, and both leave the page different from its markup after the last destruction.

**Tab bound.** Each snapshot reads the element unless a restoration has the target still pending (`src/browser/HostSnapshot.ts:112-129`, read). A tab saves its swap targets at its own swap (`src/browser/Tab.ts:174-175`, `:340-359`, read).

- **Smallest input through the delegate** (inferred from `guides/veneer.md:1330-1337` and `Tab.ts:149-150,223-226`): markup, a `.nav` list holding `#home-tab.nav-link.active` → `#home` and `#profile-tab` → `#profile`; `#home` is a `.tab-pane.active.show`, `#profile` a plain `.tab-pane`. Steps: a `Delegate` on the root, then click home (already active, so its tab is acquired and saves no swap tokens), then click profile, then click home, then `delegate.destroy()`. Destruction runs profile's tab first, which writes the markup, then home's tab, which writes the values profile's tab wrote. The page reads `#profile-tab.active` and `#profile.active.show`, with home inactive; the markup had home active. The existing proof clicks profile first and so never reaches the bound (`tests/src/browser/Delegate.test.ts:1849-1871`, read).
- **Second input, same class** (inferred): `new Tab(home)`, then `new Tab(profile)`, then destroy home's tab first. Profile's tab plans no initial write, because home's tab already wrote each value (roles skipped by `#absent`, `Tab.ts:319-324`; the rest by the equality filter, `Tab.ts:315`, read). Home's destruction therefore removes `role="tablist"`, `role="tab"`, and `tabindex` while profile's tab is still live, and profile's later swaps treat the controls as non-`tab` controls (`Tab.ts:172-173`, read), so its selection attributes are never written.

**Carousel bound.** The swipe saves and writes `pointer-event` at construction (`Swipe.ts:67-68`, read). The carousel restores its items before the swipe (`Carousel.ts:274-276`, read).

- **Smallest input** (inferred): a `.carousel` host without `slide` and without `pointer-event`, whose items include a custom element that observes `class`. `const first = new Carousel(host)`, `await first.next()`, arm the item's reaction to run `new Carousel(host)` (touch on by default, `guides/veneer.md:1873`), then `first.destroy()`. The replacement's swipe records `pointer-event` as present; the first swipe's restoration then removes it, so the live replacement has no token. After `replacement.destroy()`, the host carries `pointer-event`, which the markup lacked.
- **A smaller input with no custom element** (inferred): `new Carousel(host)`, `new Swipe(host, { handler })`, `carousel.destroy()` leaves the live swipe without its token; `swipe.destroy()` then writes it back, so the token outlives both engines.
- The existing replacement proof builds its replacement with `touch: false`, which avoids the bound (`Carousel.test.ts:1172`, read).

### 2. Mechanism: option A, one record per target shared across snapshots

**The rule.** Every snapshot that saves the same attribute, class token, or inline property of an element shares one record of it. The first save made while no snapshot holds the target, and while no restoration has it pending, reads the element; every later save joins that record; only the restoration of the last snapshot holding the record writes the value back.

This is the presence record's rule (`HostSnapshot.ts:196-251`, read) extended from attribute presence to values, and the rule the codebase already hand-rolls three times (read): `Isolation`'s claims (`Isolation.ts:132-157`, `guides/veneer.md:384`); `ScrollLock`'s holder set (`ScrollLock.ts:65-71,113-124`); `Modal`'s body `open` holders (`Modal.ts:508-532`). One shared engine in `HostSnapshot` replaces the per-snapshot value with the concept those three already use.

**What a restoration that is not the last holder writes.** Nothing for the shared target: it leaves the record, and the target keeps the value the live engines wrote. The variant where every holder writes the shared value is refused: it reproduces the carousel bound. Effects (inferred): a tab destroyed while a sibling tab lives leaves the list showing what the live tab shows; a Collapse trigger naming several panels keeps the `aria-expanded` value the live collapse wrote.

**How the E13 rulings still hold.**
- **First-save precedence** becomes structural: a target has one record while any snapshot holds it. By this reading the stamp and `#order` (`HostSnapshot.ts:56,113,134,299`) become unreachable; remove them, subject to the objective lane's mutation check (inferred). Use one term, `record`, and drop "recording" and "earliest recording".
- **Takeover** stays as a special case of "only the last holder writes": a save during a restoration joins the pending record, so that restoration is no longer the last holder. Preferred shape: fold `#pending` into the value record (an owner and a written mark), so takeover stops being a separate `#take` path. Fallback: keep `#pending` and have only the last holder publish.
- **Write-back re-entry** is unchanged: a nested `restore` on the same snapshot still walks `#published` (`HostSnapshot.ts:145-151`, read); targets this snapshot left as a non-last holder were never published.
- **Throw withdrawal** is unchanged in effect.
- **Presence judgment**: leave it as it is. The code lets every leaving holder judge removal: `#leave` returns `!record.present` without checking the holder count (`HostSnapshot.ts:244-250`, read; the guide at `:933-934`), which does not match the brief's gloss "judged only by the last holder". See Risks.

**Public surface.** No `types.ts` member changes; `save(target)` and `restore()` stay. The TSDoc description paragraphs of `HostSnapshotInterface.save` and `restore` (`types.ts:339-388`) and their guide Summary cells (`guides/veneer.md:377-378`) change. Proposed `save`: "Joins the target's record, reading the element's value only when no snapshot holds the target and no restoration has it still to write back." Proposed `restore`: "Writes back every target this snapshot is the last to hold, class tokens first and attributes last, and leaves every other target to the snapshots still holding it."

**Engines whose behaviour changes** (all inferred from the save sites read): Tab and Tab (siblings of one list); a Swipe and another Swipe (the `pointer` token); Collapse and Collapse (a trigger naming several panels, `Collapse.ts:386-396`); Tab and Dropdown (the menu's `show` token, `Tab.ts:357`, `Dropdown.ts:419`); Tooltip and Popover on one trigger (`title`, `aria-label`, `aria-describedby`; `Tooltip.ts:144,505-510,743-766`); ScrollSpy and ScrollSpy, or ScrollSpy and Tab (a nav link's `active`, `ScrollSpy.ts:363`); Button and Tab (an `active` token on one control). Unchanged: `Alert`, `Toast`, `Modal`, `Offcanvas` (host targets only, one engine per host); `Placement`; `Isolation`, `ScrollLock`, and Modal's `open` token (already share one snapshot per record). No engine's code changes except `Tab.ts`: a tab joins the record of every initial attribute its list's plan names, whether it writes it or finds it already written; the saves move ahead of the equality filter at `Tab.ts:315` and the `#absent` skip; the `Tab.ts:49` sentence gains the shared-record qualifier.

### 3. Proofs

Each proof fails on `e0dee7e` first, with the command and the failing count recorded.

1. `HostSnapshot.test.ts`, new: "writes a target two snapshots share back only at the last holder's restoration, from the first save's value, in either order" — per category (attribute, token, property): X saves and writes `x`, Y saves and writes `y`; forward: after X restores, `y`; after Y, the original; reverse: after Y, `y`; after X, the original. Distinguishes a per-snapshot value (the `e0dee7e` code; forward end state), every holder writing the shared value (forward middle state), and the first saver writing instead of the last holder (forward middle state).
2. `HostSnapshot.test.ts`, the case around `:458-490` rewritten: it pins the bound as behaviour; it becomes "the reaction reads `later`, and the final value is `original`". Distinguishes a per-snapshot value.
3. `HostSnapshot.test.ts`, new: a save during a non-last holder's restoration joins the remaining record (X and Y hold `t`; a reaction to X's write of another target saves `t` on Z; after Y then Z restore, `t` reads the original). Distinguishes "a save during a restoration reads the element when nothing is pending" — the carousel bound at unit level.
4. `HostSnapshot.test.ts`, new re-entry case with a shared target: X is the sole holder of `u` and shares `t` with Y; a reaction to X's write of `u` calls `X.restore()` again, and `t` keeps Y's live value. Distinguishes a nested restore publishing targets it left as a non-last holder.
5. Existing readings that change (inferred): the second reading around `:411` from `'started'` to `'original'`; the case around `:420-456` stays green but its title names the stamp mechanism, so retitle it. Any other changed expectation stops the unit.
6. `Delegate.test.ts`, new: the Tab input, clicking the active control first; `root.innerHTML` equals the markup after `destroy()`.
7. `Tab.test.ts`, new: `new Tab(home)`, `new Tab(profile)`, destroy home's tab and assert profile's list keeps its roles and `aria-selected`; destroy profile's tab and assert the markup. Distinguishes "a tab saves only what it writes".
8. `Carousel.test.ts`, new: the carousel input with the item reaction; `Carousel.find(host)` is the replacement and the host carries `pointer-event`; after the replacement is destroyed, the host lacks it.
9. `Swipe.test.ts`, new: the carousel plus consumer-swipe input; distinguishes "every holder writes" (middle state) and a per-snapshot value (end state).

## Alternatives

- (B) Engines that share targets share one snapshot: a per-list holder registry in `Tab` and a per-host one in `Swipe`, the fourth and fifth hand-rolled holder pattern; it cannot cover sharing across classes and stops restoring a tab's own targets until the last tab of the list is destroyed. A wins.
- (C) Keep the bounds and state them: the Tab bound is reached with three ordinary clicks and a `destroy()`; `AGENTS.md` bars a deferred current-scope requirement. Refused.

## Units

**U1 J-SNAPSHOT-SHARED**, `opus` on Opus 5.5 (the J-ENGINE standing route). Owned: `src/browser/HostSnapshot.ts`; `src/browser/types.ts` (the `HostSnapshotInterface` TSDoc only); `src/browser/Tab.ts` (the initial-attribute saves, `#planInitial` and `#writeInitial`, and the class TSDoc sentence); `tests/src/browser/HostSnapshot.test.ts`, `Tab.test.ts`, and the new cases only in `Delegate.test.ts`, `Carousel.test.ts`, `Swipe.test.ts`; `guides/veneer.md` (the `HostSnapshotInterface` table, § Ownership and restoration, `#### Tab`, `#### Carousel`). Off limits: `Modal.ts`, `Offcanvas.ts` (J-SAMEWAY); `validators.ts`, `helpers.ts`, the guard declarations and `resolveOptions` calls (J-GUARDS); every other engine file. Order: after J-GUARDS (shares `types.ts` and `Tab.ts`); in parallel with J-SAMEWAY in its own worktree. Acceptance, cheapest first: scoped typecheck and lint on the owned files; the `save` and `restore` Summary cells equal their TSDoc and `test:guides` green; every proof red on `e0dee7e` then green; `HostSnapshot.test.ts` otherwise unchanged but for proof 5's rewrites; no `stamp`, `#order`, or earliest-recording comparison unless its removal turns a proof red; the guide uses `record` only and neither bound sentence remains; the whole browser project as an observation. U2 audit: `analyst` on Astra (objective), `reviewer` on Opus 5.5 (subjective), `checker` for the mechanical checks. U3 gates: `verifier` on Sonnet.

## Tensions

- Folded or layered records: folding `#pending` into the value record leaves one concept; keeping `#pending` with last-holder publish is a smaller diff. The objective lane rules which is safer against the interleaving suite.
- Values leave at restoration start; presence leaves after the restoration's own writes; the timings differ on purpose.
- Tab's initial-attribute joins are scoped in as the Tab bound's second input; the Orchestrator can split them.
- Routing: objective-heavy (`sol` on Astra) against the J-ENGINE route (`opus`); record the pick.
- Other engines' "Destruction restores every value …" sentences stay; the shared-record rule lives in `HostSnapshot` and § Ownership and restoration.
- Readings not supplied: the red counts on `e0dee7e`; a whole browser run under A to find every expectation that changes (predicted: only `HostSnapshot.test.ts` around `:411` and `:458-490`).

## Risks

- A leaked holder pins a shared target: an engine that saves and is never destroyed stops every other holder's restoration from writing it; search every constructor for a `save` followed by a path that can throw.
- Dangling `aria-describedby` id: a tooltip destroyed while a popover on the same trigger lives leaves its id until the popover is destroyed (`Tooltip.ts:737`); better than `e0dee7e`, not closed; carrier the Tooltip or Popover owner.
- Extra restoration writes: Tab's joins make restoration write a value the markup already carries, firing one more attribute reaction on destruction; a reaction-count assertion in proof 7.
- Presence rule disagreement: `decisions.md` E13's J-SNAPSHOT amendment says only the last holder judges removal; the code and the guide let every leaving holder judge it (`HostSnapshot.ts:250`, `guides/veneer.md:933`). The Orchestrator rules which is authoritative before the TSDoc is rewritten.

PROPOSAL: Close both bounds as defects by giving `HostSnapshot` one record per target, shared across snapshots like the presence record: the first save reads the element, each later save joins, and only the last holder writes back. Non-last holders write nothing, takeover becomes joining a pending record, and the stamp goes. There is no public member change, and one `opus` unit lands it after J-GUARDS and in parallel with J-SAMEWAY, with a red-first proof for each input.
