Lane: **subjective**, held in full by `reviewer` on Opus 5.5. The lane was read-only and executed nothing. Every ruling rests on the retained diff, patch, instruments, and logs, plus the worktree `/home/user/veneer-ut` at `2a3f223`. Line numbers for `ut.diff`, `ut-shared.patch`, and the report refer to the files under `/home/user/scaffold/.orkestrel/veneer/units/`.

## Numbered verdicts

1. **CONFIRMED.**
   - `ut-status.txt:1-14` lists only Owned paths. Each moved file appears as a ` D` entry at `components/` and a `??` entry at `utilities/`.
   - `ut.diff` carries only those files.
   - `ut-shared.patch` touches only Shared files: the `index.scss` barrel, the conformance test, the `setupServer.test.ts` file, `setupStyles` and its test, `setup.ts`, `constants`, `Showcase` and `index` with their tests, the integration test, the exclusion-line files, `markup.html`, and the guide.
   - Both Badge edits are owed. The base `constants.ts:1436` sentence reads "until a contextual fill class ships", and the base guide sentence reads "Veneer ships no such class". This landing makes both false. The edits are at `ut-shared.patch:486-487` and `:1038-1042`.
   - The patch adds nothing to a vendored or off-limits path.
   - The `git apply --check` clause is taken as given.

2. **CONFIRMED.**
   - `ut-instruments/ut-cascade-count.log.txt:1-5` shows 130 recorded sites against 130 emitted, with nothing missing in either direction and no priority fault. Its control is the `.text-truncate` normal-helper branch in `ut-cascade-count.mjs:25-28`.
   - The instrument does not read layers, so layer placement comes from source:
     - `_text-truncation.scss:1` sits in `@layer components`.
     - `_link.scss` is loaded ahead of `utilities/visually-hidden` (`ut-shared.patch:19-20`).
     - The opacity entries are gated to the empty infix (`_color.scss` `@if $infix == ''`, `ut.diff:388-399`).
   - The `tokenized` rows match what the gate printed (`ut-v1-conformance.log.txt:20-29`).
   - The objective lane owns the measurement itself.

3. **CONFIRMED.**
   - **Design fit:** the placement follows the landed precedent in `_position.scss:10-11`. An entry sits in the partial that owns it by theme only where the move changes no resolution. Moving the link entries to the head of the layer does change a resolution, so the map position in `_color.scss` is correct, and `_link.scss` keeps the helper alone (`ut.diff:460-467` explains why).
   - **Mutation "underline entry in `_link.scss` at the head":** it reddens `link.test.ts` "keeps an underline color class over a text decoration utility…" (`ut-mutations.log.txt:62-81`).
     - That case asserts a danger `text-decoration-color` that differs from `color` (`ut.diff:1319-1328`). The failure is therefore caused by the order change.
     - One confound: the mutation also removes the bare `.link-underline` class (the `null` key). That alone reddens the underline-opacity cases, which are not the named case.
   - **Mutation "`_link.scss` left in components, as the base loaded it":** it reddens the yield case and the conformance order case (`ut-mutations.log.txt:190-203`). The yield case compares the link's `color` with a sibling `.text-danger` (`ut.diff:1297-1305`), so it tells the two placements apart.
   - The helper-order defect this layout creates between two important helpers is recorded as F1.

4. **CONFIRMED.**
   - `.claude/rules/styles.md:42-43` forbids literal colours outside `_tokens.scss`.
   - The palette tokens resolve to the release's bytes (`_tokens.scss:203-206`) and are read at `_color.scss` (`ut.diff:329`, `:346-347`). The four palette tokens appear as rows in the `#### text` table (`ut-shared.patch:1175-1184`).
   - `_button.scss:135-139` writes white for every role except light. The pairs record black for info, warning, and light. One `foreground($role)` function would therefore change the button output, which R8 forbids.
   - There is precedent for reading the palette: the Badge label reads `--vn-palette-white-base` (`_badge.scss:17`).
   - Taste note, not a defect: the button assigns `var(--vn-palette-*-base)` directly to `$foreground`. The pairs build the same value from a `'white'` string by interpolation.

5. **CONFIRMED.** Every mutation the report names has a log entry with its site, command, exit, summary, and failing cases (`ut-mutations.log.txt`). The cases the report says have no recorded mutation are listed in `report:324-325`. For each mutation, the lane checked whether the named case's assertions tell it apart from the passing case:
   - **Priority dropped in the mixin:** yes. The resting inline `justify` value, a normal declaration, beats a normal layered rule (`log:131-151`).
   - **Breakpoint loop run per value:** yes. At 768px, `sm-center` is emitted after `md-start`, and the case expects `left` (`log:83-90`).
   - **Role colour written as a literal triplet:** yes. The retune case is the decisive one (`log:120-129`).
   - **Opacity entry ahead of the colour entry:** yes (`log:111-118`).
   - **Emphasis tier written as the light-mode mix:** yes. The dark reading is compared against the recorded alias (`log:102-109`).
   - **Pair foreground swapped, pair background swapped, opacity fallback dropped:** yes, against the recorded declaration resolved in the same scope (`log:2-32`).
   - **Pairs in the components layer:** yes, through the later-utility case and the escape case (`log:34-42`).
   - **`white-space` dropped from the truncation helper:** yes (`log:92-100`).
   - **`_link.scss` left in components:** yes (see claim 3).
   - **Underline entry in `_link.scss`:** yes, with the confound noted under claim 3.
   - **Partial outside every layer:** yes, but only the `_text.scss` run exists (`log:153-160`). The `_color.scss` and `_link.scss` escape cases are told apart only by the components-layer mutations.
   - **Section specimen mutations:** each reddens through the class lookup that `requireValue` performs, not through the layout or paint assertions.
     - "Responsive alignment specimen at the sm boundary" is caught only because the `.text-md-start` query fails.
     - At the journey widths of 390px and 1280px, the `sm` and `md` infixes produce identical readings (`ut.diff:756-767`). The case therefore cannot tell those two infixes apart by behaviour.

6. **CONFIRMED.**
   - `ut-shared-names.log.txt:6-12` matches the report's table (`report:141-149`).
   - Both negative controls read red (`log:217-237`).
   - The line and its copies change by `text-wrap text-nowrap` only, and `markup.html` gains one element per shared name (`ut-shared.patch:749-785`).
   - The profile reading `['--color-black', '--color-white', '--spacing']` is in `ut-final-service-base-profiles.log.txt:12-22`.

7. **CONFIRMED.**
   - The specimen names equal the brief's, and both regions extend `SpecimenSection` (`ut.diff:250-257`, `:278-285`).
   - No specimen writes a `style` attribute or an unshipped class. The classes used are `row`, `col-2`, `col-4`, `badge`, `text-*`, and links to `#main`.
   - The iterated populations come from setup tables (`LINK_ROLES`, `TEXT_OPACITY_CASES`, `TEXT_ALIGN_CASES`, `TEXT_ENTRY_CASES`). The literal name list and the `[390, 1280]` widths follow `DisplaySection.test.ts:28` and `FlexSection.test.ts:88`.
   - The construction order and the matching rows are at `ut-shared.patch:639-641`, `:652-653`, `:672-673`, and `:694-715`.
   - The `CASCADE_KEYS` rows read a property the rule sets. `readStyle` accepts custom properties (`@orkestrel/test` `dist/src/browser/index.d.ts:2528`).
   - The `listed` literal, the order paths, and the dash set agree with the barrel.
   - The `TEXT_*` tables are frozen, exported, and bound to the inventory by derivation (`ut-shared.patch:277-365`).
   - The defects found in the specimens and the copy are recorded as F2 and F3.

8. **BROKEN.**
   - **(a) The "prefixed decoration color" bullet is false** (`ut-shared.patch:1159-1162`). It says "Veneer emits the standard property alone". What actually ships:
     - The built cascade emits `-webkit-text-decoration-color` on every `.link-*` and `.link-underline*` rule: `/home/user/veneer-ut/dist/src/styles/index.css` (the base build; the partials use the same standard declaration, which the build prefixes).
     - The guide already says the opposite: "The prefixed `-webkit-text-decoration-color` alias is not a departure: the build emits it from the standard property" (`guides/veneer.md:2712`).
     - Fix: replace the bullet with § Icon links' sentence. Keep the link departures to the role-token bullet and the resting-colour-under-pointer bullet.
   - **(b) The opening sentence of `### Text utilities` is false** (`ut-shared.patch:1052`). It reads "The text keys ship whole … from the `src/styles/utilities/_text.scss` partial". The `text` key's colours, opacity steps, and pairs ship from `_color.scss`, and `.text-truncate` ships from components.
     - Fix: "The text formatting entries of the `text` key ship in the utilities layer from the `src/styles/utilities/_text.scss` partial: …", followed by a pointer to § Color utilities for the key's colours.
   - **(c) The `text` compatibility row is false for one selector** (`ut-shared.patch:1206`). It reads "Every official `.text-*` selector ships in the utilities layer". The inventory records `.text-truncate` under `text`, and that selector ships in the components layer. Fix: add "except the `.text-truncate` helper, which the `text-truncate` row records".
   - **(d) The rewritten `link` compatibility rows end a clause on a bare path** (`ut-shared.patch:1197-1198`): "the scale in `tests/src/styles/utilities/link.test.ts`." and "proved in `tests/src/styles/utilities/link.test.ts`." Note 1 item 1 names exactly this defect. Fix: add "proof" after each path.
   - **Held:** the note-4 sentence (`:1057-1058`), the Tailwind paragraph (`:1023-1030`), the Badge paragraph, and the other added code tokens.

9. **BROKEN.** The writing rule is broken in three places:
   - **The report names items by position**, which `AGENTS.md` § Writing forbids ("NEVER name a list item by its position"):
     - `report:332` reads "the second marks its first and last mutation `SKIP`".
     - `report:160-161` reads "The UP round-1 patch's second hunk…" and "Its first hunk reddens…".
     - Fix: name the script (`ut-mutate-2.py`), the mutations ("link partial left in components, as the base loaded it" and "a shipped shared name with its important flag dropped"), and each hunk by what it changes.
   - **A false comment in `text-truncation.test.ts:57`** (`ut.diff:897`): "A rule inside the utilities layer outranks the components layer whatever its priority."
     - An important declaration in the components layer beats a normal one in the utilities layer. That reversal is R5's whole premise.
     - Fix: "A normal rule inside the utilities layer outranks a normal rule in the components layer."
   - **False TSDoc in the `TEXT_SPECIMENS` remark** (`ut-shared.patch:507`): "the narrowest column the grid ships". The grid ships `.col-1` (`ut-shared-names.log.txt:13`), and the specimen uses `.col-2`. Fix: "a two-twelfths column".
   - **Minor:** the same remark spells "behaviour", while `app/` uses "behavior" throughout.
   - `any`, `as`, `!`, suppressions, mocks, and nested functions are referred to the objective lane and the checker.

   The counts the report states, listed for the record:
   - **Diffstat** (`report:70-81`): +41, +143, +10, +8 -37, +189, +207, +84, +58 -0, +22, +22, +154, +126.
   - **Baseline:** 22 passed (conformance) and 18 passed (service).
   - **Validation copy:**
     - 130 inventory sites and 130 cascade sites.
     - Owned style proofs: 94 passed.
     - App browser project: 12 passed.
     - Conformance: 22 passed.
     - Setup: 267 passed.
     - Policy: 109 passed, 1 skipped.
     - Guides: 19 passed.
     - Style proofs: 95 files, 1091 passed.
     - App proofs: 42 files, 119 passed.
     - Service with each profiles reading: 17 passed and 1 failed, twice; then 18 passed.
   - **Negative controls:** 2 failed and 16 passed, twice.
   - **"The path column widens by three characters."**
   - **Counts in prose:** "One patch", "one `BADGE_COPY` sentence", "one paragraph", "One resting `CASCADE_KEYS` row per specimen", "the one Tailwind profiles case", "both recipe fences", "both moved files' deletions", and "1 skipped".

## Findings outside the claims

- **F1: the two important helpers resolve in the reverse of the release's order.**
  - The release loads `color-bg` before `colored-links` (`node_modules/bootstrap/scss/_helpers.scss:2-3`). On one element, the later `.link-*` wins `color`.
  - Veneer loads `utilities/link` ahead of `utilities/color` (`ut-shared.patch:19`, `:28`). Both rules are important, sit in one layer, and have equal specificity, so the pair wins.
  - Failing input: `<a href="#main" class="text-bg-light link-danger">`. The release paints the danger colour; Veneer paints black. This comes from reading the source and the cascade order; the lane did not run it.
  - No case reads this combination, and the family exit criterion requires "the release's precedence proved".
  - **Architecture fit:** the design treats two helpers of the same kind differently. The colored-link helper has its own partial at the head of the layer, while the `color-bg` helper is folded into a utility partial. That asymmetry causes the inversion.
  - Smallest fix, which the Orchestrator must re-scope: move the pairs into their own helper partial in the utilities layer, loaded ahead of `utilities/link`, in `_helpers.scss` order. Then set `helperPaths['color-bg']` to that path, and add a proof case for the input above that reads the link colour.
  - The evidence shows R5's phrase "the `.text-bg-*` rules at the head of `_color`" is wrong.

- **F2: the `text-dark` specimen is unreadable in dark mode.**
  - The specimen writes `<p class="text-dark">` with no surface (`ut-shared.patch:571-576`).
  - `--vn-color-dark-rgb` is `33, 37, 41` in every mode (`_tokens.scss:233`, with no theme override). The dark body surface is `20, 25, 30` (`_tokens.scss:83`, applied through `_mixins.scss:293`). The computed contrast is about 1.15:1.
  - The remark's own rule says a colour meant for one surface "sits on the pair that paints one, so it reads in both modes" (`:563-566`). The specimen applies that rule to `text-light` and not to `text-dark`.
  - Fix: `<p class="text-bg-light"><span class="text-dark">text-dark</span></p>`, plus the matching selector check in `ColorSection.test.ts`.
  - The rendered result is NOT-EVIDENCED, because no capture was supplied.

- **F3: `COLOR_COPY` claims a "readable foreground on each role's fill", which is false for info.**
  - The recorded black on Veneer's info fill `0, 105, 168` (`_tokens.scss:225`, aliased at `:397`) computes to about 3.6:1. Warning computes to about 4.2:1.
  - § Color utilities states honestly that the foregrounds are recorded "rather than computing them against Veneer's fills".
  - Fix: "…and the pairs that set the foreground the release records on each role's fill."

## Attacked and held

- **Link entries in `_color.scss` rather than a partial of their own:** held. The owned files are fixed, and one file cannot sit at both the head of the layer and the map position.
- **Hard-coded specimen-name lists in the section proofs:** held. They are expected values, not iterated populations, and they match the precedent files.
- **The `null` key in `$underlines`:** held. It is documented mixin behaviour (`_mixins.scss:355-356`).
- **`TEXT_COLOR_CASES` derived from `LINK_ROLES`:** held, with a naming note. The role list is one concept that carries a link-scoped name.
- **The `CASCADE_KEYS` row reading `--bs-text-opacity`:** held. It reads a property the rule sets, though `color` would bind the row to what the frame shows.
- **Keeping the Badge region's dark table surface:** held. The Badge files are outside the unit's scope.
- **Guide voice against § Display, § Position, and § Visibility utilities:** held, except for the items under claim 8.

## Referrals

- **To the objective lane:**
  - Execute F1's failing input.
  - Confirm that the unit's own build emits the prefixed alias from claim 8(a).
  - Rule on the base guide's inconsistency: the `#### link` and `#### icon-link` tables record `dropped` rows, while `guides/veneer.md:2712` calls the alias "not a departure".
  - `ut-mutations.log.txt:54-60` holds a green mutation, "link partial loaded from its old components position". It is equivalent and the report does not mention it.
  - `log:205-215` holds a run named "…written onto the exclusion line" that neither retained script contains.
  - The "Wrapping" specimen's `text-wrap` line may fit inside `.col-2` at 1280px. The `wrapped` reading passes either way. This is NOT-EVIDENCED until a capture shows it.
- **To the Orchestrator:**
  - R8's consequence: `.text-bg-info` and `.text-bg-warning` fall below 4.5:1 on Veneer's fills, while `.btn-info` and `.btn-warning` put white on the same fills. R8 reserves a foreground departure for a concrete ruling.
  - Family ruling 3 and R2's "keep every other value a literal" conflict with `styles.md:42`. Amend the ruling to exclude colours.
  - `report:331` still names `tmp/units/` after retention.
  - The remark "the third-width column the release's own example uses" (`ut-shared.patch:510-511`) cannot be checked against the installed package, which ships no docs.

VERDICT: FAIL 8, 9; outside the claims: F1, F2, F3
