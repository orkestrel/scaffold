1. CONFIRMED — Tree evidence matches every row’s target state: renamed builders at `src/core/helpers.ts:51-338`, undefined derivation at `src/core/helpers.ts:1266-1327`, moved fence tests at `tests/guides.test.ts:337-405`, corrected guide/docs at `guides/brief.md:144,352,463`, aligned signatures at `src/core/BriefCompiler.ts:192` and `src/core/BriefManager.ts:84`, and validator TSDoc at `src/core/validators.ts:51-269`. Fleet-F1 and F2 are absent/no-op by their path and class sweeps.

2. not held

3. CONFIRMED — The declaration sweep for old builder names across `src`, `tests`, `guides/brief.md`, `guides/README.md`, and `README.md` is empty. The call sweep `\b(task|reference|manifest|outcome|given|example|citation|gap|risk|output|proof|brief|gateDefinition)\s*\(` finds only the unrelated `BriefManager.brief` lookup and its calls. The case-insensitive `gatedefinition(s|ed|ing)` sweep is empty.

4. not held

5. REFUTED — `guides/brief.md:380-439` executes builders including `buildGiven`, `buildExample`, `buildCitation`, `buildGap`, and `buildRisk`. The transcription at `tests/guides.test.ts:367-405` neither executes nor asserts those values. The `AGENTS §` sweep is clean, but the flagship-fence parity requirement is incomplete.

6. not held

7. REFUTED — `/home/user/work/evidence/conform-brief.status:13` lists modified `tests/policy.test.ts`, which `/home/user/scaffold/tmp/units/conform/conform-brief-brief.md:31-39` marks off-limits. The no-shim sweep is clean, but the scope requirement fails.

8. not held

9. REFUTED — The report’s `Files touched` section at `conform-brief-report.md:284-305` omits `tests/policy.test.ts`, while the status lists it. The added-line residue sweep over `conform-brief.diff` is clean for TODO/FIXME/HACK/debugger/console/deferred markers, but the disposition/report does not match the tree evidence.

Findings outside the claims

none

Referrals

none

VERDICT: FAIL 5, 7, 9

Journal

left for the driver.

Deviation

`tests/policy.test.ts` is modified despite being off-limits. No tree file was unreadable.