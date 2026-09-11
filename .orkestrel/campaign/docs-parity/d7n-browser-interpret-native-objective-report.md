Objective lane held.

### Browser

**B-ENTRY — CONFIRMED**

`tests/guides.test.ts:5-50` directly composes `GuideCommand`, `readInventory`, and `createVitest`. `PACKAGE_NAME` binds the module map and manifest assertion. Runtime imports occur inside the anonymous `execute` callback. The migration adds no launcher or helper module.

**B-PRESERVATION — BROKEN**

The migration preserves every predecessor check but adds failure states that the predecessor did not own:

- `tests/guides.test.ts:115-116` asserts `report.sections`. Installed Guide also requires `## Surface`, `## Methods`, `## Tests`, and a method-group population at `node_modules/@orkestrel/guide/dist/src/core/index.js:3604-3620`. The predecessor only inspected method groups that existed.
- `tests/guides.test.ts:145-146` asserts `report.imports`. Installed Guide reports “no mapped self import” at `index.js:3780-3783`. The predecessor only validated imports it encountered.
- `tests/guides.test.ts:149-150` asserts `report.links`. Installed Guide reports “has no links” at `index.js:3704-3708`. The predecessor accepted an empty link population.
- `tests/guides.test.ts:152-153` asserts `report.tests`. Installed Guide reports “has no test links” at `index.js:3715-3718`. The predecessor accepted an empty test-link population.

The baseline’s exact policies are visible at `15aab0e:tests/guides.test.ts:156-267`. No prior obligation appears removed; the defect is added policy.

Smallest correction: drop `report.sections`, retain `report.methods`, and restore the predecessor import/link/test traversals inside the callback using Guide’s public `createSourceManager`, `extractFenceImports`, `findMissing`, `isExternalLink`, and `resolveLink` leaves. Import those runtime leaves dynamically. Do not filter aggregate finding text or expand Guide’s accepted API.

**B-SCOPE — CONFIRMED**

The authored migration changes only `tests/guides.test.ts`. The additional manifest and generated-policy paths belong to root’s separately recorded supported repair. Source, public APIs, Browser’s guide, and unrelated authored tests remain outside this unit. No publication claim is made.

**B-PROOF — CONFIRMED**

`d7n-browser-upper-native-red/action.exit.txt` records exit `1` with Vitest failing before collection. `d7n-browser-upper-native-green/action.exit.txt` records exit `0`; its stdout records the direct file passing under Vitest `4.1.11`. The retained prepublish action also exited `0`.

**Browser source verdict: FAIL — B-PRESERVATION.**

### Interpret

**I-ENTRY — CONFIRMED**

`tests/guides.test.ts:4-40` keeps only `Template` as a static type-only source import. GuideCommand’s host ports remain static, while Contract, Guide core, Reason, Interpret runtime source, Test, and Vitest load inside the anonymous callback. `PACKAGE_NAME` binds the module map and manifest assertion. No alternate launcher or helper copy was introduced.

**I-PRESERVATION — BROKEN**

Interpret repeats the same policy expansion at `tests/guides.test.ts:167-205`. Its baseline at `1b11d3e:tests/guides.test.ts:211-322` only traversed existing method groups, imports, links, and test links. Installed Guide’s `sections`, `imports`, `links`, and `tests` channels add the population failures cited for Browser.

The whitespace-insensitive migration diff preserves the flagship fixtures, calls, inputs, and expectations beginning at `tests/guides.test.ts:237`. `report.declarations` remains unasserted.

Apply the same bounded correction as Browser. Keep `report.methods`, drift, fence-language, function-example, method-example, title-pair, pitch, and input channels.

**I-SCOPE — CONFIRMED**

The frozen author capture contained only `tests/guides.test.ts`. Later generated-policy edits appeared in the live checkout during review; they are outside this frozen source-migration subject. No product source, public API, own guide, or flagship assertion changed.

**I-PROOF — UNRESOLVED**

The retained red receipt records exit `1` and `ERR_MODULE_NOT_FOUND` for the former runtime `@src/core` import. The only supplied post-change direct result is the writer’s report claiming exit `0` with the suite passing. That cannot independently settle the claim.

Required proof: root runs and retains the result of `node --experimental-strip-types tests/guides.test.ts` in canonical Interpret against the frozen migration. A full suite or publication gate is unnecessary.

**Interpret source verdict: FAIL — I-PRESERVATION; I-PROOF remains unresolved.**

### Attacked and held

- Interpret’s static `import type { Template }` does not cross the native runtime boundary.
- Browser adds no behavior case.
- Interpret’s flagship behavior block has no substantive migration change.
- `report.methods`, `report.drift`, `report.fences`, `report.examples.functions`, `report.examples.methods`, `report.examples.titles`, `report.pitch`, and `report.input` retain the corresponding predecessor obligations.
- Neither migration asserts `report.declarations`.

VERDICT: FAIL B-PRESERVATION I-PRESERVATION I-PROOF; outside the claims: none
