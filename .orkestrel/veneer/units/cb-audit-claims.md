# Audit claims — BARE-BUTTON (`cb`), round 1

Subject: the unit's record — `cb.diff` and `cb-status.txt` (the worktree `/home/user/veneer-cb` against
`a9dff19`), the shared patch `cb-shared.patch` (one unified diff against `a9dff19`), the report
`b-cross-cb-report.md`, and the records under `cb-instruments/` (`cb-mutate.sh`, `cb-mutations.log.txt`,
`cb-red.log.txt`, `cb-green.log.txt`, `cb-matrix.txt`, `cb-forms-probe.ts.txt`, `cb-cascade-before.txt`,
`cb-cascade-after.txt`, `cb-conformance-unpatched.log.txt`, `cb-app-unpatched.log.txt`, the
`cb-baseline-*`, `cb-gate-*`, and `cb-scratch-*` logs) — against the brief `b-cross-cb-brief.md` and the
design verdict `/home/user/scaffold/.orkestrel/veneer/b-cross-cb-design-verdict.md` (B1 to B7), whose
evidence is the planner and analyst proposals beside the brief and V9 in
`/home/user/scaffold/.orkestrel/veneer/b-collapse-verify-verdict.md`. The unit was written by `opus` on
Opus 5.5. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence, and
before confirming a claim about a proof names the mutation that would make the proof fail and whether
its assertions distinguish that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the design
verdict's B1 to B7 stand; the Orchestrator's apply check (`cb-shared.patch` on a fresh `a9dff19`
extract) settles the apply clause; the scratch copy was deleted before the report, so a lane rules the
gate and mutation claims from the code's assertions and the retained logs, and names which it read.

1. **Scope.** `cb-status.txt` lists the brief's owned paths and nothing else, and the shared patch
   touches only files the brief's Shared list names.
2. **B1 and B2: the cascade.** In the emitted cascade the universal `button` rule carries the release's
   reboot declarations for a button (the declarations Bootstrap 5.3.8's `scss/_reboot.scss` writes on
   `button`, at its values) and nothing else; the `button:not([class], [data-bs-target])` rule carries
   the calibrated surface; every hover, active, focus-visible (with its forced-colors ring), disabled,
   and reduced-motion branch is scoped to that selector; the reboot's focus, role, typed-input, and
   enabled-cursor rules are unchanged.
3. **The coverage.** The report's search finds every button form the showcase renders; for each form,
   every property that moves is a Veneer addition the bare rule supplied, and no form loses a
   declaration its own release rule writes, as `cb-matrix.txt` reads.
4. **The proofs.** Each added or extended case fails on the unchanged partial (`cb-red.log.txt`) and
   passes on the fixed one (`cb-green.log.txt`); each mutation in `cb-mutations.log.txt` reddens the
   cases the log names, and those cases' assertions distinguish the mutation from the passing case;
   the restored build is byte-equal to the fixed build.
5. **B4: the showcase hook.** The mode control carries the `data-control` attribute, the
   `SHOWCASE_CONTROL` constant holds that name, the `Showcase` class sets it, the shell rule selects it,
   and the control carries no class; the retained unpatched run shows the class hook fails; the name
   follows `.claude/rules/names.md` and stays out of the `data-bs-*` namespace.
6. **B5: the ledger.** The shared patch removes every stale `#### reboot` departure row and stale
   Additions row the unpatched gate printed and adds exactly the Additions rows it printed, each Reason
   true of its selector; the conformance file's forced-colors key literals equal the compiled selector;
   the conformance and guides runs on the scratch copy exit 0.
7. **B3: the guide and comments.** The § Styles paragraph states the scope, that a classed button keeps
   the reboot alone, why the `data-bs-target` attribute is excluded, and that the `btn` class gives the
   Button treatment; the § Files, § Tailwind, and § Showcase sentences read true; the close proof's and
   the integration file's dropped comments were false once the bare rule stopped reaching the close
   control, and the added close case states that the release declares no transition on it.
8. **Law and report.** No changed line adds an `any`, an `as` beyond a const assertion, a `!`, a
   suppression, or a nested function; the report states no temporal word and no tally, writes each
   gate's command with its result line, and follows every code token with its noun; the lane lists
   every count the report states, for the record.
