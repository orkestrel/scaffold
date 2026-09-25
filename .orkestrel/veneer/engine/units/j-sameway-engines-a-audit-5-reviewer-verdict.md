# J-SAMEWAY-ENGINES-A round 5 audit — the subjective lane (reviewer on Opus 5.5)

Retained verbatim from the lane's final message in its completion notification on 2026-09-25. The brief is `units/j-sameway-engines-a-audit-5-reviewer-brief.md`; the claims are `units/j-sameway-engines-a-audit-claims-5.md`.

---

**Lane: subjective (`reviewer` on Opus 5.5).** I read the round-5 diff and report, and the worktree copies under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-a/` that the brief says are `63a153b`. I could not run git to confirm that match. The line numbers below come from those copies.

Round 5 closes round 4's Defects A, B, and C and the prose-verb finding. It also adds three prose lines past the 100-column wrap, which the writer's report says it did not do.

## Per-claim verdicts

**1. The renames are complete: CONFIRMED.**
- **The declaration and the leaves.**
  - `HostWrite { target, value, priority }` is declared once, at `src/browser/types.ts:343-350`.
  - The only record and rewind leaves are `recordHostWrite(writes, target, next)` at `helpers.ts:950-966` and `rewindHostWrites(writes, owns)` at `helpers.ts:982-989`.
- **No old name remains.** I searched `src/**`, `tests/**`, and `guides/**` for `HostChange|recordHostChange|rewindHostChanges|\bprior\b`.
  - None of the three old names appears anywhere, so no alias remains.
  - The `prior` hits that remain are the unrelated `const prior = this.#change` locals (for example `Collapse.ts:186` and `Tab.ts:190`), which this round did not add.
  - The other hits are English "prior value" in test titles and comments (`helpers.test.ts:1601`, `helpers.test.ts:1617`).
- **`change` names the call alone in the four engines.** Each `#rewind` takes `(change, written: readonly HostWrite[])`: `Collapse.ts:521`, `Tab.ts:357`, `Toast.ts:331`, and `Carousel.ts:690`. The record array is always `written`, and no record is called a change.
- **Defect A: closed.** The field is `value` (`types.ts:347`). Its TSDoc copies `HostSnapshotRecord.value`'s wording (`types.ts:442`), with "the record read before the change's first write" in place of "the first save read". The record now reads `{ target, value, priority }` in both types.
- **Defect B: closed.** "Change" is the call and "write" is the record:
  - `HostWrite`'s summary (`types.ts:342`) reads "one piece of host state a change wrote".
  - The leaves' `@param writes` (`helpers.ts:936`, `helpers.ts:971`) reads "The records the change holds so far".
  - The collision at round 4's `helpers.ts:936` is gone.

**2. The contract is stated: CONFIRMED.**
- **Defect C: closed.**
  - `helpers.ts:934` reads "Returns a change's records with a target and the value and priority it reads appended, only when the coming write is the change's first to change that target."
  - The `recordHostWrite` row at `guides/veneer.md:72` states the same sentence (diff line 20).
  - `@returns` (`helpers.ts:939`) names both outcomes.
- **The token wording: closed.** `helpers.ts:909` reads "any string, which adds a token; undefined removes the target."

**3. The verb: CONFIRMED.**
- **Class remarks.** The returning step "writes each target … back" at `Collapse.ts` around line 68, `Tab.ts` around line 64, `Toast.ts:56-57`, and `Carousel.ts:71`. Carousel's "is restored as well" became "is written back as well" at `Carousel.ts:75`.
- **Guide return paragraphs.** The same verb appears at `guides/veneer.md:1113` (§ Collapse), `:1400` (§ Tab), `:1999` (§ Carousel), and `:2506` (§ Toast).
- **"Restore" is left to `HostSnapshot` alone.** I searched the four engines for `restor`. Every remaining hit names destruction or the snapshot, for example `Collapse.ts:452 this.#snapshot.restore()`, `Toast.ts:64 "Destruction … restores the host"`, and `Collapse.ts:519 "the snapshot's restoration stands"`.
- **Guide paragraphs.** In the four return paragraphs, "restoration" appears only for destruction (`:1125`, `:1128`, `:1411`, `:2010`, `:2516`).
- **Matches the amendment.** This matches E24's wording amendment at `scaffold/.orkestrel/veneer/engine/decisions.md:390`.

## Shape findings outside the claims

**Defect D: the round wraps three prose lines past 100 columns, and the report says otherwise.** The report (`j-sameway-engines-a-report-5.md:68`) says "Affected lines are rewrapped under 100 columns." These lines the round rewrote contradict that:
- **`guides/veneer.md:1407`** runs about 116 columns: "control's `active` token stays as the host moved it, and the sibling's blur is not returned. The step reads no door;". Its predecessor was about 97.
- **`guides/veneer.md:2003`** runs about 104 columns: "carried before the slide and the completion removes is written back as well. The carousel then shows the".
- **`src/browser/Toast.ts:59`** runs about 103 columns: " * more than once is recorded at its first changing write. For a toast those targets are its `fade` and". Before the rewrap it was about 98.

Every other line of these paragraphs wraps at 100, so these three break the guide's and the remarks' uniform shape.

**Repair:** Rewrap the § Tab paragraph from line 1406, the § Carousel paragraph from line 2002, and the `Toast` class remarks from line 58 to the 100-column measure the surrounding lines use. Change no words.

**Optional, not required: one fact takes two verbs across paragraphs.** The round changed § Carousel's "comes back as well" to "is written back as well", but § Collapse keeps "comes back with its priority" (`guides/veneer.md:1121`), with "go back as well" at `:1119`. Both are intransitive statements about the target's end state, not names for the step, so neither breaks claim 3. For one voice, use "goes back" in both paragraphs, or "is written back" in both.

**Considered and retained: `HostWrite.value`.**
- Someone could read `HostWrite.value` as the value the write gave, not the value it replaced.
- I retain it:
  - The field doc says "before the change's first write" (`types.ts:346`).
  - The write's own value is the separate `next` parameter (`helpers.ts:938`).
  - In the package, `value` consistently means what `readHostValue` reported, as `HostSnapshotRecord.value` does.
  - The destructure in `rewindHostWrites` (`helpers.ts:983-986`) reads naturally as writing that value back.
- The leaf's `writes` parameter beside the engines' `written` local is also acceptable. The parameter pairs with its type, and the local means the records so far.

## Referrals (to the objective lane)

- **The report's formatting claim is false on the evidence.** "Affected lines are rewrapped under 100 columns" (report line 68) is contradicted by the three lines in Defect D. `format:check` exits 0, so no gate catches this. The objective lane decides whether this counts against the report's other self-reported readings.
- **No gate result of claims 4 to 6 is evidenced here.** The N5 red reading, the mutation table, and the `test:guides` green run come from the writer's report only. From this lane they are UNRESOLVED.

VERDICT: PASS
