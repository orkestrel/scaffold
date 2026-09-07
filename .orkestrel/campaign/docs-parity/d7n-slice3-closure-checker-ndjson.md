Lane held: checker ndjson

## Claim 1 — Every item the fix brief names landed in the diff as the brief states it, and nothing else changed (scope honesty against the status file)

PASS.

- `d7n-ndjson-converge-fix.status.txt` lists exactly `guides/ndjson.md`, `src/core/NDJSONParser.ts`, `src/core/factories.ts`, `tests/guides.test.ts`, `tests/setup.ts` — all within the fix brief's owned set (`guides/ndjson.md`, `README.md`, `src/core/**`, the `chunkings` block of `tests/setup.ts`, `tests/guides.test.ts`).
- Every item in the fix brief (drop-in, `## Tests`/`## See also`, the `#### Create a parser` heading, the restored demonstration, the buffer caveat, `chunkings` wording, and the `{@link}` cross-references) is present in `d7n-ndjson-converge-fix.diff.txt` and confirmed against the live files at `/home/user/fleet/ndjson` (tip `7ce1e46`): `guides/ndjson.md:63,92-93,105-115`, `src/core/factories.ts:6,11`, `src/core/NDJSONParser.ts:6`, `tests/guides.test.ts:42,108-115,215-221,312-322`.
- `README.md` is owned but unchanged, matching the report's own statement that no item reached it.

## Claim 2 — The report's citations match the tree the unit left; the report states no count in prose; the pin is described only in the words the file carries

PASS.

- Every diff hunk, grep output, and line reference in `d7n-ndjson-converge-fix-report.md` matches the actual tree read at `/home/user/fleet/ndjson`: the `INTERNAL` doc-block wording (`tests/guides.test.ts:42`), the `chunkings` block (`tests/setup.ts:49-51`), and the `{@link}` edits (`src/core/factories.ts:6`, `src/core/NDJSONParser.ts:6`) all read exactly as the report's diffs claim.
- No sentence in the report's prose states a count of a set anyone can add to. Numeric content in the report is either a line-number citation (`tests/setup.ts lines 6, 7, and 28`) or literal pasted command output (`Tests 31 passed (31)`), both permitted; no narrative sentence states "N items" or similar.
- The pin's description ("the assertion that follows it fails when a name here stops being stranded") is quoted verbatim from the file's own words, not paraphrased with added claims.

## Claim 3 — Each named correction is present as the audit's finding asked (ndjson)

PASS, with one referral noted below.

- **Drop-in matching the pilot**: confirmed byte-for-byte outside `GUIDE_SPEC`/`MODULES` by direct read of `/home/user/fleet/ndjson/tests/guides.test.ts:29-261` against `/home/user/fleet/abort/tests/guides.test.ts:26-258` — content is identical apart from the two named constants.
- **`## Tests` and `## See also` in the pilot's shape**: `guides/ndjson.md:105-115` carries the same two-heading shape as `guides/abort.md:154-165` (a bulleted list of test-file links each with a descriptive clause, then `AGENTS.md`/`README.md` under `## See also`).
- **The descriptive heading (Ruling 9)**: `guides/ndjson.md:63` reads `#### Create a parser`, matching Ruling 9's own worked example verbatim (`rulings.md:38`), sitting directly above the fence under the structural `### Factories` heading.
- **Restored demonstration (Ruling 14)**: both the `@example` block (`src/core/factories.ts:16-18`) and the guide fence (`guides/ndjson.md:70-71`) carry the two restored lines with the spaced em dash; the executed test and its presence guard were both extended to match (`tests/guides.test.ts:312-322`).
- **Buffer caveat**: present verbatim under the `## Methods` table (`guides/ndjson.md:92-93`), matching the fix brief's exact wording.
- **`chunkings`'s wording**: `tests/setup.ts:49-51` opens verb-first ("Splits `stream` into a fixed set of chunk sequences...") without naming the symbol, satisfying the mechanical shape the brief and Ruling 3's population require. It reads "chunking-invariance" where sse's own text (`/home/user/fleet/sse/tests/setup.ts:50`) reads "partition-invariance" — a documented, reasoned substitution (report § item 6) made to keep `partition` the sole owner of "partition," a requirement the same item also carries. Whether "as sse's" (audit verdict finding carrier, `d7n-slice3-audit-verdict.md:27`) obliges the literal sse string rather than this substitution is a judgment call outside mechanical scope — **referred to the subjective lane / Orchestrator**, not ruled here.
- **`{@link}` cross-references**: present in both `src/core/factories.ts:6` and `src/core/NDJSONParser.ts:6`; `types.ts` correctly left untouched, matching the report's justification that its remaining code spans name members/parameters rather than declarations.

## Findings outside the claims

- The report's § Boundary applied section flags an unresolved question (the file header's own text vs. the pilot's) that it explicitly declined to act on and left for the Orchestrator to rule — not a defect, but a live open item the closure brief does not name a claim for.
- The referred `chunking-invariance`/`partition-invariance` divergence above is the only substantive judgment question found; it does not falsify any claim as stated.

VERDICT: PASS
