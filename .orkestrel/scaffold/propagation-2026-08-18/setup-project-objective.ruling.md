## Fork

**Fork A — register it.** The canon requires reusable exported setup behavior to be tested and expressly permits sibling `setup*.test.ts` files; the project matrix must provide a reachable runner for that sanctioned proof.

The proof category is valid. Ollama’s file tests behavioral helpers, factories, guards, recorders, and fixtures. It is not barred by the rule against files devoted solely to constants, barrels, errors, or types. The adequacy audit must still reject any helper that reimplements production behavior, but that is a per-helper defect, not grounds to discard the proof category.

Fork B has no lawful destination. `config` proves generated configuration, `guides` proves documentation parity, `conformance` proves official-tooling drift, and `integration` composes public package features. Adding setup-helper assertions to any of them would violate its fixed scope. The mirror rule permits the root-level filename but does not permit changing its subject.

Fork C makes a canon-sanctioned proof incompatible with fleet membership. Permanent loss of vendored policy updates is not proportionate.

## Exact rule changes

In `.claude/rules/tests.md`, replace the opening sentence under `## Cross-cutting proofs` with:

```md
Give every proof at the tests root a fixed location and project so no package invents its own:
```

Add this table row:

```md
| `tests/setup*.test.ts`        | Reusable behavior exported from sibling `tests/setup*.ts` modules works as the workspace's suites require                            |
```

Add these directives after the table:

```md
- Treat each `tests/setup*.test.ts` file as a sibling module proof under the mirror rule, and run it in the `setup` project.
- Prove each reusable setup behavior in its sibling test. Apply the existing exclusions when a module contains only constants, errors, types, or barrel exports.
- Do not move setup-helper assertions into another cross-cutting proof.
```

In `.claude/rules/workspace.md`, add this row to the cross-cutting project matrix:

```md
| `setup`        | `tests/setup*.test.ts`        | Reusable behavior exported by root test setup modules works as required | `test`                                |
```

Add these directives after that matrix:

```md
- Register the `setup` project only when an exact-case file at the tests root matches `tests/setup*.test.ts`.
- When `setup` is registered, emit `test:setup`, invoke it from `test`, and collect every matching root-level file exactly once.
- When no setup test exists, emit neither the `setup` project nor the `test:setup` script.
```

Add `test:setup` to the existing cross-cutting-script list.

## Required plan constraint

The condition must exist in the compiled plan, not only as a runtime expression in `vite.config.ts`.

The closed `Blueprint` contract needs a single-word `readonly setup: boolean` structural fact. The CLI must derive it from an exact-case root match. Both `blueprintToRootVite` and `blueprintToScripts` must consume the same fact. This keeps project registration, the direct script, and gate reachability atomic.

A runtime-only conditional is insufficient because the project validator identifies planned projects from generated configuration text. An unconditional factory containing the `setup` label could appear registered even when its include is empty.

## Blast radius

The template capability and the two vendored rule changes propagate to all 44 targets.

For the other 43 targets:

- Their derived `setup` fact remains false.
- They receive no registered `setup` project.
- They receive no `test:setup` script or `test` chain change.
- Their discovered test population and runtime remain unchanged.
- They receive the changed vendored rule bytes. Generated configuration output can remain byte-identical when project selection occurs during compilation.

Ollama alone receives the selected project and retains its existing `test:setup` gate.

## Accepted risks

- `Blueprint.setup` expands a public contract and therefore requires type, guide, parser, guard, and compiler parity.
- A fleet-wide rule publication is required for a proof used by one target.
- The setup project adds Ollama’s 558-line proof to its default gate cost.
- Setup proofs can become a home for duplicated production behavior. The existing adequacy audit must continue to reject that duplication.
- A later setup proof requiring an incompatible browser runtime might require another matrix ruling. This decision does not silently broaden the project beyond the root proofs its generated configuration can run.
- If a setup test is removed while its manifest script remains, scaffold must continue to refuse the write. That fail-closed result preserves project reachability.