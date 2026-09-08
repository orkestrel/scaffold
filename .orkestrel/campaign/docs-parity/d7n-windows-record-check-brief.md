# Check the Windows record instruments

Act as a read-only checker. Read AGENTS.md, .agents/orchestration.md, and the portability,
writing, and quality rules. Read tmp/units/d7n-windows-record-instrument-brief.md,
its report, and every named output file. Read the campaign handoff for branch authority.
Spawn nothing. Other agents own sibling package source; do not edit anything.

Try to break these claims. Report PASS, FAIL, or UNKNOWN for each named claim.

- Retention copies only the brief's named existing artifacts and refuses to replace a
  different retained copy. It never reads credentials or deletes data.
- Every git command explicitly addresses scaffold, the required branch is checked,
  the commit excludes owner manifest and staged lockfile edits, and only the campaign
  directory is staged and committed. Git failures stop the script.
- Commit identity, trailers, and push targets match the current session and handoff.
- The report's syntax-check reading is supported, and the scripts' bodies were not run
  by the writer. Read-only evidence checks are allowed; never execute mutating bodies.

Return the verdict in tmp/units/d7n-windows-record-check-report.md if your role permits
writing a report; otherwise return the full report in chat for the Orchestrator to retain.
