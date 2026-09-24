**Lane held: subjective (Opus 5.5).** The engine that wrote this unit, `opus` on Opus 5.5, is the same engine running this lane.

## Per-claim verdicts

1. **CONFIRMED.** `/home/user/scaffold/.orkestrel/veneer/units/xo-status.txt:1-16` lists only files the brief owns (`b-close-out-brief.md:101-107`), plus `tests/src/styles/fixtures/mixins.scss`, which serves the mixins proof the brief grants. `xo-shared.patch:1-2` touches `guides/veneer.md` alone, and `xo-unscoped.patch:1-2` touches `close.test.ts` alone. No off-limits path appears in the status output.
   - The Orchestrator's ruling holds. The brief's owned and off-limits lists (`b-close-out-brief.md:101-117`) both omit `tests/src/styles/components/close.test.ts`, and that file still reads the constant (`/home/user/veneer-xo/tests/src/styles/components/close.test.ts:19`, around line 94).

2. **CONFIRMED.** The only surviving match for `CLOSE_DEFERRED` outside `close.test.ts` is gone, and the guide has no match for `Overlays` or `CLOSE_DEFERRED`. The close case is at `/home/user/veneer-xo/tests/setupStyles.test.ts`, around lines 3500-3506.
   - Mutation 1: drop `.modal-header .btn-close` from the `CLOSE_SELECTORS` constant only. The Set comparison fails (`xo-mutations.log.txt:52-64`).
   - Mutation 2: plant an `Overlays` deferral row. The owner filter returns a row where `[]` was expected (`xo-mutations.log.txt:36-48`).
   - Both mutations produce a different reading from the passing case, so the assertions tell them apart.

3. **CONFIRMED.** The name `heading-size` is kebab-case and a noun phrase, matching its `breakpoint` and `breakpoints` siblings under `.claude/rules/styles.md:60`. It sits in `_mixins.scss` among the value functions (`/home/user/veneer-xo/src/styles/_mixins.scss:150-157`). All three sites call it (`xo.diff:123,136,149`).
   - Mutation: `9 - $level` becomes `8 - $level`, so `h1` reads `var(--vn-size-7)`. The expectation comes from the hand-recorded `TYPE_HEADING_TOKEN_CASES` table, which does not depend on the function, so the case tells the mutation apart (`xo-mutations.log.txt:1-16`).
   - The byte-equality log `xo-byte-equality.log.txt:1-12` reports every file equal. There is a referral on this instrument (see Referrals).

4. **CONFIRMED.** Every population is taken from the `CAROUSEL_SPECIMENS` table by a class its markup writes (`/home/user/veneer-xo/tests/app/browser/sections/CarouselSection.test.ts:37-38,75-78,99-111,140-145,196-197,255-258`). This follows the toast proof's pattern (`ToastSection.test.ts:83-84`). Each filtered population asserts it is not empty. The rendered-names population is non-empty through the `pictures.length > 0` check at line 50.
   - Mutation: plant a row whose first indicator has no name.
     - At base, the naming case fails only because the region's names differ from the inline list.
     - With the derived populations, it fails on the planted row's own record (`xo-mutations.log.txt:88-107` against `:128-146`). So the derived assertions tell the mutation apart.

5. **CONFIRMED.**
   - Both tables are documented and frozen (`xo.diff:791-804,902-916`).
   - Both join the freeze cases (`xo.diff:604-605,631-641`).
   - Each is bound to its source table (`xo.diff:582-597,613-622`).
   - Both replace the inline pairs (`xo.diff:937-947,966-986`).
   - Mutations: unfreeze the nav table, unfreeze the input-group table, unfreeze one nav row, add a pill row, and use a foreign `--bs-secondary-bg` source. Each fails only its own case (`xo-mutations.log.txt:148-226`), so the assertions tell each mutation apart.

6. **CONFIRMED. The premise ruling is upheld.** At `ec98064`, `/home/user/veneer-xo/guides/veneer.md` line 8785 ends in the `button.click.toggle` step and line 8786 in the `button.pressed.click` step. The case at `/home/user/veneer-xo/tests/setupServer.test.ts:806-811` looks up the `button.pressed.click` row and throws if it is missing. Deleting the row the carrier called a copy would drop that proof.
   - The guide proof reads the rows through a dynamic import (`xo.diff:462`), with no cycle.
   - Mutation: a verbatim copy of line 8785 fails the case (`xo-mutations.log.txt:244-256`). A whole-row copy produces identical JSON, so the case tells it apart.
   - There is a referral on the key choice (see Referrals).

7. **BROKEN.** The stated rule does not produce the order of the § Tests links.
   - **What is right.** The regions (`/home/user/veneer-xo/app/browser/Showcase.ts:159-178`), the barrel exports (`xo.diff:74-92`), and the guide's `### … utilities` sections (patched guide lines 4800-5507) all follow `/home/user/veneer-xo/src/styles/index.scss:83,95-112`. The Showcase proof ran red before the move (`xo-red-region-order.log.txt:8-61`). That proof compares the full list strictly, so it tells a mis-ordered region apart.
   - **Where the rule is stated.** The patched guide, § Showcase (`xo-instruments/xo-shared/guides/veneer.md:9010-9012`), says: "the utility links under § Tests each follow the order in which the `src/styles/index.scss` barrel loads the partial each one is named for."
   - **Where the actual order contradicts it** (`xo-shared/guides/veneer.md:9303-9329`):
     - The vertical-alignment utilities link (`utilities/vertical-align`, barrel line 94) sits after the display link (barrel line 99), not before the float link (barrel line 95).
     - The color-and-background pairs link (`utilities/color-bg`, barrel line 91) sits after the color link (line 109).
     - The visually hidden helpers link (`utilities/visually-hidden`, line 93) sits after the visibility link (line 112).
     - The clearfix helper link (`components/clearfix`, line 82) sits after the float link, although its partial loads before the focus ring partial (line 83).
     - The stretched link helper link (`components/stretched-link`, line 88) sits before the focus ring link and apart from the other § Helper classes links (icon link, ratio, vertical rule, at lines 9285-9287). The report's reason, "no utility section documents it" (`b-close-out-report.md:166-167`), overlooks that § Helper classes documents it (lines 4752-4760).
   - **What the list actually follows.** It follows a second, unstated rule: section order, with each section's companion and helper proofs grouped after its own link. It also carries an unstated exception for the stretched link.
   - **Why it matters.** Every other claim checks prose against the shipped surface. This sentence describes an order the list does not have, so the next unit that adds a utility link will follow the wrong rule.
   - **What right looks like.** In `xo-shared.patch`, keep the region and section clause. Restate the § Tests clause as the rule applied: the utility links follow the sections that document them, each section's own proof first and the helper and companion proofs it documents after it. Move the stretched link helper link beside the icon link, ratio, and vertical rule links that § Helper classes groups it with.

8. **BROKEN.** The report does not quote the build gate's result line.
   - **What holds.**
     - The departure headings (patched guide lines 6167-8471) run in code-unit order. Every candidate sort gives the same order for these keys.
     - The TSDoc field tokens take their nouns (`xo.diff:652-895`). A sample grep over `/home/user/veneer-xo/tests/setupStyles.ts` for a bare field token followed by a verb found none. Coverage was doc-comment lines only.
     - The Alert classes and Carousel classes sections take their nouns (patched guide lines 3985-4038 and 4476-4556).
     - The `TYPE_SPECIMENS` remark names the 390 and 1280 widths (`xo.diff:52-53`).
     - No changed line adds an `any`, an `as`, a `!`, a suppression, or a nested function. The diff removes the `as const` assertions (`xo.diff:941,971`).
   - **The defect.** `b-close-out-report.md:207` reports `npm run build:src` as "exit 0, and the `dist/` directory is byte-equal to the base build", with no quoted line. The log's result line is `✓ built in 2.41s` (`xo-instruments/xo-gate-build.log.txt:56`). Separately, the brief requires each command "exactly as it ran with every argument" (`b-close-out-brief.md:131`), but `b-close-out-report.md:200` writes the placeholder `<every changed owned file>`.
   - **What right looks like.** Quote `✓ built in 2.41s` for the build gate. Replace the placeholder with the exact file arguments.
   - **Counts and temporal words the report states, listed for the record:**
     - Quoted result lines:
       - `Tests  1 failed | 143 passed (144)` (lines 51, 52)
       - `Tests  144 passed (144)` (lines 54, 133)
       - `Tests  1 failed | 14 passed (15)` (line 70)
       - `Tests  15 passed (15)` (line 73)
       - `Tests  4 failed | 140 passed (144)` (line 130)
       - `Tests  56 passed (56)` (line 133)
       - `Tests  1 failed | 19 passed (20)` (line 149)
       - `Tests  1 failed | 3 passed (4)` (line 170)
       - `Tests  299 passed (299)` (lines 208-209, 219)
       - `Tests  12 passed (12)` (line 211)
       - `Tests  71 passed (71)` (line 213)
       - `Tests  20 passed (20)` (lines 215, 218)
       - `Tests  24 passed (24)` (line 220)
       - `Tests  18 passed (18)` (line 222)
     - Quoted assertion text `…(13)` and `…(9)` (line 101).
     - The diffstat `16 files changed, 326 insertions(+), 200 deletions(-)` (line 260). This is a tally of a growable set, quoted as tool output.
     - Diagnostic positions `(19,2)` and `(94,33)` (lines 15-16).
     - Exit values 2, 1, and 0 (throughout).
     - "100 columns" (line 192).
     - Ordinal "the second toggle row" (line 22), which names an item by position.
     - "first indicator" (line 99).
     - Temporal words: "Until" (line 13), "still" (line 51), "already" (line 95). None comes from the banned temporal set.

## Findings outside the claims

None substantiated against this unit.

## Attacked and held

- **Claim 3, placement.** `heading-size` sits between the `breakpoint` function and the `breakpoint-up` mixin, which splits the breakpoint family. That costs cohesion but breaks no rule. Moving it above `breakpoints()` would read better. This is not a defect.
- **Claim 4, contrast case.** Its title keeps the singular "the inverted carousel". It names a population, not a specimen, so it holds.
- **Claim 8, Carousel prose.** "a `30px` by `3px` bar" and "`10px` top and bottom borders": each token modifies a noun in the same phrase. These hold.
- **Claim 5, nav target.** The target moved from `a[href="#one"]` to the `NAV_COLOR_CASES` spelling. That trades exactness for a binding the setup proof checks, which is deliberate and holds.

## Referrals

- **To the objective lane.**
  - The byte-equality instrument (`xo-byte-equality.log.txt`) was never run against a planted difference. Rule whether claim 3's byte-equality rests on an instrument that has failed at least once.
  - No `xo-gate-*` log records an exit code. The report's exit values are the writer's own claims.
  - The ledger case keys a row by every cell, the `status` cell included (`/home/user/veneer-xo/tests/guides.test.ts`, around lines 69-75). If the other cells do not determine `status`, a merge copy that differs only in Status passes the check. Rule whether the key must drop the `status` cell.
- **To the Orchestrator.**
  - The § Showcase paragraph carries merged fragments that predate this unit, at `/home/user/veneer-xo/guides/veneer.md:9014-9017,9041-9043`. The shared patch inserts its order rule into that paragraph and leaves them. The report names no carrier (`b-close-out-report.md:280-283`), so assign one.
  - The advancing carousel case fails on any added valid specimen because of its `readHit` reading after the `scrollIntoView` call (`xo-mutations.log.txt:110-126`). This predates the unit and has no carrier, so assign one.

VERDICT: FAIL 7, 8; outside the claims: none
