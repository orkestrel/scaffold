## Verdict — ACCORDION (`ac`) audit round 2, objective lane on GPT-6 Astra

Bench unit: `analyst` route, `codex exec --sandbox read-only` rooted at `/home/user/veneer-ac`, launched by `codex-queue-15.sh` after `ac-audit-2-analyst.sh`; journal `tmp/codex/ac-audit-2-analyst.jsonl` (swept at acceptance), thread id `01a0cf8c-1554-7542-b52d-9b55d220dffb`, started 18:34:18 UTC, ended 18:41:35 UTC, exit 0. The lane's returned message follows verbatim.

1. **CONFIRMED — Delta and scope.** The attack was a mismatched base, altered round-1 hunk, changed owned file, or forbidden path. Direct status and diff readings agree with `ac-2-status.txt:1` and `ac-2.diff:1`. The retained owned files match the worktree byte-for-byte; the section implementation and accordion proof also match round 1. Every shared patch base hash matches its `a658879` blob, the file population matches the earlier patch, and the specified unchanged hunks remain identical. The patch’s SHA-256 matches the reported digest. `git apply --check` exits 0. No forbidden path appears.

2. **CONFIRMED — Failing-first evidence.** Browser results below are retained executions, audited against their assertions; this lane ran no browser.

   The empty-partial control records an empty file, a successful rebuild, and `29 failed | 1 passed (30)`, exit 1 (`ac-instruments-2/logs/empty-partial.log.txt:1`, `:663`). The restored digest equals the worktree partial’s digest, and the green control records `30 passed (30)`, exit 0 (`logs/green-control.log.txt:1`, `:107`). The surviving forced-colors case is consistent with `src/styles/elements/_button.scss:46`; removing the component’s forced ring while retaining its outline reset distinguishes that case.

   The `button-padding-literal` mutation distinguishes the C4 padding rows: `tests/src/styles/components/accordion.test.ts:132` overrides each slot to `19px`, which literal padding cannot follow. The density assertion at `:449` independently distinguishes fixed block padding. `logs/button-padding-literal.log.txt:1` records precisely those failures and `3 failed | 27 passed (30)`.

   The round-1 mutations remain distinguishable by these assertions:

   | Mutations | Distinguishing assertions |
   |---|---|
   | `not-collapsed-inverted`, `not-collapsed-after-inverted`, `one-icon-for-both` | State colors, inset shadow, rotation, and different glyphs at `accordion.test.ts:160`, `:211`. |
   | `first-item-dropped`, `first-button-dropped`, `later-top-border-dropped`, `last-item-dropped`, `last-button-dropped`, `last-button-unqualified`, `last-panel-dropped` | Explicit boundary radii and borders, including the opened last panel, at `:234`. |
   | `flush-item-dropped`, `flush-first-dropped`, `flush-last-dropped`, `flush-collapsed-dropped`, `flush-radius-dropped`, `flush-panel-dropped` | Flush border arrays and zero radii at `:277`. |
   | `item-dropped`, `body-dropped`, `chevron-dropped` | Selector membership, geometry, slot overrides, and density readings at `:41`, `:87`, `:116`, `:438`. |
   | `focus-shadow-dropped`, `focus-lift-dropped`, `hover-lift-dropped`, `forced-ring-omitted` | Shadow, stacking, and forced outline readings at `:304`, `:339`. |
   | `button-motion-outside-mixin`, `chevron-motion-outside-mixin` | Declared transition branches and resolved reduced-motion durations at `:60`, `:464`. |
   | `active-bg-literal`, `padding-y-literal` | Local color override and density scaling at `:151`, `:449`. |
   | `header-margin-dropped`, `header-margin-changed` | Selector membership at `:41`, and resolved margin at `:92`, respectively. |
   | `dark-rule-dropped`, `asset-rows-kept`, `retune-left-at-theme-scope` | Dark glyphs and empty theme-scope slots at `:363`. |

   I independently compared the populated mutation-name sets and failing-title arrays in `ac-instruments/mutations-{1,2,3,4}.log.txt` against `ac-instruments-2/logs/mutations-round-1-set.log.txt:1`. Every mutation is present, exits 1, and matches its earlier failing set; `logs/mutations-compare.log.txt:1` agrees.

   The section mutations also match their earlier results (`logs/mutations-section.log.txt:1`). `flush-class-dropped` changes selector coverage and corner readings; `collapsed-dropped-over-hidden-panel`, `show-added-under-collapsed`, and `aria-expanded-disagrees` change the explicit state arrays at `tests/app/browser/sections/AccordionSection.test.ts:101`.

   An in-memory Sass compile of the reconstructed final sources matches `logs/built-selectors.log.txt:1` after selector normalization. Comparison with the inventory finds no omitted selector, condition, or property. The documented forced-colors outline is the additional rule. This reader establishes rule structure, not declaration-value equality.

3. **CONFIRMED — Specimen headers.** The attack was retaining `h3` headers after the rename. The specimen markup and fixture contain only `h2` accordion headers (`ac-shared-2.patch:60`, `:750`). The section assertion checks every selected header’s tag at `AccordionSection.test.ts:70`; the binding assertion checks the fixture headings at `ac-shared-2.patch:663`.

   The retained failures distinguish the mutation: `logs/section-renamed.log.txt:15` reports `H3` versus `H2`, with `1 failed | 3 passed (4)`; `logs/setup-styles-red.log.txt:122` reports `h3` versus `h2`, with `1 failed | 112 skipped (113)`. Their green counterparts report the claimed passing results at `logs/section-green.log.txt:11` and `logs/setup-styles-green.log.txt:119`. The level’s reason appears at `ac-shared-2.patch:47`.

4. **CONFIRMED — Plain-variant rename.** The attack was a stale subject or scenario in a consumer. Reconstruction and search found no old accordion name in the patched sources or owned files. The registry and journey use the renamed subjects and scenarios at `ac-shared-2.patch:362`, `:387`, `:470`, `:480`, and `:498`; the section lists agree at `AccordionSection.test.ts:31`, `:101`, and `:141`.

   The stale-specimen mutation is distinguished: `logs/section-red.log.txt:17` records the name mismatch, and `:39` records the failed specimen lookup; the run reports `3 failed | 1 passed (4)`. The journey and portfolio cases pass in `logs/final-journey-light-1280.log.txt:105`, `:109`, and `:117`. This confirms the retained journey observation, not a capture portfolio.

5. **CONFIRMED — Guide token nouns.** The attack was a remaining bare token in the specified section, retained-variable paragraphs, or proof-path rows. The repaired forms appear at `ac-shared-2.patch:133`, `:149`, `:158`, `:190`, and `:198`; the proof-path rows also carry their noun. Comparison with round 1 confines the compatibility-row reformatting to the unit’s rows. The explicitly prescribed numeric stacking values remain values, not missing API nouns.

6. **CONFIRMED — Comments and doc blocks.** The attack was a missed occurrence outside the originally reported lines. The partial’s length noun is present at `src/styles/components/_accordion.scss:8`; specimen class and attribute nouns appear at `ac-shared-2.patch:42`; selector, constant, field, and absence-value nouns appear at `:704`, `:757`, `:767`, and `:841`. The state comment is repaired at `AccordionSection.test.ts:93`, and the binding comment names the ordinary and flush groups at `ac-shared-2.patch:650`. The added-comment sweep found no prohibited tally. The spatial “above” in the journey comment and the construction keyword in the example are permitted uses.

7. **CONFIRMED — Gates.** The attack was a missing final run, mismatched test result, or pipeline status substituted for the gate’s status. `ac-instruments-2/gates-final.sh:10` captures each command’s exit immediately. `logs/final-chain.log.txt:2` records the claimed successful validation gates.

   The individual logs agree: accordion at `final-accordion.log.txt:78`; section at `final-section.log.txt:7`; setup at `final-test-setup.log.txt:33`; conformance, guides, policy, and application at their respective `final-test-*.log.txt:11`. The guide result is present despite ANSI formatting preventing the chain’s summary search from displaying it.

   The retained empty-partial, padding, name, and header controls distinguish broken subjects from these passing runs. The worktree diagnostics in `logs/wt-check.log.txt:5` agree with D1, including the consequential type errors. The accepted copy-equivalence ruling stands; this lane did not reconstruct a browser validation environment.

8. **BROKEN — Report writing compliance.** The report still violates the mandatory token-noun rule in `/home/user/scaffold/.claude/rules/writing.md:48`. Concrete counterexamples in `b-collapse-ac-report-2.md` include “The instrument is `empty-partial.sh`” at `:44`, “`mutate.py` writes” at `:45`, “the output of `built-selectors.mjs`” at `:52`, and “`gates-final.sh` ran” at `:253`. These are current explanatory prose, not historical quotations or command-table data.

   The smallest fix is to supply the noun at each report occurrence: “the `empty-partial.sh` script,” “the `mutate.py` script,” and equivalent forms, then sweep the report’s remaining prose. This finding does not reopen the repaired guide or source comments.

   The other substantive parts hold: the added TypeScript contains no prohibited assertion or `any` type, no prohibited function assignment, and no added exported helper duplicating an installed primitive. The D1 explanation matches the diagnostics (`report:311`), and the closing limitations name the missing frames, header margin, last-panel radius, uncaptured states, and inherited line height (`report:336`).

   The requested count record is:

   - Run measurements: `29 failed | 1 passed (30)`; `30 passed (30)`; `3 failed | 27 passed (30)`; `3 failed | 1 passed (4)`; `1 failed | 3 passed (4)`; `1 failed | 112 skipped (113)`; `4 passed (4)`; `1 passed | 112 skipped (113)`; and the final gate measurements `254`, `22`, `19`, `109 passed | 1 skipped (110)`, `80`, and `41` (`report:37`, `:43`, `:47`, `:164`, `:170`, `:175`, `:178`, `:262`). These are attributed run results.
   - Cardinality wording: “one unified diff” (`:13`), “one line per accordion rule” (`:53`), the page’s “one `h1` element” (`:65`), and “one at a time” (`:187`). These describe the required artifact form, output mapping, accepted heading rationale, and serial execution.
   - Historical quotations: “twice each,” “once,” “once each,” “both groups,” “both names,” “both transitions,” “both subjects,” and “one timing failure” (`:133`, `:137`, `:145`, `:150`). These identify the earlier wording rather than reasserting its tally.
   - The retained case titles include “one item, button, and chevron paint” and “both” named transitions (`:207`, `:209`). No separate growable-set count finding is substantiated.

Findings outside the claims: none.

Attacked and held: the empty-partial control legitimately leaves the inherited forced-colors outline green; dropping the header rule legitimately changes selector coverage without changing resolved margin. Missing capture frames remain the expressly assigned landing observation.

VERDICT: FAIL 8; outside the claims: none