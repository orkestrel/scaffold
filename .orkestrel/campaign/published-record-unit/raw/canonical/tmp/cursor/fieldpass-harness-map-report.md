I'll start by reading the brief and the governing orchestration files so I can return the exact evidence it asks for.The brief is a capability map: native-agent transcript plus an enforced time cap. Next I’ll read the named maps, field-testing law, and tool/session surfaces without launching anything.I’ll pull the native-first and cap rules, inspect session metadata only, and fetch the official OpenAI subagent pages before treating any capability as present.Web search was blocked, so I’ll fetch the named official pages and inspect local session metadata plus the installed Codex surface for callable tools.Official fetches were blocked. I’ll stay on local files: session metadata, Codex agent config, and any installed subagent/tool schema.Native subagent journals exist. Next I’ll correlate the parent thread, extract spawn/wait schema keys only, and separate TUI logs from CLI execs.**Native `spawn_agent` has no timeout or journal field. Local child rollout files exist and correlate. No callable transcript getter showed up. `wait_agent.timeout_ms` only waits. An enforced native deadline is unsupported in the exposed tools.** Official subagent pages were not fetched (web tools rejected); that is unread, not a disproof.

## Callable Codex TUI tools

Live parent journal `C:/Users/mikes/.codex/sessions/2026/09/18/rollout-2026-09-18T09-38-06-01a0b4bd-193b-7af3-a4d6-02315270443c.jsonl` records `namespace":"collaboration"` calls:

- `spawn_agent` arguments observed: `task_name`, `agent_type`, `fork_turns`, `message`. No `timeout`. No journal path. Root schema also names `model` and `reasoning_effort`; those keys were not in the sampled calls.
- `followup_task` arguments: `target`, `message`.
- `list_agents` arguments: `{}`. The next journal line is `token_usage_record`, so this pass did not extract the return payload. Root schema still says name/status.
- `interrupt_agent` arguments: `{"target":"recipe_retain_stage"}` (parent ordinal 3646).
- `wait_agent` in child journals: `{"timeout_ms":10000}` and `{"timeout_ms":60000}` only. No stop/kill field.

Developer usage hint in the Helmholtz child (ordinal 3) names the collaboration set as `spawn_agent`, `send_message`, `followup_task`, `wait_agent`, `interrupt_agent`, `list_agents`; says those calls cannot run inside `functions.exec`; says a final-channel reply is delivered to the parent; says prefer longer `wait_agent` waits. It does not name a transcript or history getter.

`.codex/config.toml:29-32` has `[agents] enabled = true`, `max_concurrent_threads_per_session = 3`, `interrupt_message = true`. No timeout key.

This Cursor Grok session’s `Task` schema has `description`, `prompt`, `model`, `resume`, `subagent_type`, `file_attachments`, `run_in_background`. No timeout. That is Cursor, not Codex `spawn_agent`.

## Local journal evidence (desktop native, not CLI exec)

TUI native child, this unit’s grok driver:

- File: `C:/Users/mikes/.codex/sessions/2026/09/18/rollout-2026-09-18T17-24-15-01a0b667-df5e-7a11-8d59-88300a04ff64.jsonl`
- `session_meta`: `originator":"codex-tui"`, `cli_version":"0.153.4"`, `thread_source":"subagent"`, `history_mode":"paginated"`
- `id` / thread: `01a0b667-df5e-7a11-8d59-88300a04ff64`
- `parent_thread_id` / `session_id`: `01a0b4bd-193b-7af3-a4d6-02315270443c`
- `agent_path`: `/root/fieldpass_harness_grok`
- `agent_role`: `grok`
- `agent_nickname`: `Helmholtz`

Parent TUI session (same id): `originator":"codex-tui"`, `source":"cli"`, `thread_source":"user"`. Compacted events with `replacement_history` appear in that parent file. That is not a preserved full in-session history.

CLI exec logs are a different originator. Example: `C:/Users/mikes/.codex/sessions/2026/09/17/rollout-2026-09-17T17-38-32-01a0b14e-95cc-7f30-b3d5-8448c0e14a2c.jsonl` has `originator":"codex_exec"`, `source":"exec"`. Those are installed CLI sessions, not this desktop native tree.

On-disk child jsonl files contain `session_meta`, tool `function_call` rows, and command events. Parent-callable collaboration tools do not take a journal path or return one. Spawn `message` bodies in the parent file are ciphertext (`gAAAAA…`), not a readable child transcript. A final-channel reply to the parent is not a full transcript.

Whether `history_mode":"paginated"` omits events from the child file is **unknown**.

## Documented cap vs native spawn

Field-testing requires a tracked background command under a hard time cap, with the transcript journal as evidence of record (`.agents/skills/orkestrel-debrief/references/field-testing.md:27-30`).

Orchestration: native-first uses Codex-native agents in a Codex session and forbids CLI/MCP loopback of a hosted model (`.agents/orchestration.md:429-434`). Long commands are harness-tracked background under a hard cap the Orchestrator sizes (`.agents/orchestration.md:630-633`, `:655-658`). Bench CLI journals sit under `tmp/<bench>/` (`.agents/orchestration.md:740-748`).

CLI cap form `timeout <cap> codex exec …` is the Codex **transport**, not native spawn (`.agents/transports/codex.md:46-59`). Using it for a Codex-hosted model would be the loopback native-first forbids.

Remaining field pass is still routed native Opus, Sonnet, Haiku (`.orkestrel/campaign/remaining-field-map.md:13`; `.orkestrel/campaign/journey-skill-field-pass-map.md:81-84`). ROADMAP item 17 remains open (`ROADMAP.md:17`). Claude quota remains rejected until 2026-09-19 21:00 America/New_York (`tmp/claude/recovery-live.jsonl` rate-limit event and result text).

## Exact missing pieces

- **Hard cap on native spawn:** unsupported in observed `spawn_agent` arguments, `[agents]` config, and collaboration usage hint. Do not treat `wait_agent.timeout_ms` as a worker deadline.
- **Callable full transcript:** unsupported among named collaboration tools. On-disk rollout jsonl is filesystem evidence, not a getter. Parent final-channel text is not a full transcript. Compacted parent history is not a full transcript.
- **spawn_agent journal field:** absent.
- **Official docs corroboration:** unread (WebSearch and WebFetch rejected for `https://developers.openai.com/es-419/docs/agent-configuration/subagents` and `https://developers.openai.com/docs/agent-configuration/subagents`).

## Unread inputs

- Official OpenAI subagent / session item-list pages (fetch denied).
- `list_agents` and `wait_agent` return payloads (not isolated from adjacent token-usage rows).
- File Length/LastWriteTime via `Get-Item` (this pass used Read/Grep/Glob on session_meta keys only).
- `auth.json` and other credential files (off-limits, not read).
- `tmp/cursor/fieldpass-harness-map.err` (not present next to the journal).
- Bulk conversation text in parent/child journals (not read).

## Provenance

| Item | Value |
| --- | --- |
| This Grok journal | `tmp/cursor/fieldpass-harness-map.jsonl` |
| This Grok session id | `efc15351-efc8-4c2d-bb1f-1440750acfbf` |
| Codex native driver journal | `C:/Users/mikes/.codex/sessions/2026/09/18/rollout-2026-09-18T17-24-15-01a0b667-df5e-7a11-8d59-88300a04ff64.jsonl` |
| Codex native driver thread | `01a0b667-df5e-7a11-8d59-88300a04ff64` |
| Codex TUI parent session | `01a0b4bd-193b-7af3-a4d6-02315270443c` |

Safe metadata used: Glob on `C:/Users/mikes/.codex/sessions`; Read of Helmholtz and parent `session_meta` keys; Grep of collaboration tool names and `originator`/`source` discriminators. No Codex/MCP loopback. No native model launch. No credential files.
