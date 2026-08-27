# @orkestrel/scaffold

Compile a workspace specification into an ordered list of files, compare that list to a real
directory, and write the difference.

Every `@orkestrel` repository shares one toolchain, one set of agent instructions, and one set of
root dotfiles. Scaffold ships that shared set as data inside the package and gives it verbs: create
a workspace from it, report how a workspace differs from it, and write the difference back.

The set splits by how a repository meets it. The tool surface is vendored: every target receives its
own copy, and the verbs write it and compare it. The instruction canon — the coding and orchestration
contracts, the rules, the skills, the templates, and the transport contracts — is published for
reading instead, from a scaffold checkout sitting beside the repository, or from
`node_modules/@orkestrel/scaffold/dist/host/` in the installed package. Every target carries the
`AGENTS.md` and `CLAUDE.md` pointers that name where to read it.

## Install

```sh
npm install --save-dev @orkestrel/scaffold
```

The executable needs Node 22.12 or later. Run it without installing anything:

```sh
npx @orkestrel/scaffold --help
```

## Verbs

Authority is the verb's: every verb except `audit` writes when it is typed, and no
option grants a write. Exit codes are `0` clean, `1` drift or failure, and `2` usage error.

`--target <path>` points any verb at another directory; the working directory is the default.
`--json` replaces the report with one machine-readable value on standard output.

### `new` — scaffold a workspace

```sh
npx scaffold new router --src core,server
```

Writes a complete workspace into `./router`: its manifest, its build configuration, empty barrels
for each selected environment, its tests, its documentation, the `AGENTS.md` and `CLAUDE.md`
pointers, and every vendored file. `--app` selects private application environments on an
independent axis, and `--deps` names `@orkestrel/*` runtime dependencies, each pinned to the
registry's latest release. `--bin` adds the command-line entry, its test, and its scoped build
configuration.

### `audit` — report how a target compares to its plan

```sh
npx scaffold audit --groups configs,orchestration
```

Writes nothing. Reports one row per path that differs, and exits `1` when anything does. Omit
`--groups` to cover every group.

### `repair` — write back what drifted

```sh
npx scaffold repair
```

Restores each planned path the target is missing or has let drift, then re-audits. A file the
workspace owns — its source, its own proofs, its README — is written once at creation and is never
rewritten here. Two paths are not owned that way: `tests/distribution.test.ts` is restored when it
is absent and left alone when the workspace has replaced it, and the manifest's script region is
rewritten when its chain is the one scaffold generated and refused without a write when it is not.

### `catalog` — refresh the package table and the guide mirrors

```sh
npx scaffold catalog --all
```

Reads the organization's published package list, rewrites the marker-bounded table in
`.claude/agents/orkestrel.md`, and fetches each package's guide into its local mirror. Without
`--all` it fetches only the guides the target declares as dependencies.

### `overwrite` — repair, catalog, delete, and re-pin

```sh
npx scaffold overwrite --dirty
```

Everything `repair` and `catalog` do, plus the steps only this verb carries: it deletes tracked
files the plan does not own, and it rewrites the `@orkestrel/*` ranges in the manifest to the
registry's latest releases. It needs a git repository, and it refuses a tree carrying uncommitted
changes unless `--dirty` waives that refusal.

## Library

The entry points split by host. `@orkestrel/scaffold` is host-independent: it compiles, gates, and
compares.

```ts
import { Compiler, createBlueprint } from '@orkestrel/scaffold'

const compiler = new Compiler()
const scaffolding = compiler.compile(createBlueprint('router', { src: ['core', 'server'] }))

scaffolding.plan?.artifacts // every planned file, in group order
scaffolding.questions // the advice the compile could not settle
compiler.destroy()
```

A plan says the workspace can be built. It does not decide whether to create it: a caller
creating a fresh workspace refuses on any question beside the plan, blocking or not, exactly as
`new` does. [`guides/scaffold.md`](guides/scaffold.md) states that rule and what it covers.

`@orkestrel/scaffold/server` is Node-only and holds everything that touches the filesystem or the
network: `Materializer` writes a plan into a target, `Upstream` reads the registry and
the guide host, and `WriteTransaction` stages and swaps a set of files with rollback.

```ts
import type { Plan } from '@orkestrel/scaffold'
import { Materializer } from '@orkestrel/scaffold/server'

declare const plan: Plan

const materializer = new Materializer()
const result = materializer.materialize(plan, './packages/router')

result.written // every path created
materializer.destroy()
```

## Guide

[`guides/scaffold.md`](guides/scaffold.md) documents every public export, the compile stages, the
vendored data root, and the generated file set.

## Notes

On Windows, run the executable as `npx scaffold …` or `node ./dist/bin/main.js …`. PowerShell
mangles npm's `--` passthrough, so avoid `npm run scaffold -- …` there.

## License

MIT © [Orkestrel](https://github.com/orkestrel) — see [LICENSE](./LICENSE).
