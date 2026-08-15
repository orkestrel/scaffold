# H4 audit round 1 — the history wire and the runtime's one durable spine

Subject: commit 59276a7 (baseline de27a61; plus 33d8b19 removing an Orchestrator probe's stray
`database` file — process residue, not audit subject), Sol implementer over the bench (three
rounds on thread `01a00360-2533-7a13-a16c-5124a002af21`: unit, serialization fix, composition
repair under an Orchestrator grant and merged-context ruling). Thirty files. Decides whether H5
builds the browser mechanics on this wire.

Established (Orchestrator-verified, not this audit's subject):
- The restart proof (`discovers and inspects completed SQLite history after an application
  restart`) went red on the first two acceptance runs and GREEN on the third after the
  composition repair; the final chain's one red was `CLIProvider > escalates timeout
  termination…`, re-run alone 16/16 — recorded load flake (`tmp/redesign/h4-accept2.log`).
- The disease predates H4: `inspect`, `tail`, and `#available` were latently unsafe before this
  unit; the history path made it reproducible. Recorded as surfaced-not-caused.
- The Orchestrator's probes: fresh DB app 500 on first start (round 1), then history 500 with
  the catalog row correct in SQLite (round 2) — both in the campaign record.
- Guides parity delta enumerated by the unit (history constants/types/functions +
  `ApplicationInterface.history` + the rename) — U7's carrier.

Evidence: diff `tmp/redesign/h4.diff` (git show 59276a7, 1506 lines); the unit report
`tmp/redesign/h4-report.md` and the composition-round report `tmp/redesign/h4-fix3-report.md`
(the nine-path enumeration table); the briefs `h4-brief.md` + successors; design
`tmp/redesign/history-analyst.md` §2; the tree at 33d8b19.

Claims (falsify shape; CONFIRMED names the failed attack; one terminal line; no diary):

1. **The endpoint is design §2 exactly.** Released-only; grants applied through
   `RunListOptions.runs` for named sessions and unrestricted for `*`; `limit`/`cursor`/`prefix`
   parsed and validated in the app/core homes; the cursor round-trips through the wire shape;
   invalid queries refuse in the routes' established fault shape; session auth matches the
   roster routes. Attack the grant edge (a session granted zero workflows; a grant list that
   names a prefix-matching but unauthorized run) and the cursor wire shape (a tampered cursor).
2. **The merged spine is sound.** `ApplicationPersistence` owns one driver, one merged schema
   (leases/runs/units/snapshots/sessions), one Lane admitting every durable operation including
   shutdown; the nine-path table's SAFE rulings hold under attack (pick the three you judge
   most fragile and attack them specifically); no wrapper retains an independent context or
   admission path; destruction drains before close.
3. **The Lane adapters are boundaries, not renames.** `LaneWorkflowStore` and
   `LaneSessionStore` add real serialization/admission semantics per the no-superfluous-
   wrappers law and change nothing else about their stores' contracts.
4. **The six carriers closed genuinely.** The unfiltered `limit: 1` top-of-page binding; the
   two-driver no-duplicate probe's reasoning (the ratchet places re-stamps above the exclusive
   boundary — is that airtight for ties?); the `computeRunUpdated` branch coverage; the rename
   with zero residue; the release `@throws` truthful on both stores; the `list` recovery
   boundary observed by a real proof.
5. **Scope, placement, and residue.** New files in their designated homes; single-word members;
   no forbidden constructs; the touched set is exactly the unit's; no probe debris remains
   anywhere in the tree (the stray `database` file was removed — sweep for any sibling).

Lane split: the analyst (Sol, bench — the writer's engine; primary round, the reviewer keeps it
two-engined) takes 1-5 objectively. The reviewer (Opus) takes 3-5 subjectively plus design fit:
`ApplicationPersistence`'s name and shape (a justified composition or a wrapper wearing one),
the endpoint's wire vocabulary against the house laws, the TSDoc voice on the new contracts,
and whether the nine-path table's prose belongs in code comments or the guide. Read-only lanes;
evidence supplied above.
