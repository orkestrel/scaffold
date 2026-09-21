<!-- Retained from u7b-6-last.md. Bench lane: sol on Astra, codex exec workspace-write -C C:/Users/mikes/WebstormProjects/veneer, journal u7b-6.jsonl, thread 01a0c225-2cd3-77e0-9611-bb7e36232cbd, exit 0, 2026-09-21. The scoped formatter collapsed the two toThrow calls; every gate exit 0 on Chromium and Edge; the Delegate cases green on both engines. Closes briefs 4 to 6. -->

U7b fix-round report — 2026-09-21

The scoped formatter changed only the two `toThrow` calls. Every required gate exits 0. The browser suite reports 43 passed on managed Chromium and Edge; supplemental Delegate-only runs report 14 passed on each engine, including the brief-4 cases.

Role: `sol` on Astra. HEAD: `91e5906`. Effective brief: `u7b-brief-6.md`. No agents were spawned. The formatter's rewrite of `tests/src/browser/Delegate.test.ts` is this round's only code edit. No commits, staging, installations, resets, wording changes, or guide changes ran.

The formatter command and its result are:

```text
npx.cmd oxfmt --config .oxfmtrc.json --write tests/src/browser/Delegate.test.ts
Exit 0
Finished in 3ms on 1 files using 16 threads.
```

The calls at lines 47 and 51 are identical after formatting:

```ts
		expect(() => new Button(host)).toThrow(expect.objectContaining({ code: 'BUTTON_HOST_OWNED' }))
		expect(() => new Button(host)).toThrow(expect.objectContaining({ code: 'BUTTON_HOST_OWNED' }))
```

I read `git diff -- tests/src/browser/Delegate.test.ts` against the index. That diff includes the carried changes. Comparing the pre-format copy at `tmp/u7b/Delegate.before-format-6.txt` with the formatted file confirms that this round only collapses those calls and removes their trailing argument commas. The comparison exits 1 because the files differ; it is not a gate failure. Its changed lines are:

```diff
-		expect(() => new Button(host)).toThrow(
-			expect.objectContaining({ code: 'BUTTON_HOST_OWNED' }),
-		)
+		expect(() => new Button(host)).toThrow(expect.objectContaining({ code: 'BUTTON_HOST_OWNED' }))
 		host.click()
 		expect(host.getAttribute('aria-pressed')).toBe('false')
 		expect(host.classList.contains('active')).toBe(false)
-		expect(() => new Button(host)).toThrow(
-			expect.objectContaining({ code: 'BUTTON_HOST_OWNED' }),
-		)
+		expect(() => new Button(host)).toThrow(expect.objectContaining({ code: 'BUTTON_HOST_OWNED' }))
```

The required gates completed in the prescribed order. Formatting, lint, typechecking, and the build are shared gates independent of browser selection. Their exit codes and final lines are:

```text
npm.cmd run format:check
Exit 0
All matched files use the correct format.
Finished in 761ms on 94 files using 16 threads.

npm.cmd run lint:check
Exit 0
npm notice run @orkestrel/veneer@0.0.1 lint:check
npm notice run oxlint --config .oxlintrc.json --deny-warnings .

npm.cmd run check
Exit 0
npm notice run @orkestrel/veneer@0.0.1 check:app:browser
npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json

npm.cmd run build:src:browser
Exit 0
dist/src/browser/index.js  8.82 kB │ gzip: 2.76 kB │ map: 14.60 kB
✓ built in 65ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.

npm.cmd run test:src:browser
Exit 0 — managed Chromium
 Test Files  6 passed (6)
      Tests  43 passed (43)
   Start at  00:09:02
   Duration  4.26s (transform 0ms, setup 97ms, import 150ms, tests 32ms, environment 0ms)

cmd /c tmp\u7b\edge.cmd test:src:browser
Exit 0 — Edge, PLAYWRIGHT_CHANNEL=msedge
 Test Files  6 passed (6)
      Tests  43 passed (43)
   Start at  00:09:11
   Duration  7.92s (transform 0ms, setup 105ms, import 151ms, tests 35ms, environment 0ms)
```

The build advisory did not fail the gate. The full ordered output is retained in `tmp/u7b/verification-6.log.txt`.

The dot reporter omits per-file counts. Supplemental runs scoped to `tests/src/browser/Delegate.test.ts` supply those readings:

```text
npm.cmd run test:src:browser -- --reporter=verbose tests/src/browser/Delegate.test.ts
Exit 0 — managed Chromium
 Test Files  1 passed (1)
      Tests  14 passed (14)
   Start at  00:09:37
   Duration  1.12s (transform 0ms, setup 58ms, import 75ms, tests 11ms, environment 0ms)

cmd /c tmp\u7b\delegate-edge-6.cmd
Exit 0 — Edge, PLAYWRIGHT_CHANNEL=msedge
 Test Files  1 passed (1)
      Tests  14 passed (14)
   Start at  00:09:43
   Duration  7.39s (transform 0ms, setup 60ms, import 80ms, tests 11ms, environment 0ms)
```

The supplemental Edge launcher sets `PLAYWRIGHT_CHANNEL=msedge` and invokes the same scoped npm command. Vitest labels the project `src:browser (chromium)` on Edge because Edge uses the Chromium provider; `configs/browsers.ts` selects the requested channel. The verbose output marks `reuses a fragment-rooted engine across clicks`, `releases a connected host moved outside the root on a later unrelated click`, and every other Delegate case as passed in each run.

The actual `git diff --stat` output is:

```text
 guides/veneer.md                     |  31 ++++++
 src/browser/Button.ts                |  18 +++-
 src/browser/Delegate.ts              |  16 ++-
 src/browser/constants.ts             |   9 ++
 src/browser/index.ts                 |   3 +
 src/browser/types.ts                 |  46 +++++++++
 src/browser/validators.ts            |  45 ++++++++-
 src/core/index.ts                    |   1 +
 tests/src/browser/Button.test.ts     |  66 ++++++++++++-
 tests/src/browser/Delegate.test.ts   | 182 ++++++++++++++++++++++++++++++++++-
 tests/src/browser/index.test.ts      |  11 ++-
 tests/src/browser/validators.test.ts |  70 +++++++++++++-
 tests/src/core/index.test.ts         |   6 +-
 13 files changed, 486 insertions(+), 18 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output is:

```text
 M guides/veneer.md
AM src/browser/Button.ts
AM src/browser/Delegate.ts
 M src/browser/constants.ts
A  src/browser/helpers.ts
 M src/browser/index.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M src/core/index.ts
AM tests/src/browser/Button.test.ts
AM tests/src/browser/Delegate.test.ts
A  tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
 M tests/src/core/index.test.ts
?? src/core/errors.ts
?? tests/src/core/errors.test.ts
```

Git also reports `warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied` twice. Every status path belongs to brief 3's carried owned set. Reports and instruments remain under ignored `tmp/`. The ordinary diff compares the working tree against the index and includes carried changes; staged-only additions and untracked files are absent from its statistics. The actual diff is retained in `tmp/u7b/changes-6.diff`. `git diff --check` exits 0. No unresolved deviation remains within this brief's scope.