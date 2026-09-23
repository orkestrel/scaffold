# J-TYPES round 10 — the unit's report (returned 2026-09-23 by `opus` on Opus 5.5, the round-6 subagent resumed, 6 tool uses, 98 s; captured from the subagent's final message)

## Report: J-TYPES round 10

E47 to E51 are all in place, and criteria 1, 2, 3, and 5 pass. The brief's Tab "trigger" grep prints nothing, and its silence proves nothing: the `sed` range never opens. I substituted a working listing, which shows every remaining Tab "trigger" line refers to the `data-bs-toggle` controls (see Deviation state).

### Edits

- **E47.** I moved the resize remark and named the listener in `destroy`:
  - The `@remarks` block is removed from `OffcanvasInterface.show`.
  - The `OffcanvasInterface` block is now multi-line and carries the brief's `@remarks` paragraph, which ends "a resize during the slide-in is applied when the slide-in settles."
  - `OffcanvasInterface.destroy` now reads "Releases hooks and the resize listener, abandons a transition in flight, and restores the panel, the backdrop, scrolling, and focus." Its guide § Methods cell follows.
  - The interface's description paragraph is unchanged, so its Summary cell is unchanged.
- **E49.** `TabSelectorMap.entry` now ends "which the engine adds to the `wrapper` and `link` compositions."
- **E50.** Every Tab sentence that refers to the inner population now says "control". The full list is in the next section. The `trigger` key and the `link` composition's `{trigger}` placeholder keep "trigger". The guide's `TabInterface` Summary cell and its `show` and `destroy` § Methods cells follow.
- **E51.** I formatted the guide as a scratch copy first. Only the `OffcanvasInterface` § Methods table was re-padded, because its `destroy` cell grew. The § Surface table stays 201 characters wide.

### E48 departure paragraph (replaces the round-9 one)

Bootstrap's resize handler (`offcanvas.js:267-269`) hides every `[aria-modal][class*=show][class*=offcanvas-]` panel whose computed position is not `fixed`. It does so through an instance that hides only when Bootstrap itself showed the panel (`:69`, `:129-131`). The query matches the `showing` token too, so it hides a panel still sliding in (`:33`, `:104`, `:113`), and its `[class*=offcanvas-]` part reaches responsive panels only.

The engine hides any panel it showed, responsive or not, whose computed position is no longer `fixed`. It applies a resize that lands during the slide-in when the slide-in settles.

The departures for J-OFFCANVAS's Compatibility row are these:
- A non-responsive panel that a consumer un-fixes is hidden by the engine and ignored by Bootstrap.
- Bootstrap's load-time adoption of `.offcanvas.show` markup (`:260-263`) is not performed. A consumer constructs the engine over shown markup instead.

### Tab sentences E50 changed

| Site | Old | New |
| --- | --- | --- |
| `TabClassMap.active` | Marks the active trigger and its pane, and the toggle of a dropdown that holds the trigger. | Marks the active control and its pane, and the toggle of a dropdown that holds the control. |
| `TabClassMap.shown` | …the open menu of a dropdown that holds the active trigger. | …the open menu of a dropdown that holds the active control. |
| `TabClassMap.disabled` | Marks a disabled trigger, which neither activates nor takes arrow-key focus. | Marks a disabled control, which neither activates nor takes arrow-key focus. |
| `TabClassMap.dropdown` | …whose toggle and menu follow the active trigger. | …whose toggle and menu follow the active control. |
| `TabAttributeMap.target` | Names the trigger attribute that selects its pane, read before `href`. | Names the control attribute that selects its pane, read before `href`. |
| `TabSelectorMap.list` | Selects the list that holds a trigger and its siblings. | Selects the list that holds a control and its siblings. |
| `TabSelectorMap.toggle` | Selects the dropdown toggle that follows the active trigger. | Selects the dropdown toggle that follows the active control. |
| `TabSelectorMap.menu` | Selects the dropdown menu that follows the active trigger. | Selects the dropdown menu that follows the active control. |
| `TabInterface` (and guide cell) | Activates a tab trigger and its pane, and moves focus between sibling triggers with the arrow keys. | Activates a tab control and its pane, and moves focus between sibling controls with the arrow keys. |
| `TabInterface.host` | Carries the trigger. | Carries the control. |
| `TabInterface.pane` | Carries the pane the trigger shows, or undefined when the trigger names none. | Carries the pane the control shows, or undefined when the control names none. |
| `TabInterface.active` | Reads whether the trigger carries its `active` token. | Reads whether the control carries its `active` token. |
| `TabInterface.show` (and guide cell) | Activates the trigger and its pane and deactivates the active sibling. | Activates the control and its pane and deactivates the active sibling. |
| `TabInterface.show` `@returns` | false when the trigger was active, … | false when the control was active, … |
| `TabInterface.destroy` (and guide cell) | Releases hooks and the key listener and restores the trigger's roles and attributes. | Releases hooks and the key listener and restores the control's roles and attributes. |

### Acceptance output, verbatim, rollup exit code first

This is the output of `accept10.sh`, with the ANSI colour codes stripped:

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

✓ built in 69ms
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
Finished in 4836ms on 2 files using 16 threads.
exit=0

$ grep -n (criterion 3, refusal set) src/browser/types.ts
exit=1

$ grep -n (criterion 3, renamed keys) src/browser/types.ts
602:	readonly parent: string
978:	readonly parent: string
1380:	readonly descendants: string
1436:	readonly descendants?: string
1915:	readonly step: string
exit=0

$ npm run test:guides
npm notice run @orkestrel/veneer@0.0.1 test:guides
npm notice run node --experimental-strip-types tests/guides.test.ts

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-types

···················

 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  16:00:56
   Duration  946ms (transform 166ms, setup 60ms, import 694ms, tests 46ms, environment 0ms)

exit=0

$ npm run test:policy
npm notice run @orkestrel/veneer@0.0.1 test:policy
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-types

····································································································-·········

 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
   Start at  16:00:58
   Duration  2.15s (transform 109ms, setup 63ms, import 251ms, tests 1.69s, environment 0ms)

exit=0

$ grep -n "both sets\|is applied when" src/browser/types.ts
1276: * during the slide-in is applied when the slide-in settles.
exit=0

$ grep -n -i "trigger" src/browser/types.ts | sed -n '/TabClassMap/,/TabInterface/p'
exit=0
```

- The criterion 3 refusal-set grep exits 1, which means no hit.
- In the renamed-keys grep, line 602 is `CollapseAttributeMap.parent`, which existed before round 6 and is correct.
- The `both sets\|is applied when` grep returns only the interface remark (line 1276), for the second pattern. The `entry` sentence matches neither pattern.
- The full log is `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/accept10.log.txt`.

### Status and diffstat (rounds 6 to 10 together)

```text
 M guides/veneer.md
 M src/browser/types.ts
 guides/veneer.md     | 363 +++++++++++++++++++++++++--------------------------
 src/browser/types.ts | 205 +++++++++++++++--------------
 2 files changed, 285 insertions(+), 283 deletions(-)
```

### Deviation state

The brief's Tab "trigger" grep prints nothing. `grep` outputs only lines that contain "trigger", and no such line contains `TabClassMap`, so the `sed` range never opens.

In its place I ran an `awk` scan over the Tab declarations, from `export interface TabDetail` to the ScrollSpy detail's doc line:

```text
$ awk '/^export interface TabDetail/{on=1} /^\/\*\* Describes the detail the scrollspy event/{on=0} on && tolower($0) ~ /trigger/ {print NR": "$0}' src/browser/types.ts
875: 	/** Selects the triggers that activate a tab. Default: `[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]`. */
876: 	readonly trigger: string
883: 	/** Selects the links inside a list; the engine matches `:is({link}, {entry}):not({toggle}), {trigger}` for the list's controls, leaving dropdown toggles out. Default: `.nav-link, [round="tab"]`. */
```

Every remaining Tab "trigger" is the `trigger` key, its `data-bs-toggle` sentence, or the `{trigger}` placeholder, which the brief keeps. The guide still says "its trigger" at around line 4863, in a table row about the `data-bs-toggle` Tab controls. That row is outside the owned rows and is consistent with the rule, so I left it.

## The Orchestrator's reading (2026-09-23)

The report's listing of line 883 reads `[round="tab"]`; the file reads `[role="tab"]` (the Orchestrator's grep over `src/browser/types.ts` finds `role="tab"` on that line and no `round="tab"` anywhere in the worktree), so the listing carries a transcription error and the contract does not. The brief's `sed` range was the Orchestrator's error; the unit's `awk` listing is accepted as the criterion's evidence, and the Orchestrator's own run repeats it (`j-types-gates-10.log.txt`).
