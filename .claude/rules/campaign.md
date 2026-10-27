---
paths:
  - '.orkestrel/**/*'
---

# Campaign folder rules

`.orkestrel/` is the tracked record of a live campaign: everything a session on another machine, under another harness, needs to resume the work. `.agents/orchestration.md` owns how agents run. This file owns what the folder holds, how to write it, and how a session starts from it.

## Layout

| Path                    | Holds                                                                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `.orkestrel/<package>/` | one package's live campaign                                                                                                              |
| `.orkestrel/plan.md`    | the fleet campaign's plan: goal, exit criterion, packages, layer order, and the units each package owes                                  |
| `.orkestrel/ledger.md`  | the fleet campaign's ledger                                                                                                              |
| `.orkestrel/release.md` | the live release wave: its layers, each package's bump ruling with its evidence, the round each package landed in, and standing readings |

A package directory holds:

| File                    | Holds                                                                                                                                                                       | When                                                      |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `plan.md`               | a concise goal and exit criterion that serve as a goal prompt, each repository the campaign changes by name and URL, § State, open decisions, deferred triggers, § Sequence | always                                                    |
| `ledger.md`             | one row per dispatched unit and per user ruling on routing or scope: date, unit, role, carrier                                                                              | always                                                    |
| `README.md`             | the file map, the read order, and the id law                                                                                                                                | when the folder holds more than `plan.md` and `ledger.md` |
| `tenets.md`             | the campaign's standing directives                                                                                                                                          | when the campaign has any                                 |
| `ideas.md`, `gaps.md`   | ideas set aside and library gaps, each numbered for life with its reason and its reopen trigger                                                                             | when the campaign records any                             |
| `designs/`, `research/` | one design or research record per subject                                                                                                                                   | when a chunk needs one                                    |
| a verdict file          | the verdict of an open seam                                                                                                                                                 | until the seam closes                                     |

- Write a file about one package under that package's directory, and a file about two or more packages at the top level.
- Name a ledger row's lane by its role in `.agents/orchestration.md` § Roles. Write no row for the Orchestrator's own commit.

## Content

- Track every file under `.orkestrel/`. Cite a tracked file, a commit, or a published URL. Cite no git-ignored path, no agent memory, and no path outside the repository; name a sibling repository by its package name and a path inside it.
- Name no harness, model, provider, harness tool, operating system, shell, or machine as the host or engine of the work. Name a lane by its role. A product statement about a host family follows `.claude/rules/portability.md` § Claims.
- Write every line as a directive, a fact, or a table cell, per `.claude/rules/writing.md` § Instruction files: absolute dates, one home per fact, a tree location by symbol and file. A decision or a measurement lives in the commit that made it; cite the commit.
- Keep live state out: engine availability, session ownership, process ids, installed versions, and another repository's state live in the roster, `package.json`, and that repository.
- Keep unit briefs, reports, journals, and drafts under the checkout's `tmp/` (`.agents/orchestration.md` § tmp layout); that file's § Cleanup owns what a unit's files carry before they go.
- Record a prepared, unapplied change as text in `plan.md` or as a commit, never as a pointer to scratch.

## Start a session

1. Read the package folder's `README.md` when present, then `plan.md` § State, then the first open chunk of § Sequence.
2. Run `git status --porcelain -b`, `git log @{upstream}..`, and `node .agents/skills/orkestrel-dispatch/scripts/sweep.ts --report`. Reconcile each difference with § State before you act.
3. Act only on what the folder, the tree, and git hold. Agent memory from another machine or harness is absent.

## Hand off and close

- Keep `plan.md` § State current at every commit, and make its last line the next action.
- Before a session ends or its context compacts, write each ruling, decision, and next action into the folder; `.agents/orchestration.md` § Memory owns what memory can hold.
- When a chunk closes, remove it from § Sequence. Its closing commit carries its evidence, and § State names the commit.
- Delete a verdict file when its seam closes.
- At acceptance, move each file that outlives the campaign to its root home, retarget its citations in the same change, and delete the package directory per `.agents/skills/orkestrel-debrief/references/retention.md`. Delete a top-level file when the wave or fleet campaign it records closes.
