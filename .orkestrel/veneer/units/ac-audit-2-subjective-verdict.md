**ACCORDION (`ac`) audit round 2: subjective lane verdict**

I held the subjective lane, as `reviewer` on Opus 5.5. I only read files; I ran nothing. All evidence paths are under `/home/user/scaffold/.orkestrel/veneer/units/`, and `logs/` means `ac-instruments-2/logs/`.

## Per-claim verdicts

**1. Delta and scope — CONFIRMED.**
- **Status and owned diff:** `ac-2-status.txt:1-4` lists exactly the four owned files, all untracked. `ac-2.diff` has four headers only (`:1,27,210,399`).
- **The two unchanged owned files:** `accordion.test.ts` and `AccordionSection.ts` are unchanged from round 1.
  - Evidence 1: `logs/owned-round-delta.log.txt` shows only `_accordion.scss` and `AccordionSection.test.ts` changing.
  - Evidence 2, independent of the round-2 writer: round 1's `ac-instruments/wt-check.log.txt:5-27` and round 2's `logs/wt-check.log.txt:5-27` place every diagnostic at the same positions in `accordion.test.ts` (17,2 through 143,35) and `AccordionSection.ts` (1,10 and 1,26). The only move is in `AccordionSection.test.ts` (80,38 to 85,38), which is the five-line `h2` block.
  - The retained `ac.diff` cannot settle this, because it was overwritten (see REC-1).
- **Shared patch:**
  - `ac-shared-2.patch` names the same fourteen files as `ac-shared.patch`, each with an identical base hash on its `index` line.
  - The hunks for `Showcase.ts`, `index.ts`, `_tokens.scss`, `index.scss`, `Showcase.test.ts`, `index.test.ts`, `conformance.test.ts`, and `setupServer.test.ts` are byte-for-byte the round-1 text, with the same result hashes.
  - No vendored file, `theme.test.ts`, `src/browser/**`, `src/core/**`, `tests/fixtures/**`, manifest, `README.md`, or `ROADMAP.md` appears.
- **Referral to the objective lane:** the `git apply --check` exit 0 and the base-blob equality rest on `logs/make-patch.log.txt:1-3`, a log the writer produced.

**2. The failing-first evidence — CONFIRMED.**
- **Empty partial:**
  - `logs/empty-partial.log.txt:1-3,663,667`: the digest is taken, the partial is 0 bytes, and the run reads `Tests  29 failed | 1 passed (30)`, exit 1. The run happened in `tmp/probe/final` (`:5`).
  - The one green case is C11 (`:122`).
  - Mutation: the whole partial removed. Every case except C11 tells it apart.
  - C11 does not, but `forced-ring-omitted` reddens C11 with the partial present (`logs/mutations-compare.log.txt:24`), so C11 is bound.
- **Green control:** `logs/green-control.log.txt:1,107,111` reads `matches: yes`, `30 passed (30)`, exit 0.
- **`button-padding-literal`:** `logs/button-padding-literal.log.txt:1` reads `3 failed | 27 passed (30)` on the padding-x row, the padding-y row, and C15.
  - Mutation: the literal `1rem 1.25rem` in place of the slot reads.
  - The C4 rows set `19px` on the accordion and expect 19 (`ac-2.diff:536-537`). The literal stays at 20 or 16, so the assertions tell the mutation apart. C15 expects 32 under density 2 (`:853`) and fails the same way.
- **Built selectors:** `logs/built-selectors.log.txt:1-24` has one line per rule, and it matches `ACCORDION_SELECTORS` (`ac-shared-2.patch:712-735`). The additional lines are the dark rule, both reduced-motion twins, and the forced-colors addition.
- **Final runs:** the final application, guide, and policy logs are present.
- **Round-1 mutation re-run:**
  - `logs/mutations-compare.log.txt:1-32` reads "yes" for every mutation.
  - `compare.py:18` is an order-sensitive list equality, and a missing row reads "no".
  - I checked a sample by hand: `hover-lift-dropped` and `asset-rows-kept` agree between `ac-instruments/mutations-2.log.txt:9` / `mutations-3.log.txt:8` and `logs/mutations-round-1-set.log.txt:23,31`.
- **Section mutations:** `logs/mutations-section.log.txt:1-4` shows each section mutation reddening its round-1 cases.

**3. The specimen headers (S1) — CONFIRMED.**
- **Markup:** every header is `<h2 class="accordion-header">`, in both `ACCORDION_SPECIMENS` (`ac-shared-2.patch:60,65`) and `ACCORDION_MARKUP` (`:750`).
- **Section proof:** the specimen case reads the tag set as `{H2}` behind a non-empty guard (`ac-2.diff:285-287`).
  - Mutation: any header written at another level.
  - A mixed set, or one without `H2`, fails the equality.
  - The guard means a header that loses its class cannot pass by producing an empty set.
  - Red on `h3`: `logs/section-renamed.log.txt:7,37` reads `1 failed | 3 passed (4)`. Green: `logs/section-green.log.txt:11`.
- **Binding case:** `ac-shared-2.patch:663-667` reads `{h2}`. Red: `logs/setup-styles-red.log.txt:117,144`. Green: `logs/setup-styles-green.log.txt:119`.
  - Its regex requires `class="accordion-header"` exactly. A header with another attribute order or an extra class would escape it, but the section proof's `querySelectorAll` reading covers that case.
- **The reason in the doc block:** `ac-shared-2.patch:47-48` reads "Each header is the release's `h2` element, the level under the page's `h1` element, because a region carries no heading of its own."
  - This is true of the tree: `Showcase.ts:79` writes the page's only `h1`, and `SpecimenSection.ts:32` gives a region only an `aria-label` attribute.
  - The reason is placed where a reader of the specimens looks for it.

**4. The plain variant's name (S2) — CONFIRMED.**
- **The rename:** `Accordion items` appears nowhere in `ac-2.diff` or `ac-shared-2.patch`. `Accordion base` appears at:
  - `CaptureSubject` (`ac-shared-2.patch:470`);
  - the `CASCADE_KEYS` row `accordion-base` (`:480-481`);
  - the `DRIVEN_KEYS` row `accordion-base-focus` (`:498`);
  - the journey case (`:362,366-369,387`);
  - the specimen entry and its doc block (`:50,58`);
  - the section proof's name lists (`ac-2.diff:247,316,356`).
- **Family fit:** the name matches the family's `<Region> base` form: `List group base` beside `List group flush`, and `Nav base` (`/home/user/veneer-ac/app/browser/constants.ts:1357,1382,1898`).
- **Scenario search:**
  - The report gives no retained log for its search.
  - I ran my own search of `/home/user/veneer-ac`, excluding `node_modules` and `dist`, for `nav-base-focus|collapse-shown|accordion-items|Accordion items`. It returned `tests/setup.ts` and `tests/app/browser/integration.test.ts` alone.
  - In the patch, the kebab-case scenario names occur only in those two files.
- **Proofs under the rename:**
  - Mutation: the specimen still named `Accordion items`. `logs/section-red.log.txt:70` reads `3 failed | 1 passed (4)`.
  - The journey case reads `41 passed (41)` (`logs/final-journey-light-1280.log.txt:105,117`).

**5. Token nouns in the guide — CONFIRMED.**
- **The ruled phrases:** every one appears in `ac-shared-2.patch`, at `:133-134`, `:150`, `:157-158`, `:163`, `:190`, and `:198-199`.
- **Every other token in the section and the retained pair takes a noun.** I read each one with the word after it:
  - Lines 101-127: `collapsed` class, `accordion-collapse`/`collapse`/`show` class, `parent` option, `.accordion` class, `text-align: left`/`margin-left` declaration, `--bs-accordion-inner-border-radius` value, `accordion-flush` class.
  - Lines 136-159: `:focus` pseudo-class, `forced-ring` mixin, `src/styles/_tokens.scss` file, `0.15s`/`0.2s` timings, `transition` mixin, `--vn-space-8`/`--vn-size-3` token, `1.25rem` literal.
  - Lines 162-170: `--bs-accordion-btn-focus-box-shadow` property, `aria-expanded`/`aria-controls` attribute, the `accordion.test.ts` proof.
- **Rows beyond the sweep bound:** the `### Files` row (`:85`) and both compatibility rows (`:233-234`) read "the `tests/src/styles/components/accordion.test.ts` proof".
- **Formatter:** the sibling rows around both inserts are unchanged context lines (`:82-84,86-88,230-232,235-237`), so the formatter re-padded only the unit's rows.
- **Navbar sentence:** keeping "Bootstrap also retunes the … variable" keeps the actor as the subject. That is the better voice.

**6. Token nouns elsewhere and the comment sweep — CONFIRMED.**
- **Named sites:** each one reads as claimed:
  - `_accordion.scss` at `ac-2.diff:40`;
  - the `ACCORDION_SPECIMENS` doc block at `ac-shared-2.patch:41-47`;
  - `tests/setupStyles.ts` at `:700,704-706,756,758,767,837,841`;
  - the section proof at `ac-2.diff:308-309`;
  - the binding case at `ac-shared-2.patch:651`.
- **No "twice each" or "once each" remains.**
- **Sweep of every added comment line** in both files (for example `:not(.collapsed)` qualifier at `ac-2.diff:560`, `.btn` class at `:72`, a `$dark` entry at `ac-shared-2.patch:264`):
  - Every token takes a noun.
  - "both unconditionally and under the reduced-motion query" (`ac-shared-2.patch:705`) names its members.
  - "the two ends" (`ac-2.diff:637`) names a fixed pair, not a set that can grow.
  - "half a revolution" and "a quarter" are values.
  - I found no tally.

**7. The gates — UNRESOLVED.**
- **What holds:**
  - `gates-final.sh:8-26` runs every gate in `tmp/probe/final`.
  - `stage-final.sh:11-20` builds that copy from `a658879`, `ac-shared-2.patch`, and the owned files, which are exactly the delivered artifacts.
  - `logs/final-chain.log.txt:2-13` records exit 0 for every gate with the claimed result lines, and each gate's log carries the same result line (`final-test-guides.log.txt:11` reads 19 passed).
  - In the worktree, `wt-format-check.log.txt:7` passes, `wt-lint-check.log.txt` is clean, and `wt-check.log.txt:5-27` carries diagnostics.
- **What is open:** the parenthetical "the recursive comparison reported no difference" has no retained output. It is not in `stage-final.sh`, `logs/stage-final.log.txt:1-18`, or any instrument (a search for `diff|cmp|compare` in `*.sh` finds only `make-patch.sh`). It rests on report line 252 alone.
- **The report disagrees with itself here:** line 190 says the mutation copy "differed from the final copy only in comment and guide wording". Line 252 says the comparison "reported no difference". Both can be true only if the reflow was applied to the mutation copy afterwards, and the report does not say that.
- **What settles it:** re-run `diff -r` between the two copies (excluding `node_modules`, `dist`, and `.git`) and retain its output, or strike the clause and rely on the given ruling.
- **Referral to the objective lane:** the worktree `check` exit code of 2 is not written in `wt-check.log.txt`.

**8. Law and report — BROKEN.**
- **What holds:**
  - The delta adds no `any`, no `as` beyond `as const` (`ac-2.diff:831,878`), no `!`, no suppression, and no mock.
  - No exported helper was added.
  - A banned-term sweep (`should|simply|easy|just|currently|now|new|latest|via|e.g.|i.e.|etc.|since|once|above|below|ensure|guarantee`, case-insensitive) over `b-collapse-ac-report-2.md`, `ac-2.diff`, and `ac-shared-2.patch`:
    - "above" in `ac-shared-2.patch:34,165,372` is spatial, which the rule permits.
    - "once" in report lines 134 and 137 is inside quoted before-text.
    - `new` in the diffs is only the `new` constructor keyword in code (for example `new Set`, `new AccordionSection`), not prose.
  - A sweep for `both|two|three|once|twice` over the report returns only quoted before-text, a case title, and a mutation name.
  - The report states no line count in prose, and `logs/diffstat.log.txt` is retained.
  - The D1 wording names the root cause and matches the log (report lines 311-318 against `wt-check.log.txt`).
  - The recorded choices are each bounded.
  - § What the unit could not close names every item the claim lists.
- **What fails:** the report does not follow the token-noun rule of `.claude/rules/writing.md` § Code tokens. That section governs reports, and this round exists to enforce that rule. The report leaves bare tokens at:
  - line 14: "`git apply --check tmp/units/ac-shared-2.patch` exits 0";
  - line 44: "The instrument is `empty-partial.sh`.";
  - line 45: "`mutate.py` writes … as the literal `1rem 1.25rem` in place of";
  - lines 52-53: "the output of `built-selectors.mjs` over the final copy's built `dist/src/styles/index.css`";
  - line 188: "`compare.py` reads";
  - line 245: "run by `mutate-section.py`";
  - line 253: "`gates-final.sh` ran each gate";
  - lines 302-306: the list of instruments.
- **Why it matters:** the report is the audit's subject and it is retained. Leaving this rule broken in the report of the round that enforces it keeps the defect class alive in the record.
- **Smallest fix:** add the noun: the `git apply --check …` command, the `empty-partial.sh` instrument, the `mutate.py` script, the `1rem 1.25rem` literal, the `built-selectors.mjs` reader, the `dist/src/styles/index.css` file, the `compare.py` script, and so on. This touches the report only; no product file moves. The Orchestrator can rule it record-only, as it ruled round 1's F-counts.
- **Counts the report states, listed for the record:**
  - Quoted result lines: `29 failed | 1 passed (30)`, `30 passed (30)`, `3 failed | 27 passed (30)`, `3 failed | 1 passed (4)`, `1 failed | 3 passed (4)`, `1 failed | 112 skipped (113)`, `4 passed (4)`, `1 passed | 112 skipped (113)`, `254 passed (254)`, `22 passed (22)`, `19 passed (19)`, `109 passed | 1 skipped (110)`, `80 passed (80)`, and `41 passed (41)`.
  - Exit codes: 0, 1, and 2.
  - SHA-256 digests.
  - Values: `0.15s`, `0.2s`, `1rem`, `1.25rem`, and `1rem 1.25rem`.
  - Identity numbering: C1 to C16, claims 3, 7, and 8, D1, S1, S2, and R1.
  - The report states no count of a growable set in its own prose.

## Findings outside the claims

**REC-1: round 1's `ac.diff` was overwritten with round 2's owned diff.**
- **Where:** `/home/user/scaffold/.orkestrel/veneer/units/ac.diff`.
  - `:40` reads "keep the release's `1.25rem` length, because no". Round 1's verdict (`ac-audit-subjective-verdict.md:92`) cites `ac.diff:40` as the bare "the release's `1.25rem`, because".
  - `:247,316,356` read `Accordion base`. Round 1's S2 cites `ac.diff:247,310,350` as `Accordion items` (`ac-audit-subjective-verdict.md:123`).
  - `ac.diff:29,212` carry the same result hashes as `ac-2.diff:29,212` (`5a51191` and `1e641e6`), yet `logs/owned-round-delta.log.txt` shows both files changing between rounds.
  - The file listing ordered by modification time puts `ac.diff` after `ac-brief-2.md`.
- **Why it matters:**
  - Round 1's retained verdict citations now resolve to text they do not quote.
  - Claim 1's "byte-identical to round 1" cannot be checked against the diff the brief names as round 1's.
  - § Dispatch anatomy requires every round's record to survive, including the retained round-1 diff this round's brief names as evidence.
- **What right looks like:** restore round 1's `ac.diff` from the scaffold repository's git history, or from the worktree capture taken at round 1's hand-back. Write each round's capture only to its own file (`ac-2.diff`), never over an earlier round's.
- **Carrier:** the Orchestrator, as a record fix. No unit file moves.

## Referrals to the objective lane

- The `git apply --check` exit 0 of `ac-shared-2.patch` against `a658879`, and each base-blob hash (claim 1). The only log of this is the writer's.
- The recursive comparison between the mutation copy and the final copy (claim 7).
- The worktree `check` exit code of 2, which the log does not record (claim 7).
- Whether the elements-layer `button:focus-visible` rule matches the programmatic `button.focus()` in C11, which is the report's explanation for the one green case under the empty partial (claim 2).

## Attacked and held

- **The given ruling on the reworded rows.** The accordion's `### Files` row and compatibility rows name "the … proof", while the sibling rows keep the bare path ("read by `tests/…/collapse.test.ts`", `ac-shared-2.patch:84`). The table now reads unevenly, but only the unit's rows follow the rule. Evening out the sibling rows is a CLOSE-OUT sweep, not this unit's work.
- **The binding case's header comment.** At `ac-shared-2.patch:662`, the comment borrows the page reason ("the level under the page's `h1` element") for a fixture the styles proof mounts in a scene with no page `h1`. It still reads true as a statement of the release markup the fixture mirrors, so it is not a defect.
- **The retained pair's first paragraph.** It still ends "and the component unit that owns it closes that" (`ac-shared-2.patch:193`). That is campaign vocabulary carried forward from base, and it is NAVBAR's `$assets` retirement to remove (family record, units table). Its second paragraph keeps base's passive "are declared … by their partials"; that is not a regression.
- **The S1 choice against the rest of the showcase.** Card's `h5` titles already skip levels. For the accordion, though, the release markup (`h2`) and the page outline agree, so the choice holds.
- **The `$icons` comment.** "The forms and accordion glyphs Bootstrap paints in the light mode" (`ac-shared-2.patch:255`) is loose for glyphs painted the same in both modes, but it is not false. This matches round 1's ruling.

VERDICT: FAIL 7, 8; outside the claims: REC-1
