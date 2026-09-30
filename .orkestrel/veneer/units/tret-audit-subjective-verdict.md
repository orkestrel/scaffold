# TOKEN-RETIRE audit: subjective lane verdict (`reviewer`, Opus 5.5)

I held the subjective lane: design fit, naming, whether each proof is named for what it proves, and guide voice. I ruled the objective-leaning claims (1, 2, 6, 7) only from the retained artifacts and the worktree source. I ran nothing.

## Numbered verdicts

**1. The retirement: CONFIRMED.**
- None of the four names appears in `/home/user/veneer-tret/dist/src/styles/index.css`.
- Across `src/`, `tests/`, `guides/`, and `app/`, the literals appear only in the two proofs: `tests/src/styles/tokens.test.ts:77-80` and `tests/src/styles/mixins.test.ts:92`. `ROADMAP.md:509` also names them, but that file is outside the claim's paths.
- I searched for readers that build a name from a role variable (`$role}-(subtle|border|rgb)` and `@each $role in (tokens.)?$roles`, over `src/`). Every such reader walks `$aliased`. The exceptions are the `role-each` mixin (`_mixins.scss:415-437`, now guarded), the `:root` loop (`_tokens.scss:362-366`, now guarded), and the `theme-tokens` `-rgb` line (`_mixins.scss:457-461`). That line is gated on `map.has-key($values, $role)`, and `$values` has no tertiary key.
- The guide's `Tier` table (`guides/veneer.md:7396-7400`) expands only over the aliased `Role` table before it. The reference-map proof went red when that table still named tertiary and green after the guide edit, per the report and `tret-green.log.txt:291`.

**2. Nothing painted moves: CONFIRMED.**
- `tret-readings-compare.log.txt` reports `same=222`. Its only DIFF rows are the retired token readings going to `""`. Those rows are the instrument's own positive control: they show the comparison detects a change.
- `probe/readings.test.ts` reads the following, before and after:
  - the declared forced-colors `box-shadow` text on every shipped caller;
  - the paint of the element button, `.btn`, and `.btn-link`, with and without forced colors;
  - `.btn-tertiary` and `.btn-outline-tertiary` in both modes, at rest, focus, hover, active, and disabled.
- The contrast rule still reads `$triplets` through `$role-pairs` (`_tokens.scss:216-219`), and the tertiary label reading did not change.
- The other roles' tiers keep the `list.index($aliased, $role) != null` path (`_mixins.scss:417`). The registry proof and the full styles run cover them.

**3. The mechanism: CONFIRMED.**
- The `$reset` default is `none` (`_mixins.scss:386`).
- `role-each` emits `-subtle`, `-emphasis`, and `-border` in the same order as before. It guards `-subtle` and `-border` with two `@if` blocks around an unguarded emphasis block (`_mixins.scss:418-436`).
- The `:root` loop filters on `$aliased` (`_tokens.scss:363`).
- The change adds no second list: both filters key on the one `$aliased` list at `_tokens.scss:11`.
- A shared module-level list is not available to `role-each`, because `_tokens.scss:1` does `@use 'mixins'`. Passing the list through `theme-tokens`, which already receives `$aliased`, is the smallest route.
- The `$aliased: $roles` default reads plainly: a caller that names no subset gets every tier. Its only user is the fixture.
- The naming inside the mechanism is carried by F1, not by this claim.

**4. The proofs: CONFIRMED.** For each case, the mutation that makes it fail and whether its assertions distinguish that mutation:
- **Retired-name case** (`tokens.test.ts:68`):
  - Mutations: re-declare `--vn-focus-reset` in the closure, or change `@if $tiered` to `@if true`. Both plants fail with an `AssertionError` and restore identically (`tret-plant-focus-reset.log.txt:295,323` and `tret-plant-tertiary-subtle.log.txt:296,324`).
  - A third mutation, dropping the `:root` filter, is killed at the base (`tret-red.log.txt:334`, which shows the `-rgb` member present).
  - The assertions distinguish these mutations. The `arrayContaining` check for base and emphasis is the reach control: it fails if the walk collects nothing.
- **Default-reset case** (`mixins.test.ts:79`):
  - Mutation: set the `$reset` default back to `var(--vn-focus-reset)`. It is killed on both halves (`tret-red.log.txt:297,318`).
  - A default naming any other `var()` fails the soft declared-text check (`toEqual(['none'])`). Deleting the reset line leaves `resets` empty and also fails.
  - The rendered half distinguishes a token-reading default only because the specimen opts out of forced colors. The comment at `mixins.test.ts:75-78` states this.
  - The `outline-style` read of `solid` shows that forced colors were actually applied.
  - The title matches what the case proves.
- **Tertiary fill and emphasis case** (`tokens.test.ts`, the case after line 68):
  - Mutation: move the emphasis block inside `@if $tiered`. The emphasis tier then disappears from `:root` and from both mode scopes, and the assertions distinguish it.
  - The case passed at the base by design, because it is a guard.
- **Every-caller forced-colors case** (`mixins.test.ts:101`):
  - Mutations: remove `@include forced-ring` from `focus-ring`, or pass a different `$width`. These change the `style` or `width` fields, and the assertions distinguish them.
  - The `shadow: 'none'` field (`:128`) does not distinguish a caller whose `$reset` paints a shadow. The package states that forced colors paint no shadow (`guides/veneer.md:7686`, and `:4236`). The sibling case needs `forced-color-adjust: none` to see a shadow at all (`mixins.test.ts:77,92`).
  - Only the "paints no shadow ring" half of the title is carried by an assertion the stylesheet cannot move. See referral R1. This does not falsify the claim as written, because the case does read the rendered result the report states.

**5. The guide: BROKEN.**
- **Failing input:** `guides/veneer.md:7442` reads "The `tertiary` role drives the `.btn-tertiary` and `.btn-outline-tertiary` classes alone, and they read its fill and its emphasis tier." A sentence-final "alone" after an object most naturally reads as "the tertiary role by itself drives those classes", which is trivially true and not the point. The intended meaning is "only those classes read the tertiary role". So the sentence that carries the consumer's "why" does not read once, as claim 5 requires.
- **Same pattern elsewhere in the change's prose:**
  - `:7379`, "carries a fill and an emphasis tier alone".
  - `:7418`, "The tertiary triplet lives in that partial alone". This also uses a figurative "lives".
  - `:7409-7410` chains two `for` phrases, "for every role apart from `tertiary`, for a consumer writing …". On a first read, the second phrase can attach to `tertiary`.
- **What holds:**
  - Every statement reads true against `_tokens.scss` and `_mixins.scss`.
  - The reference-map proof resolves the tertiary `Role` row and `Token` row (`tret-green.log.txt`).
  - No other guide sentence the change makes false remains. I checked `:4061-4067`, `:4102`, `:7289-7295`, `:7393-7394`, `:7402-7403`, `:7733`, and `:10934`.
- **Smallest correct fix:**
  - `:7442`: "Only the `.btn-tertiary` and `.btn-outline-tertiary` classes read the `tertiary` role, and they read its fill and its emphasis tier."
  - `:7379`: "… and carries only a fill and an emphasis tier; …".
  - `:7418`: "Only that partial holds the tertiary triplet: …".
  - `:7409-7410`: "Every role apart from `tertiary` carries `--vn-color-{role}-rgb`, the fill's sRGB rendering as channels, for a consumer writing `rgba(var(--vn-color-primary-rgb), 0.5)`."
  - Re-run `npm run test:guides` and the reference-map proof after the edit.

**6. The engine hunk: CONFIRMED.**
- `tret-constants.diff.txt` removes exactly `color.tertiary.rgb`, `.subtle`, and `.border`, and `focus.reset`, and nothing else.
- A search for `tertiary\.(rgb|subtle|border)|focus\.reset|tertiary\[|\['reset'\]` over `src/`, `tests/`, and `app/` finds nothing.
- `TokenMap` derives from `TOKEN_NAMES`. The TSDoc at `src/core/constants.ts:7` names only `primary.subtle`.

**7. Scope and gates: CONFIRMED.**
- `tret-status.txt` lists the owned files, `src/core/constants.ts`, and the accepted `tests/src/styles/fixtures/mixins.scss`, and nothing else.
- Each gate log echoes its command and ends `exit=0`: `tret-check.log.txt:30`, `tret-lint-check.log.txt:6`, `tret-oxfmt.log.txt:6`, `tret-build-src.log.txt:58`, `tret-setup.log.txt:37`, `tret-conformance.log.txt:16`, `tret-guides.log.txt:16`, and `tret-policy.log.txt:16`.
- The writer produced these logs. The authoritative gate run remains the independent `verifier`'s.

## Findings outside the claims

**F1. The change uses "tier" for two concepts the package keeps apart.**
- **The evidence:** The guide fixes the vocabulary as "a fill, its channel triplet, and the subtle, emphasis, and border tiers" (`guides/veneer.md:7376`). The change departs from it at two sites:
  - `_mixins.scss:417`: `$tiered` is false for `tertiary`, yet `:425-429` emits a tier for that role. The guide at `:7379` says tertiary "carries … an emphasis tier". So the boolean asserts something the same mixin contradicts. This breaks `names.md` § General vocabulary ("Booleans read as assertions") and `AGENTS.md` "One concept, one term".
  - `tests/src/styles/tokens.test.ts:68` (the title) and `:63` (the comment) call the `-rgb` token a "channel tier". The same file calls it a "channel triplet" at `:210`, and so does the guide at `:7443`.
- **Why it matters:** A reader of `role-each` has to reconcile "not tiered" with the emphasis tier emitted two lines later. A reader of the proof title meets a third name for the triplet.
- **What right looks like:**
  - At `_mixins.scss:417`, drop the local and write both guards as `@if list.index($aliased, $role)`. That is the spelling the `:root` loop uses at `_tokens.scss:363`, so both filters read as one test. Alternatively, rename the local to a boolean that asserts the alias fact, not a tier fact.
  - Retitle `tokens.test.ts:68` to "declares no focus reset token and no subtle tier, border tier, or channel triplet for the tertiary role in any scope", and word `:63` the same way.

## Referrals

**R1, to the objective lane.** Settle whether the `shadow: 'none'` field of `mixins.test.ts:101` can fail from any stylesheet edit.
- Suggested probe: temporarily set `--vn-button-shadow: 0 0 0 5px rgb(255, 0, 0)` on the mounted host and run the case under staged forced colors.
- If the case stays green, the shadow field is inert in Chromium. The title's clause "and paints no shadow ring" then needs one of two changes:
  - drop the clause;
  - read the declared forced-colors `box-shadow` text per caller, as `probe/readings.test.ts:32-37` does, or give one specimen a `forced-color-adjust: none` control, as the sibling case does.

## Attacked and held

- **Emission order:** Two `@if` blocks around an unguarded emphasis block keep the per-role order subtle, emphasis, border. A single guard around a merged subtle-and-border block would have reordered the output.
- **Single source:** `role-each` cannot `@use 'tokens'` (the cycle through `_tokens.scss:1`). So threading `$aliased` through `theme-tokens` is the single source, not a second list. The `$aliased: $roles` default changes nothing for a caller that names no subset, which is the fixture at `tests/src/styles/fixtures/mixins.scss`.
- **Tertiary still has readers:** `.btn-outline-tertiary` reads the emphasis tier (`components/_button.scss:141`), and `.btn-tertiary` reads the fill. So retiring those two would be wrong, and the change keeps them.
- **`$triplets` still holds the tertiary entry:** It looks like a leftover and is correct, because `$role-pairs` (`_tokens.scss:216-219`) reads it at compile time for the tertiary label. The comment at `_tokens.scss:170-173` states this.
- **`background.test.ts` and `border.test.ts`** still assert `.bg-tertiary-subtle` and `.border-tertiary-subtle` absent. Those are class names, and the tests are correct unedited.

VERDICT: FAIL 5; outside the claims: F1
