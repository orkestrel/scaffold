1. **CONFIRMED — objective lane.** The proof matches the paired file path, selects the exact case title, and requires `passed` at release `tests/distribution.test.ts:1044–1063`. Discovery assertions remain at `:1036–1037`; real Vue DOM assertions remain in `tests/setupServer.ts:888–891`. Host controls reject skipped (`tmp/audit/setup-vue-skipped-control.log.txt:38`), todo (`setup-vue-todo-control.log.txt:38`), absent (`setup-vue-absent-control.log.txt:22`), and failed cases (`setup-vue-failed-control.log.txt:30–31`). The restored positive passes (`setup-vue-restored-control.log.txt:18`).

2. **CONFIRMED.** Real child failure reaches the outer exit-code assertion (`tmp/audit/setup-vue-failed-control.log.txt:67–70`). Cleanup remains in `finally` at release `tests/distribution.test.ts:1064–1065`. The failed control’s recorded scratch directory was absent afterward: `FAILED_CONTROL_SCRATCH_EXISTS=False`. The patch reuses declared contract primitives and adds no dependency, public API, parser, or helper.

   The read-only `node --input-type=module` replay executed the exact acceptance block using installed contract primitives and Vitest’s assertion plugins. The block SHA256 was `71c3133e65a5fd4a51694ec2c0e5954ae50f0b37f18fb44bd56e5eed92260c4e`. Relevant exact output was:

   ```text
   passed=ACCEPT
   missing-report=REJECT Value is required
   invalid-json=REJECT The generated browser proof wrote no test results.
   missing-results=REJECT The generated browser proof wrote no test results.
   malformed-results=REJECT The generated browser proof wrote no test results.
   wrong-file=REJECT The generated browser proof reported no paired setup cases.
   missing-assertions=REJECT The generated browser proof reported no paired setup cases.
   malformed-assertions=REJECT The generated browser proof reported no paired setup cases.
   COVERAGE=exact acceptance block; inert reporter data; excludes child execution and filesystem cleanup
   ```

Findings fitting no claim: none.

Attacked and held: wrong titles, missing statuses, and duplicate passed matches also fail the exact-block replay. Additional reporter fields remain accepted through `objectContaining`; that behavior matches the installed reporter contract. Outer cases skipped by the command’s name filter don’t satisfy the child acceptance assertion.

VERDICT: PASS
