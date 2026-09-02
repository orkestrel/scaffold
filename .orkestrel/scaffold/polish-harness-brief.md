# Unit U5 polish-harness — make the journey run the portfolio source in `capture-harness.md`

## Role and engine

`implementer` on Opus 5, native Claude Code subagent. You are the sole writer in the `scaffold`
checkout at `C:\Users\mikes\WebstormProjects\scaffold`. Perform the assignment directly and spawn
nothing.

## Objective

Fold the polish-surface capture harness onto the journey run: where a Vitest browser project can
drive the surface, the journey suite's capture family is the portfolio source and its readers are
the accessibility snapshot and the logs; the spawned self-contained script survives only for a
surface no such project can drive. Add the statechart outcome to the portfolio table.

## Context

**Evidence.**

- `.agents/skills/orkestrel-polish-surface/references/capture-harness.md` (the file you rewrite)
  and `SKILL.md` § Judge the rendering (the portfolio it names as the review input).
- `.agents/skills/orkestrel-prove-journey/SKILL.md` and `references/captures.md`,
  `references/statechart.md`, `references/decide.md` as unit U4 left them in this checkout; read
  them so nothing here restates them.
- `.orkestrel/scaffold/design-reconciliation.md` (question 7, accepted) and
  `.orkestrel/scaffold/design-objective-report.md` § Tensions 6.
- The published readers: `describeTree` and `describeFocus` render the accessibility tree and the
  tab order; `createJournal` records steps and the page's own output; `createPortfolio` writes the
  captures (`C:\Users\mikes\WebstormProjects\test\guides\test.md` § Browser).

**Law.** `AGENTS.md` § Writing and § Instruction files; `.claude/rules/documentation.md`
§ Workflow skills; `.claude/rules/writing.md`. Skill: none. Guide: none.

**Host.** Windows 11, Git Bash. `node_modules` is installed here.

**Measurements.** `capture-harness.md` is the only reference the polish skill names.

**Control identifiers.** none.

**Standing conditions.** `.orkestrel/` and `host.json` are not yours. Nothing else writes this
checkout while you run.

## Unknowns

none.

## Scope

**Owned.** `.agents/skills/orkestrel-polish-surface/references/capture-harness.md`, and
`.agents/skills/orkestrel-polish-surface/SKILL.md` only where one sentence must point at the
journey run as the portfolio source.

**Shared (report-only).** `.agents/skills/orkestrel-prove-journey/**` (return a patch).

**Off-limits.** Everything else.

**What asserts the state this change ends.** `tests/policy.test.ts`. Run `npm run test:policy`.

**Tools and limits.** Read, Grep, Glob, Edit, Bash for `npm run format:check`,
`npm run test:policy`, `git diff`. No commits.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## What the file must say

- Open with the scope rule: the journey suite's capture family produces the portfolio for any
  surface a Vitest browser project can mount and drive; the spawned script in this file is for a
  surface none can — a served page, a foreign client, a process the runner cannot host.
- Keep the one-call lifecycle, seed validation, preflight, and triage sections for that spawned
  case; drop nothing that still binds it.
- Rewrite the portfolio table so each artifact names its source in the journey case: viewport and
  theme captures from the registry times the variants; the accessibility snapshot from the tree
  and focus readers; the interaction log and the console log from the journal; and a new
  statechart outcome row naming what the artifact must show (the harness's terminal status and
  its per-transition results).
- Keep preflight and triage as they are, applying to either source.

## Output

Return, as your final message, the report you also write to `tmp/units/polish-harness-report.md`:
the sections changed, the bare output of `npm run format:check` and `npm run test:policy`, and
every claim you could not close.

## Deviation contract

Stop and report when a sentence here would contradict a rule the journey skill now states, or when
`test:policy` fails outside your owned files. Decide, record, and carry on for row order and
heading names.

## Acceptance criteria

1. `npm run format:check` green.
2. `npm run test:policy` green.
3. The opening states the scope rule in the first paragraph, and the portfolio table carries the
   statechart outcome row with its source.

## Review evidence

Code change: return `git diff --stat` and `git status --porcelain` in the report.

## Voice (added 2026-09-02, the user's instruction)

Write every line as a directive for the agent that executes it: what to do, what to check, what to refuse. Match the voice and tone of `AGENTS.md` and `.claude/rules/*.md` throughout. Delete narration, persuasion, and rationale that changes no judgment. This is an acceptance criterion: a file that reads as prose for a person fails the unit.
