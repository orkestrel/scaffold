# Closure brief — queue: the checker over the fix round (carrying the closing items)

## Lane

`checker` (Sonnet), blind and clean, over queue's fix round. Evidence under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`: `d7n-queue-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `d7n-queue-audit-verdict.md` (items Q1 to Q7); `d7n-queue-close-brief.md`; Rulings 6, 7, 13, 20, 21, and 24 in `rulings.md`; the pilot `/home/user/fleet/abort/tests/guides.test.ts`; `/home/user/fleet/queue` at its tip.

## Claims

1. Every item the fix brief names landed in the diff as the brief states it, and nothing else changed (scope honesty against the status file: `README.md`, `guides/queue.md`, `src/core/factories.ts`, `src/core/types.ts`, `tests/guides.test.ts` and no other path).
2. The report's citations match the tree the unit left; the report states no count in prose.
3. Each named correction is present as the audit's finding asked: the Guards table heads `Shape` with the type each guard narrows to under "In a guard table a `Shape` cell holds the type the guard narrows to." (Q1, Ruling 20); `QueueErrorContext` carries a `@remarks` naming `option` and `operation` with its description unchanged (Q2, Ruling 7); the Surface's closing sentence names the `readonly` data members once and the `## Methods` lead drops its restatement (Q3); the README's onboarding paragraph no longer echoes the tagline's "hands back" clause and the pitch blockquote still equals the guide's tagline (Q4, Ruling 6); the drop-in's lines 1 to 3 equal the pilot's and the region from `const root = ` through the manifest loop's closing brace equals the pilot's with the package's own block and cases appended (Q5, Rulings 13 and 21); a lead-in sentence sits between every heading or table and its fence in the guide, with the titled fence's body unchanged (Q6, Ruling 21); `BROAD` is lowered in `src/core/factories.ts` (Q7).

## Output

Per claim PASS, FAIL, or CANNOT RULE with evidence; findings outside the claims; one terminal `VERDICT: PASS` or `VERDICT: FAIL <claims>`; open with `Lane held: checker queue`. No process diary. Perform the assignment directly and spawn nothing; run no command, edit nothing.
