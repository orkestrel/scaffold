# J-SAMEWAY-ENGINES-B round 4 — audit claims (2026-09-25)

**Subject.** Veneer `unit/engines-b` at `3bb9afb` over `87dc147`:
- `040f4f3`, round 4;
- `3bb9afb`, the Orchestrator's integration of the round's report-only types and guide patches.

Read the files at `3bb9afb` with `git -C C:/Users/mikes/WebstormProjects/veneer show 3bb9afb:<path>`.

**Evidence** (all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`):
- `j-sameway-engines-b-4.diff` and `j-sameway-engines-b-4-status.txt`;
- the brief `j-sameway-engines-b-brief-4.md` and the report `j-sameway-engines-b-report-4.md`;
- round 3's verdicts `j-sameway-engines-b-audit-3-verdict.md` and `-audit-3-objective-verdict.md`;
- the Orchestrator's replay: `j-sameway-engines-b-red-4-orchestrator.log.txt` and `j-sameway-engines-b-mutations-4-orchestrator.log.txt`;
- the instrument `j-sameway-engines-b-mutations-4.py`;
- the law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, `.claude/rules/tests.md`, and `decisions.md` § E18, § E24 with every amendment, and § E25.

## Claims

1. **Q1: the recorded link.**
   - Tooltip's show records, before it links, the id it links, the attribute's prior presence, and whether the list already held that id.
   - The return removes that recorded id only when the call added it, removes an emptied attribute only when the attribute was absent before, and reads no `tip.id` again.
   - The two witnesses read red on `87dc147` and green at the tip: the case where a stopped show keeps a token it found already there, and the case where the tip's id changes before a takeover.
   - Popover inherits the fix.
2. **Q2: the replaced placement.**
   - A Dropdown show destroys a placement it did not create before it places the menu, then reads the change's state again, because that destruction can run consumer code.
   - The supersession case, extended with a hide, reads red on `87dc147`: the earlier placement's `popover`, positioning, and anchor targets stay. It reads green at the tip.
3. **The proofs bind.**
   - The instrument's 57 rows miss none, including `Q1-tooltip-reread`, `Q1-tooltip-membership`, and `Q2-dropdown-replaced`.
   - Every kill names an assertion, the controls hold, and `BOOM` and `UNBOUND` are refused.
   - The writer edited `Dropdown.ts` during its own first instrument run. The replay's run is against the committed bytes.
   - For each proof you confirm, name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
4. **The frame wait.** The first new Tooltip case ends with `await waitForFrame()`, because two back-to-back cases made Chromium report a `ResizeObserver loop` error. Rule whether the wait masks an engine defect, such as a placement update that re-triggers its own observer, or only lets a browser notification drain between cases.
5. **The prose is true.** The integrated `TooltipInterface.show` and `PopoverInterface.show` remarks, and the guide's Dropdown and Tooltip takeover sentences, hold for the code.
6. **Scope.**
   - The changed paths are the report's four and the integration's two.
   - No compatibility path remains.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `3bb9afb`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
