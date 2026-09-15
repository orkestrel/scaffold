## Deviation state: stopped before editing

**Expected:** The brief describes every `Fault` as carrying `reason`, `path`, and `expected`, with `received` when applicable.

**Found:** The installed declaration includes arms without `expected`. See [index.d.ts](C:/Users/mikes/WebstormProjects/tool/node_modules/@orkestrel/contract/dist/src/core/index.d.ts:1738):

```ts
readonly reason: 'variant';
readonly path: FieldPath;
readonly variants: number;
```

At line 1742, the `oneOf` arm likewise carries `path` and `matched`, without `expected`.

**Done:** Required baseline measurements and declaration inspection.

**Not done:** Implementation, behavior tests, guide changes, and acceptance verification. The brief explicitly requires stopping on a cited declaration-shape mismatch.

**Hypothesis:** The brief generalized the fault shape from the example at line 1500, which demonstrates a `constraint` fault.

## Touched files

None.

`git diff --stat`: empty; exit 0.

`git status --porcelain`: empty; exit 0. Git emitted the anticipated inaccessible global-ignore warning.

## Baseline evidence

| Exact command | Exit | Test count |
| --- | ---: | --- |
| `npm.cmd run lint:check` | 0 | Not applicable |
| `npm.cmd run check` | 0 | Not applicable |
| `npm.cmd run test:src:core` | 0 | 54 passed across 5 files |

## Behavior pins and acceptance

No tests added or changed; no new behavior pinned.

Acceptance commands and the whole-suite observation, `npm.cmd test`, were not run after the mandatory stop.

## Unknowns resolved

- **Parameter projection:** Use `schemaToParameters(contract.schema)` after `createContract(shape)`. The declarations at lines 1505–1507 and 5831 support this; the example at lines 5825–5828 demonstrates that composition.
- **Error base:** Use `Error`. `ContractError.code` is restricted to `ContractCode` at line 1299; its union at lines 1109–1135 excludes `SCHEMA` and `ARGUMENTS`. A tool-owned error can expose the required code and optional context under the TypeScript errors rule.