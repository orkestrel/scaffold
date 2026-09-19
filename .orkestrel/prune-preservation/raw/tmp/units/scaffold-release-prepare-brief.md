# Unit Scaffold release preparation — author the manifest command chain

## Role and engine

Builder on Terra, native executor; script authorship only.

## Objective

Write the exact replayable command chain that prepares the isolated Scaffold 0.0.75 manifest and dependency installation.

## Context

**Evidence.** The Orchestrator created C:/Users/mikes/WebstormProjects/scaffold/tmp/release/scaffold-0.0.75 at commit 178c7cbbe4f125e4d6ca33e54918f12f9339f5e9 on recovery/scaffold-0.0.75. git status --short returned empty. npm view @orkestrel/scaffold version returned 0.0.74; npm view @orkestrel/test version returned 0.0.18 on 2026-09-18. npm outdated over every declared @orkestrel dependency reported only test: installed and wanted 0.0.17, registry 0.0.18. npm ci --ignore-scripts completed; the full install in this script must run ordinary lifecycle scripts.

**Law.** Read Scaffold AGENTS.md, .agents/orchestration.md, .claude/rules/portability.md, writing.md, quality.md, workspace.md, then orkestrel-publish/SKILL.md and references/wave.md. Governing spec: package.json scripts and the retained .orkestrel/campaign/s6-report.md.

**Installed primitives.** Use npm commands; do not write package-file parsing or version arithmetic.

**Host.** Windows PowerShell, unrestricted shell, npm.cmd available. Root source has unrelated user .codex changes; the isolated worktree excludes them.

**Measurements.** Scope the script to the exact worktree path and verify its git HEAD before mutation.

**Control identifiers.** None; this is an explicit command chain.

**Standing conditions.** No package source edit is requested. No active writer owns the release worktree. Roughnotes verification is complete and a separate temporary probe writer owns only Roughnotes tmp/probe/ra2-recovery.

## Unknowns

None. Report a path or HEAD mismatch before authoring a destructive fallback.

## Scope

**Owned.** C:/Users/mikes/WebstormProjects/scaffold/tmp/release/prepare-scaffold-0.0.75.ps1 only.

**Shared (report-only).** The release worktree, the root checkout, and all manifests.

**Off-limits.** Execution of the script, installs, commits, tags, pushes, uploads, secrets, credentials, and source edits.

**What asserts the state this change ends.** package.json version 0.0.74 and @orkestrel/test development range ^0.0.17 in the isolated worktree.

**Tools and limits.** Write the owned script only. Read-only checks allowed. Do not execute npm version or npm install yourself.

## Execution

Perform the assignment directly and spawn nothing. Author a PowerShell script that sets its workdir to the exact isolated worktree, refuses a different HEAD or a dirty tracked status, then runs npm.cmd version 0.0.75 --no-git-tag-version and npm.cmd install --save-dev '@orkestrel/test@^0.0.18'. Check each exit code and stop on failure. Capture output to a log beside the script and emit a concise success or failure. Never set $HOME or shared system options. Use no credentials and perform no publish. Do not discard any files.

## Output

Return the script path and a concise description of its checks. Return no acceptance claim. The Orchestrator reviews and executes it.

## Deviation contract

Follow orchestration Deviation protocol. Choose log naming and error text within scope. Stop if the commands need any unowned mutation.

## Acceptance criteria

- The script only prepares the named version and existing dependency range in the named worktree.
- Every command failure stops the chain.
- The script contains no commit, push, tag, upload, deletion, or authentication operation.

**Observations, not criteria.** Future gate and fixture failures belong to the release candidate validation unit.

## Review evidence

Return the exact script for Orchestrator review before execution.
