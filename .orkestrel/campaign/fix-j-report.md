## Changes

- J1 — [src/core/templates.ts](/home/user/scaffold/src/core/templates.ts:1171): added `.node` to `MODULE_EXTENSIONS`. [templates.test.ts](/home/user/scaffold/tests/src/core/templates.test.ts:1123) proves native addons are modules while `.wasm` remains an asset.
- J2 — [src/core/templates.ts](/home/user/scaffold/src/core/templates.ts:1198): `Entry` now carries import and CommonJS declarations independently. Resolution and runtime comparisons use the matching declaration at [templates.ts](/home/user/scaffold/src/core/templates.ts:1363) and [templates.ts](/home/user/scaffold/src/core/templates.ts:1644). The proof is at [templates.test.ts](/home/user/scaffold/tests/src/core/templates.test.ts:1141).
- J3 — [src/core/templates.ts](/home/user/scaffold/src/core/templates.ts:1372): format selection now uses `entry.module` for `.ts` and `entry.commonjs` for `.cts`, including dual entries in CommonJS probes at [templates.ts](/home/user/scaffold/src/core/templates.ts:1620). The proof is at [templates.test.ts](/home/user/scaffold/tests/src/core/templates.test.ts:1162).
- J4 — [src/core/templates.ts](/home/user/scaffold/src/core/templates.ts:1240): added package-target validation at array boundaries. Invalid targets fall through only inside fallback arrays; standalone invalid targets remain visible. The walkers apply it at [templates.ts](/home/user/scaffold/src/core/templates.ts:1301) and [templates.ts](/home/user/scaffold/src/core/templates.ts:1322). The proof is at [templates.test.ts](/home/user/scaffold/tests/src/core/templates.test.ts:1179).
- J5 — [src/core/templates.ts](/home/user/scaffold/src/core/templates.ts:1802): replaced the stale quoted predicate and its dependent sentence. The launcher and bundler clause is unchanged.

The J4 Node probe returned:

```text
array: {"from":"valid"}
single: ERR_INVALID_PACKAGE_TARGET
```

It also confirmed that dot, parent, and `node_modules` targets fall through, while later module-resolution failures do not.

## Firing controls

J1 control removed `.node`:

```text
$ npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:core tests/src/core/templates.test.ts -t "classifies native addon targets as modules"
AssertionError: expected [ false, false ] to strictly equal [ true, false ]
Test Files  1 failed (1)
Tests  1 failed | 20 skipped (21)
exit 1
```

After restoration:

```text
Test Files  1 passed (1)
Tests  1 passed | 20 skipped (21)
exit 0
```

J2 control resolved CommonJS through the import conditions:

```text
$ npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:core tests/src/core/templates.test.ts -t "resolves import and require declarations independently"
- "commonjs": "./x.d.cts"
+ "commonjs": "./x.d.mts"
- "commonjs": undefined
+ "commonjs": "./x.d.mts"
Test Files  1 failed (1)
Tests  1 failed | 20 skipped (21)
exit 1
```

After restoration:

```text
Test Files  1 passed (1)
Tests  1 passed | 20 skipped (21)
exit 0
```

J3 control restored `entry.module === module`:

```text
$ npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:core tests/src/core/templates.test.ts -t "includes dual entries in CommonJS compile probes"
AssertionError: expected [ [] ] to strictly equal [ [ './dual' ] ]
Test Files  1 failed (1)
Tests  1 failed | 20 skipped (21)
exit 1
```

After restoration:

```text
Test Files  1 passed (1)
Tests  1 passed | 20 skipped (21)
exit 0
```

J4 control removed array-target validation:

```text
$ npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:core tests/src/core/templates.test.ts -t "skips invalid package targets only inside fallback arrays"
- "./valid.cjs"
+ "../outside.cjs"
- "./valid.cjs"
+ "./x/../outside.cjs"
Test Files  1 failed (1)
Tests  1 failed | 20 skipped (21)
exit 1
```

After restoration:

```text
Test Files  1 passed (1)
Tests  1 passed | 20 skipped (21)
exit 0
```

## Guide sentences made false

[guides/scaffold.md](/home/user/scaffold/guides/scaffold.md:1461):

> The declaration is read under `['types', 'import']` and then under `['types', 'require']`.

[guides/scaffold.md](/home/user/scaffold/guides/scaffold.md:1462):

> Those condition sets are iterated rather than coalesced: a set that answers with JavaScript has resolved no declaration, so the next set is read rather than that answer returned.

[guides/scaffold.md](/home/user/scaffold/guides/scaffold.md:1468):

> A target is a runtime target when its own file name carries no extension at all, or carries `.js`, `.mjs`, or `.cjs`.

[guides/scaffold.md](/home/user/scaffold/guides/scaffold.md:1484):

> Classification reads every target the entry names under every condition, and every member of a fallback list with them: Node reads an array in an exports entry as a list of fallbacks, and a reader taking a later member takes a file the installed tree still owes.

## Verification and unclosed readings

Green:

```text
npx oxlint --config .oxlintrc.json --deny-warnings src/core/templates.ts tests/src/core/templates.test.ts
exit 0

npx oxfmt --config .oxfmtrc.json --check src/core/templates.ts tests/src/core/templates.test.ts
All matched files use the correct format.
exit 0

npm run check
exit 0

npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:core tests/src/core/templates.test.ts -t "emitted distribution classifier"
Test Files  1 passed (1)
Tests  6 passed | 15 skipped (21)
exit 0
```

The full scoped project remains a host reading:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/templates.test.ts
Test Files  1 failed (1)
Tests  6 failed | 15 passed (21)
exit 1
```

Every failure reports `spawnSync /opt/node22/bin/node EPERM`, matching the brief’s grandchild-process denial. Run that exact command on the host to settle it.

The required `prove` MCP invocation was attempted but did not execute:

```text
MCP tool call requires approval, but approval policy is never
```

No receipt was produced. This is the weak evidence I would flag; the executed mutation controls pass, but no `probe:<digest>` receipt or host-level full-project result exists in this executor. No whole-suite or distribution-proof run was taken.
---

## Orchestrator's integration note

The unit flagged its own weak evidence honestly: its sandbox denied the grandchild process the
scoped project needs, so every test reported `spawnSync EPERM` and it recorded the project run as an
observation for the host rather than closing it. That deferral was correct and it is what caught the
following defect.

**The host reading found one real failure the unit could not see.** `tests/src/core/templates.test.ts`
asserts the emitted corpus is an oxfmt fixed point — every artifact scaffold writes into a target is
already formatter-clean, because a target runs `format:check` over it. J2's new `declaration` object
literal was not:

```text
- 				module:
- 					declaration.module === undefined ? undefined : join(installed, declaration.module),
+ 				module: declaration.module === undefined ? undefined : join(installed, declaration.module),
```

The unit's own `oxfmt --check src/core/templates.ts` passed, because the template is a string literal
inside that file and the formatter does not reach into it. Left unfixed, every propagated target
would have gone red on its own `format:check`.

The Orchestrator brought the emitted literal to the formatter's own output. That edit is an
Orchestrator-written part of this unit and is audited as one.

**A stale-artifact error the Orchestrator made while diagnosing it**, recorded because it wasted a
cycle: the first two probes imported `dist/src/core/index.js` and reported the corpus clean, while
vitest compiles from `src/`. They were measuring the template as it stood before this unit changed
it. A probe that reads built output cannot rule on a change that has not been built.

After the correction:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/templates.test.ts
 Test Files  1 passed (1)
      Tests  21 passed (21)
exit: 0

npm run format:check = 0
npm run lint:check   = 0
npm run check        = 0
```

The authoritative tree-wide gates belong to an independent verifier and have not yet run.
