# Consolidate the Ollama setup script

## Role and decision

Act as the launch-named independent design lane. Execute directly and spawn nothing. Propose the smallest script-level correction that fulfills the owner's clarification. Do not implement, accept, run services or read the other lane's answer.

The owner wants scripts/ollama.sh, owned and propagated by Scaffold, with the useful setup improvements from canonical Ollama's scripts/service.sh. Automatic setup is for Claude Code's cloud environment. The owner rejected the new provisioner machinery. Root archived and removed that uncommitted API/source/test candidate. Do not propose another Blueprint presence field, generic preservation registry or extra script wrapper.

## Authority and evidence

Read AGENTS.md, orchestration, applicable portability/workspace/tests/documentation/writing/quality rules, orkestrel-align-packages integration/fleet and orkestrel-harden-package centralization/contract/hardening references. Read guides/README.md, Scaffold's hook/ownership/service sections and Ollama's service/CI guide sections. The current user direction wins over the guide's previous preservation promise.

Root directly read canonical Scaffold scripts/ollama.sh: it gates on CLAUDE_CODE_REMOTE=true and only probes local readiness. Canonical Ollama scripts/service.sh requires ollama/curl, accepts OLLAMA_HOST and OLLAMA_MODEL, can start the daemon, waits for readiness, pulls a missing model and warms it. Its model listing/pull does not explicitly use the normalized host assigned only to server launch. Its request body uses printf interpolation. Read those files directly; do not endorse their edge behavior without analysis.

Root read Scaffold .claude/settings.json SessionStart: the hook executes scripts/ollama.sh for startup/resume with timeout600. Root read Ollama .github/workflows/ci.yml: it invokes bash scripts/service.sh. Read that exact workflow as the concrete non-hook caller. scripts is Scaffold-owned. Consumer vendored files cannot be edited directly; Scaffold's supported overwrite must propagate the new hook and retire the redundant target service copy after the actual caller is updated.

The generic vendors/SERVICE_SCRIPT_PATH compiler predates this rejected change. Assess whether the requested Ollama consolidation needs any change to that existing capability; do not remove unrelated public API merely because the new preservation design was rejected. The bounded scout is separately locating its consumers and historical policy; mark any dependence on that unfinished reading as unknown rather than redoing a fleet sweep.

Current Scaffold main is ec1f4651ec3209e54736e07fb6e5f9f29f54cf36 with pending version65, Guide18/Probe13 metadata and golden fixtures. No product writer runs. Canonical Ollama remains at source checkpoint53e5fd2f. Root retained the rejected source diff and the direction change in .orkestrel/campaign/docs-parity/d7n-ollama-hook-rebaseline.md. The registered Probe transport refused the preceding TypeScript claim; that result proves nothing about this shell change.

## Questions to settle

- Define the shared script's execution contract so automatic local SessionStart does not start/pull/warm, while the real CI caller still performs setup under the retained ollama.sh name. Prefer existing hook wiring and direct invocation over new options or files.
- Identify which service-script improvements transfer, and the minimal corrections needed for endpoint consistency, safe request construction, bounded readiness/warmup and truthful failures. Do not expand into an Ollama lifecycle framework or invent system installation unless the existing cloud contract requires it.
- State the minimal source, hook, CI, test and guide sites. State how supported Scaffold propagation removes the duplicate without a hand-edited target host.
- Define bounded real evidence for cloud gating and local/CI setup. Root may use the installed daemon/model when available; do not prescribe mocks, fake owned behavior, destructive environment changes, remote endpoints or unapproved installs.

## Host and output

Windows PowerShell outer shell; Git Bash at C:/Users/mikes/scoop/apps/git/current/bin/bash.exe. Read the actual canonical sibling repositories under C:/Users/mikes/WebstormProjects. No worktrees/copies, writes, installs, services, model pulls, commits, publishing or secrets. Treat this as a proposal, not executed proof. Return the proposed contract, bounded sites, test inputs, tradeoffs and unresolved choices. No model identifiers or prose counts in the report. Root retains the result and reconciles independently; no fresh verifier is used.
