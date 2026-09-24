1. **Scope: UNRESOLVED.** The status and edit-scope parts hold. The byte-identity part rests only on the writer's report.
   - **Status.** `/home/user/scaffold/.orkestrel/veneer/units/apt-4-status.txt:1-14` matches `apt-3-status.txt:1-14` line for line.
   - **Edit scope.**
     - The first guide hunk is unchanged from round 3: `apt-4.diff:5-33` matches `apt-shared-3.patch:5-33`.
     - The § Font utilities hunk differs only by the L2 rewrap: `apt-4.diff:41-58` against round 3's `-6179,27` hunk at `apt-shared-3.patch:37-61`. I checked it word by word.
     - The `_font.scss` hunk differs only by L3: `apt-4.diff:509-545` against `apt-3.diff:89-120`. The hunk grew from `-2,13` to `-2,16` because the edited comment is now inside it.
     - The `setupStyles.ts` hunk differs only by L1: `apt-4.diff:639-652` against `apt-shared-3.patch:710-723`.
     - Every other hunk header is the same in both rounds: guide `-7652`, `-7899`, `-8114`, `-9112`, `-9795`, `-9934`; `setupStyles.ts` `-1163`, `-1329`, `-1341`, `-3174`, `-3189`. I compared these table hunks by header only, not byte for byte.
   - **Byte-identity is not evidenced.**
     - `apt-instruments-4/apt-4-build-styles.log.txt:1-13` records the build and no `cmp` call.
     - `ap-type-report-4.md:38` records the `cmp` row as "(ran inline; recorded here)".
     - No `cmp` log exists under `apt-instruments-4/` or `/home/user/veneer-apt/tmp/units/`.
     - To settle it, the Orchestrator runs `cmp dist/src/styles/index.css tmp/units/apt-3-index.css` in `/home/user/veneer-apt` and keeps the log with its exit code.

2. **L1: CONFIRMED.**
   - `/home/user/veneer-apt/tests/setupStyles.ts:2215-2216` keeps "scales over" and "sits under" for the floor relation. It uses "resolves against" for the root relation, the same verb as the summary line at `:2211` and the case title at `mixins.test.ts:239`.
   - Each phrase is true of its row:
     - 3rem at a 16px root is 48px, over the 20px floor.
     - 1rem at a 16px root is 16px, under that floor.
     - 2.25rem at a 20px root is 45px, and its floor is 25px.
   - Mutations:
     - **Guard removed.** Only the 1rem row turns red (`apt-instruments-2/apt-2-mutation-guard.log.txt:47-50,530`). So the rows marked "over" and "under" really do behave differently.
     - **Cap removed.** The 3rem and 2.25rem rows turn red (`apt-2-mutation-cap.log.txt:555,573`).

3. **L2 and L3: CONFIRMED.**
   - **L2.**
     - `/home/user/veneer-apt/guides/veneer.md:6185` names "The `_font.scss` partial". It is the only `_font.scss` under `src/`.
     - The sentence is true of that partial: it writes the family, size, style, weight, and line-height entries in that order through the `utility` mixin (`src/styles/utilities/_font.scss:18-54`).
     - Apart from the added partial name, `:6185-6193` matches round 3's paragraph word for word.
   - **L3.**
     - `_font.scss:15-16` states that no release font entry takes a breakpoint infix, which is why the walk writes each entry at the empty infix.
     - This matches the guide's own term at `guides/veneer.md:6154`.
     - The rest of the comment matches round 3's comment word for word. "Ahead of every media block" still holds, because the `xl` cap block follows the walk (`:59`).

4. **L4 and L5: CONFIRMED.** Both errata are true and state no count. Their voice is weak; see S4.
   - **Failing-first erratum** (`ap-type-report-4.md:23-25`).
     - `FONT_ENTRY_CASES` holds `fs-3` (`tests/setupStyles.ts:3434`).
     - Both cases read it relationally: `font.test.ts:284-294` and `:337-349`.
     - Both cases pass on the baseline and under all 7 supplied mutations (literal, literal-cap, cap, xxl, xxl-cap, guard, important). Evidence: `apt-2-baseline-proofs.log.txt:39,42` and each `apt-2-mutation-*.log.txt` (for example `guard.log.txt:112,116` and `important.log.txt:125,129`).
     - Mutations that would turn them red:
       - Letting `heading-size` read `--vn-factor-density` would redden `:274`.
       - Dropping `!important` from the fluid value would redden `:331`.
     - None of the supplied mutations touches either property, so these relational proofs cannot tell the supplied mutations apart. The erratum describes this correctly.
     - The other owned tests that pass on the baseline read color, the `.lead` family over the body size, mark, and legend or heading rows already in the report-3 table (`apt-2-baseline-proofs.log.txt:50-110`). None of them is a missed exception.
   - **Formatting erratum** (`:26-27`) drops the count. Every line of round 3's edited paragraphs at `guides/veneer.md:6162-6172` and `:6195-6202` is at most 100 columns.
   - **Counts the report states** (`ap-type-report-4.md`):
     - "three owned files" (`:42`; see S3)
     - "three comment lines and two report errata" (`:1`; see S3)
     - Test and file totals: none.
     - Checked against the logs: `apt-4-test-guides.log.txt:11` shows 20 passed, which the report does not state; `apt-4-format.log.txt:8` shows 474 files.

**Findings outside the claims**

- **S1: § Text utilities has the same defect as L2, and brief 4 declared it unchanged without checking.**
  - What is wrong:
    - `/home/user/veneer-apt/guides/veneer.md:6230` opens "The partial writes every entry through the `utility` mixin … and walks the breakpoints once".
    - The last partial named before it is `src/styles/components/_text-truncation.scss` (`:6226`).
    - That partial uses no `utility` mixin and walks no breakpoints (`src/styles/components/_text-truncation.scss:1-10`). Read against its nearest antecedent, the sentence is false.
    - `ap-type-brief-4.md:43` names this sentence and rules that it "stay[s] unchanged".
    - The same check clears § Spacing utilities: its nearest antecedent is `_spacing.scss` (`:6067`).
  - Why it matters: it is the same class the round-3 verdict ruled against as J2 and L2.
  - Fix: at `:6230`, write "The `_text.scss` partial writes every entry …". Give it a named carrier unit.
- **S2: L3 renamed the concept at one site and left the old term beside it.**
  - `_font.scss:15` now says "takes a breakpoint infix".
  - `_font.scss:56` still says "after its responsive utilities", meaning the same thing: the release's infix-walked utilities, which its RFS cap block follows. In this file that phrase sits next to the fluid values, which is the ambiguity L3 was meant to remove.
  - `tests/setupStyles.ts:3429`, in the `FONT_ENTRY_CASES` TSDoc, still says "No font entry is responsive". That is the same claim L3 and the guide at `:6154` now word as "takes a breakpoint infix".
  - This breaks the one-concept-one-term rule inside the font context. Sibling partials such as `_shadow.scss:4` and `_border.scss:59` can keep "responsive", because no size rule collides with it there.
  - Fix:
    - `setupStyles.ts:3429`: "No font entry takes a breakpoint infix, so …"
    - `_font.scss:56`: "… after the utilities it writes at each breakpoint infix, …"
- **S3: the round-4 record states counts, the same class as L5.**
  - Sites:
    - `ap-type-report-4.md:42`: "over the three owned files".
    - `ap-type-report-4.md:1`: "three comment lines and two report errata". It is also false: one of the three sites is guide prose, and each site spans several lines.
    - The Orchestrator's own artifacts carry the same wording: `ap-type-brief-4.md:1` and `:13` ("Three comment or prose sites"), and `apt-audit-4-claims.md:5` ("the three files round 4 owns").
  - Rule: `AGENTS.md` § Writing, "NEVER state a count."
  - Fix: name the members instead, for example "over the owned files: `guides/veneer.md`, `src/styles/utilities/_font.scss`, and `tests/setupStyles.ts`", and use "comment and prose sites" with no number.
- **S4: the Failing-first erratum cannot be checked from its own text.**
  - `ap-type-report-4.md:23-25` claims "under every supplied mutation" but names neither the mutations nor their logs.
  - It uses the slash compound "mode/density" where the test title reads "mode or density factor".
  - Both errata are wrapped in quotation marks, which the brief's verbatim delimiters carried over, so they read as quotations with no speaker.
  - The report-3 sections they correct cite every log by path.
  - Rules: `writing.md` § Claims and time, "Claim only what the reader can check … cite the run".
  - Fix: remove the quotation marks and write "… the mode or density and unlayered-priority cases (`font.test.ts:274`, `:331`) … their assertions pass on the baseline and under each mutation in `apt-instruments-2/apt-2-mutation-*.log.txt`."

**Attacked and held**

- **The L2 rewrap is not greedy.** At `:6185`, `:6186`, and `:6191`, a word that would fit within 100 columns moves to the next line. No rule requires greedy fill, the format check passes (`apt-4-format.log.txt:7`), and no word changed.
- **`_font.scss` against the full path.** Neighbouring "writes every entry" sentences use full paths, for example `guides/veneer.md:5917` and `:6022`. The short name is still unambiguous, and the same section uses the short name `_tokens.scss` at `:6176`.
- **Errata placement.** The errata sit in the round-4 report and `ap-type-report-3.md` is not edited. Keeping blind records unchanged is correct.

**Referrals**

- **To the objective lane: kept paths are not rewritten.** The retained `ap-type-report-4.md:33-37,42,46` still names launch copies under `tmp/units/`, not the `apt-instruments-4/` paths where the logs are kept. That breaks the retention rule in `.agents/orchestration.md` § Dispatch anatomy.
- **To the objective lane: no `cmp` record.** The CSS parity row has no log at all. This is what leaves claim 1 UNRESOLVED.

VERDICT: FAIL 1; outside the claims: S1, S2, S3, S4
