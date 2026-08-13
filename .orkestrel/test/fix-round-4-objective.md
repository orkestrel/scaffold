**Touched files**

- `src/server/types.ts`
- `src/server/factories.ts`
- `tests/src/server/factories.test.ts`
- `tests/src/core/helpers.test.ts`
- `src/core/helpers.ts` — temporary mutation, restored
- `tmp/probe/sol5-scratch-links.test.ts` — temporary probe, deleted

**Diffstat**

```text
 src/server/factories.ts            |  4 +++-
 src/server/types.ts                | 16 +++++++++-------
 tests/src/core/helpers.test.ts     |  3 ++-
 tests/src/server/factories.test.ts | 12 ++++++++++++
 4 files changed, 26 insertions(+), 9 deletions(-)
```

**Finding-by-finding**

1. `read` now returns `undefined` when `statSync` cannot follow a dangling link. `exists` still uses `lstatSync` and reports that link entry as present. A permanent regression test proves both results. Directory and file links retain their existing behavior.
2. The authoritative types now:
   - Describe `InventoryOptions.exclude` as matching root-relative path keys, including directory descendants.
   - Include directories in `read`’s `@throws`.
   - Document that `write`, `read`, and `exists` accept relative or contained absolute paths. This uses the TSDoc route because renaming the public parameter would require an off-limits guide update.
   - Distinguish entry existence from file readability for dangling links.
3. The timer assertion now uses `delay - clockSlop`, where `clockSlop` is a fixed 2 ms budget. It no longer scales tolerance with the requested delay.

**Reproduction**

```text
$ npm run test:probe

> @orkestrel/test@0.0.1 test:probe
> vitest run --config vite.config.ts --no-cache --reporter=verbose --project probe


 RUN  v4.1.10 /home/user/test

stdout | tmp/probe/sol5-scratch-links.test.ts > prints scratch link behavior
DANGLING exists: true
DANGLING read:  undefined
DIRLINK  read:  Error: Scratch path is a directory: dirlink
FILELINK read:  "ok"

 ✓ |probe| tmp/probe/sol5-scratch-links.test.ts > prints scratch link behavior 5ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  12:41:19
   Duration  305ms (transform 120ms, setup 26ms, import 117ms, tests 6ms, environment 0ms)
```

**Red-then-green**

Red with `setTimeout(resolve, ms / 2)`:

```text
$ npm run test:src:core

> @orkestrel/test@0.0.1 test:src:core
> vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core


 RUN  v4.1.10 /home/user/test

···x···················

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |src:core| tests/src/core/helpers.test.ts > waitForDelay > waits for the requested delay
AssertionError: expected 10.320650999999998 to be greater than or equal to 18
 ❯ tests/src/core/helpers.test.ts:32:19
     30|   await waitForDelay(delay)
     31|   const elapsed = performance.now() - start
     32|   expect(elapsed).toBeGreaterThanOrEqual(floor)
       |                   ^
     33|  })
     34| })

 Test Files  1 failed | 1 passed (2)
      Tests  1 failed | 22 passed (23)
   Start at  12:40:30
   Duration  676ms (transform 256ms, setup 60ms, import 263ms, tests 354ms, environment 0ms)
```

Green after restoring the source:

```text
$ npm run test:src:core

> @orkestrel/test@0.0.1 test:src:core
> vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core


 RUN  v4.1.10 /home/user/test

·······················

 Test Files  2 passed (2)
      Tests  23 passed (23)
   Start at  12:40:47
   Duration  609ms (transform 184ms, setup 70ms, import 173ms, tests 333ms, environment 0ms)
```

**Scoped validation**

1. Formatting:

```text
$ npx oxfmt --config .oxfmtrc.json --check .
Checking formatting...

All matched files use the correct format.
Finished in 2294ms on 114 files using 4 threads.
```

Exit 0.

2. Lint:

```text
$ npx oxlint --config .oxlintrc.json --deny-warnings .
```

Exit 0 with no stdout.

3. Typecheck:

```text
$ npm run check

> @orkestrel/test@0.0.1 check
> tsc --noEmit --project tsconfig.json && npm run check:src


> @orkestrel/test@0.0.1 check:src
> npm run check:src:core && npm run check:src:server


> @orkestrel/test@0.0.1 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json


> @orkestrel/test@0.0.1 check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json
```

Exit 0.

4. Required test projects:

```text
$ npm run test:src

> @orkestrel/test@0.0.1 test:src
> vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core --project src:server


 RUN  v4.1.10 /home/user/test

··················································

 Test Files  4 passed (4)
      Tests  50 passed (50)
   Start at  12:41:55
   Duration  737ms (transform 586ms, setup 178ms, import 528ms, tests 393ms, environment 0ms)
```

```text
$ npm run test:policy

> @orkestrel/test@0.0.1 test:policy
> vitest run --config vite.config.ts --no-cache --reporter=dot --project policy


 RUN  v4.1.10 /home/user/test

··················

 Test Files  1 passed (1)
      Tests  18 passed (18)
   Start at  12:41:59
   Duration  927ms (transform 243ms, setup 58ms, import 612ms, tests 96ms, environment 0ms)
```

```text
$ npm run test:config

> @orkestrel/test@0.0.1 test:config
> vitest run --config vite.config.ts --no-cache --reporter=dot --project config


 RUN  v4.1.10 /home/user/test

··········

 Test Files  1 passed (1)
      Tests  10 passed (10)
   Start at  12:42:03
   Duration  1.34s (transform 232ms, setup 52ms, import 406ms, tests 731ms, environment 0ms)
```

5. Permanent dangling-link test:

```text
$ npm run test:src:server

> @orkestrel/test@0.0.1 test:src:server
> vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server


 RUN  v4.1.10 /home/user/test

···························

 Test Files  2 passed (2)
      Tests  27 passed (27)
   Start at  12:40:18
   Duration  380ms (transform 344ms, setup 130ms, import 290ms, tests 35ms, environment 0ms)
```

The three-row output is under **Reproduction**.

6. The half-delay mutation failed with 1 failed and 22 passed. The restored source passed with 23 tests. Both outputs are under **Red-then-green**.

7. Final tree state:

```text
$ git status --porcelain
 M src/server/factories.ts
 M src/server/types.ts
 M tests/src/core/helpers.test.ts
 M tests/src/server/factories.test.ts
```

```text
$ find tmp -mindepth 1 -print
tmp/probe
```

```text
$ git diff --exit-code -- src/core/helpers.ts
```

Exit 0 with no stdout.

**Deviations**

The requested restore command failed:

```text
$ git checkout -- src/core/helpers.ts
fatal: Unable to create '/home/user/test/.git/index.lock': Read-only file system
```

The sandbox exposes `.git` as read-only. The exact one-line mutation was restored with `apply_patch`; `git diff --exit-code -- src/core/helpers.ts` exits 0.