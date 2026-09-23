# F8d IMPORTANCE-LONGHANDS — `reviewer` on Opus 5.5, subjective lane

Native subagent, clean context, read on the tree of `/home/user/veneer-f8d` on 2026-09-23. The verdict text is the lane's handback verbatim.

F8d audit: `reviewer` on Opus 5.5, subjective lane (API shape, naming, helper placement, guide voice, TSDoc and comment voice)

The round fails. Claims 5 and 6 are BROKEN. Claims 3, 4, and 7 are UNRESOLVED because their only run evidence is the writer's report. Claims 1 and 2 hold.

Evidence read: `/home/user/scaffold/.orkestrel/veneer/units/f8d.diff`, `f8d-status.txt`, `f8d-report.md`, `f8d-brief.md`, and the worktree `/home/user/veneer-f8d`. I edited nothing and ran nothing. Line numbers are in the worktree and approximate; locate each site by its symbol.

## Numbered verdicts

**1. CONFIRMED.** `collectImportantNames` covers per longhand.
- The union of `important` is built at `tests/setupServer.ts` around line 1774, and the `every` over `longhands` is around line 1777.
- **Mutation named: the writer's per-name plant** (`important.length > 0`). The "keeps a name out whose importance covers only some of its longhands, or another longhand" case (`tests/setupServer.test.ts`, around line 2445) returns `['col-1', 'table']` under this plant instead of `[]`, so the case distinguishes it.
  - `col-1` has importance only on `grid-column-start`. The `[title=".col-1"]` rule does not count, per the `collectRuleLonghands` proof.
  - `table` has importance only on `color`.
- The consumer case "keeps a shared name on the line while its importance covers only some of the longhands Tailwind declares" (`tests/service/tailwind/consumer.test.ts:232`) distinguishes the same plant. The one-longhand plant leaves `col-1` covered on `grid-column-start` only, so the plant returns `col-1`.
- **Mutation the "reports a name…" case misses:** replacing the per-rule union with a single-rule cover is distinguished (`col-1` needs both `.col-1` and `.row > .col-1`). Reading `rule.properties` in place of `rule.important` around line 1776 is not distinguished: the case still returns `['col-1', 'table']`.
- **Mutation the "keeps a name out…" case misses:** the same `rule.properties` mutant still returns `[]`, because no name there declares every longhand normally.
- See the referral to the objective lane.

**2. CONFIRMED.** `collectRuleLonghands` (`tests/setupServer.ts:1731`) unions per name in first-seen order. Its proof (`tests/setupServer.test.ts:2384-2408`) distinguishes each mutation named here:
- Exact-selector matching loses `margin-top` and `color`.
- Substring matching gains `padding-top` from `[title=".col-1"]`.
- First-class-only matching loses `.row > .col-1`.
- Dropping property dedup repeats `grid-column-start`.
- Dropping the `has` skip is an equivalent mutant: `Map.set` on an existing key keeps its position and its value, so no observable behaviour changes.
- A name no rule names maps to an empty list (`['caption-top', []]`). The equality needs neither form over the other: a name with an empty list and an absent name both stay off `collectImportantNames`'s result, and the guard around line 1777 is what keeps the empty list from covering vacuously. The empty form keeps the map total over `names`, which the branch case's `longhands.get('col-1')` reads.

**3. UNRESOLVED.**
- **Held by reading:**
  - `expand` fills `important` from `getPropertyPriority(name) === 'important'` (`tests/setupService.ts`, around lines 476-484).
  - The proof (`tests/setupService.test.ts`, around lines 398-423) would redden if Chromium withheld priority on an expanded longhand. `flagged` is pinned with `toEqual`, so `important: ['color']` or a missing `grid-column-end` fails.
  - Marking every longhand important is distinguished by `rule?.important` equalling `[]` on `hr` and on the nested `p`.
- **Unsettled:** the normal-before-important order in the pinned `properties` array is a Chromium reading. The only evidence for it is the writer's report of one failed run corrected to the measured order. The pinned order is consistent with the `StageRule` doc ("in Chromium order").
- **Settling command:** `npm run test:setup -- tests/setupService.test.ts`, run from `/home/user/veneer-f8d`.
- **The Unknown about shorthand stability:** priority does not depend on the value, and the consumer meets two readings.
  - Tailwind's normal `grid-column: 1`: only its expansion matters, and the branch case pins it live at `consumer.test.ts:184`.
  - A Veneer `!important` shorthand: the `expand` proof pins `grid-column: 5 !important`.

**4. UNRESOLVED.**
- **Held by reading:**
  - The equality case reads longhands from `stage.expand(instrumentProfile)` and importance from `stage.expand(readBuiltCascade())` (`consumer.test.ts:124-125`).
  - The branch case plants both longhands and reads the rule's claim (lines 181-219).
  - The partial case plants one longhand and asserts `col-1` is not important and stays excluded (lines 226-238).
- **Unsettled:**
  - The failing-first counts (1 failed of 8, then 8 passed; 1 failed of 117, then 117 passed) rest on the writer's report only.
  - No capture was supplied for the browser readings.
- **Settling command for the browser readings:** from `/home/user/veneer-f8d`, run `npm run build:src:styles && npm run test:service -- tests/service/tailwind/consumer.test.ts`. Run it with the per-name plant at `tests/setupServer.ts` around line 1777 for the red, and without it for the green.

**5. BROKEN.** `LonghandRule` (`tests/setupServer.ts:1700-1716`) and `StageRule` (`tests/setupService.ts:58-72`) are two declarations with the same members for one concept.
- **Why it matters:** this breaks `AGENTS.md` § Design laws "One concept, one term" and `architecture.md` § System constraints "Centralize any pattern repeated twice". The `LonghandRule` remark admits it in so many words: "That stage's rule satisfies it."
- **The drift the law predicts has already started.**
  - `StageRule.properties` says "in Chromium order", and `StageRule.important` says "in the same order".
  - The `LonghandRule` members state neither.
  - A consumer reading one gets a different contract than a consumer reading the other.
- **One declaration is lawful and reachable.** `tests/setupService.ts:24` already imports from `./setupServer.js`, so a type import follows the existing direction.
- **The name:** `LonghandRule` is right for the single declaration. The shape is stage-free: the helpers and the unit tests build it without a stage, so a `Stage*` name would misdescribe it.
- **Required change:**
  1. In `tests/setupServer.ts`, keep `LonghandRule` as the only declaration. Carry the ordering facts on its members ("in Chromium order" for an expanded rule), and delete the sentence "That stage's rule satisfies it."
  2. In `tests/setupService.ts`, delete `StageRule` and add `import type { LonghandRule } from './setupServer.js'`. Type `StageManager.expand` (line 467) as `Promise<readonly LonghandRule[]>` and the local `rules` array (line 471) as `LonghandRule[]`.
  3. In `tests/service/tailwind/preflight.test.ts:1,36`, switch the import and the `treated` annotation to `LonghandRule` from `../../setupServer.js`.
- **Carrier:** the defect comes from the F8d brief's conditional design, which fixed the structural duplicate and made `preflight.test.ts` off-limits. The carrier is a successor unit granted `tests/setupServer.ts`, `tests/setupService.ts`, and `tests/service/tailwind/preflight.test.ts`.

**6. BROKEN.** The replaced sentence and the § Files row hold.
- The per-longhand wording is at `guides/veneer.md:409-417`, and the row naming "the shared-name readings" is at line 253.
- No banned term appears, and each changed prose line is at or under 100 columns (line 414 is exactly 100).
- **The break:** `guides/veneer.md:413` writes "a planted `!important` declaration on both longhands Tailwind's `col-1` rule declares".
  - Here `both` tallies a set the proof derives per run and does not name the members. `AGENTS.md` § Writing says to treat `both` as a count unless the sentence names the members.
  - The same fault is in the changed comments at `tests/service/tailwind/consumer.test.ts:178-179` ("importance on both longhands Tailwind's `col-1` rule declares") and line 223 ("Tailwind's `col-1` rule declares two longhands and the plant makes one of them important").
- **Why it matters:** naming the longhands also sets up the contrast the next sentence draws with "only the `grid-column-start` longhand".
- **Required change:**
  - Write the guide phrase as "on the `grid-column-start` and `grid-column-end` longhands Tailwind's `col-1` rule declares", rewrapping to stay at or under 100 columns.
  - Rewrite line 223 as "Tailwind's `col-1` rule declares `grid-column-start` and `grid-column-end`, and the plant makes `grid-column-start` important".
  - Rewrite lines 178-179 as "importance on `grid-column-start` and `grid-column-end`, the longhands Tailwind's `col-1` rule declares".
- **Carrier:** the claim-5 successor unit, if it is granted `guides/veneer.md` and `consumer.test.ts`. Otherwise a separate unit.

**7. UNRESOLVED.**
- **Held by reading across the diff:**
  - No `any`, `as` assertion, non-null `!`, or suppression. Every `!` is logical negation or sits inside a CSS string.
  - No nested function beyond callbacks passed directly (`flatMap`, `filter`, `every`, `find`).
  - Every `LonghandRule` and `StageRule` member is readonly, and `collectRuleLonghands` returns `ReadonlyMap<string, readonly string[]>`.
  - `f8d-status.txt` lists exactly the six owned files, and Glob finds no `tmp/probe/**` in `/home/user/veneer-f8d`.
  - The installed `@orkestrel/test` exports only `collect` and `collectStream` in the `collect*` family, so no installed export does the new helper's job.
- **Unsettled:** the `npm run check` exit is the writer's report only, and the objective lane owns that run: `npm run check` from `/home/user/veneer-f8d`.

## Findings outside the claims

None to the BROKEN standard.

## Attacked and held

- **`important` as a list member beside `SheetDeclaration.important: boolean`** (`tests/setupServer.ts:1420`): this looks like a vocabulary collision but matches house precedent. `OracleFixture.excluded` (line 155) is an array while `InlineSource.excluded` (line 1785) is a boolean in the same module, so I did not raise it.
- **The helper name:** `collectRuleLonghands` fits the `{verb}{Noun}` helper form and the `collect*` meaning in `names.md`.
- **Placement:** both helpers sit beside `collectSelectorClasses` and `collectSharedNames`, the family they extend.
- **The module-scope `exclusion` constant** (`consumer.test.ts:43`) matches the file's existing module-scope readings (`consumerSource`, `cascade`, `shared`). The case-local `planted` strings match the original branch case.
- **TSDoc summaries:** the summaries of `LonghandRule`, `collectRuleLonghands`, `collectImportantNames`, and `StageRule.important` open with a third-person `-s` verb and do not name their symbol.
- **Guide sentence at 411-412:** it restates the qualifying clause "every longhand Tailwind's rule for the name declares" a fourth time within 25 lines. It is correct and replaces a sentence that also restated it, so it is a readability observation, not a break.

## Referrals

- **To the objective lane (claim 1, test sufficiency):** reading `rule.properties` in place of `rule.important` at `tests/setupServer.ts`, around line 1776, keeps both `collectImportantNames` unit cases green.
  - The live equality case likely catches this mutant. For example, `caption-top` declares `caption-side` on both sides, so the mutant would drop it from the exclusion line. That is unrun.
  - Rule whether the "keeps a name out…" case needs a normal-declaration control. For example, add `{ selector: '.table', properties: ['border-top-width'], important: [] }`, which the correct helper excludes and the mutant reports.
- **To the objective lane (claim 4):** `expect(properties).toEqual(expect.arrayContaining(['grid-column-start', 'grid-column-end']))` at `consumer.test.ts:195` cannot fail once lines 184 and 189 pass, because `properties` is the union of the longhands of the `branch` names, and `branch` includes `col-1`. Rule whether it stays.

VERDICT: FAIL 3, 4, 5, 6, 7; outside the claims: none
