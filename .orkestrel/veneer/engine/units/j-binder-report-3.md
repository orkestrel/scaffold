# J-BINDER round 3 — the unit's report (returned 2026-09-23 by `opus` on Opus 5.5, the round-2 subagent resumed, 56 tool uses, 775 s; captured from the subagent's final message)

I finished C1 to C7 on the same uncommitted tree. Every round-2 acceptance command exits 0, and the two restoration proofs read red before the fix and green after. Nothing is committed, and round 2's report-only patches remain unapplied.

Three things need your action:
- **Off-limits patch:** adding `recordCalls` to `tests/setupBrowser.ts` makes the export list in `tests/setupBrowser.test.ts` false. That file is off-limits, so its patch is below; it adds the export-list entry and the recorder's proof.
- **Setup-browser project:** `npm run test:setup:browser` fails to import before any of that. It reaches `BUTTON_SELECTOR` through `@app/browser`, which round 2's app patch fixes.
- **One restoration path stays open:** a consumer who destroys a button directly and constructs a new one from a reaction to the token write. Details are under the teardown ruling.

# J-BINDER round 3 report (`opus` on Opus 5.5, worktree `C:/Users/mikes/WebstormProjects/veneer-binder`, branch `unit/binder`, tip `cea3359`)

## Edits and what each closes

- **C1 (claim 5, F1, F2, R2): the option resolver reads the attribute table.**
  - New signature: `resolveOptions(element, attributes, code, defaults, parsers, options)`. `attributes` is `NoInfer<AttributeNames<TKey>>`, and each declared key is read with `element.getAttribute(attributes[key])`.
  - A constructor value that is `undefined` keeps the layer beneath it.
  - `OPTION_PREFIX` is deleted from `constants.ts`, the barrel, the index proof, and the guide row.
  - `resolveVocabulary(code, defaults, guard, overrides)` now takes the same tail order, and all four call sites follow.
  - The prefix proof is now "reads the attribute the table names for a declared key and not the default one". It is joined by "skips a constructor value that is undefined, keeping the attribute or the default".
  - The guide paragraph names the entity's `attributes` group. It adds that the first engine declaring an option inside a group rules how its attribute projects.
- **C2 (claims 4 and 7): the teardown interleaving has regression proofs and a fix.**
  - `Button.destroy` now aborts, then releases the registry, then restores.
  - `HostSnapshot.restore` forgets its records first. It then writes tokens, removes each empty `class` attribute, writes properties, and writes attributes last. The order is stated in the class remarks.
  - `Delegate` holds any click that arrives while it is restoring an engine. When the restoration ends, it drives each held host through a fresh `Button.find`.
  - The guide's "returns the live engine" sentence is bound to the proof "drives a live engine for a click a restoration reaction sends, never the destroyed one".
- **C3 (F3): one shared recorder.** `recordCalls(prototype, name)` and the `CallRecording` interface are in `tests/setupBrowser.ts`. `recordListeners` is built on it, the Delegate pruning case calls it, and the inline recorder is deleted.
- **C4 (bounds).**
  - `#release(delivered)` is split into `#discard` (drops engines the registry no longer holds), `#release` (releases hosts the root no longer contains), `#restore` (destroys one engine and holds clicks), and `#settle` (disconnects the observer when a pass leaves nothing owned).
  - `#mark`'s route parameter is typed `typeof Button`.
  - The guide says "once per click for each entity whose selector matches".
  - The `readTarget` and `readTargets` examples pass `{ target: TARGET_ATTRIBUTE }` with a comment that the entity's resolved table goes there.
  - The guide has a sentence on `ButtonOptions.signal`.
  - `resolveVocabulary` builds a mutable local and freezes it once.
- **C5 (R1).** In `types.ts`, `ButtonSelectorMap` and `ButtonOptions.selectors` say the delegate routes button clicks by the selector and a directly constructed button matches with none. The `BUTTON_SELECTORS` doc block, the guide rows, and a `### Vocabulary` sentence follow.
- **C6 (R3).** `types.ts` declares `AttributeNames<TKey>`, used by `readTargets`, `readTarget`, and `resolveOptions`. It also declares `ButtonVocabulary`, the delegate's `#button` field type. Both have TSDoc and guide rows, and no inline object type remains on a public signature.
- **C7 (parity).**
  - § Surface: the `OPTION_PREFIX` row is removed, `ButtonVocabulary` and `AttributeNames` are added, and the `ButtonSelectorMap` and `BUTTON_SELECTORS` summaries are updated.
  - Updated prose: the `## Engine`, `### Vocabulary`, `### Delegation`, and `### Ownership and restoration` sentences.
  - The export list in `index.test.ts` is updated.
  - The longer summaries widened the § Surface column, so the formatter re-padded the whole table. That is most of the guide's diffstat.

## Ruling on the teardown order

**`Button.destroy`:** abort, release the claim, restore.
- Releasing before restoring means a click or a construction triggered by a reaction inside restoration never finds the destroyed engine. It can claim the host, where before it threw `BUTTON_HOST_OWNED`.

**`HostSnapshot.restore`:** forget, tokens, empty-`class` removal, properties, attributes last.
- Releasing first has a risk: a replacement built in reaction to an early write would record values not yet restored, and the old engine's later writes would overwrite it.
- With attributes last, a replacement built in reaction to the final write sees every other value restored, and nothing follows it.
- This is a documented contract in `HostSnapshot`'s class remarks, not in `types.ts`, which is granted only for C5 and C6.

**`Delegate`:** covers reactions to earlier writes on the delegate's own path.
- While `#restore` runs `engine.destroy()`, a routed click is still marked and prevented. The host is held and driven after the restoration returns, through a fresh `find`.
- Removal delivery arrives as a microtask, so a restoration never nests inside another one. `#held` is either undefined or one array.

**Residual path, bounded:**
- **When it opens:** a consumer destroys a button directly, and a reaction to a token or property write constructs a replacement itself.
- **What happens:** that replacement records values not yet restored, and the old engine's attribute writes then overwrite it. Neither the delegate's hold nor the write order covers this path.
- **Where the proofs stop:** the Button proof covers only a construction at the last write. The Delegate proofs cover only the delegate's own restorations.

## C2 proofs and the Unknowns

The red reading is from `npm run test:src:browser`, taken after the new proofs and `recordCalls` existed but before the source fix. It read `Test Files 5 failed | 3 passed (8)`, `Tests 13 failed | 111 passed (124)`. The restoration proofs failed as follows.

| Proof | Red reading |
| --- | --- |
| Button: "releases its host before restoring it, so an engine constructed at the restoration last write keeps its state" | `expected [ [ …(1) ] ] to deeply equal []`. The recorded error is `AppError: Host already has a live owner`, thrown inside the reaction. |
| Delegate: "drives a live engine for a click a restoration reaction sends, never the destroyed one" | `expected 1 to be 2`. The click was consumed and no toggle event was dispatched. |
| Delegate: "holds a click a reaction sends before the restoration ends, then drives a fresh engine" | `expected 1 to be 2` |
| HostSnapshot: "restores class tokens, then inline properties, then attributes, whatever the save order" | `expected [ 'aria-expanded', 'style', …(2) ]` |

The other failures in that run were the rewritten resolver proofs (the old signatures) and the export list.

The green reading is the acceptance run below: `Tests 124 passed (124)`.

**Unknown 1: the reaction is synchronous in Chromium 153.**
- The Button proof reads `engines.count` as 1 right after the synchronous `button.destroy()` call, with no await, and it passes.
- In the red run, the reaction's `AppError` was raised inside `destroy`.
- So `attributeChangedCallback` runs inside `removeAttribute` before it returns.

**Unknown 2: releasing first alone is not enough.**
- The mutation that writes attributes before tokens reddens the Button proof. The replacement records the old token as still present.
- The mutation that drives a held click at once reddens the token-reaction Delegate proof. The old engine's later `aria-pressed` removal overwrites the fresh engine.
- Releasing first, writing attributes last, and holding clicks together are what keep the three restoration proofs green.

## Mutation rows

The instrument is `binder3-mutate.mjs` (round 2's logic, also restoring `tests/setupBrowser.ts`). Results are in `binder3-mutation-results.json`, `-2.json`, `binder3-probe-results.json`, and `-2.json` in the scratchpad (retained beside this report as `j-binder3-*`). `sha256sum -c` confirmed every source was restored after each run.

| Mutation | Proof reddened (tally) |
| --- | --- |
| Button: restore before releasing the claim | the Button restoration proof (1/38) |
| HostSnapshot: attributes before tokens | the restore-order proof (1/8); the Button restoration proof (1/38) |
| Delegate: a click during restoration driven at once | the "holds a click…" proof (1/22) |
| Delegate: a held click never driven | "drives a live engine…" and "holds a click…" (2/22) |
| Delegate: no hold, plus the old destroy order | "drives a live engine…" and "holds a click…" (2/22) |
| Delegate: no discard at a click / at a delivery / `#settle` never disconnects | "drops an engine a consumer destroyed…" (1/22 each) |
| Delegate: observer never observes | 7/22, including both restoration proofs and the boundary case |
| Delegate: releases contained hosts too | 4/22, including the same-synchronous-run case |
| Delegate: no per-click mark | the nested-roots case (1/22) |
| Delegate: never drives a found engine | 9/22 |
| resolveOptions: attribute table ignored | the replaced-name proof and the coercion-failure proof (2/26) |
| resolveOptions: an `undefined` constructor value applied | the undefined-skip proof (1/26) |
| resolveVocabulary: an `undefined` supplied value applied | all three `resolveVocabulary` cases (3/26) |
| recordCalls: no call recorded | index "records a document listener installed by an imported module" (1/2); the recorder proof (1/1) |
| recordCalls: original not called / restore leaves the wrapper | the recorder proof (1/1 each). No owned proof tells the first apart, so it is covered only by the recorder proof in the setup-test patch below. |

The recorder proof ran as a temporary probe, `tests/src/browser/zzprobe.test.ts`, which is deleted. It is the same case as in the setup-test patch below.

## Acceptance criteria (round 2's 1 to 6 plus the brief-3 sweep, verbatim)

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
Finished in 5105ms on 21 files using 16 threads.
exit 0
$ npm run test:src:browser
npm notice run @orkestrel/veneer@0.0.1 test:src:browser
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-binder
 Test Files  8 passed (8)
      Tests  124 passed (124)
   Start at  17:04:52
   Duration  2.03s (transform 0ms, setup 321ms, import 81ms, tests 202ms, environment 0ms)
exit 0
$ npm run test:policy
npm notice run @orkestrel/veneer@0.0.1 test:policy
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-binder
 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
   Start at  17:04:55
   Duration  2.24s (transform 107ms, setup 62ms, import 248ms, tests 1.77s, environment 0ms)
exit 0
$ npm run test:guides
npm notice run @orkestrel/veneer@0.0.1 test:guides
npm notice run node --experimental-strip-types tests/guides.test.ts
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-binder
 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  17:04:58
   Duration  1.02s (transform 183ms, setup 64ms, import 764ms, tests 48ms, environment 0ms)
exit 0
$ npm run build:src:browser
npm notice run @orkestrel/veneer@0.0.1 build:src:browser
npm notice run vite build --config configs/src/vite.browser.config.ts
vite v8.3.0 building client environment for production...
transforming...
✓ 11 modules transformed.
rendering chunks...
computing gzip size...
dist/src/browser/index.js  28.49 kB │ gzip: 8.53 kB │ map: 46.08 kB
✓ built in 78ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
exit 0
$ git diff --check
exit 0
```

- The browser run is on Chromium 153.0.8010.12, and the export list matches exactly.
- **Prefix sweep:** `grep -rn "OPTION_PREFIX\|prefix" src/browser tests/src/browser guides/veneer.md` has no hit in `src/browser` or `tests/src/browser`. Every guide hit is CSS vendor-prefix prose in the styles sections ("The prefixed appearance aliases are absent", `-webkit-*` rows, "its footer prefix"). None names the removed option-prefix axis.

**Observations, not criteria:**
- `npx tsc --noEmit -p tsconfig.json` exits 2 on the three app files with `BUTTON_SELECTOR` import errors, plus `Showcase.test.ts(231,11) TS2358`. These are round 2's known breaks and round 2's app patch closes them.
- `npm run test:setup:browser` fails to import `tests/setupBrowser.test.ts` with `does not provide an export named 'BUTTON_SELECTOR'`, which it reaches through `@app/browser`. That is the same round-2 app patch. After that lands, the export-list case also needs the patch below.

## `tests/setupBrowser.ts` diff (shared change, owned this round for C3)

See the hunk in `j-binder-3.diff` (`recordCalls`, `CallRecording`, and `recordListeners` rebuilt on it), reproduced in the subagent's message and retained here by reference.

## Patch for the off-limits `tests/setupBrowser.test.ts` (report-only)

Retained beside this report as `j-binder3-setuptest.diff` (the export-list entry `recordCalls` and the recorder's proof); the patched copy passes `oxfmt --check`, and its case ran green as a temporary probe.

Round 2's `j-binder2-app.diff`, `j-binder2-roadmap.diff`, and `j-binder-patch-buttonsection.diff` still apply unchanged; none of the files they touch changed this round.

## `git status --short` and `git diff --stat` (rounds 2 and 3 together)

```text
 M guides/veneer.md
 M src/browser/Button.ts
 M src/browser/ColorMode.ts
 M src/browser/Delegate.ts
 R src/browser/Snapshot.ts -> src/browser/HostSnapshot.ts
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

```text
 guides/veneer.md                                   | 497 +++++++++++----------
 src/browser/Button.ts                              |  58 ++-
 src/browser/ColorMode.ts                           |  41 +-
 src/browser/Delegate.ts                            | 120 ++++-
 src/browser/{Snapshot.ts => HostSnapshot.ts}       |  51 ++-
 src/browser/constants.ts                           |  46 +-
 src/browser/helpers.ts                             | 165 ++++---
 src/browser/index.ts                               |   2 +-
 src/browser/types.ts                               |  26 +-
 src/browser/validators.ts                          |  68 ++-
 tests/setupBrowser.ts                              |  63 ++-
 tests/src/browser/Button.test.ts                   | 122 ++++-
 tests/src/browser/ColorMode.test.ts                |  37 +-
 tests/src/browser/Delegate.test.ts                 | 214 ++++++++-
 .../{Snapshot.test.ts => HostSnapshot.test.ts}     |  41 +-
 tests/src/browser/helpers.test.ts                  | 282 ++++++++----
 tests/src/browser/index.test.ts                    |  18 +-
 tests/src/browser/validators.test.ts               |  91 +++-
 18 files changed, 1384 insertions(+), 558 deletions(-)
```

## Deviation state

There was no stop, and every deviation is recorded above.

- **Checked names:** `AttributeNames`, `ButtonVocabulary`, `recordCalls`, and `CallRecording` match no fleet guide name, and the `surface` policy rule passes.
- **Carried by the round-2 verdict:** the route half of the mark key has no proof until a second route lands with J-COLLAPSE.

## The Orchestrator's reading (2026-09-23)

The Orchestrator's own run over the final tree (`j-binder-gates-3.log.txt`) reads every scoped gate green (124 of 124 on Chromium 153, `test:policy`, `test:guides`, the scoped build), the old-name grep clean, the prefix grep hitting only the guide's CSS vendor-prefix prose, and the tree-wide `npm run check` red on the three app files alone, which the round-2 app patch closes at integration; `git apply --check` accepts `j-binder3-setuptest.diff`. The residual restoration path (a consumer destroying a button directly while a reaction to a token or property write constructs a replacement) is put to the audit lanes as a claim to rule.
