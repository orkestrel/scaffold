**Lane held: subjective** (Opus 5.5, reviewer). The brief was checked for dispatch defects and has none.

1. **Scope and delta — CONFIRMED.**
   - `uf-status.txt:1-4` lists only the four Owned paths, and `uf.diff` carries only those files.
   - `uf-shared.patch` touches `index.scss`, `conformance.test.ts`, `setupStyles.ts`, `setupStyles.test.ts`, `setupServer.test.ts`, `setup.ts`, `constants.ts`, and `guides/veneer.md`. The brief lists every one of them as Shared (`b-utilities-uf-brief.md:99-113`).
   - The combined patch equals the union of the per-file patches. Every per-file hunk header matches a combined header, and the changed-line tallies agree: 301 lines in the per-file patches and 301 in the combined patch (Grep `^[+-][^+-]`).
   - The patch applies to a fresh extract. The mutation instrument ran against a `git archive 2a3f223` copy with the patch applied, and its exact-string edits of the patch's guide and constants hunks found their targets. The instrument logs `absent:` or `edit failed` on a miss, and neither appears (`uf-mutations.sh:18-29,172-190`; `uf-mutations.log.txt:242-258`).
   - No hunk touches a vendored file, `src/browser/**`, `src/core/**`, `package.json`, `README.md`, a Tailwind fixture, or a sibling unit's file.

2. **The cascade against the oracle — CONFIRMED.** The objective lane owns the full inventory comparison; this ruling rests on the following evidence.
   - The `normal` mutation requires every one of the 20 rules to appear verbatim as `.X{prop:value!important}` in the built cascade. No `absent:` appears (`uf-mutations.sh:90-94`, log `:136-144`).
   - The `cap` and `fluid` rows show that no cap and no `calc()` ship.
   - The escape and `unlayered` cases place the rules in the utilities layer (log `:154-160`).
   - Removing the `#### fs` and `#### lh` rows reddens conformance, and the rows keep it green (log `:251-258`; `uf-gates.log.txt:9-11`).
   - Source: `_font.scss` in `uf.diff:87-137`.

3. **The proofs distinguish their mutations — CONFIRMED.** Each mutation below reddens the named case:
   - `monotoken`: the root `--bs-font-monospace: serif` retune (`uf.diff:243-245`).
   - `monoliteral`: the equality with the token twin plus both retunes.
   - `fluid`: the viewport case (smaller at 390, larger at 1280) and the retune case, for levels 1 to 4.
   - `literal`: the viewport case for levels 1 to 5 and the retune case for all six. A `.fs-6` literal passes the viewport case because 1rem equals 16px, and `fs6literal` reddens only the retune case. The retune case is the one that binds.
   - `cap`: the viewport case at 1280.
   - `italicmissing`: the `oblique 20deg` parent.
   - `lighter100` and `bolder700`: only the 600 parent separates them, and the band-control case pins the bands (`uf.diff:279-296`).
   - `normalmissing`: the 600 parent.
   - `lhsm`: the factor case.
   - `lhliteral`: only the token retune case, because the default factor is identical.
   - `infixed` and `infixedsample`: the `findRule` sweep and the reading case.
   - `moderule`: the dark-island comparison.
   - `density`: the doubled factor.
   - `reorder`: the later-value case.
   - Dropping `!important` reddens three cases: the later-value case (through the inline `oblique` row), the priority case, and the escape case.
   - `elementslayer`: the later-value case and the heading-override case.
   - `unlayered`: the escape case.
   - The ledger, `tablevalue`, `entryrow`, and `entryproperty` mutations each redden their named case.

   **The report's statement holds.** Dropping `!important` alone leaves the heading-override case green: log `:136-144` omits that case, and a later layer's normal declaration beats the components layer. That case pins the layer.

   **Evidence caveat.** The log is the writer's instrument output. The retained script is inspected (`uf-mutations.sh`) but was not re-executed by this lane.

4. **Font sizes on the heading scale — CONFIRMED.**
   - Design verdict R7 (`b-utilities-design-verdict.md:73-76`) rules the drop "the way the `#### h1` rows do".
   - The heading element and the `.h1` class write only `var(--vn-size-#{9 - $level})`, with no fluid rule and no media block (`src/styles/elements/_heading.scss:12-16`, `components/_type.scss:12-16`).
   - The guide's `#### h1` rows drop the cap the same way (`guides/veneer.md:4171-4172`).
   - `styles.md` is satisfied: the unit reuses tokens and invents none.
   - The viewport case asserts both the recorded size and equality with the heading class at `VIEWPORT_WIDTHS` = `[390, 1280]` (`tests/setupStyles.ts:2053`; `uf.diff:169-185`).
   - `TYPE_HEADING_CASES` and `TYPE_HEADING_TOKEN_CASES` are reused, not restated (`setupStyles.ts:2586-2621`).
   - The unit's design choice is the right one beside the heading classes: a `.fs-N` class and an `.hN` class on one page resolve one size at every viewport.
   - The source restates the `9 - $level` mapping a third time; see the referrals.

5. **Tailwind shared names — CONFIRMED.**
   - The probe compiled all 20 names through the installed `@tailwindcss/postcss` 4.3.3. Only the positive controls `.font-mono`, `.leading-6`, and `.italic` were emitted (`uf-tailwind-probe.log.txt:17-19`).
   - The `tailwind-line` negative control reads red, and the line is restored (log `:287-295`).
   - The patch carries no line change, no fixture change, and no `markup.html` change.

6. **Sections, specimens, and registries — CONFIRMED.**
   - **Specimen names:** `Font sizes`, `Font weights`, `Font styles`, `Line heights`, and `Monospace` follow the region's noun-phrase pattern (`Display values`, `Width steps`).
   - **Labels:** the specimens label their text with class names, as the Flex specimens do (`constants.ts:2222-2227`).
   - **Classes and inline styles:** the markup has no inline style. Its only foreign classes are `container-fluid`, `row`, `row-cols-2`, `row-cols-md-4`, and `g-3`, all shipped at the base (`components/_grid.scss:32`).
   - **Section proof:** it appends to the existing pinned name, markup, and tag literals and iterates no population (`TypeSection.test.ts:18-144`).
   - **`CASCADE_KEYS` rows:** each reads a longhand the rule sets, with a computed value on a rendered box (`uf-shared.patch:289-318`).
   - **Barrel agreement:** the `listed` literal, the order case, and the dash-proof set gain the same keys at the barrel's `gap` → `font` → `visibility` slot.
   - **Tables:** they are frozen and exported, and they are bound by derivation from `oracle.components` (`uf-shared.patch:175-240`).
   - **Region copy:** the Type copy is accurate.

7. **The guide — BROKEN.** The heading holds. `### Font utilities` follows the `### Gap utilities` precedent, a section named for its partial whose specimens sit in another region (`guides/veneer.md:2722`). It avoids colliding with UTIL-TEXT's `### Text utilities`. Its placement and its Files, compatibility, ledger, and Tests rows are correct. The following sentences are false or use a coined term:
   - **7a. `uf-shared.patch:413-414`.** The sentence reads: "The weights, the styles, and the other line heights stay literal, because no published Veneer token carries them."
     - **What is wrong:** the sentence is false for the weights. `TOKEN_NAMES.weight.body` and `TOKEN_NAMES.weight.heading` are published (`src/core/constants.ts:218-220`). They carry `400` and `600` (`_tokens.scss:275-276`; guide token table `:3222`), which are the `.fw-normal` and `.fw-semibold` values. The package already tokenizes a literal `400` weight as `var(--vn-weight-body)` (guide ledger `:4722`, `:4804`, `:4837`, `:4897`).
     - **Why it matters:** a reader checks `TOKEN_NAMES` and finds the stated reason false.
     - **What right looks like:** keep R2's ruling and state its real reason. Suggested wording: "The weights, the styles, and the other line heights stay literal. A weight class names a point on the weight scale, and the `--vn-weight-body` and `--vn-weight-heading` tokens name the weight of a role, so a retuned body weight leaves the `.fw-normal` class at 400. No published Veneer token carries a style or the other line heights."
   - **7b. `uf-shared.patch:502-503`.** The § Showcase sentence reads: "The font utilities join Type beside the heading and display classes whose sizes they share."
     - **What is wrong:** the display classes read `--vn-display-N`, which resolves 5rem to 2.5rem (`components/_type.scss:27-30`; `_tokens.scss:265-270`). No font utility reads or resolves those sizes.
     - **What right looks like:** "The font utilities join Type beside the heading classes, whose sizes the size classes share."
   - **7c. `uf-shared.patch:410-411` and `:430`.** Two phrases use a coined term: "so a retuned body line moves the class" and "under a retuned body line".
     - **What is wrong:** "body line" is not the package's term. The guide names the value "the `--vn-line-body` token" everywhere else (`:1315-1316`, `:3221`). This conflicts with the "one concept, one term" law.
     - **What right looks like:** "a retuned `--vn-line-body` token".

8. **Law and report — BROKEN.** The code is clean: no `any`, no `as` beyond the `as const` const assertion (`uf-shared.patch:181`), no `!`, no suppression, no mock, no nested function, and no new helper. The gate commands appear with their result lines (`uf-gates.log.txt`). The prose breaks the writing rule:
   - **8a. Counts.** The guide adds "each weight under two parent weights" (`uf-shared.patch:431`), and the `fw` compatibility row says "under two parent weights" (`:492`). The comment at `uf.diff:259-260` does the same. `FONT_WEIGHT_PARENTS` is a table that can grow. Name the members: "under a 400 and a 600 parent weight".
   - **8b. Positional names.** "The release scales its first four sizes" (`uf-shared.patch:406-407`, and the same wording at `uf.diff:166`). Write "scales the `.fs-1` to `.fs-4` sizes".
   - **8c. Report ordinals.** `b-utilities-uf-report.md:119-127` names brief criteria by number ("Criterion 1", "Criteria 2 to 7", the numbered list). Name each gate instead.

   **Counts the report states, listed for the record.** Tallies not tied to a run:
   - "Added (54 lines)" and "298 lines, 28 cases" (`:10-11`)
   - "+39" and "1 line" (`:12-13`)
   - "8 files changed, 316 insertions(+), 4 deletions(-)" (`:17`, tool output)
   - "24 records … 20 unconditioned selectors and 4 records" and "20 rules" (`:44`)
   - "(7 records)" (`:55`)
   - "all 20 names" and "the 20 names plus the controls" (`:83-84`)
   - "the five `CASCADE_KEYS` rows" (`:133`)
   - "three items" and "the two files" (`:146`)
   - "one row for each of N = 1 to 4" (`:101`)
   - the specimen tally in the Section text (`:110`)

   Run-reported values, which the rule permits:
   - the baseline: 22 passed and 18 passed
   - the failing-first table: 27 failed, 1 passed (28); 1 failed, 1 passed; 1 failed, 21 passed
   - the Red column: "1 each", "10 and 13", "13 and 1", "4", "3", "2, 2, and 1", "2", "1"
   - the control run: 0 failed, 28 passed
   - the precedence mutations: 1 red, 3 red, 2 red
   - the negative control: 2 failed | 16 passed
   - the gates: 353 files; 28 passed; 93 files and 1087 tests; 7 passed; 40 files and 112 tests; 22 passed; 18 passed; 267 passed; 109 passed and 1 skipped; 176 passed

**Findings outside the claims**

- **F1. `uf-shared.patch:438-442`: the `fs` departure bullet hides a change in resolved size.**
  - **What is wrong:** the sibling bullets each state the resolved result: "which resolve to the same lengths" (`guides/veneer.md:2751`), "the same levels" (`:2862`), and the `lh` bullet's "the same factor". The `fs` bullet is the only one whose sizes actually differ from the release, and it states only "resolves its heading class's size".
  - **The measured difference:**
    - `.fs-1` resolves 36px (`--vn-size-8` = 2.25rem), where the release caps at 2.5rem (40px).
    - `.fs-4` resolves 20px, where the release caps at 1.5rem.
    - `.fs-5` resolves 18px (`--vn-size-4` = 1.125rem, `_tokens.scss:260`), where the release resolves 1.25rem (20px) at every viewport.
  - **Why it matters:** a developer porting Bootstrap markup gets smaller type with no sentence saying so.
  - **What right looks like:** append a sentence: "so the classes resolve Veneer's heading sizes rather than the release's: the `.fs-1` class resolves 36px where the release caps at 40px, and the `.fs-5` class resolves 18px where the release resolves 20px."

**Attacked and held**

- **Monospace stack.** The `.font-monospace` class resolves `var(--vn-font-mono-base)` without the `ui-monospace` lead that `code`, `pre`, `kbd`, and `samp` write (guide `:3217`, `:4442-4448`), so the two can resolve different faces. This follows family ruling 3 (write the release's `var(--bs-*)` value byte for byte), and the guide claims no equality. It is correct as shipped.
- **The Type region's paragraph.** "monospace stack" is acceptable, because the guide's token table already calls the family list a "stack" (`:3217`). The word does collide with the `.hstack` and `--vn-stack-*` vocabulary.
- **The section heading.** The attack was that R15's "`### <Page> utilities`" rule demands `Text`. The Gap and Display sections already name mechanisms rather than release pages, so the heading holds.

**Referrals**

- **To the Orchestrator: the `9 - $level` mapping** now appears in `elements/_heading.scss:14`, `components/_type.scss:14`, and `utilities/_font.scss:11`. The tests bind the copies by behaviour. Centralizing the mapping needs an edit to the off-limits `elements/**`, so it belongs to a later unit, not to UF.
- **To the Orchestrator: the rendered claim in the `TYPE_SPECIMENS` remark** that the line-height columns are "narrow enough to wrap at every width" (`uf-shared.patch:339-341`) is NOT-EVIDENCED. No capture portfolio was supplied, and the `CAPTURE=1` frames for `line-heights` at 390 and 1280 settle it.
- **To the Orchestrator: UTIL-TEXT's `### Text utilities` section** must point readers to `### Font utilities` for the release Text page's font entries. That obligation belongs to UTIL-TEXT's brief, not to this unit.

VERDICT: FAIL 7, 8; outside the claims: F1
