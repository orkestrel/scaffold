# Codec native method-report correction

## Outcome

Codec's authored guides test now consumes the native method-parity and method-example findings for
each manifest row. The correction is complete with no deviation.

## Frozen scope

The product change is `C:/Users/mikes/WebstormProjects/codec/tests/guides.test.ts`. Every other Codec
path remained off-limits and untouched. This file is the separate dispatch report required by the
successor brief. Codec is frozen again.

## Correction

- The row suite asserts that `report.methods` has no finding for the row spec. This restores the
  behavioral-interface and implementing-class parity obligation.
- The row suite asserts that `report.examples.methods` has no finding for the row spec. This restores
  method-example coverage.
- The test does not require a Methods section and adds no Codec-specific package policy.
- Every other assertion in the retained candidate remains in place.

## Review evidence

The independent review ran `tmp/pass/probe-codec-method-population.mjs` against an in-memory guide
with `AbsentInterface.absentMethod`. The probe exited `0`. Its output showed `absentMethod` in the
baseline missing set and the corresponding finding in `report.methods`. The retained candidate did
not consume that collection. The correction now does.

## Scoped validation

- `node --experimental-strip-types tests/guides.test.ts` exited `0`: `Test Files 1 passed (1)` and
  `Tests 30 passed (30)`.
- `npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts` exited `0` and reported that the
  matched file uses the correct format.
- `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exited `0` with no
  diagnostic.
- `git -C C:/Users/mikes/WebstormProjects/codec diff --check -- tests/guides.test.ts` exited `0`.
- `git -C C:/Users/mikes/WebstormProjects/codec status --short` reported only
  `M tests/guides.test.ts`.

Codec diffstat:

```text
tests/guides.test.ts | 618 +++++++++++++++++++++------------------------------
1 file changed, 255 insertions(+), 363 deletions(-)
```

## Limits

The unit did not run package-wide gates, install, commit, publish, or modify another package. The
Orchestrator owns permanent acceptance and final gates.

## Shared-file patches

None.
