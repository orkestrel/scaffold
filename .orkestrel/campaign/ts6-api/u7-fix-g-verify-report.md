# Gate report — U7-fix-g (probe), guide after cost rows

Run from `/home/user/fleet/probe`.

## 1. `npm run format:check`

PASS (exit 0)

```
Checking formatting...

All matched files use the correct format.
Finished in 4428ms on 70 files using 4 threads.
```

## 2. `npm run lint:check`

PASS (exit 0)

```
(no warnings or errors; oxlint --config .oxlintrc.json --deny-warnings . produced no output)
```

## 3. `npm run test:guides`

PASS (exit 0)

```
 Test Files  1 passed (1)
      Tests  13 passed (13)
   Start at  17:39:52
   Duration  18.24s (transform 277ms, setup 30ms, import 418ms, tests 17.64s, environment 0ms)
```

## 4. `npm run test:policy`

PASS (exit 0)

```
 Test Files  1 passed (1)
      Tests  111 passed (111)
   Start at  17:40:15
   Duration  1.60s (transform 294ms, setup 28ms, import 697ms, tests 714ms, environment 0ms)
```

## 5. `git status --short`

PASS (exit 0)

```
 M guides/probe.md
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/server/Overlay.ts
 M src/server/Probe.ts
 M src/server/helpers.ts
 M src/server/index.ts
 A src/server/parsers.ts
 M src/server/stages/RuntimeStage.ts
 M src/server/stages/TypeStage.ts
 M src/server/types.ts
 M tests/src/core/errors.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/validators.test.ts
 M tests/src/server/Overlay.test.ts
 M tests/src/server/Probe.test.ts
 M tests/src/server/ProbeServer.test.ts
 M tests/src/server/helpers.test.ts
 A tests/src/server/parsers.test.ts
 M tests/src/server/stages/TypeStage.test.ts
```

## Anomalies

None observed.

GATES: GREEN
