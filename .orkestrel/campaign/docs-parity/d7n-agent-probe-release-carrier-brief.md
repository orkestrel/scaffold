# Adapt the registry preparation carriers for Agent and Probe

Act as builder on the native execution tier. Read Scaffold AGENTS.md, applicable
portability/writing/workspace/quality rules, orchestration, orkestrel-publish with
wave.md and the guide's overwrite/toolchain contract. Execute directly, spawn
nothing. You are not alone. Root owns campaign records and every execution;
writers own Agent and Probe. Never touch their files or run these carriers.

Own only tmp/pass/prepare-agent-probe-registry-supported.sh,
tmp/pass/pack-agent-probe-final-verified.sh and
tmp/units/d7n-agent-probe-release-carrier-report.md. Preserve the accepted
predecessors. Use apply_patch. No installs, builds, ref writes, source edits,
credentials, publish, discard git commands or package copies.

Base preparation on tmp/pass/prepare-dependent-registry-supported.sh. Preserve
the execution/capture/safety/gate/identity mechanism. Adapt roster and data only,
except the explicitly required conditional Probe development field and external
peer handling below. Scope comment: 'Prepare the Agent and Probe registry layer.'
Roster error: 'package is outside the Agent and Probe registry layer'. Replace
the dependent source verdict/receipt namespace with agent-probe:
d7n-$package-agent-probe-source-verdict.md and
d7n-$package-agent-probe-source-commit/head.txt. Use this data:

| Package | Pending | Registry baseline | Runtime target | Runtime prior |
| --- | --- | --- | --- | --- |
| agent | 0.0.21 | 0.0.20 | abort10 budget10 contract17 database14 emitter10 queue13 timeout10 tool14 workflow18 workspace8 | abort9 budget9 contract16 database13 emitter9 queue12 timeout9 tool13 workflow17 workspace7 |
| probe | 0.0.13 | 0.0.12 | contract17 emitter10 lsp7 mcp29 queue13 timeout10 tool14 | contract16 emitter9 lsp6 mcp28 queue12 timeout9 tool13 |

Expand every suffix in that table to 0.0.<suffix>. Guide target18/prior17,
Scaffold target64/prior63 and Test target14/prior13 apply to every target. Agent
has Probe development ^0.0.12, which remains unchanged until its registry release.
Probe has no self development field: do not read, set, search or require one.
Create a conditional development data array and use it consistently wherever the
predecessor hard-codes Probe development. No Orkestrel peer fields apply here.

Keep the common external dev toolchain fields and the range-aware
read-supported-toolchain.mjs. Remove roster-specific MCP/Middleware/Workflow
branches. For Probe, add external peer fields peerDependencies.oxlint,
peerDependencies.typescript and peerDependencies.vitest to the supported registry
read/validation loop; set those peer ranges to the resulting caret values before
install-runtime. Scaffold's overwrite refreshes the dev toolchain, not these
peer ranges. Preserve peerDependenciesMeta byte-equivalent JSON; each named Probe
peer stays optional. Capture the old peer fields as the generic external loop
does. Require the final ranges equal their fresh supported registry observations.
Do not move supported majors or add dependencies.

Keep root commit identity/trailers, branch prerequisites, source PASS prerequisite,
tarball dist equality, guide mirror equality, metadata checks, local-pin scans,
self-pin scans, supported overwrite/audit, registry install, final prepublish and
pack. Call pack-agent-probe-final-verified.sh instead of its predecessor. Keep the
common action carrier upper-layer-action.sh. Retain the accepted timeouts and
fresh output-label refusal. Do not edit source receipt/verdict files.

Base packing on tmp/pass/pack-dependent-final-verified.sh. Change only whitelist
to agent|probe, roster error to 'package is outside the Agent and Probe layer',
and add the existing dist/bin comparison block for Probe (the predecessor applies
it only to Scaffold). Keep Scaffold's historical host block unchanged or remove
only its now-unreachable branch; do not introduce a new comparison algorithm.
The bin comparison must run only for Probe, because Agent is core-only. Preserve
the complete archive-versus-canonical-dist check for every target and all actual
pack/build-receipt bindings.

Validate bash syntax and return the exact diffstat and substantive substitutions.
Do not run installation, gates or packing. Root independently reviews and runs.
Stop on a mechanism change not specified here. Use forward-slash paths and plain
outer shell calls; multistep commands go in files. No prose counts or model names.
