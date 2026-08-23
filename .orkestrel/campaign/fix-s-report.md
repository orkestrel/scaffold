## S1 — declaration resolution

[templates.ts](/home/user/scaffold/src/core/templates.ts) now:

- Accepts an existing declaration target.
- Substitutes `.cjs → .d.cts`, `.mjs → .d.mts`, and `.js → .d.ts`.
- Continues through conditions and fallback arrays when the candidate declaration is missing.
- Treats a directory named `package.json` as no manifest and continues to the outer scope.

The TypeScript probes settled the unknowns:

- Fallback substitution continues to a later member. The candidate exited `0`; removing the adjacent declaration produced TS7016 and exit `2`.
- A missing `types` target falls through to the runtime target and its adjacent declaration. Removing that declaration produced TS7016 and exit `2`.
- A JavaScript target reached through `types` also receives extension substitution.
- A `package.json` directory does not start a scope. The outer module scope was inherited and TypeScript refused the CommonJS import with TS1471.

The substitution mutation changed `.cjs → .d.mts`. The named test exited `1`, reporting `.d.mts` where `.d.cts` was required.

## S2 — CommonJS runtime conditions

The restored set is:

```text
node-addons, node, require, module-sync
```

`required` now derives from `RUNTIME_CONDITIONS.commonjs`. `COMMONJS_CONDITIONS` is deleted. Branch-only `module-sync` and `node-addons` entries are now runtime-driven.

`DECLARATION_CONDITIONS.commonjs` remains `types`, `node`, and `require`; `module-sync` was not added.

## S3 — mirror assertion

The generated distribution proof now asserts that `selectUntypable(stage.entries)` names nothing. Its predicate is `required && !commonjs`.

The firing witness returns `['.']` for a `.d.mts` declaration over a `.cjs` target and `[]` for the scaffold-generated manifest. The named test exits `0`.

## S4, S5, S6

[scaffold.md](/home/user/scaffold/guides/scaffold.md) documents declaration substitution, fallback behavior, physical manifest scope, and the exact runtime condition sets.

The staged fixture now covers ESM-only, browser-resolved, untyped JavaScript require, `module-sync`, and `node-addons` entries. Mutation transcripts:

- Browser resolution mutation: exit `1`; `./browser` changed from `browser: true` to `false`.
- Module mutation: exit `1`; ESM-only and other import-reachable entries changed from `module: true` to `false`.
- CommonJS mutation: exit `1`; declaration-compatible entries changed from `commonjs: true` to `false`.
- Required mutation: exit `1`; ESM-only and browser entries changed from `required: false` to `true`.
- Declaration guard mutation: exit `1`; the `.d.ts` browser entry moved from driven entries to `undeclared`.

[fix-r-report.md](/home/user/scaffold/.orkestrel/campaign/fix-r-report.md) no longer contains the banned modal, growable-set totals, or the malformed thematic break.

## Ordered gates

- `npm run build && npm run build:inventory` — exit `0`. The inventory regenerated `host.json`; its guide digest and root digest changed.
- Owned TypeScript Oxlint command — exit `0`, no output.
- Owned TypeScript oxfmt check — exit `0`: “All matched files use the correct format.”
- `npm run check` — exit `0`.
- `npm run test:guides` — exit `0`.
- Explicit `src:core` template project — exit `1`. The sandbox denied nested Node processes with `spawnSync /opt/node22/bin/node EPERM`, including the emitted-corpus oxfmt fixed-point case. Browser configuration child checks, browser resolver child checks, and the invalid-target child received the same denial.
- The scoped classifier command covering declaration substitution, runtime conditions, staged classification, and the mirror predicate exited `0`. This is supporting evidence, not a replacement for the denied project gate.

OBSERVATION: no whole-suite or distribution-proof run was performed.

## Unclosed and weak claims

The explicit template-project gate requires a host rerun of:

```sh
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/templates.test.ts
```

The formal `prove` receipt was unavailable because the probe call required approval while the session approval policy was `never`.

The implemented resolver matches the directly measured package shapes. Exact parity with TypeScript outside the tested condition, fallback, substitution, and package-scope shapes remains the weak claim.
---

## Orchestrator's integration note

**Host readings.** The unit's sandbox denied the template project again; on the host it reports
**26 passed**, exit 0, and the gate chain — `format:check`, `lint:check`, `check`, `test:guides` — is
clean.

**S1 and S2 landed and are visible in the shipped code.** Substitution is implemented, and the
asymmetry that caused S2 is gone:

```text
1178:  module:   ['node-addons', 'node', 'import',  'module-sync']
1179:  commonjs: ['node-addons', 'node', 'require', 'module-sync']
```

`COMMONJS_CONDITIONS` is deleted. **S5's five per-boolean mutations each reddened**, which is the
instrument doing what it could not do last round.

## S3's mirror assertion is a false red, found end to end

The end-to-end run against a real target failed:

```text
FAIL declares types for every module it publishes [requires the registry]
AssertionError: expected [ '.' ] to strictly equal []
```

`/home/user/orkestrel/indexeddb` publishes its root as a browser face:

```json
{ "types": "./dist/src/browser/index.d.ts",
  "import": "./dist/src/browser/index.js",
  "default": "./dist/src/browser/index.js" }
```

There is **no `require` condition**. `default` resolves under the require condition set, so `required`
is true; the `.d.ts` declaration under `"type": "module"` gives `commonjs` false; and
`required && !commonjs` names the subpath.

Both facts the assertion states are literally true — `require(esm)` loads it, and a `.cts` consumer
gets TS1479. But an ESM-only browser package that declares no `require` condition **makes no CommonJS
claim**, so asserting it must be CommonJS-typable asserts something the package never promised.

**This is the defect class that started the seam.** `default` matching under require conditions is not
a declaration of CommonJS support — the same trap that broke the second selector, arriving now through
a new assertion rather than through the selector itself.

The unit's report says the assertion is green for a scaffold-generated manifest, and that is true: a
generated manifest carries an explicit `require` branch with a `.d.cts` declaration. indexeddb's
browser face does not. The unit tested the shape it generated; the fleet holds a shape it does not.

**The bound the fix needs:** the mirror assertion fires only where the entry **declares** CommonJS
support — an explicit `require` condition — and is nonetheless untypable. Not where `default` merely
resolves.

`required` itself is not wrong and must not be narrowed: Node genuinely reaches that target, and the
runtime drive that consumes `required` is correct to run. Only the assertion's predicate is too wide.

Caught by running one target before the fleet, which is the fourth time in this campaign that
sequence has turned a fleet-wide failure into a single reading.
