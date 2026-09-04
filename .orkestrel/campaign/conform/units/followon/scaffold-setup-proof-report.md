# Unit scaffold-setup-proof — report

`tests/setup.test.ts` and `tests/setupServer.test.ts` exist, the `setup` project collects both,
`npm run test:setup` runs them from `npm test`, and `audit --offline` no longer prints the `setup`
advisory. The `test` gate is red: `npm test` fails in `tests/src/core/compilers.test.ts`, an off-limits
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
| `WORKSPACE_ROOT` | `tests/setupServer.test.ts:86` (`resolves the repository this suite is running out of, from the module rather than the process`) |
| `SCRATCH_PREFIX` | `tests/setupServer.test.ts:96` (`allocates every scratch directory this suite owns under its own prefix`) |
| `listExecutablePaths` | `tests/setupServer.test.ts:108` (`lists the tracked paths git records executable, and no path it records at another mode`) — sorted, existing, `scripts/codex.sh` in and `package.json` out |
| `CASE_FOLDING` | `tests/setupServer.test.ts:119` (`reports whether the temporary directories this run allocates resolve a recased name`) |
| `buildManifestEntry` | `tests/setupServer.test.ts:133` (`digests the destination text every host root writes for an entry`) — default digest measured against the published SHA-256 of `hi\n` |
| `buildHostManifest`, `buildStagedManifest` | `tests/setupServer.test.ts:149` (`carries an arbitrary digest on the guard fixture and a membership digest on the staged one`) |
| `buildVendoredManifest` | `tests/setupServer.test.ts:159` (`gives the vendored membership every shape a writer meets`) |
| `buildFleetManifest` | `tests/setupServer.test.ts:179` (`declares one file entry per planned path and no root at all in the fleet manifest`); totals at `:831` (`derives every fleet total from the plan a real compiler produced`) |
| `createHostRoot` | `tests/setupServer.test.ts:198` (`writes one storage file per entry and the manifest beside them`) |
| `createStagedHost` | `tests/setupServer.test.ts:214` (`stages the vendored bytes of this checkout into a scratch host`) |
| `createCheckout`, `buildCheckoutManifest`, `STAGED_PATHS`, `HOST_DIRECTORY_PATHS` | `tests/setupServer.test.ts:229` (`writes every staged path into a checkout and declares exactly it in the manifest`) |
| `createFleet` | `tests/setupServer.test.ts:254` (`leaves the fleet target holding its manifest and its source axis and nothing else`) |
| `createCatalogFleet` | `tests/setupServer.test.ts:271` (`gives the catalog target the marked region the writer replaces rather than invents`) |
| `createRepository`, `trackFiles`, `commitFiles` | `tests/setupServer.test.ts:282` (`initializes a real repository, stages its files, and commits them`), read back through `git status --porcelain` and `git log` |
| `createSink` | `tests/setupServer.test.ts:310` (`records the lines one run writes to each destination, and hands out copies of them`) |
| `buildWorktree`, `buildMaterializerOptions` | `tests/setupServer.test.ts:327` (`replaces only the named fields on the worktree and materializer builders`) |
| `buildUpstreamOptions` | `tests/setupServer.test.ts:342` (`replaces an upstream entity whole rather than merging it into the defaults`) |
| `buildServerGuardCases` | `tests/setupServer.test.ts:355` (`names every server guard case once, accepting only values that guard admits`), including `WORKSPACE_ROOT` as an accepted host path |
| `buildBoundaryCases` | `tests/setupServer.test.ts:372` (`rebuilds every boundary case fresh, under labels no two cases share, in both verdicts`) |
| `readErrorCode`, `readErrorMessage` | `tests/setupServer.test.ts:387` (`reports the code and the message of a scaffold refusal, and undefined for every other outcome`) |
| `readRejectionCode` | `tests/setupServer.test.ts:414` (`reports the code of an asynchronous scaffold refusal, and undefined for every other outcome`) |
| `buildTargetAudit` | `tests/setupServer.test.ts:424` (`reads the bytes at each path and marks stale exactly the paths the caller names`) |
| `buildTargetManifest`, `TARGET_DEV_DEPENDENCIES` | `tests/setupServer.test.ts:448` (`replaces only the named sections of a target manifest`) |
| `omitDependencies` | `tests/setupServer.test.ts:462` (`copies a dependency section without the names the caller omits, and leaves the original alone`) |
| `TARGET_MANIFEST_TEXT`, `REFUSED_MANIFEST_TEXT` | Data tables, proven by `tests/src/bin/CLI.test.ts` and `tests/src/server/Materializer.test.ts`; declared membership at `tests/setupServer.test.ts:470` (`declares the extra package a target carries and the one name the compile gate refuses`) |
| `CATALOG_AGENT_TEXT`, `CATALOG_AGENT_ROWS_TEXT` | Data tables, proven by `tests/src/server/Materializer.test.ts` and `tests/src/bin/helpers.test.ts`; marker pair at `tests/setupServer.test.ts:480` (`surrounds the catalog region with the marker pair, empty in one fixture and filled in the other`) |
| `buildPackument` | `tests/setupServer.test.ts:494` (`serves the abbreviated packument fields the registry serves, and omits an edge set it was not given`) |
| `buildOrganization` | `tests/setupServer.test.ts:521` (`lists every organization package under the access map the registry serves`) |
| `buildInventory`, `VENDORED_FILES` | `tests/setupServer.test.ts:528` (`declares one inventory entry per vendored file, in the caller order its digest authenticates`) |
| `buildVendoredSnapshot` | `tests/setupServer.test.ts:546` (`keys the vendored snapshot to the same paths, with the bytes each file carries`), cross-checked against `buildSnapshot` |
| `buildInstalledHostReplies` | `tests/setupServer.test.ts:553` (`answers the committed inventory and every host-owned path, and leaves a deferred path absent`), including the deferred paths left absent and the `floor` parameter read |
| `createUpstreamServer`, `writeUpstreamReply` | `tests/setupServer.test.ts:577` (`answers a listed path with its scripted status, body, headers, and declared length`); `:602` (`encodes a reply the script asks for and declares no length on a chunked one`); `:625` (`answers a path the script does not list with a refusal rather than a silent pass`); `:640` (`records the accept header each request carried, in arrival order`); `:658` (`holds a listed path open until the caller abandons it, and reports its arrival`); `:677` (`reports the most requests it ever held open at once`); `:703` (`drops the connection it is holding open when the suite destroys it`) |
| `buildCLIOptions` | `tests/setupServer.test.ts:732` (`points both endpoints at one loopback base and keeps the writers a run reports through`) |
| `buildOptionArgv` | `tests/setupServer.test.ts:743` (`builds the shortest command line that carries one option against one verb`) |
| `FILESYSTEM_PATH_CASES` | Data table, proven by `tests/src/server/validators.test.ts`; invariants at `tests/setupServer.test.ts:762` (`labels every row of every path table once, and maps each storage name once`), `:779` (`states both verdicts in every table that decides one`) |
| `GIT_PATH_CASES`, `PROTECTED_PATH_CASES`, `SENSITIVE_PATH_CASES`, `STORAGE_PATH_CASES` | Data tables, proven by `tests/src/server/helpers.test.ts`; invariants at `tests/setupServer.test.ts:762` (`labels every row of every path table once, and maps each storage name once`), `:779` (`states both verdicts in every table that decides one`) |
| `DIGEST_CASES` | Data table, proven by `tests/src/server/helpers.test.ts`; invariant at `tests/setupServer.test.ts:794` (`publishes an externally checkable digest for each anchor text, once`); used as the digest anchor at `:133` (`digests the destination text every host root writes for an entry`) |
| `COMMAND_CASES`, `USAGE_CASES`, `AUDIT_EXIT_CASES` | Data tables, proven by `tests/src/bin/helpers.test.ts` and `tests/src/bin/CLI.test.ts`; invariants at `tests/setupServer.test.ts:779` (`states both verdicts in every table that decides one`), `:800` (`names every accepted command line and every refused one once, under its own verb`) |
| `UPSTREAM_ENDPOINT_CASES` | Data table, proven by `tests/src/server/Upstream.test.ts`; invariant at `tests/setupServer.test.ts:779` (`states both verdicts in every table that decides one`) |
| `UPSTREAM_PATHS`, `FLEET_UPSTREAM_PATHS` | Data tables, proven by `tests/src/server/Upstream.test.ts` and `tests/src/bin/CLI.test.ts`; frozen canonical forms at `tests/setupServer.test.ts:808` (`addresses every canonical upstream path from a frozen table`) |
| `HOSTILE_ARGUMENT`, `HOSTILE_BYTES` | Data tables, proven by `tests/src/bin/CLI.test.ts`; cross-constant invariant at `tests/setupServer.test.ts:825` (`carries every byte the hostile argument names`) |
| `CORE_GENERATED`, `CORE_GENERATED_COUNT`, `FLEET_ARTIFACT_COUNT`, `FLEET_BIRTH_PATHS`, `FLEET_BIRTH_COUNT` | `tests/setupServer.test.ts:831` (`derives every fleet total from the plan a real compiler produced`) |
| `buildCompiledPlan`, `buildVendoredPlan` | `tests/setupServer.test.ts:847` (`compiles the default blueprint through a real compiler and plans every vendored shape`) |

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

Planted, a helper body in each module:

- `tests/setup.ts` `buildQuestion`: `blocking: true` replaced by `blocking: false`.
- `tests/setupServer.ts` `buildManifestEntry`: the default digest over the destination text plus a
  newline replaced by a digest over the destination alone.

Red: exit 1, `Tests 2 failed | 67 passed (69)`, failing
`tests/setup.test.ts > the inert value builders > replaces only the named fields on the dependency,
override, and question builders` and `tests/setupServer.test.ts > the manifest builders > digests
the destination text every host root writes for an entry`. Capture:
`/home/user/work/evidence/scaffold-proofs/setup-red-control.txt`.

Restored by editing the same lines back; `git diff --stat -- tests/setup.ts tests/setupServer.ts`
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

  The control that follows it (`tests/src/core/compilers.test.ts:1201`) still discriminates: the blueprint it
  compiles carries neither `bin`, `guides`, nor `setup`.

**2. `npx scaffold audit --offline` does not run in this checkout.**

- Expected: the audit command the brief names.
- Found: `sh: 1: scaffold: Permission denied`, after roughly 80 seconds. `node_modules/.bin/scaffold`
  does not exist, so `npx` resolved something else.
- Carried on with `node dist/bin/main.js audit --offline`, the entry the repository's own `scaffold`
  script runs (`package.json:64`), against the `dist` the `build` gate had just produced. Both audit
  readings in this report come from it.

**3. The setup modules were edited and restored for the controls.**

The brief's Law paragraph requires the plant, and the modules are otherwise off limits. Both were
restored by editing the same lines back, and `git diff --stat -- tests/setup.ts tests/setupServer.ts`
prints nothing.

**Ancillary decisions, recorded and carried on from.**

- No owned prose became false. `grep -rn "test:setup\|test:config\|test:policy" guides/*.md README.md`
  returns only `guides/scaffold.md:647`, `:821`, and `:825`, which state what a generated target
  receives and remain true. `grep -n "tests/" guides/README.md` returns the concept-index row for
  `tests/src/core` and `tests/src/server` and the links to `tests/guides.test.ts`; the index
  carries no row for a cross-cutting proof, so no row was owed.
- `tests/setup.test.ts` imports `./setup.js` and `vitest` alone. `tests/setupServer.test.ts` adds the
  Node modules it owns, `@orkestrel/test`, `@orkestrel/test/server`, `./setup.js`, and `ScaffoldError`
  from `@src/core`, which supplies the input the refusal readers narrow.
- `writeUpstreamReply` is proven through `createUpstreamServer`, which is its only caller: the cases
  read the status, body, `content-type`, `location`, declared length, gzip encoding, and the chunked
  form with no length.

## Fix round 1

Round 1 closed the checker's refutations of claims 1 and 9
(`.orkestrel/campaign/conform/units/followon/scaffold-setup-proof-checker-grok.result.md`) and the
objective lane's refutations of claims 1, 5, and 9, with findings O-1 and O-2 and referral R-1
(`.orkestrel/campaign/conform/units/followon/scaffold-setup-proof-objective-r1.md`).

**Claim 5 — `tests/setupServer.test.ts:703-728`, `drops the connection it is holding open when the
suite destroys it`.** Before: the body ran `server.destroy()` in-line with no `finally`, so an
earlier assertion failure left the listener and the held request open. After: the body after
`const server = await createUpstreamServer({ … })` is wrapped in `try { … } finally { await
server.destroy() }`, keeping the in-body `await server.destroy()` the case asserts on;
`destroy` is idempotent (`guides/test.md:1148`), so the second call the `finally` adds is inert on
the pass path.

**O-2 — `tests/setupServer.test.ts:96-105`, `allocates every scratch directory this suite owns
under its own prefix`.** Before: `expect(workspace.path.includes(SCRATCH_PREFIX)).toBe(true)`, a
tautology that re-derives its answer from the value it feeds in. After: `expect
(SCRATCH_PREFIX.includes('/')).toBe(false)`, `expect(SCRATCH_PREFIX.includes('\\')).toBe(false)`,
and `expect(basename(workspace.path).startsWith(SCRATCH_PREFIX)).toBe(true)`, importing `basename`
from `node:path` beside the file's other `node:` imports (`tests/setupServer.test.ts:3`).

Control: `npm run test:setup`, run with `SCRATCH_PREFIX` planted at `tests/setupServer.ts:242` as
`'orkestrel/scaffold-'`. Red capture:
`/home/user/work/evidence/scaffold-proofs/fix1-prefix-planted-red.txt`, `Tests 9 failed | 60 passed
(69)` — the planted separator makes `createScratch` itself refuse with `Scratch prefix must be a
name fragment`, failing the prefix case and every other case that allocates a scratch with this
prefix. Restored `tests/setupServer.ts:242` to `'orkestrel-scaffold-'` and reran; green capture:
`/home/user/work/evidence/scaffold-proofs/fix1-prefix-green.txt`, `Tests 69 passed (69)`.
`git diff --stat -- tests/setupServer.ts` printed nothing after the restore.

**Claim 1 and R-1.** Every `tests/setupServer.test.ts` coverage-table row now carries the actual
`it(` title beside its re-derived line, read from the tree after the claim 5 and O-2 edits moved
it. The full corrected table is in § Coverage; every row the objective lane listed
(`buildCLIOptions` onward, 11 rows) and every row before it were checked and updated where the
title or line had moved.

**Claim 9.** `:5` "One gate is red" → "The `test` gate is red"; `:125` "Planted, one helper body per
module" → "Planted, a helper body in each module"; `:137` "Restored by editing the same two lines
back" → "Restored by editing the same lines back"; `:231` "The control below it" → "The control
that follows it"; `:243` "The two setup modules were edited" → "The setup modules were edited";
`:254` "the two links to `tests/guides.test.ts`" → "the links to `tests/guides.test.ts`". Swept
`\b(one|two|three|both|below|above)\b`, case-insensitive, over the report: every remaining hit is
either a value beside its measurement, a fixed named pair with its members named in the same
sentence or paragraph, or a literal `it(` title quoted verbatim from source — none names a set that
grows, so none was changed.

**Rulings applied.** R-1 adopted: the coverage table now cites each case's title beside its line.
O-3: observation, no change. `:108` ("the last declared `test:` key was `test:bench`") and `:160`
("the `test` chain stops at the first failure") are permitted: each states a rule or a behavior and
names no list item by its position. O-1 is the Orchestrator's retention and is closed after this
round; this unit did not touch `.orkestrel/**`.
