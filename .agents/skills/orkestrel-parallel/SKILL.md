---
name: orkestrel-parallel
description: >-
  Run several writer lanes in one checkout at the same time, coordinated by messages: writers edit owned regions in phases, one runner lane owns every test and check process, and the Orchestrator rules and mediates. Use when a campaign has three or more units whose files are mostly disjoint and whose shared files are a few kind files, guides, or entry tests. Do not use it when two units rewrite the same region, when a unit needs a quiet tree for a measurement, or when the harness gives lanes no shared file system or no message channel that wakes an idle lane.
---

# Parallel lanes

## Lanes

| Lane               | Role                                                                                               | Owns                                                                                                                  | Never                                                |
| ------------------ | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Orchestrator       | the harness's own engine                                                                           | the protocol, the roster, launches, rulings, holds, acceptance, commits                                               | delegates acceptance                                 |
| `runner`           | `verifier` on the native small engine                                                              | every test, typecheck, lint, format, build, and citation process; its log, run files, and result files under `coord/` | writes outside `coord/`; runs an unrequested command |
| writer (`w<unit>`) | `builder`, `astra`, or `opus` by `.agents/orchestration.md` § Routing                              | its owned files, its owned regions of shared files, and its log                                                       | runs a test, check, lint, format, or build process   |
| reviewer           | `analyst` or `reviewer`, independent of the lane's writer per `.agents/orchestration.md` § Engines | a read-only verdict on the work the size gate sends it                                                                | edits, writes, runs, or messages                     |

- Run at most three writers and one runner. Keep every live lane, reviewers included, inside the harness's concurrency limit (`references/harnesses.md`), and queue a lane that does not fit.
- Before launch, assign every file region to exactly one writer. A shared file is owned by region (a doc block, a table, a guide section, a list entry), never as a whole.

## Set up

1. Commit the accepted state; every lane starts from one commit.
2. Write `tmp/units/<round>/coord/protocol.md`: the path of this skill, the round's lanes, each writer's owned files and regions, and each writer's acceptance commands. Write `coord/roster.md` (lane, role, address, Orchestrator address). Create `coord/results/` and `coord/runs/`.
3. Launch the runner first. Its first turn logs `ready` with its address and ends.
4. Launch the writers one at a time. Fill each roster row from its launch result; after launch, send each lane that messages peers their addresses.
5. For a lane already running, send one in-flight message naming the protocol, its lane name, its log, and its next request number.

## Channels

- File channel: each writer and the runner append only to their own log, `coord/<lane>.md`, one line per event: `<lane> | <request or phase> | <kind> | <text>`. Never write another lane's log. A reviewer returns its verdict to the Orchestrator and writes nothing.
- Push channel (`references/harnesses.md`): requests queue to the runner one turn each, in arrival order; replies and rulings join the receiver's running turn or start one.
- Number requests from 1 per lane across the whole round, fix units included, and never reuse a number.
- Results: the runner writes each result under a temporary name in `coord/results/`, renames it to `coord/results/<lane>-<n>.md` when it is complete, then replies. A waiting writer polls for that file; a lost message does not stall it.
- Request format:

```
REQUEST <lane>-<n>
from: <lane> <address>
commands:
1. <exact command>
expect: <red or green per command, with case names>
```

- Escalation: send the Orchestrator `ESCALATE <lane>: expected, found, evidence, proposed action`. Continue the work the question does not block. The ruling arrives in your turn; record any scope extension in your report.
- A writer can message another writer a cross-lane fact (a line it added, a window it opens). Rulings come only from the Orchestrator.

## Writers

- Work in phases and log each: `types` (types and API docs), `red` (failing-first cases, then a red-run request), `source` (the change, then a green-run request), `docs` (guide sentences).
- In a shared file, edit small, complete hunks inside your owned regions. Re-read the region immediately before each patch, never rewrite a whole file, and leave every hunk syntactically complete. When a patch fails on changed context, re-read and re-apply.
- Request every test, check, lint, format, and build process from the runner. Read-only shell and search commands stay yours.
- Run no formatter. Fix a format finding by hand; when the finding names only a file, ask the Orchestrator for the exact hunk.
- Before a temporary mutation (a mutation proof), ask the runner to hold unrelated runs and each lane that owns a region of the mutated file to hold its edits, and mutate only after each has logged `held`. Restore the exact text, confirm with `git diff`, log `restored`, and tell them.
- When done and green, log `done`, send the runner `FINAL <lane>`, write your report, and end your task.

## Runner

- Before each command, wait until no test or typecheck process runs in this checkout, excluding editor language services. Bound the wait by the request's expected run time. When any conflicting process exceeds that budget, report its recorded ownership, process id, and command line to the Orchestrator and suspend the request for a ruling. Never kill a process yourself. For a capped run, have the Orchestrator apply the `orkestrel-dispatch` skill's launch reference § Kill and relaunch before releasing the affected files or starting another command.
- Launch each command through `node .agents/skills/orkestrel-dispatch/scripts/launch.ts` under a cap sized from prior runs, with `--journal coord/runs/<lane>-<n>-<k>.txt` and `--errors coord/runs/<lane>-<n>-<k>.err`, and log the process id it prints. When the shell returns before the launcher ends, resume its tracked shell session until the launcher exits, then read both files and require the terminal exit record. Track descendant process ids while their parent lives, and confirm that the command and its descendants have ended before publishing completion; otherwise escalate under the preceding wait rule.
- Report each finding only to the lane that owns its file.
- Serve the commands each writer's acceptance criteria name, plus the standing list: the root typecheck, the scoped typecheck, the guide parity check, the package entry test, and lint or format checks over paths the writer names. Run each read-only; none writes the tree.
- After every writer's current `FINAL` has arrived, wait for the Orchestrator's closing request naming a unique gate number and confirming acknowledged write holds. Run the root typecheck, scoped typecheck, every acceptance test file alone, the guide parity check, and lint and format checks over every path `git status --porcelain` lists. Publish the complete result atomically as `coord/results/closing-<k>.md`, reply with that gate number, and end your task.

## Orchestrator

- Before ruling on an escalation, reproduce its evidence at its cited lines. Bound every ruling: what to change, what to leave.
- When a format check names only a file, inspect the file and send the writer the exact formatting hunk. After the writer applies it, request a read-only format check from the runner.
- Run the review `.agents/orchestration.md` § Size gate names, and supply its diff and status. A unit's review can start read-only when its lane logs `done`, while the others write; a campaign's `orkestrel-falsify` round runs on the integrated result after the closing gate.
- Before resuming a writer for a fix unit, send the runner that lane's `FINAL` invalidation and wait for acknowledgment; every other lane's `FINAL` stands. Follow `references/harnesses.md` to resume the writer's lane or dispatch its successor. If a closing gate is active, keep the reopened writer read-only until that gate completes.
- Before requesting a closing gate, obtain write-hold acknowledgments from every live writer and hold your own source edits. Allocate a gate number never used earlier in the round. Keep those holds until the matching complete result is published. After a fix unit, request another gate covering the affected checks and acceptance tests.
- After the last green gate and the review the size gate names, commit. When shared files mix several units' hunks, commit the batch once and name each unit, its engine, and each fix unit in the message.
