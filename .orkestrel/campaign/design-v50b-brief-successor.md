# Successor to the setup-proof and browser-stage design brief

Two of the brief's three unknowns are settled by measurement taken 2026-08-23. Both lanes receive
this identical text. The brief is otherwise unchanged.

## Settled: a browser face is not a `./browser` subpath

Derived from the committed `fleet-census.json` by testing each export target against
`dist/src/<environment>/`, over all 48 packages.

| Package     | Browser subpath | Declared conditions      |
| ----------- | --------------- | ------------------------ |
| `console`   | `./browser`     | `default`, `import`, `types` |
| `database`  | `./browser`     | `default`, `import`, `types` |
| `indexeddb` | `.`             | `default`, `import`, `types` |
| `mcp`       | `./browser`     | `default`, `import`, `types` |
| `router`    | `./browser`     | `default`, `import`, `types` |
| `test`      | `./browser`     | `default`, `import`, `types` |
| `workflow`  | `./browser`     | `default`, `import`, `types` |

`indexeddb` publishes its browser face at the **root** subpath. A stage that selects the browser
branch by subpath name misses it entirely and would then drive a browser bundle through Node.
Selection must read the export **target** path against the published browser output directory.

No browser-face subpath in the fleet declares a `require` condition. The browser branch therefore
never needs a CommonJS stage, and the earlier reading that `indexeddb` alone declares no `require`
condition is explained: it is browser-only.

## Settled: no export target lies outside the environment output directories

Across all 48 packages, every export target other than `package.json` matches
`dist/src/{core,browser,server,styles}/`. No package names a pattern target, a custom condition
target, or a file outside the built environment output. The styles environment has no target at
all, in any package.

## Still unknown

The census reports `configs/browsers.ts` in 8 packages against 7 browser faces. The disagreeing
package is unidentified. A registry sweep cannot settle it, because `configs/` does not ship in
any tarball and `@vitest/browser-playwright` is declared by 41 packages, so that dependency is not
a browser-axis signal. Only a fleet-wide checkout reading settles it, which this container cannot
take. Design so that the answer does not change your ruling, and say so if it would.
