# J-BINDER round 7 — the unit's report (`opus` on Opus 5.5, the round-2 native subagent resumed on brief 7, 17 tool uses, 286 s, returned 2026-09-23; retained verbatim from the subagent's return text)

I finished G1 to G5, and every acceptance command exits 0. The G1 proof reads red on the round-6 source and green after. The G2 proof passed on the round-6 source too, so it has no red-first reading. It pins behaviour the code already had, and the three mutations under G2 each redden it.

The overlap proof also answers Unknown 1: the element ends with the value the restoration that started first recorded, not the element's true original. The contract sentence says exactly that, so I did not stop. Whether that is the right precedence stays with J-COLLAPSE.

After the acceptance run, I rewrapped the rule paragraph in the guide (prose only). I re-ran the format check, guide parity and `git diff --check` after that edit; all pass. The tree-wide typecheck still fails only on the three app files the unapplied round-2 patches fix. No report-only patch is applied.

# J-BINDER round 7 report (`opus` on Opus 5.5, worktree `C:/Users/mikes/WebstormProjects/veneer-binder`, branch `unit/binder`, tip `cea3359`)

## Edits and the findings they close

- **G1 (claim 3): the event detail comes from the read after the attribute write.** `Button.toggle` now reads `this.pressed` three times, once after each reaction-capable step:
  - **After the token write:** the read is written to `aria-pressed`.
  - **After the lifetime check that follows the attribute write:** the read is dispatched as the event detail.
  - **After the dispatch:** the read is returned.

  The comment in `toggle` and the guide's Button sentence say the same. This closes the Orchestrator's reproduction, where the details read `[false, true]`.
- **G2 (R2): the overlap precedence has a proof.** The new `HostSnapshot.test.ts` case uses two snapshots a consumer constructs on one element:
  - `earlier` saves `data-state` while it reads `original`, and the host then writes `earlier`.
  - `started` saves the token `show` and `data-state` (which then reads `earlier`), and the host writes `show` and `started`.
  - `started.restore()` runs first. A `class` reaction to its token write calls `earlier.restore()` and records `data-state`.
  - The proof asserts that the nested call wrote nothing (the reading is `started`), that the element ends at `earlier` (`started`'s recorded value), and that a later snapshot reads the live element, so no entry remained.
- **G3 (R1): the rule paragraph names the third door.** In the guide's § Ownership and restoration:
  - A custom element's reaction is said to run inside child-list writes as well as attribute, class and style writes.
  - `focus()` and `showPopover()` are named as dispatching their events synchronously, so they are instances of the listener door.
  - The paragraph now names `await` as the third door. The landed sentences are quoted under Unknown 2.
- **G4: one owner phrasing.** `HostSnapshot.ts`, `types.ts` and the guide now read "The snapshot owns what its restoration publishes…". The brief's owner sweep returns only one form: the private comment "the snapshot that owns" in `HostSnapshot.ts`.
- **G5: the round-7 instrument.** It carries round 6's rows with the three Button rows re-anchored to the new `toggle`, plus the G1 row and three G2 rows. Each row is named once, and there was no re-run list this round.

## Red and green readings

| Proof | Red on round 6 | Green |
| --- | --- | --- |
| Button: "dispatches the state the host carries when a reaction to its aria-pressed write toggles again" | `expected [ false, true ] to deeply equal [ false, false ]` | green |
| HostSnapshot: "lets the restoration that started first write a target two snapshots saved, whichever saved it first" | none: it passed on round 6, because it pins existing behaviour | green; each G2 mutation reddens it |

The red run over the full browser project read `Test Files 1 failed | 7 passed (8)` and `Tests 1 failed | 137 passed (138)`. The green run is the acceptance run below, at `Tests 138 passed (138)`. The Button proof asserts the host ends without its token and with `aria-pressed="false"`, that both details read `false`, and that both returns read `false`.

## Unknowns

1. **The element ends with `earlier`.** That is the value `started` recorded, which is the value `earlier` wrote, not the element's original `original`. The code does what the sentence says, "the restoration that started first writes it back", so there was no stop.
   - For this ordering the first-started rule does not restore the oldest original. The snapshot that saved first held `original`.
   - A rule that gave the target to whichever snapshot saved first would restore `original` here. I leave that choice to J-COLLAPSE, as you expected.
2. **Yes, the third door can be stated without naming a component.** The landed sentences:
   > A sequence that awaits meets a third door at each `await`, because any code can run before it resumes: after each `await` it reads its lifetime and the host again the same way, stopping and resolving `false` when the engine was destroyed, and it also stops when the host shows that another call has taken the change over. Each engine's own subsection states what that reads as for its host.

## Mutation rows

The instrument is `binder7-mutate.mjs` with list `binder7-mutations.json`, and the results are in `binder7-mutation-results.json`. The source was confirmed restored byte for byte after the run.

| Mutation | Proofs reddened (tally) |
| --- | --- |
| Button: the event detail from the read before the `aria-pressed` write (G1) | the G1 proof (1/43) |
| HostSnapshot: `#withdraw` compares presence instead of the owner (G2) | the overlap proof (1/14) |
| HostSnapshot: `#writeBack` compares presence instead of the owner (G2) | the overlap proof (1/14); its reading inside the reaction becomes `original` |
| HostSnapshot: a publish replaces an entry another restoration owns | the overlap proof (1/14) |
| Button: `aria-pressed` and the detail from the stale token-write result | both re-entered-toggle proofs (2/43) |
| Button: the return from the value read before the dispatch | the listener-destruction case (1/43) |
| ColorMode: storage written from the stale mode | 1/18 |
| HostSnapshot: the owner comparison removed from the write back | 6/80; it now also reddens the overlap proof |
| HostSnapshot: the `finally` block withdraws nothing | the throwing-write proof (1/14) |
| Button: no re-check after the token write / after the `aria-pressed` write; ColorMode: no re-check | 1/43, 1/43, 1/18 |
| HostSnapshot: a nested restore withdraws every entry on the element | 2/14; it now also reddens the overlap proof |
| HostSnapshot: attributes before tokens | 6/57; it now also reddens the overlap proof |
| HostSnapshot: a written target not withdrawn / never takes its own entry / pending original not taken / class-attribute record not handed over | 1/80, 1/14, 6/80, 4/80 |
| Button: restore before releasing the claim | 6/66 |
| Delegate, resolveOptions, resolveVocabulary, recordCalls rows | the same proofs as in round 6 |

## Acceptance criteria (verbatim)

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
Finished in 5129ms on 21 files using 16 threads.
exit 0
$ npm run test:src:browser
npm notice run @orkestrel/veneer@0.0.1 test:src:browser
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-binder
 Test Files  8 passed (8)
      Tests  138 passed (138)
   Start at  18:36:41
   Duration  1.96s (transform 0ms, setup 330ms, import 83ms, tests 222ms, environment 0ms)
exit 0
$ npm run test:policy
npm notice run @orkestrel/veneer@0.0.1 test:policy
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-binder
 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
   Start at  18:36:44
   Duration  2.18s (transform 107ms, setup 63ms, import 248ms, tests 1.72s, environment 0ms)
exit 0
$ npm run test:guides
npm notice run @orkestrel/veneer@0.0.1 test:guides
npm notice run node --experimental-strip-types tests/guides.test.ts
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-binder
 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  18:36:48
   Duration  1.01s (transform 183ms, setup 63ms, import 752ms, tests 48ms, environment 0ms)
exit 0
$ npm run build:src:browser
npm notice run @orkestrel/veneer@0.0.1 build:src:browser
npm notice run vite build --config configs/src/vite.browser.config.ts
vite v8.3.0 building client environment for production...
transforming...
✓ 11 modules transformed.
rendering chunks...
computing gzip size...
dist/src/browser/index.js  31.66 kB │ gzip: 9.19 kB │ map: 53.32 kB
✓ built in 80ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
exit 0
$ grep -n -i each restoration owns\|the snapshot that owns src/browser/HostSnapshot.ts src/browser/types.ts guides/veneer.md
src/browser/HostSnapshot.ts:37:	// with the snapshot that owns each one and the value it recorded. A value for the `classed` key is
exit 0
$ grep -n await guides/veneer.md
564:from that read. A sequence that awaits meets a third door at each `await`, because any code can run
565:before it resumes: after each `await` it reads its lifetime and the host again the same way,
580:transition that starts when another finishes is awaited as well. No timer and no emulated
exit 0
$ git diff --check
exit 0
```

The `await` line numbers in this run predate the rewrap, and the rewrapped paragraph passed the format check and guide parity again.

## `git status --short` and `git diff --stat` (rounds 2 to 7)

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
 tests/src/browser/HostSnapshot.test.ts | 307 +++++++++++++++++++
 tests/src/browser/Snapshot.test.ts     |  90 ------
 tests/src/browser/helpers.test.ts      | 282 ++++++++++++-----
 tests/src/browser/index.test.ts        |  18 +-
 tests/src/browser/validators.test.ts   |  91 ++++--
 20 files changed, 2190 insertions(+), 717 deletions(-)
```

## Deviation state

There was no stop. The G2 proof has no red-first reading; the three G2 mutation rows bind it instead. The files are in the scratchpad (retained by the Orchestrator beside this report as `j-binder7-<name>`): `binder7-red.log.txt`, `binder7-accept.sh`, `binder7-accept.log.txt`, `binder7-mutate.mjs`, `binder7-mutations.json`, `binder7-mutation-results.json`.
