**Subjective-lane verdict: AP-COLOR audit round 4 (`apc`)**

Lane held: **subjective** (`reviewer`, Opus 5.5). Claims 2 and 3 were the focus, and claim 1 is ruled too. Evidence is the retained artifacts under `/home/user/scaffold/.orkestrel/veneer/units/` and the worktree `/home/user/veneer-apc`, read-only. I ran nothing, so every mutation below is identified by reading unless a log is cited.

## Per-claim verdicts

**1. Scope: BROKEN.** The defect is in how the claim is worded, not in the work.
- **Holds: the status lists.** `apc-4-status.txt` lines 1–15 and `apc-3-status.txt` lines 1–15 are identical.
- **Holds: the test file edit.** The `color.test.ts` hunk in `apc-4.diff` (lines 5–380) matches the round-3 hunk in `apc-3.diff` (lines 463–838), except for:
  - the title lines at `apc-4.diff:257` against `apc-3.diff:715`, and at `apc-4.diff:349` against `apc-3.diff:807`;
  - the blob-hash `index` line at `apc-4.diff:2` against `apc-3.diff:460`, which follows from the title edits.
  - The hunk headers are identical. The worktree file (`color.test.ts` lines 247 and 339) and `apc-4-round3-delta.txt` agree.
- **False as written: "`apc-4.diff` differs from `apc-3.diff` in those two lines alone."**
  - `apc-4.diff` contains only the `color.test.ts` section (`apc-4.diff:1`; the report's own lines 38–39).
  - `apc-3.diff` also contains `_tokens.scss`, `_button.scss`, `_color.scss`, `_link.scss`, `setup.ts`, and the other round-3 test files (`apc-3.diff` lines 1, 47, 86, 114, 176, 200, 284, 381, 417, 443, and 841).
  - The `index` line also differs.
- **Unsupported whole-tree property.** The claim implies nothing else in the tree changed. The status list shows which files changed, not what is in them. The only evidence that the other files are unchanged is the unit's own `apc-4-round3-check.txt:1` ("True"), which shows no negative control. That is the writer's evidence. My one spot check, `_color.scss` in the worktree against `apc-3.diff` lines 86–111, matched.
- **Smallest correct fix:** restate the clause as "the `color.test.ts` section of `apc-4.diff` differs from the matching section of `apc-3.diff` only in the two title lines and the blob `index` line". Settle the whole-tree property with a round-4 `git diff 712ae72` over every file, compared against `apc-3.diff` plus `apc-shared-3.patch` by an instrument that has a control.
- The gate-log clause holds as an observation. The four logs each record exit 0: format at line 10, lint at line 6, check at line 30, and the style suite at line 8203.

**2. K1: BROKEN.** The retitle fixed the round-3 gap and created the opposite one. The title now claims more than the assertions prove.
- **Title** (`color.test.ts:247`): "moves a role color and its emphasis class to the tier of a fill or body text retuned at the scope declaring the %s theme". The "or" applies both subjects to both retunes.
- **What the assertions prove:**
  - **Fill retune (lines 260–269):** the role color moves (262), matches the fill twin (263–268), and the emphasis class matches it (269).
  - **Body-text retune (lines 272–280):** only the role color is asserted (274 and 275–280). No assertion reads `emphasis` after line 270.
- **So the title claims something no assertion proves:** that the emphasis class follows a retuned body text.
- **The failing state.** Change the `$emphases` entry (`_color.scss:36`) to `color-mix(in oklab, var(--vn-color-<role>-base) 70%, <resting per-mode body literal>)`.
  - Line 269 stays green, because at rest the literal equals `--vn-text-body-base`.
  - The body-text half has no emphasis assertion, so the mutation survives while the title says it cannot. The assertions do not distinguish it.
- **Other halves hold:**
  - The role-color halves are proven red by `apc-3-mutation-primary-channel.log.txt` lines 184 and 196; the assertion bytes are unchanged since then.
  - The fill-half emphasis assertion goes red, by reading, under round 3's compiled-tier-literal mutation (`apc-audit-3-subjective-verdict.md:29`).
- **Cause.** Round 3's subjective lane prescribed the retitle together with the assertion that makes it true (`apc-audit-3-subjective-verdict.md:31`). The reconciliation kept only the retitle ("Every assertion is kept", `apc-audit-3-verdict.md:13`), and brief 4 ordered "Change no assertion" (`ap-color-brief-4.md:29`).
- **Fix options:**
  - **Option A (recommended):** after `color.test.ts:280`, add `expect(matchesColor(readStyle(emphasis, 'color'), partner)).toBe(true)`. Before accepting it, show it red under the preceding mutation. The title then stays exactly true. Cost: an assertion change and one mutation run.
  - **Option B:** change only the title, to "moves a role color to the tier of a fill or body text retuned at the scope declaring the %s theme, and its emphasis class with the fill". Cost: the title describes the gap instead of closing it.
  - Choose A. This seam has used more than the three-round budget in `quality.md` § Rounds and verdicts, and B leaves the next title round open.

**3. K2: CONFIRMED.**
- **Title** (`color.test.ts:339`): "keeps each emphasis class outside the neutral roles opaque under an opacity step and fades its role class beside it, in %s mode".
- **Scope is exact.** The case iterates `TEXT_TIER_CASES` (`color.test.ts:342, 349`). That list is primary, secondary, success, info, warning, and danger (`tests/setupStyles.ts:2817–2824`). The source's `$aliased` minus `$neutrals` (`_tokens.scss:11, 14`) is the same set of roles, so "each … outside the neutral roles" claims neither more nor less.
- **Emphasis stays opaque (alpha 1, lines 355–360).** Mutation: give the emphasis class `/ var(--bs-text-opacity, 1)`. Executed in round 3, it went red for every tier role in both modes, reading 0.5 where 1 is required (`apc-instruments-3/apc-3-mutation-emphasis-opacity.log.txt` lines 165–267, restore byte-identical at line 294). The assertion bytes are unchanged since then (`apc-4.diff` lines 355–377 against `apc-3.diff` lines 813–835). It distinguishes.
- **Role class fades (alpha 0.5, lines 361–366).** Mutation, by reading: drop `/ var(--bs-text-opacity)` from the role entry at `_color.scss:17`. The role reads alpha 1 and line 366 goes red. It distinguishes.
- "Under an opacity step" matches the single `text-opacity-50` fixture (line 344). "Its role class" pairs each role with its own emphasis class.

**Counts the report states** (`ap-color-report-4.md:34`): "1456 passed, 115 files", exit 0.
- Log: `apc-instruments-4/apc-4-final-test-src-styles.log.txt` records 115 files passed at line 8198, 1456 tests passed at line 8199, and exit 0 at line 8203.
- This equals round 3's count (`apc-instruments-3/apc-3-final-test-src-styles.log.txt:8199`), as a titles-only change should. The dot reporter prints no titles, so the log cannot show which titles ran.

## Findings outside the claims

**O1: the density-and-channel case's title omits the emphasis class, and round 3 carried this finding nowhere.**
- **Title** (`color.test.ts:220`): "leaves a role color on its tier when the role channels or the density factor are retuned". Line 235 also asserts `readStyle(emphasis, 'color')` against its resting value under the density retune.
- **Failing state.** Make the `$emphases` entry (`_color.scss:36`) scale with the density factor. Line 235 goes red under a title that never names the emphasis class. This is the same class of defect as round-3 K1.
- **Dropped finding.** Round 3's subjective lane raised it (`apc-audit-3-subjective-verdict.md:30, 32`). The round-3 reconciliation neither carried it nor dropped it on the record (`apc-audit-3-verdict.md:28–33`), which breaks the "Carry every finding" rule in `.agents/orchestration.md`.
- **What right looks like.** After line 242, add `expect(readStyle(emphasis, 'color')).toBe(resting[1])`, so the emphasis class is also held under the channel retune. Then retitle to "leaves a role color and its emphasis class on their tier when the role channels or the density factor are retuned, in %s mode".
  - Do not retitle alone. Round 3's retitle-only option (`apc-audit-3-subjective-verdict.md:32`) would repeat claim 2's over-claim for the channel half.
  - Alternatively, remove `emphasis` from line 235.
- **Ruling owed.** Record the invariant that ends this seam: a case title names each element an assertion reads, under each retune in which it reads that element. Sweep `color.test.ts` against that invariant once, instead of opening another round per title.

## Attacked and held

- **K2 "fades" against the exact 0.5.** "Fades … under an opacity step" reads as fading to that step's alpha, which is what the exact 0.5 asserts. It is held and not ruled narrow.
- **K1 "tier".** The word covers the twins' `TEXT_TIER_SHARE` mix (`color.test.ts:252–253`).
- **Line 241 is a control, not a property.** The `text-bg-primary` consumer assertion proves the retune reached the scope, so the title does not need to name it.

## Referrals

- **To the objective lane: the retained mutation runner no longer selects the K2 case.**
  - `apc-instruments-3/apc-mutate-2.py:25` selects the emphasis-opacity proof with `-t "keeps each emphasis class opaque under an opacity step"`. That pattern no longer matches the renamed title at `color.test.ts:339`.
  - A re-run would select zero tests in that proof. Decide whether the runner would then report the mutation as surviving, or report a pass on an empty selection.
  - The `retune` selector at line 23 ("to the tier of a fill or body text") still matches the K1 title.
- **To the Orchestrator and the checker: stale paths in the retained report.**
  - The retained report still names launch paths: `tmp/units/apc-brief-4.md` at `ap-color-report-4.md:3` (retained as `ap-color-brief-4.md`), and `tmp/units/apc-4-round3-*` at lines 7 and 23 (retained under `apc-instruments-4/`).
  - It also names `apc-shared.patch` at line 23, and so does `apc-4-round3-check.txt:1`. In the retained folder that name resolves to round 1's shared patch; round 3's is `apc-shared-3.patch`.
  - `.agents/orchestration.md` § Dispatch anatomy requires these paths to be rewritten when artifacts are retained.

VERDICT: FAIL 1, 2; outside the claims: O1
