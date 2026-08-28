# Unit: overwrite-semantics

## Role and engine

Cursor Grok, read-only evidence distillation. Perform this assignment directly and spawn nothing.

## Objective

Distil exactly what the `scaffold overwrite` command writes, deletes, and refuses in a target
repository, so an operator can predict which package-specific files a run destroys.

## Context

Read `/home/user/scaffold/guides/scaffold.md` and the `src/` implementation of the overwrite verb
under `/home/user/scaffold/src/`. The reader runs `scaffold overwrite` in each of 48 sibling
package repositories that each hold package-specific `guides/*.md`, `src/`, `tests/`, and
`configs/src/*` content.

## Scope

Read-only. Owned files: none. Do not edit anything. Do not run any command that writes.

## Execution

Do this assignment yourself. Spawn nothing.

## Output

Return only these sections, with `file:line` pointers for every claim.

- `Question`: one line.
- `Evidence`: concise facts with `file:line`.
- `Distillate`, covering exactly:
  1. The file groups `overwrite` selects by default, and what `--groups` narrows.
  2. Every category of file `overwrite` DELETES, and the rule that decides deletion.
  3. Every category `overwrite` OVERWRITES in place, and whether package-specific content in those
     files survives.
  4. Every category `overwrite` LEAVES ALONE.
  5. The conditions under which `overwrite` REFUSES to write, and the exit code it gives.
  6. What `overwrite` requires from git, and what `--dirty` changes.
  7. Which `package.json` regions it rewrites, and how a package-specific script or dependency
     declared there is treated.
- `Unknowns`: unresolved facts, not recommendations.
- `Deviation`: any CLI, model, auth, or containment problem.

Forbid raw file dumps, decisions, design, and edits.
