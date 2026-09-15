# Unit G7 — scout `@orkestrel/scaffold` for a fleet-wide duplicate-export policy gate and hosted guides

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached as the Cursor CLI in print mode. You are the
bench engine reading this brief inside your own CLI: perform the assignment directly and spawn
nothing. This lane is READ-ONLY. No web is needed. Every path is absolute.

## Objective

Return the distilled evidence the Orchestrator needs to design one scaffold change:

> A vendored policy test that fails a target package when any export of its own `src/**` barrels
> or any helper exported from its `tests/setup*.ts` modules carries a name that another
> `@orkestrel/*` package already exports (read from the package guides' `## Surface` tables), and
> the hosting of every package guide inside scaffold's published `dist/host` so that test reads
> the surfaces offline from the installed scaffold.

The user's instruction (verbatim): "scaffold has the guides for all packages it should be able to
run that check and it should have all the guides as it's hosted files since it should be able to
provide them when access to guides is offline." An example the user named: `createChannel` is
exported by `@orkestrel/agent` (`agent/src/core/factories.ts:600`) and by `@orkestrel/test`'s
browser entry, which the user counts as a conflict to catch.

## Where to read (the scaffold checkout: `C:/Users/mikes/WebstormProjects/scaffold`)

1. `package.json` (`files`, `bin`, `exports`, scripts), `vite.config.ts`, `configs/**`, and every
   script under `scripts/` that assembles `dist/host` — how the hosted file set is built, what it
   contains today, and where its inventory is declared (a manifest, a list, a directory copy).
2. `src/**` — the CLI commands (`repair`, `audit`, `catalog`, and any `guides` or `mirror`
   command): which files `repair` writes into a target, how `audit` reads drift, how `catalog`
   regenerates the package table, and how the `guides/*.md` mirrors are fetched or refreshed.
   Cite the command implementation `file:line` and the inventory it reads.
3. `guides/` — the mirror set: how many files, which packages, whether every published
   `@orkestrel/*` package has one, the exact shape of a `## Surface` table row (columns, how an
   export name is written, how environment entries such as `browser` and `server` are marked),
   and any guide whose Surface deviates from the common shape.
4. `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts` — the vendored policy
   set: how a policy rule is declared, how a sweep reads the target's files, how it names paths,
   what it may import (the vendored-file import law in `.claude/rules/workspace.md`), whether it
   may read `node_modules/@orkestrel/scaffold/dist/host/**` from a target, and how it reports a
   failure. Name the existing rules that read Markdown or barrel exports as the closest pattern.
5. `.claude/rules/workspace.md` § vendored files, `.claude/rules/tests.md` § policy, and
   `.agents/orchestration.md` § "Publishing the fleet" — the laws that bind a vendored-set change
   (bump, propagation through `repair`, what a target may not edit).
6. Any existing mechanism that already enumerates a package's exports (a barrel reader, the guide
   parity command in `@orkestrel/guide` — `C:/Users/mikes/WebstormProjects/guide/src/**` if
   useful) that the policy could reuse rather than re-parse.

## Return shape (and nothing else)

```
Question: <one sentence>

Evidence:
1. Hosted set: <what dist/host contains, how it is assembled, file:line; whether guides/ is in it>
2. Commands: <repair / audit / catalog / guide-refresh — file:line, inputs, outputs>
3. Guides: <count, coverage vs the catalog, the Surface row shape with one verbatim row, deviations>
4. Policy set: <how a rule is declared and swept, file:line; closest existing rule; import law;
   whether a target can read the installed scaffold's dist/host>
5. Laws: <the vendored-set change obligations, file:line>
6. Reuse: <existing export enumerators, file:line>

Design-bearing facts: <the five facts a designer of this gate most needs, each with file:line>

Unknowns: <what you could not decide and what would settle it>
```
