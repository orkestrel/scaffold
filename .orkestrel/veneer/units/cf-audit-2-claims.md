# Audit claims — FADE (`cf`), round 2

Subject: round 2's record — `cf-2.diff` and `cf-2-status.txt` (the worktree `/home/user/veneer-cf`
against `42fd88e`), the revised shared patch `cf-shared-2.patch` (one unified diff against `42fd88e` that
supersedes `cf-shared.patch` whole), the unchanged off-limits patch `cf-instruments/cf-offlimits.patch`,
the report `b-cross-cf-report-2.md`, and the round-2 records under `cf-instruments/`
(`cf-mutations-2.log.txt`, `cf-2-red.sh`, the `cf-2-nopartial-*` and `cf-2-partial-*` logs,
`cf-2-gates.sh` and the `cf-2-gate-*` logs, and `cf-2-guide.py`) — against the successor brief
`b-cross-cf-brief-2.md` (F-a to F-d), the round-1 verdict `cf-audit-verdict.md` and its lane verdicts,
and round 1's record. The unit was written by `opus` on Opus 5.5. Each claim is falsifiable; a lane rules
CONFIRMED or BROKEN with `file:line` evidence, and before confirming a claim about a proof names the
mutation that would make the proof fail and whether its assertions distinguish that mutation from the
passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the round-1
verdict's rulings stand, and every claim it confirmed stays confirmed unless round 2 changed its
subject; the Orchestrator's apply check (`cf-shared-2.patch` then `cf-offlimits.patch` on a fresh
`42fd88e` extract, exit 0) settles the apply clause; the capture frames stay the Orchestrator's reading
at landing.

1. **Scope and delta.** `cf-2-status.txt` lists round 1's owned paths and nothing else; against round 1,
   the owned files change only in the fade proof's component case title and comment and in the section
   module's and proof's constant names; the shared patch adds only files round 1's Shared list or the
   brief's § Nav grant names.
2. **F-a: the tab pane and the modal.** The `FADE_COMPONENT_CASES` table carries a `nav` row and a
   `modal` row with the classes the release's Tab and Modal plugins write at each end of their fades
   (`bootstrap/js/src/tab.js`, `modal.js`); the component case reads them, and the retained run without
   the partial fails on both rows; the binding case holds their classes to the `nav`, `modal`, and
   `transition` vocabularies; the § Nav clause, the Tests sentence, the case title, and the table's TSDoc
   read true against the table and the plugins.
3. **F-b: the registry remark.** The `CASCADE_KEYS` paragraph states the fade key's hidden state alone
   and what separates it from each transparent state the same block declines, and each state it names is
   one that block declines.
4. **F-c: one term.** No file names `TRANSITION_COPY` or `TRANSITION_SPECIMENS`; `FADE_COPY` and
   `FADE_SPECIMENS` are exported, frozen, and bound where the old names were; `transition` stays on the
   inventory key and its ledger rows.
5. **F-d: the failing-first runs.** The retained runs without the partial ran the shipped fade proof and
   section proof, under their shipped case titles, with the exits and result lines the report quotes.
6. **Law and report.** No changed line adds an `any`, an `as` beyond a const assertion, a `!`, a
   suppression, or a nested function; the report quotes each gate's result line from its log, states no
   temporal word, and follows every code token with its noun; the lane lists every count the report
   states, for the record.
