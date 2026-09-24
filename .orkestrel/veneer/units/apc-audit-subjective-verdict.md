# AP-COLOR audit round 1 — subjective verdict (`reviewer` on Opus 5.5)

1. **Scope and gates.** CONFIRMED. `apc-status.txt:1-14` lists only the brief's owned files and its shared files (`ap-color-brief.md:81-90`). Each final log ends on exit 0 with the stated count:
   - `test:src:styles`: 1447 (`apc-final-test-src-styles.log.txt:8210,8214`)
   - `test:setup`: 320 (`apc-final-test-setup.log.txt:33,37`)
   - `test:conformance`: 26 (`apc-final-test-conformance.log.txt:12,16`)
   - `test:guides`: 20 (`apc-final-test-guides.log.txt:12,16`)
   - `format:check`, `lint:check`, and `check` each exit 0 (`apc-final-format-check.log.txt:10`, `apc-final-lint-check.log.txt:6`, `apc-final-check.log.txt:30`).

2. **Population.** UNRESOLVED. Every member I sampled in the worktree's compiled cascade holds:
   - `.text-primary{--bs-text-opacity:1;color:rgb(from var(--bs-primary-text-emphasis) r g b/var(--bs-text-opacity))!important}`
   - `.link-primary` reads `rgb(from var(--vn-color-primary-emphasis) …)`
   - `--vn-link-base:var(--vn-color-primary-emphasis)` in every theme block
   - `--vn-form-valid` and `--vn-form-invalid` read the emphasis tiers
   - the dark `link-rgb` is `103, 191, 238` and the dark `link-hover-rgb` is `156, 214, 244`
   - the `.link-light` rest rule is identical in both cascades.

   The clause "No other emitted declaration differs from the base cascade" needs a declaration-level diff of `/home/user/veneer/dist/src/styles/index.css` against `/home/user/veneer-apc/dist/src/styles/index.css`. A read-only lane cannot produce that diff from a minified 283 kB file. The diff settles the claim.

3. **One exclusion home.** CONFIRMED. `$neutrals` is declared once (`apc.diff:9-10`). Each changed walker reads it, and none names `light` or `dark`:
   - `_color.scss` (`apc.diff:107`)
   - `_link.scss` (`apc.diff:138`)
   - `_button.scss` (`apc.diff:62`)

   The report records that the `$neutrals: ()` mutation reddens the neutral proof (`ap-color-report.md:90`).

4. **Contrast proofs.** BROKEN.
   - **The proof structure holds.** Every contrast proof paints the scope `background-color: var(--bs-body-bg)`, runs in each mode, and uses `CONTRAST_BAR`:
     - `.text-<role>`: `apc.diff:517-532`
     - link rest: `apc.diff:707-730`
     - link hover, held at or above `max(rest, 4.5)`: `apc.diff:732-759`
     - outline rest over `BUTTON_TIER_ROLES`, with `tertiary`: `apc.diff:203-231`
     - feedback and checked label: `apc.diff:279-311`
   - **The mutation sentence is false for the proofs it names.** Both mutation logs ran only `color.test.ts -t "reads each role color outside the neutral roles at or above the contrast bar"` (`apc-mutation-tier-80-dark.log.txt:1,89`; `apc-mutation-danger-channel.log.txt:1,32`).
   - **The danger-on-the-channel mutation cannot redden the other proofs.** It edits only `_color.scss` (`apc-mutation-danger-channel.log.txt:24`). That file emits only `.text-*` rules. The link, outline, and validation proofs read no `.text-danger`, so this mutation leaves those proofs green.
   - **No run shows the link, outline, or validation contrast proofs red.** The tier-at-80 mutation would plausibly redden dark info and danger (4.29 and 3.97). That is a derivation, not a logged run.
   - **The validation contrast proof has no failing state on record.** Its title does not match the valid-fill mutation's `-t` filter (`apc-mutation-valid-fill.log.txt:1`).
   - **Smallest fix:** Re-run the tier-at-80 mutation with `-t` on the link rest proof, the outline rest proof, and the feedback and label proof, and retain each red log. Otherwise, restate the claim so its mutation sentence covers only the `.text-<role>` proof.

5. **Identity and opacity.** CONFIRMED.
   - **Identity proof** (`apc.diff:534-554`): this proof compares `.text-<key>` with `.text-<key>-emphasis` using `matchesColor`. Mutation: `.text-<role>` back on `rgba(var(--bs-<role>-rgb), …)`. The assertions distinguish it, because the tier is the fill mixed at 70% with body text, and `apc.diff:344-349` asserts the tier differs from the fill. A bare `var(--bs-<role>-text-emphasis)` passes identity. The opacity proof catches that mutation instead.
   - **Opacity proof** (`apc.diff:573-617`): this proof checks alpha and the tier channels for every tier role in each mode. The bare `color-mix()` mutation reddens alpha and channels for every role and step in both modes (`apc-mutation-bare-mix.log.txt:131-204`).

6. **Override contract.** CONFIRMED (`apc.diff:620-672`). Mutation: `.text-primary` restored to the channel. Each assertion distinguishes it:
   - The `-rgb` retune asserts `toBe(resting[0])`. A channel reader moves to `rgb(20, 80, 140)`, so this assertion fails.
   - The base retune asserts `not.toBe(resting[0])` plus a match to the oklab twin at `TEXT_TIER_SHARE`. The channel triplet is a literal and doesn't move, so this assertion fails.
   - The body retune uses the same pair of assertions, and a channel reader is unmoved.

   The consumer control is `.text-bg-primary` moving to `rgb(20, 80, 140)` (`apc.diff:647`).

7. **Link hover.** CONFIRMED.
   - **Proof** (`apc.diff:739-772`): the expected color is computed as `rest*(1-LINK_SHIFT) + endpoint*LINK_SHIFT` from the parsed rest color and `--vn-text-emphasis-base`. The proof also asserts contrast at or above `max(contrast, CONTRAST_BAR)`, and asserts that focus paints the hover color.
   - **Mutation:** hover mixed from `--vn-color-<role>-base` or the channel instead of the tier. The rest-anchored weighting distinguishes it.
   - **`.link-light` and `.link-dark`:** the `.link-light` rest rule is identical in both compiled cascades (grep of both `index.css` files). The source neutral branch keeps the removed expressions verbatim (`apc.diff:146-164`). I did not compare the compiled hover rule; see the referrals.

8. **Triplets.** CONFIRMED. The case `tokens.test.ts:171` "resolves each channel triplet to the color its own token paints" failed after the source change (`apc-after-source-styles.log.txt:8257`). It passes in the final run (`apc-final-test-src-styles.log.txt:8210`).

9. **Validation.** CONFIRMED (`apc.diff:313-352`). The proof asserts that the border, checked fill, and feedback equal `--vn-color-<role>-emphasis` in each mode. It adds a control asserting the tier differs from `--vn-color-<role>-base`.
   - **Mutation:** light `'valid'` back on `var(--vn-color-success-base)`. The light border, checked fill, and feedback all go red. The `invalid` case stays green, as expected (`apc-mutation-valid-fill.log.txt:154-158`).

10. **Baseline data.** CONFIRMED. The patch has no `TEXT_COLOR_CASES` hunk. `TEXT_TIER_CASES` sits beside it (`apc-shared.patch:644-651`). The inventory case asserts four things (`apc-shared.patch:580-602`):
    - the split of `LINK_ROLES`
    - that every tier key is a `TEXT_COLOR_CASES` key
    - that `BUTTON_TIER_ROLES` is the tier roles plus `tertiary`
    - that each table is frozen.

    See the referrals on its tautological assertions.

11. **Guide.** BROKEN.
    - **The identity sentence is false for the neutral roles.** `apc-shared.patch:41-43` (guide § Color utilities, near line 6275) reads: "So at the default opacity a role class and its emphasis class paint one color". It is unscoped, and it follows a sentence about the `light` and `dark` channel colors. `.text-light` keeps its channels (`apc.diff:106-109`), while `.text-light-emphasis` paints the gray tier.
      - Capture evidence: `text-roles--light-1280.png` shows `text-light` near-white, and `text-emphasis--light-1280.png` shows `text-light-emphasis` dark gray. `.text-dark` and `.text-dark-emphasis` differ in dark mode too (`text-roles--dark-1280.png` and `text-emphasis--dark-1280.png`).
      - The test is correctly scoped to "each role color outside the neutral roles" (`apc.diff:535`). The prose is not.
      - Fix: "a role class outside the neutral roles and its emphasis class paint one color".
    - **The departure sentence's emphasis-token clause is unscoped and has no proof.** `apc-shared.patch:85-87` reads: "retune the `--vn-color-primary-base` fill at the scope that declares the theme, or the `--vn-color-primary-emphasis` token, to move the text".
      - `--bs-primary-text-emphasis: var(--vn-color-primary-emphasis)` is declared inside the theme mixin (`/home/user/veneer-apc/src/styles/_mixins.scss:455-456`). A `--vn-color-primary-emphasis` override below the theme scope therefore moves `.link-primary` and `.btn-outline-primary`, which read the token directly, but leaves `.text-primary` unchanged.
      - No executed assertion covers the emphasis-token path for `.text-*`. `.claude/rules/documentation.md` § Parity requires one. The retune proof covers only base, body, and `-rgb` (`apc.diff:645-671`).
      - The sentence also omits the `--bs-primary-text-emphasis` alias, which moves the text at any scope and which the P7-3 ruling names (`appearance-design-verdict.md:20`).
      - Fix: "retune the `--vn-color-primary-base` fill or the `--vn-color-primary-emphasis` token at the scope that declares the theme, or the `--bs-primary-text-emphasis` alias, to move the text". Add a retune-proof assertion for each path.
    - **The new prose states a count.** "the two neutral links move 20%" (`apc-shared.patch:93`) counts `$neutrals`, a list anyone can extend. `AGENTS.md` § Writing forbids it. Fix: "the neutral links move 20%".
    - **What holds:** the ledger rows equal the conformance gate's reading (the gate passes, `apc-final-test-conformance.log.txt:12`). The validation, outline-button, and link-token prose is true against the proofs. I found no banned term in the new lines.

12. **Law.** CONFIRMED. The diff (`apc.diff`) and the patch (`apc-shared.patch:530-685`) contain none of the following:
    - `any`, `as`, `!`, or a suppression comment
    - a nested function declaration (only direct callbacks)
    - a module-scope helper in a test file
    - a color or contrast helper; the proofs use `readContrast`, `matchesColor`, `parseCSSColor`, and `readToken` from `@orkestrel/test/browser`.

    Each new test title names the property it asserts.

13. **Failing first.** CONFIRMED.
    - The after-source run shows `Test Files 7 failed`, `Tests 47 failed | 1385 passed (1432)` (`apc-after-source-styles.log.txt:8531-8532`).
    - The reds sit in `theme`, `tokens`, `button`, `color-bg`, `color`, `link`, and `a`. They include both dark `a.test.ts` cases (`:8329,8348`).
    - The baseline is 1432 (`apc-baseline-styles.log.txt:8200`) and the final is 1447. The added style tests account for the difference: neutral, contrast, and identity cases in each mode; one extra opacity case; outline contrast in each mode; validation cases for each state; and the `a` identity case in each mode.

    **Counts the report states** (`ap-color-report.md`):
    - **Run measurements:** 1432 passed and 115 files; 47 failed and 1385 passed; 1447 passed and 115 files; reds in 7 files; the outline case at 14 rows; link at 23 rows; 320, 26, and 20 passed; 14 files, 718 insertions, and 233 deletions; load average 14 to 16 on 4 cores; info 4.29, danger 3.97, and danger 2.76.
    - **Counts with no run behind them:** "48 stale ledger rows", "Six `aliased` rows", "the 7 roles", "the four names", "three things", "two module-scope derived tables", and "15 net new tests" (arithmetic, not a run output).

**Rendered surface.** BROKEN. Frames read:
- `text-roles`, `text-emphasis`, `text-opacity`, `role-links`, `link-opacity`, `icon-links`, `validated-form`, `valid-feedback`, `invalid-feedback`, `valid-check`, `invalid-check`, and `form-check-checked`, in `light-390`, `dark-390`, `light-1280`, and `dark-1280` where present
- the `outline-*-hover` frames `outline-primary-hover--light-1280` and `outline-danger-hover--dark-1280`
- `disabled-buttons--light-1280`, `disabled-buttons--dark-1280`, and `showcase--light-1280`
- `input-group-buttons--light-1280`, `input-group-buttons--dark-1280`, `split-button--dark-1280`, `check-group-checked--light-1280`, `check-group-checked--dark-1280`, and `vertical-group--dark-1280`.

What the frames show:
- **Blend.** "No frame where a role's text blends into the canvas" is false. `role-links--light-390.png` and `role-links--light-1280.png` show "Light link" nearly invisible on white. `role-links--dark-390.png` and `role-links--dark-1280.png` show "Dark link" nearly invisible on the dark canvas. The ruling excludes these roles (P7-1), and the `.link-light` rule is unchanged from the base cascade, so this is not a regression. The paragraph still states it without scope.
  - Fix: scope the paragraph to roles outside `$neutrals`. Optionally, give the neutral link specimens a contrasting strip, as `text-roles` already does.
- **Outline rest.** "The outline border on the fill and its label on the tier" is NOT-EVIDENCED for `tertiary`, `success`, `info`, `warning`, and `danger`. The `outline-*-hover` frames show the filled hover state only. Resting outline text appears only for `secondary` (`input-group-buttons` and `split-button`) and `primary` (unchecked labels in `check-group-checked` and `vertical-group`). A resting-state frame for each outline role is missing.
- **What holds:** every tier role's text, link, and validation mark reads clearly in each variant. `text-primary` and `text-primary-emphasis` paint one color in each mode. The `text-opacity-25` and `link-opacity 10%` steps are faint by design, and the claim does not cover them.

**Findings outside the claims:** none.

**Attacked and held:**
- Changing the retune proof's `-rgb` expectation direction is the P7-3 departure, not a regression.
- The button walker defaults to the tier while the color walker defaults to the channel. The defaults differ, but each consults `$neutrals` once, so the design is consistent.
- `{role}` placeholders in the guide follow its existing convention (guide lines 4900 and 6735).
- "in both modes" in test titles follows existing suite usage.

**Referrals to the objective lane:**
- **Tautological assertions** in `setupStyles.test.ts` (`apc-shared.patch:582-597`):
  - `TEXT_TIER_CASES` values are compared with the template that built them.
  - `TEXT_TIER_SHARE` is compared with its own literal.
  - `indexOf('tertiary') === 2` couples the test to order.
  - For the tier keys, the release-record case in `color.test.ts` compares each class with an inline copy of its own source expression (`apc.diff:483`).
- **`matchesColor` tolerance:** does it separate the sRGB hover weighting from an oklab-space `color-mix` mutation?
- **Compiled hover rules:** are the `.link-light` and `.link-dark` hover rules byte-identical to the base cascade's?
- **Light validation contrast:** does the light success or danger fill already clear 4.5 against the body? If it does, the validation contrast proof cannot tell the pre-unit state from the change.

VERDICT: FAIL 2, 4, 11, rendered-surface; outside the claims: none
