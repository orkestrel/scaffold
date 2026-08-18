# Unit U1: land the policy-plugin vocabulary and rulings in the rule files

## Role and engine

`implementer`, Claude Opus 5, native subagent. Sole serial writer in the main checkout, dispatched
from the clean committed baseline 83ff059.

## Objective

Amend three rule files so the written law precedes the code the next units add: an oxlint plugin at
`configs/policy.ts` (plugin namespace `policy`, rules `policy/no-mocking` and
`policy/no-keyword-privacy`), two newly enabled built-ins (`typescript/parameter-properties`,
`typescript/explicit-member-accessibility` with `no-public`), and a new policy-sweep rule
`'suppression'` banning lint-disable directives.

## Context

- Read first: `AGENTS.md` (Writing and Instruction-files sections bind every line you add),
  `.claude/rules/workspace.md`, `.claude/rules/typescript.md`, `.claude/rules/architecture.md`.
- The adopted design and its evidence: `.orkestrel/scaffold/antislop-audit/adoption-report.md` and
  `design-lanes-evidence.md` in the same folder. Key measured facts you may rely on: a file-level
  `/* oxlint-disable */` silently suppresses jsPlugin rules (E10a); jsPlugins work on the fleet's
  oxlint `^1.77.0` floor with zero new dependencies (E10b, E6); jsPlugin rules reach Vue SFC script
  blocks (E9); `as const` is exempt under the installed `consistent-type-assertions: "never"` while
  the prose is silent (E2); the tree carries two `as const` uses (E3).
- Skill: none. Guide/spec: none governs lint tooling; workspace.md § Tooling is the authority you
  are amending.
- Environment: linux, repo at /home/user/scaffold, no network needed. `tmp/` and `.orkestrel/` are
  expected dirty/tracked respectively.

## The four amendments

1. **workspace.md § Configuration authority.** The bullet naming `configs/helpers.ts` and
   `configs/browsers.ts` as "the only permitted leaves under `configs/`" admits a third leaf,
   `configs/policy.ts`: the workspace's oxlint plugin, the lint instrument of the policy law. State
   its constraint the way the existing leaf law states it: it imports nothing, so it resolves in
   every workspace it is vendored to.
2. **workspace.md § Tooling.** After the Linter bullet, add directives that fix:
   - The policy law has two instruments. The oxlint plugin `configs/policy.ts` (namespace `policy`)
     enforces AST-local law; the policy sweep (`tests/setupPolicy.ts`) enforces path- and
     text-shaped law and every law whose subject is suppression itself. The assignment rule: an
     instrument must not be suppressible by the thing it polices — a file-level `oxlint-disable`
     silently defeats every lint rule, and nothing inside a file can suppress the sweep.
   - In the plugin's visitor table, each visitor is a one-line context-binding arrow delegating to
     a named module-scope `report{Noun}` function; rule logic never sits inline in the table. (This
     is the `routes.ts` idiom applied to a foreign API shape, and it is the sanctioned exception to
     the in-body function-expression limits for exactly this table.)
   - Do not name individual rule ids in workspace.md; instruments and their assignment rule only.
3. **typescript.md.** Two rulings, each one home:
   - § Syntax and imports gains the accessibility directive: never write `public`, `private`, or
     `protected` on class members or constructor parameters; privacy is `#` fields and `public` is
     the default; never declare parameter properties (a constructor parameter carrying any
     accessibility or `readonly` modifier).
   - § Types gains the `as const` ruling: `as const` is sanctioned — a literal-type annotation that
     only narrows and never overrides the checker, so the assertion ban does not reach it. Name
     where it earns its place (deriving a literal union from a value, fixing tuple arity) and where
     it does not (a value whose contract is already declared).
4. **architecture.md § What the policy sweep proves.** Add one bullet: the sweep proves no source,
   test, config, or script file carries an `eslint-disable` or `oxlint-disable` directive, and why
   that rule lives in the sweep rather than the plugin (a file-level disable comment silently
   defeats every lint rule, plugin rules included; nothing inside a file can suppress the sweep).
   Do not touch the class-expression sentence — the nested-function law is not moving in this
   change.

## Unknowns

None the unit needs. The plugin and sweep code these amendments describe land in later units; you
are writing the law they will conform to.

## Scope

- Owned: `.claude/rules/workspace.md`, `.claude/rules/typescript.md`,
  `.claude/rules/architecture.md`.
- Off-limits: everything else, including `AGENTS.md`, `configs/`, `tests/`, `src/`,
  `.oxlintrc.json`, and `.orkestrel/`.
- Tools: Read, Grep, Glob, Edit. Run only read-only validation (`git diff`); no tree-wide gates,
  no commits.

## Execution

Perform the assignment directly. Spawn nothing.

## Output

Return: the exact diff (`git diff` of the three files), one line per amendment saying where it
landed, and any deviation findings.

## Deviation contract

Stop and report if an amendment would contradict a sentence you cannot edit (an off-limits file
states the opposite), or if the existing prose already covers an amendment. Where a paragraph sits
inside its owned file, and which existing bullet it joins, are yours to decide and record.

## Acceptance criteria

- Every line you add is a directive: what to do, what to check, or what to refuse.
- No rule is restated across two files: workspace.md carries instruments and assignment,
  typescript.md carries the two syntax rulings, architecture.md carries the sweep's new proof row.
- The three files remain internally consistent with their untouched sections.
- `git diff` shows changes only in the three owned files.

## Review evidence

The diff itself; a cross-engine audit (GPT-5.6 Sol) follows in a later unit.
