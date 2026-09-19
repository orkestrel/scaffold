# Unit roughnotes-registry-adoption — Prepare the registry swap

## Role and engine

sol on GPT-5.6 Sol, reached as a native subagent. The executor opens this brief.

## Objective

Author a bounded instrument that replaces the accepted Roughnotes recovery checkout's local Scaffold archive with the verified registry release and writes consistent registry manifest and lock entries.

## Context

**Evidence.** Root ran `git -C tmp/recovery/roughnotes status --short` on 2026-09-18. The checkout has accepted uncommitted R-B source under app/browser, tests, guides/README.md, package.json, and vite.config.ts, deleted tests/app/browser/setup.ts and setup.test.ts, and untracked tests/setupBrowser.test.ts. Read that actual status yourself. Root read package.json: name roughnotes, private true, Scaffold ^0.0.74 and test ^0.0.18. Root ran `npm.cmd view @orkestrel/scaffold version dist.integrity --json --prefer-online --registry=https://registry.npmjs.org`: registry version 0.0.74. The owner reports publishing Scaffold; confirmation is pending. Read .orkestrel/campaign/roughnotes-integration-map-ruling.md for the accepted preservation decision and tmp/release/adopt-scaffold-0.0.75.ps1 only as historical swap evidence. Preserve it.

**Law.** Read AGENTS.md, .agents/orchestration.md, .claude/rules/portability.md, writing.md, workspace.md, application.md, quality.md, tests.md, and applicable syntax rules. Read .agents/skills/orkestrel-publish/SKILL.md with references/wave.md and references/window.md; this is a bounded registry restoration, not a fleet wave or overwrite visit. Read guides/README.md, guides/scaffold.md sections describing repair and ownership, and ROADMAP.md. Never add packages, assertions, suppression, mocks, or nested helpers. Preserve authoritative types and accepted product work.

**Installed primitives.** This unit owns a temporary release instrument, not product helpers. Read installed Scaffold's manifest and bin declaration. No overlapping product API is authorized. Existing launch instrument tmp/release/launch-anchor-retention.ps1 carries the measured native-handle and capped-process pattern.

**Host.** Windows PowerShell 5.1, Node 24.20.0, npm 12.0.2. Canonical root C:\Users\mikes\WebstormProjects\scaffold. Node resolves C:\Users\mikes\scoop\apps\nodejs-lts\current\node.exe; npm.cmd resolves the adjacent bin/npm.cmd. No pwsh. Network available. No sandbox override or approval requests. Resolve the JavaScript npm entry and invoke with Node; avoid shell-wrapped JavaScript. Root owns installs and mutating commands.

**Measurements.** Measure baseline branch, HEAD, manifest, lock and installed state before authoring. Expected recovery branch recovery/journey-20260918 and baseline 86a9ef6bc4620fdf36c47af1f4c530693357eb86 are supplied from earlier root readings; stop if changed. Canonical HEAD is 2574f559ba7b093df9b594e7c0003d7a3ff91fcf. Expected prepared Scaffold integrity is sha512-PEcCza8w+5lQqnZX0AP8QhCV3msFOf0JeBz0fwhvu4LP230avF14HuIUWPUkWCIxd1YxaYNM4pdgEFmqwWFi8A==.

**Control identifiers.** Prove wrong registry identity and source drift refusal using temporary inert data copies and the real comparison functions; do not touch application source or install anything. Name controls for the property they prove. Keep labels inside this brief.

**Standing conditions.** The recovery checkout intentionally carries accepted uncommitted work and a historical local Scaffold0.0.75 artifact. Do not treat that state as a defect to clean. Original Roughnotes at C:\Users\mikes\WebstormProjects\roughnotes and canonical .codex files contain user work and are off-limits. No source gate needs rerunning during authorship.

## Unknowns

The registry release may be delayed or have an integrity different from the prepared artifact. Report the observed result; the instrument must refuse mutation until root supplies the verified version and integrity. Do not infer byte equivalence from version alone.

## Scope

**Owned.** tmp/release/adopt-roughnotes-registry.mjs, tmp/release/launch-roughnotes-registry.ps1, tmp/units/roughnotes-registry-adoption-report.md, and tmp/units/roughnotes-registry-adoption-evidence/. Author these files only. Temporary control files may live inside the evidence directory.

**Shared (report-only).** Recovery checkout, canonical .orkestrel/campaign/recovery-current.md and recovery-live-tasks.md.

**Off-limits.** All product source, manifests, locks, installed dependencies, prior scripts and evidence, all .codex content, original Roughnotes, release archives, and vendored files. Do not run the install mode yourself. Never read secrets or environment/auth files.

**What asserts the state this change ends.** A future root run owns recovery package.json and package-lock.json plus npm installed state. This authoring unit changes none. The future repair, gates, capture and integration remain separate units; no silent full-suite or repair execution belongs here.

**Tools and limits.** Read files, read Git, write owned files, run syntax and inert-control checks. No install, commit, push, publish, destructive commands, tree-wide mutators, or delegation. You are not alone in the workspace; preserve every unrelated edit.

## Execution

Perform the assignment directly and spawn nothing.

Implement a narrow guarded sequence. Resolve the exact hardcoded recovery path and refuse any other target. Refuse an unexpected branch or HEAD. Require supplied version 0.0.75 and expected integrity, read the exact public registry version using a bounded fetch, and refuse absent or mismatched name/version/integrity before any install. Refuse replacement of an existing run-evidence directory. Record manifest, lock, installed package identities, status and source hashes before mutation. Copy manifest and lock bytes to the run-evidence directory. Hash all tracked regular working files outside package.json/package-lock.json and the explicit untracked tests/setupBrowser.test.ts; record deletions as absence. Never copy .codex or credentials.

Run only `npm install --save-dev @orkestrel/scaffold@^0.0.75 @orkestrel/test@^0.0.18 --ignore-scripts --no-audit --no-fund --registry=https://registry.npmjs.org` through the resolved Node/npm JavaScript entry. Retain stdout/stderr and native exit. On failure preserve partial state and report; never roll it back automatically. Check manifest Scaffold ^0.0.75 and test ^0.0.18, matching lock root ranges, registry resolved entries, installed Scaffold0.0.75/test0.0.18, and exact Scaffold lock integrity. Refuse file/link resolution. Verify the source/deletion snapshot unchanged. Write before/after evidence and a terminal result on success or failure, with an explicit nonzero process exit on failure.

The PowerShell launcher must retain the Process.Handle, redirect output before launch, name the PID, cap at 900 seconds, kill only that PID's process tree on cap expiry, and propagate the native exit. It must refuse existing logs. Do not launch it. Choose internal function names and evidence filenames as ancillary choices; avoid a generic release framework.

## Output

Write the owned report and return its path, changed paths, exact root command, syntax/control results, and any limit. Include actual diff and status evidence. Do not claim registry adoption ran.

## Deviation contract

Follow .agents/orchestration.md § Deviation protocol. Stop on conflicting target state, unavailable npm entry, or required unowned writes. Choose internal function names, inert-control layout, and log formatting yourself, record them, and continue.

## Acceptance criteria

- Syntax checks pass for the Node instrument and PowerShell launcher.
- The executed controls refuse registry identity mismatch and protected source drift without writing into either Roughnotes checkout or installing a package.
- Actual script implements only the named root-run sequence, preserves prior evidence, and reports nonzero refusal/failure.
- Report names the exact executable paths, root invocation, diff, status and evidence files.

**Observations, not criteria.** Registry availability is a live observation. Dependency installation and consumer gates belong to the subsequent root run and independent verification.

## Review evidence

Provide the actual owned diff, actual status, syntax output, control output and instrument hash. The current subject is the script, not the application UI. Root will retain this pair and dispatch an independent verifier before mutation.
