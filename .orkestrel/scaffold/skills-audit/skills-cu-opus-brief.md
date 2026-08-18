# Unit CU-opus: land the skill-family canon sentences and repair the drifted content

## Role and engine

`implementer`, Claude Opus 5, native subagent. Sole serial writer, clean committed baseline
4035cb4. Perform directly; spawn nothing; no commits; read-only validation plus scoped
`git diff` only.

## Objective

Two halves, one unit. Half A: three canon sentences in `.claude/rules/documentation.md`
§ Workflow skills making the adopted checks' subjects written law before the instrument lands.
Half B: repair the live content defects the design round found and the Orchestrator verified.

## Context

- The ruling this implements: `.orkestrel/scaffold/skills-audit/adoption-ruling.md` (A1–A6).
- The instruction-files law in `AGENTS.md` binds every line: directives only, trigger + action,
  no human-facing prose, maximal concision, one home per rule.
- Verified facts you may rely on: four bridges carry descriptions drifted from their canonical
  twins (enterprise-bootstrap, orkestrel-align-packages, orkestrel-build-application,
  orkestrel-harden-package; the other four are byte-identical);
  `.agents/skills/orkestrel-build-application/references/application.md` is named nowhere in its
  SKILL.md (the file's only `application.md` mention is the rules file, line 13).

## Half A — documentation.md § Workflow skills, three directives

1. `name` equals the skill's directory name.
2. The `description` value is a single-line scalar or a folded `>-` block — no other shape — and
   contains a sentence beginning `Use ` naming when to invoke the skill.
3. A provider bridge carries its canonical skill's `name` and `description` verbatim, names the
   canonical `.agents/skills/<name>/SKILL.md` path, and owns no references of its own.

Fold each into the existing bullet list in that section's voice; do not restate existing bullets;
each added line names its observable trigger and required action.

## Half B — content repairs

4. Restore byte-parity in the four drifted bridges: each `.claude/skills/<name>/SKILL.md`
   frontmatter `name` and `description` becomes byte-identical to its canonical twin's (copy the
   canonical value exactly, including scalar shape). Leave each bridge's body otherwise unchanged
   unless it fails directive 3 (every bridge must name its canonical path; check all eight, fix
   only what fails).
5. Close the orphan reference in `.agents/skills/orkestrel-build-application/`: read
   `references/application.md` against the SKILL.md workflow first. If it carries conditional
   detail the workflow needs, route to it from the SKILL.md step that needs it; if it restates
   what SKILL.md already carries, fold any non-duplicated remainder in and delete the file. Decide
   from content, record the decision. SKILL.md stays a router.

## Scope

- Owned: `.claude/rules/documentation.md`, the eight `.claude/skills/*/SKILL.md` bridges,
  `.agents/skills/orkestrel-build-application/SKILL.md` and its `references/application.md`.
- Off-limits: everything else, `tests/` included.

## Output

The exact `git diff`, one line per numbered item saying what landed (including the fold-or-route
decision and why), deviation findings or `none`.

## Deviation contract

Stop and report if a bridge's body carries content that byte-parity would erase and directive 3
does not cover. Placement inside owned files is yours.

## Acceptance criteria

- All eight bridges byte-match their twins on `name` and `description` and name their canonical
  path; every file under the repaired skill's `references/` is named by its SKILL.md; the three
  canon directives read in the section's existing voice; `git diff` touches only owned files.
