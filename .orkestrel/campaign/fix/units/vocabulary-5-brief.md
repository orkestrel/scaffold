# Unit vocabulary-5 — exact-text fix closing the round-4 findings (supersedes `vocabulary-4-brief.md`)

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

`.claude/rules/names.md` line 96 negates the `*Of` discriminator in its own text, line 172 carries
that discriminator, line 171 carries no discriminator of its own and points to § Kind purity for
what a factory is, and § Fixed derivation/construction forms opens with the rule that a form's
contract binds a new name while § Kind purity names the retained exceptions.

## Context

**The lines as they stand** (`/home/user/scaffold/.claude/rules/names.md`):

```text
96:  - `build*` assembles a composite value from parts and is not a factory; see `create*` and `*Of` in § Fixed derivation/construction forms.
167:## Fixed derivation/construction forms
168:
169:- `is*`: total `Guard<T>`; never throws; returns false off-shape.
171:- `create*`: factory constructing an entity; `.claude/rules/architecture.md` § Kind purity decides what a factory is and where it lives.
172:- `*Of`: combinator combining constituent parts into a container/guard/value, such as `arrayOf(guard)` or `boundsOf(min, max)`.
```

**The ruled text**, verbatim (keep each line's indentation and bullet):

- Line 96 becomes:

```text
  - `build*` assembles a composite value from parts and is neither a factory nor a combinator named for its constituents; see `create*` and `*Of` in § Fixed derivation/construction forms.
```

- Insert one new bullet as the first item of § Fixed derivation/construction forms, directly
  before the `is*` line (so the `is*` line moves to 170):

```text
- A form's contract binds a new name; `.claude/rules/architecture.md` § Kind purity names the retained names that keep a form outside its file, such as `createWriteDirectory` and `isVacant` in `helpers.ts`.
```

- The `create*` line becomes:

```text
- `create*`: the factory form; `.claude/rules/architecture.md` § Kind purity states what a factory is and where it lives.
```

- The `*Of` line becomes:

```text
- `*Of`: combinator named for its constituents, combining them into a container/guard/value, such as `arrayOf(guard)` or `boundsOf(min, max)`.
```

**Law.** `AGENTS.md` § Instruction files; `.claude/rules/writing.md`.

**Host.** `/home/user/scaffold`, branch `claude/orkestrel-npm-audit-deps-14ibta`, committed clean
at launch. `.orkestrel/**` and `tmp/**` may be dirty; not yours.

## Scope

**Owned.** `.claude/rules/names.md`: line 96, the new bullet after line 168, and the `create*` and
`*Of` lines. **Off-limits.** Every other line and file.

**Tools and limits.** Read, Grep, Edit, Bash. No commit, stage, push, install, or discarding
`git` command.

## Execution

Apply the four edits, then run:

```text
npm run format:check && npm run lint:check && npm run test:policy
```

## Output

Return, as data: lines 96 and 167-176 after the edit, verbatim; each command with its exit code;
`git diff --stat`; `git status --short`.

## Deviation contract

Stop and report when a line does not match the "as they stand" text, or when the policy sweep
rejects the edit.

## Acceptance criteria

1. `sed -n '96p;169p;172p;173p' .claude/rules/names.md` prints the ruled text exactly (the new
   bullet at 169, `create*` at 172, `*Of` at 173).
2. `npm run format:check`, `npm run lint:check`, `npm run test:policy` exit 0.
3. `git status --short` lists `.claude/rules/names.md` only.
