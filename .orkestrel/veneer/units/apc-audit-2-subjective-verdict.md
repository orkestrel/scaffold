# AP-COLOR audit round 2 — subjective verdict (`reviewer` on Opus 5.5)

1. **Scope and gates: CONFIRMED.**
   - The status file `apc-2-status.txt` lists 15 paths. They are the round-1 owned set from `ap-color-brief.md:81-83`, plus `tests/setup.ts`, plus the three shared files.
   - Each final log ends on `exit=0`:
     - `test-src-styles`: 1448 passed in 115 files (log lines 8198-8203).
     - `test-setup`: 320 passed.
     - `test-conformance`: 26 passed.
     - `test-guides`: 20 passed.
     - `test-journey`: 4 passed and 244 skipped. The composed-contrast case shows ✓ in `dark-390`, `light-390`, `light-1280`, and `dark-1280` (lines 516, 568, 620, and 672).
     - `format-check`, `lint-check`, and `check` are clean.

2. **Source unchanged: CONFIRMED on the retained artifacts.**
   - The `src/` hunks in `apc-2.diff` (lines 1-175) match `apc.diff` (lines 1-175) byte for byte. That includes the blob ids `6e2298d`, `905142b`, `ab436ef`, and `6d7ce40`.
   - I did not run `git diff` in the worktree myself.

3. **F1: CONFIRMED.**
   - `UNDER_BAR` holds exactly `dark|Outline dark|rest` and `light|Outline light|rest` (`apc-2.diff:189-198`). The only hunk in `tests/setup.ts` is `@@ -3018`.
   - The remarks are true. An outline in the other tone clears the bar, so only the same-tone neutral outlines stay under it.
   - Mutation: restore any of the six removed entries. The strict-equal assertion then reads red, which `apc-instruments/apc-capture.log.txt:4,12,20,28` shows in all four variants. The same case reads green in all four variants in the final journey log, so the assertion distinguishes the two states.
   - Wording note, not blocking: "the neutral outline rests alone, each on the canvas of its own tone" can be read to mean all four neutral rests. "only the neutral outline rests that sit on the canvas of their own tone" says it without that reading.

4. **F2: CONFIRMED.** The mutation is `tier-80-dark` (`apc-mutate-2.py:24-35`).
   - Link rest reads red in dark only: info 4.2867 and danger 3.9670 (log lines 472-476).
   - Link hover reads red for all 6 dark roles at `link.test.ts:87`, the weighting assertion (log lines 477-488 and 609). Light stays green.
   - Outline rest reads red in dark only: info 4.286 and danger 3.966 (log lines 333-335).
   - The invalid feedback and the checked label read 3.966 in dark (lines 189-191). The valid case stays green (line 188).
   - The stated reason for the green valid case holds. Under the same mutation, the round-1 log reddened only info and danger on the text-contrast proof (`apc-instruments/apc-mutation-tier-80-dark.log.txt:190-192`), so success at 80% clears the bar.

5. **F3: CONFIRMED.**
   - Each of the 8 logs reddens the proofs its row names, in the modes it names, and each ends with `byte-identical ... = True`.
   - Identity reads red in light and dark on `danger`. Retune reads `rgb(20, 80, 140)` in each mode. The dark anchor reads red and the light anchor green. `hover-oklab` reads 12 failed at `:87`.
   - The tightened hover proof (`link.test.ts:56-103`) computes its expected value from the `#tier` twin, written from `TEXT_TIER_CASES`, plus `--vn-text-emphasis-base`. It no longer reads the link's own rest.
   - Mutations:
     - `hover-oklab` changes the mixing space, and all 12 cases go red.
     - `tier-80-dark` moves where the tier starts. The dark cases go red and light stays green, which is the separation the old proof missed.

6. **F4: CONFIRMED.**
   - The retune proof runs under `it.each(TEXT_MODES)` (`color.test.ts:219`). The channel, fill, body-text, and token overrides sit on `scope`, the `[data-bs-theme]` element.
   - The painted fixtures are at identity `:126`, opacity `:183`, retune `:223`, validation `apc-2.diff:309,343`, and anchor `apc-2.diff:404`.
   - Mutation: `primary-channel` reddens the retune proof in both modes. That shows the proof runs in each mode.
   - Width note: the density override stays on `document.documentElement`, where `_tokens.scss:325` declares the factor. The F7 overrides sit on elements below the theme scope by design. So "every override" is wider than the code in wording only.
   - Observation: the identity, opacity, and anchor fixtures assert color equality only. No assertion there reads contrast, so the painted canvas binds nothing in those three.

7. **F7: CONFIRMED.**
   - Each of the four soft assertions states true cascade behaviour. `--bs-primary-text-emphasis` substitutes at the theme scope (`_mixins.scss:456`), and `.link-primary` reads the token directly (`_link.scss`).
   - Mutations and readings:
     - `text-inline-tier` reddens "token at the theme scope" and "alias on the element" in each mode.
     - `text-reads-token` reddens "alias on the element" and "token below the theme scope leaves the text".
     - `link-reads-alias` reddens "token below the theme scope moves the link".
   - Each mutation reddens exactly the path it removes.
   - The ruling adopts the text and link asymmetry (`appearance-design-verdict.md:18,20`).

8. **F5: CONFIRMED.**
   - The new case in `setupStyles.test.ts:2780-2797` compares separately written literals. It no longer compares a table with its own template or a value with its own literal.
   - `TEXT_TIER_CASES` (`setupStyles.ts:2817-2823`) writes the mix, not the class's relative-color path. It repeats the token source in `_mixins.scss:376-380`, but the subject under test is the class, so the twin stays independent of that subject.
   - The release-record case (`color.test.ts:58-72`) matches each tier key against the twin and asserts that the key differs from the recorded channel.
   - Mutation: `danger-channel` would fail both the `danger tier` and `danger channel` assertions, so the case distinguishes it. That rests on reading only; no retained log selected this case (see Referral R1).

9. **F6: CONFIRMED.**
   - The brief's sentences sit verbatim at `apc-shared-2.patch` lines 35-43, 68-71, and 85-90. "The two neutral links" is gone.
   - No count or banned term appears. I swept the patch's added lines for `two`, `both`, `three`, `six`, `should`, `simply`, `just`, `currently`, `via`, `once`, `since`, `now`, `new`, and `latest`. The only hits were code on lines 591-592.
   - Each sentence matches the code:
     - `_color.scss:17,36` for the text classes.
     - `_link.scss` for the colored links.
     - `_tokens.scss:73-74,140-141` for the validation colors.
   - Each sentence also matches its proof: identity `:123`, contrast `:106`, link rest and hover `link.test.ts:31,56`, and retune `:219`.

10. **Law: BROKEN**, on "every new or retitled test is named for what it proves."
    - I found no `any`, no `as`, no non-null `!`, no suppression comment, no nested declaration, and no hidden module helper. The `!` characters at `color.test.ts:44` and `setupStyles.test.ts:2785` are logical negation.
    - Failing state: the retitled retune test at `tests/src/styles/utilities/color.test.ts` (around line 220) asserts `token below the theme scope moves the link` on `#local-link`, a `.link-primary`, around line 297.
      - Its title names only the role color's paths.
      - A reader looking for the colored link's element-level retune cannot find that proof by its title.
      - Its failure under `link-reads-alias` is reported against a title that never mentions links.
    - Fix: split the `it.each` into focused cases, each titled for the one path it proves:
      - fill and body text at the theme scope move the role color;
      - the token at the theme scope and the alias on the element move it;
      - the token below the theme scope leaves the role color and moves the colored link;
      - the role channels and the density factor leave it.
    - A lesser fix: extend the title with "and the token retuned below the theme scope leaves it and moves the colored link".

11. **Report: CONFIRMED.**
    - Every mutation row, reading, and gate row matches its log.
    - The report says the logs support only what their rows name.
    - It states that the pre-tightening `tier-80-dark` and `hover-oklab` readings were not retained (`ap-color-report-2.md:54`).
    - Timestamps support its ordering: the six other mutations ran 21:45:31-21:47:08, then `tier-80-dark` at 21:47:59 and `hover-oklab` at 21:48:20.
    - Nit: "every override on the element that declares that mode's theme" at `:24` is wider than the code; see claim 6.
    - The report's counts, checked against their logs:
      - 1448 passed and 115 files, confirmed.
      - 320, 26, and 20 passed, confirmed.
      - 4 passed and 244 skipped, confirmed.
      - 15 files, 790 insertions, and 253 deletions, confirmed (`apc-2-diffstat.txt:16`).
      - "all 6 dark cases" under `tier-80-dark`, confirmed.
      - "all 12 cases" under `hover-oklab`, confirmed (12 failed).
      - "six tier roles", confirmed.
      - "two mutations" run on the final test tree and "the other six", confirmed: 8 rows.

## Findings outside the claims

- **G1: the anchor proof sentence claims more than the proof reads.**
  - Location: `guides/veneer.md:6846-6848`. It reads: "reads the `a` tag's resting and hover colors in each mode against the recorded readings of … and against the `.text-primary` class in each mode."
  - The sentence ties both the resting and the hover color to `.text-primary`. `tests/src/styles/elements/a.test.ts:54-66` compares only the resting `color`, and `.text-primary` has no hover.
  - This is a prose claim wider than its proof (`.claude/rules/documentation.md` § Parity, "written more confidently than the code earns").
  - Fix: "…against the recorded readings of `--vn-link-base` and `--vn-link-hover-base`, and its resting color against the `.text-primary` class in each mode."
  - The line was carried from round 1 and none of the round-1 lanes flagged it.
- **G2: the retune proof sentence can't be read on the first pass.**
  - Location: `guides/veneer.md:6322-6327`. One sentence packs a nested three-item list, then "and a retuned alias on the element moving the role color", then two more participle clauses.
  - "Body text" reads first as a separate item in the list of what the proof reads. This fails `AGENTS.md` § Writing ("One idea per sentence"; "understands it on the first read"), and the unit rewrote this sentence in round 2.
  - Fix: split it. "It also reads each such role color at or above 4.5 to 1 against the page and equal to its emphasis class, the neutral roles on their own channels, and the opacity steps over the tier's channels. In each mode it retunes the role fill, the body text, and the emphasis token at the scope that declares the theme, and the alias on the element, and reads each one moving the role color. It reads a retuned role channel leaving the role color, and the emphasis token retuned below the theme scope leaving the role color and moving the colored link."
  - Also rewrap `:6329`, `:6332`, `:6848`, and `:7063` to the guide's column width.

## Referrals (to the objective lane)

- **R1: the rewritten release-record case has no retained red.** The F5 rewrite of `color.test.ts:58-72` has no retained log showing it red. `apc-2-mutation-danger-channel.log.txt:32` selected only the identity proof. The brief's Objective asks that every proof the unit added read red in a retained log. To settle it, add that case's title to the `danger-channel` proof list in `apc-mutate-2.py` and keep the log.
- **R2: one guide clause has no executed proof.** "Only the role class takes the opacity steps" (`guides/veneer.md`, § Color utilities) is true against `_color.scss:36`, but no test asserts that `.text-<role>-emphasis.text-opacity-50` stays opaque. A search of `tests/` for an emphasis class combined with `text-opacity` came back empty. `.claude/rules/documentation.md` asks for the executed assertion.

## Attacked and held

- Ruling out a self-referential twin: `TEXT_TIER_CASES` repeats the token's source text but not the class's path. `tier-80-dark` shows the twin separates a mis-mixed tier.
- The hard assertions in the retune proof run before the soft ones. Under `text-inline-tier` the log shows only the two soft failures, so the fill, body-text, and channel assertions held.
- Quoted role names such as `'primary'` in the hover titles follow the repository's existing convention for `$key` titles, as in `validation.test.ts:295`.
- Rendered surface: no claim this round depends on a capture, because round 2 changes no source.

VERDICT: FAIL 10; outside the claims: G1, G2
