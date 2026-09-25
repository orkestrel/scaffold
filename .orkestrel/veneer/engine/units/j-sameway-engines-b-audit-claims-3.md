# J-SAMEWAY-ENGINES-B round 3 — audit claims (2026-09-25)

**Subject.** Veneer `unit/engines-b` at `87dc147` over the merge `45aebaa` of `main` `3058570`:
- `e73c3af`, round 3;
- `87dc147`, the Orchestrator's integration of the round's report-only types and guide patches.

Read the files at `87dc147` with `git -C C:/Users/mikes/WebstormProjects/veneer show 87dc147:<path>`. A lane that cannot run git reads the worktree copies under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b/`, committed as `87dc147` with a clean status.

**Evidence** (all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`):
- `j-sameway-engines-b-3.diff` and `j-sameway-engines-b-3-status.txt`;
- the brief `j-sameway-engines-b-brief-3.md` and the report `j-sameway-engines-b-report-3.md`;
- the earlier rounds' verdicts `j-sameway-engines-b-audit-verdict.md` and `-audit-objective-verdict.md`;
- the Orchestrator's replay: `j-sameway-engines-b-red-3-orchestrator.log.txt` and `j-sameway-engines-b-mutations-3-orchestrator.log.txt`;
- the instrument `j-sameway-engines-b-mutations-3.py`;
- the law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, `.claude/rules/tests.md`, and `decisions.md` § E13, § E18, § E24 with every amendment, and § E25.

## Claims

1. **P1 in Dropdown.**
   - The show and the hide record `aria-expanded` and the toggle's `shown` token through `recordHostWrite`. The returning steps write them back through `rewindHostWrites`, to each target's value before the call's first changing write, including absence.
   - The show's return destroys the placement last, after the host targets, and only while the call still owns the dropdown.
   - No fixed-value write remains in a returning step, and `#revert` is gone.
2. **P1 in Tooltip and Popover.**
   - A show's return takes only this call's id out of `aria-describedby`. It keeps a present attribute, and removes an emptied attribute only when the attribute was absent before the call.
   - The return runs in reverse order of the show's first writes: placement, then the id, then the tip.
   - Ownership is read before each write, so a destruction inside the step stops it.
   - Treating `aria-describedby` as a token list, with the prior presence of this call's id and of the attribute, is E24's prior-value rule applied to a shared list. Rule whether it is.
3. **P3: a refused reopening completes the hide.** After a prevented platform close, when the engine's second promotion leaves the overlay closed, the engine completes its hide: `hide` and `hidden` are dispatched, and `shown` reads `false`. Dropdown, Tooltip, and Popover each have a case for this.
4. **The B4 table is true of the code:**
   - Dropdown's hide `#save()`, which destruction writes back;
   - Dropdown's placement, not rebuilt by a hide's return;
   - Tooltip's cleared interaction state, which is not a host write;
   - Tooltip's hide inside its discard.
5. **The proofs bind.**
   - Seven cases read red on `45aebaa`'s engine sources (the red log).
   - The two cases green on the base, the Dropdown supersession case and the Tooltip placement-destruction case, are each killed by a lifetime mutation row.
   - The instrument's 54 rows miss none, every kill names an assertion, the controls hold, and `BOOM` and `UNBOUND` are refused.
   - For each proof you confirm, name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
6. **The test tables.** `DROPDOWN_WRITE_BACKS` and `TOOLTIP_DESCRIPTIONS` are declared in `tests/setupBrowser.ts`, frozen where they are tables, and listed in `tests/setupBrowser.test.ts`'s export list.
7. **The prose is true.** The integrated `hide` event sentences and `show` remarks in `src/browser/types.ts`, and the guide's return, platform-close, and takeover paragraphs and `hide` rows in § Dropdown, § Tooltip, and § Popover, hold for the code.
8. **Greenfield and scope.**
   - The changed paths are the report's seven and the integration's two.
   - `Popover.ts` and `Placement.ts` are unchanged.
   - No compatibility path remains.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `87dc147`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
