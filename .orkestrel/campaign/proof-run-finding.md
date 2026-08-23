# The emitted proof, run end to end for the first time

Measured 2026-08-23 against `/home/user/orkestrel/indexeddb` with the packed 0.0.50 candidate, after
deleting the presence-owned proof and letting `repair` write the regenerated one. Confirmed present
before running: `RUNTIME_CONDITIONS` 4, `isPackageTarget` 3, `BUNDLER_CONDITIONS` 3, `selectEntries`
2, and the `.node` extension.

## Result: one real failure

```text
FAIL |distribution| tests/distribution.test.ts > installed package consumer
     > compiles a consumer under every module resolution [requires the registry]
AssertionError: expected [ Array(1) ] to strictly equal []

+ [
+   "node16.cts: The current file is a CommonJS module whose imports will produce 'require' calls;
+    however, the referenced file is an ECMAScript module and cannot be imported with 'require'.
+    Consider writing a dynamic 'import(\"@orkestrel/indexeddb\")' call instead.",
+ ]

 Tests  1 failed | 5 passed | 2 skipped (8)
```

## Diagnosis: FIX-J's J3 activated a probe whose selector is wrong

`indexeddb` publishes no CommonJS support:

```json
{ "type": "module",
  "exports": { ".": { "types": "./dist/src/browser/index.d.ts",
                      "import": "./dist/src/browser/index.js",
                      "default": "./dist/src/browser/index.js" } } }
```

There is no `require` condition. But `entry.commonjs` is computed as "resolving the require condition
set yields a target", and `default` matches every set, so it is `true`. J3 then selects the `.cts`
compile probe by `entry.commonjs`, so an ESM-only package is compiled from a CommonJS consumer and
TypeScript correctly refuses it.

Before J3 the `.cts` probe selected `entry.module === false`, which excluded every package declaring
an `import` condition. That was wrong for a dual subpath — the defect J3 repaired — and accidentally
right for an ESM-only one. The repair traded one wrong selector for another.

**Runtime and typecheck disagree here, and both are right.** Node 22 loads it:

```text
  require(esm) -> OK, keys: 26
```

`require(esm)` landed in the v22 line, so the runtime drive passes. TypeScript's `node16` models a
package that declares no CommonJS support and refuses it. The proof reddens on the typecheck.

## Blast radius: every browser face in the fleet

| package | subpath with no `require` branch |
| ------- | -------------------------------- |
| `@orkestrel/indexeddb` | `.` |
| `@orkestrel/router` | `./browser` |
| `@orkestrel/console` | `./browser` |
| `@orkestrel/test` | `./browser` |
| `@orkestrel/mcp` | `./browser` |

The pattern names the rule: a browser face is ESM-only on purpose. Every other package and subpath
declares `require` and is unaffected. So this is not a defect in any of those packages — it is the
proof demanding CommonJS consumability from a face that deliberately has none.

## What the fix must establish

`entry.commonjs` must mean **the subpath is consumable from CommonJS**, not **something resolves
under require conditions**. `default` resolving is not a declaration of CommonJS support. The
selector wants either an explicit `require` condition or a require-resolved target that is CommonJS
by Node's format rules.

Deciding the exact predicate is objective work and belongs with the engine that wrote J3.

## Why this was only found now

The emitted proof executes nowhere in scaffold's own repository: scaffold's `tests/distribution.test.ts`
is bespoke and presence ownership leaves it alone. So J1 through J5 and L1 were all proved against
lifted pure functions. The FIX-J audit's subjective lane refused to confirm that no refusal had been
widened, named this exact probe as never having executed against a real installed tree, and said to
run it **before** the fleet re-propagates rather than after. That instruction is what turned an
eleven-target failure into a one-target reading.
