# Unit U2b bootstrap-voice — successor to U2: every line of `enterprise-bootstrap` reads as a directive

## Role and engine

`implementer` on Opus 5, native Claude Code subagent. You are the sole writer in the `scaffold`
checkout at `C:\Users\mikes\WebstormProjects\scaffold`. Perform the assignment directly and spawn
nothing.

## Objective

Rewrite the three files unit U2 produced so that every line is a directive for the agent that
executes it — what to do, what to check, what to refuse — in the voice and tone of `AGENTS.md` and
`.claude/rules/*.md`, losing no rule, no markup fence, no control, and no coverage statement.

## What changed since U2 (the successor record)

The user ruled on 2026-09-02, after U2 returned: skills must be "instructions, not prose, optimized
for LLMs, not for humans … clear, concise, direct, efficient and effective, matching the voice and
tone throughout." U2 was briefed on `AGENTS.md` § Instruction files but not on that emphasis, and
its files carry narrating openers ("These instruments settle what a capture cannot. Each one states
…", "This file owns which affordance carries them", "One exception stands, and a measurement rather
than a judgment opens it"). U2's report, gates, and files are retained in `.orkestrel/scaffold/`;
this unit amends them and supersedes nothing else.

## Context

**Evidence.** `git show HEAD --stat` names the files; read `AGENTS.md` § Writing and § Instruction
files, then `.claude/rules/quality.md` and `.claude/rules/tests.md` as the voice to match, then the
three files:

- `.agents/skills/enterprise-bootstrap/SKILL.md` (252 lines)
- `.agents/skills/enterprise-bootstrap/references/inputs.md` (501 lines)
- `.agents/skills/enterprise-bootstrap/references/inspection.md` (152 lines)

**Law.** `AGENTS.md` § Writing and § Instruction files; `.claude/rules/writing.md`;
`.claude/rules/documentation.md` § Workflow skills. Skill: none. Guide: none.

**Host.** Windows 11, Git Bash. `node_modules` is installed. `npm run format:check` and
`npm run test:policy` were green at `HEAD`.

**Measurements.** Line counts above. The sweep that finds narration:
`grep -nE "^(This|These|The following|Here|We |Let|In this|As you)|this file|this reference|each one states|stands, and" <file>`;
run it before and after and report both readings with the pattern and the paths.

**Control identifiers.** none.

**Standing conditions.** `.orkestrel/**` and `host.json` are not yours. Nothing else writes this
checkout while you run.

## Unknowns

none.

## Scope

**Owned.** The three files above.

**Shared (report-only).** none.

**Off-limits.** Everything else.

**What asserts the state this change ends.** `tests/policy.test.ts`. Run `npm run test:policy`.

**Tools and limits.** Read, Grep, Edit, Bash for the sweep, `npm run format:check`,
`npm run test:policy`, `wc -l`, `git diff`. No commits, no `git checkout`/`restore`/`stash`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## The rewrite rules

- Open every file and every section with the directive, never with a description of the file or
  the section. "Draw every one of these states for every affordance you place" opens; "This file
  lists the states" does not.
- Keep every rule, fence, control, coverage sentence, and cross-reference. Cut narration,
  persuasion, and rationale that changes no judgment. Keep a reason only where it turns a decision
  the executor must make.
- Keep an example only where it disambiguates a rule.
- Write `must`, `can`, `might`, or the imperative; never `should`. No `we`, no `our`, no `let's`.
  No counts of open sets. No aphorism.
- Keep every backticked class name and attribute exactly as written; the markup is the contract.
- Keep the file shorter than or equal to its current length. Report the before and after counts.

## Output

Return, as your final message, the report you also write to `tmp/units/bootstrap-voice-report.md`:
the sweep readings before and after with pattern and paths, the line counts before and after, the
bare output of `npm run format:check` and `npm run test:policy`, a list of every rule you judged
at risk of loss and how you kept it, and every claim you could not close.

## Deviation contract

Stop and report when a rewrite would change a rule's meaning, drop a control, or drop a fence.
Decide, record, and carry on for sentence order and heading wording.

## Acceptance criteria

1. `npm run format:check` green.
2. `npm run test:policy` green.
3. The narration sweep reads zero hits on all three files, and every hit it read before is
   accounted for in the report.
4. Every markup fence and every `Control` and `Coverage` line present at `HEAD` is present after.
5. No file grew.

## Review evidence

Code change: return `git diff --stat` and `git status --porcelain` in the report.

## Voice (the user's instruction, 2026-09-02)

Write every line as a directive for the agent that executes it: what to do, what to check, what to
refuse. Match the voice and tone of `AGENTS.md` and `.claude/rules/*.md` throughout. Delete
narration, persuasion, and rationale that changes no judgment. A file that reads as prose for a
person fails the unit.
