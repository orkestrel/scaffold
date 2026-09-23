# J-BINDER round 8 — the unit's report (`opus` on Opus 5.5, the round-2 native subagent resumed on brief 8, 7 tool uses, 112 s, returned 2026-09-23; retained verbatim from the subagent's return text)

I finished H1 to H4, and every acceptance command exits 0. Both H4 sweeps read as the brief requires: the owner sweep finds nothing, and the phrase sweep finds the rule paragraph. The strengthened overlap case passes, and each of the three G2 mutations still reddens it.

The tree-wide `tsc --noEmit -p tsconfig.json` still fails, but only on the three app files that the unapplied round-2 patches fix. No report-only patch is applied.

# J-BINDER round 8 report (`opus` on Opus 5.5, worktree `C:/Users/mikes/WebstormProjects/veneer-binder`, branch `unit/binder`, tip `cea3359`)

## H1: the takeover stop applies at every door

In `guides/veneer.md` § Ownership and restoration, I replaced the rule paragraph's `await` sentences with these:

> A sequence that awaits meets a third door at each `await`, because any code can run before it resumes. At each of its doors (every write, dispatch, and `await`) it reads its lifetime and the host again, and it stops, an asynchronous sequence resolving `false`, when the engine was destroyed or when the host shows that another call has taken the change over. Each engine's own subsection states what that reads as for its host.

The synchronous stop sentence before them is unchanged. I rewrapped the paragraph to the guide's line width.

## H2: every owner sentence names the snapshot

Two comments in `HostSnapshot.ts` changed.

- The `#publish` comment now reads:
  > Publishes one value a restoration has still to write back, unless another snapshot already owns that target on the element; the restoration that started first writes it.
- The `#take` comment's last clause was caught by the ` own ` pattern. It now reads:
  > …a snapshot saving while it restores takes back its own entry the same way.

The single-line grep missed the `#publish` comment because it wraps across two lines. I also swept `HostSnapshot.ts`, `types.ts`, and the guide with a script that joins wrapped lines, and it found no hit.

## H3: the overlap case's last assertion

In the case "lets the restoration that started first write a target two snapshots saved, whichever saved it first", the host now writes `data-state="live"` before the later snapshot saves. The host still writes `later` after the save, and the final assertion is `toBe('live')`. A leaked pending entry would restore `earlier` instead, so the assertion now tells the two apart.

- **Green reading:** `npm run test:src:browser -- tests/src/browser/HostSnapshot.test.ts` gives `Tests  14 passed (14)`.
- **G2 rows after the change:** results are in `binder8-mutation-results.json`, and the source was restored byte for byte after the run.

| Mutation | Result |
| --- | --- |
| HostSnapshot: `#withdraw` compares presence instead of the owner | the overlap case fails (`1 failed \| 13 passed (14)`) |
| HostSnapshot: `#writeBack` compares presence instead of the owner | the overlap case fails (`1 failed \| 13 passed (14)`) |
| HostSnapshot: a publish replaces an entry another restoration owns | the overlap case fails (`1 failed \| 13 passed (14)`) |

## H4: the round-8 sweeps

Both sweeps run inside the acceptance log that follows, with their output:

- The owner sweep (`restoration[a-z ]* owns` or `restoration[a-z ]* own `) returns no hit (exit 1).
- `grep -n "every write, dispatch, and" guides/veneer.md` returns line 565 of the rule paragraph.

## Acceptance criteria (verbatim, including the H4 sweeps)

```text
$ npm run check:src:browser
npm notice run @orkestrel/veneer@0.0.1 check:src:browser
npm notice run tsc --noEmit -p configs/src/tsconfig.browser.json
exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser tests/setupBrowser.ts
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser tests/setupBrowser.ts
exit 0
$ npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser tests/setupBrowser.ts guides/veneer.md
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser tests/setupBrowser.ts guides/veneer.md
Checking formatting...
All matched files use the correct format.
Finished in 5151ms on 21 files using 16 threads.
exit 0
$ npm run test:src:browser
npm notice run @orkestrel/veneer@0.0.1 test:src:browser
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-binder
 Test Files  8 passed (8)
      Tests  138 passed (138)
   Start at  18:51:44
   Duration  2.00s (transform 0ms, setup 360ms, import 87ms, tests 206ms, environment 0ms)
exit 0
$ npm run test:policy
npm notice run @orkestrel/veneer@0.0.1 test:policy
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-binder
 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
   Start at  18:51:47
   Duration  2.19s (transform 107ms, setup 64ms, import 245ms, tests 1.73s, environment 0ms)
exit 0
$ npm run test:guides
npm notice run @orkestrel/veneer@0.0.1 test:guides
npm notice run node --experimental-strip-types tests/guides.test.ts
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-binder
 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  18:51:50
   Duration  1.04s (transform 191ms, setup 63ms, import 788ms, tests 47ms, environment 0ms)
exit 0
$ npm run build:src:browser
npm notice run @orkestrel/veneer@0.0.1 build:src:browser
npm notice run vite build --config configs/src/vite.browser.config.ts
vite v8.3.0 building client environment for production...
transforming...
✓ 11 modules transformed.
rendering chunks...
computing gzip size...
dist/src/browser/index.js  31.66 kB │ gzip: 9.19 kB │ map: 53.30 kB
✓ built in 79ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
exit 0
$ grep -n -i restoration[a-z ]* owns\|restoration[a-z ]* own  src/browser/HostSnapshot.ts src/browser/types.ts guides/veneer.md
exit 1
$ grep -n every write, dispatch, and guides/veneer.md
565:resumes. At each of its doors (every write, dispatch, and `await`) it reads its lifetime and the
exit 0
$ git diff --check
exit 0
```

## `git status --short` and `git diff --stat` (rounds 2 to 8)

```text
 M guides/veneer.md
 M src/browser/Button.ts
 M src/browser/ColorMode.ts
 M src/browser/Delegate.ts
 A src/browser/HostSnapshot.ts
 D src/browser/Snapshot.ts
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/index.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M tests/setupBrowser.ts
 M tests/src/browser/Button.test.ts
 M tests/src/browser/ColorMode.test.ts
 M tests/src/browser/Delegate.test.ts
 A tests/src/browser/HostSnapshot.test.ts
 D tests/src/browser/Snapshot.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
```

```text
 guides/veneer.md                       | 540 +++++++++++++++++++--------------
 src/browser/Button.ts                  |  67 ++--
 src/browser/ColorMode.ts               |  57 ++--
 src/browser/Delegate.ts                |  99 ++++--
 src/browser/HostSnapshot.ts            | 204 +++++++++++++
 src/browser/Snapshot.ts                |  80 -----
 src/browser/constants.ts               |  46 +--
 src/browser/helpers.ts                 | 167 +++++-----
 src/browser/index.ts                   |   2 +-
 src/browser/types.ts                   |  56 +++-
 src/browser/validators.ts              |  68 ++++-
 tests/setupBrowser.ts                  |  63 +++-
 tests/src/browser/Button.test.ts       | 319 ++++++++++++++++++-
 tests/src/browser/ColorMode.test.ts    |  85 +++++-
 tests/src/browser/Delegate.test.ts     | 266 +++++++++++++++-
 tests/src/browser/HostSnapshot.test.ts | 308 +++++++++++++++++++
 tests/src/browser/Snapshot.test.ts     |  90 ------
 tests/src/browser/helpers.test.ts      | 282 ++++++++++++-----
 tests/src/browser/index.test.ts        |  18 +-
 tests/src/browser/validators.test.ts   |  91 ++++--
 20 files changed, 2191 insertions(+), 717 deletions(-)
```

There was no stop. These files are in the scratchpad (retained by the Orchestrator beside this report as `j-binder8-<name>`): `binder8-accept.sh`, `binder8-accept.log.txt`, `binder8-mutate.mjs`, `binder8-mutations.json`, `binder8-mutation-results.json`.
