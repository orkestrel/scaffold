<!-- Retained from u7b-2-last.md. Bench lane: sol on Astra, codex exec workspace-write -C C:/Users/mikes/WebstormProjects/veneer, journal u7b-2.jsonl, thread 01a0c1de-e09c-7c51-a98c-540ba05517ab, exit 0, 2026-09-21. The error contract: AppError and isAppError in src/core/errors.ts; every gate exit 0 on Chromium and Edge. -->

U7b successor report — 2026-09-20

The error-contract correction is implemented. Every required gate exits 0, including the browser proofs on managed Chromium and Edge.

Role: `sol` on Astra. Baseline: `91e5906`. Effective brief: `u7b-brief-2.md`. This report supplements `u7b-report.md`. No agents were spawned, and no commits, installations, staging, resets, or off-limits edits ran.

The `src/core/errors.ts` module exports the following class and guard; the declarations are reproduced without their TSDoc blocks.

```ts
export class AppError extends Error {
	readonly code: string
	readonly context?: Readonly<Record<string, unknown>>

	constructor(
		message: string,
		code: string,
		context?: Readonly<Record<string, unknown>>,
		options?: ErrorOptions,
	) {
		super(message, options)
		this.name = 'AppError'
		this.code = code
		if (context !== undefined) this.context = context
	}
}

export function isAppError(value: unknown): value is AppError {
	try {
		return value instanceof AppError
	} catch {
		return false
	}
}
```

The optional native `ErrorOptions` argument forwards `cause` through `super`. The class supplies the public error shape; no separate interface is needed, so `src/core/types.ts` remains untouched. The core barrel star-exports `errors.ts`. The browser implementation imports `AppError` from the core barrel, and the browser proofs import `isAppError` there. The browser barrel re-exports neither name. Its built entry imports the shared class from `../core/index.js`.

The constructor refusals carry these diagnostics.

| Refusal | Code | Context |
| --- | --- | --- |
| Invalid host | `BUTTON_HOST_INVALID` | `{ tag }`, using the element's `tagName` when readable; `undefined` when no tag is available |
| Host already owned | `BUTTON_HOST_OWNED` | `{ tag: host.tagName }` |

The browser case asserts the guard, codes, and contexts for a null host, an SVG host, duplicate ownership, and ownership after reconstruction. The core cases prove the message, code, context, name, `AppError`/`Error` inheritance, native cause, absent context, and guard refusals for a native error, a coded object, `undefined`, `null`, and a revoked proxy. A search for `TypeError|throw ` across `src` finds only the constructor's `AppError` throws and no `TypeError`.

The population assertions in `tests/src/core/index.test.ts` gain `AppError` and `isAppError` in these cases:

- “imports without registering a listener on the global, in a host with no document”;
- “exports the token registry and application errors”, renamed from “exports the token registry alone” because the asserted surface grew.

The refusal regression ran before and after the constructor change with this exact command.

```text
npm.cmd run test:src:browser -- -t "refuses invalid hosts and concurrent ownership then permits reconstruction"
Before: exit 1
Test Files  1 failed | 5 skipped (6)
     Tests  1 failed | 35 skipped (36)
Received TypeError where the isAppError assertion required AppError.

After: exit 0
Test Files  1 passed | 5 skipped (6)
     Tests  1 passed | 35 skipped (36)
```

The brief declares `prove` blocked; no probe receipt is claimed. This regression establishes that the refusal assertion detects the former native error. The full browser suites following it skip nothing.

The initial typecheck reported TS2412 for assigning `undefined` to the optional context property under `exactOptionalPropertyTypes`. The constructor now assigns context only when supplied. After that fix, the ordered gate chain restarted at formatting and produced the following final lines.

```text
npm.cmd run format:check
Exit 0
All matched files use the correct format.
Finished in 754ms on 94 files using 16 threads.

npm.cmd run lint:check
Exit 0
npm notice run @orkestrel/veneer@0.0.1 lint:check
npm notice run oxlint --config .oxlintrc.json --deny-warnings .

npm.cmd run check
Exit 0
npm notice run @orkestrel/veneer@0.0.1 check:app:browser
npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json

npm.cmd run build:src:core
Exit 0
✓ built in 67ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
npm notice run @orkestrel/veneer@0.0.1 copy
npm notice run node -e "const fs=require('node:fs'),p=require('node:path'),a=process.argv[1],b=process.argv[2];fs.mkdirSync(p.dirname(b),{recursive:true});fs.cpSync(a,b,{force:true});console.log('Copied: '+a+' to '+b)" dist/src/core/index.d.ts dist/src/core/index.d.cts
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts

npm.cmd run build:src:browser
Exit 0
dist/src/browser/index.js  8.50 kB │ gzip: 2.69 kB │ map: 13.98 kB
✓ built in 65ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.

npm.cmd run test:src:core
Exit 0
Test Files  2 passed (2)
     Tests  8 passed (8)
  Start at  22:54:34
  Duration  256ms (transform 78ms, setup 54ms, import 101ms, tests 43ms, environment 0ms)

npm.cmd run test:src:browser
Exit 0 — managed Chromium
Test Files  6 passed (6)
     Tests  36 passed (36)
  Start at  22:54:40
  Duration  1.53s (transform 0ms, setup 99ms, import 143ms, tests 29ms, environment 0ms)

npm.cmd run test:setup:browser
Exit 0 — managed Chromium
Test Files  1 passed (1)
     Tests  15 passed (15)
  Start at  22:54:46
  Duration  1.86s (transform 0ms, setup 52ms, import 10ms, tests 874ms, environment 0ms)

PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:browser
Exit 0 — Edge
Test Files  6 passed (6)
     Tests  36 passed (36)
  Start at  22:54:53
  Duration  7.82s (transform 0ms, setup 99ms, import 142ms, tests 30ms, environment 0ms)
```

The Edge command ran as `cmd /c tmp\u7b\edge.cmd test:src:browser`; that existing launcher sets `PLAYWRIGHT_CHANNEL=msedge` and returns npm's exit code. Formatting, lint, typechecking, builds, and core tests are shared gates rather than browser-engine runs. The build advisory did not fail either build.

The actual `git diff --stat` output is:

```text
 src/browser/Button.ts                | 18 ++++++++--
 src/browser/constants.ts             |  9 +++++
 src/browser/index.ts                 |  3 ++
 src/browser/types.ts                 | 46 ++++++++++++++++++++++++
 src/browser/validators.ts            | 45 ++++++++++++++++++++++-
 src/core/index.ts                    |  1 +
 tests/src/browser/Button.test.ts     | 28 ++++++++++++---
 tests/src/browser/index.test.ts      | 11 +++++-
 tests/src/browser/validators.test.ts | 70 +++++++++++++++++++++++++++++++++++-
 tests/src/core/index.test.ts         |  6 ++--
 10 files changed, 224 insertions(+), 13 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output is:

```text
AM src/browser/Button.ts
A  src/browser/Delegate.ts
 M src/browser/constants.ts
A  src/browser/helpers.ts
 M src/browser/index.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M src/core/index.ts
AM tests/src/browser/Button.test.ts
A  tests/src/browser/Delegate.test.ts
A  tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
 M tests/src/core/index.test.ts
?? src/core/errors.ts
?? tests/src/core/errors.test.ts
```

The staged additions predate this run. The ordinary diff stat excludes staged-only additions and untracked files. Every listed path belongs to brief 1's owned set or the successor grants. The report and instruments reside under ignored `tmp/`. Git also reports its existing user-level ignore-file permission warning; the status command exits 0. The `git diff --check` command exits 0.

The actual tracked diff against HEAD is retained in `tmp/u7b/changes-2.diff`; Git-generated addition diffs are `tmp/u7b/errors-2.diff` and `tmp/u7b/errors-test-2.diff`. Gate output from lint onward is retained in `tmp/u7b/verification-2.log.txt`; the formatting reading is transcribed in this report. No unresolved deviation remains within the successor scope.