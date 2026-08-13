**Touched files**

- `src/core/helpers.ts`
- `src/server/factories.ts`
- `src/server/helpers.ts`
- `tests/src/core/helpers.test.ts`
- `tests/src/server/factories.test.ts`
- `tests/src/server/helpers.test.ts`

**Diffstat**

```text
 src/core/helpers.ts                |  4 ++--
 src/server/factories.ts            |  7 ++++++-
 src/server/helpers.ts              | 14 ++++----------
 tests/src/core/helpers.test.ts     | 28 +++++++++++++++++++++++++++-
 tests/src/server/factories.test.ts | 21 +++++++++++++++++++++
 tests/src/server/helpers.test.ts   | 21 +++++++++++++++++++--
 6 files changed, 79 insertions(+), 16 deletions(-)
```

**Item-by-item**

1. Replaced both `roundTripJSON` spreads with iteration that pushes one child at a time. Added a 300,000-entry array and object regression test. The pre-fix core run reported 1 failed and 22 passed.
2. `ScratchInterface.read` now identifies directory targets before reading and throws a package-authored error. Exact message: `Scratch path is a directory: ${target}`. For `nested`, this is `Scratch path is a directory: nested`. The pre-fix server run reported the raw `EISDIR` and 2 failed, 24 passed.
3. Removed the absolute-target rejection from `resolveContained`, removed `readInventory`’s absolute-to-relative workaround, and corrected the TSDoc to admit relative or absolute targets.
4. Added proofs for the `requireValue` default message, reader-lock release, negative-zero normalization, directory exclusion, and mode `0700`. Strengthened the timer assertion from `delay / 2` to the requested `delay`.
5. The existing relative and absolute `readInventory` acceptance test remained unchanged and passes.

**Containment re-proof**

The POSIX forms drove the real exports. The Win32 forms applied the same predicate through `node:path/win32`.

```text
POSIX absolute-root: /workspace/root
POSIX normalized-inside: /workspace/root/inside
POSIX absolute-lexical-escape: undefined
POSIX prefix-control: undefined
POSIX_REALPATH_ESCAPE Directory outside root: /tmp/sol4-containment-J5F4wt/root/link/nested
WIN32 drive-relative: C:\root\inside
WIN32 cross-drive: undefined
WIN32 same-share-UNC: \\server\share\root\inside
WIN32 cross-share-UNC: undefined
WIN32 prefix-control: undefined

Test Files  1 passed (1)
     Tests  3 passed (3)
```

**Regression proofs**

- Large JSON collections: replace either new child loop with its former spread.
- Directory reads: change the directory condition to `if (false)`.
- Default required-value message: change the default string from `'Value is required'`.
- Reader-lock release: remove `reader.releaseLock()`.
- Negative-zero normalization: change `return parsed` to `return Object.is(parsed, -0) ? value : parsed`.
- Directory exclusion: change `if (excluded.has(key)) continue` to `if (false) continue`.
- Mode `0700`: recreate the allocated directory with `mkdirSync(path, { mode: 0o755 })`.
- Requested timer duration: change `setTimeout(resolve, ms)` to `setTimeout(resolve, ms / 2)`.
- Absolute contained targets: restore `isAbsolute(target) ||` to the refusal predicate.

**Scoped validation**

1. `npx oxfmt --config .oxfmtrc.json --check .` — exit 0

```text
Checking formatting...

All matched files use the correct format.
Finished in 2087ms on 113 files using 4 threads.
```

2. `npx oxlint --config .oxlintrc.json --deny-warnings .` — exit 0

```text
```

3. `npm run check` — exit 0

```text
> @orkestrel/test@0.0.1 check
> tsc --noEmit --project tsconfig.json && npm run check:src

> @orkestrel/test@0.0.1 check:src
> npm run check:src:core && npm run check:src:server

> @orkestrel/test@0.0.1 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json

> @orkestrel/test@0.0.1 check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json
```

4. `npm run test:src` — exit 0

```text
> @orkestrel/test@0.0.1 test:src
> vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core --project src:server

 RUN  v4.1.10 /home/user/test

·················································

 Test Files  4 passed (4)
      Tests  49 passed (49)
   Duration  667ms
```

Per-project counts:

```text
src:core
 Test Files  2 passed (2)
      Tests  23 passed (23)

src:server
 Test Files  2 passed (2)
      Tests  26 passed (26)
```

5. `npm run test:policy` — exit 0

```text
> @orkestrel/test@0.0.1 test:policy
> vitest run --config vite.config.ts --no-cache --reporter=dot --project policy

 RUN  v4.1.10 /home/user/test

··················

 Test Files  1 passed (1)
      Tests  18 passed (18)
   Duration  905ms
```

`npm run test:config` — exit 0

```text
> @orkestrel/test@0.0.1 test:config
> vitest run --config vite.config.ts --no-cache --reporter=dot --project config

 RUN  v4.1.10 /home/user/test

··········

 Test Files  1 passed (1)
      Tests  10 passed (10)
   Duration  1.48s
```

6. `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project probe tmp/probe/sol4-containment.test.ts` — exit 0

```text
 RUN  v4.1.10 /home/user/test

POSIX absolute-root: /workspace/root
POSIX normalized-inside: /workspace/root/inside
POSIX absolute-lexical-escape: undefined
POSIX prefix-control: undefined
POSIX_REALPATH_ESCAPE Directory outside root: /tmp/sol4-containment-J5F4wt/root/link/nested
WIN32 drive-relative: C:\root\inside
WIN32 cross-drive: undefined
WIN32 same-share-UNC: \\server\share\root\inside
WIN32 cross-share-UNC: undefined
WIN32 prefix-control: undefined

 ✓ |probe| tmp/probe/sol4-containment.test.ts > containment re-proof > reports the POSIX lexical forms 3ms
 ✓ |probe| tmp/probe/sol4-containment.test.ts > containment re-proof > reports the POSIX realpath escape 2ms
 ✓ |probe| tmp/probe/sol4-containment.test.ts > containment re-proof > reports the win32 drive and UNC forms 1ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Duration  278ms
```

7. Every `tmp/probe/sol4-*` file was deleted. `find tmp -mindepth 1` — exit 0

```text
tmp/probe
```

**Deviations**

none