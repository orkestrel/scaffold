# J-ROWS reconciliation — the Grok distillate (retained verbatim 2026-09-24)

Engine: Cursor Grok through the `grok` bridge; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/j-rows-reconcile.jsonl`, session id `636e749c-825e-41c4-bc3c-3222d85813f7` (confirmed by the Orchestrator from the journal's `init` event). Grok's `git rev-parse` was refused inside its run; the Orchestrator confirms Veneer `main` read `e3031a3` at the time. The Orchestrator re-read the code rows marked open (the Modal test-local sheet comment at `tests/src/browser/Modal.test.ts` around line 22, the repeated shapes at `src/browser/HostSnapshot.ts` around lines 90 to 100, and the two `Delegate.#driven` route reads for Modal and Offcanvas) before briefing J-INTEGRATION.

| First eight words | Ruling | Evidence | Closes as |
| --- | --- | --- | --- |
| The `fill` `@returns` sentences on `TooltipInterface` and | open | `types.ts:1878` "false when the popover is destroyed, or when" omits in-flight and `display` `none`; tooltip fill at `types.ts:1729` has both | prose |
| The `DropdownOptions.placement` group summary and `static` leaf | open | `types.ts:541` "Configures a placement's position, offset, fallbacks, static display" does not name `Placement`; navbar claim absent at `types.ts:916` | prose |
| The Popover-default clauses on the `TooltipOptions.trigger` and | closed | `types.ts:1607` "Default: `true`, and `false` for a popover"; `types.ts:1663` "a change was in flight"; `types.ts:563` "HTML `popover` attribute" | |
| The Carousel `next` and `previous` refusal wording | closed | `types.ts:2196` "the computed following item is the active item"; "no other item follows" absent | |
| `typescript.md` names the boolean TSDoc form | open | `typescript.md:85` "Describe a boolean parameter" and "a boolean return"; no property form | prose |
| `DropdownClassMap.center` is the one nested | closed | `Dropdown.ts:104` "center: resolveVocabulary"; `Dropdown.test.ts:172` "dropdown-center" | |
| The guide's per-entity `### Vocabulary` mapping tables | open | `guides/veneer.md:767` "### Vocabulary" once, not under each entity | prose |
| The guide's Surface paragraph saying the `bindEventMap` | closed | search `shaped around` in `guides/veneer.md` empty; `guides/veneer.md:818` "routes each click by the selectors" | |
| `resolveVocabulary`'s constraint (`T extends Readonly<Record<keyof` | closed | `helpers.ts:273` constraint unchanged; `Dropdown.ts:101` "const { center, ...classes }" | |
| The route half of the delegate's per-click | open | `guides/veneer.md:1042` "only the other route constructs, and both drive"; no test cite | code |
| Where two restorations overlap on one element | closed | `types.ts:372` "the restoration holding the earliest recording of that target" | |
| Every engine's write sequence reads its lifetime | open | `types.ts:1826` popover `show` has no "taken over" | code |
| The `class` and `style` attribute presence across | closed | `HostSnapshot.ts:14` "shares one presence record for the" | |
| The nested option paths (Dropdown's `placement.*`, Modal's | closed | `parsers.ts:211` "projects the reading into two option paths"; `types.ts:881` "`placement.static` option" | |
| `@orkestrel/contract`'s `isInstance` is declared `value` | unclear | `isInstance` not read in `@orkestrel/contract` | |
| The offcanvas responsive hide is per instance, | open | `Offcanvas.ts:62` "a resize during a show is applied"; search `after it settles` in `guides/veneer.md` empty | prose |
| The Engine layer-rule sentence of the guide, | open | `guides/veneer.md:10006` "engine obligations assigned to its unit" | prose |
| `HostSnapshot.restore()`'s write-back re-entry: the restoration | closed | `types.ts:377` "A restore that a reaction to one of the restoration's writes" | |
| The reading of the shipped `_modal.scss` cascade beside | open | no `tests/src/browser/integration.test.ts` | code |
| `tests/setupBrowser.ts` `holdOraclePointer` repeats the pointer-driving | closed | search `holdOraclePointer` in `tests/setupBrowser.ts` empty; `tests/setupBrowser.ts:1331` "driveHold" | |
| The fixture lookups `readButton`, `readSpecimen`, `readSubject`, and | open | `tests/setupBrowser.ts:457` "export function readButton"; `readSpecimen`, `readSubject`, `readOracleButton` still exported | code |
| The `PopoverInterface.show` and `fill` TSDoc mirror | in flight | carrier J-POPOVER | |
| `Placement` has no guide section of its own: | open | no `#### Placement`; `guides/veneer.md:376` "#### `PlacementInterface`" | prose |
| The R12 profile seam: `Tooltip.ts` hardcodes its | in flight | carrier J-POPOVER | |
| `isOffcanvasEvent` repeats `isModalEvent`'s body (the J-OFFCANVAS | open | `validators.ts:323` "export function isModalEvent"; `validators.ts:377` "export function isOffcanvasEvent" | code |
| The `parseBackdrop` remarks name only the modal | closed | `parsers.ts:211` "A modal or an offcanvas panel reads" | |
| The sibling idiom exempts writes by classification | unclear | no design-round ruling sentence read | |
| A temporal `once` in the Ownership | closed | `types.ts:360` "forgotten after the last snapshot holding it restores" | |
| The `#### Tab` and `#### Carousel` sentences name | unclear | search `J-SNAPSHOT-SHARED` in `guides/veneer.md` empty; replacement sentences not read | |
| Veneer pinned `@orkestrel/test` `^0.0.22` and `tests/setupBrowser.ts` | closed | `package.json:102` "`@orkestrel/test": "^0.0.23"`; `tests/setupBrowser.ts:1331` "driveHold" | |
| The snapshot reviewer's wording bounds not touched | open | `HostSnapshot.ts:93` "readonly HostSnapshotTarget[]" beside `ReadonlyArray` at `HostSnapshot.ts:85` | prose |
| The private presence and pending shapes are written | open | `HostSnapshot.ts:96` and `HostSnapshot.ts:98` repeat `{ element, attribute }` | code |
| A Modal whose hide a reaction stops | open | search `held backdrop` in `guides/veneer.md` empty | prose |
| `Placement`'s constructor finishes its positioning writes | in flight | carrier J-POPOVER | |
| A Modal without the `fade` token whose | open | no Modal capture or case cite for a backdrop with neither `fade` nor `show` | code |
| The `is*Event` guard family repeats one body | open | `validators.ts:150` "isCollapseEvent"; no `isRelatedEvent` | code |
| The tooltip's prose-only bounds from the round-4 | open | `Tooltip.test.ts:1916` "moves nothing before a throwing content function"; `Tooltip.test.ts:1546` "read through a default name changes the tip" | prose |

Grok's unknowns: the `@orkestrel/contract` `isInstance` declaration; the design-round ruling on the sibling idiom; the Tab and Carousel sentences after the J-SNAPSHOT-SHARED name left them. The driver's deviation: Grok did not confirm the Veneer tip and did not cross-check completeness against the plan's rows.
