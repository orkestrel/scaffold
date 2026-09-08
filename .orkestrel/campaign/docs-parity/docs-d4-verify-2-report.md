# Verify report — D4 scaffold-gate (scaffold), second run

This is the second verify run of `tmp/units/docs-d4-verify-brief.md`.

## 1. grep findDrift/tagline and map count

`grep -n "findDrift\|tagline" tests/guides.test.ts` — exit 0. Matches include the `findDrift` import (line 7), its use at line 173, and the `tagline` case at lines 178-189, including `it('opens the README with the guide tagline', ...)` at line 181.

`grep -c "map((method) => method.name)" tests/guides.test.ts` — exit 0, count 5.

## 2. grep findDrift/tagline/locateComment in vendored guide types

`grep -n "findDrift\|tagline\|locateComment" node_modules/@orkestrel/guide/dist/src/core/index.d.ts | head -5` — exit 0. Matches at lines 154, 826, 915, 928, 930, including the `locateComment` mention and two `tagline()` references. The head start is present.

## 3. npm run format:check

Exit 0. Last lines:
```
Checking formatting...
All matched files use the correct format.
Finished in 9376ms on 222 files using 4 threads.
```

## 4. npm run lint:check

Exit 0. No output beyond the command header.

## 5. npm run check

Exit 0. Runs `tsc --noEmit` for the root, core, server, and bin projects with no errors reported.

## 6. npm run test:policy

Exit 0. Last lines:
```
 Test Files  1 passed (1)
      Tests  91 passed (91)
   Start at  05:38:28
   Duration  1.59s (transform 644ms, setup 565ms, import 167ms, tests 677ms, environment 0ms)
```

## 7. npm run build

Exit 0. Last lines:
```
> @orkestrel/scaffold@0.0.63 build:inventory
> node -e "import('./dist/src/server/index.js').then((m)=>{const p=process.argv[1]??'host.json',n=m.stageInventory(process.cwd(),p).entries.length;console.log('build-inventory: staged '+n+' file(s) into '+p)})"

build-inventory: staged 121 file(s) into host.json
```

## 8. sha256sum host.json && npm run build:inventory && sha256sum host.json

Exit 0. Digest before: `589ebebe834c2df5c6a96074be2547d1036a8b1ed1a8282b9db7bd51f3c822b1`. `build-inventory: staged 121 file(s) into host.json`. Digest after: `589ebebe834c2df5c6a96074be2547d1036a8b1ed1a8282b9db7bd51f3c822b1`. The digests match.

## 9. npm run test:guides

Exit 1. Failing case names, both expected:

- `guides > keeps every compared summary and example equal to its source`
- `guides > opens the README with the guide tagline`

Every other case passed. Last lines:
```
 Test Files  1 failed (1)
      Tests  2 failed | 17 passed (19)
   Start at  05:38:55
   Duration  7.55s (transform 853ms, setup 581ms, import 745ms, tests 6.02s, environment 0ms)
```

Per the brief, red on exactly these two named cases with every other case green is GREEN for this brief's purpose.

## 10. git status --short

Exit 0. Output:
```
 M .claude/rules/documentation.md
 M .claude/rules/tests.md
 M .claude/rules/workspace.md
 M host.json
 M tests/guides.test.ts
```

## GATES

GATES: GREEN
