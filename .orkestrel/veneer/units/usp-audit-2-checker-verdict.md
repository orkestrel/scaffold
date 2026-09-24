# Verdict — usp round 2, checker lane (Sonnet, workflow wf_0271a2cb-dfc)

## Verdict — checker lane, claims 1, 4, 5, 6, 7 (round 2, UTIL-SPACING)

**Claim 1 (Scope and delta) — CONFIRMED.**
- `usp-2-status.txt:1-8` lists exactly round 1's 8 owned paths, all `??`, matching round-1's `usp.diff:1,28,56,73,120,238,497,701` new-file paths.
- `usp-instruments/usp-2-owned-interdiff.txt:1-209` shows owned-file changes only in `tests/app/browser/sections/SpacingSection.test.ts` (S1) and `tests/src/styles/utilities/interaction.test.ts`/`spacing.test.ts` (S3, S4 comment/rename hunks). No other owned file has a hunk.
- `usp-instruments/usp-2-shared-interdiff.txt:1-138` shows the shared patch changes only in `tests/setupStyles.ts`, `tests/setupStyles.test.ts` (S3/S4), `app/browser/constants.ts` (S6), and `guides/veneer.md` (S2/S5), plus re-flow of the paragraphs each touches.
- `usp-2.diff:56-119` (`_spacing.scss` index `ba19dc5`, `_interaction.scss` index `789a3e1`) is byte-identical to `usp.diff:56-119` — no cascade byte changed. No specimen markup file appears in either interdiff.

**Claim 4 (S2 and S5: guide wording) — CONFIRMED.**
- `usp-instruments/usp-2-shared-interdiff.txt:78-134` (`guides/veneer.md`) reads "…with the `!important` flag" (line ~81), "Tailwind writes those as the `pointer-events-none`, `pointer-events-auto`, and `select-*` utilities" (line ~87), the density sentence "...moves the margin and padding the `1` to `5` steps set, and a retuned `--vn-space-8` token moves the margin the `.m-3` rule sets and the padding the `.p-3` rule sets on every side" (lines ~104-112), "The `user-select` key" (line ~120), and "the `none` and `auto` value keys" (line ~132). All five sentences are present verbatim.

**Claim 5 (S3: token nouns) — CONFIRMED, on the sites read.**
- `usp-instruments/usp-2-owned-interdiff.txt:119-134,196-208` shows "An unlayered `!important` declaration sorts after every layered one" in both `interaction.test.ts` and `spacing.test.ts`, the importance token now carrying its noun.
- `usp-shared-2.patch:7-16` (`tests/setupStyles.ts` TSDoc) reads "If the `auto` field holds the `true` value, ... if it holds the `false` value" — the `auto` field and both boolean values carry their nouns.
- Sampled additional doc blocks (`SPACING_STEP_CASES`, `SPACING_SIDE_CASES`, `USER_SELECT_VALUES`, `POINTER_EVENTS_VALUES` in `usp-shared-2.patch:129-183`; `SPACING_COPY`/`SPACING_SPECIMENS`/`INTERACTION_COPY`/`INTERACTION_SPECIMENS` doc comments in `usp-shared-2.patch:436-528`) show every code token followed by a noun. I read these sites only; I did not sweep every added line in both rounds, so the claim's universal clause ("no line rounds 1 and 2 added leaves a code token without its noun") is CONFIRMED only on the sites named above and sampled; I found no counterexample in any site I read.

**Claim 6 (S4: the rename) — CONFIRMED.**
- `usp-2-shared-interdiff.txt:2-53` shows `initial` → `prefix` in the `SPACING_PROPERTY_CASES` table, its TSDoc, its `@remarks`, and the `setupStyles.test.ts` binding case (destructuring and template use).
- `usp-2-owned-interdiff.txt:134-208` shows every reader in `spacing.test.ts` renamed the same way.
- A grep for `initial` across `usp-2.diff` and `usp-shared-2.patch` returns no hit — no reader of the old field name remains.
- The mutation reading is in `b-utilities-usp-report-2.md:123-128`: the margin row's `prefix` written `'p'` reddens the binding case (`Tests 1 failed | 121 passed (122)`, `expected [ 'p', 'p', ... ]`), and the restored run reads `Tests 122 passed (122)`. Mutation: write `prefix: 'p'` on the margin entry; assertion distinguishes it because the derived key set then collides with the padding entry's keys, which the `toEqual(keys)` check catches.

**Claim 7 (S6, law, and report) — CONFIRMED.**
- S6: `b-utilities-usp-report-2.md:141-154` and `usp-2-shared-interdiff.txt:62-70` (`app/browser/constants.ts`) give `INTERACTION_COPY`'s after-text: "...a click on the link that takes no pointer events lands on what lies beneath it, and a click on each other link reaches that link." `InteractionSection.test.ts` (`usp-2.diff:197-218`) hit-tests exactly that: `readHit(passed)` (the `.pe-none` link) equals `passed.parentElement` (what lies beneath), and every `.pe-auto` link's `readHit` equals the link itself (reaches that link).
- Law: grep of `usp-2.diff` for `any`, `!`-assertion, `eslint-disable`, `@ts-`, and non-const-assertion `as` returns no non-conforming hit; every `as const` use (lines 451, 762-763, 849) is a const assertion. No nested function declaration observed in the diff (all functions are arrow callbacks passed as arguments or returned directly).
- Report: a temporal/filler-word sweep of `b-utilities-usp-report-2.md` (`currently`, `now`, `latest`, `new`, `since`, `once`, `simply`, `easy`, `just`) returns no hit; a tally-of-a-growable-set sweep returns no hit. The gates table (`b-utilities-usp-report-2.md:183-195`) writes each command exactly as run with its exit and result line.

**Counts the report states** (listed per the output contract, not endorsed as claims): S1 mutation table — 7 rows each `1 failed | 4 skipped (5)`, restored row `1 passed | 4 skipped (5)`; S4 — `1 failed | 121 passed (122)` (mutated), `122 passed (122)` (restored); S7 — inventory `551`, cascade `551`, declarations `710`; gates table — `22 passed (22)` (styles), `8 passed (8)` (app sections), `122 passed (122)` (setup), `22 passed (22)` (conformance), `19 passed (19)` (guides), `109 passed | 1 skipped (110)` (policy); service observation — `2 failed | 16 passed (18)`.

**Findings outside the claims:** none found within the sites read.

VERDICT: PASS
