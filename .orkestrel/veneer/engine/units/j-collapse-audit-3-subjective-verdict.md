# J-COLLAPSE audit round 3 — the subjective lane's verdict (returned 2026-09-24 by `reviewer` on Opus 5.5, native subagent, 36 tool uses, 499 s; retained verbatim from the subagent's return text)

Lane: subjective, held in full. The `reviewer` alias served Opus 5.5 (`claude-opus-5-5`) as a native subagent. I ran no command, so every reading below comes from source.

## Numbered verdicts

**1. CONFIRMED.** One clause is `UNRESOLVED`: the `EXACT` readings for "the trigger-write door reads no token" and "the hide doors after the removal admit the shown token" rest on the writer's log alone until `j-collapse-mutations-3-orchestrator.log.txt` exists.
- **Source:** I walked every `hide` door in `Collapse.ts`.
  - The size write is `[shown]`/`during`.
  - The transition-token write is `during`/`[]`.
  - The host-and-shown removal, `#writeTriggers(change, during, [shown], collapsed, false)`, the size clearing, and `#holds(change, during, [shown])` after the `await` are all `[transition]`/`[shown]`.
  - The host write is `[host, transition]`/`[shown]`, and the transition removal is `[host]`/`[transition, shown]`.
  - No door after the removal lets a re-added `shown` token through.
  - The `show` doors match `j-collapse-2.diff` apart from `during` in place of the literal `[transition]`, which is the same set.
- **Shape attack, which failed:** could a phase object replace the two lists on `#writeTriggers`? `#holds` and `#apply` already take `(change, present, absent)` in that order. Keeping `#writeTriggers` in the same family is the coherent choice.
- **Red reading corroborated:** the round-2 code used `#writeTriggers(change, during, …)`, which read `[transition]`/`[]`. After the reaction, that code writes `aria-expanded`, clears the size, and adds `collapse`, and then the host door stops it. That is three records, which matches the red log.
- **Mutation reasoning (read, not run):** the proof "stops a hide whose trigger write a reaction answers by adding the shown token, writing nothing more" asserts no record after the reaction. Both mutations restore the write-through behaviour, so the proof tells them apart from the passing code.
- The class remark ("a hide's panel must lack the `shown` token from the moment the hide removes it") and the takeover paragraph state the added read.

**2. BROKEN, on the guide half and the `#activate` comment.** The source half holds.
- **Failing state A: § Delegation omits the refusal, and its button-route sentences are false for a refused click.**
  - `guides/veneer.md` § Delegation says "a click inside a host the resolved `trigger` selector matches drives that host's button" and "The button route prevents the click's default action".
  - The proof "refuses a click whose button host is a panel the collapse trigger names when neither engine exists, driving neither route" shows the opposite: `Button.find(panel)` is `undefined` and `defaultPrevented` is `false`.
  - E12 as amended says "the guide's § Delegation and `#### Collapse` state it". § Delegation contains no refusal sentence. A grep for `refus|conflict` over the guide hits only `#### Collapse` in this area.
  - **Fix:** after the button-route sentences, add "A click whose button host is one of the panels its collapse trigger names inside the root is refused when neither engine exists there, as § Components states under Collapse."
- **Failing state B: the restoration sentence keeps the rule D2 retired.**
  - § Delegation says "…acquires a fresh engine at once, in the first delegate to hear it". That is the old "whichever delegate hears it" reworded past the brief's grep. It is not the new rule "the first live delegate whose root contains it to reach it".
  - It is false when the first delegate to hear the click does not contain the host. Take an inner delegate whose root holds the trigger but not the panel, plus a document-root delegate, while another engine restores the panel. The inner delegate hears first and skips the panel at `#routeCollapse`'s `this.#root.contains(panel)` check, and the outer delegate acquires it.
  - The case "leaves a panel outside an inner root to the outer delegate whose root contains it" shows the same routing outside restoration.
  - So Unknown 2's answer is no: the two sentences name two rules, and the restoration one is the false one.
  - **Fix:** "…finds no owner, and the first live delegate whose root contains the host to reach it acquires a fresh engine at once; that engine's snapshot takes…"
- **Failing state C: the `#activate` comment describes routing the refused click.**
  - The comment in `Delegate.ts` still reads "Drops every engine destroyed directly, then routes a click through the button route and the collapse route…". A conflicting click is routed through neither.
  - **Fix:** "Drops every engine destroyed directly, refuses a click that would have the button route and the collapse route each construct an engine on one element, and otherwise routes it through both…"
- **What held, with the attacks that failed:**
  - `#conflicts(event.target)` is the first statement after the target check.
  - It resolves the button host and the collapse trigger the same way the routes do (`closest`, then `this.#root.contains`).
  - It checks `readTargets(...).includes(host)`, so a panel named through `href` counts. The element must be the same one, per E12's letter.
  - A trigger outside the root makes it return `false`. That matches E12's rationale ("so both routes would construct one there"), because `#routeCollapse` would return there too.
  - It marks nothing, so an outer delegate stays free to refuse or drive the click on its own vocabulary.
- **Unknown 1:** the name and shape stand.
  - `#conflicts` is a verb, like `#holds` and `#refused`, and it uses E12's own term.
  - A boolean query before the routes is the right shape. Resolving the hosts once and handing them to the routes would freeze the collapse trigger across the `toggle.vn.button` dispatch. Every other route in this unit re-reads after a dispatch.
  - The duplicated resolution is a bound.
- **Retargeted proof:** it constructs `new Button(panel)` first. Its title and assertions match the claim.
- **Mutation clauses:** `UNRESOLVED`, because the replay is absent.

**3. CONFIRMED.**
- **Nesting:** the sentence carries "within the parent" at its three sites. `#siblings` builds `parent.querySelectorAll(':scope :is(host, transition) :is(host, transition)')`. `:scope` excludes the parent itself, so "within the parent" is exact, including when the parent carries `collapse`.
- **Token order**, checked against `collapse.js`:
  - `show` removes `collapse` (line 140) before it adds `collapsing` (line 141).
  - Its completion removes `collapsing` (line 151) before it adds `collapse show` (line 152).
  - `hide` adds `collapsing` (line 182) before it removes `collapse show` (line 183).
  - Its completion removes `collapsing` (line 197) before it adds `collapse` (line 198).
  - Veneer's `show` adds the `transition` token before it removes the `host` token, and both completions write before they remove. Every clause of the departure is true.
- **Attack, which failed:** I looked for a Veneer order the departure omits. Veneer's hide opening matches Bootstrap's, so it is not a departure. That this reads only by inference is a bound.

**4. BROKEN.**
- **Failing input:** the last sentence says "An invalid selector returns undefined, where `getElement` throws". That is false for two inputs Bootstrap's own source handles without throwing:
  - `''` is refused by `querySelectorAll`, yet `getElement` returns `null` through its `object.length > 0` guard (`util/index.js`, `getElement`).
  - `#1abc` is invalid as written, yet `parseSelector` rewrites it to `#\31 abc`, so `getElement` does not throw.
- The claim's "so the last sentence is true" therefore does not hold.
- **What held:**
  - The count is gone.
  - The non-HTML pass-over sentence and the escape sentence are true. `parseSelector` escapes each `#id` run.
  - Unknown 4: the three sentences read as one comparison under "Unlike `getElement`".
- **Fix:** "Where the selector as written is invalid, this reader returns undefined; `getElement` returns null for an empty string and throws for any other selector its escaping leaves invalid."

**5. CONFIRMED.** One clause is `UNRESOLVED`: the `EXACT` reading for "#prune runs after the refusals" waits on the replay.
- The proof calls `collapse.show()` on the shown owner after `first.remove()`. `#refused(true)` returns `true` there, so the call starts no change, and the proof asserts `Collapse.find(first)` is `undefined` and the panel restored to `['collapse','show']` before `hide()`.
- **Mutation reasoning (read, not run):** "#prune runs after the refusals" moves `this.#prune()` below `#refused` in both methods. The refused `show` then leaves `find(first)` returning the sibling, which fails the proof's assertion, so the proof tells the mutant apart from the passing code.
- The `#prune` comment reads forward, and its first half matches the code's second branch.
- **The name `#prune`:** it is a verb, outside the fixed lifecycle table, and it stands.
- The case title is defective; see F1.

**6. UNRESOLVED.**
- **What the log shows:**
  - `j-collapse-mutations-round-3.log.txt` carries one `EXACT` or `JOINED` row per mutation.
  - The four round-3 rows sit at lines 35 to 38.
  - The `GREEN?` rows read 0 failed for Collapse 32, Delegate 33, validators 10, parsers 3, and index 3.
  - The digests before and after are identical, and the receipt reads `restored byte for byte`.
  - The instrument rows at `j-collapse-mutations-3.py` lines 123 to 140 define the four named mutations.
- **What cannot be settled:**
  - That the runs happened as logged rests on the writer's run until the replay exists.
  - The retained `j-collapse-report-3.md` carries no mutation table; its retention note replaced the table with a reference to the log. So "the report's table is the log's rows verbatim, grouped `EXACT` then `JOINED`" cannot be checked from what the campaign kept.
  - I did not diff the instrument against `mutations-2.py`.
- **To settle:** the Orchestrator's replay log, the writer's return text holding the table, and a diff of the two instruments.

**7. CONFIRMED.**
- Both post-`await` reads use `during`.
- The departures read "found or constructed" and "destroys each sibling collapse it constructed".
- `j-collapse-returns.diff` carries "or the panel's tokens read the change as taken over" in both `@returns` sentences.
- The orphan "finds the" stands alone at `guides/veneer.md` line 710, between "A call that" and "panel otherwise".
- § Delegation, both paragraphs, shows no orphan.
- **Unknown 3:** the added clause is true, but it sits after the "before a hide writes its token" clause. The paragraph therefore runs during, completion, pre-hide, post-removal. That order is a bound.

**8. CONFIRMED.** The gate clauses are established by the Orchestrator, and I did not re-run them.
- A grep for `^.{101,}$` over the four sources hits only these pre-existing lines: `Collapse.ts` 32, 83, and 84; `Delegate.ts` 73 and 74; `validators.ts` 27.
- `#conflicts`, the changed doors, and the added tests contain no `as `, non-null `!`, access modifier, or nested declaration.
- The added prose uses "at once" in its permitted sense ("immediately").
- The report records that no `prove` call was made because the server was unreachable, which is what brief 3 asked it to record.

**9. CONFIRMED.**
- The hunk headers of `j-collapse-3.diff` against `j-collapse-2.diff` place the round-3 delta where the claim names it:
  - `guides/veneer.md`: the § Delegation hunk grows by one line, a restoration hunk is added at line 549, and the `#### Collapse` and departure hunks grow.
  - `Collapse.ts`: the remark, `show` and `hide`, `#prune`, and `#writeTriggers`.
  - `Delegate.ts`: the new hunk at old line 136 (`#conflicts`) and the remark.
  - `Collapse.test.ts`: plus 41 lines (the D1 case and the D5 lines).
  - `Delegate.test.ts`: plus 33 lines.
  - `parsers.test.ts` and `validators.ts` are unchanged since round 2.
- These round-2 confirmations remain in the source unchanged:
  - `#hideSiblings`'s `[]`/`[shown, transition]` read.
  - `#mark(event, Collapse, panel)` after the aborted and containment checks.
  - The `destroy` release-then-restore order.
  - The R18 table placement.

## Findings fitting no claim

**F1.** In `tests/src/browser/Collapse.test.ts`, the case title "destroys a sibling collapse it constructed at its next change after that sibling panel leaves the document" names the wrong moment.
- **What is wrong:** since D5, the case proves destruction at a refused `show()`, which starts no change. `#change` is "the latest call that started a change", and the refused call returns before `this.#change = change`. The title describes the mutant "#prune runs after the refusals", which destroys at the next change (the `hide`), rather than the behaviour the case binds.
- **Why it matters:** the guide and the class remark say "at its next `show` or `hide` call", so the title gives "change" a second meaning.
- **Fix:** "destroys a sibling collapse it constructed at its next show or hide call, refused or not, after that sibling panel leaves the document". Update the title strings in `j-collapse-mutations-3.py` at the same time.

## Attacked and held

- **The refusal against E12's letter:**
  - The refusal applies to the same element only; an ancestor or a descendant of a named panel is a different host, and `includes(host)` enforces that.
  - A panel named through `href` counts, through `readTargets`.
  - A trigger outside the root is not refused, which is correct because the collapse route would not construct there.
  - A refused click marks nothing.
- **"One of the two engines" in `#### Collapse`:** this is a fixed pair (button, collapse) named by its members in the preceding sentence. It is not a count of a set W2 grows, so it is permitted.
- **The retargeted same-host case:** constructing `Button` first leaves one constructing route, so "the per-click mark ignores the route" still has a single binding case.
- **The `#prune` first branch:** it drops an engine the registry no longer maps, which matches "each one already destroyed directly is dropped".

## Referrals

**R1, to the objective lane (adverse ordering).**
- **Vector:** outer root, then trigger, then inner root, then a panel that is also the button host (`data-vn-press`), then the click target.
- **Reading:** the inner delegate finds no conflict, because the trigger is outside its root, so it constructs a `Button`. The outer delegate then sees `Button.find(host)` defined and no conflict, skips its button route on the mark, and constructs a `Collapse`. One click constructs two engines on one element across delegates.
- **Question:** R5 says "inside one delegate", while E12's base definition says "a click". The Orchestrator rules which applies. Run the vector.

**R2, to the objective lane (test sufficiency).**
- "The hide doors after the removal admit the shown token" empties all four doors at once, and only the trigger door has a proof.
- By reading, emptying only the removal door lets one extra `collapsed` write through before the trigger door stops. Emptying only the post-`await` read lets one extra `host` write through. No case appears to catch either. Run each single-door mutation.

**R3, to the objective lane (test sufficiency).**
- The refusal proof uses one delegate and `data-bs-target` only.
- A mutation that marks inside `#conflicts` before refusing, or that reads only the target attribute there, would survive by reading. Run both.

## Bounds

- **Duplicated resolution:** `#conflicts` repeats the host and trigger resolution of `#routeButton` and `#routeCollapse`. Private resolvers used by all three would keep the refusal and the routes from drifting, while the routes still re-read after the button dispatch.
- **`#conflicts` comment:** it says "both routes" about a route set W2 grows. Write "the button route and the collapse route".
- **"By the first live delegate whose root contains it to reach it":** it reads on the second pass. "Reach" also has a different subject in the next sentence ("the click has not reached").
- **Takeover paragraph:** it ends the post-removal read "until the transition settles", while the remark leaves it open-ended. The code reads the missing `shown` token through completion.
- **`Collapse.ts` class remark:** the line ending "completes to. A" breaks early, because "call" fits. Rewrap it with the orphan fix.
- **Nesting sentence:** "within the parent carrying the `host` or `transition` token" can attach "carrying" to the parent.
- **Token-order departure:** state that Bootstrap's hide opening matches Veneer's.
- **`@returns`:** "the panel's tokens read the change as taken over" gives the tokens the act of reading. That was my own round-2 wording. "The call reads the change as taken over" matches `#### Collapse`.
- **Alternations and titles:**
  - The guide's "no collapse constructed" against the remark's "no collapse engine".
  - The remark's passive "nothing is marked…" against the guide's active voice.
  - The refusal title's "driving neither route": routes run, engines are driven.
- **Small comment and remark wording:**
  - The subject of `parseElement`'s last sentence is "An invalid selector".
  - The `#prune` comment's "past its panel" heads a sentence whose second half is not about the panel.
  - The `hide` door comment's parallelism breaks at "without the shown token from its removal on".

## Dispatch defect

None.

VERDICT: FAIL 2, 4, 6; outside the claims: F1
