# @orkestrel/scaffold

Blueprint-to-plan package scaffolding, auditing, dependency guide/version
pulling, and fleet-wide shared-file upkeep for the `@orkestrel` line.

## Install

```sh
npm install -D @orkestrel/scaffold
```

## Quickstart

```sh
# from a checkout (after npm run build)
node ./dist/bin/scaffold.js new

# once installed
npx scaffold new
```

Run any verb **bare** on a terminal and it guides you: it prompts for whatever's
missing, previews what it's about to do, and ASKS before writing anything
(destructive extras like `--prune` are a second, separate question) — hit
ctrl-c at any prompt and nothing is written. Prefer scripting instead? Every
flag from the guided flow works standalone:

```sh
npx scaffold new mypackage --surfaces core --apply
```

In scripts and CI, every verb is dry-run by default and fully non-interactive —
add `--apply` and/or `--yes` to make it write, `--json` for one machine-readable
value instead of prose. Every write destination resolves under the current
directory — equal to it or nested beneath — so the CLI is safe to run as a
global command anywhere; `--from` may point anywhere (read-only).

**Windows/PowerShell:** invoke as `node ./dist/bin/scaffold.js …` or `npx scaffold …`
directly — PowerShell mangles npm's `--` passthrough, so avoid
`npm run scaffold -- …` there.

**TLS:** the CLI trusts the OS certificate store automatically, so `fetch` calls
succeed behind a corporate TLS-inspecting proxy the same way npm and browsers
do; `NODE_EXTRA_CA_CERTS` adds custom PEMs on top.

## CLI

```sh
scaffold new [name] [--surfaces <list>] [--deps <list>] [--apply] [--yes] [--json]
scaffold pull [--apply] [--yes] [--json]
scaffold audit [--live] [--json]
scaffold repair [--prune] [--apply] [--yes] [--json]
scaffold fleet [--apply] [--yes] [--json]
scaffold catalog [--from <path> ...] [--target <repo>] [--offline] [--apply] [--yes] [--json]
```

Run bare, every verb above guides you interactively; the flags shown are the
scripting form. Exit codes: `0` clean/success, `1` drift or failure, `2` usage
error.

- **`new [name]`** — drafts a `Blueprint` and compiles it into a `Plan`; dry-run by
  default (prints a review), `--apply` writes the package to disk. `--deps` names
  `@orkestrel/*` runtime dependencies (installed as `dependencies`), resolving an
  absent `@range` to the registry's `latest`; run bare on a terminal, it lands as an
  interactive question. Other npm packages are not a `new`-time flag — hand-add them to
  the generated `package.json`'s `devDependencies` after scaffolding; `audit` derives
  its plan from your `package.json` and stays clean over the addition.
- **`pull`** — fetches the latest vendored dependency guides and registry versions
  for an existing package and reports drift.
- **`audit`** — a conformance report over the artifacts the plan actually gates: the
  shared template-owned files (presence, or content once hydrated) AND the generated
  configs/manifest (content); reports drift as data, findings and all; exits nonzero
  the moment any drift is found, so it gates CI cleanly. Starter files — source/test
  stubs, starter guides, README — are written once at scaffold time and are
  legitimately outgrown, so they are birth-only and never audited; the build and
  parity gates police their substance instead. `--live` additionally checks upstream
  guide/version freshness — `audit` is the ONLY verb that carries `--live`.
- **`repair`** — restores the shared HOST set only (generated source/tests/configs are
  never touched); re-derives the plan from the audit and re-applies only the drifted
  host artifacts; dry-run by default, `--apply` writes the fixes, `--prune` also removes
  target-only files the plan no longer declares (asked as a separate destructive
  question when run bare).
- **`fleet`** — audits/repairs the shared, host-owned files (`AGENTS.md`,
  `CLAUDE.md`, `.claude/`, `scripts/`, the shared dotfiles, …) across every
  `@orkestrel` repo that is an IMMEDIATE CHILD of the current directory — no root
  flag; the scope is always your checkouts folder, so `cd` there first (`repair`
  is the single-repo counterpart, run from inside one repo); dry-run by default,
  `--apply` writes.
- **`catalog`** — regenerates the orkestrel agent's package catalog; the npm
  registry is the AUTHORITATIVE package list by default (unauthenticated —
  every fleet repo is public), each `--from <path>` ADDS local-only discoveries
  on top of it, `--offline` sources the `--from` path(s) only, and the table
  writes into `--target`'s `.claude/agents/orkestrel.md`; dry-run by default,
  `--apply` writes, and a shrink warning prints whenever the new table would
  have fewer rows than the currently-embedded one.

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
