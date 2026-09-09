# Guide API rules correction report

## Outcome

Complete within the successor brief. Guide is frozen for root formatting, ordered gates, packing,
and the installed Scaffold consumer proof.

The guide and concept index now precede and describe the server command. The core API publishes
`ParityResult`, `ParityExampleResult`, and `ParityRewriteResult`. `Parity.document()` and
`Parity.annotate()` select their authority explicitly and share the internal accumulation engine.
The pass-through `createParity` factory is gone.

The server API now uses `patterns` and `reader`. Its worker context supplies `root`, owned `files`,
joined `rows`, and `report`. `GuideRunnerFunction` returns `Promise<unknown>` and no Guide-owned
foreign lifecycle or result interfaces remain. The command validates the foreign runner members,
retains receivers for `start`, `close`, and module `state`, owns result collections before reading
them, and accepts extra members and class instances. Constants and argument parsing now live in
their centralized modules.

Package metadata now exports, checks, builds, and tests the server entry. Dependency ranges and
lockfiles are unchanged. Root-generated TypeScript and Vite configuration is unchanged.

## Touched paths

- `README.md`
- `guides/README.md`
- `guides/guide.md`
- `package.json`
- `src/core/Parity.ts`
- `src/core/factories.ts`
- `src/core/types.ts`
- `src/server/GuideCommand.ts`
- `src/server/constants.ts`
- `src/server/helpers.ts`
- `src/server/index.ts`
- `src/server/parsers.ts`
- `src/server/types.ts`
- `tests/guides.test.ts`
- `tests/setupServer.ts`
- `tests/src/core/Parity.test.ts`
- `tests/src/server/GuideCommand.test.ts`
- `tests/src/server/helpers.test.ts`
- `tests/src/server/parsers.test.ts`

## Defect proof

The permanent changing-getter control was added before the helper correction.

Command before and after the correction:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot --project src:server
```

Red result, exit `1`:

```text
Test Files  1 failed | 1 passed (2)
Tests  1 failed | 2 passed (3)
expected true to be false
```

Green result, exit `0`:

```text
Test Files  3 passed (3)
Tests  7 passed (7)
```

## Scoped validation

The real TypeScript project, including direct installed `readInventory` and `createVitest`
assignability, passed with exit `0` and no diagnostics:

```text
node node_modules/typescript/bin/tsc --noEmit -p tsconfig.json
```

Vitest transformation is not the type proof. The TypeScript command above is the assignability
receipt.

Scoped lint passed with exit `0`:

```text
node_modules\.bin\oxlint.cmd --config .oxlintrc.json --deny-warnings src\core\types.ts src\core\Parity.ts src\core\factories.ts src\server tests\guides.test.ts tests\src\core\Parity.test.ts tests\src\server tests\setupServer.ts
```

Core, server, and guide parity passed with exit `0`:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot --project src:core --project src:server --project guides

Test Files  13 passed (13)
Tests  691 passed (691)
```

The guide parity project was rerun after the concept index linked `tests/src/server`; it passed with
exit `0`:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot --project guides

Test Files  1 passed (1)
Tests  37 passed (37)
```

`package.json` parsed through Node with exit `0`.

## Root follow-through

The scoped format check identified formatting work in root-owned convergence. Root explicitly owns
formatting, ordered gates, packing, and installed downstream controls. No formatter was run after
that instruction.

The registered Probe call remains unavailable because it returned `Legacy protocol 2025-11-25
cannot represent a stream result`; no Probe receipt exists. The real TypeScript project supplied
the required contract reading instead.
