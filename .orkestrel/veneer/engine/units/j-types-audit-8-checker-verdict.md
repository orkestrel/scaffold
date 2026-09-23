# J-TYPES audit round 8 — the checker's verdict (returned 2026-09-23 by `checker` on Sonnet, native subagent, 23 tool uses, 152 s; retained from the subagent's return text)

**Role:** `checker` on Sonnet, native Claude subagent, `Read`/`Grep`/`Glob` only, mechanical conformance only.

## Claim verdicts

**Claim 5 (E37–E39, bounds B1/B3/B4/B6/B7/B9): CONFIRMED**
- Path form used at all five sites: `PlacementSide` (types.ts:373, "as the attribute `attributes.side` names carries it"), `PlacementInterface.update` (types.ts:420, "rewrites the attribute `attributes.side` names"; guide cell types.ts guide line 352 matches), `PlacementOptions.static` (types.ts:397, "writing `static` to the attribute `attributes.popper` names"), `DropdownOptions.placement.static` (types.ts:757, same phrase), `PopoverOptions.content` (types.ts:526, "the trigger's attribute `attributes.content` names").
- Backticked-key token idiom used uniformly at every E21 site: `pressed` (types.ts:76, :92, :400), `shown` (BackdropInterface :296/:306, CollapseInterface :631, DropdownInterface :780, ModalInterface :1133, OffcanvasInterface :1272, TooltipInterface :1448, PopoverInterface :1597, ToastInterface :1829), `active` (types.ts:909), `pointer` (types.ts:463); `ButtonInterface.destroy` reads verbatim "restores whether the host carried its `pressed` token and its `aria-pressed` value" (types.ts:398).
- Grep for the round-8 banned-idiom set (`SELECTOR_LINK_ITEMS|SELECTOR_INNER_ELEM|carousel-item img|popover vocabulary|its \`side\` key|...|its shown token|...|its fade token`) against the worktree `src/browser/types.ts` returns no match (run directly, confirmed).
- `BackdropClassMap` description (types.ts:271) and `PopoverClassMap` description (types.ts:1551) and `EventWire`'s first sentence (types.ts:136) and `ScrollLockSelectorMap.fixed` (types.ts:328) all match the brief's fixed wording verbatim, and each corresponding guide cell (guide lines 204, 284, 196) equals the source paragraph.

**Claim 6 (Scope, parity, gates, E6): CONFIRMED**
- Status lists exactly `guides/veneer.md` and `src/browser/types.ts` (`j-types-8-status.txt:1-2`).
- Orchestrator's own run (`j-types-gates-8.log.txt`) shows `build:src:browser exit=0`, `check:src:browser exit=0`, `oxlint exit=0`, `oxfmt exit=0`, `test:guides exit=0` (19/19), `test:policy exit=0` (109 passed, 1 skipped) — independent of the report.
- The round-6 probe still reports exactly four refusals (TS2353 ×3, TS2561 ×1) with `exit=2` and no other errors, so its acceptance lines still compile (`j-types-gates-8.log.txt:72-76`).
- The guide diff outside the changed Summary cells is table re-padding only (diff lines 9–363 touch only the name table and four method tables; no narrative prose changed).
- Added lines carry none of `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `null`, `public`, `protected`, `private`, `import` (grep over the diff, no hit).
- No alias, re-export, `@deprecated` tag, fallback, or old name survives: `ScrollLockClassMap` is absent from the worktree file; the surviving `readonly link: string` (types.ts:882) is `TabSelectorMap.link`, a distinct property, not the renamed `ScrollSpySelectorMap.link→parent`; the surviving `readonly slide: string` (types.ts:1894) is `CarouselClassMap.slide`, a distinct class token, not the renamed `CarouselAttributeMap.slide→step`.

## Mechanical checklist

| Item | Status | Evidence |
|---|---|---|
| Diff touches only brief's owned files | Met | `j-types-8-status.txt:1-2`: only `guides/veneer.md`, `src/browser/types.ts` |
| Added lines carry no `any`/`as `/`!`/`@ts-`/`eslint-disable`/`null`/`public`/`protected`/`private`/`import` | Met | grep over diff, no hit |
| Every added property line carries `readonly` | Met | all five added `readonly` lines confirmed (diff:683,749,797,806,910) |
| Banned-idiom grep set returns no hit | Met | direct grep on worktree `types.ts`, no match |
| E31–E39 verbatim sentences at site | Met | ScrollSpySelectorMap.parent (types.ts:682), CarouselSelectorMap.image (types.ts:922), TabSelectorMap.link (types.ts:881), PopoverOptions desc (types.ts:845 area / diff:845), SanitizerConfig.dataAttributes Default (diff:568), path-form and token-idiom sites listed under claim 5 |
| Changed Summary cells equal description paragraphs | Met | spot-checked PlacementSide, PlacementOptions, BackdropClassMap, EventWire, PopoverClassMap, PopoverOptions — each guide cell matches source verbatim |
| Guide's changed lines outside cells are re-padding alone | Met | diff scope confined to the two tables; no narrative-prose lines changed |
| Added summaries open with third-person `-s` verb, no self-naming | Met | all changed cells open with "Maps"/"Names"/"Configures"/"Describes"/"Reads"/"Releases"/"Appends"/"Removes"/"Measures", none names its own symbol |
| No `writing.md` § Substitutions banned term in added prose | Met | grep for banned-term set against diff, no hit |
| No new or moved file | Met | diff shows two `modified` files only, no rename/create headers |
| Report's `fade` ruling names its bounding rule | Met | report line 26: "so that the one token idiom holds across the file" — names E38's one-idiom rule as the basis |

## Referrals

None. No judgment question arose; every item resolved on direct evidence.

**TERMINAL: No failed claims.**
