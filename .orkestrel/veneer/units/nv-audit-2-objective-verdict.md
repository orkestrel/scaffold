# NAV (`nv`) audit round 2: objective lane verdict (`analyst` on GPT-6 Astra, thread from tmp/codex/nv-audit-2-analyst.jsonl, exec 15:24 to 15:30 UTC)

1. **CONFIRMED — Delta and scope.** The scope attack failed: the live status matches `nv-2-status.txt:1`, and `nv-2.diff:1` contains only the owned files. Comparing normalized diff contents confirms that `NavSection.ts` and `CardSection.test.ts` are unchanged from round 1; the different diff headers aren't source changes. The file headers in `nv-shared-2.patch:1` match the Shared row. Its `Navbar` deferrals concern nav links only (`nv-shared-2.patch:226`); DROPDOWN’s menu deferrals aren't included.

2. **CONFIRMED — Specimen and proof markup.** The attack was restoring the round-1 arrangement. The assertions distinguish it: `NavSection.test.ts:78` requires the item’s exact classes, followed by exact toggle and menu classes and attributes; `:87` rejects an empty plain-shown-tab population; `:92` rejects a menu inside that item. The region-wide `[style]` assertion at `:15` covers every specimen.

   The retained `nv-instruments-2/specimen-red.log.txt:15` records the expected item-class failure; `:8` reads `1 failed | 1 passed (2)`. The restored specimen passes in `gate-sections.log.txt:8`. The proof-markup mutation also distinguishes the defect: the required dropdown fragment is absent, producing the failure in `markup-red.log.txt:39` and `1 failed | 250 passed (251)` at `:11`.

   The specimen, copy, docblock, proof markup, fragment checks, and resting-tab exclusion agree (`nv-shared-2.patch:49`, `:62`, `:80`, `:362`, `:692`, `:772`). Bootstrap’s installed `dropdown.js:151` adds `show` to the toggle and menu; `:313` supplies the static-popper attribute. The separate plain item carrying `show` remains correct CSS coverage; it doesn't represent a dropdown-script write.

3. **CONFIRMED — Partition.** The attack was appending DROPDOWN’s menu deferrals while restoring the owner-only predicate. The set assertion distinguishes that mutation: `partition-red.log.txt:33` identifies the nav case, and its diff lists the foreign menu selectors. The result at `:76` is `1 failed | 250 passed (251)`. With the bounded predicate, `partition-green.log.txt:32` reads `251 passed (251)`.

   Independently comparing the patched selector table and nav-link deferrals with the installed inventory produced no missing selector, extra selector, or overlap. The property-table closure also matched. The assertions retain the rem conversion, palette and compatibility-variable bindings, and property closure (`nv-shared-2.patch:631`, `:649`, `:653`, `:665`, `:675`). Deleting a nav deferral and adding a withheld name to the shipped list each distinguish their defect, as recorded in `mutation-navbar-deferral-row-deleted.log.txt:3` and `mutation-navbar-name-added-to-the-shipped-list.log.txt:3`. Unrelated `Navbar` menu rows are correctly excluded.

4. **CONFIRMED — Mutation matrix.** The attack was checking whether a row cited an unexecuted mutation, an unrelated failure, or an assertion that could pass unchanged. The recorded edits match `mutate.py:20`; each mutation log records a failing named case. The controls read `"failedCount": 0` (`mutation-control-styles.log.txt:6`, `mutation-control-setup.log.txt:6`). No recorded failure names `card.test.ts`.

   In the following table, each log stem resolves to `nv-instruments-2/mutation-<stem>.log.txt:3`. I read every listed log. **The assertions distinguish every listed mutation.** The cited source lines identify the distinguishing assertions; selector-removal cases also exercise the layer-membership assertion at `nav.test.ts:65`.

   | Mutation log stem | Distinguishing assertions |
   | --- | --- |
   | `nav-rule-dropped` | Layout, overlap, and filled/justified geometry (`nav.test.ts:40`, `:266`, `:359`). |
   | `link-padding-read-past-its-slots` | Declaring-scope overrides and density readings (`:94`, `:101`, `:419`). |
   | `link-color-read-past-its-slot` | Declaring-scope color override (`:120`). |
   | `link-color-fixed-to-the-palette` | Compatibility-token color, mode readings, and light/dark difference (`:115`, `:437`, `:457`). |
   | `transition-written-without-the-mixin` | Reduced-motion duration and conditional declaration checks (`:474`, `:482`, `:495`); staged color cases also fail. |
   | `link-hover-left-out`, `tab-hover-left-out`, `underline-hover-left-out` | Driven hover color, isolation, and border readings (`:202`, `:211`, `:221`). |
   | `link-focus-left-out` | Keyboard-focused link color (`:139`). |
   | `ring-on-focus-rather-than-focus-visible` | A pointer-focused link must have no shadow ring (`:145`). |
   | `forced-ring-omitted` | Forced-color outline style and width (`:165`). |
   | `disabled-anchor-left-out`, `disabled-button-left-out` | Disabled color, pointer refusal, and hit testing (`:178`, `:184`). |
   | `tabs-strip-border-dropped` | Border-width and border-color cases, tab overlap, and light/dark strip paint (`:94`, `:115`, `:266`, `:453`). |
   | `tab-margin-dropped` | Negative margin and coincident border geometry (`:268`, `:275`). |
   | `tab-focus-left-out`, `underline-focus-left-out` | Keyboard-focused isolation/border and underline border (`:242`, `:253`). |
   | `tab-active-paint-dropped` | Active-background override, seam paint, and mode readings (`:120`, `:277`, `:438`). |
   | `tab-show-item-left-out`, `pill-show-left-out`, `underline-show-left-out` | Shown-versus-active paint comparison (`:312`). |
   | `tabs-menu-rule-dropped` | Menu offset and top/bottom corner readings (`:335`). |
   | `pill-slots-dropped` | Pill radius, pill colors, and mode readings (`:94`, `:115`, `:441`). |
   | `pill-radius-dropped` | Pill-radius length and override (`:94`, `:101`). |
   | `pill-active-left-out` | Pill colors, shown-versus-active paint, and mode readings (`:115`, `:312`, `:441`). |
   | `underline-gap-read-past-its-slot` | Gap override and density (`:101`, `:421`). |
   | `underline-stroke-read-through-a-space-token` | Stroke remains fixed when density changes (`:422`). |
   | `underline-link-rule-dropped` | Underline width, hover border, and density (`:94`, `:221`, `:422`). |
   | `underline-active-left-out` | Underline active-color and shown-versus-active cases (`:115`, `:312`). |
   | `bare-fill-link-left-out`, `fill-item-left-out`, `filled-item-link-left-out` | Filled-row width, growth, alignment, and link width (`:359`, `:364`, `:368`). |
   | `bare-justified-link-left-out`, `justified-item-left-out`, `justified-written-as-fill`, `justified-item-link-left-out` | Justified-row width equality, growth, alignment, and link width (`:359`, `:360`, `:368`). |
   | `pane-display-dropped`, `active-pane-display-dropped` | Active/hidden display and hidden-pane geometry (`:382`). |
   | `nav-loads-after-card` | Card-header strip and active-tab border treatment (`:400`, `:405`). |
   | `navbar-deferral-row-deleted`, `navbar-name-added-to-the-shipped-list` | Inventory union and disjointness (`nv-shared-2.patch:631`, `:634`). |

   The specifically disputed rows match their recorded failures, including the underline active selector, filled item selector, pill radius, pill active selector, and tabs strip border. The radius mutation removes the rule whose sole declaration is `border-radius`; its log accurately records that edit.

5. **CONFIRMED — Guide prose.** The attack compared the replacement sentences with the rulings and installed Tab implementation. The item-state, geometry, and font-size sentences match (`nv-shared-2.patch:154`, `:164`, `:171`). The Nav section directly precedes Card (`:200`). The Tab obligation records the pane and dropdown writes (`:276`), matching `bootstrap/js/src/tab.js:109`, `:115`, and `:242`. The retained Tab/ScrollSpy sentence names engine obligations, as the reconciliation permits.

   No Showcase clause is owed for the Nav region at this base. `c3ac297:guides/veneer.md:4003` delegates region order to the Showcase constructor and its proof; `:4006` enumerates helper placement. Nav is a component region, so its omission from that helper enumeration doesn't falsify it. The constructor and order proof receive Nav together (`nv-shared-2.patch:17`, `:309`). The R8 sentence remains correctly assigned to DROPDOWN.

6. **CONFIRMED — Comments and geometry proof.** The stale-wording attack failed. The partial carries the ruled geometry and item-state comments (`_nav.scss:76`, `:92`), and the conformance comment names Nav’s actual placement (`nv-shared-2.patch:475`). The geometry case has the ruled title and removes `.nav-item.dropdown` (`nav.test.ts:256`, `:262`).

   Dropping the negative margin distinguishes the geometry defect through the margin and rectangle assertions (`:268`, `:275`); `mutation-tab-margin-dropped.log.txt:3` records that case failing. Removing the menu item is valid isolation while the dropdown partial is absent; the separate menu case still tests Nav’s menu override.

7. **CONFIRMED — Gates.** The attack compared individual command logs with the report, including the failed chain run rather than trusting the wrapper’s final exit. The claimed results appear in these retained logs:

   | Gate | Evidence |
   | --- | --- |
   | `format:check` | Correct format and exit 0, `gate-format.log.txt:8`. |
   | `lint:check` | Command and exit 0, `gate-lint.log.txt:1`. |
   | `check` | Project chain and exit 0, `gate-check.log.txt:1`, `:30`. |
   | `build:src` | Build result and exit 0, `gate-build.log.txt:57`. |
   | `test:setup` | `251 passed (251)`, `gate-setup.log.txt:33`. |
   | Scoped styles | `35 passed (35)`, `gate-styles.log.txt:77`. |
   | Scoped sections | `4 passed (4)`, `gate-sections.log.txt:8`. |
   | `test:conformance` | `22 passed (22)`, `gate-conformance.log.txt:12`. |
   | `test:guides` | `19 passed (19)`, `gate-guides.log.txt:12`. |
   | `test:policy` | `109 passed | 1 skipped (110)`, `gate-policy.log.txt:12`. |
   | Patch applicability | Reverse application, restored status, and successful checks, `apply-check.log.txt:1`, `:8`, `:24`. |

   The chain’s setup timeout remains visible in `gate-setup-chain.log.txt:34`; the claim concerns the recorded successful rerun, with the landing interpretation expressly reserved. These logs establish the reported runs, not comprehensive defect detection. The distinguishing mutations for the claimed NAV proofs are ruled under the preceding verdicts.

8. **CONFIRMED — Journey observation.** The attack checked for another failed case or a suppressed Nav failure. The logs identify only the census assertion: `journey-light-390.log.txt:80`, `journey-light-1280.log.txt:79`, `journey-dark-390.log.txt:79`, and `journey-dark-1280.log.txt:79`. Their result lines read `1 failed | 38 passed (39)` at `:104`, `:103`, `:103`, and `:103`, respectively.

   The failed population is exactly `dropdown` and `dropdown-item`. The installed census reader compares mounted classes with declared cascade classes (`node_modules/@orkestrel/test/dist/src/browser/index.js:2246`), consistent with the absent dropdown partial.

   For the Nav case, removing the shown-item exclusion would select the plain shown tab. Its active border survives hover, so the unchanged-paint assertion distinguishes that mutation (`nv-shared-2.patch:362`, `:434`). Removing the focus ring is distinguished at `:438`. The logs support the passing journey observation; they don't certify captured imagery because these runs omitted capture.

9. **BROKEN — Law and report.** The “no count” and writing-law assertions are false. The report contains “one unified diff” (`b-collapse-nv-report-2.md:22`), “one plain `nav-link` child” (`:62`), and “five named rows” (`:313`), despite its denial at `:151`. It also uses temporal “now” at `:244`, which the writing rule bans. The shared comment says the `tests/setupStyles.test.ts` file “adds” without the required noun (`nv-shared-2.patch:730`), and the comment at `:673` states “two hover slots.”

   Smallest correction: remove prose tallies, name the relevant members, delete temporal “now,” and add the required file noun. The source constraints otherwise held: the delta introduces no prohibited assertion, suppression, mock, or assigned nested function; the SCSS uses tokens and the prescribed mixins. The recorded ancillary choices are bounded in `b-collapse-nv-report-2.md:303`.

   **F-COUNTS — BROKEN, recorded outside the claims as requested.** The report’s prose tallies are “one unified diff” (`:22`), “one plain `nav-link` child” (`:62`), “one term” (`:132`), “one arrangement” (`:308`), and “five named rows” (`:313`). “Failed one case” (`:269`) is also a tally, but it reports a cited run measurement. Position references occur as “second” (`:50`, `:305`) and “first log”/“second log” (`:247`); name the tab’s neighbors and the log files instead.

   The report also quotes these measured counts, which may remain as evidence:

   - Diffstat `19` (`:26`).
   - `1 failed | 1 passed (2)` (`:79`).
   - `4 passed (4)` (`:81`, `:264`).
   - `1 failed | 250 passed (251)` (`:82`, `:97`).
   - `251 passed (251)` (`:84`, `:100`, `:262`, `:273`).
   - Set-display counts `46` and `39` (`:98`).
   - Control `"failedCount": 0` readings (`:192`).
   - `35 passed (35)` (`:263`), `22 passed (22)` (`:265`), and `19 passed (19)` (`:266`).
   - `109 passed | 1 skipped (110)` (`:267`).
   - `1 failed | 38 passed (39)` for each journey variant (`:289`–`:292`).

   Claim identities, versions, exit codes, durations, CSS values, fixture labels, and the ruled border-width measurement aren't prohibited prose tallies. This finding concerns report conformance; it doesn't invalidate the retained execution results.

VERDICT: FAIL 9; outside the claims: F-COUNTS