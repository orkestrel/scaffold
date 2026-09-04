All gates ran green and the tree is clean except the one owned tracked file. Final output below.

## Tree edits

- `/home/user/scaffold/tests/setupServer.test.ts:3` — before: `import { join } from 'node:path'`; after: `import { basename, join } from 'node:path'`.
- `/home/user/scaffold/tests/setupServer.test.ts:96-105` (O-2) — before: `expect(workspace.path.includes(SCRATCH_PREFIX)).toBe(true)` (tautology); after: `expect(SCRATCH_PREFIX.includes('/')).toBe(false)`, `expect(SCRATCH_PREFIX.includes('\\')).toBe(false)`, `expect(basename(workspace.path).startsWith(SCRATCH_PREFIX)).toBe(true)`.
- `/home/user/scaffold/tests/setupServer.test.ts:703-728` (claim 5) — before: in-line `await server.destroy()` with no `finally`; after: the case body is wrapped `try { … } finally { await server.destroy() }`, keeping the in-body `await server.destroy()` the case asserts on.

## Control (O-2 failing-first proof)

Command: `npm run test:setup`, with `tests/setupServer.ts:242` planted `'orkestrel/scaffold-'`.

- Red: `Tests 9 failed | 60 passed (69)` — `/home/user/work/evidence/scaffold-proofs/fix1-prefix-planted-red.txt`. `createScratch` refuses the planted separator directly (`Scratch prefix must be a name fragment`), failing the prefix case and every other case allocating a scratch under it.
- Restored `tests/setupServer.ts:242` to `'orkestrel-scaffold-'`; `git diff --stat -- tests/setupServer.ts` printed nothing.
- Green: `Tests 69 passed (69)` — `/home/user/work/evidence/scaffold-proofs/fix1-prefix-green.txt`.

## Re-derived coverage rows (all `tests/setupServer.test.ts` rows changed)

| Export | `file:line` (`it(` title) |
| --- | --- |
| `WORKSPACE_ROOT` | `:86` (`resolves the repository this suite is running out of, from the module rather than the process`) |
| `SCRATCH_PREFIX` | `:96` (`allocates every scratch directory this suite owns under its own prefix`) |
| `listExecutablePaths` | `:108` (`lists the tracked paths git records executable, and no path it records at another mode`) |
| `CASE_FOLDING` | `:119` (`reports whether the temporary directories this run allocates resolve a recased name`) |
| `buildManifestEntry` | `:133` (`digests the destination text every host root writes for an entry`) |
| `buildHostManifest`, `buildStagedManifest` | `:149` (`carries an arbitrary digest on the guard fixture and a membership digest on the staged one`) |
| `buildVendoredManifest` | `:159` (`gives the vendored membership every shape a writer meets`) |
| `buildFleetManifest` | `:179` (`declares one file entry per planned path and no root at all in the fleet manifest`); totals `:831` (`derives every fleet total from the plan a real compiler produced`) |
| `createHostRoot` | `:198` (`writes one storage file per entry and the manifest beside them`) |
| `createStagedHost` | `:214` (`stages the vendored bytes of this checkout into a scratch host`) |
| `createCheckout` and table | `:229` (`writes every staged path into a checkout and declares exactly it in the manifest`) |
| `createFleet` | `:254` (`leaves the fleet target holding its manifest and its source axis and nothing else`) |
| `createCatalogFleet` | `:271` (`gives the catalog target the marked region the writer replaces rather than invents`) |
| `createRepository` group | `:282` (`initializes a real repository, stages its files, and commits them`) |
| `createSink` | `:310` (`records the lines one run writes to each destination, and hands out copies of them`) |
| `buildWorktree`, `buildMaterializerOptions` | `:327` (`replaces only the named fields on the worktree and materializer builders`) |
| `buildUpstreamOptions` | `:342` (`replaces an upstream entity whole rather than merging it into the defaults`) |
| `buildServerGuardCases` | `:355` (`names every server guard case once, accepting only values that guard admits`) |
| `buildBoundaryCases` | `:372` (`rebuilds every boundary case fresh, under labels no two cases share, in both verdicts`) |
| `readErrorCode`, `readErrorMessage` | `:387` |
| `readRejectionCode` | `:414` |
| `buildTargetAudit` | `:424` |
| `buildTargetManifest`, `TARGET_DEV_DEPENDENCIES` | `:448` |
| `omitDependencies` | `:462` |
| `TARGET_MANIFEST_TEXT`, `REFUSED_MANIFEST_TEXT` | `:470` |
| `CATALOG_AGENT_TEXT`, `CATALOG_AGENT_ROWS_TEXT` | `:480` |
| `buildPackument` | `:494` |
| `buildOrganization` | `:521` |
| `buildInventory`, `VENDORED_FILES` | `:528` |
| `buildVendoredSnapshot` | `:546` |
| `buildInstalledHostReplies` | `:553` |
| `createUpstreamServer`, `writeUpstreamReply` | `:577`, `:602`, `:625`, `:640`, `:658`, `:677`, `:703` |
| `buildCLIOptions` | `:732` (`points both endpoints at one loopback base and keeps the writers a run reports through`) |
| `buildOptionArgv` | `:743` (`builds the shortest command line that carries one option against one verb`) |
| `FILESYSTEM_PATH_CASES` group | `:762`, `:779` |
| `GIT_PATH_CASES` group | `:762`, `:779` |
| `DIGEST_CASES` | `:794`; anchor `:133` |
| `COMMAND_CASES`, `USAGE_CASES`, `AUDIT_EXIT_CASES` | `:779`, `:800` |
| `UPSTREAM_ENDPOINT_CASES` | `:779` |
| `UPSTREAM_PATHS`, `FLEET_UPSTREAM_PATHS` | `:808` |
| `HOSTILE_ARGUMENT`, `HOSTILE_BYTES` | `:825` |
| `CORE_GENERATED` group | `:831` |
| `buildCompiledPlan`, `buildVendoredPlan` | `:847` |

## Report sentences before/after

- `:5` "One gate is red" → "The `test` gate is red"
- `:125` "Planted, one helper body per module" → "Planted, a helper body in each module"
- `:137` "Restored by editing the same two lines back" → "Restored by editing the same lines back"
- `:231` "The control below it" → "The control that follows it"
- `:243` "The two setup modules were edited" → "The setup modules were edited"
- `:254` "the two links to `tests/guides.test.ts`" → "the links to `tests/guides.test.ts`"

Appended `## Fix round 1` to the report naming both lane files, each edit, the control, and the rulings.

## `git status --short`

```
 M tests/setupServer.test.ts
```

## Gate exit codes

- `npm run format:check` — 0
- `npm run lint:check` — 0
- `npm run check` — 0
- `npm run test:setup` — 0
