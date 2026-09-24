# J-COLLAPSE audit round 1 — the subjective lane's verdict, held by `reviewer` on Opus 5.5 (returned 2026-09-23, native subagent, 52 tool uses, 645 s; retained verbatim from the subagent's return text)

Subjective lane, held on Opus 5.5 (the `reviewer` alias served `claude-opus-5-5`). The same engine wrote this unit. I ran no command, so every vector below comes from reading the source and is labelled that way.

## Numbered verdicts

**1. BROKEN.** The engine's sequence matches the claim, but the claim's last clause is false: the guide does not describe that sequence exactly.
- **What is wrong.** The guide says the `show`, `hide`, and `toggle` methods resolve `false` when "a transition is in flight on the panel or on an open sibling" (`C:/Users/mikes/WebstormProjects/veneer-collapse/guides/veneer.md` around lines 645-648). `hide` checks only `#refused(false)` before and after its dispatch, and never checks `#moving` (`C:/Users/mikes/WebstormProjects/veneer-collapse/src/browser/Collapse.ts` around lines 183 and 185).
- **Vector.** Use an accordion with sibling A hiding (it carries `collapsing`) and panel B shown. `B.hide()` runs and resolves `true`. The guide says it resolves `false`.
- **Smallest fix.** Guide only: "…a transition is in flight on the panel or, for `show`, on an open sibling…". `CollapseInterface.hide`'s `@returns` already matches the code.
- **What held.** The sequence claim 1 lists, the class-static `Registry`, and the group resolution through `resolveVocabulary` and `resolveOptions` all match the code line by line. The vocabulary proof's three group-ignored mutations are distinguished: the decoy `.collapse.show` and the `data-bs-parent="#missing"` stay untouched only under the replacing values.
- The private method set's naming is finding F1, outside the claims.

**2. BROKEN.** The claim, the guide (around lines 651-653), and the code comment above `#open` (around line 269) all say the open panels are those that "sit inside no other such panel", meaning no other open panel. The code excludes any panel nested inside any panel that carries the `host` token or the `transition` token, open or not.
- **Evidence.** The nested set is built as `` `:scope ${panel} ${panel}` `` with `panel = :is(host, transition)` (around line 277).
- **Vector.** Inside the parent, put a closed `div.collapse` containing `div#inner.collapse.show`. The guide says `show()` hides `#inner`. The code leaves it alone.
- The code is right. It matches Bootstrap's `:scope .collapse .collapse` (`collapse.js:36`, `:239`) and adds transitioning ancestors.
- **Smallest fix.** Prose in the guide and the comment: "that sits inside no other panel carrying the `host` or `transition` token".
- **Ownership shape.** It stands as an API:
  - `#acquire` returns `find`'s engine or constructs one with the same groups and parent.
  - `#siblings` drops dead entries.
  - `destroy` restores its own snapshot, then destroys what it constructed.
  - The consumer-constructed engine stays live, and the second proof pins that.

**3. UNRESOLVED.** From the source:
- The prevented path writes nothing, because `#save` follows the dispatch.
- Both the mid-flight refusal and the open-sibling refusal hold.
- No `requestAnimationFrame` is used.
- Nothing calls `focus()`.
- Destruction aborts `settleAnimations`, and `#taken` returns `false` before `shown`.
- The signal is handled both at construction and when it aborts later.

The clause "each proof's named mutation reddens it and no other" is not measured. Every line in `j-collapse-mutations-final.log.txt` ran with `-t` and reads "1 failed | 24 skipped", so the other cases never ran under any mutation. **To settle it:** re-run each mutation over the whole file without `-t`, and read exactly one failure with the named case.

**4. BROKEN.** The guide defines a takeover this way: "the panel no longer carries the `transition` token that call wrote, or … another call … started a later change. The earlier call then stops …, writing and dispatching nothing more" (around lines 674-676). § Ownership and restoration requires that reading at every door, including every write (around lines 596-599). The class TSDoc repeats it: "After each write, dispatch, and await, a call reads its lifetime and the host again."
- **What the code does.** `#apply` reads only `#taken`, which checks `aborted` and `#change !== change` (around lines 245-252). It reads the token once, after the `await` (around lines 173 and 205).
- **Vector.** Use a custom-element panel whose `class` reaction removes `collapsing` when `show` removes the `host` token. `show` still writes `height: 0px`, each trigger's `aria-expanded="true"`, and the pixel size, and only then resolves `false`. It writes after the host showed the takeover.
- **Recommended fix.** Once a call has written the `transition` token, `#taken` also reads that the host still carries it. The rule paragraph requires the host read at every door, so fix the code rather than narrow the prose. In `hide`, the size write comes before the token write.
- **What held.**
  - The `#change` identity is justified. After a foreign removal and a second call, the host carries a `transition` token either way, so the host alone cannot tell call A's token from call B's.
  - The four door mutations each break their proof. On the re-entry mutation, the outer call takes the identity back and resolves `true`, which the `false` assertion catches. On the await mutation, the first call finishes and resolves `true`.

**5. CONFIRMED.**
- **The ruling.** The first-saved rule is right, and a consumer expects it: after every engine is destroyed, the element reads what it carried before any engine wrote it. The first-started rule fails that in both directions:
  - The unit's second overlap proof ends at `class=""`.
  - The landed `HostSnapshot.test.ts` case "lets the restoration that started first write a target two snapshots saved, whichever saved it first" ends at `data-state === 'earlier'`. That is a destroyed engine's write. Under the first-saved rule it ends at `'original'`.
- **What `#publish` needs.** Give each record a save-order stamp from a class-static counter taken at `save`. `#take` must pass the stamp on, because a taken value is the older value. `#publish` replaces a pending entry, and its owner, when the incoming stamp is earlier.
- **The `classed` key.** It follows the same rule. Its stamp is that of the element's first token save, or of the taken `classed` entry.
- **What J-BINDER-PRECEDENCE's brief must carry:**
  - The `#publish` and stamp change.
  - All four sentence sites:
    - The `HostSnapshotInterface.restore` remark, which is the unit's patch.
    - The `HostSnapshot` class remark.
    - The `#publish` comment.
    - The guide's § Ownership and restoration sentence (around lines 587-588).
  - The flip and retitle of the `HostSnapshot.test.ts` case.
  - `j-collapse-precedence-proof.diff`.
  - The `style=""` defect as its own criterion: a `style`-attribute record that mirrors `classed`. The Collapse proofs' `panel.style.length === 0` assertions tighten to `hasAttribute('style') === false`.
  - The invariant that the `class` removal is judged only after every overlapping restoration has finished its token writes on that element (referral R8).
- **Titles.** The flipped title in the proof patch tells a reader the outcome a consumer sees. The landed second title does not.

**6. BROKEN.** `#routeCollapse` marks the trigger (`#mark(event, Collapse, trigger)`, around line 160) before its loop skips each panel the root does not contain (around line 168). The first delegate to hear the click therefore uses up the click for panels it declined.
- **Vector.** The outer root holds panel P and an inner root. The inner root holds trigger T, which names `#P`. The inner delegate marks T and skips P. The outer delegate finds T marked and returns. P is never driven, although it is inside the outer root.
- This contradicts § Delegation ("driven once per click for each entity whose selector matches"). The departure "leaves a panel outside its root alone" does not cover it, because P is inside the outer root.
- A delegate destroyed during the click also marks T before it stops, so a live outer delegate then skips T.
- **Right shape.** Key the mark on the engine's host, which for Collapse is the panel: call `#mark(event, Collapse, panel)` inside the loop, after the containment check. A repeated `preventDefault` has no further effect.
- **What held.** The `collapse` option on `DelegateOptions`, the route typed by engine class, and the check that prevents default only for an anchor all hold. The anchor check matches `collapse.js:282`.

**7. CONFIRMED.**
- **Attacks that failed:**
  - Placement: `architecture.md` maps coercers to `*/parsers.ts`, and E10 and R13 name this exact trigger. `parseElement` never throws, as § Kind purity requires.
  - Name: the contract's readers are named `parse{Output}`, and `parseElement` returns an `HTMLElement`.
  - A reader in `helpers.ts` instead: refused, because `read*` never coerces (`names.md`).
  - Missing `COLLAPSE_DEFAULTS`: an empty table would be a decorative value for an absent `parent`, which "Absence is `undefined`" and E6 refuse.
  - The barrel and the element guard also hold.
- The element pass-through branch has no source consumer. It is the parse family's identity case, so it holds.
- The typing of `isCollapseEvent` is referral R4.

**8. BROKEN.** Two sentences in the guide state facts the artifact contradicts.
- **The § Examples lead-in** (lines 427-428) says showing "hides the accordion's open panel through that panel's own collapse, and restore both". The fence (lines 430-440) builds an accordion that holds only the constructed panel. There is no open panel to hide, and no second panel to restore.
  - **Fix.** Add a `class="collapse show"` sibling to the accordion and append the accordion to `document.body`. Otherwise, reword the lead-in to what the fence does.
- **The Collapse `plugin` row** (around line 5348) keeps Proof `—` and puts the path in the Obligation cell. The same section states that "A `plugin` row's Proof cell names instead the test file … the conformance proof requires that file to exist" (lines 5363-5366). The row breaks its own table's rule and escapes the conformance file-existence check.
  - **Fix.** Proof cell `tests/src/browser/Collapse.test.ts`. Restore the Obligation cell's full wording. Let the formatter re-pad the table.
  - The unit followed the brief's stale standing condition and reported it. The verdict is on the artifact.
- **What held.** § Surface rows are third-person `-s` sentences. The fence imports through `@orkestrel/veneer/browser`. The events table is correct.
- Each recorded departure checks out against `collapse.js`: lines 80-86, 185-190, 42 and 125, 214, and 280-289.
- The placement of the component tables is referral R2.

**9. UNRESOLVED.**
- Two clauses rest only on the writer's report or on a record that does not exist:
  - The Orchestrator's replay log `j-collapse-mutations-orchestrator.log.txt` is not in the units directory.
  - The unit's `git add -N` and `git rm --cached` restoration is attested only by its report. The retained status is the Orchestrator's own capture, taken after intent-to-add.
  - **To settle both:** the replay log, and the unit's `git status` before the capture.
- **From the source, these hold:**
  - The status lists only owned files.
  - No added line carries `any`, `as`, `!`, `@ts-`, `eslint-disable`, a visibility keyword, or a parameter property. I searched `j-collapse.diff` added lines, and every hit was prose.
  - No alias or re-export was added.
- **Rulings on the patches:**
  - `j-collapse-delegate-prose.diff` and `j-collapse-destroy-summary.diff` are required at integration, not optional. Without the first, the guide's "The delegate prevents the click's default action" (around line 539) and `DelegateInterface.destroy`'s "destroys every owned button engine" are false for the collapse route.
  - `j-collapse-read-tag.diff` is the right shape. `AGENTS.md` requires the duplicate try/catch in the `Button` and `Collapse` constructors to become one exported, tested helper, and every later engine constructor needs it too. It can land at integration as an exact audited patch, on condition that the verifier runs `test:src:browser`, `test:guides`, and `test:policy` with every patch applied. `test:policy` is the `surface` fleet-name check for `readTag`. The unit did not run the gates with the patches applied.

## Findings fitting no claim

**F1.** The private method set breaks "One concept, one term" (`AGENTS.md`) in `Collapse.ts`.
- `#close(change, panels)`, around line 286, hides the siblings. `close` alternates with the fixed verb `hide`.
- `#open()`, around line 270, is a query named as the verb of the opposite action, so `#open` and `#close` read as a command pair when one is a query.
- **Right.** Rename the query `#siblings()`, rename the field that holds constructed engines `#owned` (the `Delegate` class's term for engines it constructs and destroys), and rename `#close` to `#hideSiblings`.

## Attacked and held

- **`#change` against a derived host read.** The host cannot record which call wrote the token, so storing the identity keeps no duplicate state.
- **`#apply` as a wrapper.** It adds the invariant that a write is followed by a read, so it is not superfluous.
- **§ Components placement.** Placed after § Delegation, § Ownership and restoration, and § Motion, it moves from general to specific. With the delegate-prose patch, § Delegation points to it instead of repeating it.
- **The unit's inline `{}` for `resolveOptions`.** It is plain and correct.
- **Resolving `parent` in the global `document`.** This is documented and matches Bootstrap.
- **The `?inline` cascade source.** It reads the real shipped declarations, which the brief's built-file option would only copy.
- **Construction-time `toggle` struck.** R11 as amended strikes it.

## Referrals

- **R1, Orchestrator.**
  - R5 as amended says "a click matching conflicting routes inside one delegate is refused before either runs". The brief's obligation (a), and the landed "driven once per click for each entity whose selector matches", drive both routes.
  - My design view: a button route and a collapse route on one host do not conflict.
  - Define "conflicting" before Dropdown or Tab lands.
- **R2, Orchestrator.**
  - R18 puts each component's default tables beside its attribute table under `####`. The unit added rows to the single § Vocabulary table.
  - Rule on the home now: this precedent binds the ten components still to come.
- **R3, Orchestrator or J-TYPES.** The `Delegate` class's `#collapse` field has an inline type, while `#button` is typed `ButtonVocabulary`. Rule on one form: a `{Entity}Vocabulary` type for every entity, or none.
- **R4, objective lane and J-TYPES.** `isCollapseEvent` admits only `detail === null` but narrows to `CustomEvent<undefined>`. A hook then reads `null` where the type says `undefined`.
- **R5, objective lane.**
  - `resolveOptions` parses `data-bs-parent` even when the constructor supplies `parent`, so an invalid attribute throws despite the table's "which the constructor overrides".
  - `#acquire` can then throw inside `show()` after `show.vn.collapse` has fired, so `show()` rejects instead of resolving `false`.
  - The delegate's `new Collapse` throws inside the click listener on the same markup.
- **R6, objective lane.** Sibling engines that a collapse constructs are outside the delegate's observer release, so a removed sibling keeps its engine until its owner is destroyed.
- **R7, objective lane.** Claim 3's "no other" clause needs mutation runs without `-t`.
- **R8, objective lane, for J-BINDER-PRECEDENCE.** Under the first-saved rule, judge the `class`-attribute removal only after every overlapping restoration's token writes on that element.

## Bounds

- `#moving` is a synonym for "transitioning". `#taken` blends "destroyed" with "taken over". The `#change` comment says "until it completes", but the identity is not cleared on the refusal paths.
- The `Collapse` class `@example` uses a detached `div` with no host token.
- In the attribute table, the "Read by" cell names `parseElement`, which converts the value; `resolveOptions` reads it.
- The departure's "Bootstrap's `dispose` method must not follow `hide`…" states a Bootstrap rule the evidence does not show.
- The departure list leaves out two differences from Bootstrap:
  - Triggers are re-read at each change; `collapse.js:64-76` fixes them at construction.
  - Transitioning ancestors count as nesting.
- The first lifecycle case's title names only the show half.
- `readTag`'s summary ties a general reader to one use.
- `parseElement` returns only an `HTMLElement` under an `Element` name.
- Every summary, remark, and guide sentence I read passes the `writing.md` substitution table apart from the preceding items. I checked by reading, not by a pattern sweep.

VERDICT: FAIL 1, 2, 3, 4, 6, 8, 9; outside the claims: F1
