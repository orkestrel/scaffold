# U1 round-4 audit report, mechanical checker (native Sonnet, 2026-09-20, 50 s), Veneer `a0447d2..bd4284c`

1. Name list exactly `tests/setupStyles.ts` and `tests/setupStyles.test.ts` — CONFIRMED.
2. Exports and TSDoc — REFUTED in part: the exports match (`PHYSICAL_LONGHANDS`, `EDGE_SHORTHANDS`, `RADIUS_SHORTHAND`, `SIDE_KEYWORDS`, `splitTopLevelValues`, `scanPhysicalDeclaration`, each with a third-person-verb TSDoc), but four unexported module-scope functions remain (`isEdgeSensitive`, `isRadiusSensitive`, `isKeywordSensitive`, `isDirectionSensitive`).
3. No `readPhysicalDeclaration` under `tests/` — CONFIRMED.
4. Every fixture of brief 4 fix 2 appears as an assertion — CONFIRMED (eleven flagged, ten permitted, the splitter fixture).
5. The cascade case asserts an `@layer` at-rule before scanning and names U3's obligation — CONFIRMED.
6. Report prose — REFUTED: `u1-fix-report.md:199` still read "Only the four owned files." (the Orchestrator replaced it, and the digest sentence at line 167, in the retained copy after this report).
7. No forbidden syntax, no nested function in a test callback — CONFIRMED.

Checker: findings — (1) the remaining count phrase at report line 199; (2) the four unexported module-scope helpers in `tests/setupStyles.ts`.
