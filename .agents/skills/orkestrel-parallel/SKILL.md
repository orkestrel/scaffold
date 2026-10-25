---
name: orkestrel-parallel
description: >-
  Coordinate independently owned writer lanes in one checkout through messages, with one runner for checks and an Orchestrator for decisions. Use when implementation units can progress in parallel with disjoint files or explicit regions of shared files. Serialize overlapping edits and hold every input needed for a reliable measurement. Require shared files and a channel that can wake an idle lane.
---

# Parallel lanes

## Assign lanes

| Lane         | Responsibility                                                   | Write boundary                                                        |
| ------------ | ---------------------------------------------------------------- | --------------------------------------------------------------------- |
| Orchestrator | Own the protocol, roster, scope, rulings, holds, and acceptance. | Assigned coordination records and serial integration.                 |
| Runner       | Run requested tests, checks, and builds as the verifier.         | Assigned evidence and declared command outputs; never source repairs. |
| Writer       | Implement its bounded unit under its assigned role.              | Owned files and regions, plus its own log.                            |
| Reviewer     | Independently assess the subject the size gate names.            | None; return the verdict to the Orchestrator.                         |

- Apply `.agents/orchestration.md` for routing, session reuse, consultation, independence, and acceptance.
- Keep active lanes within the harness limit and the campaign's resource limits. Reserve capacity for the runner; queue work that does not fit.
- Assign every editable region to one writer. Name shared regions by their declarations or sections. Serialize units that rewrite the same region.
- Read `references/harnesses.md` before choosing the transport; it owns the wake, continuation, and tracking mechanics.

## Prepare the round

1. Commit the accepted baseline before a writing dispatch.
2. Write `tmp/units/<round>/coord/protocol.md`: the skill path, baseline, lanes, owned regions, dependencies, acceptance commands, and exclusive resources. Mark each command whose input set must be held while it runs.
3. Write `coord/roster.md` with each lane's roster fields per `.agents/orchestration.md` § Sessions and consultation. Create `coord/results/` and `coord/runs/`.
4. Resume a suitable runner or launch one. Require its ready acknowledgment, then let its idle turn end.
5. Resume or launch writers as capacity permits. Fill each roster row from the actual launch or continuation result and send each lane the peer addresses it messages.
6. When adopting a running lane, send the protocol, ownership, log path, and next request number. Require acknowledgment before coordinated work begins.

## Exchange requests and results

- Append only to your own `coord/<lane>.md` log: `<lane> | <request or phase> | <kind> | <text>`. Reviewers write no log.
- Number requests monotonically per lane across continuations and fixes. Preserve earlier requests and results.
- Send each request through the wake-capable channel in the request shape that closes this section.
- The runner publishes a result by writing it under a temporary name and renaming it to `coord/results/<lane>-<request>.md` after command exit and cleanup, then sends its path and request identity to the requester and the Orchestrator.
- Wait for the harness's completion or message notice. When the notice is missing and the result is needed, read that request's durable result or task status once, reconcile the request identity, and suspend an unresolved delivery rather than launching duplicate work.
- Escalate per `.agents/orchestration.md` § Deviation protocol. Continue independent work. Share cross-lane facts directly; only the Orchestrator changes scope or rules on acceptance.
- End an idle runner turn after acknowledging readiness or publishing a result. Do not occupy the runner with a wait for requests queued behind that turn.

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

- Log the applicable phases: types, failing proof, source, and documentation. Request the corresponding checks from the runner.
- Read a shared region immediately before each small, syntactically complete patch. On a context mismatch, reread and reapply only the owned hunk.
- Keep read-only shell searches within the campaign's terminal limits. Send every test, check, lint, format, and build request to the runner.
- Run no formatter. Apply the exact formatting hunk the Orchestrator supplies, then request a read-only format check.
- Before a temporary mutation, obtain the runner's hold on conflicting commands and each affected writer's hold on edits. Mutate only after their acknowledgments. Restore the exact input, verify the restoration, and release the holds through the runner.
- When the unit's required checks pass, send `FINAL <lane>` with source identity and evidence, write the report, and end the turn. Preserve the session for suitable follow-up work.

## Run evidence commands

- Before a command, verify its input holds and exclusive resources. Hold all writers when the command reads the whole tree; otherwise hold every owner in its input closure. Do not infer that closure from the requesting writer's files alone.
- When a conflicting process occupies a declared resource, record its owner, process id, command, and a bounded wait based on the expected work. If it remains after that wait, suspend the request for an Orchestrator ruling. Never terminate another lane's or repository's process.
- Launch through `node .agents/skills/orkestrel-dispatch/scripts/launch.ts` with a cap grounded in prior runs, separate journal and error paths under `coord/runs/`, and the request identity in each filename. Follow the launch reference named by `.agents/skills/orkestrel-dispatch/SKILL.md` for process tracking and cleanup.
- When the shell yields before the command exits, resume its tracked session per `references/harnesses.md`. Read the terminal record and confirm owned descendants have exited before publishing completion. Escalate incomplete cleanup before releasing files or starting another command.
- Run the commands the accepted unit and the size gate require, narrowest first, and add no standing root, guide, or entry check beyond the request. Preserve receipts and rerun checks per `.agents/orchestration.md` § Parallelism.
- Stop on the first unexpected failure. Return the complete diagnostic and the owning file, and classify the failure as an assertion failure, an invocation error, a reporting failure, a cap, or an interruption. Preserve every receipt obtained before the stop.
- Record the command's input identity and expected outputs before launch. When an input changes during the run, report that result as invalid and retain each result whose input set stayed stable.
- After every writer's current `FINAL`, the integrated review, and the acknowledged write holds, run the Orchestrator's closing acceptance request under a unique gate number. Publish `coord/results/closing-<gate>.md`, reply with that identity, and end the turn.

## Integrate and close

- Before ruling on an escalation, inspect its cited evidence. Bound the ruling to the changed claim and affected owners.
- When the format check reports only a filename, inspect the difference and send the writer the exact hunk.
- Run the size gate's independent review on a pinned subject; a unit review can overlap unrelated writing only while its whole subject stays unchanged. Use unit evidence for the integrated review, then run the closing acceptance gate in the order `.agents/orchestration.md` § Campaign fixes: Audit, then Verify.
- Before reopening a writer, invalidate that lane's `FINAL` with the runner and require acknowledgment. Keep every other valid `FINAL` result. Release the reopened writer only when no active gate reads its inputs.
- Before a closing request, obtain affected write-hold acknowledgments and hold your own source edits. Keep them until the matching complete result arrives. After a fix, request only the checks invalidated by that fix plus any unmet acceptance requirement.
- Commit after the required gates and review pass. When shared hunks form one integration, commit the batch and identify its units and fixes.
