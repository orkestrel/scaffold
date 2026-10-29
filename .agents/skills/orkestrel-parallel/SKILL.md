---
name: orkestrel-parallel
description: >-
  Run parallel work: lanes inside one session (subagents, child tasks, background commands) and peer sessions that share a checkout, a machine, or an execution lane. Use when units can progress in parallel, when another session works on the same machine or checkout, or before the first lane on a harness. Bound the host, keep lanes visible, coordinate writers through messages with one runner for checks, and hand a shared execution lane over in one message. Each harness page records its mechanics and quirks; a harness with no page carries no writer or runner lane until its bring-up questions are answered on one.
---

# Parallel lanes

## Choose the scope

| Scope              | Lanes                                                                                          | Coordinate through                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Within one session | subagents, child tasks, and background commands the session launches                           | launch results and completion notices                                                                     |
| Across sessions    | separate top-level sessions on one machine sharing a checkout, the host, or the execution lane | messages that wake the receiving session; one tracked coordination record when no such channel reaches it |

- Read the page for each harness that hosts a lane before its first launch: `references/claude.md`, `references/codex.md`, `references/cursor.md`, `references/t3.md`, or `references/cloud.md`. A harness without a page carries no writer or runner lane until § Bring up a harness is answered on a page of its own.
- Apply `.agents/orchestration.md` for routing, session reuse, consultation, independence, and acceptance.

## Scripts

Run from the checkout root. The script's opening comment owns its behavior.

- `scripts/cases.ts --report FILE.json [--passed NAME ...] [--failed NAME ...]` reads a Vitest `--reporter=json` report and requires every case a `--passed` name matches to have passed and every case a `--failed` name matches to have failed. A name matches a case's full name or its own title exactly; both flags repeat. A name that matches no case is missing, and a failed case no name matches is refused, as is a test file that failed with no failed case (it did not collect, or a hook threw) and a report whose `success` is false while nothing in it failed. It prints one summary line, each difference, and `ok` or `differences=N`. Exit 0 when the report matches, 3 when it does not, 2 when the report cannot be read as a Vitest report, 64 usage.

## Bound the host

The host budget counts every lane on the machine: this session's, each peer session's, and the Orchestrator's own commands.

- Set the lane bound in the plan before the first dispatch. Run one process-running lane at a time on the host: count as a process-running lane every lane that runs a test, a build, a browser, a capture, or a launcher, the Orchestrator's included; an owned-file format check, lint, or type check runs beside it. Report to the user before a launch that would start a second. Lanes that run no shell command run beside it.
- Count running lanes and owned test processes at each launch.
- Limit terminal launches: chain commands that do not gate each other into one launch (as a plan for `.agents/skills/orkestrel-dispatch/scripts/chain.ts`), write long output to a file and read it once, never poll with repeated short calls, never retry a run in a loop, and check once for owned leftovers before a launch.
- Find the cause of an interrupted run before relaunching it.
- While a lane that runs shell commands is live, count orphaned console and window processes. Brief a lane that needs no shell to run no command. Kill only a recorded process id, and clear orphans only when none of your lanes is live. Never kill another session's or lane's process; ask the user.
- While a timing or live-model measurement runs, start no other test, build, or model work on the host.

## Keep lanes visible

- Launch every lane through the channel where the user can see it and stop it; the harness page's Visibility row names that channel. Run a hidden direct CLI only as a capped command inside a visible lane.
- Report each lane's role, engine, and objective at launch, and its result or failure when it returns.

## Assign lanes

| Lane         | Responsibility                                           | Write boundary                                                        |
| ------------ | -------------------------------------------------------- | --------------------------------------------------------------------- |
| Orchestrator | Own the roster, scope, rulings, holds, and acceptance.   | Assigned coordination records and serial integration.                 |
| Runner       | Run requested tests, checks, and builds as the verifier. | Assigned evidence and declared command outputs; never source repairs. |
| Writer       | Implement its bounded unit under its assigned role.      | Owned files and regions.                                              |
| Reviewer     | Independently assess the subject the size gate names.    | None; return the verdict to the Orchestrator.                         |

- Keep active lanes within the harness limit and § Bound the host. Reserve capacity for the runner; queue work that does not fit.
- Assign every editable region to one writer. Name shared regions by their declarations or sections. Serialize units that rewrite the same region.
- Choose each lane's channel from its harness page; the page owns start, continuation, wake, and tracking.

## Prepare the round

1. Commit the accepted baseline before a writing dispatch.
2. Write `tmp/units/<round>/coord/roster.md`: each lane's roster fields per `.agents/orchestration.md` § Sessions and consultation, plus the baseline, owned regions, dependencies, acceptance commands, and exclusive resources. Create `coord/runs/` for journals, errors, and results.
3. Resume a suitable runner or launch one, and start it with its first request.
4. Resume or launch writers as capacity permits. Fill each roster row from the actual launch or continuation result, never from an earlier session's pattern, and send each lane the peer addresses it messages.
5. When a running lane joins the round, put the roster path, its ownership, and its next request number in the first request you send it.

## Exchange requests and results

- Number requests monotonically per lane across continuations and fixes. Preserve earlier requests and results.
- Send each request through the wake-capable channel in the request shape that closes this section. Name each hold in `holds:` and proceed on send; the named owners stop edits to the held inputs until the result arrives. Nobody acknowledges a request, a hold, or a withdrawn `FINAL`.
- The runner writes a result to `coord/runs/<lane>-<request>.md` after command exit and cleanup, then sends its path and request identity to the requester and the Orchestrator.
- Wait for the harness's completion or message notice; run no watcher agent and no file-poll loop. When the notice is missing and the result is needed, read that request's durable result or task status once, reconcile the request identity, and suspend an unresolved delivery rather than launching duplicate work.
- Escalate per `.agents/orchestration.md` § Deviation protocol. Continue independent work. Share cross-lane facts directly; only the Orchestrator changes scope or rules on acceptance.
- End the runner's turn after it sends a result, so queued requests reach it. Never hold the runner in a wait for requests.
- After compaction or a harness restart, reconcile the roster against the live session and process state. When continuation is unsupported or unavailable, dispatch a successor brief that carries the prior evidence and unresolved work.

Use this request shape:

```text
REQUEST <lane>-<request>
from: <lane> <address>
source: <commit and changed input identity>
inputs: <files or bounded population read by the commands>
holds: <affected owners and exclusive resources>
commands:
1. <exact command>
expect: <red or green, named cases, required artifact>
```

## Implement in phases

- At each applicable phase (types, failing proof, source, and documentation), request the corresponding checks from the runner.
- Read a shared region immediately before each small, syntactically complete patch. On a context mismatch, reread and reapply only the owned hunk.
- Keep read-only shell searches within § Bound the host. A writer runs the read-only checks its charter grants on its owned files (the format check, a non-fix lint, the scoped type check) as observations and sends every test, build, and tree-wide gate to the runner.
- Run no formatter. Apply the exact formatting hunk the Orchestrator supplies, then request a read-only format check.
- Before a temporary mutation, send the runner a request whose `holds:` names the conflicting commands and each affected writer, and mutate after the command then running returns its result. Restore the exact input, verify the restoration, and release the holds in the next request.
- When the unit's required checks pass, send `FINAL <lane>` with source identity and evidence, write the report, and end the turn. Preserve the session for suitable follow-up work.

## Run evidence commands

- Before a command, verify its input holds and exclusive resources. Hold all writers when the command reads the whole tree; otherwise hold every owner in its input closure. Do not infer that closure from the requesting writer's files alone.
- When a conflicting process occupies a declared resource, record its owner, process id, command, and a bounded wait based on the expected work. If it remains after that wait, suspend the request for an Orchestrator ruling. Never terminate another lane's or repository's process.
- Launch through `node .agents/skills/orkestrel-dispatch/scripts/launch.ts` with a cap grounded in prior runs, journal and error paths under `coord/runs/` carrying the request identity in each filename. Follow the `orkestrel-dispatch` skill's reference Long-running commands for ownership, process tracking, and cleanup.
- State in each long command's request which line is its terminal record; that line ends the wait.
- When the shell yields before the command exits, keep its output in the assigned file and resume its tracked session per the harness page until the terminal record arrives. Start nothing else meanwhile, and never replace the command with a second launch. Confirm owned descendants have exited before publishing completion. Escalate incomplete cleanup before releasing files or starting another command.
- Run the commands the accepted unit and the size gate require, narrowest first, and add no standing root, guide, or entry check beyond the request. Preserve receipts and rerun checks per `.agents/orchestration.md` § Pace.
- Stop on the first unexpected failure. Return the complete diagnostic and the owning file, and classify the failure as an assertion failure, an invocation error, a reporting failure, a cap, or an interruption. Preserve every receipt obtained before the stop. Check an `expect:` that names cases against the command's `--reporter=json` report with `scripts/cases.ts`.
- Record the command's input identity and expected outputs before launch. When an input changes during the run, report that result as invalid and retain each result whose input set stayed stable.
- After every writer's current `FINAL` and the integrated review, run the Orchestrator's closing acceptance request under a unique gate number. Write `coord/runs/closing-<gate>.md`, reply with that identity, and end the turn.

## Integrate and close

- Before ruling on an escalation, inspect its cited evidence. Bound the ruling to the changed claim and affected owners.
- When the format check reports only a filename, inspect the difference and send the writer the exact hunk.
- Run the size gate's independent review on a pinned subject; a unit review can overlap unrelated writing only while its whole subject stays unchanged. Use unit evidence for the integrated review, then run the closing acceptance gate in the order `.agents/orchestration.md` § Campaign fixes: Audit, then Verify.
- Before reopening a writer, tell the runner in the next request that the lane's `FINAL` is withdrawn. Keep every other valid `FINAL` result. Release the reopened writer only when no active gate reads its inputs.
- Name every affected writer in the closing request's `holds:` and hold your own source edits until the matching complete result arrives. After a fix, request only the checks invalidated by that fix plus any unmet acceptance requirement.
- Commit after the required gates and review pass. When shared hunks form one integration, commit the batch and identify its units and fixes.

## Share an execution lane between sessions

Apply this section when two sessions on one machine share the tests, checks, builds, and captures the host can run at once.

- One session runs process-running commands at a time. Ask the holder for the lane in one message; the holder hands it over in one message as soon as its running command exits. Silence is no handover.
- While another session holds the lane, edit your own files, read, and queue your commands.
- Hand the lane over by naming the last command's exit and that none of your processes still runs. Set no clock windows and send no per-command acknowledgments.
- Record contention from another session as a host limit, not a test failure. Rerun the interrupted unit alone after the window clears.
- When the user stops work, send the stop to every affected session. Withdraw queued work by its id and preserve finished evidence.
- When no message channel reaches a peer session, coordinate through one tracked record holding owned paths and a dated log. Read its latest entry before each unit, log each landing, and delete the record when the shared work closes.
- A session that finds another session's hand-off record without the user's go-ahead reads it for context only.

## Bring up a harness

Answer each question on the harness's page under `references/`, from measurement on the host, before the harness carries a writer or runner lane:

1. Start: how does a lane start, and which role, model, and options does it accept?
2. Continue: how does an idle lane resume with its context, and what makes a resume valid?
3. Wake versus deliver: which send wakes an idle lane, and which only delivers?
4. Track: which identities must be retained (task, session, thread, process), and which change between launches?
5. Background: how does a long command run, what is its cap, and what happens at the cap and when the shell yields early?
6. Isolation: does a lane share the checkout, and how does it get its own?
7. Tools: which tools does a lane hold (shell, file write, messaging), and which actions does the harness refuse?
8. Limits: what happens to running lanes at a usage limit and after an idle period?
9. Host effects: does a lane's shell open windows or leave processes behind, and where does each shell call start?
10. Capability map: which engine serves each capability of `.agents/orchestration.md` § Roles? Record the map where that section's bullets direct.
11. Visibility: which launch channel shows the lane to the user, and can the user stop it there?

`references/cloud.md` holds the answers for a cloud sandbox host. A page holds the answers in its § Mechanics table, one row per question, and the field lessons under § Quirks, one "When X, do Y" directive per lesson; a measurement keeps its date. `.agents/transports/<harness>.md` owns a harness's CLI as a bench, and `.agents/platforms/<platform>.md` owns the host shell.
