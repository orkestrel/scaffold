# Unit CU-sol: mechanize the skill-family and bridge contracts in the policy sweep

## Role and engine

`sol` route — GPT-5.6 Sol implementer, journaled CLI, sandbox workspace-write, sole serial writer
from a clean committed baseline (the canon sentences and content repairs are already landed and
committed — read `.claude/rules/documentation.md` § Workflow skills as current law).

## Objective

Extend the policy sweep so every clause of the skill-family and bridge contracts is mechanical,
with one negative control per new assertion class.

## Context

- The ruling: `.orkestrel/scaffold/skills-audit/adoption-ruling.md` (A1–A6, the exact adopted
  checks and their bounds).
- Read first-hand before writing: `tests/setupPolicy.ts` (the skill-family section:
  `readSkillFamily`, `inspectSkill`, `parseSkillPrompt`, `matchesSkillToken`,
  `extractSkillReferences`, `SKILL_POLICY_CONTROLS`, `SKILL_POLICY_EXCLUSION`,
  `inspectPolicyControl`), `tests/policy.test.ts` (the control loops and their
  exactly-one-violation assertion), `.claude/rules/documentation.md` § Workflow skills,
  `.claude/rules/tests.md`.
- Environment: network denied; `.git` read-only; `tmp/` dirty; the wiring-test sandbox EPERM in
  `test:config` is expected in YOUR sandbox and is not yours to chase.

## Design constraints, fixed by the ruling and the lanes' reconciliation

New exported symbols follow the existing vocabulary: `parseSkillFrontmatter` (beside
`parseSkillPrompt`), `matchesSkillTrigger` (beside `matchesSkillToken`), `readSkillReferences`
(beside `readSkillFamily`), `inspectBridge` and `inspectSkillBridges` (beside `inspectSkill` /
`inspectSkillFamily`). `PolicyRule` gains `'bridge'`. Rule `'skill'` carries the family-internal
assertions.

1. `parseSkillFrontmatter(content)`: returns the frontmatter's `name` and `description` (shape
   yours to design, absence as `undefined`, never throwing). Admits exactly two description scalar
   shapes: single-line, and folded `>-` block. Never split arbitrary lines on colons — a folded
   continuation containing a colon must not read as a key (write the negative control that proves
   it: a folded description containing `: ` parses to exactly two keys).
2. `inspectSkill` additionally proves, for each family member: frontmatter exists and parses;
   keys exactly `name` and `description`; `name` equals the directory; `description` non-empty and
   `matchesSkillTrigger` — a sentence beginning `Use ` (string start or after sentence
   punctuation + whitespace, case-sensitive, followed by a word character). Violation messages
   claim only what is measured, in the existing message voice — the trigger message is
   `SKILL.md description names when to use the skill in a sentence beginning Use`.
3. Reference symmetry, both directions, one level: every `references/*.md` named in SKILL.md
   resolves (existing) AND every `.md` file under `references/` is named by SKILL.md AND
   `references/` holds no subdirectories.
4. No `README.md` or `CHANGELOG.md` (any case) inside a skill directory.
5. `inspectBridge` / `inspectSkillBridges` over `.claude/skills`: bridge directory set equals the
   canonical family set (both directions); each bridge's frontmatter `name` and `description` are
   byte-identical to its canonical twin's; the bridge body names
   `.agents/skills/<name>/SKILL.md`; the bridge directory owns no `references/`. Rule `'bridge'`.
   Wire it into `inspectPolicyControl`'s routing and the workspace sweep so the repository test
   enforces it. Do NOT widen `SKILL_FAMILY_ROOT` or make `inspectSkill` reach bridges; the
   committed `SKILL_POLICY_EXCLUSION` control must still pass unchanged.
6. Controls: one physical negative control per new assertion class (drawn from each instrument's
   stated membership, each producing exactly one violation, per the existing
   `toHaveLength(1)` loop), plus the positive controls the existing shape uses. If an assertion
   class cannot yield a single-violation control, report it as a deviation rather than loosening
   the loop's assertion.

## Scope

- Owned: `tests/setupPolicy.ts`, `tests/policy.test.ts`.
- Off-limits: everything else — `.agents/skills`, `.claude/skills`, and the rule files are
  already-repaired law you enforce, never edit.
- Validation allowed: `npm run test:policy`, `npm run check`, `npm run lint:check`,
  `npm run format:check` (read-only variants), scoped `oxfmt --write` on owned files, fixtures
  under `tmp/`.

## Output

1. `git diff` of the two owned files.
2. Exit codes: `test:policy` (with counts), `check`, `lint:check`, `format:check`.
3. Red/green proof for at least: the trigger check (a description without a `Use ` sentence
   fires), the reverse reference check (an unnamed references file fires), and the bridge
   description check (a drifted description fires).
4. Deviation findings, or `none`.

## Deviation contract

Stop and report if the current tree violates any check you land (the content repairs should have
made the tree clean — a residual violation is a real finding, not yours to fix), or if a check
cannot land without loosening an existing assertion.

## Acceptance criteria

- `npm run test:policy` exits 0 with counts reported; `inspectPolicyWorkspace` and
  `inspectSkillBridges` return `[]` over the real tree; all four gates green; every new assertion
  class carries a firing control; the folded-scalar-with-colon control parses clean.
