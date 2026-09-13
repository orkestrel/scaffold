# @orkestrel/scaffold

> A compiler that turns a workspace specification into an ordered list of files, compares that list
> to a real directory, and writes the difference.

## Install

```sh
npm install --save-dev @orkestrel/scaffold
```

The executable needs Node 22.18.0 or later. Run it without installing anything:

```sh
npx @orkestrel/scaffold --help
```

## Verbs

Authority is the verb's: every verb except `audit` writes when it is typed, and no option grants a
write. The guide's [Command line](guides/scaffold.md#command-line) section specifies each verb, its
options, its defaults, and the exit codes.

- `new` writes a whole workspace into a target that holds nothing the plan would collide with.
- `audit` writes nothing, and reports one row per path that differs.
- `repair` writes each planned path the target is missing or has let drift, and the manifest's range
  and script regions.
- `catalog` rewrites the package table in the target's catalog agent file, and refetches the guide
  mirrors.
- `overwrite` does everything `repair` and `catalog` do, then deletes what the plan does not own and
  re-declares the dependency ranges.

## Library

The entry points split by host. `@orkestrel/scaffold` is host-independent: it compiles, gates, and
compares. `@orkestrel/scaffold/server` is Node-only and holds everything that touches the filesystem
or the network: `Materializer` writes a plan into a target, `Upstream` reads the registry and the
guide host, and `WriteTransaction` stages and swaps a set of files with rollback.

```ts
import { Compiler, createBlueprint } from '@orkestrel/scaffold'

const compiler = new Compiler()
const scaffolding = compiler.compile(createBlueprint('router', { src: ['core', 'server'] }))

scaffolding.plan?.artifacts // every planned file, in group order
scaffolding.questions // the advice the compile could not settle
compiler.destroy()
```

A plan says the workspace can be built. It does not decide whether to create it: a caller creating a
fresh workspace refuses on any question beside the plan, blocking or not, exactly as `new` does.

## Guide

[`guides/scaffold.md`](guides/scaffold.md) documents every public export, the compile stages, the
vendored data root, and the generated file set.

## Notes

The `scaffold new` command generates a workspace that declares an npm floor of 11.6.0 in its
`devEngines` record. An npm at 10.9.0 or later and earlier than 11.6.0 refuses the `npm install`
command there with the `EBADDEVENGINES` code, before resolving the dependency graph.
npm 10.5.0 and npm 10.8.3, the releases measured earlier than 10.9.0, ignore the record and fail
inside dependency resolution instead.
No Node release the executable supports bundles an npm earlier than 10.9.0. Read the ambient
version with the `npm --version` command. Raise it with the `npm install --global npm@11.6.0`
command, or a later release, before the first install.
These readings come from a Linux host, on 2026-09-13.

On Windows, run the executable as `npx scaffold …` or `node ./dist/bin/main.js …`. PowerShell
mangles npm's `--` passthrough, so avoid `npm run scaffold -- …` there.

## License

MIT © [Orkestrel](https://github.com/orkestrel) — see [LICENSE](./LICENSE).
