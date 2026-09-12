Objective design lane held.

## Proposed contract

Keep `scripts/ollama.sh` as the shared setup entry.

- Direct invocation performs setup.
- The SessionStart command invokes it only when `CLAUDE_CODE_REMOTE=true`.
- A local SessionStart exits successfully without invoking the script.
- Ollama CI invokes `bash scripts/ollama.sh` directly.
- Add no script argument, wrapper, Blueprint field, or preservation registry.

Move the cloud gate from [scripts/ollama.sh](C:/Users/mikes/WebstormProjects/scaffold/scripts/ollama.sh:5) into the SessionStart command in [.claude/settings.json](C:/Users/mikes/WebstormProjects/scaffold/.claude/settings.json:978). This separates caller policy from setup behavior and preserves failure status in cloud sessions and CI.

## Script behavior

Adopt the useful behavior from Ollama's [scripts/service.sh](C:/Users/mikes/WebstormProjects/ollama/scripts/service.sh:1), with these corrections:

- Retain the existing `OLLAMA_HOST` and `OLLAMA_MODEL` defaults.
- Normalize the endpoint once. Add `http://` when absent, remove a trailing slash, reject credentials, paths, queries, fragments, and unsupported schemes.
- Export the normalized `OLLAMA_HOST` before every Ollama CLI operation. Readiness, model inspection, pull, daemon launch, and warmup must address the same endpoint.
- Start `ollama serve` only when an HTTP loopback endpoint is unreachable. A configured non-loopback or HTTPS endpoint must already be reachable; otherwise fail without attempting a bind.
- Require `curl` and `node`. Require `ollama` and `nohup` only when their operations need them. Report a missing executable on stderr and exit `127`.
- Probe `/api/version` before launch. If launch is needed, write the daemon log under `tmp/`, retain its process identifier, and wait within a fixed readiness deadline.
- Use `ollama show` for exact model presence instead of parsing `ollama list`. Pull only when `show` reports absence.
- Build the warmup JSON with `JSON.stringify` through the repository's required Node runtime. Do not interpolate `OLLAMA_MODEL` into JSON with `printf`.
- Warm through `/api/chat`, matching [tests/setupService.ts](C:/Users/mikes/WebstormProjects/ollama/tests/setupService.ts:126), with streaming and thinking disabled, a minimal prompt, bounded prediction, and the retained keep-alive.
- Bound readiness and warmup below the SessionStart timeout. Let the SessionStart timeout and CI job timeout bound model download.
- If this invocation launched the daemon and later setup fails, terminate that owned process and wait for it. Leave a successfully provisioned daemon running.
- Return nonzero for readiness expiry, pull failure, warmup HTTP failure, warmup timeout, invalid endpoint, and missing prerequisites. Do not convert setup failure into a capability notice.

Do not add system installation. Preinstallation remains the contract until the owner answers the outstanding installation question.

## Bounded sites

Scaffold changes belong in:

- [scripts/ollama.sh](C:/Users/mikes/WebstormProjects/scaffold/scripts/ollama.sh:1) for setup behavior.
- [.claude/settings.json](C:/Users/mikes/WebstormProjects/scaffold/.claude/settings.json:978) for cloud-only automatic invocation.
- [tests/policy.test.ts](C:/Users/mikes/WebstormProjects/scaffold/tests/policy.test.ts) for the exact SessionStart gate.
- [tests/src/server/helpers.test.ts](C:/Users/mikes/WebstormProjects/scaffold/tests/src/server/helpers.test.ts:162) for staged executable bytes and direct shell behavior.
- [guides/scaffold.md](C:/Users/mikes/WebstormProjects/scaffold/guides/scaffold.md:1255) for the hook/setup contract and prerequisite limit.

Ollama changes belong in:

- [.github/workflows/ci.yml](C:/Users/mikes/WebstormProjects/ollama/.github/workflows/ci.yml:50), changing the caller to `bash scripts/ollama.sh`.
- [guides/ollama.md](C:/Users/mikes/WebstormProjects/ollama/guides/ollama.md:123), naming the retained setup entry.
- [vite.config.ts](C:/Users/mikes/WebstormProjects/ollama/vite.config.ts:128), correcting the provisioner comment.
- `scripts/service.sh`, removed through Scaffold propagation after the caller changes.

Do not change `SERVICE_SCRIPT_PATH`, `Blueprint.vendors`, `ARTIFACT_TEMPLATES.orchestration.service`, or their tests. [src/core/compilers.ts](C:/Users/mikes/WebstormProjects/scaffold/src/core/compilers.ts:1522) emits a generic birth-owned vendor inventory. Ollama's concrete setup script is unrelated to that capability.

## Propagation

Update Ollama's authored CI and guide references before propagation. Then run Scaffold's supported `overwrite` flow for the `orchestration` group against a clean Ollama tree.

That flow copies the content-owned `scripts/ollama.sh` and `.claude/settings.json` files from Scaffold. Because the derived Ollama plan does not declare `vendors`, `scripts/service.sh` becomes tracked foreign content beneath the Scaffold-owned `scripts` directory and the overwrite removal phase retires it. Do not hand-edit Ollama's vendored hook or settings copy.

## Evidence inputs

Use these bounded proofs:

- Run the exact SessionStart command with an unset or false remote marker and a nonexistent project path. It must exit `0`; the nonexistent script proves no invocation occurred.
- Run the same command with the remote marker true and the nonexistent path. It must fail, proving the gate's negative control reaches the script branch.
- Invoke the script with each required executable unavailable in turn. It must report the named prerequisite and exit `127`.
- Use a protocol-faithful loopback fixture to capture endpoint paths and warmup JSON. Exercise a scheme-less host, a trailing slash, hostile model text, readiness expiry, and warmup failure.
- When the installed daemon and selected model are available, invoke the real script against loopback and then run `npm run test:service`.
- Let Ollama CI prove daemon launch, missing-model pull, warmup, and the live service suite against the real service.
- After propagation, run Scaffold audit on Ollama. It must report the retained hook aligned and no `scripts/service.sh` finding.

## Tradeoffs and unresolved choice

The settings gate makes direct invocation mean setup everywhere. This avoids a mode flag but makes a manual local invocation intentionally stateful.

Node-based JSON construction adds no package and closes injection through the model value. It makes `node` an explicit script prerequisite.

Unresolved: cloud installation authority. If Claude Code cloud does not supply Ollama, automatic setup will fail with exit `127`. Do not add an installer until the owner authorizes its source, version policy, integrity check, and cache behavior.
