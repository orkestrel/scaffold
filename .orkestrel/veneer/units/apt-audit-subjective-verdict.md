# AP-TYPE audit round 1 — subjective verdict (`reviewer` on Opus 5.5)

1. **Scope and gates — CONFIRMED.** `apt-status.txt` lists only modified files, and every one is owned or shared under `ap-type-brief.md` § Scope. The gate logs end as claimed:
   - `apt-gate-format-check{,-2}.log.txt:9`, `apt-gate-lint-check.log.txt:5`, and `apt-gate-check.log.txt:29` each exit 0.
   - `apt-gate-test-src-styles.log.txt:8207-8212` reads 115 files and 1439 passed.
   - `apt-gate-test-setup-2.log.txt:31-36` reads 320 passed.
   - `apt-gate-test-conformance.log.txt:11-15` reads 26 passed.
   - `apt-gate-test-guides-2.log.txt:11-15` reads 20 passed.
   - The first `test:setup` run (`apt-gate-test-setup.log.txt:33-116`) failed only on "Hook timed out" and "Test timed out", in `setupServer.test.ts` and `setupStyles.test.ts`. The deciding rerun belongs to the Orchestrator.

2. **The rule — CONFIRMED.** The algebra checks against the installed `node_modules/bootstrap/dist/css/bootstrap.css`. For a size S above 1.25rem at a 16px root, `S − max(0.9S − 1.125rem, 0)·(1 − 100vw/1200px)` reduces to `(0.1S + 1.125rem) + 0.9(S − 1.25rem)·100vw/1200px`. That form reproduces every compiled value:
   - 2.5rem gives `1.375rem + 1.5vw` (lines 226 and 665).
   - 2rem gives `1.325rem + 0.9vw` (line 235), and 1.75rem gives `1.3rem + 0.6vw` (line 244).
   - 1.5rem gives `1.275rem + 0.3vw` (lines 253 and 521, the `legend` rule).
   - 5rem gives `1.625rem + 4.5vw` (line 610), and 4.5rem gives `1.575rem + 3.9vw` (line 621).
   - The `.fs-1` to `.fs-4` rules at lines 8367-8379 match the same forms.

3. **Population — CONFIRMED.** The compiled `/home/user/veneer-apt/dist/src/styles/index.css` carries the fluid value over each selector's own token for `h1`-`h6`, `.h1`-`.h6`, `.display-1`-`.display-6`, `.fs-1`-`.fs-6`, and `legend`. It also carries a `@media (width>=1200px)` cap of each token. Every `.fs-*` value and cap is `!important`. `.display-*{font-weight:300;line-height:var(--vn-line-heading)}` is intact. For exclusivity, the pre-guide conformance run (`apt-conformance-pre-guide.clean.txt:135-177, 198-240, 261-266`) reports only `font-size` rows for these selectors as unrecorded, stale, or added. No line-height or weight row moved.

4. **Proof oracle — CONFIRMED.** `computeFluidSize` (`tests/setupStyles.ts`, around line 1188) is TypeScript arithmetic that reads no cascade. `tests/setupStyles.test.ts`, around lines 1526-1548, pins it to written literals: 26.28, 23.925, 21.57, and the display row at 390; 51.7925; 24.71; 12; and 32.85 at a 20px root.
   - Mutations tested: 0.9 changed to 0.8 moves the `h1` value at 390 to 28.71; dropping `Math.max` moves the 12px value to 16.86; moving the boundary to 1400 moves the 1280 value off 36.
   - Distinguishing: yes. Each mutation reddens a literal assertion.

5. **Proof coverage — CONFIRMED.** Every reading the claim lists is present and asserted:
   - Each selector at 390 and 1280: `heading.test.ts`, the family case; `type.test.ts`, the `.h*` and `.display-*` cases; `font.test.ts`, the `.fs-*` case; `fieldset.test.ts`, the legend case.
   - The 101px retune: the `FLUID_WIDTHS` cases in `type.test.ts` and `font.test.ts`. `TYPE_HEADING_TOKEN_CASES` h1 is `'101px'` (`setupStyles.ts:3255`).
   - The 12px and 32px cases: the threshold case in `heading.test.ts`, around line 56.
   - `<h1 class="fs-6">`: `font.test.ts`, around line 90.
   - The weights, and the legend at its default and at 40px.
   - Mutation tested: a slope fixed from the default token instead of the live token. The retune rows at 390 read 26.28 against an expected 51.79 (`apt-mutation-literal.log.txt:558,572`). Distinguishing: yes.
   - Limit: the default legend proof cannot tell the old hand formula from the rule. At 24px the two expressions are algebraically identical. Only the 40px retune case separates them, and it does: the old formula reads 35.17 at 390, the rule 27.85.

6. **Mutations — CONFIRMED.** The logs show these fail counts and readings:

   | Mutation | Failed of 119 | Log |
   | --- | --- | --- |
   | literal | 3 | `apt-mutation-literal.log.txt:168` |
   | literal-cap | 2; `.h1` and `.fs-1` read 36 against 101 at 1200 | `apt-mutation-literal-cap.log.txt:197`, `:572`, `:586` |
   | cap | 38 | `apt-mutation-cap.log.txt:194` |
   | xxl | 40 | `apt-mutation-xxl.log.txt:235` |
   | xxl-cap | 40 | `apt-mutation-xxl-cap.log.txt:236` |
   | guard | 10; `h6` reads 16.86 against 12 | `apt-mutation-guard.log.txt:169`, `:589` |
   | important | 11; `.fs-1` reads 36.96 against 36 | `apt-mutation-important.log.txt:178`, `:540` |

   Every log ends `identical=True` for each restored file. Each proof's assertion at 0.005px separates the mutated reading from the passing one by at least 0.24px.

7. **Failing first — BROKEN.** The 34 failed of 73 collected holds (baseline log line 116, restores `identical=True`). The second half does not hold, because several proofs passed on the baseline and the guard mutation does not redden them:
   - **The default legend.** It passes on the baseline (`fieldset.test.ts`, baseline log lines 110-111). The guard mutation's FAIL list (`apt-mutation-guard.log.txt:530-644`) has no `fieldset` row. At 24px the guard's argument is 3.6, so the guard is inert there. The report's sentence "The guard mutation reddens all of them" is false for the legend.
   - **`.h4` and `.fs-4` at their defaults.** Both pass on the baseline (`type.test.ts`, baseline log line 51; `font.test.ts`, line 13). At 20px the excess is exactly 0 at a 16px root, so no mutation in the set reddens them.
   - **The `display-1 fs-2` override case.** It passes on the baseline (line 42). The important mutation reddens it, not the guard.
   - **The report's list is incomplete.** It names only 3 baseline-passing proofs and omits `.h4`-`.h6`, `.fs-4`-`.fs-6`, and the override case.
   - **Fix.** Restate the failing-first paragraph so each baseline-passing proof names the mutation that reddens it: the legend under the cap mutation (24.24 at 1280), the override under the important mutation (30.6px). Record the `.h4` and `.fs-4` defaults as regression pins that no rule mutation can reach at a 16px root.

8. **Moved pins — CONFIRMED.** `apt-after-source-styles.log.txt:8182-8737` names 34 reds, all in `type.test.ts`, `heading.test.ts`, and `font.test.ts`. The diff moves each into a `visitBreakpoint` loop at `VIEWPORT_WIDTHS` or `FLUID_WIDTHS`, or into `visitBreakpoint(1280)`: the override and layer-escape cases (`apt.diff:679-733`). None is deleted.
   - The exact `toBe('36px')` pins became `toBeCloseTo(x, 2)`, a ±0.005px band. I rule that band a precision tolerance, not a weakening to a range. The smallest displacement any rule mutation produces is 0.24px.
   - The `readStyle(a) === readStyle(b)` twin equalities stay exact.

9. **Guide — BROKEN.**
   - **What holds.** The changed ledger rows equal the conformance readings, value for value (`apt-shared.patch:72-433` against `apt-conformance-pre-guide.clean.txt:135-177`). The 6 cap rows sit in the Additions table (`apt-shared.patch:441-454`). The floor statement is true. The new prose states no count and uses no substitution-table term.
   - **What fails.** `guides/veneer.md:6163-6164` says: "Below a 1200px viewport a heading, size, or display class shrinks by the release's responsive rule over its size token". That is false for the display classes. `_type.scss` passes `var(--vn-display-#{$level})`, not a size token. In this guide, "size token" means `--vn-size-*` (line 6160), and the test calls the display family "display token" (`type.test.ts`, `'resolves $name from its own display token…'`). A reader who retunes `--vn-size-*` expecting `.display-*` to follow is misled.
   - **Fix.** Write "over its size or display token", or split the sentence: heading and size classes over their `--vn-size-*` token, display classes over their `--vn-display-*` token.

10. **Law — BROKEN.** No `any`, `as`, `!`, suppression, or nested declaration was added.
    - **The function name.** `fluid` (`src/styles/_mixins.scss:167`) is an adjective. `.claude/rules/styles.md:60` fixes functions as verb or noun, and every sibling function is a noun (`breakpoint`, `heading-size`, `luminance`, `ratio`, `contrast`, `scheme`, `label`, `endpoint`). The TypeScript oracle already names the concept `computeFluidSize`. Rename it `fluid-size`, and update the call and comment in `_font.scss`, the comment in `_mixins.scss`, `guides/veneer.md:6166`, and the `@remarks` of `computeFluidSize`. The `font-size` mixin is acceptable: it mirrors the release's mixin and matches the house noun-noun mixins (`image-size`, `code-text`).
    - **The continuity check.** The inline 1199-to-1200 check sits in `type.test.ts:135`, `font.test.ts:83`, `fieldset.test.ts:46`, and `mixins.test.ts:268`. It is neither acceptable repetition nor worth extracting, because it cannot fail on its own. Each site already asserts the 1199 and 1200 readings within 0.005 of the oracle. The oracle's own step across the boundary is at most (0.9·106 − 18)/1200 ≈ 0.0645px for the largest retune (`h6` at 106px). So the difference between readings stays under 0.075px whenever the oracle assertions pass.
    - **Mutation for the continuity check.** A cap that jumps at 1200. The oracle assertion at 1200 reddens first, so the continuity assertion never distinguishes a case the oracle assertions miss. Fix: delete the 4 blocks and their `readings` maps. The no-jump property is already pinned at `setupStyles.test.ts`, around lines 1527-1528 (100.93925 at 1199, 101 at 1200). If the brief's literal criterion must stay, see Referral R1.
    - **Naming the threshold table.** `TYPE_THRESHOLD_CASES` (`setupStyles.ts:3270`) names a "threshold", while its own TSDoc, the Sass comment, and the guide all say "floor". Its `TYPE_` prefix places it with the class tables, but only `heading.test.ts` consumes it, beside `TEXT_HEADING_CASES`. Its case title, "resolves the $twin size from a $value retune of the $token token…" (`heading.test.ts:57`), names the action rather than the property it proves. Fix: rename it to the floor term, for example `TEXT_FLOOR_CASES`, and retitle the case, for example "holds a size retuned under the 1.25rem floor and scales one retuned over it at each journey viewport".

    Counts the report states, checked against the logs:
    - After the source change: 34 failed and 1398 passed of 1432, all in 3 files. Matches.
    - `test:src:styles`: 115 files, 1439 passed; baseline 1432. Matches.
    - `test:setup` first run: 5 failed, 303 passed, 12 skipped of 320 (`apt-gate-test-setup.log.txt:116`); rerun 320 passed. Matches.
    - `test:conformance` 26 and `test:guides` 20. Match.
    - Final proofs: 119 passed (`apt-proofs.log.txt:480`). Matches.
    - Baseline over the owned proofs: 34 failed and 39 passed of 73. Matches.
    - Mutation fails 3, 2, 38, 40, 40, 10, and 11. Match.
    - "Load average 16.9" does not appear in the log lines I read. It is UNRESOLVED.
    - "Three proofs pass by design" is wrong. See claim 7.

**Rendered surface — NOT-EVIDENCED.** I read these frames in `/home/user/veneer-apt/tmp/capture/states/`:
- `font-sizes--{light,dark}-{390,1280}.png`
- `badge-at-heading-scale--{light,dark}-{390,1280}.png`
- `form-label-legend--{light,dark}-{390,1280}.png`
- `showcase--{light,dark}-{390,1280}.png`
- `display-values--light-390.png`, `responsive-display--light-1280.png`, `print-display--light-390.png`

For corroboration I also read the base frames `/home/user/veneer/tmp/capture/states/font-sizes--light-{390,1280}.png`, `badge-at-heading-scale--light-390.png`, and `showcase--light-1280.png`.

- **Shown.**
  - In `font-sizes` at 390, `.fs-1` to `.fs-3` render smaller than at 1280, and `.fs-4` to `.fs-6` are equal. The base 390 frame matches the 1280 layout.
  - The showcase `h1` ("Veneer") is visibly smaller at 390.
  - The `.h3` heading in `badge-at-heading-scale` is slightly smaller at 390.
  - `font-sizes` and `showcase` at 1280 match the base frames.
  - No clipping or overflow appears in any frame read.
- **Not shown: display classes.** No frame renders a `.display-*` type class. The `display-values`, `responsive-display`, and `print-display` scenarios are `d-*` utilities, so nothing shows the display sizes or whether they overflow. Missing capture: a `.display-1` to `.display-6` specimen at 390 and 1280, light and dark.
- **Not shown: the legend.** The `form-label-legend` scenario renders `legend.col-form-label` (`tests/setup.ts:1593-1596`), which takes body size at both widths ("Pickup"). So the frame cannot show the legend's fluid size. Missing capture: a bare `<fieldset><legend>` specimen.
- **Not shown: lead.** No scenario name holds `lead`.

**Findings outside the claims**

- **F1 — an inline case matrix.** `tests/src/styles/mixins.test.ts:235-239` declares an inline object table (`[{ size: 3, root: 16 }, { size: 1, root: 16 }, { size: 2.25, root: 20 }]`). `.claude/rules/tests.md:187` says: "Data tables and case matrices belong in a setup file at any size". It is the only inline object table under `tests/src/styles` (a grep for `it.each([` finds only string lists elsewhere). Fix: move it to `tests/setupStyles.ts` as a frozen exported table with TSDoc, register it in `setupStyles.test.ts`, and import it here.
- **F2 — one term for two concepts in § Font utilities.**
  - `guides/veneer.md:6154-6155` says "The release writes none of these entries responsive". Line 6163 then introduces "the release's responsive rule" for the same size entries, so "responsive" means both "takes a breakpoint infix" and "scales with the viewport" within 10 lines. Fix: write "none of these entries takes a breakpoint infix" at line 6154.
  - Line 6171 says "after the walk", but this section never introduces a walk. Fix: write "after the entries" or "after every size class".

**Attacked and held**
- **Claim 3, the dark theme key.** The ledger's dark-key cross-check failed before the guide edit (`apt-conformance-pre-guide.clean.txt:12-115`), and the final run passes 26. It held.
- **The `<h1 class="fs-6">` proof.** The important mutation does not redden it, because the 16px fluid value equals 16 at every width. That is correct: the proof binds layer precedence, not the cap's `!important`, and the tag's 26.28 and 36 readings separate class-wins from tag-wins.
- **The legend as one rule.** `legend` now writes one rule body with a nested cap. The compiled cascade shows a single `legend{…}` rule with the cap bubbled into a sibling `@media` block, as the release does.
- **Design fit.**
  - `_font.scss` builds a separate `$caps` map instead of reusing the `font-size` mixin. I accept this: the utility caps need `!important` and must follow the entries, which the release also does (`bootstrap.css:11998`).
  - § Font utilities is the rule's only prose home, even though most of the rule's selectors are elements and components. The guide has no typography section to host it. I record this as an observation, not a finding.

**Referrals**
- **R1, to the Orchestrator.** `ap-type-brief.md` Execution step 3 required "the readings at 1199 and 1200 differ by less than 0.1px". Under the oracle assertions that bound cannot fail (claim 10). Decide between two options:
  - Strike the criterion and delete the 4 blocks. I recommend this.
  - Keep it and grant `tests/setupBrowser.ts`, which the report says the unit neither owned nor shared, so a single reader carries it.
- **R2, to the objective lane.** The report says `npm run format -- <files>` expanded to a tree-wide `oxfmt --write .`, and the unit also ran `npm run build:src`. Both ran inside `/home/user/veneer-apt` while AP-COLOR was live in `/home/user/veneer-apc`. `.agents/orchestration.md` § Permission floor says "Concurrent executors never run tree-wide `format`, lint `--fix`, or `build`". The brief's own instruction, "Run `oxfmt` through `npm run format`", led to the tree-wide format. The objective lane decides whether disjoint worktrees satisfy that rule.
- **R3, to the Orchestrator.** The portfolio has no `.display-*` type specimen and no bare `legend` specimen, so the rendered claim cannot close without them.
- **R4, to the Orchestrator.** I did not verify which commit produced the base frames in `/home/user/veneer/tmp/capture/states/`. My "same at 1280 as before" readings rest on the assumption that those frames are `712ae72`.

VERDICT: FAIL 7, 9, 10, rendered surface; outside the claims: F1, F2
