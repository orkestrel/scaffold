Lane held: checker interpret

**Claim 1 — PASS.** The fix diff (`.orkestrel/campaign/docs-parity/d7n-interpret-converge-fix.diff.txt`) touches exactly `guides/interpret.md`, `tests/guides.test.ts`, and files under `src/core/**` (17 files, matching `d7n-interpret-converge-fix.status.txt` line for line). Every hunk sits inside a `/** */` or `//` comment, a markdown table cell, or the file-header comment; no non-comment `src` line changed (the report's own `git diff -U0 -- src` filtered-to-non-comment check reads empty, and direct inspection of the diff confirms it). The successor's diff (`d7n-interpret-close-2.diff.txt`) touches only `guides/interpret.md` and doc-block `@example` import lines/comment text under `src/core/**`; no code token moved there either.

**Claim 2 — FAIL.** `d7n-interpret-close-2-report.md:50-51` reads "the brief named these three cells only" and line 54 reads "carried the three cells into `guides/interpret.md`" — both state a count of a set ("cells") in authored prose, which `AGENTS.md` § Writing and this claim's own text ("neither report states a count in prose") ban. The fix report and close-3 report carry no such violation (their number-bearing lines are exit codes, durations, diffstats, or quoted command output, all permitted).

**Claim 3 — PASS**, per-item evidence:
- IN1: `guides/interpret.md:219` reads "The posture splits by who produces the value."; `InterpretContext.ts` and the guide's `InterpretContextInterface` prose both read "the subject registry, the definition registry" with `without` lowered (confirmed in `d7n-interpret-converge-fix.diff.txt`).
- IN2: closing grep `\b[A-Z]{3,}\b` over `src guides/interpret.md README.md` (re-run against the current tree) returns only `DESTROYED`, `UNKNOWN`, `JSON`, `LLM`, `ASCII`, `FNV` — the exact ruled-permitted set the report's table names.
- IN3: `guides/interpret.md:20-27` shows `## Surface` bare, then `### Interpret text against an added template`, then the colon lead-in, then the fence — matching Ruling 21's converged shape.
- IN4: `tests/guides.test.ts:1-3` in `/home/user/fleet/interpret` is byte-identical to the pilot's `/home/user/fleet/abort/tests/guides.test.ts:1-3` (verified directly).
- IN5: `guides/interpret.md:769,810,855,882` each name their own registry ("record", "template", "subject", "definition").
- IN6: `src/core/Interpret.ts:49-54` `@remarks` no longer restates the pipeline; only the non-`Promise` and phase-record clause remains.
- IN7: `types.ts` options descriptions and the `## Methods` intro use "and" throughout (per the diff).
- IN8: `grep -c "from '@src/core'" src/core/factories.ts` — confirmed zero matches remain in that file after the fix round.
- IN9: `guides/interpret.md:231-234` each exact-guard row reads "an exact `X` input record", matching the intro sentence at line 225.

**Claim 4 — PASS.** `grep -rn "from '@src/core'" src` (current tree) returns no matches. The three named cells (`ProvenanceCategory`, `InterpretErrorCode`, `RecordEventMap`) read "or"/"and" in place of `/` in both `src/core/types.ts` and `guides/interpret.md`, verified equal in `d7n-interpret-close-2.diff.txt`.

**Claim 5 — PASS.** `guides/interpret.md:227` carries only "In a guard table a `Shape` cell holds the type the guard narrows to." with the interface-sentence in front of it removed (confirmed by direct read and by `close-3`'s diff). `guides/interpret.md:125-130` show `NormalizerInterface`, `ExtractorInterface`, `ClarifierInterface`, `FormatterInterface`, `GeneratorInterface`, `NarratorInterface` all reading `{} plus <members>`. The close-3 diff shows only the `Shape` column and the intro sentence changed; every `Summary` cell's text is untouched (only column-width reflow).

No findings outside the claims.

**Referrals:** none — every question resolved on mechanical evidence.

VERDICT: FAIL 2
