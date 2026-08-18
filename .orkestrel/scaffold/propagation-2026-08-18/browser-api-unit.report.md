# Unit report: widen browser's frame API

/ Status: **complete, with two deviations to rule on** (acceptance criterion 4 forced `override` to stay
on `BrowserPage.assert`; acceptance criterion 7 names the wrong formatter).

## Step one: assert coverage of the 14 rerouted sites

Verified by reading every caller chain in `/workspace/browser/src/core/BrowserPage.ts`. None of the 14
sits in `#close`, `#destroy`, `#release`, or `#releaseResources` — those four call
`this.#client.send` directly and were untouched.

| # | Site (pre-change line) | CDP method | Reached from | Public entry method | Entry already asserts? |
| - | ---------------------- | ---------- | ------------ | ------------------- | ---------------------- |
| 1 | 249 | `Page.getLayoutMetrics` | `screenshot` | `screenshot` | Yes (245) |
| 2 | 271 | `Page.getLayoutMetrics` | `screenshot` | `screenshot` | Yes (245) |
| 3 | 309 | `Emulation.setDefaultBackgroundColorOverride` | `screenshot` | `screenshot` | Yes (245) |
| 4 | 314 | `Page.captureScreenshot` | `screenshot` | `screenshot` | Yes (245) |
| 5 | 324 | `Emulation.setDefaultBackgroundColorOverride` | `screenshot` `finally` | `screenshot` | Yes (245); the site keeps its own `.catch(() => undefined)` |
| 6 | 334 | `Page.printToPDF` | `pdf` | `pdf` | Yes (333) |
| 7 | 357 | `Page.getFrameTree` | `frames` | `frames`, and `frame` through it | Yes (356) |
| 8 | 364 | `DOMSnapshot.captureSnapshot` | `snapshot` | `snapshot` | Yes (362) |
| 9 | 433 | `Page.navigate` | `#navigate` | `navigate` | Yes, twice (205, 209) |
| 10 | 457 | `Page.reload` | `#reload` | `reload` | Yes, twice (221, 225) |
| 11 | 494 | `Page.getNavigationHistory` | `#navigateHistory` ← `#history` | `back` / `forward` | Yes, twice (473, 477) |
| 12 | 507 | `Page.navigateToHistoryEntry` | `#navigateHistory` ← `#history` | `back` / `forward` | Yes, twice (473, 477) |
| 13 | 734 | `Page.stopLoading` | `#stopLoading` ← the `catch` in `#navigate` / `#reload` / `#navigateHistory` | `navigate` / `reload` / `back` / `forward` | Yes; and `#stopLoading` wraps the call in its own `try`/`catch` that swallows everything, so a new assert throw cannot displace the original navigation error |
| 14 | 553 (`this.raw`) | `Runtime.evaluate` | `#completeNavigation` ← `#navigate` / `#reload` / `#navigateHistory` | `navigate` / `reload` / `back` / `forward` | Yes; this is the one site where a new assert throw propagates to the caller — the accepted close-race delta |

Every one of the 14 is reached only through a public method that already asserts on entry, so the
close-race in site 14 is the whole behavior delta. No guard was added to suppress it.

## Final `BrowserFrameInterface` diff

```diff
- * - `send` — issue a raw CDP method in the frame's current target session
+ * - `send` — issue a raw CDP method in the frame's current target session, with an optional per-call timeout
+ * - `assert` — throw when the frame can no longer accept protocol work
+ * - `update` — record an externally observed URL as the frame's current URL
   */
  export interface BrowserFrameInterface {
@@
- 	send(method: string, params?: Readonly<Record<string, unknown>>): Promise<unknown>
+ 	send(
+ 		method: string,
+ 		params?: Readonly<Record<string, unknown>>,
+ 		timeout?: number,
+ 	): Promise<unknown>
  	subscribe(method: string, handler: CDPHandler): Promise<void>
  	unsubscribe(method: string, handler: CDPHandler): Promise<void>
  	save(path: string, bytes: Uint8Array): Promise<void>
+ 	assert(): void
+ 	update(url: string): void
  }
```

`assert` and `update` sit last so the interface's member order mirrors the class's. Their
documentation follows this file's single convention: `src/core/types.ts` carries zero member-level
TSDoc blocks across every interface in the file (`awk '/^export interface/,/^}/' src/core/types.ts |
grep -c '^\t/\*\*'` → `0`), and documents members as `@remarks` bullets on the interface's own block.
I extended that block rather than introducing two per-member TSDoc blocks that no other member has;
the throw condition, its two throwing classes, and the caller guidance are carried in full by the
guide's `## Methods` rows, which is where `.claude/rules/documentation.md` puts behavioral prose.

## Deviation 1 — `override` must stay on `BrowserPage.assert`

- **Expected:** drop `protected override` from `BrowserPage.assert` (brief, "The ruling" and
  mechanical step 4).
- **Found:** dropping `override` fails acceptance criterion 4 outright.
- **Evidence:** with the keyword removed, `npm run check` reports

  ```text
  src/core/BrowserPage.ts(415,2): error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'BrowserFrame'.
  ```

  `npx tsc --showConfig --project tsconfig.json | grep -i override` → `"noImplicitOverride": true,`
  (inherited, not written in the local `tsconfig.json`).
- **Done:** `protected` is dropped; `override` is restored. `assert` is public. Acceptance criterion 1
  is clean, criterion 3 is clean, criterion 4 exits 0.
- **Hypothesis:** the ruling read `protected override` as one privacy annotation. Only `protected` is
  one; `override` is a checker annotation the repository requires, and the file already keeps it on
  the sibling `override async save`.

This resolution is also what the parity gate needs. `@orkestrel/guide`'s `memberMethods` matches
`/^\t(?:async )?\*?(\w+)(<.*>)?\??\(/`, so an `override` member is excluded from
`source.methods('BrowserPage')`. Without `override`, `assert` enters that set and the guides project
deadlocks: `BrowserPage exposes no undocumented method` demands an `assert` row in the
`BrowserPageInterface` table, while `documents no phantom method` rejects it, because
`BrowserPageInterface` inherits `assert` rather than redeclaring it. Keeping `override` matches how
the inherited-and-overridden `save` is already handled.

## Deviation 2 — acceptance criterion 7 names a formatter this package does not use

- **Expected:** `npx prettier --check` on the owned files passes.
- **Found:** this package formats with `oxfmt`, not prettier. `package.json` line 66:
  `"format": "oxfmt --config .oxfmtrc.json --write ."`. `prettier --check` fails on files this unit
  never touched, so no edit to the owned files can close the criterion as written:

  ```text
  $ npx prettier --check src/core/BrowserHandle.ts src/core/helpers.ts src/core/constants.ts
  [warn] src/core/BrowserHandle.ts
  [warn] src/core/helpers.ts
  [warn] src/core/constants.ts
  ```

- **Done:** satisfied the criterion's intent against the real formatter, scoped to owned files:

  ```text
  $ npx oxfmt --config .oxfmtrc.json --check src/core/BrowserFrame.ts src/core/BrowserPage.ts src/core/types.ts guides/browser.md tests/src/core/BrowserFrame.test.ts tests/src/core/BrowserPage.test.ts
  All matched files use the correct format.   → exit 0
  ```

  `oxfmt` re-padded the `BrowserFrameInterface` methods table to its new widest cell. That reflow is
  confined to `guides/browser.md` and to that one table.

## Test counts

Exact command: `npx vitest run --project src:core`

| When | Test files | Tests |
| ---- | ---------- | ----- |
| Before the change | 21 passed | 336 passed |
| After the rewrite, before new tests | 21 passed | 336 passed |
| Final | 21 passed | **339 passed** |

Exact command: `npx vitest run --project guides` — 53 passed before and 53 passed after (1 file).
Exact command: `npx vitest run --project src:server` — 147 passed (5 files); run because `types.ts`
changed, not required by the criteria.

The three added tests are in `/workspace/browser/tests/src/core/BrowserFrame.test.ts`, one per newly
public or widened member, each named for what it proves:

- `bounds one send with its own timeout instead of the client default` — a client built with a
  600000 ms default, a never-answered `DOM.getDocument`, and a 20 ms per-call argument; it rejects
  with `isCDPTimeoutError`. Real timers only; no fake clock was added, so it introduces no
  `policy(no-mocking)` error.
- `asserts a disconnected frame is unusable before any protocol work` — `assert` does not throw while
  connected and throws `Browser frame is disconnected` after `client.close()`.
- `records an externally observed url as the frame url` — `update` moves `frame.url`.

## Tests whose expectation changed

Four in `/workspace/browser/tests/src/core/BrowserPage.test.ts`, all inside `describe('navigate()')`,
at lines 99, 115, 158, and 178. Each scripted the post-navigation URL read with an exact match:

```ts
scriptEvaluate(transport, (expression) => expression === 'location.href', 'https://example.com/')
```

Changed to `expression.includes('location.href')`.

**Reason.** The old `raw('location.href')` reached `#evaluate` directly and sent the bare expression.
The brief's replacement, `evaluate('location.href')`, wraps it in
`guardEvaluateExpression(expression, BROWSER_RESULT_LIMIT)` first, so the exact match no longer fires,
the fixture never replies, and the four tests time out at 5000 ms. That is a real, intended widening
— the navigation URL read now carries the same result-size guard as every other public `evaluate` —
so the fixture matcher was pinning the unguarded form. `.includes` is this repository's existing
matcher for a guarded expression: `tests/src/core/BrowserNavigationManager.test.ts:33` and `:72`
already read `expression.includes('location.href')`.

Deliberately left as exact matches: the six remaining `expression === 'location.href'` sites in that
file (356, 390, 406, 437, 469, 502) all script `content()`, which still calls `#evaluate` unguarded
through `BrowserFrame`, plus the three in `BrowserFrame.test.ts` (118, 156, 187) for the same reason.

## Unknowns, answered

- **No test referenced `request` or `raw` by name, and none pinned the no-assert behavior.**
  `grep -rn "\.request(\|\.raw(" tests/` returns nothing; the only `'request'` hits are the
  `BrowserPageEventMap` / `BrowserNetworkManager` network event, unrelated.
- **The guide documented neither `request` nor `raw` anywhere.** The summary row at line 245 says
  "raw frame-session CDP access", which describes `send` and still holds; I extended that row to name
  the two added members rather than correcting it. Every other `raw` in `guides/browser.md` is either
  "raw bytes", "raw-CDP", or "raw text frame" — none is a member reference.

## Touched files

| File | Change |
| ---- | ------ |
| `/workspace/browser/src/core/BrowserFrame.ts` | `send` gains `timeout?: number` and forwards it; `request` and `raw` deleted; `protected` dropped from `assert` and `update` |
| `/workspace/browser/src/core/BrowserPage.ts` | 13 `this.request(` → `this.send(`; `this.raw('location.href')` → `this.evaluate('location.href')`; `protected override assert` → `override assert` |
| `/workspace/browser/src/core/types.ts` | `BrowserFrameInterface` gains `assert()` and `update(url)`, `send` gains `timeout?`, `@remarks` extended |
| `/workspace/browser/guides/browser.md` | Two `## Methods` rows added, `send` row restated, summary row 245 restated, fence gains three example lines; table reflowed by `oxfmt` |
| `/workspace/browser/tests/src/core/BrowserFrame.test.ts` | Three tests added; two imports added |
| `/workspace/browser/tests/src/core/BrowserPage.test.ts` | Four fixture matchers loosened to `.includes` |

Diffstat, owned files only:

```text
 guides/browser.md                   |  37 +++++++++++++-----------
 src/core/BrowserFrame.ts            |  24 ++++++---------
 src/core/BrowserPage.ts             |  30 +++++++++----------
 src/core/types.ts                   |  12 ++++++--
 tests/src/core/BrowserFrame.test.ts |  47 +++++++++++++++++++++++++++++
 tests/src/core/BrowserPage.test.ts  |   8 ++---
```

The other dirty paths in `git diff --stat` (`tests/config.test.ts`, `tests/policy.test.ts`,
`tests/setupPolicy.ts`) are the pre-existing vendored-host propagation the brief names as a standing
condition. Untouched.

## Acceptance command exit status

| # | Command | Exit | Result |
| - | ------- | ---- | ------ |
| 1 | `grep -n "protected\|private \|public " src/core/BrowserFrame.ts src/core/BrowserPage.ts` | 1 (no match) | Pass — no accessibility keyword on any class member |
| 2 | `grep -rn "this\.request(\|this\.raw(" src/` | 1 (no match) | Pass — and neither method is declared |
| 3 | `npx oxlint --config .oxlintrc.json --deny-warnings src/` | 0 | Pass — zero errors, no output |
| 4 | `npm run check` | 0 | Pass |
| 5 | `npx vitest run --project src:core` | 0 | Pass — 339 ≥ 336 |
| 6 | `npx vitest run --project guides` | 0 | Pass — 53 |
| 7 | `npx prettier --check <owned files>` | 1 | **Not applicable** — see deviation 2; `npx oxfmt --config .oxfmtrc.json --check <owned files>` exits 0 |

Standing condition confirmed: `npm run lint:check` still fails with exactly 11 errors, all
`policy(no-mocking)` in `tests/src/core/BrowserPage.test.ts` and `tests/src/core/CDPClient.test.ts`
(7 and 4). All 5 `policy(no-keyword-privacy)` errors are gone, and no new error appeared. No
fake-timer call was touched.
