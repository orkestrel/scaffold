# Dependent closed native report

## Outcome

Brief, Middleware, and Worker now run their guide parity suites through the installed Guide native entry. Each package preserves its predecessor assertions and package-specific runtime cases. The package edits are released to root for independent review and root-owned gates.

## Owned paths

| Package | Changed path | Release diffstat |
| --- | --- | --- |
| Brief | `C:/Users/mikes/WebstormProjects/brief/tests/guides.test.ts` | `1133` lines changed; `545` insertions; `588` deletions |
| Middleware | `C:/Users/mikes/WebstormProjects/middleware/tests/guides.test.ts` | `486` lines changed; `220` insertions; `266` deletions |
| Worker | `C:/Users/mikes/WebstormProjects/worker/tests/guides.test.ts` | `658` lines changed; `303` insertions; `355` deletions |
| Scaffold | `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-dependent-closed-native-report.md` | This report |

No source, guide, manifest, lockfile, configuration, vendored, or reference path was edited in this unit.

## Native entry shape

Each suite statically imports `GuideCommand`, `readInventory`, and `createVitest`. Middleware retains its type-only `IdentifierState` import. Runtime contract, Guide, test, Vitest, source, and support modules load inside the `GuideCommand.execute` callback.

Each command declares the source, test, guide, root Markdown, and manifest patterns. It passes the package module inventory and language policy to Guide. It reads `package.json` through `parseJSON` and `isRecord`, then proves the manifest package name before evaluating the report.

## Assertion mapping

### Shared parity assertions

| Predecessor assertion | Native report or leaf |
| --- | --- |
| Manifest identity and discovered guide presence | `report.input`, `rows`, and the package row |
| Guide/spec title pair | `report.examples.titles` filtered to the package spec |
| Package pitch | Manifest identity and `report.pitch` |
| Required fence languages | `report.fences` for each guide row |
| Source and guide drift | `report.drift` for each guide row |
| Public function examples | `report.examples.functions` for each guide row |
| Public and direct surface ownership | `source` barrel and direct declaration leaves |
| Internal and hidden declarations | `source` internal and hidden leaves |
| Class membership and method groups | `source` class and method leaves |
| Method examples | `guide` example leaves |
| Imports, links, and test references | `guide` and `source` leaves |
| Non-vacuity | Explicit row, declaration, example, and reference assertions |

### Brief preservation

Brief retains the inventory pin, negative controls, options-owner checks, and TSDoc checks. It also retains the real compile, build, block, and store cases with their cleanup paths.

### Middleware preservation

Middleware retains the composed boundary and security battery. It also retains the guide text line-presence checks.

### Worker preservation

Worker retains the internal server-class assertions. It also retains the real thread, Node worker, persistence, thread-pool, and lifecycle cases with their cleanup paths.

## Red-to-green evidence

The exact direct command was `node --experimental-strip-types tests/guides.test.ts` in each package.

| Package | Before edit | Failure evidence | After edit |
| --- | --- | --- | --- |
| Brief | Exit `1`; Vitest did not collect a test file | `ERR_MODULE_NOT_FOUND`: Node could not resolve `@src/core` from `tests/guides.test.ts` | Exit `0`; `Test Files 1 passed (1)`; `Tests 39 passed (39)`; duration `908ms` |
| Middleware | Exit `1`; Vitest did not collect a test file | `ERR_MODULE_NOT_FOUND`: Node could not resolve `@src/core` from `tests/guides.test.ts` | Exit `0`; `Test Files 1 passed (1)`; `Tests 43 passed (43)`; duration `880ms` |
| Worker | Exit `1`; Vitest did not collect a test file | `ERR_MODULE_NOT_FOUND`: Node could not resolve `@src/core` from `tests/guides.test.ts` | Exit `0`; `Test Files 1 passed (1)`; `Tests 27 passed (27)`; duration `986ms` |

The retained red receipts are:

- `tmp/pass/d7n-brief-dependent-native-red/action.exit.txt`
- `tmp/pass/d7n-brief-dependent-native-red/action.stderr.txt`
- `tmp/pass/d7n-middleware-dependent-native-red/action.exit.txt`
- `tmp/pass/d7n-middleware-dependent-native-red/action.stderr.txt`
- `tmp/pass/d7n-worker-dependent-native-red/action.exit.txt`
- `tmp/pass/d7n-worker-dependent-native-red/action.stderr.txt`

## Scoped validation

| Package | Command | Exit | Result |
| --- | --- | --- | --- |
| Brief | `node --experimental-strip-types tests/guides.test.ts` | `0` | `Test Files 1 passed (1)`; `Tests 39 passed (39)` |
| Brief | `npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts` | `0` | Clean |
| Brief | `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` | `0` | Clean |
| Brief | `git diff --check -- tests/guides.test.ts` | `0` | Clean |
| Middleware | `node --experimental-strip-types tests/guides.test.ts` | `0` | `Test Files 1 passed (1)`; `Tests 43 passed (43)` |
| Middleware | `npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts` | `0` | Clean |
| Middleware | `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` | `0` | Clean |
| Middleware | `git diff --check -- tests/guides.test.ts` | `0` | Clean |
| Worker | `node --experimental-strip-types tests/guides.test.ts` | `0` | `Test Files 1 passed (1)`; `Tests 27 passed (27)` |
| Worker | `npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts` | `0` | Clean |
| Worker | `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` | `0` | Clean |
| Worker | `git diff --check -- tests/guides.test.ts` | `0` | Clean |

## Deviations

None. The native migration closed within the writable scope.

## Shared-file patches

None.
