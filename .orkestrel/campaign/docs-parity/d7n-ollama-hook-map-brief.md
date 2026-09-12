# Map the Ollama hook consolidation

## Role and objective

Act as the launch-named read-only scouting bridge. Prepare a bounded journaled reading for its designated external engine; do not answer from the driver's own reading. Return evidence, never design or edits. Spawn nothing.

## Question and authority

The owner rejected the pending provisioner mechanism and clarified that scripts/ollama.sh should carry the improvements in Ollama's scripts/service.sh. Its purpose is to prepare Ollama in the Claude Code cloud environment. Read AGENTS.md, orchestration, portability/workspace/tests/documentation/writing/quality rules, orkestrel-align-packages integration/fleet and harden-package centralization/contract/hardening references, then the relevant Scaffold and Ollama guide sections. No publication is authorized.

Map only the existing hook, the service script, their actual callers/tests/docs, and the generic service-template capability affected by replacing the path. In canonical Scaffold and canonical Ollama, read scripts/ollama.sh, Ollama scripts/service.sh, .claude/settings.json hook registration, Ollama .github/workflows and package scripts, core types/constants/compiler sites for vendors and SERVICE_SCRIPT_PATH, and tests covering scripts or cloud hooks. Read the git history for Scaffold scripts/ollama.sh only far enough to locate why it became a capability probe and name the owning policy/test, if present. Do not review unrelated fleet package code. Search only sibling package scripts and CI/hook/manifests for literal service.sh callers to identify required propagation consumers; return the paths, not their full trees.

Root has read the current scripts directly: Scaffold's hook exits outside CLAUDE_CODE_REMOTE=true and only checks local readiness. Ollama's service script requires ollama/curl, can start the server, waits for readiness, pulls a missing model and warms it. The service script accepts OLLAMA_HOST/OLLAMA_MODEL; the hook does not. Report exact sites and capabilities rather than assuming they are equivalent.

## Host and scope

Use C:/Users/mikes/WebstormProjects/scaffold and sibling C:/Users/mikes/WebstormProjects/ollama directly. Windows outer shell is PowerShell; Git Bash is C:/Users/mikes/scoop/apps/git/current/bin/bash.exe. Keep each call a plain command, place any program in a journaled carrier, and use forward-slash paths. Do not read secrets or auth files, install, launch Ollama, pull/warm a model, mutate repositories, commit, push or publish. Root's unaccepted service/release candidate is dirty and suspended; do not edit or treat it as an accepted API. Root retained its patch in tmp/pass/d7n-provisioner-superseded.patch.

## Return and limits

Return concise file:line evidence for hook/service behavior, cloud gating, call sites, governing tests/policy, existing generic vendor-template semantics, and unknowns. Identify exact current source tests that would need to change, without proposing a fix. Include journal path/session id and benchmark liveness outcome. For a long reading, return the exact launch script/command for root's capped execution instead of launching it in the bridge. No prose counts or model identifiers in authored retained artifacts.
