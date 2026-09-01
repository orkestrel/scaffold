# U3f verifier gate report, run 1 (verifier / Sonnet; tree: U3 + U3f over 163490f)

- `npm run format:check` → PASS (exit 0)
- `npm run lint:check` → PASS (exit 0)
- `npm run check` → PASS (exit 0)
- `npm run build` → PASS (exit 0)
- `npm test` → FAIL (exit 1): `tests/src/core/integration.test.ts:967` `expected 217 to be 216` in `no caller-reachable member decides a membership answer > documents its own composition, because a round asserted this corpus was empty`; `src:core` 1 failed / 1322 passed (1323); the later projects did not run because `npm test` chains with `&&`.

Overall: NOT GREEN. Owning cause: the new `ownPattern` export adds one row to the `OWNED_MEMBERS` corpus (one row per exported plain function) whose size is pinned at 216 in the test and stated as "216 rows" at `guides/contract.md:256`; the pin's own comment requires a new export to move both literals deliberately.
