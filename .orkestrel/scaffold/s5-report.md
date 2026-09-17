# Unit S5 — report

## Done / not done per criterion

1. Done. The two paragraphs are replaced with the given text; no other paragraph of the block changed.
2. Done. `tmp/units/s4-run-case.mjs` no longer carries `assert.equal(report.numTotalTests, assertions.length)`. It now asserts `report.numTotalTests` and `report.numPendingTests` against a caller-supplied `expected` parameter.
3. Done. All three callers (`tmp/units/s3-red-1-selection.mjs`, `tmp/units/s3-red-2-pinning.mjs`, `tmp/units/s4-red-predicate.mjs`) pass `422` as the expected total.
4. Done. Each named instrument re-ran; output below.
5. Done. `git diff --name-only | wc -l` reported `8` after every instrument run.
6. Done. `npm run format:check` and `npm run lint:check` are clean.
7. Done. `npm run test:src:core` passes: 422 tests passed, 9 test files passed.
8. Done. `git diff --name-only` names exactly the eight files it named before this unit.

## The comment

```text
// What the controls establish, and what they do not: a case that can contrast against the
// bare merge carries `mergeConfig` beside the guarded call and asserts the damage the guard
// prevents, so a guard that stopped working cannot leave both assertions passing. A case
// that cannot contrast carries no such control, because it asserts exactly the value the
// bare merge produces — there is no damage to show — and its load-bearing assertions are
// identity and order instead. Which kind a case is reads off its own body: the ones with a
// control call `mergeConfig` inside it. The two predicate cases are the exception worth
// naming, because their kind is not visible here at all — nothing in this file discriminates
// a guard that admits a non-string `name` or a structural thenable, and the red that does
// comes from mutating the predicate itself.
```

The "Which cases meet the real vendored boundary plugins" paragraph was left untouched, as instructed.

## The runner

`tmp/units/s4-run-case.mjs`'s `runCase` function now takes a fourth `expected` parameter. It deletes
the self-referential `assert.equal(report.numTotalTests, assertions.length)` line and instead asserts
`assert.equal(report.numTotalTests, expected)` and `assert.equal(report.numPendingTests, expected - 1)`.
`assert.equal(executed.length, 1)` and the other prior assertions are unchanged. `tmp/units/s4-runner-control.mjs`
was not in the callers list and was left unchanged; its call passes no `expected` argument, and it still
throws before reaching the total assertion because `executed.length` is `0`, not `1`, for its empty-collection case.

## The re-runs

`node tmp/units/s3-red-1-selection.mjs`:
```
mutated: exit 1 — 1 failed | 421 skipped (422); named case: installs one override entry at one base position
restored: exit 0 — 1 passed | 421 skipped (422); named case: installs one override entry at one base position
```
Tree count after: `8`.

`node tmp/units/s3-red-2-pinning.mjs`:
```
mutated: exit 1 — 1 failed | 421 skipped (422); named case: emits every browser workspace configuration for a showcase selection and for none
restored: exit 0 — 1 passed | 421 skipped (422); named case: emits every browser workspace configuration for a showcase selection and for none
```
Tree count after: `8`.

`node tmp/units/s4-red-predicate.mjs`:
```
original predicate: exit 1 — 1 failed | 421 skipped (422); named case: preserves non-string plugin names without selecting them
original predicate: exit 1 — 1 failed | 421 skipped (422); named case: preserves named structural promises without selecting them
repaired predicate: exit 0 — 1 passed | 421 skipped (422); named case: preserves non-string plugin names without selecting them
repaired predicate: exit 0 — 1 passed | 421 skipped (422); named case: preserves named structural promises without selecting them
```
Tree count after: `8`.

`node tmp/units/s4-runner-control.mjs`:
```
The named-case runner refuses an empty collection despite Vitest exiting 0.
```
Tree count after: `8`.

`npm run test:src:core` (run after all instruments): `Test Files 9 passed (9)`, `Tests 422 passed (422)`.

## What I did not close, and why

Nothing in scope was left open. `.orkestrel/` retention of the instruments belongs to the Orchestrator per the brief.
