# Unit d7n-ollama-hook-fix — consolidate cloud setup

## Role and engine

Act as the native implementation lane assigned at launch. Perform the assignment directly and spawn nothing. The launch metadata identifies the engine; do not add engine identifiers to retained prose.

## Objective

Make Scaffold's scripts/ollama.sh the shared Ollama setup entry, automatically invoked only in Claude Code cloud, with installation of a missing binary authorized by the owner. Keep useful daemon readiness, model pull, and warmup behavior from canonical Ollama's service.sh without adding a provisioner API or wrapper.

## Context

Read AGENTS.md, .agents/orchestration.md, .claude/rules/names.md, typescript.md, architecture.md, patterns.md, tests.md, workspace.md, portability.md, documentation.md, writing.md, and quality.md. Use orkestrel-harden-package capability lane with research.md, contract.md, centralization.md, and hardening.md. Read guides/README.md, guides/scaffold.md, guides/ollama.md, ROADMAP.md when present, package.json, tests/types.ts, relevant tests/setupServer.ts capabilities, and declared/installed @orkestrel/process and @orkestrel/test server APIs before writing test helpers. Apply types first, no assertions/any/suppressions/mocks, centralized exported reusable declarations, readonly types, native paths, no dependencies, and no nested functions except direct anonymous callbacks.

Root readings on canonical Scaffold:

```text
git -C C:/Users/mikes/WebstormProjects/scaffold rev-parse HEAD
116010815ba1ecf62e070cc945221b881d161893
git -C C:/Users/mikes/WebstormProjects/scaffold status --short --branch
## main...origin/main
 M package.json
 M tests/src/core/fixtures/app-only-toolchain.txt
 M tests/src/core/fixtures/setup-false-manifest.txt
 M tests/src/core/fixtures/source-manifest.txt
```

Root then updated only the retained design-state record. No writer runs. The pending release metadata is Scaffold0.0.65, Guide18, Probe13; preserve it. Root owns lock, inventory, formatting, build, installation, service, full gates, pack, commit, and push. The prior provisioner candidate is archived and removed from source. Do not restore it.

Root read scripts/ollama.sh: it exits outside CLAUDE_CODE_REMOTE=true, then only probes loopback and always succeeds. Root read .claude/settings.json SessionStart: startup|resume invokes the script directly with timeout600. Root read canonical C:/Users/mikes/WebstormProjects/ollama/scripts/service.sh: host/model overrides, missing-binary refusal, daemon launch, readiness, CLI list/pull, interpolated warmup JSON. Its normalized host is assigned only to serve. Read these source files yourself. Root's rg over Scaffold guides/scaffold.md, workspace.md and templates.ts found service.sh preservation/setup claims at guide568/589/852/1063, workspace169, template363. The generic vendors inventory capability remains valid and is out of scope for API edits.

The owner approved missing-binary cloud installation after the design lanes returned. Root selects HTTP show/pull/chat, native JSON/URL handling, truthful bounded failure, and cleanup limited to an owned daemon. Official sources are https://docs.ollama.com/linux, https://raw.githubusercontent.com/ollama/ollama/main/scripts/install.sh, https://docs.ollama.com/api/chat, https://docs.ollama.com/api/pull, https://github.com/ollama/ollama/blob/main/docs/api.md, and https://code.claude.com/docs/en/hooks. The Linux instructions name the official HTTPS installer. That installer requires root or sudo, may configure services and GPU support, and its compressed archive path may require zstd. Do not invent another installer, install packages yourself, or claim the Linux install was executed. The hook timeout is configurable and remains600 for this unit.

Windows PowerShell outer shell; canonical root C:/Users/mikes/WebstormProjects/scaffold; Git Bash C:/Users/mikes/scoop/apps/git/current/bin/bash.exe. Every program-bearing shell command is a file invoked by a plain call. Use forward-slash paths. No worktrees or package copies. Root can run local shell/network/service proofs. Registered Probe refused the previous claim with legacy stream transport error; it supplies no receipt. Shell/service behavior is outside its modeled TypeScript stage.

## Unknowns

Linux/cloud installation execution is unavailable in this Windows host reading. Report required prerequisites and the exact cloud settling command; do not simulate uname, curl, an installer, or the owned script. If official installer behavior blocks the stated contract, stop with the concrete conflict. Minor helper placement and assertion details are yours to settle within owned files.

## Scope

Root correction after dispatch: tests/types.ts is absent. Use tests/setupServer.ts for exported test interfaces, as its existing declarations and the setup exception require. The earlier path allowance does not request a separate test declaration module. Root notified the writer before implementation.

Owned: scripts/ollama.sh; the existing Ollama SessionStart entry in .claude/settings.json; tests/src/server/helpers.test.ts and centralized test support in tests/setupServer.ts and tests/types.ts; tests/policy.test.ts only if needed for the existing hook policy; guides/scaffold.md setup/ownership passages; .claude/rules/workspace.md live-service invocation rule; the service-project comment in src/core/templates.ts. Do not edit generic vendors/SERVICE_SCRIPT_PATH/template behavior or its protection tests.

Shared report-only: host.json regenerated by root after source convergence; package.json, package-lock.json, pending golden manifests and release scripts owned by root; campaign retention owned by root after this unit yields. Canonical Ollama's CI, guide, Vite comment, and target script retirement belong to the following serial consumer unit. Report exact changes needed there, do not make them.

Off-limits: all other product files and sibling writes. Never edit a target's vendored file. Never install, build, run tree-wide format, launch services, pull models, publish, authenticate, inspect secrets, commit, push, or use discard-class Git. Use apply_patch for owned edits. Do not revert others' work; you are not alone in the workspace. Read-only source commands and scoped static checks are allowed. Root runs behavioral gates.

## Execution

Plant the focused regression tests first, and stop before modifying the script/hook. Return the exact narrow command for root to run red, plus the test files touched. Root will supply that reading and resume this same unit to implement. Name tests for behavior rather than campaign labels.

After root resumes implementation, satisfy this contract:

- Keep the script name and existing defaults. Direct invocation performs setup. Move the automatic cloud guard into the existing SessionStart command using an if statement; absent/false remote marker exits0 without invoking the script. Do not add a mode flag, Blueprint field, separate scripts helper, or preservation registry.
- Require node/curl with honest prerequisite failures. Normalize OLLAMA_HOST with native URL handling; scheme-less input gains HTTP. Reject credentials, non-root paths, query/fragment, unsupported schemes, empty explicit values, and malformed input without reflecting unsafe input. Preserve OLLAMA_MODEL override and serialize it as data with JSON.stringify.
- Use the normalized endpoint for /api/version, /api/show, /api/pull, and /api/chat. Reuse a reachable daemon without requiring a local binary. Treat only model absence as grounds for pull. Require successful completed pull/warm JSON, not merely curl exit0. Warm with streamfalse, thinkfalse, keepalive30m, and minimal prediction as the service test does.
- Start a daemon only for an unreachable HTTP loopback endpoint. Refuse unreachable external or HTTPS endpoints without starting/installing locally. For a missing binary, allow official Linux installation only in cloud or CI automation, gated by existing CLAUDE_CODE_REMOTE=true or CI=true; direct local invocation with a missing binary reports the prerequisite. Download the official installer over HTTPS into an invocation-owned temporary file, run it under a bounded deadline, check success and executable availability, and clean up only that temporary resource. Leave existing installations unupgraded. Document required upstream privileges/prerequisites. Do not add a custom arch/package-manager provisioner.
- Anchor daemon logs under project tmp, independent of invoking cwd; detach stdin/stdout/stderr. Preserve a reused daemon. After failure clean up only a daemon this invocation launched. After success leave it running for the session/tests.
- Keep the invocation within590s to leave hook cancellation slack. Use Bash elapsed-time accounting and bounded external operations rather than a lifecycle framework or background watchdog. Bound startup readiness within60s. Give long pull/warm operations the remaining allowance, and report expiry honestly.
- Correct arbitrary service.sh preservation claims. Retain the generic vendors birth-owned inventory capability, describing it as an inventory skeleton rather than a working installer. Make the generated Vite/rule service prose independent of a universal script name.

## Acceptance criteria

Root records the focused regression red before implementation. Cover the actual registered hook's local/cloud branch using a missing project path as a negative control; direct script behavior through a protocol-faithful loopback HTTP fixture with recorded requests; missing/present model selection, completed warmup and failure propagation; normalized endpoint and JSON data handling. Do not fake project-owned executables. Keep the fixture bounded and use declared test/process primitives when semantics match.

After the source returns, root regenerates inventory, runs the same focused proof green, runs check and guide parity, and then the release gates. Report timings and whole-suite output only as observations, never self-acceptance. Root owns real Windows daemon reuse and Linux/cloud limits.

## Output and review evidence

At the test boundary, return touched paths and the exact command, then wait for a follow-up. At implementation completion, write tmp/units/d7n-ollama-hook-fix-report.md with changes, evidence or unrun commands, installation/host limits, and required consumer edits. Return actual git status and diffstat. Root retains the full diff/status and takes the gate readings. The existing independent reviewer reviews the actual diff after root gates; the writer cannot accept itself. Do not add prose counts or engine identifiers.

## Deviation contract

Stop on an authority conflict, required out-of-scope source mutation, absent declared primitive whose use is mandatory, or incompatible installer behavior. Return expected, found, exact evidence, and what remains undone. Resolve incidental naming or prose placement within scope without reopening the design.
