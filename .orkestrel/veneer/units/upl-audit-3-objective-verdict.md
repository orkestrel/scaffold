## Verdict — UTIL-PLACEMENT (`upl`) audit round 3, objective lane on GPT-6 Astra

Bench unit: `analyst` route, `codex exec --sandbox read-only` rooted at `/home/user/veneer-upl`, launched by `codex-queue-18.sh` after `upl-audit-3-analyst.sh`; journal `tmp/codex/upl-audit-3-analyst.jsonl` (swept at acceptance), thread id `01a0cfa6-a975-7801-9ccb-c96ba6d3cc72`, started 19:03:20 UTC, ended 19:10:06 UTC, exit 0. The lane's returned message follows verbatim.

1. **BROKEN — the retained round delta uses the wrong shell baseline.** `upl-instruments-3/round-delta.diff:110` includes the complete `.viewport` and `.scroller` additions already present in `upl-2.diff:9`. It therefore does not represent round 2 against round 3 for that file. Regenerate that hunk against round 2; the actual shell change is confined to its comment.

   The scope attack otherwise failed: reconstructing the captured diffs matched the owned worktree files, the shared patches have identical file memberships, and their index prefixes match the base blobs. The unlisted patches have the stated identical SHA-256. Independently running each patch’s `git apply --check` returned exit 0. No prohibited path appears.

2. **UNRESOLVED — the prescribed markup and mutation result exist, but the cap-reading rerun lacks retained output.** `upl-shared-3.patch:117` supplies the remark, and its `Maximum sizes` markup supplies the `w-50` class. The mutation is defined in `upl-instruments-3/tools/mutations-round3.sh:12` and executed through the generic mutation runner.

   The assertions distinguish the removed class through selector presence, not through cap geometry. `tests/app/browser/sections/SizingSection.test.ts:43` requires the class; line 121 throws before the width comparison at line 144. The retained `logs/mutations/max-width-cap-dropped.log.txt:193` reports `Error: No width cap`; the control log reports green at line 22. This mutation would also fail before the narrower containing block was introduced, so it does not certify that repair.

   The readings at `b-utilities-upl-report-3.md:40` appear only in the writer’s report. No retained cap-reading output exists in either supplied round-3 instrument directory. Retain the rerun output to settle that clause. To certify the geometric distinction, retain a mutation run that reaches the width assertion with the specimen still selectable.

3. **UNRESOLVED — the added binding assertions hold, but the earlier controls’ round-3 reruns are missing.** `upl-shared-3.patch:1469` derives the offset membership independently; line 1477 derives the viewport membership. Reading the inventory produces the expected edge and viewport sets. Sorted array equality rejects omissions and duplicates. The positive offset and overflow assertions follow at lines 1484–1485, and the earlier assertions remain.

   The retained controls distinguish their mutations:
   - `logs/mutations/edges-emptied.log.txt:30`: empty edges differ from `bottom`, `end`, `start`, and `top`.
   - `logs/mutations/viewport-cases-emptied.log.txt:30`: empty viewport cases differ from the inventory-derived membership.
   - `logs/mutations/scroller-offset-zero.log.txt:30`: zero fails the positive-offset assertion.
   - `logs/mutations/control-setup-styles-3.log.txt:21`: the unmutated setup run passes.

   I also read the round-2 mutation logs. The share mutation fails the percentage comparison; the level mutation fails the inventory comparison; the narrowed infix mutation fails the compiled-ramp comparison; the clip mutation fails the recorded hidden-box comparison; and the width mutation fails the journey-width comparison. Their distinguishing failures remain in `upl-instruments-2/logs/mutations/setup-{share-wrong,level-wrong,infix-narrowed,clip-wrong,width-wrong}.log.txt:26`. The broader infix mutation also affects the table case, as previously ruled. The focus mutation fails the active-element assertion in `start-unfocused.log.txt:96`.

   These are earlier runs. Round 3 retains their scripts but no corresponding rerun logs; its `logs/setup/` directory is empty. Retain the required reruns before confirming the whole claim.

4. **BROKEN — the translation fixture is absent from the freeze assertion.** `upl-shared-3.patch:1613` exports the specified string, and line 1406 adds its export-list entry. However, the complete freeze list at line 1553 omits it, and the reconstructed test contains no import or assertion using it. This contradicts `b-utilities-upl-report-3.md:88`.

   The extraction itself holds: the translation cases consume the constant, and the sizing case composes the placement container. The string is intrinsically immutable. Add the requested import and freeze assertion; no change to the string’s declaration is needed.

5. **CONFIRMED.** The stale-name, stale-wording, and misplaced-table attacks failed. Reconstruction found no remaining `SIZE_STEP_CASES` identifier or `class stem` phrase in the resulting owned and shared files. `upl-instruments-3/round-delta-shared.diff:1` contains the specified wording, ordering, and documentation changes. `app/browser/styles/_shell.scss:46` explains the definite-height requirement and names the specimens.

   The reconstructed guide places the position table between offset and reboot, matching the base’s sorted component run. The later heading cluster is pre-existing and remains outside this unit’s carrier, as recorded in `b-utilities-upl-report-3.md:245`.

6. **CONFIRMED.** The missing-header and incorrect-restoration-digest attacks failed. Every retained mutation log names its execution copy and records matching before/restore digests with `equal=True`. Independently hashing the reconstructed final setup and constants files reproduced those digests: see `logs/mutations/edges-emptied.log.txt:11` and `logs/mutations/max-width-cap-dropped.log.txt:11`.

   `tools/mutate.py:23` reads the original content, line 39 restores it, and line 42 hashes the restored content. The unmutated controls correctly state `no file mutated`; they make no file-restoration claim. This confirms the retained headers, not the absent reruns identified under claim 3.

7. **CONFIRMED.** The gate-result mismatch attack failed. `upl-instruments-3/fresh-run-2.log.txt:7` records the reported successful exits, and its apply-check entries appear at lines 3 and 23. The individual logs agree: format at `logs/fresh-format.log.txt:7`; build at `logs/fresh-build.log.txt:56`; styles at `logs/fresh-styles.log.txt:354`; setup tables at `logs/fresh-setup-styles.log.txt:7`; sections at `logs/fresh-sections.log.txt:148`; conformance, guides, and policy at their respective logs’ line 11; service at line 24; setup at line 32; and setup-browser at line 82. The lint and check logs contain no diagnostics.

   The setup log’s expected missing-package error belongs to a passing refusal test. The earlier failed run does not invalidate the corrected run. These results establish gate execution; they do not replace the distinguishing mutation evidence.

8. **BROKEN — the report violates the writing contract and overstates its evidence.** The report contains banned temporal wording at `b-utilities-upl-report-3.md:42` (“now”), line 43 (“new”), and line 259 (“once”). It uses bare or possessive code tokens, including the constant at line 88 and the possessive constant at line 108. Its gate commands at lines 194–196 contain ellipses instead of executable commands.

   The failing-first account is not supported by the retained history. The report describes the first fresh run failing `check`, but `upl-instruments-3/fresh-run.log.txt:7` records a format failure and line 9 records a passing check. That log also records failed patch reversal at line 23. No retained round-3 log contains the reported `TS2724` or `TS7031` diagnostics. The self-correction’s content effect remains consistent with the final reconstructed files, but its reported history needs the missing evidence or corrected wording.

   The shared round delta does reconstruct the final shared patch correctly. The report’s freeze-list statement is false for the reason under claim 4. Replace abbreviated commands with those in `tools/fresh.sh:28`, correct the evidence account, and revise the prose.

   **REPORT-COUNTS — finding outside the claims, recorded here as requested.** The report states “one self-correction” at line 7; “three owned files” at lines 13 and 178; “both cases” at line 81; “both places” at line 120; quoted “One table” and “a single global sort key” at lines 133–134; “both patches” at line 205; “two apply-check results” at line 209; “both” named patches at line 254; and “one viewport” with “two variant widths” at lines 255–256. Line 46 also names the before and after readings with “both.” The unnamed growable-set tallies, particularly the owned files and apply-check results, violate the count prohibition. Name their members instead. The before/after readings and explicitly named shared/unlisted patches fall within the rule’s named-members exception.

   The report also states these test-result counts: `3 failed | 10 passed (13)` at line 36; `13 passed (13)` at line 38; `4 passed (4)` at line 47; `110 passed (110)` at line 62; `1 failed | 109 passed (110)` at lines 64, 66, and 68; and the gate results `42`, `110`, `18`, `22`, `18`, `19`, `109 passed | 1 skipped (110)`, `251`, and `66` at lines 194–202. The retained logs support these run measurements except the cap-reading result at line 47. Round identifiers, viewport dimensions, fixture values, exit codes, and digests are not growable-set tallies.

Attacked and held: the actual owned-file scope, shared-patch reconstruction, fixture extraction, requested naming changes, restored-file digests, and corrected gate results hold. The failures concern the delta artifact, omitted assertion, report, and missing or insufficient proof evidence.

VERDICT: FAIL 1, 2, 3, 4, 8; outside the claims: REPORT-COUNTS