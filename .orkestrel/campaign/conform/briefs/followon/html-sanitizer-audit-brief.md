# Audit brief — unit html-sanitizer (follow-on), round 1

Read-only: never create, edit, or delete a file, and never run a command that changes the tree. Perform the audit directly and spawn nothing. Attempt to refute each numbered claim with the smallest evidence that would break it; re-run every sweep you rely on rather than reading it from the report; quote `file:line`. CONFIRMED with the evidence that convinced you, or REFUTED with the failing input and the smallest correct fix.

Subject: the uncommitted unit in `/home/user/fleet/html` — the brief `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/html-sanitizer-brief.md`, the writer's report `/home/user/fleet/html/tmp/units/html-sanitizer-report.md`, the evidence `/home/user/work/evidence/html-sanitizer.diff` (`git diff HEAD`) and `/home/user/work/evidence/html-sanitizer.status`, and the captures under `/home/user/work/evidence/html-sanitizer-proofs/`. Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/documentation.md` § Parity; `/home/user/scaffold/.claude/rules/tests.md` § Cross-cutting proofs and § Test contract; `/home/user/scaffold/.claude/rules/writing.md`. Exclude `node_modules/**`, `dist/**`, and `tmp/**` from every sweep; every `guides/*.md` other than `guides/html.md` and `guides/README.md` is a vendored mirror outside the unit.

## Claims

1. The fence under `### Sanitize, and watch the floor hold` in `guides/html.md` carries one added line per claim — the `img` keeping `alt` and losing `src`, the entity-obfuscated `java&#115;cript:` href refused, and table-cell `align` kept trimmed lowercase on `td` and lost on `p` under `{ attributes: ['align'] }` — each with the value the code returns in its trailing comment, in the fence's own form; nothing else in the file changed.
2. Each added fence line's value is what `sanitize` returns: the transcription in `tests/guides.test.ts` asserts each value in the fence's order with `renderHTML`, and the assertions execute (they are not presence checks). Re-derive at least one value from `src/core/constants.ts` (`SAFE_ATTRIBUTES`, `TABLE_ALIGNMENTS`, `TABLE_CELL_ELEMENTS`, `SAFE_ELEMENTS`) and the sanitizer's code rather than from the report.
3. The presence guard for that fence, where the block keeps one per fence, covers the added lines' inputs and documented values.
4. `red.txt` reads the transcription case failing on one planted value (`1 failed`, `31 passed`) and `green.txt` reads the same command passing (`32 passed`); the command is the `guides` project over `tests/guides.test.ts`.
5. The prose claims at `guides/html.md` § The sanitize floor (the `src` sentence, the decoded-before-judged bullet, the table-cell alignment bullet) match the fence's values.
6. The diff touches only `guides/html.md` and `tests/guides.test.ts`; no added line carries `.skip(`, `.only(`, `.todo(`, a retry, a timeout, `any`, `as`, or a non-null `!`. The gate reading is NOT-EVIDENCED for a read-only lane and settles at landing.
7. Nothing hidden: no TODO or deferred row; the report's Vectors table matches the diff.

## Output

`## Per-claim verdicts`, `## Findings outside the claims` (O-numbered), `## Referrals to the Orchestrator` (R-numbered), and one terminal line: `PASS` or `FAIL <claim numbers>`. Write plainly: no count of a growable set in prose, no `above` or `below` as a pointer.
