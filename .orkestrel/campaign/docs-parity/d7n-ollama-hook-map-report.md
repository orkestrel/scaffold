I'll read the brief first, then pull only the bounded evidence it asks for from the stable source.The brief names a read-only scout: I'll load the governing rules and then map only the stable hook, service script, callers, and generic template sites.I'm on the native Grok lane in this session, so I'll map the stable hook, service script, and callers directly rather than launching another bench.Next I’ll pin hook registration, types/compiler sites, tests, git history of `scripts/ollama.sh`, and sibling `service.sh` callers.**Question:** Map the existing Scaffold `scripts/ollama.sh` cloud hook against Ollama `scripts/service.sh`, their callers/tests/docs, and the generic `SERVICE_SCRIPT_PATH` vendor-template, from stable source only.

**Evidence**

**Hook (Scaffold, vendored into Ollama)**
- `C:/Users/mikes/WebstormProjects/scaffold/scripts/ollama.sh:1-20` — SessionStart loopback capability probe. Gates on `CLAUDE_CODE_REMOTE=true` (`:5-7`, else `exit 0`). Checks `command -v ollama` (`:9-12`); missing binary prints unavailable and `exit 0`. Probes only `http://127.0.0.1:11434/api/tags` with `curl -sf --max-time 2` (`:14-18`). Always `exit 0` (`:20`). Does not read `OLLAMA_HOST` / `OLLAMA_MODEL`. Does not start, wait, pull, or warm. Does not require `curl` up front.
- Ollama’s copy matches: `C:/Users/mikes/WebstormProjects/ollama/scripts/ollama.sh:1-20`.
- Sibling cloud probes use the same gate: `scripts/deps.sh:10-12`, `scripts/cursor.sh:1-7`, `scripts/codex.sh:1-7`.
- Cloud policy names `codex.sh` and `deps.sh` only: `CLAUDE.md:48-61` (`codex.sh` reports readiness; never installs/auths). `ollama.sh` is absent there. `guides/scaffold.md` does not name `ollama.sh` or SessionStart.

**Hook registration**
- Scaffold: `.claude/settings.json:969-993` — `SessionStart` matcher `startup|resume` runs `scripts/deps.sh` (timeout 600), `scripts/ollama.sh` (timeout 600), `scripts/cursor.sh` (120), `scripts/codex.sh` (120).
- Ollama: `.claude/settings.json:969-993` — same command and timeout for `scripts/ollama.sh`.
- That settings file is a vendored host path: `src/core/constants.ts:133-135`. Hook command lives in those bytes, not in `SERVICE_SCRIPT_PATH`.

**Service script (Ollama, live provisioner)**
- `C:/Users/mikes/WebstormProjects/ollama/scripts/service.sh:1-57` — `set -euo pipefail`. `OLLAMA_HOST` default `http://127.0.0.1:11434` (`:4`); `OLLAMA_MODEL` default `qwen3.5:2b-q4_K_M` (`:5`); prepends `http://` when the host has no scheme (`:8-10`). Requires `ollama` and `curl` or exit 127 (`:12-20`). If `$host/api/version` fails, `nohup ollama serve` into `tmp/ollama-service.log` and polls version up to `{1..60}` with `sleep 1` (`:24-38`). Pulls a missing model via `ollama list` / `ollama pull` (`:40-43`). Warms with `POST $host/api/generate`, `--max-time 600` (`:45-55`). Success prints ready (`:57`).
- CI caller: `C:/Users/mikes/WebstormProjects/ollama/.github/workflows/ci.yml:48-52` — `bash scripts/service.sh` then `npm run test:service`.
- `ollama/package.json` has `test:service` and `prepublishOnly` invoking `test:service` (`:60`, `:68`) and does not invoke `service.sh`.
- Guide: `ollama/guides/ollama.md:123` — `bash scripts/service.sh` before the CI live battery. Scaffold’s copy of that guide: `guides/ollama.md:104`.
- Vite comment: `ollama/vite.config.ts:128-130` — `scripts/service.sh` provisions; `tests/setupService.ts` proves readiness.
- Live test module: `ollama/tests/setupService.ts:8-9` defaults `OLLAMA_HOST` to `http://localhost:11434` (not `127.0.0.1`) and the same model default; `isOllamaReady` hits `/api/tags` (`:101-117`); `warmOllama` posts `/api/chat` (`:126-154`); missing daemon throws then warms (`:187-192`). No Ollama test file names `service.sh` or `ollama.sh`.

**Literal `service.sh` callers in sibling scripts / CI / hooks / manifests**
- Found: `C:/Users/mikes/WebstormProjects/ollama/.github/workflows/ci.yml`.
- Not found: any sibling `package.json`, `.claude/settings.json`, or `scripts/*` invocation. The only `scripts/service.sh` file under `WebstormProjects` is Ollama’s. Fleet `settings.json` files invoke `scripts/ollama.sh`, not `service.sh`.

**Generic vendor-template (`SERVICE_SCRIPT_PATH`)**
- Constant: `src/core/constants.ts:299-300` — `'scripts/service.sh'`.
- Types: `src/core/types.ts:200-225` — `vendors: readonly string[]`. No `provisioner` field. Comment still says vendors emit “the provisioner skeleton” (`:202-205`).
- Factory default: `src/core/factories.ts:69` — `vendors: input?.vendors ?? []`.
- Validator: `src/core/validators.ts:299` — string collection.
- Compiler emit: `src/core/compilers.ts:1522-1559` — empty vendors → no artifact; else birth-owned template at `SERVICE_SCRIPT_PATH` filled from `ARTIFACT_TEMPLATES.orchestration.service`. Remarks: records inventory only; does not invent a service runner (`:1528-1531`).
- Template body: `src/core/templates.ts:2171-2177` — `#!/usr/bin/env sh` / `set -eu` / `printf` of vendor names. Not Ollama’s start/pull/warm script.
- Draft inclusion: `src/core/Compiler.ts:284-300`.
- Vendor name gate: `src/core/compilers.ts:2378-2394`.
- Generated Vite service factory still comments `` `scripts/service.sh` provisions ``: `src/core/templates.ts:362-364`.
- Host vs generated write: host copies may chmod via `EXECUTABLE_PATHS` (`src/server/helpers.ts:191-192`, `WriteTransaction.ts:280-295`). Template artifacts use `transaction.write` with no chmod (`Materializer.ts:994-996`, `WriteTransaction.ts:241-248`). `EXECUTABLE_PATHS` lists `scripts/ollama.sh` and the other SessionStart scripts, not `scripts/service.sh` (`constants.ts:228-233`).
- Reading verbs never populate `vendors`: `src/bin/CLI.ts:895-936` (`#derive` comment: vendors stay unknown; readiness follows `tests/setupService.ts`). `NewCommand` has no vendors flag (`src/bin/types.ts:67-79`). `#create` does not pass `vendors` (`CLI.ts:227-236`).
- Guide: `guides/scaffold.md:158`, `:568-592`, `:851-854`, `:1060-1063` — add `scripts/service.sh` for vendors; reading does not reconstruct the list; birth-owned planned copy survives deletion.

**Vendoring of the hook**
- `HOST_PATHS` includes directory `scripts` (`constants.ts:133-136`), so `scripts/ollama.sh` is host-origin presence, not the template path.
- Executable declaration: `constants.ts:228-233`. Drift guard vs git index: `tests/src/server/helpers.test.ts:162-171`.

**Current tests that pin these paths (no probe-behavior test found)**
- Hook path copy: `tests/src/server/Materializer.test.ts:815-822`.
- Packed host set: `tests/distribution.test.ts:278-281`.
- Vendor skeleton path/content: `tests/src/core/compilers.test.ts:1826-1834` (`scripts/service.sh`, contains `'ollama'` / `'postgres'`, not `test:service`).
- Vendors do not invent the live project: `compilers.test.ts:548-567`, `:1304-1310`.
- Planned service script kept on remove: `tests/src/server/Materializer.test.ts:1486-1515` (compile with `vendors: ['ollama']`).
- `createBlueprint` empties omitted `vendors`: `tests/src/core/factories.test.ts:18-27`.
- Format corpus includes vendor-backed blueprints: `tests/src/core/templates.test.ts:660-684`.
- No test asserts `CLAUDE_CODE_REMOTE`, `/api/tags`, loopback probe text, or `ollama.sh` bytes.

**Stable vs rejected candidate**
- Source `Blueprint` has `vendors` only; no `provisioner` member. `CLI.#derive` still does not read `scripts/service.sh`.

**Unknowns**
- Git history of `scripts/ollama.sh` was not run in this Ask session, so the commit that turned it into a probe is unread. On-disk policy is the script header (`ollama.sh:1-3`) plus the `CLAUDE.md:54-55` readiness-only pattern on `codex.sh`. No owning test for that probe was found.
- Byte equality of every fleet `scripts/ollama.sh` beyond Scaffold and Ollama was not hashed.
- Whether `blueprintToQuestions` vendor-name refusals have a dedicated test: none found under `tests/` for those messages.
- Retained rejected patch path named in the brief (`tmp/pass/d7n-provisioner-superseded.patch`) vs campaign copy (`.orkestrel/campaign/docs-parity/d7n-provisioner-superseded.patch`); contents not treated as API.

**Distillate**
`scripts/ollama.sh` is a cloud-gated, always-zero, loopback `/api/tags` probe with a hardcoded `127.0.0.1:11434`, registered from vendored `.claude/settings.json`. Ollama `scripts/service.sh` is a separate CI provisioner: requires binaries, may start the daemon, waits, pulls, warms, honors `OLLAMA_HOST` / `OLLAMA_MODEL`, and can fail. Scaffold `SERVICE_SCRIPT_PATH` is a third thing: a birth-owned `printf` inventory emitted only when `Blueprint.vendors` is set, which `new` and `#derive` never set. Ollama occupies that same path with the live provisioner. Changing hook bytes does not currently break a behavior test; renaming the hook path hits `EXECUTABLE_PATHS`, the Materializer scripts-directory case, `distribution.test.ts`, and every vendored `settings.json` command. Changing `SERVICE_SCRIPT_PATH` hits the compiler/template/guide/Materializer-remove cases above. Ollama CI remains the only sibling `service.sh` invocation.

**Journal:** none. Native Cursor Ask session; no `tmp/cursor/<unit>.jsonl`, no CLI `init.session_id`.

**Deviation:** Native Grok executor answered from this session (Ask, read-only). Journaled `agent -p` bench was not launched. `git log` on `scripts/ollama.sh` was not executed. Bench liveness: native; CLI bench not probed.

Journal: tmp/cursor/d7n-ollama-hook-map.jsonl
Session: 6862238d-853d-44eb-8961-b4c1d8958994

