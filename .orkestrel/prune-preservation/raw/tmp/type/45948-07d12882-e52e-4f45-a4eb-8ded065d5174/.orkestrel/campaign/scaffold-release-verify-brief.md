# Unit Scaffold 0.0.75 — independent candidate gates

## Role and engine

Verifier on Terra, native executor.

## Objective

Measure the isolated Scaffold release candidate's prepublish gate and report exact failures without repairs.

## Context

**Evidence.** The worktree C:/Users/mikes/WebstormProjects/scaffold/tmp/release/scaffold-0.0.75 is on recovery/scaffold-0.0.75 at 178c7cbb. The reviewed preparation script ran successfully: npm version 0.0.75 --no-git-tag-version, npm install --save-dev @orkestrel/test@^0.0.18. Registry confirmed scaffold 0.0.74 and test 0.0.18. No other Orkestrel range was outdated in the registry sweep. See tmp/release/prepare-scaffold-0.0.75.ps1 in the orchestrator checkout and its log.

**Law.** Read the worktree AGENTS.md, .agents/orchestration.md, applicable tests/workspace/portability/quality/documentation/writing rules, orkestrel-publish/SKILL.md and references/wave.md, and guides/README.md. Governing change: root orchestrator .orkestrel/campaign/s6-report.md and s6-brief.md.

**Installed primitives.** Installed @orkestrel/test 0.0.18, all other manifest dependencies from the lockfile. Do not install or change any package.

**Host.** Windows, PowerShell, npm.cmd. The worktree contains no unrelated local Codex modifications. Run commands from this worktree, not the orchestrator checkout.

**Measurements.** Read current git status and manifest versions before gates.

**Control identifiers.** None; prior S6 report carries its regression control.

**Standing conditions.** package.json and package-lock.json are dirty from preparation. Build may regenerate host.json; generated output is allowed. Do not fix source or fixtures.

## Unknowns

Report any snapshot, fixture, generated inventory, or dependency mirror mismatch. Do not infer a baseline expectation can be updated without a writer.

## Scope

**Owned.** Gate execution in the isolated worktree only; no source writing.

**Shared (report-only).** Every source, fixture, guide, manifest, and script.

**Off-limits.** Installs, source repairs, mutating format/lint, commits, pushes, uploads, credentials, .npmrc, .env files, and unrelated root edits.

**What asserts the state this change ends.** S6 formatter corpus, package fixture pins, host inventory, and release-mode distribution tests.

**Tools and limits.** Read and shell tools; build output allowed. Run npm.cmd run prepublishOnly. If the chain stops before build due to source formatting, report and stop. If it stops on a post-build test, run the remaining named test scripts individually only to map further independent failures, and report their exact exit codes. Do not repeat passed projects.

## Execution

Perform the assignment directly and spawn nothing. Keep the command tracked in the harness, observe its output, and report its exit code. Do not detach a process.

## Output

Return command, exit code, exact failure excerpts and owning paths, reached and unreached gate stages, generated changes, and actual git status. Say GATES: GREEN only when prepublishOnly passed in full. Return as the final message, not a file.

## Deviation contract

Follow orchestration Deviation protocol. Stop and report when a repair or an install is needed. Resolve npm shim selection within scope.

## Acceptance criteria

- Every invoked command has an observed result.
- The final report distinguishes reached and unreached stages.
- Source stays unchanged.

**Observations, not criteria.** Failures are the evidence this unit returns, not an instruction to fix.

## Review evidence

Actual gate output and git status from the isolated worktree.
