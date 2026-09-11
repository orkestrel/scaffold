# Unit d7n-tool native identity supplement

## Finding

The Abort control exposed a native parity false green when package identity and README pitch were changed together. It was control evidence about an unguarded consumer policy, not a Tool runtime defect.

## Tool identity pin

| Requirement | Implementation |
| --- | --- |
| Centralize expected package identity | `PACKAGE_MODULE` holds `@orkestrel/tool` and also supplies the public module key in `MODULES`. |
| Inventory the package manifest | The `GuideCommand` patterns include `package.json`. |
| Use declared reusable parsing mechanics | The callback dynamically imports installed Contract `parseJSON` and `isRecord`. |
| Fail missing inventory | `requireValue(files['package.json'], 'Missing file: package.json')` rejects absence. |
| Fail malformed JSON or a non-record root | `parseJSON` returns `undefined` for malformed text; `isRecord` rejects arrays, `null`, primitives, and ordinary class instances. |
| Fail a missing, non-string, or wrong package name | The narrowed manifest's `name` must equal `PACKAGE_MODULE`. |
| Keep pitch mandatory | `report.pitch` is asserted only after package identity passes in the existing README-pitch case. |

## Evidence

| Command | Exit | Result |
| --- | --- | --- |
| `node --experimental-strip-types tests/guides.test.ts` | `0` | `Test Files 1 passed (1)`; `Tests 25 passed (25)`. |
| `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` | `0` | No diagnostics. |
| `npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts` | `1` | Formatting-only difference reserved for root's scoped formatter mutation. |

## Limit

The wrong-name control was not run in Tool because `package.json` and `README.md` are outside this unit's writable scope. Root owns any byte-restored control mutation. The assertion itself makes missing inventory, malformed JSON, a non-record manifest, and a non-matching name fail before pitch acceptance.

The identity supplement is frozen with the native unit.
