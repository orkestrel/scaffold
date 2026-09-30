---
name: orkestrel-dispatch
description: >-
  Dispatch one unit of work to a native subagent or an external bench and bring its result back: write the brief, probe the bench, launch under a cap, watch liveness, read the report, check its citations, accept, and delete the launch copies. Use when `.agents/orchestration.md` routes work to a role, when a bench lane (Grok, Astra, or Opus through the Claude CLI) is needed, or when a command will outlive the turn that starts it.
---

# Dispatch

`.agents/orchestration.md` decides who runs what and binds the permission floor; this skill runs the dispatch. Read `references/launch.md` before any command that outlives the turn, and `references/bench.md` before any bench lane. Run every step a script performs as that script, from the checkout root, with `node`.

## Scripts

| Script               | Does                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scripts/bench.ts`   | `--cursor [--resolve]`, `--codex [--sandbox MODE]`, or `--claude`, each with `[--model ID] [--cap SECONDS]`: resolves the bench entry, reads its version and login, runs one bounded round trip into `tmp/<bench>/bench.jsonl`, and prints JSON with `live`; `--resolve` prints the Cursor entry alone. Exit 3 when the bench is dark.                                                                               |
| `scripts/brief.ts`   | `--unit UNIT --lane units\|cursor\|codex\|claude [--subject TEXT]` writes the brief from `.agents/templates/brief.md` and never overwrites a launched one; `--check PATH` lists every slash-bearing path the brief names that does not resolve from the root. Exit 3 when one is missing.                                                                                                                            |
| `scripts/launch.ts`  | `--journal PATH --errors PATH --cap SECONDS [--status] -- COMMAND [ARGS...]` runs the command with no shell and closed stdin, kills it at the cap (its process tree on Windows), records `git status --porcelain` before and after with `--status`, prints a spawn line carrying the `pid` when the command starts, writes that pid to `<journal>.pid`, and ends the errors file with `exit=`. Exit 124 when capped. |
| `scripts/login.ts`   | `--codex [--cap SECONDS]` reads `codex login status`, runs `codex login --device-auth` journaled to `tmp/codex/login.log` when it is not logged in, prints the URL and the one-time code as they appear, and polls the status until it answers or the cap ends; `--claude` reads `claude auth status`. Exit 0 logged in, 3 not.                                                                                      |
| `scripts/result.ts`  | `--cursor\|--claude\|--codex JOURNAL [--out PATH]` prints the session id, the answer length, the run's `exit`, `capped`, and `durationMs` from the errors file, and the journal's `bytes`, `ageMs`, and `lastEvent`. Exit 3 when the journal carries no session or answer.                                                                                                                                           |
| `scripts/cite.ts`    | `PATH [--root DIR] [--json]` lists every `file:line` citation in a report whose file does not exist or whose line is past the end. Exit 3 when one does not resolve.                                                                                                                                                                                                                                                 |
| `scripts/helpers.ts` | What every skill script shares: `readOption`, `readOptions`, `readList`, `listFiles`, `readJsonObject`, `readString`, `readNumber`, `normalizeSlashes`, `resolveNpm`, `runNpm`. It runs nothing; import it with the `.ts` extension.                                                                                                                                                                                 |
| `scripts/sweep.ts`   | `--report` lists leftovers under `tmp/` and `.orkestrel/` by age and deletes nothing; `--tmp [--older-than MINUTES]` deletes stale launch files and refuses while a journal is changing; `--unit UNIT [--delete]` lists or deletes one accepted unit's brief, report, claims, journal, errors, status, pid, and last-message files.                                                                                  |

## Write the brief

1. A small native unit's brief is the dispatch message: scope, law references, expected result. Otherwise run `node .agents/skills/orkestrel-dispatch/scripts/brief.ts --unit <unit> --lane <lane>` and fill every section; write `none` in an empty one. A re-run takes the `-<n>` file the script writes; never edit a launched brief.
2. Back every fact the unit will act on with the command and output that established it. Check a fact against the tree, not against another artifact.
3. Scope by what the change makes false: run the `orkestrel-scout` skill's `map.ts --refs` and `--census` for an existing member of any enumerated population the unit extends, and own every file that comes back, with the tests that pin the behavior, the fixtures derived from a constant, and the materialized copy of a template.
4. Order acceptance criteria cheap-first (regenerate, typecheck, lint, scoped test). Name a timing-sensitive or tree-wide gate as an observation, not a criterion.
5. State that the executor performs the work itself and spawns nothing. A bridge driver carries the brief unaltered and returns the journal path and session id.
6. Name the host conditions the unit will hit: shell, sandbox, network, files expected dirty, commands known to fail.
7. Run `brief.ts --check <brief>` and fix every missing path before the launch.

## Launch

- Native, Claude Code: the Agent tool with the role as `subagent_type`; a Workflow for a fan-out or pipeline. Native, Codex: the custom agent by name.
- Bench: run `bench.ts --<bench>` once per session before the first lane, then launch the transport contract's command through `launch.ts` in the background with `--status`.
- Size the cap from the `durationMs` that `result.ts` reported for comparable runs, plus gate time, plus slack. Never let the unit name it.
- Confirm the launch within a minute with `result.ts`: `bytes` past the header and a small `ageMs`. An instantly dead journal is a failed launch; read its errors file.

## Watch

- Read liveness from the artifact the work produces: owned-file mtimes, `result.ts` on the journal, the counts a suite reports. A wrapper's silence proves nothing.
- Prove a run dead before relaunching, by the process id in the spawn line `launch.ts` prints at start and in the `<journal>.pid` file it writes, per `references/launch.md` § Kill and relaunch. Never `pgrep -f` or `pkill -f` a pattern from a shell whose own command line contains it.
- A stalled or cap-killed run: resume with the session id from `result.ts`, or relaunch with a successor brief. Triage per `.agents/orchestration.md` § Deviation protocol.

## Accept

1. Capture a native report to `tmp/units/<unit>-report.md`, or read a bench answer with `result.ts --<bench> <journal> --out <path>`. Refuse a bench report with no journal path and session id.
2. Run `cite.ts <report>` and discard every claim whose citation does not resolve before reading the rest.
3. Verify with direct evidence: `git status --porcelain`, the diff, and the scoped validation the brief named. A writer's self-report is not evidence.
4. Run the review the size gate names, then integrate: apply shared-file patches serially; route an added type, mechanism, or criterion to a successor unit.
5. Write the acceptance commit message with what changed and what the unit measured; record `durationMs` when it informs a cap or a performance claim.
6. Run `sweep.ts --unit <unit> --delete` to remove the unit's brief, report, claims, journal, errors, status, pid, and last-message files. Delete any probe the unit left in the tree. In a campaign, update `.orkestrel/<package>/plan.md` and the ledger, and delete a closed seam's verdict. Run `sweep.ts --report` at acceptance and `sweep.ts --tmp [--older-than MINUTES]` after the last live unit exits.

## Refuse

- A brief that contradicts a measurement the campaign already recorded: reconcile first.
- A unit that asks for an unowned edit: stop it and re-scope.
- A concurrent writer in the same checkout: queue it.
- A tree-wide mutating command from a unit: strike it from the brief.
