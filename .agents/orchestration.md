# Orchestration

How agents are dispatched, parallelized, reviewed, and cleaned up. Every harness follows this file. `AGENTS.md` governs code and outranks it.

## Authority

Read in order: the user's instruction; `AGENTS.md` and the rules it scopes to your paths; this file; the named skill; the guide. A harness bridge (`.claude/AGENTS.md`, `.codex/config.toml`, `.cursor/rules/orchestration.mdc`) adds mechanics and restates nothing here.

## Engines

Name the harness family and its access route: Claude through Claude Code or the Claude CLI; Codex through Codex native agents or the Codex CLI; Cursor through the Cursor CLI, with Grok 4.7 Extra High for the Grok bench. Classify GPT-6 Astra, GPT-6.1 Sol, and GPT-6 Luna as Codex-family engines, including when another harness hosts the Orchestrator.

| Engine                  | Job                                                                             | Posture                                                                 |
| ----------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Claude Fable 5.1        | orchestration in Claude Code: the plan, every decision, integration, acceptance | never dispatched: never a subagent, a bench, a fork, or a Workflow node |
| Cursor Grok             | context absorption, distillation, broad mapping, exploration                    | read-only; returns evidence, never decisions                            |
| Claude Opus 5.5         | subjective design, design-fit review, implementation                            | proposes, audits, implements; never accepts its own work                |
| GPT-6 Astra             | objective analysis, correctness audit, implementation                           | proposes, audits, implements; never accepts its own work                |
| Claude Sonnet 5.5       | bounded implementation of a closed shape, ecosystem reconciliation              | executes a fully specified brief                                        |
| Claude Haiku 5.5        | bench drivers, small precise tasks, exact lookups, conformance, gates           | executes a fully specified brief; edits no source                       |
| GPT-6.1 Sol, GPT-6 Luna | mechanical units, drivers, small precise tasks, gates, exact lookups            | executes a fully specified brief                                        |

The harness's own engine orchestrates: Claude Fable 5.1 or Claude Opus 5.5 in Claude Code, GPT-6 Astra in Codex, Cursor Grok in Cursor. The Orchestrator owns the plan, every decision, integration, and acceptance. When the harness is Codex or the Orchestrator uses a Codex-family engine, use the Codex column: map Opus to GPT-6 Astra, Sonnet to GPT-6.1 Sol, and Haiku to GPT-6 Luna; execute mapped Astra roles natively without an Opus bench probe. Under this mapping, assign review to another agent in a clean context and forbid self-review, including when writer and reviewer both use Astra. For other harnesses, review runs on an engine that did not write the work.

## Roles

| Role         | Job                                                        | Claude       | Codex       |
| ------------ | ---------------------------------------------------------- | ------------ | ----------- |
| `grok`       | absorption, distillation, broad mapping, exploration       | haiku driver | luna driver |
| `analyst`    | objective design argument or correctness audit on Astra    | haiku driver | astra       |
| `astra`      | objective, constraint-heavy implementation on Astra        | haiku driver | astra       |
| `planner`    | subjective design                                          | opus         | astra       |
| `reviewer`   | design-fit or correctness review                           | opus         | astra       |
| `opus`       | subjective implementation (API shape, naming, guide voice) | opus         | astra       |
| `builder`    | one bounded unit with a closed shape, app layer included   | sonnet       | sol         |
| `checker`    | mechanical conformance against criteria and rules          | haiku        | luna        |
| `verifier`   | gates and evidence commands, exit-code truth               | haiku        | luna        |
| `scout`      | exact bounded lookup of files, symbols, seams              | haiku        | luna        |
| `distiller`  | bulk reading when the Cursor bench is dark                 | haiku        | luna        |
| `researcher` | primary-source research when the Cursor bench is dark      | haiku        | luna        |
| `orkestrel`  | ecosystem reconciliation over supplied evidence            | sonnet       | sol         |

- Name the role and its engine in every dispatch. Reach a role by its own name.
- A driver launches another harness's CLI and returns the journal path and session id with the result. It never judges or implements. Refuse a bench result that carries no journal path and session id; it ran on the driver.
- `.agents/transports/<harness>.md` owns each bench's invocation, sandbox, journal, and recovery. `.claude/agents/` and `.codex/agents/` hold one file per role.

## Routing

- Route by judgment load. Objective, constraint-heavy, mechanical-precision work goes to `astra`. API shape, naming, and documentation voice go to `opus`. A bounded unit whose brief or types fix its names, API, and architecture goes to `builder`, whatever its private lines; a unit that spans packages or leaves one of those open goes to `astra` or `opus`.
- Route all context absorption, distillation, broad mapping, and exploratory or fishing reads to `grok` on Cursor Grok 4.7 Extra High: terrain, prior art, diff sweeps, scattered sources. Keep decision-bearing reading with the decision owner. Fall back to `distiller` or `researcher` only when the Cursor bench is dark, and record the fallback; ease or cost never authorizes a fallback.
- Keep small tedious precise tasks native: Claude Haiku in Claude, Codex Luna in Codex. Use `scout` for an exact bounded lookup; keep bench drivers, `checker`, and `verifier` on their mapped native engines. A bounded file scope does not turn context absorption or exploratory reading into a native lookup.
- Route gates to `verifier`. A writer's self-reported gate is not evidence.
- Work directly on a one-file change or a one-line fix, subject to the preceding routing rules. Route standalone lookups through `scout`. Dispatch when isolation, parallelism, a second engine, or a large read pays for the brief.

## Sessions and consultation

- Before launching a unit, check the roster for an existing session whose responsibility, model, permissions, workspace, and retained context fit the task, and resume it. Keep related tasks for one responsibility in that session.
- Start a fresh session when no suitable session survives, the work is unrelated, or retained context would compromise the judgment. Use fresh contexts for independent review and the blind design round. An agent that helped design or implement the subject cannot independently review that contribution.
- Record the session identity separately from its task, turn, process, and message address. Record each session's harness, provider, model, options, workspace, responsibility, owned paths, continuation address, latest task, and evidence paths in the roster, and preserve its prior task results.
- Treat a live writer as an agent with an active assignment and edit authority. A retained session without an assignment holds no resource merely by existing. Preserve an explicit hold until its owner releases it.
- Continue a unit through compaction. Before a handoff or context limit, record decisions, changed instructions, source identity, unresolved questions, failed and passing evidence, active process identities, ownership, and the next action. Compaction neither completes a task nor releases its files or processes.
- On continuation, the Orchestrator sends the next bounded objective and the facts changed after the last turn. The continued agent reads changed or missing authority and the source regions that objective needs, and rechecks mutable facts such as source state and process liveness. Do not repeat unchanged bulk reads merely because a unit resumes.
- Consult a suitable peer when a consequential approach remains open, evidence conflicts, or repeated attempts stop narrowing a failure. Give the peer the question, relevant evidence, attempted approaches, constraints, and requested answer. Use an existing specialist when its context helps and a fresh peer when the question needs an independent challenge.
- Keep consultation read-only and bounded. Ask for a recommendation, its evidence, uncertainty, and a concrete next check. The executor retains the work; the Orchestrator rules on scope and acceptance. Advice grants no authority and does not satisfy an independent review gate.
- Resolve conflicting advice against the contract and observable evidence. Do not add consultation to routine steps or repeat it without a changed question or evidence.
- When a requested transport fails, record the failure and whether a child was created. Before retrying an uncertain launch, inspect the recorded task or session. Use a permitted fallback with its actual model and options disclosed; retry a refused route only after a relevant condition changes.

## Size gate

`AGENTS.md` § Work loop sizes a change and fixes the precedence (large, then medium, then small). This file adds who runs what.

| Size   | Design                                                                                          | Implementation                                 | Review                                                                                                       | Gates                              |
| ------ | ----------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| small  | none                                                                                            | direct or `builder`                            | none; the touched test is the review                                                                         | touched file                       |
| medium | one opinion (`planner` or `analyst`) only when the shape is open                                | `opus`, `astra`, or `builder` by judgment load | one pass by an independent reviewer per § Engines, on numbered claims about the contract and the risky seams | `verifier` on the touched projects |
| large  | one independent round: `planner` and `analyst`, same brief, clean contexts, blind to each other | disjoint units in parallel                     | one `orkestrel-falsify` round on the integrated result                                                       | `verifier` tree-wide, once         |

- Never run a review on a small change. Never run a second design round on the same brief.
- A fix round re-audits the repaired claim only. A fix that adopted the reviewer's prescription verbatim closes with a mutation probe (disable the load-bearing line, watch the test fail, restore it). A fix that departs from it gets one pass by an independent reviewer per § Engines.
- When review rounds at one seam keep surfacing defects without converging on their source, follow `.agents/skills/orkestrel-falsify/SKILL.md` § End the depth search.
- An all-confirmed round ends the audit. A round needs an added or repaired claim to test; reviewer appetite is not a subject.

## Campaign

A large change runs these phases once each, in order, and ends when the exit criterion written at the start is met.

1. **Absorb.** Map the terrain with the `orkestrel-scout` skill's `map.ts`, then `grok` distills it and the prior art. In an Orkestrel repository, `verifier` or another tool-capable role collects manifests, lockfiles, installed declarations, and registry readings, and `orkestrel` reconciles them.
2. **Design.** One independent round: `planner` (subjective) and `analyst` (objective) on one brief, clean contexts, blind to each other. Reconcile into one plan: units, owned files, dependencies, parallel and serial order, acceptance criteria, exit criterion, routing ledger.
3. **Implement.** Dispatch units per § Routing and § Parallelism.
4. **Integrate.** Apply returned patches to shared files serially. A type, mechanism, or criterion found here is a successor unit, never an integration edit.
5. **Audit.** One `orkestrel-falsify` round on the integrated result, an independent reviewer per § Engines in each lane; add `checker` when the criteria are mechanical.
6. **Verify.** `verifier` runs the tree-wide gates once.
7. **Re-baseline.** Strike satisfied units, restate transformed ones, add units the exit criterion already required. A re-baseline never moves the exit criterion; that needs the user.
8. **Accept.** Report outcome, decisions, evidence, remaining risk. Run `orkestrel-debrief` when the campaign changed process, then prune per § Cleanup.

## Parallelism

- Parallelize independently owned work when useful progress can overlap. Reuse suitable sessions per § Sessions and consultation, bound each objective, and count coordination and verification costs when choosing the lanes. § Cache governs model and tool settings.
- Judgment stays narrow: a design or review pass is at most the two lanes the size gate names, each in a clean context, blind to the other, and it runs once. Never fan judgment out further, and never run it as a loop.
- One writer per checkout, except under `orkestrel-parallel`: there, at most three writers share one checkout, each owns disjoint files and disjoint regions of shared files, and one runner lane owns every test, check, and build process. Otherwise give parallel writers disjoint owned files, and give a writer its own worktree under `tmp/worktrees/` only when two units must write the same files at once. Commit a checkpoint before a writing dispatch.
- Shared files are report-only; a unit returns an exact patch. Under `orkestrel-parallel`, a writer edits its owned regions of a shared file directly.
- Scope validation by the claim and its input dependencies, not by writer ownership alone. Under `orkestrel-parallel`, the runner owns checks and obtains the required write holds. Preserve valid receipts; rerun a check when its inputs, configuration, environment, or claim changed. Never run tree-wide `format`, lint `--fix`, or `build` beside a live writer.
- One Grok lane at a time; queue the rest. An empty lane beside a live probe is starvation, not darkness.
- The Orchestrator's own sweep is a writing dispatch: run it before or after the units, never beside them.

## Permission floor

- Restrict read-only roles to read tools when the harness supports that restriction. Otherwise state the read-only boundary in the brief and record its enforcement limit. The Orchestrator supplies the diff and status to every review dispatch.
- Permit a verifier to write its assigned evidence artifacts and the generated outputs its dispatch declares; never permit source repairs. A declaration names the command and each path the command writes or replaces. Declare a path only when the command regenerates it and no lane authors it, such as a build directory or a generated inventory file; an authored path is source, whichever command rewrites it. Declare no path for a command that only deletes. Keep each declared output outside every other lane's owned files and recorded fixtures, and hold it with the command's inputs for the run. Under this floor, the declared command can remove and rewrite its declared outputs, and that replacement is neither a destructive command nor a deletion.
- Record `git status --porcelain` before and after a declared command. Report each declared output that git tracks and the run changed; never revert it. When the run changed a path outside its declarations, stop and report the path.
- No role commits, pushes, tags, publishes, installs, or runs a destructive command.
- No role runs `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Undo an edit by rewriting the text.
- No role reads, prints, copies, uploads, or packages a secret: `.env*`, `.npmrc`, `auth.json`, keys, tokens, `CURSOR_API_KEY`.
- A unit writes only under its owned files, its checkout's `tmp/`, and the declared outputs the preceding bullets permit. The Orchestrator's own briefs, probes, drafts, and records live in the checkout's `tmp/` too, never in a directory outside the repository; the user follows the work through the tree.
- When a sandbox rejects a write, the unit stops and reports the rejection. It never tries another write mechanism.
- Apart from a declared command replacing its declared outputs, a unit deletes only the fixture directory it created, by its recorded path. It never removes a `tmp/<lane>` directory, another unit's files, or anything through `sweep.ts --tmp` or `--unit … --delete`; those are the Orchestrator's, after the last live unit exits.

## tmp layout

Every working file lives under the checkout's gitignored `tmp/`, in the directory its kind names.

| Directory                                  | Holds                                                                                              |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `tmp/claude/`, `tmp/codex/`, `tmp/cursor/` | bench briefs, launch scripts, journals, `.err` files, last-message files, login logs, per harness  |
| `tmp/units/`                               | native unit briefs, reports, claims files, and campaign records                                    |
| `tmp/probes/`                              | runtime probes the `probe` Vitest project collects and the `probe` MCP server arms                 |
| `tmp/type/`                                | the type stage's workspace mirror, owned by `@orkestrel/probe`                                     |
| `tmp/captures/`                            | screenshots, resolved-style snapshots, and other capture portfolios                                |
| `tmp/browsers/`                            | the journeys a `browse` server saves, their runs and captures, and its profiles under `.profiles/` |
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
- Send a changed decision to every affected session before it continues, including an idle session selected for reuse. Preserve the original brief and supply a checked successor brief when scope or acceptance changes.

## Deviation protocol

A unit stops when a conflict blocks its objective or requires an unowned change. It reports expected, found, exact evidence, done or not done, and at most one hypothesis. It settles an ancillary choice inside its scope and records it.

The Orchestrator triages: obvious correction → tighten and re-dispatch; missing evidence → `verifier`; unknown terrain → `grok`; unknown design or cause → one `planner` or `analyst` question. Then decide, update the plan, re-dispatch.

## Benches

- Probe a bench with the dispatch skill's `scripts/bench.ts` and the model its transport pins before its first lane in a session. A version string or a login status is not liveness.
- For a harness that uses a bench, record a dispatch that fails on auth, quota, model access, or network as bench dark and re-plan the lane: Astra bench dark → Claude Opus holds the objective lane too; Claude Opus bench dark → Astra holds the subjective lane too; Grok dark → the harness's native reader, `distiller` or `researcher`: Claude Haiku 5.5 in Claude Code, GPT-6 Luna under the Codex mapping. When Haiku refuses the read, re-dispatch the role with `model: sonnet`. Record every substitution in the routing ledger. For a native role failure, use § Deviation protocol without a Claude fallback prerequisite.
- Never assign Grok a design or review lane in Claude Code or Codex.
- Journal every bench run under `tmp/<bench>/` with its session id. Never commit a journal.

## Cleanup

- When a unit is accepted, carry its measurements, unresolved findings, and any instrument worth keeping into the commit message, the campaign ledger, or a test, then delete its `tmp/units/<unit>-*` files and its bench journals.
- `.orkestrel/` holds only what § .orkestrel layout names. Delete a verdict when its seam closes and the package directory in the acceptance commit; git history is the archive.
- Delete a probe from the source tree before the unit returns; promote a probe that settled a claim into a test.
- Run `node .agents/skills/orkestrel-dispatch/scripts/sweep.ts --report` at acceptance; it lists leftovers under `tmp/` and `.orkestrel/` by age and deletes nothing. Run the same script with `--tmp` after the last live unit exits; it deletes files older than its threshold and refuses while a journal is changing.
- A campaign artifact never lives in the package it is about.

## Cache

- Keep the model, options, tools, and instruction prefix unchanged while they fit the task. Check the active provider and harness before claiming that a change preserves or invalidates caching. Treat a continued session as retained context, not as a cache hit; a cache hit depends on the provider, the prefix, and the retention window. Claim a saving only from recorded usage.
- Keep the always-on instruction set small and load supporting rules by scope. When instructions change, use the harness's documented reload mechanism and tell affected agents what changed. Do not assume a file edit updates an active session.
- Give reading and driver roles no instruction files (`omitClaudeMd` in Claude Code) when their charter carries the floor they need.
- Route bulk reads per § Routing and keep only the distillate.

## Acceptance

- No writer's and no bench's self-assessment is authoritative. The Orchestrator accepts after the review and the gates the size gate names.
- Accept when the exit criterion is met and the gates are green. Reopening an accepted criterion is the user's instruction, not a reviewer's finding.
- Substitute an engine only when the same session recorded the bench dark; name the fallback in the ledger.
- Publishing is the user's decision and credential; `orkestrel-publish` owns the release procedure, the bump rules, and the dependency-tarball rules.
