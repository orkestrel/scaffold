I'll read the brief and the orchestration files it requires, then return only the bounded evidence map.I'll load the required rules, skills, and campaign graph next, then map the parity runner surface from source.I'll locate generation/copy sites, git history, Guide manifests, and the Grok route next.## Question

Which exact commit introduced `scripts/docs.ts` and the `docs` manifest entry, and what role did the retained commit text assign them?

### Evidence

- Commit `a0a470581e29dd388de60fc542a6bb3604cf262a`, subject `Land the documentation-parity gate, the seed, and scaffold's convergence`. `git log --diff-filter=A --follow -- scripts/docs.ts` and `git log -S '"docs": "node --experimental-strip-types scripts/docs.ts"' -- package.json` both stop at this commit.
- `git show --stat` on that commit: `scripts/docs.ts` added; `package.json` gained one line; `src/core/constants.ts` changed with it.
- Retained body: D4 puts the equality gate into `tests/guides.test.ts`. D5 vendors `scripts/docs.ts` as the seed that reports every disagreement and carries a summary or an example across either side through the readers `@orkestrel/guide` ships; `blueprintToScripts` emits the `docs` script with `guides`; `DOCS_SEED_PATH` is the seed's one home. D6 is scaffold convergence using that seed.

### Distillate

The seed file and the `docs` script entered together in `a0a47058`. The retained text splits roles: the test is the equality gate; the seed is the reporter/writer; script emission is tied to `guides`.

---

## Question

Which canonical scaffold declarations generate/copy the runner, guides seed and scripts? Which assertions, fixtures, guides and rules would become false if `docs` and its seed were retired?

### Evidence

**Seed copy (vendored host file, not generated text)**

- `src/core/constants.ts:111-112` `DOCS_SEED_PATH = 'scripts/docs.ts'`.
- `src/core/constants.ts:136-158` `HOST_PATHS` includes `DOCS_SEED_PATH`.
- `src/core/constants.ts:235-240` `EXECUTABLE_PATHS` lists the shell hooks only; the seed is absent.
- `src/core/helpers.ts:458-461` `selectHostPaths` drops only `guides/<name>.md`.
- `src/core/compilers.ts:1600-1607` `blueprintToHostArtifacts` maps selected `HOST_PATHS` plus the catalog agent to `ownership: 'presence'`, `origin: 'host'`. Remarks at `:1583-1588` say the seed is vendored like the other hooks; a workspace without guides still carries the seed.
- `src/core/Compiler.ts:299` includes `blueprintToHostArtifacts` in the compile.
- `src/core/helpers.ts:301-313` `inferGroup('scripts/docs.ts')` falls through to `'configs'` (not `'docs'`).
- `src/server/helpers.ts:1515` `stageHost` walks `[...HOST_PATHS, ...CANON_PATHS]`.
- `package.json:91-92` `build:host` / `build:inventory` call `stageHost` / `stageInventory`.
- `host.json:706-709` staged row: destination `scripts/docs.ts`, `executable: false`.
- `src/server/Materializer.ts:789-801` presence-owned host artifacts keep `origin: 'host'` and a storage `source`.

**`docs` script emission (generated manifest text, gated on `guides`)**

- `src/core/factories.ts:65` `guides` defaults to `false`.
- `src/bin/CLI.ts:910,930` `#derive` sets `guides` from an exact-case file at `GUIDES_TEST_PATH`.
- `src/core/constants.ts:312-313` `GUIDES_TEST_PATH = 'tests/guides.test.ts'`.
- `src/core/compilers.ts:350-352` when `blueprint.guides`, emits `test:guides` and `scripts.docs = node --experimental-strip-types ${DOCS_SEED_PATH}`.
- `src/core/compilers.ts:446-451` `blueprintToWritableScripts` includes `docs` so repair can append it; remarks `:422-427` say it joins no gate chain.
- `src/core/templates.ts:337-347` generated Vite `guides` project includes `tests/guides.test.ts`.
- `vite.config.ts:171-181` this checkout's live `guides` project matches that include.
- `package.json:74,80-81` `test` chains `test:guides`; `docs` is a sibling script, not on `test` or `prepublishOnly` (`:94`).

**Guides proof file (not generated, not vendored)**

- `tests/distribution.test.ts:612,616` a generated workspace has no `tests/guides.test.ts` and no `"test:guides"`.
- `src/core/compilers.ts:1410-1449` `blueprintToGuideArtifacts` emits only `guides/README.md` (birth-owned template). `ARTIFACT_TEMPLATES.guides` in `src/core/templates.ts:2153-2169` is that index only.
- `guides/README.md:19-21` names `tests/guides.test.ts` as the bijection enforcer.

**Bindings that currently require the seed / `docs` script**

- `tests/src/core/helpers.test.ts:184-194` pins `DOCS_SEED_PATH`, `HOST_PATHS` membership, not in `EXECUTABLE_PATHS`, not a canon path, selected for name `scaffold`.
- `tests/src/core/compilers.test.ts:619-632` emits `docs` beside `test:guides`; undocumented blueprint has no `docs`; `test` and `prepublishOnly` do not contain `npm run docs`.
- `tests/src/core/compilers.test.ts:1788-1798` vendors `scripts/docs.ts` for `guides: true` and `guides: false`; script only when `guides`.
- `tests/src/core/compilers.test.ts:1825-2493` `describe('the documentation seed')` copies the seed bytes and `spawnSync`s it (`:2204-2217`).
- `tests/src/server/helpers.test.ts:209` vendored-import walk contains `scripts/docs.ts`.
- `tests/distribution.test.ts:282` staged inventory contains `scripts/docs.ts`.
- `guides/scaffold.md:123` Surface row `DOCS_SEED_PATH`; `:605-606` audit reports `test:guides` and `docs` together; `:1023-1055` seed/write contract.
- `.claude/rules/documentation.md:35-41` converge with `npm run docs`, never by weakening the gate.
- `.claude/rules/workspace.md:77-83` vendored-import allowlist; seed is a vendored TS module that imports `@orkestrel/guide`.
- `.claude/rules/architecture.md:51` self-contained entry exception the seed header cites (`scripts/docs.ts:14-17`).
- `C:/Users/mikes/WebstormProjects/guide/guides/guide.md:591-594,619-621,839-840` RQ reports via `npm run docs` and never writes the pitch; replacers return text and write nothing.

**Ownership split**

- Seed bytes: host presence copy from `HOST_PATHS` / `stageHost`.
- `docs` command: computed script, only when `guides`.
- `tests/guides.test.ts`: workspace-authored; presence selects the Vitest project.
- Guide index: template `guides/README.md`.
- Package guide `guides/scaffold.md`: workspace product; `selectHostPaths` withholds it from other named workspaces.

### Distillate

The seed is a vendored host file for every blueprint. The `docs` script and the `guides` Vitest project are emitted only when `tests/guides.test.ts` exists. The proof file itself is not generated. Retiring the seed/`docs` script would break the HOST_PATHS/script/staging/host.json/seed-process pins, the scaffold guide rows and seed prose, and the documentation-rule converge sentence. It would not by itself remove `test:guides`.

---

## Question

Which parity checks overlap, and which writer behavior exists only in the script? Are there first-party callers besides package scripts and tests?

### Evidence

**Shared read path**

- `scripts/docs.ts:51,372-394` inventory globs `src/**/*.ts`, `tests/**/*.ts`, `guides/*.md`, `*.md`; `parseManifest`; `createGuide` / `createSource`; `findDrift`.
- `tests/guides.test.ts:51-54,62-74,172-181` same globs, same index, same `findDrift`; empty disagreement array. Comment `:165-171` says the printed worklist matches `npm run docs`.
- `C:/Users/mikes/WebstormProjects/guide/tests/guides.test.ts:189-203` same `findDrift` empty-array case and the same `npm run docs` converge sentence.
- Pitch/tagline: `scripts/docs.ts:418-433` compares `createGuide(readme).tagline()` to the own-spec guide; write runs append `; the README pitch is authored by hand` and do not rewrite README. `tests/guides.test.ts:203-211` asserts pitch equals tagline. Guide contract: `guide.md:591-594` pair is outside `findDrift`.

**Test-only (no write)**

- `tests/guides.test.ts:77-163` vacant sections, barrel bijection, methods tables, class-vs-interface owe.
- `:188-198` example-title population pin.
- `:214-259` HostFile/Worktree/read pins, relative links, fence imports.
- `:263-449` executed guide examples.
- `.claude/rules/workspace.md:136` `guides` project proves bijection, compared equality, and executable fences via `test`.

**Script-only writer / process behavior**

- `scripts/docs.ts:362-370` unknown args: usage line, exit `2`.
- `:376-378` missing index or missing indexed spec: one line per missing file, exit `2`.
- `:269-275` no `--to`: `reportRow` only.
- `:284-310` `--to guide`: `replaceCell` on summary keys; example keys reported `the guide fence owns an example`; no `replaceFence` import or call.
- `:319-359` `--to source`: `replaceSummary` / `replaceExample` / `locateComment` / `spliceSpan`.
- `:436-441` `writeFileSync` for changed texts.
- `:444-452` `wrote <file>`, `next: npm run format`, `written`/`reported` tallies, exit `1` while any reported disagreement stands.
- Guide library: `guide.md:615-621` and `helpers.ts:2392` `findDrift` / replacers return text and open no files. `replaceFence` is at `guide/src/core/helpers.ts:2741`; the seed never calls it.
- Fixture process: `tests/src/core/compilers.test.ts:2274-2289` no direction writes nothing, exit `1`; `:2295-2324` `--to guide` rewrites summaries and leaves the fence; `:2330-2342` `--to source` rewrites source and a later no-flag run reads clean; `:2410-2418` stray args exit `2`.

**Callers**

- Scaffold `package.json:81` `docs` script. Guide `package.json:73` same command over `C:/Users/mikes/WebstormProjects/guide/scripts/docs.ts` (same header as the scaffold seed, `:1-17`).
- `tests/src/core/compilers.test.ts:2208` `spawnSync(process.execPath, ['--experimental-strip-types', SEED_PATH, ...])`.
- `src/bin/CLI.ts` has no `docs` match. `src/core` and `src/server` do not import `scripts/docs.ts`. `scripts/docs.ts:14` imports no sibling.

### Distillate

`findDrift` plus pitch/tagline are the overlapping checks. File writes, `--to`, miss reasons, usage/missing-input exit `2`, and the `wrote`/`format` lines exist only in the seed. Observed first-party execution is the `docs` package script and the compiler-test child process. No library or CLI caller.

---

## Question

What runtime tarballs must precede Guide, including nested dependencies? Distinguish declared ranges from installed versions and prepared versions.

### Evidence

**Prepared / declared (graph, not live install)**

- `.orkestrel/campaign/docs-parity/d7n-layer-graph-report.md:8-9,15,25,34` L0 contract local `0.0.17` / registry `0.0.16`; L1 html local `0.0.9` / registry `0.0.8` depends on contract `^0.0.16`; L2 markdown local `0.0.14` / registry `0.0.13` depends on contract `^0.0.16` and html `^0.0.8`; L3 guide local `0.0.18` / registry `0.0.17` depends on contract `^0.0.16` and markdown `^0.0.13`.
- Graph `:61-64` every in-pass runtime pin targets an older registry version than the prepared local package; installed/nested state deferred (`:84`).
- Survey manifests: `evidence/d7n-layer-survey-diagnostic/contract/package.after.json` version `0.0.17`; `html/package.after.json` version `0.0.9`, dependency contract `^0.0.16`; `markdown/package.after.json` version `0.0.14`, dependencies contract `^0.0.16` and html `^0.0.8`; `guide/package.after.json` version `0.0.18`. Registry `npm-view` latest in those captures: contract `0.0.16`, html `0.0.8`, markdown `0.0.13`, guide `0.0.17`.

**Guide checkout live declarations and resolutions**

- `C:/Users/mikes/WebstormProjects/guide/package.json:1-3,75-77` name `@orkestrel/guide`, prepared version `0.0.18`, runtime `contract ^0.0.16`, `markdown ^0.0.13`.
- `guide/package-lock.json:152-155` installed contract `0.0.16` from `contract-0.0.16.tgz`.
- `:230-238` installed markdown `0.0.13` from `markdown-0.0.13.tgz`, nested declared html `^0.0.8` and contract `^0.0.16`.
- `:190-197` installed html `0.0.8` from `html-0.0.8.tgz`, nested declared contract `^0.0.16`.
- `guide/node_modules/@orkestrel/contract/package.json:3` version `0.0.16`; `markdown/package.json:3,74-77` version `0.0.13`, dependencies contract `^0.0.16` and html `^0.0.8`; `html/package.json:3,75-77` version `0.0.8`, dependency contract `^0.0.16`.

**Dev cycle (not Guide runtime)**

- Graph `:63` guide/scaffold/probe/test form a development bootstrap cycle. Guide `package.json:79-83` dev: probe `^0.0.12`, scaffold `^0.0.63`, test `^0.0.13`.

### Distillate

Guide's runtime predecessor chain is contract, then html (markdown's nested edge), then markdown, then guide. This checkout resolves the registry floors (`0.0.16` / `0.0.8` / `0.0.13`), not the prepared locals (`0.0.17` / `0.0.9` / `0.0.14` / `0.0.18`). Caret ranges and prepared versions are not the installed tarball identities.

---

## Unknowns

- Whether Guide's `scripts/docs.ts` is still byte-identical to scaffold's seed beyond the shared header was not hashed.
- Packed-tarball digests and isolated-consumer `npm ls` after a tarball install were not read; live evidence is this Guide checkout's lock and `node_modules` manifests.
- No CLI `session_id`: this session did not launch the versioned Cursor `agent` journal path in `.claude/agents/grok.md`.

## Journal path / session

No `tmp/cursor/*.jsonl`. The brief said the Cursor executor performs the assignment directly and spawns nothing. This Ask-mode session did the reading. Scaffold HEAD `44016403f9e6561227e2941b2552bb55953986dd` on `claude/orkestrel-npm-audit-deps-14ibta`. Guide HEAD `ef6ada9975d71ce97ac20239f473c02b77e84cd9` on `claude/orkestrel-npm-audit-deps-14ibta`.

## Deviation

Product source was not edited. Tests and credential files were not run or opened.

Scaffold `git status --porcelain` before and after the reading is unchanged: staged `package-lock.json`; unstaged `package.json`; campaign markdown dirty; untracked `d7n-parity-route-map-brief.md`, `d7n-parity-route-reading.md`, and `instruments/d7/windows/run-d7n-parity-route-map.sh`. Guide porcelain is empty.

No harness-tracked CLI journal: Ask mode forbids writes to `tmp/cursor/`, and the brief forbade spawning.
