Move the cloud guard into the existing SessionStart command. Make `scripts/ollama.sh` the explicit setup entry point for cloud startup and CI.

The caller contract is:

| Caller | Behavior |
|---|---|
| Local SessionStart | Exit successfully before invoking the setup script. |
| Cloud SessionStart | Invoke the setup script when `CLAUDE_CODE_REMOTE` equals `true`. |
| Explicit invocation | Run setup regardless of `CLAUDE_CODE_REMOTE`. |
| Ollama CI | Run `bash scripts/ollama.sh`, then the existing live-service tests. |

Use an `if` statement in the hook command so a local session returns success. Keep the existing matcher and script path. Add no mode flag, wrapper script, or Blueprint field.

The shared script must transfer daemon reuse, startup when needed, readiness waiting, missing-model retrieval, and warmup. Apply these corrections:

- Normalize `OLLAMA_HOST` before use. Send readiness, inventory, pull, and warmup requests to that same endpoint. Start a daemon only for a supported local endpoint; an unreachable external endpoint must fail without launching a local process.
- Require existing executables and report missing prerequisites with exit `127`. The inspected scripts establish no system-installation contract.
- Use bounded HTTP requests for inventory, pull, and warmup. This avoids the source script's split between a normalized HTTP endpoint and independently configured CLI commands.
- Use Node's native JSON serialization and parsing inside the Bash script. Pass values as data. Don't interpolate `OLLAMA_MODEL` into JSON or parse model inventory through table formatting.
- Preserve the existing model default and environment override. Match model identity using the service's canonical naming, including its treatment of an omitted tag.
- Bound startup readiness by elapsed time. Give the whole invocation a deadline compatible with the hook timeout, and pass the remaining allowance into pull and warmup requests. A warmup allowance equal to the entire hook timeout leaves no allowance for preceding setup.
- Report success only after a valid completed warmup response. Propagate transport, HTTP, JSON, pull, and warmup failures. Write diagnostics to stderr without printing caller-supplied endpoint credentials.
- Anchor daemon logs to the project's scratch directory. Detach daemon input and output from the hook. Never stop a daemon the invocation reused.

The bounded change sites are:

| Repository | Sites |
|---|---|
| Scaffold | `scripts/ollama.sh`, the SessionStart command in `.claude/settings.json`, regenerated `host.json`, hook-contract coverage, and `guides/scaffold.md`. |
| Scaffold documentation | Correct the claim that reading verbs preserve arbitrary `scripts/service.sh` files. Qualify the generic service-provisioning wording in the workspace rule and generated Vite comment. |
| Ollama | `.github/workflows/ci.yml`, the provisioning comment in `vite.config.ts`, `guides/ollama.md`, and live setup coverage. |
| Propagated files | Deliver the hook and script through Scaffold's supported release/adoption flow. Refresh guide mirrors through their owning workflow. |

Retain `vendors`, `SERVICE_SCRIPT_PATH`, and the inventory template. The inspected compiler emits a birth-owned inventory skeleton when a caller declares vendors. That capability is separate from Ollama's setup script.

The scout reports that CLI derivation never sets `vendors`. Therefore, after the CI caller moves, the existing overwrite path is the candidate for removing Ollama's unplanned, tracked `scripts/service.sh`. Prove that behavior through the real CLI on a clean temporary target before propagation. Preserve the existing test that protects a service script explicitly present in a compiled plan. Don't add a preservation registry or delete the target copy by hand.

Use these bounded evidence inputs:

- Execute the actual registered hook command with the cloud variable absent and false. Use an environment lacking setup prerequisites so accidental invocation fails visibly.
- Execute that command with the cloud variable true and missing prerequisites. Require the script's failure to reach the caller.
- Run the script directly with the cloud variable absent against the installed local daemon and model. Repeat it to prove reuse.
- Exercise an alternate loopback endpoint with an isolated real daemon when authorized. Confirm setup reaches that endpoint.
- Test invalid endpoint and model input before network activity.
- Prove missing-model retrieval in a disposable model store only when that download is authorized. Don't remove the owner's installed model to manufacture absence.
- Drive the updated CI invocation followed by the existing live-service project.

This is a source-based design proposal, not executed proof. Remaining implementation choices are the supported endpoint forms and measured timeout allocation. Cloud and CI prerequisite availability also remain unproved; the inspected CI workflow contains no explicit Ollama installation step.
