# Design brief — B-FORMS-CLOSE (the forms family's closing unit)

## Role and engine

Two lanes on one brief, blind to each other: `planner` on Opus 5.5 (native subagent, clean context,
read-only) holds the **subjective** lane (shape, naming, the feel of the proofs and the guide a
reader meets); `analyst` on GPT-6 Astra (`codex exec --sandbox read-only` rooted at
`/home/user/veneer`) holds the **objective** lane (correctness, constraints, what the code and the
gates permit). Each lane performs the design directly, spawns nothing, edits nothing, and returns a
proposal; the Orchestrator reconciles the two into the plan.

## Objective

A unit plan for B-FORMS-CLOSE: the units that close every `B-FORMS-CLOSE` row of `ROADMAP.md`
§ Carriers at Veneer `53628aa`, each with its owned files, its order, its acceptance criteria, the
mutation each proof must distinguish, and its risks, and the rulings the Orchestrator must take
before dispatch.

## Context

**Terrain.** `/home/user/scaffold/.orkestrel/veneer/units/b-forms-close-terrain-report.md` (the
Cursor Grok distillate over the eight obligations, with `file:line` pointers at `53628aa`). It
wins over any restatement here; stop and report where the tree disagrees with it.

**Obligations.** The rows of `/home/user/veneer/ROADMAP.md` § Carriers whose carrier cell names
`B-FORMS-CLOSE` (grep `B-FORMS-CLOSE` there): the validation tooltip specimens (D6, D31), the
`INPUT_GROUP_ROUNDING` retirement and the stale input-group prose (D31; the round-6 row names the
outer-column comment and the fixture's doc block and proof comment), the cascade-key prose, the
validated color control's width, the `FORM_RANGE_CASES` per-property `reads` map, the
literal-declaration reading (the terrain reads that the additions reader already reports an extra
property on a recorded shipped selector as a `declaration` addition), and the forms controls' focus
indicator under forced colours (D37).

**Decisions.** `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`: D6, D20, D31,
D33, D34, D37, D39a, D40, D40a. `/home/user/scaffold/.orkestrel/veneer/b-forms-design-verdict.md`
(the family design). `/home/user/scaffold/.orkestrel/veneer/units/b-passive-family.md` and
`b-passive-baseline.md` (the family records every B unit binds).

**Tree.** `/home/user/veneer` at `53628aa` (Veneer `main`; the B-FORMS-RENAME landing `569076a`
is on the session branch ahead of it and renames the D40 mixins to `input-text` and
`input-border`; treat those names as current). The guide is `guides/veneer.md`.

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,names,documentation,writing}.md`.
The dispatch anatomy in `/home/user/scaffold/.agents/orchestration.md` § Dispatch anatomy.

**Host facts for the units.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(the manifest's `devEngines` pin refuses npm 10); Chromium installed; a `CAPTURE=1` journey run of
one variant takes about two minutes; the installed `driveTraversal` walk stops at the first element
it reaches twice, so a focus walk that crosses the `Form control date` specimen starts from a
preceding control (the range, select, and input-group cases show the pattern).

## Unknowns

- Whether the tooltip specimens need a wrapper with explicit overflow room or a resting element
  frame over the group itself with the tooltip inside the frame: rule from the cascade's
  `position: absolute; top: 100%` and the frame form `FRAMES.place(scenario, subject, frame)`.
- Whether the validated color control's width reads `--vn-space-24` (the resting control's token)
  or keeps the release's literal: rule on the binding and name what the ledger cells and the
  pixel expectations become.
- Whether the forms `:focus` rules adopt the `focus-ring` mixin whole or only its forced-colours
  branch, and what each proof stages (`stageMedia({ forced: true })`) and reads.
- Whether the literal-declaration reading is a proof (a case that plants a literal and asserts
  the additions gate reports it) or a recorded observation; the terrain reads the gate already
  reports it, so rule what the row's "adds the reading where none does" now requires.

## Scope

Read-only. Read the terrain, the rows, the decisions, the family records, the guide, and the tree.
Edit nothing. Propose; do not decide for the Orchestrator.

## Execution

**A native subagent (planner):** perform the design directly and spawn nothing. **The bench engine
(analyst) reading this inside its own CLI:** perform the design directly and spawn nothing.

## Output

Return one proposal with these sections: `Units` (each with a name, role and engine route, owned
files, shared report-only files, off-limits files, order and dependencies, acceptance criteria
ordered cheap-first, the mutation each proof distinguishes, and the risks); `Rulings needed`
(each unknown, with the option, its cost, and a recommendation); `Files the result makes false`
(per unit, derived from the terrain's distillate); `Exit criterion` (the enumerated capabilities
whose closure ends B-FORMS-CLOSE); and, for the analyst, `Journal` (the journal path and session
id). No process diary.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. A lane that finds the
terrain and the tree disagreeing reports the disagreement and rules on the tree.

## Acceptance criteria

The proposal names every `B-FORMS-CLOSE` row's closure, every unit's owned files are disjoint from
every other unit's, and every proof named carries the mutation it distinguishes.
