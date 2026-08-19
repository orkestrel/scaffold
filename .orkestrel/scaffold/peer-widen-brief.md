# Design brief — admit a foreign peer in a scaffold blueprint

## Objective

`@orkestrel/probe` must declare `typescript`, `vitest`, and `oxlint` as peer dependencies with
floor ranges. A scaffold blueprint cannot express that today. Design the smallest correct change.

## What the code does now, read from this checkout

- `src/core/compilers.ts:1782-1796` validates all three dependency lists through one helper:
  - `dependenciesToQuestions(blueprint.dependencies, 'dependencies', DEPENDENCY_NAME_PATTERN, ORKESTREL_RANGE_PATTERN)`
  - `dependenciesToQuestions(blueprint.peers, 'peers', DEPENDENCY_NAME_PATTERN, ORKESTREL_RANGE_PATTERN)`
  - `dependenciesToQuestions(blueprint.extras, 'extras', EXTRA_NAME_PATTERN, EXTRA_RANGE_PATTERN)`
- `DEPENDENCY_NAME_PATTERN` is `/^@orkestrel\/[a-z][a-z0-9-]*$/` (`src/core/constants.ts:266`). Its
  documented reason is path safety: a dependency name derives a guide mirror path, and
  `src/core/helpers.ts:258` states the pattern "closes the name to a bare scoped one before it ever
  arrives here".
- `EXTRA_NAME_PATTERN` is `/^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/`
  (`src/core/constants.ts:278`). Its documented reason: "An extra is manifest content and never
  reaches a path... neither `..` nor a backslash is admitted, so the shape cannot express a
  traversal even though it accepts far more names."
- `ORKESTREL_RANGE_PATTERN` is `/^\^0\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/` (`:292`).
- `EXTRA_RANGE_PATTERN` (`:295`) accepts an optional `^` or `~` then an exact three-part version
  with an optional prerelease. It does NOT accept `>=6.0.0`.

## The fact that unlocks the change

A peer never reaches a path. `blueprint.peers` is consumed in exactly two places, both manifest
content: `src/core/compilers.ts:237` merges it into devDependencies, and `:465` writes it into
`peerDependencies`. Nothing derives a guide mirror or any other path from a peer name. The narrow
name pattern on peers is therefore inherited from sharing one helper with `dependencies`, not a
safety requirement.

## The fork to rule on

An `@orkestrel/*` peer and a foreign peer need different rules, and the question is whether to say
so or to widen uniformly.

- The fleet's caret rule exists for a reason `.agents/orchestration.md` states: every package is
  `0.0.x` and a caret pins one exact release, so two disagreeing ranges install two copies and the
  compiler reads them as two distinct types. `@orkestrel/mcp` already declares
  `@orkestrel/router ^0.0.10` as a peer, so Orkestrel peers exist and must stay caret-pinned.
- A foreign peer wants the opposite. `PROBE.md` rules that the probe must impose no ceiling,
  because its job is to run whatever the target's gate runs, and a caret refusing a target's newer
  linter would make the probe the reason a workspace could not upgrade. This checkout already shows
  `oxlint` declared `^1.77.0` and installed 1.78.0.

So rule on:

1. Does peer validation branch on whether the name is an `@orkestrel/*` name, keeping the existing
   narrow rules for fleet peers and admitting a wider name and range for foreign ones? Or is there
   a simpler correct shape?
2. What exactly may a foreign peer's range be? `PROBE.md` wants a floor such as `>=6.0.0`. Name the
   pattern and justify what it admits and refuses. Consider whether admitting `>=` anywhere weakens
   a guarantee stated elsewhere.
3. Where do any new constants and helpers live, given `.claude/rules/architecture.md` centralized
   files and the naming forms in `.claude/rules/names.md`?
4. What must change beside the validator: `src/core/types.ts`, `src/core/validators.ts`,
   `src/bin/CLI.ts:905` and `:990` (both filter with `DEPENDENCY_NAME_PATTERN`),
   `src/core/helpers.ts:789`, the guide, and which tests. Note
   `tests/src/core/compilers.test.ts:524-534` carries a comment asserting the current narrowness
   and a fixture built around it.
5. What must NOT change, and why. Be explicit about anything a naive widening would break,
   especially the path-safety property `DEPENDENCY_NAME_PATTERN` exists to hold.

## Constraints

`AGENTS.md` and `.claude/rules/*.md` bind. No new npm dependency. No compatibility shim; update
every consumer in the same change. Types first. Single-word entity members.

## Output, under 400 lines, no process diary

1. `RULING` — the change, in one paragraph.
2. `PATTERNS` — the exact regular expressions, with what each admits and refuses.
3. `EDITS` — an ordered list, each naming its file and what changes there.
4. `TESTS` — the proofs this owes, including the control that must fail.
5. `REFUSED` — designs considered and killed.
6. `RISKS` — ranked, each with the probe that exposes it.
