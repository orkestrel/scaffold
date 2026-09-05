<!-- workflow wf_56b192d6-7c3, agent a7022798219a73b05, verifier on Sonnet, captured from journal.jsonl -->

## Gate Report

**Command:** `node node_modules/typescript/bin/tsc --version`
**Exit code:** 0
**Last 3 lines:**
```
Version 6.0.3
```

**Command:** `npm run format:check`
**Exit code:** 0
**Last 3 lines:**
```
All matched files use the correct format.
Finished in 7705ms on 222 files using 4 threads.
```

**Command:** `npm run lint:check`
**Exit code:** 0
**Last 3 lines:**
```
> @orkestrel/scaffold@0.0.63 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

**Command:** `npm run check`
**Exit code:** 0
**Last 3 lines:**
```
> @orkestrel/scaffold@0.0.63 check:src:bin
> tsc --noEmit -p configs/src/tsconfig.bin.json
```

**Command:** `npm run build`
**Exit code:** 0
**Last 3 lines:**
```
> @orkestrel/scaffold@0.0.63 build:inventory
> node -e "..."
build-inventory: staged 121 file(s) into host.json
```

**Command:** `npm test`
**Exit code:** 0
**Last 3 lines:**
```
   Duration  3.31s (transform 616ms, setup 363ms, import 1.03s, tests 1.69s, environment 0ms)
```
No timing failure occurred; no re-run needed. The log contains one line reading `failed to load config from /home/user/scaffold/tmp/scaffold-e2-peers-3exF7k/malformed/vite.config.ts` (`/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/test.log:17`), which is an expected fixture message from a malformed-config test case, not a failure — all 7 `Test Files` blocks in the run reported passed.

**Command:** `PATH=/opt/npm11/bin:$PATH npm run test:distribution -- --mode release`
**Exit code:** 0
**Last 3 lines:**
```
      Tests  5 passed (5)
   Start at  22:14:16
   Duration  50.70s (transform 451ms, setup 291ms, import 907ms, tests 49.36s, environment 0ms)
```

**Command:** `git status --short`
**Exit code:** 0
**Output:**
```
?? .orkestrel/campaign/ts6-api/
```
The tree is clean apart from the untracked `.orkestrel/campaign/ts6-api/` entry.

**Anomalies:** None.

GATES: GREEN
