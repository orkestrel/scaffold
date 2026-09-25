# J-RELEASE-RECORD — audit claims (2026-09-25)

**Subject.** Veneer `a1041bd` on `unit/release-record` over `b8c6a08`:
- `fdb19cb` is the unit's work;
- `a1041bd` is the Orchestrator's integration of the unit's report-only `tests/setupBrowser.ts` patch.

Read every file at `a1041bd` with `git -C C:/Users/mikes/WebstormProjects/veneer show a1041bd:<path>`, or in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-record`, which holds `a1041bd` clean.

**Evidence.** Every path here is under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`.
- The brief `j-release-record-brief.md` and the report `j-release-record-report.md`.
- The diff `j-release-record.diff` (`b8c6a08..a1041bd`) and the status `j-release-record-status.txt`.
- The unit's instruments:
  - `j-release-record-run.sh`, `-baseline-reading.sh`, `-mutate.sh`, and `-splice.mjs`;
  - each mutant as a diff against the committed source: `j-release-record-mutant-<file>.diff`, and `-mutant-*-save.txt`;
  - its logs, `j-release-record-red-*.log.txt`, `-m1-*`, `-m2-*`, `-m3-*`, and `-green-*`.
- The integration log `j-release-record-integrate.log.txt`.
- The Orchestrator's replay `j-release-record-replay.log.txt` (instrument `../tools/replay-release-record.sh`).
- Bootstrap 5.3.8's source, at `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/`.

**The law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, and `browser.md`.
- `../decisions.md` § E24 with its amendments, § E25, § E32 with its amendments, and § E35 with its amendment.

## Claims

1. **`recordHostWrite` keeps both records in one step.**
   - It reads the call's record before it writes.
   - It writes through `snapshot.write` on every call.
   - A write that changes nothing, by the same `matchesHostValue` reading both use, records nothing in either record.
   - So every target the call records is one the snapshot holds, including an inline property whose value matches but whose priority does not.
2. **No engine saves at call start.** In `Carousel`, `Collapse`, `Tab`, `Toast`, and `Dropdown`:
   - no `#save` and no `#apply` remains;
   - every write to a host target goes through `snapshot.write`, directly or through `recordHostWrite`.

   Name any direct `classList`, `setAttribute`, `removeAttribute`, `style.setProperty`, or `writeHostValue` call on a host target that remains.
3. **The agreement tokens.** These tokens are written through `snapshot.write` outside the call's record:
   - `Collapse`'s panel `show`;
   - `Toast`'s `show`;
   - `Tab`'s host `active`;
   - `Carousel`'s incoming `active`;
   - `Dropdown`'s menu `show`.

   So a returning step never writes them back, as E24 and E35's row rulings require. Rule whether any of them is a target E24 requires the call to write back.
4. **Tab's planned attributes.** `#writeInitial` writes each planned attribute through `snapshot.write`. So a value the markup already carries joins only a live or pending record (E25 as E35 narrowed it), and a consumer's later edit survives destruction.
5. **Tab's selection at the take.**
   - `#selection` reads its targets once, at the take, before the blur the swap dispatches.
   - Bootstrap reads the dropdown after the blur (`tab.js` `_deactivate`, around line 130, then `_toggleDropDown`).
   - The report says the destroy witness stays green with the re-read restored, because the snapshot records at the write.

   Rule whether any rule or defect still requires the take-time read, or whether it is a Bootstrap departure without cause that Bootstrap's order would replace.
6. **The split writes.** Each write that covered several tokens is now a sequence of single-token writes, with a door after each:
   - Collapse's `show` and `hide` host writes;
   - Toast's `show` and `hide` writes;
   - Tab's previous-pane removal;
   - Carousel's direction and active removals.

   Each keeps Bootstrap's end state and token order. A reaction that runs between two writes and destroys or restarts the engine stops the writes after it. Name any split write with no door after it.
7. **The witnesses bind.** Each witness in the report's tables reads red against `b8c6a08`'s engine sources by an assertion, and green at `a1041bd`, in the replay.
8. **The mutations bind.** Each mutation reddens its named proofs by an assertion in the replay:
   - `recordHostWrite` writing through `writeHostValue`;
   - each engine's call-start save restored;
   - Tab's re-read after the blur.

   For each proof you confirm, name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
9. **The `DROPDOWN_WRITE_BACKS` row.**
   - The replaced row, a hide on a toggle already reading `aria-expanded="false"`, is unreachable under the change-aware write.
   - The replacement row (`expanded: 'true'`, `order: ['aria-expanded']`) proves the rule the old row proved: a stopped change writes back only the targets it altered.

   Rule whether the swap drops coverage of a rule no other row covers.
10. **The rewritten cases.** Each earlier case the unit changed follows from the new write shape, not from a weakened assertion:
    - Collapse's host-less reaction case;
    - Toast's prevented nested show, now three `class` mutation records;
    - Toast's replacement during restoration, now `['toast', 'show', 'fade']`;
    - Carousel's listener-activation and outgoing-removal mutation lists.
11. **Scope and no legacy.**
    - The signature changed once, and every caller moved.
    - No overload, alias, or transitional path remains.
    - The changed paths are those the report's `git status --short` lists, plus `tests/setupBrowser.ts`.
    - The replay reads `test:conformance` and `test:setup:browser` green and the tree clean.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `a1041bd`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. Report no prose finding. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
