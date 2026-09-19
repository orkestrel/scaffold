## Numbered verdicts

1. **BROKEN.** `tests/config.test.ts:80-83` calls `lstatSync` directly. Missing entries return `undefined`, and links are excluded, but `EACCES`, `EPERM`, and other inspection errors throw during module evaluation. `isPhysicalDirectory` at `src/server/helpers.ts:412-414` wraps `lstatSync` in `attempt` and returns `false` for every thrown error. The implementations therefore diverge when the process cannot stat a candidate directory. A symbolic link, junction, and broken link are excluded by each implementation. Fix the predicate by using the installed `attempt` primitive around each `lstatSync` call and checking `isDirectory()` and `isSymbolicLink()` as `isPhysicalDirectory` does. The settling command is `npm.cmd run test:config` in a generated target whose `src/core` entry rejects `lstat`; the read-only sandbox prevents constructing that target.

2. **CONFIRMED.** `.orkestrel/scaffold/d2-postfix.log.txt:46-101` records shape D with a physical `src/core` directory and no source wrapper. The scope case runs, throws `The workspace declares no face project`, and the command exits `1`.

3. **CONFIRMED.** `.orkestrel/scaffold/d2-prefix.log.txt:18-75` records the regular-file and empty-directory shapes failing before the fix. `.orkestrel/scaffold/d2-postfix.log.txt:18-45` records each shape passing afterward with `171 passed | 3 skipped (174)` and exit `0`.

4. **CONFIRMED.** The measured workspace is `C:\Users\mikes\AppData\Local\Temp\d2-postfix1\generated`. No `node_modules` directory exists at any ancestor through `C:\`, and the workspace does not contain `@microsoft/api-extractor`. The post-fix log reports `171 passed | 3 skipped (174)`. The checkout run in `.orkestrel/scaffold/d2-gates.log.txt:221` reports `173 passed | 1 skipped (174)`. The log body contains no API Extractor execution for the temporary workspace.

5. **CONFIRMED.** The module constant is `publishes` at `tests/config.test.ts:80`. The manifest-derived locals are `manifestPublishes` at lines 552 and 648. `src/core/compilers.ts` uses `publishes` for the same axis fact.

6. **CONFIRMED.** The comment at `tests/config.test.ts:2172-2176` limits itself to the visible skipped tally and the dot reporter’s unnamed marker. The title at line 2178 uses the repository’s established `[inapplicable where …]` form, also present at `tests/distribution.test.ts:996`.

7. **CONFIRMED.** `readManifestVersion`, `installPackedScaffold`, and `installGeneratedWorkspace` are exported from `tests/setupServer.ts`. `tests/distribution.test.ts` imports them. `expect` remains absent from `tests/setupServer.ts`, and the moved reading has its proof in `tests/setupServer.test.ts:1048-1059`.

8. **CONFIRMED.** Each `installGeneratedWorkspace` caller reads `generated.path`, `generated.manifest`, `generated.environment`, and `generated.pin`. Neither caller rebuilds the materialization path or parses the generated manifest again.

9. **CONFIRMED.** `tests/distribution.test.ts` contains no `here` hit. The hits at `tests/config.test.ts:1490`, `:1681`, and `:1740` are fixture strings that test the prose policy, not comments.

10. **CONFIRMED.** The added and moved TypeScript contains no `any` type, type assertion, non-null assertion, or suppression directive. The added `relative as relativePath` syntax is an import alias, not a type assertion.

11. **CONFIRMED.** `tmp/audit/d2-diff.patch` contains changes only to `host.json`, `tests/config.test.ts`, `tests/distribution.test.ts`, `tests/setupServer.test.ts`, and `tests/setupServer.ts`. `tmp/audit/d2-status.txt` agrees, apart from the untracked campaign-artifact directory. `package.json` remains at version `0.0.72`.

12. **CONFIRMED.** `tests/config.test.ts`, `dist/host/tests/config.test.ts`, and the matching `host.json` entry each carry SHA-256 digest `be9396127a75212a23e8a8578ed86d03b271d5f6f51c903469133fc5cac6caf0`.

## Hazard rulings

### Vendored import closure

`tests/config.test.ts` imports:

- Node built-ins: `node:child_process`, `node:fs`, `node:module`, `node:os`, `node:path`, and `node:url`.
- Declared tooling: `vite`, `oxlint/plugins-dev`, and `vitest`.
- Vendored modules: `configs/helpers.ts`, `configs/policy.ts`, and `tests/setupPolicy.ts`.
- Target-root artifacts: `vite.config.ts` and `tsconfig.json`.

It does not import `tests/setupServer.ts`. The tooling packages exist in generated manifests, and the relative vendored modules exist in `host.json`. `vite.config.ts` and `tsconfig.json` are not host files; they are required workspace artifacts supplied through the target plan. A directory containing only the host set would not resolve those root imports, but it is not a valid scaffold workspace or a runnable config project. No new missing import edge exists.

### Case-insensitive resolution

The predicate matches `targetToEnvironments` on each host. A tree containing `SRC/CORE` is recognized on a case-insensitive filesystem and rejected on a case-sensitive filesystem because each implementation asks the host to resolve `src/core`. D2 is right to keep the test aligned with production. The publication decision is not host-independent for a case-mismatched tree, but that variance already belongs to the settled production mechanism and is outside this unit’s scope.

### `lstatSync` parity

A directory link, junction, and broken link are excluded by the predicate and `isPhysicalDirectory`. An entry that cannot be inspected is the divergence: the predicate throws, while `isPhysicalDirectory` returns `false`. This breaks claim 1 and can redden a target during test-module loading.

### Helper move

The move adds `spawnSync`, `globSync`, `readFileSync`, and `relative` imports from Node built-ins. It adds no project-module edge and creates no cycle. The new functions perform no work at module load. `NPM_LAUNCHER` adds only a `process.platform` reading and a frozen data object.

### Helper diagnostics

The replacement throws lose the child’s actual `status` and `error`. The former Vitest assertions reported the received status, including `null`; the new messages can end with empty stdout and stderr and omit the spawn error that explains the failure. Include `status` and `error` in each pack, install, generation, and dependency-install failure.

### Returned contracts

`TestGeneratedPin` and `TestGeneratedWorkspace` use single-word members and live with the reusable test helper in `tests/setupServer.ts`. The `pin` sub-entity earns its place because callers compare emitted and installed pin facts as one unit.

`TestGeneratedWorkspace.environment` is typed as mutable `NodeJS.ProcessEnv`. That is a returned collection and violates the readonly-collection rule. Type it as `Readonly<NodeJS.ProcessEnv>`. The `manifest` property already uses a readonly record.

### Coverage sentence

The sentence at `tests/distribution.test.ts:930-932` is accurate. The app-only blueprint carries no browser environment, so it does not exercise browser configuration or Playwright projects.

### Target behavior

A repaired app-only target reports `171 passed | 3 skipped (174)`. A target with a regular `src` file or empty `src` directory changes from the scope failure to that same skipped result. A target with a physical recognized source environment still runs the scope case. A target whose recognized entry cannot be inspected can redden during module loading because of claim 1’s error-handling divergence.

## Findings fitting no claim

- **HIGH — The retained gate chain does not cover the final tree.** `.orkestrel/scaffold/d2-gates.log.txt:250-255` records a status without `tests/setupServer.test.ts`. `tmp/audit/d2-status.txt:4` and the actual diff show that the Orchestrator applied that file afterward. The recorded `test:setup` result therefore predates the added proof. Acceptance requires a fresh final-tree run of `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm run test:distribution`, and `npm test`. Vitest cannot run in this sandbox because it cannot write `node_modules/.vite-temp`.

- **MEDIUM — Child-process failures lost decisive diagnostics.** `tests/setupServer.ts:703`, `:726`, `:784`, and `:827` throw without including the received status or the `spawnSync` error. Preserve those fields in each message.

- **LOW — The returned environment collection is mutable.** `tests/setupServer.ts:417` exposes `NodeJS.ProcessEnv` instead of a readonly record.

- **LOW — The retained predicate instrument still names temporary launch copies.** `.orkestrel/scaffold/d2-instruments/d2-probe-predicate.sh` copies `tmp/units/d2-generate.mjs` and invokes `tmp/units/d2-repin.mjs` instead of its retained sibling files. The instrument stops reproducing after the temporary copies are swept.

## Attacked and held

- The temporary-workspace contamination attack failed: no ancestor or local API Extractor installation exists, and the log body shows the extractor case did not execute.
- The missing-vendored-module attack failed: the shipped config test imports no setup-server module.
- The helper-cycle attack failed: every added runtime import is a Node built-in.
- The unjustified-sub-entity attack failed: `pin` groups one emitted-to-installed relationship used by each caller.
- The blanket target-regression attack failed for ordinary generated targets. The remaining target regression is bounded to filesystem inspection errors and is carried by claim 1.

## Reconciliation

Retained findings are claim 1’s inspection-error divergence, stale final-tree gate evidence, weakened child-process diagnostics, the mutable returned environment, and the retained instrument’s temporary paths.

Dropped findings are a missing `setupServer` vendored import, a new module cycle, an inaccurate coverage sentence, an unjustified `pin` entity, and fixture-string uses of `here`. The case-fold difference is recorded as a property of the settled mechanism, not attributed to D2.

VERDICT: REJECT