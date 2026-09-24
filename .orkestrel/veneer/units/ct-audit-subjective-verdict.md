<!-- Subjective lane: reviewer on Opus 5.5, workflow wf_27b03c0b-0fc (agent af234ce041d87874b), brief ct-audit-reviewer-brief.md. -->

1. **CONFIRMED (subjective lane): scope.**
   - `ct-status.txt:1-7` lists only owned paths.
   - `ct-shared.patch` touches only the brief's shared files (`b-cross-ct-brief.md:95-101`): `Showcase.ts`, `constants.ts`, `index.ts`, `guides/veneer.md`, the three app tests, `conformance.test.ts`, `setup.ts`, `setupStyles.ts`, and `setupStyles.test.ts`.
   - `ct-unscoped.patch` touches only `alert.test.ts`, `button.test.ts`, and `a.test.ts`.
   - Each unscoped edit is stated. The alert comment is at `ct-unscoped.patch:21-23` and the anchor comment at `:65-66`. The button literal is stated in the report at `b-cross-ct-report.md:52-53`.
   - No off-limits path is touched.
   - The Orchestrator's ruling on the unscoped files holds. `tests/src/styles/components/*.test.ts` is in no owned, shared, or off-limits list (`b-cross-ct-brief.md:90-106`).

2. **CONFIRMED: V10.**
   - The dark `secondary` entry is `var(--vn-gray-600)` (`_tokens.scss:81`). The light entry keeps the slate (`_tokens.scss:26`), and the test pins it (`ct.diff:417`).
   - Every mode scope declares the aliases (`_theme.scss:34-35`). `THEME_DARK_ADDITIONS` (`ct-shared.patch:1263-1269`) and the Additions rows (`ct-shared.patch:884-885`) record them.
   - Mutation M1, which reverts the dark slate, reddens the secondary case and the matrix case (`ct-mutations.log.txt:17-22`). The fill assertion and the `readContrast` assertion both separate M1 from the passing tree.

3. **CONFIRMED: V12.**
   - The link hover mixes 65% toward black in light and 65% toward white in dark (`ct.diff:65,105`).
   - The case asserts direction through a luminance comparison and asserts contrast of at least the release's step (`ct.diff:512-515`).
   - Mutation M3 (dark hover toward black) breaks the direction assertion (`ct-mutations.log.txt:39-42`). Mutation M4 (light hover at 80%) breaks the step assertion, 1.2397 against 1.4305 (`ct-mutations.log.txt:59-62`).
   - The light margin is thin: 1.4408 against 1.4305 (report line 103). The report states the thin margin honestly.

4. **CONFIRMED: V13, the literals and their comments.**
   - Every gray tier matches Bootstrap's `_variables.scss` and `_variables-dark.scss` (`_tokens.scss:28-34,83-89`).
   - The only literals are `#fcfcfd` (`_tokens.scss:30`) and `#1a1d20` (`_tokens.scss:88`).
   - Each literal's comment names the release's derivation correctly: `mix($gray-100, $white)` and `mix($gray-800, $black)`.
   - `styles.md:42-43` allows a literal in `_tokens.scss`. Keeping the literal pins the release's rounded value, which a `color-mix()` would not reproduce.
   - `THEME_GRAY_TIERS` is bound by derivation from the installed stylesheet (`ct-shared.patch:1165-1198`).
   - Mutation M8, which drops the dark role from `$retuned`, reddens the tier case and the dark-mode alert case (`ct-mutations.log.txt:150-155`). The light-mode alert case passes under M8 because the mix gives more contrast (12.445) than the release, so the tier case is the proof that separates M8.
   - `ct-v13-after.log.txt:40-43` shows the release's pair for all four alert paints (`495057/fcfcfd`, `495057/ced4da`, `f8f9fa/343a40`, `dee2e6/1a1d20`).
   - The comments around these literals are finding F1.

5. **CONFIRMED: the `theme` key.**
   - The key has a selector row and no variable row (`ct-shared.patch:920`).
   - The `#### theme` lead states the X2 inheritance sentence (`ct-shared.patch:240-246`).
   - The dark-rule plant compares the shipped result against the withheld result (`ct-shared.patch:1045-1075`). A ledger that ignored the theme key's dark rules would leave the first element empty and fail.
   - Mutation M7 gives five failures (`ct-mutations.log.txt:126-132`).

6. **CONFIRMED: X3 and X12.**
   - Mutation M6 removes both registry checks. The plant then yields two names, and the case reddens (`ct-mutations.log.txt:108-110`).
   - The X12 instrument records every emitted fallback reading (`ct-x12-instrument.diff.txt:7-11`). The shipped walk has an empty `reached` list (`ct-x12.json.txt:12`).
   - The control reaches the instrument and receives the existing refusal (`ct-x12c.json.txt:2-12`).
   - One gap is carried to the objective lane as referral R1.

7. **CONFIRMED: X11.**
   - The markup nests light, dark, and light surfaces. Each surface carries the named controls and no id or inline style (`ct-shared.patch:45-51`).
   - The proof counts each surface's own controls through a `closest('[data-bs-theme]') === surface` filter. It asserts parentage, and it reads `color-scheme`, text, fill, and caret per surface in Chromium (`ct.diff:632-700`).
   - Mutations S1 and S2 (a surface attribute dropped) and S3 (the nested toggler dropped) redden the section cases. S4 (the barrel row dropped) reddens the index proof and the section file (`ct-mutations.log.txt:171-233`). A surface moved out of its parent fails the parentage assertion.
   - The capture row names `.bg-body[data-bs-theme='dark']` and reads `color-scheme` (`ct-shared.patch:1107-1112`). The `CascadeKey` contract shoots each row over the whole lifted specimen (`tests/setup.ts:468-471,519-527`).
   - The guide's `### Color modes` section meets X11 (`ct-shared.patch:65-101`). It states the `:root` light closure, that any element opens an island, and how nesting works. It points at § Reference map and restates no value.
   - The rendered frame is outside this claim and has no capture in this round. The capture round rules it.

8. **CONFIRMED: law and report.**
   - Across all three diffs I found no `any`, no `!` non-null assertion, and no suppression. The only `as` is `as const`, and every function is a callback passed as an argument.
   - The repeated walk is reported, and its move into `theme-tokens` in `_mixins.scss` is named (`b-cross-ct-report.md:62-69`).
   - The gate result lines match `ct-gates.log.txt:1-14` and the individual logs (`ct-gate-8:149`, `-9:32`, `-10:11`, `-11:11`, `-12:9`, `-13:11`, `-14:7943`).
   - The Orchestrator's V11 ruling holds. `--vn-state-mixer` drives the bare `.btn` veil (`components/_button.scss:30,37`), the bare `button` veil (`elements/_button.scss:46,54`), and the variant tiers (`components/_button.scss:147,154,172`). No token-only change can split them.
   - **Counts and temporal words the report states:**
     - Line counts from the `--stat` runs, which are tallies of a growable set: "55 changed lines", "24", "182", "31", "28", "288 insertions and 32 deletions", "20 lines", "153", "827 insertions and 217 deletions", "792 changed lines", "96", "62", "43", "27", "13", and "the app files 1 to 3 each" (report lines 309-318).
     - Counts quoted from logs: "8 files", "463 files", "one fallback reading" (lines 161, 225, 227), plus the test summaries.
     - Temporal words: "the old 80% black mix" (line 53) is a dating word the brief forbids. Sequence words: "first" (lines 56, 169, 191, 340), "final" (lines 169, 196, 255), "second fresh" and "fresh" (lines 246, 338), "already" (lines 41, 163, 207), "still" (line 60), and "before/after" (lines 86, 102, 121, 155, 203-210).

**Findings outside the claims**

- **F1: prose in the owned `src/styles/_tokens.scss` file is false after V13.**
  - Wrong: two comments no longer hold for the `light` and `dark` roles, and the map header misclassifies the new literal.
    - `_tokens.scss:68-69` says every role other than primary and secondary "reaches its dark tiers through the mix percentages and the border anchor". The `light` and `dark` roles now take release gray steps through `$retuned`.
    - `_tokens.scss:92` says the anchor is "the surface every dark role's border tier mixes against". The same two roles no longer mix against it.
    - `_tokens.scss:14-16` says "A color here was read from Elements' built showcase". `#fcfcfd` (`_tokens.scss:30`) is a Bootstrap color.
  - Why it matters: the unit rewrote the `CALIBRATED_TIERS` remark that brief 2 made false. It left these comments in its own file, so the next reader of the mode maps gets wrong information.
  - Right: have each comment exclude the `light` and `dark` roles, which take the release's gray tiers through `$retuned`. Have the header state that a literal color is either an Elements reading or a Bootstrap value its own comment derives.
- **F2: the closure contract in `_mixins.scss` is false, and the report does not name that prose or the moved alias pair.**
  - Wrong: two things lie outside the `theme-tokens` mixin that its contract claims.
    - `_mixins.scss:292-293` says `theme-tokens` emits "every canonical token whose value changes with the color mode … and every `--bs-*` alias pointing into that set".
    - `--vn-color-secondary-base` and `-rgb` now change by mode and come from the `$retuned` walk (`_tokens.scss:142-151`, `_theme.scss:31-33`).
    - `--bs-secondary` and `-rgb` are written in `_theme.scss:34-35`. Their primary twins sit inside the mixin (`_mixins.scss:342-343`), and the Additions rows give both pairs the same reason (`ct-shared.patch:881,884`).
  - Why it matters: the report names only the walk's move (`b-cross-ct-report.md:62-69`). A successor scoped from that sentence would leave the aliases apart from their twins and the contract comment false.
  - Right: name one successor unit that owns `_mixins.scss` to do three things:
    - Fold the `$retuned` walk into `theme-tokens`.
    - Emit the secondary fill and its aliases beside the primary's.
    - Rewrite the contract comment at `_mixins.scss:292-297`.

**Attacked and held**

- The literals could have been written as `color-mix()` over gray tokens. The literal is preferable because it reproduces the release's rounded value, and its derivation is stated both in a comment and in the guide (`ct-shared.patch:156-161`).
- Duplicate declarations from the walk overriding the closure do not ship. The built `dist/src/styles/index.css` has one `--vn-color-light-subtle` per scope, so the minifier removes the dead mix.
- The specimen renders the same in both page modes on purpose, because the outer surface declares `light`. The guide states this at `ct-shared.patch:928-929`.
- Splitting the Semantic roles table puts the `light` and `dark` rows, which the tier expressions don't cover, after the tier table. That reads coherently.

**Referrals**

- **R1 (to the objective lane):** the X3 plant only reaches the matched-site loop (`setupServer.ts:2660`). A mutation that deletes only the unmatched-selector check at `setupServer.ts:2643` would not redden `records a name the token registry carries…`. Decide whether a plant is owed for that branch.
- **R2 (to the objective lane):** `tests.md:187` puts case matrices in setup files. The changed test files hold four literal lists:
  - `controls` (`ColorModeSection.test.ts`, `ct.diff:643-650`)
  - `dark` (`conformance.test.ts`, `ct-shared.patch:1045-1054`)
  - `retuned` (`theme.test.ts`, `ct.diff:379`)
  - `tiers` (`alert.test.ts`, `ct-unscoped.patch:30`)
- **R3 (to the Orchestrator):** decide whether the diffstat line counts and "old" (report lines 53, 309-318) breach the brief's instruction to state "no tally of a growable set and no temporal word".
- **R4 (to the Orchestrator):** the design verdict gives THEME the X8 breakpoint alias case (`b-cross-design-verdict.md:12,26`), and neither brief carried it (`b-cross-ct-report.md:71-72`). Name its carrier.
- **R5 (to the Orchestrator, for the V11 successor brief):** the report's "per-variant literal pair" option (`b-cross-ct-report.md:45-46`) would put literal colors in `_button.scss`, which `styles.md:42-43` forbids. Exclude it in that brief.
- **Non-blocking observation:** the `alert.test.ts` edit (`ct-unscoped.patch:31-43`) calls `release.get(...)` three times inside a nested ternary. Filter out the pairs the release writes alike first, then assert on the rest.

VERDICT: FAIL none; outside the claims: F1, F2