# Unit U3 form-crosswalk — map every `FieldControl` to its catalog category in the form guide

## Role and engine

`implementer` on Opus 5, native Claude Code subagent. You are the sole writer in the `form`
checkout at `C:\Users\mikes\WebstormProjects\form`. Perform the assignment directly and spawn
nothing.

## Objective

Add to `guides/form.md` one crosswalk that maps each `FieldControl` member, and each rule or switch
that changes what a renderer draws, to the input category the portable `enterprise-bootstrap`
catalog uses, so a model rendering an Orkestrel form opens the guide, finds the category, and
opens the catalog row — with no affordance markup copied into the guide.

## Context

**Evidence.**

- `src/core/types.ts`: `FieldControl = text | editor | password | number | date | time | datetime |
  color | confirm | select | checkbox | file`; `SelectField.open`; `FieldRule` (`minimum`,
  `maximum`, `step`, `email`, `url`, `pattern`, …); `FieldBase.hidden`, `locked`, `disabled`.
- `guides/form.md` § Controls (about lines 200–428) states each control; § The three visibility
  switches (about 904–946) states the renderer obligation per switch; § Concept inventory (about
  1605–1648) parks "Presentation hints", "Input masks", "Accessibility IDs", "First-error focus",
  and "Browser binding" on the renderer or a future `src/browser`. Read those sections first.
- The catalog's categories, fixed by the campaign and to be used verbatim: one line of text; text
  over many lines; a secret; a number; a number in a bounded range; a date; a time; a date and
  time; a color; one on/off answer; one of a few; one of many; one of many with an unlisted value
  admitted; any of a few; any of many; a value picked from a searched list; files; an ordered set
  of tags; a rating; a step in a sequence.
- The catalog lives at `scaffold/.agents/skills/enterprise-bootstrap/references/inputs.md` in
  every scaffold target after the release; reference it by that path and by the skill's name, and
  say the category names are the join key.

**Law.** `AGENTS.md` § Writing; `.claude/rules/documentation.md` (parity, guide examples);
`.claude/rules/writing.md`. Skill: none. Guide: `guides/form.md` is the file you extend.

**Host.** Windows 11, Git Bash. `npm ci` has been run here; confirm `node_modules` exists before
your first gate.

**Measurements.** `tests/guides.test.ts` proves every documented name resolves and every export is
documented; the crosswalk adds no export, so it must add no backticked name that is not already a
public export or a `FieldControl` literal.

**Control identifiers.** none.

**Standing conditions.** The tree is clean at `7779e6b`. Nothing else writes this checkout.

## Unknowns

- Which section the crosswalk sits under. Ruling: a new `### Rendering` subsection at the end of
  § Controls, before § Rules; report if the guide's own structure argues for another place.

## Scope

**Owned.** `guides/form.md`.

**Shared (report-only).** none.

**Off-limits.** `src/**`, `tests/**`, `README.md`, every other file.

**What asserts the state this change ends.** `tests/guides.test.ts`. Run `npm run test:guides`.

**Tools and limits.** Read, Grep, Glob, Edit, Bash for `npm run format:check` and
`npm run test:guides`. No commits.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## What the crosswalk must say

One table, one row per `FieldControl` member, with these columns: the control; the category
(verbatim from the list); what moves it to a neighbouring category (`number` with `minimum`,
`maximum`, and `step` all set is a number in a bounded range; `select` with `open` is one of
many with an unlisted value admitted; `select` and `checkbox` split into "a few" and "many" by the
list size the renderer sees); and what the renderer owes beyond the category (the label, the help,
the error message keyed by `rule`, and the `touched` withholding). A second short list names the
categories the document does not model — a value picked from a searched list, an ordered set of
tags, a rating, a step in a sequence — and states which control each is drawn over (`select`,
`checkbox`, `number`) or that it is outside the document, so a renderer never invents a control.

State the switch obligations by pointing at § The three visibility switches rather than repeating
them. Add one sentence to the "Presentation hints" row of the concept inventory citing the
crosswalk.

## Output

Return, as your final message, the report you also write to `tmp/units/form-crosswalk-report.md`
in this checkout (create `tmp/`): the section added with its heading and line range, the bare
output of `npm run format:check` and `npm run test:guides`, and every claim you could not close.

## Deviation contract

Stop and report when a row would need a name the barrel does not export, or when `test:guides`
fails outside your owned file. Decide, record, and carry on for the subsection title and row
order.

## Acceptance criteria

1. `npm run format:check` green.
2. `npm run test:guides` green.
3. Every `FieldControl` member has a row naming a category from the fixed list, verbatim.
4. No HTML markup and no Bootstrap class name appears in the added text.

## Review evidence

Code change: return `git diff --stat` and `git status --porcelain` in the report.

## Voice (added 2026-09-02, the user's instruction)

Write every line as a directive for the agent that executes it: what to do, what to check, what to refuse. Match the voice and tone of `AGENTS.md` and `.claude/rules/*.md` throughout. Delete narration, persuasion, and rationale that changes no judgment. This is an acceptance criterion: a file that reads as prose for a person fails the unit.
