1. **CONFIRMED — Coverage.** The matrix in `tests/setupStyles.ts:3281` contains every named class. `tests/src/styles/elements/button.test.ts:328` reads each form in each cascade through the states at line 365. Attack: remove each class’s reset include. The comparison distinguishes every removal through changed longhands or button values; the assertion failures are listed under verdict 7.

2. **CONFIRMED — Form comparison.** `tests/src/styles/elements/button.test.ts:421` retains unequal longhands with their button values; line 431 compares the resulting maps. Removing the close reset introduces the retuned font, shadow, and transition values, producing the `AssertionError` in `ebcl-instruments/logs/ebcl-mutation-close.log.txt:427`. Class-written values shared by the forms correctly disappear from the comparison.

3. **CONFIRMED — Release readings.** `tests/src/styles/elements/button.test.ts:343` installs Bootstrap’s text in a shadow root beneath the light-theme scope. I independently compared every retained `ebcl-instruments/logs/shadow-*.json` map against `ebcl-instruments/ebcl-probe/pages.json:1`; every cascade/state map agrees, including disabled readings. The named `ebcl-probe-shadow-readings.log.txt` is empty; the JSON artifacts supply the evidence. This confirms equality of the recorded difference maps, not equality of every absolute computed value.

4. **CONFIRMED — Input and checks.** `tests/src/styles/elements/button.test.ts:382` drives hover, hold, and keyboard focus. Line 398 checks the pseudo-class before recording the reading; line 410 asserts the accumulated misses afterward. A drive leaving its pseudo-class unmatched therefore fails the assertion. The installed hold implementation sends real pointer input and checks `:active` at `node_modules/@orkestrel/test/dist/src/browser/index.js:664`. Pointer and media cleanup are registered at `button.test.ts:37`. The passing execution is retained in `ebcl-instruments/logs/ebcl-gate-owned.log.txt:291`.

5. **CONFIRMED — Disabled pairing.** The assignments match `node_modules/bootstrap/dist/css/bootstrap.css`: dropdown at line 3656, nav at line 3834, list group at line 5044, and close at line 5365 pair `.disabled` with `:disabled`. Navbar toggler, accordion button, carousel controls, and indicators have no corresponding disabled selectors. Pagination instead has `.page-link.disabled, .disabled > .page-link` at line 4776, without `:disabled`. Leaving its counterpart unclassed correctly compares native button disability. Attack: check every assignment against these selectors and the disabled maps in `ebcl-instruments/ebcl-probe/pages.json`; no mismatch.

6. **BROKEN — Complete token retuning.** `src/styles/elements/_button.scss:57` passes `var(--vn-button-highlight)` into the forced-colors outline, but `tests/setupStyles.ts:3257` explicitly leaves it unchanged.

   The effective reads and holder assignments are:

   | Read | Holder assignment |
   |---|---|
   | `var(--vn-space-3)` | `5px` |
   | `var(--vn-space-6)` | `13px` |
   | `var(--vn-font-sans)` | `fantasy` |
   | `var(--vn-size-2)` | `17px` |
   | `var(--vn-weight-body)` | `700` |
   | `var(--vn-line-body)` | `1.9` |
   | `var(--vn-text-body-base)` | `var(--vn-palette-teal)` |
   | `var(--vn-button-transparent)` | `var(--vn-palette-yellow)` |
   | `var(--vn-radius-base)` | `7px` |
   | `var(--vn-button-shadow)` | `0 2px 6px rebeccapurple` |
   | `var(--vn-motion-feedback)` | `370ms` |
   | `var(--vn-ease-standard)` | `linear` |
   | `var(--vn-state-mixer)` | `var(--vn-palette-pink)` |
   | `var(--vn-state-hover)` | `41%` |
   | `var(--vn-state-active)` | `63%` |
   | `var(--vn-button-opacity)` | `0.37` |
   | `var(--vn-focus-color)` | `var(--vn-palette-orange)` |
   | `var(--vn-focus-width)` | `5px` |
   | `var(--vn-button-highlight)` | **Absent** |

   The surface reads appear at `_button.scss:20`; the additional effective mixin reads appear at `src/styles/_mixins.scss:381`. The caller overrides the mixin’s `--vn-focus-highlight` and `--vn-focus-reset` defaults, so those defaults are not additional reads.

   A mutation confined to forced-colors highlight behavior is not distinguished by these normal-color readings. Retune the omitted token and exercise its media condition before claiming complete coverage. Extending the existing holder is justified: `tests/service/tailwind/consumer.test.ts:324` asserts actual padding readings of `6px` and `12px`.

7. **CONFIRMED — Include-removal failures.** Each retained log shows the intended include removal, a successful build, the named class’s `AssertionError`, matching restore digests, successful `cmp`, and an empty source diff. The assertions distinguish every mutation from the passing tree.

   These logs were read under `/home/user/scaffold/.orkestrel/veneer/units/ebcl-instruments/logs/`:

   | Mutation | Distinguishing reading | Assertion evidence |
   |---|---|---|
   | Close | Retuned font, shadow, and transition | `ebcl-mutation-close.log.txt:427` |
   | Navbar | Retuned font, shadow, and disabled opacity | `ebcl-mutation-navbar.log.txt:425` |
   | Accordion | Retuned font, line height, and disabled opacity | `ebcl-mutation-accordion.log.txt:425` |
   | Dropdown | Retuned font, shadow, and transition | `ebcl-mutation-dropdown.log.txt:429` |
   | Nav | Retuned font, lower corners, and shadow | `ebcl-mutation-nav.log.txt:458` |
   | List group | Retuned font, shadow, and transition | `ebcl-mutation-list-group.log.txt:429` |
   | Pagination | Retuned corners, font, and shadow | `ebcl-mutation-pagination.log.txt:423` |
   | Carousel controls | Retuned corners, font, and shadow on each control | `ebcl-mutation-carousel-controls.log.txt:430`, `:548` |
   | Carousel indicators | Retuned color, corners, font, and shadow | `ebcl-mutation-carousel-indicators.log.txt:423` |

   `ebcl-restore-check.log.txt:3` additionally records restoration against `2376710`.

8. **BROKEN — The minifier claim exceeds the assertion.** `tests/src/styles/mixins.test.ts:245` collects only declarations already containing the word `revert`. It does not assert that every reset declaration has that value. The shipped reset deliberately contains `font-family: inherit`, `font-size: inherit`, `line-height: inherit`, and `border-radius: 0` (`src/styles/_mixins.scss:136`).

   I executed the extracted collector against in-memory CSS mutations. Changing the close reset’s `padding: revert` to `padding: initial` leaves its selector and whole-value assertions passing; changing it to `padding: revert 1px` fails the whole-value assertion. The retained transition-delay plant is genuinely distinguished: `ebcl-instruments/logs/ebcl-mutation-minifier.log.txt:409` reports the assertion failure for `transition: revert 0s 1s`.

   Correct the claim to match the test title: every reset declaration **that contains `revert`** must contain it as the whole value. Do not replace legitimate `inherit` or `0` values.

9. **CONFIRMED — Reading reference data.** The file read at `tests/src/styles/elements/button.test.ts:346` introduces no Bootstrap import specifier. `tests/setupServer.ts:3337` already reads the stylesheet as oracle data, consistent with the reference-testing allowance in `ROADMAP.md:28`.

   The gate is broader than runtime reachability: `tests/conformance.test.ts:794` scans source, application, and test modules, subject to its service exclusions. `tests/setupServer.ts:850` also collects type imports and `TSImportType` nodes. Executing the actual scanner in isolation confirmed that the file read passes, while a Bootstrap `?raw` import, a type-only import, and an import type all report forbidden specifiers. Those controls distinguish the file read from an import; they do not establish general runtime-graph analysis. The retained gate result is `ebcl-instruments/logs/ebcl-gate-test-conformance.log.txt:15`.

10. **BROKEN — Guide accuracy.** The shared patches match the live diff, and the export names occupy their sorted positions at `tests/setupStyles.test.ts:377`. The guide nevertheless overstates coverage at `guides/veneer.md:10265`: the holder omits the forced-colors highlight. Its statement that an unpaired class has “no disabled rule” at line 10270 is also false for `.page-link`, whose class-based disabled rule appears at `bootstrap.css:4776`.

    Correct the token statement after resolving verdict 6, and say “no `:disabled` rule” for the unpaired condition. The pairing implementation itself remains correct.

11. **BROKEN — Required placement.** The shared-helper rule at `/home/user/scaffold/.claude/rules/tests.md:183` requires consolidation; it does not require moving component registrations into the element test. Component cases can call a shared reader without duplicating the routine. The writing brief explicitly requires component-file placement at `/home/user/scaffold/.orkestrel/veneer/units/e-id-button-classes-brief.md`, Execution step 2.

    Extract the shared browser reading routine and retain assertions in the requested component mirrors. The local state matrix at `tests/src/styles/elements/button.test.ts:365` also conflicts with `tests.md:187`, which places case matrices in setup files. Move that matrix into setup infrastructure. The existing centralized registration demonstrably executes; execution does not establish the claimed placement requirement.

12. **CONFIRMED — Recorded gates.** Attack: compare the claimed outcomes with retained terminal lines and the actual setup failure. Under `ebcl-instruments/logs/`, the following logs record `exit=0`: `ebcl-gate-check.log.txt:29`, `ebcl-gate-format-scoped.log.txt:5`, `ebcl-gate-lint-scoped.log.txt:1`, `ebcl-gate-build-src.log.txt:57`, `ebcl-gate-owned.log.txt:295`, `ebcl-gate-test-src-styles.log.txt:8202`, and the conformance, guides, and policy gate logs at line 15. The styles log reports `Tests 1516 passed (1516)` at line 8198.

    `ebcl-gate-test-setup.log.txt:34` identifies the `10100ms` timeout in the untouched oracle case. `ebcl-instruments/ebcl-orchestrator-setup-rerun.log.txt:7` records `Tests 1 passed | 112 skipped (113)`, followed by `exit=0` at line 11. This confirms the reported runs, not a fresh full-suite execution.

13. **CONFIRMED — Enumerated scope and syntax claims.** The live diff equals retained `ebcl.diff`; live status matches `ebcl-status.txt:1`, and `git diff 2376710 --stat -- src` is empty. Inspection of the added code found none of the enumerated forbidden constructs. The `as const` uses preserve literal tuples and fall within `/home/user/scaffold/.claude/rules/typescript.md:27`. The comparison expectations derive from readings; the `appearance` guard is supported by the retained release maps. The placement and prose defects are addressed separately.

Findings outside the claims: none.

Attacked and held: shared calibrated class values correctly drop out; native button-versus-counterpart differences remain; pagination’s unpaired native disabled reading is intentional. The minifier guard correctly permits the reset’s non-`revert` declarations; its expanded claim is what fails.

VERDICT: FAIL 6, 8, 10, 11; outside the claims: none