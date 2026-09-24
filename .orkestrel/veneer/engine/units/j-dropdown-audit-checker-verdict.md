# J-DROPDOWN audit round 1 — the checker's verdict (`checker` on Sonnet, native subagent, read-only; 30 tool uses, 154 s; retained verbatim from the subagent's return)

**Role and lane:** `checker` on Sonnet, native Claude subagent, `Read`/`Grep`/`Glob` only, mechanical conformance.

## Claim verdicts (mechanical clauses only)

1. **Construction, menu, options.** CONFIRMED (mechanical). `Dropdown` is one class plus imports (`src/browser/Dropdown.ts:622` `export class Dropdown implements DropdownInterface`); element guards use `isInstance(x, HTMLElement)` at `j-dropdown.diff:650,918,925,941,1040`; case titles "finds the menu after the toggle, then before it, then inside its parent" and "refuses a group value that fails validation…" present verbatim at `tests/src/browser/Dropdown.test.ts:733,671`; both bind to `EXACT`/mutation rows in `j-dropdown-mutations.log.txt:8,30` (this checker does not rule on behavioral correctness, only presence and instrument binding).

2. **Show/hide doors.** UNRESOLVED on the behavioral narrative (door semantics, write ordering) — that is a correctness reading beyond file:line presence and belongs to the objective lane. Mechanically CONFIRMED: case title "opens the menu in the top layer below the start of its toggle and closes it again, keeping the toggle in step" present at `Dropdown.test.ts:88`, and is the mutation log's "named" case for the `JOINED`/`EXACT` rows at `j-dropdown-mutations.log.txt:2-9`.

3. **Position/Placement.** CONFIRMED (mechanical). `Placement` is one class plus imports (`Placement.ts:1020` `export class Placement implements PlacementInterface`); the three cited case titles are present verbatim, but in `Dropdown.test.ts` (`:132,194,274`), not in `Placement.test.ts` as the claim's sentence groups them — the claim's own wording ("the twelve behavioural `Placement.test.ts` cases and…") is ambiguous about which file carries the appended three; evidence shows those three live in `Dropdown.test.ts`, consistent with the mutation log's file column (`j-dropdown-mutations.log.txt:3,7,11`). Not a defect; the claim text itself groups them separately from "the twelve … cases."

4. **Light dismissal.** Case titles present verbatim at `Dropdown.test.ts:440,494,537`. The design question ("is D1 the right shape") is a REFERRAL to the subjective/objective lanes, not a mechanical ruling.

5. **Delegate routes/E12.** Ten dropdown cases and the listener-count case are asserted present; spot check of one ("the delegate does not validate the dropdown classes") confirmed at mutation row `j-dropdown-mutations.log.txt:70`. The ordering-defect question (disabled toggle route order vs. alert/tab routes) is a REFERRAL — judgment on design intent, not mechanics.

6. **Guard/tables/parsers/helper.** CONFIRMED. Every named table (`DROPDOWN_EVENTS`, `DROPDOWN_CLASSES`, `DROPDOWN_ATTRIBUTES`, `DROPDOWN_SELECTORS`, `DROPDOWN_DEFAULTS`, `PLACEMENT_ATTRIBUTES`, `PLACEMENT_DEFAULTS`, `PLACEMENT_AREAS`, `POPOVER_PROPERTIES`) is `Object.freeze`d at `constants.ts:76,84,94,104,112,121,127,136,153`. Barrel exports `./Placement.js` and `./Dropdown.js` (`index.ts:11-12`); `index.test.ts` lists the new names exactly (`:34-62`), matching the wildcard re-exports.

7. **Guide and returned patch.** CONFIRMED for the mechanical clauses: the `plugin` row for Dropdown reads `shipped` with Proof `tests/src/browser/Dropdown.test.ts` and its Obligation cell unchanged (`guides/veneer.md:5994`, diff `j-dropdown.diff:249-250` shows only Proof/status columns changed); the shared patch (`j-dropdown-patches/j-dropdown-shared.diff`) touches only `types.ts` and `guides/veneer.md`, matching the claim's file-name constraint. The "§ Delegation is W5's carrier" and "no remaining sentence is false of the landed source" rulings are REFERRALS (subjective/objective judgment).

8. **Scope, gates, added lines.** CONFIRMED. Status (`j-dropdown-status.txt`) lists exactly the twelve modified and four new files the report names (`j-dropdown-report.md:5-21`); no off-limits file (`types.ts`, `HostSnapshot.ts`, `Button.ts`, `Collapse.ts`, `setupBrowser.ts`) appears in status (grep returned no matches). Gates: `check:src:browser`, oxlint, oxfmt, `test:src:browser` (266 passed), `test:guides`, `test:policy`, the three builds, `test:conformance`, `test:setup`, tree-wide `check` all exit `0` in `j-dropdown-gates.log.txt` (independent Orchestrator run, not the report's self-quote — this is CONFIRMED, not UNRESOLVED, per the brief's own carve-out). Mutation log: 81 `EXACT`/`JOINED` rows, seven `GREEN?` rows at 0 failed (`j-dropdown-mutations.log.txt:82-88`), ending `receipt: restored byte for byte` (`:90`), digests before/after identical (`:1,89`). Added-lines sweep of the diff for `any`, `as ` (non-const), non-null `!`, `@ts-`, `eslint-disable`, access modifiers, default export found none (only `as const` literal-narrowing hits, which is not the banned type-assertion form the sweep targets). `.bs.` names appear only inside guide prose describing Bootstrap's own events/plugin table (`j-dropdown.diff:248-253`), none in code paths — CONFIRMED within `constants.ts`'s default-attribute-names and guide-prose carve-out. Report records no `prove` call at `j-dropdown-report.md:3` — CONFIRMED.

## Checklist (items outside the numbered claims)

| Item | Met | Evidence |
|---|---|---|
| Status lists only owned files, no off-limits file | met | `j-dropdown-status.txt:1-16`; grep for `types.ts`/`HostSnapshot.ts`/`Button.ts`/`Collapse.ts`/`setupBrowser.ts` in status = no matches |
| Case titles present verbatim | met | spot-checked 10 titles across `Dropdown.test.ts`, `Placement.test.ts`, `Delegate.test.ts` — all found at cited lines |
| Mutation rows bound to instrument log with matching counts/case names, log ends with digest receipt | met | `j-dropdown-mutations.log.txt:2-88` row-for-row; `:90` `receipt: restored byte for byte` |
| No `.bs.` wire name outside `constants.ts` defaults/guide prose | met | `j-dropdown.diff:248-253` — guide table only |
| No forbidden syntax in added lines | met | grep swept diff for `any`/`as `/`!`/`@ts-`/`eslint-disable`/access modifiers/default export — only `as const` hits (not the banned form) |
| Every element guard reads `isInstance(x, HTMLElement)` | met | `j-dropdown.diff:480,516,650,918,925,941,1040` |
| `Dropdown.ts` holds one class plus imports | met | `Dropdown.ts:622`; no second class declaration found |
| Barrel exports exactly the names `index.test.ts` asserts | met | `index.ts:1-13` vs `index.test.ts:34-62` |
| `plugin` row reads `shipped`, Proof correct, Obligation unchanged | met | `guides/veneer.md:5994`; diff hunk shows only Proof/status columns changed |
| No banned substitution-table term in added prose | met | case-insensitive sweep of diff for the unconditional-ban rows returned no matches |
| Shared-file patch names only `types.ts`/`guides/veneer.md`/`ROADMAP.md` | met | `j-dropdown-patches/j-dropdown-shared.diff:1-77` touches only those two files |
| Report records no `prove` call | met | `j-dropdown-report.md:3` |

## Referrals

- Whether D1 (light dismissal owned by `Dropdown` rather than the delegate) is the right shape, or `types.ts` must gain `hide(click?: MouseEvent)` and a readable `dismiss` — subjective/objective judgment named in the claims file itself.
- Whether D4 (`position: fixed`) and D5 (no `signal` on `PlacementOptions`) are the right design — named as open design questions in claim 3.
- Whether the disabled-toggle route order in `#routeDropdown` (leaving the default action alone) is a defect against the alert/tab routes' ordering — named as open in claim 5.
- Whether § Delegation is correctly W5 Integration's carrier and whether every remaining `#### Dropdown` sentence is true of the landed source — named as open in claim 7.
- Show/hide door-write-ordering correctness against Bootstrap's sequence (claim 2) is a behavioral-correctness reading; this checker verified only case-title presence and mutation binding, not the truth of the ordering claim.

VERDICT: PASS

---

The Orchestrator's note at retention: the `as const` idiom the checker excepts here and the ScrollSpy checker referred is ruled in the ScrollSpy verdict; the tree on `main` carries no `as const` in `src/browser` or `tests/src/browser`, so each unit that added one replaces it with a typed declaration in its fix or landing round.
