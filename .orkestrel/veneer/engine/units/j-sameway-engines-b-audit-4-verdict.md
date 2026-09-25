# J-SAMEWAY-ENGINES-B round 4 — audit verdict (2026-09-25)

**Subject.** Veneer `3bb9afb` on `unit/engines-b` over `87dc147`. The claims are `units/j-sameway-engines-b-audit-claims-4.md`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra, thread `01a0d742-9c5d-7901-94f9-07438bc430b4` (`units/j-sameway-engines-b-audit-4-objective-verdict.md`): `VERDICT: FAIL 4`. Opus 5.5 wrote the round, so this lane is the cross-engine auditor. The lane executed nothing. Its rulings rest on the Orchestrator's replay logs and on source.
- **Subjective:** not run. Round 4 repairs two behaviours under names the round-3 review already ruled. It adds no type, member, or option.
- **Checker:** not run. Claim 6's scope reading is a path comparison, and the objective lane made it against the status file.

**Rulings.**
- **Claims 1, 2, 3, 5, and 6: CONFIRMED.** The Orchestrator checked the lane's citations at `3bb9afb`: `Tooltip.ts` `#discard` around line 848, and `Dropdown.ts` `show` around line 267 and `destroy` around line 329. Each resolves to the code the lane describes.
- **Claim 4: UNRESOLVED.** No executed reading names the observer behind the `ResizeObserver loop` notification. `Placement` observes the reference and writes to the tip, which gives no direct feedback path, but the case with the wait removed was never run. The successor round carries the measurement.

**Findings outside the claims. Both are confirmed from source at `3bb9afb`, and both are reachable through a documented event or through the page.**
1. **The replacement path loses reach to the placement it replaces.** `show` sets `this.#placement = undefined` and only then calls `replaced?.destroy()`. `Placement.destroy` aborts its own controller before it dispatches the closing `beforetoggle`. That abort drops its subscription to the dropdown's signal. So a `dropdown.destroy()` called from that listener reaches the placement through neither path, and it returns with `popover`, the positioning, the side, and the anchor still written. `Dropdown.destroy`'s own comment promises that such a nested call completes the restoration before it returns.
2. **The ordinary discard still reads the tip's id.** `#discard` ends with `this.#link(tip.id, false)`. Round 4 made the stopped show's return use the recorded id, but not this path. Suppose a page changes a shown tip's id and then hides it. The hide takes out the new id, leaves the linked id in `aria-describedby`, and clears `#linked`. Popover inherits this.

**The seam budget is spent.** This is the fourth round at this seam, and each round found the same class through a new door:
- round 3 found the Tooltip link record and a stranded placement;
- round 4 finds a second door of each.

The class is a release acting on a fresh read rather than on its record, or a release losing reach to a holding while consumer code runs inside it. Following `.claude/rules/quality.md` § Rounds and verdicts, the recurrence has a direction: it moves along the engines' release paths. So the successor is not a round-5 repair on its own. It is a breadth sweep first:
- J-RELEASE-SWEEP (`units/j-release-sweep-brief.md`) maps every release station in every engine against two invariants: I1, the record; and I2, reach until released.
- It runs as six blind lenses over disjoint slices. S1 is `Dropdown` and `Placement` on Astra. S2 to S6 cover the other engines and the record mechanism, each on Opus 5.5.

J-SAMEWAY-ENGINES-B round 5 then repairs every station the sweep finds in its own files (S1 and S2), with a red-first witness for each station, including the two findings here. It also takes claim 4's executed reading. A station the sweep finds in an engine J-SAMEWAY-ENGINES-A landed goes to a successor unit named after the sweep. This unit's scope is not reopened.

VERDICT: FAIL 4
