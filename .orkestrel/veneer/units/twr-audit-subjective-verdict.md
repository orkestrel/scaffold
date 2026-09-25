**TAILWIND-RECIPE audit: subjective lane verdict**

I held the subjective lane as `reviewer` on Opus 5.5. I read the evidence and ran nothing. Every verdict on a proof claim rests on the retained plant logs, which the writer produced, and on source.

**Per-claim verdicts**

1. **CONFIRMED.**
   - The `/home/user/veneer-twr/tests/fixtures/tailwind/consumer-preflight.css` fixture (lines 1-6) matches the guide's `preflight` fence (`/home/user/veneer-twr/guides/veneer.md:3392-3399`) except at the `@source` line: the fixture has `'./markup.html'` at :5 and the guide has `'./src'` at :3397.
   - The case at `/home/user/veneer-twr/tests/service/tailwind/consumer.test.ts:89-124` selects fences by the `SHIPPED_SOURCE` line (:94-96). It requires one fence per executed file (:98) and compares the line arrays of each file (:109-123).
   - **Mutation:** in the guide fence alone, delete the order line, swap `elements` and `base`, or drop the Veneer import. Each fails this case with `AssertionError`:
     - `twr-plant-order.log.txt:25-26`
     - `twr-plant-swap.log.txt:26-27`
     - `twr-plant-import.log.txt:25-26`
   - **Distinguishes:** yes. When the fence and fixture agree, the arrays are equal. Under each plant, the second array differs in length or content.
   - A reordered guide or a third `@source './src';` fence fails positionally at :98 or :109-123. The comment at :90-91 names that dependency.

2. **CONFIRMED.** The case is at :408-432.
   - **Mutation:** each paired plant fails it:
     - order: the assertion at :412 fails (`twr-plant-order-paired.log.txt:32-33`);
     - swap: the assertion at :412 fails (`twr-plant-swap-paired.log.txt:34-35`);
     - import: the token-namespace assertion at :415-420 fails (`twr-plant-import-paired.log.txt:34-35`).
   - **Distinguishes:** yes. The case's title is a separate problem, ruled under claim 9.

3. **CONFIRMED.** The case is at :434-519.
   - The longhands are derived from Chromium's expansion (:437-455). `COMPONENT_FLOOR` (:46-55) lists classes, not longhands.
   - The assertions are:
     - each floor class shares a longhand with the reset (:459-463);
     - each floor class was read on such a longhand (:506-510);
     - no longhand moves (:511);
     - the control removes the order line (:467-469) and every floor class moves on it (:514).
   - **Mutation:** each paired plant fails the case:
     - order: 240 moves at :511 (`twr-plant-order-paired.log.txt:60-61`);
     - swap: 16 moves (`twr-plant-swap-paired.log.txt:61-62`);
     - import: the control-order assertion at :469 fails (`twr-plant-import-paired.log.txt:53-54`).
   - **Rival reading excluded:** a stage that ignored its root would show the cascade on both recipe pages, so the equality would hold trivially. The control uses the same seam, so its `displaced` list would stay empty and :514 would fail.
   - The claim understates the case: it requires every floor class to move, not "at least one".

4. **CONFIRMED.** The case is at :521-550.
   - The baseline at :527-528 loads the recipe's `theme` and `base` blocks into the cascade's own order. The only difference left between the pages is the generated utilities.
   - **Mutation:** dropping the exclusion line in both the guide and the fixture fails the equality at :540-549 with 139 moves (`twr-plant-exclusion-paired.log.txt:32-33`). The order-paired plant also fails it, with 4 moves (`twr-plant-order-paired.log.txt:320-321`).
   - **Distinguishes:** yes.

5. **CONFIRMED.** This is a structural claim, and source settles it.
   - The block writes the compiled recipe to `CASCADE_PATH` under a scratch root and opens `new StageManager(scratch.path)` (:375-396).
   - `StageManager.open` makes the file at `resolve(this.#root, CASCADE_PATH)` the page's only linked sheet (`/home/user/veneer-twr/tests/setupService.ts:324-326`, `:364-367`).
   - The same pattern appears at `/home/user/veneer-twr/tests/setupService.test.ts:425-426`. The `stage` TSDoc sanctions another root (`setupService.ts:530-531`).
   - No case calls `load` on the recipe or control page. The only `stage.load` in the block (:528) loads the reset onto the cascade-alone baseline page.

6. **CONFIRMED** on the claim's wording.
   - The garbled fragments are gone. `cover it.` survives only at `veneer.md:3484`, where it correctly ends the `start-*`/`end-*` sentence.
   - Each changed sentence states what a case executes:
     - 3419-3423 map to :412-431;
     - 3424-3428 map to :459-463 and :511;
     - 3428-3431 map to :469 and :514;
     - 3431-3434 map to :521-550;
     - the § Files row (around line 3270) and the § Tests sentence (around line 11059) match the cases.
   - This claim asserts whole and true sentences, not plain ones. The plainness defects in these same sentences are F2.

7. **BROKEN.** Both items are defects.
   - **(a) Fixture paths.** The `consumer-preflight.css` and `components.html` fixtures are resolved inside the test file (`consumer.test.ts:40-41`). Three statements are now false:
     - the `TAILWIND_PATHS` TSDoc, "Locates each Tailwind profile and fixture the service proofs read" (`setupService.ts:62-73`);
     - the case title with the same words (`setupService.test.ts:115`), whose sorted expectation at :123-129 lists the population;
     - the guide's § Files row, "the paths of the Tailwind profiles and fixtures" (`veneer.md:3267`).
   - Deriving both paths through `dirname(TAILWIND_PATHS.consumer)` also ties them to an unrelated key.
   - **Law:** `AGENTS.md` § Design laws, "Centralize by kind"; `.claude/rules/tests.md` § Shared test infrastructure, "Export every reusable … constant … from setup files" and "Data tables … belong in a setup file at any size".
   - The same law reaches `COMPONENT_FLOOR` (`consumer.test.ts:46-55`). Its sibling `CANDIDATE_FLOOR` is exported from `setupService.ts:101-107`. `FLOOR_TAGS` at `/home/user/veneer-twr/tests/service/tailwind/preflight.test.ts:19` is an older case of the same shape.
   - **Fix:**
     - Add both paths to `TAILWIND_PATHS` and add their rows to `setupService.test.ts:123-129`.
     - Make `consumer.test.ts` read the keys.
     - Move `COMPONENT_FLOOR` into `setupService.ts`, frozen, and add its row to the export list at `setupService.test.ts:30-44`.
     - Name each key for the file a proof means by it (`setupService.test.ts:116`). A `components` key fits. The `recipe` key the report proposes does not, because `consumer.css` is a recipe too. If no single flat word names the file, change the shape: `AGENTS.md` says "If one word is insufficient, change the shape".
   - **(b) Repeated comparison.** The inline moved-longhand comparison appears at :199-208, :248-257, :290-295, and :540-549. The copy at :540-549 is this unit's, and it is byte-identical to :199-208. The `moved` accumulation at :495-501 is a variant. The unit's case also repeats the snapshot-collection loops of :180-209 (:529-534 against :185-190, and :537-538 against :196-197).
   - **Law:** `AGENTS.md` TTTDD step 3, Consolidation; `tests.md`: "Any duplicate or near-duplicate helper is a defect" and "Prefer small customizable factories/stubs … over repeated inline setup".
   - **Fix:**
     - Export one pure helper beside `collectSharedNames` and `collectImportantNames` in `/home/user/veneer-twr/tests/setupServer.ts`. For example, `collectMoves(standalone, paired)` returning the `<label> <property>: <value> became <after>` lines.
     - Prove it in `tests/setupServer.test.ts`, including its export-list row.
     - Route every site through it, including the ones that existed before this unit. Add no shim.

8. **CONFIRMED** on the retained logs:
   - `twr-check.log.txt:29`, `twr-lint-check.log.txt:5`, `twr-oxfmt-check.log.txt:5`, and `twr-build-src.log.txt:57` each record `exit=0`;
   - `twr-test-service.log.txt:11,15` records `Tests 24 passed (24)` and `exit=0`;
   - `twr-test-guides.log.txt:15` and `twr-test-policy.log.txt:15` each record `exit=0`.

   The writer ran every one of these. The `verifier` run at landing is the authoritative one.

9. **BROKEN** on the title clause. The scope and law clauses hold:
   - `twr-status.txt` names only the owned files, and `src/**` is unchanged.
   - The diff adds no `any`, `as`, non-null `!`, suppression, nested declaration, or mock.

   The title at :408, "compiles to the order the cascade puts the document in, with Tailwind's reset in its base layer", leaves out two things the case proves: that the cascade import resolved (:415-423) and that the markup line reached the scanner (:429-431). Under the import-paired plant, the order and the reset held, yet the case failed with `expected false to be true` at the token assertion (`twr-plant-import-paired.log.txt:34-35`). Its title names neither of those.
   - **Fix:** retitle it the way its sibling at :126 is titled. For example: "resolves the cascade import, scans the markup line, and declares the order the cascade puts the document in, with Tailwind's reset in its base layer".
   - In the same edit, change the :434 phrase "moves one when the order line is dropped" to "moves each floor class when the order line is dropped", which is what :514 asserts.

**Findings outside the claims**

- **F1: The exclusion-line census omits the new copy.**
  - The profiles case titled "holds every written copy of the exclusion line equal to the profile that declares it" reads only the guide fences, `preflight.css`, and `consumer.css` (`/home/user/veneer-twr/tests/service/tailwind/profiles.test.ts:200-205`). The guide repeats that list as "every written copy" (`veneer.md:3456-3459`).
  - **Failing state:** edit the exclusion line in `consumer-preflight.css` alone. The profiles case stays green, and only the consumer pairing's line case turns red.
  - The behaviour still holds indirectly, through the fence. What is false is the title and the guide sentence. The file is also held differently from its sibling `consumer.css`, which the profiles case reads directly.
  - **Fix:** read `consumer-preflight.css` into `copies` through its new `TAILWIND_PATHS` key, and name it in the guide sentence. The claim 7 successor carries this.
- **F2: The changed prose breaks the writing law.**
  - `veneer.md:3401`, "compiles both recipes": `AGENTS.md` § Writing counts `both` as a count when it tallies a set that can grow and the sentence does not name the members. Write "compiles each recipe as written".
  - `veneer.md:3521-3529`, the relocated `gap-3` paragraph:
    - "the branch" refers to the importance branch at 3472-3473, about 50 lines earlier;
    - "what the rule claims" refers to the rule for leaving the exclusion line at 3446-3449;
    - the same paragraph also uses "rule" to mean a CSS rule at 3522, 3524, 3527, and 3528, so a reader cannot resolve either reference on a first read.

    Name both nouns: "the importance branch" and "the rule for leaving the exclusion line".
  - `veneer.md:3424`, "The `tests/fixtures/tailwind/components.html` fixture mounts…": the proof mounts the fixture, and the fixture only carries the classes. `.claude/rules/writing.md` § Voice and actor says to name the component that acts. Write "The consumer pairing mounts the … fixture, which carries…".
- **F3: The word `recipe` names two things in one file.**
  - In `consumer.test.ts`, `recipe` is a fence string at :99 and :117 and a `StageManager` at :376, :396, :400, :404, :476, :487, :536, and :538. `AGENTS.md` § Design laws says "One concept, one term".
  - **Fix:** rename the page to one word for the page that serves the compiled recipe alone, such as `served`.

**Referrals to the objective lane (GPT-6 Astra)**

- **R1:** The bare `@import 'tailwindcss'` has no `source(none)`, so it also scans the working directory (report § Observations). Can repository text generate a utility that matches a class in `components.html` or a shared name, and so flip a reading? This bears on `tests.md`: "Tests are deterministic".
- **R2:** The plants ran before a "final comment-only edit" to `consumer.test.ts` (report § Mutation table). Confirm the edit touched only comments, or re-run one paired plant against the file as it stands.
- **R3:** The component case launches a third Chromium inside its body (:470-474). Size its budget from a full contended run, as `tests.md` § Expensive proofs requires.
- **R4:** The assertion at :427 passes even when `@layer base {}` is empty. Should it require the block to carry rules?
- **R5:** Neither `twr-oxfmt-check.log.txt` nor `twr-gates.sh` records the oxfmt command that ran.

**Referral to the Orchestrator**

The unit brief made the unit own `tests/setupService.ts` without `tests/setupService.test.ts`, which pins its export list and the `TAILWIND_PATHS` population. It also put `tests/setupServer.ts` off-limits. `.agents/orchestration.md` requires granting "a behaviour with the tests that pin it". The unit's deviation contract said to stop when "a change needs a file outside Owned". The unit kept going and recorded claim 7's defects as observations instead. The successor brief must own `setupService.ts` and `setupService.test.ts`, `setupServer.ts` and `setupServer.test.ts`, `consumer.test.ts`, `profiles.test.ts`, and the guide rows.

**Attacked and held**

- **Tenet fit** (`/home/user/veneer-twr/ROADMAP.md:41-42`): the preflight recipe is now read in the browser for resets, component classes, and shared utilities. Tokens are read in structure. Under preflight, a utility overriding a component is proved only through the asserted layer order. The guide makes no browser claim specific to preflight there, so this is not a defect.
- **The inline PostCSS layer-block reader** (:379-392): no exported reader already does this job, because `SheetLayer` carries no block text. It is not a duplicate helper. It becomes a candidate for extending `SheetReader` once a second consumer appears.
- **The compiled recipe written at `CASCADE_PATH`:** placing a sheet other than the cascade there goes through the documented seam for "another root", not a workaround.
- **"which does not cover them"** (`veneer.md:3502`): it follows the form this section already uses at 3484 and 3518, and a reader rejects the contradictory reading.

VERDICT: FAIL 7, 9; outside the claims: F1, F2, F3
