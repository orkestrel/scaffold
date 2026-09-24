# AP-COLOR audit round 3 — subjective verdict (`reviewer` on Opus 5.5)

1. **Scope and gates: CONFIRMED.**
   - `apc-3-status.txt:1-15` lists the same 15 paths that round 2 confirmed: the owned set, `tests/setup.ts`, and the shared files.
   - Each final gate log ends on exit 0 (all logs under `apc-instruments-3/`):
     - `apc-3-final-format-check.log.txt:8,10`: "All matched files use the correct format."
     - `apc-3-final-lint-check.log.txt:6`: `--deny-warnings`, no output.
     - `apc-3-final-check.log.txt:30`.
     - `apc-3-final-test-src-styles.log.txt:8198-8203`: 1456 passed, 115 files.
     - `apc-3-final-test-setup.log.txt:33,37`: 320 passed.
     - `apc-3-final-test-conformance.log.txt:12,16`: 26 passed.
     - `apc-3-final-test-guides.log.txt:12,16`: 20 passed.
   - The `src/` hunks of `apc-3.diff` carry the same post-image blob ids as `apc.diff`: `6e2298d`, `905142b`, `ab436ef`, and `6d7ce40` (`apc-3.diff:2,48,87,115` against `apc.diff:2,48,87,115`). Equal content hashes mean equal file contents.
   - `apc-3-src-check.txt:1` reads `True`. I did not run `git diff` myself.

2. **H1: BROKEN**, on the half "each title names exactly the path its assertions prove". The half "the four cases together keep every assertion of round 2's single case" holds.
   - **Assertions kept.** Every assertion at `apc-2.diff:705-765` reappears in `/home/user/veneer-apc/tests/src/styles/utilities/color.test.ts`:
     - density and channel at lines 233-242;
     - fill and body text at lines 260-280;
     - token and alias at lines 297-307;
     - below-scope text and link at lines 321-334.
     - The below-scope text check now compares `#local` with its own resting color (lines 320 and 327). Round 2 compared it with the sibling's. Both elements are `.text-primary` in one scope, so the new check is at least as strong.
   - **Mutations that distinguish the cases.** Each split case goes red under the mutation that removes its path and stays green under the others (all logs under `apc-instruments-3/`):
     - `primary-channel`: cases 1-3 red, case 4 green (`apc-3-mutation-primary-channel.log.txt:129-144`).
     - `text-inline-tier`: case 3 red only (`apc-3-mutation-text-inline-tier.log.txt:129-140`).
     - `text-reads-token`: cases 3 and 4 red (`apc-3-mutation-text-reads-token.log.txt:129-140`).
     - `link-reads-alias`: case 4 red only (`apc-3-mutation-link-reads-alias.log.txt:163-172`).
   - **Failing state.** Line 269 asserts `matchesColor(readStyle(emphasis, 'color'), fill)`, so `.text-primary-emphasis` must follow the retuned fill. The title at line 247 names only "a role color". In this file "role color" and "emphasis class" are separate terms (titles at lines 123 and 339). Round 1 named this path ("a role color and its emphasis tier", `apc-2.diff:669`). Round 2 dropped it from the title, and round 3 kept it dropped. The report also names it (`ap-color-report-3.md:16`).
   - **Mutation that shows the gap.** Make the `$emphases` entry write the per-mode compiled tier literal instead of `var(--bs-<role>-text-emphasis)`. The resting identity case (line 122), the per-mode alias case (line 144), and the release-record case all still compare equal at rest. By reading, only line 269 goes red, and it reports under a title that never mentions the emphasis class. This is the same shape as H1.
   - The same gap in a smaller form: the density check at line 235 also asserts that the emphasis class stays put, and the title at line 220 names only the role color.
   - **Fix.** In the case at line 246, add `expect(matchesColor(readStyle(emphasis, 'color'), partner)).toBe(true)` after line 280. Retitle it "moves a role color and its emphasis class to the tier of a fill or body text retuned at the scope declaring the %s theme".
   - For the case at line 219, either retitle it "leaves a role color and its emphasis class on the tier…" or drop `emphasis` from the density assertion.
   - No behaviour change is needed.

3. **H6: CONFIRMED.**
   - Lines 338-369 run `it.each(TEXT_MODES)` on a scope painted with `var(--bs-body-bg)`, over `TEXT_TIER_CASES`. That table holds primary, secondary, success, info, warning, and danger (`setupStyles.ts:2817-2824`).
   - The case asserts alpha `1` on `.text-<role>-emphasis.text-opacity-50` (lines 355-360) and alpha `0.5` on `.text-<role>.text-opacity-50` (lines 361-366).
   - The `.text-${key}` selector cannot match the emphasis span, because the emphasis span's class is `text-${key}-emphasis`.
   - **Mutation.** `emphasis-opacity` gives the emphasis class `/ var(--bs-text-opacity, 1)` (`apc-mutate-2.py:47-49`). The case goes red for every tier role in both modes, reading 0.5 where 1 is required (`apc-3-mutation-emphasis-opacity.log.txt:146-159`). The restore is byte-identical (line 294). The passing case reads 1, so the assertion separates the two states.

4. **H5: CONFIRMED.**
   - **Mutation.** `danger-channel-record` removes danger from the tier branch (`apc-mutate-2.py:44-45`) and selects only the release-record title (log line 1).
   - Both modes go red on both `danger tier` and `danger channel` (`apc-3-mutation-danger-channel-record.log.txt:118-123`). The restore is byte-identical (line 197).
   - The tier twin and the channel twin are separate elements (`color.test.ts:38-40`), so each soft assertion separates the mutation from the passing case.

5. **H3 and H4: CONFIRMED.**
   - **Anchor sentence** (`apc-shared-3.patch:143-146`): "…and its resting color against the `.text-primary` class in each mode". This matches `/home/user/veneer-apc/tests/src/styles/elements/a.test.ts:53-65`, which compares only the resting `color`. The hover comparison against the recorded token stays at lines 35-36.
   - **Split sentences** (`apc-shared-3.patch:63-70`). Each holds against the code:
     - Fill, body text, and token at the theme scope, plus the alias on the element, move the role color. True against cases 2 and 3 (lines 246-309), each run in each mode.
     - A channel leaves the role color. True against line 242.
     - The token below the theme scope leaves the text and moves the link. True against lines 311-336.
     - The opaque emphasis class under an opacity step. True against lines 338-369.
   - Each sentence reads correctly on the first pass, and sentences B and C follow G2 verbatim.
   - **Rewrapped paragraphs.** I compared them word for word against the round-2 wording (`apc-shared-2.patch:68-73, 129-135, 150-165` plus context). The link-proof paragraph and the outline-button paragraph are identical. The anchor paragraph differs only by the H3 edit.
   - **Note, not blocking.** Sentence A dropped round 2's "in each mode" after "equal to its emphasis class" (`apc-shared-2.patch:62`), following G2. Every reading in sentence A does run in each mode. Sentence B now opens "In each mode", so a reader can infer that sentence A's readings do not. Moving "in each mode" to the front of sentence A would restore the precision.
   - The density retune is proven (line 233) and appears in no guide sentence. That is an omission, not a false statement.

6. **H2: CONFIRMED.**
   - The report (`ap-color-report-3.md:37-40`) matches the code:
     - The channel, fill, body text, and theme-scope token overrides sit on `scope` (`color.test.ts:240, 260, 272, 297`).
     - The density override sits on `document.documentElement` with its `finally` removal (lines 233-238).
     - The F7 overrides sit on `#local` and `#local-link` (lines 303, 324, 325).
   - Calling the channel override theme-dependent holds: the per-mode channel readings differ (`apc-3-mutation-primary-channel.log.txt:130,132`).
   - The report corrects its round-2 wording openly (line 37).

7. **Law and report: BROKEN**, on "every new or split title is named for what it proves".
   - **Law half holds.** The round-3 diff adds no `any`, no `as`, no non-null `!`, and no suppression comment. The `!` at line 44 is logical negation, and `querySelector<HTMLElement>` is a type argument. There is no nested declaration, and every callback is passed directly as an argument. There is no hidden helper. A diff sweep for `function`, `as <Type>`, `: any`, `@ts-`, and `*-disable` over `apc-3.diff` finds only comment text (lines 128 and 134).
   - **Failing state.** The H6 title at line 339 reads "keeps each emphasis class opaque under an opacity step…". The fixture iterates `TEXT_TIER_CASES` only, which is six roles. `.text-light-emphasis` and `.text-dark-emphasis` exist: `$emphases` walks every `$aliased` role (`/home/user/veneer-apc/src/styles/utilities/_color.scss:35-37`), and `LINK_ROLES` includes `light` and `dark` (`setupStyles.ts:1198-1207`). The title therefore claims two classes the case never mounts. Four sibling titles in the same file say "outside the neutral roles" for this population (lines 33, 106, 123, 180).
   - **Fix.** Retitle it "keeps each emphasis class outside the neutral roles opaque under an opacity step and fades its role class beside it, in %s mode". Or iterate `LINK_ROLES`: the neutral classes read the same maps, so the wider title would then be true.
   - **Report-width note.** The report says "The file's header records what round 3 changed" (`ap-color-report-3.md:98`). The header at `apc-mutate-2.py:5-6` omits the `danger-channel-record` mutation that round 3 added (line 44). Add it to the header.
   - Every other report row matches its log. That includes the mutation table at lines 50-60, with its red and green cases per mutation, and the gate table at lines 70-78.
   - **Counts the report states, each checked against its source:**
     - 1456 passed and 115 files (`apc-3-final-test-src-styles.log.txt:8198-8199`), confirmed.
     - 320 passed, confirmed.
     - 26 passed, confirmed.
     - 20 passed, confirmed.
     - 23 passed in the scoped run (`apc-3-scoped-1.log.txt:90`), confirmed.
     - 15 files, 883 insertions, and 274 deletions (`apc-3-diffstat.txt:16`), confirmed.
     - "four" split cases (lines 219, 246, 284, 311), confirmed.
     - "four round-2 retune mutations": four logs, confirmed.
     - "The first two rows", confirmed.
     - "100-column width": `format:check` is clean.

## Findings outside the claims

None.

## Attacked and held

- **Case 3's sibling assertion.** Line 307 asserts that the sibling stays unchanged. That is what "on its own element" claims, so the title covers it.
- **Case 1's consumer assertion.** The `.text-bg-primary` assertion at line 241 is the control that shows the channel retune landed. The title does not need to name it.
- **Rendered surface.** No round-3 claim rests on a capture, because the source is byte-identical to round 1 (claim 1). Nothing is NOT-EVIDENCED.
- **Retained runner.** Extending `apc-mutate-2.py` in place in `apc-instruments-3/` keeps round 2's own copy at `apc-instruments-2/apc-mutate-2.py`.

## Referrals (to the objective lane)

- **R1: some retune paths have no retained red.**
  - Under `primary-channel`, the case at line 246 fails at the hard `expect` on line 262, before any body-text assertion runs (`apc-3-mutation-primary-channel.log.txt:133-136`).
  - The body-text retune (lines 272-280), the emphasis-follows-fill assertion (line 269), and the density check (line 235) therefore have no retained red in any round-3 log.
  - Rule whether the round's acceptance requires one. If it does, add body-text and emphasis mutations to `apc-mutate-2.py`.
- **R2: the role-alpha half of H6 has no retained red.** Rule whether the opacity-steps case at line 179 already covers it. If it does not, retain a red for a mutation that drops `/ var(--bs-text-opacity)` from the tier branch (`_color.scss:17`).

VERDICT: FAIL 2, 7; outside the claims: none
