# Unit AF-prose: land the audit round's prose rulings

Successor to `tmp/unit-rules-brief.md` (U1). The audit round (two blind lanes, verdicts retained at
`.orkestrel/scaffold/antislop-audit/`) broke three U1 sentences and sustained one structural
finding; each fix below adopts the auditing lane's prescription and the Orchestrator has verified
the underlying facts directly. Everything else U1 landed stands — do not rewrite it.

## Role and engine

`implementer`, Claude Opus 5, native subagent. Sole serial writer, clean committed baseline
b91dc63. Perform directly; spawn nothing; no commits; read-only validation only (`git diff`).

## The five fixes

1. **AGENTS.md § Non-negotiable rules.** The line `**NEVER** use TypeScript ``private``; use
   runtime-enforced ``#`` fields.` widens to name all three accessibility modifiers and parameter
   properties, keeping the `#`-fields directive — the campaign ruled (with the user's
   authorization) that `protected` and `public` fall with `private`, and the enforcement already
   bans all three, so the root copy is currently the narrower, stale one against the root's own
   one-home law. One line, same voice as its neighbors.
2. **typescript.md § Syntax and imports.** Reduce the two accessibility bullets U1 added to only
   the TypeScript-syntax specifics the root now carries no copy of: what a parameter property IS
   (a constructor parameter carrying any accessibility or `readonly` modifier) and that the ban
   covers it. Do not restate the root ban's subjects; reference-level brevity.
3. **workspace.md § Tooling (Policy instruments block).** The sentence claiming the visitor
   adapter "is the `routes.ts` idiom" is false — `routes.ts` law requires reference by name and
   forbids in-place function expressions, which is the inverse of the adapter. Replace the
   identity claim with the direct statement: the visitor table is data mapping each visitor name
   to a named module-scope reporter; the one-line arrow exists only to bind `context`, which the
   foreign API supplies per rule instance, and carries no logic beyond that delegation.
4. **workspace.md § Configuration authority (third-leaf bullet).** Add one sentence sanctioning
   the leaf's self-contained shape: because `configs/policy.ts` may import nothing, it holds its
   own types, data, and functions, and the centralized-kind table does not reach it.
5. **architecture.md § What the policy sweep proves (suppression bullet).** Keep the first
   sentence (what the sweep proves). Delete the second ("That rule sits in the sweep rather
   than…because…") — that rationale's one home is workspace.md's instrument-assignment rule.

## Context

- Read first: the three lane-verdict files in `.orkestrel/scaffold/antislop-audit/` are the
  findings' record; `AGENTS.md` Writing/Instruction-files sections bind every line.
- The enforcement truth these sentences must match: `policy/no-keyword-privacy` reports `private`
  and `protected`; the built-in `explicit-member-accessibility` (`no-public`) reports `public`;
  `typescript/parameter-properties` reports every parameter property.

## Scope

- Owned: `AGENTS.md`, `.claude/rules/workspace.md`, `.claude/rules/typescript.md`,
  `.claude/rules/architecture.md`.
- Off-limits: everything else.

## Output

The exact `git diff`, one line per fix saying where it landed, deviation findings or `none`.

## Deviation contract

Stop and report if a fix contradicts an off-limits file. Paragraph placement inside owned files is
yours to decide and record.

## Acceptance criteria

- Each added or changed line is a directive; no rule has two homes afterward; `git diff` touches
  only the four owned files; the widened AGENTS.md line and the reduced typescript.md bullets do
  not overlap in subject.

## Successor addendum (AF-voice): user-directed tightening pass

The user directs: instruction files carry directives for agents only — no human-facing prose,
maximal concision. Four tightenings, fixed verbatim in intent:

1. AGENTS.md: delete the `**NEVER** put `readonly` on parameters.` line — it is subsumed by the
   widened accessibility line (a `readonly` parameter IS a parameter property). One subject, one
   line.
2. typescript.md parameter-property bullet: drop "which declares a field as a side effect of a
   parameter"; the definition alone carries the trigger.
3. typescript.md `as const` bullets: compress, keeping only the judgment-bearing clause (annotates
   a literal with its own type, never overrides the checker, so the assertion ban does not reach
   it), the two earning uses, and the do-not-use directive.
4. workspace.md visitor-adapter bullet: state the shape once (one-line context-binding arrow to a
   named module-scope `report{Noun}` reporter; no inline logic) plus the architecture.md
   cross-reference; delete the restatement sentence.
