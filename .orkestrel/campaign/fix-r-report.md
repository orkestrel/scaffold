## R1 — declaration-format membership

[templates.ts](/home/user/scaffold/src/core/templates.ts:1393) resolves the CommonJS declaration under `types`, `node`, and `require`.

| Fixture | Declaration | Runtime | Compile probe |
| --- | --- | --- | --- |
| `decl-cts-rt-mjs` | `.d.cts` | `.mjs` | admits |
| `decl-mts-rt-cjs` | `.d.mts` | `.cjs` | refuses with TS1479 |
| `module-sync` | `.d.cts` | `.mjs` | admits |
| conditioned Node entry | `.d.cts` | `.cjs` | admits |
| module declaration | `.d.mts` | `.js` | refuses |
| dual require branch | `.d.cts` | `.cjs` | admits |
| extensionless runtime | `.d.cts` | extensionless | admits |
| nested declaration scope | `.d.ts` | `.mjs` | admits under nested CommonJS scope |
| malformed declaration scope | `.d.ts` | `.mjs` | admits |

TypeScript 6.0.3 settled the `.d.ts` unknown:

- A declaration-directory `"type": "commonjs"` under an outer module scope compiled with exit `0`.
- A declaration-directory `"type": "module"` under an outer CommonJS scope produced TS1479 and exit `2`.
- A malformed nearest manifest under an outer module scope compiled with exit `0`.
- With no nearer manifest, the outer module scope produced TS1479 and exit `2`.

The walk therefore starts at the declaration’s own directory. A malformed nearest manifest stops the walk and supplies no module type.

The `.cts` and `.mts` runtime targets, leading-dot runtime filename, and symlinked runtime target are moot for compile membership under R1. The runtime drive still loads whichever target Node resolves.

Firing control:

```text
Mutation: if (declaration.endsWith('.d.cts')) return false
FAIL selects the CommonJS compile probe from the resolved declaration format
Expected: true
Received: false
exit_code=1
```

After restoration:

```text
exit_code=0
```

## R2 — evidence-preserving runtime behavior

- Removed the non-list `!isPackageTarget(target)` rejection from `resolvesCommonJS`.
- Kept fallback-array package-target filtering unchanged in `collectTargets`.
- Removed `.json` as a special CommonJS admission. Runtime filenames no longer decide compile membership.
- Added independent `required` classification from the live Node `require` conditions. Runtime drives use `required`; compile probes use `commonjs`.
- Added a staged-record assertion showing an invalid target remains `{ commonjs: true, required: true }`.
- Added a real Node child assertion for `ERR_INVALID_PACKAGE_TARGET`.

Guard firing control:

```text
Mutation: re-add !isPackageTarget(target) before declaration classification
FAIL keeps an invalid non-list CommonJS target for the runtime drive to report
Expected: { commonjs: true, required: true }
Received: { commonjs: false, required: true }
exit_code=1
```

A direct outer Node probe reached `ERR_INVALID_PACKAGE_TARGET` with exit `1`. The Vitest child is sandbox-blocked as reported below.

## R3 — emitted interface

- Restored the browser-branch antecedent without the undefined “axis” term at [templates.ts](/home/user/scaffold/src/core/templates.ts:1889).
- Deleted dead `RUNTIME_CONDITIONS.commonjs`. The live `COMMONJS_CONDITIONS` comment explains its runtime role at [templates.ts](/home/user/scaffold/src/core/templates.ts:1180).
- Rewrote the distribution guide around declaration-format membership and independent runtime resolution at [scaffold.md](/home/user/scaffold/guides/scaffold.md:1467).

## R4 — behavior instrument

[templates.test.ts](/home/user/scaffold/tests/src/core/templates.test.ts:373) lifts the emitted `buildStage` classification walk, executes it against a staged manifest, and asserts the pushed records, target inventory, partition, declarations, and independent compile/runtime booleans.

The fallback test at [guides.test.ts](/home/user/scaffold/tests/guides.test.ts:302) no longer carries the unrelated call census.

Firing-control transcript:

```text
Mutation: entries.push({ subpath: './corrupt', ... })
All classifier calls remained present.
FAIL classifies staged exports into driven and refused records
Expected: original staged subpaths
Received: ./corrupt
exit_code=1
```

After restoration:

```text
PASS classifies staged exports into driven and refused records
exit_code=0
```

## R5 — report repair

[fix-q-report.md](/home/user/scaffold/.orkestrel/campaign/fix-q-report.md:1) no longer carries growable-set totals or temporal labels. It names the relevant members and evidence instead. The weak-claim paragraph has the blank line required before the thematic break.

## Gate results

Regeneration:

```text
npm run build && npm run build:inventory
exit_code=0

guide digest:
900d05d37254d2268509c3793a70037baed112f898e74de4abd695d9fd9d157a
→ 2e2de595bddcd3a0a8cd9395e10761215e1753654bc3ac6e119fe28c957f2b21

inventory digest:
4b9b9ed149836a23ba901f48083ad7fd2aff2d353d723b9cd1bc6e6439771410
→ de80be545075f39270b5a52e8ee5e8b9b8e9aeaadd7f7519bb1486e8387f7350
```

Owned TypeScript lint:

```text
npx oxlint --config .oxlintrc.json --deny-warnings …
exit_code=0
```

Owned TypeScript format:

```text
All matched files use the correct format.
exit_code=0
```

TypeScript checks:

```text
npm run check
check:src:core
check:src:server
check:src:bin
exit_code=0
```

Guide project:

```text
npm run test:guides
exit_code=0
```

Template project:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot \
  --project src:core tests/src/core/templates.test.ts

Error: spawnSync /opt/node22/bin/node EPERM
exit_code=1
```

The sandbox denial affected the emitted-corpus formatter drive, generated browser typecheck, browser resolver drives, and invalid-target Node child. No weaker substitute replaced this gate.

R1 targeted proof:

```text
PASS selects the CommonJS compile probe from the resolved declaration format
exit_code=0
```

R2 targeted proof:

```text
Expected: ERR_INVALID_PACKAGE_TARGET
Received: spawnSync /opt/node22/bin/node EPERM
exit_code=1
```

Its staged-record assertion completed before the denied child and matched `{ commonjs: true, required: true }`.

R4 restored proof:

```text
PASS classifies staged exports into driven and refused records
exit_code=0
```

`git diff --check`, owned Markdown/JSON formatting, ownership audit, and temporary-probe cleanup passed.

## Unclosed evidence

The sandbox could not close the template project or its invalid-target child. Settle them on the host with:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot \
  --project src:core tests/src/core/templates.test.ts
```

OBSERVATION: no whole-suite or distribution-proof run was performed.

## Weak claim

The TypeScript probe settles malformed JSON manifests. Treating every other filesystem read failure like an omitted `type` follows the implementation’s catch boundary but lacks a direct TypeScript comparison.

---

## Orchestrator's integration note

**The unit added a separation the brief omitted.** It split the prior boolean into `commonjs`, decided
by the resolved declaration and consumed by the compile probe, and `required`, decided by the live
Node require conditions and consumed by the runtime drive. The FIX-Q subjective lane had shown a
boolean carrying a verdict that varies by resolution mode; this is the shape that answers it, and the
brief only implied it.

**Host readings, taken after the unit exited.** Its sandbox blocked the template project and the
invalid-target Node child:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/templates.test.ts
exit: 0

npm run format:check = 0
npm run lint:check   = 0
npm run check        = 0
npm run test:guides  = 0
```

The `ERR_INVALID_PACKAGE_TARGET` child that reported `EPERM` inside the bench passes here, so the
restored loud failure is proven on the host rather than asserted.

**The end-to-end reading.** Candidate rebuilt, packed, installed, the presence-owned proof deleted so
`repair` writes the regenerated proof into a real target:

```text
/home/user/orkestrel/indexeddb was repaired.
exit: 0
```

## The `.d.ts` unknown, verified independently

The brief named it unknown: whether a `.d.ts` declaration's nearest-scope walk starts at the
declaration's directory or the target's. The unit settled it against TypeScript and the Orchestrator
reproduced it with its own fixtures:

```text
  package               decl-dir type  root type  .cts consumer under node16
  decl-cjs-root-esm     commonjs       module     accepts
  decl-esm-root-cjs     module         commonjs   TS1479
  decl-none-root-esm    (none)         module     TS1479
```

The declaration's own directory scope decides, and the walk falls back to the outer scope when no
nearer manifest exists. That is what the unit implemented.

An independent check of this unit's answer **agreed**. The preceding rounds each produced a reading
that contradicted the shipped predicate.

## The unit's flagged weak claim

It reports that TypeScript settles a malformed nearest manifest, and that treating every other
filesystem read failure the same way follows the implementation's catch boundary without a direct
TypeScript comparison. That is a real bound and it is recorded rather than closed: the malformed case
is measured, the general read-failure case is inferred from where the catch sits. It carries to the
audit as a claim.
