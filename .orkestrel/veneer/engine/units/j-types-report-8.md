# J-TYPES round 8 — the unit's report (returned 2026-09-23 by `opus` on Opus 5.5, the round-6 subagent resumed, 12 tool uses, 115 s; captured from the subagent's final message)

## Report: J-TYPES round 8

All of E31 to E40 are in place. Criteria 1, 2, 3, and 5 and both of this round's greps pass. The E36 sentence contradicts an earlier ruling in one respect: the engine no longer walks the registry on resize. I rewrote the E36 accounting row to match the sentence, and the E27 row goes. I made one change beyond the brief's sites (the `fade` token in the Rulings section), after the full run. I re-ran format, lint, and guides after it, but not the build or the check.

### Edits

- **E31.** `ScrollSpySelectorMap.parent` uses the brief's TSDoc. It no longer cites `SELECTOR_LINK_ITEMS`, it reads the tracked links from the target, and it names the `link` getter.
- **E32.** `CarouselSelectorMap.image` now defaults to `img`. Its TSDoc says the engine matches `:is({entry}) :is({image})`.
- **E33.** `TabSelectorMap.link` states one composition, `:is({link}):not({toggle}), {trigger}`, for the list's triggers. It no longer names `SELECTOR_INNER_ELEM`.
- **E34.** The `PopoverOptions` description now reads "…the popover's markup vocabulary…". Its guide cell follows.
- **E35.** The `SanitizerConfig.dataAttributes` Default now uses the brief's sentence, which probe 8 measured.
- **E36.** `OffcanvasInterface.show` gains a `@remarks` block with the brief's sentence about the resize listener. The description paragraph is unchanged, so the § Methods `show` cell is unchanged.
- **E37.** The five E30 sentences now use the path form, `attributes.side`, `attributes.popper`, and `attributes.content`. The `PlacementSide` row and the `PlacementInterface.update` cell follow.
- **E38.** Every site E21 touched now uses the backticked key: `shown` (seven getters and the Backdrop `show` and `hide`), `active` (Tab), `pressed` (Button), and `pointer` (Swipe). `ButtonInterface.destroy` now reads "Releases hooks and restores whether the host carried its `pressed` token and its `aria-pressed` value." The guide cells follow.
- **E39.** These four take the brief's wording:
  - the `BackdropClassMap` description, whose leaves keep the pass-through;
  - the first sentence of `EventWire`;
  - the `PopoverClassMap` description ("arrow-placement token");
  - `ScrollLockSelectorMap.fixed` ("the engine matches `:is({fixed}, {sticky})` for the padding set").
- **E40.** Every changed Summary cell is updated. I formatted the guide as a scratch copy first. The shorter `BackdropClassMap` description reversed most of the round-6 widening: the § Surface table's rows are now 201 characters, against 192 at `HEAD` and 288 in rounds 6 and 7. The formatter re-padded that whole table and the `ButtonInterface`, `BackdropInterface`, `PlacementInterface`, and `SwipeInterface` § Methods tables. Only table lines changed.

### Rulings

`BackdropOptions.animated` read "through its fade token". I made it "through its `fade` token", so that the one token idiom holds across the file. The site is outside E21's list, and the change touches no guide cell.

After that edit I re-ran oxfmt `--check` and oxlint (both exit 0) and `test:guides` (19 passed). I did not re-run the build or `check:src:browser` after this doc-comment-only change.

### E36 Offcanvas accounting row (rewritten)

| Entity | Kind | Key: default (Bootstrap constant) |
| --- | --- | --- |
| Offcanvas | selector | Excluded: `[aria-modal][class*=show][class*=offcanvas-]` (`offcanvas.js:267`). While shown, each panel listens to the window's resize and hides itself when its computed position is no longer `fixed`, so the engine runs no document query and no registry walk. |

This row replaces the E27 version, which described a registry walk.

The departure from Bootstrap, for the guide's Compatibility row that J-OFFCANVAS lands, is this. Bootstrap's window resize handler queries the whole document and calls `Offcanvas.getOrCreateInstance(element).hide()` on every shown panel. That includes a panel shown by markup alone, which it adopts by creating an instance. The engine hides only panels it showed itself, so a panel that another script or a hand-written `show` class opened is not hidden past its breakpoint.

### Acceptance output, verbatim, rollup exit code first

This is the output of `accept8.sh`, with the ANSI colour codes stripped:

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

✓ built in 67ms
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
Finished in 4751ms on 2 files using 16 threads.
exit=0

$ grep -n (criterion 3, refusal set) src/browser/types.ts
exit=1

$ grep -n (criterion 3, renamed keys) src/browser/types.ts
602:	readonly parent: string
976:	readonly parent: string
1375:	readonly descendants: string
1431:	readonly descendants?: string
1910:	readonly step: string
exit=0

$ npm run test:guides
npm notice run @orkestrel/veneer@0.0.1 test:guides
npm notice run node --experimental-strip-types tests/guides.test.ts

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-types

···················

 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  15:36:40
   Duration  944ms (transform 165ms, setup 62ms, import 691ms, tests 46ms, environment 0ms)

exit=0

$ npm run test:policy
npm notice run @orkestrel/veneer@0.0.1 test:policy
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-types

····································································································-·········

 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
   Start at  15:36:42
   Duration  2.14s (transform 108ms, setup 60ms, import 248ms, tests 1.69s, environment 0ms)

exit=0

$ grep -n (round 8, refusal set) src/browser/types.ts
exit=1

$ grep -n "readonly image: string" src/browser/types.ts
1932:	readonly image: string
exit=0
```

- Both refusal-set greps exit 1, which means no hit.
- In the renamed-keys grep, line 602 is `CollapseAttributeMap.parent`, which existed before round 6 and is correct.
- The one skipped policy test also appears in round 5's `j-types-gates-5.log.txt`.
- The full log is `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/accept8.log.txt`.

### Status and diffstat (rounds 6 to 8 together)

```text
 M guides/veneer.md
 M src/browser/types.ts
 guides/veneer.md     | 329 +++++++++++++++++++++++++--------------------------
 src/browser/types.ts | 154 ++++++++++++------------
 2 files changed, 240 insertions(+), 243 deletions(-)
```

### Deviation state

This round has no stopping deviation.

Round 7's rewording carried into E37: the two `static` options now write to `attributes.popper`, not `attributes.static`. That matches the path form the brief fixes here.

## The Orchestrator's reading (2026-09-23)

The build and the typecheck the unit did not re-run after its last doc-comment edit are green in the Orchestrator's own run over the final tree (`j-types-gates-8.log.txt`: `build:src:browser exit=0`, `check:src:browser exit=0`, every other gate and both greps passing, the round-6 probe still reporting exactly its four refusals). The `fade` idiom edit on `BackdropOptions.animated` is accepted under E38's one-idiom rule.
