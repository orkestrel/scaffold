Lane: objective, held by `reviewer` on Opus 5.5. I ran nothing. For the change I read the retained `tret-instruments/tret.diff` and the worktree files, not `git diff`. Every ruling below comes from source, the on-disk `dist/src/styles/index.css`, and the logs I name, so where a verdict does not quote a log it is a derivation.

1. **CONFIRMED.** Attack: search the built file for any retired name and for every reader built from a role or tier variable.
   - **Built file.** In `/home/user/veneer-tret/dist/src/styles/index.css`, the pattern `focus-reset|color-tertiary-(subtle|border|rgb)` matches nothing.
   - **Control.** The same file has 19 `var(--vn-color-tertiary-` reads. That is 3 emphasis declarations (`:root`, light, dark), 8 base reads in `.btn-tertiary`, and 8 base or emphasis reads in `.btn-outline-tertiary`. So the search does reach tertiary tokens.
   - **Registry.** `TOKEN_NAMES` in `src/core/constants.ts` (around lines 69–72 and 234–239) holds only `base` and `emphasis` for tertiary, and no `reset` leaf under `focus`.
   - **Guide.** `guides/veneer.md` names none of the four. Its only `tertiary-rgb` hits are `--bs-tertiary-rgb` (around line 6344, in a sentence saying no such alias exists) and `--vn-surface-tertiary-rgb`.
   - **Dynamic readers.** These all walk `$aliased`: `_color.scss:35-45`, `_link.scss:26`, `_background.scss:12,28`, `_border.scss:15,27`, `_focus-ring.scss:22`, and the alert, list-group, and table partials. The only walk over `$roles` is `components/_button.scss:139-191`, which reads only `-base` and `-emphasis`.
   - **Test templates.** `link.test.ts` covers aliased roles only. `tokens.test.ts:204` reads `CALIBRATED_TIERS`, whose tertiary subtle and border rows are gone. `theme.test.ts:136` walks the registry structurally. Nothing in `app/` reads a color or focus leaf.
   - **Outside scope.** The only other hit is `ROADMAP.md:509`, which is off-limits.

2. **CONFIRMED.** Attack: look for any painted or declared difference, and for a role losing a tier.
   - **Readings.** `tret-readings-compare.log.txt` reports `same=222`. Its 12 differences are all the retired tertiary `subtle`, `border`, and `rgb` token readings going from a value to `""`.
   - **Focus callers.** `tret-readings-before.json.txt` and `tret-readings-after.json.txt` have identical focus readings for the element button, `.btn`, and `.btn-link`, both normal and forced. In both, the forced-colors `box-shadow` declared on all three shipped rules is `var(--vn-button-shadow)`.
   - **Other roles.** The built file declares `-subtle`, `-emphasis`, and `-border` for primary, success, and light in all three scopes. It declares `-rgb` at `:root` for non-retuned roles and in every scope for primary.
   - **Contrast rule.** `$role-pairs` (`_tokens.scss:215-222`) still reads `$triplets['tertiary']` (`_tokens.scss:175`). The tertiary labels are unchanged: `rgb(255, 255, 255)` in both files. The committed rows in `BUTTON_FILLED_CASES`, the tertiary entry in `BUTTON_TIER_ROLES`, and `CALIBRATED_TIERS` still pin tertiary paints.

3. **CONFIRMED.** Attacks and results:
   - **Default reset.** `_mixins.scss:386` sets `$reset: none`.
   - **Tier order.** `role-each` (`_mixins.scss:415-438`) emits subtle, emphasis, border per role, and the built file keeps that order for aliased roles, for example primary rgb, subtle, emphasis, border.
   - **`:root` triplet loop.** `_tokens.scss:362-366` is gated on `$aliased`. No second list of roles was added.
   - **A caller that relied on the default reset.** There is none. All three `focus-ring` callers pass `$reset: var(--vn-button-shadow)`: `components/_button.scss:106-110` and `:208-212`, and `elements/_button.scss:57`. The `forced-ring`-only callers never read `$reset`.
   - **A role outside `$aliased` other than `tertiary`.** It would get emphasis only and no `:root` triplet. Adjacent point, not a defect: `theme-tokens` (`_mixins.scss:457-461`) emits `-rgb` for any role with a mode value, gated on `map.has-key`, not on `$aliased`. That path is unreachable, because `$light` and `$dark` carry fills only for primary and secondary.

4. **BROKEN.** The failing part is the every-caller forced-colors case. It is `tests/src/styles/mixins.test.ts:101-131`, titled "…and paints no shadow ring".
   - **The defect.** Its `shadow: 'none'` field (read at line 116, expected at line 128) cannot fail from any Veneer CSS change. Under forced colors with the default `forced-color-adjust: auto`, the browser forces an author's `box-shadow` to `none`.
   - **The subject states this itself.** The default-reset case's own comment (`mixins.test.ts:75-78`) says its specimen must opt out of forced colors for a shadow to paint, and it sets `forced-color-adjust: none` at line 92. The guide says "Forced colors paint no shadow" (`guides/veneer.md:7686`). The every-caller specimens carry no opt-out.
   - **Failing input (derived, not run).** In `components/_button.scss:109`, change `$reset: var(--vn-button-shadow)` to `$reset: 0 0 0 5px red`. The case would stay green.
   - **No red run.** The case passed at the base by design, and neither plant targets it.
   - **The outline fields do discriminate.** Deleting `outline: $width solid $highlight` from `forced-ring` (`_mixins.scss:376`) makes the style read `none`. Changing the width breaks the equality with the gauge.
   - **Smallest fix.** Either assert the declared forced-colors `box-shadow` text of the three shipped rules, as `probe/readings.test.ts:31-37` already does (`var(--vn-button-shadow)`), or give each caller specimen `forced-color-adjust: none` the way the default-reset case does. Otherwise drop the shadow field and the "paints no shadow ring" wording from the title.

   **The other cases hold:**
   - **Retired-name case** (`tokens.test.ts:68-84`). Mutation: re-emit any of the four names. The assertions distinguish it: `tret-red.log.txt` shows `AssertionError: expected [ '--vn-color-tertiary-rgb', …(3) ] to deeply equal []`, and both plant logs name an `AssertionError`. The `arrayContaining` check on base and emphasis is the reach control. Limit: the case checks declarations only, not readers. Claim 1's reader half rests on the built-file search in claim 1.
   - **Default-reset case** (`mixins.test.ts:79-100`). Mutation: the default reads `var(--vn-focus-reset)` again. It is distinguished twice in `tret-red.log.txt`: `expected [ 'var(--vn-focus-reset)' ] to deeply equal [ 'none' ]` and `expected 'rgb(255, 0, 0) 0px 0px 0px 5px' to be 'none'`. A default naming some other undeclared token would pass the rendered half but fail the declared-text half. A default of `$shadow` fails both.
   - **Tertiary fill and emphasis case** (`tokens.test.ts:85-95`). Mutation: gate emphasis on `$tiered`, or drop tertiary `-base` from `:root`. `collectScopeProperties` would then lose the name in `:root` and in each mode scope, so it is distinguished. This case never ran red; it guards a state the base already held.
   - **Plants.** Both logs end with `Tests 2 failed | 98 passed (100)` and name `AssertionError`s.
   - **Restore.** The restore check in `tret-plant.sh:27-29` cannot fail: it copies the backup over the target and then compares the two. The restore holds on other evidence. Each log's post-restore `git diff --stat` reads `41 (25+, 16-)`, which matches the final diffstat. The worktree `_mixins.scss` contains neither plant (`@if $tiered` at line 418; no `--vn-focus-reset` near line 498).

5. **CONFIRMED.** Attack: check each changed guide sentence against the source, the built file, and the reference-map reader.
   - **Tertiary sentence.** "drives the `.btn-tertiary` and `.btn-outline-tertiary` classes alone" (around line 7442) matches the 19 reads counted in claim 1.
   - **Triplet sentences.** "for every role apart from `tertiary`" (around line 7409) and "the tertiary triplet lives in that partial alone" (around line 7418) match `_tokens.scss:170-210` and `:362-366`.
   - **Mode-scope list** (around lines 4064-4067) matches `theme-tokens`.
   - **Focus row** (around line 7618) matches.
   - **Reference-map reader.** `collectReferenceRows` (`tests/setupStyles.ts:751` and following) expands a `Tier` table only over `Role` tables that come before it. The tertiary `Role` table follows the `Tier` table, and the tertiary `Token` row resolves in both modes. The reference-map case passes in `tret-green.log.txt` (`100 passed`) and in `tret-src-styles.log.txt`.
   - **Stale sentences.** None found. Near line 7679 the mixin is described as taking "a color, a width, and an optional shadow expression". That was already incomplete before this change and is not made false by it.
   - **Voice.** A search for the banned terms found none. Fit is the subjective lane's call.

6. **CONFIRMED.** `tret-constants.diff.txt` removes exactly `rgb`, `subtle`, and `border` under tertiary, and `reset` under focus. The worktree `constants.ts` matches it. `src/core/types.ts:1,13,16` derives `TokenMap` from `typeof TOKEN_NAMES` and names no leaf. A search of `tests/src/core/` finds no removed leaf; its only `reset` is `vi.resetModules`. The `tests/src/browser/` hits for `focus.` are recorder variables, not registry leaves.

7. **CONFIRMED.** `tret-status.txt` lists exactly 8 ` M` paths: the 6 owned files, the shared `constants.ts`, and the accepted fixture. `tret-gate.sh:10-12` captures the command's own status with no pipe. Each gate log ends in `exit=0`: check, lint-check, oxfmt (over all 8 files: "All matched files use the correct format."), build-src, setup (`357 passed`), conformance (`45 passed`), guides (`26 passed`), and policy (`109 passed | 1 skipped`). Limit: the status file is the working tree before the commit. I could not read `a5a85d8` directly; the worktree files I read match `tret.diff`.

**Findings outside the claims:** none.

**Attacked and held:**
- **Reader in the built file.** A shipped rule reading a retired name could slip past the retired-name case, which checks declarations only. The built file has zero such readers, so claim 1 holds on the artifact.
- **Retired name versus a class name.** `tests/src/styles/utilities/background.test.ts:68` and `border.test.ts:130` still name `.bg-tertiary-subtle` and `.border-tertiary-subtle`. These are class names asserted absent, not the retired tokens, and they are correct.
- **Dropped triplet pair.** `collectTripletGroups` silently drops tertiary because it has no `rgb` leaf. That is correct: no triplet is declared, and `setupStyles.test.ts:1096-1098` pins the single-member behaviour.
- **Forced-colors readings.** The forced readings match before and after. Under forced colors that match is set by the browser, so it proves nothing about the CSS; the declared-text readings in the probe are what carry claim 2's forced-colors half.

VERDICT: FAIL 4; outside the claims: none
