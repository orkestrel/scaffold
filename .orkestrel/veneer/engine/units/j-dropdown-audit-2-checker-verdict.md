# J-DROPDOWN audit round 2 — the checker's verdict (`checker` on Sonnet, native subagent, read-only; 28 tool uses, 149 s; retained verbatim from the subagent's return)

**Checker — mechanical conformance only, native Sonnet subagent, Read/Grep/Glob.**

## Claim verdicts (mechanical clauses only)

1. **A cancelled promotion refuses the show.** Not audited beyond mechanical scope named in claim 7 (no separate mechanical clause named for claim 1 itself). No ruling.
2. **`PlacementOptions.signal`.** `PlacementOptions.signal?: AbortSignal` present, `.orkestrel/veneer/engine/units/j-dropdown-2.diff:1532-1533`. Pinned rows present in `j-dropdown-mutations-2.log.txt:86-87` ("the placement ignores its signal", "the placement registers no abort listener"), both `exit=1`/named. `CONFIRMED`.
3. **The key route.** `checkVisibility({ visibilityProperty: true })` row present (`j-dropdown-mutations-2.log.txt:88`); Escape-lifetime row present (line 89); key-mark row (line 90); listener-registration-dropped row (line 91); `DropdownSelectorMap`/`DropdownOptions.selectors` doc text reads "the delegate routes by `trigger` and `menu` and moves focus by `entry`... a dropdown constructed directly matches with `menu` and `navbar` alone" (diff:1542, 1551). `CONFIRMED`.
4. **Sentences the source makes false.** `Dropdown` class summary and § Surface row both read "Opens and closes a menu from its toggle, anchoring the open menu to its reference." (source `Dropdown.ts:28`; guide `guides/veneer.md:122`). `DelegateInterface.destroy` TSDoc and its Methods row both read "Releases the click and key listeners and destroys every engine it owns." (diff:1524; guide:246). `@returns` of `show`/`hide` reworded per diff:1585,1594 with no token given a faculty. `CONFIRMED` on the mechanical parity sub-clauses; the report's *bare claim* that `test:guides` is green is `CONFIRMED` independently by the Orchestrator's own log (`j-dropdown-gates-2.log.txt:85-90`, `19 passed (19)`).
5. **Instrument rows (item E).** Rows for offset-reversal (`j-dropdown-mutations-2.log.txt:93`), invalid-static-value acceptance (line 94), unfrozen `PLACEMENT_DEFAULTS.offset` (line 95), plus four further rows (96–98, 84), each `EXACT exit=1` with a named case. `CONFIRMED`.
6. **Names and types.** `#reveal` absent from `Dropdown.ts` (single class declaration, `Dropdown.ts:60`, no `#reveal` occurrence found in the read excerpt or diff). `DropdownVocabulary` declared readonly (`diff:1498-1505`), `Delegate.#dropdown` typed with it per report; `index.test.ts` carries an `expectTypeOf<DropdownVocabulary>` row (`tests/src/browser/index.test.ts:18`). No `as const` in the diff (`Grep` on diff: no matches). `CONFIRMED`.
7. **Scope, gates, the instrument, and the added lines.**
   - Status lists only owned files (`j-dropdown-2-status.txt` cross-checked against brief-2 § Scope owned-file list) — no off-limits file. `CONFIRMED`.
   - `types.ts` hunks map only to items B (`PlacementOptions.signal`, diff:1532), C (`DropdownSelectorMap`/`DropdownOptions.selectors` doc, diff:1542,1551), D (`DelegateOptions.root`/`DelegateInterface.destroy` docs diff:1515,1524; `show`/`hide` `@returns` diff:1585,1594), F (`DropdownVocabulary` diff:1498; `DropdownDefaults` diff:1560) — no hunk outside those items found. `CONFIRMED`.
   - Every gate green in `j-dropdown-gates-2.log.txt`: `check:src:browser exit=0` (line 22), `oxlint exit=0` (25), `oxfmt exit=0` (32), `test:src:browser` 272 passed (73), `test:guides exit=0` 19 passed (90), `test:policy exit=0` 109 passed/1 skipped (103), three builds exit=0 (125,137,150), `test:conformance exit=0` 22 passed (163), `test:setup exit=0` 267 passed (201), tree-wide `check exit=0` (596). `CONFIRMED`.
   - Instrument: 97 EXACT/JOINED rows (log lines 2–98) plus 7 `GREEN?` rows at 0 failed with case counts 30,15,45,12,9,34,3 (lines 99–105) and `receipt: restored byte for byte` (line 107). `CONFIRMED`.
   - Three retargeted rows each still redden a named case: "destruction leaves the placement" (line 33, named case present), "the show dispatch is not followed by a read" (line 36, bound to the nested-show case per report), "the placement door is not read" (line 38, bound to the focus/promotion case). `CONFIRMED`.
   - Added lines carry no `any`, `as`, `!`, `@ts-`, `eslint-disable`, access modifier, default export, or `.bs.` wire name outside `constants.ts`/guide prose (grep sweeps of diff, all clean). Every invoked `HTMLElement` guard reads `isInstance` (diff:485,510,546,685,935-936,946,958,965,981,1084). `CONFIRMED`.
   - Report records no `prove` call made (`j-dropdown-report-2.md:3`). This is the writer's own self-report and is `UNRESOLVED` as an independent fact — no lane other than the writer observed the absence of a `prove` call; nothing in the Orchestrator's log corroborates or contradicts it.

## Checklist of items

| Item | Met/Not met | Evidence |
|---|---|---|
| Status lists only owned files, no off-limits file | Met | `j-dropdown-2-status.txt:1-17` vs. brief-2 § Scope |
| Case titles present verbatim in test files | Met | Instrument log cites exact titles from source files (log lines 2-98); spot-checked against `j-dropdown-report-2.md:27-36` |
| Mutation rows match report's failed counts/case names, log ends with digest receipt | Met | `j-dropdown-mutations-2.log.txt:1,106-107` |
| No `.bs.` wire name outside `constants.ts`/guide prose | Met | `j-dropdown-gates-2.log.txt:203-211` grep (only guide table rows 6010-6016 hit) |
| No forbidden syntax in added lines | Met | Grep sweeps of `j-dropdown-2.diff`, no matches |
| Readonly on added interface properties | Met | `j-dropdown-2.diff:1499-1504,1561-1574` |
| `Dropdown.ts` one class plus imports | Met | `Dropdown.ts:1-25` (imports), `:60` (single class) |
| Element guards read `isInstance(x, HTMLElement)` | Met | `j-dropdown-2.diff` grep, all HTMLElement guard sites |
| Barrel exports match `index.test.ts` | Met (spot-checked) | `src/browser/index.ts:11-12`; `tests/src/browser/index.test.ts:51,57` |
| Guide § Surface row per barrel export (Dropdown/DropdownVocabulary/DropdownDefaults) | Met (spot-checked) | `guides/veneer.md:119-122` |
| Summary cells equal description paragraphs | Met (spot-checked, Dropdown/DelegateInterface.destroy) | `Dropdown.ts:28` vs `guides/veneer.md:122`; diff:1524 vs guide:246 |
| Example fence imports from `@orkestrel/veneer/browser` | Met | `guides/veneer.md:469` |
| `plugin` row reads `shipped`, Proof `Dropdown.test.ts` | Met | `guides/veneer.md:6011` |
| No banned substitution-table term in added prose | Met | Grep sweep of diff, no matches |
| Shared-file patches name only `types.ts`/`guides/veneer.md`/`ROADMAP.md` | Met (vacuous — no returned patch; files directly owned/edited per brief-2 scope) | `j-dropdown-brief-2.md:42` grants `types.ts` (items B/C/D/F) and `guides/veneer.md` rows directly |
| Report records no `prove` call | `UNRESOLVED` as independent fact — writer self-report only | `j-dropdown-report-2.md:3` |

## Referrals

- Whether item A's mechanical clause ("cancelled promotion refuses the show") requires separate checker sign-off, or is fully subsumed by claim 7's instrument-row check, is a scope-of-brief judgment call for the objective/subjective lanes, not this checker.
- Whether the vacuous "shared-file patch" reading (no patch returned because the files are directly owned) satisfies the letter of the claim, or whether the claim presumes a patch exists, is a phrasing judgment for the Orchestrator to reconcile.

No mechanical claim examined above was found FALSE.

VERDICT: PASS
