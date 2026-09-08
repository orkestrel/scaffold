# Retain the reader referral and resumed test evidence

Act as a bounded builder. Read AGENTS.md, .agents/orchestration.md, the portability,
writing, quality, and documentation rules, the campaign handoff, and the
orkestrel-align-packages skill with its fleet reference. Spawn nothing.

Own tmp/pass/retain-referral.sh only and return its report under
tmp/units/d7n-windows-referral-retention-report.md. Other agents own target source and
record decisions. Preserve their edits. Do not run the script body, install, commit,
push, publish, delete, or read credentials. bash -n alone is allowed.

Use set -eu and source pass-env.sh. Build a retention helper that copies a source to a
named destination, accepts an identical retained copy, and refuses a different copy.
Use forward-slash paths and git -C for every git command.

Retain these tmp/units files under their basenames in the campaign directory:
d7n-mcp-reconciliation-scout-brief.md, d7n-mcp-converge-fix-windows-brief.md,
d7n-guide-heading-probe-brief.md, d7n-guide-heading-probe-instrument-report.md,
d7n-guide-heading-assessment-brief.md, d7n-windows-landing-instrument-brief.md,
d7n-windows-landing-instrument-report.md, d7n-windows-landing-check-brief.md,
d7n-windows-referral-retention-brief.md, d7n-windows-referral-retention-report.md.
Do not guess filenames. Check every required file exists before copying anything.

Retain tmp/pass/run-fix.sh, land-p2.sh, run-mcp-scout.sh, probe-guide-heading.sh, and
retain-referral.sh under campaign instruments/d7/windows using their basenames.
Retain mcp/tmp/d7n-guide-heading/probe.mjs in that directory as guide-heading-probe.mjs.
Retain tmp/pass/d7n-guide-heading.log.txt at the campaign root under its basename.
Project the completed tmp/cursor/d7n-mcp-reconciliation-scout.jsonl with the existing
read-journal.mjs in result mode and retain the result as d7n-mcp-reconciliation-scout-result.txt.
Keep raw provider journals in tmp; do not publish their provider metadata.

Take an optional argument probe. Without that argument, retain only the items already
named. With probe, require its CLI journal to contain a terminal result event before
reading its checkout, require tmp/units/d7n-probe-tests-report.md, and retain that report.
Retain its ported tmp/units/d7n-probe-tests-brief.md as
d7n-probe-tests-windows-ported-brief.md. Project the completed journal result to
d7n-probe-tests-windows-result.txt. Capture git -C probe diff 135aab7 --
tests/src/server/Probe.test.ts and git -C probe status --short as
d7n-probe-tests-windows.final.diff.txt and d7n-probe-tests-windows.final.status.txt.
Retain the current red.log.txt, green-server.log.txt, green-guides.log.txt, and check.log.txt
from probe/tmp/d7n-probe-tests under campaign names prefixed d7n-probe-tests-windows-.
Refuse missing evidence instead of inventing it. Do not overwrite previous scratch captures;
use a fresh subdirectory from mktemp -d under tmp/pass for each invocation.

Fail on every error. Do not stage or commit. Main runs retention and the separately
accepted push-record.sh after it has ruled the evidence.
