# @orkestrel/scaffold

Blueprint-to-plan package scaffolding, auditing, live dependency sync, and fleet
mirroring for the `@orkestrel` line.

## Install

```sh
npm install -D @orkestrel/scaffold
```

## Quickstart

```sh
# from a checkout (after npm run build)
node ./dist/bin/scaffold.js new mypackage --surfaces core --apply

# once installed
npx scaffold new mypackage --surfaces core --apply
```

Every verb is a **dry run by default** — nothing writes until you pass `--apply`,
and `new <name>` writes into `./<name>` under the current directory (`--target`
overrides the exact destination). Every write destination resolves under the
current directory — equal to it or nested beneath — so the CLI is safe to run
as a global command anywhere; `--host` may point anywhere (read-only).

**Windows/PowerShell:** invoke as `node ./dist/bin/scaffold.js …` or `npx scaffold …`
directly — PowerShell mangles npm's `--` passthrough, so avoid
`npm run scaffold -- …` there.

**TLS:** the CLI trusts the OS certificate store automatically, so `fetch` calls
succeed behind a corporate TLS-inspecting proxy the same way npm and browsers
do; `NODE_EXTRA_CA_CERTS` adds custom PEMs on top.

## CLI

```sh
scaffold new <name> [--apply] [--live]
scaffold sync
scaffold audit [--live]
scaffold repair [--apply] [--prune]
scaffold mirror [--root <dir>] [--apply]
scaffold catalog [--root <dir> ...] [--target <repo>] [--offline] [--apply]
```

- **`new <name>`** — drafts a `Blueprint` and compiles it into a `Plan`; dry-run by
  default (prints a review), `--apply` writes the package to disk, `--live` fetches
  each dependency's current guide + registry version instead of the vendored default.
- **`sync`** — refreshes vendored dependency mirrors and reports version drift for an
  existing package.
- **`audit`** — diffs a target against the plan its own manifest implies and reports
  drift as data; exits nonzero the moment any drift is found, so it gates CI cleanly.
  `--live` additionally checks upstream guide/version freshness.
- **`repair`** — re-derives the plan from the audit and re-applies only the drifted
  artifacts; dry-run by default, `--apply` writes the fixes, `--prune` also removes
  target-only files the plan no longer declares.
- **`mirror`** — propagates the line's shared, host-owned files (`AGENTS.md`,
  `CLAUDE.md`, `.claude/`, `scripts/`, the shared dotfiles, …) from this canonical
  repo to every `@orkestrel` repo under `--root`'s IMMEDIATE CHILDREN (default:
  the current directory; a write destination, so `cd` into the folder that
  CONTAINS your checkouts first — `repair` is the single-repo counterpart, run
  from inside one repo); dry-run by default, `--apply` writes.
- **`catalog`** — regenerates the orkestrel agent's package catalog; the npm
  registry is the AUTHORITATIVE package list by default (unauthenticated —
  every fleet repo is public), each `--root` ADDS local-only discoveries on
  top of it, `--offline` sources `--root`(s) only, and the table writes into
  `--target`'s `.claude/agents/orkestrel.md`; dry-run by default, `--apply`
  writes, and a shrink warning prints whenever the new table would have
  fewer rows than the currently-embedded one.

Every verb is dry-run by default — nothing touches disk until you pass `--apply`.

## Library

```ts
import { blueprint, createCompiler } from '@orkestrel/scaffold'

const draft = blueprint({ name: '@orkestrel/example', surfaces: ['core'] })
const compiler = createCompiler()
const plan = compiler.compile(draft)
```

`@orkestrel/scaffold/server` carries the impure surface — `createMaterializer`
(writes a `Plan` to disk) and `createSync` (the only part of the system that
touches the network, fetching dependency guides and registry versions).

## Guides

For the full surface, see [`guides/src/scaffold.md`](guides/src/scaffold.md).

## License

MIT © [Orkestrel](https://github.com/orkestrel) — see [LICENSE](./LICENSE).
