# J-DROPDOWN audit round 3 — the checker's verdict (`checker` on Sonnet, native subagent, read-only; 19 tool uses, 187 s; retained verbatim from the subagent's return)

# Checker verdict — J-DROPDOWN round 3

**Lane:** `checker` on Sonnet, native Claude subagent (`Read`/`Grep`/`Glob` only), mechanical conformance only.

## Claim verdicts

**Claim 1 (destroy called during restoration, item A).** CONFIRMED. `Dropdown.destroy` (worktree `src/browser/Dropdown.ts:242-256`) releases the claim and aborts only inside `if (!this.#controller.signal.aborted)`, and on every call runs `this.#placement?.destroy(); this.#placement = undefined; this.#snapshot.restore()` unconditionally. `Placement.destroy` (`src/browser/Placement.ts:187-208`) aborts/disconnects/hides only on first call and runs `this.#snapshot.restore()` on every call, swallowing the `hidePopover()` throw only when `hasAttribute('popover')` is false. `#conceal` and `show()` both destroy the outgoing placement before clearing `#placement` (`Dropdown.ts:206-207`, `321-322`). Red-first evidence for the three named cases appears in `j-dropdown-red-3.log.txt:39-80` at `Dropdown.test.ts:1245`, `Dropdown.test.ts:1288` (Placement.test.ts:523 not independently viewed within this pass). Mutation rows "the hide clears the placement before destroying it," "the placement drops its nested completion," "the placement drops its nested completion under a hiding dropdown," "the dropdown drops its nested completion," and the retargeted "destruction leaves the placement" appear at `j-dropdown-mutations-3.log.txt:99-102,33` (`EXACT`/`JOINED`, exit=1), matching the claim's row names.

**Claim 2 (arrow route reads lifetime after `show()`, item B).** CONFIRMED. `Delegate.ts:278-292` (worktree) reads `if (this.#controller.signal.aborted) return` immediately after `void engine.show()` and before reading entries/moving focus. Red-first case "focuses no entry after an arrow press when a listener to the show destroys the delegate" fails at `Delegate.test.ts:1387` per `j-dropdown-red-3.log.txt:13-36`. Mutation row "the arrow route reads no lifetime after the show" is `EXACT exit=1` at `j-dropdown-mutations-3.log.txt:103`.

**Claim 3 (entry-selector row, item C).** CONFIRMED. `Delegate.ts:285` (worktree) still reads `this.#dropdown.selectors.entry` (not `DROPDOWN_SELECTORS.entry`). The independent retained log `j-dropdown-entry-row-line.log.txt:1-8` shows the named case failing at `Delegate.test.ts:1089`, the focus assertion `expect(document.activeElement).toBe(root.querySelector('#entry'))`, matching the claim exactly. This is independent evidence (a separate script-produced log), not merely the report's quoted command.

**Claim 4 (the instrument, item D).** CONFIRMED. `j-dropdown-mutations-3.log.txt` contains 102 `EXACT`/`JOINED` rows (lines 2-103) plus 7 `GREEN?` rows at 0 failed each (lines 104-110: Dropdown 32, Placement 16, Delegate 46, validators 12, parsers 9, helpers 34, index 3), and ends `receipt: restored byte for byte` (line 112), matching the report's counts exactly. The re-anchored round-2 rows and five new rows named in the report all appear by name. The Orchestrator's replay `j-dropdown-mutations-3-orchestrator.log.txt` is absent from the evidence set as the brief states — **UNRESOLVED**, not FAIL, per the brief's explicit instruction.

**Claim 5 (scope, gates, added lines).** Mixed:
- Status/off-limits: CONFIRMED — `j-dropdown-3-status.txt` lines 1-17 list exactly the 17 files the report and gates log both name; no off-limits file.
- Gates green: CONFIRMED — `j-dropdown-gates-3.log.txt` shows `check:src:browser` exit=0, oxlint exit=0, oxfmt "All matched files use the correct format," `test:src:browser` 276 passed, `test:guides` 19 passed, `test:policy` 109 passed/1 skipped, three builds exit 0, `test:conformance` 22 passed, `test:setup` 267 passed, tree-wide `check` exit=0 (lines 20-597).
- `.bs.` wire names: CONFIRMED clean — the gates log's own `bs-wire-grep` (lines 204-211) and my independent grep of the diff show `.bs.` occurring only in the guide's Bootstrap-comparison prose (`j-dropdown-3.diff:284`), never in `src/`.
- Forbidden syntax (`any`, `as X`, non-null `!`, `@ts-`, `eslint-disable`, access modifiers, default export): CONFIRMED clean — targeted grep of the diff returned only prose matches of "as Bootstrap" (`j-dropdown-3.diff:89,109,141,466,997`), no code hits.
- `HostSnapshot.ts` unchanged: CONFIRMED — absent from the diff and status entirely.
- `types.ts` carries no round-3 hunk: **UNRESOLVED**. `j-dropdown-3.diff:1512-1599` shows a real hunk to `types.ts` (`DropdownVocabulary` interface, `PlacementOptions.signal`, `DropdownSelectorMap`/`DropdownOptions` doc edits, `DropdownDefaults` interface), and the diffstat records `types.ts | 42 +-`. Because the diff is `git diff HEAD` against the branch's uncommitted, multi-round state (per the claims file's own Subject line), I cannot mechanically distinguish a round-3-added hunk from a round-1/2 hunk already present without a round-2 diff, which is outside this checker's evidence set. This is a genuine evidence gap, not a falsified claim — **referred to the Orchestrator** to reconcile against `j-dropdown-report-2.md`/round-2 diff.
- Every invoked element guard reads `isInstance(x, HTMLElement)`: **NOT MET**. `Delegate.ts:262` (worktree, added this round per `j-dropdown-3.diff:485`) reads `if (!isInstance(event, KeyboardEvent) || !isInstance(event.target, Element)) return` — an added guard using `isInstance(x, Element)`, not `HTMLElement`. Every other added guard I found does use `HTMLElement` (`Dropdown.ts:88,366,373,389`; `Delegate.ts:326,513`; `Placement.ts:68`), so this is an isolated counter-example to the claim's literal wording.
- `prove` not called: CONFIRMED — `j-dropdown-report-3.md:3` states "I made no `prove` call; the server is not reachable from a subagent."
- Shared-file patches naming only `types.ts`/`guides/veneer.md`/`ROADMAP.md`: CONFIRMED by absence — the report returns no shared-file patch section at all.

## Checklist

| Item | Status | Evidence |
|---|---|---|
| Status lists only owned files | Met | `j-dropdown-3-status.txt:1-17` |
| Case titles present verbatim | Met | `j-dropdown-red-3.log.txt`, `j-dropdown-entry-row-line.log.txt:1` |
| Mutation rows match report | Met | `j-dropdown-mutations-3.log.txt:2-112` |
| No `.bs.` outside constants/guide | Met | `j-dropdown-gates-3.log.txt:204-211`; diff grep |
| No forbidden syntax in added lines | Met | diff grep, no code hits |
| Readonly interface properties | Met | `j-dropdown-3.diff:1520-1528,1582-1598` |
| One class plus imports per file | Met | `Dropdown.ts`, `Placement.ts` read in full |
| Element guards read `isInstance(x, HTMLElement)` | **Not met** | `Delegate.ts:262` uses `Element`, not `HTMLElement` — re-dispatch to confirm intent and correct or narrow the claim |
| Barrel exports exactly the asserted names | Met | `tests/src/browser/index.test.ts:32-81` vs guide's added rows |
| `types.ts` carries no round-3 hunk | **Unresolved** | needs round-2 diff for comparison — re-dispatch with that evidence |
| Gates green | Met | `j-dropdown-gates-3.log.txt` full run |
| No `prove` call | Met | `j-dropdown-report-3.md:3` |
| Orchestrator's replay log | Unresolved (absent by design) | not supplied to this lane |

## Referrals

- Whether the `types.ts` hunk in `j-dropdown-3.diff` was introduced in round 3 or carried unchanged from round 1/2 requires the round-2 diff for comparison; route to the Orchestrator.
- Whether `Delegate.ts:262`'s `isInstance(event.target, Element)` guard is an intended exception to the `isInstance(x, HTMLElement)` clause (event targets are not always elements the code narrows to `HTMLElement`) is a judgment call the checker leaves to the subjective/objective lanes rather than ruling on itself.

VERDICT: FAIL — claim 5's element-guard clause (Delegate.ts:262 uses `isInstance(x, Element)` not `HTMLElement`)

---

The Orchestrator's readings of the referred clauses, taken after the lane returned:

- **`types.ts` hunk.** The `types.ts` section of `j-dropdown-2.diff` and of `j-dropdown-3.diff` are byte-identical (5949 bytes each, compared by script), so round 3 added no `types.ts` hunk; the clause holds.
- **The `Element` guard.** The claim reads "every invoked element guard reads `isInstance`", which `isInstance(event.target, Element)` satisfies; the `HTMLElement` scope is the checker brief's paraphrase of the checklist row, not the claim's. `#press` narrows the key event's target to `Element` because the routes then resolve through `#closest` and `#locateToggle`, which return `HTMLElement`; no defect.
- **The replay.** Absent by design while the lanes read; the Orchestrator runs it on the landing round's instrument before the fast-forward, and the round-3 verdict records where.
