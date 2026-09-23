# J-BINDER audit round 7 — the subjective lane's verdict, held by `reviewer` on Opus 5.5 (returned 2026-09-23, native subagent, 31 tool uses, 344 s; retained verbatim from the subagent's return text)

Lane: subjective, as the brief assigns. The `reviewer` alias served Opus 5.5 (`claude-opus-5-5[1m]`). Opus 5.5 wrote this round, and this lane referred R1 and R2 in round 6, so I attacked those two landings hardest. I ran no command, so every ruling below comes from reading the source. Dispatch defect: none.

# J-BINDER audit round 7: subjective lane verdict

## Numbered verdicts

**1. CONFIRMED.**

- **The code matches the claim.** In `C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/Button.ts`, `toggle` (around lines 97–109) reads `this.pressed` at three points:
  - for the `aria-pressed` write, after the token write's lifetime check;
  - for the event detail, after the lifetime check that follows the attribute write;
  - for the return, after the dispatch.
  - No local variable carries a value across a step where other code can run.
- **The comment and the guide agree with the code.** The comment (around lines 99–102) and the guide's Button sentence (`guides/veneer.md`, around lines 568–571) state the same three reads.
- **Mutation that must fail the proof: "the event detail from the read before the aria-pressed write"** (`j-binder7-mutations.json`).
  - Under it, the outer detail reads `true`, so the details read `[false, true]`.
  - The assertion expects `[false, false]` (`Button.test.ts`, around line 414), so it tells the mutation apart.
  - `j-binder7-red.log.txt` records exactly that failure on the round-6 source: `Tests 1 failed | 137 passed (138)`.
- **Attacks that failed.** I traced each of these paths, and each read agrees with the host at the moment it is taken:
  - a reaction inside the token write that toggles again or destroys;
  - a reaction inside the `aria-pressed` write that toggles again or destroys;
  - a listener that destroys or toggles again;
  - a reaction that edits the class list directly instead of calling `toggle()`.
- **Shape.** The comment names the doors, the re-read, and which read feeds which step. The guide sentence carries the same rule as a consequence of the rule paragraph. Both are in place.

**2. CONFIRMED.**

- **What the proof does.** Trace of `HostSnapshot.test.ts`, "lets the restoration that started first write a target two snapshots saved, whichever saved it first" (around lines 249–285):
  - `started.restore()` publishes `data-state` with the value `'earlier'`.
  - The nested `earlier.restore()` finds the key already present, so it publishes nothing. `#writeBack` refuses it on the owner check, and its `finally` block's `#withdraw` does nothing.
  - The reading inside the reaction is therefore `'started'`, and `started` then writes `'earlier'`.
- **Mutations the assertions tell apart:**
  - `#withdraw` compares presence instead of the owner: `started`'s entry is withdrawn, so the final value stays `'started'`, and the assertion `toBe('earlier')` fails.
  - `#writeBack` compares presence instead of the owner: the reading becomes `'original'`, and the assertion against `'started'` fails.
  - A publish replaces an existing entry: the same result as the `#writeBack` mutation.
  - The "no entry remained" assertion, which I attacked as unable to fail: with `#withdraw` made a no-op, `started`'s stale entry blocks `later`'s publish and its write back, so the host stays `'later'` and `toBe('earlier')` fails. The assertion binds.
- **My lane's question: the sentence does not promise more than the code delivers.**
  - "Where two restorations overlap on one target, the restoration that started first writes it back" is true of the code.
  - The value that restoration writes is its own recorded value, which the preceding sentences state.
  - Losing the oldest original is not specific to the overlap. The same result follows without any overlap when the snapshot that saved first is destroyed first (`'original'` is written, then `'earlier'`). No sentence promises the element's first original across snapshots.
  - The proof's `'earlier'` assertion, against the host's starting value `'original'`, records the loss.
- **The right home for the ordering question is J-COLLAPSE carried obligation (b).** That is the first unit where two shipped engines share a target. See referral RF1 on its carrier.

**3. BROKEN.** The clause "can follow without a further ruling" does not hold.

- **Where the paragraph puts the stops** (`guides/veneer.md`, around lines 561–567):
  - At a write or a dispatch, the synchronous rule gives one stop condition: the engine was destroyed.
  - The takeover stop ("it also stops when the host shows that another call has taken the change over") sits inside the sentence scoped to "after each `await`".
- **The interleaving R1 named takes over at the dispatch door, not at an `await`:**
  1. The outer `show()` dispatches `show.vn.collapse`.
  2. A listener calls `show()`. No transition is in flight yet, so under `CollapseInterface.show`'s `@returns` (`types.ts`, around line 680) the inner call proceeds.
  3. The inner call writes the transition token and the inline size, starts the transition, and parks at its `await`.
  4. The dispatch returns. The outer call reads its lifetime and finds the engine alive.
  5. A literal reading of the paragraph gives the outer call no stop at this point. It goes on to write the transition token and its starting size over the inner call's change in flight, and it reads the takeover only at its first `await`.
  - This is a derivation from the Bootstrap sequence (`collapse.js` `show` writes the starting dimension before the scroll size). A start-size write in step 5 restarts the transition.
- **The briefs already disagree.** `units/j-collapse-brief.md` carried obligation (c) states the takeover stop at every write, dispatch, and `await`, and calls that "as J-BINDER round 7 landed it". The landed paragraph does not say that. The guide paragraph is off-limits to J-COLLAPSE, so its executor would open two instructions that conflict.
- **Unknown 1: the split between mechanism and component policy is right.** The takeover mechanism belongs to the rule. What "taken over" reads as (the transition token, the change in flight) belongs to the subsection.
- **Required change.**
  - **Where:** `guides/veneer.md`, § Ownership and restoration, around lines 564–567.
  - **What is wrong:** the takeover stop is scoped to `await` only.
  - **Why it matters:** the canonical takeover happens at a synchronous door, before any `await`.
  - **What right looks like:** "A sequence that awaits meets a third door at each `await`, because any code can run before it resumes. At each of its doors (every write, dispatch, and `await`) it reads its lifetime and the host again, and it stops and resolves `false` when the engine was destroyed or when the host shows that another call has taken the change over. Each engine's own subsection states what that reads as for its host."
  - This wording stays true of `Button` and `ColorMode`, because neither awaits. It also matches carried obligation (c).
  - **Carrier:** the J-BINDER successor round, which owns the paragraph.

**4. BROKEN.** The clause "the only other form is the `#pending` field's comment" is false.

- **The surviving site.** `C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/HostSnapshot.ts`, the `#publish` comment (around lines 155–156), reads: "unless another restoration in progress already owns that target on the element".
  - That makes a restoration the owner.
  - The `owner` field (around line 44) holds a `HostSnapshot`, and the class remark says the snapshot owns.
  - The same text is at `j-binder-6.diff` line 1138 and `j-binder-gates-6.log.txt` line 94. My round-6 bound named this site among the "each restoration owns" sites, and G4 required one form throughout `HostSnapshot.ts`.
- **Why the acceptance criterion passed anyway.** Its grep pattern (`j-binder7-accept.sh` line 20) matches "each restoration owns" only. It does not match "another restoration in progress already owns", so it reported one form while this site survived.
- **What holds.**
  - The owner sentence appears in all three places the claim names: `HostSnapshot.ts` around line 15, `types.ts` around line 279, and the guide around line 547.
  - Unknown 3: the `#pending` comment's "the snapshot that owns each one" uses the same noun, and it is consistent with "what its restoration publishes".
  - No § Surface or § Methods cell moved in round 7: the `save` and `restore` rows are identical to the round-6 diff, lines 386–387.
- **Required change.**
  - **Where:** `HostSnapshot.ts`, the `#publish` comment.
  - **What is wrong:** it names a restoration as the owner.
  - **Why it matters:** the brief's G4 obligation is not met, and the claim's count of the forms is wrong.
  - **What right looks like:** "Publishes one value a restoration has still to write back, unless another snapshot already owns that target on the element; the restoration that started first writes it."
  - Widen the acceptance grep to `restoration[a-z ]* owns` over the same files.
  - **Carrier:** the J-BINDER successor round.

**5. UNRESOLVED.**

- **What holds from the source and the files:**
  - Each name appears once in `j-binder7-mutations.json`, and there is no second list.
  - Every report row has an entry and a result that names the cases it reddens.
  - The moved tallies match `j-binder6-mutation-results.json`:
    - owner comparison: 5 of 78 → 6 of 80
    - nested-restore withdrawal: 1 of 13 → 2 of 14
    - attributes before tokens: 5 of 55 → 6 of 57
    - stale token-write result: 1 of 42 → 2 of 43
  - The carried `Delegate`, `resolveOptions`, `resolveVocabulary`, and `recordCalls` tallies are unchanged.
  - `HostSnapshot.ts` and `Button.ts` contain no `any`, `as` cast, non-null `!`, `@ts-`, `eslint-disable`, access modifier, or parameter property.
  - E6 holds: `Snapshot.ts` is deleted and nothing aliases it.
- **What leaves the claim open:**
  - `j-binder-mutations-7-orchestrator.log.txt` is not on disk (Glob `j-binder*7*` in the units directory).
  - Byte-for-byte restoration rests on the unit's statement.
  - The Orchestrator's replay of a sample, reproducing the recorded reddening, settles both.

## Findings outside the claims

None.

## Attacked and held

- **A nested `earlier.restore()` inside `started`'s token write:** the owner comparison in `#withdraw` leaves `started`'s entry in place, so the nested call's `finally` block changes nothing it does not own.
- **Adjacent behaviour that looks wrong and is correct (Button):** in the `aria-pressed` re-entry case, both events carry `pressed: false` for two toggles. Each detail is the state the host carries when the detail is taken, which is what the contract states.
- **Adjacent behaviour that looks wrong and is correct (overlap):** the overlap leaves `'earlier'`, a destroyed snapshot's own write, on the element. Destroying the two snapshots one after the other, the one that saved first going first, gives the same end state without any overlap, so the precedence rule does not cause it.

## Referrals

- **RF1 (to the Orchestrator): J-COLLAPSE carried obligation (b) has no carrier for the flip it may rule.**
  - (b) returns only a `types.ts` sentence patch.
  - A ruling for the snapshot that saved first would change code and prose J-COLLAPSE does not own:
    - `HostSnapshot.#publish`, which has no record of save order to compare;
    - the overlap proof in `HostSnapshot.test.ts`;
    - the class remark;
    - the guide sentence at § Ownership and restoration.
  - `HostSnapshot.ts` and those guide lines are off-limits in `units/j-collapse-brief.md` (Scope).
  - Name the unit that carries a flip, or scope (b) to the ruling alone with a named successor.
- **RF2 (to the Orchestrator): `units/j-collapse-brief.md` is stale against round 7.**
  - Its role line (line 7) says the base carries "J-BINDER rounds 1 to 6's mechanisms", and its Evidence names reports 2 to 6.
  - Carried obligation (c) cites round 7's landed text, and restates it more broadly than that text (see claim 3).
  - Reconcile both before dispatch.
- **RF3 (to the objective lane): claim 5.** The replay log is absent, and byte-for-byte restoration by `j-binder7-mutate.mjs` is unconfirmed.

## Bounds (wording; no change owed)

- `types.ts`, around line 280: the edited remark line runs far past the lines around it.
- "The value the restoration recorded" / "the value that restoration recorded" (`types.ts` around lines 259 and 281; guide around lines 233 and 550) names a restoration as the recorder. The class remark says the snapshot recorded ("the values it recorded").
- The guide's Button sentence says "whose own token write or `aria-pressed` write toggles it again". The reaction to the write toggles it, not the write itself.
- The overlap proof's title says "whichever saved it first" but does not say the oldest original is lost. The assertion records the loss.
- The instrument row name "a publish replaces an entry another restoration owns" keeps the restoration as owner. It is instrument-only.
- Carried from round 6: the guide does not state that listeners after a re-toggling listener, including ancestor listeners, receive the inner event before the outer one.

VERDICT: FAIL 3, 4, 5; outside the claims: none
