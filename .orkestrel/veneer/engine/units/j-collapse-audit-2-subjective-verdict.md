# J-COLLAPSE audit round 2 — the subjective lane's verdict (returned 2026-09-24 by `reviewer` on Opus 5.5, native subagent, 51 tool uses, 681 s; retained verbatim from the subagent's return text)

Lane: subjective, held in full. The `reviewer` alias served Opus 5.5 (`claude-opus-5-5`) as a native subagent. I ran no command, so every reading below comes from source and none from an executed probe.

## Numbered verdicts

**1. CONFIRMED.** One clause is `UNRESOLVED`: the replay log `j-collapse-mutations-2-orchestrator.log.txt` does not exist yet. Until it does, the only evidence for the mutation-binding clause is the writer's log `j-collapse-mutations-round-2.log.txt`.
- **Source:** every door set the claim lists matches `Collapse.ts`: the `show` and `hide` bodies, `#apply`, `#holds`, and `#writeTriggers`. `#taken` no longer exists.
- **Attack on the shape (Unknown 1), which failed:** could a phase value resolved inside `#holds` replace the sets spelled at each door? The doors need distinct present/absent pairs per direction. For `show`: `[t]/[]`, `[h,s,t]/[]`, `[h,s]/[t]`, and `[]/[s,t]`. For `hide`: `[s]/[t]`, `[t]/[]`, `[h,t]/[s]`, and `[h]/[t,s]`. A phase literal would need a union keyed by direction and door plus a lookup table. That hides at each call site what the door asserts, and it adds a literal union for a fact the call site already states. The spelled sets are the right shape.
- **Mutation reasoning (read, not run):** the definitions in `j-collapse-mutations-2.py` are "the token read is dropped at the write doors" (`during = []` in both methods), "the completion read is dropped", and "the hide size-write read is dropped". Each mutation restores the round-1 behaviour (read the lifetime and `#change` only) at the proof's door, so each would bind as a red-first proof does.
- **Unknown 1's answer holds.** A re-added `transition` token fails the `[transition]`-absent read at the removal door and at the size-clearing door.
- **Interleavings named:**
  - During `show`, a reaction adding `shown` or `host` is not caught. This does no harm, because the call completes to that state.
  - During `hide`, a reaction adding `shown` is not caught until the completing write. See referral R1.

**2. BROKEN.**
- **Failing state, the conflict ruling:** the proof "drives the button route and the collapse route once each when the button host is the panel itself" in `Delegate.test.ts` sets up `#panel` with `class="collapse"` and `data-vn-press`, plus a button naming `#panel`. The delegate's button selector is `[data-vn-press]`. One click makes the button route construct a `Button` on `#panel` and the collapse route construct a `Collapse` on `#panel`.
  - E12 defines exactly that as a route conflict: "a click that would have two routes construct an engine on the same host element".
  - R5, as amended, requires that "a click matching conflicting routes inside one delegate is refused before either runs".
  - `Delegate.#activate` runs `#routeButton` and then `#routeCollapse` with no check across the routes, and the proof asserts both events, `aria-pressed="true"`, and `active collapse show`.
  - The unit therefore ships, and fixes in a proof, the behaviour the recorded ruling forbids.
- **Failing state, the guide half:** the proof "leaves the panels a delegate destroyed during the click has not reached to a live outer delegate" places `#second` inside both the inner and the outer root. The inner delegate hears the click first, yet the outer delegate drives `#second`.
  - § Delegation says "a host under nested delegate roots is driven once per click … by whichever delegate hears the click first".
  - `#### Collapse` says "by whichever delegate whose root contains it hears the click first".
  - Both sentences are false for `#second`, and neither states the destroyed-delegate hand-off. Only the `Delegate` class remark states it.
- **What held:** the mark itself is correct. `#mark(event, Collapse, panel)` sits after the aborted check and the containment check, and the `#mark` comment names an engine host, as E12 requires.
- **Smallest fix, conflict:** the Orchestrator either amends E12/R5 or implements the refusal. To implement it, `#activate` resolves each route's driven hosts before either route runs. It refuses the click when both routes would construct an engine on one element, meaning neither `find` method returns an engine there.
  - Retarget the proof for the route-keyed mark to a panel that already carries a `Button` engine. Only one route then constructs, so there is no conflict, and "the per-click mark ignores the route" still turns the proof red.
  - Add a proof that the conflicting click is refused.
- **Smallest fix, guide:** in both paragraphs, write "by the first live delegate whose root contains it to reach it". Add the sentence the remark carries: "A listener that destroys a delegate during a click leaves every panel the click has not reached to the delegates still live."
- **Mutation clause:** `UNRESOLVED`, because the replay is absent.

**3. CONFIRMED.** Mutation clause `UNRESOLVED` (replay absent).
- `parseElement` returns `Array.from(document.querySelectorAll(value)).find(instanceOf(HTMLElement))` inside a try block.
- The proof "returns the first HTML element among the matches when a non-HTML element matches first" asserts that `document.querySelector` returns the SVG element, which is the control, and that `parseElement` returns the HTML element.
- **Attack, which failed:** an HTML element passed as the value is returned unchanged, and an invalid selector returns `undefined`. Both are asserted in the proof titled "returns undefined for a selector matching no HTML element…".
- The remark carries a separate defect; see F1.

**4. BROKEN.**
- **Failing state, the nesting sentence:** consider a nested accordion. The inner accordion is the `parent`, and it sits inside an outer `.collapse.show` panel.
  - The `#### Collapse` sentence reads "sits inside no other panel carrying the `host` or `transition` token". The `#siblings` comment carries the same sentence. Read literally, every inner item sits inside the outer panel, so no inner item is a sibling.
  - The code decides nesting relative to the parent only. It builds `parent.querySelectorAll(':scope :is(host, transition) :is(host, transition)')`, and `:scope` requires the nesting panel to be a descendant of the parent. So the inner items are siblings and they hide.
  - The same holds when the parent itself carries the `host` token.
  - The departure "A panel inside a transitioning ancestor counts as nested" has the same unscoped ancestor.
  - **Fix:** "and sits inside no other panel within the parent carrying the `host` or `transition` token", in the guide, the `#siblings` comment, and the departure ("a transitioning ancestor within the parent").
- **Failing state, the token-order departure:** the departure says "Bootstrap removes each token before it adds the next". `collapse.js` `hide` (around lines 182–183) adds `collapsing` before it removes `collapse show`, so the sentence is false as written.
  - The list also omits a real departure. Veneer's `hide` completion adds `host` before it removes `transition`. Bootstrap's hide completion (around lines 197–198) removes `collapsing` first.
  - R18 as amended requires "every departure".
  - **Fix:** "Showing writes the `transition` token before it removes the `host` token, and each completion writes its `host` token (with the `shown` token after a show) before it removes the `transition` token. Bootstrap's show removes `collapse` before it adds `collapsing`, and each of its completions removes `collapsing` before it adds the next class."
- **What held:**
  - The methods sentence.
  - The ownership sentence.
  - The takeover paragraph, checked against every door set in claim 1.
  - The `dispose` departure, confirmed against `base-component.js` `dispose` (`Data.remove`, `EventHandler.off`, every own property set to `null`).
  - The § Examples lead-in against its fence.
  - The R2/R18 split. The Collapse tables sit beside the attribute table under `#### Collapse`, and their defaults equal `COLLAPSE_CLASSES`, `COLLAPSE_ATTRIBUTES`, and `COLLAPSE_SELECTORS`. `### Vocabulary` keeps only the Button and ColorMode rows. The § Components lead-in names the default tables.
  - Unknown 3: Key, Default, and a role column (Marks; Feeds with Read through; Selects) read as one table family.
- The delegate paragraph's defect is carried under claim 2.

**5. CONFIRMED.**
- The renames are in place: `#siblings`, `#hideSiblings`, `#owned`, `#transitioning`, and `#holds`. `Collapse.ts` contains no `#open` or `#close`. The `#change` comment names "the identity of the latest call that started a change".
- **Attack (Unknown 2), which failed:** I looked for a sibling panel or an owned engine named two ways within `Collapse.ts` comments, the class remark, and `#### Collapse`. "Sibling" names the panel. "Sibling collapse it constructed" and "owned collapse" both name the constructed subset, and neither word is applied to a sibling collapse the consumer constructed.
- The alternations adjacent to this claim are listed under Bounds.

**6. UNRESOLVED.**
- The log's structure is as claimed:
  - one `EXACT` or `JOINED` row per mutation;
  - `GREEN?` rows at 0 failed for Collapse 31, Delegate 32, validators 10, parsers 3, and index 3;
  - identical digests before and after, with the line "receipt: restored byte for byte".
- That the runs happened as logged rests on the writer's run alone until the replay exists.
- I did not compare the mutation set against round 1's.
- The rows I sampled show a mismatch between the report table and the log; see R4.
- **To settle:** the Orchestrator's replay log, plus a comparison of this row set against the round-1 instrument's rows.

**7. CONFIRMED.** Mutation clause `UNRESOLVED` (replay absent).
- `#prune()` is the first statement of `show` and of `hide`. Its first branch drops an engine the registry no longer maps to its host. Its second branch destroys and drops an engine whose host is not connected. `#acquire` does not prune.
- The proof "destroys a sibling collapse it constructed at its next change after that sibling panel leaves the document" makes each assertion the claim lists: the sibling is still found after removal, `find` returns `undefined` after `hide`, the classes sort to `['collapse','show']`, and the owner is still live.
- **Naming under `names.md`:** `prune` is not in the fixed lifecycle table and is not a synonym of any meaning the table fixes, so the name stands. See Bounds for its relation to `Delegate`'s `#discard` and `#release` methods.
- **The re-inserted panel is a bound.** It is kept because the code reads `isConnected` at the call. The guide's "destroys one whose panel left the document" is ambiguous rather than false.

**8. CONFIRMED, with a correction.** The claim says "all six `emitEvent` calls"; `Collapse.ts` holds four (`show`, `shown`, `hide`, `hidden`), and every one dispatches `null`, so the property holds.
- The constructor error carries `readTag(host)`.
- `Delegate.#collapse` is typed `CollapseVocabulary`, and no map type import remains.
- The `isCollapseEvent` remark names `CustomEvent<null>`.
- The proof "abandons the transition in flight on destruction…" asserts `hasAttribute('style')` is `false`.
- The second overlap case carries the "saved last" title and asserts `hasAttribute('class')` is `false`.
- `parented` is `new Collapse(panel, { parent: root })`.
- The `@throws` sentence and the departure ("unless the constructor supplies `parent`") match.

**9. CONFIRMED.**
- **Unknown 5, the writer's C9 split:** the split is the right ruling. A guide Summary cell that `findDrift` compares cannot land before its `types.ts` sentence without failing `test:guides`. Keeping each row with its `types.ts` hunk is the only order that stays green, and the patches are exact.
- **The guide hunks equal their `types.ts` sentences** once whitespace is collapsed:
  - "Owns delegated activation and the engines it constructs."
  - "Releases the click listener and destroys every engine it owns."
  - "Releases hooks, abandons a transition in flight, restores the panel and its triggers, and destroys each sibling collapse it constructed." In `types.ts` this sentence is wrapped across two lines.
- The `returns` patch correctly carries no guide hunk.
- **Unknown 4, the `destroy` summary:** "destroys each sibling collapse it constructed" is the right sentence for the `CollapseInterface` table, because `destroy()` runs `engine.destroy()` over `#owned`.
- **The `@returns` clause is accurate.** A later call can start only after the panel loses the `transition` token, so "the panel showed" holds even in the identity case of the proof "resolves false for the call whose transition another call took over during the await, and dispatches shown once". Its voice is a bound.

**10. CONFIRMED.**
- The status lists the eight files named in the claim, all modified, with no new file.
- `Collapse.ts`, `Delegate.ts`, and `parsers.ts` carry no `as ` cast, no non-null `!`, no access modifier, and no nested declaration. The only inline function is the `MutationObserver` callback, which is an anonymous argument.
- `#taken` is gone.
- A case-insensitive sweep of the added lines in `j-collapse-2-unit.diff` for `should`, `simply`, `easy`, `just`, `currently`, `via`, `utilize`, `leverage`, `in order to`, `e.g.`, `i.e.`, `etc.`, `and/or`, `please`, `robust`, `performant`, `allows you to`, `dummy`, and `sanity` returns nothing.
- The over-long `Delegate` remark line exists as the claim states: in the class remark, the line "leaves every panel the click has not reached…" runs to about 132 columns.
- The counted-words sweep found one count in added prose; see F1.

## Findings fitting no claim

**F1.** In `src/browser/parsers.ts`, the `@remarks` of `parseElement` says "…with two bounds."
- **What is wrong:** the sentence is a count, which `AGENTS.md` § Writing bans. The remark also contradicts it: its closing sentence names a third difference, "an invalid selector returns undefined rather than throwing", where Bootstrap's `getElement` calls `document.querySelector(parseSelector(object))` unguarded (`util/index.js`, `getElement`).
- **Fix:** delete ", with two bounds". Open the next sentence with "Unlike `getElement`," and keep the three differences as sentences.

## Attacked and held

- **Every C1 proof arms its `MutationObserver` inside the reaction and asserts no record after it,** so a write after the read would turn the proof red.
  - In "stops a hide whose completing token write…", the reaction fires only on `collapse collapsing` without `show`, which is the `host` write door.
- **`#hideSiblings` read after each sibling `hide`:** a sibling's listener that shows the owner is caught by the `[]`/`[shown, transition]` read, before any write to the owner.
- **Nested roots, where the delegate hears a click whose trigger is outside its root:** `#routeCollapse` returns before marking, so an outer delegate is not starved.
- **The § Vocabulary lead-in:** it points to § Components for each component's own default tables and keeps only the Button and ColorMode rows. That matches R18's per-component placement.

## Referrals

**R1, to the objective lane (adverse ordering).**
- **Vector:** a custom-element trigger whose `class` reaction, on `hide`'s first `collapsed` token write, adds `show` to the panel.
- **Reading:** `#holds(change, [transition], [])` passes. The call then:
  1. writes the remaining trigger values (`aria-expanded="false"`);
  2. clears the inline size;
  3. awaits;
  4. adds `collapse`;
  5. stops only at the completing read.
- **Result:** the panel is left `collapsing show collapse` and its triggers read collapsed.
- **Why it matters:** the round's own proof ("…a reaction answers by adding the shown token") treats that same token change as a takeover one door later.
- **Candidate fix:** from the host-and-shown removal onward, `hide` reads `[transition]` present and `[shown]` absent.
- **To settle:** run the vector.

**R2, to the objective lane (test sufficiency).**
- The mutation "the token read is dropped at the write doors" drops every `during` read at once.
- No proof targets a single door among these: `show`'s host-token removal, zero size, trigger writes, and pixel size; `hide`'s host-and-shown removal, trigger writes, and size clearing.
- By reading the case list, a mutation that passes `[]` to `#writeTriggers` alone stays green. Run it to settle.

**R3, to the objective lane.**
- The removed-sibling proof calls a `hide` that proceeds, so nothing binds `#prune()` running before the refusals.
- Moving `this.#prune()` after the refusal lines would survive, by reading. Run it to settle.

**R4, to the objective lane or the checker (claim 6).**
- In the report's table, the row "the host is not claimed" lists five joined cases. Log row 27 joins six; the missing case is "destroys a sibling collapse it constructed…".
- The report's mutation names paraphrase the log's names:
  - "no collapse route" versus "the delegate has no collapse route";
  - "a constructed sibling is not destroyed with its owner" versus "…sibling engine…".

**R5, to the checker.** Rewrap the `Delegate` class-remark paragraph to the file's wrap width.

## Bounds

These are wording changes I would make. None states a fact the code contradicts.

- **`#apply` sets:** in both methods, the post-`await` read spells `[transition]` although `during` names the same set. Use `during` there. The local `completed` carries only the present half of each completion set.
- **Two verbs for one act:** the departure "restores the panel, its triggers, and each sibling collapse it constructed" against the `destroy` summary's "destroys each sibling collapse it constructed". Use "destroys" in the departure.
- **"Acquire" in two senses:**
  - in `Delegate` and § Delegation it means construct and own;
  - in `Collapse.#acquire` and the departure "The sibling collapses are acquired" it means find or construct.
  - Write "found or constructed" in the departure.
- **`#prune` against `#discard` and `#release`:** `#prune` combines the two acts `Delegate` names `#discard` and `#release`. Consider matching those names.
- **Case titles:** "…through the sibling engine…" against "…a sibling collapse it constructed…".
- **Sibling terms:** the `CollapseInterface` "open accordion siblings" against the guide's "open first-level sibling".
- **The `@returns` clause:** "the panel showed the change was taken over" uses `show` in a second sense, in the same sentence as "was shown". Prefer "the panel's tokens read the change as taken over", which matches `#### Collapse`.
- **The `#prune` comment:** "so no owned collapse outlives its panel until this one is destroyed" reads backwards.
- **Removal wording:** "whose panel left the document" could read "whose panel is outside the document at", which also covers the re-inserted panel.

## Files

- `C:/Users/mikes/WebstormProjects/veneer-collapse/src/browser/Collapse.ts`
- `C:/Users/mikes/WebstormProjects/veneer-collapse/src/browser/Delegate.ts`
- `C:/Users/mikes/WebstormProjects/veneer-collapse/src/browser/parsers.ts`
- `C:/Users/mikes/WebstormProjects/veneer-collapse/guides/veneer.md`
- `C:/Users/mikes/WebstormProjects/veneer-collapse/tests/src/browser/Delegate.test.ts`
- `C:/Users/mikes/WebstormProjects/veneer-collapse/node_modules/bootstrap/js/src/collapse.js`
- `C:/Users/mikes/WebstormProjects/veneer-collapse/node_modules/bootstrap/js/src/util/index.js`
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md`
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-collapse-mutations-round-2.log.txt`

VERDICT: FAIL 2, 4, 6; outside the claims: F1
