# Prepare the serial writer and landing instruments

Act as a bounded builder. Read AGENTS.md, .agents/orchestration.md, the portability,
writing, quality, and documentation rules, the campaign handoff, and the
orkestrel-align-packages skill with its fleet reference. Spawn nothing.

Own tmp/pass/run-fix.sh and the ported tmp/pass/land-p2.sh in scaffold only.
The retained instruments/d7/pass/land-p2.sh is immutable. Other agents own package
source and record decisions. Do not revert their edits. Do not execute either script,
install, commit, push, publish, or read credentials. Syntax checks alone are allowed.

Each script uses set -eu, sources the existing pass-env.sh, and uses forward-slash
paths. Every git call explicitly uses git -C with the target path. No discard commands.

run-fix.sh takes a package argument restricted to agent, ollama, workflow, program,
terminal, or mcp. For agent, ollama, workflow, and program it reads the current ported
tmp/units/d7n-PACKAGE-converge-fix-brief.md with the shared
d7n-resume-writers-windows-brief.md host supplement. For terminal and mcp it reads
tmp/units/d7n-PACKAGE-converge-fix-windows-brief.md. Refuse a missing brief or report
that already exists. Print target HEAD and status, and refuse a nonempty tracked diff
or untracked unignored content before launch. Do not install or modify target source.
Launch the working CLI from scaffold with the implementer agent, model opus, effort high,
permission-mode acceptEdits, explicit --add-dir for the target, stream-json and verbose,
and a timeout of 5400 seconds. Set CLAUDE_CODE_GIT_BASH_PATH to the known host executable.
Write a fresh journal tmp/claude/d7n-PACKAGE-converge-fix-windows.jsonl and matching stderr.
Refuse to overwrite either. The prompt names its brief, target, sole-writer condition,
required instructions, no installs or delegation, and report path under tmp/units.

land-p2.sh takes a package argument and a stage. Restrict stages to fix, tests, or canon.
For fix, unit is d7n-PACKAGE-converge-fix; for tests, permit only probe and use
d7n-probe-tests; for canon, permit only database and use d7n-database-canon.
Require the returned tmp/units/UNIT-report.md. Refuse no diff, staged changes from an
unknown actor, and untracked unignored files. Require the expected working branch.
Capture changed tracked paths using git diff --name-only, without evaluating path text.
For probe tests permit only tests/src/server/Probe.test.ts. For database canon permit
only tests/guides.test.ts. For docs fix permit guides/PACKAGE.md, README.md,
tests/guides.test.ts, and src/*.ts descendants. Reject every other path before staging.
The diff checker owns proving that permitted source changes are doc blocks only.

Capture the precommit diff and status plus landing output under tmp/pass/land using
UNIT in the filename. Stage each changed path explicitly, never -A. Commit only those
paths with --only so no unrelated staged content enters. Use user.name=Claude,
user.email=noreply@anthropic.com, Co-Authored-By: Claude <noreply@anthropic.com>,
and Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743.
The probe tests title is Replace the suite's candidate drafts with lint-clean functions.
The database canon title is Move database surface derivation into its package case.
The fix title is Converge PACKAGE documentation after its audit.

Retain UNIT-report.md, UNIT.diff.txt, UNIT.status.txt, and UNIT.log.txt under the campaign
folder with the same basenames. Refuse to overwrite different retained evidence. Do not
push; the Orchestrator records the landing and decides closure pushes separately.
Never copy a live journal in this instrument. Fail closed on every command error.

Return tmp/units/d7n-windows-landing-instrument-report.md with the changed script paths
and bash -n result. Do not test through a real commit or other mutating body.
