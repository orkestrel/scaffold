# J-TYPES audit round 9 — the checker's verdict (returned 2026-09-23 by `checker` on Sonnet, native subagent, 24 tool uses, 146 s; retained from the subagent's return text, its process preamble dropped)

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only.

## Claims

**Claim 3 (E43, E44, E45 — bounds B1 to B4): CONFIRMED.**
- `ButtonInterface` description: `src/browser/types.ts` diff line 432, `/** Controls the \`pressed\` token and the \`aria-pressed\` attribute on a host. */` — verbatim match; `host` leaf at line 435 verbatim match; guide cell `guides/veneer.md:186` verbatim match.
- `PlacementSide` at diff line 562 verbatim match; guide cell `guides/veneer.md:211` verbatim match.
- `DropdownInterface.update`/`TooltipInterface.update`/`PopoverInterface.update` at diff lines 693, 885, 942 all read "rewrites the attribute `attributes.side` names"; guide cells at `guides/veneer.md:382,401,401` match verbatim.
- No "placement attribute" phrase remains in `types.ts` (`Grep` returned no hit). One hit in `guides/veneer.md:1683` — "with and without the placement attribute" — is an unrelated CSS-test description of styles coverage, not the banned TSDoc sentence pattern; it predates and is outside E44's subject sentences.
- Both `@typeParam TMap` sentences on `EventHooks`/`EventWire` read "The entity's event map, keyed by the verb that names each event." (`types.ts:127,138`).
- Every changed Summary and `§ Methods` cell checked against its description paragraph across the diff (`ButtonEventMap`, `ColorModeOptions`, `BackdropClassMap`, `BackdropOptions`, `ScrollLockOptions`, `PlacementOptions`, `SwipeOptions`, `CollapseEventMap`, `DropdownDetail`, `DropdownEventMap`, `TabEventMap`, `ScrollSpyEventMap`, `ModalEventMap`, `OffcanvasEventMap`, `TooltipEventMap`, `PopoverClassMap`, `PopoverOptions`, `AlertEventMap`, `ToastEventMap`, `CarouselEventMap`, `EventHooks`, `EventWire`) — every one matches verbatim, one piece of evidence each traced above.

**Claim 4 (Scope, parity, gates, E6): CONFIRMED.**
- Status (`j-types-9-status.txt:1-2`) lists exactly `guides/veneer.md` and `src/browser/types.ts`; diff (`j-types-9.diff`) carries exactly two `diff --git` headers for those same paths — no new or moved file.
- Gates in the Orchestrator's own run `j-types-gates-9.log.txt`: `build:src:browser exit=0`, `check:src:browser exit=0`, `oxlint exit=0`, `oxfmt exit=0`, `test:guides exit=0` (19 passed (19)), `test:policy exit=0` (109 passed | 1 skipped) — this is independent evidence, not the writer's self-report.
- Round-6 probe: log lines 75-82 show the same four refusals (`link` on `ScrollSpySelectorMap`, `selector` on `TooltipOptions`, `classes` on `ScrollLockOptions`, `slide` on `CarouselAttributeMap`), `probe exit=2`.
- Round-6/8/9 absent-greps: log lines 56-61, each `exit=1 (1 is the pass)`.
- Guide diff outside the changed cells: table re-padding only — column width widened uniformly (for example `guides/veneer.md` diff lines 9-160 old width vs. 161-311 new width), no unaccounted content change found beyond the cells already itemized in claim 3.
- Added lines carry no `any`, `as ` (type-cast usage — the only "as" hits are the English word inside prose, for example diff line 763), non-null `!` (no hits), `@ts-` (no hits), `eslint-disable` (no hits), `null` (no hits), `public`/`protected`/`private` (no hits), `import` (no hits).
- Every added property line carries `readonly` (diff lines 715, 745, 811, 858, 867, 989 — `entry`, `parent`, `fade`, `descendants`, `descendants?`, `step`).
- No `@deprecated`, alias, re-export, or old name found; `fallback(s)` hits (diff lines 213, 571, 577-578, 853-854) name Bootstrap's own `fallbackPlacements` domain concept, not a compatibility shim.

## Checklist — mechanical items

| Item | Met | Evidence |
| --- | --- | --- |
| Diff touches only owned files | met | `j-types-9-status.txt:1-2`; two `diff --git` headers only |
| No `any`/`as `/`!`/`@ts-`/`eslint-disable`/`null`/`public`/`protected`/`private`/`import` in added lines | met | greps above returned no code-syntax hits; sole "as" hits are English prose |
| Every added property line carries `readonly` | met | diff lines 715, 745, 811, 858, 867, 989 |
| Banned-phrase grep on `types.ts` returns no hit | met | `Grep` returned "No files found" |
| E41–E45 sentences verbatim at their sites | met | cited above |
| Changed Summary/§ Methods cells equal description paragraphs | met | cited above |
| Guide diff outside changed cells is re-padding alone | met | column-width comparison above |
| Every added summary opens with a third-person `-s` verb, names no symbol | met | "Selects…", "Configures…", "Marks…" forms throughout the diff's added `/** */` lines |
| No `writing.md` § Substitutions unconditional-ban term in added prose | met | no `should`/`simply`/`utilize`/`via`/`e.g.`/`etc.` etc. found in added lines |
| No new or moved file | met | two `diff --git` headers, both modifying existing tracked files |
| Report's grep ruling and Orchestrator's acceptance recorded in `j-types-report-9.md` | met | `j-types-report-9.md:143-153` (Deviation state and the Orchestrator's ruling) |

## Referrals

- The single "placement attribute" hit at `guides/veneer.md:1683` sits in an unrelated styles-test description; ruled not a violation, but a lane weighing prose intent rather than mechanical string match could differ — send to the subjective lane if disputed.

## Terminal line

VERDICT: PASS — claims 3 and 4 CONFIRMED; no failed claims.
