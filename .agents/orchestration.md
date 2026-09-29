# Orchestration

How agents are dispatched, parallelized, reviewed, and cleaned up. Every harness follows this file. `AGENTS.md` governs code and outranks it.

## Authority

Read in order: the user's instruction; `AGENTS.md` and the rules it scopes to your paths; this file; the named skill; the guide. A harness bridge (`.claude/AGENTS.md`, `.codex/config.toml`, `.cursor/rules/orchestration.mdc`) adds mechanics and restates nothing here.

## Engines

| Engine                            | Job                                                   | Posture                                                  |
| --------------------------------- | ----------------------------------------------------- | -------------------------------------------------------- |
| Cursor Grok                       | absorb, distill, scout, bounded research              | read-only; returns evidence, never decisions             |
| Opus 5.5                          | subjective design, design-fit review, implementation  | proposes, audits, implements; never accepts its own work |
| GPT-6 Astra                       | objective analysis, correctness audit, implementation | proposes, audits, implements; never accepts its own work |
| Sonnet 5.5, GPT-6 Sol, GPT-6 Luna | mechanical units, gates, conformance, locating        | executes a fully specified brief                         |

The harness's own engine orchestrates: Opus 5.5 in Claude Code, Astra in Codex, Grok in Cursor. The Orchestrator owns the plan, every decision, integration, and acceptance. When the size gate names a review, the review runs on an engine that did not write the work.

## Roles

| Role         | Job                                                                | Claude        | Codex      |
| ------------ | ------------------------------------------------------------------ | ------------- | ---------- |
| `grok`       | absorption and distillation on Cursor Grok                         | sonnet driver | sol driver |
| `analyst`    | objective design argument or correctness audit on Astra            | sonnet driver | astra      |
| `astra`      | objective, constraint-heavy implementation on Astra                | sonnet driver | astra      |
| `planner`    | subjective design on Opus                                          | opus          | sol driver |
| `reviewer`   | design-fit or correctness review on Opus                           | opus          | sol driver |
| `opus`       | subjective implementation (API shape, naming, guide voice) on Opus | opus          | sol driver |
| `builder`    | one fully specified taste-free unit, app layer included            | sonnet        | sol        |
| `checker`    | mechanical conformance against criteria and rules                  | sonnet        | luna       |
| `verifier`   | gates and evidence commands, exit-code truth                       | sonnet        | sol        |
| `scout`      | locate files, symbols, seams                                       | sonnet        | luna       |
| `distiller`  | bulk reading when the Cursor bench is dark                         | sonnet        | luna       |
| `researcher` | primary-source research when the Cursor bench is dark              | sonnet        | luna       |
| `orkestrel`  | ecosystem reconciliation over supplied evidence                    | sonnet        | luna       |

- Name the role and its engine in every dispatch. Reach a role by its own name.
- A driver launches another provider's CLI and returns the journal path and session id with the result. It never judges or implements. Refuse a bench result that carries no journal path and session id; it ran on the driver.
- `.agents/transports/<provider>.md` owns each bench's invocation, sandbox, journal, and recovery. `.claude/agents/` and `.codex/agents/` hold one file per role.

## Routing

- Route by judgment load. Objective, constraint-heavy, mechanical-precision work goes to `astra`. API shape, naming, and documentation voice go to `opus`. A unit whose correct implementations cannot differ goes to `builder`.
- Delegate bulk supporting reads to `grok`: terrain, prior art, diff sweeps, scattered sources. Read decision-bearing source yourself. Fall back to `distiller` or `researcher` only when the Cursor bench is dark, and record the fallback.
- Route gates to `verifier`. A writer's self-reported gate is not evidence.
- Work directly on a one-file change, a lookup, or a one-line fix. Dispatch when isolation, parallelism, a second engine, or a large read pays for the brief.

## Size gate

`AGENTS.md` § Work loop sizes a change and fixes the precedence (large, then medium, then small). This file adds who runs what.

| Size   | Design                                                                                          | Implementation                                 | Review                                                                                                         | Gates                              |
| ------ | ----------------------------------------------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| small  | none                                                                                            | direct or `builder`                            | none; the touched test is the review                                                                           | touched file                       |
| medium | one opinion (`planner` or `analyst`) only when the shape is open                                | `opus`, `astra`, or `builder` by judgment load | one pass by a reviewer engine that did not write it, on numbered claims about the contract and the risky seams | `verifier` on the touched projects |
| large  | one adversarial round: `planner` and `analyst`, same brief, clean contexts, blind to each other | disjoint units in parallel                     | one `orkestrel-falsify` round on the integrated result                                                         | `verifier` tree-wide, once         |

- Never run a review on a small change. Never run a second design round on the same brief.
- A fix round re-audits the repaired claim only. A fix that adopted the reviewer's prescription verbatim closes with a mutation probe (disable the load-bearing line, watch the test fail, restore it). A fix that departs from it gets one pass by the other engine.
- Three review rounds at one seam end the depth search. Name what the audit is for, dispatch one blind lens per station of the stream the defect moves along, locate the source, and plan from there.
- An all-confirmed round ends the audit. A round needs an added or repaired claim to attack; reviewer appetite is not a subject.

## Campaign

A large change runs these phases once each, in order, and ends when the exit criterion written at the start is met.

1. **Absorb.** Map the terrain with the `orkestrel-scout` skill's `map.ts`, then `grok` distills it and the prior art. In an Orkestrel repository, `verifier` or another tool-capable role collects manifests, lockfiles, installed declarations, and registry readings, and `orkestrel` reconciles them.
2. **Design.** One adversarial round: `planner` (subjective) and `analyst` (objective) on one brief, clean contexts, blind to each other. Reconcile into one plan: units, owned files, dependencies, parallel and serial order, acceptance criteria, exit criterion, routing ledger.
3. **Implement.** Dispatch units per § Routing and § Parallelism.
4. **Integrate.** Apply returned patches to shared files serially. A type, mechanism, or criterion found here is a successor unit, never an integration edit.
5. **Audit.** One `orkestrel-falsify` round on the integrated result, one engine that did not write it per lane; add `checker` when the criteria are mechanical.
6. **Verify.** `verifier` runs the tree-wide gates once.
7. **Re-baseline.** Strike satisfied units, restate transformed ones, add units the exit criterion already required. A re-baseline never moves the exit criterion; that needs the user.
8. **Accept.** Report outcome, decisions, evidence, remaining risk. Run `orkestrel-debrief` when the campaign changed process, then prune per § Cleanup.

## Parallelism

- Fan out when the work is many small, fully specified, disjoint units: one cheap agent per unit with minimal context. Give the agents the same model, effort, agent type, tools, schema, and working directory when isolation and routing allow it, so their prompts share one cache prefix.
- Judgment stays narrow: a design or review pass is at most the two lanes the size gate names, each in a clean context, blind to the other, and it runs once. Never fan judgment out further, and never run it as a loop.
- One writer per checkout. Give parallel writers disjoint owned files; give a writer its own worktree under `tmp/worktrees/` only when two units must write the same files at once. Commit a checkpoint before a writing dispatch.
- Shared files are report-only; a unit returns an exact patch.
- Concurrent units validate read-only and scoped to their owned files. Never run tree-wide `format`, lint `--fix`, or `build` beside a live unit.
- One Grok lane at a time; queue the rest. An empty lane beside a live probe is starvation, not darkness.
- The Orchestrator's own sweep is a writing dispatch: run it before or after the units, never beside them.

## Permission floor

- Read-only roles carry no edit or write tool. The Orchestrator supplies the diff and status to every review dispatch.
- No role commits, pushes, tags, publishes, installs, or runs a destructive command.
- No role runs `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Undo an edit by rewriting the text.
- No role reads, prints, copies, uploads, or packages a secret: `.env*`, `.npmrc`, `auth.json`, keys, tokens, `CURSOR_API_KEY`.
- A unit writes only under its owned files and its checkout's `tmp/`. The Orchestrator's own briefs, probes, drafts, and records live in the checkout's `tmp/` too, never in a directory outside the repository; the user follows the work through the tree.
- When a sandbox rejects a write, the unit stops and reports the rejection. It never tries another write mechanism.
- A unit deletes only the fixture directory it created, by its recorded path. It never removes a `tmp/<lane>` directory, another unit's files, or anything through `sweep.ts --tmp` or `--unit … --delete`; those are the Orchestrator's, after the last live unit exits.

## tmp layout

Every working file lives under the checkout's gitignored `tmp/`, in the directory its kind names.

| Directory                                  | Holds                                                                                              |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `tmp/claude/`, `tmp/codex/`, `tmp/cursor/` | bench briefs, launch scripts, journals, `.err` files, last-message files, login logs, per provider |
| `tmp/units/`                               | native unit briefs, reports, claims files, and campaign records                                    |
| `tmp/probes/`                              | runtime probes the `probe` Vitest project collects and the `probe` MCP server arms                 |
| `tmp/type/`                                | the type stage's workspace mirror, owned by `@orkestrel/probe`                                     |
| `tmp/captures/`                            | screenshots, resolved-style snapshots, and other capture portfolios                                |
| `tmp/worktrees/`                           | worktrees the Orchestrator creates for a parallel writer                                           |

## .orkestrel layout

`.orkestrel/` is the campaign folder: tracked, deleted in the acceptance commit, never a home for a rule. A nested directory belongs to one package; a file at the top level belongs to the ecosystem.

| Path                    | Holds                                                                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `.orkestrel/<package>/` | one package's live campaign: its `plan.md`, its routing ledger, the verdicts of its open seams, and its exposure records                 |
| `.orkestrel/plan.md`    | the live fleet campaign's plan: goal, exit criterion, packages, layer order, and the units each package owes                             |
| `.orkestrel/ledger.md`  | the fleet campaign's routing ledger: every dispatch, engine, and bench substitution across packages                                      |
| `.orkestrel/release.md` | the live release wave: its layers, each package's bump ruling with its evidence, the round each package landed in, and standing readings |

- Write a file about one package under that package's directory and never at the top level; write a file about two or more packages at the top level and never under a package.
- Delete a package directory in that campaign's acceptance commit and a top-level file when the wave or fleet campaign it records closes. `sweep.ts --report` lists both.

## Dispatch

`orkestrel-dispatch` owns the brief template, launch mechanics for native and bench units, long-running commands, liveness, and recovery. Load it before a bench lane, a campaign unit, or any command that outlives the turn. The floor that follows binds every dispatch.

- A small native unit's brief is the dispatch message: scope, law references, expected result. Write a brief file with the dispatch skill's `scripts/brief.ts` at `tmp/units/<unit>-brief.md` (native) or `tmp/<bench>/<unit>-brief.md` (bench) when the unit is a bench lane, belongs to a campaign, or may need re-running. A re-run gets `<unit>-brief-<n>.md`; never edit a launched brief.
- State in every brief: role and engine, one objective, the evidence slice, owned and off-limits files, the acceptance criteria cheap-first, the return shape, the deviation contract, and that the executor performs the work itself and spawns nothing.
- Capture a campaign unit's report to `tmp/units/<unit>-report.md`, or read the bench's last-message file.
- Launch every multi-minute command as a harness-tracked background command through `node .agents/skills/orkestrel-dispatch/scripts/launch.ts` under a cap sized from prior runs, and read a bench answer with that skill's `scripts/result.ts`. Every launcher, probe, and instrument is a TypeScript file run by `node`, never a shell or Python script. Read liveness from the artifact the work produces. Kill only a recorded process id, never a pattern, and confirm the process and its descendants are gone before another writer takes its files.
- Probe a bench with the dispatch skill's `scripts/bench.ts` before its first lane, and re-read liveness at every dispatch after a failure.
- Send a mid-campaign decision to every live unit whose brief it invalidates.

## Deviation protocol

A unit stops when a conflict blocks its objective or requires an unowned change. It reports expected, found, exact evidence, done or not done, and at most one hypothesis. It settles an ancillary choice inside its scope and records it.

The Orchestrator triages: obvious correction → tighten and re-dispatch; missing evidence → `verifier`; unknown terrain → `grok`; unknown design or cause → one `planner` or `analyst` question. Then decide, update the plan, re-dispatch.

## Benches

- Probe a bench with the dispatch skill's `scripts/bench.ts` before its first lane in a session. A version string or a login status is not liveness.
- A dispatch that fails on auth, quota, model access, or network records the bench dark and re-plans the lane on the substitute engine: Astra dark → Opus holds the objective lane too; Opus dark in Codex → Astra holds the subjective lane too; Grok dark → Luna, then Sonnet. Record every substitution in the routing ledger.
- Never assign Grok a design or review lane in Claude Code or Codex.
- Journal every bench run under `tmp/<bench>/` with its session id. Never commit a journal.

## Cleanup

- When a unit is accepted, carry its measurements, unresolved findings, and any instrument worth keeping into the commit message, the campaign ledger, or a test, then delete its `tmp/units/<unit>-*` files and its bench journals.
- `.orkestrel/` holds only what § .orkestrel layout names. Delete a verdict when its seam closes and the package directory in the acceptance commit; git history is the archive.
- Delete a probe from the source tree before the unit returns; promote a probe that settled a claim into a test.
- Run `node .agents/skills/orkestrel-dispatch/scripts/sweep.ts --report` at acceptance; it lists leftovers under `tmp/` and `.orkestrel/` by age and deletes nothing. Run the same script with `--tmp` after the last live unit exits; it deletes files older than its threshold and refuses while a journal is changing.
- A campaign artifact never lives in the package it is about.

## Cache

- Fix the model at session start. Effort switches and MCP changes invalidate the cache on most models and configurations; check the rule for the active model and tool-loading mode before changing either mid-session.
- Keep the always-on instruction set small; rules load by path. An edit to a loaded instruction file takes effect after `/clear`, `/compact`, or a restart.
- Give reading and driver roles no instruction files (`omitClaudeMd` in Claude Code) when their charter carries the floor they need.
- Send bulk reads to a subagent and keep only the distillate.

## Acceptance

- No writer's and no bench's self-assessment is authoritative. The Orchestrator accepts after the review and the gates the size gate names.
- Accept when the exit criterion is met and the gates are green. Reopening an accepted criterion is the user's instruction, not a reviewer's finding.
- Substitute an engine only when the same session recorded the bench dark; name the fallback in the ledger.
- Publishing is the user's decision and credential; `orkestrel-publish` owns the release procedure, the bump rules, and the dependency-tarball rules.
