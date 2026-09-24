# AP-TYPE audit round 2 — subjective verdict (`reviewer` on Opus 5.5)

1. **Scope and gates: CONFIRMED.**
   - `apt-2-status.txt:1-14` lists only files in the owned and shared sets of `ap-type-brief.md:77-83`.
   - Every gate log ends on exit 0:
     - `apt-2-gate-format-check.log.txt:9`
     - `apt-2-gate-lint-check.log.txt:5`
     - `apt-2-gate-check.log.txt:29`
     - `apt-2-gate-test-src-styles.log.txt:8198,8202`, with 1439 passed
     - `apt-2-gate-test-setup.log.txt:32,36`, with 320 passed
     - `apt-2-gate-test-conformance.log.txt:11,15`, with 26 passed
     - `apt-2-gate-test-guides.log.txt:11,15`, with 20 passed
   - A search for `npm run build|build:src|oxfmt` across `apt-instruments-2/` finds only `build:src:styles` and `oxfmt … --check .`.

2. **G2: CONFIRMED.**
   - At the capped widths, every fluid proof pins the exact string and the exact oracle value: `apt-2.diff:168-177, 211-218, 256-263, 294-300, 382-387, 408-413, 473-481, 512-516, 591-599, 659-667, 699-706, 731-736`.
   - Below the boundary, the only tolerance is `toBeCloseTo(…, 2)`. A search for `toBeCloseTo|closeTo|toBeLessThan` over the owned test files returns no other tolerance, apart from the unrelated `mixins.test.ts:655` contrast check.
   - `FLUID_WIDTHS` is `[390, 1199]` and `CAPPED_WIDTHS` is `[1200, 1280]`, pinned in `apt-shared-2.patch:568-569`.
   - Mutation: a cap that misses its token at 1200. The pins distinguish it. `apt-2-mutation-literal.log.txt:559` shows `.h1 at 1200: expected '36px' to be '101px'`, and `apt-2-mutation-xxl.log.txt:787` shows `'90.5857px'` against `'101px'`.

3. **G4 rename: CONFIRMED.**
   - A search for `(^|[^-])fluid\(` over `src`, `tests`, and `guides` in `/home/user/veneer-apt` returns nothing. `apt-2-grep-fluid.log.txt:2` records exit 1.
   - The name is `fluid-size` at every site:
     - the declaration, at `_mixins.scss:167`
     - the call, at `apt-2.diff:24`
     - the `_font.scss` call and comment, at `apt-2.diff:98,105`
     - the guide, at `guides/veneer.md:6166`
     - the `computeFluidSize` remarks, at `apt-shared-2.patch:611`
   - Compared with `apt.diff:1-120`, the `src/` hunks of `apt-2.diff:1-120` differ only in the rename and in rewrapped comment lines.

4. **G4 continuity and floor: CONFIRMED.**
   - The `readings` maps, the `requireValue(readings…)` lookups, and the `toBeLessThan(0.1)` checks are gone from all four files. Compare `apt.diff:237-255, 343-359, 532-547` with the worktree test files.
   - No property is lost. The boundary step is bounded by the tolerance at 1199 and the exact pin at 1200.
   - Mutation: a cap that jumps at 1200. The pins distinguish it at `apt-2-mutation-xxl.log.txt:132,190`.
   - `TEXT_FLOOR_CASES` (`setupStyles.ts:1382`) keys its rows by `tag` and carries the floor term. Its title, "applies the 1.25rem floor to the live $token token…" (`heading.test.ts:68`), names the property the guard proves.
   - Guard mutation: `h6` reads 16.86 against 12 (`apt-2-mutation-guard.log.txt:589`). The proof distinguishes it.

5. **G5: CONFIRMED.**
   - `FLUID_SIZE_CASES` (`setupStyles.ts:2219`) is frozen at the table and row level, exported, and carries TSDoc (`:2210-2218`).
   - `setupStyles.test.ts` registers it at `:406` and in the freeze loop (`apt-shared-2.patch:580`), and pins its values at `apt-shared-2.patch:571-575`.
   - No `it.each([`, including the `{ size` table, remains in `mixins.test.ts`. A search for `it.each\(\[` under `tests/src/styles` finds only string lists in `button-group` and `input-group`.
   - Mutation: change a row to `{ size: 2, root: 16 }`. The pin at `:571` distinguishes it.

6. **G1: BROKEN.**
   - **What holds.**
     - Every row the report lists matches the logs: `apt-2-mutation-cap.log.txt:187-189`, `apt-2-mutation-important.log.txt:702,726`, and `apt-2-mutation-guard.log.txt:544-631`.
     - The departure from the brief's G1 wording is supported. The guard reddens `.h5`, `.h6`, `.fs-5`, and `.fs-6`. `.h4` and `.fs-4` (baseline lines 12 and 50) appear in no mutation's FAIL list, because their excess over the floor is zero.
   - **What fails.** A size proof that passes on the baseline is missing, and the report classifies it wrongly.
     - `font.test.ts:300-306`, "resolves the later value of an entry…", pins `.fs-6` at `'16px'`.
     - It passes on the baseline (`apt-2-baseline-proofs.log.txt:40`).
     - The guard mutation reddens it: `apt-2-mutation-guard.log.txt:644-648` shows `expected '18.358px' to be '16px'`.
     - The report's sentence "The other tests in the owned files that pass on the baseline assert properties this unit does not change" (`ap-type-report-2.md:99-100`) is therefore false. Round 1's G1 was the same kind of incomplete list.
   - **Fix, in the report.** Add a row: the `fs-6 fs-1` later-value case in `font.test.ts`, reddened by the guard mutation, where `.fs-6` reads `18.358px` instead of `16px` at the runner's default viewport. Narrow the "other tests" sentence so it excludes that case.

7. **Mutations: CONFIRMED.**
   - The failure counts match the report:
     - literal: 3 (`literal.log.txt:169`)
     - literal-cap: 2 (`:198`)
     - cap: 38 (`:194`)
     - xxl: 40 (`:235`)
     - xxl-cap: 40 (`:235`)
     - guard: 10 (`:169`)
     - important: 11 (`:178`)
   - The readings the report states appear at `literal:559,577`, `cap:646,971`, `xxl-cap:178`, `guard:589`, and `important:540`.
   - Every build exited 0, and every restore logged `identical=True`: `guard:661`, `literal:595`, `cap:1218`, `literal-cap:609-610`, `xxl:1266-1267`, `xxl-cap:1301-1302`, `important:744`.
   - Each named proof separates the mutated reading from the passing reading by at least 0.24px, or by an exact string.
   - One point is imprecise but not false. The third literal failure is the `heading-size` value-function test (`literal.log.txt:530`), which the report's table does not name.

8. **G3: BROKEN.**
   - **What holds.**
     - The scope sentence is correct at `guides/veneer.md:6162-6163`.
     - "responsive" appears once in § Font utilities (lines 6149-6215), at 6162, in one sense.
     - No "walk" appears in the section.
     - No count and no substitution-table term appears. "Below a 1200px viewport" is a position, not a cross-reference. "one … block" states that the block is single; it does not tally a set.
     - The figures 26.28px, 36px, 20px, 18px, and 16px match `computeFluidSize` and `TYPE_HEADING_CASES`.
   - **What fails.** At `guides/veneer.md:6169`, "This partial writes each size class's fluid value through the `utility` mixin…" follows directly on "the `src/styles/_mixins.scss` partial" (6166) and "the `font-size` mixin beside it" (6168-6169).
     - The nearest partial the reader can attach "This partial" to is `_mixins.scss`, which writes no size class.
     - The intended referent, `_font.scss`, was last named at 6151.
     - `.claude/rules/writing.md` § Sentence and paragraph order requires naming the noun wherever the reader could attach the pronoun to another referent.
   - **Fix.** Write "The `src/styles/utilities/_font.scss` partial writes each size class's fluid value…".

9. **Law: BROKEN.**
   - **What holds.** The new code in `apt-2.diff` and `apt-shared-2.patch` adds no `any`, no `as`, no `!`, no suppression comment, no nested declaration, and no module-scope helper in a test file. The only `as const` in the patch is old context, at `apt-shared-2.patch:704`.
   - **What fails.** The retitled mixin case, `mixins.test.ts:239`, reads 'scales a $size rem size under a $root px root below the 1200px boundary and caps it from the boundary'.
     - For the `{ size: 1, root: 16 }` row it renders "scales a 1 rem size under a 16 px root…".
     - That row proves the reverse: a size under the floor holds. The `FLUID_SIZE_CASES` TSDoc says "the 1rem row sits under it" (`setupStyles.ts:2215`), and the guard mutation grows the row to 18.43 (`guard.log.txt:530-531`).
     - The title describes one of its rows wrongly.
   - **Fix.** Retitle to 'applies the responsive rule to a $size rem size against a $root px root below the 1200px boundary and caps it at the size from the boundary'.
   - Every other new or retitled title matches what its case asserts. That covers `type.test.ts`, `heading.test.ts`, `fieldset.test.ts`, and `font.test.ts`.

   **Counts the report states, checked against the logs:**
   - Baseline: 34 failed and 39 passed of 73 (`baseline:115`). Matches.
   - Mutations: 3, 2, 38, 40, 40, 10, and 11 failed of 119. Match.
   - `test:src:styles` 1439, `test:setup` 320, `test:conformance` 26, and `test:guides` 20. Match.
   - Final owned proofs: 119 passed (`apt-2-proofs.log.txt:480`). Matches.
   - Diffstat: only owned and shared files (`apt-2-diffstat.txt:1-15`). Matches.
   - Grep: exit 1. Matches.

**Findings outside the claims**

- **F1: the guide's proof paragraph no longer matches the proof.**
  - `guides/veneer.md:6194-6200` says the `font.test.ts` proof "reads each size class against its heading class at the 390 and 1280 viewports".
  - The proof reads 390, 1199, 1200, and 1280 (`font.test.ts:37-53`, through `FLUID_WIDTHS` and `CAPPED_WIDTHS`), and the boundary pair is what G2 established.
  - The paragraph's list also leaves out the case "resolves the size class on a heading tag below and from the 1200px boundary" (`font.test.ts:100`).
  - `.claude/rules/documentation.md` requires the prose to be re-read against what shipped.
  - **Fix.** Say "below and from the 1200px boundary, at the 390, 1199, 1200, and 1280 viewports", and add "the size class on a heading tag" to the list.
  - The round-1 guide grant (`ap-type-brief.md:86-88`) did not cover this paragraph, so the Orchestrator must name a carrier.

- **F2: after the rename, "fluid size" names the function, but the tests use it for the mixin.**
  - `_mixins.scss:167` declares the function `fluid-size`, and `:174` declares the mixin `font-size`.
  - `mixins.test.ts:233` is `describe('fluid size mixin')`, and the `FLUID_SIZE_CASES` TSDoc says "the fluid size mixin proof" (`setupStyles.ts:2211`). Both call the `font-size` mixin by the function's name.
  - The describe title predates this round, but the rename made it wrong.
  - **Fix.** Write `describe('font size mixin')`, and "the `font-size` mixin proof" in the TSDoc.

**Attacked and held**

- **"responsive" across the guide.** § Text utilities uses "responsive" in the breakpoint-infix sense ("Only the alignment entry is responsive", 6229), 67 lines after § Font utilities uses "the release's responsive rule". Each sense is the release's own vocabulary: the utility `responsive` key and responsive font sizes. Claim 8 is scoped to its section, so I record this as an observation, not a finding.
- **"after the walk" in the source.** `_font.scss:8` keeps "the block after the walk". In that partial, "the walk" names the `breakpoint-each` loop it contains (`:17`), so the phrase has a referent there.
- **The exported-name registry.** `'CAPPED_WIDTHS'` is registered among the F names (`setupStyles.test.ts:405`). The list is compared after `.sort()` (`:329,636`), so the position only affects readability.
- **The rule's position and the cap block.** The cap block (`_font.scss:59-61`) sits after every entry the walk writes, and `font.test.ts:352-366` reads the cap through the important mutation. The `$caps` map is kept apart from the `font-size` mixin because the utility caps need `!important` and must come after the entries.

**Referrals**

- **R1, to the Orchestrator:** decide which unit carries F1. The paragraph is in shared guide prose outside both AP-TYPE guide grants.

VERDICT: FAIL 6, 8, 9; outside the claims: F1, F2
