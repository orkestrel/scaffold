# J-TYPES round 9 — the unit's report (returned 2026-09-23 by `opus` on Opus 5.5, the round-6 subagent resumed, 5 tool uses, 84 s; captured from the subagent's final message)

## Report: J-TYPES round 9

E41 to E46 are all in place, but one of this round's two greps does not come back clean. The refusal-set grep hits line 977. That line holds the `ScrollSpySelectorMap.parent` default, which is Bootstrap's own constant, so I left it and am reporting the grep as over-broad (see Deviation state). Criteria 1, 2, 3, and 5 all pass.

### Edits

- **E41.** `TabSelectorMap` gains `entry` after `wrapper`, and `wrapper` and `link` are narrowed, each with the brief's TSDoc:
  - `entry`: "Selects the list-group items, each its own wrapper and its own link, which the engine adds to both sets. Default: `.list-group-item`."
  - `wrapper`: "…the engine reads `closest` with `:is({wrapper}, {entry})`. Default: `.nav-item`."
  - `link`: "…the engine matches `:is({link}, {entry}):not({toggle}), {trigger}` for the list's controls, leaving dropdown toggles out. Default: `.nav-link, [role="tab"]`."
- **E42.** The `@remarks` on `OffcanvasInterface.show` is now the brief's lifetime-listener sentence, and the disclaimer sentence is gone.
- **E43.** The `ButtonInterface` description is now "Controls the `pressed` token and the `aria-pressed` attribute on a host." Its `host` leaf takes the brief's sentence, and the guide cell follows.
- **E44.** `PlacementSide` is now "…the value a placement writes to the attribute `attributes.side` names." In `DropdownInterface.update`, `TooltipInterface.update`, and `PopoverInterface.update`, "rewrites its placement attribute" is now "rewrites the attribute `attributes.side` names." The guide row and the three § Methods cells follow.
- **E45.** The `@typeParam TMap` on `EventHooks` now matches the one on `EventWire`: "The entity's event map, keyed by the verb that names each event."
- **E46.** Every changed Summary and § Methods cell is updated. I formatted the guide as a scratch copy first. The § Surface table keeps its 201-character width, and only the edited table lines were re-padded:
  - the `ButtonInterface` and `PlacementSide` rows;
  - the `DropdownInterface` § Methods table;
  - the `update` cells for `TooltipInterface` and `PopoverInterface`.

### Tab mapping row

| Entity | Kind | Key: default (Bootstrap constant) |
| --- | --- | --- |
| Tab | selector | `trigger` (`SELECTOR_DATA_TOGGLE`, all three toggle values); `list`: `.list-group, .nav, [role="tablist"]` (`SELECTOR_TAB_PANEL`); `wrapper`: `.nav-item`; `entry`: `.list-group-item`; `link`: `.nav-link, [role="tab"]`; `toggle`: `.dropdown-toggle`; `menu`: `.dropdown-menu`. Derived: `SELECTOR_OUTER` as `:is({wrapper}, {entry})`, read through `closest` (`tab.js:46`, `:264`); `SELECTOR_INNER` as `:is({link}, {entry}):not({toggle})` (`:47`); `SELECTOR_INNER_ELEM` as `:is({link}, {entry}):not({toggle}), {trigger}` (`:49`, read at `:180` and `:259`); `SELECTOR_DATA_TOGGLE_ACTIVE`. |

### E42 departure paragraph (replaces the round-8 one)

Bootstrap's resize handler (`offcanvas.js:267-269`) hides only a panel whose live instance Bootstrap showed:
- The instance it constructs for an unowned match is unshown (`offcanvas.js:69`).
- That instance's `hide` returns at once (`:129-131`, `base-component.js:65-66`).

The engine's lifetime listener hides the same set of panels. The departure is Bootstrap's load-time adoption of `.offcanvas.show` markup (`offcanvas.js:260-263`), which the engine does not perform. A consumer constructs the engine over shown markup instead.

### Acceptance output, verbatim, rollup exit code first

This is the output of `accept9.sh`, with the ANSI colour codes stripped:

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

✓ built in 93ms
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
Finished in 4921ms on 2 files using 16 threads.
exit=0

$ grep -n (criterion 3, refusal set) src/browser/types.ts
exit=1

$ grep -n (criterion 3, renamed keys) src/browser/types.ts
602:	readonly parent: string
978:	readonly parent: string
1376:	readonly descendants: string
1432:	readonly descendants?: string
1911:	readonly step: string
exit=0

$ npm run test:guides
npm notice run @orkestrel/veneer@0.0.1 test:guides
npm notice run node --experimental-strip-types tests/guides.test.ts

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-types

···················

 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  15:48:52
   Duration  988ms (transform 174ms, setup 67ms, import 720ms, tests 51ms, environment 0ms)

exit=0

$ npm run test:policy
npm notice run @orkestrel/veneer@0.0.1 test:policy
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-types

····································································································-·········

 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
   Start at  15:48:54
   Duration  2.21s (transform 107ms, setup 62ms, import 248ms, tests 1.75s, environment 0ms)

exit=0

$ grep -n (round 9, refusal set) src/browser/types.ts
977:	/** Selects the links that precede a nested list and turn active with a link inside it; the tracked links are the target's `[href]` links, and the `link` getter reports the active one. Default: `.nav-link, .nav-item > .nav-link, .list-group-item`. */
exit=0

$ grep -n "readonly entry: string" src/browser/types.ts
741:	readonly entry: string
882:	readonly entry: string
954:	readonly entry: string
1931:	readonly entry: string
exit=0
```

- The criterion 3 refusal-set grep exits 1, which means no hit.
- In the renamed-keys grep, line 602 is `CollapseAttributeMap.parent`, which existed before round 6 and is correct.
- The `entry` grep returns `DropdownSelectorMap.entry` (741), `TabSelectorMap.entry` (882), and `CarouselSelectorMap.entry` (1931), as the brief expects. It also returns `ScrollSpyClassMap.entry` (954), a class key with default `dropdown-item` from round 5, which is correct.
- The full log is `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/accept9.log.txt`.

### Status and diffstat (rounds 6 to 9 together)

```text
 M guides/veneer.md
 M src/browser/types.ts
 guides/veneer.md     | 347 +++++++++++++++++++++++++--------------------------
 src/browser/types.ts | 169 +++++++++++++------------
 2 files changed, 257 insertions(+), 259 deletions(-)
```

### Deviation state

The round-9 refusal grep's `\.nav-link, \.list-group-item` pattern matches the `ScrollSpySelectorMap.parent` default at line 977, `.nav-link, .nav-item > .nav-link, .list-group-item`. That default is Bootstrap's `SELECTOR_LINK_ITEMS` verbatim (`scrollspy.js:37`), and claim 4 requires every default to equal its constant.
- The match is the substring `.nav-link, .list-group-item` that follows `> `, so the pattern reaches beyond the Tab keys it targets.
- No Tab site remains: the Tab keys are `.nav-item`, `.list-group-item`, and `.nav-link, [role="tab"]`.

I left the ScrollSpy default as it is. Reordering it (`.list-group-item, .nav-link, .nav-item > .nav-link`) would silence the grep and match the same elements. But it would move a verified constant away from Bootstrap's own text just to satisfy the check. If you prefer that, it is the one-line patch. Otherwise, a narrower pattern such as `: \`\.nav-item, \.list-group-item\`\|: \`\.nav-link, \.list-group-item` scopes the grep to the Tab defaults.

## The Orchestrator's ruling on the deviation (2026-09-23)

Accepted as written: the ScrollSpy default stays Bootstrap's constant, and the Orchestrator's own grep (`j-types-gates-9.log.txt`) takes the narrower `Default:`-anchored pattern. The brief's pattern was the Orchestrator's error.
