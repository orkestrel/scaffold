<!-- Retained from u7b-3-last.md. Bench lane: sol on Astra, codex exec workspace-write -C C:/Users/mikes/WebstormProjects/veneer, journal u7b-3.jsonl, thread 01a0c1ee-e5ae-7b61-a1a7-e4c780920eba, exit 0, 2026-09-21. The fix round: the anchor write-order case, the delegate leaving an owned host to its owner, the disconnected-host pruning, the guide's parity minimum; every gate exit 0 on Chromium and Edge. -->

U7b fix-round report — 2026-09-20

The carried findings are closed. Every required gate exits 0. The browser proofs pass on managed Chromium and Edge, with no listener errors in the ownership cases.

Role: `sol` on Astra. HEAD: `91e5906`. Effective brief: `u7b-brief-3.md`. This report supplements reports 1 and 2. No agents were spawned. No commits, staging, installations, resets, or off-limits edits ran.

**Finding 1 — anchor mutation order**

The added case “writes the anchor class before aria-pressed and dispatches after the mutations” constructs an anchor with `role="button"`. Its hook records `MutationObserver.takeRecords()` at event delivery. The assertions require class-before-attribute mutations for pressing and releasing, the corresponding event detail, and no pending mutations after delivery.

The control reversed the writes only for anchor hosts. The command and results were:

```text
npm.cmd run test:src:browser
Red: exit 1
Test Files  1 failed | 5 passed (6)
     Tests  1 failed | 36 passed (37)

Green after restoration: exit 0
Test Files  6 passed (6)
     Tests  37 passed (37)
```

Only the anchor-order case failed. It received `aria-pressed` before `class`. The instrument `tmp/u7b/order-3.mjs` saved and restored the original bytes of `src/browser/Button.ts`. Buffer equality after restoration was true. The restored file and its final reading share this SHA256:

```text
049dd6357d4764c4d79aef815e2c6fdcc59c2abbb2353ed3e227db11146c8b61
```

The logs are `tmp/u7b/finding-1-red.log.txt` and `tmp/u7b/finding-1-green.log.txt`. No plant remains.

**Finding 2 — ownership refusal inside delegation**

The delegated constructor boundary catches only an `AppError` carrying `BUTTON_HOST_OWNED` and returns without acquiring or toggling the host. It uses the existing core guard. No ownership reader or public contract was added. The obsolete ownership prerequisite in the class remark was changed to describe leaving the host to its owner.

The cases “leaves a consumer-owned host to its owner without a listener error” and “leaves nested-root activation to the delegate that owns the host without a listener error” record browser error events and require an empty record. They also prove event totals, state, click cancellation for the consumer-owned host, and destruction without releasing another owner's engine.

The command and results were:

```text
npm.cmd run test:src:browser
Red before the fix: exit 1
Test Files  1 failed | 5 passed (6)
     Tests  2 failed | 37 passed (39)

Green after the fix: exit 0
Test Files  6 passed (6)
     Tests  39 passed (39)
```

The failing assertions recorded `BUTTON_HOST_OWNED` errors from the delegated listener. No plant was needed. The logs are `tmp/u7b/finding-2-red.log.txt` and `tmp/u7b/finding-2-green.log.txt`.

**Finding 3 — detached-host cleanup**

Every delegated click first walks the held engines. An engine whose host has `isConnected === false` is destroyed and removed from the lookup map and ownership set before target matching.

The cleanup case removes an active anchor and a button from a mounted root, then clicks an unrelated span. It requires restoration of the anchor's original active class and exact `mixed` attribute, restoration of the button's absent attribute, preservation of a connected host's state, and acquisition by a consumer-held replacement. Delegate destruction leaves that replacement intact. A separate case reinserts a pruned host and proves that delegation constructs a working replacement.

The existing reuse, disabled-existing-engine, and listener-release fixtures mount their roots so those cases retain connected hosts under the specified pruning rule.

The command and results were:

```text
npm.cmd run test:src:browser
Red before the fix: exit 1
Test Files  1 failed | 5 passed (6)
     Tests  2 failed | 39 passed (41)

Green after the fix: exit 0
Test Files  6 passed (6)
     Tests  41 passed (41)
```

The failures showed unrestored detached state and a retained attribute after the later click. No plant was needed. The cleanup case's title was corrected after the red run to “restores removed hosts on a later unrelated click and releases their ownership”; its assertions remained unchanged. The logs are `tmp/u7b/finding-3-red.log.txt` and `tmp/u7b/finding-3-green.log.txt`.

**Finding 4 — guide parity**

The guide gains Surface rows whose summaries equal their source description paragraphs, plus method tables keyed by `ButtonInterface` and `DelegateInterface`. The former lists `toggle` and `destroy`; the latter lists `destroy`. No other guide prose changed.

The Surface names added are:

`AppError`, `isAppError`, `BUTTON_ACTIVE`, `BUTTON_SELECTOR`, `BUTTON_TOGGLE`, `Button`, `ButtonDetail`, `ButtonEventMap`, `ButtonHooks`, `ButtonInterface`, `ButtonOptions`, `Delegate`, `DelegateInterface`, `DelegateOptions`, `bindEventMap`, `emitEvent`, `isButtonEvent`, `isButtonHost`.

The command and results were:

```text
npm.cmd run test:guides
Red before the rows: exit 1
Test Files  1 failed (1)
     Tests  1 failed | 17 passed (18)

Green after the rows: exit 0
Test Files  1 passed (1)
     Tests  18 passed (18)

npm.cmd run test:src:browser
After the guide change: exit 0
Test Files  6 passed (6)
     Tests  41 passed (41)
```

The red case was “documents every barrel export”. No parity assertion was weakened or changed. No plant was needed. The logs are `tmp/u7b/finding-4-red.log.txt`, `tmp/u7b/finding-4-green.log.txt`, and `tmp/u7b/finding-4-browser.log.txt`.

The brief declares the `prove` tool blocked. These readings use the real Vitest projects; no probe receipt is claimed. The red runs used managed Chromium. The restored implementation and regression cases pass on Chromium and Edge.

**Final gates**

Preliminary checks reported formatting in the added guide rows and the lint-required `ReadonlyArray` spelling in the anchor recorder's type. Those issues were corrected within the owned changes. The final ordered gate readings follow. Formatting, lint, typechecking, the build, core tests, and guide tests are shared gates independent of browser selection.

```text
npm.cmd run format:check
Exit 0
All matched files use the correct format.
Finished in 758ms on 94 files using 16 threads.

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
dist/src/browser/index.js  8.81 kB │ gzip: 2.77 kB │ map: 14.57 kB
✓ built in 66ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.

npm.cmd run test:src:core
Exit 0
Test Files  2 passed (2)
     Tests  8 passed (8)
  Start at  23:14:44
  Duration  228ms (transform 75ms, setup 61ms, import 74ms, tests 15ms, environment 0ms)

npm.cmd run test:src:browser
Exit 0 — managed Chromium
Test Files  6 passed (6)
     Tests  41 passed (41)
  Start at  23:14:46
  Duration  1.54s (transform 0ms, setup 103ms, import 138ms, tests 32ms, environment 0ms)

npm.cmd run test:setup:browser
Exit 0 — managed Chromium
Test Files  1 passed (1)
     Tests  15 passed (15)
  Start at  23:14:48
  Duration  1.83s (transform 0ms, setup 54ms, import 9ms, tests 872ms, environment 0ms)

npm.cmd run test:guides
Exit 0
Test Files  1 passed (1)
     Tests  18 passed (18)
  Start at  23:14:52
  Duration  545ms (transform 75ms, setup 31ms, import 364ms, tests 5ms, environment 0ms)

PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:browser
Exit 0 — Edge
Test Files  6 passed (6)
     Tests  41 passed (41)
  Start at  23:15:01
  Duration  7.84s (transform 0ms, setup 106ms, import 157ms, tests 36ms, environment 0ms)

PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:setup:browser
Exit 0 — Edge, additional reading
Test Files  1 passed (1)
     Tests  15 passed (15)
  Start at  23:15:11
  Duration  8.10s (transform 0ms, setup 55ms, import 10ms, tests 887ms, environment 0ms)
```

The Edge commands ran through the existing `cmd /c tmp\u7b\edge.cmd <script>` launcher. The final gate commands ran directly after the preliminary chain stopped. Output from the final build onward is retained in `tmp/u7b/verification-3.log.txt`. The build advisory did not fail the gate.

**Working-tree evidence**

The actual `git diff --stat` output is:

```text
 guides/veneer.md                     |  31 ++++++++
 src/browser/Button.ts                |  18 ++++-
 src/browser/Delegate.ts              |  16 ++++-
 src/browser/constants.ts             |   9 +++
 src/browser/index.ts                 |   3 +
 src/browser/types.ts                 |  46 ++++++++++++
 src/browser/validators.ts            |  45 +++++++++++-
 src/core/index.ts                    |   1 +
 tests/src/browser/Button.test.ts     |  66 +++++++++++++++--
 tests/src/browser/Delegate.test.ts   | 135 ++++++++++++++++++++++++++++++++++-
 tests/src/browser/index.test.ts      |  11 ++-
 tests/src/browser/validators.test.ts |  70 +++++++++++++++++-
 tests/src/core/index.test.ts         |   6 +-
 13 files changed, 439 insertions(+), 18 deletions(-)
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

The staged additions predate this round. The ordinary diff stat excludes staged-only additions and untracked files. The report and instruments are under ignored `tmp/`. Every listed path is in the carried owned set or the guide grant.

The `git diff --check` command passes. The manifest, lockfile, and configuration comparison produces no diff. Git reports its existing user-level ignore-file permission warning. The tracked diff against HEAD is retained in `tmp/u7b/changes-3.diff`. No unresolved deviation remains within this brief's scope.