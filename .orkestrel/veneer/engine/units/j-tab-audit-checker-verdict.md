# J-TAB audit round 1 — the checker's verdict (`checker` on Sonnet, native subagent, read-only; 22 tool uses, 113 s; retained verbatim from the subagent's return)

Role: `checker` on Sonnet, native Claude subagent (`Read`, `Grep`, `Glob`), mechanical conformance only.

## Claim verdicts (mechanical clauses only; behavioral/sequencing content is outside this lane and referred)

1. **Construction and initial writes.** Mechanical clauses CONFIRMED: `Tab.ts` is one class plus imports (`src/browser/Tab.ts` diff, single `export class Tab`); case titles named ("writes the initial roles and states on the list…", "constructs a control with no list…", "claims the host and resolves its pane…", "refuses an invalid host and a second owner…", "refuses a group value that is not a class token…", "destroys the tab when its signal aborts…") appear verbatim in `Tab.test.ts` (grep confirmed). Sequencing/behavior claims (plan-before-claim ordering, write-loop semantics) are objective-lane subject, not ruled here.

2. **Swap sequence and doors.** Mechanical clauses CONFIRMED: pinned case titles appear verbatim in `Tab.test.ts` (grep confirmed, including "resolves false for the swap a sibling takes over during the fade…"). The behavioral correctness of the door/takeover sequencing is referred to the objective lane (`analyst`).

3. **Destruction, restoration, patch C.** Mechanical clauses CONFIRMED for the report/log arithmetic: `j-tab-delegate-order.log.txt` reads `1 failed of 43`/`0 failed of 43` and `receipt: restored byte for byte` (file:1-3 of that log, read). Patch C's diff (`j-tab-patches/j-tab-delegate-order.diff`) does add the named proof case and reverse-order change to `Delegate.destroy`/`#release`, and does replace the guide's bound sentence — but that case is **not present** in the worktree's `Delegate.test.ts` (grep for its title returned no matches), because patch C is unapplied. This is not a new finding: the claims file's "Known before the round" note already states "patches A, B, and C are unapplied," so this is consistent, not a defect.

4. **Delegate's tab routes and E12.** Mechanical clauses CONFIRMED: `#contends`, `#routeTab`, `#routeTabKey`, `#disabled`, `#mark` widened to `typeof Button | typeof Collapse | typeof Tab`, and `#press`/root `keydown` listener all present in the `Delegate.ts` diff (lines 364-459 region). `isInstance` used for every immediately invoked guard in the new code; `instanceOf` used only as a `.filter()` predicate (line 438). Behavioral correctness of the routing sequence is referred to the objective lane.

5. **Guard, tables, helper, barrel.** CONFIRMED mechanically: `TAB_EVENTS`, `TAB_CLASSES`, `TAB_ATTRIBUTES`, `TAB_SELECTORS` all `Object.freeze(...)` in the `constants.ts` diff; no `TAB_DEFAULTS` added; `computeNeighbor` added in `helpers.ts`; barrel `index.ts` exports `./Tab.js` (confirmed by direct read); `index.test.ts` lists `TAB_ATTRIBUTES`, `TAB_CLASSES`, `TAB_EVENTS`, `TAB_SELECTORS`, `Tab`, `computeNeighbor`, `isTabEvent` (grep confirmed).

6. **The unknowns the writer settled.** Prose-level claim; the writer's stated answers appear in the report and are echoed in the guide's `#### Tab` subsection. No mechanical falsification tool applies here; not ruled beyond presence, which is CONFIRMED (report §Unknowns present, guide subsection present).

7. **Guide and returned patches.** CONFIRMED mechanically: the guide's `plugin` row for Tab now reads `shipped` with Proof `tests/src/browser/Tab.test.ts` (`guides/veneer.md:5969` in worktree, and the diff hunk at line 224 of `j-tab.diff`), Obligation cell unchanged (only Status/Proof columns changed in the diff). § Surface carries one row per new export equal to its summary (Tab, TAB_CLASSES, TAB_ATTRIBUTES, TAB_SELECTORS, TAB_EVENTS, isTabEvent, computeNeighbor — all present in the guide diff, lines 9-22). The Tab fence imports `@orkestrel/veneer/browser` (diff line 34). Whether patches A/B/C's exact hunks make every `#### Tab`/§ Delegation sentence true of the landed source, and whether patch B correctly omits its § Delegation hunk, is a judgment ruling for the round-2 reconciliation, not a mechanical fact I can settle — **referral**.

8. **Scope, gates, added lines.** CONFIRMED: `j-tab-status.txt` lists exactly the ten modified files plus two new files the report names, and no off-limits file (`types.ts`, `HostSnapshot.ts`, `Button.ts`, `Collapse.ts`, `tests/setupBrowser.ts`, `ROADMAP.md` all absent from status). `j-tab-gates.log.txt` shows every named gate exit 0 or its passing count (`check:src:browser exit=0`, `oxlint exit=0`, `oxfmt` "All matched files use the correct format", `test:src:browser` 247 passed, `test:guides` 19 passed, `test:policy` 109 passed/1 skipped, three builds exit 0, `test:conformance` 22 passed, `test:setup` 267 passed, tree-wide `check exit=0`). The mutation log has 72 `EXACT`/`JOINED` rows and 5 `GREEN?` rows all at 0 failed (grep-counted), receipt `restored byte for byte` (log:80). The first-run log's two `MISSED` rows ("an entry is not its own wrapper", "the hide dispatch is not followed by a read") were closed in the accepted run by strengthening the same-named cases, not by weakening a row (confirmed by comparing both logs). No `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, access modifier, default export, or `.bs.` wire name outside guide/comment prose found in the added lines (grep swept). Every invoked element guard reads `isInstance` (grep confirmed; `instanceOf` used only as filter predicate). The report records no `prove` call was made (report:160).

## Checklist

| Item | Status | Evidence |
|---|---|---|
| Status lists only owned files, no off-limits file | met | `j-tab-status.txt:1-12` matches brief's owned-file list exactly |
| Case titles the report names appear verbatim in worktree tests | met (with one known exception) | grep confirmed all pinned titles except patch C's case, which is correctly absent because patch C is unapplied (per claims file's carried note) |
| Mutation rows match instrument log, digest receipt present | met | `j-tab-mutations.log.txt`: 72 EXACT/JOINED rows, 5 GREEN? rows at 0 failed, `receipt: restored byte for byte` |
| No `.bs.` wire name dispatched/listened outside `constants.ts`/guide prose | met | grep found `.bs.` only in guide comparison prose and code comments describing Bootstrap, never in dispatch/listen call sites |
| No forbidden syntax in added lines | met | grep swept diff for `any`, `as `, `!`, `@ts-`, `eslint-disable`, access modifiers, default export — no hits |
| Every invoked element guard reads `isInstance` | met | grep confirmed; `instanceOf` used only inside `.filter()` |
| `Tab.ts` holds one class plus imports | met | diff shows single `export class Tab` with only import statements preceding it |
| Barrel exports exactly the names `index.test.ts` asserts | met | `index.ts` exports `./Tab.js`; `index.test.ts` lists the seven new names |
| Guide § Surface has one row per barrel export, Summary = TSDoc | met | guide diff rows 9-22 match constants/validator/class TSDoc summaries verbatim |
| `plugin` row reads `shipped`, Proof `Tab.test.ts` | met | `j-tab.diff:224`, worktree `guides/veneer.md:5969` |
| No banned substitution-table term in added prose | met | grep swept diff against the full banned-term list; no hits |
| Shared-file patches name only `types.ts`/`guides/veneer.md`/`ROADMAP.md` | met | report's three patches touch `types.ts`, `guides/veneer.md`, and `Delegate.ts`+`guides/veneer.md` (patch C) — **not met strictly**: patch C also patches `src/browser/Delegate.ts` and `tests/src/browser/Delegate.test.ts`, which are not in the allowed shared-file name set `{types.ts, guides/veneer.md, ROADMAP.md}` |
| Report records no `prove` call made | met | `j-tab-report.md:160` |

## Not-met items (re-dispatchable)

- **Patch C's shared-file scope.** The brief's checklist requires every shared-file patch to name only `types.ts`, `guides/veneer.md`, or `ROADMAP.md`. Patch C (`j-tab-delegate-order.diff`) patches `src/browser/Delegate.ts` and `tests/src/browser/Delegate.test.ts` in addition to `guides/veneer.md`. Re-dispatch: the round-2 reconciliation must rule whether patch C's `Delegate.ts`/`Delegate.test.ts` hunks are acceptable as a cross-unit shared-file patch (since `Delegate.ts` is explicitly shared across W2 units per the brief's standing conditions) or whether this is a scope deviation to flag.

## Referrals

- Whether patches A, B, and C, once applied, make every sentence under `#### Tab` and § Delegation true of the landed source (claim 7's central subjective/objective ruling) — referred to the round's objective and subjective lanes (`analyst`/`reviewer`).
- The behavioral correctness of the swap-sequence doors, takeover semantics, and the delegate route ordering (claims 2, 4, 6) — referred to `analyst` (objective lane); this is mechanical-presence-only verified here.
- Whether patch C's cross-file shared patch is acceptable given `Delegate.ts`'s cross-unit shared status — referred to the Orchestrator for round-2 reconciliation.

VERDICT: FAIL (patch C shared-file scope)

---

The Orchestrator's note at retention: `Delegate.ts` and `Delegate.test.ts` are files the tab unit owns (its brief granted them and its status lists them), so patch C is the writer holding a shared-mechanism change back for a ruling, not a shared-file patch; the checker's one not-met item is ruled no deviation, and round 2 has the unit apply patch C directly.
