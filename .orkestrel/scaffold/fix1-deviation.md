# Scaffold readiness fix unit 1 report

## Deviation

Expected: SR13 permits every factory consumer required by the acceptance sweep to be updated.

Found: the owned test scope is `tests/src/`, while factory consumers also exist in `tests/guides.test.ts` and `tests/distribution.test.ts`. The acceptance command covers all of `tests/` and cannot return no hit through owned files alone.

Exact evidence:

```text
$ rg -n "createCompiler|createMaterializer|createUpstream" tests/guides.test.ts tests/distribution.test.ts
tests/guides.test.ts:15:import { createBlueprint, createCompiler, isScaffoldError, ScaffoldError } from '@src/core'
tests/guides.test.ts:178:		const compiler = createCompiler()
tests/distribution.test.ts:55:				"createCompiler().audit(blueprint, {}).findings.every(({ drift }) => drift === 'missing') // true",
tests/distribution.test.ts:449:				"createCompiler().audit(blueprint, {}).findings.every(({ drift }) => drift === 'missing') // true answered false",
tests/distribution.test.ts:502:				"dist/src/core/index.d.ts: createCompiler().audit(blueprint, {}, ['manifest']).findings[0]?.drift",
tests/distribution.test.ts:534:				'const compiler = core.createCompiler()',
tests/distribution.test.ts:538:				`const materializer = server.createMaterializer({ host: ${JSON.stringify(resolve(root, 'dist/host'))} })`,
tests/distribution.test.ts:599:						"import { createBlueprint, createCompiler } from '@orkestrel/scaffold'",
tests/distribution.test.ts:600:						"import { createMaterializer } from '@orkestrel/scaffold/server'",
tests/distribution.test.ts:602:						'const compiler = createCompiler()',
tests/distribution.test.ts:606:						'const materializer = createMaterializer()',
```

Done or not done: not done. The product tree is unchanged. The red proof, contract edit, implementation, consumer updates, guide updates, and gates did not run because the deviation contract requires the writer to stop on this primary-objective conflict.

Hypothesis: the owned test scope was intended to include the root cross-cutting tests named by the consumer sweep and acceptance command.

## SR13 consumer sweep

Pattern: `createCompiler|createMaterializer|createUpstream`

Paths searched: `src/`, `tests/`, `guides/`, `README.md`, and `bin/`.

The sweep found consumers in `README.md`, `src/bin/CLI.ts`, `src/core/compilers.ts`, `src/core/Compiler.ts`, `src/core/factories.ts`, `src/server/factories.ts`, `tests/guides.test.ts`, `tests/distribution.test.ts`, `tests/src/core/Compiler.test.ts`, `tests/src/core/validators.test.ts`, `tests/src/core/templates.test.ts`, `tests/src/server/factories.test.ts`, and `guides/scaffold.md`. The barrel exports arise from `src/core/index.ts` and `src/server/index.ts` star-exporting their factory modules.

## SR14 contract

No signature or derivation-compare shape landed.

## Red and green readings

No red or green reading ran because no test could be added after the required deviation stop.

## Flagged claim

The hypothesis about intended ownership is not verified.

## Review evidence

```text
$ git status --short
```

```text
$ git diff --stat
```

## Diffstat

```text
$ git diff --stat
```
