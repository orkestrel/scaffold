**Audit round 1, UTIL-SPACING (`usp`): subjective lane, run by `reviewer` on Opus 5.5.** The brief named this lane, and I held it throughout. The unit was written by `opus` on Opus 5.5, which is the same engine as this lane, so I attacked its work harder.

Path abbreviations used in the evidence:
- `P` = `/home/user/scaffold/.orkestrel/veneer/units/usp-shared.patch`
- `D` = `/home/user/scaffold/.orkestrel/veneer/units/usp.diff`
- `R` = `/home/user/scaffold/.orkestrel/veneer/units/b-utilities-usp-report.md`
- `M` = `/home/user/scaffold/.orkestrel/veneer/units/usp-instruments/usp-mutate.log.txt`

## Per-claim verdicts

**1. Scope and delta — CONFIRMED.**
- `usp-status.txt:1-8` lists exactly the eight owned paths from the brief (`b-utilities-usp-brief.md:99-101`), and `D` carries those eight files and no others.
- The files patch `P` touches are all on the brief's Shared list (brief `:103-118`).
- No patched file is vendored, oracle, `src/browser`, `src/core`, `_mixins`, `_tokens`, `package.json`, `README.md`, or a sibling unit's file.
- I took the `git apply --check` result as given, as the Orchestrator's ruling says.

**2. The cascade against the oracle — CONFIRMED.**
- **One breakpoint walk:** `D:103-118` walks `breakpoint-each` once over all 14 entries in the release's map order, which matches R4 and the `_position.scss` precedent.
- **Physical sides:** `me` and `pe` write the right side and `ms` and `ps` write the left side (`D:108,110,115,117`).
- **Steps:** steps 1 to 5 read `--vn-space-2`, `-4`, `-8`, `-12`, and `-24`; `0` and `auto` stay literal (`D:86-100`).
- **Empty infix:** `pe` pointer events and `user-select` sit at the empty infix only (`D:68-71`).
- **Census:** `usp-cascade.log.txt:1` reads 551 selectors in the inventory and 551 in the cascade, with nothing missing, extra, repeated, normal, or custom.
- **Order:** the order is held by the per-entry-loop and padding-x mutations (`M:42-67`).
- **Layer:** the utilities layer is held by the unlayered-partial mutations (`M:134-155`).
- **Ledger:** conformance is green with the ledger rows applied (`usp-gates.log.txt:25-28`).
- Referral to the objective lane: `usp-cascade.mjs` has no logged negative control for its `extra` and `normal` arrays.

**3. The proofs distinguish their mutations — CONFIRMED.** Each mutation is logged with its site, command, exits, and failing cases. For each one below, the named assertion tells the mutation apart from the passing case.
- Wrong step map: the boundary cases compare pixels, 12 against 16 (`M:1-23`).
- A literal in place of the step token: the density phase expects double the length (`M:68-78`).
- Swapped side: the side table read (`M:24-41`).
- Loop run per entry: with the mutation, `.mx-sm-1` follows `.m-md-3` and reads 4 against 16 (`M:42-56`).
- Padding-x emitted before padding: the reading becomes `[16,16,16,16]` against `[16,4,16,4]` (`M:57-67`).
- Built rule written normal: the unlayered `7px` rule wins (`M:168-180`). No build exit is logged for this one because `dist` was edited directly, so a build exit does not apply.
- Unlayered partial: with the mutation the unlayered `!important` wins the first escape read (`M:134-155`).
- Negative margin: the `-n` lookup (`M:79-89`).
- Pointer and selection values written as another value: `M:90-133` and `M:156-167`.
- Failing-first: `usp-first.log.txt:5-32` reads 22 failed before the `@use` lines, each case individually rather than as a file-level error, and 22 passed after.

**4. The interaction proofs — CONFIRMED.**
- **Pointer case (`D:573-595`):** `readHit` is the installed `elementFromPoint` reading (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts:2202`). The `.pe-none` cover returns the button beneath, and the `.pe-auto` cover and its nested child return themselves.
  - Mutation: pointer-events `none` written as `auto`. It turned the case red (`M:101`).
  - A `.pe-auto` written as `none` mutation would also be caught by the assertion, but that run is not logged.
- **Selection case (`D:545-571`):** it presses one block line per value through `driveHold` and expects `Range`, `Caret`, and `None`. Three logged mutations turned it red (`M:118,131,167`).
- **Keyboard case (`D:597-605`):** only its `readStyle` guard is shown to catch a mutation (`M:102`). The traversal half would catch only a `.pe-none` rule that hides the element, such as `visibility` or `display`, and that mutation was not run. That half therefore documents browser behaviour. It is adequate for the claim.
- **`.pe-3.pe-none` case (`D:607-616`):** it reads `[16,'none']` and turned red under both the wrong step map (`M:11`) and pointer `none` written as `auto` (`M:103`).

**5. Tailwind shared names — CONFIRMED.**
- The measured split in `usp-shared-names.txt` and `usp-unshared-names.txt` matches `R:118-137` and the line names (`P:677,685,693,807,816`).
- `markup.html` gains exactly 91 elements (`P:700-790`).
- Both negative controls read red (`usp-negative.log.txt:6-25`).
- The profiles cases stay green with the unit's names alone (`usp-gates.log.txt:29-32`).
- Referral to the objective lane: `usp-base-service-up-patch.log.txt:12-26` blames the `['properties']` statement failure on UTIL-PAINT's patch. That attribution rests on the report's reading.

**6. Sections, specimens, and registries — BROKEN.** Most of the claim holds:
- The specimen names match brief criterion 5 (`D:275-282,156-159`).
- No specimen has an inline style, and every class it uses shipped at `2a3f223`.
- The construction order and the `index.ts`, `Showcase.test.ts`, `index.test.ts`, and `integration.test.ts` rows are correct (`P:562-615,665-666`).
- The `CASCADE_KEYS` rows are readable (`P:382-429`).
- The setup tables are frozen, exported, and bound by derivation (`P:246-357`).

Note 1, rule 2 ("Keep a case population out of a test file") fails in `tests/app/browser/sections/SpacingSection.test.ts`, in two places:
- **Auto-margin case (`D:423-431`):** it restates the margin `auto` population as a literal list: `['ms-auto','me-auto','mx-auto','mt-auto','mb-auto','my-auto','m-auto']`. The render case in the same file derives the same set from `SPACING_SIDE_CASES` (`D:299-301`).
- **Geometry case (`D:349`):** it restates the side order `['top','right','bottom','left']`. The style proof derives that order from the shorthand entry (`D:713-716`).

Fix: derive the names as `SPACING_SIDE_CASES.map(({ suffix }) => \`m${suffix}-auto\`)` and key the readings by name, keeping the bespoke expectation per name. Read the side order from the shorthand entry's `sides` field.

**7. The guide — BROKEN.** The sections, rows, tables, and links are present and follow the voice of `### Gap utilities`. Three sentences break the claim:
- **Bare code tokens at the end of a clause (note 1, rule 1), `P:826`:** "Veneer declares each of those with `!important`." Change it to "…with the `!important` flag". This matches the unit's own wording at `P:868`.
- **Bare code tokens, `P:831`:** "Tailwind names those utilities `pointer-events-none`, `pointer-events-auto`, and `select-*`." Change it to "…the `pointer-events-none`, `pointer-events-auto`, and `select-*` utilities".
- **Overclaim (note 1, rule 4), `P:854-856`:** "the `--vn-factor-density` token moves every margin and padding step … and a retuned `--vn-space-8` token moves the `.m-3` and `.p-3` classes". The next sentence (`P:856-857`) says the `0` and `auto` steps do not move, so "every step" is false. The sentence also says a class "moves" rather than naming what the rule applies. Rewrite it as: "…moves the margin and padding the `1` to `5` steps set, and a retuned `--vn-space-8` token moves the margin the `.m-3` rule sets and the padding the `.p-3` rule sets on every side."

**8. Law and report — CONFIRMED.**
- The only `as` casts are const assertions (`D:751,752,838`).
- There is no `any`, no `!` assertion, no suppression, no mock, and no nested function beyond callbacks passed directly.
- No new helper was added.
- Each gate's command and result line is recorded (`R:45-55`, matching `usp-gates.log.txt`).
- The report's comments and TSDoc contain none of the banned terms.
- The report's sentence "passed three consecutive runs" (`R:372-373`) has no log behind it, so I am recording it here rather than confirming it.

Counts the report states, listed for the record:
- 551 selectors in the inventory and 551 in the cascade; 710 declarations.
- Test runs: 22 passed (styles), 8 passed (sections), 22 passed (conformance), 18 passed (service), 267 passed (setup).
- Full-project observations: 94 files and 1081 passed; 42 files and 120 passed; 109 passed and 1 skipped (policy); 19 passed (guides).
- Baseline: 22 passed (conformance) and 18 passed (service).
- Failing-first: 22 failed before, 22 passed after.
- 91 shared names; 546 ledger rows printed, of which 540 are `tokenized` and 6 are `dropped`.
- Mutation summaries: 1 failed and 21 passed; 4 failed; 2 failed and 16 passed.
- "Three consecutive runs"; a patch of 1638 lines.
- Owned-file line counts: 41, 11, 237, 198, 22, 21, 242, and 112.
- The diffstat figures at `R:26-32`.

## Findings outside the claims

**F1 — the setup table uses a second term for "class prefix".** At `tests/setupStyles.ts`, `P:145,153-154,162`, `SPACING_PROPERTY_CASES` names the text a class opens with `initial`, and its TSDoc repeats it ("the initial its classes open with", "the property's initial"). The same file already calls this concept `prefix` in `FLEX_ENTRY_CASES` (`tests/setupStyles.ts:1868,1877`), in the sizing entries (`:2100-2107`), and in `POSITION_ENTRY_CASES` (`:2148-2149`). This breaks "One concept, one term". The word `initial` also collides with the CSS keyword of the same name inside a styles module. Fix: rename the field to `prefix` and update both TSDoc blocks and every consumer (`D:730,748,824,846`; `P:255,259`).

**F2 — "key" carries two meanings in one guide paragraph.**
- At `P:901-903`, "The `pe` key" means the inventory key, and "the `none` and `auto` keys" in the next clause means the Sass value keys. Elsewhere the guide calls these "the value's key" (`guides/veneer.md:633,2902`). Fix: write "the `none` and `auto` value keys".
- At `P:892`, "The user-select key" leaves the key name unformatted. The same section writes "the `pe` key" and the guide writes "the `flex` key" (`:2789`). Fix: write "The `user-select` key".

**F3 — the Interaction copy reads false on a first reading.** At `app/browser/constants.ts`, `P:515`, the copy says: "a click passes through the link that takes no pointer events and reaches the links that take them." With one subject, this says a single click passes through one link and arrives at the other links. In fact, a click on the `.pe-none` link lands on its line (`D:207`). The sentence also opens with "point at each link" and then describes a click. Fix, for example: "Click each line to compare how much text one press selects, then click each link: the link that takes no pointer events lets the click through to its line, and each link that takes pointer events takes the click itself."

**F4 — the retained report names a patch path that doesn't exist (the Orchestrator's retention step).** `R:8` names `/home/user/veneer-usp/.orkestrel/veneer/units/usp-shared.patch`. No `.orkestrel` directory exists under `/home/user/veneer-usp` (a Glob search returned no files). The retained patch is at `/home/user/scaffold/.orkestrel/veneer/units/usp-shared.patch`. Fix: point `R:8` at that path.

## Referrals

These go to the objective lane:
- **The auto-margin section case cannot fail for two of its members.** In `SpacingSection.test.ts` (`D:451,458`), `me` asserts only `[3] === 0`. The `.me-auto` card sits at the start of the line whether or not the auto margin applies, and the case never reads the "Item" sibling. `my` asserts only top equals bottom, which the `stretch` default also satisfies at 0 = 0. Mutation: `.me-auto` or `.my-auto` writing `0` leaves both assertions green.
- **The cascade census has no control.** `usp-cascade.mjs` has no logged run that plants an extra selector or a normal declaration and shows the instrument catching it.
- **The last guide edit was not re-gated.** The guide paragraph was rewrapped after the final gate run, and only `oxfmt` was re-read (`R:354-356`). Nobody re-ran `test:guides` against the patched guide.
- **The profiles failure attribution** under claim 5.

## Attacked and held

- **Region names.** "Interaction" is singular while the release's docs page is "Interactions". This holds: the family record fixes the region as `Interaction` (`b-utilities-family.md:19`), consistently with the other singular regions (Border, Color, Shadow).
- **The `pe` key split across two partials.** R1 requires a key to ship in one unit, not one partial. Each entry sits in the partial for its release docs page.
- **Card-drawn specimen boxes.** The Position precedent draws painted boxes with cards (`app/browser/constants.ts:2323-2324`).
- **Guide voice and structure.** The sections follow `### Gap utilities` paragraph by paragraph (`guides/veneer.md:2722-2755`). The "receipts" wording is the guide's established term (`:2711,2755`).
- **The Tailwind paragraph sits apart from the offsets sentence.** Shared-file edits are append-only (R10), so a separate paragraph is the expected shape.
- **The unlayered-`!important` comment wording** matches every sibling proof (gap, position, sizing, and display).

VERDICT: FAIL 6, 7; outside the claims: F1, F2, F3, F4
