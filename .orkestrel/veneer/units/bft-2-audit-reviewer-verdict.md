# `reviewer` verdict — B-FORMS-CLOSE-TABLES (`bft`), round 2, subjective lane (Opus 5.5, agent a34b475a8df5b24e3)

Retained verbatim from the lane's returned message.

---

Lane held: subjective (`reviewer` on Opus 5.5, native, clean context). This lane ran nothing. Every ruling rests on reading the diff, the status, and the worktree `/home/user/veneer-bft`.

## Numbered verdicts

1. **CONFIRMED.**
   - `tests/conformance.test.ts` carries only round 1's change. Its blob is `a466fa0..27454a7` in both `/home/user/scaffold/.orkestrel/veneer/units/bft.diff:2` and `bft-2.diff:2`.
   - The other six files have different post-images in the two diffs (`bft.diff:54,109,156,376,631,665` against `bft-2.diff:54,180,280,546,801,836`), so round 2 touched those six.
   - `bft-2.diff` has no hunk at the floating case's key expressions (`/home/user/veneer-bft/tests/setupStyles.test.ts:2717,2723`) and none on `FORM_FLOATING_CASES`.
   - `bft-2-status.txt:1-7` lists the same seven files as `bft-status.txt:1-7`, and nothing else.
   - Attack: look for an eighth path in the status, or a round-2 change to the conformance blob. Both failed.

2. **CONFIRMED.** Each of the five sentences matches the text in criterion 1 of `b-forms-close-tables-brief-2.md`:
   - `/home/user/veneer-bft/tests/setupStyles.ts:3621-3622`
   - `/home/user/veneer-bft/tests/src/styles/components/form-range.test.ts:109-111`
   - `/home/user/veneer-bft/tests/setupServer.ts:1395`
   - `/home/user/veneer-bft/tests/setupServer.test.ts:2094-2095`
   - `/home/user/veneer-bft/tests/src/styles/components/input-group.test.ts:252-254`. The following sentence at `:254-255` is unchanged from round 1 (`bft.diff`, floating hunk).

   Attack: a word changed beyond rewrapping. It failed.

3. **CONFIRMED.** The summary at `setupServer.ts:1392-1393` and the start of the `@returns` tag at `:1396-1397` match the brief. Each TSDoc sentence holds against the body at `:1409-1426`:
   - The key is `renderRuleKey(block)` (`:1414`). A `Map` keeps the position of the first insertion when a later `set` writes an existing key, which makes "in the order each key is first written" true.
   - Blocks sharing a key reuse one inner map (`:1415-1418`).
   - A later declaration replaces an earlier one through `properties.set` (`:1417`).
   - Empty lists are filtered out (`:1423`), so a rule that writes no `var()` returns `{}`.

   Attack: find a sentence that goes false when blocks merge, or when a later literal overwrites an earlier read. Both held, and the proof at `setupServer.test.ts:2093,2096` pins both cases.

4. **CONFIRMED.**
   - The signature is at `setupServer.ts:1387`. The `@remarks` at `:1376-1377` names the key as the lookup contract of `collectDeclarationReads`.
   - These sites route through the helper:
     - `collectDeclarationReads` (`:1414`);
     - the range case's `keyed`, `cased`, and loop key (`setupStyles.test.ts:1803,1804,1828`);
     - the text-control case's `keyed`, `cased`, and loop key (`:1894,1895,1926`).
   - A search for `condition === undefined ?` over `tests/` finds `setupServer.ts:1388`, `setupStyles.test.ts:2717,2723`, and `tests/src/styles/components/form-control.test.ts:43`. The last one builds a test label with `under ${MOTION}`, not the key, and that file is off-limits.
   - The exports case lists the helper (`setupServer.test.ts:550`).
   - Mutation: render the conditioned key without the space. The expectations at `:2040` and `:2047` both redden, so the assertions distinguish the mutation. A truthiness test (`rule.condition ?`) reddens at `:2050`.
   - Unknown, the empty-condition assertion: it belongs. `AGENTS.md` makes `undefined` the only absence, and the type admits `''`. `:2050` is the only assertion that tells `=== undefined` apart from a truthiness test, and `tests.md` asks for boundary values.

5. **CONFIRMED.** The filter's structure and the distinguishing power of its assertions are confirmed by reading. The writer's "1 failed" count rests only on the writer's report.
   - `filterComparableBlocks` (`setupServer.ts:1444-1454`) combines the prefix test with the normalized condition-set test. The range case routes through it (`setupStyles.test.ts:1820-1822`).
   - Its proof (`setupServer.test.ts:2053-2070`) matches a rule in the release notation (`max-width: 575.98px`) with a block in the range notation (`width < 576px`).
   - The planted case (`setupStyles.test.ts:1841-1871`) does what the claim states. `:1855-1857` is the control showing that the plant reached the reader.
   - Mutation: delete `conditions.has(…)`. The forced-colors key then enters the sorted keys at `:1858-1862`, and both the unit proof at `setupServer.test.ts:2062` and the planted case redden. Assertions distinguish.
   - Mutation: drop conditioned blocks wholesale. The twin keys then vanish, and `:1862` and `:1870` both redden. Assertions distinguish.
   - Mutation: drop normalization on either side. `'.range @media (width < 576px)'` disappears at `:2065`. Assertions distinguish.
   - Unknown, the `startsWith` prefix: it is a recorded limit, not a defect. Any extra block it admits, such as `.form-range-wide` under a recorded condition, adds a key the inventory lacks. The key equality at `setupStyles.test.ts:1823` then reddens, so over-admission fails loudly. The opposite direction is referral b.

6. **BROKEN.** The following text, added in round 2, breaks `writing.md` or `AGENTS.md` § Writing:
   - **a.** `/home/user/veneer-bft/tests/setupServer.test.ts:2041-2042`, "A block nested under two at-rules carries both in its condition".
     - Wrong: this states a count of a set that can grow. Round 1 faulted "Two rules under one key merge" (item 7d) for the same reason, and the reader's behaviour holds for any depth.
     - Right: "A block nested under more than one at-rule carries each of them in its condition, and the key keeps them as the reader joined them."
   - **b.** `/home/user/veneer-bft/tests/setupServer.test.ts:2060-2061`, "The block under the release's width notation is kept, …".
     - Wrong: this is false of the fixture. The kept block is written `@media (width < 576px)` (`:2056`), which is the range notation. The release notation (`max-width: 575.98px`) is on the rule (`:2059`), as the title at `:2100` also shows. A reader who takes the comment at its word misreads which side the proof normalizes.
     - Right: "A rule records the width condition in the release's notation, so the block written in the range notation is kept. The block under a condition no rule records is left out, and a block outside the prefix is left out under any condition."
   - **c.** `/home/user/veneer-bft/tests/setupServer.ts:1435`, "Each block whose selector opens with `prefix` and …".
     - Wrong: the code token has no noun after it. Round 1 faulted "`condition` names" (item 7a) for the same reason. A parameter name is not a CSS token, so the standing exception does not cover it.
     - Right: "Each block whose selector opens with the prefix and whose condition, …". This is the plain-word form that `:1473` uses for its `token` parameter.

   Everything else round 2 adds holds: no banned term, no other count, and `undefined` and `var()` stand as value tokens, as round 1 accepted. The `@example` at `:1381-1385` uses the package's real selector rather than fictional data. It is descriptive, carries no personal data, and matches the house `@example` practice (`setupStyles.ts:627`, `setup.ts:261`). This lane holds that it satisfies the intent of the `writing.md` rule.

7. **UNRESOLVED.** By reading, the round-2 delta has no `any`, no `as`, no `!`, and no suppression. Every function literal is a callback passed directly (`setupServer.ts:1449-1453`). Parameters and returns are readonly, and `CascadeBlock` members are readonly (`:123-128`). A search of the `@orkestrel/test` and `@orkestrel/contract` declarations for `render*` and `filter*` functions returns nothing. The `npm run check` exit code rests only on the writer's report. The objective lane's run settles it.

## Findings outside the claims

None to the BROKEN standard.

## Attacked and held

- **Names.** `render*` means text from a value that is not a finding, and `filter*` means an ordered, non-mutating selection (`/home/user/scaffold/.claude/rules/names.md:103-104`). Both helpers fit. They sit beside `readCascadeBlocks` and `collectDeclarationReads`, which is where the cascade-reading family lives. `setupStyles.ts` would have to import the Node-side `CascadeBlock` type.
- **Test vocabulary.** "compared keys" in the planted case's title and "the comparison" in the comment at `setupStyles.test.ts:1818` reuse the helper's own word, "compared", from `setupServer.ts:1429`. The planted case is named for what it proves.
- **The key format stated twice.** The `@returns` tag of `collectDeclarationReads` (`setupServer.ts:1396-1398`) restates the format that `renderRuleKey` owns. Criterion 2 of the brief fixes that text, and it is true, so no change is required.
- **The `filterComparableBlocks` remark.** "A block under a recorded condition stays in whether or not a rule records its selector" (`setupServer.ts:1440-1442`) reads inside the prefix bound its `@returns` tag sets. It holds.
- **The input-group lookup.** It looks up by selector alone (`setupStyles.test.ts:2529` onward). That is the recorded decision in `b-forms-close-tables-brief-2.md`, based on round 1's referral c, and not a second home for the format.
- **The repeated pipeline.** `collectDeclarationReads(filterComparableBlocks(…))` appears at `setupStyles.test.ts:1820-1822,1860,1868`. It composes helpers that each have one home, so it does not duplicate a pattern.

## Referrals

- **To the objective lane:**
  - **a.** Claim 7: report the `npm run check` exit code from `/home/user/veneer-bft`.
  - **b.** The prefix admits only selectors that open with `.form-range`. Confirm that the cascade writes no range-key rule opening with another compound, such as a `.was-validated` or `.input-group >` descendant. The comparison at `setupStyles.test.ts:1820-1823` would leave such a rule out silently.
  - **c.** `setupServer.ts:1439-1440` says the additions ledger holds a block under an unrecorded condition. The `collectAdditions` remark (`:2182-2184`) states the same thing, but no executed case plants a forced-colors range block through `collectLedger`. Confirm by a run, or rule that the sentence needs one.
- **To the Orchestrator:** the same code-token fault as round 1's items 7b and 7c exists at `d02bd46` in three places. The writer flagged the first two with no carrier:
  - `tests/setupServer.ts:2053` and `:2172` ("as {@link readCascadeBlocks} reads them");
  - `tests/setupStyles.ts:3615` ("so `findRule` reaches").

  Name a carrier unit for them.

VERDICT: FAIL 6, 7; outside the claims: none
