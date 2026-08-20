# SFIX-B report

SFIX-B stopped under the deviation contract. The owned changes close G1 through G6, align the generated toolchain ranges, widen the comparison, and add executable guide examples. The required `src:core` run remains red because toolchain-alignment expectations live in an off-limits test file, and because the sandbox refuses child processes used by template proofs.

## Files touched

- `guides/scaffold.md` narrows the parity claim to the checks that run, names the reader-owned and content-owned test paths, states the actual birth-write behavior, covers the scripted and ungated advisory branches, documents `DESTROYED`, and distinguishes failed lookups from cycles.
- `src/core/constants.ts` aligns `oxfmt` to `^0.64.0`, `oxlint` to `^1.79.0`, `vite` to `~8.2.1`, and `vitest` to `^4.1.11`, matching `package.json`.
- `tests/src/core/constants.test.ts` compares every generated dependency against the manifest. It retains the package self-pin exception, which the adjacent version assertion covers.
- `tests/guides.test.ts` executes the blueprint-default, compile-refusal, and error-code narrowing examples and checks their literal verdicts.
- `tmp/codex/sfixb-g3-target/` is the ignored scaffolded target used for G3. Its birth-owned `README.md` file was deleted for the reproduction and remains absent.
- `tmp/codex/sfixb-report.md` is this report.

## G3 reproduction

The target creation used the shipped executable and completed with exit code `0`:

```text
$ node dist/bin/main.js new sfixb-g3 --src core --target tmp/codex/sfixb-g3-target --json
exit code: 0
stdout began: {"target":"tmp/codex/sfixb-g3-target","written":["package.json","tsconfig.json","vite.config.ts"
stdout ended: "scripts/ollama.sh"],"skipped":[],"removed":[]}
```

The deletion and direct audit used these exact commands:

```text
$ rm tmp/codex/sfixb-g3-target/README.md
$ node dist/bin/main.js audit --groups docs --target tmp/codex/sfixb-g3-target --json
exit code: 0
```

The audit's exact `README.md` finding was:

```json
{"path":"README.md","group":"docs","ownership":"birth","drift":"aligned"}
```

The direct JSON output also ended with `"questions":[]`. This reading proves that a deleted birth-owned file remains absent and reports aligned.

## Rulings

### G1

Narrow the guide sentence rather than widen the gate. The guide contains backticked host globals, wire fields, external contracts, and TypeScript syntax that are not barrel exports. The guide now states that the suite checks Surface-table parity, method parity, relative links, and named imports in TypeScript fences. It states that arbitrary backticked prose spans and whole-fence typechecking remain outside that gate.

### T1 and the `oxfmt` direction

Move the base range up to the manifest. Scaffold installs `oxfmt` at `^0.64.0` and had handed a generated target `^0.62.0`. The same direction applies to `oxlint`, `vite`, and `vitest`. Moving the manifest down would discard the versions this repository declares and runs. The source ranges now match the manifest, and the comparison reaches scoped and unscoped package names.

### T2

The literal pure examples are closable without a fence framework. The guides suite now transcribes and executes blueprint defaults, compile refusal, and error-code narrowing. The remaining fences need fixtures for ambient values plus isolated filesystem and network drivers for examples that write or fetch. Those drivers are separate test capability, so the guide records that limit instead of claiming name resolution executes them.

## Planted divergence

The plant used this exact patch in the owned `src/core/constants.ts` file:

```diff
-	oxfmt: '^0.64.0',
+	oxfmt: '^0.64.1',
```

The repaired comparison rejected the plant:

```text
$ npx vitest run --config vite.config.ts --project src:core tests/src/core/constants.test.ts
exit code: 1
Test Files  1 failed (1)
Tests       1 failed | 3 passed (4)
Received: ["oxfmt: base ^0.64.1, manifest ^0.64.0"]
```

The plant was removed with the exact inverse patch:

```diff
-	oxfmt: '^0.64.1',
+	oxfmt: '^0.64.0',
```

The same comparison passed after removal:

```text
$ npx vitest run --config vite.config.ts --project src:core tests/src/core/constants.test.ts
exit code: 0
Test Files  1 passed (1)
Tests       4 passed (4)
```

## Acceptance evidence

### Birth-owned restore behavior

Exit code `0`. The G3 reproduction records the exact command and finding in the earlier section.

### Comparison mutation proof

The planted run exited `1` with `1 failed | 3 passed (4)`. The restored run exited `0` with `4 passed (4)`. The exact plant, inverse patch, commands, and readings appear in the earlier section.

### Manifest comparison

The comparison iterated every `BASE_DEV_DEPENDENCIES` key. It exempts the package name because the self-pin is checked against `package.json`'s version by the adjacent test and is not a development dependency.

```text
$ node --no-warnings -e "import('./src/core/constants.ts').then(({BASE_DEV_DEPENDENCIES})=>{const manifest=require('./package.json');for(const [name,range] of Object.entries(BASE_DEV_DEPENDENCIES)){if(name!==manifest.name&&manifest.devDependencies[name]!==range)console.log(name+': base '+range+', manifest '+String(manifest.devDependencies[name]))}})"
exit code: 0
stdout: <empty>
```

### Lint

```text
$ npm run lint:check
exit code: 0
> @orkestrel/scaffold@0.0.44 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

### Type checks

```text
$ npm run check
exit code: 0
> @orkestrel/scaffold@0.0.44 check
> tsc --noEmit --project tsconfig.json && npm run check:src
> @orkestrel/scaffold@0.0.44 check:src
> npm run check:src:core && npm run check:src:server && npm run check:src:bin
> @orkestrel/scaffold@0.0.44 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
> @orkestrel/scaffold@0.0.44 check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json
> @orkestrel/scaffold@0.0.44 check:src:bin
> tsc --noEmit -p configs/src/tsconfig.bin.json
```

### Core project

```text
$ npx vitest run --config vite.config.ts --project src:core
exit code: 1
Test Files  2 failed | 6 passed (8)
Tests       8 failed | 307 passed (315)
```

The owned range alignment changes the generated manifest, but off-limits `tests/src/core/compilers.test.ts` still expects the earlier digest and ranges:

```text
Expected: b96f5ba814a45d8b683eaf2d5b6e062827fa388cfcc78895e57c76fc72d5b99b
Received: 985b411df26f45c51548e15fc11017b0566c0df4992e435c47c2e2fa8146c750

- "oxfmt": "^0.62.0"
+ "oxfmt": "^0.64.0"
- "oxlint": "^1.77.0"
+ "oxlint": "^1.79.0"
- "vite": "~8.2.0"
+ "vite": "~8.2.1"
- "vitest": "^4.1.10"
+ "vitest": "^4.1.11"
```

Editing that test or its fixture would reach outside the owned list, so the deviation contract stopped the unit here.

### Guides project

The deviation contract stopped the ordered acceptance run before this gate. An earlier focused reading after the guide and test changes completed with this result:

```text
$ npx vitest run --config vite.config.ts --project guides
exit code: 0
Test Files  1 passed (1)
Tests       10 passed (10)
```

## Observations

The sandbox denied the nested CLI wrapper used to compact G3 output. The wrapper received empty stdout and its JSON parser failed:

```text
$ node -e "const {spawnSync}=require('node:child_process');const result=spawnSync(process.execPath,['dist/bin/main.js','audit','--groups','docs','--target','tmp/codex/sfixb-g3-target','--json'],{encoding:'utf8'});const audit=JSON.parse(result.stdout);console.log(JSON.stringify({status:result.status,finding:audit.findings.find((finding)=>finding.path==='README.md')}))"
exit code: 1
SyntaxError: Unexpected end of JSON input
```

The core project reported `spawnSync /opt/node22/bin/node EPERM` for the formatter fixed-point proof, the emitted browser configuration typecheck, and these browser-resolver proofs:

- publishing every name used by the emitted root configuration;
- ranking an operator override ahead of browser discovery;
- treating a pinned-revision miss as fallthrough;
- retaining Playwright launch defaults for an installed pinned revision.

These are sandbox-denied readings rather than source verdicts. The direct acceptance command still exits `1`, and the off-limits manifest expectations independently keep that command red.

## Unclosed work

The `src:core` acceptance command cannot reach exit code `0` within the owned file list. Its manifest digest and generated-manifest expectations require updates in `tests/src/core/compilers.test.ts` or the fixture that test reads. The sandbox-denied child-process proofs also cannot produce a passing reading in this unit. The ordered guides acceptance run did not execute after the stop condition.