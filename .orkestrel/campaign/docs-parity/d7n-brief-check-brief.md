# Closure brief — brief: the checker over the fix round and the Shapers successor

## Lane

`checker` (Sonnet), blind and clean, over brief's fix round and its successor `d7n-brief-close-2`. Evidence under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`: `d7n-brief-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `d7n-brief-close-2-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `d7n-brief-audit-verdict.md` (items BR1 to BR11); `d7n-brief-close-brief.md`; Rulings 6, 7, 13, 14, 18, 19, 20, 21, 24, and 25 in `rulings.md`; the pilot `/home/user/fleet/abort/tests/guides.test.ts` and `/home/user/fleet/abort/README.md`; `/home/user/fleet/brief` at its tip.

## Standing condition

The Orchestrator removed the three README lead-in sentences the fix unit added (under `## Install`, `## Usage`, and `## Development`) before landing, per Ruling 24, so the retained fix diff carries the README's new sections without lead-ins while the report's § 9 describes adding them. Rule the diff.

## Claims

1. Every item the fix brief names landed in the fix diff as the brief states it, and nothing else changed (scope honesty against the fix status file: `README.md`, `guides/brief.md`, `src/core/constants.ts`, `src/core/errors.ts`, `src/core/types.ts`, `tests/guides.test.ts` and no other path); the successor's diff touches `guides/brief.md` only.
2. Each report's citations match the tree the unit left, except the README lead-ins the standing condition names; neither report states a count in prose.
3. Each named correction is present as the audit's finding asked: the `## Surface` lead-in sits under `### Compile and project a brief` before its fence (BR1); the drop-in's lines 1 to 3 equal the pilot's (BR2); the pilot's block is contiguous, the package's file-scope case sits after it, and the region from `const root = ` through the manifest loop's closing brace equals the pilot's with the package's own block and cases appended (BR3, Ruling 20); `DERIVED`, `MISSED`, `UNCHANGED` are lowered in the fence comments (BR4); the duplicate `stopped.brief` reading is replaced by `stopped.questions.length // 1` and an executed case asserts it (BR5); `BriefError`'s `@remarks` names `code` and `context` (BR6); `SINGLE_LINE_PATTERN`'s description names a `stringShape` `pattern` and the cell equals it (BR7); the `### Constants` table heads `Shape` with declared or widened types under the constants sentence (BR8, Rulings 18 and 21); the README carries `## Install`, `## Requirements`, `## Usage`, and `## Guide` with its fences directly under their headings (BR9, Rulings 6 and 24); both event map aliases carry a `@remarks` naming each event's payload and their cells are unchanged (BR10, Ruling 19); `### Storing briefs by their own identity` has a lead-in sentence and an executed case asserts its claim (BR11, Ruling 21).
4. After the successor, the `### Shapers` table heads `Shape` under the constants sentence, `textShape` and `lineShape` hold `StringShape`, and every `objectShape` row holds `ObjectShape<{ members }>` in bare-member form with the members in `src/core/shapers.ts` declaration order (Ruling 25); no `Summary` cell moved.

## Output

Per claim PASS, FAIL, or CANNOT RULE with evidence; findings outside the claims; one terminal `VERDICT: PASS` or `VERDICT: FAIL <claims>`; open with `Lane held: checker brief`. No process diary. Perform the assignment directly and spawn nothing; run no command, edit nothing.
