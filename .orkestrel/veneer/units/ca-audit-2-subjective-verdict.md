I held the **subjective** lane: `reviewer` on Opus 5.5, read-only, clean context, running nothing. Every ruling comes from reading the retained diff, patch, report, logs, tools, and worktree files. Paths are relative to `/home/user/scaffold/.orkestrel/veneer/units/` unless absolute. `worktree` means `/home/user/veneer-ca`.

The round fails on claim 7 and on two findings outside the claims. Claim 7 fails because the patch log does not record the worktree apply check the claim says it records. Both outside findings are small test-naming fixes in the owned test files.

## Per-claim verdicts

**1. Delta and scope: CONFIRMED.**
- `ca-2-status.txt:1-4` lists the four owned files as `??` and nothing else. `ca-2.diff` touches only those four files.
- `CarouselSection.ts` did not change: `ca-instruments-2/logs/round-delta.diff.txt:60` reads "unchanged".
- The line totals are consistent with that delta:
  - `_carousel.scss`: the comment grows from 4 to 5 lines, which gives 207.
  - `carousel.test.ts`: the fade comment gains 2 lines, which gives 576.
  - `CarouselSection.test.ts`: the contrast case gains 9 lines, the height case adds 35, and the advancing case loses 3, which gives 255.
- The file list in `ca-shared-2.patch` equals the Shared row (`ca-instruments-2/logs/patch.log.txt:3-16`).
- Compared with `ca-shared.patch`, only two files changed:
  - `constants.ts`: the copy at `:34`, the TSDoc at `:42-46`, and the remark at `:45-46`.
  - `guides/veneer.md`: the theme-scope paragraph at `:149`, the region pointer at `:172-173`, and the Bootstrap-variables paragraph at `:205`.
- The `tests/setupStyles.ts` hunk is identical in bytes. Round 1 (`ca-shared.patch:164-225`) reuses the next doc comment's `/**` as context. Round 2 (`ca-shared-2.patch:670-732`) inserts before it. The resulting file is the same.
- The only removed lines are the two M8 paragraphs (`ca-shared-2.patch:193-200` and `:243-245`). No hunk touches a vendored file, a sibling unit's file, `src/browser/**`, `src/core/**`, `tests/fixtures/**`, `package.json`, `README.md`, or `ROADMAP.md`.

**2. The mutations and the matrix: CONFIRMED.**
- `ca-instruments-2/tools/mutate.py` adds the four mutations the claim names:
  - `next-display-dropped` (`:18`)
  - `prev-display-dropped` (`:19`)
  - `fade-active-dropped` (`:25`)
  - `next-right-dropped` (`:36`)
- Each one reddens its named case in `logs/mutations.summary.txt`: `:9-13`, `:14-18`, `:33-35`, and `:60-61`.
- The per-row logs carry `RUN  v4.1.11 /home/user/veneer-ca/tmp/probe/base` (for example, `mutations/next-right-dropped.log.txt:11` and `mutations/fade-active-dropped.log.txt:9`). The control reads `17 passed (17)` (`summary:1`).
- The matrix rows name the right cases:
  - `.carousel-item-next` and `.carousel-item-prev` name the display mutations (`b-modal-ca-report-2.md:175-176`).
  - The guard rows name `advance` (`:177`, `:179`).
  - The fade-active row names `fade-active-dropped` (`:182`).
  - The next-control row names `next-right-dropped` (`:192`).
- Every mutation the matrix names is a row in either the styles record or the section record.
- The lone-slide case reddens under both display mutations (`summary:11`, `:16`) and not under either guard mutation (`summary:19-24`).
- Mutations named and whether the assertions distinguish them:
  - `next-right-dropped` is caught by `expect(controls[1]?.getBoundingClientRect().right).toBe(frame.right)` (worktree `carousel.test.ts` around line 333). The carousel's inline `padding-left: 40px` leaves an unpinned control at its static position, so the assertion tells the two apart.
  - `next-display-dropped` is caught by the display case's `toEqual(['none','block','block','block','none','none'])`. Only the incoming entry flips, so this assertion also tells them apart.

**3. The height case: CONFIRMED.**
- The title is at worktree `tests/app/browser/sections/CarouselSection.test.ts:180`. It names what the case proves, in the tree's verb-first voice.
- The case collects slides with `'.carousel-item.active, .carousel-item-next'` from every entry in `CAROUSEL_SPECIMENS` (`:185-198`). It then makes three assertions:
  - every specimen contributes a slide (`:199-201`);
  - every picture is taller than zero (`:202`);
  - the slide heights equal the picture heights as `{ name, height }` lists (`:203-205`).
- The advancing case no longer asserts a height (`round-delta.diff.txt:175-177`, and the worktree's advancing case).
- The shape reads well: a failure names the specimen and both heights.
- Mutation named: `stray-block`. It reddens the height case with `"height": 207` expected against `228` received for `Captioned carousel` (`section-mutations/stray-block.log.txt:9-11`, `:36-39`). Round 1's proof stays at `5 passed (5)` (`round1-section-hole/stray-block.log.txt:9-10`). The assertion tells the mutation apart.
- The rival cases are covered too: an empty selection fails the specimen-set assertion, and pictures of zero height fail the `picture <= 0` assertion.

**4. The contrast case: CONFIRMED.**
- The title is at `:129`.
- The case reads every `.carousel-item` in the `Captioned carousel` and `Inverted carousel` specimens (`:134-135`). It parses each `rect` and `path` fill (`:142`), asserts that each shape list reads `rect,path` (`:158`), and asserts that no slide's lowest ratio falls under 4.5 (`:159`).
- Mutation named: `path-lightened`. The lowest ratio drops to `1.3021563367987066` on "North pier at dawn", which is red (`section-mutations/path-lightened.log.txt:9-11`, `:36-43`). Round 1's proof stays at `5 passed (5)` (`round1-section-hole/path-lightened.log.txt:9-10`). The assertion tells the mutation apart.
- A rival mutation that reads only the backdrop fill would fail the shape-list assertion, because `Math.min` over one fill cannot hide the missing shape.
- The same case also asserts something its title does not name. That is finding FADE-IN-CONTRAST, outside the claims.

**5. The comparator: CONFIRMED** (on the controls the F1 ruling names).
- `ca-instruments-2/tools/cascade-check.mjs` has a branch for each red condition the claim lists:
  - the expanded compile (`:157-160`);
  - missing, extra, and reordered keys (`:195-202`);
  - a block outside the components layer (`:183`);
  - an unrecorded value difference (`:231`);
  - declaration order, red in expanded mode and a notation in built mode (`:241-245`);
  - the icon URI (`:246-252`).
- The clean runs are green:
  - Expanded: `logs/cascade/clean-expanded.log.txt:54`. It has only `DEPARTURE` lines and `ICON … equals` lines (`:40-53`).
  - Built: `summary.txt:2`.
- The negative controls are red and the restored runs are green (`cascade/summary.txt:3-9`). In the built swapped-URI run, `RED DIFF` and `RED ICON` appear at `swapped-uri-built.log.txt:82`, `:84`.
- The keys and the `DEPARTURE` lines equal round 1's reading (`ca-instruments/logs/gates/cascade-expanded.txt:2-51`), in the same order and one to one.
- Mutations named: `planted-rule` gives `RED EXTRA-RULE`, and `swapped-uri` gives `RED DIFF` plus `RED ICON`. The instrument tells both apart.
- The `MISSING`, `ORDER`, `LAYER`, expanded-mode `DECLARATION-ORDER`, and `STALE-DEPARTURE` branches never ran red under a control. That coverage is referred as R-A.

**6. The copy, the tokens, and the reason: CONFIRMED.**
- `CAROUSEL_COPY.paragraph` matches the claimed text exactly (`ca-shared-2.patch:34`). It is one imperative sentence that opens on "Compare", as M14 requires (`b-modal-design-verdict.md:36`). It follows the ALERT copy's single-sentence form (`/home/user/veneer/app/browser/constants.ts:1446`).
- The worktree `_carousel.scss:6-10` writes the ruled phrases, and each class token is followed by the noun "class" or "classes".
- The TSDoc writes "the `active` class marks the resting slide and its indicator" (`ca-shared-2.patch:42-43`).
- The remark ends "attribute, and each name is unique…" (`:45-46`) and has no "utility this cascade does not ship" clause.
- In `carousel.test.ts`, the comment at `:518` reads "omits one of its variables", and the title at `:520` reads "retunes every carousel variable…".
- The guide matches the claim at each site:
  - "declare the `--bs-carousel-*` variables" (`ca-shared-2.patch:149`);
  - "measures the same variables" (`:205`);
  - "Each control is named by its `aria-label` attribute." (`:172-173`).
- The § Showcase paragraph (`:277-280`) is identical to round 1's (`ca-shared.patch:688-691`). The region pointer changed only in the R1 sentence and its rewrap.
- Voice:
  - The passive "is named by its `aria-label` attribute" follows the tree's CLOSE precedent, "is named through its aria-label attribute" (`/home/user/veneer/app/browser/constants.ts:1509`).
  - The copy repeats the region pointer's own list (`ca-shared-2.patch:169-170`), so the showcase and the guide describe the same experience.

**7. The gates and the patch check: BROKEN** (on one clause).
- Held:
  - `logs/gates/summary.txt:1-12` records every named gate at exit 0, with the claimed result lines. The per-gate logs agree: `styles.log.txt:146`, `app.log.txt:7`, `guides.log.txt:11`, `policy.log.txt:11`, `setup.log.txt:32`, and `conformance.log.txt:11`.
  - `patch.log.txt:31-35` records the reverse apply, the quiet diff, `apply --check` exit 0, and the re-apply.
- Broken:
  - The claim says `logs/patch.log.txt` records "the worktree's `git apply --check` exit 0". The log ends at `:35`, "shared files back at their patched digests", and has no worktree line.
  - `tools/make-patch.sh:22-27` never runs a worktree check.
  - The report asserts the check under "`logs/patch.log.txt` records each step" (`b-modal-ca-report-2.md:377-379`, `:391-392`). That assertion has no retained evidence, so the underlying fact is UNRESOLVED.
- Smallest fix: run `git -C /home/user/veneer-ca apply --check /home/user/veneer-ca/tmp/units/ca-shared-2.patch` and add its exit line to the retained `patch.log.txt`, or strike the clause from the record.

**8. Law and report: CONFIRMED.**
- Code law holds:
  - A sweep of the added lines in `ca-2.diff` and `ca-shared-2.patch` found no `any`, no `@ts-` directive, no `eslint-disable`, and no `vi.fn`, `vi.mock`, or `vi.spyOn`. The only `as` outside prose is `as const`. The only `!` is not-equal (`!==`) or `.not.` — no non-null assertion.
  - No nested function exists outside callbacks passed directly.
- The SCSS holds: colors come from `var(--vn-…)`, `map.get(tokens.$dark, …)`, the `transparent` keyword, and the recorded data URIs (`ca-2.diff:106-211`).
- The prose sweep over `ca-2.diff` and `ca-shared-2.patch` used the substitution-table pattern, case-insensitive. The hits are all in permitted senses:
  - "at once", meaning immediately (`ca-2.diff:397`);
  - "above the others", meaning stacking (`ca-shared-2.patch:125`);
  - "once each", a count of one each (`:625`, `:675`, `:679`).
- Code tokens are followed by a noun, for example "the `:not(.carousel-item-start)` guard", "the `transition` mixin", and "the `grayscale(100)` amount". CSS custom properties stand as their own nouns.
- The report writes no `new` or `now` and names no list item by position. It records each gate's command and result (`:357-373`) and bounds every settled choice the claim names (`:402-429`). One of those bounds is inaccurate; see FADE-COMMENT.

The report states these counts, listed for the record:
- the diffstat: "207 insertions", "576 insertions", "20 insertions", and "255 insertions" (`:35-36`);
- "`13 files changed, 427 insertions(+), 11 deletions(-)`" (`:37`);
- quoted defect text in the "Before" lines: "the three variables", "all three variables", "the three `--bs-carousel-*` variables", and "the same three variables" (`:75`, `:78`, `:87`, `:90`);
- the run tallies:
  - `17 passed (17)`, and the `1 failed | 16 passed (17)` through `5 failed | 12 passed (17)` column (`:223-257`);
  - `6 passed (6)`, `1 failed | 5 passed (6)`, and `2 failed | 4 passed (6)` (`:272-283`);
  - `5 passed (5)` (`:289-291`);
  - `34 passed (34)`, `11 passed (11)`, `19 passed (19)`, `109 passed | 1 skipped (110)`, `253 passed (253)`, and `22 passed (22)` (`:365-370`);
- "one regular expression" (`:407`).

The `4.5:1` ratio, the `1500-second` cap, `100 columns`, `v4.1.11`, and the hex fills are values, not counts.

## Findings outside the claims

**FADE-IN-CONTRAST: the contrast case asserts fade behaviour its title does not name.**
- Site: worktree `tests/app/browser/sections/CarouselSection.test.ts:165-170`. The case titled `holds each caption to 4.5:1 against every fill its picture paints, …` (`:129`) also asserts that the `Fading carousel` resting slide reads opacity `1`.
- The fading specimen has no caption, so this assertion has nothing to do with caption contrast.
- The effect shows in the report's matrix: `.carousel-fade .carousel-item.active` → section `fade-class-dropped` → section `contrast` (`b-modal-ca-report-2.md:182`), and `section-mutations.summary.txt:16-17`. A maintainer reading the matrix is told that dropping the fade class breaks a contrast proof.
- This breaks the brief's rule that a test is named for what it proves (`ca-brief-2.md:25`). R2 retitled the case this round, and the sharper title makes the mismatch plain.
- Right looks like: move the fading assertion (`:165-170`) into its own case titled for what it proves (for example, `paints the fading carousel's resting slide at full opacity`) or into the contract case. Then update the matrix row to name that case.

**FADE-COMMENT: the fade case's comment names only some of the mutations the matrix routes to it, and the report says it names all of them.**
- Site: worktree `tests/src/styles/components/carousel.test.ts:177-180` names two mutations: the delay dropped, and the resting slide dropped from the stacking rule.
- The matrix routes three more `fade`-only rows to this case:
  - `fade-item-opacity-dropped` (`b-modal-ca-report-2.md:181`);
  - `fade-incoming-dropped` (`:183`);
  - `fade-prev-incoming-dropped` (`:184`).
- The report says "the display and fade case comments name the mutations those cases catch, so each comment matches the matrix" (`:416-417`). That holds for the display comment (`:56-58`) and is false for the fade comment. "The mutations this catches are …" reads as a complete list, so the comment understates what the case proves.
- Right looks like: reword `:177-180` to cover every mutation the matrix routes to `fade`. For example: "The mutations this catches are a fade rule that stops hiding the other slides, a stacking rule that drops the resting slide or either incoming slide, and the outgoing slide's delay dropped …".

## Attacked and held

- **Copy wording.** I checked whether "Compare …, and hover or focus a control to compare its states" repeats "compare" or garden-paths the reader after the list's own "and". The sentence still parses on first read, and it is the verbatim ruled text. I did not raise it.
- **The height comment's word "beside"** (`CarouselSection.test.ts:179`). The stray block lays out below the picture, not beside it. The word is loose rather than wrong, so it is not a finding.
- **"all three"** in the controls comment (worktree `carousel.test.ts` around line 505) counts the light, dark, and consumer readings that the same sentence names. It is permitted, and it is outside this round's delta.
- **The contrast case reads non-displayed slides.** A `display: none` caption still resolves its computed color, so the readings are valid for every slide.
- **The report's apply command** `git -C /home/user/veneer-ca apply tmp/units/ca-shared-2.patch` (`:397`) resolves, because `/home/user/veneer-ca/tmp/units/ca-shared-2.patch` exists.
- **Case shapes.** The dedicated height case follows the section proof's existing pattern of one case per concern (the `names` and `advancing` cases), which fits better than a loop inside the advancing case.

## Referrals

- **R-A (to the objective lane): comparator branches that no control has turned red.** The controls prove `EXTRA-RULE`, `DIFF`, and `ICON`. They do not prove `MISSING`, `ORDER`, `LAYER`, expanded-mode `DECLARATION-ORDER`, or `STALE-DEPARTURE` (`cascade-check.mjs:183`, `:197`, `:201-202`, `:241-245`, `:256-262`). Rule whether claim 5's "reads red on …" list needs a control for each.
- **R-B (to the objective lane): worktree checks with no retained log.** The report says the scoped `oxfmt` and `oxlint` runs over the owned files exit 0 in the worktree (`b-modal-ca-report-2.md:372-373`). No log under `ca-instruments-2/logs/` records those runs, so they rest on the writer's report alone.

VERDICT: FAIL 7; outside the claims: FADE-IN-CONTRAST, FADE-COMMENT