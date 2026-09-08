# Retain and push the Windows record

Act as a bounded builder. Read AGENTS.md, .agents/orchestration.md, the portability,
writing, quality, and documentation rules. Read the campaign handoff and the
orkestrel-align-packages skill with its fleet reference. Spawn nothing.

Own tmp/pass/retain-windows.sh, tmp/pass/push-record.sh, and tmp/pass/record-message.txt
in C:/Users/mikes/WebstormProjects/scaffold. Other writers own package source and
the Orchestrator owns campaign decisions. Do not revert their edits.

Write Git Bash scripts with forward-slash paths. Every script sources
/c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh and sets set -eu.
Do not run the scripts, install, commit, push, publish, or read credentials.

The retention script copies the following existing scripts into the new campaign
instruments/d7/windows directory: inspect-fleet.sh, install-heads.sh, merge-mcp.sh,
recheck-mcp-merge.sh, land-mcp-merge.sh, port-dispatches.sh, run-probe-tests.sh,
database-canon.sh, run-terminal-scout.sh, read-journal.mjs, retain-windows.sh,
push-record.sh. It must not overwrite an existing retained file with different bytes:
use cmp to accept an identical copy and fail on a difference.

Retain the following tmp/units briefs at the campaign root under their current names:
d7n-probe-tests-windows-brief.md, d7n-resume-writers-windows-brief.md,
d7n-database-canon-brief.md, d7n-terminal-reconciliation-scout-brief.md,
d7n-windows-record-instrument-brief.md. Apply the same no-overwrite rule.

Retain tmp/pass/bootstrap/mcp-merge.log.txt, mcp-merge.diff.txt, and mcp-merge.status.txt
as campaign d7n-mcp-windows-merge.log.txt, d7n-mcp-windows-merge.diff.txt,
and d7n-mcp-windows-merge.status.txt. Do not copy a still-running journal.
Keep the raw completed tmp/cursor/d7n-terminal-reconciliation-scout.jsonl in tmp.
Project its result through read-journal.mjs in result mode into
tmp/pass/d7n-terminal-reconciliation-scout-result.txt and retain that file under its
basename. Preserve result text and session evidence; do not publish provider metadata.
Also retain the record-instrument report and its check brief under their basenames.

The push script runs git -C with the explicit scaffold path for every git command.
It checks the branch is claude/orkestrel-npm-audit-deps-14ibta, runs diff --check
scoped to .orkestrel/campaign/docs-parity, stages that directory by path, and commits
ONLY that directory with --only and the message file. Owner package.json and
package-lock.json edits, including staged edits, must never enter this commit.
Commit identity is user.name=Claude and user.email=noreply@anthropic.com.
Push the working branch with -u, HEAD:main, and
HEAD:claude/docs-parity-windows-01a0810d. Print the resulting tip and short status.
Do not run discard-class commands. Fail on any command failure.

The message title is Record the Windows bootstrap and resumed units. Its trailers are
Co-Authored-By: Claude <noreply@anthropic.com> and
Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743.

Return a report at tmp/units/d7n-windows-record-instrument-report.md with syntax-check
evidence only. Use bash -n for shell scripts. Do not execute their bodies.
