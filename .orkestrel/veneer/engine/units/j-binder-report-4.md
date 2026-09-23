# J-BINDER round 4 — the unit's report (returned 2026-09-23 by `opus` on Opus 5.5, the round-2 subagent resumed, 36 tool uses, 506 s; captured from the subagent's final message)

I finished D1 to D6. The fix now lives inside `HostSnapshot` (the "handoff"), and the delegate's hold is gone. Every acceptance command exits 0, and all four new restoration proofs read red on the round-3 source and green after.

The tree-wide `tsc --noEmit -p tsconfig.json` still exits 2 on the three app files, as expected until the round-2 patches land. No report-only patch is applied.

# J-BINDER round 4 report (`opus` on Opus 5.5, worktree `C:/Users/mikes/WebstormProjects/veneer-binder`, branch `unit/binder`, tip `cea3359`)

## Edits and the findings they close

- **D1 (claim 2): the restoration fix moves into the snapshot.**
  - `HostSnapshot` hands pending originals to any snapshot saved during a restoration (exact rule in the next section).
  - `Button.destroy` still aborts, releases the claim, then restores.
  - `Delegate` loses `#held`, `#restore`, and the held drive. `#release` calls `engine.destroy()` directly, and `#activate` drives at once.
  - A click during a restoration now finds no owner, because the claim is released first. It acquires a fresh engine, and that engine's snapshot takes the pending originals.
  - `#settle` is renamed `#unobserve`. The single-use drive helper is folded back into `#activate`.
- **D2: the new proofs, red first.**
  - `HostSnapshot.test.ts`: "hands a pending original to a snapshot saved during a restoration, which then skips that target". It checks the element after both restores, a later restore of the first snapshot, and a later third snapshot.
  - `Button.test.ts`: "hands the originals to an engine constructed at the token write of its restoration". This is the objective lane's interleaving.
  - `Delegate.test.ts`, the subjective lane's R5 cases: "hands the originals to the engine a click acquires while a consumer destroys the delegate engine" and "hands the originals to the engine an inner delegate acquires while the outer one restores the host".
  - The round-3 "holds a click…" proof is deleted with the hold. The other round-3 restoration proofs kept their titles, which no longer mention the hold.
- **D3 (R3): the contract is on the interfaces** (`types.ts`).
  - `HostSnapshotInterface.restore` now reads "Writes every recorded value back, class tokens first and attributes last, and forgets the records." Its remarks state the full write order and the handoff.
  - `ButtonInterface.destroy` now reads "Releases hooks and the host's claim, then restores…".
  - Both § Methods cells follow.
- **D4 (claim 4, F1): the renames.**
  - `AttributeNames<TKey>` is now `AttributeMap<TKey>` in `types.ts`, `helpers.ts`, the § Surface row, and the guide sentence.
  - `ParserMap<T, TKey>` is declared in `types.ts` with TSDoc and a § Surface row, and `resolveOptions` takes it as `parsers`.
  - `CallRecording` is now `CallRecordingInterface` in `tests/setupBrowser.ts`.
  - The fleet-name sweep over `node_modules/@orkestrel/scaffold/dist/host/guides/*.md` found no guide claiming `AttributeMap`, `ParserMap`, or `CallRecordingInterface`.
- **D5 (claim 6, bounds).**
  - The `## Engine` sentence now says a grouped option has an attribute-table key but no top-level option key of that name, so the resolver cannot pair them by one key. The first engine that declares one rules how its attribute projects into the group.
  - The two over-long guide lines are wrapped, one in the `resolveOptions` paragraph and one in § Delegation.
  - **Ruling on the record type:** `HostSnapshot`'s record type and its pending-entry type stay private structural field types. Neither is public or used outside the class. `architecture.md` puts a type in `types.ts` only when it is reusable or public, and a field annotation is not a module-scope declaration.
- **D6 (parity).**
  - Every changed Summary and § Methods cell is updated, and `ParserMap` is added.
  - The § Delegation and § Ownership and restoration paragraphs describe the handoff in place of the hold.
  - The export list is unchanged, because the added names are types only.
  - To meet the brief's sweep literally, `ColorMode.test.ts` asserts `root.attributes.length` in place of the platform method `getAttributeNames()`.

## The handoff rule as implemented

`HostSnapshot` keeps one class-static weak map. It is keyed by element, and then by target key: `category:name`, plus a `classed` key for the element's recorded `class`-attribute bit. Each entry holds the owning snapshot, the recorded value, and the priority.

1. **`restore()`** reads its records and class bits and forgets them.
   - It publishes one entry per target it has to write back. It skips a key that another restoration in progress already owns.
   - It writes tokens, then removes each `class` attribute left empty, then writes properties, then attributes. It writes each target only while it still owns that key.
   - In `finally`, it withdraws every entry it still owns and drops an element's map once it is empty.
2. **`save(target)`** checks for another snapshot's pending entry for the same element and target.
   - If one exists, the saving snapshot records that entry's value and priority instead of reading the element, and deletes the entry. The deletion is how the target is marked as taken over.
   - A token's first save takes the `classed` entry the same way. Otherwise it reads the element as before.
3. **Two layers, each load-bearing.** The handoff fixes what a replacement records. The fixed write order keeps the live state it acts on restored.
   - Mutation "attributes before tokens" reddens the Button proof "releases its host before restoring it, so an engine constructed at the restoration last write keeps its state" with `expected false to be true` on `replacement.pressed`.
   - Under that mutation, a replacement built at the attribute write toggles a pressed token the old engine has not yet removed.

## Red and green readings

The red reading came from `npm run test:src:browser` with the new proofs on the round-3 source: `Test Files 3 failed | 5 passed (8)`, `Tests 4 failed | 123 passed (127)`.

| Proof | Red on round 3 | Green |
| --- | --- | --- |
| HostSnapshot: "hands a pending original to a snapshot saved during a restoration, which then skips that target" | `expected 'false' to be 'second'` | green |
| Button: "hands the originals to an engine constructed at the token write of its restoration" | `expected null to be 'true'` | green |
| Delegate: "…while a consumer destroys the delegate engine" | `expected null to be 'true'` | green |
| Delegate: "…while the outer one restores the host" | `expected null to be 'true'` | green |

The green reading is the acceptance run below: `Tests 127 passed (127)`. I added the third-snapshot clause to the HostSnapshot proof after the red run, so no red-first reading exists for it; the mutation "pending targets never unpublished" reddens it.

## Unknowns

1. **Yes, the handoff covers any engine class on the same host.** It is keyed by element and target, not by engine. The HostSnapshot proof settles it with two bare `HostSnapshot` instances that stand for any two engines, and both nested-delegate paths pass through the same map.
2. **No, an observer delivery cannot interleave with a restoration.**
   - `restore()` runs synchronously. A `MutationObserver` delivery is a microtask and runs only after the stack empties.
   - Only a synchronous reaction, such as a custom element's `attributeChangedCallback`, can save during a restoration. The class remark says so.
   - The round-3 Button proof reads its reaction's result right after the synchronous `destroy()` with no await, and it passes.

## Refreshed setup-test patch (`binder4-setuptest.diff`, superseding `j-binder3-setuptest.diff`)

Retained beside this report as `j-binder4-setuptest.diff`; its hunks are the same as round 3's (the export-list entry and the recorder's proof), and it never names the interface, so the rename does not touch it.

## Mutation rows

The instrument is `binder4-mutate.mjs`, the list is `binder4-mutations.json` with each mutation named once, and the results are in `binder4-mutation-results.json` (retained beside this report as `j-binder4-*`). `sha256sum -c` confirmed the source was restored after the run.

| Mutation | Proofs reddened (tally) |
| --- | --- |
| HostSnapshot: a pending original not taken | all four handoff proofs (4/71) |
| HostSnapshot: a taken target not skipped | all four handoff proofs (4/71) |
| HostSnapshot: the pending targets never unpublished | the HostSnapshot handoff proof, on its later third snapshot (1/9) |
| HostSnapshot: the class-attribute record not handed over | all four handoff proofs (4/71) |
| HostSnapshot: attributes before tokens | the restore-order proof and the Button last-write proof (2/48) |
| Button: restore before releasing the claim (the direct-destroy row) | 5/62: both Button restoration proofs, "drives a live engine…", and both Delegate handoff proofs |
| Delegate: no drop of destroyed engines at a click / at a delivery / observing never stops | "drops an engine a consumer destroyed…" (1/23 each) |
| Delegate: observer never observes | 7/23, including the nested handoff proof |
| Delegate: releases contained hosts too | 3/23 |
| Delegate: no per-click mark | the nested-roots case and the nested handoff proof (2/23) |
| Delegate: never drives a found engine | 9/23 |
| resolveOptions: the attribute table ignored | the replaced-name and coercion proofs (2/26) |
| resolveOptions: an `undefined` constructor value applied | the undefined-skip proof (1/26) |
| resolveVocabulary: an `undefined` supplied value applied | the three `resolveVocabulary` cases (3/26) |
| recordCalls: no call recorded | 3/25, index and Delegate |

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
Finished in 5291ms on 21 files using 16 threads.
exit 0
$ npm run test:src:browser
npm notice run @orkestrel/veneer@0.0.1 test:src:browser
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-binder
 Test Files  8 passed (8)
      Tests  127 passed (127)
   Start at  17:29:45
   Duration  2.01s (transform 0ms, setup 331ms, import 94ms, tests 208ms, environment 0ms)
exit 0
$ npm run test:policy
npm notice run @orkestrel/veneer@0.0.1 test:policy
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-binder
 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
   Start at  17:29:48
   Duration  2.23s (transform 109ms, setup 62ms, import 248ms, tests 1.77s, environment 0ms)
exit 0
$ npm run test:guides
npm notice run @orkestrel/veneer@0.0.1 test:guides
npm notice run node --experimental-strip-types tests/guides.test.ts
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-binder
 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  17:29:52
   Duration  1.02s (transform 184ms, setup 60ms, import 765ms, tests 49ms, environment 0ms)
exit 0
$ npm run build:src:browser
npm notice run @orkestrel/veneer@0.0.1 build:src:browser
npm notice run vite build --config configs/src/vite.browser.config.ts
vite v8.3.0 building client environment for production...
transforming...
✓ 11 modules transformed.
rendering chunks...
computing gzip size...
dist/src/browser/index.js  30.99 kB │ gzip: 9.09 kB │ map: 50.85 kB
✓ built in 79ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
exit 0
$ grep -rn #held\|#restore\|AttributeNames\|CallRecording\b src/browser tests/src/browser tests/setupBrowser.ts guides/veneer.md
exit 1
$ git diff --check
exit 0
```

The brief-4 sweep returns no hit (grep exit 1). The browser run is on Chromium 153.0.8010.12.

## `git status --short` and `git diff --stat` (rounds 2 to 4)

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
 R tests/src/browser/Snapshot.test.ts -> tests/src/browser/HostSnapshot.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
```

`HostSnapshot.ts` changed enough that git now shows the source rename as an add and a delete. I did not touch the index.

```text
 guides/veneer.md                                   | 519 ++++++++++++---------
 src/browser/Button.ts                              |  57 ++-
 src/browser/ColorMode.ts                           |  41 +-
 src/browser/Delegate.ts                            |  99 +++-
 src/browser/HostSnapshot.ts                        | 171 +++++++
 src/browser/Snapshot.ts                            |  80 ----
 src/browser/constants.ts                           |  46 +-
 src/browser/helpers.ts                             | 167 ++++---
 src/browser/index.ts                               |   2 +-
 src/browser/types.ts                               |  50 +-
 src/browser/validators.ts                          |  68 ++-
 tests/setupBrowser.ts                              |  63 ++-
 tests/src/browser/Button.test.ts                   | 170 ++++++-
 tests/src/browser/ColorMode.test.ts                |  37 +-
 tests/src/browser/Delegate.test.ts                 | 266 ++++++++++-
 .../{Snapshot.test.ts => HostSnapshot.test.ts}     |  86 +++-
 tests/src/browser/helpers.test.ts                  | 282 +++++++----
 tests/src/browser/index.test.ts                    |  18 +-
 tests/src/browser/validators.test.ts               |  91 +++-
 19 files changed, 1688 insertions(+), 625 deletions(-)
```

## Deviation state

There was no stop.

- **Remaining edge, not reachable today:** two restorations that overlap on one element and one target. The one that published first keeps the target and writes its own recorded value. Reaching that needs two engine classes on one host both restoring at once, and no second class exists yet.
- **Carried to J-COLLAPSE:** the route half of the mark key, carried there since the round-2 verdict.

## The Orchestrator's reading (2026-09-23)

The Orchestrator's own run over the final tree (`j-binder-gates-4.log.txt`) reads every scoped gate green (127 of 127 on Chromium 153, `test:policy`, `test:guides`, the scoped build), the brief-4 names absent, and the tree-wide `npm run check` red on the three app files alone, which the round-2 app patch closes at integration; `git apply --check` accepts `j-binder4-setuptest.diff`. The "remaining edge" (two restorations overlapping on one element and target, unreachable with one engine class) is put to the audit lanes to rule as a contract statement for the first unit that adds a second engine class over a shared host.
