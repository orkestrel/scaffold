# Audit: the fix rounds (P-fix, P4-fix, S-fix)

## Role and engine

Two lanes, split by authorship so no engine audits its own writing. Neither sees the other.

- Sol lane: role `analyst`, engine GPT-5.6 Sol, journaled `codex exec`, sandbox
  `workspace-write` rooted at `C:/Users/mikes/WebstormProjects/probe`. Subject: **P-fix**
  (written by Opus). Probes under `tmp/`, deleted after reading; subject files never edited.
- Opus lane: role `reviewer`, engine Opus 5, native subagent, read-only. Subject: **P4-fix**
  (process) and **S-fix** (scaffold), both written by Sol.

Each lane performs the assignment directly and spawns nothing beyond its permitted probes.

## Objective

This is a fix-round audit, bounded: for each finding the ruling record carries, verify that
the landed fix implements the prescription with its stated constraint, that its proof
discriminates (would red against the unfixed code), and that no regression rides along in the
owned files. It is not a fresh full audit of the packages.

## Context

- Ruling records (the prescriptions):
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/audit-probe-reconciliation.md`
  (P-fix), `.../audit-process-reconciliation.md` (P4-fix),
  `.../audit-scaffold-reconciliation.md` (S-fix).
- Fix briefs, same folder: `unit-pfix-brief.md`, `unit-p4fix-brief.md`, `unit-sfix-brief.md`.
- Unit reports: `unit-p4fix-report.md` and `unit-sfix-report.md` carry the units' diffs,
  criterion outputs, and failing-first pairs. `unit-pfix-report.md` is a capture note: the
  P-fix report was lost to context compaction; the Sol lane re-derives discrimination by
  probe where its ruling needs executed evidence.
- Orchestrator's authoritative host runs, taken after each writer exited (2026-08-21):
  probe `src:server` `143 passed | 2 skipped`, exit 0; process `src:server`
  `130 passed | 6 skipped`, exit 0. S-fix's whole-tree scaffold lint exited 0 in the unit's
  own sandbox run.
- Subject checkouts: probe, process, and scaffold under `C:/Users/mikes/WebstormProjects/`.
  Every working tree carries standing wave edits beyond the fix; the reconciliation's finding
  list bounds what each lane rules on.
- Host facts: Windows 11, Git Bash, `npx.cmd`. The bench sandbox denies network and
  grandchild processes; a whole-suite or timing reading inside the exec is an observation,
  not a verdict — the Orchestrator's runs are the authoritative totals.

## The claims

Sol lane, over P-fix in probe (findings numbered as in `audit-probe-reconciliation.md`):

1. `isRefusedName` guards every property access (a hostile `has` trap or throwing getter
   returns `false`), the `ERR_INVALID_ARG_VALUE` branch requires a NUL in `file`, and every
   real-fault classification from the audit's attack table is byte-identical to before.
2. `REFUSED_RUNTIME_TARGETS` reads the fault's code directly and stays independent of
   `isRefusedName`; the accepts-the-name direction is kept.
3. The claimant-side progress sample runs ungated on the marker-file rendezvous; the
   cleanup-side sample stays FIFO-gated with assertions exactly as strong; the corrected
   comment is true.
4. The TTY skip citation names the absent `script` binary and claims nothing broader.
5. Exactly one authoritative pin of the public-door property remains in
   `ProbeServer.test.ts`.
6. The two guide rows state what the code does, and the `isRefusedName` row's "Never throws"
   is now true.

Opus lane, over P4-fix in process and S-fix in scaffold (as numbered in their
reconciliations):

7. Each P4-fix finding's fix matches its prescription: the package-initiated input phase
   settles pending sends without a protocol event, a later host fault on a writable channel
   still emits `protocol`, the flood discriminator's pair comparison is whole, the
   send-during-stop divergence is closed as ruled, `execute` sets the cause as ruled, and
   the guide prose claims only what the code now earns.
8. Each P4-fix failing-first pair in `unit-p4fix-report.md` binds to its finding: the red
   would fire against the unfixed code, not against an unrelated seam.
9. Each S-fix finding's fix matches its prescription with its constraint honoured: CR-tolerant
   splitting; fence indent tolerated to three spaces and four stated as the limit; bridge
   bodies scanned with membership strings true; the directory allowlist rejecting empty
   non-allowlisted directories without re-reporting the nested-references rule's subject;
   the plugin reporting on a method-ancestor walk with the method node exempt and the
   `ClassExpression` pin kept; `isPolicyVisitor` exercised by a case only it admits;
   the documentation.md sentence placed as ruled; the two ROADMAP rows honest.
10. Each S-fix failing-first pair in `unit-sfix-report.md` binds to its finding.
11. No regression rides along in either unit's owned files: nothing outside the prescriptions
    changed behaviour, and no prescription was quietly narrowed.

## Scope

- Off-limits for both lanes: editing subject files; `git checkout`/`restore`/`stash`/
  `reset`/`clean`; commits; installs; credential reads.
- The Opus lane is read-only and rules from the reports' diffs plus current source; where a
  claim needs an executed reading it cannot take, it marks UNRESOLVED and names the settling
  command.

## Output

Per-claim verdicts (CONFIRMED / BROKEN / UNRESOLVED / NOT-EVIDENCED) with evidence, findings
outside the claims, one terminal line:
`VERDICT: PASS|FAIL — <n> broken, <n> unresolved, <n> not-evidenced, <n> findings outside the claims`.
No process diary.

## Deviation contract

A lane that cannot reach a named file stops and reports. Ancillary choices are the lane's
own: decide, record, carry on.
