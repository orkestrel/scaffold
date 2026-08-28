# Unit: src-audit-<SLICE>

## Role and engine

`reviewer`, Claude Opus 5, read-only. Perform this assignment directly and spawn nothing.

## Objective

Return every place where the named packages' `src/` trees violate the Orkestrel coding contract,
as numbered findings an implementer can fix without rereading the tree.

## Context

Read these before judging anything, in this order:

1. `/home/user/scaffold/AGENTS.md`
2. Every file in `/home/user/scaffold/.claude/rules/`: `names.md`, `typescript.md`, `architecture.md`,
   `patterns.md`, `portability.md`, `documentation.md`, `writing.md`, and `quality.md`.
3. Each package's own `guides/<package>.md`, which states what that package is for.

Packages under audit, each a git checkout at `/home/user/fleet/<name>` (the `scaffold` package is at
`/home/user/scaffold`):

<PACKAGES>

Audit only each package's `src/` tree. Its `tests/`, `configs/`, `guides/`, and root files are out of
scope for this unit, except that you may read them as evidence about `src/`.

Standing conditions:

- Each tree is a clean git checkout whose only modification is `package.json` and `package-lock.json`.
  Ignore that modification.
- Every one of these packages already passes `format:check`, `lint:check`, `check`, `build`, and
  `test`. The syntactic placement law that `tests/policy.test.ts` proves is therefore already green:
  do not re-report a finding that sweep would have caught. `.claude/rules/architecture.md` §
  "What the policy sweep proves" states exactly what it covers, and everything outside that list is
  yours.
- `node_modules` is installed in each package, so you can read the exact installed declarations of a
  declared `@orkestrel/*` dependency.

## Unknowns

Whether any finding you raise is already an intentional, documented exception. Where a guide or a
TSDoc `@remarks` states the exception, record the finding as `EXEMPT` with the pointer rather than
dropping it silently.

## Scope

Read-only. You own no files. Edit nothing, write no file, and run no command that writes. Your tools
are `Read`, `Grep`, and `Glob`.

## Execution

Do this assignment yourself. Spawn nothing.

## What to hunt

The mechanical placement law is already green, so spend your effort where an instrument cannot see:

1. **Kind purity among function files.** A helper misfiled as a parser, a coercer misfiled as a
   guard, a compiler misfiled as a factory, a shaper misfiled as a cloner. Apply
   `.claude/rules/architecture.md` § Kind purity, including the `parse*`/`create*` name forms and the
   move-versus-rename repair it prescribes.
2. **Leaf-pair purity.** `helpers.ts` and `validators.ts` importing an implementation class.
3. **Superfluous wrappers.** One-line delegates, pass-through factories, rename-only helpers, and
   wrappers around a semantically identical platform or declared-dependency primitive.
4. **Single-word entity API.** Compound public properties, methods, option keys, and event names on
   an entity, per `.claude/rules/names.md`.
5. **Naming forms.** Interface/type suffixes, acronym case, lifecycle vocabulary, `get*`/`set*`
   accessors, boolean forms, tally names, rejected generic words.
6. **Readonly public surface.** Interface properties and public return collections that are not
   `readonly`, `ReadonlyMap`, or `ReadonlySet`.
7. **Barrel membership.** An intentional reusable top-level export missing from its environment
   barrel, or a barrelled class no consumer can construct.
8. **Ecosystem reuse.** Local reimplementation of a primitive a declared `@orkestrel/*` dependency
   already exports with matching semantics. Read the installed declaration before claiming a match.
9. **TSDoc completeness.** A public export missing description, `@param`, `@returns`, or `@example`,
   and a first sentence that repeats the symbol's name or does not start with a third-person verb.
10. **Design laws.** Sentinel values instead of `undefined`, stored state that could be derived, a
    two-literal union where a boolean belongs, a discriminant named `kind` or `type`, and alternating
    synonyms for one concept.

## Deviation contract

A conflict with this objective stops the unit and returns a deviation report. An ancillary judgment —
which of two findings to list first, how to word one — is yours to settle and carry on from.

## Acceptance criteria

- Every finding names `package`, `file:line`, the rule it violates by file and section, what is
  wrong, and the smallest correct repair.
- Every finding carries a verdict: `CONFIRMED` when you read the code and the rule and they conflict,
  `EXEMPT` when a guide or TSDoc documents the exception.
- You report a package with no findings as `CLEAN` and name what you read to reach that.
- You state the coverage of your read: which files you opened and which you did not.

## Output

Return only this, as your final message. Write no file.

```
## Coverage
<per package: files read, files skipped and why>

## Findings
1. package=<name> file=<path:line> rule=<file § section> verdict=<CONFIRMED|EXEMPT>
   wrong: <one sentence>
   repair: <the smallest correct edit>
2. ...

## Clean
<packages with no findings>

## Deviation
<none, or the report>
```

No process diary. No raw file dumps.
