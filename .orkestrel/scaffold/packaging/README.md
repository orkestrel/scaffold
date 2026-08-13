# Testing what a package actually distributes

A proposal and a working prototype. **This is not a convention yet and scaffold does not propagate
it.** It is kept here so the idea and the code survive the campaign that produced them.

Every `.ts`, `.mjs` and `.cjs` file in this folder carries a trailing `.txt`, so the workspace's
typecheck, lint, format and placement sweeps ignore it. Strip the extension when adopting.

## The question it answers

What you develop and what you ship are different sets of files. A repository has thousands; the
`files` field selects a handful. `@orkestrel/mcp` ships 18 entries. Everything else — `src/`,
`tests/`, `configs/`, `node_modules/` — never leaves the machine.

That gap holds a class of defect no other test can reach: a path the `exports` map names but the
tarball omits, a declaration importing a file that was excluded, a subpath that resolves in the
repository and not in the package. The whole suite passes, because the suite runs where every file
is present.

**This is not hypothetical.** `@orkestrel/database@0.0.8` shipped a browser declaration importing
`../../core/index.ts`, which resolves outside the tarball. Its 1010 tests passed. A consumer
typechecking against it got eight `TS2307`s. A proof of this shape catches that before publication.

## The one rule that makes it real

**Install the packed tarball. Never link the workspace root.**

The prototype this folder came from originally did the second thing — `symlink(root, packagePath)` —
while its own comment claimed it packed. A link resolves the entire repository, so every path `files`
excludes still answers, and the proof cannot fail for the omission it exists to catch. It was
structurally incapable of finding the `database` defect it was best positioned to find.

`npm pack` writes the exact archive `npm publish` uploads. Install that file.

## Falsification, which is what proved the prototype

Narrow `files` so a shipped path leaves the tarball, then run the proof. It must go red, carrying
npm's own resolution error:

```
FAIL > serves the core, server, and browser faces to an ESM consumer
  Error: Cannot find module '.../node_modules/@orkestrel/mcp/dist/src/server/index.cjs'
FAIL > resolves every shipped declaration for a strict TypeScript consumer
  consumerTypes.ts(13,44): error TS2307: Cannot find module '@orkestrel/mcp/browser'
```

Restore `files`, and it returns to green. Any implementation that cannot produce that pair has not
been shown to beat the link it replaced.

## What the prototype covered

Five claims, each against the installed tarball rather than the repository:

| Claim                                                               | Why it needs a real install                                                   |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| An ESM consumer reaches core, server, and browser faces             | Proves the `exports` map's `import` conditions resolve to shipped files       |
| A CommonJS consumer reaches core and server, and is refused browser | Proves dual-format packaging, and that an ESM-only face stays ESM-only        |
| A strict TypeScript consumer resolves every declaration             | Proves the `types` conditions point at shipped `.d.ts` files                  |
| An undeclared subpath rejects with `ERR_PACKAGE_PATH_NOT_EXPORTED`  | Proves the map denies what it does not name                                   |
| A deliberately wrong assignment fails with `TS2322`                 | The control: proves the compiler was actually running and reading these types |

The last row matters most. Without it, a typecheck that silently resolved nothing would pass.

## Where it does NOT belong

Not in `tests/integration.test.ts`. An integration test is an end-to-end test — the package's
features composed and driven together, across environments at the top level and within one
environment for a nested one. What the tarball contains is a different question, and putting it at
the canonical integration path is what produced the mistake this folder documents.

If adopted, it needs its own name, its own project, and its own row in the cross-cutting proof table
— out of the default run, required by `prepublishOnly`, because it packs and installs and costs
seconds.

## Files here

| File                      | Was                                                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `packaging.test.ts.txt`   | the proof itself, five cases                                                                                         |
| `setupPackaging.ts.txt`   | the machinery: `packWorkspace`, `createConsumer`, `runConsumer`, `compileConsumer`, `readRange`, and their constants |
| `consumerImport.mjs.txt`  | ESM consumer program                                                                                                 |
| `consumerRequire.cjs.txt` | CommonJS consumer program                                                                                            |
| `consumerSubpath.mjs.txt` | undeclared-subpath control                                                                                           |
| `consumerTypes.ts.txt`    | strict typed consumer                                                                                                |
| `consumerError.ts.txt`    | deliberate-error control                                                                                             |

## Notes for whoever implements it

Each was measured, not assumed.

- **The consumer programs must be inert text.** The root `tsconfig.json` declares no `include`, so it
  compiles every `.ts` in the workspace — a deliberately-failing consumer cannot exist as `.ts`.
  `.cjs` is not safe either; oxlint rejects `require()` with `no-require-imports` and
  `no-unassigned-import`. Hence `.txt` on all of them, copied to their real name at run time.
- **`expect(actual, message)` is refused** by this lint config (`vitest(valid-expect)`). Carry the
  diagnostic by asserting on an interpolated `${stderr}${stdout}` instead — which is also what puts
  npm's resolution error into the failure output.
- **It needs a reachable registry**: installing the tarball fetches runtime dependencies and peers.
  Do not hide that behind a conditional skip. A silently skipped publish gate is worse than a loud
  one, and `prepublishOnly` already requires the network.
- **Where scaffold would have to change**: a new exact-case path constant, a `Blueprint` boolean, its
  detection in `CLI.#derive`, a `CONFIG_TEMPLATES.factories` key, the script, and the
  `prepublishOnly` entry — the same shape `conformance` and `service` took in 0.0.28. Note that
  `repair` does not write `package.json`, so the script has to arrive another way or the project is
  registered and reachable from no gate.
