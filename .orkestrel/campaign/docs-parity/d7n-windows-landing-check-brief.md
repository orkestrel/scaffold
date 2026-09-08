# Check the Windows writer and landing instruments

Act as a read-only checker. Read AGENTS.md, .agents/orchestration.md, the portability,
writing, and quality rules, and the campaign handoff. Read
tmp/units/d7n-windows-landing-instrument-brief.md and its report, tmp/pass/run-fix.sh,
and tmp/pass/land-p2.sh. Spawn nothing; do not execute either script body.

Try to break these claims and return a verdict per named claim:

- Launch accepts only scoped packages, refuses stale evidence and a dirty target, names
  the required brief and host supplement, uses the assigned route, and captures a bounded
  tracked run without installing or bypassing permissions.
- Landing refuses unknown stages, wrong branches, staged changes, untracked files,
  missing reports, and changed paths outside ownership. It cannot stage a vendored file.
- Every git call names its checkout. The commit uses the current identity and session,
  stages only selected paths, and cannot absorb unrelated staged content.
- Evidence retention preserves different existing artifacts by refusal. Failure paths
  stop with visible evidence. The script does not push, install, delete, or read credentials.

Check syntax with bash -n. Report static hazards with exact sites and a minimal correction.
Do not claim the scripts were executed. Main will run the accepted bodies and retain their
actual logs. Return your full report in chat; do not write outside your read-only role.
