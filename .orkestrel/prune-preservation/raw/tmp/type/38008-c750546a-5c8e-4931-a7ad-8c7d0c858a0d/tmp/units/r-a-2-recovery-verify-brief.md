# Unit R-A-2 recovery — independent verification

## Role and engine

Verifier on Terra, native Codex executor. Run read-only gates in C:/Users/mikes/WebstormProjects/roughnotes.

## Objective

Establish the actual gate state of the interrupted R-A-2 edits without changing source.

## Context

**Evidence.** Read scaffold/.orkestrel/campaign/recovery-distillate.md and r-a-brief-2.md. The Roughnotes HEAD is 86a9ef6; git status records the recovered uncommitted edits. The original writer returned no report before the Claude weekly limit. Its browser and journey readings are historical, not acceptance.

**Law.** Read Scaffold AGENTS.md, .agents/orchestration.md, .claude/rules/tests.md, workspace.md, browser.md, application.md, portability.md, writing.md, and quality.md; then orkestrel-prove-journey/SKILL.md and its required references; then Roughnotes guides/README.md. Read Roughnotes AGENTS.md if present. Do not edit a vendored file.

**Installed primitives.** No implementation. Record declared and installed @orkestrel/test and @orkestrel/scaffold versions without network access.

**Host.** Windows, PowerShell, unrestricted local gate execution. Use npm.cmd if the PowerShell shim is blocked. No installs or source edits.

**Measurements.** Parent observed App.vue mtime 2026-09-17 19:40 and App.test.ts mtime 19:49. Prior worker PIDs 24828, 25140, 25128 no longer exist. Only the Claude UI PID 12140 remains from those rows.

**Control identifiers.** Preserve R-A-2 identifiers only in this brief and the evidence report; test names describe behavior.

**Standing conditions.** Expect modified app/browser/App.vue, components/HomeView.vue, MagazineView.vue, MediaView.vue, ProductsView.vue, constants.ts, guides/README.md, tests/app/browser/App.test.ts, helpers.test.ts, and setup.ts. Ignore untracked .codex content. Expect format:check to report the vendored vite.config.ts pending the scaffold release; report the exact actual reading.

## Unknowns

Report every gate failure and its path. Do not infer it is unrelated from the prior report.

## Scope

**Owned.** Gate execution only; no source files.

**Shared (report-only).** All source, tests, configs, and campaign artifacts.

**Off-limits.** Credentials, .env files, .npmrc, auth files, dependency installations, publishing, commits, process termination, source fixes, and discarding git commands.

**What asserts the state this change ends.** Recovered browser tests, test:journey, policy, config, and the repository gate chain.

**Tools and limits.** Read and shell tools. Run each following command separately, in order, recording its exit code. No mutating lint or formatter. Build outputs are allowed. Do not run gates concurrently. Perform the assignment directly and spawn nothing.

## Execution

Run git status --short and git log --oneline -1. Read manifest versions and installed package versions. Then run npm run format:check, npm run lint:check, npm run check, npm run build, npm test. Continue after format failure to establish the other gates; after another gate failure, still run the remaining independent gates once, without repairs. npm test must exercise the browser and journey scripts through its existing chain; do not repeat those scripts if the chain reaches them. Report scripts the test chain never reaches.

## Output

Return a gate table with exact commands, exit codes, concise totals or failure excerpts, owning paths, installed version readings, and final git status. Report GATES: GREEN or GATES: RED followed by failing commands. Return as the final message; do not write a report file.

## Deviation contract

Follow orchestration Deviation protocol. Report a command unavailable or blocked; do not substitute weaker proof or fix the tree. Resolve npm shim choice within scope.

## Acceptance criteria

- Every invoked gate has an observed exit code and output.
- Browser and journey discovery is accounted for from the actual test chain.
- Source remains unchanged.

**Observations, not criteria.** Gate failures are findings about the subject, not reasons to repair it in this unit.

## Review evidence

Use actual git status and gate output. Prior runs establish no pass for this tree.
