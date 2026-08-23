FIX-L is implemented in [templates.ts](/home/user/scaffold/src/core/templates.ts:1162) and [templates.test.ts](/home/user/scaffold/tests/src/core/templates.test.ts:1164).

## L1 — condition model

Each measurement uses its driver’s condition set:

- Node ESM runtime: `node-addons`, `node`, `import`, `module-sync`.
- Node CommonJS runtime: `node-addons`, `node`, `require`, `module-sync`.
- Node16 and NodeNext TypeScript ESM: `types`, `node`, `import`.
- Node16 and NodeNext TypeScript CommonJS: `types`, `node`, `require`.
- Vite production browser runtime: `module`, `browser`, `production`, `import`.
- Bundler TypeScript ESM and browser declarations: `types`, `import`.
- Bundler TypeScript CommonJS: `types`, `require`.

Browser detection remains output-prefix based, but the prefix is tested against the target resolved with browser-runtime conditions. Browser declarations are resolved separately with bundler conditions. A `require`-only entry remains available to CommonJS declaration and compile drives.

This matches Node’s default conditional-export keys, Vite’s production client conditions, and TypeScript’s resolution-specific conditions. [Node package conditions](https://nodejs.org/download/release/v22.22.0/docs/api/packages.html), [Vite `resolve.conditions`](https://vite.dev/config/shared-options#resolve-conditions), [TypeScript module resolution](https://www.typescriptlang.org/docs/handbook/modules/reference).

### Firing-control transcript

Control mutation: restore the defective Node runtime sets to `import` or `require`, and restore Node declaration sets to `types` plus the format condition. Leave browser conditions unchanged.

Command:

```text
npx vitest run --project src:core tests/src/core/templates.test.ts -t "resolves Node and browser exports under each driver's conditions"
```

Real red output:

```text
RUN  v4.1.11 /home/user/scaffold

❯ |src:core| tests/src/core/templates.test.ts (22 tests | 1 failed | 21 skipped)
    × resolves Node and browser exports under each driver's conditions

FAIL  |src:core| tests/src/core/templates.test.ts > emitted distribution classifier > resolves Node and browser exports under each driver's conditions
AssertionError: expected [ …(6) ] to strictly equal [ …(6) ]

- Expected
+ Received

  [
    {
      "browser": "./default.d.ts",
-     "commonjs": "./node.d.cts",
-     "module": "./node.d.mts",
+     "commonjs": "./default.d.ts",
+     "module": "./default.d.ts",
    },
-   "./node.mjs",
-   "./node.cjs",
+   "./default.js",
+   "./default.js",
    "./browser.js",
    "./default.d.ts",
    "./default.js",
  ]

Test Files  1 failed (1)
Tests       1 failed | 21 skipped (22)
```

After restoring the condition model, the same command produced:

```text
RUN  v4.1.11 /home/user/scaffold

Test Files  1 passed (1)
Tests       1 passed | 21 skipped (22)
```

The empty-condition control resolved `./default.js`, proving the walker still resolves the fallback rather than returning nothing.

## L2 — emitted comments

- `MODULE_EXTENSIONS`

  Old: “The extensions a JavaScript runtime loads a file as a module through.”

  New: “The extensions a JavaScript handler loads as modules. Node loads a native addon through its addon handler instead, so that extension is named separately.”

- Condition model

  Old: “The condition sets a consumer's TypeScript reads a subpath's types through, in the order a declaration is looked for.”

  New: “Each runtime target is resolved with the conditions its driver supplies. Node enables its platform, addon, and synchronous-module conditions. Vite's production client build enables its module and browser conditions instead.”

  New companion: “TypeScript's Node resolutions add `node` to the format condition. Its bundler resolution does not, so a browser drive compares against the declaration a bundler consumer reads rather than borrowing the Node declaration.”

- `Entry` declaration field

  Old: “the declaration its types condition names”

  New: “the declarations its consumer formats name”

- Fallback resolution

  Old: “its first resolving member wins”

  New: “its first valid resolving member wins”

- Fallback target collection

  Old: “Every file an entry can resolve to under any condition, which is the set the installed tree owes a file for. Every member of a fallback list is one of them: a reader that takes a later member takes a file this tree still owes.”

  New: “Every target an entry names under any condition. A fallback list omits members Node rejects during package-target validation, because no reader can take them.”

- Module classification

  Old: “Every other extension is an asset a consumer reads rather than imports — a stylesheet, a WebAssembly binary, the `"./package.json"` manifest pointer, and a declaration alike — which is what separates a published `.wasm` from an extensionless module.”

  New: “Node loads `.node` through its native-addon handler. Every other extension is an asset a consumer reads rather than imports — a stylesheet, a WebAssembly binary, the `"./package.json"` manifest pointer, and a declaration alike.”

- `readDeclaration`

  Old: “The declaration an entry publishes, read under each condition set a consumer's own TypeScript resolves types through. A `require`-only subpath declares its types inside `require`, so an `import`-only lookup reports a correctly typed subpath as undeclared. A set whose `default` branch answers with JavaScript resolved no declaration, so the next set is read rather than that fallthrough returned.”

  New: “The declarations the Node module, Node CommonJS, and browser drives compare against. Each field uses the conditions of the TypeScript consumer paired with that runtime, and a JavaScript fallback resolves to absence rather than types.”

- Installed-tree direction

  Old: “every claim below is read”

  New: “every following claim is read”

- Shell-argument direction

  Old: “Every argument below is a literal”

  New: “Every following argument is a literal”

- Walker direction

  Old: “the walkers below need”

  New: “the following walkers need”

- Unreachable-entry direction and semantics

  Old: “A driven subpath answers a Node condition. One resolving a declaration and neither an `import` nor a `require` target compiles for a consumer and throws when that consumer loads it, and each drive below retires itself for it, so it is named here rather than counted as driven.”

  New: “A driven subpath answers a runtime condition. One resolving a declaration and no Node or browser target compiles for a consumer and throws when that consumer loads it. Each later drive retires itself for that entry, so this assertion names the subpath rather than counting it as driven.”

- Browser-guard direction

  Old: “The Node `it.runIf` predicates below retire each matching Node drive for a face published later, which leaves nothing measuring it.”

  New: “The later Node `it.runIf` predicates retire each matching Node drive for a face published later, which leaves nothing measuring it.”

## L3 — structural findings

- Positional declaration conditions: closed. Keyed `module`, `commonjs`, and `browser` fields replaced positional access and unreachable `?? []` defaults.

- Late browser declaration guard: closed. The browser-specific declaration is read and validated before `resolveBrowser`, `launchBrowser`, or `bundleEntry`.

- Duplicate classifier drivers: closed by retaining the necessary boundary and stating it in code. `driveModule` exercises a real Node module through JSON, where `undefined` becomes `null`. `driveClassifier` preserves `undefined` in an isolated VM. Classifier callbacks and calls are synchronous; their added `async` and `await` ceremony was removed.

## Guide sentences falsified by L1

> “Another assertion beside it names every driven subpath whose entry resolves neither an `import` target nor a `require` target: each drive retires itself for such a subpath, so membership of the partition alone would leave one measured by nothing.”

> “A subpath is driven when its entry resolves a declaration: the proof imports it, requires it where the entry declares a `require` condition, and compiles a consumer against it under every module resolution.”

> “The declaration is read under `['types', 'import']` and then under `['types', 'require']`.”

> “Those condition sets are iterated rather than coalesced: a set that answers with JavaScript has resolved no declaration, so the next set is read rather than that answer returned.”

> “That is what drives a `require`-only subpath declaring its types inside `require`.”

## Unresolved readings and settling commands

Scoped Oxlint, scoped Oxfmt, and `npm run check` exited `0`.

OBSERVATION: `npx vitest run --project src:core` reached the documented sandbox boundary. Its in-process tests passed, while the emitted-corpus formatter test, emitted typecheck, and browser-resolver process tests failed with `spawnSync /opt/node22/bin/node EPERM`. The recorded reading was `348 passed` and `6 failed`. Settle on the host with:

```text
npx vitest run --project src:core
```

The extracted rendered core and browser proofs passed direct `oxfmt --check`. Its deliberately malformed control exited `1`. Those temporary probes were removed from `tmp/fix-l/`.

The formal `mcp__probe__prove` receipt is unavailable because the tool call required approval while approval policy was `never`. Settle that receipt by rerunning `mcp__probe__prove` for project `src:core`, case `resolves Node and browser exports under each driver's conditions`, using the recorded condition rollback as the mutation.

## Weak claims

The direct rendered-proof formatter evidence covers the core and browser variants. It is weaker than the blocked emitted-corpus project test and is not presented as a substitute for the host run.
---

## Orchestrator's integration note

The unit again reported its sandbox boundary rather than working around it: six tests failed
`spawnSync EPERM` inside the bench and it named the settling command instead of ruling on them. That
is the second time in this campaign the deferral was correct, and the first time it caught a real
defect.

Host reading, taken after the unit exited:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core
 Test Files  8 passed (8)
      Tests  354 passed (354)
exit: 0
```

All six pass on the host, including the emitted-corpus formatter test that caught FIX-J's
unformatted literal. Gate chain at this tree:

```text
npm run format:check = 0
npm run lint:check   = 0
npm run check        = 0
npm run build        = 0
```

The `prove` receipt the unit could not produce is unavailable to it by configuration rather than by
its own omission: the tool requires approval and the bench runs with approval policy `never`. The
executed mutation control stands in its place for L1, and it is a real control — the condition
rollback reddened the one test naming the property and greened on restoration.

The whole suite and the distribution proof have not run. Those belong to an independent verifier and
to the single-target proof run that precedes the fleet sweep.
