## Claim verdicts

**Claim 1 (J1, J3 — exact sentences in `src/core/helpers.ts`) — PASS**
- `src/core/helpers.ts:2838`: `* a summary for is reachable by its key, and a block carrying only block tags is reachable too although it carries no summary.` — matches the fourth round's brief quote for J1 exactly (miss enumeration at `:2839` unchanged).
- `src/core/helpers.ts:2001`: `A column-zero \`export\` declaration carrying any other keyword closes the owner it follows` — matches J3 exactly.

**Claim 2 (J2 — comment above the corpus member control) — PASS**
- `tests/src/core/helpers.test.ts:4150-4156`: the comment reads exactly as quoted in the brief ("This control proves the located region for a real member: ... caught by `Guide`'s bijection matrix and by the `extractBodyLines` case that closes an owner at its brace."), immediately preceding `it('locates the block behind every documented member this package ships', ...)` at `:4157`.

**Claim 3 (J4 — guide row and reader prose) — PASS**
- `guides/guide.md:104`: the `collectKeys` row names both closes ("the owner closes at the first column-zero `}` or at a column-zero `export` declaration carrying another keyword").
- `guides/guide.md:435-436`: the reader prose states the other-keyword close beside the grammar it belongs to ("A column-zero `export` declaration carrying another keyword closes the owner it follows, the same way a column-zero `}` does.").

**Claim 4 (J5, J6 present) — PASS**
- J5: `tests/src/core/helpers.test.ts:3945-3953` — `extractExampleMethods(['\t/** @example */', '\twalk(): void', '}', '\t/** @example */', '\tghost(): void']).map(...)).toEqual(['walk'])` is present inside the `extractBodyLines`/brace-close case at `:3939`.
- J6: `tests/src/core/helpers.test.ts:4092-4105` — `it('locates the last block of a contiguous run, which is the one the reader attaches', ...)` is present with the two-block fixture and the last-opener assertion.

**Claim 5 (H4/H5 — no `above`/`below` pointer; `extractBlocks`/`extractSummary` replace `readBlocks`/`readSummary`) — PASS**
- `grep -rniE "\b(above|below)\b"` over `src/core/`, `guides/guide.md`, `tests/src/core/`, `tests/guides.test.ts`: no matches in any of the four locations.
- `grep "readBlocks|readSummary"` over `src/core/` and `tests/src/core/`: no matches.
- `grep "extractBlocks|extractSummary"` over `tests/src/core/`: matches at `tests/src/core/helpers.test.ts:2972, 2997, 3011, 3066, 3072, 3096, 3137, 3671, 3682, 3691, 3704, 3707, 3715, 3734, 4138, 4172` — the replacement names are in place at every site.

**Claim 6 (scope, citations, no-count, guide rows) — FAIL**
- File list: `d2-fix-3.status.txt` lists exactly `guides/guide.md`, `src/core/constants.ts`, `src/core/helpers.ts`, `src/core/types.ts`, `tests/guides.test.ts`, `tests/src/core/helpers.test.ts` — matches.
- `file:line` citations in `d2-fix-3-report.md` (J1–J6) checked against the tree's current state: all resolve at or adjacent to the cited lines (`helpers.ts:2837-2839`, `:2001`, `test.ts:4150-4157`, `guide.md:104`/`435`, `test.ts:3939-3954`, `:4092-4105`) — matches.
- Corrected citations: `.claude/rules/architecture.md:298` reads "Centralize any pattern repeated twice." (exact match); `src/core/helpers.ts:1093-1107` contains the keyword/name split (`const space = key.indexOf(' ')` … `symbols.push(...)`, `:1093`-`:1107`) — matches.
- `collectKeys` and `extractBodyLines` guide rows exist at `guides/guide.md:103-104` — matches.
- **No count of a growable set in either report's prose — violated.** `d2-fix-2-report.md:54`: "The run that set the floor read 16 such members." states a count of a growable set (`members`, a set `AGENTS.md` § Writing names explicitly). `d2-fix-2-report.md:62`: "the tip's cases for the readers stay green with no case weakened: `test:src:core` went 574 → 587," states a count of `tests`, also a named set. Both are authored prose, not quoted command output. This breaches `AGENTS.md` § Writing: "**NEVER state a count** … tests are such sets. Name the members, or write the sentence without the number."

## Not-met item

- Item 6 (the no-count sub-clause): re-dispatch a unit to rewrite `d2-fix-2-report.md:54` and `:62` to drop the stated counts (name the members/tests instead, or state the change without the number), leaving every other line of that report untouched.

## Referrals

None — every claim was decidable on the cited evidence.

VERDICT: FAIL 6
