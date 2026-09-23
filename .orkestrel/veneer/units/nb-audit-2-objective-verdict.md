## Verdict — NAVBAR (`nb`) audit round 2, objective lane on GPT-6 Astra

Bench unit: `analyst` route, `codex exec --sandbox read-only` rooted at `/home/user/veneer-nb`, launched by `codex-queue-17.sh` after `nb-audit-2-analyst.sh`; journal `tmp/codex/nb-audit-2-analyst.jsonl` (swept at acceptance), thread id `01a0cf9e-17a6-7700-bbee-bdbed33940dd`, started 18:53:59 UTC, ended 19:02:59 UTC, exit 0. The lane's returned message follows verbatim.

1. **BROKEN — Delta and scope.** The universal base-hash statement is false. The retirement patch’s old hashes include `4a25dbb`, `09a2f22`, and `cff2414`; the corresponding `a658879` blobs begin `7577415`, `daef14f`, and `6f95873`. See [nb-retirement-2.patch:26](/home/user/scaffold/.orkestrel/veneer/units/nb-retirement-2.patch:26), [line 51](/home/user/scaffold/.orkestrel/veneer/units/nb-retirement-2.patch:51), and [line 71](/home/user/scaffold/.orkestrel/veneer/units/nb-retirement-2.patch:71). These hashes correctly describe the simulated retirement base. I reproduced that base and verified the patch’s context and resulting hashes in memory.

   The prohibition on adding a line to a sibling unit’s file also needs its authorized exception: [nb-offlimits-2.patch:34](/home/user/scaffold/.orkestrel/veneer/units/nb-offlimits-2.patch:34) adds the mixin invocation to NAV’s partial. **Smallest fix:** correct the claim’s base and scope clauses; retain the authorized patches.

   The remaining scope checks held. Live status matches the retained status. The owned-file population matches the diff; the theme proof and section implementation are unchanged from round 1. Comparing patch additions and removals confirmed the stated shared-file changes, unchanged registry and integration hunks, mixin-comment change, and retirement-comment change. The shared and off-limits patches each passed `git apply --check` with exit 0. Their base hashes match `a658879`.

2. **CONFIRMED — The retained readings.** I attacked the possibility that summaries concealed missing runs, different failures, or interrupted results. The retained evidence supports the claim:

   - [built-cascade.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-2/logs/built-cascade.log.txt:1) records the successful build, absent light-class rule, breakpoint blocks, and unconditional expansion rule. Adding a light-class rule is distinguished by the selector-population assertion in [navbar.test.ts:73](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:73), with its red reading retained in the mutation log.
   - [theme-red-green.log.txt:2](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-2/logs/theme-red-green.log.txt:2) records the base proof’s missing-image failure and the rewritten proof’s green result. Restoring the toggler asset at theme scope is distinguished by the empty-property assertion in [theme.test.ts:144](/home/user/veneer-nb/tests/src/styles/theme.test.ts:144). The restored digest matches.
   - [retirement-asset.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-2/logs/retirement-asset.log.txt:1) records red with the planted accordion image and green after restoration. The retirement proof’s empty-property assertions distinguish that mutation; see [nb-retirement-2.patch:92](/home/user/scaffold/.orkestrel/veneer/units/nb-retirement-2.patch:92).
   - [journey-light-390.log.txt:52](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-2/logs/journey-light-390.log.txt:52) and [journey-dark-1280.log.txt:52](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-2/logs/journey-dark-1280.log.txt:52) show the claimed census failure and completed result.
   - [census-probe.log.txt:52](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-2/logs/census-probe.log.txt:52) records the green census, probe selector, and matching restoration digests. The empty undeclared-class assertion distinguishes the stage without that selector from the probe state; see [integration.test.ts:1789](/home/user/veneer-nb/tests/app/browser/integration.test.ts:1789).
   - [journey-light-390-killed.log.txt:2](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-2/logs/journey-light-390-killed.log.txt:2) records exit 137. The separate rerun supplies the completed reading.

3. **CONFIRMED — The class specimen’s surface.** The markup and explanation appear in [nb-shared-2.patch:55](/home/user/scaffold/.orkestrel/veneer/units/nb-shared-2.patch:55) and [line 101](/home/user/scaffold/.orkestrel/veneer/units/nb-shared-2.patch:101). The attribute specimen retains its dark attribute.

   Dropping the class or the light attribute is distinguished by the explicit assertions in [NavbarSection.test.ts:131](/home/user/veneer-nb/tests/app/browser/sections/NavbarSection.test.ts:131). [mutations.log.txt:25](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-2/logs/mutations.log.txt:25) records the respective red runs.

   The stronger attack—removing the dark-class selector from the rebuilt cascade—also supports the correction. [class-surface.log.txt:6](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-2/logs/class-surface.log.txt:6) records black for the revised markup and white for the earlier markup. [Line 14](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-2/logs/class-surface.log.txt:14) records white for each with the shipped rule. The probe’s assertion checks its label, not its paint; its logged browser measurements distinguish this mutation. The section assertions separately guard the required markup.

4. **CONFIRMED — The copy and titles.** The paragraph has the required ending at [nb-shared-2.patch:48](/home/user/scaffold/.orkestrel/veneer/units/nb-shared-2.patch:48). The section title matches at [NavbarSection.test.ts:8](/home/user/veneer-nb/tests/app/browser/sections/NavbarSection.test.ts:8). I compared parsed test-title literals against the round-1 diff: only the stated section title changed. The attack that other titles drifted failed.

5. **BROKEN — The guide, comments, and doc blocks.** The named repairs are present, but the universal claim that every added code token has its following noun is false:

   - “The release records `.nav-link` unconditionally…” at [nb-shared-2.patch:1043](/home/user/scaffold/.orkestrel/veneer/units/nb-shared-2.patch:1043).
   - “`.card-header-tabs .nav-link.active` is recorded…” at [line 1048](/home/user/scaffold/.orkestrel/veneer/units/nb-shared-2.patch:1048).
   - “The release records `.navbar-toggler` unconditionally…” at [line 1063](/home/user/scaffold/.orkestrel/veneer/units/nb-shared-2.patch:1063).

   **Smallest fix:** add “selector” after these tokens. These are added prose lines, including rewritten NAV documentation; they are not untouched precedent. The requested factor, token, property, state-class, mixin, and comment rewrites otherwise held.

6. **CONFIRMED — The dark-spelling matrix.** The frozen table appears at [nb-shared-2.patch:1325](/home/user/scaffold/.orkestrel/veneer/units/nb-shared-2.patch:1325). Its selectors match the inventory’s recorded order. The binding assertions compare selectors and declarations, check markup suffixes, and inspect table and row freezing at [line 928](/home/user/scaffold/.orkestrel/veneer/units/nb-shared-2.patch:928) and [line 981](/home/user/scaffold/.orkestrel/veneer/units/nb-shared-2.patch:981).

   Unfreezing the table, unfreezing a row, and reversing the rows are each distinguished by those assertions. [mutations.log.txt:27](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-2/logs/mutations.log.txt:27) records their red results. Reversing the rows leaves the browser proof green, as [line 30](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-2/logs/mutations.log.txt:30) records; order belongs to the setup assertion. The unchanged control passes at [line 33](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-2/logs/mutations.log.txt:33).

   Removing the dark-class selector still fails the class row’s value assertions while the attribute row passes. The browser proof retains its title, checks selector membership, and uses the renamed loop variable at [navbar.test.ts:400](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:400).

7. **CONFIRMED — The proof matrix and gates.** I compared the mutation script, retained failures, and actual assertions. Each mutation below is distinguished from the passing state:

   | Mutation | Distinguishing assertion |
   | --- | --- |
   | Neighbouring expansion boundaries; expansion gated at sm without an infix | Expected layout and visibility at the named widths: [navbar.test.ts:204](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:204), [line 246](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:246). |
   | Dark-class selector removed | Recorded slot values differ from the plain bar: [line 409](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:409). |
   | Toggler image restored at theme scope; dark icon rule removed | Plain elements have no image property; dark icons have the recorded image: [line 436](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:436). |
   | Scroll-height fallback removed | Resolved maximum height and actual height equal the viewport fraction: [line 382](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:382). |
   | Nav-link reassignment removed; active/open rule removed | Plain, disabled, current, and open links read their required slots: [line 130](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:130). |
   | Expanded offcanvas rule removed; header rule removed | Resolved panel and header readings differ across the boundary: [line 318](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:318). |
   | Focus ring removed; forced-ring inclusion removed; transition written bare | Shadow spread, forced outline, reduced-motion duration, and media condition: [line 480](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:480). |
   | Collapsed-menu rule removed; collapse rule removed | Menu position, content basis, growth, and layout: [line 221](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:221), [line 292](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:292). |
   | Light-class rule added | Forbidden selector population is nonempty: [line 73](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:73). |
   | Brand hover/focus rule removed; text-link rule removed | Independently retuned hover and active slots reach the intended consumers: [line 170](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:170). |
   | Text inset replaced with a literal; navbar block-padding property removed | Density changes the expected readings; declaring-scope overrides move the consumer: [line 542](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:542), [line 76](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:76). |
   | Expanded-content priority removed | Priority mismatches against Bootstrap must be empty: [conformance.test.ts:259](/home/user/veneer-nb/tests/conformance.test.ts:259). |
   | Collapsed toggler class removed; opened-content class removed | Toggler state agrees with content state and its accessibility attribute: [NavbarSection.test.ts:88](/home/user/veneer-nb/tests/app/browser/sections/NavbarSection.test.ts:88). |

   The class-specimen and table mutations are covered by verdicts 3 and 6. I read [mutations.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-2/logs/mutations.log.txt:1) through its closing restoration record. Its filters, failures, controls, and restart from the ring mutation match the report. The script restores and checks file digests in [mutate.py:129](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-2/mutate.py:129).

   [gates.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-2/logs/gates.log.txt:1), the corresponding per-gate logs, and [retire-gates.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-2/logs/retire-gates.log.txt:1) support the reported commands, exits, and results. The setup run’s missing-package diagnostic belongs to its deliberate refusal case. [worktree-check.log.txt:5](/home/user/scaffold/.orkestrel/veneer/units/nb-instruments-2/logs/worktree-check.log.txt:5) contains missing shared exports and consequent type errors, consistent with D1. These are retained execution readings, not browser or Vitest runs performed by this audit.

8. **BROKEN — Law and report.** The report contradicts its no-count assertion at [b-collapse-nb-report-2.md:132](/home/user/scaffold/.orkestrel/veneer/units/b-collapse-nb-report-2.md:132). It also retains bare code tokens, such as the class and attribute tokens at [line 45](/home/user/scaffold/.orkestrel/veneer/units/b-collapse-nb-report-2.md:45). D4 and D5 omit an explicit evidence field at [line 283](/home/user/scaffold/.orkestrel/veneer/units/b-collapse-nb-report-2.md:283). The retirement command rows abbreviate commands that the retained gate log supplies in full.

   **Smallest fix:** remove narrative tallies, supply the missing nouns and evidence references, and reproduce the retirement commands from their log. Preserve the measured results and the bounded card and dropdown decisions. The source inspection found no added prohibited assertion, suppression, mock, or nested function; no exported helper was introduced that duplicates the installed packages.

   **REPORT-COUNTS — BROKEN, recorded outside the claims as requested.** The report contains these narrative or quoted tallies:

   | Site in the report | Count wording |
   | --- | --- |
   | 28 | “retirement asset pair” |
   | 72 | “two sentences” |
   | 74 | “retained-variables pair” |
   | 95 | Quoted “once each,” “twice,” and “once” |
   | 99 | Quoted “once each,” “twice,” and “carries the name once” |
   | 101 | Quoted “both modes” |
   | 108 | Quoted “one expanded and one collapsed bar” |
   | 110 | Quoted “both recorded dark rules” |
   | 141 | “both inverted specimens” |
   | 233 | “Three of my runs” |
   | 304 | “both variants” |
   | 322 | Quoted “once each” and “twice” |

   The report also states these measured counts, which have identified runs and are permitted measurements:

   - Lines 33, 52, and 53: absent-rule reading `0`; dark-rule readings `0` and `1`.
   - Lines 34–37: `1 failed | 5 passed (6)`, `6 passed (6)`, `1 failed | 40 passed (41)`, and `1 passed | 40 skipped (41)`.
   - Lines 161–190: `6 failed | 1 passed | 33 skipped (40)`; `1 failed | 39 skipped (40)`; `1 failed | 1 passed | 38 skipped (40)`; `2 failed | 44 skipped (46)`; `2 failed | 38 skipped (40)`; `1 failed | 21 skipped (22)`; `1 failed | 1 passed (2)`; `1 failed | 112 skipped (113)`; `2 passed | 38 skipped (40)`; controls `46 passed (46)`, `2 passed (2)`, and `113 passed (113)`.
   - Lines 205–212: `71 passed (71)`, `2 passed (2)`, `113 passed (113)`, `22 passed (22)`, `19 passed (19)`, `109 passed | 1 skipped (110)`, `78 passed (78)`, and `254 passed (254)`.
   - Lines 224–226: `112 passed (112)`, `102 passed (102)`, and `22 passed (22)`.
   - Lines 272–273: `1 failed | 112 skipped (113)`, `1 passed | 112 skipped (113)`, and `113 passed (113)`.
   - Lines 302–303 repeat the journey and census measurements.

   The “both” wording at lines 45 and 332 names its members in the sentence and is permitted. Versions, widths, durations, exit codes, reference numbers, and three-way resolution are not growable-set tallies.

**Findings outside the claims.**

- **INLINE-CASE-TABLES — BROKEN.** The consumer tuples at [navbar.test.ts:423](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:423), viewport/expected-expansion tuples at [line 274](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:274), and selector/expected-change tuples at [line 607](/home/user/veneer-nb/tests/src/styles/components/navbar.test.ts:607) are static case matrices. Each supplies inputs and expected relationships to repeated assertions. They violate [tests.md:187](/home/user/scaffold/.claude/rules/tests.md:187), which places data tables and case matrices in setup files at any size. **Smallest fix:** move their data into documented, frozen setup exports; keep registration, DOM lookup, and assertions in the proof. Runtime-local collections of constructed elements, such as the active/open link collection, do not establish an exception for these static matrices.
- **REPORT-COUNTS — BROKEN.** The inventory and bounded correction appear under verdict 8, as the brief requires.

**Attacked and held.** Reordered dark-spelling rows correctly remain green in the browser proof because each row is independent; the setup proof rejects the order change. The earlier class markup correctly remains white without the class selector because its ancestor supplies dark emphasis channels. The retirement hashes correctly differ from the original commit because retirement follows the staged changes. These adjacent behaviours do not invalidate the retained mutation results or justify changing the authorized retirement base.

VERDICT: FAIL 1, 5, 8; outside the claims: INLINE-CASE-TABLES, REPORT-COUNTS