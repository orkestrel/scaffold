**TOKEN-PROOFS audit: subjective lane (`reviewer` on Opus 5.5)**

I held the subjective lane. I rule on each claim from the tree as it stands. Line numbers refer to `/home/user/veneer-tkp/tests/src/styles/tokens.test.ts` unless another file is named. The logs are under `/home/user/scaffold/.orkestrel/veneer/units/tkp-instruments/logs/`.

## Per-claim verdicts

**1. Coverage — CONFIRMED.**
- `describe('ancestor token overrides')` at lines 687–951 holds one case for each of the eleven tokens:
  - `link.base` at line 694.
  - `link.hover.base` at line 716.
  - `link.decoration` at line 747.
  - `form.valid` at line 781.
  - `form.invalid` at line 811.
  - `state.hover` at line 838.
  - `state.active` at line 865.
  - `state.mixer` at line 893.
  - `button.opacity` at line 915.
  - `weight.heading` at line 927.
  - `ease.standard` at line 939.
- Each case mounts a shipped consumer inside the overriding element: an `a` tag, `.btn-link`, `.form-control.is-*`, `.*-feedback`, `.btn`, or a `dt` tag. It also mounts a twin outside that element and reads a resolved property from both.
- Attack: I looked for a case that reads the token rather than the consumer. None does. No case calls `readToken`, and every one calls `readStyle`.

**2. Each proof reads the consumer, and each plant kills it — UNRESOLVED.**

What holds:
- All 16 plants in `tkp-plant.py:22-39` write the consumer declaration as a literal equal to its rest value. Each literal equals the twin reading the case asserts.
- Every log shows `occurrences: N (expected N)`, then `AssertionError` at an inside reading, then `restored-byte-identical`, then `diffstat-lines=0`.
- Each failing line comes after the twin assertions in its case: 711, 712, 740, 743, 760, 761, 804, 807, 831, 834, 861, 889, 911, 923, 935, and 947.
- Named mutation: each consumer stops reading its token. The assertions tell each such mutation apart from the passing case.

What is not decided:
- The redecoration case's title claims "at rest and under hover". Its hover leg for the link button (line 774) reads a separate consumer rule: `.btn-link:hover { text-decoration: var(--vn-link-decoration) }` at `/home/user/veneer-tkp/src/styles/components/_button.scss:203-204`.
- The `link-decoration-button` plant rewrote that rule together with the rest rule at `_button.scss:200` (`occurrences: 2` in `tkp-plant-link-decoration-button.log.txt:4`). The case therefore failed at line 761 and never reached line 774.
- Named mutation: only the `.btn-link:hover` declaration becomes `underline`. By derivation, line 774 would read `'underline'` and fail while the twin at line 768 holds. No run shows it.
- The report's sentence "each consumer has its own plant, so each assertion is shown to be load-bearing" is therefore not true for line 774.
- To settle it, plant only `_button.scss:204` → `text-decoration: underline;`, rebuild, run `-t 'overrides the link decoration'`, and read an `AssertionError` at line 774 with lines 758–768 holding. Restore byte-identically.

**3. The form cases use a mode-scope ancestor, and the comment says why — UNRESOLVED.**

What holds:
- Both form cases put the override on `data-bs-theme="light"` (lines 781 and 811).
- The aliases are declared only inside the `theme-tokens` mixin, at `/home/user/veneer-tkp/src/styles/_mixins.scss:526-529`. That mixin is emitted at `:root` (`_tokens.scss:493`) and at each `[data-bs-theme]` scope (`_theme.scss:19-21`).
- The consumers read the alias, not the token: `components/_validation.scss:19` and `:45`.
- The comment at lines 776–778 states this.
- One rival reading was excluded: the nested light scope alone could have moved the paint. Under each form plant the inside element read the rest literal, so the scope alone moves nothing.

What is not decided:
- The clause "a plain ancestor moves nothing" rests only on the writer's own reading (report § Unknowns, "Form reach"). No log or retained instrument records it. The source structure agrees with it, but that is a derivation, not a run.
- To settle it, remove `data-bs-theme="light"` from the inside ancestor at line 781, keep the built cascade, and run `-t 'overrides the valid color'`. The clause holds if an `AssertionError` appears at line 804 while lines 795–803 hold. Repeat for line 811 and line 831.
- That instrument settled a design choice and underwrites the finding below. Adopt it as a permanent control case asserting that a plain ancestor leaves the alias on the mode's value. `.claude/rules/quality.md` § Instruments ("Adopt an instrument that settled a claim as a test") requires this.

**4. Real input — CONFIRMED.**
- Hover is driven with `hoverAccessible` and checked with `.matches(':hover')` at lines 728–743, 763–774, 846–855, and 901–910.
- Press is driven with `holdAccessible` and checked with `.matches(':active')`, with `releasePointer` between the twin and the inside button (lines 873–883).
- The disabled case uses the real `disabled` attribute (lines 916 and 918).
- Every pointer-driven case calls `stageMedia({ motion: false })` first (lines 727, 762, 845, 872, and 900). Per the installed declaration, `motion: false` means reduced motion (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts:2941-2942`). Under reduced motion the `.btn` transition mixin emits `transition: none` (`_mixins.scss:359-360`).
- `afterEach` calls `releasePointer` and `releaseMedia` (lines 688–691).
- Correction to the claim's wording: the disabled case (lines 913–924) calls no `stageMedia`, and it needs none. The attribute is present at first style, so no opacity transition starts. The block comment at lines 685–686 limits the motion statement to hover and press, which is accurate.

**5. The stacking rows — CONFIRMED.**
- `/home/user/veneer-tkp/guides/veneer.md:7200` is the only table row for `--vn-stack-popover`.
- Its Alias cell names all three aliases in rung order. Each resolves in source: `_popover.scss:44`, `_tooltip.scss:44`, and `_toast.scss:13`.
- The reference-map case passes (`tkp-tokens.log.txt:30`), and `test:guides` passes with `Tests 20 passed (20)`, `exit=0` (`tkp-test-guides.log.txt:11,15`).
- Named mutation: drop `--bs-toast-zindex` from the cell. The baseline passed with the duplicate rows, so the value case does not appear to read the Alias cell and would not tell that mutation apart. I confirmed the cell's truth from source, not from that case.

**6. Gates — UNRESOLVED.**

What holds:
- `check`: `exit=0` (`tkp-check.log.txt:29`).
- `lint:check`: `exit=0` (`tkp-lint-check.log.txt:5`).
- The tokens file: `Tests 43 passed (43)`, `exit=0` (`tkp-tokens.log.txt:74,78`).
- `test:guides`: `exit=0`.
- The first `test:policy` run: `Test timed out in 5000ms`, `exit=1` (`tkp-test-policy.log.txt:13,31`).
- The re-run: `109 passed | 1 skipped`, `exit=0` (`tkp-test-policy-2.log.txt:11,15`).
- The styles project: `Tests 1516 passed (1516)` (`tkp-test-src-styles.log.txt:2915`).

What is not decided:
- "At a load near 20 on 4 CPUs" appears only in the writer's report. No log records a load reading.
- To settle it, run `npm run test:policy` yourself after the unit exits (`.agents/orchestration.md` § Writing concurrency, rule 10), or retain a load reading taken with the first run.

**7. Scope and law — CONFIRMED.**
- `tkp-status.txt` lists only `guides/veneer.md` and `tests/src/styles/tokens.test.ts`.
- The diff contains no `any`, no `as`, no `!`, and no suppression. It uses `requireValue` in place of a non-null assertion.
- Its only functions are callbacks passed directly to `it` or `afterEach`. It adds no helper, mock, or fake.
- Every asserted literal agrees with a live reading of the built cascade: each case passes in `tkp-tokens.log.txt:61-71`, and each plant reproduces the twin literal.
- Each title names the consumer, the property, the override site, and the twin, using one vocabulary ("rest color", "rest mix", "rest easing").
- The form titles say "mode scope" rather than "ancestor", which is honest about the placement they need.

## Findings outside the claims

**F-CUSTOMIZATION-REACH (BROKEN): § Customization states a false universal, and the shipped test contradicts it.**
- **Where:** `/home/user/veneer-tkp/guides/veneer.md:7359-7361`, which reads: "Override a canonical token in your own unlayered rule … every tier and every `--bs-*` alias derived from the token you changed follows the override."
- **Failing input:** an unlayered override on an element that is not a mode scope, such as `<div style="--vn-form-valid: rgb(200, 30, 40)"><input class="form-control is-valid"></div>`. The `.is-valid` border stays at `oklab(0.4313 -0.0943551 0.0412221)`.
- **Mechanism:** every alias and tier the `theme-tokens` mixin declares is computed at `:root` or at a `[data-bs-theme]` element and inherited as an already-resolved value. That covers `--bs-form-*` (`_mixins.scss:526-529`), `--bs-primary` and its siblings (`:493-500`), and `--bs-link-color` (`:517`). An override on any other element moves only rules that read the token themselves.
- **Contradiction in the tree:** the test comment at lines 776–778 states this limit ("An ancestor that is no mode scope leaves the alias on the value its mode resolved"). It also credits § Customization with placing overrides at a mode scope, but only the guide's example places them there. The prose states no placement.
- **Evidence strength:** the only run is the writer's own reading. Claim 3's settling run reproduces it.
- **Rules broken:** `.claude/rules/documentation.md` § Parity (falsify a prose claim, and re-read the prose against what shipped) and `.claude/rules/writing.md` § Claims and time.
- **What right looks like:** § Customization states that derived tiers and `--bs-*` aliases follow an override declared on `:root` or on a `[data-bs-theme]` element. It states that consumers reading a token directly follow an override on any ancestor, and names the link colors and decoration, button state mixes, button opacity, heading weight, and easing. An executed control case pins the form limit, as described under claim 3. The unit's brief owned only the stacking rows and § Tests in the guide, so this needs a successor guide unit that owns § Customization.

## Attacked and held
- **Rival reading of the form cases' nested light scope:** the plant runs exclude it, as recorded under claim 3.
- **Partial mutation of the easing:** the full five-entry list is asserted, so rewriting any one of the five `var(--vn-ease-standard)` entries fails at line 947.
- **State mixer:** the plant cut only the hover mix, and the case asserts only hover. The active mix's use of the mixer is outside this case.
- **Heading-weight consumer:** `dt` is a sound choice. Its browser default is `normal`, so no default can match either 600 or 800.
- **Adjacent, not a defect:** the § Tokens stacking rows are not in value order (dialog 1050, then popover 1070, then drawer 1040). The merge kept the surviving row's position, and no rule governs row order.

## Referrals
- **To the Orchestrator, a design ruling for the `planner` and `analyst` pass:** decide whether the tenet "tokens are a supported customization contract" wants form tokens to reach from any ancestor. That would mean re-declaring `--bs-form-*` on the validation consumers, the way `.btn` declares `--bs-btn-*` at `_button.scss:15-47`. The alternative is to document the mode-scope limit as the contract. The limit is structural and covers every alias `theme-tokens` declares, not only the form pair.

VERDICT: FAIL 2, 3, 6; outside the claims: F-CUSTOMIZATION-REACH
