---
name: orkestrel-dispatch
description: >-
  Dispatch one unit of work to a native subagent or an external bench and bring its result back: write the brief, probe the bench, launch under a cap, watch liveness, read the report, check its citations, accept, and delete the launch copies. Use when `.agents/orchestration.md` routes work to a role, when a bench lane is needed, or when a command will outlive the turn that starts it.
---

# Dispatch

`.agents/orchestration.md` decides who runs what and binds the permission floor; this skill runs the dispatch. Read `references/launch.md` before any command that outlives the turn. Run every step a script performs as that script, from the checkout root, with `node`.

## Scripts

| Script              | Does                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scripts/bench.ts`  | `--cursor [--resolve]`, `--codex [--sandbox MODE]`, or `--claude`, each with `[--model ID] [--cap SECONDS]`: resolves the bench entry, reads its version and login, runs one bounded round trip into `tmp/<bench>/bench.jsonl`, and prints JSON with `live`; `--resolve` prints the Cursor entry alone. A malformed cap, a `--sandbox` outside `read-only`, `workspace-write`, and `danger-full-access`, or `--resolve` without `--cursor` is a usage fault, never a dark bench. Exit 3 when the bench is dark, 64 on usage.            |
| `scripts/brief.ts`  | `--unit UNIT --lane units\|cursor\|codex\|claude [--subject TEXT]` writes the brief from `.agents/templates/brief.md` and never overwrites a launched one; `--check PATH` lists every slash-bearing path the brief names that does not resolve from the root. Exit 3 when one is missing.                                                                                                                                                                                                                                               |
| `scripts/launch.ts` | `--journal PATH --errors PATH --cap SECONDS [--status] -- COMMAND [ARGS...]` runs the command with no shell and closed stdin, kills it at the cap (its process tree on Windows), records `git status --porcelain` before and after with `--status`, prints a spawn line carrying the `pid` when the command starts, writes that pid to `<journal>.pid`, and ends the errors file with `exit=`. Exit 124 when capped; 127 when the command cannot start (the errors file names why); 64 on usage, including a cap above 2147483 seconds. |
| `scripts/login.ts`  | `--codex [--cap SECONDS]` reads `codex login status`, runs `codex login --device-auth` journaled to `tmp/codex/login.log` when it is not logged in, prints the URL and the one-time code as they appear, and polls the status until it answers or the cap ends, ending any status read that outlasts the cap, and refuses a cap above 2147483 seconds; `--claude` reads `claude auth status`. Exit 0 logged in, 3 not.                                                                                                                  |
| `scripts/result.ts` | `--cursor\|--claude\|--codex JOURNAL [--out PATH]` prints the session id, the answer length, the run's `exit`, `capped`, and `durationMs` from the errors file, and the journal's `bytes`, `ageMs`, and `lastEvent`. Exit 3 when the journal carries no session or answer.                                                                                                                                                                                                                                                              |
| `scripts/cite.ts`   | `PATH [--root DIR] [--json]` lists every `file:line` citation in a report whose file does not exist or whose line is past the end. Exit 3 when one does not resolve.                                                                                                                                                                                                                                                                                                                                                                    |
| `scripts/sweep.ts`  | `--report` lists leftovers under `tmp/` and `.orkestrel/` by age, deletes nothing, and flags a `.orkestrel/**/*.md` line that cites a backticked path git ignores or names a machine path; `--tmp [--older-than MINUTES]` deletes stale launch files and refuses while a journal is changing; `--unit UNIT [--delete]` lists or deletes one accepted unit's brief, report, claims, journal, errors, status, pid, and last-message files; `--tmp` and `--unit --delete` keep every file git tracks and print `kept tracked <path>`.      |
| `scripts/chain.ts`  | `--plan FILE.json --journal DIR` runs the steps of a JSON plan (`name`, `command`, `args`, optional `cwd` and `env`) in order with no shell, writes each step's output to `<journal>/<name>.txt`, prints one `name exit= durationMs=` line per step, and stops at the first step that does not exit 0. Exit is that step's code; 2 when a step cannot start; 64 on usage.                                                                                                                                                               |
| `scripts/patch.ts`  | `EDITS.md (--plan \| --apply) [--skip N ...]` applies an edit file of `### <path>` blocks, each with a `reason:` line and fenced `old:` and `new:` texts: every `old` text must occur exactly once in its file after the earlier edits to that file (however the blocks spell its path), and nothing is written unless every selected edit resolves. `--plan` prints each edit's resolution; `--skip N` leaves out edit N and repeats. Exit 1 when an edit does not resolve, 64 on usage.                                               |

## Write the brief

1. A small native unit's brief is the dispatch message: scope, law references, expected result. Otherwise run `node .agents/skills/orkestrel-dispatch/scripts/brief.ts --unit <unit> --lane <lane>` and fill every section; write `none` in an empty one. A re-run takes the `-<n>` file the script writes; never edit a launched brief.
2. Back every fact the unit will act on with the command and output that established it. Check a fact against the tree, not against another artifact. A cross-process or filesystem brief carries a platform-facts table (operation, host, measured code, and the probe that measured it) and marks each unmeasured assumption. An investigation brief names the failing command and state, the candidate layers, the readings that distinguish them, the test that pins the existing behavior, the fix pre-approved for each confirmed reading, and the stop for every other outcome. A failure that passes alone but repeats in the sequence that produced it is an order-dependent defect to diagnose, never a timing miss to record, and an unchanged rerun of that sequence adds no evidence. A brief built on an earlier lane's evidence names what that evidence left unproven and schedules the cheapest run that covers the remainder before any long run. A brief carries the failure output it asks the unit to repair inline or under the unit's own checkout, never only as a path the unit may not reach.
3. Scope by what the change makes false: run the `orkestrel-scout` skill's `map.ts --refs` and `--census` for an existing member of any enumerated population the unit extends, and own every file that comes back, with the tests that pin the behavior, the fixtures derived from a constant, and the materialized copy of a template. A brief that prescribes a mechanism step by step lists the inherited operations that keep their behavior, so its stop line guards only what the prescription changes.
4. Order acceptance criteria cheap-first, per `AGENTS.md` § Work loop: regenerate, then the format check, lint, and type check, then scoped tests. Name a timing-sensitive or tree-wide gate as an observation, not a criterion. Place a run whose cost outweighs the discrimination it adds after the cheap checks and after the inputs stabilize. Before a brief ships, run every acceptance check it states as a command's expected output against the destination tree and word the row from that reading.
5. State that the executor performs the work itself and spawns nothing. A bridge driver carries the brief unaltered and returns the journal path and session id.
6. Name the host conditions the unit will hit: shell, sandbox, network, files expected dirty, commands known to fail. Give absolute paths for work outside the session's root; a lane's shell can restart in another directory between calls. A brief that folds prepared work onto a checkout inventories the tracked, staged, and untracked inputs, checks the chosen patch method against the destination's actual state, and names the conflict precedence and a bounded recovery.
7. Fill each placeholder at its value sites only; a global replace also rewrites a stop clause that names the placeholder.
8. Run `brief.ts --check <brief>` and fix every missing path before the launch.

## Launch

- Select continuation or a fresh session per `.agents/orchestration.md` § Sessions and consultation. Use the message or resume mechanism the harness's live tool descriptions name, and record the session and task identities it returns.
- Start a native unit by the Start row of the session's harness page under `.agents/skills/orkestrel-parallel/references/`; that row also names when a hosting harness's child-task channel replaces the native one.
- Size the cap per `references/launch.md` § Cap. Never let the unit name it.
- Confirm the launch with `result.ts` before the next dispatch: `bytes` past the header and a small `ageMs`. An instantly dead journal is a failed launch; read its errors file.

### Bench lanes

An external engine widens capacity and inherits no authority; treat its output as a proposal until the Orchestrator verifies it against the tree. `.agents/transports/<harness>.md` owns each bench's command, sandbox, and recovery.

- Probe once per session before the first lane with `bench.ts --<bench>`, and again at any dispatch after a failure. `live: false` records the bench dark. Then launch the transport's command through `launch.ts` in the background with `--status`.
- A driver writes the brief with `brief.ts --lane <bench>`, resolves the command, runs the lane itself only where its transport allows, and otherwise returns the brief path, the command, and the journal path for the Orchestrator to launch. A driver pinned read-only writes nothing: it returns the brief text, its intended path, the resolved command, and the journal paths, and the Orchestrator writes the brief. Briefs never travel as shell arguments.
- Name in the brief the host restrictions the transport records that the unit will meet. The Orchestrator takes a proof that needs a restricted capability on the host, and the unit records it as an observation naming the exact command.
- A bench unit writes only its owned files and its checkout's `tmp/`. Name its report path there, or take the report from the last-message file.
- Record the lane in the roster (`.agents/orchestration.md` § Sessions and consultation) with subject, journal path, and session id. The Orchestrator owns the cap and the watch; nothing polls the bench from inside the driver.
- Read the answer with `result.ts`, never from stdout, and refuse a result with no journal path and session id.

## Watch

- Read liveness from the artifact the work produces: owned-file mtimes, `result.ts` on the journal, the counts a suite reports. A wrapper's silence proves nothing.
- Prove a run dead before relaunching, per `references/launch.md` § Kill and relaunch.
- A stalled or cap-killed run: resume with the session id from `result.ts`, or relaunch with a successor brief. Triage per `.agents/orchestration.md` § Deviation protocol.

## Accept

1. Capture a native report to `tmp/units/<unit>-report.md`, or read a bench answer with `result.ts --<bench> <journal> --out <path>`. A brief states the unit's estimated cost and the cost at which it stops and reports, and the unit's report records the observed cost beside that estimate.
2. Run `cite.ts <report>` and discard every claim whose citation does not resolve before reading the rest.
3. Verify with direct evidence: `git status --porcelain`, the diff, and the scoped validation the brief named. A writer's self-report is not evidence. A receipt counts for every claim its input coverage proves, whatever command produced it; a passing part of an aborted run is not a receipt.
4. Run the review the size gate names, then integrate: apply shared-file patches serially, each an edit file in the shape `patch.ts` reads, with `patch.ts EDITS.md --plan`, then `--apply`; route an added type, mechanism, or criterion to a successor unit.
5. Write the acceptance commit message with what changed and what the unit measured; record `durationMs` when it informs a cap or a performance claim.
6. Run `sweep.ts --unit <unit> --delete` to remove the unit's brief, report, claims, journal, errors, status, pid, and last-message files. Delete any probe the unit left in the tree. In a campaign, update `.orkestrel/<package>/plan.md` and the ledger, and delete a closed seam's verdict. `.agents/orchestration.md` § Cleanup owns the `--report` and `--tmp` runs.

## Refuse

- A brief that contradicts a measurement the campaign already recorded: reconcile first.
- A unit that asks for an unowned edit: stop it and re-scope.
- A concurrent writer outside an `orkestrel-parallel` ownership assignment: queue it.
- A tree-wide source-mutating command from a unit: strike it from the brief. For verifier command outputs, apply `.agents/orchestration.md` § Permission floor.
