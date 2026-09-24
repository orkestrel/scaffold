# J-SNAPSHOT audit round 1 — the subjective lane's verdict (`reviewer`, Opus 5.5, agent ae75d20eb47b37bf0, retained verbatim 2026-09-24)

**Lane:** subjective, held by `reviewer` on Opus 5.5 (served as `claude-opus-5-5`), native, read-only, with no command run. Opus 5.5 also wrote this unit.

**Dispatch defects:**
- My brief lists "the delegate route as an API" as a lane focus. It also names `Delegate.ts`, `constants.ts`, `validators.ts`, `parsers.ts`, `helpers.ts`, and Bootstrap's sources as subject files. This unit has no delegate route and touches none of those files. The gate log also carries another unit's greps (`bs-wire-grep`, `plugin-rows`, `long-lines`). These fields came over from another unit's launch artifacts, so I ruled on neither.
- The folder holds `j-snapshot-audit-checker-verdict.md`. I did not open it, so my lane stays blind.

## Numbered verdicts

**1. CONFIRMED.**
- **Source check:** `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/snapshot/src/browser/HostSnapshot.ts` matches the claim at every named site:
  - the static `#presence`, around line 74;
  - `#hold`, around line 192: it returns on `#joined`, takes back from `#leaving`, or else calls `#join`;
  - `restore`, around lines 144–186: it moves `#joined` into `#leaving`, departs the `class` records after the token loop, departs the `style` records after the property loop, and departs the remainder in `finally`;
  - `#leave`, around line 309: it returns `!record.present` only for the last holder.
- **Attacks that failed:**
  - A save after a completed restore: the record was already forgotten, so `#join` reads `hasAttribute` again.
  - A save by a different snapshot during another snapshot's restoration: it joins while the restorer still holds the record, because departure runs after the token loop.
  - A save inside the `class` removal's reaction: the record is already deleted, so the save reads the attribute as absent.
  - A throwing token write: the class-departure loop is skipped and `finally` departs without removing. The claim's "unless a write throws" covers this.
- **Mutations I checked in the tests:**
  - Interleaving B asserts `readings` equal `[['show']]` and then that the attribute is absent. Deleting the record at the first leave makes the later `#leave` return false, so the attribute stays and the assertion fails.
  - The sequential case asserts `hasAttribute('class')` false after the second restore in the saved order. Under per-snapshot reading, the second snapshot records "present", so that assertion fails.
  - The take-back case asserts absence after the second `restore`. Dropping the take-back leaves no departure, so that assertion fails too.
- **Attack not closed:** "a holder that never restores" does not break the claim, because "no order of restorations" ranges over complete sets of holders. It does expose a partial-state change, carried as R1.

**2. CONFIRMED.**
- **Source check:**
  - `#published` accumulates, and `targets = this.#published`.
  - `#writeBack`, around line 252, returns on an absent entry, a foreign owner, or `written`. It marks `written` before the write and withdraws after it.
  - The innermost `finally` empties `#published`.
- **Attacks that failed:**
  - A nested restore from a different snapshot's reaction: `#published` belongs to one instance, so it is untouched.
  - A third level: each outer level's captured `targets` array is fully withdrawn by the inner call. Its `#withdraw` calls do nothing because of the owner check, and its `#depart` calls do nothing because of the membership check.
  - A nested write that throws: the nested `finally` withdraws the outer call's targets through the shared list. The exception stops at the reaction boundary, and the outer call resumes and writes nothing.
- **Mutations I checked:**
  - Dropping the hand-off leaves `data-second` at `'changed'` in "writes every target an interrupted restoration still owns…", so its assertion of `['two', null, null]` fails.
  - Dropping `written` makes the reaction recurse, which fails the assertion `writes.count` equals 1.
  - The Dropdown reproduction reads `data-popper-placement` as `'bottom'` against the expected `null`.
- The retained case this claim cites has a title the code contradicts. That is F2.

**3. CONFIRMED on the letter.**
- The `types.ts` remarks for `HostSnapshotInterface.restore` (around lines 343–371) state all of the following: the shared record read at the first save, the last-holder judgment, the re-entry hand-off, and the throwing withdrawal reaching an interrupted restoration.
- The class remarks say the same.
- In `guides/veneer.md`, § Ownership and restoration (around lines 822–850), the `#### Dropdown` sentence (around line 1592), and the Modal paragraph (around line 2045) replace the E13 bounded sentences.
- The `#### Tab` sentence (around line 1230) and the `#### Carousel` sentence (around line 1805) are unchanged.
- The `Modal.test.ts` case is retitled and asserts `body.hasAttribute('class')` false.
- `test:guides` reads 19 passed at exit 0 in `j-snapshot-gates.log.txt`.
- Whether any sentence promises a behaviour the code lacks is the objective lane's ruling. R1 is my evidence for it.

**4. UNRESOLVED.**
- **Open clause:** the Orchestrator's replay `j-snapshot-mutations-orchestrator.log.txt` is absent. Until it runs, the row readings rest only on the writer's log. The replay settles them.
- **What I confirmed:**
  - `j-snapshot-mutations.log.txt` carries `LANDED` at 6 failed of 30, the S1 and S2 rows labelled as the claim states, `GREEN?` at 30 and 35, matching digests, and `receipt: restored byte for byte`.
  - The gate log carries every listed gate at exit 0, with 648 passed in 22 files and policy at 109 passed and 1 skipped.
  - The status lists `guides/veneer.md`, `src/browser/HostSnapshot.ts`, `src/browser/types.ts`, `tests/src/browser/HostSnapshot.test.ts`, and `tests/src/browser/Modal.test.ts`, and nothing else.
  - The diff has no written `any`, `as` assertion, non-null `!`, `@ts-` directive, access modifier, default export, or nested function declaration.
  - Every added member type is readonly, and the file holds one class plus imports.
  - The report records that `prove` was not called.
- One possible implicit `any` is referred as R3.

**5. BROKEN.**
- **F1 — one concept carries two terms.** Location: `HostSnapshot.ts`, `#hold` (around line 192) and `#join` (around line 296); `#depart` (around line 211) and `#leave` (around line 309).
  - The class's own comments describe `#hold` as "Joins the presence record" and `#depart` as "Leaves one presence record". So hold/join and depart/leave name the same membership action at two layers.
  - The instance state already uses the static vocabulary (`#joined`, `#leaving`), and `restore` iterates `#leaving` but calls `#depart`.
  - `#join` and `#leave` each have one caller, and that caller always passes `this` as `owner`. The static layer adds no boundary.
  - Why it matters: it breaks the AGENTS.md laws "One concept, one term" and "No superfluous wrappers". A reader cannot tell from the names which method changes the shared record.
  - What right looks like: fold each static into its caller as instance methods `#join(element, attribute)` and `#leave(element, attribute): boolean`, which reach `HostSnapshot.#presence` directly. Delete `#hold`, `#depart`, and the `owner` parameter, and keep `#joined` and `#leaving`.
- **F3 — a term in the substitution table.** Temporal `once` appears where the rule requires `after`:
  - `types.ts`, `HostSnapshotInterface.restore` remarks (around line 353): "judges that removal, once its token or property writes are done".
  - `guides/veneer.md` § Ownership and restoration (around line 828): the same sentence.
  - The `HostSnapshot.test.ts` case title "removes a class or style attribute the first save found absent once every snapshot that saved on the element restores, in either order".
  - Why it matters: `writing.md` bans temporal `once`, and the policy sweep does not match it, so no gate catches these.
  - What right looks like: write "after its token or property writes are done" and "…found absent after every snapshot that saved on the element restores…".
  - The hits "once per element" in the `#hold` comment and "writes a target once" in a case title mean "one time", which the rule permits.
- **Clauses that held:** every member name is one word. `{ present, holders }` is a real reading plus a real set. `'class' | 'style'` holds external attribute values on an axis named `attribute`. The Modal title names what the case proves.

## Findings fitting no claim

**F2 — retained case titles describe the removed mechanism (E6: "no marker of an earlier shape").** All four cases are in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/snapshot/tests/src/browser/HostSnapshot.test.ts`:

| Case title | Location | Why the code contradicts it |
| --- | --- | --- |
| "keeps the outer restoration writing its own targets when a reaction re-enters restore on the same snapshot" | around line 200 | The nested restore writes every target and departs the class record. The outer restoration resumes and writes nothing (`restore` around lines 141–147, `#writeBack` around line 261). The report's own "Per obligation" section says the same. |
| "hands pending style presence to a property saved inside a restoration property write" | around line 774 | Presence is no longer published into `#pending` or handed over. The second snapshot joins `#presence`. |
| "preserves the order of a taken class presence recording when it competes in an overlap" | around line 803 | Presence records carry no stamp or order and are never taken, because `#classed`, `#styled`, and their stamps are deleted. |
| "preserves the order of a taken style presence recording when it competes in an overlap" | around line 837 | Same as the preceding row. |

- Why it matters: each case still binds a mutation row, so a reader following the title studies a mechanism that does not exist.
- What right looks like: retitle each case for what it proves. For example:
  - "writes every target and removes the class attribute when a reaction that saves a target during a token write restores the same snapshot";
  - "removes the style attribute after a snapshot saved inside a restoration's property write restores";
  - "removes the class attribute after three overlapping restorations, one saved inside another's token write, have all restored", with a matching title for the style case.

## Attacked and held

- **The Dropdown guide sentence against the source:** the nested call runs on the placement's own snapshot, reached through the abort listener at `Placement.ts` around line 89 and `destroy` around line 207, not on the dropdown's snapshot. The guide's "restores the same snapshot again" in § Ownership is accurate.
- **The Modal sentence "in whichever order they release":** the Modal case covers one order, and the generic sequential case covers both orders at the snapshot layer.
- **`written` as a name:** it is observed only inside a custom element's reaction, which runs after the DOM mutation, so it is accurate at the point it is read.
- **`#published`:** the name is accurate, and the innermost `finally` emptying it strands nothing, because every outer target is withdrawn by then.

## Referrals

**R1 — to the objective lane.** An interleaving I derived but did not run changes a partial state.
- Scenario:
  1. A trigger has no `class` attribute.
  2. `Button.toggle()` saves `active`, reading the attribute as absent.
  3. `Collapse` hides and saves `collapsed` on the trigger (`Collapse.ts` `#save`, around line 393), then shows, which removes `collapsed`.
  4. The button toggles off, which leaves `class=""`.
  5. `button.destroy()` runs while the collapse is still live.
- Outcome: on `main`, the button's restoration removed the attribute. Under this unit it stays `class=""` until the collapse is destroyed, because only the last holder judges.
- Question for the objective lane: does the "no order of restorations … leaves the attribute present and empty" sentence in `types.ts`, the class remarks, and the guide overclaim for this state? Settle it by running the sequence.
- Design proposal for the Orchestrator: by my reading, a shared first reading with every departure judging removal still closes interleavings A and B, the sequential case, and the `Button`-and-`Collapse` case, and it keeps the partial-state removal. E13 and the brief prescribed "judged once" by the last holder, so the unit conformed to its brief.

**R2 — to the objective lane.** A snapshot that saves on an element during its own restoration, before it departs, takes its holding back. If that snapshot never restores again, it pins the record, and no other snapshot on the element can ever remove the attribute. Please confirm whether shipped engines can reach this. Their methods read `aborted` before saving (for example, `Dropdown.#refused`).

**R3 — to the objective lane.** In `#join` (around line 297), `HostSnapshot.#presence.get(element) ?? new Map()` may widen `records` to `Map<any, any>` under subtype reduction. That would make `record` `any` and leave `#join`'s body unchecked. The landed `#publish` (around line 242) uses the same pattern. A type probe settles it.

**R4 — to the Orchestrator.** The `#### Tab` sentence (around line 1230) and the `#### Carousel` sentence (around line 1805) promise that "J-SNAPSHOT-SHARED" closes their bounds "after W2". E13's amendment folded that name into this unit's scope, and this unit does not close those bounds. The sentences need a named carrier, as the writer flagged. A campaign unit ID in the published guide also breaks its self-contained voice.

## Bounds (wording only, no finding)

- The class remarks' first paragraph states the removal without the last-holder qualifier, and "before any token was saved" is looser than "at the first save among the holders".
- The `#pending` comment says "whether its write has run", but the mark is set before the write runs.
- The `#publish` comment repeats the class remarks and keeps the older throw sentence, without "those of a restoration it interrupted".
- In the `#### Dropdown` paragraph, "that restoration" has no antecedent. That wording predates this unit.
- "judges" gives the software a human faculty (`writing.md` § Voice and actor).
- The instrument row "the lifetime read dropped" removes the `written` check, while the report calls the ownership check "the lifetime read".
- The Dropdown and `Button`-and-`Collapse` proofs sit in `HostSnapshot.test.ts` rather than in the consumer suites whose guide sentences they prove.
- `'class' | 'style'` and the `{ element, attribute }` shape are repeated inline. The objective lane can rule on this under `typescript.md`.

VERDICT: FAIL 4, 5; outside the claims: F2
