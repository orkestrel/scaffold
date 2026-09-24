# J-SCROLLSPY audit round 1 — the subjective lane's verdict (`reviewer` on Opus 5.5, native subagent, read-only; 54 tool uses, 577 s; retained verbatim from the subagent's return)

Lane held: subjective, as briefed. Engine: Opus 5.5, reached as a native subagent; the alias served `claude-opus-5-5[1m]`. I am read-only and ran no command, so every behavioural ruling here comes from reading the source, not from executing it.

## Numbered verdicts

1. **CONFIRMED.** I checked the constructor order in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/scrollspy/src/browser/ScrollSpy.ts` (around lines 88–167) against the claim, clause by clause. The host guard, the vocabulary groups, the two `resolveOptions` layers, the re-validation of margin and threshold, the claim, `#target`, `bindEventMap`, the smooth listener, and the signal branch all match.
   - Attack that failed: I looked for a throw after `Registry.claim`. `bindEventMap` and `refresh()` are the only later calls, and `refresh` only builds an observer from values already validated before the claim.
   - `destroy` (around lines 223–233) releases the claim before it restores the tokens, as claimed.
   - Proof check: removing `ScrollSpy.#registry.claim` is row "the host is not claimed", and deleting the abort binding is rows "an abort after construction is ignored" and "a signal that arrived aborted is ignored". Each names its case.
   - Not pinned: the `#link` clearing in `destroy`. At test line ~719 the link's restored token already makes the getter return undefined, so the assertion cannot tell that mutation apart. I note this and do not rule on it.

2. **UNRESOLVED.** The mechanism matches the source (`refresh`, around lines 196–221; `#section`, around lines 237–258). Two clauses have no proof I can find:
   - "a delivery of the replaced observer no longer holds its change": no mutation row removes `this.#observer === observer` from `#holds` (around line 339), and no listed case calls `refresh()` from inside a delivery.
   - "Each refresh reads `overflow-y` again": no row caches the root at construction.
   - What settles it: those two mutations run over the whole file, or the objective lane's reading.

3. **UNRESOLVED.** `#deliver`, `#activate`, `#parents`, `#holds`, and `#apply` match the claim and match Bootstrap's code at `scrollspy.js:163-198`, `223-250` and `253-260`. I checked the direction rule, the early return when the root is unscrolled (`ScrollSpy.ts:283` against `scrollspy.js:187-189`), and the order in which activation clears tokens. The guide states all three required departures (guide `veneer.md:935-940`).
   - Not pinned: the door that stops a delivery when its observer was replaced (the same gap as claim 2).
   - Not pinned: the `#activate` early return (around line 292, "writes and dispatches nothing" when the same link still carries the token). No row mutates it.
   - What settles it: the objective lane runs those mutations.

4. **CONFIRMED.** I checked `#scrollTo` (around lines 362–379) against `scrollspy.js:127-149`.
   - Attack that failed: I read each of the four stated departures against Bootstrap's source. All four hold, including the claim that Bootstrap reads `event.target.hash` and so misses a click on text inside the link.
   - The guide's line "the host's top padding edge" (`veneer.md:834`) matches `- root.clientTop`.

5. **CONFIRMED.** I read the scan in `Delegate.ts` (around lines 123–158), its try/catch that destroys and rethrows, and `#owned`, `#acquire`, and `#discard`. `#conflicts` and the click routes read only the button and collapse groups.
   - Attack that failed: a root element that itself carries `data-bs-spy`. `querySelectorAll` excludes the root, which matches the guide's "inside the root".

6. **CONFIRMED.**
   - The guard, the tables, and `satisfies` match the source.
   - Every level of `SCROLL_SPY_DEFAULTS` is frozen, and each default equals the Bootstrap default at `scrollspy.js:41-47`.
   - `boundsOf` is inclusive at both ends ("The inclusive lower bound" and "The inclusive upper bound" in `node_modules/@orkestrel/contract/dist/src/core/index.d.ts`, around line 258).
   - `parseArray` returns "the input reference, never cloned" (around line 4565), so an array of ratios comes back unchanged.
   - The barrel line is `export * from './ScrollSpy.js'`, and `index.test.ts` lists the new names.

7. **BROKEN.** Two sentences are false of the source.
   - **(a) The `link` summary in `src/browser/types.ts` (around line 1083):** "Reads the active link, or undefined when no section is in view." The unit's own case "clears the active link when its section leaves and no other enters" (`ScrollSpy.test.ts` around lines 127–153) sets `scrollTop = 150` on a 100 px host. At that position section `#spy-two`, at offset 200, shows 50 px inside the host's box, yet the case asserts `spy.link` is undefined, and it passes (`j-scrollspy-gates.log.txt`: `Tests 234 passed`).
     - Fix: return a `types.ts` patch that reads "Reads the link the last activation selected while it carries the `active` token, or undefined otherwise." This is the guide's own sentence at `veneer.md:829-830`. A property summary sits in no guide table, so no guide hunk is needed.
   - **(b) Guide `veneer.md:820-821`:** "While the root's scroll position is zero, the first entering section wins and the delivery reads no further entry." When the root scrolls up to zero (the unit's own parents case does this at test line ~215, going from 310 to 0), `down` is `false`. Then `ScrollSpy.ts:283` never returns, and later entries are still read: a leaving entry still clears its link at lines 274–277.
     - Fix: "Scrolling down while the root's scroll position is zero, the first activation ends the delivery."
   - The rest of the claim holds. The § Surface rows equal their TSDoc summaries, the fence imports `@orkestrel/veneer/browser`, the `plugin` row reads `shipped` with its Proof path, and the returned `destroy` patch is true.
   - Referred to the checker: the `git diff -w` clause and the unchanged Obligation cell.

8. **UNRESOLVED.**
   - Holds:
     - The status matches the claimed file set.
     - Every listed gate exits 0 in `j-scrollspy-gates.log.txt`.
     - The unit's log carries `EXACT`/`JOINED` rows, the `GREEN?` rows at 0 failed, and `receipt: restored byte for byte`.
     - The report records that no `prove` call was made (report line 9).
     - My reading of `ScrollSpy.ts` finds no `any`, `as`, non-null `!`, `@ts-`, `eslint-disable`, access modifier, default export, or `.bs.`.
   - Open:
     - The Orchestrator's replay of the mutation run is absent, as the brief expects.
     - "The three mutations a first pass missed were closed by strengthening the named cases" rests only on the writer's report. No first-pass log is retained for this unit, unlike J-DROPDOWN and J-MODAL.
     - The full sweep of added lines belongs to the checker.

## Findings outside the claims

- **F1 — The guide still says a pending engine will decide a rule that ScrollSpy has already decided.**
  - Where: `guides/veneer.md:499-502` (§ Engine, the `resolveOptions` paragraph) ends with "the first engine that declares such an option rules how its attribute projects into the group."
  - What is wrong: ScrollSpy is that engine, and it made the ruling: the group resolves as its own layer through `resolveOptions`, reading the group's defaults, then the attributes its keys name, then the constructor's group, key by key. The ruling is recorded only at `veneer.md:839-842` and in the code comment at `ScrollSpy.ts:123-125`.
  - Why it matters: the next grouped options (Tooltip's `delay`, `trigger`, and `placement`; the `dismiss` group, R11) will look to § Engine and find an open question. The mechanism also ends up with its only home in one component's subsection.
  - What right looks like: § Engine states the layer rule as the engine-wide mechanism, and `#### ScrollSpy` keeps only its `margin` and `threshold` specifics.
  - Carrier: § Engine is outside the brief's owned guide sections, so this needs a successor brief that grants that paragraph.

- **F2 — The Delegate's own description is false for a scanned scrollspy host.**
  - What is wrong:
    - The `Delegate.ts:28` summary and the guide's Surface row at `veneer.md:40` (kept equal by parity) say "Activates data-attribute hosts through a root's delegated click listener". A scrollspy host is activated by the construction scan, not by the listener.
    - § Delegation (`veneer.md:559-561`) never mentions the scan or the `scrollspy` option.
    - `veneer.md:579-580` says a host reinserted after the release "its next delegated click acquires it again with a fresh engine". No click route serves a scrollspy host, so a reinserted scanned host is never reacquired.
  - What right looks like:
    - The summary names both mechanisms. Suggested wording: "Activates data-attribute hosts on a root through its delegated click listener and a scan at construction."
    - § Delegation points to the `scrollspy` option the way it points to Collapse.
    - The reinsertion sentence is scoped to hosts a click route serves, and states that a scanned host stays released.
  - Carrier: `Delegate.ts` is owned by this unit. Row 40 and § Delegation are not, so this needs a successor brief that grants them.

- **F3 — The class TSDoc is false for one case.**
  - Where: `ScrollSpy.ts:30-31` (`@remarks`) says "skipping a link carrying the `disabled` token or a `disabled` attribute".
  - What is wrong: the code at lines 240–245 keeps a link whose attribute reads `disabled="false"`.
  - What right looks like: "or a `disabled` attribute whose value is not `false`", as the guide already says at line 808. Fix the zero-scroll wording in the code comment at `ScrollSpy.ts:262-263` the same way as claim 7 (b).
  - Carrier: this unit, because the file is owned.

## Attacked and held

- **The observer as the change identity.** The unit uses the observer instead of a `#change` object. That keeps no second field. `IntersectionObserver` callbacks cannot re-enter, and each takeover route either ends the lifetime or replaces `#observer`, so the stored state stays derived.
- **Private method names.** `#section`, `#parents`, `#deliver`, `#apply`, `#holds`, and `#scrollTo` match Collapse's landed pattern (`#triggers`, `#siblings`, `#dimension`). `names.md` allows multi-word private names.
- **`SCROLL_SPY_DEFAULTS`.** The name follows R11's `{ENTITY}_DEFAULTS` form. Using `satisfies` instead of a type annotation keeps the nested keys required, so the class reads them without narrowing.
- **The Delegate destroying itself and rethrowing on a scan refusal.** A constructor cannot return a partial delegate, so this is the only option that fails loudly without leaking. The guide (`veneer.md:910-911`) and the TSDoc both state it.
- **No scan of hosts inserted later.** R5 requires the scan at construction only, and the guide (`veneer.md:907-908`) states the limit.
- **The parent walk excluding the target itself.** The guide's wording "inside the target" and the departure bullet cover it.
- **The `entry` token key.** It matches Dropdown's `entry` selector (`types.ts` around line 807).
- **The Compatibility table's Proof column re-padding.** The table formatter forces it, and sibling units conflict only on whitespace.

## Referrals (to the objective lane)

- **R1 — A retained caller array can make `refresh()` throw.**
  - Where: `ScrollSpy.ts:148`, `this.#threshold = intersection.threshold`.
  - What is wrong: this keeps the caller's own array, because `parseArray` returns the reference.
  - Vector: `const t = [0.5]; const spy = new ScrollSpy(host, { intersection: { threshold: t } }); t.push(2); spy.refresh()`.
  - Expected result: `refresh`, whose contract names no throw, constructs an observer with an out-of-range threshold and throws `RangeError`. The copy taken at refresh (line 216) comes too late.
  - What right looks like: copy and freeze the array at construction.
- **R2 — Unpinned doors (claims 2 and 3).** Nothing proves the observer-identity conjunct in `#holds` or the re-read of `overflow-y` at each refresh.
- **R3 — Unpinned early return (claim 3).** Nothing proves the `#activate` early return at around line 292. Does the event list in the direction case tell that mutation apart?
- **R4 — Checker clauses (claim 7).** The `git diff -w` clause and the unchanged Obligation cell.

## Bounds

- **B1 — The ScrollSpy fence.**
  - The fence at `veneer.md:459-476` calls `spy.refresh()` right after construction, which already refreshes, so it teaches a call nobody needs.
  - It shows no activation, no `link` reading, and no `activate` hook.
  - Its lead sentence, "destroy it to restore the link", promises a restoration the fence never exercises.
- **B2 — An unlisted departure.** The departure list leaves out one difference. A fragment with a malformed percent escape is skipped here, where Bootstrap's `decodeURI` (`scrollspy.js:213`) throws out of `refresh` and construction.
- **B3 — Duplicated throw blocks.** The two identical blocks at `ScrollSpy.ts:137-146` could be folded together.
- **B4 — An unreachable fallback.** The `: 0` fallback at `ScrollSpy.ts:279` can never run; `continue` on a non-`HTMLElement` target would read truer.
- **B5 — A home for the scan.** When R5's carousel and offcanvas scans land, the scan inline in the `Delegate` constructor belongs in a private method.
- **B6 — An ambiguous clause.** At `veneer.md:845-846`, "and refuses a blank one" reads as if it describes the `IntersectionObserver` constructor, which accepts a blank margin.

VERDICT: FAIL 2, 3, 7, 8; outside the claims: F1, F2, F3
