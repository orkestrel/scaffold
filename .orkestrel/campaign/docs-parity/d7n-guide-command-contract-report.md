# Guide server contracts checkpoint

## Outcome

Expected: define the authoritative Guide server command contracts, then continue under a real
generated `src:server` project.

Found: Guide has only the generated core project. The checkout has no
`configs/src/tsconfig.server.json`, no `configs/src/vite.server.config.ts`, no `src:server` Vitest
project, no `check:src:server`, `test:src:server`, or `build:src:server` script, and no
`@orkestrel/guide/server` alias or package export.

Done: added `src/server/types.ts` with `GuideCommandInterface`, `GuideCommandOptions`,
`GuideCommandContext`, the registration/read/runner function contracts, and the narrow runner
lifecycle/result contracts. The result keeps Vitest's external `testModules` and
`unhandledErrors` field names and documents their provenance. Guide core and all baseline dirty or
staged paths are unchanged by this unit.

Not done: implementation, tests, barrel, package metadata, and documentation remain frozen until
root propagates the real server project. No local stand-in configuration was created.

Hypothesis: the ready Scaffold Compiler + Materializer carrier will supply the missing project
without changing Guide's package metadata or server barrel.

## Root needs

Run the authored server-config carrier after `src/server/types.ts` exists. Its preview and apply
must generate the server TypeScript/Vite configuration and server test-project wiring while
preserving Guide's birth-owned `package.json` file and `src/server/index.ts` file for the resumed
unit.

After propagation, run this real project proof before resuming implementation:

```text
npm run check:src:server
```

The resumed unit will put direct assignments of installed `readInventory` and `createVitest` to
the published port types under that project. Root must run the same command and return its actual
diagnostics. If registered Probe refuses its stream, that refusal is an observation rather than
assignability evidence.

## Touched path

- `C:/Users/mikes/WebstormProjects/guide/src/server/types.ts`

## Executed evidence

- `git -C C:/Users/mikes/WebstormProjects/guide status --short` showed the pre-existing dirty and
  staged core, guide, and test paths. The later path-scoped reading reported
  `?? src/server/types.ts`.
- `rg --files src tests configs guides | Sort-Object` showed the core-only project and the missing
  server files named in the finding.
- `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check src/server/types.ts` under explicit Git
  Bash emitted no output and did not return before the 30-second tool window. The command was
  interrupted and returned exit `1`; it establishes no formatter result.
- The earlier scoped formatter, linter, and `git diff --check` launch yielded empty output without
  terminal exit receipts. No pass claim rests on those launches.

## Freeze

Guide is frozen at this contracts checkpoint. No acceptance belongs to this role.
