# Unit docs-ecosystem — the line's documentation surfaces and the blast radius of a documentation-pipeline change

## Role and engine

`orkestrel` on Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. You are read-only: you hold no Edit, Write, or Bash tool.

## Objective

Return an ecosystem map, from the evidence named here, of where each published `@orkestrel` package's documentation lives, which packages carry the parity suite, which line packages can parse or render Markdown or fill templates, and what a change to the guide contract or to `@orkestrel/guide` reaches, so a design round can size a single-source documentation pipeline without collecting that state itself.

## Context

**Evidence.** Commands run by the Orchestrator on 2026-09-05 from `/home/user/scaffold` at commit `792a9739`, clean tree:

```text
$ ls /home/user/fleet/  → abort agent brief browser budget codec console contract csv database emitter form guide html indexeddb interpret lsp markdown mcp middleware msg ndjson ollama pool probe process program qualifier queue rater reason relation router sea server sqlite sse table template terminal test timeout tool toolbox websocket worker workflow workspace
$ ls guides/            → README.md and one mirror per published package (scaffold.md is this repository's own)
$ node -e 'require("./package.json")' → dependencies: @orkestrel/console, contract, emitter, markdown, process, template; devDependencies include @microsoft/api-extractor, @orkestrel/guide, @orkestrel/html, @orkestrel/probe, @orkestrel/test, oxfmt, oxlint, typescript, vite, vite-plugin-dts, vitest
$ grep -c -E '^\s*it\(' tests/guides.test.ts in fleet checkouts → guide 32, markdown 60, contract 30
```

The fleet checkouts at `/home/user/fleet/<package>` are on each package's `main` as of the publish wave of 2026-09-04 and 2026-09-05; each holds `package.json`, `package-lock.json`, `guides/<package>.md`, `tests/guides.test.ts` where the package keeps one, and `README.md`. Read those files as the manifests, lockfiles, and guides this dispatch supplies. The catalog table in `/home/user/scaffold/.claude/agents/orkestrel.md` was regenerated from the registry on 2026-09-05 and is the layer order.

**Law.** `AGENTS.md`; `.claude/rules/documentation.md`; `.claude/rules/writing.md`; skill: none; guide: `guides/README.md`.

**Host.** Read-only tools over `/home/user/scaffold` and `/home/user/fleet/**`. No network, no shell.

**Measurements.** none beyond the evidence block; report every count you produce beside the file it was read from.

**Control identifiers.** none.

**Standing conditions.** `guides/<name>.md` files under `/home/user/scaffold/guides/` other than `scaffold.md` are fetched mirrors; read a package's own guide from its fleet checkout when the two could differ.

## Unknowns

- Whether every fleet package keeps `tests/guides.test.ts`, and whether the file is scaffold-vendored or package-owned in each. Report per package from the checkout and from `/home/user/scaffold/host.json` (the vendored inventory).

## Scope

**Owned.** none. **Shared.** none. **Off-limits.** everything; read only. **What asserts the state this change ends.** none. **Tools and limits.** Read, Grep, Glob.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Evidence sought

1. **Per-package documentation inventory.** For every package under `/home/user/fleet/`: the guide path and its line count, whether `tests/guides.test.ts` exists and its `it(` count, whether `README.md` exists and its line count, whether `src/core/index.ts` (or the package's entry) opens with a `@packageDocumentation` block, and the package's declared `@orkestrel/guide` range if any. Return this as one table.
2. **Rendering and parsing primitives.** From the fleet checkouts' guides (`guides/markdown.md`, `guides/template.md`, `guides/html.md`, `guides/table.md`, `guides/codec.md`) § Surface: the exported symbols that parse Markdown into a tree, render a tree or data to Markdown text, fill a template, and render a table, with the guide line pointers. Name the package and layer of each.
3. **Dependents of `@orkestrel/guide`.** Which packages declare `@orkestrel/guide` and at what range, from each `package.json`; which of those import it only in `tests/`.
4. **Blast radius.** Using the catalog's layer column and the `dependencies`, `peerDependencies`, and `devDependencies` edges in each manifest: which packages a change to `@orkestrel/guide`'s check contract reaches (development edge: re-pin and gates only), and which packages a change to `@orkestrel/markdown`'s or `@orkestrel/template`'s runtime surface reaches (runtime edge: republish in layer order). List each set by layer.
5. **Drift already visible.** Where a package's own `guides/<name>.md` in its fleet checkout differs from scaffold's mirror (compare the first 5 lines and the line counts; do not diff whole files), name the package.

## Output

Return only:

- `Map`: the per-package table from row 1.
- `Health`: rows 3 and 5, as findings with pointers.
- `Work order`: rows 2 and 4 — the primitives with their layers, and the two blast-radius sets by layer.
- `Unknowns`: every row or package the reading did not reach, with the reason.

No recommendation and no design.

## Deviation contract

A missing file is a finding, not a deviation: record it in the table. Stop only if `/home/user/fleet/` or `/home/user/scaffold/.claude/agents/orkestrel.md` cannot be read.

## Acceptance criteria

- The table in `Map` has one row per directory under `/home/user/fleet/` plus scaffold.
- Every symbol in `Work order` carries a guide line pointer.
- Every set in the blast radius names its edge class.
