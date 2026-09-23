# J-TYPES round 7 — the unit's report (returned 2026-09-23 by `opus` on Opus 5.5, the round-6 subagent resumed, 5 tool uses, 71 s; captured from the subagent's final message)

Round 7 is done, and every round-6 acceptance command exits 0 again. One sentence departs from the brief: I named the `popper` key where E30 names the `static` key, because in both maps the `static` key names a different attribute. That departure needs your ruling (see Deviation state).

## Report: J-TYPES round 7

### Edits

- **E29.** `ScrollLockOptions` now reads "Configures the document a scroll lock holds and the markup vocabulary it matches with." in `types.ts` and in its guide Summary cell. This settles the round-6 deviation in favour of B6.
- **E30.** Each sentence that stated an attribute name now names the key:
  - `PlacementSide` description and its guide row: "…as the attribute its `side` key names carries it."
  - `PlacementInterface.update` and its guide § Methods cell: "…rewrites the attribute its `side` key names."
  - `PlacementOptions.static`: "If `true`, leaves the element in flow, writing `static` to the attribute its `popper` key names, mirroring Bootstrap's `display: 'static'`; if `false`, anchors and promotes it. Default: `false`."
  - `DropdownOptions.placement.static`: the same form, ending "anchors it in the top layer".
  - `PopoverOptions.content`: "Default: the trigger's attribute its `content` key names."
- **Guide formatting.** I formatted the guide as a scratch copy first. Only the three edited table lines were re-padded, and no column changed width.

### E30 grep

Every remaining hit is a "Default:" sentence on an attribute-map key:

```text
$ grep -n "data-popper-placement\|data-bs-popper\|data-bs-content" src/browser/types.ts
381:	/** Names the attribute that marks an element left in flow, written with the value `static`. Default: `data-bs-popper`. */
383:	/** Names the attribute that carries the side the element resolved to. Default: `data-popper-placement`. */
726:	/** Names the menu attribute that marks a menu left in flow. Default: `data-bs-popper`. */
728:	/** Names the menu attribute that carries the side the menu resolved to. Default: `data-popper-placement`. */
1372:	/** Names the tip attribute that carries the side the tip resolved to. Default: `data-popper-placement`. */
1555:	/** Names the trigger attribute that feeds the `content` option. Default: `data-bs-content`. */
exit=0
```

These are `PlacementAttributeMap.popper` and `.side` (lines 381 and 383), `DropdownAttributeMap.popper` and `.side` (726 and 728), `TooltipAttributeMap.side` (1372), and `PopoverAttributeMap.content` (1555).

Two guide lines outside the owned rows still name `data-bs-popper`: around lines 1643 and 1669. Both are prose about the shipped CSS, which selects on the literal default attribute, so they are accurate and I left them.

### Acceptance output (criteria 1, 2, 3, and 5), verbatim, rollup exit code first

```text
$ npm run build:src:browser
npm notice run @orkestrel/veneer@0.0.1 build:src:browser
npm notice run vite build --config configs/src/vite.browser.config.ts
vite v8.3.0 building client environment for production...
transforming...
✓ 9 modules transformed.
rendering chunks...
computing gzip size...
dist/src/browser/index.js  10.52 kB │ gzip: 3.41 kB │ map: 17.13 kB

✓ built in 72ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
exit=0

$ npm run check:src:browser
npm notice run @orkestrel/veneer@0.0.1 check:src:browser
npm notice run tsc --noEmit -p configs/src/tsconfig.browser.json
exit=0

$ npx oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts
exit=0

$ npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md
Checking formatting...

All matched files use the correct format.
Finished in 5082ms on 2 files using 16 threads.
exit=0

$ grep -n (criterion 3, refusal set) src/browser/types.ts
exit=1

$ grep -n (criterion 3, renamed keys) src/browser/types.ts
602:	readonly parent: string
976:	readonly parent: string
1371:	readonly descendants: string
1427:	readonly descendants?: string
1906:	readonly step: string
exit=0

$ npm run test:guides
npm notice run @orkestrel/veneer@0.0.1 test:guides
npm notice run node --experimental-strip-types tests/guides.test.ts

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-types

···················

 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  15:21:48
   Duration  952ms (transform 167ms, setup 62ms, import 701ms, tests 47ms, environment 0ms)

exit=0

$ npm run test:policy
npm notice run @orkestrel/veneer@0.0.1 test:policy
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-types

····································································································-·········

 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
   Start at  15:21:51
   Duration  2.15s (transform 107ms, setup 63ms, import 243ms, tests 1.69s, environment 0ms)

exit=0
```

- The refusal-set grep exits 1, which means no hit.
- Line 602 in the renamed-keys grep is `CollapseAttributeMap.parent`, which existed before round 6 and is correct.
- The ANSI colour codes are stripped here. The full log is `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/accept7.log.txt`.

### Status and diffstat (rounds 6 and 7 together)

```text
 M guides/veneer.md
 M src/browser/types.ts
 guides/veneer.md     | 329 +++++++++++++++++++++++++--------------------------
 src/browser/types.ts | 144 +++++++++++-----------
 2 files changed, 233 insertions(+), 240 deletions(-)
```

### Deviation state

The brief's E30 sentence for the two `static` options says "the attribute its `static` key names". That sentence would be false in both places:
- `PlacementAttributeMap` has no `static` key. The attribute written with the value `static` is its `popper` key (default `data-bs-popper`, line 381).
- In `DropdownAttributeMap`, the `static` key names `data-bs-display`, the input that feeds `placement.static`. The attribute written is its `popper` key (default `data-bs-popper`, line 726).

The brief says each sentence must name "the key instead of the default", and the key that names `data-bs-popper` is `popper`. So I wrote `popper` in both sentences and kept the rest of the brief's wording. If you rule otherwise, the patch is that one word in `PlacementOptions.static` and `DropdownOptions.placement.static`. There are no other deviations.

## The Orchestrator's ruling on the deviation (2026-09-23)

Accepted as written: `popper` is the key whose default is `data-bs-popper` on both maps (`PlacementAttributeMap.popper` around line 381, `DropdownAttributeMap.popper` around line 726), and the brief's `static` was the Orchestrator's error. No patch.
