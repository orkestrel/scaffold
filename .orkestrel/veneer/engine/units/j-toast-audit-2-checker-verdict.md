# J-TOAST audit round 2 — the checker's verdict (`checker` on Sonnet, native subagent, read-only; 19 tool uses, 142 s; retained verbatim from the subagent's return)

**Role and lane:** `checker` on Sonnet, mechanical conformance lane, J-TOAST round 2 audit.

## Claim verdicts

1. **The identity across the dispatch (item A).** CONFIRMED. `Toast.ts:623-628` (`show`) and `Toast.ts:663-665` (`hide`) take `#change` before the pre-change dispatch and re-read `#refused()`/identity after it. Red-first log `j-toast-red-2-toast.log.txt:10-65` shows exactly the two named failing cases, and mutation log rows "the identity is taken after the dispatch" (`j-toast-mutations-2.log.txt:66`) and "the hide takes its identity after the dispatch" (line 67) name those cases exactly, `EXACT`/`JOINED` with 0 unnamed failures beyond the joined set.

2. **The fade door (item A).** CONFIRMED. `Toast.ts:636-640` computes `before`/`absent` from host membership and gates the `fade` write through `#apply`. Row "the fade door reads no shown membership" (`j-toast-mutations-2.log.txt:68`, `EXACT`) names the pinned case verbatim, matching red-first case (iii) in `j-toast-red-2-toast.log.txt:48-64`. Row "the fade door admits the transition token" (line 41, `EXACT`) is the redirected round-1 row as claimed.

3. **The delegate's toast route and its lifetime (item B).** CONFIRMED for the mechanical parts. `Delegate.ts:380-401` shows `#routeToast`/`#construct` reading `this.#controller.signal.aborted` before prevent/mark, and resolving through `#closest`/`#dismissed`. Row "the toast route reads no lifetime before it prevents or marks" (`j-toast-mutations-2.log.txt:70`, `EXACT`) names the pinned case, matching red-first `j-toast-red-2-delegate.log.txt:11-28`. Row "a toast constructed while the delegate was destroyed is kept (equivalent)" (line 71, `MISSED`) matches the report's claim. The equivalence argument itself is a judgment call — REFERRED to the subjective/objective lane.

4. **The timer pair (item C).** CONFIRMED. `Toast.ts:741,753` define `#arm`/`#disarm`; grep for `#schedule`/`#clear` across the diff returns no matches.

5. **Sentences the source makes false (item D).** CONFIRMED for the parts visible as modified `-`/`+` diff hunks: `types.ts:841-877` (`@returns`, `ToastClassMap`/`ToastAttributeMap`/`ToastSelectorMap`/`ToastOptions` summaries in Button form), `guides/veneer.md:9-23` (§ Surface rows), `guides/veneer.md:168-197` (door paragraph, departure sentence "Bootstrap's `show` and `hide` methods have no such guard, and each runs its sequence again."), `constants.ts:795,804` (`TOAST_CLASSES`/`TOAST_ATTRIBUTES` summaries), fence at `guides/veneer.md:31-49` waits `hidden.vn.toast` before `destroy`. `test:guides` reads 19 passed in `j-toast-gates-2.log.txt:79-83`. The temporal `once`→`after` rename in "the test comment, the case title, and the recorder label" is UNRESOLVED: `Toast.test.ts` and `Delegate.test.ts` land as newly added (`A`) in this diff against `e24e2c3`, so no before/after hunk is available in the supplied evidence to verify a rename occurred; only the writer's report claims it.

6. **Release before restore (item E).** CONFIRMED. `Toast.ts:691-699` (`destroy`) aborts, disarms, releases the registry claim (line 697), then restores the snapshot (line 698). Row "the claim is released after the restoration" (`j-toast-mutations-2.log.txt:69`, `EXACT`) names the pinned case, matching case at diff line 2171.

7. **Scope, gates, the instrument, and the added lines.** CONFIRMED for the mechanical portions. Status (`j-toast-2-status.txt`) lists only the owned files including `src/browser/types.ts`; no off-limits file. All gates read exit 0 in `j-toast-gates-2.log.txt` matching the named commands and counts (`test:src:browser` 252 passed at line 66-67; `test:guides` 19 at 79-80; `test:policy` 109 passed/1 skipped at 92-93; three builds at 113/131/144; `test:conformance` 22 at 152-153; `test:setup` 267 at 190-191). `j-toast-mutations-2.log.txt` has 73 mutation rows (lines 2-74), 71 `EXACT`/`JOINED` and 2 `MISSED` marked `(equivalent)` (lines 22, 71), `GREEN?` rows all 0 failed (lines 75-78), and `receipt: restored byte for byte` (line 80). No `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, access modifier, default export, or `.bs.` wire name outside `constants.ts`/guide prose found by grep across the diff's added lines. `isInstance` used for the element guards found (`Delegate.ts:367,385,398,547` in `Toast.ts`), though whether every such guard is scoped to `HTMLElement` specifically (versus `HTMLAnchorElement`/`HTMLAreaElement`) is a REFERRAL — the claim's exact scope of "element guard" needs a ruling call. Report records no `prove` call was made (`j-toast-report-2.md:7`).

The Orchestrator's replay `j-toast-mutations-2-orchestrator.log.txt` was **not supplied** in the review evidence given to this lane; its claimed reproduction cannot be checked from what was provided. UNRESOLVED.

## Checklist

| Item | Status | Evidence |
|---|---|---|
| Status lists only owned files, `types.ts` included, no off-limits | met | `j-toast-2-status.txt:1-11` |
| Case titles verbatim in test files | met | diff lines 967, 1004, 1045, 1063, 1117, 1145, 1181, 1197, 1223, 2118, 2145, 2171, 2315 |
| Mutation rows match report's named cases and counts, log ends with digest receipt | met | `j-toast-mutations-2.log.txt:1,66-71,79-80` |
| No `.bs.` wire name outside `constants.ts`/guide prose | met | grep above, only guide Compatibility/plugin rows |
| No `any`/`as `/`!`/`@ts-`/`eslint-disable`/access modifiers/param property/default export/nested fn | met | grep found no true positives |
| Added interface properties/collections readonly | met | diff lines 273-276, 526-533, 845-877 |
| `Toast.ts` holds one class plus imports | met | diff lines 467-489 (imports), 525 (single class) |
| Element guards read `isInstance(x, HTMLElement)` | referred | scope of "element guard" ambiguous (`HTMLAnchorElement`/`HTMLAreaElement` guards also present) |
| Barrel exports match `index.test.ts` assertions | met | diff lines 2518-2536, 824-832 |
| Guide § Surface has one row per barrel export | met | diff lines 9-23 |
| `plugin` row reads `shipped`, Proof `Toast.test.ts` | met | diff line 207 |
| No banned term in added prose | met | no hits from targeted scans of added guide/doc text |
| Shared-file patches name only `types.ts`/`guides/veneer.md`/`ROADMAP.md` | met (vacuous) | report names no separate patch beyond owned diff |
| Report records no `prove` call | met | `j-toast-report-2.md:7` |
| `once`→`after` rename (comment/case title/recorder label) | not met — unresolved | files land as newly added (`A`); no before/after hunk supplied to verify |
| Orchestrator's replay log reproduces every row | not met — unresolved | `j-toast-mutations-2-orchestrator.log.txt` not in supplied evidence |
| Item B's `#construct` equivalence argument | referred | judgment call on unreachability argument |

## Referrals

- Claim 3's equivalence ruling on "a toast constructed while the delegate was destroyed is kept (equivalent)" — whether the unreachability argument in the report holds.
- The exact scope of "every immediately invoked element guard reads `isInstance(x, HTMLElement)`" against the `HTMLAnchorElement`/`HTMLAreaElement` guards in `Delegate.ts:385`.

**VERDICT: FAIL — claims 5 (once→after rename) and 7 (Orchestrator replay log) UNRESOLVED for want of supplied evidence.**

---

The Orchestrator's readings of the two unresolved clauses, taken from the sources after the lane returned:

- **Claim 5, `once` to `after`.** The round-1 diff `j-toast.diff` added the comment "which runs once the showing token has left", the case title "starts it in full once both have left", and the recorder label "the toast hides once both have left". A sweep of the worktree's `Toast.test.ts` and `Delegate.test.ts` for `once` outside `{ once: true }` finds only the counting sense ("once per click", "at once", "completes once", "dispatches shown once"); the three temporal sites are gone. Confirmed.
- **Claim 7, the replay.** Absent by design while the lanes read the worktree, as the claim states; the Orchestrator runs it after the objective lane returns and the round-2 verdict records the result.
- **The `isInstance` referral.** The claim reads "every invoked element guard reads `isInstance`", which the `HTMLAnchorElement` and `HTMLAreaElement` guards satisfy (they read `isInstance` with those classes); the `HTMLElement` scope is the checker brief's paraphrase, not the claim's.
