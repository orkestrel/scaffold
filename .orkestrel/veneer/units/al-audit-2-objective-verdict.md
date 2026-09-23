# ALERT (`al`) audit round 2 — objective lane verdict (`analyst` on GPT-6 Astra)

Journal: `tmp/codex/al-audit-2-analyst.jsonl` (swept at acceptance); thread `01a0cf02-0470-76e2-ae16-47ad594642be`; launcher `units/al-audit-2-analyst.sh` through `units/codex-queue-5.sh` after a live probe (`ready` at 16:03:30 UTC); started 16:03:30 UTC, done 16:10:23 UTC exit 0. Verdict copied verbatim from the `--output-last-message` file.

1. **CONFIRMED.** The scope attack found no unauthorized change. `al-2-status.txt:1` matches the current status; every added-file payload in `al-2.diff` matches its worktree file. `AlertSection.ts` is byte-identical to round 1. The shared patch’s paths match the Shared row, and its remaining hunks preserve round 1’s changes. The close-table alignment remains authorized by `al-audit-verdict.md`. Evidence: [shared patch](/home/user/scaffold/.orkestrel/veneer/units/al-shared-2.patch:1), [status](/home/user/scaffold/.orkestrel/veneer/units/al-2-status.txt:1).

2. **CONFIRMED.** The stale-proof attack failed. Every retained mutation matches the edit derived from the shipped partial, and every complete source frame in its failure log matches the shipped test. Each mutation log’s `RUN` line names `/home/user/veneer-al/tmp/probe/base`. The control reports `28 passed (28)` at `al-instruments-2/logs/control.log.txt:103`. The derivation is retained at [derive.py](/home/user/scaffold/.orkestrel/veneer/units/al-instruments-2/derive.py:16).

   These assertions distinguish the mutations from the passing control. Log references resolve under `/home/user/scaffold/.orkestrel/veneer/units/al-instruments-2/logs/`; assertion references resolve in `tests/src/styles/components/alert.test.ts`.

   | Mutation | Distinguishing assertion | Retained failure evidence |
   |---|---|---|
   | `slot-literal` | Lines 65 and 106 reject the literal slot and unchanged density response. | `slot-literal.log.txt:112`, `:131` |
   | `literal-padding` | Lines 88 and 106 reject padding that ignores consumer retuning and density. | `literal-padding.log.txt:115`, `:134` |
   | `position-dropped` | Lines 40 and 233 reject static positioning and the displaced control. | `position-dropped.log.txt:112`, `:124` |
   | `heading-dropped` | Lines 32 and 128 reject the missing selector and inherited heading-slot color. | `heading-dropped.log.txt:117`, `:133` |
   | `link-dropped` | Lines 32, 139, 178, and 188 reject the missing selector, weight, and role-color routing. | `link-dropped.log.txt:133`, `:149`, `:198`, `:165` |
   | `dismissible-literal` | Line 108 rejects right padding that remains 48px after density doubles. | `dismissible-literal.log.txt:114` |
   | `close-left` | Line 234 rejects the control’s right edge at the wrong corner. | `close-left.log.txt:107` |
   | `close-plain-alert` | Lines 32 and 246 reject the changed selector and absolute positioning inside a plain alert. | `close-plain-alert.log.txt:117`, `:133` |
   | `lift-sunk` | Line 223 receives the cover instead of the control. | `lift-sunk.log.txt:120` |
   | `lift-dropped` | Line 223 receives the cover instead of the control. | `lift-dropped.log.txt:120` |
   | `role-alias` | Line 175 rejects the info variant reading primary aliases in light and dark. | `role-alias.log.txt:106`, `:116` |
   | `role-literal` | Line 175 rejects the warning literals in light and dark. | `role-literal.log.txt:106`, `:116` |
   | `loop-roles` | Line 200 rejects the invented tertiary variant. | `loop-roles.log.txt:111` |

   The conformance mutation also reports the unrecorded `.alert-tertiary` selector in the named additions cases at `loop-roles.conformance.log.txt:20` and `:40`. The R19 matrix covers the recorded selectors; the inventory has no alert conditions or media entries. The literal-role mutation establishes rejection of the retained literals; its failure occurs before the later retuning assertions.

3. **CONFIRMED.** The attack that removes the stacking declaration fails at the hit assertion, rather than merely at the computed-style assertion. The installed `readHit` function uses the element’s box center and its document’s `elementFromPoint` method (`node_modules/@orkestrel/test/dist/src/browser/index.js:383`). The cover, title, import, and adjacent assertions appear at [alert.test.ts](/home/user/veneer-al/tests/src/styles/components/alert.test.ts:207). I read `lift-sunk.log.txt:105` and `lift-dropped.log.txt:105`; each reports the cover at line 223. These assertions distinguish either mutation from the passing control.

4. **CONFIRMED.** The stale-reader attack is recorded in `al-instruments-2/logs/rename-first.tsc.log.txt:1`: the compiler rejects the old `end` readers against the renamed geometry object. The final readers use `right` at `alert.test.ts:108`, `:214`, and `al-shared-2.patch:486`; the declaration is at `al-shared-2.patch:567`. The compiler distinguishes this mutation, and the final check exits successfully at `logs/gates.log.txt:3`. The physical-direction prose matches the ruling at `al-shared-2.patch:122`, `:145`, and [_alert.scss](/home/user/veneer-al/src/styles/components/_alert.scss:40).

5. **CONFIRMED.** The inaccurate-dismissal-copy attack found the required replacement in the guide and `CLOSE_COPY` at `al-shared-2.patch:153` and `:74`. The added prose assigns plugin behavior to the engine. I read `logs/section.log.txt:7`, which reports `9 passed (9)`. Removing the inverted control’s accessible label would fail `CloseSection.test.ts:60`; the assertion distinguishes that mutation. Reverting only the paragraph’s wording would not fail its constant-relative comparison at line 17, so the exact wording is established by the patch inspection.

6. **CONFIRMED.** The old-wording attack found the ruled nouns at `al-shared-2.patch:42`, `:236`, and `:563`; the compatibility cells at `:227` remain identical to round 1. The inset comment is correct at `_alert.scss:40`, and the proof sentence names positioned content at `al-shared-2.patch:155`. Its stacking claim is distinguished by the mutations and logs ruled under claim 3. Bootstrap’s installed `alert.js:37` corroborates the plugin row’s conditional transition handling.

7. **CONFIRMED.** The wrong-base and patch-drift attacks failed. A fresh read-only `git apply --check` exited 0 against the tracked tree unchanged from `c3ac297`. The patch SHA-256 matches `6c32eb15eac2b64e3148c06b7fcd982dbd4f6d4abf808c278fe66408c2fec3a0`. I read `logs/apply-check.log.txt:16`, which records successful reversal, empty status, matching tree hashes, and successful application checking; `logs/worktree-scoped.log.txt:1` records the scoped checks.

   I also read the individual format, lint, check, build, styles, section, guides, policy, setup, and conformance logs. Their results agree with `logs/gates.log.txt:1`: successful exits and the claimed test-result measurements. The policy skip corresponds to the existing condition at `tests/policy.test.ts:716`. The rename mutation distinguishes stale readers at compilation, and the loop mutation distinguishes an unrecorded selector in conformance. Browser and Vitest results here are retained execution evidence, not reruns in this sandbox.

8. **BROKEN.** The report violates its explicit writing requirements. It states file and line totals at [b-modal-al-report-2.md:39](/home/user/scaffold/.orkestrel/veneer/units/b-modal-al-report-2.md:39) and uses the prohibited word “just” at [line 244](/home/user/scaffold/.orkestrel/veneer/units/b-modal-al-report-2.md:244). Delete the unsolicited diffstat totals and that word. This finding requires no implementation change; inspection found no prohibited assertion, suppression, mock, or nested function in the shipped delta.

   **Outside-claims finding REPORT-COUNTS — BROKEN.** The report’s unsolicited counts contradict the no-count requirement. The report states the following counts and count expressions:

   - Lines 39–41: `_alert.scss` — 69 lines; `alert.test.ts` — 252; `AlertSection.ts` — 20; `AlertSection.test.ts` — 92; 13 changed files; 280 insertions; 13 deletions. Remove these totals.
   - Lines 95–96: “one `light`” and “one `dark`,” repeated in the prescribed before-and-after wording. Retain the wording explicitly required by the ruling.
   - Line 183: “both modes” in the alias and literal mutation entries. Name light and dark directly.
   - Lines 151 and 200–207: `28 passed (28)`, `45 passed (45)`, `9 passed (9)`, `19 passed (19)`, `109 passed | 1 skipped (110)`, `251 passed (251)`, and `22 passed (22)`. These are required run measurements and remain.
   - Line 119: diagnostic elision markers `(1)` and `(2)`. These belong to quoted execution output.

   The stacking levels, geometry values, versions, exit codes, source locations, hashes, and claim identifiers are values or references rather than population totals.

Attacked and held: plain-alert controls correctly remain in flow while dismissible controls are positioned. Physical right placement is intentional. The section proof establishes accessible naming, not dismissal behavior. Capture and journey execution remain the Orchestrator’s landing work under the standing rulings.

VERDICT: FAIL 8; outside the claims: REPORT-COUNTS