# Unit scaffold-setup-proof — report

`tests/setup.test.ts` and `tests/setupServer.test.ts` exist, the `setup` project collects both,
`npm run test:setup` runs them from `npm test`, and `audit --offline` no longer prints the `setup`
advisory. One gate is red: `npm test` fails in `tests/src/core/compilers.test.ts`, an off-limits
file whose fixed blueprint no longer describes this repository. The exact patch is in § Deviations.

## Export coverage

`tests/setup.ts`, proven by `tests/setup.test.ts`:

| Export | Proven by |
| --- | --- |
| `TestHostileCase`, `TestGuardCase`, `TestParserCase`, `TestPathCase`, `TestUnionCase`, `TestPurityCase`, `TestRangeCase` | Types; each is read by the case over the table it describes, `tests/setup.test.ts:148`–`:283` |
| `TestSample` | `tests/setup.test.ts:192` constructs a real instance and reads the prototype the reparented case severs |
| `buildBlueprint` | `tests/setup.test.ts:41` focused replacement over the minimal workspace; `:59` a fresh record per call |
| `buildDependency`, `buildOverride`, `buildQuestion` | `tests/setup.test.ts:66` |
| `buildHostArtifact`, `buildHydratedArtifact`, `buildContentArtifact` | `tests/setup.test.ts:90` each branch carries its own keys and none of the others |
| `buildPlan` | `tests/setup.test.ts:108` |
| `buildSnapshot` | `tests/setup.test.ts:119` |
| `buildFinding`, `buildAudit` | `tests/setup.test.ts:125` |
| `buildHooks`, `buildCompilerOptions` | `tests/setup.test.ts:135` |
| `THROWING_KEYS_TRAP`, `THROWING_GET_TRAP`, `THROWING_PROTOTYPE_TRAP`, `THROWING_ACCESSOR_DESCRIPTOR`, `BENIGN_ACCESSOR_DESCRIPTOR` | `tests/setup.test.ts:178` installs each trap and descriptor and reads what it does |
| `buildHostileCases` | `tests/setup.test.ts:148` fresh values, labels unique |
| `selectHostileCase` | `tests/setup.test.ts:160` selects a label and refuses one the matrix does not carry |
| `readKeyCount` | `tests/setup.test.ts:169` counts naively and fails on the reflective hostility a total guard survives |
| `buildGuardCases` | `tests/setup.test.ts:203` names unique, accepted values pass their own guard, every `admits` label resolves to a hostile case |
| `buildParserCases` | `tests/setup.test.ts:218` |
| `buildUnionCases` | `tests/setup.test.ts:237` accepted passes, twin fails, and the pair differs by exactly one key |
| `buildPurityCases` | `tests/setup.test.ts:255` helper names unique, every call runs, every input is a value a mutation could reach |
| `PATH_CASES` | Data table, proven by `tests/src/core/validators.test.ts`; shape invariant at `tests/setup.test.ts:268` |
| `RANGE_CASES` | Data table, proven by `tests/src/core/helpers.test.ts`; shape invariant at `tests/setup.test.ts:276` |
| `BROWSER_RESOLVER_EXPORTS` | Data table, proven by `tests/src/core/templates.test.ts`; frozen and unique at `tests/setup.test.ts:285` |
| `MANIFEST_SAMPLE` | Data table, proven by `tests/src/core/helpers.test.ts`; stated whole at `tests/setup.test.ts:292` |

`tests/setupServer.ts`, proven by `tests/setupServer.test.ts`:

| Export | Proven by |
| --- | --- |
| `TestCommandCase`, `TestUsageCase`, `TestAuditCase`, `TestBoundaryCase`, `TestMatchCase`, `TestStorageCase`, `TestDigestCase`, `TestEndpointCase`, `TestUpstreamReply`, `TestPackumentEdges`, `TestVendoredFile`, `TestUpstreamInterface`, `TestSinkInterface` | Types; each is read by the case over the table or fixture it describes |
| `WORKSPACE_ROOT` | `tests/setupServer.test.ts:86` resolves this checkout from the module rather than the process |
| `SCRATCH_PREFIX` | `tests/setupServer.test.ts:96` |
| `listExecutablePaths` | `tests/setupServer.test.ts:106` sorted, existing, `scripts/codex.sh` in and `package.json` out |
| `CASE_FOLDING` | `tests/setupServer.test.ts:117` probed against a recased read in a real scratch directory |
| `buildManifestEntry` | `tests/setupServer.test.ts:131` default digest measured against the published SHA-256 of `hi\n` |
| `buildHostManifest`, `buildStagedManifest` | `tests/setupServer.test.ts:147` arbitrary digest against membership digest |
| `buildVendoredManifest` | `tests/setupServer.test.ts:157` every writer shape, `.claude/skills` empty, executable set, digest moves with membership |
| `buildFleetManifest` | `tests/setupServer.test.ts:177`; totals at `:814` |
| `createHostRoot` | `tests/setupServer.test.ts:196` storage bytes and `manifest.json` written |
| `createStagedHost` | `tests/setupServer.test.ts:212` staged bytes equal this checkout's `AGENTS.md` |
| `createCheckout`, `buildCheckoutManifest`, `STAGED_PATHS`, `HOST_DIRECTORY_PATHS` | `tests/setupServer.test.ts:227` |
| `createFleet` | `tests/setupServer.test.ts:252` |
| `createCatalogFleet` | `tests/setupServer.test.ts:269` |
| `createRepository`, `trackFiles`, `commitFiles` | `tests/setupServer.test.ts:280`, read back through `git status --porcelain` and `git log` |
| `createSink` | `tests/setupServer.test.ts:308` arrival order and a copy per read |
| `buildWorktree`, `buildMaterializerOptions` | `tests/setupServer.test.ts:325` |
| `buildUpstreamOptions` | `tests/setupServer.test.ts:340` an entity is replaced whole rather than merged |
| `buildServerGuardCases` | `tests/setupServer.test.ts:353`, including `WORKSPACE_ROOT` as an accepted host path |
| `buildBoundaryCases` | `tests/setupServer.test.ts:370` fresh values, labels unique, both verdicts |
| `readErrorCode`, `readErrorMessage` | `tests/setupServer.test.ts:385` |
| `readRejectionCode` | `tests/setupServer.test.ts:412` |
| `buildTargetAudit` | `tests/setupServer.test.ts:422` aligned, stale, and missing against real files |
| `buildTargetManifest`, `TARGET_DEV_DEPENDENCIES` | `tests/setupServer.test.ts:446` |
| `omitDependencies` | `tests/setupServer.test.ts:460` |
| `TARGET_MANIFEST_TEXT`, `REFUSED_MANIFEST_TEXT` | Data tables, proven by `tests/src/bin/CLI.test.ts` and `tests/src/server/Materializer.test.ts`; declared membership at `tests/setupServer.test.ts:468` |
| `CATALOG_AGENT_TEXT`, `CATALOG_AGENT_ROWS_TEXT` | Data tables, proven by `tests/src/server/Materializer.test.ts` and `tests/src/bin/helpers.test.ts`; marker pair at `tests/setupServer.test.ts:478` |
| `buildPackument` | `tests/setupServer.test.ts:492` |
| `buildOrganization` | `tests/setupServer.test.ts:519` |
| `buildInventory`, `VENDORED_FILES` | `tests/setupServer.test.ts:526` |
| `buildVendoredSnapshot` | `tests/setupServer.test.ts:544`, cross-checked against `buildSnapshot` |
| `buildInstalledHostReplies` | `tests/setupServer.test.ts:551`, including the deferred paths left absent and the `floor` parameter read |
| `createUpstreamServer`, `writeUpstreamReply` | `tests/setupServer.test.ts:575` status, body, headers, declared length; `:600` gzip and chunked; `:623` the 404 branch; `:638` accepts; `:656` held and arrival; `:675` peak; `:701` destroy releasing a held connection |
| `buildCLIOptions` | `tests/setupServer.test.ts:715` |
| `buildOptionArgv` | `tests/setupServer.test.ts:726` |
| `FILESYSTEM_PATH_CASES` | Data table, proven by `tests/src/server/validators.test.ts`; invariants at `tests/setupServer.test.ts:745`, `:762` |
| `GIT_PATH_CASES`, `PROTECTED_PATH_CASES`, `SENSITIVE_PATH_CASES`, `STORAGE_PATH_CASES` | Data tables, proven by `tests/src/server/helpers.test.ts`; invariants at `tests/setupServer.test.ts:745`, `:762` |
| `DIGEST_CASES` | Data table, proven by `tests/src/server/helpers.test.ts`; invariant at `tests/setupServer.test.ts:777`; used as the digest anchor at `:131` |
| `COMMAND_CASES`, `USAGE_CASES`, `AUDIT_EXIT_CASES` | Data tables, proven by `tests/src/bin/helpers.test.ts` and `tests/src/bin/CLI.test.ts`; invariants at `tests/setupServer.test.ts:762`, `:783` |
| `UPSTREAM_ENDPOINT_CASES` | Data table, proven by `tests/src/server/Upstream.test.ts`; invariant at `tests/setupServer.test.ts:762` |
| `UPSTREAM_PATHS`, `FLEET_UPSTREAM_PATHS` | Data tables, proven by `tests/src/server/Upstream.test.ts` and `tests/src/bin/CLI.test.ts`; frozen canonical forms at `tests/setupServer.test.ts:791` |
| `HOSTILE_ARGUMENT`, `HOSTILE_BYTES` | Data tables, proven by `tests/src/bin/CLI.test.ts`; cross-constant invariant at `tests/setupServer.test.ts:808` |
| `CORE_GENERATED`, `CORE_GENERATED_COUNT`, `FLEET_ARTIFACT_COUNT`, `FLEET_BIRTH_PATHS`, `FLEET_BIRTH_COUNT` | `tests/setupServer.test.ts:814` |
| `buildCompiledPlan`, `buildVendoredPlan` | `tests/setupServer.test.ts:830` |

## The wiring edits

`vite.config.ts`, before: `test.projects` was
`[srcCore, srcServer, srcBin, policy, config, guides, distribution, probe]` and no `setup` factory
existed. After, the factory sits between `config` and `guides` at `vite.config.ts:159`–`:168`:

```ts
export const setup = (): UserConfig => ({
	resolve,
	test: {
		name: { label: 'setup', color: 'white' },
		include: ['tests/setup*.test.ts'],
		setupFiles: ['./tests/setup.ts'],
		environment: 'node',
		browser: { enabled: false },
	},
})
```

and `vite.config.ts:217` reads
`projects: [srcCore, srcServer, srcBin, policy, config, setup, guides, distribution, probe]`.

`package.json`, before: `test` ran `test:src:core`, `test:src:server`, `test:src:bin`,
`test:policy`, `test:config`, `test:guides`, and the last declared `test:` key was `test:bench`.
After, `package.json:74` invokes `npm run test:setup` between `npm run test:config` and
`npm run test:guides`, and `package.json:84` declares, after `test:bench` and before `build`:

```json
"test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup",
```

Both edits are what the compiler emits: the probe at
`/home/user/work/evidence/scaffold-proofs/config-parity-probe.txt` compiled this repository's
configuration artifacts from `createBlueprint('scaffold', { src: ['core','server'], bin: true,
guides: true, setup: true })` and every artifact matched the file on disk byte for byte.

## Failing-first controls

Command for each capture: `npm run test:setup`.

Planted, one helper body per module:

- `tests/setup.ts` `buildQuestion`: `blocking: true` replaced by `blocking: false`.
- `tests/setupServer.ts` `buildManifestEntry`: the default digest over the destination text plus a
  newline replaced by a digest over the destination alone.

Red: exit 1, `Tests 2 failed | 67 passed (69)`, failing
`tests/setup.test.ts > the inert value builders > replaces only the named fields on the dependency,
override, and question builders` and `tests/setupServer.test.ts > the manifest builders > digests
the destination text every host root writes for an entry`. Capture:
`/home/user/work/evidence/scaffold-proofs/setup-red-control.txt`.

Restored by editing the same two lines back; `git diff --stat -- tests/setup.ts tests/setupServer.ts`
prints nothing. Green: exit 0, `Tests 69 passed (69)`. Capture:
`/home/user/work/evidence/scaffold-proofs/setup-green.txt`.

## Gate readings

Each reading was taken inside this unit's own exec, with its harness resident.

| Command | Exit | Capture |
| --- | --- | --- |
| `npm run format:check` | 0 | `gate-format-check.txt` |
| `npm run lint:check` | 0 | `gate-lint-check.txt` |
| `npm run check` | 0 | `gate-check.txt` |
| `npm run build` | 0 | `gate-build.txt` |
| `npm test` | 1 | `gate-test.txt` — `Tests 1 failed, 387 passed (388)` in `src:core`; the chain stops there |
| `npm run test:setup` | 0 | `setup-green.txt` — `Tests 69 passed (69)` |
| `npm run test:config` | 0 | `gate-test-config.txt` — `Tests 46 passed (46)` |
| `npx vitest run … --project src:server` | 0 | `gate-test-src-server.txt` — `Tests 431 passed (431)` |
| `npx vitest run … --project src:bin` | 0 | `gate-test-src-bin.txt` — `Tests 245 passed (245)` |
| `npx vitest run … --project policy` | 0 | `gate-test-policy.txt` — `Tests 111 passed (111)` |
| `npx vitest run … --project guides` | 0 | `gate-test-guides.txt` — `Tests 17 passed (17)` |

Captures are under `/home/user/work/evidence/scaffold-proofs/`. The projects after `src:core` were
run one at a time because the `test` chain stops at the first failure and would otherwise report
nothing about them.

## The audit reading

Before: `/home/user/work/evidence/scaffold-proofs/audit-before.txt`, exit 1, opening with

```text
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupServer.ts. Add tests/setup.test.ts, tests/setupServer.test.ts, each covering the module of the same name. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
```

After: `/home/user/work/evidence/scaffold-proofs/audit-after.txt`, exit 1.
`diff audit-before.txt audit-after.txt` reports exactly `1d0` — that advisory line and nothing else.
The canon rows are unchanged: `AGENTS.md` and `CLAUDE.md` stale, every `.mcp.json`, `.agents/**`,
`.claude/**`, `.codex/**`, and `.cursor/**` row foreign, and the closing line still reads
`2 of 42 planned paths drifted from the plan.` No `projects` question appeared, so the maintainer-owned
`test` chain reaches the registered project.

## Repository state

```text
$ git status --short
 M package.json
 M vite.config.ts
?? tests/setup.test.ts
?? tests/setupServer.test.ts

$ git diff --stat
 package.json   |  3 ++-
 vite.config.ts | 13 ++++++++++++-
 2 files changed, 14 insertions(+), 2 deletions(-)
```

## The unknown the brief named

`tests/config.test.ts` constrains the `setup` project by label rather than by position. It builds an
expected map and compares `configured.get(label)` for each entry (`tests/config.test.ts:281`), so the
array position is free. What it requires is exactly the worker pattern: registered whenever
`globSync('tests/setup*.test.ts')` matches, with `include: 'tests/setup*.test.ts'` and
`setup: ['./tests/setup.ts']` (`tests/config.test.ts:130`–`:137`). `npm run test:config` exits 0
against the wiring, so the file required nothing beyond that.

## Deviations

**1. `npm test` reddens on an off-limits file, and one line closes it.**

- Expected: the gate chain green after the wiring.
- Found: `tests/src/core/compilers.test.ts > blueprintToRootVite fixed proofs > keeps this repository
  byte-identical to every configuration it generates` fails. Its fixed blueprint
  (`tests/src/core/compilers.test.ts:1167`–`:1171`) omits `setup`, so the configuration it generates
  for comparison carries no `setup` project while the checkout now does. The reported diff is the
  factory block and the `projects` row, both added on the received side.
- Evidence: `/home/user/work/evidence/scaffold-proofs/gate-test.txt`, and the probe
  `/home/user/work/evidence/scaffold-proofs/config-parity-probe.txt`:
  `without setup => drifted: vite.config.ts` / `with setup => drifted: none`. The probe compiled every
  configuration artifact through the built `blueprintToConfigArtifacts` and compared each against the
  file on disk, so the repository's own configuration is byte-identical to what scaffold emits for its
  real facts.
- Done: everything this unit owns. Not done: this gate, which needs a file the brief places off
  limits.
- Patch, report-only, in `tests/src/core/compilers.test.ts` at `:1167`:

```diff
 		const blueprint = createBlueprint('scaffold', {
 			src: ['core', 'server'],
 			bin: true,
 			guides: true,
+			setup: true,
 		})
```

  The control below it (`tests/src/core/compilers.test.ts:1201`) still discriminates: the blueprint it
  compiles carries neither `bin`, `guides`, nor `setup`.

**2. `npx scaffold audit --offline` does not run in this checkout.**

- Expected: the audit command the brief names.
- Found: `sh: 1: scaffold: Permission denied`, after roughly 80 seconds. `node_modules/.bin/scaffold`
  does not exist, so `npx` resolved something else.
- Carried on with `node dist/bin/main.js audit --offline`, the entry the repository's own `scaffold`
  script runs (`package.json:64`), against the `dist` the `build` gate had just produced. Both audit
  readings in this report come from it.

**3. The two setup modules were edited and restored for the controls.**

The brief's Law paragraph requires the plant, and the modules are otherwise off limits. Both were
restored by editing the same lines back, and `git diff --stat -- tests/setup.ts tests/setupServer.ts`
prints nothing.

**Ancillary decisions, recorded and carried on from.**

- No owned prose became false. `grep -rn "test:setup\|test:config\|test:policy" guides/*.md README.md`
  returns only `guides/scaffold.md:647`, `:821`, and `:825`, which state what a generated target
  receives and remain true. `grep -n "tests/" guides/README.md` returns the concept-index row for
  `tests/src/core` and `tests/src/server` and the two links to `tests/guides.test.ts`; the index
  carries no row for a cross-cutting proof, so no row was owed.
- `tests/setup.test.ts` imports `./setup.js` and `vitest` alone. `tests/setupServer.test.ts` adds the
  Node modules it owns, `@orkestrel/test`, `@orkestrel/test/server`, `./setup.js`, and `ScaffoldError`
  from `@src/core`, which supplies the input the refusal readers narrow.
- `writeUpstreamReply` is proven through `createUpstreamServer`, which is its only caller: the cases
  read the status, body, `content-type`, `location`, declared length, gzip encoding, and the chunked
  form with no length.
