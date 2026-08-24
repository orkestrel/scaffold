# Unit R5 report — the brief template

`.agents/templates/brief.md` exists and is complete. No deviation. The policy sweep does not reach
the path, so it needs no policy edit and no host-inventory change.

## Touched files

- `/home/user/scaffold/.agents/templates/brief.md` — new file in a new directory: the dispatch-brief
  form carrying every required section, the named scope rows, and the imperative reminder that fills
  each row.

Diffstat: one untracked file, 155 lines added, nothing else in the tree touched.

```text
$ git status --short .agents/templates/
?? .agents/templates/
```

## Section list

The template's sections, in the order `.agents/orchestration.md` § "Required sections" fixes: Role
and engine, Objective, Context, Unknowns, Scope, Execution, Output, Deviation contract, Acceptance
criteria, Review evidence.

Named rows inside those sections, each with a placeholder the writer replaces and an imperative
reminder of the check that fills it:

| Section             | Named rows                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Context             | Evidence, Law, Host, Measurements, Control identifiers, Standing conditions                                             |
| Scope               | Owned, Shared (report-only), Off-limits, What asserts the state this change ends, Tools and limits                       |
| Execution           | The native-subagent-or-bench-engine line and the bridge-driver line, one of which the writer deletes                    |
| Acceptance criteria | An ordered criteria list opening with the regeneration or cheapest gate, plus Observations, not criteria                |

A preamble fixes the fill discipline: copy the file, retitle the copy `# Unit UNIT_ID —
SHORT_SUBJECT`, replace every `UPPER_SNAKE_CASE` placeholder, delete each italic reminder as its row
is filled, and move a row you cannot fill to § Unknowns rather than leaving it blank. The preamble
points at § "Check the brief before you send it" for the run-after check and at § "Every dispatch is
a file before it is a launch" for the saved names, and restates neither.

## Where each preflight check landed

Each bullet of the post-shrink § "Check the brief before you send it" checklist, and the row whose
reminder carries it:

| Checklist bullet                                             | Row that carries it                                     |
| ------------------------------------------------------------ | ------------------------------------------------------- |
| Name the executor and write the transport for that reader    | Role and engine; the paired lines under Execution       |
| Paste command and output; name each search's scope           | Context → Evidence                                      |
| Take every measurement under the unit's conditions           | Context → Measurements                                  |
| Ask what the change does to every fact you measured          | Acceptance criteria reminder                            |
| Scope by the files the result makes false                    | Scope → What asserts the state this change ends         |
| Derive that set by running the suite; name the search's bound | Scope → What asserts the state this change ends         |
| Grant a behaviour with its tests, a constant with its fixtures, a template with its materialized copy | Scope → Owned    |
| Read each criterion against the off-limits list              | Scope → Off-limits                                      |
| Scope a mechanism change to own its prose; name the carrier  | Scope → Owned; the carrier clause in the false-set row  |
| Give a small unrelated obligation its own unit               | Objective                                               |
| Name the property the unit must change, and stop             | Acceptance criteria reminder                            |
| Order the criteria cheap-first, regeneration ahead of a gate reading the generated artifact | Acceptance criteria reminder |
| Never make a timing or whole-suite gate a criterion          | Acceptance criteria → Observations, not criteria        |
| Check the output mechanism against the executor's allowlist  | Scope → Tools and limits                                |
| Keep the brief's control identifiers inside the brief        | Context → Control identifiers                           |

Two further contract requirements land as rows the checklist does not name separately: § "Required
sections" puts standing conditions inside Context, so the template carries them as a named Context
row rather than as a section of its own; and the Review evidence reminder reproduces the rows of
`orkestrel-falsify` § "Evidence, by subject type" with the instruction that a subject occupying more
than one row takes the evidence of every row.

## Policy-sweep finding (the brief's Unknowns item)

The sweep does not reach `.agents/templates/`, so the directory is admitted with no policy edit and
no deviation.

- `tests/setupPolicy.ts` scopes its `.agents` inspection to one root:
  `export const SKILL_FAMILY_ROOT = '.agents/skills'` at line 104. Every other `.agents` string in
  that module is a `.agents/skills/sample/…` fixture path. Pattern `\.agents`, path
  `/home/user/scaffold/tests/setupPolicy.ts`.
- `tests/policy.test.ts` names no `.agents` path. Pattern `\.agents`, path
  `/home/user/scaffold/tests/policy.test.ts`, no match.
- `tests/config.test.ts` and `tests/guides.test.ts` name no `.agents` path either. Pattern
  `\.agents`, paths `/home/user/scaffold/tests/*.ts` and `/home/user/scaffold/configs/*.ts`; the
  matching files are `tests/setupPolicy.ts`, `tests/setupServer.ts`, and
  `tests/distribution.test.ts`.
- The path is not ignored: `git check-ignore -v .agents/templates/brief.md` exits 1 with no output.

## Observation: the template is not vendored

`HOST_PATHS` in `/home/user/scaffold/src/core/constants.ts` (lines 124-157) names
`.agents/orchestration.md` and `.agents/skills`, and no other `.agents` entry, so
`.agents/templates/brief.md` sits outside the vendored host surface. The expanded declared inventory
in `tests/distribution.test.ts` (from line 163) therefore stays true and needs no edit, and `host.json`
needs no regeneration on account of this unit.

That is an observation, not a criterion this unit closes. If the fleet must receive the template
through `repair`, `HOST_PATHS` and the `tests/distribution.test.ts` expansion move together, and both
files sit outside this unit's owned scope. The Orchestrator decides whether that successor unit
exists.

## Pointer check

`.agents/orchestration.md` line 512 reads: "Fill `.agents/templates/brief.md`, which carries the
named scope rows and the worked reason behind each check." The path R1 landed matches the path this
unit created, so the deviation contract's pointer condition did not fire.

## Validation, run 2026-08-24

Read-only and scoped to the owned file. No mutating gate, no tree-wide run, no git state change.

```text
$ npx oxfmt --config .oxfmtrc.json --check .agents/templates/brief.md
Checking formatting...
All matched files use the correct format.
Finished in 188ms on 1 files using 4 threads.
exit: 0
```

Vocabulary sweep over `/home/user/scaffold/.agents/templates/brief.md`, word-boundary pattern
`\bshould\b|\bvia\b|\bensure[sd]?\b|\bonce\b|\bsince\b|\bnew\b|\blatest\b|\bjust\b|\bsimply\b|\bTODO\b`,
case-insensitive: no match (exit 1). The earlier unbounded pass reported a `via` hit that is the
substring inside "Deviation contract", ruled permitted.

Negative-contraction sweep, patterns `n't` and `n’t`, same path: no match (exit 1), as an instruction
file requires.

Count sweep, same path. Numerals appear only as the ordered-list markers of the acceptance-criteria
form, where cheap-first ordering makes rank load-bearing. Number words appear as `one outcome` (the
contract's own limit on an objective), `at most one short hypothesis` (the contract's own deviation
wording), `more than one row` (the contract's own Review evidence threshold), and the pronoun `one`
in `each one`. No hit tallies a set a reader can add to.

Template TODOs: pattern `TODO|TBD|FIXME`, same path, no match.

`test:config` was not run, per the brief's standing condition.

This report file is outside the format gate. `.gitignore` line 11 lists `tmp`, and
`npx oxfmt --config .oxfmtrc.json --check tmp/units/` answers "All matched files may have been
excluded by ignore rules", so a tree-wide `format:check` never reads it. An explicit path argument
overrides that exclusion, which is why checking the file by name reports issues that the gate does
not see.

## Ancillary decisions this unit settled

- Standing conditions sit as a named Context row rather than as their own section, because §
  "Required sections" places them in Context. The row is still one the writer cannot leave blank.
- The reminders are directives with a subordinate reason only where the reason changes a judgment
  call — the cheap-first hazard, the read-only lane's missing tools, the missing journal on a bench
  result. `AGENTS.md` § Instruction files bans the persuading clause, so the pre-shrink text's
  rationale prose did not come across; its worked cases did.
- Reminders are italic so a filled brief reads as prose after they are deleted, and the preamble
  makes deleting them a fill step.
