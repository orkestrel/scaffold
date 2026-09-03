## Per-claim verdicts

1. CONFIRMED. The sole guide hunk adds the image, obfuscated URL, and alignment vectors with their outputs at `guides/html.md:443-454`.

2. CONFIRMED. Executed `toBe` assertions appear in fence order at `tests/guides.test.ts:329-341`. The focused run passed: 32 passed. `SAFE_ATTRIBUTES` keeps `alt` but omits `src` at `src/core/constants.ts:440-454`. The sanitizer applies that default at `src/core/HTML.ts:235-243`.

3. CONFIRMED. Exact input-and-output guards appear at `tests/guides.test.ts:569-571` and execute at `tests/guides.test.ts:640`.

4. CONFIRMED. `/home/user/work/evidence/html-sanitizer-proofs/red.txt:7-26` reports 1 failed and 31 passed. `/home/user/work/evidence/html-sanitizer-proofs/green.txt:2-9` reports 32 passed. The command is recorded at `tmp/units/html-sanitizer-report.md:11`.

5. CONFIRMED. The alignment, decoded URL, and omitted resource `src` prose agrees with the fence at `guides/html.md:280-285`.

6. CONFIRMED. Re-run status and diff sweeps found only `guides/html.md` and `tests/guides.test.ts`. Added-line sweeps found none of the prohibited constructs. The gate reading is NOT-EVIDENCED in this read-only lane and settles at landing.

7. CONFIRMED. The deferred-work sweep found no match. The report vectors at `tmp/units/html-sanitizer-report.md:3-7` match the guide and assertions.

## Findings outside the claims

O1. None.

## Referrals to the Orchestrator

R1. Run and assess the landing gate.

PASS