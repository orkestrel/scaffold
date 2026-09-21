<!-- Retained from u7b-4-last.md. Bench lane: sol on Astra, codex exec workspace-write -C C:/Users/mikes/WebstormProjects/veneer, journal u7b-4.jsonl, thread 01a0c219-dbbc-70e3-aa7f-cac926de5ac1, exit 0, 2026-09-21. The second fix round: the prune key is root membership; the two cases red on the old key and green on the new one; stopped on lint (the toThrowError alias at two sites) with the build and the Edge gate not run. Carried as u7b-brief-5.md. -->

U7b fix-round report — 2026-09-20

Root-membership pruning is implemented, and the regression cases pass on managed Chromium. The assignment is incomplete: `lint:check` exits 1 because the added ownership assertions use `toThrowError` instead of `toThrow`. The build and Edge gates were not run.

Role: `sol` on Astra. HEAD: `91e5906`. Effective brief: `u7b-brief-4.md`. No agents were spawned. No commits, staging, installations, resets, or off-limits edits ran. This round changes `src/browser/Delegate.ts` and `tests/src/browser/Delegate.test.ts`, plus this report.

The key in the working tree is:

```ts
if (this.#root.contains(button.host)) continue
```

Every delegated click retains engines whose hosts belong to its root. Before target matching, it destroys engines outside that root and deletes them from the lookup map and ownership set. The change remains uncommitted.

The case `reuses a fragment-rooted engine across clicks` clicks a detached fragment's host twice. It requires `aria-pressed="false"` and no active class after the second click. Consumer construction refuses with `BUTTON_HOST_OWNED` after each activation. Delegate destruction restores the absent attribute. On the old key, the second click read `"true"` instead of `"false"`.

The case `releases a connected host moved outside the root on a later unrelated click` toggles a host, moves it to a mounted parent outside the delegate root, and confirms that it remains connected. Clicking an unrelated span inside the root restores the original active class and exact `mixed` attribute. A consumer then acquires the host through `new Button(host)`, and delegate destruction leaves that consumer's state intact. On the old key, the active class was not restored.

The cases share this red-then-green pair; only those cases failed in the red run:

```text
npm.cmd run test:src:browser
Old key — exit 1, managed Chromium
Test Files  1 failed | 5 passed (6)
     Tests  2 failed | 41 passed (43)
  Start at  23:56:36
  Duration  1.56s (transform 0ms, setup 95ms, import 180ms, tests 36ms, environment 0ms)

npm.cmd run test:src:browser
Root-membership key — exit 0, managed Chromium
Test Files  6 passed (6)
     Tests  43 passed (43)
  Start at  23:56:44
  Duration  1.56s (transform 0ms, setup 98ms, import 152ms, tests 33ms, environment 0ms)
```

No plant was used. The existing key supplied the red. Every existing Delegate case remained green. The brief declares the `prove` tool blocked; these readings come from the real Vitest browser project, and no probe receipt is claimed.

The final gate readings obtained in this round are:

```text
npm.cmd run format:check
Exit 0
All matched files use the correct format.
Finished in 756ms on 94 files using 16 threads.

npm.cmd run lint:check
Exit 1
tests/src/browser/Delegate.test.ts:47:34: error vitest(no-alias-methods): Unexpected alias "toThrowError" help: Replace "toThrowError" with its canonical name of "toThrow"
tests/src/browser/Delegate.test.ts:53:34: error vitest(no-alias-methods): Unexpected alias "toThrowError" help: Replace "toThrowError" with its canonical name of "toThrow"

npm.cmd run check
Exit 0
npm notice run @orkestrel/veneer@0.0.1 check:app:browser
npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json

npm.cmd run build:src:browser
Not run.

npm.cmd run test:src:browser
Final ordered gate not run; the preceding green regression run supplies its earlier reading.

PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:browser
Not run.
```

The carried deviation contract in `u7b-brief.md` says: “Stop and report on: a gate red after your own fix inside owned files.” Expected: every required gate exits 0. Found: lint rejects the assertion alias in the added fragment case. Done: regression cases and pruning fix, Chromium red and green, formatting, lint, and typecheck readings. Not done: correction of the alias and completion of the ordered gates, including Edge. The diagnostic names the correction. The typecheck command ran in the same tool batch before the lint failure was inspected; no further verification command ran afterward.

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
 tests/src/browser/Delegate.test.ts   | 186 ++++++++++++++++++++++++++++++++++-
 tests/src/browser/index.test.ts      |  11 ++-
 tests/src/browser/validators.test.ts |  70 ++++++++++++-
 tests/src/core/index.test.ts         |   6 +-
 13 files changed, 490 insertions(+), 18 deletions(-)
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

Git also reported `warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied` twice. The status contains the carried owned set; the report is under ignored `tmp/`. The diff statistics compare the working tree against the index and include carried changes.