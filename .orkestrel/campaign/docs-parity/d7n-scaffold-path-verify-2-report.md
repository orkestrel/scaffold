# Gate report: d7n-scaffold-path-verify-2

## Overall

GREEN. The isolated candidate passed the dispatched acceptance chain under the saved Bash timeout carrier with the 1800s cap.

## Gate evidence

| Command | Exit | Duration | Raw log |
| --- | --- | --- | --- |
| `npm run format:check` | `0` | `5s` | `tmp/pass/scaffold-path/tmp/d7n-scaffold-path-verify-2/format-check.log.txt` |
| `npm run lint:check` | `0` | `1s` | `tmp/pass/scaffold-path/tmp/d7n-scaffold-path-verify-2/lint-check.log.txt` |
| `npm run check` | `0` | `7s` | `tmp/pass/scaffold-path/tmp/d7n-scaffold-path-verify-2/check.log.txt` |
| isolated `dist` guard | `0` | `0s` | `tmp/pass/scaffold-path/tmp/d7n-scaffold-path-verify-2/build-guard.log.txt` |
| `npm run build` | `0` | `9s` | `tmp/pass/scaffold-path/tmp/d7n-scaffold-path-verify-2/build.log.txt` |
| `npm test` | `0` | `69s` | `tmp/pass/scaffold-path/tmp/d7n-scaffold-path-verify-2/test.log.txt` |

Carrier: `tmp/pass/scaffold-path/tmp/d7n-scaffold-path-verify-2/run.sh`.

The guard read `dist` as an ordinary directory at `/c/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/dist` before `npm run build` removed and rebuilt generated output.

## Status and preservation

`git -C C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path diff --check` exited `0` with no output.

Final isolated status:

```text
 M .claude/rules/portability.md
 M host.json
 M tests/config.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
?? tests/setupPolicy.test.ts
```

The build regenerated the existing tracked `host.json` drift. Its final inventory digest is `886689033d56da74faa4fe1d7093fca1372186ed79bef81b981d2379aeeb75d1`.

`package.json` SHA-256: `F7D617933A360E28AEF251A0E69EDCAFC5434DA4B3E95E6EC0B9DF303503CB42`.

`package-lock.json` SHA-256: `0C590D422F9BC1BD24C64788B5AB8D254A68CD3988116CFB2B8FB72BB7656296`.

## Anomalies

The build and configuration tests emitted the existing API Extractor warning that bundled TypeScript `5.9.3` is older than target TypeScript `6.0.3`. Gates stayed green.

The core test log includes expected stderr from its malformed peer-dependency fixture. That project exited `0`.
