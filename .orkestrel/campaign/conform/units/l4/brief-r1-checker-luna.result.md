1. CONFIRMED — Dispositions cover every unit and fleet row in `conform-brief-report.md:63-76`; corresponding applied surfaces exist in `src/core/helpers.ts:51-338`, `src/core/validators.ts:51-270`, and `tests/guides.test.ts:329-400`. F1 and F2 no-op conditions are absent from the tree.

2. not held

3. CONFIRMED — Word-boundary call sweep over `src`, `tests`, `guides/brief.md`, `guides/README.md`, and `README.md` found only the retained `brief` method and literal `gap(s)` message, not old builders. Added declarations/imports contain no old names. The recorded sweep names the same paths at `conform-brief-report.md:170-190`.

4. not held

5. REFUTED — `guides/brief.md:438-439` documents `draft.output.format`, `draft.trace`, and `buildGateDefinition().rules.length`, but `tests/guides.test.ts:367-400` contains no assertions for these values; the exact search for those expressions returns no matches. Add assertions for the documented flagship-fence values in the moved test block.

6. not held

7. CONFIRMED — `conform-brief.status:1-22` lists only owned paths. Added-line sweeps over `conform-brief.diff` found no compatibility alias, re-export, or shim.

8. not held

9. CONFIRMED — Added-line sweeps over `conform-brief.diff` found no TODO, deferred code, debug residue, skipped/only/todo test, retry, or inflated timeout. The status paths match the report’s Files touched table.

Findings outside the claims

none

Referrals

none

VERDICT: FAIL 5; outside the claims: none

Journal

leave for driver

Deviation

none