# Audit claims — LEDGER (`cl`), round 1

Subject: LEDGER's record — `cl.diff` and `cl-status.txt` (the worktree `/home/user/veneer-cl` against
`42fd88e`), the shared patch `cl-shared.patch` (one unified diff against `42fd88e`), the report
`b-cross-cl-report.md`, and the records under `cl-instruments/` (the mutation log
`cl-mutations.log.txt`, the mutation scripts and their JSON inputs and outputs, `cl-setup-red.log.txt`,
`cl-setup-green.log.txt`, `cl-setup-baseline.log.txt`, `cl-scratch.sh`, `cl-gates.sh`, and the
`cl-gate-first-*` and `cl-gate-final-*` logs) — against the brief `b-cross-cl-brief.md`, the design
verdict `/home/user/scaffold/.orkestrel/veneer/b-cross-design-verdict.md` (rulings X6 and X7 and § Family
record), `oc-audit-verdict.md` claim 4, and `dr-audit-verdict.md` claim 3. The unit was written by `opus`
on Opus 5.5. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence, and
before confirming a claim about a proof names the mutation that would make the proof fail and whether
its assertions distinguish that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the
Orchestrator's apply check (`cl-shared.patch` on a fresh `git archive 42fd88e` extract, `git apply
--check`, exit 0) settles the apply clause; the scratch copy was deleted before the report, so a lane
rules each gate and mutation claim from the code's assertions and the retained logs, and names which it
read; `tests/setupStyles.test.ts` in the shared patch is admitted, because the family record lists it as
shared and the `media` member the unit adds to the `OracleInventory` type makes its fixture false.

1. **Scope.** `cl-status.txt` lists `tests/setupServer.ts` and `tests/setupServer.test.ts` and nothing
   else; `cl-shared.patch` touches `guides/veneer.md`, `tests/conformance.test.ts`, and
   `tests/setupStyles.test.ts` and nothing else; no off-limits file changes.
2. **Media conditions (X6).** The `readConditions` function returns one row per media condition the
   release records, each normalized the way the built stylesheet's conditions normalize; the
   `{breakpoint}` template expands over the release's `--bs-breakpoint-*` values, and the release's
   exclusive upper bound is written as `{breakpoint} - 0.02px`; the media parity case in
   `tests/conformance.test.ts` reddens on a planted `(min-width: 600px)` condition and on a table row
   removed, and its assertions distinguish each from the passing case.
3. **Keyframes (X7).** The `readKeyframes` function returns each recorded keyframe name with its
   component and its reduced-motion treatment as the release's compiled stylesheet writes it; the
   presence scan returns `Shipped component <key> is missing keyframes <name>` for a shipped key whose
   recorded keyframe the cascade does not define, and reddens on a keyframe deleted from a written
   fixture alone; the `collectAdditions` function throws `Keyframes <name> answers to no shipped
   component` for an unattributed keyframe; a keyframe a withheld key records stays outside the ledger
   without a throw, and that departure from the objective lane's wording follows the treatment X1 gives
   a withheld key's selectors.
4. **Condition-keyed priority.** The priority case compares each declaration's priority keyed by its
   condition, through the `collectDeclarationPriorities` function, with selector lists split before
   comparison; the `.offcanvas-sm { background-color }` swap reddens it, and the same swap leaves the
   `42fd88e` case green, as the retained runs show.
5. **The `__proto__` digest.** The `readOracleInventory` function writes digests and components into
   objects with no prototype; an inventory carrying a `__proto__` digest key returns that key, and the
   ordinary-object mutation reddens the proof; the report states that the components half has no
   mutation of its own.
6. **Guide.** The `### Media conditions` and `### Keyframes` sections, the § Files row, and § Tests read
   true against the readers and the release; the parity cases run green with the patch applied and each
   reddens on a table row removed; the added sentences wrap at the guide's width and use one term per
   concept.
7. **Law and report.** No changed line adds an `any`, an `as` beyond a const assertion, a `!`, a
   suppression, or a nested function; every helper the unit extracts or exports is tested and carries
   TSDoc, and no helper stays hidden in a module; the report quotes each gate's result line from its log,
   states no temporal word, and follows every code token with its noun; the lane lists every count the
   report states, for the record.
