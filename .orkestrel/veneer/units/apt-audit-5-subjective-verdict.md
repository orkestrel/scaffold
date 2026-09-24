LANE: apt-5-reviewer

I held the **subjective** lane: sentence truth and voice, naming, and fit with the round-4 seam ruling. The subject is prose, comments and a report, with no rendered surface, so no claim needed NOT-EVIDENCED. I edited nothing and ran nothing.

**Per-claim verdicts**

1. **Scope: UNRESOLVED**
   - **Status:** it holds. `apt-5-status.txt:1-14` lists the same files as `apt-4-status.txt:1-14`, and no new untracked file.
   - **Diff delta:** it holds. Both diffs cover `guides/veneer.md`, `_font.scss` and `setupStyles.ts` only.
     - Every round-4 hunk reappears unchanged in round 5. The font section `apt-4.diff:5-94` matches `apt-5.diff:77-166`, shifted by 2 lines. The ledger and TSDoc hunks also match.
     - The added hunks in `guides/veneer.md` are navbar `apt-5.diff:5-17`, float `:21-36`, shadow `:40-52`, flex `:56-73`, text `:167-183`, and interaction `:187-198` and `:202-210`.
     - I compared each edited paragraph word by word. Only the subject changed.
     - `_font.scss` differs only in the cap comment (`apt-5.diff:658-661` against `apt-4.diff:539-541`).
     - `setupStyles.ts` gains only the `FONT_ENTRY_CASES` TSDoc hunk (`apt-5.diff:806-815`).
   - **Cascade:** undecided.
     - `apt-instruments-5/apt-5-cmp.log.txt:1` holds only `cmp exit=0`. It names no command, no operands and no digests.
     - Only the writer's report (`ap-type-report-5.md:78`) ties that exit code to `dist/src/styles/index.css` and `tmp/units/apt-3-index.css`.
     - The only proof mutation that matters here is any change to the emitted CSS. Nothing in this log could tell that change apart, because it records no operands.
     - Build-time reasoning makes byte identity likely: the `_font.scss` delta is `//` comments, which Sass strips.
   - **What settles it:** an Orchestrator `cmp` run that logs the command and both SHA-256 digests, in the form of `apt-instruments-4/apt-4-cmp-orchestrator.log.txt:1-4`.

2. **N1: BROKEN**
   - **Edited sentences hold.** Each one names the partial whose source does what it says:
     - `_navbar.scss` sits between nav and card in `src/styles/index.scss:63-65`.
     - `_float.scss:6-7`, `_shadow.scss:8-9`, `_flex.scss:7-8` and `_text.scss:9-10` each walk with `breakpoint-each` and write with `utility`.
     - `_interaction.scss:8` writes `user-select` alone.
   - **Unedited sentences mostly hold.** Each of these describes the partial named by its nearest preceding path:
     - validation `:4199` after `:4112`
     - object-fit `:5789` after `:5781`
     - opacity `:5815` after `:5809`
     - overflow `:5835` after `:5829`
     - position `:5921` after `:5919`
     - border `:5994` after `:5968`
   - **Remaining unedited sentences also hold:**
     - spacing `:6093` after `:6069`
     - gap `:6130-6131` after `:6118`
     - background `:6371` and `:6376` after `:6354`
   - **The break is at `/home/user/veneer-apt/guides/veneer.md:3880`.**
     - The sentence reads "This partial writes none of either."
     - Its nearest preceding partial path is `src/styles/components/_button.scss`, in the same line.
     - That partial writes the `.btn-check` rules (`src/styles/components/_button.scss:81-127`). So, read against its antecedent, the sentence contradicts the clause just before it.
     - The partial it means is `_form-check.scss`, which the guide first names at `:3883`. That partial writes no `valid` or `btn-check` rule (a grep of `_form-check.scss` finds none).
   - **The report is wrong about it too:** `ap-type-report-5.md:30` rules this sentence "Holds".
   - **Fix:** at `:3880`, write "The `_form-check.scss` partial writes none of either." This follows the ruling's bound: name the partial, and don't rewrite the paragraph.

3. **N2: CONFIRMED**
   - The whole of `_font.scss:1-63` contains no "responsive".
     - `:15` says "takes a breakpoint infix".
     - `:56-57` says "after the utilities it writes at each breakpoint infix".
   - The `FONT_ENTRY_CASES` TSDoc at `setupStyles.ts:3429` says "No font entry takes a breakpoint infix".
   - No other word changed in either rewrap.
     - The cap comment `apt-4.diff:539-541` and `apt-5.diff:658-661` differ only in that phrase.
     - The TSDoc `apt-5.diff:810-814` differs only in "is responsive" becoming "takes a breakpoint infix".
   - The remaining "responsive" in `setupStyles.ts` (`:1167`, `:2192`) means the fluid rule, and `:2789` is the text context. None of them names the font walk.
   - This is a prose claim, not a proof claim, so no mutation applies.

4. **N4: BROKEN**
   - **These parts hold:**
     - The titles and locations are right: `font.test.ts:274` and `:331`.
     - Both cases read `fs-3` through `FONT_ENTRY_CASES` (`setupStyles.ts:3435`), and both read it relationally (`font.test.ts:284-294` and `:337-349`).
     - Every log named exists.
     - Both cases pass in the baseline log `apt-2-baseline-proofs.log.txt:39,42` and in each mutation log, for example `apt-2-mutation-xxl.log.txt:155,159` and `apt-2-mutation-important.log.txt:125,129`.
   - **False statement one: "so both read a size L1 changes"** (`ap-type-report-5.md:60`).
     - L1 is the round-3 finding on the `FLUID_SIZE_CASES` TSDoc wording (`apt-audit-3-verdict.md:24`; `ap-type-report-4.md:8-10`). That edit is a comment and changes no size.
     - The erratum it restates said "a size this unit changes" (`ap-type-report-4.md:24`).
     - The report also uses the control identifier "L1" without defining it.
   - **False statement two: "None of those supplied mutations touches the property either case reads"** (`:65-66`).
     - The `xxl` mutation (`apt-2-mutate.py:18-20`) rewrites the fluid value of every `.fs-*` class and moves the `.fs-*` cap to `xxl`.
     - The `important` mutation (`:24-26`) rewrites the `.fs-*` cap declaration.
     - Both touch the `font-size` of `.fs-3`, which both cases read. The sentence also contradicts the erratum's own earlier clause.
     - The true statement: no mutation changes the relation each case asserts. The cases pass because each compares a reading against another reading from the same cascade, so a moved size moves both sides.
   - **Fix:** replace `:59-67` with:
     > Both cases read the `.fs-3` size relationally: the `:274` case compares the dark island and the doubled density factor with the resting reading, and the `:331` case compares the classed paragraph before and after the unlayered rule. A mutation that moves the size, such as `xxl` or `important`, moves both readings, and none of the supplied mutations touches the mode, the density factor, or the layer priority these cases assert. So both cases pass on the baseline and under every mutation logged in …
   - Mutations that would redden these cases, a derivation I did not run: making `heading-size` read `--vn-factor-density` reddens `:274`, and dropping `!important` from the fluid value reddens `:331`.
   - **Counts the report states** (`ap-type-report-5.md`):
     - "(both sentences)" at `:42` and `:44` is a tally that names no members.
     - "Both cases" at `:59-61` and "both its prose sentence and its departure bullet" at `:17` name their members, so they are not counts.
     - "N1 to N4" is an identifier range, not a count.
     - The report states no test or file total. The log shows 20 tests passed (`apt-5-test-guides.log.txt:11`), and the report does not quote it.

**Findings outside the claims**

- **F1: the report's Navbar row names the wrong nearest path.**
  - What is wrong: `ap-type-report-5.md:32` and `:48-51` say the nearest preceding path is `_button.scss` and that no navbar path was named nearby.
  - Evidence: the nearest preceding path is `src/styles/components/_input-group.scss`, at `guides/veneer.md:4463`. `_button.scss` is last named at `:4430`.
  - Why it matters: the seam ruling makes the round-5 report part of its interface. The table is the record the Orchestrator reconciles from, and this row is a false reading. The edit it led to is still correct.
  - What right looks like: the row reads "`src/styles/components/_input-group.scss` | Edit: named `_navbar.scss`", and `:48-51` is corrected to match.

**Attacked and held**

- **Short path form.** "The `_x.scss` partial" matches round 4's font edit at `:6187` and the guide's existing short names `_tokens.scss` (`:4397`) and `_spacing.scss` (`:6401`).
- **Other "responsive" sites.** The font section still says "responsive" at `:6163` and `:6200` and in the ledger rows. Each of these names the release's fluid size rule, not the walk.
  - Sibling sections still use "responsive" for the walk: shadow at `:5883` and text at `:6233`.
  - The round-4 ruling scoped the invariant to the font context, and round 4's subjective lane explicitly allowed those siblings (`apt-audit-4-subjective-verdict.md:67`). I keep that ruling rather than reopen it.
- **Rewraps.** Every edited paragraph keeps its words. The format check passed.

**Referrals**

- **To the Orchestrator, claim 1's cascade clause:** it needs the Orchestrator's own logged `cmp` with digests. The objective lane can settle it by running it.

VERDICT: FAIL 1, 2, 4; outside the claims: F1
