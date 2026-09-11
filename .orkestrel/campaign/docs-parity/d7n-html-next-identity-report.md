# HTML native-entry identity supplement

## Outcome

The HTML entry now makes its unconditional README pitch obligation conditional on a valid package identity, not on a selector supplied by Guide. It includes `package.json` in the fresh inventory, parses the manifest with Contract's `parseJSON`, narrows the result with Contract's `isObject`, and compares its `name` with the package specifier derived from `MODULES`. The `report.pitch` assertion follows that comparison in the same test.

## Failure behavior

| Input state | Resulting gate |
| --- | --- |
| `package.json` absent from fresh inventory | `requireValue` fails registration with `Missing file: package.json`. |
| Manifest text malformed | `parseJSON` returns `undefined`; the `isObject` assertion fails. |
| Parsed manifest is not an object | The `isObject` assertion fails. |
| Manifest `name` differs from the package-owned module identity | The `Reflect.get(manifest, 'name')` equality assertion fails before `report.pitch`. |
| Manifest identity matches | The unconditional `report.pitch` assertion runs. |

The expected identity is not duplicated: it is selected from the existing `MODULES` policy by excluding the in-repository `@src/` alias.

## Evidence

The original four inventory globs caused the adopted worker to fail the identity gate:

| Command | Exit | Reading |
| --- | ---: | --- |
| `node --experimental-strip-types tests/guides.test.ts` | 1 | `Error: Missing file: package.json`; `Test Files 1 failed (1)`; no tests registered. |

After the identity addendum's `package.json` inventory input:

| Command | Exit | Reading |
| --- | ---: | --- |
| `node --experimental-strip-types tests/guides.test.ts` | 0 | `Test Files 1 passed (1)`; `Tests 32 passed (32)`; duration `912ms`. |
| `npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts` | 0 | `All matched files use the correct format.` |
| `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` | 0 | No diagnostics. |
| `git diff --check -- tests/guides.test.ts` | 0 | No whitespace errors. |

Root's saved `tmp/pass/d7n-abort-pitch-control-before` receipt exposed a false green for an intentionally wrong manifest name beside a mismatched README pitch. That is control evidence, not a runtime package defect. This unit did not edit HTML's manifest or README. Root retains ownership of repeating the real incorrect-name control against this entry, restoring the exact input bytes, and running the normal integration and release gates.
