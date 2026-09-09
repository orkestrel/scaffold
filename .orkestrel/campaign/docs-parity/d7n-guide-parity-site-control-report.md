# Guide parity source-site control report

## Outcome

Added the authorized test-only control to
`C:/Users/mikes/WebstormProjects/guide/tests/src/core/Parity.test.ts`. Product
implementation, setup fixtures, package metadata, guides, configuration, and Git
state were preserved.

## Selected-site proof

The control supplies `src/core/Zeta.ts` before `src/core/Alpha.ts` in caller
inventory insertion order. Each file carries an exported declaration with the
same titled source example. `src/core/Alpha.ts` carries a later example tag with
that title in the selected comment.

The guide-authority rewrite proves these outcomes:

- `changes` names only `src/core/Alpha.ts`, which binds path selection to sorted
  source paths rather than caller object insertion order.
- The earliest titled tag in the selected comment takes the guide fence body.
- The later titled tag retains `laterSite()`.
- The selected text no longer carries `firstSite()`.
- `changes` has no `src/core/Zeta.ts` entry, so the alternate site's bytes remain
  unchanged under the changed-only output contract.
- `findings` is empty after accumulated-result verification.

## Validation

Command:

```text
npm run test:src:core -- tests/src/core/Parity.test.ts
```

Result: exit `0`.

```text
Test Files  1 passed (1)
Tests       10 passed (10)
```

The owned-file formatter ran on `tests/src/core/Parity.test.ts` and exited `0`.
The owned-file format check exited `0` with `All matched files use the correct
format.` The owned-file Oxlint check exited `0` with no diagnostics. Vitest's
TypeScript transform compiled and ran the new control without diagnostics.

## Status evidence

`git diff HEAD --numstat -- tests/src/core/Parity.test.ts tests/setup.ts`:

```text
144 1 tests/setup.ts
251 0 tests/src/core/Parity.test.ts
```

`git diff --cached --name-only` remains:

```text
src/core/Parity.ts
tests/src/core/Parity.test.ts
```

The externally staged additions were preserved. This role ran no Git mutation.
No defect was exposed, so no red successor proof or implementation correction
was needed. Root owns final acceptance and integrated review.
