# Propagation-fix-3 report

Stopped under the brief's deviation contract. Item 13D requires changing the Vue fixture in off-limits `tests/setupServer.ts`. The owned edits are incomplete and are not ready for acceptance. No final gate sequence ran.

## Blocking deviation

- **Expected:** move the generated Vue fixture to `app/vue` and update its import within the owned files.
- **Found:** `tests/distribution.test.ts` imports `GENERATED_VUE_SETUP_FILES` from `tests/setupServer.ts` and writes its entries unchanged. The fixture owner is explicitly off-limits and report-only in the brief.
- **Evidence:** `tests/setupServer.ts:1045` declares `GENERATED_VUE_SETUP_FILES`; line 1046 names `app/browser/SetupComponent.vue`; line 1056 imports `../app/browser/SetupComponent.vue`. `tests/distribution.test.ts:1362` writes those entries. Changing the blueprint alone leaves both retired paths intact.
- **Done:** identified the fixture owner and stopped. Preserved that file's starting bytes. Recorded the partial edits and cleanup reading.
- **Not done:** the fixture repair, completion of the remaining rulings, regeneration, final gates, distribution execution, or scratch generation. No replacement fixture or string-rewriting workaround was introduced in the test consumer.
- **Hypothesis:** item 13D's ownership expansion omitted the fixture constant in `tests/setupServer.ts`.

## Files changed

The closing hash comparison against the starting bytes identifies these files:

- `.claude/rules/{application,architecture,browser,documentation,workspace}.md`
- `configs/policy.ts`
- `guides/scaffold.md`
- `src/core/{compilers,parsers,templates,types,validators}.ts`
- `tests/{config,guides,setupPolicy}.test.ts`
- `tests/setupPolicy.ts`
- `tests/src/bin/CLI.test.ts`
- `tests/src/core/{compilers,templates}.test.ts`

No file outside the owned set changed from its starting bytes. No tracked or unignored file was added or removed. `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/distribution.test.ts`, the identity set, and `host.json` retain their starting bytes. Earlier campaign changes remain intact.

Supporting snapshots, TypeScript instruments, the unit-relative diff, and this report remain under `tmp/units/propagation-fix-3-*`. The diff is `propagation-fix-3-diff.patch`; the closing reading is `propagation-fix-3-finish.json`.

## Rulings and proof status

The following table distinguishes implemented drafts from executed evidence. An unrun case is not a passing proof.

| Ruling | Change and pinning case | Status |
| --- | --- | --- |
| Claim 2 | Added `blueprintToFaces`, returning browser extensions with axes filtered by browser occupancy. Existing face readers use it. Added `projects only occupied browser axes across every compiler` in the compiler proof, covering both axes, each axis, and neither. | Mutation proof passed for the unplaced `appVue` defect. The retained matrix is unrun; guide-index integration remains unverified. |
| 10a, F4 | Architecture admits methods and accessors of admitted object literals, refuses climbing out of their bodies, and names `app/vue/main.ts`. | Existing nested-function tester unchanged; unrun. |
| 10b | Workspace and documentation rules name `showcase/<application>.html` and the base `browser.html` page. | Existing showcase assertions unrun. |
| 10g, 10h | Workspace rules name seeded setup selections and Vue typecheck scopes. | Drafted; unrun. |
| F3 | Browser and application rules put published TypeScript in `src/vue` and SFCs in `app/vue`. The guide proof gains the rule presence guard and source/application include assertions. | Unrun. |
| 10c, 10d | Guide registration includes sheet faces; authored setup proofs are distinguished from seeded proofs; the policy mirror is named. | Drafted; additional executed assertions remain incomplete. |
| 10e | Guide names framework check, build, and development scripts; the Vue-face case asserts writable membership. | Unrun. |
| 10f | The advisory case also refuses `appVue` and `srcVue` in the unplaced root configuration. | Retained case unrun; the narrower mutation proof passed. |
| 11a | Moved the named helpers to `tests/setupPolicy.ts`, added sibling cases and controls, migrated the propagation scratch allocations, and removed the plain-object JSON round trip. | Partial. Other hand-rolled allocations remain. Helper cases and fleet-name policy gate unrun. |
| 11b | Grouped global and styles templates into `module` and `proof`; grouped integration variants; updated identified readers. | Unformatted and unverified. |
| 11c | Added `isPolicyPosition` and routed callback, result, and nested-method admission through it. | Tester unchanged; unrun. |
| 11d | Added extension-guard examples and import lines in the identified compiler, parser, and guard examples. | Guide and shipped-example gates unrun. |
| 11e | Added the seeded `SheetAdoption` interface and return annotation. | Seeded-proof and emitted-format follow-up incomplete. |
| F1 | Executable factory uses `resolveExternal`, preserving `@src/` externalization; callback hoisting began. | No identity regeneration or pinning execution. |
| F2 | Updated the setup-runtime remark, writable-script remark, source/test return descriptions, and advisory description. | Drafted; unrun. |
| F5 | Guide-index compiler includes occupied Vue faces and selected showcase pages. | Drafted; cases, guide description, and scratch reading incomplete. |
| Writable-region referral | Existing framework membership uses occupied faces. | Showcase additions and predecessor cases not implemented. |
| Factory-binding referral | Hoisted filename callbacks and drafted module-level showcase callbacks and executable/application external predicates. | Partial. Browser/server external callbacks still require attention; emitted plugin indentation and snapshots remain unaligned. |
| Global-setup referral | none | Not implemented. |
| Anchoring referral | Added an indented module-augmentation export control beside a top-level export control in `tests/setupPolicy.test.ts`. | Unrun. |
| 13A | none | Not implemented. |
| 13B | none | Not implemented. |
| 13C | none | Not implemented. |
| 13D | Located the off-limits fixture owner. | Required stop; not implemented. |

The mutation proof's case omitted `appVue` for the `desk` blueprint with `app: ['core']` and Vue on the application axis. Its control restored raw axes. Type and lint stages passed for both; the control failed its runtime assertion. Its closing line was:

```text
receipt probe:efc69cfdd6f1f173a18722d7cfe0ec6c:runtime:typescript@6.0.3:oxlint@1.86.0:vitest@4.1.11:tsconfig.json@3ff9b49b1844f028f70056f15aabfc0d
```

This receipt covers that factory-emission claim at the time of the proof, not the subsequent edits or acceptance gates.

## Identity-set diffs

None. No regeneration ran. The edited templates and materialized configuration have not been reconciled. `host.json` was not regenerated.

## Scratch readings

- Generated `guides/README.md`: none; generation not run.
- Generated manifest showcase and journey scripts: none; generation not run.
- Generated root factory bodies: none; generation not run.

The closing reading reports `probes: []` for this unit and `scratch: false` for `os.tmpdir()/scaffold-fix-3`. No unit scratch directory was allocated.

## Commands and results

The command readings are:

| Command | Exit code | Test count or result |
| --- | --- | --- |
| `git status --porcelain`, start and finish | 0 | none |
| `node .agents/skills/orkestrel-scout/scripts/map.ts --census globalproof styleproof ARTIFACT_TEMPLATES.tests.styles ARTIFACT_TEMPLATES.tests.global CONFIG_TEMPLATES.factories.sheets CONFIG_TEMPLATES.factories.integration --paths src,tests,configs,guides` | 0 | none; template readers located |
| `node tmp/units/propagation-fix-3-state.ts` | 0 | none; 372 file hashes and starting copies recorded |
| `node tmp/units/propagation-fix-3-projection.ts` | 0 | none |
| `npx tsc --noEmit --project tsconfig.json` | 0 | none; ran after the projection edit, before subsequent edits |
| `node tmp/units/propagation-fix-3-helpers.ts` | 0 | none |
| `node tmp/units/propagation-fix-3-groups.ts` | 0 | none |
| `node tmp/units/propagation-fix-3-docblocks.ts` | 0 | none |
| `node tmp/units/propagation-fix-3-hoist.ts` | 0 | none |
| `git diff --stat` | 0 | none; includes pre-existing changes |
| `git diff --check` | 1 | none; `tests/setupPolicy.ts:3890: new blank line at EOF.` |
| `node tmp/units/propagation-fix-3-finish.ts` | 0 | none; changed-file hashes, cleanup, and unit-relative diffs recorded |
| Finish instrument's `git diff --no-index` comparisons | 1 per changed file | none; expected differences |
| Read-only `Get-Content` and matching `rg` inspections | 0 | none |
| `rg` search for the moved helper names and proposed projection name in guide API tokens | 1 | none; no matches |

The `prove` tool returned a receipt, with no shell exit code: its case runtime passed and its control runtime reported an assertion failure. No project test count is inferred from that reading.

The ordered formatting, scoped checks, lint, project tests, build, policy, guide, distribution, and final-format sequence did not run. Distribution test count, adopter page stamps, CSS consumer result, repair comparison, stale audit finding, and adopter wall time: none.

## Other deviations

The patch tool rejected an out-of-order template patch without applying it; the reordered patch applied. The draft hoisting instrument produced indentation that still needs the emitted-format correction. The final whitespace check remains failed as quoted. No formatting or implementation repair was attempted after the ownership stop.

The projection's public export gained its required guide Surface row. The anchoring control was added alongside the moved-helper proofs. Work stopped before consolidation and complete per-ruling validation.

No subagent, installation, commit, unowned edit, or cleanup of earlier campaign work occurred. Acceptance criteria remain unmet.
