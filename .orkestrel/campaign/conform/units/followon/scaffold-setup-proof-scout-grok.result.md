I'll read the brief first, then follow it exactly in read-only mode.The brief is a read-only scout. I’ll pull the named files next and distill only the sections it asks for.Scaffold has no `setup` Vitest project. I’ll check the workspace rule and the worker target’s config so the Projects and Hazards sections stay accurate.## Rule

`.claude/rules/tests.md:59` — table row `tests/setup*.test.ts`: “Reusable behavior exported from sibling `tests/setup*.ts` modules works as the workspace's suites require”.

`.claude/rules/tests.md:62-64`: “Put each root `tests/setup*.test.ts` proof in the `setup` project. Keep its assertions on exported test-infrastructure behavior: do not duplicate production behavior there, and do not move setup-helper assertions into another cross-cutting proof.”

`.claude/rules/tests.md:182`: “Export every reusable helper, fixture type, factory, constant, and guard from setup files.”

`.claude/rules/tests.md:183`: “A setup file owns everything an assertion needs and nothing an assertion is: `describe`, `it`, and `expect` never appear in a `setup*.ts`.”

`.claude/rules/tests.md:184`: “Data tables and case matrices belong in a setup file at any size; test registration does not.”

`.claude/rules/tests.md:192-193`: “`tests/setup.ts`: host-independent; no `node:*`, DOM, `window`, or Vue.” / “`tests/setupServer.ts`: Node-only helpers and `node:fs` loaders anchored to `WORKSPACE_ROOT`.”

## Exports

### `tests/setup.ts`

| Symbol | `file:line` | Signature | What it does | Resource |
| --- | --- | --- | --- | --- |
| `TestHostileCase` | `tests/setup.ts:83` | `interface { label, value, owned }` | Names one adversarial value for a total guard/parser/cloner. | none (type) |
| `TestGuardCase` | `tests/setup.ts:97` | `interface { name, guard, accepted, admits }` | Names one published guard plus what it must accept and which hostile labels it may admit. | none (type) |
| `TestParserCase` | `tests/setup.ts:105` | `interface { name, parse, guard, accepted, refused }` | Names one coercer beside the guard it is derived from. | none (type) |
| `TestPathCase` | `tests/setup.ts:114` | `interface { label, path, accepted }` | Names one candidate path the portable-path law decides. | none (type) |
| `TestUnionCase` | `tests/setup.ts:127` | `interface { label, guard, accepted, refused }` | Names a sound record beside a twin that carries one forbidden key. | none (type) |
| `TestPurityCase` | `tests/setup.ts:135` | `interface { helper, call, inputs }` | Names one helper call whose determinism and input independence are measured. | none (type) |
| `TestRangeCase` | `tests/setup.ts:142` | `interface { range, latest, satisfied }` | Names one declared range measured against a reported version. | none (type) |
| `TestSample` | `tests/setup.ts:155` | `class { readonly hostile = 'x' }` | Supplies a real class instance so the hostile matrix can sever its prototype. | in-memory instance |
| `buildBlueprint` | `tests/setup.ts:178` | `(fields?: Partial<Blueprint>) => Blueprint` | Returns a valid inert blueprint with focused field replacements over `DEFAULT_VERSION` / `DEFAULT_ENGINES`. | in-memory |
| `buildDependency` | `tests/setup.ts:209` | `(fields?: Partial<Dependency>) => Dependency` | Returns a valid inert runtime dependency (`@orkestrel/emitter` `^0.0.5`). | in-memory |
| `buildOverride` | `tests/setup.ts:219` | `(fields?: Partial<Override>) => Override` | Returns a valid inert artifact override (`README.md`). | in-memory |
| `buildQuestion` | `tests/setup.ts:229` | `(fields?: Partial<Question>) => Question` | Returns a valid inert question (`field: 'src'`, blocking). | in-memory |
| `buildHostArtifact` | `tests/setup.ts:239` | `(fields?: Partial<HostArtifact>) => HostArtifact` | Returns a planned host artifact whose bytes have not been read. | in-memory |
| `buildHydratedArtifact` | `tests/setup.ts:249` | `(fields?: Partial<HydratedArtifact>) => HydratedArtifact` | Returns a planned host artifact whose vendored bytes are already hex. | in-memory |
| `buildContentArtifact` | `tests/setup.ts:266` | `(fields?: Partial<ContentArtifact>) => ContentArtifact` | Returns a planned artifact whose text this package produces. | in-memory |
| `buildPlan` | `tests/setup.ts:283` | `(fields?: Partial<Plan>) => Plan` | Returns a valid inert plan over `buildBlueprint` and one content artifact. | in-memory |
| `buildSnapshot` | `tests/setup.ts:297` | `() => Snapshot` | Returns one path keyed to the hex bytes of `# Agents\n`. | in-memory |
| `buildFinding` | `tests/setup.ts:306` | `() => Finding` | Returns a missing finding with no observed bytes. | in-memory |
| `buildAudit` | `tests/setup.ts:315` | `() => Audit` | Returns an audit carrying `buildFinding` and `buildQuestion`. | in-memory |
| `buildHooks` | `tests/setup.ts:324` | `() => EmitterHooks<CompilerEventMap>` | Returns hooks wiring `createRecorder` to `compile`. | in-memory recorder |
| `buildCompilerOptions` | `tests/setup.ts:333` | `() => CompilerOptions` | Returns options carrying `buildHooks` and no error handler. | in-memory |
| `THROWING_KEYS_TRAP` | `tests/setup.ts:338` | `ProxyHandler<object>` | Trap table whose `ownKeys` throws. | in-memory |
| `THROWING_GET_TRAP` | `tests/setup.ts:345` | `ProxyHandler<object>` | Trap table whose property read throws. | in-memory |
| `THROWING_PROTOTYPE_TRAP` | `tests/setup.ts:352` | `ProxyHandler<object>` | Trap table whose prototype read throws. | in-memory |
| `THROWING_ACCESSOR_DESCRIPTOR` | `tests/setup.ts:359` | `PropertyDescriptor` | Descriptor whose getter throws. | in-memory |
| `BENIGN_ACCESSOR_DESCRIPTOR` | `tests/setup.ts:368` | `PropertyDescriptor` | Descriptor whose getter returns `'sample'`. | in-memory |
| `BROWSER_RESOLVER_EXPORTS` | `tests/setup.ts:386` | `readonly string[]` | Frozen list of every name emitted `configs/browsers.ts` publishes. | none |
| `MANIFEST_SAMPLE` | `tests/setup.ts:403` | `string` | Package-manifest JSON with one fleet package per section and one foreign name. | none |
| `buildHostileCases` | `tests/setup.ts:418` | `() => readonly TestHostileCase[]` | Rebuilds the adversarial matrix (cyclic, null-prototype, revoked proxy, throwing traps, sparse/oversized arrays). | in-memory |
| `selectHostileCase` | `tests/setup.ts:469` | `(label: string) => TestHostileCase` | Selects one case from a fresh `buildHostileCases` or throws. | in-memory |
| `readKeyCount` | `tests/setup.ts:488` | `(value: unknown) => number` | Naive `Object.keys` count; the negative control for the hostile matrix. | in-memory (may throw on hostility) |
| `buildGuardCases` | `tests/setup.ts:497` | `() => readonly TestGuardCase[]` | One case per published core guard with accepted values and `admits`. | in-memory |
| `buildParserCases` | `tests/setup.ts:641` | `() => readonly TestParserCase[]` | One case per published coercer (`parseBlueprint`, `parseGroups`, `parseSnapshot`, `parseCompilerOptions`). | in-memory |
| `buildUnionCases` | `tests/setup.ts:679` | `() => readonly TestUnionCase[]` | One case per forbidden extra key on a union branch. | in-memory |
| `buildPurityCases` | `tests/setup.ts:795` | `() => readonly TestPurityCase[]` | One call of every published helper, with the caller-owned inputs it must not mutate. | in-memory |
| `PATH_CASES` | `tests/setup.ts:842` | `readonly TestPathCase[]` | Every candidate the portable-path law decides, with the verdict it owes. | none |
| `RANGE_CASES` | `tests/setup.ts:866` | `readonly TestRangeCase[]` | Every declared range measured against a reported version, with the verdict it owes. | none |

### `tests/setupServer.ts`

| Symbol | `file:line` | Signature | What it does | Resource |
| --- | --- | --- | --- | --- |
| `TestCommandCase` | `tests/setupServer.ts:89` | `interface { label, argv, command }` | One command line beside the exact `CLICommand` it denotes. | none (type) |
| `TestUsageCase` | `tests/setupServer.ts:103` | `interface { label, argv, mention }` | One refused command line beside the substring the message must name. | none (type) |
| `TestAuditCase` | `tests/setupServer.ts:117` | `interface { label, audit, clean }` | One audit beside whether the executable reads it as a clean run. | none (type) |
| `TestBoundaryCase` | `tests/setupServer.ts:124` | `interface { label, guard, value, accepted }` | One boundary value a server guard decides. | none (type) |
| `TestMatchCase` | `tests/setupServer.ts:132` | `interface { label, path, matched }` | One path a classifying predicate decides. | none (type) |
| `TestStorageCase` | `tests/setupServer.ts:139` | `interface { label, path, storage }` | One target-relative path beside the vendored storage name it maps to. | none (type) |
| `TestDigestCase` | `tests/setupServer.ts:146` | `interface { label, content, digest }` | One text beside the SHA-256 digest it owes. | none (type) |
| `TestEndpointCase` | `tests/setupServer.ts:153` | `interface { label, base, accepted }` | One caller-supplied upstream endpoint beside the reader's verdict. | none (type) |
| `TestUpstreamReply` | `tests/setupServer.ts:170` | `interface { status, body, type?, location?, chunked?, encoding?, held?, delay? }` | One scripted HTTP reply the upstream fixture serves at one path. | none (type) |
| `TestPackumentEdges` | `tests/setupServer.ts:190` | `interface { dependencies?, development? }` | Declared range maps a published version carries in a packument. | none (type) |
| `TestVendoredFile` | `tests/setupServer.ts:205` | `interface { path, content }` | One vendored file the repository fixture serves. | none (type) |
| `TestUpstreamInterface` | `tests/setupServer.ts:223` | `interface { base, paths, accepts, peak, arrival, destroy }` | A real loopback HTTP server scripted per path. | none (type) |
| `WORKSPACE_ROOT` | `tests/setupServer.ts:240` | `string` | Repository root resolved from this file via `resolveRoot(import.meta)`. | this checkout's absolute path |
| `SCRATCH_PREFIX` | `tests/setupServer.ts:242` | `string` | Prefix `'orkestrel-scaffold-'` for temporary directories. | none |
| `listExecutablePaths` | `tests/setupServer.ts:260` | `() => readonly string[]` | Lists repository-relative paths git's index holds at mode `100755`. | `git ls-files --stage` in `WORKSPACE_ROOT` |
| `CASE_FOLDING` | `tests/setupServer.ts:290` | `boolean` | Negation of `supportsCase()`: whether this run's temp directories fold case. | temp dirs (`supportsCase`) |
| `buildManifestEntry` | `tests/setupServer.ts:298` | `(fields?: Partial<ManifestEntry>) => ManifestEntry` | Valid inert vendored-host manifest entry; digest defaults from destination text. | in-memory |
| `buildHostManifest` | `tests/setupServer.ts:309` | `(fields?: Partial<HostManifest>) => HostManifest` | Valid inert vendored-host manifest with a syntactically valid digest. | in-memory |
| `buildWorktree` | `tests/setupServer.ts:331` | `(fields?: Partial<Worktree>) => Worktree` | Valid inert git working-tree state. | in-memory |
| `buildMaterializerOptions` | `tests/setupServer.ts:341` | `(fields?: Partial<MaterializerOptions>) => MaterializerOptions` | Valid inert materializer option bag with a recorder `write` hook. | in-memory recorder |
| `buildUpstreamOptions` | `tests/setupServer.ts:357` | `(fields?: Partial<UpstreamOptions>) => UpstreamOptions` | Valid inert upstream option bag whose default bases are the public GitHub raw host and `registry.npmjs.org` as strings only. | in-memory |
| `buildServerGuardCases` | `tests/setupServer.ts:385` | `() => readonly TestGuardCase[]` | One case per published server-face guard. | in-memory (`WORKSPACE_ROOT` appears as an accepted `isFilesystemPath` value) |
| `FILESYSTEM_PATH_CASES` | `tests/setupServer.ts:526` | `readonly TestPathCase[]` | Every candidate the host-path law decides. | none |
| `buildBoundaryCases` | `tests/setupServer.ts:589` | `() => readonly TestBoundaryCase[]` | Ceiling and just-past-ceiling values for upstream, materializer, manifest, and inventory laws. | in-memory |
| `readErrorCode` | `tests/setupServer.ts:787` | `(call: () => unknown) => ScaffoldErrorCode \| undefined` | Runs a sync call and returns the `ScaffoldError` code, or `undefined`. | in-memory |
| `readErrorMessage` | `tests/setupServer.ts:803` | `(call: () => unknown) => string \| undefined` | Runs a sync call and returns the `ScaffoldError` message, or `undefined`. | in-memory |
| `buildStagedManifest` | `tests/setupServer.ts:824` | `(fields?: Partial<Omit<HostManifest, 'digest'>>) => HostManifest` | Manifest whose digest is computed from the membership it carries. | in-memory |
| `createHostRoot` | `tests/setupServer.ts:852` | `(workspace, relative, manifest) => string` | Writes storage files and `manifest.json` into a scratch workspace. | caller scratch (`workspace.write` / `ensure`) |
| `createStagedHost` | `tests/setupServer.ts:876` | `(workspace: ScratchInterface) => string` | Stages this checkout's real vendored host into scratch via `stageHost(WORKSPACE_ROOT, root)`. | scratch + this checkout |
| `DIGEST_CASES` | `tests/setupServer.ts:892` | `readonly TestDigestCase[]` | Published SHA-256 anchors (empty, `hi\n`, quick-brown-fox, multi-byte). | none |
| `GIT_PATH_CASES` | `tests/setupServer.ts:916` | `readonly TestMatchCase[]` | Paths the repository-metadata rule decides. | none |
| `PROTECTED_PATH_CASES` | `tests/setupServer.ts:930` | `readonly TestMatchCase[]` | Paths the deletion deny-list decides. | none |
| `SENSITIVE_PATH_CASES` | `tests/setupServer.ts:949` | `readonly TestMatchCase[]` | Paths the vendoring deny-list decides. | none |
| `buildVendoredManifest` | `tests/setupServer.ts:984` | `(fields?: Partial<Omit<HostManifest, 'digest'>>) => HostManifest` | Wider membership covering root file, dotted dirs, guide, executable script, empty `.claude/skills`. | in-memory |
| `HOSTILE_ARGUMENT` | `tests/setupServer.ts:1023` | `string` | One CLI word carrying ANSI, bell, delete, and newline. | none |
| `HOSTILE_BYTES` | `tests/setupServer.ts:1026` | `readonly string[]` | The bytes `HOSTILE_ARGUMENT` carries that a written line must not. | none |
| `createRepository` | `tests/setupServer.ts:1040` | `(path: string) => void` | Real `git init --quiet` at `path`. | git child |
| `TestSinkInterface` | `tests/setupServer.ts:1053` | `interface { options, output, diagnostic }` | Recording destinations one executable run writes to. | none (type) |
| `createSink` | `tests/setupServer.ts:1071` | `() => TestSinkInterface` | In-process line recorders for `output` and `diagnostic`. | in-memory |
| `HOST_DIRECTORY_PATHS` | `tests/setupServer.ts:1099` | `readonly string[]` | Staged paths that are directories rather than files. | none |
| `STAGED_PATHS` | `tests/setupServer.ts:1122` | `readonly string[]` | `HOST_PATHS` concatenated with `CANON_PATHS`. | none |
| `buildFleetManifest` | `tests/setupServer.ts:1144` | `() => HostManifest` | Manifest declaring every `HOST_PATHS` file plus `CATALOG_AGENT_PATH`. | in-memory |
| `createCheckout` | `tests/setupServer.ts:1169` | `(workspace, relative) => string` | Writes every `STAGED_PATHS` member into scratch (empty `.claude/skills`). | caller scratch |
| `buildCheckoutManifest` | `tests/setupServer.ts:1195` | `() => HostManifest` | Membership a host staged from `createCheckout` must declare, including executable bits. | in-memory |
| `createFleet` | `tests/setupServer.ts:1242` | `(workspace) => { host, target }` | Host root from `buildFleetManifest` plus a target with `TARGET_MANIFEST_TEXT` and `src/core`. | caller scratch |
| `createCatalogFleet` | `tests/setupServer.ts:1271` | `(workspace) => { host, target }` | `createFleet` plus a catalog agent file carrying rewrite markers. | caller scratch |
| `trackFiles` | `tests/setupServer.ts:1294` | `(path: string) => void` | Real `git add --all` at `path`; no commit. | git child |
| `commitFiles` | `tests/setupServer.ts:1315` | `(path: string) => void` | Real unsigned `git commit` with `-c user.name` / `user.email` only (no config write). | git child |
| `CORE_GENERATED` | `tests/setupServer.ts:1343` | filtered `compile` artifacts | Artifacts a real `Compiler` supplies for `src: ['core']` whose origin is not `host`. | in-process `Compiler` at module load |
| `CORE_GENERATED_COUNT` | `tests/setupServer.ts:1348` | `number` | `CORE_GENERATED.length`. | same as `CORE_GENERATED` |
| `FLEET_ARTIFACT_COUNT` | `tests/setupServer.ts:1369` | `number` | `buildFleetManifest().entries.length + CORE_GENERATED_COUNT`. | same |
| `FLEET_BIRTH_PATHS` | `tests/setupServer.ts:1381` | `string[]` | Paths among `CORE_GENERATED` whose ownership is `birth`. | same |
| `FLEET_BIRTH_COUNT` | `tests/setupServer.ts:1386` | `number` | `FLEET_BIRTH_PATHS.length`. | same |
| `buildVendoredPlan` | `tests/setupServer.ts:1399` | `(fields?: Partial<Plan>) => Plan` | Plan `buildVendoredManifest` answers for, including empty `.claude/skills`. | in-memory |
| `buildCompiledPlan` | `tests/setupServer.ts:1425` | `() => Plan` | Compiles `buildBlueprint()` through a real `Compiler` and destroys it. | in-process `Compiler` |
| `buildTargetAudit` | `tests/setupServer.ts:1452` | `(target, paths, stale) => Audit` | One finding per path; observed bytes from `readFileHex(target, path)`. | files on disk under `target` |
| `CATALOG_AGENT_TEXT` | `tests/setupServer.ts:1482` | `string` | Catalog agent file with markers and surrounding prose, empty table. | none |
| `CATALOG_AGENT_ROWS_TEXT` | `tests/setupServer.ts:1504` | `string` | Catalog agent file with package rows plus a non-package first cell. | none |
| `TARGET_DEV_DEPENDENCIES` | `tests/setupServer.ts:1518` | from `blueprintToDevDependencies` | Planned development dependencies for published `src/core`. | in-memory |
| `buildTargetManifest` | `tests/setupServer.ts:1531` | `(blueprint?, dependencies?, development?, scripts?) => string` | Target `package.json` text with focused section replacements. | in-memory |
| `omitDependencies` | `tests/setupServer.ts:1560` | `(dependencies, names) => Readonly<Record<string, string>>` | Copy of a section without selected names. | in-memory |
| `TARGET_MANIFEST_TEXT` | `tests/setupServer.ts:1568` | `string` | Sample target manifest with planned scripts, tools, fleet packages, and an extra. | none |
| `REFUSED_MANIFEST_TEXT` | `tests/setupServer.ts:1585` | `string` | Target manifest whose name `@orkestrel/Sample` the compile gate refuses. | none |
| `UPSTREAM_ENDPOINT_CASES` | `tests/setupServer.ts:1606` | `readonly TestEndpointCase[]` | Caller-supplied endpoints the scheme/host law decides (includes `https://registry.npmjs.org` as a string). | none |
| `buildPackument` | `tests/setupServer.ts:1660` | `(version, edges?) => string` | Abbreviated registry packument JSON (`dist-tags.latest`, per-version edges). | in-memory string |
| `buildOrganization` | `tests/setupServer.ts:1681` | `(names) => string` | Registry org package-list JSON (name-to-access map). | in-memory string |
| `VENDORED_FILES` | `tests/setupServer.ts:1693` | frozen `{ agents, license, orchestration, mirror }` | Vendored files the repository fixture serves. | none |
| `buildInventory` | `tests/setupServer.ts:1715` | `(files) => string` | Committed inventory JSON with per-file and membership digests. | in-memory |
| `buildInstalledHostReplies` | `tests/setupServer.ts:1738` | `(floor?: Host) => Record<string, TestUpstreamReply>` | Raw-repository replies for inventory and host-owned bytes; default `floor` is `readHostFloor()`. | this checkout's vendored host (source tree when the module is `.ts`) |
| `buildVendoredSnapshot` | `tests/setupServer.ts:1766` | `(files) => Snapshot` | Target snapshot hex keyed by the same paths. | in-memory |
| `writeUpstreamReply` | `tests/setupServer.ts:1781` | `(response, reply) => void` | Writes a real HTTP response (optional gzip, chunked, `content-length`). | open `node:http` `ServerResponse` |
| `createUpstreamServer` | `tests/setupServer.ts:1822` | `(replies) => Promise<TestUpstreamInterface>` | Real `node:http` server on loopback via `createLoopback`; unlisted paths `404`; `held` never answers. | loopback TCP / HTTP |
| `UPSTREAM_PATHS` | `tests/setupServer.ts:1893` | frozen path table | Canonical registry and raw-content request paths the reader is measured against. | none |
| `FLEET_UPSTREAM_PATHS` | `tests/setupServer.ts:1927` | frozen path table | Addresses the fleet fixture's target produces for packuments and mirrors. | none |
| `buildCLIOptions` | `tests/setupServer.ts:1961` | `(sink, base) => CLIOptions` | Points registry and repository endpoints at one loopback `base`. | in-memory |
| `readRejectionCode` | `tests/setupServer.ts:1977` | `(call: () => Promise<unknown>) => Promise<ScaffoldErrorCode \| undefined>` | Async counterpart to `readErrorCode`. | in-memory |
| `STORAGE_PATH_CASES` | `tests/setupServer.ts:1989` | `readonly TestStorageCase[]` | Target-relative paths beside `pathToStorage` results. | none |
| `COMMAND_CASES` | `tests/setupServer.ts:2008` | `readonly TestCommandCase[]` | Accepted argv lines beside the exact `CLICommand`. | none |
| `USAGE_CASES` | `tests/setupServer.ts:2098` | `readonly TestUsageCase[]` | Refused argv lines beside the mention the message owes. | none |
| `AUDIT_EXIT_CASES` | `tests/setupServer.ts:2138` | `readonly TestAuditCase[]` | Audit shapes the exit-code rule decides. | none |
| `buildOptionArgv` | `tests/setupServer.ts:2197` | `(verb: Verb, option: string) => readonly string[]` | Shortest argv that exercises one usage-display option against one verb via `optionToName`. | in-memory |

## Projects

Named collector for `tests/setup.test.ts` and `tests/setupServer.test.ts` is the `setup` project: include `tests/setup*.test.ts` (`.claude/rules/workspace.md:130`, `.claude/rules/tests.md:62`). Register it only when a root file matches that glob; then emit `test:setup` and invoke it from `test`; when no file matches, emit neither the project nor the script (`.claude/rules/workspace.md:137-139`). Script name in the cross-cutting list: `test:setup` (`.claude/rules/workspace.md:178`).

`/home/user/scaffold/vite.config.ts` does not declare a `setup` factory. `defineConfig` `test.projects` is `[srcCore, srcServer, srcBin, policy, config, guides, distribution, probe]` (`vite.config.ts:203-207`). Include globs actually registered:

- `src:core` `tests/src/core/**/*.test.ts`, `setupFiles` `./tests/setup.ts` (`vite.config.ts:43-44`)
- `src:server` `tests/src/server/**/*.test.ts`, `setupFiles` `./tests/setup.ts`, `./tests/setupServer.ts` (`vite.config.ts:89-91`)
- `src:bin` `tests/src/bin/**/*.test.ts`, same setupFiles (`vite.config.ts:123-124`)
- `policy` `tests/policy.test.ts` (`vite.config.ts:138`)
- `config` `tests/config.test.ts` (`vite.config.ts:149`)
- `guides` `tests/guides.test.ts`, `exclude` includes `tests/setup.test.ts` (`vite.config.ts:163-164`)
- `distribution` `tests/distribution.test.ts` (`vite.config.ts:175`)
- `probe` `tmp/probe/**/*.test.ts`; `benchmark.include` also `tests/**/*.test.ts` (`vite.config.ts:193-199`)

No registered `include` matches `tests/setup.test.ts` or `tests/setupServer.test.ts` in test mode. `guides` excludes `tests/setup.test.ts` only. Probe bench mode would collect every `tests/**/*.test.ts`.

`package.json` `test:*` scripts (`package.json:74-83`): `test` runs `test:src:core` → `test:src:server` → `test:src:bin` → `test:policy` → `test:config` → `test:guides`. Also present: `test:distribution`, `test:probe`, `test:bench`. No `test:setup`.

Landed worker collector (pattern, not this tree): `export const setup` include `tests/setup*.test.ts`, `setupFiles` `./tests/setup.ts` only (`/home/user/fleet/worker/vite.config.ts:122-130`); `test:setup` is `vitest run --config vite.config.ts --no-cache --reporter=dot --project setup` (`/home/user/fleet/worker/package.json:83`); `test` invokes `test:setup` (`/home/user/fleet/worker/package.json:67`).

## Pattern

Worker `tests/setup.ts:1-40` export shape the proofs import: `TestQueueStoreHooks<TInput>` (`:14`, optional `save` / `remove` / `clear`) and `TestQueueStore<TInput>` (`:30`, in-memory `QueueStoreInterface`, `constructor(hooks = {})`). `tests/setup.test.ts:4` also imports `PoolOptionsProbe`, declared at `tests/setup.ts:59` (outside that slice).

`describe('TestQueueStore')` `/home/user/fleet/worker/tests/setup.test.ts:12`

- `it('records a saved entry, invokes its hook once, and defaults to no hooks')` `:13` — real `save`/`load` on a store whose `save` hook pushes into an array; control is a second store constructed with no hooks object.
- `it('invokes remove/clear hooks and mutates the in-memory record to match')` `:31` — real `save`/`remove`/`clear` against in-memory entries; hook call order asserted.

`describe('PoolOptionsProbe')` `:53`

- `it('records each getter access once, in property order, and returns the configured value')` `:54` — real getter reads on a probe wired to `createRecorder`; no production `Pool`.
- `it('replace swaps the values every subsequent getter read returns')` `:75` — real `replace` then subsequent getter reads.

`describe('postRun / ThreadReply')` `/home/user/fleet/worker/tests/setupServer.test.ts:25`

- `it('posts a run envelope a real worker thread replies to, resolving a frozen copy keyed by id')` `:26` — real `ThreadWorker` over fixture `double.ts` via `buildFixtureURL`; `postRun` + `ThreadReply`; control is a planted wrong body (`value: 43`).
- `it('rejects when the worker thread exits before it replies to the pending id')` `:42` — real `ThreadWorker` over fixture `crash.ts`; expects rejection `/exited before replying/`.

`describe('buildFixtureURL')` `:54`

- `it('resolves a real worker fixture under the workspace tests directory')` `:55` — real `existsSync` on `double.ts`; control name `does-not-exist.ts` resolves into the same directory and is absent.

`describe('tempDatabasePath')` `:66`

- `it('allocates a real on-disk path under an owned scratch directory its scratch removes')` `:67` — real scratch directory; path not yet a file; `scratch.destroy()` removes it; second `destroy` must not throw.

`describe('NodeWorkerOptionsProbe')` `:82`

- `it('records each getter access once, in property order, and returns the configured value')` `:83` — real getter reads + recorder; `script` is a real fixture URL; no worker thread started.
- `it('replace swaps the values every subsequent getter read returns')` `:128` — real `replace` swapping `script`/`concurrency`.

Worker file comments (`setup.test.ts:6-10`, `setupServer.test.ts:17-23`): prove the exports the consuming suites rely on; do not re-prove production Queue/Pool behavior.

## Hazards

`createUpstreamServer` `tests/setupServer.ts:1822` (and `writeUpstreamReply` `:1781`, `TestUpstreamInterface` `:223`) — proof binds a real `node:http` listener on loopback (`createLoopback`) and speaks HTTP/1.1; `held: true` accepts and never answers, so a connection stays open until `destroy`. Loopback sockets, not the public registry.

No export's body calls the live npm registry, GitHub, a global install, or the Cursor or Codex CLI. `buildUpstreamOptions` `:357` and `UPSTREAM_ENDPOINT_CASES` `:1606` only store those URLs as strings. `scripts/codex.sh` appears as fixture destination/content (`buildHostManifest` `:314`, `buildVendoredManifest` `:1001`, `HOST_DIRECTORY_PATHS` / `STAGED_PATHS`), never as a process to start.

Git children (short, not long-running): `listExecutablePaths` `:260` (`git ls-files --stage`), `createRepository` `:1040` (`git init`), `trackFiles` `:1294` (`git add --all`), `commitFiles` `:1315` (`git commit --no-gpg-sign` with per-invocation `-c` identity).

`CORE_GENERATED` `:1343` and `buildCompiledPlan` `:1425` run this package's `Compiler` in-process. `createStagedHost` `:876` and default `buildInstalledHostReplies` `:1738` read this checkout (`stageHost(WORKSPACE_ROOT, …)`, `readHostFloor()`). `CASE_FOLDING` `:290` writes temp names via `supportsCase()`. Scratch allocators (`createHostRoot` `:852`, `createCheckout` `:1169`, `createFleet` `:1242`, `createCatalogFleet` `:1271`) need a caller-owned `ScratchInterface`, not the network.

## Unknowns

Whether a writer must prove every export or only the helpers consuming suites rely on: `tests.md:59` says “works as the workspace's suites require”; the worker proofs cover `TestQueueStore`, `PoolOptionsProbe`, `postRun`/`ThreadReply`, `buildFixtureURL`, `tempDatabasePath`, `NodeWorkerOptionsProbe` and leave the rest of those setup modules unasserted in the setup project.

Whether git-spawn helpers belong in the named hazard set. They start children; they are not long-running, and they are not the Cursor/Codex CLI.

`PoolOptionsProbe` lives at `/home/user/fleet/worker/tests/setup.ts:59`, outside the requested `:1-40` slice the proofs import.

Scaffold currently has no `setup` project and no `test:setup`. `.claude/rules/workspace.md:137-139` withholds that project until a matching `tests/setup*.test.ts` exists. `guides` excludes `tests/setup.test.ts` (`vite.config.ts:164`) and does not exclude `tests/setupServer.test.ts`. Worker `setup` `setupFiles` is only `./tests/setup.ts` (`worker/vite.config.ts:127`); `setupServer.test.ts` imports `./setupServer.js` itself and uses `node:fs` / `worker_threads`.