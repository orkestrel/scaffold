# Gate report — U12 fleet-visit-probe (phase A), independent cheap gates

Ran from `/home/user/fleet/probe`, in order, no re-runs.

## 1. `git log --oneline -1` / `git status --short`

PASS (exit 0 / exit 0)

Last lines:
```
a36d689 Move the declaration roll-up onto the vendored helper and regenerate the proof
```
`git status --short` printed no line: working tree clean.

## 2. `grep -rn "vite-plugin-dts" package.json configs/src` / `grep -c "declarationRollup(" configs/src/vite.*.config.ts`

PASS (exit 1 / exit 0) — exit 1 from the first `grep` is the expected "no match" result.

First command printed no line, as expected.

Second command's last lines:
```
configs/src/vite.bin.config.ts:0
configs/src/vite.core.config.ts:1
configs/src/vite.server.config.ts:1
```

## 3. `head -20 tests/distribution.test.ts | grep -n "typescript"`

PASS (exit 1) — expected no line, and none printed.

## 4. `npx scaffold audit --offline`

PASS (exit 0)

Last lines:
```
0 of 43 planned paths drifted from the plan. Audit compared bytes at 27, existence at 5, and nothing at 11.
```

## 5. `npm run format:check`

PASS (exit 0)

Last lines:
```
All matched files use the correct format.
Finished in 4037ms on 70 files using 4 threads.
```

## 6. `npm run lint:check`

PASS (exit 0)

Last lines:
```
> @orkestrel/probe@0.0.12 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```
No warnings or errors printed.

## 7. `npm run check`

PASS (exit 0)

Last lines:
```
> @orkestrel/probe@0.0.12 check:src:bin
> tsc --noEmit -p configs/src/tsconfig.bin.json
```
No diagnostics printed from any of the four `tsc` invocations.

## 8. `ls dist/src/*/index.d.ts dist/src/*/index.d.cts`

PASS (exit 0)

Last lines:
```
dist/src/core/index.d.cts
dist/src/core/index.d.ts
dist/src/server/index.d.cts
dist/src/server/index.d.ts
```

## Overall verdict

GREEN — every gate passed. Steps 2 and 3 each printed no line, satisfying their "expected no line"
condition.

## Anomalies

None observed.

GATES: GREEN
