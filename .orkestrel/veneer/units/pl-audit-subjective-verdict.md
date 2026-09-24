**Verdict: PREFLIGHT-HOST (`pl`) audit, round 1, subjective lane**

I held the subjective lane: shape, names and placement, how honest the emulation is, and guide voice and truth. I read the evidence only and ran nothing. Every claim about a proof below rests on the retained logs, and I name the mutation behind it.

**Dispatch note.** The brief tells the lane to use `git -C /home/user/veneer-pl show fc3ddfe:<path>` to read base files. A read-only lane holds no shell and can't run that command. I didn't need it, because the diff and the patch carry the base text of every changed line.

**Orchestrator's given ruling.** The ruling is that a staged rule set stands in for the Chromium 153 defaults. It stands, but only within this bound:
- **What the stand-in covers.** It proves the population no longer depends on the build (the `table` border rows) and the value no longer depends on it (`select` height 21px).
- **What it can't cover.** It can't show that a `select` element's content height holds across the reset on a real Chromium 153. The staged `contain: size; contain-intrinsic-height: 21px` pins the content box, so on the staged pass that comparison holds by construction.
  - Evidence: `/home/user/veneer-pl/tests/setupStyles.ts:1847` and the remarks above it.
  - The pinning also collapses the content width: `select | width` reads `69px -> 67px` unstaged and `22px -> 20px` staged (`pl-classify.out.txt:171`, `:370`).
- **What still settles it.** The engine session's green reading on its Chromium 153 host is the only receipt for that property. D45's carrier clause already names that reading.

## Per-claim verdicts

1. **CONFIRMED** (scope).
   - `pl-status.txt:1-3` lists exactly `tests/service/tailwind/preflight.test.ts`, `tests/setupStyles.ts`, and `tests/setupStyles.test.ts`.
   - `pl-shared.patch:1-2` touches only `guides/veneer.md`. No off-limits path appears.
   - The brief's Law line puts case populations in setup files, so the added tables sit in `tests/setupStyles.ts` under the brief's "name the setup file you edit" grant.

2. **BROKEN** (the classification).
   - **Defect.** The report puts "every `tab-size` row" in the declared class, "from the universal rule and the `html` rule" (`b-preflight-host-report.md:18`).
   - **Contradicting evidence.** The unit's own probe marks every `tab-size` row except the `html` one as a consequence, for example `hr | tab-size | 8 -> 4 | CONSEQUENCE` (`pl-classify.out.txt:11`) and the same for `a` (`:51`). The universal rule declares no `tab-size`. Those rows inherit the `html` rule's `tab-size: 4`.
   - **What still holds.** The comparison is unharmed, because the inherited value is the same on every build. The rest of the classification matches the probe: the form-control `height` rows, `text-decoration-color`, the logical padding rows, and `width`.
   - **Fix.** Move the non-`html` `tab-size` rows into "consequences with a build-independent value", with the reason "inherits the `html` rule's `tab-size: 4`".

3. **BROKEN** (the comparison's title; its behaviour holds).
   - **Defect.** The case title at `/home/user/veneer-pl/tests/service/tailwind/preflight.test.ts:152` promises that the case "holds every move the profile makes to its recorded preflight value". The case deliberately doesn't do that for height:
     - It routes every `PREFLIGHT_DIMENSIONS` move to a content-extent comparison (`:194-202`).
     - It refuses any recorded height row (`:222-230`).
   - **Proof that the title is false.** M5 records `select | height | 18px`, which is exactly what the title promises, and the case reddens (`pl-mutations.log.txt:69-82`).
   - **Second defect.** The suffix "under Chromium 153" names a build the case never ran on. It runs a staged stand-in on a Chromium 141 host. The control title at `:109`, "stages the Chromium 153 defaults", overstates in the same way.
   - **Behaviour, confirmed on these mutations:**

     | Behaviour | Mutation and failing assertion |
     | --- | --- |
     | Every other move is recorded | M3 and M4, on the `measured`-not-recorded assertion at `:220` |
     | Every recorded row is resolved | M1b, which leaves `iframe \| display \| block` and `svg \| display \| block` unresolved at `:221` |
     | Declared pairs are refused | M12, at `:222` |
     | Moved dimensions hold their content extent | M6, `input \| height \| 21` against `22` |
     | Declared properties are kept | M2 |

   - **Run evidence.** The prior comparison ran red on the staged pass only (`pl-red-baseline.log.txt:8`, `:20-21`, `:33-39`). The green run reads `4 passed (4)` (`pl-green.log.txt:7`).
   - **Fix.** Retitle the case to match what it proves, for example: "keeps every property the elements layer declares, holds each moved dimension to its content extent and every other move to its recorded preflight value, under %s". Relabel the staged row "staged Chromium 153 defaults", or an equivalent label, so that neither title names a host it didn't run on.

4. **CONFIRMED** (the emulation), within the bound on the Orchestrator's ruling.
   - **Placement.** The staged sheet is `@layer theme.defaults` (`setupStyles.ts:1847`). The setup proof binds every row to `<first cascade layer>.defaults`, and M9 reddens it (`pl-mutations.log.txt:121-130`).
   - **Readings reproduced.** The staged run matches the engine session's reading (`host-chromium-153-reading.md:15`):

     | Reading | Staged result |
     | --- | --- |
     | `select \| height` | `23px -> 21px` (`pl-classify.out.txt:366`) |
     | `select \| background-color` standalone | `rgb(255, 255, 255)` (`:369`) |
     | `table` border-color rows | absent (`:292-296` against `:93-96`) |

   - **Mutations.** M8 (an empty staged sheet) reddens only the control, through the `table` border colour check: `rgb(128, 128, 128)` against `oklch(...)` (`:110-119`). It leaves the pairing green, which proves the control is load-bearing. M7 (a top-level layer) reddens the control through the background check (`:96-108`).
   - **Precision note.** The control on its own proves the staging sits beneath the profile. It doesn't prove the staging sits beneath the whole cascade. That half rests on the setup proof (see Referral R4).

5. **CONFIRMED** (the mutations).
   - Each of M1a, M1b, M2, M3, M4, M5, M6, M12, and M13 reddens on the assertion the report's table names (`pl-mutations.log.txt:1-181`).
   - One `pl-mutations.sh` pass ran them all (`pl-mutations-driver.log.txt:1`).
   - M11's message, `'height | margin-top'` against `'height | '`, has the post-lint prefix-string form. Because the pass was a single run, the whole pass follows the lint restructure.

6. **BROKEN** (names and placement; the stated behaviour holds).
   - **Duplicated type.** The dimension row type `readonly [dimension: string, edges: readonly string[]]` is written inline in two exported declarations: `setupStyles.ts:1144` and `:1825-1826`.
     - It is a reusable type. The file's precedent is the named `PreflightDeparture` interface beside it (`:1064`).
     - `AGENTS.md` requires reusable types to be defined once ("ALWAYS define reusable and public types").
     - `computeContentExtent` is the only helper in the file whose parameter is an inline tuple.
   - **One slot, three names.** The helper's parameter is named `dimension`, its first member is labelled `dimension`, and the body destructures that member as `name` (`:1146`). The test file uses `([name]) =>` at `preflight.test.ts:119` and `:194`, and `([dimension]) =>` at `:227`. This breaks the "one concept, one term" law.
   - **What holds.**
     - Both tables are frozen, exported, and carry TSDoc.
     - The helper follows the `compute*` form and its border-box and content-box behaviour is correct.
     - M9, M10, and M11 redden (`pl-mutations.log.txt:121-152`).
     - Placement is right: the tables sit in the data section beside `NEUTRAL_MARKUP`, and the helper sits beside `readPreflightDepartures`.
   - **Fix.**
     - Declare one exported `PreflightDimension` type beside `PreflightDeparture`.
     - Type `PREFLIGHT_DIMENSIONS` as `ReadonlyArray<PreflightDimension>` and the helper's parameter as `PreflightDimension`.
     - Call the slot `dimension` in the helper body and in every `find` and `some` callback.

7. **BROKEN** (the guide).
   - **False universal.** The patched guide says "Every measured move is a row of the following table" (`pl-guide-patched.md:2755-2756`).
     - Height moves are measured, and the proof records none. `sized` is held apart from `measured` at `preflight.test.ts:194-202`.
     - The guide's own earlier sentences say the same: "other than a form control's height" at `:2735-2736` and "The table records no height" at `:2746`.
   - **False comparison of readings.** "...and reads the same under both" (`:2760`) is false.
     - The readings differ: `select` height ends at 18px on one pass and 21px on the other, and the `table` border colours move only on the host pass (`pl-classify.out.txt:93-96`, `:167`, `:366`).
     - What is the same is the verdict: the proof passes under both.
   - **Overclaimed defaults.** "...under the Chromium 153 `select` and `table` defaults" presents a stand-in as the build's own defaults. The stand-in pins the content box with size containment.
     - That pinning is what makes the 21px content height at `:2745-2747` hold under the profile on the staged pass. The proof doesn't measure it there.
   - **Wording.**
     - "draws a `table` border in the text color" (`:2752-2753`): the standalone `table` border style is `none`, so nothing is drawn. Only the colour resolves.
     - "every row is the value" (`:2756`): a row is not a value; its Preflight cell is.
     - "content box" and "content extent" name one concept in one paragraph (`:2744-2747`).
   - **What passes.** `npm run test:guides` reads `20 passed (20)` (`pl-test-guides.log.txt:11`). The removed `height` rows are correct.
   - **Fix.**
     - Write "Every measured move other than a height is a row of the following table, and every row's Preflight value is the value the profile resolves for its pair...".
     - Write "The proof runs the pairing under the host's own defaults and under a staged stand-in for the Chromium 153 `select` and `table` defaults, placed in a sublayer of the `theme` layer, and passes under both. The stand-in fixes the `select` content box at 21px with size containment, so this proof doesn't measure that height on Chromium 153."
     - Write "resolves a `table` border color to the text color".
     - Use "content box height" throughout.

8. **BROKEN** (report writing; the code law holds).
   - **What holds.** The diff has no `any`, no `!`, and no suppression. The only `as` is `as const` (`setupStyles.test.ts` diff line 293, and the tables). There is no nested function beyond direct anonymous callbacks, and no mock.
   - **Temporal word.** "the new comparison" (`b-preflight-host-report.md:10`).
   - **Count.** "and one more" (`:88`) tallies failing rows. The log names the second row: `svg | display | block`.
   - **Code tokens with no noun after them.** `:11` ("adds `PREFLIGHT_BUILDS`, `PREFLIGHT_DIMENSIONS`, and `computeContentExtent` to the export list"), `:25`, `:26`, and `:32` ("`width` also moves").
   - **Gate evidence not in the logs.** The lint and check logs print neither an exit status nor a result line (`pl-gate-lint.log.txt:1-4`, `pl-gate-check.log.txt:1-28`). The report's "exit 0" for those gates is therefore not "as its log prints it". See R3.
   - **Counts the report states:**

     | Location | Text | Ruling |
     | --- | --- | --- |
     | `:7` | "Diffstat: 3 files changed, 284 insertions(+), 54 deletions(-)" | A tally of files, reported with no producing command |
     | `:88` | "and one more" | A tally |
     | `:9` | "the two values" | A fixed pair, so permitted |
     | `:64`, `:70`, `:87-100`, `:113-118` | Quoted result lines | Measurements with their runs, so permitted |

## Findings outside the claims

None.

## Referrals (to the Orchestrator and the objective lane; no verdict from this lane)

- **R1 (Orchestrator).** A guide sentence the patch didn't touch is false for tab size: "The border style and the tab size move on every overlapping element, because the reset's universal rule declares them" (`pl-guide-patched.md:2738-2740`). The evidence is `pl-classify.out.txt:11`. The sentence lies outside this unit's owned rows, so it needs a named carrier.
- **R2 (Orchestrator).** D45 still states that the proof "asserts the standalone value differs from it" (`decisions-round-2.md:538`).
  - The unit removed that assertion because it always passed (`pl.diff:163`), and removed the guide sentence stating it.
  - The decision record and the shipped proof now disagree. Amend D45 or record the departure.
  - `host-chromium-153-reading.md:15` names the old case title.
- **R3 (objective lane).** Three gate readings rest on the writer's report alone:
  - The lint and check exits aren't in their logs.
  - `pl-test-service.log.txt:12` (start time 14:41:47) predates the lint restructure. The first log with post-lint line numbers is `pl-worktree-unpatched.log.txt`, which started at 14:42:38. So the only full-service reading is of a superseded tree.
- **R4 (objective lane).** The claim "beneath the cascade" is bound only by the setup proof's per-row `theme.defaults` equality.
  - A staged `@layer base.defaults` would, by derivation, leave the control case green. Confirm by running it.
  - Also confirm that the built cascade's `theme` layer declares no earlier sublayer. Its first bytes are `@layer theme{:root{--vn-…` (`/home/user/veneer-pl/dist/src/styles/index.css:1`).
- **R5 (objective lane).** The dimension exemption matches by property name on every tag (`preflight.test.ts:194`, `:227`). The guide justifies it for form controls only, and preflight also declares `height: auto` on `img` and `video`. Settle whether a declared height move on a non-form-control tag could leave the recorded population unnoticed.

## Attacked and held

- **An emulation that never reaches the page.** M8 falsifies the pairing alone but not the pairing plus the control.
- **Is dropping the `not.toBe` assertion a loss?** No. It sat inside the branch where `settled !== value` already held, so it could never fail.
- **Tables named after their key rather than their content.** `PREFLIGHT_BUILDS` holds staged user-agent sheets under a build label. I retained this, because the TSDoc states that the table is "keyed by the build they stand for".
- **The empty `@layer theme.defaults {}` host row.** It has a stated cause: Playwright's `addStyleTag` method refuses empty content. The per-row placement proof binds it.

VERDICT: FAIL 2, 3, 6, 7, 8; outside the claims: none
