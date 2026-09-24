# J-TAB audit round 2 — the checker's verdict (`checker` on Sonnet, native subagent, read-only; 21 tool uses, 125 s; retained verbatim from the subagent's return)

**Role:** `checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only.

## Claim verdicts

1. **CONFIRMED (mechanical clauses only).** The instrument's row list at `j-tab-mutations-2.log.txt:2-85` (84 lines, each `EXACT` or `JOINED`, exit=1, none `MISSED`/`ERR`/`NOREPORT`) and `:86-90` (five `GREEN?` rows, `0 failed`), with digest-before at `:1` matching digest-after at `:91` and `receipt: restored byte for byte` at `:92`. The named cases in the two round-1 rows with new named cases ("the active sibling is not read again after the events" at `:16`, "the control token is not read" at `:31`) match `j-tab-report-2.md:61-62`. The "outgoing phase reads no sibling" row (`:74`) reddens both named A(i)/A(ii) cases. Behavioral clause (whether the fix is correct) not ruled — judgment, referred.
2. **CONFIRMED (mechanical).** `#routeTab` reads `this.#controller.signal.aborted` (`j-tab-2.diff:545`); `#construct` destroys and returns `undefined` when aborted after construction (`j-tab-2.diff:584-589`); `#routeTabKey` re-checks `this.#controller.signal.aborted` after focus (`j-tab-2.diff:578`). Case titles present verbatim at `j-tab-2.diff:1585,1630`. Behavioral sufficiency not ruled — referred.
3. **CONFIRMED (mechanical).** `#contends` absent (no matches, grep run); `#conflicts` collects via `#closest`, uses a `Set`, refuses on `size < hosts.length` (`j-tab-2.diff:489-502`); `#routeButton`, `#routeCollapse`, `#routeTab`, `#routeTabKey` each call `#closest` (`j-tab-2.diff:516,527,542,560`). Shape match against `j-alert-2.diff` not independently verified in this pass — referred to the lane with that diff open.
4. **CONFIRMED.** `j-tab-mutations-2.log.txt:79` names "the root registers no key listener" reddening "registers one click and one key listener…" by name; `:83` names "the live abort subscription is dropped" reddening "destroys the tab when its signal aborts…" by name.
5. **CONFIRMED (mechanical).** `TabVocabulary` added at `j-tab-2.diff:1208-1216` with three readonly members; `Delegate.#tab: TabVocabulary` at `j-tab-2.diff:387`; `readControls` exported from `helpers.ts` at `j-tab-2.diff:1181-1189`, filtered to `HTMLElement`, document order via `querySelectorAll`; `computeNeighbor` signature at `j-tab-2.diff:1152-1157` matches `(list, current: T | undefined, forward, wrap)`. Case titles present at `j-tab-2.diff:3339,3351,3372`.
6. **CONFIRMED.** Reverse iteration at `j-tab-2.diff:445` (`destroy`) and `:647` (`#release`); class remarks state the bound at `j-tab-2.diff:372-373`; guide bound sentence at `j-tab-2.diff:230-235`. Named rows at `j-tab-mutations-2.log.txt:84-85`.
7. **CONFIRMED for the mechanical clause "test:guides green."** `j-tab-gates-2.log.txt:73-85` (`test:guides exit=0`, `Tests 19 passed (19)`). Sentence-truth-against-source clause is a falsifiable prose claim outside mechanical scope — referred.
8. **CONFIRMED.** `types.ts` hunks touch only `TabVocabulary` (E), `DelegateOptions.root`/`DelegateInterface.destroy`/`TabClassMap.disabled`/`TabInterface` summary+`show`+`destroy` (G), and `TabInitialWrite`/`TabDropdown` (H) — verified at `j-tab-2.diff:1204-1295`, no other declaration touched. Rename evidence: `#construct`, `#closest`, `isInstance` grep results at `j-tab-2.diff:471,508,546,563,738,913,930,942-943,1331,1335`. Parameter/rename claims for `#holds`/`#apply`/`#select`/`#save`/`#planInitial`/`#writeInitial` not independently located in this pass (Tab.ts full body not fully read) — referred.
9. **CONFIRMED.** Status (`j-tab-2-status.txt`) lists exactly the round-1 files plus `types.ts` and `helpers.ts` with its test; no off-limits file. All ten gates green in `j-tab-gates-2.log.txt` (`check:src:browser` `:18`, oxlint `:21`, oxfmt `:28`, `test:src:browser` 259 passed `:67-68`, `test:guides` `:80-81`, `test:policy` `:94`, three builds `:120,132,145`, `test:conformance` `:154`, `test:setup` `:192`, tree-wide `check exit=0` `:578`). Instrument 84 rows/receipt confirmed per claim 1. No `any`/`as `/`!`/`@ts-`/`eslint-disable`/access-modifier/default-export found in a grep sweep of the diff; no `.bs.` wire name added outside guide Bootstrap-prose (grep at `j-tab-2.diff` shows only guide prose describing Bootstrap's own events). Report states no `prove` call was made (`j-tab-report-2.md:140`).

## Checklist

| Item | Status | Evidence |
|---|---|---|
| Status lists only owned files | met | `j-tab-2-status.txt:1-13` matches brief's Scope list exactly |
| Case titles present verbatim | met | grep hits at `j-tab-2.diff:1368,1585,1630,1780,1804,2568,2944,2989,3339,3351,3372` |
| Mutation rows match report | met | `j-tab-mutations-2.log.txt:2-92` |
| No `.bs.` wire name outside constants/prose | met | grep shows only guide Bootstrap-comparison prose |
| No forbidden syntax in added lines | met | targeted grep, no matches |
| Readonly on added interface members | met | `j-tab-2.diff:1208-1271` all `readonly` |
| `Tab.ts` one class plus imports | met | single `export class Tab` at `j-tab-2.diff:717` |
| Immediately invoked guards read `isInstance` | met | grep list above; the one `instanceOf(HTMLElement)` use (`j-tab-2.diff:1188`) is a curried `.filter` callback, not an immediately invoked guard |
| Barrel exports match `index.test.ts` | met | `j-tab-2.diff:3419-3441` vs `index.ts` additions `j-tab-2.diff:1198` |
| `plugin` row `shipped`/Proof | met | `j-tab-2.diff:297` |
| Fence imports `@orkestrel/veneer/browser` | met | `j-tab-2.diff:77` |
| Substitution-table hits | met (none found) | grep swept whole diff for the unconditional-ban row patterns, no matches |
| `#contends` gone | met | no matches anywhere in diff |
| No `prove` call, recorded | met | `j-tab-report-2.md:140` |

## Referrals

- Whether the door-read fix (claim 1), delegate-lifetime fix (claim 2), `#conflicts` shape parity against `j-alert-2.diff` (claim 3), and the door-parameter/rename completeness inside `Tab.ts` (claim 8, `#holds`/`#apply`/`#select`/`#save`/`#planInitial`/`#writeInitial`, not confirmed by file:line in this pass) are behaviorally correct — send to the objective/subjective lanes.
- Whether guide prose sentences (claim 7) are true of the shipped source and of `tab.js` — a falsifiable-prose question outside mechanical scope, send to the lane running the executed-assertion check.

VERDICT: FAIL 3, 7, 8

---

The Orchestrator's note at retention: the terminal line names the clauses this lane referred, not refutations; every mechanical clause it ruled on is met.
