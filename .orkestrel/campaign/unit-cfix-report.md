## Diff

```text
M  guides/contract.md
M  src/core/constants.ts
M  src/core/errors.ts
M  tests/setup.ts
M  tests/src/core/integration.test.ts
?? tests/src/core/errors.test.ts
```

- Added the captured `CONTRACT_ERROR_BRAND`.
- Stored each error’s own identity in the brand descriptor.
- Routed construction and recognition through `INTRINSICS`.
- Refused transparent proxies through identity comparison.
- Retired the empty `OWNED_STATICS` corpus with its reason recorded.
- Added proxy, stripped-brand, complete-forgery, and intrinsic-liar controls.
- Documented cross-copy recognition, transparent-wrapper refusal, and forgeability.

`git diff --stat`:

```text
guides/contract.md                 |  21 ++--
src/core/constants.ts              |  12 +++
src/core/errors.ts                 | 197 +++++++++----------------------------
tests/setup.ts                     |  45 +++------
tests/src/core/integration.test.ts | 183 ++++++++++++++++------------------
5 files changed, 171 insertions(+), 287 deletions(-)
```

The untracked `tests/src/core/errors.test.ts` contains 5 tests.

## Criterion evidence

1. Status, exit 0.

Before:

```text
 M guides/contract.md
 M package-lock.json
 M package.json
 M src/core/errors.ts
 M tests/src/core/integration.test.ts
?? tests/src/core/errors.test.ts
```

After:

```text
 M guides/contract.md
 M package-lock.json
 M package.json
 M src/core/constants.ts
 M src/core/errors.ts
 M tests/setup.ts
 M tests/src/core/integration.test.ts
?? tests/src/core/errors.test.ts
```

Only the owned `src/core/constants.ts` and `tests/setup.ts` files were added to the standing entries. Git also emitted the pre-existing inaccessible global-ignore warning.

2. Scoped formatting and lint, both exit 0.

```text
Checking formatting...

All matched files use the correct format.
Finished in 745ms on 6 files using 16 threads.
```

```text
npx.cmd oxlint --config .oxlintrc.json --deny-warnings src/core/errors.ts src/core/constants.ts tests/setup.ts tests/src/core/errors.test.ts tests/src/core/integration.test.ts guides/contract.md
Exit code: 0
```

3. TypeScript, exit 0.

```text
npx.cmd tsc --noEmit --project tsconfig.json
Exit code: 0
```

4. Failing-first pairs.

Errors before the fix, exit 1:

```text
Test Files  1 failed (1)
     Tests  3 failed | 2 passed (5)

transparent proxy:
Expected false
Received true

brand removal:
Expected true
Received false

complete identity forgery:
Expected true
Received false
```

Errors after the fix, exit 0:

```text
Test Files  1 passed (1)
     Tests  5 passed (5)
```

Intrinsic-liar proofs before the fix, exit 1:

```text
Test Files  1 failed (1)
     Tests  2 failed | 73 passed (75)

genuine error under () => undefined:
Expected true
Received false

forgery under () => ({ value: true }):
Expected false
Received true
```

Intrinsic-liar proofs after the fix, exit 0:

```text
Test Files  1 passed (1)
     Tests  74 passed (74)
```

5. Core project, exit 0.

```text
Test Files  15 passed (15)
     Tests  1291 passed (1291)
Duration  4.75s
```

6. Guides project, exit 0.

```text
Test Files  1 passed (1)
     Tests  59 passed (59)
Duration  2.07s
```

Deviations: none.