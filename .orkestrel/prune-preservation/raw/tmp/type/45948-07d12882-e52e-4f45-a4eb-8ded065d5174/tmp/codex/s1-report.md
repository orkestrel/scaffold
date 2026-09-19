S1 stopped at the brief's emitted-configuration typecheck condition. Implementation is not done.

No blueprint setup member or journey wrapper shape was chosen. The wrapper-registration probe was not run because the deviation contract required stopping before implementation.

No artifacts or scripts were emitted or changed. No source, test, rule, guide, manifest, or installed dependency was changed. This report is the only file written.

The controls remain unrun. The following commands are the specified settling commands, not executed results.

| Control | Settling command | Failing count before | Passing count after |
| --- | --- | --- | --- |
| S1-C1: journey artifacts, script chain, and exclusion | `npm.cmd run test:src:core` | Not run | Not run |
| S1-C2: absent browser application advice | `npm.cmd run test:src:core` | Not run | Not run |
| S1-C3: materialized variant projects and provided values | `npm.cmd run test:src:core` | Not run | Not run |
| S1-C4: setup runtime projects and scripts | `npm.cmd run test:src:core` | Not run | Not run |
| S1-C5: exact-case target inference | `npm.cmd run test:src:bin` | Not run | Not run |
| S1-C6: vendored journey-wrapper admission | `npm.cmd run test:config` | Not run | Not run |

No gate command was run, so there are no gate exit codes or totals lines. The check, scoped formatter and linter, core, bin, config, and guides acceptance gates remain unrun. The policy, setup, and whole-test observations remain unrun. `git diff --stat` exited 0 with empty output.

The deviation is the explicit stop condition in `tmp/codex/s1-brief.md` under Unknowns and Deviation contract.

- Expected: determine whether a scaffold proof typechecks an emitted root configuration against installed dependencies; if one does, name the exact case and stop without a workaround.
- Found: `emitted workspaces under their own gates > emits browser configurations their own typecheck accepts`, at `tests/src/core/templates.test.ts:1014`, stages browser application and showcase configurations and asserts their TypeScript diagnostics are empty at lines 1027 and 1028.
- Exact evidence: `stageRootConfig` at `tests/src/core/templates.test.ts:189` writes the emitted root configuration, TypeScript configuration, browser resolver, real configuration helpers, and plugin declarations. `checkTypes` at line 212 invokes this checkout's `node_modules/typescript/bin/tsc` with `--noEmit --project` against that staged workspace. `node_modules/@orkestrel/test/package.json:3` declares version `0.0.16`. The search `rg -n 'JourneyVariant' node_modules/@orkestrel/test/dist` returned no match. The brief requires importing that type from `@orkestrel/test` and assigns its publication to T1 in version 0.0.17.
- Done: located the exact proof and read the installed package evidence. Not done: the requested implementation, registration probe, regression controls, and gates. Installing a dependency and editing the manifest or lockfile are off-limits to S1.

The least-certain claim is the predicted TypeScript failure after adding the required import. No changed emitted configuration was compiled, and no compiler diagnostic was measured. The existing proof's application and showcase blueprints do not enable a journey axis; this report does not claim that their unchanged configurations fail. The stop follows the brief's explicit condition, not an observed failing gate. The wrapper's registration behavior remains unmeasured.
