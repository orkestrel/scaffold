## Verdict — PROOF-RESOLVER (`pr`) audit, objective lane on GPT-6 Astra

Bench unit: `analyst` route, `codex exec --sandbox read-only` rooted at `/home/user/veneer-pr`, launched by `codex-queue-16.sh` after `pr-audit-analyst.sh`; journal `tmp/codex/pr-audit-analyst.jsonl` (swept at acceptance), thread id 01a0cf92-e6d7-7e51-8633-9d82e03ca817, started 18:41:45 UTC, ended 18:48:01 UTC, exit 0. The lane's returned message follows verbatim.

1. **CONFIRMED — Delta and scope.** [pr-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/pr-status.txt:1) and [pr.diff:1](/home/user/scaffold/.orkestrel/veneer/units/pr.diff:1) match the live status and diff over `518faf0`. Only `guides/veneer.md`, `tests/setupServer.test.ts`, and `tests/setupServer.ts` changed. The vendored files and conformance test are absent. The comparison rejected an appended unrelated-change control.

2. **CONFIRMED — The predicate.** [tests/setupServer.ts:2815](/home/user/veneer-pr/tests/setupServer.ts:2815) documents and exports the required signature and exact pattern. Executed attacks rejected spaces, backticks, absolute paths, and `tests/setup.ts`; `tests/../tests/setupServer.test.ts` was accepted, as the specified pattern permits. [tests/setupServer.test.ts:533](/home/user/veneer-pr/tests/setupServer.test.ts:533) places the export between `isDeparture` and `matchSelectorKey`. Comparing parsed runtime exports against the asserted list passed; removing the export failed that comparison.

3. **CONFIRMED — The resolver branch.** [tests/setupServer.ts:2853](/home/user/veneer-pr/tests/setupServer.ts:2853) preserves the undefined-proof return, then checks the file form before the recording lookup. The category refusal, workspace-root resolution, existence check, and findings match the claim. The file-form documentation appears at [tests/setupServer.ts:2832](/home/user/veneer-pr/tests/setupServer.ts:2832).

   Read-only Node execution of the type-stripped source functions accepted the existing plugin proof and refused the missing proof, including with the process directory changed to `/`. A plugin row carrying `button.click.toggle` still reached the recording path and returned the base’s `obligation has no oracle predicate` finding.

   Removing the inserted branch made the extracted resolver identical to the base. The unchanged lookup appears in [pr.diff:139](/home/user/scaffold/.orkestrel/veneer/units/pr.diff:139). Every existing compatibility row returned the same result as the base against the saved Button recording. The unfiltered conformance loop remains at [tests/conformance.test.ts:187](/home/user/veneer-pr/tests/conformance.test.ts:187). This execution proves the saved-recording comparison, not a live browser run.

4. **CONFIRMED — The proof.** The named cases and exact assertions appear at [tests/setupServer.test.ts:980](/home/user/veneer-pr/tests/setupServer.test.ts:980). Executed assertion equivalents passed against the source functions and distinguished these in-memory mutations:

   - Existing-file case: removing the file branch returned `missing recording step`, failing the undefined assertion.
   - Missing-file case: removing the branch returned the wrong finding; dropping the existence check returned undefined. The exact-message assertion rejected each mutation.
   - Non-plugin case: inverting the category guard accepted the existing file, failing the plugin-only refusal assertion. Removing the branch also failed it.
   - Predicate case: loosening the suffix to accept `tests/setup.ts` failed its false assertion.

   Inverting the category guard also failed the existing-plugin case. These checks establish assertion discrimination; they do not constitute a Vitest run.

5. **CONFIRMED — The guide.** [guides/veneer.md:4828](/home/user/veneer-pr/guides/veneer.md:4828) adds the requested sentence immediately after the specified anchor. Comparing against the base after whitespace normalization found exactly that insertion. Every table line remained byte-identical. An extra-sentence control failed the comparison.

6. **BROKEN — The report and the law.** [proof-resolver-report.md:28](/home/user/scaffold/.orkestrel/veneer/units/proof-resolver-report.md:28) records the requested command and result lines; its gate and deviation sections record the scoped formatter invocation and the standing build-dependent failures. The source additions contain none of the prohibited assertions, suppressions, mocks, or nested functions.

   The report incorrectly attributes the remaining red-run failures to the environment at [proof-resolver-report.md:41](/home/user/scaffold/.orkestrel/veneer/units/proof-resolver-report.md:41). With the unchanged base module and the changed test file, the export-surface assertion also fails because `isProofFile` is absent. A parsed-export comparison reproduced that mismatch independently of `dist/`. Correct the attribution to name the export-surface failure; the standing built-entry failure remains separate.

   The prose also contains temporal “new” at [proof-resolver-report.md:39](/home/user/scaffold/.orkestrel/veneer/units/proof-resolver-report.md:39), contrary to the writing rule. The case-insensitive substitution-term sweep covered the entire report and added diff lines. Its `new Error` matches are permitted code syntax. Remove the temporal qualifier and replace narrative totals with the case or file names.

   The report’s counts and their rulings are:

   | Report location | Count stated | Ruling |
   |---|---|---|
   | Lines 35–36 | `1 failed (1)`; `6 failed \| 95 passed (101)` | Permitted command-linked result measurements; historical execution not independently rerun. |
   | Line 39 | “four failures”; “two … mismatches” | Prohibited narrative tallies; name the cases. |
   | Lines 41–42 | “remaining two failures”; “one other … case” | Prohibited narrative tallies and incorrect attribution. |
   | Lines 48–49 | `1 failed (1)`; `1 failed \| 100 passed (101)` | Permitted command-linked result measurements. |
   | Line 52 | “single remaining failure” | Prohibited narrative tally; name the built-entry case. |
   | Line 57 | “two touched files” | Prohibited file tally. |
   | Line 65 | `1 failed (1) / 1 failed \| 100 passed (101)` | Permitted command-linked result measurements. |
   | Line 65 | “one failure” | Prohibited narrative tally. |
   | Line 72 | `1 failed \| 21 passed (22)` | Permitted command-linked result measurements. |
   | Line 72 | “sole failure” | Prohibited narrative tally. |
   | Line 77 | `19 passed (19)` | Permitted command-linked result measurement. |
   | Line 78 | `109 passed \| 1 skipped (110)` | Permitted command-linked result measurements. |
   | Lines 82, 84, 88 | “two files”; “two owned files”; “two files” | Prohibited file tallies. |
   | Line 90 | “Both failures” | Prohibited tally; name the cases. |

   The line reference at line 13 and exit codes are values, not growable-set counts. List markers enumerate the report. References to “criterion 2” and “criterion 3” at lines 70, 89, and 101 violate the separate prohibition on naming list items by position.

Outside the claims: none.

VERDICT: FAIL 6; outside the claims: none