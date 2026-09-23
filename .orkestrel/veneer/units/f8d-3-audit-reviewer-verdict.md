# F8d IMPORTANCE-LONGHANDS, round 3 (the prose and guard micro-round) — `reviewer` on Opus 5.5, subjective lane

Native subagent, clean context, read on the tree of `/home/user/veneer-f8d` on 2026-09-23. The verdict text is the lane's handback verbatim.

F8d IMPORTANCE-LONGHANDS round 3: `reviewer` verdict. I held the subjective lane (comment and TSDoc voice, guide voice, the guard's shape and placement) on Opus 5.5 in a clean context. I read these files and ran nothing:
- the claims: `/home/user/scaffold/.orkestrel/veneer/units/f8d-3-audit-claims.md`
- the diffs: `f8d-3.diff` and `f8d-2.diff`
- the status: `f8d-3-status.txt`
- the brief and report: `f8d-brief-3.md` and `f8d-report-3.md`
- the tree at `/home/user/veneer-f8d`

Claim 5 fails on a single 101-column line inside the header comment that edit 7 changed. Every other claim held.

## Numbered verdicts

1. **CONFIRMED.** The delta from `f8d-2.diff` to `f8d-3.diff` is exactly edits 1 to 9 of `f8d-brief-3.md` § Edits.
   - `guides/veneer.md:412` is edit 9.
   - `tests/service/tailwind/consumer.test.ts` carries edit 1 at :175-180, edit 2 at :184-185, edit 3 at :202-205, and edit 4 at :227-230.
   - `tests/setupServer.test.ts` carries edit 5 at :557-559, with the freeze lines removed from the case at :2417, and edit 6 at :2454-2456.
   - `tests/setupServer.ts` carries edit 7 at :10 and edit 8 at :1721-1723.
   - Attack that failed: I compared every other hunk of the two diffs. `preflight.test.ts`, `setupService.ts` (blob `7a49b49`), and `setupService.test.ts` (blob `fac3847`) are identical to round 2. So are `SHARED_LONGHANDS`, `collectRuleLonghands`, and `collectImportantNames`.
   - The status lists only the seven files the three rounds own. A Glob of `tmp/probe/**` under `/home/user/veneer-f8d` returned nothing.
   - Observation, not a finding: the report says "no rewrap was needed", but edits 1, 4, and 8 were rewrapped. The brief permits those rewraps, and they change no other words.

2. **CONFIRMED.** Mutation: replace `longhands.get(name) ?? []` with `[]` at `consumer.test.ts:195`. The assertions distinguish it.
   - Under the mutation, `properties` is `[]`. `stage.read` at `tests/setupService.ts:417-432` keys each map by `query.properties ?? …`, and `[]` is not nullish, so every snapshot is an empty map.
   - The guard at `:204-205` then yields `['grid-column-start', 'grid-column-end']` and fails.
   - Nothing reddens first. `declared` (:185) and `branch` (:190) do not depend on `properties`. `not.toEqual([])` at :206 passes on a list of empty maps, and the paired comparison at :214-223 passes vacuously.
   - With the correct code, each map is keyed by exactly `['grid-column-start', 'grid-column-end']`, so the guard holds.
   - Adjacent reading that looks like a defect and is correct: the guard reads `declared`, not `properties`. A guard over `properties` would itself go vacuous under this mutation, so `declared`, pinned at :185 and independent of the mutated line, is what binds.
   - Settling command: `npm run test:service -- tests/service/tailwind/consumer.test.ts` with the plant applied. Only the writer ran it; its recorded failure at :205:67 matches the tree.

3. **CONFIRMED.** Mutation: replace `properties.every((property) => important.includes(property))` with `important.length > 0` at `tests/setupServer.ts:1792`. The assertions distinguish it.
   - The partial plant makes only `grid-column-start` important. The mutant reports `col-1`; the correct code does not, because `grid-column-end` is uncovered. So `expect(important).not.toContain('col-1')` at `consumer.test.ts:237` reddens.
   - No other consumer case moves. The unplanted built cascade has no important shared name, and the branch case still reports `col-1`.

4. **CONFIRMED.** The freeze assertions sit at the end of the `server setup` inventory case, after the `Object.keys(setup)` list (`tests/setupServer.test.ts:557-559`).
   - A grep for `isFrozen` under `tests/` finds no other `SHARED_LONGHANDS` site.
   - This matches the house pattern at `tests/setupService.test.ts:45-48` and the frozen-table cases in `tests/setupStyles.test.ts`, for example :1043-1044.
   - The behaviour case at :2417 now opens on its behavioural assertion.

5. **BROKEN**, on the column criterion only.
   - **Where:** `tests/setupServer.ts:9`. The line is 101 columns: `// \`tests/setupService.ts\`, which reads the built cascade through \`SheetReader\` and returns the rules`. It sits in the header sentence that edit 7 changed, and `f8d-brief-3.md` § Edits requires "Rewrap a comment … you change so no line passes 100 columns". The report's "each changed line stayed under 100 columns" covers only line 10.
   - **Why it matters:** the claim and the brief both set this bar, and the header comment is now edited but not rewrapped.
   - **What right looks like:** rewrap lines 9-10 so they read:
     ```
     // `tests/setupService.ts`, which reads the built cascade through `SheetReader` and returns the
     // rules its stage expands as `LonghandRule` values. A helper added here runs under every one of
     // them.
     ```
   - The same class appears at two other sites in the diff under audit. These are round-2 writes outside this round's edits, and one fix unit can carry them with line 9:
     - `tests/setupServer.ts:517`: the `SHARED_LONGHANDS` remark is 101 columns. Rewrap to ` * the \`caption-top\` entry none, so a proof reading it meets partial cover, full cover, and the` followed by ` * empty list that must never count as covered.`
     - `tests/setupServer.ts:1728`: the `LonghandRule` `properties` member doc is 101 columns at the `.oxfmtrc.json` `tabWidth` of 2. Shorten it to `/** Holds each longhand property name the rule declares, in Chromium order when expanded. */`, or move it to a multi-line block.
   - **Every other criterion holds on the round's changed text:**
     - Every token the claim names carries its noun: the `grid-column-start` and `grid-column-end` longhands (`consumer.test.ts:179`, :227-229; `guides/veneer.md:412-413`), the `col-1` rule and class, the `table` name (`setupServer.test.ts:2454-2456`), `LonghandRule` values (`setupServer.ts:10`), the `tests/setupService.ts` module (:1721), and planted `!important` declarations (`guides/veneer.md:412`).
     - I found no banned term and no count.
     - No other sentence changed.
     - `!important` used as a bare noun (`consumer.test.ts:175`) matches the house's base text (`guides/veneer.md:152`, :161, :389; `setupServer.ts:1434`), so I did not rule it a defect.
     - The bare `tests/setupService.ts` and `SheetReader` tokens in the header predate F8d, so they fall outside this claim.
   - The guide paragraph (`guides/veneer.md:402-417`) matches the shipped cases: the branch plant, the partial plant, and the equality.

6. **CONFIRMED on the source reading. The `npm run check` exit code is left to the objective lane, which the claim assigns it to.**
   - Across `f8d-3.diff` I found no `any`, no `as`, no non-null `!` (the `!` in `!snapshot.has(property)` is logical negation), and no suppression.
   - The guard's `filter` callback is passed directly. The `requireValue` arguments are expressions.
   - `LonghandRule` members are readonly, and no nested function declaration was added.

## Findings outside the claims

None.

## Attacked and held

- **Guard placement.** Could the guard sit after the non-empty check? With an empty `standalone`, the loop at :204 does nothing and :206 catches the gap. With empty maps, :206 passes and the guard catches them. In either order, the pair covers both vacuous shapes.
- **Guard across future branch names.** If a release ships a second important shared name, every snapshot is read with the full `properties` union, so each map still carries `declared`. The guard does not break on a wider branch.
- **Freeze move and voice.** The inventory case title (`setupServer.test.ts:473`) does not mention freezing. Neither does the house precedent at `setupService.test.ts:29`, so the placement is consistent.

## Referrals

- **To the objective lane:** report the `npm run check` exit code for claim 6.
- **To the Orchestrator:**
  - Plants A and B (claims 2 and 3) and the unplanted consumer run rest on runs only the writer took. The objective lane's sandbox runs no Vitest, so the landing chain's `npm run test:service -- tests/service/tailwind/consumer.test.ts` settles the green.
  - Claim 5 is the prose seam's third round, so the seam budget in `.claude/rules/quality.md` § Rounds and verdicts applies. The column bar is not a house gate: oxfmt does not reflow comments, and base comments exceed it, for example `setupServer.ts:351`, :426, :701, and :2699. Rule whether this closes as a mechanical rewrap, with the exact text given under claim 5, or whether the column criterion is dropped from the prose claim.

VERDICT: FAIL 5; outside the claims: none
