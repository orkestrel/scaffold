# F8d IMPORTANCE-LONGHANDS, round 2 (the fix round) — `reviewer` on Opus 5.5, subjective lane

Native subagent, clean context, read on the tree of `/home/user/veneer-f8d` on 2026-09-23. The verdict text is the lane's handback verbatim.

# F8d fix round: `reviewer` on Opus 5.5, subjective lane

**Lane:** subjective (API shape, naming, placement, guide voice, TSDoc and comment voice). I ran as a native subagent in a clean context, read-only. I ran nothing and edited nothing.

**Outcome:** the round fails.
- Claim 5 is BROKEN. Four bare CSS-property tokens sit in a changed consumer comment, and further bare tokens sit in other changed comments.
- Claims 6 and 7 are UNRESOLVED. Their only run evidence is the writer's report, and this lane cannot run commands.
- Claims 1 to 4 hold.

**Dispatch defect:** the lane brief (`f8d-fix-audit-reviewer-brief.md:8-9`) calls `f8d.diff` "the whole diff against `cdf7f55`" and also "the round-1 diff". The claims file names `f8d-2.diff` as the whole diff. I ruled on `/home/user/scaffold/.orkestrel/veneer/units/f8d-2.diff`, which matches the worktree and `f8d-2-status.txt`.

**Line numbers:** they refer to the worktree `/home/user/veneer-f8d` and are approximate. Locate each site by the symbol or text named.

## Numbered verdicts

**1. CONFIRMED.**
- `LonghandRule` is declared once, at `tests/setupServer.ts:1725-1732`. Its members carry the ordering facts: "as Chromium serializes it for an expanded rule", "in Chromium order for an expanded rule", and "in the same order".
- `tests/setupService.ts:16` imports the type. `expand` returns `Promise<readonly LonghandRule[]>` (line 451).
- `tests/service/tailwind/preflight.test.ts:1,36` imports and uses it from `../../setupServer.js`.
- A search for `StageRule` over the worktree, excluding `node_modules`, `dist`, and `tmp`, returns nothing.
- **Import direction:** `setupService` imports from `setupServer` at lines 16 and 25. The imports of `tests/setupServer.ts` (lines 12-41) never name `setupService`. So `setupService` → `setupServer` stays the only direction.
- **Name:** `LonghandRule` describes the shape without reference to the stage, and the hand-built rules in the unit tests fit it.

**2. CONFIRMED.**
- `SHARED_LONGHANDS` (`tests/setupServer.ts:511-524`) is a frozen record of frozen arrays, with TSDoc. It sits after `LEDGER_SHIPPED`, in the module's constant block.
- It is inventoried at `tests/setupServer.test.ts:492`, and both `collectImportantNames` cases read `new Map(Object.entries(SHARED_LONGHANDS))` (lines 2438 and 2468).
- **Mutation named:** drop either `Object.freeze` call. The assertions at lines 2415-2417 check the record and each of its values, so each variant reddens.
- **The record-over-Map decision stands.** `Object.freeze` on a `Map` leaves `set` working. The file already uses a frozen `Readonly<Record<…>>` for `LAYER_COMPONENTS` (line 382). The conversion at the two call sites is a one-expression translation, not a pattern that needs centralizing.
- **Observation, not a break:** the freeze assertions sit inside the behaviour case "reports a name whose importance covers…", and its title does not name them. The house pattern keeps freeze assertions in the export-inventory case: see `tests/setupService.test.ts:46-48`, and `tests/setupStyles.test.ts:179`, whose title names "the frozen case tables". The report says the placement "follows the pattern `tests/setupStyles.test.ts` uses", and that file shows otherwise. If a fix round runs anyway, move lines 2415-2417 into the `server setup` inventory case at around line 473.

**3. CONFIRMED.** I settled this by reading the assertion, as the claim directs.
- **Mutation named:** `rule.properties` in place of `rule.important` at `tests/setupServer.ts:1791`.
- **Under the mutant:** the "keeps a name out…" case (`tests/setupServer.test.ts:2444-2471`) reads `table` with the union `[color, border-top-width]`. That union covers `table`'s required longhand `border-top-width`, so the result is `['table']` and `toEqual([])` fails. This matches the writer's recorded `expected [ 'table' ] to deeply equal []`.
- **Under the correct code:** the importance union for `table` is `[color]`, so `table` stays out.
- **Round 1:** without the control rule at line 2456, the mutant union for `table` was `[color]`, so the case stayed green.
- The "reports a name…" case returns `['col-1', 'table']` under both the mutant and the correct code. So the control rule is the only thing that distinguishes the mutant, as claimed.
- **Second mutation named:** remove the `properties.length > 0` guard. The `caption-top` rule then covers vacuously, the result is `['caption-top']`, and the same case reddens.

**4. CONFIRMED, with a referral.**
- The `arrayContaining` line is gone from the branch case (`tests/service/tailwind/consumer.test.ts:174-219`).
- **Mutations named against the helpers:**
  - `collectRuleLonghands` dropping `grid-column-end` for `col-1` reddens line 184.
  - `collectImportantNames` failing to report `col-1` reddens line 189.
- The removed line added nothing for either mutation, so lines 184 and 189 carry its claim.
- The mutation that is not distinguished is test-local. See the referral later in this verdict.

**5. BROKEN.**
- **What holds in § Tailwind:**
  - The rule is stated once, at `guides/veneer.md:388-391`.
  - The equality sentence (lines 406-408) and the branch sentence (line 411) refer back to it.
  - "two sheets", "both longhands", the ordinal plant, and the bare `col-1` token are gone. Lines 412 and 416-417 name the longhands and "the `col-1` class".
  - Every changed guide line measures at or under 100 columns. I counted lines 406-417.
  - No banned term appears, and no count of a growable set appears.
  - The writer's reference sentences stand. The branch sentence reads cleanly. The equality sentence refers rather than restates, as the claim requires. It repeats "line" three times in one clause, which is a readability note, not a break.
- **The break:** the claim requires a noun after each code token in every changed sentence, and several changed comments leave tokens bare.
  - `tests/service/tailwind/consumer.test.ts:222-223` has four bare tokens: "declares `grid-column-start` and `grid-column-end`", "makes `grid-column-start` important", and "would still win `grid-column-end`:". Round 1 ruled a bare `col-1` BROKEN on the same standard.
  - Line 178-179 ("importance on `grid-column-start` and `grid-column-end`, the longhands…") leaves both tokens bare before the appositive.
  - `tests/setupServer.test.ts:2454` writes "every longhand `table` has to cover". The same sentence also has two problems beyond the claim:
    - "all of them" describes a single-member list.
    - "reports it" could attach to the rule rather than the name.
  - `tests/setupServer.ts:10` ends the header sentence "as `LonghandRule`".
- **Origin:** the wording at lines 222-223 and 178-179 was prescribed by my own round-1 verdict and by `f8d-brief-2.md:81-84`. The writer followed the brief, so this is a brief-carried defect, not a writer deviation.
- **Why it matters:** these are the sites the round rewrote to fix token and count voice. `guides/veneer.md:380` ("the `grid-column-start` property of the `.col-1` element") shows the house form.
- **What I did not rule:** the `{@link X}` tag used as a noun and "with `!important`" match established house usage (`tests/setupStyles.ts:139`, and the unchanged `guides/veneer.md:389`).
- **Required changes:**
  - `consumer.test.ts:222-225`: "Tailwind's `col-1` rule declares the `grid-column-start` and `grid-column-end` longhands, and the plant makes the `grid-column-start` longhand important, so Tailwind's rule would still win the `grid-column-end` longhand: the name is not important under the rule, and the equality still needs it on the exclusion line."
  - `consumer.test.ts:178-179`: "…so the plant is what drives the branch: importance on the `grid-column-start` and `grid-column-end` longhands Tailwind's `col-1` rule declares, in a layer of its own…"
  - `setupServer.test.ts:2454-2455`: "A rule declaring every longhand the `table` name has to cover, each normally, so a reading that counts declared longhands rather than important ones reports the `table` name."
  - `setupServer.ts:10`: "…returns the rules its stage expands as `LonghandRule` values."
  - Rewrap each comment at or under 100 columns.
- **Secondary accuracy fix in the same guide sentence:** `guides/veneer.md:412` says "a planted `!important` declaration" for a plant that writes two declarations (`consumer.test.ts:182`). Write "planted `!important` declarations on the…". The line stays under 100 columns.

**6. UNRESOLVED.** The only run evidence is the writer's report. My reading of both proofs follows.
- **`expand` proof** (`tests/setupService.test.ts`, the "expands each rule…" case):
  - Mutation: `important = properties`. Distinguished: `rule?.important` must equal `[]`, and the `flagged` object is pinned with `toEqual`.
  - Mutation: `important = []`. Distinguished: the pinned `flagged.important` fails.
  - The Chromium property order in the pinned `properties` array is a measurement that only a run settles.
- **Consumer proof:**
  - Mutation: the per-name plant `important.length > 0` at `tests/setupServer.ts:1793`. By reading, the partial case's `not.toContain('col-1')` (`consumer.test.ts:232`) reddens.
  - The equality case stays green under the plant because no shipped name is important. This matches the writer's recorded "1 failed | 7 passed".
- **Settling commands, run from `/home/user/veneer-f8d`:**
  1. `npm run build:src && npm run build:src:styles`
  2. `npm run test:setup -- tests/setupService.test.ts -t "expands each rule"`
  3. `npm run test:service -- tests/service/tailwind/consumer.test.ts`, once with the plant at `tests/setupServer.ts:1793` for the red, and once after the exact reverse edit for the green.

**7. UNRESOLVED.**
- **Held by reading across `f8d-2.diff`:**
  - No `any`, no `as` assertion, no non-null `!`, and no suppression. Each `!` is logical negation or sits inside a CSS string.
  - The only functions are callbacks passed directly (`flatMap`, `filter`, `every`, `find`, the `evaluate` body).
  - Every `LonghandRule` member is readonly, and the helpers return readonly collections.
  - `f8d-2-status.txt` lists the seven owned files and nothing else.
  - A Glob for `tmp/probe/**` finds nothing.
- **Unsettled:** the claim asks for `npm run check` and its exit code. That run belongs to the objective lane, so this lane has no exit code to report.

## Findings outside the claims

None to the BROKEN standard.

## Referrals

**To the objective lane (claim 4, test sufficiency).**
- **The mutation:** replace `longhands.get(name) ?? []` with `[]` at `consumer.test.ts:194`.
- **Why it survives:** `stage.read` then reads only the named properties (`tests/setupService.ts:425-427`), so every snapshot is an empty `Map`. The remaining assertions all still pass:
  - `standalone` is `[Map{}]`, so line 201 passes.
  - Line 208 passes.
  - The comparison at lines 209-218 is empty.
- **What this means:** the branch case's reading can go vacuous with nothing reddening.
- **History:** before F8d, the case carried `expect(properties).toContain('grid-column-start')`. The round-1 referral that removed the `arrayContaining` line was mine, and it held only for a correct line 194.
- **Question to rule:** does the case need a guard on what was read? For example, assert that each `standalone` snapshot has both the `grid-column-start` and the `grid-column-end` keys.

VERDICT: FAIL 5, 6, 7; outside the claims: none
