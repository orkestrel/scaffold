# J-SAMEWAY-ENGINES-A rounds 2 to 4 audit — the subjective lane (reviewer on Opus 5.5)

Retained verbatim from the lane's final message in its completion notification on 2026-09-25, because its transcript file was empty. The brief is `units/j-sameway-engines-a-audit-4-reviewer-brief.md`; the claims are `units/j-sameway-engines-a-audit-claims-4.md`.

---

**Lane held: subjective (Opus 5.5, `reviewer`).** I read the supplied diffs and status file, plus the worktree copies the brief says match `3f62d64`. I could not run git to confirm that match myself.

## Per-claim verdicts

**4. Surface parity: CONFIRMED.**
- `src/browser/index.ts:3` exports everything from `./helpers.js`, so `readHostPriority` reaches the barrel. `tests/src/browser/index.test.ts` lists it (round-4 diff, `index.test.ts` hunk, around line 208).
- I compared each Surface row with its TSDoc summary, and each pair is word-for-word identical:
  - `HostChange`: `types.ts:342` and guide line 64.
  - `readHostPriority`: `helpers.ts:891` and guide line 72.
  - `writeHostValue`: `helpers.ts:906` and guide line 73.
  - `recordHostChange`: `helpers.ts:934` and guide line 74.
  - `rewindHostChanges`: `helpers.ts:969` and guide line 75.
- The `test:guides` green run is the writer's report only, so that part of the evidence is UNRESOLVED. The text comparison stands without it.

**7. Greenfield and scope: CONFIRMED.**
- `j-sameway-engines-a-4-status.txt` lists the report's eight paths, and one of them is `guides/veneer.md`, the file the integration commit changed. No other path appears.
- `getPropertyPriority` appears once in `src/browser/`, at `helpers.ts:902`.
- `HostSnapshot.#writeBack` no longer takes a callback. It writes through `writeHostValue(target, record.value, record.priority)` at `HostSnapshot.ts:319`, and `save` reads through the leaves at `HostSnapshot.ts:113-114`.
- No alias remains.
- The `''` default at `helpers.ts:922` is the platform's own default priority for `CSSStyleDeclaration.setProperty`. It is also what `getPropertyPriority` returns for a property without a priority, and what `HostSnapshotRecord.priority` already carries (`types.ts:445`). It is not an invented sentinel.

**8. The leaves read as one family: FAIL.**
- **Names: confirmed.** All five leaves follow the `{verb}{Noun}` form (`helpers.ts:883, 900, 919, 950, 982`).
  - `readHostValue` turns the platform's two absence signals (`null` and `''`) into `undefined`. That is the absence law applied, not the coercion `names.md` reserves for `parse*`.
- **The optional `priority` parameter: confirmed as the right shape.**
  - An options object would add a type in `types.ts` for one scalar. Rejected.
  - A required parameter would make `Tab`'s token and attribute callers (`Tab.ts:254`, `Tab.ts:268`) pass a value the leaf ignores. Rejected.
  - A separate property writer would split on `category`, which is data under `names.md` § Split behavioral variants. It would also force `rewindHostChanges` and `HostSnapshot` to branch on category themselves. Rejected.
  - The optional parameter with a `''` default copies the platform's own `setProperty(name, value, priority = '')` signature. Accepted.
- **Defect A: `HostChange.prior` does not follow `HostSnapshotRecord`'s terms.**
  - `types.ts:347` names the pre-write value `prior`. `HostSnapshotRecord` names the same concept `value` (`types.ts:443`), and the leaves are `readHostValue` and `writeHostValue`.
  - The sibling field `priority` (`types.ts:349`) is also a pre-write fact but carries no `prior` qualifier. The record `{ target, prior, priority }` therefore gives one concept two terms inside one type.
  - **Repair:** rename the field to `value`, so the record reads `{ target, value, priority }` like `HostSnapshotRecord`. Update the destructuring at `helpers.ts:963-965` and `helpers.ts:983-986`, and the `toEqual` records in `tests/src/browser/helpers.test.ts`.
- **Defect B: "change" names two concepts.**
  - In the engines and in the guide, a *change* is the `show`, `hide`, or `slide` call. Each engine's private `#rewind` method takes `(change, written: readonly HostChange[])` (`Collapse.ts:521`, `Toast.ts:331`, `Tab.ts:361`, `Carousel.ts:690`), so a parameter named `change` sits beside an array of `HostChange` records and is not one of them.
  - The leaf's own TSDoc shows the collision in one line. `helpers.ts:936` reads "`changes` - The records the change holds so far": `changes` means the records, and "the change" means the call.
  - Every engine already names the array `written`, and `HostChange`'s own summary calls the item "host state a change wrote".
  - **Repair:** rename the type to `HostWrite`, and the leaves to `recordHostWrite` and `rewindHostWrites` (with the `writes` parameter). Update all four engines, the tests, `index.test.ts`, and the guide rows. The cost is one mechanical rename across those files. The result is that "change" keeps one meaning: the call.

**9. No superfluous wrapper: CONFIRMED.**
- `readHostPriority` (`helpers.ts:900-903`) is not a rename of `getPropertyPriority`. It returns `''` for an attribute or a class token without reading the style, so an attribute or token whose name is also a CSS property name (for example `width`) never picks up that inline property's priority. It replaces a branch that three callers would otherwise repeat.
- `readHostValue` turns three platform reads into one absence form.
- `writeHostValue` dispatches on category and removes on `undefined`.
- `recordHostChange` adds the first-changing-write invariant, skips a write that changes nothing, and returns a copy instead of editing its input.
- `rewindHostChanges` adds reverse order, the `owns` check before each write, and a skip for a target already at its recorded value.
- The referral that follows applies: no test pins the branch this ruling rests on.

**10. TSDoc and § Surface summaries: FAIL.**
- **Defect C: the `recordHostChange` summary misstates the contract.** `helpers.ts:934` and guide line 74 say the leaf returns the records "with the target … appended" whenever a write is about to change it.
  - The leaf returns the records unchanged when the target is already recorded (`helpers.ts:962`). That is its core invariant, and E24 fixes it.
  - The Surface row is the only statement a guide reader sees, so a reader of that row expects a second write to append a second record.
  - **Repair:** state the condition in the one sentence, in both places. For example: "Returns a change's records with a target and the value and priority it reads appended, when the coming write is the change's first to change that target." Use `HostWrite`'s wording if Defect B lands.
- **Confirmed:** the summaries for `readHostValue`, `readHostPriority`, `writeHostValue`, `rewindHostChanges`, and `HostChange` each state their contract plainly. The early stop in `rewindHostChanges` is visible in its `owns` parameter and stated in its remarks.
- **Optional, not a required change:** at `helpers.ts:909`, "any string for a token the element carries" reads as if the token must already be present. "Any string adds the token" says what the code does.

## Shape defects outside the claims

- **The rewinding step and the snapshot share the word "restore".**
  - The guide's § Collapse return paragraph (`guides/veneer.md`, around line 1113) says "The step restores each target…". A few lines later it says "the snapshot's restoration stands", which refers to `HostSnapshot.restore`, a different mechanism.
  - The same "restores" wording appears in the class TSDoc at `Collapse.ts:68` and in the § Tab, § Carousel, and § Toast paragraphs.
  - The leaf is named `rewindHostChanges`, and its TSDoc says "Writes … back", so the prose uses a third verb for the same step.
  - The wording comes from E24's amendment ("The returning step restores prior values", `decisions.md:291`), so the Orchestrator owns whether to amend it.
  - **Repair:** in those prose paragraphs, say "writes each target the call changed back to…" and keep "restore" for `HostSnapshot` alone.

## Referrals (to the objective lane)

- **No test pins `readHostPriority`'s category branch.** The case in `tests/src/browser/helpers.test.ts` (around line 1452) reads the attribute `role` and the token `show`. Neither name is a CSS property, so `getPropertyPriority` returns `''` for both whether or not the branch exists.
  - Mutating `helpers.ts:902` to `return element.style.getPropertyPriority(name)` passes that case, and the mutation log has no row for it: `P2-read` replaces the whole return with `''`.
  - Smallest witness: an element with inline `width: 10px !important` and a `width` attribute. `readHostPriority({ category: 'attribute', element, name: 'width' })` must return `''`.
  - The objective lane decides whether this gap is a test-sufficiency defect.

VERDICT: FAIL 8 10
