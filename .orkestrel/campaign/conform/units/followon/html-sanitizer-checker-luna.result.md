## Per-claim verdicts

1. CONFIRMED — `guides/html.md:443-454` adds the documented sanitizer vectors and the current diff contains no other guide changes.

2. CONFIRMED — `SAFE_ATTRIBUTES` omits `src` and includes `alt` at `src/core/constants.ts:440-455`; sanitizer filtering is implemented at `src/core/helpers.ts:848-894`. Executed `toBe` assertions appear at `tests/guides.test.ts:329-343`.

3. CONFIRMED — The presence guard includes all added inputs and outputs at `tests/guides.test.ts:540-572`, and checks them at `tests/guides.test.ts:640`.

4. CONFIRMED — `red.txt` records `1 failed` and `31 passed`; `green.txt` records `32 passed`. The project and test file match `package.json:60-68` and `vite.config.ts:88-94`.

5. CONFIRMED — The prose at `guides/html.md:280-285` matches the fenced outputs and sanitizer implementation.

6. CONFIRMED — Re-run status lists only `guides/html.md` and `tests/guides.test.ts`; the diff contains no forbidden added tokens. Gate status remains NOT-EVIDENCED for this read-only audit and settles at landing.

7. CONFIRMED — The report's vector rows at `tmp/units/html-sanitizer-report.md:5-7` match the current diff. Its deviations section is empty at `tmp/units/html-sanitizer-report.md:43`.

## Findings outside the claims

None.

## Referrals to the Orchestrator

None.

PASS