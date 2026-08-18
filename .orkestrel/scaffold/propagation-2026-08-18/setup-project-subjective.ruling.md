## Fork A — register it

Reusable setup code is a required test subject, and no existing project names that workspace-wide subject truthfully.

The canon requires this proof when setup modules export reusable behavior. Ollama tests parsers, guards, header transforms, factories, and stateful test tools. This is not a test solely for constants or types. Folding it into `config` or `integration` would misname its scope.

## Exact rule text

In [tests.md](/home/user/scaffold/.claude/rules/tests.md), replace the setup mirror rule with:

```md
- Resolve each root `tests/setup*.test.ts` proof against its sibling `tests/setup*.ts` module. A root `tests/setup.test.ts` file can prove several setup modules when their helpers serve several projects.
```

Add this row to **Cross-cutting proofs**:

```md
| `tests/setup*.test.ts` | The observable behavior of reusable helpers, fixtures, recorders, factories, constants, and guards exported from `tests/setup*.ts` |
```

Add after that table:

```md
- Put each root `tests/setup*.test.ts` proof in the `setup` project. Keep its assertions on exported test-infrastructure behavior; do not duplicate production behavior.
```

In [workspace.md](/home/user/scaffold/.claude/rules/workspace.md), add this row to the cross-cutting project matrix:

```md
| `setup` | `tests/setup*.test.ts` | Reusable shared test infrastructure behaves as its consuming projects require | `test` |
```

Add beneath the matrix:

```md
- Define the `setup` project only when at least one root `tests/setup*.test.ts` file exists. Include every matching file. Omit the project and its script when the match is empty.
```

Add `test:setup` to the existing cross-cutting script list. The selected project must have a `test:setup` script, and `test` must invoke it.

The generated `setup` factory, project-list entry, and script are all conditional. An unconditional empty project is forbidden.

## Blast radius

- Ollama retains `tests/setup.test.ts` and its existing `test:setup` script. Its generated `vite.config.ts` gains the canonical `setup` project, so scaffold writing verbs accept the workspace.
- All 44 targets receive the 2 changed vendored rule files and must consume the scaffold release that carries them.
- The other 43 targets gain no `setup` project, script, or collected tests because none has a matching file. Their generated project matrices remain unchanged.
- Scaffold itself gains no `setup` project or script because it has no matching proof.
- No target manifest requires an automatic rewrite. Ollama already declares the required script; scaffold treats existing manifests as birth-owned.

## Accepted risks

- One package introduces a canonical project category. The existing export-and-test law justifies that expansion, while conditional registration prevents fleet-wide ceremony.
- Ollama’s 558-line suite may still contain individual assertions better proved by consuming tests. Registering the category does not endorse every assertion in the file.
- The concrete proof is Node-shaped. A future workspace with incompatible browser and server setup proofs may require a separate project-shape ruling; this proposal does not pre-design that case.